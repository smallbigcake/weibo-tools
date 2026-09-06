(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2e6c6949"], {
    3646: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a("div", [a("div", {
            class: e.$style.gap1
          }, [a("woo-box", {
            class: e.$style.switch,
            attrs: {
              align: "center"
            }
          }, [a("div", {
            class: e.$style.tit1
          }, [e._v("类型"), a("span", [e._v("*")])]), a("woo-box", {
            class: e.$style.type,
            attrs: {
              align: "center"
            }
          }, e._l(e.videoTypeDesc, (function(t, n) {
            var o;
            return a("div", {
              key: n
            }, [t.show ? a("woo-radio", {
              class: (o = {}, o[e.$style.label3] = !0, o[e.$style.gray1] = t.value == e.curType, o),
              attrs: {
                value: t.value,
                size: "16",
                disabled: 1 === t.value && e.coCreationState && e.coCreationState.coCreation
              },
              on: {
                change: e.change
              },
              nativeOn: {
                click: function(a) {
                  1 === t.value && e.coCreationState && e.coCreationState.coCreation && e.showToastType()
                }
              },
              model: {
                value: e.curType,
                callback: function(t) {
                  e.curType = t
                },
                expression: "curType"
              }
            }, [e._v(e._s(t.name))]) : e._e()], 1)
          })), 0)], 1)], 1), a("woo-divider", {
            class: e.$style.gap1,
            attrs: {
              "border-color": "var(--w-card-border)"
            }
          })], 1)
        },
        o = [],
        c = a("f85b"),
        s = {
          props: {
            coCreationState: {},
            type: {},
            showToastType: {}
          },
          emits: ["input"],
          setup: function(e, t) {
            var a = t.emit,
              n = function(e) {
                a("input", e)
              },
              o = Object(c["o"])(e.type);
            return Object(c["t"])((function() {
              return o.value
            }), (function() {})), {
              change: n,
              curType: o
            }
          },
          data: function() {
            return {
              videoTypeDesc: [{
                name: "原创",
                show: !0,
                value: 0
              }, {
                name: "二创",
                show: !0,
                value: 2
              }, {
                name: "转载",
                show: !0,
                value: 1
              }]
            }
          }
        },
        r = s,
        i = a("cea6"),
        l = a("04a2");

      function u(e) {
        this["$style"] = i["default"].locals || i["default"]
      }
      var p = Object(l["a"])(r, n, o, !1, u, null, null);
      t["default"] = p.exports
    },
    cea6: function(e, t, a) {
      "use strict";
      var n = a("e0f7"),
        o = a.n(n);
      t["default"] = o.a
    },
    e0f7: function(e, t, a) {
      e.exports = {
        switch: "Type_switch_bA5y_",
        type: "Type_type_2-gn9",
        label3: "Type_label3_3oiyw",
        gray1: "Type_gray1_3O6Ia",
        tit1: "Type_tit1_2lpBt",
        gap1: "Type_gap1_3mkBx"
      }
    }
  }
]);
