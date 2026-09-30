# 播放量与视频信息 API 参考（author 账号）

> 范围：本仓库 `src/experiment/` 中实际用于抓取 author 账号（`uid = <AUTHOR_UID>`）
> **视频目录**与**逐视频 / 聚合播放统计**的接口。
>
> 每个请求都需携带 `User-Agent`（桌面 Chrome）与下文中按接口指定的 `Referer`，
> 并依赖已登录的会话 Cookie（`SUB` @ .weibo.com）。
>
> **单位以 API 返回为准。** 每个时长/计数返回值都自带单位字段：
> - 账号级聚合播放时长：`number_unit = "小时"`。
> - 单视频近7日总观看时长（`play_totallength`）：`number_unit = "秒"`。
> - 昨日播放时长：`desc2_unit = "小时"`。
> 切勿臆测单位——一律读取响应中的 `number_unit` / `desc2_unit`。

## 接口清单

所有接口分布在两个域名下：

- `https://weibo.com/ajax/multimedia/getVideoList` — 视频目录。
- `https://me.weibo.com/api/proxy/native/...` — 创作者中心分析代理。

### 1. getVideoList — 视频目录

| 项 | 值 |
|---|---|
| URL | `https://weibo.com/ajax/multimedia/getVideoList` |
| 方法 | GET |
| Referer | `https://weibo.com/creator` |
| 调用方 | `fetch_recent_videos.py`、`read_backend_metrics.py` |
| 输出 | `src/data/video/author_videos.json`（`fetch_recent_videos.py`）；`src/data/backend/backend_metrics_<ts>.json`（`read_backend_metrics.py`） |

参数：

| 参数 | 类型 | 含义 |
|---|---|---|
| `cursor` | str | 分页游标。起始 `"0"`；当 `next_cursor` ∈ `{"", "0", "-1"}` 或 `videos` 为空时停止。 |
| `count` | str | 每页大小（我们传 `"20"`）。 |
| `status` | str | 视频状态筛选；`"0"` = 全部（已发布）视频。 |

返回：`data.videos[]` —— 每个视频的完整原始字段，含 `oid`、`mid`、`mid_str`、
`titles`、`categories`、`tags`、`covers`、`duration`（视频时长，秒）、`width`、
`height`、`play_count`（累计播放量）、`create_time`（毫秒）、`statistics`、
`video_visibility` 等。`data.next_cursor` 用于翻页。

### 2. datavidnew（基础）— weibo_info

| 项 | 值 |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavidnew` |
| 方法 | GET |
| Referer | `https://me.weibo.com/` |
| 调用方 | `crawl_video_stats.py`（`crawl_one` 基础调用） |
| 输出 | `src/data/video/author_video_stats.json` → `weibo_info` |

参数（以下所有 `datavidnew` 调用通用）：

| 参数 | 类型 | 含义 |
|---|---|---|
| `video_oid` | str | 视频 oid，取自 `getVideoList` 的 `oid`。 |
| `mid` | str | 微博 mid，取自 `getVideoList` 的 `mid_str` / `mid`。 |
| `blogger_uid` | str | 账号 uid，`<AUTHOR_UID>`。 |

返回：`data[].weibo_info` → `text`（正文）、`created_at`、`reposts_count`、
`comments_count`、`attitudes_count`、`source`、`pic_ids`。

### 3. datavidnew?tab=traffic — 近7日合计（单视频）

| 项 | 值 |
|---|---|
| URL | `.../datavidnew?tab=traffic`（+ 通用参数） |
| 调用方 | `crawl_video_stats.py` → `traffic_7d` |
| 输出 | `author_video_stats.json` → `traffic_7d`（`period = "last_7d"`） |

返回：`select_subitems["7"].videoonecore`：

| 字段 | 类型 | 含义 |
|---|---|---|
| `play_count` | {number, name} | 近7日总播放量；`number` 为整数。 |
| `play_totallength` | {number, number_unit} | 近7日总播放时长（总观看时长）。**`number_unit = "秒"`。** |

注意：这是 **7 日窗口**；老视频该值可能为 `0`。

### 4. datavidnew?tab=diagnosis — 诊断

| 项 | 值 |
|---|---|
| URL | `.../datavidnew?tab=diagnosis`（+ 通用参数） |
| 输出 | `author_video_stats.json` → `diagnosis` |

返回：`data[].diagnosis_items.list` → 条目 `{text, status, type}`，以及
`item.suggestion.text`。

### 5. datavid_item?item_id=dt_onevid_score — 画质分

