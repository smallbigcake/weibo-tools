(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-e117c69e"], {
    5296: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("span", {
            class: t.$style.tag,
            on: {
              click: function(e) {
                return e.stopPropagation(), t.$emit("change", "add")
              }
            }
          }, [a("span", {
            class: t.$style.bor
          }, [a("i", {
            class: t.$style.clbor
          }), a("em", {
            class: t.$style.clbg
          })]), t.$slots.default ? a("span", {
            class: t.$style.text
          }, [t._t("default")], 2) : t._e(), a("woo-fonticon", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.close,
              expression: "close"
            }],
            class: t.$style.btn,
            attrs: {
              title: "删除",
              value: "close"
            },
            nativeOn: {
              click: function(e) {
                return e.stopPropagation(), t.$emit("change", "close")
              }
            }
          })], 1)
        },
        l = [],
        n = {
          props: {
            top: {
              type: String,
              default: ""
            },
            close: {
              type: Boolean,
              default: !0
            }
          },
          data: function() {
            return {
              styleObject: {
                top: this.top
              }
            }
          }
        },
        c = n,
        o = a("e660"),
        r = a("04a2");

      function i(t) {
        this["$style"] = o["default"].locals || o["default"]
      }
      var u = Object(r["a"])(c, s, l, !1, i, null, null);
      e["default"] = u.exports
    },
    cef1: function(t, e, a) {
      t.exports = {
        tag: "Tag_tag_3--Pf",
        bor: "Tag_bor_2zqMO",
        clbor: "Tag_clbor_UJAQc",
        clbg: "Tag_clbg_1N7ZC",
        text: "Tag_text_3qrMD",
        btn: "Tag_btn_W18C4"
      }
    },
    e660: function(t, e, a) {
      "use strict";
      var s = a("cef1"),
        l = a.n(s);
      e["default"] = l.a
    }
  }
]);
