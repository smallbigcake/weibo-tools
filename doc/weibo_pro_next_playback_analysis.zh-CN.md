# 微博 weibo-pro-next 视频播放与统计上报机制分析

> 分析对象:`src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js`(9.78 MB)
> 分析日期:2026-10-01
> 结论:这是 **video.js 的定制 build**,并集成 **dash.js**(DASH 自适应)与 **mpegts.js / MSE**(flv/mp4 解封装)。视频播放相关的统计上报,由挂在 `player` 上的几个 **video.js 插件(Plugin)** 完成,**完全由播放进度/播放事件驱动**,而非纯粹的定时器。
>
> English version:[weibo_pro_next_playback_analysis.md](weibo_pro_next_playback_analysis.md)

---

## 0. 全局结构速览

| 模块 | 行号(约) | 作用 |
|---|---|---|
| `PlayStatistics` 插件 | 123711 | 发 `/aj/video/playstatistics?ajwvr=6`(播放开始时一次) |
| h5playlog 插件(未命名 class) | 123585–123694 | 发 `/ajax/log/h5playlog`(每 ~30s 有效播放一次) |
| `HistoryReport` 插件 | 121526 | 发 `https://multimedia.api.weibo.com/2/multimedia/user/play_history/report.json`(服务端控制间隔) |
| video.js `Tech` | 24606 | 播放技术层;`timeupdate` 在缺原生事件时用 250ms `setInterval` 合成(原生 / 手动两种模式详见 **6.2**;微博用 Html5 后端 → 走原生) |
| mpegts.js 播放器 | 76678/76797 | MSE 播放;`new Worker` 仅用于解封装(转码) |
| dash.js ABR | 39234 | `setInterval(...,250)` 做码率自适应检查 |

---

## 1. 问题一:各播放 API 用什么方法调度?

**不是纯定时器,而是「播放进度/播放事件驱动 + 有效播放时长累积」的混合模型。**

每个上报插件都通过 `this.player.on(event, handler)` 监听 video.js 的播放事件。核心事件:

- `playing` —— 开始播放
- `timeupdate` —— 播放进度变化(浏览器原生约 4 次/秒;若底层技术不派发原生 `timeupdate`,video.js 用 `setInterval(fn, 250)` **合成**它,见 `Tech.trackCurrentTime`,24655 行)
- `pause` / `ended` / `seeked` / `seeking` / `error` / `loadeddata` / `canplay`

各 beacon 的触发时机:

| Beacon | 触发方式 | 间隔/次数 |
|---|---|---|
| **playstatistics** | 仅 `playing` 事件,且用 `this.fire` 标志保证**整个播放会话只发一次** | 1 次/播放 |
| **h5playlog** | `timeupdate` → `_update` 累积有效播放秒;另在 `pause`/`error`/`playing`(首帧) 立即发 | 每累积满 **30s** 有效播放发一次(`timeBuffer >= 30`) |
| **report**(play_history) | `timeupdate` 累积有效播放;且 `canplay`/`pause`/`ended`/`error`/`abort`/`replay`/`dispose`/`seeked` 立即发 | 间隔由**服务端返回 `next_report_delay_seconds`** 动态决定 |

关键差异:
- h5playlog 的 30s 是**前端写死**的固定阈值;
- report 的间隔是**服务端通过响应里的 `next_report_delay_seconds` 下发**的(见 `HistoryReport.report`,121556–121559 行:`this.next_report_delay_seconds = R.data.next_report_delay_seconds`)。

> 注意:驱动 h5playlog/report 周期发送的,不是 `setInterval(30000)`,而是 **`timeupdate` 事件 + 对 `currentTime` 增量做「有效播放」过滤后累积到阈值**。所以「真实观看 30s」才会计一次,静音/后台/卡顿若导致 `currentTime` 不前进则不会触发。

---

## 2. 问题二:视频播放上报算法详解

### 2.1 共同骨架:`data` / `key` / `sig`

三个 beacon 都用同一套「三段式」字段,通过 `multipart/form-data`(`FormData`)POST:

- `data` —— 业务数据(字符串)
- `key`  —— 请求标识
- `sig`  —— 签名 = `SparkMD5.hash(data + key + SALT)`

| Beacon | `key` 格式 | `sig` 的 SALT |
|---|---|---|
| playstatistics | `Log_${rand5}_${Date.now()}${rand4}${count++}` | `yixiong&zhaolong5` |
| h5playlog | `Log_h5play_${rand5}_${Date.now()}${rand4}${count++}` | `encryptedString` |
| report | 走 query string(`qs.stringify`),无 key/sig | 无 |

> 两个 `key` 都带 `count++`(实例内自增),`rand5 = Math.random().toString(36).substring(5,10)`,`rand4 = Math.floor(Math.random()*1e4)`。

### 2.2 `PlayStatistics`(playstatistics)—— 播放开始发一次

