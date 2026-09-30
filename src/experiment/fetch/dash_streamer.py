"""DASH video byte-fetch layer (split out of simulated_watch.py).

Owns "which bytes to fetch" (`pick_dash_urls`) and "how to fetch them"
(`DashStreamer`): chunked Range GETs returning 206 Partial Content, exactly like
the real browser's segmented download. simulated_watch.py keeps only the watch
orchestration.

Logging: this module ships NO FileHandler of its own (a NullHandler only), so on
its own it dumps nowhere. The orchestrator merges it into its batch file via
logutil.share_handler(log, handler) -- see simulated_watch, which merges
beacon_engine + dash_streamer into ONE log file for the whole run.
"""
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))  # -> <root>/src

from constants import BROWSER_USER_AGENT as UA

# Referer for the byte-range requests (same bare value simulated_watch used).
CREATOR_REF = "https://weibo.com/"

log = logging.getLogger('dash_streamer')
log.setLevel(logging.DEBUG)
log.propagate = False
# NullHandler only: stay silent until the orchestrator attaches its batch handler.
log.addHandler(logging.NullHandler())


def pick_dash_urls(media_info, quality="dash_hd", with_audio=True):
    """Return list of (label, url) DASH urls to fetch, in browser order.
    Browser fetched dash_hd (video) + dash_audio (audio). Default mirrors that."""
    by_label = {}
    for pl in media_info.get("playback_list") or []:
        info = pl.get("play_info") or {}
        if info.get("url"):
            by_label[info.get("label")] = info["url"]
    urls = []
    # video track: prefer requested quality, else fall back
    for q in (quality, "dash_720p", "dash_hd"):
        if q in by_label:
            urls.append((q, by_label[q]))
            break
    if with_audio and "dash_audio" in by_label:
        urls.append(("dash_audio", by_label["dash_audio"]))
    # If no DASH at all (e.g. progressive-only page), fall back to mp4_720p_mp4
    if not urls and media_info.get("mp4_720p_mp4"):
        urls.append(("mp4_720p_mp4", media_info["mp4_720p_mp4"]))
    return urls


class DashStreamer:
    """Streams ONE signed DASH url via byte-range GETs (206 Partial Content).
    Mirrors the browser's segmented download; `next_chunk()` pulls one range."""

    def __init__(self, session, url, label, chunk, max_bytes=None):
        self.session = session
        self.url = url
        self.label = label
        self.chunk = chunk
        self.max_bytes = max_bytes
        self.pos = 0
        self.total = None
        self.fetched = 0
        self.done = False

    def next_chunk(self):
        if self.done:
            return 0
        if self.max_bytes and self.fetched >= self.max_bytes:
            self.done = True
            return 0
        end = self.pos + self.chunk - 1
        headers = {"User-Agent": UA, "Referer": CREATOR_REF,
                   "Origin": "https://weibo.com",
                   "Range": "bytes=%d-%d" % (self.pos, end)}
        try:
            r = self.session.get(self.url, headers=headers, timeout=30000, stream=True)
            status = r.status_code
            cr = r.headers.get("Content-Range") or r.headers.get("content-range")
            if cr and "/" in cr:
                try:
                    self.total = int(cr.split("/")[-1])
                except ValueError:
                    pass
            data = r.content  # Range responses are small per request
            n = len(data)
        except Exception as ex:
            log.warning("  [dash][%s] chunk error @%d: %s" % (self.label, self.pos, ex))
            self.done = True
            return 0
        if status not in (206, 200):
            log.warning("  [dash][%s] unexpected status %s @%d (url expires?)"
                        % (self.label, status, self.pos))
            self.done = True
            return 0
        self.fetched += n
        self.pos += n
        if (self.total and self.pos >= self.total) or n == 0:
            self.done = True
        log.debug("  [dash][%s] status=%s bytes=%d-%d total=%s fetched=%d"
                  % (self.label, status, self.pos - n, self.pos - 1,
                     self.total, self.fetched))
        return n

    def drain(self):
        while not self.done:
            if self.next_chunk() == 0:
                break
