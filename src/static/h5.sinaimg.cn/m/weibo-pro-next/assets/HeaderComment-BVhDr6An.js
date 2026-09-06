import {
  _ as h,
  ay as k,
  l as d,
  m,
  i as n,
  B as g,
  a1 as D,
  h as r,
  D as i,
  C as _,
  p as u,
  n as o,
  E as f,
  U as p,
  ac as I,
  b as y
} from "./index-D53O_Npi.js";
const C = "_abox1_11dty_2",
  x = "_gap1_11dty_5",
  B = "_gap2_11dty_12",
  A = "_tit1_11dty_15",
  N = "_help_11dty_20",
  M = "_tit2_11dty_23",
  S = "_text1_11dty_27",
  T = "_linkb_11dty_36",
  V = {
    abox1: C,
    gap1: x,
    gap2: B,
    tit1: A,
    help: N,
    tit2: M,
    text1: S,
    linkb: T
  },
  $ = {
    props: {
      showMoreDetail: {
        default: !1
      },
      videoDescInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      definition: [Number, String]
    },
    setup(e) {
      const {
        isAudio: s,
        isRss: c
      } = I(), t = y(() => {
        var a;
        return !e.definition || !e.videoDescInfo.dimensions ? (a = e == null ? void 0 : e.videoDescInfo) == null ? void 0 : a.uploadTips : e.definition >= e.videoDescInfo.dimensions ? e.videoDescInfo.positive : e.videoDescInfo.negative
      }), v = y(() => !e.definition || !e.videoDescInfo.dimensions ? "" : e.definition >= e.videoDescInfo.dimensions ? "warn" : "error"), b = y(() => s.value ? {
        title: "发布音频",
        sub_title: "本地上传",
        desc: "请上传1GB以下，10秒以上的普通话/英文音频",
        pop: {
          title: "疑问咨询",
          desc: "发布遇到问题，联系<a href='https://weibo.com/u/3860143361' target='_blank'>@微博音频</a>"
        }
      } : {
        title: "上传视频",
        desc: t.value,
        icon: v.value
      });
      return {
        isAudio: s,
        comment: b,
        isRss: c
      }
    },
    components: {
      Action: k
    },
    data() {
      return {
        showPop: !1
      }
    }
  };

function j(e, s, c, t, v, b) {
  const a = d("Action"),
    l = d("woo-box"),
    w = d("woo-tip");
  return n(), m("div", {
    class: o(e.$style.abox1)
  }, [g(l, {
    align: "center",
    class: o(e.$style.gap1)
  }, {
    default: _(() => [u("div", {
      class: o(e.$style.tit1)
    }, f(t.comment.title), 3), t.comment.pop ? (n(), r(a, {
      key: 0,
      timeout: "300",
      direction: "down",
      width: "unset",
      title: t.comment.pop.title,
      desc: t.comment.pop.desc,
      class: o(e.$style.help)
    }, null, 8, ["title", "desc", "class"])) : i("", !0)]),
    _: 1
  }, 8, ["class"]), D(e.$slots, "default"), t.isRss ? i("", !0) : (n(), r(l, {
    key: 0,
    align: "center",
    justify: "between",
    class: o(e.$style.gap2)
  }, {
    default: _(() => [g(l, {
      align: "center"
    }, {
      default: _(() => [t.comment.sub_title ? (n(), m("div", {
        key: 0,
        class: o(e.$style.tit2)
      }, f(t.comment.sub_title), 3)) : i("", !0), t.comment.icon ? (n(), r(w, {
        key: 1,
        type: t.comment.icon
      }, null, 8, ["type"])) : i("", !0), u("div", {
        class: o([e.$style.text1])
      }, f(t.comment.desc), 3)]),
      _: 1
    }), t.isAudio && !c.showMoreDetail ? (n(), m("div", {
      key: 0,
      class: o(e.$style.text1)
    }, [s[0] || (s[0] = p(" 想用其他账号发布？点击")), u("a", {
      href: "https://m.weibo.cn/cp/audio/guide?showmenu=0&topnavstyle=1&immersiveScroll=100",
      target: "_blank",
      class: o(e.$style.linkb)
    }, "申请入驻", 2)], 2)) : i("", !0)]),
    _: 1
  }, 8, ["class"]))], 2)
}
const E = {
    $style: V
  },
  z = h($, [
    ["render", j],
    ["__cssModules", E]
  ]);
export {
  z as
  default
};
