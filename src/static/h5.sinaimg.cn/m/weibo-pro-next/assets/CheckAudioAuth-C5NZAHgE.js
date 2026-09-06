import {
  _ as p,
  l as c,
  h as b,
  i as d,
  C as e,
  p as a,
  B as l,
  n as t,
  E as r,
  U as y,
  r as g
} from "./index-D53O_Npi.js";
const u = "_box_18x34_2",
  x = "_bg_18x34_5",
  w = "_bg23_18x34_12",
  f = "_text_18x34_15",
  m = "_btn_18x34_19",
  h = {
    box: u,
    bg: x,
    bg23: w,
    text: f,
    btn: m
  },
  k = {
    desc: "您还没有音频发布权限",
    apply: "申请入驻"
  },
  C = {
    props: {
      type: {
        type: String
      }
    },
    setup() {
      return {
        show: g(!1),
        go: () => {
          window.open("https://m.weibo.cn/cp/audio/guide?showmenu=0&topnavstyle=1&immersiveScroll=100", "_blank")
        },
        copywriter: k
      }
    }
  };

function $(o, _, B, s, N, S) {
  const i = c("woo-button"),
    n = c("woo-box");
  return d(), b(n, {
    direction: "y",
    align: "center",
    class: t(o.$style.box)
  }, {
    default: e(() => [a("div", {
      class: t([o.$style.bg, o.$style.bg23])
    }, null, 2), a("div", {
      class: t(o.$style.text)
    }, r(s.copywriter.desc), 3), l(n, {
      align: "center",
      class: t(o.$style.btn)
    }, {
      default: e(() => [l(i, {
        sort: "flat",
        kind: "primary",
        onClick: s.go
      }, {
        default: e(() => [y(r(s.copywriter.apply), 1)]),
        _: 1
      }, 8, ["onClick"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])
}
const v = {
    $style: h
  },
  A = p(C, [
    ["render", $],
    ["__cssModules", v]
  ]);
export {
  A as
  default
};
