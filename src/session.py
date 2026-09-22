from auth import Auth


class Session(object):
    def __init__(self):
        self.cookies = None

    def login(self, uid=None, user=None, no_prompt=False, force=False):
        """Ensure a logged-in session, then expose its cookies on self.cookies.

        Delegates to ``Auth.ensure_session`` — the single canonical recovery
        path (test_login -> silent SSO renew -> QR login). ``force=True``
        re-scans even when test_login already passes. Unlike the old inline
        implementation this also performs the silent SSO renew, so callers
        (e.g. chat.py) now recover short-term expiries without a human scan.
        """
        auth = Auth()
        if not auth.resolve_uid(uid, args_user=user, prompt=not no_prompt):
            return
        auth.load()
        auth.ensure_session(force=force, allow_renew=True)
        self.cookies = auth.session.cookies


if __name__ == '__main__':
    session = Session()
    session.login()
