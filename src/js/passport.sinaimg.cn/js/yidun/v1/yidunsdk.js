"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function(e, t) {
  "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) ? module.exports = e.document ? t(e) : function(e) {
    if (!e.document) throw new Error("initNECaptchaWithFallback requires a window with a document");
    return t(e)
  } : "function" == typeof define && define.amd ? define("initNECaptchaWithFallback", [], function() {
    return t(e)
  }) : e.initNECaptchaWithFallback = t(e)
}("undefined" != typeof window ? window : void 0, function(e) {
  function t(e, t) {
    var n = document.head || document.getElementsByTagName("head")[0],
      r = document.createElement("script");
    t = t || function() {}, r.type = "text/javascript", r.charset = "utf8", r.async = !0, r.src = e, "onload" in r || (r.onreadystatechange = function() {
      "complete" !== this.readyState && "loaded" !== this.readyState || (this.onreadystatechange = null, t(null, r))
    }), r.onload = function() {
      this.onerror = this.onload = null, t(null, r)
    }, r.onerror = function() {
      this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), r)
    }, n.appendChild(r)
  }

  function n(e, t, n) {
    if (e = e || "", t = t || "", n = n || "", e && (e = e.replace(/:?\/{0,2}$/, "://")), t) {
      var r = t.match(/^([-0-9a-zA-Z.:]*)(\/.*)?/);
      t = r[1], n = (r[2] || "") + "/" + n
    }
    return !t && (e = ""), e + t + n
  }

  function r(e, t) {
    if (void 0 !== t) {
      var n = e.nodeType;
      1 !== n && 11 !== n && 9 !== n || ("string" == typeof e.textContent ? e.textContent = t : e.innerText = t)
    }
  }

  function o(e, t) {
    if (t = t || document, t.querySelectorAll) return t.querySelectorAll(e);
    if (!/^\.[^.]+$/.test(e)) return [];
    if (t.getElementsByClassName) return t.getElementsByClassName(e);
    for (var n, r = t.getElementsByTagName("*"), o = [], a = e.slice(1), i = 0, l = r.length; i < l; i++) n = r[i], ~(" " + n.className + " ").indexOf(" " + a + " ") && o.push(n);
    return o
  }

  function a(e, t) {
    if (!e) throw new Error("[NECaptcha] " + t)
  }

  function i(e) {
    return Number.isInteger ? Number.isInteger(e) : "number" == typeof e && isFinite(e) && Math.floor(e) === e
  }

  function l(e) {
    return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
  }

  function c() {
    if (Object.assign) return Object.assign.apply(null, arguments);
    for (var e = {}, t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      if (null != n)
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
    }
    return e
  }

  function u(e) {
    return e = e && 0 !== e ? e : 1, parseInt((new Date).valueOf() / e, 10)
  }

  function s(t) {
    var n = e.location.protocol.replace(":", ""),
      r = {
        protocol: "http" === n ? "http" : "https",
        lang: "zh-CN",
        errorFallbackCount: 3
      },
      o = c({}, r, t),
      l = o.errorFallbackCount;
    return a(void 0 === l || i(l) && l >= 1, "errorFallbackCount must be an integer, and it's value greater than or equal one"), o
  }

  function d(r, o) {
    function a(n) {
      var r = c[n] + "?v=" + u(g);
      t(r, function(t) {
        return t || !e.initNECaptcha ? (n += 1, n === c.length ? o(new Error("Failed to load script(" + r + ")." + (t ? t.message : "unreliable script"))) : a(n)) : o(null)
      })
    }
    if (e.initNECaptcha) return void setTimeout(function() {
      o(null)
    }, 0);
    var i = r.ipv6 ? ["cstaticdun-v6.126.net", "cstatic-v6.dun.163yun.com"] : ["cstaticdun.126.net", "cstatic.dun.163yun.com"],
      c = function(e) {
        var t = [];
        if (l(e))
          for (var o = 0, a = e.length; o < a; o++) t.push(n(r.protocol, e[o], "load.min.js"));
        else {
          var i = n(r.protocol, e, "load.min.js");
          t = [i, i]
        }
        return t
      }(r.staticServer || i);
    a(0)
  }

  function f(t, n, a) {
    var i = null,
      l = s(t),
      c = !1 !== l.defaultFallback,
      u = v["zh-CN" === l.lang ? l.lang : "en"],
      f = e.location.pathname + "_" + l.captchaId + "_NECAPTCHA_ERROR_COUNTS";
    try {
      y = parseInt(localStorage.getItem(f) || 0, 10)
    } catch (e) {}
    var p = c ? function(e) {
        function t(e) {
          if (e && (t(e._captchaIns), e.$el)) {
            var n = o(".yidun-fallback__tip", e.$el);
            n.length && setTimeout(function() {
              for (var e = 0, t = n.length; e < t; e++) r(n[e], u)
            }, 0)
          }
        }
        t(i), l.onVerify && l.onVerify(null, {
          validate: e,
          isFallback: !0
        })
      } : l.onFallback || function() {},
      h = !c && !l.onFallback,
      g = function(e) {
        if (++y < l.errorFallbackCount) {
          try {
            localStorage.setItem(f, y)
          } catch (e) {}
          a(e)
        } else p(m), S(), h && a(e)
      },
      S = function() {
        y = 0;
        try {
          localStorage.setItem(f, 0)
        } catch (e) {}
      },
      E = function(e) {
        if (w && w.isError()) return void w.resetError();
        w && w.resetTimer(), h ? a(e) : g(e)
      };
    l.onError = function(e) {
      w && w.isError() && w.resetError(), g(e)
    }, l.onDidRefresh = function() {
      w && w.isError() && w.resetError(), S()
    };
    var w = t.initTimeoutError ? t.initTimeoutError(g) : null,
      F = function() {
        e.initNECaptcha(l, function(e) {
          w && w.isError() || (w && w.resetTimer(), i = e, n && n(e))
        }, E)
      },
      k = "load-queue";
    C[k] || (C[k] = {
      rejects: [],
      resolves: [],
      status: "error"
    }), "error" === C[k].status ? (C[k].status = "pending", d(l, function(e) {
      if (e) {
        var t = new Error;
        t.code = b, t.message = l.staticServer + "/load.min.js error";
        for (var n = C[k].rejects, r = 0, o = n.length; r < o; r++) n.pop()(t);
        C[k].status = "error"
      } else {
        C[k].status = "done";
        for (var a = C[k].resolves, i = 0, c = a.length; i < c; i++) a.pop()()
      }
    })) : "done" === C[k].status && F(), "pending" === C[k].status && (C[k].rejects.push(function(e) {
      E(e)
    }), C[k].resolves.push(F))
  }

  function p(e) {
    return "object" === (void 0 === e ? "undefined" : _typeof(e)) && null !== e
  }

  function h(t, n) {
    function r() {
      return "yidunvalidatecb_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
    }

    function o(t) {
      if (t && e[t]) try {
        delete e[t]
      } catch (n) {
        e[t] = void 0
      }
    }
    if (!p(t)) return console.error("[YidunSDK] params must be an object"), void n({}, "params_err", !1);
    var a = ["geetestKey", "captchaId"],
      i = !0,
      l = !1,
      c = void 0;
    try {
      for (var u, s = a[Symbol.iterator](); !(i = (u = s.next()).done); i = !0) {
        var d = u.value;
        if (!t[d] || "undefined" === t[d]) return console.error("[YidunSDK] Missing required parameter: " + d), void n({}, "params_err", !1)
      }
    } catch (e) {
      l = !0, c = e
    } finally {
      try {
        !i && s.return && s.return()
      } finally {
        if (l) throw c
      }
    }
    var h = "undefined" === t.product ? "popup" : t.product,
      y = "undefined" === t.lang ? "zh-CN" : t.lang,
      m = "undefined" === t.defaultFallback || t.defaultFallback,
      v = "undefined" === t.errorFallbackCount ? 3 : t.errorFallbackCount,
      g = void 0,
      b = null;
    f({
      captchaId: t.captchaId,
      width: "320px",
      mode: h,
      apiVersion: 2,
      errorFallbackCount: v,
      lang: y,
      defaultFallback: m,
      feedbackEnable: !1,
      onVerify: function(a, i) {
        if (a) return void console.warn("[YidunSDK] Verification failed:", a);
        console.log("[YidunSDK] Verification success:", i), b && o(b), b = r();
        var l = "https://security.weibo.com/captcha/yidun?key=" + t.geetestKey + "&validate=" + i.validate + "&callback=" + b;
        e[b] = function(e) {
          o(b), b = null, console.log("[YidunSDK] Validation response:", e), e && 1e5 === e.retcode ? n(e.data || {}, e.msg || "success", !0) : n(e.data || {}, e.msg || "validation_failed", !1)
        }, S(l, function(e) {
          e && (o(b), b = null, console.log("[YidunSDK] Fetch data failed:", e), n({}, "request_err", !1))
        })
      },
      onClose: function(e) {
        console.log(e), "1" == e.source && (console.log("[YidunSDK] Captcha closed by user"), n({}, "close", !1))
      }
    }, function(e) {
      console.log("[YidunSDK] Captcha loaded successfully"), g = e, g.verify()
    }, function(e) {
      console.error("[YidunSDK] Captcha initialization failed:", e), n({}, "onerror", !1)
    }, function() {
      console.log("[YidunSDK] Captcha ready")
    }, function() {
      console.log("[YidunSDK] Captcha fallback triggered"), n({}, "degrade", !1)
    })
  }
  var y = 0,
    m = "QjGAuvoHrcpuxlbw7cp4WnIbbjzG4rtSlpc7EDovNHQS._ujzPZpeCInSxIT4WunuDDh8dRZYF2GbBGWyHlC6q5uEi9x-TXT9j7J705vSsBXyTar7aqFYyUltKYJ7f4Y2TXm_1Mn6HFkb4M7URQ_rWtpxQ5D6hCgNJYC0HpRE7.2sttqYKLoi7yP1KHzK-PptdHHkVwb77cwS2EJW7Mj_PsOtnPBubTmTZLpnRECJR99dWTVC11xYG0sx8dJNLUxUFxEyzTfX4nSmQz_T5sXATRKHtVAz7nmV0De5unmflfAlUwMGKlCT1khBtewlgN5nHvyxeD8Z1_fPVzi9oznl-sbegj6lKfCWezmLcwft8.4yaVh6SlzXJq-FnSK.euq9OBd5jYc82ge2_hEca1fGU--SkPRzgwkzew4O4qjdS2utdPwFONnhKAIMJRPUmCV4lPHG1OeRDvyNV8sCnuFMw7leasxIhPoycl4pm5bNy70Z1laozEGJgItVNr3",
    v = {
      "zh-CN": "前方拥堵，已自动跳过验证",
      en: "captcha error，Verified automatically"
    },
    g = 6e4,
    b = 502,
    C = {},
    S = function(e, t) {
      if (!e || "string" != typeof e) return console.error("[YidunSDK] Invalid URL provided"), void t(!0);
      if ("function" != typeof t) return void console.error("[YidunSDK] Callback must be a function");
      var n = document.createElement("script");
      n.src = e, n.charset = "UTF-8", n.async = !0, n.onerror = function() {
        t(!0)
      };
      try {
        document.head.appendChild(n), t(!1)
      } catch (e) {
        console.error("[YidunSDK] Failed to append script to head:", e), t(!0)
      }
    };
  return e.ydInit = h, {
    ydInit: h
  }
});