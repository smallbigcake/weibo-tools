import {
  _ as w,
  l as n,
  h,
  i as b,
  C as l,
  B as i,
  p as d,
  n as c,
  D as g,
  E as _,
  U as x
} from "./index-D53O_Npi.js";
const v = "_ai_qauo0_2",
  L = "_box_qauo0_9",
  P = "_cpic_qauo0_15",
  k = "_t1_qauo0_23",
  C = "_t2_qauo0_43",
  q = "_t3_qauo0_50",
  D = {
    ai: v,
    box: L,
    cpic: P,
    t1: k,
    t2: C,
    t3: q
  },
  $ = {
    name: "AiAudio",
    props: {
      aiPublish: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {}
    },
    created() {
      this.actionLog({
        act_code: "8343"
      })
    },
    computed: {
      text() {
        var t, e;
        return ((e = (t = this.aiPublish) == null ? void 0 : t.button) == null ? void 0 : e.text) || "去看看"
      },
      newDescription() {
        var s;
        const t = (s = this.aiPublish) == null ? void 0 : s.description;
        if (!t) return "";
        const e = 16;
        if (this.calculateMixedLength(t) <= e) return `根据热搜#${t}#生成`;
        let a = 0,
          u = "";
        for (; a < t.length && !(this.calculateMixedLength(u + t[a]) > e);) u += t[a], a++;
        return `根据热搜#${u}...#生成`
      }
    },
    methods: {
      goToDetail() {
        var t, e;
        this.actionLog({
          act_code: "8344"
        }), window.open((e = (t = this.aiPublish) == null ? void 0 : t.button) == null ? void 0 : e.url, "_blank")
      },
      calculateMixedLength(t) {
        let e = 0;
        for (const o of t) e += /[\u4e00-\u9fa5]/.test(o) ? 1 : .5;
        return e
      }
    }
  };

function A(t, e, o, a, u, s) {
  const p = n("woo-picture"),
    f = n("Icons"),
    m = n("woo-divider"),
    r = n("woo-box"),
    y = n("woo-button");
  return b(), h(r, {
    class: c(t.$style.box),
    justify: "between",
    align: "center"
  }, {
    default: l(() => [i(r, {
      style: {
        "min-width": "0"
      }
    }, {
      default: l(() => [i(p, {
        class: c(t.$style.cpic),
        src: o.aiPublish.cover
      }, null, 8, ["class", "src"]), i(r, {
        direction: "y",
        justify: "center",
        style: {
          "min-width": "0"
        }
      }, {
        default: l(() => [i(r, null, {
          default: l(() => [i(f, {
            symbol: "audioAi",
            class: c(t.$style.ai)
          }, null, 8, ["class"]), d("div", {
            class: c(t.$style.t1)
          }, _(o.aiPublish.title), 3), o.aiPublish.description ? (b(), h(m, {
            key: 0,
            direction: "y",
            "border-color": "#bdbdbd"
          })) : g("", !0), d("div", {
            class: c(t.$style.t2)
          }, _(s.newDescription), 3)]),
          _: 1
        }), d("div", {
          class: c(t.$style.t3)
        }, _(o.aiPublish.sub_title), 3)]),
        _: 1
      })]),
      _: 1
    }), d("div", null, [i(y, {
      onClick: s.goToDetail,
      size: "s"
    }, {
      default: l(() => [x(_(s.text), 1)]),
      _: 1
    }, 8, ["onClick"])])]),
    _: 1
  }, 8, ["class"])
}
const M = {
    $style: D
  },
  N = w($, [
    ["render", A],
    ["__cssModules", M]
  ]);
export {
  N as
  default
};
