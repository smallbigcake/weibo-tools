"""Shared helper to archive a "live" data file before it gets overwritten.

When a daily refresh re-run is about to overwrite author_videos.json or
author_video_stats.json, call archive_existing(path) FIRST. It copies the
current file into <live_dir>/archive/<stem>_<UTC-stamp>.json, using the
file's own meta.updated_at as the timestamp so the archive name reflects
when that snapshot was actually taken (not when it was archived).

Stamp format (see filestamp.py -- human-readable, fixed-width,
lexicographically sortable, Windows-safe -- no colons):
2026-09-27_06-25-37  (UTC, date_time).

The archive is a plain copy (shutil.copy2) and is skipped if an archive
with the same name already exists, so re-running never duplicates history.

Usage:
    from data_archive import archive_existing
    archive_existing(OUT)   # call before overwriting OUT
"""
import json
import os
import shutil
import sys
from datetime import datetime

_SRC_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if _SRC_ROOT not in sys.path:
    sys.path.insert(0, _SRC_ROOT)

from filestamp import TZ, batch_stamp, stamp_from_iso  # noqa: E402


def _stamp_from_meta(live_path):
    """Return a filesystem-safe UTC stamp from the file's meta.updated_at,
    falling back to the file's mtime."""
    try:
        with open(live_path, encoding="utf-8") as f:
            meta = (json.load(f) or {}).get("meta", {})
        ts = meta.get("updated_at")
        if ts:
            # meta.updated_at is ISO like 2026-09-13T02:57:52.432833+00:00
            stamp = stamp_from_iso(ts)
            if stamp:
                return stamp
    except Exception:
        pass
    mtime = os.path.getmtime(live_path)
    return batch_stamp(datetime.fromtimestamp(mtime, tz=TZ))


def archive_existing(live_path):
    """Copy live_path to <dir>/archive/<stem>_<stamp>.json if not already
    archived. Returns the archive path, or None if there was nothing to do.
    """
    if not os.path.exists(live_path):
        return None
    stamp = _stamp_from_meta(live_path)
    live_dir = os.path.dirname(os.path.abspath(live_path))
    archive_dir = os.path.join(live_dir, "archive")
    os.makedirs(archive_dir, exist_ok=True)
    stem, ext = os.path.splitext(os.path.basename(live_path))
    archive_name = "%s_%s%s" % (stem, stamp, ext)
    archive_path = os.path.join(archive_dir, archive_name)
    if os.path.exists(archive_path):
        return archive_path  # already archived, skip
    shutil.copy2(live_path, archive_path)
    return archive_path
