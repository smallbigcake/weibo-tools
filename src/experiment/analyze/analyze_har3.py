"""Confirm root cause + locate the API that issues the signed .mp4 URLs.
  1. decode 403 body (base64) -> should be 'time expired'
  2. compare signing params (Expires/ssig/tp/lp) of a 206 vs 403 mp4
  3. find which ajax/API response in the HAR contains a weibocdn .mp4 URL
     (that's the endpoint to re-call for a fresh signed URL)
"""
import base64
import json
import os
import re
from urllib.parse import urlparse, parse_qs

HAR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tmp", "weibo-video-timeout.har")


def main():
    h = load = json.load(open(HAR, encoding="utf-8"))
    entries = h["log"]["entries"]

    # 1) decode first 403 body
    for e in entries:
        if ".mp4" in e["request"]["url"] and e["response"]["status"] == 403:
            body = (e["response"].get("content", {}) or {}).get("text", "")
            if body:
                try:
                    dec = base64.b64decode(body).decode("utf-8", "ignore")
                except Exception:
                    dec = "(not b64) " + body[:80]
                print("403 body decoded:", dec)
            break

    # 2) signing params 206 vs 403
    def sign_params(e):
        q = parse_qs(urlparse(e["request"]["url"]).query)
        return {k: q.get(k, [""])[0] for k in ("Expires", "ssig", "tp", "lp", "ps", "uid")}
    ok = next((e for e in entries if ".mp4" in e["request"]["url"] and e["response"]["status"] == 206), None)
    bad = next((e for e in entries if ".mp4" in e["request"]["url"] and e["response"]["status"] == 403), None)
    if ok: print("206 sign:", sign_params(ok))
    if bad: print("403 sign:", sign_params(bad))

    # 3) which API returns the .mp4 URL?
    print("\n=== responses containing a weibocdn .mp4 URL ===")
    pat = re.compile(r"https?://[^\"'\\ ]*weibocdn\.com/[^\"'\\ ]*\.mp4")
    seen = set()
    for e in entries:
        body = (e["response"].get("content", {}) or {}).get("text", "")
        if not body:
            continue
        m = pat.search(body)
        if m:
            u = e["request"]["url"]
            if u in seen:
                continue
            seen.add(u)
            print("  %s %s  -> body has mp4 (len=%d)" % (e["request"]["method"], u[:120], len(body)))
    if not seen:
        print("  (none of the captured responses embed the .mp4 URL)")


if __name__ == "__main__":
    main()
