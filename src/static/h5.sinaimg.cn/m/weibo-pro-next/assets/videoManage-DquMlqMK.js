import {
  aa as b,
  _ as L,
  S as M,
  l as _,
  m as r,
  i as d,
  p as a,
  B as h,
  C as p,
  h as $,
  n as g,
  D as v,
  E as c,
  ab as w
} from "./index-Xve1TSN5.js";

function x(s, e) {
  const t = b(s.getDate()),
    i = b(s.getMonth() + 1),
    l = s.getFullYear();
  return e === "YYYY/MM/DD" ? `${l}/${i}/${t}` : e === "YYYY-MM-DD" ? `${l}-${i}-${t}` : `${l}${i}${t}`
}
const Y = {
    data() {
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
    beforeMount() {
      this.getVideoList(), this.formatDate = x, this.shortNum = w
    },
    components: {
      Scroll: M
    },
    methods: {
      noEditable(s) {
        return s.oid.includes("1042158:") || s.oid.includes("1042212:") || s.video_status && [1, 4, -1].includes(s.video_status.status) || !s.editable
      },
      getVideoList() {
        this.isLoading = !0, !this.loading && this.$http.get("/ajax/multimedia/getVideoList", {
          params: {
            cursor: this.next_cursor
          }
        }).then(s => {
          if (s.data && s.data.ok > 0) {
            this.isLoading = !1;
            const e = s.data.data,
              t = e && e.videos;
            this.videoList = this.videoList.concat(t), this.isLoading = !0, t.length === 0 && (this.isEmpty = !0), t.length === 0 || t.length < 10 ? this.isLoading = !1 : this.next_cursor = e.next_cursor
          }
        })
      },
      loadMoreData() {
        console.log("loadMoreData"), this.getVideoList()
      },
      goPlay(s, e) {
        window.open(`https://weibo.com/tv/show/${s}?mid=${e}`)
      },
      goEdit(s) {
        if (this.noEditable(s)) return;
        const {
          oid: e
        } = s;
        this.$router.push({
          name: "channel",
          query: {
            entry: "edit",
            oid: e
          }
        })
      },
      delVideo(s, e) {
        this.$_w_dialog({
          type: "confirm",
          title: "确定删除视频吗？",
          message: "",
          checkbox: this.checkValue,
          action: () => {
            const t = {
              oid: s.oid,
              mid: s.mid,
              delete_microblog: this.checkValue[0].value
            };
            console.log("params", t), this.$http.post("/ajax/multimedia/videoDelete", t).then(i => {
              i.data.ok > 0 && i.data.data && i.data.data.result && (console.log("删除成功"), this.$_w_toast({
                type: "success",
                message: "删除成功"
              }), this.videoList.splice(e, 1))
            }).catch(i => {
              this.$_w_toast({
                type: "warn",
                message: "删除失败，请稍后重试"
              }), console.log(i)
            })
          }
        })
      },
      sec2time(s) {
        const e = function(n, u) {
            return `000${n}`.slice(u * -1)
          },
          t = Number.parseFloat(s).toFixed(3),
          i = Math.floor(t / 60) % 60,
          l = Math.floor(t - i * 60);
        return `${e(i,2)}:${e(l,2)}`
      },
      getStatus(s) {
        if (s.video_status) {
          const e = s.video_status.status;
          let t = "";
          switch (e) {
            case -1:
              t = "invalid";
              break;
            case 1:
              t = "pending";
              break;
            case 3:
              t = "fail";
              break;
            case 4:
              t = "pending";
              break;
            case 6:
              t = "fail";
              break;
            default:
              t = "pass";
              break
          }
          return t
        } else return "pass"
      }
    }
  },
  E = {
    class: "list"
  },
  V = ["onClick"],
  C = ["src"],
  N = {
    class: "video-duration"
  },
  S = {
    key: 0,
    class: "paly-btn"
  },
  B = {
    class: "video-info"
  },
  F = {
    class: "title"
  },
  j = {
    key: 0,
    class: "text"
  },
  z = {
    class: "date"
  },
  P = {
    key: 0,
    class: "others"
  },
  R = {
    class: "icon zan"
  },
  q = {
    class: "icon playnum"
  },
  I = {
    class: "icon comment"
  },
  Z = {
    class: "icon repost"
  },
  A = ["onClick"],
  G = ["onClick"];

function H(s, e, t, i, l, n) {
  const u = _("woo-fonticon"),
    f = _("woo-box"),
    y = _("Scroll");
  return d(), r("div", null, [a("div", E, [h(y, {
    isEmpty: l.isEmpty,
    data: l.videoList,
    keyField: "oid",
    isLoading: l.isLoading,
    onLoadMoreData: n.loadMoreData
  }, {
    content: p(({
      item: o,
      index: D
    }) => [(d(), $(f, {
      key: o.oid,
      class: g(["video-item", n.getStatus(o)])
    }, {
      default: p(() => {
        var m;
        return [a("div", {
          class: "video-box",
          onClick: k => n.goPlay(o.oid, o.mid)
        }, [a("img", {
          src: o.covers[1].url,
          alt: ""
        }, null, 8, C), a("div", N, c(n.sec2time(o.duration)), 1), !o.video_status || (o.video_status && o.video_status.status) > 0 ? (d(), r("div", S, [h(u, {
          kind: "success",
          value: "caretRight",
          class: "paly-btn-icon"
        })])) : v("", !0)], 8, V), a("div", B, [a("div", F, [(m = o.titles) != null && m.length ? (d(), r("span", j, c(o.titles[0].title), 1)) : v("", !0), a("span", {
          class: g(["status", n.getStatus(o)])
        }, c(o.video_status ? o.video_status.text : "视频审核通过"), 3)]), a("div", z, c(s.formatDate(new Date(o.create_time), "YYYY-MM-DD")), 1), o.statistics ? (d(), r("div", P, [a("span", R, [a("i", null, c(s.shortNum(o.statistics.attitude_count)), 1)]), a("span", q, [a("i", null, c(s.shortNum(o.statistics.play_count)), 1)]), a("span", I, [a("i", null, c(s.shortNum(o.statistics.comment_count)), 1)]), a("span", Z, [a("i", null, c(s.shortNum(o.statistics.reposts_count)), 1)])])) : v("", !0)]), h(f, {
          class: "video-option"
        }, {
          default: p(() => [a("div", {
            class: g(["button edit", {
              disable: n.noEditable(o)
            }]),
            onClick: k => n.goEdit(o)
          }, e[0] || (e[0] = [a("i", {
            class: "icon"
          }, null, -1), a("span", null, "编辑", -1)]), 10, A), a("div", {
            class: "button del",
            onClick: k => n.delVideo(o, D)
          }, e[1] || (e[1] = [a("i", {
            class: "icon"
          }, null, -1), a("span", null, "删除", -1)]), 8, G)]),
          _: 2
        }, 1024)]
      }),
      _: 2
    }, 1032, ["class"]))]),
    _: 1
  }, 8, ["isEmpty", "data", "isLoading", "onLoadMoreData"])])])
}
const K = L(Y, [
  ["render", H],
  ["__scopeId", "data-v-f35f8103"]
]);
export {
  K as
  default
};