```js
// 123711 PlayStatistics extends Plugin
eventMap = { playing: _onPlayingHandle, ended: _onEndedHandle }
_onPlayingHandle() { this.fire || (this._sendLog(), this.fire = !0) }  // 仅首次 playing 发送
_onEndedHandle()   { this.fire = !1 }                                  // 结束复位,下次播放可再发
_logKey()  { return `Log_${...}_${+new Date}${...}${this.count++}` }
_md5Log(o,c){ return SparkMD5.hash(`${o+c}yixiong&zhaolong5`) }
_sendLog() {
  const o = JSON.stringify(this.logRecord)        // {uid, mid, keys, type, uuid, ...}
  const c = new FormData
  c.append("data", o); c.append("key", this._logKey()); c.append("sig", this._md5Log(o, key))
  const d = new XMLHttpRequest; d.withCredentials = !0
  let R = "/aj/video/playstatistics?ajwvr=6"      // podcast 类型改为 /ajax/log/sendAudioLog
  d.open("POST", R); d.setRequestHeader("X-Xsrf-Token", getCookie("XSRF-TOKEN"))
  d.send(c)
}
```
`logRecord` 来自插件初始化参数:`playStatistics: { uid, mid, keys: actionlog.uuid, type: "feedvideo"|"podcast", ... }`(134947 行)。`keys`/`uuid` 即帖子的 `actionlog.uuid`。
**算法本质**:播放一开始,把「这是谁(uid)、看哪个视频(mid)、哪个 actionlog(keys)、什么类型(type)」告诉服务端一次。

### 2.3 h5playlog 插件 —— 每 30s 有效播放发一次(核心心跳)

**a) 初始化字段(logRecord)**(123585–123607):
```
firstframe_status, quit_status, firstframe_time, startplay_time,
valid_play_duration, download_size, bitrate, encode_mode,
extend: { sid: `H5_${rand5}_${Date.now()}${rand4}${rand10}`, qType: 720 }
必填(options): uid, object_id, mid, mid_uid, rootmid, rootuid, duration
```

**b) 首帧 + 首次播放发送**(123618–123624):
```js
this.player.one("playing", () => {           // 只触发一次
  this.logRecord.play_time = dayjs().format("YYYY-MM-DD HH:mm:DD")
  this.logRecord.startplay_time = Math.floor(currentTime*1000)
  this._sendLog(); this.startPlay = !0
})
this.player.on("loadeddata", () => {         // 首帧
  this.logRecord.firstframe_time = Date.now()-startTime
  this.logRecord.duration = player.duration(); firstframe_status="success"
})
```

**c) 心跳累积 `_update`(绑定在 `timeupdate`,123663)**:
```js
_update() {
  const o = player.currentTime()
  const c = o - this.lastTime
  const u = (c < .6 && c > 0) ? c : 0          // ★ 只累计「连续有效」增量
  this.valid_play_duration += u
  this.lastTime = o
  this.timeBuffer += u
  if (this.timeBuffer >= 30) this._sendLog()   // ★ 每满 30s 有效播放发一次
}
```
**「有效播放」过滤是关键**:每次 `timeupdate` 拿当前 `currentTime` 与上次做差 `c`:
- `0 < c < 0.6s` → 计入有效(正常匀速播放,tick≈0.25s);
- `c <= 0`(暂停/回拖)或 `c >= 0.6s`(快进/卡顿/切后台导致跳变)→ 记为 0,**不计入有效播放时长**。

`pause`/`seeked`/`seeking` 处理(123651–123659):只更新 `lastTime`,避免把 seek 的跳变算作有效播放。

**d) 发送 `_sendLog`(123674)**:
```js
this.logRecord.playduration = Math.floor(currentTime*1000)
this.logRecord.valid_play_duration = Math.floor(this.valid_play_duration*1000)
const R = `${Object.values(logRecord 去掉 extend).join(";")};${Object.keys(extend).map(k=>`${k}=>${extend[k]}`).join(",")}`
// 例: 2026-10-01 17:13:02;<VIEWER_UID>;1034:<VIDEO_MID2>;...;vf=>newPC,sid=>H5_...,qType=>720
const xe = this._logKey()                       // Log_h5play_...
u.append("data", R); u.append("key", xe); u.append("sig", SparkMD5.hash(R+xe+"encryptedString"))
yield axios.post("/ajax/log/h5playlog", u)      // 异步,generator + axios
this.timeBuffer = 0; this.valid_play_duration = 0   // 发完清零
```
> `data` 的拼接规则:logRecord 主字段按值用 `;` 连接,`extend` 内字段用 `key=>value` 用 `,` 连接,中间以 `;` 分隔。这与真实 HAR 抓到的 body 完全一致。

