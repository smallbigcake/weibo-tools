(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-d2bc8532"], {
    "2adb": function(t, e, o) {
      "use strict";
      o.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            o = t._self._c || e;
          return o("woo-box", {
            class: t.$style.switch,
            attrs: {
              align: "center"
            }
          }, [o("woo-box-item", {
            attrs: {
              align: "center"
            }
          }, [o("woo-box", {
            attrs: {
              align: "center"
            }
          }, [o("div", {
            class: [t.$style.gray1, t.$style.tit1]
          }, [t._v(t._s(t.config.title))]), t.config.pop ? o("woo-pop", {
            class: t.$style.help,
            attrs: {
              show: t.showPop,
              flow: "",
              direction: "right",
              align: "center",
              gap: "10"
            },
            scopedSlots: t._u([{
              key: "ctrl",
              fn: function() {
                return [o("woo-fonticon", {
                  class: t.$style.qa,
                  attrs: {
                    value: "qaCircle"
                  },
                  nativeOn: {
                    mouseover: function(e) {
                      t.showPop = !0
                    },
                    mouseout: function(e) {
                      t.showPop = !1
                    }
                  }
                })]
              },
              proxy: !0
            }], null, !1, 3337990852)
          }, [o("div", {
            staticClass: "wbpro-texta",
            class: t.$style.helppop1
          }, [o("h4", {
            staticClass: "fb"
          }, [t._v(t._s(t.config.pop.title))]), o("p", {
            domProps: {
              innerHTML: t._s(t.config.pop.desc)
            }
          })])]) : t._e(), t.config.sub_title ? o("div", {
            class: [t.$style.gray2, t.$style.left6]
          }, [t._v(" " + t._s(t.config.sub_title) + " ")]) : t._e()], 1)], 1), o("div", [o("woo-switch", {
            ref: "checkAlbumRef",
            attrs: {
              size: .6875
            },
            on: {
              change: t.changeSwitch
            },
            model: {
              value: t.show,
              callback: function(e) {
                t.show = e
              },
              expression: "show"
            }
          })], 1)], 1)
        },
        c = [],
        i = o("f85b"),
        n = {
          props: {
            config: {
              default: function() {
                return {
                  title: "合集",
                  sub_title: "",
                  pop: {
                    title: "微博合集",
                    desc: "1、合集功能可以让你对自己的视频作品进行分类管理。\n              <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。\n              <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。"
                  }
                }
              }
            },
            show: {
              default: !1,
              type: Boolean
            }
          },
          emits: ["change"],
          setup: function(t, e) {
            var o = e.emit,
              s = Object(i["o"])(!1),
              c = Object(i["o"])(!1),
              n = function(t) {
                o("input", t)
              };
            return {
              changeSwitch: n,
              checkAlbum: s,
              showPop: c
            }
          }
        },
        a = n,
        l = o("3e35"),
        r = o("04a2");

      function p(t) {
        this["$style"] = l["default"].locals || l["default"]
      }
      var h = Object(r["a"])(a, s, c, !1, p, null, null);
      e["default"] = h.exports
    },
    "3e35": function(t, e, o) {
      "use strict";
      var s = o("8975"),
        c = o.n(s);
      e["default"] = c.a
    },
    8975: function(t, e, o) {
      t.exports = {
        gray1: "SwitchHeader_gray1_BCffW",
        tit1: "SwitchHeader_tit1_219dJ",
        help: "SwitchHeader_help_3JDhR",
        helppop1: "SwitchHeader_helppop1_1BZrh",
        qa: "SwitchHeader_qa_3qPV3",
        switch: "SwitchHeader_switch_2L32r",
        gray2: "SwitchHeader_gray2_3xHbl",
        left6: "SwitchHeader_left6_2B-GV"
      }
    }
  }
]);
