"""Long-duration read-count experiment on a VALID PUBLIC target (RESUMABLE).

Targets are VERIFIED publicly-viewable via the anonymous statuses/show API (ok:1 with
guest cookies). Prior target PvL9Odf6Z returned 20112 "暂无查看权限" and control P6mkiuQRe
returned 20101 "该微博不存在" -> both invalid. Now PRIMARY=P9v636F64 (vis=0, reads~1081,
Jan 2025) and CONTROL=P7p4yAcM3 (vis=0, reads~1400, Dec 2024), both ~1.7y old -> ~0 organic.

Method:
  - VISIT = se opens the single post detail in a REAL Chromium. visit#1 uses a VISIBLE
    (headful) browser to preempt "headless filtered" objections; later visits headless.
    Also fires an API statuses/show as se.
  - MEASURE = cake scans mymblog to find target posts' reads_count. Sparse & spaced to
    avoid throttle. A SECONDARY (control) public post (P6mkiuQRe) is measured too but
    never visited -> proves the measurement is stable and isolates our effect.
  - Schedule: baseline, +5m stability(no visit), then visits at 0/+1h/+3h/+6h/+12h/+24h/
    +48h/+72h, with no-visit organic checks interleaved, to detect any dedup window.

State file (longread_state.json) lets the process be killed/relaunched and continue.
All artifacts under src/experiment (gitignored). Cookies read-only; no writes to data/cache.
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
# PRIMARY: verified PUBLIC & anonymous-viewable (statuses/show ok:1 with guest cookies).
# PvL9Odf6Z was swapped out: it returned 20112 "暂无查看权限" (restricted, not truly public).
# P9v636F64: vis=0, reads~1081, Jan 2025, ~1.7y old -> ~0 organic.
TARGET_MB = 'P9v636F64'
TARGET_ID = '5122644911587948'
# SECONDARY (control, never visited): also verified PUBLIC & anonymous-viewable.
# P6mkiuQRe was swapped out: it returned 20101 "该微博不存在" (not accessible).
# P7p4yAcM3: vis=0, reads~1400, Dec 2024, ~1.7y old.
CTRL_MB = 'P7p4yAcM3'
CTRL_ID = '5117646788628915'
DETAIL = 'https://weibo.com/%s/%s' % (CAKE, TARGET_MB)
SE_COOKIE_FILE = os.path.join(SRC, 'cookies.%s.weibo' % SE)
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
HIST = os.path.join(SRC, 'tmp', 'cake_weibo_history.json')
LOG = os.path.join(SRC, 'tmp', 'readcnt_longread_log.jsonl')
STATE = os.path.join(SRC, 'tmp', 'readcnt_longread_state.json')

H_JSON = {'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                         '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'),
          'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'}


def load_se_cookies():
    with open(SE_COOKIE_FILE, 'r', encoding='utf-8') as f:
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


def measure(cake_session, ids):
    """reads_count for each numeric post id via statuses/extend (single precise call)."""
    out = {}
    for i in ids:
        rc = None
        for _ in range(3):
            try:
                r = cake_session.get('https://weibo.com/ajax/statuses/extend',
                                     params={'id': str(i)}, headers=H_JSON, timeout=20)
                if r.status_code == 200:
                    rc = r.json().get('reads_count')
                    if rc is not None:
                        break
            except Exception:
                pass
            time.sleep(2)
        out[i] = rc
    return out


def visit(se_cookies, se_session, headful=False):
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path=CHROME, headless=not headful,
                                  args=['--no-first-run', '--no-default-browser-check',
                                        '--disable-blink-features=AutomationControlled'])
            ctx = b.new_context(user_agent=H_JSON['User-Agent'])
            ctx.add_cookies(se_cookies)
            pg = ctx.new_page()
            pg.goto(DETAIL, wait_until='networkidle', timeout=30000)
            time.sleep(8)
            b.close()
    except Exception as e:
        return 'browser_err:%s' % str(e)[:80]
    try:
        se_session.get('https://weibo.com/ajax/statuses/show',
                       params={'id': TARGET_ID}, headers=H_JSON, timeout=20)
    except Exception as e:
        return 'api_err:%s' % str(e)[:80]
    return 'ok'


def log_event(event, pv, cv, note=''):
    rec = {'iso': time.strftime('%Y-%m-%d %H:%M:%S'), 'event': event,
           'primary_reads': pv, 'control_reads': cv, 'note': note}
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')
    print('[%s] %-20s primary=%s control=%s %s' % (rec['iso'], event, pv, cv, note), flush=True)


EVENTS = [
    (0,    'measure', 'baseline'),
    (5,    'measure', 'stability (no visit)'),
    (10,   'visit',   'visit#1 (headful)', True),
    (10.2, 'measure', 'after visit#1'),
    (30,   'measure', 'organic check +30m'),
    (60,   'visit',   'visit#2 +1h', False),
    (60.2, 'measure', 'after visit#2'),
    (180,  'visit',   'visit#3 +3h', False),
    (180.2,'measure', 'after visit#3'),
    (360,  'visit',   'visit#4 +6h', False),
    (360.2,'measure', 'after visit#4'),
    (720,  'visit',   'visit#5 +12h', False),
    (720.2,'measure', 'after visit#5'),
    (1440, 'visit',   'visit#6 +24h', False),
    (1440.2,'measure', 'after visit#6'),
    (2880, 'visit',   'visit#7 +48h', False),
    (2880.2,'measure', 'after visit#7'),
    (4320, 'visit',   'visit#8 +72h', False),
    (4320.2,'measure', 'after visit#8'),
]


def main():
    cake = Auth(); cake.uid = CAKE; cake.load()
    se = Auth(); se.uid = SE; se.load()
    se_cookies = load_se_cookies()
    ids = [TARGET_ID, CTRL_ID]

    if os.path.exists(STATE):
        st = json.load(open(STATE, encoding='utf-8'))
        start_ts = st['start_ts']; next_idx = st['next_idx']
        prev_pv = st.get('prev_pv'); prev_cv = st.get('prev_cv')
        log_event('RESUME', prev_pv, prev_cv, 'idx=%d' % next_idx)
    else:
        start_ts = time.time(); next_idx = 0; prev_pv = prev_cv = None
        log_event('START', None, None, 'primary %s id=%s / control %s id=%s' % (TARGET_MB, TARGET_ID, CTRL_MB, CTRL_ID))

    for idx in range(next_idx, len(EVENTS)):
        mins, kind, note, *rest = EVENTS[idx]
        headful = rest[0] if rest else False
        while time.time() - start_ts < mins * 60:
            time.sleep(min(30.0, mins * 60 - (time.time() - start_ts)))
        if kind == 'measure':
            m = measure(cake.session, ids)
            pv, cv = m.get(TARGET_ID), m.get(CTRL_ID)
            note2 = note
            if prev_pv is not None and pv is not None:
                note2 += ' dP=%+d' % (pv - prev_pv)
            if prev_cv is not None and cv is not None:
                note2 += ' dC=%+d' % (cv - prev_cv)
            log_event(note, pv, cv, note2)
            if pv is not None:
                prev_pv = pv
            if cv is not None:
                prev_cv = cv
        else:
            res = visit(se_cookies, se.session, headful=headful)
            log_event(note, None, None, 'visit_result=%s' % res)
        json.dump({'start_ts': start_ts, 'next_idx': idx + 1, 'prev_pv': prev_pv, 'prev_cv': prev_cv},
                  open(STATE, 'w', encoding='utf-8'), ensure_ascii=False)
    log_event('END', prev_pv, prev_cv, 'experiment complete')


if __name__ == '__main__':
    main()
