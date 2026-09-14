# Playback & Video API Reference (author account)

> Scope: the APIs actually used by the playback-data scripts in `src/experiment/`
> to fetch **video catalog** and **per-video / aggregate playback statistics** for
> the author account (`uid = <AUTHOR_UID>`).
>
> Common headers for every request: `User-Agent` (desktop Chrome) and
> `Referer` set per endpoint below. A logged-in session cookie (`SUB` @ .weibo.com)
> is required.
>
> **Units are the source of truth.** Every duration/count value returned by the API
> carries an explicit unit field:
> - Aggregate (account-wide) play duration: `number_unit = "小时"` (hours).
> - Per-video 7-day total watch time (`play_totallength`): `number_unit = "秒"` (seconds).
> - Yesterday 播放时长: `desc2_unit = "小时"` (hours).
> Never assume a unit — read `number_unit` / `desc2_unit` from the response.

## Endpoints

All endpoints live under two hosts:

- `https://weibo.com/ajax/multimedia/getVideoList` — video catalog.
- `https://me.weibo.com/api/proxy/native/...` — creator-center analytics proxy.

### 1. getVideoList — video catalog

| Item | Value |
|---|---|
| URL | `https://weibo.com/ajax/multimedia/getVideoList` |
| Method | GET |
| Referer | `https://weibo.com/creator` |
| Used by | `fetch_recent_videos.py`, `read_backend_metrics.py` |
| Output | `src/data/author_videos.json` (`fetch_recent_videos.py`); `src/data/backend_metrics_<ts>.json` (`read_backend_metrics.py`) |

Parameters:

| Param | Type | Meaning |
|---|---|---|
| `cursor` | str | Pagination cursor. Start `"0"`; stop when `next_cursor` ∈ `{"", "0", "-1"}` or `videos` is empty. |
| `count` | str | Page size (we send `"20"`). |
| `status` | str | Video status filter; `"0"` = all (published) videos. |

Returns: `data.videos[]` — the full raw item for each video, including
`oid`, `mid`, `mid_str`, `titles`, `categories`, `tags`, `covers`,
`duration` (video length, seconds), `width`, `height`, `play_count`
(cumulative plays), `create_time` (ms), `statistics`, `video_visibility`, etc.
`data.next_cursor` drives pagination.

### 2. datavidnew (base) — weibo_info

| Item | Value |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavidnew` |
| Method | GET |
| Referer | `https://me.weibo.com/` |
| Used by | `crawl_video_stats.py` (`crawl_one`, default call) |
| Output | `src/data/author_video_stats.json` → `weibo_info` |

Parameters (common to all `datavidnew` calls below):

| Param | Type | Meaning |
|---|---|---|
| `video_oid` | str | Video oid, taken from `getVideoList` `oid`. |
| `mid` | str | Weibo mid, taken from `getVideoList` `mid_str` / `mid`. |
| `blogger_uid` | str | The account uid, `<AUTHOR_UID>`. |

Returns: `data[].weibo_info` → `text` (post body), `created_at`,
`reposts_count`, `comments_count`, `attitudes_count`, `source`, `pic_ids`.

### 3. datavidnew?tab=traffic — last-7-day totals (per video)

| Item | Value |
|---|---|
| URL | `.../datavidnew?tab=traffic` (+ `video_oid`/`mid`/`blogger_uid`) |
| Used by | `crawl_video_stats.py` → `traffic_7d` |
| Output | `author_video_stats.json` → `traffic_7d` (`period = "last_7d"`) |

Returns: `select_subitems["7"].videoonecore`:

| Field | Type | Meaning |
|---|---|---|
| `play_count` | {number, name} | 近7日总播放量; `number` is an integer. |
| `play_totallength` | {number, number_unit} | 近7日总播放时长 (total watch time). **`number_unit = "秒"` (seconds).** |

Note: this is a **7-day window**; for old videos the value can be `0`.

### 4. datavidnew?tab=diagnosis — diagnosis

| Item | Value |
|---|---|
| URL | `.../datavidnew?tab=diagnosis` (+ common params) |
| Output | `author_video_stats.json` → `diagnosis` |

Returns: `data[].diagnosis_items.list` → items `{text, status, type}` plus
`item.suggestion.text`.

### 5. datavid_item?item_id=dt_onevid_score — clarity score

