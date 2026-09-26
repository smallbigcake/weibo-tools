const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/UploadSrt-DqkZOhkg.js", "assets/index-Xve1TSN5.js", "assets/index-BQia-I5S.css", "assets/UploadSrt-U4ZBkwpD.css", "assets/VideoUpload-CUYNiaHl.js", "assets/VideoUpload-UsKzmGBW.css", "assets/Sort-D31SHdq3.js", "assets/Sort-Du9eDwOL.css", "assets/VideoEdit-C2M37YsN.js", "assets/VideoEdit-DsjNyC0Z.css", "assets/CoCreation-BO8TQ9jh.js", "assets/CoCreation-HKftH6qI.css", "assets/HighlightPreload-DPM4KGxb.js", "assets/HighlightPreload-NG9BPyAZ.css", "assets/HeaderComment-DxATBkq0.js", "assets/HeaderComment-Ds5EjNH3.css", "assets/Success-Blx_A82R.js", "assets/Success-DNAUkz1s.css", "assets/AutoState-COGt7oMw.js", "assets/AutoState-DJsVdNV0.css", "assets/Type-B0t91pNC.js", "assets/Type-BQus3jjr.css", "assets/Title-D1LUYl8Y.js", "assets/Title-DhJDaZ76.css", "assets/OriginalVideoRelation-DcjIy00B.js", "assets/OriginalVideoRelation-BkwEAJo1.css", "assets/VideoHighlightEntry-T1UaM_rh.js", "assets/VideoHighlightEntry-Bzs41HN2.css"]))) => i.map(i => d[i]);
var nl = Object.defineProperty,
  ul = Object.defineProperties;
var rl = Object.getOwnPropertyDescriptors;
var jt = Object.getOwnPropertySymbols;
var dl = Object.prototype.hasOwnProperty,
  cl = Object.prototype.propertyIsEnumerable;
var Nt = (d, $, S) => $ in d ? nl(d, $, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: S
  }) : d[$] = S,
  te = (d, $) => {
    for (var S in $ || ($ = {})) dl.call($, S) && Nt(d, S, $[S]);
    if (jt)
      for (var S of jt($)) cl.call($, S) && Nt(d, S, $[S]);
    return d
  },
  Ne = (d, $) => ul(d, rl($));
var qt = (d, $, S) => new Promise((Je, $e) => {
  var Ge = h => {
      try {
        le(S.next(h))
      } catch (W) {
        $e(W)
      }
    },
    Qe = h => {
      try {
        le(S.throw(h))
      } catch (W) {
        $e(W)
      }
    },
    le = h => h.done ? Je(h.value) : Promise.resolve(h.value).then(Ge, Qe);
  le((S = S.apply(d, $)).next())
});
import {
  s as vl,
  t as pl,
  v as hl,
  y as fl,
  u as _l,
  b as g,
  ac as ml,
  r as n,
  aB as yl,
  a as Ie,
  af as Ua,
  ad as gl,
  ae as bl,
  at as At,
  au as Ft,
  as as R,
  aA as wl,
  w as fa,
  o as Cl,
  g as Vl,
  A as kl,
  V as at,
  ag as Kt,
  ax as Wt,
  ay as Il,
  aw as $l,
  az as Sl,
  ai as Tl,
  av as ql,
  aj as Al,
  ak as Dl,
  d as Pl,
  z as Rl,
  l as Fe,
  m as K,
  i as b,
  n as r,
  k as a,
  B as s,
  O as Ke,
  h as L,
  D as I,
  al as A,
  P as La,
  p as _,
  T as xa,
  G as Dt,
  C as m,
  U as Jt,
  E as tt,
  ao as El,
  am as We,
  H as Ol,
  aq as Ul,
  ar as Ll,
  ah as D,
  _ as xl
} from "./index-Xve1TSN5.js";
import {
  u as Ml,
  s as zl,
  a as Bl
} from "./useOriginalVideoRelation-P9OUk3Jy.js";

function Hl(d) {
  return typeof d != "string" ? Ne(te({}, d), {
    source: 1
  }) : {
    url: d,
    source: 1
  }
}

