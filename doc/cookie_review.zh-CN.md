# Cookie / 登录态复核笔记

> English version (default): [cookie_review.md](cookie_review.md)

通过主动让会话 cookie `WBPSESS` 与 `SUB` 过期/删除、探测候选接口，并在每次调用前后
对比 cookie jar，来定位到底是哪些微博接口会（重新）下发它们。

使用的工具：`tmp/review_probe.py`（`python tmp/review_probe.py task1|task2|both`）。
它在每次请求前后快照 `(name, domain) -> (value-hash, expires)`，并打印
ADDED / REMOVED / CHANGED 的 cookie。

---

## Cookie 角色（来自 `src/cookies.weibo`）

| Cookie | 域名 | 典型有效期 | 作用 |
|---|---|---|---|
| `SUB` | `.weibo.com`、`.sina.com.cn`、`.weibo.cn` | 约 1 年 | **主登录凭据**（会话票据） |
| `SUBP` | 同上 | 约 1 年 | SUB 的伴随项（资料/地区） |
| `SCF` | `.weibo.com`、`.sina.com.cn`、`.weibo.cn` | 约 10 年 | 加密 TGT；长期有效的重新认证凭据 |
| `ALF` | 同上 | 约 30 天 | 登录有效期时间戳（`02_<unix>`），决定会话是否放行 |
| `ALC` | `.passport.weibo.com`、`.login.sina.com.cn` | 约 30 天 | 跨域登录链 token |
| `WBPSESS` | `weibo.com` | 约 1 天 | weibo.com 前端的应用/会话指纹 |
| `XSRF-TOKEN` / `X-CSRF-TOKEN` | `weibo.com` / `.passport.weibo.com` | 会话级 | CSRF token（来自 RUM，`48po.js`） |
| `SVB` / `SRT` / `SRF` | `.passport.weibo.com` | 长期 | Passport 会话 token |

登录判定（依据 `test_login` / `get_config`）：`SUB` 存在**且** `ALF` 未过期。
`WBPSESS` **不参与**登录判定。

## 认证会话恢复架构（重构 —— 2026-09-22）

所有登录 / 恢复逻辑已统一到唯一入口：

    Auth.ensure_session(force=False, allow_renew=True) -> bool

会话可用时返回 `True`。恢复顺序：

1. `test_login()` —— 已经登录？(当 `force=True` 时跳过此步)。
2. `renew()` —— 静默 SSO 续期，**无需扫码**（当 `allow_renew=False` 时跳过）。
3. `login()` —— 完整二维码登录（最后手段；阻塞在二维码窗口直到被扫码）。

`Session.login()` 与爬取层现在都委托给 `ensure_session()`，而不是各自重写
"test → renew → login" 那套流程（提交 `0224aaf`，分支 `refactor/auth-ensure-session`）。

### `force` 与 `allow_renew` —— 两个独立的开关

- `force` 只控制**第 1 步**：为 `True` 时跳过开头的"已登录"短路，即使
  `test_login()` 已通过也会继续恢复（用于强制重新认证）。
- `allow_renew` 只控制**第 2 步**：为 `False` 时跳过静默 `renew()`，直接走二维码。

  **注意：`force=True` 并不会禁用 `renew()`。** 续期只受 `allow_renew` 控制——
  因此 `force=True, allow_renew=True` 在二维码**之前**仍会先尝试静默续期。

| `force` | `allow_renew` | 行为 |
|---------|---------------|------|
| `False`（默认） | `True`（默认） | test → renew → QR（常规自动恢复） |
| `False` | `False` | test → QR（跳过续期） |
| `True` | `True` | renew → QR（跳过开头 test，但仍先尝试续期） |
| `True` | `False` | 仅 QR（强制重新扫码；不 test、不续期） |

### `renew()` 机制（静默、免扫码）

模拟浏览器在 `.weibo.com` 的 `SUB` 缺失 / 短期失效时访问 `weibo.com/`：

1. `GET weibo.com/`（`allow_redirects=False`）。
   - **200** → 已完全登录；`test_login()` 确认后 `renew()` 返回 `True`。
     **不会调用任何 SSO 接口**（仅做确认，等于 no-op）。
   - **301/302** 且 `Location` 含 `login.php` → 服务器下发了自动登录 URL
     （`login.php?...&useticket=1`）。
