"""`top-followed` subcommand: rank the most-followed accounts within the
blacklist audience (the people the blacklisted users follow).

This is a pure cache-analysis command: it reads the follow-list caches produced
by `blacklist-deep --with-follows` (one JSON per blacklisted user, each holding
the full `uids` list they follow) and counts, for every target UID, how many
blacklisted users follow it. The result is "which other Weibo accounts are most
commonly followed across the entire blacklist".

Names are resolved from the per-UID profile cache (`.cache/blacklist_deep/
profiles/`). Targets that are themselves on the blacklist already have a cached
profile; the rest are fetched on demand via the viewer account (cached +
resumable, same safety-net as blacklist-deep) when `--enrich` is given.

Usage:
    python weibo-tool.py top-followed --top 500
    python weibo-tool.py top-followed --top 100 --enrich
"""
import argparse
import csv
import json
import logging
import os
import sys
from collections import Counter

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so sibling imports and the cache/data dirs are stable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
_setup_logging()

from auth import Auth
from weibo_tool.commands.blacklist_deep import (
    fetch_profile, _profile_cache_path, _ensure_dirs,
)

CACHE_DIR = os.path.join(_SRC_DIR, '.cache', 'blacklist_deep')
FOLLOW_DIR = os.path.join(CACHE_DIR, 'follows')
PROFILE_DIR = os.path.join(CACHE_DIR, 'profiles')
DATA_DIR = os.path.join(_SRC_DIR, 'data', 'blacklist_deep')

# Alternate source: the subject's OWN following list (control/baseline), using
# the same engine as the blacklist audience. The cache layout mirrors
# blacklist_deep but lives under .cache/following_deep and data/following_deep.
FOLLOWING_CACHE_DIR = os.path.join(_SRC_DIR, '.cache', 'following_deep')
FOLLOWING_FOLLOW_DIR = os.path.join(FOLLOWING_CACHE_DIR, 'follows')
FOLLOWING_PROFILE_DIR = os.path.join(FOLLOWING_CACHE_DIR, 'profiles')
FOLLOWING_DATA_DIR = os.path.join(_SRC_DIR, 'data', 'following_deep')

# ---------------------------------------------------------------------------
# Account-category classification (for optional exclusion).
#
# Two categories the user wants to strip out of the "most followed" ranking:
#   1. Weibo platform official operation accounts (微博官方运营号).
#   2. Party-media / government / news accounts (党媒/政务/新闻).
#
# These are identified by screen_name heuristics. The lists are maintained in a
# standalone JSON data file (config/account_categories.json) so they can be
# edited without touching code; this module loads that file at runtime and
# falls back to the built-in DEFAULT_* below if the file is missing.
# ---------------------------------------------------------------------------

# Built-in fallback (kept in sync with config/account_categories.json).
_DEFAULT_WEIBO_OFFICIAL_PREFIX = ['微博']
_DEFAULT_WEIBO_OFFICIAL_EXACT = {
    '粉丝红包', '超话社区', 'SVIP内容精选', '微博小秘书', '微博公开度',
    '微博创作者广告共享计划', '微博抽奖平台',
}
_DEFAULT_STATE_MEDIA_KEYWORDS = (
    '央视', '新华', '人民', '澎湃', '环球', '共青团', '政府', '军号', '战区',
    '新闻', '日报', '时报', '晚报', '早报', '封面', '新黄河', '半月谈', '广电',
    '电视台', '融媒', '军网', '解放军', '国防部', '时政', '新闻网', '党媒',
    '宣传部', '网信', '观察者网',  # 观察者网 is a known 时政 outlet
    '报',  # bare "报" catches remaining newspaper names (e.g. 大河报, 华商报)
)
_DEFAULT_STATE_MEDIA_EXACT = {
    '玉渊谭天', '新浪热点', '新浪财经', '新浪新闻', '央视网', '人民网',
    '中国新闻网', '新华网', '凤凰网', '凤凰周刊', '凤凰网国际', '北京青年报',
    '北京日报', '中国军号', '中国火箭军', '东部战区', '联合国', '中国政府网',
    '北京时间', '天涯历知幸',
    '新京报', '新京报我们视频', '大河报', '南方周末', '南方都市报', '潇湘晨报',
    '都市快报', '华商报', '中国青年报', '财新网', 'Vista看天下',
    '中国历史研究院', '中国警方在线', '中国气象爱好者', '中国地震台网速报',
    '中国军工', '中国反邪教', '中国国家地理', '中国航空工业集团',
    '央广网', '凤凰网财经', '凤凰网科技', '财经网', '日经中文网',
    '央广军事', '贝壳财经',
    '新浪军事', '新浪证券', '新浪科技', '新浪娱乐', '新浪仓石基金',
}

