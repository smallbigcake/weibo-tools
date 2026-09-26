var de = Object.defineProperty,
  ce = Object.defineProperties;
var ue = Object.getOwnPropertyDescriptors;
var J = Object.getOwnPropertySymbols;
var pe = Object.prototype.hasOwnProperty,
  _e = Object.prototype.propertyIsEnumerable;
var K = (e, t, o) => t in e ? de(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
  }) : e[t] = o,
  S = (e, t) => {
    for (var o in t || (t = {})) pe.call(t, o) && K(e, o, t[o]);
    if (J)
      for (var o of J(t)) _e.call(t, o) && K(e, o, t[o]);
    return e
  },
  R = (e, t) => ce(e, ue(t));
var B = (e, t, o) => new Promise((c, a) => {
  var r = m => {
      try {
        _(o.next(m))
      } catch (v) {
        a(v)
      }
    },
    h = m => {
      try {
        _(o.throw(m))
      } catch (v) {
        a(v)
      }
    },
    _ = m => m.done ? c(m.value) : Promise.resolve(m.value).then(r, h);
  _((o = o.apply(e, t)).next())
});
import {
  _ as E,
  l as d,
  h as w,
  i as u,
  C as i,
  B as n,
  m as g,
  T as j,
  n as s,
  p as l,
  E as f,
  U as b,
  a0 as H,
  S as x,
  D as C,
  a1 as W,
  G as F,
  H as T,
  V as I,
  a2 as X,
  a3 as Z,
  a4 as ee,
  O as G,
  P as O,
  a5 as fe,
  a6 as me,
  I as A,
  a7 as he,
  a8 as be,
  a9 as ye
} from "./index-Xve1TSN5.js";
const ge = "_cut_1h7lq_2",
  ve = "_lbh3_1h7lq_6",
  ke = "_lbh4_1h7lq_23",
  $e = "_lbh42_1h7lq_35",
  we = "_lbempty_1h7lq_38",
  Ce = "_lbopt_1h7lq_42",
  De = "_like_1h7lq_51",
  je = "_lbface_1h7lq_54",
  Me = {
    cut: ge,
    lbh3: ve,
    lbh4: ke,
    lbh42: $e,
    lbempty: we,
    lbopt: Ce,
    like: De,
    lbface: je
  },
  Le = {
    props: ["item", "status"],
    methods: {
      transtText(e) {
        return this.status.isLongText && (e += ' ...<span class="expand">全文</span>'), e
      },
      openWeibo({
        id: e
      }) {
        e && window.open(`https://www.weibo.com/detail/${e}`)
      },
      openUser() {
        window.open(`https://www.weibo.com/u/${this.item.user.id}`)
      }
    }
  },
  qe = {
    key: 1
  },
  Pe = ["innerHTML"];

