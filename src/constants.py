"""Project-wide constants.

Single source of truth for the browser User-Agent strings used across every
HTTP request and Playwright context in this project. Previously the UA was
copy-pasted into ~30 modules (with three different Chrome versions drifting
apart); now every module imports from here so the value can be bumped in one
place.

``auth.USER_AGENT`` is a re-export of ``BROWSER_USER_AGENT`` for backward
compatibility with modules that already do ``from auth import USER_AGENT``.
"""

# Desktop Chrome UA. Keep this in sync with what a real, current Chrome on
# Windows 10/11 sends. Windows 11 still reports "Windows NT 10.0", so the OS
# token does not need to change when bumping the Chrome version.
BROWSER_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36"
)

# Mobile (iOS / WeChat webview) UA, used only for the m.weibo.cn mobile
# endpoint (explore_read_exp3). Deliberately distinct from the desktop UA.
MOBILE_USER_AGENT = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) "
    "Mobile/15E148 MicroMessenger/8.0 wv/"
)
