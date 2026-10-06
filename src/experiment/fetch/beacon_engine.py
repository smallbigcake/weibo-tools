"""Unified Weibo FastWatch experiment: replay realistic playback beacons on the
author's recent videos and MEASURE total wall-clock time AND (optionally) whether
the server credits PLAY COUNT / PLAY DURATION.

==========================================================================
Playback-report CHANNELS, selectable with --channels
--------------------------------------------------------------------------
The old `beacon_engine.py` only emitted CHANNEL 1 (play_history/report.json),
the `seconds` heartbeat. A real 2026-09-18 watch HAR shows the browser actually
fires FOUR report channels while watching:

  1. play_history/report.json  (GET, ?seconds=N)   -- playback progress / play count
  2. ajax/log/h5playlog         (POST FormData)     -- detailed play log carrying
     `valid_play_duration` (ms).
  3. aj/video/playstatistics?ajwvr=6 (POST FormData, ONCE at play start) -- play-start
     registration. sig = md5(data+key+"yixiong&zhaolong5"), recovered 2026-09-21
     from the weibo-pro-next bundle.
  4. ajax/log/read (POST JSON, ~every 15s) -- `PC_real_read` with CUMULATIVE
     `read_duration` (ms). For a video this read dwell == watch time; the strongest
     candidate for what the creator-center PLAY DURATION actually aggregates
     (h5playlog `valid_play_duration` did NOT credit in the 2026-09-21 triple test).

`--channels single`  -> CHANNEL 1 only (legacy FastWatch).
`--channels dual`    -> CHANNELS 1+2, INTERLEAVED per heartbeat (report.json first,
                        then h5playlog). DEFAULT.
`--channels triple`  -> CHANNELS 1+2+3: dual, PLUS playstatistics ONCE at each video's
                        start (the full real-player sequence).
`--channels quad`    -> CHANNELS 1+2+3+4: triple, PLUS PC_real_read every heartbeat.
                        Highest-coverage attempt to credit creator-center PLAY DURATION.

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
Selection (matches the old beacon_engine.py)
--------------------------------------------------------------------------
    videos = author videos published in last `days` days (default 30), fetched
             LIVE at run time via the creator-center getVideoList (AUTHOR_UID
             session); falls back to the static src/data/creator_center/creator_center_author_videos.json
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
  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/beacon_engine.py \
      [--days 30] [--rounds 10] [--delay 1.0] [--cadence 30] \
      [--channels single|dual|triple|quad] [--mid <mid>] \
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
import gzip
import hashlib
import json
import os
import random
import string
import sys
import time
import uuid
from datetime import datetime, timezone, timedelta
from urllib.parse import urlencode
import shutil
import logging

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
_src_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, _src_root)

from auth import Auth
from logutil import setup as _setup_logging
from filestamp import batch_stamp, day_stamp, stamp_from_iso
_setup_logging()  # idempotent; configures the shared weibo.log for other modules
# Library-style logger: this module is the LOW-LEVEL beacon implementation, reused
# by higher-level scripts, so it owns NO handler and decides nothing about where
# output lands -- it only names its logger and emits records. The caller wires it:
#
#   * orchestrators (simulated_watch.setup_batch_log) merge it into their own
#     per-run file with logutil.share_handler(beacon_log, handler);
#   * a script that runs alone can either attach its own handler, or just set
#     logging.getLogger('beacon_engine').propagate = True to fall through to the
#     shared weibo.log that logutil.setup() configures.
#
# propagate=False by default so the verbose DEBUG request dumps never leak into
# the shared weibo.log; NullHandler keeps "no caller wired it" silent (instead of
# Python's last-resort stderr fallback).
log = logging.getLogger('beacon_engine')
log.setLevel(logging.DEBUG)
log.propagate = False
if not log.handlers:
    log.addHandler(logging.NullHandler())


SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEO_DATA = os.path.join(SRC_DIR, "data", "creator_center", "creator_center_author_videos.json")
# All watch run logs live under src/data/watch/ (kept apart from the shared
# author_videos.json DB and the diag/crawl outputs that also live in src/data).
WATCH_DIR = os.path.join(SRC_DIR, "data", "watch")
LOG_PATH = os.path.join(WATCH_DIR, "beacon_engine_log.json")

REPORT_URL = "https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json"
H5PLAYLOG_URL = "https://weibo.com/ajax/log/h5playlog"
ACTION_URL = "https://weibo.com/ajax/log/action"
RUM_URL = "https://rum.h5.weibo.cn/intake/v2/rum/events"
GETVIDEO_URL = "https://weibo.com/ajax/multimedia/getVideoList"
SOURCE = "339644097"
from constants import BROWSER_USER_AGENT as UA
CREATOR_REF = "https://weibo.com/creator"
# The browser watches the author's profile video tab; every playback beacon's
# Referer is that page (HAR: https://weibo.com/u/<AUTHOR>?tabtype=newVideo...).
# A bare "https://weibo.com/" Referer is less faithful and risks the server
# rejecting the play as not originating from a real video page.
WATCH_REFERER = "https://weibo.com/u/%s?tabtype=newVideo" % AUTHOR_UID
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


def _log_http(r, label, include_resp_body=True):
    """Dump the request + response of one HTTP call to the logger (file only via
    DEBUG). By default the FULL body is dumped (used by the small JSON beacons);
    pass `include_resp_body=False` for large-binary responses (e.g. DASH video
    chunk GETs) to skip the response body while STILL logging request
    headers/body and response status + headers."""
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
    if include_resp_body:
        log.debug("  resp body   : %s" % (r.text or ''))
    else:
        log.debug("  resp body   : (omitted: large binary payload)")


def _daily_log_path():
    day = day_stamp()
    return os.path.join(WATCH_DIR, "beacon_engine_log_%s.jsonl" % day)


def _archive_current_log():
    if not os.path.exists(LOG_PATH):
        return None
    stamp = None
    try:
        with open(LOG_PATH, encoding="utf-8") as f:
            prev = json.load(f) or {}
        ts = prev.get("generated_at")
        if ts:
            stamp = stamp_from_iso(ts)
    except Exception:
        pass
    if not stamp:
        stamp = batch_stamp()
    archive_dir = os.path.join(WATCH_DIR, "archive")
    os.makedirs(archive_dir, exist_ok=True)
    dst = os.path.join(archive_dir, "beacon_engine_log_%s.json" % stamp)
    if os.path.exists(dst):
        dst = os.path.join(archive_dir,
                           "beacon_engine_log_%s.%d.json" % (stamp, int(time.time())))
    shutil.copy2(LOG_PATH, dst)
    return dst


def method_label(delay):
    """Derive the run's pace label from --delay (1s vs 30s stays distinguishable)."""
    return "FastWatch-%.0fs" % delay


