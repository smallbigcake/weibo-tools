import {
  _ as v,
  l as k,
  O as C,
  P as p,
  h as w,
  i as e,
  C as d,
  B as m,
  p as i,
  n as y,
  m as l,
  D as u,
  E as _,
  U as s,
  ac as B
} from "./index-Xve1TSN5.js";
const h = "_layer1_9a8j7_2",
  j = "_layer2_9a8j7_9",
  A = "_bg1out_9a8j7_12",
  V = "_bg1_9a8j7_12",
  E = "_toastMsg_9a8j7_21",
  M = "_bind_9a8j7_26",
  T = {
    layer1: h,
    layer2: j,
    bg1out: A,
    bg1: V,
    toastMsg: E,
    bind: M
  },
  N = {
    props: {
      showToast: Boolean,
      videoEdit: Boolean,
      hasnav: Boolean,
      toastType: Number
    },
    setup() {
      const {
        goList: n,
        refresh: o,
        entry: a,
        comment: t,
        isAudio: c,
        isRssAll: f,
        isVideo: r,
        isAudioEdit: b
      } = B();
      return {
        goList: n,
        refresh: o,
        bind: () => {
          window.open("//weibo.com/upload/audio?autoRss=1", "_self")
        },
        entry: a,
        comment: t,
        isAudio: c,
        isRssAll: f,
        isVideo: r,
        isAudioEdit: b
      }
    }
  },
  x = {
    key: 0
  },
  D = {
    key: 0
  },
  L = {
    key: 1
  },
  R = {
    key: 2
  },
  S = {
    key: 0
  },
  z = {
    key: 1
  },
  O = {
    key: 1
  };

function P(n, o, a, t, c, f) {
  const r = k("woo-box"),
    b = k("woo-button");
  return C((e(), w(r, {
    ref: "video",
    align: "center",
    justify: "center",
    class: y(["wbpro-layer", [n.$style.layer1, !a.hasnav && n.$style.layer2]]),
    direction: "y"
  }, {
    default: d(() => [m(r, {
      style: {
        "margin-bottom": "40px"
      },
      align: "center",
      direction: "y"
    }, {
      default: d(() => [i("div", {
        class: y(n.$style.bg1out)
      }, [i("div", {
        class: y(n.$style.bg1)
      }, null, 2)], 2), m(r, {
        class: y(n.$style.toastMsg)
      }, {
        default: d(() => [a.toastType === 1 ? (e(), l("div", x, [t.entry === "edit" || t.isAudioEdit ? (e(), l("span", D, _(t.isAudio ? "音频" : "视频") + "信息更改成功，稍等片刻自动更新", 1)) : t.isRssAll ? (e(), l("span", L, o[1] || (o[1] = [s("全部导入的音频将在2个工作日内完成审核，审核完成后自动发布，请留意来自 "), i("a", {
          href: "https://weibo.com/u/3860143361",
          target: "_blank"
        }, "@微博音频", -1), s(" 的私信")]))) : (e(), l("span", R, [t.isVideo ? (e(), l("span", S, [o[2] || (o[2] = s(" 视频已上传成功，将在转码后发布，发布进度请查")), o[3] || (o[3] = i("br", null, null, -1)), o[4] || (o[4] = s("看")), a.hasnav && t.isVideo ? (e(), l("a", {
          key: 0,
          style: {
            "margin-left": "4px"
          },
          onClick: o[0] || (o[0] = (...g) => t.goList && t.goList(...g))
        }, "视频管理> ")) : u("", !0), o[5] || (o[5] = s("请留意来自 ")), o[6] || (o[6] = i("a", {
          href: "https://weibo.com/u/5186027114",
          target: "_blank"
        }, " @微博视频 ", -1)), o[7] || (o[7] = s(" 的私信通知 "))])) : (e(), l("span", z, o[8] || (o[8] = [s(" 音频已上传成功，将在转码完成后自动发出"), i("br", null, null, -1), s("请留意来自 "), i("a", {
          href: "https://weibo.com/u/3860143361",
          target: "_blank"
        }, " @微博音频 ", -1), s(" 的私信通知")])))]))])) : a.toastType === 2 ? (e(), l("div", O, [s(_(t.comment.timer), 1), o[9] || (o[9] = i("a", {
          target: "_blank",
          href: "https://me.weibo.com/content/timer"
        }, "点击查看 ", -1))])) : u("", !0)]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }), m(r, null, {
      default: d(() => [t.isAudio ? (e(), w(b, {
        key: 0,
        sort: "flat",
        kind: "primary",
        class: y(n.$style.bind),
        onClick: t.bind
      }, {
        default: d(() => [s(_(t.comment.bind), 1)]),
        _: 1
      }, 8, ["class", "onClick"])) : u("", !0), m(b, {
        sort: "flat",
        kind: "primary",
        onClick: t.refresh
      }, {
        default: d(() => [s(_(t.comment.back), 1)]),
        _: 1
      }, 8, ["onClick"])]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])), [
    [p, a.showToast && !a.videoEdit]
  ])
}
const U = {
    $style: T
  },
  F = v(N, [
    ["render", P],
    ["__cssModules", U]
  ]);
export {
  F as
  default
};
