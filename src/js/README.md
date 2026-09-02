# Weibo Login-related JS Resources (src/js)

> 中文文档 / Chinese version: [README.zh.md](README.zh.md)

This directory holds front-end JavaScript source that was captured from Weibo's login
chain and then **deobfuscated (beautified)**. These files are the authoritative reference
used to analyze the browser's real request behavior and to correct the login implementation
in `src/auth.py` (QR generation, polling, retcode handling, cross-domain cookie writing,
CSRF headers, etc.).

The directory layout mirrors exactly the **domain/subdomain + URL path** of the original
download, for easy cross-reference:

```
src/js/
├── a.sinaimg.cn/
│   └── mintra/pic/2406250331/48po.js                 # RUM performance/monitoring script
├── h5.sinaimg.cn/
│   └── m/login/assets/
│       ├── pages/login/login-ZbqmGudM.js             # ★ The real V2 popup login page logic
│       └── useRoute-Mc4PELCL.js                       # Build framework runtime (Vue/Vite support chunk)
├── i.sso.sina.com.cn/
│   └── js/qrcode_login_v2.js                          # V1 QR login logic (misleading filename)
└── passport.sinaimg.cn/
    └── js/
        ├── fp/1.3.2.umd.js                            # Device-fingerprint SDK (weibo.com, v1.3.2)
        ├── fp/1.2.1.umd.js                            # Device-fingerprint SDK (passport popup, v1.2.1)
        └── yidun/v1/yidunsdk.js                       # NetEase Yidun / Geetest captcha SDK
```

> Note: the captured files were mostly minified (single-line) code; they have been beautified
> with `js-beautify` (indent-size=2, no line wrapping) into readable multi-line code. Logic and
> variable names are preserved (formatting only, no semantic changes). `48po.js` was already
> readable and is kept as-is.

---

## 1. `h5.sinaimg.cn/m/login/assets/pages/login/login-ZbqmGudM.js` ★ Core file

**What it is**: the real page logic of the modern `weibo.com` login popup
(`passport.weibo.com/sso/signin?...&disp=popup`), built with Vue 3 + Vite. The hash
`ZbqmGudM` is a build artifact fingerprint. This is the **only** front-end code that actually
implements the `sso/v2/qrcode` family of endpoints.

**Key facts directly corresponding to `auth.py`** (verified verbatim from source):

- **QR generation**: `POST /sso/v2/qrcode/image`, body `{ entry, source, size: 180 }`,
  returns `data.qrid` and `data.image` (a base64 string).
  → corresponds to `auth.py`'s `qr_code_gen_v2()` (now POST + JSON body, tolerant of base64/URL).

- **Polling**: `POST /sso/v2/qrcode/check`, body:
  ```js
  { entry, source, url, qrid, disp: <disp from popup url>, rid, ver: "20250520" }
  ```
  - `rid`: from the device fingerprint `window.wbBotDetector.get().rid`; falls back to the
    literal `"norid"` when no fingerprint is available. → `auth.py` uses `rid: "norid"`.
  - `ver`: fixed build version `"20250520"` (source constant `ue`).
  - `disp`: taken from the popup URL's `disp` query param (i.e. `"popup"`).

- **Poll interval**: `setInterval(u, rr)` where `rr = 4e3` (**4000ms = 4 seconds**).
  → corresponds to `time.sleep(4)` in `auth.py`'s `login()`.

- **retcode branches** (consistent with the V1 file, confirming our terminating-branch design):
  - `50114002` → scanned (warning, keep polling)
  - `50114003` / `50114004` / `50114015` → error (**stop polling**)
  - `2e7` (= `20000000`) → success

- **Post-success redirect**: `k === 2e7 ? (... m.data.data.url && window.location.replace(m.data.data.url)) : ...`
  → uses `data.url` directly, **without parsing `alt`**. Exactly the approach we adopted (the
  idea you originally proposed).

