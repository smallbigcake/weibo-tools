"""`following-sync` / `fans-sync` subcommands: snapshot the logged-in account's
FOLLOWING (关注) and FANS (粉丝) lists into local JSON files.

Each run:
  1. Pages through the FULL list for the active identity (no artificial cap).
  2. Writes the fresh snapshot to `data/relations/<uid>/<kind>.json`.
  3. Backs the PREVIOUS snapshot up to `data/relations/<uid>/history/
     <kind>_<YYYY-MM-DD>.json` before overwriting it (a numeric suffix is
     appended when several runs land on the same day), so history survives.
  4. Diffs against the previous snapshot and reports who appeared / vanished
     (new follows / unfollows, new fans / lost fans).

Endpoints (verified live)
-------------------------
  following: https://weibo.com/ajax/profile/followContent?page=<n>
                  &next_cursor=<c>&count=50
             payload -> data.follows.{users,total_number,next_cursor}
  fans:      https://weibo.com/ajax/friendships/friends?uid=<uid>&relate=fans
                  &type=fans&count=20&page=<n>&fansSortType=<sort>
             payload -> users, next_page, display_total_number
             `fansSortType` is fetched TWICE per run and MERGED by uid:
               * fansCount  - top fans ranked by their own follower count.
               * followTime - fans ordered by when they followed you (earliest).
             Both web sorts (rich ~127 fields) are merged, then the mobile
             container fills the long tail (sparse fields).

PRACTICAL FAN CAP (~5000 / session): the web `relate=fans` endpoint hard-caps at
~860 fans (`next_page` goes 0 while `display_total_number` is the true ~11870),
and the mobile container that supplies the rest returns `ok:0` (a soft rate-limit)
once it has paginated past `since_id`~5000. So a single run can enumerate at most
~5000 fans; the full `display_total_number` cannot be retrieved through these
public endpoints in one session. `fans-sync` therefore reports `complete=false`
and notes the gap when it stops short, and re-running only re-covers the same
~5000 (the list order is deterministic). Treat the fan snapshot as "top ~5000
fans" rather than the entire follower base.

Page size is fixed SERVER-SIDE: requesting count=20/50/100/200/500 returns the
same number of rows (~49 for following, ~11-20 for fans), so `count=50` /
`count=20` are simply passed as the largest observed sizes.

Timestamps
----------
Field fidelity: every field the API returns for a user is preserved VERBATIM in
the snapshot (no projection is applied), so the JSON is a faithful copy of the
server payload. A normalised `uid` key and provenance markers (`_source`,
`_fans_sort_type`) are added; the raw `id` / `idstr` stay.

Neither endpoint exposes the server-side "when did this follow happen" time.
`created_at` is each account's own REGISTRATION date, not the follow date. So
instead of inventing one, this module records what is genuinely observable:
  * `account_created_at` - the account's registration date.
  * `first_seen_at`      - when WE first observed this relation (kept across
                           every run via `first_seen_index.json`, so an
                           unfollow/refollow cycle does not reset it).
  * `last_seen_at`       - the most recent run that still saw the relation.
With the dated backups these bound how long a relation has existed, at the
resolution of the snapshot schedule.

Usage (from src/):
    python weibo-tool.py following-sync --user cake
    python weibo-tool.py fans-sync --user cake --csv
    python weibo-tool.py fans-sync --user cake --resume   # continue an
                                                          # interrupted crawl
"""
import argparse
import csv
import json
import logging
import os
import shutil
import sys
import time
from datetime import datetime, timedelta, timezone

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so sibling imports and the data dirs are stable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
_setup_logging()

# Reuse the proven request engine (backoff, soft-rate-limit handling, session
# auto-recovery) and its polite delay for both endpoints.
from weibo_tool.commands.blacklist_deep import (
    _request_json, _sleep, _try_recover_session)

DATA_ROOT = os.path.join(_SRC_DIR, 'data', 'relations')
CACHE_ROOT = os.path.join(_SRC_DIR, '.cache', 'relations_sync')

