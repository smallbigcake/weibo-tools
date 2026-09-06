(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-08c9d173"], {
    23335: function(e, t, n) {
      "use strict";
      var s = n("e170"),
        u = n.n(s);
      t["default"] = u.a
    },
    c978: function(e, t, n) {
      "use strict";
      n.r(t);
      var s = function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {
            class: e.$style.mngnav
          }, e._l(e.list, (function(t, s) {
            return n("div", {
              key: s,
              class: [s == e.mIndex ? e.$style.active : "", e.$style.menuitem]
            }, [
              [n("div", {
                class: e.$style.menutext,
                on: {
                  click: function(n) {
                    return e.showToggle(t, s, 0)
                  }
                }
              }, [e._v(" " + e._s(t.name) + " ")]), t.submenu && t.submenu.length > 0 ? n("woo-fonticon", {
                class: e.$style.fonticon,
                attrs: {
                  value: t.isShow ? "angleDown" : "angleRight"
                }
              }) : e._e(), n("ul", {
                directives: [{
                  name: "show",
                  rawName: "v-show",
                  value: t.submenu && t.isShow,
                  expression: "item.submenu && item.isShow"
                }],
                class: e.$style.submenu
              }, e._l(t.submenu, (function(t, s) {
                return n("li", {
                  key: s,
                  class: s == e.sIndex ? e.$style.active : "",
                  on: {
                    click: function(n) {
                      return e.showToggle(t, s, -1)
                    }
                  }
                }, [
                  [e._v(e._s(t.name))]
                ], 2)
              })), 0)]
            ], 2)
          })), 0)
        },
        u = [],
        i = (n("e547"), n("096f"), n("83ef"), n("7431"), n("44c1"), n("03ad"), n("f1e0"), n("07ca"), n("6f14")),
        a = n("ba1d"),
        r = {
          data: function() {
            return {
              list: [],
              frameLink: "",
              mIndex: 0,
              sIndex: -1
            }
          },
          created: function() {
            this.getMenus()
          },
          computed: Object(i["a"])({}, Object(a["c"])(["film"])),
          watch: {
            $route: function() {
              this.findCur(), this.furl = this.$route.query.furl || ""
            },
            furl: function() {
              this.findCur()
            }
          },
          methods: Object(i["a"])(Object(i["a"])({}, Object(a["b"])(["updateMenus"])), {}, {
            getMenus: function() {
              var e = this,
                t = this.$route.query.uid || "";
              this.$http.get("/ajax/manage/menus", {
                params: {
                  uid: t
                }
              }).then((function(t) {
                t.data.ok > 0 && !t.data.data.error && (e.list = t.data.data, e.list.map((function(t) {
                  return e.$set(t, "isShow", !1), t
                })), e.updateMenus(e.list), e.findCur())
              }))
            },
            handleProto: function(e) {
              return /^https:/.test(e) ? e : "https:".concat(e)
            },
            compareLink: function(e, t) {
              if (!e || !t) return !1;
              var n = new URL(this.handleProto(e)),
                s = new URL(this.handleProto(t));
              return n.origin + n.pathname === s.origin + s.pathname
            },
            findCur: function() {
              var e = this.$route.name;
              "MngCmt" === e && (e = "MngApproval");
              for (var t = this.$route.query.furl, n = 0; n < this.list.length; n++) {
                var s = this.list[n];
                if (s.submenu)
                  for (var u = 0; u < s.submenu.length; u++)("frame" === e && this.compareLink(t, s.submenu[u].link) || s.submenu[u].router === e && "frame" !== e || s.submenu[u].sbmenu && s.submenu[u].sbmenu.some((function(t) {
                    return t.router === e
                  })) && "frame" !== e) && (this.mIndex = n, this.sIndex = u, s.isShow = !0);
                else("frame" === e && this.compareLink(t, s.link) || s.router === e && "frame" !== e) && (this.mIndex = n)
              }
            },
            showToggle: function(e, t, n) {
              if (e.submenu) e.isShow ? e.isShow = !1 : (this.resetData(), e.isShow = !0, this.sIndex = -1);
              else {
                if (n >= 0 && this.resetData(), "new" === e.window) return void window.open(e.link, "_blank");
                "frame" === e.router ? this.$router.push({
                  name: e.router,
                  query: {
                    furl: e.link
                  }
                }) : this.$router.push({
                  name: e.router
                })
              }
              n >= 0 ? this.mIndex = t : this.sIndex = t
            },
            resetData: function() {
              this.list.map((function(e) {
                e.isShow = !1
              }))
            }
          })
        },
        o = r,
        c = n("23335"),
        l = n("04a2");

      function m(e) {
        this["$style"] = c["default"].locals || c["default"]
      }
      var h = Object(l["a"])(o, s, u, !1, m, null, null);
      t["default"] = h.exports
    },
    e170: function(e, t, n) {
      e.exports = {
        mngnav: "MngNav_mngnav_3CflD",
        menuitem: "MngNav_menuitem_1pY13",
        active: "MngNav_active_2N0PF",
        menutext: "MngNav_menutext_2nGFI",
        fonticon: "MngNav_fonticon_1F3bI",
        submenu: "MngNav_submenu_3PhiU"
      }
    }
  }
]);
