"""Pinpoint which beacons triggered a non-30 next_report_delay_seconds:
the first of each rep (seconds=STEP) or the last (seconds=duration cap)?"""
import json
import os
import re

EXP = os.path.dirname(os.path.abspath(__file__))
log = json.load(open(os.path.join(os.path.dirname(os.path.dirname(EXP)), "data", "probe", "probe_playduration_log.json"), encoding="utf-8"))
STEP = 30

for v in log:
    mid = v["mid"]
    cap = int(v["duration"])
    rows = []
    for b in v["beacons"]:
        d = re.search(r'"next_report_delay_seconds":\s*(\d+)', b.get("body", ""))
        delay = int(d.group(1)) if d else None
        sec = b["seconds"]
        role = "first" if sec == STEP else ("last" if sec >= cap else "mid")
        rows.append((b["rep"], sec, delay, role))
    nonstd = [r for r in rows if r[2] != 30]
    # classify non-standard delays by role
    by_role = {}
    for r in nonstd:
        by_role.setdefault(r[3], []).append(r[2])
    print("mid=%s cap=%ds  beacons=%d  nonstd=%d  by_role=%s"
          % (mid, cap, len(rows), len(nonstd),
             {k: sorted(set(vals)) for k, vals in by_role.items()}))
