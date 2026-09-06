var U = Object.defineProperty,
  I = Object.defineProperties;
var O = Object.getOwnPropertyDescriptors;
var N = Object.getOwnPropertySymbols;
var F = Object.prototype.hasOwnProperty,
  G = Object.prototype.propertyIsEnumerable;
var q = (e, t, s) => t in e ? U(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
  }) : e[t] = s,
  L = (e, t) => {
    for (var s in t || (t = {})) F.call(t, s) && q(e, s, t[s]);
    if (N)
      for (var s of N(t)) G.call(t, s) && q(e, s, t[s]);
    return e
  },
  D = (e, t) => I(e, O(t));
import {
  _ as V,
  l as v,
  m as $,
  i as b,
  B as i,
  C as r,
  h as j,
  D as B,
  n,
  U as T,
  x as J,
  v as K,
  s as Q,
  t as W,
  r as m,
  b as E,
  o as X,
  A as Y,
  p as g,
  S as Z
} from "./index-D53O_Npi.js";
const tt = "_pic_rkw7n_2",
  et = "_tab_rkw7n_9",
  st = "_tit_rkw7n_12",
  at = "_mar1_rkw7n_16",
  ot = "_wrap_rkw7n_23",
  nt = "_line_rkw7n_23",
  it = "_item_rkw7n_26",
  lt = "_item2_rkw7n_31",
  rt = "_con_rkw7n_34",
  ut = "_cut2_rkw7n_39",
  ct = "_btn1_rkw7n_42",
  _t = "_btn2_rkw7n_47",
  dt = "_right_rkw7n_54",
  mt = "_radio_rkw7n_57",
  vt = "_tabin_rkw7n_64",
  pt = {
    pic: tt,
    tab: et,
    tit: st,
    mar1: at,
    wrap: ot,
    line: nt,
    item: it,
    item2: lt,
    con: rt,
    cut2: ut,
    btn1: ct,
    btn2: _t,
    right: dt,
    radio: mt,
    tabin: vt
  },
  bt = {
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      toReview(e) {
        if (e) {
          const t = this.$route.query;
          this.$router.push({
            name: "MngCmt",
            query: D(L({}, t), {
              id: e
            })
          })
        }
      },
      goDetail() {
        var e, t;
        if ((t = (e = this.item) == null ? void 0 : e.user) != null && t.id && this.item.mblogid) {
          const s = this.$router.resolve({
            name: "bidDetail",
            params: {
              uid: this.item.user.id,
              id: this.item.mblogid
            }
          });
          window.open(s.href, "_blank")
        }
      }
    }
  },
  ft = ["innerHTML"];

