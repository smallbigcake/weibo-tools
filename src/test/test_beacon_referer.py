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
        self.cookies = type("C", (), {"get": lambda *a, **k: None})()

    def post(self, url, files=None, data=None, headers=None, timeout=None):
        self.captured = headers
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
