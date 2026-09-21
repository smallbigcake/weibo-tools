"""Analyze probe_playduration_log.json: did the server reject or flag the
inflated (10x duration) watch-time claims? Summarize error_code and
next_report_delay_seconds across all beacons."""
import json
import os
import re

EXP = os.path.dirname(os.path.abspath(__file__))
log = json.load(open(os.path.join(os.path.dirname(os.path.dirname(EXP)), "data", "probe", "probe_playduration_log.json"), encoding="utf-8"))

total = 0
err = 0
delays = {}
anomalies = []
for v in log:
    mid = v["mid"]
    for b in v["beacons"]:
        total += 1
        body = b.get("body", "")
        if b.get("http") != 200:
            err += 1
            anomalies.append((mid, b.get("rep"), b.get("seconds"), "HTTP %s" % b.get("http")))
            continue
        m = re.search(r'"error_code":\s*(\d+)', body)
        if m and m.group(1) != "0":
            err += 1
            anomalies.append((mid, b.get("rep"), b.get("seconds"), "error_code %s" % m.group(1)))
        d = re.search(r'"next_report_delay_seconds":\s*(\d+)', body)
        if d:
            delays[d.group(1)] = delays.get(d.group(1), 0) + 1

print("total beacons :", total)
print("http/err !=0  :", err)
print("next_report_delay_seconds distribution:", delays)
print("anomalies (first 20):")
for a in anomalies[:20]:
    print("  ", a)
