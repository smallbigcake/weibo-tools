"""Live availability test for the catalogued Weibo endpoints.

Reads the unified `doc/api_inventory.json`, issues REAL requests using the
logged-in session (real UID/mid resolved from live data), and writes back a
per-endpoint `live_status` verdict. Then re-renders `doc/api_inventory.md`
(via api_explorer.render_markdown) so the doc shows live availability.

Verdicts:
  ok                  HTTP 200 and success envelope ({ok:1}/{result:true}).
  ok_http             HTTP 200 but non-standard envelope (still reachable).
  exists_param_needed HTTP 400/500: endpoint alive, needs business params.
  dead                HTTP 404: path removed by the server.
  blocked             HTTP 403: exists but anti-crawl / source-check blocked.
  ssl_cert_expired    web.im.weibo.com: endpoint exists but the bundled CA is
                      expired; only reachable from a browser / updated CA.
  mutating_skipped    POST that changes state; not exercised to protect account.
  error               request failed (network/TLS other than the CA case).

Mutating POSTs are deliberately skipped. No PII/credentials are persisted.

Usage (from project root):
    python src/live_test.py
"""
import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from auth import Auth, USER_AGENT
import api_explorer as ae

HERE = os.path.dirname(os.path.abspath(__file__))
DOC_DIR = os.path.join(HERE, '..', 'doc')
INV = os.path.join(DOC_DIR, 'api_inventory.json')
CERT = os.path.join(HERE, 'cert', 'im_weibo_cert_chain.crt')


def get_real_context(auth):
    r = auth.session.get('https://weibo.com/',
                          headers={'User-Agent': USER_AGENT, 'Accept': 'text/html',
                                   'Referer': 'https://weibo.com/'},
                          timeout=15, allow_redirects=True)
    um = re.search(r'"user"\s*:\s*\{\s*"id"\s*:\s*(\d+)', r.text)
    uid = um.group(1) if um else ''
    mid = ''
    try:
        rr = auth.session.get('https://weibo.com/ajax/feed/unreadfriendstimeline',
                              headers={'User-Agent': USER_AGENT,
                                       'Accept': 'application/json',
                                       'Referer': 'https://weibo.com/',
                                       'x-requested-with': 'XMLHttpRequest'},
                              timeout=15)
        st = rr.json().get('statuses') or []
        if st:
            mid = str(st[0].get('id') or st[0].get('mid') or '')
    except Exception:
        pass
    return {'uid': uid, 'mid': mid}


def build_params(path, ctx):
    low = path.lower()
    p = {}
    if 'uid' in low or 'user' in low:
        p['uid'] = ctx['uid']
    if any(k in low for k in ('show', 'longtext', 'setlike', 'likelist',
                              'repost', 'destroy', 'comment', 'mentions',
                              'edit', 'translate', 'extend')):
        p['id'] = ctx['mid']
    if 'page' in low:
        p['page'] = 1
    if 'count' in low:
        p['count'] = 10
    # Known-good overrides discovered during testing.
    if 'feed/hottimeline' in low:
        p = {'refresh_type': '4', 'page': 1, 'count': 10}
    elif 'feed/friendstimeline' in low:
        p = {'page': 1, 'count': 10, 'version': '2023091801'}
    elif 'feed/groupstimeline' in low:
        p = {'list_id': '0', 'refresh': '4', 'fast_refresh': '1', 'count': '25'}
    elif 'statuses/buildcomments' in low:
        p = {'flow': '0', 'is_reload': '1', 'id': ctx['mid'], 'count': '10', 'page': '1'}
    elif 'statuses/edithistory' in low:
        p = {'mid': ctx['mid']}
    elif 'statuses/longtext' in low:
        p = {'id': ctx['mid']}
    elif 'comments/hotflow' in low:
        p = {'id': ctx['mid'], 'mid': ctx['mid'], 'max_id_type': '0'}
    elif 'multimedia/getliveinfodetail' in low:
        p = {'live_id': '0'}
    elif 'profile/info' in low:
        p = {'uid': ctx['uid'], 'is_encoded': '0'}
    elif 'statuses/mymblog' in low:
        p = {'uid': ctx['uid'], 'page': '1', 'feature': '0'}
    elif 'favorites/all_fav' in low:
        p = {'uid': ctx['uid'], 'page': '1', 'with_total': 'true'}
    return p


def is_success(text):
    try:
        o = json.loads(text)
    except Exception:
        return None
    if isinstance(o, dict):
        if o.get('ok') == 1 or o.get('result') is True or o.get('code') == 1:
            return True
        if o.get('ok') == 0 or o.get('errno') == 1 or 'error' in o:
            return False
    return None


def verdict_for(rec, resp_status, avail, err, host):
    if resp_status == 'SKIP_MUTATING':
        return 'mutating_skipped'
    if err:
        if host == 'web.im.weibo.com':
            return 'ssl_cert_expired'
        return 'error'
    if resp_status == 404:
        return 'dead'
    if resp_status == 403:
        return 'blocked'
    if resp_status in (400, 500):
        return 'exists_param_needed'
    if resp_status == 200:
        return 'ok' if avail is True else 'ok_http'
    return 'error'


def main():
    auth = Auth()
    auth.load()
    if not auth.test_login():
        print('Not logged in. Run src/test/run_login.py first.')
        return
    ctx = get_real_context(auth)
    print('context uid=%s mid=%s' % (ctx['uid'], ctx['mid']))

    inv = json.load(open(INV, encoding='utf-8'))
    endpoints = inv['endpoints']

    for key, rec in endpoints.items():
        host = rec.get('host', '')
        path = rec.get('path', '')
        method = rec.get('method', 'GET')
        url = rec.get('url') or ('https://' + host + path)
        mutating = rec.get('mutating', False)
        if method == 'POST' and mutating:
            rec['live_status'] = 'mutating_skipped'
            rec['live_available'] = None
            continue

        params = build_params(path, ctx)
        headers = {'User-Agent': USER_AGENT,
                   'Accept': 'application/json, text/plain, */*',
                   'Referer': 'https://' + host + '/',
                   'x-requested-with': 'XMLHttpRequest'}
        kwargs = dict(params=params, headers=headers, timeout=20, allow_redirects=False)
        if host == 'web.im.weibo.com':
            kwargs['verify'] = CERT
        try:
            if method == 'GET':
                resp = auth.session.get(url, **kwargs)
            else:
                resp = auth.session.post(url, data=params, **kwargs)
            avail = is_success(resp.text)
            rec['live_status'] = verdict_for(rec, resp.status_code, avail, None, host)
            rec['live_http_status'] = resp.status_code
            rec['live_available'] = avail
        except Exception as e:
            rec['live_status'] = verdict_for(rec, None, None, str(e), host)
            rec['live_available'] = None
            rec['live_error'] = str(e)[:160]
        print('%-22s %-40s -> %s' % (rec['live_status'], host + path, params))

    json.dump(inv, open(INV, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

    c = Counter(r.get('live_status') for r in endpoints.values())
    print('--- live verdicts ---')
    for k, v in sorted(c.items(), key=lambda x: -x[1]):
        print('  %-22s %d' % (k, v))

    # re-render markdown with the live column
    ae.render_markdown()
    print('Re-rendered', os.path.join(DOC_DIR, 'api_inventory.md'))


if __name__ == '__main__':
    main()
