"""`blacklist-deep` subcommand: deep profile + follow-audience analysis.

Crawls every user on the active account's blacklist and (optionally) each of
their follow lists, then aggregates rich demographic / behavioral features:

  Phase 1 (always): per blacklisted user
    - profile/info  -> gender, region, verified type, followers/friends/
      statuses counts, mbtype, description, user_ability, etc.
  Phase 2 (--with-follows): per blacklisted user's follow list (paginated,
    full traversal) -> follow-audience profiling (the people THEY follow).

Outputs:
  - a human-readable report to stdout,
  - a JSON dump (--json out.json) with the aggregated summary + per-user
    profiles (follow lists are cached separately, see below).

Resilience:
  - Every fetched profile / follow page is cached under
    `src/.cache/blacklist_deep/` so an interrupted run resumes instead of
    restarting. Re-run the same command to continue.
  - Requests are rate-limited (random sleep) and back off exponentially on
    403 / network errors to avoid tripping Weibo's anti-crawl.
"""
import argparse
import json
import logging
import os
import re
import sys
import time
from collections import Counter, defaultdict

# This module lives in src/weibo_tool/commands/; resolve up to the project's
# src/ directory so the cache and sibling imports are stable regardless of CWD.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

# Shared logging convention (config/logging.ini); idempotent.
from logutil import setup as _setup_logging
_setup_logging()

# Config-driven interpretation of Weibo's verified* fields (single source of truth).
from weibo_tool.verified_config import verified_type_label

CACHE_DIR = os.path.join(_SRC_DIR, '.cache', 'blacklist_deep')
PROFILE_DIR = os.path.join(CACHE_DIR, 'profiles')
FOLLOW_DIR = os.path.join(CACHE_DIR, 'follows')
POST_DIR = os.path.join(CACHE_DIR, 'posts')

# Analysis artifacts (final, human-facing) live under data/ (not the resumable
# .cache/). Each run drops a per-subject JSON (full per-user detail) + a
# summary markdown there.
DATA_DIR = os.path.join(_SRC_DIR, 'data', 'blacklist_deep')

PROFILE_API = 'https://weibo.com/ajax/profile/info?uid=%s'
FOLLOW_API = 'https://weibo.com/ajax/friendships/friends?uid=%s&page=%d&count=50'


def _ensure_dirs():
    for d in (CACHE_DIR, PROFILE_DIR, FOLLOW_DIR, POST_DIR, DATA_DIR):
        os.makedirs(d, exist_ok=True)


def _profile_cache_path(uid):
    _ensure_dirs()
    return os.path.join(PROFILE_DIR, '%s.json' % uid)


def _follow_cache_path(uid):
    _ensure_dirs()
    return os.path.join(FOLLOW_DIR, '%s.json' % uid)


def _load_json(path, default=None):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _save_json(path, obj):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


# The resilient request engine (backoff, soft-rate-limit handling, ban/account
# detection, automatic session recovery) now lives in `weibo_tool.http_engine`
# so every subcommand shares one implementation. We import it here and re-export
# the names so existing callers (`from commands.blacklist_deep import
# _request_json`, etc.) keep working unchanged.
from weibo_tool.http_engine import (
    _request_json, _sleep, _is_ban_response, _is_account_issue,
    _try_recover_session,
)


def _norm_gender(g):
    if g == 'f':
        return 'female'
    if g == 'm':
        return 'male'
    return 'unknown'


def _norm_region(loc):
    """Keep only the province-level part (first token) for clean grouping."""
    if not loc:
        return 'unknown'
    return loc.strip().split()[0] or 'unknown'


def _verified_label(verified, vtype, vreason=None):
    # Delegates to the config-driven mapping in weibo_tool.verified_config so the
    # verified_type -> label rules live in config/verified_categories.json.
    return verified_type_label(verified, vtype)


# ---------------------------------------------------------------------------
# Phase 1: profiles
# ---------------------------------------------------------------------------

