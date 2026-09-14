"""Diagnose why mid 5341994714403186 (video_oid 1034:5341993509781563) has
suspiciously low traffic_7d. Dump the RAW datavidnew (base + tab=traffic +
tab=diagnosis) and datavid_item responses to see the actual API values and
whether videoonecore is the right structure / the oid format matters."""
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
OID = "1034:5341993509781563"
MID = "5341994714403186"


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

    p = {"video_oid": OID, "mid": MID, "blogger_uid": AUTHOR_UID}

    print("===== BASE datavidnew (weibo_info) =====")
    d = _get(a, "/datavidnew", p)
    wi = find_key(d, "weibo_info")
    print(json.dumps(wi, ensure_ascii=False, indent=2) if wi else "NO weibo_info found")

    print("\n===== tab=traffic raw =====")
    t = _get(a, "/datavidnew", {**p, "tab": "traffic"})
    subs = find_key(t, "select_subitems")
    print("select_subitems keys:", list((subs or {}).keys()))
    vc = ((subs or {}).get("7") or {}).get("videoonecore") or {}
    print("videoonecore:", json.dumps(vc, ensure_ascii=False, indent=2))

    print("\n===== try oid WITHOUT 1034: prefix =====")
    p2 = {"video_oid": MID, "mid": MID, "blogger_uid": AUTHOR_UID}
    t2 = _get(a, "/datavidnew", {**p2, "tab": "traffic"})
    subs2 = find_key(t2, "select_subitems")
    vc2 = ((subs2 or {}).get("7") or {}).get("videoonecore") or {}
    print("videoonecore(oid=mid):", json.dumps(vc2, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
