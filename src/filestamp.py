"""Human-readable, filesystem-safe timestamp stamps for generated files.

Single source of truth for the `2026-09-27_08-31-05` convention used by every
data / log file this project writes. Previously each module hand-rolled its own
stamp (`%Y%m%d_%H%M%S` local, `%Y%m%d` local, `%Y%m%dT%H%M%SZ` UTC), which made
the same run's outputs hard to line up by name.

Properties of the chosen format:
  - Readable: hyphens separate the date and time fields (no 8-digit digit run).
  - Windows-safe: NO colons -- Windows forbids ':' in filenames, so the ISO
    time 08:31:05 is written 08-31-05.
  - Sortable: fixed width, so filename order == chronological order.
  - UTC.

Caveat: the name carries NO timezone marker, so you cannot tell UTC from local
time by looking at it. That ambiguity once made a maintenance pass shift the
same files twice. Any script that rewrites these names must therefore be
explicit about which timezone it assumes, and must never "convert" a bare
stamp -- see src/tmp/*.py for how the one-off passes handled it.

Usage:
    from filestamp import batch_stamp, day_stamp
    path = 'simulated_watch_%s.log' % batch_stamp()
"""
from datetime import datetime, timezone

#: Every generated filename is stamped in UTC.
TZ = timezone.utc

_BATCH_FMT = '%Y-%m-%d_%H-%M-%S'
_DAY_FMT = '%Y-%m-%d'


def now_utc():
    """Current time in UTC, tz-aware."""
    return datetime.now(TZ)


def _as_utc(dt):
    """Normalise `dt` to UTC. Naive input is treated as UTC (matching how
    meta.updated_at / generated_at are written)."""
    if dt is None:
        return now_utc()
    if dt.tzinfo is None:
        return dt.replace(tzinfo=TZ)
    return dt.astimezone(TZ)


def batch_stamp(dt=None):
    """'2026-09-27_08-31-05' -- to-the-second UTC stamp for per-batch files.

    `dt` may be in any timezone; it is converted to UTC before formatting.
    """
    return _as_utc(dt).strftime(_BATCH_FMT)


def day_stamp(dt=None):
    """'2026-09-27' -- UTC date-only stamp for daily (non-batch) files."""
    return _as_utc(dt).strftime(_DAY_FMT)


def stamp_from_iso(iso_ts):
    """Convert an ISO timestamp into a UTC batch stamp, or None if it is
    missing/unparsable (so the caller can apply its own fallback).

    Naive input is treated as UTC, matching how `meta.updated_at` /
    `generated_at` are written.
    """
    try:
        dt = datetime.fromisoformat(iso_ts)
    except (TypeError, ValueError):
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=TZ)
    return dt.astimezone(TZ).strftime(_BATCH_FMT)
