var Ea = Object.defineProperty;
var Sa = (e, t, n) => t in e ? Ea(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: n
}) : e[t] = n;
var di = (e, t, n) => (Sa(e, typeof t != "symbol" ? t + "" : t, n), n);

function g0() {
  import.meta.url, import("_").catch(() => 1), async function*() {}().next()
}(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver(s => {
    for (const i of s)
      if (i.type === "childList")
        for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function n(s) {
    const i = {};
    return s.integrity && (i.integrity = s.integrity), s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? i.credentials = "include" : s.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
  }

  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i)
  }
})();
/**
 * @vue/shared v3.4.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function Ls(e, t) {
  const n = new Set(e.split(","));
  return t ? r => n.has(r.toLowerCase()) : r => n.has(r)
}
const ge = {},
  nn = [],
  Ke = () => {},
  Ca = () => !1,
  yr = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Ps = e => e.startsWith("onUpdate:"),
  Re = Object.assign,
  Ds = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
  },
  Ta = Object.prototype.hasOwnProperty,
  oe = (e, t) => Ta.call(e, t),
  z = Array.isArray,
  rn = e => Mn(e) === "[object Map]",
  wr = e => Mn(e) === "[object Set]",
  hi = e => Mn(e) === "[object Date]",
  Y = e => typeof e == "function",
  ke = e => typeof e == "string",
  Dt = e => typeof e == "symbol",
  pe = e => e !== null && typeof e == "object",
  Bo = e => (pe(e) || Y(e)) && Y(e.then) && Y(e.catch),
  Io = Object.prototype.toString,
  Mn = e => Io.call(e),
  Ra = e => Mn(e).slice(8, -1),
  Mo = e => Mn(e) === "[object Object]",
  Bs = e => ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Yn = Ls(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  _r = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
  },
  Oa = /-(\w)/g,
  ut = _r(e => e.replace(Oa, (t, n) => n ? n.toUpperCase() : "")),
  Aa = /\B([A-Z])/g,
  gn = _r(e => e.replace(Aa, "-$1").toLowerCase()),
  xr = _r(e => e.charAt(0).toUpperCase() + e.slice(1)),
  Vr = _r(e => e ? "on".concat(xr(e)) : ""),
  Bt = (e, t) => !Object.is(e, t),
  er = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  ar = (e, t, n) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n
    })
  },
  La = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
  };
let pi;
const No = () => pi || (pi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function Is(e) {
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ke(r) ? Ia(r) : Is(r);
      if (s)
        for (const i in s) t[i] = s[i]
    }
    return t
  } else if (ke(e) || pe(e)) return e
}
const Pa = /;(?![^(]*\))/g,
  Da = /:([^]+)/,
  Ba = /\/\*[^]*?\*\//g;

function Ia(e) {
  const t = {};
  return e.replace(Ba, "").split(Pa).forEach(n => {
    if (n) {
      const r = n.split(Da);
      r.length > 1 && (t[r[0].trim()] = r[1].trim())
    }
  }), t
}

function Ae(e) {
  let t = "";
  if (ke(e)) t = e;
  else if (z(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ae(e[n]);
      r && (t += r + " ")
    } else if (pe(e))
      for (const n in e) e[n] && (t += n + " ");
  return t.trim()
}
const Ma = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Na = Ls(Ma);

function $o(e) {
  return !!e || e === ""
}

function $a(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = kr(e[r], t[r]);
  return n
}

function kr(e, t) {
  if (e === t) return !0;
  let n = hi(e),
    r = hi(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (n = Dt(e), r = Dt(t), n || r) return e === t;
  if (n = z(e), r = z(t), n || r) return n && r ? $a(e, t) : !1;
  if (n = pe(e), r = pe(t), n || r) {
    if (!n || !r) return !1;
    const s = Object.keys(e).length,
      i = Object.keys(t).length;
    if (s !== i) return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o),
        a = t.hasOwnProperty(o);
      if (l && !a || !l && a || !kr(e[o], t[o])) return !1
    }
  }
  return String(e) === String(t)
}

function Vo(e, t) {
  return e.findIndex(n => kr(n, t))
}
const sn = e => ke(e) ? e : e == null ? "" : z(e) || pe(e) && (e.toString === Io || !Y(e.toString)) ? JSON.stringify(e, Fo, 2) : String(e),
  Fo = (e, t) => t && t.__v_isRef ? Fo(e, t.value) : rn(t) ? {
    ["Map(".concat(t.size, ")")]: [...t.entries()].reduce((n, [r, s], i) => (n[Fr(r, i) + " =>"] = s, n), {})
  } : wr(t) ? {
    ["Set(".concat(t.size, ")")]: [...t.values()].map(n => Fr(n))
  } : Dt(t) ? Fr(t) : pe(t) && !z(t) && !Mo(t) ? String(t) : t,
  Fr = (e, t = "") => {
    var n;
    return Dt(e) ? "Symbol(".concat((n = e.description) != null ? n : t, ")") : e
  };
/**
 * @vue/reactivity v3.4.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let Ue;
class Va {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ue, !t && Ue && (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Ue;
      try {
        return Ue = this, t()
      } finally {
        Ue = n
      }
    }
  }
  on() {
    Ue = this
  }
  off() {
    Ue = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
      }
      this.parent = void 0, this._active = !1
    }
  }
}

function Fa(e, t = Ue) {
  t && t.active && t.effects.push(e)
}

function jo() {
  return Ue
}

function ja(e) {
  Ue && Ue.cleanups.push(e)
}
let Ut;
class Ms {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 3, this._trackId = 0, this._runnings = 0, this._queryings = 0, this._depsLength = 0, Fa(this, s)
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      this._dirtyLevel = 0, this._queryings++, zt();
      for (const t of this.deps)
        if (t.computed && (Ua(t.computed), this._dirtyLevel >= 2)) break;
      Wt(), this._queryings--
    }
    return this._dirtyLevel >= 2
  }
  set dirty(t) {
    this._dirtyLevel = t ? 3 : 0
  }
  run() {
    if (this._dirtyLevel = 0, !this.active) return this.fn();
    let t = Tt,
      n = Ut;
    try {
      return Tt = !0, Ut = this, this._runnings++, gi(this), this.fn()
    } finally {
      mi(this), this._runnings--, Ut = n, Tt = t
    }
  }
  stop() {
    var t;
    this.active && (gi(this), mi(this), (t = this.onStop) == null || t.call(this), this.active = !1)
  }
}

function Ua(e) {
  return e.value
}

function gi(e) {
  e._trackId++, e._depsLength = 0
}

function mi(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Uo(e.deps[t], e);
    e.deps.length = e._depsLength
  }
}

function Uo(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let Tt = !0,
  os = 0;
const Ho = [];

function zt() {
  Ho.push(Tt), Tt = !1
}

function Wt() {
  const e = Ho.pop();
  Tt = e === void 0 ? !0 : e
}

function Ns() {
  os++
}

function $s() {
  for (os--; !os && ls.length;) ls.shift()()
}

function qo(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && Uo(r, e), e.deps[e._depsLength++] = t) : e._depsLength++
  }
}
const ls = [];

function Ko(e, t, n) {
  Ns();
  for (const r of e.keys())
    if (!(!r.allowRecurse && r._runnings) && r._dirtyLevel < t && (!r._runnings || t !== 2)) {
      const s = r._dirtyLevel;
      r._dirtyLevel = t, s === 0 && (!r._queryings || t !== 2) && (r.trigger(), r.scheduler && ls.push(r.scheduler))
    } $s()
}
const zo = (e, t) => {
    const n = new Map;
    return n.cleanup = e, n.computed = t, n
  },
  as = new WeakMap,
  Ht = Symbol(""),
  cs = Symbol("");

function $e(e, t, n) {
  if (Tt && Ut) {
    let r = as.get(e);
    r || as.set(e, r = new Map);
    let s = r.get(n);
    s || r.set(n, s = zo(() => r.delete(n))), qo(Ut, s)
  }
}

function pt(e, t, n, r, s, i) {
  const o = as.get(e);
  if (!o) return;
  let l = [];
  if (t === "clear") l = [...o.values()];
  else if (n === "length" && z(e)) {
    const a = Number(r);
    o.forEach((u, c) => {
      (c === "length" || !Dt(c) && c >= a) && l.push(u)
    })
  } else switch (n !== void 0 && l.push(o.get(n)), t) {
    case "add":
      z(e) ? Bs(n) && l.push(o.get("length")) : (l.push(o.get(Ht)), rn(e) && l.push(o.get(cs)));
      break;
    case "delete":
      z(e) || (l.push(o.get(Ht)), rn(e) && l.push(o.get(cs)));
      break;
    case "set":
      rn(e) && l.push(o.get(Ht));
      break
  }
  Ns();
  for (const a of l) a && Ko(a, 3);
  $s()
}
const Ha = Ls("__proto__,__v_isRef,__isVue"),
  Wo = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Dt)),
  vi = qa();

function qa() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
    e[t] = function(...n) {
      const r = le(this);
      for (let i = 0, o = this.length; i < o; i++) $e(r, "get", i + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(le)) : s
    }
  }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
    e[t] = function(...n) {
      zt(), Ns();
      const r = le(this)[t].apply(this, n);
      return $s(), Wt(), r
    }
  }), e
}

function Ka(e) {
  const t = le(this);
  return $e(t, "has", e), t.hasOwnProperty(e)
}
class Go {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n
  }
  get(t, n, r) {
    const s = this._isReadonly,
      i = this._shallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw") return r === (s ? i ? sc : Xo : i ? Qo : Jo).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = z(t);
    if (!s) {
      if (o && oe(vi, n)) return Reflect.get(vi, n, r);
      if (n === "hasOwnProperty") return Ka
    }
    const l = Reflect.get(t, n, r);
    return (Dt(n) ? Wo.has(n) : Ha(n)) || (s || $e(t, "get", n), i) ? l : Ve(l) ? o && Bs(n) ? l : l.value : pe(l) ? s ? el(l) : qt(l) : l
  }
}
class Zo extends Go {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, s) {
    let i = t[n];
    if (!this._shallow) {
      const a = cn(i);
      if (!cr(r) && !cn(r) && (i = le(i), r = le(r)), !z(t) && Ve(i) && !Ve(r)) return a ? !1 : (i.value = r, !0)
    }
    const o = z(t) && Bs(n) ? Number(n) < t.length : oe(t, n),
      l = Reflect.set(t, n, r, s);
    return t === le(s) && (o ? Bt(r, i) && pt(t, "set", n, r) : pt(t, "add", n, r)), l
  }
  deleteProperty(t, n) {
    const r = oe(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && pt(t, "delete", n, void 0), s
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Dt(n) || !Wo.has(n)) && $e(t, "has", n), r
  }
  ownKeys(t) {
    return $e(t, "iterate", z(t) ? "length" : Ht), Reflect.ownKeys(t)
  }
}
class za extends Go {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const Wa = new Zo,
  Ga = new za,
  Za = new Zo(!0),
  Vs = e => e,
  Er = e => Reflect.getPrototypeOf(e);

function jn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = le(e),
    i = le(t);
  n || (Bt(t, i) && $e(s, "get", t), $e(s, "get", i));
  const {
    has: o
  } = Er(s), l = r ? Vs : n ? Us : An;
  if (o.call(s, t)) return l(e.get(t));
  if (o.call(s, i)) return l(e.get(i));
  e !== s && e.get(t)
}

function Un(e, t = !1) {
  const n = this.__v_raw,
    r = le(n),
    s = le(e);
  return t || (Bt(e, s) && $e(r, "has", e), $e(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Hn(e, t = !1) {
  return e = e.__v_raw, !t && $e(le(e), "iterate", Ht), Reflect.get(e, "size", e)
}

function bi(e) {
  e = le(e);
  const t = le(this);
  return Er(t).has.call(t, e) || (t.add(e), pt(t, "add", e, e)), this
}

function yi(e, t) {
  t = le(t);
  const n = le(this),
    {
      has: r,
      get: s
    } = Er(n);
  let i = r.call(n, e);
  i || (e = le(e), i = r.call(n, e));
  const o = s.call(n, e);
  return n.set(e, t), i ? Bt(t, o) && pt(n, "set", e, t) : pt(n, "add", e, t), this
}

function wi(e) {
  const t = le(this),
    {
      has: n,
      get: r
    } = Er(t);
  let s = n.call(t, e);
  s || (e = le(e), s = n.call(t, e)), r && r.call(t, e);
  const i = t.delete(e);
  return s && pt(t, "delete", e, void 0), i
}

function _i() {
  const e = le(this),
    t = e.size !== 0,
    n = e.clear();
  return t && pt(e, "clear", void 0, void 0), n
}

function qn(e, t) {
  return function(r, s) {
    const i = this,
      o = i.__v_raw,
      l = le(o),
      a = t ? Vs : e ? Us : An;
    return !e && $e(l, "iterate", Ht), o.forEach((u, c) => r.call(s, a(u), a(c), i))
  }
}

function Kn(e, t, n) {
  return function(...r) {
    const s = this.__v_raw,
      i = le(s),
      o = rn(i),
      l = e === "entries" || e === Symbol.iterator && o,
      a = e === "keys" && o,
      u = s[e](...r),
      c = n ? Vs : t ? Us : An;
    return !t && $e(i, "iterate", a ? cs : Ht), {
      next() {
        const {
          value: f,
          done: h
        } = u.next();
        return h ? {
          value: f,
          done: h
        } : {
          value: l ? [c(f[0]), c(f[1])] : c(f),
          done: h
        }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function bt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this
  }
}

function Ja() {
  const e = {
      get(i) {
        return jn(this, i)
      },
      get size() {
        return Hn(this)
      },
      has: Un,
      add: bi,
      set: yi,
      delete: wi,
      clear: _i,
      forEach: qn(!1, !1)
    },
    t = {
      get(i) {
        return jn(this, i, !1, !0)
      },
      get size() {
        return Hn(this)
      },
      has: Un,
      add: bi,
      set: yi,
      delete: wi,
      clear: _i,
      forEach: qn(!1, !0)
    },
    n = {
      get(i) {
        return jn(this, i, !0)
      },
      get size() {
        return Hn(this, !0)
      },
      has(i) {
        return Un.call(this, i, !0)
      },
      add: bt("add"),
      set: bt("set"),
      delete: bt("delete"),
      clear: bt("clear"),
      forEach: qn(!0, !1)
    },
    r = {
      get(i) {
        return jn(this, i, !0, !0)
      },
      get size() {
        return Hn(this, !0)
      },
      has(i) {
        return Un.call(this, i, !0)
      },
      add: bt("add"),
      set: bt("set"),
      delete: bt("delete"),
      clear: bt("clear"),
      forEach: qn(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
    e[i] = Kn(i, !1, !1), n[i] = Kn(i, !0, !1), t[i] = Kn(i, !1, !0), r[i] = Kn(i, !0, !0)
  }), [e, n, t, r]
}
const [Qa, Xa, Ya, ec] = Ja();

function Fs(e, t) {
  const n = t ? e ? ec : Ya : e ? Xa : Qa;
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(oe(n, s) && s in r ? n : r, s, i)
}
const tc = {
    get: Fs(!1, !1)
  },
  nc = {
    get: Fs(!1, !0)
  },
  rc = {
    get: Fs(!0, !1)
  },
  Jo = new WeakMap,
  Qo = new WeakMap,
  Xo = new WeakMap,
  sc = new WeakMap;

function ic(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0
  }
}

function oc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ic(Ra(e))
}

function qt(e) {
  return cn(e) ? e : js(e, !1, Wa, tc, Jo)
}

function Yo(e) {
  return js(e, !1, Za, nc, Qo)
}

function el(e) {
  return js(e, !0, Ga, rc, Xo)
}

function js(e, t, n, r, s) {
  if (!pe(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const i = s.get(e);
  if (i) return i;
  const o = oc(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? r : n);
  return s.set(e, l), l
}

function on(e) {
  return cn(e) ? on(e.__v_raw) : !!(e && e.__v_isReactive)
}

function cn(e) {
  return !!(e && e.__v_isReadonly)
}

function cr(e) {
  return !!(e && e.__v_isShallow)
}

function tl(e) {
  return on(e) || cn(e)
}

function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e
}

function nl(e) {
  return ar(e, "__v_skip", !0), e
}
const An = e => pe(e) ? qt(e) : e,
  Us = e => pe(e) ? el(e) : e;
class rl {
  constructor(t, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Ms(() => t(this._value), () => us(this, 1)), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
  }
  get value() {
    const t = le(this);
    return sl(t), (!t._cacheable || t.effect.dirty) && Bt(t._value, t._value = t.effect.run()) && us(t, 2), t._value
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}

function lc(e, t, n = !1) {
  let r, s;
  const i = Y(e);
  return i ? (r = e, s = Ke) : (r = e.get, s = e.set), new rl(r, s, i || !s, n)
}

function sl(e) {
  Tt && Ut && (e = le(e), qo(Ut, e.dep || (e.dep = zo(() => e.dep = void 0, e instanceof rl ? e : void 0))))
}

function us(e, t = 3, n) {
  e = le(e);
  const r = e.dep;
  r && Ko(r, t)
}

function Ve(e) {
  return !!(e && e.__v_isRef === !0)
}

function Ne(e) {
  return il(e, !1)
}

function ac(e) {
  return il(e, !0)
}

function il(e, t) {
  return Ve(e) ? e : new cc(e, t)
}
class cc {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : le(t), this._value = n ? t : An(t)
  }
  get value() {
    return sl(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || cr(t) || cn(t);
    t = n ? t : le(t), Bt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : An(t), us(this, 3))
  }
}

function Rt(e) {
  return Ve(e) ? e.value : e
}
const uc = {
  get: (e, t, n) => Rt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return Ve(s) && !Ve(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
  }
};

function ol(e) {
  return on(e) ? e : new Proxy(e, uc)
}
/**
 * @vue/runtime-core v3.4.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function Ot(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e()
  } catch (i) {
    Sr(i, t, n)
  }
  return s
}

function Ye(e, t, n, r) {
  if (Y(e)) {
    const i = Ot(e, t, n, r);
    return i && Bo(i) && i.catch(o => {
      Sr(o, t, n)
    }), i
  }
  const s = [];
  for (let i = 0; i < e.length; i++) s.push(Ye(e[i], t, n, r));
  return s
}

function Sr(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      l = "https://vuejs.org/errors/#runtime-".concat(n);
    for (; i;) {
      const u = i.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](e, o, l) === !1) return
      }
      i = i.parent
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Ot(a, null, 10, [e, o, l]);
      return
    }
  }
  fc(e, n, s, r)
}

function fc(e, t, n, r = !0) {
  console.error(e)
}
let Ln = !1,
  fs = !1;
const Le = [];
let ot = 0;
const ln = [];
let _t = null,
  Ft = 0;
const ll = Promise.resolve();
let Hs = null;

function qs(e) {
  const t = Hs || ll;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function dc(e) {
  let t = ot + 1,
    n = Le.length;
  for (; t < n;) {
    const r = t + n >>> 1,
      s = Le[r],
      i = Pn(s);
    i < e || i === e && s.pre ? t = r + 1 : n = r
  }
  return t
}

function Ks(e) {
  (!Le.length || !Le.includes(e, Ln && e.allowRecurse ? ot + 1 : ot)) && (e.id == null ? Le.push(e) : Le.splice(dc(e.id), 0, e), al())
}

function al() {
  !Ln && !fs && (fs = !0, Hs = ll.then(ul))
}

function hc(e) {
  const t = Le.indexOf(e);
  t > ot && Le.splice(t, 1)
}

function pc(e) {
  z(e) ? ln.push(...e) : (!_t || !_t.includes(e, e.allowRecurse ? Ft + 1 : Ft)) && ln.push(e), al()
}

function xi(e, t, n = Ln ? ot + 1 : 0) {
  for (; n < Le.length; n++) {
    const r = Le[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue;
      Le.splice(n, 1), n--, r()
    }
  }
}

function cl(e) {
  if (ln.length) {
    const t = [...new Set(ln)].sort((n, r) => Pn(n) - Pn(r));
    if (ln.length = 0, _t) {
      _t.push(...t);
      return
    }
    for (_t = t, Ft = 0; Ft < _t.length; Ft++) _t[Ft]();
    _t = null, Ft = 0
  }
}
const Pn = e => e.id == null ? 1 / 0 : e.id,
  gc = (e, t) => {
    const n = Pn(e) - Pn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1
    }
    return n
  };

function ul(e) {
  fs = !1, Ln = !0, Le.sort(gc);
  try {
    for (ot = 0; ot < Le.length; ot++) {
      const t = Le[ot];
      t && t.active !== !1 && Ot(t, null, 14)
    }
  } finally {
    ot = 0, Le.length = 0, cl(), Ln = !1, Hs = null, (Le.length || ln.length) && ul()
  }
}

function mc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ge;
  let s = n;
  const i = t.startsWith("update:"),
    o = i && t.slice(7);
  if (o && o in r) {
    const c = "".concat(o === "modelValue" ? "model" : o, "Modifiers"),
      {
        number: f,
        trim: h
      } = r[c] || ge;
    h && (s = n.map(g => ke(g) ? g.trim() : g)), f && (s = n.map(La))
  }
  let l, a = r[l = Vr(t)] || r[l = Vr(ut(t))];
  !a && i && (a = r[l = Vr(gn(t))]), a && Ye(a, e, 6, s);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    e.emitted[l] = !0, Ye(u, e, 6, s)
  }
}

function fl(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {},
    l = !1;
  if (!Y(e)) {
    const a = u => {
      const c = fl(u, t, !0);
      c && (l = !0, Re(o, c))
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
  }
  return !i && !l ? (pe(e) && r.set(e, null), null) : (z(i) ? i.forEach(a => o[a] = null) : Re(o, i), pe(e) && r.set(e, o), o)
}

function Cr(e, t) {
  return !e || !yr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, gn(t)) || oe(e, t))
}
let Se = null,
  dl = null;

function ur(e) {
  const t = Se;
  return Se = e, dl = e && e.type.__scopeId || null, t
}

function At(e, t = Se, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Di(-1);
    const i = ur(t);
    let o;
    try {
      o = e(...s)
    } finally {
      ur(i), r._d && Di(1)
    }
    return o
  };
  return r._n = !0, r._c = !0, r._d = !0, r
}

function jr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: i,
    propsOptions: [o],
    slots: l,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: h,
    setupState: g,
    ctx: m,
    inheritAttrs: y
  } = e;
  let R, T;
  const B = ur(e);
  try {
    if (n.shapeFlag & 4) {
      const Z = s || r,
        H = Z;
      R = it(c.call(H, Z, f, i, g, h, m)), T = a
    } else {
      const Z = t;
      R = it(Z.length > 1 ? Z(i, {
        attrs: a,
        slots: l,
        emit: u
      }) : Z(i, null)), T = t.props ? a : vc(a)
    }
  } catch (Z) {
    Tn.length = 0, Sr(Z, e, 1), R = Te(It)
  }
  let j = R;
  if (T && y !== !1) {
    const Z = Object.keys(T),
      {
        shapeFlag: H
      } = j;
    Z.length && H & 7 && (o && Z.some(Ps) && (T = bc(T, o)), j = un(j, T))
  }
  return n.dirs && (j = un(j), j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs), n.transition && (j.transition = n.transition), R = j, ur(B), R
}
const vc = e => {
    let t;
    for (const n in e)(n === "class" || n === "style" || yr(n)) && ((t || (t = {}))[n] = e[n]);
    return t
  },
  bc = (e, t) => {
    const n = {};
    for (const r in e)(!Ps(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n
  };

function yc(e, t, n) {
  const {
    props: r,
    children: s,
    component: i
  } = e, {
    props: o,
    children: l,
    patchFlag: a
  } = t, u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? ki(r, o, u) : !!o;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        if (o[h] !== r[h] && !Cr(u, h)) return !0
      }
    }
  } else return (s || l) && (!l || !l.$stable) ? !0 : r === o ? !1 : r ? o ? ki(r, o, u) : !0 : !!o;
  return !1
}

function ki(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !Cr(n, i)) return !0
  }
  return !1
}

function wc({
  vnode: e,
  parent: t
}, n) {
  for (; t;) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)(e = t.vnode).el = n, t = t.parent;
    else break
  }
}
const hl = "components";

function _c(e, t) {
  return kc(hl, e, !0, t) || e
}
const xc = Symbol.for("v-ndc");

function kc(e, t, n = !0, r = !1) {
  const s = Se || Pe;
  if (s) {
    const i = s.type;
    if (e === hl) {
      const l = pu(i, !1);
      if (l && (l === t || l === ut(t) || l === xr(ut(t)))) return i
    }
    const o = Ei(s[e] || i[e], t) || Ei(s.appContext[e], t);
    return !o && r ? i : o
  }
}

function Ei(e, t) {
  return e && (e[t] || e[ut(t)] || e[xr(ut(t))])
}
const Ec = e => e.__isSuspense;

function Sc(e, t) {
  t && t.pendingBranch ? z(e) ? t.effects.push(...e) : t.effects.push(e) : pc(e)
}
const Cc = Symbol.for("v-scx"),
  Tc = () => ct(Cc),
  zn = {};

function Lt(e, t, n) {
  return pl(e, t, n)
}

function pl(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: i,
  onTrack: o,
  onTrigger: l
} = ge) {
  if (t && i) {
    const E = t;
    t = (...Q) => {
      E(...Q), H()
    }
  }
  const a = Pe,
    u = E => r === !0 ? E : jt(E, r === !1 ? 1 : void 0);
  let c, f = !1,
    h = !1;
  if (Ve(e) ? (c = () => e.value, f = cr(e)) : on(e) ? (c = () => u(e), f = !0) : z(e) ? (h = !0, f = e.some(E => on(E) || cr(E)), c = () => e.map(E => {
      if (Ve(E)) return E.value;
      if (on(E)) return u(E);
      if (Y(E)) return Ot(E, a, 2)
    })) : Y(e) ? t ? c = () => Ot(e, a, 2) : c = () => (g && g(), Ye(e, a, 3, [m])) : c = Ke, t && r) {
    const E = c;
    c = () => jt(E())
  }
  let g, m = E => {
      g = j.onStop = () => {
        Ot(E, a, 4), g = j.onStop = void 0
      }
    },
    y;
  if (Ar)
    if (m = Ke, t ? n && Ye(t, a, 3, [c(), h ? [] : void 0, m]) : c(), s === "sync") {
      const E = Tc();
      y = E.__watcherHandles || (E.__watcherHandles = [])
    } else return Ke;
  let R = h ? new Array(e.length).fill(zn) : zn;
  const T = () => {
    if (!(!j.active || !j.dirty))
      if (t) {
        const E = j.run();
        (r || f || (h ? E.some((Q, ye) => Bt(Q, R[ye])) : Bt(E, R))) && (g && g(), Ye(t, a, 3, [E, R === zn ? void 0 : h && R[0] === zn ? [] : R, m]), R = E)
      } else j.run()
  };
  T.allowRecurse = !!t;
  let B;
  s === "sync" ? B = T : s === "post" ? B = () => Me(T, a && a.suspense) : (T.pre = !0, a && (T.id = a.uid), B = () => Ks(T));
  const j = new Ms(c, Ke, B),
    Z = jo(),
    H = () => {
      j.stop(), Z && Ds(Z.effects, j)
    };
  return t ? n ? T() : R = j.run() : s === "post" ? Me(j.run.bind(j), a && a.suspense) : j.run(), y && y.push(H), H
}

function Rc(e, t, n) {
  const r = this.proxy,
    s = ke(e) ? e.includes(".") ? gl(r, e) : () => r[e] : e.bind(r, r);
  let i;
  Y(t) ? i = t : (i = t.handler, n = t);
  const o = Nn(this),
    l = pl(s, i.bind(r), n);
  return o(), l
}

function gl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r
  }
}

function jt(e, t, n = 0, r) {
  if (!pe(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++
  }
  if (r = r || new Set, r.has(e)) return e;
  if (r.add(e), Ve(e)) jt(e.value, t, n, r);
  else if (z(e))
    for (let s = 0; s < e.length; s++) jt(e[s], t, n, r);
  else if (wr(e) || rn(e)) e.forEach(s => {
    jt(s, t, n, r)
  });
  else if (Mo(e))
    for (const s in e) jt(e[s], t, n, r);
  return e
}

function Oc(e, t) {
  if (Se === null) return e;
  const n = Lr(Se) || Se.proxy,
    r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, o, l, a = ge] = t[s];
    i && (Y(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && jt(o), r.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }))
  }
  return e
}

function Nt(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[r];
    a && (zt(), Ye(a, n, 8, [e.el, l, e, t]), Wt())
  }
} /*! #__NO_SIDE_EFFECTS__ */
function qe(e, t) {
  return Y(e) ? Re({
    name: e.name
  }, t, {
    setup: e
  }) : e
}
const Sn = e => !!e.type.__asyncLoader,
  ml = e => e.type.__isKeepAlive;

function Ac(e, t) {
  vl(e, "a", t)
}

function Lc(e, t) {
  vl(e, "da", t)
}

function vl(e, t, n = Pe) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s;) {
      if (s.isDeactivated) return;
      s = s.parent
    }
    return e()
  });
  if (Tr(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent;) ml(s.parent.vnode) && Pc(r, t, n, s), s = s.parent
  }
}

function Pc(e, t, n, r) {
  const s = Tr(t, e, r, !0);
  bl(() => {
    Ds(r[t], s)
  }, n)
}

function Tr(e, t, n = Pe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i = t.__weh || (t.__weh = (...o) => {
        if (n.isUnmounted) return;
        zt();
        const l = Nn(n),
          a = Ye(t, n, e, o);
        return l(), Wt(), a
      });
    return r ? s.unshift(i) : s.push(i), i
  }
}
const mt = e => (t, n = Pe) => (!Ar || e === "sp") && Tr(e, (...r) => t(...r), n),
  zs = mt("bm"),
  Ws = mt("m"),
  Dc = mt("bu"),
  Bc = mt("u"),
  Gs = mt("bum"),
  bl = mt("um"),
  Ic = mt("sp"),
  Mc = mt("rtg"),
  Nc = mt("rtc");

function $c(e, t = Pe) {
  Tr("ec", e, t)
}

function yl(e, t, n, r) {
  let s;
  const i = n && n[r];
  if (z(e) || ke(e)) {
    s = new Array(e.length);
    for (let o = 0, l = e.length; o < l; o++) s[o] = t(e[o], o, void 0, i && i[o])
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i && i[o])
  } else if (pe(e))
    if (e[Symbol.iterator]) s = Array.from(e, (o, l) => t(o, l, void 0, i && i[l]));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let l = 0, a = o.length; l < a; l++) {
        const u = o[l];
        s[l] = t(e[u], u, l, i && i[l])
      }
    }
  else s = [];
  return n && (n[r] = s), s
}

function Zs(e, t, n = {}, r, s) {
  if (Se.isCE || Se.parent && Sn(Se.parent) && Se.parent.isCE) return t !== "default" && (n.name = t), Te("slot", n, r && r());
  let i = e[t];
  i && i._c && (i._d = !1), G();
  const o = i && wl(i(n)),
    l = lt(_e, {
      key: n.key || o && o.key || "_".concat(t)
    }, o || (r ? r() : []), o && e._ === 1 ? 64 : -2);
  return !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l
}

function wl(e) {
  return e.some(t => hr(t) ? !(t.type === It || t.type === _e && !wl(t.children)) : !0) ? e : null
}
const ds = e => e ? Pl(e) ? Lr(e) || e.proxy : ds(e.parent) : null,
  Cn = Re(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => ds(e.parent),
    $root: e => ds(e.root),
    $emit: e => e.emit,
    $options: e => Js(e),
    $forceUpdate: e => e.f || (e.f = () => {
      e.effect.dirty = !0, Ks(e.update)
    }),
    $nextTick: e => e.n || (e.n = qs.bind(e.proxy)),
    $watch: e => Rc.bind(e)
  }),
  Ur = (e, t) => e !== ge && !e.__isScriptSetup && oe(e, t),
  Vc = {
    get({
      _: e
    }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: i,
        accessCache: o,
        type: l,
        appContext: a
      } = e;
      let u;
      if (t[0] !== "$") {
        const g = o[t];
        if (g !== void 0) switch (g) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t]
        } else {
          if (Ur(r, t)) return o[t] = 1, r[t];
          if (s !== ge && oe(s, t)) return o[t] = 2, s[t];
          if ((u = e.propsOptions[0]) && oe(u, t)) return o[t] = 3, i[t];
          if (n !== ge && oe(n, t)) return o[t] = 4, n[t];
          hs && (o[t] = 0)
        }
      }
      const c = Cn[t];
      let f, h;
      if (c) return t === "$attrs" && $e(e, "get", t), c(e);
      if ((f = l.__cssModules) && (f = f[t])) return f;
      if (n !== ge && oe(n, t)) return o[t] = 4, n[t];
      if (h = a.config.globalProperties, oe(h, t)) return h[t]
    },
    set({
      _: e
    }, t, n) {
      const {
        data: r,
        setupState: s,
        ctx: i
      } = e;
      return Ur(s, t) ? (s[t] = n, !0) : r !== ge && oe(r, t) ? (r[t] = n, !0) : oe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
    },
    has({
      _: {
        data: e,
        setupState: t,
        accessCache: n,
        ctx: r,
        appContext: s,
        propsOptions: i
      }
    }, o) {
      let l;
      return !!n[o] || e !== ge && oe(e, o) || Ur(t, o) || (l = i[0]) && oe(l, o) || oe(r, o) || oe(Cn, o) || oe(s.config.globalProperties, o)
    },
    defineProperty(e, t, n) {
      return n.get != null ? e._.accessCache[t] = 0 : oe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
  };

function Si(e) {
  return z(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let hs = !0;

function Fc(e) {
  const t = Js(e),
    n = e.proxy,
    r = e.ctx;
  hs = !1, t.beforeCreate && Ci(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: g,
    updated: m,
    activated: y,
    deactivated: R,
    beforeDestroy: T,
    beforeUnmount: B,
    destroyed: j,
    unmounted: Z,
    render: H,
    renderTracked: E,
    renderTriggered: Q,
    errorCaptured: ye,
    serverPrefetch: xe,
    expose: de,
    inheritAttrs: he,
    components: Ge,
    directives: Ce,
    filters: Mt
  } = t;
  if (u && jc(u, r, null), o)
    for (const ae in o) {
      const re = o[ae];
      Y(re) && (r[ae] = re.bind(n))
    }
  if (s) {
    const ae = s.call(n, n);
    pe(ae) && (e.data = qt(ae))
  }
  if (hs = !0, i)
    for (const ae in i) {
      const re = i[ae],
        tt = Y(re) ? re.bind(n, n) : Y(re.get) ? re.get.bind(n, n) : Ke,
        nt = !Y(re) && Y(re.set) ? re.set.bind(n) : Ke,
        Fe = He({
          get: tt,
          set: nt
        });
      Object.defineProperty(r, ae, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: Oe => Fe.value = Oe
      })
    }
  if (l)
    for (const ae in l) _l(l[ae], r, n, ae);
  if (a) {
    const ae = Y(a) ? a.call(n) : a;
    Reflect.ownKeys(ae).forEach(re => {
      tr(re, ae[re])
    })
  }
  c && Ci(c, e, "c");

  function ve(ae, re) {
    z(re) ? re.forEach(tt => ae(tt.bind(n))) : re && ae(re.bind(n))
  }
  if (ve(zs, f), ve(Ws, h), ve(Dc, g), ve(Bc, m), ve(Ac, y), ve(Lc, R), ve($c, ye), ve(Nc, E), ve(Mc, Q), ve(Gs, B), ve(bl, Z), ve(Ic, xe), z(de))
    if (de.length) {
      const ae = e.exposed || (e.exposed = {});
      de.forEach(re => {
        Object.defineProperty(ae, re, {
          get: () => n[re],
          set: tt => n[re] = tt
        })
      })
    } else e.exposed || (e.exposed = {});
  H && e.render === Ke && (e.render = H), he != null && (e.inheritAttrs = he), Ge && (e.components = Ge), Ce && (e.directives = Ce)
}

function jc(e, t, n = Ke) {
  z(e) && (e = ps(e));
  for (const r in e) {
    const s = e[r];
    let i;
    pe(s) ? "default" in s ? i = ct(s.from || r, s.default, !0) : i = ct(s.from || r) : i = ct(s), Ve(i) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: o => i.value = o
    }) : t[r] = i
  }
}

