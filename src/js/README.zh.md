# 微博登录相关 JS 资源说明（src/js）

> English version: [README.md](README.md)

本目录存放从微博登录链路中抓取、并**逆向还原（美化）**后的前端 JavaScript 源码。
这些文件是分析 `weibo-tools` 登录逻辑（`src/auth.py`）的权威依据：我们对比浏览器真实
请求行为，修正了 `auth.py` 中的二维码生成、轮询、retcode 处理、跨域写 cookie、CSRF 头
等实现细节。

目录结构与你下载资源时微博的 **domain/subdomain + URL path** 完全一致，方便对照：

```
src/js/
├── a.sinaimg.cn/
│   └── mintra/pic/2406250331/48po.js                 # RUM 性能/监控脚本
├── h5.sinaimg.cn/
│   └── m/login/assets/
│       ├── pages/login/login-ZbqmGudM.js             # ★ 真正的 V2 弹窗登录页逻辑
│       └── useRoute-Mc4PELCL.js                       # 构建框架运行时（Vue/Vite 支持 chunk）
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

---

## 1. `h5.sinaimg.cn/m/login/assets/pages/login/login-ZbqmGudM.js` ★ 核心文件

**这是什么**：现代 `weibo.com` 登录弹窗（`passport.weibo.com/sso/signin?...&disp=popup`）
的真实页面逻辑，基于 Vue 3 + Vite 构建。文件名中的 hash `ZbqmGudM` 是构建产物指纹。
这是项目中**唯一**真正实现了 `sso/v2/qrcode` 系列接口的前端代码。

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
- 本目录文件由上述原始下载复制并美化而来；通过分析这些文件，确认了 `auth.py` 的协议实现细节。
