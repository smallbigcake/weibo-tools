import json
import random

import requests
import time
import qrcode

from http.cookiejar import MozillaCookieJar

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

WEIBO_URL_TEST_LOGIN = 'https://reward.media.weibo.com/hreward/aj/reward/check?mid=YOUR_MID&state=1&welfare=0&uid=YOUR_UID&bid=YOUR_BID&oid=YOUR_OID&seller=YOUR_UID&showmenu=0&topnavstyle=1&sign=YOUR_SIGN&uicode=20000391'

WEIBO_URL_SSO = 'https://login.sina.com.cn/sso/login.php'

WEIBO_URL_TEST_VISITOR_READ = 'https://weibo.com/YOUR_UID/YOUR_BLOG_ID'

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

        response = self.session.get(WEIBO_URL_SSO, params=params)   # This will lead to 3 redirects.
        logging.info(response.status_code)
        logging.info(response.headers)


    def save_cookies(self):
        logging.info('Saving cookies.')
        file_cookiejar = MozillaCookieJar()
        for cookie in self.session.cookies:
            logging.info(cookie)
            file_cookiejar.set_cookie(cookie)
        file_cookiejar.save(filename=COOKIE_PATH)

    def login(self):

        logging.info('Start logging in...')
        self.visitor_session_gen()
        self.crossdomain_visitor_gen()

        self.test_vistor_read()

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


    def test_vistor_read(self):
        logging.info('Testing vistor read count.')
        response = self.session.get(WEIBO_URL_TEST_VISITOR_READ)

    def test_login(self):
        logging.info('Checking login status.')
        response = self.session.get(WEIBO_URL_TEST_LOGIN)
        ret_dict = json.loads(response.text)
        if ret_dict['code'] == 100000:
            logging.info(ret_dict['msg'])
            return True
        else:
            logging.info(ret_dict['msg'])
            return False

    def load(self):
        logging.info('Loading cookies from disk.')
        file_cookiejar = MozillaCookieJar()
        file_cookiejar.load(filename=COOKIE_PATH)
        for cookie in file_cookiejar:
            logging.debug(cookie)
            self.session.cookies.set_cookie(cookie)


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
