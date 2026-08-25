import json
import logging
import os
import sys
import time

import requests

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from logutil import setup as _setup_logging
_setup_logging()

from session import Session

from requests import Session as RequestsSession

WEIBO_URL_CHAT_CONNECT = 'https://web.im.weibo.com/im/connect'
WEIBO_URL_CHAT_HANDSHAKE = 'https://web.im.weibo.com/im/handshake'
WEIBO_URL_CHAT_SUBSCRIBE = 'https://web.im.weibo.com/im/'
WEIBO_URL_SEND_MSG = 'https://api.weibo.com/webim/groupchat/send_message.json'

CHAT_CHANNEL_CONNECT = '/meta/connect'
CHAT_CHANNEL_HANDSHAKE = '/meta/handshake'
CHAT_CHANNEL_SUBSCRIBE = '/meta/subscribe'

CHAT_TYPE_GROUPCHAT = 'groupchat'
CHAT_SUB_TYPE_MSG = 321
CHAT_SUB_TYPE_RECALL = 331
CHAT_SUB_TYPE_CLEAR_UNREAD = 332

CHAT_INFO_SUB_TYPE_RED_ENVELOP = 101
CHAT_INFO_MEDIA_TYPE_LINK = 13

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

# Local config (may contain real UID / proxy -> NOT committed). It lives at the
# project ROOT under config/ (gitignored), separate from the in-package
# resources under src/. Fall back to the legacy src/config/ location so existing
# setups still work.
_SRC_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SRC_DIR)
CONFIG_CANDIDATES = [
    os.path.join(_PROJECT_ROOT, 'config', 'chat.ini'),
    os.path.join(_SRC_DIR, 'config', 'chat.ini'),
]
CONFIG_PATH = next((p for p in CONFIG_CANDIDATES if os.path.exists(p)),
                   CONFIG_CANDIDATES[0])


def load_config(path=CONFIG_PATH):
    """Load chat settings from an INI config file.

    Falls back to defaults when the file or a key is missing.
    """
    uid = 0
    group_gid = 0
    http_proxy = ''
    https_proxy = ''
    try:
        import configparser
        parser = configparser.ConfigParser()
        parser.read(path, encoding='utf-8')
        if parser.has_section('account'):
            uid = parser.getint('account', 'uid', fallback=uid)
            group_gid = parser.getint('account', 'group_gid', fallback=group_gid)
        if parser.has_section('proxy'):
            http_proxy = parser.get('proxy', 'http', fallback=http_proxy)
            https_proxy = parser.get('proxy', 'https', fallback=https_proxy)
    except Exception as e:
        logging.warning(f'Failed to read config {path}: {e}')

    proxies = {}
    if http_proxy:
        proxies['http'] = http_proxy
    if https_proxy:
        proxies['https'] = https_proxy
    return uid, group_gid, proxies


UID, CAKE_GROUP_GID, PROXIES = load_config()


