"""`stranger-visit` subcommand: randomly visit STRANGERS (accounts that are NOT
your friends) to expand your profile's exposure.

Motivation
----------
`profile-visit` walks YOUR existing relation graph (following / fans) — people
who already know you. But a visit only shows up in the target's visitor list if
the target is at least svip, and the whole point of visiting is that the target
clicks back. To reach *new* people you must visit accounts outside your graph.

This command builds a pool of stranger uids from two pluggable sources and then
visits a random sample of them:

  1. friends-of-friends : the people YOUR friends follow (`friendships/friends
     ?uid=<friend>`). A friend's follow list is mostly people you do NOT follow,
     so it is a large, cheap stranger pool with a built-in relevance signal
     (they share an interest with someone you follow). ALL friends are mined
     (friends are no longer sampled) and each list is paged to the end. Weibo
     only ever exposes ~10 pages (~200 followings) of SOMEONE ELSE's list, so
     that is the ceiling per friend. Results are cached per friend, which makes
     later runs cheap and lets an interrupted crawl resume; `--refresh-cache`
     forces a re-crawl.

  2. friend-comments    : the commenters on YOUR friends' recent posts
     (`mymblog` -> post ids -> `buildComments`). Commenters are active,
     real, reachable humans — exactly the audience you want to surface to.

     NOT USABLE RIGHT NOW: as of 2026-09 the `buildComments` endpoint answers
     HTTP 400 for every parameter combination we tried, so this source yields
     an empty pool. It is kept and still selectable because the endpoint may
     come back, but it is deliberately NOT in the default source list (see
     `--source`), so an ordinary run never pays for the dead requests.

Both pools are then:
  * de-duplicated against your own following + fans (never treat a friend as a
    stranger),
  * org-skipped (enterprise / official / government / media, by default),
  * svip-only filtered (by default) — only svip/vvip can SEE a visit in their
    visitor list, so visiting anyone below that tier is wasted exposure. Tier is
    read straight from the candidate record the source API already returned
    (no extra profile call needed), with the same safety-net as profile-visit:
    if NO candidate carries any membership field, the svip filter is disabled
    for the run and a warning is printed.

A random sample of `--count` survivors is then visited, reusing `visit_one`
(the single request that actually registers a profile visit) and its resilient
HTTP engine (backoff + auto session recovery). Progress is saved per run so a
re-run resumes and never double-visits a stranger.

Already-visited and permanently-banned accounts are removed BEFORE the sample is
taken, so `--count N` really means "N people get visited during this run" rather
than "N are considered and some are then dropped".

Throttling
----------
Weibo throttles `profile/info` with HTTP 414 whose body is an HTML page reading
访问过于频繁，请稍等再试！（错误码：414） — that is NOT the standard "URI too long"
meaning of 414, so the status alone proves nothing (see `_is_rate_limited` in
http_engine, which requires that marker in the body). Three layers keep us under
the wall:

  * pacing (AIMD) — the delay BETWEEN strangers. A clean success speeds up by
    `PACING_DEC`; ANY confirmed throttle doubles it. See `_next_pacing`.
  * per-request backoff — exponential with full jitter, ceiling chosen per
    failure class. See `_backoff_wait` and the `BACKOFF_*` constants.
  * global cool-down / abort — repeated throttling earns an extra pause, and a
    long streak of hard failures stops the run (progress is saved first).

Usage (from src/):
    python weibo-tool.py stranger-visit --user <label>
    python weibo-tool.py stranger-visit --user <label> --count 50
    python weibo-tool.py stranger-visit --user <label> --dry-run   # collect + report, no visits
    python weibo-tool.py stranger-visit --user <label> --max-friends 50   # bounded crawl
    python weibo-tool.py stranger-visit --user <label> --refresh-cache    # re-crawl friends
"""
import argparse
import json
import os
import random
import sys
import time

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so sibling imports and the data/cache dirs are stable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
from datetime_util import record_now  # noqa: E402
_setup_logging()

