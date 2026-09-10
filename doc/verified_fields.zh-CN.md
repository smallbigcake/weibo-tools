# 微博用户信息字段映射（verified 系列及相关字段）

> English version (default): [verified_fields.md](verified_fields.md)

> 记录微博用户对象中 `verified*` 认证字段，以及与之相关的身份/影响力字段的含义、
> 取值范围与本项目实测情况。字段事实依据来自 `src/config/verified_categories.json`
> 与本地关系快照（`data/relations/`）。

## 一、verified 系列字段映射表

| 字段 | 类型 | 含义 | 常见取值 / 范围 | 本仓库快照实测 | 备注 |
|---|---|---|---|---|---|
| `verified` | bool | 是否认证账号（黄V/蓝V/达人等）总开关 | true / false | 923/1256 = true | 其余 `verified_*` 仅在其为 true 时有意义 |
| `verified_type` | int | 认证大类（官方 `getVerifiedIcon` 以此+`verified_type_ext` 定图标） | `verified==true`：0=个人(黄V)；1–7=机构(蓝V)。`verified==false`：220=俱乐部、10=红人女、其余(-1/200)无图标 | -1,0,1,2,3,4,5,7,10,200,220 | 本快照中 `verified_type=-1` 全部 `verified=false`（普通未认证，**非达人**）；达人概念在此 JS 中未单独处理 |
| `verified_type_ext` | int | 与 `verified_type` 共决图标/档位 | `verified==true`：type0 时 1=金V、2=橙V、0/其它=黄V；type1–7 时 -1=灰V、(3,53)=红V、其它=蓝V | 个人：0/1/2；机构：50/51/52/53/0/-1 | 黄/橙/金 由 `verified_type_ext` 决定（非 `verified_level`）；见下方"认证图标映射" |
| `verified_level` | int | 旧版认证等级字段 | 0=无 / 1=黄V / 2=橙V / 3=金V（工作假设） | 已认证几乎全 3，仅 1 个 1 | 前端 `getVerifiedIcon` **不使用此字段**定图标，黄橙金改由 `verified_type_ext` 承载；此字段可能已不可靠 |
| `verified_state` | int | 认证状态 | 0=正常；2=失效/异常 | 0:893, 2:30, None:333 | None=未认证 |
| `verified_reason` | str | 认证理由文本（资料页展示） | 自由文本 | "微博原创视频博主"、"Insta360 CEO" | 最有用、可直接展示 |
| `verified_trade` | str(数字码) | 认证行业分类**编码**（非人类可读名） | "3421"/"1568"... 或空 | 869 个空；其余为数字码 | 需行业码表才能翻成名 |
| `verified_reason_url` | str | 认证理由跳转链接 | URL 或空 | 全空 | 实战基本空 |
| `verified_source` | str | 认证来源/发证方 | "微博官方认证" 等 或空 | 全空 | 实战基本空 |
| `verified_source_url` | str | 认证来源链接 | URL 或空 | 全空 | 实战基本空 |
| `verified_detail` | object | 结构化认证详情 | {custom, data:[{key,sub_key,weight,desc,verify_extend}]} | 个人账号有；机构常 null | 含 reason + 权重 + 实名标记 |
| `verified_reason_modified` | str | 认证理由修改记录 | 文本/空 | 多空 | — |
| `verified_contact_*` | str | 认证联系信息(name/email/mobile) | 文本/空 | 多空 | — |

## 二、不以 verified 开头但相关的字段

按用途分四类：

**A. 认证/实名（与 verified 并列的身份信息）**
- `is_auth`(0/1)、`auth_status`(1)、`auth_realname`、`auth_career`、`auth_career_name`、`show_auth`：实名/职业认证信息。
- `verified_detail`（见上表）：结构化认证详情。

**B. 热度/影响力（即驱动黄→橙→金 升降的底层信号）**
- `urank`：影响力排名（实测 0–30+）。
- `user_ability` / `user_ability_extend`：传播力分值。
- `credit_score`：信用分（实测多为 80）。
- `status_total_counter` / `video_total_counter`：微博/视频的阅读、转发、评论、点赞、播放量。

**C. 会员体系（另一套身份，别和认证混淆）**

权威语义（2026-09 由用户确认；并以微博前端 `h5.sinaimg.cn/.../index-*.js` 的 `isVip` 函数为最终依据）：

会员判定官方公式：
```js
function isVip(n={}) { return n.mbrank && n.mbtype && n.mbtype !== 2; }
```
- 必须 `mbtype` 为真（≠0）、`mbrank` 为真（≠0）**且 `mbtype !== 2`** 才判为普通会员(vip)。
- 本仓库实测 `mbtype` 仅取 `0 / 2 / 11 / 12`，故上式等价于更直观的 **`mbtype > 2 && mbrank > 0`**——即会员 = `mbtype > 2`（`11`/`12`），非会员 = `mbtype ∈ {0, 2}`。
- `mbtype=2` 是"非会员但 `mbrank` 残留历史等级"的典型：379 人全部 `isVip=False`，却带着 `mbrank 1–9`，说明会员过期后 `mbtype` 回落而 `mbrank` 不清零（即 `mbrank` 很可能残留历史等级）。
- `社交会员`(svip) / `经营会员`(vvip) 是**独立布尔字段**（`svip`/`vvip`），与 `mbtype` 平行：本快照 `svip=387`、`vvip=296`。