| 项 | 值 |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavid_item` |
| 参数 | 通用 `video_oid`/`mid`/`blogger_uid` + `is_new=1` + `item_id=dt_onevid_score` |
| 输出 | `author_video_stats.json` → `clarity_score` |

返回：`data.{score, score_unit, text, desc_list, suggestion.text}`。

### 6. datavid_item?item_id=dt_onevid_playratio — 播放完成度

| 参数 | `item_id=dt_onevid_playratio`（其余同 #5） |
|---|---|
| 输出 | `author_video_stats.json` → `play_ratio` |

返回：`data.groups[""].{desc1, desc2, desc2_unit, desc3_text, desc3_end}`
（播放完成度；`desc3_text` 为与同行的对比）。

### 7. datavid_item?item_id=dt_onevid_scene — 流量来源

| 参数 | `item_id=dt_onevid_scene` |
|---|---|
| 输出 | `author_video_stats.json` → `traffic_source` |

返回：`data.groups[].{name, number, percent}`（流量来源构成）。

### 8. datavid_item?item_id=dt_onevid_portrait — 受众画像

| 参数 | `item_id=dt_onevid_portrait` |
|---|---|
| 输出 | `author_video_stats.json` → `portrait` |

返回：API 原生结构（`type`/`item_id`/`card_group`/...）。空字符串分组键会
重命名为 `"default"`，以保证所有 JSON key 为英文（项目规范）。中文仅作为 value。

### 9. datanew_selectdata?module=video_core&period=1 — 昨日聚合

| 项 | 值 |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datanew_selectdata` |
| 方法 | GET |
| Referer | `https://me.weibo.com/` |
| 调用方 | `read_backend_aggregate.py` → `fetch_yesterday` |
| 输出 | `src/data/backend/backend_aggregate_<ts>.json` → `aggregates.yesterday` |

参数：

| 参数 | 含义 |
|---|---|
| `module` | `video_core`（含 6 项指标的完整模块；**不要用** `sum_core`，后者只返回播放量 + 播放时长）。 |
| `period` | `1` = 昨日。 |

返回：`data.groups["1"][]` —— 每个指标一条：

| 字段 | 含义 |
|---|---|
| `desc1` | 中文指标标签 → 映射为规范英文 key：发布量=`upload_count`、播放量=`play_count`、播放时长=`play_dura_count`、转发量=`reposts_count`、评论量=`comments_count`、点赞量=`attitudes_count`。 |
| `desc2` | 数值。 |
| `desc2_unit` | 单位，如播放时长为 `"小时"`；计数为 `null`。 |
| `desc3_text` | 较前日变化，如 `"+99"`、`"--"`。 |

### 10. datavidnew（无参数）— 近7日 / 近30日聚合

