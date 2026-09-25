"""Shared Weibo playback beacon helpers.

Centralizes the reverse-engineered `playstatistics` beacon so the production
quick-watch feature (`quick_watch_recent.py`) and the experimental probe
(`quick_watch_delay_probe.py`) use ONE canonical implementation.

Algorithms recovered from the weibo-pro-next bundle
(`https://h5.sinaimg.cn/m/weibo-pro-next/assets/index-DArm_q-5.js`, saved at
`src/tmp/video/js_playstatistics_0.js`), 2026-09-21:

  * `ajax/log/h5playlog` sig  = md5(data + key + "encryptedString")
                               (PlayLog._md5Log; verified vs HAR)
  * `aj/video/playstatistics?ajwvr=6` sig = md5(data + key + "yixiong&zhaolong5")
                               (PlayStatistics._md5Log; verified EXACT MATCH vs the
                               2026-09-18 HAR sig `b471297e...`)

`playstatistics` and `PC_real_read` (ajax/log/read) live here (both NEWLY
recovered from the 2026-09-18 HAR). The h5playlog builder stays in
`quick_watch_recent.py` (it already had one) to avoid a large refactor; both
scripts keep their own posting style.
"""
import hashlib
import json
import random
import string
import time

PLAYSTAT_URL = "https://weibo.com/aj/video/playstatistics?ajwvr=6"
PLAYSTAT_SALT = "yixiong&zhaolong5"  # PlayStatistics._md5Log salt (NOT "encryptedString")

READ_URL = "https://weibo.com/ajax/log/read"  # PC_real_read endpoint
from constants import BROWSER_USER_AGENT as UA
# faithful replica of PlayStatistics._logKey()'s `count++`
_PS_COUNT = [0]


def md5(s):
    return hashlib.md5(s.encode("utf-8")).hexdigest()


def rand5():
    """5-char base36 string, matching Math.random().toString(36).substring(5,10)."""
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=5))


def build_playstatistics(mid, media_id, viewer_uid):
    """Return (data, key, sig) for ONE playstatistics beacon, exactly as the
    PlayStatistics video.js plugin builds it.

    data = JSON.stringify({uid, mid, keys, type:"feedvideo", uuid, media_id})
    key  = Log_<rand5>_<ts(ms)><rand4><count>
    sig  = md5(data + key + "yixiong&zhaolong5")
    """
    rk = random.randint(10 ** 12, 10 ** 13 - 1)
    data = ('{"uid":%s,"mid":"%s","keys":%d,"type":"feedvideo",'
            '"uuid":%d,"media_id":"%s"}' % (viewer_uid, mid, rk, rk, media_id))
    ts = int(time.time() * 1000)
    rand4 = random.randint(0, 9999)
    key = "Log_%s_%d%d%d" % (rand5(), ts, rand4, _PS_COUNT[0])
    _PS_COUNT[0] += 1
    sig = md5(data + key + PLAYSTAT_SALT)
    return data, key, sig


def send_playstatistics(session, mid, media_id, viewer_uid, delay=0.5, referer=None):
    """POST the playstatistics beacon ONCE. Returns (http_status, error_code, response).

    `referer` defaults to a bare "https://weibo.com/"; callers pass the real
    watch page for fidelity.

    Requires `X-Xsrf-Token` (from the XSRF-TOKEN cookie) + `x-requested-with`.
    The server tolerates a wrong sig, but we send the EXACT correct one.
    """
    data, key, sig = build_playstatistics(mid, media_id, viewer_uid)
    xsrf = ""
    try:
        xsrf = session.cookies.get("XSRF-TOKEN", domain="weibo.com") or ""
    except Exception:
        try:
            xsrf = session.cookies.get("XSRF-TOKEN") or ""
        except Exception:
            xsrf = ""
    headers = {"User-Agent": UA,
               "Referer": referer or "https://weibo.com/",
               "x-requested-with": "XMLHttpRequest"}
    if xsrf:
        headers["X-Xsrf-Token"] = xsrf
    try:
        r = session.post(PLAYSTAT_URL,
                         files={"data": (None, data),
                                "key": (None, key),
                                "sig": (None, sig)},
                         headers=headers, timeout=20000)
        status = r.status_code
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        return status, ec, r
    except Exception as ex:
        return None, str(ex), None


def build_read_log(mid, read_ms, rid=None):
    """Return the JSON `data` string for ONE PC_real_read beacon.

    Recovered from the 2026-09-18 real-watch HAR: the browser fires
    `act=PC_real_read` every ~15s while a post/video is on screen, with a
    CUMULATIVE `read_duration` (ms). For a VIDEO post this read dwell == watch
    time, so it is the strongest candidate for what the creator-center PLAY
    DURATION actually aggregates (h5playlog's `valid_play_duration` did NOT
    credit in the 2026-09-21 triple test). No sig/key; body is
    {"data": "<json-array-as-string>"}.

    CRITICAL (2026-09-24, waterfall HAR): `rid` MUST be STABLE across every
    heartbeat of ONE watch session. The browser keeps it byte-identical for the
    whole watch (e.g. "0_0_0_5246141095656271609_0_0_0" on all 5 periodic
    reads). The server aggregates cumulative `read_duration` PER `rid`; a fresh
    random `rid` per beacon fragments the session into many 30s stubs and the
    watch is never credited. Pass a caller-owned `rid` (generated once per
    video) to fix this.
    """
    if rid is None:
        rid = "0_0_0_%d_0_0_0" % random.randint(10 ** 18, 10 ** 19 - 1)
    rec = {
        "act": "PC_real_read",
        "itemid": str(mid),
        "type": "mblog",
        "rid": rid,
        "page": 0,
        "root_id": str(mid),
        "analysis_extra": "",
        "ext": "",
        "PC_real_read": 1,
        "__date": int(time.time()),
        "duration": int(read_ms),
        "read_duration": int(read_ms),
    }
    return json.dumps([rec], ensure_ascii=False)


def send_read_log(session, mid, read_ms, rid=None, delay=0.5, referer=None):
    """POST one PC_real_read beacon. Returns (http_status, error_code, response).

    `rid` is reused for the whole watch session (see build_read_log). Generated
    once by the caller and threaded through every heartbeat.

    `referer` defaults to a bare "https://weibo.com/"; callers pass the real
    watch page (https://weibo.com/u/<AUTHOR>?tabtype=newVideo) for fidelity.

    Requires `X-Xsrf-Token` (from the XSRF-TOKEN cookie) + `x-requested-with`
    like the other weibo.com/ajax/log/* endpoints (else 403).
    """
    payload = {"data": build_read_log(mid, read_ms, rid)}
    xsrf = ""
    try:
        xsrf = session.cookies.get("XSRF-TOKEN", domain="weibo.com") or ""
    except Exception:
        try:
            xsrf = session.cookies.get("XSRF-TOKEN") or ""
        except Exception:
            xsrf = ""
    headers = {"User-Agent": UA,
               "Referer": referer or "https://weibo.com/",
               "x-requested-with": "XMLHttpRequest"}
    if xsrf:
        headers["X-Xsrf-Token"] = xsrf
    try:
        r = session.post(READ_URL, json=payload, headers=headers, timeout=20000)
        status = r.status_code
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        return status, ec, r
    except Exception as ex:
        return None, str(ex), None
