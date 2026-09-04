"""Regression tests for the three high-severity fixes.

Everything is mocked: no network call is made and no real cookie jar is read,
so these tests are safe to run any number of times against a real account.

Run from the project root:
    python src/test/test_fixes_regression.py -v
or:
    python -m unittest discover -s src/test -p 'test_fixes_regression.py' -v
"""
import io
import json
import os
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from unittest import mock

# src/ is the import root for every module under test.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from requests.cookies import RequestsCookieJar

from weibo_tool import cli
from weibo_tool import http_engine
from weibo_tool.commands import blacklist_deep as bd
from weibo_tool.commands import following_deep as fd
from weibo_tool.commands import profile_visit as pv
from weibo_tool.commands import top_followed as tf


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------

class _Resp(object):
    """Minimal stand-in for `requests.Response`."""

    def __init__(self, status_code=200, payload=None, headers=None, text=''):
        self.status_code = status_code
        self.reason = 'OK'
        self.headers = headers or {}
        self.text = text
        self.content = (text or '').encode('utf-8')
        self._payload = payload

    def json(self):
        if self._payload is None:
            raise ValueError('not json')
        return self._payload


class _FakeAuth(object):
    """Stand-in for `auth.Auth`. `ensure_session` is a Mock so each test can
    decide whether the session is recoverable (throttling) or not."""

    def __init__(self, session_alive=True):
        self.session = mock.Mock()
        self.session.cookies = RequestsCookieJar()
        self.session.headers = {'User-Agent': 'UA/1.0'}
        self.ensure_session = mock.Mock(return_value=session_alive)

    def resolve_uid(self, *a, **k):
        return True


# ---------------------------------------------------------------------------
# Fix 1: cli.main propagates the subcommand exit code
# ---------------------------------------------------------------------------

class TestCliExitCode(unittest.TestCase):
    def _run_with(self, rc):
        import argparse

        class _Parser(object):
            def parse_args(self, argv=None):
                ns = argparse.Namespace(uid='x', user=None, no_prompt=True,
                                        command='fake')
                ns.run = lambda args, auth: rc
                return ns

        with mock.patch.object(cli, 'build_parser', lambda: _Parser()), \
             mock.patch.object(cli, 'Auth', lambda: _FakeAuth()):
            return cli.main([])

    def test_exit_codes(self):
        # (rc returned by the subcommand, expected process exit code).
        # NOTE: a list of pairs, NOT a dict — in Python `1 == True` and
        # `0 == False`, so a dict would silently collapse those entries.
        cases = [(1, 1), (2, 2), (0, 0), (None, 0), (True, 0), (False, 1),
                 ('boom', 1)]
        for rc, expected in cases:
            self.assertEqual(self._run_with(rc), expected,
                             'rc=%r should exit %s' % (rc, expected))


# ---------------------------------------------------------------------------
# Fix 3a: _request_json honours custom headers + renews a dead session
# ---------------------------------------------------------------------------

class TestRequestJson(unittest.TestCase):
    def test_default_headers_are_used_when_none_given(self):
        auth = _FakeAuth()
        auth.session.get.return_value = _Resp(200, {'ok': 1})
        bd._request_json(auth, 'https://weibo.com/x')
        sent = auth.session.get.call_args[1]['headers']
        self.assertEqual(sent['Referer'], 'https://weibo.com/')
        self.assertEqual(sent['x-requested-with'], 'XMLHttpRequest')
        self.assertNotIn('client-version', sent)

    def test_custom_headers_replace_the_defaults(self):
        """profile-visit's browser-like headers must reach the wire verbatim."""
        auth = _FakeAuth()
        auth.session.get.return_value = _Resp(200, {'ok': 1})
        custom = {'User-Agent': 'UA/1.0', 'client-version': 'v1.1.244',
                  'server-version': 'v2026.09.02.2',
                  'referer': 'https://weibo.com/u/123'}
        bd._request_json(auth, 'https://weibo.com/x', headers=custom)
        sent = auth.session.get.call_args[1]['headers']
        self.assertEqual(sent, custom)

    def test_dead_session_is_renewed_and_request_retried(self):
        """302 -> login.php must trigger recovery, then retry the same URL."""
        auth = _FakeAuth()
        login_redirect = _Resp(302, None,
                               {'Location': 'https://login.sina.com.cn/sso/'
                                            'login.php?useticket=1'})
        good = _Resp(200, {'ok': 1, 'data': {'user': {'id': 1}}})
        auth.session.get.side_effect = [login_redirect, good]

        with mock.patch.object(http_engine, '_try_recover_session',
                               return_value=True) as recover:
            out = bd._request_json(auth, 'https://weibo.com/ajax/profile/info')

        self.assertEqual(out, {'ok': 1, 'data': {'user': {'id': 1}}})
        self.assertEqual(auth.session.get.call_count, 2)
        recover.assert_called_once_with(auth)