# Server caps the row count per page; these are the largest observed values.
# `sortType=all` is the canonical value the web UI sends. The server IGNORES it
# for this endpoint (verified live: sortType all / new / attention all return
# identical data, 113 fields per user, same 49-per-page order) - so unlike fans
# (fansCount vs followTime) there is only ONE following list to paginate.
# `next_cursor` from the previous page drives pagination (count is page size).
FOLLOWING_API = ('https://weibo.com/ajax/profile/followContent'
                 '?page=%d&next_cursor=%d&count=50&sortType=all')
# The web fans endpoint accepts two sort orders via `fansSortType`:
#   * fansCount  - top fans ranked by THEIR own follower count (the "biggest" fans).
#   * followTime - fans ordered by when THEY followed you (earliest first).
# Each sort independently hard-caps at ~860 entries and overlaps only partially,
# so we fetch BOTH and merge by uid to maximise rich-field coverage before the
# mobile container fills in the long tail.
FANS_API_TPL = ('https://weibo.com/ajax/friendships/friends?uid=%s&relate=fans'
                '&count=20&page=%d&type=fans&fansSortType=%s')
# The mobile fans container paginates by since_id and is the ONLY source that can
# enumerate the FULL fan list (the web `relate=fans` endpoint hard-caps at ~860).
MOBILE_FANS_API = ('https://m.weibo.cn/api/container/getIndex'
                   '?containerid=231051_-_fans_-_%s')

# The two web fan sort orders we always fetch and merge.
WEB_FAN_SORTS = ('fansCount', 'followTime')


def _request_mobile_json(auth, url, retries=6):
    """GET a JSON endpoint on m.weibo.cn with backoff + session auto-recovery.

    Mirrors `blacklist_deep._request_json`'s resilience (the container API can
    soft-fail with a 302 to the login page when the session dies), but keeps its
    own success check because the mobile payload has a different shape.

    A heavily-paginated fans crawl trips Weibo's SOFT rate-limit: the endpoint
    returns HTTP 200 with `ok:0` (empty body) rather than an error. We treat
    `ok:0` as retryable and back off with a LONG, doubling schedule (up to ~2
    minutes) so the limit can cool down and the crawl can resume mid-list
    instead of bailing out thousands of fans short.
    """
    delay = 15
    for _ in range(retries):
        try:
            resp = auth.session.get(
                url,
                headers={
                    'User-Agent': auth.session.headers.get('User-Agent', ''),
                    'Accept': 'application/json, text/plain, */*',
                    'Referer': 'https://m.weibo.cn/',
                    'x-requested-with': 'XMLHttpRequest',
                },
                timeout=20, allow_redirects=False)
            if resp.status_code in (301, 302, 303, 307, 308):
                is_login = 'login' in resp.headers.get('Location', '').lower()
                if is_login and _try_recover_session(auth):
                    continue
                logging.warning('  mobile backoff (http %s) on %s'
                                % (resp.status_code, url))
                time.sleep(delay)
                delay = min(delay * 2, 120)
                continue
            if resp.status_code == 403:
                logging.warning('  mobile backoff (http 403) on %s' % url)
                time.sleep(delay)
                delay = min(delay * 2, 120)
                continue
            if resp.status_code != 200:
                logging.warning('  mobile http %s on %s'
                                % (resp.status_code, url))
                time.sleep(delay)
                delay = min(delay * 2, 120)
                continue
            obj = resp.json()
            if obj.get('ok') != 1:
                logging.warning('  mobile soft-limit ok=%s (backing off %ds) on %s'
                                % (obj.get('ok'), delay, url))
                time.sleep(delay)
                delay = min(delay * 2, 120)
                continue
            return obj
        except Exception as e:
            logging.warning('  mobile request error %s on %s' % (e, url))
            time.sleep(delay)
            delay = min(delay * 2, 120)
    return None

_CST = timezone(timedelta(hours=8))

# Locale-independent month map: Weibo renders `created_at` as
# "Thu Oct 10 18:48:43 +0800 2024", which strptime cannot parse reliably on a
# non-English locale.
_MONTHS = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
           'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}

_CSV_COLUMNS = [
    'uid', 'screen_name', 'remark', 'gender', 'verified', 'verified_type',
    'verified_reason', 'followers_count', 'friends_count', 'statuses_count',
    'location', 'description', 'account_created_at', 'follow_me', 'following',
    'special_follow', 'first_seen_at', 'last_seen_at', 'profile_url',
]


