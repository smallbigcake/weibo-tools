"""Loader + helpers for ``src/config/verified_categories.json``.

That JSON file is the SINGLE SOURCE OF TRUTH for interpreting Weibo's
``verified*`` user fields:

  * ``verified_type``      -> coarse label (personal / organization / daren)
  * ``verified_type_ext``  -> fine-grained subtype (government / media / ...)
  * ``verified_level``     -> personal tier (huang_v / cheng_v / jin_v = 黄V/橙V/金V)
  * ``exclusions``         -> name lists for stripping official / state-media accounts
  * ``profile_visit``      -> whether profile-visit skips organization accounts

``blacklist_deep``, ``top_followed``, ``profile_visit`` and ``stranger_visit``
all read from it through the helpers below, so every mapping lives in config
and NOT in Python. If the file is missing or malformed the module logs loudly
and falls back to the per-call defaults below (so the tools keep running, but
every classification degrades to ``unknown``/empty lists) — fix or restore the
file rather than re-adding tables to this module.
"""
import json
import logging
import os

# Resolve the project src/ dir (this file lives in src/weibo_tool/).
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_CATEGORY_FILE = os.path.join(_SRC_DIR, 'config', 'verified_categories.json')


def load_verified_categories():
    """Return the categories dict, taken verbatim from the config file.

    EVERY top-level key of the file is honoured — the loader does not whitelist
    a fixed set of names, so adding a new section (e.g. `profile_visit`) needs
    no change here. Returns {} when the file is missing/unreadable.
    """
    if not os.path.exists(_CATEGORY_FILE):
        logging.error('[verified_config] %s is missing; verified-type '
                      'classification will fall back to defaults.' % _CATEGORY_FILE)
        return {}
    try:
        with open(_CATEGORY_FILE, 'r', encoding='utf-8-sig') as fh:
            cfg = json.load(fh)
    except Exception as e:
        logging.error('[verified_config] failed to load %s (%s); classification '
                      'will fall back to defaults.' % (_CATEGORY_FILE, e))
        return {}
    if not isinstance(cfg, dict):
        logging.error('[verified_config] %s does not contain a JSON object; '
                      'classification will fall back to defaults.' % _CATEGORY_FILE)
        return {}
    return cfg


_CATS = load_verified_categories()


def _section(name):
    """Return one top-level config section as a dict (never None)."""
    sec = _CATS.get(name)
    return sec if isinstance(sec, dict) else {}


def verified_type_label(verified, vtype):
    """Map a user's (verified, verified_type) to a coarse label.

    Returns one of: 'none' (not verified), 'verified' (verified, type null),
    'personal_v' (黄V), 'org_v' (蓝V), 'daren' (达人).
    """
    cfg = _section('verified_type')
    if not verified:
        return cfg.get('unverified_label', 'none')
    if vtype is None:
        return cfg.get('unclassified_label', 'verified')
    if vtype in (cfg.get('personal') or [0]):
        return 'personal_v'
    if isinstance(vtype, (int, float)):
        if vtype > 0:
            return 'org_v'
        if vtype < 0:
            return 'daren'
    return cfg.get('unclassified_label', 'verified')


def verified_ext_subtype(ext):
    """Map verified_type_ext to a subtype label (or unknown_label if not listed).

    NOTE: ext meaning differs by verified_type context (org vs personal); this is
    primarily meaningful for org (verified_type > 0) accounts. See the config note.
    """
    cfg = _section('verified_type_ext')
    for label, vals in cfg.items():
        if label == 'unknown_label':
            continue
        if isinstance(vals, list) and ext in vals:
            return label
    return cfg.get('unknown_label', 'unknown')


def verified_level_tier(level):
    """Map verified_level to a personal tier name (huang_v/cheng_v/jin_v)."""
    tiers = _section('verified_level').get('tiers') or {}
    return tiers.get(str(level), 'unknown')


def exclusion_lists():
    """Return (official_prefix, official_exact, media_keywords, media_exact)."""
    ex = _section('exclusions')
    wo = ex.get('weibo_official') or {}
    sm = ex.get('state_media') or {}
    return (
        list(wo.get('prefix') or []),
        set(wo.get('exact') or []),
        list(sm.get('keywords') or []),
        set(sm.get('exact') or []),
    )


def is_organization(verified, vtype):
    """True if the account is an ORGANIZATION (blue V): verified_type > 0.

    Used by profile-visit / stranger-visit to skip enterprise / official /
    government / media / other org accounts and visit only personal ones. The
    org/personal split is driven by the same verified_type mapping in
    src/config/verified_categories.json.
    """
    return verified_type_label(verified, vtype) == 'org_v'


def should_skip_organization():
    """Whether profile-visit should skip organization (blue-V) accounts.

    Reads src/config/verified_categories.json -> profile_visit.skip_organization
    (defaults to True when the key is absent).
    """
    return bool(_section('profile_visit').get('skip_organization', True))
