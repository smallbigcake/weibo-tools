import json
import random

import requests
import time
import qrcode

import logging
from logging import config


logging.config.fileConfig('config/logging.ini')

COOKIE_PATH = './cookies.weibo'

WEIBO_HOME_URL = 'https://weibo.com'
WEIBO_URL_GENVISTOR_2 = 'https://passport.weibo.com/visitor/genvisitor2'
WEIBO_URL_VISITOR_CROSSDOMAIN = 'https://login.sina.com.cn/visitor/visitor'

WEIBO_URL_QR_CHECK = 'https://login.sina.com.cn/sso/qrcode/check'

WEIBO_URL_QR_CODE_GEN = 'https://login.sina.com.cn/sso/qrcode/image'

WEIBO_URL_QR_LOGIN = 'https://passport.weibo.cn/signin/qrcode/scan?qr={QR_ID}&sinain'

WEIBO_URL_TEST_LOGIN = 'https://weibo.com/ajax/config/get_config'

WEIBO_URL_SSO = 'https://login.sina.com.cn/sso/login.php'

RET_CODE_QR_UNUSED = 50114001
RET_CODE_QR_SCANNED = 50114002
RET_CODE_QR_CONFIRMED = 20000000


class Auth(object):
    def __init__(self):
        self.cookies = []
        self.session = requests.Session()

    def visitor_session_gen(self):
        logging.info('Initializing visitor session.')
        content_type = 'application/x-www-form-urlencoded'
        headers = {'Content-Type': content_type}
        req_data = {
            'cb': 'visitor_gray_callback',
            'tid': '',
            'from': 'weibo'
        }
        response = self.session.post(WEIBO_URL_GENVISTOR_2, headers=headers, data=req_data)

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
        response = self.session.get(WEIBO_URL_VISITOR_CROSSDOMAIN, params=params, allow_redirects=False)


    def sso_login(self, alt):
        params = {
            'entry': 'weibo',
            'returntype': 'CROSSDOMAIN_BY_LOCATION',
            'alt': alt,
            'url': 'https://weibo.com/login.php'
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://weibo.com/',
        }

        # Step 1: request the SSO endpoint without auto-following redirects.
        # Weibo replies with a 432/302 that carries the cross-domain login
        # Location; following it manually guarantees the .weibo.com login
        # cookie is actually set (requests won't execute JS-based jumps).
        response = self.session.get(
            WEIBO_URL_SSO, params=params, headers=headers, allow_redirects=False
        )
        logging.info(f'SSO step1 status: {response.status_code}')

        # Step 2: follow the redirect chain ourselves so every Set-Cookie is
        # captured by the session (including the final .weibo.com SUB).
        max_hops = 5
        current = response
        for _ in range(max_hops):
            if current.status_code not in (301, 302, 303, 307, 308):
                break
            location = current.headers.get('Location')
            if not location:
                break
            if location.startswith('/'):
                location = 'https://login.sina.com.cn' + location
            logging.info(f'SSO redirect -> {location}')
            current = self.session.get(
                location, headers=headers, allow_redirects=False
            )
            logging.info(f'SSO hop status: {current.status_code}')

        # Step 3: hit the weibo.com login landing page to finalize the session
        # (this upgrades the temporary SUB into a valid logged-in session).
        self.session.get('https://weibo.com/login.php', headers=headers, allow_redirects=True)
        logging.info('SSO login finalized.')


    def save_cookies(self):
        logging.info('Saving cookies.')
        cookies_data = []
        for cookie in self.session.cookies:
            cookies_data.append({
                'name': cookie.name,
                'value': cookie.value,
                'domain': cookie.domain,
                'path': cookie.path,
                'secure': cookie.secure,
                'expires': cookie.expires,
                'http_only': bool(getattr(cookie, 'has_nonstandard_attr', lambda x: False)('HttpOnly') or
                                 getattr(cookie, '_rest', {}).get('HttpOnly') is not None),
            })
        with open(COOKIE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cookies_data, f, ensure_ascii=False, indent=2)
        logging.info(f'Saved {len(cookies_data)} cookies.')

    def login(self):

        logging.info('Start logging in...')
        self.visitor_session_gen()
        self.crossdomain_visitor_gen()

        qr_id = self.qr_code_gen()

        while True:
            check_result = self.check_qr_code_scan(qr_id)
            if check_result['success']:
                break
            time.sleep(2)

        self.sso_login(check_result['alt'])

        self.save_cookies()

        self.test_login()

    def check_qr_code_scan(self, qr_id):
        logging.info('Checking QR scanning status.')
        headers = {'Referer': 'https://weibo.com/'}

        params = {
            'entry': 'weibo',
            'qrid': qr_id,
            'callback': callback_str()
        }
        response = self.session.get(WEIBO_URL_QR_CHECK, headers=headers, params=params, allow_redirects=False)
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
            return {
                'success': True,
                'alt': ret_dict['data']['alt']
            }
        else:
            logging.info(f'Unexpected return code: {ret_dict["retcode"]}, msg: {ret_dict["msg"]}')
            return {
                'success': False
            }

    def qr_code_gen(self):
        params = {
            'entry': 'weibo',
            'size': 180,
            'callback': callback_str()
        }
        logging.info(params)

        headers = {'Referer': 'https://weibo.com/'}
        response = self.session.get(WEIBO_URL_QR_CODE_GEN, headers=headers, params=params)
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


    def test_login(self):
        logging.info('Checking login status via API.')
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
            response = self.session.get(
                WEIBO_URL_TEST_LOGIN, headers=headers, timeout=15
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
        logging.info(f"Login status: API returned ok={ret.get('ok')} (not logged in).")
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
        logging.info(f'Loaded {len(cookies_data)} cookies.')


def response_strip(raw):
    """return json content part of an API response"""
    return raw[raw.find('{'): raw.rfind('}') + 1]


def callback_str():
    """return callback param in API request"""
    return f'STK_{str(time.time_ns())[:16]}'


def main():
    auth = Auth()
    auth.load()
    if not auth.test_login():
        auth.login()



if __name__ == '__main__':
    main()
