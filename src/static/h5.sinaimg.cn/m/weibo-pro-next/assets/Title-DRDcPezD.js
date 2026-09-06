import {
  _ as v,
  l as p,
  m as c,
  i as m,
  p as n,
  U as B,
  D as C,
  n as _,
  B as f,
  C as w,
  O as b,
  T as x,
  aq as k,
  ar as N,
  E as T,
  ac as g,
  ad as V,
  w as M,
  af as A
} from "./index-D53O_Npi.js";
const D = "_tit1_osr0h_2",
  E = "_gap2_osr0h_12",
  F = "_top1_osr0h_16",
  I = {
    tit1: D,
    gap2: E,
    top1: F
  },
  K = {
    props: {
      content: {}
    },
    emits: ["input"],
    setup(s, {
      emit: o
    }) {
      const {
        isAudio: r
      } = g(), {
        title: t,
        titleInput: u,
        titleBlur: l,
        titleNumber: i,
        titleStatus: a,
        titleFocus: e
      } = V();
      t.value = s.content;
      const y = h => {
        o("input", t.value)
      };
      let d = !0;
      return M(() => s.content, () => {
        t.value = s.content, d && (A(() => {
          l()
        }), d = !1)
      }), {
        isAudio: r,
        titleInput: u,
        titleBlur: l,
        titleNumber: i,
        titleStatus: a,
        titleFocus: e,
        title: t,
        input: y
      }
    }
  },
  S = {
    key: 0
  },
  U = ["placeholder"],
  q = ["textContent"];

function z(s, o, r, t, u, l) {
  const i = p("woo-box-item"),
    a = p("woo-box");
  return m(), c("div", null, [n("div", {
    class: _([s.$style.tit1, s.$style.gap2])
  }, [o[6] || (o[6] = B(" 标题")), t.isAudio ? (m(), c("span", S, "*")) : C("", !0)], 2), n("div", {
    class: _(["wbpro-form", [s.$style.top1, t.titleStatus]]),
    onClick: o[5] || (o[5] = x((...e) => t.titleFocus && t.titleFocus(...e), ["stop"]))
  }, [f(a, null, {
    default: w(() => [f(i, null, {
      default: w(() => [b(n("input", {
        ref: "titleInput",
        "onUpdate:modelValue": o[0] || (o[0] = e => t.title = e),
        type: "text",
        placeholder: t.isAudio ? "简洁明了的说明音频主题（0～30个字）" : "填写标题（0～30个字）",
        selectionEnd: "",
        onInput: o[1] || (o[1] = (...e) => t.input && t.input(...e)),
        onBlur: o[2] || (o[2] = (...e) => t.titleBlur && t.titleBlur(...e)),
        onKeyup: o[3] || (o[3] = k((...e) => t.titleBlur && t.titleBlur(...e), ["enter"])),
        onKeypress: o[4] || (o[4] = x(() => {}, ["stop"]))
      }, null, 40, U), [
        [N, t.title]
      ])]),
      _: 1
    }), n("div", {
      class: "num",
      textContent: T(`${t.titleNumber}/30`)
    }, null, 8, q)]),
    _: 1
  })], 2)])
}
const O = {
    $style: I
  },
  G = v(K, [
    ["render", z],
    ["__cssModules", O]
  ]);
export {
  G as
  default
};
