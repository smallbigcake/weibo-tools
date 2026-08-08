import json
import random
import uuid
from urllib.parse import parse_qs, urlparse, urlencode

import time
import qrcode
import requests

import logging
from logging import config


logging.config.fileConfig('config/logging.ini')

COOKIE_PATH = './cookies.weibo'

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
    def __init__(self):
        self.cookies = []
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})

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
        logging.info('Saving cookies to disk.')
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
        # Diff against what was on disk to report what changed (updated keys).
        try:
            with open(COOKIE_PATH, 'r', encoding='utf-8') as f:
                prev = {c['name'] + '@' + c.get('domain', '') for c in json.load(f)}
        except (FileNotFoundError, json.JSONDecodeError):
            prev = set()
        curr = {c['name'] + '@' + c.get('domain', '') for c in cookies_data}
        updated = sorted(curr & prev)
        added = sorted(curr - prev)
        with open(COOKIE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cookies_data, f, ensure_ascii=False, indent=2)
        logging.info(f'Saved {len(cookies_data)} cookies.\n'
                     f'  keys: {_describe_cookies(self.session.cookies)}\n'
                     f'  updated ({len(updated)}): {", ".join(updated) or "(none)"}\n'
                     f'  added  ({len(added)}): {", ".join(added) or "(none)"}')
        debug_lines = ['Saved cookie details (name=value@domain):']
        for c in self.session.cookies:
            debug_lines.append(f'  {c.name}={c.value}@{c.domain}')
        logging.debug('\n'.join(debug_lines))

    def login(self):

        logging.info('Start logging in...')
        self.visitor_session_gen()
        self.crossdomain_visitor_gen()

        qr_id = self.qr_code_gen()

        while True:
            check_result = self.check_qr_code_scan(qr_id)
            if check_result['success']:
                break
            if check_result.get('terminated'):
                logging.error(f'QR polling terminated early: {check_result.get("reason")}')
                return
            time.sleep(4)
        login_url = check_result.get('login_url')

        self.sso_login(login_url)

        self.save_cookies()

        self.test_login()

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
        qr_img.show()
        return qr_id

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

        import os
        import base64
        qr_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tmp', 'weibo_qr.png')
        os.makedirs(os.path.dirname(qr_path), exist_ok=True)
        # The popup build returns a base64 data string; some deployments return
        # a plain URL. Handle both so we always end up with a local PNG.
        if image.startswith('data:') or (len(image) > 200 and not image.startswith('http')):
            b64 = image.split(',', 1)[1] if image.startswith('data:') else image
            with open(qr_path, 'wb') as f:
                f.write(base64.b64decode(b64))
        else:
            img_resp = self._request('GET', image, headers={'Referer': 'https://weibo.com/'})
            with open(qr_path, 'wb') as f:
                f.write(img_resp.content)
        logging.info(f'QR image saved to: {qr_path}')
        logging.info(f'Display QR Image for login: {image}')
        os.startfile(qr_path)
        return qr_id


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
        logging.info('Loading cookies from disk.')
        try:
            with open(COOKIE_PATH, 'r', encoding='utf-8') as f:
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


def main():
    auth = Auth()
    auth.load()
    if auth.test_login():
        logging.info('Already logged in.')
        return
    # Try a silent renewal (uses long-term SCF cookie) before a full QR login.
    if auth.renew():
        return
    auth.login()



if __name__ == '__main__':
    main()
