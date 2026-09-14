"""Dump the RAW single-video traffic response to inspect the exact unit
(number_unit) carried by play_totallength / play_count, and see whether the
API also exposes a minutes field. Pick a high-play-count video for sanity."""
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
BASE = "https://me.weibo.com/api/proxy/native"


def _get(a, path, params):
    return a.session.get(BASE + path, params=params,
                         headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                         timeout=20000).json()


def find_key(obj, key):
    if isinstance(obj, dict):
        if key in obj:
            return obj[key]
        for v in obj.values():
            r = find_key(v, key)
            if r is not None:
                return r
    elif isinstance(obj, list):
        for v in obj:
            r = find_key(v, key)
            if r is not None:
                return r
    return None


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    lst = json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                                      "data", "author_videos.json"), encoding="utf-8"))["videos"]
    # pick the video with the largest play_count
    v = max(lst, key=lambda x: (x.get("play_count") or 0))
    oid = v.get("oid")
    mid = v.get("mid_str") or v.get("mid")
    print("picked mid=%s oid=%s play_count=%s" % (mid, oid, v.get("play_count")))

    d = _get(a, "/datavidnew",
            {"video_oid": oid, "mid": mid, "blogger_uid": AUTHOR_UID, "tab": "traffic"})
    subs = find_key(d, "select_subitems")
    print("raw select_subitems keys:", list((subs or {}).keys()))
    vc = ((subs or {}).get("7") or {}).get("videoonecore") or {}
    print("videoonecore:", json.dumps(vc, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
