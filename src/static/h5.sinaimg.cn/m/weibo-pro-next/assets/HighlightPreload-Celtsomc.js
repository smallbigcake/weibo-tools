var D = Object.defineProperty;
var b = Object.getOwnPropertySymbols;
var P = Object.prototype.hasOwnProperty,
  G = Object.prototype.propertyIsEnumerable;
var x = (e, o, t) => o in e ? D(e, o, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : e[o] = t,
  H = (e, o) => {
    for (var t in o || (o = {})) P.call(o, t) && x(e, t, o[t]);
    if (b)
      for (var t of b(o)) G.call(o, t) && x(e, t, o[t]);
    return e
  };
var I = (e, o, t) => new Promise((n, r) => {
  var _ = l => {
      try {
        c(t.next(l))
      } catch (i) {
        r(i)
      }
    },
    h = l => {
      try {
        c(t.throw(l))
      } catch (i) {
        r(i)
      }
    },
    c = l => l.done ? n(l.value) : Promise.resolve(l.value).then(_, h);
  c((t = t.apply(e, o)).next())
});
import {
  _ as L,
  J as N,
  ay as T,
  l as f,
  m as y,
  D as k,
  i as w,
  p as S,
  B as g,
  C,
  n as u,
  G as V,
  H as E,
  I as M,
  E as R,
  x as B,
  r as v,
  w as $,
  A as F,
  aE as z
} from "./index-D53O_Npi.js";
const K = "_gap1_1my28_4",
  O = "_descText_1my28_13",
  j = "_gray1_1my28_23",
  J = "_tit1_1my28_27",
  U = {
    gap1: K,
    descText: O,
    gray1: j,
    tit1: J,
    switch: "_switch_1my28_38"
  },
  Y = z({
    template: `<div class="highlight-confirm-content">
    <p class="highlight-confirm-desc">开启后，AI 会帮你：</p>
    <p class="highlight-confirm-desc">1.从视频中截取 3 个精彩片段。</p>
    <p class="highlight-confirm-desc">2.AI自动生成配套的博文文案。</p>
    <p class="highlight-confirm-desc">3.仅在公域分发，个人主页不可见。</p>
    <label class="highlight-confirm-checkbox">
      <woo-checkbox v-model="checked" />
      <span>下次不再提示</span>
    </label>
  </div>`,
    props: {
      onChange: Function
    },
    data() {
      return {
        checked: !1
      }
    },
    watch: {
      checked(e) {
        var o;
        (o = this.onChange) == null || o.call(this, e)
      }
    }
  }),
  A = "SKIP_HIGHLIGHT_PRELOAD_CONFIRM",
  q = {
    emits: ["change"],
    props: {
      duration: {
        type: Number,
        default: 0
      }
    },
    setup(e, {
      emit: o
    }) {
      const {
        proxy: t
      } = B(), n = v(!1), r = v(!1), _ = v(null), h = () => I(this, null, function*() {
        try {
          const a = {};
          e.duration && (a.video_duration = e.duration);
          const s = yield t.$http.get("/ajax/multimedia/getHighlightConfig", {
            params: a
          });
          if (s.data && s.data.ok > 0) {
            const d = s.data.data;
            _.value = d, r.value = !!(d != null && d.highlight_preheat_alert_message)
          }
        } catch (a) {
          console.warn("获取高光预热配置失败:", a), r.value = !1
        }
      }), c = () => {
        o("change", {
          enabled: n.value
        })
      }, l = () => localStorage.getItem(A) === "true";
      let i = !1,
        m = !1;
      const p = () => {
        let a = !1;
        t.$_w_dialog({
          type: "confirm",
          title: "确认开启高光预热",
          message: "",
          btnConfirm: "确认开启",
          btnCancel: "取消",
          component: Y,
          componentProps: {
            onChange: s => {
              a = s
            }
          },
          action: () => {
            a && localStorage.setItem(A, "true"), t.actionLog({
              act_code: 10349,
              ext: `channel:pc|dshow:${a?"on":"off"}`
            }), m = !0, n.value = !0, c()
          },
          cancel: () => {
            t.actionLog({
              act_code: 10350,
              ext: `channel:pc|dshow:${a?"on":"off"}`
            })
          }
        })
      };
      return $(() => n.value, a => {
        if (i) {
          i = !1;
          return
        }
        if (a) {
          if (m) {
            m = !1, c();
            return
          }
          l() ? c() : (i = !0, n.value = !1, p())
        } else c()
      }), $(() => e.duration, (a, s) => {
        a && a !== s && h()
      }), F(() => {
        e.duration > 0 && h()
      }), {
        HighlightPreload: n,
        shouldShow: r,
        configData: _
      }
    },
    components: {
      Action: T
    },
    computed: H({}, N(["config"]))
  },
  Q = {
    key: 0
  };

function W(e, o, t, n, r, _) {
  const h = f("Action"),
    c = f("woo-box"),
    l = f("woo-box-item"),
    i = f("woo-switch"),
    m = f("woo-divider");
  return n.shouldShow ? (w(), y("div", Q, [S("div", {
    class: u(e.$style.gap1)
  }, [g(c, {
    align: "center",
    class: u(e.$style.switch)
  }, {
    default: C(() => {
      var p, a;
      return [g(l, {
        align: "center"
      }, {
        default: C(() => [g(c, {
          align: "center"
        }, {
          default: C(() => {
            var s;
            return [S("div", {
              class: u([e.$style.gray1, e.$style.tit1])
            }, " 高光预热 ", 2), g(h, {
              title: "高光预热说明",
              desc: (s = n.configData) == null ? void 0 : s.highlight_preheat_alert_message
            }, null, 8, ["desc"])]
          }),
          _: 1
        })]),
        _: 1
      }), (a = (p = n.configData) == null ? void 0 : p.highlight_preheat_descs) != null && a.length ? (w(), y("div", {
        key: 0,
        class: u(e.$style.descText)
      }, [(w(!0), y(V, null, E(n.configData.highlight_preheat_descs, (s, d) => (w(), y("span", {
        key: d,
        style: M({
          color: s.color
        })
      }, R(s.text), 5))), 128))], 2)) : k("", !0), g(i, {
        modelValue: n.HighlightPreload,
        "onUpdate:modelValue": o[0] || (o[0] = s => n.HighlightPreload = s),
        size: .6875
      }, null, 8, ["modelValue"])]
    }),
    _: 1
  }, 8, ["class"])], 2), g(m, {
    "border-color": "var(--w-card-border)",
    class: u(e.$style.gap1)
  }, null, 8, ["class"])])) : k("", !0)
}
const X = {
    $style: U
  },
  te = L(q, [
    ["render", W],
    ["__cssModules", X]
  ]);
export {
  te as
  default
};
