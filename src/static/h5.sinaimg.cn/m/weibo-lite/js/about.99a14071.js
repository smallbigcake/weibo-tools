(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["about"], {
    "0c3a": function(t, e, n) {},
    "2d49": function(t, e, n) {
      "use strict";
      n.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "m-box",
            class: t.item.lineClass
          }, [n("div", {
            staticClass: "box-left m-box-col m-box-center-a"
          }, [n("span", {
            staticClass: "link-text"
          }, [n("span", {
            staticClass: "main-link",
            domProps: {
              textContent: t._s(t.item.name)
            }
          })])]), t._m(0)])
        },
        s = [function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "box-right m-box-center-a"
          }, [n("i", {
            staticClass: "m-font m-font-arrow-right"
          })])
        }],
        i = {
          props: ["item"]
        },
        r = i,
        o = n("da34"),
        c = Object(o["a"])(r, a, s, !1, null, null, null);
      e["default"] = c.exports
    },
    "96b3": function(t, e, n) {
      "use strict";
      n.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticStyle: {
              "margin-top": "2.75rem"
            }
          }, [n("div", {
            staticClass: "lite-logo"
          }), n("div", {
            staticClass: "lite-versions",
            domProps: {
              textContent: t._s(t.version)
            }
          }, [t._v("HTML5版")]), t._l(t.items, (function(t, e) {
            return n("div", {
              key: e,
              staticClass: "lite-setup"
            }, [n("a", {
              attrs: {
                href: t.path
              }
            }, [n("info", {
              attrs: {
                item: t
              }
            })], 1)])
          })), n("div", {
            staticClass: "about-footer"
          }, [t._m(0), n("h3", [t._v("Copyright © 2009-" + t._s(t.year) + " WEIBO")]), n("h3", [t._v("京ICP备12002058号")])])], 2)
        },
        s = [function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("h4", [n("a", {
            attrs: {
              href: "https://m.weibo.cn/c/regagreement"
            }
          }, [t._v("微博服务使用协议")]), t._v("和"), n("a", {
            attrs: {
              href: "https://m.weibo.cn/c/privacy"
            }
          }, [t._v("微博个人信息保护政策")])])
        }],
        i = {
          data: function() {
            return {}
          },
          computed: {
            year: function() {
              return (new Date).getFullYear()
            },
            version: function() {
              return "HTML5 版" + (window.config && window.config.version ? " " + window.config.version : "")
            },
            items: function() {
              return [{
                name: "意见反馈",
                borderClass: "",
                lineClass: "lite-bot-line",
                path: "https://m.weibo.cn/p/index?containerid=10080816d9ff4ccbb19d75aa3480296a6aa8fd"
              }, {
                name: "更新日志",
                borderClass: "",
                lineClass: "",
                path: "https://m.weibo.cn/p/2312590002_5262"
              }]
            }
          },
          created: function() {},
          methods: {},
          components: {
            info: n("2d49").default
          }
        },
        r = i,
        o = (n("d79c"), n("da34")),
        c = Object(o["a"])(r, a, s, !1, null, "fc743838", null);
      e["default"] = c.exports
    },
    d79c: function(t, e, n) {
      "use strict";
      n("0c3a")
    },
    f820: function(t, e, n) {
      "use strict";
      n.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticStyle: {
              overflow: "hidden"
            }
          }, [n("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [n("div", {
            staticClass: "nav-left",
            on: {
              click: function(e) {
                return t.$router.go(-1)
              }
            }
          }, [n("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), t._m(0)]), n("wbabout")], 1)
        },
        s = [function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "nav-main"
          }, [n("h4", [t._v("关于微博")])])
        }],
        i = {
          data: function() {
            return {}
          },
          created: function() {},
          methods: {},
          components: {
            wbabout: n("96b3").default
          }
        },
        r = i,
        o = n("da34"),
        c = Object(o["a"])(r, a, s, !1, null, null, null);
      e["default"] = c.exports
    }
  }
]);
//# sourceMappingURL=about.99a14071.js.map
