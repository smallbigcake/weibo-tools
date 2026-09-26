var T = Object.defineProperty,
  R = Object.defineProperties;
var q = Object.getOwnPropertyDescriptors;
var E = Object.getOwnPropertySymbols;
var B = Object.prototype.hasOwnProperty,
  U = Object.prototype.propertyIsEnumerable;
var j = (s, t, i) => t in s ? T(s, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : s[t] = i,
  A = (s, t) => {
    for (var i in t || (t = {})) B.call(t, i) && j(s, i, t[i]);
    if (E)
      for (var i of E(t)) U.call(t, i) && j(s, i, t[i]);
    return s
  },
  P = (s, t) => R(s, q(t));
import {
  _ as z,
  J as O,
  S as V,
  l as f,
  m as _,
  i as r,
  B as c,
  p as C,
  n as o,
  C as h,
  D as u,
  G as H,
  H as G,
  h as y,
  T as m,
  E as $,
  U as g
} from "./index-Xve1TSN5.js";
const F = "_box_1t089_2",
  J = "_tab_1t089_6",
  K = "_tabin_1t089_9",
  Q = "_pic_1t089_19",
  W = "_wrap_1t089_25",
  X = "_line_1t089_25",
  Y = "_item_1t089_28",
  Z = "_item2_1t089_33",
  x = "_right_1t089_36",
  ss = "_btn1_1t089_39",
  ts = "_btn12_1t089_44",
  is = "_btn2_1t089_47",
  es = "_con_1t089_54",
  as = "_cut2_1t089_59",
  os = "_h4_1t089_62",
  ls = "_cls1_1t089_66",
  ns = "_cls2_1t089_69",
  hs = "_mar1_1t089_72",
  rs = "_tab2_1t089_78",
  cs = "_tab2in_1t089_81",
  ps = "_cur_1t089_103",
  us = "_tit_1t089_109",
  ds = "_radio_1t089_117",
  fs = "_back_1t089_120",
  ys = "_span_reply_1t089_123",
  gs = "_top_1t089_127",
  _s = {
    box: F,
    tab: J,
    tabin: K,
    pic: Q,
    wrap: W,
    line: X,
    item: Y,
    item2: Z,
    right: x,
    btn1: ss,
    btn12: ts,
    btn2: is,
    con: es,
    cut2: as,
    h4: os,
    cls1: ls,
    cls2: ns,
    mar1: hs,
    tab2: rs,
    tab2in: cs,
    cur: ps,
    tit: us,
    radio: ds,
    back: fs,
    span_reply: ys,
    top: gs
  },
  bs = {
    data() {
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
      Scroll: V
    },
    mounted() {
      window.parent && window.parent.postMessage({
        cmd: "appendParams",
        query: {
          id: this.$route.query.id
        }
      }, "https://me.weibo.com"), this.loadMoreData(this.type)
    },
    computed: P(A({}, O(["config"])), {
      listLength() {
        return this.list.length
      }
    }),
    watch: {
      allChose(s) {
        s ? this.list.forEach((t, i) => {
          t.chosePass || (this.list[i].chosePass = !0, this.list[i].choseNotPass = !1, this.$set(this.list, i, this.list[i]), this.addApprovalList(i, 1))
        }) : this.approvalList.length >= this.listLength && this.choseCount >= this.listLength && this.list.forEach((t, i) => {
          t.chosePass && (this.list[i].chosePass = !1, this.list[i].choseNotPass = !1, this.$set(this.list, i, this.list[i]), this.deleteApprovalList(i, "pass"))
        })
      },
      notAllChose(s) {
        s ? this.list.forEach((t, i) => {
          t.choseNotPass || (this.list[i].choseNotPass = !0, this.list[i].chosePass = !1, this.$set(this.list, i, this.list[i]), this.addApprovalList(i, 0))
        }) : this.approvalList.length >= this.listLength && this.notChoseCount >= this.listLength && this.list.forEach((t, i) => {
          t.choseNotPass && (this.list[i].choseNotPass = !1, this.$set(this.list, i, this.list[i]), this.deleteApprovalList(i, "notPass"))
        })
      },
      choseCount(s) {
        this.listLength <= s ? this.allChose = !0 : this.allChose = !1
      },
      notChoseCount(s) {
        this.listLength <= s ? this.notAllChose = !0 : this.notAllChose = !1
      },
      listLength(s) {
        this.notAllChose && (this.notAllChose = !1), this.allChose && (this.allChose = !1)
      }
    },
    methods: {
      back() {
        this.$router.push({
          name: "MngApproval",
          query: this.$route.query
        })
      },
      initInfo() {
        this.max_id = "", this.list = [], this.uidsList = [], this.length = 0, this.approvalList = [], this.successId = [], this.blockedList = []
      },
      changeTab(s, t) {
        this.type = s, this.initInfo(), this.curIndex = s !== 3 ? s - 1 : this.curIndex, t === "child" ? this.approvalChild(this.cid, s) : this.loadMoreData()
      },
      approvalChild(s, t) {
        this.type = t;
        const i = {};
        i.cid = s, i.comment_type = 2, this.initInfo(), this.loadMoreData(i)
      },
      approval(s, t) {
        this.cid = s, this.curIndex = t !== 3 ? t - 1 : this.curIndex, this.changeTabInfo(), this.approvalChild(s, t)
      },
      changeTabInfo() {
        this.tabApproval.forEach(s => {
          s.tag === "parent" ? (s.tag = "child", s.name = `${s.name.substring(0,s.name.length-2)}回复`, this.tips = `${this.tips.substring(0,this.tips.length-2)}回复`) : (s.tag = "parent", s.name = `${s.name.substring(0,s.name.length-2)}评论`, this.tips = `${this.tips.substring(0,this.tips.length-2)}评论`)
        })
      },
      backApprovalCmt() {
        this.changeTabInfo(), this.changeTab(2, this.tabApproval[0].tag)
      },
      loadMoreData(s) {
        this.getCommentList(s)
      },
      getCommentList(s = {}) {
        this.isLoading = !0, this.isRetry = !1, this.isNoData = !1, this.isEmpty = !1, this.page++;
        let t = P(A({}, this.$route.query), {
          max_id: this.max_id,
          type: this.type
        });
        typeof s == "object" && (t = Object.assign(t, s)), this.$http({
          url: "/ajax/approval/comments",
          methods: "get",
          params: A(P(A({}, this.$route.query), {
            max_id: this.max_id,
            type: this.type,
            scene: this.$route.query.tab === "aiAssistant" ? "ai_assistant" : "approval"
          }), t)
        }).then(i => {
          if (i && i.data && +i.data.ok == 1) {
            const n = i.data.data;
            this.max_id = n.max_id, this.since_id = n.since_id, n.comments && (this.list = this.list.concat(n.comments), this.isLoading = !0, this.uidsList = [], this.list.length !== 0 && (n.comments.forEach(e => {
              this.uidsList.includes(e.user.id) || this.uidsList.push(e.user.id)
            }), this.getIgnoreUserInfo(n.comments)), this.type === 1 && n.comments.forEach(e => {
              Object.assign(e, {
                chosePass: !1,
                choseNotPass: !1
              })
            })), this.list.length === 0 && (this.isLoading = !1, this.isEmpty = !0), this.max_id = i.data.data.next_cursor ? i.data.data.next_cursor : "", this.since_id = i.data.data.previous_cursor ? i.data.data.previous_cursor : "", +this.max_id == 0 && (this.isLoading = !1, this.isRetry = !1)
          } else i.data.ok === 0 && (this.errorMsg = i.data.msg, this.isLoading = !1, this.isRetry = !1, this.isNoData = !0)
        }).catch(() => {
          this.isLoading = !1, this.isRetry = !1, this.isNoData = !0
        })
      },
      changeAll(s, t) {
        s.target.tagName !== "INPUT" && (t === "pass" ? (this.notAllChose = !1, this.allChose ? this.allChose = !1 : this.allChose = !0) : t === "notPass" && (this.allChose = !1, this.notAllChose ? this.notAllChose = !1 : this.notAllChose = !0))
      },
      changeChose(s, t, i) {
        s.target.tagName !== "INPUT" && (t === "pass" ? this.list[i].chosePass ? (this.list[i].chosePass = !1, this.deleteApprovalList(i, t)) : (this.list[i].chosePass = !0, this.list[i].choseNotPass = !1, this.addApprovalList(i, 1)) : t === "notPass" && (this.list[i].choseNotPass ? (this.list[i].choseNotPass = !1, this.deleteApprovalList(i, t)) : (this.list[i].chosePass = !1, this.list[i].choseNotPass = !0, this.addApprovalList(i, 0))), this.$set(this.list, i, this.list[i]))
      },
      addApprovalList(s, t) {
        const i = this.list[s].id;
        let n = !1;
        if (this.approvalList.forEach((e, a) => {
            const p = Object.keys(e);
            String(p) === String(i) && (this.approvalList[a][p] = t, n = !0, t === 0 ? (this.choseCount--, this.notChoseCount++) : (this.choseCount++, this.notChoseCount--))
          }), !n) {
          const e = {};
          e[i] = t, this.approvalList.push(e), t === 1 ? this.choseCount++ : this.notChoseCount++
        }
      },
      deleteApprovalList(s, t) {
        const i = this.list[s].id;
        this.approvalList.forEach((n, e) => {
          const a = Object.keys(n);
          String(a[0]) === String(i) && this.approvalList.splice(e, 1)
        }), t === "pass" ? this.choseCount-- : this.notChoseCount--
      },
      subApprovalInfo() {
        this.$_w_dialog({
          type: "confirm",
          message: `确定审核这${this.approvalList.length}条评论吗？`,
          btnConfirm: "确定",
          btnCancel: "取消",
          action: () => {
            this.postApproval()
          }
        })
      },
      postApproval() {
        const s = this.approvalList.concat();
        for (; s.length >= 2;) {
          const t = s.splice(0, 2);
          this.subApproval(t)
        }
        s.length !== 0 && this.subApproval(s)
      },
      subApproval(s) {
        const t = [];
        s.forEach(i => {
          for (const n in i) {
            const e = `${n}:${i[n]}`;
            t.push(e)
          }
        }), this.$http.post("/ajax/approval/update_comment_state", {
          cids: t.join(",")
        }).then(i => {
          i.data && i.data.data && i.data.data.result && (i.data.data.result.forEach(e => {
            const a = e.split(":");
            a[1] === "true" && this.successId.push(a[0])
          }), this.deleteList(this.list, this.successId), this.successId.forEach(e => {
            this.approvalList.forEach((a, p) => {
              const L = Object.keys(a)[0];
              String(L) === String(e) && (a[L] === 0 ? this.notChoseCount-- : a[L] === 1 && this.choseCount--, this.approvalList.splice(p, 1), this.blockedList.splice(p, 1))
            })
          }), this.$_w_toast({
            type: "success",
            message: "审核成功"
          }), this.list.length === 0 && (this.isLoading = !1, this.isEmpty = !0))
        }).catch(i => {})
      },
      deleteList(s, t) {
        t.forEach(i => {
          s.forEach((n, e) => {
            String(i) === String(n.id) && s.splice(e, 1)
          })
        })
      },
      approvalPass(s) {
        const t = s.id,
          i = {};
        i[t] = 0, this.approvalList.push(i), this.subApproval(this.approvalList)
      },
      getIgnoreUserInfo(s) {
        const t = this.config.uid;
        this.$http({
          url: "/ajax/approval/filters_status",
          methods: "get",
          params: {
            type: 8,
            uids: this.uidsList.join(","),
            uid: t,
            scene: this.$route.query.tab === "aiAssistant" ? "ai_assistant" : "approval"
          }
        }).then(i => {
          if (i.data && i.data.data && i.data.data.blocked) {
            const n = i.data.data.blocked;
            this.list.forEach((e, a) => {
              const p = e.user.id;
              n.includes(p) ? this.list[a].ignore = !0 : this.list[a].ignore = !1, this.$set(this.list, a, this.list[a])
            })
          }
        })
      },
      ignore(s, t) {
        if (s.target.tagName === "INPUT") return;
        const n = this.list[t].user.id;
        this.$http.post("/ajax/statuses/filterUser", {
          uid: n,
          status: 0,
          follow: 0,
          interact: 1
        }).then(e => {
          e.data && e.data.ok && (this.$_w_toast({
            type: "success",
            message: "屏蔽成功"
          }), this.list.forEach((a, p) => {
            String(a.user.id) === String(n) && (this.blockedList[p] = !0, this.list[p].ignore = !0, this.$set(this.list, p, this.list[p]))
          }))
        })
      }
    }
  },
  Cs = {
    key: 0,
    class: "wbpro-cutword"
  },
  ms = ["textContent"],
  ks = ["textContent"],
  vs = ["onClick"],
  Ls = ["onClick"];

function As(s, t, i, n, e, a) {
  const p = f("Bar"),
    L = f("woo-tab-item"),
    D = f("woo-tab"),
    S = f("woo-panel"),
    I = f("woo-box-item"),
    w = f("woo-radio"),
    k = f("woo-button"),
    v = f("woo-box"),
    N = f("woo-divider"),
    M = f("Scroll");
  return r(), _("div", null, [c(p, {
    "go-back": "",
    divide: "",
    customBack: !0,
    class: o(s.$style.back),
    onClickHandle: a.back
  }, null, 8, ["class", "onClickHandle"]), C("div", {
    class: o(s.$style.box)
  }, [c(S, {
    border: "bottom",
    class: o([s.$style.mar1, s.$style.top])
  }, {
    default: h(() => [c(D, {
      animate: "",
      "animate-duration": 500
    }, {
      default: h(() => [(r(!0), _(H, null, G(e.tabApproval, (l, b) => (r(), y(L, {
        key: b,
        index: b,
        class: o(s.$style.tab),
        cur: +e.curIndex === b,
        onClick: m(d => a.changeTab(l.type, l.tag), ["stop"])
      }, {
        default: h(() => [C("div", {
          class: o(s.$style.tabin)
        }, $(l.name), 3)]),
        _: 2
      }, 1032, ["index", "class", "cur", "onClick"]))), 128))]),
      _: 1
    }), e.tabApproval[0].tag === "child" ? (r(), _("span", {
      key: 0,
      class: o(s.$style.span_reply),
      onClick: t[0] || (t[0] = l => a.backApprovalCmt())
    }, "返回待审核评论", 2)) : u("", !0)]),
    _: 1
  }, 8, ["class"]), C("div", null, [C("div", {
    class: o(s.$style.wrap)
  }, [e.type === 1 ? (r(), y(v, {
    key: 0,
    align: "center",
    class: o([s.$style.item, s.$style.item2])
  }, {
    default: h(() => [c(I, {
      align: "center",
      class: o(s.$style.con)
    }, {
      default: h(() => [C("div", {
        class: o(s.$style.tit)
      }, $(e.tips), 3)]),
      _: 1
    }, 8, ["class"]), c(v, {
      align: "center",
      justify: "end",
      class: o(s.$style.right)
    }, {
      default: h(() => [c(w, {
        value: "allChose",
        class: o(s.$style.radio),
        checked: e.allChose,
        onClick: t[1] || (t[1] = m(l => a.changeAll(l, "pass"), ["stop"]))
      }, {
        default: h(() => t[6] || (t[6] = [g(" 全部通过 ")])),
        _: 1
      }, 8, ["class", "checked"]), c(w, {
        value: "notAllChose",
        class: o(s.$style.radio),
        checked: e.notAllChose,
        onClick: t[2] || (t[2] = m(l => a.changeAll(l, "notPass"), ["stop"]))
      }, {
        default: h(() => t[7] || (t[7] = [g(" 全部不通过 ")])),
        _: 1
      }, 8, ["class", "checked"]), c(k, {
        sort: "line",
        kind: "primary",
        size: "s",
        round: !1,
        class: o([s.$style.btn1, s.$style.btn12]),
        onClick: m(a.subApprovalInfo, ["stop"])
      }, {
        default: h(() => t[8] || (t[8] = [g(" 提交 ")])),
        _: 1
      }, 8, ["class", "onClick"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])) : u("", !0), e.type === 2 || e.type === 3 ? (r(), y(v, {
    key: 1,
    justify: "center",
    class: o(s.$style.tab2)
  }, {
    default: h(() => [C("div", {
      class: o({
        [s.$style.tab2in]: !0,
        [s.$style.cur]: e.type === 2
      }),
      onClick: t[3] || (t[3] = l => a.changeTab(2, e.tabApproval[0].tag))
    }, " 通过审核 ", 2), C("div", {
      class: o({
        [s.$style.tab2in]: !0,
        [s.$style.cur]: e.type === 3
      }),
      onClick: t[4] || (t[4] = l => a.changeTab(3, e.tabApproval[0].tag))
    }, " 未通过审核 ", 2)]),
    _: 1
  }, 8, ["class"])) : u("", !0), c(N, {
    class: o(s.$style.line)
  }, null, 8, ["class"])], 2), C("div", {
    class: o(s.$style.wrap)
  }, [c(M, {
    isRetry: e.isRetry,
    "onUpdate:isRetry": t[5] || (t[5] = l => e.isRetry = l),
    data: e.list,
    isLoading: e.isLoading,
    isNoData: e.isNoData,
    isEmpty: e.isEmpty,
    skeleton: !0,
    onLoadMoreData: a.loadMoreData
  }, {
    content: h(({
      item: l,
      index: b
    }) => [(r(), _("div", {
      key: l,
      style: {
        width: "100%"
      }
    }, [c(v, {
      align: "center",
      class: o(s.$style.item)
    }, {
      default: h(() => [c(I, {
        align: "center",
        class: o(s.$style.con)
      }, {
        default: h(() => [l.user ? (r(), _("div", Cs, [l.user.screen_name ? (r(), _("span", {
          key: 0,
          textContent: $(`@${l.user.screen_name}:`)
        }, null, 8, ms)) : u("", !0), l.text ? (r(), _("span", {
          key: 1,
          textContent: $(l.text)
        }, null, 8, ks)) : u("", !0)])) : u("", !0)]),
        _: 2
      }, 1032, ["class"]), e.type === 1 ? (r(), y(v, {
        key: 0,
        align: "center",
        justify: "end",
        class: o(s.$style.right)
      }, {
        default: h(() => [c(w, {
          value: "",
          checked: l.chosePass,
          class: o(s.$style.radio),
          onClick: m(d => a.changeChose(d, "pass", b), ["stop"])
        }, {
          default: h(() => t[9] || (t[9] = [g(" 通过 ")])),
          _: 2
        }, 1032, ["checked", "class", "onClick"]), c(w, {
          value: "",
          checked: l.choseNotPass,
          class: o(s.$style.radio),
          onClick: m(d => a.changeChose(d, "notPass", b), ["stop"])
        }, {
          default: h(() => t[10] || (t[10] = [g(" 不通过 ")])),
          _: 2
        }, 1032, ["checked", "class", "onClick"]), l.ignore && e.uidsList.length ? (r(), y(k, {
          key: 0,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: o(s.$style.btn2)
        }, {
          default: h(() => t[11] || (t[11] = [g(" 已屏蔽 ")])),
          _: 1
        }, 8, ["class"])) : u("", !0), !l.ignore && e.uidsList.length ? (r(), y(k, {
          key: 1,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: o(s.$style.btn2),
          onClick: m(d => a.ignore(d, b), ["stop"])
        }, {
          default: h(() => t[12] || (t[12] = [g(" 屏蔽 ")])),
          _: 2
        }, 1032, ["class", "onClick"])) : u("", !0)]),
        _: 2
      }, 1032, ["class"])) : u("", !0), e.type !== 1 ? (r(), y(v, {
        key: 1,
        justify: "end",
        align: "center",
        class: o(s.$style.right)
      }, {
        default: h(() => [l.child_count && l.child_count !== -1 ? (r(), _("span", {
          key: 0,
          class: o(s.$style.span_reply),
          onClick: d => a.approval(l.id, 1)
        }, $(`${l.child_count}条待审核回复`), 11, vs)) : l.child_count === 0 ? (r(), _("span", {
          key: 1,
          class: o(s.$style.span_reply),
          onClick: d => a.approval(l.id, 2)
        }, " 查看已审回复 ", 10, Ls)) : u("", !0), e.type === 2 ? (r(), y(k, {
          key: 2,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: o(s.$style.btn1),
          onClick: d => a.approvalPass(l)
        }, {
          default: h(() => t[13] || (t[13] = [g(" 审核不通过 ")])),
          _: 2
        }, 1032, ["class", "onClick"])) : u("", !0), l.ignore && e.uidsList.length ? (r(), y(k, {
          key: 3,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: o(s.$style.btn2)
        }, {
          default: h(() => t[14] || (t[14] = [g(" 已屏蔽 ")])),
          _: 1
        }, 8, ["class"])) : u("", !0), !l.ignore && e.uidsList.length ? (r(), y(k, {
          key: 4,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: o(s.$style.btn2),
          onClick: m(d => a.ignore(d, b), ["stop"])
        }, {
          default: h(() => t[15] || (t[15] = [g(" 屏蔽 ")])),
          _: 2
        }, 1032, ["class", "onClick"])) : u("", !0)]),
        _: 2
      }, 1032, ["class"])) : u("", !0)]),
      _: 2
    }, 1032, ["class"]), c(N, {
      class: o(s.$style.line),
      style: {
        display: "block"
      }
    }, null, 8, ["class"])]))]),
    _: 1
  }, 8, ["isRetry", "data", "isLoading", "isNoData", "isEmpty", "onLoadMoreData"])], 2)])], 2)])
}
const $s = {
    $style: _s
  },
  Is = z(bs, [
    ["render", As],
    ["__cssModules", $s]
  ]);
export {
  Is as
  default
};
