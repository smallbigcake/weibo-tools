"""Unified Weibo FastWatch experiment: replay realistic playback beacons on the
author's recent videos and MEASURE total wall-clock time AND (optionally) whether
the server credits PLAY COUNT / PLAY DURATION.

==========================================================================
Two playback-report CHANNELS, selectable with --channels
--------------------------------------------------------------------------
The old `quick_watch_recent.py` only emitted CHANNEL 1 (play_history/report.json),
the `seconds` heartbeat. A real 2026-09-18 watch HAR shows the browser actually
fires TWO report channels while watching:

  1. play_history/report.json  (GET, ?seconds=N)   -- playback progress
  2. ajax/log/h5playlog         (POST FormData)     -- detailed play log carrying
     `valid_play_duration` (ms). This is the ONLY channel that reports the *valid*
     watched time, which is what the creator-center PLAY DURATION aggregates.

`--channels single`  -> emit CHANNEL 1 only (legacy FastWatch; default, kept for the
                        daily automation's unchanged behavior).
`--channels dual`    -> emit BOTH channels, INTERLEAVED per heartbeat (report.json
                        first, then h5playlog, matching the real player which fires
                        both on each timeupdate). This is the correct ordering -- NOT
                        "all of channel 1 then all of channel 2".

The `h5playlog` (ajax/*) POST requires the CSRF header `X-Xsrf-Token` (from the
`XSRF-TOKEN` cookie) + `x-requested-with: XMLHttpRequest`, else it returns 403.
report.json goes to a different domain (multimedia.api.weibo.com) and needs no CSRF.

==========================================================================
Pacing (--delay / --cadence) -- ONE method paced two ways
--------------------------------------------------------------------------
For each video the FULL beacon sequence is emitted (default):

    play_type=0  seconds=0             start of the playback session
    play_type=1  seconds=cadence       progress heartbeat
    play_type=1  seconds=2*cadence     ...
    play_type=1  seconds=<duration>    end of playback

The reported `seconds` are ALWAYS driven by --cadence (default 30), so the BEACON
CONTENT is identical regardless of pace. Only the wall-clock spacing changes:

  * --delay 1.0   (FastWatch-1s): compress a whole watch into ~duration/30 s
  * --delay 30.0  (FastWatch-30s): replay at the server's real reporting cadence

==========================================================================
Selection (matches the old quick_watch_recent.py)
--------------------------------------------------------------------------
    videos = author videos published in last `days` days (default 30), fetched
             LIVE at run time via the creator-center getVideoList (AUTHOR_UID
             session); falls back to the static src/data/author_videos.json
             snapshot if the author session is unavailable.

Two run shapes, both honoring --channels:
  * No --mid  -> QuickWatch: play EVERY video in the window (inner loop).
  * --mid set -> Target-only replay: replay the single TARGET video for pre/post
                 PLAY COUNT / DURATION measurement (no control group).

`--with-aggregate` optionally snapshots the LAGGED creator-center aggregates
(yesterday/7d/30d) pre and post, for a NEXT-DAY cross-check of PLAY DURATION
(getVideoList does not expose play_duration live).

All numbers are CLI-configurable (see --help).

Usage:
  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/quick_watch_recent.py \
      [--days 30] [--rounds 10] [--delay 1.0] [--cadence 30] \
      [--channels single|dual] [--mid <mid>] \
      [--with-aggregate] [--dry-run]
"""
import os as _os
import json as _json
# src/experiment/<topic>/<script>.py -> project root (holds the git-ignored config/)
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
VIEWER_UID = _CFG.get('viewer_uid')

import argparse
import hashlib
import json
import os
import random
import sys
import time
from datetime import datetime, timezone, timedelta
from urllib.parse import urlencode
import shutil
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
_src_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, _src_root)