def fetch_profile(vauth, uid, force=False, cache_path=None):
    """Fetch the profile of `uid` using the VIEWER session `vauth`.

    `vauth` must be an account that is NOT the one who blocked `uid`, or the
    request returns empty/blocked. The caller separates the subject (whose
    blacklist we analyze) from the viewer (who can actually see the profiles).

    Resume behavior: a previously cached profile is reused UNLESS it is a
    `unreachable` / `fetch_failed` marker — those are neutral, retryable
    outcomes (reason undetermined; not attributed to rate-limiting without
    evidence), so an interrupted run converges to full coverage on re-run.
    Permanent outcomes (`banned`, `account_issue`, or a successful profile) are
    reused as-is.

    `cache_path` lets callers (e.g. the following-deep control group) redirect
    the cache to a separate directory; it defaults to this module's
    blacklist_deep profile cache so behavior is unchanged for blacklist-deep.
    """
    cache = cache_path or _profile_cache_path(uid)
    if not force and os.path.exists(cache):
        cached = _load_json(cache, {})
        # `unreachable`/`fetch_failed` are neutral, retryable markers (reason
        # undetermined) — re-attempt on re-run. Permanent outcomes (`banned`,
        # `account_issue`, or a successful profile) are reused as-is.
        if cached.get('error') not in ('unreachable', 'fetch_failed'):
            return cached
        # neutral failure -> fall through and retry below.
    obj = _request_json(vauth, PROFILE_API % uid)
    _sleep()
    if obj is None:
        # No data obtained this attempt, reason undetermined (do NOT attribute to
        # rate-limiting without evidence). Mark neutral + retryable; the retry
        # loop in run() will re-attempt until it either succeeds or converges.
        rec = {'uid': uid, 'error': 'unreachable'}
        _save_json(cache, rec)
        return rec
    # Permanent ban / deleted account: ok:0 + error_type:'link'. Classify the
    # reason from the decoded `msg` and store it so aggregation can report the
    # breakdown of why these blacklisted accounts were taken down.
    ban = _is_ban_response(obj)
    if ban is not None:
        rec = {'uid': uid, 'error': 'banned', 'ban_reason': ban,
               'ban_url': obj.get('url')}
        _save_json(cache, rec)
        return rec
    # Frozen / risk-controlled account: HTTP 400 + {"ok":0,"message":"..."}.
    # Identify it by Weibo's own `message` wording, stored verbatim.
    issue = _is_account_issue(obj)
    if issue is not None:
        rec = {'uid': uid, 'error': 'account_issue', 'ban_reason': issue}
        _save_json(cache, rec)
        return rec
    u = obj.get('data', {}).get('user', {})
    rec = {
        'uid': uid,
        'screen_name': u.get('screen_name'),
        'gender': _norm_gender(u.get('gender')),
        'region': _norm_region(u.get('location')),
        'location_raw': u.get('location'),
        'verified': bool(u.get('verified')),
        'verified_type': u.get('verified_type'),
        'verified_label': _verified_label(u.get('verified'), u.get('verified_type'),
                                          u.get('verified_reason')),
        'verified_reason': u.get('verified_reason'),
        'followers_count': u.get('followers_count') or 0,
        'friends_count': u.get('friends_count') or 0,
        'statuses_count': u.get('statuses_count') or 0,
        'mbtype': u.get('mbtype'),
        'user_ability': u.get('user_ability'),
        'special_follow': u.get('special_follow'),
        'description': u.get('description'),
        'interests': [],  # filled later from real posts via --with-posts
    }
    _save_json(cache, rec)
    return rec


# ---------------------------------------------------------------------------
# Phase 2: follow lists (full pagination)
# ---------------------------------------------------------------------------

def fetch_follows(vauth, uid, force=False, cache_path=None):
    """Traverse the full follow list for `uid`; cache the aggregated result.

    Returns a dict with `uids` (list of followed uid), `count`, and a
    `sample` of the first up-to-200 followed-user profiles (compact) so we can
    profile the *audience* they follow without storing millions of records.

    `cache_path` redirects the cache (see fetch_profile for rationale).
    """
    cache = cache_path or _follow_cache_path(uid)
    if not force and os.path.exists(cache):
        return _load_json(cache, {})
    uids = []
    page = 1
    total_seen = 0
    sample = []
    first_obj = None
    while True:
        obj = _request_json(vauth, FOLLOW_API % (uid, page))
        _sleep()
        if obj is None:
            break
        if first_obj is None:
            first_obj = obj
        users = obj.get('users') or []
        if not users:
            break
        for fu in users:
            fu_uid = str(fu.get('id') or fu.get('idstr') or '')
            if not fu_uid:
                continue
            uids.append(fu_uid)
            total_seen += 1
            if len(sample) < 200:
                sample.append({
                    'uid': fu_uid,
                    'gender': _norm_gender(fu.get('gender')),
                    'region': _norm_region(fu.get('location') or fu.get('province')),
                    'verified_label': _verified_label(fu.get('verified'),
                                                      fu.get('verified_type'), None),
                    'followers_count': fu.get('followers_count') or 0,
                    'friends_count': fu.get('friends_count') or 0,
                    'is_punish': fu.get('is_punish'),
                    'credit_score': fu.get('credit_score'),
                })
        next_cursor = obj.get('next_cursor', 0)
        total = obj.get('total_number')
        if total and total_seen >= total:
            break
        if not next_cursor:
            break
        page += 1
        if page > 200:  # hard safety cap (~10k follows)
            break
    # Guard against poisoning the cache with a "successful empty" result when the
    # very first request failed (session expiry / rate-limit). A genuine zero-
    # follow account still has a valid first response (total_number == 0), so we
    # only bail out when we never got any usable response at all.
    if total_seen == 0 and first_obj is None:
        logging.warning('fetch_follows(%s): first request failed; NOT caching an '
                        'empty result so it can be retried.' % uid)
        return {'uid': uid, 'count': 0, 'uids': [], 'sample': [],
                'error': 'fetch_failed'}
    rec = {'uid': uid, 'count': len(uids), 'uids': uids, 'sample': sample}
    _save_json(cache, rec)
    return rec


