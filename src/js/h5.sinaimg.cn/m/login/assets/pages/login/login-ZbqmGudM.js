var pe = Object.defineProperty;
var ge = (i, e, t) => e in i ? pe(i, e, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: t
}) : i[e] = t;
var qt = (i, e, t) => (ge(i, typeof e != "symbol" ? e + "" : e, t), t);
import {
  d as Q,
  c as E,
  a as p,
  o as S,
  b as Xt,
  r as Lt,
  e as $t,
  u as te,
  f as N,
  g as ee,
  h as re,
  i as ie,
  j as G,
  k as V,
  n as O,
  t as it,
  w as W,
  l as ne,
  m as ve,
  p as me,
  q as bt,
  F as wt,
  s as ye,
  v as Vt,
  x as kt,
  y as ht,
  z as Dt,
  A as be,
  B as we,
  C as xe,
  D as Se,
  E as Te
} from "../../useRoute-Mc4PELCL.js";

function $i() {
  import.meta.url, import("_").catch(() => 1), async function*() {}().next()
}
const Ee = {
    class: "absolute top-10 left-6 items-center md:inline-flex md:top-7"
  },
  ke = ["src"],
  De = Q({
    __name: "Logo",
    props: {
      src: {
        type: String,
        default: ""
      }
    },
    setup(i) {
      return (e, t) => (S(), E("div", Ee, [p("img", {
        class: "h-4.5",
        src: i.src
      }, null, 8, ke)]))
    }
  }),
  _e = {
    class: "absolute inset-0 flex items-start justify-center md:items-center"
  },
  Re = {
    class: "w-full min-h-screen bg-card md:relative md:w-182.5 md:h-125 md:min-h-0 md:rounded-lg md:shadow-sm dark:bg-carddark"
  },
  Be = Q({
    __name: "Frame",
    props: {
      iconUrl: {
        type: String,
        default: ""
      }
    },
    setup(i) {
      return (e, t) => (S(), E("div", _e, [p("div", Re, [Xt(De, {
        src: i.iconUrl
      }, null, 8, ["src"]), Lt(e.$slots, "default")])]))
    }
  });
var Ce = "0123456789abcdefghijklmnopqrstuvwxyz";

function U(i) {
  return Ce.charAt(i)
}

function Ae(i, e) {
  return i & e
}

function ct(i, e) {
  return i | e
}

function Ft(i, e) {
  return i ^ e
}

function Ht(i, e) {
  return i & ~e
}

function Ve(i) {
  if (i == 0) return -1;
  var e = 0;
  return i & 65535 || (i >>= 16, e += 16), i & 255 || (i >>= 8, e += 8), i & 15 || (i >>= 4, e += 4), i & 3 || (i >>= 2, e += 2), i & 1 || ++e, e
}

function Ie(i) {
  for (var e = 0; i != 0;) i &= i - 1, ++e;
  return e
}
var et = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  se = "=";

function xt(i) {
  var e, t, r = "";
  for (e = 0; e + 3 <= i.length; e += 3) t = parseInt(i.substring(e, e + 3), 16), r += et.charAt(t >> 6) + et.charAt(t & 63);
  for (e + 1 == i.length ? (t = parseInt(i.substring(e, e + 1), 16), r += et.charAt(t << 2)) : e + 2 == i.length && (t = parseInt(i.substring(e, e + 2), 16), r += et.charAt(t >> 2) + et.charAt((t & 3) << 4));
    (r.length & 3) > 0;) r += se;
  return r
}

