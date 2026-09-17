"""Controlled probe of the client-reported play-duration ('播放时长') trust model.

This is the OPERATION half of a before/after comparison the user wants:
  - Normal heartbeat: one report every 30s, reporting the real elapsed seconds.
  - This probe: send a heartbeat EVERY 1s but report 30s each time (i.e. claim
    30s watched per 1s of wall-clock), capped so the CUMULATIVE reported seconds
    for a video never exceed its real length (video_duration) -- matching the
    user's "累计不要超过视频总长".
  - Applied to the 10 latest videos, each repeated 10 times.

It uses the viewer account (VIEWER_UID) to POST play_history/report.json,
exactly as the real web client does. No media is fetched.

NOTE: this only performs the operation. The creator-backend '播放时长' READ must
be done separately (see final_read_probe.py) to compare before/after. This
script logs exactly what seconds it reported so the delta can be checked.

Usage:
    venvs/test-env/Scripts/python.exe src/experiment/probe/probe_playduration.py
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
from urllib.parse import urlencode

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
REPORT_EVERY = 1          # seconds of wall-clock between beacons (vs normal 30s)
STEP_SECONDS = 30         # seconds we CLAIM watched per beacon (vs real ~1s)
REPS_PER_VIDEO = 10
LATEST = os.path.join(_ROOT, "src", "data", "latest_videos.json")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

BASE = "https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json"


def build_params(mid, oid, duration, seconds, play_type):
    return {
        "source": "339644097",
        "play_type": str(play_type),
        "video_orientation": "horizontal",
        "video_duration": str(int(duration)),
        "id": str(mid),
        "id_type": "0",
        "oid": "1034:%s" % oid,
        "is_contribution": "0",
        "reqHost": "https://weibo.com/%s/%s" % (AUTHOR_UID, mid),
        "seconds": str(int(seconds)),
    }


def main():
    videos = json.load(open(LATEST, encoding="utf-8"))
    a = Auth()
    a.uid = VIEWER_UID
    a.load()

    results = []
    for v in videos:
        mid, oid, dur = v["mid"], v["oid"].split(":")[-1], float(v["duration"])
        cap = int(dur)                       # per-session cap = video length
        total_claimed = 0
        log = {"mid": mid, "duration": dur, "beacons": []}
        for rep in range(REPS_PER_VIDEO):
            cum = 0
            prev = 0
            play_type = 0                    # first beacon of the session = start
            while cum < cap:
                cum = min(cum + STEP_SECONDS, cap)
                params = build_params(mid, oid, dur, cum, play_type)
                r = a.session.post(BASE + "?" + urlencode(params),
                                   headers={"User-Agent": UA,
                                            "Referer": "https://weibo.com/"},
                                   timeout=20000)
                total_claimed += (cum - prev)
                prev = cum
                play_type = 1               # subsequent = progress heartbeat
                log["beacons"].append({"rep": rep, "seconds": cum,
                                       "http": r.status_code,
                                       "body": r.text[:120]})
                time.sleep(REPORT_EVERY)    # 1s cadence (the "trick")
                if cum >= cap:
                    break
        log["total_claimed"] = total_claimed
        results.append(log)
        print("video %s dur=%.0fs -> %d reps, claimed ~%ds in %d beacons"
              % (mid, dur, REPS_PER_VIDEO, total_claimed, len(log["beacons"])))

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "probe_playduration_log.json")
    json.dump(results, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("Saved %s" % out)


if __name__ == "__main__":
    main()