# ---------------------------------------------------------------------------
# Phase 3: posts (for REAL interest/topic extraction from weibo text)
# ---------------------------------------------------------------------------

POST_API = 'https://weibo.com/ajax/statuses/mymblog?uid=%s&page=%d&feature=0'


def _decode_entities(s):
    """Decode HTML entities (&amp; &lt; &gt; &quot; &#39; &#...; and named ones)."""
    import html
    try:
        return html.unescape(s)
    except Exception:
        return s


# Weibo UI chrome that appears inside post text but is NOT a topic of interest
# (action buttons / attachment labels rendered as text). Stripping these keeps
# the keyword signal clean; real interests come from #topics# and @mentions.
_UI_CHROME = {
    '展开', '回复', '转发', '转发微博', '微博视频', '博视频', '查看图片', '分享图片',
    '网页链接', '视频', '图片', '全文', '收起', '赞', '评论', '收藏', '送我的',
    '我收到了', '集齐', '微博开新', '超话', '分享', '关注', '取消关注', '举报',
    '分组', '设置', '更多', '加载中', '点击', '查看', '原图', '动图', '长图',
    'live', 'LIVE', 'Live', 'gif', 'GIF', 'qr', 'QR',
}


def _extract_interests_from_posts(texts, top=12):
    """Extract interest signals from actual weibo post texts (NOT the bio).

    We count frequent meaningful CJK/ASCII tokens and also surface the most
    common hashtags (#话题#) and @mentions, which are far stronger interest
    signals than a self-written description.
    """
    from collections import Counter as _C
    tokens = _C()
    topics = _C()
    mentions = _C()
    stop = {'的', '了', '是', '我', '你', '他', '她', '们', '在', '和', '也', '都',
            '就', '不', '人', '一', '有', '这', '那', '个', '上', '下', '来', '去',
            '说', '要', '会', '把', '被', '让', '给', '与', '及', '等', '啊', '吧',
            '吗', '呢', '哦', '嗯', '哈', '啦', '自己', '什么', '怎么', '这个',
            '那个', '可以', '已经', '因为', '所以', '但是', '如果', '我们', '他们',
            '你们', '一个', '没有', '不是', '就是', '还是', '这么', '那么', '真的',
            '觉得', '知道', '现在', '今天', '昨天', '明天', '一直', '还是', '开始',
            '进行', '通过', '对于', '以及', '并且', '然后', '非常', '比较', '一些'}
    for t in texts:
        if not t:
            continue
        t = _decode_entities(t)
        for m in re.findall(r'#([^#]+)#', t):
            topics[m.strip()] += 1
        for m in re.findall(r'@([A-Za-z0-9_\u4e00-\u9fff]+)', t):
            mentions[m] += 1
        segs = re.findall(r'[\u4e00-\u9fff]{2,4}|[A-Za-z]{2,}', t)
        for s in segs:
            if s in stop or len(s) < 2:
                continue
            # Drop tokens that contain a UI-chrome word (n-gram may split it,
            # e.g. "的微博视" from "微博视频"), or are pure ASCII chrome.
            if any(c in s for c in _UI_CHROME):
                continue
            tokens[s] += 1
    return {
        'keywords': [w for w, _ in tokens.most_common(top)],
        'topics': [('#%s' % w) for w, _ in topics.most_common(15)],
        'mentions': [('@%s' % w) for w, _ in mentions.most_common(15)],
    }


def fetch_posts(vauth, uid, force=False, pages=3, cache_path=None):
    """Fetch recent weibo posts for `uid` (up to `pages` pages) and cache.

    Returns a dict with `count`, `texts` (post bodies), and `interests`
    (keywords/topics/mentions extracted from the text). Used for interest
    profiling from REAL content rather than the bio.

    `cache_path` redirects the cache (see fetch_profile for rationale).
    """
    cache = cache_path or os.path.join(POST_DIR, '%s.json' % uid)
    if not force and os.path.exists(cache):
        return _load_json(cache, {})
    texts = []
    page = 1
    while page <= pages:
        obj = _request_json(vauth, POST_API % (uid, page))
        _sleep()
        if obj is None:
            break
        cards = obj.get('data', {}).get('list', [])
        if not cards:
            break
        for c in cards:
            txt = c.get('text') or ''
            # strip HTML tags, then decode entities (&gt; &quot; &#...; etc.) —
            # otherwise tokens like "gt"/"quot" leak into interest extraction.
            txt = re.sub(r'<[^>]+>', ' ', txt)
            txt = _decode_entities(txt)
            if txt.strip():
                texts.append(txt.strip())
        if len(cards) < 10:
            break
        page += 1
    rec = {'uid': uid, 'count': len(texts), 'texts': texts,
           'interests': _extract_interests_from_posts(texts)}
    _save_json(cache, rec)
    return rec


# ---------------------------------------------------------------------------
# Aggregation
# ---------------------------------------------------------------------------

