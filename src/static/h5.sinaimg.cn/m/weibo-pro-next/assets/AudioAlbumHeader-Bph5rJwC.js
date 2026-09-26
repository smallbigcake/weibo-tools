const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/AudioTip-D4UN50mb.js", "assets/index-Xve1TSN5.js", "assets/index-BQia-I5S.css", "assets/AudioTip-Be0fAqpZ.css", "assets/AudioPop-CpIqiXqs.js", "assets/AudioPop-CBpx-mp8.css"]))) => i.map(i => d[i]);
import {
  _ as m,
  al as a,
  l as t,
  h as f,
  i as A,
  C as n,
  U as l,
  p as r,
  B as p,
  n as v,
  ah as i,
  r as w
} from "./index-Xve1TSN5.js";
const g = "_gap1_1u1ob_2",
  P = {
    gap1: g
  },
  T = {
    setup() {
      const s = w(!1);
      return {
        show: s,
        click: () => {
          s.value = !s.value
        }
      }
    },
    components: {
      AudioTip: a(() => i(() => import("./AudioTip-D4UN50mb.js"), __vite__mapDeps([0, 1, 2, 3]))),
      AudioPop: a(() => i(() => import("./AudioPop-CpIqiXqs.js"), __vite__mapDeps([4, 1, 2, 5])))
    }
  };

function C(s, o, $, e, k, x) {
  const u = t("AudioPop"),
    _ = t("woo-pop"),
    d = t("AudioTip");
  return A(), f(d, {
    class: v(s.$style.gap1)
  }, {
    default: n(() => [o[2] || (o[2] = l(" 发布后，将导入您未发布的所有音频，并发布一条入驻微博。")), o[3] || (o[3] = r("br", null, null, -1)), o[4] || (o[4] = l(" 入驻微博将展示最新的一条音频，其他音频可在您个人主页音频签进行收听。 ")), p(_, {
      show: e.show,
      align: "center",
      gap: "10"
    }, {
      ctrl: n(() => [r("a", {
        onMousemove: o[0] || (o[0] = c => e.show = !0),
        onMouseout: o[1] || (o[1] = c => e.show = !1)
      }, "查看发布后样式", 32)]),
      default: n(() => [p(u)]),
      _: 1
    }, 8, ["show"])]),
    _: 1
  }, 8, ["class"])
}
const V = {
    $style: P
  },
  B = m(T, [
    ["render", C],
    ["__cssModules", V]
  ]);
export {
  B as
  default
};
