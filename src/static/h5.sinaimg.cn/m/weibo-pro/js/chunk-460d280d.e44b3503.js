(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-460d280d"], {
    "152e": function(t, e, i) {
      t.exports = {
        tit1: "Title_tit1_2qSyA",
        gap2: "Title_gap2_35K9V",
        top1: "Title_top1_FHMUz"
      }
    },
    "45e8": function(t, e, i) {
      "use strict";
      var n = i("152e"),
        l = i.n(n);
      e["default"] = l.a
    },
    cc54: function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", [i("div", {
            class: [t.$style.tit1, t.$style.gap2]
          }, [t._v(" 标题"), t.isAudio ? i("span", [t._v("*")]) : t._e()]), i("div", {
            staticClass: "wbpro-form",
            class: [t.$style.top1, t.titleStatus],
            on: {
              click: function(e) {
                return e.stopPropagation(), t.titleFocus.apply(null, arguments)
              }
            }
          }, [i("woo-box", [i("woo-box-item", [i("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.title,
              expression: "title"
            }],
            ref: "titleInput",
            attrs: {
              type: "text",
              placeholder: t.isAudio ? "简洁明了的说明音频主题（0～30个字）" : "填写标题（0～30个字）",
              selectionEnd: ""
            },
            domProps: {
              value: t.title
            },
            on: {
              input: [function(e) {
                e.target.composing || (t.title = e.target.value)
              }, t.input],
              blur: t.titleBlur,
              keyup: function(e) {
                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.titleBlur.apply(null, arguments)
              },
              keypress: function(t) {
                t.stopPropagation()
              }
            }
          })]), i("div", {
            staticClass: "num",
            domProps: {
              textContent: t._s(t.titleNumber + "/30")
            }
          })], 1)], 1)])
        },
        l = [],
        u = i("f85b"),
        o = i("59b0"),
        s = i("8e18"),
        a = {
          props: {
            content: {}
          },
          emits: ["input"],
          setup: function(t, e) {
            var i = e.refs,
              n = e.emit,
              l = Object(s["a"])(),
              a = l.isAudio,
              r = Object(o["a"])(i),
              c = r.title,
              p = r.titleInput,
              d = r.titleBlur,
              f = r.titleNumber,
              v = r.titleStatus,
              b = r.titleFocus;
            c.value = t.content;
            var m = function(t) {
                n("input", c.value)
              },
              y = !0;
            return Object(u["t"])((function() {
              return t.content
            }), (function() {
              c.value = t.content, y && (Object(u["g"])((function() {
                d()
              })), y = !1)
            })), {
              isAudio: a,
              titleInput: p,
              titleBlur: d,
              titleNumber: f,
              titleStatus: v,
              titleFocus: b,
              title: c,
              input: m
            }
          }
        },
        r = a,
        c = i("45e8"),
        p = i("04a2");

      function d(t) {
        this["$style"] = c["default"].locals || c["default"]
      }
      var f = Object(p["a"])(r, n, l, !1, d, null, null);
      e["default"] = f.exports
    }
  }
]);
