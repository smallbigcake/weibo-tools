# Weibo Front-end Static Assets (src/static)

> 中文文档 / Chinese version: [README.zh-CN.md](README.zh-CN.md)

This directory holds front-end JavaScript source that was captured from Weibo's login
chain and then **deobfuscated (beautified)**. These files are the authoritative reference
used to analyze the browser's real request behavior and to correct the login implementation
in `src/auth.py` (QR generation, polling, retcode handling, cross-domain cookie writing,
CSRF headers, etc.).

The directory layout mirrors exactly the **domain/subdomain + URL path** of the original
download, for easy cross-reference:

```
src/static/
├── a.sinaimg.cn/
│   └── mintra/pic/2406250331/48po.js                 # RUM performance/monitoring script
├── h5.sinaimg.cn/                                    # auto-mirrored, see "Refreshing the mirror"
│   ├── _manifest.json                                # url / sha1 / size / etag / last-modified per asset
│   ├── _urls.txt                                     # the original URLs, one per line
│   ├── favicon.ico
│   ├── m/login/                                      # ★ the V2 login SPA (Vue 3 + Vite)
│   │   ├── index.html                                # app shell served straight from the CDN
│   │   └── assets/
│   │       ├── index-qbEBDs52.js                     # ★ current build — module entry
│   │       ├── index-L048FNfo.css
│   │       ├── index-legacy-qIW06_yt.js              # legacy (nomodule) counterpart
│   │       ├── polyfills-legacy-a6DDm_QJ.js
│   │       ├── phone-Y7lal6Xm.png
│   │       ├── useRoute-Mc4PELCL.js                  # framework / shared chunk
│   │       ├── useRoute-Lc2vcnMQ.css
│   │       ├── useRoute-legacy-whaJrky6.js
│   │       └── pages/login/
│   │           ├── login-ZbqmGudM.js                 # ★ route chunk the passport shell loads
│   │           ├── login-legacy-MItL3eV6.js
│   │           └── polyfills-legacy-H7cWsSyN.js
│   ├── m/weibo-pro-next/                             # current "pro" creator app (Vue 3, 2026-09)
│   ├── m/weibo-pro/                                  # previous "pro" app (webpack build)
│   ├── m/weibo-lite/                                 # legacy H5 client (2017-era, still updated)
│   ├── m/setting/
│   ├── m/reward-pc-kits/                             # reward SDK embed: sdk.js + style.css only
│   ├── m/emoticon/icon/                              # 308 emoticon PNGs (not front-end source)
│   ├── marvel/v1.4.0/                                # shared CSS/JS library
│   └── upload/...                                    # editor-uploaded assets, laid out by date
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
>
> The `h5.sinaimg.cn` tree is produced by `src/static_fetch.py` (see "Refreshing the mirror" at the
> end), which fetches and beautifies in one step; the other three domains were captured by hand
> from the browser.

---

## 1. `h5.sinaimg.cn/m/login/assets/pages/login/login-ZbqmGudM.js` ★ Core file

**What it is**: the real page logic of the modern `weibo.com` login popup
(`passport.weibo.com/sso/signin?...&disp=popup`), built with Vue 3 + Vite. The hash
`ZbqmGudM` is a build artifact fingerprint. This is the **only** front-end code that actually
implements the `sso/v2/qrcode` family of endpoints.

**Two entry points, one implementation.** The login app is reachable through two HTML shells,
and each loads a different Vite chunk of the same app:

| Shell | Entry chunk |
|---|---|
| `passport.weibo.com/sso/signin?...&disp=popup` | `assets/pages/login/login-ZbqmGudM.js` |
| `h5.sinaimg.cn/m/login/index.html` | `assets/index-qbEBDs52.js` |

Both chunks still carry byte-identical QR-login constants — `sso/v2/qrcode/image`,
`sso/v2/qrcode/check`, `ver: "20250520"` and retcodes `50114002/03/04/15` — so the facts below
hold for either build and `auth.py` needs no change. (Re-verified on the 2026-09-06 mirror:
`login-ZbqmGudM.js` and `useRoute-Mc4PELCL.js` are still byte-identical to the copies already
in this repository, apart from a trailing newline.)

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
- The other files in this directory are copied and beautified from those original downloads;
  analyzing them confirmed the protocol implementation details used in `auth.py`.

---

## Refreshing the mirror

`h5.sinaimg.cn` is an object-store bucket with **directory listing disabled** (`GET /` returns
`405 - list file is not allowed for anonymouse`), so its contents cannot be enumerated. It also
hosts more than the login app: the crawl also reaches `m/weibo-lite/`, `m/setting/`,
`marvel/v1.4.0/` and `upload/`.

`src/static_fetch.py` mirrors it by crawling instead:

```bash
# from the project root, with the venv active — full run (all three discovery channels)
weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn \
    --force --beautify --discover-roots --discover-sw

