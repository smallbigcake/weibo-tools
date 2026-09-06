! function() {
  function t(e) {
    return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, t(e)
  }

  function e(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, o(n.key), n)
    }
  }

  function r(t) {
    return function(t) {
      if (Array.isArray(t)) return u(t)
    }(t) || function(t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
    }(t) || a(t) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function n(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      e && (n = n.filter((function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      }))), r.push.apply(r, n)
    }
    return r
  }

  function i(t, e, r) {
    return (e = o(e)) in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = r, t
  }

  function o(e) {
    var r = function(e, r) {
      if ("object" != t(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, r || "default");
        if ("object" != t(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.")
      }
      return ("string" === r ? String : Number)(e)
    }(e, "string");
    return "symbol" == t(r) ? r : String(r)
  }

  function s(t, e) {
    return function(t) {
      if (Array.isArray(t)) return t
    }(t) || function(t, e) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var n, i, o, s, a = [],
          u = !0,
          c = !1;
        try {
          if (o = (r = r.call(t)).next, 0 === e) {
            if (Object(r) !== r) return;
            u = !1
          } else
            for (; !(u = (n = o.call(r)).done) && (a.push(n.value), a.length !== e); u = !0);
        } catch (t) {
          c = !0, i = t
        } finally {
          try {
            if (!u && null != r.return && (s = r.return(), Object(s) !== s)) return
          } finally {
            if (c) throw i
          }
        }
        return a
      }
    }(t, e) || a(t, e) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
  }

  function a(t, e) {
    if (t) {
      if ("string" == typeof t) return u(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? u(t, e) : void 0
    }
  }

  function u(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n
  }

  function c() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    c = function() {
      return r
    };
    var e, r = {},
      n = Object.prototype,
      i = n.hasOwnProperty,
      o = Object.defineProperty || function(t, e, r) {
        t[e] = r.value
      },
      s = "function" == typeof Symbol ? Symbol : {},
      a = s.iterator || "@@iterator",
      u = s.asyncIterator || "@@asyncIterator",
      h = s.toStringTag || "@@toStringTag";

    function l(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e]
    }
    try {
      l({}, "")
    } catch (e) {
      l = function(t, e, r) {
        return t[e] = r
      }
    }

    function f(t, e, r, n) {
      var i = e && e.prototype instanceof b ? e : b,
        s = Object.create(i.prototype),
        a = new C(n || []);
      return o(s, "_invoke", {
        value: A(t, r, a)
      }), s
    }

    function d(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        }
      } catch (t) {
        return {
          type: "throw",
          arg: t
        }
      }
    }
    r.wrap = f;
    var p = "suspendedStart",
      g = "suspendedYield",
      m = "executing",
      v = "completed",
      y = {};

    function b() {}

    function w() {}

    function x() {}
    var S = {};
    l(S, a, (function() {
      return this
    }));
    var T = Object.getPrototypeOf,
      k = T && T(T(L([])));
    k && k !== n && i.call(k, a) && (S = k);
    var E = x.prototype = b.prototype = Object.create(S);

    function D(t) {
      ["next", "throw", "return"].forEach((function(e) {
        l(t, e, (function(t) {
          return this._invoke(e, t)
        }))
      }))
    }

    function O(e, r) {
      function n(o, s, a, u) {
        var c = d(e[o], e, s);
        if ("throw" !== c.type) {
          var h = c.arg,
            l = h.value;
          return l && "object" == t(l) && i.call(l, "__await") ? r.resolve(l.__await).then((function(t) {
            n("next", t, a, u)
          }), (function(t) {
            n("throw", t, a, u)
          })) : r.resolve(l).then((function(t) {
            h.value = t, a(h)
          }), (function(t) {
            return n("throw", t, a, u)
          }))
        }
        u(c.arg)
      }
      var s;
      o(this, "_invoke", {
        value: function(t, e) {
          function i() {
            return new r((function(r, i) {
              n(t, e, r, i)
            }))
          }
          return s = s ? s.then(i, i) : i()
        }
      })
    }

    function A(t, r, n) {
      var i = p;
      return function(o, s) {
        if (i === m) throw new Error("Generator is already running");
        if (i === v) {
          if ("throw" === o) throw s;
          return {
            value: e,
            done: !0
          }
        }
        for (n.method = o, n.arg = s;;) {
          var a = n.delegate;
          if (a) {
            var u = B(a, n);
            if (u) {
              if (u === y) continue;
              return u
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;
          else if ("throw" === n.method) {
            if (i === p) throw i = v, n.arg;
            n.dispatchException(n.arg)
          } else "return" === n.method && n.abrupt("return", n.arg);
          i = m;
          var c = d(t, r, n);
          if ("normal" === c.type) {
            if (i = n.done ? v : g, c.arg === y) continue;
            return {
              value: c.arg,
              done: n.done
            }
          }
          "throw" === c.type && (i = v, n.method = "throw", n.arg = c.arg)
        }
      }
    }

    function B(t, r) {
      var n = r.method,
        i = t.iterator[n];
      if (i === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, B(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var o = d(i, t.iterator, r.arg);
      if ("throw" === o.type) return r.method = "throw", r.arg = o.arg, r.delegate = null, y;
      var s = o.arg;
      return s ? s.done ? (r[t.resultName] = s.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : s : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
    }

    function V(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function R(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e
    }

    function C(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(V, this), this.reset(!0)
    }

    function L(r) {
      if (r || "" === r) {
        var n = r[a];
        if (n) return n.call(r);
        if ("function" == typeof r.next) return r;
        if (!isNaN(r.length)) {
          var o = -1,
            s = function t() {
              for (; ++o < r.length;)
                if (i.call(r, o)) return t.value = r[o], t.done = !1, t;
              return t.value = e, t.done = !0, t
            };
          return s.next = s
        }
      }
      throw new TypeError(t(r) + " is not iterable")
    }
    return w.prototype = x, o(E, "constructor", {
      value: x,
      configurable: !0
    }), o(x, "constructor", {
      value: w,
      configurable: !0
    }), w.displayName = l(x, h, "GeneratorFunction"), r.isGeneratorFunction = function(t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === w || "GeneratorFunction" === (e.displayName || e.name))
    }, r.mark = function(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, x) : (t.__proto__ = x, l(t, h, "GeneratorFunction")), t.prototype = Object.create(E), t
    }, r.awrap = function(t) {
      return {
        __await: t
      }
    }, D(O.prototype), l(O.prototype, u, (function() {
      return this
    })), r.AsyncIterator = O, r.async = function(t, e, n, i, o) {
      void 0 === o && (o = Promise);
      var s = new O(f(t, e, n, i), o);
      return r.isGeneratorFunction(e) ? s : s.next().then((function(t) {
        return t.done ? t.value : s.next()
      }))
    }, D(E), l(E, h, "Generator"), l(E, a, (function() {
      return this
    })), l(E, "toString", (function() {
      return "[object Generator]"
    })), r.keys = function(t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(),
        function t() {
          for (; r.length;) {
            var n = r.pop();
            if (n in e) return t.value = n, t.done = !1, t
          }
          return t.done = !0, t
        }
    }, r.values = L, C.prototype = {
      constructor: C,
      reset: function(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(R), !t)
          for (var r in this) "t" === r.charAt(0) && i.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
      },
      stop: function() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval
      },
      dispatchException: function(t) {
        if (this.done) throw t;
        var r = this;

        function n(n, i) {
          return a.type = "throw", a.arg = t, r.next = n, i && (r.method = "next", r.arg = e), !!i
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var s = this.tryEntries[o],
            a = s.completion;
          if ("root" === s.tryLoc) return n("end");
          if (s.tryLoc <= this.prev) {
            var u = i.call(s, "catchLoc"),
              c = i.call(s, "finallyLoc");
            if (u && c) {
              if (this.prev < s.catchLoc) return n(s.catchLoc, !0);
              if (this.prev < s.finallyLoc) return n(s.finallyLoc)
            } else if (u) {
              if (this.prev < s.catchLoc) return n(s.catchLoc, !0)
            } else {
              if (!c) throw new Error("try statement without catch or finally");
              if (this.prev < s.finallyLoc) return n(s.finallyLoc)
            }
          }
        }
      },
      abrupt: function(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var n = this.tryEntries[r];
          if (n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var o = n;
            break
          }
        }
        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
        var s = o ? o.completion : {};
        return s.type = t, s.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, y) : this.complete(s)
      },
      complete: function(t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y
      },
      finish: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), R(r), y
        }
      },
      catch: function(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var i = n.arg;
              R(r)
            }
            return i
          }
        }
        throw new Error("illegal catch attempt")
      },
      delegateYield: function(t, r, n) {
        return this.delegate = {
          iterator: L(t),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = e), y
      }
    }, r
  }

  function h(t, e, r, n, i, o, s) {
    try {
      var a = t[o](s),
        u = a.value
    } catch (c) {
      return void r(c)
    }
    a.done ? e(u) : Promise.resolve(u).then(n, i)
  }

  function l(t) {
    return function() {
      var e = this,
        r = arguments;
      return new Promise((function(n, i) {
        var o = t.apply(e, r);

        function s(t) {
          h(o, n, i, s, a, "next", t)
        }

        function a(t) {
          h(o, n, i, s, a, "throw", t)
        }
        s(void 0)
      }))
    }
  }
  System.register(["../../useRoute-legacy-whaJrky6.js"], (function(t, o) {
    "use strict";
    var a, u, h, f, d, p, g, m, v, y, b, w, x, S, T, k, E, D, O, A, B, V, R, C, L, I, P, M, N, j, _, q;
    return {
      setters: [function(t) {
        a = t.d, u = t.c, h = t.a, f = t.o, d = t.b, p = t.r, g = t.e, m = t.u, v = t.f, y = t.g, b = t.h, w = t.i, x = t.j, S = t.k, T = t.n, k = t.t, E = t.w, D = t.l, O = t.m, A = t.p, B = t.q, V = t.F, R = t.s, C = t.v, L = t.x, I = t.y, P = t.z, M = t.A, N = t.B, j = t.C, _ = t.D, q = t.E
      }],
      execute: function() {
        var t = {
            class: "absolute top-10 left-6 items-center md:inline-flex md:top-7"
          },
          o = ["src"],
          H = a({
            __name: "Logo",
            props: {
              src: {
                type: String,
                default: ""
              }
            },
            setup: function(e) {
              return function(r, n) {
                return f(), u("div", t, [h("img", {
                  class: "h-4.5",
                  src: e.src
                }, null, 8, o)])
              }
            }
          }),
          F = {
            class: "absolute inset-0 flex items-start justify-center md:items-center"
          },
          U = {
            class: "w-full min-h-screen bg-card md:relative md:w-182.5 md:h-125 md:min-h-0 md:rounded-lg md:shadow-sm dark:bg-carddark"
          },
          K = a({
            __name: "Frame",
            props: {
              iconUrl: {
                type: String,
                default: ""
              }
            },
            setup: function(t) {
              return function(e, r) {
                return f(), u("div", F, [h("div", U, [d(H, {
                  src: t.iconUrl
                }, null, 8, ["src"]), p(e.$slots, "default")])])
              }
            }
          }),
          z = "0123456789abcdefghijklmnopqrstuvwxyz";

        function Z(t) {
          return z.charAt(t)
        }

        function G(t, e) {
          return t & e
        }

        function $(t, e) {
          return t | e
        }

        function W(t, e) {
          return t ^ e
        }

        function Q(t, e) {
          return t & ~e
        }

        function Y(t) {
          if (0 == t) return -1;
          var e = 0;
          return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
        }

        function X(t) {
          for (var e = 0; 0 != t;) t &= t - 1, ++e;
          return e
        }
        var J, tt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        function et(t) {
          var e, r, n = "";
          for (e = 0; e + 3 <= t.length; e += 3) r = parseInt(t.substring(e, e + 3), 16), n += tt.charAt(r >> 6) + tt.charAt(63 & r);
          for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16), n += tt.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16), n += tt.charAt(r >> 2) + tt.charAt((3 & r) << 4));
            (3 & n.length) > 0;) n += "=";
          return n
        }

        function rt(t) {
          var e, r = "",
            n = 0,
            i = 0;
          for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
            var o = tt.indexOf(t.charAt(e));
            o < 0 || (0 == n ? (r += Z(o >> 2), i = 3 & o, n = 1) : 1 == n ? (r += Z(i << 2 | o >> 4), i = 15 & o, n = 2) : 2 == n ? (r += Z(i), r += Z(o >> 2), i = 3 & o, n = 3) : (r += Z(i << 2 | o >> 4), r += Z(15 & o), n = 0))
          }
          return 1 == n && (r += Z(i << 2)), r
        }
        var nt, it = function(t) {
            var e;
            if (void 0 === J) {
              var r = "0123456789ABCDEF",
                n = " \f\n\r\t \u2028\u2029";
              for (J = {}, e = 0; e < 16; ++e) J[r.charAt(e)] = e;
              for (r = r.toLowerCase(), e = 10; e < 16; ++e) J[r.charAt(e)] = e;
              for (e = 0; e < 8; ++e) J[n.charAt(e)] = -1
            }
            var i = [],
              o = 0,
              s = 0;
            for (e = 0; e < t.length; ++e) {
              var a = t.charAt(e);
              if ("=" == a) break;
              if (-1 != (a = J[a])) {
                if (void 0 === a) throw new Error("Illegal character at offset " + e);
                o |= a, ++s >= 2 ? (i[i.length] = o, o = 0, s = 0) : o <<= 4
              }
            }
            if (s) throw new Error("Hex encoding incomplete: 4 bits missing");
            return i
          },
          ot = {
            decode: function(t) {
              var e;
              if (void 0 === nt) {
                var r = "= \f\n\r\t \u2028\u2029";
                for (nt = Object.create(null), e = 0; e < 64; ++e) nt["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                for (nt["-"] = 62, nt._ = 63, e = 0; e < 9; ++e) nt[r.charAt(e)] = -1
              }
              var n = [],
                i = 0,
                o = 0;
              for (e = 0; e < t.length; ++e) {
                var s = t.charAt(e);
                if ("=" == s) break;
                if (-1 != (s = nt[s])) {
                  if (void 0 === s) throw new Error("Illegal character at offset " + e);
                  i |= s, ++o >= 4 ? (n[n.length] = i >> 16, n[n.length] = i >> 8 & 255, n[n.length] = 255 & i, i = 0, o = 0) : i <<= 6
                }
              }
              switch (o) {
                case 1:
                  throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                  n[n.length] = i >> 10;
                  break;
                case 3:
                  n[n.length] = i >> 16, n[n.length] = i >> 8 & 255
              }
              return n
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(t) {
              var e = ot.re.exec(t);
              if (e)
                if (e[1]) t = e[1];
                else {
                  if (!e[2]) throw new Error("RegExp out of sync");
                  t = e[2]
                } return ot.decode(t)
            }
          },
          st = 1e13,
          at = function() {
            function t(t) {
              this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
              var r, n, i = this.buf,
                o = i.length;
              for (r = 0; r < o; ++r)(n = i[r] * t + e) < st ? e = 0 : n -= (e = 0 | n / st) * st, i[r] = n;
              e > 0 && (i[r] = e)
            }, t.prototype.sub = function(t) {
              var e, r, n = this.buf,
                i = n.length;
              for (e = 0; e < i; ++e)(r = n[e] - t) < 0 ? (r += st, t = 1) : t = 0, n[e] = r;
              for (; 0 === n[n.length - 1];) n.pop()
            }, t.prototype.toString = function(t) {
              if (10 != (t || 10)) throw new Error("only base 10 is supported");
              for (var e = this.buf, r = e[e.length - 1].toString(), n = e.length - 2; n >= 0; --n) r += (st + e[n]).toString().substring(1);
              return r
            }, t.prototype.valueOf = function() {
              for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r) e = e * st + t[r];
              return e
            }, t.prototype.simplify = function() {
              var t = this.buf;
              return 1 == t.length ? t[0] : this
            }, t
          }(),
          ut = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
          ct = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

        function ht(t, e) {
          return t.length > e && (t = t.substring(0, e) + "…"), t
        }
        var lt, ft = function() {
            function t(e, r) {
              this.hexDigits = "0123456789ABCDEF", e instanceof t ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = r)
            }
            return t.prototype.get = function(t) {
              if (void 0 === t && (t = this.pos++), t >= this.enc.length) throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
              return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }, t.prototype.hexByte = function(t) {
              return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }, t.prototype.hexDump = function(t, e, r) {
              for (var n = "", i = t; i < e; ++i)
                if (n += this.hexByte(this.get(i)), !0 !== r) switch (15 & i) {
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
            }, t.prototype.isASCII = function(t, e) {
              for (var r = t; r < e; ++r) {
                var n = this.get(r);
                if (n < 32 || n > 176) return !1
              }
              return !0
            }, t.prototype.parseStringISO = function(t, e) {
              for (var r = "", n = t; n < e; ++n) r += String.fromCharCode(this.get(n));
              return r
            }, t.prototype.parseStringUTF = function(t, e) {
              for (var r = "", n = t; n < e;) {
                var i = this.get(n++);
                r += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
              }
              return r
            }, t.prototype.parseStringBMP = function(t, e) {
              for (var r, n, i = "", o = t; o < e;) r = this.get(o++), n = this.get(o++), i += String.fromCharCode(r << 8 | n);
              return i
            }, t.prototype.parseTime = function(t, e, r) {
              var n = this.parseStringISO(t, e),
                i = (r ? ut : ct).exec(n);
              return i ? (r && (i[1] = +i[1], i[1] += +i[1] < 70 ? 2e3 : 1900), n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4], i[5] && (n += ":" + i[5], i[6] && (n += ":" + i[6], i[7] && (n += "." + i[7]))), i[8] && (n += " UTC", "Z" != i[8] && (n += i[8], i[9] && (n += ":" + i[9]))), n) : "Unrecognized time: " + n
            }, t.prototype.parseInteger = function(t, e) {
              for (var r, n = this.get(t), i = n > 127, o = i ? 255 : 0, s = ""; n == o && ++t < e;) n = this.get(t);
              if (0 === (r = e - t)) return i ? -1 : 0;
              if (r > 4) {
                for (s = n, r <<= 3; 0 == (128 & (+s ^ o));) s = +s << 1, --r;
                s = "(" + r + " bit)\n"
              }
              i && (n -= 256);
              for (var a = new at(n), u = t + 1; u < e; ++u) a.mulAdd(256, this.get(u));
              return s + a.toString()
            }, t.prototype.parseBitString = function(t, e, r) {
              for (var n = this.get(t), i = "(" + ((e - t - 1 << 3) - n) + " bit)\n", o = "", s = t + 1; s < e; ++s) {
                for (var a = this.get(s), u = s == e - 1 ? n : 0, c = 7; c >= u; --c) o += a >> c & 1 ? "1" : "0";
                if (o.length > r) return i + ht(o, r)
              }
              return i + o
            }, t.prototype.parseOctetString = function(t, e, r) {
              if (this.isASCII(t, e)) return ht(this.parseStringISO(t, e), r);
              var n = e - t,
                i = "(" + n + " byte)\n";
              n > (r /= 2) && (e = t + r);
              for (var o = t; o < e; ++o) i += this.hexByte(this.get(o));
              return n > r && (i += "…"), i
            }, t.prototype.parseOID = function(t, e, r) {
              for (var n = "", i = new at, o = 0, s = t; s < e; ++s) {
                var a = this.get(s);
                if (i.mulAdd(128, 127 & a), o += 7, !(128 & a)) {
                  if ("" === n)
                    if ((i = i.simplify()) instanceof at) i.sub(80), n = "2." + i.toString();
                    else {
                      var u = i < 80 ? i < 40 ? 0 : 1 : 2;
                      n = u + "." + (i - 40 * u)
                    }
                  else n += "." + i.toString();
                  if (n.length > r) return ht(n, r);
                  i = new at, o = 0
                }
              }
              return o > 0 && (n += ".incomplete"), n
            }, t
          }(),
          dt = function() {
            function t(t, e, r, n, i) {
              if (!(n instanceof pt)) throw new Error("Invalid tag value.");
              this.stream = t, this.header = e, this.length = r, this.tag = n, this.sub = i
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
                  return ht(this.stream.parseStringUTF(e, e + r), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                  return ht(this.stream.parseStringISO(e, e + r), t);
                case 30:
                  return ht(this.stream.parseStringBMP(e, e + r), t);
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
                for (var r = 0, n = this.sub.length; r < n; ++r) e += this.sub[r].toPrettyString(t)
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
              for (var n = 0; n < r; ++n) e = 256 * e + t.get();
              return e
            }, t.prototype.getHexStringValue = function() {
              var t = this.toHexString(),
                e = 2 * this.header,
                r = 2 * this.length;
              return t.substr(e, r)
            }, t.decode = function(e) {
              var r;
              r = e instanceof ft ? e : new ft(e, 0);
              var n = new ft(r),
                i = new pt(r),
                o = t.decodeLength(r),
                s = r.pos,
                a = s - n.pos,
                u = null,
                c = function() {
                  var e = [];
                  if (null !== o) {
                    for (var n = s + o; r.pos < n;) e[e.length] = t.decode(r);
                    if (r.pos != n) throw new Error("Content size is not correct for container starting at offset " + s)
                  } else try {
                    for (;;) {
                      var i = t.decode(r);
                      if (i.tag.isEOC()) break;
                      e[e.length] = i
                    }
                    o = s - r.pos
                  } catch (a) {
                    throw new Error("Exception while decoding undefined length content: " + a)
                  }
                  return e
                };
              if (i.tagConstructed) u = c();
              else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber)) try {
                if (3 == i.tagNumber && 0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                u = c();
                for (var h = 0; h < u.length; ++h)
                  if (u[h].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
              } catch (l) {
                u = null
              }
              if (null === u) {
                if (null === o) throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                r.pos = s + Math.abs(o)
              }
              return new t(n, a, o, i, u)
            }, t
          }(),
          pt = function() {
            function t(t) {
              var e = t.get();
              if (this.tagClass = e >> 6, this.tagConstructed = 0 != (32 & e), this.tagNumber = 31 & e, 31 == this.tagNumber) {
                var r = new at;
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
          gt = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
          mt = (1 << 26) / gt[gt.length - 1],
          vt = function() {
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
              var r, n = (1 << e) - 1,
                i = !1,
                o = "",
                s = this.t,
                a = this.DB - s * this.DB % e;
              if (s-- > 0)
                for (a < this.DB && (r = this[s] >> a) > 0 && (i = !0, o = Z(r)); s >= 0;) a < e ? (r = (this[s] & (1 << a) - 1) << e - a, r |= this[--s] >> (a += this.DB - e)) : (r = this[s] >> (a -= e) & n, a <= 0 && (a += this.DB, --s)), r > 0 && (i = !0), i && (o += Z(r));
              return i ? o : "0"
            }, t.prototype.negate = function() {
              var e = St();
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
              return this.t <= 0 ? 0 : this.DB * (this.t - 1) + Vt(this[this.t - 1] ^ this.s & this.DM)
            }, t.prototype.mod = function(e) {
              var r = St();
              return this.abs().divRemTo(e, null, r), this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r), r
            }, t.prototype.modPowInt = function(t, e) {
              var r;
              return r = t < 256 || e.isEven() ? new bt(e) : new wt(e), this.exp(t, r)
            }, t.prototype.clone = function() {
              var t = St();
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
              var r, n = this.DB - t * this.DB % 8,
                i = 0;
              if (t-- > 0)
                for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n); t >= 0;) n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n, r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255, n <= 0 && (n += this.DB, --t)), 0 != (128 & r) && (r |= -256), 0 == i && (128 & this.s) != (128 & r) && ++i, (i > 0 || r != this.s) && (e[i++] = r);
              return e
            }, t.prototype.equals = function(t) {
              return 0 == this.compareTo(t)
            }, t.prototype.min = function(t) {
              return this.compareTo(t) < 0 ? this : t
            }, t.prototype.max = function(t) {
              return this.compareTo(t) > 0 ? this : t
            }, t.prototype.and = function(t) {
              var e = St();
              return this.bitwiseTo(t, G, e), e
            }, t.prototype.or = function(t) {
              var e = St();
              return this.bitwiseTo(t, $, e), e
            }, t.prototype.xor = function(t) {
              var e = St();
              return this.bitwiseTo(t, W, e), e
            }, t.prototype.andNot = function(t) {
              var e = St();
              return this.bitwiseTo(t, Q, e), e
            }, t.prototype.not = function() {
              for (var t = St(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
              return t.t = this.t, t.s = ~this.s, t
            }, t.prototype.shiftLeft = function(t) {
              var e = St();
              return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
            }, t.prototype.shiftRight = function(t) {
              var e = St();
              return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
            }, t.prototype.getLowestSetBit = function() {
              for (var t = 0; t < this.t; ++t)
                if (0 != this[t]) return t * this.DB + Y(this[t]);
              return this.s < 0 ? this.t * this.DB : -1
            }, t.prototype.bitCount = function() {
              for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += X(this[r] ^ e);
              return t
            }, t.prototype.testBit = function(t) {
              var e = Math.floor(t / this.DB);
              return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }, t.prototype.setBit = function(t) {
              return this.changeBit(t, $)
            }, t.prototype.clearBit = function(t) {
              return this.changeBit(t, Q)
            }, t.prototype.flipBit = function(t) {
              return this.changeBit(t, W)
            }, t.prototype.add = function(t) {
              var e = St();
              return this.addTo(t, e), e
            }, t.prototype.subtract = function(t) {
              var e = St();
              return this.subTo(t, e), e
            }, t.prototype.multiply = function(t) {
              var e = St();
              return this.multiplyTo(t, e), e
            }, t.prototype.divide = function(t) {
              var e = St();
              return this.divRemTo(t, e, null), e
            }, t.prototype.remainder = function(t) {
              var e = St();
              return this.divRemTo(t, null, e), e
            }, t.prototype.divideAndRemainder = function(t) {
              var e = St(),
                r = St();
              return this.divRemTo(t, e, r), [e, r]
            }, t.prototype.modPow = function(t, e) {
              var r, n, i = t.bitLength(),
                o = Bt(1);
              if (i <= 0) return o;
              r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6, n = i < 8 ? new bt(e) : e.isEven() ? new xt(e) : new wt(e);
              var s = [],
                a = 3,
                u = r - 1,
                c = (1 << r) - 1;
              if (s[1] = n.convert(this), r > 1) {
                var h = St();
                for (n.sqrTo(s[1], h); a <= c;) s[a] = St(), n.mulTo(h, s[a - 2], s[a]), a += 2
              }
              var l, f, d = t.t - 1,
                p = !0,
                g = St();
              for (i = Vt(t[d]) - 1; d >= 0;) {
                for (i >= u ? l = t[d] >> i - u & c : (l = (t[d] & (1 << i + 1) - 1) << u - i, d > 0 && (l |= t[d - 1] >> this.DB + i - u)), a = r; 0 == (1 & l);) l >>= 1, --a;
                if ((i -= a) < 0 && (i += this.DB, --d), p) s[l].copyTo(o), p = !1;
                else {
                  for (; a > 1;) n.sqrTo(o, g), n.sqrTo(g, o), a -= 2;
                  a > 0 ? n.sqrTo(o, g) : (f = o, o = g, g = f), n.mulTo(g, s[l], o)
                }
                for (; d >= 0 && 0 == (t[d] & 1 << i);) n.sqrTo(o, g), f = o, o = g, g = f, --i < 0 && (i = this.DB - 1, --d)
              }
              return n.revert(o)
            }, t.prototype.modInverse = function(e) {
              var r = e.isEven();
              if (this.isEven() && r || 0 == e.signum()) return t.ZERO;
              for (var n = e.clone(), i = this.clone(), o = Bt(1), s = Bt(0), a = Bt(0), u = Bt(1); 0 != n.signum();) {
                for (; n.isEven();) n.rShiftTo(1, n), r ? (o.isEven() && s.isEven() || (o.addTo(this, o), s.subTo(e, s)), o.rShiftTo(1, o)) : s.isEven() || s.subTo(e, s), s.rShiftTo(1, s);
                for (; i.isEven();) i.rShiftTo(1, i), r ? (a.isEven() && u.isEven() || (a.addTo(this, a), u.subTo(e, u)), a.rShiftTo(1, a)) : u.isEven() || u.subTo(e, u), u.rShiftTo(1, u);
                n.compareTo(i) >= 0 ? (n.subTo(i, n), r && o.subTo(a, o), s.subTo(u, s)) : (i.subTo(n, i), r && a.subTo(o, a), u.subTo(s, u))
              }
              return 0 != i.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u), u.signum() < 0 ? u.add(e) : u) : u
            }, t.prototype.pow = function(t) {
              return this.exp(t, new yt)
            }, t.prototype.gcd = function(t) {
              var e = this.s < 0 ? this.negate() : this.clone(),
                r = t.s < 0 ? t.negate() : t.clone();
              if (e.compareTo(r) < 0) {
                var n = e;
                e = r, r = n
              }
              var i = e.getLowestSetBit(),
                o = r.getLowestSetBit();
              if (o < 0) return e;
              for (i < o && (o = i), o > 0 && (e.rShiftTo(o, e), r.rShiftTo(o, r)); e.signum() > 0;)(i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e), (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r), e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r));
              return o > 0 && r.lShiftTo(o, r), r
            }, t.prototype.isProbablePrime = function(t) {
              var e, r = this.abs();
              if (1 == r.t && r[0] <= gt[gt.length - 1]) {
                for (e = 0; e < gt.length; ++e)
                  if (r[0] == gt[e]) return !0;
                return !1
              }
              if (r.isEven()) return !1;
              for (e = 1; e < gt.length;) {
                for (var n = gt[e], i = e + 1; i < gt.length && n < mt;) n *= gt[i++];
                for (n = r.modInt(n); e < i;)
                  if (n % gt[e++] == 0) return !1
              }
              return r.millerRabin(t)
            }, t.prototype.copyTo = function(t) {
              for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
              t.t = this.t, t.s = this.s
            }, t.prototype.fromInt = function(t) {
              this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }, t.prototype.fromString = function(e, r) {
              var n;
              if (16 == r) n = 4;
              else if (8 == r) n = 3;
              else if (256 == r) n = 8;
              else if (2 == r) n = 1;
              else if (32 == r) n = 5;
              else {
                if (4 != r) return void this.fromRadix(e, r);
                n = 2
              }
              this.t = 0, this.s = 0;
              for (var i = e.length, o = !1, s = 0; --i >= 0;) {
                var a = 8 == n ? 255 & +e[i] : At(e, i);
                a < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1, 0 == s ? this[this.t++] = a : s + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, (s += n) >= this.DB && (s -= this.DB))
              }
              8 == n && 0 != (128 & +e[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), o && t.ZERO.subTo(this, this)
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
              for (var r = t % this.DB, n = this.DB - r, i = (1 << n) - 1, o = Math.floor(t / this.DB), s = this.s << r & this.DM, a = this.t - 1; a >= 0; --a) e[a + o + 1] = this[a] >> n | s, s = (this[a] & i) << r;
              for (a = o - 1; a >= 0; --a) e[a] = 0;
              e[o] = s, e.t = this.t + o + 1, e.s = this.s, e.clamp()
            }, t.prototype.rShiftTo = function(t, e) {
              e.s = this.s;
              var r = Math.floor(t / this.DB);
              if (r >= this.t) e.t = 0;
              else {
                var n = t % this.DB,
                  i = this.DB - n,
                  o = (1 << n) - 1;
                e[0] = this[r] >> n;
                for (var s = r + 1; s < this.t; ++s) e[s - r - 1] |= (this[s] & o) << i, e[s - r] = this[s] >> n;
                n > 0 && (e[this.t - r - 1] |= (this.s & o) << i), e.t = this.t - r, e.clamp()
              }
            }, t.prototype.subTo = function(t, e) {
              for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;) n += this[r] - t[r], e[r++] = n & this.DM, n >>= this.DB;
              if (t.t < this.t) {
                for (n -= t.s; r < this.t;) n += this[r], e[r++] = n & this.DM, n >>= this.DB;
                n += this.s
              } else {
                for (n += this.s; r < t.t;) n -= t[r], e[r++] = n & this.DM, n >>= this.DB;
                n -= t.s
              }
              e.s = n < 0 ? -1 : 0, n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n), e.t = r, e.clamp()
            }, t.prototype.multiplyTo = function(e, r) {
              var n = this.abs(),
                i = e.abs(),
                o = n.t;
              for (r.t = o + i.t; --o >= 0;) r[o] = 0;
              for (o = 0; o < i.t; ++o) r[o + n.t] = n.am(0, i[o], r, o, 0, n.t);
              r.s = 0, r.clamp(), this.s != e.s && t.ZERO.subTo(r, r)
            }, t.prototype.squareTo = function(t) {
              for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;) t[r] = 0;
              for (r = 0; r < e.t - 1; ++r) {
                var n = e.am(r, e[r], t, 2 * r, 0, 1);
                (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1)
              }
              t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
            }, t.prototype.divRemTo = function(e, r, n) {
              var i = e.abs();
              if (!(i.t <= 0)) {
                var o = this.abs();
                if (o.t < i.t) return null != r && r.fromInt(0), void(null != n && this.copyTo(n));
                null == n && (n = St());
                var s = St(),
                  a = this.s,
                  u = e.s,
                  c = this.DB - Vt(i[i.t - 1]);
                c > 0 ? (i.lShiftTo(c, s), o.lShiftTo(c, n)) : (i.copyTo(s), o.copyTo(n));
                var h = s.t,
                  l = s[h - 1];
                if (0 != l) {
                  var f = l * (1 << this.F1) + (h > 1 ? s[h - 2] >> this.F2 : 0),
                    d = this.FV / f,
                    p = (1 << this.F1) / f,
                    g = 1 << this.F2,
                    m = n.t,
                    v = m - h,
                    y = null == r ? St() : r;
                  for (s.dlShiftTo(v, y), n.compareTo(y) >= 0 && (n[n.t++] = 1, n.subTo(y, n)), t.ONE.dlShiftTo(h, y), y.subTo(s, s); s.t < h;) s[s.t++] = 0;
                  for (; --v >= 0;) {
                    var b = n[--m] == l ? this.DM : Math.floor(n[m] * d + (n[m - 1] + g) * p);
                    if ((n[m] += s.am(0, b, n, v, 0, h)) < b)
                      for (s.dlShiftTo(v, y), n.subTo(y, n); n[m] < --b;) n.subTo(y, n)
                  }
                  null != r && (n.drShiftTo(h, r), a != u && t.ZERO.subTo(r, r)), n.t = h, n.clamp(), c > 0 && n.rShiftTo(c, n), a < 0 && t.ZERO.subTo(n, n)
                }
              }
            }, t.prototype.invDigit = function() {
              if (this.t < 1) return 0;
              var t = this[0];
              if (0 == (1 & t)) return 0;
              var e = 3 & t;
              return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
            }, t.prototype.isEven = function() {
              return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }, t.prototype.exp = function(e, r) {
              if (e > 4294967295 || e < 1) return t.ONE;
              var n = St(),
                i = St(),
                o = r.convert(this),
                s = Vt(e) - 1;
              for (o.copyTo(n); --s >= 0;)
                if (r.sqrTo(n, i), (e & 1 << s) > 0) r.mulTo(i, o, n);
                else {
                  var a = n;
                  n = i, i = a
                } return r.revert(n)
            }, t.prototype.chunkSize = function(t) {
              return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }, t.prototype.toRadix = function(t) {
              if (null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36) return "0";
              var e = this.chunkSize(t),
                r = Math.pow(t, e),
                n = Bt(r),
                i = St(),
                o = St(),
                s = "";
              for (this.divRemTo(n, i, o); i.signum() > 0;) s = (r + o.intValue()).toString(t).substr(1) + s, i.divRemTo(n, i, o);
              return o.intValue().toString(t) + s
            }, t.prototype.fromRadix = function(e, r) {
              this.fromInt(0), null == r && (r = 10);
              for (var n = this.chunkSize(r), i = Math.pow(r, n), o = !1, s = 0, a = 0, u = 0; u < e.length; ++u) {
                var c = At(e, u);
                c < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (o = !0) : (a = r * a + c, ++s >= n && (this.dMultiply(i), this.dAddOffset(a, 0), s = 0, a = 0))
              }
              s > 0 && (this.dMultiply(Math.pow(r, s)), this.dAddOffset(a, 0)), o && t.ZERO.subTo(this, this)
            }, t.prototype.fromNumber = function(e, r, n) {
              if ("number" == typeof r)
                if (e < 2) this.fromInt(1);
                else
                  for (this.fromNumber(e, n), this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), $, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
              else {
                var i = [],
                  o = 7 & e;
                i.length = 1 + (e >> 3), r.nextBytes(i), o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0, this.fromString(i, 256)
              }
            }, t.prototype.bitwiseTo = function(t, e, r) {
              var n, i, o = Math.min(t.t, this.t);
              for (n = 0; n < o; ++n) r[n] = e(this[n], t[n]);
              if (t.t < this.t) {
                for (i = t.s & this.DM, n = o; n < this.t; ++n) r[n] = e(this[n], i);
                r.t = this.t
              } else {
                for (i = this.s & this.DM, n = o; n < t.t; ++n) r[n] = e(i, t[n]);
                r.t = t.t
              }
              r.s = e(this.s, t.s), r.clamp()
            }, t.prototype.changeBit = function(e, r) {
              var n = t.ONE.shiftLeft(e);
              return this.bitwiseTo(n, r, n), n
            }, t.prototype.addTo = function(t, e) {
              for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;) n += this[r] + t[r], e[r++] = n & this.DM, n >>= this.DB;
              if (t.t < this.t) {
                for (n += t.s; r < this.t;) n += this[r], e[r++] = n & this.DM, n >>= this.DB;
                n += this.s
              } else {
                for (n += this.s; r < t.t;) n += t[r], e[r++] = n & this.DM, n >>= this.DB;
                n += t.s
              }
              e.s = n < 0 ? -1 : 0, n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n), e.t = r, e.clamp()
            }, t.prototype.dMultiply = function(t) {
              this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
            }, t.prototype.dAddOffset = function(t, e) {
              if (0 != t) {
                for (; this.t <= e;) this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
              }
            }, t.prototype.multiplyLowerTo = function(t, e, r) {
              var n = Math.min(this.t + t.t, e);
              for (r.s = 0, r.t = n; n > 0;) r[--n] = 0;
              for (var i = r.t - this.t; n < i; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
              for (i = Math.min(t.t, e); n < i; ++n) this.am(0, t[n], r, n, 0, e - n);
              r.clamp()
            }, t.prototype.multiplyUpperTo = function(t, e, r) {
              --e;
              var n = r.t = this.t + t.t - e;
              for (r.s = 0; --n >= 0;) r[n] = 0;
              for (n = Math.max(e - this.t, 0); n < t.t; ++n) r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
              r.clamp(), r.drShiftTo(1, r)
            }, t.prototype.modInt = function(t) {
              if (t <= 0) return 0;
              var e = this.DV % t,
                r = this.s < 0 ? t - 1 : 0;
              if (this.t > 0)
                if (0 == e) r = this[0] % t;
                else
                  for (var n = this.t - 1; n >= 0; --n) r = (e * r + this[n]) % t;
              return r
            }, t.prototype.millerRabin = function(e) {
              var r = this.subtract(t.ONE),
                n = r.getLowestSetBit();
              if (n <= 0) return !1;
              var i = r.shiftRight(n);
              (e = e + 1 >> 1) > gt.length && (e = gt.length);
              for (var o = St(), s = 0; s < e; ++s) {
                o.fromInt(gt[Math.floor(Math.random() * gt.length)]);
                var a = o.modPow(i, this);
                if (0 != a.compareTo(t.ONE) && 0 != a.compareTo(r)) {
                  for (var u = 1; u++ < n && 0 != a.compareTo(r);)
                    if (0 == (a = a.modPowInt(2, this)).compareTo(t.ONE)) return !1;
                  if (0 != a.compareTo(r)) return !1
                }
              }
              return !0
            }, t.prototype.square = function() {
              var t = St();
              return this.squareTo(t), t
            }, t.prototype.gcda = function(t, e) {
              var r = this.s < 0 ? this.negate() : this.clone(),
                n = t.s < 0 ? t.negate() : t.clone();
              if (r.compareTo(n) < 0) {
                var i = r;
                r = n, n = i
              }
              var o = r.getLowestSetBit(),
                s = n.getLowestSetBit();
              if (s < 0) e(r);
              else {
                o < s && (s = o), s > 0 && (r.rShiftTo(s, r), n.rShiftTo(s, n));
                setTimeout((function t() {
                  (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r), (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n), r.compareTo(n) >= 0 ? (r.subTo(n, r), r.rShiftTo(1, r)) : (n.subTo(r, n), n.rShiftTo(1, n)), r.signum() > 0 ? setTimeout(t, 0) : (s > 0 && n.lShiftTo(s, n), setTimeout((function() {
                    e(n)
                  }), 0))
                }), 10)
              }
            }, t.prototype.fromNumberAsync = function(e, r, n, i) {
              if ("number" == typeof r)
                if (e < 2) this.fromInt(1);
                else {
                  this.fromNumber(e, n), this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), $, this), this.isEven() && this.dAddOffset(1, 0);
                  var o = this;
                  setTimeout((function n() {
                    o.dAddOffset(2, 0), o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o), o.isProbablePrime(r) ? setTimeout((function() {
                      i()
                    }), 0) : setTimeout(n, 0)
                  }), 0)
                }
              else {
                var s = [],
                  a = 7 & e;
                s.length = 1 + (e >> 3), r.nextBytes(s), a > 0 ? s[0] &= (1 << a) - 1 : s[0] = 0, this.fromString(s, 256)
              }
            }, t
          }(),
          yt = function() {
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
          bt = function() {
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
          wt = function() {
            function t(t) {
              this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
              var e = St();
              return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(vt.ZERO) > 0 && this.m.subTo(e, e), e
            }, t.prototype.revert = function(t) {
              var e = St();
              return t.copyTo(e), this.reduce(e), e
            }, t.prototype.reduce = function(t) {
              for (; t.t <= this.mt2;) t[t.t++] = 0;
              for (var e = 0; e < this.m.t; ++e) {
                var r = 32767 & t[e],
                  n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
              }
              t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }, t.prototype.mulTo = function(t, e, r) {
              t.multiplyTo(e, r), this.reduce(r)
            }, t.prototype.sqrTo = function(t, e) {
              t.squareTo(e), this.reduce(e)
            }, t
          }(),
          xt = function() {
            function t(t) {
              this.m = t, this.r2 = St(), this.q3 = St(), vt.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
              if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
              if (t.compareTo(this.m) < 0) return t;
              var e = St();
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

        function St() {
          return new vt(null)
        }

        function Tt(t, e) {
          return new vt(t, e)
        }
        var kt = "undefined" != typeof navigator;
        kt && "Microsoft Internet Explorer" == navigator.appName ? (vt.prototype.am = function(t, e, r, n, i, o) {
          for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
            var u = 32767 & this[t],
              c = this[t++] >> 15,
              h = a * u + c * s;
            i = ((u = s * u + ((32767 & h) << 15) + r[n] + (1073741823 & i)) >>> 30) + (h >>> 15) + a * c + (i >>> 30), r[n++] = 1073741823 & u
          }
          return i
        }, lt = 30) : kt && "Netscape" != navigator.appName ? (vt.prototype.am = function(t, e, r, n, i, o) {
          for (; --o >= 0;) {
            var s = e * this[t++] + r[n] + i;
            i = Math.floor(s / 67108864), r[n++] = 67108863 & s
          }
          return i
        }, lt = 26) : (vt.prototype.am = function(t, e, r, n, i, o) {
          for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
            var u = 16383 & this[t],
              c = this[t++] >> 14,
              h = a * u + c * s;
            i = ((u = s * u + ((16383 & h) << 14) + r[n] + i) >> 28) + (h >> 14) + a * c, r[n++] = 268435455 & u
          }
          return i
        }, lt = 28), vt.prototype.DB = lt, vt.prototype.DM = (1 << lt) - 1, vt.prototype.DV = 1 << lt;
        vt.prototype.FV = Math.pow(2, 52), vt.prototype.F1 = 52 - lt, vt.prototype.F2 = 2 * lt - 52;
        var Et, Dt, Ot = [];
        for (Et = "0".charCodeAt(0), Dt = 0; Dt <= 9; ++Dt) Ot[Et++] = Dt;
        for (Et = "a".charCodeAt(0), Dt = 10; Dt < 36; ++Dt) Ot[Et++] = Dt;
        for (Et = "A".charCodeAt(0), Dt = 10; Dt < 36; ++Dt) Ot[Et++] = Dt;

        function At(t, e) {
          var r = Ot[t.charCodeAt(e)];
          return null == r ? -1 : r
        }

        function Bt(t) {
          var e = St();
          return e.fromInt(t), e
        }

        function Vt(t) {
          var e, r = 1;
          return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r
        }
        vt.ZERO = Bt(0), vt.ONE = Bt(1);
        var Rt = function() {
          function t() {
            this.i = 0, this.j = 0, this.S = []
          }
          return t.prototype.init = function(t) {
            var e, r, n;
            for (e = 0; e < 256; ++e) this.S[e] = e;
            for (r = 0, e = 0; e < 256; ++e) r = r + this.S[e] + t[e % t.length] & 255, n = this.S[e], this.S[e] = this.S[r], this.S[r] = n;
            this.i = 0, this.j = 0
          }, t.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
          }, t
        }();
        var Ct, Lt, It = null;
        if (null == It) {
          It = [], Lt = 0;
          var Pt = void 0;
          if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) {
            var Mt = new Uint32Array(256);
            for (window.crypto.getRandomValues(Mt), Pt = 0; Pt < Mt.length; ++Pt) It[Lt++] = 255 & Mt[Pt]
          }
          var Nt = 0,
            jt = function t(e) {
              if ((Nt = Nt || 0) >= 256 || Lt >= 256) window.removeEventListener ? window.removeEventListener("mousemove", t, !1) : window.detachEvent && window.detachEvent("onmousemove", t);
              else try {
                var r = e.x + e.y;
                It[Lt++] = 255 & r, Nt += 1
              } catch (n) {}
            };
          "undefined" != typeof window && (window.addEventListener ? window.addEventListener("mousemove", jt, !1) : window.attachEvent && window.attachEvent("onmousemove", jt))
        }

        function _t() {
          if (null == Ct) {
            for (Ct = new Rt; Lt < 256;) {
              var t = Math.floor(65536 * Math.random());
              It[Lt++] = 255 & t
            }
            for (Ct.init(It), Lt = 0; Lt < It.length; ++Lt) It[Lt] = 0;
            Lt = 0
          }
          return Ct.next()
        }
        var qt = function() {
          function t() {}
          return t.prototype.nextBytes = function(t) {
            for (var e = 0; e < t.length; ++e) t[e] = _t()
          }, t
        }();
        var Ht = function() {
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
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Tt(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
          }, t.prototype.encrypt = function(t) {
            var e = this.n.bitLength() + 7 >> 3,
              r = function(t, e) {
                if (e < t.length + 11) return console.error("Message too long for RSA"), null;
                for (var r = [], n = t.length - 1; n >= 0 && e > 0;) {
                  var i = t.charCodeAt(n--);
                  i < 128 ? r[--e] = i : i > 127 && i < 2048 ? (r[--e] = 63 & i | 128, r[--e] = i >> 6 | 192) : (r[--e] = 63 & i | 128, r[--e] = i >> 6 & 63 | 128, r[--e] = i >> 12 | 224)
                }
                r[--e] = 0;
                for (var o = new qt, s = []; e > 2;) {
                  for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
                  r[--e] = s[0]
                }
                return r[--e] = 2, r[--e] = 0, new vt(r)
              }(t, e);
            if (null == r) return null;
            var n = this.doPublic(r);
            if (null == n) return null;
            for (var i = n.toString(16), o = i.length, s = 0; s < 2 * e - o; s++) i = "0" + i;
            return i
          }, t.prototype.setPrivate = function(t, e, r) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Tt(t, 16), this.e = parseInt(e, 16), this.d = Tt(r, 16)) : console.error("Invalid RSA private key")
          }, t.prototype.setPrivateEx = function(t, e, r, n, i, o, s, a) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Tt(t, 16), this.e = parseInt(e, 16), this.d = Tt(r, 16), this.p = Tt(n, 16), this.q = Tt(i, 16), this.dmp1 = Tt(o, 16), this.dmq1 = Tt(s, 16), this.coeff = Tt(a, 16)) : console.error("Invalid RSA private key")
          }, t.prototype.generate = function(t, e) {
            var r = new qt,
              n = t >> 1;
            this.e = parseInt(e, 16);
            for (var i = new vt(e, 16);;) {
              for (; this.p = new vt(t - n, 1, r), 0 != this.p.subtract(vt.ONE).gcd(i).compareTo(vt.ONE) || !this.p.isProbablePrime(10););
              for (; this.q = new vt(n, 1, r), 0 != this.q.subtract(vt.ONE).gcd(i).compareTo(vt.ONE) || !this.q.isProbablePrime(10););
              if (this.p.compareTo(this.q) <= 0) {
                var o = this.p;
                this.p = this.q, this.q = o
              }
              var s = this.p.subtract(vt.ONE),
                a = this.q.subtract(vt.ONE),
                u = s.multiply(a);
              if (0 == u.gcd(i).compareTo(vt.ONE)) {
                this.n = this.p.multiply(this.q), this.d = i.modInverse(u), this.dmp1 = this.d.mod(s), this.dmq1 = this.d.mod(a), this.coeff = this.q.modInverse(this.p);
                break
              }
            }
          }, t.prototype.decrypt = function(t) {
            var e = Tt(t, 16),
              r = this.doPrivate(e);
            return null == r ? null : function(t, e) {
              var r = t.toByteArray(),
                n = 0;
              for (; n < r.length && 0 == r[n];) ++n;
              if (r.length - n != e - 1 || 2 != r[n]) return null;
              ++n;
              for (; 0 != r[n];)
                if (++n >= r.length) return null;
              var i = "";
              for (; ++n < r.length;) {
                var o = 255 & r[n];
                o < 128 ? i += String.fromCharCode(o) : o > 191 && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & r[n + 1]), ++n) : (i += String.fromCharCode((15 & o) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]), n += 2)
              }
              return i
            }(r, this.n.bitLength() + 7 >> 3)
          }, t.prototype.generateAsync = function(t, e, r) {
            var n = new qt,
              i = t >> 1;
            this.e = parseInt(e, 16);
            var o = new vt(e, 16),
              s = this;
            setTimeout((function e() {
              var a = function() {
                  if (s.p.compareTo(s.q) <= 0) {
                    var t = s.p;
                    s.p = s.q, s.q = t
                  }
                  var n = s.p.subtract(vt.ONE),
                    i = s.q.subtract(vt.ONE),
                    a = n.multiply(i);
                  0 == a.gcd(o).compareTo(vt.ONE) ? (s.n = s.p.multiply(s.q), s.d = o.modInverse(a), s.dmp1 = s.d.mod(n), s.dmq1 = s.d.mod(i), s.coeff = s.q.modInverse(s.p), setTimeout((function() {
                    r()
                  }), 0)) : setTimeout(e, 0)
                },
                u = function t() {
                  s.q = St(), s.q.fromNumberAsync(i, 1, n, (function() {
                    s.q.subtract(vt.ONE).gcda(o, (function(e) {
                      0 == e.compareTo(vt.ONE) && s.q.isProbablePrime(10) ? setTimeout(a, 0) : setTimeout(t, 0)
                    }))
                  }))
                };
              setTimeout((function e() {
                s.p = St(), s.p.fromNumberAsync(t - i, 1, n, (function() {
                  s.p.subtract(vt.ONE).gcda(o, (function(t) {
                    0 == t.compareTo(vt.ONE) && s.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(e, 0)
                  }))
                }))
              }), 0)
            }), 0)
          }, t.prototype.sign = function(t, e, r) {
            var n = function(t, e) {
              if (e < t.length + 22) return console.error("Message too long for RSA"), null;
              for (var r = e - t.length - 6, n = "", i = 0; i < r; i += 2) n += "ff";
              return Tt("0001" + n + "00" + t, 16)
            }((Ft[r] || "") + e(t).toString(), this.n.bitLength() / 4);
            if (null == n) return null;
            var i = this.doPrivate(n);
            if (null == i) return null;
            var o = i.toString(16);
            return 0 == (1 & o.length) ? o : "0" + o
          }, t.prototype.verify = function(t, e, r) {
            var n = Tt(e, 16),
              i = this.doPublic(n);
            return null == i ? null : function(t) {
              for (var e in Ft)
                if (Ft.hasOwnProperty(e)) {
                  var r = Ft[e],
                    n = r.length;
                  if (t.substr(0, n) == r) return t.substr(n)
                } return t
            }
            /*!
                  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
                  Code licensed under the BSD License:
                  http://developer.yahoo.com/yui/license.html
                  version: 2.9.0
                  */
            (i.toString(16).replace(/^1f+00/, "")) == r(t).toString()
          }, t
        }();
        var Ft = {
          md2: "3020300c06082a864886f70d020205000410",
          md5: "3020300c06082a864886f70d020505000410",
          sha1: "3021300906052b0e03021a05000414",
          sha224: "302d300d06096086480165030402040500041c",
          sha256: "3031300d060960864801650304020105000420",
          sha384: "3041300d060960864801650304020205000430",
          sha512: "3051300d060960864801650304020305000440",
          ripemd160: "3021300906052b2403020105000414"
        };
        var Ut = {};
        Ut.lang = {
          extend: function(t, e, r) {
            if (!e || !t) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var n = function() {};
            if (n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.superclass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e), r) {
              var i;
              for (i in r) t.prototype[i] = r[i];
              var o = function() {},
                s = ["toString", "valueOf"];
              try {
                /MSIE/.test(navigator.userAgent) && (o = function(t, e) {
                  for (i = 0; i < s.length; i += 1) {
                    var r = s[i],
                      n = e[r];
                    "function" == typeof n && n != Object.prototype[r] && (t[r] = n)
                  }
                })
              } catch (a) {}
              o(t.prototype, r)
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
        var Kt = {};
        void 0 !== Kt.asn1 && Kt.asn1 || (Kt.asn1 = {}), Kt.asn1.ASN1Util = new function() {
          this.integerToByteHex = function(t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e), e
          }, this.bigIntToMinTwosComplementsHex = function(t) {
            var e = t.toString(16);
            if ("-" != e.substr(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
            else {
              var r = e.substr(1).length;
              r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
              for (var n = "", i = 0; i < r; i++) n += "f";
              e = new vt(n, 16).xor(t).add(vt.ONE).toString(16).replace(/^-/, "")
            }
            return e
          }, this.getPEMStringFromHex = function(t, e) {
            return hextopem(t, e)
          }, this.newObject = function(t) {
            var e = Kt.asn1,
              r = e.DERBoolean,
              n = e.DERInteger,
              i = e.DERBitString,
              o = e.DEROctetString,
              s = e.DERNull,
              a = e.DERObjectIdentifier,
              u = e.DEREnumerated,
              c = e.DERUTF8String,
              h = e.DERNumericString,
              l = e.DERPrintableString,
              f = e.DERTeletexString,
              d = e.DERIA5String,
              p = e.DERUTCTime,
              g = e.DERGeneralizedTime,
              m = e.DERSequence,
              v = e.DERSet,
              y = e.DERTaggedObject,
              b = e.ASN1Util.newObject,
              w = Object.keys(t);
            if (1 != w.length) throw "key of param shall be only one.";
            var x = w[0];
            if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + x + ":")) throw "undefined key: " + x;
            if ("bool" == x) return new r(t[x]);
            if ("int" == x) return new n(t[x]);
            if ("bitstr" == x) return new i(t[x]);
            if ("octstr" == x) return new o(t[x]);
            if ("null" == x) return new s(t[x]);
            if ("oid" == x) return new a(t[x]);
            if ("enum" == x) return new u(t[x]);
            if ("utf8str" == x) return new c(t[x]);
            if ("numstr" == x) return new h(t[x]);
            if ("prnstr" == x) return new l(t[x]);
            if ("telstr" == x) return new f(t[x]);
            if ("ia5str" == x) return new d(t[x]);
            if ("utctime" == x) return new p(t[x]);
            if ("gentime" == x) return new g(t[x]);
            if ("seq" == x) {
              for (var S = t[x], T = [], k = 0; k < S.length; k++) {
                var E = b(S[k]);
                T.push(E)
              }
              return new m({
                array: T
              })
            }
            if ("set" == x) {
              for (S = t[x], T = [], k = 0; k < S.length; k++) {
                E = b(S[k]);
                T.push(E)
              }
              return new v({
                array: T
              })
            }
            if ("tag" == x) {
              var D = t[x];
              if ("[object Array]" === Object.prototype.toString.call(D) && 3 == D.length) {
                var O = b(D[2]);
                return new y({
                  tag: D[0],
                  explicit: D[1],
                  obj: O
                })
              }
              var A = {};
              if (void 0 !== D.explicit && (A.explicit = D.explicit), void 0 !== D.tag && (A.tag = D.tag), void 0 === D.obj) throw "obj shall be specified for 'tag'.";
              return A.obj = b(D.obj), new y(A)
            }
          }, this.jsonToASN1HEX = function(t) {
            return this.newObject(t).getEncodedHex()
          }
        }, Kt.asn1.ASN1Util.oidHexToInt = function(t) {
          for (var e = "", r = parseInt(t.substr(0, 2), 16), n = (e = Math.floor(r / 40) + "." + r % 40, ""), i = 2; i < t.length; i += 2) {
            var o = ("00000000" + parseInt(t.substr(i, 2), 16).toString(2)).slice(-8);
            if (n += o.substr(1, 7), "0" == o.substr(0, 1)) e = e + "." + new vt(n, 2).toString(10), n = ""
          }
          return e
        }, Kt.asn1.ASN1Util.oidIntToHex = function(t) {
          var e = function(t) {
              var e = t.toString(16);
              return 1 == e.length && (e = "0" + e), e
            },
            r = function(t) {
              var r = "",
                n = new vt(t, 10).toString(2),
                i = 7 - n.length % 7;
              7 == i && (i = 0);
              for (var o = "", s = 0; s < i; s++) o += "0";
              n = o + n;
              for (s = 0; s < n.length - 1; s += 7) {
                var a = n.substr(s, 7);
                s != n.length - 7 && (a = "1" + a), r += e(parseInt(a, 2))
              }
              return r
            };
          if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
          var n = "",
            i = t.split("."),
            o = 40 * parseInt(i[0]) + parseInt(i[1]);
          n += e(o), i.splice(0, 2);
          for (var s = 0; s < i.length; s++) n += r(i[s]);
          return n
        }, Kt.asn1.ASN1Object = function() {
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
        }, Kt.asn1.DERAbstractString = function(t) {
          Kt.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
            return this.s
          }, this.setString = function(t) {
            this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
          }, this.setStringHex = function(t) {
            this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }, Ut.lang.extend(Kt.asn1.DERAbstractString, Kt.asn1.ASN1Object), Kt.asn1.DERAbstractTime = function(t) {
          Kt.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
            return utc = t.getTime() + 6e4 * t.getTimezoneOffset(), new Date(utc)
          }, this.formatDate = function(t, e, r) {
            var n = this.zeroPadding,
              i = this.localDateToUTC(t),
              o = String(i.getFullYear());
            "utc" == e && (o = o.substr(2, 2));
            var s = o + n(String(i.getMonth() + 1), 2) + n(String(i.getDate()), 2) + n(String(i.getHours()), 2) + n(String(i.getMinutes()), 2) + n(String(i.getSeconds()), 2);
            if (!0 === r) {
              var a = i.getMilliseconds();
              if (0 != a) {
                var u = n(String(a), 3);
                s = s + "." + (u = u.replace(/[0]+$/, ""))
              }
            }
            return s + "Z"
          }, this.zeroPadding = function(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
          }, this.getString = function() {
            return this.s
          }, this.setString = function(t) {
            this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t)
          }, this.setByDateValue = function(t, e, r, n, i, o) {
            var s = new Date(Date.UTC(t, e - 1, r, n, i, o, 0));
            this.setByDate(s)
          }, this.getFreshValueHex = function() {
            return this.hV
          }
        }, Ut.lang.extend(Kt.asn1.DERAbstractTime, Kt.asn1.ASN1Object), Kt.asn1.DERAbstractStructured = function(t) {
          Kt.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
            this.hTLV = null, this.isModified = !0, this.asn1Array = t
          }, this.appendASN1Object = function(t) {
            this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
          }, this.asn1Array = new Array, void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }, Ut.lang.extend(Kt.asn1.DERAbstractStructured, Kt.asn1.ASN1Object), Kt.asn1.DERBoolean = function() {
          Kt.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
        }, Ut.lang.extend(Kt.asn1.DERBoolean, Kt.asn1.ASN1Object), Kt.asn1.DERInteger = function(t) {
          Kt.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
            this.hTLV = null, this.isModified = !0, this.hV = Kt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
          }, this.setByInteger = function(t) {
            var e = new vt(String(t), 10);
            this.setByBigInteger(e)
          }, this.setValueHex = function(t) {
            this.hV = t
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }, Ut.lang.extend(Kt.asn1.DERInteger, Kt.asn1.ASN1Object), Kt.asn1.DERBitString = function(t) {
          if (void 0 !== t && void 0 !== t.obj) {
            var e = Kt.asn1.ASN1Util.newObject(t.obj);
            t.hex = "00" + e.getEncodedHex()
          }
          Kt.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
            this.hTLV = null, this.isModified = !0, this.hV = t
          }, this.setUnusedBitsAndHexValue = function(t, e) {
            if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
            var r = "0" + t;
            this.hTLV = null, this.isModified = !0, this.hV = r + e
          }, this.setByBinaryString = function(t) {
            var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
            8 == e && (e = 0);
            for (var r = 0; r <= e; r++) t += "0";
            var n = "";
            for (r = 0; r < t.length - 1; r += 8) {
              var i = t.substr(r, 8),
                o = parseInt(i, 2).toString(16);
              1 == o.length && (o = "0" + o), n += o
            }
            this.hTLV = null, this.isModified = !0, this.hV = "0" + e + n
          }, this.setByBooleanArray = function(t) {
            for (var e = "", r = 0; r < t.length; r++) 1 == t[r] ? e += "1" : e += "0";
            this.setByBinaryString(e)
          }, this.newFalseArray = function(t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = !1;
            return e
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }, Ut.lang.extend(Kt.asn1.DERBitString, Kt.asn1.ASN1Object), Kt.asn1.DEROctetString = function(t) {
          if (void 0 !== t && void 0 !== t.obj) {
            var e = Kt.asn1.ASN1Util.newObject(t.obj);
            t.hex = e.getEncodedHex()
          }
          Kt.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04"
        }, Ut.lang.extend(Kt.asn1.DEROctetString, Kt.asn1.DERAbstractString), Kt.asn1.DERNull = function() {
          Kt.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
        }, Ut.lang.extend(Kt.asn1.DERNull, Kt.asn1.ASN1Object), Kt.asn1.DERObjectIdentifier = function(t) {
          var e = function(t) {
              var e = t.toString(16);
              return 1 == e.length && (e = "0" + e), e
            },
            r = function(t) {
              var r = "",
                n = new vt(t, 10).toString(2),
                i = 7 - n.length % 7;
              7 == i && (i = 0);
              for (var o = "", s = 0; s < i; s++) o += "0";
              n = o + n;
              for (s = 0; s < n.length - 1; s += 7) {
                var a = n.substr(s, 7);
                s != n.length - 7 && (a = "1" + a), r += e(parseInt(a, 2))
              }
              return r
            };
          Kt.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(t) {
            this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
          }, this.setValueOidString = function(t) {
            if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
            var n = "",
              i = t.split("."),
              o = 40 * parseInt(i[0]) + parseInt(i[1]);
            n += e(o), i.splice(0, 2);
            for (var s = 0; s < i.length; s++) n += r(i[s]);
            this.hTLV = null, this.isModified = !0, this.s = null, this.hV = n
          }, this.setValueName = function(t) {
            var e = Kt.asn1.x509.OID.name2oid(t);
            if ("" === e) throw "DERObjectIdentifier oidName undefined: " + t;
            this.setValueOidString(e)
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }, Ut.lang.extend(Kt.asn1.DERObjectIdentifier, Kt.asn1.ASN1Object), Kt.asn1.DEREnumerated = function(t) {
          Kt.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
            this.hTLV = null, this.isModified = !0, this.hV = Kt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
          }, this.setByInteger = function(t) {
            var e = new vt(String(t), 10);
            this.setByBigInteger(e)
          }, this.setValueHex = function(t) {
            this.hV = t
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }, Ut.lang.extend(Kt.asn1.DEREnumerated, Kt.asn1.ASN1Object), Kt.asn1.DERUTF8String = function(t) {
          Kt.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c"
        }, Ut.lang.extend(Kt.asn1.DERUTF8String, Kt.asn1.DERAbstractString), Kt.asn1.DERNumericString = function(t) {
          Kt.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12"
        }, Ut.lang.extend(Kt.asn1.DERNumericString, Kt.asn1.DERAbstractString), Kt.asn1.DERPrintableString = function(t) {
          Kt.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13"
        }, Ut.lang.extend(Kt.asn1.DERPrintableString, Kt.asn1.DERAbstractString), Kt.asn1.DERTeletexString = function(t) {
          Kt.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14"
        }, Ut.lang.extend(Kt.asn1.DERTeletexString, Kt.asn1.DERAbstractString), Kt.asn1.DERIA5String = function(t) {
          Kt.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16"
        }, Ut.lang.extend(Kt.asn1.DERIA5String, Kt.asn1.DERAbstractString), Kt.asn1.DERUTCTime = function(t) {
          Kt.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function(t) {
            this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
          }, this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
          }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }, Ut.lang.extend(Kt.asn1.DERUTCTime, Kt.asn1.DERAbstractTime), Kt.asn1.DERGeneralizedTime = function(t) {
          Kt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.withMillis = !1, this.setByDate = function(t) {
            this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
          }, this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
          }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date), !0 === t.millis && (this.withMillis = !0))
        }, Ut.lang.extend(Kt.asn1.DERGeneralizedTime, Kt.asn1.DERAbstractTime), Kt.asn1.DERSequence = function(t) {
          Kt.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
              t += this.asn1Array[e].getEncodedHex()
            }
            return this.hV = t, this.hV
          }
        }, Ut.lang.extend(Kt.asn1.DERSequence, Kt.asn1.DERAbstractStructured), Kt.asn1.DERSet = function(t) {
          Kt.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
            for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
              var r = this.asn1Array[e];
              t.push(r.getEncodedHex())
            }
            return 1 == this.sortFlag && t.sort(), this.hV = t.join(""), this.hV
          }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }, Ut.lang.extend(Kt.asn1.DERSet, Kt.asn1.DERAbstractStructured), Kt.asn1.DERTaggedObject = function(t) {
          Kt.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(t, e, r) {
            this.hT = e, this.isExplicit = t, this.asn1Object = r, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = r.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1)
          }, this.getFreshValueHex = function() {
            return this.hV
          }, void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag), void 0 !== t.explicit && (this.isExplicit = t.explicit), void 0 !== t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }, Ut.lang.extend(Kt.asn1.DERTaggedObject, Kt.asn1.ASN1Object);
        var zt, Zt, Gt = (zt = function(t, e) {
            return zt = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function(t, e) {
              t.__proto__ = e
            } || function(t, e) {
              for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }, zt(t, e)
          }, function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function r() {
              this.constructor = t
            }
            zt(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
          }),
          $t = function(t) {
            function e(r) {
              var n = t.call(this) || this;
              return r && ("string" == typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)), n
            }
            return Gt(e, t), e.prototype.parseKey = function(t) {
              try {
                var e = 0,
                  r = 0,
                  n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? it(t) : ot.unarmor(t),
                  i = dt.decode(n);
                if (3 === i.sub.length && (i = i.sub[2].sub[0]), 9 === i.sub.length) {
                  e = i.sub[1].getHexStringValue(), this.n = Tt(e, 16), r = i.sub[2].getHexStringValue(), this.e = parseInt(r, 16);
                  var o = i.sub[3].getHexStringValue();
                  this.d = Tt(o, 16);
                  var s = i.sub[4].getHexStringValue();
                  this.p = Tt(s, 16);
                  var a = i.sub[5].getHexStringValue();
                  this.q = Tt(a, 16);
                  var u = i.sub[6].getHexStringValue();
                  this.dmp1 = Tt(u, 16);
                  var c = i.sub[7].getHexStringValue();
                  this.dmq1 = Tt(c, 16);
                  var h = i.sub[8].getHexStringValue();
                  this.coeff = Tt(h, 16)
                } else {
                  if (2 !== i.sub.length) return !1;
                  if (i.sub[0].sub) {
                    var l = i.sub[1].sub[0];
                    e = l.sub[0].getHexStringValue(), this.n = Tt(e, 16), r = l.sub[1].getHexStringValue(), this.e = parseInt(r, 16)
                  } else e = i.sub[0].getHexStringValue(), this.n = Tt(e, 16), r = i.sub[1].getHexStringValue(), this.e = parseInt(r, 16)
                }
                return !0
              } catch (f) {
                return !1
              }
            }, e.prototype.getPrivateBaseKey = function() {
              var t = {
                array: [new Kt.asn1.DERInteger({
                  int: 0
                }), new Kt.asn1.DERInteger({
                  bigint: this.n
                }), new Kt.asn1.DERInteger({
                  int: this.e
                }), new Kt.asn1.DERInteger({
                  bigint: this.d
                }), new Kt.asn1.DERInteger({
                  bigint: this.p
                }), new Kt.asn1.DERInteger({
                  bigint: this.q
                }), new Kt.asn1.DERInteger({
                  bigint: this.dmp1
                }), new Kt.asn1.DERInteger({
                  bigint: this.dmq1
                }), new Kt.asn1.DERInteger({
                  bigint: this.coeff
                })]
              };
              return new Kt.asn1.DERSequence(t).getEncodedHex()
            }, e.prototype.getPrivateBaseKeyB64 = function() {
              return et(this.getPrivateBaseKey())
            }, e.prototype.getPublicBaseKey = function() {
              var t = new Kt.asn1.DERSequence({
                  array: [new Kt.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                  }), new Kt.asn1.DERNull]
                }),
                e = new Kt.asn1.DERSequence({
                  array: [new Kt.asn1.DERInteger({
                    bigint: this.n
                  }), new Kt.asn1.DERInteger({
                    int: this.e
                  })]
                }),
                r = new Kt.asn1.DERBitString({
                  hex: "00" + e.getEncodedHex()
                });
              return new Kt.asn1.DERSequence({
                array: [t, r]
              }).getEncodedHex()
            }, e.prototype.getPublicBaseKeyB64 = function() {
              return et(this.getPublicBaseKey())
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
          }(Ht),
          Wt = "undefined" != typeof process ? null === (Zt = {}) || void 0 === Zt ? void 0 : Zt.npm_package_version : void 0,
          Qt = function() {
            function t(t) {
              void 0 === t && (t = {}), t = t || {}, this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null
            }
            return t.prototype.setKey = function(t) {
              this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new $t(t)
            }, t.prototype.setPrivateKey = function(t) {
              this.setKey(t)
            }, t.prototype.setPublicKey = function(t) {
              this.setKey(t)
            }, t.prototype.decrypt = function(t) {
              try {
                return this.getKey().decrypt(rt(t))
              } catch (e) {
                return !1
              }
            }, t.prototype.encrypt = function(t) {
              try {
                return et(this.getKey().encrypt(t))
              } catch (e) {
                return !1
              }
            }, t.prototype.sign = function(t, e, r) {
              try {
                return et(this.getKey().sign(t, e, r))
              } catch (n) {
                return !1
              }
            }, t.prototype.verify = function(t, e, r) {
              try {
                return this.getKey().verify(t, rt(e), r)
              } catch (n) {
                return !1
              }
            }, t.prototype.getKey = function(t) {
              if (!this.key) {
                if (this.key = new $t, t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
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
            }, t.version = Wt, t
          }(),
          Yt = "https://security.weibo.com/iforgot/loginname?entry=".concat("weibo", "&loginname="),
          Xt = "20250520",
          Jt = function() {
            var t = l(c().mark((function t(e) {
              return c().wrap((function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", e.then((function(t) {
                      return [null, t]
                    })).catch((function(t) {
                      return [t, null]
                    })));
                  case 1:
                  case "end":
                    return t.stop()
                }
              }), t)
            })));
            return function(e) {
              return t.apply(this, arguments)
            }
          }(),
          te = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if ("POST" === e.method) {
              var r = Object.assign({}, e);
              return delete r.method, Jt(g.post(t, r))
            }
            var n = Object.assign({}, e);
            return delete n.method, Jt(g.get(t, {
              params: n
            }))
          },
          ee = function(t) {
            return Jt(new Promise((function(e, r) {
              window.ydInit ? window.ydInit({
                geetestKey: t,
                captchaId: "7cda0ba2785647ada4d6e946ddb2d465",
                product: "popup",
                lang: "zh-CN"
              }, (function(t, n, i) {
                i ? e({
                  params: t,
                  msg: n
                }) : r({
                  params: t,
                  msg: n
                })
              })) : r({
                params: {},
                msg: "极验未初始化"
              })
            })))
          },
          re = function(t, e) {
            if (e && t) {
              var r = new Qt({
                default_public_exponent: "10001"
              });
              return r.setPublicKey(e),
                function(t) {
                  for (var e = atob(t), r = new Uint8Array(e.length), n = 0; n < e.length; n++) r[n] = e.charCodeAt(n);
                  return Array.from(r).map((function(t) {
                    return t.toString(16).padStart(2, "0")
                  })).join("")
                }(r.encrypt(t))
            }
          };

        function ne() {
          return t = navigator.userAgent.toLowerCase(), e = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(t), r = /ipad|tablet|playbook|silk/i.test(t), !(!e || r) && (window.innerWidth > window.innerHeight || window.innerHeight > window.innerWidth);
          var t, e, r
        }
        var ie = h("img", {
            class: "h-full",
            src: "https://d.sinaimg.cn/prd/1005/891/2024/12/31/h5_fanhui.png"
          }, null, -1),
          oe = {
            key: 1,
            class: "text-sm text-center mt-5 text-sub"
          },
          se = {
            key: 0,
            class: "w-full h-full absolute bg-white95"
          },
          ae = {
            class: "absolute top-12 left-0 right-0 text-center"
          },
          ue = {
            key: 0,
            class: "w-10 h-10 inline-block",
            viewBox: "0 0 37 40"
          },
          ce = [h("path", {
            d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
            fill: "#8CD232"
          }, null, -1), h("path", {
            d: "M15.7781746,21.4319805 L26.3847763,10.8253788 C27.1658249,10.0443302 28.4321549,10.0443302 29.2132034,10.8253788 C29.994252,11.6064274 29.994252,12.8727573 29.2132034,13.6538059 L17.1923882,25.6746212 C16.4113396,26.4556698 15.1450096,26.4556698 14.363961,25.6746212 L9.41421356,20.7248737 C8.63316498,19.9438252 8.63316498,18.6774952 9.41421356,17.8964466 C10.1952621,17.115398 11.4615921,17.115398 12.2426407,17.8964466 L15.7781746,21.4319805 L15.7781746,21.4319805 Z",
            fill: "#FFFFFF"
          }, null, -1)],
          he = {
            key: 1,
            class: "w-10 h-10 inline-block",
            viewBox: "0 0 38 40"
          },
          le = [h("path", {
            d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z",
            fill: "#FF8200"
          }, null, -1), h("path", {
            d: "M18.5,8 L18.6502192,8.00546148 C19.6911389,8.08147296 20.5,8.94145612 20.5,9.991155 L20.5,9.991155 L20.5,17 L27.508845,17 C28.5602587,17 29.4186829,17.8158778 29.4945492,18.8507377 L29.5,19 L29.4945385,19.1502192 C29.418527,20.1911389 28.5585439,21 27.508845,21 L27.508845,21 L20.5,21 L20.5,28.008845 C20.5,29.0602587 19.6841222,29.9186829 18.6492623,29.9945492 L18.5,30 L18.3497808,29.9945385 C17.3088611,29.918527 16.5,29.0585439 16.5,28.008845 L16.5,28.008845 L16.5,21 L9.491155,21 C8.43974127,21 7.58131707,20.1841222 7.50545085,19.1492623 L7.5,19 L7.50546148,18.8497808 C7.58147296,17.8088611 8.44145612,17 9.491155,17 L9.491155,17 L16.5,17 L16.5,9.991155 C16.5,8.93974127 17.3158778,8.08131707 18.3507377,8.00545085 L18.5,8 Z",
            fill: "#FFFFFF",
            transform: "translate(18.500000, 19.000000) rotate(-225.000000) translate(-18.500000, -19.000000) "
          }, null, -1)],
          fe = {
            key: 2,
            class: "w-10 h-10 inline-block",
            viewBox: "0 0 40 40"
          },
          de = [h("path", {
            fill: "#507DAF",
            d: "M18.5,0 C28.7172679,0 37,8.28273213 37,18.5 C37,27.9587927 29.9013547,35.759608 20.740846,36.865664 L18.5,40 L16.2601516,36.8657844 C7.09916065,35.7601744 0,27.9591361 0,18.5 C0,8.28273213 8.28273213,0 18.5,0 Z M18.5,15 C17.3954305,15 16.5,15.8933973 16.5,16.9918842 L16.5,16.9918842 L16.5,28.0081158 L16.5059944,28.1641306 C16.5814663,29.1422683 17.3609071,29.9222992 18.3497808,29.9945365 L18.3497808,29.9945365 L18.5,30 L18.6492623,29.9945271 C19.6841222,29.9183583 20.5,29.0566714 20.5,28.0081158 L20.5,28.0081158 L20.5,16.9918842 L20.4940056,16.8358694 C20.4185337,15.8577317 19.6390929,15.0777008 18.6502192,15.0054635 L18.6502192,15.0054635 Z M18.5,9 C17.396,9 16.5,9.89303565 16.5,10.9980007 C16.5,12.1029657 17.396,13 18.5,13 C19.6053333,13 20.5,12.1029657 20.5,10.9980007 C20.5,9.89303565 19.6053333,9 18.5,9 Z"
          }, null, -1)],
          pe = {
            class: "absolute top-28 break-all w-full px-8 text-xs text-center"
          },
          ge = {
            class: "w-45 h-45 p-5"
          },
          me = ["src"],
          ve = {
            key: 2,
            class: "text-sm"
          },
          ye = a({
            __name: "QRcode",
            props: {
              entry: String,
              source: String,
              url: String,
              visible: Boolean
            },
            emits: ["click-back"],
            setup: function(t, e) {
              e.emit;
              var r = t,
                n = m(),
                i = v(""),
                o = v(""),
                a = v(""),
                d = v(null),
                p = function() {
                  var t = l(c().mark((function t() {
                    var e, i, u, h, l, f, p, g, m = arguments;
                    return c().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          if (e = m.length > 0 && void 0 !== m[0] ? m[0] : "", i = "norid", !window.wbBotDetector || !window.wbBotDetector.get) {
                            t.next = 7;
                            break
                          }
                          return t.next = 5, window.wbBotDetector.get({
                            useCache: !0
                          }).catch((function(t) {
                            console.log(t)
                          }));
                        case 5:
                          u = t.sent, i = (null == u ? void 0 : u.rid) || "getriderror";
                        case 7:
                          return t.next = 9, te("/sso/v2/qrcode/check", {
                            entry: r.entry,
                            source: r.source,
                            url: r.url,
                            qrid: e,
                            disp: n.query.disp,
                            rid: i,
                            ver: Xt
                          });
                        case 9:
                          if (h = t.sent, l = s(h, 2), f = l[0], p = l[1], !f) {
                            t.next = 15;
                            break
                          }
                          return t.abrupt("return");
                        case 15:
                          g = +p.data.retcode, t.t0 = g, t.next = 50114002 === t.t0 ? 19 : 50114003 === t.t0 || 50114004 === t.t0 || 50114015 === t.t0 ? 21 : 2e7 === t.t0 ? 23 : 26;
                          break;
                        case 19:
                          return o.value = "warning", t.abrupt("break", 26);
                        case 21:
                          return o.value = "error", t.abrupt("break", 26);
                        case 23:
                          return o.value = "success", a.value = "扫描成功", t.abrupt("break", 26);
                        case 26:
                          2e7 === g ? (clearInterval(d.value), d.value = null, p.data.data.url && window.location.replace(p.data.data.url)) : a.value = p.data.msg;
                        case 27:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  })));
                  return function() {
                    return t.apply(this, arguments)
                  }
                }(),
                g = function() {
                  var t = l(c().mark((function t() {
                    var e, n, o, a, u;
                    return c().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          return d.value && (clearInterval(d.value), d.value = null), t.next = 3, te("/sso/v2/qrcode/image", {
                            entry: r.entry,
                            size: 180
                          });
                        case 3:
                          if (n = t.sent, o = s(n, 2), a = o[0], u = o[1], !a) {
                            t.next = 9;
                            break
                          }
                          return t.abrupt("return");
                        case 9:
                          if (2e7 === u.data.retcode) {
                            t.next = 11;
                            break
                          }
                          return t.abrupt("return");
                        case 11:
                          i.value = null === (e = u.data) || void 0 === e || null === (e = e.data) || void 0 === e ? void 0 : e.image, d.value = setInterval((function() {
                            var t;
                            p(null === (t = u.data) || void 0 === t || null === (t = t.data) || void 0 === t ? void 0 : t.qrid)
                          }), 4e3);
                        case 13:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  })));
                  return function() {
                    return t.apply(this, arguments)
                  }
                }(),
                D = function() {
                  a.value = "", o.value = "", g()
                };
              return y(l(c().mark((function t() {
                  return c().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        g();
                      case 1:
                      case "end":
                        return t.stop()
                    }
                  }), t)
                })))), b((function() {
                  clearInterval(d.value), d.value = null
                })), w((function() {})),
                function(e, r) {
                  return f(), u("div", {
                    class: T(["flex-col items-center justify-center w-82.5 height-full border-r border-line md:flex dark:border-linedark", t.visible ? "fixed bg-white w-full h-full z-9999" : ""])
                  }, [t.visible ? (f(), u("div", {
                    key: 0,
                    class: "absolute top-10 left-6 leading-[30px] h-[30px] text-darkGray flex",
                    onClick: r[0] || (r[0] = function(t) {
                      return e.$emit("click-back")
                    })
                  }, [ie, x(" 返回 ")])) : S("", !0), h("div", {
                    class: T(["leading-4.5 font-medium", t.visible ? "text-center mt-25" : ""])
                  }, "扫描二维码登录", 2), t.visible ? (f(), u("div", oe, "打开微博手机APP - 我的页面 - 扫一扫")) : S("", !0), h("div", {
                    class: T(["relative border-2 border-line dark:border-linedark", t.visible ? "m-0 mt-[30px] w-[183px] h-[183px] relative left-2/4 -translate-x-2/4" : "m-8.5"])
                  }, [o.value ? (f(), u("div", se, [h("div", ae, ["success" === o.value ? (f(), u("svg", ue, ce)) : S("", !0), "error" === o.value ? (f(), u("svg", he, le)) : S("", !0), "warning" === o.value ? (f(), u("svg", fe, de)) : S("", !0)]), h("div", pe, k(a.value), 1), "error" === o.value ? (f(), u("a", {
                    key: 0,
                    href: "",
                    class: "absolute top-36 break-all w-full px-8 text-xs text-center text-brand",
                    onClick: E(D, ["prevent"])
                  }, "点击刷新")) : S("", !0)])) : S("", !0), h("div", ge, [i.value ? (f(), u("img", {
                    key: 0,
                    src: i.value,
                    alt: "",
                    class: "w-full h-full"
                  }, null, 8, me)) : S("", !0)])], 2), t.visible ? S("", !0) : (f(), u("div", ve, "打开微博手机APP - 我的页面 - 扫一扫"))], 2)
                }
            }
          });

        function be(t) {
          return "function" == typeof t ? t() : D(t)
        }
        var we = "undefined" != typeof window && "undefined" != typeof document;
        "undefined" != typeof WorkerGlobalScope && (globalThis, WorkerGlobalScope);
        var xe = Object.prototype.toString,
          Se = function(t) {
            return "[object Object]" === xe.call(t)
          },
          Te = function() {},
          ke = Ee();

        function Ee() {
          var t, e;
          return we && (null == (t = null == window ? void 0 : window.navigator) ? void 0 : t.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || (null == (e = null == window ? void 0 : window.navigator) ? void 0 : e.maxTouchPoints) > 2 && /iPad|Macintosh/.test(null == window ? void 0 : window.navigator.userAgent))
        }

        function De(t) {
          var e, r = be(t);
          return null != (e = null == r ? void 0 : r.$el) ? e : r
        }
        var Oe = we ? window : void 0;

        function Ae() {
          for (var t, e, o, a, u = arguments.length, c = new Array(u), h = 0; h < u; h++) c[h] = arguments[h];
          if ("string" == typeof c[0] || Array.isArray(c[0]) ? (e = c[0], o = c[1], a = c[2], t = Oe) : (t = c[0], e = c[1], o = c[2], a = c[3]), !t) return Te;
          Array.isArray(e) || (e = [e]), Array.isArray(o) || (o = [o]);
          var l, f = [],
            d = function() {
              f.forEach((function(t) {
                return t()
              })), f.length = 0
            },
            p = B((function() {
              return [De(t), be(a)]
            }), (function(t) {
              var a = s(t, 2),
                u = a[0],
                c = a[1];
              if (d(), u) {
                var h = Se(c) ? function(t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var r = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? n(Object(r), !0).forEach((function(e) {
                      i(t, e, r[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(e) {
                      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
                    }))
                  }
                  return t
                }({}, c) : c;
                f.push.apply(f, r(e.flatMap((function(t) {
                  return o.map((function(e) {
                    return function(t, e, r, n) {
                      return t.addEventListener(e, r, n),
                        function() {
                          return t.removeEventListener(e, r, n)
                        }
                    }(u, t, e, h)
                  }))
                }))))
              }
            }), {
              immediate: !0,
              flush: "post"
            }),
            g = function() {
              p(), d()
            };
          return l = g, O() && A(l), g
        }
        var Be = !1;

        function Ve(t) {
          for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "MwmL8jWA", r = e.length, n = [], i = 0; i < t.length; i++) n.push(String.fromCharCode(t.charCodeAt(i) ^ e.charCodeAt(i % r)));
          return function(t) {
            for (var e = "", r = 0; r < t.length; r++) {
              var n = t.charCodeAt(r).toString(16);
              e += 1 === n.length ? "0".concat(n) : n
            }
            return e
          }(n.reverse().join(""))
        }
        var Re, Ce = {
            key: 0,
            class: "mt-10 md:mt-6.5",
            tabindex: "0"
          },
          Le = {
            class: "relative"
          },
          Ie = {
            class: "absolute top-1/2 left-0 z-9 -translate-y-1/2"
          },
          Pe = h("svg", {
            class: "w-3 h-3 ml-1 text-main dark:text-maindark",
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "currentColor",
            viewBox: "0 0 612 612"
          }, [h("path", {
            d: "M565.2,173.2c-8.2-8.1-21.5-8.1-29.6,0L303.5,403.4L75.7,177.6c-8-8-21.1-8-29.1,0c-8,7.9-8,20.9,0,28.8l241.3,239.2\n                  c0.3,0.3,0.8,0.4,1.1,0.7c0.2,0.2,0.2,0.4,0.3,0.5c8.2,8.1,21.5,8.1,29.6,0l246.3-244.2C573.4,194.5,573.4,181.3,565.2,173.2z"
          })], -1),
          Me = {
            class: "p-0.5",
            "aria-labelledby": "dropdownDefaultButton"
          },
          Ne = ["onClick"],
          je = {
            href: "#",
            class: "block px-3 py-2.5 hover:bg-cardin dark:hover:bg-cardindark"
          },
          _e = ["value"],
          qe = {
            class: "relative mt-2.5"
          },
          He = ["value"],
          Fe = {
            class: "absolute inset-y-0 right-0 flex items-center justify-end w-25"
          },
          Ue = {
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
          Ze = a({
            __name: "VerificationCode",
            props: {
              modelValue: {
                type: Object,
                default: function() {
                  return {
                    username: "",
                    scode: "",
                    countryCode: "86"
                  }
                }
              },
              countryCodeMenu: {
                type: Array,
                default: function() {
                  return []
                }
              },
              entry: String,
              checked: Boolean,
              isMobile: Boolean
            },
            emits: ["update-error-msg", "update:modelValue", "trigger-check-lisence"],
            setup: function(t, e) {
              var r = e.emit,
                n = t,
                i = r,
                o = v(null),
                a = v(!1),
                d = v(n.modelValue.countryCode);
              ! function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                  n = r.window,
                  i = void 0 === n ? Oe : n,
                  o = r.ignore,
                  s = void 0 === o ? [] : o,
                  a = r.capture,
                  u = void 0 === a || a,
                  c = r.detectIframe,
                  h = void 0 !== c && c;
                if (!i) return Te;
                ke && !Be && (Be = !0, Array.from(i.document.body.children).forEach((function(t) {
                  return t.addEventListener("click", Te)
                })), i.document.documentElement.addEventListener("click", Te));
                var l = !0,
                  f = function(t) {
                    return s.some((function(e) {
                      if ("string" == typeof e) return Array.from(i.document.querySelectorAll(e)).some((function(e) {
                        return e === t.target || t.composedPath().includes(e)
                      }));
                      var r = De(e);
                      return r && (t.target === r || t.composedPath().includes(r))
                    }))
                  },
                  d = [Ae(i, "click", (function(r) {
                    var n = De(t);
                    n && n !== r.target && !r.composedPath().includes(n) && (0 === r.detail && (l = !f(r)), l ? e(r) : l = !0)
                  }), {
                    passive: !0,
                    capture: u
                  }), Ae(i, "pointerdown", (function(e) {
                    var r = De(t);
                    l = !f(e) && !(!r || e.composedPath().includes(r))
                  }), {
                    passive: !0
                  }), h && Ae(i, "blur", (function(r) {
                    setTimeout((function() {
                      var n, o = De(t);
                      "IFRAME" !== (null == (n = i.document.activeElement) ? void 0 : n.tagName) || (null == o ? void 0 : o.contains(i.document.activeElement)) || e(r)
                    }), 0)
                  }))].filter(Boolean)
              }(o, (function() {
                a.value = !1
              }));
              var g = function(t, e) {
                  var r = n.modelValue;
                  r[e] = t.target.value, i("update:modelValue", r), i("update-error-msg", "")
                },
                m = v(!1),
                y = v(null),
                b = v(60),
                w = function() {
                  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    e = "".concat(n.modelValue.username);
                  return "86" !== n.modelValue.countryCode && (e = "00".concat(n.modelValue.countryCode).concat(n.modelValue.username)), e = Ve(e), te("/sso/v2/sms/send", {
                    method: "POST",
                    entry: n.entry,
                    mobile: e,
                    mfa_id: t,
                    el: 1
                  })
                },
                x = function() {
                  var t = l(c().mark((function t() {
                    var e, r, o, a, u, h, l, f, d, p, g, v, b, x, S, k, E, D;
                    return c().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          if (n.modelValue.username) {
                            t.next = 3;
                            break
                          }
                          return i("update-error-msg", "请输入手机号"), t.abrupt("return");
                        case 3:
                          if (!y.value) {
                            t.next = 5;
                            break
                          }
                          return t.abrupt("return");
                        case 5:
                          if (n.checked || !n.isMobile) {
                            t.next = 8;
                            break
                          }
                          return i("trigger-check-lisence"), t.abrupt("return");
                        case 8:
                          return t.next = 10, w();
                        case 10:
                          if (e = t.sent, r = s(e, 2), o = r[0], a = r[1], !o) {
                            t.next = 20;
                            break
                          }
                          if (432 !== (null == o || null === (u = o.response) || void 0 === u ? void 0 : u.status) && 429 !== (null == o || null === (h = o.response) || void 0 === h ? void 0 : h.status)) {
                            t.next = 18;
                            break
                          }
                          return i("update-error-msg", "当前系统繁忙，请稍后再试(".concat(null == o || null === (l = o.response) || void 0 === l ? void 0 : l.status, ")")), t.abrupt("return");
                        case 18:
                          return i("update-error-msg", "短信接口数据获取失败"), t.abrupt("return");
                        case 20:
                          if (0 !== a.data.retcode || "mfa_1" !== a.data.data.act) {
                            t.next = 57;
                            break
                          }
                          return t.next = 23, ee(a.data.data.mfa_id);
                        case 23:
                          if (f = t.sent, d = s(f, 2), p = d[0], g = d[1], !p) {
                            t.next = 32;
                            break
                          }
                          if ("close" !== p.msg) {
                            t.next = 30;
                            break
                          }
                          return t.abrupt("return");
                        case 30:
                          return i("update-error-msg", p.msg), t.abrupt("return");
                        case 32:
                          if (g) {
                            t.next = 35;
                            break
                          }
                          return i("update-error-msg", "极验返回结果有误"), t.abrupt("return");
                        case 35:
                          return t.next = 37, w(a.data.data.mfa_id);
                        case 37:
                          if (v = t.sent, b = s(v, 2), x = b[0], S = b[1], !x) {
                            t.next = 47;
                            break
                          }
                          if (432 !== (null == x || null === (k = x.response) || void 0 === k ? void 0 : k.status) && 429 !== (null == x || null === (E = x.response) || void 0 === E ? void 0 : E.status)) {
                            t.next = 45;
                            break
                          }
                          return i("update-error-msg", "当前系统繁忙，请稍后再试(".concat(null == x || null === (D = x.response) || void 0 === D ? void 0 : D.status, ")")), t.abrupt("return");
                        case 45:
                          return i("update-error-msg", "二次验证通过，短信接口数据获取失败"), t.abrupt("return");
                        case 47:
                          if (2e7 == +S.data.retcode) {
                            t.next = 52;
                            break
                          }
                          return i("update-error-msg", S.data.msg || "二次验证通过，短信接口获取数据遇到错误"), t.abrupt("return");
                        case 52:
                          m.value = !0, T();
                        case 54:
                          i("update-error-msg", ""), t.next = 59;
                          break;
                        case 57:
                          2e7 === a.data.retcode && (m.value = !0, T()), i("update-error-msg", a.data.msg);
                        case 59:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  })));
                  return function() {
                    return t.apply(this, arguments)
                  }
                }();

              function T() {
                y.value = setInterval((function() {
                  b.value--, b.value <= 0 && (clearInterval(y.value), b.value = 60, m.value = !1, y.value = null)
                }), 1e3)
              }
              return function(e, r) {
                return f(), u("form", Ce, [h("div", Le, [h("div", Ie, [h("button", {
                  id: "dropdownDefaultButton",
                  class: "flex items-center",
                  onClick: r[0] || (r[0] = E((function(t) {
                    return a.value = !a.value
                  }), ["prevent"]))
                }, [h("span", null, "+" + k(d.value), 1), Pe]), a.value ? (f(), u("div", {
                  key: 0,
                  ref_key: "dropdownMenu",
                  ref: o,
                  class: "absolute left-0 z-9 w-49.5 h-51.5 mt-2 bg-card border border-line rounded shadow overflow-x-hidden overflow-y-auto text-sm dark:bg-carddark dark:border-linedark"
                }, [h("ul", Me, [(f(!0), u(V, null, R(t.countryCodeMenu, (function(t, e) {
                  return f(), u("li", {
                    key: e,
                    onClick: function(e) {
                      return r = t.code, d.value = r, a.value = !1, void g({
                        target: {
                          value: r
                        }
                      }, "countryCode");
                      var r
                    }
                  }, [h("a", je, k(t.text), 1)], 8, Ne)
                })), 128))])], 512)) : S("", !0)]), h("input", {
                  value: n.modelValue.username,
                  type: "text",
                  "aria-label": "手机号",
                  class: "block w-full pl-20 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
                  placeholder: "手机号",
                  onInput: r[1] || (r[1] = function(t) {
                    return g(t, "username")
                  })
                }, null, 40, _e)]), h("div", qe, [h("input", {
                  maxlength: "6",
                  value: n.modelValue.scode,
                  type: "text",
                  "aria-label": "验证码",
                  class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
                  placeholder: "验证码",
                  onInput: r[2] || (r[2] = function(t) {
                    return g(t, "scode")
                  })
                }, null, 40, He), h("div", Fe, [m.value ? (f(), u("span", Ke, k(b.value) + "s后重新发送", 1)) : (f(), u(V, {
                  key: 0
                }, [n.modelValue.username ? (f(), u("a", {
                  key: 0,
                  class: "text-sm text-alink dark:text-alinkdark cursor-pointer",
                  onClick: E(x, ["prevent"])
                }, "获取验证码")) : (f(), u("a", Ue, "获取验证码"))], 64))])]), h("div", ze, [p(e.$slots, "errorMsg")])])
              }
            }
          }),
          Ge = {
            class: "mt-10 md:mt-6.5",
            "aria-current": "true",
            tabindex: "1"
          },
          $e = {
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
          nr = ["src"],
          ir = {
            class: "flex items-center justify-between h-4.5 mt-2"
          },
          or = a({
            __name: "Account",
            props: {
              modelValue: {
                type: Object,
                default: function() {
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
            setup: function(t, e) {
              var r = e.emit,
                n = t,
                i = r,
                o = v(""),
                a = function(t, e) {
                  var r = n.modelValue;
                  r[e] = t.target.value, i("update:modelValue", r), i("update-error-msg", "")
                },
                d = function() {
                  var t = l(c().mark((function t() {
                    var e, r, i, a;
                    return c().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          return t.next = 2, te("/sso/v2/captcha/image", {
                            method: "POST",
                            pcid: n.modelValue.mfaId,
                            entry: n.entry
                          });
                        case 2:
                          if (e = t.sent, r = s(e, 2), i = r[0], a = r[1], !i) {
                            t.next = 8;
                            break
                          }
                          return t.abrupt("return");
                        case 8:
                          if (2e7 === a.data.retcode) {
                            t.next = 10;
                            break
                          }
                          return t.abrupt("return");
                        case 10:
                          o.value = a.data.data.image;
                        case 11:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  })));
                  return function() {
                    return t.apply(this, arguments)
                  }
                }(),
                g = function() {
                  window.open(n.forgetUrl)
                };
              return B((function() {
                  return n.showCode
                }), (function(t) {
                  t && d()
                })), B((function() {
                  return n.refreshCode
                }), (function() {
                  d()
                })),
                function(e, r) {
                  return f(), u("form", Ge, [h("div", $e, [h("input", {
                    value: n.modelValue.username,
                    type: "text",
                    "aria-label": "手机号或邮箱",
                    class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
                    placeholder: "手机号或邮箱",
                    onInput: r[0] || (r[0] = function(t) {
                      return a(t, "username")
                    })
                  }, null, 40, We)]), h("div", Qe, [h("input", {
                    value: n.modelValue.password,
                    type: "password",
                    "aria-label": "密码",
                    class: "block w-full pl-0 pr-25 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
                    placeholder: "密码",
                    onInput: r[1] || (r[1] = function(t) {
                      return a(t, "password")
                    })
                  }, null, 40, Ye), h("div", Xe, [h("a", {
                    href: "",
                    class: "text-sm text-alink dark:text-alinkdark",
                    onClick: E(g, ["prevent"])
                  }, "忘记密码")])]), t.showCode ? (f(), u("div", Je, [h("div", tr, [h("input", {
                    value: n.modelValue.ccode,
                    type: "text",
                    "aria-label": "验证码",
                    class: "block w-full px-0 py-3 bg-transparent border-b border-input text-sm text-main placeholder-text-sub focus:outline-none dark:border-inputdark dark:text-maindark dark:placeholder-text-subdark",
                    placeholder: "请输入验证码",
                    onInput: r[2] || (r[2] = function(t) {
                      return a(t, "ccode")
                    })
                  }, null, 40, er)]), h("div", rr, [h("img", {
                    src: o.value,
                    alt: "",
                    class: "w-full h-full",
                    onClick: d
                  }, null, 8, nr)])])) : S("", !0), h("div", ir, [p(e.$slots, "errorMsg")])])
                }
            }
          }),
          sr = h("img", {
            class: "h-[30px] w-[30px] mr-2",
            src: "https://d.sinaimg.cn/prd/1005/891/2025/11/20/wechat.png"
          }, null, -1),
          ar = h("img", {
            class: "h-[30px] w-[30px] mr-2",
            src: "https://d.sinaimg.cn/prd/1005/891/2025/05/27/scan.png"
          }, null, -1),
          ur = a({
            __name: "ExtraEntry",
            props: {
              showWechat: {
                type: Boolean,
                default: !1
              },
              isMobileLayout: Boolean
            },
            emits: ["click-qrcode", "click-wechat"],
            setup: function(t) {
              var e = t,
                r = C((function() {
                  return e.isMobileLayout ? "flex justify-center block w-full bottom-0 text-mainb text-[15px] text-center leading-5 bg-white pb-safe-bottom leading-[30px] whitespace-nowrap" : "absolute bottom-[117px] right-[122px]"
                }));
              return function(e, n) {
                return f(), u("div", {
                  class: T(r.value)
                }, [t.showWechat ? (f(), u("span", {
                  key: 0,
                  class: "flex h-5 justify-center items-center text-[rgb(99, 99, 99)] mx-10 cursor-pointer",
                  onClick: n[0] || (n[0] = function(t) {
                    return e.$emit("click-wechat")
                  })
                }, [sr, x("微信登录")])) : S("", !0), t.isMobileLayout ? (f(), u("span", {
                  key: 1,
                  class: "flex h-5 justify-center items-center mx-10",
                  onClick: n[1] || (n[1] = function(t) {
                    return e.$emit("click-qrcode")
                  })
                }, [ar, x("扫码登录")])) : S("", !0)], 2)
              }
            }
          }),
          cr = function() {
            function t(e) {
              ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, t), i(this, "mytimer", null), this.enable = e
            }
            var r, n, o;
            return r = t, (n = [{
              key: "start",
              value: function(t, e) {
                this.enable && (this.mytimer = setTimeout(e, t))
              }
            }, {
              key: "clear",
              value: function() {
                this.enable && (clearTimeout(this.mytimer), this.mytimer = null)
              }
            }, {
              key: "isset",
              value: function() {
                return null !== this.mytimer
              }
            }]) && e(r.prototype, n), o && e(r, o), Object.defineProperty(r, "prototype", {
              writable: !1
            }), t
          }(),
          hr = null,
          lr = null,
          fr = 0,
          dr = 2e3,
          pr = function(t) {
            if (hr || (hr = new cr(!0)), 0 === t) return hr.clear(), fr = t, !0;
            if (t < 1294935546) return !1;
            fr = t, hr.start(dr, (function t() {
              fr && hr && (fr += 2, hr.start(dr, t))
            }))
          },
          gr = function() {
            lr ? lr.clear() : lr = new cr(!1), lr.start(5e3, (function() {
              lr && lr.clear()
            })), fr && (Re || (Re = function(t) {
              for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "", n = 0; n < t; n++) r += e.charAt(Math.ceil(1e6 * Math.random()) % 36);
              return r
            }(6)))
          },
          mr = {
            class: "flex h-full pb-[25px]"
          },
          vr = {
            class: "flex-1 px-6 pt-5 md:pt-7"
          },
          yr = {
            class: "flex flex-wrap space-x-6.5"
          },
          br = {
            class: "text-s text-red dark:text-reddark"
          },
          wr = {
            class: "text-s text-red dark:text-reddark"
          },
          xr = {
            for: "checked-checkbox2",
            class: "ml-1 text-s text-sub dark:text-subdark"
          },
          Sr = h("a", {
            href: "https://passport.sinaimg.cn/html/sso/signupagreement_x.html",
            target: "_blank",
            class: "text-alink dark:text-alinkdark"
          }, "新浪网络使用协议", -1),
          Tr = h("a", {
            href: "https://passport.sinaimg.cn/html/sso/privacyclause.html",
            target: "_blank",
            class: "text-alink dark:text-alinkdark"
          }, "新浪个人信息保护政策", -1),
          kr = h("a", {
            href: "https://m.weibo.cn/c/regagreement",
            target: "_blank",
            class: "text-alink dark:text-alinkdark"
          }, "用户协议", -1),
          Er = h("a", {
            href: "https://m.weibo.cn/c/privacy",
            target: "_blank",
            class: "text-alink dark:text-alinkdark"
          }, "隐私条款", -1),
          Dr = {
            key: 0
          },
          Or = {
            key: 1
          },
          Ar = h("a", {
            href: "https://m.weibo.cn/c/regagreement",
            target: "_blank",
            class: "text-xs text-alink dark:text-alinkdark"
          }, "《用户协议》", -1),
          Br = h("a", {
            href: "https://m.weibo.cn/c/privacy",
            target: "_blank",
            class: "text-xs text-alink dark:text-alinkdark"
          }, "《隐私条款》", -1),
          Vr = a({
            __name: "Login",
            setup: function(t) {
              var e = m(),
                r = L({
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
                n = v(H()),
                i = L({
                  form: {
                    username: "",
                    password: "",
                    ccode: "",
                    mfaId: ""
                  },
                  showCode: !1,
                  refreshCode: !1
                }),
                o = L({
                  form: {
                    username: "",
                    scode: "",
                    countryCode: "86",
                    cid: ""
                  },
                  countryCodeMenu: []
                }),
                a = C((function() {
                  return !n.value || r.mobileQRcodeVisible
                })),
                p = {
                  show_pw: 1,
                  show_sms: 2
                },
                g = C((function() {
                  return !!r.show_wechat
                })),
                O = v("border-b-2 border-brand font-medium dark:border-branddark");
              B(n, (function() {
                r.mobileQRcodeVisible = !1
              }));
              var A = function(t) {
                  r.curType = t, r.errMsg = ""
                },
                R = function() {
                  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                  r.errMsg = t
                },
                _ = function() {
                  return !(!n.value || r.checked) && (r.errMsg = r.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款", !0)
                },
                q = function() {
                  var t = l(c().mark((function t() {
                    var n, a, u, h, l, f, d, g, m, v, y, b, w, x, S;
                    return c().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          if (!_()) {
                            t.next = 2;
                            break
                          }
                          return t.abrupt("return");
                        case 2:
                          if (n = {
                              method: "POST",
                              entry: r.entry,
                              source: r.source,
                              type: p[r.curType],
                              url: e.query.url,
                              ver: Xt
                            }, "show_pw" !== r.curType) {
                            t.next = 14;
                            break
                          }
                          if (i.form.username && i.form.password) {
                            t.next = 7;
                            break
                          }
                          return r.errMsg = "请输入正确的信息", t.abrupt("return");
                        case 7:
                          gr(), n.username = i.form.username, n.pass = re("".concat([fr, Re].join("\t"), "\n").concat(i.form.password), r.pubkey), n.cid = i.form.mfaId, n.pwencode = "rsa", n.rsakv = r.rsakv, i.showCode && (n.ccode = i.form.ccode);
                        case 14:
                          if ("show_sms" !== r.curType) {
                            t.next = 20;
                            break
                          }
                          if (o.form.username && o.form.scode) {
                            t.next = 18;
                            break
                          }
                          return r.errMsg = "请输入正确的信息", t.abrupt("return");
                        case 18:
                          "86" === o.form.countryCode ? n.username = "".concat(o.form.username) : n.username = "00".concat(o.form.countryCode).concat(o.form.username), n.scode = o.form.scode;
                        case 20:
                          if (e.query.disp && (n.disp = e.query.disp), n.rid = "norid", !window.wbBotDetector || !window.wbBotDetector.get) {
                            t.next = 27;
                            break
                          }
                          return t.next = 25, window.wbBotDetector.get({
                            useCache: !1
                          }).catch((function(t) {
                            console.log(t)
                          }));
                        case 25:
                          a = t.sent, n.rid = (null == a ? void 0 : a.rid) || "getriderror";
                        case 27:
                          return n.scode && (n.scode = Ve(n.scode), n.el = 1), n.username && (n.username = Ve(n.username), n.el = 1), t.next = 31, te("/sso/v2/login", n);
                        case 31:
                          if (u = t.sent, h = s(u, 2), l = h[0], f = h[1], !l) {
                            t.next = 40;
                            break
                          }
                          if (432 !== (null == l || null === (d = l.response) || void 0 === d ? void 0 : d.status) && 429 !== (null == l || null === (g = l.response) || void 0 === g ? void 0 : g.status)) {
                            t.next = 39;
                            break
                          }
                          return R("当前系统繁忙，请稍后再试(".concat(null == l || null === (m = l.response) || void 0 === m ? void 0 : m.status, ")")), t.abrupt("return");
                        case 39:
                          return t.abrupt("return");
                        case 40:
                          v = f.data.data.act, t.t0 = v, t.next = "mfa_2" === t.t0 ? 44 : "mfa_1" === t.t0 ? 47 : "goto" === t.t0 ? 65 : 67;
                          break;
                        case 44:
                          return i.form.mfaId = f.data.data.mfa_id, i.showCode = !0, t.abrupt("break", 67);
                        case 47:
                          return i.form.mfaId = f.data.data.mfa_id, t.next = 50, ee(f.data.data.mfa_id);
                        case 50:
                          if (y = t.sent, b = s(y, 2), w = b[0], x = b[1], !w) {
                            t.next = 59;
                            break
                          }
                          if ("close" !== w.msg) {
                            t.next = 57;
                            break
                          }
                          return t.abrupt("return");
                        case 57:
                          return R(w.msg), t.abrupt("return");
                        case 59:
                          if (x) {
                            t.next = 62;
                            break
                          }
                          return R("极验返回结果有误"), t.abrupt("return");
                        case 62:
                          return t.next = 64, q();
                        case 64:
                          return t.abrupt("return");
                        case 65:
                          return window.location.href = f.data.data.location, t.abrupt("break", 67);
                        case 67:
                          if (2e5 === (S = +f.data.retcode)) {
                            t.next = 76;
                            break
                          }
                          t.t1 = S, t.next = 2070 === t.t1 ? 72 : 75;
                          break;
                        case 72:
                          return i.refreshCode = !0, j((function() {
                            i.refreshCode = !1
                          })), t.abrupt("break", 75);
                        case 75:
                          r.errMsg = f.data.msg;
                        case 76:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  })));
                  return function() {
                    return t.apply(this, arguments)
                  }
                }();

              function H() {
                return ne() || !ne() && window.innerWidth < 768
              }
              y(l(c().mark((function t() {
                var n, i, a, u;
                return c().wrap((function(t) {
                  for (;;) switch (t.prev = t.next) {
                    case 0:
                      return r.entry = e.query.entry, r.source = e.query.source, t.next = 4, te("/sso/v2/web/config", {
                        method: "POST",
                        entry: r.entry,
                        source: r.source
                      });
                    case 4:
                      if (n = t.sent, i = s(n, 2), a = i[0], u = i[1], !a && 2e7 === u.data.retcode) {
                        t.next = 10;
                        break
                      }
                      return t.abrupt("return");
                    case 10:
                      r.show_pw = !!u.data.data.show_pw, r.show_qq = !!u.data.data.show_qq, r.show_qr = !!u.data.data.show_qr, r.show_sms = !!u.data.data.show_sms, r.show_wechat = !!u.data.data.show_wechat, r.curType = u.data.data.first_show, r.regUrl = u.data.data.reg_url || "https://weibo.com/signup/signup.php", r.forgetUrl = u.data.data.forget_url || Yt, r.iconUrl = u.data.data.icon_url || "https://h5.sinaimg.cn/upload/1005/891/2024/01/04/weibologo.png", r.pubkey = u.data.data.pubkey, r.rsakv = u.data.data.rsakv, r.wechatUrl = u.data.data.wechat_url, document.title = "登录 - ".concat(u.data.data.title), o.countryCodeMenu = u.data.data.country_code.map((function(t) {
                        return {
                          code: t.country_code,
                          text: t.local.zh_CN
                        }
                      })), c = u.data.data.nonce, Re = c, pr(u.data.data.servertime);
                    case 26:
                    case "end":
                      return t.stop()
                  }
                  var c
                }), t)
              }))));
              var F = function() {
                  n.value = H()
                },
                U = function() {
                  r.mobileQRcodeVisible = !0
                },
                z = function() {
                  r.mobileQRcodeVisible = !1
                };

              function Z() {
                if (!n.value || r.checked) {
                  if (g.value) {
                    var t = e.query.url || "",
                      i = "".concat(r.wechatUrl, "&r=").concat(t);
                    e.query.disp && (i += "&disp=".concat(e.query.disp)), window.location.href = i
                  }
                } else r.errMsg = r.isSina ? "请同意用户协议和保护政策" : "请同意用户协议和隐私条款"
              }
              return w((function() {
                  window.addEventListener("resize", F)
                })), b((function() {
                  window.removeEventListener("resize", F)
                })),
                function(t, s) {
                  return f(), I(K, {
                    "icon-url": r.iconUrl
                  }, {
                    default: P((function() {
                      return [h("div", mr, [a.value ? (f(), I(ye, {
                        key: 0,
                        visible: r.mobileQRcodeVisible,
                        entry: r.entry,
                        source: r.source,
                        url: D(e).query.url,
                        onClickBack: z
                      }, null, 8, ["visible", "entry", "source", "url"])) : S("", !0), h("div", vr, [h("div", {
                        class: T(["h-16 iphone-safe-header", n.value ? "md:portrait:h-0" : "md:h-0"])
                      }, null, 2), h("ul", yr, [h("li", null, [h("a", {
                        href: "#",
                        class: T(["inline-block pb-2.5", ["show_sms" === r.curType && O.value]]),
                        "aria-current": "page",
                        onClick: s[0] || (s[0] = E((function(t) {
                          return A("show_sms")
                        }), ["prevent"]))
                      }, [h("span", {
                        class: T(n.value ? "md:portrait:hidden" : "md:hidden")
                      }, "短信验证登录", 2), h("span", {
                        class: T(["hidden", n.value ? "md:portrait:inline" : "md:inline"])
                      }, "验证码登录", 2)], 2), "show_sms" === r.curType ? (f(), u("div", {
                        key: 0,
                        class: T(["absolute z-9 mt-2 text-xs text-sub dark:text-subdark", n.value ? "md:portrait:hidden" : "md:hidden"])
                      }, " 未注册手机号验证通过后将自动注册 ", 2)) : S("", !0)]), h("li", null, [h("a", {
                        href: "#",
                        class: T(["inline-block pb-2.5", ["show_pw" === r.curType && O.value]]),
                        onClick: s[1] || (s[1] = E((function(t) {
                          return A("show_pw")
                        }), ["prevent"]))
                      }, [h("span", {
                        class: T(n.value ? "md:portrait:hidden" : "md:hidden")
                      }, "账号密码登录", 2), h("span", {
                        class: T(["hidden", n.value ? "md:portrait:inline" : "md:inline"])
                      }, "账号登录", 2)], 2)])]), "show_sms" === r.curType ? (f(), I(Ze, {
                        key: 0,
                        modelValue: o.form,
                        "onUpdate:modelValue": s[2] || (s[2] = function(t) {
                          return o.form = t
                        }),
                        countryCodeMenu: o.countryCodeMenu,
                        entry: r.entry,
                        checked: r.checked,
                        isMobile: n.value,
                        onUpdateErrorMsg: R,
                        onTriggerCheckLisence: _
                      }, {
                        errorMsg: P((function() {
                          return [h("div", br, k(r.errMsg), 1)]
                        })),
                        _: 1
                      }, 8, ["modelValue", "countryCodeMenu", "entry", "checked", "isMobile"])) : (f(), I(or, {
                        key: 1,
                        modelValue: i.form,
                        "onUpdate:modelValue": s[3] || (s[3] = function(t) {
                          return i.form = t
                        }),
                        "show-code": i.showCode,
                        "refresh-code": i.refreshCode,
                        entry: r.entry,
                        "forget-url": r.forgetUrl,
                        onUpdateErrorMsg: R
                      }, {
                        errorMsg: P((function() {
                          return [h("div", wr, k(r.errMsg), 1)]
                        })),
                        _: 1
                      }, 8, ["modelValue", "show-code", "refresh-code", "entry", "forget-url"])), n.value ? (f(), u("div", {
                        key: 2,
                        class: T(["flex items-center mt-3.5", n.value ? "md:portrait:hidden" : "md:hidden"])
                      }, [M(h("input", {
                        id: "checked-checkbox2",
                        "onUpdate:modelValue": s[4] || (s[4] = function(t) {
                          return r.checked = t
                        }),
                        type: "checkbox",
                        value: "",
                        class: "w-4 h-4 bg-transparent border-disabled rounded text-brand dark:border-disableddark dark:text-branddark"
                      }, null, 512), [
                        [N, r.checked]
                      ]), h("label", xr, [x(" 登录注册即表示同意 "), r.isSina ? (f(), u(V, {
                        key: 0
                      }, [Sr, x("、 "), Tr], 64)) : (f(), u(V, {
                        key: 1
                      }, [kr, x("、 "), Er], 64))])], 2)) : S("", !0), h("button", {
                        type: "button",
                        class: "w-full mt-5.5 py-2 bg-brand rounded-full text-white whitespace-nowrap hover:bg-brandhover active:bg-brandhover dark:bg-branddark dark:hover:bg-brandhoverdark dark:active:bg-brandhoverdark",
                        onClick: E(q, ["prevent"])
                      }, ["show_sms" === r.curType ? (f(), u("span", Dr, "登录/注册")) : (f(), u("span", Or, "登录"))]), h("div", {
                        class: T(["justify-start mt-3 text-xs text-mainb", n.value && "hidden"])
                      }, [x(" 未注册手机验证后自动登录，注册即代表同意 "), Ar, Br], 2)])]), d(ur, {
                        isMobileLayout: n.value,
                        showWechat: g.value,
                        onClickQrcode: U,
                        onClickWechat: Z
                      }, null, 8, ["isMobileLayout", "showWechat"])]
                    })),
                    _: 1
                  }, 8, ["icon-url"])
                }
            }
          });
        _(Vr).use(q).mount("#app")
      }
    }
  }))
}();