- **CSRF header**: this popup sends **no** `X-Xsrf-Token` on any `sso/v2/qrcode/*` request (that
  header is only used for `weibo.com/ajax/*`, see `48po.js`). → `auth.py` removed the spurious
  CSRF header from the v2 check/image calls accordingly.

- The same file also contains a **password login** branch (`show_pw` / `show_sms`); the password
  is RSA-encrypted (`pwencode:"rsa"`) and also goes through `POST /sso/...` with `rid`/`ver`. This
  is irrelevant to the QR flow of this tool but illustrates the common origin of `rid`.

---

## 2. `h5.sinaimg.cn/m/login/assets/useRoute-Mc4PELCL.js`

**What it is**: the **framework runtime / shared chunk** of the Vite build (hash `Mc4PELCL`). It
contains no login business logic; instead it provides the Vue 3 reactivity system, component
runtime, `modulepreload` polyfill, routing (`useRoute`, etc.). `login-ZbqmGudM.js` imports symbols
from it (`d as Q` = `createApp`, `e as $t` = axios instance, and so on).

**Why it is kept**: it is required context for reading `login-ZbqmGudM.js` — especially the `$t`
axios instance and the Vue composition APIs referenced via `import { ... } from
"../../useRoute-Mc4PELCL.js"`. Searching it for `createWebHistory` / `Router` / reactivity helpers
confirms it is generic framework code, unrelated to the login protocol.

---

## 3. `i.sso.sina.com.cn/js/qrcode_login_v2.js` (note: actually V1 logic)

**What it is**: the legacy QR login script under `login.sina.com.cn`. **The "v2" in the filename
is misleading** — its internal implementation is the **V1 protocol** (`entry:"sso"`, `alt`-based
redirect).

**Key facts (verified in full)**:

- Polls `https://login.sina.com.cn/sso/qrcode/check` via JSONP (`scriptLoader`), not XHR.
- retcodes: `50114002` scanned / `50114003` timeout / `50114004` used / `50114015` exception /
  `20000000` success.
- Poll interval `f = 3000` (3 seconds, overridable by server `r.interval`).
- On success it assembles: `login.php?entry=...&returntype=CROSSDOMAIN_BY_LOCATION&alt=<alt>&url=<current page>`.
- `crossDomainUrlList`: writes cookies per-domain via `scriptLoader`/`jsonp` (cross-domain
  cookie-planting mechanism).
- Event channels: `qrcode_scanned / qrcode_used / qrcode_timeout / qrcode_exception / login_failure / login_success`.

**Relation to `auth.py`**: corresponds to the `check_qr_code_scan_v1()` fallback path — we implemented
`alt_from_data()` (parse `alt` from `data.url`) and the `login.php?...&alt=...` assembly based on this,
and the logic matches.

---

## 4. `a.sinaimg.cn/mintra/pic/2406250331/48po.js`

**What it is**: Weibo's **RUM (Real User Monitoring)** performance/monitoring script (hash `48po`,
date `240625` = 2024-06-25). It runs on the `weibo.com` main site and reports performance metrics
and telemetry.

**Login-relevant value**: it reveals the AJAX convention used on `weibo.com`:
```js
'X-Xsrf-Token': getCookie('XSRF-TOKEN')
```
i.e. the main-site `weibo.com/ajax/*` APIs use the `X-Xsrf-Token` header (value from the `XSRF-TOKEN`
cookie). → we used this to correct `auth.py`'s erroneous `x-csrf-token` to `X-Xsrf-Token`.
Note: this header is for main-site APIs; the passport popup's `sso/v2/qrcode/*` does not use it
(see section 1).

---

## 5. `passport.sinaimg.cn/js/fp/1.3.2.umd.js` and `fp/1.2.1.umd.js`