function Ci(e, t, n) {
  Ye(z(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function _l(e, t, n, r) {
  const s = r.includes(".") ? gl(n, r) : () => n[r];
  if (ke(e)) {
    const i = t[e];
    Y(i) && Lt(s, i)
  } else if (Y(e)) Lt(s, e.bind(n));
  else if (pe(e))
    if (z(e)) e.forEach(i => _l(i, t, n, r));
    else {
      const i = Y(e.handler) ? e.handler.bind(n) : t[e.handler];
      Y(i) && Lt(s, i, e)
    }
}

function Js(e) {
  const t = e.type,
    {
      mixins: n,
      extends: r
    } = t,
    {
      mixins: s,
      optionsCache: i,
      config: {
        optionMergeStrategies: o
      }
    } = e.appContext,
    l = i.get(t);
  let a;
  return l ? a = l : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(u => fr(a, u, o, !0)), fr(a, t, o)), pe(t) && i.set(t, a), a
}

function fr(e, t, n, r = !1) {
  const {
    mixins: s,
    extends: i
  } = t;
  i && fr(e, i, n, !0), s && s.forEach(o => fr(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const l = Uc[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o]
    } return e
}
const Uc = {
  data: Ti,
  props: Ri,
  emits: Ri,
  methods: xn,
  computed: xn,
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  components: xn,
  directives: xn,
  watch: qc,
  provide: Ti,
  inject: Hc
};

function Ti(e, t) {
  return t ? e ? function() {
    return Re(Y(e) ? e.call(this, this) : e, Y(t) ? t.call(this, this) : t)
  } : t : e
}

function Hc(e, t) {
  return xn(ps(e), ps(t))
}

function ps(e) {
  if (z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function De(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}

function xn(e, t) {
  return e ? Re(Object.create(null), e, t) : t
}

function Ri(e, t) {
  return e ? z(e) && z(t) ? [...new Set([...e, ...t])] : Re(Object.create(null), Si(e), Si(t != null ? t : {})) : t
}

function qc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Re(Object.create(null), e);
  for (const r in t) n[r] = De(e[r], t[r]);
  return n
}

function xl() {
  return {
    app: null,
    config: {
      isNativeTag: Ca,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let Kc = 0;

function zc(e, t) {
  return function(r, s = null) {
    Y(r) || (r = Re({}, r)), s != null && !pe(s) && (s = null);
    const i = xl(),
      o = new WeakSet;
    let l = !1;
    const a = i.app = {
      _uid: Kc++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: mu,
      get config() {
        return i.config
      },
      set config(u) {},
      use(u, ...c) {
        return o.has(u) || (u && Y(u.install) ? (o.add(u), u.install(a, ...c)) : Y(u) && (o.add(u), u(a, ...c))), a
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), a
      },
      component(u, c) {
        return c ? (i.components[u] = c, a) : i.components[u]
      },
      directive(u, c) {
        return c ? (i.directives[u] = c, a) : i.directives[u]
      },
      mount(u, c, f) {
        if (!l) {
          const h = Te(r, s);
          return h.appContext = i, f === !0 ? f = "svg" : f === !1 && (f = void 0), c && t ? t(h, u) : e(h, u, f), l = !0, a._container = u, u.__vue_app__ = a, Lr(h.component) || h.component.proxy
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__)
      },
      provide(u, c) {
        return i.provides[u] = c, a
      },
      runWithContext(u) {
        dr = a;
        try {
          return u()
        } finally {
          dr = null
        }
      }
    };
    return a
  }
}
let dr = null;

function tr(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const r = Pe.parent && Pe.parent.provides;
    r === n && (n = Pe.provides = Object.create(r)), n[e] = t
  }
}

function ct(e, t, n = !1) {
  const r = Pe || Se;
  if (r || dr) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : dr._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && Y(t) ? t.call(r && r.proxy) : t
  }
}

function Wc(e, t, n, r = !1) {
  const s = {},
    i = {};
  ar(i, Or, 1), e.propsDefaults = Object.create(null), kl(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? e.props = r ? s : Yo(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i
}

function Gc(e, t, n, r) {
  const {
    props: s,
    attrs: i,
    vnode: {
      patchFlag: o
    }
  } = e, l = le(s), [a] = e.propsOptions;
  let u = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let h = c[f];
        if (Cr(e.emitsOptions, h)) continue;
        const g = t[h];
        if (a)
          if (oe(i, h)) g !== i[h] && (i[h] = g, u = !0);
          else {
            const m = ut(h);
            s[m] = gs(a, l, m, g, e, !1)
          }
        else g !== i[h] && (i[h] = g, u = !0)
      }
    }
  } else {
    kl(e, t, s, i) && (u = !0);
    let c;
    for (const f in l)(!t || !oe(t, f) && ((c = gn(f)) === f || !oe(t, c))) && (a ? n && (n[f] !== void 0 || n[c] !== void 0) && (s[f] = gs(a, l, f, void 0, e, !0)) : delete s[f]);
    if (i !== l)
      for (const f in i)(!t || !oe(t, f)) && (delete i[f], u = !0)
  }
  u && pt(e, "set", "$attrs")
}

function kl(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let a in t) {
      if (Yn(a)) continue;
      const u = t[a];
      let c;
      s && oe(s, c = ut(a)) ? !i || !i.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Cr(e.emitsOptions, a) || (!(a in r) || u !== r[a]) && (r[a] = u, o = !0)
    }
  if (i) {
    const a = le(n),
      u = l || ge;
    for (let c = 0; c < i.length; c++) {
      const f = i[c];
      n[f] = gs(s, a, f, u[f], e, !oe(u, f))
    }
  }
  return o
}

function gs(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const l = oe(o, "default");
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Y(a)) {
        const {
          propsDefaults: u
        } = s;
        if (n in u) r = u[n];
        else {
          const c = Nn(s);
          r = u[n] = a.call(null, t), c()
        }
      } else r = a
    }
    o[0] && (i && !l ? r = !1 : o[1] && (r === "" || r === gn(n)) && (r = !0))
  }
  return r
}

function El(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const i = e.props,
    o = {},
    l = [];
  let a = !1;
  if (!Y(e)) {
    const c = f => {
      a = !0;
      const [h, g] = El(f, t, !0);
      Re(o, h), g && l.push(...g)
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
  }
  if (!i && !a) return pe(e) && r.set(e, nn), nn;
  if (z(i))
    for (let c = 0; c < i.length; c++) {
      const f = ut(i[c]);
      Oi(f) && (o[f] = ge)
    } else if (i)
      for (const c in i) {
        const f = ut(c);
        if (Oi(f)) {
          const h = i[c],
            g = o[f] = z(h) || Y(h) ? {
              type: h
            } : Re({}, h);
          if (g) {
            const m = Pi(Boolean, g.type),
              y = Pi(String, g.type);
            g[0] = m > -1, g[1] = y < 0 || m < y, (m > -1 || oe(g, "default")) && l.push(f)
          }
        }
      }
  const u = [o, l];
  return pe(e) && r.set(e, u), u
}

function Oi(e) {
  return e[0] !== "$"
}

function Ai(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : ""
}

function Li(e, t) {
  return Ai(e) === Ai(t)
}

function Pi(e, t) {
  return z(t) ? t.findIndex(n => Li(n, e)) : Y(t) && Li(t, e) ? 0 : -1
}
const Sl = e => e[0] === "_" || e === "$stable",
  Qs = e => z(e) ? e.map(it) : [it(e)],
  Zc = (e, t, n) => {
    if (t._n) return t;
    const r = At((...s) => Qs(t(...s)), n);
    return r._c = !1, r
  },
  Cl = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Sl(s)) continue;
      const i = e[s];
      if (Y(i)) t[s] = Zc(s, i, r);
      else if (i != null) {
        const o = Qs(i);
        t[s] = () => o
      }
    }
  },
  Tl = (e, t) => {
    const n = Qs(t);
    e.slots.default = () => n
  },
  Jc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? (e.slots = le(t), ar(t, "_", n)) : Cl(t, e.slots = {})
    } else e.slots = {}, t && Tl(e, t);
    ar(e.slots, Or, 1)
  },
  Qc = (e, t, n) => {
    const {
      vnode: r,
      slots: s
    } = e;
    let i = !0,
      o = ge;
    if (r.shapeFlag & 32) {
      const l = t._;
      l ? n && l === 1 ? i = !1 : (Re(s, t), !n && l === 1 && delete s._) : (i = !t.$stable, Cl(t, s)), o = t
    } else t && (Tl(e, t), o = {
      default: 1
    });
    if (i)
      for (const l in s) !Sl(l) && o[l] == null && delete s[l]
  };

function ms(e, t, n, r, s = !1) {
  if (z(e)) {
    e.forEach((h, g) => ms(h, t && (z(t) ? t[g] : t), n, r, s));
    return
  }
  if (Sn(r) && !s) return;
  const i = r.shapeFlag & 4 ? Lr(r.component) || r.component.proxy : r.el,
    o = s ? null : i,
    {
      i: l,
      r: a
    } = e,
    u = t && t.r,
    c = l.refs === ge ? l.refs = {} : l.refs,
    f = l.setupState;
  if (u != null && u !== a && (ke(u) ? (c[u] = null, oe(f, u) && (f[u] = null)) : Ve(u) && (u.value = null)), Y(a)) Ot(a, l, 12, [o, c]);
  else {
    const h = ke(a),
      g = Ve(a);
    if (h || g) {
      const m = () => {
        if (e.f) {
          const y = h ? oe(f, a) ? f[a] : c[a] : a.value;
          s ? z(y) && Ds(y, i) : z(y) ? y.includes(i) || y.push(i) : h ? (c[a] = [i], oe(f, a) && (f[a] = c[a])) : (a.value = [i], e.k && (c[e.k] = a.value))
        } else h ? (c[a] = o, oe(f, a) && (f[a] = o)) : g && (a.value = o, e.k && (c[e.k] = o))
      };
      o ? (m.id = -1, Me(m, n)) : m()
    }
  }
}
const Me = Sc;

function Xc(e) {
  return Yc(e)
}

function Yc(e, t) {
  const n = No();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: f,
    nextSibling: h,
    setScopeId: g = Ke,
    insertStaticContent: m
  } = e, y = (d, p, b, C = null, x = null, I = null, N = void 0, D = null, M = !!p.dynamicChildren) => {
    if (d === p) return;
    d && !yn(d, p) && (C = v(d), Oe(d, x, I, !0), d = null), p.patchFlag === -2 && (M = !1, p.dynamicChildren = null);
    const {
      type: A,
      ref: F,
      shapeFlag: K
    } = p;
    switch (A) {
      case Rr:
        R(d, p, b, C);
        break;
      case It:
        T(d, p, b, C);
        break;
      case qr:
        d == null && B(p, b, C, N);
        break;
      case _e:
        Ge(d, p, b, C, x, I, N, D, M);
        break;
      default:
        K & 1 ? H(d, p, b, C, x, I, N, D, M) : K & 6 ? Ce(d, p, b, C, x, I, N, D, M) : (K & 64 || K & 128) && A.process(d, p, b, C, x, I, N, D, M, $)
    }
    F != null && x && ms(F, d && d.ref, I, p || d, !p)
  }, R = (d, p, b, C) => {
    if (d == null) r(p.el = l(p.children), b, C);
    else {
      const x = p.el = d.el;
      p.children !== d.children && u(x, p.children)
    }
  }, T = (d, p, b, C) => {
    d == null ? r(p.el = a(p.children || ""), b, C) : p.el = d.el
  }, B = (d, p, b, C) => {
    [d.el, d.anchor] = m(d.children, p, b, C, d.el, d.anchor)
  }, j = ({
    el: d,
    anchor: p
  }, b, C) => {
    let x;
    for (; d && d !== p;) x = h(d), r(d, b, C), d = x;
    r(p, b, C)
  }, Z = ({
    el: d,
    anchor: p
  }) => {
    let b;
    for (; d && d !== p;) b = h(d), s(d), d = b;
    s(p)
  }, H = (d, p, b, C, x, I, N, D, M) => {
    p.type === "svg" ? N = "svg" : p.type === "math" && (N = "mathml"), d == null ? E(p, b, C, x, I, N, D, M) : xe(d, p, x, I, N, D, M)
  }, E = (d, p, b, C, x, I, N, D) => {
    let M, A;
    const {
      props: F,
      shapeFlag: K,
      transition: q,
      dirs: J
    } = d;
    if (M = d.el = o(d.type, I, F && F.is, F), K & 8 ? c(M, d.children) : K & 16 && ye(d.children, M, null, C, x, Hr(d, I), N, D), J && Nt(d, null, C, "created"), Q(M, d, d.scopeId, N, C), F) {
      for (const ue in F) ue !== "value" && !Yn(ue) && i(M, ue, null, F[ue], I, d.children, C, x, V);
      "value" in F && i(M, "value", null, F.value, I), (A = F.onVnodeBeforeMount) && st(A, C, d)
    }
    J && Nt(d, null, C, "beforeMount");
    const se = eu(x, q);
    se && q.beforeEnter(M), r(M, p, b), ((A = F && F.onVnodeMounted) || se || J) && Me(() => {
      A && st(A, C, d), se && q.enter(M), J && Nt(d, null, C, "mounted")
    }, x)
  }, Q = (d, p, b, C, x) => {
    if (b && g(d, b), C)
      for (let I = 0; I < C.length; I++) g(d, C[I]);
    if (x) {
      let I = x.subTree;
      if (p === I) {
        const N = x.vnode;
        Q(d, N, N.scopeId, N.slotScopeIds, x.parent)
      }
    }
  }, ye = (d, p, b, C, x, I, N, D, M = 0) => {
    for (let A = M; A < d.length; A++) {
      const F = d[A] = D ? xt(d[A]) : it(d[A]);
      y(null, F, p, b, C, x, I, N, D)
    }
  }, xe = (d, p, b, C, x, I, N) => {
    const D = p.el = d.el;
    let {
      patchFlag: M,
      dynamicChildren: A,
      dirs: F
    } = p;
    M |= d.patchFlag & 16;
    const K = d.props || ge,
      q = p.props || ge;
    let J;
    if (b && $t(b, !1), (J = q.onVnodeBeforeUpdate) && st(J, b, p, d), F && Nt(p, d, b, "beforeUpdate"), b && $t(b, !0), A ? de(d.dynamicChildren, A, D, b, C, Hr(p, x), I) : N || re(d, p, D, null, b, C, Hr(p, x), I, !1), M > 0) {
      if (M & 16) he(D, p, K, q, b, C, x);
      else if (M & 2 && K.class !== q.class && i(D, "class", null, q.class, x), M & 4 && i(D, "style", K.style, q.style, x), M & 8) {
        const se = p.dynamicProps;
        for (let ue = 0; ue < se.length; ue++) {
          const me = se[ue],
            Ee = K[me],
            Ze = q[me];
          (Ze !== Ee || me === "value") && i(D, me, Ee, Ze, x, d.children, b, C, V)
        }
      }
      M & 1 && d.children !== p.children && c(D, p.children)
    } else !N && A == null && he(D, p, K, q, b, C, x);
    ((J = q.onVnodeUpdated) || F) && Me(() => {
      J && st(J, b, p, d), F && Nt(p, d, b, "updated")
    }, C)
  }, de = (d, p, b, C, x, I, N) => {
    for (let D = 0; D < p.length; D++) {
      const M = d[D],
        A = p[D],
        F = M.el && (M.type === _e || !yn(M, A) || M.shapeFlag & 70) ? f(M.el) : b;
      y(M, A, F, null, C, x, I, N, !0)
    }
  }, he = (d, p, b, C, x, I, N) => {
    if (b !== C) {
      if (b !== ge)
        for (const D in b) !Yn(D) && !(D in C) && i(d, D, b[D], null, N, p.children, x, I, V);
      for (const D in C) {
        if (Yn(D)) continue;
        const M = C[D],
          A = b[D];
        M !== A && D !== "value" && i(d, D, A, M, N, p.children, x, I, V)
      }
      "value" in C && i(d, "value", b.value, C.value, N)
    }
  }, Ge = (d, p, b, C, x, I, N, D, M) => {
    const A = p.el = d ? d.el : l(""),
      F = p.anchor = d ? d.anchor : l("");
    let {
      patchFlag: K,
      dynamicChildren: q,
      slotScopeIds: J
    } = p;
    J && (D = D ? D.concat(J) : J), d == null ? (r(A, b, C), r(F, b, C), ye(p.children || [], b, F, x, I, N, D, M)) : K > 0 && K & 64 && q && d.dynamicChildren ? (de(d.dynamicChildren, q, b, x, I, N, D), (p.key != null || x && p === x.subTree) && Rl(d, p, !0)) : re(d, p, b, F, x, I, N, D, M)
  }, Ce = (d, p, b, C, x, I, N, D, M) => {
    p.slotScopeIds = D, d == null ? p.shapeFlag & 512 ? x.ctx.activate(p, b, C, N, M) : Mt(p, b, C, x, I, N, M) : vt(d, p, M)
  }, Mt = (d, p, b, C, x, I, N) => {
    const D = d.component = cu(d, C, x);
    if (ml(d) && (D.ctx.renderer = $), uu(D), D.asyncDep) {
      if (x && x.registerDep(D, ve), !d.el) {
        const M = D.subTree = Te(It);
        T(null, M, p, b)
      }
    } else ve(D, d, p, b, x, I, N)
  }, vt = (d, p, b) => {
    const C = p.component = d.component;
    if (yc(d, p, b))
      if (C.asyncDep && !C.asyncResolved) {
        ae(C, p, b);
        return
      } else C.next = p, hc(C.update), C.effect.dirty = !0, C.update();
    else p.el = d.el, C.vnode = p
  }, ve = (d, p, b, C, x, I, N) => {
    const D = () => {
        if (d.isMounted) {
          let {
            next: F,
            bu: K,
            u: q,
            parent: J,
            vnode: se
          } = d;
          {
            const Gt = Ol(d);
            if (Gt) {
              F && (F.el = se.el, ae(d, F, N)), Gt.asyncDep.then(() => {
                d.isUnmounted || D()
              });
              return
            }
          }
          let ue = F,
            me;
          $t(d, !1), F ? (F.el = se.el, ae(d, F, N)) : F = se, K && er(K), (me = F.props && F.props.onVnodeBeforeUpdate) && st(me, J, F, se), $t(d, !0);
          const Ee = jr(d),
            Ze = d.subTree;
          d.subTree = Ee, y(Ze, Ee, f(Ze.el), v(Ze), d, x, I), F.el = Ee.el, ue === null && wc(d, Ee.el), q && Me(q, x), (me = F.props && F.props.onVnodeUpdated) && Me(() => st(me, J, F, se), x)
        } else {
          let F;
          const {
            el: K,
            props: q
          } = p, {
            bm: J,
            m: se,
            parent: ue
          } = d, me = Sn(p);
          if ($t(d, !1), J && er(J), !me && (F = q && q.onVnodeBeforeMount) && st(F, ue, p), $t(d, !0), K && X) {
            const Ee = () => {
              d.subTree = jr(d), X(K, d.subTree, d, x, null)
            };
            me ? p.type.__asyncLoader().then(() => !d.isUnmounted && Ee()) : Ee()
          } else {
            const Ee = d.subTree = jr(d);
            y(null, Ee, b, C, d, x, I), p.el = Ee.el
          }
          if (se && Me(se, x), !me && (F = q && q.onVnodeMounted)) {
            const Ee = p;
            Me(() => st(F, ue, Ee), x)
          }(p.shapeFlag & 256 || ue && Sn(ue.vnode) && ue.vnode.shapeFlag & 256) && d.a && Me(d.a, x), d.isMounted = !0, p = b = C = null
        }
      },
      M = d.effect = new Ms(D, Ke, () => Ks(A), d.scope),
      A = d.update = () => {
        M.dirty && M.run()
      };
    A.id = d.uid, $t(d, !0), A()
  }, ae = (d, p, b) => {
    p.component = d;
    const C = d.vnode.props;
    d.vnode = p, d.next = null, Gc(d, p.props, C, b), Qc(d, p.children, b), zt(), xi(d), Wt()
  }, re = (d, p, b, C, x, I, N, D, M = !1) => {
    const A = d && d.children,
      F = d ? d.shapeFlag : 0,
      K = p.children,
      {
        patchFlag: q,
        shapeFlag: J
      } = p;
    if (q > 0) {
      if (q & 128) {
        nt(A, K, b, C, x, I, N, D, M);
        return
      } else if (q & 256) {
        tt(A, K, b, C, x, I, N, D, M);
        return
      }
    }
    J & 8 ? (F & 16 && V(A, x, I), K !== A && c(b, K)) : F & 16 ? J & 16 ? nt(A, K, b, C, x, I, N, D, M) : V(A, x, I, !0) : (F & 8 && c(b, ""), J & 16 && ye(K, b, C, x, I, N, D, M))
  }, tt = (d, p, b, C, x, I, N, D, M) => {
    d = d || nn, p = p || nn;
    const A = d.length,
      F = p.length,
      K = Math.min(A, F);
    let q;
    for (q = 0; q < K; q++) {
      const J = p[q] = M ? xt(p[q]) : it(p[q]);
      y(d[q], J, b, null, x, I, N, D, M)
    }
    A > F ? V(d, x, I, !0, !1, K) : ye(p, b, C, x, I, N, D, M, K)
  }, nt = (d, p, b, C, x, I, N, D, M) => {
    let A = 0;
    const F = p.length;
    let K = d.length - 1,
      q = F - 1;
    for (; A <= K && A <= q;) {
      const J = d[A],
        se = p[A] = M ? xt(p[A]) : it(p[A]);
      if (yn(J, se)) y(J, se, b, null, x, I, N, D, M);
      else break;
      A++
    }
    for (; A <= K && A <= q;) {
      const J = d[K],
        se = p[q] = M ? xt(p[q]) : it(p[q]);
      if (yn(J, se)) y(J, se, b, null, x, I, N, D, M);
      else break;
      K--, q--
    }
    if (A > K) {
      if (A <= q) {
        const J = q + 1,
          se = J < F ? p[J].el : C;
        for (; A <= q;) y(null, p[A] = M ? xt(p[A]) : it(p[A]), b, se, x, I, N, D, M), A++
      }
    } else if (A > q)
      for (; A <= K;) Oe(d[A], x, I, !0), A++;
    else {
      const J = A,
        se = A,
        ue = new Map;
      for (A = se; A <= q; A++) {
        const je = p[A] = M ? xt(p[A]) : it(p[A]);
        je.key != null && ue.set(je.key, A)
      }
      let me, Ee = 0;
      const Ze = q - se + 1;
      let Gt = !1,
        ci = 0;
      const bn = new Array(Ze);
      for (A = 0; A < Ze; A++) bn[A] = 0;
      for (A = J; A <= K; A++) {
        const je = d[A];
        if (Ee >= Ze) {
          Oe(je, x, I, !0);
          continue
        }
        let rt;
        if (je.key != null) rt = ue.get(je.key);
        else
          for (me = se; me <= q; me++)
            if (bn[me - se] === 0 && yn(je, p[me])) {
              rt = me;
              break
            } rt === void 0 ? Oe(je, x, I, !0) : (bn[rt - se] = A + 1, rt >= ci ? ci = rt : Gt = !0, y(je, p[rt], b, null, x, I, N, D, M), Ee++)
      }
      const ui = Gt ? tu(bn) : nn;
      for (me = ui.length - 1, A = Ze - 1; A >= 0; A--) {
        const je = se + A,
          rt = p[je],
          fi = je + 1 < F ? p[je + 1].el : C;
        bn[A] === 0 ? y(null, rt, b, fi, x, I, N, D, M) : Gt && (me < 0 || A !== ui[me] ? Fe(rt, b, fi, 2) : me--)
      }
    }
  }, Fe = (d, p, b, C, x = null) => {
    const {
      el: I,
      type: N,
      transition: D,
      children: M,
      shapeFlag: A
    } = d;
    if (A & 6) {
      Fe(d.component.subTree, p, b, C);
      return
    }
    if (A & 128) {
      d.suspense.move(p, b, C);
      return
    }
    if (A & 64) {
      N.move(d, p, b, $);
      return
    }
    if (N === _e) {
      r(I, p, b);
      for (let K = 0; K < M.length; K++) Fe(M[K], p, b, C);
      r(d.anchor, p, b);
      return
    }
    if (N === qr) {
      j(d, p, b);
      return
    }
    if (C !== 2 && A & 1 && D)
      if (C === 0) D.beforeEnter(I), r(I, p, b), Me(() => D.enter(I), x);
      else {
        const {
          leave: K,
          delayLeave: q,
          afterLeave: J
        } = D, se = () => r(I, p, b), ue = () => {
          K(I, () => {
            se(), J && J()
          })
        };
        q ? q(I, se, ue) : ue()
      }
    else r(I, p, b)
  }, Oe = (d, p, b, C = !1, x = !1) => {
    const {
      type: I,
      props: N,
      ref: D,
      children: M,
      dynamicChildren: A,
      shapeFlag: F,
      patchFlag: K,
      dirs: q
    } = d;
    if (D != null && ms(D, null, b, d, !0), F & 256) {
      p.ctx.deactivate(d);
      return
    }
    const J = F & 1 && q,
      se = !Sn(d);
    let ue;
    if (se && (ue = N && N.onVnodeBeforeUnmount) && st(ue, p, d), F & 6) L(d.component, b, C);
    else {
      if (F & 128) {
        d.suspense.unmount(b, C);
        return
      }
      J && Nt(d, null, p, "beforeUnmount"), F & 64 ? d.type.remove(d, p, b, x, $, C) : A && (I !== _e || K > 0 && K & 64) ? V(A, p, b, !1, !0) : (I === _e && K & 384 || !x && F & 16) && V(M, p, b), C && _(d)
    }(se && (ue = N && N.onVnodeUnmounted) || J) && Me(() => {
      ue && st(ue, p, d), J && Nt(d, null, p, "unmounted")
    }, b)
  }, _ = d => {
    const {
      type: p,
      el: b,
      anchor: C,
      transition: x
    } = d;
    if (p === _e) {
      U(b, C);
      return
    }
    if (p === qr) {
      Z(d);
      return
    }
    const I = () => {
      s(b), x && !x.persisted && x.afterLeave && x.afterLeave()
    };
    if (d.shapeFlag & 1 && x && !x.persisted) {
      const {
        leave: N,
        delayLeave: D
      } = x, M = () => N(b, I);
      D ? D(d.el, I, M) : M()
    } else I()
  }, U = (d, p) => {
    let b;
    for (; d !== p;) b = h(d), s(d), d = b;
    s(p)
  }, L = (d, p, b) => {
    const {
      bum: C,
      scope: x,
      update: I,
      subTree: N,
      um: D
    } = d;
    C && er(C), x.stop(), I && (I.active = !1, Oe(N, d, p, b)), D && Me(D, p), Me(() => {
      d.isUnmounted = !0
    }, p), p && p.pendingBranch && !p.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve())
  }, V = (d, p, b, C = !1, x = !1, I = 0) => {
    for (let N = I; N < d.length; N++) Oe(d[N], p, b, C, x)
  }, v = d => d.shapeFlag & 6 ? v(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : h(d.anchor || d.el);
  let O = !1;
  const P = (d, p, b) => {
      d == null ? p._vnode && Oe(p._vnode, null, null, !0) : y(p._vnode || null, d, p, null, null, null, b), O || (O = !0, xi(), cl(), O = !1), p._vnode = d
    },
    $ = {
      p: y,
      um: Oe,
      m: Fe,
      r: _,
      mt: Mt,
      mc: ye,
      pc: re,
      pbc: de,
      n: v,
      o: e
    };
  let W, X;
  return t && ([W, X] = t($)), {
    render: P,
    hydrate: W,
    createApp: zc(P, W)
  }
}

