(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["msg"], {
    de5a: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t.$createElement,
            s = t._self._c || e;
          return s("router-view", {
            ref: "msg",
            attrs: {
              tabs: t.tabGroup[t.curTabs]
            }
          })
        },
        i = [],
        n = (s("436f"), {
          data: function() {
            return {
              tabGroup: {
                cmts: [{
                  type: 0,
                  title: "评论",
                  api: "message/cmt"
                }, {
                  type: 1,
                  title: "我发出的评论",
                  api: "message/myCmt"
                }],
                atme: [{
                  type: 0,
                  title: "微博",
                  api: "message/mentionsAt"
                }, {
                  type: 1,
                  title: "评论",
                  api: "message/mentionsCmt"
                }],
                like: [{
                  type: 0,
                  title: "赞",
                  api: "/message/attitude"
                }],
                notes: [{
                  type: 0,
                  title: "未关注人私信",
                  api: "/message/notelist"
                }]
              }
            }
          },
          metaInfo: {
            title: "微博"
          },
          created: function() {
            this.$store.dispatch("unreadAction")
          },
          beforeRouteLeave: function(t, e, s) {
            this.$store.dispatch("clearUnreadTimer"), s()
          },
          computed: {
            curTabs: function() {
              return this.$route.path.split("/").pop()
            }
          },
          methods: {
            updateFeed: function() {
              this.$refs.msg.init()
            }
          }
        }),
        r = n,
        o = s("da34"),
        p = Object(o["a"])(r, a, i, !1, null, null, null);
      e["default"] = p.exports
    }
  }
]);
//# sourceMappingURL=msg.202b4a2a.js.map
