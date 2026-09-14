"""`profile-visit` subcommand — registers profile visits via the web API.

How visit recording actually works (empirically proven 2026-09-04 via HAR
analysis, controlled replay, and an ablation study):

  * Weibo does NOT expose a dedicated "record visit" `/ajax` endpoint. Reading
    `GET /ajax/profile/topicContent?tabid=231093_-_recently` returns TWO
    self-visible lists:
        - "我经常访问的人(仅自己可见)"   (stable frequent-visit list)
        - "我的访问记录（仅自己可见）"   (the real visit records, split
                                          今天 / 近7天 / 更早)
    These two lists are MUTUALLY EXCLUSIVE: a given uid appears in exactly one
    of them, so a target counts as "registered" if it shows up in EITHER list.

  * MINIMAL REQUEST: a single
        GET /ajax/profile/info?uid=<id>&scene=profile
    sent with browser-like headers is enough to write the visit record. An
    ablation study over 29 fresh uids (skip-one, iteratively) proved that of
    the 9 XHR requests a real browser fires when opening a profile page, ONLY
    `profile/info` is required; the other 8 are optional metadata/log beacons
    whose removal does not prevent registration, and `profile/info` alone is
    sufficient. The earlier belief that all 9 were needed was WRONG.

  * The visit-record list has a limited capacity, so registration is verified
    in batches DURING a run rather than only at the end; otherwise uids
    visited early could be evicted from the list before verification and be
    wrongly treated as failures (and re-visited forever).

Traversal model:
  Each relation list (following / fans) keeps its own LONG-LIVED progress
  file, so a run resumes where the previous one stopped and keeps going until
  every uid in that list has been visited once. `--kind both` traverses
  `following` first, then `fans`, each with independent progress. A THIRD list,
  **friends-of-friends ("关注的关注")**, is synthesised here by crawling the full
  follow list of every one of the owner's friends and unioning them into
  `data/relations/<uid>/friends_of_friends.json` (see `_ensure_fof_snapshot`).
  The owner's own following + fans are excluded so the list is genuinely NEW
  exposure. The first crawl is heavy (~one request per friend) but cached
  per-friend and resumable; later runs only re-read the snapshot. `--kind all`
  traverses following + fans + fof, each with its own progress.

The uid lists come from the relation snapshots written by `relations_sync`
(`data/relations/<uid>/{following,fans}.json`). The fans snapshot only holds
the portion Weibo's API exposes, so that is the portion that gets visited.

Organization accounts (blue V: enterprise / official / government / media, i.e.
verified_type > 0) are skipped BEFORE any request is sent — only personal accounts
(黄V / 达人 / 普通用户) get visited. The policy lives in
src/config/verified_categories.json (`profile_visit.skip_organization`); override per
run with --include-org.

By default the traversal goes further: ONLY svip / vvip accounts are visited
(`--svip-only`, on by default). Weibo only surfaces the visitor list to accounts
that are at least svip, so a visit registered against anyone below that tier is
wasted — they can never see it. Membership (svip / vvip / mbtype / mbrank) is read
straight from the relation snapshot, so the cut happens BEFORE any request is
sent. Pass `--no-svip-only` to visit every personal account regardless of tier.

Usage (from src/):
    python weibo-tool.py profile-visit --user <label> --kind following
    python weibo-tool.py profile-visit --user <label> --kind fans
    python weibo-tool.py profile-visit --user <label> --kind both --limit 200
    python weibo-tool.py profile-visit --user <label> --kind fof
    python weibo-tool.py profile-visit --user <label> --kind all --limit 200
"""
import argparse
import json
import os
import sys
import time
import logging
from types import SimpleNamespace

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so sibling imports and the data/cache dirs are stable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
_setup_logging()

from weibo_tool.http_engine import (
    _is_ban_response, _is_account_issue, _request_json)
from weibo_tool.commands.relations_sync import (
    _load_json, _save_json, _now_iso, run_following, run_fans)
from weibo_tool.verified_config import is_organization, should_skip_organization
from weibo_tool import fof

DATA_ROOT = os.path.join(_SRC_DIR, 'data', 'relations')
CACHE_ROOT = os.path.join(_SRC_DIR, '.cache', 'profile_visit')
TOPIC_URL = 'https://weibo.com/ajax/profile/topicContent?tabid=231093_-_recently'

