"""End-to-end login / renewal test runner.

Usage (from project root):
    python test/run_login.py             # silent renew (default)
    python test/run_login.py --fresh     # clear cookies + full QR login
    python test/run_login.py --fresh --rounds 3   # custom max QR rounds

Logs are written to test/log/<timestamp>_<mode>.log.
"""
import argparse
import os
import shutil
import sys
from datetime import datetime

# Ensure src/ (parent of this test dir) is importable.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Configure logging to also write to test/log/.
import logging
Timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

def setup_file_log(mode: str):
    log_dir = os.path.join(os.path.dirname(__file__), 'log')
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, f'{Timestamp}_{mode}.log')
    fh = logging.FileHandler(log_path, encoding='utf-8')
    fh.setLevel(logging.DEBUG)
    fh.setFormatter(logging.Formatter(
        '[%(asctime)s.%(msecs)03d][%(levelname)s](%(filename)s#%(lineno)d): %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    ))
    logging.getLogger().addHandler(fh)
    logging.info(f'Test log: {log_path}')
    return log_path


def clear_cookies(uid):
    # Cookie path is resolved inside auth.py per UID (src/cookies.<uid>.weibo).
    from auth import user_cookie_path
    cookie_path = user_cookie_path(uid)
    if os.path.exists(cookie_path):
        os.remove(cookie_path)
        logging.info(f'Cleared cookies for "{uid}": {cookie_path}')
    else:
        logging.info('No cookie file to clear.')


def main():
    ap = argparse.ArgumentParser(description='Weibo login test runner')
    ap.add_argument('--uid', default=None,
                    help='Numeric Weibo UID. Reuses a saved session if present.')
    ap.add_argument('--user', default=None,
                    help='Human-friendly login label used when logging in fresh.')
    ap.add_argument('--no-prompt', action='store_true',
                    help='Do not prompt; use existing/default identity.')
    ap.add_argument('--fresh', action='store_true',
                    help='Clear cookies and force a full QR login from scratch.')
    ap.add_argument('--rounds', type=int, default=5,
                    help='Max QR refresh rounds (default 5).')
    args = ap.parse_args()

    mode = 'fresh' if args.fresh else 'renew'
    log_path = setup_file_log(mode)

    from auth import Auth

    auth = Auth()
    if not auth.resolve_uid(args.uid, args_user=args.user, prompt=not args.no_prompt):
        return
    if args.fresh:
        clear_cookies(auth.uid or auth.label)

    auth.load()
    if auth.test_login():
        logging.info('Already logged in as "%s" — nothing to do.' % (auth.uid or auth.label))
        return

    if not args.fresh and auth.renew():
        logging.info('Session renewed silently (no QR needed).')
        return

    # Full QR login.
    logging.info('Starting full QR login for "%s". A window will open — scan the '
                 'QR code with the Weibo app, then confirm.' % (auth.uid or auth.label))
    auth.login(max_rounds=args.rounds)
    logging.info('Login test finished successfully.')


if __name__ == '__main__':
    main()
