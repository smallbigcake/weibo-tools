"""Locate the creator data-center route and any per-video play-duration read API.

1. On weibo.com/creatorcenter (author): print all nav anchors (text -> href).
2. Open a video detail page as author and capture /ajax responses mentioning
   video/stat/duration.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/capture/capture_creator_nav.py
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

from playwright.sync_api import sync_playwright
EXP = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                           "cookies.%s.weibo" % AUTHOR_UID)
DETAIL = "https://weibo.com/%s/5339206551602803" % AUTHOR_UID
HITS = []


def clean(c):
    out = {"name": c.get("name"), "value": c.get("value"),
           "domain": c.get("domain"), "path": c.get("path") or "/"}
    if "secure" in c:
        out["secure"] = bool(c["secure"])
    if "httpOnly" in c:
        out["httpOnly"] = bool(c["httpOnly"])
    exp = c.get("expires")
    if isinstance(exp, (int, float)):
        out["expires"] = float(exp)
    elif isinstance(exp, str) and exp.isdigit():
        out["expires"] = float(exp)
    return out


def on_detail(resp):
    url = resp.url
    if "/ajax/" not in url:
        return
    try:
        text = (resp.body() or b"").decode("utf-8", "ignore")
    except Exception:
        return
    if any(k in text.lower() for k in ["播放", "duration", "video", "stat", "完播", "play"]):
        HITS.append({"url": url, "snippet": text[:500]})


def main():
    cookies = [clean(c) for c in json.load(open(COOKIE_FILE, encoding="utf-8"))]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        ctx.add_cookies(cookies)

        # 1) nav links on creatorcenter
        page = ctx.new_page()
        page.goto("https://weibo.com/creatorcenter", wait_until="domcontentloaded",
                  timeout=30000)
        page.wait_for_timeout(6000)
        links = page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => ({t: (a.textContent||'').trim().slice(0,20), h: a.getAttribute('href')||''}))
            .filter(x => x.h && x.h.includes('weibo'))""")
        print("=== creatorcenter nav links (%d) ===" % len(links))
        for l in links:
            print("  %-20s -> %s" % (l["t"], l["h"]))

        # 2) video detail page ajax
        page2 = ctx.new_page()
        page2.on("response", on_detail)
        page2.goto(DETAIL, wait_until="domcontentloaded", timeout=30000)
        page2.wait_for_timeout(6000)
        page2.evaluate("""() => {
            document.querySelectorAll('a,button').forEach(e => {
                const t=(e.textContent||'').trim();
                if (/数据|播放|分析|data|stat/i.test(t) && t.length<=10) try{e.click()}catch(_){}
            });
        }""")
        page2.wait_for_timeout(4000)
        browser.close()

    with open(os.path.join(EXP, "creator_nav.json"), "w", encoding="utf-8") as f:
        json.dump({"links": links, "hits": HITS}, f, ensure_ascii=False, indent=2)
    print("\n=== video-detail ajax hits (%d) ===" % len(HITS))
    for h in HITS[:25]:
        print("\nURL:", h["url"])
        print("SNIP:", h["snippet"].replace("\n", " ")[:350])


if __name__ == "__main__":
    main()