# Browser-like User-Agent / client headers, taken from a real Chrome profile
# page load (HAR captured 2026-09-04). These are required so the server treats
# the requests as a genuine page view rather than a single API probe.
_UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
       '(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36')
# Pinned client/server version headers captured from a real Chrome profile-page
# load (HAR, 2026-09-04). Weibo only treats the request as a genuine page view
# when these are present, so they are KEPT VERBATIM (not randomised or derived
# from a live page fetch). If visit registration ever stops working, refresh both
# here — this is the only place the two magic version strings live.
_CLIENT_VERSION = 'v1.1.244'
_SERVER_VERSION = 'v2026.09.02.2'

# ---------------------------------------------------------------------------
# Friends-of-friends ("关注的关注") source — a THIRD traversal list, parallel to
# following / fans.
#
# The crawl itself lives in `weibo_tool.fof` (shared with `stranger-visit`,
# which needs the very same pool): ONE implementation, ONE cache directory
# (src/.cache/fof/<owner_uid>/<friend_uid>.json). We synthesise the list by
# crawling the FULL follow list of every one of the owner's friends
# (`friendships/friends`), then union the results into a normal relation snapshot
# so the rest of this module can treat it like any other list. The owner's own
# following + fans are excluded so the list is genuinely NEW exposure (visiting
# someone already covered by the following/fans lists is wasted work).
#
# NOTE: the first crawl is HEAVY (one paginated request per friend, ~1250 for a
# typical account). It is fully resumable — interrupted runs skip already-cached
# friends — and cached afterwards, so later runs are cheap.
FOF_SNAPSHOT_NAME = 'friends_of_friends.json'


def _snapshot_filename(kind):
    """Map a traversal kind to its relation-snapshot filename.

    Most kinds use '<kind>.json'; 'fof' (friends-of-friends) uses the dedicated
    friends_of_friends.json produced by _ensure_fof_snapshot().
    """
    if kind == 'fof':
        return FOF_SNAPSHOT_NAME
    return '%s.json' % kind


def _snapshot_path(uid, kind):
    return os.path.join(DATA_ROOT, str(uid), _snapshot_filename(kind))


def _load_uids(uid, kind):
    """Return (uid_list, user_by_uid, None) or (None, None, error_msg).

    The relation snapshot stores the FULL user object, so we also hand back a
    uid -> record map. That lets callers filter (e.g. skip organization accounts
    in profile-visit) using verified/verified_type WITHOUT an extra API call.
    """
    path = _snapshot_path(uid, kind)
    if not os.path.exists(path):
        return None, None, 'snapshot missing: %s (run %s-sync first)' % (path, kind)
    payload = _load_json(path, {})
    users = payload.get('users') or []
    seen = set()
    out = []
    by_uid = {}
    for r in users:
        u = str(r.get('uid')) if r.get('uid') else None
        if u and u not in seen:
            seen.add(u)
            out.append(u)
            by_uid[u] = r
    if not out:
        return None, None, 'snapshot %s has no users (run %s-sync first)' % (path, kind)
    return out, by_uid, None


def _progress_path(uid, kind):
    """Long-lived per-list progress file (NOT per-day).

    Keeps a traversal resumable across sessions/days until every uid in that
    list has been visited once — which is what "visit the whole list" needs.
    """
    d = os.path.join(CACHE_ROOT, str(uid))
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, 'progress_%s.json' % kind)


def _load_visited(path):
    return set(_load_json(path, []) or [])


def _save_visited(path, visited):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(sorted(visited), f, ensure_ascii=False, indent=2)


def _get_xsrf(auth):
    """Best-effort XSRF-TOKEN cookie value (may be empty; not required)."""
    for c in auth.session.cookies:
        if c.name == 'XSRF-TOKEN':
            return c.value
    return ''


