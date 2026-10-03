# Weibo `weibo-pro-next`: Video Playback and Statistics Reporting

> Subject: `src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js` (9.78 MB)
> Analysed: 2026-10-01 (updated 2026-10-02)
> Finding: this is a **custom build of video.js** with **dash.js** (DASH adaptive) and **mpegts.js / MSE** (flv/mp4 demuxing) bundled in. Playback statistics reporting is done by several **video.js plugins** attached to `player`, and is **driven entirely by playback progress / playback events**, not by plain timers.
>
> 简体中文版:[weibo_pro_next_playback_analysis.zh-CN.md](weibo_pro_next_playback_analysis.zh-CN.md)

---

## 0. Structure at a glance

| Module | Line (approx.) | Role |
|---|---|---|
| `PlayStatistics` plugin | 123711 | POST `/aj/video/playstatistics?ajwvr=6` (once at playback start) |
| h5playlog plugin (unnamed class) | 123585–123694 | POST `/ajax/log/h5playlog` (once per ~30s of valid play) |
| `HistoryReport` plugin | 121526 | POST `https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json` (server-controlled interval) |
| video.js `Tech` | 24606 | playback technology layer; synthesises `timeupdate` with a 250ms `setInterval` when native events are missing (native vs manual: see **6.2**; Weibo uses the Html5 backend → native) |
| mpegts.js player | 76678/76797 | MSE playback; `new Worker` is only for demuxing (transcoding) |
| dash.js ABR | 39234 | `setInterval(...,250)` for bitrate-adaptation checks |

---

## 1. Question 1: how is each playback API scheduled?

**Not plain timers — a hybrid model of "playback-progress / playback-event driven + valid-play-duration accumulation".**

Every reporting plugin listens to video.js playback events via `this.player.on(event, handler)`. Core events:

- `playing` — playback started
- `timeupdate` — playback position changed (natively ~4/s; if the underlying tech does not dispatch native `timeupdate`, video.js **synthesises** it with `setInterval(fn, 250)`, see `Tech.trackCurrentTime`, line 24655)
- `pause` / `ended` / `seeked` / `seeking` / `error` / `loadeddata` / `canplay`

Trigger timing per beacon:

| Beacon | Trigger | Interval / count |
|---|---|---|
| **playstatistics** | only on `playing`, guarded by a `this.fire` flag so it is sent **exactly once per playback session** | 1 per playback |
| **h5playlog** | `timeupdate` → `_update` accumulates valid play seconds; also fires immediately on `pause`/`error`/`playing` (first frame) | once every **30s** of accumulated valid play (`timeBuffer >= 30`) |
| **report** (play_history) | `timeupdate` accumulates valid play; also fires immediately on `canplay`/`pause`/`ended`/`error`/`abort`/`replay`/`dispose`/`seeked` | interval decided **dynamically by the server's `next_report_delay_seconds`** |

Key difference:
- h5playlog's 30s is a **hard-coded front-end threshold**;
- report's interval is **pushed by the server via `next_report_delay_seconds` in the response** (see `HistoryReport.report`, lines 121556–121559: `this.next_report_delay_seconds = R.data.next_report_delay_seconds`).

> Note: what drives the periodic h5playlog/report sends is **not** `setInterval(30000)`, but **the `timeupdate` event plus a "valid play" filter on the `currentTime` increment, accumulated until the threshold**. So only "30s of genuinely watched playback" counts; muting / backgrounding / stalling that stops `currentTime` from advancing will not trigger it.

---

## 2. Question 2: the playback reporting algorithms in detail

### 2.1 Common skeleton: `data` / `key` / `sig`

All three beacons share the same three-part field set, POSTed as `multipart/form-data` (`FormData`):

- `data` — business payload (string)
- `key`  — request identifier
- `sig`  — signature = `SparkMD5.hash(data + key + SALT)`

| Beacon | `key` format | `sig` SALT |
|---|---|---|
| playstatistics | `Log_${rand5}_${Date.now()}${rand4}${count++}` | `yixiong&zhaolong5` |
| h5playlog | `Log_h5play_${rand5}_${Date.now()}${rand4}${count++}` | `encryptedString` |
| report | query string (`qs.stringify`), no key/sig | none |

> Both `key`s carry `count++` (per-instance increment), `rand5 = Math.random().toString(36).substring(5,10)`, `rand4 = Math.floor(Math.random()*1e4)`.

### 2.2 `PlayStatistics` (playstatistics) — sent once at playback start

