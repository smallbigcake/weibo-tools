"""Friends-of-friends ("关注的关注") pool: ONE crawl implementation, ONE cache.

Weibo exposes no 2nd-degree endpoint, so the pool is synthesised by crawling the
full follow list of every one of the OWNER's friends and unioning the results.
Both `:mod:`weibo_tool.commands.profile_visit`` (which materialises the union as
a relation snapshot) and `:mod:`weibo_tool.commands.stranger_visit`` (which
samples strangers from it) need exactly the same thing, so the crawl, the
per-friend cache and the candidate-record shape live here once.

Cache layout
------------
    src/.cache/fof/<owner_uid>/<friend_uid>.json

`refresh=True` (--refresh-fof / --refresh-cache) re-crawls a friend even when a
cached list exists. A friend whose crawl never yielded a single usable page is
NOT cached: a cached empty list would permanently hide that friend from the pool.

Migration
---------
Older releases cached the same crawl under
`.cache/profile_visit/<uid>/fof/` and `.cache/stranger_visit/<uid>/fof/`.
Those directories are still READ (in that order) so an existing, expensive
crawl is not thrown away; new writes always go to the unified directory above.
"""
import json
import os
import sys

# This module lives in src/weibo_tool/; resolve up to the project's src/
# directory so the cache dir is stable regardless of the current directory.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging  # noqa: E402
_setup_logging()

from weibo_tool.http_engine import _request_json, _sleep  # noqa: E402

CACHE_ROOT = os.path.join(_SRC_DIR, '.cache', 'fof')

# Legacy per-command cache directories, kept READ-ONLY for migration (see above).
LEGACY_ROOTS = (
    os.path.join(_SRC_DIR, '.cache', 'stranger_visit'),
    os.path.join(_SRC_DIR, '.cache', 'profile_visit'),
)

FOF_FOLLOW_API = 'https://weibo.com/ajax/friendships/friends?uid=%s&page=%d&count=50'

# Pagination. Weibo only ever exposes a bounded slice of SOMEONE ELSE's follow
# list (~10 pages / ~200 followings in practice), so these are ceilings, not
# expected values: the crawl stops on the first short/empty page. The size and
# the page cap are the LARGEST values any caller used, so unifying here can only
# widen coverage, never shrink it.
FOF_PAGE_SIZE = 50        # what FOF_FOLLOW_API returns per page (count=50)
FOF_SAFETY_PAGES = 50     # hard stop per friend (~2500 follows)


def cache_dir(owner_uid):
    """Directory holding the per-friend caches for `owner_uid`."""
    return os.path.join(CACHE_ROOT, str(owner_uid))


def _cache_path(owner_uid, fuid):
    return os.path.join(cache_dir(owner_uid), '%s.json' % fuid)


def _legacy_paths(owner_uid, fuid):
    return [os.path.join(root, str(owner_uid), 'fof', '%s.json' % fuid)
            for root in LEGACY_ROOTS]


def load_fof_cache(owner_uid, fuid):
    """Cached follow list for one friend, or None when there is no cache yet.

    Reads the unified directory first, then the legacy per-command directories.
    """
    for path in [_cache_path(owner_uid, fuid)] + _legacy_paths(owner_uid, fuid):
        if not os.path.exists(path):
            continue
        try:
            with open(path, 'r', encoding='utf-8') as f:
                recs = json.load(f)
        except (OSError, ValueError):
            continue
        return recs if isinstance(recs, list) else None
    return None


def save_fof_cache(owner_uid, fuid, recs):
    """Persist one friend's follow list in the unified cache directory."""
    path = _cache_path(owner_uid, fuid)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(recs, f, ensure_ascii=False)


def user_rec(u):
    """Normalise a raw Weibo user dict into the fields we keep + filter on.

    Shared by every candidate source (friends-of-friends, friend-comments) so a
    record has the same shape no matter where it came from.
    """
    return {
        'uid': str(u.get('id') or u.get('idstr') or ''),
        'screen_name': u.get('screen_name') or u.get('name') or '',
        'mbtype': u.get('mbtype') or 0,
        'mbrank': u.get('mbrank') or 0,
        'svip': bool(u.get('svip')),
        'vvip': bool(u.get('vvip')),
        'verified': bool(u.get('verified')),
        'verified_type': u.get('verified_type'),
    }


def crawl_friend_following(auth, fuid, max_pages=FOF_SAFETY_PAGES):
    """Page one friend's follow list until the server stops yielding users.

    Returns (records, pages_ok), where `pages_ok` counts responses the server
    actually answered with `ok:1`. `pages_ok == 0` means the crawl never got a
    usable response (blocked / transient) and the caller must NOT cache it — a
    cached empty list would permanently hide that friend from the pool. A friend
    who genuinely follows nobody still answers `ok:1`, so they are cached once
    and never re-crawled.
    """
    out, pages_ok = {}, 0
    for page in range(1, max_pages + 1):
        obj = _request_json(auth, FOF_FOLLOW_API % (fuid, page))
        _sleep()
        if obj is None or obj.get('ok') != 1:
            break
        pages_ok += 1
        users = obj.get('users') or []
        for u in users:
            rec = user_rec(u)
            if rec['uid']:
                out[rec['uid']] = rec
        if len(users) < FOF_PAGE_SIZE:
            break  # short/empty page == last page the server will give
    return list(out.values()), pages_ok


def collect_fof(auth, friends, owner_uid, exclude=None, refresh=False,
                verbose=True, label='fof'):
    """Union the follow lists of every uid in `friends` into {uid: rec}.

    `friends` is decided by the caller (all of them unless it capped the list)
    and is walked in the given order, so an interrupted run resumes where it
    stopped instead of re-crawling a different subset.

    `exclude` (a set of uids, typically the owner's own following + fans) is
    dropped so the pool is genuinely new exposure.

    Returns the pooled {uid: rec}; the per-friend caches are written as we go.
    """
    exclude = exclude or set()
    out = {}
    crawled = cached_hits = failed = 0
    total = len(friends)
    for i, fuid in enumerate(friends, 1):
        recs = None if refresh else load_fof_cache(owner_uid, fuid)
        if recs is None:
            recs, pages_ok = crawl_friend_following(auth, fuid)
            if pages_ok == 0:
                failed += 1
                if verbose:
                    print('  [%s] friend %s: crawl failed, not cached' % (label, fuid))
                continue
            save_fof_cache(owner_uid, fuid, recs)
            crawled += 1
        else:
            cached_hits += 1
        for rec in recs:
            uid = rec.get('uid')
            if uid and uid not in exclude:
                out[uid] = rec
        if verbose and (i % 25 == 0 or i == total):
            print('  %s: %d/%d friends (crawled %d, cached %d, failed %d) -> %d uids'
                  % (label, i, total, crawled, cached_hits, failed, len(out)))
    return out
