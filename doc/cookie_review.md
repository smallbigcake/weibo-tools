# Cookie / Login-State Review Notes

Investigation of which Weibo APIs (re)issue the session cookies `WBPSESS` and
`SUB`, by actively expiring/deleting each and probing candidate endpoints while
diffing the session cookie jar before/after every call.

Tool used: `tmp/review_probe.py` (`python tmp/review_probe.py task1|task2|both`).
It snapshots `(name, domain) -> (value-hash, expires)` before and after each
request and prints ADDED / REMOVED / CHANGED cookies.

---

## Cookie roles (from `src/cookies.weibo`)

| Cookie | Domain(s) | Typical expiry | Role |
|---|---|---|---|
| `SUB` | `.weibo.com`, `.sina.com.cn`, `.weibo.cn` | ~1 yr | **Primary login credential** (the session ticket) |
| `SUBP` | same | ~1 yr | SUB companion (profile/region) |
| `SCF` | `.weibo.com`, `.sina.com.cn`, `.weibo.cn` | ~10 yr | Encrypted TGT; long-lived re-auth credential |
| `ALF` | same | ~30 days | Login validity timestamp (`02_<unix>`); gates the session |
| `ALC` | `.passport.weibo.com`, `.login.sina.com.cn` | ~30 days | Cross-domain login chain token |
| `WBPSESS` | `weibo.com` | ~1 day | App/session fingerprint for weibo.com front-end |
| `XSRF-TOKEN` / `X-CSRF-TOKEN` | `weibo.com` / `.passport.weibo.com` | session | CSRF token (from RUM, `48po.js`) |
| `SVB` / `SRT` / `SRF` | `.passport.weibo.com` | long | Passport session tokens |

Login gate (per `test_login` / `get_config`): `SUB` present **and** `ALF` not
expired. `WBPSESS` is **not** part of the login gate.

---

## Task 1 — Expire `WBPSESS` (deleted from session), find re-issuer

Baseline: `WBPSESS @ weibo.com` present, expires `1786119101`.

| API called | Result | WBPSESS after |
|---|---|---|
| `GET /ajax/config/get_config` (200) | **+ ADDED `WBPSESS @ weibo.com`** (fresh, expires ~now+1d) | ✅ present |
| `GET weibo.com/` (200) | `~ CHANGED WBPSESS` (value rotated, same expiry) | ✅ present |
| `GET /sso/v2/web/config` (200) | no cookie changes | ✅ present |
| `renew()` → `login.php?useticket=1` (302) | re-issued SUB/ALF/SCF/ALC/SVB across domains; **did NOT touch WBPSESS** | ✅ present |

**Conclusion: `WBPSESS` is (re)issued by `/ajax/config/get_config`** — the same
endpoint used by `test_login()`. The home page only refreshes it. `renew()` and
`web/config` do not affect it.

> Implication: every call to `test_login()` silently refreshes `WBPSESS`. A tool
> that polls `get_config` to check login state is also keeping `WBPSESS` alive,
> so `WBPSESS` expiry is practically a non-issue as long as we poll.

---

## Task 2 — Delete `SUB`, find re-issuer (two scenarios)

### Scenario A: delete `SUB` on ALL domains (over-aggressive)

Baseline: `SUB` present.

| API called | Result | SUB after | get_config `ok` |
|---|---|---|---|
| `GET /ajax/config/get_config` (200) | no cookie changes | ❌ absent | `-100` (logged out) |
| `renew()` → `login.php?useticket=1` (200, **not 302**) | no cookie changes | ❌ absent | `-100` |
| `GET weibo.com/` (200) | no cookie changes | ❌ absent | `-100` |

→ `renew()` could not mint a ticket (no session left to validate).

### Scenario B: delete ONLY `.weibo.com` SUB (matches real browser case)

Keep `SCF` + `.sina.com.cn` SUB + `.weibo.cn` SUB + `ALF` intact.

