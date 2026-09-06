(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["search"], {
    "21a9": function(t, s, e) {
      "use strict";
      e.r(s);
      var i = function() {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return t.cls ? e("i", {
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
                  s = +this.user.verified_type_ext;
                if (this.user.verified) {
                  if (0 === t) return 1 === s ? "goldv" : 2 === s ? "orangev" : "yellowv";
                  if (t > 0 && t < 8) return -1 === s ? "greyv" : 3 === t && 53 === s ? "redv" : "bluev"
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
        o = (e("a5eb"), e("5478"), e("da34")),
        c = Object(o["a"])(n, i, a, !1, null, "32bf3e32", null);
      s["default"] = c.exports
    },
    2360: function(t, s, e) {},
    "2d3b": function(t, s, e) {
      "use strict";
      e.r(s);
      var i = function() {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e("div", {
            staticClass: "lite-search"
          }, [e("result", {
            attrs: {
              keyword: t.keyword
            },
            on: {
              "update:keyword": function(s) {
                t.keyword = s
              }
            }
          }), e("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !t.keyword,
              expression: "!keyword"
            }],
            staticClass: "card card11 ctype-2"
          }, [e("div", {
            staticClass: "search-tit m-box"
          }, [t._m(0), t.hot[0] ? e("a", {
            directives: [{
              name: "mvlink",
              rawName: "v-mvlink",
              value: t.hot[0],
              expression: "hot[0]"
            }],
            staticClass: "box-right m-box-center-a"
          }, [e("span", [t._v(t._s(t.hot[0] && t.hot[0].desc_extr ? t.hot[0].desc_extr : "每分钟更新一次"))]), e("i", {
            staticClass: "m-font m-font-arrow-right"
          })]) : t._e()]), t.hot.length ? e("div", {
            staticClass: "search-item m-col-2"
          }, t._l(t.hot[1].group, (function(s, i) {
            return e("a", {
              directives: [{
                name: "mvlink",
                rawName: "v-mvlink",
                value: s,
                expression: "item"
              }],
              key: i,
              staticClass: "m-auto-box m-box-col lite-top-line m-text-cut"
            }, [e("span", {
              staticClass: "m-box-center-a"
            }, [e("em", {
              staticClass: "m-text-cut"
            }, [t._v(t._s(s.title_sub))])])])
          })), 0) : t._e()])], 1)
        },
        a = [function() {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e("div", {
            staticClass: "box-left m-box-col m-box-center-a"
          }, [e("span", {
            staticClass: "lite-font-icon"
          }, [e("i", {
            staticClass: "m-font m-font-search"
          })]), e("span", {
            staticClass: "link-text m-box m-box-center-a"
          }, [e("span", {
            staticClass: "main-text m-text-cut"
          }, [t._v("微博热搜榜")])])])
        }],
        r = {
          data: function() {
            return {
              keyword: "",
              hot: []
            }
          },
          created: function() {
            var t = this;
            this.$http.get("container/getIndex", {
              params: {
                containerid: "106003type=1",
                openApp: 0
              }
            }).then((function(s) {
              if (s.data.ok > 0) {
                var e = s.data.data.cards[0].card_group;
                e && (t.hot = e)
              }
            }))
          },
          methods: {},
          components: {
            result: e("889b").default
          }
        },
        n = r,
        o = e("da34"),
        c = Object(o["a"])(n, i, a, !1, null, null, null);
      s["default"] = c.exports
    },
    "37ad": function(t, s, e) {},
    5478: function(t, s, e) {
      "use strict";
      e("2360")
    },
    "889b": function(t, s, e) {
      "use strict";
      e.r(s);
      var i = function() {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e("div", [e("div", {
            staticClass: "search-nav on-search card31 lite-bot-line"
          }, [e("div", {
            staticClass: "m-box"
          }, [e("div", {
            staticClass: "nav-left m-box-center-a",
            on: {
              click: function(s) {
                return t.$router.go(-1)
              }
            }
          }, [e("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), e("div", {
            staticClass: "m-box-col"
          }, [e("form", {
            attrs: {
              action: "."
            },
            on: {
              submit: function(s) {
                return s.preventDefault(), t.confirmKeyword()
              }
            }
          }, [e("label", {
            staticClass: "m-search"
          }, [e("input", {
            directives: [{
              name: "model",
              rawName: "v-model.trim",
              value: t.keyword,
              expression: "keyword",
              modifiers: {
                trim: !0
              }
            }],
            attrs: {
              autofocus: "",
              type: "search",
              placeholder: "搜索"
            },
            domProps: {
              value: t.keyword
            },
            on: {
              input: [function(s) {
                s.target.composing || (t.keyword = s.target.value.trim())
              }, t.getSearchSuggestions],
              blur: function(s) {
                return t.$forceUpdate()
              }
            }
          })])])]), e("div", {
            staticClass: "search-cancel m-box-center-a",
            on: {
              click: t.cleanKeyword
            }
          }, [t._v("\n        取消\n      ")])])]), t.keyword.length || t.allHistoryItems.length ? e("div", {
            staticClass: "card card11 ctype-2"
          }, [t.spotSuggestions.length && t.isSpot ? e("div", {
            staticClass: "card-list"
          }, t._l(t.spotSuggestions, (function(s) {
            return e("div", {
              key: s.content,
              staticClass: "card m-panel card4"
            }, [e("a", {
              on: {
                click: function(e) {
                  return e.preventDefault(), t.confirmKeyword(s.content)
                }
              }
            }, [e("div", {
              staticClass: "card-wrap"
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "box-left m-box-col m-box-center-a"
            }, [e("span", {
              staticClass: "link-text"
            }, [e("span", {
              staticClass: "main-link"
            }, [t._v(t._s(s.content))])])])])])])])])
          })), 0) : t.keywordSuggestions.length || t.userSuggestions.length ? e("div", {
            staticClass: "card-list"
          }, [t._l(t.keywordSuggestions.slice(0, 1), (function(s) {
            return e("div", {
              key: s,
              staticClass: "card m-panel card4"
            }, [e("a", {
              on: {
                click: function(e) {
                  return e.preventDefault(), t.confirmKeyword(s)
                }
              }
            }, [e("div", {
              staticClass: "card-wrap"
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "box-left m-box-col m-box-center-a"
            }, [e("span", {
              staticClass: "link-text"
            }, [e("span", {
              staticClass: "main-link"
            }, [t._v(t._s(s))])])])])])])])])
          })), t._l(t.userSuggestions, (function(s) {
            return e("div", {
              key: s.screen_name,
              staticClass: "m-panel m-avatar-box card",
              on: {
                click: function(e) {
                  return t.$router.push({
                    path: "/profile/" + s.id,
                    query: {
                      user_token: s.user_token
                    }
                  })
                }
              }
            }, [e("div", {
              staticClass: "card-wrap"
            }, [e("div", {
              staticClass: "card-main m-box m-contact-list"
            }, [e("div", {
              staticClass: "m-img-box"
            }, [e("img", {
              attrs: {
                src: s.profile_image_url
              }
            }), e("weibo-verified", {
              attrs: {
                user: s
              }
            })], 1), e("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [e("div", {
              staticClass: "m-text-box"
            }, [e("h3", {
              domProps: {
                innerHTML: t._s(s.screen_name)
              }
            })])])])])])
          })), t._l(t.keywordSuggestions.slice(1), (function(s, i) {
            return e("div", {
              key: i,
              staticClass: "card m-panel card4"
            }, [e("a", {
              on: {
                click: function(e) {
                  return e.preventDefault(), t.confirmKeyword(s)
                }
              }
            }, [e("div", {
              staticClass: "card-wrap"
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "box-left m-box-col m-box-center-a"
            }, [e("span", {
              staticClass: "link-text"
            }, [e("span", {
              staticClass: "main-link"
            }, [t._v(t._s(s))])])])])])])])])
          }))], 2) : t.allHistoryItems.length && !t.keyword ? e("div", {
            staticClass: "card-list"
          }, [t._l(t.allHistoryItems, (function(s, i) {
            return e("div", {
              key: s,
              staticClass: "card m-panel card4"
            }, [e("a", {
              on: {
                click: function(e) {
                  return e.preventDefault(), t.confirmKeyword(s)
                }
              }
            }, [e("div", {
              staticClass: "card-wrap"
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "box-left m-box-col m-box-center-a"
            }, [t._m(0, !0), e("span", {
              staticClass: "link-text"
            }, [e("span", {
              staticClass: "main-link"
            }, [t._v(t._s(s))])])]), e("div", {
              staticClass: "box-right m-box-center-a",
              on: {
                click: function(s) {
                  return s.stopPropagation(), t.deleteHistoryItem(i)
                }
              }
            }, [e("i", {
              staticClass: "m-font m-font-close"
            })])])])])])])
          })), !t.historyShowLength || t.historyShowLength < t.historyItems.length ? e("div", {
            staticClass: "card m-panel card6"
          }, [e("div", {
            staticClass: "card-wrap"
          }, [e("div", {
            staticClass: "card-main"
          }, [e("a", {
            staticClass: "color-gray",
            on: {
              click: t.showAllHistoryList
            }
          }, [t._v(t._s(t.historyShowLength ? "全部" : "清除") + "搜索记录")])])])]) : t._e()], 2) : t._e()]) : t._e()])
        },
        a = [function() {
          var t = this,
            s = t.$createElement,
            e = t._self._c || s;
          return e("span", {
            staticClass: "history-icon"
          }, [e("i", {
            staticClass: "lite-iconf lite-iconf-his"
          })])
        }],
        r = (e("7ad2"), e("7c02"), e("e675"), e("0277"), e("4294"), e("b5d2")),
        n = e("19d6"),
        o = e("8ccc"),
        c = e.n(o),
        l = e("5d2d");

      function u(t, s) {
        var e = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          s && (i = i.filter((function(s) {
            return Object.getOwnPropertyDescriptor(t, s).enumerable
          }))), e.push.apply(e, i)
        }
        return e
      }

      function d(t) {
        for (var s = 1; s < arguments.length; s++) {
          var e = null != arguments[s] ? arguments[s] : {};
          s % 2 ? u(Object(e), !0).forEach((function(s) {
            Object(r["a"])(t, s, e[s])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : u(Object(e)).forEach((function(s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(e, s))
          }))
        }
        return t
      }
      var h = "h5_search_history",
        m = {
          data: function() {
            return {
              historyItems: [],
              keyword: "",
              userSuggestions: [],
              keywordSuggestions: [],
              spotSuggestions: [],
              historyShowLength: 2
            }
          },
          created: function() {
            this.getHistoryList()
          },
          computed: d(d({}, Object(n["c"])(["config"])), {}, {
            allHistoryItems: function() {
              return this.historyItems.slice(0, this.historyShowLength)
            },
            isSpot: function() {
              return 0 === this.keyword.indexOf("#") ? this.keyword.replace(/#/g, "") : ""
            }
          }),
          methods: {
            getHistoryList: function() {
              if (l["a"].hasData(h)) {
                var t = l["a"].getData(h);
                t.user !== this.config.uid && this.config.uid ? l["a"].removeData(h) : this.historyItems = t.history
              }
            },
            deleteHistoryItem: function(t) {
              this.historyItems.splice(t, 1)
            },
            showAllHistoryList: function() {
              this.historyShowLength ? this.historyShowLength = void 0 : this.historyItems = []
            },
            confirmKeyword: function(t) {
              var s = t || this.keyword;
              if (s) {
                var e = -1,
                  i = 10;
                if (this.historyItems.some((function(t, i) {
                    return t === s && (e = i)
                  })), e > -1 && this.deleteHistoryItem(e), this.historyItems.unshift(s), this.historyItems.length > i && this.historyItems.splice(0, i), l["a"].setData(h, {
                    user: this.config.uid,
                    history: this.historyItems
                  }), 0 === s.indexOf("#")) {
                  var a = s.replace(/#/g, "");
                  window.location.href = "/k/".concat(a)
                } else {
                  var r = encodeURIComponent("type=1&q=".concat(s));
                  this.$router.push({
                    path: "/p/100103".concat(r),
                    query: {
                      type: "all",
                      queryVal: s,
                      featurecode: 20000320,
                      luicode: 10000011,
                      lfid: "106003type=1",
                      title: s
                    }
                  })
                }
              }
            },
            getSearchSuggestions: c()((function() {
              var t = this,
                s = this.keyword;
              s && (this.isSpot ? this.$http.get("api/suggest/shotspot", {
                params: {
                  keyword: this.isSpot
                }
              }).then((function(s) {
                if (!(s.data.ok > 0)) throw new Error;
                t.spotSuggestions = s.data.data.map((function(t) {
                  return {
                    content: t.content,
                    containerid: t.containerid
                  }
                }))
              })).catch((function() {
                t.cleanSearchSuggestions()
              })) : this.$http.get("api/search/suggest", {
                params: {
                  keyword: s
                }
              }).then((function(s) {
                if (!(s.data.ok > 0)) throw new Error;
                var e = s.data.data;
                t.userSuggestions = e.users || [], t.keywordSuggestions = e.suggestion.map((function(t) {
                  return t.suggestion
                }))
              })).catch((function() {
                t.cleanSearchSuggestions()
              })))
            }), 1e3),
            cleanKeyword: function() {
              this.keyword = ""
            },
            cleanSearchSuggestions: function() {
              this.userSuggestions = [], this.keywordSuggestions = [], this.spotSuggestions = []
            }
          },
          watch: {
            historyItems: function(t) {
              l["a"].setData(h, {
                user: this.config.uid,
                history: t
              })
            },
            keyword: function(t) {
              t || this.cleanSearchSuggestions(), this.$emit("update:keyword", t)
            }
          },
          components: {
            weiboVerified: e("21a9").default
          }
        },
        f = m,
        p = (e("e782"), e("da34")),
        v = Object(p["a"])(f, i, a, !1, null, null, null);
      s["default"] = v.exports
    },
    a1b2: function(t, s, e) {},
    a5eb: function(t, s, e) {
      "use strict";
      e("a1b2")
    },
    e782: function(t, s, e) {
      "use strict";
      e("37ad")
    }
  }
]);
//# sourceMappingURL=search.fb27c56b.js.map