_CATEGORY_FILE = os.path.join(
    os.path.dirname(_SRC_DIR), 'config', 'account_categories.json')


def _load_categories():
    """Load category lists from the JSON data file, falling back to defaults.

    Returns (weibo_official_prefix, weibo_official_exact, state_media_keywords,
    state_media_exact) as Python sets/lists.
    """
    prefix = list(_DEFAULT_WEIBO_OFFICIAL_PREFIX)
    exact_official = set(_DEFAULT_WEIBO_OFFICIAL_EXACT)
    keywords = list(_DEFAULT_STATE_MEDIA_KEYWORDS)
    exact_media = set(_DEFAULT_STATE_MEDIA_EXACT)
    if os.path.exists(_CATEGORY_FILE):
        try:
            with open(_CATEGORY_FILE, 'r', encoding='utf-8-sig') as fh:
                data = json.load(fh)
            wo = data.get('weibo_official', {})
            prefix = list(wo.get('prefix', prefix))
            exact_official = set(wo.get('exact', exact_official))
            sm = data.get('state_media', {})
            keywords = list(sm.get('keywords', keywords))
            exact_media = set(sm.get('exact', exact_media))
            logging.info('[top-followed] loaded account categories from %s '
                         '(%d official-exact, %d media-exact, %d media-keywords)'
                         % (_CATEGORY_FILE, len(exact_official),
                            len(exact_media), len(keywords)))
        except Exception as e:
            logging.warning('[top-followed] failed to load %s (%s); using '
                            'built-in defaults.' % (_CATEGORY_FILE, e))
    return prefix, exact_official, keywords, exact_media


(_WEIBO_OFFICIAL_PREFIX, _WEIBO_OFFICIAL_EXACT,
 _STATE_MEDIA_KEYWORDS, _STATE_MEDIA_EXACT) = _load_categories()


def _is_weibo_official(name):
    if not name:
        return False
    if name in _WEIBO_OFFICIAL_EXACT:
        return True
    return any(name.startswith(p) for p in _WEIBO_OFFICIAL_PREFIX)


def _is_state_media(name):
    if not name:
        return False
    if name in _STATE_MEDIA_EXACT:
        return True
    return any(k in name for k in _STATE_MEDIA_KEYWORDS)


def _category_of(name):
    """Return a set of category tags for `name` (may be empty)."""
    tags = set()
    if _is_weibo_official(name):
        tags.add('weibo_official')
    if _is_state_media(name):
        tags.add('state_media')
    return tags


def _follow_uids_of(d):
    """Extract the followed-uid list from a per-user follow cache.

    The list may be stored under any of the historically-used keys
    (`uids` / `followers` / `fans`); accept whichever is present so a key-name
    drift in the upstream cache writer cannot silently zero out the count.
    """
    for key in ('uids', 'followers', 'fans'):
        v = d.get(key)
        if isinstance(v, list):
            return v
    return []


