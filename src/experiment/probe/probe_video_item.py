"""Probe the getVideoList item schema to discover the time & title field names."""
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
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    r = a.session.get(
        "https://weibo.com/ajax/multimedia/getVideoList",
        params={"cursor": "0", "count": "3", "status": "0"},
        headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
        timeout=20000,
    )
    print("HTTP", r.status_code)
    data = r.json()
    print("top keys:", list(data.keys()))
    print("data keys:", list((data.get("data") or {}).keys()))
    videos = (data.get("data") or {}).get("videos") or []
    print("video count:", len(videos))
    if videos:
        print("\n=== first item full (keys + values) ===")
        it = videos[0]
        for k, v in it.items():
            s = json.dumps(v, ensure_ascii=False)
            if len(s) > 200:
                s = s[:200] + " ..."
            print("  %-22s %s" % (k, s))
        print("\n=== candidate time/title fields across first items ===")
        for cand in ("title", "name", "created_at", "time", "publish_time",
                    "publishTime", "date", "ctime", "add_time", "play_count",
                    "mid", "oid", "id"):
            vals = [it.get(cand) for it in videos[:3]]
            print("  %-14s %s" % (cand, vals))


if __name__ == "__main__":
    main()
