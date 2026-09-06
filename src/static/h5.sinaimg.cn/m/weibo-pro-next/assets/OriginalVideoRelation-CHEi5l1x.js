import {
  _ as j,
  u as q,
  y as F,
  r as H,
  b as c,
  A as J,
  g as Q,
  l as V,
  m as n,
  i as o,
  p as l,
  D as r,
  B as W,
  n as t,
  G as X,
  aq as S,
  h as Y,
  E as p,
  I as Z,
  ag as f
} from "./index-D53O_Npi.js";
const x = "_wrap_1ocvh_2",
  ee = "_header_1ocvh_9",
  te = "_titleGroup_1ocvh_16",
  oe = "_title_1ocvh_16",
  ne = "_subtitle_1ocvh_29",
  le = "_inputRow_1ocvh_67",
  ae = "_input_1ocvh_67",
  se = "_relate_1ocvh_99",
  ce = "_clear_1ocvh_121",
  ie = "_error_1ocvh_154",
  re = "_card_1ocvh_161",
  ue = "_cardClickable_1ocvh_171",
  de = "_cover_1ocvh_175",
  pe = "_duration_1ocvh_189",
  ve = "_cardInfo_1ocvh_203",
  _e = "_cardTitle_1ocvh_211",
  fe = "_author_1ocvh_223",
  he = "_tip_1ocvh_230",
  ye = "_divider_1ocvh_237",
  ke = {
    wrap: x,
    header: ee,
    titleGroup: te,
    title: oe,
    subtitle: ne,
    switch: "_switch_1ocvh_36",
    inputRow: le,
    input: ae,
    relate: se,
    clear: ce,
    error: ie,
    card: re,
    cardClickable: ue,
    cover: de,
    duration: pe,
    cardInfo: ve,
    cardTitle: _e,
    author: fe,
    tip: he,
    divider: ye
  },
  me = ["value", "readonly"],
  we = ["disabled"],
  be = {
    key: 1
  },
  ge = ["role", "tabindex"],
  $e = "关联后，观众可在播放器点击「查看原视频」跳转；AI检测相似度过低自动取消。",
  Ie = {
    __name: "OriginalVideoRelation",
    props: {
      modelValue: {
        type: Boolean,
        default: !1
      },
      url: {
        type: String,
        default: ""
      },
      status: {
        type: String,
        default: "idle",
        validator: i => ["idle", "linking", "success", "error"].includes(i)
      },
      errorText: {
        type: String,
        default: ""
      },
      videoInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ["update:modelValue", "update:url", "relate", "clear"],
    setup(i, {
      emit: T
    }) {
      const a = i,
        u = T;
      let h = !1;
      const R = q(),
        U = F(),
        y = H(null),
        m = c(() => a.modelValue),
        v = c(() => a.status === "success"),
        k = c(() => a.status === "linking"),
        B = c(() => a.videoInfo.title || "原视频已关联"),
        w = c(() => a.videoInfo.author || ""),
        b = c(() => a.videoInfo.duration || ""),
        d = c(() => a.videoInfo.videoUrl || ""),
        D = c(() => a.videoInfo.cover ? {
          backgroundImage: `url(${a.videoInfo.cover})`
        } : {});
      let s = null;
      J(() => {
        E()
      }), Q(() => {
        s == null || s.disconnect()
      });

      function g() {
        h || (h = !0, f({
          act_code: 10316,
          ext: "channel:pc"
        }))
      }

      function E() {
        if (!(h || !y.value)) {
          if (!window.IntersectionObserver) {
            g();
            return
          }
          s = new IntersectionObserver(e => {
            e.some(_ => _.isIntersecting) && (g(), s == null || s.disconnect())
          }), s.observe(y.value)
        }
      }

      function G(e) {
        if (!e && v.value) {
          I({
            closeSwitch: !0
          });
          return
        }
        e && O(), u("update:modelValue", e)
      }

      function O() {
        f({
          act_code: 6915,
          ext: "channel:pc|clickid:11"
        })
      }

      function $() {
        z(), u("relate")
      }

      function z() {
        f({
          act_code: 10317,
          ext: "channel:pc|type:link"
        })
      }

      function P() {
        I({
          reportUnlink: !0
        })
      }

      function A() {
        f({
          act_code: 10317,
          ext: "channel:pc|type:unlink"
        })
      }

      function K(e) {
        u("update:url", e.target.value)
      }

      function I({
        closeSwitch: e = !1,
        reportUnlink: _ = !1
      } = {}) {
        R.show({
          type: "confirm",
          title: "确定取消关联原视频吗？",
          btnCancel: "再想想",
          btnConfirm: "确认取消",
          action: () => {
            e && u("update:modelValue", !1), _ && A(), u("clear"), L()
          }
        })
      }

      function L() {
        U.show({
          type: "success",
          message: "已取消关联",
          hideDuration: 2e3
        })
      }

      function C() {
        d.value && window.open(d.value, "_blank", "noopener")
      }
      return (e, _) => {
        const M = V("woo-switch"),
          N = V("woo-spinner");
        return o(), n("div", {
          ref_key: "wrapRef",
          ref: y,
          class: t(e.$style.wrap)
        }, [l("div", {
          class: t(e.$style.header)
        }, [l("div", {
          class: t(e.$style.titleGroup)
        }, [l("span", {
          class: t(e.$style.title)
        }, "关联原视频", 2), m.value ? r("", !0) : (o(), n("span", {
          key: 0,
          class: t(e.$style.subtitle)
        }, "为二创视频关联原始完整视频", 2))], 2), W(M, {
          modelValue: i.modelValue,
          size: .6875,
          class: t(e.$style.switch),
          "onUpdate:modelValue": G
        }, null, 8, ["modelValue", "class"])], 2), m.value ? (o(), n(X, {
          key: 0
        }, [l("div", {
          class: t(e.$style.inputRow)
        }, [l("input", {
          value: i.url,
          class: t(e.$style.input),
          placeholder: "请输入原视频的微博链接",
          readonly: v.value,
          onInput: K,
          onKeyup: S($, ["enter"])
        }, null, 42, me), v.value ? (o(), n("button", {
          key: 0,
          type: "button",
          class: t(e.$style.clear),
          "aria-label": "取消关联",
          onClick: P
        }, null, 2)) : (o(), n("button", {
          key: 1,
          type: "button",
          class: t(e.$style.relate),
          disabled: k.value,
          onClick: $
        }, [k.value ? (o(), Y(N, {
          key: 0,
          size: "15"
        })) : (o(), n("span", be, "关联"))], 10, we))], 2), i.status === "error" ? (o(), n("p", {
          key: 0,
          class: t(e.$style.error)
        }, p(i.errorText || "仅支持挂载微博视频链接"), 3)) : r("", !0), v.value ? (o(), n("div", {
          key: 1,
          class: t([e.$style.card, d.value && e.$style.cardClickable]),
          role: d.value ? "button" : void 0,
          tabindex: d.value ? 0 : void 0,
          onClick: C,
          onKeyup: S(C, ["enter"])
        }, [l("div", {
          class: t(e.$style.cover),
          style: Z(D.value)
        }, [b.value ? (o(), n("span", {
          key: 0,
          class: t(e.$style.duration)
        }, p(b.value), 3)) : r("", !0)], 6), l("div", {
          class: t(e.$style.cardInfo)
        }, [l("div", {
          class: t(e.$style.cardTitle)
        }, p(B.value), 3), w.value ? (o(), n("div", {
          key: 0,
          class: t(e.$style.author)
        }, p(w.value), 3)) : r("", !0)], 2)], 42, ge)) : r("", !0), l("p", {
          class: t(e.$style.tip)
        }, p(k.value ? "校验链接中..." : $e), 3)], 64)) : r("", !0), l("div", {
          class: t(e.$style.divider)
        }, null, 2)], 2)
      }
    }
  },
  Ce = {
    $style: ke
  },
  Se = j(Ie, [
    ["__cssModules", Ce]
  ]);
export {
  Se as
  default
};