**What they are**: Weibo's **device-fingerprint SDK** (UMD format, `wbBotDetector`). The two versions
serve the same purpose at different versions:
- `1.3.2`: loaded by the `weibo.com` main site (from the `tmp/weibo.com` download).
- `1.2.1`: loaded by the `passport.weibo.com` login popup (from the `tmp/passport.weibo.com` download).

**Key facts**:

- Exposes `window.wbBotDetector.get({useCache})`, returning an object with a `rid` field.
- This `rid` is exactly the source of the `rid` param in QR/login requests (see section 1,
  `login-ZbqmGudM.js`).
- Fingerprint reporting endpoint: `bdUrl: "https://passport.weibo.com/sso/bd"` (RSA-OAEP + AES-CBC
  encrypted reporting of browser signals: `userAgent`, canvas/webgl, screen, fonts, timezone, etc.).
  → corresponds to `auth.py`'s visitor-ticket flow `WEIBO_URL_VISITOR_BD`.

**Significance for `auth.py`**: when the browser has a fingerprint, `rid` is the real value; without
one (headless/script) it falls back to `"norid"`. Our tool does not load this SDK, so we uniformly
send `rid="norid"`, matching the browser's "no fingerprint" branch.

---

## 6. `passport.sinaimg.cn/js/yidun/v1/yidunsdk.js`

**What it is**: the **NetEase Yidun (网易易盾)** captcha SDK, wrapped in `yidunsdk.min.js` (beautified,
`.min` dropped). It exposes `window.ydInit` internally calling `initNECaptchaWithFallback` (the
standard NetEase captcha interface) and supports Geetest (`geetestKey` / `captchaId`).

**Key facts**:

- Init: `window.ydInit({ geetestKey, captchaId, ... })` pops a slider/click captcha.
- Validation report: `https://security.weibo.com/captcha/yidun?key=<geetestKey>&validate=<token>&callback=...`,
  returning `retcode === 1e5` (100000) on success.
- In the password-login branch of `login-ZbqmGudM.js`, risk control triggers `ydInit` for a human
  verification.

**Significance for `auth.py`**: the captcha is a **risk-control component**, inserted only on
suspicious traffic (e.g. geo-anomalous, repeated failures). Silent renewal (`renew()`) and the QR
login main flow **do not depend** on it; this tool does not yet implement the captcha, but if hit by
risk control, this file is the reference for integrating `security.weibo.com/captcha/yidun`.

---

## How these files guided the `auth.py` changes

| Source fact | `auth.py` change |
|---|---|
| V2 uses `POST /sso/v2/qrcode/{image,check}` + JSON body | v2 gen/poll changed to `session.post(..., json=payload)` |
| V2 sends no `X-Xsrf-Token` | removed CSRF header from v2 check/image |
| `rid` defaults to `"norid"` | v2 check `rid: "norid"` (was wrong `callback_str()`) |
| `ver: "20250520"` | kept `ver: "20250520"` |
| `rr = 4e3` (4 seconds) | poll `time.sleep(4)` (was 2/3 seconds) |
| `data.url` direct redirect | `check_qr_code_scan_v2` returns `login_url = data.url` |
| retcode `50114003/04/15` terminate | added `RET_CODE_QR_TIMEOUT/USED/EXCEPTION` terminating branches |
| `X-Xsrf-Token` (main-site RUM) | CSRF header casing corrected to `X-Xsrf-Token` |

---

## Source & capture notes

- `tmp/weibo.com/`: downloaded from the `weibo.com` main site and its directly referenced
  resources. The main web bundle `index-vhVQ3q5j.js` only contains the popup-open + `postMessage`
  result channel and does **not** contain the `sso/v2` endpoint implementation.
- `tmp/passport.weibo.com/`: the **login popup** resources downloaded separately; `login-ZbqmGudM.js`
  is where the real V2 logic lives.
- The files in this directory are copied and beautified from those original downloads; analyzing
  them confirmed the protocol implementation details used in `auth.py`.
