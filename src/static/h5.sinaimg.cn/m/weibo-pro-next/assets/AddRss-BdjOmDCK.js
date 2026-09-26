const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/index-Xve1TSN5.js", "assets/index-BQia-I5S.css", "assets/Rss-DumkFQ4H.js", "assets/Rss-Cjv8Ptq2.css"]))) => i.map(i => d[i]);
var m = (s, n, r) => new Promise((e, d) => {
  var g = c => {
      try {
        i(r.next(c))
      } catch ($) {
        d($)
      }
    },
    h = c => {
      try {
        i(r.throw(c))
      } catch ($) {
        d($)
      }
    },
    i = c => c.done ? e(c.value) : Promise.resolve(c.value).then(g, h);
  i((r = r.apply(s, n)).next())
});
import {
  _ as T,
  al as V,
  ah as F,
  x as D,
  r as B,
  aO as z,
  b as H,
  g as G,
  l as p,
  h as M,
  D as j,
  i as k,
  C as l,
  m as S,
  n as t,
  B as o,
  p as a,
  U as f,
  af as K,
  E as O,
  aP as Y,
  aL as Z,
  G as J,
  H as Q,
  ac as W,
  A as X
} from "./index-Xve1TSN5.js";
import x from "./CoCreation-BO8TQ9jh.js";
const ss = "_layer_rnh9p_2",
  ts = "_close_rnh9p_11",
  ns = "_tit_rnh9p_20",
  es = "_t1_rnh9p_27",
  os = "_t2_rnh9p_36",
  ls = "_fb_rnh9p_43",
  as = "_btn_rnh9p_48",
  is = "_btn2_rnh9p_54",
  rs = "_ipt_rnh9p_61",
  cs = "_step_rnh9p_66",
  ds = "_sn_rnh9p_71",
  us = "_st_rnh9p_66",
  ps = "_sl_rnh9p_85",
  fs = "_step1_rnh9p_91",
  _s = "_step2_rnh9p_92",
  ys = "_step3_rnh9p_94",
  bs = "_card_rnh9p_121",
  vs = "_screenshotInput_rnh9p_125",
  ms = {
    layer: ss,
    close: ts,
    tit: ns,
    t1: es,
    t2: os,
    fb: ls,
    btn: as,
    btn2: is,
    ipt: rs,
    step: cs,
    sn: ds,
    st: us,
    sl: ps,
    step1: fs,
    step2: _s,
    step3: ys,
    card: bs,
    screenshotInput: vs
  },
  gs = {
    props: {
      visible: {
        type: Boolean,
        default: !1
      },
      info: {
        type: Object
      }
    },
    emits: ["close", "bind-success", "updateAutoPublish"],
    setup(s, {
      emit: n
    }) {
      const {
        proxy: r
      } = D(), e = B(1), d = z({
        input: "",
        podcastInfo: {},
        loading: !1
      }), g = B(null), h = H(() => !d.input.trim()), i = v => m(this, null, function*() {
        d.loading = !0;
        const y = yield r.$http.get("/ajax/multimedia/checkRssValid", {
          params: {
            rss_url: v
          }
        });
        return d.loading = !1, y.data.ok > 0 ? y.data.data.result : !1
      }), c = v => m(this, null, function*() {
        const y = yield r.$http.get("/ajax/multimedia/getRssInfoBrief", {
          params: {
            rssUrl: v
          }
        });
        return y.data.ok > 0 ? y.data.data.result : {}
      }), $ = () => {
        n("bind-success"), K(() => {
          d.input = "", d.podcastInfo = {}, e.value = 1
        })
      }, A = v => m(this, null, function*() {
        switch (v) {
          case 2: {
            if (yield i(d.input)) {
              e.value += 1;
              const U = yield c(d.input);
              d.podcastInfo = U
            }
            break
          }
          case 3:
            e.value += 1;
            break
        }
      }), w = () => {
        e.value -= 1
      }, _ = v => m(this, null, function*() {
        d.loading = !0, g.value.removeEventListener("change", _);
        try {
          const y = new FormData;
          y.append("file", v.target.files[0]);
          const U = yield r.$http.post("/ajax/multimedia/fileUpload", y), L = yield r.$http.post("/ajax/multimedia/rssAuditSubmit", {
            rssUrl: d.input,
            pid: U.data.data.name,
            auto_publish: s.info.is_auto_publish ? 1 : 0
          });
          L.data.ok > 0 && L.data.data && A(3)
        } catch (y) {
          console.warn(y)
        }
        d.loading = !1
      }), I = () => {
        g.value.addEventListener("change", _), g.value.click()
      }, u = v => {
        n("updateAutoPublish", v)
      };
      return G(() => {
        var v;
        (v = g.value) == null || v.removeEventListener("change", _)
      }), {
        step: e,
        rssForm: d,
        onNext: A,
        onPrev: w,
        disableRssUrl: h,
        screenshotRef: g,
        onUploadScreenshot: I,
        onBindSuccess: $,
        changeAuto: u
      }
    },
    components: {
      AudioCard: V(() => F(() => import("./index-Xve1TSN5.js").then(s => s.aY), __vite__mapDeps([0, 1]))),
      Rss: V(() => F(() => import("./Rss-DumkFQ4H.js"), __vite__mapDeps([2, 0, 1, 3])))
    }
  };

