"""Diagnose traffic parsing instability for one video.

Prints every select_subitems in the tab=traffic response with its PARENT card
item_id and the FULL videoonecore (all fields), so we can choose a robust
extraction rule (e.g. pick the card whose videoonecore.play_count is not None).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from auth import Auth
from crawl_video_stats import AUTHOR_UID, BASE, UA

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEOS = json.load(open(os.path.join(SRC_DIR, "data", "video", "author_videos.json"), encoding="utf-8"))["videos"]


def get_raw(a, params):
    r = a.session.get(BASE + "/datavidnew", params=params,
                      headers={"User-Agent": UA, "Referer": "https://me.weibo.com/"},
                      timeout=20000)
    return r.status_code, r.text


def walk_cards(obj, path, out):
    """For each select_subitems under a card_group, record (card_idx, item_id, subs)."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "select_subitems":
                # parent card: walk back up two levels: ...['data', i, 'card_group', 0]
                card_idx = path[-3] if len(path) >= 3 and path[-3] == "data" else None
                item_id = None
                out.append((card_idx, item_id, path, v))
            walk_cards(v, path + [k], out)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_cards(v, path + [i], out)


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "5341995724964351"
    v = next((x for x in VIDEOS if (x.get("mid_str") or x.get("mid")) == target), None)
    if not v:
        print("mid not found:", target)
        return
    oid = v.get("oid")
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    params = {"video_oid": oid, "mid": target, "blogger_uid": AUTHOR_UID, "tab": "traffic"}
    st, txt = get_raw(a, params)
    print("mid=%s oid=%s  HTTP %s bytes=%d" % (target, oid, st, len(txt)))
    j = json.loads(txt)
    data = j.get("data") or []
    print("data[] len=%d  item_ids=%s" % (len(data), [d.get("item_id") for d in data]))
    found = []
    walk_cards(j, [], found)
    print("select_subitems occurrences: %d" % len(found))
    for card_idx, item_id, path, subs in found:
        cid = data[card_idx].get("item_id") if isinstance(card_idx, int) and card_idx < len(data) else "?"
        print("  card[%s] item_id=%r path=%s keys=%s" % (card_idx, cid, path, list(subs.keys())))
        for pkey, pval in subs.items():
            core = (pval or {}).get("videoonecore") or {}
            pc = core.get("play_count")
            pl = core.get("play_totallength") or {}
            print("     period=%s play_count=%s play_totallength=%s %s"
                  % (pkey, pc, pl.get("number"), pl.get("number_unit")))


if __name__ == "__main__":
    main()