2. 跟随该**服务器下发**的 `login.php` URL（`_follow_sso_chain`）：重放跨域链
   （`login.sina.com.cn/sso/v2/crossdomain` →
   `passport.weibo.cn/sso/crossdomain` → `pmproxy`），通过 `Set-Cookie` 重签
   `SUB/ALF/SCF/ALC`。以长期 `SCF`（加密 TGT）作为凭证。
   - 301/302 → 跟完链 → `test_login()` 通过 → `renew()` 返回 `True`。
   - 其他情况 → `renew()` 返回 `False`（SSO TGT 失效，例如 `retcode=6102`）；
     调用方退化到二维码。

该流程的实证 HAR 证据见下方任务 2B / 2C。

### 运维 CLI（`src/auth.py`）

- `auth.py --user <label>`（无 flag）：默认 `main()` 执行同样的
  **test → renew → QR** 顺序且不做任何播放 —— 即"只（重新）认证"。
- `--check` / `--test`（只读）：载入 cookie、`test_login()`、打印认证 cookie
  状态后退出。**不续期、不扫码**。位于 `refactor/auth-ensure-session` 分支
  （提交 `4d0fed2`）。
- `--login`（强制二维码 flag）已**删除**：在 `ensure_session` 成为规范入口后，
  无 flag 的 `auth.py --user <label>` 已覆盖强制恢复场景，故该 flag 冗余。

---

## 任务 1 —— 让 `WBPSESS` 过期（从会话中删除），找出重新下发者

基线：`WBPSESS @ weibo.com` 存在，expires `1786119101`。

| 调用的接口 | 结果 | 调用后的 WBPSESS |
|---|---|---|
| `GET /ajax/config/get_config`（200） | **+ ADDED `WBPSESS @ weibo.com`**（全新，有效期约 now+1d） | ✅ 存在 |
| `GET weibo.com/`（200） | `~ CHANGED WBPSESS`（值轮换，有效期不变） | ✅ 存在 |
| `GET /sso/v2/web/config`（200） | cookie 无变化 | ✅ 存在 |
| `renew()` → `login.php?useticket=1`（302） | 在各域名重新下发了 SUB/ALF/SCF/ALC/SVB；**未触碰 WBPSESS** | ✅ 存在 |

**结论：`WBPSESS` 由 `/ajax/config/get_config` （重新）下发** —— 也正是
`test_login()` 使用的接口。首页只会刷新它，`renew()` 与 `web/config` 对它无影响。

> 推论：每次调用 `test_login()` 都会静默刷新 `WBPSESS`。一个靠轮询 `get_config`
> 检查登录态的工具，同时也把 `WBPSESS` 养活着，所以只要还在轮询，`WBPSESS`
> 过期实际上就不是问题。

---

## 任务 2 —— 删除 `SUB`，找出重新下发者（两种场景）

### 场景 A：删除**所有**域名下的 `SUB`（过度删除）

基线：`SUB` 存在。

| 调用的接口 | 结果 | 调用后的 SUB | get_config `ok` |
|---|---|---|---|
| `GET /ajax/config/get_config`（200） | cookie 无变化 | ❌ 不存在 | `-100`（已登出） |
| `renew()` → `login.php?useticket=1`（200，**非 302**） | cookie 无变化 | ❌ 不存在 | `-100` |
| `GET weibo.com/`（200） | cookie 无变化 | ❌ 不存在 | `-100` |

→ `renew()` 无法铸造票据（已经没有可校验的会话了）。

### 场景 B：只删除 `.weibo.com` 的 SUB（与真实浏览器场景一致）

保留 `SCF`、`.sina.com.cn` 的 SUB、`.weibo.cn` 的 SUB 以及 `ALF`。

**第 1 步 —— `GET weibo.com/`（与浏览器行为完全一致）：**
```
302  x-login-autologin: true
Location: https://login.sina.com.cn/sso/login.php?url=...&gateway=1&service=miniblog
          &entry=miniblog&useticket=1&returntype=META&sudaref=&_client_version=0.6.33
```
服务端用响应头 **`x-login-autologin: true`** 表示可以自动登录。

