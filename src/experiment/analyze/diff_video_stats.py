"""Diff two snapshots of the per-video creator-center stats and emit a markdown
report that lists ONLY the videos whose tracked metrics changed (plus newly
appeared / disappeared videos). Unchanged videos are omitted.

Inputs:
  current : src/data/video/author_video_stats.json            (this run)
  previous: src/data/video/archive/author_video_stats_*.json  (most recent = prior run)

Output:
  src/data/video/author_video_stats_diff_<data-datetime>.md   (# current data's ts, e.g. 2026-09-27_19-36-52)

Tracked, diffable metrics per video:
  total_traffic.play_count              (lifetime play count; API: 总播放量)
  total_traffic.play_totallength_sec    (lifetime watch duration, normalized seconds; API: 总播放时长)
  publish_week_daily.play_count         (post-publish 7-day DAILY play series; summed for display)
  publish_week_daily.play_totallength   (post-publish 7-day DAILY watch-time series, minutes)
  interactions.reposts_count / comments_count / attitudes_count   (from author_videos.json.statistics)
  clarity_score.score

NOTE: total_traffic is the video's LIFETIME total, NOT a 7-day window. A
negative delta on total_traffic.play_totallength_sec means the API revised the
lifetime total DOWN (observed on some old videos). publish_week_daily is the
post-publish 7-day window (frozen for videos >7 days old). interactions covers
ALL videos (unlike the old weibo_info source, which the API omits for old videos).
Categorical fields (traffic_source, portrait) are NOT diffed (only noted if a
video is new/removed). Readers fall back to the legacy keys (traffic_7d /
weibo_info) for pre-migration snapshots.

Usage:
  venvs/weibo-env/Scripts/python.exe src/experiment/analyze/diff_video_stats.py
"""
import os
import json
import sys
import glob
from datetime import datetime, timezone, timedelta

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CUR = os.path.join(SRC_DIR, "data", "video", "author_video_stats.json")
ARCHIVE_DIR = os.path.join(SRC_DIR, "data", "video", "archive")
OUT_DIR = os.path.join(SRC_DIR, "data", "video")
VIDEOS_LIST = os.path.join(SRC_DIR, "data", "video", "author_videos.json")

# canonical title source: author_videos.json (titles[].title / text).
# author_video_stats.json weibo_info is null for most videos, so do NOT rely on it.
VMAP = {}

BEIJING = timezone(timedelta(hours=8))


def bj(dt_str):
    if not dt_str:
        return "?"
    s = dt_str.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(s)
    except Exception:
        return dt_str
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(BEIJING).strftime("%Y-%m-%d %H:%M")


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def get(rec, *keys, default=None):
    cur = rec
    for k in keys:
        if not isinstance(cur, dict):
            return default
        cur = cur.get(k)
        if cur is None:
            return default
    return cur


def av_title(item):
    if not isinstance(item, dict):
        return ""
    tl = item.get("titles")
    if isinstance(tl, list) and tl:
        first = tl[0]
        t = first.get("title") if isinstance(first, dict) else first
        if t:
            return str(t)
    t = item.get("text")
    return (t or "").replace("\n", " ").strip()


def title_of(mid, rec):
    # prefer canonical title from author_videos.json; fall back to weibo_info
    t = av_title(VMAP.get(mid))
    if not t:
        t = get(rec, "weibo_info", "text") or get(rec, "weibo_info", "title")
    return (t or "").replace("\n", " ").strip()


def pub_time(mid):
    # publish time from author_videos.json create_time (epoch milliseconds, UTC)
    ct = (VMAP.get(mid) or {}).get("create_time")
    if not ct:
        return "?"
    try:
        return datetime.fromtimestamp(ct / 1000, tz=BEIJING).strftime("%Y-%m-%d")
    except Exception:
        return "?"


def _sum_series(series):
    s = 0
    for d in (series or []):
        n = d.get("number")
        if isinstance(n, (int, float)):
            s += n
    return s


def metrics(rec):
    # total_traffic is the lifetime total (legacy key: traffic_7d)
    t = get(rec, "total_traffic") or get(rec, "traffic_7d") or {}
    pw = rec.get("publish_week_daily") or {}
    # interactions covers ALL videos (legacy fallback: weibo_info, which the API
    # omits for old videos -> 0 there)
    inter = rec.get("interactions") or rec.get("weibo_info") or {}
    return {
        "play": get(t, "play_count") or 0,
        "len_sec": get(t, "play_totallength_sec") or 0,
        "len_unit": get(t, "play_totallength_unit") or "",
        "pub7_play": _sum_series(pw.get("play_count")),
        "pub7_len_min": _sum_series(pw.get("play_totallength")),
        "reposts": inter.get("reposts_count") or 0,
        "comments": inter.get("comments_count") or 0,
        "attitudes": inter.get("attitudes_count") or 0,
        "clarity": get(rec, "clarity_score", "score"),
    }


