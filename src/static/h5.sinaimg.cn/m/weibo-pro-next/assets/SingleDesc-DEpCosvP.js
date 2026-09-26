var v = Object.defineProperty,
  $ = Object.defineProperties;
var y = Object.getOwnPropertyDescriptors;
var i = Object.getOwnPropertySymbols;
var b = Object.prototype.hasOwnProperty,
  k = Object.prototype.propertyIsEnumerable;
var d = (o, t, e) => t in o ? v(o, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
  }) : o[t] = e,
  m = (o, t) => {
    for (var e in t || (t = {})) b.call(t, e) && d(o, e, t[e]);
    if (i)
      for (var e of i(t)) k.call(t, e) && d(o, e, t[e]);
    return o
  },
  p = (o, t) => $(o, y(t));
import {
  _ as B,
  J as M,
  L as C,
  l,
  m as u,
  i as _,
  D as N,
  p as g,
  n as r,
  B as c,
  C as S,
  E as D,
  x as E,
  u as H,
  y as L,
  A as x,
  g as I
} from "./index-Xve1TSN5.js";
const V = "_nav_1ap0b_2",
  J = "_navwrap_1ap0b_16",
  T = "_logo_1ap0b_23",
  U = "_title_1ap0b_31",
  q = "_main_1ap0b_37",
  z = "_pt_1ap0b_41",
  A = {
    nav: V,
    navwrap: J,
    logo: T,
    title: U,
    main: q,
    pt: z
  },
  G = {
    setup() {
      const o = E().proxy,
        t = H(),
        e = L(),
        a = s => {
          t.show(s)
        },
        n = s => {
          e.show(s)
        };
      x(() => {
        o.$Bus.$on("toast", n), o.$Bus.$on("dialog", a)
      }), I(() => {
        o.$Bus.$off("toast", n), o.$Bus.$off("dialog", a)
      }), o.$_w_dialog = t.show, o.$_w_toast = e.show
    },
    props: {
      desc: {
        type: String
      }
    },
    components: {
      Logo: C
    },
    data() {
      return {
        logofontcolor: "#fff"
      }
    },
    computed: p(m({}, M(["config"])), {
      hasNav() {
        var o;
        return ((o = this.$route.query) == null ? void 0 : o.hasnav) !== "0"
      }
    }),
    methods: {
      goProfile(o) {
        this.$router.push({
          name: "profile",
          params: {
            id: o
          }
        })
      },
      goHome() {
        this.$router.push({
          path: "/"
        })
      }
    },
    mounted() {
      var a, n;
      const o = (n = (a = this.config) == null ? void 0 : a.user) == null ? void 0 : n.id,
        t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
        e = JSON.parse(window.localStorage.getItem("darkMode"));
      this.darkMode = e && o === e.uid ? Number.parseInt(e.mode) : t ? 1 : 0, this.darkMode === 1 ? document.documentElement.dataset.theme = "dark" : document.documentElement.dataset.theme = "light"
    }
  };

function O(o, t, e, a, n, s) {
  const h = l("Logo"),
    f = l("woo-box"),
    w = l("router-view");
  return _(), u("div", null, [s.hasNav ? (_(), u("div", {
    key: 0,
    class: r(o.$style.nav)
  }, [c(f, {
    align: "center",
    class: r(o.$style.navwrap)
  }, {
    default: S(() => [c(h, {
      class: r(o.$style.logo),
      fontcolor: "var(--weibo-top-nav-logo-color)",
      onClick: s.goHome
    }, null, 8, ["class", "onClick"]), g("div", {
      class: r(o.$style.title)
    }, D(e.desc), 3)]),
    _: 1
  }, 8, ["class"])], 2)) : N("", !0), g("div", {
    class: r([o.$style.main, s.hasNav && o.$style.pt])
  }, [c(w, {
    name: "main"
  })], 2)])
}
const P = {
    $style: A
  },
  K = B(G, [
    ["render", O],
    ["__cssModules", P]
  ]);
export {
  K as
  default
};
