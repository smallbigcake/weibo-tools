"""Unified command-line entry point for weibo-tools.

Run from the `src/` directory:
    python weibo-tool.py <subcommand> [options]      # launcher
    python -m weibo_tool <subcommand> [options]      # module form

Examples:
    python weibo-tool.py blacklist --uid <uid>
    python weibo-tool.py login --user <label>

Subcommands are discovered from `weibo_tool.commands` (each module exposes
`register(subparsers, parents=None)` and `run(args, auth)`). Adding a new
feature is as simple as dropping a new module into `weibo_tool/commands/` and
importing it in `weibo_tool/commands/__init__.py`.

Identity selection (`--uid` / `--user` / `--no-prompt`) is parsed globally so
every subcommand automatically supports multi-user sessions.
"""
