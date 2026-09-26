System.register(["../../ajax-legacy-HfQI32AU.js", "../../useRoute-legacy-CdHt2Gxg.js"], function(t, e) {
  "use strict";
  var r, i, n, s, o, a, u, h, l, c, d, f, p, g, m, v, y, b, w, T, S, x, E, k, D, A, B, V, R, C, O, I;
  return {
    setters: [t => {
      r = t.d, i = t.c, n = t.e, s = t.f, o = t.p, a = t.q, u = t.a, h = t.s, l = t.u, c = t.o, d = t.x, f = t.h, p = t.n, g = t.t, m = t.j, v = t.k, y = t.y, b = t.z, w = t.A, T = t.w, S = t.F, x = t.r, E = t.B, k = t.C, D = t.D, A = t.g, B = t.E, V = t.G, R = t.H, C = t.l, O = t.m
    }, t => {
      I = t.u
    }],
    execute: function() {
      const t = {
          class: "absolute top-10 left-6 items-center md:inline-flex md:top-7"
        },
        e = ["src"],
        M = r({
          __name: "Logo",
          props: {
            src: {
              type: String,
              default: ""
            }
          },
          setup: r => (o, a) => (i(), n("div", t, [s("img", {
            class: "h-4.5",
            src: r.src
          }, null, 8, e)]))
        }),
        L = {
          class: "absolute inset-0 flex items-start justify-center md:items-center"
        },
        N = {
          class: "w-full min-h-screen bg-card md:relative md:w-182.5 md:h-125 md:min-h-0 md:rounded-lg md:shadow-sm dark:bg-carddark"
        },
        P = r({
          __name: "Frame",
          props: {
            iconUrl: {
              type: String,
              default: ""
            }
          },
          setup: t => (e, r) => (i(), n("div", L, [s("div", N, [o(M, {
            src: t.iconUrl
          }, null, 8, ["src"]), a(e.$slots, "default")])]))
        });

      function _(t) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
      }

      function q(t, e) {
        return t & e
      }

      function j(t, e) {
        return t | e
      }

      function H(t, e) {
        return t ^ e
      }

      function U(t, e) {
        return t & ~e
      }

      function F(t) {
        if (0 == t) return -1;
        var e = 0;
        return 65535 & t || (t >>= 16, e += 16), 255 & t || (t >>= 8, e += 8), 15 & t || (t >>= 4, e += 4), 3 & t || (t >>= 2, e += 2), 1 & t || ++e, e
      }

      function K(t) {
        for (var e = 0; 0 != t;) t &= t - 1, ++e;
        return e
      }
      var z, $ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

      function Z(t) {
        var e, r, i = "";
        for (e = 0; e + 3 <= t.length; e += 3) r = parseInt(t.substring(e, e + 3), 16), i += $.charAt(r >> 6) + $.charAt(63 & r);
        for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16), i += $.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16), i += $.charAt(r >> 2) + $.charAt((3 & r) << 4));
          (3 & i.length) > 0;) i += "=";
        return i
      }

      function G(t) {
        var e, r = "",
          i = 0,
          n = 0;
        for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
          var s = $.indexOf(t.charAt(e));
          s < 0 || (0 == i ? (r += _(s >> 2), n = 3 & s, i = 1) : 1 == i ? (r += _(n << 2 | s >> 4), n = 15 & s, i = 2) : 2 == i ? (r += _(n), r += _(s >> 2), n = 3 & s, i = 3) : (r += _(n << 2 | s >> 4), r += _(15 & s), i = 0))
        }
        return 1 == i && (r += _(n << 2)), r
      }
      var W, Q = function(t) {
          var e;
          if (void 0 === z) {
            var r = "0123456789ABCDEF",
              i = " \f\n\r\t \u2028\u2029";
            for (z = {}, e = 0; e < 16; ++e) z[r.charAt(e)] = e;
            for (r = r.toLowerCase(), e = 10; e < 16; ++e) z[r.charAt(e)] = e;
            for (e = 0; e < 8; ++e) z[i.charAt(e)] = -1
          }
          var n = [],
            s = 0,
            o = 0;
          for (e = 0; e < t.length; ++e) {
            var a = t.charAt(e);
            if ("=" == a) break;
            if (-1 != (a = z[a])) {
              if (void 0 === a) throw new Error("Illegal character at offset " + e);
              s |= a, ++o >= 2 ? (n[n.length] = s, s = 0, o = 0) : s <<= 4
            }
          }
          if (o) throw new Error("Hex encoding incomplete: 4 bits missing");
          return n
        },
        Y = {
          decode: function(t) {
            var e;
            if (void 0 === W) {
              var r = "= \f\n\r\t \u2028\u2029";
              for (W = Object.create(null), e = 0; e < 64; ++e) W["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
              for (W["-"] = 62, W._ = 63, e = 0; e < 9; ++e) W[r.charAt(e)] = -1
            }
            var i = [],
              n = 0,
              s = 0;
            for (e = 0; e < t.length; ++e) {
              var o = t.charAt(e);
              if ("=" == o) break;
              if (-1 != (o = W[o])) {
                if (void 0 === o) throw new Error("Illegal character at offset " + e);
                n |= o, ++s >= 4 ? (i[i.length] = n >> 16, i[i.length] = n >> 8 & 255, i[i.length] = 255 & n, n = 0, s = 0) : n <<= 6
              }
            }
            switch (s) {
              case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
              case 2:
                i[i.length] = n >> 10;
                break;
              case 3:
                i[i.length] = n >> 16, i[i.length] = n >> 8 & 255
            }
            return i
          },
          re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
          unarmor: function(t) {
            var e = Y.re.exec(t);
            if (e)
              if (e[1]) t = e[1];
              else {
                if (!e[2]) throw new Error("RegExp out of sync");
                t = e[2]
              } return Y.decode(t)
          }
        },
        X = 1e13,
        J = function() {
          function t(t) {
            this.buf = [+t || 0]
          }
          return t.prototype.mulAdd = function(t, e) {
            var r, i, n = this.buf,
              s = n.length;
            for (r = 0; r < s; ++r)(i = n[r] * t + e) < X ? e = 0 : i -= (e = 0 | i / X) * X, n[r] = i;
            e > 0 && (n[r] = e)
          }, t.prototype.sub = function(t) {
            var e, r, i = this.buf,
              n = i.length;
            for (e = 0; e < n; ++e)(r = i[e] - t) < 0 ? (r += X, t = 1) : t = 0, i[e] = r;
            for (; 0 === i[i.length - 1];) i.pop()
          }, t.prototype.toString = function(t) {
            if (10 != (t || 10)) throw new Error("only base 10 is supported");
            for (var e = this.buf, r = e[e.length - 1].toString(), i = e.length - 2; i >= 0; --i) r += (X + e[i]).toString().substring(1);
            return r
          }, t.prototype.valueOf = function() {
            for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r) e = e * X + t[r];
            return e
          }, t.prototype.simplify = function() {
            var t = this.buf;
            return 1 == t.length ? t[0] : this
          }, t
        }(),
        tt = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
        et = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

      function rt(t, e) {
        return t.length > e && (t = t.substring(0, e) + "…"), t
      }
      var it, nt = function() {
          function t(e, r) {
            this.hexDigits = "0123456789ABCDEF", e instanceof t ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = r)
          }
          return t.prototype.get = function(t) {
            if (void 0 === t && (t = this.pos++), t >= this.enc.length) throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
            return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
          }, t.prototype.hexByte = function(t) {
            return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
          }, t.prototype.hexDump = function(t, e, r) {
            for (var i = "", n = t; n < e; ++n)
              if (i += this.hexByte(this.get(n)), !0 !== r) switch (15 & n) {
                case 7:
                  i += "  ";
                  break;
                case 15:
                  i += "\n";
                  break;
                default:
                  i += " "
              }
            return i
          }, t.prototype.isASCII = function(t, e) {
            for (var r = t; r < e; ++r) {
              var i = this.get(r);
              if (i < 32 || i > 176) return !1
            }
            return !0
          }, t.prototype.parseStringISO = function(t, e) {
            for (var r = "", i = t; i < e; ++i) r += String.fromCharCode(this.get(i));
            return r
          }, t.prototype.parseStringUTF = function(t, e) {
            for (var r = "", i = t; i < e;) {
              var n = this.get(i++);
              r += n < 128 ? String.fromCharCode(n) : n > 191 && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(i++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
            }
            return r
          }, t.prototype.parseStringBMP = function(t, e) {
            for (var r, i, n = "", s = t; s < e;) r = this.get(s++), i = this.get(s++), n += String.fromCharCode(r << 8 | i);
            return n
          }, t.prototype.parseTime = function(t, e, r) {
            var i = this.parseStringISO(t, e),
              n = (r ? tt : et).exec(i);
            return n ? (r && (n[1] = +n[1], n[1] += +n[1] < 70 ? 2e3 : 1900), i = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4], n[5] && (i += ":" + n[5], n[6] && (i += ":" + n[6], n[7] && (i += "." + n[7]))), n[8] && (i += " UTC", "Z" != n[8] && (i += n[8], n[9] && (i += ":" + n[9]))), i) : "Unrecognized time: " + i
          }, t.prototype.parseInteger = function(t, e) {
            for (var r, i = this.get(t), n = i > 127, s = n ? 255 : 0, o = ""; i == s && ++t < e;) i = this.get(t);
            if (0 === (r = e - t)) return n ? -1 : 0;
            if (r > 4) {
              for (o = i, r <<= 3; !(128 & (+o ^ s));) o = +o << 1, --r;
              o = "(" + r + " bit)\n"
            }
            n && (i -= 256);
            for (var a = new J(i), u = t + 1; u < e; ++u) a.mulAdd(256, this.get(u));
            return o + a.toString()
          }, t.prototype.parseBitString = function(t, e, r) {
            for (var i = this.get(t), n = "(" + ((e - t - 1 << 3) - i) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
              for (var a = this.get(o), u = o == e - 1 ? i : 0, h = 7; h >= u; --h) s += a >> h & 1 ? "1" : "0";
              if (s.length > r) return n + rt(s, r)
            }
            return n + s
          }, t.prototype.parseOctetString = function(t, e, r) {
            if (this.isASCII(t, e)) return rt(this.parseStringISO(t, e), r);
            var i = e - t,
              n = "(" + i + " byte)\n";
            i > (r /= 2) && (e = t + r);
            for (var s = t; s < e; ++s) n += this.hexByte(this.get(s));
            return i > r && (n += "…"), n
          }, t.prototype.parseOID = function(t, e, r) {
            for (var i = "", n = new J, s = 0, o = t; o < e; ++o) {
              var a = this.get(o);
              if (n.mulAdd(128, 127 & a), s += 7, !(128 & a)) {
                if ("" === i)
                  if ((n = n.simplify()) instanceof J) n.sub(80), i = "2." + n.toString();
                  else {
                    var u = n < 80 ? n < 40 ? 0 : 1 : 2;
                    i = u + "." + (n - 40 * u)
                  }
                else i += "." + n.toString();
                if (i.length > r) return rt(i, r);
                n = new J, s = 0
              }
            }
            return s > 0 && (i += ".incomplete"), i
          }, t
        }(),
        st = function() {
          function t(t, e, r, i, n) {
            if (!(i instanceof ot)) throw new Error("Invalid tag value.");
            this.stream = t, this.header = e, this.length = r, this.tag = i, this.sub = n
          }
          return t.prototype.typeName = function() {
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
          }, t.prototype.content = function(t) {
            if (void 0 === this.tag) return null;
            void 0 === t && (t = 1 / 0);
            var e = this.posContent(),
              r = Math.abs(this.length);
            if (!this.tag.isUniversal()) return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
            switch (this.tag.tagNumber) {
              case 1:
                return 0 === this.stream.get(e) ? "false" : "true";
              case 2:
                return this.stream.parseInteger(e, e + r);
              case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
              case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
              case 6:
                return this.stream.parseOID(e, e + r, t);
              case 16:
              case 17:
                return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
              case 12:
                return rt(this.stream.parseStringUTF(e, e + r), t);
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
              case 26:
                return rt(this.stream.parseStringISO(e, e + r), t);
              case 30:
                return rt(this.stream.parseStringBMP(e, e + r), t);
              case 23:
              case 24:
                return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
            }
            return null
          }, t.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
          }, t.prototype.toPrettyString = function(t) {
            void 0 === t && (t = "");
            var e = t + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0 && (e += "+"), e += this.length, this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"), e += "\n", null !== this.sub) {
              t += "  ";
              for (var r = 0, i = this.sub.length; r < i; ++r) e += this.sub[r].toPrettyString(t)
            }
            return e
          }, t.prototype.posStart = function() {
            return this.stream.pos
          }, t.prototype.posContent = function() {
            return this.stream.pos + this.header
          }, t.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
          }, t.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
          }, t.decodeLength = function(t) {
            var e = t.get(),
              r = 127 & e;
            if (r == e) return r;
            if (r > 6) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
            if (0 === r) return null;
            e = 0;
            for (var i = 0; i < r; ++i) e = 256 * e + t.get();
            return e
          }, t.prototype.getHexStringValue = function() {
            var t = this.toHexString(),
              e = 2 * this.header,
              r = 2 * this.length;
            return t.substring(e, e + r)
          }, t.decode = function(e) {
            var r;
            r = e instanceof nt ? e : new nt(e, 0);
            var i = new nt(r),
              n = new ot(r),
              s = t.decodeLength(r),
              o = r.pos,
              a = o - i.pos,
              u = null,
              h = function() {
                var e = [];
                if (null !== s) {
                  for (var i = o + s; r.pos < i;) e[e.length] = t.decode(r);
                  if (r.pos != i) throw new Error("Content size is not correct for container starting at offset " + o)
                } else try {
                  for (;;) {
                    var n = t.decode(r);
                    if (n.tag.isEOC()) break;
                    e[e.length] = n
                  }
                  s = o - r.pos
                } catch (a) {
                  throw new Error("Exception while decoding undefined length content: " + a)
                }
                return e
              };
            if (n.tagConstructed) u = h();
            else if (n.isUniversal() && (3 == n.tagNumber || 4 == n.tagNumber)) try {
              if (3 == n.tagNumber && 0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              u = h();
              for (var l = 0; l < u.length; ++l)
                if (u[l].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
            } catch (c) {
              u = null
            }
            if (null === u) {
              if (null === s) throw new Error("We can't skip over an invalid tag with undefined length at offset " + o);
              r.pos = o + Math.abs(s)
            }
            return new t(i, a, s, n, u)
          }, t
        }(),
        ot = function() {
          function t(t) {
            var e = t.get();
            if (this.tagClass = e >> 6, this.tagConstructed = !!(32 & e), this.tagNumber = 31 & e, 31 == this.tagNumber) {
              var r = new J;
              do {
                e = t.get(), r.mulAdd(128, 127 & e)
              } while (128 & e);
              this.tagNumber = r.simplify()
            }
          }
          return t.prototype.isUniversal = function() {
            return 0 === this.tagClass
          }, t.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber
          }, t
        }(),
        at = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        ut = (1 << 26) / at[at.length - 1],
        ht = function() {
          function t(t, e, r) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
          }
          return t.prototype.toString = function(t) {
            if (this.s < 0) return "-" + this.negate().toString(t);
            var e;
            if (16 == t) e = 4;
            else if (8 == t) e = 3;
            else if (2 == t) e = 1;
            else if (32 == t) e = 5;
            else {
              if (4 != t) return this.toRadix(t);
              e = 2
            }
            var r, i = (1 << e) - 1,
              n = !1,
              s = "",
              o = this.t,
              a = this.DB - o * this.DB % e;
            if (o-- > 0)
              for (a < this.DB && (r = this[o] >> a) > 0 && (n = !0, s = _(r)); o >= 0;) a < e ? (r = (this[o] & (1 << a) - 1) << e - a, r |= this[--o] >> (a += this.DB - e)) : (r = this[o] >> (a -= e) & i, a <= 0 && (a += this.DB, --o)), r > 0 && (n = !0), n && (s += _(r));
            return n ? s : "0"
          }, t.prototype.negate = function() {
            var e = pt();
            return t.ZERO.subTo(this, e), e
          }, t.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
          }, t.prototype.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e) return e;
            var r = this.t;
            if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;
            for (; --r >= 0;)
              if (0 != (e = this[r] - t[r])) return e;
            return 0
          }, t.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + St(this[this.t - 1] ^ this.s & this.DM)
          }, t.prototype.mod = function(e) {
            var r = pt();
            return this.abs().divRemTo(e, null, r), this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r), r
          }, t.prototype.modPowInt = function(t, e) {
            var r;
            return r = t < 256 || e.isEven() ? new ct(e) : new dt(e), this.exp(t, r)
          }, t.prototype.clone = function() {
            var t = pt();
            return this.copyTo(t), t
          }, t.prototype.intValue = function() {
            if (this.s < 0) {
              if (1 == this.t) return this[0] - this.DV;
              if (0 == this.t) return -1
            } else {
              if (1 == this.t) return this[0];
              if (0 == this.t) return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
          }, t.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
          }, t.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
          }, t.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
          }, t.prototype.toByteArray = function() {
            var t = this.t,
              e = [];
            e[0] = this.s;
            var r, i = this.DB - t * this.DB % 8,
              n = 0;
            if (t-- > 0)
              for (i < this.DB && (r = this[t] >> i) != (this.s & this.DM) >> i && (e[n++] = r | this.s << this.DB - i); t >= 0;) i < 8 ? (r = (this[t] & (1 << i) - 1) << 8 - i, r |= this[--t] >> (i += this.DB - 8)) : (r = this[t] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --t)), 128 & r && (r |= -256), 0 == n && (128 & this.s) != (128 & r) && ++n, (n > 0 || r != this.s) && (e[n++] = r);
            return e
          }, t.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
          }, t.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
          }, t.prototype.max = function(t) {
            return this.compareTo(t) > 0 ? this : t
          }, t.prototype.and = function(t) {
            var e = pt();
            return this.bitwiseTo(t, q, e), e
          }, t.prototype.or = function(t) {
            var e = pt();
            return this.bitwiseTo(t, j, e), e
          }, t.prototype.xor = function(t) {
            var e = pt();
            return this.bitwiseTo(t, H, e), e
          }, t.prototype.andNot = function(t) {
            var e = pt();
            return this.bitwiseTo(t, U, e), e
          }, t.prototype.not = function() {
            for (var t = pt(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
            return t.t = this.t, t.s = ~this.s, t
          }, t.prototype.shiftLeft = function(t) {
            var e = pt();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
          }, t.prototype.shiftRight = function(t) {
            var e = pt();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
          }, t.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
              if (0 != this[t]) return t * this.DB + F(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
          }, t.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += K(this[r] ^ e);
            return t
          }, t.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : !!(this[e] & 1 << t % this.DB)
          }, t.prototype.setBit = function(t) {
            return this.changeBit(t, j)
          }, t.prototype.clearBit = function(t) {
            return this.changeBit(t, U)
          }, t.prototype.flipBit = function(t) {
            return this.changeBit(t, H)
          }, t.prototype.add = function(t) {
            var e = pt();
            return this.addTo(t, e), e
          }, t.prototype.subtract = function(t) {
            var e = pt();
            return this.subTo(t, e), e
          }, t.prototype.multiply = function(t) {
            var e = pt();
            return this.multiplyTo(t, e), e
          }, t.prototype.divide = function(t) {
            var e = pt();
            return this.divRemTo(t, e, null), e
          }, t.prototype.remainder = function(t) {
            var e = pt();
            return this.divRemTo(t, null, e), e
          }, t.prototype.divideAndRemainder = function(t) {
            var e = pt(),
              r = pt();
            return this.divRemTo(t, e, r), [e, r]
          }, t.prototype.modPow = function(t, e) {
            var r, i, n = t.bitLength(),
              s = Tt(1);
            if (n <= 0) return s;
            r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6, i = n < 8 ? new ct(e) : e.isEven() ? new ft(e) : new dt(e);
            var o = [],
              a = 3,
              u = r - 1,
              h = (1 << r) - 1;
            if (o[1] = i.convert(this), r > 1) {
              var l = pt();
              for (i.sqrTo(o[1], l); a <= h;) o[a] = pt(), i.mulTo(l, o[a - 2], o[a]), a += 2
            }
            var c, d, f = t.t - 1,
              p = !0,
              g = pt();
            for (n = St(t[f]) - 1; f >= 0;) {
              for (n >= u ? c = t[f] >> n - u & h : (c = (t[f] & (1 << n + 1) - 1) << u - n, f > 0 && (c |= t[f - 1] >> this.DB + n - u)), a = r; !(1 & c);) c >>= 1, --a;
              if ((n -= a) < 0 && (n += this.DB, --f), p) o[c].copyTo(s), p = !1;
              else {
                for (; a > 1;) i.sqrTo(s, g), i.sqrTo(g, s), a -= 2;
                a > 0 ? i.sqrTo(s, g) : (d = s, s = g, g = d), i.mulTo(g, o[c], s)
              }
              for (; f >= 0 && !(t[f] & 1 << n);) i.sqrTo(s, g), d = s, s = g, g = d, --n < 0 && (n = this.DB - 1, --f)
            }
            return i.revert(s)
          }, t.prototype.modInverse = function(e) {
            var r = e.isEven();
            if (this.isEven() && r || 0 == e.signum()) return t.ZERO;
            for (var i = e.clone(), n = this.clone(), s = Tt(1), o = Tt(0), a = Tt(0), u = Tt(1); 0 != i.signum();) {
              for (; i.isEven();) i.rShiftTo(1, i), r ? (s.isEven() && o.isEven() || (s.addTo(this, s), o.subTo(e, o)), s.rShiftTo(1, s)) : o.isEven() || o.subTo(e, o), o.rShiftTo(1, o);
              for (; n.isEven();) n.rShiftTo(1, n), r ? (a.isEven() && u.isEven() || (a.addTo(this, a), u.subTo(e, u)), a.rShiftTo(1, a)) : u.isEven() || u.subTo(e, u), u.rShiftTo(1, u);
              i.compareTo(n) >= 0 ? (i.subTo(n, i), r && s.subTo(a, s), o.subTo(u, o)) : (n.subTo(i, n), r && a.subTo(s, a), u.subTo(o, u))
            }
            return 0 != n.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u), u.signum() < 0 ? u.add(e) : u) : u
          }, t.prototype.pow = function(t) {
            return this.exp(t, new lt)
          }, t.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone(),
              r = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(r) < 0) {
              var i = e;
              e = r, r = i
            }
            var n = e.getLowestSetBit(),
              s = r.getLowestSetBit();
            if (s < 0) return e;
            for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), r.rShiftTo(s, r)); e.signum() > 0;)(n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r), e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r));
            return s > 0 && r.lShiftTo(s, r), r
          }, t.prototype.isProbablePrime = function(t) {
            var e, r = this.abs();
            if (1 == r.t && r[0] <= at[at.length - 1]) {
              for (e = 0; e < at.length; ++e)
                if (r[0] == at[e]) return !0;
              return !1
            }
            if (r.isEven()) return !1;
            for (e = 1; e < at.length;) {
              for (var i = at[e], n = e + 1; n < at.length && i < ut;) i *= at[n++];
              for (i = r.modInt(i); e < n;)
                if (i % at[e++] == 0) return !1
            }
            return r.millerRabin(t)
          }, t.prototype.copyTo = function(t) {
            for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
            t.t = this.t, t.s = this.s
          }, t.prototype.fromInt = function(t) {
            this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
          }, t.prototype.fromString = function(e, r) {
            var i;
            if (16 == r) i = 4;
            else if (8 == r) i = 3;
            else if (256 == r) i = 8;
            else if (2 == r) i = 1;
            else if (32 == r) i = 5;
            else {
              if (4 != r) return void this.fromRadix(e, r);
              i = 2
            }
            this.t = 0, this.s = 0;
            for (var n = e.length, s = !1, o = 0; --n >= 0;) {
              var a = 8 == i ? 255 & +e[n] : wt(e, n);
              a < 0 ? "-" == e.charAt(n) && (s = !0) : (s = !1, 0 == o ? this[this.t++] = a : o + i > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o, this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o, (o += i) >= this.DB && (o -= this.DB))
            }
            8 == i && 128 & +e[0] && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), s && t.ZERO.subTo(this, this)
          }, t.prototype.clamp = function() {
            for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
          }, t.prototype.dlShiftTo = function(t, e) {
            var r;
            for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r];
            for (r = t - 1; r >= 0; --r) e[r] = 0;
            e.t = this.t + t, e.s = this.s
          }, t.prototype.drShiftTo = function(t, e) {
            for (var r = t; r < this.t; ++r) e[r - t] = this[r];
            e.t = Math.max(this.t - t, 0), e.s = this.s
          }, t.prototype.lShiftTo = function(t, e) {
            for (var r = t % this.DB, i = this.DB - r, n = (1 << i) - 1, s = Math.floor(t / this.DB), o = this.s << r & this.DM, a = this.t - 1; a >= 0; --a) e[a + s + 1] = this[a] >> i | o, o = (this[a] & n) << r;
            for (a = s - 1; a >= 0; --a) e[a] = 0;
            e[s] = o, e.t = this.t + s + 1, e.s = this.s, e.clamp()
          }, t.prototype.rShiftTo = function(t, e) {
            e.s = this.s;
            var r = Math.floor(t / this.DB);
            if (r >= this.t) e.t = 0;
            else {
              var i = t % this.DB,
                n = this.DB - i,
                s = (1 << i) - 1;
              e[0] = this[r] >> i;
              for (var o = r + 1; o < this.t; ++o) e[o - r - 1] |= (this[o] & s) << n, e[o - r] = this[o] >> i;
              i > 0 && (e[this.t - r - 1] |= (this.s & s) << n), e.t = this.t - r, e.clamp()
            }
          }, t.prototype.subTo = function(t, e) {
            for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n;) i += this[r] - t[r], e[r++] = i & this.DM, i >>= this.DB;
            if (t.t < this.t) {
              for (i -= t.s; r < this.t;) i += this[r], e[r++] = i & this.DM, i >>= this.DB;
              i += this.s
            } else {
              for (i += this.s; r < t.t;) i -= t[r], e[r++] = i & this.DM, i >>= this.DB;
              i -= t.s
            }
            e.s = i < 0 ? -1 : 0, i < -1 ? e[r++] = this.DV + i : i > 0 && (e[r++] = i), e.t = r, e.clamp()
          }, t.prototype.multiplyTo = function(e, r) {
            var i = this.abs(),
              n = e.abs(),
              s = i.t;
            for (r.t = s + n.t; --s >= 0;) r[s] = 0;
            for (s = 0; s < n.t; ++s) r[s + i.t] = i.am(0, n[s], r, s, 0, i.t);
            r.s = 0, r.clamp(), this.s != e.s && t.ZERO.subTo(r, r)
          }, t.prototype.squareTo = function(t) {
            for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;) t[r] = 0;
            for (r = 0; r < e.t - 1; ++r) {
              var i = e.am(r, e[r], t, 2 * r, 0, 1);
              (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1)
            }
            t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
          }, t.prototype.divRemTo = function(e, r, i) {
            var n = e.abs();
            if (!(n.t <= 0)) {
              var s = this.abs();
              if (s.t < n.t) return null != r && r.fromInt(0), void(null != i && this.copyTo(i));
              null == i && (i = pt());
              var o = pt(),
                a = this.s,
                u = e.s,
                h = this.DB - St(n[n.t - 1]);
              h > 0 ? (n.lShiftTo(h, o), s.lShiftTo(h, i)) : (n.copyTo(o), s.copyTo(i));
              var l = o.t,
                c = o[l - 1];
              if (0 != c) {
                var d = c * (1 << this.F1) + (l > 1 ? o[l - 2] >> this.F2 : 0),
                  f = this.FV / d,
                  p = (1 << this.F1) / d,
                  g = 1 << this.F2,
                  m = i.t,
                  v = m - l,
                  y = null == r ? pt() : r;
                for (o.dlShiftTo(v, y), i.compareTo(y) >= 0 && (i[i.t++] = 1, i.subTo(y, i)), t.ONE.dlShiftTo(l, y), y.subTo(o, o); o.t < l;) o[o.t++] = 0;
                for (; --v >= 0;) {
                  var b = i[--m] == c ? this.DM : Math.floor(i[m] * f + (i[m - 1] + g) * p);
                  if ((i[m] += o.am(0, b, i, v, 0, l)) < b)
                    for (o.dlShiftTo(v, y), i.subTo(y, i); i[m] < --b;) i.subTo(y, i)
                }
                null != r && (i.drShiftTo(l, r), a != u && t.ZERO.subTo(r, r)), i.t = l, i.clamp(), h > 0 && i.rShiftTo(h, i), a < 0 && t.ZERO.subTo(i, i)
              }
            }
          }, t.prototype.invDigit = function() {
            if (this.t < 1) return 0;
            var t = this[0];
            if (!(1 & t)) return 0;
            var e = 3 & t;
            return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
          }, t.prototype.isEven = function() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
          }, t.prototype.exp = function(e, r) {
            if (e > 4294967295 || e < 1) return t.ONE;
            var i = pt(),
              n = pt(),
              s = r.convert(this),
              o = St(e) - 1;
            for (s.copyTo(i); --o >= 0;)
              if (r.sqrTo(i, n), (e & 1 << o) > 0) r.mulTo(n, s, i);
              else {
                var a = i;
                i = n, n = a
              } return r.revert(i)
          }, t.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
          }, t.prototype.toRadix = function(t) {
            if (null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36) return "0";
            var e = this.chunkSize(t),
              r = Math.pow(t, e),
              i = Tt(r),
              n = pt(),
              s = pt(),
              o = "";
            for (this.divRemTo(i, n, s); n.signum() > 0;) o = (r + s.intValue()).toString(t).substring(1) + o, n.divRemTo(i, n, s);
            return s.intValue().toString(t) + o
          }, t.prototype.fromRadix = function(e, r) {
            this.fromInt(0), null == r && (r = 10);
            for (var i = this.chunkSize(r), n = Math.pow(r, i), s = !1, o = 0, a = 0, u = 0; u < e.length; ++u) {
              var h = wt(e, u);
              h < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (s = !0) : (a = r * a + h, ++o >= i && (this.dMultiply(n), this.dAddOffset(a, 0), o = 0, a = 0))
            }
            o > 0 && (this.dMultiply(Math.pow(r, o)), this.dAddOffset(a, 0)), s && t.ZERO.subTo(this, this)
          }, t.prototype.fromNumber = function(e, r, i) {
            if ("number" == typeof r)
              if (e < 2) this.fromInt(1);
              else
                for (this.fromNumber(e, i), this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), j, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
            else {
              var n = [],
                s = 7 & e;
              n.length = 1 + (e >> 3), r.nextBytes(n), s > 0 ? n[0] &= (1 << s) - 1 : n[0] = 0, this.fromString(n, 256)
            }
          }, t.prototype.bitwiseTo = function(t, e, r) {
            var i, n, s = Math.min(t.t, this.t);
            for (i = 0; i < s; ++i) r[i] = e(this[i], t[i]);
            if (t.t < this.t) {
              for (n = t.s & this.DM, i = s; i < this.t; ++i) r[i] = e(this[i], n);
              r.t = this.t
            } else {
              for (n = this.s & this.DM, i = s; i < t.t; ++i) r[i] = e(n, t[i]);
              r.t = t.t
            }
            r.s = e(this.s, t.s), r.clamp()
          }, t.prototype.changeBit = function(e, r) {
            var i = t.ONE.shiftLeft(e);
            return this.bitwiseTo(i, r, i), i
          }, t.prototype.addTo = function(t, e) {
            for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n;) i += this[r] + t[r], e[r++] = i & this.DM, i >>= this.DB;
            if (t.t < this.t) {
              for (i += t.s; r < this.t;) i += this[r], e[r++] = i & this.DM, i >>= this.DB;
              i += this.s
            } else {
              for (i += this.s; r < t.t;) i += t[r], e[r++] = i & this.DM, i >>= this.DB;
              i += t.s
            }
            e.s = i < 0 ? -1 : 0, i > 0 ? e[r++] = i : i < -1 && (e[r++] = this.DV + i), e.t = r, e.clamp()
          }, t.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
          }, t.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
              for (; this.t <= e;) this[this.t++] = 0;
              for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
            }
          }, t.prototype.multiplyLowerTo = function(t, e, r) {
            var i = Math.min(this.t + t.t, e);
            for (r.s = 0, r.t = i; i > 0;) r[--i] = 0;
            for (var n = r.t - this.t; i < n; ++i) r[i + this.t] = this.am(0, t[i], r, i, 0, this.t);
            for (n = Math.min(t.t, e); i < n; ++i) this.am(0, t[i], r, i, 0, e - i);
            r.clamp()
          }, t.prototype.multiplyUpperTo = function(t, e, r) {
            --e;
            var i = r.t = this.t + t.t - e;
            for (r.s = 0; --i >= 0;) r[i] = 0;
            for (i = Math.max(e - this.t, 0); i < t.t; ++i) r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);
            r.clamp(), r.drShiftTo(1, r)
          }, t.prototype.modInt = function(t) {
            if (t <= 0) return 0;
            var e = this.DV % t,
              r = this.s < 0 ? t - 1 : 0;
            if (this.t > 0)
              if (0 == e) r = this[0] % t;
              else
                for (var i = this.t - 1; i >= 0; --i) r = (e * r + this[i]) % t;
            return r
          }, t.prototype.millerRabin = function(e) {
            var r = this.subtract(t.ONE),
              i = r.getLowestSetBit();
            if (i <= 0) return !1;
            var n = r.shiftRight(i);
            (e = e + 1 >> 1) > at.length && (e = at.length);
            for (var s = pt(), o = 0; o < e; ++o) {
              s.fromInt(at[Math.floor(Math.random() * at.length)]);
              var a = s.modPow(n, this);
              if (0 != a.compareTo(t.ONE) && 0 != a.compareTo(r)) {
                for (var u = 1; u++ < i && 0 != a.compareTo(r);)
                  if (0 == (a = a.modPowInt(2, this)).compareTo(t.ONE)) return !1;
                if (0 != a.compareTo(r)) return !1
              }
            }
            return !0
          }, t.prototype.square = function() {
            var t = pt();
            return this.squareTo(t), t
          }, t.prototype.gcda = function(t, e) {
            var r = this.s < 0 ? this.negate() : this.clone(),
              i = t.s < 0 ? t.negate() : t.clone();
            if (r.compareTo(i) < 0) {
              var n = r;
              r = i, i = n
            }
            var s = r.getLowestSetBit(),
              o = i.getLowestSetBit();
            if (o < 0) e(r);
            else {
              s < o && (o = s), o > 0 && (r.rShiftTo(o, r), i.rShiftTo(o, i));
              var a = function() {
                (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i), r.compareTo(i) >= 0 ? (r.subTo(i, r), r.rShiftTo(1, r)) : (i.subTo(r, i), i.rShiftTo(1, i)), r.signum() > 0 ? setTimeout(a, 0) : (o > 0 && i.lShiftTo(o, i), setTimeout(function() {
                  e(i)
                }, 0))
              };
              setTimeout(a, 10)
            }
          }, t.prototype.fromNumberAsync = function(e, r, i, n) {
            if ("number" == typeof r)
              if (e < 2) this.fromInt(1);
              else {
                this.fromNumber(e, i), this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), j, this), this.isEven() && this.dAddOffset(1, 0);
                var s = this,
                  o = function() {
                    s.dAddOffset(2, 0), s.bitLength() > e && s.subTo(t.ONE.shiftLeft(e - 1), s), s.isProbablePrime(r) ? setTimeout(function() {
                      n()
                    }, 0) : setTimeout(o, 0)
                  };
                setTimeout(o, 0)
              }
            else {
              var a = [],
                u = 7 & e;
              a.length = 1 + (e >> 3), r.nextBytes(a), u > 0 ? a[0] &= (1 << u) - 1 : a[0] = 0, this.fromString(a, 256)
            }
          }, t
        }(),
        lt = function() {
          function t() {}
          return t.prototype.convert = function(t) {
            return t
          }, t.prototype.revert = function(t) {
            return t
          }, t.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r)
          }, t.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
          }, t
        }(),
        ct = function() {
          function t(t) {
            this.m = t
          }
          return t.prototype.convert = function(t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
          }, t.prototype.revert = function(t) {
            return t
          }, t.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
          }, t.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
          }, t.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
          }, t
        }(),
        dt = function() {
          function t(t) {
            this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
          }
          return t.prototype.convert = function(t) {
            var e = pt();
            return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(ht.ZERO) > 0 && this.m.subTo(e, e), e
          }, t.prototype.revert = function(t) {
            var e = pt();
            return t.copyTo(e), this.reduce(e), e
          }, t.prototype.reduce = function(t) {
            for (; t.t <= this.mt2;) t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
              var r = 32767 & t[e],
                i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
              for (t[r = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
            }
            t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
          }, t.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
          }, t.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
          }, t
        }(),
        ft = function() {
          function t(t) {
            this.m = t, this.r2 = pt(), this.q3 = pt(), ht.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t)
          }
          return t.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
            if (t.compareTo(this.m) < 0) return t;
            var e = pt();
            return t.copyTo(e), this.reduce(e), e
          }, t.prototype.revert = function(t) {
            return t
          }, t.prototype.reduce = function(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
          }, t.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
          }, t.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
          }, t
        }();

      function pt() {
        return new ht(null)
      }

      function gt(t, e) {
        return new ht(t, e)
      }
      var mt = "undefined" != typeof navigator;
      mt && "Microsoft Internet Explorer" == navigator.appName ? (ht.prototype.am = function(t, e, r, i, n, s) {
        for (var o = 32767 & e, a = e >> 15; --s >= 0;) {
          var u = 32767 & this[t],
            h = this[t++] >> 15,
            l = a * u + h * o;
          n = ((u = o * u + ((32767 & l) << 15) + r[i] + (1073741823 & n)) >>> 30) + (l >>> 15) + a * h + (n >>> 30), r[i++] = 1073741823 & u
        }
        return n
      }, it = 30) : mt && "Netscape" != navigator.appName ? (ht.prototype.am = function(t, e, r, i, n, s) {
        for (; --s >= 0;) {
          var o = e * this[t++] + r[i] + n;
          n = Math.floor(o / 67108864), r[i++] = 67108863 & o
        }
        return n
      }, it = 26) : (ht.prototype.am = function(t, e, r, i, n, s) {
        for (var o = 16383 & e, a = e >> 14; --s >= 0;) {
          var u = 16383 & this[t],
            h = this[t++] >> 14,
            l = a * u + h * o;
          n = ((u = o * u + ((16383 & l) << 14) + r[i] + n) >> 28) + (l >> 14) + a * h, r[i++] = 268435455 & u
        }
        return n
      }, it = 28), ht.prototype.DB = it, ht.prototype.DM = (1 << it) - 1, ht.prototype.DV = 1 << it, ht.prototype.FV = Math.pow(2, 52), ht.prototype.F1 = 52 - it, ht.prototype.F2 = 2 * it - 52;
      var vt, yt, bt = [];
      for (vt = "0".charCodeAt(0), yt = 0; yt <= 9; ++yt) bt[vt++] = yt;
      for (vt = "a".charCodeAt(0), yt = 10; yt < 36; ++yt) bt[vt++] = yt;
      for (vt = "A".charCodeAt(0), yt = 10; yt < 36; ++yt) bt[vt++] = yt;

      function wt(t, e) {
        var r = bt[t.charCodeAt(e)];
        return null == r ? -1 : r
      }

      function Tt(t) {
        var e = pt();
        return e.fromInt(t), e
      }

      function St(t) {
        var e, r = 1;
        return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r
      }
      ht.ZERO = Tt(0), ht.ONE = Tt(1);
      var xt, Et, kt = function() {
          function t() {
            this.i = 0, this.j = 0, this.S = []
          }
          return t.prototype.init = function(t) {
            var e, r, i;
            for (e = 0; e < 256; ++e) this.S[e] = e;
            for (r = 0, e = 0; e < 256; ++e) r = r + this.S[e] + t[e % t.length] & 255, i = this.S[e], this.S[e] = this.S[r], this.S[r] = i;
            this.i = 0, this.j = 0
          }, t.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
          }, t
        }(),
        Dt = null;
      if (null == Dt) {
        Dt = [], Et = 0;
        var At = void 0;
        if ("undefined" != typeof window && self.crypto && self.crypto.getRandomValues) {
          var Bt = new Uint32Array(256);
          for (self.crypto.getRandomValues(Bt), At = 0; At < Bt.length; ++At) Dt[Et++] = 255 & Bt[At]
        }
        var Vt = 0,
          Rt = function(t) {
            if ((Vt = Vt || 0) >= 256 || Et >= 256) self.removeEventListener ? self.removeEventListener("mousemove", Rt, !1) : self.detachEvent && self.detachEvent("onmousemove", Rt);
            else try {
              var e = t.x + t.y;
              Dt[Et++] = 255 & e, Vt += 1
            } catch (r) {}
          };
        "undefined" != typeof window && (self.addEventListener ? self.addEventListener("mousemove", Rt, !1) : self.attachEvent && self.attachEvent("onmousemove", Rt))
      }

      function Ct() {
        if (null == xt) {
          for (xt = new kt; Et < 256;) {
            var t = Math.floor(65536 * Math.random());
            Dt[Et++] = 255 & t
          }
          for (xt.init(Dt), Et = 0; Et < Dt.length; ++Et) Dt[Et] = 0;
          Et = 0
        }
        return xt.next()
      }
      var Ot = function() {
        function t() {}
        return t.prototype.nextBytes = function(t) {
          for (var e = 0; e < t.length; ++e) t[e] = Ct()
        }, t
      }();

      function It(t) {
        return function(t) {
          for (var e = "", r = 0; r < 32 * t.length; r += 8) e += String.fromCharCode(t[r >> 5] >>> 24 - r % 32 & 255);
          return e
        }(function(t, e) {
          var r, i, n, s, o, a, u, h, l, c, d, f, p = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225),
            g = new Array(64);
          for (t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >> 9 << 4)] = e, l = 0; l < t.length; l += 16) {
            for (r = p[0], i = p[1], n = p[2], s = p[3], o = p[4], a = p[5], u = p[6], h = p[7], c = 0; c < 64; c++) g[c] = c < 16 ? t[c + l] : Kt(Kt(Kt(Ut(g[c - 2]), g[c - 7]), Ht(g[c - 15])), g[c - 16]), d = Kt(Kt(Kt(Kt(h, jt(o)), Pt(o, a, u)), Ft[c]), g[c]), f = Kt(qt(r), _t(r, i, n)), h = u, u = a, a = o, o = Kt(s, d), s = n, n = i, i = r, r = Kt(d, f);
            p[0] = Kt(r, p[0]), p[1] = Kt(i, p[1]), p[2] = Kt(n, p[2]), p[3] = Kt(s, p[3]), p[4] = Kt(o, p[4]), p[5] = Kt(a, p[5]), p[6] = Kt(u, p[6]), p[7] = Kt(h, p[7])
          }
          return p
        }(function(t) {
          for (var e = Array(t.length >> 2), r = 0; r < e.length; r++) e[r] = 0;
          for (r = 0; r < 8 * t.length; r += 8) e[r >> 5] |= (255 & t.charCodeAt(r / 8)) << 24 - r % 32;
          return e
        }(t), 8 * t.length))
      }

      function Mt(t) {
        for (var e = "0123456789abcdef", r = "", i = 0; i < t.length; i++) {
          var n = t.charCodeAt(i);
          r += e.charAt(n >>> 4 & 15) + e.charAt(15 & n)
        }
        return r
      }

      function Lt(t, e) {
        return t >>> e | t << 32 - e
      }

      function Nt(t, e) {
        return t >>> e
      }

      function Pt(t, e, r) {
        return t & e ^ ~t & r
      }

      function _t(t, e, r) {
        return t & e ^ t & r ^ e & r
      }

      function qt(t) {
        return Lt(t, 2) ^ Lt(t, 13) ^ Lt(t, 22)
      }

      function jt(t) {
        return Lt(t, 6) ^ Lt(t, 11) ^ Lt(t, 25)
      }

      function Ht(t) {
        return Lt(t, 7) ^ Lt(t, 18) ^ Nt(t, 3)
      }

      function Ut(t) {
        return Lt(t, 17) ^ Lt(t, 19) ^ Nt(t, 10)
      }
      var Ft = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998);

      function Kt(t, e) {
        var r = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (r >> 16) << 16 | 65535 & r
      }

      function zt(t, e) {
        if (e < t.length + 11) return console.error("Message too long for RSA"), null;
        for (var r = [], i = t.length - 1; i >= 0 && e > 0;) {
          var n = t.charCodeAt(i--);
          n < 128 ? r[--e] = n : n > 127 && n < 2048 ? (r[--e] = 63 & n | 128, r[--e] = n >> 6 | 192) : (r[--e] = 63 & n | 128, r[--e] = n >> 6 & 63 | 128, r[--e] = n >> 12 | 224)
        }
        r[--e] = 0;
        for (var s = new Ot, o = []; e > 2;) {
          for (o[0] = 0; 0 == o[0];) s.nextBytes(o);
          r[--e] = o[0]
        }
        return r[--e] = 2, r[--e] = 0, new ht(r)
      }

      function $t(t, e, r) {
        for (var i = "", n = 0; i.length < e;) i += r(String.fromCharCode.apply(String, t.concat([(4278190080 & n) >> 24, (16711680 & n) >> 16, (65280 & n) >> 8, 255 & n]))), n += 1;
        return i
      }

      function Zt(t, e) {
        var r = It;
        if (t.length + 64 + 2 > e) throw "Message too long for RSA";
        var i, n = "";
        for (i = 0; i < e - t.length - 64 - 2; i += 1) n += "\0";
        var s = r("") + n + "" + t,
          o = new Array(32);
        (new Ot).nextBytes(o);
        var a = $t(o, s.length, r),
          u = [];
        for (i = 0; i < s.length; i += 1) u[i] = s.charCodeAt(i) ^ a.charCodeAt(i);
        var h = $t(u, o.length, r),
          l = [0];
        for (i = 0; i < o.length; i += 1) l[i + 1] = o[i] ^ h.charCodeAt(i);
        return new ht(l.concat(u))
      }
      var Gt = function() {
          function t() {
            this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
          }
          return t.prototype.doPublic = function(t) {
            return t.modPowInt(this.e, this.n)
          }, t.prototype.doPrivate = function(t) {
            if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0;) e = e.add(this.p);
            return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
          }, t.prototype.setPublic = function(t, e) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = gt(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
          }, t.prototype.encrypt = function(t, e) {
            void 0 === e && (e = zt);
            var r = this.n.bitLength() + 7 >> 3,
              i = e(t, r);
            if (null == i) return null;
            var n = this.doPublic(i);
            if (null == n) return null;
            for (var s = n.toString(16), o = s.length, a = 0; a < 2 * r - o; a++) s = "0" + s;
            return s
          }, t.prototype.setPrivate = function(t, e, r) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = gt(t, 16), this.e = parseInt(e, 16), this.d = gt(r, 16)) : console.error("Invalid RSA private key")
          }, t.prototype.setPrivateEx = function(t, e, r, i, n, s, o, a) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = gt(t, 16), this.e = parseInt(e, 16), this.d = gt(r, 16), this.p = gt(i, 16), this.q = gt(n, 16), this.dmp1 = gt(s, 16), this.dmq1 = gt(o, 16), this.coeff = gt(a, 16)) : console.error("Invalid RSA private key")
          }, t.prototype.generate = function(t, e) {
            var r = new Ot,
              i = t >> 1;
            this.e = parseInt(e, 16);
            for (var n = new ht(e, 16);;) {
              for (; this.p = new ht(t - i, 1, r), 0 != this.p.subtract(ht.ONE).gcd(n).compareTo(ht.ONE) || !this.p.isProbablePrime(10););
              for (; this.q = new ht(i, 1, r), 0 != this.q.subtract(ht.ONE).gcd(n).compareTo(ht.ONE) || !this.q.isProbablePrime(10););
              if (this.p.compareTo(this.q) <= 0) {
                var s = this.p;
                this.p = this.q, this.q = s
              }
              var o = this.p.subtract(ht.ONE),
                a = this.q.subtract(ht.ONE),
                u = o.multiply(a);
              if (0 == u.gcd(n).compareTo(ht.ONE)) {
                this.n = this.p.multiply(this.q), this.d = n.modInverse(u), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(a), this.coeff = this.q.modInverse(this.p);
                break
              }
            }
          }, t.prototype.decrypt = function(t) {
            var e = gt(t, 16),
              r = this.doPrivate(e);
            return null == r ? null : function(t, e) {
              for (var r = t.toByteArray(), i = 0; i < r.length && 0 == r[i];) ++i;
              if (r.length - i != e - 1 || 2 != r[i]) return null;
              for (++i; 0 != r[i];)
                if (++i >= r.length) return null;
              for (var n = ""; ++i < r.length;) {
                var s = 255 & r[i];
                s < 128 ? n += String.fromCharCode(s) : s > 191 && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & r[i + 1]), ++i) : (n += String.fromCharCode((15 & s) << 12 | (63 & r[i + 1]) << 6 | 63 & r[i + 2]), i += 2)
              }
              return n
            }(r, this.n.bitLength() + 7 >> 3)
          }, t.prototype.generateAsync = function(t, e, r) {
            var i = new Ot,
              n = t >> 1;
            this.e = parseInt(e, 16);
            var s = new ht(e, 16),
              o = this,
              a = function() {
                var e = function() {
                    if (o.p.compareTo(o.q) <= 0) {
                      var t = o.p;
                      o.p = o.q, o.q = t
                    }
                    var e = o.p.subtract(ht.ONE),
                      i = o.q.subtract(ht.ONE),
                      n = e.multiply(i);
                    0 == n.gcd(s).compareTo(ht.ONE) ? (o.n = o.p.multiply(o.q), o.d = s.modInverse(n), o.dmp1 = o.d.mod(e), o.dmq1 = o.d.mod(i), o.coeff = o.q.modInverse(o.p), setTimeout(function() {
                      r()
                    }, 0)) : setTimeout(a, 0)
                  },
                  u = function() {
                    o.q = pt(), o.q.fromNumberAsync(n, 1, i, function() {
                      o.q.subtract(ht.ONE).gcda(s, function(t) {
                        0 == t.compareTo(ht.ONE) && o.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(u, 0)
                      })
                    })
                  },
                  h = function() {
                    o.p = pt(), o.p.fromNumberAsync(t - n, 1, i, function() {
                      o.p.subtract(ht.ONE).gcda(s, function(t) {
                        0 == t.compareTo(ht.ONE) && o.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(h, 0)
                      })
                    })
                  };
                setTimeout(h, 0)
              };
            setTimeout(a, 0)
          }, t.prototype.sign = function(t, e, r) {
            var i = (Wt[r] || "") + e(t).toString(),
              n = this.n.bitLength() / 4,
              s = function(t, e) {
                if (e < t.length + 22) return console.error("Message too long for RSA"), null;
                for (var r = e - t.length - 6, i = "", n = 0; n < r; n += 2) i += "ff";
                return gt("0001" + i + "00" + t, 16)
              }(i, n);
            if (null == s) return null;
            var o = this.doPrivate(s);
            if (null == o) return null;
            for (var a = o.toString(16), u = a.length, h = 0; h < n - u; h++) a = "0" + a;
            return a
          }, t.prototype.verify = function(t, e, r) {
            var i = gt(e, 16),
              n = this.doPublic(i);
            return null == n ? null : function(t) {
              for (var e in Wt)
                if (Wt.hasOwnProperty(e)) {
                  var r = Wt[e],
                    i = r.length;
                  if (t.substring(0, i) == r) return t.substring(i)
                } return t
            }(n.toString(16).replace(/^1f+00/, "")) == r(t).toString()
          }, t
        }(),
        Wt = {
          md2: "3020300c06082a864886f70d020205000410",
          md5: "3020300c06082a864886f70d020505000410",
          sha1: "3021300906052b0e03021a05000414",
          sha224: "302d300d06096086480165030402040500041c",
          sha256: "3031300d060960864801650304020105000420",
          sha384: "3041300d060960864801650304020205000430",
          sha512: "3051300d060960864801650304020305000440",
          ripemd160: "3021300906052b2403020105000414"
        };

      function Qt(t, e, r) {
        if (!e || !t) throw new Error("extend failed, please check that all dependencies are included.");
        var i = function() {};
        i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t, t.superclass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e)
      }
      /**
       * @fileOverview
       * @name asn1-1.0.js
       * @author Kenji Urushima kenji.urushima@gmail.com
       * @version asn1 1.0.13 (2017-Jun-02)
       * @since jsrsasign 2.1
       * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
       */
      var Yt = {};
      void 0 !== Yt.asn1 && Yt.asn1 || (Yt.asn1 = {}), Yt.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t) {
          var e = t.toString(16);
          return e.length % 2 == 1 && (e = "0" + e), e
        }, this.bigIntToMinTwosComplementsHex = function(t) {
          var e = t.toString(16);
          if ("-" != e.substring(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
          else {
            var r = e.substring(1).length;
            r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
            for (var i = "", n = 0; n < r; n++) i += "f";
            e = new ht(i, 16).xor(t).add(ht.ONE).toString(16).replace(/^-/, "")
          }
          return e
        }, this.getPEMStringFromHex = function(t, e) {
          return hextopem(t, e)
        }, this.newObject = function(t) {
          var e = Yt.asn1,
            r = e.DERBoolean,
            i = e.DERInteger,
            n = e.DERBitString,
            s = e.DEROctetString,
            o = e.DERNull,
            a = e.DERObjectIdentifier,
            u = e.DEREnumerated,
            h = e.DERUTF8String,
            l = e.DERNumericString,
            c = e.DERPrintableString,
            d = e.DERTeletexString,
            f = e.DERIA5String,
            p = e.DERUTCTime,
            g = e.DERGeneralizedTime,
            m = e.DERSequence,
            v = e.DERSet,
            y = e.DERTaggedObject,
            b = e.ASN1Util.newObject,
            w = Object.keys(t);
          if (1 != w.length) throw "key of param shall be only one.";
          var T = w[0];
          if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + T + ":")) throw "undefined key: " + T;
          if ("bool" == T) return new r(t[T]);
          if ("int" == T) return new i(t[T]);
          if ("bitstr" == T) return new n(t[T]);
          if ("octstr" == T) return new s(t[T]);
          if ("null" == T) return new o(t[T]);
          if ("oid" == T) return new a(t[T]);
          if ("enum" == T) return new u(t[T]);
          if ("utf8str" == T) return new h(t[T]);
          if ("numstr" == T) return new l(t[T]);
          if ("prnstr" == T) return new c(t[T]);
          if ("telstr" == T) return new d(t[T]);
          if ("ia5str" == T) return new f(t[T]);
          if ("utctime" == T) return new p(t[T]);
          if ("gentime" == T) return new g(t[T]);
          if ("seq" == T) {
            for (var S = t[T], x = [], E = 0; E < S.length; E++) {
              var k = b(S[E]);
              x.push(k)
            }
            return new m({
              array: x
            })
          }
          if ("set" == T) {
            for (S = t[T], x = [], E = 0; E < S.length; E++) k = b(S[E]), x.push(k);
            return new v({
              array: x
            })
          }
          if ("tag" == T) {
            var D = t[T];
            if ("[object Array]" === Object.prototype.toString.call(D) && 3 == D.length) {
              var A = b(D[2]);
              return new y({
                tag: D[0],
                explicit: D[1],
                obj: A
              })
            }
            var B = {};
            if (void 0 !== D.explicit && (B.explicit = D.explicit), void 0 !== D.tag && (B.tag = D.tag), void 0 === D.obj) throw "obj shall be specified for 'tag'.";
            return B.obj = b(D.obj), new y(B)
          }
        }, this.jsonToASN1HEX = function(t) {
          return this.newObject(t).getEncodedHex()
        }
      }, Yt.asn1.ASN1Util.oidHexToInt = function(t) {
        for (var e = "", r = parseInt(t.substring(0, 2), 16), i = (e = Math.floor(r / 40) + "." + r % 40, ""), n = 2; n < t.length; n += 2) {
          var s = ("00000000" + parseInt(t.substring(n, n + 2), 16).toString(2)).slice(-8);
          i += s.substring(1, 8), "0" == s.substring(0, 1) && (e = e + "." + new ht(i, 2).toString(10), i = "")
        }
        return e
      }, Yt.asn1.ASN1Util.oidIntToHex = function(t) {
        var e = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e), e
          },
          r = function(t) {
            var r = "",
              i = new ht(t, 10).toString(2),
              n = 7 - i.length % 7;
            7 == n && (n = 0);
            for (var s = "", o = 0; o < n; o++) s += "0";
            for (i = s + i, o = 0; o < i.length - 1; o += 7) {
              var a = i.substring(o, o + 7);
              o != i.length - 7 && (a = "1" + a), r += e(parseInt(a, 2))
            }
            return r
          };
        if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
        var i = "",
          n = t.split("."),
          s = 40 * parseInt(n[0]) + parseInt(n[1]);
        i += e(s), n.splice(0, 2);
        for (var o = 0; o < n.length; o++) i += r(n[o]);
        return i
      }, Yt.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
          if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
          if (this.hV.length % 2 == 1) throw "value hex must be even length: n=0,v=" + this.hV;
          var t = this.hV.length / 2,
            e = t.toString(16);
          if (e.length % 2 == 1 && (e = "0" + e), t < 128) return e;
          var r = e.length / 2;
          if (r > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
          return (128 + r).toString(16) + e
        }, this.getEncodedHex = function() {
          return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
        }, this.getValueHex = function() {
          return this.getEncodedHex(), this.hV
        }, this.getFreshValueHex = function() {
          return ""
        }
      }, Yt.asn1.DERAbstractString = function(t) {
        Yt.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
          return this.s
        }, this.setString = function(t) {
          this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
        }, this.setStringHex = function(t) {
          this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
      }, Qt(Yt.asn1.DERAbstractString, Yt.asn1.ASN1Object), Yt.asn1.DERAbstractTime = function(t) {
        Yt.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
          return utc = t.getTime() + 6e4 * t.getTimezoneOffset(), new Date(utc)
        }, this.formatDate = function(t, e, r) {
          var i = this.zeroPadding,
            n = this.localDateToUTC(t),
            s = String(n.getFullYear());
          "utc" == e && (s = s.substring(2, 4));
          var o = s + i(String(n.getMonth() + 1), 2) + i(String(n.getDate()), 2) + i(String(n.getHours()), 2) + i(String(n.getMinutes()), 2) + i(String(n.getSeconds()), 2);
          if (!0 === r) {
            var a = n.getMilliseconds();
            if (0 != a) {
              var u = i(String(a), 3);
              o = o + "." + (u = u.replace(/[0]+$/, ""))
            }
          }
          return o + "Z"
        }, this.zeroPadding = function(t, e) {
          return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }, this.getString = function() {
          return this.s
        }, this.setString = function(t) {
          this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t)
        }, this.setByDateValue = function(t, e, r, i, n, s) {
          var o = new Date(Date.UTC(t, e - 1, r, i, n, s, 0));
          this.setByDate(o)
        }, this.getFreshValueHex = function() {
          return this.hV
        }
      }, Qt(Yt.asn1.DERAbstractTime, Yt.asn1.ASN1Object), Yt.asn1.DERAbstractStructured = function(t) {
        Yt.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
          this.hTLV = null, this.isModified = !0, this.asn1Array = t
        }, this.appendASN1Object = function(t) {
          this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
        }, this.asn1Array = new Array, void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
      }, Qt(Yt.asn1.DERAbstractStructured, Yt.asn1.ASN1Object), Yt.asn1.DERBoolean = function() {
        Yt.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
      }, Qt(Yt.asn1.DERBoolean, Yt.asn1.ASN1Object), Yt.asn1.DERInteger = function(t) {
        Yt.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
          this.hTLV = null, this.isModified = !0, this.hV = Yt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }, this.setByInteger = function(t) {
          var e = new ht(String(t), 10);
          this.setByBigInteger(e)
        }, this.setValueHex = function(t) {
          this.hV = t
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
      }, Qt(Yt.asn1.DERInteger, Yt.asn1.ASN1Object), Yt.asn1.DERBitString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
          var e = Yt.asn1.ASN1Util.newObject(t.obj);
          t.hex = "00" + e.getEncodedHex()
        }
        Yt.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
          this.hTLV = null, this.isModified = !0, this.hV = t
        }, this.setUnusedBitsAndHexValue = function(t, e) {
          if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
          var r = "0" + t;
          this.hTLV = null, this.isModified = !0, this.hV = r + e
        }, this.setByBinaryString = function(t) {
          var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
          8 == e && (e = 0);
          for (var r = 0; r <= e; r++) t += "0";
          var i = "";
          for (r = 0; r < t.length - 1; r += 8) {
            var n = t.substring(r, r + 8),
              s = parseInt(n, 2).toString(16);
            1 == s.length && (s = "0" + s), i += s
          }
          this.hTLV = null, this.isModified = !0, this.hV = "0" + e + i
        }, this.setByBooleanArray = function(t) {
          for (var e = "", r = 0; r < t.length; r++) 1 == t[r] ? e += "1" : e += "0";
          this.setByBinaryString(e)
        }, this.newFalseArray = function(t) {
          for (var e = new Array(t), r = 0; r < t; r++) e[r] = !1;
          return e
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
      }, Qt(Yt.asn1.DERBitString, Yt.asn1.ASN1Object), Yt.asn1.DEROctetString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
          var e = Yt.asn1.ASN1Util.newObject(t.obj);
          t.hex = e.getEncodedHex()
        }
        Yt.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04"
      }, Qt(Yt.asn1.DEROctetString, Yt.asn1.DERAbstractString), Yt.asn1.DERNull = function() {
        Yt.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
      }, Qt(Yt.asn1.DERNull, Yt.asn1.ASN1Object), Yt.asn1.DERObjectIdentifier = function(t) {
        var e = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e), e
          },
          r = function(t) {
            var r = "",
              i = new ht(t, 10).toString(2),
              n = 7 - i.length % 7;
            7 == n && (n = 0);
            for (var s = "", o = 0; o < n; o++) s += "0";
            for (i = s + i, o = 0; o < i.length - 1; o += 7) {
              var a = i.substring(o, o + 7);
              o != i.length - 7 && (a = "1" + a), r += e(parseInt(a, 2))
            }
            return r
          };
        Yt.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(t) {
          this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
        }, this.setValueOidString = function(t) {
          if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
          var i = "",
            n = t.split("."),
            s = 40 * parseInt(n[0]) + parseInt(n[1]);
          i += e(s), n.splice(0, 2);
          for (var o = 0; o < n.length; o++) i += r(n[o]);
          this.hTLV = null, this.isModified = !0, this.s = null, this.hV = i
        }, this.setValueName = function(t) {
          var e = Yt.asn1.x509.OID.name2oid(t);
          if ("" === e) throw "DERObjectIdentifier oidName undefined: " + t;
          this.setValueOidString(e)
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
      }, Qt(Yt.asn1.DERObjectIdentifier, Yt.asn1.ASN1Object), Yt.asn1.DEREnumerated = function(t) {
        Yt.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
          this.hTLV = null, this.isModified = !0, this.hV = Yt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }, this.setByInteger = function(t) {
          var e = new ht(String(t), 10);
          this.setByBigInteger(e)
        }, this.setValueHex = function(t) {
          this.hV = t
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
      }, Qt(Yt.asn1.DEREnumerated, Yt.asn1.ASN1Object), Yt.asn1.DERUTF8String = function(t) {
        Yt.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c"
      }, Qt(Yt.asn1.DERUTF8String, Yt.asn1.DERAbstractString), Yt.asn1.DERNumericString = function(t) {
        Yt.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12"
      }, Qt(Yt.asn1.DERNumericString, Yt.asn1.DERAbstractString), Yt.asn1.DERPrintableString = function(t) {
        Yt.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13"
      }, Qt(Yt.asn1.DERPrintableString, Yt.asn1.DERAbstractString), Yt.asn1.DERTeletexString = function(t) {
        Yt.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14"
      }, Qt(Yt.asn1.DERTeletexString, Yt.asn1.DERAbstractString), Yt.asn1.DERIA5String = function(t) {
        Yt.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16"
      }, Qt(Yt.asn1.DERIA5String, Yt.asn1.DERAbstractString), Yt.asn1.DERUTCTime = function(t) {
        Yt.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function(t) {
          this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
        }, this.getFreshValueHex = function() {
          return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
        }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
      }, Qt(Yt.asn1.DERUTCTime, Yt.asn1.DERAbstractTime), Yt.asn1.DERGeneralizedTime = function(t) {
        Yt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.withMillis = !1, this.setByDate = function(t) {
          this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
        }, this.getFreshValueHex = function() {
          return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
        }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date), !0 === t.millis && (this.withMillis = !0))
      }, Qt(Yt.asn1.DERGeneralizedTime, Yt.asn1.DERAbstractTime), Yt.asn1.DERSequence = function(t) {
        Yt.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function() {
          for (var t = "", e = 0; e < this.asn1Array.length; e++) t += this.asn1Array[e].getEncodedHex();
          return this.hV = t, this.hV
        }
      }, Qt(Yt.asn1.DERSequence, Yt.asn1.DERAbstractStructured), Yt.asn1.DERSet = function(t) {
        Yt.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
          for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
            var r = this.asn1Array[e];
            t.push(r.getEncodedHex())
          }
          return 1 == this.sortFlag && t.sort(), this.hV = t.join(""), this.hV
        }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
      }, Qt(Yt.asn1.DERSet, Yt.asn1.DERAbstractStructured), Yt.asn1.DERTaggedObject = function(t) {
        Yt.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(t, e, r) {
          this.hT = e, this.isExplicit = t, this.asn1Object = r, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = r.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1)
        }, this.getFreshValueHex = function() {
          return this.hV
        }, void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag), void 0 !== t.explicit && (this.isExplicit = t.explicit), void 0 !== t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
      }, Qt(Yt.asn1.DERTaggedObject, Yt.asn1.ASN1Object);
      var Xt, Jt, te = (Xt = function(t, e) {
          return Xt = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function(t, e) {
            t.__proto__ = e
          } || function(t, e) {
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
          }, Xt(t, e)
        }, function(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");

          function r() {
            this.constructor = t
          }
          Xt(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }),
        ee = function(t) {
          function e(r) {
            var i = t.call(this) || this;
            return r && ("string" == typeof r ? i.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && i.parsePropertiesFrom(r)), i
          }
          return te(e, t), e.prototype.parseKey = function(t) {
            try {
              var e = 0,
                r = 0,
                i = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? Q(t) : Y.unarmor(t),
                n = st.decode(i);
              if (3 === n.sub.length && (n = n.sub[2].sub[0]), 9 === n.sub.length) {
                e = n.sub[1].getHexStringValue(), this.n = gt(e, 16), r = n.sub[2].getHexStringValue(), this.e = parseInt(r, 16);
                var s = n.sub[3].getHexStringValue();
                this.d = gt(s, 16);
                var o = n.sub[4].getHexStringValue();
                this.p = gt(o, 16);
                var a = n.sub[5].getHexStringValue();
                this.q = gt(a, 16);
                var u = n.sub[6].getHexStringValue();
                this.dmp1 = gt(u, 16);
                var h = n.sub[7].getHexStringValue();
                this.dmq1 = gt(h, 16);
                var l = n.sub[8].getHexStringValue();
                this.coeff = gt(l, 16)
              } else {
                if (2 !== n.sub.length) return !1;
                if (n.sub[0].sub) {
                  var c = n.sub[1].sub[0];
                  e = c.sub[0].getHexStringValue(), this.n = gt(e, 16), r = c.sub[1].getHexStringValue(), this.e = parseInt(r, 16)
                } else e = n.sub[0].getHexStringValue(), this.n = gt(e, 16), r = n.sub[1].getHexStringValue(), this.e = parseInt(r, 16)
              }
              return !0
            } catch (d) {
              return !1
            }
          }, e.prototype.getPrivateBaseKey = function() {
            var t = {
              array: [new Yt.asn1.DERInteger({
                int: 0
              }), new Yt.asn1.DERInteger({
                bigint: this.n
              }), new Yt.asn1.DERInteger({
                int: this.e
              }), new Yt.asn1.DERInteger({
                bigint: this.d
              }), new Yt.asn1.DERInteger({
                bigint: this.p
              }), new Yt.asn1.DERInteger({
                bigint: this.q
              }), new Yt.asn1.DERInteger({
                bigint: this.dmp1
              }), new Yt.asn1.DERInteger({
                bigint: this.dmq1
              }), new Yt.asn1.DERInteger({
                bigint: this.coeff
              })]
            };
            return new Yt.asn1.DERSequence(t).getEncodedHex()
          }, e.prototype.getPrivateBaseKeyB64 = function() {
            return Z(this.getPrivateBaseKey())
          }, e.prototype.getPublicBaseKey = function() {
            var t = new Yt.asn1.DERSequence({
                array: [new Yt.asn1.DERObjectIdentifier({
                  oid: "1.2.840.113549.1.1.1"
                }), new Yt.asn1.DERNull]
              }),
              e = new Yt.asn1.DERSequence({
                array: [new Yt.asn1.DERInteger({
                  bigint: this.n
                }), new Yt.asn1.DERInteger({
                  int: this.e
                })]
              }),
              r = new Yt.asn1.DERBitString({
                hex: "00" + e.getEncodedHex()
              });
            return new Yt.asn1.DERSequence({
              array: [t, r]
            }).getEncodedHex()
          }, e.prototype.getPublicBaseKeyB64 = function() {
            return Z(this.getPublicBaseKey())
          }, e.wordwrap = function(t, e) {
            if (!t) return t;
            var r = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
            return t.match(RegExp(r, "g")).join("\n")
          }, e.prototype.getPrivateKey = function() {
            var t = "-----BEGIN RSA PRIVATE KEY-----\n";
            return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n", t += "-----END RSA PRIVATE KEY-----"
          }, e.prototype.getPublicKey = function() {
            var t = "-----BEGIN PUBLIC KEY-----\n";
            return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n", t += "-----END PUBLIC KEY-----"
          }, e.hasPublicKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
          }, e.hasPrivateKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
          }, e.prototype.parsePropertiesFrom = function(t) {
            this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff)
          }, e
        }(Gt),
        re = "undefined" != typeof process ? null === (Jt = {}) || void 0 === Jt ? void 0 : Jt.npm_package_version : void 0,
        ie = function() {
          function t(t) {
            void 0 === t && (t = {}), this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = t.key || null
          }
          return t.prototype.setKey = function(t) {
            t ? (this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new ee(t)) : !this.key && this.log && console.error("A key was not set.")
          }, t.prototype.setPrivateKey = function(t) {
            this.setKey(t)
          }, t.prototype.setPublicKey = function(t) {
            this.setKey(t)
          }, t.prototype.decrypt = function(t) {
            try {
              return this.getKey().decrypt(G(t))
            } catch (e) {
              return !1
            }
          }, t.prototype.encrypt = function(t) {
            try {
              return Z(this.getKey().encrypt(t))
            } catch (e) {
              return !1
            }
          }, t.prototype.encryptOAEP = function(t) {
            try {
              return Z(this.getKey().encrypt(t, Zt))
            } catch (e) {
              return !1
            }
          }, t.prototype.sign = function(t, e, r) {
            void 0 === e && (e = function(t) {
              return t
            }), void 0 === r && (r = "");
            try {
              return Z(this.getKey().sign(t, e, r))
            } catch (i) {
              return !1
            }
          }, t.prototype.signSha256 = function(t) {
            return this.sign(t, function(t) {
              return Mt(It(t))
            }, "sha256")
          }, t.prototype.verify = function(t, e, r) {
            void 0 === r && (r = function(t) {
              return t
            });
            try {
              return this.getKey().verify(t, G(e), r)
            } catch (i) {
              return !1
            }
          }, t.prototype.verifySha256 = function(t, e) {
            return this.verify(t, e, function(t) {
              return Mt(It(t))
            })
          }, t.prototype.getKey = function(t) {
            if (!this.key) {
              if (this.key = new ee, t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
              this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
          }, t.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
          }, t.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
          }, t.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
          }, t.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
          }, t.version = re, t
        }();
      const ne = "20250520",
        se = async t => t.then(t => [null, t]).catch(t => [t, null]), oe = (t, e = {}) => {
          if ("POST" === e.method) {
            const r = Object.assign({}, e);
            return delete r.method, se(u.post(t, r))
          } {
            const r = Object.assign({}, e);
            return delete r.method, se(u.get(t, {
              params: r
            }))
          }
        }, ae = t => se(new Promise((e, r) => {
          window.ydInit ? window.ydInit({
            geetestKey: t,
            captchaId: "7cda0ba2785647ada4d6e946ddb2d465",
            product: "popup",
            lang: "zh-CN"
          }, (t, i, n) => {
            n ? e({
              params: t,
              msg: i
            }) : r({
              params: t,
              msg: i
            })
          }) : r({
            params: {},
            msg: "极验未初始化"
          })
        })), ue = (t, e) => {
          if (!e || !t) return;
          const r = new ie({
            default_public_exponent: "10001"
          });
          return r.setPublicKey(e), (t => {
            const e = atob(t),
              r = new Uint8Array(e.length);
            for (let i = 0; i < e.length; i++) r[i] = e.charCodeAt(i);
            return Array.from(r).map(t => t.toString(16).padStart(2, "0")).join("")
          })(r.encrypt(t))
        };

      function he() {
        return !! function() {
          const t = navigator.userAgent.toLowerCase(),
            e = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(t),
            r = /ipad|tablet|playbook|silk/i.test(t);
          return e && !r
        }() && (window.innerWidth > window.innerHeight || window.innerHeight > window.innerWidth)
      }
      const le = {
          key: 1,
          class: "text-sm text-center mt-5 text-sub"
        },
        ce = {
          key: 0,
          class: "w-full h-full absolute bg-white95"
        },
        de = {
          class: "absolute top-12 left-0 right-0 text-center"
        },
        fe = {
          key: 0,
          class: "w-10 h-10 inline-block",
          viewBox: "0 0 37 40"
        },
        pe = {
          key: 1,
          class: "w-10 h-10 inline-block",
          viewBox: "0 0 38 40"
        },
        ge = {
          key: 2,
          class: "w-10 h-10 inline-block",
          viewBox: "0 0 40 40"
        },
        me = {
          class: "absolute top-28 break-all w-full px-8 text-xs text-center"
        },
        ve = {
          class: "w-45 h-45 p-5"
        },
        ye = ["src"],
        be = {
          key: 2,
          class: "text-sm"
        },
        we = r({
          __name: "QRcode",
          props: {
            entry: String,
            source: String,
            url: String,
            visible: Boolean
          },
          emits: ["click-back"],
          setup(t, {
            emit: e
          }) {
            const r = t,
              o = I(),
              a = v(""),
              u = v(""),
              y = v(""),
              b = v(null),
              w = async () => {
                b.value && (clearInterval(b.value), b.value = null);
                const [t, e] = await oe("/sso/v2/qrcode/image", {
                  entry: r.entry,
                  size: 180
                });
                t || 2e7 === e.data.retcode && (a.value = e.data?.data?.image, b.value = setInterval(() => {
                  (async (t = "") => {
                    let e = "norid";
                    if (window.wbBotDetector && window.wbBotDetector.get) {
                      const t = await window.wbBotDetector.get({
                        useCache: !0
                      }).catch(t => {
                        console.log(t)
                      });
                      e = t?.rid || "getriderror"
                    }
                    const [i, n] = await oe("/sso/v2/qrcode/check", {
                      entry: r.entry,
                      source: r.source,
                      url: r.url,
                      qrid: t,
                      disp: o.query.disp,
                      rid: e,
                      ver: ne
                    });
                    if (i) return;
                    const s = +n.data.retcode;
                    switch (s) {
                      case 50114002:
                        u.value = "warning";
                        break;
                      case 50114003:
                      case 50114004:
                      case 50114015:
                        u.value = "error";
                        break;
                      case 2e7:
                        u.value = "success", y.value = "扫描成功"
                    }
                    2e7 === s ? (clearInterval(b.value), b.value = null, n.data.data.url && window.location.replace(n.data.data.url)) : y.value = n.data.msg
                  })(e.data?.data?.qrid)
                }, 4e3))
              }, T = () => {
                y.value = "", u.value = "", w()
              };
            return h(async () => {
              w()
            }), l(() => {
              clearInterval(b.value), b.value = null
            }), c(() => {}), (e, r) => (i(), n("div", {
              class: p(["flex-col items-center justify-center w-82.5 height-full border-r border-line md:flex dark:border-linedark", t.visible ? "fixed bg-white w-full h-full z-9999" : ""])
            }, [t.visible ? (i(), n("div", {
              key: 0,
              class: "absolute top-10 left-6 leading-[30px] h-[30px] text-darkGray flex",
              onClick: r[0] || (r[0] = t => e.$emit("click-back"))
            }, [...r[1] || (r[1] = [s("img", {
              class: "h-full",
              src: "https://d.sinaimg.cn/prd/1005/891/2024/12/31/h5_fanhui.png"
            }, null, -1), d(" 返回 ", -1)])])) : f("", !0), s("div", {
              class: p(["leading-4.5 font-medium", t.visible ? "text-center mt-25" : ""])
            }, "扫描二维码登录", 2), t.visible ? (i(), n("div", le, "打开微博手机APP - 我的页面 - 扫一扫")) : f("", !0), s("div", {
              class: p(["relative border-2 border-line dark:border-linedark", t.visible ? "m-0 mt-[30px] w-[183px] h-[183px] relative left-2/4 -translate-x-2/4" : "m-8.5"])
            }, [u.value ? (i(), n("div", ce, [s("div", de, ["success" === u.value ? (i(), n("svg", fe, [...r[2] || (r[2] = [s("path", {
              d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
              fill: "#8CD232"
            }, null, -1), s("path", {
              d: "M15.7781746,21.4319805 L26.3847763,10.8253788 C27.1658249,10.0443302 28.4321549,10.0443302 29.2132034,10.8253788 C29.994252,11.6064274 29.994252,12.8727573 29.2132034,13.6538059 L17.1923882,25.6746212 C16.4113396,26.4556698 15.1450096,26.4556698 14.363961,25.6746212 L9.41421356,20.7248737 C8.63316498,19.9438252 8.63316498,18.6774952 9.41421356,17.8964466 C10.1952621,17.115398 11.4615921,17.115398 12.2426407,17.8964466 L15.7781746,21.4319805 L15.7781746,21.4319805 Z",
              fill: "#FFFFFF"
            }, null, -1)])])) : f("", !0), "error" === u.value ? (i(), n("svg", pe, [...r[3] || (r[3] = [s("path", {
              d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
              fill: "#FF8200"
            }, null, -1), s("path", {
              d: "M18.5,8 L18.6502192,8.00546148 C19.6911389,8.08147296 20.5,8.94145612 20.5,9.991155 L20.5,9.991155 L20.5,17 L27.508845,17 C28.5602587,17 29.4186829,17.8158778 29.4945492,18.8507377 L29.5,19 L29.4945385,19.1502192 C29.418527,20.1911389 28.5585439,21 27.508845,21 L27.508845,21 L20.5,21 L20.5,28.008845 C20.5,29.0602587 19.6841222,29.9186829 18.6492623,29.9945492 L18.5,30 L18.3497808,29.9945385 C17.3088611,29.918527 16.5,29.0585439 16.5,28.008845 L16.5,28.008845 L16.5,21 L9.491155,21 C8.43974127,21 7.58131707,20.1841222 7.50545085,19.1492623 L7.5,19 L7.50546148,18.8497808 C7.58147296,17.8088611 8.44145612,17 9.491155,17 L9.491155,17 L16.5,17 L16.5,9.991155 C16.5,8.93974127 17.3158778,8.08131707 18.3507377,8.00545085 L18.5,8 Z",
              fill: "#FFFFFF",
              transform: "translate(18.500000, 19.000000) rotate(-225.000000) translate(-18.500000, -19.000000) "
            }, null, -1)])])) : f("", !0), "warning" === u.value ? (i(), n("svg", ge, [...r[4] || (r[4] = [s("path", {
              fill: "#507DAF",
              d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z M18.5,15 C17.3954305,15 16.5,15.8933973 16.5,16.9918842 L16.5,16.9918842 L16.5,28.0081158 L16.5059944,28.1641306 C16.5814663,29.1422683 17.3609071,29.9222992 18.3497808,29.9945365 L18.3497808,29.9945365 L18.5,30 L18.6492623,29.9945271 C19.6841222,29.9183583 20.5,29.0566714 20.5,28.0081158 L20.5,28.0081158 L20.5,16.9918842 L20.4940056,16.8358694 C20.4185337,15.8577317 19.6390929,15.0777008 18.6502192,15.0054635 L18.6502192,15.0054635 Z M18.5,9 C17.396,9 16.5,9.89303565 16.5,10.9980007 C16.5,12.1029657 17.396,13 18.5,13 C19.6053333,13 20.5,12.1029657 20.5,10.9980007 C20.5,9.89303565 19.6053333,9 18.5,9 Z"
            }, null, -1)])])) : f("", !0)]), s("div", me, g(y.value), 1), "error" === u.value ? (i(), n("a", {
              key: 0,
              href: "",
              class: "absolute top-36 break-all w-full px-8 text-xs text-center text-brand",
              onClick: m(T, ["prevent"])
            }, "点击刷新")) : f("", !0)])) : f("", !0), s("div", ve, [a.value ? (i(), n("img", {
              key: 0,
              src: a.value,
              alt: "",
              class: "w-full h-full"
            }, null, 8, ye)) : f("", !0)])], 2), t.visible ? f("", !0) : (i(), n("div", be, "打开微博手机APP - 我的页面 - 扫一扫"))], 2))
          }
        });

      function Te(t) {
        return "function" == typeof t ? t() : y(t)
      }
      const Se = "undefined" != typeof window && "undefined" != typeof document;
      "undefined" != typeof WorkerGlobalScope && (globalThis, WorkerGlobalScope);
      const xe = Object.prototype.toString,
        Ee = () => {},
        ke = De();

      function De() {
        var t, e;
        return Se && (null == (t = null == window ? void 0 : window.navigator) ? void 0 : t.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || (null == (e = null == window ? void 0 : window.navigator) ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(null == window ? void 0 : window.navigator.userAgent))
      }

      function Ae(t) {
        var e;
        const r = Te(t);
        return null != (e = null == r ? void 0 : r.$el) ? e : r
      }
      const Be = Se ? window : void 0;

      function Ve(...t) {
        let e, r, i, n;
        if ("string" == typeof t[0] || Array.isArray(t[0]) ? ([r, i, n] = t, e = Be) : [e, r, i, n] = t, !e) return Ee;
        Array.isArray(r) || (r = [r]), Array.isArray(i) || (i = [i]);
        const s = [],
          o = () => {
            s.forEach(t => t()), s.length = 0
          },
          a = T(() => [Ae(e), Te(n)], ([t, e]) => {
            if (o(), !t) return;
            const n = (a = e, "[object Object]" === xe.call(a) ? {
              ...e
            } : e);
            var a;
            s.push(...r.flatMap(e => i.map(r => ((t, e, r, i) => (t.addEventListener(e, r, i), () => t.removeEventListener(e, r, i)))(t, e, r, n))))
          }, {
            immediate: !0,
            flush: "post"
          }),
          u = () => {
            a(), o()
          };
        var h;
        return h = u, b() && w(h), u
      }
      let Re = !1;

      function Ce(t) {
        return Array.from((new TextEncoder).encode(t))
      }

      function Oe(t, e = "x9Lp2WnQ") {
        const r = function(t, e) {
          const r = Ce(e);
          return t.map((t, e) => t ^ r[e % r.length])
        }(Ce(t), e);
        let i = "";
        for (const s of r) i += String.fromCharCode(s);
        const n = btoa(i).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        return n.split("").map(t => "iaAehJvQ7RIDBX5L31T0kcf9ElVbpMdPZSmzoN_uxGO-2rFUtyY6sHCwKj4Wqgn8" ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".indexOf(t)]).join("")
      }
      const Ie = {
          key: 0,
          class: "mt-10 md:mt-6.5",
          tabindex: "0"
        },
        Me = {
          class: "relative"
        },
        Le = {
          class: "absolute top-1/2 left-0 z-9 -translate-y-1/2"
        },
        Ne = {
          class: "p-0.5",
          "aria-labelledby": "dropdownDefaultButton"
        },
        Pe = ["onClick"],
        _e = {
          href: "#",
          class: "block px-3 py-2.5 hover:bg-cardin dark:hover:bg-cardindark"
        },
        qe = ["value"],
        je = {
          class: "relative mt-2.5"
        },
        He = ["value"],
        Ue = {
          class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
        },
        Fe = {
          key: 1,
          class: "text-sm text-disabled dark:text-disableddark cursor-not-allowed"
        },
        Ke = {
          key: 1,
          class: "text-sm text-disabled dark:text-disableddark"
        },
        ze = {
          class: "flex items-center justify-between h-4.5 mt-2"
        },
        $e = r({
          __name: "VerificationCode",
          props: {
            modelValue: {
              type: Object,
              default: () => ({
                username: "",
                scode: "",
                countryCode: "86"
              })
            },
            countryCodeMenu: {
              type: Array,
              default: () => []
            },
            entry: String,
            checked: Boolean,
            isMobile: Boolean
          },
          emits: ["update-error-msg", "update:modelValue", "trigger-check-lisence"],
          setup(t, {
            emit: e
          }) {
            const r = t,
              o = e,
              u = v(null),
              h = v(!1),
              l = v(r.modelValue.countryCode);
            ! function(t, e, r = {}) {
              const {
                window: i = Be,
                ignore: n = [],
                capture: s = !0,
                detectIframe: o = !1
              } = r;
              if (!i) return;
              ke && !Re && (Re = !0, Array.from(i.document.body.children).forEach(t => t.addEventListener("click", Ee)), i.document.documentElement.addEventListener("click", Ee));
              let a = !0;
              const u = t => n.some(e => {
                if ("string" == typeof e) return Array.from(i.document.querySelectorAll(e)).some(e => e === t.target || t.composedPath().includes(e));
                {
                  const r = Ae(e);
                  return r && (t.target === r || t.composedPath().includes(r))
                }
              });
              [Ve(i, "click", r => {
                const i = Ae(t);
                i && i !== r.target && !r.composedPath().includes(i) && (0 === r.detail && (a = !u(r)), a ? e(r) : a = !0)
              }, {
                passive: !0,
                capture: s
              }), Ve(i, "pointerdown", e => {
                const r = Ae(t);
                a = !u(e) && !(!r || e.composedPath().includes(r))
              }, {
                passive: !0
              }), o && Ve(i, "blur", r => {
                setTimeout(() => {
                  var n;
                  const s = Ae(t);
                  "IFRAME" !== (null == (n = i.document.activeElement) ? void 0 : n.tagName) || (null == s ? void 0 : s.contains(i.document.activeElement)) || e(r)
                }, 0)
              })].filter(Boolean)
            }(u, () => {
              h.value = !1
            });
            const c = (t, e) => {
                const i = r.modelValue;
                i[e] = t.target.value, o("update:modelValue", i), o("update-error-msg", "")
              },
              d = v(!1),
              p = v(null),
              y = v(60),
              b = (t = "") => {
                let e = `${r.modelValue.username}`;
                return "86" !== r.modelValue.countryCode && (e = `00${r.modelValue.countryCode}${r.modelValue.username}`), e = Oe(e), oe("/sso/v2/sms/send", {
                  method: "POST",
                  entry: r.entry,
                  mobile: e,
                  mfa_id: t,
                  el: 2
                })
              },
              w = async () => {
                if (!r.modelValue.username) return void o("update-error-msg", "请输入手机号");
                if (p.value) return;
                if (!r.checked && r.isMobile) return void o("trigger-check-lisence");
                const [t, e] = await b();
                if (t) return 432 === t?.response?.status || 429 === t?.response?.status ? void o("update-error-msg", `当前系统繁忙，请稍后再试(${t?.response?.status})`) : void o("update-error-msg", "短信接口数据获取失败");
                if (0 === e.data.retcode && "mfa_1" === e.data.data.act) {
                  const [t, r] = await ae(e.data.data.mfa_id);
                  if (t) {
                    if ("close" === t.msg) return;
                    return void o("update-error-msg", t.msg)
                  }
                  if (!r) return void o("update-error-msg", "极验返回结果有误");
                  const [i, n] = await b(e.data.data.mfa_id);
                  if (i) return 432 === i?.response?.status || 429 === i?.response?.status ? void o("update-error-msg", `当前系统繁忙，请稍后再试(${i?.response?.status})`) : void o("update-error-msg", "二次验证通过，短信接口数据获取失败");
                  if (2e7 !== +n.data.retcode) return void o("update-error-msg", n.data.msg || "二次验证通过，短信接口获取数据遇到错误");
                  d.value = !0, T(), o("update-error-msg", "")
                } else 2e7 === e.data.retcode && (d.value = !0, T()), o("update-error-msg", e.data.msg)
              };

            function T() {
              p.value = setInterval(() => {
                y.value--, y.value <= 0 && (clearInterval(p.value), y.value = 60, d.value = !1, p.value = null)
              }, 1e3)
            }
            return (e, o) => (i(), n("form", Ie, [s("div", Me, [s("div", Le, [s("button", {
              id: "dropdownDefaultButton",
              class: "flex items-center",
              onClick: o[0] || (o[0] = m(t => h.value = !h.value, ["prevent"]))
            }, [s("span", null, "+" + g(l.value), 1), o[3] || (o[3] = s("svg", {
              class: "w-3 h-3 ml-1 text-main dark:text-maindark",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              viewBox: "0 0 612 612"
            }, [s("path", {
              d: "M565.2,173.2c-8.2-8.1-21.5-8.1-29.6,0L303.5,403.4L75.7,177.6c-8-8-21.1-8-29.1,0c-8,7.9-8,20.9,0,28.8l241.3,239.2\n                  c0.3,0.3,0.8,0.4,1.1,0.7c0.2,0.2,0.2,0.4,0.3,0.5c8.2,8.1,21.5,8.1,29.6,0l246.3-244.2C573.4,194.5,573.4,181.3,565.2,173.2z"
            })], -1))]), h.value ? (i(), n("div", {
              key: 0,
              ref_key: "dropdownMenu",
              ref: u,
              class: "absolute left-0 z-9 w-49.5 h-51.5 mt-2 bg-card border border-line rounded shadow overflow-x-hidden overflow-y-auto text-sm dark:bg-carddark dark:border-linedark"
            }, [s("ul", Ne, [(i(!0), n(S, null, x(t.countryCodeMenu, (t, e) => (i(), n("li", {
              key: e,
              onClick: e => {
                return r = t.code, l.value = r, h.value = !1, void c({
                  target: {
                    value: r
                  }
                }, "countryCode");
                var r
              }
            }, [s("a", _e, g(t.text), 1)], 8, Pe))), 128))])], 512)) : f("", !0)]), s("input", {
              value: r.modelValue.username,
              type: "text",
              "aria-label": "手机号",
              class: "block w-full pl-20 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
              placeholder: "手机号",
              onInput: o[1] || (o[1] = t => c(t, "username"))
            }, null, 40, qe)]), s("div", je, [s("input", {
              maxlength: "6",
              value: r.modelValue.scode,
              type: "text",
              "aria-label": "验证码",
              class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
              placeholder: "验证码",
              onInput: o[2] || (o[2] = t => c(t, "scode"))
            }, null, 40, He), s("div", Ue, [d.value ? (i(), n("span", Ke, g(y.value) + "s后重新发送", 1)) : (i(), n(S, {
              key: 0
            }, [r.modelValue.username ? (i(), n("a", {
              key: 0,
              class: "text-sm text-alink dark:text-alinkdark cursor-pointer",
              onClick: m(w, ["prevent"])
            }, "获取验证码")) : (i(), n("a", Fe, "获取验证码"))], 64))])]), s("div", ze, [a(e.$slots, "errorMsg")])]))
          }
        }),
        Ze = {
          class: "mt-10 md:mt-6.5",
          "aria-current": "true",
          tabindex: "1"
        },
        Ge = {
          class: "relative"
        },
        We = ["value"],
        Qe = {
          class: "relative mt-2.5"
        },
        Ye = ["value"],
        Xe = {
          class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
        },
        Je = {
          key: 0,
          class: "flex items-center mt-2.5"
        },
        tr = {
          class: "flex-1"
        },
        er = ["value"],
        rr = {
          class: "w-30 h-11 ml-4"
        },
        ir = ["src"],
        nr = {
          class: "flex items-center justify-between h-4.5 mt-2"
        },
        sr = r({
          __name: "Account",
          props: {
            modelValue: {
              type: Object,
              default: () => ({
                username: "",
                password: "",
                code: "",
                mfaId: ""
              })
            },
            showCode: Boolean,
            refreshCode: Boolean,
            entry: String,
            forgetUrl: String
          },
          emits: ["update:modelValue", "update-error-msg"],
          setup(t, {
            emit: e
          }) {
            const r = t,
              o = e,
              u = v(""),
              h = (t, e) => {
                const i = r.modelValue;
                i[e] = t.target.value, o("update:modelValue", i), o("update-error-msg", "")
              },
              l = async () => {
                const [t, e] = await oe("/sso/v2/captcha/image", {
                  method: "POST",
                  pcid: r.modelValue.mfaId,
                  entry: r.entry
                });
                t || 2e7 === e.data.retcode && (u.value = e.data.data.image)
              }, c = () => {
                window.open(r.forgetUrl)
              };
            return T(() => r.showCode, t => {
              t && l()
            }), T(() => r.refreshCode, () => {
              l()
            }), (e, o) => (i(), n("form", Ze, [s("div", Ge, [s("input", {
              value: r.modelValue.username,
              type: "text",
              "aria-label": "手机号或邮箱",
              class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
              placeholder: "手机号或邮箱",
              onInput: o[0] || (o[0] = t => h(t, "username"))
            }, null, 40, We)]), s("div", Qe, [s("input", {
              value: r.modelValue.password,
              type: "password",
              "aria-label": "密码",
              class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
              placeholder: "密码",
              onInput: o[1] || (o[1] = t => h(t, "password"))
            }, null, 40, Ye), s("div", Xe, [s("a", {
              href: "",
              class: "text-sm text-alink dark:text-alinkdark",
              onClick: m(c, ["prevent"])
            }, "忘记密码")])]), t.showCode ? (i(), n("div", Je, [s("div", tr, [s("input", {
              value: r.modelValue.ccode,
              type: "text",
              "aria-label": "验证码",
              class: "block w-full px-0 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
              placeholder: "请输入验证码",
              onInput: o[2] || (o[2] = t => h(t, "ccode"))
            }, null, 40, er)]), s("div", rr, [s("img", {
              src: u.value,
              alt: "",
              class: "w-full h-full",
              onClick: l
            }, null, 8, ir)])])) : f("", !0), s("div", nr, [a(e.$slots, "errorMsg")])]))
          }
        }),
        or = r({
          __name: "ExtraEntry",
          props: {
            showWechat: {
              type: Boolean,
              default: !1
            },
            isMobileLayout: Boolean
          },
          emits: ["click-qrcode", "click-wechat"],
          setup(t) {
            const e = t,
              r = E(() => e.isMobileLayout ? "flex justify-center block w-full bottom-0 text-mainb text-[15px] text-center leading-5 bg-white pb-safe-bottom leading-[30px] whitespace-nowrap" : "absolute bottom-[117px] right-[122px]");
            return (e, o) => (i(), n("div", {
              class: p(r.value)
            }, [t.showWechat ? (i(), n("span", {
              key: 0,
              class: "flex h-5 justify-center items-center text-[rgb(99, 99, 99)] mx-10 cursor-pointer",
              onClick: o[0] || (o[0] = t => e.$emit("click-wechat"))
            }, [...o[2] || (o[2] = [s("img", {
              class: "h-[30px] w-[30px] mr-2",
              src: "https://d.sinaimg.cn/prd/1005/891/2025/11/20/wechat.png"
            }, null, -1), d("微信登录", -1)])])) : f("", !0), t.isMobileLayout ? (i(), n("span", {
              key: 1,
              class: "flex h-5 justify-center items-center mx-10",
              onClick: o[1] || (o[1] = t => e.$emit("click-qrcode"))
            }, [...o[3] || (o[3] = [s("img", {
              class: "h-[30px] w-[30px] mr-2",
              src: "https://d.sinaimg.cn/prd/1005/891/2025/05/27/scan.png"
            }, null, -1), d("扫码登录", -1)])])) : f("", !0)], 2))
          }
        });
      class ar {
        constructor(t) {
          this.enable = t
        }
        mytimer = null;
        start(t, e) {
          this.enable && (this.mytimer = setTimeout(e, t))
        }
        clear() {
          this.enable && (clearTimeout(this.mytimer), this.mytimer = null)
        }
        isset() {
          return null !== this.mytimer
        }
      }
      let ur = null,
        hr = null,
        lr = 0;
      const cr = 2e3;
      let dr;
      const fr = () => {
          hr ? hr.clear() : hr = new ar(!1), hr.start(5e3, () => {
            hr && hr.clear()
          }), lr && (dr || (dr = (t => {
            const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let r = "";
            for (let i = 0; i < t; i++) r += e.charAt(Math.ceil(1e6 * Math.random()) % 36);
            return r
          })(6)))
        },
        pr = {
          class: "flex h-full pb-[25px]"
        },
        gr = {
          class: "flex-1 px-6 pt-5 md:pt-7"
        },
        mr = {
          class: "flex flex-wrap space-x-6.5"
        },
        vr = {
          class: "text-s text-red dark:text-reddark"
        },
        yr = {
          class: "text-s text-red dark:text-reddark"
        },
        br = {
          for: "checked-checkbox2",
          class: "ml-1 text-s text-sub dark:text-subdark"
        },
        wr = {
          key: 0
        },
        Tr = {
          key: 1
        };
      C(r({
        __name: "Login",
        setup(t) {
          const e = I(),
            r = V({
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
              isSina: "login.sina.com.cn" === window.location.hostname,
              mobileQRcodeVisible: !1,
              wechatUrl: ""
            }),
            a = v(q()),
            u = V({
              form: {
                username: "",
                password: "",
                ccode: "",
                mfaId: ""
              },
              showCode: !1,
              refreshCode: !1
            }),
            b = V({
              form: {
                username: "",
                scode: "",
                countryCode: "86",
                cid: ""
              },
              countryCodeMenu: []
            }),
            w = E(() => !a.value || r.mobileQRcodeVisible),
            x = {
              show_pw: 1,
              show_sms: 2
            },
            C = E(() => !!r.show_wechat),
            O = v("border-b-2 border-brand font-medium dark:border-branddark");
          T(a, () => {
            r.mobileQRcodeVisible = !1
          });
          const M = t => {
              r.curType = t, r.errMsg = ""
            },
            L = (t = "") => {
              r.errMsg = t
            },
            N = () => !(!a.value || r.checked || (r.errMsg = r.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款", 0)),
            _ = async () => {
              if (N()) return;
              const t = {
                method: "POST",
                entry: r.entry,
                source: r.source,
                type: x[r.curType],
                url: e.query.url,
                ver: ne
              };
              if ("show_pw" === r.curType) {
                if (!u.form.username || !u.form.password) return void(r.errMsg = "请输入正确的信息");
                fr(), t.username = u.form.username, t.pass = ue(`${[lr,dr].join("\t")}\n${u.form.password}`, r.pubkey), t.cid = u.form.mfaId, t.pwencode = "rsa", t.rsakv = r.rsakv, u.showCode && (t.ccode = u.form.ccode)
              }
              if ("show_sms" === r.curType) {
                if (!b.form.username || !b.form.scode) return void(r.errMsg = "请输入正确的信息");
                "86" === b.form.countryCode ? t.username = `${b.form.username}` : t.username = `00${b.form.countryCode}${b.form.username}`, t.scode = b.form.scode
              }
              if (e.query.disp && (t.disp = e.query.disp), t.rid = "norid", window.wbBotDetector && window.wbBotDetector.get) {
                const e = await window.wbBotDetector.get({
                  useCache: !1
                }).catch(t => {
                  console.log(t)
                });
                t.rid = e?.rid || "getriderror"
              }
              t.scode && (t.scode = Oe(t.scode), t.el = 2), t.username && (t.username = Oe(t.username), t.el = 2);
              const [i, n] = await oe("/sso/v2/login", t);
              if (i) return 432 === i?.response?.status || 429 === i?.response?.status ? void L(`当前系统繁忙，请稍后再试(${i?.response?.status})`) : void 0;
              switch (n.data.data.act) {
                case "mfa_2":
                  u.form.mfaId = n.data.data.mfa_id, u.showCode = !0;
                  break;
                case "mfa_1": {
                  u.form.mfaId = n.data.data.mfa_id;
                  const [t, e] = await ae(n.data.data.mfa_id);
                  if (t) {
                    if ("close" === t.msg) return;
                    return void L(t.msg)
                  }
                  if (!e) return void L("极验返回结果有误");
                  await _()
                }
                return;
                case "goto":
                  window.location.href = n.data.data.location
              }
              const s = +n.data.retcode;
              2e5 !== s && (2070 === s && (u.refreshCode = !0, R(() => {
                u.refreshCode = !1
              })), r.errMsg = n.data.msg)
            };

          function q() {
            return he() || !he() && window.innerWidth < 768
          }
          h(async () => {
            r.entry = e.query.entry, r.source = e.query.source;
            const [t, i] = await oe("/sso/v2/web/config", {
              method: "POST",
              entry: r.entry,
              source: r.source
            });
            var n;
            t || 2e7 !== i.data.retcode || (r.show_pw = !!i.data.data.show_pw, r.show_qq = !!i.data.data.show_qq, r.show_qr = !!i.data.data.show_qr, r.show_sms = !!i.data.data.show_sms, r.show_wechat = !!i.data.data.show_wechat, r.curType = i.data.data.first_show, r.regUrl = i.data.data.reg_url || "https://weibo.com/signup/signup.php", r.forgetUrl = i.data.data.forget_url || "https://security.weibo.com/iforgot/loginname?entry=weibo&loginname=", r.iconUrl = i.data.data.icon_url || "https://h5.sinaimg.cn/upload/1005/891/2024/01/04/weibologo.png", r.pubkey = i.data.data.pubkey, r.rsakv = i.data.data.rsakv, r.wechatUrl = i.data.data.wechat_url, document.title = `登录 - ${i.data.data.title}`, b.countryCodeMenu = i.data.data.country_code.map(t => ({
              code: t.country_code,
              text: t.local.zh_CN
            })), n = i.data.data.nonce, dr = n, (t => {
              if (ur || (ur = new ar(!0)), 0 === t) return ur.clear(), lr = t, !0;
              if (t < 1294935546) return !1;
              const e = function() {
                lr && ur && (lr += 2, ur.start(cr, e))
              };
              lr = t, ur.start(cr, e)
            })(i.data.data.servertime))
          });
          const j = () => {
              a.value = q()
            },
            H = () => {
              r.mobileQRcodeVisible = !0
            },
            U = () => {
              r.mobileQRcodeVisible = !1
            };

          function F() {
            if (a.value && !r.checked) return void(r.errMsg = r.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款");
            if (!C.value) return;
            const t = e.query.url || "";
            let i = `${r.wechatUrl}&r=${t}`;
            e.query.disp && (i += `&disp=${e.query.disp}`), window.location.href = i
          }
          return c(() => {
            window.addEventListener("resize", j)
          }), l(() => {
            window.removeEventListener("resize", j)
          }), (t, h) => (i(), k(P, {
            "icon-url": r.iconUrl
          }, {
            default: D(() => [s("div", pr, [w.value ? (i(), k(we, {
              key: 0,
              visible: r.mobileQRcodeVisible,
              entry: r.entry,
              source: r.source,
              url: y(e).query.url,
              onClickBack: U
            }, null, 8, ["visible", "entry", "source", "url"])) : f("", !0), s("div", gr, [s("div", {
              class: p(["h-16 iphone-safe-header", a.value ? "md:portrait:h-0" : "md:h-0"])
            }, null, 2), s("ul", mr, [s("li", null, [s("a", {
              href: "#",
              class: p(["inline-block pb-2.5", ["show_sms" === r.curType && O.value]]),
              "aria-current": "page",
              onClick: h[0] || (h[0] = m(t => M("show_sms"), ["prevent"]))
            }, [s("span", {
              class: p(a.value ? "md:portrait:hidden" : "md:hidden")
            }, "短信验证登录", 2), s("span", {
              class: p(["hidden", a.value ? "md:portrait:inline" : "md:inline"])
            }, "验证码登录", 2)], 2), "show_sms" === r.curType ? (i(), n("div", {
              key: 0,
              class: p(["absolute z-9 mt-2 text-xs text-sub dark:text-subdark", a.value ? "md:portrait:hidden" : "md:hidden"])
            }, " 未注册手机号验证通过后将自动注册 ", 2)) : f("", !0)]), s("li", null, [s("a", {
              href: "#",
              class: p(["inline-block pb-2.5", ["show_pw" === r.curType && O.value]]),
              onClick: h[1] || (h[1] = m(t => M("show_pw"), ["prevent"]))
            }, [s("span", {
              class: p(a.value ? "md:portrait:hidden" : "md:hidden")
            }, "账号密码登录", 2), s("span", {
              class: p(["hidden", a.value ? "md:portrait:inline" : "md:inline"])
            }, "账号登录", 2)], 2)])]), "show_sms" === r.curType ? (i(), k($e, {
              key: 0,
              modelValue: b.form,
              "onUpdate:modelValue": h[2] || (h[2] = t => b.form = t),
              countryCodeMenu: b.countryCodeMenu,
              entry: r.entry,
              checked: r.checked,
              isMobile: a.value,
              onUpdateErrorMsg: L,
              onTriggerCheckLisence: N
            }, {
              errorMsg: D(() => [s("div", vr, g(r.errMsg), 1)]),
              _: 1
            }, 8, ["modelValue", "countryCodeMenu", "entry", "checked", "isMobile"])) : (i(), k(sr, {
              key: 1,
              modelValue: u.form,
              "onUpdate:modelValue": h[3] || (h[3] = t => u.form = t),
              "show-code": u.showCode,
              "refresh-code": u.refreshCode,
              entry: r.entry,
              "forget-url": r.forgetUrl,
              onUpdateErrorMsg: L
            }, {
              errorMsg: D(() => [s("div", yr, g(r.errMsg), 1)]),
              _: 1
            }, 8, ["modelValue", "show-code", "refresh-code", "entry", "forget-url"])), a.value ? (i(), n("div", {
              key: 2,
              class: p(["flex items-center mt-3.5", a.value ? "md:portrait:hidden" : "md:hidden"])
            }, [A(s("input", {
              id: "checked-checkbox2",
              "onUpdate:modelValue": h[4] || (h[4] = t => r.checked = t),
              type: "checkbox",
              value: "",
              class: "w-4 h-4 bg-transparent border-disabled rounded text-brand dark:border-disableddark dark:text-branddark"
            }, null, 512), [
              [B, r.checked]
            ]), s("label", br, [h[11] || (h[11] = d(" 登录注册即表示同意 ", -1)), r.isSina ? (i(), n(S, {
              key: 0
            }, [h[5] || (h[5] = s("a", {
              href: "https://passport.sinaimg.cn/html/sso/signupagreement_x.html",
              target: "_blank",
              class: "text-alink dark:text-alinkdark"
            }, "新浪网络使用协议", -1)), h[6] || (h[6] = d("、 ", -1)), h[7] || (h[7] = s("a", {
              href: "https://passport.sinaimg.cn/html/sso/privacyclause.html",
              target: "_blank",
              class: "text-alink dark:text-alinkdark"
            }, "新浪个人信息保护政策", -1))], 64)) : (i(), n(S, {
              key: 1
            }, [h[8] || (h[8] = s("a", {
              href: "https://m.weibo.cn/c/regagreement",
              target: "_blank",
              class: "text-alink dark:text-alinkdark"
            }, "用户协议", -1)), h[9] || (h[9] = d("、 ", -1)), h[10] || (h[10] = s("a", {
              href: "https://m.weibo.cn/c/privacy",
              target: "_blank",
              class: "text-alink dark:text-alinkdark"
            }, "隐私条款", -1))], 64))])], 2)) : f("", !0), s("button", {
              type: "button",
              class: "w-full mt-5.5 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark",
              onClick: m(_, ["prevent"])
            }, ["show_sms" === r.curType ? (i(), n("span", wr, "登录/注册")) : (i(), n("span", Tr, "登录"))]), s("div", {
              class: p(["justify-start mt-3 text-xs text-mainb", a.value && "hidden"])
            }, [...h[12] || (h[12] = [d(" 未注册手机验证后自动登录，注册即代表同意 ", -1), s("a", {
              href: "https://m.weibo.cn/c/regagreement",
              target: "_blank",
              class: "text-xs text-alink dark:text-alinkdark"
            }, "《用户协议》", -1), s("a", {
              href: "https://m.weibo.cn/c/privacy",
              target: "_blank",
              class: "text-xs text-alink dark:text-alinkdark"
            }, "《隐私条款》", -1)])], 2)])]), o(or, {
              isMobileLayout: a.value,
              showWechat: C.value,
              onClickQrcode: H,
              onClickWechat: F
            }, null, 8, ["isMobileLayout", "showWechat"])]),
            _: 1
          }, 8, ["icon-url"]))
        }
      })).use(O).mount("#app")
    }
  }
});