function Ee(e, t, o, c, a, r) {
  const h = d("woo-avatar"),
    _ = d("woo-box"),
    m = d("woo-box-item"),
    v = d("woo-fonticon"),
    D = d("woo-icon");
  return u(), w(m, {
    align: "center",
    class: s(e.$style.cut),
    onClick: t[3] || (t[3] = k => r.openWeibo(o.status))
  }, {
    default: i(() => [n(_, {
      align: "center",
      onClick: j(r.openUser, ["stop"])
    }, {
      default: i(() => [(u(), w(h, {
        key: o.item.user.avatar_large,
        size: 50,
        src: o.item.user.avatar_large,
        class: s(e.$style.lbface)
      }, null, 8, ["src", "class"])), n(m, {
        align: "center",
        class: s(e.$style.cut)
      }, {
        default: i(() => [l("div", {
          class: s(["wbpro-textcut", [e.$style.lbh3]])
        }, [l("span", {
          onClick: t[0] || (t[0] = j((...k) => r.openUser && r.openUser(...k), ["stop"]))
        }, f(o.item.user.screen_name), 1)], 2), n(_, {
          align: "center",
          class: s(["wbpro-textcut", [e.$style.lbh4]])
        }, {
          default: i(() => [l("span", {
            onClick: t[1] || (t[1] = j((...k) => r.openUser && r.openUser(...k), ["stop"]))
          }, "微博数量：" + f(o.item.user.statuses_count), 1), l("span", {
            onClick: t[2] || (t[2] = j((...k) => r.openUser && r.openUser(...k), ["stop"]))
          }, "粉丝数: " + f(o.item.user.followers_count), 1)]),
          _: 1
        }, 8, ["class"])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["onClick"]), o.status.user ? (u(), g("div", qe, [l("div", {
      class: s(e.$style.lbh3),
      innerHTML: r.transtText(o.status.text)
    }, null, 10, Pe), n(_, {
      align: "center",
      class: s(["wbpro-textcut", [e.$style.lbh4]])
    }, {
      default: i(() => [n(_, {
        align: "center",
        class: s(e.$style.lbopt)
      }, {
        default: i(() => [n(v, {
          value: "retweet"
        }), l("span", null, f(o.status.reposts_count), 1)]),
        _: 1
      }, 8, ["class"]), n(_, {
        align: "center",
        class: s(e.$style.lbopt)
      }, {
        default: i(() => [n(v, {
          value: "comment"
        }), l("span", null, f(o.status.comments_count), 1)]),
        _: 1
      }, 8, ["class"]), n(_, {
        align: "center",
        class: s(e.$style.lbopt)
      }, {
        default: i(() => [n(D, {
          symbol: o.status.liked ? "liked" : "like",
          size: 14,
          class: s(e.$style.like)
        }, null, 8, ["symbol", "class"]), l("span", null, f(o.status.attitudes_count), 1)]),
        _: 1
      }, 8, ["class"]), l("span", null, "发布于" + f(e.fromNow(o.status.created_at, "history")), 1)]),
      _: 1
    }, 8, ["class"])])) : (u(), w(_, {
      key: 0,
      align: "center",
      justify: "center",
      class: s(e.$style.lbempty)
    }, {
      default: i(() => t[4] || (t[4] = [b(" 暂未发布评测 ")])),
      _: 1
    }, 8, ["class"]))]),
    _: 1
  }, 8, ["class"])
}
const Ve = {
    $style: Me
  },
  te = E(Le, [
    ["render", Ee],
    ["__cssModules", Ve]
  ]);
let ze = 0;

function U() {
  return ze++
}
const N = {
    data() {
      return {
        resData: {},
        pages: {},
        locked: !1,
        hasMore: U(),
        sinceid: 0,
        transId: "",
        query: {},
        loader_clock: null,
        loadMoreState: "",
        isLoading: !0,
        isRetry: !1,
        isNoData: !1,
        isEmpty: void 0,
        initLoading: !1,
        refreshId: U()
      }
    },
    computed: {
      list() {
        const e = this,
          t = [];
        if (console.log("vm.pages", e.pages, this.orderReverse), this.isGet = !0, this.orderReverse) {
          const o = Object.keys(e.pages).reverse();
          for (let c = 0; c < o.length; c++) + o[c] != 0 ? t.push(...e.pages[o[c]]) : t.unshift(...e.pages[o[c]]), console.log(o[c], e.pages[o[c]])
        } else
          for (const o in e.pages) t.push(...e.pages[o]), console.log(o, e.pages[o]);
        return console.log(t), t
      }
    },
    mounted() {
      const e = this;
      e.$nextTick(() => {
        e.initLoading = !0
      })
    },
    methods: {
      tick() {
        const e = this;
        e.$nextTick(() => {
          e.refreshId = U()
        })
      },
      reset(e) {
        const t = this;
        t.hasMore = U(), t.locked = !1, e && t.pages && (t.pages = {}), t.sinceid = 0
      },
      onBegin(e) {
        console.log("onBegin"), e.detail.currentY
      },
      onActive(e) {
        console.log("onActive");
        const t = this;
        t.reset(), t.loadDataByPage(0, () => {
          t.tick()
        })
      },
      onAfter(e) {
        console.log("onAfter"), e.detail.currentY
      },
      getMore() {
        const e = this;
        console.log(e.transId, this.sinceid), !e.locked && e.hasMore && (clearTimeout(e.loader_clock), this.isLoading = !0, e.loader_clock = setTimeout(() => {
          e.loadDataByPage(e.sinceid)
        }, 500))
      },
      loadDataByPage(e, t) {
        const o = this;
        console.log(o.transId, e), !o.locked && (o.locked = !0, this.isLoading = !0, this.$http.get(o.transId, {
          params: S({
            sinceid: e
          }, o.query)
        }).then(c => {
          c = c.data, this.resData = c.data, c.data && c.data.list ? (e === 0 ? o.$set(o, "pages", {
            [e]: c.data.list
          }) : o.$set(o.pages, e, c.data.list), console.log(this.pages, c.data), this.isEmpty = !1, +c.data.sinceid != 0 ? o.hasMore = U() : (this.isNoData = !0, this.isLoading = !1, this.list.length || (this.isEmpty = !0), o.hasMore = !1), c.data.candidate_count !== void 0 && (console.log(c.data), this.count = c.data.candidate_count, this.total = c.data.activity_info.goods_count), o.sinceid = c.data.sinceid, t && t(c.data), o.onPageLoaded && o.onPageLoaded(c.data), this.transId === "list" && this.store.get("usercount", a => {
            console.log(a), c.data.list.forEach(r => {
              console.log(r), console.log(123), r.aid === a.aid && this.store.set("usercount", {
                count: r.candidate_count,
                aid: r.aid
              }, () => {})
            })
          }, !1), this.transId === "user_list" && this.store.get("usercount", a => {
            c.data.activity_info.aid === a.aid && this.store.set("usercount", {
              count: c.data.candidate_count,
              aid: a.aid
            }, () => {})
          }, !1), this.transId === "candidate" && (this.candidate_count = c.data.candidate_count)) : (o.pages = {}, this.isNoData = !0, this.isLoading = !1, o.hasMore = !1), o.locked = !1, o.tick()
        }, c => {
          o.isLoading = !1, o.hasMore = !1, o.locked = !1, o.tick()
        }))
      }
    }
  },
  Ue = "_tab_5kfku_3",
  Ie = "_btn_5kfku_14",
  Se = "_tipbox_5kfku_20",
  Be = "_backbar_5kfku_25",
  xe = "_bbb_5kfku_30",
  Fe = "_bb1_5kfku_38",
  Te = "_bb2_5kfku_47",
  Ne = "_boxa_5kfku_57",
  Re = "_p1_5kfku_63",
  Ae = "_fbox_5kfku_67",
  Ge = "_fdl_5kfku_73",
  Oe = "_fdllt_5kfku_76",
  He = "_fdlrt_5kfku_79",
  We = "_fdlwrap_5kfku_83",
  Ye = "_fdt_5kfku_86",
  Je = "_fdd_5kfku_93",
  Ke = "_ipt1_5kfku_97",
  Qe = "_ipt2_5kfku_100",
  Xe = "_fddp1_5kfku_104",
  Ze = "_fddp2_5kfku_112",
  et = "_ipt3_5kfku_119",
  tt = "_picbox_5kfku_125",
  st = "_picboxout_5kfku_130",
  ot = "_picboxmar_5kfku_133",
  lt = "_picbox1_5kfku_139",
  nt = "_picbox2_5kfku_146",
  at = "_layer1_5kfku_154",
  it = "_layer2_5kfku_157",
  rt = "_lyt1_5kfku_171",
  dt = "_lyt2_5kfku_174",
  ct = "_layer3_5kfku_179",
  ut = "_tip_5kfku_20",
  pt = "_tip1_5kfku_190",
  _t = "_tip2_5kfku_193",
  ft = "_tip3_5kfku_196",
  mt = "_scroll_5kfku_199",
  ht = "_item_5kfku_204",
  bt = "_h3_5kfku_214",
  yt = "_h4_5kfku_215",
  gt = "_pic_5kfku_125",
  vt = "_cut_5kfku_224",
  kt = "_btbar_5kfku_237",
  $t = "_btbarin_5kfku_242",
  wt = "_lista_5kfku_250",
  Ct = "_laitemin_5kfku_253",
  Dt = "_lah3_5kfku_259",
  jt = "_lah4_5kfku_259",
  Mt = "_lar_5kfku_269",
  Lt = "_larh3_5kfku_272",
  qt = "_larh4_5kfku_276",
  Pt = "_larh5_5kfku_281",
  Et = "_help_5kfku_286",
  Vt = "_helppop1_5kfku_290",
  zt = "_page_5kfku_298",
  Ut = "_pageCurr_5kfku_311",
  It = "_pageDis_5kfku_314",
  St = "_pageLine_5kfku_319",
  Bt = "_listbipt_5kfku_324",
  xt = "_listb_5kfku_324",
  Ft = "_lbitemin_5kfku_332",
  Tt = "_lbface_5kfku_335",
  Nt = "_lbh3_5kfku_338",
  Rt = "_lbh4_5kfku_347",
  At = "_lbh42_5kfku_358",
  Gt = "_lbempty_5kfku_361",
  Ot = "_lbopt_5kfku_365",
  Ht = "_like_5kfku_374",
  Wt = "_lbr_5kfku_377",
  Yt = "_lbtit_5kfku_380",
  Jt = "_lbtitem_5kfku_384",
  Kt = "_lbline_5kfku_388",
  Qt = "_lbrh3_5kfku_391",
  Xt = "_lbmar1_5kfku_399",
  Zt = "_lbmar2_5kfku_403",
  es = "_ipt4_5kfku_406",
  ts = "_phone_5kfku_409",
  ss = {
    tab: Ue,
    btn: Ie,
    tipbox: Se,
    backbar: Be,
    bbb: xe,
    bb1: Fe,
    bb2: Te,
    boxa: Ne,
    p1: Re,
    fbox: Ae,
    fdl: Ge,
    fdllt: Oe,
    fdlrt: He,
    fdlwrap: We,
    fdt: Ye,
    fdd: Je,
    ipt1: Ke,
    ipt2: Qe,
    fddp1: Xe,
    fddp2: Ze,
    ipt3: et,
    picbox: tt,
    picboxout: st,
    picboxmar: ot,
    picbox1: lt,
    picbox2: nt,
    layer1: at,
    layer2: it,
    lyt1: rt,
    lyt2: dt,
    layer3: ct,
    tip: ut,
    tip1: pt,
    tip2: _t,
    tip3: ft,
    scroll: mt,
    item: ht,
    h3: bt,
    h4: yt,
    pic: gt,
    cut: vt,
    btbar: kt,
    btbarin: $t,
    lista: wt,
    laitemin: Ct,
    lah3: Dt,
    lah4: jt,
    lar: Mt,
    larh3: Lt,
    larh4: qt,
    larh5: Pt,
    help: Et,
    helppop1: Vt,
    page: zt,
    pageCurr: Ut,
    pageDis: It,
    pageLine: St,
    listbipt: Bt,
    listb: xt,
    lbitemin: Ft,
    lbface: Tt,
    lbh3: Nt,
    lbh4: Rt,
    lbh42: At,
    lbempty: Gt,
    lbopt: Ot,
    like: Ht,
    lbr: Wt,
    lbtit: Yt,
    lbtitem: Jt,
    lbline: Kt,
    lbrh3: Qt,
    lbmar1: Xt,
    lbmar2: Zt,
    ipt4: es,
    phone: ts
  },
  os = {
    mixins: [N],
    props: ["data"],
    data() {
      return {
        query: {
          orderby: "apply_time",
          aid: null,
          keyword: ""
        },
        transId: "/ajax/mng/evaluation/user_list",
        count: 0,
        total: 0,
        check: !1,
        search: "",
        publishDisabled: !0,
        show2: !1,
        orderList: {
          value: {
            key: "按时间",
            value: "apply_time"
          },
          options: [{
            key: "按时间",
            value: "apply_time"
          }, {
            key: "按粉丝数",
            value: "followers_count"
          }, {
            key: "按微博热度",
            value: "mblog_heat"
          }]
        }
      }
    },
    components: {
      Scroll: x,
      EvFeed: te,
      Multiselect: H
    },
    watch: {
      "orderList.value": function(e) {
        this.query.orderby = e.value, this.loadDataByPage(0)
      },
      data: function(e) {
        this.query.aid = e, this.loadDataByPage(0)
      },
      "query.keyword": function(e) {
        this.loadDataByPage(0)
      },
      check: function(e) {
        this.query.keyword = "", this.transId = e ? "/ajax/mng/evaluation/candidate" : "/ajax/mng/evaluation/user_list", this.loadDataByPage(0)
      },
      count: function(e) {
        e > 0 && e <= this.total && this.resData.activity_info.status === 2 ? this.publishDisabled = !1 : this.publishDisabled = !0
      }
    },
    emits: ["change"],
    methods: {
      optionLabel({
        key: e
      }) {
        return e || null
      },
      reset() {
        this.query = {
          orderby: "apply_time",
          aid: this.query.aid,
          keyword: ""
        }
      },
      changeFilterType(e) {
        this.query.orderby = e.value, this.loadDataByPage(0), this.close()
      },
      close() {
        this.show2 = !1
      },
      publish() {
        this.$_w_dialog({
          type: "confirm",
          kind: "bar",
          title: "提示",
          component: {
            template: `<woo-panel border="none" class="dialog-custom">
    <div style="padding: 10px">
      公示中选名单后无法修改，会以私信通知中选用户，并发布中选名单微博
    </div>
  </woo-panel>`
          },
          action: () => {
            this.$http.post("/ajax/mng/evaluation/draw_activity", {
              aid: this.query.aid
            }).then(e => {
              e.data && e.data.code === "1000" && (this.$_w_toast({
                type: "success",
                message: "发布成功"
              }), this.$router.push({
                name: "MngEvaluation",
                query: this.$route.query
              }))
            })
          }
        })
      },
      changePage() {
        this.$emit("change", "List"), this.query.keyword = ""
      },
      changeCandidate(e) {
        this.$http.get("/ajax/mng/evaluation/change_candidate", {
          params: {
            aid: this.query.aid,
            candi_uid: e.user.id,
            add: e.is_candidate ? "0" : "1"
          }
        }).then(t => {
          t.data.ok && t.data.code === "1000" && (e.is_candidate = !e.is_candidate, this.count = this.count + (e.is_candidate ? 1 : -1))
        })
      }
    },
    mounted() {
      this.query.aid = this.data, this.loadDataByPage(0)
    }
  },
  ls = {
    class: "option__desc"
  };

function ns(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-panel"),
    v = d("woo-input"),
    D = d("Multiselect"),
    k = d("woo-divider"),
    P = d("EvFeed"),
    M = d("woo-button"),
    y = d("woo-pop-item"),
    L = d("Scroll"),
    p = d("woo-box-item"),
    V = d("woo-tip"),
    z = d("woo-checkbox");
  return u(), g("div", null, [n(m, {
    border: "bottom",
    class: s(e.$style.backbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      class: s(e.$style.bbb)
    }, {
      default: i(() => [n(_, {
        class: s(e.$style.bb1),
        align: "center",
        onMousedown: r.changePage
      }, {
        default: i(() => [n(h, {
          value: "angleLeft"
        }), t[5] || (t[5] = b(" 返回 "))]),
        _: 1
      }, 8, ["class", "onMousedown"]), l("div", {
        class: s(e.$style.bb2)
      }, " 选取用户 ", 2)]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), l("div", {
    class: s(e.$style.boxa)
  }, [n(_, {
    justify: "between"
  }, {
    default: i(() => [a.check ? C("", !0) : (u(), w(v, {
      key: 0,
      modelValue: a.query.keyword,
      "onUpdate:modelValue": t[0] || (t[0] = q => a.query.keyword = q),
      clearable: "",
      class: s(e.$style.listbipt),
      placeholder: "搜索用户昵称",
      onClear: r.reset
    }, {
      icon: i(() => [n(h, {
        value: "search"
      })]),
      _: 1
    }, 8, ["modelValue", "class", "onClear"])), n(_, {
      align: "center",
      style: {
        width: "128px"
      },
      class: s(e.$style.lbmar1)
    }, {
      default: i(() => [n(D, {
        modelValue: a.orderList.value,
        "onUpdate:modelValue": t[1] || (t[1] = q => a.orderList.value = q),
        placeholder: "按时间",
        options: a.orderList.options,
        "show-labels": !1,
        searchable: !1,
        "custom-label": r.optionLabel
      }, {
        singleLabel: i(q => [l("span", ls, [l("span", {
          class: s(["option__title", e.$style.mtselect])
        }, f(q && q.option && q.option.key), 3)])]),
        _: 1
      }, 8, ["modelValue", "options", "custom-label"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }), l("div", {
    class: s(e.$style.listb)
  }, [n(k), e.isEmpty ? C("", !0) : (u(), w(p, {
    key: 0,
    class: s(e.$style.lista)
  }, {
    default: i(() => [l("div", {
      class: s(e.$style.scroll)
    }, [n(L, {
      isRetry: e.isRetry,
      "onUpdate:isRetry": t[2] || (t[2] = q => e.isRetry = q),
      skeleton: !0,
      data: e.list,
      buffer: 1e3,
      isLoading: e.isLoading,
      isNoData: e.isNoData,
      onLoadMoreData: e.getMore
    }, {
      content: i(({
        item: q
      }) => [n(y, {
        class: s(e.$style.lbitem),
        style: {
          width: "100%"
        }
      }, {
        default: i(() => [n(_, {
          class: s(e.$style.lbitemin),
          style: {
            width: "100%"
          }
        }, {
          default: i(() => [n(P, {
            item: q,
            status: q
          }, null, 8, ["item", "status"]), n(_, {
            direction: "y",
            align: "center",
            justify: "center",
            class: s(e.$style.lbr)
          }, {
            default: i(() => [n(M, {
              sort: q.is_candidate ? "line" : "flat",
              kind: "primary",
              round: !1,
              class: s(e.$style.btn),
              onClick: j($ => r.changeCandidate(q), ["stop"])
            }, {
              default: i(() => [b(f(q.is_candidate ? "已选中" : "选中"), 1)]),
              _: 2
            }, 1032, ["sort", "class", "onClick"])]),
            _: 2
          }, 1032, ["class"])]),
          _: 2
        }, 1032, ["class"]), n(k)]),
        _: 2
      }, 1032, ["class"])]),
      _: 1
    }, 8, ["isRetry", "data", "isLoading", "isNoData", "onLoadMoreData"])], 2)]),
    _: 1
  }, 8, ["class"])), a.query.keyword && e.isEmpty ? (u(), w(V, {
    key: 1,
    type: "warn",
    sort: "vertical",
    class: s(e.$style.tipbox)
  }, {
    default: i(() => [t[6] || (t[6] = b(" 没有检索到你查到的用户，")), l("a", {
      onClick: t[3] || (t[3] = j((...q) => r.reset && r.reset(...q), ["stop", "prevent"]))
    }, "返回全部")]),
    _: 1
  }, 8, ["class"])) : C("", !0)], 2)], 2), n(m, {
    border: "top",
    class: s(e.$style.btbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      justify: "end",
      class: s(e.$style.btbarin)
    }, {
      default: i(() => [n(z, {
        modelValue: a.check,
        "onUpdate:modelValue": t[4] || (t[4] = q => a.check = q)
      }, {
        default: i(() => t[7] || (t[7] = [b(" 仅显示选中用户 ")])),
        _: 1
      }, 8, ["modelValue"]), n(M, {
        disabled: a.publishDisabled,
        sort: "flat",
        kind: "primary",
        round: !1,
        class: s(e.$style.btn),
        onClick: j(r.publish, ["stop"])
      }, {
        default: i(() => [b(" 公示中选名单(" + f(a.count) + "/" + f(a.total) + ") ", 1)]),
        _: 1
      }, 8, ["disabled", "class", "onClick"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])])
}
const as = {
    $style: ss
  },
  is = E(os, [
    ["render", ns],
    ["__cssModules", as]
  ]),
  se = {
    1: "转发微博"
  },
  Y = {
    1: "自主选取",
    2: "抽奖平台随机选取"
  },
  oe = {
    "-1": "逾期",
    1: "报名中",
    2: "选择中",
    3: "活动结束"
  },
  le = {
    0: "深度过滤",
    1: "普通过滤",
    2: "不过滤"
  },
  rs = "_tab_szg63_3",
  ds = "_btn_szg63_15",
  cs = "_tipbox_szg63_21",
  us = "_boxa_szg63_25",
  ps = "_lista_szg63_32",
  _s = "_laitemin_szg63_36",
  fs = "_lah3_szg63_43",
  ms = "_lah4_szg63_43",
  hs = "_lar_szg63_53",
  bs = "_larh3_szg63_56",
  ys = "_larh4_szg63_60",
  gs = "_larh5_szg63_65",
  vs = "_scroll_szg63_70",
  ks = "_container_szg63_74",
  $s = {
    tab: rs,
    btn: ds,
    tipbox: cs,
    boxa: us,
    lista: ps,
    laitemin: _s,
    lah3: fs,
    lah4: ms,
    lar: hs,
    larh3: bs,
    larh4: ys,
    larh5: gs,
    scroll: vs,
    container: ks
  },
  ws = {
    mixins: [N],
    data() {
      return {
        choose_mode_value: Y,
        radio1: "radio12",
        radio2: "radio22",
        show: !1,
        show1: !1,
        showHelp1: !1,
        showHelp2: !1,
        animations: ["pop"],
        animation: "",
        fruit: "",
        orderReverse: !0,
        transId: "/ajax/mng/evaluation/manage_activity"
      }
    },
    components: {
      Scroll: x
    },
    emits: ["change"],
    methods: {
      showHelp(e, t) {
        this.$set(e, "showHelp", t)
      },
      chooseUser(e) {
        this.$emit("change", "ChooseUser", e)
      },
      openWinner(e) {
        this.$emit("change", "Winner", e)
      },
      changePage() {
        this.resData.user_status <= -1 ? this.$_w_toast({
          type: "warn",
          message: this.resData.user_status_str || "发布活动今日已达上限"
        }) : this.$emit("change", "Publish")
      },
      close() {
        this.show = !1
      },
      showModal1(e) {
        this.show1 = !0, this.animation = e
      },
      showDialogD() {
        this.$Bus.$on("customValue", e => {
          this.fruit = e
        }), this.$_w_dialog({
          type: "confirm",
          kind: "bar",
          title: "活动详情",
          componentProps: {
            fruit: this.fruit
          },
          action: () => {
            this.$Bus.$off("customValue")
          }
        })
      }
    },
    mounted() {
      this.loadDataByPage(0)
    }
  },
  Cs = {
    key: 2
  },
  Ds = {
    key: 4
  };

function js(e, t, o, c, a, r) {
  const h = d("woo-tab-item"),
    _ = d("woo-tab"),
    m = d("woo-box-item"),
    v = d("woo-box"),
    D = d("woo-panel"),
    k = d("woo-button"),
    P = d("woo-tip"),
    M = d("woo-pop"),
    y = d("woo-pop-item"),
    L = d("Scroll");
  return u(), g("div", null, [n(D, {
    border: "bottom"
  }, {
    default: i(() => [n(v, {
      align: "center"
    }, {
      default: i(() => [n(m, null, {
        default: i(() => [n(_, {
          animate: "",
          "animate-duration": 500
        }, {
          default: i(() => [n(h, {
            index: 0
          }, {
            default: i(() => [l("div", {
              class: s(e.$style.tab)
            }, " 0元试用 ", 2)]),
            _: 1
          })]),
          _: 1
        })]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }), l("div", {
    class: s(e.$style.boxa)
  }, [n(k, {
    sort: "flat",
    kind: "primary",
    round: !1,
    class: s(e.$style.btn),
    onClick: r.changePage
  }, {
    default: i(() => t[1] || (t[1] = [b(" +发布0元试用 ")])),
    _: 1
  }, 8, ["class", "onClick"]), n(m, {
    class: s(e.$style.lista)
  }, {
    default: i(() => [l("div", {
      class: s(e.$style.scroll)
    }, [n(L, {
      isRetry: e.isRetry,
      "onUpdate:isRetry": t[0] || (t[0] = p => e.isRetry = p),
      skeleton: !0,
      keyField: "aid",
      data: e.list,
      isLoading: e.isLoading,
      isNoData: e.isNoData,
      isEmpty: e.isEmpty,
      emptyText: "还没有发布过0元试用活动~",
      onLoadMoreData: e.getMore
    }, {
      content: i(({
        item: p,
        index: V
      }) => [n(D, {
        border: V ? "bottom" : "top, bottom",
        class: s(e.$style.container)
      }, {
        default: i(() => [n(y, {
          class: s(e.$style.laitemin)
        }, {
          default: i(() => [n(m, {
            align: "center",
            class: s(e.$style.cut)
          }, {
            default: i(() => [l("div", {
              class: s(["wbpro-textcut", [e.$style.lah3]])
            }, " 【0元试用】" + f(p.title), 3), n(v, {
              align: "center",
              class: s(["wbpro-textcut", [e.$style.lah4]])
            }, {
              default: i(() => [l("span", null, "试用数量：" + f(p.goods_count), 1), l("span", null, "报名人数：" + f(p.valid_person_count), 1), l("span", null, "中选方式：" + f(a.choose_mode_value[p.choose_mode]), 1)]),
              _: 2
            }, 1032, ["class"]), l("div", {
              class: s(["wbpro-textcut", [e.$style.lah4]])
            }, " 报名结束时间：" + f(p.apply_end_time), 3)]),
            _: 2
          }, 1032, ["class"]), n(v, {
            direction: "y",
            align: "end",
            justify: "center",
            class: s(e.$style.lar)
          }, {
            default: i(() => [p.status === 2 ? (u(), w(v, {
              key: 0,
              direction: "y",
              align: "end",
              justify: "center",
              class: s(e.$style.lar)
            }, {
              default: i(() => [l("div", null, [p.choose_mode === 1 ? (u(), w(k, {
                key: 0,
                sort: "flat",
                kind: "primary",
                round: !1,
                class: s(e.$style.btn),
                onClick: j(z => r.chooseUser(p.aid), ["stop"])
              }, {
                default: i(() => t[2] || (t[2] = [b(" 选取用户 ")])),
                _: 2
              }, 1032, ["class", "onClick"])) : (u(), g("span", {
                key: 1,
                class: s(e.$style.larh4)
              }, "开奖中", 2))]), p.draw_expire ? (u(), g("div", {
                key: 0,
                class: s(e.$style.larh4)
              }, f(p.draw_expire), 3)) : C("", !0)]),
              _: 2
            }, 1032, ["class"])) : p.fail_reason || p.status === -1 ? (u(), w(v, {
              key: 1,
              align: "center",
              class: s(e.$style.larh5)
            }, {
              default: i(() => [l("span", null, f(p.status_str), 1), p.fail_reason ? (u(), w(M, {
                key: 0,
                show: p.showHelp,
                direction: "down",
                align: "end",
                gap: "10",
                class: s(e.$style.help)
              }, {
                ctrl: i(() => [n(P, {
                  type: "help",
                  gap: "10",
                  inline: "",
                  reverse: "",
                  onMouseover: z => r.showHelp(p, !0),
                  onMouseout: z => r.showHelp(p, !1)
                }, null, 8, ["onMouseover", "onMouseout"])]),
                default: i(() => [l("div", {
                  class: s(e.$style.helppop1)
                }, [l("div", null, f(p.fail_reason), 1)], 2)]),
                _: 2
              }, 1032, ["show", "class"])) : C("", !0)]),
              _: 2
            }, 1032, ["class"])) : p.status === 3 ? (u(), g("div", Cs, [l("div", null, [n(k, {
              sort: "flat",
              kind: "primary",
              round: !1,
              class: s(e.$style.btn),
              onClick: z => r.openWinner(p.aid)
            }, {
              default: i(() => t[3] || (t[3] = [b(" 查看中选名单 ")])),
              _: 2
            }, 1032, ["class", "onClick"])]), p.num ? (u(), g("div", {
              key: 0,
              class: s(e.$style.larh4)
            }, " 已发布" + f(p.num) + "份评测报告 ", 3)) : C("", !0)])) : p.fail_reason ? (u(), g("div", Ds, [l("div", null, [n(k, {
              sort: "flat",
              kind: "primary",
              round: !1,
              class: s(e.$style.btn)
            }, {
              default: i(() => t[4] || (t[4] = [b(" 查看中选名单 ")])),
              _: 1
            }, 8, ["class"])]), p.express_expire ? (u(), g("div", {
              key: 0,
              class: s(e.$style.larh4)
            }, f(p.express_expire), 3)) : C("", !0)])) : (u(), g("div", {
              key: 3,
              class: s(e.$style.larh3)
            }, f(p.status_str), 3))]),
            _: 2
          }, 1032, ["class"])]),
          _: 2
        }, 1032, ["class"])]),
        _: 2
      }, 1032, ["border", "class"])]),
      _: 1
    }, 8, ["isRetry", "data", "isLoading", "isNoData", "isEmpty", "onLoadMoreData"])], 2)]),
    _: 1
  }, 8, ["class"])], 2)])
}
const Ms = {
    $style: $s
  },
  Ls = E(ws, [
    ["render", js],
    ["__cssModules", Ms]
  ]),
  qs = "_card_9sm17_2",
  Ps = {
    card: qs
  },
  Es = {
    props: {
      hasGap: {
        type: Boolean,
        default: !0
      }
    }
  };

function Vs(e, t, o, c, a, r) {
  const h = d("woo-panel");
  return u(), w(h, {
    class: s(o.hasGap && e.$style.card)
  }, {
    default: i(() => [W(e.$slots, "default")]),
    _: 3
  }, 8, ["class"])
}
const zs = {
    $style: Ps
  },
  ne = E(Es, [
    ["render", Vs],
    ["__cssModules", zs]
  ]),
  Us = "_con_1pdxy_2",
  Is = "_fixed_1pdxy_7",
  Ss = "_conin_1pdxy_12",
  Bs = "_conup_1pdxy_16",
  xs = "_ipt_1pdxy_19",
  Fs = "_btn_1pdxy_27",
  Ts = "_text_1pdxy_31",
  Ns = "_f14_1pdxy_35",
  Rs = "_f17_1pdxy_38",
  As = "_fa_1pdxy_41",
  Gs = "_fc_1pdxy_44",
  Os = "_fy_1pdxy_47",
  Hs = "_t1_1pdxy_50",
  Ws = "_t1in_1pdxy_53",
  Ys = "_conin2_1pdxy_56",
  Js = "_btn2_1pdxy_59",
  Ks = "_btn3_1pdxy_63",
  Qs = {
    con: Us,
    fixed: Is,
    conin: Ss,
    conup: Bs,
    ipt: xs,
    btn: Fs,
    text: Ts,
    f14: Ns,
    f17: Rs,
    fa: As,
    fc: Gs,
    fy: Os,
    t1: Hs,
    t1in: Ws,
    conin2: Ys,
    btn2: Js,
    btn3: Ks
  },
  Xs = {
    inheritAttrs: !1,
    data() {
      return {
        check: !0,
        timer: null,
        timestamp: {
          hour: 0,
          min: 0,
          sec: 0
        }
      }
    },
    props: {
      params: {
        type: Object,
        default: () => ({
          checked: null,
          disabled: null,
          action: null,
          type: null,
          typein: null,
          text: null,
          end_time: null
        })
      },
      aid: {
        type: String,
        default: void 0
      },
      needFixed: {
        type: Boolean,
        detail: !1
      }
    },
    components: {
      Card: ne
    },
    emits: ["update:params", "change"],
    methods: {
      jump(e, t) {},
      checkboxChange(e) {
        const t = this,
          o = t.params;
        o.disabled = !e.detail.value, t.$emit("update:params", o)
      },
      countdown(e) {
        const t = Date.parse(new Date),
          o = e * 1e3 - t;
        if (o <= 0) {
          this.$emit("change", "end");
          return
        }
        const c = Number.parseInt(o / 1e3 / 60 / 60 / 24);
        let a = Number.parseInt(o / 1e3 / 60 / 60 % 24) + c * 24,
          r = Number.parseInt(o / 1e3 / 60 % 60),
          h = Number.parseInt(o / 1e3 % 60);
        a = a > 9 ? a : `0${a}`, r = r > 9 ? r : `0${r}`, h = h > 9 ? h : `0${h}`, this.timestamp.hour = a, this.timestamp.min = r, this.timestamp.sec = h, setTimeout(() => {
          this.countdown(e)
        }, 500)
      }
    },
    mounted() {
      this.params && this.params.timestamp && this.countdown(this.params.timestamp)
    }
  },
  Zs = {
    key: 1,
    class: "woo-link"
  };

function eo(e, t, o, c, a, r) {
  const h = d("checkbox"),
    _ = d("woo-button"),
    m = d("woo-box"),
    v = d("Card");
  return u(), w(v, {
    hasGap: !1,
    class: s([e.$style.con, o.needFixed && e.$style.fixed])
  }, {
    default: i(() => [o.params.type === "a" && o.params.typein === "a2" ? (u(), g("div", {
      key: 0,
      class: s(e.$style.conup)
    }, [l("div", {
      class: s(e.$style.ipt)
    }, [n(h, {
      id: "checkbox1",
      checked: o.params.checked,
      onChange: r.checkboxChange
    }, null, 8, ["checked", "onChange"]), t[3] || (t[3] = l("label", {
      for: "checkbox1"
    }, "已阅读并同意", -1)), o.params.choose_mode === 1 ? (u(), g("span", {
      key: 0,
      class: "woo-link",
      onClick: t[0] || (t[0] = D => r.jump("pages/agreement/index?type=1", 1))
    }, "《微博众测商家服务协议》")) : o.params.choose_mode === 2 ? (u(), g("span", Zs, [l("span", {
      onClick: t[1] || (t[1] = D => r.jump("pages/agreement/index?type=1", 1))
    }, "《微博众测商家服务协议》"), l("span", {
      onClick: t[2] || (t[2] = D => r.jump("https://card.weibo.com/article/m/show/id/2309404376967867721529?_wb_client_=1"))
    }, "《有奖活动管理规范》")])) : C("", !0)], 2)], 2)) : C("", !0), n(m, {
      align: "center",
      class: s([e.$style.conin, o.params.type === "d" && e.$style.conin2])
    }, {
      default: i(() => [n(_, {
        fluid: "",
        sort: "flat",
        disabled: o.params.disabled,
        kind: "primary",
        size: "large",
        style: {
          height: "100%"
        },
        onClick: o.params.action
      }, {
        default: i(() => [b(f(o.params.text || "下一步"), 1)]),
        _: 1
      }, 8, ["disabled", "onClick"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])
}
const to = {
    $style: Qs
  },
  so = E(Xs, [
    ["render", eo],
    ["__cssModules", to]
  ]),
  oo = "_pic_1e8f5_2",
  lo = "_inner_1e8f5_5",
  no = "_top_1e8f5_10",
  ao = "_bottom_1e8f5_22",
  io = "_h3_1e8f5_30",
  ro = "_h4_1e8f5_34",
  co = "_normal_1e8f5_42",
  uo = "_corner_1e8f5_46",
  po = "_cnin_1e8f5_54",
  _o = "_cnin1_1e8f5_64",
  fo = "_cnin2_1e8f5_67",
  mo = {
    pic: oo,
    inner: lo,
    top: no,
    bottom: ao,
    h3: io,
    h4: ro,
    normal: co,
    corner: uo,
    cnin: po,
    cnin1: _o,
    cnin2: fo
  },
  ho = {
    props: {
      hasGap: {
        type: Boolean,
        default: !1
      },
      info: {
        type: Object,
        default: null
      },
      infoCover: {
        type: Boolean,
        default: !1
      },
      state: {
        type: String,
        default: "end"
      }
    },
    methods: {
      open() {
        this.infoCover
      }
    }
  },
  bo = {
    key: 0
  },
  yo = {
    key: 2
  };

function go(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-picture");
  return o.info ? (u(), w(m, {
    key: 0,
    "aspect-ratio": "16:9",
    src: o.info.cover_pic,
    class: s(e.$style.pic),
    onClick: r.open
  }, {
    default: i(() => [o.infoCover ? (u(), g("div", {
      key: 0,
      class: s(e.$style.inner)
    }, [n(_, {
      align: "center",
      justify: "end",
      class: s(e.$style.top)
    }, {
      default: i(() => [n(h, {
        value: "tryMp",
        class: "wbox-mp-fonticon"
      }), t[0] || (t[0] = l("span", null, "0元试用", -1))]),
      _: 1
    }, 8, ["class"]), n(_, {
      direction: "y",
      class: s(e.$style.bottom)
    }, {
      default: i(() => [l("div", {
        class: s(["wbox-autocut", [e.$style.h3]])
      }, f(o.info.title), 3), l("div", {
        class: s(["wbox-autocut", [e.$style.h4]])
      }, [+o.info.apply_person_count > 0 ? (u(), g("span", bo, [b(f(o.info.apply_person_count) + "人", 1), l("span", {
        class: s(e.$style.normal)
      }, "已报名", 2)])) : C("", !0), +o.info.apply_person_count > 0 && +o.info.market_price > 0 ? (u(), g("a", {
        key: 1,
        class: s(e.$style.normal)
      }, "，", 2)) : C("", !0), +o.info.market_price > 0 ? (u(), g("span", yo, "市场价格￥" + f(o.info.market_price), 1)) : C("", !0)], 2)]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.corner)
    }, [o.state === "end" ? (u(), g("div", {
      key: 0,
      class: s([e.$style.cnin, e.$style.cnin1])
    }, " 已结束 ", 2)) : (u(), g("div", {
      key: 1,
      class: s([e.$style.cnin, e.$style.cnin2])
    }, " 进行中 ", 2))], 2)], 2)) : C("", !0)]),
    _: 1
  }, 8, ["src", "class", "onClick"])) : C("", !0)
}
const vo = {
    $style: mo
  },
  ko = E(ho, [
    ["render", go],
    ["__cssModules", vo]
  ]),
  $o = "_sitem_1g9cl_2",
  wo = "_sicon_1g9cl_6",
  Co = "_stext_1g9cl_23",
  Do = "_sline_1g9cl_29",
  jo = "_scurr_1g9cl_32",
  Mo = {
    sitem: $o,
    sicon: wo,
    stext: Co,
    sline: Do,
    scurr: jo
  },
  Lo = {
    props: {
      choose_mode: {
        type: Number,
        default: 1
      },
      status: {
        type: Number,
        default: 1
      }
    }
  };

function qo(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-divider"),
    v = d("woo-box-item");
  return u(), w(_, {
    align: "center"
  }, {
    default: i(() => [l("div", {
      class: s([e.$style.sitem, o.status > 0 ? e.$style.scurr : ""])
    }, [n(_, {
      align: "center",
      justify: "center",
      class: s(e.$style.sicon)
    }, {
      default: i(() => [n(h, {
        value: "step1Mp",
        class: "wbox-mp-fonticon"
      })]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.stext)
    }, " 参与报名 ", 2)], 2), n(v, {
      align: "center"
    }, {
      default: i(() => [n(m, {
        class: s(e.$style.sline)
      }, null, 8, ["class"])]),
      _: 1
    }), o.choose_mode === 1 ? (u(), g("div", {
      key: 0,
      class: s([e.$style.sitem, o.status > 1 ? e.$style.scurr : ""])
    }, [n(_, {
      align: "center",
      justify: "center",
      class: s(e.$style.sicon)
    }, {
      default: i(() => [n(h, {
        value: "step2Mp",
        class: "wbox-mp-fonticon"
      })]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.stext)
    }, " 发起方选取 ", 2)], 2)) : C("", !0), o.choose_mode === 2 ? (u(), g("div", {
      key: 1,
      class: s([e.$style.sitem, o.status > 1 ? e.$style.scurr : ""])
    }, [n(_, {
      align: "center",
      justify: "center",
      class: s(e.$style.sicon)
    }, {
      default: i(() => [n(h, {
        value: "step2sjMp",
        class: "wbox-mp-fonticon"
      })]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.stext)
    }, " 随机选取 ", 2)], 2)) : C("", !0), n(v, {
      align: "center"
    }, {
      default: i(() => [n(m, {
        class: s(e.$style.sline)
      }, null, 8, ["class"])]),
      _: 1
    }), l("div", {
      class: s([e.$style.sitem, o.status > 2 ? e.$style.scurr : ""])
    }, [n(_, {
      align: "center",
      justify: "center",
      class: s(e.$style.sicon)
    }, {
      default: i(() => [n(h, {
        value: "step3Mp",
        class: "wbox-mp-fonticon"
      })]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.stext)
    }, " 名单公示 ", 2)], 2), n(v, {
      align: "center"
    }, {
      default: i(() => [n(m, {
        class: s(e.$style.sline)
      }, null, 8, ["class"])]),
      _: 1
    }), l("div", {
      class: s([e.$style.sitem, o.status > 3 ? e.$style.scurr : ""])
    }, [n(_, {
      align: "center",
      justify: "center",
      class: s(e.$style.sicon)
    }, {
      default: i(() => [n(h, {
        value: "step4Mp",
        class: "wbox-mp-fonticon"
      })]),
      _: 1
    }, 8, ["class"]), l("div", {
      class: s(e.$style.stext)
    }, " 收货体验 ", 2)], 2)]),
    _: 1
  })
}
const Po = {
    $style: Mo
  },
  Eo = E(Lo, [
    ["render", qo],
    ["__cssModules", Po]
  ]),
  Vo = "_tab_y64de_2",
  zo = "_list_y64de_5",
  Uo = "_wrap_y64de_10",
  Io = "_content_y64de_13",
  So = "_main_y64de_17",
  Bo = "_item_y64de_27",
  xo = "_sp1_y64de_37",
  Fo = "_cur_y64de_56",
  To = {
    tab: Vo,
    list: zo,
    wrap: Uo,
    content: Io,
    main: So,
    item: Bo,
    sp1: xo,
    cur: Fo
  },
  No = {
    props: {
      justify: {
        type: String,
        default: "start"
      },
      num: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        info: [{
          title: "活动规则",
          isShow: !0,
          index: 0,
          id: "rule"
        }, {
          title: "产品介绍",
          isShow: !1,
          index: 1,
          id: "desc"
        }, {
          title: "中选名单",
          isShow: !1,
          index: 2,
          id: "winners"
        }, {
          title: "评测报告",
          isShow: !1,
          index: 3,
          id: "report"
        }],
        curIndex: 0
      }
    },
    watch: {
      num(e) {
        this.curIndex = e
      }
    },
    emits: ["changeTab"],
    methods: {
      changeTab(e) {
        this.curIndex = e.index, this.$emit("changeTab", e)
      }
    }
  },
  Ro = ["onClick"];

function Ao(e, t, o, c, a, r) {
  const h = d("woo-box");
  return u(), g("div", {
    class: s(e.$style.tab)
  }, [l("div", {
    class: s(e.$style.wrap)
  }, [l("div", {
    class: s(e.$style.main)
  }, [n(h, {
    justify: o.justify,
    class: s(e.$style.list)
  }, {
    default: i(() => [(u(!0), g(F, null, T(a.info, (_, m) => (u(), g("div", {
      key: m,
      class: s([e.$style.item, a.curIndex === m && e.$style.cur]),
      onClick: v => r.changeTab(_, m)
    }, [l("span", {
      class: s(e.$style.sp1)
    }, f(_.title), 3)], 10, Ro))), 128))]),
    _: 1
  }, 8, ["justify", "class"])], 2)], 2)], 2)
}
const Go = {
    $style: To
  },
  Oo = E(No, [
    ["render", Ao],
    ["__cssModules", Go]
  ]),
  Ho = "_box_14s4n_2",
  Wo = "_N_14s4n_18",
  Yo = "_M_14s4n_22",
  Jo = {
    box: Ho,
    N: Wo,
    M: Yo
  },
  Ko = {
    props: {
      title: {
        type: String,
        default: ""
      },
      hasLine: {
        type: Boolean,
        default: !1
      },
      type: {
        type: String,
        default: "N"
      }
    }
  };

function Qo(e, t, o, c, a, r) {
  const h = d("woo-box-item"),
    _ = d("woo-box"),
    m = d("woo-divider");
  return u(), g("div", null, [n(_, {
    align: "center",
    class: s(e.$style.box)
  }, {
    default: i(() => [n(h, {
      align: "center",
      class: s(e.$style[o.type])
    }, {
      default: i(() => [b(f(o.title), 1)]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), o.hasLine ? (u(), w(m, {
    key: 0
  })) : C("", !0)])
}
const Xo = {
    $style: Jo
  },
  Zo = E(Ko, [
    ["render", Qo],
    ["__cssModules", Xo]
  ]),
  el = "_card_11vsr_2",
  tl = "_face_11vsr_5",
  sl = "_cut_11vsr_8",
  ol = "_h3_11vsr_11",
  ll = "_h4_11vsr_16",
  nl = {
    card: el,
    face: tl,
    cut: sl,
    h3: ol,
    h4: ll
  },
  al = {
    props: {
      size: {
        type: Number,
        default: 40
      },
      hasAdd: {
        type: Boolean,
        default: !1
      },
      winner: {
        type: Boolean,
        default: !1
      },
      info: {
        type: Object,
        default: () => ({
          avatar_hd: "https://tvax2.sinaimg.cn/crop.0.0.1002.1002.1024/7c00898bly8gcjavioq1tj20ru0rujt3.jpg?KID=imgbed,tva&Expires=1596173712&ssig=rwzWyHrAeQ",
          screen_name: "美的电器"
        })
      }
    },
    emits: ["update:info"],
    methods: {
      toFocus(e) {
        this.trans("follow", {
          uid: e
        }, t => {
          const o = this.info;
          o.following = !1, o.followed = !0, this.$emit("update:info", o)
        })
      },
      isCurrent() {
        return !0
      },
      jumpPro(e) {
        this.jump(`sinaweibo://userinfo?uid=${this.info.id}`)
      },
      jump(e) {
        console.log("utils jump:", e)
      }
    }
  };

function il(e, t, o, c, a, r) {
  const h = d("woo-avatar"),
    _ = d("woo-box-item"),
    m = d("woo-button"),
    v = d("woo-box");
  return u(), w(v, {
    align: "center",
    class: s(e.$style.card)
  }, {
    default: i(() => [n(h, {
      src: o.info.avatar_hd,
      alt: "avatar",
      class: s(e.$style.face),
      size: o.size,
      onClick: r.jumpPro
    }, null, 8, ["src", "class", "size", "onClick"]), o.winner ? (u(), w(_, {
      key: 0,
      align: "center",
      class: s(e.$style.cut)
    }, {
      default: i(() => [l("div", {
        class: s(["wbox-autocut", [e.$style.h3]])
      }, f(o.info.screen_name), 3), l("div", {
        class: s(["wbox-autocut", [e.$style.h4]])
      }, [l("span", null, "粉丝：" + f(o.info.followers_count), 1)], 2), l("div", {
        class: s(["wbox-autocut", [e.$style.h4]])
      }, f(o.info.description), 3)]),
      _: 1
    }, 8, ["class"])) : (u(), w(_, {
      key: 1,
      align: "center",
      class: s(e.$style.cut)
    }, {
      default: i(() => [l("div", {
        class: s(["wbox-autocut", [e.$style.h3]])
      }, [l("span", {
        onClick: t[0] || (t[0] = (...D) => r.jumpPro && r.jumpPro(...D))
      }, f(o.info.screen_name), 1)], 2), l("div", {
        class: s(["wbox-autocut", [e.$style.h4]])
      }, " 活动发起方 ", 2)]),
      _: 1
    }, 8, ["class"])), o.hasAdd && !r.isCurrent() ? (u(), g("div", {
      key: 2,
      class: s(e.$style.right)
    }, [o.info && (o.info.following || !o.info.followed) ? (u(), w(m, {
      key: 0,
      kind: "primary",
      fonticon: "add",
      class: s([e.$style.btn, e.$style.btn1]),
      onClick: t[1] || (t[1] = D => r.toFocus(o.info.uid || o.info.id))
    }, {
      default: i(() => t[2] || (t[2] = [b(" 关注 ")])),
      _: 1
    }, 8, ["class"])) : (u(), w(m, {
      key: 1,
      kind: "default",
      fonticon: "check",
      class: s([e.$style.btn, e.$style.btn2])
    }, {
      default: i(() => t[3] || (t[3] = [b(" 已关注 ")])),
      _: 1
    }, 8, ["class"]))], 2)) : C("", !0)]),
    _: 1
  }, 8, ["class"])
}
const rl = {
    $style: nl
  },
  dl = E(al, [
    ["render", il],
    ["__cssModules", rl]
  ]),
  cl = "_backbar_11js9_3",
  ul = "_bbb_11js9_8",
  pl = "_bb1_11js9_16",
  _l = "_bb2_11js9_25",
  fl = "_phone_11js9_33",
  ml = "_boxa_11js9_42",
  hl = "_btbar_11js9_49",
  bl = "_btbarin_11js9_55",
  yl = "_btn_11js9_59",
  gl = "_box1_11js9_82",
  vl = "_h2_11js9_85",
  kl = "_h3_11js9_92",
  $l = "_h4_11js9_98",
  wl = "_s1_11js9_104",
  Cl = "_s2_11js9_109",
  Dl = "_s31_11js9_113",
  jl = "_s32_11js9_116",
  Ml = "_step_11js9_120",
  Ll = "_tcon_11js9_124",
  ql = "_tcon2_11js9_130",
  Pl = "_timg_11js9_133",
  El = "_tempty_11js9_141",
  Vl = "_tlist_11js9_150",
  zl = "_tab_11js9_154",
  Ul = "_fixed_11js9_157",
  Il = "_container_11js9_164",
  Sl = "_btn_bottom_11js9_166",
  Bl = "_item_11js9_174",
  xl = "_line_11js9_174",
  Fl = {
    backbar: cl,
    bbb: ul,
    bb1: pl,
    bb2: _l,
    phone: fl,
    boxa: ml,
    btbar: hl,
    btbarin: bl,
    btn: yl,
    box1: gl,
    h2: vl,
    h3: kl,
    h4: $l,
    s1: wl,
    s2: Cl,
    s31: Dl,
    s32: jl,
    step: Ml,
    tcon: Ll,
    tcon2: ql,
    timg: Pl,
    tempty: El,
    tlist: Vl,
    tab: zl,
    fixed: Ul,
    container: Il,
    btn_bottom: Sl,
    item: Bl,
    line: xl
  },
  Tl = {
    name: "EvaluationPreview",
    props: ["data"],
    components: {
      Card: ne,
      Pic: ko,
      User: dl,
      Step: Eo,
      Tab: Oo,
      Tit: Zo,
      BottomBar: so
    },
    data() {
      return {
        check: !0,
        info: {},
        apply_condition_value: se,
        choose_mode_value: Y,
        status_value: oe,
        filter_robot_user_value: le,
        btnStatus: {}
      }
    },
    beforeMount() {
      this.info = this.transPreviewData(this.data), this.btnStatus = {
        type: "a",
        typein: "a2",
        text: "下一步",
        choose_mode: this.info.choose_mode
      }
    },
    emits: ["change"],
    methods: {
      publish() {
        this.$http.post("/ajax/mng/evaluation/create_activity", this.data).then(e => {
          e.data.ok && e.data.data && this.$Bus.$emit("showModalPublish", {
            modify: !1,
            title: "快捷发布",
            data: {
              extentionsParams: {
                aid: e.data.data.aid,
                creator: e.data.data.creator.id,
                shorturl: e.data.data.shorturl,
                biz_ext: JSON.stringify({
                  zhongce: {
                    oid: e.data.data.oid,
                    url: e.data.data.shorturl
                  }
                }),
                callback_url: `http://i.weiping.weibo.com/zhongce/callback?type=bind_apply_mid&aid=${e.data.data.aid}&creator=${e.data.data.creator.id}`
              },
              callback: () => {
                setTimeout(() => {
                  this.$emit("change", "List")
                }, 1e3)
              }
            }
          })
        })
      },
      changePage() {
        this.$emit("change", "Publish")
      },
      transPreviewData(e, t) {
        var M;
        const o = this,
          {
            goods_oid: c,
            title: a,
            desc: r,
            market_price: h,
            cover_pic: _,
            intro_pics: m,
            choose_mode: v,
            apply_condition: D,
            end_time: k,
            goods_count: P
          } = e;
        return {
          goods_count: P,
          apply_condition: D,
          apply_condition_str: o.apply_condition_value[D],
          status: 0,
          status_str: o.status_value[1],
          choose_mode: v,
          choose_mode_str: o.choose_mode_value[v],
          apply_person_count: 0,
          goods: {
            goods_oid: c,
            title: a,
            desc: r,
            market_price: h,
            cover_pic: I(_, "large"),
            intro_pics: m.split(",").map(y => I(y, "large"))
          },
          winners: [],
          candidates: [],
          evaluations: [],
          is_winner: !1,
          is_apply: !1,
          is_owner: !0,
          creator: (M = window.$CONFIG) == null ? void 0 : M.user
        }
      }
    }
  },
  Nl = {
    key: 0
  },
  Rl = {
    key: 1
  },
  Al = ["src"];

function Gl(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-panel"),
    v = d("Pic"),
    D = d("woo-box-item"),
    k = d("woo-divider"),
    P = d("User"),
    M = d("Card"),
    y = d("Step"),
    L = d("Tab"),
    p = d("Tit"),
    V = d("BottomBar"),
    z = d("woo-checkbox"),
    q = d("woo-button");
  return u(), g("div", null, [n(m, {
    border: "bottom",
    class: s(e.$style.backbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      class: s(e.$style.bbb)
    }, {
      default: i(() => [n(_, {
        class: s(e.$style.bb1),
        align: "center",
        onMousedown: r.changePage
      }, {
        default: i(() => [n(h, {
          value: "angleLeft"
        }), t[3] || (t[3] = b(" 返回 "))]),
        _: 1
      }, 8, ["class", "onMousedown"]), l("div", {
        class: s(e.$style.bb2)
      }, " 0元试用预览 ", 2)]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), l("div", {
    class: s(e.$style.boxa)
  }, [l("div", {
    class: s(e.$style.phone)
  }, [a.info ? (u(), g("div", {
    key: 0,
    class: s(e.$style.container)
  }, [n(_, {
    id: "app",
    style: {
      "background-color": "#eee"
    },
    justify: "center",
    direction: "y"
  }, {
    default: i(() => [n(D, {
      style: {
        height: "100%"
      }
    }, {
      default: i(() => [n(M, null, {
        default: i(() => [n(v, {
          info: a.info.goods
        }, null, 8, ["info"]), l("div", {
          class: s(e.$style.box1)
        }, [l("div", {
          class: s(e.$style.h2)
        }, f(a.info.goods.title), 3), l("div", {
          class: s(e.$style.h3)
        }, f(a.info.goods.desc), 3), n(_, {
          align: "center",
          class: s(e.$style.h4)
        }, {
          default: i(() => [n(D, {
            align: "center"
          }, {
            default: i(() => [l("span", {
              class: s(e.$style.s1)
            }, "￥0", 2), a.info.goods.market_price > 0 ? (u(), g("span", {
              key: 0,
              class: s(e.$style.s2)
            }, "¥" + f(a.info.goods.market_price), 3)) : C("", !0)]),
            _: 1
          }), n(_, {
            align: "center"
          }, {
            default: i(() => [t[4] || (t[4] = l("span", null, "试用数量：", -1)), l("span", {
              class: s(e.$style.s31)
            }, f(a.info.goods_count), 3), l("span", {
              class: s(e.$style.s32)
            }, "/", 2), l("span", {
              class: s(e.$style.s31)
            }, f(a.info.apply_person_count ? a.info.apply_person_count : 0), 3), t[5] || (t[5] = l("span", null, "人已报名", -1))]),
            _: 1
          })]),
          _: 1
        }, 8, ["class"])], 2), n(k), n(P, {
          hasAdd: "",
          info: a.info.creator
        }, null, 8, ["info"])]),
        _: 1
      }), n(M, {
        class: s(e.$style.step)
      }, {
        default: i(() => [n(y, {
          choose_mode: a.info.choose_mode,
          status: a.info.status
        }, null, 8, ["choose_mode", "status"])]),
        _: 1
      }, 8, ["class"]), n(M, null, {
        default: i(() => [l("div", {
          class: s(e.$style.tab)
        }, [n(M, {
          class: s({
            [e.$style.fixed]: e.needFix,
            [e.$style.bar]: !1
          })
        }, {
          default: i(() => [n(L, {
            justify: "around",
            num: e.tabNum,
            onChangeTab: e.changeTab
          }, null, 8, ["num", "onChangeTab"])]),
          _: 1
        }, 8, ["class"])], 2), l("div", {
          id: "rule",
          class: s(e.$style.tcon)
        }, [a.info.choose_mode === 2 ? (u(), g("span", Nl, " 1、报名截止后，微博抽奖平台将随机抽取中选用户并公布中选名单，报名用户可在当前页面查看是否中选。 ")) : (u(), g("span", Rl, " 1、报名截止后5天内，活动发起方将会自主选取并公布中选名单，报名用户可在当前页面查看是否中选。 ")), t[6] || (t[6] = l("br", null, null, -1)), t[7] || (t[7] = b("2、中选用户需要在公示中选名单后5天内体提交收货地址，逾期视为放弃试用资格。 ")), t[8] || (t[8] = l("br", null, null, -1)), t[9] || (t[9] = b("3、中选用户需在发货后15日内提交试用报告，逾期未提交将按照")), l("span", {
          class: "woo-link",
          onClick: t[0] || (t[0] = $ => e.jump("https://card.weibo.com/article/m/show/id/2309404539604014334115?_wb_client_=1"))
        }, "《众测活动管理办法》"), t[10] || (t[10] = b("进行处罚。 ")), t[11] || (t[11] = l("br", null, null, -1)), t[12] || (t[12] = b("4、试用报告务必合法、客观、原创，不得恶意诋毁，诽谤。报告质量将影响后续试用申请。 ")), t[13] || (t[13] = l("br", null, null, -1)), t[14] || (t[14] = b("5、更多活动规则，请阅读")), l("span", {
          class: "woo-link",
          onClick: t[1] || (t[1] = $ => e.jump("pages/agreement/index?type=2", 1))
        }, "《微博众测用户服务协议》"), t[15] || (t[15] = b("，参与报名即视为对前述协议的全部同意。 "))], 2), n(p, {
          id: "desc",
          type: "M",
          title: "产品介绍"
        }), l("div", {
          class: s(e.$style.tcon)
        }, [l("div", {
          class: s(e.$style.timg)
        }, [(u(!0), g(F, null, T(a.info.goods.intro_pics, ($, re) => (u(), g("img", {
          key: re,
          src: $
        }, null, 8, Al))), 128))], 2)], 2), n(p, {
          id: "winners",
          type: "M",
          title: "中选名单"
        }), l("div", {
          class: s(e.$style.tcon)
        }, [l("div", {
          class: s(e.$style.tempty)
        }, " 名单暂未公布 ", 2)], 2), n(p, {
          id: "report",
          type: "M",
          hasLine: e.list && e.list.length,
          title: "测评报告"
        }, null, 8, ["hasLine"]), l("div", {
          class: s(e.$style.tcon2)
        }, [l("div", {
          class: s(e.$style.tempty)
        }, " 还没有测评报告 ", 2)], 2)]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }), n(V, {
    params: a.btnStatus,
    class: s(e.$style.btn_bottom)
  }, null, 8, ["params", "class"])], 2)) : C("", !0)], 2)], 2), n(m, {
    border: "top",
    class: s(e.$style.btbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      justify: "end",
      class: s(e.$style.btbarin)
    }, {
      default: i(() => [n(z, {
        modelValue: a.check,
        "onUpdate:modelValue": t[2] || (t[2] = $ => a.check = $)
      }, {
        default: i(() => t[16] || (t[16] = [b(" 已阅读并同意"), l("a", {
          target: "_blank",
          href: "https://weibo.com/7483040087/Jn2pV4Yhe?from=page_1006067483040087_profile&wvr=6&mod=weibotime"
        }, "《微博众测商家服务协议》", -1), l("a", {
          target: "_blank",
          href: "https://weibo.com/ttarticle/p/show?id=2309404376967867721529"
        }, "《有奖活动管理规范》", -1)])),
        _: 1
      }, 8, ["modelValue"]), n(q, {
        sort: "flat",
        kind: "primary",
        round: !1,
        class: s(e.$style.btn),
        disabled: !a.check,
        onClick: r.publish
      }, {
        default: i(() => t[17] || (t[17] = [b(" 下一步·发微博 ")])),
        _: 1
      }, 8, ["class", "disabled", "onClick"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])])
}
const Ol = {
    $style: Fl
  },
  Hl = E(Tl, [
    ["render", Gl],
    ["__cssModules", Ol]
  ]),
  Wl = {
    props: ["data"],
    data() {
      return {
        apply_condition_value: se,
        choose_mode_value: Y,
        status_value: oe,
        filter_robot_user_value: le
      }
    }
  },
  Yl = {
    class: "layer2"
  },
  Jl = {
    class: "lyt1"
  },
  Kl = {
    key: 0
  },
  Ql = {
    class: "lyt2"
  };

function Xl(e, t, o, c, a, r) {
  return u(), g("div", Yl, [l("div", Jl, [l("div", null, "产品名称：" + f(o.data.title), 1), l("div", null, "试用数量：" + f(o.data.goods_count), 1), t[0] || (t[0] = l("div", null, "报名条件：转发", -1)), l("div", null, "报名截止日期：" + f(o.data.end_time), 1), l("div", null, "中选方式：" + f(a.choose_mode_value[o.data.choose_mode]), 1), o.data.choose_mode === 2 ? (u(), g("div", Kl, " 智能过滤：" + f(a.filter_robot_user_value[o.data.filter_robot_user]), 1)) : C("", !0)]), l("div", Ql, f(o.data.choose_mode === 1 ? "中选用户由您自主选取完成后，系统会自动发布公示微博，并私信通知用户中选。" : "抽奖平台随机选取完成后，会自动发布公示微博，并私信通知用户中选。"), 1)])
}
const Zl = E(Wl, [
    ["render", Xl],
    ["__scopeId", "data-v-a9631ae3"]
  ]),
  en = {
    provide() {
      return {
        wform: this
      }
    },
    data() {
      return {
        items: []
      }
    },
    emits: ["updateDisabled"],
    methods: {
      updateDisabled() {
        const e = this,
          t = e.items.some(o => o.check(!0));
        console.log(1), e.$emit("updateDisabled", t)
      },
      validate(e, t = !1) {
        const o = this;
        let c;
        const a = o.items.every(r => {
          const h = r.check(t);
          return h || (c = r), h
        });
        e(a, c)
      },
      register(e) {
        this.items.push(e)
      }
    }
  };

function tn(e, t, o, c, a, r) {
  return u(), g("div", null, [W(e.$slots, "default")])
}
const ae = E(en, [
    ["render", tn]
  ]),
  sn = {
    inject: ["wform"],
    provide() {
      return {
        witem: this
      }
    },
    watch: {
      "itemdata.value": function(e) {
        const t = this;
        t.itemdata && typeof t.itemdata.validate == "function" && t.check()
      },
      "itemdata.check": function(e) {
        this.check()
      }
    },
    props: {
      type: {
        type: String,
        default: null
      },
      itemdata: {
        type: Object,
        default: () => ({
          value: "",
          required: !1,
          validate: () => ""
        })
      }
    },
    data() {
      return {
        error: ""
      }
    },
    emits: ["update:itemdata", "focus"],
    methods: {
      check(e = !1) {
        const t = this;
        if (t.itemdata && typeof t.itemdata.validate == "function") {
          const o = t.itemdata.validate(t.itemdata.value, t.itemdata, e);
          if (e) return o;
          const c = t.itemdata;
          return c.error = o, t.$emit("update:itemdata", c), t.wform.updateDisabled(), o ? (t.error = o, !1) : (t.error = "", !0)
        }
      },
      focus() {
        this.$emit("focus")
      }
    },
    beforeMount() {
      const e = this;
      e.wform && typeof e.wform.register == "function" && e.wform.register(e)
    }
  };

function on(e, t, o, c, a, r) {
  return u(), g("div", null, [W(e.$slots, "default", {
    itemdata: o.itemdata
  })])
}
const ie = E(sn, [
    ["render", on]
  ]),
  ln = "_p1_kprzk_3",
  nn = "_fbox_kprzk_7",
  an = "_fdl_kprzk_13",
  rn = "_fdllt_kprzk_16",
  dn = "_fdlrt_kprzk_19",
  cn = "_fdlwrap_kprzk_23",
  un = "_fdt_kprzk_26",
  pn = "_fdd_kprzk_33",
  _n = "_ipt1_kprzk_37",
  fn = "_ipt2_kprzk_40",
  mn = "_fddp1_kprzk_44",
  hn = "_fddp2_kprzk_52",
  bn = "_ipt3_kprzk_59",
  yn = "_picbox_kprzk_65",
  gn = "_picboxout_kprzk_70",
  vn = "_picboxmar_kprzk_73",
  kn = "_picbox1_kprzk_79",
  $n = "_picbox2_kprzk_86",
  wn = "_layer1_kprzk_93",
  Cn = "_layer2_kprzk_96",
  Dn = "_select_kprzk_102",
  jn = "_mtselect_kprzk_107",
  Mn = {
    p1: ln,
    fbox: nn,
    fdl: an,
    fdllt: rn,
    fdlrt: dn,
    fdlwrap: cn,
    fdt: un,
    fdd: pn,
    ipt1: _n,
    ipt2: fn,
    fddp1: mn,
    fddp2: hn,
    ipt3: bn,
    picbox: yn,
    picboxout: gn,
    picboxmar: vn,
    picbox1: kn,
    picbox2: $n,
    layer1: wn,
    layer2: Cn,
    select: Dn,
    mtselect: jn
  },
  Ln = {
    components: {
      FileUpload: Z,
      Picture: X,
      Multiselect: H
    },
    data() {
      return {
        modalShow: !1,
        title: "",
        multiArray: [
          [],
          []
        ],
        multiIndex: [0, 0],
        multiData: null,
        pid: "",
        src: "",
        formDisabled: !0,
        goods: {
          value: null,
          options: []
        },
        parent_ids: {
          value: null,
          options: []
        }
      }
    },
    mounted() {
      this.get()
    },
    emits: ["change"],
    methods: {
      show() {
        this.title = "", this.goods.value = null, this.parent_ids.value = null, this.pid = "", this.src = "", this.modalShow = !0
      },
      close() {
        this.modalShow = !1
      },
      ok() {
        this.$http.post("/ajax/mng/evaluation/add_goods", {
          name: this.title,
          pid: this.pid,
          category_id: this.parent_ids.value.value
        }).then(e => {
          e.data.ok && e.data.data && (this.$emit("change", e.data.data), this.close())
        })
      },
      get() {
        this.$http.get("/ajax/mng/evaluation/goods_category").then(e => {
          e.data.code === "1000" && e.data && (this.multiData = e.data.data, this.multiArray = this.getMultiArray([0, 0]), this.goods.options = this.multiArray[0], this.multiIndex = [0, 0], console.log(this.multiArray))
        })
      },
      check() {
        this.formDisabled = this.title === "" || this.pid === "" || this.parent_ids.value.value === ""
      },
      replace() {
        this.$refs.ccccc.showFiles()
      },
      changeImage(e) {
        return B(this, null, function*() {
          this.pid = yield ee(e.target.files[0]), this.src = I(this.pid), this.check()
        })
      },
      optionLabel({
        label: e
      }) {
        return e || null
      },
      getMultiArray(e) {
        const t = this,
          o = t.multiData[e[0]],
          c = o.children,
          a = t.multiData.map((r, h) => ({
            label: r.name,
            value: h
          }));
        return c ? [a, c.map(r => ({
          label: r.name,
          value: r.id
        }))] : [a, [o].map(r => ({
          label: r.name,
          value: r.id
        }))]
      }
    },
    watch: {
      "goods.value": function(e) {
        e && (this.multiArray = this.getMultiArray([e.value, 0]), this.parent_ids.options = this.multiArray[1], this.parent_ids.value = this.parent_ids.options[0], this.check())
      },
      title: function(e) {
        this.check()
      }
    }
  },
  qn = {
    class: "wbpro-layer"
  },
  Pn = {
    class: "option__desc"
  },
  En = {
    class: "option__desc"
  };

function Vn(e, t, o, c, a, r) {
  const h = d("woo-box-item"),
    _ = d("woo-fonticon"),
    m = d("woo-box"),
    v = d("woo-panel"),
    D = d("woo-input"),
    k = d("Multiselect"),
    P = d("FileUpload"),
    M = d("Picture"),
    y = d("woo-button"),
    L = d("woo-modal");
  return u(), g("div", null, [a.modalShow ? (u(), w(L, {
    key: 0,
    show: a.modalShow,
    animation: e.animation,
    "lock-screen": "",
    onClick: t[5] || (t[5] = j(() => {}, ["stop"]))
  }, {
    default: i(() => [l("div", qn, [n(v, {
      border: "bottom"
    }, {
      default: i(() => [n(m, {
        class: "wbpro-layer-tit"
      }, {
        default: i(() => [n(h, {
          align: "center",
          class: "wbpro-layer-tit-text"
        }, {
          default: i(() => t[6] || (t[6] = [b(" 创建产品 ")])),
          _: 1
        }), n(m, {
          align: "center",
          justify: "center",
          class: "wbpro-layer-tit-opt"
        }, {
          default: i(() => [n(_, {
            value: "cross",
            onClick: r.close
          }, null, 8, ["onClick"])]),
          _: 1
        })]),
        _: 1
      })]),
      _: 1
    }), l("div", {
      class: s(e.$style.layer1),
      onTouchmove: t[4] || (t[4] = j(() => {}, ["stop"]))
    }, [l("div", {
      class: s(e.$style.fdl)
    }, [l("div", {
      class: s(e.$style.fdt)
    }, t[7] || (t[7] = [l("span", null, "*", -1), b("产品名称 ")]), 2), l("div", {
      class: s(e.$style.fdd)
    }, [n(D, {
      modelValue: a.title,
      "onUpdate:modelValue": t[0] || (t[0] = p => a.title = p),
      placeholder: "产品名称建议20字以内",
      class: s(e.$style.ipt1),
      maxlength: "20"
    }, null, 8, ["modelValue", "class"])], 2)], 2), l("div", {
      class: s(e.$style.fdl)
    }, [l("div", {
      class: s(e.$style.fdt)
    }, t[8] || (t[8] = [l("span", null, "*", -1), b("产品类别 ")]), 2), l("div", {
      class: s(e.$style.fdd)
    }, [n(m, {
      align: "center"
    }, {
      default: i(() => [n(m, {
        align: "center",
        class: s(e.$style.select),
        style: {
          width: "210px"
        }
      }, {
        default: i(() => [n(k, {
          modelValue: a.goods.value,
          "onUpdate:modelValue": t[1] || (t[1] = p => a.goods.value = p),
          placeholder: "请选择产品类别",
          options: a.goods.options,
          "show-labels": !1,
          searchable: !1,
          disabled: e.disabled,
          "custom-label": r.optionLabel
        }, {
          singleLabel: i(p => [l("span", Pn, [l("span", {
            class: s(["option__title", e.$style.mtselect])
          }, f(p && p.option && p.option.label || "请选择产品类别"), 3)])]),
          _: 1
        }, 8, ["modelValue", "options", "disabled", "custom-label"])]),
        _: 1
      }, 8, ["class"]), n(m, {
        align: "center",
        class: s(e.$style.select),
        style: {
          width: "130px"
        }
      }, {
        default: i(() => [n(k, {
          modelValue: a.parent_ids.value,
          "onUpdate:modelValue": t[2] || (t[2] = p => a.parent_ids.value = p),
          placeholder: "-",
          options: a.parent_ids.options,
          "show-labels": !1,
          searchable: !1,
          disabled: e.disabled,
          "custom-label": r.optionLabel
        }, {
          singleLabel: i(p => [l("span", En, [l("span", {
            class: s(["option__title", e.$style.mtselect])
          }, f(p && p.option && p.option.label), 3)])]),
          _: 1
        }, 8, ["modelValue", "options", "disabled", "custom-label"])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    })], 2)], 2), l("div", {
      class: s(e.$style.fdl)
    }, [l("div", {
      class: s(e.$style.fdt)
    }, t[9] || (t[9] = [l("span", null, "*", -1), b("产品图片 ")]), 2), l("div", {
      class: s(e.$style.fdd)
    }, [n(m, {
      old: "",
      class: s(e.$style.picboxout)
    }, {
      default: i(() => [G(n(h, {
        class: s(e.$style.picboxmar)
      }, {
        default: i(() => [l("div", {
          class: s([e.$style.picbox, e.$style.picbox2])
        }, [n(P, {
          ref: "ccccc",
          label: "上传图片",
          onChange: t[3] || (t[3] = p => r.changeImage(p, e.pageCover))
        }, null, 512)], 2)]),
        _: 1
      }, 8, ["class"]), [
        [O, !a.src]
      ]), a.src ? (u(), w(h, {
        key: 0,
        class: s(e.$style.picboxmar)
      }, {
        default: i(() => [l("div", {
          class: s([e.$style.picbox, e.$style.picbox2])
        }, [n(M, {
          optEdit: "",
          image: a.src,
          optAspectratio: "16:9",
          onEdit: r.replace
        }, null, 8, ["image", "onEdit"])], 2)]),
        _: 1
      }, 8, ["class"])) : C("", !0)]),
      _: 1
    }, 8, ["class"])], 2)], 2)], 34), n(m, {
      justify: "center",
      class: "wbpro-layer-btn"
    }, {
      default: i(() => [n(y, {
        sort: "flat",
        kind: "default",
        class: "wbpro-layer-btn-item",
        onClick: r.close
      }, {
        default: i(() => t[10] || (t[10] = [b(" 取消 ")])),
        _: 1
      }, 8, ["onClick"]), n(y, {
        sort: "flat",
        kind: "primary",
        class: "wbpro-layer-btn-item",
        disabled: a.formDisabled,
        onClick: r.ok
      }, {
        default: i(() => t[11] || (t[11] = [b(" 完成 ")])),
        _: 1
      }, 8, ["disabled", "onClick"])]),
      _: 1
    })])]),
    _: 1
  }, 8, ["show", "animation"])) : C("", !0)])
}
const zn = {
    $style: Mn
  },
  Un = E(Ln, [
    ["render", Vn],
    ["__cssModules", zn]
  ]),
  In = "_picbed_1ne20_2",
  Sn = "_pic_1ne20_2",
  Bn = "_focuspic_1ne20_15",
  xn = "_loading_1ne20_22",
  Fn = "_close_1ne20_31",
  Tn = "_focus_1ne20_15",
  Nn = "_icon_1ne20_55",
  Rn = "_picbox_1ne20_58",
  An = "_picbox2_1ne20_65",
  Gn = {
    picbed: In,
    pic: Sn,
    focuspic: Bn,
    loading: xn,
    close: Fn,
    focus: Tn,
    icon: Nn,
    picbox: Rn,
    picbox2: An
  },
  On = {
    props: {
      data: {
        type: String,
        default: ""
      },
      onlyOne: {
        type: Boolean,
        default: !1
      },
      statusChange: {
        type: Boolean,
        default: !1
      },
      canFoucs: {
        type: Boolean,
        default: !1
      },
      file: {
        type: Object
      },
      source: {
        type: Number,
        default: 1
      },
      show: {
        type: Boolean,
        default: !1
      },
      maxLength: {
        type: Number,
        default: 18
      },
      size: {
        type: Object,
        default: () => ({
          width: 160,
          height: 90
        })
      },
      needCropper: {
        type: Boolean,
        default: !1
      }
    },
    data() {
      return {
        upload_list: [],
        uploading: !1,
        dragList: [],
        dragId: null,
        showCropper: !1,
        editIndex: 0
      }
    },
    components: {
      FileUpload: Z,
      ImageEdit: me,
      Picture: X,
      CropperPop: fe
    },
    computed: {
      cardSize() {
        return `width: ${this.size.width}px;height: ${this.size.height}px`
      }
    },
    emits: ["change"],
    watch: {
      file(e) {
        Array.from(e).forEach(t => {
          this.upload_list.length < this.maxLength && !(this.onlyOne && this.upload_list.length === 1) && (this.upload_list.push({
            url: "",
            file: t,
            status: 1
          }), this.$emit("change", "add", this.upload_list))
        }), this.$emit("change", "start", this.upload_list), this.uploadFiles()
      },
      data() {
        this.data ? (this.upload_list = this.pid2imgs(), this.$emit("change", "end", this.upload_list)) : (this.uploading = !1, this.upload_list.splice(0, this.upload_list.length), this.$emit("change", "remove", this.upload_list))
      },
      statusChange(e) {
        this.uploading = !1, this.upload_list.splice(0, this.upload_list.length), this.$emit("change", "remove", this.upload_list)
      }
    },
    methods: {
      onBodyDragOver(e) {
        e.preventDefault()
      },
      onDragStart(e, t) {
        const o = this;
        o.uploading || (o.dragId = t, o.dragList = Array.from(o.upload_list), document.body.addEventListener("dragover", o.onBodyDragOver))
      },
      onDragEnter(e, t) {
        const o = this;
        if (t === o.dragId || o.dragId === null) return;
        const c = Array.from(o.dragList);
        Array.prototype.splice.apply(c, [t, 0, ...c.splice(o.dragId, 1)]), o.dragId = t, o.dragList = c, o.$set(o, "upload_list", c), this.$emit("change", "change", this.upload_list), e.preventDefault()
      },
      onDragEnd(e) {
        const t = this;
        document.body.removeEventListener("dragover", t.onBodyDragOver)
      },
      getCropViewStyle(e) {
        const t = 90 / e.crop.cropWidth;
        return `background: url(${e.url}) no-repeat -${e.crop.left*t}px -${e.crop.top*t}px / ${e.crop.width*t}px ${e.crop.height*t}px;`
      },
      onItemChange(e, t) {
        const o = this;
        o.$set(o.upload_list, e, t), this.$emit("change", "start", this.upload_list), o.uploadFiles()
      },
      editItem(e) {
        const t = this;
        t.$refs.imgEdit.show(e, t.upload_list[e])
      },
      delItem(e) {
        this.upload_list.splice(e, 1), this.$emit("change", "remove", this.upload_list)
      },
      changeItem(e) {},
      uploadFiles() {
        return B(this, null, function*() {
          const e = this;
          if (e.uploading) return;
          e.uploading = !0;
          const t = e.upload_list.filter(o => o.status === 1);
          if (t.length > 0) {
            const [o] = t.splice(0, 1);
            return o.status = 2, this.$emit("change", "upload-start", this.upload_list), yield ee(o.file, {}, 1, this.source).then(c => {
              o.status = 3, o.url = I(c, "bmiddle"), o.pid = c, o.type = o.file.type, delete o.file, this.$emit("change", "upload-end", this.upload_list)
            }, c => {
              console.log(c), delete o.file, this.uploading = !1, this.upload_list.splice(0, this.upload_list.length), this.$emit("change", "remove", this.upload_list), this.$_w_toast({
                type: "warn",
                message: c.message
              }), e.uploading = !1
            }), e.uploading = !1, e.uploadFiles()
          }
          this.$emit("change", "end", this.upload_list), e.uploading = !1
        })
      },
      change(e, t) {
        console.log(111, this.upload_list.length < this.maxLength, this.maxLength, t);
        const o = this;
        if (this.needCropper) {
          this.showCropper = !0, t === "edit" && this.$refs.cropper.setSrc(URL.createObjectURL(e.target.files[0]), (c, a, r) => {
            this.showCropper = !1, c !== "cancel" && (this.delItem(0), o.upload_list.push({
              pid: r,
              url: a,
              file: e.target.files[0],
              status: 3
            }), this.$emit("change", "end", this.upload_list), e.target.value = "", console.log(c, a))
          }), Array.from(e.target.files).forEach(c => {
            o.upload_list.length < this.maxLength && this.$refs.cropper.setSrc(URL.createObjectURL(c), (a, r, h) => {
              this.showCropper = !1, a !== "cancel" && (o.upload_list.push({
                pid: h,
                url: r,
                file: c,
                status: 3
              }), this.$emit("change", "end", this.upload_list), e.target.value = "", console.log(a, r))
            })
          });
          return
        }
        t === "edit" && this.delItem(this.editIndex), Array.from(e.target.files).forEach(c => {
          o.upload_list.length < this.maxLength && (o.upload_list.push({
            url: "",
            file: c,
            status: 1
          }), this.$emit("change", "add", this.upload_list))
        }), this.$emit("change", "start", this.upload_list), o.uploadFiles(), e.target.value = ""
      },
      showFiles(e, t) {
        console.log(t), t === "edit" ? (this.editIndex = e, this.$refs.file_upload_edit.showFiles()) : this.$refs.file_upload.showFiles()
      },
      pid2imgs() {
        return this.data && this.data.split(",").map(e => ({
          pid: e,
          status: 3,
          url: I(e, "orj360")
        }))
      }
    },
    mounted() {
      this.data && (this.upload_list = this.pid2imgs())
    }
  };

function Hn(e, t, o, c, a, r) {
  const h = d("Picture"),
    _ = d("woo-spinner"),
    m = d("woo-box"),
    v = d("woo-fonticon"),
    D = d("woo-box-item"),
    k = d("FileUpload"),
    P = d("ImageEdit"),
    M = d("CropperPop"),
    y = d("woo-modal");
  return G((u(), w(m, {
    old: "",
    onDragover: t[2] || (t[2] = j(() => {}, ["stop", "prevent"])),
    onDrop: t[3] || (t[3] = j(() => {}, ["stop", "prevent"]))
  }, {
    default: i(() => [(u(!0), g(F, null, T(a.upload_list, (L, p) => (u(), w(D, {
      key: p,
      draggable: "true",
      onDragstart: V => r.onDragStart(V, p),
      onDragover: j(V => r.onDragEnter(V, p), ["prevent"]),
      onDragend: j(r.onDragEnd, ["prevent"])
    }, {
      default: i(() => [l("div", {
        class: s([e.$style.picbox]),
        style: A(r.cardSize)
      }, [!L.crop && L.url ? (u(), w(h, {
        key: 0,
        optEdit: "",
        optClose: "",
        image: L.url,
        optAspectratio: "16:9",
        onClose: V => r.delItem(p),
        onEdit: V => r.showFiles(p, "edit")
      }, null, 8, ["image", "onClose", "onEdit"])) : C("", !0), L.crop && L.url && a.upload_list.length ? (u(), g("div", {
        key: 1,
        class: s(e.$style.focuspic),
        style: A(r.getCropViewStyle(L))
      }, null, 6)) : C("", !0), L.status < 3 ? (u(), w(m, {
        key: 2,
        align: "center",
        justify: "center",
        class: s(e.$style.loading)
      }, {
        default: i(() => [n(_, {
          size: "32px",
          color: "#fff"
        })]),
        _: 1
      }, 8, ["class"])) : C("", !0), n(v, {
        title: "删除",
        value: "close",
        kind: "dark",
        class: s(e.$style.close),
        onClick: V => r.delItem(p)
      }, null, 8, ["class", "onClick"]), L.status > 2 && o.canFoucs ? (u(), w(m, {
        key: 3,
        align: "center",
        justify: "center",
        class: s(e.$style.focus),
        onClick: V => r.editItem(p)
      }, {
        default: i(() => [n(v, {
          value: "focus",
          class: s(e.$style.icon)
        }, null, 8, ["class"]), t[4] || (t[4] = b(" 焦点 "))]),
        _: 2
      }, 1032, ["class", "onClick"])) : C("", !0)], 6)]),
      _: 2
    }, 1032, ["onDragstart", "onDragover", "onDragend"]))), 128)), G(n(D, null, {
      default: i(() => [l("div", {
        class: s([e.$style.picbox]),
        style: A(r.cardSize),
        title: "添加"
      }, [n(k, {
        ref: "file_upload_edit",
        label: "上传图片",
        onChange: t[0] || (t[0] = L => r.change(L, "edit"))
      }, null, 512), n(k, {
        ref: "file_upload",
        label: "上传图片",
        onChange: r.change
      }, null, 8, ["onChange"])], 6)]),
      _: 1
    }, 512), [
      [O, a.upload_list.length < o.maxLength && (a.upload_list.length != 0 || o.show)]
    ]), n(P, {
      ref: "imgEdit",
      onChange: r.onItemChange
    }, null, 8, ["onChange"]), n(y, {
      show: a.showCropper,
      animation: "slide-bottom",
      "lock-screen": "",
      onClick: t[1] || (t[1] = j(() => {}, ["stop"]))
    }, {
      default: i(() => [n(M, {
        ref: "cropper",
        ratio: [16, 9],
        title: "裁切图片"
      }, null, 512)]),
      _: 1
    }, 8, ["show"])]),
    _: 1
  }, 512)), [
    [O, a.upload_list.length > 0 || o.show]
  ])
}
const Wn = {
    $style: Gn
  },
  Yn = E(On, [
    ["render", Hn],
    ["__cssModules", Wn]
  ]),
  Q = function(e, t) {
    const o = {
      "M+": e.getMonth() + 1,
      "d+": e.getDate(),
      "h+": e.getHours(),
      "m+": e.getMinutes(),
      "s+": e.getSeconds(),
      "q+": Math.floor((e.getMonth() + 3) / 3),
      S: e.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, `${e.getFullYear()}`.substr(4 - RegExp.$1.length)));
    for (const c in o) new RegExp(`(${c})`).test(t) && (t = t.replace(RegExp.$1, RegExp.$1.length === 1 ? o[c] : `00${o[c]}`.substr(`${o[c]}`.length)));
    return t
  },
  Jn = "_layer3_j2pz4_3",
  Kn = "_tip_j2pz4_9",
  Qn = "_tip1_j2pz4_14",
  Xn = "_tip2_j2pz4_17",
  Zn = "_tip3_j2pz4_20",
  ea = "_scroll_j2pz4_23",
  ta = "_item_j2pz4_29",
  sa = "_h3_j2pz4_40",
  oa = "_h4_j2pz4_41",
  la = "_pic_j2pz4_44",
  na = "_cut_j2pz4_50",
  aa = {
    layer3: Jn,
    tip: Kn,
    tip1: Qn,
    tip2: Xn,
    tip3: Zn,
    scroll: ea,
    item: ta,
    h3: sa,
    h4: oa,
    pic: la,
    cut: na
  },
  ia = {
    mixins: [N],
    data() {
      return {
        query: {
          keyword: ""
        },
        showSearch: !1,
        transId: "/ajax/mng/evaluation/search_goods"
      }
    },
    components: {
      Scroll: x
    },
    watch: {
      "query.keyword": function(e) {
        this.debounce(this.onSearch, 300)()
      }
    },
    emits: ["change", "create"],
    methods: {
      debounce(e, t) {
        return () => {
          this.timeout !== null && clearTimeout(this.timeout), this.timeout = setTimeout(e, t)
        }
      },
      show() {
        this.showSearch = !0
      },
      close() {
        this.showSearch = !1
      },
      onSearch() {
        this.loadDataByPage(0)
      },
      createGoods() {
        this.$emit("create")
      },
      changeItem(e) {
        this.$emit("change", e), this.close()
      }
    }
  };

function ra(e, t, o, c, a, r) {
  const h = d("woo-input"),
    _ = d("woo-box"),
    m = d("woo-box-item"),
    v = d("woo-picture"),
    D = d("woo-pop-item"),
    k = d("Scroll"),
    P = d("woo-tip"),
    M = d("woo-pop");
  return u(), w(M, {
    show: a.showSearch,
    onClick: t[6] || (t[6] = j(() => {}, ["stop"]))
  }, {
    default: i(() => [n(_, {
      direction: "y",
      class: s(e.$style.layer3)
    }, {
      default: i(() => [n(h, {
        modelValue: a.query.keyword,
        "onUpdate:modelValue": t[0] || (t[0] = y => a.query.keyword = y),
        placeholder: "搜索你想要关联的产品",
        class: s(e.$style.ipt1),
        clearable: "",
        onClear: t[1] || (t[1] = y => a.query.keyword = "")
      }, null, 8, ["modelValue", "class"]), a.query.keyword && e.list.length ? (u(), g("div", {
        key: 0,
        class: s([e.$style.tip, e.$style.tip2])
      }, [t[7] || (t[7] = b(" 如果没有你需要的产品，可以直接")), l("a", {
        onClick: t[2] || (t[2] = j((...y) => r.createGoods && r.createGoods(...y), ["prevent", "stop"]))
      }, "创建")], 2)) : C("", !0), a.query.keyword ? e.list.length ? (u(), w(m, {
        key: 2,
        class: s(e.$style.cut)
      }, {
        default: i(() => [l("div", {
          class: s(e.$style.scroll)
        }, [n(k, {
          isRetry: e.isRetry,
          "onUpdate:isRetry": t[4] || (t[4] = y => e.isRetry = y),
          keyField: "goods_oid",
          class: s(e.$style.mar1),
          data: e.list,
          isLoading: e.isLoading,
          isNoData: e.isNoData,
          onLoadMoreData: e.getMore
        }, {
          content: i(({
            item: y
          }) => [n(D, {
            cur: e.index === 1,
            class: s({
              [e.$style.item]: !0,
              [e.$style.cur]: e.index === 1
            }),
            onClick: L => r.changeItem(y)
          }, {
            default: i(() => [n(v, {
              src: y.cover_pic,
              alt: "",
              class: s(e.$style.pic)
            }, null, 8, ["src", "class"]), n(m, {
              align: "center",
              class: s(e.$style.cut)
            }, {
              default: i(() => [l("div", {
                class: s(["wbpro-textcut", [e.$style.h3]])
              }, f(y.title), 3), l("div", {
                class: s(["wbpro-textcut", [e.$style.h4]])
              }, f(y.desc), 3)]),
              _: 2
            }, 1032, ["class"])]),
            _: 2
          }, 1032, ["cur", "class", "onClick"])]),
          _: 1
        }, 8, ["isRetry", "class", "data", "isLoading", "isNoData", "onLoadMoreData"])], 2)]),
        _: 1
      }, 8, ["class"])) : (u(), w(m, {
        key: 3,
        class: s(e.$style.cut)
      }, {
        default: i(() => [n(P, {
          type: "warn",
          sort: "vertical",
          class: s(e.$style.tip3)
        }, {
          default: i(() => t[9] || (t[9] = [b(" 没有相关产品 ")])),
          _: 1
        }, 8, ["class"]), n(_, {
          align: "center",
          justify: "center",
          class: s([e.$style.tip, e.$style.tip2])
        }, {
          default: i(() => [t[10] || (t[10] = b(" 如果没有你需要的产品，可以直接")), l("a", {
            href: "",
            onClick: t[5] || (t[5] = j((...y) => r.createGoods && r.createGoods(...y), ["prevent", "stop"]))
          }, "创建")]),
          _: 1
        }, 8, ["class"])]),
        _: 1
      }, 8, ["class"])) : (u(), w(m, {
        key: 1,
        class: s(e.$style.cut)
      }, {
        default: i(() => [n(_, {
          align: "center",
          justify: "center",
          class: s([e.$style.tip, e.$style.tip1])
        }, {
          default: i(() => [t[8] || (t[8] = b(" 如果没有你需要的产品，可以直接")), l("a", {
            onClick: t[3] || (t[3] = j((...y) => r.createGoods && r.createGoods(...y), ["prevent", "stop"]))
          }, "创建")]),
          _: 1
        }, 8, ["class"])]),
        _: 1
      }, 8, ["class"]))]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["show"])
}
const da = {
    $style: aa
  },
  ca = E(ia, [
    ["render", ra],
    ["__cssModules", da]
  ]),
  ua = "_backbar_ovoaf_3",
  pa = "_bbb_ovoaf_8",
  _a = "_bb1_ovoaf_16",
  fa = "_bb2_ovoaf_24",
  ma = "_boxa_ovoaf_33",
  ha = "_p1_ovoaf_39",
  ba = "_fbox_ovoaf_43",
  ya = "_fdl_ovoaf_49",
  ga = "_fdllt_ovoaf_52",
  va = "_fdlrt_ovoaf_55",
  ka = "_fdlwrap_ovoaf_59",
  $a = "_fdt_ovoaf_62",
  wa = "_fdd_ovoaf_69",
  Ca = "_sel1_ovoaf_73",
  Da = "_selin_ovoaf_77",
  ja = "_ipt1_ovoaf_80",
  Ma = "_ipt2_ovoaf_83",
  La = "_fddp1_ovoaf_87",
  qa = "_fddp2_ovoaf_95",
  Pa = "_ipt3_ovoaf_102",
  Ea = "_picbox_ovoaf_109",
  Va = "_picboxout_ovoaf_114",
  za = "_picboxmar_ovoaf_117",
  Ua = "_picbox1_ovoaf_123",
  Ia = "_picbox2_ovoaf_130",
  Sa = "_layer1_ovoaf_138",
  Ba = "_layer2_ovoaf_141",
  xa = "_lyt1_ovoaf_155",
  Fa = "_lyt2_ovoaf_158",
  Ta = "_layer3_ovoaf_163",
  Na = "_tip_ovoaf_169",
  Ra = "_tip1_ovoaf_174",
  Aa = "_tip2_ovoaf_177",
  Ga = "_tip3_ovoaf_180",
  Oa = "_scroll_ovoaf_183",
  Ha = "_item_ovoaf_188",
  Wa = "_h3_ovoaf_198",
  Ya = "_h4_ovoaf_199",
  Ja = "_pic_ovoaf_109",
  Ka = "_cut_ovoaf_208",
  Qa = "_btbar_ovoaf_221",
  Xa = "_btbarin_ovoaf_226",
  Za = "_btn_ovoaf_230",
  ei = "_lista_ovoaf_234",
  ti = "_laitemin_ovoaf_237",
  si = "_lah3_ovoaf_243",
  oi = "_lah4_ovoaf_243",
  li = "_lar_ovoaf_253",
  ni = {
    backbar: ua,
    bbb: pa,
    bb1: _a,
    bb2: fa,
    boxa: ma,
    p1: ha,
    fbox: ba,
    fdl: ya,
    fdllt: ga,
    fdlrt: va,
    fdlwrap: ka,
    fdt: $a,
    fdd: wa,
    sel1: Ca,
    selin: Da,
    ipt1: ja,
    ipt2: Ma,
    fddp1: La,
    fddp2: qa,
    ipt3: Pa,
    picbox: Ea,
    picboxout: Va,
    picboxmar: za,
    picbox1: Ua,
    picbox2: Ia,
    layer1: Sa,
    layer2: Ba,
    lyt1: xa,
    lyt2: Fa,
    layer3: Ta,
    tip: Na,
    tip1: Ra,
    tip2: Aa,
    tip3: Ga,
    scroll: Oa,
    item: Ha,
    h3: Wa,
    h4: Ya,
    pic: Ja,
    cut: Ka,
    btbar: Qa,
    btbarin: Xa,
    btn: Za,
    lista: ei,
    laitemin: ti,
    lah3: si,
    lah4: oi,
    lar: li
  },
  ai = function(e) {
    if (!e) return 0;
    const t = e.match(/[^\x00-\xFF]/g);
    return e.length + (t ? t.length : 0)
  },
  ii = function(e) {
    return e === null ? "" : `${e}`.replace(/^\s+|\s+$/g, "")
  },
  ri = /^(\d+|\d+\.\d{1,2})$/,
  di = /^(\d+)$/,
  ci = {
    name: "EvaluationPublish",
    props: ["data"],
    data() {
      return {
        visable: !0,
        publishData: {},
        check: !0,
        choose_mode: 1,
        apply_condition: 1,
        filter_robot_user: 2,
        previewDisabled: !0,
        choose_mode_desc: {
          1: "报名截止后5天内，需由您自主选取试用用户。您可按照众测平台提供的用户申请时间，用户粉丝数，转发微博热度3种排序方式进行选取。",
          2: "报名截止后，将委托抽奖平台立即随机选取试用用户。若您选择普通/深度过滤，系统将尽可能过滤不活跃、刷奖用户。"
        },
        goods_oid: {
          key: "goods_oid",
          value: "",
          required: !0,
          validate: this.checkGoodsOid,
          error: ""
        },
        cover_pic: {
          value: "",
          local: "",
          pid: "",
          state: "",
          required: !0,
          validate: this.checkCoverPic
        },
        title: {
          key: "title",
          value: "",
          required: !0,
          validate: this.checkTitle,
          error: ""
        },
        desc: {
          key: "desc",
          value: "",
          required: !1,
          error: ""
        },
        market_price: {
          key: "market_price",
          value: "",
          required: !1,
          validate: this.checkMarketPrice,
          error: ""
        },
        goods_count: {
          key: "goods_count",
          value: "",
          required: !0,
          validate: this.checkGoodsCount,
          error: ""
        },
        intro_pics: {
          key: "intro_pics",
          value: "",
          required: !0,
          validate: this.checkIntroPics,
          error: ""
        },
        end_time: "",
        product: {}
      }
    },
    components: {
      Search: ca,
      CreateGoods: Un,
      ImageUploader: Yn,
      TimeSelect: he,
      WFormItem: ie,
      WForm: ae
    },
    emits: ["change"],
    methods: {
      preview() {
        const e = this.getData();
        this.$_w_dialog({
          type: "confirm",
          kind: "bar",
          title: "活动详情",
          component: Zl,
          componentProps: {
            data: e
          },
          action: () => {
            this.$emit("change", "Preview", e)
          }
        })
      },
      getData() {
        const e = this;
        return {
          goods_oid: e.goods_oid.value,
          product_pid: e.product.product_pid,
          product_name: e.product.product_name,
          cover_pic: e.cover_pic.value,
          title: e.title.value,
          desc: e.desc.value,
          market_price: e.market_price.value,
          goods_count: e.goods_count.value,
          intro_pics: e.intro_pics.value,
          end_time: e.end_time,
          apply_condition: e.apply_condition,
          choose_mode: e.choose_mode,
          filter_robot_user: e.filter_robot_user
        }
      },
      CustomTimeSelect(e) {
        console.log(e, Q(new Date(e), "yyyy-MM-dd hh:mm")), this.end_time = Q(new Date(e), "yyyy-MM-dd hh:mm")
      },
      checkGoodsOid(e, t, o) {
        return e ? "" : "请选择关联物品"
      },
      introPicsChange(e, t) {
        const o = this;
        e === "end" ? o.intro_pics.value = t.map(c => c.pid).join(",") : e === "remove" ? o.intro_pics.value = t.map(c => c.pid).join(",") : e === "change" ? this.intro_pics.value = t.map(c => c.pid).toString() : e === "start" && (this.intro_pics.value = "loading")
      },
      checkIntroPics(e, t, o) {
        return e ? "" : "详情图片不能为空"
      },
      coverPicChange(e, t) {
        const o = this;
        e === "end" ? o.cover_pic.value = t.map(c => c.pid).join(",") : e === "remove" ? (o.pic_focus_point = [], o.cover_pic.value = t.map(c => c.pid).join(",")) : e === "change" ? this.cover_pic.value = t.map(c => c.pid).toString() : e === "start" && (this.cover_pic.value = "loading")
      },
      updateDisabled(e) {
        this.previewDisabled = e
      },
      checkGoodsCount(e = this.goods_count.value) {
        if (!e || e === 0) return "请填写试用数量";
        if (di.test(e)) {
          e = Number.parseFloat(e), this.goods_count.value = e;
          const t = +this.choose_mode == 2 ? 100 : 2e3;
          return e > t ? `最多${t}份` : ""
        }
        return "无效的试用数量"
      },
      checkCoverPic(e, t, o) {
        return console.log(e, t), e ? "" : "请上传封面图"
      },
      checkMarketPrice(e) {
        return e === "" ? "" : e <= 0 ? "无效的市场价格" : ri.test(e) ? (e = Number.parseFloat(e), this.market_price.value = e, e > 5e4 ? "最高50000元" : "") : "无效的市场价格"
      },
      checkTitle(e, t) {
        const o = ai(ii(e));
        return console.log(e, o, o === 0), t.required && o === 0 ? "请输入产品名称" : o <= 40 ? "" : `超出 ${Math.abs(Math.floor((40-o)/2))} 字`
      },
      showSearch() {
        console.log(1), this.$refs.search && this.$refs.search.show()
      },
      changePage() {
        this.$emit("change", "List")
      },
      createGoods() {
        this.$refs.createGoods && this.$refs.createGoods.show()
      },
      changeGoods(e) {
        this.publishData = e, this.title.value = e.title, this.goods_oid.value = e.goods_oid, this.product.product_name = e.title, this.product.product_pid = e.cover_pic, this.$refs.search.close()
      },
      hide() {
        this.$refs.search && this.$refs.search.close()
      }
    },
    mounted() {
      window.addEventListener("click", this.hide)
    },
    beforeUnmount() {
      window.removeEventListener("click", this.hide)
    },
    watch: {
      choose_mode(e) {
        e === 2 && this.goods_count.value > 100 ? this.$_w_dialog({
          type: "confirm",
          kind: "bar",
          title: "试用数量超过限制",
          btnConfirm: "确认选择",
          component: {
            template: `
            <woo-panel border="none" class="dialog-custom">
    <div style="padding: 10px">
      抽奖平台随机选取”下试用数量最多为100份，已超过限制。选择该方式需要重新填写试用数量。
    </div>
  </woo-panel>
            `
          },
          action: () => {
            this.goods_count.value = ""
          },
          cancel: () => {
            this.choose_mode = 1
          }
        }) : (this.$set(this.goods_count, "check", !0), this.$nextTick(() => {
          this.$set(this.goods_count, "check", !1)
        }))
      }
    }
  };

function ui(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-panel"),
    v = d("woo-box-item"),
    D = d("Search"),
    k = d("WFormItem"),
    P = d("woo-input"),
    M = d("ImageUploader"),
    y = d("TimeSelect"),
    L = d("woo-checkbox"),
    p = d("woo-radio"),
    V = d("WForm"),
    z = d("woo-button"),
    q = d("CreateGoods");
  return u(), g("div", null, [n(m, {
    border: "bottom",
    class: s(e.$style.backbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      class: s(e.$style.bbb)
    }, {
      default: i(() => [n(_, {
        class: s(e.$style.bb1),
        align: "center",
        onMousedown: r.changePage
      }, {
        default: i(() => [n(h, {
          value: "angleLeft"
        }), t[17] || (t[17] = b(" 返回 "))]),
        _: 1
      }, 8, ["class", "onMousedown"]), l("div", {
        class: s(e.$style.bb2)
      }, " 发布0元试用 ", 2)]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), l("div", {
    class: s(e.$style.boxa)
  }, [l("div", {
    class: s(e.$style.p1)
  }, t[18] || (t[18] = [b(" 发布0元试用，用户参与报名后，您可自主选取试用用户或委托抽奖平台随机选取。后续将由您为用户寄出试用产品，用户收货后撰写并提交体验报告。请仔细阅读 "), l("a", {
    target: "_blank",
    href: "https://weibo.com/ttarticle/p/show?id=2309404539625505947724"
  }, "《0元试用发布指南》", -1)]), 2), n(V, {
    id: "info",
    ref: "wform",
    onUpdateDisabled: r.updateDisabled
  }, {
    default: i(() => [l("div", {
      class: s(e.$style.fbox)
    }, [n(k, {
      itemdata: a.goods_oid,
      "onUpdate:itemdata": t[0] || (t[0] = $ => a.goods_oid = $)
    }, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[19] || (t[19] = [l("span", null, "*", -1), b("关联产品 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(_, {
        align: "center",
        class: s(["wbpro-select", [e.$style.sel1]]),
        onClick: j(r.showSearch, ["stop"])
      }, {
        default: i(() => [n(v, {
          align: "center",
          class: s(e.$style.cut)
        }, {
          default: i(() => [l("div", {
            class: s(["wbpro-textcut", [e.$style.selin]])
          }, f(a.publishData.title ? a.publishData.title : "关联产品"), 3)]),
          _: 1
        }, 8, ["class"]), n(_, {
          align: "center",
          justify: "center",
          class: "opt"
        }, {
          default: i(() => [n(h, {
            value: "caretDown"
          })]),
          _: 1
        })]),
        _: 1
      }, 8, ["class", "onClick"]), l("span", {
        class: s(e.$style.fddp1)
      }, f(a.goods_oid.error), 3)], 2), n(D, {
        ref: "search",
        onCreate: r.createGoods,
        onChange: r.changeGoods
      }, null, 8, ["onCreate", "onChange"])], 2)]),
      _: 1
    }, 8, ["itemdata"]), n(_, null, {
      default: i(() => [l("div", {
        class: s(e.$style.fdllt)
      }, [n(k, {
        itemdata: a.title,
        "onUpdate:itemdata": t[2] || (t[2] = $ => a.title = $)
      }, {
        default: i(() => [l("div", {
          class: s(e.$style.fdl)
        }, [l("div", {
          class: s(e.$style.fdt)
        }, t[20] || (t[20] = [l("span", null, "*", -1), b("产品名称 ")]), 2), l("div", {
          class: s(e.$style.fdd)
        }, [n(P, {
          modelValue: a.title.value,
          "onUpdate:modelValue": t[1] || (t[1] = $ => a.title.value = $),
          "count-limit": "",
          maxlength: 20,
          class: s(e.$style.ipt1)
        }, null, 8, ["modelValue", "class"]), l("span", {
          class: s(e.$style.fddp1)
        }, f(a.title.error), 3)], 2)], 2)]),
        _: 1
      }, 8, ["itemdata"]), n(k, {
        itemdata: a.desc,
        "onUpdate:itemdata": t[4] || (t[4] = $ => a.desc = $)
      }, {
        default: i(() => [l("div", {
          class: s(e.$style.fdl)
        }, [l("div", {
          class: s(e.$style.fdt)
        }, " 产品特点（选填） ", 2), l("div", {
          class: s(e.$style.fdd)
        }, [n(P, {
          modelValue: a.desc.value,
          "onUpdate:modelValue": t[3] || (t[3] = $ => a.desc.value = $),
          "count-limit": "",
          maxlength: 20,
          class: s(e.$style.ipt1)
        }, null, 8, ["modelValue", "class"])], 2)], 2)]),
        _: 1
      }, 8, ["itemdata"])], 2), n(k, {
        itemdata: a.cover_pic,
        "onUpdate:itemdata": t[5] || (t[5] = $ => a.cover_pic = $)
      }, {
        default: i(() => [l("div", {
          class: s(e.$style.fdlrt)
        }, [l("div", {
          class: s(e.$style.fdl)
        }, [l("div", {
          class: s(e.$style.fdt)
        }, t[21] || (t[21] = [l("span", null, "*", -1), b("产品图片 ")]), 2), l("div", {
          class: s(e.$style.fdd)
        }, [n(M, {
          show: "",
          maxLength: "1",
          size: {
            width: 240,
            height: 135
          },
          "need-cropper": "",
          onChange: r.coverPicChange
        }, null, 8, ["onChange"])], 2)], 2)], 2)]),
        _: 1
      }, 8, ["itemdata"])]),
      _: 1
    }), n(k, {
      itemdata: a.market_price,
      "onUpdate:itemdata": t[7] || (t[7] = $ => a.market_price = $)
    }, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, " 市场价格 ", 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(P, {
        modelValue: a.market_price.value,
        "onUpdate:modelValue": t[6] || (t[6] = $ => a.market_price.value = $),
        placeholder: "0-50000",
        class: s(e.$style.ipt2)
      }, null, 8, ["modelValue", "class"]), l("span", {
        class: s(e.$style.fddp2)
      }, "元", 2), l("span", {
        class: s(e.$style.fddp1)
      }, f(a.market_price.error), 3)], 2)], 2)]),
      _: 1
    }, 8, ["itemdata"]), n(k, {
      itemdata: a.goods_count,
      "onUpdate:itemdata": t[9] || (t[9] = $ => a.goods_count = $)
    }, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[22] || (t[22] = [l("span", null, "*", -1), b("试用数量 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(P, {
        modelValue: a.goods_count.value,
        "onUpdate:modelValue": t[8] || (t[8] = $ => a.goods_count.value = $),
        placeholder: a.choose_mode === 2 ? "最多100" : "最多2000",
        class: s(e.$style.ipt2)
      }, null, 8, ["modelValue", "placeholder", "class"]), l("span", {
        class: s(e.$style.fddp1)
      }, f(a.goods_count.error), 3)], 2)], 2)]),
      _: 1
    }, 8, ["itemdata"]), n(k, {
      itemdata: a.intro_pics,
      "onUpdate:itemdata": t[10] || (t[10] = $ => a.intro_pics = $)
    }, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[23] || (t[23] = [l("span", null, "*", -1), b("产品图片详情 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(M, {
        show: "",
        maxLength: "5",
        onChange: r.introPicsChange
      }, null, 8, ["onChange"])], 2)], 2)]),
      _: 1
    }, 8, ["itemdata"]), n(k, null, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[24] || (t[24] = [l("span", null, "*", -1), b("报名结束时间 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(y, {
        maxDate: new Date(new Date().getTime() + 1e3 * 60 * 60 * 24 * 7 + 1e3 * 60 * 60),
        date: new Date(new Date().getTime() + 1e3 * 60 * 60),
        onSelect: r.CustomTimeSelect
      }, null, 8, ["maxDate", "date", "onSelect"])], 2)], 2)]),
      _: 1
    }), l("div", {
      class: s(e.$style.fdl)
    }, [l("div", {
      class: s(e.$style.fdt)
    }, t[25] || (t[25] = [l("span", null, "*", -1), b("报名条件 ")]), 2), l("div", {
      class: s(e.$style.fdd)
    }, [n(L, {
      modelValue: a.check,
      "onUpdate:modelValue": t[11] || (t[11] = $ => a.check = $),
      disabled: ""
    }, {
      default: i(() => t[26] || (t[26] = [b(" 转发微博 ")])),
      _: 1
    }, 8, ["modelValue"])], 2)], 2), n(_, {
      class: s(e.$style.fdlwrap)
    }, {
      default: i(() => [l("div", {
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[27] || (t[27] = [l("span", null, "*", -1), b("中选方式 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(p, {
        modelValue: a.choose_mode,
        "onUpdate:modelValue": t[12] || (t[12] = $ => a.choose_mode = $),
        value: "1",
        class: s(e.$style.ipt3),
        checked: a.choose_mode === 1
      }, {
        default: i(() => t[28] || (t[28] = [b(" 自主选取 ")])),
        _: 1
      }, 8, ["modelValue", "class", "checked"]), n(p, {
        modelValue: a.choose_mode,
        "onUpdate:modelValue": t[13] || (t[13] = $ => a.choose_mode = $),
        value: "2",
        class: s(e.$style.ipt3),
        checked: a.choose_mode === 2
      }, {
        default: i(() => t[29] || (t[29] = [b(" 抽奖平台随机选取 ")])),
        _: 1
      }, 8, ["modelValue", "class", "checked"])], 2)], 2), a.choose_mode === 2 ? (u(), g("div", {
        key: 0,
        class: s(e.$style.fdl)
      }, [l("div", {
        class: s(e.$style.fdt)
      }, t[30] || (t[30] = [l("span", null, "*", -1), b("智能过滤机器人用户 ")]), 2), l("div", {
        class: s(e.$style.fdd)
      }, [n(p, {
        modelValue: a.filter_robot_user,
        "onUpdate:modelValue": t[14] || (t[14] = $ => a.filter_robot_user = $),
        value: "2",
        class: s(e.$style.ipt3),
        checked: a.filter_robot_user === 2
      }, {
        default: i(() => t[31] || (t[31] = [b(" 不过滤 ")])),
        _: 1
      }, 8, ["modelValue", "class", "checked"]), n(p, {
        modelValue: a.filter_robot_user,
        "onUpdate:modelValue": t[15] || (t[15] = $ => a.filter_robot_user = $),
        value: "1",
        class: s(e.$style.ipt3),
        checked: a.filter_robot_user === 1
      }, {
        default: i(() => t[32] || (t[32] = [b(" 普通过滤 ")])),
        _: 1
      }, 8, ["modelValue", "class", "checked"]), n(p, {
        modelValue: a.filter_robot_user,
        "onUpdate:modelValue": t[16] || (t[16] = $ => a.filter_robot_user = $),
        value: "0",
        class: s(e.$style.ipt3),
        checked: a.filter_robot_user === 0
      }, {
        default: i(() => t[33] || (t[33] = [b(" 深度过滤 ")])),
        _: 1
      }, 8, ["modelValue", "class", "checked"])], 2)], 2)) : C("", !0)]),
      _: 1
    }, 8, ["class"])], 2), l("div", {
      class: s(e.$style.p1)
    }, f(a.choose_mode_desc[a.choose_mode]), 3)]),
    _: 1
  }, 8, ["onUpdateDisabled"]), n(_, {
    justify: "end",
    class: s(e.$style.fbox)
  }, {
    default: i(() => [n(z, {
      sort: "flat",
      kind: "primary",
      round: !1,
      class: s(e.$style.btn),
      disabled: a.previewDisabled,
      onClick: r.preview
    }, {
      default: i(() => t[34] || (t[34] = [b(" 下一步·预览 ")])),
      _: 1
    }, 8, ["class", "disabled", "onClick"])]),
    _: 1
  }, 8, ["class"]), n(q, {
    ref: "createGoods",
    onChange: r.changeGoods
  }, null, 8, ["onChange"])], 2)])
}
const pi = {
    $style: ni
  },
  _i = E(ci, [
    ["render", ui],
    ["__cssModules", pi]
  ]),
  fi = "_lbrh3_nfcuv_2",
  mi = "_lbmar1_nfcuv_10",
  hi = "_lbmar2_nfcuv_13",
  bi = "_tipbox_nfcuv_16",
  yi = "_fddp1_nfcuv_20",
  gi = "_help_nfcuv_29",
  vi = "_helppop1_nfcuv_32",
  ki = "_citemin2_nfcuv_42",
  $i = "_h3_nfcuv_46",
  wi = "_h4_nfcuv_52",
  Ci = "_dot_nfcuv_57",
  Di = "_ipt4_nfcuv_67",
  ji = "_mtselect_nfcuv_71",
  Mi = "_item3_nfcuv_86",
  Li = "_lbmar3_nfcuv_94",
  qi = {
    lbrh3: fi,
    lbmar1: mi,
    lbmar2: hi,
    tipbox: bi,
    fddp1: yi,
    help: gi,
    helppop1: vi,
    citemin2: ki,
    h3: $i,
    h4: wi,
    dot: Ci,
    ipt4: Di,
    mtselect: ji,
    item3: Mi,
    lbmar3: Li
  },
  Pi = {
    props: ["data", "item"],
    components: {
      WFormItem: ie,
      WForm: ae,
      Multiselect: H
    },
    data() {
      return {
        express_id: {
          key: "express_id",
          value: "",
          required: !0,
          validate: this.checkExpressId,
          error: ""
        },
        companyCode: {
          value: null,
          options: this.data
        },
        editExpress: !1,
        showHelp1: !1,
        defaultCompany: void 0
      }
    },
    computed: {
      saveDisabled() {
        return !(this.express_id.value && this.companyCode.value && this.companyCode.value.label)
      }
    },
    emits: ["update:item"],
    methods: {
      closeDetail() {
        this.showHelp1 = !1, this.show(0)
      },
      showDetail() {
        this.closeDetail(), this.$Bus.$emit("closeExpressPop"), this.$http.post("/ajax/mng/evaluation/express_detail", {
          aid: this.item.aid,
          award_uid: this.item.uid
        }).then(e => {
          if (e.data && e.data.code === "1000") {
            const t = this.item;
            t.detail = e.data.data.express.detail, this.$emit("update:item", t)
          }
          this.showHelp1 = !this.showHelp1
        }), this.show(1)
      },
      show(e = 0) {
        let t = window.event || event;
        t = (t.path || t.composedPath && t.composedPath()).find(a => a.className && a.className.includes("wbpro-scroller-item"));
        const c = t && t.parentNode;
        e ? c && c.setAttribute("more", 1) : c && c.removeAttribute("more")
      },
      close() {
        this.editExpress = !1, this.$refs.express.$el.click(), this.show(0)
      },
      updateExpress() {
        this.$Bus.$emit("closeExpressPop"), this.editExpress = !0
      },
      uploadExpress(e = !0) {
        this.$Bus.$emit("closeExpressPop"), this.editExpress = e, e || (this.express_id.value = this.item && this.item.express_id, this.companyCode.value = this.defaultCompany)
      },
      checkExpressId(e) {
        return e ? "" : "请填写运单编号"
      },
      optionLabel({
        label: e
      }) {
        return e || null
      },
      save() {
        this.express_id.value && this.companyCode.value && this.companyCode.value.label && this.$_w_dialog({
          type: "confirm",
          kind: "bar",
          title: "提示",
          btnCancel: "暂不通知",
          btnConfirm: "立即通知",
          component: {
            template: `<woo-panel border="none" class="dialog-custom">
    <div style="padding: 10px">
      是否将快递信息以私信方式通知给中选用户？
    </div>
  </woo-panel>`
          },
          action: () => {
            this.saveAction(1)
          },
          cancel: () => {
            this.saveAction(0)
          }
        })
      },
      saveAction(e) {
        const t = {
          aid: this.item.aid,
          cp_code: this.companyCode.value.value,
          express_id: this.express_id.value,
          winner_uid: this.item.uid,
          send_msg: e
        };
        this.$http.post("/ajax/mng/evaluation/send", t).then(o => {
          if (o.data && o.data.code === "1000") {
            this.$_w_toast({
              type: "success",
              message: "提交成功"
            });
            const c = this.item;
            c.express_id = t.express_id, this.$emit("update:item", c), this.defaultCompany = this.companyCode.value, this.uploadExpress(!1)
          }
        })
      }
    },
    mounted() {
      this.express_id.value = this.item && this.item.express_id;
      const e = this.item.express_company;
      e && this.companyCode.options.forEach(t => {
        e === t.label && (this.defaultCompany = t, this.companyCode.value = t)
      }), this.$Bus.$on("closeExpressPop", this.close)
    },
    beforeUnmount() {
      this.$Bus.$off("closeExpressPop", this.close)
    },
    watch: {
      data(e) {
        this.companyCode.options = e;
        const t = this.item.express_company;
        t && this.companyCode.options.forEach(o => {
          t === o.label && (this.defaultCompany = o, this.companyCode.value = o)
        })
      }
    }
  },
  Ei = {
    class: "option__desc"
  };

function Vi(e, t, o, c, a, r) {
  const h = d("woo-tip"),
    _ = d("woo-panel"),
    m = d("woo-pop"),
    v = d("woo-box"),
    D = d("Multiselect"),
    k = d("woo-input"),
    P = d("WFormItem"),
    M = d("WForm");
  return u(), w(v, {
    ref: "express",
    align: "center",
    class: s(e.$style.lbrh3)
  }, {
    default: i(() => [t[11] || (t[11] = l("span", null, "物流信息：", -1)), a.editExpress ? (u(), w(v, {
      key: 1,
      class: s(e.$style.lbrh3),
      align: "center"
    }, {
      default: i(() => [n(v, {
        align: "center",
        style: {
          width: "127px"
        },
        class: s(e.$style.lbmar1)
      }, {
        default: i(() => [n(D, {
          modelValue: a.companyCode.value,
          "onUpdate:modelValue": t[3] || (t[3] = y => a.companyCode.value = y),
          placeholder: "请选择物流公司",
          options: a.companyCode.options,
          "show-labels": !1,
          searchable: !1,
          "custom-label": r.optionLabel,
          onOpen: t[4] || (t[4] = y => r.show(1)),
          onClose: t[5] || (t[5] = y => r.show(0))
        }, {
          singleLabel: i(y => [l("span", Ei, [l("span", {
            class: s(["option__title", e.$style.mtselect])
          }, f(y && y.option && y.option.label), 3)])]),
          _: 1
        }, 8, ["modelValue", "options", "custom-label"])]),
        _: 1
      }, 8, ["class"]), n(M, null, {
        default: i(() => [n(P, {
          itemdata: a.express_id
        }, {
          default: i(() => [n(k, {
            modelValue: a.express_id.value,
            "onUpdate:modelValue": t[6] || (t[6] = y => a.express_id.value = y),
            placeholder: "运单号",
            class: s([e.$style.ipt4, e.$style.lbmar2])
          }, null, 8, ["modelValue", "class"])]),
          _: 1
        }, 8, ["itemdata"])]),
        _: 1
      }), l("span", {
        class: s([e.$style.lbmar2, {
          [e.$style.lbmar3]: r.saveDisabled
        }])
      }, [l("a", {
        href: "",
        onClick: t[7] || (t[7] = j((...y) => r.save && r.save(...y), ["stop", "prevent"]))
      }, "保存")], 2), l("span", {
        class: s(e.$style.lbmar2)
      }, [l("a", {
        href: "",
        onClick: t[8] || (t[8] = j(y => r.uploadExpress(!1), ["stop", "prevent"]))
      }, "取消")], 2)]),
      _: 1
    }, 8, ["class"])) : (u(), w(v, {
      key: 0,
      class: s(e.$style.lbrh3),
      align: "center"
    }, {
      default: i(() => [l("span", null, f(o.item.express_id), 1), o.item.express_id ? C("", !0) : (u(), g("span", {
        key: 0,
        class: s(e.$style.lbmar2)
      }, [l("a", {
        onClick: t[0] || (t[0] = j(y => r.uploadExpress(o.item), ["stop", "prevent"]))
      }, "上传单号")], 2)), o.item.express_id ? (u(), g("span", {
        key: 1,
        class: s(e.$style.lbmar2)
      }, [l("a", {
        onClick: t[1] || (t[1] = j((...y) => r.updateExpress && r.updateExpress(...y), ["stop", "prevent"]))
      }, "修改")], 2)) : C("", !0), n(m, {
        show: a.showHelp1,
        direction: "down",
        align: "end",
        gap: "10",
        class: s(e.$style.help),
        onClickOutside: r.closeDetail
      }, {
        ctrl: i(() => [o.item.express_id ? (u(), g("span", {
          key: 0,
          class: s(e.$style.lbmar2),
          onClick: t[2] || (t[2] = (...y) => r.showDetail && r.showDetail(...y))
        }, t[9] || (t[9] = [l("a", null, "跟踪", -1)]), 2)) : C("", !0)]),
        default: i(() => [l("div", {
          class: s(e.$style.helppop1)
        }, [l("div", null, [!o.item.detail || o.item.detail && !o.item.detail.length ? (u(), w(h, {
          key: 0,
          type: "warn",
          sort: "vertical",
          class: s(e.$style.tip3)
        }, {
          default: i(() => t[10] || (t[10] = [b(" 暂无物流信息 ")])),
          _: 1
        }, 8, ["class"])) : (u(), w(_, {
          key: 1,
          border: "left",
          class: s(e.$style.citemin2)
        }, {
          default: i(() => [(u(!0), g(F, null, T(o.item.detail, (y, L) => (u(), g("div", {
            key: L,
            class: s([e.$style.item3, L === 0 && e.$style.active])
          }, [l("div", {
            class: s(e.$style.dot)
          }, null, 2), l("div", {
            class: s(e.$style.h3)
          }, f(y.desc), 3), l("div", {
            class: s(e.$style.h4)
          }, f(y.time), 3)], 2))), 128))]),
          _: 1
        }, 8, ["class"]))])], 2)]),
        _: 1
      }, 8, ["show", "class", "onClickOutside"])]),
      _: 1
    }, 8, ["class"]))]),
    _: 1
  }, 8, ["class"])
}
const zi = {
    $style: qi
  },
  Ui = E(Pi, [
    ["render", Vi],
    ["__cssModules", zi]
  ]),
  Ii = "_backbar_6qlh1_3",
  Si = "_bbb_6qlh1_8",
  Bi = "_bb1_6qlh1_16",
  xi = "_bb2_6qlh1_25",
  Fi = "_boxa_6qlh1_34",
  Ti = "_lbtit_6qlh1_40",
  Ni = "_lbtitem_6qlh1_44",
  Ri = "_help_6qlh1_49",
  Ai = "_helppop1_6qlh1_53",
  Gi = "_listbipt_6qlh1_61",
  Oi = "_listb_6qlh1_61",
  Hi = "_lbitemin_6qlh1_69",
  Wi = "_lbface_6qlh1_73",
  Yi = "_lbh3_6qlh1_76",
  Ji = "_lbh4_6qlh1_85",
  Ki = "_lbh42_6qlh1_96",
  Qi = "_lbempty_6qlh1_99",
  Xi = "_lbopt_6qlh1_103",
  Zi = "_like_6qlh1_112",
  er = "_lbr_6qlh1_115",
  tr = "_lbline_6qlh1_127",
  sr = "_lbrh3_6qlh1_130",
  or = "_lbmar1_6qlh1_138",
  lr = "_lbmar2_6qlh1_141",
  nr = "_ipt4_6qlh1_144",
  ar = "_tipbox_6qlh1_147",
  ir = "_fddp1_6qlh1_151",
  rr = "_file_6qlh1_159",
  dr = "_cut1_6qlh1_168",
  cr = {
    backbar: Ii,
    bbb: Si,
    bb1: Bi,
    bb2: xi,
    boxa: Fi,
    lbtit: Ti,
    lbtitem: Ni,
    help: Ri,
    helppop1: Ai,
    listbipt: Gi,
    listb: Oi,
    lbitemin: Hi,
    lbface: Wi,
    lbh3: Yi,
    lbh4: Ji,
    lbh42: Ki,
    lbempty: Qi,
    lbopt: Xi,
    like: Zi,
    lbr: er,
    lbline: tr,
    lbrh3: sr,
    lbmar1: or,
    lbmar2: lr,
    ipt4: nr,
    tipbox: ar,
    fddp1: ir,
    file: rr,
    cut1: dr
  },
  ur = {
    mixins: [N],
    props: ["data"],
    components: {
      Scroll: x,
      EvFeed: te,
      Express: Ui
    },
    data() {
      return {
        transId: "/ajax/mng/evaluation/winner_list",
        showText: "该活动没有有效用户可以供您选取，活动已结束",
        query: {
          aid: null
        },
        companyCode: [],
        showHelp2: !1
      }
    },
    watch: {
      data(e) {
        this.query.aid = e, this.loadDataByPage(0)
      }
    },
    emits: ["change"],
    methods: {
      change(e) {
        const t = e.target.files[0],
          o = new FormData;
        o.append("aid", this.query.aid), o.append("file", t), this.$http.post(`/ajax/mng/evaluation/import_express?aid=${this.query.aid}`, o).then(c => {
          c.data && this.$_w_toast({
            type: c.data.code === "1000" ? "success" : "warn",
            message: c.data.code === "1000" ? c.data.data : c.data.msg
          })
        }), this.$refs.file.value = ""
      },
      upload() {
        this.$refs.file.click()
      },
      exportExpress() {},
      createGroup() {
        if (this.resData.activity_info.groupchat) {
          const e = this.resData.activity_info.groupchat.match(/id=(.*)/)[1];
          window.open(`https://api.weibo.com/chat/#/chat?check_gid=${e}&source_from=11`, "privateChat");
          return
        }
        this.$http.post("/ajax/mng/evaluation/create_group", {
          aid: this.query.aid
        }).then(e => {
          e.data.code === "1000" && (this.resData.activity_info.groupchat = e.data.data, window.open(`https://api.weibo.com/chat/#/chat?check_gid=${this.resData.activity_info.groupchat}&source_from=11`, "privateChat"))
        })
      },
      changePage() {
        this.$emit("change", "List")
      },
      getCompanyCode() {
        this.$http.get("/ajax/mng/evaluation/company_code", {
          params: {
            aid: this.query.aid
          }
        }).then(e => {
          if (console.log(e.data), e.data && e.data.code === "1000") {
            const t = e.data.data,
              o = [];
            for (const [c, a] of Object.entries(t)) o.push({
              label: a,
              value: c
            });
            this.companyCode = o
          }
        })
      }
    },
    mounted() {
      return B(this, null, function*() {
        this.query.aid = this.data, this.loadDataByPage(0), this.getCompanyCode()
      })
    }
  },
  pr = {
    key: 0
  },
  _r = ["href"],
  fr = {
    key: 1
  },
  mr = {
    style: {
      width: "100%"
    }
  };

function hr(e, t, o, c, a, r) {
  const h = d("woo-fonticon"),
    _ = d("woo-box"),
    m = d("woo-panel"),
    v = d("woo-tip"),
    D = d("woo-pop"),
    k = d("woo-divider"),
    P = d("EvFeed"),
    M = d("woo-box-item"),
    y = d("Express"),
    L = d("Scroll");
  return u(), g("div", null, [n(m, {
    border: "bottom",
    class: s(e.$style.backbar)
  }, {
    default: i(() => [n(_, {
      align: "center",
      class: s(e.$style.bbb)
    }, {
      default: i(() => [n(_, {
        class: s(e.$style.bb1),
        align: "center",
        onMousedown: r.changePage
      }, {
        default: i(() => [n(h, {
          value: "angleLeft"
        }), t[7] || (t[7] = b(" 返回 "))]),
        _: 1
      }, 8, ["class", "onMousedown"]), l("div", {
        class: s(e.$style.bb2)
      }, [t[8] || (t[8] = b(" 中选名单")), e.resData && e.resData.total ? (u(), g("span", pr, "(" + f(e.resData.total) + "人)", 1)) : C("", !0)], 2)]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"]), l("div", {
    class: s(e.$style.boxa)
  }, [e.list.length ? (u(), w(_, {
    key: 0,
    align: "center",
    justify: "end",
    class: s(e.$style.lbtit)
  }, {
    default: i(() => [l("div", {
      class: s(e.$style.lbtitem)
    }, [l("a", {
      onClick: t[0] || (t[0] = j((...p) => r.createGroup && r.createGroup(...p), ["stop", "prevent"]))
    }, f(e.resData && e.resData.activity_info && e.resData.activity_info.groupchat ? "试用用户私信群" : "建立私信群"), 1)], 2), l("div", {
      class: s(e.$style.lbtitem)
    }, [l("a", {
      href: `/ajax/mng/evaluation/export_express?aid=${a.query.aid}`,
      target: "_blank",
      onClick: t[1] || (t[1] = j((...p) => r.exportExpress && r.exportExpress(...p), ["stop"]))
    }, "导出收货地址", 8, _r)], 2), n(_, {
      align: "center",
      class: s(e.$style.lbtitem)
    }, {
      default: i(() => [l("a", {
        onClick: t[2] || (t[2] = j((...p) => r.upload && r.upload(...p), ["prevent", "stop"]))
      }, "批量上传物流"), l("input", {
        ref: "file",
        type: "file",
        class: s(e.$style.file),
        accept: ".csv",
        multiple: "",
        onChange: t[3] || (t[3] = (...p) => r.change && r.change(...p))
      }, null, 34), n(D, {
        show: a.showHelp2,
        direction: "down",
        align: "end",
        gap: "10",
        class: s(e.$style.help)
      }, {
        ctrl: i(() => [n(v, {
          type: "warn",
          gap: "10",
          inline: "",
          reverse: "",
          onMouseover: t[4] || (t[4] = p => a.showHelp2 = !0),
          onMouseout: t[5] || (t[5] = p => a.showHelp2 = !1)
        })]),
        default: i(() => [l("div", {
          class: s(e.$style.helppop1)
        }, t[9] || (t[9] = [l("div", null, "请将收货地址文件（*.csv）导出，并将物流信息补充完整后按原格式导入进行批量上传。", -1)]), 2)]),
        _: 1
      }, 8, ["show", "class"])]),
      _: 1
    }, 8, ["class"])]),
    _: 1
  }, 8, ["class"])) : C("", !0), l("div", {
    class: s(e.$style.listb)
  }, [n(k), e.list.length ? (u(), g("div", fr, [n(L, {
    isRetry: e.isRetry,
    "onUpdate:isRetry": t[6] || (t[6] = p => e.isRetry = p),
    skeleton: !0,
    data: e.list,
    isLoading: e.isLoading,
    isNoData: e.isNoData,
    onLoadMoreData: e.getMore
  }, {
    content: i(({
      item: p,
      index: V
    }) => [l("div", mr, [n(_, {
      class: s(e.$style.lbitemin)
    }, {
      default: i(() => [n(M, {
        align: "center",
        class: s(e.$style.cut)
      }, {
        default: i(() => [n(P, {
          item: p,
          status: p.evaluation
        }, null, 8, ["item", "status"])]),
        _: 2
      }, 1032, ["class"]), l("div", {
        class: s(e.$style.lbline)
      }, [n(k, {
        direction: "y"
      })], 2), n(M, {
        align: "center",
        class: s([e.$style.cut, e.$style.cut1])
      }, {
        default: i(() => [l("div", {
          class: s(e.$style.lbrh3)
        }, [l("span", null, "收货人：" + f(p.true_name), 1), l("span", {
          class: s(e.$style.lbmar2)
        }, "联系电话：" + f(p.phone), 3)], 2), l("div", {
          class: s(e.$style.lbrh3)
        }, [l("span", null, " 收货地址：" + f(p.address), 1)], 2), l("div", {
          class: s(e.$style.lbrh3)
        }, [l("span", null, "邮编：" + f(p.zipcode), 1)], 2), n(y, {
          data: a.companyCode,
          item: p,
          class: s(e.$style.lbrh3),
          "onUpdate:item": z => e.list[V] = z
        }, null, 8, ["data", "item", "class", "onUpdate:item"])]),
        _: 2
      }, 1032, ["class"])]),
      _: 2
    }, 1032, ["class"]), n(k)])]),
    _: 1
  }, 8, ["isRetry", "data", "isLoading", "isNoData", "onLoadMoreData"])])) : (u(), w(v, {
    key: 0,
    type: "warn",
    sort: "vertical",
    class: s(e.$style.tipbox)
  }, {
    default: i(() => [b(f(a.showText), 1)]),
    _: 1
  }, 8, ["class"]))], 2)], 2)])
}
const br = {
    $style: cr
  },
  yr = E(ur, [
    ["render", hr],
    ["__cssModules", br]
  ]),
  gr = {},
  vr = {
    components: {
      List: Ls,
      Publish: _i,
      Preview: Hl,
      Winner: yr,
      ChooseUser: is
    },
    data() {
      return {
        page: "List",
        data: null,
        arr: ["evaluationPublish"]
      }
    },
    watch: {
      $route() {
        this.initRouter()
      }
    },
    methods: {
      changePage(e, t) {
        const o = this.$route.query;
        e === "ChooseUser" ? this.$router.push({
          name: e,
          query: R(S({}, o), {
            aid: t
          })
        }) : e === "List" ? (this.$router.push({
          name: "MngEvaluation",
          query: o
        }), this.arr = []) : e === "Winner" ? this.$router.push({
          name: e,
          query: R(S({}, o), {
            aid: t
          })
        }) : e === "Publish" ? this.arr = ["evaluationPublish"] : e === "Preview" && this.$nextTick(() => {
          window.scrollTo(0, 0)
        }), this.page = e, this.data = t
      },
      iniData() {
        this.initRouter()
      },
      initRouter() {
        const e = this.$route.name;
        console.log(e), e === "ChooseUser" ? this.changePage(e, this.$route.query.aid) : e === "MngEvaluation" ? this.changePage("List") : e === "Winner" && this.changePage(e, this.$route.query.aid)
      }
    },
    mounted() {
      this.iniData()
    }
  };

function kr(e, t, o, c, a, r) {
  return u(), g("div", {
    class: s(e.$style.container)
  }, [(u(), w(ye, {
    include: a.arr
  }, [(u(), w(be(a.page), {
    data: a.data,
    onChange: r.changePage
  }, null, 40, ["data", "onChange"]))], 1032, ["include"]))], 2)
}
const $r = {
    $style: gr
  },
  Dr = E(vr, [
    ["render", kr],
    ["__cssModules", $r]
  ]);
export {
  Dr as
  default
};
