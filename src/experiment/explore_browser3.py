"""Browser test #3 (decisive, fully reversible): does a FOLLOWER's home-timeline
impression increment reads_count? This is the canonical source of organic reads.

Flow (all reverted in finally):
  1. se FOLLOWS cake            (friendships/create)   -> reversible
  2. cake posts a TEMP weibo    (statuses/update)      -> captured id
  3. real browser (se) loads HOME timeline; the new post appears as a feed
     impression -> measure its reads_count (as cake) before/after several loads
  4. CLEANUP: cake DESTROYS the temp post; se UNFOLLOWS cake
Nothing is written to disk except src/experiment logs; cookies are injected read-only.
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
SE = _EXP['viewer_uid']
SE_COOKIE_FILE = os.path.join(SRC, 'cookies.%s.weibo' % SE)
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
LOG = os.path.join(SRC, 'tmp', 'readcnt_read_browser3_log.jsonl')
TEST_TEXT = '【read-count experiment marker %s】' % int(time.time())

H_JSON = {'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                         '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
          'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'}


def load_cookies_readonly(path):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    pw, now = [], time.time()
    for c in data:
        d = {'name': c['name'], 'value': c['value'],
             'domain': c.get('domain'), 'path': c.get('path', '/')}
        exp = c.get('expires')
        if isinstance(exp, (int, float)) and exp > now:
            d['expires'] = float(exp)
        if c.get('secure'):
            d['secure'] = True
        if c.get('http_only'):
            d['httpOnly'] = True
        if d.get('domain'):
            pw.append(d)
    return pw


def xsrf_headers(session):
    h = dict(H_JSON)
    t = session.cookies.get('XSRF-TOKEN', domain='weibo.com')
    if t:
        h['X-Xsrf-Token'] = t
    h['Content-Type'] = 'application/x-www-form-urlencoded'
    return h


def post_json(session, url, data):
    return session.post(url, data=data, headers=xsrf_headers(session), timeout=20).json()


def reads_count_of(cake_session, mid):
    r = cake_session.get('https://weibo.com/ajax/statuses/mymblog',
                         params={'uid': CAKE, 'page': 1, 'feature': 0},
                         headers=H_JSON, timeout=20)
    for it in (r.json().get('data') or {}).get('list') or []:
        if str(it.get('id')) == str(mid):
            return it.get('reads_count')
    return None


def main():
    cake = Auth(); cake.uid = CAKE; cake.load()
    se = Auth(); se.uid = SE; se.load()
    se_cookies = load_cookies_readonly(SE_COOKIE_FILE)
    new_mid = None
    followed = False

    def log(tag, mid, val):
        with open(LOG, 'a', encoding='utf-8') as f:
            f.write(json.dumps({'t': time.strftime('%H:%M:%S'), 'tag': tag,
                                'mid': mid, 'reads_count': val}, ensure_ascii=False) + '\n')
        print('  %-22s mid=%s reads_count=%s' % (tag, mid, val))

    try:
        # 1. se follows cake
        r = post_json(se.session, 'https://weibo.com/ajax/friendships/create',
                      {'uid': CAKE})
        followed = (r.get('ok') == 1)
        print('se follow cake -> ok=%s followed=%s' % (r.get('ok'), followed))

        # 2. cake posts temp weibo
        r2 = post_json(cake.session, 'https://weibo.com/ajax/statuses/update',
                       {'content': TEST_TEXT})
        new_mid = (r2.get('data') or {}).get('id') or (r2.get('data') or {}).get('mid')
        print('cake temp post -> ok=%s mid=%s' % (r2.get('ok'), new_mid))
        if not new_mid:
            print('ABORT: no new post id'); return

        # initial reads (right after creation)
        time.sleep(3)
        log('created', new_mid, reads_count_of(cake.session, new_mid))

        # 3. real browser: se loads HOME timeline (post should appear as impression)
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path=CHROME, headless=False,
                                  args=['--no-first-run', '--no-default-browser-check',
                                        '--disable-blink-features=AutomationControlled'])
            ctx = b.new_context(user_agent=H_JSON['User-Agent'])
            ctx.add_cookies(se_cookies)
            pg = ctx.new_page()
            for i in range(1, 5):
                pg.goto('https://weibo.com/', wait_until='networkidle', timeout=30000)
                time.sleep(4)
                txt = pg.inner_text('body')[:4000]
                shown = TEST_TEXT[:20] in txt
                time.sleep(6)
                log('home#%d(shown=%s)' % (i, shown), new_mid,
                    reads_count_of(cake.session, new_mid))
                time.sleep(4)
            b.close()

        print('\n... waiting 60s ...')
        time.sleep(60)
        log('after60s', new_mid, reads_count_of(cake.session, new_mid))
    finally:
        # 4. CLEANUP (always)
        if new_mid:
            rd = post_json(cake.session, 'https://weibo.com/ajax/statuses/destroy',
                           {'id': new_mid})
            print('cake destroy temp post -> ok=%s' % rd.get('ok'))
        if followed:
            uf = post_json(se.session, 'https://weibo.com/ajax/friendships/destroy',
                           {'uid': CAKE})
            print('se unfollow cake -> ok=%s' % uf.get('ok'))
        print('cleanup done. log ->', LOG)


if __name__ == '__main__':
    main()
