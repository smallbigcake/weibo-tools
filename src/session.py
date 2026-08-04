from auth import Auth


class Session(object):
    def __init__(self):
        self.cookies = None

    def login(self):
        auth = Auth()
        auth.load()
        if not auth.test_login():
            auth.login()
        self.cookies = auth.session.cookies


if __name__ == '__main__':
    session = Session()
    session.login()
