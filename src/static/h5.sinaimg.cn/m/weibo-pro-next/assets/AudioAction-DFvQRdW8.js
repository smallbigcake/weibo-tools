import {
  _ as y,
  l as _,
  m as f,
  D as k,
  i as b,
  p as i,
  E as g,
  n as c,
  B as p,
  C as v,
  U as w,
  I as C,
  ac as h,
  x as q,
  r as N,
  b as m
} from "./index-Xve1TSN5.js";
const S = "_container_1l33q_6",
  $ = "_title_1l33q_16",
  A = "_desc_1l33q_23",
  B = "_btn_1l33q_33",
  M = "_close_1l33q_41",
  O = {
    container: S,
    title: $,
    desc: A,
    btn: B,
    close: M
  },
  V = {
    setup() {
      var a;
      const {
        isAudio: e
      } = h(), {
        proxy: t
      } = q(), l = N(!1), o = [{
        background: "https://h5.sinaimg.cn/upload/100/1474/2024/04/22/audio_compose_prompt_background.png",
        key: "mobile_can_audio",
        title: "手机端支持音频发布了",
        desc: `打开微博发布器，点击右下角+，选择“音频”，即可发布，更多问题请查看微博 <a target="_blank" href='//weibo.com/ttarticle/p/show?id=2309404991583169675468'>音频发布流程</a>`
      }], n = m(() => {
        var s;
        for (let r = 0; r < o.length; r++)
          if (((s = window == null ? void 0 : window.$CONFIG) == null ? void 0 : s.flags[o[r].key]) === 0) return o[r];
        return null
      }), u = m(() => ({
        background: `url(${n.value.background})`,
        backgroundSize: "cover"
      })), d = () => {
        l.value = !1, t.$http.post("/ajax/changekey", {
          key: n.value.key
        }).then(s => {
          s.data
        })
      };
      return (a = n.value) != null && a.key && (l.value = !0), {
        curStyle: u,
        curOption: n,
        options: o,
        show: l,
        isAudio: e,
        close: d
      }
    }
  },
  x = ["innerHTML"];

function z(e, t, l, o, n, u) {
  const d = _("woo-fonticon"),
    a = _("woo-button");
  return o.isAudio && o.show ? (b(), f("div", {
    key: 0,
    class: c(["woo-pop-main", [e.$style.container]]),
    style: C(o.curStyle)
  }, [i("div", {
    class: c(e.$style.title)
  }, g(o.curOption.title), 3), i("div", {
    class: c(e.$style.desc),
    innerHTML: o.curOption.desc
  }, null, 10, x), i("div", {
    class: c(e.$style.close),
    onClick: t[0] || (t[0] = (...s) => o.close && o.close(...s))
  }, [p(d, {
    value: "cross"
  })], 2), i("div", {
    class: c(e.$style.btn)
  }, [p(a, {
    sort: "flat",
    fluid: "",
    onClick: o.close
  }, {
    default: v(() => t[1] || (t[1] = [w(" 我知道了 ")])),
    _: 1
  }, 8, ["onClick"])], 2)], 6)) : k("", !0)
}
const I = {
    $style: O
  },
  D = y(V, [
    ["render", z],
    ["__cssModules", I]
  ]);
export {
  D as
  default
};
