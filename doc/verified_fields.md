# Weibo User Field Reference (the `verified*` family and related fields)

> 中文文档 / Chinese version: [verified_fields.zh-CN.md](verified_fields.zh-CN.md)

> Meaning, value ranges and locally observed values of the `verified*` verification
> fields on Weibo user objects, plus the related identity / influence fields.
> Facts come from `config/verified_categories.json` and the local relation
> snapshots (`data/relations/`).

## 1. The `verified*` field map

| Field | Type | Meaning | Common values / range | Observed in this repo | Notes |
|---|---|---|---|---|---|
| `verified` | bool | Master switch for a verified account (yellow V / blue V / influencer, ...) | true / false | 923/1256 = true | The other `verified_*` fields only matter when this is true |
| `verified_type` | int | Verification category (the official `getVerifiedIcon` decides the icon from this + `verified_type_ext`) | when `verified==true`: 0 = personal (yellow V); 1–7 = organization (blue V). When `verified==false`: 220 = club, 10 = influencer (female), others (-1/200) = no icon | -1, 0, 1, 2, 3, 4, 5, 7, 10, 200, 220 | In this snapshot every `verified_type=-1` has `verified=false` (ordinary unverified user, **not** an influencer); the "influencer" concept is not handled separately in this JS |
| `verified_type_ext` | int | Together with `verified_type` decides the icon / tier | when `verified==true`: for type 0, 1 = gold V, 2 = orange V, 0/other = yellow V; for type 1–7, -1 = grey V, (3, 53) = red V, other = blue V | personal: 0/1/2; organization: 50/51/52/53/0/-1 | Yellow / orange / gold is decided by `verified_type_ext` (**not** `verified_level`); see "Verification icon mapping" below |
| `verified_level` | int | Legacy verification-level field | 0 = none / 1 = yellow V / 2 = orange V / 3 = gold V (working assumption) | almost all verified are 3, only one is 1 | The front-end `getVerifiedIcon` does **not** use this field; yellow/orange/gold moved to `verified_type_ext`, so this field may be unreliable |
| `verified_state` | int | Verification state | 0 = normal; 2 = invalid / abnormal | 0:893, 2:30, None:333 | None = not verified |
| `verified_reason` | str | Verification reason text (shown on the profile page) | free text | "微博原创视频博主" ("Weibo original video blogger"), "Insta360 CEO" | Most useful one; can be displayed directly |
| `verified_trade` | str (numeric code) | Verification industry **code** (not human readable) | "3421"/"1568"... or empty | 869 empty; the rest are numeric codes | Needs an industry code table to resolve to a name |
| `verified_reason_url` | str | Link behind the verification reason | URL or empty | all empty | Practically always empty |
| `verified_source` | str | Verification source / issuer | "微博官方认证" etc., or empty | all empty | Practically always empty |
| `verified_source_url` | str | Verification source link | URL or empty | all empty | Practically always empty |
| `verified_detail` | object | Structured verification details | `{custom, data:[{key, sub_key, weight, desc, verify_extend}]}` | present for personal accounts; often null for organizations | Holds reason + weight + real-name flag |
| `verified_reason_modified` | str | Edit history of the verification reason | text / empty | mostly empty | — |
| `verified_contact_*` | str | Verification contact info (name / email / mobile) | text / empty | mostly empty | — |

## 2. Related fields that do not start with `verified`

Grouped into four buckets by purpose:

**A. Verification / real name (identity info parallel to `verified`)**
- `is_auth` (0/1), `auth_status` (1), `auth_realname`, `auth_career`, `auth_career_name`, `show_auth`: real-name / professional verification info.
- `verified_detail` (see the table above): structured verification details.

**B. Popularity / influence (the underlying signals that drive the yellow → orange → gold moves)**
- `urank`: influence ranking (observed 0–30+).
- `user_ability` / `user_ability_extend`: reach score.
- `credit_score`: credit score (observed to be 80 in most cases).
- `status_total_counter` / `video_total_counter`: reads / reposts / comments / likes / plays for posts and videos.

**C. Membership (a separate identity axis — do not confuse it with verification)**

Authoritative semantics (confirmed by the user in 2026-09; the Weibo front-end
`isVip` function in `h5.sinaimg.cn/.../index-*.js` is the final authority):

The official membership test is:

```js
function isVip(n={}) { return n.mbrank && n.mbtype && n.mbtype !== 2; }
```

- A regular member (vip) requires `mbtype` truthy (≠0), `mbrank` truthy (≠0)
  **and `mbtype !== 2`**.
- In this repo `mbtype` only ever takes `0 / 2 / 11 / 12`, so the formula is
  equivalent to the more intuitive **`mbtype > 2 && mbrank > 0`** — i.e. member
  = `mbtype > 2` (`11`/`12`), non-member = `mbtype ∈ {0, 2}`.
