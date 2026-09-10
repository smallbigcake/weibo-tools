# 微博前端静态资源说明（src/static）

> English version (default): [README.md](README.md)

本目录存放从微博登录链路中抓取、并**逆向还原（美化）**后的前端 JavaScript 源码。
这些文件是分析 `weibo-tools` 登录逻辑（`src/auth.py`）的权威依据：我们对比浏览器真实
请求行为，修正了 `auth.py` 中的二维码生成、轮询、retcode 处理、跨域写 cookie、CSRF 头
等实现细节。

目录结构与你下载资源时微博的 **domain/subdomain + URL path** 完全一致，方便对照：

```
src/static/
├── a.sinaimg.cn/
│   └── mintra/pic/2406250331/48po.js                 # RUM 性能/监控脚本
├── h5.sinaimg.cn/                                    # 由 src/static_fetch.py 自动镜像，见文末
│   ├── _manifest.json                                # 每个资源的 url / sha1 / 大小 / etag / 更新时间
│   ├── _urls.txt                                     # 原始 URL 清单，每行一条
│   ├── favicon.ico
│   ├── m/login/                                      # ★ V2 登录 SPA（Vue 3 + Vite）
│   │   ├── index.html                                # CDN 直接提供的应用外壳
│   │   └── assets/
│   │       ├── index-qbEBDs52.js                     # ★ 当前构建 —— module 入口
│   │       ├── index-L048FNfo.css
│   │       ├── index-legacy-qIW06_yt.js              # legacy（nomodule）版本
│   │       ├── polyfills-legacy-a6DDm_QJ.js
│   │       ├── phone-Y7lal6Xm.png
│   │       ├── useRoute-Mc4PELCL.js                  # 框架 / 共享 chunk
│   │       ├── useRoute-Lc2vcnMQ.css
│   │       ├── useRoute-legacy-whaJrky6.js
│   │       └── pages/login/
│   │           ├── login-ZbqmGudM.js                 # ★ passport 外壳加载的路由 chunk
│   │           ├── login-legacy-MItL3eV6.js
│   │           └── polyfills-legacy-H7cWsSyN.js
│   ├── m/weibo-pro-next/                             # 当前「专业版」创作者应用（Vue 3，2026-09）
│   ├── m/weibo-pro/                                  # 上一代「专业版」应用（webpack 构建）
│   ├── m/weibo-lite/                                 # 旧版 H5 客户端（2017 年代，仍在更新）
│   ├── m/setting/
│   ├── m/reward-pc-kits/                             # 打赏 SDK 嵌入件：只有 sdk.js + style.css
│   ├── m/emoticon/icon/                              # 308 个表情 PNG（非前端源码）
│   ├── marvel/v1.4.0/                                # 公共 CSS/JS 库
│   └── upload/...                                    # 编辑上传资源，按日期分层
├── i.sso.sina.com.cn/
│   └── js/qrcode_login_v2.js                          # V1 版扫码登录逻辑（文件名误导）
└── passport.sinaimg.cn/
    └── js/
        ├── fp/1.3.2.umd.js                            # 设备指纹 SDK（weibo.com 用，v1.3.2）
        ├── fp/1.2.1.umd.js                            # 设备指纹 SDK（passport 弹窗用，v1.2.1）
        └── yidun/v1/yidunsdk.js                       # 网易易盾/极验 验证码 SDK
```

> 说明：原始抓取的文件多为压缩混淆（单行）代码，已用 `js-beautify`（indent-size=2，
> 不折行）美化为可读的多行代码，逻辑与变量名保持原样（仅格式化，未做语义改写）。
> `48po.js` 原本即为可读代码，直接原样保留。
>
> `h5.sinaimg.cn` 这棵树由 `src/static_fetch.py` 生成（见文末「刷新镜像」），抓取与美化一步
> 完成；另外三个域名是早先从浏览器手工抓取的。

---

## 1. `h5.sinaimg.cn/m/login/assets/pages/login/login-ZbqmGudM.js` ★ 核心文件

