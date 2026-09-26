import {
  _ as S,
  r as B,
  b as y,
  w,
  l as r,
  m as c,
  i as n,
  p as u,
  B as i,
  C as d,
  n as a,
  U as f,
  G as N,
  H as D,
  h as E,
  D as O,
  E as R
} from "./index-Xve1TSN5.js";
const z = "_type_1vpmt_29",
  F = "_label3_1vpmt_32",
  I = "_gray1_1vpmt_37",
  M = "_tit1_1vpmt_41",
  P = "_gap1_1vpmt_50",
  U = {
    switch: "_switch_1vpmt_2",
    type: z,
    label3: F,
    gray1: I,
    tit1: M,
    gap1: P
  },
  j = {
    __name: "Type",
    props: {
      coCreationState: {
        type: Object,
        default: () => ({})
      },
      hideRepostOption: {
        type: Boolean,
        default: !1
      },
      selectedType: {
        type: Number,
        default: -1
      },
      onShowToast: {
        type: Function,
        default: () => {}
      }
    },
    emits: ["typeChange"],
    setup(b, {
      emit: g
    }) {
      const s = b,
        h = g,
        o = B(s.selectedType),
        p = [{
          name: "原创",
          show: !0,
          value: 0
        }, {
          name: "二创",
          show: !0,
          value: 2
        }, {
          name: "转载",
          show: !0,
          value: 1
        }],
        C = y(() => s.hideRepostOption ? p.filter(e => e.value !== 1) : p),
        v = y(() => {
          var e;
          return (e = s.coCreationState) == null ? void 0 : e.coCreation
        });
      w(() => s.selectedType, e => {
        o.value = e
      }), w(o, e => {
        h("typeChange", e)
      });

      function T(e) {
        e.value === 1 && v.value && s.onShowToast()
      }
      return (e, l) => {
        const V = r("woo-radio"),
          m = r("woo-box"),
          $ = r("woo-divider");
        return n(), c("div", null, [u("div", {
          class: a(e.$style.gap1)
        }, [i(m, {
          class: a(e.$style.switch),
          align: "center"
        }, {
          default: d(() => [u("div", {
            class: a(e.$style.tit1)
          }, l[1] || (l[1] = [f(" 类型"), u("span", null, "*", -1)]), 2), i(m, {
            align: "center",
            class: a(e.$style.type)
          }, {
            default: d(() => [(n(!0), c(N, null, D(C.value, (t, k) => (n(), c("div", {
              key: k
            }, [t.show ? (n(), E(V, {
              key: 0,
              modelValue: o.value,
              "onUpdate:modelValue": l[0] || (l[0] = _ => o.value = _),
              value: t.value,
              size: "16",
              class: a({
                [e.$style.label3]: !0,
                [e.$style.gray1]: t.value === o.value
              }),
              disabled: t.value === 1 && v.value,
              onClick: _ => T(t)
            }, {
              default: d(() => [f(R(t.name), 1)]),
              _: 2
            }, 1032, ["modelValue", "value", "class", "disabled", "onClick"])) : O("", !0)]))), 128))]),
            _: 1
          }, 8, ["class"])]),
          _: 1
        }, 8, ["class"])], 2), i($, {
          "border-color": "var(--w-card-border)",
          class: a(e.$style.gap1)
        }, null, 8, ["class"])])
      }
    }
  },
  G = {
    $style: U
  },
  L = S(j, [
    ["__cssModules", G]
  ]);
export {
  L as
  default
};
