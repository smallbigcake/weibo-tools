"""Project account registry.

All sensitive identity fields (uid, alias) live ONLY in the git-ignored
``config/accounts.local.json`` file. No such literal appears in this module or
anywhere in source -- resolve identities through the helpers below so they never
have to be hard-coded.

Mutable profile data (notably ``nickname``) is deliberately NOT stored here:
each account has a per-uid profile at ``src/data/profile/<uid>.json``, see
``src/profiles.py``.

This registry is also the single source of truth for alias -> uid, so the old
``src/cookies.labels.json`` side-file is retired; a successful login writes the
discovered UID back here (``set_uid_for_alias``).

Schema of ``config/accounts.local.json``::

    {
      "accounts": [
        {
          "id": "<uuid>",          # project-internal id (a UUID), unrelated to the Weibo uid
          "uid": "<weibo-uid>",     # Weibo numeric uid (sensitive); "" before the first login
          "alias": "<alias>",       # local human alias / --user label (sensitive)
          "roles": ["author"],     # one or more of: author, viewer
          "primary": true          # optional: preferred account for a shared role
        }
      ]
    }

A single account may carry multiple roles. When several accounts share a role,
``by_role`` returns the one flagged ``primary``, else the first listed (that has
a uid).
"""

import json
import os

# config/ lives at the project root (three levels above this file:
# accounts.py -> config/ -> src/ -> project root).
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONFIG_PATH = os.path.join(PROJECT_ROOT, 'config', 'accounts.local.json')

ROLE_AUTHOR = 'author'
ROLE_VIEWER = 'viewer'


def _raw_accounts():
    try:
        with open(CONFIG_PATH, encoding='utf-8') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    return data.get('accounts') or []


def load_accounts():
    """Return the full list of account dicts (sensitive fields intact)."""
    return _raw_accounts()


def by_id(account_id):
    for acc in _raw_accounts():
        if acc.get('id') == account_id:
            return acc
    return None


def by_uid(uid):
    for acc in _raw_accounts():
        if acc.get('uid') == uid:
            return acc
    return None


def by_alias(alias):
    for acc in _raw_accounts():
        if acc.get('alias') == alias:
            return acc
    return None


def set_uid_for_alias(alias, uid):
    """Persist a login-discovered UID for ``alias`` into the registry.

    Returns True when the config was actually changed, False when the alias is
    unknown or already carries that UID. Called by ``Auth.save_cookies`` so a
    later ``--user <alias>`` reuses the saved session instead of forcing a new
    QR scan.
    """
    if not alias or not uid:
        return False
    try:
        with open(CONFIG_PATH, encoding='utf-8') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return False
    for acc in data.get('accounts') or []:
        if acc.get('alias') == alias:
            if acc.get('uid') == uid:
                return False
            acc['uid'] = uid
            with open(CONFIG_PATH, 'w', encoding='utf-8', newline='\n') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write('\n')
            return True
    return False


def by_role(role, primary_first=True):
    """Return the preferred account dict for ``role`` (uid-bearing), or None."""
    matches = [a for a in _raw_accounts()
               if role in (a.get('roles') or []) and a.get('uid')]
    if not matches:
        return None
    if primary_first:
        for a in matches:
            if a.get('primary'):
                return a
    return matches[0]


def uid(role):
    acc = by_role(role)
    return acc.get('uid') if acc else None


def alias(role):
    acc = by_role(role)
    return acc.get('alias') if acc else None


def account_id(role):
    acc = by_role(role)
    return acc.get('id') if acc else None


# Backwards-compatible module-level constants for scripts that need a single
# author / viewer identity. Resolved once at import time.
_AUTHOR = by_role(ROLE_AUTHOR)
_VIEWER = by_role(ROLE_VIEWER)
AUTHOR_UID = _AUTHOR.get('uid') if _AUTHOR else None
VIEWER_UID = _VIEWER.get('uid') if _VIEWER else None
AUTHOR_LABEL = _AUTHOR.get('alias') if _AUTHOR else ROLE_AUTHOR
VIEWER_LABEL = _VIEWER.get('alias') if _VIEWER else ROLE_VIEWER
# `nickname` is deliberately NOT exposed here: it is mutable profile data and
# lives per uid in src/data/profile/<uid>.json -- see src/profiles.py.