def _visit_headers(auth, uid):
    """Browser-style request headers for the open-profile sequence."""
    xsrf = _get_xsrf(auth)
    h = {
        'User-Agent': _UA,
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'client-version': _CLIENT_VERSION,
        'server-version': _SERVER_VERSION,
        'priority': 'u=1, i',
        'referer': 'https://weibo.com/u/%s' % uid,
        'sec-ch-ua': '"Chromium";v="152", "Not?A_Brand";v="24", "Google Chrome";v="152"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
    }
    if xsrf:
        h['x-xsrf-token'] = xsrf
    return h


def _visit_url(uid):
    """The single request that actually registers a profile visit.

    Proven minimal by ablation (2026-09-04, 29 fresh uids): dropping any of the
    other 8 requests a real browser fires does NOT stop registration, while
    dropping this one always does — and it is sufficient on its own.
    """
    return 'https://weibo.com/ajax/profile/info?uid=%s&scene=profile' % uid


def visit_one(auth, uid):
    """Register one profile visit using the single required request.

    The call goes through the shared `_request_json` engine (passing the
    browser-like headers above) so this command gets the same resilience as the
    crawlers: backoff on soft rate-limits, and AUTO-RECOVERY when the session
    dies mid-run (silent SSO renewal, falling back to a QR prompt). Without it a
    dead session turned every remaining uid into 'ratelimited' forever.

    Returns (status, user):
        status -> 'ok'          request completed; the visit is now recorded.
                  'ratelimited' no usable response after retries (retryable).
                  'banned'      account issue / ban (permanent for this uid).
        user   -> the `data.user` dict from the response on success, else None.
                  Callers may use it to refresh the stored snapshot record at
                  no extra API cost (see --update-profile).
    """
    obj = _request_json(auth, _visit_url(uid),
                        headers=_visit_headers(auth, uid),
                        retries=VISIT_RETRY_ATTEMPTS)
    if obj is None:
        # No usable response: network failure, a non-200 the engine could not
        # clear, or an unexpected `ok` after all retries. Retryable, so the uid
        # stays pending and is re-attempted on the next run.
        return 'ratelimited', None
    ban_reason = _is_ban_response(obj)
    issue_reason = _is_account_issue(obj)
    if ban_reason is not None or issue_reason is not None:
        # Keep Weibo's OWN wording (decoded from the `msg` param for a ban, or
        # the `message` field for a frozen account) so the reason is quotable
        # rather than our guess at it.
        reason = ban_reason or issue_reason or 'banned_unknown'
        global _LAST_BAN_REASON
        _LAST_BAN_REASON = reason
        logging.warning('banned/account-issue uid %s: %s' % (uid, reason))
        return 'banned', None
    user = (obj.get('data') or {}).get('user') or None
    return 'ok', user


# profile/info returns the full `data.user` object; we copy it VERBATIM into the
# snapshot record so the stored user JSON mirrors profile/info's `data.user`
# structure exactly (requirement: stored data must match profile/info shape).
# Tooling keys added by relations_sync (uid / _source / first_seen_at) are
# preserved, never overwritten by the copy.
_TOOL_KEYS = ('uid', '_source', 'first_seen_at')
# Rewriting the whole snapshot is not free, so refresh it in chunks rather
# than after every single visit.
_UPDATE_BATCH = 100


def _derive_membership(user):
    """Derive the membership tier hierarchy from the raw profile/info fields.

    Weibo models membership on three parallel axes (none definitively implies
    another), plus plain users with no membership at all:
      * vip  (普通会员) -> mbtype/mbrank > 0      (basic paid membership)
      * svip (社交会员) -> social membership flag
      * vvip (经营会员) -> business / operating membership flag
    `tier` is the highest applicable label; the per-axis booleans capture any
    coexistence (a user can be both vip and svip, etc.).
    """
    mbtype = user.get('mbtype') or 0
    mbrank = user.get('mbrank') or 0
    svip = bool(user.get('svip'))
    vvip = bool(user.get('vvip'))
    is_vip = (mbtype > 0) or (mbrank > 0)
    if vvip:
        tier = 'vvip'        # 经营会员
    elif svip:
        tier = 'svip'        # 社交会员
    elif is_vip:
        tier = 'vip'         # 普通会员
    else:
        tier = 'none'        # 普通用户（无会员）
    return {
        'tier': tier,
        'is_member': is_vip or svip or vvip,
        'is_vip': is_vip,          # 普通会员
        'is_svip': svip,          # 社交会员
        'is_vvip': vvip,          # 经营会员
        'mbtype': mbtype,
        'mbrank': mbrank,
    }