**这是什么**：现代 `weibo.com` 登录弹窗（`passport.weibo.com/sso/signin?...&disp=popup`）
的真实页面逻辑，基于 Vue 3 + Vite 构建。文件名中的 hash `ZbqmGudM` 是构建产物指纹。
这是项目中**唯一**真正实现了 `sso/v2/qrcode` 系列接口的前端代码。

**两个入口，同一套实现。** 登录应用有两个 HTML 外壳可达，各自加载同一个 Vite 应用的不同
chunk：

| 外壳 | 入口 chunk |
|---|---|
| `passport.weibo.com/sso/signin?...&disp=popup` | `assets/pages/login/login-ZbqmGudM.js` |
| `h5.sinaimg.cn/m/login/index.html` | `assets/index-qbEBDs52.js` |

两个 chunk 里的扫码登录常量完全一致 —— `sso/v2/qrcode/image`、`sso/v2/qrcode/check`、
`ver: "20250520"` 以及 retcode `50114002/03/04/15` —— 因此下面的事实对两个构建都成立，
`auth.py` 无需改动。（2026-09-06 重新镜像时复核：除末尾多了一个换行外，
`login-ZbqmGudM.js` 与 `useRoute-Mc4PELCL.js` 与仓库里原有的副本**逐字节相同**。）

**与 `auth.py` 直接对应的关键事实**（已从源码逐字确认）：

- **二维码生成**：`POST /sso/v2/qrcode/image`，请求体 `{ entry, source, size: 180 }`，
  返回 `data.qrid` 与 `data.image`（base64 字符串）。
  → 对应 `auth.py` 的 `qr_code_gen_v2()`（已改为 POST + JSON body，并兼容 base64/URL）。

- **轮询扫码**：`POST /sso/v2/qrcode/check`，请求体：
  ```js
  { entry, source, url, qrid, disp: <popup url 里的 disp>, rid, ver: "20250520" }
  ```
  - `rid`：来自设备指纹 `window.wbBotDetector.get().rid`；无指纹时回退为字面量 `"norid"`。
    → 对应 `auth.py` 中 `rid: "norid"`。
  - `ver`：固定构建版本号 `"20250520"`（源码常量 `ue`）。
  - `disp`：来自弹窗 URL 的 `disp` 查询参数（即 `"popup"`）。

- **轮询间隔**：`setInterval(u, rr)`，其中 `rr = 4e3`（**4000ms = 4 秒**）。
  → 对应 `auth.py` `login()` 中 `time.sleep(4)`。

- **retcode 分支**（与 V1 文件一致，确认了我们的终止分支设计）：
  - `50114002` → 已扫描（warning，继续轮询）
  - `50114003` / `50114004` / `50114015` → error（**终止轮询**）
  - `2e7`（= `20000000`）→ 成功

- **确认后跳转**：`k === 2e7 ? (... m.data.data.url && window.location.replace(m.data.data.url)) : ...`
  → 直接使用 `data.url` 跳转，**不解析 `alt`**。这正是我们采用的方案（你最初提出的思路）。

- **CSRF 头**：该弹窗对 `sso/v2/qrcode/*` 的所有请求**不携带** `X-Xsrf-Token`（该头只用于
  `weibo.com/ajax/*`，见 `48po.js`）。→ `auth.py` 已据此移除 v2 check/image 上的多余 CSRF 头。

- 同一文件还包含**密码登录**分支（`show_pw` / `show_sms`），密码用 RSA 加密（`pwencode:"rsa"`），
  同样走 `POST /sso/...` 并带 `rid`/`ver`；这部分对本工具的扫码登录无关，但说明了 `rid` 的通用来源。

---

## 2. `h5.sinaimg.cn/m/login/assets/useRoute-Mc4PELCL.js`

**这是什么**：Vite 构建产物的**框架运行时/公共 chunk**（文件名 hash `Mc4PELCL`）。它不包含
具体登录业务，而是提供 Vue 3 的响应式系统、组件运行时、`modulepreload` polyfill、路由
（`useRoute` 等）等基础设施。`login-ZbqmGudM.js` 通过 `import` 引用它提供的符号
（`d as Q` = `createApp`，`e as $t` = axios 实例，等等）。

