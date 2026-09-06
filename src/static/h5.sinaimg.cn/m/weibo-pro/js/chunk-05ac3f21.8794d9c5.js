(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-05ac3f21"], {
    "07b2": function(t, s, a) {},
    2095: function(t, s, a) {
      "use strict";
      a.d(s, "a", (function() {
        return e
      }));
      a("5f85");
      var i = a("3896");

      function e(t, s) {
        var a = Object(i["a"])(t.getDate()),
          e = Object(i["a"])(t.getMonth() + 1),
          o = t.getFullYear();
        return "YYYY/MM/DD" === s ? "".concat(o, "/").concat(e, "/").concat(a) : "YYYY-MM-DD" === s ? "".concat(o, "-").concat(e, "-").concat(a) : "".concat(o).concat(e).concat(a)
      }
    },
    2950: function(t, s, a) {
      "use strict";
      a.r(s);
      var i = function() {
          var t = this,
            s = t.$createElement,
            a = t._self._c || s;
          return a("div", [a("div", {
            staticClass: "list"
          }, [a("Scroll", {
            attrs: {
              isEmpty: t.isEmpty,
              data: t.videoList,
              keyField: "oid",
              isLoading: t.isLoading
            },
            on: {
              loadMoreData: t.loadMoreData
            },
            scopedSlots: t._u([{
              key: "content",
              fn: function(s) {
                var i = s.item,
                  e = s.index;
                return [a("woo-box", {
                  key: i.oid,
                  staticClass: "video-item",
                  class: t.getStatus(i)
                }, [a("div", {
                  staticClass: "video-box",
                  on: {
                    click: function(s) {
                      return t.goPlay(i.oid, i.mid)
                    }
                  }
                }, [a("img", {
                  attrs: {
                    src: i.covers[1].url,
                    alt: ""
                  }
                }), a("div", {
                  staticClass: "video-duration"
                }, [t._v(t._s(t.sec2time(i.duration)))]), !i.video_status || (i.video_status && i.video_status.status) > 0 ? a("div", {
                  staticClass: "paly-btn"
                }, [a("woo-fonticon", {
                  staticClass: "paly-btn-icon",
                  attrs: {
                    kind: "success",
                    value: "caretRight"
                  }
                })], 1) : t._e()]), a("div", {
                  staticClass: "video-info"
                }, [a("div", {
                  staticClass: "title"
                }, [a("span", {
                  staticClass: "text"
                }, [t._v(t._s(i.titles[0].title))]), a("span", {
                  staticClass: "status",
                  class: t.getStatus(i)
                }, [t._v(t._s(i.video_status ? i.video_status.text : "视频审核通过"))])]), a("div", {
                  staticClass: "date"
                }, [t._v(" " + t._s(t.formatDate(new Date(i.create_time), "YYYY-MM-DD")) + " ")]), i.statistics ? a("div", {
                  staticClass: "others"
                }, [a("span", {
                  staticClass: "icon zan"
                }, [a("i", [t._v(t._s(t.shortNum(i.statistics.attitude_count)))])]), a("span", {
                  staticClass: "icon playnum"
                }, [a("i", [t._v(t._s(t.shortNum(i.statistics.play_count)))])]), a("span", {
                  staticClass: "icon comment"
                }, [a("i", [t._v(t._s(t.shortNum(i.statistics.comment_count)))])]), a("span", {
                  staticClass: "icon repost"
                }, [a("i", [t._v(t._s(t.shortNum(i.statistics.reposts_count)))])])]) : t._e()]), a("woo-box", {
                  staticClass: "video-option"
                }, [a("div", {
                  staticClass: "button edit",
                  class: {
                    disable: t.noEditable(i)
                  },
                  on: {
                    click: function(s) {
                      return t.goEdit(i)
                    }
                  }
                }, [a("i", {
                  staticClass: "icon"
                }), a("span", [t._v("编辑")])]), a("div", {
                  staticClass: "button del",
                  on: {
                    click: function(s) {
                      return t.delVideo(i, e)
                    }
                  }
                }, [a("i", {
                  staticClass: "icon"
                }), a("span", [t._v("删除")])])])], 1)]
              }
            }])
          })], 1)])
        },
        e = [],
        o = (a("5f85"), a("b337"), a("f40f"), a("325f"), a("5632"), a("dac3"), a("6701")),
        n = a("2095"),
        c = a("eba1"),
        d = {
          data: function() {
            return {
              videoList: [],
              page: 1,
              page_type: 2,
              next_cursor: 0,
              isLoading: !1,
              loading: !1,
              isEmpty: !1,
              isRetry: !1,
              checkValue: [{
                value: !0,
                label: "删除视频的同时，删除对应的微博"
              }]
            }
          },
          created: function() {
            this.getVideoList(), this.formatDate = n["a"], this.shortNum = c["b"]
          },
          components: {
            Scroll: o["a"]
          },
          methods: {
            noEditable: function(t) {
              return -1 !== t.oid.indexOf("1042158:") || -1 !== t.oid.indexOf("1042212:") || t.video_status && [1, 4, -1].includes(t.video_status.status) || Boolean(!t.editable)
            },
            getVideoList: function() {
              var t = this;
              this.isLoading = !0, this.loading || this.$http.get("/ajax/multimedia/getVideoList", {
                params: {
                  cursor: this.next_cursor
                }
              }).then((function(s) {
                if (s.data && s.data.ok > 0) {
                  t.isLoading = !1;
                  var a = s.data.data,
                    i = a && a.videos;
                  t.videoList = t.videoList.concat(i), t.isLoading = !0, 0 === i.length && (t.isEmpty = !0), 0 === i.length || i.length < 10 ? t.isLoading = !1 : t.next_cursor = a.next_cursor
                }
              }))
            },
            loadMoreData: function() {
              this.getVideoList()
            },
            goPlay: function(t, s) {
              window.open("https://weibo.com/tv/show/".concat(t, "?mid=").concat(s))
            },
            goEdit: function(t) {
              if (!this.noEditable(t)) {
                var s = t.oid;
                this.$router.push({
                  name: "channel",
                  query: {
                    entry: "edit",
                    oid: s
                  }
                })
              }
            },
            delVideo: function(t, s) {
              var a = this;
              this.$_w_dialog({
                type: "confirm",
                title: "确定删除视频吗？",
                message: "",
                checkbox: this.checkValue,
                action: function() {
                  var i = {
                    oid: t.oid,
                    mid: t.mid,
                    delete_microblog: a.checkValue[0].value
                  };
                  a.$http.post("/ajax/multimedia/videoDelete", i).then((function(t) {
                    t.data.ok > 0 && t.data.data && t.data.data.result && (a.$_w_toast({
                      type: "success",
                      message: "删除成功"
                    }), a.videoList.splice(s, 1))
                  })).catch((function(t) {
                    a.$_w_toast({
                      type: "warn",
                      message: "删除失败，请稍后重试"
                    })
                  }))
                }
              })
            },
            sec2time: function(t) {
              var s = function(t, s) {
                  return ("000" + t).slice(-1 * s)
                },
                a = parseFloat(t).toFixed(3),
                i = Math.floor(a / 60) % 60,
                e = Math.floor(a - 60 * i);
              return s(i, 2) + ":" + s(e, 2)
            },
            getStatus: function(t) {
              if (t.video_status) {
                var s = t.video_status.status,
                  a = "";
                switch (s) {
                  case -1:
                    a = "invalid";
                    break;
                  case 1:
                    a = "pending";
                    break;
                  case 3:
                    a = "fail";
                    break;
                  case 4:
                    a = "pending";
                    break;
                  case 6:
                    a = "fail";
                    break;
                  default:
                    a = "pass";
                    break
                }
                return a
              }
              return "pass"
            }
          }
        },
        u = d,
        r = (a("9bab"), a("04a2")),
        l = Object(r["a"])(u, i, e, !1, null, "8e2d61ec", null);
      s["default"] = l.exports
    },
    "9bab": function(t, s, a) {
      "use strict";
      var i = a("07b2"),
        e = a.n(i);
      e.a
    }
  }
]);
