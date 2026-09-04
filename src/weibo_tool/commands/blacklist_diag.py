"""`blacklist-diag` subcommand: diagnose unreachable blacklist profiles.

Two modes:

1. Classify cached errors (default):
   Scan the profile cache and tally every failed profile by its error kind
   (`banned` / `account_issue` / `rate_limited` / `fetch_failed`) and the
   verbatim API `message` / ban reason. This is how we learned the 836
   "rate_limited" markers were actually banned/deleted accounts.

2. Retry + dump raw bodies (`--retry-uid`):
   Re-request specific uids a few times with the VIEWER session and print the
   full HTTP status, response headers and JSON body for each attempt — useful
   when a small set of profiles fail for an unknown reason and you want to see
   exactly what Weibo returns.

Outputs go under data/blacklist_deep/ (next to the main analysis artifacts).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from logutil import setup as _setup_logging
_setup_logging()
import time
import random
from collections import Counter

# This module lives in src/weibo_tool/commands/; resolve up to src/.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from weibo_tool.commands.blacklist_deep import PROFILE_DIR, DATA_DIR, _ensure_dirs  # noqa: E402

PROFILE_API = 'https://weibo.com/ajax/profile/info?uid=%s'


def classify_errors():
    """Tally cached profile errors by kind and verbatim reason."""
    kinds = Counter()
    reasons = Counter()
    n_total = 0
    n_ok = 0
    for fn in sorted(os.listdir(PROFILE_DIR)):
        if not fn.endswith('.json'):
            continue
        n_total += 1
        try:
            with open(os.path.join(PROFILE_DIR, fn), 'r', encoding='utf-8') as fh:
                d = json.load(fh)
        except Exception:
            kinds['unreadable_cache'] += 1
            continue
        err = d.get('error')
        if not err:
            n_ok += 1
            continue
        kinds[err] += 1
        reasons[d.get('ban_reason') or '(no reason)'] += 1
    return {'total': n_total, 'ok': n_ok, 'kinds': dict(kinds.most_common()),
            'reasons': dict(reasons.most_common())}


def retry_uids(vauth, uids, retries=4):
    """Re-request each uid `retries` times, returning a structured dump."""
    out = []
    for uid in uids:
        attempts = []
        for attempt in range(1, retries + 1):
            url = PROFILE_API % uid
            try:
                resp = vauth.session.get(
                    url,
                    headers={
                        'User-Agent': vauth.session.headers.get('User-Agent', ''),
                        'Accept': 'application/json, text/plain, */*',
                        'Referer': 'https://weibo.com/',
                        'x-requested-with': 'XMLHttpRequest',
                    },
                    timeout=20, allow_redirects=False)
                status = resp.status_code
                hdrs = {k: v for k, v in resp.headers.items()
                        if k.lower() in ('content-type', 'location', 'x-requested-with')}
                try:
                    body = resp.json()
                except Exception:
                    body = {'_raw_text': resp.text[:800]}
                attempts.append({'attempt': attempt, 'status': status,
                                 'headers': hdrs, 'body': body})
            except Exception as e:
                attempts.append({'attempt': attempt, 'exception': str(e)})
            time.sleep(2.0 + random.random() * 2.0)
        out.append({'uid': uid, 'attempts': attempts})
    return out


def register(subparsers, parents=None):
    p = subparsers.add_parser('blacklist-diag', parents=parents or [],
                              help='Diagnose unreachable blacklist profiles '
                                   '(classify cached errors or dump raw API bodies).')
    p.add_argument('--retry-uid', nargs='+', default=None,
                   help='One or more uids to re-request and dump raw responses for.')
    p.add_argument('--retries', type=int, default=4,
                   help='How many times to retry each --retry-uid (default 4).')
    p.add_argument('--viewer-uid', default=None,
                   help='Viewer account uid used to read profiles (se, by default).')
    p.add_argument('--viewer-user', default=None,
                   help='Viewer account label (alternative to --viewer-uid).')
    p.add_argument('--json', default=None,
                   help='Where to write the retry dump (default '
                        'data/blacklist_deep/diag_retry.json).')
    p.set_defaults(run=run)


def run(args, auth):
    from auth import Auth

    _ensure_dirs()

    # Mode 2: retry + dump raw bodies.
    if args.retry_uid:
        viewer = Auth()
        if not viewer.resolve_uid(args.viewer_uid, args_user=args.viewer_user,
                                  prompt=not args.no_prompt):
            return
        viewer.load()
        if not viewer.test_login():
            print('Viewer account not logged in.')
            return
        dump = retry_uids(viewer, args.retry_uid, retries=args.retries)
        out_path = args.json or os.path.join(DATA_DIR, 'diag_retry.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(dump, f, ensure_ascii=False, indent=2)
        print('[blacklist-diag] retry dump written to %s' % out_path)
        for item in dump:
            print('\nUID %s' % item['uid'])
            for a in item['attempts']:
                if 'exception' in a:
                    print('  attempt %d EXCEPTION %s' % (a['attempt'], a['exception']))
                else:
                    print('  attempt %d status=%s' % (a['attempt'], a['status']))
                    print('    body: %s' % json.dumps(a['body'], ensure_ascii=False)[:800])
        return

    # Mode 1 (default): classify cached errors.
    result = classify_errors()
    print('[blacklist-diag] profile cache: total=%d ok=%d' %
          (result['total'], result['ok']))
    print('\n-- Error kinds --')
    for k, v in result['kinds'].items():
        print('  %-16s %d' % (k, v))
    print('\n-- Verbatim reasons --')
    for k, v in result['reasons'].items():
        print('  %5d  %s' % (v, k))
    out_path = os.path.join(DATA_DIR, 'diag_errors.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print('\n[blacklist-diag] written to %s' % out_path)