function Ut(i) {
  var e = "",
    t, r = 0,
    n = 0;
  for (t = 0; t < i.length && i.charAt(t) != se; ++t) {
    var s = et.indexOf(i.charAt(t));
    s < 0 || (r == 0 ? (e += U(s >> 2), n = s & 3, r = 1) : r == 1 ? (e += U(n << 2 | s >> 4), n = s & 15, r = 2) : r == 2 ? (e += U(n), e += U(s >> 2), n = s & 3, r = 3) : (e += U(n << 2 | s >> 4), e += U(s & 15), r = 0))
  }
  return r == 1 && (e += U(n << 2)), e
}
var J, Oe = {
    decode: function(i) {
      var e;
      if (J === void 0) {
        var t = "0123456789ABCDEF",
          r = " \f\n\r	 \u2028\u2029";
        for (J = {}, e = 0; e < 16; ++e) J[t.charAt(e)] = e;
        for (t = t.toLowerCase(), e = 10; e < 16; ++e) J[t.charAt(e)] = e;
        for (e = 0; e < r.length; ++e) J[r.charAt(e)] = -1
      }
      var n = [],
        s = 0,
        a = 0;
      for (e = 0; e < i.length; ++e) {
        var o = i.charAt(e);
        if (o == "=") break;
        if (o = J[o], o != -1) {
          if (o === void 0) throw new Error("Illegal character at offset " + e);
          s |= o, ++a >= 2 ? (n[n.length] = s, s = 0, a = 0) : s <<= 4
        }
      }
      if (a) throw new Error("Hex encoding incomplete: 4 bits missing");
      return n
    }
  },
  Z, It = {
    decode: function(i) {
      var e;
      if (Z === void 0) {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          r = "= \f\n\r	 \u2028\u2029";
        for (Z = Object.create(null), e = 0; e < 64; ++e) Z[t.charAt(e)] = e;
        for (Z["-"] = 62, Z._ = 63, e = 0; e < r.length; ++e) Z[r.charAt(e)] = -1
      }
      var n = [],
        s = 0,
        a = 0;
      for (e = 0; e < i.length; ++e) {
        var o = i.charAt(e);
        if (o == "=") break;
        if (o = Z[o], o != -1) {
          if (o === void 0) throw new Error("Illegal character at offset " + e);
          s |= o, ++a >= 4 ? (n[n.length] = s >> 16, n[n.length] = s >> 8 & 255, n[n.length] = s & 255, s = 0, a = 0) : s <<= 6
        }
      }
      switch (a) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          n[n.length] = s >> 10;
          break;
        case 3:
          n[n.length] = s >> 16, n[n.length] = s >> 8 & 255;
          break
      }
      return n
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(i) {
      var e = It.re.exec(i);
      if (e)
        if (e[1]) i = e[1];
        else if (e[2]) i = e[2];
      else throw new Error("RegExp out of sync");
      return It.decode(i)
    }
  },
  Y = 1e13,
  at = function() {
    function i(e) {
      this.buf = [+e || 0]
    }
    return i.prototype.mulAdd = function(e, t) {
      var r = this.buf,
        n = r.length,
        s, a;
      for (s = 0; s < n; ++s) a = r[s] * e + t, a < Y ? t = 0 : (t = 0 | a / Y, a -= t * Y), r[s] = a;
      t > 0 && (r[s] = t)
    }, i.prototype.sub = function(e) {
      var t = this.buf,
        r = t.length,
        n, s;
      for (n = 0; n < r; ++n) s = t[n] - e, s < 0 ? (s += Y, e = 1) : e = 0, t[n] = s;
      for (; t[t.length - 1] === 0;) t.pop()
    }, i.prototype.toString = function(e) {
      if ((e || 10) != 10) throw new Error("only base 10 is supported");
      for (var t = this.buf, r = t[t.length - 1].toString(), n = t.length - 2; n >= 0; --n) r += (Y + t[n]).toString().substring(1);
      return r
    }, i.prototype.valueOf = function() {
      for (var e = this.buf, t = 0, r = e.length - 1; r >= 0; --r) t = t * Y + e[r];
      return t
    }, i.prototype.simplify = function() {
      var e = this.buf;
      return e.length == 1 ? e[0] : this
    }, i
  }(),
  oe = "…",
  Me = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
  Ne = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function nt(i, e) {
  return i.length > e && (i = i.substring(0, e) + oe), i
}
var _t = function() {
    function i(e, t) {
      this.hexDigits = "0123456789ABCDEF", e instanceof i ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = t)
    }
    return i.prototype.get = function(e) {
      if (e === void 0 && (e = this.pos++), e >= this.enc.length) throw new Error("Requesting byte offset ".concat(e, " on a stream of length ").concat(this.enc.length));
      return typeof this.enc == "string" ? this.enc.charCodeAt(e) : this.enc[e]
    }, i.prototype.hexByte = function(e) {
      return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(e & 15)
    }, i.prototype.hexDump = function(e, t, r) {
      for (var n = "", s = e; s < t; ++s)
        if (n += this.hexByte(this.get(s)), r !== !0) switch (s & 15) {
          case 7:
            n += "  ";
            break;
          case 15:
            n += "\n";
            break;
          default:
            n += " "
        }
      return n
    }, i.prototype.isASCII = function(e, t) {
      for (var r = e; r < t; ++r) {
        var n = this.get(r);
        if (n < 32 || n > 176) return !1
      }
      return !0
    }, i.prototype.parseStringISO = function(e, t) {
      for (var r = "", n = e; n < t; ++n) r += String.fromCharCode(this.get(n));
      return r
    }, i.prototype.parseStringUTF = function(e, t) {
      for (var r = "", n = e; n < t;) {
        var s = this.get(n++);
        s < 128 ? r += String.fromCharCode(s) : s > 191 && s < 224 ? r += String.fromCharCode((s & 31) << 6 | this.get(n++) & 63) : r += String.fromCharCode((s & 15) << 12 | (this.get(n++) & 63) << 6 | this.get(n++) & 63)
      }
      return r
    }, i.prototype.parseStringBMP = function(e, t) {
      for (var r = "", n, s, a = e; a < t;) n = this.get(a++), s = this.get(a++), r += String.fromCharCode(n << 8 | s);
      return r
    }, i.prototype.parseTime = function(e, t, r) {
      var n = this.parseStringISO(e, t),
        s = (r ? Me : Ne).exec(n);
      return s ? (r && (s[1] = +s[1], s[1] += +s[1] < 70 ? 2e3 : 1900), n = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4], s[5] && (n += ":" + s[5], s[6] && (n += ":" + s[6], s[7] && (n += "." + s[7]))), s[8] && (n += " UTC", s[8] != "Z" && (n += s[8], s[9] && (n += ":" + s[9]))), n) : "Unrecognized time: " + n
    }, i.prototype.parseInteger = function(e, t) {
      for (var r = this.get(e), n = r > 127, s = n ? 255 : 0, a, o = ""; r == s && ++e < t;) r = this.get(e);
      if (a = t - e, a === 0) return n ? -1 : 0;
      if (a > 4) {
        for (o = r, a <<= 3; !((+o ^ s) & 128);) o = +o << 1, --a;
        o = "(" + a + " bit)\n"
      }
      n && (r = r - 256);
      for (var u = new at(r), h = e + 1; h < t; ++h) u.mulAdd(256, this.get(h));
      return o + u.toString()
    }, i.prototype.parseBitString = function(e, t, r) {
      for (var n = this.get(e), s = (t - e - 1 << 3) - n, a = "(" + s + " bit)\n", o = "", u = e + 1; u < t; ++u) {
        for (var h = this.get(u), f = u == t - 1 ? n : 0, v = 7; v >= f; --v) o += h >> v & 1 ? "1" : "0";
        if (o.length > r) return a + nt(o, r)
      }
      return a + o
    }, i.prototype.parseOctetString = function(e, t, r) {
      if (this.isASCII(e, t)) return nt(this.parseStringISO(e, t), r);
      var n = t - e,
        s = "(" + n + " byte)\n";
      r /= 2, n > r && (t = e + r);
      for (var a = e; a < t; ++a) s += this.hexByte(this.get(a));
      return n > r && (s += oe), s
    }, i.prototype.parseOID = function(e, t, r) {
      for (var n = "", s = new at, a = 0, o = e; o < t; ++o) {
        var u = this.get(o);
        if (s.mulAdd(128, u & 127), a += 7, !(u & 128)) {
          if (n === "")
            if (s = s.simplify(), s instanceof at) s.sub(80), n = "2." + s.toString();
            else {
              var h = s < 80 ? s < 40 ? 0 : 1 : 2;
              n = h + "." + (s - h * 40)
            }
          else n += "." + s.toString();
          if (n.length > r) return nt(n, r);
          s = new at, a = 0
        }
      }
      return a > 0 && (n += ".incomplete"), n
    }, i
  }(),
  Le = function() {
    function i(e, t, r, n, s) {
      if (!(n instanceof jt)) throw new Error("Invalid tag value.");
      this.stream = e, this.header = t, this.length = r, this.tag = n, this.sub = s
    }
    return i.prototype.typeName = function() {
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
    }, i.prototype.content = function(e) {
      if (this.tag === void 0) return null;
      e === void 0 && (e = 1 / 0);
      var t = this.posContent(),
        r = Math.abs(this.length);
      if (!this.tag.isUniversal()) return this.sub !== null ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + r, e);
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(t) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(t, t + r);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + r, e);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + r, e);
        case 6:
          return this.stream.parseOID(t, t + r, e);
        case 16:
        case 17:
          return this.sub !== null ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return nt(this.stream.parseStringUTF(t, t + r), e);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return nt(this.stream.parseStringISO(t, t + r), e);
        case 30:
          return nt(this.stream.parseStringBMP(t, t + r), e);
        case 23:
        case 24:
          return this.stream.parseTime(t, t + r, this.tag.tagNumber == 23)
      }
      return null
    }, i.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]"
    }, i.prototype.toPrettyString = function(e) {
      e === void 0 && (e = "");
      var t = e + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (t += "+"), t += this.length, this.tag.tagConstructed ? t += " (constructed)" : this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null && (t += " (encapsulates)"), t += "\n", this.sub !== null) {
        e += "  ";
        for (var r = 0, n = this.sub.length; r < n; ++r) t += this.sub[r].toPrettyString(e)
      }
      return t
    }, i.prototype.posStart = function() {
      return this.stream.pos
    }, i.prototype.posContent = function() {
      return this.stream.pos + this.header
    }, i.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length)
    }, i.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    }, i.decodeLength = function(e) {
      var t = e.get(),
        r = t & 127;
      if (r == t) return r;
      if (r > 6) throw new Error("Length over 48 bits not supported at position " + (e.pos - 1));
      if (r === 0) return null;
      t = 0;
      for (var n = 0; n < r; ++n) t = t * 256 + e.get();
      return t
    }, i.prototype.getHexStringValue = function() {
      var e = this.toHexString(),
        t = this.header * 2,
        r = this.length * 2;
      return e.substr(t, r)
    }, i.decode = function(e) {
      var t;
      e instanceof _t ? t = e : t = new _t(e, 0);
      var r = new _t(t),
        n = new jt(t),
        s = i.decodeLength(t),
        a = t.pos,
        o = a - r.pos,
        u = null,
        h = function() {
          var v = [];
          if (s !== null) {
            for (var d = a + s; t.pos < d;) v[v.length] = i.decode(t);
            if (t.pos != d) throw new Error("Content size is not correct for container starting at offset " + a)
          } else try {
            for (;;) {
              var g = i.decode(t);
              if (g.tag.isEOC()) break;
              v[v.length] = g
            }
            s = a - t.pos
          } catch (m) {
            throw new Error("Exception while decoding undefined length content: " + m)
          }
          return v
        };
      if (n.tagConstructed) u = h();
      else if (n.isUniversal() && (n.tagNumber == 3 || n.tagNumber == 4)) try {
        if (n.tagNumber == 3 && t.get() != 0) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
        u = h();
        for (var f = 0; f < u.length; ++f)
          if (u[f].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
      } catch (v) {
        u = null
      }
      if (u === null) {
        if (s === null) throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
        t.pos = a + Math.abs(s)
      }
      return new i(r, o, s, n, u)
    }, i
  }(),
  jt = function() {
    function i(e) {
      var t = e.get();
      if (this.tagClass = t >> 6, this.tagConstructed = (t & 32) !== 0, this.tagNumber = t & 31, this.tagNumber == 31) {
        var r = new at;
        do t = e.get(), r.mulAdd(128, t & 127); while (t & 128);
        this.tagNumber = r.simplify()
      }
    }
    return i.prototype.isUniversal = function() {
      return this.tagClass === 0
    }, i.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0
    }, i
  }(),
  z, Pe = 0xdeadbeefcafe,
  Kt = (Pe & 16777215) == 15715070,
  I = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
  qe = (1 << 26) / I[I.length - 1],
  b = function() {
    function i(e, t, r) {
      e != null && (typeof e == "number" ? this.fromNumber(e, t, r) : t == null && typeof e != "string" ? this.fromString(e, 256) : this.fromString(e, t))
    }
    return i.prototype.toString = function(e) {
      if (this.s < 0) return "-" + this.negate().toString(e);
      var t;
      if (e == 16) t = 4;
      else if (e == 8) t = 3;
      else if (e == 2) t = 1;
      else if (e == 32) t = 5;
      else if (e == 4) t = 2;
      else return this.toRadix(e);
      var r = (1 << t) - 1,
        n, s = !1,
        a = "",
        o = this.t,
        u = this.DB - o * this.DB % t;
      if (o-- > 0)
        for (u < this.DB && (n = this[o] >> u) > 0 && (s = !0, a = U(n)); o >= 0;) u < t ? (n = (this[o] & (1 << u) - 1) << t - u, n |= this[--o] >> (u += this.DB - t)) : (n = this[o] >> (u -= t) & r, u <= 0 && (u += this.DB, --o)), n > 0 && (s = !0), s && (a += U(n));
      return s ? a : "0"
    }, i.prototype.negate = function() {
      var e = w();
      return i.ZERO.subTo(this, e), e
    }, i.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this
    }, i.prototype.compareTo = function(e) {
      var t = this.s - e.s;
      if (t != 0) return t;
      var r = this.t;
      if (t = r - e.t, t != 0) return this.s < 0 ? -t : t;
      for (; --r >= 0;)
        if ((t = this[r] - e[r]) != 0) return t;
      return 0
    }, i.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + ft(this[this.t - 1] ^ this.s & this.DM)
    }, i.prototype.mod = function(e) {
      var t = w();
      return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(i.ZERO) > 0 && e.subTo(t, t), t
    }, i.prototype.modPowInt = function(e, t) {
      var r;
      return e < 256 || t.isEven() ? r = new zt(t) : r = new Zt(t), this.exp(e, r)
    }, i.prototype.clone = function() {
      var e = w();
      return this.copyTo(e), e
    }, i.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1) return this[0] - this.DV;
        if (this.t == 0) return -1
      } else {
        if (this.t == 1) return this[0];
        if (this.t == 0) return 0
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }, i.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24
    }, i.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16
    }, i.prototype.signum = function() {
      return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1
    }, i.prototype.toByteArray = function() {
      var e = this.t,
        t = [];
      t[0] = this.s;
      var r = this.DB - e * this.DB % 8,
        n, s = 0;
      if (e-- > 0)
        for (r < this.DB && (n = this[e] >> r) != (this.s & this.DM) >> r && (t[s++] = n | this.s << this.DB - r); e >= 0;) r < 8 ? (n = (this[e] & (1 << r) - 1) << 8 - r, n |= this[--e] >> (r += this.DB - 8)) : (n = this[e] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --e)), n & 128 && (n |= -256), s == 0 && (this.s & 128) != (n & 128) && ++s, (s > 0 || n != this.s) && (t[s++] = n);
      return t
    }, i.prototype.equals = function(e) {
      return this.compareTo(e) == 0
    }, i.prototype.min = function(e) {
      return this.compareTo(e) < 0 ? this : e
    }, i.prototype.max = function(e) {
      return this.compareTo(e) > 0 ? this : e
    }, i.prototype.and = function(e) {
      var t = w();
      return this.bitwiseTo(e, Ae, t), t
    }, i.prototype.or = function(e) {
      var t = w();
      return this.bitwiseTo(e, ct, t), t
    }, i.prototype.xor = function(e) {
      var t = w();
      return this.bitwiseTo(e, Ft, t), t
    }, i.prototype.andNot = function(e) {
      var t = w();
      return this.bitwiseTo(e, Ht, t), t
    }, i.prototype.not = function() {
      for (var e = w(), t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
      return e.t = this.t, e.s = ~this.s, e
    }, i.prototype.shiftLeft = function(e) {
      var t = w();
      return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
    }, i.prototype.shiftRight = function(e) {
      var t = w();
      return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
    }, i.prototype.getLowestSetBit = function() {
      for (var e = 0; e < this.t; ++e)
        if (this[e] != 0) return e * this.DB + Ve(this[e]);
      return this.s < 0 ? this.t * this.DB : -1
    }, i.prototype.bitCount = function() {
      for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r) e += Ie(this[r] ^ t);
      return e
    }, i.prototype.testBit = function(e) {
      var t = Math.floor(e / this.DB);
      return t >= this.t ? this.s != 0 : (this[t] & 1 << e % this.DB) != 0
    }, i.prototype.setBit = function(e) {
      return this.changeBit(e, ct)
    }, i.prototype.clearBit = function(e) {
      return this.changeBit(e, Ht)
    }, i.prototype.flipBit = function(e) {
      return this.changeBit(e, Ft)
    }, i.prototype.add = function(e) {
      var t = w();
      return this.addTo(e, t), t
    }, i.prototype.subtract = function(e) {
      var t = w();
      return this.subTo(e, t), t
    }, i.prototype.multiply = function(e) {
      var t = w();
      return this.multiplyTo(e, t), t
    }, i.prototype.divide = function(e) {
      var t = w();
      return this.divRemTo(e, t, null), t
    }, i.prototype.remainder = function(e) {
      var t = w();
      return this.divRemTo(e, null, t), t
    }, i.prototype.divideAndRemainder = function(e) {
      var t = w(),
        r = w();
      return this.divRemTo(e, t, r), [t, r]
    }, i.prototype.modPow = function(e, t) {
      var r = e.bitLength(),
        n, s = j(1),
        a;
      if (r <= 0) return s;
      r < 18 ? n = 1 : r < 48 ? n = 3 : r < 144 ? n = 4 : r < 768 ? n = 5 : n = 6, r < 8 ? a = new zt(t) : t.isEven() ? a = new Fe(t) : a = new Zt(t);
      var o = [],
        u = 3,
        h = n - 1,
        f = (1 << n) - 1;
      if (o[1] = a.convert(this), n > 1) {
        var v = w();
        for (a.sqrTo(o[1], v); u <= f;) o[u] = w(), a.mulTo(v, o[u - 2], o[u]), u += 2
      }
      var d = e.t - 1,
        g, m = !0,
        k = w(),
        y;
      for (r = ft(e[d]) - 1; d >= 0;) {
        for (r >= h ? g = e[d] >> r - h & f : (g = (e[d] & (1 << r + 1) - 1) << h - r, d > 0 && (g |= e[d - 1] >> this.DB + r - h)), u = n; !(g & 1);) g >>= 1, --u;
        if ((r -= u) < 0 && (r += this.DB, --d), m) o[g].copyTo(s), m = !1;
        else {
          for (; u > 1;) a.sqrTo(s, k), a.sqrTo(k, s), u -= 2;
          u > 0 ? a.sqrTo(s, k) : (y = s, s = k, k = y), a.mulTo(k, o[g], s)
        }
        for (; d >= 0 && !(e[d] & 1 << r);) a.sqrTo(s, k), y = s, s = k, k = y, --r < 0 && (r = this.DB - 1, --d)
      }
      return a.revert(s)
    }, i.prototype.modInverse = function(e) {
      var t = e.isEven();
      if (this.isEven() && t || e.signum() == 0) return i.ZERO;
      for (var r = e.clone(), n = this.clone(), s = j(1), a = j(0), o = j(0), u = j(1); r.signum() != 0;) {
        for (; r.isEven();) r.rShiftTo(1, r), t ? ((!s.isEven() || !a.isEven()) && (s.addTo(this, s), a.subTo(e, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(e, a), a.rShiftTo(1, a);
        for (; n.isEven();) n.rShiftTo(1, n), t ? ((!o.isEven() || !u.isEven()) && (o.addTo(this, o), u.subTo(e, u)), o.rShiftTo(1, o)) : u.isEven() || u.subTo(e, u), u.rShiftTo(1, u);
        r.compareTo(n) >= 0 ? (r.subTo(n, r), t && s.subTo(o, s), a.subTo(u, a)) : (n.subTo(r, n), t && o.subTo(s, o), u.subTo(a, u))
      }
      if (n.compareTo(i.ONE) != 0) return i.ZERO;
      if (u.compareTo(e) >= 0) return u.subtract(e);
      if (u.signum() < 0) u.addTo(e, u);
      else return u;
      return u.signum() < 0 ? u.add(e) : u
    }, i.prototype.pow = function(e) {
      return this.exp(e, new $e)
    }, i.prototype.gcd = function(e) {
      var t = this.s < 0 ? this.negate() : this.clone(),
        r = e.s < 0 ? e.negate() : e.clone();
      if (t.compareTo(r) < 0) {
        var n = t;
        t = r, r = n
      }
      var s = t.getLowestSetBit(),
        a = r.getLowestSetBit();
      if (a < 0) return t;
      for (s < a && (a = s), a > 0 && (t.rShiftTo(a, t), r.rShiftTo(a, r)); t.signum() > 0;)(s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t), (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r));
      return a > 0 && r.lShiftTo(a, r), r
    }, i.prototype.isProbablePrime = function(e) {
      var t, r = this.abs();
      if (r.t == 1 && r[0] <= I[I.length - 1]) {
        for (t = 0; t < I.length; ++t)
          if (r[0] == I[t]) return !0;
        return !1
      }
      if (r.isEven()) return !1;
      for (t = 1; t < I.length;) {
        for (var n = I[t], s = t + 1; s < I.length && n < qe;) n *= I[s++];
        for (n = r.modInt(n); t < s;)
          if (n % I[t++] == 0) return !1
      }
      return r.millerRabin(e)
    }, i.prototype.copyTo = function(e) {
      for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
      e.t = this.t, e.s = this.s
    }, i.prototype.fromInt = function(e) {
      this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
    }, i.prototype.fromString = function(e, t) {
      var r;
      if (t == 16) r = 4;
      else if (t == 8) r = 3;
      else if (t == 256) r = 8;
      else if (t == 2) r = 1;
      else if (t == 32) r = 5;
      else if (t == 4) r = 2;
      else {
        this.fromRadix(e, t);
        return
      }
      this.t = 0, this.s = 0;
      for (var n = e.length, s = !1, a = 0; --n >= 0;) {
        var o = r == 8 ? +e[n] & 255 : Wt(e, n);
        if (o < 0) {
          e.charAt(n) == "-" && (s = !0);
          continue
        }
        s = !1, a == 0 ? this[this.t++] = o : a + r > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - a) - 1) << a, this[this.t++] = o >> this.DB - a) : this[this.t - 1] |= o << a, a += r, a >= this.DB && (a -= this.DB)
      }
      r == 8 && +e[0] & 128 && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && i.ZERO.subTo(this, this)
    }, i.prototype.clamp = function() {
      for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;) --this.t
    }, i.prototype.dlShiftTo = function(e, t) {
      var r;
      for (r = this.t - 1; r >= 0; --r) t[r + e] = this[r];
      for (r = e - 1; r >= 0; --r) t[r] = 0;
      t.t = this.t + e, t.s = this.s
    }, i.prototype.drShiftTo = function(e, t) {
      for (var r = e; r < this.t; ++r) t[r - e] = this[r];
      t.t = Math.max(this.t - e, 0), t.s = this.s
    }, i.prototype.lShiftTo = function(e, t) {
      for (var r = e % this.DB, n = this.DB - r, s = (1 << n) - 1, a = Math.floor(e / this.DB), o = this.s << r & this.DM, u = this.t - 1; u >= 0; --u) t[u + a + 1] = this[u] >> n | o, o = (this[u] & s) << r;
      for (var u = a - 1; u >= 0; --u) t[u] = 0;
      t[a] = o, t.t = this.t + a + 1, t.s = this.s, t.clamp()
    }, i.prototype.rShiftTo = function(e, t) {
      t.s = this.s;
      var r = Math.floor(e / this.DB);
      if (r >= this.t) {
        t.t = 0;
        return
      }
      var n = e % this.DB,
        s = this.DB - n,
        a = (1 << n) - 1;
      t[0] = this[r] >> n;
      for (var o = r + 1; o < this.t; ++o) t[o - r - 1] |= (this[o] & a) << s, t[o - r] = this[o] >> n;
      n > 0 && (t[this.t - r - 1] |= (this.s & a) << s), t.t = this.t - r, t.clamp()
    }, i.prototype.subTo = function(e, t) {
      for (var r = 0, n = 0, s = Math.min(e.t, this.t); r < s;) n += this[r] - e[r], t[r++] = n & this.DM, n >>= this.DB;
      if (e.t < this.t) {
        for (n -= e.s; r < this.t;) n += this[r], t[r++] = n & this.DM, n >>= this.DB;
        n += this.s
      } else {
        for (n += this.s; r < e.t;) n -= e[r], t[r++] = n & this.DM, n >>= this.DB;
        n -= e.s
      }
      t.s = n < 0 ? -1 : 0, n < -1 ? t[r++] = this.DV + n : n > 0 && (t[r++] = n), t.t = r, t.clamp()
    }, i.prototype.multiplyTo = function(e, t) {
      var r = this.abs(),
        n = e.abs(),
        s = r.t;
      for (t.t = s + n.t; --s >= 0;) t[s] = 0;
      for (s = 0; s < n.t; ++s) t[s + r.t] = r.am(0, n[s], t, s, 0, r.t);
      t.s = 0, t.clamp(), this.s != e.s && i.ZERO.subTo(t, t)
    }, i.prototype.squareTo = function(e) {
      for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0;) e[r] = 0;
      for (r = 0; r < t.t - 1; ++r) {
        var n = t.am(r, t[r], e, 2 * r, 0, 1);
        (e[r + t.t] += t.am(r + 1, 2 * t[r], e, 2 * r + 1, n, t.t - r - 1)) >= t.DV && (e[r + t.t] -= t.DV, e[r + t.t + 1] = 1)
      }
      e.t > 0 && (e[e.t - 1] += t.am(r, t[r], e, 2 * r, 0, 1)), e.s = 0, e.clamp()
    }, i.prototype.divRemTo = function(e, t, r) {
      var n = e.abs();
      if (!(n.t <= 0)) {
        var s = this.abs();
        if (s.t < n.t) {
          t != null && t.fromInt(0), r != null && this.copyTo(r);
          return
        }
        r == null && (r = w());
        var a = w(),
          o = this.s,
          u = e.s,
          h = this.DB - ft(n[n.t - 1]);
        h > 0 ? (n.lShiftTo(h, a), s.lShiftTo(h, r)) : (n.copyTo(a), s.copyTo(r));
        var f = a.t,
          v = a[f - 1];
        if (v != 0) {
          var d = v * (1 << this.F1) + (f > 1 ? a[f - 2] >> this.F2 : 0),
            g = this.FV / d,
            m = (1 << this.F1) / d,
            k = 1 << this.F2,
            y = r.t,
            T = y - f,
            _ = t == null ? w() : t;
          for (a.dlShiftTo(T, _), r.compareTo(_) >= 0 && (r[r.t++] = 1, r.subTo(_, r)), i.ONE.dlShiftTo(f, _), _.subTo(a, a); a.t < f;) a[a.t++] = 0;
          for (; --T >= 0;) {
            var M = r[--y] == v ? this.DM : Math.floor(r[y] * g + (r[y - 1] + k) * m);
            if ((r[y] += a.am(0, M, r, T, 0, f)) < M)
              for (a.dlShiftTo(T, _), r.subTo(_, r); r[y] < --M;) r.subTo(_, r)
          }
          t != null && (r.drShiftTo(f, t), o != u && i.ZERO.subTo(t, t)), r.t = f, r.clamp(), h > 0 && r.rShiftTo(h, r), o < 0 && i.ZERO.subTo(r, r)
        }
      }
    }, i.prototype.invDigit = function() {
      if (this.t < 1) return 0;
      var e = this[0];
      if (!(e & 1)) return 0;
      var t = e & 3;
      return t = t * (2 - (e & 15) * t) & 15, t = t * (2 - (e & 255) * t) & 255, t = t * (2 - ((e & 65535) * t & 65535)) & 65535, t = t * (2 - e * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t
    }, i.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }, i.prototype.exp = function(e, t) {
      if (e > 4294967295 || e < 1) return i.ONE;
      var r = w(),
        n = w(),
        s = t.convert(this),
        a = ft(e) - 1;
      for (s.copyTo(r); --a >= 0;)
        if (t.sqrTo(r, n), (e & 1 << a) > 0) t.mulTo(n, s, r);
        else {
          var o = r;
          r = n, n = o
        } return t.revert(r)
    }, i.prototype.chunkSize = function(e) {
      return Math.floor(Math.LN2 * this.DB / Math.log(e))
    }, i.prototype.toRadix = function(e) {
      if (e == null && (e = 10), this.signum() == 0 || e < 2 || e > 36) return "0";
      var t = this.chunkSize(e),
        r = Math.pow(e, t),
        n = j(r),
        s = w(),
        a = w(),
        o = "";
      for (this.divRemTo(n, s, a); s.signum() > 0;) o = (r + a.intValue()).toString(e).substr(1) + o, s.divRemTo(n, s, a);
      return a.intValue().toString(e) + o
    }, i.prototype.fromRadix = function(e, t) {
      this.fromInt(0), t == null && (t = 10);
      for (var r = this.chunkSize(t), n = Math.pow(t, r), s = !1, a = 0, o = 0, u = 0; u < e.length; ++u) {
        var h = Wt(e, u);
        if (h < 0) {
          e.charAt(u) == "-" && this.signum() == 0 && (s = !0);
          continue
        }
        o = t * o + h, ++a >= r && (this.dMultiply(n), this.dAddOffset(o, 0), a = 0, o = 0)
      }
      a > 0 && (this.dMultiply(Math.pow(t, a)), this.dAddOffset(o, 0)), s && i.ZERO.subTo(this, this)
    }, i.prototype.fromNumber = function(e, t, r) {
      if (typeof t == "number")
        if (e < 2) this.fromInt(1);
        else
          for (this.fromNumber(e, r), this.testBit(e - 1) || this.bitwiseTo(i.ONE.shiftLeft(e - 1), ct, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(i.ONE.shiftLeft(e - 1), this);
      else {
        var n = [],
          s = e & 7;
        n.length = (e >> 3) + 1, t.nextBytes(n), s > 0 ? n[0] &= (1 << s) - 1 : n[0] = 0, this.fromString(n, 256)
      }
    }, i.prototype.bitwiseTo = function(e, t, r) {
      var n, s, a = Math.min(e.t, this.t);
      for (n = 0; n < a; ++n) r[n] = t(this[n], e[n]);
      if (e.t < this.t) {
        for (s = e.s & this.DM, n = a; n < this.t; ++n) r[n] = t(this[n], s);
        r.t = this.t
      } else {
        for (s = this.s & this.DM, n = a; n < e.t; ++n) r[n] = t(s, e[n]);
        r.t = e.t
      }
      r.s = t(this.s, e.s), r.clamp()
    }, i.prototype.changeBit = function(e, t) {
      var r = i.ONE.shiftLeft(e);
      return this.bitwiseTo(r, t, r), r
    }, i.prototype.addTo = function(e, t) {
      for (var r = 0, n = 0, s = Math.min(e.t, this.t); r < s;) n += this[r] + e[r], t[r++] = n & this.DM, n >>= this.DB;
      if (e.t < this.t) {
        for (n += e.s; r < this.t;) n += this[r], t[r++] = n & this.DM, n >>= this.DB;
        n += this.s
      } else {
        for (n += this.s; r < e.t;) n += e[r], t[r++] = n & this.DM, n >>= this.DB;
        n += e.s
      }
      t.s = n < 0 ? -1 : 0, n > 0 ? t[r++] = n : n < -1 && (t[r++] = this.DV + n), t.t = r, t.clamp()
    }, i.prototype.dMultiply = function(e) {
      this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
    }, i.prototype.dAddOffset = function(e, t) {
      if (e != 0) {
        for (; this.t <= t;) this[this.t++] = 0;
        for (this[t] += e; this[t] >= this.DV;) this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t]
      }
    }, i.prototype.multiplyLowerTo = function(e, t, r) {
      var n = Math.min(this.t + e.t, t);
      for (r.s = 0, r.t = n; n > 0;) r[--n] = 0;
      for (var s = r.t - this.t; n < s; ++n) r[n + this.t] = this.am(0, e[n], r, n, 0, this.t);
      for (var s = Math.min(e.t, t); n < s; ++n) this.am(0, e[n], r, n, 0, t - n);
      r.clamp()
    }, i.prototype.multiplyUpperTo = function(e, t, r) {
      --t;
      var n = r.t = this.t + e.t - t;
      for (r.s = 0; --n >= 0;) r[n] = 0;
      for (n = Math.max(t - this.t, 0); n < e.t; ++n) r[this.t + n - t] = this.am(t - n, e[n], r, 0, 0, this.t + n - t);
      r.clamp(), r.drShiftTo(1, r)
    }, i.prototype.modInt = function(e) {
      if (e <= 0) return 0;
      var t = this.DV % e,
        r = this.s < 0 ? e - 1 : 0;
      if (this.t > 0)
        if (t == 0) r = this[0] % e;
        else
          for (var n = this.t - 1; n >= 0; --n) r = (t * r + this[n]) % e;
      return r
    }, i.prototype.millerRabin = function(e) {
      var t = this.subtract(i.ONE),
        r = t.getLowestSetBit();
      if (r <= 0) return !1;
      var n = t.shiftRight(r);
      e = e + 1 >> 1, e > I.length && (e = I.length);
      for (var s = w(), a = 0; a < e; ++a) {
        s.fromInt(I[Math.floor(Math.random() * I.length)]);
        var o = s.modPow(n, this);
        if (o.compareTo(i.ONE) != 0 && o.compareTo(t) != 0) {
          for (var u = 1; u++ < r && o.compareTo(t) != 0;)
            if (o = o.modPowInt(2, this), o.compareTo(i.ONE) == 0) return !1;
          if (o.compareTo(t) != 0) return !1
        }
      }
      return !0
    }, i.prototype.square = function() {
      var e = w();
      return this.squareTo(e), e
    }, i.prototype.gcda = function(e, t) {
      var r = this.s < 0 ? this.negate() : this.clone(),
        n = e.s < 0 ? e.negate() : e.clone();
      if (r.compareTo(n) < 0) {
        var s = r;
        r = n, n = s
      }
      var a = r.getLowestSetBit(),
        o = n.getLowestSetBit();
      if (o < 0) {
        t(r);
        return
      }
      a < o && (o = a), o > 0 && (r.rShiftTo(o, r), n.rShiftTo(o, n));
      var u = function() {
        (a = r.getLowestSetBit()) > 0 && r.rShiftTo(a, r), (a = n.getLowestSetBit()) > 0 && n.rShiftTo(a, n), r.compareTo(n) >= 0 ? (r.subTo(n, r), r.rShiftTo(1, r)) : (n.subTo(r, n), n.rShiftTo(1, n)), r.signum() > 0 ? setTimeout(u, 0) : (o > 0 && n.lShiftTo(o, n), setTimeout(function() {
          t(n)
        }, 0))
      };
      setTimeout(u, 10)
    }, i.prototype.fromNumberAsync = function(e, t, r, n) {
      if (typeof t == "number")
        if (e < 2) this.fromInt(1);
        else {
          this.fromNumber(e, r), this.testBit(e - 1) || this.bitwiseTo(i.ONE.shiftLeft(e - 1), ct, this), this.isEven() && this.dAddOffset(1, 0);
          var s = this,
            a = function() {
              s.dAddOffset(2, 0), s.bitLength() > e && s.subTo(i.ONE.shiftLeft(e - 1), s), s.isProbablePrime(t) ? setTimeout(function() {
                n()
              }, 0) : setTimeout(a, 0)
            };
          setTimeout(a, 0)
        }
      else {
        var o = [],
          u = e & 7;
        o.length = (e >> 3) + 1, t.nextBytes(o), u > 0 ? o[0] &= (1 << u) - 1 : o[0] = 0, this.fromString(o, 256)
      }
    }, i
  }(),
  $e = function() {
    function i() {}
    return i.prototype.convert = function(e) {
      return e
    }, i.prototype.revert = function(e) {
      return e
    }, i.prototype.mulTo = function(e, t, r) {
      e.multiplyTo(t, r)
    }, i.prototype.sqrTo = function(e, t) {
      e.squareTo(t)
    }, i
  }(),
  zt = function() {
    function i(e) {
      this.m = e
    }
    return i.prototype.convert = function(e) {
      return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
    }, i.prototype.revert = function(e) {
      return e
    }, i.prototype.reduce = function(e) {
      e.divRemTo(this.m, null, e)
    }, i.prototype.mulTo = function(e, t, r) {
      e.multiplyTo(t, r), this.reduce(r)
    }, i.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, i
  }(),
  Zt = function() {
    function i(e) {
      this.m = e, this.mp = e.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
    }
    return i.prototype.convert = function(e) {
      var t = w();
      return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(b.ZERO) > 0 && this.m.subTo(t, t), t
    }, i.prototype.revert = function(e) {
      var t = w();
      return e.copyTo(t), this.reduce(t), t
    }, i.prototype.reduce = function(e) {
      for (; e.t <= this.mt2;) e[e.t++] = 0;
      for (var t = 0; t < this.m.t; ++t) {
        var r = e[t] & 32767,
          n = r * this.mpl + ((r * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        for (r = t + this.m.t, e[r] += this.m.am(0, n, e, t, 0, this.m.t); e[r] >= e.DV;) e[r] -= e.DV, e[++r]++
      }
      e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
    }, i.prototype.mulTo = function(e, t, r) {
      e.multiplyTo(t, r), this.reduce(r)
    }, i.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, i
  }(),
  Fe = function() {
    function i(e) {
      this.m = e, this.r2 = w(), this.q3 = w(), b.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e)
    }
    return i.prototype.convert = function(e) {
      if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
      if (e.compareTo(this.m) < 0) return e;
      var t = w();
      return e.copyTo(t), this.reduce(t), t
    }, i.prototype.revert = function(e) {
      return e
    }, i.prototype.reduce = function(e) {
      for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;) e.dAddOffset(1, this.m.t + 1);
      for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;) e.subTo(this.m, e)
    }, i.prototype.mulTo = function(e, t, r) {
      e.multiplyTo(t, r), this.reduce(r)
    }, i.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, i
  }();

