import {
  _ as O,
  l as _,
  m as c,
  i as m,
  p as f,
  B as r,
  C as p,
  n as o,
  U as w,
  E as N,
  D as I,
  G as z,
  r as V,
  b as M,
  w as A,
  af as U
} from "./index-Xve1TSN5.js";
const P = "_gap1_16uwp_2",
  R = "_gap2_16uwp_7",
  j = "_gray1_16uwp_21",
  q = "_tit1_16uwp_25",
  H = "_star_16uwp_30",
  J = "_price_dis_16uwp_37",
  K = "_error_16uwp_44",
  L = "_yuan_16uwp_51",
  Q = "_label_16uwp_56",
  W = "_labelb_16uwp_60",
  X = "_timer_16uwp_64",
  Y = "_colon_16uwp_68",
  Z = {
    gap1: P,
    gap2: R,
    gray1: j,
    tit1: q,
    star: H,
    price_dis: J,
    error: K,
    yuan: L,
    label: Q,
    labelb: W,
    timer: X,
    colon: Y
  },
  x = {
    props: {
      duration: {
        type: Number,
        default: 600
      },
      payInfo: {}
    },
    emits: ["change"],
    setup(l, {
      emit: s
    }) {
      var D, T, E;
      const t = V(void 0),
        e = V(""),
        d = V(""),
        u = V(""),
        y = V("");
      ((D = l.payInfo) == null ? void 0 : D.free_duration) === 60 ? e.value = "01:00" : ((T = l.payInfo) == null ? void 0 : T.free_duration) === 10 ? e.value = "00:10" : (E = l.payInfo) != null && E.free_duration && (e.value = "select");
      const S = M(() => {
          if (k(), t.value === void 0) return !1;
          const n = t.value >= .1 && t.value <= 200,
            a = t.value.toString(),
            g = a.indexOf("."),
            C = g === -1 || a.length - g - 1 === 1;
          return !n || !C
        }),
        v = n => {
          n || (n = "00");
          const a = Number.parseInt(n, 10);
          return a < 10 ? n = `0${a}` : n = String(a), n.replace(/\D/g, "")
        },
        b = (n, a) => {
          n < 10 && n.length < 2 && U(() => {
            a === "minutes" ? d.value = v(d.value) : u.value = v(u.value)
          })
        },
        i = n => {
          let a = d.value.replace(/\D/g, "");
          a > 60 ? a = n : a.length > 2 && (a = a.slice(-2)), U(() => {
            d.value = a, k()
          })
        },
        $ = n => {
          let a = u.value.replace(/\D/g, "");
          u.value > 59 ? a = n : a.length > 2 && (a = a.slice(-2)), U(() => {
            u.value = a, k()
          })
        };
      A(() => d.value, (n, a) => {
        i(a)
      }), A(() => u.value, (n, a) => {
        $(a)
      });
      const B = M(() => `${d.value}:${u.value}`),
        F = M(() => e.value === "select" ? B.value : e.value);

      function G(n) {
        const a = n.split(":"),
          g = Number.parseInt(a[0] ? a[0] : 0, 10),
          C = Number.parseInt(a[1] ? a[1] : 0, 10);
        return g * 60 + C
      }

      function k() {
        const n = G(F.value);
        n > l.duration ? y.value = "已超出音频总时长" : +u.value < 10 && +d.value == 0 ? y.value = "试听时长最少10秒" : y.value = "", s("change", {
          price: t.value,
          duration: n
        })
      }
      return {
        secondsToMinutesSeconds: n => {
          const a = Math.floor(n / 60),
            g = n % 60;
          return `${a.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}`
        },
        price: t,
        isComply: S,
        type: e,
        select: B,
        minutes: d,
        seconds: u,
        timeError: y,
        formatSix: b
      }
    },
    components: {}
  },
  h = {
    key: 1
  };