from auth import Auth
from logutil import setup as _setup_logging
_setup_logging()  # idempotent; configures the shared weibo.log for other modules
# Dedicated logger for THIS script: verbose per-request dumps go to a SEPARATE
# DAILY file (src/log/quick_watch_YYYYMMDD.log); console stays at INFO.
log = logging.getLogger('quick_watch')
log.setLevel(logging.DEBUG)
log.propagate = False
if not log.handlers:
    _qw_fmt = logging.Formatter(
        '%(asctime)s [%(levelname)s](%(filename)s#%(lineno)d): %(message)s')
    _qw_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        'log')
    _qw_day = datetime.now().strftime('%Y%m%d')
    _qw_file = logging.FileHandler(
        os.path.join(_qw_dir, 'quick_watch_%s.log' % _qw_day), encoding='utf-8')
    _qw_file.setLevel(logging.DEBUG)
    _qw_file.setFormatter(_qw_fmt)
    _qw_console = logging.StreamHandler()
    _qw_console.setLevel(logging.INFO)
    _qw_console.setFormatter(_qw_fmt)
    log.addHandler(_qw_file)
    log.addHandler(_qw_console)

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEO_DATA = os.path.join(SRC_DIR, "data", "author_videos.json")
# All watch run logs live under src/data/watch/ (kept apart from the shared
# author_videos.json DB and the diag/crawl outputs that also live in src/data).
WATCH_DIR = os.path.join(SRC_DIR, "data", "watch")
LOG_PATH = os.path.join(WATCH_DIR, "quick_watch_log.json")

REPORT_URL = "https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json"
H5PLAYLOG_URL = "https://weibo.com/ajax/log/h5playlog"
GETVIDEO_URL = "https://weibo.com/ajax/multimedia/getVideoList"
SOURCE = "339644097"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CREATOR_REF = "https://weibo.com/creator"
PAGE_DELAY = 1.0
END_CURSORS = {"", "0", "-1"}


# Header names whose VALUES must never be written to disk in cleartext.
_SENSITIVE_HEADERS = {'cookie', 'authorization', 'x-xsrf-token', 'xsrf-token',
                      'set-cookie', 'proxy-authorization'}


def _redact_headers(headers):
    out = {}
    try:
        items = headers.items()
    except Exception:
        return dict(headers) if headers is not None else {}
    for k, v in items:
        out[k] = '<redacted>' if str(k).lower() in _SENSITIVE_HEADERS else v
    return out


def _log_http(r, label):
    """Dump the FULL request + response (status, headers, body) of one HTTP call
    to the quick_watch logger for BOTH channels (file only via DEBUG)."""
    req = getattr(r, 'request', None)
    log.debug("  [%s] >>> REQUEST %s %s" % (label,
               getattr(req, 'method', 'POST'), getattr(req, 'url', r.url)))
    if req is not None:
        try:
            log.debug("  req headers : %s" % _redact_headers(req.headers))
        except Exception:
            pass
        try:
            _rb = req.body
            log.debug("  req body    : %s" % (_rb if _rb is not None else '(none)'))
        except Exception:
            pass
    log.debug("  [%s] <<< RESPONSE HTTP %s %s" % (label, r.status_code,
                                                  getattr(r, 'reason', '')))
    try:
        log.debug("  resp headers: %s" % _redact_headers(r.headers))
    except Exception:
        pass
    log.debug("  resp body   : %s" % (r.text or ''))


def _daily_log_path():
    day = datetime.now(timezone.utc).strftime("%Y%m%d")
    return os.path.join(WATCH_DIR, "quick_watch_log_%s.jsonl" % day)


def _archive_current_log():
    if not os.path.exists(LOG_PATH):
        return None
    stamp = None
    try:
        with open(LOG_PATH, encoding="utf-8") as f:
            prev = json.load(f) or {}
        ts = prev.get("generated_at")
        if ts:
            dt = datetime.fromisoformat(ts)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            stamp = dt.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    except Exception:
        pass
    if not stamp:
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    archive_dir = os.path.join(WATCH_DIR, "archive")
    os.makedirs(archive_dir, exist_ok=True)
    dst = os.path.join(archive_dir, "quick_watch_log_%s.json" % stamp)
    if os.path.exists(dst):
        dst = os.path.join(archive_dir,
                           "quick_watch_log_%s.%d.json" % (stamp, int(time.time())))
    shutil.copy2(LOG_PATH, dst)
    return dst


def method_label(delay):
    """Derive the run's pace label from --delay (1s vs 30s stays distinguishable)."""
    return "FastWatch-%.0fs" % delay


def beijing(ts_ms):
    if not ts_ms:
        return "?"
    dt = datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc) + timedelta(hours=8)
    return dt.strftime("%Y-%m-%d %H:%M:%S")


