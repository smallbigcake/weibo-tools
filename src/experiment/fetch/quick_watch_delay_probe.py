"""Controlled experiment for Weibo FastWatch: does REAL-TIME playback pacing
(delay ~= cadence) make the server credit a single video's play_count?

WHY THE OLD DESIGN WAS WRONG
--------------------------------------------------------------------------
The first version of this probe compared creator-center aggregates
(yesterday / last-7d / last-30d). Those windows CLOSE at yesterday, so a
replay performed TODAY can never move them until tomorrow -- a same-day
pre/post diff would always read 0 and falsely conclude "replay is ignored".
The correct real-time signal is the PER-VIDEO play_count returned by
getVideoList (statistics.play_count), which is a live running total that
includes today.

EXPERIMENT PROTOCOL
--------------------------------------------------------------------------
1. Pick a target video V (--mid, or the newest short video by default) and a
   control video C (auto: another recent video, or --control-mid).
2. Snapshot live play_count for V and C via getVideoList (author session).
3. Replay V as the VIEWER at the server-hinted pace: --delay == --cadence
   (default 30s real between heartbeats). One full heartbeat sequence per
   --rounds.
4. Re-snapshot play_count for V and C.
5. Report dV = pc1_V - pc0_V and dC = pc1_C - pc0_C.
     - dV == rounds (or > 0) and dC ~= 0  => server CREDITS real-time replay
       (the 1s compression was the problem; slow method is viable, but
       scales poorly: ~duration seconds of real time per video).
     - dV == 0 and dC == 0                => replay is dropped entirely
       (FastWatch as a concept does not move play_count).

A control video is essential: low-traffic author videos can still get organic
+1s, so dV alone is noisy; dV - dC isolates the replay contribution.

Run from the project root:

  venvs/weibo-env/Scripts/python.exe src/experiment/fetch/quick_watch_delay_probe.py \
      [--mid <mid>] [--control-mid <mid>] [--delay 30] [--cadence 30] \
      [--rounds 1] [--contribution 0] [--with-aggregate]

If --mid is omitted, the newest video with duration < --max-dur is used.
--with-aggregate (optional) also snapshots creator-center aggregates, but note
those are LAGGED by one day and should be re-read tomorrow for a real signal.
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
import os
import sys
import time
from datetime import datetime, timezone
from urllib.parse import urlencode

SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, SRC_DIR)
sys.path.insert(0, os.path.join(SRC_DIR, 'experiment', 'fetch'))
from auth import Auth

REPORT_URL = "https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json"
GETVIDEO_URL = "https://weibo.com/ajax/multimedia/getVideoList"
SOURCE = "339644097"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CREATOR_REF = "https://weibo.com/creator"


def fetch_video_list(session, pages=8):
    """Return recent author videos [{mid, oid, duration, play_count}] via
    getVideoList, paging forward until `pages` pages are read."""
    out = []
    cursor = "0"
    for _ in range(pages):
        r = session.get(GETVIDEO_URL,
                        params={"cursor": cursor, "count": "20", "status": "0"},
                        headers={"User-Agent": UA, "Referer": CREATOR_REF},
                        timeout=20000)
        try:
            data = r.json()
        except Exception:
            break
        items = (data.get("data") or {}).get("videos") or []
        if not items:
            break
        for it in items:
            out.append({
                "mid": str(it.get("mid") or it.get("mid_str") or it.get("id")),
                "oid": it.get("oid"),
                "duration": it.get("duration"),
                "play_count": (it.get("statistics") or {}).get("play_count"),
            })
        cursor = str((data.get("data") or {}).get("next_cursor") or "")
        if not cursor or cursor == "0":
            break
    return out


def read_play_counts(session, mids):
    """Return {mid: live play_count} for the requested mids from getVideoList."""
    want = set(str(m) for m in mids if m)
    lst = fetch_video_list(session)
    return {v["mid"]: v["play_count"] for v in lst if v["mid"] in want}


def choose_target(lst, mid=None, max_dur=120):
    if mid:
        for v in lst:
            if v["mid"] == str(mid):
                return v
        raise SystemExit("target mid=%s not found in recent video list" % mid)
    cand = [v for v in lst if (v.get("duration") or 0) < max_dur]
    if not cand:
        cand = lst
    return cand[0]


def choose_control(lst, target_mid, max_dur=300):
    for v in lst:
        if v["mid"] != target_mid and 0 < (v.get("duration") or 0) < max_dur:
            return v
    for v in lst:
        if v["mid"] != target_mid:
            return v
    return None


def build_sequence(duration, cadence):
    """Full heartbeat sequence (start, +cadence heartbeats, end)."""
    full = int(round(duration or 0))
    if full <= 0:
        return []
    seq = [("0", 0)]
    step = int(cadence)
    if step > 0:
        t = step
        while t < full:
            seq.append(("1", t))
            t += step
    if seq[-1][1] != full:
        seq.append(("1", full))
    return seq


def send_sequence(session, mid, oid, duration, seq, delay, contribution=0):
    for play_type, sec in seq:
        params = {
            "source": SOURCE,
            "play_type": play_type,
            "video_orientation": "horizontal",
            "video_duration": str(int(round(duration or 0))),
            "id": str(mid),
            "id_type": "0",
            "oid": oid,
            "is_contribution": str(contribution),
            "reqHost": "https://weibo.com/%s/%s" % (AUTHOR_UID, mid),
            "seconds": str(sec),
        }
        url = REPORT_URL + "?" + urlencode(params)
        try:
            r = session.post(url, headers={"User-Agent": UA, "Referer": "https://weibo.com/"}, timeout=20000)
            print("  beacon mid=%s play_type=%s seconds=%s -> %s"
                  % (mid, play_type, sec, r.status_code))
        except Exception as ex:
            print("  beacon mid=%s -> ERROR %s" % (mid, ex))
        time.sleep(delay)


def snapshot_aggregates(tag):
    """OPTIONAL, LAGGED: creator-center aggregates (yesterday/7d/30d)."""
    import read_backend_aggregate as _ra
    a = Auth()
    a.uid = AUTHOR_UID
    a.load()
    yest = _ra.fetch_yesterday(a)
    sev = _ra.fetch_7_30(a)
    snap = {"tag": tag,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "yesterday": yest,
            "last_7d": sev.get("last_7d", {}),
            "last_30d": sev.get("last_30d", {})}
    path = os.path.join(SRC_DIR, "data", "watch", "quick_watch_probe_%s.json" % tag)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(snap, f, ensure_ascii=False, indent=2)
    return snap, path


def _val(snap, period, key):
    return (snap.get(period, {}).get(key, {}) or {}).get("value")


def main():
    ap = argparse.ArgumentParser(description="FastWatch delay-probe (single video, real-time pace, live play_count)")
    ap.add_argument("--mid", default=None, help="target video mid; default = newest short video")
    ap.add_argument("--control-mid", default=None, help="control video mid (no replay); auto if omitted")
    ap.add_argument("--max-dur", type=float, default=120.0, help="default target: newest video shorter than this")
    ap.add_argument("--delay", type=float, default=30.0, help="REAL seconds between heartbeats")
    ap.add_argument("--cadence", type=float, default=30.0, help="reported seconds between heartbeats")
    ap.add_argument("--rounds", type=int, default=1)
    ap.add_argument("--contribution", type=int, default=0, help="is_contribution flag sent on each beacon")
    ap.add_argument("--with-aggregate", action="store_true", help="also snapshot LAGGED creator-center aggregates")
    args = ap.parse_args()

    # Author session (reads live play_count) + recent video list.
    a_auth = Auth()
    a_auth.uid = AUTHOR_UID
    a_auth.load()
    lst = fetch_video_list(a_auth.session)

    target = choose_target(lst, args.mid, args.max_dur)
    t_mid = target["mid"]
    t_oid = target.get("oid")
    t_dur = target.get("duration")
    if not t_mid or not t_oid or not t_dur:
        raise SystemExit("target missing mid/oid/duration: %s" % t_mid)
    control = (choose_control(lst, t_mid) if not args.control_mid
               else next((v for v in lst if v["mid"] == str(args.control_mid)), None))
    c_mid = control["mid"] if control else None

    want = [t_mid] + ([c_mid] if c_mid else [])
    seq = build_sequence(t_dur, args.cadence)
    print("probe: target mid=%s dur=%.0fs pc_now=%s heartbeats=%d delay=%.1fs "
          "cadence=%.1fs rounds=%d contribution=%d"
          % (t_mid, t_dur, target.get("play_count"), len(seq),
             args.delay, args.cadence, args.rounds, args.contribution))
    if c_mid:
        print("      control mid=%s dur=%.0fs pc_now=%s"
              % (c_mid, control.get("duration"), control.get("play_count")))

    pre = read_play_counts(a_auth.session, want)
    pc0_t = pre.get(t_mid)
    pc0_c = pre.get(c_mid) if c_mid else None
    print("  pre  target play_count=%s  control play_count=%s" % (pc0_t, pc0_c))

    if args.with_aggregate:
        pre_ag, pre_path = snapshot_aggregates("pre")
        print("  pre  aggregate snapshot -> %s (LAGGED; re-read tomorrow)" % pre_path)

    # Viewer session replays V at the server-hinted real-time pace.
    a_v = Auth()
    a_v.uid = VIEWER_UID
    a_v.load()
    if not a_v.test_login():
        if not a_v.renew():
            raise SystemExit("viewer session not restored; aborting.")
        a_v.save_cookies()
    sess = a_v.session
    for rnd in range(1, args.rounds + 1):
        print("=== round %d ===" % rnd)
        send_sequence(sess, t_mid, t_oid, t_dur, seq, args.delay, args.contribution)
        time.sleep(1)

    post = read_play_counts(a_auth.session, want)
    pc1_t = post.get(t_mid)
    pc1_c = post.get(c_mid) if c_mid else None
    print("  post target play_count=%s  control play_count=%s" % (pc1_t, pc1_c))

    dV = _delta(pc1_t, pc0_t)
    dC = _delta(pc1_c, pc0_c)
    print("\n=== RESULT (pre -> post) ===")
    print("  target  play_count: %s -> %s  (dV = %s)" % (pc0_t, pc1_t, dV))
    if c_mid:
        print("  control play_count: %s -> %s  (dC = %s)" % (pc0_c, pc1_c, dC))
        print("  NET replay contribution (dV - dC) = %s" % (dV - dC))
    print("  expected if credited: dV ~= %d (rounds), dC ~= 0" % args.rounds)
    if dV and dV > 0 and (dC is None or dC == 0):
        print("  => SERVER CREDITS real-time replay (pace was the issue).")
    elif dV == 0 and (dC is None or dC == 0):
        print("  => replay dropped (no credit). FastWatch does not move play_count.")
    else:
        print("  => inconclusive; inspect dV/dC vs natural traffic.")

    if args.with_aggregate:
        time.sleep(2)
        post_ag, post_path = snapshot_aggregates("post")
        print("  post aggregate snapshot -> %s (LAGGED; re-read tomorrow)" % post_path)
        print("\n=== DIFF (pre -> post, LAGGED aggregates) ===")
        for period in ("yesterday", "last_7d", "last_30d"):
            for key in ("play_count", "play_dura_count"):
                pv, pp = _val(pre_ag, period, key), _val(post_ag, period, key)
                try:
                    delta = float(pp) - float(pv)
                except (TypeError, ValueError):
                    delta = None
                print("  %-9s %-15s : %s -> %s  (delta %s)"
                      % (period, key, pv, pp, delta))


def _delta(a, b):
    try:
        return float(a) - float(b)
    except (TypeError, ValueError):
        return None


if __name__ == "__main__":
    main()
