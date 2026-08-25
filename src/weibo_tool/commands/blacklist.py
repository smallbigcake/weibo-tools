"""`blacklist` subcommand: analyze the active account's shielded-user list.

Reuses the analysis logic from src/blacklist_analyzer.py so there is a single
source of truth for the blacklist query/summary.
"""
import argparse
import os
import sys

# Ensure sibling modules in src/ (blacklist_analyzer.py) are importable.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from logutil import setup as _setup_logging
_setup_logging()


def register(subparsers, parents=None):
    p = subparsers.add_parser('blacklist', parents=parents or [],
                              help='Analyze the active account\'s blacklist.')
    p.add_argument('--json', default=None,
                   help='Optional path to dump the summary + user list as JSON.')
    p.set_defaults(run=run)


def run(args, auth):
    from blacklist_analyzer import fetch_all, analyze, print_report

    auth.load()
    if not auth.test_login():
        print('Not logged in. Run `python weibo-tool.py login --user <label>` first (QR scan).')
        return

    total, users = fetch_all(auth)
    summary = analyze(total, users)
    print_report(summary, users)

    if args.json:
        import json
        out = {'summary': summary, 'users': users}
        with open(args.json, 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, indent=2)
        print('\nJSON written to %s' % args.json)
