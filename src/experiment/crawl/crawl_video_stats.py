"""Crawl per-video statistics for ALL author videos from the creator-center
(me.weibo.com) single-video detail endpoints, and save to a data file.

For each video (oid + mid from src/data/video/author_videos.json) we call the same
endpoints the single-video detail page fires, all carrying
video_oid + mid + blogger_uid:

  datavidnew?video_oid=<oid>&mid=<mid>&blogger_uid=<uid>            -> weibo_info
  datavidnew?...&tab=traffic                                      -> last-7d totals
  datavidnew?...&tab=diagnosis                                    -> diagnosis
  datavid_item?item_id=dt_onevid_score                            -> clarity score
  datavid_item?item_id=dt_onevid_playratio                        -> play ratio
  datavid_item?item_id=dt_onevid_scene                            -> traffic source
  datavid_item?item_id=dt_onevid_portrait                         -> audience portrait

All JSON keys are English and follow the ORIGINAL API field names. Chinese
appears only as values (e.g. label "关注", text "作品画质清晰度过低").

Output: src/data/video/author_video_stats.json
  { meta:{...}, videos:{ <mid>: { mid, video_oid, weibo_info, traffic_7d,
                                diagnosis, clarity_score, play_ratio,
                                traffic_source, portrait } } }

  traffic_7d.play_totallength is reported by the API in an auto-scaling unit
  (秒/分钟/小时). We keep the raw value + its number_unit, AND a normalized
  play_totallength_sec (seconds) so values are comparable across videos.

Resumable: mids already present in the output file are skipped, so the script
can be re-run to continue after an interruption. Pass --force to re-crawl every
video (e.g. after a parser/normalization fix).

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/crawl/crawl_video_stats.py [--limit N] [--delay 0.8]
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
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEOS_JSON = os.path.join(SRC_DIR, "data", "video", "author_videos.json")
OUT_JSON = os.path.join(SRC_DIR, "data", "video", "author_video_stats.json")
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
        "period": "last_7d",
        "play_count": pc.get("number"),
        "play_totallength": num,
        "play_totallength_unit": unit,
        "play_totallength_sec": sec,  # normalized, computation-only (see comment above)
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


def crawl_one(a, oid, mid, delay):
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
    return {
        "mid": mid,
        "video_oid": oid,
        "weibo_info": parse_weibo_info(default),
        "traffic_7d": parse_traffic(traffic),
        "diagnosis": parse_diagnosis(diagnosis),
        "clarity_score": parse_clarity(score),
        "play_ratio": parse_playratio(playratio),
        "traffic_source": parse_scene(scene),
        "portrait": parse_portrait(portrait),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="max videos to crawl (0=all)")
    ap.add_argument("--delay", type=float, default=0.8, help="seconds between calls")
    ap.add_argument("--force", action="store_true",
                    help="re-crawl ALL videos, ignoring already-crawled mids "
                         "(use after a parser/normalization fix)")
    args = ap.parse_args()

    videos = json.load(open(VIDEOS_JSON, encoding="utf-8"))["videos"]
    # resume (unless --force)
    if os.path.exists(OUT_JSON) and not args.force:
        existing = json.load(open(OUT_JSON, encoding="utf-8"))
        done = set(existing.get("videos", {}).keys())
        store = existing
    else:
        done = set()
        store = {"meta": {}, "videos": {}}

    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    from data_archive import archive_existing
    archived = archive_existing(OUT_JSON)  # keep the previous snapshot before overwrite
    if archived:
        print("archived previous ->", archived)

    queue = [v for v in videos
             if (v.get("mid_str") or v.get("mid")) not in done]
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
            rec = crawl_one(a, oid, mid, args.delay)
            store["videos"][mid] = rec
            ok += 1
            t7 = (rec.get("traffic_7d") or {})
            print("[%d/%d] %s play7d=%s len=%ss (%s) clarity=%s" % (
                i, len(queue), mid, t7.get("play_count"),
                t7.get("play_totallength_sec"), t7.get("play_totallength_unit"),
                (rec.get("clarity_score") or {}).get("score")))
        except Exception as ex:
            print("  ERR %s: %s" % (mid, ex))
        if i % 10 == 0:
            # periodic flush (keeps output flowing to avoid idle timeouts)
            _flush(store)
            print("  ... %d/%d crawled (stored=%d)" % (i, len(queue), len(store["videos"])))

    _flush(store)
    print("done. crawled this run=%d, total stored=%d" % (ok, len(store["videos"])))


def _flush(store):
    store["meta"] = {
        "uid": AUTHOR_UID,
        "source": ("me.weibo.com/api/proxy/native/datavidnew(tab=traffic|diagnosis)"
                   " + datavid_item(dt_onevid_score|playratio|scene|portrait)"),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "total_videos": len(store["videos"]),
        "note": ("per-video statistics; JSON keys follow original API field names; "
                 "Chinese kept only as values"),
    }
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(store, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