function jl() {
  const d = vl(),
    $ = pl(),
    S = hl(),
    Je = fl(),
    $e = _l(),
    Ge = g(() => S.getters.config),
    Qe = {
      $nextTick: Ua,
      $http: Ie,
      $_w_toast: e => Je.show(e),
      $_w_dialog: e => $e.show(e),
      $route: d,
      $router: $
    },
    le = ml(),
    h = Ml(),
    W = le.isEdit,
    fe = le.entry,
    Ma = le.hasnav,
    Xe = n(d.query.oid || ""),
    Ye = n(["0", "1", "2", "3"]),
    za = yl(Qe),
    lt = gl(),
    ot = bl(za.videoScroll, Qe, Ye, Xe.value),
    {
      checkAlbum: J,
      checkAddAlbum: _a,
      addAlbumObj: Se,
      albumList: Ze,
      albumIds: Te,
      addAlbum: st,
      addAlbumEnter: G,
      checkAlbumRef: it,
      addAlbumInput: Ba,
      videoScroll: oe
    } = za,
    {
      channelText: Ha,
      channelList: ja,
      category: ea,
      channel_ids: qe,
      showChannel: Na,
      play_config: Fa,
      allowClip: se,
      checkAllowDownload: aa,
      showAllowDownload: ma,
      material_permission: Ka,
      biz_type: Wa,
      coCreateConfig: ya,
      statementConfig: ta,
      videoAssociateInfo: Ja,
      maxFileSize: nt,
      videoDescInfo: ut,
      modifyChannel: ga,
      channelListInit: la,
      videoSort: oa
    } = ot,
    {
      title: ie,
      doneDisabled: _e
    } = lt,
    ne = n(null),
    Ae = n(null),
    Ga = n(null),
    Q = n(!1),
    De = n(1),
    H = n(!1),
    ba = n(""),
    wa = n(void 0),
    ue = n(!1),
    me = n(!1),
    j = n(!1),
    y = n({
      url: "",
      pid: ""
    }),
    N = n([]),
    X = n(void 0),
    V = n(void 0),
    T = n({}),
    sa = n(!0),
    Ca = n(!1),
    ye = n(void 0),
    re = n(void 0),
    Pe = n(void 0),
    B = n({}),
    Re = n(!1),
    Va = n(!1),
    ka = n(void 0),
    ia = n(0),
    Ia = n(!1),
    na = n(""),
    ge = n(!1),
    be = n(!1),
    Y = n(null),
    we = n(""),
    ua = n(!0),
    Ce = n(null),
    Ee = n([]),
    ra = n([]),
    E = n(""),
    de = n([]),
    x = n(""),
    Z = n(void 0),
    Ve = n(!1),
    Oe = n(0),
    da = n(!0),
    ca = n(At(d.query) === Ft),
    M = n(""),
    Ue = n(""),
    ee = n(""),
    O = n(0),
    ce = n([]),
    $a = n(!0),
    Le = n(void 0),
    Sa = g(() => !!d.query.media_id),
    Qa = g(() => se.value !== void 0),
    Ta = g(() => R(d.query.association_mid) || ""),
    rt = g(() => wl(d.query)),
    xe = g(() => {
      var e;
      return ((e = rt.value) == null ? void 0 : e.originalMediaId) || ""
    }),
    Me = g(() => !!(Ta.value || xe.value) && !Z.value),
    ze = g(() => xe.value ? xe.value : Ta.value ? `https://weibo.com/detail/${encodeURIComponent(Ta.value)}` : ""),
    Be = g(() => Me.value || zl({
      isAudio: !1,
      isPanorama: Z.value,
      videoAssociateInfo: Ja.value
    })),
    dt = g(() => !!Y.value || !!we.value),
    ct = g(() => T.value && T.value.media_id || ""),
    vt = g(() => [T.value, B.value].filter(Boolean).some(t => t.unsupported_format === !0 || t.isUnsupportedFormat === !0 || t.playable === !1 || t.is_playable === !1 || t.support_play === !1 || t.play_support === !1)),
    pt = g(() => !H.value && V.value !== void 0),
    ht = g(() => V.value !== !0 ? "自动发布" : W.value ? "确认更改" : "发布"),
    ae = g(() => ta.value || {}),
    ft = g(() => ae.value.statement_title || "内容声明"),
    va = g(() => !!ae.value.statement_required),
    _t = g(() => !!ae.value.statement_show),
    mt = g(() => {
      var e;
      return ((e = ae.value.default_requiredItem) == null ? void 0 : e.id) || ""
    }),
    yt = g(() => Array.isArray(ae.value.default_optionalItems) ? ae.value.default_optionalItems.map(e => e.id).filter(Boolean) : []),
    qa = g(() => {
      const e = ae.value.confirm_toast || "请选择内容声明";
      return va.value && !e.includes("必填") ? `${e}（必填）` : e
    }),
    ve = g(() => Ee.value.find(e => e.value === E.value)),
    Aa = g(() => {
      var l, i;
      const t = (((l = ve.value) == null ? void 0 : l.textfield_placeholder) || "").match(/最少\s*(\d+)\s*个字|(\d+)\s*characters?/i);
      return t ? Number(t[1] || t[2]) : ((i = ve.value) == null ? void 0 : i.textfield_min_length) || 0
    }),
    gt = g(() => {
      if (!E.value) return qa.value;
      const e = Ee.value.find(t => t.value === E.value);
      return e ? e.textfield && x.value ? `${e.label}：${x.value}` : e.label : qa.value
    }),
    Da = g(() => {
      var e;
      return !!(Be.value && h.enabled.value && h.status.value !== "success" || X.value === void 0 || va.value && !E.value || (e = ve.value) != null && e.textfield && x.value.trim().length < Aa.value || _e.value || ne.value && ne.value.status === "upload" || j.value && !qe.value)
    }),
    Xa = g(() => j.value && !qe.value ? !1 : !!V.value),
    z = e => Je.show(e),
    bt = e => $e.show(e),
    pa = (e, t = "") => {
      Kt({
        act_code: 5447,
        ext: `channel:pc|state:${e}${t?`|failreason:${t}`:""}`
      })
    };
  let pe = !0;
  const ha = () => {
      pe = !0, Ce.value && (clearTimeout(Ce.value), Ce.value = null)
    },
    Ya = () => {
      Ua(() => {
        oe.value && (oe.value.scrollTop = oe.value.scrollHeight)
      })
    },
    Za = e => {
      e && (Ee.value = (e.requiredItems || []).map(t => ({
        label: t.title,
        value: t.id,
        textfield: t.textfield,
        textfield_placeholder: t.textfield_placeholder,
        textfield_min_length: t.textfield_min_length,
        textfield_max_length: t.textfield_max_length
      })), ra.value = (e.optionalItems || []).map(t => ({
        label: t.title,
        value: t.id
      })))
    },
    wt = () => {
      be.value = !0
    },
    Ct = () => {
      be.value = !1
    },
    Vt = e => {
      Y.value = e, be.value = !1, z({
        type: "success",
        message: "字幕上传成功"
      })
    },
    kt = () => {
      Y.value = null, we.value = ""
    },
    It = e => {
      X.value = e
    },
    $t = e => {
      Le.value = e
    },
    o = e => {
      Ve.value = e, e && (da.value = !0)
    },
    v = ({
      type: e
    }) => {
      var t;
      e === "update" && window.history.replaceState({
        current: ((t = window.history.state) == null ? void 0 : t.current) || ""
      }, "", "/upload/channel")
    },
    ke = () => {
      z({
        type: "warn",
        message: "此合集内视频数量已达上限，请新建合集再添加视频"
      })
    },
    q = () => {
      var e, t;
      X.value === void 0 ? (window.scroll(0, 0), z({
        type: "warn",
        message: "请选择类型后再发布"
      })) : va.value && !E.value ? (pa("fail", "statement"), window.scroll(0, 0), z({
        type: "warn",
        message: "请添加内容声明"
      })) : (e = ve.value) != null && e.textfield && x.value.trim().length < Aa.value ? (pa("fail", "statement"), window.scroll(0, 0), z({
        type: "warn",
        message: ((t = ve.value) == null ? void 0 : t.textfield_placeholder) || "请输入转载来源"
      })) : Be.value && h.enabled.value && h.status.value !== "success" && z({
        type: "warn",
        message: "请先关联原视频"
      })
    },
    Pa = e => {
      me.value = !0, e === "upload" && Ua(() => {
        var t;
        (t = Ga.value) == null || t.$refs.file.click()
      })
    },
    w = () => {
      var l, i, c, u, f;
      const e = Array.isArray(Ae.value) ? Ae.value[0] : Ae.value,
        t = [e == null ? void 0 : e.$el, (i = (l = e == null ? void 0 : e.$refs) == null ? void 0 : l.form) == null ? void 0 : i.$el, (f = (u = (c = e == null ? void 0 : e.$refs) == null ? void 0 : c.form) == null ? void 0 : u.$refs) == null ? void 0 : f.form].find(C => typeof(C == null ? void 0 : C.scrollIntoView) == "function");
      t && t.scrollIntoView({
        behavior: "smooth"
      })
    },
    he = (e = []) => e.map(t => `${t.time} ${t.text}`.trim()).filter(Boolean).join(`
`),
    He = (e = "") => Wt(e, ee.value) || Il(e, O.value),
    et = () => {
      if (!O.value) return [];
      const e = He(M.value || ""),
        t = (e == null ? void 0 : e.spotlightLines) || (e == null ? void 0 : e.blockLines);
      return (e == null ? void 0 : e.spotlights) || (t == null ? void 0 : t.map(l => Sl(l))) || []
    },
    p = (e = "") => {
      if (!O.value) return;
      const t = He(e);
      if (t) {
        const l = t.spotlightLines || t.blockLines || [];
        ee.value = l.join(`
`), ce.value = l.map(i => {
          const c = i.trim(),
            u = c.search(/\s/);
          return {
            time: c.slice(0, u),
            text: c.slice(u).trim()
          }
        });
        return
      }
      ee.value = "", O.value = 0, ce.value = []
    },
    Ra = (e = "") => {
      const t = Wt(e, ee.value);
      if (!t) return e;
      const l = t.blockLines || t.spotlightLines || [];
      return t.lines.splice(t.startIndex, l.length), t.lines.join(`
`)
    },
    je = () => {
      M.value = Ra(M.value || ""), ce.value = [], ee.value = "", O.value = 0
    },
    Ea = () => {
      Ue.value && (URL.revokeObjectURL(Ue.value), Ue.value = "")
    },
    Gt = e => {
      const t = e.map(f => ({
          time: f.time,
          text: f.text
        })),
        l = he(t),
        i = M.value || "",
        c = He(i),
        u = Ra(i);
      if (ce.value = t, ee.value = l, O.value = t.length, l)
        if (c) {
          const f = u.split(`
`),
            C = Math.min(c.startIndex, f.length);
          f.splice(C, 0, ...l.split(`
`)), M.value = f.join(`
`)
        } else M.value = $l(u, l);
      else M.value = u;
      Ua(w)
    },
    St = (e = !1) => {
      ha(), Ea();
      const t = ue.value;
      e && (ba.value = Date.now()), Q.value = !1, De.value = 1, H.value = !1, wa.value = void 0, me.value = !1, j.value = !1, y.value = {
        url: "",
        pid: ""
      }, N.value = [], X.value = void 0, V.value = void 0, T.value = {}, sa.value = !0, Ca.value = !1, ye.value = void 0, re.value = void 0, Pe.value = void 0, B.value = {}, Re.value = !1, Va.value = !1, ka.value = void 0, ia.value = 0, Ia.value = !1, na.value = "", ge.value = !1, be.value = !1, Y.value = null, we.value = "", ua.value = !0, Ee.value = [], ra.value = [], E.value = "", de.value = [], x.value = "", Z.value = void 0, Ve.value = !1, Oe.value = 0, da.value = !0, ca.value = !1, M.value = "", ee.value = "", O.value = 0, ce.value = [], $a.value = !0, Le.value = void 0, Ye.value = ["0", "1", "2", "3"], ue.value = t
    },
    Pt = e => {
      var t, l;
      (t = ne.value) == null || t.logUpload(), (l = ne.value) == null || l.updateMd5(e)
    },
    Rt = (e, t) => {
      var l, i;
      e === "close" ? ((l = ne.value) == null || l.cancelMethods(), ie.value = "", St(!0)) : e === "auto" ? H.value = !0 : e === "closeShow" ? ((i = ne.value) == null || i.cancelMethods(), ie.value = "", St(!0), Q.value = !0, De.value = t) : e === "visible" ? $a.value = t === 0 : e === "schedule_timestamp" ? Va.value = t : e === "mediaid" ? Pt(t) : t === void 0 && (M.value = e, p(e))
    },
    Qt = (e = []) => !Array.isArray(e) || !e.length ? !1 : (N.value = e.map((t, l) => Ne(te({}, t), {
      source: l === 0 ? 11 : 2
    })), y.value && y.value.url || (y.value = N.value[0]), !0),
    Xt = (e, t) => {
      var P;
      if (!e) return null;
      const l = e[t] || e;
      if (((P = l == null ? void 0 : l.screenshot) == null ? void 0 : P.state) !== 1) return null;
      const i = l.screenshot;
      let c = null;
      if (i.file_detail) try {
        c = JSON.parse(i.file_detail)
      } catch (k) {
        c = null
      }
      c || (c = i.file_detail_value);
      const u = Array.isArray(c == null ? void 0 : c.files) ? c.files : [];
      if (u.length) return u.map(k => Ne(te(te({}, i), k), {
        url: k.url || (k.pid ? at(k.pid) : ""),
        pid: k.pid || k.file_id || "",
        file_id: k.file_id || i.file_id || ""
      })).filter(k => k.url);
      const f = i.file_id || "",
        C = i.url || (f ? at(f) : "");
      return C ? [Ne(te({}, i), {
        url: C,
        pid: f,
        file_id: i.file_id || ""
      })] : null
    },
    Yt = e => {
      if (!e || !d.query.preupdate_id) return;
      ha(), pe = !1;
      const t = () => {
        pe || Ie.get("/ajax/multimedia/output", {
          params: {
            source: 339644097,
            ids: e,
            labels: "screenshot"
          }
        }).then(l => {
          var c;
          if (pe) return;
          const i = Xt((c = l == null ? void 0 : l.data) == null ? void 0 : c.data, e);
          if (Qt(i || [])) {
            pe = !0;
            return
          }
          pe || (Ce.value = setTimeout(t, 5e3))
        }).catch(() => {
          pe || (Ce.value = setTimeout(t, 5e3))
        })
      };
      t()
    },
    Zt = (...e) => {
      var t;
      switch (e[0]) {
        case "show":
          la();
          break;
        case "file":
          je(), V.value = !1, T.value = {}, ye.value = void 0, Z.value = !1, Ea(), e[1] && (Ue.value = URL.createObjectURL(e[1]));
          break;
        case "screenshot":
          N.value = Array.isArray(e[1]) && e[1].map((l, i) => Ne(te({}, l), {
            source: i === 0 ? 11 : 2
          })) || [], y.value && y.value.url || (y.value = N.value[0] ? N.value[0] : {
            url: "",
            pid: ""
          });
          break;
        case "success":
          Al({
            key: "execuploadsuccess"
          }), V.value = !0, T.value = e[1];
          break;
        case "start":
          H.value = !1, V.value = !1;
          break;
        case "init":
          ha(), je(), H.value = !1, V.value = !1, T.value = {}, y.value = {
            url: "",
            pid: ""
          }, N.value = [], ye.value = void 0, re.value = void 0, Z.value = !1, j.value = !1, J.value = !1, sa.value = !0, Ea();
          break;
        case "cancel":
          je(), V.value = void 0, T.value = {}, ye.value = void 0, Z.value = !1, Ea(), ia.value = "", Y.value = null, we.value = "", ua.value = !1, Ua(() => {
            ua.value = !0
          });
          break;
        case "replace":
          Re.value = !0;
          break;
        case "detail":
          e[1] && e[1].width < e[1].height && (re.value = !0), e[1] && e[1].duration && (ye.value = e[1].duration), Z.value = !!((t = e[1]) != null && t.isPanorama);
          {
            const {
              width: l,
              height: i
            } = e[1];
            ia.value = Math.min(l, i)
          }
          break
      }
    },
    el = (...e) => {
      me.value = !1, e[0] === "select" ? y.value = N.value[e[1] - 1] : e[0] === "change" && (y.value = Hl(e[1].url), e[1].cover && (Pe.value = e[1].cover))
    },
    Tt = () => {
      var f, C, P, k, U, Oa, Ht;
      const e = [];
      Ze.value.forEach(F => {
        F.checked && e.push(F.id)
      });
      const t = F => F.split("/").slice(-1)[0].split(".")[0],
        l = {
          titles: [{
            title: ie.value,
            default: "true"
          }],
          covers: [te({
            url: y.value.url,
            pid: y.value.pid || y.value.file_id,
            source: (f = y.value.source) != null ? f : ""
          }, Tl((C = y.value) != null && C.pid ? y.value.pid : t((P = y.value) == null ? void 0 : P.url)))],
          free_duration: {
            start: 0,
            end: 30
          }
        },
        i = ql(d.query);
      i && (l.task = i), (k = Le.value) != null && k.coCreation && (l.cooperate_video = Le.value.selectArr.map(F => ({
        uid: F.id,
        role: F.role
      })), (Oa = (U = ya.value) == null ? void 0 : U.permanent_host) != null && Oa.length ? l.permanent_host = ya.value.permanent_host.map(F => F.uid) : l.permanent_host = []), Ve.value && (l.um_video_switch = Ve.value === "um_video", l.is_vip_paid = Ve.value === "vplus_video"), Ka.value && fe.value !== "edit" && (l.copyright_video_switch = da.value), fe.value === "edit" && Re.value === !0 && (l.edit_object_id = T.value.media_id);
      const c = ea.value ? "homemade" : "contribution";
      l.type = "video", l.media_id = T.value.media_id, fe.value === "edit" && c === "homemade" && (l.homemade_changed = 1), Pe.value && l.covers.push({
        type: 1,
        pid: Pe.value.pid,
        source: 1
      }), l.resource = {
        video_down: aa.value ? 1 : 0
      }, Qa.value && (l.resource.allow_clip = +se.value), Bl({
        showOriginalVideoRelation: Be.value,
        status: h.status.value,
        mediaId: h.mediaId.value
      }) && (l.video_associate_id = h.mediaId.value, l.resource.manual_split = {
        origin_media_id: h.mediaId.value,
        origin_url: h.url.value
      }), E.value && (l.resource.statement = {
        required: {
          id: E.value
        },
        optional: de.value.map(F => ({
          id: F
        }))
      }, (Ht = ve.value) != null && Ht.textfield && x.value.trim() && (l.resource.statement.required.textfield_content = x.value.trim())), Oe.value && (l.resource.allow_highlight_preheat = Oe.value), l[c] = {
        channel_ids: [qe.value],
        type: X.value
      }, ue.value && (l.approval_reprint = sa.value ? "1" : "0"), Ca.value && (l.follower_watch_entire = {
        enable: 0
      }), J.value && l.type !== "audio" && (l.playlist = {
        playlist_video: !0,
        album_ids: e.toString()
      });
      const u = et();
      return u.length && (l.spotlight_visible = 1, l.spotlights = u), l
    },
    Et = (e = !0) => (V.value && e && (wa.value = Tt()), !0),
    Ot = () => {
      if (!Xa.value) Et(!1) && bt({
        btnConfirm: "我知道了",
        message: "设置自动发布成功！ 微博将于视频文件上传并转码完成后自动发出。在文件上传完毕前请勿关闭浏览器窗口",
        action: () => {
          Rt("auto")
        }
      });
      else {
        const e = Tt(),
          t = {
            oid: Xe.value,
            mid: B.value.mid,
            media: JSON.stringify(e)
          };
        Ie.post("/ajax/multimedia/submitVideoEditInfo", t).then(l => {
          l.data.ok > 0 && l.data.data && l.data.data.result && (Q.value = !0)
        }).catch(l => {
          console.warn(l)
        })
      }
    },
    al = () => {
      Na.value = !1
    },
    tl = () => {
      z({
        type: "warn",
        message: "共创视频不可转载"
      })
    },
    ll = ({
      requiredValue: e,
      optionalValues: t,
      reprintSource: l
    }) => {
      E.value = e, de.value = t, x.value = l
    },
    ol = e => {
      z({
        type: "warn",
        message: e
      })
    },
    Ut = e => {
      var P, k;
      if (fe.value === "edit" && Re.value) return;
      const t = U => {
          if (!U || typeof U != "string") return U;
          try {
            return JSON.parse(U)
          } catch (Oa) {
            return U
          }
        },
        l = t(e == null ? void 0 : e.resource),
        i = t(e == null ? void 0 : e.resource_info),
        c = t((k = (P = e == null ? void 0 : e.covers) == null ? void 0 : P[0]) == null ? void 0 : k.resource),
        u = (e == null ? void 0 : e.statement) || (l == null ? void 0 : l.statement) || (i == null ? void 0 : i.statement) || (c == null ? void 0 : c.statement),
        f = (u == null ? void 0 : u.required) || (u == null ? void 0 : u.user_requiredItem),
        C = (u == null ? void 0 : u.optional) || (u == null ? void 0 : u.user_optionalItems);
      if (!u) {
        E.value = "", de.value = [], x.value = "";
        return
      }
      E.value = (f == null ? void 0 : f.id) || "", de.value = Array.isArray(C) ? C.map(U => U == null ? void 0 : U.id).filter(Boolean) : [], x.value = (f == null ? void 0 : f.textfield_content) || ""
    },
    Lt = e => {
      var f;
      ie.value = e.titles[0] && e.titles[0].title, Ut(e), y.value = {
        url: e.covers[0].url
      }, e.current_playlists && e.current_playlists.length > 0 && (Te.value = e.current_playlists.map(C => C.id), J.value = !0);
      const t = e != null && e.homemade_info && ((f = Object.keys(e == null ? void 0 : e.homemade_info)) != null && f.length) ? e.homemade_info : e == null ? void 0 : e.contribution_info,
        l = t == null ? void 0 : t.first_level_channels,
        i = t == null ? void 0 : t.second_level_channels;
      let c = 0,
        u = 0;
      l && l[0] && (j.value = !0, (ea.value ? ea.value : ja.value).forEach((P, k) => {
        P.channel_id === l[0].id && (c = k, P.sub_channels && P.sub_channels.length > 0 && i && i[0] && P.sub_channels.forEach((U, Oa) => {
          U.sub_channel_id === i[0].id && (u = Oa, ga("main", c), ga("sub", u))
        }))
      })), X.value = t == null ? void 0 : t.type
    },
    xt = e => {
      Ie.get("/ajax/multimedia/getVideoEditInfo", {
        params: {
          media_id: e
        }
      }).then(t => {
        var l, i;
        if (t.data && t.data.ok > 0) {
          we.value = (l = t.data.srt) == null ? void 0 : l.title;
          const c = t.data.data,
            u = c && c.video_info;
          if (u.editable) B.value = u, T.value.media_id = (i = u.oid) == null ? void 0 : i.replace("1034:", ""), B.value.height > B.value.width && (re.value = !0), B.value && (Lt(B.value), h.restore(Ne(te(te({}, c), B.value), {
            associateVideo: t.data.associateVideo
          }))), u.pay_audio && (ka.value = u.pay_audio);
          else {
            const f = u.reject_edit_reason || u.non_editable_reason || "抱歉，当前视频无法编辑";
            Ma.value ? z({
              type: "warn",
              message: f,
              action: () => {
                $.push({
                  name: "videoManage"
                })
              }
            }) : z({
              type: "warn",
              message: f,
              autohide: !1,
              mask: !0
            })
          }
        }
      }, () => {
        z({
          type: "warn",
          message: "抱歉，当前视频无法编辑"
        })
      })
    },
    Mt = () => {
      const e = R(d.query.media_id),
        t = R(d.query.oid),
        l = R(d.query.mid);
      Ie.get("/ajax/multimedia/getAIClipInfo", {
        params: {
          media_id: e,
          oid: t,
          mid: l,
          schedule: +(At(d.query) === "schedule")
        }
      }).then(i => {
        var c;
        if (i.data.ok > 0) {
          Ia.value = !0;
          const u = i.data.data;
          y.value = {
            url: u.cover
          }, M.value = u.text, w(), u.schedule > 0 && ((c = Ae.value) == null || c.handleSchedule(u.schedule))
        }
      })
    },
    zt = () => {
      const e = R(d.query.expires),
        t = R(d.query.uuid),
        l = R(d.query.signature),
        i = R(d.query.media_id);
      Ie.get("/ajax/multimedia/getCutInfo", {
        params: {
          expires: e,
          uuid: t,
          signature: l,
          media_id: i
        }
      }).then(c => {
        var u, f;
        c.data.ok > 0 && (ca.value = !0, T.value.media_id = i, y.value.url = (u = c.data.data) == null ? void 0 : u.cover, ie.value = (f = c.data.data) == null ? void 0 : f.title, V.value = !0)
      })
    },
    sl = () => qt(this, null, function*() {
      !Me.value || !ze.value || h.status.value === "success" && h.url.value === ze.value || (h.enabled.value = !0, h.updateUrl(ze.value), yield h.relate())
    }),
    Bt = () => {
      d.query.preupdate_id && Ie.get("/ajax/statuses/getPreUpdate", {
        params: {
          preupdate_id: d.query.preupdate_id
        }
      }).then(e => {
        if (e.data.ok > 0 && e.data.data) {
          const {
            media_id: t,
            pid: l,
            horizontal: i,
            title: c
          } = e.data.data;
          i !== void 0 && (re.value = Number(i) === 0), l && (y.value = {
            url: at(l),
            pid: l
          }), Yt(t), ie.value = c, ge.value = !0, T.value.media_id = t, V.value = !0
        }
      })
    },
    il = e => {
      var t;
      Oe.value = (t = e == null ? void 0 : e.allowHighlightPreheat) != null ? t : 0
    };
  return fa(H, e => {
    if (!e) try {
      Dl.close()
    } catch (t) {}
  }), fa(Be, e => {
    !e && !Me.value && h.clear()
  }), fa(() => h.enabled.value, e => {
    !e && !Me.value && h.clear()
  }), fa(j, e => {
    e === !1 ? (Ha.value = "选择视频分类", qe.value = "", Ye.value = ["0", "1", "2", "3"], X.value = void 0) : Ya()
  }), fa(V, e => {
    fe.value === "edit" && e && H.value && Ot()
  }), fa(ta, e => {
    Za(e)
  }, {
    immediate: !0,
    deep: !0
  }), Cl(() => {
    W.value && (Xe.value = d.query.oid, V.value = !0)
  }), Vl(() => {
    ha(), Ea()
  }), kl(() => qt(this, null, function*() {
    var u;
    Ie.get("/ajax/multimedia/getapproval").then(({
      data: f
    }) => {
      f.ok && (ue.value = f.showApprovalRepeat)
    }), yield la();
    const e = R(d.query.oid),
      t = R(d.query.media_id),
      l = At(d.query),
      i = R(d.query.mid);
    if (R(d.query.preupdate_id)) Bt();
    else if (l === "cut") na.value = l, zt();
    else if (l === Ft) na.value = l, ca.value = !0, t && (T.value = {
      media_id: t
    }, V.value = !0);
    else if (l === "wedance") {
      const f = R(d.query.media_id),
        C = R(d.query.pid),
        P = R(d.query.horizontal);
      if (C) {
        const k = at(C);
        y.value.url = k, y.value.pid = C, P !== void 0 && (re.value = Number(P) === 0)
      }
      T.value.media_id = f, V.value = !0
    } else W.value && e && xt(e);
    e && t && i && Mt(), yield sl(), Kt({
      uicode: "30000840",
      actType: "7635",
      ext: `is_authorized:${(u=Ge.value.flags)==null?void 0:u.audio_auth}`
    })
  })), {
    route: d,
    isEdit: W,
    entry: fe,
    hasnav: Ma,
    oid: Xe,
    config: Ge,
    checkAlbum: J,
    checkAddAlbum: _a,
    addAlbumObj: Se,
    albumList: Ze,
    albumIds: Te,
    addAlbum: st,
    addAlbumEnter: G,
    checkAlbumRef: it,
    addAlbumInput: Ba,
    videoScroll: oe,
    channelText: Ha,
    channelList: ja,
    category: ea,
    channel_ids: qe,
    play_config: Fa,
    allowClip: se,
    checkAllowDownload: aa,
    showAllowDownload: ma,
    material_permission: Ka,
    biz_type: Wa,
    coCreateConfig: ya,
    statementConfig: ta,
    videoAssociateInfo: Ja,
    maxFileSize: nt,
    videoDescInfo: ut,
    modifyChannel: ga,
    channelListInit: la,
    videoSort: oa,
    title: ie,
    doneDisabled: _e,
    showToast: Q,
    toastType: De,
    autoPublish: H,
    time: ba,
    successData: wa,
    show_approval_reprint: ue,
    videoEdit: me,
    checkExposure: j,
    screenshot: y,
    screenArray: N,
    type: X,
    uploadSuccess: V,
    videoDetails: T,
    forward_strategy: sa,
    follower_watch_entire: Ca,
    duration: ye,
    horizontal: re,
    horizontalCover: Pe,
    videoInfo: B,
    replaceVideo: Re,
    curTimer: Va,
    payInfo: ka,
    definition: ia,
    isAiClip: Ia,
    publishType: na,
    isPrePublish: ge,
    uploadSrtVisible: be,
    srtFile: Y,
    srtTitle: we,
    srtRender: ua,
    declarationRequiredOptions: Ee,
    declarationOptionalOptions: ra,
    selectedDeclarationRequired: E,
    selectedDeclarationOptional: de,
    declarationReprintSource: x,
    isPanorama: Z,
    um_video: Ve,
    highlightPreloadState: Oe,
    copyright_video_switch: da,
    cutUpload: ca,
    publisherContent: M,
    localVideoSrc: Ue,
    videoHighlightContent: ee,
    videoHighlightLineCount: O,
    videoHighlights: ce,
    showChannel: Na,
    showCoCreation: $a,
    coCreationState: Le,
    supported_video_type: Ye,
    videoUploadRef: ne,
    publisherRef: Ae,
    videoEditRef: Ga,
    hasMediaId: Sa,
    showAllowClip: Qa,
    showOriginalVideoRelation: Be,
    hasSrt: dt,
    mediaId: ct,
    videoHighlightUnsupportedFormat: vt,
    showMoreDetail: pt,
    sendDesc: ht,
    statementModel: ae,
    statementTitle: ft,
    statementRequired: va,
    statementShow: _t,
    statementDefaultRequiredValue: mt,
    statementDefaultOptionalValues: yt,
    statementPlaceholder: qa,
    currentDeclarationRequiredOption: ve,
    currentDeclarationRequiredMinLength: Aa,
    declarationText: gt,
    channelDisabled: Da,
    isDone: Xa,
    enabled: h.enabled,
    relationUrl: h.url,
    relationStatus: h.status,
    errorText: h.errorText,
    originalVideoRelationVideoInfo: h.videoInfo,
    originalVideoRelationMediaId: h.mediaId,
    updateUrl: h.updateUrl,
    relate: h.relate,
    clear: h.clear,
    forceOriginalVideoRelation: Me,
    logPublishStatementState: pa,
    syncDeclarationConfig: Za,
    handleUploadSrt: wt,
    closeUploadSrt: Ct,
    confirmUploadSrt: Vt,
    handleDeleteSrt: kt,
    handleTypeChange: It,
    handleCoCreationChange: $t,
    umVideoChange: o,
    handlePublisherSuccess: v,
    albumsMore: ke,
    disabledCheck: q,
    changeEdit: Pa,
    change: Rt,
    handleReset: St,
    updateMd5: Pt,
    uploadChange: Zt,
    changeVideoEdit: el,
    done: Et,
    getSuccessData: Tt,
    submitEditInfo: Ot,
    closeChannel: al,
    showToastType: tl,
    handleDeclarationConfirm: ll,
    handleDeclarationInvalid: ol,
    syncDeclarationFromInfo: Ut,
    initEditVideoInfo: Lt,
    getVideoEditInfo: xt,
    getAIClipInfo: Mt,
    getCutInfo: zt,
    getPreUpdateData: Bt,
    changeHighlightPreload: il,
    formatVideoHighlightContent: he,
    findCurrentVideoHighlightBlock: He,
    getVideoSpotlights: et,
    syncVideoHighlightContent: p,
    removeVideoHighlightContent: Ra,
    clearVideoHighlightState: je,
    handleVideoHighlightConfirm: Gt,
    focusPublisher: w,
    scrollToBottom: Ya
  }
}
const Nl = {
    key: 0
  },
  Fl = {
    class: "wbpro-form"
  },
  Kl = ["value"],
  Wl = ["textContent"],
  Jl = {
    key: 1,
    style: {
      height: "22px"
    }
  },
  Gl = {
    style: {
      height: "22px"
    }
  },
  Ql = {
    style: {
      position: "relative"
    }
  },
  Xl = Pl({
    __name: "VideoPublish",
    setup(d) {
      const $ = A(() => D(() => import("./UploadSrt-DqkZOhkg.js"), __vite__mapDeps([0, 1, 2, 3]))),
        S = A(() => D(() => import("./VideoUpload-CUYNiaHl.js"), __vite__mapDeps([4, 1, 2, 5]))),
        Je = A(() => D(() => import("./Sort-D31SHdq3.js"), __vite__mapDeps([6, 1, 2, 7]))),
        $e = A(() => D(() => import("./VideoEdit-C2M37YsN.js"), __vite__mapDeps([8, 1, 2, 9]))),
        Ge = A(() => D(() => import("./index-Xve1TSN5.js").then(o => o.aW), __vite__mapDeps([1, 2]))),
        Qe = A(() => D(() => import("./index-Xve1TSN5.js").then(o => o.aX), __vite__mapDeps([1, 2]))),
        le = A(() => D(() => import("./CoCreation-BO8TQ9jh.js"), __vite__mapDeps([10, 1, 2, 11]))),
        h = A(() => D(() => import("./HighlightPreload-DPM4KGxb.js"), __vite__mapDeps([12, 1, 2, 13]))),
        W = A(() => D(() => import("./HeaderComment-DxATBkq0.js"), __vite__mapDeps([14, 1, 2, 15]))),
        fe = A(() => D(() => import("./Success-Blx_A82R.js"), __vite__mapDeps([16, 1, 2, 17]))),
        Ma = A(() => D(() => import("./AutoState-COGt7oMw.js"), __vite__mapDeps([18, 1, 2, 19]))),
        Xe = A(() => D(() => import("./Type-B0t91pNC.js"), __vite__mapDeps([20, 1, 2, 21]))),
        Ye = A(() => D(() => import("./Title-D1LUYl8Y.js"), __vite__mapDeps([22, 1, 2, 23]))),
        za = A(() => D(() => import("./OriginalVideoRelation-DcjIy00B.js"), __vite__mapDeps([24, 1, 2, 25]))),
        lt = A(() => D(() => import("./VideoHighlightEntry-T1UaM_rh.js"), __vite__mapDeps([26, 1, 2, 27]))),
        ot = A(() => D(() => import("./index-Xve1TSN5.js").then(o => o.aV), __vite__mapDeps([1, 2]))),
        J = A(() => D(() => import("./index-Xve1TSN5.js").then(o => o.aT), __vite__mapDeps([1, 2]))),
        {
          isEdit: _a,
          entry: Se,
          hasnav: Ze,
          checkAlbum: Te,
          checkAddAlbum: st,
          addAlbumObj: G,
          albumList: it,
          addAlbum: Ba,
          addAlbumEnter: oe,
          checkAlbumRef: Ha,
          addAlbumInput: ja,
          videoScroll: ea,
          channelText: qe,
          channelList: Na,
          category: Fa,
          play_config: se,
          allowClip: aa,
          checkAllowDownload: ma,
          showAllowDownload: Ka,
          material_permission: Wa,
          biz_type: ya,
          coCreateConfig: ta,
          videoDescInfo: Ja,
          maxFileSize: nt,
          modifyChannel: ut,
          videoSort: ga,
          title: la,
          showToast: oa,
          toastType: ie,
          autoPublish: _e,
          time: ne,
          successData: Ae,
          show_approval_reprint: Ga,
          videoEdit: Q,
          screenshot: De,
          screenArray: H,
          type: ba,
          uploadSuccess: wa,
          forward_strategy: ue,
          follower_watch_entire: me,
          duration: j,
          horizontal: y,
          replaceVideo: N,
          curTimer: X,
          payInfo: V,
          definition: T,
          isAiClip: sa,
          publishType: Ca,
          isPrePublish: ye,
          uploadSrtVisible: re,
          srtFile: Pe,
          srtTitle: B,
          srtRender: Re,
          declarationRequiredOptions: Va,
          declarationOptionalOptions: ka,
          selectedDeclarationRequired: ia,
          selectedDeclarationOptional: Ia,
          declarationReprintSource: na,
          isPanorama: ge,
          um_video: be,
          copyright_video_switch: Y,
          cutUpload: we,
          publisherContent: ua,
          localVideoSrc: Ce,
          videoHighlights: Ee,
          showChannel: ra,
          showCoCreation: E,
          coCreationState: de,
          videoUploadRef: x,
          publisherRef: Z,
          videoEditRef: Ve,
          hasMediaId: Oe,
          showAllowClip: da,
          showOriginalVideoRelation: ca,
          hasSrt: M,
          mediaId: Ue,
          videoHighlightUnsupportedFormat: ee,
          showMoreDetail: O,
          sendDesc: ce,
          statementTitle: $a,
          statementRequired: Le,
          statementShow: Sa,
          statementDefaultRequiredValue: Qa,
          statementDefaultOptionalValues: Ta,
          declarationText: rt,
          channelDisabled: xe,
          isDone: Me,
          enabled: ze,
          relationUrl: Be,
          relationStatus: dt,
          errorText: ct,
          originalVideoRelationVideoInfo: vt,
          forceOriginalVideoRelation: pt,
          updateUrl: ht,
          relate: ae,
          clear: ft,
          handleUploadSrt: va,
          closeUploadSrt: _t,
          confirmUploadSrt: mt,
          handleDeleteSrt: yt,
          handleTypeChange: qa,
          handleCoCreationChange: ve,
          handlePublisherSuccess: Aa,
          albumsMore: gt,
          disabledCheck: Da,
          changeEdit: Xa,
          change: z,
          uploadChange: bt,
          changeVideoEdit: pa,
          done: pe,
          getSuccessData: ha,
          submitEditInfo: Ya,
          closeChannel: Za,
          showToastType: wt,
          handleDeclarationConfirm: Ct,
          handleDeclarationInvalid: Vt,
          changeHighlightPreload: kt,
          handleVideoHighlightConfirm: It,
          umVideoChange: $t
        } = jl();
      return Rl({
        title: "视频发布"
      }), (o, v) => {
        const ke = Fe("woo-divider"),
          q = Fe("woo-box-item"),
          Pa = Fe("woo-fonticon"),
          w = Fe("woo-box"),
          he = Fe("woo-switch"),
          He = Fe("woo-checkbox"),
          et = Fe("woo-button");
        return b(), K("div", {
          class: r([o.$style.mainContainer, o.$style.mainContainerNarrow])
        }, [(b(), K("div", {
          key: a(ne),
          class: r(o.$style.leftPanel)
        }, [s(a(fe), {
          showToast: a(oa),
          toastType: a(ie),
          videoEdit: a(Q),
          hasnav: a(Ze)
        }, null, 8, ["showToast", "toastType", "videoEdit", "hasnav"]), Ke(_("div", {
          class: r(["wbpro-layer", [o.$style.layer, !a(Ze) && o.$style.layer2, o.$style.layerNarrow]])
        }, [s(a(W), {
          showMoreDetail: a(_e) || a(O),
          videoDescInfo: a(Ja),
          definition: a(T)
        }, null, 8, ["showMoreDetail", "videoDescInfo", "definition"]), _("div", {
          ref_key: "videoScroll",
          ref: ea,
          class: r(["modal-scroll", o.$style.unmodal]),
          onTouchmovePassive: v[18] || (v[18] = xa(() => {}, ["stop"]))
        }, [_("div", {
          class: r(o.$style.videobox)
        }, [_("div", {
          class: r(o.$style.top1)
        }, [a(oa) ? I("", !0) : (b(), L(a(S), {
          key: 0,
          ref_key: "videoUploadRef",
          ref: x,
          type: "channel",
          screenshot: a(De).url,
          biz_type: a(ya),
          audioCanPay: !1,
          payInfo: a(V),
          cutUpload: a(we),
          maxFileSize: a(nt),
          isPrePublish: a(ye),
          hasSrt: a(M),
          onVideoChange: a(bt),
          onUmVideo: a($t),
          onEdit: v[0] || (v[0] = p => Q.value = !0),
          onUploadSrt: a(va)
        }, null, 8, ["screenshot", "biz_type", "payInfo", "cutUpload", "maxFileSize", "isPrePublish", "hasSrt", "onVideoChange", "onUmVideo", "onUploadSrt"])), Ke(s(ke, {
          "border-color": "var(--w-card-border)",
          class: r(o.$style.gap1)
        }, null, 8, ["class"]), [
          [La, a(_e) || a(O)]
        ])], 2), s(a(Ma), {
          hasnav: a(Ze),
          autoPublish: a(_e),
          onCancel: v[1] || (v[1] = p => _e.value = !1)
        }, null, 8, ["hasnav", "autoPublish"]), Ke(_("div", null, [s(a(Xe), {
          coCreationState: a(de),
          hideRepostOption: a(Sa),
          onShowToast: a(wt),
          selectedType: a(ba),
          onTypeChange: a(qa)
        }, null, 8, ["coCreationState", "hideRepostOption", "onShowToast", "selectedType", "onTypeChange"]), a(Sa) ? (b(), K(Dt, {
          key: 0
        }, [s(a(ot), {
          title: a($a),
          displayText: a(rt),
          requiredOptions: a(Va),
          optionalOptions: a(ka),
          defaultRequiredValue: a(Qa),
          defaultOptionalValues: a(Ta),
          requiredValue: a(ia),
          optionalValues: a(Ia),
          reprintSource: a(na),
          required: a(Le),
          onConfirm: a(Ct),
          onInvalid: a(Vt)
        }, null, 8, ["title", "displayText", "requiredOptions", "optionalOptions", "defaultRequiredValue", "defaultOptionalValues", "requiredValue", "optionalValues", "reprintSource", "required", "onConfirm", "onInvalid"]), s(ke, {
          "border-color": "var(--w-card-border)",
          class: r(o.$style.gap1)
        }, null, 8, ["class"])], 64)) : I("", !0), s(a(Ye), {
          content: a(la),
          onInput: v[2] || (v[2] = p => la.value = p)
        }, null, 8, ["content"]), s(a(Ge), {
          edit: a(Q),
          screenArray: a(H),
          screenshot: a(De).url,
          horizontal: a(y),
          channel: !0,
          hasMediaId: a(Oe),
          onEdit: a(Xa),
          onChange: a(pa)
        }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "hasMediaId", "onEdit", "onChange"]), _("div", null, [s(ke, {
          "border-color": "var(--w-card-border)",
          class: r(o.$style.gap1)
        }, null, 8, ["class"]), _("div", {
          class: r(o.$style.gap1)
        }, [_("div", null, [_("div", {
          class: r(o.$style.gap2)
        }, [_("div", {
          class: r(o.$style.tit1)
        }, " 分类 ", 2), Ke((b(), K("div", {
          class: r(o.$style.top1)
        }, [s(w, {
          align: "center",
          class: r(["wbpro-select wbpor-pos error", o.$style.sort]),
          onClick: v[3] || (v[3] = xa(p => ra.value = !0, ["stop"]))
        }, {
          default: m(() => [s(q, {
            align: "center"
          }, {
            default: m(() => [Jt(tt(a(qe)), 1)]),
            _: 1
          }), s(w, {
            align: "center",
            justify: "center",
            class: "opt"
          }, {
            default: m(() => [s(Pa, {
              value: "caretDown"
            })]),
            _: 1
          }), Ke(s(a(Je), {
            ref_key: "videoSort",
            ref: ga,
            class: r(o.$style.sortin),
            list: a(Fa) ? a(Fa) : a(Na),
            onChange: a(ut)
          }, null, 8, ["class", "list", "onChange"]), [
            [La, a(ra)]
          ])]),
          _: 1
        }, 8, ["class"])], 2)), [
          [a(El), a(Za)]
        ])], 2)])], 2), s(a(h), {
          duration: a(j),
          onChange: a(kt)
        }, null, 8, ["duration", "onChange"]), _("div", {
          class: r(o.$style.gap1)
        }, [s(w, {
          align: "center",
          class: r(o.$style.switch)
        }, {
          default: m(() => [s(q, {
            align: "center"
          }, {
            default: m(() => [s(w, {
              align: "center"
            }, {
              default: m(() => [_("div", {
                class: r([o.$style.gray1, o.$style.tit1])
              }, " 合集 ", 2), s(a(J), {
                title: "微博合集",
                desc: ` 1、合集功能可以让你对自己的视频作品进行分类管理。
                            <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。
                            <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。`
              })]),
              _: 1
            })]),
            _: 1
          }), _("div", null, [s(he, {
            ref_key: "checkAlbumRef",
            ref: Ha,
            modelValue: a(Te),
            "onUpdate:modelValue": v[4] || (v[4] = p => We(Te) ? Te.value = p : null),
            size: .6875
          }, null, 8, ["modelValue"])])]),
          _: 1
        }, 8, ["class"]), a(Te) ? (b(), K("div", Nl, [_("div", {
          class: r(o.$style.scroll)
        }, [(b(!0), K(Dt, null, Ol(a(it), (p, Ra) => (b(), L(w, {
          key: Ra,
          align: "center",
          class: r(o.$style.top2)
        }, {
          default: m(() => [s(He, {
            modelValue: p.checked,
            "onUpdate:modelValue": je => p.checked = je,
            value: "check1",
            class: r(o.$style.label2),
            disabled: p.item_count >= 500,
            onClick: je => p.item_count >= 500 && a(gt)()
          }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "onClick"]), s(q, null, {
            default: m(() => [_("div", Fl, [s(w, {
              align: "center"
            }, {
              default: m(() => [_("span", {
                class: r(o.$style.albumIcon)
              }, null, 2), s(q, null, {
                default: m(() => [_("input", {
                  type: "text",
                  value: p.value + (p.checked ? `(更新至${p.item_count+1}集)` : `(共${p.item_count}集)`),
                  disabled: "",
                  onKeypress: v[5] || (v[5] = xa(() => {}, ["stop"]))
                }, null, 40, Kl)]),
                _: 2
              }, 1024)]),
              _: 2
            }, 1024)])]),
            _: 2
          }, 1024)]),
          _: 2
        }, 1032, ["class"]))), 128)), a(st) ? (b(), L(w, {
          key: 0,
          align: "center",
          class: r(o.$style.top2)
        }, {
          default: m(() => [s(He, {
            modelValue: a(G).checked,
            "onUpdate:modelValue": v[6] || (v[6] = p => a(G).checked = p),
            value: "check2",
            class: r(o.$style.label2),
            disabled: a(G).disabled
          }, null, 8, ["modelValue", "class", "disabled"]), s(q, null, {
            default: m(() => [_("div", {
              class: r(["wbpro-form focus", {
                error: a(G).error
              }])
            }, [s(w, {
              align: "center"
            }, {
              default: m(() => [s(Pa, {
                value: "album",
                class: r(o.$style.icon1)
              }, null, 8, ["class"]), s(q, null, {
                default: m(() => [Ke(_("input", {
                  ref_key: "addAlbumInput",
                  ref: ja,
                  "onUpdate:modelValue": v[7] || (v[7] = p => a(G).message = p),
                  type: "text",
                  onKeyup: v[8] || (v[8] = Ul((...p) => a(oe) && a(oe)(...p), ["enter"])),
                  onBlur: v[9] || (v[9] = (...p) => a(oe) && a(oe)(...p)),
                  onKeypress: v[10] || (v[10] = xa(() => {}, ["stop"]))
                }, null, 544), [
                  [Ll, a(G).message]
                ])]),
                _: 1
              }), a(G).error ? (b(), K("div", {
                key: 0,
                class: "num",
                textContent: tt(`${a(G).number}/12`)
              }, null, 8, Wl)) : I("", !0)]),
              _: 1
            })], 2)]),
            _: 1
          })]),
          _: 1
        }, 8, ["class"])) : I("", !0)], 2), _("div", {
          class: r(o.$style.add)
        }, [s(Pa, {
          value: "add",
          class: r(o.$style.icon)
        }, null, 8, ["class"]), _("span", {
          onClick: v[11] || (v[11] = xa((...p) => a(Ba) && a(Ba)(...p), ["stop"]))
        }, "新建合集")], 2)])) : I("", !0)], 2), s(ke, {
          "border-color": "var(--w-card-border)",
          class: r(o.$style.gap1)
        }, null, 8, ["class"]), a(ta).can_publish && !a(be) && !a(_a) && !a(V) && !a(ge) ? (b(), L(a(le), {
          key: 0,
          coCreateConfig: a(ta),
          type: a(ba) === 1,
          visible: a(E),
          timer: a(X),
          showIcon: !1,
          onChange: a(ve)
        }, null, 8, ["coCreateConfig", "type", "visible", "timer", "onChange"])) : I("", !0), a(ca) ? (b(), L(a(za), {
          key: 1,
          modelValue: a(ze),
          "onUpdate:modelValue": v[12] || (v[12] = p => We(ze) ? ze.value = p : null),
          url: a(Be),
          status: a(dt),
          errorText: a(ct),
          videoInfo: a(vt),
          locked: a(pt),
          "onUpdate:url": a(ht),
          onRelate: a(ae),
          onClear: a(ft)
        }, null, 8, ["modelValue", "url", "status", "errorText", "videoInfo", "locked", "onUpdate:url", "onRelate", "onClear"])) : I("", !0), a(Se) !== "edit" && !a(ge) ? (b(), L(a(lt), {
          key: a(Ce),
          disabled: a(wa) !== !0,
          videoSrc: a(Ce),
          duration: a(j),
          unsupportedFormat: a(ee),
          highlights: a(Ee),
          onConfirm: a(It)
        }, null, 8, ["disabled", "videoSrc", "duration", "unsupportedFormat", "highlights", "onConfirm"])) : I("", !0), a(ge) ? I("", !0) : (b(), K("div", {
          key: 3,
          class: r([o.$style.tit1, o.$style.gap2])
        }, " 设置 ", 2)), a(ge) ? I("", !0) : (b(), L(w, {
          key: 4,
          class: r(o.$style.gap4),
          items: 3,
          wrap: "wrap"
        }, {
          default: m(() => [a(Wa) && a(Se) !== "edit" ? (b(), L(q, {
            key: 0,
            class: r(o.$style.gap5)
          }, {
            default: m(() => [s(w, {
              align: "center",
              class: r(o.$style.switch)
            }, {
              default: m(() => [s(q, {
                align: "center"
              }, {
                default: m(() => [s(w, {
                  align: "center"
                }, {
                  default: m(() => [_("div", {
                    class: r([o.$style.gray1])
                  }, " 版权视频 ", 2)]),
                  _: 1
                })]),
                _: 1
              }), _("div", null, [s(he, {
                modelValue: a(Y),
                "onUpdate:modelValue": v[13] || (v[13] = p => We(Y) ? Y.value = p : null),
                disabled: a(be),
                size: .6875
              }, null, 8, ["modelValue", "disabled"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), a(Wa) && a(Se) !== "edit" ? (b(), K("div", Jl, [s(ke, {
            "border-color": "var(--w-card-border)",
            direction: "y"
          })])) : I("", !0), a(Ka) ? (b(), K(Dt, {
            key: 2
          }, [s(q, {
            class: r(o.$style.gap5)
          }, {
            default: m(() => [s(w, {
              align: "center",
              class: r(o.$style.switch)
            }, {
              default: m(() => [s(q, {
                align: "center"
              }, {
                default: m(() => [s(w, {
                  align: "center"
                }, {
                  default: m(() => [_("div", {
                    class: r([o.$style.gray1])
                  }, " 允许下载 ", 2), s(a(J), {
                    title: "允许下载",
                    desc: "是否允许他人下载该视频"
                  })]),
                  _: 1
                })]),
                _: 1
              }), _("div", null, [s(he, {
                modelValue: a(ma),
                "onUpdate:modelValue": v[14] || (v[14] = p => We(ma) ? ma.value = p : null),
                size: .6875
              }, null, 8, ["modelValue"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"]), _("div", Gl, [s(ke, {
            "border-color": "var(--w-card-border)",
            direction: "y"
          })])], 64)) : I("", !0), a(Se) !== "edit" && a(Ga) ? (b(), L(q, {
            key: 3,
            class: r(o.$style.gap5)
          }, {
            default: m(() => [s(w, {
              align: "center",
              class: r([o.$style.switch])
            }, {
              default: m(() => [s(w, {
                align: "center"
              }, {
                default: m(() => [_("div", {
                  class: r([o.$style.gray1, o.$style.noWrap])
                }, " 允许他人划重点 ", 2), s(a(J), {
                  title: "划重点说明",
                  desc: "若您的微博为公开，并设置为允许划重点，其他用户可在您的视频中划出一个精彩的重点时刻并发微博，发布后将注明视频来源于您，同时产生的播放量会计入您的微博下。"
                })]),
                _: 1
              }), _("div", null, [s(he, {
                modelValue: a(ue),
                "onUpdate:modelValue": v[15] || (v[15] = p => We(ue) ? ue.value = p : null),
                class: r(o.$style.switchCenter),
                size: .6875
              }, null, 8, ["modelValue", "class"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), a(da) ? (b(), L(q, {
            key: 4,
            class: r(o.$style.gap5)
          }, {
            default: m(() => [s(w, {
              align: "center",
              class: r([o.$style.switch])
            }, {
              default: m(() => [s(w, {
                align: "center"
              }, {
                default: m(() => [_("div", {
                  class: r(o.$style.gray1)
                }, " 允许他人剪辑 ", 2), s(a(J), {
                  style: {
                    "line-height": "16px"
                  },
                  title: "他人剪辑说明",
                  desc: "打开开关即允许创作者基于您的视频进行剪辑创作，剪辑作品会带有“查看完整视频”按钮，点击后跳转至您的原视频，可为你带来流量收益。"
                })]),
                _: 1
              }), _("div", null, [s(he, {
                modelValue: a(aa),
                "onUpdate:modelValue": v[16] || (v[16] = p => We(aa) ? aa.value = p : null),
                class: r(o.$style.switchCenter),
                offValue: 0,
                onValue: 1,
                size: .6875
              }, null, 8, ["modelValue", "class"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), s(q, {
            class: r(o.$style.gap5)
          }, {
            default: m(() => [a(se) && a(se).follower_watch_entire && a(j) > 180 ? (b(), L(w, {
              key: 0,
              align: "center",
              class: r([o.$style.switch])
            }, {
              default: m(() => [s(q, {
                align: "center"
              }, {
                default: m(() => [s(w, {
                  align: "center"
                }, {
                  default: m(() => [_("div", {
                    class: r(o.$style.gray1)
                  }, tt(a(se).follower_watch_entire.title), 3), s(a(J), {
                    title: a(se).follower_watch_entire.pop_up_window_title,
                    desc: a(se).follower_watch_entire.pop_up_window_desc
                  }, null, 8, ["title", "desc"])]),
                  _: 1
                })]),
                _: 1
              }), _("div", null, [s(he, {
                modelValue: a(me),
                "onUpdate:modelValue": v[17] || (v[17] = p => We(me) ? me.value = p : null),
                size: .6875
              }, null, 8, ["modelValue"])])]),
              _: 1
            }, 8, ["class"])) : I("", !0)]),
            _: 1
          }, 8, ["class"]), s(q)]),
          _: 1
        }, 8, ["class"]))])], 512), [
          [La, a(O)]
        ])], 2)], 34), Ke(_("div", {
          class: r(o.$style.box1)
        }, [_("div", {
          class: r([o.$style.gray1, o.$style.tit1])
        }, " 设置微博内容 ", 2), a(oa) ? I("", !0) : (b(), L(a(Qe), {
          key: 0,
          ref_key: "publisherRef",
          ref: Z,
          doneDisabled: a(xe),
          channelData: a(Ae),
          statementAuth: !a(Sa),
          toolsfliter: ["emoticon", "hash", "at", "place", "timer"],
          set: {
            content: a(ua),
            action: "channel",
            publish: a(Me),
            publishCallback: a(pe),
            autoPublish: a(_e) && !a(N) && a(Se) !== "edit",
            getSuccessData: a(ha)
          },
          sendDesc: a(ce),
          coCreation: a(de),
          isAiClip: a(sa),
          publishType: a(Ca),
          onChange: a(z),
          onDisabledCheck: a(Da),
          onSuccess: a(Aa)
        }, null, 8, ["doneDisabled", "channelData", "statementAuth", "set", "sendDesc", "coCreation", "isAiClip", "publishType", "onChange", "onDisabledCheck", "onSuccess"]))], 2), [
          [La, a(O) && !a(_a)]
        ]), a(_a) && a(O) ? (b(), L(w, {
          key: 0,
          style: {
            "margin-top": "30px",
            position: "relative"
          },
          justify: "center"
        }, {
          default: m(() => [_("div", Ql, [s(et, {
            disabled: a(xe),
            sort: "flat",
            kind: "primary",
            onClick: a(Ya)
          }, {
            default: m(() => [Jt(tt(a(ce)), 1)]),
            _: 1
          }, 8, ["disabled", "onClick"]), a(xe) ? (b(), K("div", {
            key: 0,
            class: r(o.$style.btn1),
            onClick: v[19] || (v[19] = (...p) => a(Da) && a(Da)(...p))
          }, null, 2)) : I("", !0)])]),
          _: 1
        })) : I("", !0)], 2), [
          [La, !a(Q) && !a(oa)]
        ]), s(a($e), {
          ref_key: "videoEditRef",
          ref: Ve,
          edit: a(Q),
          screenArray: a(H),
          screenshot: a(De).url,
          horizontal: a(y),
          channel: !0,
          onChange: a(pa)
        }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "onChange"]), a(Re) ? (b(), L(a($), {
          key: 0,
          visible: a(re),
          srtFile: a(Pe),
          srtTitle: a(B),
          "media-id": a(Ue),
          onClose: a(_t),
          onConfirm: a(mt),
          onDelete: a(yt)
        }, null, 8, ["visible", "srtFile", "srtTitle", "media-id", "onClose", "onConfirm", "onDelete"])) : I("", !0)], 2))], 2)
      }
    }
  }),
  Yl = "_box1_hqe7u_14",
  Zl = "_gray1_hqe7u_17",
  eo = "_videobox_hqe7u_22",
  ao = "_top1_hqe7u_26",
  to = "_top2_hqe7u_30",
  lo = "_label2_hqe7u_34",
  oo = "_add_hqe7u_48",
  so = "_icon_hqe7u_59",
  io = "_icon1_hqe7u_69",
  no = "_scroll_hqe7u_105",
  uo = "_sort_hqe7u_111",
  ro = "_sortin_hqe7u_116",
  co = "_noWrap_hqe7u_124",
  vo = "_layer_hqe7u_128",
  po = "_layerNarrow_hqe7u_138",
  ho = "_layer2_hqe7u_142",
  fo = "_unmodal_hqe7u_146",
  _o = "_tit1_hqe7u_152",
  mo = "_gap1_hqe7u_163",
  yo = "_gap2_hqe7u_172",
  go = "_gap4_hqe7u_176",
  bo = "_gap5_hqe7u_180",
  wo = "_albumIcon_hqe7u_193",
  Co = "_btn1_hqe7u_201",
  Vo = "_switchCenter_hqe7u_210",
  ko = "_mainContainer_hqe7u_216",
  Io = "_mainContainerNarrow_hqe7u_223",
  $o = "_leftPanel_hqe7u_227",
  So = {
    box1: Yl,
    gray1: Zl,
    videobox: eo,
    top1: ao,
    top2: to,
    label2: lo,
    add: oo,
    icon: so,
    icon1: io,
    switch: "_switch_hqe7u_74",
    scroll: no,
    sort: uo,
    sortin: ro,
    noWrap: co,
    layer: vo,
    layerNarrow: po,
    layer2: ho,
    unmodal: fo,
    tit1: _o,
    gap1: mo,
    gap2: yo,
    gap4: go,
    gap5: bo,
    albumIcon: wo,
    btn1: Co,
    switchCenter: Vo,
    mainContainer: ko,
    mainContainerNarrow: Io,
    leftPanel: $o
  },
  To = {
    $style: So
  },
  Po = xl(Xl, [
    ["__cssModules", To]
  ]);
export {
  Po as
  default
};
