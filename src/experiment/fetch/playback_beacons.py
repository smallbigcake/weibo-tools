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

Only `playstatistics` lives here (the NEWLY recovered one). The h5playlog
builder stays in `quick_watch_recent.py` (it already had one) to avoid a large
refactor; both scripts keep their own posting style.
"""
import hashlib
import random
import string
import time

PLAYSTAT_URL = "https://weibo.com/aj/video/playstatistics?ajwvr=6"
PLAYSTAT_SALT = "yixiong&zhaolong5"  # PlayStatistics._md5Log salt (NOT "encryptedString")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

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


def send_playstatistics(session, mid, media_id, viewer_uid, delay=0.5):
    """POST the playstatistics beacon ONCE. Returns (http_status, error_code).

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
               "Referer": "https://weibo.com/",
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
        return status, ec
    except Exception as ex:
        return None, str(ex)