```js
// 123711 PlayStatistics extends Plugin
eventMap = { playing: _onPlayingHandle, ended: _onEndedHandle }
_onPlayingHandle() { this.fire || (this._sendLog(), this.fire = !0) }  // first playing only
_onEndedHandle()   { this.fire = !1 }                                  // reset so next play can send again
_logKey()  { return `Log_${...}_${+new Date}${...}${this.count++}` }
_md5Log(o,c){ return SparkMD5.hash(`${o+c}yixiong&zhaolong5`) }
_sendLog() {
  const o = JSON.stringify(this.logRecord)        // {uid, mid, keys, type, uuid, ...}
  const c = new FormData
  c.append("data", o); c.append("key", this._logKey()); c.append("sig", this._md5Log(o, key))
  const d = new XMLHttpRequest; d.withCredentials = !0
  let R = "/aj/video/playstatistics?ajwvr=6"      // podcast type uses /ajax/log/sendAudioLog
  d.open("POST", R); d.setRequestHeader("X-Xsrf-Token", getCookie("XSRF-TOKEN"))
  d.send(c)
}
```
`logRecord` comes from the plugin init params: `playStatistics: { uid, mid, keys: actionlog.uuid, type: "feedvideo"|"podcast", ... }` (line 134947). `keys`/`uuid` is the post's `actionlog.uuid`.
**Essence**: at playback start, tell the server once "who is watching (uid), which video (mid), which actionlog (keys), what type (type)".

### 2.3 h5playlog plugin — one beacon per 30s of valid play (the core heartbeat)

**a) Initialised fields (`logRecord`)** (123585–123607):
```
firstframe_status, quit_status, firstframe_time, startplay_time,
valid_play_duration, download_size, bitrate, encode_mode,
extend: { sid: `H5_${rand5}_${Date.now()}${rand4}${rand10}`, qType: 720 }
required (options): uid, object_id, mid, mid_uid, rootmid, rootuid, duration
```

**b) First frame + first-play send** (123618–123624):
```js
this.player.one("playing", () => {           // fires once
  this.logRecord.play_time = dayjs().format("YYYY-MM-DD HH:mm:DD")
  this.logRecord.startplay_time = Math.floor(currentTime*1000)
  this._sendLog(); this.startPlay = !0
})
this.player.on("loadeddata", () => {         // first frame
  this.logRecord.firstframe_time = Date.now()-startTime
  this.logRecord.duration = player.duration(); firstframe_status="success"
})
```

**c) Heartbeat accumulation `_update`** (bound to `timeupdate`, 123663):
```js
_update() {
  const o = player.currentTime()
  const c = o - this.lastTime
  const u = (c < .6 && c > 0) ? c : 0          // ★ only "continuous valid" increments count
  this.valid_play_duration += u
  this.lastTime = o
  this.timeBuffer += u
  if (this.timeBuffer >= 30) this._sendLog()   // ★ one beacon per 30s of valid play
}
```
**The "valid play" filter is the key**: on each `timeupdate` the current `currentTime` is diffed against the previous one (`c`):
- `0 < c < 0.6s` → counted as valid (normal steady playback, tick ≈ 0.25s);
- `c <= 0` (paused / seeked backwards) or `c >= 0.6s` (fast-forward / stall / backgrounding causing a jump) → recorded as 0, **not counted as valid play duration**.

`pause`/`seeked`/`seeking` handling (123651–123659): only updates `lastTime`, to avoid counting a seek jump as valid play.

**d) Send `_sendLog`** (123674):
```js
this.logRecord.playduration = Math.floor(currentTime*1000)
this.logRecord.valid_play_duration = Math.floor(this.valid_play_duration*1000)
const R = `${Object.values(logRecord without extend).join(";")};${Object.keys(extend).map(k=>`${k}=>${extend[k]}`).join(",")}`
// e.g. 2026-10-01 17:13:02;<VIEWER_UID>;1034:<VIDEO_MID2>;...;vf=>newPC,sid=>H5_...,qType=>720
const xe = this._logKey()                       // Log_h5play_...
u.append("data", R); u.append("key", xe); u.append("sig", SparkMD5.hash(R+xe+"encryptedString"))
yield axios.post("/ajax/log/h5playlog", u)      // async, generator + axios
this.timeBuffer = 0; this.valid_play_duration = 0   // cleared after sending
```
> `data` assembly rule: the main `logRecord` fields are joined by `;` on their values, the `extend` block uses `key=>value` joined by `,`, and the two parts are separated by a `;`. This matches the real captured HAR body exactly.

### 2.4 `HistoryReport` (report / play_history) — server-controlled interval