def aggregate(records):
    n = len(records)
    gender = Counter()
    region = Counter()
    verified = Counter()
    banned = Counter()  # crude ban/mute signals from special_follow flag
    banned_reasons = Counter()  # decoded ban/deletion reason text
    n_banned = 0
    n_unreachable = 0
    n_account_issue = 0
    n_fetch_failed = 0
    followers_buckets = Counter()
    friends_buckets = Counter()
    statuses_buckets = Counter()
    interests = Counter()
    interest_topics = Counter()
    interest_mentions = Counter()
    n_with_follows = 0
    follow_total = 0
    follow_audience_gender = Counter()
    follow_audience_region = Counter()
    follow_audience_verified = Counter()
    follow_audience_punished = 0
    follow_audience_lowcredit = 0
    follow_audience_sampled = 0

    def bucket(count, edges):
        for e in edges:
            if count <= e:
                return '%d-' % e if e < edges[-1] else '%d+' % edges[-1]
        return '%d+' % edges[-1]

    f_edges = [50, 200, 500, 1000, 5000, 10000, 50000, 100000]
    s_edges = [10, 100, 500, 1000, 5000, 20000, 100000]

    for r in records:
        err = r.get('error')
        if err == 'banned':
            n_banned += 1
            banned_reasons[r.get('ban_reason') or 'banned_unknown'] += 1
            continue
        if err == 'account_issue':
            n_account_issue += 1
            # Identify by Weibo's own `message` wording, kept verbatim.
            banned_reasons[r.get('ban_reason') or 'account_issue_unknown'] += 1
            continue
        if err == 'unreachable':
            n_unreachable += 1
            continue
        if err == 'fetch_failed':
            n_fetch_failed += 1
            continue
        if err:
            continue
        gender[r.get('gender', 'unknown')] += 1
        region[r.get('region', 'unknown')] += 1
        verified[r.get('verified_label', 'none')] += 1
        # ban/mute-ish heuristics: special_follow flag, mbtype==0 (no membership
        # isn't a ban, but combined with very low counts we flag separately).
        if r.get('special_follow'):
            banned['special_follow'] += 1
        followers_buckets[bucket(r.get('followers_count', 0), f_edges)] += 1
        friends_buckets[bucket(r.get('friends_count', 0), f_edges)] += 1
        statuses_buckets[bucket(r.get('statuses_count', 0), s_edges)] += 1
        for w in r.get('interests', []):
            interests[w] += 1
        # High-quality signals: #topics# and @mentions extracted from real post
        # text (surfaced separately; far stronger than crude keywords).
        po = r.get('_posts') or {}
        pin = po.get('interests') or {}
        for w in pin.get('topics', []):
            interest_topics[w] += 1
        for w in pin.get('mentions', []):
            interest_mentions[w] += 1

        fl = r.get('_follows')
        if fl:
            n_with_follows += 1
            follow_total += fl.get('count', 0)
            for fu in fl.get('sample', []):
                follow_audience_sampled += 1
                follow_audience_gender[fu.get('gender', 'unknown')] += 1
                follow_audience_region[fu.get('region', 'unknown')] += 1
                follow_audience_verified[fu.get('verified_label', 'none')] += 1
                if fu.get('is_punish'):
                    follow_audience_punished += 1
                cs = fu.get('credit_score')
                if isinstance(cs, (int, float)) and cs < 60:
                    follow_audience_lowcredit += 1

    reachable = n - n_banned - n_account_issue - n_unreachable - n_fetch_failed
    return {
        'total': n,
        'reachable': reachable,
        'banned': n_banned,
        'account_issue': n_account_issue,
        'unreachable': n_unreachable,
        'fetch_failed': n_fetch_failed,
        'banned_reasons': dict(banned_reasons.most_common()),
        'gender': dict(gender.most_common()),
        'region_top': dict(region.most_common(20)),
        'verified': dict(verified.most_common()),
        'special_follow_flag': banned.get('special_follow', 0),
        'followers_buckets': dict(followers_buckets),
        'friends_buckets': dict(friends_buckets),
        'statuses_buckets': dict(statuses_buckets),
        'top_interests': dict(interests.most_common(30)),
        'top_topics': dict(interest_topics.most_common(30)),
        'top_mentions': dict(interest_mentions.most_common(30)),
        'follow_phase': {
            'users_with_follows': n_with_follows,
            'total_follow_edges': follow_total,
            'avg_follows_per_user': (follow_total / n_with_follows) if n_with_follows else 0,
            'audience_sampled': follow_audience_sampled,
            'audience_gender': dict(follow_audience_gender.most_common()),
            'audience_region_top': dict(follow_audience_region.most_common(20)),
            'audience_verified': dict(follow_audience_verified.most_common()),
            'audience_punished': follow_audience_punished,
            'audience_lowcredit': follow_audience_lowcredit,
        },
    }


