import {
  _ as x,
  l as n,
  h as f,
  i as _,
  C as c,
  B as i,
  p as a,
  D as h,
  m as j,
  n as l,
  E as r,
  r as d
} from "./index-D53O_Npi.js";
const V = "_gray1_jbxco_2",
  k = "_tit1_jbxco_6",
  B = "_help_jbxco_16",
  C = "_helppop1_jbxco_20",
  M = "_qa_jbxco_24",
  q = "_gray2_jbxco_58",
  S = "_left6_jbxco_63",
  P = {
    gray1: V,
    tit1: k,
    help: B,
    helppop1: C,
    qa: M,
    switch: "_switch_jbxco_30",
    gray2: q,
    left6: S
  },
  $ = {
    props: {
      config: {
        default: () => ({
          title: "合集",
          sub_title: "",
          pop: {
            title: "微博合集",
            desc: `1、合集功能可以让你对自己的视频作品进行分类管理。
              <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。
              <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。`
          }
        })
      },
      show: {
        default: !1,
        type: Boolean
      }
    },
    emits: ["change", "input", "update:modelValue"],
    setup(o, {
      emit: t
    }) {
      const e = d(!1),
        s = d(!1);
      return {
        changeSwitch: p => {
          t("input", p)
        },
        checkAlbum: e,
        showPop: s
      }
    }
  },
  H = {
    class: "fb"
  },
  N = ["innerHTML"];

function z(o, t, e, s, w, p) {
  const g = n("woo-fonticon"),
    m = n("woo-pop"),
    u = n("woo-box"),
    y = n("woo-box-item"),
    b = n("woo-switch");
  return _(), f(u, {
    align: "center",
    class: l(o.$style.switch)
  }, {
    default: c(() => [i(y, {
      align: "center"
    }, {
      default: c(() => [i(u, {
        align: "center"
      }, {
        default: c(() => [a("div", {
          class: l([o.$style.gray1, o.$style.tit1])
        }, r(e.config.title), 3), e.config.pop ? (_(), f(m, {
          key: 0,
          show: s.showPop,
          flow: "",
          direction: "right",
          align: "center",
          gap: "10",
          class: l(o.$style.help)
        }, {
          ctrl: c(() => [i(g, {
            value: "qaCircle",
            class: l(o.$style.qa),
            onMouseover: t[0] || (t[0] = v => s.showPop = !0),
            onMouseout: t[1] || (t[1] = v => s.showPop = !1)
          }, null, 8, ["class"])]),
          default: c(() => [a("div", {
            class: l(["wbpro-texta", o.$style.helppop1])
          }, [a("h4", H, r(e.config.pop.title), 1), a("p", {
            innerHTML: e.config.pop.desc
          }, null, 8, N)], 2)]),
          _: 1
        }, 8, ["show", "class"])) : h("", !0), e.config.sub_title ? (_(), j("div", {
          key: 1,
          class: l([o.$style.gray2, o.$style.left6])
        }, r(e.config.sub_title), 3)) : h("", !0)]),
        _: 1
      })]),
      _: 1
    }), a("div", null, [i(b, {
      ref: "checkAlbumRef",
      modelValue: e.show,
      size: .6875,
      "onUpdate:modelValue": s.changeSwitch
    }, null, 8, ["modelValue", "onUpdate:modelValue"])])]),
    _: 1
  }, 8, ["class"])
}
const A = {
    $style: P
  },
  E = x($, [
    ["render", z],
    ["__cssModules", A]
  ]);
export {
  E as
  default
};
