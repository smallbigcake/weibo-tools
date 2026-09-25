"""List the latest N videos of the author account (uid = AUTHOR_UID) by publish time.

Source: creator-center endpoint `weibo.com/ajax/multimedia/getVideoList`
        (cookie auth). Returns videos NEWEST-FIRST; paginate via `next_cursor`.
Each item exposes:
  - titles[0].title  -> the post title/text  (the "name")
  - create_time      -> publish time, millisecond Unix epoch (13 digits)
  - mid / duration / play_count / statistics

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/list_latest_videos.py [N]
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
from datetime import datetime, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from constants import BROWSER_USER_AGENT as UA
def beijing(ts_ms):
    return (datetime.utcfromtimestamp(ts_ms / 1000) + timedelta(hours=8))


def main():
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    out = []
    cursor = "0"
    while len(out) < n:
        r = a.session.get(
            "https://weibo.com/ajax/multimedia/getVideoList",
            params={"cursor": cursor, "count": "20", "status": "0"},
            headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
            timeout=20000,
        )
        data = r.json()
        videos = data.get("data", {}).get("videos") or []
        if not videos:
            break
        for it in videos:
            title = (it.get("titles") or [{}])[0].get("title", "") if it.get("titles") else ""
            ct = it.get("create_time")
            out.append({
                "mid": it.get("mid_str") or it.get("mid"),
                "time_beijing": beijing(ct).strftime("%Y-%m-%d %H:%M:%S") if ct else None,
                "title": title,
                "duration_s": it.get("duration"),
                "play_count": (it.get("statistics") or {}).get("play_count"),
            })
            if len(out) >= n:
                break
        cursor = str(data.get("data", {}).get("next_cursor") or "")
        if not cursor or cursor == "0":
            break

    print("latest %d videos (newest first):\n" % len(out))
    for i, v in enumerate(out, 1):
        print("%2d. [%s]  %s" % (i, v["time_beijing"], v["title"]))

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "latest_%d_videos.json" % len(out))
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("\nSaved ->", out_path)


if __name__ == "__main__":
    main()
