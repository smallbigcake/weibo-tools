"""Targeted re-crawl: refresh ONLY the fields that suffered from the unit /
staleness bug -- `weibo_info` and `traffic_7d` (per-video 7-day play count +
watch time) -- and update them IN PLACE in src/data/video/author_video_stats.json, keeping all
other fields (diagnosis, clarity_score, play_ratio, traffic_source, portrait)
untouched.

This fixes the systematic play_totallength unit-scaling error (秒/分钟/小时) by
re-running the SAME normalization in parse_traffic, and refreshes stale counts,
without re-hitting the 5 extra endpoints per video (so it is ~3-7x faster than a
full --force crawl).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/crawl/recrawl_traffic.py [--delay 0.3]
"""
import json
import os
import sys
import time
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from crawl_video_stats import (parse_traffic, parse_weibo_info, AUTHOR_UID, BASE, UA,
                               VIDEOS_JSON, OUT_JSON)

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _get(a, path, params, delay, tag=""):
    time.sleep(delay)
    for attempt in range(4):
        try:
            r = a.session.get(BASE + path, params=params,
                              headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                              timeout=20000)
        except Exception as ex:
            print("  HTTP-EXC %s attempt=%d %s -> %s" % (tag, attempt, path, ex))
            time.sleep(2)
            continue
        if r.status_code == 200:
            return r.json()
        # Non-200: print REAL HTTP detail. Do not guess at the cause.
        print("  HTTP %s %s params=%s  body=%s"
              % (r.status_code, path, params, r.text[:800]))
        if r.status_code == 400:
            time.sleep(2 * (attempt + 1))
            continue
        time.sleep(1)
    print("  GAVE-UP %s %s after 4 retries" % (tag, path))
    return None


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--delay", type=float, default=0.3)
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    videos = json.load(open(VIDEOS_JSON, encoding="utf-8"))["videos"]
    if os.path.exists(OUT_JSON):
        store = json.load(open(OUT_JSON, encoding="utf-8"))
    else:
        store = {"meta": {}, "videos": {}}
    if "videos" not in store:
        store["videos"] = {}

    from auth import Auth
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    from data_archive import archive_existing
    archived = archive_existing(OUT_JSON)
    if archived:
        print("archived previous ->", archived)

    p_base = {"blogger_uid": AUTHOR_UID}
    queue = list(videos)
    if args.limit:
        queue = queue[:args.limit]
    print("refreshing weibo_info + traffic_7d for %d videos" % len(queue))

    ok = 0
    for i, v in enumerate(queue, 1):
        oid = v.get("oid")
        mid = v.get("mid_str") or v.get("mid")
        if not oid or not mid:
            continue
        p = {"video_oid": oid, "mid": mid, "blogger_uid": AUTHOR_UID}
        try:
            default = _get(a, "/datavidnew", p, args.delay, tag=mid)
            traffic = _get(a, "/datavidnew", {**p, "tab": "traffic"}, args.delay, tag=mid)
            rec = store["videos"].get(mid, {})
            wi = parse_weibo_info(default)
            t7 = parse_traffic(traffic)
            if wi is not None:
                rec["weibo_info"] = wi
            if t7 is not None:
                rec["traffic_7d"] = t7
            store["videos"][mid] = rec
            ok += 1
            print("[%d/%d] %s play7d=%s len=%ss (%s)" % (
                i, len(queue), mid,
                (t7 or {}).get("play_count"),
                (t7 or {}).get("play_totallength_sec"),
                (t7 or {}).get("play_totallength_unit")))
        except Exception as ex:
            print("  ERR %s: %s" % (mid, ex))
        if i % 10 == 0:
            _flush(store)
            print("  ... %d/%d refreshed (stored=%d)" % (i, len(queue), len(store["videos"])))

    _flush(store)
    print("done. refreshed this run=%d, total stored=%d" % (ok, len(store["videos"])))


def _flush(store):
    store["meta"] = {
        "uid": AUTHOR_UID,
        "source": ("targeted refresh of weibo_info + traffic_7d "
                   "(reuses crawl_video_stats.normalization)"),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "total_videos": len(store["videos"]),
        "note": ("per-video statistics; play_totallength normalized to seconds "
                 "(play_totallength_sec) using the API number_unit; Chinese kept "
                 "only as values"),
    }
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
