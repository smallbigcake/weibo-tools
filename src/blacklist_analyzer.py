"""Blacklist (shielded users) query & analysis.

Uses the existing login module (`auth.Auth`) to authenticate, then pulls the
current user's blacklist via the `setting/getFilteredUsers` AJAX endpoint and
produces a statistical summary:

  - total number of shielded users,
  - the shield *type* of each user (Weibo / interaction / follow visibility),
  - aggregate features: distribution of shield-type combinations, how many
    users share each individual dimension, etc.

The shield type is decoded from the `scheme` deep-link on each card
(`sinaweibo://shieldoption?type=1&status=1&interact=1&follow=1&uid=...`):
  - `status`  -> shield the user's weibo (微博)
  - `interact`-> shield interactions (comments/likes/mentions) (互动)
  - `follow`  -> hide my following list / activity from them (关注)

Outputs:
  - a human-readable report to stdout,
  - an optional JSON dump (pass --json out.json) for downstream use.

Usage (from project root):
    python src/blacklist_analyzer.py
    python src/blacklist_analyzer.py --json blacklist.json
"""
import argparse
import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from auth import Auth, USER_AGENT

ENDPOINT = 'https://weibo.com/ajax/setting/getFilteredUsers'

# Human label for each shield dimension decoded from the scheme query string.
DIM_LABELS = {
    'status': '微博 (hide their weibo)',
    'interact': '互动 (block interactions)',
    'follow': '关注 (hide my follows from them)',
}

# `count` is the recognized page-size param for getFilteredUsers (params like
# `page_size`/`size`/`limit` are ignored and fall back to the 20 default).
# 200 is the largest value tested; it returns the entire list in a single page
# for accounts with <=200 shielded users, minimizing request count.
MAX_PAGE_SIZE = 200


def _default_headers():
    return {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://weibo.com/',
        'x-requested-with': 'XMLHttpRequest',
    }


def _decode_scheme(scheme):
    """Parse a `sinaweibo://shieldoption?...&uid=...` deep link.

    Returns (uid, {dim: bool}) for the three shield dimensions.
    """
    dims = {'status': False, 'interact': False, 'follow': False}
    uid = ''
    if not scheme:
        return uid, dims
    qs = scheme.split('?', 1)[1] if '?' in scheme else scheme
    for pair in qs.split('&'):
        if '=' not in pair:
            continue
        k, v = pair.split('=', 1)
        if k == 'uid':
            uid = v
        elif k in dims:
            dims[k] = (v == '1')
    return uid, dims


def fetch_all(auth):
    """Page through getFilteredUsers and return (total, [user dicts]).

    Uses the maximum explored page size (MAX_PAGE_SIZE) to fetch everything in
    as few requests as possible. Pagination is kept as a safety fallback for
    accounts with more than MAX_PAGE_SIZE shielded users.
    """
    headers = _default_headers()
    users = []
    page = 1
    seen_total = None
    requests_made = 0
    while True:
        resp = auth.session.get(
            ENDPOINT,
            params={'page': page, 'count': MAX_PAGE_SIZE},
            headers=headers, timeout=20, allow_redirects=False)
        requests_made += 1
        try:
            obj = resp.json()
        except Exception:
            print('Failed to parse response on page %d: %s' % (page, resp.status_code))
            break
        if obj.get('ok') != 1 and 'card_group' not in obj:
            print('Unexpected response on page %d: %s' % (page, obj.get('message', resp.status_code)))
            break
        if seen_total is None:
            seen_total = obj.get('total')
        cards = obj.get('card_group') or []
        if not cards:
            break
        for card in cards:
            uid, dims = _decode_scheme(card.get('scheme', ''))
            users.append({
                'uid': uid,
                'name': card.get('title_sub', ''),
                'desc': card.get('desc1', ''),
                'pic': card.get('pic', ''),
                'dims': dims,
                'combo': _combo_label(dims),
            })
        next_cursor = obj.get('next_cursor', 0)
        # Stop when the server says no more pages.
        if not next_cursor or len(users) >= (seen_total or 0):
            break
        page += 1
        if page > 50:  # safety cap
            break
    print('[fetch_all] %d request(s) made (count=%d).' % (requests_made, MAX_PAGE_SIZE))
    return seen_total, users


