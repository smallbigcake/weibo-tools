"""READ-ONLY snapshot of the creator backend's per-video metrics for the author
account, via the creator-center `getVideoList` endpoint.

For each video we capture the current backend values:
  mid, title, create_time, duration, play_count,
  statistics: comment_count, attitude_count (likes), reposts_count, danmaku_count
(video_visibility, etc.). This is the "other video data" the backend exposes
per video. Saved as a timestamped snapshot so it can be diffed later.

NOTE: the 7-day / 30-day PLAY-DURATION AGGREGATE is served by a *different*
analytics endpoint we have not yet located (it is not in getVideoList, and the
creator-center SPA did not load in headless). That piece is added once the
endpoint is known. See the conversation -- the user is asked to provide the
creator-center URL / the XHR that returns the 7d/30d play-duration numbers.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/read_backend_metrics.py
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
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from constants import BROWSER_USER_AGENT as UA
ENDPOINT = "https://weibo.com/ajax/multimedia/getVideoList"
SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def beijing(ts_ms):
    if not ts_ms:
        return None
    return (datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc) +
            timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S")


def fetch_all():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    out = []
    cursor = "0"
    while True:
        r = a.session.get(ENDPOINT,
                          params={"cursor": cursor, "count": "20", "status": "0"},
                          headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
                          timeout=20000)
        if r.status_code != 200:
            print("HTTP %s, stop." % r.status_code)
            break
        vids = (r.json().get("data") or {}).get("videos") or []
        if not vids:
            break
        for it in vids:
            st = it.get("statistics") or {}
            title = ((it.get("titles") or [{}])[0].get("title", "") if it.get("titles") else "")
            out.append({
                "mid": it.get("mid_str") or it.get("mid"),
                "title": title,
                "create_time_ms": it.get("create_time"),
                "create_time_beijing": beijing(it.get("create_time")),
                "duration_s": it.get("duration"),
                "play_count": (it.get("statistics") or {}).get("play_count") or it.get("play_count"),
                "comment_count": st.get("comment_count"),
                "like_count": st.get("attitude_count"),
                "repost_count": st.get("reposts_count"),
                "danmaku_count": st.get("danmaku_count"),
                "video_visibility": it.get("video_visibility"),
            })
        cursor = str((r.json().get("data") or {}).get("next_cursor") or "")
        if not cursor or cursor == "0" or cursor == "-1":
            break
        time.sleep(1.0)
    return out


def main():
    videos = fetch_all()
    videos.sort(key=lambda v: v.get("create_time_beijing") or "", reverse=True)
    total_play = sum((v["play_count"] or 0) for v in videos)
    out = {
        "meta": {
            "uid": AUTHOR_UID,
            "source": ENDPOINT,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "total_videos": len(videos),
            "total_play_count": total_play,
            "note": "per-video metrics only; 7d/30d play-duration aggregate pending endpoint discovery",
        },
        "videos": videos,
    }
    os.makedirs(os.path.join(SRC_DIR, "data", "backend"), exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = os.path.join(SRC_DIR, "data", "backend", "backend_metrics_%s.json" % stamp)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("snapshotted %d videos, total play_count=%s -> %s" %
          (len(videos), f"{total_play:,}", path))
    print("newest 5:")
    for v in videos[:5]:
        print("  [%s] play=%s like=%s cmt=%s rpost=%s  %s" %
              (v["create_time_beijing"], v["play_count"], v["like_count"],
               v["comment_count"], v["repost_count"], v["title"][:30]))


if __name__ == "__main__":
    main()
