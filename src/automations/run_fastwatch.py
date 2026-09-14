"""Daily FastWatch-1s runner for the `author` account's recent videos.

Invoked once per day by the `daily-fastwatch-1s` CodeBuddy automation (or
manually). It reuses the real experiment script so every behavior stays
identical to running it by hand:

  src/experiment/fetch/quick_watch_recent.py   (the "FastWatch-1s" method)

That script POSTs the FULL playback-heartbeat sequence for each of author's
videos published in the last `--days` days -- start, a progress heartbeat every
`--cadence` reported seconds, and the end -- repeating the whole inner loop
`--rounds` times, and MEASURES the total wall-clock time. See that module's
docstring for the full method description.

This runner only:
  * sets up cwd / sys.path the same way the experiment expects,
  * forwards a small, safe set of CLI flags (with daily defaults),
  * after the experiment finishes, appends one compact JSON summary line to
    src/automations/fastwatch_log.jsonl (git-ignored; same convention as
    the other runners).

Daily defaults (tweak via flags or the automation's command):
  --days 30 --rounds 10 --delay 1.0 --cadence 30 --ticks

`--rounds 10`, `--cadence 30` and full-sequence beacons (`--ticks`) match the
experiment's own defaults; the runner forwards an explicit value for every flag,
so its defaults are what a bare daily run actually uses. Beacon volume per video
is 2 + floor(duration / cadence), so the daily total scales with both the number
of videos and their length -- always check `--dry-run` before changing anything.

Run from the project root:

    venvs/weibo-env\\Scripts\\python.exe src\\automations\\run_fastwatch.py
    venvs/weibo-env\\Scripts\\python.exe src\\automations\\run_fastwatch.py --rounds 3
"""
import sys
import os
import time
import json
import argparse
import importlib.util
import json as _json
try:
    _CFG = _json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
VIEWER_UID = _CFG.get('viewer_uid')
VIEWER_LABEL = _CFG.get('viewer_label', 'viewer')

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)

LOG = os.path.join(HERE, 'fastwatch_log.jsonl')
EXP_MODULE = os.path.join(SRC, 'experiment', 'fetch', 'quick_watch_recent.py')


def _load_experiment():
    """Import the experiment module by file path (avoids package layout issues)."""
    spec = importlib.util.spec_from_file_location('quick_watch_recent', EXP_MODULE)
    qw = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(qw)
    return qw


def _preflight_session(viewer_uid):
    """Best-effort silent session refresh for unattended daily runs.

    Loads the experiment's account cookies from disk and, if the session is not
    already logged in, performs a SILENT SSO renew (replays the crossdomain chain
    with the long-lived SCF cookie). It deliberately does NOT fall back to a QR
    scan: if the long-lived credential is spent we must ABORT, not block a
    headless run on a QR prompt. Renewed cookies are persisted so the
    experiment's own Auth().load() in main() picks them up.

    Returns True if a logged-in session is now available, False otherwise. The
    caller MUST abort the run when False -- proceeding with dead cookies only
    produces a storm of 401s against the playback endpoint.
    """
    try:
        from auth import Auth
    except Exception as e:
        print('preflight: cannot import auth (%s); aborting.' % e, flush=True)
        return False
    try:
        auth = Auth()
        auth.uid = viewer_uid
        auth.load()
        if auth.test_login():
            return True
        print('preflight: session not logged in; attempting silent SSO renew...',
              flush=True)
        if auth.renew():
            print('preflight: session renewed.', flush=True)
            return True
        print('preflight: silent SSO renew FAILED -- the long-lived viewer '
              'credential is spent (SSO retcode=6102). A manual QR re-login is '
              'required before this automation can report playback.', flush=True)
        return False
    except Exception as e:
        print('preflight: session refresh error (%s); aborting.' % e, flush=True)
        return False


