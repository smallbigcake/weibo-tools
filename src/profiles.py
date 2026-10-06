"""Per-account profile store (mutable Weibo profile data).

The identity registry (``config/accounts.local.json``, see
``src/config/accounts.py``) holds only STABLE identity: the internal id, the
Weibo uid, the local alias and the roles.

Weibo profile data that the owner can change at any time (the display name,
bio, avatar, stats, ...) is kept here instead, one JSON file per account, named
by its (sensitive) Weibo uid. The file nests the native data under ``profile``
with two sub-objects, plus our own metadata under ``local``::

    src/data/profile/<uid>.json
    {
      "uid": "<weibo-uid>",            # top-level key (the Weibo uid)
      "profile": {                      # native fields, copied verbatim from the APIs
        "info": {                       # from /ajax/profile/info?uid=<uid>
          "screen_name": "<示例昵称>",
          "description": "...",
          "avatar_hd": "https://...",
          "verified": false,
          "verified_reason": "...",
          "followers_count": 123,
          "friends_count": 45,
          "statuses_count": 678,
          "gender": "f",
          "location": "<示例地区>"
        },
        "detail": {                     # from /ajax/profile/detail?uid=<uid> (best-effort)
          "birthday": "1999-03-28",
          "company": "<示例公司>",
          "created_at": "2010-07-16 19:24:01",
          "education": {"school": "<示例高校>"},
          "ip_location": "IP属地：上海",
          "sunshine_credit": {"level": "阳光信用极好"}
        }
      },
      "local": {                        # our own metadata
        "alias": "cake",
        "source": "weibo-api:profile/info+profile/detail",
        "fetched_at": "2026-10-04T12:00:00"
      }
    }

The display name is ``profile.info.screen_name`` (Weibo has no separate
``nickname`` field). ``src/data/`` is git-ignored, so no PII is ever committed.
The values here are a CACHE, not identity: refresh them from the Weibo API via
``refresh()`` as needed, and ``local.source`` / ``local.fetched_at`` record where
the current values came from. ``refresh()`` pulls native fields from
``/ajax/profile/info`` and (best-effort) ``/ajax/profile/detail``.
"""

import json
import logging
import os
from datetime import datetime, timezone

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
PROFILE_DIR = os.path.join(SRC_DIR, 'data', 'profile')


def profile_path(uid):
    """Absolute path of the profile JSON for a Weibo uid."""
    return os.path.join(PROFILE_DIR, '%s.json' % (uid or 'unknown'))


def _ensure_dir():
    os.makedirs(PROFILE_DIR, exist_ok=True)


