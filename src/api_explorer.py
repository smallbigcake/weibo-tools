"""Weibo API inventory (single source of truth).

Builds a unified catalog of Weibo's web APIs from two complementary sources
and emits one machine-readable file (`doc/api_inventory.json`) plus one
human-readable doc (`doc/api_inventory.md`):

  1. Front-end JS bundles (live weibo.com) — `src/tmp/endpoints.txt`, produced by
     `src/tmp/extract_endpoints.py`. These are *all* `/ajax/...` paths the SPA
     references. We probe them with the logged-in session to record status and
     response shape. No guessing.
  2. Burp Suite capture (`src/tmp/http_history_burp_suite.xml`,
     `src/tmp/site_map_burp_suite.xml`) — endpoints *as actually called*, including
     hosts outside `weibo.com/ajax` that the bundle scraper misses
     (`api.weibo.com/webim/*`, `rm.api.weibo.com`, `s.weibo.com`,
     `web.im.weibo.com`) and the *real* request parameters (from a captured
     account). Each is functionally annotated.

The two sources are merged by `(host, method, path)` so an endpoint that
appears in both keeps the probed status AND the real captured params/function.

Probing rules
-------------
- GET endpoints are probed read-only (placeholder uid/id -> structural 400/404,
  still informative).
- Endpoints whose path implies a mutation are treated as MUTATING and only
  called when `--mutate` is passed; otherwise listed but skipped.
- Only structural facts are persisted. PII/credential values are redacted.

Usage (from project root):
    python src/api_explorer.py                # probe scraped endpoints + merge burp
    python src/api_explorer.py --mutate       # also probe mutating endpoints
    python src/api_explorer.py --no-probe     # rebuild docs from existing json
    python src/tmp/extract_endpoints.py           # refresh the JS-bundle endpoint list
"""
import argparse
import base64
import json
import os
import re
import sys
import time
from collections import OrderedDict
from datetime import datetime, timezone
from urllib.parse import parse_qs
from xml.etree import ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from logutil import setup as _setup_logging
_setup_logging()

from auth import Auth, USER_AGENT

HERE = os.path.dirname(os.path.abspath(__file__))
DOC_DIR = os.path.join(HERE, '..', 'doc')
INVENTORY_JSON = os.path.join(DOC_DIR, 'api_inventory.json')
INVENTORY_MD = os.path.join(DOC_DIR, 'api_inventory.md')
ENDPOINTS_TXT = os.path.join(HERE, '..', 'tmp', 'endpoints.txt')
BURP_FILES = [os.path.join(HERE, '..', 'tmp', 'http_history_burp_suite.xml'),
              os.path.join(HERE, '..', 'tmp', 'site_map_burp_suite.xml')]

# Path fragments that strongly imply a mutation (so we treat them as unsafe).
_MUTATING_HINTS = (
    'update', 'create', 'destroy', 'delete', 'destory', 'set', 'save',
    'add', 'publish', 'repost', 'normal_repost', 'cancel', 'modify',
    'upload', 'generate', 'send', 'check', 'remove', 'clear', 'associate',
    'vote', 'task', 'band', 'remark',
)

# Map an endpoint path segment to a human category for grouping in the doc.
_CATEGORY_MAP = [
    ('feed', 'feed'),
    ('statuses', 'statuses'),
    ('profile', 'profile'),
    ('comments', 'comment'),
    ('attitudes', 'like'),
    ('friendships', 'follow'),
    ('user', 'user'),
    ('search', 'search'),
    ('side', 'sidebar'),
    ('notify', 'notify'),
    ('message', 'message'),
    ('setting', 'setting'),
    ('multimedia', 'multimedia'),
    ('video', 'video'),
    ('shop', 'shop'),
    ('qrcode', 'qrcode'),
    ('vote', 'vote'),
    ('stopic', 'stopic'),
    ('log', 'log'),
    ('wegent', 'wegent'),
    ('config', 'config'),
    ('save', 'setting'),
    ('card', 'sidebar'),
    ('account', 'account'),
    ('approval', 'approval'),
    ('favorites', 'favorites'),
    ('group', 'group'),
    ('home', 'home'),
    ('container', 'container'),
    ('recognize', 'recognize'),
    ('album', 'album'),
    ('remind', 'remind'),
    ('harmony', 'harmony'),
    ('interact', 'interact'),
    ('gather', 'gather'),
    ('fav', 'favorites'),
    ('note', 'note'),
    ('checkin', 'checkin'),
    ('webim', 'im'),
    ('chat', 'im'),
    ('ajax_proxy', 'chaohua'),
    ('aisearch', 'search'),
    ('ajax_Indexband', 'search'),
]

