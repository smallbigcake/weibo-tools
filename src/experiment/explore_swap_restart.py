"""Stop the running explore_longread experiment (invalid targets PvL9Odf6Z/P6mkiuQRe),
archive its log, reset state, and relaunch it with the NEW verified-public targets
(P9v636F64 primary / P7p4yAcM3 control). Done in Python to avoid interactive prompts."""
import os
import sys
import io
import csv
import time
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.abspath(os.path.join(HERE, '..'))
os.chdir(SRC)
THIS = 'explore_longread.py'


def find_pids():
    try:
        out = subprocess.check_output(
            "wmic process where \"name='python.exe'\" get ProcessId,CommandLine /format:csv",
            shell=True, text=True, stderr=subprocess.DEVNULL)
    except Exception as e:
        print('wmic err', e); return []
    pids = []
    for row in csv.reader(io.StringIO(out)):
        # row ~ [Node, ProcessId, CommandLine]
        if len(row) >= 3 and THIS in (row[2] or ''):
            pid = (row[1] or '').strip()
            if pid.isdigit():
                pids.append(int(pid))
    return sorted(set(pids))


def kill_old():
    pids = find_pids()
    print('killing pids', pids)
    for pid in pids:
        subprocess.run('taskkill /PID %d /F /T' % pid, shell=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)
    rem = find_pids()
    print('remaining after kill', rem)
    return len(rem) == 0


def archive():
    log = os.path.join(SRC, 'tmp', 'readcnt_longread_log.jsonl')
    if os.path.exists(log):
        os.rename(log, os.path.join(SRC, 'tmp', 'readcnt_longread_log_PvL9Odf6Z.jsonl'))
        print('archived old log -> readcnt_longread_log_PvL9Odf6Z.jsonl')
    state = os.path.join(SRC, 'tmp', 'readcnt_longread_state.json')
    if os.path.exists(state):
        os.remove(state)
        print('removed state (fresh baseline)')


def launch():
    out = open(os.path.join(SRC, 'tmp', 'readcnt_longread_stdout.log'), 'w', encoding='utf-8')
    err = open(os.path.join(SRC, 'tmp', 'readcnt_longread_stderr.log'), 'w', encoding='utf-8')
    si = subprocess.STARTUPINFO()
    si.dwFlags = subprocess.STARTF_USESHOWWINDOW
    si.wShowWindow = 0  # hide the python console (browser still shows for headful visit)
    p = subprocess.Popen([sys.executable, os.path.join(HERE, THIS)], cwd=SRC,
                         stdout=out, stderr=err,
                         creationflags=0x00000008,  # DETACHED_PROCESS
                         close_fds=True, startupinfo=si)
    print('launched new pid', p.pid)
    return p.pid


if __name__ == '__main__':
    if not kill_old():
        print('!! KILL did not fully succeed; proceeding anyway (old may linger)')
    archive()
    launch()
    time.sleep(20)
    print('post-launch pids', find_pids())
    log = os.path.join(SRC, 'tmp', 'readcnt_longread_log.jsonl')
    if os.path.exists(log):
        print('--- fresh log ---')
        print(open(log, encoding='utf-8').read())
