"""HTTP transport that presents a real browser fingerprint.

`BrowserSession` is the single outbound HTTP entrypoint for weibo traffic:
auth.py uses it for login / SSO renew, and the beacon simulator uses the very
same object (beacon_engine._viewer_session() returns auth.session), so every
request -- login and beacons alike -- carries one consistent fingerprint.

It owns:
  * the TLS/JA3 + HTTP/2 profile (curl_cffi impersonation);
  * browser-level headers (User-Agent, Client Hints, Accept-Language, priority,
    sec-fetch-*);
  * bridging curl_cffi back to a plain requests.Session so auth.py's
    save/load/renew logic keeps working on a normal requests CookieJar.

It does NOT own weibo's business headers (client-version / server-version /
traceparent / x-xsrf-token / per-endpoint accept) -- those live in
weibo_headers.py.

Naming: "browser", not "chrome" -- the requirement is "look like a real
browser", and which browser/version we impersonate is an implementation detail
that changes (see the chrome150 note below).
"""
import logging
import os
from urllib.parse import urlparse

import requests

from constants import (BROWSER_USER_AGENT as USER_AGENT, CHROME_CLIENT_HINTS,
                       BROWSER_ACCEPT_LANGUAGE)
import weibo_headers

# Headers a pristine requests.Session ships with. Anything else present in
# `self._req.headers` was set by the caller, and curl_cffi would never see it
# (we assemble the outgoing header dict ourselves), so we forward the difference.
_REQ_DEFAULT_HEADERS = dict(requests.Session().headers)

# Sub-resource loads carry a typed fetch destination, unlike XHR (`empty`).
# weibo's API paths have no file extension, so this only changes asset fetches
# (e.g. static_fetch mirroring a CDN) -- without it every .js would claim to be
# an XHR.
_ASSET_DEST = {
    ".js": "script", ".mjs": "script",
    ".css": "style",
    ".png": "image", ".jpg": "image", ".jpeg": "image", ".gif": "image",
    ".webp": "image", ".svg": "image", ".ico": "image", ".avif": "image",
    ".woff": "font", ".woff2": "font", ".ttf": "font", ".otf": "font",
}