- `mbtype=2` is the classic "not a member but `mbrank` still holds a historical
  level" case: all 379 such users have `isVip=False` yet carry `mbrank 1–9`,
  which means `mbtype` falls back when membership expires while `mbrank` is not
  cleared (i.e. `mbrank` is very likely a leftover historical level).
- `社交会员` (svip, social member) / `经营会员` (vvip, business member) are
  **independent boolean fields** (`svip` / `vvip`), parallel to `mbtype`:
  this snapshot has `svip=387`, `vvip=296`.

The three axes are **parallel** (none implies another; an account can be a
regular member and a social member at the same time). `tier` takes the highest
one: vvip > svip > vip > none.

**`mbtype` / `mbrank` ranges and meaning (regular-member axis, measured over
1256 user records from `data.users` in the `following` snapshot)**

`mbtype` is the membership **type** code (the factual source for the member
test); `mbrank` is the vip level ordinal (only meaningful for real vips).

| Field | Type | Meaning | Observed values / range | Notes |
|---|---|---|---|---|
| `mbtype` | int | Membership type code | 0 = non-member (235); 2 = non-member (379); 11 = regular member/vip (21); 12 = regular member/vip (621) | Only these 4 values observed; both `11` and `12` are vip (per the `isVip` formula) — they differ by product subtype (e.g. annual / super), not by membership |
| `mbrank` | int | vip level ordinal (1–10) | 0:235 / 1:246 / 2:116 / 3:40 / 4:50 / 5:35 / 6:107 / 7:370 / 8:28 / 9:24 / 10:5 | Higher = higher level; `mbtype=0` strictly maps to `mbrank=0` (235), `mbtype=2` also carries `mbrank 1–9` (379) but is excluded by `isVip` |

Key facts from the joint distribution:

- `mbtype=0` **strictly** corresponds to `mbrank=0` (235 cases) → the two agree for non-members.
- `mbtype=2` users are confirmed non-members on their profile pages yet carry
  `mbrank 1–9` (observed examples: `mbrank=6/2/7` all with `mbtype=2`) →
  confirms that `mbrank` is a **lagging stock value**: it keeps the historical
  maximum after membership expires, so it must **not** be used as a membership
  test.
- **To decide membership, use the `isVip` formula (`mbtype` truthy and
  `mbtype !== 2` and `mbrank > 0`), never `mbtype` or `mbrank` alone.**
- The above only describes the regular-member axis; it says nothing about the
  two independent `svip` (social member) / `vvip` (business member) axes.

**Observed `mbtype × mbrank × isVip` combinations (1256 users, applying the
official `isVip` formula row by row):**

| mbtype | Users | isVip | mbrank range | Meaning |
|---|---|---|---|---|
| 0 | 235 | all False | always 0 | Non-member (no leftover) |
| 2 | 379 | all False | 1–9 | Non-member, `mbrank` holds a historical level |
| 11 | 21 | all True | 1–9 | Regular member |
| 12 | 621 | all True | 1–10 | Regular member |

→ In one sentence: **`mbtype > 2` means member; `mbrank` is the current level
only for real members (11/12), while for `mbtype=2` it is expired residue and
must never be used as a membership test.**

> An early relation snapshot suggested `vvip ⊂ svip` (every vvip also had svip);
> per the authoritative definition the two are parallel axes, and whether they
> coexist is decided by the individual boolean fields inside the `membership`
> block.

**Storage alignment (`data.user` of `profile/info`)**: `profile_visit
--update-profile` now writes the **complete `data.user`** returned by
`profile/info` back into the snapshot record verbatim (1:1 structure) and
attaches a derived `membership` block:

```json
"membership": {
  "tier": "vip|svip|vvip|none",
  "is_member": true,
  "is_vip": true,    // regular member
  "is_svip": false,  // social member
  "is_vvip": false,  // business member
  "mbtype": 11,
  "mbrank": 7
}
```

As a result, fields that exist **only** in `data.user` — such as `icon_list`,
`v_plus`, `top_user`, `user_type`, `is_star`, `is_muteuser` — also appear in the
local snapshot after a `--update-profile` run (see group E below).

**D. Account attribute flags**
- `is_big` (big V), `brand_account` (brand account), `class`, `star`, `interaction_user`.

**E. Returned only by `data.user` of `profile/info` (absent from relation-list
endpoints by default — run `--update-profile` to backfill)**
- `icon_list`: profile-page badge icon list (membership / influencer / credit /
  verification, ...), each entry `{type, url, ...}`; presentation layer, derived
  from other state.
- `v_plus`: related to Weibo's "V+" creator program (fan subscriptions / paid
  content / exclusive fan perks); V+ is a real Weibo product.