# Membership is read straight from the relation snapshot, which keeps every
# field the API returned verbatim, so these keys are already present on each
# stored record (no extra API call needed to decide who to visit).
_MEMBERSHIP_KEYS = ('svip', 'vvip', 'mbtype', 'mbrank')


def _is_svip_or_vvip(rec):
    """True when the record models an svip or vvip account."""
    m = _derive_membership(rec or {})
    return bool(m.get('is_svip') or m.get('is_vvip'))


def _filter_svip_only(kind, uids, user_by_uid):
    """Keep only svip/vvip accounts — the only ones who can SEE a visit.

    Weibo only surfaces the visitor list to accounts that are at least svip, so
    registering a visit against anyone below that tier is wasted: they can never
    see it. The cut runs BEFORE any request is sent.

    Safety net: if the snapshot carries none of the membership fields for ANY
    target, the filter cannot be trusted. Rather than silently visiting nobody,
    we visit every personal account (svip filter disabled for the run) and warn.
    """
    has_any = any(
        any(k in (user_by_uid.get(u) or {}) for k in _MEMBERSHIP_KEYS)
        for u in uids)
    if not has_any:
        print('  (warn) %s: svip-only found no membership fields '
              '(svip/vvip/mbtype/mbrank) in the snapshot; cannot filter '
              'reliably, so visiting all personal accounts (svip filter '
              'disabled this run).' % kind)
        return list(uids)
    kept, skipped = [], 0
    for u in uids:
        rec = user_by_uid.get(u) or {}
        if _is_svip_or_vvip(rec):
            kept.append(u)
        else:
            skipped += 1
    if skipped:
        print('  (note) %s: svip-only skipped %d non-svip/vvip account(s).'
              % (kind, skipped))
    return kept


def _apply_profile_updates(owner_uid, kind, users_by_uid):
    """Refresh snapshot records from data the visit request already returned.

    This reuses the response of the request we send anyway to register the
    visit, so it costs no extra API call. The ENTIRE `data.user` dict from
    profile/info is copied into each stored record (structure parity with the
    profile/info `data.user`), and a derived `membership` block is attached to
    make the tier hierarchy explicit. Tooling keys (uid / _source /
    first_seen_at) are left intact, and only last_seen_at is bumped.
    Returns the number of records updated.
    """
    if not users_by_uid:
        return 0
    path = _snapshot_path(owner_uid, kind)
    payload = _load_json(path, None)
    records = (payload or {}).get('users') or []
    if not records:
        return 0
    now_iso = _now_iso()
    changed = 0
    for r in records:
        user = users_by_uid.get(str(r.get('uid')))
        if not user:
            continue
        for k, v in user.items():
            if k in _TOOL_KEYS:
                continue
            r[k] = v
        r['membership'] = _derive_membership(user)
        r['last_seen_at'] = now_iso
        changed += 1
    if changed:
        _save_json(path, payload)
    return changed


def _verify_registered(auth):
    """Return the set of uids the owner has actually visited, drawn from BOTH
    self-visible lists returned by topicContent:
        - "我经常访问的人(仅自己可见)"  (frequent contacts — stable)
        - "我的访问记录（仅自己可见）"  (recent visits, split 今天/近7天/更早)
    These two lists are MUTUALLY EXCLUSIVE: a given uid lives in exactly one of
    them. A successful visit therefore lands in one or the other, so a target
    counts as "registered" if its uid appears in EITHER list. Checking only
    "我的访问记录" would wrongly report frequent contacts as failures (this was
    a real bug: frequent contacts were dropped from the cache as "failed").
    Returns None on failure (e.g. network error).
    """
    try:
        r = auth.session.get(TOPIC_URL, headers={
            'User-Agent': _UA, 'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://weibo.com/', 'x-requested-with': 'XMLHttpRequest'},
            timeout=20, allow_redirects=False)
        obj = r.json()
    except Exception:
        return None
    rec = set()

    def _collect(node):
        # Both sections nest user ids under differing shapes ('id' inside a
        # user dict, or directly), so walk recursively and grab any id/uid.
        if isinstance(node, dict):
            for k, v in node.items():
                if k in ('id', 'uid') and isinstance(v, (str, int)):
                    rec.add(str(v))
                _collect(v)
        elif isinstance(node, list):
            for v in node:
                _collect(v)

    for sec in obj.get('data', {}).get('data', []):
        # Restrict to visit-related sections; '访问' appears in both titles.
        if '访问' in (sec.get('title') or ''):
            _collect(sec)
    return rec


