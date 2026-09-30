"""Fetch ALL historical videos of the author account (uid = AUTHOR_UID) via the
creator-center `getVideoList` endpoint, recording every metadata field returned,
and persist to a data file that can be re-run to UPDATE (new videos appended,
existing videos' metadata refreshed).

Output: src/data/creator_center/creator_center_author_videos.json
  {
    "meta": { uid, source, updated_at, total, last_run_new,
              last_run_updated, prev_updated_at, first_created, last_created },
    "videos": [ <full raw item from API, newest-first> ]
  }

Update semantics:
  * Default run does a FULL walk (paginate to the end) so every video's latest
    metadata (play_count, etc.) is refreshed, and any newly published video is
    added. Re-running is safe: existing videos are overwritten by mid.
  * `--incremental` stops at the first page that is entirely already-known
    (list is newest-first), which is much faster but does NOT refresh stats of
    older videos.

Notes:
  * Weibo rate-limits rapid pagination (a 400 appears if pages are hit too fast),
    so we sleep 1s between pages and retry a few times on non-200.
  * End-of-list is signalled by an empty `videos` array or next_cursor in
    {"", "0", "-1"}.

Usage:
  venvs/test-env/Scripts/python.exe src/experiment/fetch/fetch_recent_videos.py [--incremental]
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
OUT = os.path.join(SRC_DIR, "data", "creator_center", "creator_center_author_videos.json")
PAGE_DELAY = 1.0
END_CURSORS = {"", "0", "-1"}


from datetime_util import utc8_from_ms  # noqa: E402  (server-ms -> Beijing display)


def fetch_page(a, cursor, tries=4):
    for i in range(tries):
        r = a.session.get(
            ENDPOINT,
            params={"cursor": cursor, "count": "20", "status": "0"},
            headers={"User-Agent": UA, "Referer": "https://weibo.com/creator"},
            timeout=20000,
        )
        if r.status_code == 200:
            return r, None
        time.sleep(3 * (i + 1))  # backoff 3s, 6s, 9s...
    return r, "HTTP %s: %s" % (r.status_code, r.text[:200])


def main():
    incremental = "--incremental" in sys.argv[1:]
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()

    store = {}
    prev_meta = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            prev = json.load(f)
        for v in prev.get("videos", []):
            key = str(v.get("mid_str") or v.get("mid"))
            if key:
                store[key] = v
        prev_meta = prev.get("meta", {})
    print("loaded %d existing videos from store" % len(store))

    new_count = 0
    updated_count = 0
    cursor = "0"
    page = 0
    overload = None
    while True:
        r, err = fetch_page(a, cursor)
        if err:
            print("stop after page %d: %s" % (page, err))
            break
        d = r.json().get("data") or {}
        if overload is None and "video_overload_count" in d:
            overload = d.get("video_overload_count")
        videos = d.get("videos") or []
        if not videos:
            break

        all_known = True
        for it in videos:
            key = str(it.get("mid_str") or it.get("mid"))
            if key in store:
                store[key] = it
                updated_count += 1
            else:
                store[key] = it
                new_count += 1
                all_known = False

        if incremental and all_known:
            print("incremental: page %d all known -> stop early" % page)
            break

        cursor = str(d.get("next_cursor") or "")
        if cursor in END_CURSORS:
            break
        page += 1
        time.sleep(PAGE_DELAY)

    items = list(store.values())
    items.sort(key=lambda v: v.get("create_time", 0), reverse=True)
    first_ct = items[-1].get("create_time") if items else None
    last_ct = items[0].get("create_time") if items else None

    out = {
        "meta": {
            "uid": AUTHOR_UID,
            "source": ENDPOINT,
            "status_filter": 0,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "total": len(items),
            "last_run_new": new_count,
            "last_run_updated": updated_count,
            "prev_updated_at": prev_meta.get("updated_at"),
            "first_created_utc8": utc8_from_ms(first_ct),
            "last_created_utc8": utc8_from_ms(last_ct),
        },
        "videos": items,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    from data_archive import archive_existing
    archived = archive_existing(OUT)  # keep the previous snapshot before overwrite
    if archived:
        print("archived previous ->", archived)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print("\n=== done ===")
    print("total videos stored :", len(items))
    print("new this run        :", new_count)
    print("updated this run    :", updated_count)
    print("date range (BJ)     : %s  ->  %s" %
          (utc8_from_ms(first_ct), utc8_from_ms(last_ct)))
    if overload is not None:
        print("api video_overload_count:", overload)
    print("saved ->", OUT)


if __name__ == "__main__":
    main()
