"""Quick-watch experiment: replay realistic playback beacons on author videos
via play_history/report.json, and MEASURE total wall-clock time.

==========================================================================
Method: "FastWatch"  -- a single playback-heartbeat replay whose PACE is set by --delay
--------------------------------------------------------------------------
For each video the FULL beacon sequence is emitted (the default):

    play_type=0  seconds=0             start of the playback session
    play_type=1  seconds=cadence       progress heartbeat
    play_type=1  seconds=2*cadence     ...
    play_type=1  seconds=<duration>    end of playback

The reported `seconds` (the playback position) are ALWAYS driven by --cadence
(default 30), so the BEACON CONTENT is identical regardless of pace. Only the
wall-clock spacing between POSTs changes:

  * --delay 1.0   (the old "FastWatch-1s"): compress a whole watch into ~duration/30 s
  * --delay 30.0  (the old "FastWatch-30s"): replay at the server's real reporting
                   cadence (next_report_delay_seconds=30) -- a faithful 1x real-time view

The two are ONE method paced two ways; the separate quick_watch_recent_30s.py
has been deleted as redundant. The run's `method` label below is derived from
--delay so 1s vs 30s runs stay distinguishable in the logs.

--cadence C (default 30) is the step, in *reported* seconds, between progress
heartbeats, so a smaller cadence emits more beacons per video.

==========================================================================
Algorithm (per the agreed experiment)
--------------------------------------------------------------------------
    videos = author videos published in last `days` days (default 30), fetched
             LIVE at run time via the creator-center getVideoList (AUTHOR_UID
             session); falls back to the static src/data/author_videos.json
             snapshot if the author session is unavailable.
    for round in range(rounds):            # OUTER loop (default 10)
        for v in videos:                    # INNER loop: play each sequentially
            FastWatch(v)

No active rate-limiting / back-off is applied -- every beacon's HTTP status is
logged (file + console) together with its round/video context and reported
`seconds` progress, so any server-side throttling surfaces in the log. The
resolved video list is logged before playback starts. Total elapsed time is
logged at the end (and the full run is saved as JSON to
src/data/watch/quick_watch_log*.jsonl, archived by time under
src/data/watch/archive/).

All numbers are CLI-configurable (see --help).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/quick_watch_recent.py \
      [--days 30] [--rounds 10] [--delay 1.0] [--cadence 30] \
      [--repeat 1] [--dry-run]
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
import json
import os
import shutil
import sys
import time
from datetime import datetime, timezone, timedelta
from urllib.parse import urlencode

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from logutil import setup as _setup_logging
_setup_logging()  # idempotent; configures the shared weibo.log for other modules
import logging

# Dedicated logger for THIS script: its python/HTTP logs go to a SEPARATE, DAILY
# file (src/log/quick_watch_YYYYMMDD.log) inside the same log dir, so they don't
# mix with the shared weibo.log used by other generic modules. A fresh file is
# opened per calendar day and is UNBOUNDED (no rotation) -- the user explicitly
# does not care about size, and we dump the FULL request/response headers+body of
# every HTTP call into it. propagate=False => not forwarded to the root handlers
# (weibo.log / console from the shared config).
#
# Level split: the logger accepts everything (DEBUG). The FILE handler is DEBUG so
# it captures the verbose per-request dumps; the CONSOLE handler is INFO so the
# terminal is not flooded with huge response bodies -- those live in the file.
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


# Header names whose VALUES must never be written to disk in cleartext: they are
# live session secrets / tokens. We still log the header KEY (so the request shape
# is debuggable) but mask the value. See security rules: secrets/tokens must not
# be exposed. The daily log is git-ignored, but it still sits on disk in plaintext.
_SENSITIVE_HEADERS = {'cookie', 'authorization', 'x-xsrf-token', 'xsrf-token',
                      'set-cookie', 'proxy-authorization'}


def _redact_headers(headers):
    """Return a copy of `headers` with sensitive values masked as '<redacted>'."""
    out = {}
    try:
        items = headers.items()
    except Exception:
        return dict(headers) if headers is not None else {}
    for k, v in items:
        if str(k).lower() in _SENSITIVE_HEADERS:
            out[k] = '<redacted>'
        else:
            out[k] = v
    return out


def _log_http(r, label):
    """Dump the FULL request + response (status, headers, body) of one HTTP call
    to the quick_watch logger. Called for EVERY beacon POST -- not just failures
    -- so the daily log (src/log/quick_watch_YYYYMMDD.log) is a complete
    transcript separate from the shared weibo.log. The verbose lines are emitted
    at DEBUG so they land in the file only (the console handler is INFO); the
    body is never truncated. Sensitive header values (Cookie, Authorization,
    XSRF-TOKEN, Set-Cookie, ...) are masked to avoid leaking live session tokens."""
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
    """Append-only per-day history of every watch run.

    Each run is written as one self-contained JSON object per line into
    ``quick_watch_log_YYYYMMDD.jsonl`` (UTC day), so no run's detailed beacon
    log is ever overwritten. This is the file to open for retrospective review
    (复盘) of a given day -- ``quick_watch_log.json`` only keeps the latest run.
    """
    day = datetime.now(timezone.utc).strftime("%Y%m%d")
    return os.path.join(WATCH_DIR, "quick_watch_log_%s.jsonl" % day)
def _archive_current_log():
    """Copy the existing LOG_PATH snapshot to WATCH_DIR/archive/quick_watch_log_<UTC-stamp>.json
    BEFORE it gets overwritten, so each run's record is preserved (the live file is
    overwritten every run). The stamp comes from the previous run's generated_at so
    the archive name reflects when that run actually happened. Returns the archive
    path, or None if there was nothing to archive.
    """
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
    # Avoid clobbering if two runs share the same second-stamp.
    if os.path.exists(dst):
        dst = os.path.join(archive_dir,
                           "quick_watch_log_%s.%d.json" % (stamp, int(time.time())))
    shutil.copy2(LOG_PATH, dst)
    return dst


REPORT_URL = ("https://multimedia.api.weibo.com/2/multimedia/user/"
              "play_history/report.json")
SOURCE = "339644097"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
# Creator-center endpoint used to fetch the author's video list LIVE at run time
# (replaces reading the static src/data/author_videos.json snapshot).
VIDEO_LIST_URL = "https://weibo.com/ajax/multimedia/getVideoList"
PAGE_DELAY = 1.0
END_CURSORS = {"", "0", "-1"}

def method_label(delay):
    """Derive the run's method label from the beacon POST spacing (--delay).

    One beacon method paced two ways: --delay 1.0 -> 'FastWatch-1s' (compressed),
    --delay 30.0 -> 'FastWatch-30s' (real-time replay). The label lives only in
    logs/records so 1s vs 30s runs stay distinguishable; the beacon CONTENT is
    identical either way (it is driven by --cadence).
    """
    return "FastWatch-%.0fs" % delay


def beijing(ts_ms):
    """Format a millisecond timestamp as a Beijing-time (UTC+8) string."""
    if not ts_ms:
        return "?"
    dt = datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc) + timedelta(hours=8)
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def fetch_window(days, sess):
    """Live-fetch author videos published in the last `days` days via the
    creator-center getVideoList endpoint (AUTHOR_UID session), newest-first.

    Differs from load_window() in that it hits the API at run time instead of
    reading the static src/data/author_videos.json snapshot. Pagination stops
    as soon as a whole page is older than the cutoff window. Raises on any
    transport/HTTP error so the caller can decide to fall back to the cache.
    """
    cutoff = (time.time() - days * 86400) * 1000
    items, seen = [], set()
    cursor = "0"
    while True:
        r = sess.get(VIDEO_LIST_URL,
                     params={"cursor": cursor, "count": "20", "status": "0"},
                     headers={"User-Agent": UA,
                              "Referer": "https://weibo.com/creator"},
                     timeout=20000)
        if r.status_code != 200:
            raise RuntimeError("getVideoList HTTP %s: %s"
                               % (r.status_code, r.text[:200]))
        d = r.json().get("data") or {}
        videos = d.get("videos") or []
        if not videos:
            break
        for it in videos:
            key = str(it.get("mid_str") or it.get("mid"))
            if key in seen:
                continue
            seen.add(key)
            if it.get("create_time") and it["create_time"] >= cutoff:
                items.append(it)
        if all((it.get("create_time", 0) < cutoff) for it in videos):
            break
        cursor = str(d.get("next_cursor") or "")
        if cursor in END_CURSORS:
            break
        time.sleep(PAGE_DELAY)
    items.sort(key=lambda v: v.get("create_time", 0), reverse=True)
    return items


def acquire_video_list(days):
    """Return (videos, source). `source` is 'live' when fetched from the API at
    run time, or 'cache' when we fell back to src/data/author_videos.json (author
    session unavailable or live fetch failed). The fallback keeps the daily
    automation working even if the author cookie has expired.
    """
    try:
        fa = Auth()
        fa.uid = AUTHOR_UID
        fa.load()
    except Exception as e:
        log.warning("author session load failed (%s); using cached list", e)
        return load_window(days), "cache"
    if fa.test_login() or fa.renew():
        try:
            items = fetch_window(days, fa.session)
            log.info("live video list fetched: %d videos in last %d d",
                     len(items), days)
            return items, "live"
        except Exception as e:
            log.warning("live video-list fetch failed (%s); falling back to "
                        "cached list", e)
    else:
        log.warning("author session not available; using cached video list")
    return load_window(days), "cache"


def log_video_list(videos, days, source):
    """Emit the resolved watch list to the log (file + console) so the run
    record shows exactly which videos were in scope this run."""
    log.info("===== video list (last %d d, source=%s): %d videos =====",
             days, source, len(videos))
    for i, v in enumerate(videos, 1):
        title = (((v.get("titles") or [{}])[0].get("title", "")[:40])
                 if v.get("titles") else "")
        mid = v.get("mid_str") or v.get("mid")
        log.info("  #%02d  mid=%s  dur=%.0fs  created=%s  %s",
                 i, mid, v.get("duration", 0), beijing(v.get("create_time")), title)


def load_window(days):
    """Return author videos published within the last `days` days, newest first
    (from the static src/data/author_videos.json snapshot; used as a fallback
    when the live API fetch is unavailable)."""
    with open(VIDEO_DATA, encoding="utf-8") as f:
        data = json.load(f)
    cutoff = (time.time() - days * 86400) * 1000
    out = [v for v in data.get("videos", [])
           if v.get("create_time") and v["create_time"] >= cutoff]
    out.sort(key=lambda v: v.get("create_time", 0), reverse=True)
    return out


def build_sequence(duration, cadence):
    """Return list of (play_type, seconds) heartbeats for one full watch.

    Emits start(0), a progress heartbeat every `cadence` reported seconds, and
    always a final end-of-playback heartbeat at the full duration. (The compact
    start+end-only variant was removed.)

    `seconds` is NEVER reported above `duration` (server flags that anomalous).
    """
    full = int(round(duration or 0))
    if full <= 0:
        return []
    seq = [("0", 0)]
    step = int(cadence)
    # step <= 0 would loop forever; treat it as "no progress heartbeats".
    if step > 0:
        t = step
        while t < full:
            seq.append(("1", t))
            t += step
    # Always close the session at the real end position. (Previously this was
    # skipped whenever `full` was an exact multiple of `cadence`, so the watch
    # never reported reaching the end.)
    if seq[-1][1] != full:
        seq.append(("1", full))
    return seq


def send_sequence(session, mid, oid, duration, seq, delay=0.3, ctx=None):
    """POST every heartbeat. Returns list of per-send result dicts.

    `ctx` (e.g. "R1#3") is prepended to the per-beacon log line so the file/console
    log shows which round/video each heartbeat (and its reported `seconds` progress)
    belongs to.
    """
    results = []
    tag = ("[%s] " % ctx) if ctx else ""
    for play_type, sec in seq:
        params = {
            "source": SOURCE,
            "play_type": play_type,
            "video_orientation": "horizontal",
            "video_duration": str(int(round(duration or 0))),
            "id": str(mid),
            "id_type": "0",
            "oid": oid,
            "is_contribution": "0",
            "reqHost": "https://weibo.com/%s/%s" % (AUTHOR_UID, mid),
            "seconds": str(sec),
        }
        url = REPORT_URL + "?" + urlencode(params)
        try:
            r = session.post(url,
                             headers={"User-Agent": UA,
                                      "Referer": "https://weibo.com/"},
                             timeout=20000)
            results.append({"play_type": play_type, "seconds": sec,
                            "http": r.status_code, "body": r.text[:200]})
            log.info("%sbeacon POST mid=%s -> %s (play_type=%s seconds=%s)"
                     % (tag, mid, r.status_code, play_type, sec))
            _log_http(r, 'beacon report')
        except Exception as ex:
            results.append({"play_type": play_type, "seconds": sec,
                            "http": None, "error": str(ex)})
            log.warning("%sbeacon POST mid=%s -> ERROR %s (play_type=%s seconds=%s)"
                        % (tag, mid, ex, play_type, sec))
        time.sleep(delay)
    return results


def main():
    ap = argparse.ArgumentParser(
        description="FastWatch playback experiment (pace set by --delay; measure total time)")
    ap.add_argument("--days", type=int, default=30,
                    help="only videos published in the last N days (inner loop)")
    ap.add_argument("--rounds", type=int, default=10,
                    help="OUTER loop count: repeat the whole inner process N times")
    ap.add_argument("--delay", type=float, default=1.0,
                    help="seconds between beacon POSTs / videos (the '1s' in FastWatch-1s)")
    ap.add_argument("--cadence", type=float, default=30,
                    help="step, in reported seconds, between progress heartbeats "
                         "(default 30)")
    ap.add_argument("--repeat", type=int, default=1,
                    help="repeat the beacon sequence this many times per video")
    ap.add_argument("--dry-run", action="store_true",
                    help="only count videos/requests, send nothing")
    ap.add_argument("--use-cached-list", action="store_true",
                    help="skip the live API fetch and reuse the static "
                         "src/data/author_videos.json snapshot")
    ap.add_argument("--limit", type=int, default=0,
                    help="watch only the newest N videos in the window "
                         "(default 0 = all)")
    args = ap.parse_args()
    method = method_label(args.delay)
    if args.use_cached_list:
        videos, list_source = load_window(args.days), "cache"
        log.info("using cached video list (--use-cached-list)")
    else:
        videos, list_source = acquire_video_list(args.days)
    if args.limit and args.limit > 0:
        log.info("limiting to newest %d video(s) of %d", args.limit, len(videos))
        videos = videos[:args.limit]
    log_video_list(videos, args.days, list_source)
    mode = "full(cadence=%ss)" % args.cadence
    log.info("method=%s  list_source=%s  videos(last %d d)=%d  rounds=%d  "
             "delay=%.2fs  mode=%s",
             method, list_source, args.days, len(videos),
             args.rounds, args.delay, mode)
    if not videos:
        log.warning("no videos in window; nothing to do.")
        return {"method": method, "list_source": list_source, "ok": 0, "fail": 0,
                "total_videos_played": 0, "elapsed_seconds": 0.0,
                "videos_in_window": 0, "dry_run": args.dry_run}

    # ----- dry run: just count -----
    if args.dry_run:
        total_req = 0
        for i, v in enumerate(videos, 1):
            full = int(round(v.get("duration") or 0))
            seq = build_sequence(v.get("duration"), args.cadence)
            total_req += len(seq) * args.repeat
            t = datetime.fromtimestamp(v["create_time"] / 1000,
                                       tz=timezone.utc).strftime("%Y-%m-%d")
            log.info("  #%d  %s  dur=%.0fs  heartbeats=%d  mid=%s"
                     % (i, t, v.get("duration", 0), len(seq),
                        v.get("mid_str") or v.get("mid")))
        est_videos = len(videos) * args.rounds
        est_req = total_req * args.rounds
        est_watch = sum(int(round(v.get("duration") or 0))
                        for v in videos) * args.rounds * args.repeat
        log.info("DRY-RUN: %d videos/round x %d rounds = %d video-plays; "
                 "~%d total beacon POSTs. no requests sent."
                 % (len(videos), args.rounds, est_videos, est_req))
        log.info("  est. total watch time claimed = %.0fs (%.1f min / %.2f h)"
                 % (est_watch, est_watch / 60.0, est_watch / 3600.0))
        # No beacons are sent in dry-run, so ok/fail are undefined (None); the
        # counts below let the runner's summary line still be meaningful.
        return {"method": method, "dry_run": True, "list_source": list_source,
                "videos_in_window": len(videos),
                "est_video_plays": est_videos, "est_beacon_posts": est_req,
                "est_watch_seconds": est_watch,
                "ok": None, "fail": None, "total_videos_played": None,
                "elapsed_seconds": None}

    # ----- real run -----
    a = Auth()
    a.uid = VIEWER_UID
    a.load()

    # Fail fast on an unauthenticated session instead of spraying hundreds of
    # doomed 401 beacons. renew() replays the silent SSO chain; if even that
    # fails (retcode=6102: long-lived viewer credential spent) the only remedy is
    # a QR re-login, so we abort here with a clear message.
    if not a.test_login():
        log.warning("session NOT logged in; attempting silent SSO renew...")
        if not a.renew():
            log.error("FATAL: viewer session could not be restored. The "
                      "long-lived credential is spent (SSO retcode=6102). Run "
                      "`venvs/weibo-env/Scripts/python.exe src/auth.py --user "
                      "<viewer_label>` to re-login (refresh the credential), "
                      "then retry. Aborting to avoid 401 spam.")
            return {"method": method, "list_source": list_source, "ok": 0,
                    "fail": 0, "total_videos_played": 0, "elapsed_seconds": 0.0,
                    "videos_in_window": len(videos),
                    "error": "not_logged_in", "dry_run": False}
        a.save_cookies()

    sess = a.session

    t0 = time.time()
    all_log = []
    ok = fail = 0
    total_watch_seconds = 0.0   # cumulative claimed watch time across all plays

    for rnd in range(1, args.rounds + 1):
        rt0 = time.time()
        round_log = []
        for idx, v in enumerate(videos, 1):
            mid = v.get("mid_str") or v.get("mid")
            oid = v.get("oid")
            dur = v.get("duration")
            if not mid or not oid or not dur:
                log.warning("  [R%d #%d] skip (missing mid/oid/duration): %s",
                            rnd, idx, mid)
                continue
            full = int(round(dur))
            seq = build_sequence(dur, args.cadence)
            title = (((v.get("titles") or [{}])[0].get("title", "")[:30])
                     if v.get("titles") else "")
            ctx = "R%d#%d" % (rnd, idx)
            log.info("[%s] START mid=%s dur=%.0fs hb=%d title=%s",
                     ctx, mid, dur, len(seq), title)
            entry = {"round": rnd, "mid": mid, "oid": oid, "duration": dur,
                     "seconds_reported": full, "mode": mode,
                     "heartbeats": len(seq), "title": title, "sends": []}
            for _ in range(args.repeat):
                res = send_sequence(sess, mid, oid, dur, seq, args.delay, ctx=ctx)
                entry["sends"].append(res)
                if all(s.get("http") == 200 for s in res):
                    ok += 1
                else:
                    fail += 1
                    # surface server-side throttling details instead of guessing
                    for s in res:
                        if s.get("http") not in (200, None) or s.get("error"):
                            log.warning("    ! [%s] http=%s body=%s",
                                        ctx, s.get("http"), s.get("body"))
                # Each play claims the full video duration as watch time.
                total_watch_seconds += full
            entry["sent_at"] = datetime.now(timezone.utc).isoformat()
            round_log.append(entry)
            last = entry["sends"][-1]
            log.info("[%s] DONE mid=%s http=%s",
                     ctx, mid, [s["http"] for s in last])
        rt1 = time.time()
        log.info("=== round %d done: %d videos, %.1fs ===",
                 rnd, len(videos), rt1 - rt0)
        all_log.extend(round_log)

    t1 = time.time()
    elapsed = t1 - t0
    # Build the full run record once (details of every beacon live in ``entries``).
    run_record = {
        "method": method,
        "list_source": list_source,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "days": args.days, "rounds": args.rounds, "delay": args.delay,
        "mode": mode, "cadence": args.cadence, "repeat": args.repeat,
        "total_videos_played": len(all_log),
        "elapsed_seconds": round(elapsed, 2),
        "total_watch_seconds": round(total_watch_seconds, 2),
        "ok": ok, "fail": fail,
        "entries": all_log,
    }
    # Archive the previous snapshot by time BEFORE overwriting, so history is kept
    # under WATCH_DIR/archive/ instead of being lost on each run.
    archived = _archive_current_log()
    if archived:
        log.info("archived previous snapshot -> %s" % archived)
    # Latest snapshot (overwritten each run; convenient for quick inspection).
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(run_record, f, ensure_ascii=False, indent=2)
    # Append-only daily history: every run fully retained for retrospective review.
    day_path = _daily_log_path()
    with open(day_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(run_record, ensure_ascii=False) + "\n")

    log.info("\n=== ALL DONE ===")
    log.info("  method=%s  list_source=%s  rounds=%d  mode=%s",
             method, list_source, args.rounds, mode)
    log.info("  total elapsed = %.1fs (%.2f min)" % (elapsed, elapsed / 60.0))
    log.info("  video-plays=%d  ok=%d  fail=%d" % (len(all_log), ok, fail))
    log.info("  total watch time claimed = %.0fs (%.1f min / %.2f h)"
             % (total_watch_seconds, total_watch_seconds / 60.0,
                total_watch_seconds / 3600.0))
    log.info("  latest log -> %s" % LOG_PATH)
    log.info("  daily history -> %s" % day_path)

    # Return a summary so callers (e.g. the daily runner) don't have to re-read
    # the on-disk log (which would be stale if a prior run failed to write it).
    return {
        "method": method, "dry_run": False,
        "list_source": list_source,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "days": args.days, "rounds": args.rounds, "delay": args.delay,
        "mode": mode, "cadence": args.cadence, "repeat": args.repeat,
        "total_videos_played": len(all_log),
        "elapsed_seconds": round(elapsed, 2),
        "total_watch_seconds": round(total_watch_seconds, 2),
        "ok": ok, "fail": fail,
    }


if __name__ == "__main__":
    main()
