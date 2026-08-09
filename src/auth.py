import json
import os
import re
import glob
import random
import uuid
import io
import argparse
from urllib.parse import parse_qs, urlparse, urlencode

import time
import qrcode
import requests

import logging
from logging import config

# logging.ini contains relative handler paths (log/weibo.log). Resolve them
# relative to this file's directory so auth.py works regardless of CWD.
_logging_cfg_dir = os.path.dirname(os.path.abspath(__file__))
_prev_cwd = os.getcwd()
os.chdir(_logging_cfg_dir)
try:
    logging.config.fileConfig('config/logging.ini')
finally:
    os.chdir(_prev_cwd)

# Multi-user support: each identity stores its cookies in its own file
# `cookies.<uid>.weibo` under the same directory. The UID is the numeric Weibo
# user id, captured after a successful login so every account's session is
# stored (and looked up) by its real UID. A human-friendly `--user` label may
# be supplied instead and is resolved to a UID at save time. A legacy single-user
# `cookies.weibo` is still readable for backward compatibility (see Auth.load),
# but new saves always use the per-UID path.
COOKIE_DIR = os.path.dirname(os.path.abspath(__file__))


def user_cookie_path(uid):
    """Absolute path of the cookie jar for a given UID. The UID is always part
    of the file name so every account's session is stored separately."""
    return os.path.join(COOKIE_DIR, 'cookies.%s.weibo' % (uid or 'default'))


def legacy_cookie_path():
    """Path of the pre-multi-user single cookie jar (read-only fallback)."""
    return os.path.join(COOKIE_DIR, 'cookies.weibo')


# Label -> UID mapping so that `--user <label>` (a human-friendly alias chosen
# at first login) can be resolved back to the real UID-named cookie file on
# later runs, instead of forcing a fresh QR login every time.
LABEL_MAP_PATH = os.path.join(COOKIE_DIR, 'cookies.labels.json')


