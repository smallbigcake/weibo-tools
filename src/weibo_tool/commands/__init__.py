"""Subcommand registry for the weibo_tool CLI.

To add a new subcommand:
  1. Create `weibo_tool/commands/<name>.py` exposing:
       def register(subparsers, parents=None):
           p = subparsers.add_parser('<name>', parents=parents or [], help='...')
           p.set_defaults(run=run)
           # add subcommand-specific args
       def run(args, auth):
           # args carries the global identity flags + subcommand flags
           ...
  2. Import it below so it is registered on startup.
"""
from weibo_tool.commands import (  # noqa: F401
    login, blacklist, blacklist_deep, blacklist_diag, top_followed, following_deep,
)

__all__ = ['login', 'blacklist', 'blacklist_deep', 'blacklist_diag', 'top_followed',
           'following_deep']


def register_subcommands(subparsers, parents=None):
    """Register every known subcommand onto the given subparsers action.

    `parents` is a list of parent ArgumentParsers (e.g. the shared identity
    flags) merged into each subparser so global options work after the
    subcommand name too.
    """
    for mod in (login, blacklist, blacklist_deep, blacklist_diag, top_followed,
                following_deep):
        mod.register(subparsers, parents=parents)
