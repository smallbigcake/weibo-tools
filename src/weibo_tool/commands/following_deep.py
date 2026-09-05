"""`following-deep` subcommand: deep profile + follow-audience analysis of the
accounts a given user FOLLOWS (the user's following list), as a CONTROL/BASELINE
to compare against the blacklist audience.

This reuses the EXACT same crawl + aggregation machinery as `blacklist-deep`
(profiles / follow lists / posts, resumable caches, convergence safety-net,
interest extraction) — only the SOURCE of the UID list differs: instead of the
active account's blacklist, we page through that account's own *following* list
(`friendships/friends`), then run the identical Phase 1/2/3 pipeline over those
UIDs. The viewer is the subject account itself (it can obviously read its own
following list and those users' public profiles).

Because the pipeline is identical, the resulting JSON / summary.md are directly
comparable to `blacklist-deep`'s outputs for the same subject.

Usage (from src/):
    python weibo-tool.py following-deep --uid <subject>
    python weibo-tool.py following-deep --user cake --with-follows --with-posts
"""
import argparse
import json
import os
import sys
import time
from collections import Counter

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so sibling imports and the cache/data dirs are stable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
_setup_logging()

# Reuse the identical crawl + aggregation engine from blacklist-deep.
# The fetch_* functions accept a `cache_path` argument so we can redirect their
# caches into THIS module's isolated following_deep dirs (otherwise they would
# write into blacklist_deep's caches and corrupt the baseline comparison).
from weibo_tool.commands.blacklist_deep import (
    fetch_profile, fetch_follows, fetch_posts, aggregate, print_report,
    write_summary_md, _extract_interests_from_posts,
    POST_DIR, _load_json, _save_json, FOLLOW_API,
)
from weibo_tool.http_engine import _request_json, _sleep

# Separate cache + data dirs so this baseline never mixes with the blacklist
# data (same engine, different subject semantics -> keep them apart).
CACHE_DIR = os.path.join(_SRC_DIR, '.cache', 'following_deep')
PROFILE_DIR = os.path.join(CACHE_DIR, 'profiles')
# Per-followed-user follow lists: for each account the subject follows, the
# list of accounts THAT account follows.
FOLLOW_DIR = os.path.join(CACHE_DIR, 'follows')
# The subject's OWN following list (the control-group roster). It MUST NOT live
# in FOLLOW_DIR: `top-followed --source following` treats every file there as
# "one person's follow list", so a roster sitting in it would add a phantom +1
# to every uid it contains and skew the whole baseline ranking.
LISTS_DIR = os.path.join(CACHE_DIR, 'lists')
POST_DIR_F = os.path.join(CACHE_DIR, 'posts')
DATA_DIR = os.path.join(_SRC_DIR, 'data', 'following_deep')


def _ensure_dirs():
    for d in (CACHE_DIR, PROFILE_DIR, FOLLOW_DIR, LISTS_DIR, POST_DIR_F, DATA_DIR):
        os.makedirs(d, exist_ok=True)


def _following_cache_path(uid):
    _ensure_dirs()
    return os.path.join(LISTS_DIR, '%s.json' % uid)


def _profile_cache_path(uid):
    _ensure_dirs()
    return os.path.join(PROFILE_DIR, '%s.json' % uid)


def _follow_cache_path(uid):
    _ensure_dirs()
    return os.path.join(FOLLOW_DIR, '%s.json' % uid)


def fetch_following_list(auth, uid, force=False):
    """Page through `friendships/friends` for `uid` to get the full following
    list (the people `uid` follows). Cached under the following_deep cache dir.

    Uses the same endpoint as blacklist-deep's Phase 2 (per-user follow lists),
    but here `uid` is the subject (cake) itself. Returns a list of uid strings.
    """
    cache = _following_cache_path(uid)
    if not force and os.path.exists(cache):
        return _load_json(cache, {}).get('uids', [])
    uids = []
    page = 1
    total_seen = 0
    while True:
        obj = _request_json(auth, FOLLOW_API % (uid, page))
        _sleep()
        if obj is None:
            break
        users = obj.get('users') or []
        if not users:
            break
        for fu in users:
            fu_uid = str(fu.get('id') or fu.get('idstr') or '')
            if fu_uid:
                uids.append(fu_uid)
                total_seen += 1
        total = obj.get('total_number')
        if total and total_seen >= total:
            break
        next_cursor = obj.get('next_cursor', 0)
        if not next_cursor:
            break
        page += 1
        if page > 400:  # hard safety cap (~20k follows)
            break
    _save_json(cache, {'uid': uid, 'count': len(uids), 'uids': uids})
    return uids