# discover only, write nothing
weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn --dry-run

# re-beautify what is already on disk (no network)
weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn --beautify-only
```

Because listing is disabled, the tool combines **three** discovery channels:

1. **Crawl** — fetch the seed HTML pages (CDN app shells plus the Weibo login shells), extract
   every URL pointing at the target domain (dynamic `import()` chunks, `url()` assets,
   `sourceMappingURL`, unquoted HTML attributes, ...), save it to
   `src/static/<domain>/<url path>`, then re-scan the saved JS/CSS and repeat until the queue is
   drained or a safety limit (`--max-depth`, `--max-files`, `--max-bytes`) is hit. Seeds on
   other hosts are crawled for references but never written into the mirror.
2. **Root brute-force** (`--discover-roots`) — probe `<prefix>/<word>/` against a set of entry
   filenames. Not every app ships an `index.html`: `m/reward-pc-kits/` only has `sdk.js` and
   `style.css`, so an index-only probe misses it entirely. This is how `m/weibo-pro/` was found.
3. **Service-worker precache** (`--discover-sw`) — probe `sw.js` / `service-worker.js` at every
   known app root. A Workbox `manifest.<hash>.js` precache list enumerates *all* hashed assets
   of an app in one file; for `m/weibo-lite` alone that added 64 assets the crawl never sees.

Then `--beautify` reformats the JS/CSS, and `_manifest.json` is written from the files on disk,
so the recorded size and SHA-1 describe the beautified output rather than the raw download.

Useful flags: `--seed URL` (repeatable, replaces the built-in seed list), `--root-words` (word
list for `--discover-roots`), `--ext` (extension allow-list — pass
`--ext js,mjs,css,json,map,html` to skip the 308 emoticon PNGs), `--force` (re-download files
that already exist), `--dry-run` and `--beautify-only`.

### What is committed

Only **text** assets live in Git: JS, CSS, SVG, HTML, JSON, plus `_manifest.json` and
`_urls.txt`. The binary payload — emoticons, fonts and icons, 407 files / 3.5 MB — is
**git-ignored**, because it carries no analytical value and `_urls.txt` can always restore it.
`.gitattributes` keeps Git LFS wired up as a safety net in case a binary is ever committed.

### Re-fetching later

Every run records the original URL of every asset, so an update never depends on the crawl
still finding it:

- **`_urls.txt`** — the original URLs, one per line, sorted by local path. Feed it to
  curl/wget/xargs, or diff two runs to see what appeared or disappeared.
- **`_manifest.json`** — one record per asset: `url`, `file`, `bytes`, `sha1`,
  `content_type`, `etag`, `last_modified`, `depth`.
- **`--from-manifest`** — re-fetch exactly the recorded set, no discovery. Requests are
  conditional (`If-None-Match` / `If-Modified-Since`), so unchanged assets return `304` and
  are left untouched:

  ```bash
  weibo-env\Scripts\python.exe src/static_fetch.py --domain h5.sinaimg.cn \
      --from-manifest --beautify
  ```

Recorded URLs that a re-fetch cannot reach are kept in the manifest instead of being dropped,
so the record can never shrink by accident.

### Restoring a fresh clone

`_manifest.json` and `_urls.txt` are committed, but the mirrored assets — and especially the
git-ignored binaries — are not. A clone therefore starts with the record but without the
files, and one command rebuilds the whole tree:

```bash
python src/static_fetch.py --domain h5.sinaimg.cn --from-manifest --beautify
```

Conditional requests are only sent when the file is actually present on disk, so a clone gets
real downloads (including the binaries) rather than `304`s for files it does not have. Drop
`--beautify` if Node/npx is unavailable; the only difference is formatting.

**Coverage is still not exhaustive** — it is bounded by the seeds, the word list and the
sourcemaps that happen to exist. Current run: **632 assets / 23.8 MB raw (33 MB beautified)**,
of which 308 are emoticon PNGs pulled in by the `m/weibo-lite` emotion table.
