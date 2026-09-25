"""Capture all browser network requests while the viewer account watches a Weibo video.

Research tool only. Loads the viewer user's saved cookies, opens a Weibo video page
in headless Chromium, forces the video to play, and records every network request
and response (URL, method, resource type, status, headers, and small text bodies)
to a JSON file for offline analysis.

Usage (from project root, with the test venv):
    venvs/test-env/Scripts/python.exe src/experiment/capture/capture_video_playback.py

Output: src/experiment/video_playback_capture.json
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
import time

from playwright.sync_api import sync_playwright

# --- configuration -------------------------------------------------------
VIDEO_URL = (f"https://weibo.com/u/{AUTHOR_UID}?tabtype=newVideo"
             f"&first_cursor=5149990424675345")
_SRC = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # src/
COOKIE_PATH = os.path.join(_SRC, "cookies.%s.weibo" % VIEWER_UID)
OUT_PATH = os.path.join(_SRC, "tmp", "capture", "video_playback_capture.json")
from constants import BROWSER_USER_AGENT as USER_AGENT
PLAY_SECONDS = 25  # how long to keep the page open after triggering playback


def load_cookies_for_playwright(path):
    """Read the project cookie jar and normalize to Playwright's add_cookies format."""
    with open(path, "r", encoding="utf-8") as f:
        raw = json.load(f)
    out = []
    for c in raw:
        name = c.get("name")
        value = c.get("value")
        domain = c.get("domain")
        if not (name and value is not None and domain):
            continue
        item = {
            "name": name,
            "value": value,
            "domain": domain,
            "path": c.get("path") or "/",
        }
        exp = c.get("expires") or c.get("expiry")
        if exp:
            try:
                item["expires"] = float(exp)
            except (TypeError, ValueError):
                pass
        if c.get("secure"):
            item["secure"] = True
        if c.get("httpOnly"):
            item["httpOnly"] = True
        samesite = c.get("sameSite")
        if samesite:
            item["sameSite"] = samesite
        out.append(item)
    return out


def main():
    cookies = load_cookies_for_playwright(COOKIE_PATH)
    print("Loaded %d cookies from %s" % (len(cookies), COOKIE_PATH))

    records = []  # one entry per response (with the matching request info)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--autoplay-policy=no-user-gesture-required",
                  "--mute-audio"],
        )
        context = browser.new_context(
            user_agent=USER_AGENT,
            viewport={"width": 1280, "height": 900},
        )
        context.add_cookies(cookies)
        page = context.new_page()

        def on_request(req):
            req._capture_seen = True

        def on_response(resp):
            req = resp.request
            try:
                body = None
                ctype = resp.headers.get("content-type", "")
                clen = resp.headers.get("content-length")
                rtype = resp.request.resource_type
                # Read small text bodies so we can analyze JSON/JS meaning.
                if rtype in ("xhr", "fetch", "document", "script", "stylesheet"):
                    try:
                        data = resp.body()
                        if data and len(data) < 200_000:
                            body = data.decode("utf-8", "replace")
                    except Exception:
                        body = None
                records.append({
                    "url": resp.url,
                    "method": req.method,
                    "resource_type": rtype,
                    "status": resp.status,
                    "content_type": ctype,
                    "content_length": clen,
                    "request_headers": dict(req.headers),
                    "body": body,
                })
            except Exception as e:
                records.append({
                    "url": resp.url, "method": req.method,
                    "resource_type": resp.request.resource_type,
                    "status": resp.status, "content_type": "",
                    "content_length": None,
                    "request_headers": {}, "body": None,
                    "error": str(e),
                })

        page.on("request", on_request)
        page.on("response", on_response)

        print("Navigating to %s" % VIDEO_URL)
        page.goto(VIDEO_URL, wait_until="domcontentloaded", timeout=60000)
        # Let the SPA boot and issue its initial batch of requests.
        page.wait_for_timeout(6000)

        # Attempt 1: open the player by clicking the first video card, then force
        # play on any <video> element and poll for a real media source.
        def open_and_play():
            page.evaluate(
                """() => {
                    const v = document.querySelector('video');
                    if (v) {
                        const card = v.closest('[class*="card"], [class*="feed"], '
                                     + 'li, article');
                        if (card) { card.click(); return; }
                        v.click(); return;
                    }
                    const cand = document.querySelector('[class*="Video"], '
                                 + '[class*="video"]');
                    if (cand) cand.click();
                }"""
            )

        def force_play_all():
            return page.evaluate(
                """() => {
                    const out = [];
                    document.querySelectorAll('video').forEach(v => {
                        try { v.muted = true;
                              const p = v.play(); if (p && p.catch) p.catch(()=>{}); }
                        catch(e) {}
                        out.push(v.currentSrc || v.src || '');
                    });
                    return out;
                }"""
            )

        open_and_play()
        page.wait_for_timeout(3000)
        sources = set()
        deadline = time.time() + PLAY_SECONDS
        while time.time() < deadline:
            for s in force_play_all():
                if s:
                    sources.add(s)
            time.sleep(2)
        print("Video sources seen: %s"
              % json.dumps(list(sources), ensure_ascii=False)[:400])

        # Attempt 2 (fallback): open the video detail page directly from the
        # first_cursor, which usually hosts a ready-to-play player.
        if not sources:
            detail = "https://weibo.com/%s/5149990424675345" % AUTHOR_UID
            print("No media loaded from tab; trying detail page %s" % detail)
            try:
                page.goto(detail, wait_until="domcontentloaded", timeout=60000)
            except Exception as e:
                print("detail goto failed: %s" % e)
            page.wait_for_timeout(4000)
            force_play_all()
            dl = time.time() + PLAY_SECONDS
            while time.time() < dl:
                for s in force_play_all():
                    if s:
                        sources.add(s)
                time.sleep(2)
            print("Detail-page sources seen: %s"
                  % json.dumps(list(sources), ensure_ascii=False)[:400])

        print("Keeping page open %d s to capture playback/heartbeat requests..."
              % PLAY_SECONDS)
        page.wait_for_timeout(PLAY_SECONDS * 1000)

        final_url = page.url
        browser.close()

    out = {
        "video_url": VIDEO_URL,
        "final_url": final_url,
        "viewer_uid": VIEWER_UID,
        "captured_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "request_count": len(records),
        "requests": records,
    }
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("Saved %d requests to %s" % (len(records), OUT_PATH))


if __name__ == "__main__":
    sys.exit(main())
