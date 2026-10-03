"""Simulated viewer-watch via the PROFILE/WATERFALL page (browser-faithful order).

==========================================================================
What this does (and why it differs from beacon_engine.py)
--------------------------------------------------------------------------
`beacon_engine.py` replays the playback-report BEACONS only. It NEVER
fetches the actual video bytes, so it is not a "watch" — and (verified
2026-09-23) the beacon set did NOT credit creator-center `play_dura_count`.

This script adds the missing piece: it OBTAINS the signed playback URL the way
the real viewer's browser does, then FETCHES the video bytes (DASH, via
byte-range 206 GETs, exactly like the browser), and only THEN fires the
beacons in the same relative order the 2026-09-23 waterfall HAR shows:

    DATA (getWaterFallContent)  ->  mp4/DASH byte fetch (Range 206)
                                 ->  beacon BURST (action expose + report pt=0
                                     + playstats + h5playlog)
                                 ->  periodic (report + h5playlog every ~cadence;
                                     read/PC_real_read every heartbeat)

Real-browser evidence (weibo-video-watch-waterfall-2026-09-23.har):
  * Source endpoint (fires 0 times in old HARs, now captured):
        ajax/profile/getWaterFallContent?uid=<author>&cursor=0
    -> data.list[i].page_info.media_info  (DASH + progressive URLs).
  * Browser fetches DASH segments, NOT progressive: 53 mp4 requests carried
    label=dash_hd (24) + dash_audio (29); Range: bytes=START-END -> 206.
  * The play beacons (play_history/report + playstatistics + h5playlog +
    ajax/log/read) all fire on this page. PLUS a 5th, the `ajax/log/action`
    EXPOSURE beacons (act_code 4288 profile + 7165 video), which the real
    browser fires at PAGE LOAD before any playback beacon — the organic-view
    anchor the server requires to credit the watch (added 2026-09-25).

The browser uses the VIEWER session for everything, so all calls here use the
viewer session (config 'viewer_uid'); the author session is used only for the optional
pre/post creator-center aggregate snapshot.

Beacon implementations are REUSED from beacon_engine (single source of
truth) — this file adds only the waterfall-source + DASH byte-fetch layer.

Usage:
  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/simulated_watch.py \
      [--uid <author>] [--cursor 0] [--index 0] [--mid <mid>] \
      [--cadence 30] [--delay 30] [--rounds 1] [--chunk 524288] \
      [--quality dash_hd] [--with-audio] [--with-aggregate] \
      [--smoke] [--dry-run]
"""
import os as _os
import json as _json
import logging
import sys
import time
import shutil
import re
from datetime import datetime, timezone, timedelta

_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
VIEWER_UID = _CFG.get('viewer_uid')

import argparse
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
_src_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, _src_root)

from auth import Auth
from logutil import setup as _setup_logging, share_handler, utc_formatter
from filestamp import batch_stamp
from datetime_util import utc8_from_ms
_setup_logging()
# Reuse the canonical beacon implementations from beacon_engine (single source of truth).
from beacon_engine import (  # noqa: E402
    _viewer_session, _post_report_step, _post_h5playlog_step,
    _post_playstatistics_step, _post_read_step, _post_action_step,
    _post_rum_step, _rum_transaction,
    build_sequence, get_video_list, UA, req_host_value, first_cursor_of,
    _http_ok, log as _beacon_log,
)
# DASH url selection + byte-fetch live in dash_streamer.py.
from dash_streamer import (  # noqa: E402
    DashStreamer, pick_dash_urls, log as _dash_log,
)

SRC_DIR = _src_root
WATCH_DIR = os.path.join(SRC_DIR, "data", "watch")
GETWATERFALL_URL = "https://weibo.com/ajax/profile/getWaterFallContent"
CREATOR_REF = "https://weibo.com/"

log = logging.getLogger('simulated_watch')
log.setLevel(logging.DEBUG)
log.propagate = False


def setup_batch_log():
    """Create this run's single shared log file and merge the beacon-engine +
    dash-streamer loggers into it (one file for the whole run instead of a
    separate simulated_watch + beacon_engine pair). Returns the FileHandler so
    callers (e.g. simulated_watch_targeted) can also attach it to their logger.
    """
    BATCH = batch_stamp()
    _fmt = utc_formatter()
    _dir = os.path.join(SRC_DIR, 'log', 'watch')
    _fh = logging.FileHandler(os.path.join(_dir, 'simulated_watch_%s.log' % BATCH), encoding='utf-8')
    _fh.setLevel(logging.DEBUG)
    _fh.setFormatter(_fmt)
    log.addHandler(_fh)
    # merge beacon_engine + dash_streamer logs into this one file
    share_handler(_beacon_log, _fh)
    share_handler(_dash_log, _fh)
    return _fh