# Verify + persist progress after every N visits. Kept small because the
# visit-record list has a limited capacity and evicts older entries.
_VERIFY_BATCH = 10

# Visit requests renew a dead session automatically, so a run of back-to-back
# failures means one of two very different things: we are being throttled (cool
# down and carry on) or the session is gone for good (spent SSO credential and
# nobody around to scan the QR). Counting failures cannot tell them apart, and
# guessing wrong is expensive either way — aborting on throttling loses a
# perfectly good run, while sleeping through a dead session burns minutes per
# uid before giving up. So after this many failures in a row we simply ASK the
# Auth object which one it is.
_SESSION_PROBE_AFTER = 5

# A profile visit is by far the most aggressively throttled call we make
# (confirmed: HTTP 414 + 访问过于频繁 page), so it gets a far deeper retry
# budget than the crawlers — a throttled person is worth waiting out rather
# than dropping. The crawlers keep `_request_json`'s default instead.
VISIT_RETRY_ATTEMPTS = 10

# Weibo's own wording for the most recent ban / account-issue. Published here
# because `visit_one` can only return a status string (its 2-tuple shape is
# relied upon elsewhere), so callers that want to record WHY a uid was rejected
# read this right after the call.
_LAST_BAN_REASON = None


def last_ban_reason():
    """Reason text of the most recent 'banned' verdict, or None."""
    return _LAST_BAN_REASON

# Soft rate-limit handling: how many consecutive failures earn a long pause.
_COOLDOWN_EVERY = 5
_COOLDOWN_SECONDS = 60


def _verify_pending(auth, pending):
    """Classify a batch of visits; returns (done, verified, lookup_ok).

    `pending` holds (uid, status) pairs. A visit counts as done if it is
    EITHER verified in the visit records OR the request itself returned 'ok'.

    The visit-record list has a limited capacity and evicts older entries, so
    a successful request whose uid has already been evicted is still a
    completed visit. Trusting 'ok' is what lets a full traversal terminate
    instead of re-visiting the same accounts forever; genuine failures
    ('ratelimited' / 'banned') are never credited, so they get retried.
    """
    rec = _verify_registered(auth)
    if rec is None:
        return set(), set(), False
    done, verified = set(), set()
    for u, st in pending:
        if u in rec:
            verified.add(u)
            done.add(u)
        elif st == 'ok':
            done.add(u)      # trusted: success, but record already evicted
    return done, verified, True


def _report_progress(i, total, stats, verified, start):
    print('  %d/%d  ok=%d  ratelimited=%d  banned=%d  verified=%d  (%ds)'
          % (i, total, stats['ok'], stats['ratelimited'], stats['banned'],
             verified, int(time.time() - start)), flush=True)


