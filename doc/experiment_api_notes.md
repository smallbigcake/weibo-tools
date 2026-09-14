# 微博创作者中心 API 文档（author 账号抓取）

本项目抓取微博创作者中心（me.weibo.com / weibo.com）的 **author** 账号（`uid = <AUTHOR_UID>`）
视频数据，供后期分析使用。本文档列出实际用到的 API、参数含义，以及各自产出的数据文件。

> 文档基于 `src/experiment/` 下的抓取脚本（生产脚本）整理。`probe_*` / `diag_*` /
> `dump_*` / `capture_*` / `analyze_*` 等为探索/诊断脚本，**不属于数据流水线**，不在本文档范围。

---

## 1. 总览

| 项 | 值 |
|---|---|
| 目标账号 uid | `<AUTHOR_UID>` |
| 鉴权方式 | `auth.Auth` 从磁盘加载 cookies（约 24 个），随请求自动带上 |
| 列表类域名 | `https://weibo.com/ajax/multimedia/getVideoList` |
| 数据中心代理域名 | `https://me.weibo.com/api/proxy/native` |
| 公共请求头 | `User-Agent`（Chrome 120）、`Referer`（`https://me.weibo.com/` 或 `https://weibo.com/creator`） |
| 限流表现 | 过快翻页/请求会返回 **HTTP 400**；偶发 **HTTP 502**（服务端故障，非限流） |
| 重试策略 | 400 退避重试（1→2→…秒）；502 等非 200 如实记录响应体，不猜测原因 |

---

## 2. 通用参数

| 参数 | 类型 | 含义 | 使用接口 |
|---|---|---|---|
| `video_oid` | string | 视频 oid，形如 `1034:5341993522626592` | datavidnew / datavid_item（单视频） |
| `mid` | string | 视频/微博 id（数字串） | datavidnew / datavid_item（单视频） |
| `blogger_uid` | string | 账号 uid，`<AUTHOR_UID>` | datavidnew / datavid_item（单视频） |
| `tab` | string | `traffic`=近7日流量；`diagnosis`=诊断。缺省=微博正文 | datavidnew（单视频） |
| `is_new` | string | 固定 `"1"` | datavid_item |
| `item_id` | string | 具体数据卡片 id（见各接口） | datavid_item |
| `cursor` | string | 分页游标，`"0"` 起；`""`/`"0"`/`"-1"` 表示结束 | getVideoList |
| `count` | string | 每页条数，固定 `"20"` | getVideoList |
| `status` | string | 过滤状态，`"0"`=全部 | getVideoList |
| `module` | string | `video_core` | datanew_selectdata |
| `period` | string | `1`=昨日 | datanew_selectdata |

---

## 3. 接口列表

### A. `GET weibo.com/ajax/multimedia/getVideoList` —— 视频列表
- **用途**：分页拉取账号全部视频的元数据。
- **调用脚本**：`fetch_recent_videos.py`（产出 `author_videos.json`）、`read_backend_metrics.py`（产出 `backend_metrics_<ts>.json`）
- **参数**：`cursor`, `count="20"`, `status="0"`
- **返回要点**（`data.videos[]`）：
  - `mid` / `mid_str`：视频 id
  - `titles`：标题（数组，首项含 `title`）
  - `create_time`：创建时间（毫秒）
  - `duration`：视频时长（秒）
  - `play_count`：**累计播放量**
  - `statistics`：`comment_count` / `attitude_count`(点赞) / `reposts_count` / `danmaku_count`
  - `video_visibility`：可见性
  - `covers` / `categories` / `tags` 等
- **分页结束**：`videos` 为空，或 `next_cursor` ∈ `{"", "0", "-1"}`

### B. `GET me.weibo.com/api/proxy/native/datavidnew`（无 tab）—— 单视频正文
- **用途**：取单视频微博正文与互动数。
- **调用脚本**：`crawl_video_stats.py`（`recrawl_traffic.py` 复用）
- **参数**：`video_oid`, `mid`, `blogger_uid`
- **返回要点**（`data[].weibo_info`）：`text`, `created_at`, `reposts_count`, `comments_count`, `attitudes_count`, `source`, `pic`

### C. `GET .../datavidnew?tab=traffic` —— 单视频近7日流量
- **用途**：单视频近 7 日播放量 + 观看总时长。
- **调用脚本**：`crawl_video_stats.py` / `recrawl_traffic.py`
- **参数**：`video_oid`, `mid`, `blogger_uid`, `tab="traffic"`
- **解析要点**：响应 `data[]` 中**可能包含多个 `select_subitems`**（流量/完播率/来源/画像卡片混在一起，且有空壳卡）。取 `videoonecore.play_count.number` 非空的那个 → `play_count`（近7日播放量）、`play_totallength`（近7日观看总时长，自带 `number_unit`）。
- **单位**：`play_totallength.number_unit` 为 **秒/分钟/小时** 自适应，以 API 原单位为准（见 §5）。

### D. `GET .../datavidnew?tab=diagnosis` —— 单视频诊断
- **用途**：单视频质量诊断。
- **调用脚本**：`crawl_video_stats.py`
- **参数**：`video_oid`, `mid`, `blogger_uid`, `tab="diagnosis"`
- **返回要点**（`item_id=dt_onevid_diagnosis2`）：`desc`、诊断项 `list`（text/status/type）、`suggestion.text`