# --------------------------------------------------------------------------
# Video list: live getVideoList (normalized) with static-cache fallback
# --------------------------------------------------------------------------
def _norm(raw_items):
    """Normalize raw getVideoList items to {mid, oid, duration, create_time, stats}."""
    out = []
    for it in raw_items:
        mid = str(it.get("mid") or it.get("mid_str") or it.get("id"))
        if not mid:
            continue
        out.append({
            "mid": mid,
            "oid": it.get("oid"),
            "duration": it.get("duration"),
            "create_time": it.get("create_time"),
            "title": (((it.get("titles") or [{}])[0].get("title", ""))
                      if it.get("titles") else ""),
            "stats": it.get("statistics") or {},
        })
    return out


def fetch_video_list(session, pages=8, days=30):
    """Return recent author videos (normalized) via getVideoList, newest-first,
    restricted to the last `days` days. Pagination stops once a whole page is older
    than the cutoff."""
    cutoff = (time.time() - days * 86400) * 1000
    out = []
    cursor = "0"
    for _ in range(pages):
        r = session.get(GETVIDEO_URL,
                        params={"cursor": cursor, "count": "20", "status": "0"},
                        headers={"User-Agent": UA, "Referer": CREATOR_REF},
                        timeout=20000)
        try:
            data = r.json()
        except Exception:
            break
        items = (data.get("data") or {}).get("videos") or []
        if not items:
            break
        page_older = True
        for it in items:
            ct = it.get("create_time")
            if ct is not None and ct < cutoff:
                continue
            page_older = False
            out.append(_norm([it])[0])
        if page_older:
            break
        cursor = str((data.get("data") or {}).get("next_cursor") or "")
        if not cursor or cursor == "0":
            break
    return out


def load_window(days):
    """Normalized author videos published within the last `days` days (from the
    static src/data/author_videos.json snapshot; fallback when live is unavailable)."""
    with open(VIDEO_DATA, encoding="utf-8") as f:
        data = json.load(f)
    cutoff = (time.time() - days * 86400) * 1000
    out = [v for v in _norm(data.get("videos", []))
           if v.get("create_time") and v["create_time"] >= cutoff]
    out.sort(key=lambda v: v.get("create_time", 0), reverse=True)
    return out


def get_video_list(days, use_cached_list=False):
    """Return (videos, source). 'live' from getVideoList, else 'cache' (static)."""
    if use_cached_list:
        return load_window(days), "cache"
    try:
        fa = Auth()
        fa.uid = AUTHOR_UID
        fa.load()
    except Exception as e:
        log.warning("author session load failed (%s); using cached list", e)
        return load_window(days), "cache"
    if fa.test_login() or fa.renew():
        try:
            items = fetch_video_list(fa.session, days=days)
            log.info("live video list fetched: %d videos in last %d d", len(items), days)
            return items, "live"
        except Exception as e:
            log.warning("live video-list fetch failed (%s); using cached list", e)
    else:
        log.warning("author session not available; using cached video list")
    return load_window(days), "cache"


def log_video_list(videos, days, source):
    log.info("===== video list (last %d d, source=%s): %d videos =====",
             days, source, len(videos))
    for i, v in enumerate(videos, 1):
        log.info("  #%02d  mid=%s  dur=%.0fs  created=%s  %s",
                 i, v["mid"], v.get("duration", 0), beijing(v.get("create_time")),
                 (v.get("title") or "")[:40])


def build_sequence(duration, cadence):
    """Full heartbeat sequence (start, +cadence progress heartbeats, end)."""
    full = int(round(duration or 0))
    if full <= 0:
        return []
    seq = [("0", 0)]
    step = int(cadence)
    if step > 0:
        t = step
        while t < full:
            seq.append(("1", t))
            t += step
    if seq[-1][1] != full:
        seq.append(("1", full))
    return seq


# --------------------------------------------------------------------------
# Live metrics (PLAY COUNT always; PLAY DURATION best-effort / lagged)
# --------------------------------------------------------------------------
_PLAY_DURA_KEYS = ("play_duration", "play_dura_count", "play_totallength_sec",
                   "play_totallength", "total_length")


def read_metrics(session, mids):
    """Return {mid: {play_count, play_duration, _keys}} for requested mids.

    play_count from statistics.play_count (real-time, includes today). play_duration
    is best-effort (not guaranteed live in getVideoList; None => use --with-aggregate
    for the lagged creator-center aggregate).
    """
    if not mids:
        return {}
    want = set(str(m) for m in mids if m)
    lst = fetch_video_list(session)
    out = {}
    for v in lst:
        if v["mid"] in want:
            st = v.get("stats") or {}
            pd = None
            for k in _PLAY_DURA_KEYS:
                if k in st and st[k] not in (None, ""):
                    pd = st[k]
                    break
            out[v["mid"]] = {"play_count": st.get("play_count"),
                             "play_duration": pd, "_keys": sorted(st.keys())}
    return out