**Step 1 — `GET weibo.com/` (exactly as the browser does it):**
```
302  x-login-autologin: true
Location: https://login.sina.com.cn/sso/login.php?url=...&gateway=1&service=miniblog
          &entry=miniblog&useticket=1&returntype=META&sudaref=&_client_version=0.6.33
```
The server signals auto-login availability with the response header
**`x-login-autologin: true`**.

**Step 2 — follow the Location to `login.php?useticket=1`** (replicating the
browser precisely, WITHOUT any prior `get_config` call):

> ⚠️ **CORRECTED 2026-08-07 (see Task 2C).** The earlier observation below was
> made against a *stale* saved session whose SSO TGT had already been invalidated
> by prior testing. Against a *freshly logged-in* session the same flow returns
> 302 (success) and fully recovers `.weibo.com` SUB. The 6102 was a stale-TGT
> artifact, NOT a fundamental limitation. Keep the stale-session note for
> reference but treat Task 2C as authoritative.

*Stale-session observation (SUPERSEDED):*
```
200  <meta refresh to https://weibo.com/?...&retcode=6102>
```
→ `useticket=1` returned **`retcode=6102`** (NOT 302); `.weibo.com` SUB NOT
re-issued. (Valid only for an already-invalidated SSO TGT.)

> Implication (stale case): when the SSO TGT behind `SCF` is spent, `useticket=1`
> cannot recover. A *fresh* TGT (Task 2C) can. See Task 2C for the authoritative
> behavior and the corrected `renew()` guidance.

---

## Task 2C — Fresh session repro (authoritative)

Following the user's exact 6-step protocol with a **freshly QR-logged-in**
session (probe: `tmp/fresh_login_probe.py`):

1. Fresh QR login → saved all-domain cookies (23 cookies).
2. `test_login()` → `True`; `GET /ajax/profile/info` → 200 (API usable).
3. Deleted **only** `SUB @ .weibo.com` (+ host-only `weibo.com`), left `SCF`,
   `.sina.com.cn` SUB/SCF/ALF, `.weibo.cn` SUB all intact.
4. `GET weibo.com/` → `302` + `x-login-autologin: true`; `Location`:
   ```
   https://login.sina.com.cn/sso/login.php?url=https%3A%2F%2Fweibo.com%2F
     &_rand=<ts>&gateway=1&service=miniblog&entry=miniblog&useticket=1
     &returntype=META&sudaref=&_client_version=0.6.33
   ```
   No `Set-Cookie` on this response.
5. Followed the **exact** Location URL (full SSO chain, `allow_redirects=False`
   hop-by-hop, latest cookies each time):
   - `login.php?useticket=1` → **302** + `Set-Cookie: SUB@.sina.com.cn,
     tgc, ALF@.sina.com.cn, LT, ALC@login.sina.com.cn` → `Location:
     passport.weibo.com/sso/crossdomain?...&ticket=ST-...`
   - `passport.weibo.com/sso/crossdomain?ticket=ST-...` → 302 →
     `passport.weibo.cn/sso/crossdomain?ticket=ST-...`
   - `passport.weibo.cn/sso/crossdomain?ticket=ST-...` → 302 + `Set-Cookie:
     SUB@.weibo.cn, SSOLoginState@.weibo.cn, ALF@.weibo.cn` → `Location:
     https://weibo.com/`
   - `https://weibo.com/` → **200 OK** (no further redirect).
6. Result: **`.weibo.com` SUB re-issued** (`SUB @ .weibo.com` present in jar,
   24 cookies total); `test_login()` → **`True`**. **Silent recovery succeeded
   WITHOUT a QR re-scan.**

**Authoritative conclusion:**
- A deleted `.weibo.com` SUB **IS** silently recoverable via the
  `weibo.com/` → `login.php?useticket=1` → `sso/crossdomain` chain, **when the
  SSO backend honors the session's TGT**. The flow needs the **full chain
  followed** (login.php 302 → crossdomain → weibo.cn crossdomain → weibo.com),
  not just the single `login.php` hop. `renew()` implements exactly this.