# ---------------------------------------------------------------------------
# paths / io helpers
# ---------------------------------------------------------------------------

def _account_dir(uid):
    return os.path.join(DATA_ROOT, str(uid))


def _history_dir(uid):
    return os.path.join(_account_dir(uid), 'history')


def _latest_path(uid, kind):
    return os.path.join(_account_dir(uid), '%s.json' % kind)


def _index_path(uid):
    return os.path.join(_account_dir(uid), 'first_seen_index.json')


def _page_cache_dir(uid, kind, source=None):
    d = os.path.join(CACHE_ROOT, str(uid), kind)
    if source:
        d = os.path.join(d, source)
    return d


def _page_cache_path(uid, kind, source, page):
    return os.path.join(_page_cache_dir(uid, kind, source),
                        'page_%05d.json' % page)


def _ensure_dirs(uid):
    os.makedirs(_account_dir(uid), exist_ok=True)
    os.makedirs(_history_dir(uid), exist_ok=True)


def _load_json(path, default=None):
    try:
        with open(path, 'r', encoding='utf-8-sig') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError, OSError, ValueError):
        return default


def _save_json(path, obj):
    d = os.path.dirname(os.path.abspath(path))
    if d:
        os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def _clear_page_cache(uid, kind):
    """Delete cached raw pages for this (uid, kind).

    Files are removed one-by-one (not via a bulk rmtree of a directory holding
    >50 files) because the sandbox interposes a confirmation prompt on bulk
    deletes and would otherwise stall an unattended run.
    """
    d = _page_cache_dir(uid, kind)
    if not os.path.isdir(d):
        return
    for root, dirs, files in os.walk(d, topdown=False):
        for fn in files:
            try:
                os.remove(os.path.join(root, fn))
            except OSError:
                pass
        for dn in dirs:
            try:
                os.rmdir(os.path.join(root, dn))
            except OSError:
                pass


# ---------------------------------------------------------------------------
# value helpers
# ---------------------------------------------------------------------------

def _now():
    return datetime.now(_CST)


def _now_iso():
    return _now().isoformat(timespec='seconds')


def _parse_weibo_time(s):
    """Parse Weibo's "Thu Oct 10 18:48:43 +0800 2024" into an ISO-8601 string.

    Returns None when absent/unparseable (locale-independent by construction,
    unlike strptime's %a/%b).
    """
    if not s or not isinstance(s, str):
        return None
    parts = s.split()
    if len(parts) != 6:
        return None
    try:
        month = _MONTHS.get(parts[1])
        if not month:
            return None
        day = int(parts[2])
        hh, mm, ss = (int(x) for x in parts[3].split(':'))
        year = int(parts[5])
        tz = parts[4]
        sign = -1 if tz.startswith('-') else 1
        offset = timedelta(hours=int(tz[1:3]), minutes=int(tz[3:5]))
        return datetime(year, month, day, hh, mm, ss,
                        tzinfo=timezone(sign * offset)).isoformat()
    except (ValueError, IndexError, TypeError):
        return None


def _build_record(u, source, fans_sort_type=None):
    """Record a user with EVERY field the API returned (no field is dropped).

    The Weibo web friendships endpoint returns a rich ~127-field user object and
    the mobile container a sparser one; we keep all of them verbatim so the
    snapshot is a faithful copy of the server payload. A normalised `uid` key and
    provenance markers are added for tooling; the original `id` / `idstr` stay.

    `source` is one of: 'web_following', 'web_fans_fansCount',
    'web_fans_followTime', 'mobile_fans'. `fans_sort_type` identifies which fan
    sort produced a web fan record.
    """
    uid = str(u.get('id') or u.get('idstr') or '')
    if not uid:
        return None
    rec = dict(u)
    rec['uid'] = uid  # normalised lookup key; does not clobber any API field
    rec['_source'] = source
    if fans_sort_type:
        rec['_fans_sort_type'] = fans_sort_type
    # Derived convenience keys (raw fields are preserved unchanged):
    rec.setdefault('account_created_at', _parse_weibo_time(u.get('created_at')))
    rec.setdefault('profile_url', 'https://weibo.com/u/%s' % uid)
    return rec


