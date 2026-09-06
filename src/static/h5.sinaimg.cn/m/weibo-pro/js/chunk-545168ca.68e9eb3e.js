(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-545168ca"], {
    "96b6": function(e, t, n) {
      "use strict";
      var o = n("a442"),
        i = n.n(o);
      t["default"] = i.a
    },
    a442: function(e, t, n) {
      e.exports = {
        abox1: "HeaderComment_abox1_3NQGO",
        gap1: "HeaderComment_gap1_lwqoW",
        gap2: "HeaderComment_gap2_2LTn9",
        tit1: "HeaderComment_tit1_2K9J1",
        help: "HeaderComment_help_3dW5X",
        tit2: "HeaderComment_tit2_22BrC",
        text1: "HeaderComment_text1_3v-d7",
        linkb: "HeaderComment_linkb_1OySQ"
      }
    },
    cac3: function(e, t, n) {
      "use strict";
      n.r(t);
      var o = function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {
            class: e.$style.abox1
          }, [n("woo-box", {
            class: e.$style.gap1,
            attrs: {
              align: "center"
            }
          }, [n("div", {
            class: e.$style.tit1
          }, [e._v(e._s(e.comment.title))]), e.comment.pop ? n("Action", {
            class: e.$style.help,
            attrs: {
              timeout: "300",
              direction: "down",
              width: "unset",
              title: e.comment.pop.title,
              desc: e.comment.pop.desc
            }
          }) : e._e()], 1), e._t("default"), e.isRss ? e._e() : n("woo-box", {
            class: e.$style.gap2,
            attrs: {
              align: "center",
              justify: "between"
            }
          }, [n("woo-box", {
            attrs: {
              align: "center"
            }
          }, [e.comment.sub_title ? n("div", {
            class: e.$style.tit2
          }, [e._v(" " + e._s(e.comment.sub_title) + " ")]) : e._e(), e.comment.icon ? n("woo-tip", {
            attrs: {
              type: e.comment.icon
            }
          }) : e._e(), n("div", {
            class: [e.$style.text1]
          }, [e._v(e._s(e.comment.desc))])], 1), e.isAudio && !e.showMoreDetail ? n("div", {
            class: e.$style.text1
          }, [e._v(" 想用其他账号发布？点击"), n("a", {
            class: e.$style.linkb,
            attrs: {
              href: "https://m.weibo.cn/cp/audio/guide?showmenu=0&topnavstyle=1&immersiveScroll=100",
              target: "_blank"
            }
          }, [e._v("申请入驻")])]) : e._e()], 1)], 2)
        },
        i = [],
        s = (n("c111"), n("489c")),
        a = n("f85b"),
        c = n("8e18"),
        l = {
          props: {
            showMoreDetail: {
              default: !1
            },
            videoDescInfo: {
              type: Object,
              default: function() {
                return {}
              }
            },
            definition: [Number, String]
          },
          setup: function(e) {
            var t = Object(c["a"])(),
              n = t.isAudio,
              o = t.isRss,
              i = Object(a["a"])((function() {
                var t;
                return e.definition && e.videoDescInfo.dimensions ? e.definition >= e.videoDescInfo.dimensions ? e.videoDescInfo.positive : e.videoDescInfo.negative : null === e || void 0 === e || null === (t = e.videoDescInfo) || void 0 === t ? void 0 : t.uploadTips
              })),
              s = Object(a["a"])((function() {
                return e.definition && e.videoDescInfo.dimensions ? e.definition >= e.videoDescInfo.dimensions ? "warn" : "error" : ""
              })),
              l = Object(a["a"])((function() {
                return n.value ? {
                  title: "发布音频",
                  sub_title: "本地上传",
                  desc: "请上传1GB以下，10秒以上的普通话/英文音频",
                  pop: {
                    title: "疑问咨询",
                    desc: "发布遇到问题，联系<a href='https://weibo.com/u/3860143361' target='_blank'>@微博音频</a>"
                  }
                } : {
                  title: "上传视频",
                  desc: i.value,
                  icon: s.value
                }
              }));
            return {
              isAudio: n,
              comment: l,
              isRss: o
            }
          },
          watch: {
            videoDescInfo: {
              handler: function(e) {},
              deep: !0
            }
          },
          components: {
            Action: s["default"]
          },
          data: function() {
            return {
              showPop: !1
            }
          }
        },
        d = l,
        r = n("96b6"),
        u = n("04a2");

      function m(e) {
        this["$style"] = r["default"].locals || r["default"]
      }
      var p = Object(u["a"])(d, o, i, !1, m, null, null);
      t["default"] = p.exports
    }
  }
]);