# --------------------------------------------------------------------------
# Duration helpers: parse "1h" / "300m" / "7200s" / "1h30m5s" (bare = seconds)
# --------------------------------------------------------------------------
_DURATION_UNITS = {"h": 3600.0, "m": 60.0, "s": 1.0}
_DURATION_TOKEN = re.compile(r"(\d+(?:\.\d+)?)\s*([hms])")


def parse_duration(text):
    """Parse a human duration into seconds (argparse `type` helper).

    Accepts a bare number (seconds) or unit forms: "1h", "300m", "7200s", and
    combinations such as "1h30m5s". Units may repeat or appear in any order;
    anything else raises ValueError so argparse reports it cleanly.
    """
    s = str(text).strip().lower()
    if not s:
        raise ValueError("empty duration")
    try:
        return float(s)                       # bare number -> seconds
    except ValueError:
        pass
    total, pos = 0.0, 0
    for m in _DURATION_TOKEN.finditer(s):
        if m.start() != pos:
            raise ValueError("cannot parse duration %r (unexpected %r)"
                             % (text, s[pos:m.start()]))
        total += float(m.group(1)) * _DURATION_UNITS[m.group(2)]
        pos = m.end()
    if pos != len(s) or pos == 0:
        raise ValueError("cannot parse duration %r: expected e.g. '90', '300s', "
                         "'20m', '1h' or '1h30m5s'" % text)
    return total


def format_duration(sec):
    """Render seconds compactly (e.g. 5415 -> '1h30m15s')."""
    total = int(round(float(sec or 0)))
    if total <= 0:
        return "0s"
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    out = "%dh" % h if h else ""
    out += "%dm" % m if m else ""
    if s or not out:
        out += "%ds" % s
    return out


# --------------------------------------------------------------------------
# Waterfall source: obtain signed DASH playback URLs as the VIEWER
# --------------------------------------------------------------------------
def _actionlog_uuid_of(v):
    """Extract the post's `actionlog.uuid` from a getWaterFallContent item -- the
    field the real browser sends as playstatistics `keys`/`uuid` (verified against
    the weibo-pro-next bundle and the waterfall HAR: url_struct[0].actionlog.uuid
    == page_info.cards[0].actionlog.uuid). Returns None when absent."""
    for us in (v.get("url_struct") or []):
        if isinstance(us, dict):
            au = (us.get("actionlog") or {}).get("uuid")
            if au:
                return au
    pi = v.get("page_info") or {}
    au = (pi.get("actionlog") or {}).get("uuid")
    if au:
        return au
    for c in (pi.get("cards") or []):
        if isinstance(c, dict):
            au = (c.get("actionlog") or {}).get("uuid")
            if au:
                return au
    return None


def fetch_waterfall_page(session, uid, cursor="0", count=20):
    """One page of getWaterFallContent (viewer). Returns (items, next_cursor).
    items: [{mid, oid(object_id), duration, media_info, title, rid}].

    `type=uid_videos` (+ domain/version/count) is REQUIRED: without it the
    endpoint returns an empty list. The Referer must be the author's profile
    page (the browser sends weibo.com/u/<uid>?tabtype=newVideo); a bare
    weibo.com/ Referer also yields 0 items."""
    params = {"uid": str(uid), "cursor": str(cursor), "count": str(count),
              "type": "uid_videos", "domain": "100505", "version": "v8",
              "__rnd": str(int(time.time() * 1000))}
    r = session.get(GETWATERFALL_URL,
                    params=params,
                    headers={"User-Agent": UA,
                              "Referer": "https://weibo.com/u/%s?tabtype=newVideo" % uid,
                              "x-requested-with": "XMLHttpRequest"},
                    timeout=20000)
    r.raise_for_status()
    data = r.json()
    lst = (data.get("data") or {}).get("list") or []
    out = []
    for v in lst:
        pi = v.get("page_info") or {}
        mi = pi.get("media_info") or {}
        out.append({
            "mid": str(v.get("mid") or v.get("id")),
            "oid": pi.get("object_id"),          # "1034:<id>" — used by beacons
            "duration": int(mi.get("duration") or 0),
            "media_info": mi,
            "rid": v.get("rid"),                 # post read-log id (PC_real_read);
                                                 # format "<pos>_0_0_<pageId>_0_0_0"
            "title": (((v.get("titles") or [{}])[0].get("title", ""))
                      if v.get("titles") else (v.get("text") or "")),
            "actionlog_uuid": _actionlog_uuid_of(v),  # playstatistics keys/uuid
        })
    nxt = str((data.get("data") or {}).get("next_cursor") or "")
    return out, nxt


