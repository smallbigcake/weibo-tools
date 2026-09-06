import {
  _ as i,
  l as p,
  m as l,
  i as n,
  p as o,
  D as d,
  O as _,
  n as e,
  a1 as b,
  P as u,
  B as $,
  T as m
} from "./index-D53O_Npi.js";
const f = "_tag_wxc79_2",
  g = "_bor_wxc79_17",
  y = "_clbor_wxc79_22",
  w = "_clbg_wxc79_23",
  v = "_text_wxc79_41",
  k = "_btn_wxc79_54",
  B = {
    tag: f,
    bor: g,
    clbor: y,
    clbg: w,
    text: v,
    btn: k
  },
  C = {
    props: {
      top: {
        type: String,
        default: ""
      },
      close: {
        type: Boolean,
        default: !0
      }
    },
    data() {
      return {
        styleObject: {
          top: this.top
        }
      }
    },
    emits: ["change"]
  };

function h(s, t, a, M, N, S) {
  const c = p("woo-fonticon");
  return n(), l("span", {
    class: e(s.$style.tag),
    onClick: t[1] || (t[1] = m(r => s.$emit("change", "add"), ["stop"]))
  }, [o("span", {
    class: e(s.$style.bor)
  }, [o("i", {
    class: e(s.$style.clbor)
  }, null, 2), o("em", {
    class: e(s.$style.clbg)
  }, null, 2)], 2), s.$slots.default ? (n(), l("span", {
    key: 0,
    class: e(s.$style.text)
  }, [b(s.$slots, "default")], 2)) : d("", !0), _($(c, {
    title: "删除",
    value: "close",
    class: e(s.$style.btn),
    onClick: t[0] || (t[0] = r => s.$emit("change", "close"))
  }, null, 8, ["class"]), [
    [u, a.close]
  ])], 2)
}
const x = {
    $style: B
  },
  D = i(C, [
    ["render", h],
    ["__cssModules", x]
  ]);
export {
  D as
  default
};