**第 2 步 —— 跟随 Location 到 `login.php?useticket=1`**（精确复刻浏览器，
且在此之前**不**调用 `get_config`）：

> ⚠️ **2026-08-07 更正（见任务 2C）。** 下面这条早期观察是针对一个**陈旧**的
> 已保存会话做的，其 SSO TGT 已被此前的测试作废。对一个**刚登录**的会话，同样的
> 流程返回 302（成功）并完整恢复 `.weibo.com` 的 SUB。6102 是陈旧 TGT 造成的
> 假象，**不是**根本性限制。此处保留陈旧会话的记录供参考，但以任务 2C 为准。

*陈旧会话的观察（已被取代）：*
```
200  <meta refresh to https://weibo.com/?...&retcode=6102>
```
→ `useticket=1` 返回 **`retcode=6102`**（不是 302）；`.weibo.com` 的 SUB
**没有**被重新下发。（该结论仅对已被作废的 SSO TGT 成立。）

> 推论（陈旧场景）：当 `SCF` 背后的 SSO TGT 已用尽时，`useticket=1` 无法恢复。
> **新鲜**的 TGT（任务 2C）可以。权威行为请以任务 2C 为准。

---

## 任务 2C —— 新鲜会话复现（权威结论）

按用户给出的 6 步协议，使用一个**刚扫码登录**的会话执行
（探针：`tmp/fresh_login_probe.py`）：

1. 重新扫码登录 → 保存全部域名的 cookie（23 个）。
2. `test_login()` → `True`；`GET /ajax/profile/info` → 200（接口可用）。
3. **只**删除 `SUB @ .weibo.com`（含 host-only 的 `weibo.com`），保留 `SCF`、
   `.sina.com.cn` 的 SUB/SCF/ALF、`.weibo.cn` 的 SUB。
4. `GET weibo.com/` → `302` + `x-login-autologin: true`；`Location`：
   ```
   https://login.sina.com.cn/sso/login.php?url=https%3A%2F%2Fweibo.com%2F
     &_rand=<ts>&gateway=1&service=miniblog&entry=miniblog&useticket=1
     &returntype=META&sudaref=&_client_version=0.6.33
   ```
   该响应没有 `Set-Cookie`。
5. 跟随**完全相同**的 Location URL（完整 SSO 链，逐跳 `allow_redirects=False`，
   每跳都带上最新 cookie）：
   - `login.php?useticket=1` → **302** + `Set-Cookie: SUB@.sina.com.cn,
     tgc, ALF@.sina.com.cn, LT, ALC@login.sina.com.cn` → `Location:
     passport.weibo.com/sso/crossdomain?...&ticket=ST-...`
   - `passport.weibo.com/sso/crossdomain?ticket=ST-...` → 302 →
     `passport.weibo.cn/sso/crossdomain?ticket=ST-...`
   - `passport.weibo.cn/sso/crossdomain?ticket=ST-...` → 302 + `Set-Cookie:
     SUB@.weibo.cn, SSOLoginState@.weibo.cn, ALF@.weibo.cn` → `Location:
     https://weibo.com/`
   - `https://weibo.com/` → **200 OK**（不再跳转）。
6. 结果：**`.weibo.com` 的 SUB 被重新下发**（jar 中存在 `SUB @ .weibo.com`，
   共 24 个 cookie）；`test_login()` → **`True`**。**无需重新扫码，静默恢复成功。**

**权威结论：**
- 被删除的 `.weibo.com` SUB **确实可以**通过
  `weibo.com/` → `login.php?useticket=1` → `sso/crossdomain` 这条链静默恢复，
  **前提是 SSO 后端认可该会话的 TGT**。该流程需要**完整跟随整条链**
  （login.php 302 → crossdomain → weibo.cn crossdomain → weibo.com），
  而不只是 `login.php` 一跳。`renew()` 正是这样实现的。