def choose_target(lst, mid=None, max_dur=120):
    if mid:
        for v in lst:
            if v["mid"] == str(mid):
                return v
        raise SystemExit("target mid=%s not found in recent video list" % mid)
    cand = [v for v in lst if (v.get("duration") or 0) < max_dur]
    return (cand or lst)[0]


def _delta(a, b):
    try:
        return float(a) - float(b)
    except (TypeError, ValueError):
        return None


# --------------------------------------------------------------------------
# Channel 1: play_history/report.json ; Channel 2: ajax/log/h5playlog
# --------------------------------------------------------------------------
def req_host_value(mid):
    return "https://weibo.com/u/%s?tabtype=newVideo&layerid=%s" % (AUTHOR_UID, mid)


def _record(results, endpoint, **fields):
    rec = {"endpoint": endpoint, "ts": time.time()}
    rec.update(fields)
    results.append(rec)
    return rec


def _post_report_step(session, mid, oid, duration, play_type, sec, results):
    """One report.json heartbeat (CHANNEL 1). Records the server response."""
    params = {
        "source": SOURCE,
        "play_type": play_type,
        "video_orientation": "horizontal",
        "video_duration": str(int(round(duration or 0))),
        "id": str(mid),
        "id_type": "0",
        "oid": oid,
        "is_contribution": "0",
        "reqHost": req_host_value(mid),
        "seconds": str(sec),
    }
    url = REPORT_URL + "?" + urlencode(params)
    body = err = None
    ec = None
    try:
        r = session.post(url, headers={"User-Agent": UA,
                                        "Referer": "https://weibo.com/"},
                         timeout=20000)
        status = r.status_code
        try:
            body = r.text
        except Exception:
            body = None
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        log.info("  [report] mid=%s play_type=%s seconds=%s -> %s err=%s"
                 % (mid, play_type, sec, status, ec))
        _log_http(r, 'beacon report')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [report] mid=%s -> ERROR %s" % (mid, ex))
    _record(results, "report.json", mid=mid, play_type=play_type, seconds=sec,
            status=status, error_code=ec, error=err, body=body)


def _rand5():
    import string
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=5))


def build_h5playlog_data(mid, oid, duration, playduration_ms,
                         valid_play_duration_ms, play_time, quit_status=""):
    """Build the h5playlog FormData `data` field (semicolon CSV) as the real client
    does. Field order reverse-engineered from the 2026-09-18 HAR; the empty 9th
    field (index 8) is preserved verbatim. sig = md5(data+key+'encryptedString')."""
    ts_ms = int(time.time() * 1000)
    sid = "H5_%s_%d" % (_rand5(), ts_ms)
    key = "Log_h5play_%s_%d" % (_rand5(), ts_ms)
    values = [
        play_time,                       # 0 play_time (Beijing, set once)
        str(VIEWER_UID),                 # 1 uid (viewer)
        str(oid),                        # 2 object_id / oid
        str(mid),                        # 3 mid
        str(AUTHOR_UID),                 # 4 mid_uid (author)
        str(mid),                        # 5 rootmid
        str(AUTHOR_UID),                 # 6 rootuid
        "%.2f" % float(duration),        # 7 duration
        "",                              # 8 (unknown empty field, preserved)
        "1",                             # 9 isautoplay
        str(int(playduration_ms)),       # 10 playduration (ms)
        "success",                       # 11 firstframe_status
        quit_status,                     # 12 quit_status ("" / complete)
        "878",                           # 13 firstframe_time (ms, constant)
        "0",                             # 14 startplay_time (ms)
        str(int(valid_play_duration_ms)),# 15 valid_play_duration (ms)
        "",                              # 16 download_size
        "",                              # 17 bitrate
        "",                              # 18 encode_mode
    ]
    extend = "vf=>newPC,sid=>%s,qType=>720" % sid
    data = ";".join(values) + ";" + extend
    sig = hashlib.md5((data + key + "encryptedString").encode("utf-8")).hexdigest()
    return data, key, sig


