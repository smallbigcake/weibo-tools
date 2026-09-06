(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-4d2e1256"], {
    b929: function(t, e, n) {
      "use strict";
      var o = n("d8a7"),
        a = n.n(o);
      e["default"] = a.a
    },
    d1e7: function(t, e, n) {
      "use strict";
      n.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", [n("div", {
            class: [t.$style.tit1, t.$style.gap2]
          }, [t._v("详情")]), n("div", {
            class: [t.$style.box1]
          }, [n("PublisherForm", {
            attrs: {
              placeholder: t.placeholder,
              content: t.content,
              maxCount: 3e3
            },
            on: {
              change: t.formChange,
              textcount: t.formTextCount
            }
          })], 1)])
        },
        a = [],
        u = n("f85b"),
        i = n("072d"),
        c = {
          components: {
            PublisherForm: i["a"]
          },
          props: {
            AudioDetailContent: {}
          },
          setup: function(t, e) {
            var n = e.emit,
              o = Object(u["o"])(t.AudioDetailContent),
              a = "详细描述音频内容（0～3000个字）",
              i = function(t) {
                n("input", t)
              },
              c = function(t) {
                var e = t.count;
                n("state", e > 3e3)
              };
            return Object(u["t"])((function() {
              return t.AudioDetailContent
            }), (function(t) {
              o.value = t
            })), {
              formChange: i,
              placeholder: a,
              content: o,
              formTextCount: c
            }
          }
        },
        l = c,
        r = n("b929"),
        s = n("04a2");

      function d(t) {
        this["$style"] = r["default"].locals || r["default"]
      }
      var f = Object(s["a"])(l, o, a, !1, d, null, null);
      e["default"] = f.exports
    },
    d8a7: function(t, e, n) {
      t.exports = {
        tit1: "AudioDetail_tit1_8TvwT",
        gap2: "AudioDetail_gap2_2eLtX",
        box1: "AudioDetail_box1_3CNXd"
      }
    }
  }
]);
