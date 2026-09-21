"""Discover analytics endpoints on the REAL creator center: me.weibo.com
(learned from side/cards: "创作者中心" -> https://me.weibo.com).

READ-ONLY: loads me.weibo.com as author, captures ALL /ajax/ responses, greps for
play-duration / completion / video-statistics fields.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/discover_me_weibo.py
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
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from playwright.sync_api import sync_playwright
COOKIE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "cookies.%s.weibo" % AUTHOR_UID)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tmp", "creator", "me_weibo_ajax.json")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def load_cookies():
    with open(COOKIE_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)
    out = []
    for c in raw:
        if not (c.get("name") and c.get("value") is not None and c.get("domain")):
            continue
        item = {"name": c["name"], "value": c["value"],
                "domain": c["domain"], "path": c.get("path") or "/"}
        exp = c.get("expires") or c.get("expiry")
        if exp:
            try:
                item["expires"] = float(exp)
            except (TypeError, ValueError):
                pass
        if c.get("secure"):
            item["secure"] = True
        out.append(item)
    return out


def main():
    cookies = load_cookies()
    captured = []
    seen = set()

    def on_response(resp):
        u = resp.url
        if "/ajax/" not in u and "me.weibo.com" not in u:
            return
        if u in seen:
            return
        seen.add(u)
        ct = resp.headers.get("content-type", "")
        if "json" not in ct:
            return
        try:
            body = resp.body()[:4000]
        except Exception:
            body = b""
        captured.append({"url": u, "status": resp.status,
                        "body": body.decode("utf-8", "ignore")})

    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        ctx = b.new_context(user_agent=UA, viewport={"width": 1366, "height": 900})
        ctx.add_cookies(cookies)
        pg = ctx.new_page()
        pg.on("response", on_response)

        for path in ("/", "/video", "/video/data", "/video/manage", "/data",
                    "/dashboard", "/content/video", "/creator"):
            url = "https://me.weibo.com" + path
            try:
                pg.goto(url, wait_until="networkidle", timeout=30000)
                pg.wait_for_timeout(5000)
            except Exception as e:
                print("goto %s error: %s" % (url, e))
        # click any 数据/播放/视频/时长 tab
        for label in ("数据", "播放数据", "视频数据", "播放时长", "数据中心",
                      "效果", "业绩", "完播", "近7日", "近30日", "7日", "30日"):
            for el in pg.get_by_text(label, exact=False).all():
                try:
                    el.click(timeout=1200)
                    pg.wait_for_timeout(2500)
                except Exception:
                    pass
        try:
            text = pg.evaluate("document.body.innerText")[:500]
        except Exception:
            text = ""
        b.close()

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"captured": captured, "page_text": text}, f, ensure_ascii=False, indent=2)

    print("captured %d ajax responses -> %s" % (len(captured), OUT))
    kws = ("duration", "completion", "完播", "播放时长", "play_duration",
           "7日", "30日", "昨日", "stat", "overview", "summary", "play_count",
           "exposure", "interact", "阅读", "播放")
    print("\n=== analytics-looking responses ===")
    for c in captured:
        if any(k in (c["url"] + c["body"]).lower() for k in kws):
            print("  [%s] %s" % (c["status"], c["url"][:160]))
            print("    %s" % c["body"][:260].replace("\n", " "))
    print("\n=== page text (first 500) ===")
    print(text)


if __name__ == "__main__":
    main()
