"""Fetch the latest videos of the author account (uid = AUTHOR_UID) via the
creator getVideoList endpoint, to obtain (id, mid, duration) for the experiment.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/fetch/get_latest_videos.py
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
from constants import BROWSER_USER_AGENT as UA
def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    out = []
    cursor = "0"
    while len(out) < 10:
        r = a.session.get(
            "https://weibo.com/ajax/multimedia/getVideoList",
            params={"cursor": cursor, "count": "20", "status": "0"},
            headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
            timeout=20000,
        )
        data = r.json()
        items = data.get("data", {}).get("videos") or []
        if not items:
            break
        for it in items:
            mid = it.get("mid") or it.get("mid_str") or it.get("id")
            dur = it.get("duration")
            out.append({"mid": mid, "oid": it.get("oid"), "duration": dur,
                        "play_count": (it.get("statistics") or {}).get("play_count")})
            if len(out) >= 10:
                break
        cursor = str(data.get("data", {}).get("next_cursor") or "")
        if not cursor or cursor == "0":
            break

    print(json.dumps(out, ensure_ascii=False, indent=2))
    _data_dir = os.path.join(_ROOT, "src", "data", "video")
    os.makedirs(_data_dir, exist_ok=True)
    with open(os.path.join(_data_dir, "latest_videos.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("Saved latest_videos.json (%d videos) -> %s" % (len(out), _data_dir))


if __name__ == "__main__":
    main()
