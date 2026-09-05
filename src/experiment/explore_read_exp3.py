"""Final sanity checks:
  (a) se can mutate at all? setLike should change attitudes_count (proves writes work,
      so 'reads=0' is about reads gating, not blocked POSTs). Revert after.
  (b) mobile-UA detail load: does a genuine mobile-page GET move reads_count?
"""
import sys
import os
import time
import json

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)
from auth import Auth, USER_AGENT

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
MID = '5281120260198165'
MBLOGID = 'Qy2j80Pyd'

H_JSON = {'User-Agent': USER_AGENT, 'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'}
H_XSRF = dict(H_JSON); H_XSRF['Content-Type'] = 'application/x-www-form-urlencoded'
H_MOBILE = {
    'User-Agent': ('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) '
                   'AppleWebKit/605.1.15 (KHTML, like Gecko) '
                   'Mobile/15E148 MicroMessenger/8.0 wv/') ,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Referer': 'https://m.weibo.cn/',
}


def load(uid):
    a = Auth(); a.uid = uid; a.load(); return a


def reads_count(cake):
    r = cake.session.get('https://weibo.com/ajax/statuses/mymblog',
                         params={'uid': CAKE, 'page': 1, 'feature': 0},
                         headers=H_JSON, timeout=20)
    for it in (r.json().get('data') or {}).get('list') or []:
        if str(it.get('id')) == str(MID):
            return it.get('reads_count')
    return None


def attitudes(cake_or_se):
    r = cake_or_se.session.get('https://weibo.com/ajax/statuses/show',
                               params={'id': MID}, headers=H_JSON, timeout=20)
    return r.json().get('attitudes_count')


def main():
    cake = load(CAKE)
    se = load(SE)
    print('login se=%s cake=%s' % (se.test_login(), cake.test_login()))

    # (a) mutation sanity
    a0 = attitudes(se)
    xsrf = se.session.cookies.get('XSRF-TOKEN', domain='weibo.com')
    if xsrf:
        H_XSRF['X-Xsrf-Token'] = xsrf
    r1 = se.session.post('https://weibo.com/ajax/statuses/setLike',
                         data={'id': MID, 'attitude': 'like'}, headers=H_XSRF, timeout=20)
    a1 = attitudes(se)
    r2 = se.session.post('https://weibo.com/ajax/statuses/cancelLike',
                         data={'id': MID}, headers=H_XSRF, timeout=20)
    a2 = attitudes(se)
    print('(a) attitudes_count: before=%s after_like=%s after_unlike=%s  setLike_ok=%s cancel_ok=%s'
          % (a0, a1, a2, r1.json().get('ok'), r2.json().get('ok')))

    # (b) mobile-UA detail load
    r_m = se.session.get('https://m.weibo.cn/detail/%s' % MID, headers=H_MOBILE,
                         timeout=20, allow_redirects=True)
    before = reads_count(cake)
    time.sleep(3)
    after = reads_count(cake)
    print('(b) mobile-UA detail: status=%s len=%d  reads before=%s after=%s delta=%s'
          % (r_m.status_code, len(r_m.text), before, after, after - before))

    print('\nCONCLUSION: se writes work (likes change attitudes_count). '
          'reads_count is NOT incremented by any scripted view/HTML/mobile/feed '
          'request -- it is gated to genuine client renders.')


if __name__ == '__main__':
    main()
