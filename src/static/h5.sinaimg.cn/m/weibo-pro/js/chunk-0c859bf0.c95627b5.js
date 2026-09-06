(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0c859bf0"], {
    "272ff": function(e, t, o) {
      "use strict";
      o.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            o = e._self._c || t;
          return o("div", [e.hasNav ? o("div", {
            class: e.$style.nav
          }, [o("woo-box", {
            class: e.$style.navwrap,
            attrs: {
              align: "center"
            }
          }, [o("Logo", {
            class: e.$style.logo,
            attrs: {
              fontcolor: "var(--weibo-top-nav-logo-color)"
            },
            nativeOn: {
              click: function(t) {
                return e.goHome.apply(null, arguments)
              }
            }
          }), o("div", {
            class: e.$style.title
          }, [e._v(e._s(e.desc))])], 1)], 1) : e._e(), o("div", {
            class: [e.$style.main, e.hasNav && e.$style.pt]
          }, [o("router-view", {
            attrs: {
              name: "main"
            }
          })], 1)])
        },
        a = [],
        i = o("6f14"),
        s = o("16d4"),
        c = o("ba1d"),
        l = {
          props: {
            desc: {
              type: String
            }
          },
          metaInfo: function() {
            return {}
          },
          components: {
            Logo: s["a"]
          },
          data: function() {
            return {
              logofontcolor: "#fff"
            }
          },
          computed: Object(i["a"])(Object(i["a"])({}, Object(c["c"])(["config"])), {}, {
            hasNav: function() {
              var e;
              return "0" !== (null === (e = this.$route.query) || void 0 === e ? void 0 : e.hasnav)
            }
          }),
          methods: {
            goProfile: function(e) {
              this.$router.push({
                name: "profile",
                params: {
                  id: e
                }
              })
            },
            goHome: function() {
              this.$router.push({
                path: "/"
              })
            }
          },
          mounted: function() {
            var e, t, o = null === (e = this.config) || void 0 === e || null === (t = e.user) || void 0 === t ? void 0 : t.id,
              n = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
              a = JSON.parse(window.localStorage.getItem("darkMode"));
            this.darkMode = a && o === a.uid ? parseInt(a.mode) : n ? 1 : 0, 1 === this.darkMode ? document.documentElement.dataset.theme = "dark" : document.documentElement.dataset.theme = "light"
          }
        },
        r = l,
        u = o("91bf"),
        d = o("04a2");

      function f(e) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var v = Object(d["a"])(r, n, a, !1, f, null, null);
      t["default"] = v.exports
    },
    "5e9e": function(e, t, o) {
      e.exports = {
        nav: "SingleDesc_nav_WVIti",
        navwrap: "SingleDesc_navwrap_NgVFH",
        logo: "SingleDesc_logo_1uuBi",
        title: "SingleDesc_title_hsB69",
        main: "SingleDesc_main_2K8PY",
        pt: "SingleDesc_pt_111c3"
      }
    },
    "91bf": function(e, t, o) {
      "use strict";
      var n = o("5e9e"),
        a = o.n(n);
      t["default"] = a.a
    }
  }
]);
