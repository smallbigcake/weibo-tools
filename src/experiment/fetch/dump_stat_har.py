"""Dump the full response bodies of key statistic endpoints from the HAR.

Targets (by URL substring):
  - datavidnew
  - datanew_selectdata?module=video_core&period=1   (yesterday summary, 6 metrics)
  - datavid_item?item_id=dt_vid_playpercent         (completion / play percent)
  - datavid_item?item_id=dt_vid_list                (per-video list)
  - datavid_all                                     (all videos w/ exposure)
"""
import json

HAR = "src/tmp/video/weibo-video-statistic.har"

TARGETS = [
    "datavidnew",
    "datanew_selectdata?module=video_core&period=1",
    "datavid_item?is_new=1&item_id=dt_vid_playpercent",
    "datavid_item?is_new=1&item_id=dt_vid_list",
    "datavid_all",
]


def find_entries(h, sub):
    out = []
    for e in h["log"]["entries"]:
        if sub in e["request"]["url"]:
            out.append(e)
    return out


def pretty(j):
    return json.dumps(j, ensure_ascii=False, indent=2)


def main():
    h = json.load(open(HAR, encoding="utf-8"))
    for sub in TARGETS:
        entries = find_entries(h, sub)
        print("=" * 100)
        print("TARGET:", sub, "  (%d entries)" % len(entries))
        # show just the first (or the one without cursor for datavid_all)
        if sub == "datavid_all":
            # pick the one with no cursor (first page)
            entries = [e for e in entries if "cursor=" not in e["request"]["url"]] or entries
        e = entries[0]
        body = (e["response"].get("content", {}) or {}).get("text", "")
        print("URL:", e["request"]["url"])
        print("status:", e["response"].get("status"))
        try:
            j = json.loads(body)
            print(pretty(j)[:4000])
        except Exception:
            print(body[:3000])


if __name__ == "__main__":
    main()