# ---------------------------------------------------------------------------
# fetching
# ---------------------------------------------------------------------------

def _fetch_page(auth, url, uid, kind, source, page, resume):
    """GET one page, optionally serving/populating the raw-page cache."""
    cache = _page_cache_path(uid, kind, source, page)
    if resume:
        cached = _load_json(cache, None)
        if cached is not None:
            return cached, True
    if source == 'mobile':
        obj = _request_mobile_json(auth, url)
    else:
        obj = _request_json(auth, url)
    if obj is not None and obj.get('ok') == 1:
        _save_json(cache, obj)
    return obj, False


def fetch_following(auth, uid, max_pages=100000, resume=False, verbose=True):
    """Page through the account's full following list.

    Returns (records, meta). `meta['pages_ok']` is how many pages came back
    successfully - the caller refuses to overwrite good data when it is 0.
    """
    records = []
    seen = set()
    total_number = None
    pages_ok = 0
    page = 1
    cursor = 0
    filtered_flag = None
    stop_reason = 'page_cap'
    largest_page = 0
    while page <= max_pages:
        obj, _ = _fetch_page(auth, FOLLOWING_API % (page, cursor),
                             uid, 'following', 'web', page, resume)
        if obj is None or obj.get('ok') != 1:
            stop_reason = 'request_failed'
            break
        _sleep()
        pages_ok += 1
        follows = (obj.get('data') or {}).get('follows') or {}
        users = follows.get('users') or []
        if total_number is None:
            total_number = follows.get('total_number')
            filtered_flag = follows.get('has_filtered_attentions')
        largest_page = max(largest_page, len(users))
        if not users:
            stop_reason = 'empty_page'
            break
        for u in users:
            rec = _build_record(u, 'web_following')
            if not rec['uid'] or rec['uid'] in seen:
                continue
            seen.add(rec['uid'])
            records.append(rec)
        if total_number and len(records) >= total_number:
            stop_reason = 'server_total_reached'
            break
        next_cursor = follows.get('next_cursor')
        if not next_cursor:
            stop_reason = 'no_more_pages'
            break
        cursor = next_cursor
        page += 1
        if verbose and pages_ok % 10 == 0:
            print('  [following] %d collected (page %d, server total %s)'
                  % (len(records), page, total_number))
    meta = {
        'endpoint': 'weibo.com/ajax/profile/followContent',
        'pages_ok': pages_ok,
        'total_number': total_number,
        'enumerated': len(records),
        'stop_reason': stop_reason,
        'largest_page_size': largest_page,
        'server_filters_list': filtered_flag,
    }
    return records, meta


