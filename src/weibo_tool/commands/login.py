"""`login` subcommand: log in / silently renew a Weibo account session."""
import argparse
import logging
import os
import sys
from datetime import datetime

# Ensure sibling modules in src/ (auth.py) are importable regardless of CWD.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)


def clear_cookies(uid):
    from auth import user_cookie_path
    cookie_path = user_cookie_path(uid)
    if os.path.exists(cookie_path):
        os.remove(cookie_path)
        logging.info('Cleared cookies for "%s": %s' % (uid, cookie_path))
    else:
        logging.info('No cookie file to clear.')


def register(subparsers, parents=None):
    p = subparsers.add_parser('login', parents=parents or [],
                              help='Log in or silently renew a Weibo account.')
    p.add_argument('--fresh', action='store_true',
                   help='Clear cookies and force a full QR login from scratch.')
    p.add_argument('--rounds', type=int, default=5,
                   help='Max QR refresh rounds (default 5).')
    p.set_defaults(run=run)


def run(args, auth):
    from auth import Auth

    if args.fresh:
        clear_cookies(auth.uid or auth.label)

    auth.load()
    identity = auth.uid or auth.label
    if auth.test_login():
        logging.info('Already logged in as "%s" — nothing to do.' % identity)
        return

    if not args.fresh and auth.renew():
        logging.info('Session renewed silently (no QR needed) for "%s".' % identity)
        return

    logging.info('Starting full QR login for "%s". A window will open — scan the '
                 'QR code with the Weibo app, then confirm.' % identity)
    auth.login(max_rounds=args.rounds)
    logging.info('Login complete for "%s".' % identity)
