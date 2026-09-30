"""Shared logging setup for the whole project.

Centralizes the logging convention originally inlined in `auth.py` so every
module logs the same way:

    [2026-08-14 08:49:23.958][INFO](auth.py#159): Using saved session for UID 1000000000.

Configuration lives in `config/logging.ini` (relative to this file), which sends
logs to BOTH a rotating file (`log/weibo.log`) and the console, at INFO level by
default (DEBUG adds full request/response dumps — see auth.py's request helper).

Usage (any module):

    from logutil import setup, get_logger, dump_response
    setup()                              # idempotent; safe to call anywhere
    log = get_logger(__name__)           # or just use logging.info directly
    log.info('...')

Anomaly dumping
---------------
When a request returns something unexpected (non-200, an `ok:0` body, an
exception, etc.), call `dump_response(resp, label=...)` to log the full status,
response headers, and body at WARNING level. This makes "what did the server
actually say?" visible without having to flip on DEBUG globally — important
because a throttled/blocked Weibo call often returns HTTP 200 with an
uninformative body, and we should not silently guess at the cause.
"""
import logging
import os
import time

_CONFIG_DIR = os.path.dirname(os.path.abspath(__file__))
_INI = os.path.join(_CONFIG_DIR, 'config', 'logging.ini')

_setup_done = False


def setup():
    """Load `config/logging.ini` exactly once (idempotent).

    Resolves the ini's relative handler paths (e.g. `log/weibo.log`) against
    this module's directory, so logging works regardless of the current working
    directory. Safe to call from any module at import or startup time.
    """
    global _setup_done
    if _setup_done:
        return
    import logging.config
    prev_cwd = os.getcwd()
    os.chdir(_CONFIG_DIR)
    try:
        # disable_existing_loggers=False keeps already-created loggers working.
        logging.config.fileConfig(_INI, disable_existing_loggers=False)
    finally:
        os.chdir(prev_cwd)
    _force_utc_formatters()
    _setup_done = True


def get_logger(name=None):
    """Return a module logger. Always call `setup()` first (or rely on an entry
    point having done so)."""
    return logging.getLogger(name)


# Cap the size of a dumped body so a huge response can't flood the log.
_MAX_BODY_CHARS = 4000


def _summarize_body(resp):
    """Return a human-readable, capped representation of a response body."""
    ctype = resp.headers.get('Content-Type', '')
    text = resp.text or ''
    if 'json' in ctype or text.lstrip().startswith(('{', '[')):
        try:
            import json
            parsed = json.loads(text)
            pretty = json.dumps(parsed, ensure_ascii=False, indent=2)
        except Exception:
            pretty = text
        tag = 'JSON body'
    else:
        pretty = text
        tag = 'body (%d bytes)' % len(resp.content)
    if len(pretty) > _MAX_BODY_CHARS:
        pretty = pretty[:_MAX_BODY_CHARS] + '\n... [truncated]'
    return '%s:\n%s' % (tag, pretty)


def dump_response(resp, label='', level=logging.WARNING):
    """Log detailed response diagnostics for an unexpected/anomalous response.

    `resp` is a `requests.Response`. Logs (at `level`):
      - the label (what we were trying to do)
      - HTTP status, reason, final URL
      - ALL response headers
      - the body (JSON pretty-printed or raw text), capped to _MAX_BODY_CHARS
    """
    log = logging.getLogger('weibo')
    lines = []
    if label:
        lines.append('[anomaly] %s' % label)
    req = getattr(resp, 'request', None)
    url = req.url if req is not None else getattr(resp, 'url', '?')
    lines.append('  HTTP %s %s %s' % (resp.status_code, resp.reason, url))
    lines.append('  [response headers]')
    for k, v in resp.headers.items():
        lines.append('    %s: %s' % (k, v))
    lines.append('  [response %s' % _summarize_body(resp))
    log.log(level, '\n'.join(lines))


def share_handler(logger, handler):
    """Point `logger` at an orchestrator-owned `handler` so several modules'
    logs merge into ONE file.

    Drops any FileHandler `logger` already owns (e.g. its own daily file) so a
    batch run writes a single file instead of one per module. Used by
    simulated_watch to merge the beacon_engine + dash_streamer logs into its
    per-batch log file.
    """
    for h in list(logger.handlers):
        if isinstance(h, logging.FileHandler):
            try:
                h.close()
            except Exception:
                pass
            logger.removeHandler(h)
    logger.addHandler(handler)


# ---------------------------------------------------------------------------
# Shared log-line format + UTC timestamp handling (single source of truth)
# ---------------------------------------------------------------------------
# Every module used to inline its own `logging.Formatter('%(asctime)s ...')`,
# which made the leading timestamp LOCAL time (Beijing on this machine) and
# forced a dozen edits whenever the format or timezone had to change. Centralize
# both here so the format string and the UTC switch live in ONE place.
LOG_FMT = '%(asctime)s [%(levelname)s](%(filename)s#%(lineno)d): %(message)s'
LOG_FMT_MILLIS = '[%(asctime)s.%(msecs)03d][%(levelname)s](%(filename)s#%(lineno)d): %(message)s'


def utc_formatter(fmt=LOG_FMT, datefmt=None):
    """Return a logging.Formatter whose `%(asctime)s` timestamp is UTC.

    Python's logging uses the LOCAL timezone for `%(asctime)s` by default
    (Beijing time on this machine). Pinning `converter = time.gmtime` makes
    every log line's leading timestamp UTC, consistently, everywhere.
    """
    f = logging.Formatter(fmt, datefmt=datefmt)
    f.converter = time.gmtime
    return f


def _force_utc_formatters():
    """Make every already-configured formatter emit UTC timestamps.

    `logging.config.fileConfig` builds formatters with the default local-time
    converter, which we cannot override from `config/logging.ini`, so fix it
    here in one place. This covers the shared `weibo.log` + console handlers
    configured by `setup()`; modules that add their own handlers should use
    `utc_formatter()` directly.
    """
    for logger in [logging.root] + list(logging.Logger.manager.loggerDict.values()):
        if not isinstance(logger, logging.Logger):
            continue
        for h in logger.handlers:
            if getattr(h, 'formatter', None) is not None:
                h.formatter.converter = time.gmtime