- ⚠️ **Important nuance (refined 2026-08-07):** `login.php?useticket=1` only
  succeeds when the SSO session carries a **legacy `login.php`-eligible grant**
  — i.e. the server-side ticket established by a `login.sina.com.cn/sso/login.php`
  (legacy) crossdomain pass. In `fresh_login_probe.py` the recovery worked
  BECAUSE that run itself performed the `login.php` chain and re-saved the
  resulting cookies (which include `tgc`/`LT`/`ALC @ .login.sina.com.cn` from the
  `login.php` Set-Cookie). A **pure QR `sso/v2/login` session** (which uses the
  *v2* crossdomain, not the legacy `login.php`) does NOT pre-establish that
  grant, so a direct `renew()` right after a QR login currently returns 6102 and
  falls back to QR. After any successful `renew()` (which does the legacy
  `login.php` pass and re-saves), subsequent `renew()` calls DO work silently
  until the SSO TGT itself expires.
- Practically: the very first recovery after a QR login may still require a QR
  scan; every recovery *thereafter* is silent (no scan) as long as the long-lived
  SCF/SSO cookies remain valid. `main()`'s `test_login → renew → login` fallback
  handles both cases correctly.
- The browser achieves first-time-silent recovery because its login SPA wires
  both the v2 and legacy SSO grants during the initial auth; replicating that in
  `login()` (e.g. appending a legacy `login.php` pass) is a possible future
  hardening but is NOT required for the common "keep session alive / recover
  after a transient SUB loss" use case.

---

## Task 2B — Why did our earlier raw probe get 6102 while the browser got 302? (Q3, historical)

The user's browser, after deleting only the `.weibo.com` SUB, hits
`weibo.com/` → gets `302 x-login-autologin: true` → follows to
`login.php?useticket=1` → and **that** returns `302` with
`Set-Cookie: SUB/ALF/ALC/tgc` (success). Our raw `requests` probe, following the
exact same URL with a matching Chrome/150 UA, gets `200 + retcode=6102`.

Two findings, in order:

### (a) `requests` does NOT send `.sina.com.cn` cookies to `login.sina.com.cn`

`requests`/`urllib` cookie domain-matching silently drops `.sina.com.cn`
domain cookies when the request host is `login.sina.com.cn` (a known `urllib`
`domain_return_ok` limitation). Verified:

```python
j.set('SCF', 'X', domain='.sina.com.cn')
j.get_dict('.login.sina.com.cn')   # -> {}   (empty!)
```

So the raw probe's STEP2 originally sent a **0-byte Cookie header** — the SSO
`SCF`/`SUB`/`SUBP`/`ALF` at `.sina.com.cn` never reached the server. That alone
guarantees `retcode=6102`. This is a **client bug in our probe**, not a Weibo
behavior. A real browser sends these cookies correctly.

### (b) Even with the exact browser cookie set, the server still returns 6102

After manually injecting the precise cookie set the browser sends (from
`sina-sso-login.har`: `SVB/ALC/SCF @ .login.sina.com.cn`, `SCF/SUB/SUBP/ALF @
.sina.com.cn` — de-duplicated, no double `SCF`), STEP2 still returns `200 +
retcode=6102`. Meanwhile `GET /ajax/config/get_config` on the same cookie jar
returns `{"ok":1}` (session IS still considered logged-in) and `ALF` is not
expired.

**Conclusion:** the difference is **server-side stateful SSO**, not UA / query /
headers. `login.php?useticket=1` performs a TGT exchange: it validates the
`SCF`/SSO ticket against the SSO backend. In the user's browser the SSO backend
had a live TGT behind that `SCF` (the silent re-auth handshake had just
re-established it), so it minted a fresh `.weibo.com` SUB → 302. In our probe the
same `SCF` cookie value points to a TGT the SSO backend no longer honors (the
ticket was spent / invalidated when the real browser earlier re-authed, or the
`x-login-autologin` flow establishes a one-time server-side grant our raw replay
doesn't carry). The cookie is present and unexpired, but the **backend rejects
the ticket**.

So, to answer the user's three questions directly (historical — see Task 2C for
the authoritative, corrected answer):

