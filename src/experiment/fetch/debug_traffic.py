import os as _os
import json as _json
# src/experiment/<topic>/<script>.py -> project root (holds the git-ignored config/)
_ROOT = _os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))))
try:
    _CFG = _json.load(open(_os.path.join(_ROOT, 'config', 'experiment.local.json'), encoding='utf-8'))
except Exception:
    _CFG = {}
AUTHOR_UID = _CFG.get('author_uid')
VIEWER_UID = _CFG.get('viewer_uid')
import sys, json
sys.path.insert(0, 'src/experiment')
sys.path.insert(0, 'src')
from auth import Auth

a = Auth()
a.uid = AUTHOR_UID
a.load()
oid = '1034:5336124491759666'
mid = '5336128521506653'
p = {'video_oid': oid, 'mid': mid, 'blogger_uid': AUTHOR_UID}

for tab in ('', 'traffic', 'analysis', 'diagnosis'):
    pp = dict(p)
    if tab:
        pp['tab'] = tab
    r = a.session.get('https://me.weibo.com/api/proxy/native/datavidnew',
                      params=pp, timeout=20000)
    d = r.json()
    s = json.dumps(d, ensure_ascii=False)
    print('=== tab=%r status=%s has_总播放时长=%s has_play_totallength=%s ===' % (
        tab, r.status_code, '总播放时长' in s, 'play_totallength' in s))
    for it in (d.get('data') or []):
        print('   item_id=%s type=%s' % (it.get('item_id'), it.get('type')))

# also check the 4 standalone datavid_item calls
for iid in ('dt_onevid_score', 'dt_onevid_playratio', 'dt_onevid_scene', 'dt_onevid_portrait'):
    r = a.session.get('https://me.weibo.com/api/proxy/native/datavid_item',
                      params={**p, 'is_new': '1', 'item_id': iid}, timeout=20000)
    d = r.json()
    s = json.dumps(d, ensure_ascii=False)
    print('=== datavid_item %s status=%s has_play_totallength=%s ===' % (
        iid, r.status_code, 'play_totallength' in s))
    data = d.get('data')
    if isinstance(data, dict):
        print('   data keys:', list(data.keys())[:12])
    elif isinstance(data, list):
        print('   data is list len', len(data))
