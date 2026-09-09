"""Shared HTTP request engine for the Weibo tools.

This module is the SINGLE HOME for the resilient JSON-fetching logic that every
subcommand reuses:

  * `_request_json`          — GET a JSON endpoint with exponential backoff, soft
                               rate-limit handling, ban/account-issue detection,
                               and automatic session recovery (SSO renew / QR).
  * `_sleep`                — randomized polite delay between requests.
  * `_is_ban_response`      — classify a permanently-banned/deleted account.
  * `_is_account_issue`     — classify a frozen / risk-controlled account.
  * `_try_recover_session`  — one guarded attempt to renew a dead session.

It used to live inside `commands/blacklist_deep.py`; extracting it keeps the
engine in exactly one place so the crawler, the relation sync, the profile-visit
replay and any future command all share the same resilience behaviour (and the
same recovery-cooldown global). `blacklist_deep` re-imports these names so its
existing importers keep working unchanged.
"""
import logging
import random
import time
import urllib.parse as _up

from logutil import setup as _setup_logging, dump_response

_setup_logging()

# Session auto-recovery: when a request comes back as "not logged in"
# (ok:-100 / redirect to login.php), we trigger auth.ensure_session() (silent
# SSO renew, falling back to QR login) and retry ONCE. These module-level flags
# prevent a recovery storm: at most one recovery attempt per _recover_cooldown
# seconds across the whole process, and a single _request_json call only ever
# recovers once (via the _recover_tried arg) to avoid infinite recursion.
_LAST_SESSION_RECOVER = 0.0
_RECOVER_COOLDOWN = 60.0


def _sleep(base=1.2, jitter=1.3):
    """Randomized polite delay between requests (stay under Weibo's rate wall)."""
    time.sleep(base + random.random() * jitter)


def _is_ban_response(obj):
    """A `profile/info` call for a banned/deleted account returns HTTP 200 with
    `ok:0` and a `error_type:'link'` body pointing at weibo.com/sorry?...
    (e.g. usernotexists&msg=该账号因被投诉违反...). This is NOT rate-limiting —
    it is permanent and must not be retried. Return the decoded reason string,
    or None if the body looks like a genuine soft rate-limit.
    """
    if not isinstance(obj, dict):
        return None
    if obj.get('ok') == 1:
        return None
    err_type = obj.get('error_type')
    url = obj.get('url') or ''
    if err_type == 'link' or 'sorry?' in url:
        # The human-readable reason lives URL-encoded in the `msg` query param.
        try:
            q = _up.urlparse(url).query
            msg = _up.parse_qs(q).get('msg', [''])[0]
        except Exception:
            msg = ''
        return msg or 'banned_unknown'
    return None


def _is_account_issue(obj):
    """A frozen / risk-controlled account returns HTTP 400 with a body like
    `{"ok":0,"message":"账号有问题"}` (Weibo's own wording, kept verbatim).
    This is a permanent failure, NOT rate-limiting — do not retry.

    We return the API's `message` text verbatim so the reason is identified by
    Weibo's exact wording rather than a translated label.
    """
    if not isinstance(obj, dict):
        return None
    if obj.get('ok') == 1:
        return None
    msg = obj.get('message')
    if isinstance(msg, str) and msg.strip():
        return msg.strip()
    return None


def _session_expired(resp, obj):
    """Detect a login-expired signal from either a redirect or the JSON body."""
    if resp.status_code in (301, 302, 303, 307, 308):
        loc = resp.headers.get('Location', '')
        if 'login.php' in loc:
            return True
    if isinstance(obj, dict) and obj.get('ok') == -100:
        return True
    return False


# Weibo signals "you are visiting too frequently" with HTTP 414, whose STANDARD
# meaning is "URI too long" — the response is an HTML error page, not JSON, so
# the status code alone proves nothing. We therefore never infer throttling from
# the status: we require this exact marker in the body. Anything else stays an
# unexplained failure and is logged exactly as before.
_RATE_LIMIT_BODY_MARKER = '访问过于频繁，请稍等再试！（错误码：414）'


def _is_rate_limited(resp):
    """True when `resp` is Weibo's own "too frequent" throttle page.

    Observed 2026-09-09: a throttled `profile/info` call answers HTTP 414 with
    an HTML error page whose body reads 访问过于频繁，请稍等再试！（错误码：414）.
    Confirming it from the body (rather than from the 414 status) keeps us from
    mislabelling an unrelated 414 as throttling.
    """
    if resp.status_code != 414:
        return False
    try:
        text = resp.text or ''
    except Exception:
        return False
    return _RATE_LIMIT_BODY_MARKER in text


