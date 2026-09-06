(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["msglist"], {
    "21a9": function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return t.cls ? s("i", {
            staticClass: "m-icon",
            class: t.clsName
          }) : t._e()
        },
        i = [],
        n = {
          props: ["user"],
          computed: {
            cls: function() {
              if (this.user) {
                var t = +this.user.verified_type,
                  e = +this.user.verified_type_ext;
                if (this.user.verified) {
                  if (0 === t) return 1 === e ? "goldv" : 2 === e ? "orangev" : "yellowv";
                  if (t > 0 && t < 8) return -1 === e ? "greyv" : 3 === t && 53 === e ? "redv" : "bluev"
                } else {
                  if (220 === t) return "club";
                  if (10 === t) return "vgirl"
                }
              }
              return 0
            },
            clsName: function() {
              return "m-icon-".concat(this.cls)
            }
          }
        },
        r = n,
        c = (s("a5eb"), s("5478"), s("da34")),
        o = Object(c["a"])(r, a, i, !1, null, "32bf3e32", null);
      e["default"] = o.exports
    },
    2360: function(t, e, s) {},
    5478: function(t, e, s) {
      "use strict";
      s("2360")
    },
    "850d": function(t, e, s) {},
    a1b2: function(t, e, s) {},
    a5eb: function(t, e, s) {
      "use strict";
      s("a1b2")
    },
    bf93: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement;
          t._self._c;
          return t._m(0)
        },
        i = [function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "m-tips m-tips-tp"
          }, [s("div", {
            staticClass: "m-loading m-loading-dark"
          }, [s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span"), s("span")]), s("span", {
            staticClass: "main-link"
          }, [t._v("加载中...")])])
        }],
        n = {
          data: function() {
            return {}
          }
        },
        r = n,
        c = (s("d0cf"), s("da34")),
        o = Object(c["a"])(r, a, i, !1, null, "6a61d97f", null);
      e["default"] = o.exports
    },
    c02f: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", [s("div", {
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
          })]), t._m(0)]), s("div", {
            staticStyle: {
              "margin-top": "2.68rem"
            }
          }, [t._l(t.defaultItems, (function(e, a) {
            return s("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              key: e.id,
              staticClass: "card card30 m-avatar-box lite-msg-list",
              on: {
                click: function(s) {
                  return t.clickHandler(e)
                }
              }
            }, [s("a", {
              attrs: {
                href: "javascript:;"
              }
            }, [s("div", {
              staticClass: "card-wrap"
            }, [s("div", {
              staticClass: "card-main"
            }, [s("div", {
              staticClass: "m-box"
            }, [s("div", {
              staticClass: "m-img-box m-box-center-a m-box-center",
              class: "lite-bg" + (a + 1)
            }, [s("i", {
              staticClass: "lite-iconf",
              class: e.iconClass
            })]), s("div", {
              staticClass: "m-box-col m-box-dir m-box-center lite-line"
            }, [s("div", {
              staticClass: "m-text-box"
            }, [s("h3", {
              staticClass: "m-text-cut",
              domProps: {
                textContent: t._s(e.name)
              }
            })])]), s("div", {
              staticClass: "box-right m-box-center-a lite-line"
            }, [s("i", {
              class: t.unread[e.unreadKey] > 0 ? "m-bubble m-bubble-red" : "m-font m-font-arrow-right",
              domProps: {
                textContent: t._s(t.unread[e.unreadKey] || "")
              }
            })])])])])])])
          })), s("div", {
            directives: [{
              name: "inf-scroll",
              rawName: "v-inf-scroll",
              value: t.load,
              expression: "load"
            }]
          }, [s("MessageCard", {
            attrs: {
              items: t.items
            }
          }), t.loading ? s("loading") : t._e()], 1)], 2), t._t("default")], 2)
        },
        i = [function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", {
            staticClass: "nav-main"
          }, [s("h4", [t._v("消息箱")])])
        }],
        n = (s("7ad2"), s("7c02"), s("e675"), s("0277"), s("b5d2")),
        r = s("19d6");

      function c(t, e) {
        var s = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(t);
          e && (a = a.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), s.push.apply(s, a)
        }
        return s
      }

      function o(t) {
        for (var e = 1; e < arguments.length; e++) {
          var s = null != arguments[e] ? arguments[e] : {};
          e % 2 ? c(Object(s), !0).forEach((function(e) {
            Object(n["a"])(t, e, s[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s)) : c(Object(s)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e))
          }))
        }
        return t
      }
      var l = {
          data: function() {
            return {
              defaultItems: [{
                name: "@我的",
                unreadKey: "mention",
                iconClass: "lite-iconf-eit",
                path: "/message/atme"
              }, {
                name: "评论",
                unreadKey: "cmt",
                iconClass: "lite-iconf-message",
                path: "/message/cmts"
              }, {
                name: "赞",
                unreadKey: "attitude",
                iconClass: "lite-iconf-like",
                path: "/message/like"
              }, {
                name: "未关注人私信",
                iconClass: "lite-iconf-horn",
                path: "/message/notes"
              }],
              items: [],
              loading: !1,
              page: 1,
              error: !1
            }
          },
          name: "inform",
          components: {
            loading: s("bf93").default,
            MessageCard: s("e633").default
          },
          computed: o({}, Object(r["c"])(["unread", "msgList"])),
          methods: o(o({}, Object(r["b"])(["freezeUnreadKey", "setMsgList"])), {}, {
            clickHandler: function(t) {
              (this.msgList && this.msgList.path !== t.path || t.unreadKey && this.unread[t.unreadKey] > 0) && this.setMsgList(null), t.unreadKey && this.freezeUnreadKey(t.unreadKey), t.path.indexOf("://") < 0 ? this.$router.push({
                path: t.path
              }) : window.location.href = t.path
            },
            init: function() {
              this.page = 1, this.items = [], this.error = !1, this.load()
            },
            load: function() {
              var t = this;
              this.loading || this.error || (this.loading = !0, this.$http.get("/message/msglist", {
                params: {
                  page: this.page
                }
              }).then((function(e) {
                t.loading = !1;
                var s = e.data;
                if (s.ok > 0) {
                  var a = s.data;
                  a && a.length > 0 ? (t.items = t.items.length ? t.items.concat(a) : a, t.page++) : t.error = !0
                } else t.error = !0
              })).catch((function() {
                t.loading = !1, t.error = !0
              })))
            }
          })
        },
        u = l,
        d = s("da34"),
        m = Object(d["a"])(u, a, i, !1, null, null, null);
      e["default"] = m.exports
    },
    d0cf: function(t, e, s) {
      "use strict";
      s("850d")
    },
    e633: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("div", t._l(t.items, (function(e) {
            return s("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              key: e.id,
              staticClass: "card card30 m-avatar-box lite-msg-list"
            }, [s("a", {
              on: {
                click: function(s) {
                  return t.onHref(e)
                }
              }
            }, [s("div", {
              staticClass: "card-wrap"
            }, [s("div", {
              staticClass: "card-main"
            }, [s("div", {
              staticClass: "m-box"
            }, [e.user ? s("div", {
              staticClass: "m-img-box"
            }, [s("img", {
              attrs: {
                src: e.user.avatar_large
              }
            }), s("verified", {
              attrs: {
                user: e.user
              }
            })], 1) : t._e(), e.user ? s("div", {
              staticClass: "m-box-col m-box-dir m-box-center lite-line"
            }, [s("div", {
              staticClass: "m-text-box"
            }, [s("h3", {
              staticClass: "m-text-cut",
              domProps: {
                textContent: t._s(e.user.screen_name)
              }
            }), s("h4", {
              staticClass: "m-text-cut",
              domProps: {
                innerHTML: t._s(e.text)
              }
            })])]) : t._e(), s("div", {
              staticClass: "box-right lite-line"
            }, [s("div", {
              staticClass: "m-text-box"
            }, [s("h4", {
              staticClass: "m-text-cut"
            }, [t._v(t._s(t._f("fromNow")(e.created_at)))]), e.unread ? s("span", {
              staticClass: "m-bubble m-bubble-red",
              domProps: {
                textContent: t._s(e.unread)
              }
            }) : t._e()])])])])])])])
          })), 0)
        },
        i = [],
        n = {
          data: function() {
            return {}
          },
          props: ["items"],
          created: function() {},
          methods: {
            onHref: function(t) {
              0 === t.scheme.indexOf("/message/chat") ? this.$router.push({
                path: t.scheme,
                query: this.$route.meta
              }) : window.location.href = window.location.origin + t.scheme
            }
          },
          components: {
            verified: s("21a9").default
          }
        },
        r = n,
        c = s("da34"),
        o = Object(c["a"])(r, a, i, !1, null, null, null);
      e["default"] = o.exports
    }
  }
]);
//# sourceMappingURL=msglist.313c1782.js.map