def fetch_fans(auth, uid, max_pages=100000, resume=False, verbose=True):
    """Page the account's FULL fan list (no artificial cap).

    HYBRID strategy, because no single endpoint can both be rich AND complete:

      * Phase 1a — web `/ajax/friendships/friends?relate=fans&fansSortType=
        fansCount` returns the richest user records, but the server hard-caps
        each sort at ~860 fans.
      * Phase 1b — the SAME web endpoint with `fansSortType=followTime` returns
        the earliest fans by follow time; it overlaps the count sort only
        partially, so fetching BOTH widens rich-field coverage before the cap.
      * Phase 2 — the mobile container `231051_-_fans_-_<uid>` paginates by
        `since_id` and enumerates the ENTIRE list, but its user objects carry
        far fewer fields (no registration time, location, remark, statuses_count).

    We merge by uid, preferring the richest source on collision (any web sort
    over mobile; fansCount over followTime since the shape is identical). Every
    field the API returned is preserved verbatim in each record.

    Returns (records, meta). Entries that do not report `follow_me` are injected
    recommendations rather than fans and are dropped (and counted).
    """
    # --- Phase 1: web rich records (both sort orders) --------------------
    fc_records, fc_total, fc_pages, fc_stop, fc_largest, fc_rec = _fetch_web_fans(
        auth, uid, 'fansCount', max_pages, resume, verbose)
    ft_records, ft_total, ft_pages, ft_stop, ft_largest, ft_rec = _fetch_web_fans(
        auth, uid, 'followTime', max_pages, resume, verbose)

    # Combine the two web sorts: fansCount wins on collision (identical shape,
    # so the winner only affects the provenance marker).
    web_records = dict(ft_records)
    web_records.update(fc_records)
    total_number = fc_total or ft_total
    web_pages_ok = fc_pages + ft_pages
    web_largest = max(fc_largest, ft_largest)
    web_recommended = fc_rec + ft_rec

    # --- Phase 2: mobile sparse records for full coverage ----------------
    mobile_records = {}
    mobile_pages_ok = 0
    mobile_stop = 'page_cap'
    mobile_recommended = 0
    since = None
    hop = 0
    while hop < max_pages:
        hop += 1
        url = MOBILE_FANS_API % uid
        if since:
            url += '&since_id=%s' % since
        obj, _ = _fetch_page(auth, url, uid, 'fans', 'mobile_fans', hop, resume)
        if obj is None or obj.get('ok') != 1:
            mobile_stop = 'request_failed'
            break
        _sleep()
        mobile_pages_ok += 1
        data = obj.get('data') or {}
        info = data.get('cardlistInfo') or {}
        items = []
        for card in (data.get('cards') or []):
            for cg in (card.get('card_group') or []):
                u = cg.get('user')
                if u:
                    items.append(u)
        for u in items:
            if not u.get('follow_me'):
                mobile_recommended += 1
                continue
            rec = _build_record(u, 'mobile_fans')
            if rec and rec['uid']:
                mobile_records[rec['uid']] = rec
        new_since = info.get('since_id')
        if not new_since or str(new_since) == str(since):
            mobile_stop = 'no_more_pages'
            break
        since = new_since
        if verbose and mobile_pages_ok % 25 == 0:
            print('  [fans-mobile] %d collected (hop %d)'
                  % (len(mobile_records), hop))

    # --- Merge: rich web record wins on uid collision --------------------
    records = []
    seen = set()
    for uid_key, mrec in mobile_records.items():
        rec = web_records.get(uid_key, mrec)
        records.append(rec)
        seen.add(uid_key)
    for uid_key, wrec in web_records.items():
        if uid_key not in seen:
            records.append(wrec)
            seen.add(uid_key)

    recommended_dropped = web_recommended + mobile_recommended
    web_complete = (fc_stop in ('no_more_pages', 'server_total_reached')
                    and ft_stop in ('no_more_pages', 'server_total_reached'))
    web_stop = 'fansCount=%s, followTime=%s' % (fc_stop, ft_stop)
    meta = {
        'endpoint': ('hybrid: web /ajax/friendships/friends?relate=fans '
                     '(fansCount + followTime sorts, rich, each capped ~860) '
                     '+ m.weibo.cn container 231051_-_fans (sparse, full)'),
        'web_fansCount': {
            'pages_ok': fc_pages, 'enumerated': len(fc_records), 'stop': fc_stop},
        'web_followTime': {
            'pages_ok': ft_pages, 'enumerated': len(ft_records), 'stop': ft_stop},
        'web_complete': web_complete,
        'web_pages_ok': web_pages_ok,
        'web_enumerated': len(web_records),
        'mobile_pages_ok': mobile_pages_ok,
        'mobile_enumerated': len(mobile_records),
        'pages_ok': web_pages_ok + mobile_pages_ok,
        'total_number': total_number,
        'enumerated': len(records),
        'web_stop': web_stop,
        'mobile_stop': mobile_stop,
        'stop_reason': 'web=%s, mobile=%s' % (web_stop, mobile_stop),
        'largest_page_size': web_largest,
        'recommended_dropped': recommended_dropped,
        'server_filters_list': None,
    }
    return records, meta


