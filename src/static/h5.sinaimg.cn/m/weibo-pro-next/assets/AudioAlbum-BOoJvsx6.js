const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/SwitchHeader-BqJOdKzo.js", "assets/index-Xve1TSN5.js", "assets/index-BQia-I5S.css", "assets/SwitchHeader-D7nZZNq9.css", "assets/AudioAlbumAddLayer-BwtguooD.js", "assets/AudioCover-CbJkwMFm.js", "assets/AudioCover-oau8L0R3.css", "assets/AudioAlbumAddLayer-C6gXn3iy.css"]))) => i.map(i => d[i]);
var U = Object.defineProperty,
  D = Object.defineProperties;
var M = Object.getOwnPropertyDescriptors;
var T = Object.getOwnPropertySymbols;
var P = Object.prototype.hasOwnProperty,
  R = Object.prototype.propertyIsEnumerable;
var B = (l, e, t) => e in l ? U(l, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : l[e] = t,
  N = (l, e) => {
    for (var t in e || (e = {})) P.call(e, t) && B(l, t, e[t]);
    if (T)
      for (var t of T(e)) R.call(e, t) && B(l, t, e[t]);
    return l
  },
  O = (l, e) => D(l, M(e));
import {
  _ as z,
  al as j,
  l as i,
  m as I,
  i as C,
  B as _,
  D as F,
  p,
  G,
  H as q,
  h as J,
  C as m,
  n as b,
  U as H,
  ah as S,
  ac as K,
  x as Q,
  r as f,
  w as W,
  b as X,
  A as Y,
  aN as Z,
  af as $
} from "./index-Xve1TSN5.js";
const ee = "_gap1_xb4wb_2",
  le = "_top2_xb4wb_11",
  oe = "_scroll_xb4wb_14",
  se = "_label2_xb4wb_19",
  te = "_albumIcon_xb4wb_22",
  ae = "_icon1_xb4wb_29",
  ne = "_add_xb4wb_33",
  ce = "_icon_xb4wb_29",
  ue = "_bubble_xb4wb_48",
  de = {
    gap1: ee,
    top2: le,
    scroll: oe,
    label2: se,
    albumIcon: te,
    icon1: ae,
    add: ne,
    icon: ce,
    bubble: ue
  },
  re = {
    props: {
      cluster_id: {},
      is_new_cluster: {}
    },
    emits: ["change"],
    setup(l, {
      emit: e
    }) {
      const {
        isRss: t
      } = K(), {
        proxy: o
      } = Q(), v = f(!1), g = f(!1), h = f(null), c = f(), s = f([]), A = () => {
        o.$http.get("/ajax/multimedia/get_all", {
          params: {
            type: 3
          }
        }).then(a => {
          a.data.ok && a.data.data && (s.value = a.data.data, s.value.forEach((n, d) => {
            if (+n.cluster_id == +l.cluster_id) {
              v.value = !0, c.value = n.cluster_id_str, e("change", [c.value]);
              const [r] = s.value.splice(d, 1);
              r.pop = !1, s.value.unshift(r), l.is_new_cluster && setTimeout(() => {
                r.pop = !0, s.value.splice(0, 1, r), setTimeout(() => {
                  r.pop = !1, s.value.splice(0, 1, r)
                }, 5e3)
              }, 100)
            }
          }))
        })
      };
      t.value || A(), W(() => l.cluster_id, () => {
        v.value || (t.value ? A() : s.value.forEach((a, n) => {
          if (+a.cluster_id == +l.cluster_id) {
            v.value = !0, c.value = a.cluster_id_str, e("change", [c.value]);
            const [d] = s.value.splice(n, 1);
            d.pop = !1, s.value.unshift(d), l.is_new_cluster && setTimeout(() => {
              d.pop = !0, s.value.splice(0, 1, d), setTimeout(() => {
                d.pop = !1, s.value.splice(0, 1, d)
              }, 5e3)
            }, 100)
          }
        }))
      });
      const k = X(() => !!c.value),
        E = () => {
          h.value = null, g.value = !0
        },
        y = f(),
        L = ({
          name: a,
          id: n,
          type: d,
          index: r,
          cover: V
        }) => {
          d ? s.value.splice(r, 1, {
            name: a,
            id: n,
            cluster_id: n,
            cluster_id_str: n,
            checked: !0,
            cover: V
          }) : (c.value = n, e("change", [c.value]), s.value.push({
            name: a,
            id: n,
            cluster_id: n,
            cluster_id_str: n,
            checked: !0,
            cover: V
          }), $(() => {
            y.value.scrollTop = y.value.scrollHeight
          }))
        },
        u = (a, n) => {
          h.value = O(N({}, a), {
            index: n
          }), g.value = !0
        },
        x = () => {
          c.value ? e("change", [c.value]) : (v.value = !1, e("change", ""))
        },
        w = () => {
          s.value = s.value.map(a => (a.pop = !1, a))
        };
      return Y(() => {
        window.addEventListener("scroll", w)
      }), Z(() => {
        window.removeEventListener("scroll", w)
      }), {
        show: v,
        checkedNum: k,
        albumList: s,
        showAddLayer: g,
        editObj: h,
        selectId: c,
        scrollEle: y,
        checkEmpty: x,
        addAlbum: L,
        add: E,
        edit: u,
        scroll: w
      }
    },
    components: {
      SwitchHeader: j(() => S(() => import("./SwitchHeader-BqJOdKzo.js"), __vite__mapDeps([0, 1, 2, 3]))),
      AudioAlbumAddLayer: j(() => S(() => import("./AudioAlbumAddLayer-BwtguooD.js"), __vite__mapDeps([4, 1, 2, 5, 6, 7])))
    }
  },
  ie = {
    key: 0
  },
  _e = {
    class: "wbpro-form"
  },
  be = ["value"],
  pe = ["onClick"];

function ve(l, e, t, o, v, g) {
  const h = i("SwitchHeader"),
    c = i("woo-radio"),
    s = i("woo-box-item"),
    A = i("woo-button"),
    k = i("woo-box"),
    E = i("woo-pop"),
    y = i("woo-fonticon"),
    L = i("AudioAlbumAddLayer");
  return C(), I("div", {
    class: b(l.$style.gap1)
  }, [_(h, {
    show: o.show,
    config: {
      title: "合集",
      sub_title: "添加合集，打造特色节目",
      pop: {
        title: "微博合集",
        desc: "合集功能可以让你对自己的多条音频作品进行分类管理。可以将不同主题的节目创建不同的合集"
      }
    },
    onInput: e[0] || (e[0] = u => o.show = !o.show)
  }, null, 8, ["show"]), o.show ? (C(), I("div", ie, [p("div", {
    ref: "scrollEle",
    class: b(l.$style.scroll),
    onScroll: e[2] || (e[2] = (...u) => o.scroll && o.scroll(...u))
  }, [(C(!0), I(G, null, q(o.albumList, (u, x) => (C(), J(k, {
    key: x,
    align: "center",
    class: b(l.$style.top2)
  }, {
    default: m(() => [_(c, {
      modelValue: o.selectId,
      "onUpdate:modelValue": [e[1] || (e[1] = w => o.selectId = w), o.checkEmpty],
      cancel: "true",
      class: b(l.$style.label2),
      value: u.cluster_id_str
    }, null, 8, ["modelValue", "class", "value", "onUpdate:modelValue"]), _(E, {
      show: u.pop,
      bubble: "",
      gap: "10",
      direction: "up",
      align: "center",
      style: {
        width: "100%"
      },
      flow: "",
      class: b(l.$style.bubble)
    }, {
      ctrl: m(() => [p("div", _e, [_(k, {
        align: "center"
      }, {
        default: m(() => [p("span", {
          class: b(l.$style.albumIcon)
        }, null, 2), _(s, null, {
          default: m(() => [p("input", {
            type: "text",
            disabled: "",
            value: u.name
          }, null, 8, be)]),
          _: 2
        }, 1024), p("div", {
          class: "num",
          onClick: w => o.edit(u, x)
        }, [_(A, {
          sort: "simple",
          kind: "default"
        }, {
          default: m(() => e[5] || (e[5] = [H(" 编辑 ")])),
          _: 1
        })], 8, pe)]),
        _: 2
      }, 1024)])]),
      default: m(() => [e[6] || (e[6] = H(" 已自动为您创建合集 "))]),
      _: 2
    }, 1032, ["show", "class"])]),
    _: 2
  }, 1032, ["class"]))), 128))], 34), p("div", {
    class: b(l.$style.add),
    onClick: e[3] || (e[3] = (...u) => o.add && o.add(...u))
  }, [_(y, {
    value: "add",
    class: b(l.$style.icon)
  }, null, 8, ["class"]), e[7] || (e[7] = p("span", null, "添加合集", -1))], 2), _(L, {
    editObj: o.editObj,
    show: o.showAddLayer,
    onClose: e[4] || (e[4] = u => o.showAddLayer = !1),
    onChange: o.addAlbum
  }, null, 8, ["editObj", "show", "onChange"])])) : F("", !0)], 2)
}
const we = {
    $style: de
  },
  he = z(re, [
    ["render", ve],
    ["__cssModules", we]
  ]);
export {
  he as
  default
};