# ---------------------------------------------------------------------------
# retry / backoff budget
# ---------------------------------------------------------------------------
# One request may be tried `retries` times. The wait before each retry is an
# exponentially growing ceiling with FULL jitter (see `_backoff_wait`):
#
#     ceiling = min(cap, base * 2 ** (attempt - 1))
#     wait    = random(0, ceiling)
#
# `base` = ceiling (seconds) on the FIRST retry's wait.
# `cap`  = ceiling no wait may ever exceed, however many times we retry.
#
# The ceiling is picked per failure class:
#   RL  rate-limited, CONFIRMED (HTTP 414 + 访问过于频繁 body). The throttle
#       window is long, so we are willing to wait a long time.
#   TR  transient (network error / timeout). Usually clears within seconds.
#   UN  unknown (any other non-200, or an unexpected `ok`). We deliberately do
#       NOT attribute this to throttling without evidence, so it gets neither
#       the long RL wait nor a free pass.
RETRY_ATTEMPTS = 10
BACKOFF_BASE_RL, BACKOFF_CAP_RL = 20, 180
BACKOFF_BASE_TR, BACKOFF_CAP_TR = 3, 30
BACKOFF_BASE_UN, BACKOFF_CAP_UN = 5, 60


def _backoff_wait(attempt, base, cap):
    """Return how long to wait before retry `attempt` (1-based), in seconds.

    Exponential backoff with FULL jitter: a uniformly random value in
    [0, min(cap, base * 2 ** (attempt - 1))]. The randomness is the point —
    without it every client would retry at the same instant and re-trigger the
    very throttle it is waiting out.
    """
    ceiling = min(cap, base * (2 ** (attempt - 1)))
    return random.uniform(0, ceiling)


# Monotonic count of CONFIRMED throttle responses seen in this process. Callers
# snapshot it before a unit of work and compare afterwards: a retry may rescue
# the request, but the pacing logic still has to slow down, because the server
# did tell us we were too frequent.
_RATE_LIMIT_HITS = 0


def rate_limit_hits():
    """Total confirmed rate-limit responses seen so far (never decreases)."""
    return _RATE_LIMIT_HITS


