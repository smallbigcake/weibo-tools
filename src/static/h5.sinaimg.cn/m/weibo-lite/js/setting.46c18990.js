(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["setting"], {
    "2d49": function(t, e, s) {
      "use strict";
      s.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "m-box",
            class: t.item.lineClass
          }, [s("div", {
            staticClass: "box-left m-box-col m-box-center-a"
          }, [s("span", {
            staticClass: "link-text"
          }, [s("span", {
            staticClass: "main-link",
            domProps: {
              textContent: t._s(t.item.name)
            }
          })])]), t._m(0)])
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "box-right m-box-center-a"
          }, [s("i", {
            staticClass: "m-font m-font-arrow-right"
          })])
        }],
        i = {
          props: ["item"]
        },
        r = i,
        o = s("da34"),
        c = Object(o["a"])(r, n, a, !1, null, null, null);
      e["default"] = c.exports
    },
    "4ef5": function(t, e, s) {
      "use strict";
      s.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticStyle: {
              overflow: "hidden"
            }
          }, [s("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [s("div", {
            staticClass: "nav-left",
            on: {
              click: function(e) {
                return t.$router.go(-1)
              }
            }
          }, [s("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), t._m(0)]), s("setUp")], 1)
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "nav-main"
          }, [s("h4", [t._v("设置")])])
        }],
        i = {
          data: function() {
            return {}
          },
          created: function() {},
          methods: {},
          components: {
            setUp: s("714e").default
          }
        },
        r = i,
        o = s("da34"),
        c = Object(o["a"])(r, n, a, !1, null, null, null);
      e["default"] = c.exports
    },
    "714e": function(t, e, s) {
      "use strict";
      s.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticStyle: {
              "margin-top": "2.75rem"
            }
          }, [t._l(t.items, (function(t, e) {
            return s("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              key: e,
              staticClass: "lite-setup",
              class: t.borderClass
            }, [s("a", {
              attrs: {
                href: t.path,
                target: "_blank"
              }
            }, [s("info", {
              attrs: {
                item: t
              }
            })], 1)])
          })), s("div", {
            staticClass: "lite-setup bsa"
          }, [s("a", {
            on: {
              click: function(e) {
                return t.$router.push({
                  path: "/about"
                })
              }
            }
          }, [t._m(0)])]), s("div", {
            staticClass: "lite-setup bsa"
          }, [s("a", {
            on: {
              click: t.logout
            }
          }, [s("h4", [t._v("退出当前账号")])])])], 2)
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "m-box"
          }, [s("div", {
            staticClass: "box-left m-box-col m-box-center-a"
          }, [s("span", {
            staticClass: "link-text"
          }, [s("span", {
            staticClass: "main-link"
          }, [t._v("关于微博")])])]), s("div", {
            staticClass: "box-right m-box-center-a"
          }, [s("i", {
            staticClass: "m-font m-font-arrow-right"
          })])])
        }],
        i = (s("7ad2"), s("7c02"), s("e675"), s("0277"), s("b5d2")),
        r = s("19d6"),
        o = (s("e11f"), {
          methods: {
            logout: function() {
              var t = "https://m.weibo.cn/logout";
              window.localStorage.clear(), window.caches ? Promise.all(["page", "api"].map((function(t) {
                return caches.delete(t)
              }))).then((function() {
                window.location.href = t
              })) : window.location.href = t
            }
          }
        });

      function c(t, e) {
        var s = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), s.push.apply(s, n)
        }
        return s
      }

      function l(t) {
        for (var e = 1; e < arguments.length; e++) {
          var s = null != arguments[e] ? arguments[e] : {};
          e % 2 ? c(Object(s), !0).forEach((function(e) {
            Object(i["a"])(t, e, s[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s)) : c(Object(s)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e))
          }))
        }
        return t
      }
      var u = {
          mixins: [o],
          data: function() {
            return {}
          },
          computed: l(l({}, Object(r["c"])(["config"])), {}, {
            items: function() {
              return [{
                name: "个人资料",
                borderClass: "",
                lineClass: "lite-bot-line",
                path: "https://m.weibo.cn/users/".concat(this.config.uid, "?set=1")
              }, {
                name: "隐私设置",
                borderClass: "",
                lineClass: "lite-bot-line",
                path: "https://m.weibo.cn/setting/priset"
              }, {
                name: "屏蔽设置",
                borderClass: "bst",
                lineClass: "",
                path: "https://m.weibo.cn/setting?tab=block"
              }, {
                name: "悄悄关注",
                borderClass: "bsb",
                lineClass: "lite-bot-line",
                path: "https://m.weibo.cn/setting?tab=whisper"
              }, {
                name: "账号安全",
                borderClass: "",
                lineClass: "lite-bot-line",
                path: "https://security.weibo.com/account/security"
              }, {
                name: "版本切换",
                borderClass: "bst",
                lineClass: "",
                path: "https://m.weibo.cn/home/version"
              }, {
                name: "客服中心",
                borderClass: "bsa",
                lineClass: "",
                path: "http://kf.weibo.com"
              }]
            }
          }),
          components: {
            info: s("2d49").default
          }
        },
        b = u,
        m = s("da34"),
        p = Object(m["a"])(b, n, a, !1, null, null, null);
      e["default"] = p.exports
    }
  }
]);
//# sourceMappingURL=setting.46c18990.js.map
