var O = Object.defineProperty,
  F = Object.defineProperties;
var H = Object.getOwnPropertyDescriptors;
var P = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty,
  I = Object.prototype.propertyIsEnumerable;
var M = (t, e, s) => e in t ? O(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
  }) : t[e] = s,
  L = (t, e) => {
    for (var s in e || (e = {})) G.call(e, s) && M(t, s, e[s]);
    if (P)
      for (var s of P(e)) I.call(e, s) && M(t, s, e[s]);
    return t
  },
  q = (t, e) => F(t, H(e));
var S = (t, e, s) => new Promise((i, a) => {
  var o = c => {
      try {
        u(s.next(c))
      } catch (_) {
        a(_)
      }
    },
    h = c => {
      try {
        u(s.throw(c))
      } catch (_) {
        a(_)
      }
    },
    u = c => c.done ? i(c.value) : Promise.resolve(c.value).then(o, h);
  u((s = s.apply(t, e)).next())
});
import {
  _ as J,
  J as W,
  S as X,
  l as y,
  m as j,
  i as p,
  B as r,
  p as w,
  C as d,
  n as l,
  G as B,
  H as U,
  h as $,
  T as k,
  E as g,
  U as m,
  D as v,
  V as Y,
  W as Z,
  X as K,
  Y as x,
  Z as Q,
  $ as tt
} from "./index-Xve1TSN5.js";
const et = "_box_1rl17_3",
  st = "_listbox_1rl17_6",
  ot = "_pic_1rl17_9",
  at = "_wrap_1rl17_15",
  it = "_line_1rl17_18",
  lt = "_item_1rl17_21",
  nt = "_item2_1rl17_26",
  ct = "_right_1rl17_29",
  rt = "_btn1_1rl17_32",
  dt = "_btn12_1rl17_37",
  ut = "_btn2_1rl17_40",
  _t = "_btn3_1rl17_47",
  ht = "_con_1rl17_52",
  bt = "_cut2_1rl17_57",
  pt = "_h4_1rl17_60",
  yt = "_cls1_1rl17_64",
  ft = "_cls2_1rl17_67",
  mt = "_mar1_1rl17_70",
  gt = "_tab_1rl17_73",
  jt = "_tab2_1rl17_76",
  wt = "_tab2in_1rl17_79",
  $t = "_cur_1rl17_101",
  kt = "_tit_1rl17_107",
  vt = "_radio_1rl17_115",
  Ct = "_back_1rl17_118",
  Tt = "_btnhasnav_1rl17_121",
  Vt = "_tabnonav_1rl17_124",
  Lt = "_filter_1rl17_143",
  St = "_time_1rl17_149",
  xt = "_sort_1rl17_153",
  Et = "_icon_1rl17_156",
  zt = {
    box: et,
    listbox: st,
    pic: ot,
    wrap: at,
    line: it,
    item: lt,
    item2: nt,
    right: ct,
    btn1: rt,
    btn12: dt,
    btn2: ut,
    btn3: _t,
    con: ht,
    cut2: bt,
    h4: pt,
    cls1: yt,
    cls2: ft,
    mar1: mt,
    tab: gt,
    tab2: jt,
    tab2in: wt,
    cur: $t,
    tit: kt,
    radio: vt,
    back: Ct,
    btnhasnav: Tt,
    tabnonav: Vt,
    filter: Lt,
    time: St,
    sort: xt,
    icon: Et
  };
