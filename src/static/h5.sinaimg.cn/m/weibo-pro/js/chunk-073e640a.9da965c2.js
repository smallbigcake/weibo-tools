(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-073e640a"], {
    "0c52": function(e, t, a) {
      "use strict";
      var n = a("c469");
      e.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(n)
    },
    "2ee1": function(e, t, a) {
      "use strict";
      var n = a("720f"),
        o = a("8a91"),
        s = a("ce97"),
        l = a("0e10"),
        r = a("42a3"),
        i = n(l),
        c = n("".slice),
        u = Math.ceil,
        p = function(e) {
          return function(t, a, n) {
            var l, p, v = s(r(t)),
              d = o(a),
              y = v.length,
              f = void 0 === n ? " " : s(n);
            return d <= y || "" === f ? v : (l = d - y, p = i(f, u(l / f.length)), p.length > l && (p = c(p, 0, l)), e ? v + p : p + v)
          }
        };
      e.exports = {
        start: p(!1),
        end: p(!0)
      }
    },
    "520a": function(e, t, a) {
      "use strict";
      var n = a("f998"),
        o = a.n(n);
      t["default"] = o.a
    },
    6103: function(e, t, a) {
      "use strict";
      var n = a("82ef"),
        o = a("2ee1").start,
        s = a("0c52");
      n({
        target: "String",
        proto: !0,
        forced: s
      }, {
        padStart: function(e) {
          return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
      })
    },
    9998: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a("div", {
            class: e.payInfo && e.$style.pay
          }, [a("div", {
            class: e.$style.gap1
          }, [a("woo-box", {
            class: e.$style.switch,
            attrs: {
              align: "center"
            }
          }, [a("woo-box-item", {
            attrs: {
              align: "center"
            }
          }, [a("woo-box", {
            attrs: {
              align: "center"
            }
          }, [a("div", {
            class: [e.$style.gray1, e.$style.tit1]
          }, [e._v("付费设置")])])], 1)], 1), a("woo-box", {
            attrs: {
              direction: "y"
            }
          }, [a("woo-box", {
            class: e.$style.gap2,
            attrs: {
              align: "center"
            }
          }, [a("div", {
            class: [e.$style.gray1, e.$style.tit1]
          }, [e._v(" 付费内容价格"), a("span", {
            class: e.$style.star
          }, [e._v("*")])]), e.payInfo ? a("div", {
            class: e.$style.price_dis
          }, [e._v(" " + e._s(e.payInfo.price) + "元 ")]) : a("div", [a("woo-input", {
            attrs: {
              min: "0.1",
              max: "200",
              placeholder: "输入售价（0.1-200）",
              error: e.isComply && "" !== e.price,
              type: "number"
            },
            model: {
              value: e.price,
              callback: function(t) {
                e.price = t
              },
              expression: "price"
            }
          }), a("span", {
            class: e.$style.yuan
          }, [e._v("元")]), e.isComply ? a("span", {
            class: e.$style.error
          }, [e._v("请输入金额 0.1-200 元，最小单位为角(一位小数)")]) : e._e()], 1)]), a("div", {
            class: [e.$style.gray1, e.$style.tit1, e.$style.gap2]
          }, [e._v(" 免费试听时长"), a("span", {
            class: e.$style.star
          }, [e._v("*")]), a("woo-radio", {
            class: [e.$style.label, "text" === e.type && e.$style.labelb],
            attrs: {
              value: "00:10",
              size: "16",
              disabled: e.payInfo
            },
            model: {
              value: e.type,
              callback: function(t) {
                e.type = t
              },
              expression: "type"
            }
          }, [e._v("00:10")]), a("woo-radio", {
            class: [e.$style.label, "pictext" === e.type && e.$style.labelb],
            attrs: {
              value: "01:00",
              size: "16",
              disabled: e.payInfo
            },
            model: {
              value: e.type,
              callback: function(t) {
                e.type = t
              },
              expression: "type"
            }
          }, [e._v("01:00")]), a("woo-radio", {
            class: [e.$style.label, e.$style.labelb],
            attrs: {
              value: "select",
              size: "16",
              disabled: e.payInfo
            },
            model: {
              value: e.type,
              callback: function(t) {
                e.type = t
              },
              expression: "type"
            }
          }, [e._v("自定义")]), "select" !== e.type || e.payInfo ? "select" === e.type ? [e.payInfo ? a("span", {
            class: e.$style.price_dis
          }, [e._v(" " + e._s(e.secondsToMinutesSeconds(e.payInfo.free_duration)) + " ")]) : e._e()] : e._e() : [a("woo-input", {
            class: e.$style.timer,
            on: {
              blur: function(t) {
                return e.formatSix(e.minutes, "minutes")
              }
            },
            model: {
              value: e.minutes,
              callback: function(t) {
                e.minutes = t
              },
              expression: "minutes"
            }
          }), a("span", {
            class: e.$style.colon
          }, [e._v(":")]), a("woo-input", {
            class: e.$style.timer,
            on: {
              blur: function(t) {
                return e.formatSix(e.seconds)
              }
            },
            model: {
              value: e.seconds,
              callback: function(t) {
                e.seconds = t
              },
              expression: "seconds"
            }
          }), e.timeError && e.minutes && e.seconds ? a("span", {
            class: e.$style.error
          }, [e._v(e._s(e.timeError))]) : e._e()]], 2)], 1)], 1)])
        },
        o = [],
        s = (a("5f85"), a("f40f"), a("325f"), a("c111"), a("7431"), a("16e9"), a("885c"), a("6103"), a("80e0"), a("39c3"), a("f85b")),
        l = {
          props: {
            duration: {
              type: Number,
              default: 600
            },
            payInfo: {}
          },
          emit: ["change"],
          setup: function(e, t) {
            var a, n, o, l = t.emit,
              r = Object(s["o"])(void 0),
              i = Object(s["o"])(""),
              c = Object(s["o"])(""),
              u = Object(s["o"])(""),
              p = Object(s["o"])("");
            60 === (null === (a = e.payInfo) || void 0 === a ? void 0 : a.free_duration) ? i.value = "01:00" : 10 === (null === (n = e.payInfo) || void 0 === n ? void 0 : n.free_duration) ? i.value = "00:10" : (null === (o = e.payInfo) || void 0 === o ? void 0 : o.free_duration) && (i.value = "select");
            var v = Object(s["a"])((function() {
                if (g(), void 0 === r.value) return !1;
                var e = r.value >= .1 && r.value <= 200,
                  t = r.value.toString(),
                  a = t.indexOf("."),
                  n = -1 === a || t.length - a - 1 === 1;
                return !e || !n
              })),
              d = function(e) {
                e || (e = "00");
                var t = parseInt(e, 10);
                return e = t < 10 ? "0" + t : String(t), e.replace(/[^\d]/g, "")
              },
              y = function(e, t) {
                e < 10 && e.length < 2 && Object(s["g"])((function() {
                  "minutes" === t ? c.value = d(c.value) : u.value = d(u.value)
                }))
              },
              f = function(e) {
                var t = c.value.replace(/[^\d]/g, "");
                t > 60 ? t = e : t.length > 2 && (t = t.slice(-2)), Object(s["g"])((function() {
                  c.value = t, g()
                }))
              },
              _ = function(e) {
                var t = u.value.replace(/[^\d]/g, "");
                u.value > 59 ? t = e : t.length > 2 && (t = t.slice(-2)), Object(s["g"])((function() {
                  u.value = t, g()
                }))
              };
            Object(s["t"])((function() {
              return c.value
            }), (function(e, t) {
              f(t)
            })), Object(s["t"])((function() {
              return u.value
            }), (function(e, t) {
              _(t)
            }));
            var b = Object(s["a"])((function() {
                var e = "".concat(c.value, ":").concat(u.value);
                return e
              })),
              g = function() {
                function t(e) {
                  var t = e.split(":"),
                    a = parseInt(t[0] ? t[0] : 0, 10),
                    n = parseInt(t[1] ? t[1] : 0, 10);
                  return 60 * a + n
                }
                var a = t(m.value);
                a > e.duration ? p.value = "已超出音频总时长" : +u.value < 10 && 0 === +c.value ? p.value = "试听时长最少10秒" : p.value = "", l("change", {
                  price: r.value,
                  duration: a
                })
              },
              m = Object(s["a"])((function() {
                return "select" === i.value ? b.value : i.value
              })),
              $ = function(e) {
                var t = Math.floor(e / 60),
                  a = e % 60;
                return "".concat(t.toString().padStart(2, "0"), ":").concat(a.toString().padStart(2, "0"))
              };
            return {
              secondsToMinutesSeconds: $,
              price: r,
              isComply: v,
              type: i,
              select: b,
              duration: m,
              minutes: c,
              seconds: u,
              timeError: p,
              formatSix: y
            }
          },
          components: {}
        },
        r = l,
        i = a("520a"),
        c = a("04a2");

      function u(e) {
        this["$style"] = i["default"].locals || i["default"]
      }
      var p = Object(c["a"])(r, n, o, !1, u, null, null);
      t["default"] = p.exports
    },
    f998: function(e, t, a) {
      e.exports = {
        pay: "AudioPay_pay_2rw4M",
        gap1: "AudioPay_gap1_10cwN",
        gap2: "AudioPay_gap2_3u-df",
        gray1: "AudioPay_gray1_3AKTy",
        tit1: "AudioPay_tit1_1GmRM",
        star: "AudioPay_star_1AT_8",
        price_dis: "AudioPay_price_dis_21e-V",
        error: "AudioPay_error_2fwBT",
        yuan: "AudioPay_yuan_1Qy7P",
        label: "AudioPay_label_1YawG",
        labelb: "AudioPay_labelb_1zttv",
        timer: "AudioPay_timer_DaVw9",
        colon: "AudioPay_colon_5dssa"
      }
    }
  }
]);