# Functional annotations for Burp-captured endpoints: host -> path-substring ->
# (title, description). First substring match wins.
ANNOTATIONS = {
    'rm.api.weibo.com': {
        'remind/push_count': (
            'Reminder / unread counter',
            'Aggregated unread & reminder counts across the whole account: '
            'direct messages (dm/dm_unread), chat groups (chat_group), '
            'mentions (@), comments, likes, new followers, etc. Driven by the '
            '`with_*` toggles. `source` is the app id; `callback` wraps JSONP.'),
    },
    'api.weibo.com': {
        'webim/2/direct_messages/contacts': (
            'DM contact list',
            'List of direct-message conversations/contacts (people + groups), '
            'with per-contact unread counts and last message preview. '
            '`is_include_folder=1` includes archived; `count` page size; '
            '`add_virtual_user` injects system/virtual accounts.'),
        'webim/2/direct_messages/public/block_query': (
            'Public DM block status',
            'Whether the account blocks receiving public direct messages '
            '(anti-harassment). Returns `{"result":false}` = not blocking.'),
        'webim/2/direct_messages/public/query_remind_type': (
            'Public DM remind type',
            'The notification type configured for public (stranger) DMs. '
            '`business:"pub_dm"`.'),
        'webim/2/direct_messages/get_settings': (
            'DM settings (by type)',
            'Read a DM-related setting by `type` (e.g. type=3 -> `{"3":0}`).'),
        'webim/2/notice_center/outer/push_settings': (
            'Push notification settings',
            'Per-category mobile/PC push toggles (at_me, comment, like, dm, '
            'new_fans, groupchat_notify_receive, ...). `ua=PC`.'),
        'webim/report': (
            'IM heartbeat / presence report',
            'POST. Reports the active IM session (`sid`, `client_id`, `type`) '
            'so the server keeps the long-polling connection alive. Empty body '
            'on success.'),
        'webim/pic_infos': (
            'DM image URL resolver',
            'Given a pic pid (image id), returns the CDN URL. `pids` accepts a '
            'single id (or comma list).'),
        'webim/groupchat/query_messages': (
            'Group-chat message history',
            'Fetch messages of a group chat (`id`=`gid`) before `max_mid`, '
            'latest-first, `count` per page. `convert_emoji=1` expands emoji '
            'codes. Returns `messages[]` with sender/mid/content.'),
        'webim/groupchat/query_nick': (
            'Group member nickname',
            'Resolve a member\'s display nickname inside a group chat.'),
        'webim/groupchat/query_sync_groups': (
            'Group sync eligibility',
            'Whether a group can be synced to the contact list. '
            'Error 21202 = "group abnormal, cannot sync".'),
        'webim/groupchat/query_fangroup_ability': (
            'Fan-group ability',
            'For the logged-in page (`page_id`=uid): how many fan groups and '
            'how many the user created.'),
        'webim/query_config': (
            'IM client config',
            'Small client capability flags (e.g. p_msg_service_notice, '
            'p_msg_greet_enable).'),
        'webim/query_primary_info': (
            'Primary account profile',
            'Full self profile used by the IM client: uid, screen_name, '
            'gender, province/city, birthday, email, description, avatar.'),
        'webim/query_remark': (
            'Friend remarks / aliases',
            'Map of uid -> remark name + pinyin (`jp`/`qp`) shortcuts for the '
            'user\'s contacts.'),
        'webim/query_group': (
            'Group chat info',
            'Metadata of a group chat (members, name, owner).'),
        'webim/emotions': (
            'Emoji / sticker catalog',
            'List of available emoticons: `phrase` (token like [流鼻血]), '
            '`url` to the PNG, `hot`/`common` flags, `category`.'),
        'webim/api/v1/private-letter-page/check-auth': (
            'DM page auth check',
            'Before opening a 1:1 DM thread, checks if the other party '
            '(`talkUid`) allows private letters. `isOpen`/`header.code`.'),
        'webim/2/users/show': (
            'IM user card',
            'Lightweight user profile for the IM context (uid -> screen_name, '
            'avatar, etc.).'),
        'chat': (
            'IM web client shell',
            'HTML page that boots the Weibo web chat SPA. Not an API; the real '
            'transport is Bayeux over web.im.weibo.com.'),
    },
    's.weibo.com': {
        'aisearch': (
            'AI search page',
            'Server-rendered AI search results page for query `q` '
            '(`Refer=weibo_aisearch`). Returns HTML, not JSON.'),
        'ajax_Indexband/getIndexBand': (
            'Home index "band" recommendations',
            'Trending search bands / recommended queries shown on the home '
            'column. `type=0`. Returns `data.list[]` of hot-word objects '
            '(word, note, topic_flag).'),
        'weibo': (
            'Legacy search redirect',
            'Old `/weibo` search entry; redirects into the modern search.'),
    },
    'web.im.weibo.com': {
        'im/handshake': (
            'Bayeux handshake',
            'CometD/Bayeux long-polling handshake: establishes `clientId`. '
            'JSON array body `[{channel:/meta/handshake, ...}]`.'),
        'im/connect': (
            'Bayeux long-poll connect',
            'Holds the long-polling connection and delivers async messages '
            '(group DMs, notices). Same JSON envelope as handshake.'),
        'im/disconnect': (
            'Bayeux disconnect',
            'Tears down the long-polling session.'),
        'im': (
            'Bayeux endpoint (generic)',
            'Base Bayeux channel used by the chat SPA for subscribe/connect '
            '(see chat.py for the working implementation).'),
    },
    'weibo.com': {
        'ajax_proxy/chaohua': (
            'Super-topic (chaohua) proxy',
            'Proxy into the Super-Topic (超话) subsystem. `pcmain/objs` lists '
            'objects/boards of a super topic. Requires real uid context.'),
        'u/': (
            'User profile page (HTML)',
            'Server-rendered profile page for uid in the path. Not JSON; use '
            '`/ajax/profile/info?uid=` for structured data.'),
        'ajax/profile/info': (
            'User profile info',
            'Core profile of `uid` (screen_name, description, stats, verified, '
            'avatar). `scene=profile` is the profile-page variant.'),
        'ajax/profile/detail': (
            'User profile detail',
            'Extended self profile: birthday, gender, ip_location, education, '
            'career, sunshine credit.'),
        'ajax/profile/sidedetail': (
            'Profile sidebar detail',
            'Secondary profile panel data shown beside the timeline.'),
        'ajax/profile/topicContent': (
            'Profile topic content',
            'Weibos of a user filtered by a topic/keyword on the profile page.'),
        'ajax/statuses/mymblog': (
            'My/their weibo list',
            'Paginated list of a user\'s own posts. `uid` target, `page`, '
            '`feature` (0=all, 1=original, ...). Returns `weibo_items[]`.'),
        'ajax/feed/allGroups': (
            'Feed group list',
            'The user\'s feed groups (关注/热门/自定义分组) used by the home '
            'timeline selector.'),
        'ajax/feed/groupstimeline': (
            'Group timeline',
            'Weibo feed for one feed group; needs `group_id` + `refresh_type`.'),
        'ajax/feed/unreadfriendstimeline': (
            'Unread friend timeline',
            'Friend (following) timeline of new/unread posts since last view. '
            'Returns `statuses[]`.'),
        'ajax/feed/getTipsAd': (
            'Feed ad/tips',
            'Promotional "tip" cards injected into the feed.'),
        'ajax/side/cards': (
            'Sidebar cards',
            'Right-column widgets (recommended users, groups, ads).'),
        'ajax/side/cards/sideBusiness': (
            'Sidebar business card',
            'Promoted/business account card in the sidebar.'),
        'ajax/side/cards/sideInterested': (
            'Sidebar "interested" card',
            'Recommended-content card in the sidebar.'),
        'ajax/side/bandUnified': (
            'Unified band',
            'Unified promotional band across pages.'),
        'ajax/favorites/all_fav': (
            'All favorites',
            'List of weibos the user has favorited (collected). `uid`, `page`, '
            '`with_total`.'),
        'ajax/favorites/tags': (
            'Favorite tags',
            'User-defined tags/categories for favorites.'),
        'ajax/setting/getBasicInfo': (
            'Basic info settings',
            'Editable basic-profile fields (nickname, gender, birthday...).'),
        'ajax/setting/getPrivacy': (
            'Privacy settings',
            'Current privacy toggles (who can comment/see/DM).'),
        'ajax/setting/savePrivacy': (
            'Save privacy settings',
            'POST. Persist privacy toggles.'),
        'ajax/setting/updateExperience': (
            'Update experience entry',
            'POST. Save a profile "experience" (education/work) item.'),
        'ajax/setting/getWatermark': (
            'Image watermark setting',
            'Current image-watermark config.'),
        'ajax/setting/getFilteredUsers': (
            'Filtered (muted) users',
            'List of users the account has filtered/muted from its timeline.'),
        'ajax/message/unreadHint': (
            'Message unread hint',
            'Lightweight unread badge for the message nav icon.'),
        'ajax/multimedia/getSsigUrl': (
            'Multimedia signed URL',
            'Get a time-limited signed playback URL for a video/audio.'),
        'ajax/multimedia/createCert': (
            'Multimedia upload cert',
            'POST. Obtain an upload credential/token for media upload.'),
        'ajax/multimedia/getLiveInfoDetail': (
            'Live info detail',
            'Metadata + play URLs for a live stream.'),
        'ajax/statuses/config': (
            'Compose config',
            'Client config for the post composer (topic list, limits).'),
        'ajax/statuses/likelist': (
            'Likers list',
            'Users who liked a given weibo (`id`). Returns `data[]` of users.'),
        'ajax/common/getCopyright': (
            'Copyright notice',
            'Footer copyright / ICP info injected by the SPA.'),
        'ajax/config/get_config': (
            'Global config + login state',
            'Boot config: login state (`ok`), uid, ab-test flags, feature '
            'switches. `ok:1` means logged in.'),
        'ajax/getNavConfig': (
            'Navigation config',
            'Top-nav bar config (menu items, badges, entry points).'),
        'ajax/log/action': (
            'Behavior log',
            'GET. Report a user action/event for analytics.'),
        'ajax/log/read': (
            'Read-state log',
            'POST. Mark items (notifications/messages) as read.'),
        'ajax/log/rum': (
            'RUM performance log',
            'POST. Real-user-monitoring beacon (timings).'),
        'ajax/log/detectVideoCodecSupport': (
            'Video codec detection',
            'Reports which video codecs the client/browser supports.'),
    },
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _redact(value):
    if isinstance(value, str) and len(value) > 24:
        return '<%d chars>' % len(value)
    return value


_SENSITIVE_KEYS = {
    'sub', 'subp', 'scf', 'alf', 'alc', 'svb', 'srf', 'srt', 'wbptpk',
    'token', 'access_token', 'refresh_token', 'cookie', 'cookies',
    'phone', 'email', 'idcard', 'password', 'passwd', 'stoken',
}


def _walk_keys(obj, depth=0, max_depth=3):
    if depth > max_depth:
        return {'type': 'deep', 'note': 'truncated'}
    if isinstance(obj, dict):
        sample = {}
        for k, v in obj.items():
            if isinstance(v, (dict, list)):
                sample[k] = '<%s>' % type(v).__name__
            elif k.lower() in _SENSITIVE_KEYS:
                sample[k] = _redact(v)
            elif isinstance(v, (str, int, float, bool)) or v is None:
                sample[k] = _redact(v)
            else:
                sample[k] = '<%s>' % type(v).__name__
        return {'type': 'object', 'keys': sorted(obj.keys()), 'sample': sample}
    if isinstance(obj, list):
        summary = {'type': 'array', 'len': len(obj)}
        if obj and isinstance(obj[0], dict):
            summary['item_keys'] = sorted(obj[0].keys())
        return summary
    return {'type': 'scalar', 'value': _redact(obj) if not isinstance(obj, (int, float, bool)) else obj}


def _default_headers(referer='https://weibo.com/'):
    return {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json, text/plain, */*',
        'Referer': referer,
        'x-requested-with': 'XMLHttpRequest',
    }


def classify(path):
    """Return (category, method, mutating) for a path (host-relative)."""
    m = re.search(r'/ajax/([^?]*)', path)
    rest = m.group(1) if m else path
    seg = rest.split('/')
    tail = seg[0] if seg else ''
    category = 'other'
    for key, cat in _CATEGORY_MAP:
        if tail == key or rest.startswith(key + '/'):
            category = cat
            break
    low = path.lower()
    mutating = any(h in low for h in _MUTATING_HINTS)
    method = 'POST' if mutating else 'GET'
    return category, method, mutating


def host_of(url):
    m = re.match(r'https?://([^/]+)/', url)
    return m.group(1) if m else '?'


def path_of(url):
    return re.sub(r'https?://[^/]+/', '/', url).split('?')[0]


# ---------------------------------------------------------------------------
# Source 1: JS-bundle scraped endpoints (weibo.com/ajax)
# ---------------------------------------------------------------------------

def load_scraped_endpoints():
    if not os.path.exists(ENDPOINTS_TXT):
        raise SystemExit('endpoints.txt not found. Run: python src/tmp/extract_endpoints.py')
    out = []
    with open(ENDPOINTS_TXT, 'r', encoding='utf-8') as f:
        for line in f:
            p = line.strip()
            if not p:
                continue
            if p.startswith('//'):
                p = 'https:' + p
            elif p.startswith('/'):
                p = 'https://weibo.com' + p
            out.append(p)
    seen, uniq = set(), []
    for p in out:
        if p not in seen:
            seen.add(p)
            uniq.append(p)
    return uniq


def get_whoami(auth):
    import re
    try:
        r = auth.session.get('https://weibo.com/',
                              headers={'User-Agent': USER_AGENT,
                                       'Accept': 'text/html',
                                       'Referer': 'https://weibo.com/'},
                              timeout=15, allow_redirects=True)
        um = re.search(r'"user"\s*:\s*\{\s*"id"\s*:\s*(\d+)', r.text)
        nm = re.search(r'"screen_name"\s*:\s*"([^"]*)"', r.text)
        if um:
            return {'uid': um.group(1), 'name': nm.group(1) if nm else ''}
    except Exception:
        pass
    return {}


_SAMPLE_MID = 'MhZ6k0ABC'


def probe_one(auth, url, whoami, mutate):
    category, method, mutating = classify(url)
    if mutating and not mutate:
        return {'skipped': 'mutating (pass --mutate to call)',
                'category': category, 'method': method, 'mutating': True}

    params = {}
    low = url.lower()
    if 'uid' in low or 'user' in low:
        params['uid'] = whoami.get('uid', '7904020000')
    if any(k in low for k in ('show', 'longtext', 'buildcomments', 'setlike',
                              'likelist', 'repost', 'destroy', 'comment',
                              'mentions', 'edit', 'translate', 'extend')):
        params['id'] = _SAMPLE_MID
    if 'page' in low:
        params['page'] = 1
    if 'count' in low:
        params['count'] = 10

    headers = _default_headers()
    xsrf = auth.session.cookies.get('XSRF-TOKEN', domain='weibo.com')
    if xsrf and method == 'POST':
        headers['X-Xsrf-Token'] = xsrf

    try:
        if method == 'GET':
            resp = auth.session.get(url, params=params, headers=headers,
                                    timeout=20, allow_redirects=False)
        else:
            resp = auth.session.post(url, data=params, headers=headers,
                                     timeout=20, allow_redirects=False)
    except Exception as e:
        return {'error': 'request failed: %s' % e, 'category': category,
                'method': method, 'mutating': mutating}

    ctype = resp.headers.get('Content-Type', '')
    record = {
        'status': resp.status_code,
        'content_type': ctype,
        'is_json': False,
        'category': category,
        'method': method,
        'mutating': mutating,
        'sample_params': params,
    }
    if resp.status_code in (301, 302, 303, 307, 308):
        record['location'] = resp.headers.get('Location')
    body = resp.text or ''
    if 'json' in ctype or body.lstrip().startswith(('{', '[')):
        try:
            obj = json.loads(body)
            record['is_json'] = True
            record['json_structure'] = _walk_keys(obj)
            if isinstance(obj, dict):
                for key in ('ok', 'code', 'retcode', 'result', 'errno', 'msg',
                            'message'):
                    if key in obj:
                        record['signal_%s' % key] = obj[key]
        except Exception as e:
            record['json_parse_error'] = str(e)[:200]
            record['body_head'] = body[:200]
    else:
        record['body_head'] = body[:200]
    return record


# ---------------------------------------------------------------------------
# Source 2: Burp Suite capture (real traffic, any host)
# ---------------------------------------------------------------------------

def _decode_raw(b):
    if b is None:
        return ''
    try:
        return base64.b64decode(b).decode('utf-8', 'replace')
    except Exception:
        return b or ''


def _split_http(raw):
    lines = raw.split('\r\n')
    try:
        idx = lines.index('')
    except ValueError:
        idx = len(lines)
    return '\r\n'.join(lines[:idx]), '\r\n'.join(lines[idx + 1:])


def load_burp_endpoints():
    """Parse Burp XML files into representative endpoint records.

    Returns a list of dicts: {host, method, path, url, count, query, post,
    status, ctype, resp_head, function_title, function_desc}.
    """
    items = []
    for f in BURP_FILES:
        if not os.path.exists(f):
            continue
        try:
            root = ET.parse(f).getroot()
        except Exception as e:
            print('skip %s: %s' % (f, e))
            continue
        for it in root.iter('item'):
            items.append(it)

    groups = OrderedDict()
    for it in items:
        url = it.findtext('url') or ''
        method = (it.findtext('method') or '').upper()
        host = host_of(url)
        path = path_of(url)
        key = (host, method, path)
        groups.setdefault(key, []).append(it)

    out = []
    for (host, method, path), its in groups.items():
        rep = its[0]
        url = rep.findtext('url') or ''
        raw = _decode_raw(rep.findtext('request'))
        resp = _decode_raw(rep.findtext('response'))
        req_head, req_body = _split_http(raw)
        resp_head, resp_body = _split_http(resp)
        q = url.split('?', 1)[1] if '?' in url else ''
        qp = {k: (v[0] if len(v) == 1 else v) for k, v in parse_qs(q).items()}
        post_params = {}
        if req_body and '=' in req_body and '&' in req_body:
            try:
                post_params = {k: (v[0] if len(v) == 1 else v)
                               for k, v in parse_qs(req_body).decode('utf-8').items()}
            except Exception:
                post_params = {}
        ctype = ''
        for l in resp_head.split('\r\n'):
            if l.lower().startswith('content-type:'):
                ctype = l.split(':', 1)[1].strip()
        title, desc = '', ''
        for sub, (t, d) in ANNOTATIONS.get(host, {}).items():
            if sub and sub in path:
                title, desc = t, d
                break
        category, _, mutating = classify(path)
        # Burp paths already include method; classify may mis-flag GET as POST
        # for mutating-looking paths — trust the captured method instead.
        out.append({
            'host': host, 'method': method, 'path': path, 'url': url,
            'count': len(its),
            'query': {k: _redact(v) for k, v in qp.items()},
            'post': {k: _redact(v) for k, v in post_params.items()},
            'capture_status': rep.findtext('status') or '',
            'content_type': ctype,
            'resp_head': resp_body[:500],
            'category': category,
            'mutating': mutating if method == 'POST' else False,
            'function_title': title, 'function_desc': desc,
        })
    return out


# ---------------------------------------------------------------------------
# Merge + emit
# ---------------------------------------------------------------------------

def _key(rec):
    """Merge key: (host, method, path)."""
    return (rec.get('host') or host_of(rec.get('url', '')),
            rec.get('method'),
            rec.get('path') or path_of(rec.get('url', '')))


def build_inventory(auth, whoami, mutate):
    endpoints = {}  # key -> merged record

    # Source 1: probe scraped weibo.com/ajax endpoints.
    scraped = load_scraped_endpoints()
    for url in scraped:
        rec = probe_one(auth, url, whoami, mutate)
        rec['url'] = url
        rec['host'] = host_of(url)
        rec['path'] = path_of(url)
        rec['source'] = 'scraper'
        k = _key(rec)
        endpoints[k] = rec

    # Source 2: Burp capture. Merge onto existing or add new.
    for b in load_burp_endpoints():
        k = _key(b)
        if k in endpoints:
            # enrich: real params + function + captured status override
            e = endpoints[k]
            e['source'] = 'both'
            e['real_query'] = b['query']
            e['real_post'] = b['post']
            if b.get('function_title'):
                e['function_title'] = b['function_title']
                e['function_desc'] = b['function_desc']
            e['capture_count'] = b['count']
            if b.get('capture_status'):
                e['capture_status'] = b['capture_status']
            if b.get('resp_head'):
                e['capture_resp_head'] = b['resp_head']
        else:
            b['source'] = 'burp'
            endpoints[k] = b

    return endpoints


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mutate', action='store_true',
                    help='also call mutating (POST) endpoints')
    ap.add_argument('--no-probe', action='store_true',
                    help='regenerate docs from existing inventory json')
    args = ap.parse_args()

    if not args.no_probe:
        auth = Auth()
        auth.load()
        if not auth.test_login():
            print('Not logged in. Run src/test/run_login.py first (QR scan).')
            return
        whoami = get_whoami(auth)
        print('whoami:', whoami)
        endpoints = build_inventory(auth, whoami, args.mutate)
        for k, rec in sorted(endpoints.items()):
            status = rec.get('status', rec.get('capture_status', 'SKIP'))
            print('%-9s %-7s %-22s -> %s %s'
                  % (rec.get('category', '?'), rec.get('method', '?'),
                     (rec.get('host', '') + rec.get('path', '')),
                     status, rec.get('source', '')))
        os.makedirs(DOC_DIR, exist_ok=True)
        payload = {
            'generated_at': datetime.now(timezone.utc).isoformat(),
            'whoami': whoami,
            'mutate': bool(args.mutate),
            'endpoint_count': len(endpoints),
            'endpoints': {('%s %s %s' % k): v for k, v in endpoints.items()},
        }
        with open(INVENTORY_JSON, 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        print('Wrote', INVENTORY_JSON, '(%d endpoints)' % len(endpoints))

    render_markdown()


def render_markdown():
    if not os.path.exists(INVENTORY_JSON):
        print('No inventory json found; run without --no-probe first.')
        return
    with open(INVENTORY_JSON, 'r', encoding='utf-8') as f:
        payload = json.load(f)
    endpoints = payload['endpoints']

    lines = []
    lines.append('# Weibo API Inventory')
    lines.append('')
    lines.append('> Unified catalog generated by `src/api_explorer.py` from two '
                 'sources:')
    lines.append('> 1. **JS-bundle scrape** of `weibo.com/ajax/...` endpoints '
                 '(probed live with the logged-in session).')
    lines.append('> 2. **Burp Suite capture** of real traffic — adds hosts '
                 'outside `weibo.com/ajax` (`api.weibo.com/webim`, '
                 '`rm.api.weibo.com`, `s.weibo.com`, `web.im.weibo.com`) and '
                 'the *real* request parameters.')
    lines.append('> Captured %s (UTC).' % payload.get('generated_at', '?'))
    lines.append('> Logged-in (probe) user: `%s` (uid=%s). Capture account '
                 '(Burp) is a different one (uid 1176110000); uids in captured '
                 'params are samples.' % (payload.get('whoami', {}).get('name', '?'),
                                          payload.get('whoami', {}).get('uid', '?')))
    lines.append('> Mutating endpoints probed live: %s. (`source: burp` '
                 'entries are documented-from-capture only.)'
                 % payload.get('mutate', False))
    lines.append('> Total distinct endpoints: %s.' % payload.get('endpoint_count', '?'))
    lines.append('')
    lines.append('## Conventions')
    lines.append('')
    lines.append('- Auth: a logged-in session cookie (`SUB` @ .weibo.com) is required for `weibo.com`.')
    lines.append('- Most `weibo.com` POSTs need header `X-Xsrf-Token` (from the `XSRF-TOKEN` cookie).')
    lines.append('- `api.weibo.com/webim/*` uses app-id `source` params (e.g. 209678993).')
    lines.append('- `web.im.weibo.com/im/*` is Bayeux (CometD) long-polling, JSON array envelope.')
    lines.append('- `M` = method. `Mut` = mutating. `Src` = source (scraper / burp / both).')
    lines.append('- Status 400/404 on a probed GET often means required params were placeholders.')
    lines.append('- `ok`/`code`/`retcode`/`result` are common response signals; `ok:1` = success.')
    lines.append('- Values shown are redacted where long; captured params are from a different account.')
    lines.append('- **Live column** verdicts (from `src/live_test.py`, real requests with the '
                 'logged-in session):')
    lines.append('  - `ok` = HTTP 200 + success envelope. `ok_http` = 200 but non-standard envelope.')
    lines.append('  - `exists_param_needed` = 400/500: endpoint alive, needs business params (not dead).')
    lines.append('  - `dead` = 404: path removed by the server.')
    lines.append('  - `blocked` = 403: exists but anti-crawl / source-check blocked our request.')
    lines.append('  - `ssl_cert_expired` = `web.im.weibo.com` only: endpoint exists but the bundled CA '
                 'is expired; reachable from a browser or with an updated CA (see `chat.py`).')
    lines.append('  - `mutating_skipped` = POST that changes state; not exercised to protect the account.')
    lines.append('  - `error` = request failed (network/TLS other than the CA case).')
    lines.append('')

    # Group by host, then category.
    by_host = OrderedDict()
    for key, rec in endpoints.items():
        host = rec.get('host', '?')
        by_host.setdefault(host, []).append((key, rec))

    lines.append('## Summary by host')
    lines.append('')
    lines.append('| Host | Endpoints |')
    lines.append('|---|---|')
    for host in sorted(by_host):
        lines.append('| `%s` | %d |' % (host, len(by_host[host])))
    lines.append('')

    for host in sorted(by_host):
        lines.append('## Host `%s`' % host)
        lines.append('')
        # sub-group by category
        cats = OrderedDict()
        for key, rec in by_host[host]:
            cats.setdefault(rec.get('category', 'other'), []).append((key, rec))
        for cat in sorted(cats):
            lines.append('### %s' % cat)
            lines.append('')
            lines.append('| Endpoint | M | Mut | Src | Live | Status | Function / notes |')
            lines.append('|---|---|---|---|---|---|---|')
            for key, rec in sorted(cats[cat]):
                path = rec.get('path', '')
                method = rec.get('method', '?')
                mut = 'yes' if rec.get('mutating') else ''
                src = rec.get('source', '?')
                status = rec.get('status', rec.get('capture_status', '?'))
                live = rec.get('live_status', '')
                note = rec.get('function_title', '')
                if not note:
                    if 'skipped' in rec:
                        note = 'mutating (not probed)'
                    elif rec.get('is_json'):
                        sig = {k: v for k, v in rec.items() if k.startswith('signal_')}
                        if sig:
                            note = ', '.join('%s=%s' % (k.replace('signal_', ''), v)
                                             for k, v in sig.items())
                        st = rec.get('json_structure', {})
                        if st.get('type') == 'object' and st.get('keys'):
                            note = (note + ' top-keys: ' + ','.join(st['keys'][:8])
                                    + ('…' if len(st['keys']) > 8 else ''))
                    elif rec.get('body_head'):
                        note = rec['body_head'][:80]
                note = note.replace('|', '\\|')
                lines.append('| `%s` | %s | %s | %s | %s | %s | %s |'
                             % (path, method, mut, src, live, status, note))
            lines.append('')

    # Detailed sections: function desc + real params + response structure.
    lines.append('## Endpoint details')
    lines.append('')
    for key, rec in sorted(endpoints.items()):
        title = rec.get('function_title') or rec.get('path', '?')
        lines.append('### `%s` — %s' % (rec.get('host', '') + rec.get('path', ''), title))
        lines.append('')
        lines.append('- **Host**: `%s`' % rec.get('host', '?'))
        lines.append('- **Method**: %s' % rec.get('method', '?'))
        lines.append('- **Source**: %s' % rec.get('source', '?'))
        if rec.get('category'):
            lines.append('- **Category**: %s' % rec.get('category'))
        lines.append('- **Mutating**: %s' % rec.get('mutating', False))
        if rec.get('live_status'):
            lines.append('- **Live verdict**: `%s`' % rec['live_status'])
            if rec.get('live_http_status') is not None:
                lines.append('  - HTTP status: %s' % rec['live_http_status'])
            if rec.get('live_error'):
                lines.append('  - Error: %s' % rec['live_error'])
        if rec.get('function_desc'):
            lines.append('- **Function**: %s' % rec['function_desc'])
        # status: prefer live probe, fall back to capture
        probe_status = rec.get('status')
        cap_status = rec.get('capture_status')
        if probe_status is not None:
            lines.append('- **Probed status**: %s' % probe_status)
        if cap_status:
            lines.append('- **Captured status**: %s' % cap_status)
        # params
        q = rec.get('real_query') or rec.get('sample_params')
        p = rec.get('real_post') or rec.get('post')
        if q:
            lines.append('- **Query params** (real captured if available):')
            lines.append('  ```')
            lines.append('  ' + json.dumps(q, ensure_ascii=False, indent=2))
            lines.append('  ```')
        if p:
            lines.append('- **POST body params**:')
            lines.append('  ```')
            lines.append('  ' + json.dumps(p, ensure_ascii=False, indent=2))
            lines.append('  ```')
        # response structure
        if rec.get('is_json') and rec.get('json_structure'):
            st = rec['json_structure']
            if st.get('type') == 'object':
                lines.append('- **Response top-level keys** (%d): %s'
                             % (len(st.get('keys', [])),
                                ', '.join('`%s`' % k for k in st.get('keys', []))))
                samp = st.get('sample', {})
                if samp:
                    lines.append('- **Response sample (redacted)**:')
                    lines.append('  ```json')
                    lines.append('  ' + json.dumps(samp, ensure_ascii=False)[:700])
                    lines.append('  ```')
            elif st.get('type') == 'array':
                lines.append('- **Response type**: array (len=%s).' % st.get('len', '?'))
                if st.get('item_keys'):
                    lines.append('  - item keys: %s'
                                 % ', '.join('`%s`' % k for k in st['item_keys']))
        elif rec.get('capture_resp_head'):
            rh = rec['capture_resp_head']
            lines.append('- **Captured response sample** (%d chars):' % min(500, len(rh)))
            lines.append('  ```')
            lines.append('  ' + rh[:500])
            lines.append('  ```')
        lines.append('')

    with open(INVENTORY_MD, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print('Wrote', INVENTORY_MD)


if __name__ == '__main__':
    main()
