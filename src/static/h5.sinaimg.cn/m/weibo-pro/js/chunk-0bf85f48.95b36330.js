(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0bf85f48", "chunk-4581f323"], {
    "428a": function(t, e, a) {
      t.exports = {
        layer: "AudioAlbumAddLayer_layer_2mcFv",
        tit: "AudioAlbumAddLayer_tit_2cpOg",
        top8: "AudioAlbumAddLayer_top8_3njA1"
      }
    },
    4369: function(t, e, a) {
      "use strict";
      var o = a("59a8"),
        n = a.n(o);
      e["default"] = n.a
    },
    "59a8": function(t, e, a) {
      t.exports = {
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
    "846f": function(t, e, a) {
      "use strict";
      var o = a("428a"),
        n = a.n(o);
      e["default"] = n.a
    },
    c98a: function(t, e, a) {
      "use strict";
      a.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", [t.title ? a("div", {
            class: [t.$style.tit1, t.$style.gap2]
          }, [t._v(" 封面"), a("span", [t._v("*")])]) : t._e(), a("woo-box", {
            class: [t.title && t.$style.gap2],
            attrs: {
              align: "end"
            }
          }, [a("input", {
            ref: "file",
            class: t.$style.file,
            attrs: {
              type: "file",
              accept: t.accept,
              multiple: ""
            },
            on: {
              change: t.change
            }
          }), t.curObj.src ? a("woo-picture", {
            class: t.$style.pic,
            attrs: {
              src: t.curObj.src,
              alt: "等比图"
            }
          }, [a("woo-box", {
            class: t.$style.btnbox,
            attrs: {
              align: "center",
              justify: "between"
            }
          }, [a("woo-button", {
            class: t.$style.btn,
            attrs: {
              sort: "simple",
              kind: "default"
            },
            nativeOn: {
              click: function(e) {
                return t.showFiles.apply(null, arguments)
              }
            }
          }, [t._v("上传")]), a("div", {
            class: t.$style.line
          }, [a("woo-divider", {
            attrs: {
              direction: "y",
              "border-color": "var(--w-contrast)"
            }
          })], 1), a("woo-button", {
            class: t.$style.btn,
            attrs: {
              sort: "simple",
              kind: "default"
            },
            nativeOn: {
              click: function(e) {
                return t.edit.apply(null, arguments)
              }
            }
          }, [t._v("裁剪")])], 1)], 1) : a("woo-box", {
            class: t.$style.addbox,
            attrs: {
              align: "center",
              justify: "center"
            },
            nativeOn: {
              click: function(e) {
                return t.showFiles.apply(null, arguments)
              }
            }
          }, [a("woo-fonticon", {
            class: t.$style.add,
            attrs: {
              value: "add"
            }
          })], 1), a("woo-box", {
            attrs: {
              direction: "y",
              align: "start"
            }
          }, [t.use ? [a("woo-button", {
            attrs: {
              sort: "line",
              kind: "primary",
              size: "s",
              disabled: ""
            }
          }, [t._v("使用合集封面")])] : [a("div", {
            class: t.$style.text
          }, [t._v("清晰美观的封面更容易被推荐")])], a("div", {
            class: t.$style.text
          }, [t._v(" " + t._s("尺寸为1:1，支持10M以内png/gif/jpg图片，不低于500*500") + " ")])], 2), a("woo-modal", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.coverVisible,
              expression: "coverVisible"
            }],
            attrs: {
              animation: "slide-bottom"
            },
            nativeOn: {
              click: function(t) {
                t.stopPropagation()
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
          })], 1)], 1), t.title ? a("woo-divider", {
            class: t.$style.gap1,
            attrs: {
              "border-color": "var(--w-card-border)"
            }
          }) : t._e()], 1)
        },
        n = [],
        i = (a("7431"), a("44c1"), a("f1e0"), a("07ca"), a("8201"), a("c3d6")),
        r = a("f85b"),
        l = a("b71e"),
        s = (a("7ec3"), a("5abd"), a("59b0"), {
          components: {
            CropperPop: l["a"]
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
          setup: function(t, e) {
            var a = e.emit,
              o = Object(r["e"])(),
              n = o.proxy,
              l = Object(r["o"])(!1),
              s = Object(r["o"])(),
              c = Object(r["o"])({
                src: t.src
              });
            Object(r["t"])((function() {
              return t.src
            }), (function() {
              c.value.src = t.src
            }));
            var u = function() {
                f()
              },
              d = function() {
                l.value = !0, s.value.setSrc(c.value.src, (function(t, e, a) {
                  v.value.value = "", e && (e && (c.value.src = e), a && (c.value.pid = a), b()), l.value = !1
                }))
              },
              v = Object(r["o"])(),
              p = function() {
                var t = Object(i["a"])(regeneratorRuntime.mark((function t(e) {
                  var a;
                  return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                      case 0:
                        if (!(e.target.files[0].size > 10485760)) {
                          t.next = 3;
                          break
                        }
                        return n.$_w_toast({
                          type: "error",
                          message: "请上传10M以下图片"
                        }), t.abrupt("return");
                      case 3:
                        a = URL.createObjectURL(e.target.files[0]), l.value = !0, s.value.setSrc(a, (function(t, e, a) {
                          v.value.value = "", e && (e && (c.value.src = e), a && (c.value.pid = a), b()), l.value = !1
                        }));
                      case 6:
                      case "end":
                        return t.stop()
                    }
                  }), t)
                })));
                return function(e) {
                  return t.apply(this, arguments)
                }
              }(),
              f = function() {
                Object(r["g"])((function() {
                  v.value.click()
                }))
              },
              b = function() {
                a("change", c.value)
              };
            return {
              upload: u,
              edit: d,
              change: p,
              showFiles: f,
              curObj: c,
              cropper: s,
              coverVisible: l,
              file: v
            }
          }
        }),
        c = s,
        u = a("4369"),
        d = a("04a2");

      function v(t) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var p = Object(d["a"])(c, o, n, !1, v, null, null);
      e["default"] = p.exports
    },
    e94f: function(t, e, a) {
      "use strict";
      a.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("woo-modal", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.visible,
              expression: "visible"
            }],
            attrs: {
              "lock-screen": ""
            },
            on: {
              close: t.close
            }
          }, [a("div", {
            staticClass: "wbpro-layer"
          }, [a("woo-panel", {
            attrs: {
              border: "bottom"
            }
          }, [a("woo-box", {
            staticClass: "wbpro-layer-tit"
          }, [a("woo-box-item", {
            staticClass: "wbpro-layer-tit-text",
            attrs: {
              align: "center"
            }
          }, [t._v("合集信息")]), a("woo-box", {
            staticClass: "wbpro-layer-tit-opt",
            attrs: {
              align: "center",
              justify: "center"
            }
          }, [a("woo-fonticon", {
            attrs: {
              value: "cross"
            },
            nativeOn: {
              click: function(e) {
                return t.close.apply(null, arguments)
              }
            }
          })], 1)], 1)], 1), a("div", {
            class: t.$style.layer
          }, [a("div", {
            class: t.$style.tit
          }, [t._v("合集名称"), a("span", [t._v("*")])]), a("div", {
            class: t.$style.top8
          }, [a("TextInput", {
            attrs: {
              placeholder: "填写合集名称",
              maxOptionLen: 12,
              text: t.name
            },
            on: {
              change: function(e) {
                t.name = e
              }
            }
          })], 1), a("div", {
            class: t.$style.tit
          }, [t._v("合集封面"), a("span", [t._v("*")])]), a("AudioCover", {
            class: t.$style.top8,
            attrs: {
              src: t.cover
            },
            on: {
              change: t.coverChange
            }
          })], 1), a("woo-box", {
            staticClass: "wbpro-layer-btn",
            attrs: {
              justify: "center"
            }
          }, [a("woo-button", {
            staticClass: "wbpro-layer-btn-item",
            attrs: {
              sort: "flat",
              kind: "default"
            },
            nativeOn: {
              click: function(e) {
                return t.cancel.apply(null, arguments)
              }
            }
          }, [t._v("取消")]), a("woo-button", {
            staticClass: "wbpro-layer-btn-item",
            attrs: {
              sort: "flat",
              kind: "primary"
            },
            nativeOn: {
              click: function(e) {
                return t.confirm.apply(null, arguments)
              }
            }
          }, [t._v("确定")])], 1)], 1)])
        },
        n = [],
        i = (a("83ef"), a("f85b")),
        r = a("c98a"),
        l = a("d2ea"),
        s = {
          components: {
            AudioCover: r["default"],
            TextInput: l["default"]
          },
          props: {
            show: {
              default: !1,
              type: Boolean
            },
            editObj: {}
          },
          emits: ["close"],
          setup: function(t, e) {
            var a = e.emit,
              o = (e.root, Object(i["e"])()),
              n = o.proxy,
              r = Object(i["o"])(t.show),
              l = Object(i["o"])(""),
              s = Object(i["o"])("");
            Object(i["t"])((function() {
              return t.show
            }), (function() {
              var e, a;
              l.value = (null === t || void 0 === t || null === (e = t.editObj) || void 0 === e ? void 0 : e.name) || "", s.value = (null === t || void 0 === t || null === (a = t.editObj) || void 0 === a ? void 0 : a.cover) || "", r.value = t.show
            }));
            var c = function() {
                d()
              },
              u = function() {
                var e;
                l.value ? s.value ? (null === (e = t.editObj) || void 0 === e ? void 0 : e.cluster_id) ? n.$http.post("/ajax/multimedia/update_collection", {
                  id: t.editObj.cluster_id,
                  type: 3,
                  name: l.value,
                  cover: s.value
                }).then((function(e) {
                  e.data && (a("change", {
                    name: l.value,
                    cover: s.value,
                    type: "edit",
                    id: e.data.data.cluster_id_str,
                    cluster_id: e.data.data.cluster_id_str,
                    index: t.editObj.index
                  }), d())
                })) : n.$http.post("/ajax/multimedia/create_collection", {
                  type: 3,
                  name: l.value,
                  cover: s.value
                }).then((function(t) {
                  t.data && (a("change", {
                    id: t.data.data.cluster_id_str,
                    name: l.value,
                    cover: s.value
                  }), d())
                })) : n.$_w_toast({
                  type: "warn",
                  message: "请上传合集封面"
                }) : n.$_w_toast({
                  type: "warn",
                  message: "请输入合集名称"
                })
              },
              d = function() {
                l.value = "", s.value = "", r.value = !1, a("close")
              },
              v = function(t) {
                s.value = t.src
              };
            return {
              close: d,
              cancel: c,
              coverChange: v,
              confirm: u,
              name: l,
              visible: r,
              cover: s
            }
          }
        },
        c = s,
        u = a("846f"),
        d = a("04a2");

      function v(t) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var p = Object(d["a"])(c, o, n, !1, v, null, null);
      e["default"] = p.exports
    }
  }
]);