def print_report(summary):
    n = summary['total']
    print('=' * 64)
    print('Weibo Blacklist DEEP Analysis (n=%d)' % n)
    print('=' * 64)

    print('\n-- Coverage --')
    print('  reachable (profile fetched) : %d (%.1f%%)' %
          (summary.get('reachable', 0), 100.0 * summary.get('reachable', 0) / n))
    print('  banned/deleted accounts     : %d (%.1f%%)' %
          (summary.get('banned', 0), 100.0 * summary.get('banned', 0) / n))
    print('  account issue (frozen/risk) : %d (%.1f%%)' %
          (summary.get('account_issue', 0), 100.0 * summary.get('account_issue', 0) / n))
    print('  unreachable (no data, retried): %d (%.1f%%)' %
          (summary.get('unreachable', 0), 100.0 * summary.get('unreachable', 0) / n))
    print('  fetch failed (other)        : %d (%.1f%%)' %
          (summary.get('fetch_failed', 0), 100.0 * summary.get('fetch_failed', 0) / n))
    print('\n-- Unreachable reasons (verbatim API message) --')
    for k, v in summary.get('banned_reasons', {}).items():
        print('  %5d  %s' % (v, k))

    print('\n-- Gender --')
    for k, v in summary['gender'].items():
        print('  %-9s %6d  (%.1f%%)' % (k, v, 100.0 * v / n))

    print('\n-- Region (top 20) --')
    for k, v in summary['region_top'].items():
        print('  %-10s %6d  (%.1f%%)' % (k, v, 100.0 * v / n))

    print('\n-- Verification --')
    for k, v in summary['verified'].items():
        print('  %-12s %6d  (%.1f%%)' % (k, v, 100.0 * v / n))

    print('\n-- Followers count buckets --')
    for k, v in summary['followers_buckets'].items():
        print('  %-10s %6d' % (k, v))
    print('\n-- Friends (following) count buckets --')
    for k, v in summary['friends_buckets'].items():
        print('  %-10s %6d' % (k, v))
    print('\n-- Statuses (posts) count buckets --')
    for k, v in summary['statuses_buckets'].items():
        print('  %-10s %6d' % (k, v))

    print('\n-- Top interests (from post text, Phase 3) --')
    if summary['top_interests']:
        for k, v in summary['top_interests'].items():
            print('  %-8s %5d' % (k, v))
    else:
        print('  (no post data yet — run with --with-posts)')
    print('\n-- Top #topics# (hashtags, stronger signal) --')
    if summary.get('top_topics'):
        for k, v in summary['top_topics'].items():
            print('  %-20s %5d' % (k, v))
    else:
        print('  (none)')
    print('\n-- Top @mentions --')
    if summary.get('top_mentions'):
        for k, v in summary['top_mentions'].items():
            print('  %-20s %5d' % (k, v))
    else:
        print('  (none)')

    fp = summary['follow_phase']
    print('\n-- Follow-audience profiling (who THEY follow) --')
    print('  users with follow data : %d' % fp['users_with_follows'])
    print('  total follow edges     : %d' % fp['total_follow_edges'])
    print('  avg follows / user     : %.1f' % fp['avg_follows_per_user'])
    print('  audience sampled       : %d' % fp['audience_sampled'])
    print('  audience gender        : %s' % fp['audience_gender'])
    print('  audience verified      : %s' % fp['audience_verified'])
    print('  audience punished(is_punish) : %d' % fp['audience_punished'])
    print('  audience low-credit(<60)    : %d' % fp['audience_lowcredit'])
    print('\n  audience region (top 20):')
    for k, v in fp['audience_region_top'].items():
        print('    %-10s %6d' % (k, v))


def _md_escape(s):
    """Escape a string for safe embedding in a markdown table cell."""
    return str(s).replace('|', '\\|').replace('\n', ' ').strip()