function w() {
  return new b(null)
}

function R(i, e) {
  return new b(i, e)
}
var Gt = typeof navigator < "u";
Gt && Kt && navigator.appName == "Microsoft Internet Explorer" ? (b.prototype.am = function(e, t, r, n, s, a) {
  for (var o = t & 32767, u = t >> 15; --a >= 0;) {
    var h = this[e] & 32767,
      f = this[e++] >> 15,
      v = u * h + f * o;
    h = o * h + ((v & 32767) << 15) + r[n] + (s & 1073741823), s = (h >>> 30) + (v >>> 15) + u * f + (s >>> 30), r[n++] = h & 1073741823
  }
  return s
}, z = 30) : Gt && Kt && navigator.appName != "Netscape" ? (b.prototype.am = function(e, t, r, n, s, a) {
  for (; --a >= 0;) {
    var o = t * this[e++] + r[n] + s;
    s = Math.floor(o / 67108864), r[n++] = o & 67108863
  }
  return s
}, z = 26) : (b.prototype.am = function(e, t, r, n, s, a) {
  for (var o = t & 16383, u = t >> 14; --a >= 0;) {
    var h = this[e] & 16383,
      f = this[e++] >> 14,
      v = u * h + f * o;
    h = o * h + ((v & 16383) << 14) + r[n] + s, s = (h >> 28) + (v >> 14) + u * f, r[n++] = h & 268435455
  }
  return s
}, z = 28);
b.prototype.DB = z;
b.prototype.DM = (1 << z) - 1;
b.prototype.DV = 1 << z;
var Pt = 52;
b.prototype.FV = Math.pow(2, Pt);
b.prototype.F1 = Pt - z;
b.prototype.F2 = 2 * z - Pt;
var Tt = [],
  ot, q;
