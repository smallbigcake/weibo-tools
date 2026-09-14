"""De-identify the generated Weibo API inventory.

`doc/api_inventory.json` is written by `src/api_explorer.py` from live probes
plus a captured browser session, and it embeds truncated raw API responses
(`capture_resp_head`, `resp_head`, `sample_params`, `real_query`, ...). Those
snippets carry third-party personal data: screen names, uids, avatar URLs, bios,
real names, schools, phone numbers, personal tags and search keywords.

`redact_payload()` rewrites such values with stable placeholders *before* the
catalogue is written to disk, so the committed file never carries personal data:

    uids      -> <UID_n>     stable per account, replaced wherever it occurs
                             (values, arrays, object keys, URLs, query strings,
                             derived group/list ids, log fields)
    nicknames -> <NAME_n>    same index as its uid when the two are adjacent
    other PII -> <REDACTED>

Endpoint metadata (hosts, paths, methods, status codes, JSON shapes) is left
untouched, so the file keeps its value as an API catalogue.

Used by `src/api_explorer.py` (default; pass `--no-redact` for a local raw run)
and by `src/live_test.py` before it writes the inventory back.
"""
import copy
import json
import re

# --- keys whose VALUE is free text that may identify a person ----------------
REDACT_VALUE_KEYS = frozenset({
    # profile / bio fields
    'description', 'desc', 'desc1', 'remark', 'remarks', 'real_name',
    'realname', 'school', 'domain', 'email', 'msn', 'qq', 'weihao', 'phone',
    'company', 'position', 'birthday',
    # personal collections
    'tag',
    # hot-search entries: public trending titles, but they name real people in
    # accusation-style headlines
    'word', 'word_scheme',
    # search keywords
    'q',
    # card subtitle that carries the card owner's nickname
    'title_sub',
})

# --- keys whose VALUE is an avatar / portrait URL ---------------------------
URL_KEYS = frozenset({
    'profile_image_url', 'profileImageUrl', 'avatar_large', 'avatar_hd',
    'avatar_url', 'avatar_s',
})

# --- keys that hold a user id ----------------------------------------------
UID_KEYS = frozenset({
    'uid', 'idstr', 'id', 'author_uid', 'viewer_uid', 'blogger_uid', 'user_id',
    'user_uid', 'createUid', 'talkUid', 'tuid', 'page_id', 'sender_id',
    'from_uid', 'to_uid', 'recipient_id', 'author_id', 'owner_id',
})

# --- keys that hold a nickname ---------------------------------------------
NAME_KEYS = ('screen_name', 'screenName', 'nick', 'nickname')

# Query parameters that carry a search keyword.
URL_KEYWORD_RE = re.compile(r'([?&](?:q|query|keyword)=)[^&]*')

# Values already produced by this module, kept verbatim on a second pass.
PLACEHOLDER_RE = re.compile(r'^<[A-Z_]+(?:_\d+)?>$')

NAME_ALT = '|'.join(NAME_KEYS)
UID_ALT = '|'.join(sorted(UID_KEYS, key=len, reverse=True))

# uid and nickname written next to each other (either order)
PAIR_UID_FIRST = re.compile(
    r'"(?:id|uid)"\s*:\s*"?(\d{6,12})"?\s*(?:,\s*"idstr"\s*:\s*"\d+")?'
    r'[^{}]{0,200}?"(?:%s)"\s*:\s*"((?:[^"\\]|\\.)*)"' % NAME_ALT)
PAIR_NAME_FIRST = re.compile(
    r'"(?:%s)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,[^{}]{0,120}?'
    r'"(?:id|uid)"\s*:\s*"?(\d{6,12})"?' % NAME_ALT)

UID_KEY_RE = re.compile(r'"(?:%s)"\s*:\s*"?(\d{6,12})"?' % UID_ALT)
URL_UID_RE = re.compile(
    r'[?&](?:uid|tuid|createUid|talkUid|from_uid|sender_id|to_uid)=(\d{6,12})')
INLINE_UID_RE = re.compile(
    r'(?:currentUid|statusAuthorId|uid|fromUid|toUid):(\d{6,12})')
PATH_UID_RE = re.compile(r'/u/(\d{6,12})')
UID_ARRAY_RE = re.compile(
    r'"(?:members|affiliation|uids|user_ids|members_uid)"\s*:\s*\[([\d,\s]+)\]')
NAME_RE = re.compile(r'"(?:%s)"\s*:\s*"((?:[^"\\]|\\.)*)"' % NAME_ALT)

