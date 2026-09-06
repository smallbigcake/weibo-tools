const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/UploadSrt-CZC5WYmW.js", "assets/index-D53O_Npi.js", "assets/index-D06RDhv8.css", "assets/UploadSrt-U4ZBkwpD.css", "assets/VideoUpload-B8NiZRzb.js", "assets/VideoUpload-UsKzmGBW.css", "assets/Sort-DxNkHIdo.js", "assets/Sort-Du9eDwOL.css", "assets/VideoEdit-rZdHwyDj.js", "assets/VideoEdit-DsjNyC0Z.css", "assets/CoCreation-CSz2-tyt.js", "assets/CoCreation-HKftH6qI.css", "assets/HighlightPreload-Celtsomc.js", "assets/HighlightPreload-Cpw1BqZo.css", "assets/HeaderComment-BVhDr6An.js", "assets/HeaderComment-Ds5EjNH3.css", "assets/Success-DG9IWXTo.js", "assets/Success-DNAUkz1s.css", "assets/AutoState-fpP-UYEv.js", "assets/AutoState-DJsVdNV0.css", "assets/Type-C9zyx6ES.js", "assets/Type-BQus3jjr.css", "assets/Title-DRDcPezD.js", "assets/Title-DhJDaZ76.css", "assets/OriginalVideoRelation-CHEi5l1x.js", "assets/OriginalVideoRelation-BkwEAJo1.css", "assets/VideoHighlightEntry-WtZobEBH.js", "assets/VideoHighlightEntry-Bzs41HN2.css"]))) => i.map(i => d[i]);
var Xa = Object.defineProperty,
  Ya = Object.defineProperties;
var Za = Object.getOwnPropertyDescriptors;
var Oa = Object.getOwnPropertySymbols;
var el = Object.prototype.hasOwnProperty,
  tl = Object.prototype.propertyIsEnumerable;
var Ua = (m, $, S) => $ in m ? Xa(m, $, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: S
  }) : m[$] = S,
  te = (m, $) => {
    for (var S in $ || ($ = {})) el.call($, S) && Ua(m, S, $[S]);
    if (Oa)
      for (var S of Oa($)) tl.call($, S) && Ua(m, S, $[S]);
    return m
  },
  ze = (m, $) => Ya(m, Za($));
var La = (m, $, S) => new Promise((Ne, Ie) => {
  var Fe = _ => {
      try {
        ae(S.next(_))
      } catch (K) {
        Ie(K)
      }
    },
    Ke = _ => {
      try {
        ae(S.throw(_))
      } catch (K) {
        Ie(K)
      }
    },
    ae = _ => _.done ? Ne(_.value) : Promise.resolve(_.value).then(Fe, Ke);
  ae((S = S.apply(m, $)).next())
});
import {
  s as al,
  t as ll,
  v as ol,
  y as sl,
  u as il,
  b as C,
  ac as nl,
  r as i,
  aw as ul,
  a as ke,
  af as qt,
  ad as rl,
  ae as dl,
  w as dt,
  o as cl,
  g as vl,
  A as pl,
  V as Qt,
  ag as xa,
  at as Ma,
  au as hl,
  as as fl,
  av as _l,
  ai as ml,
  aj as yl,
  ak as gl,
  d as bl,
  z as wl,
  l as He,
  m as F,
  i as g,
  n as u,
  k as t,
  B as s,
  O as je,
  h as U,
  D as I,
  al as A,
  P as Pt,
  p as h,
  T as Ot,
  G as Ia,
  C as f,
  U as za,
  E as Xt,
  ao as Cl,
  am as Be,
  H as Vl,
  aq as kl,
  ar as Il,
  ah as E,
  _ as $l
} from "./index-D53O_Npi.js";
import {
  u as Sl,
  s as Tl,
  a as Dl
} from "./useOriginalVideoRelation-BwrNyVOZ.js";

function Al(m) {
  return typeof m != "string" ? ze(te({}, m), {
    source: 1
  }) : {
    url: m,
    source: 1
  }
}

