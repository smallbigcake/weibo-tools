"""Diagnose why getVideoList returns HTTP 400 mid-pagination.
Walk pages with a 1s delay, log each page status/count/next_cursor, and on 400
print the response body so we can tell if it's rate-limit or a hard end.
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

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from auth import Auth
from constants import BROWSER_USER_AGENT as UA
ENDPOINT = "https://weibo.com/ajax/multimedia/getVideoList"


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    cursor = "0"
    total = 0
    page = 0
    while True:
        r = a.session.get(
            ENDPOINT,
            params={"cursor": cursor, "count": "20", "status": "0"},
            headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
            timeout=20000,
        )
        if r.status_code != 200:
            print("PAGE %d  HTTP %s  cursor=%s" % (page, r.status_code, cursor))
            print("  body:", r.text[:300])
            # try one retry
            time.sleep(3)
            r2 = a.session.get(
                ENDPOINT,
                params={"cursor": cursor, "count": "20", "status": "0"},
                headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
                timeout=20000,
            )
            print("  retry HTTP %s  body=%s" % (r2.status_code, r2.text[:200]))
            if r2.status_code != 200:
                break
            r = r2
        d = r.json().get("data", {})
        vids = d.get("videos") or []
        nxt = str(d.get("next_cursor") or "")
        print("PAGE %d  count=%d  next_cursor=%s  total_so_far=%d" %
              (page, len(vids), nxt, total + len(vids)))
        total += len(vids)
        if not vids:
            break
        cursor = nxt
        if not cursor or cursor == "0":
            break
        page += 1
        time.sleep(1)
    print("GRAND TOTAL:", total, "pages:", page + 1)


if __name__ == "__main__":
    main()