| Item | Value |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavid_item` |
| Params | common `video_oid`/`mid`/`blogger_uid` + `is_new=1` + `item_id=dt_onevid_score` |
| Output | `author_video_stats.json` → `clarity_score` |

Returns: `data.{score, score_unit, text, desc_list, suggestion.text}`.

### 6. datavid_item?item_id=dt_onevid_playratio — play completion curve

| Params | `item_id=dt_onevid_playratio` (others same as #5) |
|---|---|
| Output | `author_video_stats.json` → `play_ratio` |

Returns: `data.groups[""].{desc1, desc2, desc2_unit, desc3_text, desc3_end}`
(播放完成度; `desc3_text` = vs-peers comparison).

### 7. datavid_item?item_id=dt_onevid_scene — traffic source

| Params | `item_id=dt_onevid_scene` |
|---|---|
| Output | `author_video_stats.json` → `traffic_source` |

Returns: `data.groups[].{name, number, percent}` (流量来源 breakdown).

### 8. datavid_item?item_id=dt_onevid_portrait — audience portrait

| Params | `item_id=dt_onevid_portrait` |
|---|---|
| Output | `author_video_stats.json` → `portrait` |

Returns: the native API structure (`type`/`item_id`/`card_group`/...).
Empty-string group keys are renamed to `"default"` so every JSON key stays
English (project rule). Chinese appears only as values.

### 9. datanew_selectdata?module=video_core&period=1 — yesterday aggregates

| Item | Value |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datanew_selectdata` |
| Method | GET |
| Referer | `https://me.weibo.com/` |
| Used by | `read_backend_aggregate.py` → `fetch_yesterday` |
| Output | `src/data/backend_aggregate_<ts>.json` → `aggregates.yesterday` |

Parameters:

| Param | Meaning |
|---|---|
| `module` | `video_core` (the rich 6-metric module; **not** `sum_core`, which returns only 播放量 + 播放时长). |
| `period` | `1` = yesterday. |

Returns: `data.groups["1"][]` — one entry per metric:

| Field | Meaning |
|---|---|
| `desc1` | Chinese metric label → mapped to canonical English key: 发布量=`upload_count`, 播放量=`play_count`, 播放时长=`play_dura_count`, 转发量=`reposts_count`, 评论量=`comments_count`, 点赞量=`attitudes_count`. |
| `desc2` | The value. |
| `desc2_unit` | Unit, e.g. `"小时"` for 播放时长; `null` for counts. |
| `desc3_text` | Change vs previous day, e.g. `"+99"`, `"--"`. |

### 10. datavidnew (no params) — last-7 / last-30 day aggregates

| Item | Value |
|---|---|
| URL | `https://me.weibo.com/api/proxy/native/datavidnew` (no `video_oid`/`tab`) |
| Used by | `read_backend_aggregate.py` → `fetch_7_30` |
| Output | `backend_aggregate_<ts>.json` → `aggregates.last_7d` / `aggregates.last_30d` |

Returns: `select_subitems["7"]` and `["30"]` → `videocore`:

| Field | Type | Meaning |
|---|---|---|
| `upload_count` | number | 发布量 |
| `play_count` | number | 播放量 |
| `play_dura_count` | {number, number_unit} | 播放时长. **`number_unit = "小时"` (hours).** |
| `reposts_count` | number | 转发量 |
| `comments_count` | number | 评论量 |
| `attitudes_count` | number | 点赞量 |

Account-wide (no per-video filter). Keys are already English.

### 11. datavid_item?item_id=dt_vid_playpercent — yesterday top-5 by play

| Item | Value |
|---|---|
| URL | `.../datavid_item?is_new=1&item_id=dt_vid_playpercent` |
| Used by | `read_backend_aggregate.py` → `fetch_yesterday_top5` |
| Output | `backend_aggregate_<ts>.json` → `yesterday_top5_play` |

Returns: `data.card_group[1].card_group` → type-`22` video cards with
`rank`, `item_id` (mid), `title`, `duration`, `desc2` (publish time),
`display_arrow_text` (yesterday play count), `scheme`.

## Output data files

| File | Writer | Content |
|---|---|---|
| `src/data/author_videos.json` | `fetch_recent_videos.py` | Full video catalog (metadata + cumulative `play_count`), newest-first. Re-run refreshes metadata and appends new videos. |
| `src/data/backend_metrics_<ts>.json` | `read_backend_metrics.py` | Flat per-video metrics (play/like/comment/repost/danmaku counts) per snapshot. |
| `src/data/author_video_stats.json` | `crawl_video_stats.py` | Per-video analytics: `weibo_info`, `traffic_7d` (7-day play count + watch seconds), `diagnosis`, `clarity_score`, `play_ratio`, `traffic_source`, `portrait`. Keyed by mid; resumable. |
| `src/data/backend_aggregate_<ts>.json` | `read_backend_aggregate.py` | Account-wide aggregates for 昨日 / 近7日 / 近30日 (6 metrics each, with units) + 昨日播放量TOP5. Timestamped per run. |
| `src/data/archive/*.json` | auto (`data_archive.py`) | Before each daily refresh, the prior `author_videos.json` / `author_video_stats.json` is copied here with a filename stamped by its own `meta.updated_at` (UTC). |

## Refresh & archive workflow

1. `fetch_recent_videos.py` — refresh catalog (also archives previous `author_videos.json`).
2. `crawl_video_stats.py` — refresh per-video stats (also archives previous `author_video_stats.json`); resumable, skips already-crawled mids.
3. `read_backend_aggregate.py` — write a fresh timestamped aggregate snapshot.

All three honor the API's own unit fields (hours for aggregates, seconds for
per-video 7-day watch time). Re-running never loses history because the prior
live files are archived before being overwritten.
