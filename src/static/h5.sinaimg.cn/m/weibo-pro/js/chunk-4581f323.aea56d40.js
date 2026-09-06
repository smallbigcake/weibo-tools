(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-4581f323"], {
    4369: function(e, t, a) {
      "use strict";
      var o = a("59a8"),
        r = a.n(o);
      t["default"] = r.a
    },
    "59a8": function(e, t, a) {
      e.exports = {
        file: "AudioCover_file_15oWJ",
        addbox: "AudioCover_addbox_e32Pw",
        add: "AudioCover_add_Z16Vl",
        pic: "AudioCover_pic_20A5I",
        btnbox: "AudioCover_btnbox_113H_",
        btn: "AudioCover_btn_2AC57",
        line: "AudioCover_line_3R6Xo",
        text: "AudioCover_text_3rueS",
        tit1: "AudioCover_tit1_1sLo6",
        gap1: "AudioCover_gap1_-7qik",
        gap2: "AudioCover_gap2_1OgLb"
      }
    },
    c98a: function(e, t, a) {
      "use strict";
      a.r(t);
      var o = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a("div", [e.title ? a("div", {
            class: [e.$style.tit1, e.$style.gap2]
          }, [e._v(" 封面"), a("span", [e._v("*")])]) : e._e(), a("woo-box", {
            class: [e.title && e.$style.gap2],
            attrs: {
              align: "end"
            }
          }, [a("input", {
            ref: "file",
            class: e.$style.file,
            attrs: {
              type: "file",
              accept: e.accept,
              multiple: ""
            },
            on: {
              change: e.change
            }
          }), e.curObj.src ? a("woo-picture", {
            class: e.$style.pic,
            attrs: {
              src: e.curObj.src,
              alt: "等比图"
            }
          }, [a("woo-box", {
            class: e.$style.btnbox,
            attrs: {
              align: "center",
              justify: "between"
            }
          }, [a("woo-button", {
            class: e.$style.btn,
            attrs: {
              sort: "simple",
              kind: "default"
            },
            nativeOn: {
              click: function(t) {
                return e.showFiles.apply(null, arguments)
              }
            }
          }, [e._v("上传")]), a("div", {
            class: e.$style.line
          }, [a("woo-divider", {
            attrs: {
              direction: "y",
              "border-color": "var(--w-contrast)"
            }
          })], 1), a("woo-button", {
            class: e.$style.btn,
            attrs: {
              sort: "simple",
              kind: "default"
            },
            nativeOn: {
              click: function(t) {
                return e.edit.apply(null, arguments)
              }
            }
          }, [e._v("裁剪")])], 1)], 1) : a("woo-box", {
            class: e.$style.addbox,
            attrs: {
              align: "center",
              justify: "center"
            },
            nativeOn: {
              click: function(t) {
                return e.showFiles.apply(null, arguments)
              }
            }
          }, [a("woo-fonticon", {
            class: e.$style.add,
            attrs: {
              value: "add"
            }
          })], 1), a("woo-box", {
            attrs: {
              direction: "y",
              align: "start"
            }
          }, [e.use ? [a("woo-button", {
            attrs: {
              sort: "line",
              kind: "primary",
              size: "s",
              disabled: ""
            }
          }, [e._v("使用合集封面")])] : [a("div", {
            class: e.$style.text
          }, [e._v("清晰美观的封面更容易被推荐")])], a("div", {
            class: e.$style.text
          }, [e._v(" " + e._s("尺寸为1:1，支持10M以内png/gif/jpg图片，不低于500*500") + " ")])], 2), a("woo-modal", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: e.coverVisible,
              expression: "coverVisible"
            }],
            attrs: {
              animation: "slide-bottom"
            },
            nativeOn: {
              click: function(e) {
                e.stopPropagation()
              }
            }
          }, [a("CropperPop", {
            ref: "cropper",
            attrs: {
              ratio: [1, 1],
              title: "编辑图片",
              needTips: !1,
              max: 10,
              opts: {
                watermark: 0
              },
              desc: "尺寸为1:1，支持10M以内png/gif/jpg图片，不低于500*500"
            }
          })], 1)], 1), e.title ? a("woo-divider", {
            class: e.$style.gap1,
            attrs: {
              "border-color": "var(--w-card-border)"
            }
          }) : e._e()], 1)
        },
        r = [],
        i = (a("7431"), a("44c1"), a("f1e0"), a("07ca"), a("8201"), a("c3d6")),
        n = a("f85b"),
        s = a("b71e"),
        c = (a("7ec3"), a("5abd"), a("59b0"), {
          components: {
            CropperPop: s["a"]
          },
          props: {
            label: {
              type: String,
              default: ""
            },
            accept: {
              default: "image/*, .jpg, .jpeg, .bmp, .gif, .png, .heif, .heic"
            },
            use: {
              default: !1,
              type: Boolean
            },
            src: {
              default: "",
              type: String
            },
            title: {
              default: !1,
              type: Boolean
            }
          },
          emits: ["change"],
          setup: function(e, t) {
            var a = t.emit,
              o = Object(n["e"])(),
              r = o.proxy,
              s = Object(n["o"])(!1),
              c = Object(n["o"])(),
              l = Object(n["o"])({
                src: e.src
              });
            Object(n["t"])((function() {
              return e.src
            }), (function() {
              l.value.src = e.src
            }));
            var u = function() {
                f()
              },
              p = function() {
                s.value = !0, c.value.setSrc(l.value.src, (function(e, t, a) {
                  d.value.value = "", t && (t && (l.value.src = t), a && (l.value.pid = a), b()), s.value = !1
                }))
              },
              d = Object(n["o"])(),
              v = function() {
                var e = Object(i["a"])(regeneratorRuntime.mark((function e(t) {
                  var a;
                  return regeneratorRuntime.wrap((function(e) {
                    while (1) switch (e.prev = e.next) {
                      case 0:
                        if (!(t.target.files[0].size > 10485760)) {
                          e.next = 3;
                          break
                        }
                        return r.$_w_toast({
                          type: "error",
                          message: "请上传10M以下图片"
                        }), e.abrupt("return");
                      case 3:
                        a = URL.createObjectURL(t.target.files[0]), s.value = !0, c.value.setSrc(a, (function(e, t, a) {
                          d.value.value = "", t && (t && (l.value.src = t), a && (l.value.pid = a), b()), s.value = !1
                        }));
                      case 6:
                      case "end":
                        return e.stop()
                    }
                  }), e)
                })));
                return function(t) {
                  return e.apply(this, arguments)
                }
              }(),
              f = function() {
                Object(n["g"])((function() {
                  d.value.click()
                }))
              },
              b = function() {
                a("change", l.value)
              };
            return {
              upload: u,
              edit: p,
              change: v,
              showFiles: f,
              curObj: l,
              cropper: c,
              coverVisible: s,
              file: d
            }
          }
        }),
        l = c,
        u = a("4369"),
        p = a("04a2");

      function d(e) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var v = Object(p["a"])(l, o, r, !1, d, null, null);
      t["default"] = v.exports
    }
  }
]);
