"""Dump the single-video detail endpoint responses from the single-video HAR.

Targets (all carry video_oid + mid + blogger_uid):
  datavidnew?video_oid=... (core stats, with tab variants)
  datavid_item?item_id=dt_onevid_portrait   (audience portrait)
  datavid_item?item_id=dt_onevid_score      (video score)
  datavid_item?item_id=dt_onevid_playratio  (play completion ratio)
  datavid_item?item_id=dt_onevid_scene      (play scene)
"""
import json

HAR = "src/tmp/video/weibo-video-statistic-single.har"

TARGETS = [
    "datavidnew?video_oid",
    "dt_onevid_portrait",
    "dt_onevid_score",
    "dt_onevid_playratio",
    "dt_onevid_scene",
]


def find_entries(h, sub):
    return [e for e in h["log"]["entries"] if sub in e["request"]["url"]]


def main():
    h = json.load(open(HAR, encoding="utf-8"))
    for sub in TARGETS:
        entries = find_entries(h, sub)
        # dedupe by url
        seen = set()
        for e in entries:
            u = e["request"]["url"]
            if u in seen:
                continue
            seen.add(u)
            body = (e["response"].get("content", {}) or {}).get("text", "")
            print("=" * 100)
            print("TARGET:", sub)
            print("URL:", u[:200])
            print("status:", e["response"].get("status"))
            try:
                j = json.loads(body)
                print(json.dumps(j, ensure_ascii=False, indent=2)[:3500])
            except Exception:
                print(body[:3000])
            print()


if __name__ == "__main__":
    main()
