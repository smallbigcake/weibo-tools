# 微博静态资源分析 —— 对 `weibo-tools` 的优化机会

> 2026-09-21 基于 `src/static/`（已美化的微博前端打包产物）生成。
> 英文版：[static_analysis.md](static_analysis.md)

## 1. 分析了哪些资源

| 来源 bundle | 与本项目的相关性 |
|---|---|
| `h5.sinaimg.cn/m/login/...`（V2 扫码登录） | 已挖掘 → `auth.py`，无新信息。 |
| `passport.sinaimg.cn/js/fp/*`、`yidun/*` | 设备指纹 + 验证码 SDK，已挖掘。 |
| **`h5.sinaimg.cn/m/weibo-pro-next/`**（Vue 3，2026-09 当前创作者后台） | **最新、最有价值**。视频播放上报、黑名单/粉丝写入 API、分组、不看TA、收藏、内容评分。 |
| `h5.sinaimg.cn/m/weibo-pro/`（webpack，上一代创作者应用） | 印证同一批接口；并含 `m.weibo.cn` 移动端接口面。 |
| `h5.sinaimg.cn/m/weibo-lite/`（旧版 H5 客户端 + `sw.js` 预缓存） | **一条正则里给出了完整移动端接口面**——更轻量的爬取通道。 |

## 2. 印证：现有代码正确（无需改动）

- **`/ajax/log/h5playlog` 就是播放上报接口。** `index-D53O_Npi.js:123624` 以
  `FormData{data, key, sig}` 上报，其中 `sig = SparkMD5.hash(data+key+"encryptedString")`——
  与 2026-09-18 HAR 中推导出的公式完全一致，实现已验证。
- **`valid_play_duration` 只在连续播放时累积：** 每次 `timeupdate` 取值
  `u = c < .6 && c > 0 ? c : 0`（`index-D53O_Npi.js:123605`），即拖动/跳转**不计入**。
  这解释了为何 FastWatch 回放（每 30 秒发送一次累计时长）线上格式正确，却**仍不增加
  `play_count`**——微博对*同一观众*的重复播放做了去重。结论不变：回放对播放量无效；
  唯一未决的是 `play_duration`，需次日聚合数据验证。
- **`/ajax/multimedia/getVideoList`**（游标分页）返回 `statistics.play_count`
  （`videoManage-ClGUhmxK.js:52,224`）——我们已在用的实时播放量来源。
- **`profile/info` + `topicContent`** 用于访问登记——最小且正确（已被 2026-09-04 消融实验证明）。
- **收藏读取**（`/ajax/favorites/all_fav`、`/ajax/favorites/show`、`/ajax/favorites/tags`）
  —— `api_explorer.py` 已收录。

## 3. 新知识 → 具体优化点

### B1. 黑名单「写入」——价值最高，当前缺口 ⭐
项目目前只**读**黑名单（`blacklist.py` → `setting/getFilteredUsers`）。创作者应用揭示了
**写入**端：

- **加入黑名单：** `POST /ajax/statuses/filterUser`
  请求体 `{uid, status, interact, follow}`——`status:1`=不看其微博，`interact:1`=禁止互动，
  `follow:1`=禁止其关注我。界面文案 *"全选即为拉黑用户"*（三项全 1 = 完全拉黑）。
  （`index-D53O_Npi.js:43691-43710`）
- **移除黑名单：** `POST /ajax/statuses/deleteFilters` `{uid}`
  （界面 *"解除黑名单"*，`:43775-43779`）。

**优化：** `blacklist_deep` 现在可以*行动*而不只是分析——自动拉黑识别出的营销号，或提供
`blacklist add/remove <uid>`。必须在显式确认 + `--dry-run` 下运行（会写入真实账号）。

### B2. 移除粉丝 — `POST /ajax/profile/destroyFollowers` `{uid}`
（`index-D53O_Npi.js:43760`）。让 `blacklist_deep` 能批量清理垃圾粉丝。

### B3. 关注分组（完整 CRUD）
`/ajax/profile/setGroup`、`createGroup`、`updateGroup`、`destroyGroup`、`getGroups`、
`getGroupList`（`index-D53O_Npi.js:14155-14280, 43723-43733`）。`following_deep` 可把爬到的
关注按分组打标，或读取某用户已有的分组归属。

