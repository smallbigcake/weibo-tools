var x = (e, t, o) => new Promise((f, s) => {
  var a = d => {
      try {
        l(o.next(d))
      } catch (u) {
        s(u)
      }
    },
    g = d => {
      try {
        l(o.throw(d))
      } catch (u) {
        s(u)
      }
    },
    l = d => d.done ? f(d.value) : Promise.resolve(d.value).then(a, g);
  l((o = o.apply(e, t)).next())
});
import {
  _ as j,
  aH as z,
  l as h,
  m as D,
  D as b,
  i as m,
  B as i,
  p as n,
  C as c,
  T as _,
  n as r,
  U as y,
  h as S,
  O as w,
  P as v,
  E as B
} from "./index-Xve1TSN5.js";
const A = "_box_1mhd8_2",
  L = "_picbed_1mhd8_5",
  U = "_curr_1mhd8_24",
  V = "_icon_1mhd8_41",
  M = "_tab_1mhd8_48",
  N = "_editbox_1mhd8_52",
  O = "_box2_1mhd8_56",
  E = "_tip_1mhd8_60",
  T = "_file_1mhd8_65",
  q = "_loading_1mhd8_68",
  W = "_list_1mhd8_75",
  H = "_lt_1mhd8_79",
  P = "_lt1_1mhd8_82",
  F = "_card2c_1mhd8_86",
  G = "_card2cin_1mhd8_91",
  I = "_card2a_1mhd8_94",
  J = "_card2al_1mhd8_107",
  K = "_card2ar_1mhd8_110",
  Q = "_card2l_1mhd8_113",
  X = "_card2p_1mhd8_117",
  Y = "_card2pcurr_1mhd8_123",
  Z = "_card2picon_1mhd8_130",
  ee = "_op_1mhd8_142",
  te = "_op1_1mhd8_146",
  se = "_cus_1mhd8_149",
  oe = "_layer_1mhd8_153",
  re = "_bus_1mhd8_156",
  ce = {
    box: A,
    picbed: L,
    curr: U,
    icon: V,
    tab: M,
    editbox: N,
    box2: O,
    tip: E,
    file: T,
    loading: q,
    list: W,
    lt: H,
    lt1: P,
    card2c: F,
    card2cin: G,
    card2a: I,
    card2al: J,
    card2ar: K,
    card2l: Q,
    card2p: X,
    card2pcurr: Y,
    card2picon: Z,
    op: ee,
    op1: te,
    cus: se,
    layer: oe,
    bus: re
  },
  ie = {
    components: {
      Cropper: z
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
    data() {
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
    emits: ["change"],
    methods: {
      changeCover(e) {
        this.defaultScreenshot = e, console.log(this.screenshot), this.changeSrc(this.screenshot)
      },
      right() {
        this.marginStyle = "margin-left: -436px"
      },
      left() {
        this.marginStyle = ""
      },
      changeSelect(e) {},
      cancel() {
        this.cSrc = "", this.defaultScreenshot = !0, this.$emit("change")
      },
      change(e, t = !0) {
        if (e && e.target && e.target.files && e.target.files[0]) {
          const o = e.target.files[0];
          if (o !== void 0 && o.size < 5 * 1024 * 1025) {
            this.coverSelect = void 0;
            const f = URL.createObjectURL(o);
            !this.screenshot && t && (this.basicSrc = f), this.cSrc = f, this.$refs[t ? "cropper" : "cropper2"].setSrc(f)
          } else o.size > 5 * 1024 * 1024 && this.$_w_toast({
            type: "error",
            message: "图片不得大于5M"
          });
          e.target.value = ""
        }
      },
      ok() {
        return x(this, null, function*() {
          this.okDisabled = !0;
          try {
            const e = yield this.$refs.cropper.getWeiboURL(!0);
            e !== void 0 && this.$refs.cropper.setSrc(e), this.defaultScreenshot || (this.cover = yield this.$refs.cropper2.getWeiboURL(!0), this.cover && this.$refs.cropper2.setSrc(this.cover));
            const t = {
              url: e
            };
            this.horizontal && (t.cover = this.cover), this.$emit("change", "change", t), this.coverSelect = void 0
          } catch (e) {
            this.$_w_toast({
              type: "error",
              message: "图片过大，请更换"
            })
          }
          this.cSrc = "", this.okDisabled = !1
        })
      },
      changeSrc(e) {
        var t;
        this.edit && (this.currSelect ? (t = this.screenArray[this.currSelect - 1]) != null && t.url && this.$refs.cropper.setSrc(this.screenArray[this.currSelect - 1].url) : this.cSrc ? console.log("videoedit csrc") : e && this.defaultScreenshot ? this.$refs.cropper.setSrc(e) : e && this.$refs.cropper.setSrc(e), this.horizontal && (this.cover || (this.cover = e), this.defaultScreenshot || this.$refs.cropper2.setSrc(this.cover)))
      }
    },
    watch: {
      screenArray(e) {
        e.length || (this.coverSelect = 1)
      },
      edit(e) {
        e && this.$nextTick(() => {
          this.defaultScreenshot = !0, console.log(this.screenshot), this.changeSrc(this.screenshot)
        })
      },
      screenshot(e) {
        this.basicSrc = "", this.changeSrc(e)
      },
      horizontal(e) {
        e === void 0 && (this.cover = "")
      }
    }
  };

function ne(e, t, o, f, s, a) {
  const g = h("woo-fonticon"),
    l = h("woo-box"),
    d = h("woo-box-item"),
    u = h("woo-panel"),
    k = h("woo-tab-item"),
    C = h("Cropper"),
    $ = h("woo-button"),
    R = h("woo-tab");
  return o.edit ? (m(), D("div", {
    key: 0,
    class: r(["wbpro-layer", e.$style.layer])
  }, [i(u, {
    border: "bottom"
  }, {
    default: c(() => [i(l, {
      class: "wbpro-layer-tit"
    }, {
      default: c(() => [i(l, {
        align: "center",
        justify: "center",
        class: "wbpro-layer-tit-nav"
      }, {
        default: c(() => [i(g, {
          value: "angleLeft",
          class: r(e.$style.cus),
          onClick: _(a.cancel, ["stop"])
        }, null, 8, ["class", "onClick"])]),
        _: 1
      }), i(d, {
        align: "center",
        class: "wbpro-layer-tit-text"
      }, {
        default: c(() => t[5] || (t[5] = [y(" 编辑封面 ")])),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }), i(R, {
    justify: "center",
    animate: "",
    "animate-duration": 500,
    class: r(["wbpro-tab1", e.$style.tab])
  }, {
    content: c(() => [w(n("div", {
      class: r(e.$style.box)
    }, [n("div", {
      class: r(e.$style.editbox)
    }, [n("div", {
      class: r(e.$style.box2)
    }, [i(C, {
      ref: "cropper2",
      height: 319,
      aspectRatio: s.aspectRatio,
      opts: {
        watermark: 0
      },
      options: {
        checkCrossOrigin: !0
      },
      source: "1"
    }, null, 8, ["aspectRatio"])], 2)], 2)], 2), [
      [v, !s.defaultScreenshot && o.horizontal]
    ]), w(n("div", {
      class: r(e.$style.box)
    }, [n("div", {
      class: r(e.$style.editbox)
    }, [w(n("div", {
      class: r(e.$style.box2)
    }, [i(C, {
      ref: "cropper",
      height: 319,
      aspectRatio: o.horizontal ? 3 / 4 : s.aspectRatio,
      opts: {
        watermark: 0
      },
      options: {
        checkCrossOrigin: !0
      },
      source: "1"
    }, null, 8, ["aspectRatio"])], 2), [
      [v, o.screenshot || s.basicSrc]
    ]), o.screenshot || s.basicSrc ? b("", !0) : (m(), S(l, {
      key: 0,
      align: "center",
      justify: "center",
      class: r(e.$style.loading)
    }, {
      default: c(() => t[8] || (t[8] = [n("div", null, "处理中请稍后…", -1)])),
      _: 1
    }, 8, ["class"]))], 2)], 2), [
      [v, s.defaultScreenshot]
    ]), i(l, {
      direction: "x-r",
      class: r([e.$style.lt, e.$style.list])
    }, {
      default: c(() => [i($, {
        sort: "simple",
        kind: "primary",
        fonticon: "upload",
        size: "s",
        onClick: t[2] || (t[2] = _(p => s.defaultScreenshot ? e.$refs.file.click() : e.$refs.file2.click(), ["stop"]))
      }, {
        default: c(() => t[9] || (t[9] = [y(" 本地上传 ")])),
        _: 1
      })]),
      _: 1
    }, 8, ["class"])]),
    default: c(() => [s.showCover ? (m(), S(k, {
      key: 0,
      cur: s.defaultScreenshot,
      onClick: t[0] || (t[0] = _(p => a.changeCover(!0), ["stop"]))
    }, {
      default: c(() => t[6] || (t[6] = [n("div", {
        class: "wbpro-tab1-item"
      }, " 竖版封面（信息流内展示） ", -1)])),
      _: 1
    }, 8, ["cur"])) : b("", !0), s.showCover ? (m(), S(k, {
      key: 1,
      cur: !s.defaultScreenshot,
      onClick: t[1] || (t[1] = _(p => a.changeCover(!1), ["stop"]))
    }, {
      default: c(() => t[7] || (t[7] = [n("div", {
        class: "wbpro-tab1-item"
      }, " 横版封面（视频社区展示） ", -1)])),
      _: 1
    }, 8, ["cur"])) : b("", !0)]),
    _: 1
  }, 8, ["class"]), i(l, {
    justify: "center",
    class: r(["wbpro-layer-btn", e.$style.bus])
  }, {
    default: c(() => [i($, {
      sort: "flat",
      kind: "primary",
      class: "wbpro-layer-btn-item",
      loading: s.okDisabled,
      disabled: s.okDisabled,
      onClick: _(a.ok, ["stop"])
    }, {
      default: c(() => [y(B(s.okDisabled ? "裁切处理中" : "完成"), 1)]),
      _: 1
    }, 8, ["loading", "disabled", "onClick"])]),
    _: 1
  }, 8, ["class"]), n("input", {
    ref: "file",
    type: "file",
    class: r(e.$style.file),
    accept: ".jpg, .jpeg, .bmp, .gif, .png",
    onChange: t[3] || (t[3] = (...p) => a.change && a.change(...p))
  }, null, 34), n("input", {
    ref: "file2",
    type: "file",
    class: r(e.$style.file),
    accept: ".jpg, .jpeg, .bmp, .gif, .png",
    onChange: t[4] || (t[4] = p => a.change(p, !1))
  }, null, 34)], 2)) : b("", !0)
}
const ae = {
    $style: ce
  },
  he = j(ie, [
    ["render", ne],
    ["__cssModules", ae]
  ]);
export {
  he as
  default
};
