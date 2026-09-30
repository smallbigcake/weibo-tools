#!/usr/bin/env python
"""Run the full Weibo creator-center daily pipeline end-to-end.

Phases (in order):
  Phase 1  : account-level daily aggregate   -> fetch/read_video_aggregates.py
  Phase 2a : refresh author video list       -> fetch/fetch_recent_videos.py
  Phase 2b : crawl per-video stats (--force) -> crawl/crawl_video_stats.py --force --diff
             (--diff also runs Phase 3: diff vs the previous-day snapshot, in the
              SAME process, so no manual second step is needed)

Each phase is launched as a subprocess via the project venv python, so every
script keeps its own sys.path / config setup. Output is streamed live to BOTH
the console and a single timestamped log file under src/log/creator_center/.

Because Phase 2b is rate-limited and takes ~45+ min over ~480 videos, run this
script DETACHED in the background and tail the pipeline log, e.g. (PowerShell):

  $PY = "venvs/weibo-env/Scripts/python.exe"
  Start-Process -NoNewWindow -FilePath $PY `
    -ArgumentList "src/experiment/run_pipeline.py" `
    -RedirectStandardOutput src/log/creator_center/run_pipeline.out.txt `
    -RedirectStandardError  src/log/creator_center/run_pipeline.err.txt
  # then watch progress:
  Get-Content src/log/creator_center/creator_center_*.log -Tail 30 -Wait

The pipeline STOPS at the first phase that fails (e.g. session expired) so you
are not left waiting ~45 min on a doomed crawl.
"""
import argparse
import datetime
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PY = os.path.join(ROOT, "venvs", "weibo-env", "Scripts", "python.exe")
LOG_DIR = os.path.join(ROOT, "src", "log", "creator_center")


def _now():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")


def _run(name, script_rel, extra_args, logf):
    script = os.path.join(ROOT, script_rel)
    cmd = [PY, script] + list(extra_args)
    print("\n========== %s ==========" % name, flush=True)
    print("$ " + " ".join(cmd), flush=True)
    logf.write("\n========== %s ==========\n" % name)
    logf.write("$ " + " ".join(cmd) + "\n")
    logf.flush()

    proc = subprocess.Popen(cmd, cwd=ROOT, stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT, text=True, bufsize=1)
    # stream live to console AND the pipeline log
    for line in proc.stdout:
        sys.stdout.write(line)
        sys.stdout.flush()
        logf.write(line)
        logf.flush()
    rc = proc.wait()

    if rc != 0:
        msg = "!! %s FAILED (exit %d)\n" % (name, rc)
        print(msg, end="", flush=True)
        logf.write(msg)
        return rc
    print("ok: %s\n" % name, flush=True)
    logf.write("ok: %s\n" % name)
    return 0


def main():
    ap = argparse.ArgumentParser(
        description="Run the full Weibo creator-center daily pipeline "
                    "(Phase 1 -> 2a -> 2b[+3]).")
    ap.add_argument("--2a-incremental", dest="phase2a_incremental",
                    action="store_true",
                    help="pass --incremental to fetch_recent_videos.py "
                         "(faster, but does NOT refresh older videos' stats)")
    ap.add_argument("--no-diff", dest="no_diff", action="store_true",
                    help="do NOT run Phase 3 (diff) at the end of the crawl")
    args = ap.parse_args()

    os.makedirs(LOG_DIR, exist_ok=True)
    log_path = os.path.join(LOG_DIR, "creator_center_%s.log" % _now())
    print("creator_center pipeline log -> %s" % log_path, flush=True)

    with open(log_path, "w", encoding="utf-8") as logf:
        logf.write("creator_center pipeline started %s (UTC)\n" % _now())
        logf.flush()

        rc = _run("Phase 1  account-level aggregate",
                  "src/experiment/fetch/read_video_aggregates.py", [], logf)
        if rc != 0:
            return rc

        phase2a_args = ["--incremental"] if args.phase2a_incremental else []
        rc = _run("Phase 2a refresh video list",
                  "src/experiment/fetch/fetch_recent_videos.py",
                  phase2a_args, logf)
        if rc != 0:
            return rc

        phase2b_args = ["--force"]
        if not args.no_diff:
            phase2b_args.append("--diff")
        rc = _run(
            "Phase 2b crawl per-video stats"
            + (" + Phase 3 diff" if not args.no_diff else ""),
            "src/experiment/crawl/crawl_video_stats.py", phase2b_args, logf)
        if rc != 0:
            return rc

        logf.write("\ncreator_center pipeline finished OK %s (UTC)\n" % _now())

    print("\ncreator_center pipeline finished OK -> %s" % log_path, flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
