"""Analyze the weibo-video-statistic.har to find backend statistic endpoints.

Prints, for every XHR/fetch entry that is NOT a static asset (js/css/img/media),
the request method+URL and a short response-body signature. Also deep-scans the
response bodies for keywords related to video statistics.
"""
import json
import re
import sys
from urllib.parse import urlparse, parse_qs

HAR = "src/tmp/video/weibo-video-statistic.har"

STATIC_EXT = (".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".webp",
              ".woff", ".woff2", ".ttf", ".svg", ".mp4", ".m3u8", ".ico")


def is_static(url):
    path = urlparse(url).path.lower()
    return path.endswith(STATIC_EXT) or "f.video.weibocdn.com" in url


def main():
    h = json.load(open(HAR, encoding="utf-8"))
    entries = h["log"]["entries"]
    print("total entries:", len(entries))

    # 1) all api-ish requests
    print("\n=== API-like requests (non static) ===")
    api_entries = []
    for e in entries:
        url = e["request"]["url"]
        if is_static(url):
            continue
        api_entries.append(e)
        print("  [%s] %s" % (e["request"]["method"], url[:160]))

    # 2) keyword scan in response bodies of api entries
    print("\n=== responses containing statistic keywords ===")
    keywords = ["播放时长", "play_dura", "play_duration", "play_count",
                "完播", "completion", "转发", "repost", "评论", "comment",
                "点赞", "like", "互动", "interact", "曝光", "exposure",
                "发布量", "upload", "阅读", "read", "impression",
                "video_core", "sum_core", "datavidnew", "datanew_selectdata",
                "data_item", "select_subitems", "video_visibility"]
    for e in api_entries:
        body = (e["response"].get("content", {}) or {}).get("text", "")
        if not body:
            continue
        hits = [k for k in keywords if k.lower() in body.lower()]
        if hits:
            url = e["request"]["url"]
            print("  %s %s" % (e["request"]["method"], url[:140]))
            print("    hits:", hits)


if __name__ == "__main__":
    main()