def _aggregate(follow_dir=FOLLOW_DIR):
    """Return ALL (uid, times_followed) pairs across all follow caches, ranked.

    Returns the full Counter.most_common() (no truncation) so callers can apply
    exclusions on a larger pool and still report a true top-N afterwards.

    Only genuine per-user follow caches are counted. `fetch_follows` always
    writes a `sample` key (possibly empty); a file without one is a subject
    roster (an account's own following list), which is NOT one person's follow
    list — counting it would silently hand a phantom +1 to every uid in it.
    This filter also repairs caches written before the roster was moved out of
    the per-user follow directory.
    """
    followed_by = Counter()
    if not os.path.isdir(follow_dir):
        print('[top-followed] no follows cache at %s — run the deep crawl with '
              '--with-follows first.' % follow_dir)
        return followed_by
    skipped = 0
    for fn in os.listdir(follow_dir):
        if not fn.endswith('.json'):
            continue
        try:
            d = json.load(open(os.path.join(follow_dir, fn), 'r', encoding='utf-8-sig'))
        except Exception:
            continue
        if not isinstance(d, dict) or 'sample' not in d:
            skipped += 1
            continue
        for u in _follow_uids_of(d):
            followed_by[u] += 1
    if skipped:
        print('[top-followed] skipped %d non-follow-list file(s) in %s '
              '(subject rosters are not a follow audience).'
              % (skipped, follow_dir))
    return followed_by.most_common()


def _resolve_names(uids, enrich, viewer, profile_dir=None):
    """Map uid -> screen_name. Use cached profiles; optionally fetch the rest."""
    uid_name = {}
    to_fetch = []
    for uid in uids:
        p = _profile_cache_path(uid) if profile_dir is None \
            else os.path.join(profile_dir, '%s.json' % uid)
        if os.path.exists(p):
            try:
                with open(p, 'r', encoding='utf-8-sig') as fh:
                    pd = json.load(fh)
                nm = pd.get('screen_name') or pd.get('name')
                if nm:
                    uid_name[uid] = nm
                    continue
            except Exception:
                pass
        if enrich:
            to_fetch.append(uid)
        else:
            uid_name[uid] = ''

    if to_fetch and viewer is not None:
        total = len(to_fetch)
        for i, uid in enumerate(to_fetch, 1):
            try:
                rec = fetch_profile(viewer, uid)
                if rec and rec.get('screen_name'):
                    uid_name[uid] = rec['screen_name']
            except Exception as e:
                print('  [warn] uid %s: %s' % (uid, e))
            if i % 50 == 0:
                print('  enriched %d/%d' % (i, total))
    return uid_name


def register(subparsers, parents=None):
    p = subparsers.add_parser(
        'top-followed', parents=parents or [],
        help='Rank the most-followed accounts within a follow-list audience '
             '(blacklist audience by default, or the subject\'s own following '
             'list with --source following).')
    p.add_argument('--top', type=int, default=100,
                   help='How many top accounts to report (default 100).')
    p.add_argument('--source', choices=['blacklist', 'following'], default='blacklist',
                   help='Which audience to rank: "blacklist" = the blacklist '
                        'audience (default), "following" = the subject\'s own '
                        'following list (control/baseline).')
    p.add_argument('--enrich', action='store_true',
                   help='Fetch names for targets not already in the profile '
                        'cache (via the viewer account; cached + resumable).')
    p.add_argument('--json', default=None,
                   help='Path for the JSON output. Defaults to '
                        'data/blacklist_deep/top_followed.json.')
    p.add_argument('--csv', default=None,
                   help='Path for the CSV output. Defaults to '
                        'data/blacklist_deep/top_followed.csv.')
    # Viewer identity for name enrichment (--no-prompt is supplied globally by
    # the shared identity parent parser; only these two are local to avoid a
    # conflict with the global flag).
    p.add_argument('--viewer-uid', default=None,
                   help='Account used to fetch missing profile names '
                        '(defaults to the subject account).')
    p.add_argument('--viewer-user', default=None,
                   help='Human-friendly label for the viewer account.')
    # Exclusion filters (the user wants the "most followed" ranking cleaned of
    # platform-official and state-media accounts to surface real individual/V
    # accounts).
    p.add_argument('--exclude-weibo-official', action='store_true',
                   help='Exclude Weibo platform official operation accounts.')
    p.add_argument('--exclude-state-media', action='store_true',
                   help='Exclude Party-media / government / news accounts.')
    p.add_argument('--exclude-official-media', action='store_true',
                   help='Convenience flag = both of the above.')
    p.set_defaults(run=run)