def main():
    ap = argparse.ArgumentParser(
        description='Daily FastWatch-1s runner for author videos')
    ap.add_argument('--days', type=int, default=30,
                    help='only videos published in the last N days (inner loop)')
    ap.add_argument('--rounds', type=int, default=10,
                    help='OUTER loop count: repeat the whole inner process N times '
                         '(same default as the experiment)')
    ap.add_argument('--delay', type=float, default=1.0,
                    help='seconds between beacon POSTs / videos')
    ap.add_argument('--cadence', type=float, default=30,
                    help='step, in reported seconds, between progress heartbeats '
                         '(ticks mode; default 30)')
    ap.add_argument('--ticks', dest='ticks', action='store_true', default=True,
                    help='emit the FULL heartbeat sequence (DEFAULT): start, a '
                         'progress heartbeat every --cadence seconds, and the end')
    ap.add_argument('--no-ticks', dest='ticks', action='store_false',
                    help='compact mode: only a start and an end beacon per video')
    ap.add_argument('--repeat', type=int, default=1,
                    help='repeat the beacon sequence this many times per video')
    ap.add_argument('--dry-run', action='store_true',
                    help='only count videos/requests, send nothing')
    args = ap.parse_args()

    # Forward to the experiment via its own argv (its main() parses argparse).
    argv = ['quick_watch_recent.py',
            '--days', str(args.days),
            '--rounds', str(args.rounds),
            '--delay', str(args.delay),
            '--cadence', str(args.cadence),
            '--repeat', str(args.repeat)]
    # Always forwarded explicitly; --ticks (full sequence) is the default, so
    # --no-ticks is what falls back to the compact start+end form.
    argv.append('--ticks' if args.ticks else '--no-ticks')
    if args.dry_run:
        argv.append('--dry-run')

    qw = _load_experiment()
    run_args = {'days': args.days, 'rounds': args.rounds, 'delay': args.delay,
                'ticks': args.ticks, 'cadence': args.cadence,
                'repeat': args.repeat, 'dry_run': args.dry_run}

    # Restore the viewer session before doing anything. If it cannot be renewed
    # (long-lived credential spent -> SSO retcode=6102), abort loudly instead of
    # firing hundreds of doomed 401 beacons.
    if not _preflight_session(getattr(qw, 'VIEWER_UID', None) or VIEWER_UID):
        msg = ('ABORT: viewer session could not be restored (long-lived '
               'credential spent). Re-login ONCE with:\n'
               '  venvs/weibo-env/Scripts/python.exe src/auth.py --user %s\n'
               'then re-run this automation. No beacons were sent.'
               % VIEWER_LABEL)
        print(msg, flush=True)
        rec = {
            'iso': time.strftime('%Y-%m-%d %H:%M:%S'),
            'cycle': 'auto',
            'args': run_args,
            'elapsed_s': 0,
            'ok': 0,
            'fail': 0,
            'total_videos_played': 0,
            'elapsed_seconds_log': 0.0,
            'error': 'session_not_restored',
        }
        with open(LOG, 'a', encoding='utf-8') as f:
            f.write(json.dumps(rec, ensure_ascii=False) + '\n')
        print(json.dumps(rec, ensure_ascii=False), flush=True)
        return 1

    start = time.time()
    sys.argv = argv
    # Use the summary the experiment returns directly (no fragile re-read of the
    # on-disk log, which would be stale if a prior run failed to write it).
    summary = qw.main() or {}
    elapsed = int(time.time() - start)

    rec = {
        'iso': time.strftime('%Y-%m-%d %H:%M:%S'),
        'cycle': 'auto',
        'args': run_args,
        'elapsed_s': elapsed,
        'ok': summary.get('ok'),
        'fail': summary.get('fail'),
        'total_videos_played': summary.get('total_videos_played'),
        'elapsed_seconds_log': summary.get('elapsed_seconds'),
    }
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')
    print(json.dumps(rec, ensure_ascii=False), flush=True)
    return 0


if __name__ == '__main__':
    sys.exit(main())
