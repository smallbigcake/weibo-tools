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

r = a.session.get('https://me.weibo.com/api/proxy/native/datavidnew',
                  params={**p, 'tab': 'traffic'}, timeout=20000)
d = r.json()

# find which item holds play_totallength / 总播放时长 / 总播放量
def find(obj, path=''):
    if isinstance(obj, dict):
        s = json.dumps(obj, ensure_ascii=False)
        if 'play_totallength' in s or '总播放时长' in s or 'videoonecore' in s:
            # print short context
            print('FOUND at', path, '-> keys', list(obj.keys())[:8])
            # try to show the value
            if 'select_subitems' in obj:
                print('   select_subitems:', json.dumps(obj['select_subitems'], ensure_ascii=False)[:400])
            if 'groups' in obj:
                print('   groups:', json.dumps(obj['groups'], ensure_ascii=False)[:400])
        for k, v in obj.items():
            find(v, path + '/' + str(k))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            find(v, path + '[%d]' % i)

find(d)

# Also dump dt_onevid_playratio item fully from traffic response
print('\n--- dt_onevid_playratio in traffic ---')
for it in (d.get('data') or []):
    if it.get('item_id') == 'dt_onevid_playratio':
        print(json.dumps(it, ensure_ascii=False)[:800])
