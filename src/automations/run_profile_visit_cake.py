"""Daily profile-visit runner for the `cake` account (uid resolved via cookies.labels.json).

Invoked once per day by the `daily-weibo-profile-visit-cake` CodeBuddy
automation. It reuses the real commands so every behavior stays identical to
running them by hand:

  * loads cake's saved cookie session from `cookies.<uid>.weibo`
  * calls `auth.ensure_session()` -- which silently renews the short-term
    session via the long-lived SSO TGT (no QR scan) and only falls back to a
    QR prompt when the TGT itself is spent.

It runs THREE legs, each resumable and sharing the SAME on-disk cache the
manual CLI uses (so a manual run and the automation never redo each other's
work):

  1. profile-visit --kind <following|fans|both>  -> visits YOUR own graph
     (following / fans). Progress is saved per list under
     `.cache/profile_visit/<uid>/progress_*.json`.

  2. stranger-visit (friends-of-friends = "关注的关注")  -> visits people your
     friends follow. The per-friend follow lists are crawled ONCE and cached in
     the SHARED fof cache `src/.cache/fof/<uid>/` (used by both profile-visit
     and stranger-visit; older caches under
     `.cache/stranger_visit/<uid>/fof/` are still read). The daily run only
     SAMPLES a few new strangers from that cached pool, so it is cheap; it does
     NOT re-crawl. Progress is saved in
     `.cache/stranger_visit/<uid>/progress_strangers.json`.

Run from the project root (a `cd src` is enough) with the project venv:

    venvs/weibo-env\\Scripts\\python.exe automations\\run_profile_visit_cake.py
    venvs/weibo-env\\Scripts\\python.exe automations\\run_profile_visit_cake.py --sync
    venvs/weibo-env\\Scripts\\python.exe automations\\run_profile_visit_cake.py --no-fof

Flags:
    --sync          refresh the following/fans relation snapshots first.
    --kind          following | fans | both  (default: both)
    --no-fof        skip the friends-of-friends (stranger-visit) leg.
    --count N       strangers to visit this run (stranger-visit leg; 0 = all).
    --limit N       cap profile-visit visits per list (0 = all remaining).
    --include-org   also visit organization accounts.
    --no-svip-only  visit every personal account regardless of tier.
    --refresh-fof-cache  re-crawl friends' follow lists (ignore the cache).

Appends one JSON line to src/automations/profile_visit_cake_log.jsonl with the
run summary (coverage per leg + return code + elapsed seconds). That log file is
git-ignored (see .gitignore: src/automations/*.jsonl); only this script is
tracked.
"""
import sys
import os
import time
import json
import argparse
from types import SimpleNamespace

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, SRC)
os.chdir(SRC)

from auth import Auth
from weibo_tool import fof
from weibo_tool.commands.profile_visit import run_visit
from weibo_tool.commands.stranger_visit import run as run_stranger_visit

CAKE_LABEL = 'cake'  # resolves to the cake uid via cookies.labels.json
LOG = os.path.join(HERE, 'profile_visit_cake_log.jsonl')
DATA_ROOT = os.path.join(SRC, 'data', 'relations')
CACHE_ROOT = os.path.join(SRC, '.cache', 'profile_visit')
STRANGER_CACHE = os.path.join(SRC, '.cache', 'stranger_visit')