### E–H. `GET .../datavid_item?is_new=1&item_id=...` —— 单视频各分析卡片
- **用途**：单视频的画质分、播放完成度、流量来源、受众画像。
- **调用脚本**：`crawl_video_stats.py`
- **参数**：`video_oid`, `mid`, `blogger_uid`, `is_new="1"`, `item_id` ∈
  - `dt_onevid_score` —— 画质分（`clarity_score`）
  - `dt_onevid_playratio` —— 播放完成度曲线（`play_ratio`）
  - `dt_onevid_scene` —— 流量来源（`traffic_source`）
  - `dt_onevid_portrait` —— 受众画像（`portrait`）

### I. `GET .../datanew_selectdata?module=video_core&period=1` —— 昨日汇总
- **用途**：昨日 6 项核心指标，每项带环比（较前日）增量。
- **调用脚本**：`read_backend_aggregate.py`
- **参数**：`module="video_core"`, `period="1"`
- **返回要点**（`data.groups["1"]` 列表）：每项含 `desc1`（中文标签）、`desc2`（数值）、`desc2_unit`（单位，播放时长=小时）、`desc3_text`（环比）。中文标签→英文键映射：
  `发布量→upload_count`、`播放量→play_count`、`播放时长→play_dura_count`、`转发量→reposts_count`、`评论量→comments_count`、`点赞量→attitudes_count`

### J. `GET .../datavidnew`（无参数）—— 账号级 7日/30日汇总
- **用途**：全账号近 7 日 / 近 30 日的播放、时长、发布等聚合指标。
- **调用脚本**：`read_backend_aggregate.py`
- **参数**：无（账号级）
- **返回要点**：`select_subitems["7"]` / `["30"]` → `videocore` → `upload_count` / `play_count` / `play_dura_count`（单位 小时）/ `reposts_count` / `comments_count` / `attitudes_count`

### K. `GET .../datavid_item?is_new=1&item_id=dt_vid_playpercent` —— 昨日播放 TOP5
- **用途**：昨日按播放量排序的 TOP5 视频。
- **调用脚本**：`read_backend_aggregate.py`
- **参数**：`is_new="1"`, `item_id="dt_vid_playpercent"`
- **返回要点**（`data.card_group[].card_group[]`，`type=22`）：`rank`, `item_id`(=mid), `title`, `duration`, `desc2`(发布时间), `display_arrow_text`(昨日播放), `scheme`

---

## 4. 输出数据文件

| 文件 | 产出脚本 | 内容 |
|---|---|---|
| `src/data/author_videos.json` | `fetch_recent_videos.py` | 视频清单 + 静态元数据（累计 `play_count`、`duration`、标题、标签、封面、创建时间、`statistics` 等）。结构：`{ meta, videos[] }` |
| `src/data/author_video_stats.json` | `crawl_video_stats.py`（全量）/ `recrawl_traffic.py`（仅刷新 `weibo_info`+`traffic_7d`） | 逐视频深度分析。结构：`{ meta, videos{ <mid>: { weibo_info, traffic_7d, diagnosis, clarity_score, play_ratio, traffic_source, portrait } } }` |
| `src/data/backend_aggregate_<ts>.json` | `read_backend_aggregate.py` | 账号级聚合快照：昨日 / 近7日 / 近30日 的播放量、播放时长、发布、互动，及昨日播放 TOP5。`<ts>` 为 UTC 时间戳 |
| `src/data/backend_metrics_<ts>.json` | `read_backend_metrics.py` | 逐视频后端指标快照：`mid/title/create_time/duration/play_count/comment/like/repost/danmaku/visibility` |

> 历史归档：`author_videos.json` 与 `author_video_stats.json` 在每次覆盖写前，会由
> `data_archive.archive_existing` 按文件自身 `meta.updated_at` 复制到 `src/data/archive/`
> （文件名带时间戳），可逐日追溯。

---

## 5. 单位与归一化约定

- 时长类字段（观看时长/播放时长）API **自带 `number_unit`**（秒 / 分钟 / 小时），以 API 原单位为准，**不要假设固定单位**。
- 数据文件**保留原始数值 + 原始单位**字段（如 `traffic_7d.play_totallength` + `play_totallength_unit`）。
- 另存**额外**归一化字段 `play_totallength_sec`（秒），仅用于跨视频计算（排序/聚合）；**报表一律用原始度量**。
- 聚合接口中 `play_dura_count` 的 `number_unit` 为 `小时`（7日/30日），昨日接口播放时长单位来自 `desc2_unit`。

---

## 6. 运行方式速查

```bash
# 刷新视频清单（全量翻页，更新 play_count 等元数据）
venvs/test-env/Scripts/python.exe src/experiment/fetch/fetch_recent_videos.py [--incremental]

# 全量抓取逐视频深度统计
venvs/test-env/Scripts/python.exe src/experiment/crawl/crawl_video_stats.py [--force] [--delay 0.8]

# 仅刷新 weibo_info + traffic_7d（更快，复用归一化逻辑）
venvs/test-env/Scripts/python.exe src/experiment/crawl/recrawl_traffic.py [--delay 0.4]

# 账号级聚合快照（昨日/7日/30日 + TOP5）
venvs/test-env/Scripts/python.exe src/experiment/fetch/read_backend_aggregate.py

# 逐视频后端指标快照
venvs/test-env/Scripts/python.exe src/experiment/fetch/read_backend_metrics.py
```
