"""Refresh per-uid profile caches from Weibo's profile/info API.

For every account in the registry that has a uid (or for uids given on the
command line), fetch fresh profile data and merge it into
``src/data/profile/<uid>.json`` via ``profiles.refresh``. Already-logged-in
accounts reuse their saved cookie session, so no QR scan is needed.

Usage:
    python src/refresh_profiles.py                 # refresh all registered uids
    python src/refresh_profiles.py <uid1> <uid2>   # refresh specific uids
"""

import os
import sys

SRC = os.path.dirname(os.path.abspath(__file__))
if SRC not in sys.path:
    sys.path.insert(0, SRC)

from config.accounts import load_accounts  # noqa: E402
from profiles import refresh  # noqa: E402


def main(argv):
    if argv:
        uids = argv
    else:
        uids = [a['uid'] for a in load_accounts() if a.get('uid')]

    if not uids:
        print('No uids to refresh (registry has no uid-bearing accounts).')
        return 0

    ok, failed = [], []
    for uid in uids:
        prof = refresh(uid)
        if prof is None:
            failed.append(uid)
            print('  FAIL   %s' % uid)
        else:
            ok.append(uid)
            print('  OK     %s -> screen_name=%r (source=%s)'
                  % (uid, prof.get('profile', {}).get('info', {}).get('screen_name'),
                     prof.get('local', {}).get('source')))

    print('\nRefreshed %d, failed %d.' % (len(ok), len(failed)))
    if failed:
        print('Failed uids: %s' % ', '.join(failed))
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