### 2.4 `HistoryReport`(report / play_history)—— 服务端控制间隔

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
      this.next_report_delay_seconds = JSON.parse(c.response).data.next_report_delay_seconds  // ★ 服务端下发下次间隔
      this.afterReport()   // timeBuffer = 0
    }
  }
}
// 事件绑定(121566–121572):
player.one("canplay", reportOnce)              // 起播即报一次
["error","abort","pause","replay","ended","dispose"].forEach(e => player.on(e, report))
player.on("seeked",   debounce(report(1), 500))
player.on("seeking",  () => updateDisabled = !0)   // seek 中暂停累积
player.on("timeupdate", timeupdateHandle)
```
**算法本质**:与 h5playlog 共用同一套「有效播放过滤 + 累积」逻辑,但**阈值 `next_report_delay_seconds` 由服务端每次响应回传**,因此真实节奏是服务端说了算(通常也是 ~30s 量级,但可被服务端调大/调小,甚至 `-1` 表示停止周期上报)。

---

## 3. 问题三:单线程同步,还是多线程异步?

**上报/播放控制逻辑:单线程(主线程事件循环)。媒体解封装:多线程(Web Worker)。**

- JS 本身是**单线程**,所有 beacon 调度、`timeupdate` 处理、`XMLHttpRequest`/`axios` 发送都在主线程的事件循环里跑,靠**异步回调**(`onreadystatechange` / `Promise` / `generator`)实现非阻塞,不会因等网络而卡住播放。
- 合成 `timeupdate` 用的 `setInterval(fn, 250)`(24655 行)也是主线程定时器,不是独立线程。
- 文件里确有 `new Worker`(31855、78623 行),但**只服务于媒体解封装/转码**(mpegts.js / MSE 把 demux 放到 Worker 里做,减轻主线程压力)。这些 Worker **与播放统计上报无关**。

> 结论:你要复现的是「上报行为」,它完全发生在主线程;模拟时不需要也不应该开多线程,只要按事件/累积阈值触发即可。

---

## 4. 对我们 `simulated_watch` 的忠实度启示

| 真实行为 | 当前 `simulated_watch` 是否已对齐 | 备注 |
|---|---|---|
| playstatistics 仅 `playing` 发 1 次 | ✅ 近似(起播 burst) | `fire` 标志可保证只发一次 |
| **h5playlog 固定每 30s 有效播放发一次**(源码硬编码 `timeBuffer >= 30`) | ✅ 近似(我们 `cadence=30`) | 注意这是**写死 30**,不是服务端节奏;每发完 `_afterSend` 把 `valid_play_duration` 清零,所以每条心跳只报「距上次发送」的增量 |
| **playstatistics(play_history)间隔读服务端 `next_report_delay_seconds`** | ❌ 当前用固定 `delay` | `_post_report_step` 应解析响应里的 `next_report_delay_seconds` 作为下次间隔(初始 `-1`,首条 `canplay` 上报后才拿到) |
| valid_play_duration 过滤 `c<0.6`(两条路径都用) | ❌ 当前直接取 `min(sec,duration)` | 需按 `timeupdate` tick 增量过滤;PlayLog 靠 seek 时重置 `lastTime` 使增量≈0,HistoryReport 用 `updateDisabled` 标志,效果相同 |
| 第三条上报:`/ajax/feed/throwbatch`(信息流曝光)未实现 | ❌ 完全缺失 | `gatherPlayerLogs` 在 `end`/`triggerADLog`(含 `pause`)时 flush,上报 `valid_play_duration/startplay_time/playduration/isautoplay` 进 `actionlog.ext` |
| 各 beacon 的 `key`/`sig` SALT | ✅ playstatistics=`yixiong&zhaolong5`;h5playlog=`encryptedString` | 已与源码一致 |
| h5playlog `data` 拼接(`;` + `key=>value`) | ✅ 与 HAR 一致 | — |
| h5playlog 末跳 `quit_status` 枚举 | ✅ 支持 `complete` / `not_complete`(2026-10-02) | `not_complete` 在 `--max-wall-time` 预算用尽、视频被中途截断时发出(见 **6.10**);`cancel` / `error` 仍未使用(我们不会中断或出错) |
| 真实观看的「不完美」(卡顿/seek 被 `<0.6` 过滤) | ❌ 我们 tick 恒为 0.25,**永不被过滤** | 我们模拟的是无卡顿/无 seek 的理想连续播放,`valid_play_duration` 恒等于 `playduration`;而真人日志里 `valid < playduration` 才是常态(HAR 样本 30059 vs 102654,见 6.4 / 6.6)。可用 `--jitter` 注入抖动补齐 |
| `PC_real_read` 独立 **5s** 周期 + `read_duration` 为增量 | ✅(2026-10-02 已改) | 原**搭车 h5playlog 的 30s** 且误传绝对位置;已按 `exposureBatchService` 的 `interval=5e3` + `resetReportTimers` 改正(见 **6.8**) |
| RUM 每 **500ms** 批量 flush + 每 XHR 一个事务 | ✅(2026-10-02 已改) | 原只发 1 条 page-load;已按 `flushInterval:500` 改为队列 + 定时批量(见 **6.9**) |

**最关键的差距**:**只有 playstatistics(play_history)通道**的周期由服务端 `next_report_delay_seconds` 驱动(初始 `-1`,首条 `canplay` 上报后回写),h5playlog 通道是**源码硬编码 30s**,我们的 `cadence=30` 反而更贴近后者;另两条通道的有效播放时长都要按 `timeupdate` tick 增量(`<0.6s` 才计)累积,而非按墙钟秒数。还有一条独立的 `throwbatch` 信息流曝光日志我们完全没有实现。

---

## 5. 第三条上报路径:`/ajax/feed/throwbatch`(信息流曝光日志)

`gatherPlayerLogs`(源码 `index-Xve1TSN5.js#135463`)是独立于 h5playlog / play_history 的**第三条**播放上报,挂在微博信息流(`feed`)的播放器上,用于汇报「这条视频在信息流里被看到/播到哪了」的曝光级行为。我们的 `simulated_watch` **完全没有实现这条**,是一个 fidelity gap。

