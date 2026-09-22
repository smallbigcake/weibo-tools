# Static-Asset Analysis — Optimization Opportunities for `weibo-tools`

> Generated 2026-09-21 from `src/static/` (Weibo front-end bundles, beautified).
> Chinese version: [static_analysis.zh-CN.md](static_analysis.zh-CN.md)

## 1. What was analyzed

| Source bundle | Relevance to this project |
|---|---|
| `h5.sinaimg.cn/m/login/...` (V2 QR login) | Already mined → `auth.py`. No new info. |
| `passport.sinaimg.cn/js/fp/*`, `yidun/*` | Device-fingerprint + captcha SDK. Already mined. |
| **`h5.sinaimg.cn/m/weibo-pro-next/`** (Vue 3, 2026-09 — current creator dashboard) | **Richest new source.** Video play-log, blacklist/follower write APIs, profile groups, feed filter, favorites, evaluation. |
| `h5.sinaimg.cn/m/weibo-pro/` (webpack, previous creator app) | Confirms the same endpoints; mobile `m.weibo.cn` API surface. |
| `h5.sinaimg.cn/m/weibo-lite/` (legacy H5 client + `sw.js` precache) | **Full mobile API surface** in one regex — lighter-weight crawl channel. |

## 2. Confirmations — existing code is correct (no change needed)

- **`/ajax/log/h5playlog` is THE play-log endpoint.** `index-D53O_Npi.js:123624`
  posts `FormData{data, key, sig}` where `sig = SparkMD5.hash(data+key+"encryptedString")`
  — exactly the formula we derived from the 2026-09-18 HAR. Implementation is verified.
- **`valid_play_duration` only accrues on continuous playback:** `u = c < .6 && c > 0 ? c : 0`
  per `timeupdate` tick (`index-D53O_Npi.js:123605`). I.e. seeking / jumps do **not** count.
  This explains why FastWatch replay (sending a full accumulated duration every 30 s) is
  accepted on the wire but **still does not move `play_count`** — Weibo de-dupes repeated
  plays from the *same viewer*. Conclusion unchanged: replay is inert for count; the only
  open question is `play_duration`, which needs next-day aggregate verification.
- **`/ajax/multimedia/getVideoList`** (cursor-paged) returns `statistics.play_count`
  (`videoManage-ClGUhmxK.js:52,224`) — the real-time count source we already use.
- **`profile/info` + `topicContent`** for profile-visit registration — minimal & correct
  (already proven by the 2026-09-04 ablation study).
- **Favorites read** (`/ajax/favorites/all_fav`, `/ajax/favorites/show`,
  `/ajax/favorites/tags`) — already enumerated in `api_explorer.py`.

## 3. NEW knowledge → concrete optimizations

### B1. Blacklist WRITE — *highest value, currently a gap*  ⭐
The project only **reads** the blacklist (`blacklist.py` → `setting/getFilteredUsers`).
The creator app reveals the **write** side:

- **Add to blacklist:** `POST /ajax/statuses/filterUser`
  body `{uid, status, interact, follow}` — `status:1`=hide their posts,
  `interact:1`=block interaction, `follow:1`=block them following you.
  The UI says *"全选即为拉黑用户"* (all three = full block).
  (`index-D53O_Npi.js:43691-43710`)
- **Remove from blacklist:** `POST /ajax/statuses/deleteFilters` `{uid}`
  (UI: *"解除黑名单"*, `:43775-43779`).

**Optimization:** `blacklist_deep` can now *act*, not just analyze — auto-add identified
spammers, or expose `blacklist add/remove <uid>`. Must run behind explicit confirmation +
`--dry-run` (writes to the live account).

### B2. Remove a follower — `POST /ajax/profile/destroyFollowers` `{uid}`
(`index-D53O_Npi.js:43760`). Lets `blacklist_deep` purge spam followers programmatically.

### B3. Following groups (分组) — full CRUD
`/ajax/profile/setGroup`, `createGroup`, `updateGroup`, `destroyGroup`, `getGroups`,
`getGroupList` (`index-D53O_Npi.js:14155-14280, 43723-43733`). `following_deep` could
tag/classify crawled followings into groups, or read a user's existing group membership.