### B4. 不看TA（信息流过滤）—— 即 B1 的部分标志位
`filterUser` 只设 `status`/`interact`。

### B5. 特别关注 + 备注
`POST /ajax/friendships/specialAdd` / `specialDestory` `{uid, specialFollow}`
（`index-D53O_Npi.js:43363`），`POST /ajax/friendships/remarkUpdate`（`:43348`）。
`following_deep` 可批量设置备注 / 特别关注。

### B6. 批量关注的写法（参考）
应用用 `Promise.all(uids.map(u => post('/ajax/friendships/create',{friend_uid:u}).catch(()=>{}))`
（`index-D53O_Npi.js:145050`）——逐条 `.catch` 容错，是我们新增任何批量写入都应采用的模式。

### B7. 收藏管理（写入端存在）
`/ajax/favorites/tags/update`、`/ajax/favorites/tags/destroy_batch`（`:11575-11578`）。
目前**还没有** `favorites` 爬取命令——易加的新功能。

### B8. 内容评分（新功能）
`POST/GET /ajax/evaluation/tab_search`、`/ajax/evaluation/query`（`:57695,57713`）——
读取某条微博的内容质量 / 价值分。新的只读分析命令。

### B9. `act_code` 事件体系（埋点用）
`refresh:5006, visit:4288, follow:14000008, enterDetail:6458, creatorCardVisit:6841,
creatorCardClick:6842`，外加 `act_code:6306` 的访问上报（`index-D53O_Npi.js:126390,
129035-129048`）。主要服务于埋点；可丰富 `profile_visit` / 阅读量日志，但**不会**登记
"仅自己可见"的访问列表（那仍是 `profile/info`）。

### B10. 移动端 `m.weibo.cn` 接口面（更轻量的爬取通道）
`weibo-lite/sw.js:221` 用一条正则预缓存了完整移动端 API：
`config(/list)?`、`captcha/show`、`suggest/hotspot`、`users/show`、`container/getIndex`
（通用时间线）、`feed/trendtop`、`statuses/repostTimeline`、`attitudes/show`、
`groupchat/list`、`friendships/groupsMember(Add|Destory)`、`video/(createCert|getSsigUrl)`、
`feed/friends`、`message/(msglist|mentionsAt|mentionsCmt|cmt|myCmt|notelist)`、
`profile/info`、`comments/hotflow`。它们比 `weibo.com/ajax/*` 开销更低，是
`relations_sync` / `following_deep` 的良好兜底爬取通道。

## 4. 建议（按优先级）

- **P0 — 填补只读缺口（B1+B2）：** 增加 `blacklist add/remove` 与 `remove-follower`，置于
  显式确认 + `--dry-run` 之后。复用 `http_engine` 的限流处理。**写入需带请求头：**
  `X-Xsrf-Token`（取自 `XSRF-TOKEN` cookie）+ `x-requested-with: XMLHttpRequest`
  （即我们给 `h5playlog` 修掉的同一个 403 问题）。
- **P1 — 记录移动端接口（B10）** 作为更具韧性的爬取通道，写进 `doc/api_inventory`。
- **P1 — 新的只读命令：** `favorites` 爬取器（B7）、`evaluation` 读取器（B8）。
- **P2 — `following_deep` 增强：** 分组打标（B3）+ 备注/特别关注（B5）。
- **FastWatch：** 仅作监控；回放对 `play_count` 无效，次日验证 `play_duration`（已跟踪）。

## 5. 通用注意点
- **写入需 CSRF：** 上述每个 `weibo.com/ajax/*` 的 POST 都需要 `X-Xsrf-Token` +
  `x-requested-with`。而 `passport` 的 `sso/v2/qrcode/*` 系列**不需要**（已在 `auth.py` 处理）。
- **uid 格式：** `destroyFollowers` 用 `uid` = 数字型 **idstr**；`filterUser` /
  `friendships/destory` 用 `uid` = 数字 id。以 bundle 实际发送的字端为准。
- **限流一致：** `profile/info` 被 HTTP 414 限流；写入端也可能限流——复用 `http_engine`
  的冷却恢复全局变量。
- **安全：** B1–B6 全部写入真实账号。未经显式用户标志 + 干跑预览，绝不自动执行；PII/`uid`
  只放在 `config/experiment.local.json`。
