"""Summarize a video_playback_capture.json into a categorized, readable report.

Reads src/experiment/video_playback_capture.json and writes
src/experiment/video_playback_report.txt with:
  - counts by resource type
  - endpoint families (host + first path segment) with method counts
  - media URLs (m3u8/ts/mp4/m4s/video)
  - xhr/fetch/document entries with a short body snippet
"""

import json
import os
import re
from collections import Counter, defaultdict
from urllib.parse import urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(os.path.dirname(HERE)), "tmp", "capture", "video_playback_capture.json")
OUT = os.path.join(os.path.dirname(os.path.dirname(HERE)), "tmp", "capture", "video_playback_report.txt")

MEDIA_RE = re.compile(r"\.(m3u8|ts|mp4|m4s|m4a|webm|mov)(\?|$)", re.I)


def host_family(url):
    p = urlparse(url)
    seg = [s for s in p.path.split("/") if s]
    first = seg[0] if seg else ""
    # collapse numeric/hex ids in the first segment to keep families stable
    first = re.sub(r"\d{6,}", "<id>", first)
    return p.netloc, first


def main():
    with open(SRC, "r", encoding="utf-8") as f:
        data = json.load(f)
    reqs = data["requests"]
    lines = []
    a = lines.append
    a("=== Weibo video playback capture report ===")
    a("video_url : %s" % data["video_url"])
    a("final_url : %s" % data["final_url"])
    a("viewer_uid    : %s" % data["viewer_uid"])
    a("captured  : %s" % data["captured_at"])
    a("total reqs: %d" % len(reqs))
    a("")

    by_type = Counter(r["resource_type"] for r in reqs)
    a("--- counts by resource type ---")
    for t, c in by_type.most_common():
        a("  %-12s %d" % (t, c))
    a("")

    fam = defaultdict(lambda: Counter())
    for r in reqs:
        host, first = host_family(r["url"])
        fam["%s /%s" % (host, first)][r["method"]] += 1
    a("--- endpoint families (host + first path segment) ---")
    for famkey in sorted(fam):
        methods = ",".join("%s=%d" % (m, c) for m, c in fam[famkey].items())
        a("  %-55s %s" % (famkey, methods))
    a("")

    media = [r for r in reqs if MEDIA_RE.search(r["url"])]
    a("--- media URLs (m3u8/ts/mp4/m4s/...) : %d ---" % len(media))
    for r in media:
        a("  [%s] %s" % (r["status"], r["url"][:160]))
    a("")

    interesting = [r for r in reqs
                   if r["resource_type"] in ("xhr", "fetch", "document", "script")
                   and not MEDIA_RE.search(r["url"])]
    a("--- xhr/fetch/document/script entries (%d) ---" % len(interesting))
    for r in interesting:
        a("  [%s %s] %s" % (r["method"], r["resource_type"], r["url"][:170]))
        a("      ctype=%s status=%s" % (r["content_type"], r["status"]))
        body = r.get("body")
        if body:
            snippet = body.replace("\n", " ").strip()[:240]
            a("      body: %s" % snippet)
        a("")


    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("Wrote report to %s (%d lines)" % (OUT, len(lines)))


if __name__ == "__main__":
    main()