# ---------------------------------------------------------------------------
# Fix 3b: visit_one status mapping
# ---------------------------------------------------------------------------

class TestVisitOne(unittest.TestCase):
    def _auth(self):
        return _FakeAuth()

    def test_ok_returns_the_user_object(self):
        user = {'id': 42, 'screen_name': 'someone'}
        with mock.patch.object(pv, '_request_json',
                               return_value={'ok': 1, 'data': {'user': user}}) as rj:
            status, got = pv.visit_one(self._auth(), '42')
        self.assertEqual(status, 'ok')
        self.assertEqual(got, user)
        # the browser-like headers must have been forwarded
        self.assertIn('client-version', rj.call_args[1]['headers'])

    def test_no_response_is_retryable_not_permanent(self):
        with mock.patch.object(pv, '_request_json', return_value=None):
            status, got = pv.visit_one(self._auth(), '42')
        self.assertEqual((status, got), ('ratelimited', None))

    def test_banned_account_is_permanent(self):
        body = {'ok': 0, 'error_type': 'link',
                'url': 'https://weibo.com/sorry?usernotexists&msg=%E5%B0%81%E7%A6%81'}
        with mock.patch.object(pv, '_request_json', return_value=body):
            status, got = pv.visit_one(self._auth(), '42')
        self.assertEqual((status, got), ('banned', None))

    def test_frozen_account_is_permanent(self):
        with mock.patch.object(pv, '_request_json',
                               return_value={'ok': 0, 'message': '账号有问题'}):
            status, got = pv.visit_one(self._auth(), '42')
        self.assertEqual((status, got), ('banned', None))


# ---------------------------------------------------------------------------
# Fix 3c: _visit_list aborts instead of spinning, and keeps its progress
# ---------------------------------------------------------------------------

class TestVisitListAbortGuard(unittest.TestCase):
    def _drive(self, auth, uids, ok_uids):
        """Run _visit_list with everything mocked out; return (stdout, mock)."""
        def fake_visit(_auth, uid):
            return ('ok', {'id': uid}) if uid in ok_uids else ('ratelimited', None)

        args = mock.Mock(limit=0, reset=False, update_profile=False)
        buf = io.StringIO()
        with mock.patch.object(pv, 'CACHE_ROOT', tempfile.mkdtemp()), \
             mock.patch.object(pv, 'visit_one', side_effect=fake_visit) as visit, \
             mock.patch.object(pv, '_sleep', lambda *a, **k: None), \
             mock.patch.object(pv.time, 'sleep'), \
             mock.patch.object(pv, '_verify_registered', return_value=ok_uids), \
             redirect_stdout(buf):
            rc = pv._visit_list(auth, 'owner', 'following', uids, args)
            tmp = pv.CACHE_ROOT
            calls = visit.call_count
            sleeps = pv.time.sleep.call_args_list
        return buf.getvalue(), calls, sleeps, tmp, rc

    def test_dead_session_aborts_early_and_keeps_progress(self):
        uids = ['u%03d' % i for i in range(1, 101)]
        # First 12 visits succeed and are verifiable; everything after fails,
        # and the session cannot be recovered.
        ok_uids = set(uids[:12])
        auth = _FakeAuth(session_alive=False)

        out, calls, sleeps, tmp, _ = self._drive(auth, uids, ok_uids)

        self.assertIn('aborting', out, 'the run must stop instead of spinning')
        # 12 successes + `_SESSION_PROBE_AFTER` (5) failures, then abort.
        self.assertEqual(calls, 17)
        # It must NOT sit through the throttling cool-down on the way out.
        self.assertEqual(sleeps, [], 'aborting should not waste a 60s pause')
        self.assertIn('ABORTED', out)

        progress = os.path.join(tmp, 'owner', 'progress_following.json')
        self.assertTrue(os.path.exists(progress),
                        'progress must be persisted before aborting')
        with open(progress, encoding='utf-8') as f:
            saved = set(json.load(f))
        self.assertEqual(saved, ok_uids,
                         'the 12 verified visits must survive the abort; '
                         'failed uids must NOT be credited')

    def test_throttling_does_not_abort(self):
        """A live session means we are only being throttled: cool down, go on."""
        uids = ['u%03d' % i for i in range(1, 24)]
        ok_uids = set(uids[:2])
        auth = _FakeAuth(session_alive=True)

        out, calls, sleeps, tmp, _ = self._drive(auth, uids, ok_uids)

        self.assertNotIn('aborting', out)
        self.assertIn('DONE', out)
        self.assertEqual(calls, len(uids), 'every uid must still be attempted')
        # 21 failures -> a cool-down pause every 5.
        self.assertEqual(len(sleeps), 4)
        self.assertTrue(all(c[0][0] == pv._COOLDOWN_SECONDS for c in sleeps))

    def test_a_fully_visited_list_is_not_revisited(self):
        """Sanity check that the progress file actually gates the traversal."""
        tmp = tempfile.mkdtemp()
        uids = ['a', 'b']
        with mock.patch.object(pv, 'CACHE_ROOT', tmp), \
             mock.patch.object(pv, 'visit_one') as visit:
            # seed progress
            pv._save_visited(pv._progress_path('owner', 'following'), set(uids))
            args = mock.Mock(limit=0, reset=False, update_profile=False)
            buf = io.StringIO()
            with redirect_stdout(buf):
                pv._visit_list(_FakeAuth(), 'owner', 'following', uids, args)
        visit.assert_not_called()
        self.assertIn('fully visited', buf.getvalue())