def _visit_list(auth, owner_uid, kind, uids, args, force=False):
    """Visit every uid of one relation list, resuming from saved progress.

    Progress is long-lived and per-list, so repeated runs keep advancing until
    the whole list has been visited once. `force=True` re-visits the given uids
    regardless of progress (used by --uids).
    """
    progress_path = _progress_path(owner_uid, kind)
    if args.new and os.path.exists(progress_path):
        os.remove(progress_path)
        print('[profile-visit] cleared progress for %s/%s (new round)'
              % (owner_uid, kind))

    done = _load_visited(progress_path)
    uid_set = set(uids)
    done_here = done & uid_set
    if force:
        todo = list(uids)
    else:
        todo = [u for u in uids if u not in done]
    if args.limit:
        todo = todo[:args.limit]

    print('\n[profile-visit] list=%s  total=%d  done_before=%d  todo=%d%s'
          % (kind, len(uids), len(done_here), len(todo),
             '  (force)' if force else ''))
    if not todo:
        print('  list "%s" fully visited (%d/%d). Use --new for a new round.'
              % (kind, len(done_here), len(uids)))
        return 0

    stats = {'ok': 0, 'ratelimited': 0, 'banned': 0}
    pending = []           # visited but not yet verified as registered
    profile_updates = {}   # uid -> data.user, collected for --update-profile
    verified_total = 0
    updated_total = 0
    start = time.time()
    consec_rl = 0      # failures since the last cool-down pause
    consec_fail = 0    # failures since the last success (session-probe guard)
    aborted = False
    for i, u in enumerate(todo, 1):
        status, user = visit_one(auth, u)
        stats[status] = stats.get(status, 0) + 1
        pending.append((u, status))
        if user and getattr(args, 'update_profile', False):
            profile_updates[str(u)] = user
        if status == 'ratelimited':
            consec_rl += 1
            consec_fail += 1
            if consec_fail >= _SESSION_PROBE_AFTER:
                # `_request_json` re-logs in on its own, so a streak this long
                # is throttling or a session that will not come back. Ask once:
                # a live session proves throttling, a dead one means nobody is
                # scanning and every remaining uid would fail too. Stopping here
                # keeps the progress already saved, so a later run — after a
                # manual login — resumes from it instead of re-doing the list.
                if not auth.ensure_session():
                    print('\n  aborting: %d consecutive failures and the session '
                          'could not be recovered. Log in again, then re-run to '
                          'resume from the saved progress.' % consec_fail)
                    aborted = True
                    break
                consec_fail = 0
            if consec_rl >= _COOLDOWN_EVERY:
                print('  rate-limited %d times in a row; pausing %ds...'
                      % (consec_rl, _COOLDOWN_SECONDS))
                time.sleep(_COOLDOWN_SECONDS)
                consec_rl = 0
        else:
            consec_rl = 0
            consec_fail = 0
            if status == 'banned':
                print('  banned/blocked uid %s - skipped for this run' % u)

        # Flush progress in batches: the visit-record list has limited
        # capacity and evicts older entries, so verify often — while the
        # entries are still present — rather than only at the end.
        if len(pending) >= _VERIFY_BATCH:
            newly, verified_now, ok = _verify_pending(auth, pending)
            if ok:
                if newly:
                    done = done | newly
                    _save_visited(progress_path, done)
                verified_total += len(verified_now)
                pending = []
            _report_progress(i, len(todo), stats, verified_total, start)

        # Refresh the snapshot from data we already have, in chunks.
        if len(profile_updates) >= _UPDATE_BATCH:
            updated_total += _apply_profile_updates(
                owner_uid, kind, profile_updates)
            profile_updates = {}

    if pending:
        newly, verified_now, ok = _verify_pending(auth, pending)
        if ok:
            if newly:
                done = done | newly
                _save_visited(progress_path, done)
            verified_total += len(verified_now)
        else:
            print('  (note) final verification call failed; %d uid(s) stay '
                  'unconfirmed and will be retried next run.' % len(pending))

    if profile_updates:
        updated_total += _apply_profile_updates(
            owner_uid, kind, profile_updates)
        profile_updates = {}

    print('\n[profile-visit] %s list=%s'
          % ('ABORTED' if aborted else 'DONE', kind))
    print('  attempted           : %d' % len(todo))
    print('  ok=%d  ratelimited=%d  banned=%d'
          % (stats['ok'], stats['ratelimited'], stats['banned']))
    print('  verified registered : %d (this run)' % verified_total)
    if getattr(args, 'update_profile', False):
        print('  snapshot refreshed  : %d record(s)' % updated_total)
    print('  list progress       : %d/%d visited'
          % (len(done & uid_set), len(uids)))
    print('  elapsed=%ds' % int(time.time() - start))
    print('  progress: %s' % progress_path)
    # An aborted run (dead session / sustained failure) is a failure, so the
    # caller / scheduler sees a non-zero exit code. Completed runs return 0 even
    # when some uids are merely still pending.
    return 1 if aborted else 0