```js
// 121540 timeupdateHandle
const c = currentTime - lastTime
const u = (c < .6 && c > 0) ? c : 0
this.valid_play_duration += u; this.lastTime = o; this.timeBuffer += u
if (this.timeBuffer >= this.next_report_delay_seconds && this.next_report_delay_seconds !== -1)
    this.report(1)

report(play_type=0) {
  const u = currentTime
  const d = { ...options, play_type, seconds: u.toFixed(0) }
  c.open("POST", `https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json?${qs(d)}`)
  c.onreadystatechange = () => {
    if (readyState==4 && status==200) {
      this.next_report_delay_seconds = JSON.parse(c.response).data.next_report_delay_seconds  // ★ server pushes the next interval
      this.afterReport()   // timeBuffer = 0
    }
  }
}
// event bindings (121566–121572):
player.one("canplay", reportOnce)              // one report right at start
["error","abort","pause","replay","ended","dispose"].forEach(e => player.on(e, report))
player.on("seeked",   debounce(report(1), 500))
player.on("seeking",  () => updateDisabled = !0)   // accumulation paused while seeking
player.on("timeupdate", timeupdateHandle)
```
**Essence**: shares the same "valid-play filter + accumulation" logic as h5playlog, but the **threshold `next_report_delay_seconds` is returned by the server on every response**, so the real cadence is up to the server (usually also ~30s, but it can be raised/lowered, or set to `-1` to stop periodic reporting).

---

## 3. Question 3: single-threaded sync, or multi-threaded async?

**Reporting / playback control: single-threaded (main-thread event loop). Media demuxing: multi-threaded (Web Worker).**

- JS itself is **single-threaded**: all beacon scheduling, `timeupdate` handling and `XMLHttpRequest`/`axios` sending run on the main thread's event loop, kept non-blocking by **async callbacks** (`onreadystatechange` / `Promise` / `generator`) — waiting on the network never stalls playback.
- The `setInterval(fn, 250)` used to synthesise `timeupdate` (line 24655) is also a main-thread timer, not a separate thread.
- The file does contain `new Worker` (lines 31855, 78623), but it **only serves media demuxing / transcoding** (mpegts.js / MSE move demuxing into a Worker to relieve the main thread). Those Workers are **unrelated to playback statistics reporting**.

> Conclusion: what you need to reproduce is the **reporting behaviour**, which happens entirely on the main thread. Simulating it needs — and should not use — multiple threads; triggering on events / accumulation thresholds is enough.

---

## 4. Fidelity implications for our `simulated_watch`

| Real behaviour | Aligned in `simulated_watch`? | Notes |
|---|---|---|
| playstatistics sent once, on `playing` only | ✅ approximate (start burst) | the `fire` flag guarantees a single send |
| **h5playlog fires once per 30s of valid play** (hard-coded `timeBuffer >= 30`) | ✅ approximate (our `cadence=30`) | note this is a **hard-coded 30**, not a server cadence; `_afterSend` clears `valid_play_duration`, so each heartbeat reports the **delta since the previous send** |
| **playstatistics (play_history) interval reads the server's `next_report_delay_seconds`** | ❌ currently a fixed `delay` | `_post_report_step` should parse `next_report_delay_seconds` from the response and use it as the next interval (initially `-1`, only obtained after the first `canplay` report) |
| valid_play_duration filtered by `c<0.6` (both paths) | ❌ currently `min(sec,duration)` | must filter per `timeupdate` tick increment; PlayLog resets `lastTime` on seek to make the increment ≈0, HistoryReport uses an `updateDisabled` flag — same effect |
| third path: `/ajax/feed/throwbatch` (feed exposure) not implemented | ❌ missing entirely | `gatherPlayerLogs` flushes on `end`/`triggerADLog` (incl. `pause`), reporting `valid_play_duration/startplay_time/playduration/isautoplay` into `actionlog.ext` |
| `key`/`sig` SALT per beacon | ✅ playstatistics=`yixiong&zhaolong5`; h5playlog=`encryptedString` | matches the source |
| h5playlog `data` assembly (`;` + `key=>value`) | ✅ matches HAR | — |
| h5playlog final-heartbeat `quit_status` enum | ✅ `complete` / `not_complete` (2026-10-02) | `not_complete` is emitted when `--max-wall-time` cuts a video short (see **6.10**); `cancel` / `error` remain unused because we never abort or error out |
| real-world "imperfection" (stalls/seeks filtered by `<0.6`) | ❌ our tick is always 0.25, **never filtered** | we simulate ideal stall-free / seek-free continuous play, so `valid_play_duration` always equals `playduration`; in real logs `valid < playduration` is the norm (HAR sample 30059 vs 102654, see 6.4 / 6.6). Could be closed with a `--jitter` option |
| `PC_real_read` on its own **5s** cadence + `read_duration` as a delta | ✅ (fixed 2026-10-02) | it used to **piggy-back h5playlog's 30s** and sent an absolute position; fixed per `exposureBatchService`'s `interval=5e3` + `resetReportTimers` (see **6.8**) |
| RUM flush every **500ms** + one transaction per XHR | ✅ (fixed 2026-10-02) | it used to send a single page-load; now a queue with timed batching per `flushInterval:500` (see **6.9**) |

