(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-380af969"], {
    "1f95": function(e, t, r) {
      e.exports = {
        box: "VideoEdit_box_2CAfR",
        picbed: "VideoEdit_picbed_16XZh",
        curr: "VideoEdit_curr_2O8SS",
        icon: "VideoEdit_icon_3dvxT",
        tab: "VideoEdit_tab_2O-Y_",
        editbox: "VideoEdit_editbox_1oBI_",
        box2: "VideoEdit_box2_1iY8i",
        tip: "VideoEdit_tip_23CDY",
        file: "VideoEdit_file_2aoWb",
        loading: "VideoEdit_loading_3cEIj",
        list: "VideoEdit_list_LUZQe",
        lt: "VideoEdit_lt_b1QfW",
        lt1: "VideoEdit_lt1_3CY5r",
        card2c: "VideoEdit_card2c_2FNsV",
        card2cin: "VideoEdit_card2cin_1C0N4",
        card2a: "VideoEdit_card2a_2cu0t",
        card2al: "VideoEdit_card2al_2lecF",
        card2ar: "VideoEdit_card2ar_qsHOk",
        card2l: "VideoEdit_card2l_1Euy0",
        card2p: "VideoEdit_card2p_1tdo7",
        card2pcurr: "VideoEdit_card2pcurr_10piR",
        card2picon: "VideoEdit_card2picon_3En7B",
        op: "VideoEdit_op_qjrqE",
        op1: "VideoEdit_op1_3G1ZD",
        cus: "VideoEdit_cus_35i36",
        layer: "VideoEdit_layer_4kJDr",
        bus: "VideoEdit_bus_OWBYa"
      }
    },
    "434c": function(e, t, r) {
      "use strict";
      r.r(t);
      var i = function() {
          var e = this,
            t = e.$createElement,
            r = e._self._c || t;
          return e.edit ? r("div", {
            staticClass: "wbpro-layer",
            class: e.$style.layer
          }, [r("woo-panel", {
            attrs: {
              border: "bottom"
            }
          }, [r("woo-box", {
            staticClass: "wbpro-layer-tit"
          }, [r("woo-box", {
            staticClass: "wbpro-layer-tit-nav",
            attrs: {
              align: "center",
              justify: "center"
            }
          }, [r("woo-fonticon", {
            class: e.$style.cus,
            attrs: {
              value: "angleLeft"
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), e.cancel.apply(null, arguments)
              }
            }
          })], 1), r("woo-box-item", {
            staticClass: "wbpro-layer-tit-text",
            attrs: {
              align: "center"
            }
          }, [e._v("编辑封面")])], 1)], 1), r("woo-tab", {
            staticClass: "wbpro-tab1",
            class: e.$style.tab,
            attrs: {
              justify: "center",
              animate: "",
              "animate-duration": 500
            },
            scopedSlots: e._u([{
              key: "content",
              fn: function() {
                return [r("div", {
                  directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !e.defaultScreenshot && e.horizontal,
                    expression: "!defaultScreenshot && horizontal"
                  }],
                  class: e.$style.box
                }, [r("div", {
                  class: e.$style.editbox
                }, [r("div", {
                  class: e.$style.box2
                }, [r("Cropper", {
                  ref: "cropper2",
                  attrs: {
                    height: 319,
                    aspectRatio: e.aspectRatio,
                    opts: {
                      watermark: 0
                    },
                    options: {
                      checkCrossOrigin: !0
                    },
                    source: "1"
                  }
                })], 1)])]), r("div", {
                  directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.defaultScreenshot,
                    expression: "defaultScreenshot"
                  }],
                  class: e.$style.box
                }, [r("div", {
                  class: e.$style.editbox
                }, [r("div", {
                  directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.screenshot || e.basicSrc,
                    expression: "screenshot || basicSrc"
                  }],
                  class: e.$style.box2
                }, [r("Cropper", {
                  ref: "cropper",
                  attrs: {
                    height: 319,
                    aspectRatio: e.horizontal ? 3 / 4 : e.aspectRatio,
                    opts: {
                      watermark: 0
                    },
                    options: {
                      checkCrossOrigin: !0
                    },
                    source: "1"
                  }
                })], 1), e.screenshot || e.basicSrc ? e._e() : r("woo-box", {
                  class: e.$style.loading,
                  attrs: {
                    align: "center",
                    justify: "center"
                  }
                }, [r("div", [e._v("处理中请稍后…")])])], 1)]), r("woo-box", {
                  class: [e.$style.lt, e.$style.list],
                  attrs: {
                    direction: "x-r"
                  }
                }, [r("woo-button", {
                  attrs: {
                    sort: "simple",
                    kind: "primary",
                    fonticon: "upload",
                    size: "s"
                  },
                  nativeOn: {
                    click: function(t) {
                      t.stopPropagation(), e.defaultScreenshot ? e.$refs.file.click() : e.$refs.file2.click()
                    }
                  }
                }, [e._v("本地上传")])], 1)]
              },
              proxy: !0
            }], null, !1, 1954643263)
          }, [e.showCover ? r("woo-tab-item", {
            attrs: {
              cur: e.defaultScreenshot
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), e.changeCover(!0)
              }
            }
          }, [r("div", {
            staticClass: "wbpro-tab1-item"
          }, [e._v(" 竖版封面（信息流内展示） ")])]) : e._e(), e.showCover ? r("woo-tab-item", {
            attrs: {
              cur: !e.defaultScreenshot
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), e.changeCover(!1)
              }
            }
          }, [r("div", {
            staticClass: "wbpro-tab1-item"
          }, [e._v(" 横版封面（视频社区展示） ")])]) : e._e()], 1), r("woo-box", {
            staticClass: "wbpro-layer-btn",
            class: e.$style.bus,
            attrs: {
              justify: "center"
            }
          }, [r("woo-button", {
            staticClass: "wbpro-layer-btn-item",
            attrs: {
              sort: "flat",
              kind: "primary",
              loading: e.okDisabled,
              disabled: e.okDisabled
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), e.ok.apply(null, arguments)
              }
            }
          }, [e._v(e._s(e.okDisabled ? "裁切处理中" : "完成"))])], 1), r("input", {
            ref: "file",
            class: e.$style.file,
            attrs: {
              type: "file",
              accept: ".jpg, .jpeg, .bmp, .gif, .png"
            },
            on: {
              change: e.change
            }
          }), r("input", {
            ref: "file2",
            class: e.$style.file,
            attrs: {
              type: "file",
              accept: ".jpg, .jpeg, .bmp, .gif, .png"
            },
            on: {
              change: function(t) {
                return e.change(t, !1)
              }
            }
          })], 1) : e._e()
        },
        o = [],
        s = (r("7431"), r("44c1"), r("f1e0"), r("07ca"), r("8201"), r("c3d6")),
        a = r("4fa9"),
        c = {
          components: {
            Cropper: a["a"]
          },
          props: {
            screenArray: {
              type: Array,
              required: !1
            },
            screenshot: {
              type: String,
              required: !1,
              default: ""
            },
            edit: {
              type: Boolean,
              default: !1
            },
            horizontal: {
              type: Boolean,
              default: !1
            },
            channel: {
              type: Boolean,
              default: !0
            }
          },
          data: function() {
            return {
              defaultScreenshot: !0,
              coverSelect: 1,
              option: 9,
              okDisabled: !1,
              aspectRatio: 16 / 9,
              marginStyle: "",
              cover: "",
              showCover: !1,
              basicSrc: "",
              cSrc: ""
            }
          },
          methods: {
            changeCover: function(e) {
              this.defaultScreenshot = e, this.changeSrc(this.screenshot)
            },
            right: function() {
              this.marginStyle = "margin-left: -436px"
            },
            left: function() {
              this.marginStyle = ""
            },
            changeSelect: function(e) {},
            cancel: function() {
              this.cSrc = "", this.defaultScreenshot = !0, this.$emit("change")
            },
            change: function(e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              if (e && e.target && e.target.files && e.target.files[0]) {
                var r = e.target.files[0];
                if (void 0 !== r && r.size < 5248e3) {
                  this.coverSelect = void 0;
                  var i = URL.createObjectURL(r);
                  !this.screenshot && t && (this.basicSrc = i), this.cSrc = i, this.$refs[t ? "cropper" : "cropper2"].setSrc(i)
                } else r.size > 5242880 && this.$_w_toast({
                  type: "error",
                  message: "图片不得大于5M"
                });
                e.target.value = ""
              }
            },
            ok: function() {
              var e = this;
              return Object(s["a"])(regeneratorRuntime.mark((function t() {
                var r, i;
                return regeneratorRuntime.wrap((function(t) {
                  while (1) switch (t.prev = t.next) {
                    case 0:
                      return e.okDisabled = !0, t.prev = 1, t.next = 4, e.$refs.cropper.getWeiboURL(!0);
                    case 4:
                      if (r = t.sent, void 0 !== r && e.$refs.cropper.setSrc(r), e.defaultScreenshot) {
                        t.next = 11;
                        break
                      }
                      return t.next = 9, e.$refs.cropper2.getWeiboURL(!0);
                    case 9:
                      e.cover = t.sent, e.cover && e.$refs.cropper2.setSrc(e.cover);
                    case 11:
                      i = {
                        url: r
                      }, e.horizontal && (i.cover = e.cover), e.$emit("change", "change", i), e.coverSelect = void 0, t.next = 20;
                      break;
                    case 17:
                      t.prev = 17, t.t0 = t["catch"](1), e.$_w_toast({
                        type: "error",
                        message: "图片过大，请更换"
                      });
                    case 20:
                      e.cSrc = "", e.okDisabled = !1;
                    case 22:
                    case "end":
                      return t.stop()
                  }
                }), t, null, [
                  [1, 17]
                ])
              })))()
            },
            changeSrc: function(e) {
              var t;
              this.edit && (this.currSelect ? (null === (t = this.screenArray[this.currSelect - 1]) || void 0 === t ? void 0 : t.url) && this.$refs.cropper.setSrc(this.screenArray[this.currSelect - 1].url) : this.cSrc || (e && this.defaultScreenshot || e) && this.$refs.cropper.setSrc(e), this.horizontal && (this.cover || (this.cover = e), this.defaultScreenshot || this.$refs.cropper2.setSrc(this.cover)))
            }
          },
          watch: {
            screenArray: function(e) {
              e.length || (this.coverSelect = 1)
            },
            edit: function(e) {
              var t = this;
              e && this.$nextTick((function() {
                t.defaultScreenshot = !0, t.changeSrc(t.screenshot)
              }))
            },
            screenshot: function(e) {
              this.basicSrc = "", this.changeSrc(e)
            },
            horizontal: function(e) {
              void 0 === e && (this.cover = "")
            }
          }
        },
        n = c,
        l = r("ce56"),
        d = r("04a2");

      function p(e) {
        this["$style"] = l["default"].locals || l["default"]
      }
      var u = Object(d["a"])(n, i, o, !1, p, null, null);
      t["default"] = u.exports
    },
    ce56: function(e, t, r) {
      "use strict";
      var i = r("1f95"),
        o = r.n(i);
      t["default"] = o.a
    }
  }
]);