def write_summary_md(summary, path, subject=None, viewer=None, generated_at=None,
                    kind='blacklist'):
    """Write a human-readable markdown summary of the analysis.

    The same numbers printed to stdout are persisted as `summary.md` under the
    data/ directory so the阶段性成果 is readable without re-running.

    `kind` selects the report framing: 'blacklist' (default, for the blacklist
    audience) or 'following' (for the accounts a user FOLLOWS, i.e. the
    following-deep control group). It only changes the wording/labels, not the
    numbers.
    """
    import datetime
    n = summary['total']
    if kind == 'following':
        title = 'Weibo Following Deep Analysis — Summary'
        subject_label = 'Subject (account analyzed):'
        total_label = 'Total followed accounts'
    else:
        title = 'Weibo Blacklist Deep Analysis — Summary'
        subject_label = 'Subject (blacklist owner):'
        total_label = 'Total blacklisted accounts'
    lines = []
    lines.append('# %s' % title)
    lines.append('')
    lines.append('- %s `%s`' % (subject_label, subject or '?'))
    lines.append('- Viewer (profile reader): `%s`' % (viewer or '?'))
    lines.append('- Generated: %s' % (generated_at or datetime.datetime.now().isoformat(timespec='seconds')))
    lines.append('- %s: **%d**' % (total_label, n))
    lines.append('')
    lines.append('## Coverage')
    lines.append('')
    lines.append('| Status | Count | Pct |')
    lines.append('|---|---:|---:|')
    lines.append('| Reachable (profile fetched) | %d | %.1f%% |' %
                  (summary.get('reachable', 0), 100.0 * summary.get('reachable', 0) / n))
    lines.append('| Banned / deleted | %d | %.1f%% |' %
                  (summary.get('banned', 0), 100.0 * summary.get('banned', 0) / n))
    lines.append('| Account issue (frozen/risk) | %d | %.1f%% |' %
                  (summary.get('account_issue', 0), 100.0 * summary.get('account_issue', 0) / n))
    lines.append('| Unreachable (no data, retried) | %d | %.1f%% |' %
                  (summary.get('unreachable', 0), 100.0 * summary.get('unreachable', 0) / n))
    lines.append('| Fetch failed (other) | %d | %.1f%% |' %
                  (summary.get('fetch_failed', 0), 100.0 * summary.get('fetch_failed', 0) / n))
    lines.append('')
    lines.append('## Unreachable reasons (verbatim API message)')
    lines.append('')
    lines.append('| Count | Reason |')
    lines.append('|---:|---|')
    for k, v in summary.get('banned_reasons', {}).items():
        lines.append('| %d | %s |' % (v, _md_escape(k)))
    lines.append('')
    lines.append('## Gender')
    lines.append('')
    lines.append('| Gender | Count | Pct |')
    lines.append('|---|---:|---:|')
    for k, v in summary.get('gender', {}).items():
        lines.append('| %s | %d | %.1f%% |' % (k, v, 100.0 * v / n))
    lines.append('')
    lines.append('## Region (top 20)')
    lines.append('')
    lines.append('| Region | Count | Pct |')
    lines.append('|---|---:|---:|')
    for k, v in summary.get('region_top', {}).items():
        lines.append('| %s | %d | %.1f%% |' % (k, v, 100.0 * v / n))
    lines.append('')
    lines.append('## Verification')
    lines.append('')
    lines.append('| Type | Count | Pct |')
    lines.append('|---|---:|---:|')
    for k, v in summary.get('verified', {}).items():
        lines.append('| %s | %d | %.1f%% |' % (k, v, 100.0 * v / n))
    lines.append('')
    lines.append('## Followers count buckets')
    lines.append('')
    for k, v in summary.get('followers_buckets', {}).items():
        lines.append('- `%s`: %d' % (k, v))
    lines.append('')
    lines.append('## Friends (following) count buckets')
    lines.append('')
    for k, v in summary.get('friends_buckets', {}).items():
        lines.append('- `%s`: %d' % (k, v))
    lines.append('')
    lines.append('## Statuses (posts) count buckets')
    lines.append('')
    for k, v in summary.get('statuses_buckets', {}).items():
        lines.append('- `%s`: %d' % (k, v))
    lines.append('')
    lines.append('## Top interests (from post text)')
    lines.append('')
    for k, v in summary.get('top_interests', {}).items():
        lines.append('- %s: %d' % (k, v))
    lines.append('')
    lines.append('## Top #topics# (hashtags, stronger signal)')
    lines.append('')
    for k, v in summary.get('top_topics', {}).items():
        lines.append('- %s: %d' % (k, v))
    lines.append('')
    lines.append('## Top @mentions')
    lines.append('')
    for k, v in summary.get('top_mentions', {}).items():
        lines.append('- %s: %d' % (k, v))
    lines.append('')
    fp = summary.get('follow_phase', {})
    lines.append('## Follow-audience profiling (who THEY follow)')
    lines.append('')
    lines.append('- Users with follow data: %d' % fp.get('users_with_follows', 0))
    lines.append('- Total follow edges: %d' % fp.get('total_follow_edges', 0))
    lines.append('- Avg follows / user: %.1f' % fp.get('avg_follows_per_user', 0))
    lines.append('- Audience sampled: %d' % fp.get('audience_sampled', 0))
    lines.append('- Audience punished (is_punish): %d' % fp.get('audience_punished', 0))
    lines.append('- Audience low-credit (<60): %d' % fp.get('audience_lowcredit', 0))
    lines.append('')
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')


# ---------------------------------------------------------------------------
# CLI glue
# ---------------------------------------------------------------------------