ot = 48;
for (q = 0; q <= 9; ++q) Tt[ot++] = q;
ot = 97;
for (q = 10; q < 36; ++q) Tt[ot++] = q;
ot = 65;
for (q = 10; q < 36; ++q) Tt[ot++] = q;

function Wt(i, e) {
  var t = Tt[i.charCodeAt(e)];
  return t == null ? -1 : t
}

function j(i) {
  var e = w();
  return e.fromInt(i), e
}

function ft(i) {
  var e = 1,
    t;
  return (t = i >>> 16) != 0 && (i = t, e += 16), (t = i >> 8) != 0 && (i = t, e += 8), (t = i >> 4) != 0 && (i = t, e += 4), (t = i >> 2) != 0 && (i = t, e += 2), (t = i >> 1) != 0 && (i = t, e += 1), e
}
b.ZERO = j(0);
b.ONE = j(1);
var He = function() {
  function i() {
    this.i = 0, this.j = 0, this.S = []
  }
  return i.prototype.init = function(e) {
    var t, r, n;
    for (t = 0; t < 256; ++t) this.S[t] = t;
    for (r = 0, t = 0; t < 256; ++t) r = r + this.S[t] + e[t % e.length] & 255, n = this.S[t], this.S[t] = this.S[r], this.S[r] = n;
    this.i = 0, this.j = 0
  }, i.prototype.next = function() {
    var e;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[e + this.S[this.i] & 255]
  }, i
}();

function Ue() {
  return new He
}
var ae = 256,
  dt, K = null,
  $;
if (K == null) {
  K = [], $ = 0;
  var pt = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var Rt = new Uint32Array(256);
    for (window.crypto.getRandomValues(Rt), pt = 0; pt < Rt.length; ++pt) K[$++] = Rt[pt] & 255
  }
  var gt = 0,
    vt = function(i) {
      if (gt = gt || 0, gt >= 256 || $ >= ae) {
        window.removeEventListener ? window.removeEventListener("mousemove", vt, !1) : window.detachEvent && window.detachEvent("onmousemove", vt);
        return
      }
      try {
        var e = i.x + i.y;
        K[$++] = e & 255, gt += 1
      } catch (t) {}
    };
  typeof window < "u" && (window.addEventListener ? window.addEventListener("mousemove", vt, !1) : window.attachEvent && window.attachEvent("onmousemove", vt))
}

function je() {
  if (dt == null) {
    for (dt = Ue(); $ < ae;) {
      var i = Math.floor(65536 * Math.random());
      K[$++] = i & 255
    }
    for (dt.init(K), $ = 0; $ < K.length; ++$) K[$] = 0;
    $ = 0
  }
  return dt.next()
}
var Ot = function() {
  function i() {}
  return i.prototype.nextBytes = function(e) {
    for (var t = 0; t < e.length; ++t) e[t] = je()
  }, i
}();

function Ke(i, e) {
  if (e < i.length + 22) return console.error("Message too long for RSA"), null;
  for (var t = e - i.length - 6, r = "", n = 0; n < t; n += 2) r += "ff";
  var s = "0001" + r + "00" + i;
  return R(s, 16)
}

function ze(i, e) {
  if (e < i.length + 11) return console.error("Message too long for RSA"), null;
  for (var t = [], r = i.length - 1; r >= 0 && e > 0;) {
    var n = i.charCodeAt(r--);
    n < 128 ? t[--e] = n : n > 127 && n < 2048 ? (t[--e] = n & 63 | 128, t[--e] = n >> 6 | 192) : (t[--e] = n & 63 | 128, t[--e] = n >> 6 & 63 | 128, t[--e] = n >> 12 | 224)
  }
  t[--e] = 0;
  for (var s = new Ot, a = []; e > 2;) {
    for (a[0] = 0; a[0] == 0;) s.nextBytes(a);
    t[--e] = a[0]
  }
  return t[--e] = 2, t[--e] = 0, new b(t)
}
var Ze = function() {
  function i() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
  }
  return i.prototype.doPublic = function(e) {
    return e.modPowInt(this.e, this.n)
  }, i.prototype.doPrivate = function(e) {
    if (this.p == null || this.q == null) return e.modPow(this.d, this.n);
    for (var t = e.mod(this.p).modPow(this.dmp1, this.p), r = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(r) < 0;) t = t.add(this.p);
    return t.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
  }, i.prototype.setPublic = function(e, t) {
    e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = R(e, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
  }, i.prototype.encrypt = function(e) {
    var t = this.n.bitLength() + 7 >> 3,
      r = ze(e, t);
    if (r == null) return null;
    var n = this.doPublic(r);
    if (n == null) return null;
    for (var s = n.toString(16), a = s.length, o = 0; o < t * 2 - a; o++) s = "0" + s;
    return s
  }, i.prototype.setPrivate = function(e, t, r) {
    e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = R(e, 16), this.e = parseInt(t, 16), this.d = R(r, 16)) : console.error("Invalid RSA private key")
  }, i.prototype.setPrivateEx = function(e, t, r, n, s, a, o, u) {
    e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = R(e, 16), this.e = parseInt(t, 16), this.d = R(r, 16), this.p = R(n, 16), this.q = R(s, 16), this.dmp1 = R(a, 16), this.dmq1 = R(o, 16), this.coeff = R(u, 16)) : console.error("Invalid RSA private key")
  }, i.prototype.generate = function(e, t) {
    var r = new Ot,
      n = e >> 1;
    this.e = parseInt(t, 16);
    for (var s = new b(t, 16);;) {
      for (; this.p = new b(e - n, 1, r), !(this.p.subtract(b.ONE).gcd(s).compareTo(b.ONE) == 0 && this.p.isProbablePrime(10)););
      for (; this.q = new b(n, 1, r), !(this.q.subtract(b.ONE).gcd(s).compareTo(b.ONE) == 0 && this.q.isProbablePrime(10)););
      if (this.p.compareTo(this.q) <= 0) {
        var a = this.p;
        this.p = this.q, this.q = a
      }
      var o = this.p.subtract(b.ONE),
        u = this.q.subtract(b.ONE),
        h = o.multiply(u);
      if (h.gcd(s).compareTo(b.ONE) == 0) {
        this.n = this.p.multiply(this.q), this.d = s.modInverse(h), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(u), this.coeff = this.q.modInverse(this.p);
        break
      }
    }
  }, i.prototype.decrypt = function(e) {
    var t = R(e, 16),
      r = this.doPrivate(t);
    return r == null ? null : Ge(r, this.n.bitLength() + 7 >> 3)
  }, i.prototype.generateAsync = function(e, t, r) {
    var n = new Ot,
      s = e >> 1;
    this.e = parseInt(t, 16);
    var a = new b(t, 16),
      o = this,
      u = function() {
        var h = function() {
            if (o.p.compareTo(o.q) <= 0) {
              var d = o.p;
              o.p = o.q, o.q = d
            }
            var g = o.p.subtract(b.ONE),
              m = o.q.subtract(b.ONE),
              k = g.multiply(m);
            k.gcd(a).compareTo(b.ONE) == 0 ? (o.n = o.p.multiply(o.q), o.d = a.modInverse(k), o.dmp1 = o.d.mod(g), o.dmq1 = o.d.mod(m), o.coeff = o.q.modInverse(o.p), setTimeout(function() {
              r()
            }, 0)) : setTimeout(u, 0)
          },
          f = function() {
            o.q = w(), o.q.fromNumberAsync(s, 1, n, function() {
              o.q.subtract(b.ONE).gcda(a, function(d) {
                d.compareTo(b.ONE) == 0 && o.q.isProbablePrime(10) ? setTimeout(h, 0) : setTimeout(f, 0)
              })
            })
          },
          v = function() {
            o.p = w(), o.p.fromNumberAsync(e - s, 1, n, function() {
              o.p.subtract(b.ONE).gcda(a, function(d) {
                d.compareTo(b.ONE) == 0 && o.p.isProbablePrime(10) ? setTimeout(f, 0) : setTimeout(v, 0)
              })
            })
          };
        setTimeout(v, 0)
      };
    setTimeout(u, 0)
  }, i.prototype.sign = function(e, t, r) {
    var n = We(r),
      s = n + t(e).toString(),
      a = Ke(s, this.n.bitLength() / 4);
    if (a == null) return null;
    var o = this.doPrivate(a);
    if (o == null) return null;
    var u = o.toString(16);
    return u.length & 1 ? "0" + u : u
  }, i.prototype.verify = function(e, t, r) {
    var n = R(t, 16),
      s = this.doPublic(n);
    if (s == null) return null;
    var a = s.toString(16).replace(/^1f+00/, ""),
      o = Qe(a);
    return o == r(e).toString()
  }, i
}();

function Ge(i, e) {
  for (var t = i.toByteArray(), r = 0; r < t.length && t[r] == 0;) ++r;
  if (t.length - r != e - 1 || t[r] != 2) return null;
  for (++r; t[r] != 0;)
    if (++r >= t.length) return null;
  for (var n = ""; ++r < t.length;) {
    var s = t[r] & 255;
    s < 128 ? n += String.fromCharCode(s) : s > 191 && s < 224 ? (n += String.fromCharCode((s & 31) << 6 | t[r + 1] & 63), ++r) : (n += String.fromCharCode((s & 15) << 12 | (t[r + 1] & 63) << 6 | t[r + 2] & 63), r += 2)
  }
  return n
}
var mt = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};

function We(i) {
  return mt[i] || ""
}

