"""Unit test: _QRWindow creates exactly one Tk window and reveals it once.

Verifies the double-window bug fix:
  - only one tk.Tk() instance is created
  - deiconify() is called exactly once (on first show)
  - refresh (2nd show) does NOT create a 2nd window
"""
import os
import sys
import time

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from PIL import Image
import auth as auth_mod
from auth import _QRWindow


def test_single_window_no_double():
    orig_tk = auth_mod.tk.Tk if hasattr(auth_mod, 'tk') else None
    created = []

    import tkinter as tk
    real_tk = tk.Tk
    deiconify_calls = []

    class _SpyTk(real_tk.__bases__[0] if False else object):
        pass

    # Patch Tk to record constructions and deiconify calls.
    class PatchedTk(real_tk):
        def __init__(self, *a, **kw):
            created.append(self)
            super().__init__(*a, **kw)

        def deiconify(self):
            deiconify_calls.append(self)
            super().deiconify()

    tk.Tk = PatchedTk
    try:
        win = _QRWindow(title='TEST QR')
        assert win._root is not None, 'root should be created'
        assert len(created) == 1, f'expected 1 Tk window, got {len(created)}'

        img = Image.new('RGB', (180, 180), 'white')
        win.show(img)         # first show -> deiconify
        time.sleep(0.1)
        win.show(img)         # refresh -> should NOT deiconify again
        time.sleep(0.1)

        assert len(deiconify_calls) == 1, (
            f'deiconify called {len(deiconify_calls)} times; '
            f'expected exactly 1 (single window reveal)'
        )
        win.close()
        assert len(created) == 1, 'a second Tk window was created on refresh'
        print('PASS: single window, deiconify called once')
    finally:
        tk.Tk = real_tk


if __name__ == '__main__':
    test_single_window_no_double()
    print('\nALL TESTS PASSED')