**The most important gaps**: **only the playstatistics (play_history) channel** is driven by the server's `next_report_delay_seconds` (initially `-1`, written back after the first `canplay` report); the h5playlog channel is **hard-coded to 30s in the source**, so our `cadence=30` is actually closer to the latter. Both channels must accumulate valid play duration per `timeupdate` tick increment (`<0.6s` only) instead of by wall-clock seconds. And a separate `throwbatch` feed-exposure log is still not implemented at all.

---

## 5. The third reporting path: `/ajax/feed/throwbatch` (feed exposure log)

`gatherPlayerLogs` (source `index-Xve1TSN5.js#135463`) is a **third** playback report independent of h5playlog / play_history. It is attached to the player inside the Weibo feed and reports exposure-level behaviour — "this video was seen / played up to here in the feed". Our `simulated_watch` does **not implement it at all**, which is a fidelity gap.

### Algorithm
- Binds `seeked`/`playing`/`seeking` → only updates `lastTime = currentTime()`; `timeupdate` → accumulates `valid_play_duration` with `u += c < .6 && c > 0 ? c : 0` (same `<0.6` filter).
- Flush trigger (`st()`): the player's `end` event, or the `triggerADLog` event (and `pause` does `trigger("triggerADLog")`). **So it flushes once when the video finishes, and once on pause (including ads).**
- Flush content: appends `valid_play_duration:<ms>`, `startplay_time:<ms>`, `playduration:<ms>`, `isautoplay:<0>` to `o.ext` (a `|`-separated `key:value` string passed in by the caller), and POSTs it as `actionlog` (`{...o, ext}`) to `/ajax/feed/throwbatch`.
- After flush, `u = 0` (cleared).
- **Note**: in this path `startplay_time` and `isautoplay` are **hard-coded 0** (`const d = 0; const xe = 0`), not real values — `throwbatch` only borrows the field names; the genuinely meaningful ones are `valid_play_duration` / `playduration`.

### Differences from the other two paths
| Dimension | h5playlog (`PlayLog`) | play_history (`HistoryReport`) | throwbatch (`gatherPlayerLogs`) |
|---|---|---|---|
| Endpoint | `/ajax/log/h5playlog` (multipart) | `multimedia.api.weibo.com/.../report.json` | `/ajax/feed/throwbatch` (JSON `actionlog`) |
| Cadence | hard-coded every 30s | server `next_report_delay_seconds` | event-driven (`end`/`pause`/`AD`) |
| valid filter | `<0.6` + seek resets `lastTime` | `<0.6` + `updateDisabled` | `<0.6` |
| Field format | `;`-joined + `key=>value` extend | query string | `|`-joined `key:value` into `ext` |
| Implemented by us? | ✅ | ✅ (approximate) | ❌ missing |