function Qe(i) {
  for (var e in mt)
    if (mt.hasOwnProperty(e)) {
      var t = mt[e],
        r = t.length;
      if (i.substr(0, r) == t) return i.substr(r)
    } return i
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var B = {};
B.lang = {
  extend: function(i, e, t) {
    if (!e || !i) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var r = function() {};
    if (r.prototype = e.prototype, i.prototype = new r, i.prototype.constructor = i, i.superclass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e), t) {
      var n;
      for (n in t) i.prototype[n] = t[n];
      var s = function() {},
        a = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (s = function(o, u) {
          for (n = 0; n < a.length; n = n + 1) {
            var h = a[n],
              f = u[h];
            typeof f == "function" && f != Object.prototype[h] && (o[h] = f)
          }
        })
      } catch (o) {}
      s(i.prototype, t)
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
var l = {};
(typeof l.asn1 > "u" || !l.asn1) && (l.asn1 = {});
l.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(i) {
    var e = i.toString(16);
    return e.length % 2 == 1 && (e = "0" + e), e
  }, this.bigIntToMinTwosComplementsHex = function(i) {
    var e = i.toString(16);
    if (e.substr(0, 1) != "-") e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
    else {
      var t = e.substr(1),
        r = t.length;
      r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
      for (var n = "", s = 0; s < r; s++) n += "f";
      var a = new b(n, 16),
        o = a.xor(i).add(b.ONE);
      e = o.toString(16).replace(/^-/, "")
    }
    return e
  }, this.getPEMStringFromHex = function(i, e) {
    return hextopem(i, e)
  }, this.newObject = function(i) {
    var e = l,
      t = e.asn1,
      r = t.DERBoolean,
      n = t.DERInteger,
      s = t.DERBitString,
      a = t.DEROctetString,
      o = t.DERNull,
      u = t.DERObjectIdentifier,
      h = t.DEREnumerated,
      f = t.DERUTF8String,
      v = t.DERNumericString,
      d = t.DERPrintableString,
      g = t.DERTeletexString,
      m = t.DERIA5String,
      k = t.DERUTCTime,
      y = t.DERGeneralizedTime,
      T = t.DERSequence,
      _ = t.DERSet,
      M = t.DERTaggedObject,
      F = t.ASN1Util.newObject,
      x = Object.keys(i);
    if (x.length != 1) throw "key of param shall be only one.";
    var c = x[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + c + ":") == -1) throw "undefined key: " + c;
    if (c == "bool") return new r(i[c]);
    if (c == "int") return new n(i[c]);
    if (c == "bitstr") return new s(i[c]);
    if (c == "octstr") return new a(i[c]);
    if (c == "null") return new o(i[c]);
    if (c == "oid") return new u(i[c]);
    if (c == "enum") return new h(i[c]);
    if (c == "utf8str") return new f(i[c]);
    if (c == "numstr") return new v(i[c]);
    if (c == "prnstr") return new d(i[c]);
    if (c == "telstr") return new g(i[c]);
    if (c == "ia5str") return new m(i[c]);
    if (c == "utctime") return new k(i[c]);
    if (c == "gentime") return new y(i[c]);
    if (c == "seq") {
      for (var D = i[c], H = [], L = 0; L < D.length; L++) {
        var C = F(D[L]);
        H.push(C)
      }
      return new T({
        array: H
      })
    }
    if (c == "set") {
      for (var D = i[c], H = [], L = 0; L < D.length; L++) {
        var C = F(D[L]);
        H.push(C)
      }
      return new _({
        array: H
      })
    }
    if (c == "tag") {
      var A = i[c];
      if (Object.prototype.toString.call(A) === "[object Array]" && A.length == 3) {
        var lt = F(A[2]);
        return new M({
          tag: A[0],
          explicit: A[1],
          obj: lt
        })
      } else {
        var P = {};
        if (A.explicit !== void 0 && (P.explicit = A.explicit), A.tag !== void 0 && (P.tag = A.tag), A.obj === void 0) throw "obj shall be specified for 'tag'.";
        return P.obj = F(A.obj), new M(P)
      }
    }
  }, this.jsonToASN1HEX = function(i) {
    var e = this.newObject(i);
    return e.getEncodedHex()
  }
};
l.asn1.ASN1Util.oidHexToInt = function(i) {
  for (var n = "", e = parseInt(i.substr(0, 2), 16), t = Math.floor(e / 40), r = e % 40, n = t + "." + r, s = "", a = 2; a < i.length; a += 2) {
    var o = parseInt(i.substr(a, 2), 16),
      u = ("00000000" + o.toString(2)).slice(-8);
    if (s = s + u.substr(1, 7), u.substr(0, 1) == "0") {
      var h = new b(s, 2);
      n = n + "." + h.toString(10), s = ""
    }
  }
  return n
};
l.asn1.ASN1Util.oidIntToHex = function(i) {
  var e = function(o) {
      var u = o.toString(16);
      return u.length == 1 && (u = "0" + u), u
    },
    t = function(o) {
      var u = "",
        h = new b(o, 10),
        f = h.toString(2),
        v = 7 - f.length % 7;
      v == 7 && (v = 0);
      for (var d = "", g = 0; g < v; g++) d += "0";
      f = d + f;
      for (var g = 0; g < f.length - 1; g += 7) {
        var m = f.substr(g, 7);
        g != f.length - 7 && (m = "1" + m), u += e(parseInt(m, 2))
      }
      return u
    };
  if (!i.match(/^[0-9.]+$/)) throw "malformed oid string: " + i;
  var r = "",
    n = i.split("."),
    s = parseInt(n[0]) * 40 + parseInt(n[1]);
  r += e(s), n.splice(0, 2);
  for (var a = 0; a < n.length; a++) r += t(n[a]);
  return r
};
l.asn1.ASN1Object = function() {
  var i = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV > "u" || this.hV == null) throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + i.length + ",v=" + this.hV;
    var e = this.hV.length / 2,
      t = e.toString(16);
    if (t.length % 2 == 1 && (t = "0" + t), e < 128) return t;
    var r = t.length / 2;
    if (r > 15) throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
    var n = 128 + r;
    return n.toString(16) + t
  }, this.getEncodedHex = function() {
    return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV
  }, this.getFreshValueHex = function() {
    return ""
  }
};
l.asn1.DERAbstractString = function(i) {
  l.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s
  }, this.setString = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = e, this.hV = stohex(this.s)
  }, this.setStringHex = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof i < "u" && (typeof i == "string" ? this.setString(i) : typeof i.str < "u" ? this.setString(i.str) : typeof i.hex < "u" && this.setStringHex(i.hex))
};
B.lang.extend(l.asn1.DERAbstractString, l.asn1.ASN1Object);
l.asn1.DERAbstractTime = function(i) {
  l.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(e) {
    utc = e.getTime() + e.getTimezoneOffset() * 6e4;
    var t = new Date(utc);
    return t
  }, this.formatDate = function(e, t, r) {
    var n = this.zeroPadding,
      s = this.localDateToUTC(e),
      a = String(s.getFullYear());
    t == "utc" && (a = a.substr(2, 2));
    var o = n(String(s.getMonth() + 1), 2),
      u = n(String(s.getDate()), 2),
      h = n(String(s.getHours()), 2),
      f = n(String(s.getMinutes()), 2),
      v = n(String(s.getSeconds()), 2),
      d = a + o + u + h + f + v;
    if (r === !0) {
      var g = s.getMilliseconds();
      if (g != 0) {
        var m = n(String(g), 3);
        m = m.replace(/[0]+$/, ""), d = d + "." + m
      }
    }
    return d + "Z"
  }, this.zeroPadding = function(e, t) {
    return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
  }, this.getString = function() {
    return this.s
  }, this.setString = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = e, this.hV = stohex(e)
  }, this.setByDateValue = function(e, t, r, n, s, a) {
    var o = new Date(Date.UTC(e, t - 1, r, n, s, a, 0));
    this.setByDate(o)
  }, this.getFreshValueHex = function() {
    return this.hV
  }
};
B.lang.extend(l.asn1.DERAbstractTime, l.asn1.ASN1Object);
l.asn1.DERAbstractStructured = function(i) {
  l.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(e) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = e
  }, this.appendASN1Object = function(e) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(e)
  }, this.asn1Array = new Array, typeof i < "u" && typeof i.array < "u" && (this.asn1Array = i.array)
};
B.lang.extend(l.asn1.DERAbstractStructured, l.asn1.ASN1Object);
l.asn1.DERBoolean = function() {
  l.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
};
B.lang.extend(l.asn1.DERBoolean, l.asn1.ASN1Object);
l.asn1.DERInteger = function(i) {
  l.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = l.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
  }, this.setByInteger = function(e) {
    var t = new b(String(e), 10);
    this.setByBigInteger(t)
  }, this.setValueHex = function(e) {
    this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof i < "u" && (typeof i.bigint < "u" ? this.setByBigInteger(i.bigint) : typeof i.int < "u" ? this.setByInteger(i.int) : typeof i == "number" ? this.setByInteger(i) : typeof i.hex < "u" && this.setValueHex(i.hex))
};
B.lang.extend(l.asn1.DERInteger, l.asn1.ASN1Object);
l.asn1.DERBitString = function(i) {
  if (i !== void 0 && typeof i.obj < "u") {
    var e = l.asn1.ASN1Util.newObject(i.obj);
    i.hex = "00" + e.getEncodedHex()
  }
  l.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = t
  }, this.setUnusedBitsAndHexValue = function(t, r) {
    if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
    var n = "0" + t;
    this.hTLV = null, this.isModified = !0, this.hV = n + r
  }, this.setByBinaryString = function(t) {
    t = t.replace(/0+$/, "");
    var r = 8 - t.length % 8;
    r == 8 && (r = 0);
    for (var n = 0; n <= r; n++) t += "0";
    for (var s = "", n = 0; n < t.length - 1; n += 8) {
      var a = t.substr(n, 8),
        o = parseInt(a, 2).toString(16);
      o.length == 1 && (o = "0" + o), s += o
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + r + s
  }, this.setByBooleanArray = function(t) {
    for (var r = "", n = 0; n < t.length; n++) t[n] == !0 ? r += "1" : r += "0";
    this.setByBinaryString(r)
  }, this.newFalseArray = function(t) {
    for (var r = new Array(t), n = 0; n < t; n++) r[n] = !1;
    return r
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof i < "u" && (typeof i == "string" && i.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(i) : typeof i.hex < "u" ? this.setHexValueIncludingUnusedBits(i.hex) : typeof i.bin < "u" ? this.setByBinaryString(i.bin) : typeof i.array < "u" && this.setByBooleanArray(i.array))
};
B.lang.extend(l.asn1.DERBitString, l.asn1.ASN1Object);
l.asn1.DEROctetString = function(i) {
  if (i !== void 0 && typeof i.obj < "u") {
    var e = l.asn1.ASN1Util.newObject(i.obj);
    i.hex = e.getEncodedHex()
  }
  l.asn1.DEROctetString.superclass.constructor.call(this, i), this.hT = "04"
};
B.lang.extend(l.asn1.DEROctetString, l.asn1.DERAbstractString);
l.asn1.DERNull = function() {
  l.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
};
B.lang.extend(l.asn1.DERNull, l.asn1.ASN1Object);
l.asn1.DERObjectIdentifier = function(i) {
  var e = function(r) {
      var n = r.toString(16);
      return n.length == 1 && (n = "0" + n), n
    },
    t = function(r) {
      var n = "",
        s = new b(r, 10),
        a = s.toString(2),
        o = 7 - a.length % 7;
      o == 7 && (o = 0);
      for (var u = "", h = 0; h < o; h++) u += "0";
      a = u + a;
      for (var h = 0; h < a.length - 1; h += 7) {
        var f = a.substr(h, 7);
        h != a.length - 7 && (f = "1" + f), n += e(parseInt(f, 2))
      }
      return n
    };
  l.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(r) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r
  }, this.setValueOidString = function(r) {
    if (!r.match(/^[0-9.]+$/)) throw "malformed oid string: " + r;
    var n = "",
      s = r.split("."),
      a = parseInt(s[0]) * 40 + parseInt(s[1]);
    n += e(a), s.splice(0, 2);
    for (var o = 0; o < s.length; o++) n += t(s[o]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = n
  }, this.setValueName = function(r) {
    var n = l.asn1.x509.OID.name2oid(r);
    if (n !== "") this.setValueOidString(n);
    else throw "DERObjectIdentifier oidName undefined: " + r
  }, this.getFreshValueHex = function() {
    return this.hV
  }, i !== void 0 && (typeof i == "string" ? i.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(i) : this.setValueName(i) : i.oid !== void 0 ? this.setValueOidString(i.oid) : i.hex !== void 0 ? this.setValueHex(i.hex) : i.name !== void 0 && this.setValueName(i.name))
};
B.lang.extend(l.asn1.DERObjectIdentifier, l.asn1.ASN1Object);
l.asn1.DEREnumerated = function(i) {
  l.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = l.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
  }, this.setByInteger = function(e) {
    var t = new b(String(e), 10);
    this.setByBigInteger(t)
  }, this.setValueHex = function(e) {
    this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof i < "u" && (typeof i.int < "u" ? this.setByInteger(i.int) : typeof i == "number" ? this.setByInteger(i) : typeof i.hex < "u" && this.setValueHex(i.hex))
};
B.lang.extend(l.asn1.DEREnumerated, l.asn1.ASN1Object);
l.asn1.DERUTF8String = function(i) {
  l.asn1.DERUTF8String.superclass.constructor.call(this, i), this.hT = "0c"
};
B.lang.extend(l.asn1.DERUTF8String, l.asn1.DERAbstractString);
l.asn1.DERNumericString = function(i) {
  l.asn1.DERNumericString.superclass.constructor.call(this, i), this.hT = "12"
};
B.lang.extend(l.asn1.DERNumericString, l.asn1.DERAbstractString);
l.asn1.DERPrintableString = function(i) {
  l.asn1.DERPrintableString.superclass.constructor.call(this, i), this.hT = "13"
};
B.lang.extend(l.asn1.DERPrintableString, l.asn1.DERAbstractString);
l.asn1.DERTeletexString = function(i) {
  l.asn1.DERTeletexString.superclass.constructor.call(this, i), this.hT = "14"
};
B.lang.extend(l.asn1.DERTeletexString, l.asn1.DERAbstractString);
l.asn1.DERIA5String = function(i) {
  l.asn1.DERIA5String.superclass.constructor.call(this, i), this.hT = "16"
};
B.lang.extend(l.asn1.DERIA5String, l.asn1.DERAbstractString);
l.asn1.DERUTCTime = function(i) {
  l.asn1.DERUTCTime.superclass.constructor.call(this, i), this.hT = "17", this.setByDate = function(e) {
    this.hTLV = null, this.isModified = !0, this.date = e, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
  }, i !== void 0 && (i.str !== void 0 ? this.setString(i.str) : typeof i == "string" && i.match(/^[0-9]{12}Z$/) ? this.setString(i) : i.hex !== void 0 ? this.setStringHex(i.hex) : i.date !== void 0 && this.setByDate(i.date))
};
B.lang.extend(l.asn1.DERUTCTime, l.asn1.DERAbstractTime);
l.asn1.DERGeneralizedTime = function(i) {
  l.asn1.DERGeneralizedTime.superclass.constructor.call(this, i), this.hT = "18", this.withMillis = !1, this.setByDate = function(e) {
    this.hTLV = null, this.isModified = !0, this.date = e, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
  }, i !== void 0 && (i.str !== void 0 ? this.setString(i.str) : typeof i == "string" && i.match(/^[0-9]{14}Z$/) ? this.setString(i) : i.hex !== void 0 ? this.setStringHex(i.hex) : i.date !== void 0 && this.setByDate(i.date), i.millis === !0 && (this.withMillis = !0))
};
B.lang.extend(l.asn1.DERGeneralizedTime, l.asn1.DERAbstractTime);
l.asn1.DERSequence = function(i) {
  l.asn1.DERSequence.superclass.constructor.call(this, i), this.hT = "30", this.getFreshValueHex = function() {
    for (var e = "", t = 0; t < this.asn1Array.length; t++) {
      var r = this.asn1Array[t];
      e += r.getEncodedHex()
    }
    return this.hV = e, this.hV
  }
};
B.lang.extend(l.asn1.DERSequence, l.asn1.DERAbstractStructured);
l.asn1.DERSet = function(i) {
  l.asn1.DERSet.superclass.constructor.call(this, i), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
      var r = this.asn1Array[t];
      e.push(r.getEncodedHex())
    }
    return this.sortFlag == !0 && e.sort(), this.hV = e.join(""), this.hV
  }, typeof i < "u" && typeof i.sortflag < "u" && i.sortflag == !1 && (this.sortFlag = !1)
};
B.lang.extend(l.asn1.DERSet, l.asn1.DERAbstractStructured);
l.asn1.DERTaggedObject = function(i) {
  l.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(e, t, r) {
    this.hT = t, this.isExplicit = e, this.asn1Object = r, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = r.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1)
  }, this.getFreshValueHex = function() {
    return this.hV
  }, typeof i < "u" && (typeof i.tag < "u" && (this.hT = i.tag), typeof i.explicit < "u" && (this.isExplicit = i.explicit), typeof i.obj < "u" && (this.asn1Object = i.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
};
B.lang.extend(l.asn1.DERTaggedObject, l.asn1.ASN1Object);
var Je = function() {
    var i = function(e, t) {
      return i = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(r, n) {
        r.__proto__ = n
      } || function(r, n) {
        for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (r[s] = n[s])
      }, i(e, t)
    };
    return function(e, t) {
      if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
      i(e, t);

      function r() {
        this.constructor = e
      }
      e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r)
    }
  }(),
  Qt = function(i) {
    Je(e, i);

    function e(t) {
      var r = i.call(this) || this;
      return t && (typeof t == "string" ? r.parseKey(t) : (e.hasPrivateKeyProperty(t) || e.hasPublicKeyProperty(t)) && r.parsePropertiesFrom(t)), r
    }
    return e.prototype.parseKey = function(t) {
      try {
        var r = 0,
          n = 0,
          s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
          a = s.test(t) ? Oe.decode(t) : It.unarmor(t),
          o = Le.decode(a);
        if (o.sub.length === 3 && (o = o.sub[2].sub[0]), o.sub.length === 9) {
          r = o.sub[1].getHexStringValue(), this.n = R(r, 16), n = o.sub[2].getHexStringValue(), this.e = parseInt(n, 16);
          var u = o.sub[3].getHexStringValue();
          this.d = R(u, 16);
          var h = o.sub[4].getHexStringValue();
          this.p = R(h, 16);
          var f = o.sub[5].getHexStringValue();
          this.q = R(f, 16);
          var v = o.sub[6].getHexStringValue();
          this.dmp1 = R(v, 16);
          var d = o.sub[7].getHexStringValue();
          this.dmq1 = R(d, 16);
          var g = o.sub[8].getHexStringValue();
          this.coeff = R(g, 16)
        } else if (o.sub.length === 2)
          if (o.sub[0].sub) {
            var m = o.sub[1],
              k = m.sub[0];
            r = k.sub[0].getHexStringValue(), this.n = R(r, 16), n = k.sub[1].getHexStringValue(), this.e = parseInt(n, 16)
          } else r = o.sub[0].getHexStringValue(), this.n = R(r, 16), n = o.sub[1].getHexStringValue(), this.e = parseInt(n, 16);
        else return !1;
        return !0
      } catch (y) {
        return !1
      }
    }, e.prototype.getPrivateBaseKey = function() {
      var t = {
          array: [new l.asn1.DERInteger({
            int: 0
          }), new l.asn1.DERInteger({
            bigint: this.n
          }), new l.asn1.DERInteger({
            int: this.e
          }), new l.asn1.DERInteger({
            bigint: this.d
          }), new l.asn1.DERInteger({
            bigint: this.p
          }), new l.asn1.DERInteger({
            bigint: this.q
          }), new l.asn1.DERInteger({
            bigint: this.dmp1
          }), new l.asn1.DERInteger({
            bigint: this.dmq1
          }), new l.asn1.DERInteger({
            bigint: this.coeff
          })]
        },
        r = new l.asn1.DERSequence(t);
      return r.getEncodedHex()
    }, e.prototype.getPrivateBaseKeyB64 = function() {
      return xt(this.getPrivateBaseKey())
    }, e.prototype.getPublicBaseKey = function() {
      var t = new l.asn1.DERSequence({
          array: [new l.asn1.DERObjectIdentifier({
            oid: "1.2.840.113549.1.1.1"
          }), new l.asn1.DERNull]
        }),
        r = new l.asn1.DERSequence({
          array: [new l.asn1.DERInteger({
            bigint: this.n
          }), new l.asn1.DERInteger({
            int: this.e
          })]
        }),
        n = new l.asn1.DERBitString({
          hex: "00" + r.getEncodedHex()
        }),
        s = new l.asn1.DERSequence({
          array: [t, n]
        });
      return s.getEncodedHex()
    }, e.prototype.getPublicBaseKeyB64 = function() {
      return xt(this.getPublicBaseKey())
    }, e.wordwrap = function(t, r) {
      if (r = r || 64, !t) return t;
      var n = "(.{1," + r + "})( +|$\n?)|(.{1," + r + "})";
      return t.match(RegExp(n, "g")).join("\n")
    }, e.prototype.getPrivateKey = function() {
      var t = "-----BEGIN RSA PRIVATE KEY-----\n";
      return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n", t += "-----END RSA PRIVATE KEY-----", t
    }, e.prototype.getPublicKey = function() {
      var t = "-----BEGIN PUBLIC KEY-----\n";
      return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n", t += "-----END PUBLIC KEY-----", t
    }, e.hasPublicKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e")
    }, e.hasPrivateKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
    }, e.prototype.parsePropertiesFrom = function(t) {
      this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff)
    }, e
  }(Ze),
  Ye = {},
  Bt, Xe = typeof process < "u" ? (Bt = Ye) === null || Bt === void 0 ? void 0 : Bt.npm_package_version : void 0,
  tr = function() {
    function i(e) {
      e === void 0 && (e = {}), e = e || {}, this.default_key_size = e.default_key_size ? parseInt(e.default_key_size, 10) : 1024, this.default_public_exponent = e.default_public_exponent || "010001", this.log = e.log || !1, this.key = null
    }
    return i.prototype.setKey = function(e) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new Qt(e)
    }, i.prototype.setPrivateKey = function(e) {
      this.setKey(e)
    }, i.prototype.setPublicKey = function(e) {
      this.setKey(e)
    }, i.prototype.decrypt = function(e) {
      try {
        return this.getKey().decrypt(Ut(e))
      } catch (t) {
        return !1
      }
    }, i.prototype.encrypt = function(e) {
      try {
        return xt(this.getKey().encrypt(e))
      } catch (t) {
        return !1
      }
    }, i.prototype.sign = function(e, t, r) {
      try {
        return xt(this.getKey().sign(e, t, r))
      } catch (n) {
        return !1
      }
    }, i.prototype.verify = function(e, t, r) {
      try {
        return this.getKey().verify(e, Ut(t), r)
      } catch (n) {
        return !1
      }
    }, i.prototype.getKey = function(e) {
      if (!this.key) {
        if (this.key = new Qt, e && {}.toString.call(e) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
          return
        }
        this.key.generate(this.default_key_size, this.default_public_exponent)
      }
      return this.key
    }, i.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey()
    }, i.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64()
    }, i.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey()
    }, i.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64()
    }, i.version = Xe, i
  }();
