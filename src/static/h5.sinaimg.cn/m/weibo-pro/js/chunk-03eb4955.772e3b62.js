(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-03eb4955"], {
    5332: function(n, e, o) {
      "use strict";
      o.r(e);
      var t = function() {
          var n = this,
            e = n.$createElement,
            o = n._self._c || e;
          return o("AudioTip", {
            class: n.$style.gap1
          }, [n._v(" 发布后，将导入您未发布的所有音频，并发布一条入驻微博。"), o("br"), n._v(" 入驻微博将展示最新的一条音频，其他音频可在您个人主页音频签进行收听。 "), o("woo-pop", {
            attrs: {
              show: n.show,
              align: "center",
              gap: "10"
            },
            scopedSlots: n._u([{
              key: "ctrl",
              fn: function() {
                return [o("a", {
                  on: {
                    mousemove: function(e) {
                      n.show = !0
                    },
                    mouseout: function(e) {
                      n.show = !1
                    }
                  }
                }, [n._v("查看发布后样式")])]
              },
              proxy: !0
            }])
          }, [o("AudioPop")], 1)], 1)
        },
        u = [],
        c = (o("7431"), o("f85b")),
        i = {
          setup: function() {
            var n = Object(c["o"])(!1),
              e = function() {
                n.value = !n.value
              };
            return {
              show: n,
              click: e
            }
          },
          components: {
            AudioTip: function() {
              return o.e("chunk-45cd33c0").then(o.bind(null, "f61e"))
            },
            AudioPop: function() {
              return o.e("chunk-2b0ae722").then(o.bind(null, "eb7b"))
            }
          }
        },
        s = i,
        a = o("be7f"),
        r = o("04a2");

      function l(n) {
        this["$style"] = a["default"].locals || a["default"]
      }
      var f = Object(r["a"])(s, t, u, !1, l, null, null);
      e["default"] = f.exports
    },
    be7f: function(n, e, o) {
      "use strict";
      var t = o("c828"),
        u = o.n(t);
      e["default"] = u.a
    },
    c828: function(n, e, o) {
      n.exports = {
        gap1: "AudioAlbumHeader_gap1_Fd61L"
      }
    }
  }
]);
