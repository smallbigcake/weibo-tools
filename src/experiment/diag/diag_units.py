"""Diagnostic: inspect the raw datavidnew + datanew_selectdata responses and
print EVERY metric's number AND number_unit for each period, so we can see
whether the API carries explicit 分钟/秒/小时 unit info (task: use that as truth).
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
BASE = "https://me.weibo.com/api/proxy/native"


def _get(a, path, params):
    return a.session.get(BASE + path, params=params,
                         headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                         timeout=20000).json()


def find_select_subitems(obj):
    if isinstance(obj, dict):
        if "select_subitems" in obj:
            return obj["select_subitems"]
        for v in obj.values():
            r = find_select_subitems(v)
            if r:
                return r
    elif isinstance(obj, list):
        for v in obj:
            r = find_select_subitems(v)
            if r:
                return r
    return None


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    print("===== datavidnew (7d / 30d) =====")
    d = _get(a, "/datavidnew", {})
    subs = find_select_subitems(d) or {}
    for p in ("7", "30"):
        vc = (subs.get(p) or {}).get("videocore") or {}
        print("--- period=%s ---" % p)
        for k, v in vc.items():
            if isinstance(v, dict):
                print("  %s: number=%s unit=%s" % (k, v.get("number"), v.get("number_unit")))
            else:
                print("  %s: %r" % (k, v))

    print("\n===== datanew_selectdata module=video_core period=1 (昨日) =====")
    d2 = _get(a, "/datanew_selectdata", {"module": "video_core", "period": "1"})
    groups = (d2.get("data") or {}).get("groups") or {}
    for it in groups.get("1", []):
        print("  desc1=%s desc2=%s desc2_unit=%s desc3_text=%s desc3_end=%s" % (
            it.get("desc1"), it.get("desc2"), it.get("desc2_unit"),
            it.get("desc3_text"), it.get("desc3_end")))


if __name__ == "__main__":
    main()
