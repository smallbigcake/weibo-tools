(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-38d17e06"], {
    "127c": function(e, t, s) {
      "use strict";
      s.r(t);
      var i = function() {
          var e = this,
            t = e.$createElement,
            s = e._self._c || t;
          return s("div", {
            class: ["inList" === e.styleType && e.$style.rss, "inAudio" === e.styleType && e.$style.audio]
          }, ["inLayer" === e.styleType ? s("woo-divider", {
            class: e.$style.line
          }) : e._e(), s("woo-box", {
            attrs: {
              align: "center"
            }
          }, [s("woo-box-item", [s("woo-box", {
            attrs: {
              align: "center"
            }
          }, [s("div", {
            class: e.$style.t1
          }, [e._v("自动发布")]), s("Action", {
            class: e.$style.help,
            attrs: {
              timeout: "300",
              direction: "up",
              width: "300",
              size: "inAudio" === e.styleType ? 16 : 12,
              title: "自动发布",
              desc: "开关打开后，RSS地址里最新一期音频会以微博形式发布，其他音频会进入个人主页音频签<img src='" + e.image + "' />"
            }
          })], 1), "inLayer" === e.styleType ? s("div", {
            class: e.$style.t2
          }, [e._v(" RSS音频有更新时，会自动发博同步节目内容 ")]) : e._e()], 1), s("div", {
            class: e.$style.switch
          }, [s("FeatureBubble", {
            class: e.$style.tip,
            attrs: {
              direction: "up",
              align: "center",
              gap: "10",
              width: "128",
              content: "开启自动同步，RSS有更新将会自动发博",
              bubble: "inAudio" === e.styleType,
              check: !1,
              exclusiveKey: ["mobile_can_audio"],
              configkey: e.showTip ? "audio_bubble_switch" : "",
              withoutHandleShow: !(!e.showTip || "inAudio" !== e.styleType)
            },
            scopedSlots: e._u([{
              key: "ctrl",
              fn: function() {
                return [s("woo-switch", {
                  attrs: {
                    size: .6875
                  },
                  on: {
                    change: e.changeAuto
                  },
                  model: {
                    value: e.isAuto,
                    callback: function(t) {
                      e.isAuto = t
                    },
                    expression: "isAuto"
                  }
                })]
              },
              proxy: !0
            }])
          })], 1)], 1), "inAudio" === e.styleType ? s("woo-divider", {
            class: e.$style.gap1,
            attrs: {
              "border-color": "var(--w-card-border)"
            }
          }) : e._e()], 1)
        },
        o = [],
        n = (s("7431"), s("f85b")),
        a = s("85a7"),
        l = {
          props: {
            auto: {
              type: Boolean,
              default: !1
            },
            showTip: {
              type: Boolean,
              default: !1
            },
            styleType: {
              type: String,
              default: "inLayer"
            }
          },
          components: {
            Action: function() {
              return Promise.resolve().then(s.bind(null, "489c"))
            },
            FeatureBubble: function() {
              return Promise.resolve().then(s.bind(null, "0587"))
            }
          },
          setup: function(e, t) {
            var s = t.emit,
              i = Object(n["o"])(e.auto),
              o = window.$CONFIG.user.id,
              l = Object(a["a"])(o),
              u = function() {
                s("changeAuto", i.value)
              },
              c = Object(n["a"])((function() {
                return 0 === l ? "https://h5.sinaimg.cn/upload/100/1474/2024/06/05/compose_automatic_release.png" : "https://h5.sinaimg.cn/upload/100/1474/2024/06/05/compose_automatic_release_dark.png"
              }));
            return Object(n["t"])((function() {
              return e.auto
            }), (function() {
              i.value = e.auto
            })), {
              isAuto: i,
              image: c,
              changeAuto: u
            }
          }
        },
        u = l,
        c = s("bf1a"),
        r = s("04a2");

      function p(e) {
        this["$style"] = c["default"].locals || c["default"]
      }
      var d = Object(r["a"])(u, i, o, !1, p, null, null);
      t["default"] = d.exports
    },
    2572: function(e, t, s) {
      e.exports = {
        rss: "Rss_rss_3MilW",
        help: "Rss_help_2qImO",
        audio: "Rss_audio_Ik3vS",
        t1: "Rss_t1_3kdkQ",
        switch: "Rss_switch_3mQw8",
        gap1: "Rss_gap1_13C7A",
        line: "Rss_line_3TqFg",
        t2: "Rss_t2_4t9Ia",
        tip: "Rss_tip_32jKq"
      }
    },
    bf1a: function(e, t, s) {
      "use strict";
      var i = s("2572"),
        o = s.n(i);
      t["default"] = o.a
    }
  }
]);
