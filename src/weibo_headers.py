"""Per-endpoint request-header shaping for weibo traffic.

Baseline: the CLEAN (no-disable-cache) Chrome 154 HAR recorded 2026-10-07
(src/tmp/video/weibo-video-watch-waterfall-no-disable-cache-2026-10-07.har).
Regenerate the dump with src/tmp/video/parse_har_clean_baseline.py, which writes
har_headers_clean.txt. Do NOT use the older 2026-10-01 HAR as a reference: it was
recorded with DevTools "Disable cache" ticked, which injects `cache-control:
no-cache` / `pragma: no-cache` into every request.

The weibo frontend does NOT send one uniform header set -- it varies per
endpoint, so this module reproduces each endpoint's profile:

  accept           json on weibo.com ajax GETs + h5playlog; */* on the other
                   POST beacons
  x-requested-with only weibo.com ajax GETs + h5playlog
  client-version   weibo.com ajax GETs + h5playlog + read
  server-version   weibo.com ajax GETs + h5playlog (NOT read)
  origin           only on POST (GETs carry none)
  traceparent      weibo.com endpoints only (absent on rum.h5.weibo.cn and on
                   play_history)
  x-xsrf-token     weibo.com endpoints echo the XSRF-TOKEN cookie

Scope: weibo's own business/transport conventions ONLY. Browser-level headers
(User-Agent, Client Hints, Accept-Language, priority, sec-fetch-*) belong to
browser_session.py -- keeping the two apart means each can change independently
(swap the browser profile, or react to a weibo frontend change, without touching
the other).
"""
import secrets
from urllib.parse import urlparse

from constants import WEIBO_CLIENT_VERSION, WEIBO_SERVER_VERSION

ORIGIN = "https://weibo.com"


def is_weibo_host(url):
    """True for weibo.com and its sub-domains (not for weibo.cn collector hosts)."""
    host = urlparse(url).netloc.lower()
    return host == "weibo.com" or host.endswith(".weibo.com")


def classify(url):
    """Which weibo endpoint class `url` belongs to (order of checks matters)."""
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    path = parsed.path
    if "rum.h5.weibo.cn" in host:
        return "rum_h5"
    if "play_history/report" in path or "multimedia.api.weibo.com" in host:
        return "play_history"
    if "/ajax/log/h5playlog" in path:
        return "h5playlog"
    if "/ajax/log/read" in path:
        return "read"
    if "/ajax/log/rum" in path or "/aj/video/playstatistics" in path:
        return "beacon"
    return "ajax"


def apply(headers, method, url, xsrf_token=None):
    """Shape `headers` in place for this weibo endpoint; returns the kind."""
    upper = method.upper()
    weibo_host = is_weibo_host(url)
    kind = classify(url)

    profile = {
        "accept": ("application/json, text/plain, */*"
                   if kind in ("ajax", "h5playlog") else "*/*"),
    }
    # weibo's own XHR instance sets these; the plain POST beacons do not.
    if weibo_host and kind in ("ajax", "h5playlog"):
        profile["x-requested-with"] = "XMLHttpRequest"
        profile["client-version"] = WEIBO_CLIENT_VERSION
        profile["server-version"] = WEIBO_SERVER_VERSION
    elif weibo_host and kind == "read":
        profile["client-version"] = WEIBO_CLIENT_VERSION
    if upper == "POST":
        profile["origin"] = ORIGIN

    # Drop any case-variant the caller set, then apply this endpoint profile.
    for k in list(headers.keys()):
        if k.lower() in profile:
            del headers[k]
    headers.update(profile)

    # traceparent: carried by weibo.com endpoints, absent on play_history and on
    # the rum.h5.weibo.cn collector.
    for k in list(headers.keys()):
        if k.lower() == "traceparent":
            del headers[k]
    if weibo_host and kind != "play_history":
        headers["traceparent"] = "00-%s-%s-00" % (secrets.token_hex(16),
                                                  secrets.token_hex(8))

    # x-xsrf-token: every weibo.com XHR echoes the XSRF-TOKEN cookie.
    # beacon_engine already sets it for its own POSTs; this fills in the ajax
    # GETs (action, getVideoList) which were missing it vs the HAR.
    if weibo_host and xsrf_token and not any(k.lower() == "x-xsrf-token"
                                             for k in headers):
        headers["x-xsrf-token"] = xsrf_token
    return kind
