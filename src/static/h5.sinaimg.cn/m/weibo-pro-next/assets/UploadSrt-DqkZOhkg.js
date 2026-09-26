import {
  _ as b,
  l as u,
  h as k,
  D as g,
  i as d,
  C as n,
  p as a,
  n as l,
  B as r,
  m as h,
  E as C,
  T as p,
  G as f,
  U as y,
  y as I,
  u as F
} from "./index-Xve1TSN5.js";
const U = "_box_6c08l_2",
  O = "_header_6c08l_7",
  T = "_tip_6c08l_11",
  $ = "_content_6c08l_17",
  N = "_upload_6c08l_20",
  B = "_isDragOver_6c08l_29",
  M = "_icon_6c08l_47",
  S = "_text_6c08l_55",
  R = "_loadingIcon_6c08l_66",
  V = "_errorIcon_6c08l_75",
  j = "_buttons_6c08l_85",
  L = "_pointer_6c08l_91",
  E = "_list_6c08l_94",
  x = "_listitem_6c08l_97",
  z = "_filename_6c08l_101",
  G = "_operate_6c08l_123",
  W = {
    box: U,
    header: O,
    tip: T,
    content: $,
    upload: N,
    isDragOver: B,
    icon: M,
    text: S,
    loadingIcon: R,
    errorIcon: V,
    buttons: j,
    pointer: L,
    list: E,
    listitem: x,
    filename: z,
    operate: G,
    delete: "_delete_6c08l_126"
  },
  q = {
    setup() {
      const e = I(),
        s = F();
      return {
        toast: e,
        dialog: s
      }
    },
    props: {
      visible: Boolean,
      srtFile: {
        type: Object,
        default: null
      },
      srtTitle: {
        type: String
      },
      mediaId: {
        type: String,
        default: ""
      }
    },
    emits: ["update:visible", "close", "delete", "confirm"],
    data() {
      return {
        status: "ready",
        fileName: "",
        file: null,
        isDragOver: !1,
        uploadResult: null,
        isUnsaved: !1,
        isUploading: !1
      }
    },
    watch: {
      visible(e) {
        e && (this.srtFile ? (this.status = "success", this.file = this.srtFile, this.fileName = this.srtFile.name) : this.srtTitle ? (this.status = "success", this.fileName = this.srtTitle) : this.reset())
      }
    },
    methods: {
      closeModal() {
        this.$emit("update:visible", !1), this.$emit("close"), this.reset()
      },
      reset() {
        this.status = "ready", this.fileName = "", this.file = null, this.uploadResult = null, this.isUnsaved = !1, this.isUploading = !1
      },
      handleDelete() {
        this.$_w_dialog({
          type: "confirm",
          title: "确定要删除该字幕文件吗？",
          action: () => {
            if (this.isUnsaved) {
              this.$emit("delete"), this.reset();
              return
            }
            if (!this.mediaId) {
              this.$emit("delete"), this.reset();
              return
            }
            const e = new FormData;
            e.append("media_id", this.mediaId), this.$http.post("/ajax/multimedia/deleteVideoSubTitle", e, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then(({
              data: s
            }) => {
              s && s.ok === 1 ? (this.$emit("delete"), this.reset()) : this.toast && this.toast.show({
                type: "error",
                message: s.msg || "删除失败，请重试"
              })
            }).catch(() => {
              this.toast && this.toast.show({
                type: "error",
                message: "删除失败，请重试"
              })
            })
          }
        })
      },
      reupload() {
        this.$refs.fileInput && this.$refs.fileInput.click()
      },
      handleDragOver() {
        this.status === "ready" && (this.isDragOver = !0)
      },
      handleDragLeave(e) {
        this.$refs.uploadBox && this.$refs.uploadBox.contains(e.relatedTarget) || (this.isDragOver = !1)
      },
      handleDrop(e) {
        if (this.status !== "ready") return;
        this.isDragOver = !1;
        const s = e.dataTransfer.files;
        s.length > 0 && this.processFile(s[0])
      },
      handleFileChange(e) {
        const s = e.target.files;
        s.length > 0 && this.processFile(s[0]), e.target.value = ""
      },
      processFile(e) {
        if (!e.name.toLowerCase().endsWith(".srt")) {
          this.toast && this.toast.show({
            error: "warning",
            message: "请上传 .srt 格式的文件"
          });
          return
        }
        this.status = "loading", this.fileName = e.name, this.file = e, setTimeout(() => {
          this.status = "success", this.isUnsaved = !0, this.uploadResult = null
        }, 500)
      },
      confirmForm() {
        if (this.status !== "success" || this.isUploading) return;
        if (!this.isUnsaved) {
          this.$emit("confirm", this.file, this.uploadResult), this.closeModal();
          return
        }
        this.isUploading = !0;
        const e = new FormData;
        e.append("file", this.file), this.mediaId && e.append("media_id", this.mediaId), this.$http.post("/ajax/multimedia/uploadVideoSubtitle", e, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(({
          data: s
        }) => {
          this.isUploading = !1, s && s.ok === 1 ? s.data.result ? (this.isUnsaved = !1, this.uploadResult = s.data.result, this.$emit("confirm", this.file, this.uploadResult), this.closeModal()) : this.toast && this.toast.show({
            type: "error",
            message: s.data.msg || "上传失败，请重试"
          }) : this.toast && this.toast.show({
            type: "error",
            message: s.data.msg || "上传失败，请重试"
          })
        }).catch(() => {
          this.isUploading = !1, this.toast && this.toast.show({
            type: "error",
            message: "上传失败，请重试"
          })
        })
      }
    }
  },
  A = ["title"];

function H(e, s, _, K, o, t) {
  const v = u("woo-divider"),
    c = u("woo-box"),
    D = u("woo-spinner"),
    m = u("woo-button"),
    w = u("woo-modal");
  return _.visible ? (d(), k(w, {
    key: 0,
    lockScreen: "",
    show: ""
  }, {
    default: n(() => [a("div", {
      class: l(e.$style.box)
    }, [a("div", {
      class: l(e.$style.header)
    }, [s[8] || (s[8] = a("span", null, "上传字幕", -1)), a("span", {
      class: l(e.$style.tip)
    }, " 支持srt格式、中文(简体) ", 2)], 2), r(v), o.status === "success" ? (d(), h("div", {
      key: 0,
      class: l(e.$style.list)
    }, [r(c, {
      class: l(e.$style.listitem),
      align: "center",
      justify: "between"
    }, {
      default: n(() => [r(c, {
        class: l(e.$style.filename),
        align: "center"
      }, {
        default: n(() => [a("span", {
          title: o.fileName
        }, C(o.fileName), 9, A)]),
        _: 1
      }, 8, ["class"]), r(c, {
        class: l(e.$style.operate)
      }, {
        default: n(() => [a("span", {
          class: l(e.$style.reupload),
          onClick: s[0] || (s[0] = (...i) => t.reupload && t.reupload(...i))
        }, "重新上传", 2), a("span", {
          class: l(e.$style.delete),
          onClick: s[1] || (s[1] = (...i) => t.handleDelete && t.handleDelete(...i))
        }, "删除", 2)]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])], 2)) : (d(), h("div", {
      key: 1,
      class: l(e.$style.content)
    }, [a("div", {
      ref: "uploadBox",
      class: l([e.$style.upload, {
        [e.$style.isDragOver]: o.isDragOver
      }]),
      onDrop: s[4] || (s[4] = p((...i) => t.handleDrop && t.handleDrop(...i), ["prevent"])),
      onDragover: s[5] || (s[5] = p((...i) => t.handleDragOver && t.handleDragOver(...i), ["prevent"])),
      onDragleave: s[6] || (s[6] = p((...i) => t.handleDragLeave && t.handleDragLeave(...i), ["prevent"]))
    }, [o.status === "ready" ? (d(), h(f, {
      key: 0
    }, [a("img", {
      class: l([e.$style.icon, e.$style.pointer]),
      src: "https://d.sinaimg.cn/prd/1005/891/2026/01/20/uploadicon.png"
    }, null, 2), a("div", {
      class: l([e.$style.text, e.$style.pointer])
    }, " 点击上传或拖拽文件到此处 ", 2), s[9] || (s[9] = a("label", {
      for: "uploadsrt"
    }, null, -1))], 64)) : o.status === "loading" ? (d(), h(f, {
      key: 1
    }, [r(D, {
      class: l(e.$style.loadingIcon)
    }, null, 8, ["class"]), a("div", {
      class: l(e.$style.text)
    }, " 上传中... ", 2)], 64)) : o.status === "error" ? (d(), h(f, {
      key: 2
    }, [a("img", {
      class: l(e.$style.errorIcon),
      src: "https://d.sinaimg.cn/prd/1005/891/2026/01/20/error.png",
      onClick: s[2] || (s[2] = (...i) => t.reset && t.reset(...i))
    }, null, 2), a("div", {
      class: l(e.$style.text),
      onClick: s[3] || (s[3] = (...i) => t.reset && t.reset(...i))
    }, " 上传失败，请点击重试 ", 2)], 64)) : g("", !0)], 34)], 2)), r(c, {
      justify: "center",
      class: l(e.$style.buttons)
    }, {
      default: n(() => [r(m, {
        sort: "flat",
        kind: "default",
        onClick: t.closeModal
      }, {
        default: n(() => s[10] || (s[10] = [y(" 取消 ")])),
        _: 1
      }, 8, ["onClick"]), r(m, {
        sort: "flat",
        kind: "primary",
        disabled: o.status !== "success" || o.isUploading,
        onClick: t.confirmForm
      }, {
        default: n(() => s[11] || (s[11] = [y(" 确认 ")])),
        _: 1
      }, 8, ["disabled", "onClick"])]),
      _: 1
    }, 8, ["class"]), a("input", {
      id: "uploadsrt",
      ref: "fileInput",
      type: "file",
      accept: ".srt",
      style: {
        display: "none"
      },
      onChange: s[7] || (s[7] = (...i) => t.handleFileChange && t.handleFileChange(...i))
    }, null, 544)], 2)]),
    _: 1
  })) : g("", !0)
}
const J = {
    $style: W
  },
  Q = b(q, [
    ["render", H],
    ["__cssModules", J]
  ]);
export {
  Q as
  default
};
