(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["msgsublist"], {
    "1b72": function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [a("div", {
            staticClass: "nav-left",
            on: {
              click: function(e) {
                return t.$router.go(-1)
              }
            }
          }, [a("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), a("div", {
            staticClass: "nav-main"
          }, [a("ul", {
            staticClass: "nav_item"
          }, t._l(t.tabs, (function(e, s) {
            return a("li", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              key: s,
              staticClass: "item_li",
              class: {
                cur: s == t.tabIndex
              },
              on: {
                click: function(e) {
                  return t.changeTab(s)
                }
              }
            }, [a("span", [t._v(t._s(e.title)), a("em")])])
          })), 0)])])
        },
        i = [],
        n = {
          data: function() {
            return {}
          },
          props: ["tabs", "tabIndex"],
          created: function() {},
          methods: {
            changeTab: function(t) {
              t !== this.tabIndex ? this.$emit("update:tabIndex", t) : this.$emit("init")
            }
          }
        },
        r = n,
        c = a("da34"),
        o = Object(c["a"])(r, s, i, !1, null, null, null);
      e["default"] = o.exports
    },
    "21a9": function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return t.cls ? a("i", {
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
        c = (a("a5eb"), a("5478"), a("da34")),
        o = Object(c["a"])(r, s, i, !1, null, "32bf3e32", null);
      e["default"] = o.exports
    },
    2360: function(t, e, a) {},
    5478: function(t, e, a) {
      "use strict";
      a("2360")
    },
    "6fbf": function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", [a("tab", {
            attrs: {
              tabs: t.tabs,
              tabIndex: t.tabIndex
            },
            on: {
              "update:tabIndex": function(e) {
                t.tabIndex = e
              },
              "update:tab-index": function(e) {
                t.tabIndex = e
              },
              init: t.init
            }
          }), t.msgList ? a("div", {
            directives: [{
              name: "inf-scroll",
              rawName: "v-inf-scroll",
              value: t.load,
              expression: "load"
            }],
            staticStyle: {
              "margin-top": "2.6875rem"
            },
            attrs: {
              "first-check": !0
            }
          }, [a("mv-loadmore", {
            ref: "loadmore",
            attrs: {
              "top-method": t.init
            }
          }, [t.$route.meta.unfollowing ? a("MessageCard", {
            attrs: {
              items: t.msgList.items
            }
          }) : a("Inform", {
            attrs: {
              items: t.msgList.items
            }
          })], 1), t.loading ? a("loading") : t._e()], 1) : [a("empty"), a("empty"), a("empty")], t._t("default")], 2)
        },
        i = [],
        n = (a("7ad2"), a("7c02"), a("e675"), a("0277"), a("b5d2")),
        r = (a("b17c"), a("19d6")),
        c = a("383a");

      function o(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e && (s = s.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), a.push.apply(a, s)
        }
        return a
      }

      function l(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2 ? o(Object(a), !0).forEach((function(e) {
            Object(n["a"])(t, e, a[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : o(Object(a)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
          }))
        }
        return t
      }
      var u = {
          props: ["tabs"],
          data: function() {
            return {
              items: [],
              tabIndex: 0,
              loading: !1,
              page: 1,
              error: !1
            }
          },
          created: function() {
            this.msgList ? Object.assign(this.$data, this.msgList) : this.init()
          },
          watch: {
            tabIndex: function(t) {
              this.msgList.tabIndex !== t && this.init()
            }
          },
          methods: l({
            init: function() {
              var t = this;
              this.page = 1;
              var e = this.tabs[this.tabIndex].api;
              this.$http.get(e, {
                params: {
                  page: this.page
                }
              }).then((function(e) {
                e.data.ok > 0 && (t.setMsgList({
                  items: e.data.data.data || e.data.data,
                  tabIndex: t.tabIndex,
                  page: t.page,
                  path: t.$route.path,
                  maxPage: e.data.data.maxPage || 0
                }), t.$nextTick((function() {
                  window.scroll(0, 0), c["a"].$emit("mvLoadEnd")
                })))
              }))
            },
            load: function() {
              var t = this;
              if (!this.loading && !this.error) {
                this.loading = !0;
                var e = this.tabs[this.tabIndex].api;
                this.$http.get(e, {
                  params: {
                    page: ++this.page
                  }
                }).then((function(e) {
                  if (t.loading = !1, e.data.ok > 0) {
                    var a = e.data.data.data || e.data.data;
                    a ? t.updateMsgList({
                      items: t.msgList.items.concat(a),
                      page: t.page
                    }) : t.error = !0
                  } else t.error = !0
                })).catch((function() {
                  t.loading = !1, t.error = !0
                }))
              }
            }
          }, Object(r["b"])(["updateMsgList", "setMsgList"])),
          computed: l({}, Object(r["c"])(["msgList"])),
          components: {
            tab: a("1b72").default,
            Inform: a("c8f3").default,
            loading: a("bf93").default,
            empty: a("d773").default,
            MessageCard: a("e633").default
          }
        },
        d = u,
        m = a("da34"),
        p = Object(m["a"])(d, s, i, !1, null, null, null);
      e["default"] = p.exports
    },
    "850d": function(t, e, a) {},
    a1b2: function(t, e, a) {},
    a5eb: function(t, e, a) {
      "use strict";
      a("a1b2")
    },
    bf93: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement;
          t._self._c;
          return t._m(0)
        },
        i = [function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", {
            staticClass: "m-tips m-tips-tp"
          }, [a("div", {
            staticClass: "m-loading m-loading-dark"
          }, [a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span"), a("span")]), a("span", {
            staticClass: "main-link"
          }, [t._v("加载中...")])])
        }],
        n = {
          data: function() {
            return {}
          }
        },
        r = n,
        c = (a("d0cf"), a("da34")),
        o = Object(c["a"])(r, s, i, !1, null, "6a61d97f", null);
      e["default"] = o.exports
    },
    c8f3: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", t._l(t.items, (function(e) {
            return a("div", {
              key: e.mid,
              staticClass: "card m-avatar-box lite-msg",
              on: {
                click: function(a) {
                  return a.stopPropagation(), t.msgItem(e, a)
                }
              }
            }, [a("div", {
              staticClass: "card-wrap"
            }, [a("div", {
              staticClass: "card-main"
            }, [a("div", {
              staticClass: "m-box"
            }, [a("div", {
              staticClass: "m-img-box",
              on: {
                click: function(a) {
                  return a.stopPropagation(), a.preventDefault(), t.$router.push({
                    path: "/profile/" + e.user.id,
                    query: {
                      user_token: e.user.user_token
                    }
                  })
                }
              }
            }, [a("img", {
              attrs: {
                src: e.user.profile_image_url
              }
            }), a("verified", {
              attrs: {
                user: e.user
              }
            })], 1), a("div", {
              staticClass: "m-box-col m-box-dir lite-line"
            }, [a("div", {
              staticClass: "m-box"
            }, [a("div", {
              staticClass: "m-box-col m-box-dir"
            }, [a("div", {
              staticClass: "m-text-box"
            }, [a("h4", {
              staticClass: "m-text-cut"
            }, [a("span", {
              domProps: {
                textContent: t._s(e.user.screen_name)
              },
              on: {
                click: function(a) {
                  return a.stopPropagation(), a.preventDefault(), t.$router.push({
                    path: "/profile/" + e.user.id,
                    query: {
                      user_token: e.user.user_token
                    }
                  })
                }
              }
            }), e.text ? t._e() : a("em", [t._v("赞了你的微博")])]), a("h3", {
              domProps: {
                innerHTML: t._s(e.text)
              }
            })])]), e.status ? a("div", {
              staticClass: "box-right"
            }, [t.thumbnail(e.status) ? a("img", {
              attrs: {
                src: t.thumbnail(e.status)
              }
            }) : a("h4", {
              staticClass: "m-text-cut-3",
              domProps: {
                innerHTML: t._s(e.status.text)
              }
            })]) : e.retweeted_status ? a("div", {
              staticClass: "box-right"
            }, [e.retweeted_status.thumbnail_pic ? a("img", {
              attrs: {
                src: e.retweeted_status.thumbnail_pic
              }
            }) : a("h4", {
              staticClass: "m-text-cut-3",
              domProps: {
                innerHTML: t._s(e.retweeted_status.text)
              }
            })]) : t._e()]), a("div", {
              staticClass: "lite-time m-text-cut"
            }, [t._v("\n              " + t._s(t._f("fromNow")(e.created_at)) + "\n              " + t._s(t.displaySource(e)) + "\n            ")])])])])])])
          })), 0)
        },
        i = [],
        n = (a("4294"), a("383a")),
        r = {
          data: function() {
            return {}
          },
          name: "inform",
          props: ["items"],
          components: {
            verified: a("21a9").default
          },
          methods: {
            displaySource: function(t) {
              var e = t.source || "";
              return e = e.replace(/<[^>]+>/gi, ""), "" !== e && -1 === e.indexOf("来自") && (e = "来自" + e), e
            },
            thumbnail: function(t) {
              return t.retweeted_status ? this.thumbnail(t.retweeted_status) : t.pics && t.pics[0] && t.pics[0].url ? t.pics[0].url : t.page_info && t.page_info.page_pic ? t.page_info.page_pic.url || t.page_info.page_pic : ""
            },
            msgItem: function(t, e) {
              if ("A" !== e.target.tagName || !e.target.href) {
                try {
                  if (11 === t.status.page_info.type) return void(window.location.href = "https://weibo.cn/appurl?scheme=".concat(window.encodeURIComponent(t.scheme)))
                } catch (c) {}
                var a = t.status ? t.status.mid : t.mid,
                  s = "回复@".concat(t.user.screen_name, ":"),
                  i = this,
                  r = [{
                    text: "查看原微博",
                    method: function() {
                      i.$router.push({
                        name: "detail",
                        params: {
                          id: a
                        }
                      })
                    }
                  }, {
                    text: "评论或回复",
                    method: function() {
                      i.$router.push({
                        name: t.status ? "reply" : "comment",
                        query: {
                          id: a,
                          reply: t.status ? t.id : "",
                          content: t.status ? s : ""
                        }
                      })
                    }
                  }, {
                    text: t.liked ? "取消赞" : "点赞",
                    method: function() {
                      t.status ? i.$http.post(t.liked ? "api/likes/destroy" : "api/likes/update", {
                        id: t.mid,
                        type: t.status ? "comment" : "status"
                      }).then((function() {
                        t.liked = !t.liked
                      })) : i.$http.post(t.liked ? "api/attitudes/destroy" : "api/attitudes/create", {
                        id: t.mid,
                        attitude: "heart"
                      }).then((function() {
                        t.liked = !t.liked
                      }))
                    }
                  }];
                t.mid ? (+t.user.id === +this.$store.state.config.config.uid && r.splice(1, 1), a && n["a"].$emit("mvActionSheet", r, "取消")) : i.$router.push({
                  name: "detail",
                  params: {
                    id: a
                  }
                })
              }
            }
          }
        },
        c = r,
        o = a("da34"),
        l = Object(o["a"])(c, s, i, !1, null, null, null);
      e["default"] = l.exports
    },
    d0cf: function(t, e, a) {
      "use strict";
      a("850d")
    },
    d773: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement;
          t._self._c;
          return t._m(0)
        },
        i = [function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", {
            staticClass: "wb-item-wrap"
          }, [a("div", {
            staticClass: "wb-item"
          }, [a("div", {
            staticClass: "card m-panel card9 f-weibo"
          }, [a("div", {
            staticClass: "card-wrap"
          }, [a("header", {
            staticClass: "weibo-top m-box"
          }, [a("div", {
            staticClass: "m-avatar-box"
          }, [a("a", {
            staticClass: "m-img-box anim-load",
            attrs: {
              href: "javascript:;"
            }
          })]), a("div", {
            staticClass: "m-box-dir m-box-col"
          }, [a("div", {
            staticClass: "m-text-box"
          }, [a("h4", {
            staticClass: "m-text-cut f-r"
          }), a("h3", {
            staticClass: "m-text-cut empty-bg width-min inline-block anim-load"
          })])])]), a("article", {
            staticClass: "weibo-main"
          }, [a("div", {
            staticClass: "weibo-og"
          }, [a("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), a("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), a("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), a("p", {
            staticClass: "empty-bg txt-margin anim-load"
          }), a("p", {
            staticClass: "empty-bg txt-margin anim-load"
          })])]), a("footer", {
            staticClass: "f-footer-ctrl"
          }, [a("div", {
            staticClass: "m-diy-btn"
          }, [a("i", {
            staticClass: "lite-iconf lite-iconf-report"
          }), a("h4", [t._v("转发")])]), a("div", {
            staticClass: "m-diy-btn"
          }, [a("i", {
            staticClass: "lite-iconf lite-iconf-comments"
          }), a("h4", [t._v("评论")])]), a("div", {
            staticClass: "m-diy-btn"
          }, [a("i", {
            staticClass: "lite-iconf lite-iconf-like"
          }), a("h4", [t._v("赞")])]), a("aside", [a("i", {
            staticClass: "f-more"
          }, [t._v("...")])])])])])])])
        }],
        n = a("da34"),
        r = {},
        c = Object(n["a"])(r, s, i, !1, null, null, null);
      e["default"] = c.exports
    },
    e633: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", t._l(t.items, (function(e) {
            return a("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              key: e.id,
              staticClass: "card card30 m-avatar-box lite-msg-list"
            }, [a("a", {
              on: {
                click: function(a) {
                  return t.onHref(e)
                }
              }
            }, [a("div", {
              staticClass: "card-wrap"
            }, [a("div", {
              staticClass: "card-main"
            }, [a("div", {
              staticClass: "m-box"
            }, [e.user ? a("div", {
              staticClass: "m-img-box"
            }, [a("img", {
              attrs: {
                src: e.user.avatar_large
              }
            }), a("verified", {
              attrs: {
                user: e.user
              }
            })], 1) : t._e(), e.user ? a("div", {
              staticClass: "m-box-col m-box-dir m-box-center lite-line"
            }, [a("div", {
              staticClass: "m-text-box"
            }, [a("h3", {
              staticClass: "m-text-cut",
              domProps: {
                textContent: t._s(e.user.screen_name)
              }
            }), a("h4", {
              staticClass: "m-text-cut",
              domProps: {
                innerHTML: t._s(e.text)
              }
            })])]) : t._e(), a("div", {
              staticClass: "box-right lite-line"
            }, [a("div", {
              staticClass: "m-text-box"
            }, [a("h4", {
              staticClass: "m-text-cut"
            }, [t._v(t._s(t._f("fromNow")(e.created_at)))]), e.unread ? a("span", {
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
            verified: a("21a9").default
          }
        },
        r = n,
        c = a("da34"),
        o = Object(c["a"])(r, s, i, !1, null, null, null);
      e["default"] = o.exports
    }
  }
]);
//# sourceMappingURL=msgsublist.fbf01261.js.map