def fetch_waterfall(session, uid, cursor="0"):
    """Backward-compat: newest page of the waterfall (no pagination)."""
    items, _ = fetch_waterfall_page(session, uid, cursor)
    return items


STATUS_URL = "https://weibo.com/ajax/statuses/show"


def get_media_via_statuses(session, mid):
    """Verified-equivalent single-video media_info source (viewer session).
    Returns page_info.media_info, or {} if unavailable. Used as fallback for any
    window video not present on the public waterfall."""
    try:
        r = session.get(STATUS_URL, params={"id": mid},
                        headers={"User-Agent": UA, "Referer": CREATOR_REF,
                                  "x-requested-with": "XMLHttpRequest"}, timeout=20000)
        j = r.json()
    except Exception as ex:
        log.warning("  [statuses/show] mid=%s ERROR %s", mid, ex)
        return {}
    node = j.get("data") or j
    if isinstance(node, list):
        node = node[0] if node else {}
    pi = node.get("page_info") or (node.get("mblog") or {}).get("page_info") or {}
    return pi.get("media_info") or {}


def get_media_map(session, uid, want_mids, days=30, max_pages=12):
    """Build {mid: item(with media_info)} for the requested mids by PAGINATING the
    real browser endpoint getWaterFallContent. Any mid not found on the waterfall
    (rare) falls back to statuses/show (verified-equivalent DASH media_info)."""
    want = set(str(m) for m in want_mids)
    mmap = {}
    cursor = "0"
    for _ in range(max_pages):
        items, nxt = fetch_waterfall_page(session, uid, cursor)
        if not items:
            break
        for v in items:
            if v["mid"] in want:
                mmap[v["mid"]] = v
        if len(mmap) >= len(want):
            break
        if not nxt or nxt == "0":
            break
        cursor = nxt
    for mid in (want - set(mmap)):
        mi = get_media_via_statuses(session, mid)
        if mi:
            mmap[mid] = {"mid": mid, "oid": mi.get("object_id"),
                         "duration": int(mi.get("duration") or 0),
                         "media_info": mi, "rid": None}
        else:
            log.warning("  media_info not found for mid=%s (will skip)", mid)
    return mmap





# --------------------------------------------------------------------------
# One simulated watch (browser order: fetch bytes -> burst -> periodic)
# --------------------------------------------------------------------------
def _record(results, endpoint, **fields):
    rec = {"endpoint": endpoint, "ts": time.time()}
    rec.update(fields)
    results.append(rec)
    return rec


