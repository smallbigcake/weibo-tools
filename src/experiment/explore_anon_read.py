"""Anonymous (no-login) read-count experiment on a SEPARATE, genuinely-anonymously-
viewable OLD public post.

Prior target (PvtOCnF7z) was invalid: it returned ok:0 / "暂无查看权限" / 20112 even for an
anonymous API call, so an anonymous user could NOT actually view it -> that test was
inconclusive. This run uses P9v636F64 (id 5122644911587948, reads=1081, Jan 2025), which we
verified is anonymously VIEWABLE (statuses/show ok:1 with real guest cookies). It is also in
the cached history => reads_count measurable via mymblog, and OLD (~1.7y) => near-zero organic,
so a +1 from an anonymous visit is detectable.

- Target differs from the running experiment's targets (PvL9Odf6Z / P6mkiuQRe) => no contamination.
- Measurement uses cake's author-view mymblog (reads_count is author-facing); anonymous visit
  and measurement are independent.
- Each anonymous visit uses a FRESH Playwright context with NO cookies => a new anonymous
  identity, following redirects and storing set-cookies. First visit is headful (visible).
- After each visit, reads_count of the target is measured; delta vs baseline shows whether
  anonymous views count.
- Measurement scans a small window around the target's known page (from the cache) to keep API
  load low.
"""
import sys
import os
import time
import json

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)

from auth import Auth
from playwright.sync_api import sync_playwright

import json as _json


def _load_experiment_config():
    cfg_path = os.path.join(os.path.dirname(SRC), 'config', 'experiment.local.json')
    if not os.path.exists(cfg_path):
        raise SystemExit('Missing %s - copy config/experiment.local.json.example '
                         'to it and fill in your Weibo UIDs' % cfg_path)
    with open(cfg_path, encoding='utf-8') as f:
        return _json.load(f)


_EXP = _load_experiment_config()
CAKE = _EXP['author_uid']
ANON_MB = 'P9v636F64'
ANON_ID = '5122644911587948'
DETAIL = 'https://weibo.com/%s/%s' % (CAKE, ANON_MB)
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
LOG = os.path.join(SRC, 'tmp', 'readcnt_longread_anon_log.jsonl')
N = int(sys.argv[1]) if len(sys.argv) > 1 else 6

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
H_JSON = {'User-Agent': UA, 'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'}


def log(event, reads, base, **kw):
    rec = {'iso': time.strftime('%Y-%m-%d %H:%M:%S'), 'event': event,
           'reads': reads,
           'delta': (reads - base) if (reads is not None and base is not None) else None}
    rec.update(kw)
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')
    extra = {k: kw[k] for k in ('final_url', 'anon_cookies', 'note') if k in kw}
    print('[%s] %-16s reads=%s d=%s %s' % (rec['iso'], event, reads, rec['delta'], extra), flush=True)


def target_page_from_cache():
    JSONL = os.path.join(SRC, 'tmp', 'cake_weibo_history.jsonl')
    for i, line in enumerate(open(JSONL, encoding='utf-8')):
        line = line.strip()
        if not line:
            continue
        try:
            o = json.loads(line)
        except Exception:
            continue
        if str(o.get('id')) == str(ANON_ID) or o.get('mblogid') == ANON_MB:
            return i // 20 + 1
    return None


def measure(cake, tid, hint=None):
    pages = []
    if hint:
        pages += list(range(max(1, hint - 3), hint + 6))
    pages += list(range(1, 135))
    seen = set()
    for page in pages:
        if page in seen:
            continue
        seen.add(page)
        lst = None
        for attempt in range(3):
            try:
                r = cake.session.get('https://weibo.com/ajax/statuses/mymblog',
                                     params={'uid': CAKE, 'page': page, 'feature': 0},
                                     headers=H_JSON, timeout=20)
                if r.status_code == 200:
                    lst = (r.json().get('data') or {}).get('list') or []
                    break
                time.sleep(5)
            except Exception:
                time.sleep(5)
        if lst is None:
            continue
        for it in lst:
            if str(it.get('id')) == str(tid):
                return it.get('reads_count'), page
        if not lst:
            break
        time.sleep(0.15)
    return None, None


def anon_visit(headful):
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, headless=not headful,
                              args=['--no-first-run', '--no-default-browser-check',
                                    '--disable-blink-features=AutomationControlled'])
        ctx = b.new_context(user_agent=UA)  # NO cookies => anonymous
        pg = ctx.new_page()
        try:
            pg.goto(DETAIL, wait_until='networkidle', timeout=30000)
        except Exception:
            pass
        time.sleep(8)
        final_url = pg.url
        cookies = ctx.cookies()
        b.close()
    return final_url, cookies


def main():
    hint = target_page_from_cache()
    print('target page hint=%s' % hint)
    cake = Auth(); cake.uid = CAKE; cake.load()
    base, page = measure(cake, ANON_ID, hint=hint)
    log('baseline', base, None, page=page)
    for i in range(1, N + 1):
        headful = (i == 1)
        final, cookies = anon_visit(headful=headful)
        domains = sorted({c.get('domain') for c in cookies})
        time.sleep(3)
        rc, _ = measure(cake, ANON_ID, hint=page)
        log('anon_visit#%d' % i, rc, base, final_url=final, anon_cookies=len(cookies),
            cookie_domains=domains, note=('headful' if headful else 'headless'))
        time.sleep(15)
    log('END', None, base, note='anonymous experiment done')


if __name__ == '__main__':
    main()
