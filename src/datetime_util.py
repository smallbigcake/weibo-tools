"""Project DATA-time conventions, kept SEPARATE from logutil.

This module owns the time formats for DATA -- timestamps the PROJECT ITSELF
writes into data files / JSON records / markdown reports. It is deliberately
independent of:

  * logutil   -> owns LOG line timestamps (asctime); forced to UTC there.
  * filestamp-> owns FILENAME stamps (UTC, Windows-safe, no colons).

Three data-time concepts handled here:

  1. RECORD time : a moment WE recorded/wrote something (e.g. a JSON record's
                  'iso' / 'captured_at' / 'generated_at' / 'at'). Always UTC,
                  one format. Change RECORD_FMT / record_now() to change it
                  everywhere at once.

  2. DISPLAY time: human-facing time inside markdown REPORTS. Beijing is allowed
                  but MUST be labelled "(UTC+8)" -> use beijing_display().

  3. SERVER time : values the server returned (raw epoch ms, ISO strings, etc.).
                  NEVER re-formatted here -- keep them EXACTLY as received.
                  (See rule 2.1 in the project's time-handling policy: server
                  originals stay aligned with the server, not with our clock.)
"""
from datetime import datetime, timezone, timedelta

# Beijing is used ONLY for human-facing display, never for stored data.
BEIJING = timezone(timedelta(hours=8))

# UTC, ISO-8601 with an explicit 'Z' so the timezone is unambiguous.
RECORD_FMT = '%Y-%m-%dT%H:%M:%SZ'

# Beijing wall-clock; the '(UTC+8)' suffix is mandatory so a reader never
# mistakes it for UTC or local time.
DISPLAY_FMT = '%Y-%m-%d %H:%M:%S'


def record_now(fmt=RECORD_FMT):
    """Current UTC time as the project's standard DATA-record string."""
    return datetime.now(timezone.utc).strftime(fmt)


def beijing_display(arg=None):
    """Format a time as Beijing wall-clock labelled '(UTC+8)', DISPLAY ONLY.

    `arg` may be:
      * None            -> current UTC time (rendered in Beijing)
      * datetime        -> used as-is (naive input treated as UTC, matching how
                           meta.updated_at / generated_at are written)
      * str (ISO)       -> parsed; a trailing 'Z' is accepted
    Returns '?' for an empty string, or the original string unchanged if it
    cannot be parsed (so callers passing an already-formatted string stay safe).
    """
    if arg is None:
        dt = datetime.now(timezone.utc)
    elif isinstance(arg, datetime):
        dt = arg
    else:
        s = str(arg).replace('Z', '+00:00')
        if not s:
            return '?'
        try:
            dt = datetime.fromisoformat(s)
        except ValueError:
            return str(arg)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(BEIJING).strftime(DISPLAY_FMT) + ' (UTC+8)'


def utc8_from_ms(ms):
    """Localize a server epoch-millis timestamp to Beijing wall-clock (UTC+8).

    Purpose: render SERVER-returned timestamps (e.g. a video's create_time)
    for humans, and mirror the client's local clock when building beacon-style
    upload payloads. This is NOT a stored record time (that is record_now(),
    UTC) and NOT log-asctime (logutil, UTC) -- see the module header.

    Returns None if `ms` is missing or unparsable, so callers that embed it in
    a log/print line should use `utc8_from_ms(ms) or '?'` if they want a
    placeholder. Centralizing here also removes the divergent local copies in
    read_videos_snapshot / fetch_recent_videos / list_latest_videos /
    beacon_engine (one of which lacked any missing-value guard).
    """
    if not ms:
        return None
    try:
        dt = datetime.fromtimestamp(ms / 1000, tz=timezone.utc)
    except (ValueError, TypeError, OSError):
        return None
    return dt.astimezone(BEIJING).strftime('%Y-%m-%d %H:%M:%S')