function El() {
  const m = al(),
    $ = ll(),
    S = ol(),
    Ne = sl(),
    Ie = il(),
    Fe = C(() => S.getters.config),
    Ke = {
      $nextTick: qt,
      $http: ke,
      $_w_toast: e => Ne.show(e),
      $_w_dialog: e => Ie.show(e),
      $route: m,
      $router: $
    },
    ae = nl(),
    _ = Sl(),
    K = ae.isEdit,
    fe = ae.entry,
    Ut = ae.hasnav,
    Je = i(m.query.oid || ""),
    We = i(["0", "1", "2", "3"]),
    Lt = ul(Ke),
    Yt = rl(),
    Zt = dl(Lt.videoScroll, Ke, We, Je.value),
    {
      checkAlbum: J,
      checkAddAlbum: ct,
      addAlbumObj: $e,
      albumList: Ge,
      albumIds: Se,
      addAlbum: ea,
      addAlbumEnter: W,
      checkAlbumRef: ta,
      addAlbumInput: xt,
      videoScroll: le
    } = Lt,
    {
      channelText: Mt,
      channelList: zt,
      category: Qe,
      channel_ids: Te,
      showChannel: Ht,
      play_config: jt,
      allowClip: oe,
      checkAllowDownload: Xe,
      showAllowDownload: vt,
      material_permission: Bt,
      biz_type: Nt,
      coCreateConfig: pt,
      statementConfig: Ye,
      videoAssociateInfo: Ft,
      maxFileSize: aa,
      videoDescInfo: la,
      modifyChannel: ht,
      channelListInit: Ze,
      videoSort: et
    } = Zt,
    {
      title: se,
      doneDisabled: _e
    } = Yt,
    ie = i(null),
    De = i(null),
    Kt = i(null),
    G = i(!1),
    Ae = i(1),
    H = i(!1),
    ft = i(""),
    _t = i(void 0),
    ne = i(!1),
    me = i(!1),
    j = i(!1),
    y = i({
      url: "",
      pid: ""
    }),
    B = i([]),
    Q = i(void 0),
    T = i(void 0),
    D = i({}),
    tt = i(!0),
    mt = i(!1),
    ye = i(void 0),
    ue = i(void 0),
    Ee = i(void 0),
    z = i({}),
    Re = i(!1),
    yt = i(!1),
    gt = i(void 0),
    at = i(0),
    bt = i(!1),
    wt = i(""),
    ge = i(!1),
    be = i(!1),
    X = i(null),
    we = i(""),
    lt = i(!0),
    Ce = i(null),
    qe = i([]),
    ot = i([]),
    q = i(""),
    re = i([]),
    L = i(""),
    de = i(void 0),
    Ve = i(!1),
    st = i(!1),
    it = i(!0),
    Ct = i(!1),
    x = i(""),
    Pe = i(""),
    Y = i(""),
    P = i(0),
    ce = i([]),
    Vt = i(!0),
    Oe = i(void 0),
    kt = C(() => !!m.query.media_id),
    Jt = C(() => oe.value !== void 0),
    Ue = C(() => Tl({
      isAudio: !1,
      isPanorama: de.value,
      videoAssociateInfo: Ft.value
    })),
    oa = C(() => !!X.value || !!we.value),
    It = C(() => D.value && D.value.media_id || ""),
    sa = C(() => [D.value, z.value].filter(Boolean).some(a => a.unsupported_format === !0 || a.isUnsupportedFormat === !0 || a.playable === !1 || a.is_playable === !1 || a.support_play === !1 || a.play_support === !1)),
    $t = C(() => !H.value && T.value !== void 0),
    ia = C(() => T.value !== !0 ? "自动发布" : K.value ? "确认更改" : "发布"),
    Z = C(() => Ye.value || {}),
    na = C(() => Z.value.statement_title || "内容声明"),
    nt = C(() => !!Z.value.statement_required),
    ua = C(() => !!Z.value.statement_show),
    ra = C(() => {
      var e;
      return ((e = Z.value.default_requiredItem) == null ? void 0 : e.id) || ""
    }),
    da = C(() => Array.isArray(Z.value.default_optionalItems) ? Z.value.default_optionalItems.map(e => e.id).filter(Boolean) : []),
    St = C(() => {
      const e = Z.value.confirm_toast || "请选择内容声明";
      return nt.value && !e.includes("必填") ? `${e}（必填）` : e
    }),
    ve = C(() => qe.value.find(e => e.value === q.value)),
    Tt = C(() => {
      var l, n;
      const a = (((l = ve.value) == null ? void 0 : l.textfield_placeholder) || "").match(/最少\s*(\d+)\s*个字|(\d+)\s*characters?/i);
      return a ? Number(a[1] || a[2]) : ((n = ve.value) == null ? void 0 : n.textfield_min_length) || 0
    }),
    ca = C(() => {
      if (!q.value) return St.value;
      const e = qe.value.find(a => a.value === q.value);
      return e ? e.textfield && L.value ? `${e.label}：${L.value}` : e.label : St.value
    }),
    va = C(() => {
      var e;
      return !!(Ue.value && _.enabled.value && _.status.value !== "success" || Q.value === void 0 || nt.value && !q.value || (e = ve.value) != null && e.textfield && L.value.trim().length < Tt.value || _e.value || ie.value && ie.value.status === "upload" || j.value && !Te.value)
    }),
    Wt = C(() => j.value && !Te.value ? !1 : !!T.value),
    M = e => Ne.show(e),
    pa = e => Ie.show(e),
    Le = (e, a = "") => {
      xa({
        act_code: 5447,
        ext: `channel:pc|state:${e}${a?`|failreason:${a}`:""}`
      })
    };
  let pe = !0;
  const ut = () => {
      pe = !0, Ce.value && (clearTimeout(Ce.value), Ce.value = null)
    },
    Gt = () => {
      qt(() => {
        le.value && (le.value.scrollTop = le.value.scrollHeight)
      })
    },
    Dt = e => {
      e && (qe.value = (e.requiredItems || []).map(a => ({
        label: a.title,
        value: a.id,
        textfield: a.textfield,
        textfield_placeholder: a.textfield_placeholder,
        textfield_min_length: a.textfield_min_length,
        textfield_max_length: a.textfield_max_length
      })), ot.value = (e.optionalItems || []).map(a => ({
        label: a.title,
        value: a.id
      })))
    },
    ha = () => {
      be.value = !0
    },
    fa = () => {
      be.value = !1
    },
    _a = e => {
      X.value = e, be.value = !1, M({
        type: "success",
        message: "字幕上传成功"
      })
    },
    ma = () => {
      X.value = null, we.value = ""
    },
    ya = e => {
      Q.value = e
    },
    ga = e => {
      Oe.value = e
    },
    ba = e => {
      Ve.value = e, e && (it.value = !0)
    },
    wa = ({
      type: e
    }) => {
      var a;
      e === "update" && window.history.replaceState({
        current: ((a = window.history.state) == null ? void 0 : a.current) || ""
      }, "", "/upload/channel")
    },
    Ca = () => {
      M({
        type: "warn",
        message: "此合集内视频数量已达上限，请新建合集再添加视频"
      })
    },
    Va = () => {
      var e, a;
      Q.value === void 0 ? (window.scroll(0, 0), M({
        type: "warn",
        message: "请选择类型后再发布"
      })) : nt.value && !q.value ? (Le("fail", "statement"), window.scroll(0, 0), M({
        type: "warn",
        message: "请添加内容声明"
      })) : (e = ve.value) != null && e.textfield && L.value.trim().length < Tt.value ? (Le("fail", "statement"), window.scroll(0, 0), M({
        type: "warn",
        message: ((a = ve.value) == null ? void 0 : a.textfield_placeholder) || "请输入转载来源"
      })) : Ue.value && _.enabled.value && _.status.value !== "success" && M({
        type: "warn",
        message: "请先关联原视频"
      })
    },
    o = e => {
      me.value = !0, e === "upload" && qt(() => {
        var a;
        (a = Kt.value) == null || a.$refs.file.click()
      })
    },
    c = () => {
      var l, n, d, r, v;
      const e = Array.isArray(De.value) ? De.value[0] : De.value,
        a = [e == null ? void 0 : e.$el, (n = (l = e == null ? void 0 : e.$refs) == null ? void 0 : l.form) == null ? void 0 : n.$el, (v = (r = (d = e == null ? void 0 : e.$refs) == null ? void 0 : d.form) == null ? void 0 : r.$refs) == null ? void 0 : v.form].find(b => typeof(b == null ? void 0 : b.scrollIntoView) == "function");
      a && a.scrollIntoView({
        behavior: "smooth"
      })
    },
    he = (e = []) => e.map(a => `${a.time} ${a.text}`.trim()).filter(Boolean).join(`
`),
    V = (e = "") => Ma(e, Y.value) || hl(e, P.value),
    rt = () => {
      if (!P.value) return [];
      const e = V(x.value || ""),
        a = (e == null ? void 0 : e.spotlightLines) || (e == null ? void 0 : e.blockLines);
      return (e == null ? void 0 : e.spotlights) || (a == null ? void 0 : a.map(l => _l(l))) || []
    },
    w = (e = "") => {
      if (!P.value) return;
      const a = V(e);
      if (a) {
        const l = a.spotlightLines || a.blockLines || [];
        Y.value = l.join(`
`), ce.value = l.map(n => {
          const d = n.trim(),
            r = d.search(/\s/);
          return {
            time: d.slice(0, r),
            text: d.slice(r).trim()
          }
        });
        return
      }
      Y.value = "", P.value = 0, ce.value = []
    },
    ee = (e = "") => {
      const a = Ma(e, Y.value);
      if (!a) return e;
      const l = a.blockLines || a.spotlightLines || [];
      return a.lines.splice(a.startIndex, l.length), a.lines.join(`
`)
    },
    xe = () => {
      x.value = ee(x.value || ""), ce.value = [], Y.value = "", P.value = 0
    },
    Me = () => {
      Pe.value && (URL.revokeObjectURL(Pe.value), Pe.value = "")
    },
    p = e => {
      const a = e.map(v => ({
          time: v.time,
          text: v.text
        })),
        l = he(a),
        n = x.value || "",
        d = V(n),
        r = ee(n);
      if (ce.value = a, Y.value = l, P.value = a.length, l)
        if (d) {
          const v = r.split(`
`),
            b = Math.min(d.startIndex, v.length);
          v.splice(b, 0, ...l.split(`
`)), x.value = v.join(`
`)
        } else x.value = fl(r, l);
      else x.value = r;
      qt(c)
    },
    At = (e = !1) => {
      ut(), Me();
      const a = ne.value;
      e && (ft.value = Date.now()), G.value = !1, Ae.value = 1, H.value = !1, _t.value = void 0, me.value = !1, j.value = !1, y.value = {
        url: "",
        pid: ""
      }, B.value = [], Q.value = void 0, T.value = void 0, D.value = {}, tt.value = !0, mt.value = !1, ye.value = void 0, ue.value = void 0, Ee.value = void 0, z.value = {}, Re.value = !1, yt.value = !1, gt.value = void 0, at.value = 0, bt.value = !1, wt.value = "", ge.value = !1, be.value = !1, X.value = null, we.value = "", lt.value = !0, qe.value = [], ot.value = [], q.value = "", re.value = [], L.value = "", de.value = void 0, Ve.value = !1, st.value = !1, it.value = !0, Ct.value = !1, x.value = "", Y.value = "", P.value = 0, ce.value = [], Vt.value = !0, Oe.value = void 0, We.value = ["0", "1", "2", "3"], ne.value = a
    },
    Et = e => {
      var a, l;
      (a = ie.value) == null || a.logUpload(), (l = ie.value) == null || l.updateMd5(e)
    },
    $a = (e, a) => {
      var l, n;
      e === "close" ? ((l = ie.value) == null || l.cancelMethods(), se.value = "", At(!0)) : e === "auto" ? H.value = !0 : e === "closeShow" ? ((n = ie.value) == null || n.cancelMethods(), se.value = "", At(!0), G.value = !0, Ae.value = a) : e === "visible" ? Vt.value = a === 0 : e === "schedule_timestamp" ? yt.value = a : e === "mediaid" ? Et(a) : a === void 0 && (x.value = e, w(e))
    },
    Ha = (e = []) => !Array.isArray(e) || !e.length ? !1 : (B.value = e.map((a, l) => ze(te({}, a), {
      source: l === 0 ? 11 : 2
    })), y.value && y.value.url || (y.value = B.value[0]), !0),
    ja = (e, a) => {
      var R;
      if (!e) return null;
      const l = e[a] || e;
      if (((R = l == null ? void 0 : l.screenshot) == null ? void 0 : R.state) !== 1) return null;
      const n = l.screenshot;
      let d = null;
      if (n.file_detail) try {
        d = JSON.parse(n.file_detail)
      } catch (k) {
        d = null
      }
      d || (d = n.file_detail_value);
      const r = Array.isArray(d == null ? void 0 : d.files) ? d.files : [];
      if (r.length) return r.map(k => ze(te(te({}, n), k), {
        url: k.url || (k.pid ? Qt(k.pid) : ""),
        pid: k.pid || k.file_id || "",
        file_id: k.file_id || n.file_id || ""
      })).filter(k => k.url);
      const v = n.file_id || "",
        b = n.url || (v ? Qt(v) : "");
      return b ? [ze(te({}, n), {
        url: b,
        pid: v,
        file_id: n.file_id || ""
      })] : null
    },
    Ba = e => {
      if (!e || !m.query.preupdate_id) return;
      ut(), pe = !1;
      const a = () => {
        pe || ke.get("/ajax/multimedia/output", {
          params: {
            source: 339644097,
            ids: e,
            labels: "screenshot"
          }
        }).then(l => {
          var d;
          if (pe) return;
          const n = ja((d = l == null ? void 0 : l.data) == null ? void 0 : d.data, e);
          if (Ha(n || [])) {
            pe = !0;
            return
          }
          pe || (Ce.value = setTimeout(a, 5e3))
        }).catch(() => {
          pe || (Ce.value = setTimeout(a, 5e3))
        })
      };
      a()
    },
    Na = (...e) => {
      var a;
      switch (e[0]) {
        case "show":
          Ze();
          break;
        case "file":
          xe(), T.value = !1, D.value = {}, ye.value = void 0, de.value = !1, Me(), e[1] && (Pe.value = URL.createObjectURL(e[1]));
          break;
        case "screenshot":
          B.value = Array.isArray(e[1]) && e[1].map((l, n) => ze(te({}, l), {
            source: n === 0 ? 11 : 2
          })) || [], y.value && y.value.url || (y.value = B.value[0] ? B.value[0] : {
            url: "",
            pid: ""
          });
          break;
        case "success":
          yl({
            key: "execuploadsuccess"
          }), T.value = !0, D.value = e[1];
          break;
        case "start":
          H.value = !1, T.value = !1;
          break;
        case "init":
          ut(), xe(), H.value = !1, T.value = !1, D.value = {}, y.value = {
            url: "",
            pid: ""
          }, B.value = [], ye.value = void 0, ue.value = void 0, de.value = !1, j.value = !1, J.value = !1, tt.value = !0, Me();
          break;
        case "cancel":
          xe(), T.value = void 0, D.value = {}, ye.value = void 0, de.value = !1, Me(), at.value = "", X.value = null, we.value = "", lt.value = !1, qt(() => {
            lt.value = !0
          });
          break;
        case "replace":
          Re.value = !0;
          break;
        case "detail":
          e[1] && e[1].width < e[1].height && (ue.value = !0), e[1] && e[1].duration && (ye.value = e[1].duration), de.value = !!((a = e[1]) != null && a.isPanorama);
          {
            const {
              width: l,
              height: n
            } = e[1];
            at.value = Math.min(l, n)
          }
          break
      }
    },
    Fa = (...e) => {
      me.value = !1, e[0] === "select" ? y.value = B.value[e[1] - 1] : e[0] === "change" && (y.value = Al(e[1].url), e[1].cover && (Ee.value = e[1].cover))
    },
    ka = () => {
      var r, v, b, R, k, O, Rt;
      const e = [];
      Ge.value.forEach(N => {
        N.checked && e.push(N.id)
      });
      const a = N => N.split("/").slice(-1)[0].split(".")[0],
        l = {
          titles: [{
            title: se.value,
            default: "true"
          }],
          covers: [te({
            url: y.value.url,
            pid: y.value.pid || y.value.file_id,
            source: (r = y.value.source) != null ? r : ""
          }, ml((v = y.value) != null && v.pid ? y.value.pid : a((b = y.value) == null ? void 0 : b.url)))],
          free_duration: {
            start: 0,
            end: 30
          }
        };
      (R = Oe.value) != null && R.coCreation && (l.cooperate_video = Oe.value.selectArr.map(N => ({
        uid: N.id,
        role: N.role
      })), (O = (k = pt.value) == null ? void 0 : k.permanent_host) != null && O.length ? l.permanent_host = pt.value.permanent_host.map(N => N.uid) : l.permanent_host = []), Ve.value && (l.um_video_switch = Ve.value === "um_video", l.is_vip_paid = Ve.value === "vplus_video"), Bt.value && fe.value !== "edit" && (l.copyright_video_switch = it.value), fe.value === "edit" && Re.value === !0 && (l.edit_object_id = D.value.media_id);
      const n = Qe.value ? "homemade" : "contribution";
      l.type = "video", l.media_id = D.value.media_id, fe.value === "edit" && n === "homemade" && (l.homemade_changed = 1), Ee.value && l.covers.push({
        type: 1,
        pid: Ee.value.pid,
        source: 1
      }), l.resource = {
        video_down: Xe.value ? 1 : 0
      }, Jt.value && (l.resource.allow_clip = +oe.value), Dl({
        showOriginalVideoRelation: Ue.value,
        status: _.status.value,
        mediaId: _.mediaId.value
      }) && (l.video_associate_id = _.mediaId.value, l.resource.manual_split = {
        origin_media_id: _.mediaId.value,
        origin_url: _.url.value
      }), q.value && (l.resource.statement = {
        required: {
          id: q.value
        },
        optional: re.value.map(N => ({
          id: N
        }))
      }, (Rt = ve.value) != null && Rt.textfield && L.value.trim() && (l.resource.statement.required.textfield_content = L.value.trim())), st.value && (l.resource.allow_highlight_preheat = 1), l[n] = {
        channel_ids: [Te.value],
        type: Q.value
      }, ne.value && (l.approval_reprint = tt.value ? "1" : "0"), mt.value && (l.follower_watch_entire = {
        enable: 0
      }), J.value && l.type !== "audio" && (l.playlist = {
        playlist_video: !0,
        album_ids: e.toString()
      });
      const d = rt();
      return d.length && (l.spotlight_visible = 1, l.spotlights = d), l
    },
    Sa = (e = !0) => (T.value && e && (_t.value = ka()), !0),
    Ta = () => {
      if (!Wt.value) Sa(!1) && pa({
        btnConfirm: "我知道了",
        message: "设置自动发布成功！ 微博将于视频文件上传并转码完成后自动发出。在文件上传完毕前请勿关闭浏览器窗口",
        action: () => {
          $a("auto")
        }
      });
      else {
        const e = ka(),
          a = {
            oid: Je.value,
            mid: z.value.mid,
            media: JSON.stringify(e)
          };
        ke.post("/ajax/multimedia/submitVideoEditInfo", a).then(l => {
          l.data.ok > 0 && l.data.data && l.data.data.result && (G.value = !0)
        }).catch(l => {
          console.warn(l)
        })
      }
    },
    Ka = () => {
      Ht.value = !1
    },
    Ja = () => {
      M({
        type: "warn",
        message: "共创视频不可转载"
      })
    },
    Wa = ({
      requiredValue: e,
      optionalValues: a,
      reprintSource: l
    }) => {
      q.value = e, re.value = a, L.value = l
    },
    Ga = e => {
      M({
        type: "warn",
        message: e
      })
    },
    Da = e => {
      var R, k;
      if (fe.value === "edit" && Re.value) return;
      const a = O => {
          if (!O || typeof O != "string") return O;
          try {
            return JSON.parse(O)
          } catch (Rt) {
            return O
          }
        },
        l = a(e == null ? void 0 : e.resource),
        n = a(e == null ? void 0 : e.resource_info),
        d = a((k = (R = e == null ? void 0 : e.covers) == null ? void 0 : R[0]) == null ? void 0 : k.resource),
        r = (e == null ? void 0 : e.statement) || (l == null ? void 0 : l.statement) || (n == null ? void 0 : n.statement) || (d == null ? void 0 : d.statement),
        v = (r == null ? void 0 : r.required) || (r == null ? void 0 : r.user_requiredItem),
        b = (r == null ? void 0 : r.optional) || (r == null ? void 0 : r.user_optionalItems);
      if (!r) {
        q.value = "", re.value = [], L.value = "";
        return
      }
      q.value = (v == null ? void 0 : v.id) || "", re.value = Array.isArray(b) ? b.map(O => O == null ? void 0 : O.id).filter(Boolean) : [], L.value = (v == null ? void 0 : v.textfield_content) || ""
    },
    Aa = e => {
      var v;
      se.value = e.titles[0] && e.titles[0].title, Da(e), y.value = {
        url: e.covers[0].url
      }, e.current_playlists && e.current_playlists.length > 0 && (Se.value = e.current_playlists.map(b => b.id), J.value = !0);
      const a = e != null && e.homemade_info && ((v = Object.keys(e == null ? void 0 : e.homemade_info)) != null && v.length) ? e.homemade_info : e == null ? void 0 : e.contribution_info,
        l = a == null ? void 0 : a.first_level_channels,
        n = a == null ? void 0 : a.second_level_channels;
      let d = 0,
        r = 0;
      l && l[0] && (j.value = !0, (Qe.value ? Qe.value : zt.value).forEach((R, k) => {
        R.channel_id === l[0].id && (d = k, R.sub_channels && R.sub_channels.length > 0 && n && n[0] && R.sub_channels.forEach((O, Rt) => {
          O.sub_channel_id === n[0].id && (r = Rt, ht("main", d), ht("sub", r))
        }))
      })), Q.value = a == null ? void 0 : a.type
    },
    Ea = e => {
      ke.get("/ajax/multimedia/getVideoEditInfo", {
        params: {
          media_id: e
        }
      }).then(a => {
        var l, n;
        if (a.data && a.data.ok > 0) {
          we.value = (l = a.data.srt) == null ? void 0 : l.title;
          const d = a.data.data,
            r = d && d.video_info;
          if (r.editable) z.value = r, D.value.media_id = (n = r.oid) == null ? void 0 : n.replace("1034:", ""), z.value.height > z.value.width && (ue.value = !0), z.value && (Aa(z.value), _.restore(ze(te(te({}, d), z.value), {
            associateVideo: a.data.associateVideo
          }))), r.pay_audio && (gt.value = r.pay_audio);
          else {
            const v = r.reject_edit_reason || r.non_editable_reason || "抱歉，当前视频无法编辑";
            Ut.value ? M({
              type: "warn",
              message: v,
              action: () => {
                $.push({
                  name: "videoManage"
                })
              }
            }) : M({
              type: "warn",
              message: v,
              autohide: !1,
              mask: !0
            })
          }
        }
      }, () => {
        M({
          type: "warn",
          message: "抱歉，当前视频无法编辑"
        })
      })
    },
    Ra = () => {
      const {
        media_id: e,
        oid: a,
        mid: l,
        type: n
      } = m.query;
      ke.get("/ajax/multimedia/getAIClipInfo", {
        params: {
          media_id: e,
          oid: a,
          mid: l,
          schedule: +(n === "schedule")
        }
      }).then(d => {
        var r;
        if (d.data.ok > 0) {
          bt.value = !0;
          const v = d.data.data;
          y.value = {
            url: v.cover
          }, x.value = v.text, c(), v.schedule > 0 && ((r = De.value) == null || r.handleSchedule(v.schedule))
        }
      })
    },
    qa = () => {
      const {
        expires: e,
        uuid: a,
        signature: l,
        media_id: n
      } = m.query;
      ke.get("/ajax/multimedia/getCutInfo", {
        params: {
          expires: e,
          uuid: a,
          signature: l,
          media_id: n
        }
      }).then(d => {
        var r, v, b;
        d.data.ok > 0 && ((r = d.data.data) != null && r.cover) && (Ct.value = !0, D.value.media_id = m.query.media_id, y.value.url = (v = d.data.data) == null ? void 0 : v.cover, se.value = (b = d.data.data) == null ? void 0 : b.title, T.value = !0)
      })
    },
    Pa = () => {
      m.query.preupdate_id && ke.get("/ajax/statuses/getPreUpdate", {
        params: {
          preupdate_id: m.query.preupdate_id
        }
      }).then(e => {
        if (e.data.ok > 0 && e.data.data) {
          const {
            media_id: a,
            pid: l,
            horizontal: n,
            title: d
          } = e.data.data;
          n !== void 0 && (ue.value = Number(n) === 0), l && (y.value = {
            url: Qt(l),
            pid: l
          }), Ba(a), se.value = d, ge.value = !0, D.value.media_id = a, T.value = !0
        }
      })
    },
    Qa = e => {
      var a;
      st.value = (a = e == null ? void 0 : e.enabled) != null ? a : !1
    };
  return dt(H, e => {
    if (!e) try {
      gl.close()
    } catch (a) {}
  }), dt(Ue, e => {
    e || _.clear()
  }), dt(() => _.enabled.value, e => {
    e || _.clear()
  }), dt(j, e => {
    e === !1 ? (Mt.value = "选择视频分类", Te.value = "", We.value = ["0", "1", "2", "3"], Q.value = void 0) : Gt()
  }), dt(T, e => {
    fe.value === "edit" && e && H.value && Ta()
  }), dt(Ye, e => {
    Dt(e)
  }, {
    immediate: !0,
    deep: !0
  }), cl(() => {
    K.value && (Je.value = m.query.oid, T.value = !0)
  }), vl(() => {
    ut(), Me()
  }), pl(() => La(this, null, function*() {
    var r;
    ke.get("/ajax/multimedia/getapproval").then(({
      data: v
    }) => {
      v.ok && (ne.value = v.showApprovalRepeat)
    }), yield Ze();
    const {
      oid: e,
      media_id: a,
      type: l,
      mid: n,
      preupdate_id: d
    } = m.query;
    if (d) Pa();
    else if (l === "cut") wt.value = l, qa();
    else if (l === "wedance") {
      const {
        media_id: v,
        pid: b,
        horizontal: R
      } = m.query;
      if (b) {
        const k = Qt(b);
        y.value.url = k, y.value.pid = b, R !== void 0 && (ue.value = Number(R) === 0)
      }
      D.value.media_id = v, T.value = !0
    } else K.value && e && Ea(e);
    e && a && n && Ra(), xa({
      uicode: "30000840",
      actType: "7635",
      ext: `is_authorized:${(r=Fe.value.flags)==null?void 0:r.audio_auth}`
    })
  })), {
    route: m,
    isEdit: K,
    entry: fe,
    hasnav: Ut,
    oid: Je,
    config: Fe,
    checkAlbum: J,
    checkAddAlbum: ct,
    addAlbumObj: $e,
    albumList: Ge,
    albumIds: Se,
    addAlbum: ea,
    addAlbumEnter: W,
    checkAlbumRef: ta,
    addAlbumInput: xt,
    videoScroll: le,
    channelText: Mt,
    channelList: zt,
    category: Qe,
    channel_ids: Te,
    play_config: jt,
    allowClip: oe,
    checkAllowDownload: Xe,
    showAllowDownload: vt,
    material_permission: Bt,
    biz_type: Nt,
    coCreateConfig: pt,
    statementConfig: Ye,
    videoAssociateInfo: Ft,
    maxFileSize: aa,
    videoDescInfo: la,
    modifyChannel: ht,
    channelListInit: Ze,
    videoSort: et,
    title: se,
    doneDisabled: _e,
    showToast: G,
    toastType: Ae,
    autoPublish: H,
    time: ft,
    successData: _t,
    show_approval_reprint: ne,
    videoEdit: me,
    checkExposure: j,
    screenshot: y,
    screenArray: B,
    type: Q,
    uploadSuccess: T,
    videoDetails: D,
    forward_strategy: tt,
    follower_watch_entire: mt,
    duration: ye,
    horizontal: ue,
    horizontalCover: Ee,
    videoInfo: z,
    replaceVideo: Re,
    curTimer: yt,
    payInfo: gt,
    definition: at,
    isAiClip: bt,
    publishType: wt,
    isPrePublish: ge,
    uploadSrtVisible: be,
    srtFile: X,
    srtTitle: we,
    srtRender: lt,
    declarationRequiredOptions: qe,
    declarationOptionalOptions: ot,
    selectedDeclarationRequired: q,
    selectedDeclarationOptional: re,
    declarationReprintSource: L,
    isPanorama: de,
    um_video: Ve,
    highlightPreloadState: st,
    copyright_video_switch: it,
    cutUpload: Ct,
    publisherContent: x,
    localVideoSrc: Pe,
    videoHighlightContent: Y,
    videoHighlightLineCount: P,
    videoHighlights: ce,
    showChannel: Ht,
    showCoCreation: Vt,
    coCreationState: Oe,
    supported_video_type: We,
    videoUploadRef: ie,
    publisherRef: De,
    videoEditRef: Kt,
    hasMediaId: kt,
    showAllowClip: Jt,
    showOriginalVideoRelation: Ue,
    hasSrt: oa,
    mediaId: It,
    videoHighlightUnsupportedFormat: sa,
    showMoreDetail: $t,
    sendDesc: ia,
    statementModel: Z,
    statementTitle: na,
    statementRequired: nt,
    statementShow: ua,
    statementDefaultRequiredValue: ra,
    statementDefaultOptionalValues: da,
    statementPlaceholder: St,
    currentDeclarationRequiredOption: ve,
    currentDeclarationRequiredMinLength: Tt,
    declarationText: ca,
    channelDisabled: va,
    isDone: Wt,
    enabled: _.enabled,
    relationUrl: _.url,
    relationStatus: _.status,
    errorText: _.errorText,
    originalVideoRelationVideoInfo: _.videoInfo,
    originalVideoRelationMediaId: _.mediaId,
    updateUrl: _.updateUrl,
    relate: _.relate,
    clear: _.clear,
    logPublishStatementState: Le,
    syncDeclarationConfig: Dt,
    handleUploadSrt: ha,
    closeUploadSrt: fa,
    confirmUploadSrt: _a,
    handleDeleteSrt: ma,
    handleTypeChange: ya,
    handleCoCreationChange: ga,
    umVideoChange: ba,
    handlePublisherSuccess: wa,
    albumsMore: Ca,
    disabledCheck: Va,
    changeEdit: o,
    change: $a,
    handleReset: At,
    updateMd5: Et,
    uploadChange: Na,
    changeVideoEdit: Fa,
    done: Sa,
    getSuccessData: ka,
    submitEditInfo: Ta,
    closeChannel: Ka,
    showToastType: Ja,
    handleDeclarationConfirm: Wa,
    handleDeclarationInvalid: Ga,
    syncDeclarationFromInfo: Da,
    initEditVideoInfo: Aa,
    getVideoEditInfo: Ea,
    getAIClipInfo: Ra,
    getCutInfo: qa,
    getPreUpdateData: Pa,
    changeHighlightPreload: Qa,
    formatVideoHighlightContent: he,
    findCurrentVideoHighlightBlock: V,
    getVideoSpotlights: rt,
    syncVideoHighlightContent: w,
    removeVideoHighlightContent: ee,
    clearVideoHighlightState: xe,
    handleVideoHighlightConfirm: p,
    focusPublisher: c,
    scrollToBottom: Gt
  }
}
const Rl = {
    key: 0
  },
  ql = {
    class: "wbpro-form"
  },
  Pl = ["value"],
  Ol = ["textContent"],
  Ul = {
    key: 1,
    style: {
      height: "22px"
    }
  },
  Ll = {
    style: {
      height: "22px"
    }
  },
  xl = {
    style: {
      position: "relative"
    }
  },
  Ml = bl({
    __name: "VideoPublish",
    setup(m) {
      const $ = A(() => E(() => import("./UploadSrt-CZC5WYmW.js"), __vite__mapDeps([0, 1, 2, 3]))),
        S = A(() => E(() => import("./VideoUpload-B8NiZRzb.js"), __vite__mapDeps([4, 1, 2, 5]))),
        Ne = A(() => E(() => import("./Sort-DxNkHIdo.js"), __vite__mapDeps([6, 1, 2, 7]))),
        Ie = A(() => E(() => import("./VideoEdit-rZdHwyDj.js"), __vite__mapDeps([8, 1, 2, 9]))),
        Fe = A(() => E(() => import("./index-D53O_Npi.js").then(o => o.aR), __vite__mapDeps([1, 2]))),
        Ke = A(() => E(() => import("./index-D53O_Npi.js").then(o => o.aS), __vite__mapDeps([1, 2]))),
        ae = A(() => E(() => import("./CoCreation-CSz2-tyt.js"), __vite__mapDeps([10, 1, 2, 11]))),
        _ = A(() => E(() => import("./HighlightPreload-Celtsomc.js"), __vite__mapDeps([12, 1, 2, 13]))),
        K = A(() => E(() => import("./HeaderComment-BVhDr6An.js"), __vite__mapDeps([14, 1, 2, 15]))),
        fe = A(() => E(() => import("./Success-DG9IWXTo.js"), __vite__mapDeps([16, 1, 2, 17]))),
        Ut = A(() => E(() => import("./AutoState-fpP-UYEv.js"), __vite__mapDeps([18, 1, 2, 19]))),
        Je = A(() => E(() => import("./Type-C9zyx6ES.js"), __vite__mapDeps([20, 1, 2, 21]))),
        We = A(() => E(() => import("./Title-DRDcPezD.js"), __vite__mapDeps([22, 1, 2, 23]))),
        Lt = A(() => E(() => import("./OriginalVideoRelation-CHEi5l1x.js"), __vite__mapDeps([24, 1, 2, 25]))),
        Yt = A(() => E(() => import("./VideoHighlightEntry-WtZobEBH.js"), __vite__mapDeps([26, 1, 2, 27]))),
        Zt = A(() => E(() => import("./index-D53O_Npi.js").then(o => o.aQ), __vite__mapDeps([1, 2]))),
        J = A(() => E(() => import("./index-D53O_Npi.js").then(o => o.aO), __vite__mapDeps([1, 2]))),
        {
          isEdit: ct,
          entry: $e,
          hasnav: Ge,
          checkAlbum: Se,
          checkAddAlbum: ea,
          addAlbumObj: W,
          albumList: ta,
          addAlbum: xt,
          addAlbumEnter: le,
          checkAlbumRef: Mt,
          addAlbumInput: zt,
          videoScroll: Qe,
          channelText: Te,
          channelList: Ht,
          category: jt,
          play_config: oe,
          allowClip: Xe,
          checkAllowDownload: vt,
          showAllowDownload: Bt,
          material_permission: Nt,
          biz_type: pt,
          coCreateConfig: Ye,
          videoDescInfo: Ft,
          maxFileSize: aa,
          modifyChannel: la,
          videoSort: ht,
          title: Ze,
          showToast: et,
          toastType: se,
          autoPublish: _e,
          time: ie,
          successData: De,
          show_approval_reprint: Kt,
          videoEdit: G,
          screenshot: Ae,
          screenArray: H,
          type: ft,
          uploadSuccess: _t,
          forward_strategy: ne,
          follower_watch_entire: me,
          duration: j,
          horizontal: y,
          replaceVideo: B,
          curTimer: Q,
          payInfo: T,
          definition: D,
          isAiClip: tt,
          publishType: mt,
          isPrePublish: ye,
          uploadSrtVisible: ue,
          srtFile: Ee,
          srtTitle: z,
          srtRender: Re,
          declarationRequiredOptions: yt,
          declarationOptionalOptions: gt,
          selectedDeclarationRequired: at,
          selectedDeclarationOptional: bt,
          declarationReprintSource: wt,
          isPanorama: ge,
          um_video: be,
          copyright_video_switch: X,
          cutUpload: we,
          publisherContent: lt,
          localVideoSrc: Ce,
          videoHighlights: qe,
          showChannel: ot,
          showCoCreation: q,
          coCreationState: re,
          videoUploadRef: L,
          publisherRef: de,
          videoEditRef: Ve,
          hasMediaId: st,
          showAllowClip: it,
          showOriginalVideoRelation: Ct,
          hasSrt: x,
          mediaId: Pe,
          videoHighlightUnsupportedFormat: Y,
          showMoreDetail: P,
          sendDesc: ce,
          statementTitle: Vt,
          statementRequired: Oe,
          statementShow: kt,
          statementDefaultRequiredValue: Jt,
          statementDefaultOptionalValues: Ue,
          declarationText: oa,
          channelDisabled: It,
          isDone: sa,
          enabled: $t,
          relationUrl: ia,
          relationStatus: Z,
          errorText: na,
          originalVideoRelationVideoInfo: nt,
          updateUrl: ua,
          relate: ra,
          clear: da,
          handleUploadSrt: St,
          closeUploadSrt: ve,
          confirmUploadSrt: Tt,
          handleDeleteSrt: ca,
          handleTypeChange: va,
          handleCoCreationChange: Wt,
          handlePublisherSuccess: M,
          albumsMore: pa,
          disabledCheck: Le,
          changeEdit: pe,
          change: ut,
          uploadChange: Gt,
          changeVideoEdit: Dt,
          done: ha,
          getSuccessData: fa,
          submitEditInfo: _a,
          closeChannel: ma,
          showToastType: ya,
          handleDeclarationConfirm: ga,
          handleDeclarationInvalid: ba,
          changeHighlightPreload: wa,
          handleVideoHighlightConfirm: Ca,
          umVideoChange: Va
        } = El();
      return wl({
        title: "视频发布"
      }), (o, c) => {
        const he = He("woo-divider"),
          V = He("woo-box-item"),
          rt = He("woo-fonticon"),
          w = He("woo-box"),
          ee = He("woo-switch"),
          xe = He("woo-checkbox"),
          Me = He("woo-button");
        return g(), F("div", {
          class: u([o.$style.mainContainer, o.$style.mainContainerNarrow])
        }, [(g(), F("div", {
          key: t(ie),
          class: u(o.$style.leftPanel)
        }, [s(t(fe), {
          showToast: t(et),
          toastType: t(se),
          videoEdit: t(G),
          hasnav: t(Ge)
        }, null, 8, ["showToast", "toastType", "videoEdit", "hasnav"]), je(h("div", {
          class: u(["wbpro-layer", [o.$style.layer, !t(Ge) && o.$style.layer2, o.$style.layerNarrow]])
        }, [s(t(K), {
          showMoreDetail: t(_e) || t(P),
          videoDescInfo: t(Ft),
          definition: t(D)
        }, null, 8, ["showMoreDetail", "videoDescInfo", "definition"]), h("div", {
          ref_key: "videoScroll",
          ref: Qe,
          class: u(["modal-scroll", o.$style.unmodal]),
          onTouchmovePassive: c[18] || (c[18] = Ot(() => {}, ["stop"]))
        }, [h("div", {
          class: u(o.$style.videobox)
        }, [h("div", {
          class: u(o.$style.top1)
        }, [t(et) ? I("", !0) : (g(), U(t(S), {
          key: 0,
          ref_key: "videoUploadRef",
          ref: L,
          type: "channel",
          screenshot: t(Ae).url,
          biz_type: t(pt),
          audioCanPay: !1,
          payInfo: t(T),
          cutUpload: t(we),
          maxFileSize: t(aa),
          isPrePublish: t(ye),
          hasSrt: t(x),
          onVideoChange: t(Gt),
          onUmVideo: t(Va),
          onEdit: c[0] || (c[0] = p => G.value = !0),
          onUploadSrt: t(St)
        }, null, 8, ["screenshot", "biz_type", "payInfo", "cutUpload", "maxFileSize", "isPrePublish", "hasSrt", "onVideoChange", "onUmVideo", "onUploadSrt"])), je(s(he, {
          "border-color": "var(--w-card-border)",
          class: u(o.$style.gap1)
        }, null, 8, ["class"]), [
          [Pt, t(_e) || t(P)]
        ])], 2), s(t(Ut), {
          hasnav: t(Ge),
          autoPublish: t(_e),
          onCancel: c[1] || (c[1] = p => _e.value = !1)
        }, null, 8, ["hasnav", "autoPublish"]), je(h("div", null, [s(t(Je), {
          coCreationState: t(re),
          hideRepostOption: t(kt),
          onShowToast: t(ya),
          selectedType: t(ft),
          onTypeChange: t(va)
        }, null, 8, ["coCreationState", "hideRepostOption", "onShowToast", "selectedType", "onTypeChange"]), t(kt) ? (g(), F(Ia, {
          key: 0
        }, [s(t(Zt), {
          title: t(Vt),
          displayText: t(oa),
          requiredOptions: t(yt),
          optionalOptions: t(gt),
          defaultRequiredValue: t(Jt),
          defaultOptionalValues: t(Ue),
          requiredValue: t(at),
          optionalValues: t(bt),
          reprintSource: t(wt),
          required: t(Oe),
          onConfirm: t(ga),
          onInvalid: t(ba)
        }, null, 8, ["title", "displayText", "requiredOptions", "optionalOptions", "defaultRequiredValue", "defaultOptionalValues", "requiredValue", "optionalValues", "reprintSource", "required", "onConfirm", "onInvalid"]), s(he, {
          "border-color": "var(--w-card-border)",
          class: u(o.$style.gap1)
        }, null, 8, ["class"])], 64)) : I("", !0), s(t(We), {
          content: t(Ze),
          onInput: c[2] || (c[2] = p => Ze.value = p)
        }, null, 8, ["content"]), s(t(Fe), {
          edit: t(G),
          screenArray: t(H),
          screenshot: t(Ae).url,
          horizontal: t(y),
          channel: !0,
          hasMediaId: t(st),
          onEdit: t(pe),
          onChange: t(Dt)
        }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "hasMediaId", "onEdit", "onChange"]), h("div", null, [s(he, {
          "border-color": "var(--w-card-border)",
          class: u(o.$style.gap1)
        }, null, 8, ["class"]), h("div", {
          class: u(o.$style.gap1)
        }, [h("div", null, [h("div", {
          class: u(o.$style.gap2)
        }, [h("div", {
          class: u(o.$style.tit1)
        }, " 分类 ", 2), je((g(), F("div", {
          class: u(o.$style.top1)
        }, [s(w, {
          align: "center",
          class: u(["wbpro-select wbpor-pos error", o.$style.sort]),
          onClick: c[3] || (c[3] = Ot(p => ot.value = !0, ["stop"]))
        }, {
          default: f(() => [s(V, {
            align: "center"
          }, {
            default: f(() => [za(Xt(t(Te)), 1)]),
            _: 1
          }), s(w, {
            align: "center",
            justify: "center",
            class: "opt"
          }, {
            default: f(() => [s(rt, {
              value: "caretDown"
            })]),
            _: 1
          }), je(s(t(Ne), {
            ref_key: "videoSort",
            ref: ht,
            class: u(o.$style.sortin),
            list: t(jt) ? t(jt) : t(Ht),
            onChange: t(la)
          }, null, 8, ["class", "list", "onChange"]), [
            [Pt, t(ot)]
          ])]),
          _: 1
        }, 8, ["class"])], 2)), [
          [t(Cl), t(ma)]
        ])], 2)])], 2), s(t(_), {
          duration: t(j),
          onChange: t(wa)
        }, null, 8, ["duration", "onChange"]), h("div", {
          class: u(o.$style.gap1)
        }, [s(w, {
          align: "center",
          class: u(o.$style.switch)
        }, {
          default: f(() => [s(V, {
            align: "center"
          }, {
            default: f(() => [s(w, {
              align: "center"
            }, {
              default: f(() => [h("div", {
                class: u([o.$style.gray1, o.$style.tit1])
              }, " 合集 ", 2), s(t(J), {
                title: "微博合集",
                desc: ` 1、合集功能可以让你对自己的视频作品进行分类管理。
                            <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。
                            <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。`
              })]),
              _: 1
            })]),
            _: 1
          }), h("div", null, [s(ee, {
            ref_key: "checkAlbumRef",
            ref: Mt,
            modelValue: t(Se),
            "onUpdate:modelValue": c[4] || (c[4] = p => Be(Se) ? Se.value = p : null),
            size: .6875
          }, null, 8, ["modelValue"])])]),
          _: 1
        }, 8, ["class"]), t(Se) ? (g(), F("div", Rl, [h("div", {
          class: u(o.$style.scroll)
        }, [(g(!0), F(Ia, null, Vl(t(ta), (p, At) => (g(), U(w, {
          key: At,
          align: "center",
          class: u(o.$style.top2)
        }, {
          default: f(() => [s(xe, {
            modelValue: p.checked,
            "onUpdate:modelValue": Et => p.checked = Et,
            value: "check1",
            class: u(o.$style.label2),
            disabled: p.item_count >= 500,
            onClick: Et => p.item_count >= 500 && t(pa)()
          }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "onClick"]), s(V, null, {
            default: f(() => [h("div", ql, [s(w, {
              align: "center"
            }, {
              default: f(() => [h("span", {
                class: u(o.$style.albumIcon)
              }, null, 2), s(V, null, {
                default: f(() => [h("input", {
                  type: "text",
                  value: p.value + (p.checked ? `(更新至${p.item_count+1}集)` : `(共${p.item_count}集)`),
                  disabled: "",
                  onKeypress: c[5] || (c[5] = Ot(() => {}, ["stop"]))
                }, null, 40, Pl)]),
                _: 2
              }, 1024)]),
              _: 2
            }, 1024)])]),
            _: 2
          }, 1024)]),
          _: 2
        }, 1032, ["class"]))), 128)), t(ea) ? (g(), U(w, {
          key: 0,
          align: "center",
          class: u(o.$style.top2)
        }, {
          default: f(() => [s(xe, {
            modelValue: t(W).checked,
            "onUpdate:modelValue": c[6] || (c[6] = p => t(W).checked = p),
            value: "check2",
            class: u(o.$style.label2),
            disabled: t(W).disabled
          }, null, 8, ["modelValue", "class", "disabled"]), s(V, null, {
            default: f(() => [h("div", {
              class: u(["wbpro-form focus", {
                error: t(W).error
              }])
            }, [s(w, {
              align: "center"
            }, {
              default: f(() => [s(rt, {
                value: "album",
                class: u(o.$style.icon1)
              }, null, 8, ["class"]), s(V, null, {
                default: f(() => [je(h("input", {
                  ref_key: "addAlbumInput",
                  ref: zt,
                  "onUpdate:modelValue": c[7] || (c[7] = p => t(W).message = p),
                  type: "text",
                  onKeyup: c[8] || (c[8] = kl((...p) => t(le) && t(le)(...p), ["enter"])),
                  onBlur: c[9] || (c[9] = (...p) => t(le) && t(le)(...p)),
                  onKeypress: c[10] || (c[10] = Ot(() => {}, ["stop"]))
                }, null, 544), [
                  [Il, t(W).message]
                ])]),
                _: 1
              }), t(W).error ? (g(), F("div", {
                key: 0,
                class: "num",
                textContent: Xt(`${t(W).number}/12`)
              }, null, 8, Ol)) : I("", !0)]),
              _: 1
            })], 2)]),
            _: 1
          })]),
          _: 1
        }, 8, ["class"])) : I("", !0)], 2), h("div", {
          class: u(o.$style.add)
        }, [s(rt, {
          value: "add",
          class: u(o.$style.icon)
        }, null, 8, ["class"]), h("span", {
          onClick: c[11] || (c[11] = Ot((...p) => t(xt) && t(xt)(...p), ["stop"]))
        }, "新建合集")], 2)])) : I("", !0)], 2), s(he, {
          "border-color": "var(--w-card-border)",
          class: u(o.$style.gap1)
        }, null, 8, ["class"]), t(Ye).can_publish && !t(be) && !t(ct) && !t(T) && !t(ge) ? (g(), U(t(ae), {
          key: 0,
          coCreateConfig: t(Ye),
          type: t(ft) === 1,
          visible: t(q),
          timer: t(Q),
          showIcon: !1,
          onChange: t(Wt)
        }, null, 8, ["coCreateConfig", "type", "visible", "timer", "onChange"])) : I("", !0), t(Ct) ? (g(), U(t(Lt), {
          key: 1,
          modelValue: t($t),
          "onUpdate:modelValue": c[12] || (c[12] = p => Be($t) ? $t.value = p : null),
          url: t(ia),
          status: t(Z),
          errorText: t(na),
          videoInfo: t(nt),
          "onUpdate:url": t(ua),
          onRelate: t(ra),
          onClear: t(da)
        }, null, 8, ["modelValue", "url", "status", "errorText", "videoInfo", "onUpdate:url", "onRelate", "onClear"])) : I("", !0), t($e) !== "edit" && !t(ge) ? (g(), U(t(Yt), {
          key: t(Ce),
          disabled: t(_t) !== !0,
          videoSrc: t(Ce),
          duration: t(j),
          unsupportedFormat: t(Y),
          highlights: t(qe),
          onConfirm: t(Ca)
        }, null, 8, ["disabled", "videoSrc", "duration", "unsupportedFormat", "highlights", "onConfirm"])) : I("", !0), t(ge) ? I("", !0) : (g(), F("div", {
          key: 3,
          class: u([o.$style.tit1, o.$style.gap2])
        }, " 设置 ", 2)), t(ge) ? I("", !0) : (g(), U(w, {
          key: 4,
          class: u(o.$style.gap4),
          items: 3,
          wrap: "wrap"
        }, {
          default: f(() => [t(Nt) && t($e) !== "edit" ? (g(), U(V, {
            key: 0,
            class: u(o.$style.gap5)
          }, {
            default: f(() => [s(w, {
              align: "center",
              class: u(o.$style.switch)
            }, {
              default: f(() => [s(V, {
                align: "center"
              }, {
                default: f(() => [s(w, {
                  align: "center"
                }, {
                  default: f(() => [h("div", {
                    class: u([o.$style.gray1])
                  }, " 版权视频 ", 2)]),
                  _: 1
                })]),
                _: 1
              }), h("div", null, [s(ee, {
                modelValue: t(X),
                "onUpdate:modelValue": c[13] || (c[13] = p => Be(X) ? X.value = p : null),
                disabled: t(be),
                size: .6875
              }, null, 8, ["modelValue", "disabled"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), t(Nt) && t($e) !== "edit" ? (g(), F("div", Ul, [s(he, {
            "border-color": "var(--w-card-border)",
            direction: "y"
          })])) : I("", !0), t(Bt) ? (g(), F(Ia, {
            key: 2
          }, [s(V, {
            class: u(o.$style.gap5)
          }, {
            default: f(() => [s(w, {
              align: "center",
              class: u(o.$style.switch)
            }, {
              default: f(() => [s(V, {
                align: "center"
              }, {
                default: f(() => [s(w, {
                  align: "center"
                }, {
                  default: f(() => [h("div", {
                    class: u([o.$style.gray1])
                  }, " 允许下载 ", 2), s(t(J), {
                    title: "允许下载",
                    desc: "是否允许他人下载该视频"
                  })]),
                  _: 1
                })]),
                _: 1
              }), h("div", null, [s(ee, {
                modelValue: t(vt),
                "onUpdate:modelValue": c[14] || (c[14] = p => Be(vt) ? vt.value = p : null),
                size: .6875
              }, null, 8, ["modelValue"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"]), h("div", Ll, [s(he, {
            "border-color": "var(--w-card-border)",
            direction: "y"
          })])], 64)) : I("", !0), t($e) !== "edit" && t(Kt) ? (g(), U(V, {
            key: 3,
            class: u(o.$style.gap5)
          }, {
            default: f(() => [s(w, {
              align: "center",
              class: u([o.$style.switch])
            }, {
              default: f(() => [s(w, {
                align: "center"
              }, {
                default: f(() => [h("div", {
                  class: u([o.$style.gray1, o.$style.noWrap])
                }, " 允许他人划重点 ", 2), s(t(J), {
                  title: "划重点说明",
                  desc: "若您的微博为公开，并设置为允许划重点，其他用户可在您的视频中划出一个精彩的重点时刻并发微博，发布后将注明视频来源于您，同时产生的播放量会计入您的微博下。"
                })]),
                _: 1
              }), h("div", null, [s(ee, {
                modelValue: t(ne),
                "onUpdate:modelValue": c[15] || (c[15] = p => Be(ne) ? ne.value = p : null),
                class: u(o.$style.switchCenter),
                size: .6875
              }, null, 8, ["modelValue", "class"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), t(it) ? (g(), U(V, {
            key: 4,
            class: u(o.$style.gap5)
          }, {
            default: f(() => [s(w, {
              align: "center",
              class: u([o.$style.switch])
            }, {
              default: f(() => [s(w, {
                align: "center"
              }, {
                default: f(() => [h("div", {
                  class: u(o.$style.gray1)
                }, " 允许他人剪辑 ", 2), s(t(J), {
                  style: {
                    "line-height": "16px"
                  },
                  title: "他人剪辑说明",
                  desc: "打开开关即允许创作者基于您的视频进行剪辑创作，剪辑作品会带有“查看完整视频”按钮，点击后跳转至您的原视频，可为你带来流量收益。"
                })]),
                _: 1
              }), h("div", null, [s(ee, {
                modelValue: t(Xe),
                "onUpdate:modelValue": c[16] || (c[16] = p => Be(Xe) ? Xe.value = p : null),
                class: u(o.$style.switchCenter),
                offValue: 0,
                onValue: 1,
                size: .6875
              }, null, 8, ["modelValue", "class"])])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["class"])) : I("", !0), s(V, {
            class: u(o.$style.gap5)
          }, {
            default: f(() => [t(oe) && t(oe).follower_watch_entire && t(j) > 180 ? (g(), U(w, {
              key: 0,
              align: "center",
              class: u([o.$style.switch])
            }, {
              default: f(() => [s(V, {
                align: "center"
              }, {
                default: f(() => [s(w, {
                  align: "center"
                }, {
                  default: f(() => [h("div", {
                    class: u(o.$style.gray1)
                  }, Xt(t(oe).follower_watch_entire.title), 3), s(t(J), {
                    title: t(oe).follower_watch_entire.pop_up_window_title,
                    desc: t(oe).follower_watch_entire.pop_up_window_desc
                  }, null, 8, ["title", "desc"])]),
                  _: 1
                })]),
                _: 1
              }), h("div", null, [s(ee, {
                modelValue: t(me),
                "onUpdate:modelValue": c[17] || (c[17] = p => Be(me) ? me.value = p : null),
                size: .6875
              }, null, 8, ["modelValue"])])]),
              _: 1
            }, 8, ["class"])) : I("", !0)]),
            _: 1
          }, 8, ["class"]), s(V)]),
          _: 1
        }, 8, ["class"]))])], 512), [
          [Pt, t(P)]
        ])], 2)], 34), je(h("div", {
          class: u(o.$style.box1)
        }, [h("div", {
          class: u([o.$style.gray1, o.$style.tit1])
        }, " 设置微博内容 ", 2), t(et) ? I("", !0) : (g(), U(t(Ke), {
          key: 0,
          ref_key: "publisherRef",
          ref: de,
          doneDisabled: t(It),
          channelData: t(De),
          statementAuth: !t(kt),
          toolsfliter: ["emoticon", "hash", "at", "place", "timer"],
          set: {
            content: t(lt),
            action: "channel",
            publish: t(sa),
            publishCallback: t(ha),
            autoPublish: t(_e) && !t(B) && t($e) !== "edit",
            getSuccessData: t(fa)
          },
          sendDesc: t(ce),
          coCreation: t(re),
          isAiClip: t(tt),
          publishType: t(mt),
          onChange: t(ut),
          onDisabledCheck: t(Le),
          onSuccess: t(M)
        }, null, 8, ["doneDisabled", "channelData", "statementAuth", "set", "sendDesc", "coCreation", "isAiClip", "publishType", "onChange", "onDisabledCheck", "onSuccess"]))], 2), [
          [Pt, t(P) && !t(ct)]
        ]), t(ct) && t(P) ? (g(), U(w, {
          key: 0,
          style: {
            "margin-top": "30px",
            position: "relative"
          },
          justify: "center"
        }, {
          default: f(() => [h("div", xl, [s(Me, {
            disabled: t(It),
            sort: "flat",
            kind: "primary",
            onClick: t(_a)
          }, {
            default: f(() => [za(Xt(t(ce)), 1)]),
            _: 1
          }, 8, ["disabled", "onClick"]), t(It) ? (g(), F("div", {
            key: 0,
            class: u(o.$style.btn1),
            onClick: c[19] || (c[19] = (...p) => t(Le) && t(Le)(...p))
          }, null, 2)) : I("", !0)])]),
          _: 1
        })) : I("", !0)], 2), [
          [Pt, !t(G) && !t(et)]
        ]), s(t(Ie), {
          ref_key: "videoEditRef",
          ref: Ve,
          edit: t(G),
          screenArray: t(H),
          screenshot: t(Ae).url,
          horizontal: t(y),
          channel: !0,
          onChange: t(Dt)
        }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "onChange"]), t(Re) ? (g(), U(t($), {
          key: 0,
          visible: t(ue),
          srtFile: t(Ee),
          srtTitle: t(z),
          "media-id": t(Pe),
          onClose: t(ve),
          onConfirm: t(Tt),
          onDelete: t(ca)
        }, null, 8, ["visible", "srtFile", "srtTitle", "media-id", "onClose", "onConfirm", "onDelete"])) : I("", !0)], 2))], 2)
      }
    }
  }),
  zl = "_box1_hqe7u_14",
  Hl = "_gray1_hqe7u_17",
  jl = "_videobox_hqe7u_22",
  Bl = "_top1_hqe7u_26",
  Nl = "_top2_hqe7u_30",
  Fl = "_label2_hqe7u_34",
  Kl = "_add_hqe7u_48",
  Jl = "_icon_hqe7u_59",
  Wl = "_icon1_hqe7u_69",
  Gl = "_scroll_hqe7u_105",
  Ql = "_sort_hqe7u_111",
  Xl = "_sortin_hqe7u_116",
  Yl = "_noWrap_hqe7u_124",
  Zl = "_layer_hqe7u_128",
  eo = "_layerNarrow_hqe7u_138",
  to = "_layer2_hqe7u_142",
  ao = "_unmodal_hqe7u_146",
  lo = "_tit1_hqe7u_152",
  oo = "_gap1_hqe7u_163",
  so = "_gap2_hqe7u_172",
  io = "_gap4_hqe7u_176",
  no = "_gap5_hqe7u_180",
  uo = "_albumIcon_hqe7u_193",
  ro = "_btn1_hqe7u_201",
  co = "_switchCenter_hqe7u_210",
  vo = "_mainContainer_hqe7u_216",
  po = "_mainContainerNarrow_hqe7u_223",
  ho = "_leftPanel_hqe7u_227",
  fo = {
    box1: zl,
    gray1: Hl,
    videobox: jl,
    top1: Bl,
    top2: Nl,
    label2: Fl,
    add: Kl,
    icon: Jl,
    icon1: Wl,
    switch: "_switch_hqe7u_74",
    scroll: Gl,
    sort: Ql,
    sortin: Xl,
    noWrap: Yl,
    layer: Zl,
    layerNarrow: eo,
    layer2: to,
    unmodal: ao,
    tit1: lo,
    gap1: oo,
    gap2: so,
    gap4: io,
    gap5: no,
    albumIcon: uo,
    btn1: ro,
    switchCenter: co,
    mainContainer: vo,
    mainContainerNarrow: po,
    leftPanel: ho
  },
  _o = {
    $style: fo
  },
  bo = $l(Ml, [
    ["__cssModules", _o]
  ]);
export {
  bo as
  default
};