UID_VALUE = r'\d{6,12}'


def _is_placeholder(value):
    return bool(value) and bool(PLACEHOLDER_RE.match(value))


class _Anonymizer:
    """Assigns stable placeholders and rewrites one payload."""

    def __init__(self):
        self._uid_idx = {}
        self._name_idx = {}
        self._next = 0
        self.stats = {}

    # -- placeholder bookkeeping ------------------------------------------
    def _assign(self, name, uid):
        """Give a uid and/or nickname the same placeholder index."""
        if _is_placeholder(name):
            name = None
        if _is_placeholder(uid):
            uid = None
        if not uid and not name:
            return
        idx = self._uid_idx.get(uid) or self._name_idx.get(name)
        if idx is None:
            self._next += 1
            idx = self._next
        if uid:
            self._uid_idx.setdefault(uid, idx)
        if name:
            self._name_idx.setdefault(name, idx)

    @property
    def uid_tok(self):
        return {u: '<UID_%d>' % i for u, i in self._uid_idx.items()}

    @property
    def name_tok(self):
        return {n: '<NAME_%d>' % i for n, i in self._name_idx.items()}

    def _bump(self, key, n=1):
        if n:
            self.stats[key] = self.stats.get(key, 0) + n

    # -- collection --------------------------------------------------------
    def collect_text(self, text):
        """Learn the uids / nicknames used inside one embedded snippet."""
        for uid, name in PAIR_UID_FIRST.findall(text):
            self._assign(name, uid)
        for name, uid in PAIR_NAME_FIRST.findall(text):
            self._assign(name, uid)
        for uid in UID_KEY_RE.findall(text):
            self._assign(None, uid)
        for uid in URL_UID_RE.findall(text):
            self._assign(None, uid)
        for uid in INLINE_UID_RE.findall(text):
            self._assign(None, uid)
        for uid in PATH_UID_RE.findall(text):
            self._assign(None, uid)
        for blob in UID_ARRAY_RE.findall(text):
            for uid in re.findall(UID_VALUE, blob):
                self._assign(None, uid)
        for name in NAME_RE.findall(text):
            self._assign(name, None)

    def collect_outer(self, node):
        """Learn the uids / nicknames held in plain (non-embedded) fields."""
        if isinstance(node, dict):
            for k, v in node.items():
                if isinstance(v, (str, int)) and not isinstance(v, bool):
                    sv = str(v)
                    if k in UID_KEYS and re.fullmatch(UID_VALUE, sv):
                        self._assign(None, sv)
                    elif k in NAME_KEYS:
                        self._assign(sv, None)
                self.collect_outer(v)
        elif isinstance(node, list):
            for v in node:
                self.collect_outer(v)

    # -- rewriting ---------------------------------------------------------
    def redact_embedded(self, text):
        """Blank the PII keys of one embedded raw-response snippet."""
        for key in URL_KEYS:
            text, n = re.subn(r'("%s"\s*:\s*")[^"]*(")' % key,
                              r'\1<REDACTED>\2', text)
            self._bump('url:' + key, n)
        for key in REDACT_VALUE_KEYS:
            text, n = re.subn(r'("%s"\s*:\s*")(?:[^"\\]|\\.)*(")' % key,
                              r'\1<REDACTED>\2', text)
            self._bump('val:' + key, n)

        def _nick(m):
            if not m.group(3) or _is_placeholder(m.group(3)):
                return m.group(0)
            self._bump('nick:' + m.group(2))
            return m.group(1) + self.name_tok.get(m.group(3), '<NAME>') + m.group(4)
        text = re.sub(r'("(%s)"\s*:\s*")((?:[^"\\]|\\.)*)(")' % NAME_ALT,
                      _nick, text)

        def _dup_name(m):
            # "name" is only redacted when it repeats a known nickname, so that
            # unrelated titles (cards, groups) survive.
            if m.group(2) in self.name_tok:
                self._bump('name(dup)')
                return m.group(1) + self.name_tok[m.group(2)] + m.group(3)
            return m.group(0)
        text = re.sub(r'("name"\s*:\s*")((?:[^"\\]|\\.)*)(")', _dup_name, text)

        def _profile_url(m):
            self._bump('profile_url')
            return m.group(1) + self.uid_tok.get(m.group(2), '<UID>') + m.group(3)
        text = re.sub(r'("profile_url"\s*:\s*"/u/)(\d{4,12})(")',
                      _profile_url, text)
        text, n = re.subn(r'("profile_url"\s*:\s*")(?!<)[^"/][^"]*(")',
                          r'\1<REDACTED>\2', text)
        self._bump('profile_url(other)', n)
        return text

    def sweep(self, text):
        """Replace every leftover occurrence of a known uid digit run.

        Covers uids hidden inside URLs, query strings, derived group/list ids,
        log fields, arrays and object keys. Runs on decoded strings so that any
        quote added here is escaped by the caller's json.dumps.
        """
        for uid in sorted(self._uid_idx, key=len, reverse=True):
            tok = '<UID_%d>' % self._uid_idx[uid]
            pat = re.compile(r'([:\[,]\s*)(\d*%s\d*)(?=\s*[,}\]])' % re.escape(uid))
            text, n = pat.subn(lambda m: '%s"%s"' % (m.group(1), tok), text)
            self._bump('sweep(bare)', n)
        for uid in sorted(self._uid_idx, key=len, reverse=True):
            tok = '<UID_%d>' % self._uid_idx[uid]
            text, n = re.subn(r'\d*%s\d*' % re.escape(uid), tok, text)
            self._bump('sweep(text)', n)
        return text

    def is_embedded(self, value):
        return (isinstance(value, str) and value.lstrip()[:1] in '{['
                and '":' in value)

    def transform(self, node):
        if isinstance(node, dict):
            out = {}
            for k, v in node.items():
                nk = self.sweep(k) if isinstance(k, str) else k
                if isinstance(v, (dict, list)):
                    out[nk] = self.transform(v)
                elif self.is_embedded(v):
                    out[nk] = self.sweep(self.redact_embedded(v))
                elif k in URL_KEYS and isinstance(v, str) and v:
                    out[nk] = '<REDACTED>'
                    self._bump('outer-url:' + k)
                elif k in REDACT_VALUE_KEYS and isinstance(v, str) and v:
                    out[nk] = '<REDACTED>'
                    self._bump('outer-val:' + k)
                elif k in NAME_KEYS and isinstance(v, str) and v:
                    if _is_placeholder(v):
                        out[nk] = v
                    else:
                        out[nk] = self.name_tok.get(v, '<NAME>')
                        self._bump('outer-nick:' + k)
                elif k == 'url' and isinstance(v, str) and '=' in v:
                    sv, n = URL_KEYWORD_RE.subn(r'\1<REDACTED>', v)
                    self._bump('url-keyword', n)
                    out[nk] = self.sweep(sv)
                elif isinstance(v, str):
                    out[nk] = self.sweep(v)
                elif isinstance(v, int) and not isinstance(v, bool):
                    sv = self.sweep(str(v))
                    out[nk] = sv if sv != str(v) else v
                else:
                    out[nk] = v
            return out
        if isinstance(node, list):
            out = []
            for v in node:
                if isinstance(v, (dict, list)):
                    out.append(self.transform(v))
                elif isinstance(v, str):
                    out.append(self.sweep(v))
                elif isinstance(v, int) and not isinstance(v, bool):
                    sv = self.sweep(str(v))
                    out.append(sv if sv != str(v) else v)
                else:
                    out.append(v)
            return out
        return node

    def _scalars(self, node):
        """Yield every scalar leaf in tree order."""
        if isinstance(node, dict):
            for v in node.values():
                if isinstance(v, (dict, list)):
                    yield from self._scalars(v)
                else:
                    yield v
        elif isinstance(node, list):
            for v in node:
                if isinstance(v, (dict, list)):
                    yield from self._scalars(v)
                else:
                    yield v

    def run(self, payload):
        # Pass 1: learn the accounts referenced by the embedded snippets, then
        # by the plain fields. Order matters — it fixes the placeholder numbers.
        for value in self._scalars(payload):
            if self.is_embedded(value):
                self.collect_text(value)
        self.collect_outer(payload)
        # Pass 2: rewrite.
        return self.transform(payload)


def redact_payload(payload):
    """Return a de-identified deep copy of an api_inventory payload."""
    anon = _Anonymizer()
    result = anon.run(copy.deepcopy(payload))
    return result


def redact_file(path, indent=2):
    """De-identify an existing inventory file in place (safety net for files
    produced before redaction became the default)."""
    payload = json.load(open(path, encoding='utf-8'))
    redacted = redact_payload(payload)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(redacted, f, ensure_ascii=False, indent=indent)
    return redacted