const er = "weibo",
  rr = 4e3,
  ir = "7cda0ba2785647ada4d6e946ddb2d465",
  nr = "https://security.weibo.com/iforgot/loginname?entry=".concat(er, "&loginname="),
  sr = "https://weibo.com/signup/signup.php",
  or = "https://h5.sinaimg.cn/upload/1005/891/2024/01/04/weibologo.png",
  ue = "20250520",
  Mt = async i => i.then(e => [null, e]).catch(e => [e, null]), st = (i, e = {}) => {
    if (e.method === "POST") {
      const t = Object.assign({}, e);
      return delete t.method, Mt($t.post(i, t))
    } else {
      const t = Object.assign({}, e);
      return delete t.method, Mt($t.get(i, {
        params: t
      }))
    }
  }, le = i => Mt(new Promise((e, t) => {
    if (!window.ydInit) {
      t({
        params: {},
        msg: "极验未初始化"
      });
      return
    }
    window.ydInit({
      geetestKey: i,
      captchaId: ir,
      product: "popup",
      lang: "zh-CN"
    }, (r, n, s) => {
      s ? e({
        params: r,
        msg: n
      }) : t({
        params: r,
        msg: n
      })
    })
  })), ar = i => {
    const e = atob(i),
      t = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
    return Array.from(t).map(n => n.toString(16).padStart(2, "0")).join("")
  }, ur = (i, e) => {
    if (!e || !i) return;
    const t = new tr({
      default_public_exponent: "10001"
    });
    return t.setPublicKey(e), ar(t.encrypt(i))
  };

function lr() {
  const i = navigator.userAgent.toLowerCase(),
    e = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(i),
    t = /ipad|tablet|playbook|silk/i.test(i);
  return e && !t
}

function hr() {
  return window.innerWidth > window.innerHeight
}

function cr() {
  return window.innerHeight > window.innerWidth
}

function Jt() {
  return lr() ? !!(hr() || cr()) : !1
}
const fr = p("img", {
    class: "h-full",
    src: "https://d.sinaimg.cn/prd/1005/891/2024/12/31/h5_fanhui.png"
  }, null, -1),
  dr = {
    key: 1,
    class: "text-sm text-center mt-5 text-sub"
  },
  pr = {
    key: 0,
    class: "w-full h-full absolute bg-white95"
  },
  gr = {
    class: "absolute top-12 left-0 right-0 text-center"
  },
  vr = {
    key: 0,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 37 40"
  },
  mr = p("path", {
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
    fill: "#8CD232"
  }, null, -1),
  yr = p("path", {
    d: "M15.7781746,21.4319805 L26.3847763,10.8253788 C27.1658249,10.0443302 28.4321549,10.0443302 29.2132034,10.8253788 C29.994252,11.6064274 29.994252,12.8727573 29.2132034,13.6538059 L17.1923882,25.6746212 C16.4113396,26.4556698 15.1450096,26.4556698 14.363961,25.6746212 L9.41421356,20.7248737 C8.63316498,19.9438252 8.63316498,18.6774952 9.41421356,17.8964466 C10.1952621,17.115398 11.4615921,17.115398 12.2426407,17.8964466 L15.7781746,21.4319805 L15.7781746,21.4319805 Z",
    fill: "#FFFFFF"
  }, null, -1),
  br = [mr, yr],
  wr = {
    key: 1,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 38 40"
  },
  xr = p("path", {
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
    fill: "#FF8200"
  }, null, -1),
  Sr = p("path", {
    d: "M18.5,8 L18.6502192,8.00546148 C19.6911389,8.08147296 20.5,8.94145612 20.5,9.991155 L20.5,9.991155 L20.5,17 L27.508845,17 C28.5602587,17 29.4186829,17.8158778 29.4945492,18.8507377 L29.5,19 L29.4945385,19.1502192 C29.418527,20.1911389 28.5585439,21 27.508845,21 L27.508845,21 L20.5,21 L20.5,28.008845 C20.5,29.0602587 19.6841222,29.9186829 18.6492623,29.9945492 L18.5,30 L18.3497808,29.9945385 C17.3088611,29.918527 16.5,29.0585439 16.5,28.008845 L16.5,28.008845 L16.5,21 L9.491155,21 C8.43974127,21 7.58131707,20.1841222 7.50545085,19.1492623 L7.5,19 L7.50546148,18.8497808 C7.58147296,17.8088611 8.44145612,17 9.491155,17 L9.491155,17 L16.5,17 L16.5,9.991155 C16.5,8.93974127 17.3158778,8.08131707 18.3507377,8.00545085 L18.5,8 Z",
    fill: "#FFFFFF",
    transform: "translate(18.500000, 19.000000) rotate(-225.000000) translate(-18.500000, -19.000000) "
  }, null, -1),
  Tr = [xr, Sr],
  Er = {
    key: 2,
    class: "w-10 h-10 inline-block",
    viewBox: "0 0 40 40"
  },
  kr = p("path", {
    fill: "#507DAF",
    d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z M18.5,15 C17.3954305,15 16.5,15.8933973 16.5,16.9918842 L16.5,16.9918842 L16.5,28.0081158 L16.5059944,28.1641306 C16.5814663,29.1422683 17.3609071,29.9222992 18.3497808,29.9945365 L18.3497808,29.9945365 L18.5,30 L18.6492623,29.9945271 C19.6841222,29.9183583 20.5,29.0566714 20.5,28.0081158 L20.5,28.0081158 L20.5,16.9918842 L20.4940056,16.8358694 C20.4185337,15.8577317 19.6390929,15.0777008 18.6502192,15.0054635 L18.6502192,15.0054635 Z M18.5,9 C17.396,9 16.5,9.89303565 16.5,10.9980007 C16.5,12.1029657 17.396,13 18.5,13 C19.6053333,13 20.5,12.1029657 20.5,10.9980007 C20.5,9.89303565 19.6053333,9 18.5,9 Z"
  }, null, -1),
  Dr = [kr],
  _r = {
    class: "absolute top-28 break-all w-full px-8 text-xs text-center"
  },
  Rr = {
    class: "w-45 h-45 p-5"
  },
  Br = ["src"],
  Cr = {
    key: 2,
    class: "text-sm"
  },
  Ar = Q({
    __name: "QRcode",
    props: {
      entry: String,
      source: String,
      url: String,
      visible: Boolean
    },
    emits: ["click-back"],
    setup(i, {
      emit: e
    }) {
      const t = i,
        r = te(),
        n = N(""),
        s = N(""),
        a = N(""),
        o = N(null),
        u = async (v = "") => {
          let d = "norid";
          if (window.wbBotDetector && window.wbBotDetector.get) {
            const y = await window.wbBotDetector.get({
              useCache: !0
            }).catch(T => {
              console.log(T)
            });
            d = (y == null ? void 0 : y.rid) || "getriderror"
          }
          const [g, m] = await st("/sso/v2/qrcode/check", {
            entry: t.entry,
            source: t.source,
            url: t.url,
            qrid: v,
            disp: r.query.disp,
            rid: d,
            ver: ue
          });
          if (g) return;
          const k = +m.data.retcode;
          switch (k) {
            case 50114002:
              s.value = "warning";
              break;
            case 50114003:
            case 50114004:
            case 50114015:
              s.value = "error";
              break;
            case 2e7:
              s.value = "success", a.value = "扫描成功";
              break
          }
          k === 2e7 ? (clearInterval(o.value), o.value = null, m.data.data.url && window.location.replace(m.data.data.url)) : a.value = m.data.msg
        }, h = async () => {
          var g, m;
          o.value && (clearInterval(o.value), o.value = null);
          const [v, d] = await st("/sso/v2/qrcode/image", {
            entry: t.entry,
            size: 180
          });
          v || d.data.retcode === 2e7 && (n.value = (m = (g = d.data) == null ? void 0 : g.data) == null ? void 0 : m.image, o.value = setInterval(() => {
            var k, y;
            u((y = (k = d.data) == null ? void 0 : k.data) == null ? void 0 : y.qrid)
          }, rr))
        }, f = () => {
          a.value = "", s.value = "", h()
        };
      return ee(async () => {
        h()
      }), re(() => {
        clearInterval(o.value), o.value = null
      }), ie(() => {}), (v, d) => (S(), E("div", {
        class: O(["flex-col items-center justify-center w-82.5 height-full border-r border-line md:flex dark:border-linedark", i.visible ? "fixed bg-white w-full h-full z-9999" : ""])
      }, [i.visible ? (S(), E("div", {
        key: 0,
        class: "absolute top-10 left-6 leading-[30px] h-[30px] text-darkGray flex",
        onClick: d[0] || (d[0] = g => v.$emit("click-back"))
      }, [fr, G(" 返回 ")])) : V("", !0), p("div", {
        class: O(["leading-4.5 font-medium", i.visible ? "text-center mt-25" : ""])
      }, "扫描二维码登录", 2), i.visible ? (S(), E("div", dr, "打开微博手机APP - 我的页面 - 扫一扫")) : V("", !0), p("div", {
        class: O(["relative border-2 border-line dark:border-linedark", i.visible ? "m-0 mt-[30px] w-[183px] h-[183px] relative left-2/4 -translate-x-2/4" : "m-8.5"])
      }, [s.value ? (S(), E("div", pr, [p("div", gr, [s.value === "success" ? (S(), E("svg", vr, br)) : V("", !0), s.value === "error" ? (S(), E("svg", wr, Tr)) : V("", !0), s.value === "warning" ? (S(), E("svg", Er, Dr)) : V("", !0)]), p("div", _r, it(a.value), 1), s.value === "error" ? (S(), E("a", {
        key: 0,
        href: "",
        class: "absolute top-36 break-all w-full px-8 text-xs text-center text-brand",
        onClick: W(f, ["prevent"])
      }, "点击刷新")) : V("", !0)])) : V("", !0), p("div", Rr, [n.value ? (S(), E("img", {
        key: 0,
        src: n.value,
        alt: "",
        class: "w-full h-full"
      }, null, 8, Br)) : V("", !0)])], 2), i.visible ? V("", !0) : (S(), E("div", Cr, "打开微博手机APP - 我的页面 - 扫一扫"))], 2))
    }
  });

