# weibo-tools

A Python toolbox for researching Weibo (微博) account data on the **web**
platform: QR login with silent session renewal, blacklist / following / fans
snapshots, deep profile analysis, audience ranking, and an endpoint inventory
scraped from Weibo's own JS bundles.

> 中文文档 / Chinese version: [README.zh-CN.md](README.zh-CN.md)

## Disclaimer

This project is a **personal research tool**. It talks to Weibo's private
(undocumented) web AJAX endpoints using your own logged-in session.

- Use it only on accounts you own or are explicitly authorized to analyze.
- Snapshots under `src/data/` are generated locally and contain real Weibo UIDs
  and profile PII; they are git-ignored. Never commit them.
- Cookie jars (`src/cookies*`) are credentials. They are git-ignored. Never
  commit them.
- Be gentle with request volume: the deep commands paginate large lists and can
  issue thousands of requests.

## Requirements

- Python 3.10+ (developed and tested on Python 3.14)
- Dependencies: `requests`, `qrcode` + `pillow` (QR login), `colorama`
  (colored logs), plus `certifi` / `charset-normalizer` / `idna` / `urllib3`
- A Weibo account that can log in by QR scan

## Installation

```bash
# from the project root
python -m venv venvs/weibo-env

# Windows (PowerShell)
venvs/weibo-env\Scripts\Activate.ps1
# macOS / Linux
# source venvs/weibo-env/bin/activate

pip install -r requirements.txt
```

## Quick start

All commands run from the `src/` directory, because the CLI resolves sibling
modules (`auth.py`, `logutil.py`, ...) relative to it.

```bash
cd src

# 1) Log in once (a QR code is printed / saved; scan it in the Weibo app).
#    A FIRST login must use --user <label>: --uid only works once a saved
#    session (src/cookies.<uid>.weibo) already exists.
python weibo-tool.py login --user <label>

# 2) Verify the session and print a blacklist summary.
#    After the first login you can use --uid <uid> instead of --user <label>.
python weibo-tool.py blacklist --user <label>
```

`python -m weibo_tool ...` is equivalent to `python weibo-tool.py ...`.

On the first run you are asked for the UID to act as. Later runs reuse the saved
cookie jar and renew the session silently; a QR scan is only needed again when
the long-lived SSO cookies expire.

## Commands

| Command | What it does |
|---|---|
| `login` | Log in (QR) or silently renew an existing session. `--fresh` forces a clean QR login. |
| `blacklist` | Summarize the active account's blacklist (shield-type combinations). `--json` dumps the summary + user list. |
| `blacklist-deep` | Fetch full profiles for every blacklisted account and analyze the audience. Needs a *viewer* account that did **not** create the blacklist (`--viewer-uid`). |
| `blacklist-diag` | Diagnose unreachable blacklist profiles; `--retry-uid` dumps raw API bodies for specific UIDs. |
| `following-deep` | Deep profile + follow-audience analysis of the accounts a user **follows** (the control/baseline counterpart of `blacklist-deep`). |
| `following-sync` | Snapshot every account the user **follows** into a local JSON file, with a dated backup and an added/removed diff per run. |
| `fans-sync` | Snapshot every account **following** the user, same backup/diff behavior. |
| `top-followed` | Rank the most-followed accounts inside an audience (`--source blacklist` default, or `--source following`), with optional official/media exclusions. |
| `profile-visit` | Register profile visits through the web API. Resumable, with its own progress per relation list. |
| `stranger-visit` | Visit **strangers** (accounts outside your graph, e.g. friends-of-friends) to expand exposure. Sampled, paced, resumable. |

Run `python weibo-tool.py <command> --help` for the full option list of a
command.

### Global identity options

These work either before or after the subcommand name.

| Option | Meaning |
|---|---|
| `--uid <uid>` | Numeric Weibo UID. Reuses the saved session if one exists. |
| `--user <label>` | Human-friendly login label; resolves to a saved UID session. |
| `--no-prompt` | Never prompt; use the only/existing identity or `default`. |

## Output locations

| Path | Contents |
|---|---|
| `src/data/blacklist_deep/` | Blacklist deep-crawl JSON/CSV and the human-readable `*_summary.md` |
| `src/data/following_deep/` | Following deep-crawl JSON/CSV and summary |
| `src/data/relations/` | `following` / `fans` snapshots produced by `*-sync` |
| `src/data/exploration/` | Observation data captured by the read-count experiments |
| `src/.cache/fof/` | Shared friends-of-friends crawl cache (one file per friend) |
| `src/.cache/` | Other resumable crawl caches (`profile_visit/`, `relations_sync/`, ...) |
| `src/log/` | Runtime logs (`weibo.log`) + automation observation logs |
| `doc/api_inventory.{json,md}` | Generated endpoint catalog |