**为何保留**：它是阅读 `login-ZbqmGudM.js` 时理解其依赖（尤其是其中 `import { ... } from
"../../useRoute-Mc4PELCL.js"` 的 `$t` axios 实例、Vue 组合式 API）所必需的上下文。
搜索其中 `createWebHistory` / `Router` / 响应式函数可确认其为通用框架代码，与登录协议无关。

---

## 3. `i.sso.sina.com.cn/js/qrcode_login_v2.js`（注意：实为 V1 逻辑）

**这是什么**：`login.sina.com.cn` 域下的旧版扫码登录脚本。**文件名带 "v2" 具有误导性**，
其内部实现是 `login.sina.com.cn/sso/qrcode/*` 的 **V1 协议**（`entry:"sso"`，基于 `alt` 跳转）。

**关键事实（已全文确认）**：

- 轮询 `https://login.sina.com.cn/sso/qrcode/check`，通过 JSONP（`scriptLoader`）而非 XHR。
- retcode：`50114002` 已扫 / `50114003` 超时 / `50114004` 已用 / `50114015` 异常 / `20000000` 成功。
- 轮询间隔 `f = 3000`（3 秒，且可被服务端 `r.interval` 覆盖）。
- 确认后组装：`login.php?entry=...&returntype=CROSSDOMAIN_BY_LOCATION&alt=<alt>&url=<当前页>`。
- `crossDomainUrlList`：对每个域名用 `scriptLoader`/`jsonp` 写入 cookie（跨域种 cookie 机制）。
- 事件通道：`qrcode_scanned / qrcode_used / qrcode_timeout / qrcode_exception / login_failure / login_success`。

**与 `auth.py` 的关系**：对应 `auth.py` 的 `check_qr_code_scan_v1()` 回退路径——我们据此实现了
`alt_from_data()`（从 `data.url` 解析 `alt`）与 `login.php?...&alt=...` 的拼装，逻辑一致。

---

## 4. `a.sinaimg.cn/mintra/pic/2406250331/48po.js`

**这是什么**：微博的 **RUM（Real User Monitoring）性能/监控脚本**（文件名 hash `48po`，
日期 `240625` = 2024-06-25）。它在 `weibo.com` 主站运行，负责上报性能指标与埋点。

**与登录相关的价值**：它揭示了 `weibo.com` 站内的 AJAX 请求约定——
```js
'X-Xsrf-Token': getCookie('XSRF-TOKEN')
```
即主站 `weibo.com/ajax/*` 类接口用 `X-Xsrf-Token` 头（值取自 `XSRF-TOKEN` cookie）。
→ 我们据此将 `auth.py` 中错误的 `x-csrf-token` 修正为 `X-Xsrf-Token`。
注意：该头用于主站接口，而 passport 弹窗的 `sso/v2/qrcode/*` 并不使用它（见第 1 节）。

---

## 5. `passport.sinaimg.cn/js/fp/1.3.2.umd.js` 与 `fp/1.2.1.umd.js`

**这是什么**：微博的**设备指纹 SDK**（UMD 格式，`wbBotDetector`）。两版实现相同目的、不同版本：
- `1.3.2`：被 `weibo.com` 主站加载（对应 `tmp/weibo.com` 下载）。
- `1.2.1`：被 `passport.weibo.com` 登录弹窗加载（对应 `tmp/passport.weibo.com` 下载）。

**关键事实**：

- 暴露 `window.wbBotDetector.get({useCache})`，返回对象含 `rid` 字段。
- 这个 `rid` 正是扫码/登录请求里 `rid` 参数的来源（见第 1 节 `login-ZbqmGudM.js`）。
- 指纹上报地址：`bdUrl: "https://passport.weibo.com/sso/bd"`（RSA-OAEP + AES-CBC 加密上报浏览器
  信号：`userAgent`、canvas/webgl、屏幕、字体、时区等）。
  → 对应 `auth.py` 的访客票据流程 `WEIBO_URL_VISITOR_BD`。

