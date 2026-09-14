# weibo-tools

一个用于研究微博（Weibo）**网页端**账号数据的 Python 工具集：支持扫码登录与静默续期、
黑名单 / 关注 / 粉丝快照、深度画像分析、受众排序，以及一份从微博前端 JS 中抓取的
接口清单。

> English version: [README.md](README.md)

## 免责声明

本项目是**个人研究工具**。它使用你自己的登录会话访问微博未公开的 web AJAX 接口。

- 仅可用于你本人拥有、或已明确授权分析的账号。
- `src/data/` 下的快照在本地生成，包含真实微博 UID 与个人资料信息，已被 git 忽略，
  **请勿提交**。
- Cookie 文件（`src/cookies*`）属于凭据，已被 git 忽略，**请勿提交**。
- 请控制请求频率：深度分析命令会翻页抓取大量列表，可能产生数千次请求。

## 环境要求

- Python 3.10+（开发环境为 Python 3.14）
- 依赖：`requests`、`qrcode` + `pillow`（扫码登录）、`colorama`（彩色日志），
  以及 `certifi` / `charset-normalizer` / `idna` / `urllib3`
- 一个可通过扫码登录的微博账号

## 安装

```bash
# 在项目根目录执行
python -m venv venvs/weibo-env

# Windows（PowerShell）
venvs/weibo-env\Scripts\Activate.ps1
# macOS / Linux
# source venvs/weibo-env/bin/activate

pip install -r requirements.txt
```

## 快速开始

所有命令都在 `src/` 目录下执行，因为 CLI 是相对该目录解析同级模块
（`auth.py`、`logutil.py` 等）的。

```bash
cd src

# 1）首次登录（会打印/保存二维码，用微博 App 扫码）
#    首次登录必须用 --user <标签>：--uid 只在已存在保存的会话
#    （src/cookies.<uid>.weibo）时可用。
python weibo-tool.py login --user <标签>

# 2）校验会话并输出黑名单统计
#    首次登录之后，就可以改用 --uid <uid> 了。
python weibo-tool.py blacklist --user <标签>
```

`python -m weibo_tool ...` 与 `python weibo-tool.py ...` 等价。

首次运行时会询问要使用的 UID；之后的运行会复用已保存的 cookie 并静默续期，
只有在长期有效的 SSO cookie 过期后才需要重新扫码。

## 命令一览

| 命令 | 作用 |
|---|---|
| `login` | 扫码登录或静默续期已有会话。`--fresh` 强制重新扫码。 |
| `blacklist` | 统计当前账号的黑名单（屏蔽类型组合）。`--json` 可导出统计与用户列表。 |
| `blacklist-deep` | 拉取每个被拉黑账号的完整资料并分析受众。需要一个**未创建**该黑名单的观看账号（`--viewer-uid`）。 |
| `blacklist-diag` | 诊断抓取失败的黑名单账号；`--retry-uid` 可打印指定 UID 的原始返回。 |
| `following-deep` | 对某用户**关注**的账号做深度资料与关注受众分析（作为 `blacklist-deep` 的对照组/基线）。 |
| `following-sync` | 把用户**关注**的全部账号快照到本地 JSON，每次运行保留带日期的备份与新增/移除差异。 |
| `fans-sync` | 把**关注该用户**的全部账号做同样快照处理。 |
| `top-followed` | 对某个受众内粉丝最多的账号排序（`--source blacklist` 为默认，也可用 `--source following`），可按官方/媒体类型排除。 |
| `profile-visit` | 通过 web 接口登记主页访问。可断点续跑，每个关系列表各自保存进度。 |
| `stranger-visit` | 访问**陌生人**（关系链之外的账号，如"关注的关注"）以扩大曝光。随机抽样、自动调速、可断点续跑。 |

执行 `python weibo-tool.py <命令> --help` 可查看该命令的完整参数。

### 全局身份参数

这些参数放在子命令名之前或之后都可以。

| 参数 | 含义 |
|---|---|
| `--uid <uid>` | 微博数字 UID；若已有保存的会话则直接复用。 |
| `--user <label>` | 便于记忆的登录标签，会解析到已保存的 UID 会话。 |
| `--no-prompt` | 不询问；使用唯一的/已有的身份或 `default`。 |

## 输出位置

| 路径 | 内容 |
|---|---|
| `src/data/blacklist_deep/` | 黑名单深度抓取的 JSON/CSV 与可读的 `*_summary.md` |
| `src/data/following_deep/` | 关注深度抓取的 JSON/CSV 与统计摘要 |
| `src/data/relations/` | `*-sync` 生成的关注 / 粉丝快照 |
| `src/data/exploration/` | 阅读量实验采集到的观测数据 |
| `src/.cache/fof/` | 共用的"关注的关注"爬取缓存（每个好友一个文件） |
| `src/.cache/` | 其他可续跑的爬取缓存（`profile_visit/`、`relations_sync/` 等） |
| `src/log/` | 运行日志（`weibo.log`）与自动化观测日志 |
| `doc/api_inventory.{json,md}` | 生成的接口清单 |

