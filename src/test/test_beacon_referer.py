"""Unit tests for beacon Referer / first_cursor fidelity (2026-10-01).

Covers:
  * req_host_value(mid, first_cursor) -> full page URL (first_cursor + layerid),
    with the old fallback (first_cursor == mid) when first_cursor is None.
  * _post_action_step: 4288 -> bare profile URL (no first_cursor/layerid);
    7165 -> first_cursor only, NO layerid.
  * _post_read_step / _post_playstatistics_step / _post_h5playlog_step /
    _post_report_step -> full page URL (first_cursor + layerid).
  * first_cursor_of: accepts a dict (wmap) or a list of video dicts; empty -> None.
  * replay_one integration: every beacon carries the faithful Referer.

Run (no pytest needed):
    python src/test/test_beacon_referer.py
Or with pytest (if installed):
    pytest src/test/test_beacon_referer.py
"""
import os
import sys

_SRC = os.path.join(os.path.dirname(__file__), "..")
sys.path.insert(0, _SRC)
sys.path.insert(0, os.path.join(_SRC, "experiment", "fetch"))

import beacon_engine as be  # noqa: E402

AUTHOR_UID = be.AUTHOR_UID
MID = "5349010795659682"
FIRST = "5149990424675345"
FULL = "https://weibo.com/u/%s?tabtype=newVideo&first_cursor=%s&layerid=%s" % (
    AUTHOR_UID, FIRST, MID)
BARE = "https://weibo.com/u/%s?tabtype=newVideo" % AUTHOR_UID
WANT_7165 = "https://weibo.com/u/%s?tabtype=newVideo&first_cursor=%s" % (
    AUTHOR_UID, FIRST)


class _FakeResp:
    status_code = 200
    text = "{}"
    url = "http://x"
    headers = {}
    request = type("R", (), {"url": "http://x", "headers": {}})()

    def json(self):
        return {}


class FakeSession:
    """Captures (url, headers) for every GET/POST so we can assert Referers."""

    def __init__(self):
        self.captured = None
        self.calls = []
        self.last_body = None
        self.cookies = type("C", (), {"get": lambda *a, **k: None})()

    def post(self, url, files=None, data=None, headers=None, timeout=None):
        self.captured = headers
        self.last_body = data
        self.calls.append((url, headers))
        return _FakeResp()

    def get(self, url, headers=None, timeout=None, params=None):
        self.captured = headers
        self.calls.append((url, headers))
        return _FakeResp()


def _referer_of(session, url_sub):
    for (u, h) in session.calls:
        if u and url_sub in u:
            return h.get("Referer")
    return None


def test_req_host_value():
    assert be.req_host_value(MID, FIRST) == FULL
    # fallback: no first_cursor -> layerid reused as first_cursor (old behavior)
    assert be.req_host_value(MID) == FULL.replace(FIRST, MID)


def test_action_4288_bare():
    s = FakeSession()
    be._post_action_step(s, "4288", "20000366", "x", [], first_cursor=FIRST)
    assert s.captured.get("Referer") == BARE


def test_action_7165_first_cursor_only():
    s = FakeSession()
    be._post_action_step(s, "7165", "20000393", "x", [], first_cursor=FIRST)
    ref = s.captured.get("Referer")
    assert ref == WANT_7165
    assert "layerid" not in ref


def test_read_full():
    s = FakeSession()
    be._post_read_step(s, MID, 1000, [], rid="0_0_0_1_0_0_0", first_cursor=FIRST)
    assert s.captured.get("Referer") == FULL


def test_playstatistics_full():
    s = FakeSession()
    be._post_playstatistics_step(s, MID, "123", [], first_cursor=FIRST)
    assert s.captured.get("Referer") == FULL


def test_h5playlog_full():
    s = FakeSession()
    be._post_h5playlog_step(s, MID, "1034:x", 30, "0", 0, "2026-10-01", False, [],
                           sid="H5_abc", first_cursor=FIRST)
    assert s.captured.get("Referer") == FULL