def load(uid):
    """Return the profile dict for ``uid``, or None when absent/unreadable."""
    try:
        with open(profile_path(uid), encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def save(uid, data):
    """Merge ``data`` into the stored profile for ``uid`` and persist it.

    ``data`` carries nested sub-objects: ``profile`` (native fields copied
    verbatim from the Weibo APIs -- ``profile.info`` from /ajax/profile/info and
    ``profile.detail`` from /ajax/profile/detail) and ``local`` (our own
    metadata: alias, source, fetched_at). When ``profile`` is present, legacy
    flat top-level native fields and the old ``weibo`` sub-object (including
    ``nickname``) are dropped so the file migrates cleanly.

    Always stamps ``uid`` itself; returns the merged dict.
    """
    _ensure_dir()
    merged = load(uid) or {}
    if 'profile' in data:
        # Migrate away from the old flat / weibo schema: drop legacy top-level
        # native fields and the obsolete ``weibo`` sub-object.
        for key in _LEGACY_TOP_KEYS:
            merged.pop(key, None)
    if 'local' in data:
        # Drop our own fields that used to live at the top level; they now live
        # in the ``local`` sub-object.
        for key in _LOCAL_KEYS:
            merged.pop(key, None)
    for sub in ('profile', 'local'):
        if sub in data:
            merged[sub] = {**(merged.get(sub) or {}), **data[sub]}
    merged['uid'] = uid
    with open(profile_path(uid), 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
        f.write('\n')
    return merged


def nickname(uid):
    """Current display name for ``uid`` (Weibo ``screen_name``), or None."""
    prof = load(uid)
    if not prof:
        return None
    info = (prof.get('profile') or {}).get('info') or {}
    if info.get('screen_name'):
        return info['screen_name']
    # backward-compat: old weibo sub-object / flat schema
    return (prof.get('weibo') or {}).get('screen_name') or prof.get('nickname')


def nickname_for_role(role):
    """Nickname of the preferred account carrying ``role``, or None."""
    from config.accounts import by_role
    acc = by_role(role)
    return nickname(acc['uid']) if acc else None


def all_profiles():
    """Return {uid: profile dict} for every stored profile."""
    out = {}
    if not os.path.isdir(PROFILE_DIR):
        return out
    for name in sorted(os.listdir(PROFILE_DIR)):
        if not name.endswith('.json'):
            continue
        uid = name[:-len('.json')]
        prof = load(uid)
        if prof:
            out[uid] = prof
    return out


def _now_iso():
    """Current UTC timestamp as a compact ISO-8601 string."""
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')


PROFILE_INFO_API = 'https://weibo.com/ajax/profile/info?uid=%s&scene=profile'
PROFILE_DETAIL_API = 'https://weibo.com/ajax/profile/detail?uid=%s'

# Fields copied verbatim from profile/info's `data.user` into the cache.
_PROFILE_FIELDS = (
    'screen_name', 'description', 'avatar_hd', 'verified', 'verified_reason',
    'followers_count', 'friends_count', 'statuses_count', 'gender', 'location',
)
# Legacy top-level keys from the old flat / weibo schema, dropped on migration
# when a ``profile`` sub-object is written.
_LEGACY_TOP_KEYS = set(_PROFILE_FIELDS) | {'nickname', 'weibo'}
# Top-level "our own" field names from the old flat schema, dropped on migration
# (they move into the ``local`` sub-object).
_LOCAL_KEYS = {'alias', 'source', 'fetched_at'}


def refresh(uid, session=None, alias=None):
    """Fetch fresh profile data for ``uid`` from Weibo's profile/info and
    profile/detail APIs and merge it into the stored profile JSON.

    ``session`` is an authenticated ``requests.Session``. When omitted, a session
    is built from the account's own alias in the registry (reusing its saved
    cookie, so no QR scan is needed for already-logged-in accounts).

    ``profile/info`` is required; ``profile/detail`` is best-effort (skipped if it
    fails, so one flaky endpoint never blocks the other). Returns the merged
    profile dict, or None when even profile/info failed.
    """
    from config.accounts import by_uid
    if session is None:
        acc = by_uid(uid) or {}
        alias = alias or acc.get('alias')
        if not alias:
            logging.warning('refresh(%s): no alias and no session; cannot authenticate.', uid)
            return None
        from auth import Auth
        a = Auth(user=alias)
        a.resolve_uid(args_user=alias)
        if not a.ensure_session():
            logging.warning('refresh(%s): could not establish a session.', uid)
            return None
        session = a.session

    headers = {
        'Referer': 'https://weibo.com/',
        'x-requested-with': 'XMLHttpRequest',
    }

    # --- profile/info (required) ---
    try:
        resp = session.get(PROFILE_INFO_API % uid, headers=headers, timeout=20)
        obj = resp.json()
    except Exception as e:
        logging.warning('refresh(%s): profile/info request failed: %s', uid, e)
        return None
    user = (obj.get('data') or {}).get('user') or None
    if not user:
        logging.warning('refresh(%s): profile/info returned no data.user (ok=%s).',
                        uid, obj.get('ok'))
        return None
    info = {key: user[key] for key in _PROFILE_FIELDS if key in user}

    # --- profile/detail (best-effort) ---
    detail = None
    try:
        resp = session.get(PROFILE_DETAIL_API % uid, headers=headers, timeout=20)
        obj = resp.json()
        if obj.get('ok') == 1 and obj.get('data'):
            detail = obj['data']
        else:
            logging.warning('refresh(%s): profile/detail returned no data (ok=%s).',
                            uid, obj.get('ok'))
    except Exception as e:
        logging.warning('refresh(%s): profile/detail request failed: %s', uid, e)

    data = {
        'profile': {'info': info},
        'local': {
            'alias': alias or (by_uid(uid) or {}).get('alias'),
            'source': 'weibo-api:profile/info+profile/detail',
            'fetched_at': _now_iso(),
        },
    }
    if detail is not None:
        data['profile']['detail'] = detail
    return save(uid, data)