def watch_one(session, video, results, args, first_cursor=None, deadline=None):
    mid = video["mid"]
    oid = video["oid"]
    duration = video["duration"]
    if not mid or not oid or not duration:
        log.warning("  skip (missing mid/oid/duration): mid=%s", mid)
        return None
    media_info = video["media_info"]
    media_id = str(oid).split(":")[-1]
    dash_urls = pick_dash_urls(media_info, args.quality, args.with_audio)
    if not dash_urls:
        log.warning("  skip (no DASH/progressive url in media_info): mid=%s", mid)
        return None
    log.info("[watch] mid=%s oid=%s dur=%.0fs quality=%s urls=%d title=%s",
             mid, oid, duration, args.quality, len(dash_urls),
             (video.get("title") or "")[:80])
    for lbl, u in dash_urls:
        log.info("  DASH %-12s %s", lbl, u[:110])

    # Build one streamer per DASH url (video + audio interleaved per heartbeat).
    streamers = [DashStreamer(session, u, lbl, args.chunk, args.max_bytes)
                 for lbl, u in dash_urls]
    play_time = utc8_from_ms(int(time.time() * 1000))
    watch_start_ms = int(time.time() * 1000)   # for firstframe_time = Date.now()-startTime

    # ONE stable session id per watch: the browser keeps `sid` (h5playlog) and
    # `rid` (PC_real_read) byte-identical across every heartbeat of a single
    # watch; the server aggregates cumulative play/read duration PER (sid, rid).
    # Randomizing them per beacon fragmented the session and it was never
    # credited (2026-09-24 finding from the waterfall HAR).
    # The `rid` is the post's read-log id (PC_real_read), taken from the
    # getWaterFallContent item (`v.rid`, format "<pos>_0_0_<pageId>_0_0_0") so it
    # is REAL and stable for this watch. If unavailable, fall back to a stable
    # random one (still constant for the whole watch). Never randomize per beacon.
    import random as _random
    sid = "H5_%s_%d" % ("".join(_random.choices(
        "abcdefghijklmnopqrstuvwxyz0123456789", k=5)), int(time.time() * 1000))
    rid = video.get("rid") or ("0_0_0_%d_0_0_0" % _random.randint(10 ** 18, 10 ** 19 - 1))

    # ---- beacon BURST at playback start (mirrors browser: ~0.3s after mp4 start) ----
    # CHANNEL 5 (action exposure) FIRST -- the real browser fires the page/video
    # exposure beacons at page load, before any playback beacon. Without them the
    # server has no organic-view anchor and the play/read is never credited.
    log.info("  [burst] action(4288 profile) + action(7165 video)")
    rum_tx = []          # http-request transactions queued for the first RUM flush

    def _timed(name, fn):
        t0 = time.time()
        out = fn()
        rum_tx.append(_rum_transaction("http-request", name,
                                       (time.time() - t0) * 1000.0))
        return out

    _timed("GET /ajax/log/action",
           lambda: _post_action_step(session, "4288", "20000366",
                                     "staruid:%s|loginuid:%s" % (AUTHOR_UID, VIEWER_UID),
                                     results, first_cursor=first_cursor))
    _timed("GET /ajax/log/action",
           lambda: _post_action_step(session, "7165", "20000393",
                                     "vuid:%s|welfare:0" % AUTHOR_UID, results,
                                     first_cursor=first_cursor))
    log.info("  [burst] report(pt=0,sec=0) + playstatistics + h5playlog(start)")
    nxt_delay = _timed("POST /multimedia.../play_history/report.json",
                       lambda: _post_report_step(session, mid, oid, duration, "0", 0,
                                                 results, first_cursor=first_cursor))
    _timed("GET /aj/video/playstatistics",
           lambda: _post_playstatistics_step(session, mid, media_id, results,
                                             actionlog_uuid=video.get("actionlog_uuid"),
                                             first_cursor=first_cursor))
    _timed("POST /ajax/log/h5playlog",
           lambda: _post_h5playlog_step(session, mid, oid, duration, "0", 0,
                                        play_time, False, results, sid=sid,
                                        first_cursor=first_cursor))
    # CHANNEL 6 (RUM): the Elastic APM agent flushes its queue every 500ms
    # (bundle #234185), so the first intake POST carries the page-load transaction
    # PLUS one http-request transaction for every XHR fired so far -- not just a
    # lone page-load event.
    _post_rum_step(session,
                   [_rum_transaction("page-load", "/u/:id", 1500)] + rum_tx,
                   results, label="page-load")

    # ---- event-driven virtual player (mirrors weibo-pro-next PlayLog + HistoryReport) ----
    # The browser does NOT fire beacons on a fixed sleep() cadence. It runs a
    # videojs event loop: a synthetic `timeupdate` tick (~250ms, like the bundle's
    # setInterval(fn,250)) advances currentTime; each tick accumulates VALID play
    # time (increment < 0.6s only) into two independent buffers.
    # JS-side rationale (timeupdate semantics, native vs manual mode, why the
    # threshold is 0.6s, --speed vs the bundle's real playbackRate, and how this
    # loop maps onto a JS timeupdate callback):
    #   doc/weibo_pro_next_playback_analysis.md -> section 6
    #   * h5playlog (PlayLog):       fires when its buffer >= 30s  (HARD-CODED in source)
    #   * report.json (HistoryReport): fires when its buffer >= next_report_delay_seconds
    #     (SERVER-DRIVEN; seeded by the burst's report.json response, then re-read from
    #     every report.json response).
    # Each h5playlog sends valid_play_duration = the DELTA since its last send
    # (PlayLog._afterSend resets it to 0), NOT the cumulative position. This is the
    # field the old delay-driven loop got wrong (it reported the absolute position).
    _drive_event_player(session, mid, oid, duration, results, args,
                        sid=sid, first_cursor=first_cursor, streamers=streamers,
                        rid=rid, watch_start_ms=watch_start_ms, next_delay=nxt_delay,
                        deadline=deadline)
    return True