def register(subparsers, parents=None):
    p = subparsers.add_parser('blacklist-deep', parents=parents or [],
                              help='Deep profile + follow-audience analysis of the blacklist.')
    p.add_argument('--viewer-uid', default=None,
                   help='Account used to VIEW the blacklisted profiles (must NOT '
                        'be the one that blocked them, or profile fetches fail). '
                        'Defaults to the subject account (--uid/--user).')
    p.add_argument('--viewer-user', default=None,
                   help='Human label of the viewer account (alternative to --viewer-uid).')
    p.add_argument('--with-follows', action='store_true',
                   help='Also traverse each blacklisted user\'s follow list '
                        '(much higher request volume; full pagination).')
    p.add_argument('--with-posts', action='store_true',
                   help='Also fetch each blacklisted user\'s recent weibo posts and '
                        'extract real interests/topics from the text (not bio).')
    p.add_argument('--json', default=None,
                   help='Path to dump the full per-user JSON. Defaults to '
                        'data/blacklist_deep/<subject>_profiles.json.')
    p.add_argument('--no-summary-md', action='store_true',
                   help='Skip writing the human-readable summary.md next to the JSON.')
    p.add_argument('--profile-only', action='store_true',
                   help='Only (re)run phase 1 profiles; skip follow/post aggregation '
                        'even if caches exist.')
    p.set_defaults(run=run)


