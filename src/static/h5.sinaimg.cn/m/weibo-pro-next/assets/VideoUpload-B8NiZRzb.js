var E = Object.defineProperty,
  B = Object.defineProperties;
var I = Object.getOwnPropertyDescriptors;
var L = Object.getOwnPropertySymbols;
var F = Object.prototype.hasOwnProperty,
  D = Object.prototype.propertyIsEnumerable;
var S = (e, s, t) => s in e ? E(e, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : e[s] = t,
  z = (e, s) => {
    for (var t in s || (s = {})) F.call(s, t) && S(e, t, s[t]);
    if (L)
      for (var t of L(s)) D.call(s, t) && S(e, t, s[t]);
    return e
  },
  M = (e, s) => B(e, I(s));
var P = (e, s, t) => new Promise((u, o) => {
  var i = h => {
      try {
        w(t.next(h))
      } catch (p) {
        o(p)
      }
    },
    f = h => {
      try {
        w(t.throw(h))
      } catch (p) {
        o(p)
      }
    },
    w = h => h.done ? u(h.value) : Promise.resolve(h.value).then(i, f);
  w((t = t.apply(e, s)).next())
});
import {
  _ as T,
  J as j,
  ay as N,
  l as y,
  m,
  i as c,
  O as U,
  D as _,
  P as k,
  p as d,
  B as l,
  C as r,
  n as a,
  E as v,
  U as g,
  G as V,
  h as A,
  I as W,
  T as b,
  az as G,
  aA as O,
  aj as R,
  ak as X,
  aB as q,
  ac as H
} from "./index-D53O_Npi.js";
const J = "_box1_109u9_4",
  Y = "_btn1_109u9_8",
  K = "_box2_109u9_12",
  Q = "_box21_109u9_16",
  Z = "_box2t_109u9_20",
  ee = "_box2t1_109u9_28",
  se = "_box2t2_109u9_33",
  te = "_box2b_109u9_58",
  ie = "_cutout_109u9_64",
  oe = "_cut_109u9_64",
  ae = "_fontable_109u9_73",
  le = "_abox2_109u9_77",
  ne = "_tit2_109u9_81",
  de = "_abox2audio_109u9_86",
  re = "_abox3_109u9_94",
  ue = "_gap2_109u9_98",
  ce = "_icon2_109u9_102",
  pe = "_abox4_109u9_112",
  he = "_bar_109u9_38",
  _e = "_pro_109u9_49",
  fe = "_info_109u9_135",
  me = "_v_plus_109u9_139",
  be = "_a4s1_109u9_158",
  ye = "_a4s11_109u9_164",
  ve = "_a4s12_109u9_168",
  ge = "_a4s13_109u9_172",
  we = "_a4s14_109u9_177",
  Ue = "_a4s2_109u9_181",
  ke = "_um_video_109u9_186",
  Ae = "_um_video_1_109u9_190",
  $e = "_report_109u9_194",
  Pe = "_pay_109u9_198",
  Ve = {
    box1: J,
    btn1: Y,
    box2: K,
    box21: Q,
    box2t: Z,
    box2t1: ee,
    box2t2: se,
    box2b: te,
    cutout: ie,
    cut: oe,
    fontable: ae,
    abox2: le,
    tit2: ne,
    abox2audio: de,
    abox3: re,
    gap2: ue,
    icon2: ce,
    abox4: pe,
    bar: he,
    pro: _e,
    info: fe,
    v_plus: me,
    a4s1: be,
    a4s11: ye,
    a4s12: ve,
    a4s13: ge,
    a4s14: we,
    a4s2: Ue,
    um_video: ke,
    um_video_1: Ae,
    report: $e,
    pay: Pe
  },
  Ce = {
    components: {
      Action: N
    },
    emits: ["edit", "video-change", "umVideo", "upload-srt"],
    setup() {
      const {
        isVideo: e,
        isAudio: s,
        isEdit: t,
        entry: u,
        isAudioEdit: o,
        isAudioUpload: i,
        isAi: f
      } = H();
      return {
        isVideo: e,
        isAudio: s,
        isAudioEdit: o,
        isAudioUpload: i,
        isEdit: t,
        entry: u,
        isAi: f
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
        default: 15 * 1024 * 1024 * 1024
      },
      isPrePublish: Boolean,
      hasSrt: Boolean
    },
    data() {
      return {
        wbUploader: void 0,
        uploadProgress: 0,
        stop: !1,
        status: "upload",
        fileName: "",
        fileSize: "",
        screenArray: [],
        id: `video_button_upload_${Date.now()}`,
        optAspectratio: "16:9",
        fileEnter: !1,
        repalceClicked: !1,
        um_video: [],
        cancelLock: !1,
        showLeft: !0
      }
    },
    watch: {
      isPrePublish(e) {
        e && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1)
      },
      cutUpload(e) {
        e && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1)
      },
      isAi(e) {
        e && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1)
      },
      um_video(e) {
        e.length > 1 && e.splice(0, 1), this.$emit("umVideo", e.length && e[0]), this.wbUploader.reset({
          default: {
            type: this.handleType,
            mediaprops: this.handleMediaProps
          }
        })
      },
      entry(e) {
        e !== "edit" && (this.status = "upload", this.uploadProgress = 0)
      },
      status(e) {
        e === "upload" ? this.$route.name === "channel" && window.removeEventListener("beforeunload", this.closeWindow) : this.$route.name === "channel" && window.addEventListener("beforeunload", this.closeWindow)
      }
    },
    computed: M(z({}, j(["config"])), {
      showSrtEntrance() {
        var e, s;
        return (s = (e = this.config) == null ? void 0 : e.flags) == null ? void 0 : s.showSrtEntrance
      },
      isVPlus() {
        var e, s;
        return (s = (e = this.config) == null ? void 0 : e.user) == null ? void 0 : s.v_plus
      },
      isCut() {
        return this.$route.query.type === "cut"
      },
      handleComment() {
        const e = this.isAudio ? "音频" : "视频";
        return {
          drag: `拖拽${e}到此处也可上传`,
          upload: `上传${e}`
        }
      },
      handleType() {
        var e, s;
        return ((e = this.um_video) == null ? void 0 : e[0]) === "um_video" ? this.biz_type : this.isAudio ? ((s = this.um_video) == null ? void 0 : s[0]) === "podcast_audio_pay" ? "podcast_audio_pay" : "podcast_audio" : "video"
      },
      handleAccept() {
        return this.isAudio ? ".AIFF,.AIF,.MP3,.WMA,.WAV,.FLAC,.OGG,.MP2,.AAC,.AMR,.M4A" : "video/mp4,video/x-m4v,video/*,.mkv,.flv"
      },
      handleMediaProps() {
        var s, t;
        const e = {
          screenshot: 1
        };
        return this.isEdit ? (e.proxy_video_type = "edit_video", e.video_type = "normal") : this.isAudioEdit ? (e.proxy_video_type = "edit_video", e.video_type = "podcast_audio", e.createtype = "localfile") : this.isAudio ? (e.video_type = ((s = this.um_video) == null ? void 0 : s[0]) === "podcast_audio_pay" ? "podcast_audio_pay" : "podcast_audio", e.createtype = "localfile") : (t = this.um_video) != null && t.length && (this.um_video[0] === "um_video" ? e.video_type = this.biz_type : e.video_type = "pay_limit"), e
      },
      progressBar() {
        return this.repalceClicked ? {
          transform: "scaleX(1)"
        } : {
          transform: `scaleX(${this.uploadProgress/100})`
        }
      },
      sizeProgress() {
        return this.repalceClicked ? "" : `${(this.fileSize/1024/1024*this.uploadProgress/100).toFixed(2)}MB/
        ${(this.fileSize/1024/1024).toFixed(2)}MB`
      }
    }),
    methods: {
      handleUploadSrt() {
        this.$emit("upload-srt")
      },
      closeWindow(e) {
        return e.preventDefault(), e && (e.returnValue = "关闭该窗口将导致视频发布失败，确认关闭吗？"), "关闭该窗口将导致视频发布失败，确认关闭吗？"
      },
      stopUpload() {
        this.wbUploader.stop()
      },
      deleteUpload() {
        this.wbUploader.uploadLog("cancel")
      },
      logUpload() {
        this.wbUploader.updateLog({
          process_status: "edit",
          extra: "publish"
        }), this.wbUploader.uploadLog()
      },
      replaceUpload() {
        this.repalceClicked = !0, this.showFiles(), this.$emit("video-change", "replace")
      },
      updateMd5(e) {
        this.wbUploader.updateMd5(e, !0)
      },
      showFiles() {
        this.$refs.video_button_upload.$el.click()
      },
      listenOffline() {
        !navigator.onLine && this.stop === !1 && (this.stop = !0)
      },
      cancelUpload() {
        this.$_w_dialog({
          type: "confirm",
          title: "确认删除？",
          message: "删除之后将不可恢复",
          btnConfirm: "删除",
          action: () => {
            this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel")
          }
        })
      },
      cancelMethods() {
        this.resetVideoInfo(), this.status = "upload", this.uploadProgress = 0, this.screenArray = [], this.$emit("video-change", "init"), this.$emit("video-change", "screenshot", [])
      },
      resetVideoInfo() {
        this.wbUploader && (this.wbUploader.videoInfo = null)
      },
      reUpload() {
        return P(this, null, function*() {
          this.stop = !1, this.wbUploader.reUpload()
        })
      },
      uploadInit(e, s) {
        return P(this, null, function*() {
          this.wbUploader.addFiles(e, s)
        })
      },
      initUploader() {
        this.wbUploader = new G({
          default: {
            source: 339644097,
            max_size: this.isAudio ? 1024 * 1024 * 1024 : this.maxFileSize,
            dispatchUrl: `${location.origin}/ajax/multimedia/dispatch`,
            batchScreenshotUrl: `${location.origin}/ajax/multimedia/output`,
            batchDetailUrl: `${location.origin}/ajax/multimedia/batch`,
            autoLog: !1,
            type: this.handleType,
            mediaprops: this.handleMediaProps
          },
          inputEle: {
            target: `#${this.id}`,
            accept: this.handleAccept,
            area: `#area_${this.id}`
          },
          dispatchParams: {
            auth_accept: "video"
          }
        }), this.wbUploader.on("beforeInit", () => {
          this.resetVideoInfo(), this.optAspectratio = "16:9", this.$emit("video-change", "init"), this.$emit("video-change", "screenshot", []), this.uploadProgress = 0, this.screenArray = [], this.wbUploader.init()
        }), this.wbUploader.on("beforeUpload", e => {
          var o;
          this.status = "loading", this.stop = !1, this.$emit("video-change", "show"), this.$emit("video-change", "file", e);
          const [, s, t] = e.name.match(/(.*)\.(.*)/), u = O(s, 7);
          this.fileName = u === s ? e.name : `${u}….${t}`, this.fileSize = e.size, this.wbUploader.upload(), this.wbUploader.updateMd5((o = e == null ? void 0 : e.initRes) == null ? void 0 : o.media_id)
        }), this.wbUploader.on("screenshot", e => {
          var s;
          e.screenshot && this.$emit("video-change", "screenshot", e.screenshot), e.detail && (e.detail.duration && (this.isAudio && e.detail.duration < 10 && (this.cancelLock = !0, this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel"), this.$_w_dialog({
            message: "请上传10秒以上的音频",
            btnConfirm: "我知道了",
            action: () => {
              this.cancelLock = !1
            }
          })), ((s = this.um_video) == null ? void 0 : s[0]) === "podcast_audio_pay" && this.isAudio && e.detail.duration < 60 && (this.cancelLock = !0, this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel"), this.$_w_dialog({
            message: "付费音频需1分钟以上",
            btnConfirm: "我知道了",
            action: () => {
              this.cancelLock = !1
            }
          })), this.um_video.length && this.um_video[0] === "vplus_video" && (e.detail.duration < 60 || e.detail.isPanorama) && (this.cancelLock = !0, this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), e.detail.isPanorama && (this.um_video = []), this.$emit("video-change", "cancel"), this.$_w_dialog({
            message: e.detail.isPanorama ? "V+不支持全景视频" : "视频时长小于一分钟，请重新选择文件",
            btnConfirm: "我知道了",
            action: () => {
              this.cancelLock = !1
            }
          }))), this.$emit("video-change", "detail", e.detail)), e.detail && e.detail.width && (this.optAspectratio = e.detail.width > e.detail.height ? "16:9" : "1.333"), e.screenshot && this.screenArray.splice(0, this.screenArray.length, ...e.screenshot)
        }), this.wbUploader.on("uploadStatus", e => {
          this.uploadProgress = e.progress
        }), this.wbUploader.on("start", () => {
          this.$emit("video-change", "start"), this.repalceClicked = !1, this.status = "loading", this.showLeft = !0
        }), this.wbUploader.on("success", ({
          file: e
        }) => {
          const s = e.initRes;
          try {
            s != null && s.media_id && (R({
              key: "uploadsuccess",
              content: s.media_id
            }), X.start())
          } catch (t) {}
          this.stop = !0, this.status = "success", this.uploadProgress = 100, this.$emit("video-change", "success", e.initRes)
        }), this.wbUploader.on("error", (e, s) => P(this, null, function*() {
          if (!this.cancelLock)
            if (this.stop = !0, e.includes("code:20385")) {
              const t = yield q(), {
                status: u,
                data: o
              } = t || {};
              if (u !== "success") return this.$_w_toast({
                type: null,
                message: "验证失败"
              }), setTimeout(() => {
                this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel")
              }, 2e3), e;
              try {
                this.stop = !1;
                const i = s.sessionid;
                o.session_id = i, this.$http.post("/ajax/multimedia/initVerify", o).then(() => {
                  this.wbUploader.init({}, i)
                })
              } catch (i) {
                console.warn(i, "json parse error")
              }
            } else e.includes("init") ? (this.$_w_toast({
              type: "warn",
              message: e,
              hideDuration: 2e3
            }), setTimeout(() => {
              this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel")
            }, 2e3)) : e.includes("to large") && (this.$_w_toast({
              type: "warn",
              message: `文件大小不能超过${Number.parseInt(this.maxFileSize/1024/1024/1024)}GB`,
              hideDuration: 2e3
            }), this.cancelMethods(), this.wbUploader.cancel && this.wbUploader.cancel(), this.$emit("video-change", "cancel"))
        })), this.wbUploader.on("errorMsg", e => {
          this.status = "upload", this.$emit("video-change", "cancel"), this.$_w_toast({
            type: "warn",
            message: e
          })
        }), this.wbUploader.on("dragenter", () => {
          this.fileEnter = !0
        }), this.wbUploader.on("dragleave", () => {
          this.fileEnter = !1
        }), this.wbUploader.on("drop", () => {
          this.fileEnter = !1
        }), this.wbUploader.on("click", () => {
          var e;
          this.isAudio && this.actionLog({
            uicode: "30000840",
            actType: "7636",
            ext: `is_authorized:${(e=this.config.flags)==null?void 0:e.audio_auth}`
          })
        })
      }
    },
    mounted() {
      !this.isCut && (this.isEdit || this.isAudioEdit || this.isAudioUpload || this.isPrePublish) && (this.status = "success", this.uploadProgress = 100, this.showLeft = !1), setTimeout(() => {
        this.initUploader()
      }, 1e3)
    },
    beforeUnmount() {
      this.wbUploader = "", window.removeEventListener("offline", this.listenOffline), this.$route.name === "channel" && window.removeEventListener("beforeunload", this.closeWindow)
    }
  },
  Le = ["id"];

