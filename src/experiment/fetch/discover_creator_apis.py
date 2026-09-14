"""Final discovery attempt: enter the creator center from the home page nav and
capture ALL /ajax/ responses, then grep offline for play-duration fields.

READ-ONLY. Saves raw responses to src/tmp/creator_ajax2.json.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/discover_creator_apis.py
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
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tmp", "creator_ajax2.json")
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
        if "/ajax/" not in u:
            return
        if u in seen:
            return
        seen.add(u)
        ct = resp.headers.get("content-type", "")
        if "json" not in ct:
            return
        try:
            body = resp.body()[:3000]
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

        # 1) home, then click the creator-center entry
        pg.goto("https://weibo.com/", wait_until="domcontentloaded", timeout=30000)
        pg.wait_for_timeout(4000)
        clicked = None
        for label in ("创作中心", "创作者中心", "创作", "creator", "创作中心"):
            for el in pg.get_by_text(label, exact=False).all():
                try:
                    href = el.get_attribute("href")
                    el.click(timeout=1200)
                    clicked = href or label
                    pg.wait_for_timeout(6000)
                    break
                except Exception:
                    pass
            if clicked:
                break
        # 2) also directly try /creator with a long wait
        pg.goto("https://weibo.com/creator", wait_until="networkidle", timeout=30000)
        pg.wait_for_timeout(8000)
        # 3) try to click any 数据/播放 tab
        for label in ("数据", "播放数据", "视频数据", "数据中心", "效果", "业绩", "数据看板"):
            for el in pg.get_by_text(label, exact=False).all():
                try:
                    el.click(timeout=1200)
                    pg.wait_for_timeout(3000)
                except Exception:
                    pass
        try:
            text = pg.evaluate("document.body.innerText")[:600]
        except Exception:
            text = ""
        b.close()

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"clicked": clicked, "captured": captured, "page_text": text},
                  f, ensure_ascii=False, indent=2)

    print("clicked creator entry:", clicked)
    print("captured %d /ajax/ JSON responses -> %s" % (len(captured), OUT))
    kws = ("duration", "completion", "完播", "播放时长", "play_duration",
           "数据", "stat", "overview", "summary", "exposure", "interact")
    print("\n=== analytics-looking responses ===")
    for c in captured:
        if any(k in (c["url"] + c["body"]).lower() for k in kws):
            print("  [%s] %s" % (c["status"], c["url"][:160]))
            print("    %s" % c["body"][:240].replace("\n", " "))
    print("\n=== page text (first 600) ===")
    print(text)


if __name__ == "__main__":
    main()