> Also: `autoPlayerLogs` (same file #135503) is a periodic GET ping for third-party pre-roll (`third_party_play`); unrelated to core playback statistics, not covered here.

### Implementation status (`simulated_watch` aligned, 2026-10-01)
`src/experiment/fetch/simulated_watch.py` was refactored to be **event-driven** (`_drive_event_player`), no longer using `build_sequence` + `time.sleep(args.delay)` with a fixed cadence (that rigid periodicity is the easiest thing to fingerprint):
- A virtual clock advances `currentTime` in `TICK=0.25s` steps (≈ the browser's `setInterval(fn,250)` `timeupdate`); each tick accumulates **valid play** via `c = currentTime-lastTime; u = c<0.6 && c>0 ? c : 0`, feeding two independent buffers for h5playlog and report.json.
- **h5playlog**: fires when its buffer reaches `>= 30s` (hard-coded `PlayLog.timeBuffer>=30`), and `valid_play_duration` is cleared after sending — so each heartbeat reports the **delta since the previous send**, not a cumulative position (the old delay loop reported the absolute `sec` as valid, growing forever; fixed). `playduration` remains `currentTime` (absolute position).
- **report.json**: fires when its buffer reaches `>= next_report_delay_seconds`, read from this channel's own response `data.next_report_delay_seconds` (server-driven), initially 30.
- The final heartbeat is sent when `currentTime>=duration`, with `quit_status='complete'`.
- `--speed` (default 1.0 = faithful 1x; >1 only fast-forwards for self-tests; **no such concept in the official code** — the official build only has a real `playbackRate`, a different mechanism but equivalent reports, see **6.5**). DASH bytes are still fetched one chunk per tick (no-op once fully fetched).
- `--delay` / `--cadence` are **deprecated** in this script: they no longer drive any beacon cadence. They are only kept to derive `--speed` when it is unset (`speed = cadence/delay`). Use `--speed`.
- `--max-wall-time` (added 2026-10-02): a **real wall-clock limit** on how long the run may take, written as `90` (seconds when bare), `300s`, `20m`, `1h`, or a combination such as `1h30m5s` (`0` = no limit). When it is exhausted, the current video stops at once — its final heartbeat carries `quit_status='not_complete'` (the viewer left mid-way) — and no further video is played. The audit and summary always still run. See **6.10**.

---

## 6. The event-driven engine underneath: `timeupdate` and video.js

The "filter by `timeupdate` tick increment", `TICK=0.25` and `setInterval(fn,250)` that recur throughout the previous sections all originate here. This section explains those underlying concepts once and for all.

### 6.1 What is the `timeupdate` event?

The HTML5 `<video>` **playback-position-changed event**: fired periodically by the browser during playback (the spec allows 15–250ms, Chrome measures ~250ms); each time it fires, `currentTime` has advanced a little.

It is **the driver of all playback statistics**: all three reporting paths — `PlayLog` (#123579), `HistoryReport` (#121480), `gatherPlayerLogs` (#135463) — hang off this event, each time computing `c = currentTime - lastTime` and accumulating into `valid_play_duration` after the `c < 0.6` filter. **Without `timeupdate` there is no play-duration accumulation at all.**

### 6.2 Who fires `timeupdate`: native vs manual

video.js abstracts different backends as **Tech** (playback technology) and marks "can this backend emit native `timeupdate`" with `featuresTimeupdateEvents`:

- The base class **defaults to "not supported"**: `Tech.prototype.featuresTimeupdateEvents = !1` (#24838)
- The Html5 backend (a real `<video>` element) explicitly declares support: `Html5.prototype.featuresTimeupdateEvents = !0` (#28467)
- The branch at construction (#24615):

```js
this.featuresProgressEvents || this.manualProgressOn(),
this.featuresTimeupdateEvents || this.manualTimeUpdatesOn(), ...
```

That is: **manual synthesis is enabled only when it is not supported.**

Typical "not supported" cases: the Flash backend, or engines that transmux DASH/FLV into MSE themselves — there is no media element underneath periodically emitting `timeupdate` for video.js to listen to. video.js then has to synthesise it (#24655):

```js
trackCurrentTime() {
  this.currentTimeInterval && this.stopTrackingCurrentTime(),
  this.currentTimeInterval = this.setInterval(function() {
    this.trigger({ type: "timeupdate", target: this, manuallyTriggered: !0 })
  }, 250)
}
```

— this is the "manual timeupdate", and **the origin of the `250ms` value**.

**Weibo uses the Html5 backend → the native path**, so `manualTimeUpdatesOn()` is never called and the `setInterval(250)` above does not exist in Weibo's actual runtime.

| | Native mode (what Weibo uses) | Manual mode (fallback) |
|---|---|---|
| Emitted by | the browser `<video>` | video.js `setInterval(fn,250)` |
| Interval | 15–250ms, measured ~250ms, **not strictly fixed** | **strictly 250ms** |
| Upstream statistics logic | identical (only the `currentTime` delta matters) | same |

### 6.3 Which file is video.js in?

**There is no separate file — it is bundled entirely into `index-Xve1TSN5.js`**:

```
src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js
```

Evidence: the copyright header at #22472 and the version registration at #22481 / #29888 `videojs.VERSION = version$6` (= `"0.1.4-beta6"`, a version string injected by Weibo's custom packaging). The player plugins (`PlayLog`, `HistoryReport`, `gatherPlayerLogs`) and dash.js all live in the same bundle.

### 6.4 Why 250ms? And why is the `0.6` threshold 0.6?

These two numbers are **a matched pair**:

- the `timeupdate` interval is **capped at 250ms** (0.25s)
- the filter threshold `c < 0.6` (600ms) is a tolerance ceiling slightly above that maximum interval

Hence an important corollary: **as long as playback is continuous and normal, every tick's increment is necessarily < 0.6 and necessarily passes the filter**, so `valid_play_duration` ≈ the true playback duration. Only anomalies get filtered:

| Anomaly | Increment behaviour | Filtered? |
|---|---|---|
| seek / drag | large jump (e.g. +30s) or negative | ✅ filtered (>0.6) |
| stall / buffering | interval stretched beyond 0.6s | ✅ filtered |
| pause / backgrounding | increment 0, or huge interval | ✅ filtered (or not fired) |

Conversely: **`valid_play_duration` noticeably smaller than `playduration` means that view had a lot of seeking/stalling.** The HAR sample `playduration=102654ms` vs `valid=30059ms` (a 72s gap) is exactly that — which also explains why 0.6 is not an arbitrary number.

### 6.5 Does `--speed` exist in the official code?

**No.** The official player is real: `currentTime` is driven by actual decoding and is inherently 1x; the source has no concept of "fast-forwarding for simulation". Likewise, the name `TICK` is ours (see 6.6) — the official code only has the `setInterval(fn, 250)` literal.

But the official build **does have real playback rate**: `playbackRate()` / `techCall_("setPlaybackRate", r)` (#29473) — at 2x, `currentTime` really advances 0.5s within the same 250ms of real time.

Our `--speed` is **a different mechanism but produces equivalent reports**:

- `--speed` only changes `real_sleep = TICK / speed` (the real wait); it **changes no reported value** — every field is derived from the virtual `cur`, which advances a constant 0.25 per tick regardless of speed.
- At `speed=20`, the 30th virtual second still reports `playduration` of `30000ms`, identical to 1x; only the real elapsed time becomes 1/20.
- So `--speed>1` is **fast-forward for self-tests**: what the server sees is field-for-field identical to a faithful 1x run and cannot be distinguished.

### 6.6 Does our Python have a `timeupdate` mechanism?

**No native one** (no `<video>` element, no browser event loop, no real decoding), but there is a **deliberately equivalent synthetic mechanism**: in `_drive_event_player`, **one iteration of the `while` loop = one `timeupdate`**, with `TICK=0.25` taken from `setInterval(fn,250)` at #24656.

Line-by-line mapping:

| Official JS (inside the timeupdate callback) | Our Python (inside the loop) |
|---|---|
| one timeupdate every 250ms | `cur = min(cur + TICK, duration_s)` (TICK=0.25) |
| `c = currentTime - lastTime` | `c = cur - last` |
| `u += c < .6 && c > 0 ? c : 0` | `u = c if (0 < c < 0.6) else 0.0` |
| `lastTime = currentTime` | `last = cur` |
| accumulate `valid_play_duration` | `hl_valid / hl_buf / ps_valid / ps_buf += u` |
| `timeBuffer >= 30` → send heartbeat | `if hl_buf >= 30: fire_h5play(False)` |
| real wall clock advanced by decoding | `time.sleep(real_sleep)` (speed=1 → 0.25s) |

Structural difference: the official code is an **async event callback** (the browser fires it whenever), ours is a **synchronous loop + sleep**. But the semantics are fully equivalent — both only look at the `currentTime` delta and do not care who triggered it.

**Known fidelity gap (not fixed)**: our `cur` is a virtual number we increment ourselves, always +0.25 per iteration → `c` is always 0.25 → **always < 0.6 → always passes the filter**. That is, we simulate **ideal playback with no stalls, no seeks, no pauses**, so `valid_play_duration` always equals `playduration`. In real logs, `valid < playduration` is the norm (see the HAR sample in 6.4: 30059 vs 102654). To get closer to a real user one could inject random stalls / seek jitter (making some tick increments exceed 0.6s so they get filtered), e.g. a new `--jitter` option defaulting to 0 (current behaviour).

### 6.7 How is the 250ms timed? Does single-threaded blocking IO slow it down?

**Answer: via `sleep`, but `sleep` cannot time IO in parallel — so it has been changed to "deadline compensation".**

- We are a **single-threaded synchronous** process. Each tick: advance the virtual `cur` → maybe send a beacon (HTTP, **blocking**) → fetch a DASH chunk (**blocking**) → `sleep`.
- `time.sleep()` **just waits in place**; it does not "time the IO while waiting". So the old implementation (a fixed `sleep(0.25)`) had a real tick period of **IO time + 0.25s** — the tick that sent a heartbeat got stretched to 0.4s or more by the HTTP round trip, systematically lengthening the whole watch.
- The official code is an **async event loop**: `setInterval(fn,250)` is driven by the browser's timer thread, XHRs are sent asynchronously and **do not block the tick**. So the official `timeupdate` always fires every 250ms, **in parallel with network IO**.

**Current approach (deadline compensation)**: instead of always sleeping 0.25s, sleep until the **next tick's deadline**:

```python
now = time.perf_counter()
remaining = next_tick - now
if remaining > 0:
    time.sleep(remaining)
next_tick = max(now, next_tick) + real_sleep
```

- IO took 120ms → only sleep the remaining 130ms, so the tick's real period is still 250ms.
- IO exceeded 250ms → do not sleep at all, go straight to the next tick (`max(now, ...)` prevents debt from accumulating into an avalanche).

**Key point**: the virtual clock `cur` is pure arithmetic (`cur += 0.25`), **always accurate**, unaffected by IO or sleep → **the values of all reported fields are unaffected**. Only the "real wall-clock cadence" is affected; with compensation the long-run average stays close to 250ms and the whole watch is no longer stretched by IO.

The fundamental difference from the official code **cannot be eliminated**: official IO and ticks run **in parallel**, ours run **serially**. As long as a single tick's IO is under 250ms, deadline compensation makes the average cadence equivalent; if one request is especially slow (>250ms) that tick necessarily overruns — an inherent limit of the synchronous model.

### 6.8 The real `PC_real_read` mechanism (aligned, 2026-10-02)

We used to make `read` **piggy-back** on h5playlog's 30s heartbeat and sent `playduration` (absolute playback position) as `read_duration` — **both were wrong**. The real mechanism in the source is `exposureBatchService$2` (#231168), a **feed exposure service** unrelated to the player:

- **Its own periodic timer**: `options.interval` defaults to `5e3` (**5 seconds**), and `startReporter()` uses `setInterval(..., n.options.interval)` (#231217–231224). **Not** 30s, and not tied to h5playlog.
- **Reset after sending**: each report calls `resetReportTimers()`, which resets `effectiveStartTime / trueStartTime` to now (#231226) → so `read_duration` is **the delta since the previous report**, not a cumulative position.
- **Visibility threshold**: `IntersectionObserver` with thresholds `[0, .3]` (#231192); a visible ratio **>= 0.3** counts as a "true view" and starts accumulating `read_duration` (#231239); `duration` accumulates whenever it is visible (>0) at all.
- **One extra report when leaving the page**: `handleBeforeUnload` sends a final one via `sendBeacon` (#231247).
- **Independent of the `<0.6` filter**: `read` measures **dwell time** (wall clock) and does not go through the playback tick filter — if the video stalls but the card is still visible, `read` keeps counting.

**Our changes** (`simulated_watch._drive_event_player`):
- `read` was split out of `fire_h5play` into its own `rd_buf` buffer, firing every **5s**.
- `read_duration` is now a **delta** (since the previous `read` report), no longer `playduration`.
- `rd_buf += TICK` with **no `<0.6` filter** (matching "only visibility is required").
- One final `read` is sent when playback ends (matching `handleBeforeUnload`).

### 6.9 The real RUM mechanism (aligned, 2026-10-02)

Weibo uses the **Elastic APM RUM agent** (`ApmVuePlugin`, #252831): `serverUrl: "https://rum.h5.weibo.cn"`, `serviceName: "AppVue3"`, `disableInstrumentations: ["click"]`. How it reports:

- **`flushInterval: 500`** (#234185) — every **500ms** it batch-POSTs the queued events to `/intake/v2/rum/events`.
- Event kinds: a **page-load** transaction (once, when the page finishes loading) + **one http-request transaction per XHR**.
- So RUM is **not** "send one page-load and be done"; it **continuously batch-reports every request of the whole watch, every 500ms**.

**Our changes**:
- Burst phase: measure each XHR's duration and put **page-load + all XHR transactions** into the first flush (it used to be a lone page-load, placed even before the XHRs).
- Playback loop: after each beacon, record one http-request transaction into the queue and batch-flush every **500ms**; force a flush at the end.

### 6.10 Stopping on a real wall-clock budget (`--max-wall-time`, 2026-10-02)

`--speed` controls the **virtual** pace; `--max-wall-time` controls **how long the process may actually run**. It is a real-time budget for the whole run (`0` = unlimited), written as a human duration — a bare number means seconds (`90`), otherwise `300s`, `20m`, `1h`, or a combination such as `1h30m5s`.

- Checked in two places: **before each video** (if the budget is already gone, no further video is started) and **inside the tick loop** — so a long video is cut off at the budget boundary instead of overrunning by many minutes.
- When the loop is cut short the video is still closed properly: final h5playlog heartbeat, final `read` (like `handleBeforeUnload`), final report.json, and a forced RUM flush.
- That final heartbeat then reports **`quit_status='not_complete'`** rather than `complete` — exactly what the official `PlayLog.dispose()` does when the viewer leaves before the end. (Previously `beacon_engine` could only emit `""` / `complete`; the `complete` / `not_complete` part of the Appendix A enum is now supported.)
- The audit and summary (`AUDIT`, `DONE`, `TIMING`) always run, plus a `STOPPED EARLY` line reporting how many planned video-plays were skipped.

> Note: `--max-wall-time` is a budget on **real** time, so it interacts with `--speed`. At `--speed 1` the two are equal; at `--speed 20` a 300s budget covers ~6000s of virtual playback.

---

## Appendix A: h5playlog `data` field-by-field mapping

> **Cross-validation record (2026-10-01)**: this table was verified three ways against a real HAR, `src/tmp/video/weibo-video-watch-waterfall-2026-10-01.har` (19 h5playlog entries; two heartbeats taken — the start one and the +30s one), and against the local source `logRecord` literal at `src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js#123590`. An earlier draft had **#13/#14 (`firstframe_time` and `startplay_time`) swapped** (206 was misread as `startplay_time`); it was corrected per the source order `...firstframe_status, quit_status, firstframe_time, startplay_time, valid_play_duration...`. The other 17 fields, the extend block (`vf`/`sid`/`qType`) and `key`/`sig` all match the HAR with no errors. The HAR's `Content-Type: multipart/form-data; boundary=----WebKitFormBoundary<16alnum>` also matches `simulated_watch`'s WebKit boundary implementation.

Source: the `PlayLog` class (from 123579), with the `logRecord` literal at 123590–123607.
`data` assembly (source 123674): `R = Object.values(logRecord without extend).join(";") + ";" + Object.keys(extend).map(k=>`${k}=>${extend[k]}`).join(",")`.
That is: the **main string** = field values joined by `;`; **after the trailing `;`** = the `extend` block, `key=>value` joined by `,`.

### Real sample
```
2026-10-01 21:49:01;<VIEWER_UID>;1034:<VIDEO_MID>;<POST_MID>;<AUTHOR_UID>;<POST_MID>;<AUTHOR_UID>;1594.839;;1;102654;success;;140;0;30059;;;;vf=>newPC,sid=>H5_mjlxi_<SID>,qType=>720
```

### Main string (19 `;`-separated values, order = `Object.values(logRecord)` insertion order)

| # | Value | Field | Meaning |
|---|---|---|---|
| 0 | `2026-10-01 21:49:01` | `play_time` | local time of this report (dayjs `YYYY-MM-DD HH:mm:DD`) |
| 1 | `<VIEWER_UID>` | `uid` | logged-in viewer uid |
| 2 | `1034:<VIDEO_MID>` | `object_id` | video object id; `1034:` is the Weibo video object type prefix, followed by the numeric id |
| 3 | `<POST_MID>` | `mid` | mid of the watched post |
| 4 | `<AUTHOR_UID>` | `mid_uid` | author uid of that post |
| 5 | `<POST_MID>` | `rootmid` | root post mid (top of the repost chain; equal to mid means original) |
| 6 | `<AUTHOR_UID>` | `rootuid` | root post author uid |
| 7 | `1594.839` | `duration` | total video duration (seconds) |
| 8 | *(empty)* | optional option (e.g. `play_type`/`source`) | caller did not pass it → empty string |
| 9 | `1` | `isautoplay` | whether autoplay is on, `+player.autoplay()` (1 = yes) |
| 10 | `102654` | `playduration` | **current playback position** (ms) = 102.654s |
| 11 | `success` | `firstframe_status` | first-frame status: `success` (first frame rendered) |
| 12 | *(empty)* | `quit_status` | exit status: **empty = still playing**; only the final heartbeat (`dispose`) fills it, enum `complete` (finished) / `not_complete` (left midway) / `cancel` (buffering/loading interrupted) / `error` |
| 13 | `140` | `firstframe_time` | first-frame render cost (ms) = `Date.now()-startTime` (HAR sample: 206) |
| 14 | `0` | `startplay_time` | `currentTime` at the moment of the `playing` event (ms), ≈0 at start (HAR sample: 0) |
| 15 | `30059` | `valid_play_duration` | **valid play duration accumulated since the previous send** (ms) = 30.059s; each heartbeat reports only the delta — `_afterSend()` clears `valid_play_duration` right after sending, so the first heartbeat = 0 and the +30s one ≈30000 |
| 16 | *(empty)* | `download_size` | bytes downloaded (empty in this sample) |
| 17 | *(empty)* | `bitrate` | bitrate (empty in this sample) |
| 18 | *(empty)* | `encode_mode` | encoding mode (empty in this sample) |

### extend block (after the `;`, `key=>value` joined by `,`)

| Field | Value | Meaning |
|---|---|---|
| `vf` | `newPC` | view-from / source client: watched from the "new PC web" client |
| `sid` | `H5_mjlxi_<SID>` | stable session id for this watch (`H5_`+rand5+Date+rand4+rand10); the same `sid` is reused across every heartbeat of one video |
| `qType` | `720` | quality level (720p) |

### Reading notes
- **`playduration` (102654ms) vs `valid_play_duration` (30059ms)**: the former is the current playback position (102.6s), the latter accumulated only 30s of "valid" play. The ~72s difference is time filtered out by `<0.6s` — seeking / stalling / pausing / backgrounding — which is exactly the "valid-play filter" described earlier, observed on a real device.
- **`quit_status` empty** = this heartbeat was emitted mid-playback (not yet `ended`/`error`); the one sent at the end carries `complete` or `error`.
- **`firstframe_time=140/206`** = `Date.now()-startTime`, i.e. first-frame render cost (~140-206ms, not 0); **`startplay_time=0`** = `currentTime` at the moment of the `playing` event (≈0), consistent with `Math.floor(currentTime*1000)` in `_playTime`. They are **#13 / #14** respectively; an earlier draft had them swapped and was corrected per the `weibo-pro-next` source (`logRecord` literal order `...firstframe_status, quit_status, firstframe_time, startplay_time...`).
- The three trailing empties (`download_size`/`bitrate`/`encode_mode`) are empty because the plugin defaults those fields to `""` and they were not filled this time.
- `key` (e.g. `Log_h5play_pxxnb_1790846792987`) and `sig` (`SparkMD5(data+key+"encryptedString")`) are the two other multipart fields besides `data`; see section 2.3.
