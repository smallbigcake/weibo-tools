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
from logutil import setup as _setup_logging, share_handler
_setup_logging()
# Reuse the canonical beacon implementations from beacon_engine (single source of truth).
from beacon_engine import (  # noqa: E402
    _viewer_session, _post_report_step, _post_h5playlog_step,
    _post_playstatistics_step, _post_read_step, _post_action_step,
    _post_rum_step, _rum_transaction,
    build_sequence, beijing, get_video_list, UA, req_host_value,
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
    BATCH = datetime.now().strftime('%Y%m%d_%H%M%S')
    _fmt = logging.Formatter('%(asctime)s [%(levelname)s](%(filename)s#%(lineno)d): %(message)s')
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
# Waterfall source: obtain signed DASH playback URLs as the VIEWER
# --------------------------------------------------------------------------
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


def watch_one(session, video, results, args):
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
    play_time = beijing(int(time.time() * 1000))

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
    _post_action_step(session, "4288", "20000366",
                     "staruid:%s|loginuid:%s" % (AUTHOR_UID, VIEWER_UID), results)
    _post_action_step(session, "7165", "20000393",
                     "vuid:%s|welfare:0" % AUTHOR_UID, results)
    # CHANNEL 6 (RUM): one page-load transaction at session start (the browser's
    # first rum event), for client-session fidelity.
    _post_rum_step(session,
                   [_rum_transaction("page-load", "/u/:id", 1500)],
                   results, label="page-load")
    log.info("  [burst] report(pt=0,sec=0) + playstatistics + h5playlog(start)")
    _post_report_step(session, mid, oid, duration, "0", 0, results)
    _post_playstatistics_step(session, mid, media_id, results)
    _post_h5playlog_step(session, mid, oid, duration, "0", 0, play_time, False,
                         results, sid=sid)

    # ---- sequence of progress heartbeats, interleaved with DASH byte fetch ----
    seq = build_sequence(duration, args.cadence)
    # seq[0] already covered by the burst (pt=0, sec=0); iterate the rest.
    for i, (play_type, sec) in enumerate(seq[1:], start=1):
        # download one chunk from EACH DASH stream (video + audio) this tick
        for st in streamers:
            st.next_chunk()
        time.sleep(args.delay)
        is_last = (i == len(seq) - 1)
        _post_report_step(session, mid, oid, duration, play_type, sec, results)
        _post_h5playlog_step(session, mid, oid, duration, play_type, sec,
                             play_time, is_last, results, sid=sid)
        _post_read_step(session, mid, int(min(sec, duration) * 1000), results,
                        rid=rid)
        # CHANNEL 6 (RUM): one http-request transaction per heartbeat (summarizing
        # this tick's beacon round), mirroring the browser's per-XHR rum sends.
        _post_rum_step(session,
                       [_rum_transaction("http-request", "watch heartbeat %d" % i,
                                         int((args.delay or 1) * 1000) or 50,
                                         outcome="success")],
                       results, label="hb%d" % i)
        log.info("  [hb %d] sec=%d (%d/%d chunks fetched)", i, sec,
                 sum(s.fetched for s in streamers),
                 sum(s.total or 0 for s in streamers))

    # finish downloading any remainder (so the full file is fetched like a real watch)
    for st in streamers:
        st.drain()
        log.info("  [dash][%s] done: fetched=%d total=%s" % (st.label, st.fetched, st.total))
    return True


# --------------------------------------------------------------------------
# Optional LAGGED creator-center aggregate snapshot (pre/post)
# --------------------------------------------------------------------------
def snapshot_aggregates(tag):
    import read_backend_aggregate as _ra
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
                    help="reported seconds between heartbeats")
    ap.add_argument("--delay", type=float, default=30,
                    help="REAL seconds between heartbeats (30 = browser cadence)")
    ap.add_argument("--rounds", type=int, default=1,
                    help="repeat the whole watch N times")
    ap.add_argument("--max-dur", type=float, default=0,
                    help="if set, only watch videos shorter than this (for --index pick)")
    ap.add_argument("--max-bytes", type=int, default=0,
                    help="cap DASH download per url (0 = whole file); used by --smoke")
    ap.add_argument("--with-aggregate", action="store_true",
                    help="snapshot LAGGED creator-center aggregates (pre + post)")
    ap.add_argument("--smoke", action="store_true",
                    help="short self-test: delay=1, cadence=10, max-bytes=2MB, rounds=1")
    ap.add_argument("--dry-run", action="store_true",
                    help="only print the plan, send nothing")
    args = ap.parse_args()

    if args.smoke:
        args.delay = 1.0
        args.cadence = 10
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
                 v.get("duration", 0), beijing(v.get("create_time")),
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
        per_round = 0.0
        for v in window:
            seq = build_sequence(v.get("duration") or 0, args.cadence)
            per_round += len(seq) * args.delay
        est = per_round * args.rounds
        log.info("DRY-RUN: %d videos x %d rounds; ~%.0fs wall/round (cadence=%.0fs, "
                 "delay=%.1fs). no requests sent." % (len(window), args.rounds,
                 per_round, args.cadence, args.delay))
        log.info("  est TOTAL wall ~%.0fs (%.1f min)" % (est, est / 60.0))
        return {"dry_run": True, "videos": len(window), "rounds": args.rounds}

    if args.with_aggregate:
        pre_ag, pre_path = snapshot_aggregates("pre")
        log.info("  pre aggregate -> %s (LAGGED; re-read tomorrow)", pre_path)

    # Browser-faithful video metadata from the REAL endpoint (waterfall pagination),
    # built once; only used for oid/duration. The expiring CDN URL is re-fetched
    # fresh per video (see loop) because a full round spans hours (> URL ttl=3600s).
    wmap = get_media_map(session, args.uid, want_mids, args.days)

    ok = fail = 0
    watched_seconds = 0  # total duration of the videos actually watched
    for rnd in range(1, args.rounds + 1):
        log.info("=== round %d/%d ===", rnd, args.rounds)
        for vi, v in enumerate(window, 1):
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
                     "title": v.get("title") or base.get("title") or ""}
            log.info("=== [WATCH] round %d/%d  video %d/%d  mid=%s  title=%s ===",
                     rnd, args.rounds, vi, len(window), v["mid"],
                     (video["title"] or "")[:80])
            g = watch_one(session, video, results, args)
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
    log.info("=== DONE videos=%d rounds=%d ok=%d fail=%d elapsed=%.1fs ===",
             len(window), args.rounds, ok, fail, elapsed)
    log.info("=== TIMING script_elapsed=%.1fs (%.1f min) | watched_video=%.0fs (%.1f min) ===",
             elapsed, elapsed / 60.0, watched_seconds, watched_seconds / 60.0)
    return {"videos": len(window), "rounds": args.rounds, "ok": ok, "fail": fail,
            "elapsed_seconds": round(elapsed, 2),
            "watched_seconds": int(watched_seconds)}


if __name__ == "__main__":
    main()