Everything under `src/data/`, `src/log/` (except its `README.md`), `src/.cache/`,
`src/tmp/` and the cookie jars is git-ignored.

## Project layout

```
config/                     Committed config templates (chat.ini.example, ...)
doc/                        Documentation (see "Documentation" below)
src/
├── weibo-tool.py           Thin, dependency-free CLI entry point
├── auth.py                 QR login, silent renewal, cookie-jar handling
├── session.py              Minimal shared session helper
├── blacklist_analyzer.py   Standalone blacklist analyzer (pre-CLI script)
├── chat.py                 Group-chat monitor (Bayeux long-polling)
├── api_explorer.py         Scrapes Weibo JS bundles -> doc/api_inventory.*
├── static_fetch.py         Mirrors a CDN domain's static assets -> static/
├── live_test.py            Probes every catalogued endpoint -> live_status
├── logutil.py              Logging setup
├── weibo_tool/             The CLI package
│   ├── cli.py              Argument parsing + identity resolution
│   ├── http_engine.py      Shared HTTP layer (headers, retry, throttling)
│   ├── fof.py              Friends-of-friends crawl (shared by profile-visit
│   │                       and stranger-visit) -> .cache/fof/
│   ├── verified_config.py  Loader for config/verified_categories.json
│   └── commands/           One module per subcommand
├── automations/            Scheduled runners (e.g. the daily profile visit)
├── browser/                Browser-side scripts (run in the DevTools console)
├── cert/                   Bundled CA chain for web.im.weibo.com
├── config/                 Runtime config: logging.ini + verified_categories.json
├── static/                 Mirrored Weibo CDN assets (see src/static/README.md)
├── data/                   Generated analysis artifacts (git-ignored)
├── log/                    Runtime logs (git-ignored, except README.md)
├── experiment/             Ad-hoc experiment scripts
├── test/                   Login/renewal runner + regression tests
└── tmp/                    Runtime scratch dir (QR login image); git-ignored
```

Note: `config/` (project root) holds the committed **templates**; the config the
code actually reads at runtime lives in `src/config/`.

## Configuration

Only templates are committed; copy and fill in your own values.

| Template | Real file (git-ignored) | Purpose |
|---|---|---|
| `config/chat.ini.example` | `config/chat.ini` | UID, group GID and optional proxy for `chat.py` |
| `config/experiment.local.json.example` | `config/experiment.local.json` | `author_uid` / `viewer_uid` for the experiment scripts |

`src/config/verified_categories.json` **is** committed: it is the single source
of truth for verification-type labels, tier mapping, the official/media
exclusion list and the `profile_visit.skip_organization` policy used by
`blacklist-deep`, `top-followed`, `profile-visit` and `stranger-visit`.
Nothing about account classification is hard-coded in Python — editing the JSON
requires no code change. `src/config/logging.ini` lives next to it and drives
`logutil`.

## Documentation

| Document | Language | Notes |
|---|---|---|
| [README.md](README.md) | English | This file (default) |
| [README.zh-CN.md](README.zh-CN.md) | 简体中文 | Chinese translation |
| [doc/cookie_review.md](doc/cookie_review.md) | English | Which endpoints (re)issue `WBPSESS` / `SUB`, and how silent renewal works |
| [doc/cookie_review.zh-CN.md](doc/cookie_review.zh-CN.md) | 简体中文 | Chinese translation |
| [doc/verified_fields.md](doc/verified_fields.md) | English | Field reference for the `verified*` / membership fields |
| [doc/verified_fields.zh-CN.md](doc/verified_fields.zh-CN.md) | 简体中文 | Chinese translation |
| [doc/api_inventory.md](doc/api_inventory.md) | English | **Generated** catalog of 277 endpoints — see note below |
| [src/static/README.md](src/static/README.md) | English | Map of the captured / deobfuscated login JS |
| [src/static/README.zh-CN.md](src/static/README.zh-CN.md) | 简体中文 | Chinese translation |

> `doc/api_inventory.md` and `doc/api_inventory.json` are **generated** by
> `src/api_explorer.py` (and re-rendered by `src/live_test.py`). Do not edit
> them by hand. Because they are regenerated on every run, no translated copy is
> kept — the conventions section at the top of the file explains every column.

Documentation convention for this repository: every document is written in
English as the default, with the Chinese translation next to it using a
`.zh-CN` language suffix (e.g. `README.md` / `README.zh-CN.md`).

## License

See [LICENSE](LICENSE).
