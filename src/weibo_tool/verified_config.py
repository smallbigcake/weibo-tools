"""Shared loader + helpers for ``config/verified_categories.json``.

This is the SINGLE SOURCE OF TRUTH for interpreting Weibo's ``verified*``
user fields:

  * ``verified_type``      -> coarse label (personal / organization / daren)
  * ``verified_type_ext``  -> fine-grained subtype (government / media / ...)
  * ``verified_level``     -> personal tier (huang_v / cheng_v / jin_v = 黄V/橙V/金V)
  * ``exclusions``         -> name lists for stripping official / state-media accounts

Both ``blacklist_deep`` and ``top_followed`` read from this one file through
the helpers below, so the mapping lives in config, not in two divergent places
in code. If the file is missing or malformed, built-in ``_DEFAULTS`` keep the
tools working (and every list stays editable in the JSON).
"""
import json
import logging
import os

# Resolve the project src/ dir (this file lives in src/weibo_tool/).
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_CATEGORY_FILE = os.path.join(_SRC_DIR, 'config', 'verified_categories.json')

_DEFAULTS = {
    'verified_type': {
        'personal': [0],
        'unverified_label': 'none',
        'unclassified_label': 'verified',
    },
    'verified_type_ext': {
        'enterprise': [50],
        'government': [51],
        'media': [52, 53],
        'other_org': [0],
        'personal_field': [1, 2],
        'daren': [-1],
        'unknown_label': 'unknown',
    },
    'verified_level': {
        'tiers': {'0': 'none', '1': 'huang_v', '2': 'cheng_v', '3': 'jin_v'},
    },
    'exclusions': {
        'weibo_official': {
            'prefix': ['微博'],
            'exact': ['粉丝红包', '超话社区', 'SVIP内容精选', '微博小秘书',
                      '微博公开度', '微博创作者广告共享计划', '微博抽奖平台'],
        },
        'state_media': {
            'keywords': ['央视', '新华', '人民', '澎湃', '环球', '共青团', '政府',
                         '军号', '战区', '新闻', '日报', '时报', '晚报', '早报',
                         '封面', '新黄河', '半月谈', '广电', '电视台', '融媒',
                         '军网', '解放军', '国防部', '时政', '新闻网', '党媒',
                         '宣传部', '网信', '观察者网', '报'],
            'exact': ['玉渊谭天', '新浪热点', '新浪财经', '新浪新闻', '央视网',
                      '人民网', '中国新闻网', '新华网', '凤凰网', '凤凰周刊',
                      '凤凰网国际', '北京青年报', '北京日报', '中国军号',
                      '中国火箭军', '东部战区', '联合国', '中国政府网', '北京时间',
                      '天涯历知幸', '新京报', '新京报我们视频', '大河报',
                      '南方周末', '南方都市报', '潇湘晨报', '都市快报', '华商报',
                      '中国青年报', '财新网', 'Vista看天下', '中国历史研究院',
                      '中国警方在线', '中国气象爱好者', '中国地震台网速报',
                      '中国军工', '中国反邪教', '中国国家地理', '中国航空工业集团',
                      '央广网', '凤凰网财经', '凤凰网科技', '财经网', '日经中文网',
                      '央广军事', '贝壳财经', '新浪军事', '新浪证券', '新浪科技',
                      '新浪娱乐', '新浪仓石基金'],
        },
    },
}


def load_verified_categories():
    """Return the merged categories dict (config file overrides built-in defaults)."""
    data = dict(_DEFAULTS)
    if not os.path.exists(_CATEGORY_FILE):
        return data
    try:
        with open(_CATEGORY_FILE, 'r', encoding='utf-8-sig') as fh:
            cfg = json.load(fh)
        for key in _DEFAULTS:
            if isinstance(cfg.get(key), dict):
                merged = dict(_DEFAULTS[key])
                merged.update(cfg[key])
                data[key] = merged
        return data
    except Exception as e:
        logging.warning('[verified_config] failed to load %s (%s); using defaults.'
                        % (_CATEGORY_FILE, e))
        return data


_CATS = load_verified_categories()


def verified_type_label(verified, vtype):
    """Map a user's (verified, verified_type) to a coarse label.

    Returns one of: 'none' (not verified), 'verified' (verified, type null),
    'personal_v' (黄V), 'org_v' (蓝V), 'daren' (达人).
    """
    cfg = _CATS['verified_type']
    if not verified:
        return cfg.get('unverified_label', 'none')
    if vtype is None:
        return cfg.get('unclassified_label', 'verified')
    if vtype in cfg.get('personal', [0]):
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
    cfg = _CATS['verified_type_ext']
    for label, vals in cfg.items():
        if label == 'unknown_label':
            continue
        if isinstance(vals, list) and ext in vals:
            return label
    return cfg.get('unknown_label', 'unknown')


def verified_level_tier(level):
    """Map verified_level to a personal tier name (huang_v/cheng_v/jin_v)."""
    tiers = _CATS['verified_level'].get('tiers', {})
    return tiers.get(str(level), 'unknown')


def exclusion_lists():
    """Return (official_prefix, official_exact, media_keywords, media_exact)."""
    ex = _CATS.get('exclusions', {})
    wo = ex.get('weibo_official', {})
    sm = ex.get('state_media', {})
    return (
        list(wo.get('prefix', [])),
        set(wo.get('exact', [])),
        list(sm.get('keywords', [])),
        set(sm.get('exact', [])),
    )


def is_organization(verified, vtype):
    """True if the account is an ORGANIZATION (blue V): verified_type > 0.

    Used by profile-visit to skip enterprise / official / government / media /
    other org accounts and visit only personal ones. The org/personal split is
    driven by the same verified_type mapping in config/verified_categories.json.
    """
    return verified_type_label(verified, vtype) == 'org_v'


def should_skip_organization():
    """Whether profile-visit should skip organization (blue-V) accounts.

    Reads config/verified_categories.json -> profile_visit.skip_organization
    (defaults to True when the key is absent).
    """
    return bool(_CATS.get('profile_visit', {}).get('skip_organization', True))
