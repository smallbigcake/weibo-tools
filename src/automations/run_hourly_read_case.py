"""Single-cycle hourly observation for post P9v636F64 (id 5122644911587948).

Intended to be invoked once per hour by the `weibo-hourly-case` CodeBuddy
automation (or manually). It:
  - measures reads_count BEFORE visiting (author-view statuses/extend),
  - visits the post with the viewer account (pure-HTTP GET of the detail page,
    no browser),
  - measures reads_count AFTER,
and appends one JSON line to src/log/automation/hourly_read_case.jsonl.

Controlled visits do NOT increment reads_count (proven); the visit is just a
fixed observation point to watch the ORGANIC growth of a real public post.
Access is performed entirely over HTTP via the requests session -- no
browser/Playwright is used.

Usage (from the project root):

    venvs/weibo-env\\Scripts\\python.exe src/automations/run_hourly_read_case.py
"""
import sys
import os
import time
import json

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)

from auth import Auth  # noqa: E402


def _load_experiment_config():
    """Local, git-ignored config holding the Weibo account UIDs."""
    cfg_path = os.path.join(os.path.dirname(SRC), 'config',
                            'experiment.local.json')
    if not os.path.exists(cfg_path):
        raise SystemExit('Missing %s - copy config/experiment.local.json.example '
                         'to it and fill in your Weibo UIDs' % cfg_path)
    with open(cfg_path, encoding='utf-8') as f:
        return json.load(f)


_EXP = _load_experiment_config()
AUTHOR_UID = _EXP['author_uid']
VIEWER_UID = _EXP['viewer_uid']
CASE_MB = 'P9v636F64'
CASE_ID = '5122644911587948'
DETAIL = 'https://weibo.com/%s/%s' % (AUTHOR_UID, CASE_MB)
VIEWER_COOKIE_FILE = os.path.join(SRC, 'cookies.%s.weibo' % VIEWER_UID)
# Observation output is a log, so it lives with the other runtime logs.
LOG = os.path.join(SRC, 'log', 'automation', 'hourly_read_case.jsonl')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
H_JSON = {'User-Agent': UA, 'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'}


def build_viewer_session():
    """Authenticated requests session for the viewer, loaded from its cookie file."""
    s = requests.Session()
    s.headers.update({'User-Agent': UA})
    with open(VIEWER_COOKIE_FILE, encoding='utf-8') as f:
        for c in json.load(f):
            try:
                s.cookies.set(name=c['name'], value=c['value'],
                              domain=c.get('domain'), path=c.get('path', '/'),
                              secure=c.get('secure', False), expires=c.get('expires'))
            except Exception:
                pass
    return s


def measure(session):
    """reads_count for CASE_ID via statuses/extend (single precise call)."""
    for _ in range(3):
        try:
            r = session.get('https://weibo.com/ajax/statuses/extend',
                            params={'id': CASE_ID}, headers=H_JSON, timeout=20)
            if r.status_code == 200:
                rc = r.json().get('reads_count')
                if rc is not None:
                    return rc
        except Exception:
            pass
        time.sleep(2)
    return None


def visit(session, url, referer=None):
    """Pure-HTTP access to the post detail page (no browser).

    reads_count is gated to genuine client renders, so a scripted GET does NOT
    increment it (proven); the visit is only a fixed observation point.
    """
    try:
        r = session.get(url, headers={
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Referer': referer or 'https://weibo.com/',
        }, timeout=30, allow_redirects=True)
        if r.status_code == 200:
            return 'ok'
        return 'http_%d' % r.status_code
    except Exception as e:
        return 'http_err:%s' % str(e)[:80]


def main():
    author = Auth()
    author.uid = AUTHOR_UID
    author.load()
    viewer_session = build_viewer_session()
    before = measure(author.session)
    res = visit(viewer_session, DETAIL)
    time.sleep(3)
    after = measure(author.session)
    rec = {'iso': time.strftime('%Y-%m-%d %H:%M:%S'), 'cycle': 'auto',
           'before_reads': before, 'after_reads': after,
           'delta': (after - before) if (before is not None and after is not None) else None,
           'visit_result': res}
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')
    print(json.dumps(rec, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