def run(args, auth):
    from auth import Auth
    from blacklist_analyzer import fetch_all

    # Subject = the account whose blacklist we analyze (must be logged in).
    auth.load()
    if not auth.ensure_session():
        print('Could not establish a session even after auto-recovery. '
              'If a QR code appeared, scan it, then re-run this command.')
        return

    # Viewer = the account used to actually SEE the blacklisted profiles.
    # It must NOT be the one who blocked them, or profile fetches fail. When no
    # viewer is given, fall back to the subject (original single-account path).
    viewer = auth
    if args.viewer_uid or args.viewer_user:
        viewer = Auth()
        if not viewer.resolve_uid(args.viewer_uid, args_user=args.viewer_user,
                                  prompt=not args.no_prompt):
            return
        viewer.load()
        if not viewer.ensure_session():
            print('Viewer account could not be logged in even after auto-recovery. '
                  'Scan the QR if one appeared, then re-run.')
            return
        print('[blacklist-deep] subject=%s viewer=%s'
              % (auth.uid or auth.label, viewer.uid or viewer.label))

    _ensure_dirs()

    total, users = fetch_all(auth)
    uids = [u['uid'] for u in users if u.get('uid')]
    print('[blacklist-deep] blacklist size = %d (server reported %s).' % (len(uids), total))

    # Phase 1: profiles (fetched with the VIEWER session).
    # Safety net: we sweep all uids once, then RE-SWEEP only the ones left in a
    # neutral `unreachable` state, up to MAX_RETRY_ROUNDS. This is what makes the
    # run resumable AND convergent: a run interrupted (killed / stalled) by soft
    # failures can simply be re-invoked and will pick up where it left off
    # instead of re-fetching everything. We never attribute `unreachable` to a
    # specific cause (e.g. rate-limiting) without evidence — it just means "no
    # data this attempt, retryable".
    MAX_RETRY_ROUNDS = 5
    records = []
    print('[blacklist-deep] Phase 1: fetching profiles (cached, resumable)...')
    for rnd in range(MAX_RETRY_ROUNDS):
        # On round 0 fetch every uid; on later rounds fetch only the unreachable.
        targets = uids if rnd == 0 else [r['uid'] for r in records if r.get('error') == 'unreachable']
        if not targets:
            break
        n = len(targets)
        done = 0
        for uid in targets:
            rec = fetch_profile(viewer, uid)
            rec['_follows'] = None
            rec['_posts'] = None
            if rnd == 0:
                records.append(rec)
            else:
                # replace the in-place record for this uid
                for i, old in enumerate(records):
                    if old['uid'] == uid:
                        records[i] = rec
                        break
            done += 1
            if done % 200 == 0:
                print('  [round %d] profiles %d/%d (%.1f%%)'
                      % (rnd + 1, done, n, 100.0 * done / n))
        remaining = sum(1 for r in records if r.get('error') == 'unreachable')
        print('[blacklist-deep] round %d done: %d unreachable remaining.'
              % (rnd + 1, remaining))
        if remaining == 0:
            break
        if rnd < MAX_RETRY_ROUNDS - 1:
            # Stall guard: a full round fetched but still has unreachable -> the
            # viewer is likely soft-blocked. Cool down longer before the next
            # round instead of hammering and never finishing.
            print('[blacklist-deep] cooling down 120s before retry round %d...'
                  % (rnd + 2))
            time.sleep(120)
    # Ensure every uid has a record (defensive; round 0 already covers all).
    if len(records) != len(uids):
        seen = {r['uid'] for r in records}
        for uid in uids:
            if uid not in seen:
                records.append(fetch_profile(viewer, uid))

    # Phase 2: follow lists (viewer session).
    # Safety net: same convergence pattern as Phase 1/Phase 3 — after the first
    # sweep, re-sweep only the uids whose follow cache is still missing (a soft
    # wall can drop a follow-list fetch mid-traversal), up to MAX_RETRY_ROUNDS,
    # with a cooldown between rounds. Without this, some users would be left
    # without a follow audience.
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
                fl = fetch_follows(viewer, uid)
                rec = next(r for r in records if r['uid'] == uid)
                rec['_follows'] = fl
                fdone += 1
                if fdone % 100 == 0:
                    print('  [round %d] follows %d/%d (%.1f%%)'
                          % (rnd + 1, fdone, n, 100.0 * fdone / n))
            remaining = sum(1 for r in records
                            if not r.get('error') and _follows_cache_missing(r['uid']))
            print('[blacklist-deep] Phase 2 round %d done: %d follow lists missing.'
                  % (rnd + 1, remaining))
            if remaining == 0:
                break
            if rnd < MAX_RETRY_ROUNDS - 1:
                print('[blacklist-deep] cooling down 120s before follows retry '
                      'round %d...' % (rnd + 2))
                time.sleep(120)

        # Always load cached follow lists into records so the aggregate below
        # sees them even when every cache was already warm (the convergence
        # loop above skips entirely in that case and would otherwise leave
        # `_follows` unset -> follow-audience stats come out empty).
        for rec in records:
            if rec.get('error') or rec.get('_follows') is not None:
                continue
            if os.path.exists(_follow_cache_path(rec['uid'])):
                rec['_follows'] = fetch_follows(viewer, rec['uid'])

    # Phase 3: posts + real interest extraction (viewer session).
    # Safety net: same convergence pattern as Phase 1 — after the first sweep,
    # re-sweep only the uids whose posts cache is still missing (e.g. a soft
    # wall dropped them), up to MAX_RETRY_ROUNDS, with a cooldown between
    # rounds. Without this, a handful of uids could be silently left without
    # posts (we saw 13 dropped by rate-limiting in testing).
    if args.with_posts and not args.profile_only:
        def _posts_cache_missing(uid):
            return not os.path.exists(os.path.join(POST_DIR, '%s.json' % uid))

        for rnd in range(MAX_RETRY_ROUNDS):
            targets = [r['uid'] for r in records
                       if not r.get('error') and _posts_cache_missing(r['uid'])]
            if not targets:
                break
            n = len(targets)
            pdone = 0
            for uid in targets:
                po = fetch_posts(viewer, uid)
                rec = next(r for r in records if r['uid'] == uid)
                rec['_posts'] = po
                rec['interests'] = po.get('interests', {}).get('keywords', [])
                pdone += 1
                if pdone % 200 == 0:
                    print('  [round %d] posts %d/%d (%.1f%%)'
                          % (rnd + 1, pdone, n, 100.0 * pdone / n))
            remaining = sum(1 for r in records
                            if not r.get('error') and _posts_cache_missing(r['uid']))
            print('[blacklist-deep] Phase 3 round %d done: %d posts missing.'
                  % (rnd + 1, remaining))
            if remaining == 0:
                break
            if rnd < MAX_RETRY_ROUNDS - 1:
                print('[blacklist-deep] cooling down 120s before posts retry '
                      'round %d...' % (rnd + 2))
                time.sleep(120)

        # Same as Phase 2: always load cached posts/interests into records so the
        # aggregate sees them even when every posts cache was already warm.
        # Re-extract keywords from the cached post texts with the CURRENT (cleaner)
        # extractor so old cached junk keywords get refreshed offline (no API hit).
        for rec in records:
            if rec.get('error') or rec.get('_posts') is not None:
                continue
            pp = os.path.join(POST_DIR, '%s.json' % rec['uid'])
            if os.path.exists(pp):
                po = fetch_posts(viewer, rec['uid'])
                rec['_posts'] = po
                fresh = _extract_interests_from_posts(po.get('texts', []))
                po['interests'] = fresh
                rec['interests'] = fresh.get('keywords', [])

    summary = aggregate(records)
    print_report(summary)

    # Acceptance / safety-net verdict: state explicitly whether the run is
    # complete. `unreachable` must be 0 for full coverage; otherwise tell the
    # user to re-run (the resume logic will only retry those few).
    s_unreachable = summary.get('unreachable', 0)
    s_fetch_failed = summary.get('fetch_failed', 0)
    if s_unreachable == 0 and s_fetch_failed == 0:
        print('\n[blacklist-deep] DONE: full coverage '
              '(reachable=%d banned=%d account_issue=%d).'
              % (summary.get('reachable', 0), summary.get('banned', 0),
                 summary.get('account_issue', 0)))
    else:
        print('\n[blacklist-deep] INCOMPLETE: %d unreachable / %d fetch_failed remain. '
              'Re-run the same command to retry only those (resumable).'
              % (s_unreachable, s_fetch_failed))

    subject_id = auth.uid or auth.label or 'subject'
    json_path = args.json or os.path.join(DATA_DIR, '%s_profiles.json' % subject_id)
    # strip the heavy _follows.uids / _posts.texts before dumping.
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
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print('\nJSON written to %s' % json_path)

    if not args.no_summary_md:
        md_path = os.path.join(DATA_DIR, '%s_summary.md' % subject_id)
        write_summary_md(summary, md_path,
                         subject=(auth.uid or auth.label),
                         viewer=(viewer.uid or viewer.label) if viewer is not auth else None)
        print('Summary written to %s' % md_path)