function Se(e, s, t, u, o, i) {
  const f = y("woo-fonticon"),
    w = y("woo-button"),
    h = y("woo-checkbox"),
    p = y("woo-box"),
    C = y("Action"),
    x = y("woo-spinner"),
    $ = y("woo-box-item");
  return c(), m("div", {
    onClick: s[11] || (s[11] = b(() => {}, ["stop"]))
  }, [U(d("div", {
    id: `area_${o.id}`
  }, [l(p, {
    direction: "y",
    align: "center",
    justify: "center",
    class: a([e.$style.abox2, u.isAudio && e.$style.abox2audio, e.$style.gap2, o.fileEnter && e.$style.abox3])
  }, {
    default: r(() => [l(f, {
      value: "upload",
      class: a(e.$style.icon2)
    }, null, 8, ["class"]), d("div", {
      class: a(e.$style.tit2)
    }, v(i.handleComment.drag), 3), l(p, {
      align: "center",
      direction: "y"
    }, {
      default: r(() => [l(w, {
        id: o.id,
        ref: "video_button_upload",
        sort: "flat",
        kind: "primary",
        class: a(e.$style.btn1)
      }, {
        default: r(() => [g(v(i.handleComment.upload), 1)]),
        _: 1
      }, 8, ["id", "class"]), l(p, {
        direction: "y",
        align: "start"
      }, {
        default: r(() => [u.isVideo ? (c(), m(V, {
          key: 0
        }, [t.biz_type ? (c(), A(p, {
          key: 0,
          align: "center",
          class: a(e.$style.um_video)
        }, {
          default: r(() => [l(h, {
            modelValue: o.um_video,
            "onUpdate:modelValue": s[0] || (s[0] = n => o.um_video = n),
            value: "um_video"
          }, {
            default: r(() => s[12] || (s[12] = [g(" 设置为联合会员专属视频 ")])),
            _: 1
          }, 8, ["modelValue"])]),
          _: 1
        }, 8, ["class"])) : _("", !0), i.isVPlus ? (c(), A(p, {
          key: 1,
          align: "center",
          class: a(e.$style[t.biz_type ? "um_video_1" : "um_video"])
        }, {
          default: r(() => [l(h, {
            modelValue: o.um_video,
            "onUpdate:modelValue": s[1] || (s[1] = n => o.um_video = n),
            value: "vplus_video"
          }, {
            default: r(() => s[13] || (s[13] = [g(" 设置为V+专属视频 ")])),
            _: 1
          }, 8, ["modelValue"]), l(C, {
            size: 14,
            title: "V+专属视频",
            desc: "1.设置后，非V+用户可试看30秒，订阅后可观看完整视频<br/>2.仅支持1分钟以上的视频进行此设置"
          })]),
          _: 1
        }, 8, ["class"])) : _("", !0)], 64)) : u.isAudio ? (c(), m(V, {
          key: 1
        }, [t.audioCanPay ? (c(), A(p, {
          key: 0,
          align: "center",
          class: a(e.$style[t.biz_type, "um_video_1"])
        }, {
          default: r(() => [l(h, {
            modelValue: o.um_video,
            "onUpdate:modelValue": s[2] || (s[2] = n => o.um_video = n),
            value: "podcast_audio_pay"
          }, {
            default: r(() => s[14] || (s[14] = [g(" 设置为付费音频 ")])),
            _: 1
          }, 8, ["modelValue"]), l(C, {
            size: 14,
            title: "付费音频",
            desc: "勾选后，用户需付费才能收听完整音频<br/>1、仅支持1分钟以上音频进行此设置<br/>2、本次选择仅对当前微博生效，不影响其他微博"
          })]),
          _: 1
        }, 8, ["class"])) : _("", !0)], 64)) : _("", !0)]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])], 8, Le), [
    [k, o.status === "upload"]
  ]), U(d("div", {
    class: a([e.$style.abox4, e.$style.gap2])
  }, [d("div", {
    class: a(e.$style.bar)
  }, [d("div", {
    class: a(e.$style.pro),
    style: W(i.progressBar)
  }, null, 6)], 2), U(l(p, {
    align: "center",
    class: a(e.$style.info)
  }, {
    default: r(() => [l(x, {
      filled: "",
      class: a([e.$style.a4s1, e.$style.a4s11])
    }, null, 8, ["class"]), s[16] || (s[16] = d("span", null, "上传中", -1)), d("span", {
      class: a(e.$style.a4s2)
    }, v(i.sizeProgress), 3), l($, {
      align: "center",
      class: a(e.$style.a4opt)
    }, {
      default: r(() => [o.um_video[0] === "vplus_video" ? (c(), m("span", {
        key: 0,
        class: a([e.$style.info, e.$style.v_plus])
      }, [l(f, {
        value: "remind",
        class: a(e.$style.report)
      }, null, 8, ["class"]), s[15] || (s[15] = g(" 仅V+订阅用户可看 "))], 2)) : _("", !0), d("a", {
        href: "",
        onClick: s[3] || (s[3] = b((...n) => i.stopUpload && i.stopUpload(...n), ["stop", "prevent"]))
      }, "暂停"), d("a", {
        href: "",
        onClick: s[4] || (s[4] = b((...n) => i.cancelUpload && i.cancelUpload(...n), ["stop", "prevent"]))
      }, "删除")]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), [
    [k, o.status === "loading" && !o.stop]
  ]), U(l(p, {
    align: "center",
    class: a(e.$style.info)
  }, {
    default: r(() => [l(f, {
      value: "play",
      class: a([e.$style.a4s1, e.$style.a4s12])
    }, null, 8, ["class"]), s[18] || (s[18] = d("span", null, "暂停中", -1)), d("span", {
      class: a(e.$style.a4s2)
    }, v(i.sizeProgress), 3), l($, {
      align: "center",
      class: a(e.$style.a4opt)
    }, {
      default: r(() => [o.um_video[0] === "vplus_video" ? (c(), m("span", {
        key: 0,
        class: a([e.$style.info, e.$style.v_plus])
      }, [l(f, {
        value: "remind",
        class: a([e.$style.report])
      }, null, 8, ["class"]), s[17] || (s[17] = g(" 仅V+订阅用户可看 "))], 2)) : _("", !0), d("a", {
        href: "",
        onClick: s[5] || (s[5] = b((...n) => i.reUpload && i.reUpload(...n), ["stop", "prevent"]))
      }, "继续"), d("a", {
        href: "",
        onClick: s[6] || (s[6] = b((...n) => i.cancelUpload && i.cancelUpload(...n), ["stop", "prevent"]))
      }, "删除")]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), [
    [k, o.status === "loading" && o.stop]
  ]), U(l(p, {
    align: "center",
    class: a(e.$style.info)
  }, {
    default: r(() => [o.showLeft ? (c(), m(V, {
      key: 0
    }, [l(f, {
      value: "check",
      class: a([e.$style.a4s1, e.$style.a4s13])
    }, null, 8, ["class"]), s[19] || (s[19] = d("span", null, "上传完成", -1)), d("span", {
      class: a(e.$style.a4s2)
    }, v(i.sizeProgress), 3)], 64)) : _("", !0), u.entry === "edit" || u.isAudioEdit ? (c(), A($, {
      key: 1,
      align: "center"
    }, {
      default: r(() => [i.showSrtEntrance ? (c(), m("a", {
        key: 0,
        onClick: s[7] || (s[7] = b((...n) => i.handleUploadSrt && i.handleUploadSrt(...n), ["stop", "prevent"]))
      }, v(t.hasSrt ? "管理字幕" : "上传字幕"), 1)) : _("", !0), d("a", {
        class: a([t.payInfo && e.$style.pay]),
        onClick: s[8] || (s[8] = b(n => !t.payInfo && i.replaceUpload(), ["stop", "prevent"]))
      }, "替换", 2)]),
      _: 1
    })) : (c(), A($, {
      key: 2,
      align: "center",
      class: a(e.$style.a4opt)
    }, {
      default: r(() => [o.um_video[0] === "vplus_video" ? (c(), m("span", {
        key: 0,
        class: a([e.$style.info, e.$style.v_plus])
      }, [l(f, {
        value: "remind",
        class: a([e.$style.report])
      }, null, 8, ["class"]), s[20] || (s[20] = g(" 仅V+订阅用户可看 "))], 2)) : _("", !0), i.showSrtEntrance ? (c(), m("a", {
        key: 1,
        onClick: s[9] || (s[9] = b((...n) => i.handleUploadSrt && i.handleUploadSrt(...n), ["stop", "prevent"]))
      }, v(t.hasSrt ? "管理字幕" : "上传字幕"), 1)) : _("", !0), d("a", {
        onClick: s[10] || (s[10] = b((...n) => i.cancelUpload && i.cancelUpload(...n), ["stop", "prevent"]))
      }, "删除")]),
      _: 1
    }, 8, ["class"]))]),
    _: 1
  }, 8, ["class"]), [
    [k, o.status === "success"]
  ])], 2), [
    [k, o.status !== "upload"]
  ]), _("", !0)])
}
const ze = {
    $style: Ve
  },
  Ee = T(Ce, [
    ["render", Se],
    ["__cssModules", ze]
  ]);
export {
  Ee as
  default
};