**对 `auth.py` 的意义**：浏览器有指纹时 `rid` 为真实值，无指纹（如无头/脚本）时回退 `"norid"`。
我们的工具不加载该 SDK，故统一发送 `rid="norid"`，与浏览器"无指纹"分支行为一致。

---

## 6. `passport.sinaimg.cn/js/yidun/v1/yidunsdk.js`

**这是什么**：**网易易盾（NetEase Yidun）验证码 SDK**，封装在 `yidunsdk.min.js`（已美化去 `.min`）。
对外暴露 `window.ydInit`，内部调用 `initNECaptchaWithFallback`（网易验证码标准接口），并支持
极验（`geetestKey` / `captchaId`）。

**关键事实**：

- 初始化：`window.ydInit({ geetestKey, captchaId, ... })`，弹出滑块/点选验证码。
- 校验上报：`https://security.weibo.com/captcha/yidun?key=<geetestKey>&validate=<token>&callback=...`
  返回 `retcode === 1e5`（100000）表示通过。
- 在 `login-ZbqmGudM.js` 的密码登录分支中，风控触发时会调用 `ydInit` 进行人机校验。

**对 `auth.py` 的意义**：验证码是**风控组件**，仅在可疑流量（如异地、频繁失败）时插入。
正常持 cookie 的静默续期（`renew()`）与扫码登录主流程**不依赖**它；本工具当前未实现验证码，
如遇风控可参考此文件对接 `security.weibo.com/captcha/yidun`。

---

## 这些文件如何指导了 `auth.py` 的修改

| 源码事实 | `auth.py` 改动 |
|---|---|
| V2 用 `POST /sso/v2/qrcode/{image,check}` + JSON body | v2 生成/轮询改 `session.post(..., json=payload)` |
| V2 不送 `X-Xsrf-Token` | 移除 v2 check/image 上的 CSRF 头 |
| `rid` 默认 `"norid"` | v2 check `rid: "norid"`（原 `callback_str()` 为错误值） |
| `ver: "20250520"` | 保留 `ver: "20250520"` |
| `rr = 4e3`（4 秒） | 轮询 `time.sleep(4)`（原 2/3 秒） |
| `data.url` 直接跳转 | `check_qr_code_scan_v2` 返回 `login_url = data.url` |
| retcode `50114003/04/15` 终止 | 新增 `RET_CODE_QR_TIMEOUT/USED/EXCEPTION` 终止分支 |
| `X-Xsrf-Token`（主站 RUM） | CSRF 头大小写修正为 `X-Xsrf-Token` |

---

## 来源与抓取说明

- `tmp/weibo.com/`：从 `weibo.com` 主站及其直接引用资源下载（主 web bundle `index-vhVQ3q5j.js`
  仅含弹窗打开 + `postMessage` 结果通道，**不含** `sso/v2` 端点实现）。
- `tmp/passport.weibo.com/`：单独下载的**登录弹窗**资源，`login-ZbqmGudM.js` 即真实 V2 逻辑所在。
- 本目录其余文件由上述原始下载复制并美化而来；通过分析这些文件，确认了 `auth.py` 的协议实现细节。

---

## 刷新镜像

`h5.sinaimg.cn` 是一个对象存储 bucket，**目录列表已关闭**（`GET /` 返回
`405 - list file is not allowed for anonymouse`），所以无法枚举其中的内容。它也不只托管
登录应用：抓取还会触达 `m/weibo-lite/`、`m/setting/`、`marvel/v1.4.0/` 与 `upload/`。

`src/static_fetch.py` 改为用**爬取**的方式做镜像：

```bash
# 在项目根目录，激活 venv 后执行 —— 完整运行（三条发现通道全开）
venvs/weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn `
    --force --beautify --discover-roots --discover-sw

# 只做发现、不落盘
venvs/weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn --dry-run

