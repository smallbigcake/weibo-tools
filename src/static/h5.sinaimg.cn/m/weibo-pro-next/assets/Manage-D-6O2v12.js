var v = Object.defineProperty,
  b = Object.defineProperties;
var $ = Object.getOwnPropertyDescriptors;
var g = Object.getOwnPropertySymbols;
var k = Object.prototype.hasOwnProperty,
  w = Object.prototype.propertyIsEnumerable;
var d = (e, s, o) => s in e ? v(e, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
  }) : e[s] = o,
  f = (e, s) => {
    for (var o in s || (s = {})) k.call(s, o) && d(e, o, s[o]);
    if (g)
      for (var o of g(s)) w.call(s, o) && d(e, o, s[o]);
    return e
  },
  _ = (e, s) => b(e, $(s));
import {
  _ as C,
  J as B,
  L as E,
  l,
  m as i,
  i as r,
  D as m,
  p as a,
  n,
  B as c,
  E as L,
  h as z,
  z as D,
  K as H
} from "./index-Xve1TSN5.js";
const M = "_minwidth_cn6my_6",
  N = "_manage_cn6my_9",
  V = "_main_cn6my_14",
  G = "_logo_cn6my_21",
  P = "_right_cn6my_26",
  q = "_topbar_cn6my_35",
  J = "_topbarinner_cn6my_39",
  K = "_title_cn6my_49",
  S = "_userinfo_cn6my_55",
  j = "_username_cn6my_60",
  A = {
    minwidth: M,
    manage: N,
    main: V,
    logo: G,
    right: P,
    topbar: q,
    topbarinner: J,
    title: K,
    userinfo: S,
    username: j
  },
  F = {
    setup() {
      return D({
        title: "微博管理中心"
      }), H(), {}
    },
    components: {
      Logo: E
    },
    data() {
      return {
        logofontcolor: "#fff",
        observer: null
      }
    },
    computed: _(f({}, B(["config"])), {
      hasnav() {
        return this.$route.query.hasnav !== "0"
      }
    }),
    methods: {
      goProfile(e) {
        this.$router.push({
          name: "profile",
          params: {
            id: e
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
      document.documentElement.dataset.theme === "dark" && (document.documentElement.dataset.theme = "light")
    },
    beforeDestory() {
      this.observer !== null && (this.observer.disconnect(), this.observer = null)
    }
  };

function I(e, s, o, Q, y, t) {
  const h = l("Logo"),
    p = l("woo-avatar"),
    u = l("router-view");
  return r(), i("div", {
    ref: "manage",
    class: n([e.$style.manage, t.hasnav && e.$style.minwidth])
  }, [t.hasnav ? (r(), i("div", {
    key: 0,
    class: n(e.$style.topbar)
  }, [a("div", {
    class: n(e.$style.topbarinner)
  }, [a("div", {
    class: n(e.$style.logowp)
  }, [c(h, {
    class: n(e.$style.logo),
    fontcolor: y.logofontcolor,
    onClick: t.goHome
  }, null, 8, ["class", "fontcolor", "onClick"])], 2), a("div", {
    class: n(e.$style.title)
  }, " 微博管理中心 ", 2), e.config && e.config.user ? (r(), i("div", {
    key: 0,
    class: n(e.$style.userinfo)
  }, [c(p, {
    size: 30,
    src: e.config.user.avatar_large ? e.config.user.avatar_large : "//tva1.sinaimg.cn/default/images/default_avatar_male_180.gif",
    alt: "avatar",
    onClick: s[0] || (s[0] = R => t.goProfile(e.config.uid))
  }, null, 8, ["src"]), a("span", {
    class: n(e.$style.username)
  }, L(e.config.user ? e.config.user.screen_name : ""), 3)], 2)) : m("", !0)], 2)], 2)) : m("", !0), a("div", {
    class: n(e.$style.main)
  }, [t.hasnav ? (r(), z(u, {
    key: 0,
    name: "side"
  })) : m("", !0), a("div", {
    class: n(e.$style.right)
  }, [c(u, {
    name: "main"
  })], 2)], 2)], 2)
}
const O = {
    $style: A
  },
  W = C(F, [
    ["render", I],
    ["__cssModules", O]
  ]);
export {
  W as
  default
};