def _drive_event_player(session, mid, oid, duration, results, args,
                        sid=None, first_cursor=None, streamers=None, rid=None,
                        watch_start_ms=None, next_delay=None, deadline=None):
    """Event-driven virtual player loop (extracted from watch_one for testability).

    Mirrors the browser's playback event loop: advance a virtual currentTime in
    fixed TICK-second timeupdate ticks (real wall-clock paced by TICK/speed), and
    fire each beacon per its OWN JS-derived trigger. See module docstring section 5.
    """
    TICK = 0.25                        # virtual seconds per timeupdate tick
    READ_INTERVAL_S = 5.0              # PC_real_read: exposure service interval (5e3)
    RUM_FLUSH_MS = 500                 # Elastic APM agent flushInterval (bundle #234185)
    cadence = float(args.cadence or 30)
    delay = float(args.delay or 30)
    speed = float(getattr(args, "speed", 0) or 0) or (cadence / max(delay, 0.1))
    if speed <= 0:
        speed = 1.0
    real_sleep = TICK / speed         # faithful 1x when speed == 1
    duration_s = float(duration or 0)
    cur = 0.0                          # virtual currentTime (s)
    last = 0.0
    hl_valid = 0.0                     # h5playlog valid-play accumulator
    hl_buf = 0.0                       # h5playlog 30s trigger
    ps_valid = 0.0                     # report.json valid-play accumulator
    ps_buf = 0.0                       # report.json next_report_delay trigger
    rd_buf = 0.0                       # PC_real_read dwell accumulator (own 5s timer)
    next_delay = (int(next_delay) if (next_delay and int(next_delay) > 0) else 30)
    firstframe_time_ms = max(1, int(time.time() * 1000)
                             - (watch_start_ms or int(time.time() * 1000)))
    ended = False
    stopped_early = False              # True when the wall-clock budget cut us short

    # RUM (Elastic APM agent, bundle #234185 `flushInterval: 500`): the browser opens
    # one page-load transaction and one http-request transaction per XHR, then POSTs
    # whatever has queued up every 500ms. Mirror it with a queue + timed flush.
    rum_q = []
    rum_last = time.time()

    def rum_note(name, dur_ms, outcome="success"):
        rum_q.append(_rum_transaction("http-request", name, dur_ms, outcome=outcome))

    def rum_flush(force=False):
        nonlocal rum_last
        now = time.time()
        if rum_q and (force or (now - rum_last) * 1000.0 >= RUM_FLUSH_MS):
            _post_rum_step(session, list(rum_q), results, label="http-request")
            del rum_q[:]
            rum_last = now

    def fire_h5play(is_last, quit=None):
        pt = utc8_from_ms(int(time.time() * 1000))
        vd = int(round(hl_valid * 1000))             # DELTA since previous h5playlog
        t0 = time.time()
        _post_h5playlog_step(session, mid, oid, duration, "1", cur, pt,
                             is_last, results, sid=sid, first_cursor=first_cursor,
                             valid_play_duration_ms=vd, firstframe_time_ms=firstframe_time_ms,
                             quit_status=quit)
        rum_note("POST /ajax/log/h5playlog", (time.time() - t0) * 1000.0)

    def fire_read():
        # PC_real_read: the exposure service posts the dwell DELTA every
        # options.interval (default 5e3 = 5s; bundle #231174/#231188) and resets its
        # timers after each report, so read_duration is "since the last report",
        # NOT a cumulative position (it used to be sent as `playduration`).
        rd = int(round(rd_buf * 1000))
        t0 = time.time()
        _post_read_step(session, mid, rd, results, rid=rid, first_cursor=first_cursor)
        rum_note("POST /ajax/log/read", (time.time() - t0) * 1000.0)

    def fire_report(play_type):
        sec = int(min(cur, duration_s))
        t0 = time.time()
        out = _post_report_step(session, mid, oid, duration, str(play_type), sec,
                                results, first_cursor=first_cursor)
        rum_note("POST /multimedia.../play_history/report.json",
                 (time.time() - t0) * 1000.0)
        return out

    # Deadline-paced wall clock: sleep to the next tick boundary instead of taking a
    # fixed nap, so blocking IO (beacon POSTs, DASH chunks) does not stretch the real
    # tick period -- the JS loop keeps ticking at 250ms while XHRs run in parallel.
    next_tick = time.perf_counter() + real_sleep
    while cur < duration_s and not ended:
        cur = min(cur + TICK, duration_s)
        c = cur - last
        u = c if (0 < c < 0.6) else 0.0             # valid-play tick filter (<0.6s)
        last = cur
        hl_valid += u
        hl_buf += u
        ps_valid += u
        ps_buf += u
        # read dwell: NOT gated by the <0.6 valid-play filter -- the JS exposure
        # service only requires the card to stay visible (IntersectionObserver >= .3).
        rd_buf += TICK
        # DASH: fetch a chunk per tick (no-op once the file is fully fetched)
        for st in (streamers or []):
            if not st.done:
                st.next_chunk()
        # h5playlog: every >=30s of valid play (hardcoded, like PlayLog.timeBuffer>=30)
        if hl_buf >= 30 and cur < duration_s and not ended:
            fire_h5play(False)
            hl_valid = 0.0
            hl_buf = 0.0
        # report.json: every >=next_report_delay_seconds of valid play (server-driven)
        if ps_buf >= next_delay and next_delay and next_delay > 0 and cur < duration_s and not ended:
            nd = fire_report(1)
            if nd and int(nd) > 0:
                next_delay = int(nd)
            ps_valid = 0.0
            ps_buf = 0.0
        # read: its OWN 5s timer (it used to piggy-back h5playlog's 30s heartbeat)
        if rd_buf >= READ_INTERVAL_S and cur < duration_s and not ended:
            fire_read()
            rd_buf = 0.0
        rum_flush()
        # wall-clock budget: stop the video as soon as the real-time budget is gone
        if deadline is not None and time.time() >= deadline:
            stopped_early = True
            break
        if real_sleep > 0:
            now = time.perf_counter()
            remaining = next_tick - now
            if remaining > 0:
                time.sleep(remaining)
            next_tick = max(now, next_tick) + real_sleep
    # 'ended' (PlayLog.dispose): final heartbeat. quit_status is 'complete' when the
    # video really finished, 'not_complete' when the wall-clock budget cut it short.
    fire_h5play(True, quit=("not_complete" if stopped_early else "complete"))
    fire_read()                        # final dwell report (like handleBeforeUnload)
    fire_report(1)
    rum_flush(force=True)
    log.info("  [virtual player] ended cur=%.1fs (speed=%.1fx, next_report_delay=%ss)"
             % (cur, speed, next_delay))

    # finish downloading any remainder (so the full file is fetched like a real watch)
    for st in (streamers or []):
        st.drain()
        log.info("  [dash][%s] done: fetched=%d total=%s" % (st.label, st.fetched, st.total))


