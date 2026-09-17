"""Read-only verification for the FastWatch real-time-pace controlled experiment.

After a real-time-pace replay is applied to a TARGET video (and a CONTROL video is
left untouched), re-read the LIVE per-video play_count via getVideoList on a later
day to decide whether the replay was credited.

Why getVideoList.play_count (not creator-center aggregates):
  The creator-center aggregate windows (yesterday / 7d / 30d) CLOSE at yesterday,
  so a replay done today can never move them until tomorrow -- a same-day diff there
  always reads 0 and falsely concludes "replay is ignored". getVideoList's
  statistics.play_count is a live running total that includes today.

  Caveat (2026-09-16): the live-ness of getVideoList.play_count itself was never
  directly proven (only the datavidnew page tooltip claims real-time). A next-day
  re-read rules out any hour/day-scale lag, so a same-day baseline plus a next-day
  re-read together are the robust signal.

Protocol:
  1. Resolve each --mid to (oid, live play_count) via getVideoList (author session).
  2. Print a table and APPEND one dated JSON line to src/data/probe_verify_log.jsonl.

This script performs NO replay -- it only reads. The replay is applied separately
by quick_watch_delay_probe.py / run_fastwatch.py --delay 30.

Usage:
  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/verify_probe_playcount.py \
      --mids 5343193927260669 5343196087320859
"""
import os as _os
import json
import json as _json
# src/experiment/<topic>/<script>.py -> project root (holds the git-ignored config/)
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
import argparse
import os
import sys
import time
from datetime import datetime, timezone

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, SRC_DIR)
sys.path.insert(0, os.path.join(SRC_DIR, 'experiment', 'fetch'))
from auth import Auth

GETVIDEO_URL = "https://weibo.com/ajax/multimedia/getVideoList"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CREATOR_REF = "https://weibo.com/creator"
LOG_PATH = os.path.join(SRC_DIR, "data", "probe_verify_log.jsonl")


def fetch_video_list(session, pages=8):
    """Return recent author videos [{mid, oid, duration, play_count}] via getVideoList."""
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
        for it in items:
            out.append({
                "mid": str(it.get("mid") or it.get("mid_str") or it.get("id")),
                "oid": it.get("oid"),
                "duration": it.get("duration"),
                "play_count": (it.get("statistics") or {}).get("play_count"),
            })
        cursor = str((data.get("data") or {}).get("next_cursor") or "")
        if not cursor or cursor == "0":
            break
    return out


def main():
    ap = argparse.ArgumentParser(
        description="Read-only re-read of FastWatch real-time-pace probe play_count (no replay)")
    ap.add_argument("--mids", nargs="+", required=True,
                    help="probe video mids to re-read (target first, then control)")
    args = ap.parse_args()

    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    lst = fetch_video_list(a.session)
    by_mid = {v["mid"]: v for v in lst}

    rows = []
    for m in args.mids:
        v = by_mid.get(str(m))
        if v is None:
            rows.append({"mid": str(m), "found": False, "play_count": None})
            print("  mid=%s  NOT FOUND in recent getVideoList" % m)
        else:
            rows.append({"mid": str(m), "found": True,
                         "oid": v.get("oid"), "play_count": v.get("play_count"),
                         "duration": v.get("duration")})
            print("  mid=%s  play_count=%s  dur=%.0fs  oid=%s"
                  % (m, v.get("play_count"), v.get("duration") or 0, v.get("oid")))

    rec = {
        "iso": datetime.now(timezone.utc).isoformat(),
        "kind": "read_only_verify",
        "videos": rows,
    }
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    print("  appended -> %s" % LOG_PATH)
    return rec


if __name__ == "__main__":
    main()