def run(args, auth):
    _ensure_dirs()
    # Pick the audience source's cache/data dirs.
    if args.source == 'following':
        follow_dir = FOLLOWING_FOLLOW_DIR
        profile_dir = FOLLOWING_PROFILE_DIR
        data_dir = FOLLOWING_DATA_DIR
        label = 'following'
    else:
        follow_dir = FOLLOW_DIR
        profile_dir = PROFILE_DIR
        data_dir = DATA_DIR
        label = 'blacklist'
    print('[top-followed] source = %s (follow cache: %s)' % (label, follow_dir))

    full = _aggregate(follow_dir=follow_dir)
    if not full:
        return

    exclude_weibo = args.exclude_weibo_official or args.exclude_official_media
    exclude_media = args.exclude_state_media or args.exclude_official_media

    # Resolve names on a window larger than --top so that, after excluding
    # matches, we still have a true top-N. 4x headroom is plenty for the
    # expected exclusion rate. If the window is exhausted we simply report what
    # we have.
    window = max(args.top * 4, 500)
    pool = full[:window]
    uids = [uid for uid, _ in pool]

    viewer = None
    if args.enrich:
        viewer = Auth()
        if not viewer.resolve_uid(args.viewer_uid, args_user=args.viewer_user,
                                  prompt=not args.no_prompt):
            print('[top-followed] viewer not resolved; skipping name enrichment.')
            viewer = None
        else:
            viewer.load()
            if not viewer.test_login():
                print('[top-followed] viewer not logged in; skipping enrichment.')
                viewer = None
    uid_name = _resolve_names(uids, args.enrich, viewer, profile_dir=profile_dir)

    # Apply exclusions (need the resolved name to classify).
    excluded = []
    ranked = []
    for uid, cnt in full:  # iterate the FULL ranking in order
        name = uid_name.get(uid, '')
        tags = _category_of(name)
        if exclude_weibo and 'weibo_official' in tags:
            excluded.append((uid, cnt, name, 'weibo_official'))
            continue
        if exclude_media and 'state_media' in tags:
            excluded.append((uid, cnt, name, 'state_media'))
            continue
        ranked.append((uid, cnt))
        if len(ranked) >= args.top:
            break

    # The share denominator is the WHOLE follow-edge universe (`full`), not the
    # post-exclusion `ranked` list — otherwise excluding official/media accounts
    # would shrink the base and inflate every remaining share.
    total_edges = sum(c for _, c in full)
    ex_by_cat = {}
    for _, _, _, cat in excluded:
        ex_by_cat[cat] = ex_by_cat.get(cat, 0) + 1
    print('[top-followed] reporting top %d (of %d ranked). Excluded: %s'
          % (len(ranked), len(full), ex_by_cat or 'none'))
    print('\nrank | times_followed | share% | uid | name')
    for i, (uid, cnt) in enumerate(ranked, 1):
        share = (100.0 * cnt / total_edges) if total_edges else 0.0
        print('%4d | %5d | %6.2f | %s | %s'
              % (i, cnt, share, uid, uid_name.get(uid, '') or '?'))

    json_path = args.json or os.path.join(data_dir, 'top_followed.json')
    csv_path = args.csv or os.path.join(data_dir, 'top_followed.csv')
    for p in (json_path, csv_path):
        d = os.path.dirname(os.path.abspath(p))
        os.makedirs(d, exist_ok=True)

    payload = {
        'top_n': args.top,
        'excluded': ex_by_cat,
        'distinct_followed': len(full),
        'total_follow_edges': total_edges,
        'accounts': [
            {'rank': i, 'uid': uid, 'times_followed': cnt,
             'share': round(100.0 * cnt / total_edges, 3) if total_edges else 0.0,
             'name': uid_name.get(uid, '') or None}
            for i, (uid, cnt) in enumerate(ranked, 1)
        ],
    }
    with open(json_path, 'w', encoding='utf-8') as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=2)
    with open(csv_path, 'w', encoding='utf-8', newline='') as fh:
        w = csv.writer(fh)
        w.writerow(['rank', 'times_followed', 'uid', 'name'])
        for i, (uid, cnt) in enumerate(ranked, 1):
            w.writerow([i, cnt, uid, uid_name.get(uid, '') or ''])
    print('\nJSON written to %s' % json_path)
    print('CSV written to %s' % csv_path)