from weibo_tool.http_engine import _request_json, _sleep, rate_limit_hits
from weibo_tool.verified_config import is_organization, should_skip_organization
# Friends-of-friends crawl: shared with profile-visit (one implementation, one
# cache dir at src/.cache/fof/<owner_uid>/).
from weibo_tool import fof
# Reuse the single request that registers a profile visit, plus the membership
# helpers and the relation-snapshot loader (so we can exclude real friends).
from weibo_tool.commands.profile_visit import (
    visit_one, _load_uids, _is_svip_or_vvip, last_ban_reason,
)
# Endpoint template for paging an arbitrary user's posts (the friends-of-friends
# follow-list crawl now comes from weibo_tool.fof).
from weibo_tool.commands.blacklist_deep import POST_API

CACHE_ROOT = os.path.join(_SRC_DIR, '.cache', 'stranger_visit')

# Membership field names we look for on a raw candidate record. A candidate
# "has membership info" only if at least one of these carries a non-zero value.
_MEMBERSHIP_KEYS = ('svip', 'vvip', 'mbtype', 'mbrank')

COMMENT_API = ('https://weibo.com/ajax/statuses/buildComments'
               '?flow=0&is_reload=1&id=%s&page=%d&count=20&uid=%s')


# ---------------------------------------------------------------------------
# io helpers (progress is per-owner, independent of profile-visit's lists)
# ---------------------------------------------------------------------------
def _progress_path(owner):
    return os.path.join(CACHE_ROOT, str(owner), 'progress_strangers.json')


def _load_visited(path):
    if not os.path.exists(path):
        return set()
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return set(json.load(f))
    except Exception:
        return set()