def test_report_full():
    s = FakeSession()
    be._post_report_step(s, MID, "1034:x", 30, "0", 0, [], first_cursor=FIRST)
    assert s.captured.get("Referer") == FULL


def test_h5playlog_valid_play_duration_is_delta():
    """CRITICAL field-algorithm check (2026-10-01): `playduration` (field #10) is
    the absolute playback position, while `valid_play_duration` (field #15) is the
    VALID-PLAY accumulated SINCE THE PREVIOUS h5playlog send -- a DELTA, not the
    cumulative position. The old delay-driven loop reported the absolute position
    as valid_play_duration, over-counting it on every heartbeat after the first.
    This test proves the two are now independent and valid_play_duration == the
    delta passed in.
    """
    import re
    s = FakeSession()
    be._post_h5playlog_step(s, MID, "1034:x", 120, "1", 60, "2026-10-01", False, [],
                           sid="H5_abc", first_cursor=FIRST,
                           valid_play_duration_ms=30000, firstframe_time_ms=206)
    body = (s.last_body or b"").decode("utf-8")
    m = re.search(r'name="data"\r\n\r\n([^\r]*)', body)
    assert m, body
    fields = m.group(1).split(";")
    assert fields[10] == "60000", fields      # playduration = abs pos (60s)
    assert fields[15] == "30000", fields      # valid_play_duration = DELTA (not 60000)
    assert fields[13] == "206", fields        # firstframe_time passed through


def test_drive_event_player_valid_play_duration_delta():
    """End-to-end check of the event-driven virtual player (_drive_event_player):
    h5playlog must fire every ~30s of VALID play, and each heartbeat's
    valid_play_duration must be the DELTA since the previous send (~30000ms),
    never the cumulative position. Before the refactor the loop passed the absolute
    `sec` as valid_play_duration, so the 2nd heartbeat would have shown 60000.
    """
    import sys, types
    sys.path.insert(0, "src/experiment/fetch")
    import simulated_watch as sw

    captured = []  # (playduration_field, valid_field)

    def fake_post_h5playlog_step(session, mid, oid, duration, play_type, sec,
                                 play_time, is_last, results, sid=None,
                                 first_cursor=None, valid_play_duration_ms=None,
                                 firstframe_time_ms=None):
        captured.append((int(sec * 1000), int(valid_play_duration_ms or 0), is_last))

    def fake_post_report_step(session, mid, oid, duration, play_type, sec, results,
                              first_cursor=None):
        return 30  # server-driven next_report_delay_seconds

    def fake_post_read_step(*a, **k):
        pass

    saved = (sw._post_h5playlog_step, sw._post_report_step, sw._post_read_step)
    sw._post_h5playlog_step = fake_post_h5playlog_step
    sw._post_report_step = fake_post_report_step
    sw._post_read_step = fake_post_read_step
    try:
        # fake args namespace
        args = types.SimpleNamespace(cadence=30, delay=30, speed=100000)
        # fake streamer: already "done" so next_chunk/drain are no-ops
        st = types.SimpleNamespace(done=True, next_chunk=lambda: 0, drain=lambda: None,
                                    fetched=0, total=1000, label="v")
        sw._drive_event_player(FakeSession(), MID, "1034:x", 90, [], args,
                               sid="H5_abc", first_cursor=FIRST, streamers=[st],
                               watch_start_ms=0, next_delay=30)
    finally:
        sw._post_h5playlog_step, sw._post_report_step, sw._post_read_step = saved

    # 90s video => h5playlog at ~30s, ~60s, and final 'ended' (is_last=True)
    assert len(captured) == 3, captured
    # every mid-video heartbeat reports valid_play_duration == the 30s DELTA,
    # never the cumulative position (which would be 60000 / 90000 later on).
    for pd, vd, is_last in captured:
        if not is_last:
            assert vd == 30000, (pd, vd, is_last)
    # the 2nd heartbeat's valid_play_duration (30000) must NOT equal its
    # playduration (60000) -- this is the bug the refactor fixed.
    assert captured[1][1] != captured[1][0], captured
    # the final 'ended' heartbeat carries quit_status='complete' (is_last True)
    assert captured[-1][2] is True, captured
    # playduration (field #10) is the absolute position, growing across heartbeats
    assert captured[0][0] == 30000 and captured[1][0] == 60000, captured


