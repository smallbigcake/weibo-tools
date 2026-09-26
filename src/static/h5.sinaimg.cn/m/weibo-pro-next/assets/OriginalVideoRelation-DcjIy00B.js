import {
  _ as j,
  u as q,
  y as F,
  r as H,
  b as i,
  A as J,
  g as Q,
  l as V,
  m as a,
  i as l,
  p as s,
  D as r,
  B as W,
  n as t,
  G as X,
  aq as S,
  h as Y,
  E as p,
  I as Z,
  ag as y
} from "./index-Xve1TSN5.js";
const x = "_wrap_1ocvh_2",
  ee = "_header_1ocvh_9",
  te = "_titleGroup_1ocvh_16",
  oe = "_title_1ocvh_16",
  le = "_subtitle_1ocvh_29",
  ne = "_inputRow_1ocvh_67",
  ae = "_input_1ocvh_67",
  se = "_relate_1ocvh_99",
  ce = "_clear_1ocvh_121",
  ie = "_error_1ocvh_154",
  re = "_card_1ocvh_161",
  ue = "_cardClickable_1ocvh_171",
  de = "_cover_1ocvh_175",
  ve = "_duration_1ocvh_189",
  pe = "_cardInfo_1ocvh_203",
  fe = "_cardTitle_1ocvh_211",
  ye = "_author_1ocvh_223",
  he = "_tip_1ocvh_230",
  _e = "_divider_1ocvh_237",
  ke = {
    wrap: x,
    header: ee,
    titleGroup: te,
    title: oe,
    subtitle: le,
    switch: "_switch_1ocvh_36",
    inputRow: ne,
    input: ae,
    relate: se,
    clear: ce,
    error: ie,
    card: re,
    cardClickable: ue,
    cover: de,
    duration: ve,
    cardInfo: pe,
    cardTitle: fe,
    author: ye,
    tip: he,
    divider: _e
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
        validator: o => ["idle", "linking", "success", "error"].includes(o)
      },
      errorText: {
        type: String,
        default: ""
      },
      videoInfo: {
        type: Object,
        default: () => ({})
      },
      locked: {
        type: Boolean,
        default: !1
      }
    },
    emits: ["update:modelValue", "update:url", "relate", "clear"],
    setup(o, {
      emit: T
    }) {
      const n = o,
        u = T;
      let h = !1;
      const R = q(),
        B = F(),
        _ = H(null),
        m = i(() => n.modelValue),
        d = i(() => n.status === "success"),
        k = i(() => n.status === "linking"),
        U = i(() => n.videoInfo.title || "原视频已关联"),
        w = i(() => n.videoInfo.author || ""),
        b = i(() => n.videoInfo.duration || ""),
        v = i(() => n.videoInfo.videoUrl || ""),
        D = i(() => n.videoInfo.cover ? {
          backgroundImage: `url(${n.videoInfo.cover})`
        } : {});
      let c = null;
      J(() => {
        E()
      }), Q(() => {
        c == null || c.disconnect()
      });

      function g() {
        h || (h = !0, y({
          act_code: 10316,
          ext: "channel:pc"
        }))
      }

      function E() {
        if (!(h || !_.value)) {
          if (!window.IntersectionObserver) {
            g();
            return
          }
          c = new IntersectionObserver(e => {
            e.some(f => f.isIntersecting) && (g(), c == null || c.disconnect())
          }), c.observe(_.value)
        }
      }

      function G(e) {
        if (!n.locked) {
          if (!e && d.value) {
            I({
              closeSwitch: !0
            });
            return
          }
          e && O(), u("update:modelValue", e)
        }
      }

      function O() {
        y({
          act_code: 6915,
          ext: "channel:pc|clickid:11"
        })
      }

      function $() {
        z(), u("relate")
      }

      function z() {
        y({
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
        y({
          act_code: 10317,
          ext: "channel:pc|type:unlink"
        })
      }

      function K(e) {
        u("update:url", e.target.value)
      }

      function I({
        closeSwitch: e = !1,
        reportUnlink: f = !1
      } = {}) {
        R.show({
          type: "confirm",
          title: "确定取消关联原视频吗？",
          btnCancel: "再想想",
          btnConfirm: "确认取消",
          action: () => {
            e && u("update:modelValue", !1), f && A(), u("clear"), L()
          }
        })
      }

      function L() {
        B.show({
          type: "success",
          message: "已取消关联",
          hideDuration: 2e3
        })
      }

      function C() {
        v.value && window.open(v.value, "_blank", "noopener")
      }
      return (e, f) => {
        const M = V("woo-switch"),
          N = V("woo-spinner");
        return l(), a("div", {
          ref_key: "wrapRef",
          ref: _,
          class: t(e.$style.wrap)
        }, [s("div", {
          class: t(e.$style.header)
        }, [s("div", {
          class: t(e.$style.titleGroup)
        }, [s("span", {
          class: t(e.$style.title)
        }, "关联原视频", 2), m.value ? r("", !0) : (l(), a("span", {
          key: 0,
          class: t(e.$style.subtitle)
        }, "为二创视频关联原始完整视频", 2))], 2), W(M, {
          modelValue: o.modelValue,
          size: .6875,
          class: t(e.$style.switch),
          disabled: o.locked,
          "onUpdate:modelValue": G
        }, null, 8, ["modelValue", "class", "disabled"])], 2), m.value ? (l(), a(X, {
          key: 0
        }, [s("div", {
          class: t(e.$style.inputRow)
        }, [s("input", {
          value: o.url,
          class: t(e.$style.input),
          placeholder: "请输入原视频的微博链接",
          readonly: d.value || o.locked,
          onInput: K,
          onKeyup: S($, ["enter"])
        }, null, 42, me), d.value && !o.locked ? (l(), a("button", {
          key: 0,
          type: "button",
          class: t(e.$style.clear),
          "aria-label": "取消关联",
          onClick: P
        }, null, 2)) : d.value ? r("", !0) : (l(), a("button", {
          key: 1,
          type: "button",
          class: t(e.$style.relate),
          disabled: k.value || o.locked,
          onClick: $
        }, [k.value ? (l(), Y(N, {
          key: 0,
          size: "15"
        })) : (l(), a("span", be, "关联"))], 10, we))], 2), o.status === "error" ? (l(), a("p", {
          key: 0,
          class: t(e.$style.error)
        }, p(o.errorText || "仅支持挂载微博视频链接"), 3)) : r("", !0), d.value ? (l(), a("div", {
          key: 1,
          class: t([e.$style.card, v.value && e.$style.cardClickable]),
          role: v.value ? "button" : void 0,
          tabindex: v.value ? 0 : void 0,
          onClick: C,
          onKeyup: S(C, ["enter"])
        }, [s("div", {
          class: t(e.$style.cover),
          style: Z(D.value)
        }, [b.value ? (l(), a("span", {
          key: 0,
          class: t(e.$style.duration)
        }, p(b.value), 3)) : r("", !0)], 6), s("div", {
          class: t(e.$style.cardInfo)
        }, [s("div", {
          class: t(e.$style.cardTitle)
        }, p(U.value), 3), w.value ? (l(), a("div", {
          key: 0,
          class: t(e.$style.author)
        }, p(w.value), 3)) : r("", !0)], 2)], 42, ge)) : r("", !0), s("p", {
          class: t(e.$style.tip)
        }, p(k.value ? "校验链接中..." : $e), 3)], 64)) : r("", !0), s("div", {
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
