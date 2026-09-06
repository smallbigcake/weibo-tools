(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["composer-miniComposer"], {
    "08ff": function(t, e, n) {
      "use strict";
      n("4294"), n("4437");

      function i(t) {
        if (!t) return 0;
        var e = t.match(/[^\x00-\xff]/g);
        return t.length + (e ? e.length : 0)
      }
      e["a"] = function(t, e) {
        var n = e || 140,
          a = 41,
          s = 20,
          r = t.replace(/(^\s*)|(\s*$)/g, "");
        r = r.replace(/(\n+)/g, "\n");
        for (var o = t.match(/http(s*):\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_$.+!*()/,:;@&=?~#%]*)*/gi) || [], c = 0, u = 0, l = o.length; u < l; u++) {
          var d = i(o[u]);
          /^(http:\/\/t\.cn)/.test(o[u]) || (/^(http(s*):\/\/)+(t\.sina\.com\.cn|t\.sina\.cn)/.test(o[u]) || /^(http(s*):\/\/)+(weibo\.com|weibo\.cn)/.test(o[u]) ? c += d <= a ? d : d <= n ? s : d - n + s : c += d <= n ? s : d - n + s, r = r.replace(o[u], ""))
        }
        return Math.ceil((c + i(r)) / 2)
      }
    },
    "09d4": function(t, e, n) {
      "use strict";
      n.r(e);
      var i = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "card card31",
            class: {
              "on-search": t.onsearch
            }
          }, [n("div", {
            staticClass: "card-wrap"
          }, [n("div", {
            staticClass: "card-main"
          }, [n("div", {
            staticClass: "m-box"
          }, [n("form", {
            staticClass: "m-box-col",
            attrs: {
              action: "."
            },
            on: {
              submit: function(e) {
                return e.preventDefault(), t.submit.apply(null, arguments)
              }
            }
          }, [n("label", {
            staticClass: "m-search"
          }, [n("i", {
            staticClass: "m-font m-font-search"
          }), n("input", {
            directives: [{
              name: "model",
              rawName: "v-model.trim",
              value: t.q,
              expression: "q",
              modifiers: {
                trim: !0
              }
            }],
            attrs: {
              type: "search",
              placeholder: "搜索"
            },
            domProps: {
              value: t.q
            },
            on: {
              input: [function(e) {
                e.target.composing || (t.q = e.target.value.trim())
              }, t.input],
              focus: function(e) {
                t.onsearch = 1
              },
              blur: function(e) {
                return t.$forceUpdate()
              }
            }
          })])]), n("div", {
            staticClass: "search-cancel m-box-center-a",
            on: {
              click: t.cancel
            }
          }, [t._v("取消")])])])])])
        },
        a = [],
        s = {
          name: "card31",
          props: {
            init: Boolean
          },
          data: function() {
            return {
              onsearch: !1,
              q: ""
            }
          },
          watch: {
            init: function(t) {
              t && (this.q = "")
            }
          },
          methods: {
            submit: function() {
              this.$emit("inputText", this.q.trim())
            },
            input: function() {
              var t = navigator.connection || navigator.webkitConnection,
                e = navigator.platform;
              (t && "wifi" === t.type || 0 === e.indexOf("Win") || 0 === e.indexOf("Mac") || !("ontouchstart" in document) || !window.navigator.onLine) && this.$emit("inputText", this.q.trim())
            },
            cancel: function() {
              this.q.length || this.$router.go(-1), this.onsearch = 0, this.q = "", this.$emit("inputText", "")
            }
          }
        },
        r = s,
        o = (n("e348"), n("da34")),
        c = Object(o["a"])(r, i, a, !1, null, null, null);
      e["default"] = c.exports
    },
    1192: function(t, e, n) {
      "use strict";
      n.r(e);
      var i = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "contact-fixed m-container-max"
          }, [n("div", {
            staticClass: "contactlist"
          }, [n("card31", {
            attrs: {
              init: t.inactive
            },
            on: {
              inputText: t.search
            }
          }), t.filterStr.length ? n("div", {
            staticClass: "card m-panel card32",
            on: {
              click: function(e) {
                return t.$emit("callback", t.filterStr)
              }
            }
          }, [n("div", {
            staticClass: "card-wrap"
          }, [n("div", {
            staticClass: "card-main"
          }, [n("div", {
            staticClass: "m-box"
          }, [n("h3", {
            staticClass: "m-box-col m-box-center-a"
          }, [t._v("\n              @"), n("b", {
            domProps: {
              textContent: t._s(t.filterStr)
            }
          })])])])])]) : t._e(), n("ul", {
            directives: [{
              name: "inf-scroll",
              rawName: "v-inf-scroll",
              value: t.getList,
              expression: "getList"
            }],
            staticClass: "card"
          }, t._l(t.contactListFilter, (function(e) {
            return n("li", {
              directives: [{
                name: "mvlink",
                rawName: "v-mvlink",
                value: e,
                expression: "person"
              }],
              key: e.screen_name,
              staticClass: "m-panel m-avatar-box",
              on: {
                click: function(n) {
                  return t.selectFriend(e)
                }
              }
            }, [n("div", {
              staticClass: "card-wrap"
            }, [n("div", {
              staticClass: "card-main m-box m-contact-list"
            }, [n("div", {
              staticClass: "m-img-box"
            }, [n("img", {
              attrs: {
                src: e.profile_image_url
              }
            }), n("weibo-verified", {
              attrs: {
                user: e
              }
            })], 1), n("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [n("div", {
              staticClass: "m-text-box"
            }, [n("h3", {
              domProps: {
                innerHTML: t._s(e.name)
              }
            })])])])])])
          })), 0), n("mv-nextpage", {
            attrs: {
              requesting: t.loading
            }
          }), n("ul", {
            staticClass: "card"
          }, t._l(t.globalSearchList, (function(e) {
            return n("li", {
              directives: [{
                name: "mvlink",
                rawName: "v-mvlink",
                value: e,
                expression: "person"
              }],
              key: e.screen_name + "0",
              staticClass: "m-panel m-avatar-box",
              on: {
                click: function(n) {
                  return t.$emit("callback", e.screen_name)
                }
              }
            }, [n("div", {
              staticClass: "card-wrap"
            }, [n("div", {
              staticClass: "card-main m-box m-contact-list"
            }, [n("div", {
              staticClass: "m-img-box"
            }, [n("img", {
              attrs: {
                src: e.profile_image_url
              }
            }), n("weibo-verified", {
              attrs: {
                user: e
              }
            })], 1), n("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [n("div", {
              staticClass: "m-text-box"
            }, [n("h3", {
              domProps: {
                innerHTML: t._s(e.screen_name)
              }
            })])])])])])
          })), 0), t.filterStr.length && !t.globalSearchList.length ? n("div", {
            staticClass: "card m-panel card6",
            on: {
              click: t.getGlobalSearchList
            }
          }, [t._m(0)]) : t._e()], 1)])
        },
        a = [function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", {
            staticClass: "card-wrap"
          }, [n("div", {
            staticClass: "card-main"
          }, [n("a", {
            staticClass: "color-gray"
          }, [t._v("在网络上搜索")])])])
        }],
        s = (n("7ad2"), n("7c02"), n("e675"), n("0277"), n("b5d2")),
        r = (n("4294"), n("0473"), n("62ac")),
        o = n.n(r),
        c = n("ac33"),
        u = n.n(c),
        l = n("8ccc"),
        d = n.n(l),
        h = n("5d2d");

      function f(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e && (i = i.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), n.push.apply(n, i)
        }
        return n
      }

      function m(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2 ? f(Object(n), !0).forEach((function(e) {
            Object(s["a"])(t, e, n[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
          }))
        }
        return t
      }
      var g = "H5_CONTACT_LIST",
        p = {
          data: function() {
            return {
              loading: !1,
              total_number: void 0,
              filterStr: "",
              searchPage: 1,
              globalSearchList: [],
              contactList: [],
              curPage: 1,
              inactive: !1
            }
          },
          created: function() {
            h["a"].hasData(g, !0) && (this.contactList = this.duplicateRemoval(h["a"].getData(g, !0)))
          },
          activated: function() {
            this.inactive = !1
          },
          deactivated: function() {
            this.filterStr = "", this.globalSearchList = [], this.inactive = !0
          },
          methods: {
            duplicateRemoval: function(t) {
              var e = {};
              return t.reduceRight((function(t, n) {
                return !e[n.id] && (e[n.id] = t.push(n)), t
              }), [])
            },
            search: function(t) {
              this.globalSearchList = [], this.filterStr = t
            },
            getList: function() {
              this.inactive || (this.filterStr.length ? this.getSearchList() : this.getContactList())
            },
            setContactList: function(t) {
              var e = o()(t, this.contactList, u.a);
              1 === this.curPage ? this.contactList = this.duplicateRemoval(e.concat(this.contactList)) : this.contactList = this.duplicateRemoval(this.contactList.concat(e))
            },
            unshiftContactPerson: function(t) {
              var e = -1,
                n = this.contactList;
              if (n.some((function(n, i) {
                  return e = i, n.screen_name === t.screen_name
                })), e > -1) {
                var i = n.splice(e, 1)[0];
                n.unshift(i)
              }
            },
            selectFriend: function(t) {
              this.unshiftContactPerson(t), this.$emit("callback", t.screen_name)
            },
            getGlobalSearchList: function() {
              var t = this;
              this.$http.get("api/search/users", {
                params: {
                  keyword: this.filterStr
                }
              }).then((function(e) {
                var n = e.data;
                n.ok > 0 && (t.globalSearchList = n.data.users)
              }))
            },
            getSearchList: function() {
              var t = this;
              this.searchPage && !this.loading && this.contactList.length !== this.total_number && (this.loading = !0, this.$http.get("api/search/atusers", {
                params: {
                  keyword: this.filterStr,
                  page: this.searchPage
                }
              }).then((function(e) {
                if (e.data.ok > 0) {
                  var n = e.data.data;
                  t.setContactList(n.users), t.searchPage = n.page
                } else t.searchPage = 0;
                t.$nextTick((function() {
                  t.loading = !1
                }))
              })))
            },
            getContactList: function() {
              var t = this;
              this.loading || this.contactList.length === this.total_number || (this.loading = !0, this.$http.get("api/friendships/friends", {
                params: {
                  page: this.curPage
                }
              }).then((function(e) {
                var n = e.data;
                if (n && n.ok > 0) {
                  var i = n.data;
                  if (i.users && i.users.length) {
                    t.total_number = i.total_number;
                    var a = t.contactList.length;
                    t.setContactList(i.users), t.curPage = i.page, t.$nextTick((function() {
                      if (a && t.contactList.length === a) {
                        var e = Math.ceil(t.contactList.length / 20);
                        t.curPage = Math.max(e, i.page)
                      }
                    }))
                  }
                } else 100011 === +n.errno && (t.total_number = t.contactList.length);
                t.$nextTick((function() {
                  t.loading = !1
                }))
              })))
            }
          },
          watch: {
            contactList: function(t) {
              h["a"].setData(g, t, !0)
            },
            filterStr: d()((function() {
              this.searchPage = 1, this.getSearchList()
            }), 1e3)
          },
          computed: {
            contactListFilter: function() {
              var t = new RegExp(this.filterStr, "gi");
              return this.contactList.filter((function(e) {
                return e.screen_name && t.test(e.screen_name) || e.remark && t.test(e.remark)
              })).map((function(e) {
                var n = e.screen_name.replace(t, (function(t) {
                    return "<b>".concat(t, "</b>")
                  })),
                  i = e.remark ? "<i>".concat(e.remark, "</i>") : "";
                return m({
                  name: n + i
                }, e)
              }))
            }
          },
          components: {
            weiboVerified: n("21a9").default,
            card31: n("09d4").default
          }
        },
        v = p,
        b = (n("270c"), n("df25"), n("da34")),
        x = Object(b["a"])(v, i, a, !1, null, null, null);
      e["default"] = x.exports
    },
    "21a9": function(t, e, n) {
      "use strict";
      n.r(e);
      var i = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return t.cls ? n("i", {
            staticClass: "m-icon",
            class: t.clsName
          }) : t._e()
        },
        a = [],
        s = {
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
        r = s,
        o = (n("a5eb"), n("5478"), n("da34")),
        c = Object(o["a"])(r, i, a, !1, null, "32bf3e32", null);
      e["default"] = c.exports
    },
    2360: function(t, e, n) {},
    "270c": function(t, e, n) {
      "use strict";
      n("5105")
    },
    5105: function(t, e, n) {},
    5478: function(t, e, n) {
      "use strict";
      n("2360")
    },
    "547c": function(t, e, n) {},
    "556c": function(t, e, n) {
      "use strict";
      n("547c")
    },
    "5d6e": function(t, e, n) {},
    7694: function(t) {
      t.exports = JSON.parse('["😅","😂","🤓","😌","😍","🤑","🤗","😒","😩","🙄","🤔","😳","😱","👋","☝️","🖕","💁","🙅","🙆","🙋","🐷","🐸","🐣","🌚","🌝","🌫","😷","🍄","💊","💔","💯","💢","🚫","🔞","🏳"]')
    },
    a1b2: function(t, e, n) {},
    a5eb: function(t, e, n) {
      "use strict";
      n("a1b2")
    },
    cd63: function(t, e, n) {},
    df25: function(t, e, n) {
      "use strict";
      n("cd63")
    },
    e348: function(t, e, n) {
      "use strict";
      n("5d6e")
    },
    f697: function(t, e, n) {
      "use strict";
      n.r(e);
      var i = function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("transition", {
            attrs: {
              name: "fadeUpBig"
            },
            on: {
              "after-enter": t.scrollIntoView
            }
          }, [n("div", {
            staticClass: "emotionGroups"
          }, [n("v-touch", {
            staticClass: "touchArea",
            on: {
              pan: t.onPan,
              panend: t.onPanEnd,
              touchmove: function(t) {
                t.preventDefault(), t.stopPropagation()
              }
            }
          }, [t._l(t.emotionPages, (function(e, i) {
            return n("div", {
              key: e.name + i,
              staticClass: "emotion",
              class: [{
                cur: e.cur
              }],
              style: {
                transform: t.calcTranslateX(e),
                transitionDuration: t.calcTransitionDuration(e)
              },
              on: {
                transitionend: function(e) {
                  t.transiting = !1
                }
              }
            }, t._l(e.emotions, (function(e) {
              return n("div", {
                directives: [{
                  name: "mactive",
                  rawName: "v-mactive"
                }],
                key: e,
                staticClass: "m-box-center m-box-center-a face-wrap",
                class: t.getGroupName(e),
                on: {
                  click: function(n) {
                    return t.clickEmotion(e)
                  }
                }
              }, [n("span", {
                staticClass: "face_wrapper",
                class: [{
                  face: t.getFaceClass(e)
                }, t.getFaceClass(e)]
              }, [t._v(t._s(e))])])
            })), 0)
          })), n("div", {
            staticClass: "dots"
          }, [t.emotionPages[t.pageIndex].text ? [n("span", {
            staticClass: "text",
            domProps: {
              textContent: t._s(t.emotionPages[t.pageIndex].text)
            }
          })] : t._l(t.curGroupPages, (function(e, i) {
            return n("span", {
              key: e,
              staticClass: "dot",
              class: {
                cur: t.curGroupPageIndex === i
              }
            })
          }))], 2)], 2), n("div", {
            staticClass: "nav"
          }, [n("ul", t._l(t.curGroup, (function(e) {
            return n("li", {
              key: e,
              class: [t.emotionPages[e].name, t.emotionPages[e].name === t.emotionPages[t.pageIndex].name ? "cur" : ""],
              on: {
                click: function(n) {
                  return t.goToPage(e)
                }
              }
            }, [n("span", {
              staticClass: "face",
              class: t.getFaceClass(t.emotionPages[e].hideEmotion ? t.emotionPages[e].hideEmotion : t.emotionPages[e].emotions[0])
            }, [t._v("\n            " + t._s(t.isEmoji(t.emotionPages[e].hideEmotion)))])])
          })), 0)])], 1)])
        },
        a = [],
        s = (n("7521"), n("1f2f"), n("ffba"), n("7ad2"), n("0277"), n("8354"), n("7c02"), n("e675"), n("e11f"), n("2828"), n("aed3")),
        r = n("b5d2"),
        o = (n("436f"), n("bedc"), n("6b41"), n("261c"), n("0e0a"), n("90c5"), n("5d2d")),
        c = function(t, e) {
          try {
            var n = document.createElement("canvas");
            n.width = 2, n.height = 2;
            var i = n.getContext("2d");
            i.textBaseline = "top", i.font = "100px -no-font-family-here-", i.fillStyle = e, i.scale(.01, .01), i.fillText(t, 0, 0);
            for (var a = i.getImageData(0, 0, 2, 2).data, s = [], r = 0; r < a.length; r++) s[r] = a[r];
            return s.reduce((function(t, e) {
              return t + e
            }), 0) > 0 && s.toString()
          } catch (o) {
            return !1
          }
        },
        u = function(t, e) {
          var n = c(t, "#000");
          return e ? n && n === c(t, "#FFF") : n
        },
        l = function(t) {
          var e = u("😁");
          return u(t, e)
        };

      function d(t, e) {
        var n = "undefined" !== typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!n) {
          if (Array.isArray(t) || (n = h(t)) || e && t && "number" === typeof t.length) {
            n && (t = n);
            var i = 0,
              a = function() {};
            return {
              s: a,
              n: function() {
                return i >= t.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: t[i++]
                }
              },
              e: function(t) {
                throw t
              },
              f: a
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var s, r = !0,
          o = !1;
        return {
          s: function() {
            n = n.call(t)
          },
          n: function() {
            var t = n.next();
            return r = t.done, t
          },
          e: function(t) {
            o = !0, s = t
          },
          f: function() {
            try {
              r || null == n.return || n.return()
            } finally {
              if (o) throw s
            }
          }
        }
      }

      function h(t, e) {
        if (t) {
          if ("string" === typeof t) return f(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(t, e) : void 0
        }
      }

      function f(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
        return i
      }

      function m(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var i = Object.getOwnPropertySymbols(t);
          e && (i = i.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), n.push.apply(n, i)
        }
        return n
      }

      function g(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2 ? m(Object(n), !0).forEach((function(e) {
            Object(r["a"])(t, e, n[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
          }))
        }
        return t
      }
      var p = {
          default: n("7851"),
          others: n("b1f1"),
          emoji: n("7694"),
          movies: n("3579"),
          doraemon: n("bbf1"),
          lxh: n("1b8b")
        },
        v = {
          default: "爱你",
          others: "佩奇",
          emoji: "😂",
          movies: "小红花",
          doraemon: "哆啦A梦吃惊",
          lxh: "羞嗒嗒"
        },
        b = n("2755"),
        x = "H5_COMPOSE_USED_EMOTION",
        P = 21,
        y = {
          name: "used",
          text: "最近使用的表情",
          cur: !1,
          deltaX: 0
        },
        C = [],
        _ = {
          data: function() {
            return {
              inactive: !1,
              emotionPages: [],
              dragging: !1,
              pageWidth: 0,
              pageIndex: 0,
              usedEmotions: [],
              transiting: !1
            }
          },
          created: function() {
            var t = this;
            if (document.body.addEventListener("click", t.hideEmotion), o["a"].hasData(x)) {
              var e = o["a"].getData(x),
                n = e.split(",");
              this.usedEmotions = n.filter((function(t) {
                return b[t] || l(t)
              })), o["a"].setData(x, this.usedEmotions.join(","));
              var i = g({
                emotions: [].concat(this.usedEmotions)
              }, y);
              this.emotionPages.unshift(i)
            }

            function a(e) {
              var n = p[e];
              "emoji" === e && (n = p[e].filter((function(t) {
                return l(t)
              })));
              var i = Object(s["a"])(new Set(n));
              while (i && i.length) t.emotionPages.push({
                name: e,
                hideEmotion: v[e],
                cur: !1,
                deltaX: 0,
                emotions: i.splice(0, P)
              })
            }
            for (var r in p) a(r);
            this.init()
          },
          activated: function() {
            this.inactive = !1
          },
          deactivated: function() {
            var t = [].concat(this.usedEmotions);
            "used" === this.emotionPages[0].name ? this.emotionPages[0].emotions = t : t.length > 0 && (this.emotionPages.unshift(g({
              emotions: t
            }, y)), this.pageIndex++), this.inactive = !0
          },
          mounted: function() {
            var t = this;
            this.$nextTick((function() {
              t.onResize(), window.addEventListener("resize", t.resize)
            }))
          },
          computed: {
            nextIndex: function() {
              return (this.pageIndex + 1) % this.emotionPages.length
            },
            prevIndex: function() {
              return (this.pageIndex - 1 + this.emotionPages.length) % this.emotionPages.length
            },
            curGroupPageIndex: function() {
              var t = this,
                e = -1;
              return this.emotionPages.some((function(n, i, a) {
                var s = a[t.pageIndex].name === n.name;
                return s && (e = i), s
              })), this.pageIndex - e
            },
            curGroupPages: function() {
              var t = this;
              return this.emotionPages.filter((function(e, n, i) {
                return e.name === i[t.pageIndex].name
              })).length
            },
            curGroup: function() {
              var t = [];
              return this.emotionPages.reduce((function(e, n, i) {
                return e !== n.name && t.push(i), n.name
              }), ""), t
            }
          },
          methods: {
            isEmoji: function(t) {
              return p.emoji.indexOf(t) > -1 ? t : ""
            },
            scrollIntoView: function() {
              this.$el.scrollIntoView()
            },
            init: function() {
              var t, e = d(this.emotionPages);
              try {
                for (e.s(); !(t = e.n()).done;) {
                  var n = t.value;
                  n.cur = !1, n.deltaX = 0
                }
              } catch (i) {
                e.e(i)
              } finally {
                e.f()
              }
              this.emotionPages.length && (this.emotionPages[this.pageIndex].cur = !0)
            },
            getFaceClass: function(t) {
              return b[t] ? b[t].class : ""
            },
            getGroupName: function(t) {
              return b[t] ? b[t].group : ""
            },
            goToPage: function(t) {
              this.pageIndex = t, this.init()
            },
            hideEmotion: function(t) {
              var e = t.target;
              while (e && this.$el.parentNode !== e && document.body !== e) e = e.parentNode;
              e && e !== this.$el.parentNode && !this.inactive && this.$emit("hide")
            },
            clickEmotion: function(t) {
              if (!this.transiting) {
                var e = b[t] && "→_→" !== t ? "[".concat(t, "]") : t;
                this.$emit("callback", e);
                var n = this.usedEmotions.indexOf(t);
                n > -1 ? this.usedEmotions.splice(n, 1) : this.usedEmotions.length > P - 1 && this.usedEmotions.pop(), this.usedEmotions.unshift(t), o["a"].setData(x, this.usedEmotions.join(","))
              }
            },
            calcTranslateX: function(t) {
              return "translateX(".concat(t.deltaX, "px)")
            },
            calcTransitionDuration: function(t) {
              return t.cur && !this.dragging ? "200ms" : "0s"
            },
            onResize: function() {
              this.pageWidth = this.$el.offsetWidth
            },
            onPan: function(t) {
              var e = this.emotionPages;
              e.length && (this.dragging = !0, C.push(t.distance), C.length > 10 && C.shift(), e[this.pageIndex].deltaX = t.deltaX, t.deltaX < 0 ? (e[this.nextIndex].cur = !0, e[this.nextIndex].deltaX = t.deltaX + this.pageWidth) : (e[this.prevIndex].cur = !0, e[this.prevIndex].deltaX = t.deltaX - this.pageWidth))
            },
            onPanEnd: function(t) {
              var e = this.emotionPages;
              if (e.length) {
                var n = Math.abs(C[0] - C[C.length - 1]) / C.length;
                this.dragging = !1, this.transiting = !0, n > 5 || t.distance > .5 * this.pageWidth || t.distance > 150 ? t.deltaX < 0 ? this.goNext() : this.goPrev() : (e[this.pageIndex].deltaX = 0, t.deltaX < 0 ? e[this.nextIndex].deltaX = this.pageWidth : e[this.prevIndex].deltaX = -this.pageWidth)
              }
            },
            goNext: function() {
              var t = this.emotionPages;
              t[this.nextIndex].cur = !0, t[this.nextIndex].deltaX = 0, t[this.pageIndex].deltaX = -this.pageWidth, this.pageIndex = this.nextIndex
            },
            goPrev: function() {
              var t = this.emotionPages;
              t[this.prevIndex].cur = !0, t[this.pageIndex].deltaX = this.pageWidth, t[this.prevIndex].deltaX = 0, this.pageIndex = this.prevIndex
            }
          },
          watch: {
            dragging: function(t) {
              t || (C = [])
            },
            pageIndex: function() {
              "used" === this.emotionPages[0].name && (this.emotionPages[0].emotions = [].concat(this.usedEmotions))
            }
          },
          destroyed: function() {
            var t = this;
            document.body.removeEventListener("click", t.hideEmotion)
          }
        },
        w = _,
        O = (n("556c"), n("da34")),
        I = Object(O["a"])(w, i, a, !1, null, "4b99cc1d", null);
      e["default"] = I.exports
    }
  }
]);
//# sourceMappingURL=composer-miniComposer.0edb042d.js.map