def _combo_label(dims):
    parts = [k for k, v in dims.items() if v]
    if not parts:
        return 'none'
    return '+'.join(parts)


def analyze(total, users):
    """Build the statistical summary."""
    n = len(users)
    combo_counter = Counter(u['combo'] for u in users)
    dim_counter = Counter()
    for u in users:
        for k, v in u['dims'].items():
            if v:
                dim_counter[k] += 1

    summary = {
        'reported_total': total,
        'fetched_count': n,
        'shield_type_combos': dict(combo_counter.most_common()),
        'dimension_counts': {
            'status': dim_counter.get('status', 0),
            'interact': dim_counter.get('interact', 0),
            'follow': dim_counter.get('follow', 0),
        },
    }
    return summary


def print_report(summary, users):
    total = summary['reported_total']
    n = summary['fetched_count']
    print('=' * 60)
    print('Weibo Blacklist Analysis')
    print('=' * 60)
    print('Reported total (server): %s' % total)
    print('Fetched (this run):      %s' % n)

    print('\n-- Shield type combinations --')
    for combo, cnt in summary['shield_type_combos'].items():
        label = ' + '.join(DIM_LABELS.get(d, d) for d in combo.split('+')) if combo != 'none' else '(none)'
        print('  %-4d  %s' % (cnt, label))

    print('\n-- Per-dimension coverage --')
    for dim, label in DIM_LABELS.items():
        c = summary['dimension_counts'].get(dim, 0)
        pct = (100.0 * c / n) if n else 0
        print('  %-38s %3d  (%.1f%%)' % (label, c, pct))

    # Overall feature inference
    print('\n-- Overall features --')
    dc = summary['dimension_counts']
    full = dc['status'] and dc['interact'] and dc['follow']
    if n:
        if full and dc['status'] == n and dc['interact'] == n and dc['follow'] == n:
            print('  All %d shielded users are fully blocked on every dimension.' % n)
        else:
            print('  The blacklist is mixed: not every user is blocked on all dimensions.')
        most_common_dim = max(DIM_LABELS, key=lambda d: dc[d])
        print('  Most common single dimension: %s (%d users).'
              % (DIM_LABELS[most_common_dim], dc[most_common_dim]))

    print('\n-- User list (%d) --' % n)
    for i, u in enumerate(users, 1):
        dims = ', '.join(DIM_LABELS.get(d, d) for d in u['combo'].split('+')) if u['combo'] != 'none' else '(none)'
        print('  %2d. %-20s uid=%s [%s]' % (i, (u['name'] or '?')[:20], u['uid'], dims))


def main():
    ap = argparse.ArgumentParser(description='Analyze a Weibo user\'s blacklist (multi-user).')
    ap.add_argument('--uid', default=None,
                    help='Numeric Weibo UID whose saved session to reuse. '
                         'Mutually exclusive in use with --user (only one needed).')
    ap.add_argument('--user', default=None,
                    help='Human-friendly login label; resolves to a saved UID session.')
    ap.add_argument('--no-prompt', action='store_true',
                    help='Do not prompt; use the only/existing identity or "default".')
    ap.add_argument('--json', default=None, help='Optional path to dump the summary + user list as JSON.')
    args = ap.parse_args()

    auth = Auth()
    if not auth.resolve_uid(args.uid, args_user=args.user, prompt=not args.no_prompt):
        return
    auth.load()
    if not auth.test_login():
        print('Not logged in. Run src/test/run_login.py --user <label> first (QR scan).')
        return

    total, users = fetch_all(auth)
    summary = analyze(total, users)
    print_report(summary, users)

    if args.json:
        out = {'summary': summary, 'users': users}
        with open(args.json, 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, indent=2)
        print('\nJSON written to %s' % args.json)


if __name__ == '__main__':
    main()