### 算法
- 绑定 `seeked`/`playing`/`seeking` → 仅更新 `lastTime = currentTime()`;`timeupdate` → 按 `c = currentTime - lastTime`,`u += c < .6 && c > 0 ? c : 0` 累计 `valid_play_duration`(同样 `<0.6` 过滤)。
- flush 触发(`st()`):播放器 `end` 事件、`triggerADLog` 事件(而 `pause` 会 `trigger("triggerADLog")`)。**即视频播完、或暂停(含广告)时各 flush 一次**。
- flush 内容:把 `o.ext`(调用方传入的 `|` 分隔 `key:value` 串)追加 `valid_play_duration:<ms>`、`startplay_time:<ms>`、`playduration:<ms>`、`isautoplay:<0>` 四项,以 `actionlog`(`{...o, ext}`)POST 到 `/ajax/feed/throwbatch`。
- flush 后 `u = 0`(清零)。
- **注意**:该路径里的 `startplay_time` 与 `isautoplay` 是**写死 0**(`const d = 0; const xe = 0`),并非真实值——`throwbatch` 只借用了字段名,真正有效的只有 `valid_play_duration` / `playduration`。

### 与另两条路径的差异
| 维度 | h5playlog (`PlayLog`) | play_history (`HistoryReport`) | throwbatch (`gatherPlayerLogs`) |
|---|---|---|---|
| 端点 | `/ajax/log/h5playlog`(multipart) | `multimedia.api.weibo.com/.../report.json` | `/ajax/feed/throwbatch`(JSON `actionlog`) |
| 周期 | 硬编码每 30s | 服务端 `next_report_delay_seconds` | 事件驱动(`end`/`pause`/`AD`) |
| valid 过滤 | `<0.6` + seek 重置 `lastTime` | `<0.6` + `updateDisabled` | `<0.6` |
| 字段格式 | `;`-串 + `key=>value` extend | query string | `|`-串 `key:value` 进 `ext` |
| 我们是否实现 | ✅ | ✅(近似) | ❌ 缺失 |