def _request_json(auth, url, retries=3, _recover_tried=False, headers=None):
    """GET a JSON endpoint with backoff.

    Weibo's web API rate-limits `profile/info` aggressively: a throttled call
    returns HTTP 200 but `ok:0` with empty data (no error message). We treat
    that as a SOFT rate-limit, not a hard failure — back off and retry a couple
    of times, but keep the per-call cost low so a single stubborn uid can't
    stall the whole crawl. Persistent soft-fail -> return None so the caller
    marks the uid `unreachable` (reason undetermined, not attributed to
    rate-limiting without evidence) and we move on (it can be retried later).

    IMPORTANT: a banned/deleted account ALSO returns `ok:0`, but with a
    `error_type:'link'` body. That is permanent, so we return the body
    immediately (no retry) and let the caller classify it as `banned`.

    AUTO-RECOVERY: if a response signals a dead session (ok:-100 or a redirect
    to login.php) we call `auth.ensure_session()` to silently renew (or, as a
    last resort, prompt for a QR scan) and retry the request — so an unattended
    crawl keeps going instead of silently writing empty caches.

    `headers` replaces the default AJAX header set. Callers that must mimic a
    specific page load (e.g. profile-visit replaying a profile page view, whose
    request carries client-version / server-version / sec-ch-ua) pass their own
    browser-like headers here and still get the backoff + auto-recovery above.
    """
    global _LAST_SESSION_RECOVER
    req_headers = headers or {
        'User-Agent': auth.session.headers.get('User-Agent', ''),
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://weibo.com/',
        'x-requested-with': 'XMLHttpRequest',
    }
    global _RATE_LIMIT_HITS
    for attempt in range(1, retries + 1):
        try:
            resp = auth.session.get(
                url,
                headers=req_headers,
                timeout=20, allow_redirects=False)
            if resp.status_code in (301, 302, 403):
                # A 30x to login.php means the session died — recover before
                # treating it as a generic backoff.
                is_login_redirect = ('login.php' in resp.headers.get('Location', ''))
                if is_login_redirect and not _recover_tried:
                    if _try_recover_session(auth):
                        _recover_tried = True
                        continue  # retry same URL with the refreshed session
                logging.warning('  backoff (http %s) on %s' % (resp.status_code, url))
                dump_response(resp, label='redirect/forbidden (http %s)'
                              % resp.status_code)
                time.sleep(_backoff_wait(attempt, BACKOFF_BASE_UN,
                                         BACKOFF_CAP_UN))
                continue
            if resp.status_code != 200:
                # Non-200 may carry a JSON body with Weibo's own error message
                # (e.g. HTTP 400 + {"ok":0,"message":"账号有问题"} for a frozen
                # account). Surface it verbatim instead of blind retry/backoff.
                try:
                    obj = resp.json()
                except Exception:
                    obj = None
                issue = _is_account_issue(obj) if obj is not None else None
                if issue is not None:
                    return obj  # permanent; no retry
                # A JSON body with ok:-100 (dead session) even on a 200 — recover.
                if obj is not None and obj.get('ok') == -100 and not _recover_tried:
                    if _try_recover_session(auth):
                        _recover_tried = True
                        continue
                if _is_rate_limited(resp):
                    # Confirmed from the body: Weibo's own throttle page. Log it
                    # as such instead of the misleading "unexpected http 414".
                    _RATE_LIMIT_HITS += 1
                    logging.warning('  rate limited (http %s) on %s'
                                    % (resp.status_code, url))
                    time.sleep(_backoff_wait(attempt, BACKOFF_BASE_RL,
                                             BACKOFF_CAP_RL))
                else:
                    logging.warning('  http %s on %s' % (resp.status_code, url))
                    dump_response(resp, label='unexpected http %s' % resp.status_code)
                    time.sleep(_backoff_wait(attempt, BACKOFF_BASE_UN,
                                             BACKOFF_CAP_UN))
                continue
            obj = resp.json()
            ban = _is_ban_response(obj)
            if ban is not None:
                # Permanent ban/deletion — do not retry, surface to caller.
                return obj
            issue = _is_account_issue(obj)
            if issue is not None:
                # Frozen / risk-controlled account — permanent, no retry.
                return obj
            if obj.get('ok') != 1:
                # A JSON body with ok:-100 (dead session) — recover and retry.
                if obj.get('ok') == -100 and not _recover_tried:
                    if _try_recover_session(auth):
                        _recover_tried = True
                        continue
                # Otherwise an unexpected `ok` (e.g. ok:0 with empty data). We do
                # NOT assume this is rate-limiting — it could be a soft-block, an
                # account state, or transient. Treat as retryable but leave the
                # reason undetermined; the caller marks the uid `unreachable`.
                logging.warning('  unexpected ok=%s on %s' % (obj.get('ok'), url))
                dump_response(resp, label='unexpected ok=%s' % obj.get('ok'))
                time.sleep(_backoff_wait(attempt, BACKOFF_BASE_UN,
                                         BACKOFF_CAP_UN))
                continue
            return obj
        except Exception as e:
            logging.warning('  request error %s on %s' % (e, url))
            time.sleep(_backoff_wait(attempt, BACKOFF_BASE_TR,
                                     BACKOFF_CAP_TR))
    return None


def _try_recover_session(auth):
    """Attempt one session recovery, honoring the global cooldown.

    Returns True if a live session is available afterwards (whether or not it
    was freshly recovered). Returns False if recovery was skipped due to the
    cooldown still being active.
    """
    global _LAST_SESSION_RECOVER
    now = time.time()
    if now - _LAST_SESSION_RECOVER < _RECOVER_COOLDOWN:
        # Already attempted a recovery very recently; don't hammer the login
        # flow. Assume whatever session we have is what we'll use.
        return False
    _LAST_SESSION_RECOVER = now
    logging.warning('[session] login expired detected — auto-recovering...')
    try:
        ok = auth.ensure_session()
    except Exception as e:
        logging.error('[session] ensure_session raised: %s' % e)
        ok = False
    if ok:
        logging.info('[session] auto-recovery succeeded; resuming requests.')
    else:
        logging.error('[session] auto-recovery FAILED — requests will keep '
                      'failing until a successful (re)login. Scan the QR if one '
                      'was shown.')
    return ok
