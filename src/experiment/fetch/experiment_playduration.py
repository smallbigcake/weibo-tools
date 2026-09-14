"""Probe how Weibo's play-duration reporting behaves server-side.

Unlike play COUNT (which we proved is server-gated: a beacon alone did NOT
increment it), play DURATION is client-reported -- the client literally sends
`seconds` (= playhead position / valid_play_duration) in play_history/report.json
heartbeats. This script probes whether the server accepts arbitrary `seconds`
values (i.e. trusts the client) and whether it caps them vs video_duration.

It does NOT fetch any media. It only POSTs the reporting beacon as the viewer.
Usage:
    venvs/test-env/Scripts/python.exe src/experiment/fetch/experiment_playduration.py
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
import sys
from urllib.parse import urlencode

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth

MID = "5149990424675345"
MEDIA_ID = "5149981921968130"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def post(seconds, play_type="1"):
    base = ("https://multimedia.api.weibo.com/2/multimedia/user/"
            "play_history/report.json")
    params = {
        "source": "339644097",
        "play_type": play_type,
        "video_orientation": "horizontal",
        "video_duration": "1400",        # real length of this video (~23:20)
        "id": MID,
        "id_type": "0",
        "oid": "1034:%s" % MEDIA_ID,
        "is_contribution": "0",
        "reqHost": "https://weibo.com/%s/%s" % (AUTHOR_UID, MID),
        "seconds": str(seconds),
    }
    a = Auth()
    a.uid = VIEWER_UID
    a.load()
    r = a.session.post(base + "?" + urlencode(params),
                       headers={"User-Agent": UA, "Referer": "https://weibo.com/"},
                       timeout=20000)
    return r.status_code, r.text


def main():
    print("Probing play_history/report.json with client-reported `seconds` "
          "(video_duration=1400). No media fetched.")
    for sec in (30, 600, 9999):
        st, body = post(sec)
        print("  seconds=%5d -> HTTP %s | %s" % (sec, st, body[:160]))


if __name__ == "__main__":
    main()