def _fetch_web_fans(auth, uid, sort_type, max_pages, resume, verbose):
    """Page ONE web fan sort (`fansCount` or `followTime`).

    Returns (records_by_uid, display_total_number, pages_ok, stop_reason,
    largest_page_size, recommended_dropped).
    """
    records = {}
    total_number = None
    pages_ok = 0
    page = 1
    recommended_dropped = 0
    stop = 'page_cap'
    largest = 0
    while page <= max_pages:
        url = FANS_API_TPL % (uid, page, sort_type)
        obj, _ = _fetch_page(auth, url, uid, 'fans', 'web_%s' % sort_type,
                             page, resume)
        if obj is None or obj.get('ok') != 1:
            stop = 'request_failed'
            break
        _sleep()
        pages_ok += 1
        users = obj.get('users') or []
        if total_number is None:
            total_number = obj.get('display_total_number')
        largest = max(largest, len(users))
        for u in users:
            if not u.get('follow_me'):
                # Recommendation injected into the fans tab, not a real fan.
                recommended_dropped += 1
                continue
            rec = _build_record(u, 'web_fans_%s' % sort_type, sort_type)
            if rec and rec['uid']:
                records[rec['uid']] = rec
        next_page = obj.get('next_page')
        if not next_page:
            # The web fans endpoint hard-caps at ~860 fans, but a soft rate-limit
            # can also return `next_page:0` early. If we are still well under the
            # server's total and the real cap, retry the SAME page after a pause
            # before declaring the list exhausted.
            if (total_number is None or len(records) < total_number) \
                    and len(records) < 900:
                recovered = False
                for _ in range(3):
                    time.sleep(20)
                    robj, _ = _fetch_page(
                        auth, FANS_API_TPL % (uid, page, sort_type),
                        uid, 'fans', 'web_%s' % sort_type, page, resume)
                    if (robj and robj.get('ok') == 1
                            and (robj.get('users') or [])
                            and robj.get('next_page')):
                        obj = robj
                        users = obj.get('users') or []
                        for u in users:
                            if not u.get('follow_me'):
                                recommended_dropped += 1
                                continue
                            rec = _build_record(u, 'web_fans_%s' % sort_type,
                                                sort_type)
                            if rec and rec['uid']:
                                records[rec['uid']] = rec
                        next_page = obj.get('next_page')
                        recovered = True
                        break
                if recovered:
                    page = (next_page if isinstance(next_page, int)
                            else page + 1)
                    continue
            stop = 'no_more_pages'
            break
        if not users:
            stop = 'empty_page'
            break
        page = next_page if isinstance(next_page, int) else page + 1
        if verbose and pages_ok % 25 == 0:
            print('  [fans-web/%s] %d rich collected (page %d, server total %s)'
                  % (sort_type, len(records), page, total_number))
    return records, total_number, pages_ok, stop, largest, recommended_dropped


# ---------------------------------------------------------------------------
# snapshot / backup / diff
# ---------------------------------------------------------------------------

def _snapshot_date(prev, latest_path):
    """Date stamp for the backup: when the OLD snapshot was captured.

    Prefers the previous payload's own `generated_at`, falling back to the
    file's mtime, then to today.
    """
    if isinstance(prev, dict):
        g = prev.get('generated_at')
        if g:
            try:
                return datetime.fromisoformat(g).strftime('%Y-%m-%d')
            except (ValueError, TypeError):
                pass
    try:
        return datetime.fromtimestamp(
            os.path.getmtime(latest_path)).strftime('%Y-%m-%d')
    except OSError:
        return _now().strftime('%Y-%m-%d')


def _backup_previous(uid, kind, prev):
    """Copy the current latest snapshot into history/ with a dated filename.

    Returns the backup path, or None when there was nothing to back up.
    """
    latest = _latest_path(uid, kind)
    if not os.path.exists(latest):
        return None
    stamp = _snapshot_date(prev, latest)
    base = '%s_%s' % (kind, stamp)
    path = os.path.join(_history_dir(uid), '%s.json' % base)
    n = 1
    while os.path.exists(path):
        path = os.path.join(_history_dir(uid), '%s_%02d.json' % (base, n))
        n += 1
    shutil.copy2(latest, path)
    return path


def _stamp_records(records, index, now_iso):
    """Attach first/last-seen timestamps, extending the persistent index."""
    for r in records:
        uid = r['uid']
        first = index.get(uid)
        if not first:
            first = now_iso
            index[uid] = first
        r['first_seen_at'] = first
        r['last_seen_at'] = now_iso
    return records


def _diff(prev_records, records):
    """Compute added/removed uid sets between the previous and new snapshot."""
    old = {r.get('uid'): r for r in (prev_records or []) if r.get('uid')}
    new = {r['uid'] for r in records}
    added = [{'uid': r['uid'], 'screen_name': r.get('screen_name')}
             for r in records if r['uid'] not in old]
    removed = [{'uid': uid,
                'screen_name': old[uid].get('screen_name'),
                'last_seen_at': old[uid].get('last_seen_at')}
               for uid in old if uid not in new]
    return added, removed