- `top_user`: probably a "top user / high-influence user" flag.
- `user_type`: coarse user-class code (e.g. 0 = ordinary user; the rest are
  influencers / special / organizational), conceptually overlapping with but
  independent of `verified_type`.
- `is_star`: probably a "celebrity / recommended / signed" user flag (it may
  also mean "starred").
- `is_muteuser`: whether the platform has **muted / silenced** the account
  (cannot post or comment) — a compliance dimension, orthogonal to both
  membership and verification.

> The meanings of the six fields above are inferred from public material and
> have **not** been verified one-by-one against local data; after a
> `--update-profile` run you can read the real values from the snapshot to
> calibrate them.

## 3. Verification icon mapping (`getVerifiedIcon` from the Weibo front-end `index-*.js`)

Below is the icon decision logic actually used by the Weibo web client
(manually verified against the source). It is the **authoritative** source for
the semantics of these two fields:

```js
function getVerifiedIcon(n) {
  if (n) {
    const r = +n.verified_type, o = +n.verified_type_ext;
    if (n.verified) {                                   // -- verified --
      if (r === 0)                                     // personal (yellow V)
        return o === 1 ? "vgold" : o === 2 ? "vorange" : "vyellow";
      if (r > 0 && r < 8)                              // organization (blue V): type 1..7
        return o === -1 ? "vgrey" : (r === 3 && o === 53) ? "vred" : "vblue";
    } else {                                            // -- not verified --
      if (r === 220) return "club";                    // club / super-topic host
      if (r === 10)  return "vgirl";                   // influencer (female) and similar badges
    }
  }
  return "";                                            // everything else: no icon (ordinary unverified)
}
```

**Mapping this back to the combinations observed in this repo:**

- Personal (yellow V) `verified_type=0`:
  - `ext=1` → **gold V** (`vgold`, 62 users in this snapshot)
  - `ext=2` → **orange V** (`vorange`, 73 users)
  - `ext=0/other` → **yellow V** (`vyellow`, 145 users)
  - ⇒ **yellow / orange / gold is decided by `verified_type_ext`, not by
    `verified_level`.**
- Organization (blue V) `verified_type ∈ {1..7}`:
  - `ext=-1` → **grey V** (`vgrey`)
  - `type=3 and ext=53` → **red V** (`vred`, media red V, 41 users)
  - other → **blue V** (`vblue`, incl. ext 0/50/51/52/..., 80+195+118+59+36+32+17+9+8+7+6+2+... users)
- Not verified (`verified=false`):
  - `type=220` → **club** icon (37 users, previously mis-read as blue V)
  - `type=10` → **vgirl** icon (1 user, previously mis-read as blue V)
  - `type=-1 / 200` etc. → no icon (ordinary unverified, 294 / 1 users)

> Note: the source tests organizations with `r>0 && r<8`, so `type=5` and
> `type=7` seen in this snapshot are still valid blue V (not "non-standard"
> codes) — they are just not broken down into sub-categories. That breakdown
> comes from `verified_type_ext` plus the code table in
> `verified_categories.json`.

### About the yellow V / orange V / gold V tiers

The three personal-verification tiers (yellow → orange → gold) are expressed by
`verified_type_ext`; moving up or down is still recomputed dynamically by Weibo
from the last 30 days of reads / loyal fans / interaction, and failing the
thresholds causes a demotion. For fine-grained tier analysis, look directly at
the group-B popularity fields, or calibrate the tier mapping in
`verified_categories.json` from real observations (`verified_level` does **not**
participate in the icon decision in this front-end logic — prefer
`verified_type_ext`).

## 4. Configuration (single source of truth)

The decision logic now reads **`config/verified_categories.json`** (loaded by
`src/weibo_tool/verified_config.py`):

- `verified_type` → coarse label (personal / organization), used by
  `blacklist_deep._verified_label` (`verified=false` and neither 220 nor 10 is
  not counted; the influencer `daren` subtype does not appear in this snapshot
  and the front-end JS does not handle it separately).
- `verified_type_ext` → fine-grained type code table (government / media /
  enterprise / ...) and the personal yellow/gold/orange tiers (0 = yellow,
  1 = gold, 2 = orange); unknown codes fall back to `unknown`.
- `verified_level` → legacy yellow/orange/gold tier naming (**no longer used by
  the front-end icon logic**, kept for reference only).
- `exclusions` → official / state-media exclusion list (the former
  `account_categories.json` content was merged in here).

`blacklist_deep`, `top_followed` and `profile_visit` all read from this one file
so the logic cannot fork; `profile_visit` additionally uses `is_organization()`
to skip enterprise / official / government blue-V accounts *before* issuing the
request (see `profile_visit.skip_organization`). If the JSON is missing or fails
to parse, the tool falls back to the built-in defaults in `verified_config.py`
and keeps working. Changing verification types or the exclusion list only
requires editing that JSON — no code change.
