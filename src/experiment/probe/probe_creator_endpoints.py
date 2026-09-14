"""Probe candidate creator-center analytics endpoints with the author session and
print whichever returns a JSON carrying play-duration / video-statistics fields.

READ-ONLY: only GETs, never mutates.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/probe/probe_creator_endpoints.py
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

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

CANDIDATES = [
    "https://weibo.com/ajax/multimedia/getVideoList?cursor=0&count=1&status=0",
    "https://weibo.com/ajax/multimedia/videoStat",
    "https://weibo.com/ajax/multimedia/getVideoStat",
    "https://weibo.com/ajax/multimedia/videoData",
    "https://weibo.com/ajax/multimedia/getVideoSummary",
    "https://weibo.com/ajax/creator/video/overview",
    "https://weibo.com/ajax/creator/video/data",
    "https://weibo.com/ajax/creator/video/stat",
    "https://weibo.com/ajax/creator/data/overview",
    "https://weibo.com/ajax/creator/stat/video",
    "https://weibo.com/ajax/creator/video/list",
    "https://weibo.com/ajax/statuses/videoStat",
    "https://weibo.com/ajax/multimedia/getVideoPlayStat",
]


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    for url in CANDIDATES:
        try:
            r = a.session.get(url, headers={"User-Agent": UA,
                                "Referer": "https://weibo.com/creator"}, timeout=15000)
            snippet = r.text[:220].replace("\n", " ")
            hit = any(k in (url + r.text).lower() for k in
                      ("duration", "play_duration", "completion", "完播",
                       "播放时长", "play_count", "stat", "overview", "summary"))
            tag = "  <== analytics?" if hit else ""
            print("[%s] %s" % (r.status_code, url))
            print("      %s%s" % (snippet, tag))
        except Exception as e:
            print("[ERR] %s  %s" % (url, e))


if __name__ == "__main__":
    main()
