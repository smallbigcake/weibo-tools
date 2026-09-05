#!/usr/bin/env python
"""Unified launcher for weibo-tool.

Run `python weibo-tool.py <command> [options]` from the src/ directory, e.g.
    python weibo-tool.py blacklist --uid <uid>
    python weibo-tool.py login --user <label>

The real CLI logic lives in the `weibo_tool` package. This file is a thin,
dependency-free entry so you don't have to remember the `-m` flag. Because this
file sits in src/ next to the `weibo_tool` package, `import weibo_tool` resolves
directly without any path manipulation.
"""
import sys

from weibo_tool.cli import main

if __name__ == '__main__':
    sys.exit(main())