def fmt_delta_sec(d):
    if d == 0:
        return "0"
    sign = "+" if d > 0 else "-"
    a = abs(d)
    if a >= 3600:
        return "%s%.2fh" % (sign, a / 3600)
    if a >= 60:
        return "%s%.1fm" % (sign, a / 60)
    return "%s%ds" % (sign, a)


def fmt_num(v):
    return "" if v is None else str(v)


def humanize_delta(v):
    if v is None:
        return "?"
    if v == 0:
        return "0"
    return ("+" if v > 0 else "") + str(v)


def find_previous(cur):
    pat = os.path.join(ARCHIVE_DIR, "author_video_stats_*.json")
    files = glob.glob(pat)
    if not files:
        return None
    # archive filenames embed a UTC stamp (author_video_stats_2026-09-27_06-25-37.json)
    # that sorts lexicographically.
    files.sort()

    def _stamp_ymd(path):
        name = os.path.basename(path)
        stamp = name[len("author_video_stats_"):-len(".json")]
        # format A: 2026-09-27_06-25-37 ; legacy: 20260927T062537Z
        date_part = stamp.split("_", 1)[0].split("T", 1)[0]
        return date_part.replace("-", "")  # YYYYMMDD

    # reference date = the CURRENT snapshot's own date (when it was last crawled);
    # this is what "previous day" is relative to. Falls back to today (UTC).
    cu = (cur.get("meta", {}) or {}).get("updated_at")
    ref_ymd = cu[:10].replace("-", "") if cu else datetime.now(timezone.utc).strftime("%Y%m%d")

    # Always compare against the latest snapshot STRICTLY OLDER than the current
    # snapshot's date -- so a same-day archive created by today's own crawl is
    # skipped, and we never diff a snapshot against itself (which would show 0
    # changes). In a normal daily cadence this is simply "yesterday's snapshot".
    prior = [f for f in files if _stamp_ymd(f) < ref_ymd]
    if prior:
        chosen = prior[-1]
        print("[baseline] comparing against previous-day snapshot: %s"
              % os.path.basename(chosen))
    else:
        chosen = files[-1]
        print("[baseline] no prior-day snapshot; falling back to latest archive: %s"
              % os.path.basename(chosen))
    return chosen