def _save_visited(path, visited):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(sorted(visited), f, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# friends-of-friends source
# ---------------------------------------------------------------------------
# The per-friend crawl + cache live in `weibo_tool.fof`, shared with
# profile-visit: ONE implementation, ONE cache dir (src/.cache/fof/<owner_uid>/).
# Crawling every friend's full follow list costs a few thousand requests, so the
# result is cached per friend and reused by later runs. An interrupted run can
# simply be restarted: friends already cached are skipped.


# ---------------------------------------------------------------------------
# banned strangers: recorded once, then kept out of the pool for good
# ---------------------------------------------------------------------------
# A banned / deleted / frozen account fails permanently, so retrying it on
# every run only wastes a request and stops the pool ever reaching zero. We
# store the uid along with Weibo's own reason text, and exclude it afterwards.
def _banned_path(owner):
    return os.path.join(CACHE_ROOT, str(owner), 'banned_strangers.json')


def _load_banned(owner):
    """{uid: {screen_name, reason, at}} for strangers rejected for good."""
    path = _banned_path(owner)
    if not os.path.exists(path):
        return {}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (OSError, ValueError):
        return {}
    return data if isinstance(data, dict) else {}


def _save_banned(owner, mapping):
    path = _banned_path(owner)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# candidate record shaping
# ---------------------------------------------------------------------------
# `fof.user_rec` is the shared normaliser (same shape for every source, and the
# same one profile-visit's fof snapshot uses).
def _user_rec(u):
    """Normalise a raw Weibo user dict into the fields we keep + filter on."""
    return fof.user_rec(u)


def _has_membership(rec):
    return any(rec.get(k) for k in _MEMBERSHIP_KEYS)


# ---------------------------------------------------------------------------
# source 1: friends-of-friends (people your friends follow)
# ---------------------------------------------------------------------------
# The crawl + per-friend cache are shared with profile-visit (weibo_tool.fof);
# we only pass the exclusion set and get back the pooled {uid: rec}.


# ---------------------------------------------------------------------------
# source 2: commenters on friends' posts
# ---------------------------------------------------------------------------
def _fetch_friend_posts(auth, uid, pages):
    """Return post ids from a friend's recent weibo (mymblog endpoint)."""
    pids = []
    for page in range(1, pages + 1):
        obj = _request_json(auth, POST_API % (uid, page))
        _sleep()
        if obj is None:
            break
        cards = (obj.get('data') or {}).get('list') or []
        if not cards:
            break
        for c in cards:
            pid = str(c.get('id') or c.get('mid') or c.get('bid') or '')
            if pid:
                pids.append(pid)
        if len(cards) < 10:
            break
    return pids


def _fetch_commenters(auth, mid, owner_uid, pages):
    """Return {uid: rec} of commenters on one post (buildComments endpoint).

    Weibo's comment payload shape has drifted across versions, so the parse is
    deliberately defensive: the list may live at `data.data` or `data.list`
    (or `data` may BE the list), and each comment's user may sit at `user` or
    nested under `comment.user`. Missing any of these would silently yield an
    empty pool, so we try every plausible key.
    """
    out = {}
    for page in range(1, pages + 1):
        url = COMMENT_API % (mid, page, owner_uid)
        obj = _request_json(auth, url)
        _sleep()
        if obj is None:
            break
        data = obj.get('data') or {}
        if isinstance(data, list):
            clist = data
        else:
            clist = data.get('data') or data.get('list') or []
        if not clist:
            break
        for c in clist:
            u = (c.get('user')
                 or (c.get('comment') or {}).get('user')
                 or {})
            rec = _user_rec(u)
            if rec['uid']:
                out[rec['uid']] = rec
        if len(clist) < 10:
            break
    return out


def _collect_friend_comments(auth, seed_friends, post_pages, comment_pages,
                             exclude, rand):
    out = {}
    seeds = rand.sample(sorted(exclude['following']),
                        min(seed_friends, len(exclude['following'])))
    for fuid in seeds:
        pids = _fetch_friend_posts(auth, fuid, post_pages)
        for mid in pids:
            recs = _fetch_commenters(auth, mid, fuid, comment_pages)
            for uid, rec in recs.items():
                if uid not in exclude['all']:
                    out[uid] = rec
    return out


# ---------------------------------------------------------------------------
# driver
# ---------------------------------------------------------------------------
def _load_exclusions(auth, owner):
    """Load the owner's own following + fans uids to exclude from strangers."""
    ex = {'following': set(), 'fans': set(), 'all': set()}
    for kind in ('following', 'fans'):
        uids, _, err = _load_uids(owner, kind)
        if uids is None:
            print('  (note) cannot load %s snapshot: %s' % (kind, err))
            continue
        ex[kind] = set(uids)
        ex['all'] |= ex[kind]
    return ex


def _collect(auth, args, exclude, rand, owner):
    candidates = {}
    sources = args.source
    if 'all' in sources:
        sources = ['friends-of-friends', 'friend-comments']
    if 'friends-of-friends' in sources:
        friends = sorted(exclude['following'])
        max_friends = getattr(args, 'max_friends', 0) or 0
        if max_friends and max_friends < len(friends):
            friends = friends[:max_friends]
        print('[stranger-visit] collecting friends-of-friends '
              '(friends=%d, full crawl, cache=%s)...'
              % (len(friends), 'off' if args.refresh_cache else 'on'))
        c = fof.collect_fof(auth, friends, owner, exclude=exclude['all'],
                            refresh=args.refresh_cache, verbose=True)
        print('  friends-of-friends pool: %d' % len(c))
        candidates.update(c)
    if 'friend-comments' in sources:
        print('  (note) friend-comments: the buildComments endpoint currently '
              'answers HTTP 400, so this source usually yields nothing.')
        print('[stranger-visit] collecting friend-comments '
              '(seed_friends=%d, post_pages=%d, comment_pages=%d)...'
              % (args.seed_friends, args.comment_post_pages, args.comment_pages))
        c = _collect_friend_comments(auth, args.seed_friends,
                                     args.comment_post_pages, args.comment_pages,
                                     exclude, rand)
        print('  friend-comments pool: %d' % len(c))
        candidates.update(c)
    return candidates


# ---------------------------------------------------------------------------
# pacing: how long we wait BETWEEN strangers (AIMD, like TCP congestion control)
# ---------------------------------------------------------------------------
# PACING is the delay inserted after each stranger. It starts conservative and
# is re-evaluated after every single stranger:
#
#   clean success (no throttle at all)      -> PACING -= PACING_DEC  (speed up)
#   throttled (even if a retry rescued it)  -> PACING *= 2           (slow down)
#
# so we creep towards the server's limit, back off hard the moment we touch it,
# and never keep paying a large delay while the server is happy.
PACING_INIT = 1.5     # delay before/after the very first stranger (seconds)
PACING_MIN = 0.1      # floor: never wait less than this between strangers
PACING_MAX = 30.0     # ceiling: a long throttle storm must not stall forever
PACING_DEC = 0.05     # how much one clean success speeds us up (seconds)
PACING_JITTER = 0.05  # extra random 0..this, so the cadence is not mechanical

# Extra cool-down ON TOP of the per-request backoff: after every COOLDOWN_EVERY
# throttled strangers in a row, pause for
# min(COOLDOWN_CAP, COOLDOWN_BASE * 2^k), k = how many cool-downs we took.
COOLDOWN_EVERY = 3
COOLDOWN_BASE = 60
COOLDOWN_CAP = 300

# Abandon the whole run after this many strangers in a row could NOT be visited
# at all. That pattern is a sustained block, not a blip, and hammering on would
# only risk the account. Progress is saved first, so nothing is lost.
ABORT_AFTER = 12

# Ask "is my session still alive?" after this many consecutive hard failures —
# a long streak may be a dead session rather than throttling.
SESSION_PROBE_EVERY = 5


def _next_pacing(pacing, touched_rl, succeeded):
    """One AIMD step for the delay between strangers.

    `touched_rl` = this stranger hit a CONFIRMED throttle, even when a retry
    later rescued the visit. A throttle always wins: we slow down
    multiplicatively and must NOT also take the success speed-up, because the
    server did tell us we were too frequent.
    """
    if touched_rl:
        return min(PACING_MAX, pacing * 2)
    if succeeded:
        return max(PACING_MIN, pacing - PACING_DEC)
    return pacing


def _cooldown_pause(consec_rl):
    """Extra pause (seconds) after `consec_rl` throttled strangers in a row.

    Only called when `consec_rl` is a multiple of COOLDOWN_EVERY, so the first
    pause is COOLDOWN_BASE and every further one doubles, capped at COOLDOWN_CAP.
    """
    taken = consec_rl // COOLDOWN_EVERY
    return min(COOLDOWN_CAP, COOLDOWN_BASE * (2 ** (taken - 1)))


def run(args, auth):
    owner = auth.uid or auth.label or 'unknown'
    print('[stranger-visit] owner=%s' % owner)

    exclude = _load_exclusions(auth, owner)
    print('[stranger-visit] excluded %d following + %d fans (own graph)'
          % (len(exclude['following']), len(exclude['fans'])))

    rand = random.Random(args.seed)
    candidates = _collect(auth, args, exclude, rand, owner)
    print('[stranger-visit] total unique strangers collected: %d' % len(candidates))

    # Filter: org-skip + svip-only (mirrors profile-visit's defaults).
    skip_org = should_skip_organization() and not args.include_org
    svip_only = getattr(args, 'svip_only', True)
    has_any = any(_has_membership(r) for r in candidates.values())

    kept, skipped_org, skipped_non = [], 0, 0
    for r in candidates.values():
        if skip_org and is_organization(r['verified'], r['verified_type']):
            skipped_org += 1
            continue
        if svip_only:
            if not has_any:
                kept.append(r)  # safety net: cannot trust filter -> visit all
            elif _is_svip_or_vvip(r):
                kept.append(r)
            else:
                skipped_non += 1
        else:
            kept.append(r)

    if skip_org and skipped_org:
        print('  (note) skipped %d organization account(s).' % skipped_org)
    if svip_only:
        if not has_any:
            print('  (warn) no membership fields found on any candidate; '
                  'svip-only disabled this run (visiting all personal).')
        else:
            print('  (note) svip-only skipped %d non-svip/vvip account(s).'
                  % skipped_non)
    # Permanently rejected accounts must not come back: they are on record in
    # banned_strangers.json, so drop them before anything else is counted.
    known_banned = _load_banned(owner)
    if known_banned:
        before = len(kept)
        kept = [r for r in kept if r['uid'] not in known_banned]
        if before != len(kept):
            print('  (note) skipped %d already-banned stranger(s)'
                  % (before - len(kept)))

    print('[stranger-visit] candidates after filtering: %d' % len(kept))

    # Drop already-visited strangers BEFORE sampling: filter first, then slice,
    # so the --count we announce is the number of people actually visited.
    # (Slicing first and filtering afterwards silently shrank every run.)
    progress_path = _progress_path(owner)
    # --new mode: drop the saved progress so EVERY eligible stranger is revisited
    # this run (same semantics as profile-visit's --new). Used by the daily
    # automation, which must not be a no-op just because a prior run already
    # visited everyone. Without --new we resume from saved progress.
    if getattr(args, 'new', False) and os.path.exists(progress_path):
        try:
            os.remove(progress_path)
        except OSError:
            pass
    done = _load_visited(progress_path)
    if done:
        before = len(kept)
        kept = [r for r in kept if r['uid'] not in done]
        print('  (note) excluded %d already-visited stranger(s); %d left'
              % (before - len(kept), len(kept)))

    rand.shuffle(kept)
    if args.count and args.count > 0:
        todo = kept[:args.count]
    else:
        todo = kept
    print('[stranger-visit] will visit %d (--count=%s)'
          % (len(todo), args.count))

    if args.dry_run:
        print('[stranger-visit] DRY-RUN: no visits performed.')
        sample = todo[:10]
        for r in sample:
            print('  sample: %s  %s  svip=%s vvip=%s mbtype=%s mbrank=%s'
                  % (r['uid'], r['screen_name'], r['svip'], r['vvip'],
                     r['mbtype'], r['mbrank']))
        return 0

    if not todo:
        print('[stranger-visit] nothing left to visit '
              '(every filtered stranger has already been visited).')
        return 0

    print('[stranger-visit] visiting %d strangers (resuming from %d done)...'
          % (len(todo), len(done)))
    ok = failed = banned = 0
    pacing = PACING_INIT
    # Consecutive strangers that TOUCHED throttling — counting those a retry
    # rescued too, because the server did say we were too frequent. Drives the
    # extra cool-down.
    consec_rl = 0
    # Consecutive strangers we could not visit AT ALL. Drives the abort, since
    # that pattern means a sustained block rather than a blip.
    consec_fail = 0
    throttled = False
    for i, r in enumerate(todo, 1):
        # Snapshot the confirmed-throttle counter so we can tell whether THIS
        # stranger was throttled even when a retry went on to succeed.
        hits_before = rate_limit_hits()
        status, _ = visit_one(auth, r['uid'])
        touched_rl = rate_limit_hits() > hits_before

        if status == 'ok':
            ok += 1
            done.add(r['uid'])
            consec_fail = 0
        elif status == 'banned':
            banned += 1
            consec_fail = 0
            reason = last_ban_reason() or 'banned_unknown'
            known_banned[r['uid']] = {
                'screen_name': r.get('screen_name', ''),
                'reason': reason,
                'at': record_now(),
            }
            _save_banned(owner, known_banned)
            print('  banned uid %s (%s): %s'
                  % (r['uid'], r.get('screen_name', ''), reason))
        else:  # no usable response after all retries
            failed += 1
            consec_fail += 1
            if consec_fail % SESSION_PROBE_EVERY == 0:
                # A long streak may be a dead session rather than throttling, so
                # ask once: a live session means we are being throttled, a dead
                # one means nobody is around to scan the QR.
                if not auth.ensure_session():
                    print('  aborting: session unrecoverable after %d failures.'
                          % consec_fail)
                    throttled = True
                    break

        # AIMD pacing. A throttle signal beats a success: if the server said
        # "too frequent" we slow down even though a retry rescued the visit.
        if touched_rl:
            consec_rl += 1
        elif status == 'ok':
            consec_rl = 0
        pacing = _next_pacing(pacing, touched_rl, status == 'ok')

        if consec_fail >= ABORT_AFTER:
            print('  aborting: %d strangers in a row could not be visited; '
                  'treating it as a sustained throttle/block.' % consec_fail)
            throttled = True
            break
        if consec_rl and consec_rl % COOLDOWN_EVERY == 0:
            pause = _cooldown_pause(consec_rl)
            print('  throttled %d in a row; extra pause %ds (pacing now %.2fs)'
                  % (consec_rl, pause, pacing))
            time.sleep(pause)

        time.sleep(pacing + random.random() * PACING_JITTER)

        if i % 20 == 0 or i == len(todo):
            _save_visited(progress_path, done)
            print('  %d/%d  ok=%d failed=%d banned=%d  pacing=%.2fs'
                  % (i, len(todo), ok, failed, banned, pacing))
    _save_visited(progress_path, done)
    print('[stranger-visit] %s  ok=%d failed=%d banned=%d  progress: %s'
          % ('ABORTED (throttled)' if throttled else 'DONE',
             ok, failed, banned, progress_path))
    return 2 if throttled else 0


def register(subparsers, parents=None):
    p = subparsers.add_parser(
        'stranger-visit', parents=parents or [],
        help='Randomly visit strangers (non-friends) to expand your exposure.')
    p.add_argument('--source', nargs='*',
                   choices=['friends-of-friends', 'friend-comments', 'all'],
                   default=['friends-of-friends'],
                   help='Candidate source(s). Default: friends-of-friends only. '
                        '"friends-of-friends" = people your friends follow. '
                        '"friend-comments" = commenters on your friends\' posts '
                        '— CURRENTLY DEAD: the buildComments endpoint answers '
                        'HTTP 400, so selecting it yields an empty pool. '
                        '"all" = both, and therefore hits the dead endpoint too.')
    p.add_argument('--seed-friends', type=int, default=10,
                   help='How many friends to mine (friend-comments source '
                        'only; the fof source always uses ALL friends).')
    p.add_argument('--max-friends', type=int, default=0,
                   help='Cap how many friends to crawl (0 = ALL friends). '
                        'Useful for a bounded first run; the per-friend cache '
                        'makes later full runs cheap.')
    p.add_argument('--refresh-cache', action='store_true',
                   help='Re-crawl friends even when a cached follow list '
                        'exists (ignore the cache).')
    p.add_argument('--comment-post-pages', type=int, default=2,
                   help='Recent-post pages to read per friend (comment source).')
    p.add_argument('--comment-pages', type=int, default=3,
                   help='Comment pages to read per post (comment source).')
    p.add_argument('--count', type=int, default=30,
                   help='How many strangers to visit this run (0 = all).')
    p.add_argument('--seed', type=int, default=None,
                   help='Random seed for reproducible sampling.')
    p.add_argument('--include-org', action='store_true',
                   help='Also visit organization accounts (default skips them).')
    p.add_argument('--svip-only', action=argparse.BooleanOptionalAction,
                   default=True,
                   help='Only visit svip/vvip strangers (default on). '
                        'They are the only ones who can SEE your visit.')
    p.add_argument('--dry-run', action='store_true',
                   help='Collect + filter + report, but perform NO visits.')
    p.add_argument('--new', action='store_true',
                   help='Ignore saved progress and re-visit EVERY eligible stranger '
                        'this run (same as profile-visit\'s --new; the daily '
                        'automation uses this so it is never a no-op just because '
                        'everyone was visited before).')
    p.set_defaults(run=run)