def test_first_cursor_of():
    assert be.first_cursor_of({"a": {}, "b": {}}) == "a"
    assert be.first_cursor_of([{"mid": "x"}, {"mid": "y"}]) == "x"
    assert be.first_cursor_of({}) is None
    assert be.first_cursor_of([]) is None


def test_replay_one_integration():
    s = FakeSession()
    be.replay_one(s, MID, "1034:x", 30, [("0", 0)], 1.0, "2026-10-01", [], "quad",
                  rid="0_0_0_1_0_0_0", first_cursor=FIRST)
    ref_7165 = _referer_of(s, "act_code=7165")
    assert ref_7165 == WANT_7165
    assert "layerid" not in (ref_7165 or "")
    assert _referer_of(s, "ajax/log/read") == FULL
    assert _referer_of(s, "playstatistics") == FULL


def test_h5playlog_webkit_boundary():
    """h5playlog MUST use a Chrome-style multipart boundary, NOT the requests
    `files=` default (a 32-hex boundary) which is a detectable fingerprint."""
    s = FakeSession()
    be._post_h5playlog_step(s, MID, "1034:x", 30, "0", 0, "2026-10-01", False, [],
                           sid="H5_abc", first_cursor=FIRST)
    ct = s.captured.get("Content-Type") if s.captured else None
    assert ct, "missing Content-Type"
    assert ct.startswith("multipart/form-data; boundary=----WebKitFormBoundary"), ct
    # boundary param = "----WebKitFormBoundary" + exactly 16 alphanumerics
    # (matches the browser's FormData delimiter; NOT requests' 32-hex default).
    suffix = ct[len("multipart/form-data; boundary=----WebKitFormBoundary"):]
    assert len(suffix) == 16 and suffix.isalnum(), suffix


def test_log_http_omits_resp_body():
    """_log_http(include_resp_body=False) must skip the response body (large
    binary video chunk) while still logging request + response headers; the
    default (True) must dump the body like the JSON beacons."""
    import logging

    class _Req:
        method = "GET"
        url = "https://f.video.weibocdn.com/x.mp4"
        headers = {"User-Agent": "x", "Range": "bytes=0-9"}
        body = None

    class _Resp:
        def __init__(self, text):
            self.status_code = 206
            self.reason = "Partial Content"
            self.headers = {"Content-Range": "bytes 0-9/100"}
            self.text = text
            self.url = "https://f.video.weibocdn.com/x.mp4"
            self.request = _Req()

    cap = logging.Handler()
    cap.records = []

    def _emit(r):
        cap.records.append(r.getMessage())

    cap.emit = _emit
    cap.setLevel(logging.DEBUG)
    be.log.addHandler(cap)
    try:
        # omitted path
        be._log_http(_Resp("HUGEVIDEOBYTES"), "dash x", include_resp_body=False)
        msgs = list(cap.records)
        assert any("omitted: large binary" in m for m in msgs), msgs
        assert not any("HUGEVIDEOBYTES" in m for m in msgs), msgs
        assert any(">>> REQUEST" in m for m in msgs)
        assert any("resp headers" in m for m in msgs)
        cap.records = []
        # default path dumps body
        be._log_http(_Resp("SMALLJSON"), "beacon y")
        assert any("SMALLJSON" in m for m in cap.records), cap.records
    finally:
        be.log.removeHandler(cap)


def _main():
    tests = [v for k, v in sorted(globals().items())
             if k.startswith("test_") and callable(v)]
    passed = failed = 0
    for t in tests:
        try:
            t()
            print("PASS", t.__name__)
            passed += 1
        except AssertionError as e:
            print("FAIL", t.__name__, "->", e)
            failed += 1
        except Exception as e:  # noqa: BLE001
            print("ERROR", t.__name__, "->", repr(e))
            failed += 1
    print("\n%d passed, %d failed" % (passed, failed))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(_main())
