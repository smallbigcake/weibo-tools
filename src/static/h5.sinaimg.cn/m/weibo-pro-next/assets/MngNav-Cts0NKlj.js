var $ = Object.defineProperty,
  y = Object.defineProperties;
var C = Object.getOwnPropertyDescriptors;
var d = Object.getOwnPropertySymbols;
var M = Object.prototype.hasOwnProperty,
  I = Object.prototype.propertyIsEnumerable;
var _ = (e, s, t) => s in e ? $(e, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
  }) : e[s] = t,
  f = (e, s) => {
    for (var t in s || (s = {})) M.call(s, t) && _(e, t, s[t]);
    if (d)
      for (var t of d(s)) I.call(s, t) && _(e, t, s[t]);
    return e
  },
  p = (e, s) => y(e, C(s));
import {
  _ as S,
  M as z,
  J as D,
  l as L,
  m as i,
  i as a,
  G as g,
  H as w,
  n as u,
  p as k,
  h as x,
  D as q,
  O as B,
  E as v,
  P
} from "./index-D53O_Npi.js";
const E = "_mngnav_1t8z7_2",
  N = "_menuitem_1t8z7_10",
  R = "_active_1t8z7_13",
  T = "_menutext_1t8z7_13",
  j = "_fonticon_1t8z7_23",
  A = "_submenu_1t8z7_38",
  G = {
    mngnav: E,
    menuitem: N,
    active: R,
    menutext: T,
    fonticon: j,
    submenu: A
  },
  U = {
    data() {
      return {
        list: [],
        frameLink: "",
        mIndex: 0,
        sIndex: -1
      }
    },
    beforeMount() {
      this.getMenus()
    },
    computed: f({}, D(["film"])),
    watch: {
      $route() {
        this.findCur(), this.furl = this.$route.query.furl || ""
      },
      furl() {
        this.findCur()
      }
    },
    methods: p(f({}, z(["updateMenus"])), {
      getMenus() {
        const e = this.$route.query.uid || "";
        this.$http.get("/ajax/manage/menus", {
          params: {
            uid: e
          }
        }).then(s => {
          s.data.ok > 0 && !s.data.data.error && (this.list = s.data.data, this.list.map(t => (t.isShow = !1, t)), this.updateMenus(this.list), this.findCur())
        })
      },
      handleProto(e) {
        return e.startsWith("https:") ? e : `https:${e}`
      },
      compareLink(e, s) {
        if (!e || !s) return !1;
        const t = new URL(this.handleProto(e)),
          n = new URL(this.handleProto(s));
        return t.origin + t.pathname === n.origin + n.pathname
      },
      findCur() {
        let e = this.$route.name;
        e === "MngCmt" && (e = "MngApproval");
        const s = this.$route.query.furl;
        for (let t = 0; t < this.list.length; t++) {
          const n = this.list[t];
          if (n.submenu)
            for (let o = 0; o < n.submenu.length; o++)(e === "frame" && this.compareLink(s, n.submenu[o].link) || n.submenu[o].router === e && e !== "frame" || n.submenu[o].sbmenu && n.submenu[o].sbmenu.some(l => l.router === e) && e !== "frame") && (this.mIndex = t, this.sIndex = o, n.isShow = !0);
          else(e === "frame" && this.compareLink(s, n.link) || n.router === e && e !== "frame") && (this.mIndex = t)
        }
      },
      showToggle(e, s, t) {
        if (e.submenu) e.isShow ? e.isShow = !1 : (this.resetData(), e.isShow = !0, this.sIndex = -1);
        else if (t >= 0 && this.resetData(), e.window === "new") {
          window.open(e.link, "_blank");
          return
        } else e.router === "frame" ? this.$router.push({
          name: e.router,
          query: {
            furl: e.link
          }
        }) : this.$router.push({
          name: e.router
        });
        t >= 0 ? this.mIndex = s : this.sIndex = s
      },
      resetData() {
        this.list.forEach(e => {
          e.isShow = !1
        })
      }
    })
  },
  V = ["onClick"],
  F = ["onClick"];

function H(e, s, t, n, o, l) {
  const b = L("woo-fonticon");
  return a(), i("div", {
    class: u(e.$style.mngnav)
  }, [(a(!0), i(g, null, w(o.list, (r, h) => (a(), i("div", {
    key: h,
    class: u([h === o.mIndex ? e.$style.active : "", e.$style.menuitem])
  }, [k("div", {
    class: u(e.$style.menutext),
    onClick: m => l.showToggle(r, h, 0)
  }, v(r.name), 11, V), r.submenu && r.submenu.length > 0 ? (a(), x(b, {
    key: 0,
    value: r.isShow ? "angleDown" : "angleRight",
    class: u(e.$style.fonticon)
  }, null, 8, ["value", "class"])) : q("", !0), B(k("ul", {
    class: u(e.$style.submenu)
  }, [(a(!0), i(g, null, w(r.submenu, (m, c) => (a(), i("li", {
    key: c,
    class: u(c === o.sIndex ? e.$style.active : ""),
    onClick: O => l.showToggle(m, c, -1)
  }, v(m.name), 11, F))), 128))], 2), [
    [P, r.submenu && r.isShow]
  ])], 2))), 128))], 2)
}
const J = {
    $style: G
  },
  Q = S(U, [
    ["render", H],
    ["__cssModules", J]
  ]);
export {
  Q as
  default
};