1. **SPA** = Single Page Application — the `login.php` page is a small SPA that,
   on load, reads the `x-login-autologin` signal + valid `SCF` and silently
   performs the SSO re-auth (no QR re-scan).
2. **Why 302 in the browser?** Because `login.php` is a *refresh-while-logged-in*
   endpoint: when the SSO backend honors the `SCF` TGT, it mints a fresh
   `.weibo.com` SUB (+ `tgc`/`LT`/`ALC`/`ALF`) and 302-redirects back to
   `weibo.com`. When the TGT is rejected, it instead emits the `retcode=6102`
   META stub (200).
3. **Was our UA / query / header wrong?** **No.** UA (Chrome/150), the full query
   string (`gateway=1&service=miniblog&entry=miniblog&useticket=1&returntype=META&_client_version=0.6.33`),
   and the sec-fetch/Referer/upgrade-insecure-requests headers all match the
   browser. The first failure was a `requests` cookie-domain bug (fixed by manual
   injection); the *remaining* 6102 against the STALE session was server-side TGT
   state. **With a fresh TGT the same exact flow returns 302** (proven in Task 2C).

> Corrected takeaway: silent `.weibo.com` SUB recovery IS achievable by following
> the `weibo.com/` → `login.php?useticket=1` → `sso/crossdomain` chain. `renew()`
> implements this browser-faithfully (uses the server-issued URL + re-attaches
> the `.sina.com.cn` SSO cookies `requests` would drop). It succeeds whenever the
> SSO backend honors the session's grant (i.e. after any `login.php` pass);
> otherwise it returns `False` and `main()` falls back to a full `login()`. No
> SPA-JS reverse-engineering is required for the common recovery case.

---

## Recommended handling in `auth.py`

1. `test_login()` (get_config): keep as-is. It both detects state AND refreshes
   `WBPSESS`. Safe to call frequently.
2. `renew()`: now mirrors the browser's silent re-auth exactly (implemented
   2026-08-07):
   - GET `weibo.com/` (allow_redirects=False) → if `302` + `x-login-autologin`,
     take the **server-issued** `login.php?...&useticket=1` Location (do NOT
     hand-build the query — use the URL the server returns). If `200` and
     logged-in, nothing to do → return True.
   - Follow that exact `login.php` URL with the `.sina.com.cn` SSO cookies
     re-attached (a `requests`/urllib domain-match bug otherwise drops them),
     then `_follow_sso_chain` to complete the crossdomain exchange.
   - With a `login.php`-eligible SSO grant this **restores a deleted `.weibo.com`
     SUB** with no QR re-scan. It must treat a **non-302** response (the
     `retcode=6102` META page) as failure and return `False` immediately — do NOT
     follow the META bounce. The META-200 case is already treated as "unexpected
     status" → returns `False`. Good.
   - A `False` from `renew()` means the SSO grant is not eligible (6102, e.g. a
     pure QR session before any `login.php` pass) — fall through to `login()`.
   - `main()` already does `if auth.test_login(): return; if auth.renew(): return; auth.login()`.
3. If both `test_login()` and `renew()` fail, require `login()` (full QR scan).
   After the first successful `renew()`, subsequent renewals are silent until the
   long-lived SCF/SSO cookies expire.

---

## Raw logs

- `tmp/task1.log` — WBPSESS expiry probe (full cookie diffs)
- `tmp/task2.log` — SUB deletion probe, stale session (full cookie diffs)
- `tmp/fresh_probe.log` / `tmp/fresh_probe2.log` — Task 2C fresh-session silent
  recovery repro (full SSO chain headers + Set-Cookie)
- `tmp/fresh_login_probe.py` — the 6-step reproduction script