三条轴是**平行的**（互不必然蕴含；一个账号可同时是 普通会员 + 社交会员 等）。`tier` 取最高一档：vvip > svip > vip > none。

**`mbtype` / `mbrank` 字段范围与含义（普通会员轴，实测自 `following` 快照 `data.users` 共 1256 条用户记录）**

`mbtype` 是会员**类型**码（判定是否会员的事实来源）；`mbrank` 是 vip 等级序数（仅对真正的 vip 有效）。

| 字段 | 类型 | 含义 | 本仓库实测取值 / 范围 | 备注 |
|---|---|---|---|---|
| `mbtype` | int | 会员类型码 | 0=非会员(235)；2=非会员(379)；11=普通会员/vip(21)；12=普通会员/vip(621) | 仅观测到这 4 个值；`11`/`12` 均为 vip（依 `isVip` 公式），区别是产品子类（如年费/超级），非 vip 与否 |
| `mbrank` | int | vip 等级序数（1–10） | 0:235 / 1:246 / 2:116 / 3:40 / 4:50 / 5:35 / 6:107 / 7:370 / 8:28 / 9:24 / 10:5 | 数字越大等级越高；`mbtype=0` 严格对应 `mbrank=0`(235)，`mbtype=2` 也带 `mbrank 1–9`(379) 但被 `isVip` 排除 |

联合分布关键事实：
- `mbtype=0` **严格**对应 `mbrank=0`（235 例）→ 非会员上二者一致。
- `mbtype=2` 是用户在资料页确认的非会员，却带着 `mbrank 1–9`（实测例：`mbrank=6/2/7` 均配 `mbtype=2`）→ 印证 `mbrank` 是**滞后的存量等级值**，会员过期后仍保留历史最高等级，故**不能**作会员判据。
- **判定会员须用 `isVip` 公式（看 `mbtype` 且 `mbtype!==2` 且 `mbrank>0`），而非单独读 `mbtype` 或 `mbrank`**。
- 上述只描述普通会员轴，与 `svip`(社交会员) / `vvip`(经营会员) 两条独立轴无关。

**`mbtype × mbrank × isVip` 实测交叉组合（1256 人，逐条套用官方 `isVip` 公式）：**

| mbtype | 人数 | isVip 结果 | mbrank 范围 | 含义 |
|---|---|---|---|---|
| 0 | 235 | 全 False | 恒 0 | 非会员（无残留） |
| 2 | 379 | 全 False | 1–9 | 非会员，`mbrank` 残留历史等级 |
| 11 | 21 | 全 True | 1–9 | 普通会员 |
| 12 | 621 | 全 True | 1–10 | 普通会员 |

→ 规律一句话：**`mbtype > 2` 即会员；`mbrank` 只在会员（11/12）上表示当前等级，在 `mbtype=2` 上是过期残留，绝不可当作会员判据。**

> 早期关系快照实测曾出现 `vvip ⊂ svip`（所有 vvip 都带 svip）；但按权威定义二者为平行轴，共存与否以 `membership` 块内各布尔字段为准。

**存储结构对齐（`profile/info` 的 `data.user`）**：`profile_visit --update-profile` 现在会把 `profile/info` 返回的**完整 `data.user`** 逐字写回快照记录（结构 1:1 对齐），并附一个派生的 `membership` 块：
```json
"membership": {
  "tier": "vip|svip|vvip|none",
  "is_member": true,
  "is_vip": true,    // 普通会员
  "is_svip": false,  // 社交会员
  "is_vvip": false,  // 经营会员
  "mbtype": 11,
  "mbrank": 7
}
```
因此 `icon_list` / `v_plus` / `top_user` / `user_type` / `is_star` / `is_muteuser` 等**只存在于 `data.user`** 的字段，在跑过 `--update-profile` 后也会出现在本地快照里（见下组 E）。

**D. 账号属性旗标**
- `is_big`(大V)、`brand_account`(品牌号)、`class`、`star`、`interaction_user`。