def _load_label_map():
    try:
        with open(LABEL_MAP_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def _save_label_map(mapping):
    with open(LABEL_MAP_PATH, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)

WEIBO_HOME_URL = 'https://weibo.com'

# Global browser User-Agent. A realistic browser UA is required on every
# request to match the behavior of a real browser session.
USER_AGENT = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
              '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

# Visitor (guest) session bootstrap. The guest SUB is obtained from
# genvisitor2 (returned in the JSONP body, written to .weibo.com by first-party
# JS in the browser), then the device fingerprint is reported via /sso/bd.
WEIBO_URL_GENVISTOR_2 = 'https://passport.weibo.com/visitor/genvisitor2'
WEIBO_URL_VISITOR_ENTER = 'https://passport.weibo.com/visitor/visitor'
WEIBO_URL_VISITOR_BD = 'https://passport.weibo.com/sso/bd'
WEIBO_URL_VISITOR_CROSSDOMAIN = 'https://login.sina.com.cn/visitor/visitor'

# v1 endpoints (legacy login.sina.com.cn flow)
WEIBO_URL_QR_CHECK = 'https://login.sina.com.cn/sso/qrcode/check'
WEIBO_URL_QR_CODE_GEN = 'https://login.sina.com.cn/sso/qrcode/image'

# v2 endpoints (current browser implementation, used by default)
WEIBO_URL_QR_CHECK_V2 = 'https://passport.weibo.com/sso/v2/qrcode/check'
WEIBO_URL_QR_CODE_GEN_V2 = 'https://passport.weibo.com/sso/v2/qrcode/image'

WEIBO_URL_QR_LOGIN = 'https://passport.weibo.cn/signin/qrcode/scan?qr={QR_ID}&sinain'

WEIBO_URL_TEST_LOGIN = 'https://weibo.com/ajax/config/get_config'

# SSO renewal (silent, no QR scan). Replays the crossdomain chain with the
# long-lived SCF cookie (encrypted TGT) as the credential: useticket=1 tells
# the gateway to mint a fresh ST- ticket and re-issue short-term cookies
# (ALF/SUB/SUBP). Observed in sina-sso-login.har.
WEIBO_URL_SSO_LOGIN_PHP = 'https://login.sina.com.cn/sso/login.php'

# SSO exchange (v2 scan-confirm chain, observed in the popup HAR):
#   1. passport.weibo.com/sso/v2/login?...&alt=ALT-...   -> 302 to v2/crossdomain
#   2. login.sina.com.cn/sso/v2/crossdomain?...&ticket=ST-... -> 302 to weibo.cn crossdomain
#   3. passport.weibo.cn/sso/crossdomain?...&ticket=ST-... -> sets final .weibo.com SUB
#   4. passport.weibo.com/sso/v2/pmproxy?url=...          -> landing
WEIBO_URL_SSO_LOGIN_V2 = 'https://passport.weibo.com/sso/v2/login'
WEIBO_URL_SSO_CROSSDOMAIN = 'https://login.sina.com.cn/sso/v2/crossdomain'
WEIBO_URL_SSO_CROSSDOMAIN_CN = 'https://passport.weibo.cn/sso/crossdomain'
WEIBO_URL_SSO_PMPROXY = 'https://passport.weibo.com/sso/v2/pmproxy'
WEIBO_URL_SSO_SIGNIN = 'https://passport.weibo.com/sso/signin'
WEIBO_URL_SSO_WEB_CONFIG = 'https://passport.weibo.com/sso/v2/web/config'

RET_CODE_QR_UNUSED = 50114001
RET_CODE_QR_SCANNED = 50114002
RET_CODE_QR_CONFIRMED = 20000000
RET_CODE_QR_TIMEOUT = 50114003
RET_CODE_QR_USED = 50114004
RET_CODE_QR_EXCEPTION = 50114015


class Auth(object):
    def __init__(self, uid=None, user=None):
        # `uid` is the numeric Weibo id; `user` is an optional human label.
        # When login is successful the real UID is fetched and takes precedence
        # for the cookie file name. Before that, `user` acts as a label.
        self.uid = None
        self.label = user or 'default'
        self.cookies = []
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})

    @staticmethod
    def list_uids():
        """Return the list of known UIDs (from cookies.<uid>.weibo)."""
        uids = []
        for f in glob.glob(os.path.join(COOKIE_DIR, 'cookies.*.weibo')):
            m = re.match(r'cookies\.(.+)\.weibo$', os.path.basename(f))
            if m:
                uids.append(m.group(1))
        return sorted(uids)

    def resolve_uid(self, args_uid=None, args_user=None, prompt=True):
        """Pick the active identity.

        Either `--uid` (a numeric UID) or `--user` (a label) may be given;
        exactly one is enough.

        Precedence:
          1. `--uid` if that UID already has a saved cookie file -> use it.
          2. `--user` if that label has not logged in yet -> will log in fresh,
             UID resolved after the scan.
          3. interactive menu over existing UIDs when `prompt=True`.

        If `--uid` is given but no matching cookie file exists, prints an error
        and returns False so the caller can fall back to a `--user` login.
        """
        if args_uid:
            if os.path.exists(user_cookie_path(args_uid)):
                self.uid = args_uid
                logging.info('Using saved session for UID %s.' % args_uid)
                return True
            logging.error('UID %s has no saved session. Use --user to log in first.'
                          % args_uid)
            return False
        if args_user:
            self.label = args_user
            # If this label was used before, resolve it to the real UID so we
            # reuse the existing cookie file instead of forcing a fresh login.
            mapped_uid = _load_label_map().get(args_user)
            if mapped_uid and os.path.exists(user_cookie_path(mapped_uid)):
                self.uid = mapped_uid
                logging.info('Resolved label "%s" -> UID %s (saved session).'
                             % (args_user, mapped_uid))
            return True
        uids = self.list_uids()
        if not uids:
            self.label = 'default'
            return True
        if not prompt:
            self.uid = uids[0]
            return True
        try:
            print('Select a Weibo user identity:')
            for i, u in enumerate(uids, 1):
                print('  %d. %s' % (i, u))
            choice = input('UID # or value [default=%s]: ' % uids[0]).strip()
        except (EOFError, OSError):
            self.uid = uids[0]
            return True
        if choice == '':
            self.uid = uids[0]
            return True
        if choice.isdigit():
            idx = int(choice)
            if 1 <= idx <= len(uids):
                self.uid = uids[idx - 1]
                return True
        # An arbitrary string is treated as a new label to log in as.
        self.label = choice or 'default'
        return True

    def _fetch_uid(self):
        """Fetch the real numeric UID of the logged-in account.

        Parses `window.$CONFIG.user.id` from the weibo.com landing page. Returns
        the UID string, or None if it cannot be determined.
        """
        try:
            resp = self._request('GET', WEIBO_HOME_URL + '/', allow_redirects=True)
        except Exception as e:
            logging.warning(f'_fetch_uid: request failed: {e}')
            return None
        m = re.search(r'window\.\$CONFIG\s*=\s*\{.*?user\s*:\s*\{[^}]*?id\s*:\s*[\'"]?(\d+)',
                      resp.text, re.DOTALL)
        if m:
            return m.group(1)
        # Fallback: look for $CONFIG as JSON and read user.id.
        m = re.search(r'window\.\$CONFIG\s*=\s*(\{.*?\});', resp.text, re.DOTALL)
        if m:
            try:
                cfg = json.loads(m.group(1))
                uid = cfg.get('user', {}).get('id')
                if uid:
                    return str(uid)
            except (json.JSONDecodeError, ValueError):
                pass
        logging.warning('_fetch_uid: could not locate UID in landing page.')
        return None

    def _cookie_path(self):
        return user_cookie_path(self.uid or self.label)

    def _request(self, method, url, **kwargs):
        """Centralized HTTP wrapper: performs the request via the shared session
        and emits structured logs.

        INFO (one consolidated line per phase):
          - request:  METHOD url  cookies=<sent cookie names>
          - response: METHOD url -> STATUS  set-cookie=<name@domain,...>
                      (3xx also prints the Location)
        DEBUG (one log entry per request, newline-separated):
          - full request headers
          - response headers
          - JSON body (pretty) or non-JSON byte note
          - every cookie touched: name=value@domain
        """
        resp = self.session.request(method, url, **kwargs)
        req = resp.request
        sent_cookies = _cookie_names_from_header(req.headers.get('Cookie', ''))
        host = urlparse(req.url).netloc

        # ---- INFO: request ----
        logging.info(f'REQ  {method} {req.url}\n'
                     f'      cookies: {sent_cookies or "(none)"}  (host={host})')

        # ---- INFO: response ----
        set_cookies = resp.raw.headers.getlist('Set-Cookie') if resp.raw else []
        sc_summary = ', '.join(s for s in (_set_cookie_summary(h) for h in set_cookies) if s)
        lines = [f'RESP {method} {req.url} -> {resp.status_code} {resp.reason}']
        if sc_summary:
            lines.append(f'      set-cookie: {sc_summary}')
        else:
            lines.append('      set-cookie: (none)')
        if resp.status_code in (301, 302, 303, 307, 308):
            loc = resp.headers.get('Location')
            lines.append(f'      Location: {loc}')
        logging.info('\n'.join(lines))

        # ---- DEBUG: the whole request+response as ONE log entry (newline-separated) ----
        parts = [f'HTTP {method} {req.url}']
        parts.append('  [request headers]')
        for k, v in req.headers.items():
            parts.append(f'    {k}: {v}')
        if req.body:
            parts.append(f'  [request body] {req.body}')
        parts.append(f'  [response] {resp.status_code} {resp.reason}')
        parts.append('  [response headers]')
        for k, v in resp.headers.items():
            parts.append(f'    {k}: {v}')
        ctype = resp.headers.get('Content-Type', '')
        if 'json' in ctype or (resp.text or '').lstrip().startswith(('{', '[')):
            parts.append(f'  [response body] {_fmt_json_body(resp.text)}')
        else:
            parts.append(f'  [response body] (non-JSON, {len(resp.content)} bytes)')
        if set_cookies:
            parts.append('  [cookies touched]')
            for h in set_cookies:
                summary = _set_cookie_summary(h)
                name = summary.split('@')[0]
                dom = summary.split('@', 1)[1] if '@' in summary else ''
                val = ''
                for c in self.session.cookies:
                    if c.name == name:
                        val = c.value
                        break
                parts.append(f'    {name}={val}@{dom}')
        logging.debug('\n'.join(parts))
        return resp

    def visitor_session_gen(self):
        logging.info('Initializing visitor session.')
        headers = {
            'User-Agent': USER_AGENT,
            'Referer': WEIBO_URL_VISITOR_ENTER + '?entry=miniblog&a=enter&url='
                       + WEIBO_HOME_URL + '/&domain=weibo.com&ua=Mozilla/5.0',
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        # Step 1: bootstrap the guest SUB. The server does NOT set it via
        # Set-Cookie (cross-site cookie blocking); instead it returns the value
        # in the JSONP body (data.sub / data.subp), and the browser's
        # mini_original.js writes it with document.cookie. We replicate that by
        # setting the cookie ourselves on .weibo.com.
        req_data = {
            'cb': 'visitor_gray_callback',
            'ver': '20250916',
            'request_id': uuid.uuid4().hex,
            'tid': '',
            'from': 'weibo',
            'webdriver': 'false',
            'rid': callback_str(),
            'return_url': WEIBO_HOME_URL + '/',
        }
        resp = self._request(
            'POST', WEIBO_URL_GENVISTOR_2, headers=headers, data=req_data
        )
        body = response_strip(resp.text)
        try:
            ret = json.loads(body)
            data = ret.get('data', {})
            sub = data.get('sub')
            subp = data.get('subp')
            if sub:
                self.session.cookies.set('SUB', sub, domain='.weibo.com', path='/')
                logging.info('Visitor SUB established.')
            if subp:
                self.session.cookies.set('SUBP', subp, domain='.weibo.com', path='/')
        except (json.JSONDecodeError, ValueError) as e:
            logging.warning(f'Failed to parse genvisitor2 response: {e}')

        # Step 2: load the popup signin page, which mints the X-CSRF-TOKEN
        # (CK-...) required by the v2 QR endpoints, then fetch web/config and
        # report the device fingerprint (sso/bd) to bind the guest session.
        signin_url = (WEIBO_URL_SSO_SIGNIN + '?entry=miniblog&source=miniblog&disp=popup'
                      '&url=' + 'https%3A%2F%2Fweibo.com%2Fnewlogin%3Ftabtype%3Dweibo%26gid%3D102803'
                      '%26openLoginLayer%3D0%26url%3Dhttps%3A%2F%2Fweibo.com%2F&from=weibopro')
        self._request('GET', signin_url, headers={'User-Agent': headers['User-Agent'],
                                               'Referer': WEIBO_HOME_URL + '/'}, allow_redirects=True)
        csrf = self.session.cookies.get('X-CSRF-TOKEN', domain='.passport.weibo.com')
        self._request(
            'POST', WEIBO_URL_SSO_WEB_CONFIG,
            data={'entry': 'miniblog', 'source': 'miniblog'},
            headers={'User-Agent': headers['User-Agent'], 'Referer': signin_url,
                     'x-requested-with': 'XMLHttpRequest', 'Origin': 'https://passport.weibo.com',
                     'X-Xsrf-Token': csrf or ''},
        )
        self._request('GET', WEIBO_URL_VISITOR_BD, allow_redirects=False)

    def crossdomain_visitor_gen(self):
        logging.info('Initializing cross-domain visitor session')
        # Crossdomain login
        params = {
            'a': 'crossdomain',
            's': self.session.cookies.get('SUB', domain='.weibo.com'),
            'sp': self.session.cookies.get('SUBP', domain='.weibo.com'),
            'from': 'weibo',
            '_rand': random.random(),
            'entry': 'miniblog',
            'url': 'https://weibo.com/login.php',
        }
        response = self._request('GET', WEIBO_URL_VISITOR_CROSSDOMAIN, params=params, allow_redirects=False)


    def sso_login(self, login_url):
        """Redeem a confirmed scan through the v2 SSO chain.

        `login_url` is the full URL returned in qrcode/check's
        data.url (e.g. .../sso/v2/login?entry=miniblog&...&alt=ALT-...&...).
        Using it directly mirrors the browser's post-confirm navigation, so we
        don't have to re-assemble query params by hand.

          1. passport.weibo.com/sso/v2/login?...&alt=ALT-...
             -> 302 Location: login.sina.com.cn/sso/v2/crossdomain?...&ticket=ST-...
             (also sets the final .weibo.com cookies: SCF, SUB, SUBP, ALC, ALF)
          2. login.sina.com.cn/sso/v2/crossdomain?...&ticket=ST-...
             -> 302 to passport.weibo.cn/sso/crossdomain
          3. passport.weibo.cn/sso/crossdomain?...&ticket=ST-...
          4. passport.weibo.com/sso/v2/pmproxy?url=...   (landing)
        """
        headers = {
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,'
                      'image/avif,image/webp,image/apng,*/*;q=0.8,'
                      'application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
            'Referer': 'https://passport.weibo.com/sso/signin?entry=miniblog&source=miniblog&disp=popup&url='
                       'https%3A%2F%2Fweibo.com%2Fnewlogin%3Ftabtype%3Dweibo%26gid%3D102803%26openLoginLayer%3D0%26url%3Dhttps%3A%2F%2Fweibo.com%2F&from=weibopro',
            'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'upgrade-insecure-requests': '1',
        }

        # Step 1: v2/login — captures the final .weibo.com login cookies via
        # Set-Cookie and yields the crossdomain redirect Location.
        response = self._request('GET', login_url, headers=headers, allow_redirects=False)

        # Step 2-4: follow the crossdomain/pmproxy chain manually so every
        # Set-Cookie is captured by the session.
        self._follow_sso_chain(response, headers)

        # Finalize: load the weibo.com landing page to fully establish session.
        self._request('GET', WEIBO_HOME_URL + '/', headers=headers, allow_redirects=True)
        logging.info('SSO login finalized.')

    def _follow_sso_chain(self, first_response, headers):
        """Follow a 30x SSO redirect chain manually so every Set-Cookie is
        captured by the session. Returns the final response."""
        max_hops = 6
        current = first_response
        for hop in range(1, max_hops + 1):
            if current.status_code not in (301, 302, 303, 307, 308):
                break
            location = current.headers.get('Location')
            if not location:
                break
            logging.info(f'SSO redirect (hop {hop}) -> {location}')
            current = self._request(
                'GET', location, headers=headers, allow_redirects=False
            )
        else:
            logging.warning(f'_follow_sso_chain: exhausted {max_hops} hops without '
                            f'terminating (last status {current.status_code}).')
        if current.status_code in (301, 302, 303, 307, 308):
            logging.warning(f'_follow_sso_chain: ended on a redirect '
                            f'(status {current.status_code}, '
                            f'Location {current.headers.get("Location")}).')
        return current

    def renew(self):
        """Silently refresh short-term cookies (and re-mint the long-term SCF)
        without a QR scan.

        Mirrors exactly what a browser does when it hits weibo.com/ with a
        missing `.weibo.com` SUB (proven 2026-08-07):
          1. GET weibo.com/  -> 302 with `x-login-autologin: true` and a
             `Location: https://login.sina.com.cn/sso/login.php?...&useticket=1`
             URL that the *server* itself generates.
          2. Follow that exact Location (the server-issued URL, not one we
             build) to login.php, which replays the crossdomain chain and
             re-issues SUB/ALF/SCF/ALC.
        Returns True if the renewal produced a logged-in session.

        This is the silent-recovery path: when only the `.weibo.com` SUB is
        missing but the long-lived SSO TGT is still valid, the chain restores
        the SUB without any QR re-scan. It only fails (returns False, 6102) when
        the SSO TGT itself is spent, in which case the caller should fall back
        to a full `login()`.

        NOTE: do NOT set a manual `Cookie` request header here. `requests` sends
        the `.sina.com.cn` SSO cookies (SCF/SUB/SUBP/ALF) and the
        `.login.sina.com.cn` cookies (SVB/ALC) natively; overriding the `Cookie`
        header drops the latter and causes `retcode=6102`.
        """
        headers = {
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,'
                      'image/avif,image/webp,image/apng,*/*;q=0.8,'
                      'application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
            'Referer': WEIBO_HOME_URL + '/',
            'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'upgrade-insecure-requests': '1',
        }

        # Step 1: hit weibo.com/ exactly as the browser does, to obtain the
        # server-issued autologin redirect (x-login-autologin: true).
        now, state = _auth_cookie_state(self.session.cookies)
        logging.info(f'renew(): pre-renew auth-state: {_fmt_auth_cookie_state(now, state)}')
        r1 = self._request('GET', WEIBO_HOME_URL + '/', headers=headers,
                           allow_redirects=False, timeout=15)
        if r1.status_code == 200:
            # Already fully logged in (no autologin needed) — nothing to renew.
            if self.test_login():
                return True
            # 200 but test_login() says not logged in: the page loaded but the
            # session is invalid. Treat as a failed renewal, not a success.
            now, state = _auth_cookie_state(self.session.cookies)
            logging.warning('renew(): weibo.com/ returned 200 but session is NOT '
                            f'logged in.\n  auth-state: {_fmt_auth_cookie_state(now, state)}')
            return False
        if r1.status_code not in (301, 302):
            logging.warning(f'renew(): weibo.com/ returned unexpected status {r1.status_code}.')
            return False
        login_url = r1.headers.get('Location')
        if not login_url or 'login.php' not in login_url:
            logging.warning(f'renew(): unexpected autologin Location: {login_url}')
            return False

        # Step 2: follow the EXACT server-issued login.php URL. Let requests send
        # the SSO cookies from the jar natively (do NOT override Cookie header).
        logging.info('Renewing session via SSO login.php (server-issued URL).')
        resp = self._request('GET', login_url, headers=headers, allow_redirects=False, timeout=15)
        if resp.status_code not in (301, 302):
            logging.warning(f'renew(): login.php returned unexpected status {resp.status_code} '
                            '(SSO TGT may be spent).')
            return False

        self._follow_sso_chain(resp, headers)
        # Finalize: load the weibo.com landing page to fully establish session.
        self._request('GET', WEIBO_HOME_URL + '/', headers=headers, allow_redirects=True)

        if self.test_login():
            logging.info('renew(): session renewed successfully.')
            self.save_cookies()
            return True
        now, state = _auth_cookie_state(self.session.cookies)
        logging.warning('renew(): chain completed but session is still not logged in.\n'
                        f'  post-renew auth-state: {_fmt_auth_cookie_state(now, state)}')
        return False


    def save_cookies(self):
        # Resolve the real UID for file naming (after a successful scan).
        if not self.uid:
            self.uid = self._fetch_uid()
        identity = self.uid or self.label
        logging.info('Saving cookies for "%s" to disk.' % identity)
        # Remember label -> UID so a later `--user <label>` reuses this session.
        if self.uid and self.label and self.label != self.uid:
            mapping = _load_label_map()
            if mapping.get(self.label) != self.uid:
                mapping[self.label] = self.uid
                _save_label_map(mapping)
                logging.info('Mapped label "%s" -> UID %s.' % (self.label, self.uid))
        cookies_data = []
        for cookie in self.session.cookies:
            cookies_data.append({
                'name': cookie.name,
                'value': cookie.value,
                'domain': getattr(cookie, 'domain', ''),
                'path': getattr(cookie, 'path', '/'),
                'secure': getattr(cookie, 'secure', False),
                'expires': getattr(cookie, 'expires', None),
                'http_only': bool(getattr(cookie, 'has_nonstandard_attr', lambda x: False)('HttpOnly') or
                                 getattr(cookie, '_rest', {}).get('HttpOnly') is not None),
            })
        path = self._cookie_path()
        # Diff against what was on disk to report what changed (updated keys).
        try:
            with open(path, 'r', encoding='utf-8') as f:
                prev = {c['name'] + '@' + c.get('domain', '') for c in json.load(f)}
        except (FileNotFoundError, json.JSONDecodeError):
            prev = set()
        curr = {c['name'] + '@' + c.get('domain', '') for c in cookies_data}
        updated = sorted(curr & prev)
        added = sorted(curr - prev)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(cookies_data, f, ensure_ascii=False, indent=2)
        logging.info(f'Saved {len(cookies_data)} cookies.\n'
                     f'  keys: {_describe_cookies(self.session.cookies)}\n'
                     f'  updated ({len(updated)}): {", ".join(updated) or "(none)"}\n'
                     f'  added  ({len(added)}): {", ".join(added) or "(none)"}')
        debug_lines = ['Saved cookie details (name=value@domain):']
        for c in self.session.cookies:
            debug_lines.append(f'  {c.name}={c.value}@{c.domain}')
        logging.debug('\n'.join(debug_lines))

    def login(self, max_rounds=5):
        logging.info('Start logging in...')
        self.visitor_session_gen()
        self.crossdomain_visitor_gen()

        # The QR window drives the scan-poll loop on the GUI thread (tkinter
        # must run on the main thread), auto-populating, auto-refreshing on
        # expiry, and auto-closing on success. This blocks until login finishes
        # or the retry cap is exceeded.
        win = _QRWindow()
        win.run(self, max_rounds=max_rounds)

    def check_qr_code_scan_v1(self, qr_id):
        """v1 poll endpoint (legacy). See check_qr_code_scan_v2 for default."""
        logging.info('Checking QR scanning status (v1).')
        headers = {'Referer': 'https://weibo.com/'}

        params = {
            'entry': 'weibo',
            'qrid': qr_id,
            'callback': callback_str()
        }
        response = self._request('GET', WEIBO_URL_QR_CHECK, headers=headers, params=params, allow_redirects=False)
        json_str = response_strip(response.text)
        ret_dict = json.loads(json_str)
        if ret_dict['retcode'] == RET_CODE_QR_UNUSED:
            logging.info(ret_dict['msg'])
            return {
                'success': False
            }
        elif ret_dict['retcode'] == RET_CODE_QR_SCANNED:
            logging.info(ret_dict['msg'])
            return {
                'success': False
            }
        elif ret_dict['retcode'] == RET_CODE_QR_CONFIRMED:
            logging.info(ret_dict['msg'])
            data = ret_dict.get('data') or {}
            login_url = data.get('url') or (
                WEIBO_URL_SSO_LOGIN_V2 + '?' + urlencode({'alt': alt_from_data(data)})
                if alt_from_data(data) else None
            )
            return {
                'success': True,
                'login_url': login_url
            }
        else:
            logging.info(f'Unexpected return code: {ret_dict["retcode"]}, msg: {ret_dict["msg"]}')
            return {
                'success': False
            }

    def check_qr_code_scan_v2(self, qr_id):
        """v2 poll endpoint (default). Mirrors the browser popup flow:
        passport.weibo.com/sso/v2/qrcode/check with disp=popup, rid, ver.
        """
        logging.info('Checking QR scanning status (v2).')
        # The real passport popup (login-ZbqmGudM.js) calls /sso/v2/qrcode/check
        # with these exact fields. `rid` is the device fingerprint rid from
        # wbBotDetector; when absent the browser sends the literal "norid".
        # `ver` is the fixed build version "20250520".
        # NOTE: although the browser bundle uses axios POST, the live
        # passport.weibo.com server rejects POST (retcode 50114008 "qrid format
        # error") and only accepts these as GET query params. Verified 2026-08-07.
        params = {
            'entry': 'miniblog',
            'source': 'miniblog',
            'url': 'https://weibo.com/newlogin?tabtype=weibo&gid=102803&openLoginLayer=0&url=https://weibo.com/',
            'qrid': qr_id,
            'disp': 'popup',
            'rid': 'norid',
            'ver': '20250520',
        }
        headers = {
            'Referer': 'https://passport.weibo.com/sso/signin?entry=miniblog&source=miniblog&disp=popup',
            'x-requested-with': 'XMLHttpRequest',
            'Origin': 'https://passport.weibo.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        resp = self._request('GET', WEIBO_URL_QR_CHECK_V2, headers=headers, params=params, timeout=15)
        ret_dict = json.loads(response_strip(resp.text))
        if ret_dict.get('retcode') == RET_CODE_QR_UNUSED:
            logging.info(ret_dict.get('msg'))
            return {'success': False}
        elif ret_dict.get('retcode') == RET_CODE_QR_SCANNED:
            logging.info(ret_dict.get('msg'))
            return {'success': False}
        elif ret_dict.get('retcode') == RET_CODE_QR_CONFIRMED:
            logging.info(ret_dict.get('msg'))
            data = ret_dict.get('data') or {}
            return {'success': True, 'login_url': data.get('url')}
        elif ret_dict.get('retcode') == RET_CODE_QR_TIMEOUT:
            logging.info(f'QR code expired (timeout): {ret_dict.get("msg")}')
            return {'success': False, 'terminated': True, 'reason': 'timeout'}
        elif ret_dict.get('retcode') == RET_CODE_QR_USED:
            logging.info(f'QR code already used: {ret_dict.get("msg")}')
            return {'success': False, 'terminated': True, 'reason': 'used'}
        elif ret_dict.get('retcode') == RET_CODE_QR_EXCEPTION:
            logging.info(f'QR code check exception: {ret_dict.get("msg")}')
            return {'success': False, 'terminated': True, 'reason': 'exception'}
        else:
            logging.info(f'Unexpected return code: {ret_dict.get("retcode")}, msg: {ret_dict.get("msg")}')
            return {'success': False, 'terminated': True, 'reason': 'unknown'}

    def qr_code_gen(self):
        """Default QR generator (v2)."""
        return self.qr_code_gen_v2()

    def check_qr_code_scan(self, qr_id):
        """Default QR poll (v2)."""
        return self.check_qr_code_scan_v2(qr_id)

    def qr_code_gen_v1(self):
        params = {
            'entry': 'weibo',
            'size': 180,
            'callback': callback_str()
        }
        logging.info(f'QR gen (v1) params: {params}')

        headers = {'Referer': 'https://weibo.com/'}
        response = self._request('GET', WEIBO_URL_QR_CODE_GEN, headers=headers, params=params)
        raw_text = response.text
        json_str = response_strip(raw_text)
        ret_dict = json.loads(json_str)
        qr_id = ret_dict['data']['qrid']
        logging.info(f'QR ID is: {qr_id}')

        qr_login_url = WEIBO_URL_QR_LOGIN.format(QR_ID=qr_id)
        qr_img = qrcode.make(qr_login_url)
        logging.info(f'Display QR Image for login: {qr_login_url}')
        return qr_id, qr_img

    def qr_code_gen_v2(self):
        # The real passport popup calls /sso/v2/qrcode/image with these fields.
        # Although the browser bundle uses axios POST, the live
        # passport.weibo.com server rejects POST (retcode 50114017 "size error")
        # and only accepts GET query params. Verified 2026-08-07.
        # The response may carry data.image as a URL (v2.qr.weibo.cn/inf/gen?..)
        # or as a base64 data string depending on deployment.
        params = {
            'entry': 'miniblog',
            'source': 'miniblog',
            'size': 180,
        }
        logging.info(f'QR gen (v2) params: {params}')

        headers = {
            'Referer': 'https://passport.weibo.com/sso/signin?entry=miniblog&source=miniblog&disp=popup',
            'x-requested-with': 'XMLHttpRequest',
            'Origin': 'https://passport.weibo.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        resp = self._request('GET', WEIBO_URL_QR_CODE_GEN_V2, headers=headers, params=params, timeout=15)
        text = resp.text or ''
        if resp.status_code != 200 or '{' not in text:
            raise RuntimeError(
                f'v2/qrcode/image returned status={resp.status_code}, '
                f'body={text[:200]!r}'
            )
        ret_dict = json.loads(response_strip(text))
        if ret_dict.get('retcode') != 20000000 or not ret_dict.get('data'):
            raise RuntimeError(
                f'v2/qrcode/image unexpected response: retcode={ret_dict.get("retcode")}, '
                f'msg={ret_dict.get("msg")!r}'
            )
        qr_id = ret_dict['data']['qrid']
        image = ret_dict['data']['image']
        logging.info(f'QR ID is: {qr_id}')

        import base64
        from PIL import Image
        qr_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tmp', 'weibo_qr.png')
        os.makedirs(os.path.dirname(qr_path), exist_ok=True)
        # The popup build returns a base64 data string; some deployments return
        # a plain URL. Handle both so we always end up with a local PNG.
        if image.startswith('data:') or (len(image) > 200 and not image.startswith('http')):
            b64 = image.split(',', 1)[1] if image.startswith('data:') else image
            png_bytes = base64.b64decode(b64)
        else:
            img_resp = self._request('GET', image, headers={'Referer': 'https://weibo.com/'})
            png_bytes = img_resp.content
        with open(qr_path, 'wb') as f:
            f.write(png_bytes)
        logging.info(f'QR image saved to: {qr_path}')
        logging.info(f'Display QR Image for login: {image}')
        qr_img = Image.open(io.BytesIO(png_bytes)).convert('RGB')
        return qr_id, qr_img


    def test_login(self):
        logging.info('Checking login status via API.')
        headers = {
            'User-Agent': USER_AGENT,
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://weibo.com/',
            'x-requested-with': 'XMLHttpRequest',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
        }
        # GET request with no side effects. A logged-in session returns
        # {"ok":1, "data":{...}}; an unauthenticated one returns
        # {"ok":-100, "url":".../login.php?..."}.
        try:
            response = self._request(
                'GET', WEIBO_URL_TEST_LOGIN, headers=headers, timeout=15
            )
        except Exception as e:
            logging.warning(f'Login check request failed: {e}')
            return False
        try:
            ret = response.json()
        except Exception:
            logging.info('Login status: non-JSON response, not logged in.')
            return False
        if ret.get('ok') == 1:
            logging.info('Login status: logged in.')
            return True
        now, state = _auth_cookie_state(self.session.cookies)
        logging.info(f"Login status: API returned ok={ret.get('ok')} (not logged in).\n"
                     f"  auth-state: {_fmt_auth_cookie_state(now, state)}")
        return False

    def load(self):
        logging.info('Loading cookies for "%s" from disk.' % (self.uid or self.label))
        path = self._cookie_path()
        # Backward compatibility: if the per-user file is missing but the legacy
        # single-user `cookies.weibo` exists, read from it (new saves still go
        # to the per-user path).
        if not os.path.exists(path) and os.path.exists(legacy_cookie_path()):
            logging.info('No per-user cookie file; falling back to legacy %s.'
                         % os.path.basename(legacy_cookie_path()))
            path = legacy_cookie_path()
        try:
            with open(path, 'r', encoding='utf-8') as f:
                cookies_data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            logging.info('No valid cookie file found.')
            return
        from requests.cookies import RequestsCookieJar
        jar = RequestsCookieJar()
        for item in cookies_data:
            jar.set(
                name=item['name'],
                value=item['value'],
                domain=item.get('domain'),
                path=item.get('path', '/'),
                secure=item.get('secure', False),
                expires=item.get('expires'),
            )
        self.session.cookies.update(jar)
        now, state = _auth_cookie_state(self.session.cookies)
        logging.info(f'Loaded {len(cookies_data)} cookies.\n'
                     f'  keys: {_describe_cookies(self.session.cookies)}\n'
                     f'  auth-state: {_fmt_auth_cookie_state(now, state)}')
        debug_lines = ['Loaded cookie details (name=value@domain):']
        for c in self.session.cookies:
            debug_lines.append(f'  {c.name}={c.value}@{c.domain}')
        logging.debug('\n'.join(debug_lines))


def response_strip(raw):
    """return json content part of an API response"""
    return raw[raw.find('{'): raw.rfind('}') + 1]


def _cookie_names_from_header(header):
    """Parse a `Cookie` request header into a compact `name1,name2,...` string
    (values are intentionally dropped). Returns '' when empty."""
    if not header:
        return ''
    parts = []
    for pair in header.split(';'):
        pair = pair.strip()
        if not pair:
            continue
        name = pair.split('=', 1)[0].strip()
        if name:
            parts.append(name)
    return ','.join(parts)


def _set_cookie_summary(header):
    """Parse a single `Set-Cookie` header into `name@domain` (domain defaults
    to the cookie's own host when the attribute is absent)."""
    if not header:
        return ''
    name = ''
    domain = ''
    for attr in header.split(';'):
        attr = attr.strip()
        if '=' in attr:
            k, v = attr.split('=', 1)
            k, v = k.strip(), v.strip()
            if k == 'domain':
                domain = v
            elif name == '':
                name = k
        elif attr == 'domain':
            domain = ''
    return f'{name}@{domain}' if name else ''


def _fmt_json_body(text):
    """Return a pretty one-line-ish JSON summary of a response body, or a byte
    length note for non-JSON payloads. Kept short to stay readable at INFO/DEBUG."""
    text = (text or '').strip()
    if not text:
        return '(empty body)'
    try:
        obj = json.loads(text)
        pretty = json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
        if len(pretty) > 800:
            pretty = pretty[:800] + f'... (+{len(pretty) - 800} chars)'
        return pretty
    except (json.JSONDecodeError, ValueError):
        return f'(non-JSON body, {len(text)} bytes)'


def _describe_cookies(cookies):
    """Compact `name@domain` list for a cookie jar / iterable."""
    return ', '.join(f'{c.name}@{c.domain}' for c in cookies)


# Critical auth cookies whose presence/expiry determine whether silent renewal
# or a logged-in session is possible. Used for diagnostics when auto-login fails.
_CRITICAL_COOKIES = (
    'SCF',      # encrypted TGT (long-lived) on .sina.com.cn
    'SUB',      # session SUB on .weibo.com
    'SUBP',     # session SUBP on .weibo.com
    'ALF',      # absolute expiry timestamp (epoch sec) on .sina.com.cn
    'SVB',      # SSO validation on .login.sina.com.cn
    'ALC',      # SSO login cookie on .login.sina.com.cn
)


def _auth_cookie_state(cookies):
    """Return a mapping name -> (present: bool, domain: str, expires: int|None).

    `expires` is the epoch-second expiry if the cookie carries one, else None.
    Used to diagnose which credential expired before/after a renewal attempt.
    """
    found = {}
    for c in cookies:
        if c.name in _CRITICAL_COOKIES:
            found[c.name] = (
                True,
                getattr(c, 'domain', ''),
                getattr(c, 'expires', None),
            )
    state = {}
    now = int(time.time())
    for name in _CRITICAL_COOKIES:
        info = found.get(name)
        if not info:
            state[name] = (False, '', None)
        else:
            _, domain, expires = info
            state[name] = (True, domain, expires)
    return now, state


def _fmt_auth_cookie_state(now, state):
    """One-line summary of critical auth cookies for INFO diagnostics.

    Shows present/absent and, for cookies with an expiry, whether expired and by
    how much. Values are intentionally omitted.
    """
    parts = []
    for name in _CRITICAL_COOKIES:
        present, domain, expires = state[name]
        if not present:
            parts.append(f'{name}=MISSING')
            continue
        if expires is None:
            parts.append(f'{name}=OK@{domain}')
        elif expires <= now:
            parts.append(f'{name}=EXPIRED({now - expires}s ago)@{domain}')
        else:
            parts.append(f'{name}=valid({expires - now}s left)@{domain}')
    return ' '.join(parts)


def alt_from_data(data):
    """Extract the scan `alt` token from a qrcode/check confirm response.

    The confirmed response does NOT expose `alt` as a top-level key; instead it
    lives as the `alt` query parameter inside `data.url`, e.g.
    data.url = '.../sso/v2/login?...&alt=ALT-...&...'. Parse it from there.
    """
    if not isinstance(data, dict):
        return None
    if data.get('alt'):
        return data['alt']
    url = data.get('url')
    if not url:
        return None
    vals = parse_qs(urlparse(url).query).get('alt')
    return vals[0] if vals else None


def callback_str():
    """return callback param in API request"""
    return f'STK_{str(time.time_ns())[:16]}'


class _QRWindow:
    """A self-contained QR display window that drives the scan-poll loop.

    tkinter must run on the main thread, so this window owns the poll loop via
    `root.after` timers (no background thread -> no cross-thread Tcl tearing
    down). `run(auth, max_rounds)` blocks (on `mainloop`) until the scan is
    confirmed (window auto-closes) or the retry cap is hit.

    Behavior:
      - auto-popup:    a window is shown as soon as the first QR is generated.
      - auto-close:    on successful scan the window is destroyed and login
                       finalizes (sso_login / save_cookies / test_login).
      - auto-refresh:  on QR expiry/used/exception a fresh QR replaces the old
                       one in the same window (up to `max_rounds` times).

    Falls back to `os.startfile` (external viewer, no auto-close) when tkinter
    is unavailable (e.g. a headless environment).
    """

    def __init__(self, title='Weibo QR Login'):
        try:
            import tkinter as tk
            from PIL import ImageTk
        except Exception:
            self._tk = None
            self._root = None
            return
        self._tk = tk
        self._ImageTk = ImageTk
        self._title = title
        self._root = tk.Tk()
        self._root.withdraw()  # hide until the QR image is ready
        self._root.title(title)
        self._root.resizable(False, False)
        self._label = tk.Label(self._root)
        self._label.pack(padx=20, pady=20)
        self._photo = None
        self._auth = None
        self._qr_id = None
        self._round = 0
        self._max_rounds = 5
        self._shown = False  # tracks first deiconify

    def run(self, auth, max_rounds=5):
        """Drive the QR login loop. Blocks until finalized or abandoned."""
        self._auth = auth
        self._max_rounds = max_rounds
        if self._root is None:
            self._run_headless(auth, max_rounds)
            return
        self._new_round()
        self._root.mainloop()

    def _new_round(self):
        self._round += 1
        if self._round > self._max_rounds:
            logging.error(f'login(): exceeded max QR refresh rounds '
                          f'({self._max_rounds}).')
            self._root.destroy()
            return
        qr_id, img = self._auth.qr_code_gen()
        self._qr_id = qr_id
        self.show(img)
        logging.info(f'QR round {self._round}/{self._max_rounds}: waiting for scan...')
        self._root.after(4000, self._poll)

    def show(self, img):
        """Display (or refresh) the QR image in the window."""
        photo = self._ImageTk.PhotoImage(img)
        self._photo = photo  # keep reference alive
        self._label.configure(image=photo)
        if not self._shown:
            self._root.deiconify()  # first display: make visible
            self._shown = True
        self._root.lift()
        self._root.update_idletasks()

    def _poll(self):
        check = self._auth.check_qr_code_scan(self._qr_id)
        if check['success']:
            logging.info('QR scanned & confirmed; finalizing login.')
            login_url = check.get('login_url')
            self._auth.sso_login(login_url)
            self._auth.save_cookies()
            self._auth.test_login()
            self._root.destroy()
            return
        if check.get('terminated'):
            reason = check.get('reason')
            logging.warning(f'QR {reason}; refreshing.')
            self._new_round()
            return
        self._root.after(4000, self._poll)

    def _run_headless(self, auth, max_rounds):
        """Fallback when tkinter is unavailable: poll with a blocking loop and
        open each fresh QR in the OS default viewer (no auto-close)."""
        for self._round in range(1, max_rounds + 1):
            qr_id, img = auth.qr_code_gen()
            self._qr_id = qr_id
            path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '..', 'tmp', 'weibo_qr.png')
            img.save(path)
            logging.info(f'QR round {self._round}/{max_rounds} (headless): '
                         f'open {path} to scan.')
            try:
                os.startfile(path)
            except Exception:
                pass
            while True:
                check = auth.check_qr_code_scan(qr_id)
                if check['success']:
                    auth.sso_login(check.get('login_url'))
                    auth.save_cookies()
                    auth.test_login()
                    return
                if check.get('terminated'):
                    logging.warning(f'QR {check.get("reason")}; refreshing.')
                    break
                time.sleep(4)

    def close(self):
        if self._root is not None:
            self._root.destroy()


def main():
    ap = argparse.ArgumentParser(description='Weibo login (multi-user).')
    ap.add_argument('--uid', default=None,
                    help='Numeric Weibo UID. If a saved session exists it is reused; '
                         'otherwise an error is shown. Mutually exclusive in use '
                         'with --user (only one needed).')
    ap.add_argument('--user', default=None,
                    help='Human-friendly login label. Used when logging in for the '
                         'first time; the real UID is captured after the scan.')
    ap.add_argument('--no-prompt', action='store_true',
                    help='Do not prompt; use the only/existing identity or "default".')
    args = ap.parse_args()

    auth = Auth()
    if not auth.resolve_uid(args.uid, args_user=args.user, prompt=not args.no_prompt):
        # --uid given but no saved session: instruct the user and exit.
        return
    auth.load()
    if auth.test_login():
        logging.info('Already logged in as "%s".' % (auth.uid or auth.label))
        return
    # Try a silent renewal (uses long-term SCF cookie) before a full QR login.
    if auth.renew():
        logging.info('Session renewed for "%s".' % (auth.uid or auth.label))
        return
    auth.login()
    logging.info('Login complete for "%s".' % (auth.uid or auth.label))



if __name__ == '__main__':
    main()
