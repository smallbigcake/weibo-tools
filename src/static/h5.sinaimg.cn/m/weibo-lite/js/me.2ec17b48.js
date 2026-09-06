(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["me"], {
    "0a99": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", [t.profile ? i("myself", {
            attrs: {
              profile: t.profile
            }
          }) : [i("empty"), i("empty"), i("empty")], i("bottom-bar")], 2)
        },
        a = [],
        r = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("b5d2")),
        n = i("19d6");

      function o(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e && (s = s.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, s)
        }
        return i
      }

      function c(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? o(Object(i), !0).forEach((function(e) {
            Object(r["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : o(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      var l = {
          data: function() {
            return {}
          },
          created: function() {
            this.init(), this.$store.dispatch("unreadAction")
          },
          beforeRouteLeave: function(t, e, i) {
            this.$store.dispatch("clearUnreadTimer"), i()
          },
          methods: c({
            init: function() {
              var t = this;
              this.$http.get("api/users/show").then((function(e) {
                if (e.data && e.data.ok > 0) {
                  var i = e.data.data;
                  t.setProfile(i)
                }
              }))
            }
          }, Object(n["b"])(["setProfile"])),
          computed: c({}, Object(n["c"])(["profile"])),
          components: {
            myself: i("9188").default,
            bottomBar: i("8dc9").default,
            empty: i("d773").default
          }
        },
        u = l,
        m = i("da34"),
        d = Object(m["a"])(u, s, a, !1, null, null, null);
      e["default"] = d.exports
    },
    "151e": function(t, e, i) {},
    "1546a": function(t, e, i) {
      "use strict";
      i("151e")
    },
    "21a9": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return t.cls ? i("i", {
            staticClass: "m-icon",
            class: t.clsName
          }) : t._e()
        },
        a = [],
        r = {
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
        n = r,
        o = (i("a5eb"), i("5478"), i("da34")),
        c = Object(o["a"])(n, s, a, !1, null, "32bf3e32", null);
      e["default"] = c.exports
    },
    2360: function(t, e, i) {},
    "2d49": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "m-box",
            class: t.item.lineClass
          }, [i("div", {
            staticClass: "box-left m-box-col m-box-center-a"
          }, [i("span", {
            staticClass: "link-text"
          }, [i("span", {
            staticClass: "main-link",
            domProps: {
              textContent: t._s(t.item.name)
            }
          })])]), t._m(0)])
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "box-right m-box-center-a"
          }, [i("i", {
            staticClass: "m-font m-font-arrow-right"
          })])
        }],
        r = {
          props: ["item"]
        },
        n = r,
        o = i("da34"),
        c = Object(o["a"])(n, s, a, !1, null, null, null);
      e["default"] = c.exports
    },
    5478: function(t, e, i) {
      "use strict";
      i("2360")
    },
    "8dc9": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "lite-botbar m-bottom-bar m-bar-panel"
          }, [i("div", {
            staticClass: "m-box m-btn-box"
          }, [i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: t.goIndex
            }
          }, [i("i", {
            staticClass: "lite-iconf",
            class: "main" === t.$route.meta.name ? "lite-iconf-home_h" : "lite-iconf-home"
          }, [t.unread.status ? i("em", {
            staticClass: "m-bubble m-bubble-red-s"
          }) : t._e()]), i("h4", [t._v("微博")])]), i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: t.goMsg
            }
          }, [i("i", {
            staticClass: "lite-iconf",
            class: "msgbox" === t.$route.meta.name ? "lite-iconf-msg_h" : "lite-iconf-msg"
          }, [t.allUnreadMsg ? i("em", {
            staticClass: "m-bubble m-bubble-red",
            domProps: {
              textContent: t._s(t.allUnreadMsg)
            }
          }) : t._e()]), i("h4", [t._v("消息")])]), i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: function(e) {
                return t.goProfile()
              }
            }
          }, [i("i", {
            staticClass: "lite-iconf",
            class: "me" === t.$route.meta.name ? "lite-iconf-account_h" : "lite-iconf-account"
          }), i("h4", [t._v("我")])])])])
        },
        a = [],
        r = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("8354"), i("b5d2")),
        n = i("19d6");

      function o(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e && (s = s.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, s)
        }
        return i
      }

      function c(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? o(Object(i), !0).forEach((function(e) {
            Object(r["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : o(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      var l = {
          data: function() {
            return {}
          },
          props: {},
          computed: c({
            allUnreadMsg: function() {
              return this.unread.mention + this.unread.cmt + this.unread.attitude + this.unread.dm
            }
          }, Object(n["c"])(["config", "unread"])),
          methods: {
            goIndex: function() {
              "main" === this.$route.meta.name ? this.$emit("updateFeed") : this.$router.push({
                name: "feed"
              })
            },
            goProfile: function() {
              var t = this.config.uid,
                e = this.config.user_token || "";
              t && this.$router.push({
                path: "/profile/".concat(t),
                query: {
                  user_token: e
                }
              })
            },
            goMsg: function() {
              "/message" === this.$route.path ? this.$emit("updateFeed") : this.$router.push({
                path: "/message"
              })
            }
          }
        },
        u = l,
        m = i("da34"),
        d = Object(m["a"])(u, s, a, !1, null, null, null);
      e["default"] = d.exports
    },
    9188: function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", [i("div", {
            staticClass: "profile-header lite-bot-line"
          }, [t._m(0), i("div", {
            staticClass: "prf-detail m-avatar-box m-box",
            on: {
              click: function(e) {
                return t.$router.push({
                  path: "/profile/" + t.profile.id,
                  query: {
                    user_token: t.profile.user_token
                  }
                })
              }
            }
          }, [i("div", {
            staticClass: "m-img-box"
          }, [i("img", {
            attrs: {
              src: t.profile.profile_image_url
            }
          }), i("verified", {
            attrs: {
              user: t.profile
            }
          })], 1), i("div", {
            staticClass: "m-box-col m-box-dir m-box-center"
          }, [i("div", {
            staticClass: "m-text-box"
          }, [i("h3", {
            staticClass: "m-box"
          }, [i("span", {
            staticClass: "m-text-cut",
            domProps: {
              textContent: t._s(t.profile.screen_name)
            }
          })]), i("h4", {
            staticClass: "m-text-cut",
            domProps: {
              textContent: t._s(t.describtion)
            }
          })])])]), i("div", {
            staticClass: "prf-handle-m m-box m-btn-box"
          }, [i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: function(e) {
                return t.$router.push({
                  path: "/profile/" + t.profile.id,
                  query: {
                    user_token: t.profile.user_token
                  }
                })
              }
            }
          }, [i("i", {
            domProps: {
              textContent: t._s(t.profile.statuses_count)
            }
          }), i("h4", [t._v("微博")])]), i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: t.goFollow
            }
          }, [i("i", {
            domProps: {
              textContent: t._s(t.profile.follow_count)
            }
          }), i("h4", [t._v("关注")])]), i("div", {
            staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
            on: {
              click: t.goFans
            }
          }, [i("i", {
            domProps: {
              textContent: t._s(t.profile.followers_count)
            }
          }), i("h4", [t._v("粉丝")])])])]), i("div", {
            staticClass: "prf-list"
          }, [i("div", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "lite-setup",
            class: t.items[0].borderClass
          }, [i("a", {
            on: {
              click: function(e) {
                return t.$router.push({
                  path: "/collect"
                })
              }
            }
          }, [i("info", {
            attrs: {
              item: t.items[0]
            }
          })], 1)]), i("div", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "lite-setup",
            class: t.items[1].borderClass
          }, [i("a", {
            attrs: {
              href: t.items[1].path,
              target: "_blank"
            }
          }, [i("info", {
            attrs: {
              item: t.items[1]
            }
          })], 1)]), i("div", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "lite-setup",
            class: t.items[2].borderClass
          }, [i("a", {
            on: {
              click: function(e) {
                return t.$router.push({
                  path: "/home/setting"
                })
              }
            }
          }, [i("info", {
            attrs: {
              item: t.items[2]
            }
          })], 1)])])])
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [i("div", {
            staticClass: "nav-main"
          }, [t._v("我")])])
        }],
        r = {
          props: ["profile"],
          components: {
            verified: i("21a9").default,
            info: i("2d49").default
          },
          data: function() {
            return {
              items: [{
                name: "我的赞/收藏",
                borderClass: "bsb",
                lineClass: "lite-bot-line",
                path: ""
              }, {
                name: "意见反馈",
                borderClass: "",
                lineClass: "lite-bot-line",
                path: "https://m.weibo.cn/p/index?containerid=10080816d9ff4ccbb19d75aa3480296a6aa8fd"
              }, {
                name: "设置",
                borderClass: "bst",
                lineClass: "",
                path: ""
              }]
            }
          },
          computed: {
            describtion: function() {
              return this.profile.verified_reason ? "微博认证：".concat(this.profile.verified_reason) : this.profile.description ? "简介：".concat(this.profile.description) : "暂无简介"
            }
          },
          methods: {
            goFollow: function() {
              this.$router.push({
                path: "/p/index",
                query: {
                  containerid: "231093_-_selffollowed"
                }
              })
            },
            goFans: function() {
              this.$router.push({
                path: "/p/index",
                query: {
                  containerid: "231016_-_selffans"
                }
              })
            }
          }
        },
        n = r,
        o = (i("1546a"), i("da34")),
        c = Object(o["a"])(n, s, a, !1, null, "50269ab8", null);
      e["default"] = c.exports
    },
    a1b2: function(t, e, i) {},
    a5eb: function(t, e, i) {
      "use strict";
      i("a1b2")
    },
    d773: function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement;
          t._self._c;
          return t._m(0)
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "wb-item-wrap"
          }, [i("div", {
            staticClass: "wb-item"
          }, [i("div", {
            staticClass: "card m-panel card9 f-weibo"
          }, [i("div", {
            staticClass: "card-wrap"
          }, [i("header", {
            staticClass: "weibo-top m-box"
          }, [i("div", {
            staticClass: "m-avatar-box"
          }, [i("a", {
            staticClass: "m-img-box anim-load",
            attrs: {
              href: "javascript:;"
            }
          })]), i("div", {
            staticClass: "m-box-dir m-box-col"
          }, [i("div", {
            staticClass: "m-text-box"
          }, [i("h4", {
            staticClass: "m-text-cut f-r"
          }), i("h3", {
            staticClass: "m-text-cut empty-bg width-min inline-block anim-load"
          })])])]), i("article", {
            staticClass: "weibo-main"
          }, [i("div", {
            staticClass: "weibo-og"
          }, [i("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), i("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), i("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), i("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), i("p", {
            staticClass: "empty-bg txt-margin anim-load"
          })])]), i("footer", {
            staticClass: "f-footer-ctrl"
          }, [i("div", {
            staticClass: "m-diy-btn"
          }, [i("i", {
            staticClass: "lite-iconf lite-iconf-report"
          }), i("h4", [t._v("转发")])]), i("div", {
            staticClass: "m-diy-btn"
          }, [i("i", {
            staticClass: "lite-iconf lite-iconf-comments"
          }), i("h4", [t._v("评论")])]), i("div", {
            staticClass: "m-diy-btn"
          }, [i("i", {
            staticClass: "lite-iconf lite-iconf-like"
          }), i("h4", [t._v("赞")])]), i("aside", [i("i", {
            staticClass: "f-more"
          }, [t._v("...")])])])])])])])
        }],
        r = i("da34"),
        n = {},
        o = Object(r["a"])(n, s, a, !1, null, null, null);
      e["default"] = o.exports
    }
  }
]);
//# sourceMappingURL=me.2ec17b48.js.map
