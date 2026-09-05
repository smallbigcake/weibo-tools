from auth import Auth


class Session(object):
    def __init__(self):
        self.cookies = None

    def login(self, uid=None, user=None, no_prompt=False):
        auth = Auth()
        if not auth.resolve_uid(uid, args_user=user, prompt=not no_prompt):
            return
        auth.load()
        if not auth.test_login():
            auth.login()
        self.cookies = auth.session.cookies


if __name__ == '__main__':
    session = Session()
    session.login()
