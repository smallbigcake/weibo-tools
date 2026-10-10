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
    "(KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36"
)

# Chrome MAJOR version baked into BROWSER_USER_AGENT. Keep CHROME_CLIENT_HINTS
# in sync with this so the Sec-CH-UA brands match the UA string (a mismatch --
# e.g. UA says 153 but Sec-CH-UA says 152 -- is a classic fingerprint tell).
CHROME_MAJOR_VERSION = "154"

# Client Hints a real Windows Chrome 154 sends on every request. Single source
# of truth: auth/proxy/beacon layers import this instead of hard-coding.
CHROME_CLIENT_HINTS = {
    # Copied verbatim from the clean (no-disable-cache) Chrome 154 HAR recorded
    # 2026-10-07: Chromium comes FIRST, then Google Chrome, then the GREASE brand
    # "Not A(Brand" with v="99". Order/spelling matter -- Chrome 153 used a
    # different brand string and order, and a stale one is a fingerprint tell.
    "sec-ch-ua": '"Chromium";v="%s", "Google Chrome";v="%s", "Not A(Brand";v="99"'
                 % (CHROME_MAJOR_VERSION, CHROME_MAJOR_VERSION),
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}

# Weibo frontend business headers observed in a real Chrome HAR (2026-10-01,
# weibo h5playlog request). client-version is the weibo web frontend build string;
# server-version is whatever the API server reported and the frontend echoes back.
# Pinned to the HAR values so simulated requests match real traffic.
WEIBO_CLIENT_VERSION = "v1.1.250"
WEIBO_SERVER_VERSION = "v2026.09.22.3"

# Accept-Language a real Chrome with en-US primary sends. Every single request in
# the clean HAR carries this exact value, so we pin it rather than letting
# curl_cffi's impersonate profile pick its own.
BROWSER_ACCEPT_LANGUAGE = "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7"

# Mobile (iOS / WeChat webview) UA, used only for the m.weibo.cn mobile
# endpoint (explore_read_exp3). Deliberately distinct from the desktop UA.
MOBILE_USER_AGENT = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) "
    "Mobile/15E148 MicroMessenger/8.0 wv/"
)