def _post_h5playlog_step(session, mid, oid, duration, play_type, sec,
                         play_time, is_last, results):
    """One ajax/log/h5playlog beacon (CHANNEL 2). Records the server response.

    valid_play_duration == cumulative watched position (mirrors the browser's
    per-30s send). `is_last` closes the session with quit_status='complete'.
    """
    full = int(round(duration or 0))
    pos_ms = int(min(sec, full) * 1000)
    quit_status = "complete" if is_last else ""
    data, key, sig = build_h5playlog_data(
        mid, oid, duration, pos_ms, pos_ms, play_time, quit_status=quit_status)
    body = err = None
    ec = None
    xsrf = session.cookies.get("XSRF-TOKEN", domain="weibo.com")
    h5_headers = {"User-Agent": UA,
                  "Referer": "https://weibo.com/",
                  "x-requested-with": "XMLHttpRequest"}
    if xsrf:
        h5_headers["X-Xsrf-Token"] = xsrf
    try:
        r = session.post(H5PLAYLOG_URL,
                         files={"data": (None, data),
                                "key": (None, key),
                                "sig": (None, sig)},
                         headers=h5_headers,
                         timeout=20000)
        status = r.status_code
        try:
            body = r.text
        except Exception:
            body = None
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        log.info("  [h5play] mid=%s seconds=%s valid_ms=%d -> %s err=%s"
                 % (mid, sec, pos_ms, status, ec))
        _log_http(r, 'beacon h5playlog')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [h5play] mid=%s -> ERROR %s" % (mid, ex))
    _record(results, "h5playlog", mid=mid, seconds=sec,
            valid_play_duration_ms=pos_ms, quit_status=quit_status,
            status=status, error_code=ec, error=err, body=body)


def replay_one(session, mid, oid, duration, seq, delay, play_time, results, channels):
    """Replay ONE video. With channels='dual', emit report.json THEN h5playlog on
    EVERY heartbeat (interleaved). With channels='single', report.json only."""
    n = len(seq)
    for i, (play_type, sec) in enumerate(seq):
        _post_report_step(session, mid, oid, duration, play_type, sec, results)
        if channels == "dual":
            _post_h5playlog_step(session, mid, oid, duration, play_type, sec,
                                 play_time, i == n - 1, results)
        time.sleep(delay)


# --------------------------------------------------------------------------
# Optional LAGGED creator-center aggregate snapshot
# --------------------------------------------------------------------------
def snapshot_aggregates(tag):
    import read_backend_aggregate as _ra
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    yest = _ra.fetch_yesterday(a)
    sev = _ra.fetch_7_30(a)
    snap = {"tag": tag,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "yesterday": yest,
            "last_7d": sev.get("last_7d", {}),
            "last_30d": sev.get("last_30d", {})}
    path = os.path.join(SRC_DIR, "data", "quick_watch_%s.json" % tag)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(snap, f, ensure_ascii=False, indent=2)
    return snap, path


def _val(snap, period, key):
    return (snap.get(period, {}).get(key, {}) or {}).get("value")


def _write_audit(results, channels):
    run_stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    res_path = os.path.join(SRC_DIR, "data",
                            "quick_watch_responses_%s.jsonl" % run_stamp)
    with open(res_path, "w", encoding="utf-8") as f:
        for rec in results:
            f.write(_json.dumps(rec, ensure_ascii=False) + "\n")
    log.info("=== SERVER RESPONSE AUDIT (%d calls, channels=%s) ===",
             len(results), channels)
    log.info("  log -> %s", res_path)
    errs = [r for r in results if r.get("status") not in (200,) or r.get("error")]
    log.info("  HTTP!=200 or exception: %d", len(errs))
    for r in errs:
        log.warning("   ! %s mid=%s sec=%s status=%s err=%s body=%s",
                    r.get("endpoint"), r.get("mid"), r.get("seconds"),
                    r.get("status"), r.get("error"), (r.get("body") or "")[:200])
    ec_set = sorted({r.get("error_code") for r in results
                     if r.get("error_code") is not None})
    log.info("  distinct error_code values: %s", ec_set)
    return errs


def _save_run_record(run_record):
    archived = _archive_current_log()
    if archived:
        log.info("archived previous snapshot -> %s", archived)
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(run_record, f, ensure_ascii=False, indent=2)
    day_path = _daily_log_path()
    with open(day_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(run_record, ensure_ascii=False) + "\n")
    log.info("  latest log -> %s", LOG_PATH)
    log.info("  daily history -> %s", day_path)


