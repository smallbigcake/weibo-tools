"""Top-level CLI for weibo_tool.

Global identity options (--uid / --user / --no-prompt) are parsed first, then
delegated to the selected subcommand. Each subcommand receives an `Auth`
instance already resolved to the chosen identity.
"""
import argparse
import os
import sys

# Ensure sibling modules in src/ (auth.py) are importable regardless of CWD.
_SRC_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _SRC_DIR not in sys.path:
    sys.path.insert(0, _SRC_DIR)

from auth import Auth
from logutil import setup as _setup_logging
from weibo_tool import commands  # noqa: F401  (import side-effect registers subcommands)

_setup_logging()


def _identity_parent():
    """Shared parser carrying the identity flags so they work BEFORE or AFTER
    the subcommand name (e.g. both `weibo_tool --uid X blacklist` and
    `weibo_tool blacklist --uid X`)."""
    p = argparse.ArgumentParser(add_help=False)
    p.add_argument('--uid', default=None,
                   help='Numeric Weibo UID. Reuses a saved session if present. '
                        'Mutually exclusive in use with --user (only one needed).')
    p.add_argument('--user', default=None,
                   help='Human-friendly login label; resolves to a saved UID session.')
    p.add_argument('--no-prompt', action='store_true',
                   help='Do not prompt; use the only/existing identity or "default".')
    return p


def build_parser():
    identity = _identity_parent()
    parser = argparse.ArgumentParser(
        prog='weibo_tool',
        parents=[identity],
        description='Unified Weibo toolbox (multi-user).')
    subparsers = parser.add_subparsers(dest='command', metavar='<command>')
    commands.register_subcommands(subparsers, parents=[identity])
    return parser


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)

    if not getattr(args, 'command', None):
        parser.print_help()
        return 1

    auth = Auth()
    if not auth.resolve_uid(args.uid, args_user=args.user, prompt=not args.no_prompt):
        # --uid given but no saved session: the subcommand cannot proceed.
        return 1

    args.run(args, auth)
    return 0


if __name__ == '__main__':
    sys.exit(main())
