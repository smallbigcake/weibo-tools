"""Final attempt to locate the creator data-center '播放时长' read API.

On weibo.com/creatorcenter (author): detect whether the page exposes
数据中心 / 播放时长 / 完播率 text, click the matching entry, then capture all
/ajax responses and print their URLs + a snippet, so we can find the
video-stat endpoint.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/fetch/final_read_probe.py
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


def on_resp(resp):
    if "/ajax/" in resp.url or "api.weibo" in resp.url:
        try:
            text = (resp.body() or b"").decode("utf-8", "ignore")
        except Exception:
            text = ""
        AJAX.append({"url": resp.url, "snippet": text[:500]})


def main():
    cookies = [clean(c) for c in json.load(open(COOKIE_FILE, encoding="utf-8"))]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        ctx.add_cookies(cookies)
        page = ctx.new_page()
        page.on("response", on_resp)
        page.goto("https://weibo.com/creatorcenter", wait_until="domcontentloaded",
                  timeout=30000)
        page.wait_for_timeout(7000)
        body_text = page.evaluate("() => document.body.innerText")
        for kw in ["数据中心", "播放时长", "完播", "视频数据", "内容数据", "创作数据"]:
            idx = body_text.find(kw)
            print("page contains %-6s: %s" % (kw, idx >= 0))
        # click any element whose visible text matches data-center keywords
        clicked = page.evaluate("""() => {
            const kws = ['数据中心','视频数据','内容数据','创作数据','播放时长','完播率','数据分析'];
            let done = [];
            document.querySelectorAll('*').forEach(e => {
                if (e.children.length === 0) {
                    const t = (e.textContent||'').trim();
                    if (kws.some(k => t === k || (t.includes(k) && t.length <= 10))) {
                        try { e.click(); done.push(t); } catch(_){}
                    }
                }
            });
            return done;
        }""")
        print("clicked:", clicked)
        page.wait_for_timeout(6000)
        browser.close()

    urls = sorted(set(a["url"] for a in AJAX))
    with open(os.path.join(EXP, "final_read_ajax.json"), "w", encoding="utf-8") as f:
        json.dump(AJAX, f, ensure_ascii=False, indent=2)
    print("\n=== %d ajax responses (%d unique) ===" % (len(AJAX), len(urls)))
    for u in urls:
        print(u)


if __name__ == "__main__":
    main()
