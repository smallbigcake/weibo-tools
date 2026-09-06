(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-608ef04f"], {
    "663a": function(e, t, o) {
      e.exports = {
        cut: "VideoUpload_cut_H7ps6",
        box1: "VideoUpload_box1_1lWni",
        btn1: "VideoUpload_btn1_2avmO",
        box2: "VideoUpload_box2_1bjDZ",
        box21: "VideoUpload_box21_BZc6S",
        box2t: "VideoUpload_box2t_1CdyX",
        box2t1: "VideoUpload_box2t1_1j7-Q",
        box2t2: "VideoUpload_box2t2_3khYD",
        box2b: "VideoUpload_box2b_1voLe",
        cutout: "VideoUpload_cutout_2jRfZ",
        fontable: "VideoUpload_fontable_1FvW6",
        abox2: "VideoUpload_abox2_31mcs",
        tit2: "VideoUpload_tit2_I4thc",
        abox2audio: "VideoUpload_abox2audio_Wa7ZY",
        abox3: "VideoUpload_abox3_3bTDv",
        gap2: "VideoUpload_gap2_1h6PT",
        icon2: "VideoUpload_icon2_2TbAq",
        abox4: "VideoUpload_abox4_1406j",
        bar: "VideoUpload_bar_P3iY3",
        pro: "VideoUpload_pro_2hpak",
        info: "VideoUpload_info_3PQH8",
        v_plus: "VideoUpload_v_plus_1_P79",
        a4s1: "VideoUpload_a4s1_1MTOn",
        a4s11: "VideoUpload_a4s11_3e5kp",
        a4s12: "VideoUpload_a4s12_2J8zQ",
        a4s13: "VideoUpload_a4s13__qVKl",
        a4s14: "VideoUpload_a4s14_1DCEU",
        a4s2: "VideoUpload_a4s2_3mRaR",
        um_video: "VideoUpload_um_video_3s7DQ",
        um_video_1: "VideoUpload_um_video_1_8curF",
        report: "VideoUpload_report_1r_EB",
        pay: "VideoUpload_pay_2QTb4"
      }
    },
    "6b87": function(e, t, o) {
      "use strict";
      var a = o("663a"),
        i = o.n(a);
      t["default"] = i.a
    },
    dd52: function(e, t, o) {
      "use strict";
      o.r(t);
      var a = function() {
          var e = this,
            t = e.$createElement,
            o = e._self._c || t;
          return o("div", {
            on: {
              click: function(e) {
                e.stopPropagation()
              }
            }
          }, [o("woo-box", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: "upload" === e.status,
              expression: "status === 'upload'"
            }],
            class: [e.$style.abox2, e.isAudio && e.$style.abox2audio, e.$style.gap2, e.fileEnter && e.$style.abox3],
            attrs: {
              direction: "y",
              align: "center",
              justify: "center",
              id: "area_" + e.id
            }
          }, [o("woo-fonticon", {
            class: e.$style.icon2,
            attrs: {
              value: "upload"
            }
          }), o("div", {
            class: e.$style.tit2
          }, [e._v(e._s(e.handleComment.drag))]), o("woo-box", {
            attrs: {
              align: "center",
              direction: "y"
            }
          }, [o("woo-button", {
            ref: "video_button_upload",
            class: e.$style.btn1,
            attrs: {
              id: e.id,
              sort: "flat",
              kind: "primary"
            }
          }, [e._v(e._s(e.handleComment.upload))]), o("woo-box", {
            attrs: {
              direction: "y",
              align: "start"
            }
          }, [e.isVideo ? [e.biz_type ? o("woo-box", {
            class: e.$style.um_video,
            attrs: {
              align: "center"
            }
          }, [o("woo-checkbox", {
            attrs: {
              value: "um_video"
            },
            model: {
              value: e.um_video,
              callback: function(t) {
                e.um_video = t
              },
              expression: "um_video"
            }
          }, [e._v("设置为联合会员专属视频")])], 1) : e._e(), e.config.user.v_plus ? o("woo-box", {
            class: e.$style[e.biz_type ? "um_video_1" : "um_video"],
            attrs: {
              align: "center"
            }
          }, [o("woo-checkbox", {
            attrs: {
              value: "vplus_video"
            },
            model: {
              value: e.um_video,
              callback: function(t) {
                e.um_video = t
              },
              expression: "um_video"
            }
          }, [e._v("设置为V+专属视频")]), o("Action", {
            attrs: {
              size: 14,
              title: "V+专属视频",
              desc: "1.设置后，非V+用户可试看30秒，订阅后可观看完整视频<br/>2.仅支持1分钟以上的视频进行此设置"
            }
          })], 1) : e._e()] : e.isAudio ? [e.audioCanPay ? o("woo-box", {
            class: e.$style[(e.biz_type, "um_video_1")],
            attrs: {
              align: "center"
            }
          }, [o("woo-checkbox", {
            attrs: {
              value: "podcast_audio_pay"
            },
            model: {
              value: e.um_video,
              callback: function(t) {
                e.um_video = t
              },
              expression: "um_video"
            }
          }, [e._v("设置为付费音频")]), o("Action", {
            attrs: {
              size: 14,
              title: "付费音频",
              desc: "勾选后，用户需付费才能收听完整音频<br/>1、仅支持1分钟以上音频进行此设置<br/>2、本次选择仅对当前微博生效，不影响其他微博"
            }
          })], 1) : e._e()] : e._e()], 2)], 1)], 1), o("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: "upload" !== e.status,
              expression: "status !== 'upload'"
            }],
            class: [e.$style.abox4, e.$style.gap2]
          }, [o("div", {
            class: e.$style.bar
          }, [o("div", {
            class: e.$style.pro,
            style: e.progressBar
          })]), o("woo-box", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: "loading" === e.status && !e.stop,
              expression: "status === 'loading' && !stop"
            }],
            class: e.$style.info,
            attrs: {
              align: "center"
            }
          }, [o("woo-spinner", {
            class: [e.$style.a4s1, e.$style.a4s11],
            attrs: {
              filled: ""
            }
          }), o("span", [e._v("上传中")]), o("span", {
            class: e.$style.a4s2
          }, [e._v(e._s(e.sizeProgress))]), o("woo-box-item", {
            class: e.$style.a4opt,
            attrs: {
              align: "center"
            }
          }, ["vplus_video" === this.um_video[0] ? o("span", {
            class: [e.$style.info, e.$style.v_plus]
          }, [o("woo-fonticon", {
            class: e.$style.report,
            attrs: {
              value: "remind"
            }
          }), e._v(" 仅V+订阅用户可看 ")], 1) : e._e(), o("a", {
            attrs: {
              href: ""
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), t.preventDefault(), e.stopUpload.apply(null, arguments)
              }
            }
          }, [e._v("暂停")]), o("a", {
            attrs: {
              href: ""
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), t.preventDefault(), e.cancelUpload.apply(null, arguments)
              }
            }
          }, [e._v("删除")])])], 1), o("woo-box", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: "loading" === e.status && e.stop,
              expression: "status === 'loading' && stop"
            }],
            class: e.$style.info,
            attrs: {
              align: "center"
            }
          }, [o("woo-fonticon", {
            class: [e.$style.a4s1, e.$style.a4s12],
            attrs: {
              value: "play"
            }
          }), o("span", [e._v("暂停中")]), o("span", {
            class: e.$style.a4s2
          }, [e._v(e._s(e.sizeProgress))]), o("woo-box-item", {
            class: e.$style.a4opt,
            attrs: {
              align: "center"
            }
          }, ["vplus_video" === this.um_video[0] ? o("span", {
            class: [e.$style.info, e.$style.v_plus]
          }, [o("woo-fonticon", {
            class: [e.$style.report],
            attrs: {
              value: "remind"
            }
          }), e._v(" 仅V+订阅用户可看 ")], 1) : e._e(), o("a", {
            attrs: {
              href: ""
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), t.preventDefault(), e.reUpload.apply(null, arguments)
              }
            }
          }, [e._v("继续")]), o("a", {
            attrs: {
              href: ""
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), t.preventDefault(), e.cancelUpload.apply(null, arguments)
              }
            }
          }, [e._v("删除")])])], 1), o("woo-box", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: "success" === e.status,
              expression: "status === 'success'"
            }],
            class: e.$style.info,
            attrs: {
              align: "center"
            }
          }, [e.showLeft ? [o("woo-fonticon", {
            class: [e.$style.a4s1, e.$style.a4s13],
            attrs: {
              value: "check"
            }
          }), o("span", [e._v("上传完成")]), o("span", {
            class: e.$style.a4s2
          }, [e._v(e._s(e.sizeProgress))])] : e._e(), "edit" === e.entry || e.isAudioEdit ? o("woo-box-item", {
            attrs: {
              align: "center"
            }
          }, [o("a", {
            class: [e.payInfo && e.$style.pay],
            on: {
              click: function(t) {
                t.stopPropagation(), t.preventDefault(), !e.payInfo && e.replaceUpload()
              }
            }
          }, [e._v("替换")])]) : o("woo-box-item", {
            class: e.$style.a4opt,
            attrs: {
              align: "center"
            }
          }, ["vplus_video" === this.um_video[0] ? o("span", {
            class: [e.$style.info, e.$style.v_plus]
          }, [o("woo-fonticon", {
            class: [e.$style.report],
            attrs: {
              value: "remind"
            }
          }), e._v(" 仅V+订阅用户可看 ")], 1) : e._e(), o("a", {
            on: {
              click: function(t) {
                return t.stopPropagation(), t.preventDefault(), e.cancelUpload.apply(null, arguments)
              }
            }
          }, [e._v("删除")])])], 2)], 1), e._e(), e._e()], 1)
        },
        i = [],
        s = (o("5f85"), o("b337"), o("f40f"), o("5632"), o("83ef"), o("c111"), o("bd4b"), o("dac3"), o("7431"), o("16e9"), o("1d2e"), o("a1a5"), o("98ea"), o("c4da")),
        n = o("100f"),
        l = (o("8201"), o("c3d6")),
        d = o("6f14"),
        c = o("ba1d"),
        r = o("6c3f"),
        u = o("489c"),
        p = o("15ef"),
        _ = o.n(p),
        h = o("ae60"),
        v = o("8e18"),
        f = o("e323"),
        b = o("ed2c"),
        m = {
          components: {
            Picture: function() {
              return Promise.resolve().then(o.bind(null, "57f4"))
            },
            Action: u["default"]
          },
          setup: function() {
            var e = Object(v["a"])(),
              t = e.isVideo,
              o = e.isAudio,
              a = e.isEdit,
              i = e.entry,
              s = e.isAudioEdit,
              n = e.isAudioUpload,
              l = e.isAi;
            return {
              isVideo: t,
              isAudio: o,
              isAudioEdit: s,
              isAudioUpload: n,
              isEdit: a,
              entry: i,
              isAi: l
            }
          },
          props: {
            upload: {
              type: Boolean,
              default: !1
            },
            loading: {
              type: Boolean,
              default: !1
            },
            sucess: {
              type: Boolean,
              default: !1
            },
            screenshot: {
              type: String,
              default: ""
            },
            editInfo: {
              type: Object
            },
            type: {},
            biz_type: {
              type: String
            },
            audioCanPay: {
              type: Boolean
            },
            payInfo: {},
            cutUpload: Boolean,
            maxFileSize: {
              type: [Number, String],
              default: 16106127360
            }
          },
          data: function() {
            return {
              wbUploader: void 0,
              uploadProgress: 0,
              stop: !1,
              status: "upload",
              fileName: "",
              fileSize: "",
              screenArray: [],
              id: "video_button_upload_".concat(Date.now()),
              optAspectratio: "16:9",
              fileEnter: !1,
              repalceClicked: !1,
              um_video: [],
              cancelLock: !1,
              showLeft: !0
            }
          },
          watch: {
            cutUpload: function(e) {
              e && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1)
            },
            isAi: function(e) {
              e && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1)
            },
            um_video: function(e) {
              e.length > 1 && e.splice(0, 1), this.$emit("umVideo", e.length && e[0]), this.wbUploader.reset({
                default: {
                  type: this.handleType,
                  mediaprops: this.handleMediaProps
                }
              })
            },
            entry: function(e) {
              "edit" !== e && (this.status = "upload", this.uploadProgress = 0)
            },
            status: function(e) {
              "upload" === e ? "channel" === this.$route.name && window.removeEventListener("beforeunload", this.closeWindow) : "channel" === this.$route.name && window.addEventListener("beforeunload", this.closeWindow)
            }
          },
          computed: Object(d["a"])(Object(d["a"])({}, Object(c["c"])(["config"])), {}, {
            isCut: function() {
              return "cut" === this.$route.query.type
            },
            handleComment: function() {
              var e = this.isAudio ? "音频" : "视频";
              return {
                drag: "拖拽".concat(e, "到此处也可上传"),
                upload: "上传".concat(e)
              }
            },
            handleType: function() {
              var e, t;
              return "um_video" === (null === (e = this.um_video) || void 0 === e ? void 0 : e[0]) ? this.biz_type : this.isAudio ? "podcast_audio_pay" === (null === (t = this.um_video) || void 0 === t ? void 0 : t[0]) ? "podcast_audio_pay" : "podcast_audio" : "video"
            },
            handleAccept: function() {
              return this.isAudio ? ".AIFF,.AIF,.MP3,.WMA,.WAV,.FLAC,.OGG,.MP2,.AAC,.AMR,.M4A" : "video/mp4,video/x-m4v,video/*,.mkv,.flv"
            },
            handleMediaProps: function() {
              var e, t = {
                screenshot: 1
              };
              if (this.isEdit) t.proxy_video_type = "edit_video", t.video_type = "normal";
              else if (this.isAudioEdit) t.proxy_video_type = "edit_video", t.video_type = "podcast_audio", t.createtype = "localfile";
              else if (this.isAudio) {
                var o;
                t.video_type = "podcast_audio_pay" === (null === (o = this.um_video) || void 0 === o ? void 0 : o[0]) ? "podcast_audio_pay" : "podcast_audio", t.createtype = "localfile"
              } else(null === (e = this.um_video) || void 0 === e ? void 0 : e.length) && ("um_video" === this.um_video[0] ? t.video_type = this.biz_type : t.video_type = "pay_limit");
              return t
            },
            progressBar: function() {
              return this.repalceClicked ? {
                transform: "scaleX(1)"
              } : {
                transform: "scaleX(".concat(this.uploadProgress / 100, ")")
              }
            },
            sizeProgress: function() {
              return this.repalceClicked ? "" : "".concat((this.fileSize / 1024 / 1024 * this.uploadProgress / 100).toFixed(2), "MB/\n        ").concat((this.fileSize / 1024 / 1024).toFixed(2), "MB")
            }
          }),
          methods: {
            closeWindow: function(e) {
              return e.preventDefault(), e && (e.returnValue = "关闭该窗口将导致视频发布失败，确认关闭吗？"), "关闭该窗口将导致视频发布失败，确认关闭吗？"
            },
            stopUpload: function() {
              this.wbUploader.stop()
            },
            deleteUpload: function() {
              this.wbUploader.uploadLog("cancel")
            },
            logUpload: function() {
              this.wbUploader.updateLog({
                process_status: "edit",
                extra: "publish"
              }), this.wbUploader.uploadLog()
            },
            replaceUpload: function() {
              this.repalceClicked = !0, this.showFiles(), this.$emit("video-change", "replace")
            },
            updateMd5: function(e) {
              this.wbUploader.updateMd5(e, !0)
            },
            showFiles: function() {
              this.$refs.video_button_upload.$el.click()
            },
            listenOffline: function() {
              navigator.onLine || !1 !== this.stop || (this.stop = !0)
            },
            cancelUpload: function() {
              var e = this;
              this.$_w_dialog({
                type: "confirm",
                title: "确认删除？",
                message: "删除之后将不可恢复",
                btnConfirm: "删除",
                action: function() {
                  e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel")
                }
              })
            },
            cancelMethods: function() {
              this.status = "upload", this.uploadProgress = 0, this.screenArray = [], this.$emit("video-change", "init"), this.$emit("video-change", "screenshot", [])
            },
            reUpload: function() {
              var e = this;
              return Object(l["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                  while (1) switch (t.prev = t.next) {
                    case 0:
                      e.stop = !1, e.wbUploader.reUpload();
                    case 2:
                    case "end":
                      return t.stop()
                  }
                }), t)
              })))()
            },
            uploadInit: function(e, t) {
              var o = this;
              return Object(l["a"])(regeneratorRuntime.mark((function a() {
                return regeneratorRuntime.wrap((function(a) {
                  while (1) switch (a.prev = a.next) {
                    case 0:
                      o.wbUploader.addFiles(e, t);
                    case 1:
                    case "end":
                      return a.stop()
                  }
                }), a)
              })))()
            },
            initUploader: function() {
              var e = this;
              this.wbUploader = new _.a({
                default: {
                  source: 339644097,
                  max_size: this.isAudio ? 1073741824 : this.maxFileSize,
                  dispatchUrl: "".concat(location.origin, "/ajax/multimedia/dispatch"),
                  batchScreenshotUrl: "".concat(location.origin, "/ajax/multimedia/output"),
                  batchDetailUrl: "".concat(location.origin, "/ajax/multimedia/batch"),
                  autoLog: !1,
                  type: this.handleType,
                  mediaprops: this.handleMediaProps
                },
                inputEle: {
                  target: "#".concat(this.id),
                  accept: this.handleAccept,
                  area: "#area_".concat(this.id)
                },
                dispatchParams: {
                  auth_accept: "video"
                }
              }), this.wbUploader.on("beforeInit", (function(t) {
                e.optAspectratio = "16:9", e.$emit("video-change", "init"), e.$emit("video-change", "screenshot", []), e.uploadProgress = 0, e.screenArray = [], e.wbUploader.init()
              })), this.wbUploader.on("beforeUpload", (function(t) {
                var o;
                e.status = "loading", e.stop = !1, e.$emit("video-change", "show");
                var a = t.name.match(/(.*)\.(.*)/),
                  i = Object(n["a"])(a, 3),
                  s = i[1],
                  l = i[2],
                  d = Object(r["d"])(s, 7);
                e.fileName = d === s ? t.name : d + "…." + l, e.fileSize = t.size, e.wbUploader.upload(), e.wbUploader.updateMd5(null === t || void 0 === t || null === (o = t.initRes) || void 0 === o ? void 0 : o.media_id)
              })), this.wbUploader.on("screenshot", (function(t) {
                var o;
                if (t.screenshot && e.$emit("video-change", "screenshot", t.screenshot), t.detail) {
                  var a;
                  if (t.detail.duration) e.isAudio && t.detail.duration < 10 && (e.cancelLock = !0, e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel"), e.$_w_dialog({
                    message: "请上传10秒以上的音频",
                    btnConfirm: "我知道了",
                    action: function() {
                      e.cancelLock = !1
                    }
                  })), "podcast_audio_pay" === (null === (a = e.um_video) || void 0 === a ? void 0 : a[0]) && e.isAudio && t.detail.duration < 60 && (e.cancelLock = !0, e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel"), e.$_w_dialog({
                    message: "付费音频需1分钟以上",
                    btnConfirm: "我知道了",
                    action: function() {
                      e.cancelLock = !1
                    }
                  })), e.um_video.length && "vplus_video" === e.um_video[0] && (t.detail.duration < 60 || t.detail.isPanorama) && (e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), t.detail.isPanorama && (e.um_video = []), e.$emit("video-change", "cancel"), e.$_w_dialog({
                    message: t.detail.isPanorama ? "V+不支持全景视频" : "视频时长小于一分钟，请重新选择文件",
                    btnConfirm: "我知道了"
                  }));
                  e.$emit("video-change", "detail", t.detail)
                }
                t.detail && t.detail.width && (e.optAspectratio = t.detail.width > t.detail.height ? "16:9" : "1.333"), t.screenshot && (o = e.screenArray).splice.apply(o, [0, e.screenArray.length].concat(Object(s["a"])(t.screenshot)))
              })), this.wbUploader.on("uploadStatus", (function(t) {
                e.uploadProgress = t.progress
              })), this.wbUploader.on("start", (function() {
                e.$emit("video-change", "start"), e.repalceClicked = !1, e.status = "loading", e.showLeft = !0
              })), this.wbUploader.on("success", (function(t) {
                var o = t.file,
                  a = o.initRes;
                a.media_id;
                try {
                  (null === a || void 0 === a ? void 0 : a.media_id) && (Object(f["a"])({
                    key: "uploadsuccess",
                    content: a.media_id
                  }), b["a"].start())
                } catch (i) {}
                e.stop = !0, e.status = "success", e.uploadProgress = 100, e.$emit("video-change", "success", o.initRes)
              })), this.wbUploader.on("error", function() {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(o, a) {
                  var i, s, n, l, d;
                  return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                      case 0:
                        if (!e.cancelLock) {
                          t.next = 2;
                          break
                        }
                        return t.abrupt("return");
                      case 2:
                        if (e.stop = !0, !o.includes("code:20385")) {
                          t.next = 16;
                          break
                        }
                        return t.next = 6, Object(h["b"])();
                      case 6:
                        if (i = t.sent, s = i || {}, n = s.status, l = s.data, "success" === n) {
                          t.next = 12;
                          break
                        }
                        return e.$_w_toast({
                          type: null,
                          message: "验证失败"
                        }), setTimeout((function() {
                          e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel")
                        }), 2e3), t.abrupt("return", o);
                      case 12:
                        try {
                          e.stop = !1, d = null === a || void 0 === a ? void 0 : a.sessionid, l.session_id = d, e.$http.post("/ajax/multimedia/initVerify", l).then((function() {
                            e.wbUploader.init({}, d)
                          }))
                        } catch (c) {}
                        return t.abrupt("return");
                      case 16:
                        -1 !== o.indexOf("init") ? (e.$_w_toast({
                          type: "warn",
                          message: o,
                          hideDuration: 2e3
                        }), setTimeout((function() {
                          e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel")
                        }), 2e3)) : o.includes("to large") && (e.$_w_toast({
                          type: "warn",
                          message: "文件大小不能超过".concat(Number.parseInt(e.maxFileSize / 1024 / 1024 / 1024), "GB"),
                          hideDuration: 2e3
                        }), e.cancelMethods(), e.wbUploader.cancel && e.wbUploader.cancel(), e.$emit("video-change", "cancel"));
                      case 17:
                      case "end":
                        return t.stop()
                    }
                  }), t)
                })));
                return function(e, o) {
                  return t.apply(this, arguments)
                }
              }()), this.wbUploader.on("errorMsg", (function(t) {
                e.status = "upload", e.$emit("video-change", "cancel"), e.$_w_toast({
                  type: "warn",
                  message: t
                })
              })), this.wbUploader.on("dragenter", (function(t) {
                e.fileEnter = !0
              })), this.wbUploader.on("dragleave", (function(t) {
                e.fileEnter = !1
              })), this.wbUploader.on("drop", (function(t) {
                e.fileEnter = !1
              })), this.wbUploader.on("click", (function(t) {
                var o;
                e.isAudio && e.actionLog({
                  uicode: "30000840",
                  actType: "7636",
                  ext: "is_authorized:".concat(null === (o = e.config.flags) || void 0 === o ? void 0 : o.audio_auth)
                })
              }))
            }
          },
          mounted: function() {
            var e = this;
            !this.isCut && (this.isEdit || this.isAudioEdit || this.isAudioUpload) && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1), setTimeout((function() {
              e.initUploader()
            }), 1e3)
          },
          beforeDestroy: function() {
            this.wbUploader = "", window.removeEventListener("offline", this.listenOffline), "channel" === this.$route.name && window.removeEventListener("beforeunload", this.closeWindow)
          }
        },
        w = m,
        y = o("6b87"),
        g = o("04a2");

      function U(e) {
        this["$style"] = y["default"].locals || y["default"]
      }
      var x = Object(g["a"])(w, a, i, !1, U, null, null);
      t["default"] = x.exports
    }
  }
]);
