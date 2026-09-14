"""Focused HAR analysis on the video CDN (.mp4) requests:
  - full URL + query-param keys of first 200 and first 403
  - request headers (Cookie / Referer / Authorization) on 200 vs 403
  - response headers / body text of a 403
Goal: confirm whether the stall is a CDN signed-URL / token expiry (TTL ~1h).
"""
import json
import os
import re
from urllib.parse import urlparse, parse_qs

HAR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tmp", "weibo-video-timeout.har")


def load():
    with open(HAR, encoding="utf-8") as f:
        return json.load(f)


def hdrs(headers, names):
    out = {}
    low = {h["name"].lower(): h["value"] for h in headers}
    for nm in names:
        if nm.lower() in low:
            out[nm] = low[nm.lower()]
    return out


def main():
    h = load()
    entries = h["log"]["entries"]
    mp4 = [e for e in entries if ".mp4" in e["request"]["url"]]
    print("total .mp4 requests:", len(mp4))

    first200 = next((e for e in mp4 if e["response"]["status"] == 200), None)
    first403 = next((e for e in mp4 if e["response"]["status"] == 403), None)

    for tag, e in [("FIRST 200", first200), ("FIRST 403", first403)]:
        if not e:
            print(tag, "not found"); continue
        url = e["request"]["url"]
        print("\n==== %s @ %s ====" % (tag, e["startedDateTime"]))
        print("URL :", url[:300])
        q = parse_qs(urlparse(url).query)
        print("QUERY KEYS:", sorted(q.keys()))
        for k in ("sign", "t", "token", "auth", "expire", "expires", "ks", "vkey",
                  "auth_key", "h", "label", "template"):
            if k in q:
                print("   %s = %s" % (k, q[k]))
        print("REQ HDRS:", hdrs(e["request"].get("headers", []),
                                ["Cookie", "Referer", "Authorization", "Origin", "Range"]))
        print("RES HDRS:", hdrs(e["response"].get("headers", []),
                                ["Content-Type", "Server", "X-Cache", "Age",
                                 "Expires", "Cache-Control", "Date"]))
        body = (e["response"].get("content", {}) or {}).get("text")
        if body:
            print("RES BODY:", body[:300])

    # Are 200 and 403 for the SAME object (same path, different status)?
    if first200 and first403:
        p200 = urlparse(first200["request"]["url"]).path
        p403 = urlparse(first403["request"]["url"]).path
        print("\n200 path :", p200)
        print("403 path :", p403)
        print("same object? ", p200 == p403)

    # list distinct mp4 objects and their status transition times
    print("\n=== per-object status (first & last seen) ===")
    objs = {}
    for e in mp4:
        path = urlparse(e["request"]["url"]).path
        st = e["response"]["status"]
        o = objs.setdefault(path, {"first": e["startedDateTime"], "first_st": st,
                                   "last": e["startedDateTime"], "last_st": st, "n": 0})
        o["last"] = e["startedDateTime"]; o["last_st"] = st; o["n"] += 1
    for path, o in objs.items():
        print("  %s  n=%d  %s(%d) -> %s(%d)" % (path[-40:], o["n"],
              o["first"], o["first_st"], o["last"], o["last_st"]))


if __name__ == "__main__":
    main()
