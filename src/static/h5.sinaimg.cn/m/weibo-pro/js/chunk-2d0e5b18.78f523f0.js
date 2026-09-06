(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2d0e5b18"], {
    9627: function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("iframe", {
            ref: "mngFrame",
            staticClass: "mngFrame",
            attrs: {
              src: e.frameLink,
              frameborder: "0",
              width: "100%"
            },
            on: {
              load: e.load
            }
          })
        },
        s = [],
        o = (i("ce6c"), i("b337"), i("f40f"), i("7431"), i("16e9"), i("a1a5"), i("44c1"), i("80e0"), i("39c3"), i("8fa2"), i("03ad"), i("f1e0"), i("07ca"), i("6f14")),
        r = i("ba1d"),
        a = i("28d7"),
        c = {
          components: {},
          data: function() {
            return {
              frameLink: "",
              links: []
            }
          },
          computed: Object(o["a"])({}, Object(r["c"])(["menus"])),
          created: function() {
            this.menus.length > 0 && this.checkLinks(), window.addEventListener("message", this.receiveMessage, !1)
          },
          beforeDestroy: function() {
            window.removeEventListener("message", this.receiveMessage, !1), this.ifr && this.ifr.destroy()
          },
          methods: {
            initIframe: function() {
              var e = this;
              this.$nextTick((function() {
                e.$refs.mngFrame && (e.ifr = Object(a["b"])()(e.$refs.mngFrame), e.ifr.on("getLayoutInfo", a["a"]))
              }))
            },
            receiveMessage: function(e) {
              var t = {};
              if (this.menus.length > 0)
                for (var i = 0; i < this.menus.length; i++) {
                  if (this.menus[i].id == e.data.id) {
                    t = this.menus[i];
                    break
                  }
                  if (this.menus[i].submenu && this.menus[i].submenu.length > 0 && (t = this.menus[i].submenu.find((function(t) {
                      return t.id == e.data.id
                    })), t)) break
                }
              if (t.id)
                if ("frame" == t.router) {
                  var n = {
                    furl: t.link
                  };
                  Object.assign(n, e.data.query), this.$router.push({
                    name: t.router,
                    query: n
                  })
                } else this.$router.push({
                  name: t.router
                })
            },
            recordCode: function() {
              var e = ["https://e.weibo.com/v1/public/stats/usergrowth", "https://e.weibo.com/v1/public/groupmsg/main", "https://e.weibo.com/v1/public/groupmsg/main", "https://e.weibo.com/v1/public/custommenu/main", "https://e.weibo.com/v1/public/foddermanage/list", "https://e.weibo.com/v1/public/devcenter/main"],
                t = ["https://e.weibo.com/v1/profit/record/profitrecord", "https://e.weibo.com/v1/public/paid/article", "https://e.weibo.com/v1/public/qa/answer", "https://e.weibo.com/v1/public/qa/getaccount", "https://pay.sc.weibo.com/center/pc/home/index"];
              this.frameLink.indexOf("friendchain") > 0 && this.actionLog({
                uicode: "20000370"
              }), this.frameLink.indexOf("lottery/startlist") > 0 && this.actionLog({
                uicode: "20000372"
              }), e.includes(this.frameLink) && this.actionLog({
                uicode: "20000371"
              }), t.includes(this.frameLink) && this.actionLog({
                uicode: "20000375"
              })
            },
            load: function() {
              if (this.$refs.mngFrame) try {
                var e = this.$refs.mngFrame.contentWindow.location.href;
                e = e.replace(/[\?&]?(\w+)=(\w+)/g, "").split("#")[0], "https://weibo.com/sorry?pagenotfound" !== e && "https://weibo.com/" !== e || (this.frameLink = "")
              } catch (t) {}
            },
            handleProto: function(e) {
              return /^https:/.test(e) ? e : "https:".concat(e)
            },
            isWeiboLive: function(e) {
              try {
                var t = e.hostname,
                  i = e.pathname;
                return t.includes("weibo.com") && i.startsWith("/l/wblive")
              } catch (n) {
                return !1
              }
            },
            checkLinks: function() {
              var e = this.$route.query.furl,
                t = new URL(this.handleProto(e));
              if (this.isWeiboLive(t)) window.location.replace("https://me.weibo.com/content/live");
              else {
                for (var i = !1, n = 0; n < this.menus.length; n++)
                  if (this.menus[n].submenu && this.menus[n].submenu.length > 0) {
                    for (var s = this.menus[n].submenu, o = 0; o < s.length; o++)
                      if (s[o].link) {
                        var r = new URL(this.handleProto(s[o].link));
                        if (t.origin === r.origin && t.pathname === r.pathname) {
                          i = !0;
                          break
                        }
                      }
                  } else if (this.menus[n].link) {
                  var a = new URL(this.menus[n].link);
                  if (t.origin === a.origin && t.pathname === a.pathname) {
                    i = !0;
                    break
                  }
                }
                "https://dss.sc.weibo.com?sjzs=zhongxin" === e && (i = !0), i ? (this.frameLink = e, this.recordCode(), this.initIframe()) : this.$router.push("manage")
              }
            }
          },
          watch: {
            $route: function() {
              this.checkLinks()
            },
            menus: function() {
              this.checkLinks()
            }
          }
        },
        h = c,
        u = i("04a2"),
        m = Object(u["a"])(h, n, s, !1, null, null, null);
      t["default"] = m.exports
    }
  }
]);
