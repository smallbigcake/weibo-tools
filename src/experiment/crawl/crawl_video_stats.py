"""Crawl per-video statistics for ALL author videos from the creator-center
(me.weibo.com) single-video detail endpoints, and save to a data file.

For each video (oid + mid from src/data/creator_center/creator_center_author_videos.json) we call the same
endpoints the single-video detail page fires, all carrying
video_oid + mid + blogger_uid:

  datavidnew?video_oid=<oid>&mid=<mid>&blogger_uid=<uid>            -> weibo_info
  datavidnew?...&tab=traffic                                      -> lifetime totals (API name: 总播放量 / 总播放时长)
  datavidnew?...&tab=diagnosis                                    -> diagnosis
  datavid_item?item_id=dt_onevid_score                            -> clarity score
  datavid_item?item_id=dt_onevid_playratio                        -> play ratio
  datavid_item?item_id=dt_onevid_scene                            -> traffic source
  datavid_item?item_id=dt_onevid_portrait                         -> audience portrait
  datanew_selectdata?module=vid_one_core&period=7                 -> post-publish 7-day DAILY (play_count / play_totallength)

All JSON keys are English and follow the ORIGINAL API field names. Chinese
appears only as values (e.g. label "关注", text "作品画质清晰度过低").

Output: src/data/creator_center/creator_center_author_video_stats.json
  { meta:{...}, videos:{ <mid>: {
        mid, video_oid, weibo_info,
        total_traffic:      {period, play_count, play_totallength,
                             play_totallength_unit, play_totallength_sec}   # LIFETIME totals (API 总播放量/总播放时长)
        publish_week_daily: {play_count:[{date,number}],                     # post-publish 7-day DAILY (datanew_selectdata?period=7)
                             play_totallength:[{date,number,unit}]}
        interactions:      {reposts_count, comments_count,
                             attitudes_count}   # from author_videos.json.statistics (covers ALL videos)
        diagnosis, clarity_score, play_ratio, traffic_source, portrait } } }

  Field renames: the OLD key "traffic_7d" was renamed to "total_traffic"
  because the data is the video's LIFETIME totals (API: 总播放量/总播放时长),
  NOT a 7-day window. The "7" was merely the only select_subitems key.
  The real post-publish 7-day data lives under "publish_week_daily".
  play_totallength is reported in an auto-scaling unit (秒/分钟/小时); we keep
  the raw value + number_unit AND a normalized play_totallength_sec (seconds).

Resumable: mids already present in the output file are skipped, so the script
can be re-run to continue after an interruption. Pass --force to re-crawl every
video (e.g. after a parser/normalization fix).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/crawl/crawl_video_stats.py [--limit N] [--delay 0.8] [--force] [--diff]
  --diff : also run diff_video_stats.py (Phase 3) right after the crawl, in the
           same process, so the daily report is produced automatically (no manual
           second step). Baseline = latest snapshot STRICTLY older than the new
           data's date (i.e. the previous day), per diff_video_stats.py logic.
"""
import os as _os
import re
import json as _json
# src/experiment/<topic>/<script>.py -> project root (holds the git-ignored config/)
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
VIEWER_UID = _CFG.get('viewer_uid')
import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "fetch"))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from constants import BROWSER_USER_AGENT as UA
SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEOS_JSON = os.path.join(SRC_DIR, "data", "creator_center", "creator_center_author_videos.json")
OUT_JSON = os.path.join(SRC_DIR, "data", "creator_center", "creator_center_author_video_stats.json")
BASE = "https://me.weibo.com/api/proxy/native"


def _get(a, path, params, delay, tag=""):
    time.sleep(delay)
    for attempt in range(4):
        try:
            r = a.session.get(BASE + path, params=params,
                              headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                              timeout=20000)
        except Exception as ex:
            print("  HTTP-EXC %s attempt=%d %s -> %s" % (tag, attempt, path, ex))
            time.sleep(2)
            continue
        if r.status_code == 200:
            return r.json()
        # Non-200: print REAL HTTP detail. Do not guess at the cause.
        print("  HTTP %s %s params=%s  body=%s"
              % (r.status_code, path, params, r.text[:800]))
        if r.status_code == 400:
            time.sleep(2 * (attempt + 1))
            continue
        time.sleep(1)
    print("  GAVE-UP %s %s after 4 retries" % (tag, path))
    return None


