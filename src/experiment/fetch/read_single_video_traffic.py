"""Read a single author video's creator-center TRAFFIC / DIAGNOSIS detail.

me.weibo.com/api/proxy/native/datavidnew?tab=traffic|diagnosis is the per-video
REAL-TIME traffic page. Per its in-page tooltip: play COUNT is live (real-time),
play DURATION is lagged to yesterday. This is the authoritative per-video signal
for whether a replay credits a specific video -- more precise than the account-level
7d/30d aggregates, and possibly a DIFFERENT (effective-play) count vs getVideoList's
statistics.play_count (which may be an impression count).

Run:
  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/read_single_video_traffic.py \
      --mid <mid> --oid <oid>
"""
import os as _os
import json as _json
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
import argparse
import json
import os
import sys
from urllib.parse import urlencode

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, SRC_DIR)
sys.path.insert(0, os.path.join(SRC_DIR, 'experiment', 'fetch'))
from auth import Auth

BASE = "https://me.weibo.com/api/proxy/native/datavidnew"
from constants import BROWSER_USER_AGENT as UA
def fetch(a, mid, oid, tab):
    params = {"video_oid": oid, "mid": mid, "blogger_uid": AUTHOR_UID, "tab": tab}
    r = a.session.get(BASE, params=params,
                      headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                      timeout=20000)
    try:
        return r.json()
    except Exception:
        return {"_raw": r.text[:2000], "_status": r.status_code}


def _walk(obj, path, out, keys=("play", "count", "duration", "dura")):
    if isinstance(obj, dict):
        for k, v in obj.items():
            klow = str(k).lower()
            if any(kk in klow for kk in keys):
                preview = str(v)
                if len(preview) > 180:
                    preview = preview[:180] + "..."
                out.append("%s.%s = %s" % (".".join(path), k, preview))
            _walk(v, path + [str(k)], out)
    elif isinstance(obj, list):
        for i, v in enumerate(obj[:3]):
            _walk(v, path + ["[%d]" % i], out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mid", required=True)
    ap.add_argument("--oid", required=True)
    args = ap.parse_args()
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    for tab in ("traffic", "diagnosis"):
        data = fetch(a, args.mid, args.oid, tab)
        print("=== tab=%s (mid=%s) ===" % (tab, args.mid))
        out = []
        _walk(data, [], out)
        for line in out:
            print("  " + line)
        print("  -- raw head --")
        print("  " + json.dumps(data, ensure_ascii=False)[:3000].replace("\n", " "))


if __name__ == "__main__":
    main()
