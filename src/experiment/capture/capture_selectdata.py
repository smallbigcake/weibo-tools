"""Capture the EXACT datanew_selectdata request the creator center issues when
viewing the VIDEO play-duration (7d/30d) chart. READ-ONLY.

Loads me.weibo.com, enters 数据中心, switches to the 视频 section and the
播放时长 metric, toggles 近7日/近30日, and records every datanew_selectdata
request URL (with full query string) so we learn the exact module/subtype/period
params for play duration.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/capture/capture_selectdata.py
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
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tmp", "selectdata", "selectdata_calls.json")
from constants import BROWSER_USER_AGENT as UA
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
    calls = []

    def on_request(req):
        u = req.url
        if "datanew_selectdata" in u or "data_item" in u or "dataview" in u:
            calls.append(u)

    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        ctx = b.new_context(user_agent=UA, viewport={"width": 1366, "height": 900})
        ctx.add_cookies(cookies)
        pg = ctx.new_page()
        pg.on("request", on_request)

        pg.goto("https://me.weibo.com/", wait_until="networkidle", timeout=30000)
        pg.wait_for_timeout(4000)
        # enter 数据中心
        for label in ("数据中心", "数据", "视频数据", "数据概览"):
            for el in pg.get_by_text(label, exact=False).all():
                try:
                    el.click(timeout=1500)
                    pg.wait_for_timeout(3000)
                    break
                except Exception:
                    pass
        # try switching metric to 播放时长 and period to 7/30
        for label in ("播放时长", "播放量", "完播", "近7日", "近30日", "7日", "30日", "视频"):
            for el in pg.get_by_text(label, exact=False).all():
                try:
                    el.click(timeout=1200)
                    pg.wait_for_timeout(1500)
                except Exception:
                    pass
        b.close()

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(calls, f, ensure_ascii=False, indent=2)
    print("captured %d selectdata/data calls -> %s" % (len(calls), OUT))
    for u in calls:
        print("  ", u[:200])


if __name__ == "__main__":
    main()
