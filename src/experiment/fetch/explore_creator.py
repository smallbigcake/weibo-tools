"""Two-pronged discovery of the creator-backend '播放时长' read source.

1. Dump getVideoTab full JSON (candidate: may carry watch-time fields).
2. Live: as author, open creator pages, click data/video entries, capture only
   weibo-owned AJAX responses whose body/url mentions play-duration keywords.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/fetch/explore_creator.py
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

from auth import Auth
from playwright.sync_api import sync_playwright
EXP = os.path.dirname(os.path.abspath(__file__))
COOKIE_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                           "cookies.%s.weibo" % AUTHOR_UID)
KEYWORDS = ["播放时长", "完播", "play_duration", "playduration", "valid_play",
            "watch_time", "avg_play", "video_stat", "datacenter", "数据中心",
            "video_data", "play_time"]
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


def dump_videotab():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    r = a.session.get("https://weibo.com/ajax/profile/getVideoTab",
                      params={"uid": AUTHOR_UID, "cursor": "0"},
                      headers={"User-Agent": "Mozilla/5.0",
                               "Referer": "https://weibo.com/%s" % AUTHOR_UID},
                      timeout=20000)
    data = r.json()
    path = os.path.join(EXP, "videotab_dump.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    # show the keys of the first video item
    vids = data.get("data", {}).get("list") or data.get("data", {}).get("videos") or []
    keys = list(vids[0].keys()) if vids else []
    stats_keys = list((vids[0].get("statistics") or {}).keys()) if vids else []
    print("[videotab] saved %s; first item keys: %s" % (path, keys))
    print("[videotab] statistics keys: %s" % stats_keys)


def on_response(response):
    try:
        url = response.url
        if "weibo" not in url and "sina" not in url:
            return
        if "/ajax/" not in url and "api.weibo" not in url:
            return
        ct = response.headers.get("content-type", "")
        if "json" not in ct:
            return
        body = response.body()
        if not body:
            return
        text = body.decode("utf-8", "ignore")
        if any(k.lower() in text.lower() for k in KEYWORDS):
            HITS.append({"url": url, "len": len(body), "snippet": text[:500]})
    except Exception:
        pass


def live_explore():
    cookies = [clean(c) for c in json.load(open(COOKIE_FILE, encoding="utf-8"))]
    urls = [
        "https://weibo.com/creator",
        "https://weibo.com/creatorcenter",
        "https://creator.weibo.com",
    ]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        ctx.add_cookies(cookies)
        page = ctx.new_page()
        page.on("response", on_response)
        for url in urls:
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30000)
            except Exception as e:
                print("goto %s failed: %s" % (url, e))
            page.wait_for_timeout(6000)
            try:
                page.evaluate("""() => {
                    document.querySelectorAll('a,button,[role=tab],li').forEach(e => {
                        const t = (e.textContent||'') + (e.getAttribute('href')||'');
                        if (/数据|分析|播放|视频|datacenter|stat|数据中心/i.test(t))
                            try { e.click(); } catch(_){}
                    });
                }""")
            except Exception:
                pass
            page.wait_for_timeout(4000)
            print("visited %s (hits=%d)" % (url, len(HITS)))
        browser.close()
    with open(os.path.join(EXP, "creator_explore.json"), "w", encoding="utf-8") as f:
        json.dump(HITS, f, ensure_ascii=False, indent=2)
    print("\n=== %d candidate weibo AJAX responses ===" % len(HITS))
    for h in HITS[:30]:
        print("\nURL:", h["url"])
        print("SNIP:", h["snippet"].replace("\n", " ")[:400])


if __name__ == "__main__":
    dump_videotab()
    live_explore()
