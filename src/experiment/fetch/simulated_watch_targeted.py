"""Targeted simulated viewer-watch for the STAGGER experiment.

Unlike simulated_watch.py (which watches the author's whole 30-day window), this
script watches ONLY a filtered subset of the author's catalog loaded from
src/data/creator_center/creator_center_author_videos.json:

  - videos whose `titles` carry NO `default:true` entry, AND
  - videos whose `playlists_ids` is empty.

These are the low-prominence videos the author is unlikely to watch on their own
phone, so they form a clean SIM-ONLY set. Watching them (while the phone covers
the rest) lets us attribute creator-center play-duration changes to the synthetic
watch, sidestepping the confound where real phone viewing pollutes the signal.

The actual watch engine (DASH byte fetch + beacon replay in browser order) is
REUSED from simulated_watch.run_watch -- this file only adds the catalog filter
and a dedicated log file.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/simulated_watch_targeted.py \
      [--json src/data/creator_center/creator_center_author_videos.json] [--days 30] \
      [--delay 30] [--rounds 1] [--cadence 30] [--quality dash_hd] \
      [--with-aggregate] [--smoke] [--dry-run]
"""
import os as _os
import json as _json
import logging
import sys
import time
import argparse

_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
VIEWER_UID = _CFG.get('viewer_uid')

_SRC_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))))
sys.path.insert(0, _SRC_ROOT)
sys.path.insert(0, _os.path.join(_SRC_ROOT, 'experiment', 'fetch'))

from auth import Auth  # noqa: E402  (validates the viewer session at import)
from logutil import setup as _setup_logging, share_handler, utc_formatter  # noqa: E402
from filestamp import batch_stamp  # noqa: E402
_setup_logging()

# Reuse the watch engine + viewer session from simulated_watch.
from simulated_watch import run_watch, _viewer_session, log as _sw_log  # noqa: E402
# Merge beacon-engine + dash-streamer logs into this run's single file.
from beacon_engine import log as _beacon_log  # noqa: E402
from dash_streamer import log as _dash_log  # noqa: E402

SRC_DIR = _SRC_ROOT
DEFAULT_JSON = _os.path.join(SRC_DIR, "data", "creator_center", "creator_center_author_videos.json")


def _title_has_default(titles):
    """True if any title entry is flagged default (default:true OR type:"default")."""
    for t in (titles or []):
        if t.get("default") is True or t.get("type") == "default":
            return True
    return False


def load_filtered_videos(path, days, include_default_title, include_playlisted):
    """Return (window, stats) where `window` is the list of video dicts that pass:
      - exclude videos whose titles carry a default flag (unless include_default_title)
      - exclude videos that belong to any playlist (unless include_playlisted)
      - exclude videos older than `days` days (days<=0 means no recency limit)
    Each entry carries mid/oid/duration/title; run_watch re-fetches the fresh
    signed DASH URL per video, so only mid is strictly required downstream.
    """
    data = _json.load(open(path, encoding='utf-8'))
    cutoff = None
    if days and days > 0:
        cutoff = time.time() - days * 86400.0
    out, stats = [], {"default_excluded": 0, "playlist_excluded": 0, "old_excluded": 0}
    for v in data.get("videos", []):
        titles = v.get("titles") or []
        if _title_has_default(titles) and not include_default_title:
            stats["default_excluded"] += 1
            continue
        pls = v.get("playlists_ids") or []
        if pls and not include_playlisted:
            stats["playlist_excluded"] += 1
            continue
        ct = (v.get("create_time") or 0) / 1000.0  # ms -> s
        if cutoff is not None and ct < cutoff:
            stats["old_excluded"] += 1
            continue
        mid = str(v.get("mid") or v.get("mid_str") or "")
        if not mid:
            continue
        title = (titles[0].get("title", "") if titles else "") or v.get("text") or ""
        out.append({"mid": mid,
                    "oid": v.get("oid"),
                    "duration": int(v.get("duration") or 0),
                    "title": title})
    return out, stats


def main():
    ap = argparse.ArgumentParser(
        description="Targeted simulated watch: only author_videos.json entries with "
                    "NO default title AND empty playlists_ids.")
    ap.add_argument("--json", default=DEFAULT_JSON, help="author_videos.json path")
    ap.add_argument("--uid", default=AUTHOR_UID, help="author uid (waterfall owner)")
    ap.add_argument("--days", type=int, default=30,
                    help="only videos created within the last N days (0 = all)")
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
    ap.add_argument("--max-bytes", type=int, default=0,
                    help="cap DASH download per url (0 = whole file); used by --smoke")
    ap.add_argument("--include-default-title", action="store_true",
                    help="also watch videos whose titles carry default:true")
    ap.add_argument("--include-playlisted", action="store_true",
                    help="also watch videos that belong to a playlist")
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

    # Dedicated single log file for this targeted run; merge all three loggers.
    log = _sw_log
    BATCH = batch_stamp()
    _dir = _os.path.join(SRC_DIR, 'log', 'watch')
    _fh = logging.FileHandler(_os.path.join(_dir, 'simulated_watch_targeted_%s.log' % BATCH), encoding='utf-8')
    _fh.setLevel(logging.DEBUG)
    _fh.setFormatter(utc_formatter())
    log.addHandler(_fh)
    share_handler(_beacon_log, _fh)
    share_handler(_dash_log, _fh)

    results = []
    t0 = time.time()

    window, stats = load_filtered_videos(
        args.json, args.days, args.include_default_title, args.include_playlisted)
    log.info("=== targeted filter: %d videos selected ===", len(window))
    log.info("  excluded: default_title=%d playlisted=%d older_than_%dd=%d",
             stats["default_excluded"], stats["playlist_excluded"], args.days, stats["old_excluded"])
    for i, v in enumerate(window, 1):
        log.info("  #%02d mid=%s dur=%.0fs title=%s", i, v["mid"], v.get("duration", 0),
                 (v.get("title") or "")[:60])

    if not window:
        log.warning("no videos pass the filter; nothing to do.")
        return {"ok": 0, "fail": 0, "videos": 0}

    # Dry-run needs no viewer session (it only prints the plan); the real run does.
    if args.dry_run:
        return run_watch(None, window, args, results, t0)
    sess = _viewer_session()
    return run_watch(sess, window, args, results, t0)


if __name__ == "__main__":
    main()