### B4. Feed filter (不看TA) — same `filterUser` with partial flags
Subset of B1 (`status`/`interact` only).

### B5. Special-follow + remark
`POST /ajax/friendships/specialAdd` / `specialDestory` `{uid, specialFollow}`
(`index-D53O_Npi.js:43363`), `POST /ajax/friendships/remarkUpdate` (`:43348`).
`following_deep` could set 备注 / 特别关注 in bulk.

### B6. Bulk follow pattern (reference)
The app does `Promise.all(uids.map(u => post('/ajax/friendships/create',{friend_uid:u}).catch(()=>{}))`
(`index-D53O_Npi.js:145050`) — per-item error tolerance is the right pattern for any
bulk write we add.

### B7. Favorites management (write side exists)
`/ajax/favorites/tags/update`, `/ajax/favorites/tags/destroy_batch` (`:11575-11578`).
A `favorites` crawler command is **not yet present** — easy new feature.

### B8. Content evaluation (new feature)
`POST/GET /ajax/evaluation/tab_search`, `/ajax/evaluation/query` (`:57695,57713`) —
read a post's content-quality / value score. New read-only analytics command.

### B9. `act_code` event taxonomy (analytics)
`refresh:5006, visit:4288, follow:14000008, enterDetail:6458, creatorCardVisit:6841,
creatorCardClick:6842` plus `act_code:6306` visit-report (`index-D53O_Npi.js:126390,
129035-129048`). Mostly for telemetry; can enrich `profile_visit` / read-count logging
but does **not** register the self-visible visit list (that is still `profile/info`).

### B10. Mobile `m.weibo.cn` API surface (lighter crawl channel)
`weibo-lite/sw.js:221` precaches the full mobile API in one regex:
`config(/list)?`, `captcha/show`, `suggest/hotspot`, `users/show`, `container/getIndex`
(universal timeline), `feed/trendtop`, `statuses/repostTimeline`, `attitudes/show`,
`groupchat/list`, `friendships/groupsMember(Add|Destory)`, `video/(createCert|getSsigUrl)`,
`feed/friends`, `message/(msglist|mentionsAt|mentionsCmt|cmt|myCmt|notelist)`,
`profile/info`, `comments/hotflow`. These are lower-overhead than `weibo.com/ajax/*`
and a good fallback crawl channel for `relations_sync` / `following_deep`.

## 4. Recommendations (priority)

- **P0 — Close the read-only gap (B1+B2):** add `blacklist add/remove` and
  `remove-follower`, behind explicit confirm + `--dry-run`. Reuses `http_engine` throttle
  handling. **Needs write headers:** `X-Xsrf-Token` (from `XSRF-TOKEN` cookie) +
  `x-requested-with: XMLHttpRequest` (same 403 fix we applied to `h5playlog`).
- **P1 — Document the mobile API (B10)** as a resilient crawl channel in `doc/api_inventory`.
- **P1 — New read-only commands:** `favorites` crawler (B7), `evaluation` reader (B8).
- **P2 — `following_deep` enrichment:** group tagging (B3) + remark/special-follow (B5).
- **FastWatch:** keep as monitor only; replay is inert for `play_count`, verify
  `play_duration` next-day (already tracked).

## 5. Cross-cutting notes
- **Write requests need CSRF:** every `weibo.com/ajax/*` POST above requires
  `X-Xsrf-Token` + `x-requested-with`. The `passport` `sso/v2/qrcode/*` family does **not**
  (already handled in `auth.py`).
- **uid format:** `destroyFollowers` uses `uid` = numeric **idstr**; `filterUser` /
  `friendships/destory` use `uid` = numeric id. Match the field the bundle sends.
- **Throttle parity:** `profile/info` is throttled with HTTP 414; writes may throttle too —
  reuse `http_engine`'s recovery-cooldown global.
- **Safety:** all B1–B6 write to the live account. Never auto-run without an explicit
  user flag and a dry-run preview; keep PII/`uid` in `config/experiment.local.json` only.
