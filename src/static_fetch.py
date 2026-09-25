#!/usr/bin/env python
"""Mirror the static assets of a Weibo CDN domain into `src/static/<domain>/...`.

Weibo serves its front-end bundles from object-store buckets (e.g.
`h5.sinaimg.cn`) where directory listing is disabled, so the assets cannot be
enumerated. This tool therefore crawls: it starts from a set of *seed* HTML
pages (any host), extracts every asset URL that points at the target domain,
downloads it, and then scans the downloaded JS/CSS for further references
(dynamic `import()` chunks, `url()` assets, source maps, ...) until the queue is
exhausted or a safety limit is hit.

The local layout mirrors the URL path, so a file fetched from
    https://h5.sinaimg.cn/m/login/assets/index-qbEBDs52.js
is stored at
    src/static/h5.sinaimg.cn/m/login/assets/index-qbEBDs52.js

Only the target domain is written to disk. Seed pages on other hosts (Weibo
login shells, etc.) are fetched to *discover* assets but are never saved.

Usage (from the project root or src/):
    python src/static_fetch.py --domain h5.sinaimg.cn
    python src/static_fetch.py --domain h5.sinaimg.cn --dry-run
    python src/static_fetch.py --domain h5.sinaimg.cn --seed https://example.com/app/

Re-fetching later does not depend on the crawl still finding everything: every
run records the original URL per asset, so `--from-manifest` re-fetches exactly
the recorded set (using conditional requests).

Output:
  * the mirrored asset tree under src/static/<domain>/
  * src/static/<domain>/_manifest.json - url, sha1, size, content type, ETag and
    Last-Modified per asset
  * src/static/<domain>/_urls.txt - the original URLs, one per line
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import time
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlparse, unquote

import requests

# Browser-like headers: some buckets reject requests without a UA / Referer.
from constants import BROWSER_USER_AGENT as UA
DEFAULT_EXT = ('js', 'mjs', 'cjs', 'css', 'json', 'map', 'html', 'htm',
               'svg', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'webp',
               'woff', 'woff2', 'ttf', 'eot', 'otf')

# Pages crawled for asset references but never saved. The login shells are the
# entry points this project actually cares about (see src/auth.py); the rest are
# CDN app shells found on the bucket so far.
DEFAULT_SEEDS = (
    'https://h5.sinaimg.cn/m/login/index.html',
    'https://h5.sinaimg.cn/m/weibo-lite/index.html',
    'https://h5.sinaimg.cn/m/setting/index.html',
    'https://h5.sinaimg.cn/m/weibo-pro-next/index.html',
    'https://h5.sinaimg.cn/m/reward-pc-kits/sdk.js',
    'https://h5.sinaimg.cn/m/reward-pc-kits/style.css',
    'https://passport.weibo.com/sso/signin?entry=miniblog&source=miniblog&disp=popup',
    'https://passport.weibo.com/sso/signin?entry=miniblog&source=miniblog',
    'https://passport.weibo.cn/signin/login?entry=mweibo',
    'https://weibo.com/newlogin?tabtype=weibo',
    'https://m.weibo.cn/',
)

# App-root discovery. Listing is disabled, so root names have to be guessed and
# then probed against a small set of entry filenames. Not every app ships an
# index.html (e.g. `m/reward-pc-kits/` only has sdk.js + style.css), hence the
# filename set rather than a single index.html probe.
ROOT_PREFIXES = ('m', '')
ROOT_WORDS = (
    'login', 'weibo-lite', 'weibo-pro-next', 'reward-pc-kits', 'setting',
    'weibo', 'weibo-pro', 'pro', 'mblog', 'topic', 'huati', 'live', 'vote',
    'chat', 'pay', 'reward', 'reward-kits', 'reward-pc', 'pc-kits', 'kits',
    'relation', 'search', 'notice', 'ugc', 'index', 'wap', 'passport',
    'profile', 'card', 'video', 'album', 'group', 'message', 'feed', 'comment',
    'share', 'ad', 'activity', 'game', 'member', 'vip', 'super', 'fans',
    'mall', 'wallet', 'redpacket', 'signin', 'register', 'sms', 'security',
    'creator', 'studio', 'media', 'editor', 'publish', 'draft', 'collect',
    'favorite', 'history', 'blacklist', 'filter', 'emoticon', 'sticker',
    'marvel', 'sdk', 'bridge', 'hybrid', 'webview', 'app', 'h5', 'mobile',
)
ROOT_PROBE_FILES = ('index.html', 'index.phtml', 'sdk.js', 'style.css',
                    'main.js', 'app.js', 'index.js', 'manifest.json', 'sw.js',
                    'service-worker.js', 'asset-manifest.json', 'favicon.ico')

# Service workers are a listing substitute: a Workbox `manifest.<hash>.js`
# precache list enumerates every hashed asset of an app in one file.
SW_FILES = ('sw.js', 'service-worker.js', 'worker.js', 'precache-manifest.js')
RE_SW_REGISTER = re.compile(r'serviceWorker\s*\.\s*register\s*\(\s*["\']([^"\']+)["\']')
RE_IMPORT_SCRIPTS = re.compile(r'importScripts\s*\(([^)]{0,4000})\)')
RE_PRECACHE_URL = re.compile(r'["\']url["\']\s*:\s*["\']([^"\']+)["\']')

# Text types we scan for further references; binaries are only stored.
SCANNABLE = ('.js', '.mjs', '.cjs', '.css', '.html', '.htm', '.json', '.svg')

# Relative specifiers inside JS/CSS: import "...", from '...', url(...),
# src="...", href="...", bare "./x.js" / "../x.css".
RE_REL = re.compile(r'(?:import\s*\(|\bfrom|import|require|url\()\s*["\']'
                    r'([^"\']{1,300})["\']'
                    r'|(?:\bsrc|\bhref)\s*=\s*["\']([^"\']{1,300})["\']'
                    # unquoted HTML attributes: <script src=//host/a.js></script>
                    r'|(?:\bsrc|\bhref)\s*=\s*([^\s"\'`>]{1,300})'
                    r'|["\']((?:\.{1,2}/|/)[A-Za-z0-9_./\-@]{1,300})["\']')
RE_SOURCEMAP = re.compile(r'sourceMappingURL\s*=\s*([^\s;]+)')


def _clean(candidate):
    """Trim trailing punctuation that regexes tend to swallow."""
    candidate = candidate.strip().strip('\'"')
    candidate = candidate.rstrip(',;)]}"\'\\')
    candidate = candidate.split('#')[0]
    return candidate


def _has_placeholder(url):
    """Server-side template placeholders (`{{__rewardVersion__}}`, `${x}`) are
    not real keys; requesting them just yields junk filenames."""
    return '{{' in url or '${' in url or '<%' in url


def _normalize(url, domain):
    """Collapse URLs whose path repeats the domain, e.g. protocol-relative
    specifiers resolved twice: `https://d/x` + `//d/y` -> `https://d/d/y`."""
    parsed = urlparse(url)
    if parsed.netloc != domain:
        return url
    prefix = '/' + domain + '/'
    path = parsed.path
    while path.startswith(prefix):
        path = path[len(prefix) - 1:]
        if not path.startswith('/'):
            path = '/' + path
    return parsed._replace(path=path or '/').geturl()


def _roots(urls):
    """First two path segments of each URL -> candidate app roots (`m/login/`)."""
    out = set()
    for u in urls:
        parts = urlparse(u).path.strip('/').split('/')
        if len(parts) >= 2 and parts[0] and parts[1]:
            out.add(parts[0] + '/' + parts[1] + '/')
        elif len(parts) == 1 and parts[0]:
            out.add(parts[0] + '/')
    return sorted(out)


def _ext_of(path):
    base = os.path.basename(path).lower()
    if '.' not in base:
        return ''
    return base.rsplit('.', 1)[1]


def ct(resp):
    """Primary content type of a response, without parameters."""
    return (resp.headers.get('content-type') or '').split(';')[0]


def _query_tag(url):
    """Suffix used to keep query-string variants of the same path apart."""
    q = urlparse(url).query
    if not q:
        return ''
    return '~' + hashlib.md5(q.encode('utf-8')).hexdigest()[:8]


def local_path(out_root, domain, url):
    """Map an asset URL to a path inside the local mirror."""
    parsed = urlparse(url)
    path = unquote(parsed.path).lstrip('/')
    if not path or path.endswith('/'):
        path += 'index.html'
    head, tail = os.path.split(path)
    tag = _query_tag(url)
    if tag:
        stem, dot, ext = tail.rpartition('.')
        tail = (stem + tag + dot + ext) if dot else (tail + tag)
    return os.path.join(out_root, domain, head, tail)


class Fetcher(object):
    def __init__(self, domain, out_root, seeds, exts, max_depth, max_files,
                 max_bytes, delay, force, dry_run):
        self.domain = domain
        self.out_root = out_root
        self.exts = tuple(e.lower().lstrip('.') for e in exts)
        self.max_depth = max_depth
        self.max_files = max_files
        self.max_bytes = max_bytes
        self.delay = delay
        self.force = force
        self.dry_run = dry_run
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': UA,
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        })
        self.seen = set()
        self.manifest = []
        self.rejected = []
        self.unchanged = 0
        # url -> (etag, last_modified) from a previous run, for conditional GET.
        self.cond = {}
        self.queue = deque((s, 0) for s in seeds)

    # -- discovery -----------------------------------------------------
    def _extract(self, text, base_url):
        """Yield candidate asset URLs on the target domain found in `text`."""
        found = set()
        pattern = r'https?://%s/[^\s"\'`<>\\)\\!]+' % re.escape(self.domain)
        for m in re.finditer(pattern, text):
            found.add(_clean(m.group(0)))
        for m in RE_REL.finditer(text):
            raw = m.group(1) or m.group(2) or m.group(3) or m.group(4)
            if not raw:
                continue
            found.add(urljoin(base_url, _clean(raw)))
        for m in RE_SOURCEMAP.finditer(text):
            found.add(urljoin(base_url, _clean(m.group(1))))
        # Service-worker registration, importScripts() and Workbox precache
        # lists: these are the closest thing to a directory listing.
        for m in RE_SW_REGISTER.finditer(text):
            found.add(urljoin(base_url, _clean(m.group(1))))
        for m in RE_IMPORT_SCRIPTS.finditer(text):
            for quoted in re.findall(r'["\']([^"\']+)["\']', m.group(1)):
                found.add(urljoin(base_url, _clean(quoted)))
        for m in RE_PRECACHE_URL.finditer(text):
            found.add(urljoin(base_url, _clean(m.group(1))))

        out = []
        for url in found:
            if _has_placeholder(url):
                continue
            url = _normalize(url, self.domain)
            parsed = urlparse(url)
            if parsed.scheme not in ('http', 'https'):
                continue
            if parsed.netloc != self.domain:
                continue
            ext = _ext_of(parsed.path)
            if ext not in self.exts:
                self.rejected.append(url)
                continue
            out.append(url)
        return out

    # -- discovery -----------------------------------------------------
    def _probe(self, url):
        """HEAD probe: return the URL when the object exists, else None."""
        try:
            r = self.session.head(url, timeout=15, allow_redirects=True)
        except Exception:
            return None
        return url if r.status_code == 200 else None

    def discover_roots(self, words, prefixes, files=ROOT_PROBE_FILES):
        """Guess app-root names and probe a small entry-filename set against
        each. Needed because listing is disabled and not every app ships an
        index.html (e.g. `m/reward-pc-kits/` only has sdk.js + style.css)."""
        jobs = []
        for prefix in prefixes:
            head = ('%s/' % prefix) if prefix else ''
            for word in words:
                for name in files:
                    jobs.append('https://%s/%s%s/%s' % (self.domain, head, word, name))
        print('root discovery: probing %d candidate files ...' % len(jobs))
        hits = []
        with ThreadPoolExecutor(max_workers=12) as pool:
            for res in pool.map(self._probe, jobs):
                if res:
                    hits.append(res)
        print('root discovery: %d hits' % len(hits))
        for h in sorted(hits):
            print('    + %s' % h)
        return hits

    def discover_sw(self, roots):
        """Probe service workers at the given app roots. A Workbox precache
        manifest reachable from a SW enumerates every hashed asset of an app."""
        jobs = ['https://%s/%s%s' % (self.domain, r.lstrip('/'), name)
                for r in sorted(set(roots)) for name in SW_FILES]
        if not jobs:
            return []
        print('service-worker discovery: probing %d roots ...' % len(jobs))
        hits = []
        with ThreadPoolExecutor(max_workers=12) as pool:
            for res in pool.map(self._probe, jobs):
                if res:
                    hits.append(res)
        print('service-worker discovery: %d hits' % len(hits))
        for h in sorted(hits):
            print('    + %s' % h)
        return hits

    # -- fetching ------------------------------------------------------
    @staticmethod
    def _scannable(url, resp):
        """Only text responses are scanned for further references. The URL
        extension alone is unreliable here: the login shells carry a query
        string and are served as text/html."""
        ctype = ct(resp).lower()
        if not ctype:
            return True
        if any(t in ctype for t in ('javascript', 'css', 'html', 'json', 'svg',
                                    'xml', 'text/plain')):
            return True
        return urlparse(url).path.lower().endswith(SCANNABLE)

    def _get(self, url):
        """GET, sending conditional headers only when we actually hold the
        object.

        A 304 means "your copy is current", so it is only meaningful if the file
        is on disk. After a fresh clone the manifest (which is committed) still
        carries every ETag while the assets themselves are absent — asking
        conditionally there would 304 on everything and restore nothing.
        """
        headers = None
        if (url in self.cond and not self.force
                and os.path.exists(local_path(self.out_root, self.domain, url))):
            etag, last_modified = self.cond[url]
            headers = {}
            if etag:
                headers['If-None-Match'] = etag
            if last_modified:
                headers['If-Modified-Since'] = last_modified
        return self.session.get(url, timeout=30, allow_redirects=True,
                                headers=headers)

    def load_manifest(self):
        """Read back the previous manifest so `--from-manifest` can re-fetch
        exactly the recorded URLs, and so conditional requests are possible."""
        path = os.path.join(self.out_root, self.domain, '_manifest.json')
        if not os.path.exists(path):
            return []
        try:
            with open(path, encoding='utf-8') as fh:
                data = json.load(fh)
        except (OSError, ValueError):
            return []
        assets = data.get('assets', [])
        for a in assets:
            self.cond[a['url']] = (a.get('etag'), a.get('last_modified'))
        return assets

    def run(self):
        while self.queue:
            url, depth = self.queue.popleft()
            key = url.split('#')[0]
            if key in self.seen:
                continue
            self.seen.add(key)

            if len(self.manifest) >= self.max_files:
                print('! max-files (%d) reached; stopping' % self.max_files)
                break

            # Seed pages live on other hosts: they are crawled to discover
            # assets but must never be written into the mirror.
            on_domain = urlparse(url).netloc == self.domain
            rel = os.path.relpath(local_path(self.out_root, self.domain, url),
                                  self.out_root).replace('\\', '/')
            print('[%d] d=%d %s%s' % (len(self.manifest) + 1, depth, key,
                                      '' if on_domain else '  (seed, not saved)'))

            if self.dry_run:
                resp = None
                status = 0
            else:
                try:
                    resp = self._get(url)
                except Exception as exc:
                    print('    ! request failed: %s' % type(exc).__name__)
                    continue
                status = resp.status_code
                if status == 304:
                    # Unchanged upstream: keep the local copy as-is.
                    print('    = unchanged (304)')
                    self.unchanged += 1
                    if on_domain:
                        self.manifest.append({
                            'url': url,
                            'file': rel.replace(self.domain + '/', '', 1),
                            'bytes': 0, 'sha1': '', 'content_type': '',
                            'depth': depth,
                            'etag': self.cond[url][0],
                            'last_modified': self.cond[url][1],
                        })
                    continue
                if status != 200:
                    print('    ! HTTP %s - skipped' % status)
                    continue
                body = resp.content
                if len(body) > self.max_bytes:
                    print('    ! %d bytes > max-bytes - skipped' % len(body))
                    continue
                if on_domain:
                    dest = local_path(self.out_root, self.domain, url)
                    if os.path.exists(dest) and not self.force:
                        print('    = already present (use --force to re-download)')
                    else:
                        os.makedirs(os.path.dirname(dest), exist_ok=True)
                        with open(dest, 'wb') as fh:
                            fh.write(body)
                        print('    -> %s (%d bytes)' % (rel, len(body)))
                    self.manifest.append({
                        'url': url,
                        'file': rel.replace(self.domain + '/', '', 1),
                        'bytes': len(body),
                        'sha1': hashlib.sha1(body).hexdigest(),
                        'content_type': ct(resp),
                        'etag': resp.headers.get('ETag'),
                        'last_modified': resp.headers.get('Last-Modified'),
                        'depth': depth,
                    })

            if depth >= self.max_depth:
                continue
            text = None
            if self.dry_run:
                try:
                    probe = self._get(url)
                    if probe.status_code == 200 and self._scannable(url, probe):
                        text = probe.content.decode('utf-8', 'replace')
                except Exception:
                    text = None
            elif resp is not None and self._scannable(url, resp):
                try:
                    text = resp.content.decode('utf-8', 'replace')
                except Exception:
                    text = None
            if text:
                for child in self._extract(text, url):
                    if child not in self.seen:
                        self.queue.append((child, depth + 1))
            if not self.dry_run:
                time.sleep(self.delay)

        return self.manifest

    def write_url_list(self):
        """Plain-text list of the original URLs, one per line and sorted by
        local path, so the mirror can be re-fetched with curl/wget/xargs or
        diffed against a later run."""
        path = os.path.join(self.out_root, self.domain, '_urls.txt')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8', newline='\n') as fh:
            for a in sorted(self.manifest, key=lambda a: a['file']):
                fh.write(a['url'] + '\n')
        return path

    def write_manifest(self):
        """Write the manifest from what is actually on disk, so the recorded
        size/hash stay correct even when --beautify rewrote the files."""
        path = os.path.join(self.out_root, self.domain, '_manifest.json')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        assets = []
        for entry in sorted(self.manifest, key=lambda a: a['file']):
            disk = os.path.join(self.out_root, self.domain,
                                entry['file'].replace('/', os.sep))
            try:
                with open(disk, 'rb') as fh:
                    blob = fh.read()
                entry = dict(entry, bytes=len(blob),
                             sha1=hashlib.sha1(blob).hexdigest())
            except OSError:
                pass
            assets.append(entry)
        payload = {
            'domain': self.domain,
            'generated_at': time.strftime('%Y-%m-%dT%H:%M:%S%z'),
            'asset_count': len(assets),
            'assets': assets,
        }
        with open(path, 'w', encoding='utf-8', newline='\n') as fh:
            json.dump(payload, fh, indent=2, ensure_ascii=False)
            fh.write('\n')
        return path


BEAUTIFY_PKG = 'js-beautify@1.15.1'
BEAUTIFY_EXT = ('.js', '.mjs', '.cjs', '.css')


def beautify(out_root, domain, files):
    """Reformat stored JS/CSS with js-beautify (indent size 2, no line
    wrapping) — the convention documented in `src/static/README.md`, so stored
    bundles stay diffable.

    Runs through `npx`, which fetches the package on demand; Node is required.
    """
    targets = [f for f in files if f.lower().endswith(BEAUTIFY_EXT)]
    if not targets:
        print('nothing to beautify')
        return 1
    base = os.path.join(out_root, domain)
    # Pass paths relative to the mirror root and in small batches: Windows
    # caps the command line at ~32k characters.
    rel = [os.path.relpath(f, base) for f in targets]
    batch, chunk = rel, 40
    print('beautifying %d JS/CSS files with %s ...' % (len(rel), BEAUTIFY_PKG))
    done = 0
    for start in range(0, len(batch), chunk):
        part = batch[start:start + chunk]
        cmd = ['npx', '--yes', BEAUTIFY_PKG, '-r', '-s', '2', '-n'] + part
        try:
            if os.name == 'nt':
                # npx ships as npx.cmd on Windows, which needs a shell to launch.
                res = subprocess.run(subprocess.list2cmdline(cmd), shell=True,
                                     cwd=base, capture_output=True, text=True)
            else:
                res = subprocess.run(cmd, cwd=base, capture_output=True, text=True)
        except FileNotFoundError:
            print('! npx not found - skipping beautification')
            return 1
        if res.returncode != 0:
            print('! js-beautify failed on batch %d (rc=%s): %s'
                  % (start // chunk, res.returncode,
                     (res.stderr or res.stdout or '')[-300:]))
            return 1
        done += len(part)
        print('  %4d / %d' % (done, len(rel)))
    print('beautified %d files' % len(rel))
    return 0


def main(argv=None):
    here = os.path.dirname(os.path.abspath(__file__))
    parser = argparse.ArgumentParser(
        description='Mirror static assets of a Weibo CDN domain into src/static/.')
    parser.add_argument('--domain', default='h5.sinaimg.cn',
                        help='CDN domain to mirror (default: h5.sinaimg.cn).')
    parser.add_argument('--out', default=os.path.join(here, 'static'),
                        help='Output root (default: src/static).')
    parser.add_argument('--seed', action='append', default=None,
                        help='Extra seed page URL (repeatable). '
                             'Overrides the built-in seed list when given.')
    parser.add_argument('--max-depth', type=int, default=4,
                        help='Asset -> asset recursion depth (default 4).')
    parser.add_argument('--max-files', type=int, default=None,
                        help='Safety cap on downloaded assets. Default 500, or '
                             '<recorded count + 100> with --from-manifest.')
    parser.add_argument('--max-bytes', type=int, default=25 * 1024 * 1024,
                        help='Skip files larger than this (default 25 MiB).')
    parser.add_argument('--ext', default=','.join(DEFAULT_EXT),
                        help='Comma-separated extension allow-list.')
    parser.add_argument('--delay', type=float, default=0.05,
                        help='Delay between requests in seconds (default 0.05).')
    parser.add_argument('--force', action='store_true',
                        help='Re-download assets that already exist locally.')
    parser.add_argument('--dry-run', action='store_true',
                        help='Discover and print only; write nothing.')
    parser.add_argument('--beautify', action='store_true',
                        help='Reformat stored JS/CSS with js-beautify '
                             '(indent 2, no wrapping) via npx; needs Node.')
    parser.add_argument('--beautify-only', action='store_true',
                        help='Skip fetching; just re-beautify everything '
                             'already stored under --out/--domain.')
    parser.add_argument('--from-manifest', action='store_true',
                        help='Re-fetch exactly the URLs recorded in '
                             '_manifest.json (no discovery). Uses conditional '
                             'requests so unchanged assets are not rewritten.')
    parser.add_argument('--discover-roots', action='store_true',
                        help='Brute-force app roots: probe <prefix>/<word>/ '
                             'against a set of entry filenames.')
    parser.add_argument('--root-words', default=','.join(ROOT_WORDS),
                        help='Comma-separated word list for --discover-roots.')
    parser.add_argument('--discover-sw', action='store_true',
                        help='Probe service workers at every known app root; '
                             'their Workbox precache manifest enumerates '
                             'assets the crawl cannot reach.')
    args = parser.parse_args(argv)

    if args.beautify_only:
        base = os.path.join(args.out, args.domain)
        stored = []
        for dirpath, _dirnames, filenames in os.walk(base):
            for name in filenames:
                stored.append(os.path.join(dirpath, name))
        beautify(args.out, args.domain, stored)
        return 0

    seeds = tuple(args.seed) if args.seed else DEFAULT_SEEDS
    max_files = args.max_files if args.max_files is not None else 500
    fetcher = Fetcher(args.domain, args.out, seeds,
                      args.ext.split(','), args.max_depth, max_files,
                      args.max_bytes, args.delay, args.force, args.dry_run)

    extra = list(seeds)
    if args.from_manifest:
        # Re-fetch exactly what was recorded last time: no discovery, so an
        # update never depends on the crawl still finding the assets.
        recorded = fetcher.load_manifest()
        if not recorded:
            print('! no _manifest.json for %s; nothing to re-fetch' % args.domain)
            return 1
        # Never let the cap silently truncate: a re-fetch that drops entries
        # would lose the record of assets we still have on disk.
        if args.max_files is None:
            fetcher.max_files = len(recorded) + 100
        print('re-fetching %d recorded URLs (conditional)' % len(recorded))
        for a in recorded:
            fetcher.queue.append((a['url'], 0))
        manifest = fetcher.run()
        fetched = {a['url'] for a in manifest}
        for a in recorded:
            if a['url'] not in fetched:
                manifest.append(dict(a, kept_from_previous=True))
        missing = len(recorded) - len(fetched)
        if missing:
            print('! %d recorded URLs were not re-fetched; kept as-is' % missing)
        print()
        print('urls recorded    : %d' % len(recorded))
        print('assets stored    : %d' % len(manifest))
        print('unchanged (304)  : %d' % fetcher.unchanged)
        if not args.dry_run:
            if args.beautify:
                paths = [os.path.join(args.out, args.domain,
                                      a['file'].replace('/', os.sep))
                         for a in manifest]
                beautify(args.out, args.domain, paths)
            print('manifest         : %s' % fetcher.write_manifest())
            print('url list         : %s' % fetcher.write_url_list())
        return 0

    if args.discover_roots:
        extra += fetcher.discover_roots(
            [w for w in args.root_words.split(',') if w], ROOT_PREFIXES)
    if args.discover_sw:
        extra += fetcher.discover_sw(_roots(extra))
    for u in extra:
        fetcher.queue.append((u, 0))

    manifest = fetcher.run()

    # Second SW pass: the crawl may have revealed app roots we did not know
    # about when the first pass ran.
    if args.discover_sw:
        more = fetcher.discover_sw(_roots(a['url'] for a in manifest))
        if more:
            for u in more:
                fetcher.queue.append((u, 0))
            fetcher.run()

    print()
    print('seeds            : %d (+%d discovered)' % (len(seeds), len(extra) - len(seeds)))
    print('urls discovered  : %d' % len(fetcher.seen))
    print('assets stored    : %d' % len(manifest))
    print('unchanged (304)  : %d' % fetcher.unchanged)
    print('off-domain/other : %d' % len(fetcher.rejected))
    if manifest:
        total = sum(a['bytes'] for a in manifest)
        print('total bytes      : %d' % total)
    if not args.dry_run:
        if args.beautify:
            paths = [os.path.join(args.out, args.domain,
                                  a['file'].replace('/', os.sep))
                     for a in manifest]
            beautify(args.out, args.domain, paths)
        print('manifest         : %s' % fetcher.write_manifest())
        print('url list         : %s' % fetcher.write_url_list())
    return 0


if __name__ == '__main__':
    sys.exit(main())
