"""Regression tests for the project DATA-time conventions.

Two sources of truth are exercised here:

  * datetime_util  -- owns DATA times (record_now = UTC; beijing_display /
                      utc8_from_ms = Beijing labelled, display/server only).
  * logutil        -- owns LOG line timestamps (asctime), forced to UTC.

These are deliberately independent of each other (per the project's
time-handling policy), so they get their own test module rather than being
folded into test_fixes_regression.py.

Run from the project root:
    python src/test/test_datetime_util.py -v
"""
import logging
import os
import sys
import time
import unittest
from datetime import datetime, timezone, timedelta

# src/ is the import root for every module under test.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import logutil  # noqa: E402
from datetime_util import record_now, beijing_display, utc8_from_ms  # noqa: E402


# ---------------------------------------------------------------------------
# RECORD time (UTC, stored in data files / JSON records)
# ---------------------------------------------------------------------------
class TestRecordNow(unittest.TestCase):
    def test_format_is_utc_iso_with_z(self):
        s = record_now()
        self.assertRegex(
            s, r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$',
            msg='record_now must be UTC ISO-8601 with an explicit Z',
        )

    def test_parses_back_as_utc(self):
        s = record_now()
        dt = datetime.fromisoformat(s.replace('Z', '+00:00'))
        self.assertEqual(dt.tzinfo, timezone.utc)


# ---------------------------------------------------------------------------
# DISPLAY time (Beijing wall-clock, MUST be labelled UTC+8)
# ---------------------------------------------------------------------------
class TestBeijingDisplay(unittest.TestCase):
    def test_current_offset_is_exactly_plus_8(self):
        bj = beijing_display()
        self.assertTrue(
            bj.endswith(' (UTC+8)'),
            msg='beijing_display must always carry the (UTC+8) label',
        )
        # The Beijing wall-clock (21:xx) and the UTC record time (13:xx) describe
        # the SAME instant, so their timezone-aware difference must be ~0.
        bj_dt = datetime.fromisoformat(bj[:-8]).replace(
            tzinfo=timezone(timedelta(hours=8)))
        utc = datetime.fromisoformat(record_now().replace('Z', '+00:00'))
        self.assertLess(abs(bj_dt - utc), timedelta(seconds=5))

    def test_iso_with_z_is_localized_correctly(self):
        # 13:29:40 UTC + 8h = 21:29:40 Beijing.
        self.assertEqual(
            beijing_display('2026-09-30T13:29:40Z'),
            '2026-09-30 21:29:40 (UTC+8)',
        )

    def test_datetime_arg_is_localized_correctly(self):
        self.assertEqual(
            beijing_display(datetime(2026, 9, 30, 13, 29, 40,
                                     tzinfo=timezone.utc)),
            '2026-09-30 21:29:40 (UTC+8)',
        )

    def test_empty_string_returns_question(self):
        self.assertEqual(beijing_display(''), '?')

    def test_unparseable_string_passes_through(self):
        self.assertEqual(beijing_display('garbage'), 'garbage')


# ---------------------------------------------------------------------------
# SERVER time (raw epoch-ms -> Beijing wall-clock, display only, never stored)
# ---------------------------------------------------------------------------
class TestUtc8FromMs(unittest.TestCase):
    def test_known_epoch_ms(self):
        # 1761588000000 ms -> 2025-10-27 18:00:00 UTC -> 2025-10-28 02:00:00 Beijing.
        self.assertEqual(utc8_from_ms(1761588000000), '2025-10-28 02:00:00')

    def test_none_is_missing(self):
        self.assertIsNone(utc8_from_ms(None))

    def test_zero_is_treated_as_missing(self):
        # 0 is a falsy epoch; the helper treats missing/falsy as None by design.
        self.assertIsNone(utc8_from_ms(0))

    def test_unparsable_returns_none(self):
        self.assertIsNone(utc8_from_ms('abc'))


# ---------------------------------------------------------------------------
# LOG line timestamps (logutil owns asctime; must be UTC)
# ---------------------------------------------------------------------------
class TestUtcFormatter(unittest.TestCase):
    def test_factory_pins_converter_to_gmtime(self):
        f = logutil.utc_formatter()
        self.assertIs(f.converter, time.gmtime)

    def test_formats_utc_not_localtime(self):
        f = logutil.utc_formatter()
        epoch = 1761588000  # 2025-10-27 18:00:00 UTC
        rec = logging.LogRecord('n', logging.INFO, __file__, 1, 'msg', None, None)
        rec.created = epoch
        out = f.format(rec)
        expected = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(epoch))
        self.assertIn(expected, out)

    def test_force_utc_formatters_retrofits_existing_formatters(self):
        # Replicates what logutil.setup() does after loading config/logging.ini:
        # any already-built formatter must be flipped to UTC in one place.
        lg = logging.getLogger('__test_utc_force__')
        h = logging.StreamHandler()
        h.setFormatter(logging.Formatter('%(asctime)s'))
        lg.addHandler(h)
        logutil._force_utc_formatters()
        self.assertIs(h.formatter.converter, time.gmtime)


if __name__ == '__main__':
    unittest.main(verbosity=2)