def _coverage(uid):
    """Per-leg coverage for the JSON summary.

    following/fans: visited (progress) / total (snapshot).
    fof: visited strangers / cached friend-follow files in the pool.
    """
    cov = {}
    for kind in ('following', 'fans'):
        snap = os.path.join(DATA_ROOT, str(uid), '%s.json' % kind)
        prog = os.path.join(CACHE_ROOT, str(uid), 'progress_%s.json' % kind)
        total = 0
        if os.path.exists(snap):
            try:
                with open(snap, encoding='utf-8') as f:
                    total = len((json.load(f) or {}).get('users') or [])
            except Exception:
                total = 0
        visited = 0
        if os.path.exists(prog):
            try:
                with open(prog, encoding='utf-8') as f:
                    visited = len(json.load(f) or [])
            except Exception:
                visited = 0
        cov[kind] = {'visited': visited, 'total': total}

    # fof leg: how many strangers visited vs the cached friend-follow pool size.
    # The pool now lives in the shared fof cache (src/.cache/fof/<uid>/), with
    # the pre-unification directory as a fallback for an older crawl.
    fof_cache_dir = fof.cache_dir(uid)
    if not os.path.isdir(fof_cache_dir):
        fof_cache_dir = os.path.join(STRANGER_CACHE, str(uid), 'fof')
    pool = 0
    if os.path.isdir(fof_cache_dir):
        pool = len([n for n in os.listdir(fof_cache_dir) if n.endswith('.json')])
    prog_sv = os.path.join(STRANGER_CACHE, str(uid), 'progress_strangers.json')
    visited_sv = 0
    if os.path.exists(prog_sv):
        try:
            with open(prog_sv, encoding='utf-8') as f:
                visited_sv = len(json.load(f) or [])
        except Exception:
            visited_sv = 0
    cov['fof'] = {'visited': visited_sv, 'pool_cached_friends': pool}
    return cov


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--sync', action='store_true',
                    help='Refresh following/fans relation snapshots first.')
    ap.add_argument('--kind', choices=['following', 'fans', 'both', 'all'],
                   default='both',
                   help='Own-graph list for profile-visit (default: both). '
                        '"all" is treated as "both" (fof is a separate leg).')
    ap.add_argument('--no-fof', dest='fof', action='store_false',
                    help='Skip the friends-of-friends (stranger-visit) leg.')
    ap.add_argument('--no-new', dest='new', action='store_false',
                    help='Disable --new mode: resume from saved progress instead of '
                         're-visiting every eligible user each run. By default the '
                         'runner passes --new to both legs so it FORCE-visits the '
                         'full following/fans/fof lists every run (ignoring '
                         '"already visited" progress).')
    ap.add_argument('--count', type=int, default=0,
                    help='Strangers to visit this run (stranger-visit / fof leg; '
                         '0 = ALL remaining, i.e. full coverage, resuming from '
                         'progress_strangers.json if a prior run was throttled '
                         'mid-way).')
    ap.add_argument('--limit', type=int, default=0,
                    help='Max profile-visit visits per list this run '
                         '(0 = all remaining).')
    ap.add_argument('--include-org', action='store_true')
    ap.add_argument('--no-svip-only', dest='svip_only', action='store_false',
                    help='Also visit non-svip/vvip personal accounts.')
    ap.add_argument('--refresh-fof-cache', dest='refresh_fof_cache',
                    action='store_true',
                    help='Re-crawl friends\' follow lists (ignore the cache).')
    args = ap.parse_args()

    auth = Auth()
    if not auth.resolve_uid(args_user=CAKE_LABEL, prompt=False):
        print('ERROR: could not resolve the "%s" identity.' % CAKE_LABEL,
              flush=True)
        return 1
    auth.load()

    owner_uid = auth.uid or auth.label or 'unknown'
    start = time.time()
    results = {}

    # Leg 1+2: own graph (following / fans). 'all' -> 'both' for this leg; the
    # fof leg is handled separately below.
    pv_kind = 'both' if args.kind in ('both', 'all') else args.kind
    rc_pv = run_visit(auth, pv_kind, SimpleNamespace(
        sync=args.sync,
        sync_max_pages=100000,
        sync_resume=False,
        include_org=args.include_org,
        svip_only=args.svip_only,
        limit=args.limit,
        new=args.new,
        uids='',
        update_profile=False,
        refresh_fof=False,
    ))
    results['profile_visit'] = int(rc_pv or 0)

    # Leg 3: friends-of-friends via stranger-visit, reusing the cached pool.
    if args.fof:
        rc_sv = run_stranger_visit(SimpleNamespace(
            source=['friends-of-friends'],
            refresh_cache=args.refresh_fof_cache,
            max_friends=0,
            seed_friends=10,
            comment_post_pages=2,
            comment_pages=3,
            count=args.count,
            seed=None,
            include_org=args.include_org,
            svip_only=args.svip_only,
            dry_run=False,
            new=args.new,
        ), auth)
        results['stranger_visit'] = int(rc_sv or 0)
    else:
        results['stranger_visit'] = None

    elapsed = int(time.time() - start)
    rec = {
        'iso': time.strftime('%Y-%m-%d %H:%M:%S'),
        'cycle': 'auto',
        'user': CAKE_LABEL,
        'uid': owner_uid,
        'kind': args.kind,
        'fof_enabled': bool(args.fof),
        'return_code': {
            'profile_visit': results['profile_visit'],
            'stranger_visit': results['stranger_visit'],
        },
        'elapsed_s': elapsed,
        'coverage': _coverage(owner_uid),
    }
    with open(LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')
    print(json.dumps(rec, ensure_ascii=False), flush=True)

    # Non-zero if either leg failed (stranger-visit returns 2 on throttle-abort).
    overall = results['profile_visit']
    if results['stranger_visit']:
        overall = overall or results['stranger_visit']
    return overall


if __name__ == '__main__':
    sys.exit(main())