- ⚠️ **重要细节（2026-08-07 修订）：** `login.php?useticket=1` 只有在 SSO 会话
  持有**可用于旧版 `login.php` 的授权**时才会成功 —— 即由一次
  `login.sina.com.cn/sso/login.php`（旧版）跨域传递所建立的服务端票据。在
  `fresh_login_probe.py` 中恢复能成功，**是因为**那次运行本身执行了 `login.php`
  链并把结果 cookie 重新保存了下来（其中包含 `login.php` Set-Cookie 下发的
  `tgc`/`LT`/`ALC @ .login.sina.com.cn`）。一个**纯扫码的 `sso/v2/login` 会话**
  （走的是 *v2* 跨域，而非旧版 `login.php`）并没有预先建立该授权，所以扫码登录后
  立刻直接调用 `renew()` 目前会返回 6102 并回退到扫码。而在任何一次成功的
  `renew()` 之后（它会走一遍旧版 `login.php` 并重新保存），后续的 `renew()`
  **都能**静默成功，直到 SSO TGT 本身过期。
- 实践上：扫码登录后的**第一次**恢复可能仍需扫一次码；此后**每一次**恢复都是
  静默的（无需扫码），只要长期有效的 SCF/SSO cookie 仍然有效。`main()` 里的
  `test_login → renew → login` 回退链已正确处理这两种情况。
- 浏览器之所以能做到首次即静默恢复，是因为它的登录 SPA 在首次认证时同时接通了
  v2 与旧版两条 SSO 授权；在 `login()` 中复刻这一点（例如追加一次旧版
  `login.php` 传递）是一种可选的加固，但对常见的"保持会话存活 / 在 SUB 短暂丢失后
  恢复"场景**并非必需**。

---

## 任务 2B —— 为什么我们的原始探针得到 6102，而浏览器得到 302？（Q3，历史记录）

用户浏览器在只删除 `.weibo.com` 的 SUB 后，访问 `weibo.com/` → 得到
`302 x-login-autologin: true` → 跟随到 `login.php?useticket=1` → **该请求**返回
`302` 且带 `Set-Cookie: SUB/ALF/ALC/tgc`（成功）。而我们用 `requests` 以匹配的
Chrome/150 UA 跟随完全相同的 URL，却得到 `200 + retcode=6102`。

两个发现，按序如下：

### (a) `requests` **不会**把 `.sina.com.cn` 的 cookie 发给 `login.sina.com.cn`

`requests`/`urllib` 的 cookie 域名匹配会在请求主机为 `login.sina.com.cn` 时静默
丢弃 `.sina.com.cn` 域的 cookie（`urllib` 的 `domain_return_ok` 已知限制）。已验证：

```python
j.set('SCF', 'X', domain='.sina.com.cn')
j.get_dict('.login.sina.com.cn')   # -> {}   （空！）
```

也就是说原始探针的第 2 步实际发出的是一个 **0 字节的 Cookie 头** —— `.sina.com.cn`
下的 SSO `SCF`/`SUB`/`SUBP`/`ALF` 根本没到服务端。仅此一点就必然导致
`retcode=6102`。这是我们探针的**客户端 bug**，不是微博的行为。真实浏览器会正确
发送这些 cookie。

### (b) 即使带上与浏览器完全一致的 cookie 集，服务端仍返回 6102

在手工注入浏览器发送的精确 cookie 集之后（取自 `sina-sso-login.har`：
`SVB/ALC/SCF @ .login.sina.com.cn`、`SCF/SUB/SUBP/ALF @ .sina.com.cn` —— 已去重，
不含重复的 `SCF`），第 2 步仍返回 `200 + retcode=6102`。与此同时，同一个 cookie jar
上的 `GET /ajax/config/get_config` 返回 `{"ok":1}`（会话**仍**被视为已登录），
且 `ALF` 并未过期。

**结论：** 差异来自**服务端有状态的 SSO**，而不是 UA / 查询串 / 请求头。
`login.php?useticket=1` 会做一次 TGT 交换：它拿 `SCF`/SSO 票据去 SSO 后端校验。
在用户的浏览器里，该 `SCF` 背后是一个**活跃**的 TGT（静默重认证握手刚刚重建了它），
于是服务铸造出新的 `.weibo.com` SUB 并 302 回跳；而在我们的探针里，同一个 `SCF`
指向的是一个 SSO 后端已不再认可的 TGT（真实浏览器早先重认证时该票据已被使用/作废，
或者 `x-login-autologin` 流程在服务端建立的是一次性授权，而我们的原始重放并不携带它）。
cookie 存在且未过期，但**后端拒绝了票据**。

因此，直接回答用户的三个问题（历史结论 —— 权威的更正答案见任务 2C）：