def _viewer_session():
    a = Auth()
    a.uid = VIEWER_UID
    a.load()
    if not a.test_login():
        log.warning("viewer session NOT logged in; attempting silent SSO renew...")
        if not a.renew():
            raise SystemExit("viewer session could not be restored; aborting.")
        a.save_cookies()
    return a.session


def main():
    ap = argparse.ArgumentParser(
        description="Unified FastWatch: single or dual playback-report channels "
                    "(--channels), pace via --delay, live PLAY COUNT / PLAY DURATION.")
    ap.add_argument("--days", type=int, default=30,
                    help="only videos published in the last N days")
    ap.add_argument("--rounds", type=int, default=10,
                    help="OUTER loop count (repeat the whole inner process N times)")
    ap.add_argument("--delay", type=float, default=1.0,
                    help="REAL seconds between heartbeats (the '1s' in FastWatch-1s)")
    ap.add_argument("--cadence", type=float, default=30,
                    help="step, in reported seconds, between progress heartbeats")
    ap.add_argument("--repeat", type=int, default=1,
                    help="repeat the beacon sequence this many times per video")
    ap.add_argument("--dry-run", action="store_true",
                    help="only count videos/requests, send nothing")
    ap.add_argument("--use-cached-list", action="store_true",
                    help="skip the live API fetch; reuse the static snapshot")
    ap.add_argument("--limit", type=int, default=0,
                    help="watch only the newest N videos in the window (0 = all)")
    # --- merged dual-channel capability ---
    ap.add_argument("--channels", choices=["single", "dual"], default="dual",
                    help="single = report.json only (legacy); dual = report.json + "
                         "h5playlog, interleaved per heartbeat (DEFAULT)")
    ap.add_argument("--mid", default=None,
                    help="target video mid; if omitted, play EVERY video in the window")
    ap.add_argument("--max-dur", type=float, default=120.0,
                    help="default target: newest video shorter than this")
    ap.add_argument("--with-aggregate", action="store_true",
                    help="snapshot LAGGED creator-center aggregates (pre + post)")
    args = ap.parse_args()

    method = method_label(args.delay)
    channels = args.channels
    videos, list_source = get_video_list(args.days, args.use_cached_list)
    if args.limit and args.limit > 0:
        log.info("limiting to newest %d video(s) of %d", args.limit, len(videos))
        videos = videos[:args.limit]
    log_video_list(videos, args.days, list_source)
    log.info("method=%s  channels=%s  list_source=%s  videos=%d  rounds=%d  "
             "delay=%.2fs  cadence=%ss", method, channels, list_source,
             len(videos), args.rounds, args.delay, args.cadence)
    if not videos:
        log.warning("no videos in window; nothing to do.")
        return {"method": method, "channels": channels, "list_source": list_source,
                "ok": 0, "fail": 0, "total_videos_played": 0, "elapsed_seconds": 0.0,
                "total_watch_seconds": 0.0, "videos_in_window": 0,
                "dry_run": args.dry_run}

    mode = "full(cadence=%ss)" % args.cadence

    # ----- dry run: just count -----
    if args.dry_run:
        total_req = 0
        for i, v in enumerate(videos, 1):
            seq = build_sequence(v.get("duration"), args.cadence)
            mult = (2 if channels == "dual" else 1) * args.repeat
            total_req += len(seq) * mult
            t = datetime.fromtimestamp(v["create_time"] / 1000,
                                       tz=timezone.utc).strftime("%Y-%m-%d")
            log.info("  #%d  %s  dur=%.0fs  heartbeats=%d x%d  mid=%s"
                     % (i, t, v.get("duration", 0), len(seq), mult, v["mid"]))
        est_videos = len(videos) * args.rounds
        est_req = total_req * args.rounds
        est_watch = sum(int(round(v.get("duration") or 0))
                        for v in videos) * args.rounds * args.repeat
        log.info("DRY-RUN: %d videos/round x %d rounds = %d video-plays; "
                 "~%d total beacon POSTs (%s channel). no requests sent."
                 % (len(videos), args.rounds, est_videos, est_req, channels))
        log.info("  est. total watch time claimed = %.0fs (%.1f min / %.2f h)"
                 % (est_watch, est_watch / 60.0, est_watch / 3600.0))
        return {"method": method, "channels": channels, "dry_run": True,
                "list_source": list_source, "videos_in_window": len(videos),
                "est_video_plays": est_videos, "est_beacon_posts": est_req,
                "est_watch_seconds": est_watch,
                "ok": None, "fail": None, "total_videos_played": None,
                "elapsed_seconds": None}

    # Author session (for live metrics / aggregate) + viewer session (replay).
    a_auth = Auth()
    a_auth.uid = AUTHOR_UID
    a_auth.load()
    sess = _viewer_session()
    results = []
    play_time = beijing(int(time.time() * 1000))  # set once, mirrors the client

    t0 = time.time()
    ok = fail = 0
    total_watch_seconds = 0.0
    all_log = []

    def replay_video_entry(v, tag):
        """Replay one video (channels-aware); return True if all sends succeeded."""
        nonlocal total_watch_seconds
        mid = v["mid"]
        oid = v.get("oid")
        dur = v.get("duration")
        if not mid or not oid or not dur:
            log.warning("  [%s] skip (missing mid/oid/duration): %s", tag, mid)
            return None
        seq = build_sequence(dur, args.cadence)
        full = int(round(dur))
        log.info("[%s] START mid=%s dur=%.0fs hb=%d channels=%s",
                 tag, mid, dur, len(seq), channels)
        good = True
        for _ in range(args.repeat):
            before = len(results)
            replay_one(sess, mid, oid, dur, seq, args.delay, play_time,
                       results, channels)
            sent = results[before:]
            if not all(s.get("status") == 200 for s in sent):
                good = False
            total_watch_seconds += full
        log.info("[%s] DONE mid=%s", tag, mid)
        return good

    if args.mid:
        # ---- Target-only replay + pre/post measurement (no control) ----
        target = choose_target(videos, args.mid, args.max_dur)
        t_mid = target["mid"]
        want = [t_mid]
        log.info("target mid=%s dur=%.0fs oid=%s" % (t_mid, target["duration"], target.get("oid")))

        pre = read_metrics(a_auth.session, want)
        pc0_t = pre.get(t_mid, {}).get("play_count")
        pd0_t = pre.get(t_mid, {}).get("play_duration")
        log.info("  pre  target play_count=%s play_duration=%s", pc0_t, pd0_t)
        if args.with_aggregate:
            pre_ag, pre_path = snapshot_aggregates("pre")
            log.info("  pre  aggregate snapshot -> %s (LAGGED; re-read tomorrow)", pre_path)

        for rnd in range(1, args.rounds + 1):
            log.info("=== round %d (channels=%s) ===", rnd, channels)
            g = replay_video_entry(target, "R%d#T" % rnd)
            if g is True:
                ok += 1
            elif g is False:
                fail += 1
            all_log.append({"round": rnd, "mid": t_mid, "kind": "target"})

        _write_audit(results, channels)
        post = read_metrics(a_auth.session, want)
        pc1_t = post.get(t_mid, {}).get("play_count")
        pd1_t = post.get(t_mid, {}).get("play_duration")
        log.info("  post target play_count=%s play_duration=%s", pc1_t, pd1_t)
        dV = _delta(pc1_t, pc0_t)
        dVd = _delta(pd1_t, pd0_t)
        log.info("=== RESULT (pre -> post, real-time getVideoList) ===")
        log.info("  target  play_count   : %s -> %s  (dV = %s)", pc0_t, pc1_t, dV)
        log.info("  target  play_duration : %s -> %s  (dVd = %s) [best-effort, may be lagged]",
                 pd0_t, pd1_t, dVd)
        log.info("  expected if credited: dV ~= %d (rounds)", args.rounds)
        if dV and dV > 0:
            log.info("  => PLAY COUNT credited (real-time pace was the missing piece).")
        elif dV == 0:
            log.info("  => PLAY COUNT still dropped (replay not credited for views).")
        else:
            log.info("  => PLAY COUNT inconclusive; inspect dV vs natural traffic.")
        if pd1_t is None:
            log.info("  NOTE: getVideoList did not expose play_duration live; use "
                     "--with-aggregate and re-read tomorrow for the duration signal.")
        if args.with_aggregate:
            time.sleep(2)
            post_ag, post_path = snapshot_aggregates("post")
            log.info("  post aggregate snapshot -> %s (LAGGED; re-read tomorrow)", post_path)
            log.info("=== DIFF (pre -> post, LAGGED aggregates) ===")
            for period in ("yesterday", "last_7d", "last_30d"):
                for k in ("play_count", "play_dura_count"):
                    pv, pp = _val(pre_ag, period, k), _val(post_ag, period, k)
                    try:
                        delta = float(pp) - float(pv)
                    except (TypeError, ValueError):
                        delta = None
                    log.info("  %-9s %-15s : %s -> %s  (delta %s)", period, k, pv, pp, delta)
    else:
        # ---- QuickWatch: replay EVERY video in the window ----
        play_set = [v for v in videos if v.get("mid") and v.get("oid") and v.get("duration")]
        log.info("dual-probe QuickWatch-mode: %d videos in last %d d, channels=%s "
                 "delay=%.1fs cadence=%.1fs rounds=%d", len(play_set), args.days,
                 channels, args.delay, args.cadence, args.rounds)
        pre = read_metrics(a_auth.session, [v["mid"] for v in play_set])
        if args.with_aggregate:
            pre_ag, pre_path = snapshot_aggregates("pre")
            log.info("  pre  aggregate snapshot -> %s (LAGGED; re-read tomorrow)", pre_path)
        for rnd in range(1, args.rounds + 1):
            log.info("=== round %d (channels=%s) ===", rnd, channels)
            for idx, v in enumerate(play_set, 1):
                g = replay_video_entry(v, "R%d#%d" % (rnd, idx))
                if g is True:
                    ok += 1
                elif g is False:
                    fail += 1
                all_log.append({"round": rnd, "mid": v["mid"]})
        _write_audit(results, channels)
        post = read_metrics(a_auth.session, [v["mid"] for v in play_set])
        log.info("=== QUICKWATCH-MODE per-video play_count (pre -> post) ===")
        any_move = False
        for v in play_set:
            m = v["mid"]
            p0 = pre.get(m, {}).get("play_count")
            p1 = post.get(m, {}).get("play_count")
            d = _delta(p1, p0)
            if d:
                any_move = True
            log.info("  mid=%s dur=%.0fs  pc=%s -> %s  (dV=%s)", m, v["duration"], p0, p1, d)
        log.info("  => %s", ("some play_count moved (incl. organic traffic)"
                             if any_move
                             else "no play_count moved (replay not credited)"))
        if args.with_aggregate:
            time.sleep(2)
            post_ag, post_path = snapshot_aggregates("post")
            log.info("  post aggregate snapshot -> %s (LAGGED; re-read tomorrow)", post_path)
            log.info("=== DIFF (pre -> post, LAGGED aggregates) ===")
            for period in ("yesterday", "last_7d", "last_30d"):
                for k in ("play_count", "play_dura_count"):
                    pv, pp = _val(pre_ag, period, k), _val(post_ag, period, k)
                    try:
                        delta = float(pp) - float(pv)
                    except (TypeError, ValueError):
                        delta = None
                    log.info("  %-9s %-15s : %s -> %s  (delta %s)", period, k, pv, pp, delta)

    t1 = time.time()
    elapsed = t1 - t0
    run_record = {
        "method": method, "channels": channels, "list_source": list_source,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "days": args.days, "rounds": args.rounds, "delay": args.delay,
        "cadence": args.cadence, "repeat": args.repeat,
        "total_videos_played": len(all_log),
        "elapsed_seconds": round(elapsed, 2),
        "total_watch_seconds": round(total_watch_seconds, 2),
        "ok": ok, "fail": fail,
    }
    _save_run_record(run_record)
    log.info("=== ALL DONE ===  method=%s channels=%s rounds=%d", method, channels, args.rounds)
    log.info("  elapsed = %.1fs  video-plays=%d  ok=%d  fail=%d",
             elapsed, len(all_log), ok, fail)
    log.info("  total watch time claimed = %.0fs (%.1f min / %.2f h)",
             total_watch_seconds, total_watch_seconds / 60.0, total_watch_seconds / 3600.0)
    return {"method": method, "channels": channels, "dry_run": False,
            "list_source": list_source, "days": args.days, "rounds": args.rounds,
            "delay": args.delay, "cadence": args.cadence, "repeat": args.repeat,
            "total_videos_played": len(all_log), "elapsed_seconds": round(elapsed, 2),
            "total_watch_seconds": round(total_watch_seconds, 2), "ok": ok, "fail": fail}


if __name__ == "__main__":
    main()
