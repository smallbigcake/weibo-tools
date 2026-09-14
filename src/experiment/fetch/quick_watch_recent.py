"""Quick-watch experiment: replay realistic playback beacons on author videos
via play_history/report.json, and MEASURE total wall-clock time.

==========================================================================
Method: "FastWatch-1s"  (1秒快速上报法)
--------------------------------------------------------------------------
For each video the FULL beacon sequence is emitted (the default):

    play_type=0  seconds=0             start of the playback session
    play_type=1  seconds=cadence       progress heartbeat
    play_type=1  seconds=2*cadence     ...
    play_type=1  seconds=<duration>    end of playback

That is the same shape the real web player produces, but every beacon is
spaced by --delay (default 1.0s) instead of the server-driven reporting
cadence -- hence "1s 快速上报" (1-second fast report).

--cadence C (default 30) is the step, in *reported* seconds, between progress
heartbeats, so a smaller cadence emits more beacons per video.

Pass --no-ticks to fall back to the compact 2-beacon form (start + end only),
which reports a whole view in two requests but is far less faithful.

==========================================================================
Algorithm (per the agreed experiment)
--------------------------------------------------------------------------
    for round in range(rounds):            # OUTER loop (default 10)
        videos = author videos published in last `days` days (default 30)
        for v in videos:                    # INNER loop: play each sequentially
            FastWatch-1s(v)

No active rate-limiting / back-off is applied -- we ONLY log the HTTP status
of every beacon so that any server-side throttling surfaces in the output.
Total elapsed time is printed at the end (and saved to the log).

All numbers are CLI-configurable (see --help).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/quick_watch_recent.py \
      [--days 30] [--rounds 10] [--delay 1.0] [--cadence 30] [--no-ticks] \
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
import sys
import time
from datetime import datetime, timezone
from urllib.parse import urlencode

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEO_DATA = os.path.join(SRC_DIR, "data", "author_videos.json")
LOG_PATH = os.path.join(SRC_DIR, "data", "quick_watch_log.json")
REPORT_URL = ("https://multimedia.api.weibo.com/2/multimedia/user/"
              "play_history/report.json")
SOURCE = "339644097"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# Stable handle for the method used by this experiment.
METHOD = "FastWatch-1s"   # 1秒快速上报法


def load_window(days):
    """Return author videos published within the last `days` days, newest first."""
    with open(VIDEO_DATA, encoding="utf-8") as f:
        data = json.load(f)
    cutoff = (time.time() - days * 86400) * 1000
    out = [v for v in data.get("videos", [])
           if v.get("create_time") and v["create_time"] >= cutoff]
    out.sort(key=lambda v: v.get("create_time", 0), reverse=True)
    return out


def build_sequence(duration, ticks, cadence):
    """Return list of (play_type, seconds) heartbeats for one full watch.

    Ticks mode (ticks=True, the default): start(0), a progress heartbeat every
    `cadence` reported seconds, and always a final end-of-playback heartbeat at
    the full duration. Compact mode (ticks=False): start(0) + end(full) only.

    `seconds` is NEVER reported above `duration` (server flags that anomalous).
    """
    full = int(round(duration or 0))
    if full <= 0:
        return []
    seq = [("0", 0)]
    if ticks:
        step = int(cadence)
        # step <= 0 would loop forever; treat it as "no progress heartbeats".
        if step > 0:
            t = step
            while t < full:
                seq.append(("1", t))
                t += step
        # Always close the session at the real end position. (Previously this
        # was skipped whenever `full` was an exact multiple of `cadence`, so the
        # watch never reported reaching the end.)
        if seq[-1][1] != full:
            seq.append(("1", full))
    else:
        seq.append(("1", full))
    return seq


def send_sequence(session, mid, oid, duration, seq, delay=0.3):
    """POST every heartbeat. Returns list of per-send result dicts."""
    results = []
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
        try:
            r = session.post(REPORT_URL + "?" + urlencode(params),
                             headers={"User-Agent": UA,
                                      "Referer": "https://weibo.com/"},
                             timeout=20000)
            results.append({"play_type": play_type, "seconds": sec,
                            "http": r.status_code, "body": r.text[:200]})
        except Exception as ex:
            results.append({"play_type": play_type, "seconds": sec,
                            "http": None, "error": str(ex)})
        time.sleep(delay)
    return results


def main():
    ap = argparse.ArgumentParser(
        description="FastWatch-1s playback experiment (measure total time)")
    ap.add_argument("--days", type=int, default=30,
                    help="only videos published in the last N days (inner loop)")
    ap.add_argument("--rounds", type=int, default=10,
                    help="OUTER loop count: repeat the whole inner process N times")
    ap.add_argument("--delay", type=float, default=1.0,
                    help="seconds between beacon POSTs / videos (the '1s' in FastWatch-1s)")
    ap.add_argument("--cadence", type=float, default=30,
                    help="step, in reported seconds, between progress heartbeats "
                         "(ticks mode; default 30)")
    ap.add_argument("--ticks", dest="ticks", action="store_true", default=True,
                    help="emit the FULL heartbeat sequence (DEFAULT): start, a "
                         "progress heartbeat every --cadence seconds, and the end")
    ap.add_argument("--no-ticks", dest="ticks", action="store_false",
                    help="compact mode: only a start and an end beacon per video")
    ap.add_argument("--repeat", type=int, default=1,
                    help="repeat the beacon sequence this many times per video")
    ap.add_argument("--dry-run", action="store_true",
                    help="only count videos/requests, send nothing")
    args = ap.parse_args()

    videos = load_window(args.days)
    mode = ("ticks(cadence=%ss)" % args.cadence) if args.ticks else "single(full)"
    print("method=%s  videos(last %d d)=%d  rounds=%d  delay=%.2fs  mode=%s"
          % (METHOD, args.days, len(videos), args.rounds, args.delay, mode))
    if not videos:
        print("no videos in window; nothing to do.")
        return {"method": METHOD, "ok": 0, "fail": 0,
                "total_videos_played": 0, "elapsed_seconds": 0.0,
                "videos_in_window": 0, "dry_run": args.dry_run}

    # ----- dry run: just count -----
    if args.dry_run:
        total_req = 0
        for i, v in enumerate(videos, 1):
            full = int(round(v.get("duration") or 0))
            seq = build_sequence(v.get("duration"), args.ticks, args.cadence)
            total_req += len(seq) * args.repeat
            t = datetime.fromtimestamp(v["create_time"] / 1000,
                                       tz=timezone.utc).strftime("%Y-%m-%d")
            print("  #%d  %s  dur=%.0fs  heartbeats=%d  mid=%s"
                  % (i, t, v.get("duration", 0), len(seq),
                     v.get("mid_str") or v.get("mid")))
        est_videos = len(videos) * args.rounds
        est_req = total_req * args.rounds
        print("DRY-RUN: %d videos/round x %d rounds = %d video-plays; "
              "~%d total beacon POSTs. no requests sent."
              % (len(videos), args.rounds, est_videos, est_req))
        # No beacons are sent in dry-run, so ok/fail are undefined (None); the
        # counts below let the runner's summary line still be meaningful.
        return {"method": METHOD, "dry_run": True,
                "videos_in_window": len(videos),
                "est_video_plays": est_videos, "est_beacon_posts": est_req,
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
        print("session NOT logged in; attempting silent SSO renew...", flush=True)
        if not a.renew():
            print("FATAL: viewer session could not be restored. The long-lived "
                  "credential is spent (SSO retcode=6102). Run "
                  "`venvs/weibo-env/Scripts/python.exe src/auth.py --user <viewer_label>` "
                  "to re-login (refresh the credential), then retry. "
                  "Aborting to avoid 401 spam.", flush=True)
            return {"method": METHOD, "ok": 0, "fail": 0,
                    "total_videos_played": 0, "elapsed_seconds": 0.0,
                    "videos_in_window": len(videos),
                    "error": "not_logged_in", "dry_run": False}
        a.save_cookies()

    sess = a.session

    t0 = time.time()
    all_log = []
    ok = fail = 0

    for rnd in range(1, args.rounds + 1):
        rt0 = time.time()
        round_log = []
        for idx, v in enumerate(videos, 1):
            mid = v.get("mid_str") or v.get("mid")
            oid = v.get("oid")
            dur = v.get("duration")
            if not mid or not oid or not dur:
                print("  [R%d #%d] skip (missing mid/oid/duration): %s"
                      % (rnd, idx, mid))
                continue
            full = int(round(dur))
            seq = build_sequence(dur, args.ticks, args.cadence)
            title = (((v.get("titles") or [{}])[0].get("title", "")[:30])
                     if v.get("titles") else "")
            entry = {"round": rnd, "mid": mid, "oid": oid, "duration": dur,
                     "seconds_reported": full, "mode": mode,
                     "heartbeats": len(seq), "title": title, "sends": []}
            for _ in range(args.repeat):
                res = send_sequence(sess, mid, oid, dur, seq, args.delay)
                entry["sends"].append(res)
                if all(s.get("http") == 200 for s in res):
                    ok += 1
                else:
                    fail += 1
                    # surface server-side throttling details instead of guessing
                    for s in res:
                        if s.get("http") not in (200, None) or s.get("error"):
                            print("    ! http=%s body=%s"
                                  % (s.get("http"), s.get("body")))
            entry["sent_at"] = datetime.now(timezone.utc).isoformat()
            round_log.append(entry)
            last = entry["sends"][-1]
            print("  [R%d #%d] mid=%s dur=%.0fs hb=%d http=%s %s"
                  % (rnd, idx, mid, dur, len(seq),
                     [s["http"] for s in last], title))
        rt1 = time.time()
        print("=== round %d done: %d videos, %.1fs ==="
              % (rnd, len(videos), rt1 - rt0))
        all_log.extend(round_log)

    t1 = time.time()
    elapsed = t1 - t0
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump({
            "method": METHOD,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "days": args.days, "rounds": args.rounds, "delay": args.delay,
            "mode": mode, "cadence": args.cadence, "repeat": args.repeat,
            "total_videos_played": len(all_log),
            "elapsed_seconds": round(elapsed, 2),
            "ok": ok, "fail": fail,
            "entries": all_log,
        }, f, ensure_ascii=False, indent=2)

    print("\n=== ALL DONE ===")
    print("  method=%s  rounds=%d  mode=%s" % (METHOD, args.rounds, mode))
    print("  total elapsed = %.1fs (%.2f min)" % (elapsed, elapsed / 60.0))
    print("  video-plays=%d  ok=%d  fail=%d" % (len(all_log), ok, fail))
    print("  log -> %s" % LOG_PATH)

    # Return a summary so callers (e.g. the daily runner) don't have to re-read
    # the on-disk log (which would be stale if a prior run failed to write it).
    return {
        "method": METHOD, "dry_run": False,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "days": args.days, "rounds": args.rounds, "delay": args.delay,
        "mode": mode, "cadence": args.cadence, "repeat": args.repeat,
        "total_videos_played": len(all_log),
        "elapsed_seconds": round(elapsed, 2),
        "ok": ok, "fail": fail,
    }


if __name__ == "__main__":
    main()
