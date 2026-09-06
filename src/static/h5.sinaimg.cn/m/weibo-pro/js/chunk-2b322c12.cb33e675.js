(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2b322c12"], {
    "47b8": function(t, e, o) {
      t.exports = {
        box: "CheckAudioAuth_box_3llxj",
        bg: "CheckAudioAuth_bg_3r3c7",
        bg23: "CheckAudioAuth_bg23_197W3",
        text: "CheckAudioAuth_text_3qsgH",
        btn: "CheckAudioAuth_btn_RnG0I"
      }
    },
    9241: function(t, e, o) {
      "use strict";
      var n = o("47b8"),
        s = o.n(n);
      e["default"] = s.a
    },
    c7de: function(t, e, o) {
      "use strict";
      o.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            o = t._self._c || e;
          return o("woo-box", {
            class: t.$style.box,
            attrs: {
              direction: "y",
              align: "center"
            }
          }, [
            [o("div", {
              class: [t.$style.bg, t.$style.bg23]
            }), o("div", {
              class: t.$style.text
            }, [t._v(t._s(t.copywriter.desc))]), o("woo-box", {
              class: t.$style.btn,
              attrs: {
                align: "center"
              }
            }, [o("woo-button", {
              attrs: {
                sort: "flat",
                kind: "primary"
              },
              on: {
                click: t.go
              }
            }, [t._v(t._s(t.copywriter.apply))])], 1)]
          ], 2)
        },
        s = [],
        c = o("f85b"),
        i = {
          desc: "您还没有音频发布权限",
          apply: "申请入驻"
        },
        r = {
          props: {
            type: {
              type: String
            }
          },
          setup: function() {
            var t = Object(c["o"])(!1),
              e = function() {
                window.open("https://m.weibo.cn/cp/audio/guide?showmenu=0&topnavstyle=1&immersiveScroll=100", "_blank")
              };
            return {
              show: t,
              go: e,
              copywriter: i
            }
          }
        },
        l = r,
        u = o("9241"),
        a = o("04a2");

      function b(t) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var p = Object(a["a"])(l, n, s, !1, b, null, null);
      e["default"] = p.exports
    }
  }
]);