# ---------------------------------------------------------------------------
# Fix 2: following_deep keeps the subject roster out of the follow cache
# ---------------------------------------------------------------------------

class TestFollowingDeepCacheDirs(unittest.TestCase):
    def test_roster_and_per_user_caches_are_separate(self):
        self.assertNotEqual(fd._following_cache_path('TEST_SUBJECT_UID'),
                            fd._follow_cache_path('TEST_SUBJECT_UID'))
        self.assertTrue(fd._following_cache_path('x').endswith(
            os.path.join('lists', 'x.json')))
        self.assertTrue(fd._follow_cache_path('x').endswith(
            os.path.join('follows', 'x.json')))


class TestTopFollowedAggregate(unittest.TestCase):
    def test_subject_roster_is_not_counted_as_a_follow_list(self):
        tmp = tempfile.mkdtemp()

        def dump(name, obj):
            with open(os.path.join(tmp, name), 'w', encoding='utf-8') as f:
                json.dump(obj, f)

        # Genuine per-user follow caches always carry 'sample'.
        dump('A.json', {'uid': 'A', 'count': 2, 'uids': ['1', '2'], 'sample': []})
        dump('B.json', {'uid': 'B', 'count': 1, 'uids': ['1'], 'sample': []})
        # A subject roster (no 'sample') left behind by the pre-fix layout.
        dump('SUBJECT.json', {'uid': 'SUBJECT', 'count': 2, 'uids': ['1', '2']})

        buf = io.StringIO()
        with redirect_stdout(buf):
            ranked = tf._aggregate(follow_dir=tmp)

        # Without the filter, '1' and '2' would each be inflated by +1.
        self.assertEqual(ranked, [('1', 2), ('2', 1)])
        self.assertIn('skipped 1 non-follow-list file', buf.getvalue())


# ---------------------------------------------------------------------------
# Medium fix #2: --uids uses its own progress file (no following-pollution)
# ---------------------------------------------------------------------------

class TestProfileVisitUidsProgress(unittest.TestCase):
    def test_uids_mode_uses_its_own_progress_file(self):
        tmp = tempfile.mkdtemp()
        uids = ['a', 'b']
        args = mock.Mock(limit=0, reset=False, update_profile=False)
        auth = _FakeAuth()
        with mock.patch.object(pv, 'CACHE_ROOT', tmp), \
             mock.patch.object(pv, 'visit_one', return_value=('ok', {'id': 'x'})), \
             mock.patch.object(pv, '_sleep', lambda *a, **k: None), \
             mock.patch.object(pv.time, 'sleep'), \
             mock.patch.object(pv, '_verify_registered', return_value=set()), \
             redirect_stdout(io.StringIO()):
            pv._visit_list(auth, 'owner', 'uids', uids, args, force=True)

        # The regular following progress must stay untouched...
        self.assertFalse(os.path.exists(
            os.path.join(tmp, 'owner', 'progress_following.json')))
        # ...while a dedicated uids progress file records the --uids run.
        prog = os.path.join(tmp, 'owner', 'progress_uids.json')
        self.assertTrue(os.path.exists(prog))
        with open(prog, encoding='utf-8') as f:
            saved = set(json.load(f))
        self.assertEqual(saved, set(uids))


# ---------------------------------------------------------------------------
# Medium fix #3: relations_sync pagination must never spin forever
# ---------------------------------------------------------------------------

class TestRelationSyncNoInfiniteLoop(unittest.TestCase):
    def test_web_fans_stops_on_same_page_echo(self):
        import weibo_tool.commands.relations_sync as rs

        auth = _FakeAuth()
        # The server keeps echoing the SAME page number (with a non-empty user
        # list and no forward progress). The old code would loop up to
        # max_pages (effectively a hang); the guard must stop it at once.
        def fake_fetch_page(a, url, uid, kind, source, page, resume):
            return {'ok': 1, 'users': [{'id': 'x', 'follow_me': True}],
                    'next_page': page}, False

        with mock.patch.object(rs, '_fetch_page', side_effect=fake_fetch_page), \
             mock.patch.object(rs, '_sleep', lambda *a, **k: None), \
             mock.patch.object(
                 rs, '_build_record',
                 lambda u, s, f=None: {'uid': str(u.get('id'))}):
            records, _, _, stop, _, _ = rs._fetch_web_fans(
                auth, 'owner', 'fansCount', 100000, False, False)

        self.assertEqual(stop, 'no_more_pages')
        # Only the first page's users survive — no infinite re-fetch.
        self.assertEqual(len(records), 1)