def parse_weibo_info(default_json):
    if not default_json:
        return None
    for item in (default_json.get("data") or []):
        wi = item.get("weibo_info")
        if wi:
            return {
                "text": wi.get("text"),
                "created_at": wi.get("created_at"),
                "reposts_count": wi.get("reposts_count"),
                "comments_count": wi.get("comments_count"),
                "attitudes_count": wi.get("attitudes_count"),
                "source": wi.get("source"),
                "pic": (wi.get("pic_ids") or []),
            }
    return None


def find_key(obj, key):
    """Recursively return the first value stored under dict key `key`."""
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


# The API reports play_totallength in a unit that AUTO-SCALES with magnitude
# (秒 for small values, 分钟 for larger, 小时 for huge). We keep the original
# value + unit UNTOUCHED and store an EXTRA normalized field
# `play_totallength_sec` (seconds) for fast cross-video computation (sorting /
# aggregation). CONVENTION: reports/display must use the ORIGINAL measurement
# (play_totallength + play_totallength_unit); the _sec field is computation-only.
UNIT_TO_SEC = {"秒": 1, "分钟": 60, "小时": 3600}


def parse_traffic(traffic_json):
    if not traffic_json:
        return None
    # A tab=traffic response can contain MULTIPLE select_subitems (one per bundled
    # card: traffic / playratio / scene / portrait), and several are empty stubs.
    # Collect EVERY select_subitems and pick the one whose 7-day videoonecore is
    # actually populated (play_count present) so we never store a blank/placeholder.
    candidates = []

    def _collect(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if k == "select_subitems":
                    candidates.append(v)
                _collect(v)
        elif isinstance(o, list):
            for x in o:
                _collect(x)

    _collect(traffic_json)
    vc = None
    for subs in candidates:
        c = ((subs or {}).get("7") or {}).get("videoonecore") or {}
        if (c.get("play_count") or {}).get("number") is not None:
            vc = c
            break
    if vc is None and candidates:
        vc = ((candidates[0] or {}).get("7") or {}).get("videoonecore") or {}
    if not vc:
        return None
    pc = vc.get("play_count") or {}
    pl = vc.get("play_totallength") or {}
    num = pl.get("number")
    unit = pl.get("number_unit")
    sec = num * UNIT_TO_SEC[unit] if (num is not None and unit in UNIT_TO_SEC) else None
    return {
        "period": "total",  # API returns lifetime totals (总播放量/总播放时长), not a 7-day window
        "play_count": pc.get("number"),
        "play_totallength": num,
        "play_totallength_unit": unit,
        "play_totallength_sec": sec,  # normalized, computation-only (see comment above)
    }


def _age_days(create_time):
    """Age of a video in days from author_videos.json create_time (epoch ms)."""
    if not create_time:
        return None
    try:
        ct = datetime.fromtimestamp(create_time / 1000, tz=timezone.utc)
    except Exception:
        return None
    return (datetime.now(timezone.utc) - ct).days


def _extract_unit(resp):
    """Pull the play_totallength unit (e.g. 分钟) out of the API desc string
    like '（单位：分钟）'."""
    if not resp:
        return None
    desc = ((resp.get("data") or {}).get("desc") or "")
    m = re.search(r"单位[：:]\s*(\S+?)\s*[)）]", desc)
    if m:
        return m.group(1)
    return None


def parse_select_series(resp, item_subtype):
    """Parse a datanew_selectdata?period=7 response into a list of
    {date, number} for the given item_subtype (post-publish 7-day daily)."""
    if not resp:
        return None
    groups = (resp.get("data") or {}).get("groups") or {}
    series = groups.get("7") or groups.get("默认") or {}
    lst = series.get(item_subtype) or []
    out = []
    for e in lst:
        n = e.get("number")
        try:
            num = float(n)
        except (TypeError, ValueError):
            num = None
        out.append({"date": e.get("date"), "number": num})
    return out


def fetch_publish_week(a, oid, mid, delay):
    """Fetch the post-publish 7-day DAILY series (play_count + play_totallength)
    from datanew_selectdata?period=7 and return
    {play_count:[{date,number}], play_totallength:[{date,number,unit}]}."""
    pw = {"play_count": [], "play_totallength": []}
    for item_subtype, store_key in (("play_count", "play_count"),
                                    ("play_totallength", "play_totallength")):
        params = {"module": "vid_one_core", "period": 7,
                  "item_type": "videoonecore", "item_subtype": item_subtype,
                  "select_oid": oid, "blogger_uid": AUTHOR_UID}
        resp = _get(a, "/datanew_selectdata", params, delay, tag=mid)
        series = parse_select_series(resp, item_subtype) or []
        unit = _extract_unit(resp) if item_subtype == "play_totallength" else None
        pw[store_key] = [{"date": e["date"], "number": e["number"],
                           **({"unit": unit} if unit else {})} for e in series]
    return pw


def interactions_from(vitem):
    """Cumulative reposts/comments/attitudes from author_videos.json.statistics
    (covers ALL videos, unlike weibo_info which the API omits for old videos)."""
    if not isinstance(vitem, dict):
        return None
    st = vitem.get("statistics")
    if not isinstance(st, dict):
        return None
    return {
        "reposts_count": st.get("reposts_count"),
        "comments_count": st.get("comment_count"),
        "attitudes_count": st.get("attitude_count"),
    }


def parse_diagnosis(diag_json):
    if not diag_json:
        return None
    for item in (diag_json.get("data") or []):
        if item.get("item_id") == "dt_onevid_diagnosis2":
            items = []
            for d in (item.get("diagnosis_items") or {}).get("list") or []:
                items.append({"text": d.get("text"),
                              "status": d.get("status"),
                              "type": d.get("type")})
            sug = item.get("suggestion") or {}
            return {"desc": item.get("desc"),
                    "items": items,
                    "suggestion": sug.get("text")}
    return None


def parse_clarity(score_json):
    if not score_json:
        return None
    d = score_json.get("data") or {}
    return {"score": d.get("score"),
            "score_unit": d.get("score_unit"),
            "text": d.get("text"),
            "desc_list": d.get("desc_list"),
            "suggestion": (d.get("suggestion") or {}).get("text")}


def parse_playratio(pr_json):
    if not pr_json:
        return None
    d = pr_json.get("data") or {}
    groups = d.get("groups") or {}
    rows = groups.get("") or groups.get("默认") or []
    return [{"desc1": r.get("desc1"), "desc2": r.get("desc2"),
             "desc2_unit": r.get("desc2_unit"),
             "vs_peers_text": r.get("desc3_text"),
             "vs_peers_end": r.get("desc3_end")} for r in rows]


def parse_scene(scene_json):
    if not scene_json:
        return None
    d = scene_json.get("data") or {}
    return [{"name": r.get("name"), "number": r.get("number"),
             "percent": r.get("percent")} for r in (d.get("groups") or [])]


def parse_portrait(portrait_json):
    # Store the native API structure as-is (keys are API-native:
    # type/item_id/card_group/...); Chinese appears only as values.
    # The API uses empty-string keys (e.g. groups:{"":[...]}); rename to
    # "default" so every JSON key stays English (per project rule).
    if not portrait_json:
        return None
    return _normalize_empty_keys(portrait_json.get("data"))


def _normalize_empty_keys(o):
    if isinstance(o, dict):
        return {("default" if k == "" else k): _normalize_empty_keys(v)
                for k, v in o.items()}
    if isinstance(o, list):
        return [_normalize_empty_keys(x) for x in o]
    return o


def crawl_one(a, oid, mid, delay, vitem=None, skip_pubweek=False):
    p = {"video_oid": oid, "mid": mid, "blogger_uid": AUTHOR_UID}
    default = _get(a, "/datavidnew", p, delay, tag=mid)
    traffic = _get(a, "/datavidnew", {**p, "tab": "traffic"}, delay, tag=mid)
    diagnosis = _get(a, "/datavidnew", {**p, "tab": "diagnosis"}, delay, tag=mid)
    score = _get(a, "/datavid_item", {**p, "is_new": "1",
                                      "item_id": "dt_onevid_score"}, delay, tag=mid)
    playratio = _get(a, "/datavid_item", {**p, "is_new": "1",
                                          "item_id": "dt_onevid_playratio"}, delay, tag=mid)
    scene = _get(a, "/datavid_item", {**p, "is_new": "1",
                                      "item_id": "dt_onevid_scene"}, delay, tag=mid)
    portrait = _get(a, "/datavid_item", {**p, "is_new": "1",
                                         "item_id": "dt_onevid_portrait"}, delay, tag=mid)
    pubweek = None if skip_pubweek else fetch_publish_week(a, oid, mid, delay)
    return {
        "mid": mid,
        "video_oid": oid,
        "weibo_info": parse_weibo_info(default),
        "total_traffic": parse_traffic(traffic),
        "publish_week_daily": pubweek,
        "interactions": interactions_from(vitem),
        "diagnosis": parse_diagnosis(diagnosis),
        "clarity_score": parse_clarity(score),
        "play_ratio": parse_playratio(playratio),
        "traffic_source": parse_scene(scene),
        "portrait": parse_portrait(portrait),
    }


def merge_static(new_rec, old_rec):
    """Preserve STATIC fields the API stops returning on re-crawl.

    The creator-center API only returns `weibo_info` for recently-published
    videos (empirically within ~24 days). On a --force re-crawl after the video
    ages past that window, the fresh parse yields None and would otherwise
    OVERWRITE (delete) the previously-captured value. Keep the old weibo_info
    instead. Dynamic fields (traffic_7d, clarity_score, play_ratio, ...) are NOT
    touched here and keep refreshing normally.
    """
    if new_rec.get("weibo_info") is None and old_rec.get("weibo_info"):
        new_rec["weibo_info"] = old_rec["weibo_info"]
    return new_rec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="max videos to crawl (0=all)")
    ap.add_argument("--delay", type=float, default=0.8, help="seconds between calls")
    ap.add_argument("--force", action="store_true",
                    help="re-crawl ALL videos, ignoring already-crawled mids "
                         "(use after a parser/normalization fix)")
    ap.add_argument("--diff", action="store_true",
                    help="after crawling, automatically run diff_video_stats.py "
                         "(Phase 3) in the SAME process, comparing the new "
                         "snapshot against the previous-day archive")
    args = ap.parse_args()

    videos = json.load(open(VIDEOS_JSON, encoding="utf-8"))["videos"]
    # Always load the previous snapshot: used for resume-skip AND as a merge
    # source so a --force re-crawl never NULLs out static fields (e.g.
    # weibo_info) that the API stops returning for older videos.
    if os.path.exists(OUT_JSON):
        existing = json.load(open(OUT_JSON, encoding="utf-8"))
        prev_videos = existing.get("videos", {})
    else:
        existing = {}
        prev_videos = {}
    done = set(prev_videos.keys())

    def _needs_refresh(mid):
        # a normal (non-force) run re-crawls any video still missing the newer
        # fields, so every snapshot stays in the latest format without --force.
        rec = prev_videos.get(mid) or {}
        return ("publish_week_daily" not in rec) or ("interactions" not in rec)

    if args.force:
        store = {"meta": {}, "videos": {}}
        queue = list(videos)
    else:
        store = existing
        queue = [v for v in videos
                 if (v.get("mid_str") or v.get("mid")) not in done
                 or _needs_refresh(str(v.get("mid_str") or v.get("mid")))]

    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    from data_archive import archive_existing
    archived = archive_existing(OUT_JSON)  # keep the previous snapshot before overwrite
    if archived:
        print("archived previous ->", archived)

    queue = (list(videos) if args.force else
             [v for v in videos
              if (v.get("mid_str") or v.get("mid")) not in done
              or _needs_refresh(str(v.get("mid_str") or v.get("mid")))])
    if args.limit:
        queue = queue[:args.limit]
    print("total videos=%d, already done=%d, to crawl=%d%s" % (
        len(videos), len(done), len(queue),
        " (--force)" if args.force else ""))

    ok = 0
    for i, v in enumerate(queue, 1):
        oid = v.get("oid")
        mid = v.get("mid_str") or v.get("mid")
        if not oid or not mid:
            continue
        try:
            # post-publish-7d daily data is FROZEN for videos older than 7 days,
            # so skip re-fetching it once captured (saves ~2 API calls per old video).
            age_days = _age_days(v.get("create_time"))
            skip_pubweek = (age_days is not None and age_days > 7
                            and (prev_videos.get(mid) or {}).get("publish_week_daily"))
            old = prev_videos.get(mid)
            has_core = old and old.get("total_traffic") is not None
            if args.force or not has_core:
                # full crawl (first time, or missing core lifetime data)
                rec = crawl_one(a, oid, mid, args.delay, vitem=v, skip_pubweek=bool(skip_pubweek))
                if skip_pubweek:
                    # keep the previously captured frozen series
                    rec["publish_week_daily"] = old["publish_week_daily"]
                if not args.force:
                    rec = merge_static(rec, old or {})
            else:
                # light refresh: keep existing core data, only fill the new fields
                # (publish_week_daily + interactions) so a normal run is fast.
                rec = old
                if not skip_pubweek:
                    rec["publish_week_daily"] = fetch_publish_week(a, oid, mid, args.delay)
                rec["interactions"] = interactions_from(v)
            store["videos"][mid] = rec
            ok += 1
            tt = (rec.get("total_traffic") or {})
            pw = rec.get("publish_week_daily") or {}
            pw_play = sum(int(d["number"]) for d in pw.get("play_count", [])
                          if isinstance(d.get("number"), (int, float)))
            print("[%d/%d] %s total_play=%s len=%ss (%s) pub7_play=%d clarity=%s" % (
                i, len(queue), mid, tt.get("play_count"),
                tt.get("play_totallength_sec"), tt.get("play_totallength_unit"), pw_play,
                (rec.get("clarity_score") or {}).get("score")))
        except Exception as ex:
            print("  ERR %s: %s" % (mid, ex))
        if i % 10 == 0:
            # periodic flush (keeps output flowing to avoid idle timeouts)
            _flush(store)
            print("  ... %d/%d crawled (stored=%d)" % (i, len(queue), len(store["videos"])))

    _flush(store)
    print("done. crawled this run=%d, total stored=%d" % (ok, len(store["videos"])))

    if args.diff:
        _run_diff()


def _flush(store):
    store["meta"] = {
        "uid": AUTHOR_UID,
        "source": ("me.weibo.com/api/proxy/native/datavidnew(tab=traffic|diagnosis)"
                   " + datavid_item(dt_onevid_score|playratio|scene|portrait)"
                   " + datanew_selectdata(period=7) for post-publish 7-day daily"),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "total_videos": len(store["videos"]),
        "note": ("per-video statistics; JSON keys follow original API field names; "
                 "Chinese kept only as values"),
    }
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, indent=2)


def _run_diff():
    """Phase 3: diff the just-written snapshot against the previous-day archive.

    Imported lazily so this module has no hard dependency on analyze/ at import
    time, and so the diff runs in the SAME process right after the crawl (no
    separate manual step needed)."""
    print("\n=== Phase 3: diff new snapshot vs previous-day archive ===")
    analyze_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "analyze")
    if analyze_dir not in sys.path:
        sys.path.insert(0, analyze_dir)
    try:
        from diff_video_stats import main as diff_main
    except Exception as ex:
        print("  could not import diff_video_stats: %s" % ex)
        return
    diff_main()


if __name__ == "__main__":
    main()
