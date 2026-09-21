"""Analyze the weibo-video-timeout HAR to find why autoplay stops ~1h in.

Prints:
  1. time span & entry count
  2. top URL patterns (normalized) by count
  3. any non-2xx / errorText responses
  4. the last N entries (the stop point) with timestamps/status
  5. gaps in the timeline (where requests pause -> the stall)

Usage (PowerShell):
  venvs/test-env/Scripts/python.exe src/experiment/analyze/analyze_har.py
"""
import json
import os
import re
import sys
from datetime import datetime

HAR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "tmp", "video", "weibo-video-timeout.har")


def load():
    with open(HAR, encoding="utf-8") as f:
        return json.load(f)


def norm(url):
    # keep scheme+host+path, drop query; replace long digit/hex runs
    u = url.split("?")[0]
    u = re.sub(r"/[0-9]{6,}", "/<id>", u)
    u = re.sub(r"/[0-9a-f]{16,}", "/<hex>", u)
    return u


def parse_dt(s):
    # e.g. 2026-09-11T12:34:56.789Z
    return datetime.strptime(s, "%Y-%m-%dT%H:%M:%S.%fZ")


def main():
    h = load()
    entries = h["log"]["entries"]
    n = len(entries)
    t0 = parse_dt(entries[0]["startedDateTime"])
    t1 = parse_dt(entries[-1]["startedDateTime"])
    print("entries:", n)
    print("span   : %s  ->  %s  (%.1f min)" % (t0, t1, (t1 - t0).total_seconds() / 60))

    # 2) top URL patterns
    from collections import Counter
    pat = Counter()
    status_by_pat = {}
    for e in entries:
        u = norm(e["request"]["url"])
        pat[u] += 1
    print("\n=== top URL patterns (count) ===")
    for u, c in pat.most_common(30):
        print("  %5d  %s" % (c, u))

    # 3) errors
    print("\n=== non-2xx / errorText responses ===")
    errs = []
    for e in entries:
        st = e["response"].get("status")
        et = e.get("errorText") or e.get("_error")
        if (st and st >= 400) or et:
            errs.append((e["startedDateTime"], st, et, norm(e["request"]["url"])))
    if not errs:
        print("  (none)")
    else:
        for dt, st, et, u in errs[:40]:
            print("  %s  %s %s  %s" % (dt, st, et, u))

    # 4) last 50 entries
    print("\n=== last 50 entries (stop point) ===")
    for e in entries[-50:]:
        dt = e["startedDateTime"]
        m = e["request"]["method"]
        u = e["request"]["url"]
        st = e["response"].get("status")
        print("  %s %-4s %s  %s" % (dt, m, st, u[:110]))

    # 5) gaps: sort by start, find pauses > 60s between consecutive requests
    print("\n=== timeline gaps > 60s (possible stalls) ===")
    times = sorted(parse_dt(e["startedDateTime"]) for e in entries)
    gaps = []
    for i in range(1, len(times)):
        d = (times[i] - times[i-1]).total_seconds()
        if d > 60:
            gaps.append((times[i-1], times[i], d))
    print("  gap count >60s:", len(gaps))
    for a, b, d in gaps[:20]:
        print("  %s -> %s  (%.0f s)" % (a, b, d))


if __name__ == "__main__":
    main()
