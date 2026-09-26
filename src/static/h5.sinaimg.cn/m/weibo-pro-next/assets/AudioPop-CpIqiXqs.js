import {
  _ as l,
  l as n,
  m as a,
  i,
  p as t,
  B as c,
  n as e,
  C as _
} from "./index-Xve1TSN5.js";
const d = "_pop_77siv_2",
  p = "_t1_77siv_7",
  r = "_t2_77siv_10",
  v = "_bg_77siv_15",
  b = "_bg1_77siv_22",
  g = "_bg2_77siv_25",
  m = "_item_77siv_28",
  y = {
    pop: d,
    t1: p,
    t2: r,
    bg: v,
    bg1: b,
    bg2: g,
    item: m
  },
  $ = {};

function u(s, B) {
  const o = n("woo-box");
  return i(), a("div", {
    class: e(s.$style.pop)
  }, [t("div", {
    class: e(s.$style.t1)
  }, " 发布后样式说明： ", 2), c(o, {
    align: "center"
  }, {
    default: _(() => [t("div", {
      class: e(s.$style.item)
    }, [t("div", {
      class: e(s.$style.t2)
    }, " 在信息流展示最新一集 ", 2), t("div", {
      class: e([s.$style.bg, s.$style.bg1])
    }, null, 2)], 2), t("div", {
      class: e(s.$style.item)
    }, [t("div", {
      class: e(s.$style.t2)
    }, " 在个人主页展示全部集数 ", 2), t("div", {
      class: e([s.$style.bg, s.$style.bg2])
    }, null, 2)], 2)]),
    _: 1
  })], 2)
}
const f = {
    $style: y
  },
  w = l($, [
    ["render", u],
    ["__cssModules", f]
  ]);
export {
  w as
  default
};