function ee(l, s, t, e, d, u) {
  const y = _("woo-box"),
    S = _("woo-box-item"),
    v = _("woo-input"),
    b = _("woo-radio");
  return m(), c("div", {
    class: o(t.payInfo && l.$style.pay)
  }, [f("div", {
    class: o(l.$style.gap1)
  }, [r(y, {
    align: "center",
    class: o(l.$style.switch)
  }, {
    default: p(() => [r(S, {
      align: "center"
    }, {
      default: p(() => [r(y, {
        align: "center"
      }, {
        default: p(() => [f("div", {
          class: o([l.$style.gray1, l.$style.tit1])
        }, " 付费设置 ", 2)]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"]), r(y, {
    direction: "y"
  }, {
    default: p(() => [r(y, {
      align: "center",
      class: o(l.$style.gap2)
    }, {
      default: p(() => [f("div", {
        class: o([l.$style.gray1, l.$style.tit1])
      }, [s[8] || (s[8] = w(" 付费内容价格")), f("span", {
        class: o(l.$style.star)
      }, "*", 2)], 2), t.payInfo ? (m(), c("div", {
        key: 0,
        class: o(l.$style.price_dis)
      }, N(t.payInfo.price) + "元 ", 3)) : (m(), c("div", h, [r(v, {
        modelValue: e.price,
        "onUpdate:modelValue": s[0] || (s[0] = i => e.price = i),
        min: "0.1",
        max: "200",
        placeholder: "输入售价（0.1-200）",
        error: e.isComply && e.price !== "",
        type: "number"
      }, null, 8, ["modelValue", "error"]), f("span", {
        class: o(l.$style.yuan)
      }, "元", 2), e.isComply ? (m(), c("span", {
        key: 0,
        class: o(l.$style.error)
      }, "请输入金额 0.1-200 元，最小单位为角(一位小数)", 2)) : I("", !0)]))]),
      _: 1
    }, 8, ["class"]), f("div", {
      class: o([l.$style.gray1, l.$style.tit1, l.$style.gap2])
    }, [s[12] || (s[12] = w(" 免费试听时长")), f("span", {
      class: o(l.$style.star)
    }, "*", 2), r(b, {
      modelValue: e.type,
      "onUpdate:modelValue": s[1] || (s[1] = i => e.type = i),
      value: "00:10",
      size: "16",
      class: o([l.$style.label, e.type === "text" && l.$style.labelb]),
      disabled: t.payInfo
    }, {
      default: p(() => s[9] || (s[9] = [w(" 00:10 ")])),
      _: 1
    }, 8, ["modelValue", "class", "disabled"]), r(b, {
      modelValue: e.type,
      "onUpdate:modelValue": s[2] || (s[2] = i => e.type = i),
      value: "01:00",
      size: "16",
      disabled: t.payInfo,
      class: o([l.$style.label, e.type === "pictext" && l.$style.labelb])
    }, {
      default: p(() => s[10] || (s[10] = [w(" 01:00 ")])),
      _: 1
    }, 8, ["modelValue", "disabled", "class"]), r(b, {
      modelValue: e.type,
      "onUpdate:modelValue": s[3] || (s[3] = i => e.type = i),
      value: "select",
      size: "16",
      class: o([l.$style.label, l.$style.labelb]),
      disabled: t.payInfo
    }, {
      default: p(() => s[11] || (s[11] = [w(" 自定义 ")])),
      _: 1
    }, 8, ["modelValue", "class", "disabled"]), e.type === "select" && !t.payInfo ? (m(), c(z, {
      key: 0
    }, [r(v, {
      modelValue: e.minutes,
      "onUpdate:modelValue": s[4] || (s[4] = i => e.minutes = i),
      class: o(l.$style.timer),
      onBlur: s[5] || (s[5] = i => e.formatSix(e.minutes, "minutes"))
    }, null, 8, ["modelValue", "class"]), f("span", {
      class: o(l.$style.colon)
    }, ":", 2), r(v, {
      modelValue: e.seconds,
      "onUpdate:modelValue": s[6] || (s[6] = i => e.seconds = i),
      class: o(l.$style.timer),
      onBlur: s[7] || (s[7] = i => e.formatSix(e.seconds))
    }, null, 8, ["modelValue", "class"]), e.timeError && e.minutes && e.seconds ? (m(), c("span", {
      key: 0,
      class: o(l.$style.error)
    }, N(e.timeError), 3)) : I("", !0)], 64)) : e.type === "select" ? (m(), c(z, {
      key: 1
    }, [t.payInfo ? (m(), c("span", {
      key: 0,
      class: o(l.$style.price_dis)
    }, N(e.secondsToMinutesSeconds(t.payInfo.free_duration)), 3)) : I("", !0)], 64)) : I("", !0)], 2)]),
    _: 1
  })], 2)], 2)
}
const le = {
    $style: Z
  },
  ne = O(x, [
    ["render", ee],
    ["__cssModules", le]
  ]);
export {
  ne as
  default
};