# 只重新美化磁盘上已有的文件（不联网）
venvs/weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn --beautify-only
```

由于目录列表被禁用，工具组合了**三条**发现通道：

1. **爬取** —— 抓取种子 HTML 页面（CDN 应用外壳 + 微博登录外壳），抽取所有指向目标域名的
   URL（动态 `import()` chunk、`url()` 资源、`sourceMappingURL`、**未加引号的 HTML 属性**等），
   保存到 `src/static/<domain>/<url path>`，再重新扫描已保存的 JS/CSS 并重复，直到队列耗尽或
   达到安全上限（`--max-depth`、`--max-files`、`--max-bytes`）。其它域名的种子只用于发现
   引用，**不会**写入镜像。
2. **根目录爆破**（`--discover-roots`）—— 对 `<prefix>/<词>/` 逐个探测一组入口文件名。
   并非每个应用都有 `index.html`：`m/reward-pc-kits/` 只有 `sdk.js` 和 `style.css`，只探
   index 会整个漏掉。`m/weibo-pro/` 就是这样发现的。
3. **Service Worker 预缓存**（`--discover-sw`）—— 对每个已知应用根探测 `sw.js` /
   `service-worker.js`。Workbox 的 `manifest.<hash>.js` 预缓存清单会**一次性列出**某个应用
   的全部带 hash 资源；仅 `m/weibo-lite` 一个应用就因此多出 64 个爬取永远看不到的资源。

随后 `--beautify` 重新格式化 JS/CSS，并依据**磁盘上的实际文件**生成 `_manifest.json`，
使记录的大小与 SHA-1 对应美化后的结果，而不是原始下载内容。

常用参数：`--seed URL`（可重复，替换内置种子列表）、`--root-words`（`--discover-roots` 用的
词表）、`--ext`（扩展名白名单 —— 传 `--ext js,mjs,css,json,map,html` 可跳过 308 个表情 PNG）、
`--force`（重新下载已存在的文件）、`--dry-run` 与 `--beautify-only`。

### 仓库里提交哪些文件

只有**文本**资源进 Git：JS、CSS、SVG、HTML、JSON，外加 `_manifest.json` 与 `_urls.txt`。
二进制内容 —— 表情、字体、图标，共 407 个文件 / 3.5 MB —— 已被 **git 忽略**，它们没有分析
价值，而且 `_urls.txt` 随时能重新拉回来。`.gitattributes` 里仍保留 Git LFS 配置作为兜底：
万一以后真有二进制被提交，也会自动走 LFS 而不是撑大对象库。

### 以后如何更新/重新获取

每次运行都会记录每个资源的原始 URL，因此再次更新时**不依赖**爬取仍能找到它：

- **`_urls.txt`** —— 原始 URL 清单，每行一条，按本地路径排序。可直接喂给 curl/wget/xargs，
  或把两次运行结果 diff 一下，看新增/消失了哪些资源。
- **`_manifest.json`** —— 每个资源一条记录：`url`、`file`、`bytes`、`sha1`、
  `content_type`、`etag`、`last_modified`、`depth`。
- **`--from-manifest`** —— 只按清单重新获取（不做发现）。请求带条件头
  （`If-None-Match` / `If-Modified-Since`），未变化的资源返回 `304` 且不被重写：

  ```bash
  venvs/weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn `
      --from-manifest --beautify
  ```

重新获取时拿不到的已记录 URL 会被**保留**在清单里而不是丢弃，因此记录不会意外缩水。

### 全新 clone 后如何恢复

`_manifest.json` 和 `_urls.txt` 会提交，但镜像资源本身 —— 尤其是被 git 忽略的二进制 ——
不会。所以一次 clone 之后是「有记录、没文件」，用一条命令即可完整重建：

```bash
python src/static_fetch.py --domain h5.sinaimg.cn --from-manifest --beautify
```

只有当文件**确实存在于磁盘**时才会发条件请求，因此全新 clone 会真正下载（含二进制），
而不会因为本地没有文件却收到 `304` 导致什么都恢复不了。若环境没有 Node/npx，去掉
`--beautify` 即可，差别只在格式化。

**覆盖仍然不是穷尽的** —— 它受限于种子、词表和恰好存在的 sourcemap。当前运行：
**632 个资源 / 原始 23.8 MB（美化后 33 MB）**，其中 308 个是 `m/weibo-lite` 表情表引入的
表情 PNG。