def _sync_relations(auth, kinds, args):
    """Refresh relation snapshots by re-running following-sync / fans-sync.

    This borrows the real sync command so the traversal always works from the
    latest lists. `_sync` refuses to overwrite an existing snapshot when the
    crawl yields no usable data, so a failed refresh leaves the current
    snapshot intact rather than corrupting it.
    """
    opts = SimpleNamespace(
        max_pages=getattr(args, 'sync_max_pages', 100000),
        csv=False,
        no_backup=False,
        resume=getattr(args, 'sync_resume', False),
    )
    for k in kinds:
        print('\n[profile-visit] refreshing the %s snapshot first...' % k)
        runner = run_following if k == 'following' else run_fans
        try:
            rc = runner(opts, auth)
        except Exception as e:
            print('  [warn] %s sync raised: %s (keeping existing snapshot)'
                  % (k, e))
            continue
        if rc:
            print('  [warn] %s sync exited %s (keeping existing snapshot)'
                  % (k, rc))


# ---------------------------------------------------------------------------
# friends-of-friends snapshot (the "关注的关注" list)
# ---------------------------------------------------------------------------
def _ensure_fof_snapshot(auth, owner_uid, args, force=False):
    """Build (or refresh) the friends-of-friends snapshot for `owner_uid`.

    Crawls the full follow list of EVERY one of the owner's friends via
    `weibo_tool.fof` (which caches each friend's list under
    src/.cache/fof/<owner_uid>/, resumable and SHARED with stranger-visit), then
    unions them into data/relations/<uid>/friends_of_friends.json. The owner's own
    following + fans are excluded so the result is genuinely NEW targets — visiting
    someone already covered by the following/fans lists is wasted work.

    The snapshot reuses the SAME shape as relations_sync (a `users` list), so
    `_load_uids()` reads it untouched. Skipped when the snapshot already exists and
    `force` is False. Pass force=True (from --sync / --refresh-fof) to rebuild.
    """
    snap_path = os.path.join(DATA_ROOT, str(owner_uid), FOF_SNAPSHOT_NAME)
    if (not force) and os.path.exists(snap_path):
        print('[profile-visit] fof snapshot already present: %s' % snap_path)
        return

    friends, _, err = _load_uids(owner_uid, 'following')
    if friends is None:
        print('[profile-visit] cannot build fof snapshot: %s' % err)
        return
    exclude = set(friends)
    fans, _, _ = _load_uids(owner_uid, 'fans')
    if fans:
        exclude |= set(fans)

    print('[profile-visit] building fof snapshot from %d friends '
          '(excluding %d own-graph uids)...' % (len(friends), len(exclude)))
    collected = fof.collect_fof(auth, friends, owner_uid, exclude=exclude,
                                refresh=force, verbose=True)

    snapshot = {
        'users': list(collected.values()),
        'fetched_at': _now_iso(),
        'source': 'friends-of-friends',
        'friend_count': len(friends),
        'excluded_own_graph': len(exclude),
    }
    os.makedirs(os.path.dirname(snap_path), exist_ok=True)
    _save_json(snap_path, snapshot)
    print('[profile-visit] fof snapshot written: %d targets -> %s'
          % (len(snapshot['users']), snap_path))


