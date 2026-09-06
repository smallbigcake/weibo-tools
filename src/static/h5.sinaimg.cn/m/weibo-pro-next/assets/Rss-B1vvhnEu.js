const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/index-D53O_Npi.js", "assets/index-D06RDhv8.css"]))) => i.map(i => d[i]);
import {
  _ as k,
  al as p,
  l as a,
  m as h,
  i as _,
  h as w,
  D as r,
  B as n,
  n as o,
  C as d,
  p as g,
  r as B,
  aD as q,
  b as S,
  w as V,
  ah as b
} from "./index-D53O_Npi.js";
const C = "_rss_1tq0i_2",
  L = "_help_1tq0i_7",
  R = "_audio_1tq0i_14",
  D = "_t1_1tq0i_17",
  E = "_gap1_1tq0i_39",
  z = "_line_1tq0i_56",
  F = "_t2_1tq0i_65",
  M = "_tip_1tq0i_107",
  N = {
    rss: C,
    help: L,
    audio: R,
    t1: D,
    switch: "_switch_1tq0i_34",
    gap1: E,
    line: z,
    t2: F,
    tip: M
  },
  O = {
    props: {
      auto: {
        type: Boolean,
        default: !1
      },
      showTip: {
        type: Boolean,
        default: !1
      },
      styleType: {
        type: String,
        default: "inLayer"
      }
    },
    components: {
      Action: p(() => b(() => import("./index-D53O_Npi.js").then(e => e.aO), __vite__mapDeps([0, 1]))),
      FeatureBubble: p(() => b(() => import("./index-D53O_Npi.js").then(e => e.aP), __vite__mapDeps([0, 1])))
    },
    emits: ["changeAuto"],
    setup(e, {
      emit: l
    }) {
      var u, i;
      const t = B(e.auto),
        s = (i = (u = window.$CONFIG) == null ? void 0 : u.user) == null ? void 0 : i.id,
        y = q(s),
        m = () => {
          l("changeAuto", t.value)
        },
        c = S(() => y === 0 ? "https://h5.sinaimg.cn/upload/100/1474/2024/06/05/compose_automatic_release.png" : "https://h5.sinaimg.cn/upload/100/1474/2024/06/05/compose_automatic_release_dark.png");
      return V(() => e.auto, () => {
        t.value = e.auto
      }), {
        isAuto: t,
        image: c,
        changeAuto: m
      }
    }
  };

function P(e, l, t, s, y, m) {
  const c = a("woo-divider"),
    u = a("Action"),
    i = a("woo-box"),
    f = a("woo-box-item"),
    A = a("woo-switch"),
    v = a("FeatureBubble");
  return _(), h("div", {
    class: o([t.styleType === "inList" && e.$style.rss, t.styleType === "inAudio" && e.$style.audio])
  }, [t.styleType === "inLayer" ? (_(), w(c, {
    key: 0,
    class: o(e.$style.line)
  }, null, 8, ["class"])) : r("", !0), n(i, {
    align: "center"
  }, {
    default: d(() => [n(f, null, {
      default: d(() => [n(i, {
        align: "center"
      }, {
        default: d(() => [g("div", {
          class: o(e.$style.t1)
        }, " 自动发布 ", 2), n(u, {
          timeout: "300",
          direction: "up",
          width: "300",
          size: t.styleType === "inAudio" ? 16 : 12,
          title: "自动发布",
          desc: `开关打开后，RSS地址里最新一期音频会以微博形式发布，其他音频会进入个人主页音频签<img src='${s.image}' />`,
          class: o(e.$style.help)
        }, null, 8, ["size", "desc", "class"])]),
        _: 1
      }), t.styleType === "inLayer" ? (_(), h("div", {
        key: 0,
        class: o(e.$style.t2)
      }, " RSS音频有更新时，会自动发博同步节目内容 ", 2)) : r("", !0)]),
      _: 1
    }), g("div", {
      class: o(e.$style.switch)
    }, [n(v, {
      direction: "up",
      align: "center",
      gap: "10",
      width: "128",
      content: "开启自动同步，RSS有更新将会自动发博",
      bubble: t.styleType === "inAudio",
      check: !1,
      class: o(e.$style.tip),
      exclusiveKey: ["mobile_can_audio"],
      configkey: t.showTip ? "audio_bubble_switch" : "",
      withoutHandleShow: !!(t.showTip && t.styleType === "inAudio")
    }, {
      ctrl: d(() => [n(A, {
        modelValue: s.isAuto,
        "onUpdate:modelValue": [l[0] || (l[0] = T => s.isAuto = T), s.changeAuto],
        size: .6875
      }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
      _: 1
    }, 8, ["bubble", "class", "configkey", "withoutHandleShow"])], 2)]),
    _: 1
  }), t.styleType === "inAudio" ? (_(), w(c, {
    key: 1,
    "border-color": "var(--w-card-border)",
    class: o(e.$style.gap1)
  }, null, 8, ["class"])) : r("", !0)], 2)
}
const I = {
    $style: N
  },
  H = k(O, [
    ["render", P],
    ["__cssModules", I]
  ]);
export {
  H as
  default
};