function hs(s, n, r, e, d, g) {
  const h = p("woo-fonticon"),
    i = p("woo-box"),
    c = p("woo-box-item"),
    $ = p("woo-input"),
    A = p("Rss"),
    w = p("woo-button"),
    _ = p("AudioCard"),
    I = p("woo-modal");
  return r.visible ? (k(), M(I, {
    key: 0,
    show: r.visible,
    lockScreen: ""
  }, {
    default: l(() => [+e.step == 1 ? (k(), S("div", {
      key: 0,
      class: t(s.$style.layer)
    }, [o(h, {
      value: "cross",
      class: t(s.$style.close),
      onClick: n[0] || (n[0] = u => s.$emit("close"))
    }, null, 8, ["class"]), o(i, {
      align: "center",
      class: t([s.$style.step, s.$style.step1])
    }, {
      default: l(() => [o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[4] || (n[4] = [f(" 1 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 输入地址 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[5] || (n[5] = [f(" 2 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 上传截图 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[6] || (n[6] = [f(" 3 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 提交成功 ", 2)]),
        _: 1
      })]),
      _: 1
    }, 8, ["class"]), a("h3", {
      class: t(s.$style.tit)
    }, " 输入RSS地址 ", 2), a("div", {
      class: t(s.$style.t1)
    }, " 告诉我们您其他平台音频的RSS地址，我们可以获取您其他平台的音频内容，经由您选择和确认后，再重新发布至微博。 ", 2), o($, {
      modelValue: e.rssForm.input,
      "onUpdate:modelValue": n[1] || (n[1] = u => e.rssForm.input = u),
      placeholder: "请输入RSS地址",
      class: t(s.$style.ipt)
    }, null, 8, ["modelValue", "class"]), a("div", {
      class: t(s.$style.t2)
    }, " 一个RSS地址只能绑定一个微博账号，如您的节目存在多个主播，建议绑定至主要账号 ", 2), o(A, {
      styleType: "inLayer",
      auto: r.info.is_auto_publish,
      onChangeAuto: e.changeAuto
    }, null, 8, ["auto", "onChangeAuto"]), o(i, {
      direction: "y",
      align: "center",
      justify: "center",
      class: t(s.$style.btn)
    }, {
      default: l(() => [o(w, {
        sort: "flat",
        kind: "primary",
        loading: e.rssForm.loading,
        disabled: e.disableRssUrl || e.rssForm.loading,
        onClick: n[2] || (n[2] = u => e.onNext(2))
      }, {
        default: l(() => n[7] || (n[7] = [f(" 下一步 ")])),
        _: 1
      }, 8, ["loading", "disabled"])]),
      _: 1
    }, 8, ["class"])], 2)) : j("", !0), +e.step == 2 ? (k(), S("div", {
      key: 1,
      class: t(s.$style.layer)
    }, [o(h, {
      value: "cross",
      class: t(s.$style.close),
      onClick: n[3] || (n[3] = u => s.$emit("close"))
    }, null, 8, ["class"]), o(i, {
      align: "center",
      class: t([s.$style.step, s.$style.step2])
    }, {
      default: l(() => [o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[8] || (n[8] = [f(" 1 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 输入地址 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[9] || (n[9] = [f(" 2 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 上传截图 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[10] || (n[10] = [f(" 3 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 提交成功 ", 2)]),
        _: 1
      })]),
      _: 1
    }, 8, ["class"]), a("h3", {
      class: t(s.$style.tit)
    }, " 上传后台截图 ", 2), e.rssForm.podcastInfo.title ? (k(), M(_, {
      key: 0,
      class: t(s.$style.card),
      cover: e.rssForm.podcastInfo.image_url,
      textA: e.rssForm.podcastInfo.title,
      textB: `主播：${e.rssForm.podcastInfo.author}`,
      textC: `关联邮箱：${e.rssForm.podcastInfo.email||""}`
    }, null, 8, ["class", "cover", "textA", "textB", "textC"])) : j("", !0), a("div", {
      class: t(s.$style.t1)
    }, " 确信节目信息无误后，请上传一张托管后台的截图来证明你对节目的所有权 ", 2), a("div", {
      class: t(s.$style.t2)
    }, " 为了保护隐私你可以将敏感信息打码，但是需要保证节目名、账号名等信息清晰可见，以帮助我们判断 ", 2), o(i, {
      direction: "y",
      align: "center",
      justify: "center",
      class: t(s.$style.btn)
    }, {
      default: l(() => [o(w, {
        sort: "flat",
        kind: "primary",
        disabled: e.rssForm.loading,
        loading: e.rssForm.loading,
        onClick: e.onUploadScreenshot
      }, {
        default: l(() => n[11] || (n[11] = [f(" 上传截图 ")])),
        _: 1
      }, 8, ["disabled", "loading", "onClick"]), a("input", {
        ref: "screenshotRef",
        accept: ".jpg, .jpeg, .png",
        type: "file",
        class: t(s.$style.screenshotInput)
      }, null, 2), o(w, {
        sort: "simple",
        kind: "default",
        fonticon: "angleLeft",
        class: t(s.$style.btn2),
        onClick: e.onPrev
      }, {
        default: l(() => n[12] || (n[12] = [f(" 上一步 ")])),
        _: 1
      }, 8, ["class", "onClick"])]),
      _: 1
    }, 8, ["class"])], 2)) : j("", !0), +e.step == 3 ? (k(), S("div", {
      key: 2,
      class: t(s.$style.layer)
    }, [o(h, {
      value: "cross",
      class: t(s.$style.close),
      onClick: e.onBindSuccess
    }, null, 8, ["class", "onClick"]), o(i, {
      align: "center",
      class: t([s.$style.step, s.$style.step3])
    }, {
      default: l(() => [o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[13] || (n[13] = [f(" 1 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 输入地址 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[14] || (n[14] = [f(" 2 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 上传截图 ", 2)]),
        _: 1
      }), o(c, null, {
        default: l(() => [a("div", {
          class: t(s.$style.sl)
        }, null, 2)]),
        _: 1
      }), o(i, {
        direction: "y",
        align: "center"
      }, {
        default: l(() => [o(i, {
          align: "center",
          justify: "center",
          class: t(s.$style.sn)
        }, {
          default: l(() => n[15] || (n[15] = [f(" 3 ")])),
          _: 1
        }, 8, ["class"]), a("div", {
          class: t(s.$style.st)
        }, " 提交成功 ", 2)]),
        _: 1
      })]),
      _: 1
    }, 8, ["class"]), a("h3", {
      class: t(s.$style.tit)
    }, " 提交成功 ", 2), a("div", {
      class: t(s.$style.t1)
    }, n[16] || (n[16] = [f(" 请耐心等待审核结果，审核结果会在2个工作日内通过私信发送给你，请留意来自 "), a("a", {
      href: "https://weibo.com/u/3860143361",
      target: "_blank"
    }, "@微博音频", -1), f("的私信。 ")]), 2), o(i, {
      direction: "y",
      align: "center",
      justify: "center",
      class: t(s.$style.btn)
    }, {
      default: l(() => [o(w, {
        sort: "flat",
        kind: "primary",
        onClick: e.onBindSuccess
      }, {
        default: l(() => n[17] || (n[17] = [f(" 知道了 ")])),
        _: 1
      }, 8, ["onClick"])]),
      _: 1
    }, 8, ["class"])], 2)) : j("", !0)]),
    _: 1
  }, 8, ["show"])) : j("", !0)
}
const $s = {
    $style: ms
  },
  Cs = T(gs, [
    ["render", hs],
    ["__cssModules", $s]
  ]),
  ks = "_layer_hgif1_2",
  ws = "_close_hgif1_10",
  Rs = "_tit_hgif1_18",
  As = "_t1center_hgif1_24",
  Ss = "_t1_hgif1_24",
  Bs = "_t2_hgif1_35",
  js = "_fb_hgif1_41",
  Is = "_btn_hgif1_45",
  Ps = "_btn1_hgif1_50",
  Us = "_btn1in_hgif1_54",
  Ls = "_svg_hgif1_58",
  Vs = {
    layer: ks,
    close: ws,
    tit: Rs,
    t1center: As,
    t1: Ss,
    t2: Bs,
    fb: js,
    btn: Is,
    btn1: Ps,
    btn1in: Us,
    svg: Ls
  },
  Fs = {
    emits: ["bind", "bind-other", "close", "update:info"],
    setup(s, {
      emit: n
    }) {
      return {
        changeAuto: e => {
          const d = s.info;
          d.is_auto_publish = e, n("update:info", d)
        }
      }
    },
    components: {
      Rss: V(() => F(() => import("./Rss-DumkFQ4H.js"), __vite__mapDeps([2, 0, 1, 3]))),
      Icons: V(() => F(() => import("./index-Xve1TSN5.js").then(s => s.aZ), __vite__mapDeps([0, 1])))
    },
    props: {
      isSuccess: {
        type: Boolean,
        default: !1
      },
      visible: {
        type: Boolean,
        default: !1
      },
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  },
  Ms = ["href"];

function Ts(s, n, r, e, d, g) {
  const h = p("woo-fonticon"),
    i = p("Rss"),
    c = p("woo-button"),
    $ = p("woo-box"),
    A = p("Icons"),
    w = p("woo-modal");
  return r.visible ? (k(), M(w, {
    key: 0,
    show: r.visible,
    lockScreen: ""
  }, {
    default: l(() => [r.isSuccess ? (k(), S("div", {
      key: 1,
      class: t(s.$style.layer)
    }, [o(A, {
      symbol: "rsssuccess",
      class: t(s.$style.svg)
    }, null, 8, ["class"]), a("h3", {
      class: t(s.$style.tit)
    }, " 提交成功 ", 2), a("div", {
      class: t([s.$style.t1, s.$style.t1center])
    }, " 该专辑下的所有音频，以及未来新发布的音频，都会在微博上自动发布，且最新一期会以博文形式发布 ", 2), o($, {
      direction: "y",
      align: "center",
      justify: "center",
      class: t(s.$style.btn)
    }, {
      default: l(() => [o(c, {
        sort: "flat",
        kind: "primary",
        onClick: n[3] || (n[3] = _ => s.$emit("close"))
      }, {
        default: l(() => n[7] || (n[7] = [f(" 知道了 ")])),
        _: 1
      })]),
      _: 1
    }, 8, ["class"])], 2)) : (k(), S("div", {
      key: 0,
      class: t(s.$style.layer)
    }, [o(h, {
      value: "cross",
      class: t(s.$style.close),
      onClick: n[0] || (n[0] = _ => s.$emit("close"))
    }, null, 8, ["class"]), a("h3", {
      class: t(s.$style.tit)
    }, " 确定绑定RSS地址 ", 2), a("div", {
      class: t(s.$style.t1)
    }, [f(" 已准备好您的节目《" + O(r.info.title) + "》的RSS地址，是否要绑定该地址？ ", 1), n[4] || (n[4] = a("br", null, null, -1)), a("a", {
      href: r.info.rss_url,
      target: "_blank"
    }, O(r.info.rss_url), 9, Ms), n[5] || (n[5] = a("br", null, null, -1))], 2), a("div", {
      class: t(s.$style.t2)
    }, " 一个RSS地址只能绑定一个微博账号，如您的节目存在多个主播，建议绑定至主要账号 ", 2), o(i, {
      styleType: "inLayer",
      auto: r.info.is_auto_publish,
      onChangeAuto: e.changeAuto
    }, null, 8, ["auto", "onChangeAuto"]), o($, {
      direction: "y",
      align: "center",
      justify: "center",
      class: t(s.$style.btn)
    }, {
      default: l(() => [o(c, {
        sort: "flat",
        kind: "primary",
        onClick: n[1] || (n[1] = _ => s.$emit("bind", r.info))
      }, {
        default: l(() => n[6] || (n[6] = [f(" 绑定，这是我的节目地址 ")])),
        _: 1
      }), a("div", {
        class: t(s.$style.btn1)
      }, [o(c, {
        sort: "simple",
        kind: "default",
        onClick: n[2] || (n[2] = _ => s.$emit("bind-other"))
      }, {
        default: l(() => [a("span", {
          class: t(s.$style.btn1in)
        }, "绑定其他地址", 2)]),
        _: 1
      })], 2)]),
      _: 1
    }, 8, ["class"])], 2))]),
    _: 1
  }, 8, ["show"])) : j("", !0)
}
const Es = {
    $style: Vs
  },
  Os = T(Fs, [
    ["render", Ts],
    ["__cssModules", Es]
  ]),
  Ds = "_gap1_vl5ac_3",
  Ns = "_help_vl5ac_7",
  qs = "_helppop1_vl5ac_12",
  zs = "_popc_vl5ac_16",
  Hs = "_helppop2_vl5ac_20",
  Gs = "_helppop3_vl5ac_24",
  Ks = "_qa_vl5ac_28",
  Ys = "_tit2_vl5ac_40",
  Zs = "_top1_vl5ac_50",
  Js = "_linkb_vl5ac_57",
  Qs = "_fm_vl5ac_61",
  Ws = "_cardbox_vl5ac_67",
  Xs = "_uploadbox_vl5ac_73",
  xs = "_uploadtip_vl5ac_81",
  st = "_icon_vl5ac_91",
  tt = "_pop_vl5ac_16",
  nt = "_btn_vl5ac_101",
  et = {
    gap1: Ds,
    help: Ns,
    helppop1: qs,
    popc: zs,
    helppop2: Hs,
    helppop3: Gs,
    qa: Ks,
    tit2: Ys,
    top1: Zs,
    linkb: Js,
    fm: Qs,
    cardbox: Ws,
    uploadbox: Xs,
    uploadtip: xs,
    icon: st,
    pop: tt,
    btn: nt
  },
  ot = {
    props: ["coCreateConfig", "audio"],
    components: {
      AudioCard: Z,
      AddRssModal: Cs,
      BindRssModal: Os,
      CoCreation: x,
      FeatureBubble: Y
    },
    setup() {
      const {
        proxy: s
      } = D(), {
        autoShowRss: n
      } = W(), r = B([]), e = B([]), d = B(!1), g = B(!1), h = B(!1), i = B({}), c = B(void 0), $ = () => m(this, null, function*() {
        const b = (yield _("candidate")) || [];
        r.value === "bind_confirm" ? d.value = !0 : r.value === "rss_list" ? (d.value = !0, i.value = b[0]) : g.value = !0
      }), A = () => {
        g.value = !1
      }, w = () => m(this, null, function*() {
        e.value = yield _(), A()
      });

      function _(b = "podcasts") {
        return m(this, null, function*() {
          const C = yield s.$http.get("/ajax/multimedia/rssPublishHome");
          if (C.data.ok > 0) {
            if (r.value = C.data.data.page_type, r.value === "bind_confirm") {
              const {
                rss_url: R,
                title: P,
                is_auto_publish: E
              } = C.data.data;
              i.value = {
                rss_url: R,
                title: P,
                is_auto_publish: E
              }
            } else if (r.value === "create") {
              const {
                is_auto_publish: R
              } = C.data.data;
              c.value = R
            }
            if (C.data.data[b]) return C.data.data[b]
          }
          return []
        })
      }
      const I = (...C) => m(this, [...C], function*(b = {}) {
          s.$_w_dialog({
            type: "confirm",
            title: "确认解绑该地址？",
            btnConfirm: "确认解绑",
            action: () => m(this, null, function*() {
              (yield s.$http.post("/ajax/multimedia/unbindAudioRss", {
                rssUrl: b.rss_url
              })).data.ok > 0 && (e.value = yield _())
            })
          })
        }),
        u = b => m(this, null, function*() {
          const {
            rss_url: C,
            is_auto_publish: R
          } = b, P = yield s.$http.post("/ajax/multimedia/bindAudioRss", {
            rss_url: C,
            auto_publish: R ? 1 : 0
          });
          P.data.ok > 0 && P.data.data && (e.value = yield _(), R ? h.value = !0 : (d.value = !1, s.$_w_toast({
            type: "success",
            message: "绑定成功"
          }))), i.value = {}
        }),
        v = () => {
          U()
        },
        y = () => {
          d.value = !1, h.value = !1
        };

      function U() {
        return m(this, null, function*() {
          if (c.value === void 0) {
            const b = yield s.$http.get("/ajax/multimedia/rssPublishHome", {
              params: {
                create: !0
              }
            });
            c.value = b.data.data.is_auto_publish
          }
          d.value = !1, g.value = !0, i.value = {}
        })
      }
      const L = (b, C) => {
          const R = {
            rss_url: b.rss_url
          };
          C && (R.hide = C), s.$router.push({
            name: "RssDetail",
            query: R
          })
        },
        N = (b, C) => {
          const R = C.rss_url;
          C.is_auto_publish = b;
          const P = () => m(this, null, function*() {
            (yield s.$http.post("/ajax/multimedia/changeAutoPub", {
              rss_url: R,
              enable: b ? 1 : 0
            })).data.ok > 0 && setTimeout(() => m(this, null, function*() {
              e.value = yield _()
            }), 3e3)
          });
          b ? P() : s.$_w_dialog({
            type: "confirm",
            title: "确认关闭「自动发布」么？关闭后，RSS有更新时需要手动发布。",
            btnConfirm: "确认关闭",
            btnCancel: "不关闭",
            action: () => m(this, null, function*() {
              P()
            }),
            cancel: () => {
              C.is_auto_publish = !0
            }
          })
        };

      function q(b) {
        c.value = b
      }
      return X(() => m(this, null, function*() {
        n.value && $(), e.value = yield _()
      })), {
        onBind: $,
        inputRssModalVisible: g,
        bindRssModalVisible: d,
        bindRssSuccess: h,
        rssList: e,
        isAutoPublish: c,
        onBindSuccess: w,
        onRssAutoChange: N,
        onClose: A,
        onRssUnbind: I,
        onRssPublish: L,
        bindRssInfo: i,
        onBindRss: u,
        onBindOther: U,
        onAddRss: v,
        onBindRssClose: y,
        pageType: r,
        handleUpdateAutoPublish: q
      }
    }
  };

function lt(s, n, r, e, d, g) {
  const h = p("FeatureBubble"),
    i = p("woo-button"),
    c = p("woo-box"),
    $ = p("AudioCard"),
    A = p("woo-divider"),
    w = p("CoCreation"),
    _ = p("BindRssModal"),
    I = p("AddRssModal");
  return k(), S("div", null, [a("div", null, [e.pageType === "bind_confirm" || e.pageType === "create" ? (k(), S("div", {
    key: 0,
    class: t(s.$style.uploadbox)
  }, [a("div", {
    class: t(s.$style.tit2)
  }, " RSS快捷导入 ", 2), o(c, {
    direction: "y",
    align: "center",
    justify: "center",
    class: t(s.$style.uploadtip)
  }, {
    default: l(() => [(k(), S("svg", {
      class: t(s.$style.icon),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 50 50",
      "aria-hidden": "true"
    }, n[1] || (n[1] = [a("circle", {
      cx: "13.275",
      cy: "36.3824",
      fill: "currentColor",
      r: "3.75"
    }, null, -1), a("g", {
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-width": "5"
    }, [a("path", {
      d: "m27.5079 37.6784c0-8.5738-6.9505-15.5242-15.5243-15.5242"
    }), a("path", {
      d: "m39.3939 37.145c0-14.8612-12.0474-26.9087-26.9087-26.9087"
    })], -1)]), 2)), a("div", {
      class: t(s.$style.tit2)
    }, " 已在其他平台发布？试试RSS地址快速导入内容发布至微博 ", 2), o(h, {
      direction: "up",
      align: "center",
      gap: "30",
      width: "160",
      content: "快来绑定你的RSS，自动同步音频",
      check: !1,
      exclusiveKey: ["mobile_can_audio"],
      configkey: "audio_bubble_bind",
      class: t(s.$style.pop)
    }, null, 8, ["class"]), o(c, {
      align: "center",
      direction: "y"
    }, {
      default: l(() => [o(i, {
        sort: "flat",
        kind: "primary",
        class: t(s.$style.btn),
        onClick: e.onBind
      }, {
        default: l(() => n[2] || (n[2] = [f(" 去绑定 ")])),
        _: 1
      }, 8, ["class", "onClick"])]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])], 2)) : j("", !0), e.rssList.length ? (k(), M(c, {
    key: 1,
    align: "center",
    justify: "between",
    class: t(s.$style.gap1)
  }, {
    default: l(() => [a("div", {
      class: t([s.$style.tit2, s.$style.fm])
    }, " 快捷导入 ", 2), a("div", {
      class: t(s.$style.linkb)
    }, [o(i, {
      sort: "simple",
      kind: "default",
      fonticon: "add",
      size: "xs",
      onClick: e.onAddRss
    }, {
      default: l(() => n[3] || (n[3] = [f(" 添加RSS地址 ")])),
      _: 1
    }, 8, ["onClick"])], 2)]),
    _: 1
  }, 8, ["class"])) : j("", !0), e.pageType === "rss_list" ? (k(), S("div", {
    key: 2,
    class: t([s.$style.top1])
  }, [(k(!0), S(J, null, Q(e.rssList, (u, v) => (k(), S("div", {
    key: v,
    class: t([s.$style.cardbox, s.$style.citem])
  }, [o($, {
    cardSize: "cardS",
    hasBtn: !0,
    cover: u.image_url,
    textA: u.title,
    textB: u.rss_url,
    text: u.desc || u.text,
    auto: u.is_auto_publish,
    pass: u.is_audit_pass,
    publishing: u.is_publishing,
    showTip: v === 0,
    onAuto: y => e.onRssAutoChange(y, u),
    onUnbind: y => e.onRssUnbind(u),
    onPublish: y => e.onRssPublish(u, y)
  }, null, 8, ["cover", "textA", "textB", "text", "auto", "pass", "publishing", "showTip", "onAuto", "onUnbind", "onPublish"]), o(A, {
    "border-color": "var(--w-card-border)",
    class: t(s.$style.cline)
  }, null, 8, ["class"]), a("div", null, [o(w, {
    coCreationList: u.co_creation_list,
    showTitle: !1,
    audio: u,
    coCreateConfig: r.coCreateConfig
  }, null, 8, ["coCreationList", "audio", "coCreateConfig"])])], 2))), 128))], 2)) : j("", !0)]), o(_, {
    info: e.bindRssInfo,
    "onUpdate:info": n[0] || (n[0] = u => e.bindRssInfo = u),
    visible: e.bindRssModalVisible,
    isSuccess: e.bindRssSuccess,
    onClose: e.onBindRssClose,
    onBind: e.onBindRss,
    onBindOther: e.onBindOther
  }, null, 8, ["info", "visible", "isSuccess", "onClose", "onBind", "onBindOther"]), o(I, {
    visible: e.inputRssModalVisible,
    info: {
      is_auto_publish: e.isAutoPublish
    },
    onBindSuccess: e.onBindSuccess,
    onClose: e.onClose,
    onUpdateAutoPublish: e.handleUpdateAutoPublish
  }, null, 8, ["visible", "info", "onBindSuccess", "onClose", "onUpdateAutoPublish"])])
}
const at = {
    $style: et
  },
  dt = T(ot, [
    ["render", lt],
    ["__cssModules", at]
  ]);
export {
  dt as
  default
};