> 另:`autoPlayerLogs`(同文件 #135503)是第三方贴片(`third_party_play`)的定时 GET 打点,与核心播放统计无关,这里不展开。

### 实现状态(`simulated_watch` 已对齐,2026-10-01)
`src/experiment/fetch/simulated_watch.py` 已重构为**事件驱动**(`_drive_event_player`),不再用 `build_sequence` + `time.sleep(args.delay)` 的固定节奏(那种死板周期最易被识别):
- 虚拟时钟以 `TICK=0.25s` 推进 `currentTime`(≈浏览器 `setInterval(fn,250)` 的 `timeupdate`),每 tick 按 `c = currentTime-lastTime; u = c<0.6 && c>0 ? c : 0` 累加**有效播放**,分别喂给 h5playlog 与 report.json 两个独立缓冲。
- **h5playlog**:缓冲 `>= 30s` 即发(`PlayLog.timeBuffer>=30` 硬编码),且 `valid_play_duration` 发送后清零——所以每条心跳报的是**距上次发送的增量**(delta),不是累积位置(旧 delay 循环把绝对 `sec` 当 valid 上报,会越报越大,已修正)。`playduration` 仍是 `currentTime`(绝对位置)。
- **report.json**:缓冲 `>= next_report_delay_seconds` 即发,`next_report_delay_seconds` 取自本通道响应的 `data.next_report_delay_seconds`(服务端驱动),初始 30。
- 末跳在 `currentTime>=duration` 时发,`quit_status='complete'`。
- `--speed`(默认 1.0=忠实 1x;>1 仅用于自测快进;**官方无此概念**——官方只有真实 `playbackRate`,机制不同但上报等价,见 **6.5**)。DASH 字节仍每 tick 取一块(取完即 no-op)。
- `--delay` / `--cadence` 在本脚本中**已废弃**:不再驱动任何 beacon 节奏,仅为「未给 `--speed` 时反推 speed(`speed = cadence/delay`)」而保留。请改用 `--speed`。
- `--max-wall-time`(2026-10-02 新增):整轮运行允许耗费的**真实墙钟时间上限**,取值写法为 `90`(裸数字=秒)、`300s`、`20m`、`1h`,或组合 `1h30m5s`(`0` = 不限)。用尽时当前视频立即停止,末跳带 `quit_status='not_complete'`(观众中途离开),且不再播放后续视频;审计与总结照常执行。见 **6.10**。

---

## 6. 事件驱动的底层引擎:`timeupdate` 与 video.js

前面各节反复出现的「按 `timeupdate` tick 增量过滤」、`TICK=0.25`、`setInterval(fn,250)`,其根源都在这里。本节把这些底层概念一次讲清。

### 6.1 `timeupdate` 事件是什么?

HTML5 `<video>` 的**播放位置变化事件**:播放期间由浏览器周期性抛出(规范规定间隔 15–250ms,Chrome 实测 ~250ms),每次抛出时 `currentTime` 已经往前走了一点。

它是**整个播放统计的驱动源**:`PlayLog`(#123579)、`HistoryReport`(#121480)、`gatherPlayerLogs`(#135463)三条上报路径**全部**挂在这个事件上,每次触发做 `c = currentTime - lastTime`,再按 `c < 0.6` 过滤累加进 `valid_play_duration`。**没有 timeupdate 就不会有任何播放时长累计。**

### 6.2 谁来抛 timeupdate:原生 vs 手动

video.js 用 **Tech**(底层播放技术后端)抽象不同后端,并用 `featuresTimeupdateEvents` 标记「该后端能否抛出原生 timeupdate」:

- 基类**默认假定不支持**:`Tech.prototype.featuresTimeupdateEvents = !1`(#24838)
- Html5 后端(真实 `<video>` 元素)明确声明支持:`Html5.prototype.featuresTimeupdateEvents = !0`(#28467)
- 构造时的分支(#24615):

```js
this.featuresProgressEvents || this.manualProgressOn(),
this.featuresTimeupdateEvents || this.manualTimeUpdatesOn(), ...
```

即:**只有不支持时才开启手动模拟**。

「不支持」的典型场景:Flash 后端、或把 DASH/FLV 自行转封装进 MSE 的引擎——底层没有可监听的 media element 周期性抛 timeupdate。此时 video.js 必须自己手造(#24655):

```js
trackCurrentTime() {
  this.currentTimeInterval && this.stopTrackingCurrentTime(),
  this.currentTimeInterval = this.setInterval(function() {
    this.trigger({ type: "timeupdate", target: this, manuallyTriggered: !0 })
  }, 250)
}
```

——这就是「手动 timeupdate」,也是 **`250ms` 这个数值的出处**。

**微博用的是 Html5 后端 → 走原生路径**,`manualTimeUpdatesOn()` 不会被调用,上面那个 `setInterval(250)` 在微博实际运行中并不存在。

| | 原生模式(微博实际) | 手动模式(兜底) |
|---|---|---|
| 抛事件者 | 浏览器 `<video>` | video.js `setInterval(fn,250)` |
| 间隔 | 15–250ms,实测~250ms,**不严格固定** | **严格 250ms** |
| 上层统计逻辑 | 完全相同(只看 `currentTime` 差值) | 同 |

### 6.3 video.js 在哪个文件?

**没有独立文件,整个打包进 `index-Xve1TSN5.js`**:

```
src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js
```

证据:版权头 #22472 与版本注册 #22481 / #29888 `videojs.VERSION = version$6`(= `"0.1.4-beta6"`,应为微博定制打包注入的版本字符串)。播放器插件(`PlayLog`、`HistoryReport`、`gatherPlayerLogs`)与 dash.js 等全在同一 bundle 内。

### 6.4 为什么是 250ms?以及 `0.6` 阈值为什么是 0.6

这两个数是**配套的**:

- timeupdate 间隔**上限 250ms**(0.25s)
- 过滤阈值 `c < 0.6`(600ms)= 略大于最大间隔的容差上限

由此可得一个重要推论:**只要连续正常播放,每个 tick 的增量必然 < 0.6,必然通过过滤**,于是 `valid_play_duration` ≈ 真实播放时长。只有异常才会被过滤:

| 异常 | 增量表现 | 是否被过滤 |
|---|---|---|
| seek 跳播 / 拖拽 | 跳变大(如 +30s)甚至为负 | ✅ 过滤(>0.6) |
| 卡顿 / 缓冲 | 间隔被拉长 >0.6s | ✅ 过滤 |
| 暂停 / 切后台 | 增量 0,或间隔巨大 | ✅ 过滤(或不触发) |

反过来说:**`valid_play_duration` 明显小于 `playduration` 就说明该次观看有大量 seek/卡顿**。HAR 样本 `playduration=102654ms` 而 `valid=30059ms`(差 72s)正是如此——这也解释了为什么 0.6 不是随便定的。

### 6.5 `--speed` 官方有没有?

**没有。** 官方是真实播放器,`currentTime` 由真实解码驱动,天然 1x,源码里不存在「为模拟而快进」的概念。同理,`TICK` 这个名字也是我们自己造的(见 6.6),官方只有 `setInterval(fn, 250)` 这个字面量。

但官方**有真实倍速**:`playbackRate()` / `techCall_("setPlaybackRate", r)`(#29473)——2x 时同样 250ms 真实时间内 `currentTime` 真的走 0.5s。

我们的 `--speed` 与之**机制不同,但上报结果等价**:

- `--speed` 只改 `real_sleep = TICK / speed`(真实等待时长),**不改任何上报值**——所有字段只由虚拟 `cur` 决定,而 `cur` 每 tick 恒加 0.25,与 speed 无关。
- `speed=20` 时第 30 虚拟秒的 `playduration` 仍是 `30000ms`,与 1x 完全相同,只是真实耗时变成 1/20。
- 所以 `--speed>1` 是**自测快进**:服务端看到的上报内容与忠实 1x 逐字段相同,无法区分。

### 6.6 我们的 Python 有 timeupdate 机制吗?

**没有原生的**(无 `<video>` 元素、无浏览器事件循环、无真实解码),但**有刻意等价的合成机制**:`_drive_event_player` 里 `while` 循环的**每一轮迭代 = 一次 timeupdate**,节奏 `TICK=0.25` 取自 #24656 的 `setInterval(fn,250)`。

逐行对照:

| 官方 JS(timeupdate 回调内) | 我们 Python(循环体内) |
|---|---|
| 每 250ms 抛一次 timeupdate | `cur = min(cur + TICK, duration_s)`(TICK=0.25) |
| `c = currentTime - lastTime` | `c = cur - last` |
| `u += c < .6 && c > 0 ? c : 0` | `u = c if (0 < c < 0.6) else 0.0` |
| `lastTime = currentTime` | `last = cur` |
| 累加 `valid_play_duration` | `hl_valid / hl_buf / ps_valid / ps_buf += u` |
| 回调内 `timeBuffer >= 30` → 发心跳 | `if hl_buf >= 30: fire_h5play(False)` |
| 真实墙钟由解码推进 | `time.sleep(real_sleep)`(speed=1 → 0.25s) |

结构差异:官方是**异步事件回调**(浏览器想抛就抛),我们是**同步循环 + sleep**。但语义完全等价——两者都只看 `currentTime` 差值,不关心是谁触发的。

**已知 fidelity 差距(未修)**:我们的 `cur` 是自己加出来的虚拟数字,每轮恒定 +0.25 → `c` 恒为 0.25 → **永远 < 0.6 → 永远通过过滤**。即我们模拟的是**完美无卡顿、无 seek、无暂停**的理想播放,`valid_play_duration` 恒等于 `playduration`。而真实日志里 `valid < playduration` 才是常态(见 6.4 的 HAR 样本:30059 vs 102654)。若要更贴近真人,可注入随机卡顿 / seek 抖动(让部分 tick 增量 >0.6s 从而被过滤),例如新增 `--jitter` 参数,默认 0 保持现状。

### 6.7 250ms 是怎么计时的?单线程 + 阻塞 IO 会不会拖慢?

**结论:靠 `sleep`,但 sleep 不能与 IO 并行计时——所以已改为「deadline 补偿」。**

- 我们是**单线程同步**进程。每个 tick 的顺序:推进虚拟 `cur` → 可能发 beacon(HTTP,**阻塞**)→ 抓 DASH chunk(**阻塞**)→ `sleep`。
- `time.sleep()` **只是在原地干等**,它不会「一边等一边替 IO 计时」。所以旧实现(固定 `sleep(0.25)`)的真实 tick 周期 = **IO 耗时 + 0.25s**——发了心跳的那个 tick 会被 HTTP 往返拉长到 0.4s 甚至更久,整场观看的真实时长被系统性拉长。
- 官方是**异步事件循环**:`setInterval(fn,250)` 由浏览器定时器线程驱动,XHR 异步发出、**不阻塞 tick**。所以官方 timeupdate 始终 250ms 抛一次,**与网络 IO 并行**。

**现在的做法(deadline 补偿)**:不再固定睡 0.25s,而是睡到「下一个 tick 的截止时刻」:

```python
now = time.perf_counter()
remaining = next_tick - now
if remaining > 0:
    time.sleep(remaining)
next_tick = max(now, next_tick) + real_sleep
```

- IO 耗时 120ms → 只补睡 130ms,该 tick 真实周期仍是 250ms。
- IO 超过 250ms → 不补睡,直接进入下一 tick(`max(now, ...)` 避免欠债累积雪崩)。

**关键点**:虚拟时钟 `cur` 是纯算术(`cur += 0.25`),**永远准确**,不受 IO / sleep 影响 → **所有上报字段的数值不受影响**。受影响的只是「真实墙钟上的节奏」;补偿后长期平均贴近 250ms,整场观看不再被 IO 拖长。

与官方的根本差异**无法消除**:官方 IO 与 tick **并行**,我们**串行**。只要单个 tick 的 IO < 250ms,deadline 补偿就能让平均节奏等价;若某次请求特别慢(>250ms),那一 tick 必然超时——这是同步模型的固有上限。

### 6.8 `PC_real_read` 的真实机制(已对齐,2026-10-02)

之前我们让 read **搭车**在 h5playlog 的 30s 心跳上,并把 `playduration`(绝对播放位置)当作 `read_duration` 上报——**两处都不对**。源码里的真实机制是 `exposureBatchService$2`(#231168),一个**信息流曝光服务**,与播放器无关:

- **独立周期定时器**:`options.interval` 默认 `5e3`(**5 秒**),`startReporter()` 用 `setInterval(..., n.options.interval)`(#231217–231224)。**不是** 30s,也不搭 h5playlog。
- **上报后重置**:每次上报完 `resetReportTimers()` 把 `effectiveStartTime / trueStartTime` 重置为 now(#231226)→ 所以 `read_duration` 是**自上次上报以来的增量**,不是累积位置。
- **可见性门槛**:`IntersectionObserver` 阈值 `[0, .3]`(#231192),可见比例 **>= 0.3** 才算 "true view" 并开始计 `read_duration`(#231239);`duration` 则只要可见(>0)就计。
- **关页面补发一次**:`handleBeforeUnload` 用 `sendBeacon` 上报最后一次(#231247)。
- **与 `<0.6` 过滤无关**:read 计的是**停留时间**(墙钟),不过播放的 tick 过滤——视频卡住但卡片仍可见,read 照常计时。

**我们的改动**(`simulated_watch._drive_event_player`):
- read 从 `fire_h5play` 里拆出,独立 `rd_buf` 缓冲,每 **5s** 触发一次。
- `read_duration` 改为**增量**(距上次 read 上报),不再传 `playduration`。
- `rd_buf += TICK` 而**不加 `<0.6` 过滤**(对齐「只要求可见」)。
- 播放结束补发一次末次 read(对齐 `handleBeforeUnload`)。

### 6.9 RUM 的真实机制(已对齐,2026-10-02)

微博用的是 **Elastic APM RUM agent**(`ApmVuePlugin`,#252831):`serverUrl: "https://rum.h5.weibo.cn"`、`serviceName: "AppVue3"`、`disableInstrumentations: ["click"]`。它的上报方式:

- **`flushInterval: 500`**(#234185)——每 **500ms** 把队列里的 events 批量 POST 到 `/intake/v2/rum/events`。
- 事件种类:**page-load** 事务(页面加载完成,一次)+ **每个 XHR 一个 http-request 事务**。
- 所以 RUM **不是**「只发一条 page-load 就完事」,而是**持续、按 500ms 批量**上报整场观看的所有请求。

**我们的改动**:
- burst 阶段:测量每个 XHR 的耗时,把 **page-load + 所有 XHR 事务**放进首批 flush(原来只有孤零零一条 page-load,且位置还在 XHR 之前)。
- 播放循环:每个 beacon 发完记一条 http-request 事务进队列,每 **500ms** 批量 flush 一次;结束时 force flush。

### 6.10 用真实墙钟预算停止运行(`--max-wall-time`,2026-10-02)

`--speed` 管的是**虚拟**节奏,`--max-wall-time` 管的是**进程实际能跑多久**。它是整轮运行的真实时间预算(`0` = 不限),取值写成人类可读时长——裸数字表示秒(`90`),也可以写 `300s`、`20m`、`1h`,或组合 `1h30m5s`。

- 两处检查:**每个视频开始前**(预算已耗尽则不再开新视频)与 **tick 循环内**(长视频会在预算边界被截断,而不是多跑十几分钟)。
- 被截断时该视频仍会正常收尾:末次 h5playlog 心跳、末次 read(对齐 `handleBeforeUnload`)、末次 report.json,以及 rum 的 force flush。
- 此时末跳上报 **`quit_status='not_complete'`** 而非 `complete`——正是官方 `PlayLog.dispose()` 在观众中途离开时的行为(此前 `beacon_engine` 只能发 `""` / `complete`,现已支持附录 A 枚举里的 `complete` / `not_complete`)。
- 审计与总结(`AUDIT`、`DONE`、`TIMING`)**始终执行**,并额外打印 `STOPPED EARLY` 说明跳过了多少次计划播放。

> 注意:该预算是**真实时间**,因此与 `--speed` 相互作用——`--speed 1` 时两者相等;`--speed 20` 时 300s 预算大约能覆盖 6000s 的虚拟播放。

---

## 附录 A:h5playlog `data` 字段逐字段对照表

> **交叉验证记录(2026-10-01)**:本表已用真实 HAR `src/tmp/video/weibo-video-watch-waterfall-2026-10-01.har`(19 条 h5playlog,取起播 + +30s 两条心跳)与本地源码 `src/static/h5.sinaimg.cn/m/weibo-pro-next/assets/index-Xve1TSN5.js#123590` 的 `logRecord` 字面量三方比对。原草稿曾把 **#13/#14 的 `firstframe_time` 与 `startplay_time` 写反**(把 206 误读成 `startplay_time`),已按源码 `...firstframe_status, quit_status, firstframe_time, startplay_time, valid_play_duration...` 顺序更正。其余 17 个字段、extend 块(`vf`/`sid`/`qType`)、`key`/`sig` 均与 HAR 吻合,无错误。HAR 的 `Content-Type: multipart/form-data; boundary=----WebKitFormBoundary<16alnum>` 也与 `simulated_watch` 的 WebKit boundary 实现一致。

来源:`PlayLog` 类(`weibo-pro-next` 123579 起),`logRecord` 字面量在 123590–123607。
`data` 的拼法(源码 123674):`R = Object.values(logRecord 去掉 extend).join(";") + ";" + Object.keys(extend).map(k=>`${k}=>${extend[k]}`).join(",")`。
即:**主串** = 各字段值按 `;` 连接;**末尾 `;` 之后** = `extend` 块,`key=>value` 用 `,` 连接。

### 真实样本
```
2026-10-01 21:49:01;<VIEWER_UID>;1034:<VIDEO_MID>;<POST_MID>;<AUTHOR_UID>;<POST_MID>;<AUTHOR_UID>;1594.839;;1;102654;success;;140;0;30059;;;;vf=>newPC,sid=>H5_mjlxi_<SID>,qType=>720
```

### 主串(`;` 分隔的 19 个值,顺序 = `Object.values(logRecord)` 插入序)

| # | 值 | 字段 | 含义 |
|---|---|---|---|
| 0 | `2026-10-01 21:49:01` | `play_time` | 本条上报发生的本地时间(dayjs `YYYY-MM-DD HH:mm:DD`) |
| 1 | `<VIEWER_UID>` | `uid` | 登录观众 uid(viewer) |
| 2 | `1034:<VIDEO_MID>` | `object_id` | 视频对象 id;`1034:` 是微博视频对象类型前缀,后面是数字 id |
| 3 | `<POST_MID>` | `mid` | 被观看帖子的 mid |
| 4 | `<AUTHOR_UID>` | `mid_uid` | 该帖子作者 uid |
| 5 | `<POST_MID>` | `rootmid` | 根帖子 mid(转发链顶层;=mid 说明是原帖) |
| 6 | `<AUTHOR_UID>` | `rootuid` | 根帖子作者 uid |
| 7 | `1594.839` | `duration` | 视频总时长(秒) |
| 8 | *(空)* | 可选 option(如 `play_type`/`source`) | 调用方未传 → 空串 |
| 9 | `1` | `isautoplay` | 是否自动播放,`+player.autoplay()`(1=是) |
| 10 | `102654` | `playduration` | **当前播放位置**(ms)= 102.654s |
| 11 | `success` | `firstframe_status` | 首帧状态:`success`(首帧已出) |
| 12 | *(空)* | `quit_status` | 退出状态:**空=仍在播**;末跳(`dispose`)才填,枚举为 `complete`(播完)/`not_complete`(中途退出)/`cancel`(缓冲/加载中断)/`error`(出错) |
| 13 | `140` | `firstframe_time` | 首帧渲染耗时(ms)= `Date.now()-startTime`(HAR 实样 206) |
| 14 | `0` | `startplay_time` | `playing` 事件瞬间 `currentTime`(ms),起播即≈0(HAR 实样 0) |
| 15 | `30059` | `valid_play_duration` | **距上次发送的累计有效播放时长**(ms)=30.059s;每条心跳只报增量——`_afterSend()` 发完即把 `valid_play_duration` 清零,所以首跳=0、+30s 跳≈30000 |
| 16 | *(空)* | `download_size` | 已下载字节(本例空) |
| 17 | *(空)* | `bitrate` | 码率(本例空) |
| 18 | *(空)* | `encode_mode` | 编码模式(本例空) |

### extend 块(`;` 之后,`key=>value` 用 `,` 连接)

| 字段 | 值 | 含义 |
|---|---|---|
| `vf` | `newPC` | view-from / 来源端标识:从「新 PC web 端」观看 |
| `sid` | `H5_mjlxi_<SID>` | 本次观看会话稳定 id(`H5_`+rand5+Date+rand4+rand10);同一视频多次心跳 `sid` 不变 |
| `qType` | `720` | 清晰度档位(720p) |

### 解读要点
- **`playduration`(102654ms) vs `valid_play_duration`(30059ms)**:前者是当前播放进度 102.6s,后者只累计 30s「有效」。差出来的 ~72s 就是被 `<0.6s` 过滤掉的 seek/卡顿/暂停/切后台时间——正是附录前文「有效播放过滤」在真机上的体现。
- **`quit_status` 为空** = 这条心跳发生在播放中途(还没 ended/error);结束时那条会带 `complete` 或 `error`。
- **`firstframe_time=140/206`** = `Date.now()-startTime`,即首帧渲染耗时(~140-206ms,非 0);**`startplay_time=0`** = `playing` 事件瞬间 `currentTime`(≈0),与 `_playTime` 里 `Math.floor(currentTime*1000)` 一致。两者在表里分别是 **#13 / #14**;此前草稿曾写反,已按 `weibo-pro-next` 源码(`logRecord` 字面量顺序 `...firstframe_status, quit_status, firstframe_time, startplay_time...`)更正。
- 末尾三个空(`download_size`/`bitrate`/`encode_mode`)是该插件这两个字段默认 `""`、本次未填充,所以为空串。
- `key`(如 `Log_h5play_pxxnb_1790846792987`)与 `sig`(`SparkMD5(data+key+"encryptedString")`)是 `data` 之外的另外两个 multipart 字段,见 2.3 节。