def _write_csv(path, records):
    _save_dir = os.path.dirname(os.path.abspath(path))
    if _save_dir:
        os.makedirs(_save_dir, exist_ok=True)
    with open(path, 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=_CSV_COLUMNS, extrasaction='ignore')
        w.writeheader()
        for r in records:
            w.writerow(r)


def _print_report(kind, records, meta, added, removed, backup_path, json_path):
    label = '关注 (following)' if kind == 'following' else '粉丝 (fans)'
    print('\n' + '=' * 64)
    print('Weibo %s sync — %d accounts' % (label, len(records)))
    print('=' * 64)
    print('  server total_number : %s' % meta.get('total_number'))
    if meta.get('web_stop') is not None:
        wb = meta.get('web_fansCount') or {}
        wt = meta.get('web_followTime') or {}
        print('  web fansCount (rich) : %d pages, %d fans (stop=%s)'
              % (wb.get('pages_ok', 0), wb.get('enumerated', 0), wb.get('stop', '')))
        print('  web followTime (rich): %d pages, %d fans (stop=%s)'
              % (wt.get('pages_ok', 0), wt.get('enumerated', 0), wt.get('stop', '')))
        print('  mobile pages (sparse): %d pages, %d fans (stop=%s)'
              % (meta.get('mobile_pages_ok', 0), meta.get('mobile_enumerated', 0),
                 meta.get('mobile_stop', '')))
    else:
        print('  pages fetched       : %d' % meta.get('pages_ok', 0))
    print('  largest page size   : %d' % meta.get('largest_page_size', 0))
    print('  pagination stopped  : %s' % meta.get('stop_reason'))
    if meta.get('recommended_dropped'):
        print('  recommendations dropped: %d' % meta['recommended_dropped'])
    if meta.get('total_number') and meta['total_number'] > len(records):
        print('  NOTE: the server counts %d but only %d were listable — Weibo '
              'hides some accounts from the list%s.'
              % (meta['total_number'], len(records),
                 ' (has_filtered=true)' if meta.get('server_filters_list') else ''))
    print('  new since last run  : %d' % len(added))
    for a in added[:20]:
        print('     + %s (%s)' % (a.get('screen_name') or '?', a.get('uid')))
    if len(added) > 20:
        print('     ... and %d more' % (len(added) - 20))
    print('  gone since last run : %d' % len(removed))
    for r in removed[:20]:
        print('     - %s (%s)' % (r.get('screen_name') or '?', r.get('uid')))
    if len(removed) > 20:
        print('     ... and %d more' % (len(removed) - 20))
    if backup_path:
        print('  previous snapshot backed up to: %s' % backup_path)
    print('  snapshot written to: %s' % json_path)


# ---------------------------------------------------------------------------
# shared run pipeline
# ---------------------------------------------------------------------------

