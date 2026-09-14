"""Locate any play-count / counter field inside the captured statuses/show response.

Loads video_playback_capture.json, finds the record whose URL contains
'statuses/show', parses its JSON body, and recursively prints every key whose
name contains 'play' or 'count' (case-insensitive), with a short value preview.
This tells us whether the per-video play count is readable from the API at all.
"""

import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "video_playback_capture.json")


def walk(obj, path, out):
    if isinstance(obj, dict):
        for k, v in obj.items():
            klow = str(k).lower()
            if "play" in klow or "count" in klow:
                preview = str(v)
                if len(preview) > 120:
                    preview = preview[:120] + "..."
                out.append("%s.%s = %s" % (".".join(path), k, preview))
            walk(v, path + [str(k)], out)
    elif isinstance(obj, list):
        for i, v in enumerate(obj[:3]):  # sample first few list items
            walk(v, path + ["[%d]" % i], out)


def main():
    with open(SRC, "r", encoding="utf-8") as f:
        data = json.load(f)
    target = None
    for r in data["requests"]:
        if "statuses/show" in r.get("url", ""):
            target = r
            break
    if not target:
        print("statuses/show record NOT FOUND")
        return
    body = target.get("body") or ""
    try:
        obj = json.loads(body)
    except (json.JSONDecodeError, ValueError):
        print("body is not JSON; first 200 chars:\n%s" % body[:200])
        return
    out = []
    walk(obj, [], out)
    print("=== keys containing 'play' or 'count' in statuses/show ===")
    if out:
        for line in out:
            print(line)
    else:
        print("(none found)")
    print("\n=== top-level keys ===")
    print(list(obj.keys()) if isinstance(obj, dict) else type(obj))


if __name__ == "__main__":
    main()
