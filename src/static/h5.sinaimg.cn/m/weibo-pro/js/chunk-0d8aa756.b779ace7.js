(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0d8aa756"], {
    "713a": function(t, s, a) {
      "use strict";
      a.r(s);
      var i = function() {
          var t, s, a = this,
            i = a.$createElement,
            o = a._self._c || i;
          return o("div", [o("Bar", {
            class: a.$style.back,
            attrs: {
              "go-back": "",
              divide: "",
              customBack: !0
            },
            on: {
              "click-handle": a.back
            }
          }), o("div", {
            class: a.$style.box
          }, [o("woo-panel", {
            class: [a.$style.mar1, a.$style.top],
            attrs: {
              border: "bottom"
            }
          }, [o("woo-tab", {
            attrs: {
              animate: "",
              "animate-duration": 500
            }
          }, a._l(a.tabApproval, (function(t, s) {
            return o("woo-tab-item", {
              key: s,
              class: a.$style.tab,
              attrs: {
                index: s,
                cur: +a.curIndex === s
              },
              nativeOn: {
                click: function(s) {
                  return s.stopPropagation(), a.changeTab(t.type, t.tag)
                }
              }
            }, [o("div", {
              class: a.$style.tabin
            }, [a._v(" " + a._s(t.name) + " ")])])
          })), 1), "child" === a.tabApproval[0].tag ? o("span", {
            class: a.$style.span_reply,
            on: {
              click: function(t) {
                return a.backApprovalCmt()
              }
            }
          }, [a._v("返回待审核评论")]) : a._e()], 1), o("div", [o("div", {
            class: a.$style.wrap
          }, [1 === a.type ? o("woo-box", {
            class: [a.$style.item, a.$style.item2],
            attrs: {
              align: "center"
            }
          }, [o("woo-box-item", {
            class: a.$style.con,
            attrs: {
              align: "center"
            }
          }, [o("div", {
            class: a.$style.tit
          }, [a._v(a._s(a.tips))])]), o("woo-box", {
            class: a.$style.right,
            attrs: {
              align: "center",
              justify: "end"
            }
          }, [o("woo-radio", {
            class: a.$style.radio,
            attrs: {
              value: "allChose",
              checked: a.allChose
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), a.changeAll(t, "pass")
              }
            }
          }, [a._v("全部通过")]), o("woo-radio", {
            class: a.$style.radio,
            attrs: {
              value: "notAllChose",
              checked: a.notAllChose
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), a.changeAll(t, "notPass")
              }
            }
          }, [a._v("全部不通过")]), o("woo-button", {
            class: [a.$style.btn1, a.$style.btn12],
            attrs: {
              sort: "line",
              kind: "primary",
              size: "s",
              round: !1
            },
            nativeOn: {
              click: function(t) {
                return t.stopPropagation(), a.subApprovalInfo.apply(null, arguments)
              }
            }
          }, [a._v(" 提交 ")])], 1)], 1) : a._e(), 2 === a.type || 3 === a.type ? o("woo-box", {
            class: a.$style.tab2,
            attrs: {
              justify: "center"
            }
          }, [o("div", {
            class: (t = {}, t[a.$style.tab2in] = !0, t[a.$style.cur] = 2 === a.type, t),
            on: {
              click: function(t) {
                return a.changeTab(2, a.tabApproval[0].tag)
              }
            }
          }, [a._v(" 通过审核 ")]), o("div", {
            class: (s = {}, s[a.$style.tab2in] = !0, s[a.$style.cur] = 3 === a.type, s),
            on: {
              click: function(t) {
                return a.changeTab(3, a.tabApproval[0].tag)
              }
            }
          }, [a._v(" 未通过审核 ")])]) : a._e(), o("woo-divider", {
            class: a.$style.line
          })], 1), o("div", {
            class: a.$style.wrap
          }, [o("Scroll", {
            attrs: {
              data: a.list,
              isLoading: a.isLoading,
              isRetry: a.isRetry,
              isNoData: a.isNoData,
              isEmpty: a.isEmpty,
              skeleton: !0
            },
            on: {
              loadMoreData: a.loadMoreData
            },
            scopedSlots: a._u([{
              key: "content",
              fn: function(t) {
                var s = t.item,
                  i = t.index;
                return [o("div", {
                  staticStyle: {
                    width: "100%"
                  }
                }, [o("woo-box", {
                  class: a.$style.item,
                  attrs: {
                    align: "center"
                  }
                }, [o("woo-box-item", {
                  class: a.$style.con,
                  attrs: {
                    align: "center"
                  }
                }, [s.user ? o("div", {
                  staticClass: "wbpro-cutword"
                }, [s.user.screen_name ? o("span", {
                  domProps: {
                    textContent: a._s("@" + s.user.screen_name + ":")
                  }
                }) : a._e(), s.text ? o("span", {
                  domProps: {
                    textContent: a._s(s.text)
                  }
                }) : a._e()]) : a._e()]), 1 === a.type ? o("woo-box", {
                  class: a.$style.right,
                  attrs: {
                    align: "center",
                    justify: "end"
                  }
                }, [o("woo-radio", {
                  class: a.$style.radio,
                  attrs: {
                    value: "",
                    checked: s.chosePass
                  },
                  nativeOn: {
                    click: function(t) {
                      return t.stopPropagation(), a.changeChose(t, "pass", i)
                    }
                  }
                }, [a._v("通过")]), o("woo-radio", {
                  class: a.$style.radio,
                  attrs: {
                    value: "",
                    checked: s.choseNotPass
                  },
                  nativeOn: {
                    click: function(t) {
                      return t.stopPropagation(), a.changeChose(t, "notPass", i)
                    }
                  }
                }, [a._v("不通过")]), s.ignore && a.uidsList.length ? o("woo-button", {
                  class: a.$style.btn2,
                  attrs: {
                    sort: "line",
                    kind: "primary",
                    size: "s",
                    round: !1
                  }
                }, [a._v(" 已屏蔽 ")]) : a._e(), !s.ignore && a.uidsList.length ? o("woo-button", {
                  class: a.$style.btn2,
                  attrs: {
                    sort: "line",
                    kind: "primary",
                    size: "s",
                    round: !1
                  },
                  nativeOn: {
                    click: function(t) {
                      return t.stopPropagation(), a.ignore(t, i)
                    }
                  }
                }, [a._v(" 屏蔽 ")]) : a._e()], 1) : a._e(), 1 !== a.type ? o("woo-box", {
                  class: a.$style.right,
                  attrs: {
                    justify: "end",
                    align: "center"
                  }
                }, [s.child_count && -1 !== s.child_count ? o("span", {
                  class: a.$style.span_reply,
                  on: {
                    click: function(t) {
                      return a.approval(s.id, 1)
                    }
                  }
                }, [a._v(a._s(s.child_count + "条待审核回复"))]) : 0 === s.child_count ? o("span", {
                  class: a.$style.span_reply,
                  on: {
                    click: function(t) {
                      return a.approval(s.id, 2)
                    }
                  }
                }, [a._v(" 查看已审回复 ")]) : a._e(), 2 === a.type ? o("woo-button", {
                  class: a.$style.btn1,
                  attrs: {
                    sort: "line",
                    kind: "primary",
                    size: "s",
                    round: !1
                  },
                  on: {
                    click: function(t) {
                      return a.approvalPass(s)
                    }
                  }
                }, [a._v(" 审核不通过 ")]) : a._e(), s.ignore && a.uidsList.length ? o("woo-button", {
                  class: a.$style.btn2,
                  attrs: {
                    sort: "line",
                    kind: "primary",
                    size: "s",
                    round: !1
                  }
                }, [a._v(" 已屏蔽 ")]) : a._e(), !s.ignore && a.uidsList.length ? o("woo-button", {
                  class: a.$style.btn2,
                  attrs: {
                    sort: "line",
                    kind: "primary",
                    size: "s",
                    round: !1
                  },
                  nativeOn: {
                    click: function(t) {
                      return t.stopPropagation(), a.ignore(t, i)
                    }
                  }
                }, [a._v(" 屏蔽 ")]) : a._e()], 1) : a._e()], 1), o("woo-divider", {
                  class: a.$style.line,
                  staticStyle: {
                    display: "block"
                  }
                })], 1)]
              }
            }])
          })], 1)])], 1)], 1)
        },
        o = [],
        e = (a("5f85"), a("f40f"), a("3d3c"), a("e547"), a("5632"), a("83ef"), a("1774"), a("16e9"), a("39c3"), a("6f14")),
        n = a("6701"),
        l = (a("da58"), a("ba1d")),
        r = {
          data: function() {
            return {
              type: 1,
              list: [],
              blockedList: [],
              uidsList: [],
              approvalList: [],
              successId: [],
              isRetry: !1,
              isLoading: !0,
              isNoData: !1,
              isEmpty: !1,
              max_id: "",
              allChose: !1,
              notAllChose: !1,
              choseCount: 0,
              notChoseCount: 0,
              tips: "待审核评论",
              curIndex: 0,
              cid: 0,
              tabApproval: [{
                tag: "parent",
                name: "待审核评论",
                type: 1
              }, {
                tag: "parent",
                name: "已审核评论",
                type: 2
              }]
            }
          },
          components: {
            Scroll: n["a"]
          },
          mounted: function() {
            window.parent && window.parent.postMessage({
              cmd: "appendParams",
              query: {
                id: this.$route.query.id
              }
            }, "https://me.weibo.com"), this.loadMoreData(this.type)
          },
          computed: Object(e["a"])(Object(e["a"])({}, Object(l["c"])(["config"])), {}, {
            parmas: function() {
              return this.$route.query ? this.$route.query : {}
            },
            listLength: function() {
              return this.list.length
            }
          }),
          watch: {
            allChose: function(t) {
              var s = this;
              t ? this.list.map((function(t, a) {
                t.chosePass || (s.list[a].chosePass = !0, s.list[a].choseNotPass = !1, s.$set(s.list, a, s.list[a]), s.addApprovalList(a, 1))
              })) : this.approvalList.length >= this.listLength && this.choseCount >= this.listLength && this.list.map((function(t, a) {
                t.chosePass && (s.list[a].chosePass = !1, s.list[a].choseNotPass = !1, s.$set(s.list, a, s.list[a]), s.deleteApprovalList(a, "pass"))
              }))
            },
            notAllChose: function(t) {
              var s = this;
              t ? this.list.map((function(t, a) {
                t.choseNotPass || (s.list[a].choseNotPass = !0, s.list[a].chosePass = !1, s.$set(s.list, a, s.list[a]), s.addApprovalList(a, 0))
              })) : this.approvalList.length >= this.listLength && this.notChoseCount >= this.listLength && this.list.map((function(t, a) {
                t.choseNotPass && (s.list[a].choseNotPass = !1, s.$set(s.list, a, s.list[a]), s.deleteApprovalList(a, "notPass"))
              }))
            },
            choseCount: function(t) {
              this.listLength <= t ? this.allChose = !0 : this.allChose = !1
            },
            notChoseCount: function(t) {
              this.listLength <= t ? this.notAllChose = !0 : this.notAllChose = !1
            },
            listLength: function(t) {
              this.notAllChose && (this.notAllChose = !1), this.allChose && (this.allChose = !1)
            }
          },
          methods: {
            back: function() {
              this.$router.push({
                name: "MngApproval",
                query: this.$route.query
              })
            },
            initInfo: function() {
              this.max_id = "", this.list = [], this.uidsList = [], this.length = 0, this.approvalList = [], this.successId = [], this.blockedList = []
            },
            changeTab: function(t, s) {
              this.type = t, this.initInfo(), this.curIndex = 3 !== t ? t - 1 : this.curIndex, "child" === s ? this.approvalChild(this.cid, t) : this.loadMoreData()
            },
            approvalChild: function(t, s) {
              this.type = s;
              var a = {};
              a.cid = t, a.comment_type = 2, this.initInfo(), this.loadMoreData(a)
            },
            approval: function(t, s) {
              this.cid = t, this.curIndex = 3 !== s ? s - 1 : this.curIndex, this.changeTabInfo(), this.approvalChild(t, s)
            },
            changeTabInfo: function() {
              var t = this;
              this.tabApproval.map((function(s) {
                "parent" === s.tag ? (s.tag = "child", s.name = s.name.substring(0, s.name.length - 2) + "回复", t.tips = t.tips.substring(0, t.tips.length - 2) + "回复") : (s.tag = "parent", s.name = s.name.substring(0, s.name.length - 2) + "评论", t.tips = t.tips.substring(0, t.tips.length - 2) + "评论")
              }))
            },
            backApprovalCmt: function() {
              this.changeTabInfo(), this.changeTab(2, this.tabApproval[0].tag)
            },
            loadMoreData: function(t) {
              this.getCommentList(t)
            },
            getCommentList: function() {
              var t = this;
              this.isLoading = !0, this.isRetry = !1, this.isNoData = !1, this.isEmpty = !1, this.page++, this.$http({
                url: "/ajax/approval/comments",
                methods: "get",
                params: Object(e["a"])(Object(e["a"])({}, JSON.parse(JSON.stringify(this.parmas))), {}, {
                  max_id: this.max_id,
                  type: this.type
                }, arguments.length = arguments[0])
              }).then((function(s) {
                if (s && s.data && 1 === +s.data.ok) {
                  var a = s.data.data;
                  t.max_id = a.max_id, t.since_id = a.since_id, a.comments && (t.list = t.list.concat(a.comments), t.isLoading = !0, t.uidsList = [], 0 !== t.list.length && (a.comments.map((function(s) {
                    -1 === t.uidsList.indexOf(s.user.id) && t.uidsList.push(s.user.id)
                  })), t.getIgnoreUserInfo(a.comments)), 1 === t.type && a.comments.map((function(t) {
                    Object.assign(t, {
                      chosePass: !1,
                      choseNotPass: !1
                    })
                  }))), 0 === t.list.length && (t.isLoading = !1, t.isEmpty = !0), t.max_id = s.data.data.next_cursor ? s.data.data.next_cursor : "", t.since_id = s.data.data.previous_cursor ? s.data.data.previous_cursor : "", 0 == t.max_id && (t.isLoading = !1, t.isRetry = !1)
                } else 0 === s.data.ok && (t.errorMsg = s.data.msg, t.isLoading = !1, t.isRetry = !1, t.isNoData = !0)
              })).catch((function() {
                t.isLoading = !1, t.isRetry = !1, t.isNoData = !0
              }))
            },
            changeAll: function(t, s) {
              "INPUT" !== t.target.tagName && ("pass" === s ? (this.notAllChose = !1, this.allChose ? this.allChose = !1 : this.allChose = !0) : "notPass" === s && (this.allChose = !1, this.notAllChose ? this.notAllChose = !1 : this.notAllChose = !0))
            },
            changeChose: function(t, s, a) {
              "INPUT" !== t.target.tagName && ("pass" === s ? this.list[a].chosePass ? (this.list[a].chosePass = !1, this.deleteApprovalList(a, s)) : (this.list[a].chosePass = !0, this.list[a].choseNotPass = !1, this.addApprovalList(a, 1)) : "notPass" === s && (this.list[a].choseNotPass ? (this.list[a].choseNotPass = !1, this.deleteApprovalList(a, s)) : (this.list[a].chosePass = !1, this.list[a].choseNotPass = !0, this.addApprovalList(a, 0))), this.$set(this.list, a, this.list[a]))
            },
            addApprovalList: function(t, s) {
              var a = this,
                i = this.list[t].id,
                o = !1;
              if (this.approvalList.map((function(t, e) {
                  var n = Object.keys(t);
                  n == i && (a.approvalList[e][n] = s, o = !0, 0 === s ? (a.choseCount--, a.notChoseCount++) : (a.choseCount++, a.notChoseCount--))
                })), !o) {
                var e = {};
                e[i] = s, this.approvalList.push(e), 1 === s ? this.choseCount++ : this.notChoseCount++
              }
            },
            deleteApprovalList: function(t, s) {
              var a = this,
                i = this.list[t].id;
              this.approvalList.map((function(t, s) {
                var o = Object.keys(t);
                o[0] == i && a.approvalList.splice(s, 1)
              })), "pass" === s ? this.choseCount-- : this.notChoseCount--
            },
            subApprovalInfo: function() {
              var t = this;
              this.$_w_dialog({
                type: "confirm",
                message: "确定审核这".concat(this.approvalList.length, "条评论吗？"),
                btnConfirm: "确定",
                btnCancel: "取消",
                action: function() {
                  t.postApproval()
                }
              })
            },
            postApproval: function() {
              var t = this.approvalList.concat();
              while (t.length >= 2) {
                var s = t.splice(0, 2);
                this.subApproval(s)
              }
              0 !== t.length && this.subApproval(t)
            },
            subApproval: function(t) {
              var s = this,
                a = [];
              t.map((function(t) {
                for (var s in t) {
                  var i = s + ":" + t[s];
                  a.push(i)
                }
              })), this.$http.post("/ajax/approval/update_comment_state", {
                cids: a.join(",")
              }).then((function(t) {
                if (t.data && t.data.data && t.data.data.result) {
                  var a = t.data.data.result;
                  a.map((function(t) {
                    var a = t.split(":");
                    "true" === a[1] && s.successId.push(a[0])
                  })), s.deleteList(s.list, s.successId), s.successId.map((function(t) {
                    s.approvalList.map((function(a, i) {
                      var o = Object.keys(a)[0];
                      o == t && (0 === a[o] ? s.notChoseCount-- : 1 === a[o] && s.choseCount--, s.approvalList.splice(i, 1), s.blockedList.splice(i, 1))
                    }))
                  })), s.$_w_toast({
                    type: "success",
                    message: "审核成功"
                  }), 0 === s.list.length && (s.isLoading = !1, s.isEmpty = !0)
                }
              })).catch((function(t) {}))
            },
            deleteList: function(t, s) {
              s.map((function(s) {
                t.map((function(a, i) {
                  s == a.id && t.splice(i, 1)
                }))
              }))
            },
            approvalPass: function(t) {
              var s = t.id,
                a = {};
              a[s] = 0, this.approvalList.push(a), this.subApproval(this.approvalList)
            },
            getIgnoreUserInfo: function(t) {
              var s = this,
                a = this.config.uid;
              this.$http({
                url: "/ajax/approval/filters_status",
                methods: "get",
                params: {
                  type: 8,
                  uids: this.uidsList.join(","),
                  uid: a
                }
              }).then((function(t) {
                if (t.data && t.data.data && t.data.data.blocked) {
                  var a = t.data.data.blocked;
                  s.list.map((function(t, i) {
                    var o = t.user.id;
                    Object.keys(t); - 1 !== a.indexOf(o) ? s.list[i].ignore = !0 : s.list[i].ignore = !1, s.$set(s.list, i, s.list[i])
                  }))
                }
              }))
            },
            ignore: function(t, s) {
              var a = this;
              if ("INPUT" !== t.target.tagName) {
                var i = this.list[s].user,
                  o = i.id;
                this.$http.post("/ajax/statuses/filterUser", {
                  uid: o,
                  status: 0,
                  follow: 0,
                  interact: 1
                }).then((function(t) {
                  t.data && t.data.ok && (a.$_w_toast({
                    type: "success",
                    message: "屏蔽成功"
                  }), a.list.map((function(t, s) {
                    t.user.id == o && (a.blockedList[s] = !0, a.list[s].ignore = !0, a.$set(a.list, s, a.list[s]))
                  })))
                }))
              }
            }
          }
        },
        c = r,
        p = a("928e"),
        h = a("04a2");

      function u(t) {
        this["$style"] = p["default"].locals || p["default"]
      }
      var d = Object(h["a"])(c, i, o, !1, u, null, null);
      s["default"] = d.exports
    },
    "928e": function(t, s, a) {
      "use strict";
      var i = a("b936"),
        o = a.n(i);
      s["default"] = o.a
    },
    b936: function(t, s, a) {
      t.exports = {
        box: "ApprovalComment_box_HFD2d",
        tab: "ApprovalComment_tab_1-9YV",
        tabin: "ApprovalComment_tabin_2wc_M",
        pic: "ApprovalComment_pic_3VqME",
        wrap: "ApprovalComment_wrap_25ycf",
        line: "ApprovalComment_line_Mno2W",
        item: "ApprovalComment_item_3KJCM",
        item2: "ApprovalComment_item2_2a44o",
        right: "ApprovalComment_right_XhLJy",
        btn1: "ApprovalComment_btn1_Am6AP",
        btn12: "ApprovalComment_btn12_2wKSS",
        btn2: "ApprovalComment_btn2_2G94w",
        con: "ApprovalComment_con_AnyCg",
        cut2: "ApprovalComment_cut2_BB-94",
        h4: "ApprovalComment_h4_1tgDx",
        cls1: "ApprovalComment_cls1_2VWD0",
        cls2: "ApprovalComment_cls2_1J92B",
        mar1: "ApprovalComment_mar1_3RxtM",
        tab2: "ApprovalComment_tab2_1AlnF",
        tab2in: "ApprovalComment_tab2in_1Un4G",
        cur: "ApprovalComment_cur_1H6Q7",
        tit: "ApprovalComment_tit_2P6OK",
        radio: "ApprovalComment_radio_1uK6A",
        back: "ApprovalComment_back_Y3g8L",
        span_reply: "ApprovalComment_span_reply_103cT",
        top: "ApprovalComment_top_3NWdE"
      }
    }
  }
]);
