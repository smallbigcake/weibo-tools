"""On weibo.com/creatorcenter (as author), capture ALL /ajax response URLs and a
snippet of each body, so we can locate the video play-duration read endpoint by
name rather than by fragile keyword matching.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/capture/capture_creatorcenter.py
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
AJAX = []


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


def on_response(response):
    url = response.url
    if "/ajax/" not in url and "api.weibo" not in url:
        return
    try:
        body = response.body() or b""
        text = body.decode("utf-8", "ignore")
    except Exception:
        text = ""
    AJAX.append({"url": url, "snippet": text[:600]})


def main():
    cookies = [clean(c) for c in json.load(open(COOKIE_FILE, encoding="utf-8"))]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        ctx.add_cookies(cookies)
        page = ctx.new_page()
        page.on("response", on_response)
        page.goto("https://weibo.com/creatorcenter", wait_until="domcontentloaded",
                  timeout=30000)
        page.wait_for_timeout(8000)
        # Try to open video / data sections by clicking matching UI.
        for label in ["视频", "数据", "内容", "播放", "数据中心", "作品"]:
            try:
                page.evaluate("""(lbl) => {
                    document.querySelectorAll('a,button,[role=tab],li,div').forEach(e => {
                        const t = (e.textContent||'').trim();
                        if (t === lbl || (t.includes(lbl) && t.length <= 8))
                            try { e.click(); } catch(_){}
                    });
                }""", label)
                page.wait_for_timeout(2500)
            except Exception:
                pass
        page.wait_for_timeout(3000)
        browser.close()

    urls = [a["url"] for a in AJAX]
    with open(os.path.join(os.path.dirname(os.path.dirname(EXP)), "tmp", "capture", "creatorcenter_ajax.json"), "w", encoding="utf-8") as f:
        json.dump(AJAX, f, ensure_ascii=False, indent=2)
    print("=== %d ajax responses (unique urls: %d) ===" % (len(AJAX), len(set(urls))))
    for u in sorted(set(urls)):
        print(u)


if __name__ == "__main__":
    main()