class BrowserSession:
    """Outbound HTTP with a real-browser fingerprint, requests-compatible API.

    auth.py only relies on three interfaces of requests.Session:
      .headers  -> property returning the underlying requests session headers
      .cookies  -> the requests CookieJar (so .set/.get(domain=)/update/iter work)
      .request(method, url, **kw) -> the single send entrypoint

    Two adaptors bridge curl_cffi -> requests so callers are unaware of the swap:
      1. _sync_back() mirrors Set-Cookie responses back into the requests jar
         (curl_cffi's own jar is NOT iterable the way requests' is, so we parse
         the raw Set-Cookie headers instead of trusting the jar).
      2. _adapt_response() wraps a curl_cffi Response in a requests-compatible
         object (auth._request reads resp.raw / resp.request, which curl_cffi
         does not provide).
    """

    def __init__(self, uid=None):
        self._req = requests.Session()
        self.viewer_uid = uid
        # Expose the requests CookieJar directly so all auth cookie logic stays
        # unchanged (curl_cffi's jar is incompatible: iteration yields str).
        self.cookies = self._req.cookies
        self._chrome = None
        try:
            from curl_cffi.requests import Session as CurlSession
            # curl_cffi 0.16.3's newest Chrome profile is chrome150 -- there is
            # no 154, and "chrome154" raises "Impersonating chrome154 is not
            # supported" at request time. Pin 150 explicitly: closest available
            # match to the real Chrome 154 our UA / Client Hints advertise, and
            # pinning avoids the "chrome" alias drifting between releases.
            self._chrome = CurlSession(impersonate="chrome150")
            self._chrome.headers.update({"User-Agent": USER_AGENT})
            self._chrome.headers.update(CHROME_CLIENT_HINTS)
        except Exception as e:  # pragma: no cover - fallback keeps login alive
            logging.warning("BrowserSession: curl_cffi unavailable (%s); "
                            "requests will fall back to plain requests TLS", e)

    @property
    def headers(self):
        return self._req.headers

    def _sync(self):
        """req jar -> chrome jar (so outbound requests carry the live cookies)."""
        if self._chrome is None:
            return
        self._chrome.cookies.clear()
        for c in self._req.cookies:
            try:
                self._chrome.cookies.set(c.name, c.value,
                                         domain=c.domain, path=c.path or "/",
                                         secure=c.secure)
            except Exception:
                pass

    def _sync_back(self, cres, url):
        """chrome response Set-Cookie -> req jar (so auth save/load sees them)."""
        from http.cookies import SimpleCookie
        from email.utils import parsedate_to_datetime
        from datetime import timezone as _tz
        scs = cres.headers.get_list("Set-Cookie") if hasattr(cres.headers, "get_list") else []
        host = urlparse(url).netloc
        for sc in scs:
            try:
                c = SimpleCookie()
                c.load(sc)
            except Exception:
                continue
            for name, m in c.items():
                dom = m.get("domain") or host
                path = m.get("path") or "/"
                secure = bool(m.get("secure"))
                expires = None
                raw_exp = m.get("expires")
                if raw_exp:
                    try:
                        dt = parsedate_to_datetime(raw_exp)
                        if dt.tzinfo is None:
                            dt = dt.replace(tzinfo=_tz.utc)
                        expires = dt.timestamp()
                    except Exception:
                        expires = None
                try:
                    self._req.cookies.set(name, m.value, domain=dom, path=path,
                                          secure=secure, expires=expires)
                except Exception:
                    try:
                        self._req.cookies.set(name, m.value, domain=dom, path=path)
                    except Exception:
                        pass

    def _adapt_response(self, cres, method, url, req_headers, kw):
        from requests.structures import CaseInsensitiveDict

        class _FakeRawHeaders:
            def __init__(self, h):
                self._h = h

            def getlist(self, key):
                if hasattr(self._h, "get_list"):
                    return self._h.get_list(key)
                v = self._h.get(key)
                return [v] if v is not None else []

        class _FakeRaw:
            def __init__(self, h):
                self.headers = _FakeRawHeaders(h)

        class _FakeReq:
            def __init__(self, m, u, h, body):
                self.method = m
                self.url = u
                self.headers = h
                self.body = body

        r = requests.Response()
        r.status_code = cres.status_code
        r.reason = getattr(cres, "reason", "") or ""
        r.url = cres.url
        r._content = cres.content
        r.encoding = getattr(cres, "encoding", None)
        rh = CaseInsensitiveDict()
        for k in cres.headers.keys():
            rh[k] = cres.headers.get(k)
        r.headers = rh
        r.raw = _FakeRaw(cres.headers)
        r.request = _FakeReq(method, url, req_headers, kw.get("data") or kw.get("json"))
        r.cookies = self._req.cookies
        return r

    def request(self, method, url, **kw):
        if self._chrome is None:
            return self._req.request(method, url, **kw)
        self._sync()
        req_headers = self._session_headers()
        req_headers.update(kw.pop("headers", None) or {})
        req_headers.update(CHROME_CLIENT_HINTS)
        req_headers.setdefault("User-Agent", USER_AGENT)
        # Browser-level headers Chrome always sends (pinned to the HAR value so
        # curl_cffi's impersonate profile cannot substitute its own).
        browser_defaults = {"accept-language": BROWSER_ACCEPT_LANGUAGE,
                            "priority": "u=1, i"}
        for k in list(req_headers.keys()):
            if k.lower() in browser_defaults:
                del req_headers[k]
        req_headers.update(browser_defaults)
        if not self._is_navigation(method, url):
            self._apply_fetch_metadata(req_headers, url)
            weibo_headers.apply(req_headers, method, url,
                                xsrf_token=self._xsrf_token())
        kw["headers"] = req_headers
        cres = self._chrome.request(method, url, **kw)
        self._sync_back(cres, url)
        return self._adapt_response(cres, method, url, req_headers, kw)

    @staticmethod
    def _is_navigation(method, url):
        """A real page GET (e.g. fetching the UID from https://weibo.com/) is a
        navigation, not an API call: it keeps curl_cffi's navigation sec-fetch
        tuple and carries none of weibo's business headers."""
        host = urlparse(url).netloc.lower()
        return (method.upper() == "GET" and host == "weibo.com"
                and "/ajax/" not in url)

    def _session_headers(self):
        """Caller-set session-level headers (requests' own defaults excluded).

        `self.headers` is the requests session's jar; without this, headers a
        caller sets via `session.headers.update(...)` would never reach curl_cffi.
        """
        return {k: v for k, v in self._req.headers.items()
                if _REQ_DEFAULT_HEADERS.get(k) != v}

    def _apply_fetch_metadata(self, headers, url):
        """Fetch metadata a real browser computes per request (sec-fetch-*).

        curl_cffi's impersonate defaults these to the NAVIGATION tuple
        (navigate/document/none), which is wrong for XHR/fetch API traffic --
        real Chrome sends cors/empty for XHR, and a typed destination for
        sub-resources (script/style/image/font).
        """
        host = urlparse(url).netloc.lower()
        weibo_host = host == "weibo.com" or host.endswith(".weibo.com")
        dest = _ASSET_DEST.get(os.path.splitext(urlparse(url).path.lower())[1],
                               "empty")
        headers["sec-fetch-site"] = ("same-origin" if host == "weibo.com"
                                     else "same-site" if weibo_host
                                     else "cross-site")
        headers["sec-fetch-mode"] = "no-cors" if dest != "empty" else "cors"
        headers["sec-fetch-dest"] = dest

    def _xsrf_token(self):
        """XSRF-TOKEN cookie value (weibo JS echoes it in x-xsrf-token)."""
        try:
            return self._req.cookies.get("XSRF-TOKEN", domain="weibo.com")
        except Exception:
            return None

    def get(self, url, **kw):
        return self.request("GET", url, **kw)

    def post(self, url, **kw):
        return self.request("POST", url, **kw)

    def head(self, url, **kw):
        return self.request("HEAD", url, **kw)
