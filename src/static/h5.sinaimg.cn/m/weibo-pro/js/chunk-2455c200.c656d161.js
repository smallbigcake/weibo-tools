(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2455c200"], {
    2883: function(t, e, n) {
      t.exports = {
        abox3: "AutoState_abox3_Wx9dO",
        tit2: "AutoState_tit2_2G9np",
        gap2: "AutoState_gap2_9RdBL",
        bg: "AutoState_bg_lu55a"
      }
    },
    4882: function(t, e, n) {
      "use strict";
      var o = n("2883"),
        a = n.n(o);
      e["default"] = a.a
    },
    f761: function(t, e, n) {
      "use strict";
      n.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.autoPublish ? n("div", [n("woo-box", {
            class: [t.$style.abox3, t.$style.gap2],
            attrs: {
              direction: "y",
              align: "center",
              justify: "center"
            }
          }, [n("div", {
            class: t.$style.bg
          }), t.isEdit ? n("div", {
            class: t.$style.tit2
          }, [t._v(" " + t._s(t.comment.edit) + " "), t.hasnav && t.isVideo ? n("a", {
            on: {
              click: t.goList
            }
          }, [t._v("视频管理 >")]) : t._e()]) : n("div", {
            class: t.$style.tit2
          }, [t._v(" " + t._s(t.comment.publisher) + " "), t.isVideo ? n("a", {
            on: {
              click: function(e) {
                return t.goList(!0)
              }
            }
          }, [t._v("视频管理 >")]) : t._e()]), n("woo-box", [n("woo-button", {
            attrs: {
              sort: "flat",
              kind: "default"
            },
            nativeOn: {
              click: function(e) {
                return t.cancel.apply(null, arguments)
              }
            }
          }, [t._v("取消自动发布")]), n("woo-button", {
            staticStyle: {
              "margin-left": "24px"
            },
            attrs: {
              sort: "flat",
              kind: "primary"
            },
            nativeOn: {
              click: function(e) {
                return t.openBlank.apply(null, arguments)
              }
            }
          }, [t._v(t._s(t.comment.another))])], 1)], 1)], 1) : t._e()
        },
        a = [],
        i = n("8e18"),
        s = {
          props: {
            autoPublish: Boolean,
            hasnav: Boolean
          },
          emits: ["cancel"],
          setup: function(t, e) {
            var n = e.emit,
              o = Object(i["a"])(),
              a = o.goList,
              s = o.refresh,
              l = o.openBlank,
              c = o.comment,
              u = o.isVideo,
              r = o.isEdit,
              d = function() {
                n("cancel")
              };
            return {
              goList: a,
              refresh: s,
              cancel: d,
              openBlank: l,
              isEdit: r,
              isVideo: u,
              comment: c
            }
          }
        },
        l = s,
        c = n("4882"),
        u = n("04a2");

      function r(t) {
        this["$style"] = c["default"].locals || c["default"]
      }
      var d = Object(u["a"])(l, o, a, !1, r, null, null);
      e["default"] = d.exports
    }
  }
]);