class Chat(object):

    def __init__(self):
        self.session = Session()
        self.session.login()

        self.request_session = RequestsSession()
        if PROXIES:
            self.request_session.proxies.update(PROXIES)
        self.request_session.cookies = self.session.cookies
        # logging.info(self.session.cookies)

        self.id = 1
        self.client_id = None
        self.timeout = 0
        self.advice = True

    def handshake(self):
        logging.info(f'Handshaking. ID: {self.id}')
        params = [{
            'advice': {
                'interval': 0,
                'timeout': 60000
            },
            'channel': CHAT_CHANNEL_HANDSHAKE,
            'id': str(self.id),
            'minimumVersion': '1.0',
            'supportedConnectionTypes': [
                'long-polling',
                'callback-polling'
            ],
            'version': '1.0'
        }]
        headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Referer': 'https://api.weibo.com/',
            'Origin': 'https://api.weibo.com',
            'User-Agent': USER_AGENT
        }

        response = self.request_session.post(WEIBO_URL_CHAT_HANDSHAKE, headers=headers, json=params, verify='cert/im_weibo_cert_chain.crt')
        logging.info(response.status_code)
        logging.info(response.headers)
        logging.info(response.text)
        response_list = response.json()
        self.client_id = response_list[0]['clientId']
        self.id += 1

    def subscribe(self):
        params = [{
            'channel': CHAT_CHANNEL_SUBSCRIBE,
            'clientId': self.client_id,
            'id': str(self.id),
            'subscription': f'/im/{UID}',
        }]
        headers = {
            'User-Agent': USER_AGENT
        }
        try:
            logging.info(f'Subscribing to channel. ID: {self.id}')
            response = self.request_session.post(WEIBO_URL_CHAT_SUBSCRIBE, headers=headers, json=params)
        except requests.exceptions.ReadTimeout as e:
            return
        # logging.info(response.status_code)
        # logging.info(response.request.headers)
        response_list = response.json()
        logging.info(response_list)

        self.id += 1

    def connect(self):
        params = [{
            'channel': CHAT_CHANNEL_CONNECT,
            'clientId': self.client_id,
            'id': str(self.id),
            'connectionType': 'long-polling',
        }]
        if self.advice:
            params[0].update({
                'advice': {
                    'timeout': self.timeout,
                },
            })
        headers = {
            'User-Agent': USER_AGENT
        }
        try:
            # logging.info(f'Long polling started. ID: {self.id}')
            response = self.request_session.post(WEIBO_URL_CHAT_CONNECT, headers=headers, json=params)
            # logging.info('Long polling received.')
        except requests.exceptions.ReadTimeout as e:
            # logging.info('Long polling timeout.')
            return
        # logging.info(response.status_code)
        # logging.info(response.request.headers)
        try:
            response_list = response.json()
        except Exception as e:
            logging.exception(response.text)
            return -1
        for item in response_list:
            try:
                # logging.info(item)
                if item['channel'] != CHAT_CHANNEL_CONNECT and item['data']['type'] == CHAT_TYPE_GROUPCHAT:
                    logging.info('=======================================')
                    if item['data']['sub_type'] == CHAT_SUB_TYPE_MSG:
                        logging.info(f'Group Name: {item["data"]["info"]["group_name"]}, User: {item["data"]["info"]["from_user"]["screen_name"]}, Content: {item["data"]["info"]["content"]}')
                        if item['data']['info'].get('sub_type') == CHAT_INFO_SUB_TYPE_RED_ENVELOP:
                            self.send_msg(item['data']['info']['url_objects'][0]['info']['url_long'])
                    elif item['data']['sub_type'] == CHAT_SUB_TYPE_CLEAR_UNREAD:
                        logging.info('Clear unread messages.')
                    else:
                        logging.info(item)
                if item['channel'] == CHAT_CHANNEL_CONNECT and item.get('advice', {}).get('reconnect', None) == 'retry':
                    logging.info('Remove advice.')
                    self.advice = False

            except Exception as e:
                logging.exception(e)
                logging.info(item)
        self.id += 1

    def send_msg(self, msg):
        params = {
            'setTimeout': 50,
            'content': msg,
            'id': CAKE_GROUP_GID,
            'media_type': 0,
            'annotations': json.dumps({
                "webchat": 1,
                "clientid": self.client_id
            }),
            'is_encoded': 0,
            'source': 209678993
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': USER_AGENT,
            'Origin': 'https://api.weibo.com',
            'Referer': 'https://api.weibo.com/chat'
        }
        response = self.request_session.post(WEIBO_URL_SEND_MSG, headers=headers, data=params)
        # logging.info(response.status_code)
        # logging.info(response.request.headers)
        # logging.info(response.request.body)
        # logging.info(response.text)


if __name__ == '__main__':
    chat = Chat()
    # chat.request_session.get('https://weibo.com')
    chat.handshake()
    chat.subscribe()
    while True:
        chat.connect()
        # time.sleep(1)