def register(subparsers, parents=None):
    p = subparsers.add_parser(
        'following-deep', parents=parents or [],
        help='Deep profile + follow-audience analysis of the accounts a user '
             'FOLLOWS (control/baseline vs the blacklist audience).')
    p.add_argument('--with-follows', action='store_true',
                   help='Also traverse each followed user\'s follow list '
                        '(much higher request volume; full pagination).')
    p.add_argument('--with-posts', action='store_true',
                   help='Also fetch each followed user\'s recent weibo posts and '
                        'extract real interests/topics from the text (not bio).')
    p.add_argument('--json', default=None,
                   help='Path to dump the full per-user JSON. Defaults to '
                        'data/following_deep/<subject>_following_profiles.json.')
    p.add_argument('--no-summary-md', action='store_true',
                   help='Skip writing the human-readable summary.md next to the JSON.')
    p.add_argument('--profile-only', action='store_true',
                   help='Only (re)run phase 1 profiles; skip follow/post aggregation '
                        'even if caches exist.')
    p.set_defaults(run=run)


def run(args, auth):
    from auth import Auth

    auth.load()
    if not auth.ensure_session():
        print('Could not establish a session even after auto-recovery. '
              'If a QR code appeared, scan it, then re-run this command.')
        return

    # The viewer is the subject itself: it can read its own following list and
    # the public profiles of the accounts it follows. No separate viewer needed.
    viewer = auth
    subject_id = auth.uid or auth.label or 'subject'
    print('[following-deep] subject=%s' % subject_id)

    _ensure_dirs()

    # Source of UIDs = the subject's own following list (the control group).
    uids = fetch_following_list(viewer, subject_id)
    print('[following-deep] following list size = %d.' % len(uids))

    MAX_RETRY_ROUNDS = 5
    records = []

    # Phase 1: profiles (identical engine to blacklist-deep).
    print('[following-deep] Phase 1: fetching profiles (cached, resumable)...')
    for rnd in range(MAX_RETRY_ROUNDS):
        targets = uids if rnd == 0 else [r['uid'] for r in records if r.get('error') == 'unreachable']
        if not targets:
            break
        n = len(targets)
        done = 0
        for uid in targets:
            rec = fetch_profile(viewer, uid, cache_path=_profile_cache_path(uid))
            rec['_follows'] = None
            rec['_posts'] = None
            if rnd == 0:
                records.append(rec)
            else:
                for i, old in enumerate(records):
                    if old['uid'] == uid:
                        records[i] = rec
                        break
            done += 1
            if done % 200 == 0:
                print('  [round %d] profiles %d/%d (%.1f%%)'
                      % (rnd + 1, done, n, 100.0 * done / n))
        remaining = sum(1 for r in records if r.get('error') == 'unreachable')
        print('[following-deep] round %d done: %d unreachable remaining.' % (rnd + 1, remaining))
        if remaining == 0:
            break
        if rnd < MAX_RETRY_ROUNDS - 1:
            print('[following-deep] cooling down 120s before retry round %d...' % (rnd + 2))
            time.sleep(120)
    if len(records) != len(uids):
        seen = {r['uid'] for r in records}
        for uid in uids:
            if uid not in seen:
                records.append(fetch_profile(viewer, uid, cache_path=_profile_cache_path(uid)))

    # Phase 2: follow lists (identical engine; uses the local FOLLOW_DIR cache).
    if args.with_follows and not args.profile_only:
        def _follows_cache_missing(uid):
            return not os.path.exists(_follow_cache_path(uid))

        for rnd in range(MAX_RETRY_ROUNDS):
            targets = [r['uid'] for r in records
                       if not r.get('error') and _follows_cache_missing(r['uid'])]
            if not targets:
                break
            n = len(targets)
            fdone = 0
            for uid in targets:
                fl = fetch_follows(viewer, uid, cache_path=_follow_cache_path(uid))
                rec = next(r for r in records if r['uid'] == uid)
                rec['_follows'] = fl
                fdone += 1
                if fdone % 100 == 0:
                    print('  [round %d] follows %d/%d (%.1f%%)'
                          % (rnd + 1, fdone, n, 100.0 * fdone / n))
            remaining = sum(1 for r in records
                            if not r.get('error') and _follows_cache_missing(r['uid']))
            print('[following-deep] Phase 2 round %d done: %d follow lists missing.'
                  % (rnd + 1, remaining))
            if remaining == 0:
                break
            if rnd < MAX_RETRY_ROUNDS - 1:
                print('[following-deep] cooling down 120s before follows retry round %d...'
                      % (rnd + 2))
                time.sleep(120)
        for rec in records:
            if rec.get('error') or rec.get('_follows') is not None:
                continue
            if os.path.exists(_follow_cache_path(rec['uid'])):
                rec['_follows'] = fetch_follows(viewer, rec['uid'], cache_path=_follow_cache_path(rec['uid']))

    # Phase 3: posts + real interest extraction (identical engine).
    if args.with_posts and not args.profile_only:
        def _posts_cache_missing(uid):
            return not os.path.exists(os.path.join(POST_DIR_F, '%s.json' % uid))

        for rnd in range(MAX_RETRY_ROUNDS):
            targets = [r['uid'] for r in records
                       if not r.get('error') and _posts_cache_missing(r['uid'])]
            if not targets:
                break
            n = len(targets)
            pdone = 0
            for uid in targets:
                po = fetch_posts(viewer, uid, cache_path=os.path.join(POST_DIR_F, '%s.json' % uid))
                rec = next(r for r in records if r['uid'] == uid)
                rec['_posts'] = po
                rec['interests'] = po.get('interests', {}).get('keywords', [])
                pdone += 1
                if pdone % 200 == 0:
                    print('  [round %d] posts %d/%d (%.1f%%)'
                          % (rnd + 1, pdone, n, 100.0 * pdone / n))
            remaining = sum(1 for r in records
                            if not r.get('error') and _posts_cache_missing(r['uid']))
            print('[following-deep] Phase 3 round %d done: %d posts missing.'
                  % (rnd + 1, remaining))
            if remaining == 0:
                break
            if rnd < MAX_RETRY_ROUNDS - 1:
                print('[following-deep] cooling down 120s before posts retry round %d...'
                      % (rnd + 2))
                time.sleep(120)
        for rec in records:
            if rec.get('error') or rec.get('_posts') is not None:
                continue
            pp = os.path.join(POST_DIR_F, '%s.json' % rec['uid'])
            if os.path.exists(pp):
                po = fetch_posts(viewer, rec['uid'], cache_path=pp)
                rec['_posts'] = po
                fresh = _extract_interests_from_posts(po.get('texts', []))
                po['interests'] = fresh
                rec['interests'] = fresh.get('keywords', [])

    summary = aggregate(records)
    print_report(summary)

    s_unreachable = summary.get('unreachable', 0)
    s_fetch_failed = summary.get('fetch_failed', 0)
    if s_unreachable == 0 and s_fetch_failed == 0:
        print('\n[following-deep] DONE: full coverage '
              '(reachable=%d banned=%d account_issue=%d).'
              % (summary.get('reachable', 0), summary.get('banned', 0),
                 summary.get('account_issue', 0)))
    else:
        print('\n[following-deep] INCOMPLETE: %d unreachable / %d fetch_failed remain. '
              'Re-run the same command to retry only those (resumable).'
              % (s_unreachable, s_fetch_failed))

    json_path = args.json or os.path.join(DATA_DIR, '%s_following_profiles.json' % subject_id)
    out_records = []
    for r in records:
        rr = {k: v for k, v in r.items() if k not in ('_follows', '_posts')}
        if r.get('_follows'):
            rr['follow_count'] = r['_follows'].get('count')
            rr['follow_sample'] = r['_follows'].get('sample')
        if r.get('_posts'):
            rr['post_count'] = r['_posts'].get('count')
            rr['interests_detail'] = r['_posts'].get('interests')
        out_records.append(rr)
    payload = {'summary': summary, 'users': out_records}
    os.makedirs(os.path.dirname(os.path.abspath(json_path)), exist_ok=True)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print('\nJSON written to %s' % json_path)

    if not args.no_summary_md:
        md_path = os.path.join(DATA_DIR, '%s_following_summary.md' % subject_id)
        write_summary_md(summary, md_path, subject=subject_id, viewer=None,
                         kind='following')
        print('Summary written to %s' % md_path)