function Vr(i) {
  return ve() ? (me(i), !0) : !1
}

function he(i) {
  return typeof i == "function" ? i() : ne(i)
}
const ce = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ir = Object.prototype.toString,
  Or = i => Ir.call(i) === "[object Object]",
  yt = () => {},
  Mr = Nr();

function Nr() {
  var i, e;
  return ce && ((i = window == null ? void 0 : window.navigator) == null ? void 0 : i.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent))
}

function ut(i) {
  var e;
  const t = he(i);
  return (e = t == null ? void 0 : t.$el) != null ? e : t
}
const fe = ce ? window : void 0;

function Ct(...i) {
  let e, t, r, n;
  if (typeof i[0] == "string" || Array.isArray(i[0]) ? ([t, r, n] = i, e = fe) : [e, t, r, n] = i, !e) return yt;
  Array.isArray(t) || (t = [t]), Array.isArray(r) || (r = [r]);
  const s = [],
    a = () => {
      s.forEach(f => f()), s.length = 0
    },
    o = (f, v, d, g) => (f.addEventListener(v, d, g), () => f.removeEventListener(v, d, g)),
    u = bt(() => [ut(e), he(n)], ([f, v]) => {
      if (a(), !f) return;
      const d = Or(v) ? {
        ...v
      } : v;
      s.push(...t.flatMap(g => r.map(m => o(f, g, m, d))))
    }, {
      immediate: !0,
      flush: "post"
    }),
    h = () => {
      u(), a()
    };
  return Vr(h), h
}
let Yt = !1;

function Lr(i, e, t = {}) {
  const {
    window: r = fe,
    ignore: n = [],
    capture: s = !0,
    detectIframe: a = !1
  } = t;
  if (!r) return yt;
  Mr && !Yt && (Yt = !0, Array.from(r.document.body.children).forEach(d => d.addEventListener("click", yt)), r.document.documentElement.addEventListener("click", yt));
  let o = !0;
  const u = d => n.some(g => {
      if (typeof g == "string") return Array.from(r.document.querySelectorAll(g)).some(m => m === d.target || d.composedPath().includes(m));
      {
        const m = ut(g);
        return m && (d.target === m || d.composedPath().includes(m))
      }
    }),
    f = [Ct(r, "click", d => {
      const g = ut(i);
      if (!(!g || g === d.target || d.composedPath().includes(g))) {
        if (d.detail === 0 && (o = !u(d)), !o) {
          o = !0;
          return
        }
        e(d)
      }
    }, {
      passive: !0,
      capture: s
    }), Ct(r, "pointerdown", d => {
      const g = ut(i);
      o = !u(d) && !!(g && !d.composedPath().includes(g))
    }, {
      passive: !0
    }), a && Ct(r, "blur", d => {
      setTimeout(() => {
        var g;
        const m = ut(i);
        ((g = r.document.activeElement) == null ? void 0 : g.tagName) === "IFRAME" && !(m != null && m.contains(r.document.activeElement)) && e(d)
      }, 0)
    })].filter(Boolean);
  return () => f.forEach(d => d())
}

function Pr(i) {
  let e = "";
  for (let t = 0; t < i.length; t++) {
    const n = i.charCodeAt(t).toString(16);
    e += n.length === 1 ? "0".concat(n) : n
  }
  return e
}

function Nt(i, e = "MwmL8jWA") {
  const t = e.length,
    r = [];
  for (let n = 0; n < i.length; n++) r.push(String.fromCharCode(i.charCodeAt(n) ^ e.charCodeAt(n % t)));
  return Pr(r.reverse().join(""))
}
const qr = {
    key: 0,
    class: "mt-10 md:mt-6.5",
    tabindex: "0"
  },
  $r = {
    class: "relative"
  },
  Fr = {
    class: "absolute top-1/2 left-0 z-9 -translate-y-1/2"
  },
  Hr = p("svg", {
    class: "w-3 h-3 ml-1 text-main dark:text-maindark",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 612 612"
  }, [p("path", {
    d: "M565.2,173.2c-8.2-8.1-21.5-8.1-29.6,0L303.5,403.4L75.7,177.6c-8-8-21.1-8-29.1,0c-8,7.9-8,20.9,0,28.8l241.3,239.2\n                  c0.3,0.3,0.8,0.4,1.1,0.7c0.2,0.2,0.2,0.4,0.3,0.5c8.2,8.1,21.5,8.1,29.6,0l246.3-244.2C573.4,194.5,573.4,181.3,565.2,173.2z"
  })], -1),
  Ur = {
    class: "p-0.5",
    "aria-labelledby": "dropdownDefaultButton"
  },
  jr = ["onClick"],
  Kr = {
    href: "#",
    class: "block px-3 py-2.5 hover:bg-cardin dark:hover:bg-cardindark"
  },
  zr = ["value"],
  Zr = {
    class: "relative mt-2.5"
  },
  Gr = ["value"],
  Wr = {
    class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
  },
  Qr = {
    key: 1,
    class: "text-sm text-disabled dark:text-disableddark cursor-not-allowed"
  },
  Jr = {
    key: 1,
    class: "text-sm text-disabled dark:text-disableddark"
  },
  Yr = {
    class: "flex items-center justify-between h-4.5 mt-2"
  },
  Xr = Q({
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
    setup(i, {
      emit: e
    }) {
      const t = i,
        r = e,
        n = N(null),
        s = N(!1),
        a = N(t.modelValue.countryCode);
      Lr(n, () => {
        s.value = !1
      });
      const o = (y, T) => {
          const _ = t.modelValue;
          _[T] = y.target.value, r("update:modelValue", _), r("update-error-msg", "")
        },
        u = y => {
          a.value = y, s.value = !1, o({
            target: {
              value: y
            }
          }, "countryCode")
        },
        h = N(!1),
        f = N(null),
        v = N(60),
        d = (y = "") => {
          let T = "".concat(t.modelValue.username);
          return t.modelValue.countryCode !== "86" && (T = "00".concat(t.modelValue.countryCode).concat(t.modelValue.username)), T = Nt(T), st("/sso/v2/sms/send", {
            method: "POST",
            entry: t.entry,
            mobile: T,
            mfa_id: y,
            el: 1
          })
        },
        g = async () => {
          var _, M, F, x, c, D;
          if (!t.modelValue.username) {
            r("update-error-msg", "请输入手机号");
            return
          }
          if (f.value) return;
          if (!t.checked && t.isMobile) {
            r("trigger-check-lisence");
            return
          }
          const [y, T] = await d();
          if (y) {
            if (((_ = y == null ? void 0 : y.response) == null ? void 0 : _.status) === 432 || ((M = y == null ? void 0 : y.response) == null ? void 0 : M.status) === 429) {
              r("update-error-msg", "当前系统繁忙，请稍后再试(".concat((F = y == null ? void 0 : y.response) == null ? void 0 : F.status, ")"));
              return
            }
            r("update-error-msg", "短信接口数据获取失败");
            return
          }
          if (T.data.retcode === 0 && T.data.data.act === "mfa_1") {
            const [H, L] = await le(T.data.data.mfa_id);
            if (H) {
              if (H.msg === "close") return;
              r("update-error-msg", H.msg);
              return
            }
            if (!L) {
              r("update-error-msg", "极验返回结果有误");
              return
            }
            const [C, A] = await d(T.data.data.mfa_id);
            if (C) {
              if (((x = C == null ? void 0 : C.response) == null ? void 0 : x.status) === 432 || ((c = C == null ? void 0 : C.response) == null ? void 0 : c.status) === 429) {
                r("update-error-msg", "当前系统繁忙，请稍后再试(".concat((D = C == null ? void 0 : C.response) == null ? void 0 : D.status, ")"));
                return
              }
              r("update-error-msg", "二次验证通过，短信接口数据获取失败");
              return
            }
            if (+A.data.retcode != 2e7) {
              r("update-error-msg", A.data.msg || "二次验证通过，短信接口获取数据遇到错误");
              return
            } else h.value = !0, m();
            r("update-error-msg", "")
          } else T.data.retcode === 2e7 && (h.value = !0, m()), r("update-error-msg", T.data.msg)
        };

      function m() {
        f.value = setInterval(() => {
          v.value--, v.value <= 0 && k()
        }, 1e3)
      }

      function k() {
        clearInterval(f.value), v.value = 60, h.value = !1, f.value = null
      }
      return (y, T) => (S(), E("form", qr, [p("div", $r, [p("div", Fr, [p("button", {
        id: "dropdownDefaultButton",
        class: "flex items-center",
        onClick: T[0] || (T[0] = W(_ => s.value = !s.value, ["prevent"]))
      }, [p("span", null, "+" + it(a.value), 1), Hr]), s.value ? (S(), E("div", {
        key: 0,
        ref_key: "dropdownMenu",
        ref: n,
        class: "absolute left-0 z-9 w-49.5 h-51.5 mt-2 bg-card border border-line rounded shadow overflow-x-hidden overflow-y-auto text-sm dark:bg-carddark dark:border-linedark"
      }, [p("ul", Ur, [(S(!0), E(wt, null, ye(i.countryCodeMenu, (_, M) => (S(), E("li", {
        key: M,
        onClick: F => u(_.code)
      }, [p("a", Kr, it(_.text), 1)], 8, jr))), 128))])], 512)) : V("", !0)]), p("input", {
        value: t.modelValue.username,
        type: "text",
        "aria-label": "手机号",
        class: "block w-full pl-20 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "手机号",
        onInput: T[1] || (T[1] = _ => o(_, "username"))
      }, null, 40, zr)]), p("div", Zr, [p("input", {
        maxlength: "6",
        value: t.modelValue.scode,
        type: "text",
        "aria-label": "验证码",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "验证码",
        onInput: T[2] || (T[2] = _ => o(_, "scode"))
      }, null, 40, Gr), p("div", Wr, [h.value ? (S(), E("span", Jr, it(v.value) + "s后重新发送", 1)) : (S(), E(wt, {
        key: 0
      }, [t.modelValue.username ? (S(), E("a", {
        key: 0,
        class: "text-sm text-alink dark:text-alinkdark cursor-pointer",
        onClick: W(g, ["prevent"])
      }, "获取验证码")) : (S(), E("a", Qr, "获取验证码"))], 64))])]), p("div", Yr, [Lt(y.$slots, "errorMsg")])]))
    }
  }),
  ti = {
    class: "mt-10 md:mt-6.5",
    "aria-current": "true",
    tabindex: "1"
  },
  ei = {
    class: "relative"
  },
  ri = ["value"],
  ii = {
    class: "relative mt-2.5"
  },
  ni = ["value"],
  si = {
    class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
  },
  oi = {
    key: 0,
    class: "flex items-center mt-2.5"
  },
  ai = {
    class: "flex-1"
  },
  ui = ["value"],
  li = {
    class: "w-30 h-11 ml-4"
  },
  hi = ["src"],
  ci = {
    class: "flex items-center justify-between h-4.5 mt-2"
  },
  fi = Q({
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
    setup(i, {
      emit: e
    }) {
      const t = i,
        r = e,
        n = N(""),
        s = (u, h) => {
          const f = t.modelValue;
          f[h] = u.target.value, r("update:modelValue", f), r("update-error-msg", "")
        },
        a = async () => {
          const [u, h] = await st("/sso/v2/captcha/image", {
            method: "POST",
            pcid: t.modelValue.mfaId,
            entry: t.entry
          });
          u || h.data.retcode === 2e7 && (n.value = h.data.data.image)
        }, o = () => {
          window.open(t.forgetUrl)
        };
      return bt(() => t.showCode, u => {
        u && a()
      }), bt(() => t.refreshCode, () => {
        a()
      }), (u, h) => (S(), E("form", ti, [p("div", ei, [p("input", {
        value: t.modelValue.username,
        type: "text",
        "aria-label": "手机号或邮箱",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "手机号或邮箱",
        onInput: h[0] || (h[0] = f => s(f, "username"))
      }, null, 40, ri)]), p("div", ii, [p("input", {
        value: t.modelValue.password,
        type: "password",
        "aria-label": "密码",
        class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "密码",
        onInput: h[1] || (h[1] = f => s(f, "password"))
      }, null, 40, ni), p("div", si, [p("a", {
        href: "",
        class: "text-sm text-alink dark:text-alinkdark",
        onClick: W(o, ["prevent"])
      }, "忘记密码")])]), i.showCode ? (S(), E("div", oi, [p("div", ai, [p("input", {
        value: t.modelValue.ccode,
        type: "text",
        "aria-label": "验证码",
        class: "block w-full px-0 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
        placeholder: "请输入验证码",
        onInput: h[2] || (h[2] = f => s(f, "ccode"))
      }, null, 40, ui)]), p("div", li, [p("img", {
        src: n.value,
        alt: "",
        class: "w-full h-full",
        onClick: a
      }, null, 8, hi)])])) : V("", !0), p("div", ci, [Lt(u.$slots, "errorMsg")])]))
    }
  }),
  di = p("img", {
    class: "h-[30px] w-[30px] mr-2",
    src: "https://d.sinaimg.cn/prd/1005/891/2025/11/20/wechat.png"
  }, null, -1),
  pi = p("img", {
    class: "h-[30px] w-[30px] mr-2",
    src: "https://d.sinaimg.cn/prd/1005/891/2025/05/27/scan.png"
  }, null, -1),
  gi = Q({
    __name: "ExtraEntry",
    props: {
      showWechat: {
        type: Boolean,
        default: !1
      },
      isMobileLayout: Boolean
    },
    emits: ["click-qrcode", "click-wechat"],
    setup(i) {
      const e = i,
        t = Vt(() => e.isMobileLayout ? "flex justify-center block w-full bottom-0 text-mainb text-[15px] text-center leading-5 bg-white pb-safe-bottom leading-[30px] whitespace-nowrap" : "absolute bottom-[117px] right-[122px]");
      return (r, n) => (S(), E("div", {
        class: O(t.value)
      }, [i.showWechat ? (S(), E("span", {
        key: 0,
        class: "flex h-5 justify-center items-center text-[rgb(99, 99, 99)] mx-10 cursor-pointer",
        onClick: n[0] || (n[0] = s => r.$emit("click-wechat"))
      }, [di, G("微信登录")])) : V("", !0), i.isMobileLayout ? (S(), E("span", {
        key: 1,
        class: "flex h-5 justify-center items-center mx-10",
        onClick: n[1] || (n[1] = s => r.$emit("click-qrcode"))
      }, [pi, G("扫码登录")])) : V("", !0)], 2))
    }
  });
