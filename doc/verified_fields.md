# 微博用户信息字段映射（verified 系列及相关字段）

> 记录微博用户对象中 `verified*` 认证字段，以及与之相关的身份/影响力字段的含义、
> 取值范围与本项目实测情况。字段事实依据来自 `config/verified_categories.json`
> 与本地关系快照（`data/relations/`）。

## 一、verified 系列字段映射表

| 字段 | 类型 | 含义 | 常见取值 / 范围 | 本仓库快照实测 | 备注 |
|---|---|---|---|---|---|
| `verified` | bool | 是否认证账号（黄V/蓝V/达人等）总开关 | true / false | 923/1256 = true | 其余 `verified_*` 仅在其为 true 时有意义 |
| `verified_type` | int | 认证大类 | 0=个人认证(黄V)；>0=机构认证(蓝V)：1政府/2企业/3媒体/4其他；<0=达人；-1 也常作未认证默认值 | -1,0,1,2,3,4,5,7,10,200,220 | 判达人须 `verified==true 且 verified_type<0` |
| `verified_type_ext` | int | 蓝V 细分类型码；个人认证下也出现 0/1/2 | 机构：50/51/52/53/0 等；个人：0/1/2；达人：-1 | org:50(×295),1(×63),2(×73),53(×41)… | 含义随微博版本变化，**需码表**；见 `verified_categories.json` |
| `verified_level` | int | 认证等级 = 黄V/橙V/金V 档位 | 0=无 / 1=黄V / 2=橙V / 3=金V（工作假设） | 已认证几乎全 3，仅 1 个 1 | 微博每~30天按热度（阅读量/铁粉/互动）动态重算 |
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
- `mbrank` / `mbtype` / `svip` / `vvip` / `basic_member`：SVIP/VVIP 会员等级。

**D. 账号属性旗标**
- `is_big`(大V)、`brand_account`(品牌号)、`class`、`star`、`interaction_user`。

## 三、黄V / 橙V / 金V 说明

微博个人认证分三档：黄V（基础个人认证）→ 橙V（近30天阅读≥30万且铁粉≥100 的
优质创作者）→ 金V（更高影响力的头部创作者）。**认证等级并非永久有效**：微博每约
30 天动态审核一次，不达标会自动降级（金→橙→黄）。

承载字段是 **`verified_level`**（1=黄V / 2=橙V / 3=金V / 0=无，属工作假设，
建议拿已知档位的账号用 `profile_visit` 接口核对）。本仓库 `following` 快照里已认证
账号的 `verified_level` 几乎全是 3（金V），可能因为关注列表本来就偏头部创作者/机构；
若要做精细分层分析，应直接观测 B 类热度字段，或在 `verified_categories.json` 中
按实测校正档位映射。

## 四、配置化（单一事实来源）

判断逻辑已改为读取 **`config/verified_categories.json`**（由
`src/weibo_tool/verified_config.py` 加载）：

- `verified_type` → 粗分类标签（personal / organization / daren），供
  `blacklist_deep._verified_label` 使用。
- `verified_type_ext` → 细分类型码表（government / media / enterprise / ...），
  未知码回落 `unknown`。
- `verified_level` → 黄/橙/金 档位命名。
- `exclusions` → 官方/官媒排除名单（原 `account_categories.json` 内容已并入此处）。

`blacklist_deep`、`top_followed` 与 `profile_visit` 都从这一份读取，避免多处逻辑分叉；
`profile_visit` 还用 `is_organization()` 在发请求前跳过企业/官方/政府机构等蓝V账号
（见 `profile_visit.skip_organization`）。JSON 缺失或
解析失败时回退到 `verified_config.py` 中的内置默认值，工具仍可运行。修改认证类型 /
排除名单只需编辑该 JSON，无需改代码。