def _sync(auth, kind, fetcher, args):
    auth.load()
    if not auth.ensure_session():
        print('Could not establish a session even after auto-recovery. '
              'If a QR code appeared, scan it, then re-run this command.')
        return 1

    uid = auth.uid or auth.label or 'unknown'
    _ensure_dirs(uid)
    print('[%s-sync] subject uid=%s' % (kind, uid))

    # Raw pages are cached under .cache/relations_sync for --resume support.
    # We deliberately NEVER bulk-delete that cache: the sandbox interposes a
    # confirmation prompt on deletes touching >=50 files and would stall an
    # unattended run. A fresh run re-fetches live (resume=False ignores the
    # cache and overwrites it page by page), so any stale pages are harmless.
    records, meta = fetcher(auth, uid, max_pages=args.max_pages,
                            resume=args.resume, verbose=True)

    web_stop = meta.get('web_stop')
    mobile_stop = meta.get('mobile_stop')
    if 'web_complete' in meta:
        # Hybrid (fans): BOTH web sorts AND the full mobile pass must reach their
        # natural end for the snapshot to be considered complete.
        complete = (meta.get('web_complete')
                    and mobile_stop in ('no_more_pages', 'server_total_reached'))
    elif web_stop is not None:
        complete = (web_stop in ('no_more_pages', 'server_total_reached')
                    and mobile_stop in ('no_more_pages', 'server_total_reached'))
    else:
        complete = meta.get('stop_reason') in ('no_more_pages', 'server_total_reached')
    if meta.get('pages_ok', 0) == 0:
        print('[%s-sync] ABORTED: not a single page could be fetched, so the '
              'existing snapshot was left untouched (no empty result is ever '
              'written over good data).' % kind)
        return 1
    if not records:
        print('[%s-sync] ABORTED: the list came back empty after %d page(s); '
              'refusing to overwrite the existing snapshot.'
              % (kind, meta.get('pages_ok', 0)))
        return 1
    if not complete:
        print('[%s-sync] WARNING: the crawl stopped early (%s) after %d '
              'page(s) / %d accounts. Re-run with --resume to continue from '
              'the cached pages.' % (kind, meta.get('stop_reason'),
                                     meta.get('pages_ok', 0), len(records)))

    latest = _latest_path(uid, kind)
    prev = _load_json(latest, None) if os.path.exists(latest) else None
    prev_records = (prev or {}).get('users') or []

    index = _load_json(_index_path(uid), {}) or {}
    now_iso = _now_iso()
    _stamp_records(records, index, now_iso)
    added, removed = _diff(prev_records, records)

    backup_path = None
    if not args.no_backup:
        backup_path = _backup_previous(uid, kind, prev)

    payload = {
        'kind': kind,
        'subject_uid': str(uid),
        'generated_at': now_iso,
        'count': len(records),
        'complete': complete,
        'source': meta,
        'previous_snapshot_at': (prev or {}).get('generated_at'),
        'backup_path': (os.path.relpath(backup_path, _SRC_DIR)
                        if backup_path else None),
        'changes': {
            'added_count': len(added),
            'removed_count': len(removed),
            'added': added,
            'removed': removed,
        },
        'users': records,
    }
    _save_json(latest, payload)
    _save_json(_index_path(uid), index)

    if args.csv:
        csv_path = os.path.join(_account_dir(uid), '%s.csv' % kind)
        _write_csv(csv_path, records)
        print('CSV written to %s' % csv_path)

    _print_report(kind, records, meta, added, removed, backup_path, latest)
    return 0


# ---------------------------------------------------------------------------
# CLI glue
# ---------------------------------------------------------------------------

def register(subparsers, parents=None):
    parents = parents or []

    p_following = subparsers.add_parser(
        'following-sync', parents=parents,
        help='Snapshot every account you FOLLOW to a local JSON file '
             '(dated backup + added/removed diff on each run).')
    p_following.add_argument('--max-pages', type=int, default=100000,
                             help='Safety valve only; the crawl is unlimited '
                                  'by default (default 100000).')
    p_following.add_argument('--csv', action='store_true',
                             help='Also write a CSV next to the JSON snapshot.')
    p_following.add_argument('--no-backup', action='store_true',
                             help='Overwrite the previous snapshot without '
                                  'backing it up first.')
    p_following.add_argument('--resume', action='store_true',
                             help='Reuse cached raw pages to continue an '
                                  'interrupted crawl instead of restarting.')
    p_following.set_defaults(run=run_following)

    p_fans = subparsers.add_parser(
        'fans-sync', parents=parents,
        help='Snapshot every account FOLLOWING YOU to a local JSON file '
             '(dated backup + added/removed diff on each run).')
    p_fans.add_argument('--max-pages', type=int, default=100000,
                        help='Safety valve only; the crawl is unlimited by '
                             'default (default 100000).')
    p_fans.add_argument('--csv', action='store_true',
                        help='Also write a CSV next to the JSON snapshot.')
    p_fans.add_argument('--no-backup', action='store_true',
                        help='Overwrite the previous snapshot without '
                             'backing it up first.')
    p_fans.add_argument('--resume', action='store_true',
                        help='Reuse cached raw pages to continue an '
                             'interrupted crawl instead of restarting.')
    p_fans.set_defaults(run=run_fans)


def run_following(args, auth):
    return _sync(auth, 'following', fetch_following, args)


def run_fans(args, auth):
    return _sync(auth, 'fans', fetch_fans, args)
