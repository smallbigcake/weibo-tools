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


def clear_cookies():
    # COOKIE_PATH is resolved inside auth.py relative to its own file (src/cookies.weibo).
    cookie_path = os.path.join(os.path.dirname(__file__), '..', 'cookies.weibo')
    if os.path.exists(cookie_path):
        os.remove(cookie_path)
        logging.info(f'Cleared cookies: {cookie_path}')
    else:
        logging.info('No cookie file to clear.')


def main():
    ap = argparse.ArgumentParser(description='Weibo login test runner')
    ap.add_argument('--fresh', action='store_true',
                    help='Clear cookies and force a full QR login from scratch.')
    ap.add_argument('--rounds', type=int, default=5,
                    help='Max QR refresh rounds (default 5).')
    args = ap.parse_args()

    mode = 'fresh' if args.fresh else 'renew'
    log_path = setup_file_log(mode)

    from auth import Auth

    auth = Auth()
    if args.fresh:
        clear_cookies()

    auth.load()
    if auth.test_login():
        logging.info('Already logged in — nothing to do.')
        return

    if not args.fresh and auth.renew():
        logging.info('Session renewed silently (no QR needed).')
        return

    # Full QR login.
    logging.info('Starting full QR login. A window will open — scan the QR code '
                 'with the Weibo app, then confirm.')
    auth.login(max_rounds=args.rounds)
    logging.info('Login test finished successfully.')


if __name__ == '__main__':
    main()