function Hr({
  type: e,
  props: t
}, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function $t({
  effect: e,
  update: t
}, n) {
  e.allowRecurse = t.allowRecurse = n
}

function eu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function Rl(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (z(r) && z(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let l = s[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = xt(s[i]), l.el = o.el), n || Rl(o, l)), l.type === Rr && (l.el = o.el)
    }
}

function tu(e) {
  const t = e.slice(),
    n = [0];
  let r, s, i, o, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (s = n[n.length - 1], e[s] < u) {
        t[r] = s, n.push(r);
        continue
      }
      for (i = 0, o = n.length - 1; i < o;) l = i + o >> 1, e[n[l]] < u ? i = l + 1 : o = l;
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = t[o];
  return n
}

function Ol(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ol(t)
}
const nu = e => e.__isTeleport,
  _e = Symbol.for("v-fgt"),
  Rr = Symbol.for("v-txt"),
  It = Symbol.for("v-cmt"),
  qr = Symbol.for("v-stc"),
  Tn = [];
let Qe = null;

function G(e = !1) {
  Tn.push(Qe = e ? null : [])
}

function ru() {
  Tn.pop(), Qe = Tn[Tn.length - 1] || null
}
let Dn = 1;

function Di(e) {
  Dn += e
}

function Al(e) {
  return e.dynamicChildren = Dn > 0 ? Qe || nn : null, ru(), Dn > 0 && Qe && Qe.push(e), e
}

function ne(e, t, n, r, s, i) {
  return Al(w(e, t, n, r, s, i, !0))
}

function lt(e, t, n, r, s) {
  return Al(Te(e, t, n, r, s, !0))
}

function hr(e) {
  return e ? e.__v_isVNode === !0 : !1
}

function yn(e, t) {
  return e.type === t.type && e.key === t.key
}
const Or = "__vInternal",
  Ll = ({
    key: e
  }) => e != null ? e : null,
  nr = ({
    ref: e,
    ref_key: t,
    ref_for: n
  }) => (typeof e == "number" && (e = "" + e), e != null ? ke(e) || Ve(e) || Y(e) ? {
    i: Se,
    r: e,
    k: t,
    f: !!n
  } : e : null);

function w(e, t = null, n = null, r = 0, s = null, i = e === _e ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ll(t),
    ref: t && nr(t),
    scopeId: dl,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Se
  };
  return l ? (Xs(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= ke(n) ? 8 : 16), Dn > 0 && !o && Qe && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Qe.push(a), a
}
const Te = su;

function su(e, t = null, n = null, r = 0, s = null, i = !1) {
  if ((!e || e === xc) && (e = It), hr(e)) {
    const l = un(e, t, !0);
    return n && Xs(l, n), Dn > 0 && !i && Qe && (l.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = l : Qe.push(l)), l.patchFlag |= -2, l
  }
  if (gu(e) && (e = e.__vccOpts), t) {
    t = iu(t);
    let {
      class: l,
      style: a
    } = t;
    l && !ke(l) && (t.class = Ae(l)), pe(a) && (tl(a) && !z(a) && (a = Re({}, a)), t.style = Is(a))
  }
  const o = ke(e) ? 1 : Ec(e) ? 128 : nu(e) ? 64 : pe(e) ? 4 : Y(e) ? 2 : 0;
  return w(e, t, n, r, s, o, i, !0)
}

function iu(e) {
  return e ? tl(e) || Or in e ? Re({}, e) : e : null
}

function un(e, t, n = !1) {
  const {
    props: r,
    ref: s,
    patchFlag: i,
    children: o
  } = e, l = t ? ou(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Ll(l),
    ref: t && t.ref ? n && s ? z(s) ? s.concat(nr(t)) : [s, nr(t)] : nr(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== _e ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && un(e.ssContent),
    ssFallback: e.ssFallback && un(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}

function Xe(e = " ", t = 0) {
  return Te(Rr, null, e, t)
}

function Ie(e = "", t = !1) {
  return t ? (G(), lt(It, null, e)) : Te(It, null, e)
}

function it(e) {
  return e == null || typeof e == "boolean" ? Te(It) : z(e) ? Te(_e, null, e.slice()) : typeof e == "object" ? xt(e) : Te(Rr, null, String(e))
}

function xt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : un(e)
}

function Xs(e, t) {
  let n = 0;
  const {
    shapeFlag: r
  } = e;
  if (t == null) t = null;
  else if (z(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Xs(e, s()), s._c && (s._d = !0));
      return
    } else {
      n = 32;
      const s = t._;
      !s && !(Or in t) ? t._ctx = Se : s === 3 && Se && (Se.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    }
  else Y(t) ? (t = {
    default: t,
    _ctx: Se
  }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Xe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n
}

function ou(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class") t.class !== r.class && (t.class = Ae([t.class, r.class]));
      else if (s === "style") t.style = Is([t.style, r.style]);
    else if (yr(s)) {
      const i = t[s],
        o = r[s];
      o && i !== o && !(z(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o)
    } else s !== "" && (t[s] = r[s])
  }
  return t
}

function st(e, t, n, r = null) {
  Ye(e, t, 7, [n, r])
}
const lu = xl();
let au = 0;

function cu(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || lu,
    i = {
      uid: au++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Va(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: El(r, s),
      emitsOptions: fl(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ge,
      inheritAttrs: r.inheritAttrs,
      ctx: ge,
      data: ge,
      props: ge,
      attrs: ge,
      slots: ge,
      refs: ge,
      setupState: ge,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return i.ctx = {
    _: i
  }, i.root = t ? t.root : i, i.emit = mc.bind(null, i), e.ce && e.ce(i), i
}
let Pe = null,
  pr, vs;
{
  const e = No(),
    t = (n, r) => {
      let s;
      return (s = e[n]) || (s = e[n] = []), s.push(r), i => {
        s.length > 1 ? s.forEach(o => o(i)) : s[0](i)
      }
    };
  pr = t("__VUE_INSTANCE_SETTERS__", n => Pe = n), vs = t("__VUE_SSR_SETTERS__", n => Ar = n)
}
const Nn = e => {
    const t = Pe;
    return pr(e), e.scope.on(), () => {
      e.scope.off(), pr(t)
    }
  },
  Bi = () => {
    Pe && Pe.scope.off(), pr(null)
  };

function Pl(e) {
  return e.vnode.shapeFlag & 4
}
let Ar = !1;

function uu(e, t = !1) {
  t && vs(t);
  const {
    props: n,
    children: r
  } = e.vnode, s = Pl(e);
  Wc(e, n, s, t), Jc(e, r);
  const i = s ? fu(e, t) : void 0;
  return t && vs(!1), i
}

function fu(e, t) {
  const n = e.type;
  e.accessCache = Object.create(null), e.proxy = nl(new Proxy(e.ctx, Vc));
  const {
    setup: r
  } = n;
  if (r) {
    const s = e.setupContext = r.length > 1 ? hu(e) : null,
      i = Nn(e);
    zt();
    const o = Ot(r, e, 0, [e.props, s]);
    if (Wt(), i(), Bo(o)) {
      if (o.then(Bi, Bi), t) return o.then(l => {
        Ii(e, l, t)
      }).catch(l => {
        Sr(l, e, 0)
      });
      e.asyncDep = o
    } else Ii(e, o, t)
  } else Dl(e, t)
}

function Ii(e, t, n) {
  Y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = ol(t)), Dl(e, n)
}
let Mi;

function Dl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Mi && !r.render) {
      const s = r.template || Js(e).template;
      if (s) {
        const {
          isCustomElement: i,
          compilerOptions: o
        } = e.appContext.config, {
          delimiters: l,
          compilerOptions: a
        } = r, u = Re(Re({
          isCustomElement: i,
          delimiters: l
        }, o), a);
        r.render = Mi(s, u)
      }
    }
    e.render = r.render || Ke
  } {
    const s = Nn(e);
    zt();
    try {
      Fc(e)
    } finally {
      Wt(), s()
    }
  }
}

function du(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
    get(t, n) {
      return $e(e, "get", "$attrs"), t[n]
    }
  }))
}

function hu(e) {
  const t = n => {
    e.exposed = n || {}
  };
  return {
    get attrs() {
      return du(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}

function Lr(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(ol(nl(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in Cn) return Cn[n](e)
    },
    has(t, n) {
      return n in t || n in Cn
    }
  }))
}

function pu(e, t = !0) {
  return Y(e) ? e.displayName || e.name : e.name || t && e.__name
}

function gu(e) {
  return Y(e) && "__vccOpts" in e
}
const He = (e, t) => lc(e, t, Ar);

function Bl(e, t, n) {
  const r = arguments.length;
  return r === 2 ? pe(t) && !z(t) ? hr(t) ? Te(e, null, [t]) : Te(e, t) : Te(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && hr(n) && (n = [n]), Te(e, t, n))
}
const mu = "3.4.10";
/**
 * @vue/runtime-dom v3.4.10
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
const vu = "http://www.w3.org/2000/svg",
  bu = "http://www.w3.org/1998/Math/MathML",
  kt = typeof document < "u" ? document : null,
  Ni = kt && kt.createElement("template"),
  yu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const s = t === "svg" ? kt.createElementNS(vu, e) : t === "mathml" ? kt.createElementNS(bu, e) : kt.createElement(e, n ? {
        is: n
      } : void 0);
      return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
    },
    createText: e => kt.createTextNode(e),
    createComment: e => kt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => kt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, s, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === i || s.nextSibling))
        for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)););
      else {
        Ni.innerHTML = r === "svg" ? "<svg>".concat(e, "</svg>") : r === "mathml" ? "<math>".concat(e, "</math>") : e;
        const l = Ni.content;
        if (r === "svg" || r === "mathml") {
          const a = l.firstChild;
          for (; a.firstChild;) l.appendChild(a.firstChild);
          l.removeChild(a)
        }
        t.insertBefore(l, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  wu = Symbol("_vtc");

function _u(e, t, n) {
  const r = e[wu];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const xu = Symbol("_vod"),
  ku = Symbol("");

function Eu(e, t, n) {
  const r = e.style,
    s = r.display,
    i = ke(n);
  if (n && !i) {
    if (t && !ke(t))
      for (const o in t) n[o] == null && bs(r, o, "");
    for (const o in n) bs(r, o, n[o])
  } else if (i) {
    if (t !== n) {
      const o = r[ku];
      o && (n += ";" + o), r.cssText = n
    }
  } else t && e.removeAttribute("style");
  xu in e && (r.display = s)
}
const $i = /\s*!important$/;

function bs(e, t, n) {
  if (z(n)) n.forEach(r => bs(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = Su(e, t);
    $i.test(n) ? e.setProperty(gn(r), n.replace($i, ""), "important") : e[r] = n
  }
}
const Vi = ["Webkit", "Moz", "ms"],
  Kr = {};

function Su(e, t) {
  const n = Kr[t];
  if (n) return n;
  let r = ut(t);
  if (r !== "filter" && r in e) return Kr[t] = r;
  r = xr(r);
  for (let s = 0; s < Vi.length; s++) {
    const i = Vi[s] + r;
    if (i in e) return Kr[t] = i
  }
  return t
}
const Fi = "http://www.w3.org/1999/xlink";

function Cu(e, t, n, r, s) {
  if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Fi, t.slice(6, t.length)) : e.setAttributeNS(Fi, t, n);
  else {
    const i = Na(t);
    n == null || i && !$o(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
  }
}

function Tu(e, t, n, r, s, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, s, i), e[t] = n == null ? "" : n;
    return
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      c = n == null ? "" : n;
    u !== c && (e.value = c), n == null && e.removeAttribute(t);
    return
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = $o(n) : n == null && u === "string" ? (n = "", a = !0) : u === "number" && (n = 0, a = !0)
  }
  try {
    e[t] = n
  } catch (u) {}
  a && e.removeAttribute(t)
}

function Il(e, t, n, r) {
  e.addEventListener(t, n, r)
}

function Ru(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const ji = Symbol("_vei");

function Ou(e, t, n, r, s = null) {
  const i = e[ji] || (e[ji] = {}),
    o = i[t];
  if (r && o) o.value = r;
  else {
    const [l, a] = Au(t);
    if (r) {
      const u = i[t] = Du(r, s);
      Il(e, l, u, a)
    } else o && (Ru(e, l, o, a), i[t] = void 0)
  }
}
const Ui = /(?:Once|Passive|Capture)$/;

function Au(e) {
  let t;
  if (Ui.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Ui);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
  }
  return [e[2] === ":" ? e.slice(3) : gn(e.slice(2)), t]
}
let zr = 0;
const Lu = Promise.resolve(),
  Pu = () => zr || (Lu.then(() => zr = 0), zr = Date.now());

function Du(e, t) {
  const n = r => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Ye(Bu(r, n.value), t, 5, [r])
  };
  return n.value = e, n.attached = Pu(), n
}

function Bu(e, t) {
  if (z(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0
    }, t.map(r => s => !s._stopped && r && r(s))
  } else return t
}
const Hi = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  Iu = (e, t, n, r, s, i, o, l, a) => {
    const u = s === "svg";
    t === "class" ? _u(e, r, u) : t === "style" ? Eu(e, n, r) : yr(t) ? Ps(t) || Ou(e, t, n, r, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mu(e, t, r, u)) ? Tu(e, t, r, i, o, l, a) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Cu(e, t, r, u))
  };

function Mu(e, t, n, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Hi(t) && Y(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
  }
  return Hi(t) && ke(n) ? !1 : t in e
}
const qi = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return z(t) ? n => er(t, n) : t
  },
  Wr = Symbol("_assign"),
  Nu = {
    deep: !0,
    created(e, t, n) {
      e[Wr] = qi(n), Il(e, "change", () => {
        const r = e._modelValue,
          s = $u(e),
          i = e.checked,
          o = e[Wr];
        if (z(r)) {
          const l = Vo(r, s),
            a = l !== -1;
          if (i && !a) o(r.concat(s));
          else if (!i && a) {
            const u = [...r];
            u.splice(l, 1), o(u)
          }
        } else if (wr(r)) {
          const l = new Set(r);
          i ? l.add(s) : l.delete(s), o(l)
        } else o(Ml(e, i))
      })
    },
    mounted: Ki,
    beforeUpdate(e, t, n) {
      e[Wr] = qi(n), Ki(e, t, n)
    }
  };

function Ki(e, {
  value: t,
  oldValue: n
}, r) {
  e._modelValue = t, z(t) ? e.checked = Vo(t, r.props.value) > -1 : wr(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = kr(t, Ml(e, !0)))
}

function $u(e) {
  return "_value" in e ? e._value : e.value
}

function Ml(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t
}
const Vu = ["ctrl", "shift", "alt", "meta"],
  Fu = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button" in e && e.button !== 0,
    middle: e => "button" in e && e.button !== 1,
    right: e => "button" in e && e.button !== 2,
    exact: (e, t) => Vu.some(n => e["".concat(n, "Key")] && !t.includes(n))
  },
  Kt = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      r = t.join(".");
    return n[r] || (n[r] = (s, ...i) => {
      for (let o = 0; o < t.length; o++) {
        const l = Fu[t[o]];
        if (l && l(s, t)) return
      }
      return e(s, ...i)
    })
  },
  ju = Re({
    patchProp: Iu
  }, yu);
let zi;

function Uu() {
  return zi || (zi = Xc(ju))
}
const Hu = (...e) => {
  const t = Uu().createApp(...e),
    {
      mount: n
    } = t;
  return t.mount = r => {
    const s = Ku(r);
    if (!s) return;
    const i = t._component;
    !Y(i) && !i.render && !i.template && (i.template = s.innerHTML), s.innerHTML = "";
    const o = n(s, !1, qu(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o
  }, t
};

function qu(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function Ku(e) {
  return ke(e) ? document.querySelector(e) : e
}
const zu = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n
  },
  Wu = {};

function Gu(e, t) {
  const n = _c("RouterView");
  return G(), lt(n)
}
const Zu = zu(Wu, [
  ["render", Gu]
]);
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const Yt = typeof window < "u";

function Ju(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const ce = Object.assign;

function Gr(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = et(s) ? s.map(e) : e(s)
  }
  return n
}
const Rn = () => {},
  et = Array.isArray,
  Qu = /\/$/,
  Xu = e => e.replace(Qu, "");

function Zr(e, t, n = "/") {
  let r, s = {},
    i = "",
    o = "";
  const l = t.indexOf("#");
  let a = t.indexOf("?");
  return l < a && l >= 0 && (a = -1), a > -1 && (r = t.slice(0, a), i = t.slice(a + 1, l > -1 ? l : t.length), s = e(i)), l > -1 && (r = r || t.slice(0, l), o = t.slice(l, t.length)), r = nf(r != null ? r : t, n), {
    fullPath: r + (i && "?") + i + o,
    path: r,
    query: s,
    hash: o
  }
}

function Yu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "")
}

function Wi(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function ef(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return r > -1 && r === s && fn(t.matched[r], n.matched[s]) && Nl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function fn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}

function Nl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e)
    if (!tf(e[n], t[n])) return !1;
  return !0
}

function tf(e, t) {
  return et(e) ? Gi(e, t) : et(t) ? Gi(t, e) : e === t
}

function Gi(e, t) {
  return et(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}

function nf(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/"),
    s = r[r.length - 1];
  (s === ".." || s === ".") && r.push("");
  let i = n.length - 1,
    o, l;
  for (o = 0; o < r.length; o++)
    if (l = r[o], l !== ".")
      if (l === "..") i > 1 && i--;
      else break;
  return n.slice(0, i).join("/") + "/" + r.slice(o - (o === r.length ? 1 : 0)).join("/")
}
var Bn;
(function(e) {
  e.pop = "pop", e.push = "push"
})(Bn || (Bn = {}));
var On;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = ""
})(On || (On = {}));

function rf(e) {
  if (!e)
    if (Yt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Xu(e)
}
const sf = /^[^#]+#/;

function of(e, t) {
  return e.replace(sf, "#") + t
}

function lf(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  }
}
const Pr = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});

function af(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!s) return;
    t = lf(s, e)
  } else t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function Zi(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const ys = new Map;

function cf(e, t) {
  ys.set(e, t)
}

function uf(e) {
  const t = ys.get(e);
  return ys.delete(e), t
}
let ff = () => location.protocol + "//" + location.host;

function $l(e, t) {
  const {
    pathname: n,
    search: r,
    hash: s
  } = t, i = e.indexOf("#");
  if (i > -1) {
    let l = s.includes(e.slice(i)) ? e.slice(i).length : 1,
      a = s.slice(l);
    return a[0] !== "/" && (a = "/" + a), Wi(a, "")
  }
  return Wi(n, e) + r + s
}

function df(e, t, n, r) {
  let s = [],
    i = [],
    o = null;
  const l = ({
    state: h
  }) => {
    const g = $l(e, location),
      m = n.value,
      y = t.value;
    let R = 0;
    if (h) {
      if (n.value = g, t.value = h, o && o === m) {
        o = null;
        return
      }
      R = y ? h.position - y.position : 0
    } else r(g);
    s.forEach(T => {
      T(n.value, m, {
        delta: R,
        type: Bn.pop,
        direction: R ? R > 0 ? On.forward : On.back : On.unknown
      })
    })
  };

  function a() {
    o = n.value
  }

  function u(h) {
    s.push(h);
    const g = () => {
      const m = s.indexOf(h);
      m > -1 && s.splice(m, 1)
    };
    return i.push(g), g
  }

  function c() {
    const {
      history: h
    } = window;
    h.state && h.replaceState(ce({}, h.state, {
      scroll: Pr()
    }), "")
  }

  function f() {
    for (const h of i) h();
    i = [], window.removeEventListener("popstate", l), window.removeEventListener("beforeunload", c)
  }
  return window.addEventListener("popstate", l), window.addEventListener("beforeunload", c, {
    passive: !0
  }), {
    pauseListeners: a,
    listen: u,
    destroy: f
  }
}

function Ji(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Pr() : null
  }
}

function hf(e) {
  const {
    history: t,
    location: n
  } = window, r = {
    value: $l(e, n)
  }, s = {
    value: t.state
  };
  s.value || i(r.value, {
    back: null,
    current: r.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);

  function i(a, u, c) {
    const f = e.indexOf("#"),
      h = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a : ff() + e + a;
    try {
      t[c ? "replaceState" : "pushState"](u, "", h), s.value = u
    } catch (g) {
      console.error(g), n[c ? "replace" : "assign"](h)
    }
  }

  function o(a, u) {
    const c = ce({}, t.state, Ji(s.value.back, a, s.value.forward, !0), u, {
      position: s.value.position
    });
    i(a, c, !0), r.value = a
  }

  function l(a, u) {
    const c = ce({}, s.value, t.state, {
      forward: a,
      scroll: Pr()
    });
    i(c.current, c, !0);
    const f = ce({}, Ji(r.value, a, null), {
      position: c.position + 1
    }, u);
    i(a, f, !1), r.value = a
  }
  return {
    location: r,
    state: s,
    push: l,
    replace: o
  }
}

function pf(e) {
  e = rf(e);
  const t = hf(e),
    n = df(e, t.state, t.location, t.replace);

  function r(i, o = !0) {
    o || n.pauseListeners(), history.go(i)
  }
  const s = ce({
    location: "",
    base: e,
    go: r,
    createHref: of.bind(null, e)
  }, t, n);
  return Object.defineProperty(s, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(s, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), s
}

function gf(e) {
  return typeof e == "string" || e && typeof e == "object"
}

function Vl(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const yt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  Fl = Symbol("");
var Qi;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(Qi || (Qi = {}));

function dn(e, t) {
  return ce(new Error, {
    type: e,
    [Fl]: !0
  }, t)
}

function dt(e, t) {
  return e instanceof Error && Fl in e && (t == null || !!(e.type & t))
}
const Xi = "[^/]+?",
  mf = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
  },
  vf = /[.+*?^${}()[\]/\\]/g;

function bf(e, t) {
  const n = ce({}, mf, t),
    r = [];
  let s = n.start ? "^" : "";
  const i = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let f = 0; f < u.length; f++) {
      const h = u[f];
      let g = 40 + (n.sensitive ? .25 : 0);
      if (h.type === 0) f || (s += "/"), s += h.value.replace(vf, "\\$&"), g += 40;
      else if (h.type === 1) {
        const {
          value: m,
          repeatable: y,
          optional: R,
          regexp: T
        } = h;
        i.push({
          name: m,
          repeatable: y,
          optional: R
        });
        const B = T || Xi;
        if (B !== Xi) {
          g += 10;
          try {
            new RegExp("(".concat(B, ")"))
          } catch (Z) {
            throw new Error('Invalid custom RegExp for param "'.concat(m, '" (').concat(B, "): ") + Z.message)
          }
        }
        let j = y ? "((?:".concat(B, ")(?:/(?:").concat(B, "))*)") : "(".concat(B, ")");
        f || (j = R && u.length < 2 ? "(?:/".concat(j, ")") : "/" + j), R && (j += "?"), s += j, g += 20, R && (g += -8), y && (g += -20), B === ".*" && (g += -50)
      }
      c.push(g)
    }
    r.push(c)
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += .7000000000000001
  }
  n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
  const o = new RegExp(s, n.sensitive ? "" : "i");

  function l(u) {
    const c = u.match(o),
      f = {};
    if (!c) return null;
    for (let h = 1; h < c.length; h++) {
      const g = c[h] || "",
        m = i[h - 1];
      f[m.name] = g && m.repeatable ? g.split("/") : g
    }
    return f
  }

  function a(u) {
    let c = "",
      f = !1;
    for (const h of e) {
      (!f || !c.endsWith("/")) && (c += "/"), f = !1;
      for (const g of h)
        if (g.type === 0) c += g.value;
        else if (g.type === 1) {
        const {
          value: m,
          repeatable: y,
          optional: R
        } = g, T = m in u ? u[m] : "";
        if (et(T) && !y) throw new Error('Provided param "'.concat(m, '" is an array but it is not repeatable (* or + modifiers)'));
        const B = et(T) ? T.join("/") : T;
        if (!B)
          if (R) h.length < 2 && (c.endsWith("/") ? c = c.slice(0, -1) : f = !0);
          else throw new Error('Missing required param "'.concat(m, '"'));
        c += B
      }
    }
    return c || "/"
  }
  return {
    re: o,
    score: r,
    keys: i,
    parse: l,
    stringify: a
  }
}

function yf(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length;) {
    const r = t[n] - e[n];
    if (r) return r;
    n++
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0
}

function wf(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length;) {
    const i = yf(r[n], s[n]);
    if (i) return i;
    n++
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Yi(r)) return 1;
    if (Yi(s)) return -1
  }
  return s.length - r.length
}

function Yi(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0
}
const _f = {
    type: 0,
    value: ""
  },
  xf = /[a-zA-Z0-9_]/;

function kf(e) {
  if (!e) return [
    []
  ];
  if (e === "/") return [
    [_f]
  ];
  if (!e.startsWith("/")) throw new Error('Invalid path "'.concat(e, '"'));

  function t(g) {
    throw new Error("ERR (".concat(n, ')/"').concat(u, '": ').concat(g))
  }
  let n = 0,
    r = n;
  const s = [];
  let i;

  function o() {
    i && s.push(i), i = []
  }
  let l = 0,
    a, u = "",
    c = "";

  function f() {
    u && (n === 0 ? i.push({
      type: 0,
      value: u
    }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (a === "*" || a === "+") && t("A repeatable param (".concat(u, ") must be alone in its segment. eg: '/:ids+.")), i.push({
      type: 1,
      value: u,
      regexp: c,
      repeatable: a === "*" || a === "+",
      optional: a === "*" || a === "?"
    })) : t("Invalid state to consume buffer"), u = "")
  }

  function h() {
    u += a
  }
  for (; l < e.length;) {
    if (a = e[l++], a === "\\" && n !== 2) {
      r = n, n = 4;
      continue
    }
    switch (n) {
      case 0:
        a === "/" ? (u && f(), o()) : a === ":" ? (f(), n = 1) : h();
        break;
      case 4:
        h(), n = r;
        break;
      case 1:
        a === "(" ? n = 2 : xf.test(a) ? h() : (f(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--);
        break;
      case 2:
        a === ")" ? c[c.length - 1] == "\\" ? c = c.slice(0, -1) + a : n = 3 : c += a;
        break;
      case 3:
        f(), n = 0, a !== "*" && a !== "?" && a !== "+" && l--, c = "";
        break;
      default:
        t("Unknown state");
        break
    }
  }
  return n === 2 && t('Unfinished custom RegExp for param "'.concat(u, '"')), f(), o(), s
}

function Ef(e, t, n) {
  const r = bf(kf(e.path), n),
    s = ce(r, {
      record: e,
      parent: t,
      children: [],
      alias: []
    });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}

function Sf(e, t) {
  const n = [],
    r = new Map;
  t = no({
    strict: !1,
    end: !0,
    sensitive: !1
  }, t);

  function s(c) {
    return r.get(c)
  }

  function i(c, f, h) {
    const g = !h,
      m = Cf(c);
    m.aliasOf = h && h.record;
    const y = no(t, c),
      R = [m];
    if ("alias" in c) {
      const j = typeof c.alias == "string" ? [c.alias] : c.alias;
      for (const Z of j) R.push(ce({}, m, {
        components: h ? h.record.components : m.components,
        path: Z,
        aliasOf: h ? h.record : m
      }))
    }
    let T, B;
    for (const j of R) {
      const {
        path: Z
      } = j;
      if (f && Z[0] !== "/") {
        const H = f.record.path,
          E = H[H.length - 1] === "/" ? "" : "/";
        j.path = f.record.path + (Z && E + Z)
      }
      if (T = Ef(j, f, y), h ? h.alias.push(T) : (B = B || T, B !== T && B.alias.push(T), g && c.name && !to(T) && o(c.name)), m.children) {
        const H = m.children;
        for (let E = 0; E < H.length; E++) i(H[E], T, h && h.children[E])
      }
      h = h || T, (T.record.components && Object.keys(T.record.components).length || T.record.name || T.record.redirect) && a(T)
    }
    return B ? () => {
      o(B)
    } : Rn
  }

  function o(c) {
    if (Vl(c)) {
      const f = r.get(c);
      f && (r.delete(c), n.splice(n.indexOf(f), 1), f.children.forEach(o), f.alias.forEach(o))
    } else {
      const f = n.indexOf(c);
      f > -1 && (n.splice(f, 1), c.record.name && r.delete(c.record.name), c.children.forEach(o), c.alias.forEach(o))
    }
  }

  function l() {
    return n
  }

  function a(c) {
    let f = 0;
    for (; f < n.length && wf(c, n[f]) >= 0 && (c.record.path !== n[f].record.path || !jl(c, n[f]));) f++;
    n.splice(f, 0, c), c.record.name && !to(c) && r.set(c.record.name, c)
  }

  function u(c, f) {
    let h, g = {},
      m, y;
    if ("name" in c && c.name) {
      if (h = r.get(c.name), !h) throw dn(1, {
        location: c
      });
      y = h.record.name, g = ce(eo(f.params, h.keys.filter(B => !B.optional).map(B => B.name)), c.params && eo(c.params, h.keys.map(B => B.name))), m = h.stringify(g)
    } else if ("path" in c) m = c.path, h = n.find(B => B.re.test(m)), h && (g = h.parse(m), y = h.record.name);
    else {
      if (h = f.name ? r.get(f.name) : n.find(B => B.re.test(f.path)), !h) throw dn(1, {
        location: c,
        currentLocation: f
      });
      y = h.record.name, g = ce({}, f.params, c.params), m = h.stringify(g)
    }
    const R = [];
    let T = h;
    for (; T;) R.unshift(T.record), T = T.parent;
    return {
      name: y,
      path: m,
      params: g,
      matched: R,
      meta: Rf(R)
    }
  }
  return e.forEach(c => i(c)), {
    addRoute: i,
    resolve: u,
    removeRoute: o,
    getRoutes: l,
    getRecordMatcher: s
  }
}

function eo(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n
}

function Cf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Tf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set,
    updateGuards: new Set,
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && {
      default: e.component
    }
  }
}

function Tf(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else
    for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
  return t
}

function to(e) {
  for (; e;) {
    if (e.record.aliasOf) return !0;
    e = e.parent
  }
  return !1
}

function Rf(e) {
  return e.reduce((t, n) => ce(t, n.meta), {})
}

function no(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n
}

function jl(e, t) {
  return t.children.some(n => n === e || jl(e, n))
}
const Ul = /#/g,
  Of = /&/g,
  Af = /\//g,
  Lf = /=/g,
  Pf = /\?/g,
  Hl = /\+/g,
  Df = /%5B/g,
  Bf = /%5D/g,
  ql = /%5E/g,
  If = /%60/g,
  Kl = /%7B/g,
  Mf = /%7C/g,
  zl = /%7D/g,
  Nf = /%20/g;

function Ys(e) {
  return encodeURI("" + e).replace(Mf, "|").replace(Df, "[").replace(Bf, "]")
}

function $f(e) {
  return Ys(e).replace(Kl, "{").replace(zl, "}").replace(ql, "^")
}

function ws(e) {
  return Ys(e).replace(Hl, "%2B").replace(Nf, "+").replace(Ul, "%23").replace(Of, "%26").replace(If, "`").replace(Kl, "{").replace(zl, "}").replace(ql, "^")
}

function Vf(e) {
  return ws(e).replace(Lf, "%3D")
}

function Ff(e) {
  return Ys(e).replace(Ul, "%23").replace(Pf, "%3F")
}

function jf(e) {
  return e == null ? "" : Ff(e).replace(Af, "%2F")
}

function gr(e) {
  try {
    return decodeURIComponent("" + e)
  } catch (t) {}
  return "" + e
}

function Uf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const i = r[s].replace(Hl, " "),
      o = i.indexOf("="),
      l = gr(o < 0 ? i : i.slice(0, o)),
      a = o < 0 ? null : gr(i.slice(o + 1));
    if (l in t) {
      let u = t[l];
      et(u) || (u = t[l] = [u]), u.push(a)
    } else t[l] = a
  }
  return t
}

function ro(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (n = Vf(n), r == null) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue
    }(et(r) ? r.map(i => i && ws(i)) : [r && ws(r)]).forEach(i => {
      i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i))
    })
  }
  return t
}

function Hf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = et(r) ? r.map(s => s == null ? null : "" + s) : r == null ? r : "" + r)
  }
  return t
}
const qf = Symbol(""),
  so = Symbol(""),
  ei = Symbol(""),
  ti = Symbol(""),
  _s = Symbol("");

function wn() {
  let e = [];

  function t(r) {
    return e.push(r), () => {
      const s = e.indexOf(r);
      s > -1 && e.splice(s, 1)
    }
  }

  function n() {
    e = []
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  }
}

function Et(e, t, n, r, s) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () => new Promise((o, l) => {
    const a = f => {
        f === !1 ? l(dn(4, {
          from: n,
          to: t
        })) : f instanceof Error ? l(f) : gf(f) ? l(dn(2, {
          from: t,
          to: f
        })) : (i && r.enterCallbacks[s] === i && typeof f == "function" && i.push(f), o())
      },
      u = e.call(r && r.instances[s], t, n, a);
    let c = Promise.resolve(u);
    e.length < 3 && (c = c.then(a)), c.catch(f => l(f))
  })
}

function Jr(e, t, n, r) {
  const s = [];
  for (const i of e)
    for (const o in i.components) {
      let l = i.components[o];
      if (!(t !== "beforeRouteEnter" && !i.instances[o]))
        if (Kf(l)) {
          const u = (l.__vccOpts || l)[t];
          u && s.push(Et(u, n, r, i, o))
        } else {
          let a = l();
          s.push(() => a.then(u => {
            if (!u) return Promise.reject(new Error("Couldn't resolve component \"".concat(o, '" at "').concat(i.path, '"')));
            const c = Ju(u) ? u.default : u;
            i.components[o] = c;
            const h = (c.__vccOpts || c)[t];
            return h && Et(h, n, r, i, o)()
          }))
        }
    }
  return s
}

function Kf(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function io(e) {
  const t = ct(ei),
    n = ct(ti),
    r = He(() => t.resolve(Rt(e.to))),
    s = He(() => {
      const {
        matched: a
      } = r.value, {
        length: u
      } = a, c = a[u - 1], f = n.matched;
      if (!c || !f.length) return -1;
      const h = f.findIndex(fn.bind(null, c));
      if (h > -1) return h;
      const g = oo(a[u - 2]);
      return u > 1 && oo(c) === g && f[f.length - 1].path !== g ? f.findIndex(fn.bind(null, a[u - 2])) : h
    }),
    i = He(() => s.value > -1 && Zf(n.params, r.value.params)),
    o = He(() => s.value > -1 && s.value === n.matched.length - 1 && Nl(n.params, r.value.params));

  function l(a = {}) {
    return Gf(a) ? t[Rt(e.replace) ? "replace" : "push"](Rt(e.to)).catch(Rn) : Promise.resolve()
  }
  return {
    route: r,
    href: He(() => r.value.href),
    isActive: i,
    isExactActive: o,
    navigate: l
  }
}
const zf = qe({
    name: "RouterLink",
    compatConfig: {
      MODE: 3
    },
    props: {
      to: {
        type: [String, Object],
        required: !0
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    },
    useLink: io,
    setup(e, {
      slots: t
    }) {
      const n = qt(io(e)),
        {
          options: r
        } = ct(ei),
        s = He(() => ({
          [lo(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
          [lo(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom ? i : Bl("a", {
          "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
          href: n.href,
          onClick: n.navigate,
          class: s.value
        }, i)
      }
    }
  }),
  Wf = zf;

function Gf(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}

function Zf(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1
    } else if (!et(s) || s.length !== r.length || r.some((i, o) => i !== s[o])) return !1
  }
  return !0
}

function oo(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const lo = (e, t, n) => e != null ? e : t != null ? t : n,
  Jf = qe({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    compatConfig: {
      MODE: 3
    },
    setup(e, {
      attrs: t,
      slots: n
    }) {
      const r = ct(_s),
        s = He(() => e.route || r.value),
        i = ct(so, 0),
        o = He(() => {
          let u = Rt(i);
          const {
            matched: c
          } = s.value;
          let f;
          for (;
            (f = c[u]) && !f.components;) u++;
          return u
        }),
        l = He(() => s.value.matched[o.value]);
      tr(so, He(() => o.value + 1)), tr(qf, l), tr(_s, s);
      const a = Ne();
      return Lt(() => [a.value, l.value, e.name], ([u, c, f], [h, g, m]) => {
        c && (c.instances[f] = u, g && g !== c && u && u === h && (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards), c.updateGuards.size || (c.updateGuards = g.updateGuards))), u && c && (!g || !fn(c, g) || !h) && (c.enterCallbacks[f] || []).forEach(y => y(u))
      }, {
        flush: "post"
      }), () => {
        const u = s.value,
          c = e.name,
          f = l.value,
          h = f && f.components[c];
        if (!h) return ao(n.default, {
          Component: h,
          route: u
        });
        const g = f.props[c],
          m = g ? g === !0 ? u.params : typeof g == "function" ? g(u) : g : null,
          R = Bl(h, ce({}, m, t, {
            onVnodeUnmounted: T => {
              T.component.isUnmounted && (f.instances[c] = null)
            },
            ref: a
          }));
        return ao(n.default, {
          Component: R,
          route: u
        }) || R
      }
    }
  });

function ao(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n
}
const Qf = Jf;

function Xf(e) {
  const t = Sf(e.routes, e),
    n = e.parseQuery || Uf,
    r = e.stringifyQuery || ro,
    s = e.history,
    i = wn(),
    o = wn(),
    l = wn(),
    a = ac(yt);
  let u = yt;
  Yt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const c = Gr.bind(null, v => "" + v),
    f = Gr.bind(null, jf),
    h = Gr.bind(null, gr);

  function g(v, O) {
    let P, $;
    return Vl(v) ? (P = t.getRecordMatcher(v), $ = O) : $ = v, t.addRoute($, P)
  }

  function m(v) {
    const O = t.getRecordMatcher(v);
    O && t.removeRoute(O)
  }

  function y() {
    return t.getRoutes().map(v => v.record)
  }

  function R(v) {
    return !!t.getRecordMatcher(v)
  }

  function T(v, O) {
    if (O = ce({}, O || a.value), typeof v == "string") {
      const p = Zr(n, v, O.path),
        b = t.resolve({
          path: p.path
        }, O),
        C = s.createHref(p.fullPath);
      return ce(p, b, {
        params: h(b.params),
        hash: gr(p.hash),
        redirectedFrom: void 0,
        href: C
      })
    }
    let P;
    if ("path" in v) P = ce({}, v, {
      path: Zr(n, v.path, O.path).path
    });
    else {
      const p = ce({}, v.params);
      for (const b in p) p[b] == null && delete p[b];
      P = ce({}, v, {
        params: f(p)
      }), O.params = f(O.params)
    }
    const $ = t.resolve(P, O),
      W = v.hash || "";
    $.params = c(h($.params));
    const X = Yu(r, ce({}, v, {
        hash: $f(W),
        path: $.path
      })),
      d = s.createHref(X);
    return ce({
      fullPath: X,
      hash: W,
      query: r === ro ? Hf(v.query) : v.query || {}
    }, $, {
      redirectedFrom: void 0,
      href: d
    })
  }

  function B(v) {
    return typeof v == "string" ? Zr(n, v, a.value.path) : ce({}, v)
  }

  function j(v, O) {
    if (u !== v) return dn(8, {
      from: O,
      to: v
    })
  }

  function Z(v) {
    return Q(v)
  }

  function H(v) {
    return Z(ce(B(v), {
      replace: !0
    }))
  }

  function E(v) {
    const O = v.matched[v.matched.length - 1];
    if (O && O.redirect) {
      const {
        redirect: P
      } = O;
      let $ = typeof P == "function" ? P(v) : P;
      return typeof $ == "string" && ($ = $.includes("?") || $.includes("#") ? $ = B($) : {
        path: $
      }, $.params = {}), ce({
        query: v.query,
        hash: v.hash,
        params: "path" in $ ? {} : v.params
      }, $)
    }
  }

  function Q(v, O) {
    const P = u = T(v),
      $ = a.value,
      W = v.state,
      X = v.force,
      d = v.replace === !0,
      p = E(P);
    if (p) return Q(ce(B(p), {
      state: typeof p == "object" ? ce({}, W, p.state) : W,
      force: X,
      replace: d
    }), O || P);
    const b = P;
    b.redirectedFrom = O;
    let C;
    return !X && ef(r, $, P) && (C = dn(16, {
      to: b,
      from: $
    }), Fe($, $, !0, !1)), (C ? Promise.resolve(C) : de(b, $)).catch(x => dt(x) ? dt(x, 2) ? x : nt(x) : re(x, b, $)).then(x => {
      if (x) {
        if (dt(x, 2)) return Q(ce({
          replace: d
        }, B(x.to), {
          state: typeof x.to == "object" ? ce({}, W, x.to.state) : W,
          force: X
        }), O || b)
      } else x = Ge(b, $, !0, d, W);
      return he(b, $, x), x
    })
  }

  function ye(v, O) {
    const P = j(v, O);
    return P ? Promise.reject(P) : Promise.resolve()
  }

  function xe(v) {
    const O = U.values().next().value;
    return O && typeof O.runWithContext == "function" ? O.runWithContext(v) : v()
  }

  function de(v, O) {
    let P;
    const [$, W, X] = Yf(v, O);
    P = Jr($.reverse(), "beforeRouteLeave", v, O);
    for (const p of $) p.leaveGuards.forEach(b => {
      P.push(Et(b, v, O))
    });
    const d = ye.bind(null, v, O);
    return P.push(d), V(P).then(() => {
      P = [];
      for (const p of i.list()) P.push(Et(p, v, O));
      return P.push(d), V(P)
    }).then(() => {
      P = Jr(W, "beforeRouteUpdate", v, O);
      for (const p of W) p.updateGuards.forEach(b => {
        P.push(Et(b, v, O))
      });
      return P.push(d), V(P)
    }).then(() => {
      P = [];
      for (const p of X)
        if (p.beforeEnter)
          if (et(p.beforeEnter))
            for (const b of p.beforeEnter) P.push(Et(b, v, O));
          else P.push(Et(p.beforeEnter, v, O));
      return P.push(d), V(P)
    }).then(() => (v.matched.forEach(p => p.enterCallbacks = {}), P = Jr(X, "beforeRouteEnter", v, O), P.push(d), V(P))).then(() => {
      P = [];
      for (const p of o.list()) P.push(Et(p, v, O));
      return P.push(d), V(P)
    }).catch(p => dt(p, 8) ? p : Promise.reject(p))
  }

  function he(v, O, P) {
    l.list().forEach($ => xe(() => $(v, O, P)))
  }

  function Ge(v, O, P, $, W) {
    const X = j(v, O);
    if (X) return X;
    const d = O === yt,
      p = Yt ? history.state : {};
    P && ($ || d ? s.replace(v.fullPath, ce({
      scroll: d && p && p.scroll
    }, W)) : s.push(v.fullPath, W)), a.value = v, Fe(v, O, P, d), nt()
  }
  let Ce;

  function Mt() {
    Ce || (Ce = s.listen((v, O, P) => {
      if (!L.listening) return;
      const $ = T(v),
        W = E($);
      if (W) {
        Q(ce(W, {
          replace: !0
        }), $).catch(Rn);
        return
      }
      u = $;
      const X = a.value;
      Yt && cf(Zi(X.fullPath, P.delta), Pr()), de($, X).catch(d => dt(d, 12) ? d : dt(d, 2) ? (Q(d.to, $).then(p => {
        dt(p, 20) && !P.delta && P.type === Bn.pop && s.go(-1, !1)
      }).catch(Rn), Promise.reject()) : (P.delta && s.go(-P.delta, !1), re(d, $, X))).then(d => {
        d = d || Ge($, X, !1), d && (P.delta && !dt(d, 8) ? s.go(-P.delta, !1) : P.type === Bn.pop && dt(d, 20) && s.go(-1, !1)), he($, X, d)
      }).catch(Rn)
    }))
  }
  let vt = wn(),
    ve = wn(),
    ae;

  function re(v, O, P) {
    nt(v);
    const $ = ve.list();
    return $.length ? $.forEach(W => W(v, O, P)) : console.error(v), Promise.reject(v)
  }

  function tt() {
    return ae && a.value !== yt ? Promise.resolve() : new Promise((v, O) => {
      vt.add([v, O])
    })
  }

  function nt(v) {
    return ae || (ae = !v, Mt(), vt.list().forEach(([O, P]) => v ? P(v) : O()), vt.reset()), v
  }

  function Fe(v, O, P, $) {
    const {
      scrollBehavior: W
    } = e;
    if (!Yt || !W) return Promise.resolve();
    const X = !P && uf(Zi(v.fullPath, 0)) || ($ || !P) && history.state && history.state.scroll || null;
    return qs().then(() => W(v, O, X)).then(d => d && af(d)).catch(d => re(d, v, O))
  }
  const Oe = v => s.go(v);
  let _;
  const U = new Set,
    L = {
      currentRoute: a,
      listening: !0,
      addRoute: g,
      removeRoute: m,
      hasRoute: R,
      getRoutes: y,
      resolve: T,
      options: e,
      push: Z,
      replace: H,
      go: Oe,
      back: () => Oe(-1),
      forward: () => Oe(1),
      beforeEach: i.add,
      beforeResolve: o.add,
      afterEach: l.add,
      onError: ve.add,
      isReady: tt,
      install(v) {
        const O = this;
        v.component("RouterLink", Wf), v.component("RouterView", Qf), v.config.globalProperties.$router = O, Object.defineProperty(v.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => Rt(a)
        }), Yt && !_ && a.value === yt && (_ = !0, Z(s.location).catch(W => {}));
        const P = {};
        for (const W in yt) Object.defineProperty(P, W, {
          get: () => a.value[W],
          enumerable: !0
        });
        v.provide(ei, O), v.provide(ti, Yo(P)), v.provide(_s, a);
        const $ = v.unmount;
        U.add(v), v.unmount = function() {
          U.delete(v), U.size < 1 && (u = yt, Ce && Ce(), Ce = null, a.value = yt, _ = !1, ae = !1), $()
        }
      }
    };

  function V(v) {
    return v.reduce((O, P) => O.then(() => xe(P)), Promise.resolve())
  }
  return L
}

function Yf(e, t) {
  const n = [],
    r = [],
    s = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let o = 0; o < i; o++) {
    const l = t.matched[o];
    l && (e.matched.find(u => fn(u, l)) ? r.push(l) : n.push(l));
    const a = e.matched[o];
    a && (t.matched.find(u => fn(u, a)) || s.push(a))
  }
  return [n, r, s]
}

function Wl() {
  return ct(ti)
}
const ed = {
    class: "absolute top-10 left-6 items-center md:inline-flex md:top-7"
  },
  td = ["src"],
  nd = qe({
    __name: "Logo",
    props: {
      src: {
        type: String,
        default: ""
      }
    },
    setup(e) {
      return (t, n) => (G(), ne("div", ed, [w("img", {
        class: "h-4.5",
        src: e.src
      }, null, 8, td)]))
    }
  }),
  rd = {
    class: "absolute inset-0 flex items-start justify-center md:items-center"
  },
  sd = {
    class: "w-full min-h-screen bg-card md:relative md:w-182.5 md:h-125 md:min-h-0 md:rounded-lg md:shadow-sm dark:bg-carddark"
  },
  $n = qe({
    __name: "Frame",
    props: {
      iconUrl: {
        type: String,
        default: ""
      }
    },
    setup(e) {
      return (t, n) => (G(), ne("div", rd, [w("div", sd, [Te(nd, {
        src: e.iconUrl
      }, null, 8, ["src"]), Zs(t.$slots, "default")])]))
    }
  });

function Gl(e, t) {
  return function() {
    return e.apply(t, arguments)
  }
}
const {
  toString: id
} = Object.prototype, {
  getPrototypeOf: ni
} = Object, Dr = (e => t => {
  const n = id.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
})(Object.create(null)), ft = e => (e = e.toLowerCase(), t => Dr(t) === e), Br = e => t => typeof t === e, {
  isArray: mn
} = Array, In = Br("undefined");

function od(e) {
  return e !== null && !In(e) && e.constructor !== null && !In(e.constructor) && We(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const Zl = ft("ArrayBuffer");

function ld(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Zl(e.buffer), t
}
const ad = Br("string"),
  We = Br("function"),
  Jl = Br("number"),
  Ir = e => e !== null && typeof e == "object",
  cd = e => e === !0 || e === !1,
  rr = e => {
    if (Dr(e) !== "object") return !1;
    const t = ni(e);
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
  },
  ud = ft("Date"),
  fd = ft("File"),
  dd = ft("Blob"),
  hd = ft("FileList"),
  pd = e => Ir(e) && We(e.pipe),
  gd = e => {
    let t;
    return e && (typeof FormData == "function" && e instanceof FormData || We(e.append) && ((t = Dr(e)) === "formdata" || t === "object" && We(e.toString) && e.toString() === "[object FormData]"))
  },
  md = ft("URLSearchParams"),
  vd = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function Vn(e, t, {
  allOwnKeys: n = !1
} = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if (typeof e != "object" && (e = [e]), mn(e))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      o = i.length;
    let l;
    for (r = 0; r < o; r++) l = i[r], t.call(null, e[l], l, e)
  }
}

function Ql(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0;)
    if (s = n[r], t === s.toLowerCase()) return s;
  return null
}
const Xl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global,
  Yl = e => !In(e) && e !== Xl;

function xs() {
  const {
    caseless: e
  } = Yl(this) && this || {}, t = {}, n = (r, s) => {
    const i = e && Ql(t, s) || s;
    rr(t[i]) && rr(r) ? t[i] = xs(t[i], r) : rr(r) ? t[i] = xs({}, r) : mn(r) ? t[i] = r.slice() : t[i] = r
  };
  for (let r = 0, s = arguments.length; r < s; r++) arguments[r] && Vn(arguments[r], n);
  return t
}
const bd = (e, t, n, {
    allOwnKeys: r
  } = {}) => (Vn(t, (s, i) => {
    n && We(s) ? e[i] = Gl(s, n) : e[i] = s
  }, {
    allOwnKeys: r
  }), e),
  yd = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  wd = (e, t, n, r) => {
    e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
      value: t.prototype
    }), n && Object.assign(e.prototype, n)
  },
  _d = (e, t, n, r) => {
    let s, i, o;
    const l = {};
    if (t = t || {}, e == null) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0;) o = s[i], (!r || r(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
      e = n !== !1 && ni(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t
  },
  xd = (e, t, n) => {
    e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
    const r = e.indexOf(t, n);
    return r !== -1 && r === n
  },
  kd = e => {
    if (!e) return null;
    if (mn(e)) return e;
    let t = e.length;
    if (!Jl(t)) return null;
    const n = new Array(t);
    for (; t-- > 0;) n[t] = e[t];
    return n
  },
  Ed = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && ni(Uint8Array)),
  Sd = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let s;
    for (;
      (s = r.next()) && !s.done;) {
      const i = s.value;
      t.call(e, i[0], i[1])
    }
  },
  Cd = (e, t) => {
    let n;
    const r = [];
    for (;
      (n = e.exec(t)) !== null;) r.push(n);
    return r
  },
  Td = ft("HTMLFormElement"),
  Rd = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, s) {
    return r.toUpperCase() + s
  }),
  co = (({
    hasOwnProperty: e
  }) => (t, n) => e.call(t, n))(Object.prototype),
  Od = ft("RegExp"),
  ea = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Vn(n, (s, i) => {
      let o;
      (o = t(s, i, e)) !== !1 && (r[i] = o || s)
    }), Object.defineProperties(e, r)
  },
  Ad = e => {
    ea(e, (t, n) => {
      if (We(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
      const r = e[n];
      if (We(r)) {
        if (t.enumerable = !1, "writable" in t) {
          t.writable = !1;
          return
        }
        t.set || (t.set = () => {
          throw Error("Can not rewrite read-only method '" + n + "'")
        })
      }
    })
  },
  Ld = (e, t) => {
    const n = {},
      r = s => {
        s.forEach(i => {
          n[i] = !0
        })
      };
    return mn(e) ? r(e) : r(String(e).split(t)), n
  },
  Pd = () => {},
  Dd = (e, t) => (e = +e, Number.isFinite(e) ? e : t),
  Qr = "abcdefghijklmnopqrstuvwxyz",
  uo = "0123456789",
  ta = {
    DIGIT: uo,
    ALPHA: Qr,
    ALPHA_DIGIT: Qr + Qr.toUpperCase() + uo
  },
  Bd = (e = 16, t = ta.ALPHA_DIGIT) => {
    let n = "";
    const {
      length: r
    } = t;
    for (; e--;) n += t[Math.random() * r | 0];
    return n
  };

function Id(e) {
  return !!(e && We(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}
const Md = e => {
    const t = new Array(10),
      n = (r, s) => {
        if (Ir(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[s] = r;
            const i = mn(r) ? [] : {};
            return Vn(r, (o, l) => {
              const a = n(o, s + 1);
              !In(a) && (i[l] = a)
            }), t[s] = void 0, i
          }
        }
        return r
      };
    return n(e, 0)
  },
  Nd = ft("AsyncFunction"),
  $d = e => e && (Ir(e) || We(e)) && We(e.then) && We(e.catch),
  k = {
    isArray: mn,
    isArrayBuffer: Zl,
    isBuffer: od,
    isFormData: gd,
    isArrayBufferView: ld,
    isString: ad,
    isNumber: Jl,
    isBoolean: cd,
    isObject: Ir,
    isPlainObject: rr,
    isUndefined: In,
    isDate: ud,
    isFile: fd,
    isBlob: dd,
    isRegExp: Od,
    isFunction: We,
    isStream: pd,
    isURLSearchParams: md,
    isTypedArray: Ed,
    isFileList: hd,
    forEach: Vn,
    merge: xs,
    extend: bd,
    trim: vd,
    stripBOM: yd,
    inherits: wd,
    toFlatObject: _d,
    kindOf: Dr,
    kindOfTest: ft,
    endsWith: xd,
    toArray: kd,
    forEachEntry: Sd,
    matchAll: Cd,
    isHTMLForm: Td,
    hasOwnProperty: co,
    hasOwnProp: co,
    reduceDescriptors: ea,
    freezeMethods: Ad,
    toObjectSet: Ld,
    toCamelCase: Rd,
    noop: Pd,
    toFiniteNumber: Dd,
    findKey: Ql,
    global: Xl,
    isContextDefined: Yl,
    ALPHABET: ta,
    generateString: Bd,
    isSpecCompliantForm: Id,
    toJSONObject: Md,
    isAsyncFn: Nd,
    isThenable: $d
  };

function ie(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s)
}
k.inherits(ie, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: k.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    }
  }
});
const na = ie.prototype,
  ra = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
  ra[e] = {
    value: e
  }
});
Object.defineProperties(ie, ra);
Object.defineProperty(na, "isAxiosError", {
  value: !0
});
ie.from = (e, t, n, r, s, i) => {
  const o = Object.create(na);
  return k.toFlatObject(e, o, function(a) {
    return a !== Error.prototype
  }, l => l !== "isAxiosError"), ie.call(o, e.message, t, n, r, s), o.cause = e, o.name = e.name, i && Object.assign(o, i), o
};
const Vd = null;

function ks(e) {
  return k.isPlainObject(e) || k.isArray(e)
}

function sa(e) {
  return k.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function fo(e, t, n) {
  return e ? e.concat(t).map(function(s, i) {
    return s = sa(s), !n && i ? "[" + s + "]" : s
  }).join(n ? "." : "") : t
}

function Fd(e) {
  return k.isArray(e) && !e.some(ks)
}
const jd = k.toFlatObject(k, {}, null, function(t) {
  return /^is[A-Z]/.test(t)
});

function Mr(e, t, n) {
  if (!k.isObject(e)) throw new TypeError("target must be an object");
  t = t || new FormData, n = k.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, R) {
    return !k.isUndefined(R[y])
  });
  const r = n.metaTokens,
    s = n.visitor || c,
    i = n.dots,
    o = n.indexes,
    a = (n.Blob || typeof Blob < "u" && Blob) && k.isSpecCompliantForm(t);
  if (!k.isFunction(s)) throw new TypeError("visitor must be a function");

  function u(m) {
    if (m === null) return "";
    if (k.isDate(m)) return m.toISOString();
    if (!a && k.isBlob(m)) throw new ie("Blob is not supported. Use a Buffer instead.");
    return k.isArrayBuffer(m) || k.isTypedArray(m) ? a && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m
  }

  function c(m, y, R) {
    let T = m;
    if (m && !R && typeof m == "object") {
      if (k.endsWith(y, "{}")) y = r ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (k.isArray(m) && Fd(m) || (k.isFileList(m) || k.endsWith(y, "[]")) && (T = k.toArray(m))) return y = sa(y), T.forEach(function(j, Z) {
        !(k.isUndefined(j) || j === null) && t.append(o === !0 ? fo([y], Z, i) : o === null ? y : y + "[]", u(j))
      }), !1
    }
    return ks(m) ? !0 : (t.append(fo(R, y, i), u(m)), !1)
  }
  const f = [],
    h = Object.assign(jd, {
      defaultVisitor: c,
      convertValue: u,
      isVisitable: ks
    });

  function g(m, y) {
    if (!k.isUndefined(m)) {
      if (f.indexOf(m) !== -1) throw Error("Circular reference detected in " + y.join("."));
      f.push(m), k.forEach(m, function(T, B) {
        (!(k.isUndefined(T) || T === null) && s.call(t, T, k.isString(B) ? B.trim() : B, y, h)) === !0 && g(T, y ? y.concat(B) : [B])
      }), f.pop()
    }
  }
  if (!k.isObject(e)) throw new TypeError("data must be an object");
  return g(e), t
}

function ho(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r]
  })
}

function ri(e, t) {
  this._pairs = [], e && Mr(e, this, t)
}
const ia = ri.prototype;
ia.append = function(t, n) {
  this._pairs.push([t, n])
};
ia.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, ho)
  } : ho;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1])
  }, "").join("&")
};

function Ud(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function oa(e, t, n) {
  if (!t) return e;
  const r = n && n.encode || Ud,
    s = n && n.serialize;
  let i;
  if (s ? i = s(t, n) : i = k.isURLSearchParams(t) ? t.toString() : new ri(t, n).toString(r), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i
  }
  return e
}
class po {
  constructor() {
    this.handlers = []
  }
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null)
  }
  clear() {
    this.handlers && (this.handlers = [])
  }
  forEach(t) {
    k.forEach(this.handlers, function(r) {
      r !== null && t(r)
    })
  }
}
const la = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
  },
  Hd = typeof URLSearchParams < "u" ? URLSearchParams : ri,
  qd = typeof FormData < "u" ? FormData : null,
  Kd = typeof Blob < "u" ? Blob : null,
  zd = {
    isBrowser: !0,
    classes: {
      URLSearchParams: Hd,
      FormData: qd,
      Blob: Kd
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  },
  aa = typeof window < "u" && typeof document < "u",
  Wd = (e => aa && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product),
  Gd = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function",
  Zd = Object.freeze(Object.defineProperty({
    __proto__: null,
    hasBrowserEnv: aa,
    hasStandardBrowserEnv: Wd,
    hasStandardBrowserWebWorkerEnv: Gd
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  at = {
    ...Zd,
    ...zd
  };

function Jd(e, t) {
  return Mr(e, new at.classes.URLSearchParams, Object.assign({
    visitor: function(n, r, s, i) {
      return at.isNode && k.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments)
    }
  }, t))
}

function Qd(e) {
  return k.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function Xd(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let i;
  for (r = 0; r < s; r++) i = n[r], t[i] = e[i];
  return t
}

function ca(e) {
  function t(n, r, s, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o),
      a = i >= n.length;
    return o = !o && k.isArray(s) ? s.length : o, a ? (k.hasOwnProp(s, o) ? s[o] = [s[o], r] : s[o] = r, !l) : ((!s[o] || !k.isObject(s[o])) && (s[o] = []), t(n, r, s[o], i) && k.isArray(s[o]) && (s[o] = Xd(s[o])), !l)
  }
  if (k.isFormData(e) && k.isFunction(e.entries)) {
    const n = {};
    return k.forEachEntry(e, (r, s) => {
      t(Qd(r), s, n, 0)
    }), n
  }
  return null
}

function Yd(e, t, n) {
  if (k.isString(e)) try {
    return (t || JSON.parse)(e), k.trim(e)
  } catch (r) {
    if (r.name !== "SyntaxError") throw r
  }
  return (n || JSON.stringify)(e)
}
const si = {
  transitional: la,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "",
      s = r.indexOf("application/json") > -1,
      i = k.isObject(t);
    if (i && k.isHTMLForm(t) && (t = new FormData(t)), k.isFormData(t)) return s && s ? JSON.stringify(ca(t)) : t;
    if (k.isArrayBuffer(t) || k.isBuffer(t) || k.isStream(t) || k.isFile(t) || k.isBlob(t)) return t;
    if (k.isArrayBufferView(t)) return t.buffer;
    if (k.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (i) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1) return Jd(t, this.formSerializer).toString();
      if ((l = k.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Mr(l ? {
          "files[]": t
        } : t, a && new a, this.formSerializer)
      }
    }
    return i || s ? (n.setContentType("application/json", !1), Yd(t)) : t
  }],
  transformResponse: [function(t) {
    const n = this.transitional || si.transitional,
      r = n && n.forcedJSONParsing,
      s = this.responseType === "json";
    if (t && k.isString(t) && (r && !this.responseType || s)) {
      const o = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t)
      } catch (l) {
        if (o) throw l.name === "SyntaxError" ? ie.from(l, ie.ERR_BAD_RESPONSE, this, null, this.response) : l
      }
    }
    return t
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: at.classes.FormData,
    Blob: at.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
k.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
  si.headers[e] = {}
});
const ii = si,
  eh = k.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
  th = e => {
    const t = {};
    let n, r, s;
    return e && e.split("\n").forEach(function(o) {
      s = o.indexOf(":"), n = o.substring(0, s).trim().toLowerCase(), r = o.substring(s + 1).trim(), !(!n || t[n] && eh[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
    }), t
  },
  go = Symbol("internals");

function _n(e) {
  return e && String(e).trim().toLowerCase()
}

function sr(e) {
  return e === !1 || e == null ? e : k.isArray(e) ? e.map(sr) : String(e)
}

function nh(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e);) t[r[1]] = r[2];
  return t
}
const rh = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

function Xr(e, t, n, r, s) {
  if (k.isFunction(r)) return r.call(this, t, n);
  if (s && (t = n), !!k.isString(t)) {
    if (k.isString(r)) return t.indexOf(r) !== -1;
    if (k.isRegExp(r)) return r.test(t)
  }
}

function sh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}

function ih(e, t) {
  const n = k.toCamelCase(" " + t);
  ["get", "set", "has"].forEach(r => {
    Object.defineProperty(e, r + n, {
      value: function(s, i, o) {
        return this[r].call(this, t, s, i, o)
      },
      configurable: !0
    })
  })
}
class Nr {
  constructor(t) {
    t && this.set(t)
  }
  set(t, n, r) {
    const s = this;

    function i(l, a, u) {
      const c = _n(a);
      if (!c) throw new Error("header name must be a non-empty string");
      const f = k.findKey(s, c);
      (!f || s[f] === void 0 || u === !0 || u === void 0 && s[f] !== !1) && (s[f || a] = sr(l))
    }
    const o = (l, a) => k.forEach(l, (u, c) => i(u, c, a));
    return k.isPlainObject(t) || t instanceof this.constructor ? o(t, n) : k.isString(t) && (t = t.trim()) && !rh(t) ? o(th(t), n) : t != null && i(n, t, r), this
  }
  get(t, n) {
    if (t = _n(t), t) {
      const r = k.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return nh(s);
        if (k.isFunction(n)) return n.call(this, s, r);
        if (k.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function")
      }
    }
  }
  has(t, n) {
    if (t = _n(t), t) {
      const r = k.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Xr(this, this[r], r, n)))
    }
    return !1
  }
  delete(t, n) {
    const r = this;
    let s = !1;

    function i(o) {
      if (o = _n(o), o) {
        const l = k.findKey(r, o);
        l && (!n || Xr(r, r[l], l, n)) && (delete r[l], s = !0)
      }
    }
    return k.isArray(t) ? t.forEach(i) : i(t), s
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--;) {
      const i = n[r];
      (!t || Xr(this, this[i], i, t, !0)) && (delete this[i], s = !0)
    }
    return s
  }
  normalize(t) {
    const n = this,
      r = {};
    return k.forEach(this, (s, i) => {
      const o = k.findKey(r, i);
      if (o) {
        n[o] = sr(s), delete n[i];
        return
      }
      const l = t ? sh(i) : String(i).trim();
      l !== i && delete n[i], n[l] = sr(s), r[l] = !0
    }), this
  }
  concat(...t) {
    return this.constructor.concat(this, ...t)
  }
  toJSON(t) {
    const n = Object.create(null);
    return k.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && k.isArray(r) ? r.join(", ") : r)
    }), n
  } [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join("\n")
  }
  get[Symbol.toStringTag]() {
    return "AxiosHeaders"
  }
  static from(t) {
    return t instanceof this ? t : new this(t)
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach(s => r.set(s)), r
  }
  static accessor(t) {
    const r = (this[go] = this[go] = {
        accessors: {}
      }).accessors,
      s = this.prototype;

    function i(o) {
      const l = _n(o);
      r[l] || (ih(s, o), r[l] = !0)
    }
    return k.isArray(t) ? t.forEach(i) : i(t), this
  }
}
Nr.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
k.reduceDescriptors(Nr.prototype, ({
  value: e
}, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r
    }
  }
});
k.freezeMethods(Nr);
const gt = Nr;

function Yr(e, t) {
  const n = this || ii,
    r = t || n,
    s = gt.from(r.headers);
  let i = r.data;
  return k.forEach(e, function(l) {
    i = l.call(n, i, s.normalize(), t ? t.status : void 0)
  }), s.normalize(), i
}

function ua(e) {
  return !!(e && e.__CANCEL__)
}

function Fn(e, t, n) {
  ie.call(this, e == null ? "canceled" : e, ie.ERR_CANCELED, t, n), this.name = "CanceledError"
}
k.inherits(Fn, ie, {
  __CANCEL__: !0
});

function oh(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new ie("Request failed with status code " + n.status, [ie.ERR_BAD_REQUEST, ie.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}
const lh = at.hasStandardBrowserEnv ? {
  write(e, t, n, r, s, i) {
    const o = [e + "=" + encodeURIComponent(t)];
    k.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), k.isString(r) && o.push("path=" + r), k.isString(s) && o.push("domain=" + s), i === !0 && o.push("secure"), document.cookie = o.join("; ")
  },
  read(e) {
    const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
    return t ? decodeURIComponent(t[3]) : null
  },
  remove(e) {
    this.write(e, "", Date.now() - 864e5)
  }
} : {
  write() {},
  read() {
    return null
  },
  remove() {}
};

function ah(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function ch(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function fa(e, t) {
  return e && !ah(t) ? ch(e, t) : t
}
const uh = at.hasStandardBrowserEnv ? function() {
  const t = /(msie|trident)/i.test(navigator.userAgent),
    n = document.createElement("a");
  let r;

  function s(i) {
    let o = i;
    return t && (n.setAttribute("href", o), o = n.href), n.setAttribute("href", o), {
      href: n.href,
      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
      host: n.host,
      search: n.search ? n.search.replace(/^\?/, "") : "",
      hash: n.hash ? n.hash.replace(/^#/, "") : "",
      hostname: n.hostname,
      port: n.port,
      pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
    }
  }
  return r = s(window.location.href),
    function(o) {
      const l = k.isString(o) ? s(o) : o;
      return l.protocol === r.protocol && l.host === r.host
    }
}() : function() {
  return function() {
    return !0
  }
}();

function fh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || ""
}

function dh(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    i = 0,
    o;
  return t = t !== void 0 ? t : 1e3,
    function(a) {
      const u = Date.now(),
        c = r[i];
      o || (o = u), n[s] = a, r[s] = u;
      let f = i,
        h = 0;
      for (; f !== s;) h += n[f++], f = f % e;
      if (s = (s + 1) % e, s === i && (i = (i + 1) % e), u - o < t) return;
      const g = c && u - c;
      return g ? Math.round(h * 1e3 / g) : void 0
    }
}

function mo(e, t) {
  let n = 0;
  const r = dh(50, 250);
  return s => {
    const i = s.loaded,
      o = s.lengthComputable ? s.total : void 0,
      l = i - n,
      a = r(l),
      u = i <= o;
    n = i;
    const c = {
      loaded: i,
      total: o,
      progress: o ? i / o : void 0,
      bytes: l,
      rate: a || void 0,
      estimated: a && o && u ? (o - i) / a : void 0,
      event: s
    };
    c[t ? "download" : "upload"] = !0, e(c)
  }
}
const hh = typeof XMLHttpRequest < "u",
  ph = hh && function(e) {
    return new Promise(function(n, r) {
      let s = e.data;
      const i = gt.from(e.headers).normalize();
      let {
        responseType: o,
        withXSRFToken: l
      } = e, a;

      function u() {
        e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a)
      }
      let c;
      if (k.isFormData(s)) {
        if (at.hasStandardBrowserEnv || at.hasStandardBrowserWebWorkerEnv) i.setContentType(!1);
        else if ((c = i.getContentType()) !== !1) {
          const [y, ...R] = c ? c.split(";").map(T => T.trim()).filter(Boolean) : [];
          i.setContentType([y || "multipart/form-data", ...R].join("; "))
        }
      }
      let f = new XMLHttpRequest;
      if (e.auth) {
        const y = e.auth.username || "",
          R = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
        i.set("Authorization", "Basic " + btoa(y + ":" + R))
      }
      const h = fa(e.baseURL, e.url);
      f.open(e.method.toUpperCase(), oa(h, e.params, e.paramsSerializer), !0), f.timeout = e.timeout;

      function g() {
        if (!f) return;
        const y = gt.from("getAllResponseHeaders" in f && f.getAllResponseHeaders()),
          T = {
            data: !o || o === "text" || o === "json" ? f.responseText : f.response,
            status: f.status,
            statusText: f.statusText,
            headers: y,
            config: e,
            request: f
          };
        oh(function(j) {
          n(j), u()
        }, function(j) {
          r(j), u()
        }, T), f = null
      }
      if ("onloadend" in f ? f.onloadend = g : f.onreadystatechange = function() {
          !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(g)
        }, f.onabort = function() {
          f && (r(new ie("Request aborted", ie.ECONNABORTED, e, f)), f = null)
        }, f.onerror = function() {
          r(new ie("Network Error", ie.ERR_NETWORK, e, f)), f = null
        }, f.ontimeout = function() {
          let R = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
          const T = e.transitional || la;
          e.timeoutErrorMessage && (R = e.timeoutErrorMessage), r(new ie(R, T.clarifyTimeoutError ? ie.ETIMEDOUT : ie.ECONNABORTED, e, f)), f = null
        }, at.hasStandardBrowserEnv && (l && k.isFunction(l) && (l = l(e)), l || l !== !1 && uh(h))) {
        const y = e.xsrfHeaderName && e.xsrfCookieName && lh.read(e.xsrfCookieName);
        y && i.set(e.xsrfHeaderName, y)
      }
      s === void 0 && i.setContentType(null), "setRequestHeader" in f && k.forEach(i.toJSON(), function(R, T) {
        f.setRequestHeader(T, R)
      }), k.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials), o && o !== "json" && (f.responseType = e.responseType), typeof e.onDownloadProgress == "function" && f.addEventListener("progress", mo(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", mo(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = y => {
        f && (r(!y || y.type ? new Fn(null, e, f) : y), f.abort(), f = null)
      }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
      const m = fh(h);
      if (m && at.protocols.indexOf(m) === -1) {
        r(new ie("Unsupported protocol " + m + ":", ie.ERR_BAD_REQUEST, e));
        return
      }
      f.send(s || null)
    })
  },
  Es = {
    http: Vd,
    xhr: ph
  };
k.forEach(Es, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", {
        value: t
      })
    } catch (n) {}
    Object.defineProperty(e, "adapterName", {
      value: t
    })
  }
});
const vo = e => "- ".concat(e),
  gh = e => k.isFunction(e) || e === null || e === !1,
  da = {
    getAdapter: e => {
      e = k.isArray(e) ? e : [e];
      const {
        length: t
      } = e;
      let n, r;
      const s = {};
      for (let i = 0; i < t; i++) {
        n = e[i];
        let o;
        if (r = n, !gh(n) && (r = Es[(o = String(n)).toLowerCase()], r === void 0)) throw new ie("Unknown adapter '".concat(o, "'"));
        if (r) break;
        s[o || "#" + i] = r
      }
      if (!r) {
        const i = Object.entries(s).map(([l, a]) => "adapter ".concat(l, " ") + (a === !1 ? "is not supported by the environment" : "is not available in the build"));
        let o = t ? i.length > 1 ? "since :\n" + i.map(vo).join("\n") : " " + vo(i[0]) : "as no adapter specified";
        throw new ie("There is no suitable adapter to dispatch the request " + o, "ERR_NOT_SUPPORT")
      }
      return r
    },
    adapters: Es
  };

function es(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Fn(null, e)
}

function bo(e) {
  return es(e), e.headers = gt.from(e.headers), e.data = Yr.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), da.getAdapter(e.adapter || ii.adapter)(e).then(function(r) {
    return es(e), r.data = Yr.call(e, e.transformResponse, r), r.headers = gt.from(r.headers), r
  }, function(r) {
    return ua(r) || (es(e), r && r.response && (r.response.data = Yr.call(e, e.transformResponse, r.response), r.response.headers = gt.from(r.response.headers))), Promise.reject(r)
  })
}
const yo = e => e instanceof gt ? e.toJSON() : e;

function hn(e, t) {
  t = t || {};
  const n = {};

  function r(u, c, f) {
    return k.isPlainObject(u) && k.isPlainObject(c) ? k.merge.call({
      caseless: f
    }, u, c) : k.isPlainObject(c) ? k.merge({}, c) : k.isArray(c) ? c.slice() : c
  }

  function s(u, c, f) {
    if (k.isUndefined(c)) {
      if (!k.isUndefined(u)) return r(void 0, u, f)
    } else return r(u, c, f)
  }

  function i(u, c) {
    if (!k.isUndefined(c)) return r(void 0, c)
  }

  function o(u, c) {
    if (k.isUndefined(c)) {
      if (!k.isUndefined(u)) return r(void 0, u)
    } else return r(void 0, c)
  }

  function l(u, c, f) {
    if (f in t) return r(u, c);
    if (f in e) return r(void 0, u)
  }
  const a = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (u, c) => s(yo(u), yo(c), !0)
  };
  return k.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const f = a[c] || s,
      h = f(e[c], t[c], c);
    k.isUndefined(h) && f !== l || (n[c] = h)
  }), n
}
const ha = "1.6.5",
  oi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  oi[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
  }
});
const wo = {};
oi.transitional = function(t, n, r) {
  function s(i, o) {
    return "[Axios v" + ha + "] Transitional option '" + i + "'" + o + (r ? ". " + r : "")
  }
  return (i, o, l) => {
    if (t === !1) throw new ie(s(o, " has been removed" + (n ? " in " + n : "")), ie.ERR_DEPRECATED);
    return n && !wo[o] && (wo[o] = !0, console.warn(s(o, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(i, o, l) : !0
  }
};

function mh(e, t, n) {
  if (typeof e != "object") throw new ie("options must be an object", ie.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0;) {
    const i = r[s],
      o = t[i];
    if (o) {
      const l = e[i],
        a = l === void 0 || o(l, i, e);
      if (a !== !0) throw new ie("option " + i + " must be " + a, ie.ERR_BAD_OPTION_VALUE);
      continue
    }
    if (n !== !0) throw new ie("Unknown option " + i, ie.ERR_BAD_OPTION)
  }
}
const Ss = {
    assertOptions: mh,
    validators: oi
  },
  wt = Ss.validators;
class mr {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new po,
      response: new po
    }
  }
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = hn(this.defaults, n);
    const {
      transitional: r,
      paramsSerializer: s,
      headers: i
    } = n;
    r !== void 0 && Ss.assertOptions(r, {
      silentJSONParsing: wt.transitional(wt.boolean),
      forcedJSONParsing: wt.transitional(wt.boolean),
      clarifyTimeoutError: wt.transitional(wt.boolean)
    }, !1), s != null && (k.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : Ss.assertOptions(s, {
      encode: wt.function,
      serialize: wt.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = i && k.merge(i.common, i[n.method]);
    i && k.forEach(["delete", "get", "head", "post", "put", "patch", "common"], m => {
      delete i[m]
    }), n.headers = gt.concat(o, i);
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (a = a && y.synchronous, l.unshift(y.fulfilled, y.rejected))
    });
    const u = [];
    this.interceptors.response.forEach(function(y) {
      u.push(y.fulfilled, y.rejected)
    });
    let c, f = 0,
      h;
    if (!a) {
      const m = [bo.bind(this), void 0];
      for (m.unshift.apply(m, l), m.push.apply(m, u), h = m.length, c = Promise.resolve(n); f < h;) c = c.then(m[f++], m[f++]);
      return c
    }
    h = l.length;
    let g = n;
    for (f = 0; f < h;) {
      const m = l[f++],
        y = l[f++];
      try {
        g = m(g)
      } catch (R) {
        y.call(this, R);
        break
      }
    }
    try {
      c = bo.call(this, g)
    } catch (m) {
      return Promise.reject(m)
    }
    for (f = 0, h = u.length; f < h;) c = c.then(u[f++], u[f++]);
    return c
  }
  getUri(t) {
    t = hn(this.defaults, t);
    const n = fa(t.baseURL, t.url);
    return oa(n, t.params, t.paramsSerializer)
  }
}
k.forEach(["delete", "get", "head", "options"], function(t) {
  mr.prototype[t] = function(n, r) {
    return this.request(hn(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }))
  }
});
k.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(i, o, l) {
      return this.request(hn(l || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }))
    }
  }
  mr.prototype[t] = n(), mr.prototype[t + "Form"] = n(!0)
});
const ir = mr;
class li {
  constructor(t) {
    if (typeof t != "function") throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i
    });
    const r = this;
    this.promise.then(s => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0;) r._listeners[i](s);
      r._listeners = null
    }), this.promise.then = s => {
      let i;
      const o = new Promise(l => {
        r.subscribe(l), i = l
      }).then(s);
      return o.cancel = function() {
        r.unsubscribe(i)
      }, o
    }, t(function(i, o, l) {
      r.reason || (r.reason = new Fn(i, o, l), n(r.reason))
    })
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t]
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1)
  }
  static source() {
    let t;
    return {
      token: new li(function(s) {
        t = s
      }),
      cancel: t
    }
  }
}
const vh = li;

function bh(e) {
  return function(n) {
    return e.apply(null, n)
  }
}

function yh(e) {
  return k.isObject(e) && e.isAxiosError === !0
}
const Cs = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Cs).forEach(([e, t]) => {
  Cs[t] = e
});
const wh = Cs;

function pa(e) {
  const t = new ir(e),
    n = Gl(ir.prototype.request, t);
  return k.extend(n, ir.prototype, t, {
    allOwnKeys: !0
  }), k.extend(n, t, null, {
    allOwnKeys: !0
  }), n.create = function(s) {
    return pa(hn(e, s))
  }, n
}
const fe = pa(ii);
fe.Axios = ir;
fe.CanceledError = Fn;
fe.CancelToken = vh;
fe.isCancel = ua;
fe.VERSION = ha;
fe.toFormData = Mr;
fe.AxiosError = ie;
fe.Cancel = fe.CanceledError;
fe.all = function(t) {
  return Promise.all(t)
};
fe.spread = bh;
fe.isAxiosError = yh;
fe.mergeConfig = hn;
fe.AxiosHeaders = gt;
fe.formToJSON = e => ca(k.isHTMLForm(e) ? new FormData(e) : e);
fe.getAdapter = da.getAdapter;
fe.HttpStatusCode = wh;
fe.default = fe;
var _h = "0123456789abcdefghijklmnopqrstuvwxyz";

function ht(e) {
  return _h.charAt(e)
}

function xh(e, t) {
  return e & t
}

function Wn(e, t) {
  return e | t
}

function _o(e, t) {
  return e ^ t
}

function xo(e, t) {
  return e & ~t
}

function kh(e) {
  if (e == 0) return -1;
  var t = 0;
  return e & 65535 || (e >>= 16, t += 16), e & 255 || (e >>= 8, t += 8), e & 15 || (e >>= 4, t += 4), e & 3 || (e >>= 2, t += 2), e & 1 || ++t, t
}

function Eh(e) {
  for (var t = 0; e != 0;) e &= e - 1, ++t;
  return t
}
var en = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  ga = "=";

function vr(e) {
  var t, n, r = "";
  for (t = 0; t + 3 <= e.length; t += 3) n = parseInt(e.substring(t, t + 3), 16), r += en.charAt(n >> 6) + en.charAt(n & 63);
  for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16), r += en.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16), r += en.charAt(n >> 2) + en.charAt((n & 3) << 4));
    (r.length & 3) > 0;) r += ga;
  return r
}

function ko(e) {
  var t = "",
    n, r = 0,
    s = 0;
  for (n = 0; n < e.length && e.charAt(n) != ga; ++n) {
    var i = en.indexOf(e.charAt(n));
    i < 0 || (r == 0 ? (t += ht(i >> 2), s = i & 3, r = 1) : r == 1 ? (t += ht(s << 2 | i >> 4), s = i & 15, r = 2) : r == 2 ? (t += ht(s), t += ht(i >> 2), s = i & 3, r = 3) : (t += ht(s << 2 | i >> 4), t += ht(i & 15), r = 0))
  }
  return r == 1 && (t += ht(s << 2)), t
}
var Zt, Sh = {
    decode: function(e) {
      var t;
      if (Zt === void 0) {
        var n = "0123456789ABCDEF",
          r = " \f\n\r	 \u2028\u2029";
        for (Zt = {}, t = 0; t < 16; ++t) Zt[n.charAt(t)] = t;
        for (n = n.toLowerCase(), t = 10; t < 16; ++t) Zt[n.charAt(t)] = t;
        for (t = 0; t < r.length; ++t) Zt[r.charAt(t)] = -1
      }
      var s = [],
        i = 0,
        o = 0;
      for (t = 0; t < e.length; ++t) {
        var l = e.charAt(t);
        if (l == "=") break;
        if (l = Zt[l], l != -1) {
          if (l === void 0) throw new Error("Illegal character at offset " + t);
          i |= l, ++o >= 2 ? (s[s.length] = i, i = 0, o = 0) : i <<= 4
        }
      }
      if (o) throw new Error("Hex encoding incomplete: 4 bits missing");
      return s
    }
  },
  Vt, Ts = {
    decode: function(e) {
      var t;
      if (Vt === void 0) {
        var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          r = "= \f\n\r	 \u2028\u2029";
        for (Vt = Object.create(null), t = 0; t < 64; ++t) Vt[n.charAt(t)] = t;
        for (Vt["-"] = 62, Vt._ = 63, t = 0; t < r.length; ++t) Vt[r.charAt(t)] = -1
      }
      var s = [],
        i = 0,
        o = 0;
      for (t = 0; t < e.length; ++t) {
        var l = e.charAt(t);
        if (l == "=") break;
        if (l = Vt[l], l != -1) {
          if (l === void 0) throw new Error("Illegal character at offset " + t);
          i |= l, ++o >= 4 ? (s[s.length] = i >> 16, s[s.length] = i >> 8 & 255, s[s.length] = i & 255, i = 0, o = 0) : i <<= 6
        }
      }
      switch (o) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          s[s.length] = i >> 10;
          break;
        case 3:
          s[s.length] = i >> 16, s[s.length] = i >> 8 & 255;
          break
      }
      return s
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(e) {
      var t = Ts.re.exec(e);
      if (t)
        if (t[1]) e = t[1];
        else if (t[2]) e = t[2];
      else throw new Error("RegExp out of sync");
      return Ts.decode(e)
    }
  },
  Jt = 1e13,
  kn = function() {
    function e(t) {
      this.buf = [+t || 0]
    }
    return e.prototype.mulAdd = function(t, n) {
      var r = this.buf,
        s = r.length,
        i, o;
      for (i = 0; i < s; ++i) o = r[i] * t + n, o < Jt ? n = 0 : (n = 0 | o / Jt, o -= n * Jt), r[i] = o;
      n > 0 && (r[i] = n)
    }, e.prototype.sub = function(t) {
      var n = this.buf,
        r = n.length,
        s, i;
      for (s = 0; s < r; ++s) i = n[s] - t, i < 0 ? (i += Jt, t = 1) : t = 0, n[s] = i;
      for (; n[n.length - 1] === 0;) n.pop()
    }, e.prototype.toString = function(t) {
      if ((t || 10) != 10) throw new Error("only base 10 is supported");
      for (var n = this.buf, r = n[n.length - 1].toString(), s = n.length - 2; s >= 0; --s) r += (Jt + n[s]).toString().substring(1);
      return r
    }, e.prototype.valueOf = function() {
      for (var t = this.buf, n = 0, r = t.length - 1; r >= 0; --r) n = n * Jt + t[r];
      return n
    }, e.prototype.simplify = function() {
      var t = this.buf;
      return t.length == 1 ? t[0] : this
    }, e
  }(),
  ma = "…",
  Ch = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
  Th = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function an(e, t) {
  return e.length > t && (e = e.substring(0, t) + ma), e
}
var ts = function() {
    function e(t, n) {
      this.hexDigits = "0123456789ABCDEF", t instanceof e ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = n)
    }
    return e.prototype.get = function(t) {
      if (t === void 0 && (t = this.pos++), t >= this.enc.length) throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
      return typeof this.enc == "string" ? this.enc.charCodeAt(t) : this.enc[t]
    }, e.prototype.hexByte = function(t) {
      return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(t & 15)
    }, e.prototype.hexDump = function(t, n, r) {
      for (var s = "", i = t; i < n; ++i)
        if (s += this.hexByte(this.get(i)), r !== !0) switch (i & 15) {
          case 7:
            s += "  ";
            break;
          case 15:
            s += "\n";
            break;
          default:
            s += " "
        }
      return s
    }, e.prototype.isASCII = function(t, n) {
      for (var r = t; r < n; ++r) {
        var s = this.get(r);
        if (s < 32 || s > 176) return !1
      }
      return !0
    }, e.prototype.parseStringISO = function(t, n) {
      for (var r = "", s = t; s < n; ++s) r += String.fromCharCode(this.get(s));
      return r
    }, e.prototype.parseStringUTF = function(t, n) {
      for (var r = "", s = t; s < n;) {
        var i = this.get(s++);
        i < 128 ? r += String.fromCharCode(i) : i > 191 && i < 224 ? r += String.fromCharCode((i & 31) << 6 | this.get(s++) & 63) : r += String.fromCharCode((i & 15) << 12 | (this.get(s++) & 63) << 6 | this.get(s++) & 63)
      }
      return r
    }, e.prototype.parseStringBMP = function(t, n) {
      for (var r = "", s, i, o = t; o < n;) s = this.get(o++), i = this.get(o++), r += String.fromCharCode(s << 8 | i);
      return r
    }, e.prototype.parseTime = function(t, n, r) {
      var s = this.parseStringISO(t, n),
        i = (r ? Ch : Th).exec(s);
      return i ? (r && (i[1] = +i[1], i[1] += +i[1] < 70 ? 2e3 : 1900), s = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4], i[5] && (s += ":" + i[5], i[6] && (s += ":" + i[6], i[7] && (s += "." + i[7]))), i[8] && (s += " UTC", i[8] != "Z" && (s += i[8], i[9] && (s += ":" + i[9]))), s) : "Unrecognized time: " + s
    }, e.prototype.parseInteger = function(t, n) {
      for (var r = this.get(t), s = r > 127, i = s ? 255 : 0, o, l = ""; r == i && ++t < n;) r = this.get(t);
      if (o = n - t, o === 0) return s ? -1 : 0;
      if (o > 4) {
        for (l = r, o <<= 3; !((+l ^ i) & 128);) l = +l << 1, --o;
        l = "(" + o + " bit)\n"
      }
      s && (r = r - 256);
      for (var a = new kn(r), u = t + 1; u < n; ++u) a.mulAdd(256, this.get(u));
      return l + a.toString()
    }, e.prototype.parseBitString = function(t, n, r) {
      for (var s = this.get(t), i = (n - t - 1 << 3) - s, o = "(" + i + " bit)\n", l = "", a = t + 1; a < n; ++a) {
        for (var u = this.get(a), c = a == n - 1 ? s : 0, f = 7; f >= c; --f) l += u >> f & 1 ? "1" : "0";
        if (l.length > r) return o + an(l, r)
      }
      return o + l
    }, e.prototype.parseOctetString = function(t, n, r) {
      if (this.isASCII(t, n)) return an(this.parseStringISO(t, n), r);
      var s = n - t,
        i = "(" + s + " byte)\n";
      r /= 2, s > r && (n = t + r);
      for (var o = t; o < n; ++o) i += this.hexByte(this.get(o));
      return s > r && (i += ma), i
    }, e.prototype.parseOID = function(t, n, r) {
      for (var s = "", i = new kn, o = 0, l = t; l < n; ++l) {
        var a = this.get(l);
        if (i.mulAdd(128, a & 127), o += 7, !(a & 128)) {
          if (s === "")
            if (i = i.simplify(), i instanceof kn) i.sub(80), s = "2." + i.toString();
            else {
              var u = i < 80 ? i < 40 ? 0 : 1 : 2;
              s = u + "." + (i - u * 40)
            }
          else s += "." + i.toString();
          if (s.length > r) return an(s, r);
          i = new kn, o = 0
        }
      }
      return o > 0 && (s += ".incomplete"), s
    }, e
  }(),
  Rh = function() {
    function e(t, n, r, s, i) {
      if (!(s instanceof Eo)) throw new Error("Invalid tag value.");
      this.stream = t, this.header = n, this.length = r, this.tag = s, this.sub = i
    }
    return e.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            case 20:
              return "TeletexString";
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString"
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
          return "Private_" + this.tag.tagNumber.toString()
      }
    }, e.prototype.content = function(t) {
      if (this.tag === void 0) return null;
      t === void 0 && (t = 1 / 0);
      var n = this.posContent(),
        r = Math.abs(this.length);
      if (!this.tag.isUniversal()) return this.sub !== null ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + r, t);
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(n) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(n, n + r);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + r, t);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + r, t);
        case 6:
          return this.stream.parseOID(n, n + r, t);
        case 16:
        case 17:
          return this.sub !== null ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return an(this.stream.parseStringUTF(n, n + r), t);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return an(this.stream.parseStringISO(n, n + r), t);
        case 30:
          return an(this.stream.parseStringBMP(n, n + r), t);
        case 23:
        case 24:
          return this.stream.parseTime(n, n + r, this.tag.tagNumber == 23)
      }
      return null
    }, e.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]"
    }, e.prototype.toPrettyString = function(t) {
      t === void 0 && (t = "");
      var n = t + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (n += "+"), n += this.length, this.tag.tagConstructed ? n += " (constructed)" : this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null && (n += " (encapsulates)"), n += "\n", this.sub !== null) {
        t += "  ";
        for (var r = 0, s = this.sub.length; r < s; ++r) n += this.sub[r].toPrettyString(t)
      }
      return n
    }, e.prototype.posStart = function() {
      return this.stream.pos
    }, e.prototype.posContent = function() {
      return this.stream.pos + this.header
    }, e.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length)
    }, e.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    }, e.decodeLength = function(t) {
      var n = t.get(),
        r = n & 127;
      if (r == n) return r;
      if (r > 6) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
      if (r === 0) return null;
      n = 0;
      for (var s = 0; s < r; ++s) n = n * 256 + t.get();
      return n
    }, e.prototype.getHexStringValue = function() {
      var t = this.toHexString(),
        n = this.header * 2,
        r = this.length * 2;
      return t.substr(n, r)
    }, e.decode = function(t) {
      var n;
      t instanceof ts ? n = t : n = new ts(t, 0);
      var r = new ts(n),
        s = new Eo(n),
        i = e.decodeLength(n),
        o = n.pos,
        l = o - r.pos,
        a = null,
        u = function() {
          var f = [];
          if (i !== null) {
            for (var h = o + i; n.pos < h;) f[f.length] = e.decode(n);
            if (n.pos != h) throw new Error("Content size is not correct for container starting at offset " + o)
          } else try {
            for (;;) {
              var g = e.decode(n);
              if (g.tag.isEOC()) break;
              f[f.length] = g
            }
            i = o - n.pos
          } catch (m) {
            throw new Error("Exception while decoding undefined length content: " + m)
          }
          return f
        };
      if (s.tagConstructed) a = u();
      else if (s.isUniversal() && (s.tagNumber == 3 || s.tagNumber == 4)) try {
        if (s.tagNumber == 3 && n.get() != 0) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
        a = u();
        for (var c = 0; c < a.length; ++c)
          if (a[c].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
      } catch (f) {
        a = null
      }
      if (a === null) {
        if (i === null) throw new Error("We can't skip over an invalid tag with undefined length at offset " + o);
        n.pos = o + Math.abs(i)
      }
      return new e(r, l, i, s, a)
    }, e
  }(),
  Eo = function() {
    function e(t) {
      var n = t.get();
      if (this.tagClass = n >> 6, this.tagConstructed = (n & 32) !== 0, this.tagNumber = n & 31, this.tagNumber == 31) {
        var r = new kn;
        do n = t.get(), r.mulAdd(128, n & 127); while (n & 128);
        this.tagNumber = r.simplify()
      }
    }
    return e.prototype.isUniversal = function() {
      return this.tagClass === 0
    }, e.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0
    }, e
  }(),
  Pt, Oh = 0xdeadbeefcafe,
  So = (Oh & 16777215) == 15715070,
  Be = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
  Ah = (1 << 26) / Be[Be.length - 1],
  ee = function() {
    function e(t, n, r) {
      t != null && (typeof t == "number" ? this.fromNumber(t, n, r) : n == null && typeof t != "string" ? this.fromString(t, 256) : this.fromString(t, n))
    }
    return e.prototype.toString = function(t) {
      if (this.s < 0) return "-" + this.negate().toString(t);
      var n;
      if (t == 16) n = 4;
      else if (t == 8) n = 3;
      else if (t == 2) n = 1;
      else if (t == 32) n = 5;
      else if (t == 4) n = 2;
      else return this.toRadix(t);
      var r = (1 << n) - 1,
        s, i = !1,
        o = "",
        l = this.t,
        a = this.DB - l * this.DB % n;
      if (l-- > 0)
        for (a < this.DB && (s = this[l] >> a) > 0 && (i = !0, o = ht(s)); l >= 0;) a < n ? (s = (this[l] & (1 << a) - 1) << n - a, s |= this[--l] >> (a += this.DB - n)) : (s = this[l] >> (a -= n) & r, a <= 0 && (a += this.DB, --l)), s > 0 && (i = !0), i && (o += ht(s));
      return i ? o : "0"
    }, e.prototype.negate = function() {
      var t = te();
      return e.ZERO.subTo(this, t), t
    }, e.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this
    }, e.prototype.compareTo = function(t) {
      var n = this.s - t.s;
      if (n != 0) return n;
      var r = this.t;
      if (n = r - t.t, n != 0) return this.s < 0 ? -n : n;
      for (; --r >= 0;)
        if ((n = this[r] - t[r]) != 0) return n;
      return 0
    }, e.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + Gn(this[this.t - 1] ^ this.s & this.DM)
    }, e.prototype.mod = function(t) {
      var n = te();
      return this.abs().divRemTo(t, null, n), this.s < 0 && n.compareTo(e.ZERO) > 0 && t.subTo(n, n), n
    }, e.prototype.modPowInt = function(t, n) {
      var r;
      return t < 256 || n.isEven() ? r = new Co(n) : r = new To(n), this.exp(t, r)
    }, e.prototype.clone = function() {
      var t = te();
      return this.copyTo(t), t
    }, e.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1) return this[0] - this.DV;
        if (this.t == 0) return -1
      } else {
        if (this.t == 1) return this[0];
        if (this.t == 0) return 0
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }, e.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24
    }, e.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16
    }, e.prototype.signum = function() {
      return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1
    }, e.prototype.toByteArray = function() {
      var t = this.t,
        n = [];
      n[0] = this.s;
      var r = this.DB - t * this.DB % 8,
        s, i = 0;
      if (t-- > 0)
        for (r < this.DB && (s = this[t] >> r) != (this.s & this.DM) >> r && (n[i++] = s | this.s << this.DB - r); t >= 0;) r < 8 ? (s = (this[t] & (1 << r) - 1) << 8 - r, s |= this[--t] >> (r += this.DB - 8)) : (s = this[t] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --t)), s & 128 && (s |= -256), i == 0 && (this.s & 128) != (s & 128) && ++i, (i > 0 || s != this.s) && (n[i++] = s);
      return n
    }, e.prototype.equals = function(t) {
      return this.compareTo(t) == 0
    }, e.prototype.min = function(t) {
      return this.compareTo(t) < 0 ? this : t
    }, e.prototype.max = function(t) {
      return this.compareTo(t) > 0 ? this : t
    }, e.prototype.and = function(t) {
      var n = te();
      return this.bitwiseTo(t, xh, n), n
    }, e.prototype.or = function(t) {
      var n = te();
      return this.bitwiseTo(t, Wn, n), n
    }, e.prototype.xor = function(t) {
      var n = te();
      return this.bitwiseTo(t, _o, n), n
    }, e.prototype.andNot = function(t) {
      var n = te();
      return this.bitwiseTo(t, xo, n), n
    }, e.prototype.not = function() {
      for (var t = te(), n = 0; n < this.t; ++n) t[n] = this.DM & ~this[n];
      return t.t = this.t, t.s = ~this.s, t
    }, e.prototype.shiftLeft = function(t) {
      var n = te();
      return t < 0 ? this.rShiftTo(-t, n) : this.lShiftTo(t, n), n
    }, e.prototype.shiftRight = function(t) {
      var n = te();
      return t < 0 ? this.lShiftTo(-t, n) : this.rShiftTo(t, n), n
    }, e.prototype.getLowestSetBit = function() {
      for (var t = 0; t < this.t; ++t)
        if (this[t] != 0) return t * this.DB + kh(this[t]);
      return this.s < 0 ? this.t * this.DB : -1
    }, e.prototype.bitCount = function() {
      for (var t = 0, n = this.s & this.DM, r = 0; r < this.t; ++r) t += Eh(this[r] ^ n);
      return t
    }, e.prototype.testBit = function(t) {
      var n = Math.floor(t / this.DB);
      return n >= this.t ? this.s != 0 : (this[n] & 1 << t % this.DB) != 0
    }, e.prototype.setBit = function(t) {
      return this.changeBit(t, Wn)
    }, e.prototype.clearBit = function(t) {
      return this.changeBit(t, xo)
    }, e.prototype.flipBit = function(t) {
      return this.changeBit(t, _o)
    }, e.prototype.add = function(t) {
      var n = te();
      return this.addTo(t, n), n
    }, e.prototype.subtract = function(t) {
      var n = te();
      return this.subTo(t, n), n
    }, e.prototype.multiply = function(t) {
      var n = te();
      return this.multiplyTo(t, n), n
    }, e.prototype.divide = function(t) {
      var n = te();
      return this.divRemTo(t, n, null), n
    }, e.prototype.remainder = function(t) {
      var n = te();
      return this.divRemTo(t, null, n), n
    }, e.prototype.divideAndRemainder = function(t) {
      var n = te(),
        r = te();
      return this.divRemTo(t, n, r), [n, r]
    }, e.prototype.modPow = function(t, n) {
      var r = t.bitLength(),
        s, i = St(1),
        o;
      if (r <= 0) return i;
      r < 18 ? s = 1 : r < 48 ? s = 3 : r < 144 ? s = 4 : r < 768 ? s = 5 : s = 6, r < 8 ? o = new Co(n) : n.isEven() ? o = new Ph(n) : o = new To(n);
      var l = [],
        a = 3,
        u = s - 1,
        c = (1 << s) - 1;
      if (l[1] = o.convert(this), s > 1) {
        var f = te();
        for (o.sqrTo(l[1], f); a <= c;) l[a] = te(), o.mulTo(f, l[a - 2], l[a]), a += 2
      }
      var h = t.t - 1,
        g, m = !0,
        y = te(),
        R;
      for (r = Gn(t[h]) - 1; h >= 0;) {
        for (r >= u ? g = t[h] >> r - u & c : (g = (t[h] & (1 << r + 1) - 1) << u - r, h > 0 && (g |= t[h - 1] >> this.DB + r - u)), a = s; !(g & 1);) g >>= 1, --a;
        if ((r -= a) < 0 && (r += this.DB, --h), m) l[g].copyTo(i), m = !1;
        else {
          for (; a > 1;) o.sqrTo(i, y), o.sqrTo(y, i), a -= 2;
          a > 0 ? o.sqrTo(i, y) : (R = i, i = y, y = R), o.mulTo(y, l[g], i)
        }
        for (; h >= 0 && !(t[h] & 1 << r);) o.sqrTo(i, y), R = i, i = y, y = R, --r < 0 && (r = this.DB - 1, --h)
      }
      return o.revert(i)
    }, e.prototype.modInverse = function(t) {
      var n = t.isEven();
      if (this.isEven() && n || t.signum() == 0) return e.ZERO;
      for (var r = t.clone(), s = this.clone(), i = St(1), o = St(0), l = St(0), a = St(1); r.signum() != 0;) {
        for (; r.isEven();) r.rShiftTo(1, r), n ? ((!i.isEven() || !o.isEven()) && (i.addTo(this, i), o.subTo(t, o)), i.rShiftTo(1, i)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
        for (; s.isEven();) s.rShiftTo(1, s), n ? ((!l.isEven() || !a.isEven()) && (l.addTo(this, l), a.subTo(t, a)), l.rShiftTo(1, l)) : a.isEven() || a.subTo(t, a), a.rShiftTo(1, a);
        r.compareTo(s) >= 0 ? (r.subTo(s, r), n && i.subTo(l, i), o.subTo(a, o)) : (s.subTo(r, s), n && l.subTo(i, l), a.subTo(o, a))
      }
      if (s.compareTo(e.ONE) != 0) return e.ZERO;
      if (a.compareTo(t) >= 0) return a.subtract(t);
      if (a.signum() < 0) a.addTo(t, a);
      else return a;
      return a.signum() < 0 ? a.add(t) : a
    }, e.prototype.pow = function(t) {
      return this.exp(t, new Lh)
    }, e.prototype.gcd = function(t) {
      var n = this.s < 0 ? this.negate() : this.clone(),
        r = t.s < 0 ? t.negate() : t.clone();
      if (n.compareTo(r) < 0) {
        var s = n;
        n = r, r = s
      }
      var i = n.getLowestSetBit(),
        o = r.getLowestSetBit();
      if (o < 0) return n;
      for (i < o && (o = i), o > 0 && (n.rShiftTo(o, n), r.rShiftTo(o, r)); n.signum() > 0;)(i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n), (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r), n.compareTo(r) >= 0 ? (n.subTo(r, n), n.rShiftTo(1, n)) : (r.subTo(n, r), r.rShiftTo(1, r));
      return o > 0 && r.lShiftTo(o, r), r
    }, e.prototype.isProbablePrime = function(t) {
      var n, r = this.abs();
      if (r.t == 1 && r[0] <= Be[Be.length - 1]) {
        for (n = 0; n < Be.length; ++n)
          if (r[0] == Be[n]) return !0;
        return !1
      }
      if (r.isEven()) return !1;
      for (n = 1; n < Be.length;) {
        for (var s = Be[n], i = n + 1; i < Be.length && s < Ah;) s *= Be[i++];
        for (s = r.modInt(s); n < i;)
          if (s % Be[n++] == 0) return !1
      }
      return r.millerRabin(t)
    }, e.prototype.copyTo = function(t) {
      for (var n = this.t - 1; n >= 0; --n) t[n] = this[n];
      t.t = this.t, t.s = this.s
    }, e.prototype.fromInt = function(t) {
      this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
    }, e.prototype.fromString = function(t, n) {
      var r;
      if (n == 16) r = 4;
      else if (n == 8) r = 3;
      else if (n == 256) r = 8;
      else if (n == 2) r = 1;
      else if (n == 32) r = 5;
      else if (n == 4) r = 2;
      else {
        this.fromRadix(t, n);
        return
      }
      this.t = 0, this.s = 0;
      for (var s = t.length, i = !1, o = 0; --s >= 0;) {
        var l = r == 8 ? +t[s] & 255 : Oo(t, s);
        if (l < 0) {
          t.charAt(s) == "-" && (i = !0);
          continue
        }
        i = !1, o == 0 ? this[this.t++] = l : o + r > this.DB ? (this[this.t - 1] |= (l & (1 << this.DB - o) - 1) << o, this[this.t++] = l >> this.DB - o) : this[this.t - 1] |= l << o, o += r, o >= this.DB && (o -= this.DB)
      }
      r == 8 && +t[0] & 128 && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), i && e.ZERO.subTo(this, this)
    }, e.prototype.clamp = function() {
      for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
    }, e.prototype.dlShiftTo = function(t, n) {
      var r;
      for (r = this.t - 1; r >= 0; --r) n[r + t] = this[r];
      for (r = t - 1; r >= 0; --r) n[r] = 0;
      n.t = this.t + t, n.s = this.s
    }, e.prototype.drShiftTo = function(t, n) {
      for (var r = t; r < this.t; ++r) n[r - t] = this[r];
      n.t = Math.max(this.t - t, 0), n.s = this.s
    }, e.prototype.lShiftTo = function(t, n) {
      for (var r = t % this.DB, s = this.DB - r, i = (1 << s) - 1, o = Math.floor(t / this.DB), l = this.s << r & this.DM, a = this.t - 1; a >= 0; --a) n[a + o + 1] = this[a] >> s | l, l = (this[a] & i) << r;
      for (var a = o - 1; a >= 0; --a) n[a] = 0;
      n[o] = l, n.t = this.t + o + 1, n.s = this.s, n.clamp()
    }, e.prototype.rShiftTo = function(t, n) {
      n.s = this.s;
      var r = Math.floor(t / this.DB);
      if (r >= this.t) {
        n.t = 0;
        return
      }
      var s = t % this.DB,
        i = this.DB - s,
        o = (1 << s) - 1;
      n[0] = this[r] >> s;
      for (var l = r + 1; l < this.t; ++l) n[l - r - 1] |= (this[l] & o) << i, n[l - r] = this[l] >> s;
      s > 0 && (n[this.t - r - 1] |= (this.s & o) << i), n.t = this.t - r, n.clamp()
    }, e.prototype.subTo = function(t, n) {
      for (var r = 0, s = 0, i = Math.min(t.t, this.t); r < i;) s += this[r] - t[r], n[r++] = s & this.DM, s >>= this.DB;
      if (t.t < this.t) {
        for (s -= t.s; r < this.t;) s += this[r], n[r++] = s & this.DM, s >>= this.DB;
        s += this.s
      } else {
        for (s += this.s; r < t.t;) s -= t[r], n[r++] = s & this.DM, s >>= this.DB;
        s -= t.s
      }
      n.s = s < 0 ? -1 : 0, s < -1 ? n[r++] = this.DV + s : s > 0 && (n[r++] = s), n.t = r, n.clamp()
    }, e.prototype.multiplyTo = function(t, n) {
      var r = this.abs(),
        s = t.abs(),
        i = r.t;
      for (n.t = i + s.t; --i >= 0;) n[i] = 0;
      for (i = 0; i < s.t; ++i) n[i + r.t] = r.am(0, s[i], n, i, 0, r.t);
      n.s = 0, n.clamp(), this.s != t.s && e.ZERO.subTo(n, n)
    }, e.prototype.squareTo = function(t) {
      for (var n = this.abs(), r = t.t = 2 * n.t; --r >= 0;) t[r] = 0;
      for (r = 0; r < n.t - 1; ++r) {
        var s = n.am(r, n[r], t, 2 * r, 0, 1);
        (t[r + n.t] += n.am(r + 1, 2 * n[r], t, 2 * r + 1, s, n.t - r - 1)) >= n.DV && (t[r + n.t] -= n.DV, t[r + n.t + 1] = 1)
      }
      t.t > 0 && (t[t.t - 1] += n.am(r, n[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
    }, e.prototype.divRemTo = function(t, n, r) {
      var s = t.abs();
      if (!(s.t <= 0)) {
        var i = this.abs();
        if (i.t < s.t) {
          n != null && n.fromInt(0), r != null && this.copyTo(r);
          return
        }
        r == null && (r = te());
        var o = te(),
          l = this.s,
          a = t.s,
          u = this.DB - Gn(s[s.t - 1]);
        u > 0 ? (s.lShiftTo(u, o), i.lShiftTo(u, r)) : (s.copyTo(o), i.copyTo(r));
        var c = o.t,
          f = o[c - 1];
        if (f != 0) {
          var h = f * (1 << this.F1) + (c > 1 ? o[c - 2] >> this.F2 : 0),
            g = this.FV / h,
            m = (1 << this.F1) / h,
            y = 1 << this.F2,
            R = r.t,
            T = R - c,
            B = n == null ? te() : n;
          for (o.dlShiftTo(T, B), r.compareTo(B) >= 0 && (r[r.t++] = 1, r.subTo(B, r)), e.ONE.dlShiftTo(c, B), B.subTo(o, o); o.t < c;) o[o.t++] = 0;
          for (; --T >= 0;) {
            var j = r[--R] == f ? this.DM : Math.floor(r[R] * g + (r[R - 1] + y) * m);
            if ((r[R] += o.am(0, j, r, T, 0, c)) < j)
              for (o.dlShiftTo(T, B), r.subTo(B, r); r[R] < --j;) r.subTo(B, r)
          }
          n != null && (r.drShiftTo(c, n), l != a && e.ZERO.subTo(n, n)), r.t = c, r.clamp(), u > 0 && r.rShiftTo(u, r), l < 0 && e.ZERO.subTo(r, r)
        }
      }
    }, e.prototype.invDigit = function() {
      if (this.t < 1) return 0;
      var t = this[0];
      if (!(t & 1)) return 0;
      var n = t & 3;
      return n = n * (2 - (t & 15) * n) & 15, n = n * (2 - (t & 255) * n) & 255, n = n * (2 - ((t & 65535) * n & 65535)) & 65535, n = n * (2 - t * n % this.DV) % this.DV, n > 0 ? this.DV - n : -n
    }, e.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }, e.prototype.exp = function(t, n) {
      if (t > 4294967295 || t < 1) return e.ONE;
      var r = te(),
        s = te(),
        i = n.convert(this),
        o = Gn(t) - 1;
      for (i.copyTo(r); --o >= 0;)
        if (n.sqrTo(r, s), (t & 1 << o) > 0) n.mulTo(s, i, r);
        else {
          var l = r;
          r = s, s = l
        } return n.revert(r)
    }, e.prototype.chunkSize = function(t) {
      return Math.floor(Math.LN2 * this.DB / Math.log(t))
    }, e.prototype.toRadix = function(t) {
      if (t == null && (t = 10), this.signum() == 0 || t < 2 || t > 36) return "0";
      var n = this.chunkSize(t),
        r = Math.pow(t, n),
        s = St(r),
        i = te(),
        o = te(),
        l = "";
      for (this.divRemTo(s, i, o); i.signum() > 0;) l = (r + o.intValue()).toString(t).substr(1) + l, i.divRemTo(s, i, o);
      return o.intValue().toString(t) + l
    }, e.prototype.fromRadix = function(t, n) {
      this.fromInt(0), n == null && (n = 10);
      for (var r = this.chunkSize(n), s = Math.pow(n, r), i = !1, o = 0, l = 0, a = 0; a < t.length; ++a) {
        var u = Oo(t, a);
        if (u < 0) {
          t.charAt(a) == "-" && this.signum() == 0 && (i = !0);
          continue
        }
        l = n * l + u, ++o >= r && (this.dMultiply(s), this.dAddOffset(l, 0), o = 0, l = 0)
      }
      o > 0 && (this.dMultiply(Math.pow(n, o)), this.dAddOffset(l, 0)), i && e.ZERO.subTo(this, this)
    }, e.prototype.fromNumber = function(t, n, r) {
      if (typeof n == "number")
        if (t < 2) this.fromInt(1);
        else
          for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), Wn, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this);
      else {
        var s = [],
          i = t & 7;
        s.length = (t >> 3) + 1, n.nextBytes(s), i > 0 ? s[0] &= (1 << i) - 1 : s[0] = 0, this.fromString(s, 256)
      }
    }, e.prototype.bitwiseTo = function(t, n, r) {
      var s, i, o = Math.min(t.t, this.t);
      for (s = 0; s < o; ++s) r[s] = n(this[s], t[s]);
      if (t.t < this.t) {
        for (i = t.s & this.DM, s = o; s < this.t; ++s) r[s] = n(this[s], i);
        r.t = this.t
      } else {
        for (i = this.s & this.DM, s = o; s < t.t; ++s) r[s] = n(i, t[s]);
        r.t = t.t
      }
      r.s = n(this.s, t.s), r.clamp()
    }, e.prototype.changeBit = function(t, n) {
      var r = e.ONE.shiftLeft(t);
      return this.bitwiseTo(r, n, r), r
    }, e.prototype.addTo = function(t, n) {
      for (var r = 0, s = 0, i = Math.min(t.t, this.t); r < i;) s += this[r] + t[r], n[r++] = s & this.DM, s >>= this.DB;
      if (t.t < this.t) {
        for (s += t.s; r < this.t;) s += this[r], n[r++] = s & this.DM, s >>= this.DB;
        s += this.s
      } else {
        for (s += this.s; r < t.t;) s += t[r], n[r++] = s & this.DM, s >>= this.DB;
        s += t.s
      }
      n.s = s < 0 ? -1 : 0, s > 0 ? n[r++] = s : s < -1 && (n[r++] = this.DV + s), n.t = r, n.clamp()
    }, e.prototype.dMultiply = function(t) {
      this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
    }, e.prototype.dAddOffset = function(t, n) {
      if (t != 0) {
        for (; this.t <= n;) this[this.t++] = 0;
        for (this[n] += t; this[n] >= this.DV;) this[n] -= this.DV, ++n >= this.t && (this[this.t++] = 0), ++this[n]
      }
    }, e.prototype.multiplyLowerTo = function(t, n, r) {
      var s = Math.min(this.t + t.t, n);
      for (r.s = 0, r.t = s; s > 0;) r[--s] = 0;
      for (var i = r.t - this.t; s < i; ++s) r[s + this.t] = this.am(0, t[s], r, s, 0, this.t);
      for (var i = Math.min(t.t, n); s < i; ++s) this.am(0, t[s], r, s, 0, n - s);
      r.clamp()
    }, e.prototype.multiplyUpperTo = function(t, n, r) {
      --n;
      var s = r.t = this.t + t.t - n;
      for (r.s = 0; --s >= 0;) r[s] = 0;
      for (s = Math.max(n - this.t, 0); s < t.t; ++s) r[this.t + s - n] = this.am(n - s, t[s], r, 0, 0, this.t + s - n);
      r.clamp(), r.drShiftTo(1, r)
    }, e.prototype.modInt = function(t) {
      if (t <= 0) return 0;
      var n = this.DV % t,
        r = this.s < 0 ? t - 1 : 0;
      if (this.t > 0)
        if (n == 0) r = this[0] % t;
        else
          for (var s = this.t - 1; s >= 0; --s) r = (n * r + this[s]) % t;
      return r
    }, e.prototype.millerRabin = function(t) {
      var n = this.subtract(e.ONE),
        r = n.getLowestSetBit();
      if (r <= 0) return !1;
      var s = n.shiftRight(r);
      t = t + 1 >> 1, t > Be.length && (t = Be.length);
      for (var i = te(), o = 0; o < t; ++o) {
        i.fromInt(Be[Math.floor(Math.random() * Be.length)]);
        var l = i.modPow(s, this);
        if (l.compareTo(e.ONE) != 0 && l.compareTo(n) != 0) {
          for (var a = 1; a++ < r && l.compareTo(n) != 0;)
            if (l = l.modPowInt(2, this), l.compareTo(e.ONE) == 0) return !1;
          if (l.compareTo(n) != 0) return !1
        }
      }
      return !0
    }, e.prototype.square = function() {
      var t = te();
      return this.squareTo(t), t
    }, e.prototype.gcda = function(t, n) {
      var r = this.s < 0 ? this.negate() : this.clone(),
        s = t.s < 0 ? t.negate() : t.clone();
      if (r.compareTo(s) < 0) {
        var i = r;
        r = s, s = i
      }
      var o = r.getLowestSetBit(),
        l = s.getLowestSetBit();
      if (l < 0) {
        n(r);
        return
      }
      o < l && (l = o), l > 0 && (r.rShiftTo(l, r), s.rShiftTo(l, s));
      var a = function() {
        (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r), (o = s.getLowestSetBit()) > 0 && s.rShiftTo(o, s), r.compareTo(s) >= 0 ? (r.subTo(s, r), r.rShiftTo(1, r)) : (s.subTo(r, s), s.rShiftTo(1, s)), r.signum() > 0 ? setTimeout(a, 0) : (l > 0 && s.lShiftTo(l, s), setTimeout(function() {
          n(s)
        }, 0))
      };
      setTimeout(a, 10)
    }, e.prototype.fromNumberAsync = function(t, n, r, s) {
      if (typeof n == "number")
        if (t < 2) this.fromInt(1);
        else {
          this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), Wn, this), this.isEven() && this.dAddOffset(1, 0);
          var i = this,
            o = function() {
              i.dAddOffset(2, 0), i.bitLength() > t && i.subTo(e.ONE.shiftLeft(t - 1), i), i.isProbablePrime(n) ? setTimeout(function() {
                s()
              }, 0) : setTimeout(o, 0)
            };
          setTimeout(o, 0)
        }
      else {
        var l = [],
          a = t & 7;
        l.length = (t >> 3) + 1, n.nextBytes(l), a > 0 ? l[0] &= (1 << a) - 1 : l[0] = 0, this.fromString(l, 256)
      }
    }, e
  }(),
  Lh = function() {
    function e() {}
    return e.prototype.convert = function(t) {
      return t
    }, e.prototype.revert = function(t) {
      return t
    }, e.prototype.mulTo = function(t, n, r) {
      t.multiplyTo(n, r)
    }, e.prototype.sqrTo = function(t, n) {
      t.squareTo(n)
    }, e
  }(),
  Co = function() {
    function e(t) {
      this.m = t
    }
    return e.prototype.convert = function(t) {
      return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }, e.prototype.revert = function(t) {
      return t
    }, e.prototype.reduce = function(t) {
      t.divRemTo(this.m, null, t)
    }, e.prototype.mulTo = function(t, n, r) {
      t.multiplyTo(n, r), this.reduce(r)
    }, e.prototype.sqrTo = function(t, n) {
      t.squareTo(n), this.reduce(n)
    }, e
  }(),
  To = function() {
    function e(t) {
      this.m = t, this.mp = t.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
    }
    return e.prototype.convert = function(t) {
      var n = te();
      return t.abs().dlShiftTo(this.m.t, n), n.divRemTo(this.m, null, n), t.s < 0 && n.compareTo(ee.ZERO) > 0 && this.m.subTo(n, n), n
    }, e.prototype.revert = function(t) {
      var n = te();
      return t.copyTo(n), this.reduce(n), n
    }, e.prototype.reduce = function(t) {
      for (; t.t <= this.mt2;) t[t.t++] = 0;
      for (var n = 0; n < this.m.t; ++n) {
        var r = t[n] & 32767,
          s = r * this.mpl + ((r * this.mph + (t[n] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (r = n + this.m.t, t[r] += this.m.am(0, s, t, n, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
      }
      t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }, e.prototype.mulTo = function(t, n, r) {
      t.multiplyTo(n, r), this.reduce(r)
    }, e.prototype.sqrTo = function(t, n) {
      t.squareTo(n), this.reduce(n)
    }, e
  }(),
  Ph = function() {
    function e(t) {
      this.m = t, this.r2 = te(), this.q3 = te(), ee.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t)
    }
    return e.prototype.convert = function(t) {
      if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
      if (t.compareTo(this.m) < 0) return t;
      var n = te();
      return t.copyTo(n), this.reduce(n), n
    }, e.prototype.revert = function(t) {
      return t
    }, e.prototype.reduce = function(t) {
      for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
      for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
    }, e.prototype.mulTo = function(t, n, r) {
      t.multiplyTo(n, r), this.reduce(r)
    }, e.prototype.sqrTo = function(t, n) {
      t.squareTo(n), this.reduce(n)
    }, e
  }();

function te() {
  return new ee(null)
}

function be(e, t) {
  return new ee(e, t)
}
var Ro = typeof navigator < "u";
Ro && So && navigator.appName == "Microsoft Internet Explorer" ? (ee.prototype.am = function(t, n, r, s, i, o) {
  for (var l = n & 32767, a = n >> 15; --o >= 0;) {
    var u = this[t] & 32767,
      c = this[t++] >> 15,
      f = a * u + c * l;
    u = l * u + ((f & 32767) << 15) + r[s] + (i & 1073741823), i = (u >>> 30) + (f >>> 15) + a * c + (i >>> 30), r[s++] = u & 1073741823
  }
  return i
}, Pt = 30) : Ro && So && navigator.appName != "Netscape" ? (ee.prototype.am = function(t, n, r, s, i, o) {
  for (; --o >= 0;) {
    var l = n * this[t++] + r[s] + i;
    i = Math.floor(l / 67108864), r[s++] = l & 67108863
  }
  return i
}, Pt = 26) : (ee.prototype.am = function(t, n, r, s, i, o) {
  for (var l = n & 16383, a = n >> 14; --o >= 0;) {
    var u = this[t] & 16383,
      c = this[t++] >> 14,
      f = a * u + c * l;
    u = l * u + ((f & 16383) << 14) + r[s] + i, i = (u >> 28) + (f >> 14) + a * c, r[s++] = u & 268435455
  }
  return i
}, Pt = 28);
ee.prototype.DB = Pt;
ee.prototype.DM = (1 << Pt) - 1;
ee.prototype.DV = 1 << Pt;
var ai = 52;
ee.prototype.FV = Math.pow(2, ai);
ee.prototype.F1 = ai - Pt;
ee.prototype.F2 = 2 * Pt - ai;
var $r = [],
  vn, ze;
vn = 48;
for (ze = 0; ze <= 9; ++ze) $r[vn++] = ze;
vn = 97;
for (ze = 10; ze < 36; ++ze) $r[vn++] = ze;
vn = 65;
for (ze = 10; ze < 36; ++ze) $r[vn++] = ze;

function Oo(e, t) {
  var n = $r[e.charCodeAt(t)];
  return n == null ? -1 : n
}

function St(e) {
  var t = te();
  return t.fromInt(e), t
}

function Gn(e) {
  var t = 1,
    n;
  return (n = e >>> 16) != 0 && (e = n, t += 16), (n = e >> 8) != 0 && (e = n, t += 8), (n = e >> 4) != 0 && (e = n, t += 4), (n = e >> 2) != 0 && (e = n, t += 2), (n = e >> 1) != 0 && (e = n, t += 1), t
}
ee.ZERO = St(0);
ee.ONE = St(1);
var Dh = function() {
  function e() {
    this.i = 0, this.j = 0, this.S = []
  }
  return e.prototype.init = function(t) {
    var n, r, s;
    for (n = 0; n < 256; ++n) this.S[n] = n;
    for (r = 0, n = 0; n < 256; ++n) r = r + this.S[n] + t[n % t.length] & 255, s = this.S[n], this.S[n] = this.S[r], this.S[r] = s;
    this.i = 0, this.j = 0
  }, e.prototype.next = function() {
    var t;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
  }, e
}();

function Bh() {
  return new Dh
}
var va = 256,
  Zn, Ct = null,
  Je;
if (Ct == null) {
  Ct = [], Je = 0;
  var Jn = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var ns = new Uint32Array(256);
    for (window.crypto.getRandomValues(ns), Jn = 0; Jn < ns.length; ++Jn) Ct[Je++] = ns[Jn] & 255
  }
  var Qn = 0,
    Xn = function(e) {
      if (Qn = Qn || 0, Qn >= 256 || Je >= va) {
        window.removeEventListener ? window.removeEventListener("mousemove", Xn, !1) : window.detachEvent && window.detachEvent("onmousemove", Xn);
        return
      }
      try {
        var t = e.x + e.y;
        Ct[Je++] = t & 255, Qn += 1
      } catch (n) {}
    };
  typeof window < "u" && (window.addEventListener ? window.addEventListener("mousemove", Xn, !1) : window.attachEvent && window.attachEvent("onmousemove", Xn))
}

function Ih() {
  if (Zn == null) {
    for (Zn = Bh(); Je < va;) {
      var e = Math.floor(65536 * Math.random());
      Ct[Je++] = e & 255
    }
    for (Zn.init(Ct), Je = 0; Je < Ct.length; ++Je) Ct[Je] = 0;
    Je = 0
  }
  return Zn.next()
}
var Rs = function() {
  function e() {}
  return e.prototype.nextBytes = function(t) {
    for (var n = 0; n < t.length; ++n) t[n] = Ih()
  }, e
}();

function Mh(e, t) {
  if (t < e.length + 22) return console.error("Message too long for RSA"), null;
  for (var n = t - e.length - 6, r = "", s = 0; s < n; s += 2) r += "ff";
  var i = "0001" + r + "00" + e;
  return be(i, 16)
}

function Nh(e, t) {
  if (t < e.length + 11) return console.error("Message too long for RSA"), null;
  for (var n = [], r = e.length - 1; r >= 0 && t > 0;) {
    var s = e.charCodeAt(r--);
    s < 128 ? n[--t] = s : s > 127 && s < 2048 ? (n[--t] = s & 63 | 128, n[--t] = s >> 6 | 192) : (n[--t] = s & 63 | 128, n[--t] = s >> 6 & 63 | 128, n[--t] = s >> 12 | 224)
  }
  n[--t] = 0;
  for (var i = new Rs, o = []; t > 2;) {
    for (o[0] = 0; o[0] == 0;) i.nextBytes(o);
    n[--t] = o[0]
  }
  return n[--t] = 2, n[--t] = 0, new ee(n)
}
var $h = function() {
  function e() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
  }
  return e.prototype.doPublic = function(t) {
    return t.modPowInt(this.e, this.n)
  }, e.prototype.doPrivate = function(t) {
    if (this.p == null || this.q == null) return t.modPow(this.d, this.n);
    for (var n = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); n.compareTo(r) < 0;) n = n.add(this.p);
    return n.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
  }, e.prototype.setPublic = function(t, n) {
    t != null && n != null && t.length > 0 && n.length > 0 ? (this.n = be(t, 16), this.e = parseInt(n, 16)) : console.error("Invalid RSA public key")
  }, e.prototype.encrypt = function(t) {
    var n = this.n.bitLength() + 7 >> 3,
      r = Nh(t, n);
    if (r == null) return null;
    var s = this.doPublic(r);
    if (s == null) return null;
    for (var i = s.toString(16), o = i.length, l = 0; l < n * 2 - o; l++) i = "0" + i;
    return i
  }, e.prototype.setPrivate = function(t, n, r) {
    t != null && n != null && t.length > 0 && n.length > 0 ? (this.n = be(t, 16), this.e = parseInt(n, 16), this.d = be(r, 16)) : console.error("Invalid RSA private key")
  }, e.prototype.setPrivateEx = function(t, n, r, s, i, o, l, a) {
    t != null && n != null && t.length > 0 && n.length > 0 ? (this.n = be(t, 16), this.e = parseInt(n, 16), this.d = be(r, 16), this.p = be(s, 16), this.q = be(i, 16), this.dmp1 = be(o, 16), this.dmq1 = be(l, 16), this.coeff = be(a, 16)) : console.error("Invalid RSA private key")
  }, e.prototype.generate = function(t, n) {
    var r = new Rs,
      s = t >> 1;
    this.e = parseInt(n, 16);
    for (var i = new ee(n, 16);;) {
      for (; this.p = new ee(t - s, 1, r), !(this.p.subtract(ee.ONE).gcd(i).compareTo(ee.ONE) == 0 && this.p.isProbablePrime(10)););
      for (; this.q = new ee(s, 1, r), !(this.q.subtract(ee.ONE).gcd(i).compareTo(ee.ONE) == 0 && this.q.isProbablePrime(10)););
      if (this.p.compareTo(this.q) <= 0) {
        var o = this.p;
        this.p = this.q, this.q = o
      }
      var l = this.p.subtract(ee.ONE),
        a = this.q.subtract(ee.ONE),
        u = l.multiply(a);
      if (u.gcd(i).compareTo(ee.ONE) == 0) {
        this.n = this.p.multiply(this.q), this.d = i.modInverse(u), this.dmp1 = this.d.mod(l), this.dmq1 = this.d.mod(a), this.coeff = this.q.modInverse(this.p);
        break
      }
    }
  }, e.prototype.decrypt = function(t) {
    var n = be(t, 16),
      r = this.doPrivate(n);
    return r == null ? null : Vh(r, this.n.bitLength() + 7 >> 3)
  }, e.prototype.generateAsync = function(t, n, r) {
    var s = new Rs,
      i = t >> 1;
    this.e = parseInt(n, 16);
    var o = new ee(n, 16),
      l = this,
      a = function() {
        var u = function() {
            if (l.p.compareTo(l.q) <= 0) {
              var h = l.p;
              l.p = l.q, l.q = h
            }
            var g = l.p.subtract(ee.ONE),
              m = l.q.subtract(ee.ONE),
              y = g.multiply(m);
            y.gcd(o).compareTo(ee.ONE) == 0 ? (l.n = l.p.multiply(l.q), l.d = o.modInverse(y), l.dmp1 = l.d.mod(g), l.dmq1 = l.d.mod(m), l.coeff = l.q.modInverse(l.p), setTimeout(function() {
              r()
            }, 0)) : setTimeout(a, 0)
          },
          c = function() {
            l.q = te(), l.q.fromNumberAsync(i, 1, s, function() {
              l.q.subtract(ee.ONE).gcda(o, function(h) {
                h.compareTo(ee.ONE) == 0 && l.q.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(c, 0)
              })
            })
          },
          f = function() {
            l.p = te(), l.p.fromNumberAsync(t - i, 1, s, function() {
              l.p.subtract(ee.ONE).gcda(o, function(h) {
                h.compareTo(ee.ONE) == 0 && l.p.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(f, 0)
              })
            })
          };
        setTimeout(f, 0)
      };
    setTimeout(a, 0)
  }, e.prototype.sign = function(t, n, r) {
    var s = Fh(r),
      i = s + n(t).toString(),
      o = Mh(i, this.n.bitLength() / 4);
    if (o == null) return null;
    var l = this.doPrivate(o);
    if (l == null) return null;
    var a = l.toString(16);
    return a.length & 1 ? "0" + a : a
  }, e.prototype.verify = function(t, n, r) {
    var s = be(n, 16),
      i = this.doPublic(s);
    if (i == null) return null;
    var o = i.toString(16).replace(/^1f+00/, ""),
      l = jh(o);
    return l == r(t).toString()
  }, e
}();

function Vh(e, t) {
  for (var n = e.toByteArray(), r = 0; r < n.length && n[r] == 0;) ++r;
  if (n.length - r != t - 1 || n[r] != 2) return null;
  for (++r; n[r] != 0;)
    if (++r >= n.length) return null;
  for (var s = ""; ++r < n.length;) {
    var i = n[r] & 255;
    i < 128 ? s += String.fromCharCode(i) : i > 191 && i < 224 ? (s += String.fromCharCode((i & 31) << 6 | n[r + 1] & 63), ++r) : (s += String.fromCharCode((i & 15) << 12 | (n[r + 1] & 63) << 6 | n[r + 2] & 63), r += 2)
  }
  return s
}
var or = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};

function Fh(e) {
  return or[e] || ""
}

function jh(e) {
  for (var t in or)
    if (or.hasOwnProperty(t)) {
      var n = or[t],
        r = n.length;
      if (e.substr(0, r) == n) return e.substr(r)
    } return e
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var we = {};
we.lang = {
  extend: function(e, t, n) {
    if (!t || !e) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var r = function() {};
    if (r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e, e.superclass = t.prototype, t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t), n) {
      var s;
      for (s in n) e.prototype[s] = n[s];
      var i = function() {},
        o = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (i = function(l, a) {
          for (s = 0; s < o.length; s = s + 1) {
            var u = o[s],
              c = a[u];
            typeof c == "function" && c != Object.prototype[u] && (l[u] = c)
          }
        })
      } catch (l) {}
      i(e.prototype, n)
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var S = {};
(typeof S.asn1 > "u" || !S.asn1) && (S.asn1 = {});
S.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(e) {
    var t = e.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), t
  }, this.bigIntToMinTwosComplementsHex = function(e) {
    var t = e.toString(16);
    if (t.substr(0, 1) != "-") t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
    else {
      var n = t.substr(1),
        r = n.length;
      r % 2 == 1 ? r += 1 : t.match(/^[0-7]/) || (r += 2);
      for (var s = "", i = 0; i < r; i++) s += "f";
      var o = new ee(s, 16),
        l = o.xor(e).add(ee.ONE);
      t = l.toString(16).replace(/^-/, "")
    }
    return t
  }, this.getPEMStringFromHex = function(e, t) {
    return hextopem(e, t)
  }, this.newObject = function(e) {
    var t = S,
      n = t.asn1,
      r = n.DERBoolean,
      s = n.DERInteger,
      i = n.DERBitString,
      o = n.DEROctetString,
      l = n.DERNull,
      a = n.DERObjectIdentifier,
      u = n.DEREnumerated,
      c = n.DERUTF8String,
      f = n.DERNumericString,
      h = n.DERPrintableString,
      g = n.DERTeletexString,
      m = n.DERIA5String,
      y = n.DERUTCTime,
      R = n.DERGeneralizedTime,
      T = n.DERSequence,
      B = n.DERSet,
      j = n.DERTaggedObject,
      Z = n.ASN1Util.newObject,
      H = Object.keys(e);
    if (H.length != 1) throw "key of param shall be only one.";
    var E = H[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + E + ":") == -1) throw "undefined key: " + E;
    if (E == "bool") return new r(e[E]);
    if (E == "int") return new s(e[E]);
    if (E == "bitstr") return new i(e[E]);
    if (E == "octstr") return new o(e[E]);
    if (E == "null") return new l(e[E]);
    if (E == "oid") return new a(e[E]);
    if (E == "enum") return new u(e[E]);
    if (E == "utf8str") return new c(e[E]);
    if (E == "numstr") return new f(e[E]);
    if (E == "prnstr") return new h(e[E]);
    if (E == "telstr") return new g(e[E]);
    if (E == "ia5str") return new m(e[E]);
    if (E == "utctime") return new y(e[E]);
    if (E == "gentime") return new R(e[E]);
    if (E == "seq") {
      for (var Q = e[E], ye = [], xe = 0; xe < Q.length; xe++) {
        var de = Z(Q[xe]);
        ye.push(de)
      }
      return new T({
        array: ye
      })
    }
    if (E == "set") {
      for (var Q = e[E], ye = [], xe = 0; xe < Q.length; xe++) {
        var de = Z(Q[xe]);
        ye.push(de)
      }
      return new B({
        array: ye
      })
    }
    if (E == "tag") {
      var he = e[E];
      if (Object.prototype.toString.call(he) === "[object Array]" && he.length == 3) {
        var Ge = Z(he[2]);
        return new j({
          tag: he[0],
          explicit: he[1],
          obj: Ge
        })
      } else {
        var Ce = {};
        if (he.explicit !== void 0 && (Ce.explicit = he.explicit), he.tag !== void 0 && (Ce.tag = he.tag), he.obj === void 0) throw "obj shall be specified for 'tag'.";
        return Ce.obj = Z(he.obj), new j(Ce)
      }
    }
  }, this.jsonToASN1HEX = function(e) {
    var t = this.newObject(e);
    return t.getEncodedHex()
  }
};
S.asn1.ASN1Util.oidHexToInt = function(e) {
  for (var s = "", t = parseInt(e.substr(0, 2), 16), n = Math.floor(t / 40), r = t % 40, s = n + "." + r, i = "", o = 2; o < e.length; o += 2) {
    var l = parseInt(e.substr(o, 2), 16),
      a = ("00000000" + l.toString(2)).slice(-8);
    if (i = i + a.substr(1, 7), a.substr(0, 1) == "0") {
      var u = new ee(i, 2);
      s = s + "." + u.toString(10), i = ""
    }
  }
  return s
};
S.asn1.ASN1Util.oidIntToHex = function(e) {
  var t = function(l) {
      var a = l.toString(16);
      return a.length == 1 && (a = "0" + a), a
    },
    n = function(l) {
      var a = "",
        u = new ee(l, 10),
        c = u.toString(2),
        f = 7 - c.length % 7;
      f == 7 && (f = 0);
      for (var h = "", g = 0; g < f; g++) h += "0";
      c = h + c;
      for (var g = 0; g < c.length - 1; g += 7) {
        var m = c.substr(g, 7);
        g != c.length - 7 && (m = "1" + m), a += t(parseInt(m, 2))
      }
      return a
    };
  if (!e.match(/^[0-9.]+$/)) throw "malformed oid string: " + e;
  var r = "",
    s = e.split("."),
    i = parseInt(s[0]) * 40 + parseInt(s[1]);
  r += t(i), s.splice(0, 2);
  for (var o = 0; o < s.length; o++) r += n(s[o]);
  return r
};
S.asn1.ASN1Object = function() {
  var e = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV > "u" || this.hV == null) throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + e.length + ",v=" + this.hV;
    var t = this.hV.length / 2,
      n = t.toString(16);
    if (n.length % 2 == 1 && (n = "0" + n), t < 128) return n;
    var r = n.length / 2;
    if (r > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
    var s = 128 + r;
    return s.toString(16) + n
  }, this.getEncodedHex = function() {
    return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV
  }, this.getFreshValueHex = function() {
    return ""
  }
};
S.asn1.DERAbstractString = function(e) {
  S.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s
  }, this.setString = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
  }, this.setStringHex = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof e < "u" && (typeof e == "string" ? this.setString(e) : typeof e.str < "u" ? this.setString(e.str) : typeof e.hex < "u" && this.setStringHex(e.hex))
};
we.lang.extend(S.asn1.DERAbstractString, S.asn1.ASN1Object);
S.asn1.DERAbstractTime = function(e) {
  S.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
    utc = t.getTime() + t.getTimezoneOffset() * 6e4;
    var n = new Date(utc);
    return n
  }, this.formatDate = function(t, n, r) {
    var s = this.zeroPadding,
      i = this.localDateToUTC(t),
      o = String(i.getFullYear());
    n == "utc" && (o = o.substr(2, 2));
    var l = s(String(i.getMonth() + 1), 2),
      a = s(String(i.getDate()), 2),
      u = s(String(i.getHours()), 2),
      c = s(String(i.getMinutes()), 2),
      f = s(String(i.getSeconds()), 2),
      h = o + l + a + u + c + f;
    if (r === !0) {
      var g = i.getMilliseconds();
      if (g != 0) {
        var m = s(String(g), 3);
        m = m.replace(/[0]+$/, ""), h = h + "." + m
      }
    }
    return h + "Z"
  }, this.zeroPadding = function(t, n) {
    return t.length >= n ? t : new Array(n - t.length + 1).join("0") + t
  }, this.getString = function() {
    return this.s
  }, this.setString = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t)
  }, this.setByDateValue = function(t, n, r, s, i, o) {
    var l = new Date(Date.UTC(t, n - 1, r, s, i, o, 0));
    this.setByDate(l)
  }, this.getFreshValueHex = function() {
    return this.hV
  }
};
we.lang.extend(S.asn1.DERAbstractTime, S.asn1.ASN1Object);
S.asn1.DERAbstractStructured = function(e) {
  S.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = t
  }, this.appendASN1Object = function(t) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
  }, this.asn1Array = new Array, typeof e < "u" && typeof e.array < "u" && (this.asn1Array = e.array)
};
we.lang.extend(S.asn1.DERAbstractStructured, S.asn1.ASN1Object);
S.asn1.DERBoolean = function() {
  S.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
};
we.lang.extend(S.asn1.DERBoolean, S.asn1.ASN1Object);
S.asn1.DERInteger = function(e) {
  S.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = S.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
  }, this.setByInteger = function(t) {
    var n = new ee(String(t), 10);
    this.setByBigInteger(n)
  }, this.setValueHex = function(t) {
    this.hV = t
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof e < "u" && (typeof e.bigint < "u" ? this.setByBigInteger(e.bigint) : typeof e.int < "u" ? this.setByInteger(e.int) : typeof e == "number" ? this.setByInteger(e) : typeof e.hex < "u" && this.setValueHex(e.hex))
};
we.lang.extend(S.asn1.DERInteger, S.asn1.ASN1Object);
S.asn1.DERBitString = function(e) {
  if (e !== void 0 && typeof e.obj < "u") {
    var t = S.asn1.ASN1Util.newObject(e.obj);
    e.hex = "00" + t.getEncodedHex()
  }
  S.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(n) {
    this.hTLV = null, this.isModified = !0, this.hV = n
  }, this.setUnusedBitsAndHexValue = function(n, r) {
    if (n < 0 || 7 < n) throw "unused bits shall be from 0 to 7: u = " + n;
    var s = "0" + n;
    this.hTLV = null, this.isModified = !0, this.hV = s + r
  }, this.setByBinaryString = function(n) {
    n = n.replace(/0+$/, "");
    var r = 8 - n.length % 8;
    r == 8 && (r = 0);
    for (var s = 0; s <= r; s++) n += "0";
    for (var i = "", s = 0; s < n.length - 1; s += 8) {
      var o = n.substr(s, 8),
        l = parseInt(o, 2).toString(16);
      l.length == 1 && (l = "0" + l), i += l
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + r + i
  }, this.setByBooleanArray = function(n) {
    for (var r = "", s = 0; s < n.length; s++) n[s] == !0 ? r += "1" : r += "0";
    this.setByBinaryString(r)
  }, this.newFalseArray = function(n) {
    for (var r = new Array(n), s = 0; s < n; s++) r[s] = !1;
    return r
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof e < "u" && (typeof e == "string" && e.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(e) : typeof e.hex < "u" ? this.setHexValueIncludingUnusedBits(e.hex) : typeof e.bin < "u" ? this.setByBinaryString(e.bin) : typeof e.array < "u" && this.setByBooleanArray(e.array))
};
we.lang.extend(S.asn1.DERBitString, S.asn1.ASN1Object);
S.asn1.DEROctetString = function(e) {
  if (e !== void 0 && typeof e.obj < "u") {
    var t = S.asn1.ASN1Util.newObject(e.obj);
    e.hex = t.getEncodedHex()
  }
  S.asn1.DEROctetString.superclass.constructor.call(this, e), this.hT = "04"
};
we.lang.extend(S.asn1.DEROctetString, S.asn1.DERAbstractString);
S.asn1.DERNull = function() {
  S.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
};
we.lang.extend(S.asn1.DERNull, S.asn1.ASN1Object);
S.asn1.DERObjectIdentifier = function(e) {
  var t = function(r) {
      var s = r.toString(16);
      return s.length == 1 && (s = "0" + s), s
    },
    n = function(r) {
      var s = "",
        i = new ee(r, 10),
        o = i.toString(2),
        l = 7 - o.length % 7;
      l == 7 && (l = 0);
      for (var a = "", u = 0; u < l; u++) a += "0";
      o = a + o;
      for (var u = 0; u < o.length - 1; u += 7) {
        var c = o.substr(u, 7);
        u != o.length - 7 && (c = "1" + c), s += t(parseInt(c, 2))
      }
      return s
    };
  S.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(r) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r
  }, this.setValueOidString = function(r) {
    if (!r.match(/^[0-9.]+$/)) throw "malformed oid string: " + r;
    var s = "",
      i = r.split("."),
      o = parseInt(i[0]) * 40 + parseInt(i[1]);
    s += t(o), i.splice(0, 2);
    for (var l = 0; l < i.length; l++) s += n(i[l]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = s
  }, this.setValueName = function(r) {
    var s = S.asn1.x509.OID.name2oid(r);
    if (s !== "") this.setValueOidString(s);
    else throw "DERObjectIdentifier oidName undefined: " + r
  }, this.getFreshValueHex = function() {
    return this.hV
  }, e !== void 0 && (typeof e == "string" ? e.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(e) : this.setValueName(e) : e.oid !== void 0 ? this.setValueOidString(e.oid) : e.hex !== void 0 ? this.setValueHex(e.hex) : e.name !== void 0 && this.setValueName(e.name))
};
we.lang.extend(S.asn1.DERObjectIdentifier, S.asn1.ASN1Object);
S.asn1.DEREnumerated = function(e) {
  S.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = S.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
  }, this.setByInteger = function(t) {
    var n = new ee(String(t), 10);
    this.setByBigInteger(n)
  }, this.setValueHex = function(t) {
    this.hV = t
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof e < "u" && (typeof e.int < "u" ? this.setByInteger(e.int) : typeof e == "number" ? this.setByInteger(e) : typeof e.hex < "u" && this.setValueHex(e.hex))
};
we.lang.extend(S.asn1.DEREnumerated, S.asn1.ASN1Object);
S.asn1.DERUTF8String = function(e) {
  S.asn1.DERUTF8String.superclass.constructor.call(this, e), this.hT = "0c"
};
we.lang.extend(S.asn1.DERUTF8String, S.asn1.DERAbstractString);
S.asn1.DERNumericString = function(e) {
  S.asn1.DERNumericString.superclass.constructor.call(this, e), this.hT = "12"
};
we.lang.extend(S.asn1.DERNumericString, S.asn1.DERAbstractString);
S.asn1.DERPrintableString = function(e) {
  S.asn1.DERPrintableString.superclass.constructor.call(this, e), this.hT = "13"
};
we.lang.extend(S.asn1.DERPrintableString, S.asn1.DERAbstractString);
S.asn1.DERTeletexString = function(e) {
  S.asn1.DERTeletexString.superclass.constructor.call(this, e), this.hT = "14"
};
we.lang.extend(S.asn1.DERTeletexString, S.asn1.DERAbstractString);
S.asn1.DERIA5String = function(e) {
  S.asn1.DERIA5String.superclass.constructor.call(this, e), this.hT = "16"
};
we.lang.extend(S.asn1.DERIA5String, S.asn1.DERAbstractString);
S.asn1.DERUTCTime = function(e) {
  S.asn1.DERUTCTime.superclass.constructor.call(this, e), this.hT = "17", this.setByDate = function(t) {
    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
  }, e !== void 0 && (e.str !== void 0 ? this.setString(e.str) : typeof e == "string" && e.match(/^[0-9]{12}Z$/) ? this.setString(e) : e.hex !== void 0 ? this.setStringHex(e.hex) : e.date !== void 0 && this.setByDate(e.date))
};
we.lang.extend(S.asn1.DERUTCTime, S.asn1.DERAbstractTime);
S.asn1.DERGeneralizedTime = function(e) {
  S.asn1.DERGeneralizedTime.superclass.constructor.call(this, e), this.hT = "18", this.withMillis = !1, this.setByDate = function(t) {
    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
  }, e !== void 0 && (e.str !== void 0 ? this.setString(e.str) : typeof e == "string" && e.match(/^[0-9]{14}Z$/) ? this.setString(e) : e.hex !== void 0 ? this.setStringHex(e.hex) : e.date !== void 0 && this.setByDate(e.date), e.millis === !0 && (this.withMillis = !0))
};
we.lang.extend(S.asn1.DERGeneralizedTime, S.asn1.DERAbstractTime);
S.asn1.DERSequence = function(e) {
  S.asn1.DERSequence.superclass.constructor.call(this, e), this.hT = "30", this.getFreshValueHex = function() {
    for (var t = "", n = 0; n < this.asn1Array.length; n++) {
      var r = this.asn1Array[n];
      t += r.getEncodedHex()
    }
    return this.hV = t, this.hV
  }
};
we.lang.extend(S.asn1.DERSequence, S.asn1.DERAbstractStructured);
S.asn1.DERSet = function(e) {
  S.asn1.DERSet.superclass.constructor.call(this, e), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var t = new Array, n = 0; n < this.asn1Array.length; n++) {
      var r = this.asn1Array[n];
      t.push(r.getEncodedHex())
    }
    return this.sortFlag == !0 && t.sort(), this.hV = t.join(""), this.hV
  }, typeof e < "u" && typeof e.sortflag < "u" && e.sortflag == !1 && (this.sortFlag = !1)
};
we.lang.extend(S.asn1.DERSet, S.asn1.DERAbstractStructured);
S.asn1.DERTaggedObject = function(e) {
  S.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(t, n, r) {
    this.hT = n, this.isExplicit = t, this.asn1Object = r, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = r.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, n), this.isModified = !1)
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof e < "u" && (typeof e.tag < "u" && (this.hT = e.tag), typeof e.explicit < "u" && (this.isExplicit = e.explicit), typeof e.obj < "u" && (this.asn1Object = e.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
};
we.lang.extend(S.asn1.DERTaggedObject, S.asn1.ASN1Object);
var Uh = function() {
    var e = function(t, n) {
      return e = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(r, s) {
        r.__proto__ = s
      } || function(r, s) {
        for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i])
      }, e(t, n)
    };
    return function(t, n) {
      if (typeof n != "function" && n !== null) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
      e(t, n);

      function r() {
        this.constructor = t
      }
      t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r)
    }
  }(),
  Ao = function(e) {
    Uh(t, e);

    function t(n) {
      var r = e.call(this) || this;
      return n && (typeof n == "string" ? r.parseKey(n) : (t.hasPrivateKeyProperty(n) || t.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)), r
    }
    return t.prototype.parseKey = function(n) {
      try {
        var r = 0,
          s = 0,
          i = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
          o = i.test(n) ? Sh.decode(n) : Ts.unarmor(n),
          l = Rh.decode(o);
        if (l.sub.length === 3 && (l = l.sub[2].sub[0]), l.sub.length === 9) {
          r = l.sub[1].getHexStringValue(), this.n = be(r, 16), s = l.sub[2].getHexStringValue(), this.e = parseInt(s, 16);
          var a = l.sub[3].getHexStringValue();
          this.d = be(a, 16);
          var u = l.sub[4].getHexStringValue();
          this.p = be(u, 16);
          var c = l.sub[5].getHexStringValue();
          this.q = be(c, 16);
          var f = l.sub[6].getHexStringValue();
          this.dmp1 = be(f, 16);
          var h = l.sub[7].getHexStringValue();
          this.dmq1 = be(h, 16);
          var g = l.sub[8].getHexStringValue();
          this.coeff = be(g, 16)
        } else if (l.sub.length === 2)
          if (l.sub[0].sub) {
            var m = l.sub[1],
              y = m.sub[0];
            r = y.sub[0].getHexStringValue(), this.n = be(r, 16), s = y.sub[1].getHexStringValue(), this.e = parseInt(s, 16)
          } else r = l.sub[0].getHexStringValue(), this.n = be(r, 16), s = l.sub[1].getHexStringValue(), this.e = parseInt(s, 16);
        else return !1;
        return !0
      } catch (R) {
        return !1
      }
    }, t.prototype.getPrivateBaseKey = function() {
      var n = {
          array: [new S.asn1.DERInteger({
            int: 0
          }), new S.asn1.DERInteger({
            bigint: this.n
          }), new S.asn1.DERInteger({
            int: this.e
          }), new S.asn1.DERInteger({
            bigint: this.d
          }), new S.asn1.DERInteger({
            bigint: this.p
          }), new S.asn1.DERInteger({
            bigint: this.q
          }), new S.asn1.DERInteger({
            bigint: this.dmp1
          }), new S.asn1.DERInteger({
            bigint: this.dmq1
          }), new S.asn1.DERInteger({
            bigint: this.coeff
          })]
        },
        r = new S.asn1.DERSequence(n);
      return r.getEncodedHex()
    }, t.prototype.getPrivateBaseKeyB64 = function() {
      return vr(this.getPrivateBaseKey())
    }, t.prototype.getPublicBaseKey = function() {
      var n = new S.asn1.DERSequence({
          array: [new S.asn1.DERObjectIdentifier({
            oid: "1.2.840.113549.1.1.1"
          }), new S.asn1.DERNull]
        }),
        r = new S.asn1.DERSequence({
          array: [new S.asn1.DERInteger({
            bigint: this.n
          }), new S.asn1.DERInteger({
            int: this.e
          })]
        }),
        s = new S.asn1.DERBitString({
          hex: "00" + r.getEncodedHex()
        }),
        i = new S.asn1.DERSequence({
          array: [n, s]
        });
      return i.getEncodedHex()
    }, t.prototype.getPublicBaseKeyB64 = function() {
      return vr(this.getPublicBaseKey())
    }, t.wordwrap = function(n, r) {
      if (r = r || 64, !n) return n;
      var s = "(.{1," + r + "})( +|$\n?)|(.{1," + r + "})";
      return n.match(RegExp(s, "g")).join("\n")
    }, t.prototype.getPrivateKey = function() {
      var n = "-----BEGIN RSA PRIVATE KEY-----\n";
      return n += t.wordwrap(this.getPrivateBaseKeyB64()) + "\n", n += "-----END RSA PRIVATE KEY-----", n
    }, t.prototype.getPublicKey = function() {
      var n = "-----BEGIN PUBLIC KEY-----\n";
      return n += t.wordwrap(this.getPublicBaseKeyB64()) + "\n", n += "-----END PUBLIC KEY-----", n
    }, t.hasPublicKeyProperty = function(n) {
      return n = n || {}, n.hasOwnProperty("n") && n.hasOwnProperty("e")
    }, t.hasPrivateKeyProperty = function(n) {
      return n = n || {}, n.hasOwnProperty("n") && n.hasOwnProperty("e") && n.hasOwnProperty("d") && n.hasOwnProperty("p") && n.hasOwnProperty("q") && n.hasOwnProperty("dmp1") && n.hasOwnProperty("dmq1") && n.hasOwnProperty("coeff")
    }, t.prototype.parsePropertiesFrom = function(n) {
      this.n = n.n, this.e = n.e, n.hasOwnProperty("d") && (this.d = n.d, this.p = n.p, this.q = n.q, this.dmp1 = n.dmp1, this.dmq1 = n.dmq1, this.coeff = n.coeff)
    }, t
  }($h),
  Hh = {},
  rs, qh = typeof process < "u" ? (rs = Hh) === null || rs === void 0 ? void 0 : rs.npm_package_version : void 0,
  Kh = function() {
    function e(t) {
      t === void 0 && (t = {}), t = t || {}, this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null
    }
    return e.prototype.setKey = function(t) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new Ao(t)
    }, e.prototype.setPrivateKey = function(t) {
      this.setKey(t)
    }, e.prototype.setPublicKey = function(t) {
      this.setKey(t)
    }, e.prototype.decrypt = function(t) {
      try {
        return this.getKey().decrypt(ko(t))
      } catch (n) {
        return !1
      }
    }, e.prototype.encrypt = function(t) {
      try {
        return vr(this.getKey().encrypt(t))
      } catch (n) {
        return !1
      }
    }, e.prototype.sign = function(t, n, r) {
      try {
        return vr(this.getKey().sign(t, n, r))
      } catch (s) {
        return !1
      }
    }, e.prototype.verify = function(t, n, r) {
      try {
        return this.getKey().verify(t, ko(n), r)
      } catch (s) {
        return !1
      }
    }, e.prototype.getKey = function(t) {
      if (!this.key) {
        if (this.key = new Ao, t && {}.toString.call(t) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
          return
        }
        this.key.generate(this.default_key_size, this.default_public_exponent)
      }
      return this.key
    }, e.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey()
    }, e.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64()
    }, e.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey()
    }, e.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64()
    }, e.version = qh, e
  }();
const zh = "weibo",
  Wh = 4e3,
  Gh = "8b4a2bef633eb0264367b3ba9fa1dd3d",
  Zh = "https://security.weibo.com/iforgot/loginname?entry=".concat(zh, "&loginname="),
  Jh = "https://weibo.com/signup/signup.php",
  Qh = "https://h5.sinaimg.cn/upload/1005/891/2024/01/04/weibologo.png",
  ba = "20250520",
  Os = async e => e.then(t => [null, t]).catch(t => [t, null]), pn = (e, t = {}) => {
    if (t.method === "POST") {
      const n = Object.assign({}, t);
      return delete n.method, Os(fe.post(e, n))
    } else {
      const n = Object.assign({}, t);
      return delete n.method, Os(fe.get(e, {
        params: n
      }))
    }
  }, ya = e => Os(new Promise((t, n) => {
    if (!window.gtInit) {
      n({
        params: {},
        msg: "极验未初始化"
      });
      return
    }
    window.gtInit({
      geetestKey: e,
      captchaId: Gh,
      product: "bind"
    }, (r, s, i) => {
      i ? t({
        params: r,
        msg: s
      }) : n({
        params: r,
        msg: s
      })
    })
  })), Xh = e => {
    const t = atob(e),
      n = new Uint8Array(t.length);
    for (let s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
    return Array.from(n).map(s => s.toString(16).padStart(2, "0")).join("")
  }, Yh = (e, t) => {
    if (!t || !e) return;
    const n = new Kh({
      default_public_exponent: "10001"
    });
    return n.setPublicKey(t), Xh(n.encrypt(e))
  };

function e1() {
  const e = navigator.userAgent.toLowerCase(),
    t = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(e),
    n = /ipad|tablet|playbook|silk/i.test(e);
  return t && !n
}

function t1() {
  return window.innerWidth > window.innerHeight
}

function n1() {
  return window.innerHeight > window.innerWidth
}

function Lo() {
  return e1() ? !!(t1() || n1()) : !1
}
const r1 = w("img", {
    class: "h-full",
    src: "https://d.sinaimg.cn/prd/1005/891/2024/12/31/h5_fanhui.png"
  }, null, -1),
  s1 = {
    key: 1,
    class: "text-sm text-center mt-5 text-sub"
  },
  i1 = {
    key: 0,
    class: "w-full h-full absolute bg-white95"
  },
  o1 = {
    class: "absolute top-12 left-0 right-0 text-center"
  },
  l1 = {
    key: 0,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 37 40"
  },
  a1 = w("path", {
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
    fill: "#8CD232"
  }, null, -1),
  c1 = w("path", {
    d: "M15.7781746,21.4319805 L26.3847763,10.8253788 C27.1658249,10.0443302 28.4321549,10.0443302 29.2132034,10.8253788 C29.994252,11.6064274 29.994252,12.8727573 29.2132034,13.6538059 L17.1923882,25.6746212 C16.4113396,26.4556698 15.1450096,26.4556698 14.363961,25.6746212 L9.41421356,20.7248737 C8.63316498,19.9438252 8.63316498,18.6774952 9.41421356,17.8964466 C10.1952621,17.115398 11.4615921,17.115398 12.2426407,17.8964466 L15.7781746,21.4319805 L15.7781746,21.4319805 Z",
    fill: "#FFFFFF"
  }, null, -1),
  u1 = [a1, c1],
  f1 = {
    key: 1,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 38 40"
  },
  d1 = w("path", {
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
    fill: "#FF8200"
  }, null, -1),
  h1 = w("path", {
    d: "M18.5,8 L18.6502192,8.00546148 C19.6911389,8.08147296 20.5,8.94145612 20.5,9.991155 L20.5,9.991155 L20.5,17 L27.508845,17 C28.5602587,17 29.4186829,17.8158778 29.4945492,18.8507377 L29.5,19 L29.4945385,19.1502192 C29.418527,20.1911389 28.5585439,21 27.508845,21 L27.508845,21 L20.5,21 L20.5,28.008845 C20.5,29.0602587 19.6841222,29.9186829 18.6492623,29.9945492 L18.5,30 L18.3497808,29.9945385 C17.3088611,29.918527 16.5,29.0585439 16.5,28.008845 L16.5,28.008845 L16.5,21 L9.491155,21 C8.43974127,21 7.58131707,20.1841222 7.50545085,19.1492623 L7.5,19 L7.50546148,18.8497808 C7.58147296,17.8088611 8.44145612,17 9.491155,17 L9.491155,17 L16.5,17 L16.5,9.991155 C16.5,8.93974127 17.3158778,8.08131707 18.3507377,8.00545085 L18.5,8 Z",
    fill: "#FFFFFF",
    transform: "translate(18.500000, 19.000000) rotate(-225.000000) translate(-18.500000, -19.000000) "
  }, null, -1),
  p1 = [d1, h1],
  g1 = {
    key: 2,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 40 40"
  },
  m1 = w("path", {
    fill: "#507DAF",
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z M18.5,15 C17.3954305,15 16.5,15.8933973 16.5,16.9918842 L16.5,16.9918842 L16.5,28.0081158 L16.5059944,28.1641306 C16.5814663,29.1422683 17.3609071,29.9222992 18.3497808,29.9945365 L18.3497808,29.9945365 L18.5,30 L18.6492623,29.9945271 C19.6841222,29.9183583 20.5,29.0566714 20.5,28.0081158 L20.5,28.0081158 L20.5,16.9918842 L20.4940056,16.8358694 C20.4185337,15.8577317 19.6390929,15.0777008 18.6502192,15.0054635 L18.6502192,15.0054635 Z M18.5,9 C17.396,9 16.5,9.89303565 16.5,10.9980007 C16.5,12.1029657 17.396,13 18.5,13 C19.6053333,13 20.5,12.1029657 20.5,10.9980007 C20.5,9.89303565 19.6053333,9 18.5,9 Z"
  }, null, -1),
  v1 = [m1],
  b1 = {
    class: "absolute top-28 break-all w-full px-8 text-xs text-center"
  },
  y1 = {
    class: "w-45 h-45 p-5"
  },
  w1 = ["src"],
  _1 = {
    key: 2,
    class: "text-sm"
  },
  x1 = qe({
    __name: "QRcode",
    props: {
      entry: String,
      source: String,
      url: String,
      visible: Boolean
    },
    emits: ["click-back"],
    setup(e, {
      emit: t
    }) {
      const n = e,
        r = Wl(),
        s = Ne(""),
        i = Ne(""),
        o = Ne(""),
        l = Ne(null),
        a = async (f = "") => {
          let h = "norid";
          if (window.wbBotDetector && window.wbBotDetector.get) {
            const R = await window.wbBotDetector.get({
              useCache: !0
            }).catch(T => {
              console.log(T)
            });
            h = (R == null ? void 0 : R.rid) || "getriderror"
          }
          const [g, m] = await pn("/sso/v2/qrcode/check", {
            entry: n.entry,
            source: n.source,
            url: n.url,
            qrid: f,
            disp: r.query.disp,
            rid: h,
            ver: ba
          });
          if (g) return;
          const y = +m.data.retcode;
          switch (y) {
            case 50114002:
              i.value = "warning";
              break;
            case 50114003:
            case 50114004:
            case 50114015:
              i.value = "error";
              break;
            case 2e7:
              i.value = "success", o.value = "扫描成功";
              break
          }
          y === 2e7 ? (clearInterval(l.value), l.value = null, m.data.data.url && window.location.replace(m.data.data.url)) : o.value = m.data.msg
        }, u = async () => {
          var g, m;
          l.value && (clearInterval(l.value), l.value = null);
          const [f, h] = await pn("/sso/v2/qrcode/image", {
            entry: n.entry,
            size: 180
          });
          f || h.data.retcode === 2e7 && (s.value = (m = (g = h.data) == null ? void 0 : g.data) == null ? void 0 : m.image, l.value = setInterval(() => {
            var y, R;
            a((R = (y = h.data) == null ? void 0 : y.data) == null ? void 0 : R.qrid)
          }, Wh))
        }, c = () => {
          o.value = "", i.value = "", u()
        };
      return zs(async () => {
        u()
      }), Gs(() => {
        clearInterval(l.value), l.value = null
      }), Ws(() => {}), (f, h) => (G(), ne("div", {
        class: Ae(["flex-col items-center justify-center w-82.5 height-full border-r border-line md:flex dark:border-linedark", e.visible ? "fixed bg-white w-full h-full z-9999" : ""])
      }, [e.visible ? (G(), ne("div", {
        key: 0,
        class: "absolute top-10 left-6 leading-[30px] h-[30px] text-darkGray flex",
        onClick: h[0] || (h[0] = g => f.$emit("click-back"))
      }, [r1, Xe(" 返回 ")])) : Ie("", !0), w("div", {
        class: Ae(["leading-4.5 font-medium", e.visible ? "text-center mt-25" : ""])
      }, "扫描二维码登录", 2), e.visible ? (G(), ne("div", s1, "打开微博手机APP - 我的页面 - 扫一扫")) : Ie("", !0), w("div", {
        class: Ae(["relative border-2 border-line dark:border-linedark", e.visible ? "m-0 mt-[30px] w-[183px] h-[183px] relative left-2/4 -translate-x-2/4" : "m-8.5"])
      }, [i.value ? (G(), ne("div", i1, [w("div", o1, [i.value === "success" ? (G(), ne("svg", l1, u1)) : Ie("", !0), i.value === "error" ? (G(), ne("svg", f1, p1)) : Ie("", !0), i.value === "warning" ? (G(), ne("svg", g1, v1)) : Ie("", !0)]), w("div", b1, sn(o.value), 1), i.value === "error" ? (G(), ne("a", {
        key: 0,
        href: "",
        class: "absolute top-36 break-all w-full px-8 text-xs text-center text-brand",
        onClick: Kt(c, ["prevent"])
      }, "点击刷新")) : Ie("", !0)])) : Ie("", !0), w("div", y1, [s.value ? (G(), ne("img", {
        key: 0,
        src: s.value,
        alt: "",
        class: "w-full h-full"
      }, null, 8, w1)) : Ie("", !0)])], 2), e.visible ? Ie("", !0) : (G(), ne("div", _1, "打开微博手机APP - 我的页面 - 扫一扫"))], 2))
    }
  });

function k1(e) {
  return jo() ? (ja(e), !0) : !1
}

function wa(e) {
  return typeof e == "function" ? e() : Rt(e)
}
const _a = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const E1 = Object.prototype.toString,
  S1 = e => E1.call(e) === "[object Object]",
  lr = () => {},
  C1 = T1();

function T1() {
  var e, t;
  return _a && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent))
}

function En(e) {
  var t;
  const n = wa(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const xa = _a ? window : void 0;

function ss(...e) {
  let t, n, r, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, s] = e, t = xa) : [t, n, r, s] = e, !t) return lr;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const i = [],
    o = () => {
      i.forEach(c => c()), i.length = 0
    },
    l = (c, f, h, g) => (c.addEventListener(f, h, g), () => c.removeEventListener(f, h, g)),
    a = Lt(() => [En(t), wa(s)], ([c, f]) => {
      if (o(), !c) return;
      const h = S1(f) ? {
        ...f
      } : f;
      i.push(...n.flatMap(g => r.map(m => l(c, g, m, h))))
    }, {
      immediate: !0,
      flush: "post"
    }),
    u = () => {
      a(), o()
    };
  return k1(u), u
}
let Po = !1;

function R1(e, t, n = {}) {
  const {
    window: r = xa,
    ignore: s = [],
    capture: i = !0,
    detectIframe: o = !1
  } = n;
  if (!r) return lr;
  C1 && !Po && (Po = !0, Array.from(r.document.body.children).forEach(h => h.addEventListener("click", lr)), r.document.documentElement.addEventListener("click", lr));
  let l = !0;
  const a = h => s.some(g => {
      if (typeof g == "string") return Array.from(r.document.querySelectorAll(g)).some(m => m === h.target || h.composedPath().includes(m));
      {
        const m = En(g);
        return m && (h.target === m || h.composedPath().includes(m))
      }
    }),
    c = [ss(r, "click", h => {
      const g = En(e);
      if (!(!g || g === h.target || h.composedPath().includes(g))) {
        if (h.detail === 0 && (l = !a(h)), !l) {
          l = !0;
          return
        }
        t(h)
      }
    }, {
      passive: !0,
      capture: i
    }), ss(r, "pointerdown", h => {
      const g = En(e);
      l = !a(h) && !!(g && !h.composedPath().includes(g))
    }, {
      passive: !0
    }), o && ss(r, "blur", h => {
      setTimeout(() => {
        var g;
        const m = En(e);
        ((g = r.document.activeElement) == null ? void 0 : g.tagName) === "IFRAME" && !(m != null && m.contains(r.document.activeElement)) && t(h)
      }, 0)
    })].filter(Boolean);
  return () => c.forEach(h => h())
}

function O1(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const s = e.charCodeAt(n).toString(16);
    t += s.length === 1 ? "0".concat(s) : s
  }
  return t
}

function As(e, t = "MwmL8jWA") {
  const n = t.length,
    r = [];
  for (let s = 0; s < e.length; s++) r.push(String.fromCharCode(e.charCodeAt(s) ^ t.charCodeAt(s % n)));
  return O1(r.reverse().join(""))
}
const A1 = {
    key: 0,
    class: "mt-10 md:mt-6.5",
    tabindex: "0"
  },
  L1 = {
    class: "relative"
  },
  P1 = {
    class: "absolute top-1/2 left-0 z-9 -translate-y-1/2"
  },
  D1 = w("svg", {
    class: "w-3 h-3 ml-1 text-main dark:text-maindark",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 612 612"
  }, [w("path", {
    d: "M565.2,173.2c-8.2-8.1-21.5-8.1-29.6,0L303.5,403.4L75.7,177.6c-8-8-21.1-8-29.1,0c-8,7.9-8,20.9,0,28.8l241.3,239.2\n                  c0.3,0.3,0.8,0.4,1.1,0.7c0.2,0.2,0.2,0.4,0.3,0.5c8.2,8.1,21.5,8.1,29.6,0l246.3-244.2C573.4,194.5,573.4,181.3,565.2,173.2z"
  })], -1),
  B1 = {
    class: "p-0.5",
    "aria-labelledby": "dropdownDefaultButton"
  },
  I1 = ["onClick"],
  M1 = {
    href: "#",
    class: "block px-3 py-2.5 hover:bg-cardin dark:hover:bg-cardindark"
  },
  N1 = ["value"],
  $1 = {
    class: "relative mt-2.5"
  },
  V1 = ["value"],
  F1 = {
    class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
  },
  j1 = {
    key: 1,
    class: "text-sm text-disabled dark:text-disableddark cursor-not-allowed"
  },
  U1 = {
    key: 1,
    class: "text-sm text-disabled dark:text-disableddark"
  },
  H1 = {
    class: "flex items-center justify-between h-4.5 mt-2"
  },
  q1 = qe({
    __name: "VerificationCode",
    props: {
      modelValue: {
        type: Object,
        default () {
          return {
            username: "",
            scode: "",
            countryCode: "86"
          }
        }
      },
      countryCodeMenu: {
        type: Array,
        default () {
          return []
        }
      },
      entry: String,
      checked: Boolean,
      isMobile: Boolean
    },
    emits: ["update-error-msg", "update:modelValue", "trigger-check-lisence"],
    setup(e, {
      emit: t
    }) {
      const n = e,
        r = t,
        s = Ne(null),
        i = Ne(!1),
        o = Ne(n.modelValue.countryCode);
      R1(s, () => {
        i.value = !1
      });
      const l = (R, T) => {
          const B = n.modelValue;
          B[T] = R.target.value, r("update:modelValue", B), r("update-error-msg", "")
        },
        a = R => {
          o.value = R, i.value = !1, l({
            target: {
              value: R
            }
          }, "countryCode")
        },
        u = Ne(!1),
        c = Ne(null),
        f = Ne(60),
        h = (R = "") => {
          let T = "".concat(n.modelValue.username);
          return n.modelValue.countryCode !== "86" && (T = "00".concat(n.modelValue.countryCode).concat(n.modelValue.username)), T = As(T), pn("/sso/v2/sms/send", {
            method: "POST",
            entry: n.entry,
            mobile: T,
            mfa_id: R,
            el: 1
          })
        },
        g = async () => {
          if (!n.modelValue.username) {
            r("update-error-msg", "请输入手机号");
            return
          }
          if (c.value) return;
          if (!n.checked && n.isMobile) {
            r("trigger-check-lisence");
            return
          }
          const [R, T] = await h();
          if (R) {
            r("update-error-msg", "短信接口数据获取失败");
            return
          }
          if (T.data.retcode === 0 && T.data.data.act === "mfa_1") {
            const [B, j] = await ya(T.data.data.mfa_id);
            if (B) {
              r("update-error-msg", B.msg);
              return
            }
            if (!j) {
              r("update-error-msg", "极验返回结果有误");
              return
            }
            const [Z, H] = await h(T.data.data.mfa_id);
            if (Z) {
              r("update-error-msg", "二次验证通过，短信接口数据获取失败");
              return
            }
            if (+H.data.retcode != 2e7) {
              r("update-error-msg", H.data.msg || "二次验证通过，短信接口获取数据遇到错误");
              return
            } else u.value = !0, m();
            r("update-error-msg", "")
          } else T.data.retcode === 2e7 && (u.value = !0, m()), r("update-error-msg", T.data.msg)
        };

      function m() {
        c.value = setInterval(() => {
          f.value--, f.value <= 0 && y()
        }, 1e3)
      }

      function y() {
        clearInterval(c.value), f.value = 60, u.value = !1, c.value = null
      }
      return (R, T) => (G(), ne("form", A1, [w("div", L1, [w("div", P1, [w("button", {
        id: "dropdownDefaultButton",
        class: "flex items-center",
        onClick: T[0] || (T[0] = Kt(B => i.value = !i.value, ["prevent"]))
      }, [w("span", null, "+" + sn(o.value), 1), D1]), i.value ? (G(), ne("div", {
        key: 0,
        ref_key: "dropdownMenu",
        ref: s,
        class: "absolute left-0 z-9 w-49.5 h-51.5 mt-2 bg-card border border-line rounded shadow overflow-x-hidden overflow-y-auto text-sm dark:bg-carddark dark:border-linedark"
      }, [w("ul", B1, [(G(!0), ne(_e, null, yl(e.countryCodeMenu, (B, j) => (G(), ne("li", {
        key: j,
        onClick: Z => a(B.code)
      }, [w("a", M1, sn(B.text), 1)], 8, I1))), 128))])], 512)) : Ie("", !0)]), w("input", {
        value: n.modelValue.username,
        type: "text",
        "aria-label": "手机号",
        class: "block w-full pl-20 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "手机号",
        onInput: T[1] || (T[1] = B => l(B, "username"))
      }, null, 40, N1)]), w("div", $1, [w("input", {
        maxlength: "6",
        value: n.modelValue.scode,
        type: "text",
        "aria-label": "验证码",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "验证码",
        onInput: T[2] || (T[2] = B => l(B, "scode"))
      }, null, 40, V1), w("div", F1, [u.value ? (G(), ne("span", U1, sn(f.value) + "s后重新发送", 1)) : (G(), ne(_e, {
        key: 0
      }, [n.modelValue.username ? (G(), ne("a", {
        key: 0,
        class: "text-sm text-alink dark:text-alinkdark cursor-pointer",
        onClick: Kt(g, ["prevent"])
      }, "获取验证码")) : (G(), ne("a", j1, "获取验证码"))], 64))])]), w("div", H1, [Zs(R.$slots, "errorMsg")])]))
    }
  }),
  K1 = {
    class: "mt-10 md:mt-6.5",
    "aria-current": "true",
    tabindex: "1"
  },
  z1 = {
    class: "relative"
  },
  W1 = ["value"],
  G1 = {
    class: "relative mt-2.5"
  },
  Z1 = ["value"],
  J1 = {
    class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
  },
  Q1 = {
    key: 0,
    class: "flex items-center mt-2.5"
  },
  X1 = {
    class: "flex-1"
  },
  Y1 = ["value"],
  ep = {
    class: "w-30 h-11 ml-4"
  },
  tp = ["src"],
  np = {
    class: "flex items-center justify-between h-4.5 mt-2"
  },
  rp = qe({
    __name: "Account",
    props: {
      modelValue: {
        type: Object,
        default () {
          return {
            username: "",
            password: "",
            code: "",
            mfaId: ""
          }
        }
      },
      showCode: Boolean,
      refreshCode: Boolean,
      entry: String,
      forgetUrl: String
    },
    emits: ["update:modelValue", "update-error-msg"],
    setup(e, {
      emit: t
    }) {
      const n = e,
        r = t,
        s = Ne(""),
        i = (a, u) => {
          const c = n.modelValue;
          c[u] = a.target.value, r("update:modelValue", c), r("update-error-msg", "")
        },
        o = async () => {
          const [a, u] = await pn("/sso/v2/captcha/image", {
            method: "POST",
            pcid: n.modelValue.mfaId,
            entry: n.entry
          });
          a || u.data.retcode === 2e7 && (s.value = u.data.data.image)
        }, l = () => {
          window.open(n.forgetUrl)
        };
      return Lt(() => n.showCode, a => {
        a && o()
      }), Lt(() => n.refreshCode, () => {
        o()
      }), (a, u) => (G(), ne("form", K1, [w("div", z1, [w("input", {
        value: n.modelValue.username,
        type: "text",
        "aria-label": "手机号或邮箱",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "手机号或邮箱",
        onInput: u[0] || (u[0] = c => i(c, "username"))
      }, null, 40, W1)]), w("div", G1, [w("input", {
        value: n.modelValue.password,
        type: "password",
        "aria-label": "密码",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "密码",
        onInput: u[1] || (u[1] = c => i(c, "password"))
      }, null, 40, Z1), w("div", J1, [w("a", {
        href: "",
        class: "text-sm text-alink dark:text-alinkdark",
        onClick: Kt(l, ["prevent"])
      }, "忘记密码")])]), e.showCode ? (G(), ne("div", Q1, [w("div", X1, [w("input", {
        value: n.modelValue.ccode,
        type: "text",
        "aria-label": "验证码",
        class: "block w-full px-0 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "请输入验证码",
        onInput: u[2] || (u[2] = c => i(c, "ccode"))
      }, null, 40, Y1)]), w("div", ep, [w("img", {
        src: s.value,
        alt: "",
        class: "w-full h-full",
        onClick: o
      }, null, 8, tp)])])) : Ie("", !0), w("div", np, [Zs(a.$slots, "errorMsg")])]))
    }
  }),
  sp = {
    class: "flex justify-center block w-full bottom-0 text-mainb text-[15px] text-center leading-5 bg-white pb-safe-bottom md:hidden leading-[30px] whitespace-nowrap"
  },
  ip = w("img", {
    class: "h-[30px] w-[30px] mr-2",
    src: "https://d.sinaimg.cn/prd/1005/891/2025/05/27/wechat.png"
  }, null, -1),
  op = w("img", {
    class: "h-[30px] w-[30px] mr-2",
    src: "https://d.sinaimg.cn/prd/1005/891/2025/05/27/scan.png"
  }, null, -1),
  lp = qe({
    __name: "ExtraEntry",
    props: {
      showWechat: {
        type: Boolean,
        default: !1
      }
    },
    emits: ["click-qrcode", "click-wechat"],
    setup(e) {
      return (t, n) => (G(), ne("div", sp, [e.showWechat ? (G(), ne("span", {
        key: 0,
        class: "flex h-5 justify-center items-center text-[#07C160] mx-10",
        onClick: n[0] || (n[0] = r => t.$emit("click-wechat"))
      }, [ip, Xe("微信登录")])) : Ie("", !0), w("span", {
        class: "flex h-5 justify-center items-center mx-10",
        onClick: n[1] || (n[1] = r => t.$emit("click-qrcode"))
      }, [op, Xe("扫码登录")])]))
    }
  });
class ka {
  constructor(t) {
    di(this, "mytimer", null);
    this.enable = t
  }
  start(t, n) {
    this.enable && (this.mytimer = setTimeout(n, t))
  }
  clear() {
    this.enable && (clearTimeout(this.mytimer), this.mytimer = null)
  }
  isset() {
    return this.mytimer !== null
  }
}
const ap = e => {
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let n = "";
  for (let r = 0; r < e; r++) n += t.charAt(Math.ceil(Math.random() * 1e6) % t.length);
  return n
};
let Qt = null,
  Xt = null,
  tn = 0;
const is = 2e3,
  cp = 5e3;
let br;
const up = e => {
    if (Qt || (Qt = new ka(!0)), e === 0) return Qt.clear(), tn = e, !0;
    if (e < 1294935546) return !1;
    const t = function() {
      tn && Qt && (tn += is / 1e3, Qt.start(is, t))
    };
    tn = e, Qt.start(is, t)
  },
  fp = e => {
    br = e
  },
  dp = () => br,
  hp = () => tn,
  pp = () => {
    Xt ? Xt.clear() : Xt = new ka(!1), Xt.start(cp, () => {
      Xt && Xt.clear()
    }), tn && (br || (br = ap(6)))
  },
  gp = {
    class: "flex h-full pb-[25px]"
  },
  mp = {
    class: "flex-1 px-6 pt-5 md:pt-7"
  },
  vp = {
    class: "flex flex-wrap space-x-6.5"
  },
  bp = {
    class: "text-s text-red dark:text-reddark"
  },
  yp = {
    class: "text-s text-red dark:text-reddark"
  },
  wp = {
    for: "checked-checkbox2",
    class: "ml-1 text-s text-sub dark:text-subdark"
  },
  _p = w("a", {
    href: "https://passport.sinaimg.cn/html/sso/signupagreement_x.html",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "新浪网络使用协议", -1),
  xp = w("a", {
    href: "https://passport.sinaimg.cn/html/sso/privacyclause.html",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "新浪个人信息保护政策", -1),
  kp = w("a", {
    href: "https://m.weibo.cn/c/regagreement",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "用户协议", -1),
  Ep = w("a", {
    href: "https://m.weibo.cn/c/privacy",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "隐私条款", -1),
  Sp = {
    key: 0
  },
  Cp = {
    key: 1
  },
  Tp = w("a", {
    href: "https://m.weibo.cn/c/regagreement",
    target: "_blank",
    class: "text-xs text-alink dark:text-alinkdark"
  }, "《用户协议》", -1),
  Rp = w("a", {
    href: "https://m.weibo.cn/c/privacy",
    target: "_blank",
    class: "text-xs text-alink dark:text-alinkdark"
  }, "《隐私条款》", -1),
  Op = qe({
    __name: "Login",
    setup(e) {
      const t = Wl(),
        n = qt({
          curType: "show_sms",
          show_pw: !1,
          show_qq: !1,
          show_qr: !1,
          show_sms: !1,
          show_wechat: !1,
          errMsg: "",
          entry: "",
          source: "",
          checked: !1,
          regUrl: "",
          forgetUrl: "",
          iconUrl: "",
          pubkey: "",
          rsakv: "",
          isSina: window.location.hostname === "login.sina.com.cn",
          mobileQRcodeVisible: !1,
          wechatUrl: ""
        }),
        r = Ne(R()),
        s = qt({
          form: {
            username: "",
            password: "",
            ccode: "",
            mfaId: ""
          },
          showCode: !1,
          refreshCode: !1
        }),
        i = qt({
          form: {
            username: "",
            scode: "",
            countryCode: "86",
            cid: ""
          },
          countryCodeMenu: []
        }),
        o = He(() => !r.value || n.mobileQRcodeVisible),
        l = {
          show_pw: 1,
          show_sms: 2
        },
        a = He(() => !!n.wechatUrl),
        u = Ne("border-b-2 border-brand font-medium dark:border-branddark");
      Lt(r, () => {
        n.mobileQRcodeVisible = !1
      });
      const c = H => {
          n.curType = H, n.errMsg = ""
        },
        f = () => {
          s.showCode = !0
        },
        h = (H = "") => {
          n.errMsg = H
        },
        g = () => {
          n.errMsg = n.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款"
        },
        m = () => r.value && !n.checked ? (g(), !0) : !1,
        y = async () => {
          if (m()) return;
          const H = {
            method: "POST",
            entry: n.entry,
            source: n.source,
            type: l[n.curType],
            url: t.query.url,
            ver: ba
          };
          if (n.curType === "show_pw") {
            if (!s.form.username || !s.form.password) {
              n.errMsg = "请输入正确的信息";
              return
            }
            pp(), H.username = s.form.username, H.pass = Yh("".concat([hp(), dp()].join("	"), "\n").concat(s.form.password), n.pubkey), H.cid = s.form.mfaId, H.pwencode = "rsa", H.rsakv = n.rsakv, s.showCode && (H.ccode = s.form.ccode)
          }
          if (n.curType === "show_sms") {
            if (!i.form.username || !i.form.scode) {
              n.errMsg = "请输入正确的信息";
              return
            }
            i.form.countryCode === "86" ? H.username = "".concat(i.form.username) : H.username = "00".concat(i.form.countryCode).concat(i.form.username), H.scode = i.form.scode
          }
          if (t.query.disp && (H.disp = t.query.disp), H.rid = "norid", window.wbBotDetector && window.wbBotDetector.get) {
            const de = await window.wbBotDetector.get({
              useCache: !1
            }).catch(he => {
              console.log(he)
            });
            H.rid = (de == null ? void 0 : de.rid) || "getriderror"
          }
          H.scode && (H.scode = As(H.scode), H.el = 1), H.username && (H.username = As(H.username), H.el = 1);
          const [E, Q] = await pn("/sso/v2/login", H);
          if (E) return;
          switch (Q.data.data.act) {
            case "mfa_2":
              s.form.mfaId = Q.data.data.mfa_id, f();
              break;
            case "mfa_1": {
              s.form.mfaId = Q.data.data.mfa_id;
              const [de, he] = await ya(Q.data.data.mfa_id);
              if (de) {
                h(de.msg);
                return
              }
              if (!he) {
                h("极验返回结果有误");
                return
              }
              await y()
            }
            return;
            case "goto":
              window.location.href = Q.data.data.location;
              break
          }
          const xe = +Q.data.retcode;
          if (xe !== 2e5) {
            switch (xe) {
              case 2070:
                s.refreshCode = !0, qs(() => {
                  s.refreshCode = !1
                });
                break
            }
            n.errMsg = Q.data.msg
          }
        };
      zs(async () => {
        n.entry = t.query.entry, n.source = t.query.source;
        const [H, E] = await pn("/sso/v2/web/config", {
          method: "POST",
          entry: n.entry,
          source: n.source
        });
        H || E.data.retcode !== 2e7 || (n.show_pw = !!E.data.data.show_pw, n.show_qq = !!E.data.data.show_qq, n.show_qr = !!E.data.data.show_qr, n.show_sms = !!E.data.data.show_sms, n.show_wechat = !!E.data.data.show_wechat, n.curType = E.data.data.first_show, n.regUrl = E.data.data.reg_url || Jh, n.forgetUrl = E.data.data.forget_url || Zh, n.iconUrl = E.data.data.icon_url || Qh, n.pubkey = E.data.data.pubkey, n.rsakv = E.data.data.rsakv, n.wechatUrl = E.data.data.wechat_url, document.title = "登录 - ".concat(E.data.data.title), i.countryCodeMenu = E.data.data.country_code.map(Q => ({
          code: Q.country_code,
          text: Q.local.zh_CN
        })), fp(E.data.data.nonce), up(E.data.data.servertime))
      });

      function R() {
        return Lo() || !Lo() && window.innerWidth < 768
      }
      const T = () => {
          r.value = R()
        },
        B = () => {
          n.mobileQRcodeVisible = !0
        },
        j = () => {
          n.mobileQRcodeVisible = !1
        };

      function Z() {
        if (r.value && !n.checked) {
          n.errMsg = n.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款";
          return
        }
        if (!a.value) return;
        const H = t.query.url || "",
          E = "".concat(n.wechatUrl, "&r=").concat(H);
        window.location.href = E
      }
      return Ws(() => {
        window.addEventListener("resize", T)
      }), Gs(() => {
        window.removeEventListener("resize", T)
      }), (H, E) => (G(), lt($n, {
        "icon-url": n.iconUrl
      }, {
        default: At(() => [w("div", gp, [o.value ? (G(), lt(x1, {
          key: 0,
          visible: n.mobileQRcodeVisible,
          entry: n.entry,
          source: n.source,
          url: Rt(t).query.url,
          onClickBack: j
        }, null, 8, ["visible", "entry", "source", "url"])) : Ie("", !0), w("div", mp, [w("div", {
          class: Ae(["h-16 iphone-safe-header", r.value ? "md:portrait:h-0" : "md:h-0"])
        }, null, 2), w("ul", vp, [w("li", null, [w("a", {
          href: "#",
          class: Ae(["inline-block pb-2.5", [n.curType === "show_sms" && u.value]]),
          "aria-current": "page",
          onClick: E[0] || (E[0] = Kt(Q => c("show_sms"), ["prevent"]))
        }, [w("span", {
          class: Ae(r.value ? "md:portrait:hidden" : "md:hidden")
        }, "短信验证登录", 2), w("span", {
          class: Ae(["hidden", r.value ? "md:portrait:inline" : "md:inline"])
        }, "验证码登录", 2)], 2), n.curType === "show_sms" ? (G(), ne("div", {
          key: 0,
          class: Ae(["absolute z-9 mt-2 text-xs text-sub dark:text-subdark", r.value ? "md:portrait:hidden" : "md:hidden"])
        }, " 未注册手机号验证通过后将自动注册 ", 2)) : Ie("", !0)]), w("li", null, [w("a", {
          href: "#",
          class: Ae(["inline-block pb-2.5", [n.curType === "show_pw" && u.value]]),
          onClick: E[1] || (E[1] = Kt(Q => c("show_pw"), ["prevent"]))
        }, [w("span", {
          class: Ae(r.value ? "md:portrait:hidden" : "md:hidden")
        }, "账号密码登录", 2), w("span", {
          class: Ae(["hidden", r.value ? "md:portrait:inline" : "md:inline"])
        }, "账号登录", 2)], 2)])]), n.curType === "show_sms" ? (G(), lt(q1, {
          key: 0,
          modelValue: i.form,
          "onUpdate:modelValue": E[2] || (E[2] = Q => i.form = Q),
          countryCodeMenu: i.countryCodeMenu,
          entry: n.entry,
          checked: n.checked,
          isMobile: r.value,
          onUpdateErrorMsg: h,
          onTriggerCheckLisence: m
        }, {
          errorMsg: At(() => [w("div", bp, sn(n.errMsg), 1)]),
          _: 1
        }, 8, ["modelValue", "countryCodeMenu", "entry", "checked", "isMobile"])) : (G(), lt(rp, {
          key: 1,
          modelValue: s.form,
          "onUpdate:modelValue": E[3] || (E[3] = Q => s.form = Q),
          "show-code": s.showCode,
          "refresh-code": s.refreshCode,
          entry: n.entry,
          "forget-url": n.forgetUrl,
          onUpdateErrorMsg: h
        }, {
          errorMsg: At(() => [w("div", yp, sn(n.errMsg), 1)]),
          _: 1
        }, 8, ["modelValue", "show-code", "refresh-code", "entry", "forget-url"])), r.value ? (G(), ne("div", {
          key: 2,
          class: Ae(["flex items-center mt-3.5", r.value ? "md:portrait:hidden" : "md:hidden"])
        }, [Oc(w("input", {
          id: "checked-checkbox2",
          "onUpdate:modelValue": E[4] || (E[4] = Q => n.checked = Q),
          type: "checkbox",
          value: "",
          class: "w-4 h-4 bg-transparent border-disabled rounded text-brand dark:border-disableddark dark:text-branddark"
        }, null, 512), [
          [Nu, n.checked]
        ]), w("label", wp, [Xe(" 登录注册即表示同意 "), n.isSina ? (G(), ne(_e, {
          key: 0
        }, [_p, Xe("、 "), xp], 64)) : (G(), ne(_e, {
          key: 1
        }, [kp, Xe("、 "), Ep], 64))])], 2)) : Ie("", !0), w("button", {
          type: "button",
          class: "w-full mt-5.5 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark",
          onClick: Kt(y, ["prevent"])
        }, [n.curType === "show_sms" ? (G(), ne("span", Sp, "登录/注册")) : (G(), ne("span", Cp, "登录"))]), w("div", {
          class: Ae(["justify-start mt-3 text-xs text-mainb", r.value && "hidden"])
        }, [Xe(" 未注册手机验证后自动登录，注册即代表同意 "), Tp, Rp], 2)])]), Te(lp, {
          showWechat: a.value,
          onClickQrcode: B,
          onClickWechat: Z
        }, null, 8, ["showWechat"])]),
        _: 1
      }, 8, ["icon-url"]))
    }
  }),
  Ap = {
    class: "flex flex-col items-center px-6"
  },
  Lp = w("div", {
    class: "mt-14 font-medium"
  }, "解除账号异常", -1),
  Pp = w("div", {
    class: "mt-2 text-sm text-sub dark:text-subdark"
  }, "你的账号存在安全风险，请按照如下流程解除异常", -1),
  Dp = w("div", {
    class: "relative w-full h-px mt-14"
  }, [w("hr", {
    class: "absolute -left-6 -right-6 top-0 h-full bg-line border-0 dark:bg-linedark"
  })], -1);
const Bp = w("div", {
    class: "w-12 h-21.75 mt-6 bg-phone bg-cover"
  }, null, -1),
  Ip = w("div", {
    class: "mt-4 text-sm"
  }, "暂不支持通过PC版验证身份", -1),
  Mp = w("div", {
    class: "mt-1 text-s text-sub dark:text-subdark"
  }, "请使用微博客户端验证身份", -1),
  Np = w("button", {
    type: "button",
    class: "w-full md:w-55 mt-9 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark"
  }, " 返回 ", -1),
  $p = qe({
    __name: "Relieve",
    setup(e) {
      return (t, n) => (G(), lt($n, null, {
        default: At(() => [w("div", Ap, [Lp, Pp, Dp, (G(), ne(_e, {
          key: 6
        }, [Bp, Ip, Mp, Np], 64))])]),
        _: 1
      }))
    }
  });
const Vp = {
    key: 1,
    class: "flex flex-col items-center px-6"
  },
  Fp = w("div", {
    class: "mt-36.25 font-medium text-center"
  }, "请使用以下手机号接受短信验证码", -1);
const jp = {
    class: "flex items-center justify-between w-55 mt-12"
  },
  Up = w("div", {
    class: "flex items-center justify-between w-55 mt-2 text-s"
  }, [w("div", {
    class: "text-red dark:text-reddark"
  }, "验证码错误"), w("div", null, [w("span", {
    class: "text-mainb dark:text-mainbdark"
  }, "57s"), w("a", {
    href: "",
    class: "text-alink dark:text-alinkdark"
  }, "重新获取验证码")])], -1),
  Hp = w("button", {
    type: "button",
    class: "w-full md:w-55 mt-7 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark"
  }, " 确认 ", -1),
  qp = w("a", {
    href: "",
    class: "mt-23 text-s text-alink dark:text-alinkdark"
  }, "手机不可用，查看帮助", -1),
  Kp = qe({
    __name: "Page1",
    setup(e) {
      return (t, n) => (G(), lt($n, null, {
        default: At(() => [(G(), ne("div", Vp, [Fp, (G(), ne(_e, {
          key: 2
        }, [w("div", jp, [(G(), ne(_e, null, yl(6, r => w("input", {
          key: r,
          type: "text",
          "aria-label": "验证码",
          class: "block w-7.5 py-1 bg-transparent border border-lineb rounded text-center text-3xl text-main focus:outline-none dark:border-linebdark dark:text-maindark"
        })), 64))]), Up, Hp], 64)), qp]))]),
        _: 1
      }))
    }
  }),
  zp = {
    class: "flex flex-col items-center px-6"
  },
  Wp = w("div", {
    class: "mt-22 font-medium"
  }, "身份验证", -1);
const Gp = w("div", {
    class: "mt-2 text-sm text-sub dark:text-subdark"
  }, "打开微博客户端，请查收来自@微博安全中心的私信", -1),
  Zp = w("div", {
    class: "w-15 h-15 mt-12 rounded-full overflow-hidden"
  }, [w("img", {
    src: "",
    alt: "",
    class: "w-full h-full"
  })], -1),
  Jp = w("div", {
    class: "h-5 mt-2"
  }, [w("span", {
    class: "text-sm text-sub dark:text-subdark"
  }, "58s")], -1),
  Qp = w("button", {
    type: "button",
    disabled: "",
    class: "cursor-not-allowed opacity-50 w-full md:w-55 mt-4 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark"
  }, " 发送私信验证 ", -1),
  Xp = w("div", {
    class: "relative w-full h-px mt-6"
  }, [w("hr", {
    class: "absolute -left-6 -right-6 top-0 h-full bg-line border-0 dark:bg-linedark"
  })], -1),
  Yp = w("div", {
    class: "flex items-center mt-6"
  }, [w("span", {
    class: "text-sm text-sub dark:text-subdark"
  }, "若扫描遇到问题，选择其他方式"), w("div", {
    class: "relative"
  }, [w("button", {
    type: "button",
    class: "whitespace-nowrap ml-1 p-0.75"
  }, [w("svg", {
    class: "w-3.5 h-3.5 text-sub dark:text-subdark",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  }, [w("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("path", {
    d: "M10,2 C14.418278,2 18,5.581722 18,10 C18,14.418278 14.418278,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 Z M10,3 C6.23076923,3 3,6.23076923 3,10 C3,13.7692308 6.23076923,17 10,17 C13.7692308,17 17,13.7692308 17,10 C17,6.23076923 13.7692308,3 10,3 Z M9.914,12.524 C10.178,12.524 10.406,12.608 10.586,12.776 C10.754,12.944 10.85,13.16 10.85,13.424 C10.85,13.688 10.754,13.916 10.586,14.084 C10.394,14.252 10.178,14.336 9.914,14.336 C9.65,14.336 9.434,14.24 9.266,14.072 C9.074,13.904 8.99,13.688 8.99,13.424 C8.99,13.16 9.074,12.944 9.266,12.776 C9.434,12.608 9.65,12.524 9.914,12.524 Z M10.13,5.6 C10.91,5.6 11.546,5.804 12.026,6.236 C12.506,6.656 12.746,7.232 12.746,7.964 C12.746,8.564 12.59,9.056 12.302,9.44 L12.1603261,9.58321563 C12.008861,9.72925319 11.7615312,9.95525169 11.421429,10.2550263 L11.27,10.388 C11.054,10.556 10.898,10.76 10.79,10.976 C10.67,11.216 10.61,11.48 10.61,11.768 L10.61,11.936 L9.23,11.936 L9.23,11.768 C9.23,11.312 9.302,10.916 9.47,10.592 C9.626,10.268 10.094,9.764 10.874,9.068 L11.018,8.9 C11.234,8.636 11.342,8.348 11.342,8.048 C11.342,7.652 11.222,7.34 11.006,7.112 C10.778,6.884 10.454,6.776 10.046,6.776 C9.53,6.776 9.158,6.932 8.918,7.256 C8.714,7.532 8.618,7.928 8.618,8.444 L7.25,8.444 C7.25,7.556 7.502,6.86 8.03,6.356 C8.546,5.852 9.242,5.6 10.13,5.6 Z",
    fill: "currentColor",
    "fill-rule": "nonzero"
  })])]), w("span", {
    class: "sr-only"
  }, "提示")]), w("div", {
    class: "absolute md:top-1/2 right-0 md:translate-x-full md:-translate-y-1/2 w-50 p-2.5 bg-card border border-lineb rounded-lg text-sm dark:bg-carddark dark:border-linebdark"
  }, " 请检查接受验证码的手机号是否正确，或稍后重试 ")])], -1),
  e0 = {
    class: "flex items-center mt-3 space-x-5"
  };
const t0 = {
    key: 1,
    type: "button",
    class: "whitespace-nowrap inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-main hover:bg-gray-100 active:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700"
  },
  n0 = w("svg", {
    class: "mr-1 w-4 h-4",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, [w("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("path", {
    d: "M17,11.75 C17.3796958,11.75 17.693491,12.0321539 17.7431534,12.3982294 L17.75,12.5 L17.75,15 C17.75,16.4625318 16.6082954,17.6584043 15.1675223,17.7449812 L15,17.75 L12.5,17.75 C12.0857864,17.75 11.75,17.4142136 11.75,17 C11.75,16.6203042 12.0321539,16.306509 12.3982294,16.2568466 L12.5,16.25 L15,16.25 C15.6472087,16.25 16.1795339,15.7581253 16.2435464,15.1278052 L16.25,15 L16.25,12.5 C16.25,12.0857864 16.5857864,11.75 17,11.75 Z M3,11.75 C3.37969577,11.75 3.69349096,12.0321539 3.74315338,12.3982294 L3.75,12.5 L3.75,15 C3.75,15.6472087 4.24187466,16.1795339 4.87219476,16.2435464 L5,16.25 L7.5,16.25 C7.91421356,16.25 8.25,16.5857864 8.25,17 C8.25,17.3796958 7.96784612,17.693491 7.60177056,17.7431534 L7.5,17.75 L5,17.75 C3.53746816,17.75 2.34159572,16.6082954 2.25501879,15.1675223 L2.25,15 L2.25,12.5 C2.25,12.0857864 2.58578644,11.75 3,11.75 Z M18.5,9.5 L18.5,10.5 L1.5,10.5 L1.5,9.5 L18.5,9.5 Z M15,2.25 C16.4625318,2.25 17.6584043,3.3917046 17.7449812,4.83247767 L17.75,5 L17.75,7.5 C17.75,7.91421356 17.4142136,8.25 17,8.25 C16.6203042,8.25 16.306509,7.96784612 16.2568466,7.60177056 L16.25,7.5 L16.25,5 C16.25,4.35279131 15.7581253,3.8204661 15.1278052,3.75645361 L15,3.75 L12.5,3.75 C12.0857864,3.75 11.75,3.41421356 11.75,3 C11.75,2.62030423 12.0321539,2.30650904 12.3982294,2.25684662 L12.5,2.25 L15,2.25 Z M7.5,2.25 C7.91421356,2.25 8.25,2.58578644 8.25,3 C8.25,3.37969577 7.96784612,3.69349096 7.60177056,3.74315338 L7.5,3.75 L5,3.75 C4.35279131,3.75 3.8204661,4.24187466 3.75645361,4.87219476 L3.75,5 L3.75,7.5 C3.75,7.91421356 3.41421356,8.25 3,8.25 C2.62030423,8.25 2.30650904,7.96784612 2.25684662,7.60177056 L2.25,7.5 L2.25,5 C2.25,3.53746816 3.3917046,2.34159572 4.83247767,2.25501879 L5,2.25 L7.5,2.25 Z",
    fill: "currentColor",
    "fill-rule": "nonzero"
  })])], -1),
  r0 = w("button", {
    type: "button",
    class: "whitespace-nowrap inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-main hover:bg-gray-100 active:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700"
  }, [w("svg", {
    class: "mr-1 w-4 h-4",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, [w("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("path", {
    d: "M17,3.25 C17.9181734,3.25 18.6711923,3.95711027 18.7441988,4.85647279 L18.75,5 L18.75,15 C18.75,15.9181734 18.0428897,16.6711923 17.1435272,16.7441988 L17,16.75 L3,16.75 C2.0818266,16.75 1.32880766,16.0428897 1.2558012,15.1435272 L1.25,15 L1.25,5 C1.25,4.0818266 1.95711027,3.32880766 2.85647279,3.2558012 L3,3.25 L17,3.25 Z M17.25,5.575 L11.7341297,10.0573725 C10.7742903,10.8372421 9.41988912,10.8762355 8.42059349,10.1743529 L8.26587028,10.0573725 L2.75,5.576 L2.75,15 C2.75,15.1183467 2.83223341,15.2174868 2.94267729,15.2433973 L3,15.25 L17,15.25 C17.1183467,15.25 17.2174868,15.1677666 17.2433973,15.0573227 L17.25,15 L17.25,5.575 Z M15.886,4.75 L4.113,4.75 L9.21175922,8.89320148 C9.60035819,9.20893815 10.1312371,9.25751302 10.5636145,9.0389261 L10.6789125,8.97268764 L10.7882408,8.89320148 L15.886,4.75 Z",
    fill: "currentColor",
    "fill-rule": "nonzero"
  })])]), Xe(" 私信验证 ")], -1),
  s0 = w("a", {
    href: "",
    class: "mt-4.5 text-s text-alink dark:text-alinkdark"
  }, "换个账号", -1),
  i0 = qe({
    __name: "Page2",
    setup(e) {
      return (t, n) => (G(), lt($n, null, {
        default: At(() => [w("div", zp, [Wp, (G(), ne(_e, {
          key: 2
        }, [Gp, Zp, Jp, Qp], 64)), Xp, Yp, w("div", e0, [(G(), ne("button", t0, [n0, Xe(" 扫码验证 ")])), r0]), s0])]),
        _: 1
      }))
    }
  }),
  o0 = w("div", {
    class: "flex flex-col items-center px-6"
  }, [w("div", {
    class: "mt-22 font-medium text-center"
  }, "为了解除账号异常，请点击按钮进行验证"), w("button", {
    type: "button",
    class: "inline-flex items-center justify-center w-full md:w-56 h-13 mt-30 bg-line border border-lineb rounded text-main whitespace-nowrap hover:bg-disabled active:bg-disabled dark:bg-linedark dark:border-linebdark dark:hover:bg-disableddark dark:active:bg-disableddark dark:text-maindark"
  }, [w("svg", {
    class: "mr-4.5 w-4 h-4 text-brand dark:text-branddark",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  }, [w("g", {
    stroke: "none",
    "stroke-width": "1",
    fill: "none",
    "fill-rule": "evenodd"
  }, [w("path", {
    d: "M10,1 C14.9705627,1 19,5.02943725 19,10 C19,14.9705627 14.9705627,19 10,19 C5.02943725,19 1,14.9705627 1,10 C1,5.02943725 5.02943725,1 10,1 Z M10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 Z M10,5 C12.7614237,5 15,7.23857625 15,10 C15,12.7614237 12.7614237,15 10,15 C7.23857625,15 5,12.7614237 5,10 C5,7.23857625 7.23857625,5 10,5 Z",
    fill: "currentColor",
    "fill-rule": "nonzero"
  })])]), Xe(" 点击按钮进行验证 ")])], -1),
  l0 = w("div", {
    class: "fixed inset-0 z-9999 flex items-center justify-center"
  }, [w("div", {
    class: "w-87.5 bg-card dark:bg-carddrak"
  }, [w("div", null, "等UI")])], -1),
  a0 = w("div", {
    class: "fixed inset-0 z-9998 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
  }, null, -1),
  c0 = qe({
    __name: "Page3",
    setup(e) {
      return (t, n) => (G(), ne(_e, null, [Te($n, null, {
        default: At(() => [o0]),
        _: 1
      }), l0, a0], 64))
    }
  }),
  u0 = [{
    path: "/sso/signin",
    name: "login",
    component: Op
  }, {
    path: "/relieve",
    name: "relieve",
    component: $p
  }, {
    path: "/page1",
    name: "page1",
    component: Kp
  }, {
    path: "/page2",
    name: "page2",
    component: i0
  }, {
    path: "/page3",
    name: "page3",
    component: c0
  }],
  f0 = Xf({
    history: pf(),
    routes: u0
  });

function Do(e) {
  for (const t in e) e[t] !== 0 && !e[t] && delete e[t]
}
fe.defaults.withCredentials = !0;
fe.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
fe.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
fe.defaults.xsrfCookieName = "X-CSRF-TOKEN";
fe.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
const d0 = {
  install() {
    fe.interceptors.request.use(e => {
      const t = e.params,
        n = e.data;
      return t && Do(t), n && Do(n), e
    }, e => Promise.reject(e)), fe.interceptors.response.use(e => e)
  }
};
(function(e) {
  if (typeof e > "u") throw new TypeError("Geetest requires browser environment");
  const t = e.document,
    n = e.Math,
    r = t.getElementsByTagName("head")[0],
    s = 1e4;

  function i(_) {
    this._obj = _
  }
  i.prototype = {
    _each(_) {
      const U = this._obj;
      for (const L in U) U.hasOwnProperty(L) && _(L, U[L]);
      return this
    },
    _extend(_) {
      const U = this;
      new i(_)._each((L, V) => {
        U._obj[L] = V
      })
    }
  };
  const o = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, _ => {
      const U = n.random() * 16 | 0;
      return (_ === "x" ? U : U & 3 | 8).toString(16)
    })
  };

  function l(_) {
    const U = this;
    new i(_)._each((L, V) => {
      U[L] = V
    })
  }
  l.prototype = {
    apiServers: ["gcaptcha4.geetest.com", "gcaptcha4.geevisit.com", "gcaptcha4.gsensebot.com"],
    staticServers: ["static.geetest.com", "static.geevisit.com"],
    protocol: "http://",
    typePath: "/load",
    fallback_config: {
      bypass: {
        staticServers: ["static.geetest.com", "static.geevisit.com"],
        type: "bypass",
        bypass: "/v4/bypass.js"
      }
    },
    _get_fallback_config() {
      const _ = this;
      return u(_.type) ? _.fallback_config[_.type] : _.fallback_config.bypass
    },
    _extend(_) {
      const U = this;
      new i(_)._each((L, V) => {
        U[L] = V
      })
    }
  };
  const a = function(_) {
    return typeof _ == "number"
  };
  var u = function(_) {
    return typeof _ == "string"
  };
  const c = function(_) {
      return typeof _ == "boolean"
    },
    f = function(_) {
      return typeof _ == "object" && _ !== null
    },
    h = function(_) {
      return typeof _ == "function"
    },
    g = /Mobi/i.test(navigator.userAgent),
    m = {},
    y = {},
    R = function() {
      return parseInt(n.random() * 1e4) + new Date().valueOf()
    },
    T = function(_, U) {
      if (typeof _ != "function") return;
      const L = Array.prototype.slice.call(arguments, 2);
      return Function.prototype.bind ? _.bind(U, L) : function() {
        const V = Array.prototype.slice.call(arguments);
        return _.apply(U, L.concat(V))
      }
    },
    B = Object.prototype.toString,
    j = function(_) {
      return typeof _ == "function"
    },
    Z = function(_) {
      return _ === Object(_)
    },
    H = function(_) {
      return B.call(_) == "[object Array]"
    },
    E = function(_) {
      return B.call(_) == "[object Date]"
    },
    Q = function(_) {
      return B.call(_) == "[object RegExp]"
    },
    ye = function(_) {
      return B.call(_) == "[object Boolean]"
    };

  function xe(_) {
    return _.replace(/(\S)(_([a-zA-Z]))/g, (U, L, V, v) => L + v.toUpperCase() || "")
  }

  function de(_, U) {
    if (!Z(_) || E(_) || Q(_) || ye(_) || j(_)) return U ? xe(_) : _;
    if (H(_)) {
      var L = [];
      for (let V = 0; V < _.length; V++) L.push(de(_[V]))
    } else {
      var L = {};
      for (const v in _) _.hasOwnProperty(v) && (L[de(v, !0)] = de(_[v]))
    }
    return L
  }
  const he = function(_, U, L) {
      const V = t.createElement("script");
      V.charset = "UTF-8", V.async = !0, /static\.geetest\.com/g.test(_) && (V.crossOrigin = "anonymous"), V.onerror = function() {
        U(!0), v = !0
      };
      var v = !1;
      V.onload = V.onreadystatechange = function() {
        !v && (!V.readyState || V.readyState === "loaded" || V.readyState === "complete") && (v = !0, setTimeout(() => {
          U(!1)
        }, 0))
      }, V.src = _, r.appendChild(V), setTimeout(() => {
        v || (V.onerror = V.onload = null, V.remove && V.remove(), U(!0))
      }, L || s)
    },
    Ge = function(_) {
      return _.replace(/^https?:\/\/|\/$/g, "")
    },
    Ce = function(_) {
      return _ = _ && _.replace(/\/+/g, "/"), _.indexOf("/") !== 0 && (_ = "/".concat(_)), _
    },
    Mt = function(_) {
      if (!_) return "";
      let U = "?";
      return new i(_)._each((L, V) => {
        (u(V) || a(V) || c(V)) && (U = "".concat(U + encodeURIComponent(L), "=").concat(encodeURIComponent(V), "&"))
      }), U === "?" && (U = ""), U.replace(/&$/, "")
    },
    vt = function(_, U, L, V) {
      U = Ge(U);
      let v = Ce(L) + Mt(V);
      return U && (v = _ + U + v), v
    },
    ve = function(_, U, L, V, v, O, P) {
      const $ = function(W) {
        if (P) {
          var X = "geetest_".concat(R());
          e[X] = T(P, null, X), v.callback = X
        }
        const d = vt(U, L[W], V, v);
        he(d, p => {
          if (p) {
            if (X) try {
              e[X] = function() {
                e[X] = null
              }
            } catch (b) {}
            W >= L.length - 1 ? O(!0) : $(W + 1)
          } else O(!1)
        }, _.timeout)
      };
      $(0)
    },
    ae = function(_, U, L, V) {
      const v = function(O, P) {
        P.status == "success" ? V(P.data) : (P.status, V(P)), e[O] = void 0;
        try {
          delete e[O]
        } catch ($) {}
      };
      ve(L, L.protocol, _, U, {
        callback: "",
        captcha_id: L.captchaId,
        challenge: L.challenge || o(),
        client_type: g ? "h5" : "web",
        risk_type: L.riskType,
        user_info: L.userInfo,
        call_type: L.callType,
        lang: L.language ? L.language : navigator.appName === "Netscape" ? navigator.language.toLowerCase() : navigator.userLanguage.toLowerCase()
      }, O => {
        if (O && typeof L.offlineCb == "function") {
          L.offlineCb();
          return
        }
        O && V(L._get_fallback_config())
      }, v)
    },
    re = function(_, U, L) {
      const V = {
        networkError: "网络错误",
        gtTypeError: "gt字段不是字符串类型"
      };
      if (typeof U.onError == "function") U.onError({
        desc: L.desc,
        msg: L.msg,
        code: L.code
      });
      else throw new TypeError(V[_])
    };
  (function() {
    return e.Geetest || t.getElementById("gt_lib")
  })() && (y.slide = "loaded");
  const nt = function(_) {
    let U = !1;
    const V = _ && {
      js: "script",
      css: "link"
    } [_.split(".").pop()];
    if (V !== void 0) {
      const v = t.getElementsByTagName(V);
      for (const O in v)(v[O].href && v[O].href.toString().indexOf(_) > 0 || v[O].src && v[O].src.toString().indexOf(_) > 0) && (U = !0)
    }
    return U
  };
  e.initGeetest4 = function(_, U) {
    const L = new l(_);
    _.https ? L.protocol = "https://" : _.protocol || (L.protocol = "".concat(e.location.protocol, "//")), f(_.getType) && L._extend(_.getType), ae(L.apiServers, L.typePath, L, v => {
      var v = de(v);
      if (v.status === "error") return re("networkError", L, v);
      const O = v.type;
      L.debug && new i(v)._extend(L.debug);
      const P = function() {
        L._extend(v), U(new e.Geetest4(L))
      };
      m[O] = m[O] || [];
      const $ = y[O] || "init";
      if ($ === "init") y[O] = "loading", m[O].push(P), v.gctPath && ve(L, L.protocol, Object.hasOwnProperty.call(L, "staticServers") ? L.staticServers : v.staticServers || L.staticServers, v.gctPath, null, W => {
        W && re("networkError", L, {
          code: "60205",
          msg: "Network failure",
          desc: {
            detail: "gct resource load timeout"
          }
        })
      }), ve(L, L.protocol, Object.hasOwnProperty.call(L, "staticServers") ? L.staticServers : v.staticServers || L.staticServers, v.bypass || v.staticPath + v.js, null, W => {
        if (W) y[O] = "fail", re("networkError", L, {
          code: "60204",
          msg: "Network failure",
          desc: {
            detail: "js resource load timeout"
          }
        });
        else {
          y[O] = "loaded";
          const X = m[O];
          for (let d = 0, p = X.length; d < p; d = d + 1) {
            const b = X[d];
            h(b) && b()
          }
          m[O] = []
        }
      });
      else {
        if ($ === "loaded") return v.gctPath && !nt(v.gctPath) && ve(L, L.protocol, Object.hasOwnProperty.call(L, "staticServers") ? L.staticServers : v.staticServers || L.staticServers, v.gctPath, null, W => {
          W && re("networkError", L, {
            code: "60205",
            msg: "Network failure",
            desc: {
              detail: "gct resource load timeout"
            }
          })
        }), P();
        $ === "fail" ? re("networkError", L, {
          code: "60204",
          msg: "Network failure",
          desc: {
            detail: "js resource load timeout"
          }
        }) : $ === "loading" && m[O].push(P)
      }
    })
  };
  const Fe = function(_, U) {
    (!f(_) || _.geetestKey == "undefined" || _.captchaId == "undefined" || _.product == "undefined") && U({}, "params_err", !1);
    const L = _.product,
      V = _.lang == "undefined" ? "zh-cn" : _.lang,
      v = _.appendId == "undefined" ? "" : _.appendId;
    initGeetest4({
      captchaId: _.captchaId,
      product: _.product,
      lang: V
    }, O => {
      L != "bind" && O.appendTo("#".concat(v)), O.onReady(() => {
        L == "bind" && O.showCaptcha()
      }), O.onSuccess(() => {
        const P = O.getValidate();
        P || U({}, "validate_fail", !1);
        const $ = "geetestvalidatecb_".concat(R());
        let W = "https://security.weibo.com/captcha/gt?key=".concat(_.geetestKey);
        W += "&lot_number=".concat(P.lot_number), W += "&captcha_output=".concat(P.captcha_output), W += "&pass_token=".concat(P.pass_token), W += "&gen_time=".concat(P.gen_time), W += "&callback=".concat($), e[$] = function(X) {
          X.retcode == 1e5 ? U(X.data, X.msg, !0) : U(X.data, X.msg, !1)
        }, Oe(W, X => {
          X && U({}, "request_err", !1)
        })
      })
    })
  };
  var Oe = function(_, U) {
    const L = t.createElement("script");
    L.src = _, L.charset = "UTF-8", L.async = !0, L.onerror = function() {
      U(!0)
    }, U(!1), t.head.appendChild(L)
  };
  return e.gtInit = Fe, {
    gtInit: Fe
  }
})(window);
const h0 = Hu(Zu);
h0.use(f0).use(d0).mount("#app");
export {
  g0 as __vite_legacy_guard
};