x.extend(Q);
x.extend(tt);
const Pt = {
    data() {
      return {
        showPop: !1,
        tabs: ["待发送", "发送失败"],
        time: [{
          title: "本地时间",
          key: 0
        }, {
          title: "北京时间",
          key: 1
        }],
        order: [{
          title: "发布时间",
          key: 0
        }, {
          title: "编辑时间",
          key: 1
        }],
        timeSelect: 0,
        orderSelect: 0,
        list: [],
        transcoding_media: [],
        isLoading: !1,
        isEmpty: !1,
        isRetry: !1,
        max_id: "",
        type: 0
      }
    },
    beforeMount() {
      this.actionLog({
        uicode: "20000369"
      }), this.$Bus.$on("videoVoteAdded", this.videoVoteAdded)
    },
    beforeUnmount() {
      this.$Bus.$off("videoVoteAdded", this.videoVoteAdded)
    },
    components: {
      Scroll: X
    },
    computed: q(L({}, W(["config"])), {
      hasnav() {
        return this.$route.query.hasnav !== "0"
      }
    }),
    methods: {
      clickPop() {
        this.showPop = !0
      },
      handleTime({
        schedule_at: t,
        schedule_timestamp: e,
        schedule_at_beijing_tz: s
      }) {
        let i = x(t || e);
        s && (i = i.tz("Asia/Shanghai"));
        const a = i.month() + 1,
          o = i.date(),
          h = i.hour() < 10 ? `0${i.hour()}` : i.hour(),
          u = i.minute() < 10 ? `0${i.minute()}` : i.minute(),
          c = i.second() < 10 ? `0${i.second()}` : i.second();
        return `${(s&&x.tz.guess()!=="Asia/Shanghai"?"北京时间":"")+a}月${o}日 ${h}:${u}:${c}`
      },
      changeOrder(t) {
        this.orderSelect = t, this.changeTab(this.type), this.showPop = !1
      },
      changeTime(t) {
        this.timeSelect = t, this.changeTab(this.type)
      },
      updateUrl(t) {
        return new Promise(e => S(this, null, function*() {
          if (this.ssigHook) {
            const s = yield this.ssigHook.call(this);
            e(s)
          } else {
            const s = yield this.$http.post("/ajax/multimedia/createCert");
            if (s.data.ok > 0 && s.data.result) {
              const i = yield this.$http.get("/ajax/multimedia/getSsigUrl", {
                params: {
                  url: t
                }
              });
              i.data.ok > 0 && i.data.data && e(i.data.data.url)
            }
          }
          e()
        }))
      },
      addVote(t) {
        return S(this, null, function*() {
          const e = {},
            a = t.url_objects.find(u => u.object && u.object.object_type === "video").object.object,
            o = a.url,
            h = yield this.updateUrl(o);
          if (h) {
            const u = a.id && a.id.split(":")[1];
            e.media_id = u, e.id = t.schedule_id, e.duration = a.duration, e.stream_url = h, e.orientation = a.video_orientation, e.poster = a.image && a.image.url || a.screenshots[1], this.$Bus.$emit("showVideoEditor", e)
          } else this.$_w_toast({
            type: "warn",
            message: "该视频不支持添加投票"
          })
        })
      },
      handleText(t) {
        return K(t, !0)
      },
      videoVoteAdded(t) {
        this.list.forEach(e => {
          t === e.schedule_id && (this.item.added = !0)
        })
      },
      showVideoVoteBtn(t) {
        if (!(this.config && this.config.flags && this.config.flags.can_create_vote) || t.added) return !1;
        if (t.url_objects) {
          const i = t.url_objects.find(a => a.object && a.object.object_type === "video");
          if (i && i.object && i.object.object && i.object.object.url) {
            const a = i.object_id,
              o = i.object.object,
              h = !o.author_mid,
              u = o.duration,
              c = a && !a.includes("1022:100161") || !a.includes("1022:230282");
            return (o && o.extension && o.extension.extension && o.extension.extension.vote_is_show) !== 1 && c && h && u >= 10
          }
        } else return !1
      },
      imageUrl(t) {
        let e = {};
        return t.url_objects && (e = t.url_objects.find(i => i.object && (i.object.object_type === "video" || i.object.object_type === "podcast_audio"))), t.thumbnail_pic || e && e.object && e.object.object && e.object.object.image && e.object.object.image.url || e && e.object && e.object.object && e.object.object.screenshots[1]
      },
      loadMoreData() {
        this.query()
      },
      query() {
        this.isLoading = !0, this.isRetry = !1, this.isEmpty = !1;
        const t = {
          type: this.type,
          max_id: this.max_id,
          order: this.orderSelect,
          schedule_at_beijing_tz: this.timeSelect
        };
        this.$http.get(`/ajax/statuses/schedule/list?${Z.stringify(t)}`).then(e => {
          var s, i, a, o, h;
          if (this.isLoading = !1, e.data && e.data.data) {
            this.max_id = e.data.data.max_id;
            let u = e.data.data.statuses;
            (a = (i = (s = e.data) == null ? void 0 : s.data) == null ? void 0 : i.transcoding_media) != null && a.length && (this.transcoding_media = (h = (o = e.data) == null ? void 0 : o.data) == null ? void 0 : h.transcoding_media, this.transcoding_media.forEach(c => {
              c.trans = 1
            }), u = this.transcoding_media.concat(u)), this.list = this.list.concat(u), this.list.forEach(c => {
              c.id = c.schedule_id
            }), this.isLoading = !0, this.max_id || (this.isEmpty = !0, this.isLoading = !1), this.list.length === 0 && (this.isEmpty = !0, this.isLoading = !1)
          } else this.isLoading = !1
        })
      },
      changeTab(t) {
        this.type = t, this.max_id = "", this.list = [], this.loadMoreData();
        const e = this.$route.query;
        this.$router.push({
          query: L({
            type: t
          }, e)
        })
      },
      send(t, e) {
        this.$_w_dialog({
          type: "confirm",
          title: "确认立即发送？",
          message: "这条微博将取消定时状态，并立即发布",
          action: () => {
            this.$http.post("/ajax/statuses/schedule/upload_immediately", {
              schedule_id: t.schedule_id
            }).then(s => {
              s.data && s.data.data && s.data.data.result && (this.list.splice(e, e + 1), this.list.length === 0 && (this.isEmpty = !0), this.$_w_toast({
                type: "success",
                message: "发布成功"
              }))
            })
          }
        })
      },
      destory(t, e) {
        this.$_w_dialog({
          type: "confirm",
          title: "确认删除？",
          message: "删除之后将不可恢复",
          action: () => {
            this.$http.post("/ajax/statuses/schedule/destory", {
              schedule_id: t.schedule_id
            }).then(s => {
              s.data && s.data.data && s.data.data.result && (this.list.splice(e, 1), this.list.length === 0 && (this.isEmpty = !0), this.$_w_toast({
                type: "success",
                message: "删除成功"
              }))
            })
          }
        })
      },
      handleMix(t) {
        if (t.mix_media_ids) return {
          items: t.mix_media_ids.map(e => {
            var s, i, a, o, h, u, c, _;
            if (t.pic_ids.includes(e)) {
              const b = t.bmiddle_pic.split(",").find(T => T.includes(e)) || Y(e, "bmiddle");
              return {
                type: "pic",
                id: e,
                data: {
                  bmiddle: {
                    url: b
                  }
                }
              }
            } else {
              const b = t.url_objects.find(T => T.object_id === `1034:${e}`);
              return {
                type: "video",
                id: `1034:${e}`,
                duration: (s = b == null ? void 0 : b.object) == null ? void 0 : s.object.duration,
                data: {
                  object_type: "video",
                  short_url: (a = (i = b == null ? void 0 : b.object) == null ? void 0 : i.object) == null ? void 0 : a.url,
                  page_pic: (u = (h = (o = b == null ? void 0 : b.object) == null ? void 0 : o.object) == null ? void 0 : h.image) == null ? void 0 : u.url,
                  media_info: {
                    media_id: e,
                    duration: (_ = (c = b == null ? void 0 : b.object) == null ? void 0 : c.object) == null ? void 0 : _.duration,
                    type: "video"
                  }
                }
              }
            }
          })
        }
      },
      edit(t, e) {
        return S(this, null, function*() {
          var i, a, o, h, u, c;
          try {
            t = (yield this.$http.get("/ajax/statuses/schedule/show", {
              params: {
                schedule_id: t.schedule_id
              }
            })).data.data
          } catch (_) {
            console.warn(_)
          }
          const s = {};
          s.mix_media_info = this.handleMix(t), this.$Bus.$emit("showModalPublish", {
            action: "schedule",
            title: "编辑微博",
            data: L({
              schedule_at_beijing_tz: t.schedule_at_beijing_tz,
              videoImage: ((h = (o = (a = (i = t == null ? void 0 : t.url_objects) == null ? void 0 : i[0]) == null ? void 0 : a.object) == null ? void 0 : o.object) == null ? void 0 : h.object_type) === "video" && t.url_objects[0].object.object.image.url && !t.mix_media_ids,
              content: t.longText ? t.longText.longTextContent : t.text,
              visable: 0,
              schedule_id: t.schedule_id,
              schedule_timestamp: Number(new Date(t.schedule_at).getTime()),
              pic_id: t.pic_ids,
              pic_infos: t.pic_infos,
              is_paid: t.is_paid,
              blog_audio: t.blog_audio,
              ai_assistant_comment_type: (u = t == null ? void 0 : t.comment_manage_info) == null ? void 0 : u.ai_assistant_comment_type,
              approval_comment_type: (c = t == null ? void 0 : t.comment_manage_info) == null ? void 0 : c.approval_comment_type,
              callback: {
                callback: this.editFun,
                index: e
              },
              actLogData: {
                page: "qPublisher"
              },
              url_objects: t.url_objects
            }, s)
          })
        })
      },
      editFun(t, e) {
        this.$nextTick(() => {
          e.id = e.schedule_id, Number(this.$route.query.type) === 1 ? (this.list.splice(t, 1), this.list.length === 0 && (this.isEmpty = !0)) : this.list.splice(t, 1, e)
        })
      },
      schedulePubliser() {
        this.$Bus.$emit("showModalPublish", {
          action: "timer",
          title: "发布定时微博",
          data: {
            callback: {
              callback: this.addFun
            },
            actLogData: {
              page: "qPublisher"
            }
          }
        })
      },
      addFun(t) {
        this.$nextTick(() => {
          t.schedule_id && (t.id = t.schedule_id, this.list.unshift(t))
        })
      }
    },
    mounted() {
      this.changeTab(this.$route.query.type ? Number(this.$route.query.type) : 0)
    }
  },
  Mt = ["textContent"],
  qt = ["textContent"],
  Bt = ["textContent"],
  Ut = ["textContent"];

