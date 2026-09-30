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
sys.path.insert(0, "src/experiment")
sys.path.insert(0, "src")
from auth import Auth
from constants import BROWSER_USER_AGENT

a = Auth()
a.uid = AUTHOR_UID
a.load()
H = "https://me.weibo.com/api/proxy/native/"

def grab(path, params):
    r = a.session.get(H + path, params=params,
                      headers={"User-Agent": BROWSER_USER_AGENT,
                                "Referer": "https://me.weibo.com/"}, timeout=20000)
    s = r.text
    out = {}
    for metric in ("play_dura_count", "play_count", "upload_count"):
        i = s.find('"%s"' % metric)
        if i == -1:
            i = s.find(metric)
        if i != -1:
            j = s.find("number", i)
            if j != -1:
                # extract "number":"29.53"
                k = s.find('"', j + 8)
                l = s.find('"', k + 1)
                out[metric] = s[k+1:l]
    return r.status_code, out

for path in ("datanew", "datavidnew"):
    for p in ("", "1", "7", "30"):
        params = {"period": p} if p else {}
        code, out = grab(path, params)
        print("%-12s period=%-2s HTTP %s  %s" % (path, p or "def", code, out))