class de {
  constructor(e) {
    qt(this, "mytimer", null);
    this.enable = e
  }
  start(e, t) {
    this.enable && (this.mytimer = setTimeout(t, e))
  }
  clear() {
    this.enable && (clearTimeout(this.mytimer), this.mytimer = null)
  }
  isset() {
    return this.mytimer !== null
  }
}
const vi = i => {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let t = "";
  for (let r = 0; r < i; r++) t += e.charAt(Math.ceil(Math.random() * 1e6) % e.length);
  return t
};
let X = null,
  tt = null,
  rt = 0;
const At = 2e3,
  mi = 5e3;
let St;
const yi = i => {
    if (X || (X = new de(!0)), i === 0) return X.clear(), rt = i, !0;
    if (i < 1294935546) return !1;
    const e = function() {
      rt && X && (rt += At / 1e3, X.start(At, e))
    };
    rt = i, X.start(At, e)
  },
  bi = i => {
    St = i
  },
  wi = () => St,
  xi = () => rt,
  Si = () => {
    tt ? tt.clear() : tt = new de(!1), tt.start(mi, () => {
      tt && tt.clear()
    }), rt && (St || (St = vi(6)))
  },
  Ti = {
    class: "flex h-full pb-[25px]"
  },
  Ei = {
    class: "flex-1 px-6 pt-5 md:pt-7"
  },
  ki = {
    class: "flex flex-wrap space-x-6.5"
  },
  Di = {
    class: "text-s text-red dark:text-reddark"
  },
  _i = {
    class: "text-s text-red dark:text-reddark"
  },
  Ri = {
    for: "checked-checkbox2",
    class: "ml-1 text-s text-sub dark:text-subdark"
  },
  Bi = p("a", {
    href: "https://passport.sinaimg.cn/html/sso/signupagreement_x.html",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "新浪网络使用协议", -1),
  Ci = p("a", {
    href: "https://passport.sinaimg.cn/html/sso/privacyclause.html",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "新浪个人信息保护政策", -1),
  Ai = p("a", {
    href: "https://m.weibo.cn/c/regagreement",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "用户协议", -1),
  Vi = p("a", {
    href: "https://m.weibo.cn/c/privacy",
    target: "_blank",
    class: "text-alink dark:text-alinkdark"
  }, "隐私条款", -1),
  Ii = {
    key: 0
  },
  Oi = {
    key: 1
  },
  Mi = p("a", {
    href: "https://m.weibo.cn/c/regagreement",
    target: "_blank",
    class: "text-xs text-alink dark:text-alinkdark"
  }, "《用户协议》", -1),
  Ni = p("a", {
    href: "https://m.weibo.cn/c/privacy",
    target: "_blank",
    class: "text-xs text-alink dark:text-alinkdark"
  }, "《隐私条款》", -1),
  Li = Q({
    __name: "Login",
    setup(i) {
      const e = te(),
        t = kt({
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
        r = N(y()),
        n = kt({
          form: {
            username: "",
            password: "",
            ccode: "",
            mfaId: ""
          },
          showCode: !1,
          refreshCode: !1
        }),
        s = kt({
          form: {
            username: "",
            scode: "",
            countryCode: "86",
            cid: ""
          },
          countryCodeMenu: []
        }),
        a = Vt(() => !r.value || t.mobileQRcodeVisible),
        o = {
          show_pw: 1,
          show_sms: 2
        },
        u = Vt(() => !!t.show_wechat),
        h = N("border-b-2 border-brand font-medium dark:border-branddark");
      bt(r, () => {
        t.mobileQRcodeVisible = !1
      });
      const f = x => {
          t.curType = x, t.errMsg = ""
        },
        v = () => {
          n.showCode = !0
        },
        d = (x = "") => {
          t.errMsg = x
        },
        g = () => {
          t.errMsg = t.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款"
        },
        m = () => r.value && !t.checked ? (g(), !0) : !1,
        k = async () => {
          var C, A, lt;
          if (m()) return;
          const x = {
            method: "POST",
            entry: t.entry,
            source: t.source,
            type: o[t.curType],
            url: e.query.url,
            ver: ue
          };
          if (t.curType === "show_pw") {
            if (!n.form.username || !n.form.password) {
              t.errMsg = "请输入正确的信息";
              return
            }
            Si(), x.username = n.form.username, x.pass = ur("".concat([xi(), wi()].join("	"), "\n").concat(n.form.password), t.pubkey), x.cid = n.form.mfaId, x.pwencode = "rsa", x.rsakv = t.rsakv, n.showCode && (x.ccode = n.form.ccode)
          }
          if (t.curType === "show_sms") {
            if (!s.form.username || !s.form.scode) {
              t.errMsg = "请输入正确的信息";
              return
            }
            s.form.countryCode === "86" ? x.username = "".concat(s.form.username) : x.username = "00".concat(s.form.countryCode).concat(s.form.username), x.scode = s.form.scode
          }
          if (e.query.disp && (x.disp = e.query.disp), x.rid = "norid", window.wbBotDetector && window.wbBotDetector.get) {
            const P = await window.wbBotDetector.get({
              useCache: !1
            }).catch(Et => {
              console.log(Et)
            });
            x.rid = (P == null ? void 0 : P.rid) || "getriderror"
          }
          x.scode && (x.scode = Nt(x.scode), x.el = 1), x.username && (x.username = Nt(x.username), x.el = 1);
          const [c, D] = await st("/sso/v2/login", x);
          if (c) {
            if (((C = c == null ? void 0 : c.response) == null ? void 0 : C.status) === 432 || ((A = c == null ? void 0 : c.response) == null ? void 0 : A.status) === 429) {
              d("当前系统繁忙，请稍后再试(".concat((lt = c == null ? void 0 : c.response) == null ? void 0 : lt.status, ")"));
              return
            }
            return
          }
          switch (D.data.data.act) {
            case "mfa_2":
              n.form.mfaId = D.data.data.mfa_id, v();
              break;
            case "mfa_1": {
              n.form.mfaId = D.data.data.mfa_id;
              const [P, Et] = await le(D.data.data.mfa_id);
              if (P) {
                if (P.msg === "close") return;
                d(P.msg);
                return
              }
              if (!Et) {
                d("极验返回结果有误");
                return
              }
              await k()
            }
            return;
            case "goto":
              window.location.href = D.data.data.location;
              break
          }
          const L = +D.data.retcode;
          if (L !== 2e5) {
            switch (L) {
              case 2070:
                n.refreshCode = !0, xe(() => {
                  n.refreshCode = !1
                });
                break
            }
            t.errMsg = D.data.msg
          }
        };
      ee(async () => {
        t.entry = e.query.entry, t.source = e.query.source;
        const [x, c] = await st("/sso/v2/web/config", {
          method: "POST",
          entry: t.entry,
          source: t.source
        });
        x || c.data.retcode !== 2e7 || (t.show_pw = !!c.data.data.show_pw, t.show_qq = !!c.data.data.show_qq, t.show_qr = !!c.data.data.show_qr, t.show_sms = !!c.data.data.show_sms, t.show_wechat = !!c.data.data.show_wechat, t.curType = c.data.data.first_show, t.regUrl = c.data.data.reg_url || sr, t.forgetUrl = c.data.data.forget_url || nr, t.iconUrl = c.data.data.icon_url || or, t.pubkey = c.data.data.pubkey, t.rsakv = c.data.data.rsakv, t.wechatUrl = c.data.data.wechat_url, document.title = "登录 - ".concat(c.data.data.title), s.countryCodeMenu = c.data.data.country_code.map(D => ({
          code: D.country_code,
          text: D.local.zh_CN
        })), bi(c.data.data.nonce), yi(c.data.data.servertime))
      });

      function y() {
        return Jt() || !Jt() && window.innerWidth < 768
      }
      const T = () => {
          r.value = y()
        },
        _ = () => {
          t.mobileQRcodeVisible = !0
        },
        M = () => {
          t.mobileQRcodeVisible = !1
        };

      function F() {
        if (r.value && !t.checked) {
          t.errMsg = t.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款";
          return
        }
        if (!u.value) return;
        const x = e.query.url || "";
        let c = "".concat(t.wechatUrl, "&r=").concat(x);
        e.query.disp && (c += "&disp=".concat(e.query.disp)), window.location.href = c
      }
      return ie(() => {
        window.addEventListener("resize", T)
      }), re(() => {
        window.removeEventListener("resize", T)
      }), (x, c) => (S(), ht(Be, {
        "icon-url": t.iconUrl
      }, {
        default: Dt(() => [p("div", Ti, [a.value ? (S(), ht(Ar, {
          key: 0,
          visible: t.mobileQRcodeVisible,
          entry: t.entry,
          source: t.source,
          url: ne(e).query.url,
          onClickBack: M
        }, null, 8, ["visible", "entry", "source", "url"])) : V("", !0), p("div", Ei, [p("div", {
          class: O(["h-16 iphone-safe-header", r.value ? "md:portrait:h-0" : "md:h-0"])
        }, null, 2), p("ul", ki, [p("li", null, [p("a", {
          href: "#",
          class: O(["inline-block pb-2.5", [t.curType === "show_sms" && h.value]]),
          "aria-current": "page",
          onClick: c[0] || (c[0] = W(D => f("show_sms"), ["prevent"]))
        }, [p("span", {
          class: O(r.value ? "md:portrait:hidden" : "md:hidden")
        }, "短信验证登录", 2), p("span", {
          class: O(["hidden", r.value ? "md:portrait:inline" : "md:inline"])
        }, "验证码登录", 2)], 2), t.curType === "show_sms" ? (S(), E("div", {
          key: 0,
          class: O(["absolute z-9 mt-2 text-xs text-sub dark:text-subdark", r.value ? "md:portrait:hidden" : "md:hidden"])
        }, " 未注册手机号验证通过后将自动注册 ", 2)) : V("", !0)]), p("li", null, [p("a", {
          href: "#",
          class: O(["inline-block pb-2.5", [t.curType === "show_pw" && h.value]]),
          onClick: c[1] || (c[1] = W(D => f("show_pw"), ["prevent"]))
        }, [p("span", {
          class: O(r.value ? "md:portrait:hidden" : "md:hidden")
        }, "账号密码登录", 2), p("span", {
          class: O(["hidden", r.value ? "md:portrait:inline" : "md:inline"])
        }, "账号登录", 2)], 2)])]), t.curType === "show_sms" ? (S(), ht(Xr, {
          key: 0,
          modelValue: s.form,
          "onUpdate:modelValue": c[2] || (c[2] = D => s.form = D),
          countryCodeMenu: s.countryCodeMenu,
          entry: t.entry,
          checked: t.checked,
          isMobile: r.value,
          onUpdateErrorMsg: d,
          onTriggerCheckLisence: m
        }, {
          errorMsg: Dt(() => [p("div", Di, it(t.errMsg), 1)]),
          _: 1
        }, 8, ["modelValue", "countryCodeMenu", "entry", "checked", "isMobile"])) : (S(), ht(fi, {
          key: 1,
          modelValue: n.form,
          "onUpdate:modelValue": c[3] || (c[3] = D => n.form = D),
          "show-code": n.showCode,
          "refresh-code": n.refreshCode,
          entry: t.entry,
          "forget-url": t.forgetUrl,
          onUpdateErrorMsg: d
        }, {
          errorMsg: Dt(() => [p("div", _i, it(t.errMsg), 1)]),
          _: 1
        }, 8, ["modelValue", "show-code", "refresh-code", "entry", "forget-url"])), r.value ? (S(), E("div", {
          key: 2,
          class: O(["flex items-center mt-3.5", r.value ? "md:portrait:hidden" : "md:hidden"])
        }, [be(p("input", {
          id: "checked-checkbox2",
          "onUpdate:modelValue": c[4] || (c[4] = D => t.checked = D),
          type: "checkbox",
          value: "",
          class: "w-4 h-4 bg-transparent border-disabled rounded text-brand dark:border-disableddark dark:text-branddark"
        }, null, 512), [
          [we, t.checked]
        ]), p("label", Ri, [G(" 登录注册即表示同意 "), t.isSina ? (S(), E(wt, {
          key: 0
        }, [Bi, G("、 "), Ci], 64)) : (S(), E(wt, {
          key: 1
        }, [Ai, G("、 "), Vi], 64))])], 2)) : V("", !0), p("button", {
          type: "button",
          class: "w-full mt-5.5 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark",
          onClick: W(k, ["prevent"])
        }, [t.curType === "show_sms" ? (S(), E("span", Ii, "登录/注册")) : (S(), E("span", Oi, "登录"))]), p("div", {
          class: O(["justify-start mt-3 text-xs text-mainb", r.value && "hidden"])
        }, [G(" 未注册手机验证后自动登录，注册即代表同意 "), Mi, Ni], 2)])]), Xt(gi, {
          isMobileLayout: r.value,
          showWechat: u.value,
          onClickQrcode: _,
          onClickWechat: F
        }, null, 8, ["isMobileLayout", "showWechat"])]),
        _: 1
      }, 8, ["icon-url"]))
    }
  }),
  Pi = Se(Li);
Pi.use(Te).mount("#app");
export {
  $i as __vite_legacy_guard
};