1. **SPA** = 单页应用 —— `login.php` 是一个小型 SPA，加载时读取
   `x-login-autologin` 信号 + 有效的 `SCF`，然后静默完成 SSO 重认证（无需重新扫码）。
2. **浏览器里为什么是 302？** 因为 `login.php` 是一个*已登录状态的刷新*端点：
   当 SSO 后端认可该 `SCF` TGT 时，它会铸造新的 `.weibo.com` SUB（以及
   `tgc`/`LT`/`ALC`/`ALF`）并 302 回跳到 `weibo.com`；当 TGT 被拒绝时，它改为
   输出 `retcode=6102` 的 META 桩页（200）。
3. **我们的 UA / 查询串 / 请求头错了吗？** **没有。** UA（Chrome/150）、完整查询串
   （`gateway=1&service=miniblog&entry=miniblog&useticket=1&returntype=META&_client_version=0.6.33`）
   以及 sec-fetch / Referer / upgrade-insecure-requests 头都与浏览器一致。最初的失败是
   `requests` 的 cookie 域名 bug（已通过手工注入修复）；**剩下**那个针对陈旧会话的
   6102 是服务端 TGT 状态问题。**在 TGT 新鲜时，完全相同的流程返回 302**（已在任务 2C 证明）。

> 更正后的要点：只要完整跟随
> `weibo.com/` → `login.php?useticket=1` → `sso/crossdomain` 这条链，**就能**静默恢复
> `.weibo.com` 的 SUB。`renew()` 已按浏览器行为实现（使用服务端下发的 URL，并重新
> 附上 `requests` 会丢弃的 `.sina.com.cn` SSO cookie）。只要 SSO 后端认可该会话的授权
> （即经过任意一次 `login.php` 传递之后），它就会成功；否则返回 `False`，由 `main()`
> 回退到完整的 `login()`。对常见的恢复场景而言，并不需要去逆向 SPA 的 JS。

---

## 对 `auth.py` 的建议处理方式

1. `test_login()`（get_config）：保持现状。它既能检测登录态，又会刷新
   `WBPSESS`，可以频繁调用。
2. `renew()`：现已精确复刻浏览器的静默重认证（2026-08-07 实现）：
   - GET `weibo.com/`（`allow_redirects=False`）→ 若为 `302` + `x-login-autologin`，
     取**服务端下发**的 `login.php?...&useticket=1` Location（**不要**自己拼查询串 ——
     用服务端返回的 URL）。若返回 `200` 且已登录，则无需处理 → 返回 True。
   - 跟随该精确的 `login.php` URL，并重新附上 `.sina.com.cn` 的 SSO cookie
     （否则 `requests`/urllib 的域名匹配 bug 会把它们丢掉），然后用
     `_follow_sso_chain` 完成跨域交换。
   - 在存在可用于 `login.php` 的 SSO 授权时，这可以**恢复被删除的 `.weibo.com`
     SUB** 且无需重新扫码。它必须把**非 302** 的响应（即 `retcode=6102` 的 META 页）
     视为失败并立即返回 `False` —— **不要**跟随 META 跳转。META-200 的情况已经被
     当作"非预期状态码"→ 返回 `False`。很好。
   - `renew()` 返回 `False` 表示 SSO 授权不合格（6102，例如在任何 `login.php` 传递
     之前的纯扫码会话）—— 此时应落到 `login()`。
   - `main()` 已经按 `if auth.test_login(): return; if auth.renew(): return; auth.login()`
     的顺序执行。
3. 若 `test_login()` 与 `renew()` 都失败，则需要 `login()`（完整扫码）。在第一次
   成功的 `renew()` 之后，后续续期都是静默的，直到长期有效的 SCF/SSO cookie 过期。

---

## 原始日志

- `tmp/task1.log` —— WBPSESS 过期探测（完整 cookie diff）
- `tmp/task2.log` —— SUB 删除探测，陈旧会话（完整 cookie diff）
- `tmp/fresh_probe.log` / `tmp/fresh_probe2.log` —— 任务 2C 新鲜会话静默恢复复现
  （完整 SSO 链请求头与 Set-Cookie）
- `tmp/fresh_login_probe.py` —— 6 步复现脚本
