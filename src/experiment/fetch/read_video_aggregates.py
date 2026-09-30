"""READ-ONLY snapshot of the creator-center (me.weibo.com) VIDEO AGGREGATES:
play count AND play DURATION for yesterday / last-7-days / last-30-days, plus
other video metrics (upload / repost / comment / like counts), and the
"yesterday top-5 videos by play count" list.

All JSON keys are English and follow the ORIGINAL API field names. The original
API values that happen to be Chinese (e.g. metric labels, video titles) are kept
as values, which is allowed.

Endpoints (confirmed from weibo-video-statistic.har):
  yesterday -> GET me.weibo.com/api/proxy/native/datanew_selectdata
                  ?module=video_core&period=1
               groups["1"] is a list of 6 metrics, EACH with a vs-prev-day delta:
                 desc1="发布量"/"播放量"/"播放时长"/"转发量"/"评论量"/"点赞量"
               We map desc1 -> the canonical English metric key used by the API
               (upload_count / play_count / play_dura_count / reposts_count /
                comments_count / attitudes_count) and keep desc1 as name_cn.
  last-7/30d -> GET me.weibo.com/api/proxy/native/datavidnew
               select_subitems["7"] / ["30"] -> videocore ->
                 upload_count, play_count, play_dura_count (hours),
                 reposts_count, comments_count, attitudes_count
  yesterday TOP5 -> GET me.weibo.com/api/proxy/native/datavid_item
                    ?is_new=1&item_id=dt_vid_playpercent
               "昨日播放量TOP5视频": mid/title/duration/publish_time/yesterday_play

NOTE: do NOT use module=sum_core for yesterday -- that endpoint only returns
播放量 + 播放时长. video_core&period=1 is the rich one (all 6 metrics).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/read_video_aggregates.py
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
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from constants import BROWSER_USER_AGENT as UA
from filestamp import batch_stamp
SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Canonical English metric keys (these are the API's own item_subtype names).
# Map the Chinese desc1 label (yesterday endpoint) -> the API's English key.
METRIC_CN2EN = {
    "发布量": "upload_count",
    "播放量": "play_count",
    "播放时长": "play_dura_count",
    "转发量": "reposts_count",
    "评论量": "comments_count",
    "点赞量": "attitudes_count",
}
METRIC_EN2CN = {v: k for k, v in METRIC_CN2EN.items()}


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


def _get(a, url, params):
    return a.session.get(url, params=params,
                         headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                         timeout=20000).json()


def fetch_yesterday(a):
    """Yesterday core metrics (6 of them) each with a vs-prev-day delta.

    Keys are the canonical English metric names; desc1 (Chinese label) is kept
    as the 'name_cn' value. The unit (when present, e.g. 小时) comes from the
    API's own desc2_unit -- we use that as the source of truth.
    """
    d = _get(a, "https://me.weibo.com/api/proxy/native/datanew_selectdata",
            {"module": "video_core", "period": "1"})
    groups = (d.get("data") or {}).get("groups") or {}
    out = {}
    for it in groups.get("1", []):
        cn = it.get("desc1") or ""
        en = METRIC_CN2EN.get(cn, cn)
        out[en] = {
            "value": it.get("desc2"),
            "unit": it.get("desc2_unit"),  # None for count metrics, 小时 for 播放时长
            "vs_prev_day": it.get("desc3_text"),
            "name_cn": cn,
        }
    return out


def fetch_7_30(a):
    """Last-7 / last-30 day aggregates. API keys are already English.

    Each metric keeps the API's own number_unit (小时 for play_dura_count,
    None for the count metrics) so the unit is never assumed.
    """
    d = _get(a, "https://me.weibo.com/api/proxy/native/datavidnew", {})
    subs = find_select_subitems(d) or {}
    out = {}
    for p, label in (("7", "last_7d"), ("30", "last_30d")):
        vc = (subs.get(p) or {}).get("videocore") or {}
        metrics = {}
        for en in METRIC_CN2EN.values():
            v = vc.get(en)
            if isinstance(v, dict) and "number" in v:
                metrics[en] = {
                    "value": v["number"],
                    "unit": v.get("number_unit"),  # 小时 for play_dura_count, else None
                    "name_cn": METRIC_EN2CN.get(en, en),
                }
        out[label] = metrics
    return out


def fetch_yesterday_top5(a):
    """Yesterday top-5 videos by play count (from dt_vid_playpercent)."""
    d = _get(a, "https://me.weibo.com/api/proxy/native/datavid_item",
            {"is_new": "1", "item_id": "dt_vid_playpercent"})
    # structure: data.card_group[1].card_group -> list of type-22 video items
    cg = (d.get("data") or {}).get("card_group") or []
    items = []
    for top in cg:
        inner = top.get("card_group") or []
        for v in inner:
            if v.get("type") == 22 and v.get("item_id"):
                items.append({
                    "rank": v.get("rank"),
                    "mid": str(v.get("item_id")),
                    "title": v.get("title"),
                    "duration_sec": v.get("duration"),
                    "publish_time": v.get("desc2"),
                    "play_yesterday": v.get("display_arrow_text"),
                    "scheme": v.get("scheme"),
                })
    return items


def main():
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    yest = fetch_yesterday(a)
    sev = fetch_7_30(a)
    time.sleep(0.5)
    top5 = fetch_yesterday_top5(a)

    snapshot = {
        "meta": {
            "uid": AUTHOR_UID,
            "source": ("me.weibo.com/api/proxy/native/datavidnew + "
                       "datanew_selectdata(video_core&period=1) + "
                       "datavid_item(dt_vid_playpercent)"),
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "note": ("creator-center video aggregates. Units are taken from the "
                     "API's own fields: yesterday 播放时长 unit = desc2_unit; "
                     "7d/30d play_dura_count unit = number_unit (小时). Per-video "
                     "traffic play_totallength unit = number_unit (秒)."),
        },
        "aggregates": {
            "yesterday": yest,
            "last_7d": sev.get("last_7d", {}),
            "last_30d": sev.get("last_30d", {}),
        },
        "yesterday_top5_play": top5,
    }

    os.makedirs(os.path.join(SRC_DIR, "data", "creator_center"), exist_ok=True)
    stamp = batch_stamp()
    path = os.path.join(SRC_DIR, "data", "creator_center", "creator_center_video_aggregates_%s.json" % stamp)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, ensure_ascii=False, indent=2)

    print("=== creator-center video aggregate snapshot ===")
    print("  yesterday:")
    for en, info in snapshot["aggregates"]["yesterday"].items():
        print("    %s (%s) = %s  (vs prev day %s)" % (
            en, info["name_cn"], info["value"], info["vs_prev_day"]))
    for label in ("last_7d", "last_30d"):
        m = snapshot["aggregates"][label]
        def g(en):
            x = m.get(en, {})
            u = x.get("unit")
            return "%s%s" % (x.get("value"), (" " + u) if u else "")
        print("  %s: play_count=%s play_dura_count=%s upload_count=%s "
              "reposts_count=%s comments_count=%s attitudes_count=%s" % (
                  label, g("play_count"), g("play_dura_count"), g("upload_count"),
                  g("reposts_count"), g("comments_count"), g("attitudes_count")))
    print("\n  yesterday top-5 videos by play:")
    for v in top5:
        print("    #%s play=%s mid=%s %s" % (
            v["rank"], v["play_yesterday"], v["mid"], (v["title"] or "")[:40]))
    print("\nsaved ->", path)


if __name__ == "__main__":
    main()