# --------------------------------------------------------------------------
# Optional LAGGED creator-center aggregate snapshot (pre/post)
# --------------------------------------------------------------------------
def snapshot_aggregates(tag):
    import read_video_aggregates as _ra
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    yest = _ra.fetch_yesterday(a)
    sev = _ra.fetch_7_30(a)
    snap = {"tag": tag, "fetched_at": datetime.now(timezone.utc).isoformat(),
            "yesterday": yest, "last_7d": sev.get("last_7d", {}),
            "last_30d": sev.get("last_30d", {})}
    path = os.path.join(WATCH_DIR, "simulated_watch_%s.json" % tag)
    with open(path, "w", encoding="utf-8") as f:
        _json.dump(snap, f, ensure_ascii=False, indent=2)
    return snap, path


def _val(snap, period, key):
    return (snap.get(period, {}).get(key, {}) or {}).get("value")


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(
        description="Simulated viewer-watch via waterfall page: fetch DASH bytes "
                    "(Range/206) + replay 4 playback beacons in browser order.")
    ap.add_argument("--uid", default=AUTHOR_UID, help="author uid (waterfall owner)")
    ap.add_argument("--days", type=int, default=30,
                    help="only videos published in the last N days (window)")
    ap.add_argument("--limit", type=int, default=0,
                    help="watch only the newest N videos in the window (0 = all)")
    ap.add_argument("--index", type=int, default=None,
                    help="watch only the Nth video in the window (0-based)")
    ap.add_argument("--mid", default=None,
                    help="watch only this single video mid (overrides --index/--limit)")
    ap.add_argument("--quality", default="dash_hd",
                    help="DASH video label to fetch (dash_hd/dash_720p)")
    ap.add_argument("--with-audio", action="store_true", default=True,
                    help="also fetch the dash_audio track (default: on)")
    ap.add_argument("--no-audio", dest="with_audio", action="store_false",
                    help="skip the dash_audio track")
    ap.add_argument("--chunk", type=int, default=524288,
                    help="bytes per Range GET (206 segment size)")
    ap.add_argument("--cadence", type=float, default=30,
                    help="DEPRECATED: no longer drives any beacon cadence "
                         "(h5playlog is hard-coded 30s of valid play per source, "
                         "report.json is server-driven). Only used to derive --speed "
                         "when --speed is unset. Use --speed instead.")
    ap.add_argument("--delay", type=float, default=30,
                    help="DEPRECATED: no longer paces anything (scheduling is "
                         "event-driven). Only used to derive --speed when --speed is "
                         "unset (speed = cadence/delay). Use --speed instead.")
    ap.add_argument("--speed", type=float, default=0,
                    help="virtual-playback speed multiplier (1.0 = faithful 1x; "
                         ">1 fast-forwards for tests). Overrides --delay/--cadence.")
    ap.add_argument("--rounds", type=int, default=1,
                    help="repeat the whole watch N times")
    ap.add_argument("--max-dur", type=float, default=0,
                    help="if set, only watch videos shorter than this (for --index pick)")
    ap.add_argument("--max-wall-time", dest="max_wall_time", type=parse_duration,
                    default=0,
                    help="REAL wall-clock limit on how long this run may take; the "
                         "process stops when it is used up. Accepts '90' (seconds when "
                         "bare), '300s', '20m', '1h' or a combination such as "
                         "'1h30m5s' (0 = no limit). The current video stops at once "
                         "(final heartbeat with quit_status='not_complete') and no "
                         "further video is played; the audit and summary still run.")
    ap.add_argument("--max-bytes", type=int, default=0,
                    help="cap DASH download per url (0 = whole file); used by --smoke")
    ap.add_argument("--with-aggregate", action="store_true",
                    help="snapshot LAGGED creator-center aggregates (pre + post)")
    ap.add_argument("--smoke", action="store_true",
                    help="short self-test: speed=10, max-bytes=2MB, rounds=1")
    ap.add_argument("--dry-run", action="store_true",
                    help="only print the plan, send nothing")
    args = ap.parse_args()

    if args.smoke:
        args.speed = 10.0          # fast-forward 10x (replaces old delay=1/cadence=10)
        args.max_bytes = 2_000_000
        args.rounds = 1

    sess = _viewer_session()
    setup_batch_log()  # single shared log file; merges beacon + dash loggers
    results = []
    t0 = time.time()

    # ---- 30-day window: REUSE beacon_engine.get_video_list (common module) ----
    log.info("=== 30-day window (reuse get_video_list, days=%d) ===", args.days)
    window, wsource = get_video_list(args.days)
    if args.limit and args.limit > 0:
        window = window[:args.limit]
    if args.mid:
        window = [v for v in window if v["mid"] == str(args.mid)]
    elif args.index is not None:
        if 0 <= args.index < len(window):
            window = [window[args.index]]
        else:
            log.warning("index %d out of range (window=%d); ignored", args.index, len(window))
    log.info("window: %d videos (source=%s)", len(window), wsource)
    for i, v in enumerate(window, 1):
        log.info("  #%02d mid=%s dur=%.0fs created=%s title=%s", i, v["mid"],
                 v.get("duration", 0), utc8_from_ms(v.get("create_time")) or "?",
                 (v.get("title") or "")[:60])

    if not window:
        log.warning("no videos in 30-day window; nothing to do.")
        return {"ok": 0, "fail": 0, "videos": 0}

    return run_watch(sess, window, args, results, t0)