def main():
    if not os.path.exists(CUR):
        print("current file missing: %s" % CUR)
        sys.exit(1)
    cur = load(CUR)
    # load canonical video list for titles (author_video_stats weibo_info is null for most)
    if os.path.exists(VIDEOS_LIST):
        vlist = load(VIDEOS_LIST)
        for v in vlist.get("videos", []):
            VMAP[str(v.get("mid_str") or v.get("mid"))] = v
    prev_path = find_previous(cur)
    if not prev_path or not os.path.exists(prev_path):
        print("no previous snapshot in %s -> cannot diff (first run?)" % ARCHIVE_DIR)
        # still emit a report noting no baseline
        prev = None
        prev_videos = {}
    else:
        prev = load(prev_path)
        prev_videos = prev.get("videos", {})

    cur_videos = cur.get("videos", {})

    changed = []   # (mid, title, cur_m, prev_m)
    new_videos = []  # (mid, title, cur_m)
    gone = []      # (mid, title, prev_m)
    unchanged = 0

    # metrics keys that should drive the "changed" decision. publish_week_daily is
    # excluded: it is frozen for videos >7 days old, so only its FIRST capture would
    # otherwise flag every old video; it is still shown as a column for context.
    DET_KEYS = ("play", "len_sec", "reposts", "comments", "attitudes", "clarity")

    for mid, rec in cur_videos.items():
        cm = metrics(rec)
        if mid in prev_videos:
            pm = metrics(prev_videos[mid])
            if any(cm[k] != pm[k] for k in DET_KEYS):
                changed.append((mid, title_of(mid, rec), cm, pm))
            else:
                unchanged += 1
        else:
            new_videos.append((mid, title_of(mid, rec), cm))

    for mid, rec in prev_videos.items():
        if mid not in cur_videos:
            gone.append((mid, title_of(mid, rec), metrics(rec)))

    cur_upd = bj(cur.get("meta", {}).get("updated_at"))
    prev_upd = bj(prev.get("meta", {}).get("updated_at")) if prev else "?"

    lines = []
    lines.append("# 创作者中心逐视频数据变动对比")
    lines.append("")
    lines.append("- 本次 (current): `%s`" % cur_upd)
    lines.append("- 前次 (previous): `%s`" % prev_upd)
    if prev_path:
        lines.append("- 前次文件: `%s`" % os.path.basename(prev_path))
    lines.append("- 变化视频: %d / 总视频(本次): %d  (新增 %d, 消失 %d, 完全不变 %d)"
                 % (len(changed), len(cur_videos), len(new_videos), len(gone), unchanged))
    lines.append("- 字段说明: `total_traffic`=视频**累计总量**(API 原字段名 总播放量/总播放时长, 非7天窗口); "
                 "`publish_week_daily`=发布后7天逐日数据(datanew_selectdata?period=7, 老视频冻结不变); "
                 "`interactions`=转发/评论/点赞累计(取自 author_videos.json.statistics, 覆盖全部视频)。")
    lines.append("- 累计时长出现负数 Δ 表示 API 把累计总量**往下调**(已观察到老视频累计时长被下调)。"
                 "发布7天播放/时长 列为该视频发布后7天窗口的**当前值**(非Δ)。以下仅列出有变化的视频。")
    lines.append("")

    if changed:
        lines.append("## 数据变化的视频")
        lines.append("")
        lines.append("| mid | 标题 | 发布时间 | 累计播放 Δ | 累计时长 Δ | 发布7天播放 | 发布7天时长(m) | 转发 Δ | 评论 Δ | 点赞 Δ | 清晰度 Δ |")
        lines.append("|-----|------|----------|-----------|-----------|------------|--------------|--------|--------|--------|----------|")
        # sort by absolute cumulative-play delta desc (most-affected first)
        for mid, t, cm, pm in sorted(changed, key=lambda x: abs(x[2]["play"] - x[3]["play"]), reverse=True):
            lines.append("| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s |" % (
                mid,
                (t[:48] + "…") if len(t) > 49 else t,
                pub_time(mid),
                humanize_delta(cm["play"] - pm["play"]),
                fmt_delta_sec(cm["len_sec"] - pm["len_sec"]),
                fmt_num(round(cm["pub7_play"])) if cm["pub7_play"] else "?",
                fmt_num(round(cm["pub7_len_min"], 1)) if cm["pub7_len_min"] else "?",
                humanize_delta(cm["reposts"] - pm["reposts"]),
                humanize_delta(cm["comments"] - pm["comments"]),
                humanize_delta(cm["attitudes"] - pm["attitudes"]),
                humanize_delta((cm["clarity"] or 0) - (pm["clarity"] or 0)),
            ))
        lines.append("")

    if new_videos:
        lines.append("## 新增视频 (前次无)")
        lines.append("")
        lines.append("| mid | 标题 | 发布时间 | 累计播放 | 累计时长 | 发布7天播放 | 发布7天时长(m) | 清晰度 |")
        lines.append("|-----|------|----------|---------|---------|------------|--------------|--------|")
        for mid, t, cm in new_videos:
            lines.append("| %s | %s | %s | %s | %s | %s | %s | %s |" % (
                mid, (t[:48] + "…") if len(t) > 49 else t, pub_time(mid),
                fmt_num(cm["play"]),
                fmt_delta_sec(cm["len_sec"]) if cm["len_sec"] else cm["len_unit"],
                fmt_num(round(cm["pub7_play"])) if cm["pub7_play"] else "?",
                fmt_num(round(cm["pub7_len_min"], 1)) if cm["pub7_len_min"] else "?",
                fmt_num(cm["clarity"])))
        lines.append("")

    if gone:
        lines.append("## 消失视频 (本次无)")
        lines.append("")
        lines.append("| mid | 标题 | 前次累计播放 |")
        lines.append("|-----|------|------------|")
        for mid, t, pm in gone:
            lines.append("| %s | %s | %s |" % (mid, (t[:48] + "…") if len(t) > 49 else t, fmt_num(pm["play"])))
        lines.append("")

    if not changed and not new_videos and not gone:
        lines.append("_本次与前次数据完全一致，无变化视频。_")
        lines.append("")

    out = "\n".join(lines) + "\n"
    # Report filename uses the CURRENT DATA's own timestamp (NOT the run time),
    # down to the second, matching the "本次" time shown in the report header.
    cu = (cur.get("meta", {}) or {}).get("updated_at")
    if cu:
        dt = datetime.fromisoformat(cu)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        stamp = dt.astimezone(BEIJING).strftime("%Y-%m-%d_%H-%M-%S")
    else:
        stamp = datetime.now(BEIJING).strftime("%Y-%m-%d_%H-%M-%S")
    out_path = os.path.join(OUT_DIR, "author_video_stats_diff_%s.md" % stamp)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(out)
    print("wrote ->", out_path)
    print("changed=%d new=%d gone=%d unchanged=%d" % (len(changed), len(new_videos), len(gone), unchanged))


if __name__ == "__main__":
    main()
