"""Entry point so the unified CLI can be invoked as `python -m weibo_tool`."""
import sys
from weibo_tool.cli import main

if __name__ == '__main__':
    sys.exit(main())