| 项 | 值 |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavidnew`（不带 `video_oid`/`tab`） |
| 调用方 | `read_backend_aggregate.py` → `fetch_7_30` |
| 输出 | `backend_aggregate_<ts>.json` → `aggregates.last_7d` / `aggregates.last_30d` |

返回：`select_subitems["7"]` 与 `["30"]` → `videocore`：

| 字段 | 类型 | 含义 |
|---|---|---|
| `upload_count` | number | 发布量 |
| `play_count` | number | 播放量 |
| `play_dura_count` | {number, number_unit} | 播放时长。**`number_unit = "小时"`。** |
| `reposts_count` | number | 转发量 |
| `comments_count` | number | 评论量 |
| `attitudes_count` | number | 点赞量 |

账号级（不按单视频筛选）。字段名本身已是英文。

### 11. datavid_item?item_id=dt_vid_playpercent — 昨日播放量 TOP5

| 项 | 值 |
|---|---|
| URL | `.../datavid_item?is_new=1&item_id=dt_vid_playpercent` |
| 调用方 | `read_backend_aggregate.py` → `fetch_yesterday_top5` |
| 输出 | `backend_aggregate_<ts>.json` → `yesterday_top5_play` |

返回：`data.card_group[1].card_group` → type-`22` 视频卡片，含 `rank`、
`item_id`（mid）、`title`、`duration`、`desc2`（发布时间）、
`display_arrow_text`（昨日播放量）、`scheme`。

## 输出数据文件

| 文件 | 写入方 | 内容 |
|---|---|---|
| `src/data/video/author_videos.json` | `fetch_recent_videos.py` | 完整视频目录（元数据 + 累计 `play_count`），按时间倒序。重跑会刷新元数据并追加新视频。 |
| `src/data/backend/backend_metrics_<ts>.json` | `read_backend_metrics.py` | 扁平的逐视频指标（播放/赞/评论/转发/弹幕计数），按次快照。 |
| `src/data/video/author_video_stats.json` | `crawl_video_stats.py` | 逐视频分析：`weibo_info`、`traffic_7d`（7日播放量 + 观看秒数）、`diagnosis`、`clarity_score`、`play_ratio`、`traffic_source`、`portrait`。按 mid 索引；可断点续跑。 |
| `src/data/backend/backend_aggregate_<ts>.json` | `read_backend_aggregate.py` | 账号级聚合（昨日 / 近7日 / 近30日，各 6 项指标，含单位）+ 昨日播放量 TOP5。每次运行带时间戳。 |
| `src/data/video/archive/*.json` | 自动（`data_archive.py`） | 每次每日刷新前，上一份 `author_videos.json` / `author_video_stats.json` 会按自身 `meta.updated_at`（UTC）命名归档于此。 |

## 刷新与归档流程

1. `fetch_recent_videos.py` — 刷新目录（同时归档上一份 `author_videos.json`）。
2. `crawl_video_stats.py` — 刷新逐视频统计（同时归档上一份 `author_video_stats.json`）；可断点续跑，已抓取的 mid 会跳过。
3. `read_backend_aggregate.py` — 写一份新的带时间戳聚合快照。

三者均尊重 API 自带的单位字段（聚合为小时，单视频 7 日为秒）。重跑前会先归档旧文件，
因此历史数据不会丢失。

## 播放写入信标（重放 / FastWatch）

真实浏览器在 weibo.com 观看视频时，会发出三个播放**写入**信标（来自 `src/tmp/video/` 下
2026-09-18 的观看 HAR）：

| # | 端点 | 方法 | 时机 | 作用 | 携带观看时长的字段 |
|---|---|---|---|---|---|
| 1 | `multimedia.api.weibo.com/2/multimedia/user/play_history/report.json` | POST | 约每 30s 的 `seconds` 心跳 | 观看历史 / 播放量进度 | `seconds` |
| 2 | `weibo.com/aj/video/playstatistics?ajwvr=6` | POST（multipart） | 每个视频开场时发**一次** | **播放开场注册** | —（无时长） |
| 3 | `weibo.com/ajax/log/h5playlog` | POST（multipart） | 约每 30s，与 #1 同步 | 播放日志（详细观看遥测） | `valid_play_duration`（毫秒） |
| 4 | `weibo.com/ajax/log/read` | POST（JSON） | 约每 15s，与 #1 同步 | **`PC_real_read`**——累计 `read_duration`（毫秒）；对视频而言，这个阅读停留就是观看时长。是播放时长来源的**最强候选**（h5playlog 在 2026-09-21 三通道测试中并未入账） | `read_duration`（毫秒） |

要点：
- `playstatistics` 必须在开场时发一次。其 `sig` = **`md5(data + key + "yixiong&zhaolong5")`**——
  从 weibo-pro-next bundle 的 `PlayStatistics._md5Log` **还原**得到，并于 2026-09-21
  与 2026-09-18 的 HAR sig 精确比对（完全匹配）。与 h5playlog 的区别**仅在 salt**
  （h5playlog 用 `encryptedString`）。`data` = `JSON.stringify({uid,mid,keys,type,uuid,media_id})`；
  `key` = `Log_<rand5>_<ts><rand4><count>`。
- `h5playlog` 的 `sig` = `md5(data+key+"encryptedString")`（已对照 HAR 验证）；
  需带 `X-Xsrf-Token` + `x-requested-with: XMLHttpRequest`，否则 403。
- `read`（`PC_real_read`）：请求体为 `{"data": "<json 数组字符串>"}`，其中一条记录为
  `{act:"PC_real_read", itemid:<mid>, type:"mblog", rid:"0_0_0_<id>_0_0_0",
  root_id:<mid>, PC_real_read:1, __date:<ts>, duration:<ms>, read_duration:<ms>}`；
  `read_duration` = 累计观看毫秒（无 sig/key；同样需要 `X-Xsrf-Token` + `x-requested-with`
  CSRF 头）。从 2026-09-18 HAR 还原。
- `report.json` 两者都不需要。
- 2026-09-21 结论：三通道重放（report.json + h5playlog + playstatistics）**并未**使
  创作者中心播放时长入账（09-21 = 11.26h，对比 09-20 基线 8.64h，仅 +2.62h，属自然量级）。
  因此把 `read`（`PC_real_read`）作为**第 4 通道**（`--channels quad`）加入，是让播放时长
  入账的最高覆盖率尝试。仍未验证（2026-09-22 实际运行因 viewer SSO 凭证失效被阻断）。

已在 `beacon_engine.py` 中实现为**多通道**重放
（`--channels single|dual|triple|quad`，默认 `dual`）。`quad` = report.json +
h5playlog + playstatistics + `read`，dry-run 中均返回 200。播放时长的入账**滞后到次日**——
次日用 `read_backend_aggregate.py` 的 `play_dura_count`（账号级昨日）验证。