def run_visit(auth, kind, args):
    if not auth.ensure_session():
        print('Could not establish a session even after auto-recovery. '
              'If a QR code appeared, scan it, then re-run this command.')
        return 1

    owner_uid = auth.uid or auth.label or 'unknown'
    explicit_uids = [u.strip() for u in (getattr(args, 'uids', '') or '').split(',')
                     if u.strip()]

    # --uids: force-run exactly those uids, ignoring saved progress. Use a
    # dedicated `uids` progress file so these one-off retries never pollute the
    # per-list (following/fans) progress used by the full traversal.
    if explicit_uids:
        return _visit_list(auth, owner_uid, 'uids', explicit_uids, args,
                           force=True)

    if kind == 'all':
        kinds = ['following', 'fans', 'fof']
    elif kind == 'both':
        kinds = ['following', 'fans']
    else:
        kinds = [kind]

    # --sync: refresh the relation snapshots before traversing them.
    if getattr(args, 'sync', False):
        _sync_relations(auth, [k for k in kinds if k != 'fof'], args)

    # friends-of-friends must be crawled (heavy, resumable) before its list can be
    # traversed. Build lazily when missing; --sync / --refresh-fof force a rebuild.
    if 'fof' in kinds:
        _ensure_fof_snapshot(
            auth, owner_uid, args,
            force=getattr(args, 'sync', False) or getattr(args, 'refresh_fof', False))

    lists = []
    missing = []
    include_org = getattr(args, 'include_org', False)
    skip_org = should_skip_organization() and not include_org
    svip_only = getattr(args, 'svip_only', True)
    for k in kinds:
        uids, user_by_uid, err = _load_uids(owner_uid, k)
        if uids is None:
            missing.append((k, err))
            continue
        if skip_org:
            personal = []
            org_count = 0
            for u in uids:
                rec = user_by_uid.get(u) or {}
                if is_organization(rec.get('verified'), rec.get('verified_type')):
                    org_count += 1
                    continue
                personal.append(u)
            if org_count:
                print('  (note) %s: skipped %d organization account(s) '
                      '(enterprise / official / government / media).'
                      % (k, org_count))
        else:
            personal = uids
        if svip_only:
            personal = _filter_svip_only(k, personal, user_by_uid)
        lists.append((k, personal))
    if not lists:
        print('No relation snapshots available. Run following-sync / fans-sync first:')
        for k, e in missing:
            print('  [%s] %s' % (k, e))
        return 1
    for k, e in missing:
        print('  (note) %s skipped: %s' % (k, e))

    # Traverse each list fully, one after another, each with its own progress.
    rc = 0
    for k, uids in lists:
        rc = _visit_list(auth, owner_uid, k, uids, args) or rc
    return rc


def register(subparsers, parents=None):
    p = subparsers.add_parser(
        'profile-visit', parents=parents or [],
        help='Register profile visits via the web API (visits appear under '
             '我的访问记录 / 我经常访问的人).')
    p.add_argument('--kind', choices=['following', 'fans', 'fof', 'both', 'all'],
                   default='both',
                   help='Which relation list to visit (default: both). "fof" = '
                        'friends-of-friends (关注的关注). "all" = following + fans '
                        '+ fof. Each list is traversed fully and keeps its own '
                        'progress.')
    p.add_argument('--limit', type=int, default=0,
                   help='Max profiles to visit per list this run (0 = all '
                        'remaining; progress is saved so you can resume later).')
    p.add_argument('--new', action='store_true',
                   help='Clear the saved progress of the selected list(s) and '
                        'start the traversal over from the beginning (a new round).')
    p.add_argument('--uids', type=str, default='',
                   help='Comma-separated explicit uids to visit. Force-runs these '
                        'regardless of saved progress (used to retry specific '
                        'targets).')
    p.add_argument('--sync', action='store_true',
                   help='Re-run following-sync / fans-sync first, so the '
                        'traversal works from the latest lists. A failed '
                        'refresh never overwrites the existing snapshot. Also '
                        'rebuilds the friends-of-friends snapshot when fof/all '
                        'is selected.')
    p.add_argument('--refresh-fof', action='store_true',
                   help='Drop the cached per-friend follow lists and re-crawl the '
                        'friends-of-friends snapshot from scratch (heavy).')
    p.add_argument('--sync-max-pages', type=int, default=100000,
                   help='Page cap for the --sync crawl (default 100000).')
    p.add_argument('--sync-resume', action='store_true',
                   help='Let the --sync crawl resume from cached raw pages.')
    p.add_argument('--update-profile', action='store_true',
                   help='Refresh each stored snapshot record from the data the '
                        'visit request already returns (no extra API calls).')
    p.add_argument('--include-org', action='store_true',
                   help='Also visit organization (blue-V: enterprise / official / '
                        'government / media) accounts, overriding the configured '
                        'skip_organization policy.')
    p.add_argument('--svip-only', action=argparse.BooleanOptionalAction,
                   default=True,
                   help='Only visit svip/vvip accounts, because only they can see '
                        'the visitor list (default: on). Use --no-svip-only to '
                        'visit every personal account regardless of tier.')
    p.set_defaults(run=run_profile_visit)


def run_profile_visit(args, auth):
    return run_visit(auth, args.kind, args)