function wt(e, t, s, h, x, c) {
  const p = v("woo-picture"),
    _ = v("woo-box-item"),
    l = v("woo-button"),
    d = v("woo-box"),
    f = v("woo-divider");
  return b(), $("div", null, [i(d, {
    align: "center",
    class: n(e.$style.item)
  }, {
    default: r(() => [s.item.bmiddle_pic ? (b(), j(p, {
      key: 0,
      class: n(e.$style.pic),
      src: s.item.bmiddle_pic,
      alt: "等比图"
    }, null, 8, ["class", "src"])) : B("", !0), i(_, {
      align: "center",
      class: n(e.$style.con)
    }, {
      default: r(() => [s.item.text ? (b(), $("div", {
        key: 0,
        class: n(["wbpro-cutword", e.$style.cut2]),
        innerHTML: s.item.text
      }, null, 10, ft)) : B("", !0)]),
      _: 1
    }, 8, ["class"]), i(d, {
      justify: "end",
      class: n(e.$style.right)
    }, {
      default: r(() => [i(l, {
        sort: "line",
        kind: "primary",
        size: "s",
        round: !1,
        class: n(e.$style.btn1),
        onClick: t[0] || (t[0] = M => c.goDetail())
      }, {
        default: r(() => t[2] || (t[2] = [T(" 查看原文 ")])),
        _: 1
      }, 8, ["class"]), i(l, {
        sort: "line",
        kind: "primary",
        size: "s",
        round: !1,
        class: n(e.$style.btn1),
        onClick: t[1] || (t[1] = M => c.toReview(s.item.idstr))
      }, {
        default: r(() => t[3] || (t[3] = [T(" 去审核 ")])),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), i(f, {
    class: n(e.$style.line)
  }, null, 8, ["class"])])
}
const yt = {
    $style: pt
  },
  kt = V(bt, [
    ["render", wt],
    ["__cssModules", yt]
  ]),
  gt = "_box_8es09_2",
  $t = "_tit_8es09_5",
  ht = "_tab_8es09_9",
  Mt = "_tabin_8es09_15",
  Ct = "_listbox_8es09_25",
  Lt = "_listitem_8es09_28",
  Dt = {
    box: gt,
    tit: $t,
    tab: ht,
    tabin: Mt,
    listbox: Ct,
    listitem: Lt
  },
  xt = {
    __name: "Approval",
    setup(e) {
      const {
        proxy: t
      } = J(), s = K(), h = Q(), x = W(), c = m([]), p = m(!1), _ = m(!1), l = m(!0), d = m(!1), f = m(0), M = m(""), w = m(h.query.tab || "approval"), A = E(() => s.getters.config), z = E(() => {
        var a, o, u, k;
        return ((o = (a = A.value) == null ? void 0 : a.flags) == null ? void 0 : o.ai_assistant_switcher) && ((k = (u = A.value) == null ? void 0 : u.flags) == null ? void 0 : k.enableAiComment)
      });

      function R(a) {
        w.value !== a && (w.value = a, x.replace({
          query: D(L({}, h.query), {
            tab: a
          })
        }), S(), C())
      }

      function S() {
        c.value = [], f.value = 0, p.value = !1, d.value = !1, _.value = !1
      }

      function C() {
        H()
      }

      function H() {
        l.value = !0, _.value = !1, d.value = !1, p.value = !1, f.value++;
        const a = w.value === "approval" ? "approval" : "ai_assistant";
        t.$http({
          url: "/ajax/approval/statuses",
          method: "get",
          params: {
            page: f.value,
            scene: a
          }
        }).then(o => {
          if (o && o.data && +o.data.ok == 1) {
            const u = o.data.data;
            u.statuses && (c.value = c.value.concat(u.statuses), l.value = !0), c.value.length === 0 && (p.value = !0, l.value = !1), u.max_id === 0 && (l.value = !1)
          } else o.data.ok === 0 && (M.value = o.data.msg, l.value = !1, _.value = !1, d.value = !0)
        }).catch(() => {
          l.value = !1, _.value = !1, d.value = !0
        })
      }
      return X(() => {
        t.actionLog({
          uicode: "20000373"
        })
      }), Y(() => {
        window.parent && window.parent.postMessage({
          cmd: "removeParams"
        }, "https://me.weibo.com"), C(), window.parent && window.parent.postMessage({
          cmd: "removeParams"
        }, "https://me.weibo.com")
      }), (a, o) => {
        const u = v("woo-tab-item"),
          k = v("woo-tab"),
          P = v("woo-panel");
        return b(), $("div", null, [g("div", {
          class: n(a.$style.box)
        }, [i(P, {
          border: "bottom"
        }, {
          default: r(() => [z.value ? (b(), j(k, {
            key: 1,
            animate: "",
            "animate-duration": 500
          }, {
            default: r(() => [i(u, {
              class: n(a.$style.tab),
              cur: w.value === "approval",
              onClick: o[0] || (o[0] = y => R("approval"))
            }, {
              default: r(() => [g("div", {
                class: n(a.$style.tabin)
              }, " 开启精选评论的微博 ", 2)]),
              _: 1
            }, 8, ["class", "cur"]), i(u, {
              class: n(a.$style.tab),
              cur: w.value === "aiAssistant",
              onClick: o[1] || (o[1] = y => R("aiAssistant"))
            }, {
              default: r(() => [g("div", {
                class: n(a.$style.tabin)
              }, " 开启智能助手的微博 ", 2)]),
              _: 1
            }, 8, ["class", "cur"])]),
            _: 1
          })) : (b(), $("div", {
            key: 0,
            class: n(a.$style.tit)
          }, " 开启精选评论的微博 ", 2))]),
          _: 1
        })], 2), g("div", {
          class: n(a.$style.listbox)
        }, [i(Z, {
          isRetry: _.value,
          "onUpdate:isRetry": o[2] || (o[2] = y => _.value = y),
          data: c.value,
          isLoading: l.value,
          isNoData: d.value,
          isEmpty: p.value,
          skeleton: !0,
          onLoadMoreData: C
        }, {
          content: r(({
            item: y
          }) => [i(kt, {
            item: y,
            class: n(a.$style.listitem)
          }, null, 8, ["item", "class"])]),
          _: 1
        }, 8, ["isRetry", "data", "isLoading", "isNoData", "isEmpty"])], 2)])
      }
    }
  },
  At = {
    $style: Dt
  },
  qt = V(xt, [
    ["__cssModules", At]
  ]);
export {
  qt as
  default
};
