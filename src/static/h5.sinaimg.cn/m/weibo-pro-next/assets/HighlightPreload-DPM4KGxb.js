var V = (m, w, l) => new Promise((v, f) => {
  var y = o => {
      try {
        a(l.next(o))
      } catch (u) {
        f(u)
      }
    },
    i = o => {
      try {
        a(l.throw(o))
      } catch (u) {
        f(u)
      }
    },
    a = o => o.done ? v(o.value) : Promise.resolve(o.value).then(y, i);
  a((l = l.apply(m, w)).next())
});
import {
  d as H,
  x as I,
  r as b,
  aJ as L,
  w as E,
  A as P,
  l as c,
  m as g,
  D as h,
  i as p,
  p as n,
  B as r,
  C as _,
  n as s,
  aD as z,
  _ as B
} from "./index-Xve1TSN5.js";
const M = {
    key: 0
  },
  U = H({
    __name: "HighlightPreload",
    props: {
      duration: {
        default: 0
      }
    },
    emits: ["change"],
    setup(m, {
      emit: w
    }) {
      var j;
      const l = m,
        v = w,
        f = {
          public: 1,
          all: 2
        },
        y = (j = I()) == null ? void 0 : j.proxy,
        i = b(!1),
        a = b("all"),
        o = b(!1),
        u = L(null);

      function $() {
        return V(this, null, function*() {
          try {
            const t = {};
            l.duration && (t.video_duration = l.duration);
            const e = yield y.$http.get("/ajax/multimedia/getHighlightConfig", {
              params: t
            });
            e.data.ok > 0 && e.data.data && (u.value = e.data.data, o.value = !!e.data.data.highlight_preheat_alert_message, (e.data.data.allow_highlight_preheat === 1 || e.data.data.allow_highlight_preheat === 2) && (i.value = !0, a.value = e.data.data.allow_highlight_preheat === 1 ? "public" : "all"))
          } catch (t) {
            console.warn("获取AI高光片段配置失败:", t), o.value = !1
          }
        })
      }

      function O() {
        const t = i.value ? f[a.value] : 0;
        v("change", {
          enabled: i.value,
          allowHighlightPreheat: t
        })
      }
      return E([i, a], () => {
        O()
      }), E(() => l.duration, (t, e) => {
        t && t !== e && $()
      }), P(() => {
        l.duration > 0 && $()
      }), (t, e) => {
        const C = c("woo-box"),
          T = c("woo-box-item"),
          A = c("woo-switch"),
          D = c("woo-radio"),
          k = c("woo-divider");
        return o.value ? (p(), g("div", M, [n("div", {
          class: s(t.$style.module)
        }, [r(C, {
          align: "center",
          class: s([t.$style.switch, !i.value && t.$style.switchOff])
        }, {
          default: _(() => [r(T, {
            align: "center"
          }, {
            default: _(() => [r(C, {
              align: "center",
              class: s(t.$style.headerContent)
            }, {
              default: _(() => {
                var d;
                return [n("div", {
                  class: s([t.$style.gray1, t.$style.tit1])
                }, " 开启AI高光片段 ", 2), r(z, {
                  title: "AI高光片段说明",
                  desc: (d = u.value) == null ? void 0 : d.highlight_preheat_alert_message
                }, null, 8, ["desc"]), i.value ? (p(), g("div", {
                  key: 0,
                  class: s(t.$style.descText)
                }, [e[3] || (e[3] = n("span", null, "AI 会帮你自动完成：生成 1—3 条高光视频、生成配套文案，并", -1)), n("span", {
                  class: s(t.$style.descEmphasis)
                }, "自动发布", 2), e[4] || (e[4] = n("span", null, "。", -1))], 2)) : h("", !0)]
              }),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }), i.value ? h("", !0) : (p(), g("div", {
            key: 0,
            class: s(t.$style.trafficEstimate)
          }, " 预估流量+35% ", 2)), r(A, {
            modelValue: i.value,
            "onUpdate:modelValue": e[0] || (e[0] = d => i.value = d),
            size: .6875
          }, null, 8, ["modelValue"])]),
          _: 1
        }, 8, ["class"]), i.value ? (p(), g("div", {
          key: 0,
          class: s(t.$style.distributionList)
        }, [r(D, {
          modelValue: a.value,
          "onUpdate:modelValue": e[1] || (e[1] = d => a.value = d),
          value: "all",
          size: "14",
          class: s(t.$style.distributionOption)
        }, {
          default: _(() => [n("span", {
            class: s(t.$style.distributionTitle)
          }, "全站分发", 2), n("span", {
            class: s(t.$style.distributionDesc)
          }, "主页、关注流、公域可见，覆盖更广，流量机会更多", 2)]),
          _: 1
        }, 8, ["modelValue", "class"]), r(D, {
          modelValue: a.value,
          "onUpdate:modelValue": e[2] || (e[2] = d => a.value = d),
          value: "public",
          size: "14",
          class: s(t.$style.distributionOption)
        }, {
          default: _(() => [n("span", {
            class: s(t.$style.distributionTitle)
          }, "仅推荐分发", 2), n("span", {
            class: s(t.$style.distributionDesc)
          }, "仅在公域分发，不进入主页和关注流", 2)]),
          _: 1
        }, 8, ["modelValue", "class"])], 2)) : h("", !0)], 2), r(k, {
          "border-color": "var(--w-card-border)",
          class: s([t.$style.divider, !i.value && t.$style.closedDivider])
        }, null, 8, ["class"])])) : h("", !0)
      }
    }
  }),
  N = "_module_jgfwi_4",
  G = "_headerContent_jgfwi_8",
  R = "_descText_jgfwi_12",
  S = "_descEmphasis_jgfwi_23",
  J = "_trafficEstimate_jgfwi_28",
  q = "_gray1_jgfwi_36",
  F = "_tit1_jgfwi_40",
  K = "_distributionList_jgfwi_52",
  Q = "_distributionOption_jgfwi_60",
  W = "_distributionTitle_jgfwi_74",
  X = "_distributionDesc_jgfwi_80",
  Y = "_divider_jgfwi_87",
  Z = "_closedDivider_jgfwi_91",
  x = "_switchOff_jgfwi_107",
  tt = {
    module: N,
    headerContent: G,
    descText: R,
    descEmphasis: S,
    trafficEstimate: J,
    gray1: q,
    tit1: F,
    distributionList: K,
    distributionOption: Q,
    distributionTitle: W,
    distributionDesc: X,
    divider: Y,
    closedDivider: Z,
    switch: "_switch_jgfwi_95",
    switchOff: x
  },
  et = {
    $style: tt
  },
  at = B(U, [
    ["__cssModules", et]
  ]);
export {
  at as
  default
};
