(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-7eabf768"], {
    "6c94": function(e, a, t) {
      "use strict";
      t.r(a);
      var n = function() {
          var e = this,
            a = e.$createElement,
            t = e._self._c || a;
          return t("div", {
            ref: "manage",
            class: [e.$style.manage, e.hasnav && e.$style.minwidth]
          }, [e.hasnav ? t("div", {
            class: e.$style.topbar
          }, [t("div", {
            class: e.$style.topbarinner
          }, [t("div", {
            class: e.$style.logowp
          }, [t("Logo", {
            class: e.$style.logo,
            attrs: {
              fontcolor: e.logofontcolor
            },
            nativeOn: {
              click: function(a) {
                return e.goHome.apply(null, arguments)
              }
            }
          })], 1), t("div", {
            class: e.$style.title
          }, [e._v("微博管理中心")]), e.config && e.config.user ? t("div", {
            class: e.$style.userinfo
          }, [t("woo-avatar", {
            attrs: {
              size: 30,
              src: e.config.user.avatar_large ? e.config.user.avatar_large : "//tva1.sinaimg.cn/default/images/default_avatar_male_180.gif",
              alt: "avatar"
            },
            nativeOn: {
              click: function(a) {
                return e.goProfile(e.config.uid)
              }
            }
          }), t("span", {
            class: e.$style.username
          }, [e._v(e._s(e.config.user ? e.config.user.screen_name : ""))])], 1) : e._e()])]) : e._e(), t("div", {
            class: e.$style.main
          }, [e.hasnav ? t("router-view", {
            attrs: {
              name: "side"
            }
          }) : e._e(), t("div", {
            class: e.$style.right
          }, [t("router-view", {
            attrs: {
              name: "main"
            }
          })], 1)], 1)])
        },
        o = [],
        s = t("6f14"),
        r = t("16d4"),
        i = t("ba1d"),
        l = {
          metaInfo: function() {
            return {
              title: "微博管理中心"
            }
          },
          components: {
            Logo: r["a"]
          },
          data: function() {
            return {
              logofontcolor: "#fff",
              observer: null
            }
          },
          computed: Object(s["a"])(Object(s["a"])({}, Object(i["c"])(["config"])), {}, {
            hasnav: function() {
              return "0" !== this.$route.query.hasnav
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
            var e = document.documentElement.dataset.theme;
            "dark" === e && (document.documentElement.dataset.theme = "light")
          },
          beforeDestory: function() {
            null !== this.observer && (this.observer.disconnect(), this.observer = null)
          }
        },
        c = l,
        u = t("90fb"),
        f = t("04a2");

      function g(e) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var m = Object(f["a"])(c, n, o, !1, g, null, null);
      a["default"] = m.exports
    },
    "90fb": function(e, a, t) {
      "use strict";
      var n = t("9fa2"),
        o = t.n(n);
      a["default"] = o.a
    },
    "9fa2": function(e, a, t) {
      e.exports = {
        minwidth: "Manage_minwidth_38u7w",
        manage: "Manage_manage_7TBEQ",
        main: "Manage_main_1g9oG",
        logo: "Manage_logo_2YEUA",
        right: "Manage_right_3vK4P",
        topbar: "Manage_topbar_1frqo",
        topbarinner: "Manage_topbarinner_3pr5L",
        title: "Manage_title_YOy2I",
        userinfo: "Manage_userinfo_2hvex",
        username: "Manage_username_VJS0j"
      }
    }
  }
]);