# ---------------------------------------------------------------------------
# Medium fix #4: top_followed share uses the full follow-edge universe
# ---------------------------------------------------------------------------

class TestTopFollowedShare(unittest.TestCase):
    def _run_with(self, follow_dir, data_dir):
        def dump(name, obj):
            with open(os.path.join(follow_dir, name), 'w', encoding='utf-8') as f:
                json.dump(obj, f)

        # Three follow lists: uid '1' appears 3x, '2' 2x, '3' 1x -> 6 edges.
        dump('A.json', {'uid': 'A', 'count': 1, 'uids': ['1'], 'sample': []})
        dump('B.json', {'uid': 'B', 'count': 1, 'uids': ['1', '2'], 'sample': []})
        dump('C.json', {'uid': 'C', 'count': 1, 'uids': ['1', '2', '3'], 'sample': []})

        args = mock.Mock(source='blacklist', top=10, enrich=False,
                         exclude_weibo_official=False,
                         exclude_state_media=False, exclude_official_media=False,
                         json=None, csv=None, viewer_uid=None, viewer_user=None,
                         no_prompt=True)
        with mock.patch.object(tf, 'FOLLOW_DIR', follow_dir), \
             mock.patch.object(tf, 'PROFILE_DIR', os.path.join(data_dir, 'p')), \
             mock.patch.object(tf, 'DATA_DIR', data_dir), \
             mock.patch.object(tf, '_ensure_dirs', lambda: None), \
             redirect_stdout(io.StringIO()):
            tf.run(args, None)

        with open(os.path.join(data_dir, 'top_followed.json'),
                  encoding='utf-8') as f:
            return json.load(f)

    def test_share_denominator_is_full_universe(self):
        tmp = tempfile.mkdtemp()
        follow = os.path.join(tmp, 'follows')
        data = os.path.join(tmp, 'data')
        os.makedirs(follow)
        payload = self._run_with(follow, data)

        # 6 follow-edges total; denominator must be the WHOLE universe, not the
        # (identical here, but post-exclusion) ranked list.
        self.assertEqual(payload['total_follow_edges'], 6)
        by = {a['uid']: a for a in payload['accounts']}
        self.assertEqual(by['1']['times_followed'], 3)
        self.assertAlmostEqual(by['1']['share'], 50.0, places=2)
        self.assertAlmostEqual(by['2']['share'], 33.333, places=2)
        self.assertAlmostEqual(by['3']['share'], 16.667, places=2)


# ---------------------------------------------------------------------------
# Medium fix #5: top_followed tolerates alternate follow-list key names
# ---------------------------------------------------------------------------

class TestTopFollowedKeyTolerance(unittest.TestCase):
    def test_alternative_follow_key_is_counted(self):
        tmp = tempfile.mkdtemp()

        def dump(name, obj):
            with open(os.path.join(tmp, name), 'w', encoding='utf-8') as f:
                json.dump(obj, f)

        # Caches written with the legacy 'followers' / 'fans' keys (not 'uids').
        dump('A.json', {'uid': 'A', 'count': 1, 'followers': ['9'], 'sample': []})
        dump('B.json', {'uid': 'B', 'count': 1, 'fans': ['9', '8'], 'sample': []})

        buf = io.StringIO()
        with redirect_stdout(buf):
            ranked = tf._aggregate(follow_dir=tmp)

        self.assertEqual(ranked, [('9', 2), ('8', 1)])


# ---------------------------------------------------------------------------
# Low-severity regression guard: every module must import cleanly after the
# import reorganisation (no leftover / duplicate / function-scope imports that
# would break at load time, and no unused import left behind).
# ---------------------------------------------------------------------------

class TestModuleImports(unittest.TestCase):
    def test_all_modules_import(self):
        import importlib

        mods = [
            'weibo_tool.http_engine',
            'weibo_tool.cli',
            'weibo_tool.commands.blacklist_deep',
            'weibo_tool.commands.blacklist_diag',
            'weibo_tool.commands.blacklist',
            'weibo_tool.commands.following_deep',
            'weibo_tool.commands.profile_visit',
            'weibo_tool.commands.relations_sync',
            'weibo_tool.commands.top_followed',
        ]
        for m in mods:
            importlib.import_module(m)  # raises on any import-time error


if __name__ == '__main__':
    unittest.main(verbosity=2)
