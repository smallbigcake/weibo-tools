import {
  _ as b,
  l as p,
  m as s,
  D as u,
  i as n,
  B as c,
  C as r,
  p as g,
  n as d,
  U as m,
  E as k,
  ac as C
} from "./index-Xve1TSN5.js";
const v = "_abox3_jcpu5_2",
  B = "_tit2_jcpu5_5",
  x = "_gap2_jcpu5_8",
  V = "_bg_jcpu5_12",
  j = {
    abox3: v,
    tit2: B,
    gap2: x,
    bg: V
  },
  w = {
    props: {
      autoPublish: Boolean,
      hasnav: Boolean
    },
    emits: ["cancel"],
    setup(e, {
      emit: t
    }) {
      const {
        goList: a,
        refresh: o,
        openBlank: y,
        comment: f,
        isVideo: l,
        isEdit: i
      } = C();
      return {
        goList: a,
        refresh: o,
        cancel: () => {
          t("cancel")
        },
        openBlank: y,
        isEdit: i,
        isVideo: l,
        comment: f
      }
    }
  },
  h = {
    key: 0
  };

function E(e, t, a, o, y, f) {
  const l = p("woo-button"),
    i = p("woo-box");
  return a.autoPublish ? (n(), s("div", h, [c(i, {
    direction: "y",
    align: "center",
    justify: "center",
    class: d([e.$style.abox3, e.$style.gap2])
  }, {
    default: r(() => [g("div", {
      class: d(e.$style.bg)
    }, null, 2), o.isEdit ? (n(), s("div", {
      key: 0,
      class: d(e.$style.tit2)
    }, [m(k(o.comment.edit) + " ", 1), a.hasnav && o.isVideo ? (n(), s("a", {
      key: 0,
      onClick: t[0] || (t[0] = (..._) => o.goList && o.goList(..._))
    }, "视频管理 >")) : u("", !0)], 2)) : (n(), s("div", {
      key: 1,
      class: d(e.$style.tit2)
    }, [m(k(o.comment.publisher) + " ", 1), o.isVideo ? (n(), s("a", {
      key: 0,
      onClick: t[1] || (t[1] = _ => o.goList(!0))
    }, "视频管理 >")) : u("", !0)], 2)), c(i, null, {
      default: r(() => [c(l, {
        sort: "flat",
        kind: "default",
        onClick: o.cancel
      }, {
        default: r(() => t[2] || (t[2] = [m(" 取消自动发布 ")])),
        _: 1
      }, 8, ["onClick"]), c(l, {
        style: {
          "margin-left": "24px"
        },
        sort: "flat",
        kind: "primary",
        onClick: o.openBlank
      }, {
        default: r(() => [m(k(o.comment.another), 1)]),
        _: 1
      }, 8, ["onClick"])]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])])) : u("", !0)
}
const L = {
    $style: j
  },
  D = b(w, [
    ["render", E],
    ["__cssModules", L]
  ]);
export {
  D as
  default
};