`src/data/`、`src/log/`（其 `README.md` 除外）、`src/.cache/`、`src/tmp/` 以及
cookie 文件均已被 git 忽略。

## 目录结构

```
config/                     已提交的配置模板（chat.ini.example 等）
doc/                        文档（见下方“文档”）
src/
├── weibo-tool.py           轻量的 CLI 入口（无额外依赖）
├── auth.py                 扫码登录、静默续期、cookie 管理
├── session.py              极简的共享会话辅助类
├── blacklist_analyzer.py   独立的黑名单分析脚本（早于 CLI 的版本）
├── chat.py                 群聊监听（Bayeux 长轮询）
├── api_explorer.py         抓取微博 JS 产物 -> doc/api_inventory.*
├── inventory_redact.py     对生成的接口目录做去标识化（PII -> <UID_n>/<NAME_n>）
├── static_fetch.py         镜像某个 CDN 域名的静态资源 -> static/
├── live_test.py            实测每个已编目接口 -> live_status
├── logutil.py              日志初始化
├── weibo_tool/             CLI 包
│   ├── cli.py              参数解析与身份选择
│   ├── http_engine.py      共享 HTTP 层（请求头、重试、限速）
│   ├── fof.py              好友的好友（关注的关注）爬取，profile-visit 与
│   │                       stranger-visit 共用 -> .cache/fof/
│   ├── verified_config.py  读取 src/config/verified_categories.json
│   └── commands/           每个子命令一个模块
├── automations/            定时运行脚本（如每日主页访问）
├── browser/               浏览器端脚本（在 DevTools 控制台里运行）
├── cert/                   web.im.weibo.com 所需的内置 CA 链
├── config/                 运行时配置：logging.ini + verified_categories.json
├── static/                镜像的微博 CDN 静态资源（见 src/static/README.md）
├── data/                   生成的分析产物（git 忽略）
├── log/                    运行日志（git 忽略，README.md 除外）
├── experiment/             临时实验脚本
├── test/                   登录/续期运行脚本与回归测试
└── tmp/                    运行时临时目录（扫码登录二维码图片；git 忽略）
```

注意：根目录 `config/` 放的是已提交的**模板**；代码运行时真正读取的配置在
`src/config/`。

## 配置

仓库只提交模板，实际文件需自行复制填写。

| 模板 | 实际文件（已 git 忽略） | 用途 |
|---|---|---|
| `config/chat.ini.example` | `config/chat.ini` | `chat.py` 用的 UID、群 GID 与可选代理 |
| `config/experiment.local.json.example` | `config/experiment.local.json` | 实验脚本与自动化 runner 用的 `author_uid` / `viewer_uid` 及代号 `author_label` / `viewer_label` |

`src/config/verified_categories.json` **是**提交的：它是认证类型标签、档位映射、
官方/官媒排除名单以及 `profile_visit.skip_organization` 策略的唯一事实来源，供
`blacklist-deep`、`top-followed`、`profile-visit` 与 `stranger-visit` 共同使用。
Python 里不再硬编码任何账号分类规则，改这个 JSON 无需改动代码。同目录下的
`logging.ini` 由 `logutil` 读取。

## 文档

| 文档 | 语言 | 说明 |
|---|---|---|
| [README.md](README.md) | English | 本文件的英文版（默认） |
| [README.zh-CN.md](README.zh-CN.md) | 简体中文 | 中文翻译 |
| [doc/cookie_review.md](doc/cookie_review.md) | English | 哪些接口会（重新）下发 `WBPSESS` / `SUB`，以及静默续期原理 |
| [doc/cookie_review.zh-CN.md](doc/cookie_review.zh-CN.md) | 简体中文 | 中文翻译 |
| [doc/verified_fields.md](doc/verified_fields.md) | English | `verified*` 及会员体系字段参考 |
| [doc/verified_fields.zh-CN.md](doc/verified_fields.zh-CN.md) | 简体中文 | 中文翻译 |
| [doc/api_inventory.md](doc/api_inventory.md) | English | **自动生成**的 277 个接口清单——见下方说明 |
| [src/static/README.md](src/static/README.md) | English | 抓取并还原后的登录 JS 导览 |
| [src/static/README.zh-CN.md](src/static/README.zh-CN.md) | 简体中文 | 中文翻译 |

> `doc/api_inventory.md` 与 `doc/api_inventory.json` 由 `src/api_explorer.py`
> **生成**（并由 `src/live_test.py` 重新渲染），请勿手工编辑。写入时由
> `src/inventory_redact.py` **默认去标识化**：uid 变为 `<UID_n>`、昵称变为
> `<NAME_n>`（同一 `n` 即同一账号）、简介/头像/真名变为 `<REDACTED>`——因为抓取
> 样本中含有真实第三方数据，请勿提交 `--no-redact` 的运行结果。由于每次运行都会
> 覆盖，因此不保留翻译副本；文件开头的 Conventions 小节解释了每一列的含义。

本仓库的文档约定：所有文档默认以英文撰写，并在同级目录提供 `.zh-CN` 语言后缀的
中文版本（例如 `README.md` / `README.zh-CN.md`）。

## 许可证

见 [LICENSE](LICENSE)。
