(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["draft"], {
    4559: function(t, e, a) {
      "use strict";
      a.r(e);
      var r = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", [a("div", {
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
          })]), t._m(0)]), a("div", {
            staticClass: "star-feed star-feed-draft",
            staticStyle: {
              "margin-top": "2.68rem"
            }
          }, t._l(t.draftArr, (function(e, r) {
            return a("div", {
              key: e.draftId,
              staticClass: "card m-panel"
            }, [a("div", {
              staticClass: "card-wrap",
              on: {
                click: function(a) {
                  return t.gotoDraft(e)
                }
              }
            }, [a("div", {
              staticClass: "card-main"
            }, [a("header", [t._v("\n            " + t._s(e.type ? 1 === e.type ? "转发" : 2 === e.type ? "评论" : 4 === e.type ? "回复评论" : "" : "原创")), a("i", {
              staticClass: "star-font star-font-timer"
            }), a("span", {
              staticClass: "time"
            }, [t._v(t._s(t._f("timeFormat")(e.draftId)))])]), a("article", [a("div", {
              staticClass: "weibo-og"
            }, [e.pids ? a("div", {
              staticClass: "weibo-media"
            }, [a("div", {
              staticClass: "m-box"
            }, [a("div", {
              staticClass: "m-img-box"
            }, [a("img", {
              attrs: {
                src: t.getImgUrl(e.pids)
              }
            })]), a("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [a("div", {
              staticClass: "m-text-box"
            }, [a("div", {
              staticClass: "weibo-text"
            }, [t._v(t._s(e.text))])])])])]) : a("div", {
              staticClass: "weibo-text"
            }, [t._v(t._s(e.text))])])]), a("footer", {
              staticClass: "m-ctrl-box m-box-center-a"
            }, [a("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a",
              on: {
                click: function(a) {
                  return a.preventDefault(), a.stopPropagation(), t.deleteDraftItem(e.draftId, r)
                }
              }
            }, [a("i", {
              staticClass: "star-font star-font-del"
            }), a("h4", [t._v("删除")])]), a("span", {
              staticClass: "m-line-gradient"
            }), a("div", {
              directives: [{
                name: "mactive",
                rawName: "v-mactive"
              }],
              staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a"
            }, [a("i", {
              staticClass: "star-font star-font-edit"
            }), a("h4", [t._v("编辑")])])])])])])
          })), 0)])
        },
        i = [function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", {
            staticClass: "nav-main"
          }, [a("h4", [t._v("草稿箱")])])
        }],
        s = (a("7ad2"), a("7c02"), a("e675"), a("0277"), a("b5d2")),
        n = a("19d6"),
        c = a("5d2d"),
        o = a("383a"),
        d = a("d39f");

      function f(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e && (r = r.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), a.push.apply(a, r)
        }
        return a
      }

      function l(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2 ? f(Object(a), !0).forEach((function(e) {
            Object(s["a"])(t, e, a[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : f(Object(a)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
          }))
        }
        return t
      }
      var m = "h5_draft",
        u = null,
        p = {
          data: function() {
            return {
              draftArr: []
            }
          },
          created: function() {
            this.init()
          },
          watch: {
            config: function() {
              this.init()
            }
          },
          computed: l({}, Object(n["c"])(["config"])),
          mixins: [d["a"]],
          methods: l(l({
            init: function() {
              var t = this;
              c["a"].hasData(m) && (u = c["a"].getData(m), this.draftArr = u.filter((function(e) {
                return e.userId === +t.config.uid
              })))
            }
          }, Object(n["b"])(["updateComposer"])), {}, {
            getImgUrl: function(t) {
              return "https://ww1.sinaimg.cn/small/".concat(t[0])
            },
            deleteDraftItem: function(t, e) {
              var a = this;
              o["a"].$emit("mvMsgbox", {
                title: "确认删除这个草稿？",
                type: "confirm"
              }, (function() {
                a.deleteDraft(t), a.draftArr.splice(e, 1), a.draftArr.length || a.$router.go(-1), o["a"].$emit("mvMsgbox", !1)
              }))
            },
            gotoDraft: function(t) {
              var e = {
                draftId: t.draftId
              };
              t.mid && (e.mid = t.mid), t.cid && (e.cid = t.cid), t.pids && (e.pids = t.pids.join(","));
              var a = "";
              switch (t.type) {
                case 1:
                  a = "repost";
                  break;
                case 2:
                  a = "comment";
                  break;
                case 4:
                  a = "reply";
                  break;
                default:
                  a = "composer"
              }
              this.updateComposer(t.text), this.$router.push({
                name: a,
                query: e
              })
            }
          }),
          components: {}
        },
        v = p,
        b = (a("46fa"), a("da34")),
        g = Object(b["a"])(v, r, i, !1, null, null, null);
      e["default"] = g.exports
    },
    "46fa": function(t, e, a) {
      "use strict";
      a("a912")
    },
    a912: function(t, e, a) {},
    d39f: function(t, e, a) {
      "use strict";
      var r = a("5d2d"),
        i = "h5_draft";
      e["a"] = {
        methods: {
          deleteDraft: function(t) {
            var e = this;
            if (r["a"].hasData(i)) {
              var a = r["a"].getData(i),
                s = -1;
              if (a.some((function(a, r) {
                  return a.draftId === t && +e.$root.config.uid === +a.userId && (s = r, !0)
                })), s > -1) return a.splice(s, 1), r["a"].setData(i, a), !0
            }
            return !1
          }
        }
      }
    }
  }
]);
//# sourceMappingURL=draft.b174dd47.js.map