function Dt(t, e, s, i, a, o) {
  const h = y("woo-tab-item"),
    u = y("woo-tab"),
    c = y("woo-button"),
    _ = y("woo-box"),
    b = y("woo-panel"),
    T = y("woo-fonticon"),
    D = y("woo-pop-item"),
    A = y("woo-pop-wrap"),
    N = y("woo-pop"),
    V = y("woo-divider"),
    E = y("woo-picture"),
    z = y("woo-box-item"),
    R = y("Scroll");
  return p(), j("div", {
    class: l(t.$style.box)
  }, [r(b, {
    border: "bottom"
  }, {
    default: d(() => [r(_, {
      align: "center",
      justify: "between"
    }, {
      default: d(() => [r(u, {
        animate: o.hasnav,
        "animate-duration": 500,
        class: l([o.hasnav ? "wbpro-tab1" : t.$style.tabnonav])
      }, {
        default: d(() => [(p(!0), j(B, null, U(a.tabs, (n, f) => (p(), $(h, {
          key: n,
          index: f,
          cur: a.type === f,
          onClick: k(C => o.changeTab(f), ["stop"])
        }, {
          default: d(() => [w("div", {
            class: l([o.hasnav && "wbpro-tab1-item"]),
            textContent: g(n)
          }, null, 10, Mt)]),
          _: 2
        }, 1032, ["index", "cur", "onClick"]))), 128))]),
        _: 1
      }, 8, ["animate", "class"]), r(c, {
        sort: "line",
        size: "s",
        kind: "default",
        round: !1,
        class: l([t.$style.btn3, !o.hasnav && t.$style.btnhasnav]),
        onClick: o.schedulePubliser
      }, {
        default: d(() => e[2] || (e[2] = [m(" 发布定时微博 ")])),
        _: 1
      }, 8, ["class", "onClick"])]),
      _: 1
    })]),
    _: 1
  }), r(_, {
    justify: "between",
    class: l(t.$style.filter)
  }, {
    default: d(() => [r(_, {
      align: "center"
    }), r(N, {
      show: a.showPop,
      direction: "down",
      align: "end",
      onClickOutside: e[0] || (e[0] = n => a.showPop = !1)
    }, {
      ctrl: d(() => [r(_, {
        align: "center",
        class: l(t.$style.sort),
        onClick: o.clickPop
      }, {
        default: d(() => [e[3] || (e[3] = m(" 排序 ")), r(T, {
          value: "sorts",
          class: l(t.$style.icon)
        }, null, 8, ["class"])]),
        _: 1
      }, 8, ["class", "onClick"])]),
      default: d(() => [r(A, null, {
        default: d(() => [(p(!0), j(B, null, U(a.order, n => (p(), $(D, {
          key: n,
          cur: a.orderSelect === n.key,
          onClick: f => o.changeOrder(n.key)
        }, {
          default: d(() => [m(g(n.title), 1)]),
          _: 2
        }, 1032, ["cur", "onClick"]))), 128))]),
        _: 1
      })]),
      _: 1
    }, 8, ["show"])]),
    _: 1
  }, 8, ["class"]), r(V), w("div", {
    class: l(t.$style.listbox)
  }, [r(R, {
    isRetry: a.isRetry,
    "onUpdate:isRetry": e[1] || (e[1] = n => a.isRetry = n),
    data: a.list,
    isLoading: a.isLoading,
    isEmpty: a.isEmpty,
    skeleton: !0,
    onLoadMoreData: o.loadMoreData
  }, {
    content: d(({
      item: n,
      index: f
    }) => [a.type === 0 ? (p(), j("div", {
      key: n.id,
      class: l(t.$style.wrap)
    }, [n.trans ? (p(), j("div", {
      key: n,
      class: l(t.$style.wrap)
    }, [r(_, {
      align: "center",
      class: l(t.$style.item)
    }, {
      default: d(() => [n.cover_url ? (p(), $(E, {
        key: 0,
        class: l(t.$style.pic),
        src: n.cover_url,
        alt: "等比图"
      }, null, 8, ["class", "src"])) : v("", !0), r(z, {
        align: "center",
        class: l(t.$style.con)
      }, {
        default: d(() => [w("div", {
          class: l(t.$style.cut2),
          textContent: g(o.handleText(n.text))
        }, null, 10, qt), n.schedule_timestamp ? (p(), j("div", {
          key: 0,
          class: l(["wbpro-textcut", [t.$style.h4, t.$style.cls1]])
        }, " 发布时间：" + g(o.handleTime(n)), 3)) : v("", !0)]),
        _: 2
      }, 1032, ["class"]), r(_, {
        justify: "end",
        class: l([t.$style.h4, t.$style.cls1, t.$style.right])
      }, {
        default: d(() => e[4] || (e[4] = [m(" 视频转码中 ")])),
        _: 1
      }, 8, ["class"])]),
      _: 2
    }, 1032, ["class"]), r(V, {
      class: l(t.$style.line)
    }, null, 8, ["class"])], 2)) : (p(), $(_, {
      key: 1,
      align: "center",
      class: l(t.$style.item)
    }, {
      default: d(() => [o.imageUrl(n) ? (p(), $(E, {
        key: 0,
        class: l(t.$style.pic),
        src: o.imageUrl(n),
        alt: "等比图"
      }, null, 8, ["class", "src"])) : v("", !0), r(z, {
        align: "center",
        class: l(t.$style.con)
      }, {
        default: d(() => [w("div", {
          class: l(t.$style.cut2),
          textContent: g(o.handleText(n.text))
        }, null, 10, Bt), w("div", {
          class: l(["wbpro-textcut", [t.$style.h4, t.$style.cls1]])
        }, " 发布时间：" + g(o.handleTime(n)), 3)]),
        _: 2
      }, 1032, ["class"]), r(_, {
        justify: "end",
        class: l(t.$style.right)
      }, {
        default: d(() => [o.showVideoVoteBtn(n) ? (p(), $(c, {
          key: 0,
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn1),
          onClick: k(C => o.addVote(n, f), ["stop"])
        }, {
          default: d(() => e[5] || (e[5] = [m(" 添加视频投票 ")])),
          _: 2
        }, 1032, ["class", "onClick"])) : v("", !0), r(c, {
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn1),
          onClick: k(C => o.edit(n, f), ["stop"])
        }, {
          default: d(() => e[6] || (e[6] = [m(" 编辑微博 ")])),
          _: 2
        }, 1032, ["class", "onClick"]), r(c, {
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn1),
          onClick: k(C => o.send(n, f), ["stop"])
        }, {
          default: d(() => e[7] || (e[7] = [m(" 立即发送 ")])),
          _: 2
        }, 1032, ["class", "onClick"]), r(c, {
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn2),
          onClick: k(C => o.destory(n, f), ["stop"])
        }, {
          default: d(() => e[8] || (e[8] = [m(" 删除 ")])),
          _: 2
        }, 1032, ["class", "onClick"])]),
        _: 2
      }, 1032, ["class"])]),
      _: 2
    }, 1032, ["class"])), r(V, {
      class: l(t.$style.line)
    }, null, 8, ["class"])], 2)) : v("", !0), a.type === 1 ? (p(), j("div", {
      key: n.id,
      class: l(t.$style.wrap)
    }, [r(_, {
      align: "center",
      class: l(t.$style.item)
    }, {
      default: d(() => [n.thumbnail_pic ? (p(), $(E, {
        key: 0,
        class: l(t.$style.pic),
        src: n.thumbnail_pic,
        alt: "等比图"
      }, null, 8, ["class", "src"])) : v("", !0), r(z, {
        align: "center",
        class: l(t.$style.con)
      }, {
        default: d(() => [w("div", {
          class: l(t.$style.cut2),
          textContent: g(n.text)
        }, null, 10, Ut), w("div", {
          class: l(["wbpro-textcut", [t.$style.h4, t.$style.cls2]])
        }, " 失败原因：" + g(`${n.error_info.error}(${n.error_info.error_code})`), 3)]),
        _: 2
      }, 1032, ["class"]), r(_, {
        justify: "end",
        class: l(t.$style.right)
      }, {
        default: d(() => [r(c, {
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn1),
          onClick: k(C => o.edit(n, f), ["stop"])
        }, {
          default: d(() => e[9] || (e[9] = [m(" 编辑微博 ")])),
          _: 2
        }, 1032, ["class", "onClick"]), r(c, {
          sort: "line",
          kind: "primary",
          size: "s",
          round: !1,
          class: l(t.$style.btn2),
          onClick: k(C => o.destory(n, f), ["stop"])
        }, {
          default: d(() => e[10] || (e[10] = [m(" 删除 ")])),
          _: 2
        }, 1032, ["class", "onClick"])]),
        _: 2
      }, 1032, ["class"])]),
      _: 2
    }, 1032, ["class"]), r(V, {
      class: l(t.$style.line)
    }, null, 8, ["class"])], 2)) : v("", !0)]),
    _: 1
  }, 8, ["isRetry", "data", "isLoading", "isEmpty", "onLoadMoreData"])], 2)], 2)
}
const At = {
    $style: zt
  },
  Ot = J(Pt, [
    ["render", Dt],
    ["__cssModules", At]
  ]);
export {
  Ot as
  default
};
