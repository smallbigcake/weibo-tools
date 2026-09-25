"""Validate: does POST-ing play_history/report.json ALONE (no media fetch) increment
the video play count? Analogous to the profile-visit finding (profile/info alone
registers a visitor) but expected to FAIL here, mirroring the reads_count gating.

Method (test-env, viewer account):
  1. Open the video detail page as the viewer and read the on-page play count.
  2. POST play_history/report.json with play_type=0 (start) and play_type=1
     (30s heartbeat) using the viewer's cookies -- NO media segments are fetched.
  3. Re-open the page and read the play count again.
  4. Report before/after and whether it changed.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/fetch/experiment_playcount.py
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
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))          # src/experiment
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))  # src

from auth import Auth
from playwright.sync_api import sync_playwright
from urllib.parse import urlencode

MID = "5149990424675345"
MEDIA_ID = "5149981921968130"          # from the DASH MPD / capture
VIDEO_URL = "https://weibo.com/%s/%s" % (AUTHOR_UID, MID)
COOKIE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "cookies.%s.weibo" % VIEWER_UID)
from constants import BROWSER_USER_AGENT as UA
COUNT_PATTERNS = [
    r"([\d][\d.]*)\s*(万|亿)?\s*次观看",   # "392次观看" (views)
    r"([\d][\d.]*)\s*(万|亿)?\s*次播放",
    r"观看\s*([\d.]+)\s*(万|亿)?",
    r"([\d.]+)\s*(万|亿)?\s*播放",
    r"播放量[：: ]*([\d.]+)\s*(万|亿)?",
]


def load_cookies_for_playwright():
    import json
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


def read_count():
    """Open the video page as the viewer and extract the displayed play count (number)."""
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        ctx = b.new_context(user_agent=UA, viewport={"width": 1280, "height": 900})
        ctx.add_cookies(load_cookies_for_playwright())
        pg = ctx.new_page()
        pg.goto(VIDEO_URL, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(5000)
        text = pg.evaluate("document.body.innerText")
        b.close()
    for pat in COUNT_PATTERNS:
        m = re.search(pat, text)
        if m:
            return m.group(1), m.group(0), text[:400]
    return None, None, text[:400]


def post_beacon(session):
    base = ("https://multimedia.api.weibo.com/2/multimedia/user/"
            "play_history/report.json")
    headers = {"User-Agent": UA, "Referer": "https://weibo.com/"}
    results = []
    for play_type, seconds in (("0", "0"), ("1", "30")):
        params = {
            "source": "339644097",
            "play_type": play_type,
            "video_orientation": "horizontal",
            "video_duration": "1400",
            "id": MID,
            "id_type": "0",
            "oid": "1034:%s" % MEDIA_ID,
            "is_contribution": "0",
            "reqHost": VIDEO_URL,
            "seconds": seconds,
        }
        r = session.post(base + "?" + urlencode(params), headers=headers,
                         timeout=20000)
        results.append((play_type, r.status_code, r.text[:200]))
    return results


def main():
    print("=== [before] reading on-page play count ===")
    before_num, before_txt, snippet = read_count()
    print("  count: %s (raw: %r)" % (before_num, before_txt))
    print("  page snippet: %s" % snippet.replace("\n", " "))

    print("=== posting play_history/report.json ONLY (no media fetch) ===")
    a = Auth()
    a.uid = VIEWER_UID
    a.load()
    results = post_beacon(a.session)
    for pt, st, body in results:
        print("  play_type=%s -> HTTP %s | %s" % (pt, st, body))

    print("=== [after] reading on-page play count ===")
    after_num, after_txt, _ = read_count()
    print("  count: %s (raw: %r)" % (after_num, after_txt))

    print("=== VERDICT ===")
    if before_num == after_num:
        print("  UNCHANGED (%s -> %s) -> beacon-only POST did NOT increment "
              "play count (consistent with reads_count gating)." % (before_num, after_num))
    else:
        print("  CHANGED (%s -> %s) -> beacon-only POST incremented play count."
              % (before_num, after_num))


if __name__ == "__main__":
    main()