from datetime_util import utc8_from_ms  # noqa: E402  (server-ms -> Beijing display)


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
    static src/data/creator_center/creator_center_author_videos.json snapshot; fallback when live is unavailable)."""
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
                 i, v["mid"], v.get("duration", 0), utc8_from_ms(v.get("create_time")) or "?",
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
def req_host_value(mid, first_cursor=None):
    # Browser reqHost / Referer when a video layer is open:
    #   https://weibo.com/u/<AUTHOR>?tabtype=newVideo&first_cursor=<firstVideoMid>&layerid=<mid>
    # first_cursor is the cursor of the FIRST video in the author's video list
    # (constant for the whole page); layerid is the mid of the video being watched.
    # Callers that don't know the first video pass first_cursor=None and we fall
    # back to mid (the OLD, slightly-wrong value) for backward compatibility.
    fc = first_cursor if first_cursor is not None else mid
    return "https://weibo.com/u/%s?tabtype=newVideo&first_cursor=%s&layerid=%s" % (
        AUTHOR_UID, fc, mid)


def first_cursor_of(items):
    """Return the FIRST video's mid -- the author's video-list initial cursor
    (constant for the whole page), used in the playback beacons' Referer/reqHost
    as first_cursor=<firstVideoMid>. Accepts EITHER:
      * a dict keyed by mid (e.g. get_media_map's wmap) -> first key, or
      * an iterable of video dicts (e.g. get_video_list's window) -> first .mid.
    Returns None when there are no items. Shared by both watch_one (via
    run_watch's wmap) and replay_one (via beacon_engine.main's window) so the
    page-URL first_cursor is computed identically in both drivers."""
    if isinstance(items, dict):
        items = iter(items.keys())
    for v in items:
        mid = v.get("mid") if isinstance(v, dict) else v
        if mid:
            return mid
    return None


def _record(results, endpoint, **fields):
    rec = {"endpoint": endpoint, "ts": time.time()}
    rec.update(fields)
    results.append(rec)
    return rec


def _post_report_step(session, mid, oid, duration, play_type, sec, results,
                      first_cursor=None):
    """One report.json heartbeat (CHANNEL 1, the JS `HistoryReport` class). Records
    the server response and RETURNS `next_report_delay_seconds` (the server-driven
    cadence for the NEXT heartbeat; -1 means stop). Returns None when absent.

    Faithful to the 2026-09-23 waterfall watch HAR. The browser sends:
      source/play_type/video_orientation/video_duration/id/id_type/oid/seconds
      PLUS is_contribution=0 and reqHost=<author page url>. `oid` is the FULL
      "1034:<media_id>". `seconds` is the watched-seconds (server REQUIRES it,
      else HTTP 422 / 20359). The response's `data.next_report_delay_seconds`
      drives the real browser's periodic re-fire (see HistoryReport.timeupdateHandle).
    """
    params = {
        "source": SOURCE,
        "play_type": play_type,
        "video_orientation": "horizontal",
        "video_duration": str(int(round(duration or 0))),
        "id": str(mid),
        "id_type": "0",
        "oid": str(oid),
        "is_contribution": "0",
        "reqHost": req_host_value(mid, first_cursor),
        "seconds": str(sec),
    }
    url = REPORT_URL + "?" + urlencode(params)
    body = err = None
    ec = None
    next_delay = None
    try:
        r = session.post(url, headers={"User-Agent": UA,
                                        "Referer": req_host_value(mid, first_cursor)},
                         timeout=20000)
        status = r.status_code
        try:
            body = r.text
        except Exception:
            body = None
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
            try:
                next_delay = (j.get("data") or {}).get("next_report_delay_seconds")
            except Exception:
                next_delay = None
        except Exception:
            ec = None
        log.info("  [report] mid=%s play_type=%s seconds=%s -> %s err=%s next_delay=%s"
                 % (mid, play_type, sec, status, ec, next_delay))
        _log_http(r, 'beacon report')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [report] mid=%s -> ERROR %s" % (mid, ex))
    _record(results, "report.json", mid=mid, play_type=play_type, seconds=sec,
            status=status, error_code=ec, error=err, body=body)
    return next_delay


def _rand5():
    import string
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=5))


def build_h5playlog_data(mid, oid, duration, playduration_ms,
                         valid_play_duration_ms, play_time, quit_status="",
                         sid=None, firstframe_time_ms="878"):
    """Build the h5playlog FormData `data` field (semicolon CSV) as the real client
    does. Field order reverse-engineered from the 2026-09-18 HAR; the empty 9th
    field (index 8) is preserved verbatim. sig = md5(data+key+'encryptedString').

    CRITICAL (2026-09-24, waterfall HAR): `sid` MUST be STABLE across every
    heartbeat of ONE watch session. The browser keeps it byte-identical for the
    whole watch (e.g. "H5_nzbmd_179014459481215234" on all 3 h5playlog beacons).
    The server aggregates cumulative `valid_play_duration` PER `sid`; a fresh
    random `sid` per beacon fragments the session and the watch is never
    credited. Pass a caller-owned `sid` (generated once per video)."""
    ts_ms = int(time.time() * 1000)
    if sid is None:
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
        str(int(firstframe_time_ms)),    # 13 firstframe_time (ms) = Date.now()-startTime
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
                         play_time, is_last, results, sid=None, first_cursor=None,
                         valid_play_duration_ms=None, firstframe_time_ms=None,
                         quit_status=None):
    """One ajax/log/h5playlog beacon (CHANNEL 2). Records the server response.

    `sec` is the current PLAYBACK POSITION in seconds (absolute) -> fills
    `playduration` (= the browser's `floor(currentTime*1000)`). `valid_play_duration_ms`
    is the valid-play accumulated SINCE THE PREVIOUS h5playlog send and MUST be
    passed by the caller: the browser resets it to 0 in `_afterSend`, so each
    beacon reports a DELTA, never the cumulative position. When omitted it falls
    back to `pos_ms` (legacy delay-driven behaviour). `firstframe_time_ms` is the
    first-frame latency (`Date.now()-startTime`); defaults to the legacy 878.
    `is_last` closes the session with quit_status='complete'. Pass `quit_status`
    explicitly to close it as 'not_complete' instead (stopped mid-way); the
    official enum is complete / not_complete / cancel / error, filled by
    PlayLog.dispose from the player state.
    `sid` is a STABLE per-watch session id -- pass the same value for every beat.
    """
    full = int(round(duration or 0))
    pos_ms = int(min(sec, full) * 1000)            # playduration = absolute position
    if valid_play_duration_ms is None:
        valid_play_duration_ms = pos_ms            # legacy fallback (cumulative)
    if firstframe_time_ms is None:
        firstframe_time_ms = "878"                 # legacy constant
    if quit_status is None:
        quit_status = "complete" if is_last else ""
    data, key, sig = build_h5playlog_data(
        mid, oid, duration, pos_ms, int(valid_play_duration_ms), play_time,
        quit_status=quit_status, sid=sid,
        firstframe_time_ms=firstframe_time_ms)
    body = err = None
    ec = None
    xsrf = session.cookies.get("XSRF-TOKEN", domain="weibo.com")
    h5_headers = {"User-Agent": UA,
                  "Referer": req_host_value(mid, first_cursor),
                  "x-requested-with": "XMLHttpRequest"}
    if xsrf:
        h5_headers["X-Xsrf-Token"] = xsrf
    # Fidelity: the browser uses `new FormData()` which emits a Chrome-style
    # `----WebKitFormBoundary<16 alnum>` boundary. The requests `files=` default
    # (a 32-hex boundary) is a detectable fingerprint, so build the raw body
    # with the shared build_webkit_multipart helper (same as playstatistics).
    body, h5_headers["Content-Type"] = build_webkit_multipart(
        [("data", data), ("key", key), ("sig", sig)])
    try:
        r = session.post(H5PLAYLOG_URL, data=body, headers=h5_headers,
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
        log.info("  [h5play] mid=%s seconds=%s playduration_ms=%d valid_ms=%d -> %s err=%s"
                 % (mid, sec, pos_ms, int(valid_play_duration_ms), status, ec))
        _log_http(r, 'beacon h5playlog')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [h5play] mid=%s -> ERROR %s" % (mid, ex))
    _record(results, "h5playlog", mid=mid, seconds=sec,
            valid_play_duration_ms=pos_ms, quit_status=quit_status,
            status=status, error_code=ec, error=err, body=body)


# --- CHANNEL 3 + CHANNEL 4 low-level builders -------------------------------------
# Moved here from the now-deleted playback_beacons.py so ALL six channels live in
# this one module. quick_watch_delay_probe.py imports send_playstatistics from here.
PLAYSTAT_URL = "https://weibo.com/aj/video/playstatistics?ajwvr=6"
PLAYSTAT_SALT = "yixiong&zhaolong5"  # PlayStatistics._md5Log salt (NOT "encryptedString")
READ_URL = "https://weibo.com/ajax/log/read"  # PC_real_read endpoint
_PS_COUNT = [0]  # faithful replica of PlayStatistics._logKey()'s `count++`


def md5(s):
    return hashlib.md5(s.encode("utf-8")).hexdigest()


def build_playstatistics(mid, media_id, viewer_uid, actionlog_uuid=None):
    """Return (data, key, sig) for ONE playstatistics beacon, exactly as the
    PlayStatistics video.js plugin builds it.

    data = JSON.stringify({uid, mid, keys, type:"feedvideo", uuid, media_id})
    key  = Log_<rand5>_<ts(ms)><rand4><count>
    sig  = md5(data + key + "yixiong&zhaolong5")

    `keys` and `uuid` are the SAME value: the post's `actionlog.uuid` (recovered
    from the profile waterfall / getCollectionList in the weibo-pro-next bundle --
    see src/tmp/inspect_*). When `actionlog_uuid` is None we fall back to a random
    number so the old behavior (and the quick_watch path) still works.
    """
    rk = actionlog_uuid if actionlog_uuid is not None else random.randint(10 ** 12, 10 ** 13 - 1)
    data = ('{"uid":%s,"mid":"%s","keys":%s,"type":"feedvideo",'
            '"uuid":%s,"media_id":"%s"}' % (viewer_uid, mid, rk, rk, media_id))
    ts = int(time.time() * 1000)
    rand4 = random.randint(0, 9999)
    key = "Log_%s_%d%d%d" % (_rand5(), ts, rand4, _PS_COUNT[0])
    _PS_COUNT[0] += 1
    sig = md5(data + key + PLAYSTAT_SALT)
    return data, key, sig


def _xsrf_from(session):
    """XSRF-TOKEN cookie value ('' when absent) required by weibo.com/ajax endpoints."""
    try:
        return session.cookies.get("XSRF-TOKEN", domain="weibo.com") or ""
    except Exception:
        try:
            return session.cookies.get("XSRF-TOKEN") or ""
        except Exception:
            return ""


def _multipart_body(fields, boundary):
    """Build a raw multipart/form-data body (bytes) the way the browser's
    `new FormData()` does: NO `filename` on the parts, CRLF line endings. The
    boundary token already includes the leading `----WebKitFormBoundary` so the
    on-wire delimiter is `--<token>` (six dashes), matching Chrome."""
    lines = []
    for name, value in fields:
        lines.append("--%s" % boundary)
        lines.append('Content-Disposition: form-data; name="%s"' % name)
        lines.append("")
        lines.append(str(value))
    lines.append("--%s--" % boundary)
    return ("\r\n".join(lines)).encode("utf-8") + b"\r\n"


def build_webkit_multipart(fields):
    """Generate a Chrome-style `----WebKitFormBoundary<16 alnum>` boundary, build
    the raw multipart/form-data body, and return `(body_bytes, content_type)`.

    The browser's `new FormData()` emits exactly this; requests' `files=` default
    uses a 32-hex boundary, which is a detectable fingerprint -- so both the
    h5playlog and playstatistics channels go through THIS one helper instead of
    duplicating the boundary generation.
    """
    boundary = "----WebKitFormBoundary" + "".join(
        random.choices(string.ascii_letters + string.digits, k=16))
    return _multipart_body(fields, boundary), "multipart/form-data; boundary=%s" % boundary


def send_playstatistics(session, mid, media_id, viewer_uid, delay=0.5,
                        referer=None, actionlog_uuid=None, first_cursor=None):
    """POST the playstatistics beacon ONCE. Returns (http_status, error_code, response).

    Fidelity notes (2026-10-01, compared byte-for-byte against the real browser):
      * `keys`/`uuid` = the post's `actionlog.uuid` (passed in; falls back to a
        random number when None). See build_playstatistics().
      * The body is sent as multipart/form-data with a Chrome-style boundary
        `----WebKitFormBoundary<16 alnum>` -- the browser uses FormData, which
        emits exactly that; the requests `files=` default (a 32-hex boundary) is
        a detectable fingerprint.
      * The Referer is the author's profile page WITH `&first_cursor=<firstVideoMid>`
        and `&layerid=<mid>` -- identical to what the real browser sends when a
        video is opened in the feed layer (req_host_value(mid, first_cursor)).
        A bare profile URL is the old, less-faithful value.
    """
    data, key, sig = build_playstatistics(mid, media_id, viewer_uid, actionlog_uuid)
    headers = {"User-Agent": UA,
               "Referer": referer or req_host_value(mid, first_cursor) or "https://weibo.com/",
               "x-requested-with": "XMLHttpRequest"}
    xsrf = _xsrf_from(session)
    if xsrf:
        headers["X-Xsrf-Token"] = xsrf
    body, headers["Content-Type"] = build_webkit_multipart(
        [("data", data), ("key", key), ("sig", sig)])
    try:
        r = session.post(PLAYSTAT_URL, data=body, headers=headers, timeout=20000)
        status = r.status_code
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        return status, ec, r
    except Exception as ex:
        return None, str(ex), None


def _post_playstatistics_step(session, mid, media_id, results, actionlog_uuid=None,
                              first_cursor=None):
    """CHANNEL 3: one `aj/video/playstatistics?ajwvr=6` beacon at play start.
    Uses the local `send_playstatistics` (canonical algorithm recovered from the
    weibo-pro-next bundle, verified 2026-09-21). Pass `actionlog_uuid` (the
    post's real actionlog uuid) so `keys`/`uuid` match the browser, and
    `first_cursor` (the first video's mid) so the Referer matches the browser's
    page URL (first_cursor=<firstVideoMid>&layerid=<currentVideoMid>)."""
    status, ec, r = send_playstatistics(session, mid, media_id, VIEWER_UID, 0.5,
                                        referer=req_host_value(mid, first_cursor),
                                        actionlog_uuid=actionlog_uuid)
    log.info("  [playstats] mid=%s media_id=%s -> %s err=%s"
             % (mid, media_id, status, ec))
    if r is not None:
        _log_http(r, 'beacon playstatistics')
    _record(results, "playstatistics", mid=mid, media_id=media_id,
            status=status, error_code=ec)


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
    # COMPACT separators, byte-faithful to the browser: the captured HAR sends
    # [{"act":"PC_real_read",...}] with NO space after ':' or ','. json.dumps'
    # default would add them. See src/tmp/compare_read_body.py.
    return json.dumps([rec], ensure_ascii=False, separators=(",", ":"))


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
    headers = {"User-Agent": UA,
               "Referer": referer or "https://weibo.com/",
               "x-requested-with": "XMLHttpRequest"}
    xsrf = _xsrf_from(session)
    if xsrf:
        headers["X-Xsrf-Token"] = xsrf
    try:
        # Byte-faithful to the browser. requests' `json=` serialises with
        # json.dumps DEFAULTS (', ' / ': '), adding whitespace the real client
        # does not send (~24 bytes). Serialise compactly ourselves and send the
        # utf-8 bytes with an explicit application/json.
        # Evidence: src/tmp/compare_read_body.py vs the 2026-09-18 browser HAR.
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload, ensure_ascii=False,
                          separators=(",", ":")).encode("utf-8")
        r = session.post(READ_URL, data=body, headers=headers, timeout=20000)
        status = r.status_code
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            ec = None
        return status, ec, r
    except Exception as ex:
        return None, str(ex), None


def _post_read_step(session, mid, read_ms, results, rid=None, first_cursor=None):
    """CHANNEL 4: one `ajax/log/read` (PC_real_read) beacon, read_duration = cumulative
    watched ms. Recovered from the 2026-09-18 HAR; the strongest candidate for the
    creator-center PLAY DURATION source (h5playlog `valid_play_duration` did NOT credit
    in the 2026-09-21 triple test). No sig/key; body is {"data": "<array-string>"}.

    `rid` is a STABLE per-watch session id (see build_read_log above) --
    pass the same value for every heartbeat of one video so the server aggregates
    the cumulative read_duration into a single credited watch.
    """
    status, ec, r = send_read_log(session, mid, read_ms, rid=rid,
                                  referer=req_host_value(mid, first_cursor))
    log.info("  [read] mid=%s read_ms=%d rid=%s -> %s err=%s"
             % (mid, read_ms, (rid or "?"), status, ec))
    if r is not None:
        _log_http(r, 'beacon read')
    _record(results, "read", mid=mid, read_ms=read_ms, rid=rid,
            status=status, error_code=ec)


def _post_action_step(session, act_code, uicode, ext, results, label=None,
                      first_cursor=None):
    """CHANNEL 5 (NEW, 2026-09-25): one `ajax/log/action` EXPOSURE beacon.

    Recovered from weibo-video-watch-waterfall-2026-09-23.har, where the real
    browser fires FOUR of these at PAGE LOAD -- BEFORE any playback beacon:
        * act_code=4288  uicode=20000366  ext=staruid:<author>|loginuid:<viewer>
          (the viewer landed on the author's profile/video page)
        * act_code=7165  uicode=20000393  ext=vuid:<author>|welfare:0   (x3,
          the watched video item being exposed in the feed)
    These are the organic "view / exposure" anchors. Without them the server
    has no proof a real human opened the page, and the play/read/report
    progress is NOT credited (the 2026-09-24 simulated watch, which omitted
    action entirely, was never counted in creator-center play_dura_count).
    GET, query-only, no body/sig. `t` = ms epoch.

    Fire the profile-expose (4288) once and the video-expose (7165) once per
    watch, inside the burst that precedes the playback beacons."""
    params = {
        "type": "pic",
        "uicode": str(uicode),
        "act_code": str(act_code),
        "ext": ext,
        "t": str(int(time.time() * 1000)),
    }
    # Referer fidelity (2026-10-01, verified against the real browser):
    #   * act_code=4288 (profile expose): bare profile page -- NO first_cursor/layerid
    #   * act_code=7165 (video expose):   page WITH first_cursor -- NO layerid
    if act_code == "4288":
        referer = WATCH_REFERER
    else:
        referer = (WATCH_REFERER + "&first_cursor=%s" % first_cursor
                   if first_cursor is not None else WATCH_REFERER)
    url = ACTION_URL + "?" + urlencode(params)
    status = err = None
    ec = None
    try:
        r = session.get(url,
                        headers={"User-Agent": UA,
                                 "Accept": "application/json, text/plain, */*",
                                 "Referer": referer,
                                 "x-requested-with": "XMLHttpRequest"},
                        timeout=20000)
        status = r.status_code
        try:
            j = r.json()
            ec = j.get("error_code") or j.get("errorCode")
        except Exception:
            # Endpoint falls back to a 1x1 tracking-pixel PNG when the client
            # Accept header lacks application/json (content negotiation). The
            # action is still logged server-side, but we match the browser so we
            # get the real {"ok":1} JSON response. Treat pixel fallback as non-fatal.
            ec = "pixel-fallback"
        log.info("  [action] act_code=%s uicode=%s -> %s err=%s"
                 % (act_code, uicode, status, ec))
        _log_http(r, 'beacon action')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [action] act_code=%s -> ERROR %s" % (act_code, ex))
    _record(results, "action", act_code=act_code, uicode=uicode,
            status=status, error_code=ec, error=err)


# --------------------------------------------------------------------------
# RUM (Real User Monitoring) beacon -- CHANNEL 6 (NEW, 2026-09-25, "to be safe")
# --------------------------------------------------------------------------
# Faithful NDJSON batch (application/x-ndjson, gzip) to rum.h5.weibo.cn, exactly
# as the real weibo-pro-next client emits. The browser sends a `metadata` line
# followed by one `transaction` per page-load / XHR (27 of them in the
# 2026-09-23 waterfall HAR). We replicate: one `page-load` transaction at watch
# start, then one `http-request` transaction per heartbeat (summarizing that
# tick's beacon round). Response is 202 Accepted; it is pure telemetry, but we
# emit it for fidelity so the server sees a genuine client session.
_RUM_METADATA = {
    "metadata": {
        "service": {
            "name": "AppVue3",
            "agent": {"name": "rum-js", "version": "5.17.0"},
            "language": {"name": "javascript"},
            "environment": "development",
        }
    }
}


def _rum_transaction(kind, name, duration_ms, url=None, outcome=None):
    """Build one RUM `transaction` event dict (page-load or http-request)."""
    tx = {
        "transaction": {
            "id": uuid.uuid4().hex[:16],
            "trace_id": uuid.uuid4().hex,
            "name": name,
            "type": kind,
            "duration": int(duration_ms),
            "context": {
                "page": {
                    "referer": "",
                    "url": url or ("https://weibo.com/u/%s?tabtype=newVideo" % AUTHOR_UID),
                },
                "user": {"id": int(VIEWER_UID)},
            },
            "span_count": {"started": 0},
            "sampled": False,
            "sample_rate": 0,
        }
    }
    if outcome is not None:
        tx["transaction"]["outcome"] = outcome
    if kind == "page-load":
        tx["transaction"]["context"]["response"] = {
            "transfer_size": 3320, "encoded_body_size": 3020, "decoded_body_size": 7475,
        }
    return tx


def _post_rum_step(session, transactions, results, label=None):
    """POST one RUM NDJSON batch (metadata + transactions), gzip-compressed.

    `transactions` is a list of transaction dicts from `_rum_transaction`."""
    lines = [json.dumps(_RUM_METADATA, ensure_ascii=False)]
    for t in transactions:
        lines.append(json.dumps(t, ensure_ascii=False))
    ndjson = "\n".join(lines) + "\n"
    body = gzip.compress(ndjson.encode("utf-8"))
    headers = {
        "User-Agent": UA,
        "Referer": "https://weibo.com/",
        "Origin": "https://weibo.com",
        "Content-Type": "application/x-ndjson",
        "Content-Encoding": "gzip",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
    }
    status = err = None
    try:
        r = session.post(RUM_URL, data=body, headers=headers, timeout=20000)
        status = r.status_code
        log.info("  [rum] %s -> %s" % (label or "", status))
        _log_http(r, 'rum events')
    except Exception as ex:
        status, err = None, str(ex)
        log.warning("  [rum] %s -> ERROR %s" % (label or "", ex))
    _record(results, "rum", label=label, status=status, error=err)


def replay_one(session, mid, oid, duration, seq, delay, play_time, results, channels,
               rid=None, first_cursor=None):
    """Replay ONE video.
    * single -> report.json only, every heartbeat.
    * dual   -> report.json THEN h5playlog, interleaved per heartbeat.
    * triple -> dual PLUS playstatistics ONCE at the video's start (the full
                real-player sequence: report(play_type=0) + playstatistics +
                h5playlog fire together at start, then report+h5playlog every
                heartbeat).
    * quad   -> triple PLUS PC_real_read (ajax/log/read) every heartbeat; the
                highest-coverage attempt to credit creator-center PLAY DURATION.

    A single watch session gets ONE stable `sid` (h5playlog) and ONE stable
    `rid` (PC_real_read), reused for every heartbeat -- the browser keeps both
    byte-identical across the whole watch, and the server aggregates cumulative
    play/read duration PER (sid, rid). Randomizing them per beacon (the old
    behavior) fragmented the session and was never credited (2026-09-24).

    `rid` is the post's read-log id (PC_real_read); when available it is the
    REAL value sourced from the profile waterfall feed ("<pos>_0_0_<pageId>_0_0_0").
    When None it falls back to a stable random value, still constant for the
    whole watch."""
    media_id = (oid or "").split(":")[-1]
    sid = "H5_%s_%d" % (_rand5(), int(time.time() * 1000))
    if rid is None:
        rid = "0_0_0_%d_0_0_0" % random.randint(10 ** 18, 10 ** 19 - 1)
    # CHANNEL 5 (action exposure): fire at page load, BEFORE the playback beacons
    # (the real browser does this; without it the watch is never credited).
    log.info("  [burst] action(4288 profile) + action(7165 video)")
    _post_action_step(session, "4288", "20000366",
                     "staruid:%s|loginuid:%s" % (AUTHOR_UID, VIEWER_UID), results,
                     first_cursor=first_cursor)
    _post_action_step(session, "7165", "20000393",
                     "vuid:%s|welfare:0" % AUTHOR_UID, results,
                     first_cursor=first_cursor)
    # CHANNEL 6 (RUM): one page-load transaction at session start (the browser's
    # first rum event), for client-session fidelity.
    _post_rum_step(session,
                   [_rum_transaction("page-load", "/u/:id", 1500)],
                   results, label="page-load")
    if channels in ("triple", "quad"):
        if media_id:
            _post_playstatistics_step(session, mid, media_id, results,
                                      first_cursor=first_cursor)
        else:
            log.warning("  [%s] skip playstatistics (no media_id from oid=%s)", channels, oid)
    full = int(round(duration or 0))
    for i, (play_type, sec) in enumerate(seq):
        _post_report_step(session, mid, oid, duration, play_type, sec, results,
                          first_cursor=first_cursor)
        if channels in ("dual", "triple", "quad"):
            _post_h5playlog_step(session, mid, oid, duration, play_type, sec,
                                 play_time, i == len(seq) - 1, results, sid=sid,
                                 first_cursor=first_cursor)
        if channels == "quad":
            _post_read_step(session, mid, int(min(sec, full) * 1000), results, rid=rid,
                           first_cursor=first_cursor)
        # CHANNEL 6 (RUM): one http-request transaction per heartbeat (summarizing
        # this tick's beacon round), mirroring the browser's per-XHR rum sends.
        _post_rum_step(session,
                       [_rum_transaction("http-request", "watch heartbeat %d" % i,
                                         int((delay or 1) * 1000) or 50,
                                         outcome="success")],
                       results, label="hb%d" % i)
        time.sleep(delay)


# --------------------------------------------------------------------------
# Optional LAGGED creator-center aggregate snapshot
# --------------------------------------------------------------------------
def snapshot_aggregates(tag):
    import read_video_aggregates as _ra
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
    path = os.path.join(SRC_DIR, "data", "watch", "beacon_engine_%s.json" % tag)
    with open(path, "w", encoding="utf-8", newline='\n') as f:
        json.dump(snap, f, ensure_ascii=False, indent=2)
    return snap, path


def _val(snap, period, key):
    return (snap.get(period, {}).get(key, {}) or {}).get("value")


def _http_ok(rec):
    """True when a recorded call answered 2xx.

    RUM answers 202 Accepted and DASH answers 206 Partial Content, so comparing
    a recorded status against 200 alone is wrong (it flagged every rum beacon).
    """
    try:
        return 200 <= int(rec.get("status")) < 300
    except (TypeError, ValueError):
        return False


def _write_audit(results, channels):
    run_stamp = batch_stamp()
    res_path = os.path.join(WATCH_DIR,
                            "beacon_engine_responses_%s.jsonl" % run_stamp)
    with open(res_path, "w", encoding="utf-8", newline='\n') as f:
        for rec in results:
            f.write(_json.dumps(rec, ensure_ascii=False) + "\n")
    log.info("=== SERVER RESPONSE AUDIT (%d calls, channels=%s) ===",
             len(results), channels)
    log.info("  log -> %s", res_path)
    errs = [r for r in results if r.get("error") or not _http_ok(r)]
    log.info("  non-2xx or exception: %d", len(errs))
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
    with open(LOG_PATH, "w", encoding="utf-8", newline='\n') as f:
        json.dump(run_record, f, ensure_ascii=False, indent=2)
    day_path = _daily_log_path()
    with open(day_path, "a", encoding="utf-8", newline='\n') as f:
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
        description="Unified FastWatch: single/dual/triple/quad playback-report channels "
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
    ap.add_argument("--channels", choices=["single", "dual", "triple", "quad"],
                    default="dual",
                    help="single = report.json only (legacy); dual = report.json + "
                         "h5playlog, interleaved per heartbeat (DEFAULT); triple = "
                         "dual + playstatistics ONCE per video start; quad = triple + "
                         "PC_real_read (ajax/log/read) per heartbeat (candidate PLAY "
                         "DURATION source)")
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
            if channels == "quad":
                per_video = len(seq) * 3 + 1   # report+h5playlog+read per hb, +1 playstatistics
            elif channels == "triple":
                per_video = len(seq) * 2 + 1   # +1 playstatistics (once per video)
            elif channels == "dual":
                per_video = len(seq) * 2
            else:
                per_video = len(seq)
            total_req += per_video * args.repeat
            t = datetime.fromtimestamp(v["create_time"] / 1000,
                                       tz=timezone.utc).strftime("%Y-%m-%d")
            log.info("  #%d  %s  dur=%.0fs  heartbeats=%d x%d  mid=%s"
                     % (i, t, v.get("duration", 0), len(seq), per_video, v["mid"]))
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

    # first_cursor = the FIRST video's mid of the author's video list (the page's
    # initial cursor), constant for the whole page; threaded into every beacon's
    # Referer/reqHost via replay_one -> _post_*_step. Shared with the watch_one
    # driver through beacon_engine.first_cursor_of().
    first_cursor = first_cursor_of(videos)

    # Author session (for live metrics / aggregate) + viewer session (replay).
    a_auth = Auth()
    a_auth.uid = AUTHOR_UID
    a_auth.load()
    sess = _viewer_session()
    results = []
    play_time = utc8_from_ms(int(time.time() * 1000))  # set once, mirrors the client

    t0 = time.time()
    ok = fail = 0
    total_watch_seconds = 0.0
    all_log = []

    # Source the REAL read-log rid per video from the author's profile waterfall
    # feed (getVideoList does NOT carry it). The browser's PC_real_read uses the
    # post's `rid` ("<pos>_0_0_<pageId>_0_0_0"); reusing the real value keeps the
    # beacon faithful instead of a synthetic random one.
    try:
        from simulated_watch import fetch_waterfall_page as _fwf
        _rid_map = {}
        _fw_items, _ = _fwf(sess, AUTHOR_UID)   # cursor defaults to "0"
        for _it in _fw_items:
            if isinstance(_it, dict) and _it.get("mid") and _it.get("rid"):
                _rid_map[_it["mid"]] = _it["rid"]
        for _v in videos:
            _v.setdefault("rid", _rid_map.get(_v["mid"]))
        log.info("sourced real rid for %d/%d videos from waterfall",
                 sum(1 for _v in videos if _v.get("rid")), len(videos))
    except Exception as _ex:
        log.warning("failed to source rid map from waterfall: %s", _ex)

    def replay_video_entry(v, tag, first_cursor=None):
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
                       results, channels, rid=v.get("rid"))
            sent = results[before:]
            if not all(_http_ok(s) for s in sent):
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
            g = replay_video_entry(target, "R%d#T" % rnd, first_cursor=first_cursor)
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
                g = replay_video_entry(v, "R%d#%d" % (rnd, idx), first_cursor=first_cursor)
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