**E. 仅 `profile/info` 的 `data.user` 返回（关系列表接口默认不含，需 `--update-profile` 补齐）**
- `icon_list`：资料页徽章图标列表（会员/达人/信用/认证等），每项 `{type,url,...}`，属展示层、由其它状态派生。
- `v_plus`：与微博 "V+" 创作者计划相关（粉丝订阅/内容付费/专属粉丝权益）；V+ 是真实存在的微博产品。
- `top_user`：疑似"头部用户/高影响力用户"旗标。
- `user_type`：用户大类编码（如 0=普通用户；其余为达人/特殊/机构等），与 `verified_type` 概念重叠但是独立字段。
- `is_star`：疑似"明星/推荐/签约"用户旗标（也可能指"星标"）。
- `is_muteuser`：账号是否被平台**禁言/静音**（无法发博/评论）——合规状态维度，与会员、认证皆正交。

> 上述 6 个字段含义为基于公开资料的推断，**未用本地数据逐一核实**；跑过 `--update-profile` 后可在快照中取到真实取值以校准。

## 三、认证图标映射（来自微博前端 `index-*.js` 的 `getVerifiedIcon`）

以下为微博 Web 端实际使用的图标判定逻辑（已人工核对源码），是这两个字段语义的**权威依据**：

```js
function getVerifiedIcon(n) {
  if (n) {
    const r = +n.verified_type, o = +n.verified_type_ext;
    if (n.verified) {                                   // —— 已认证 ——
      if (r === 0)                                     // 个人认证(黄V)
        return o === 1 ? "vgold" : o === 2 ? "vorange" : "vyellow";
      if (r > 0 && r < 8)                              // 机构认证(蓝V)：type 1..7
        return o === -1 ? "vgrey" : (r === 3 && o === 53) ? "vred" : "vblue";
    } else {                                            // —— 未认证 ——
      if (r === 220) return "club";                    // 俱乐部 / 超话主持人
      if (r === 10)  return "vgirl";                   // 红人(女) 等特殊徽章
    }
  }
  return "";                                            // 其余无图标（普通未认证）
}
```

**据此逐条对应本仓库实测组合：**

- 个人(黄V) `verified_type=0`：
  - `ext=1` → **金V**（`vgold`，本快照 62 人）
  - `ext=2` → **橙V**（`vorange`，本快照 73 人）
  - `ext=0/其它` → **黄V**（`vyellow`，本快照 145 人）
  - ⇒ **黄/橙/金 由 `verified_type_ext` 决定，不是 `verified_level`**。
- 机构(蓝V) `verified_type∈{1..7}`：
  - `ext=-1` → **灰V**（`vgrey`）
  - `type=3 且 ext=53` → **红V**（`vred`，媒体红V，本快照 41 人）
  - 其它 → **蓝V**（`vblue`，含 ext 0/50/51/52 等，本快照 80+195+118+59+36+32+17+9+8+7+6+2 等）
- 未认证 `verified=false`：
  - `type=220` → **club** 图标（本快照 37 人，此前误判为蓝V）
  - `type=10` → **vgirl** 图标（本快照 1 人，此前误判为蓝V）
  - `type=-1 / 200` 等 → 无图标（普通未认证，本快照 294 / 1 人）

> 注：源码用 `r>0 && r<8` 判定机构，故本快照出现的 `type=5`、`type=7` 仍属合法蓝V（并非"非标准"码），只是未细分到具体子类；细分靠 `verified_type_ext` 与 `verified_categories.json` 的码表。

### 黄V / 橙V / 金V 升降说明

个人认证三档（黄V→橙V→金V）由 `verified_type_ext` 表达；其升降仍由微博按近 30 天
阅读量/铁粉/互动等热度动态重算，不达标会降级。精细分层分析应直接看 B 类热度字段，
或在 `verified_categories.json` 中按实测校正档位映射（`verified_level` 字段在本前端
逻辑中**不参与**图标判定，建议以 `verified_type_ext` 为准）。

## 四、配置化（单一事实来源）

判断逻辑已改为读取 **`src/config/verified_categories.json`**（由
`src/weibo_tool/verified_config.py` 加载）：

- `verified_type` → 粗分类标签（personal / organization），供
  `blacklist_deep._verified_label` 使用（`verified=false` 且非 220/10 的不计；
  本快照未见达人 daren 子类，按前端 JS 不单独处理）。
- `verified_type_ext` → 细分类型码表（government / media / enterprise / ...）与
  个人黄/橙/金档位（0=黄、1=金、2=橙），未知码回落 `unknown`。
- `verified_level` → 旧版黄/橙/金档位命名（**已不被前端图标逻辑采用**，仅供参考）。
- `exclusions` → 官方/官媒排除名单（原 `account_categories.json` 内容已并入此处）。

`blacklist_deep`、`top_followed` 与 `profile_visit` 都从这一份读取，避免多处逻辑分叉；
`profile_visit` 还用 `is_organization()` 在发请求前跳过企业/官方/政府机构等蓝V账号
（见 `profile_visit.skip_organization`）。JSON 缺失或
解析失败时回退到 `verified_config.py` 中的内置默认值，工具仍可运行。修改认证类型 /
排除名单只需编辑该 JSON，无需改代码。