def run_watch(session, window, args, results, t0):
    """Core simulated-watch orchestration shared by simulated_watch.main() and the
    targeted experiment script (simulated_watch_targeted.py). Re-fetches a fresh
    signed DASH URL per video (CDN URLs expire mid-run), fires the playback
    beacons in browser order, then audits and optionally snapshots the
    creator-center aggregates."""
    if not window:
        log.warning("no videos in window; nothing to do.")
        return {"ok": 0, "fail": 0, "videos": 0}

    want_mids = [v["mid"] for v in window]

    if args.dry_run:
        # Event-driven scheduling: the real wall time is the total virtual duration
        # divided by the speed multiplier (--delay/--cadence no longer pace anything).
        sp = float(getattr(args, "speed", 0) or 0) or (
            float(args.cadence or 30) / max(float(args.delay or 30), 0.1))
        if sp <= 0:
            sp = 1.0
        per_round = sum(float(v.get("duration") or 0) for v in window) / sp
        est = per_round * args.rounds
        log.info("DRY-RUN: %d videos x %d rounds; ~%.0fs wall/round (speed=%.1fx, "
                 "event-driven). no requests sent." % (len(window), args.rounds,
                 per_round, sp))
        log.info("  est TOTAL wall ~%.0fs (%.1f min)" % (est, est / 60.0))
        budget = float(getattr(args, "max_wall_time", 0) or 0)
        if budget > 0:
            log.info("  --max-wall-time %s is set: the run stops there and skips "
                     "the rest (%s would be needed)." % (format_duration(budget),
                                                         format_duration(est)))
        return {"dry_run": True, "videos": len(window), "rounds": args.rounds}

    if args.with_aggregate:
        pre_ag, pre_path = snapshot_aggregates("pre")
        log.info("  pre aggregate -> %s (LAGGED; re-read tomorrow)", pre_path)

    # Browser-faithful video metadata from the REAL endpoint (waterfall pagination),
    # built once; only used for oid/duration. The expiring CDN URL is re-fetched
    # fresh per video (see loop) because a full round spans hours (> URL ttl=3600s).
    wmap = get_media_map(session, args.uid, want_mids, args.days)
    # first_cursor = the FIRST video's mid in the author's video list (the page's
    # initial cursor), constant for the whole page. It is what the browser sends in
    # the Referer/reqHost as first_cursor=<firstVideoMid>&layerid=<mid>. Shared with
    # the replay_one driver via beacon_engine.first_cursor_of().
    first_cursor = first_cursor_of(wmap)

    ok = fail = 0
    watched_seconds = 0  # total duration of the videos actually watched
    # REAL wall-clock limit (--max-wall-time). 0 = unlimited. Once exhausted the
    # current video stops mid-way (not_complete) and no further video is played;
    # the audit + summary below still run.
    budget = float(getattr(args, "max_wall_time", 0) or 0)
    deadline = (t0 + budget) if budget > 0 else None
    if deadline:
        log.info("=== wall-clock budget: %s (%.0fs) ===",
                 format_duration(budget), budget)
    stopped = False
    for rnd in range(1, args.rounds + 1):
        if stopped:
            break
        log.info("=== round %d/%d ===", rnd, args.rounds)
        for vi, v in enumerate(window, 1):
            if deadline and time.time() >= deadline:
                log.info("=== budget reached: stop before video %d/%d (mid=%s) ===",
                         vi, len(window), v["mid"])
                stopped = True
                break
            base = wmap.get(v["mid"]) or {}
            mi = get_media_via_statuses(session, v["mid"])   # fresh signed DASH URL
            if not mi:
                mi = base.get("media_info") or {}          # fallback (may be expired)
            if not mi:
                log.warning("  skip (no media_info) mid=%s", v["mid"])
                fail += 1
                continue
            video = {"mid": v["mid"],
                     "oid": mi.get("object_id") or base.get("oid") or v.get("oid"),
                     "duration": int(mi.get("duration") or base.get("duration")
                                     or v.get("duration") or 0),
                     "media_info": mi,
                     "rid": base.get("rid"),  # real read-log id from waterfall
                     "title": v.get("title") or base.get("title") or "",
                     "actionlog_uuid": base.get("actionlog_uuid")}
            log.info("=== [WATCH] round %d/%d  video %d/%d  mid=%s  title=%s ===",
                     rnd, args.rounds, vi, len(window), v["mid"],
                     (video["title"] or "")[:80])
            g = watch_one(session, video, results, args, first_cursor,
                          deadline=deadline)
            if g is True:
                ok += 1
                watched_seconds += int(video["duration"] or 0)
            elif g is False:
                fail += 1

    # ---- audit ----
    # 2xx == success: RUM answers 202 Accepted and DASH answers 206 Partial
    # Content, so only a non-2xx status (or a recorded exception) is an anomaly.
    # (Comparing against 200 alone flagged every rum beacon -- pure noise.)
    errs = [r for r in results if r.get("error") or not _http_ok(r)]
    log.info("=== AUDIT: %d recorded calls, non-2xx or error: %d ===",
             len(results), len(errs))
    for r in errs[:20]:
        log.warning("  ! %s mid=%s sec=%s status=%s err=%s", r.get("endpoint"),
                    r.get("mid"), r.get("seconds"), r.get("status"), r.get("error"))

    if args.with_aggregate:
        time.sleep(2)
        post_ag, post_path = snapshot_aggregates("post")
        log.info("  post aggregate -> %s (LAGGED; re-read tomorrow)", post_path)
        log.info("=== DIFF (pre -> post, LAGGED aggregates) ===")
        for period in ("yesterday", "last_7d", "last_30d"):
            for k in ("play_count", "play_dura_count"):
                pv, pp = _val(pre_ag, period, k), _val(post_ag, period, k)
                try:
                    delta = float(pp) - float(pv)
                except (TypeError, ValueError):
                    delta = None
                log.info("  %-9s %-15s : %s -> %s  (delta %s)", period, k, pv, pp, delta)

    elapsed = time.time() - t0
    if stopped:
        planned = len(window) * args.rounds
        log.info("=== STOPPED EARLY: wall-clock budget %s exhausted; %d of %d "
                 "planned video-plays skipped ===", format_duration(budget),
                 planned - (ok + fail), planned)
    log.info("=== DONE videos=%d rounds=%d ok=%d fail=%d elapsed=%.1fs ===",
             len(window), args.rounds, ok, fail, elapsed)
    log.info("=== TIMING script_elapsed=%.1fs (%.1f min) | watched_video=%.0fs (%.1f min) ===",
             elapsed, elapsed / 60.0, watched_seconds, watched_seconds / 60.0)
    return {"videos": len(window), "rounds": args.rounds, "ok": ok, "fail": fail,
            "elapsed_seconds": round(elapsed, 2),
            "watched_seconds": int(watched_seconds)}


if __name__ == "__main__":
    main()
