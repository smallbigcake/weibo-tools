const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/AudioPay-BLXNgiK2.js", "assets/index-D53O_Npi.js", "assets/index-D06RDhv8.css", "assets/AudioPay-nnhyDFJI.css", "assets/AudioAction-Bnxg4L_j.js", "assets/AudioAction-C1gj1qeE.css", "assets/Rss-B1vvhnEu.js", "assets/Rss-Cjv8Ptq2.css", "assets/VideoUpload-B8NiZRzb.js", "assets/VideoUpload-UsKzmGBW.css", "assets/CoCreation-CSz2-tyt.js", "assets/CoCreation-HKftH6qI.css", "assets/HighlightPreload-Celtsomc.js", "assets/HighlightPreload-Cpw1BqZo.css", "assets/HeaderComment-BVhDr6An.js", "assets/HeaderComment-Ds5EjNH3.css", "assets/Success-DG9IWXTo.js", "assets/Success-DNAUkz1s.css", "assets/AutoState-fpP-UYEv.js", "assets/AutoState-DJsVdNV0.css", "assets/Title-DRDcPezD.js", "assets/Title-DhJDaZ76.css", "assets/AudioAlbum-CAsLMWuj.js", "assets/AudioAlbum-pPktcH5z.css", "assets/AudioCover-CAnkbMlT.js", "assets/AudioCover-oau8L0R3.css", "assets/AddRss-DlAuLy5X.js", "assets/AddRss-DwHZrsSc.css", "assets/CheckAudioAuth-C5NZAHgE.js", "assets/CheckAudioAuth-CdcxRttd.css", "assets/AudioDetail-oezRAYUs.js", "assets/AudioDetail-C4c88QPk.css", "assets/AudioAlbumHeader-DVQWPk79.js", "assets/AudioAlbumHeader-CzO6X8og.css", "assets/OriginalVideoRelation-CHEi5l1x.js", "assets/OriginalVideoRelation-BkwEAJo1.css", "assets/AiAudio-ChKonluW.js", "assets/AiAudio-BUyzhWGO.css"]))) => i.map(i => d[i]);
var dt = Object.defineProperty,
  ct = Object.defineProperties;
var vt = Object.getOwnPropertyDescriptors;
var Ha = Object.getOwnPropertySymbols;
var _t = Object.prototype.hasOwnProperty,
  pt = Object.prototype.propertyIsEnumerable;
var Ga = (y, g, p) => g in y ? dt(y, g, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: p
  }) : y[g] = p,
  Ne = (y, g) => {
    for (var p in g || (g = {})) _t.call(g, p) && Ga(y, p, g[p]);
    if (Ha)
      for (var p of Ha(g)) pt.call(g, p) && Ga(y, p, g[p]);
    return y
  },
  Da = (y, g) => ct(y, vt(g));
var _a = (y, g, p) => new Promise((Be, we) => {
  var ae = u => {
      try {
        b(p.next(u))
      } catch (te) {
        we(te)
      }
    },
    qe = u => {
      try {
        b(p.throw(u))
      } catch (te) {
        we(te)
      }
    },
    b = u => u.done ? Be(u.value) : Promise.resolve(u.value).then(ae, qe);
  b((p = p.apply(y, g)).next())
});
import {
  s as ft,
  t as ht,
  v as mt,
  y as yt,
  u as gt,
  b as j,
  ac as bt,
  r as o,
  ad as At,
  ae as Ct,
  w as Y,
  o as wt,
  A as It,
  a as la,
  af as Ja,
  ag as Ka,
  ah as _,
  ai as Qa,
  aj as kt,
  ak as Dt,
  d as Rt,
  z as Et,
  l as pa,
  m as Ce,
  i as c,
  D as v,
  n as I,
  k as a,
  B as Z,
  O as fa,
  h as k,
  al as m,
  P as ha,
  p as ee,
  C as ma,
  T as Pt,
  am as Wa,
  G as Vt,
  U as Tt,
  E as St,
  _ as xt
} from "./index-D53O_Npi.js";
import {
  u as Ot,
  s as jt,
  a as Lt
} from "./useOriginalVideoRelation-BwrNyVOZ.js";

function $t() {
  var za, Fa;
  const y = ft(),
    g = ht(),
    p = mt(),
    Be = yt(),
    we = gt(),
    ae = j(() => p.getters.config),
    qe = {},
    b = bt(),
    u = Ot(),
    te = b.isEdit,
    L = b.isAudioEdit,
    oa = b.isAudioUpload,
    z = b.isRss,
    Ie = b.isRssAll,
    ue = b.entry,
    sa = b.hasnav,
    ke = b.rss_url,
    De = b.guid,
    ze = b.ai,
    Fe = b.aiResult,
    F = o(y.query.oid || ""),
    ne = o(["0", "1", "2", "3"]),
    V = o(null),
    ya = At(),
    He = Ct(V, qe, ne, F.value),
    {
      channelText: Re,
      channelList: ia,
      category: Ee,
      channel_ids: re,
      allowClip: Ge,
      checkAllowDownload: Pe,
      material_permission: ua,
      biz_type: ga,
      coCreateConfig: Je,
      aiPublish: Ve,
      statementConfig: le,
      videoAssociateInfo: na,
      maxFileSize: oe,
      defaultStatus: Te,
      videoDescInfo: ba,
      modifyChannel: Ke,
      channelListInit: Qe,
      audioCanPay: ra
    } = He,
    {
      title: $,
      doneDisabled: da
    } = ya,
    O = o(null),
    de = o(null),
    We = o(null),
    Se = o(!1),
    xe = o(1),
    H = o(!1),
    ca = o(""),
    Xe = o(void 0),
    ce = o(!1),
    U = o(!1),
    f = o({
      url: "",
      pid: ""
    }),
    ve = o(void 0),
    A = o(void 0),
    D = o({}),
    M = o(void 0),
    K = o({}),
    _e = o(!1),
    Ye = o(!1),
    pe = o(void 0),
    Oe = o(0),
    Ze = o(!1),
    R = o(null),
    se = o(""),
    je = o([]),
    N = o(""),
    fe = o([]),
    G = o(""),
    Q = o(void 0),
    ea = o(!1),
    Le = o(!1),
    B = o(!1),
    W = o(""),
    aa = o(!0),
    he = o(void 0),
    q = o(!0),
    ie = o(!0),
    X = o(""),
    ta = o(!1),
    C = o({
      src: ""
    }),
    $e = o(!!((Fa = (za = ae.value) == null ? void 0 : za.flags) != null && Fa.audio_auth)),
    me = o(""),
    ye = o(),
    h = o(),
    Ue = o(""),
    ge = b.cluster_id,
    x = e => Be.show(e),
    va = e => we.show(e),
    n = j(() => !H.value && A.value !== void 0 || z.value),
    w = j(() => $e.value && !n.value && !ea.value),
    be = j(() => Ge.value !== void 0),
    Me = j(() => jt({
      isAudio: !0,
      isPanorama: Q.value,
      videoAssociateInfo: na.value
    })),
    Aa = j(() => !!R.value || !!se.value),
    Ca = j(() => A.value !== !0 && !z.value ? "自动发布" : te.value || L.value ? "确认更改" : "发布"),
    E = j(() => le.value || {}),
    Xa = j(() => !!E.value.statement_show),
    Ra = j(() => je.value.find(e => e.value === N.value)),
    Ya = j(() => {
      var e, t, l;
      if (Ie.value) {
        if (!ie.value) return !0
      } else if (!$.value.trim() || !ie.value || !C.value.src) return !0;
      if (ta.value) return !0;
      if (B.value === "podcast_audio_pay")
        if ((e = h.value) != null && e.price) {
          if (((t = h.value) == null ? void 0 : t.price) < .1 || ((l = h.value) == null ? void 0 : l.price) > 200) return !0;
          if (h.value.duration) {
            if (h.value.duration > M.value || h.value.duration < 10) return !0
          } else return !0
        } else return !0;
      return !!(Me.value && u.enabled.value && u.status.value !== "success" || da.value || O.value && O.value.status === "upload" || U.value && !re.value)
    }),
    Ea = j(() => U.value && !re.value ? !1 : !!(A.value || z.value)),
    Za = e => {
      me.value = e
    },
    et = ({
      src: e,
      pid: t
    }) => {
      C.value.src = e, C.value.pid = t
    },
    at = e => {
      h.value = e
    },
    tt = e => {
      B.value = e
    },
    lt = e => {
      he.value = e
    },
    ot = e => {
      var t;
      Le.value = (t = e == null ? void 0 : e.enabled) != null ? t : !1
    },
    st = e => {
      q.value = e, q.value || va({
        type: "confirm",
        message: "确认关闭「自动发布」么？关闭后， 新发布的节目需要手动发布。",
        btnCancel: "不关闭",
        btnConfirm: "确认关闭",
        cancel: () => {
          q.value = !0
        }
      })
    },
    wa = () => {
      z.value ? la.get("/ajax/multimedia/rss_publisher_config", {
        params: {
          rss_url: ke.value,
          guid: De.value
        }
      }).then(({
        data: e
      }) => {
        var l, i;
        const t = e.data.result;
        De.value && t.title ? (q.value = t.auto_publish.enable, ye.value = t.auto_publish, ge.value = t.cluster_idStr, Ue.value = t.is_new_cluster, $.value = t.title, X.value = t.desc, C.value.src = (l = t.cover) == null ? void 0 : l.bmiddle_pic, C.value.pid = (i = t.cover) == null ? void 0 : i.pic_id, W.value = t.content ? t.content : Te.value) : t.cluster_idStr && (ge.value = t.cluster_idStr, Ue.value = t.is_new_cluster, W.value = t.content ? t.content : Te.value)
      }) : W.value = Te.value
    },
    Pa = () => {
      Ja(() => {
        V.value && (V.value.scrollTop = V.value.scrollHeight)
      })
    },
    Va = e => {
      e && (je.value = (e.requiredItems || []).map(t => ({
        label: t.title,
        value: t.id,
        textfield: t.textfield,
        textfield_placeholder: t.textfield_placeholder,
        textfield_min_length: t.textfield_min_length,
        textfield_max_length: t.textfield_max_length
      })))
    },
    it = () => {
      var e, t, l;
      Ie.value ? ie.value || x({
        type: "warn",
        message: "请确认底部协议"
      }) : $.value.trim() ? C.value.src ? ie.value ? B.value === "podcast_audio_pay" && ((e = h.value) != null && e.price ? ((t = h.value) == null ? void 0 : t.price) < .1 || ((l = h.value) == null ? void 0 : l.price) > 200 ? x({
        type: "warn",
        message: "请修改音频价格"
      }) : h.value.duration ? (h.value.duration > M.value || h.value.duration < 10) && x({
        type: "warn",
        message: "请修改试听时长"
      }) : x({
        type: "warn",
        message: "请设置试听时长"
      }) : x({
        type: "warn",
        message: "请输入音频价格"
      })) : x({
        type: "warn",
        message: "请确认底部协议"
      }) : x({
        type: "warn",
        message: "请上传封面再发布"
      }) : x({
        type: "warn",
        message: "请填写标题再发布"
      })
    },
    Ia = (e = !1) => {
      const t = ce.value;
      e && (ca.value = Date.now()), Se.value = !1, xe.value = 1, H.value = !1, Xe.value = void 0, U.value = !1, f.value = {
        url: "",
        pid: ""
      }, ve.value = void 0, A.value = void 0, D.value = {}, M.value = void 0, K.value = {}, _e.value = !1, Ye.value = !1, pe.value = void 0, Oe.value = 0, Ze.value = !1, R.value = null, se.value = "", je.value = [], N.value = "", fe.value = [], G.value = "", Q.value = void 0, Le.value = !1, B.value = !1, W.value = "", aa.value = !0, he.value = void 0, ne.value = ["0", "1", "2", "3"], ie.value = !0, X.value = "", ta.value = !1, C.value = {
        src: ""
      }, me.value = "", ye.value = void 0, h.value = void 0, q.value = !0, Ue.value = "", ce.value = t
    },
    Ta = e => {
      var t, l;
      z.value || (t = O.value) == null || t.logUpload(), (l = O.value) == null || l.updateMd5(e)
    },
    Sa = (e, t) => {
      var l, i;
      e === "close" ? ((l = O.value) == null || l.cancelMethods(), $.value = "", Ia(!0)) : e === "auto" ? H.value = !0 : e === "closeShow" ? ((i = O.value) == null || i.cancelMethods(), $.value = "", Ia(!0), Se.value = !0, xe.value = t) : e === "visible" ? aa.value = t === 0 : e === "schedule_timestamp" ? Ye.value = t : e === "mediaid" && Ta(t)
    },
    ut = (...e) => {
      var t;
      switch (e[0]) {
        case "show":
          Qe();
          break;
        case "file":
          A.value = !1, D.value = {}, M.value = void 0, Q.value = !1;
          break;
        case "screenshot": {
          const l = Array.isArray(e[1]) && e[1].map((i, d) => Da(Ne({}, i), {
            source: d === 0 ? 11 : 2
          })) || [];
          f.value && f.value.url || (f.value = l[0] || {
            url: "",
            pid: ""
          })
        }
        break;
        case "success":
          kt({
            key: "execuploadsuccess"
          }), A.value = !0, D.value = e[1];
          break;
        case "start":
          H.value = !1, A.value = !1;
          break;
        case "init":
          H.value = !1, A.value = !1, D.value = {}, f.value = {
            url: "",
            pid: ""
          }, M.value = void 0, Q.value = !1, U.value = !1;
          break;
        case "cancel":
          A.value = void 0, D.value = {}, M.value = void 0, Q.value = !1, Oe.value = "", R.value = null, se.value = "";
          break;
        case "replace":
          _e.value = !0;
          break;
        case "detail":
          e[1] && e[1].duration && (M.value = e[1].duration), Q.value = !!((t = e[1]) != null && t.isPanorama);
          {
            const {
              width: l,
              height: i
            } = e[1];
            Oe.value = Math.min(l, i)
          }
          break
      }
    },
    ka = () => {
      var i, d, s, r, P, J, Ae, T;
      const e = S => S.split("/").slice(-1)[0].split(".")[0],
        t = {
          titles: [{
            title: $.value,
            default: "true"
          }],
          covers: [Ne({
            url: f.value.url,
            pid: f.value.pid || f.value.file_id,
            source: (i = f.value.source) != null ? i : ""
          }, Qa((d = f.value) != null && d.pid ? f.value.pid : e((s = f.value) == null ? void 0 : s.url)))],
          free_duration: {
            start: 0,
            end: 30
          }
        };
      (r = he.value) != null && r.coCreation && (t.cooperate_video = he.value.selectArr.map(S => ({
        uid: S.id,
        role: S.role
      })), (J = (P = Je.value) == null ? void 0 : P.permanent_host) != null && J.length ? t.permanent_host = Je.value.permanent_host.map(S => S.uid) : t.permanent_host = []), B.value && (t.um_video_switch = B.value === "um_video", t.is_vip_paid = B.value === "vplus_video"), ua.value && ue.value !== "edit" && (t.copyright_video_switch = !0), (ue.value === "edit" || L.value) && _e.value === !0 && (t.edit_object_id = D.value.media_id);
      const l = Ee.value ? "homemade" : "contribution";
      if (C.value.src && (t.covers = [Ne({
          url: C.value.src,
          pid: C.value.pid
        }, Qa(C.value.pid))]), Ie.value) t.rss = {
        rss_url: ke.value,
        cluster_id: ge.value
      };
      else if (z.value) t.rss = {
        rss_url: ke.value,
        guid: De.value
      }, ye.value && (t.rss.auto_publish = q.value), (Ae = ye.value) != null && Ae.show_toast && (t.rss.show_toast = !0);
      else {
        const S = D.value.media_id ? D.value.media_id : F.value.split(":")[1];
        t.media_id = S, t.fid = `2373717:${S}`
      }
      return t.type = "audio", me.value && (t.playlist = {
        playlist_audio: !0,
        album_ids: me.value.toString()
      }), X.value && (t.desc = X.value), B.value === "podcast_audio_pay" && (t.free_duration.end = h.value.duration, t.price = h.value.price, t.is_vip_paid = !0), t.resource = {
        video_down: Pe.value ? 1 : 0
      }, be.value && (t.resource.allow_clip = +Ge.value), Lt({
        showOriginalVideoRelation: Me.value,
        status: u.status.value,
        mediaId: u.mediaId.value
      }) && (t.video_associate_id = u.mediaId.value, t.resource.manual_split = {
        origin_media_id: u.mediaId.value,
        origin_url: u.url.value
      }), N.value && (t.resource.statement = {
        required: {
          id: N.value
        },
        optional: fe.value.map(S => ({
          id: S
        }))
      }, (T = Ra.value) != null && T.textfield && G.value.trim() && (t.resource.statement.required.textfield_content = G.value.trim())), Le.value && (t.resource.allow_highlight_preheat = 1), t[l] = {
        channel_ids: [re.value],
        type: ve.value
      }, ce.value && (t.approval_reprint = "1"), t
    },
    xa = (e = !0) => (Ka({
      uicode: "30000840",
      actType: "7639"
    }), A.value && e && (Xe.value = ka()), !0),
    Oa = () => {
      if (!Ea.value) xa(!1) && va({
        btnConfirm: "我知道了",
        message: "设置自动发布成功！ 微博将于音频文件上传并转码完成后自动发出。在文件上传完毕前请勿关闭浏览器窗口",
        action: () => {
          Sa("auto")
        }
      });
      else {
        const e = ka();
        L.value && (e.media_id = F.value.split(":")[1]);
        const t = {
          oid: F.value,
          mid: K.value.mid,
          media: JSON.stringify(e)
        };
        L.value && (t.desc = X.value), la.post("/ajax/multimedia/submitVideoEditInfo", t).then(l => {
          l.data.ok > 0 && l.data.data && l.data.data.result && (Se.value = !0)
        }).catch(l => {
          console.warn(l)
        })
      }
    },
    ja = e => {
      var J, Ae;
      if ((ue.value === "edit" || L.value) && _e.value) return;
      const t = T => {
          if (!T || typeof T != "string") return T;
          try {
            return JSON.parse(T)
          } catch (S) {
            return T
          }
        },
        l = t(e == null ? void 0 : e.resource),
        i = t(e == null ? void 0 : e.resource_info),
        d = t((Ae = (J = e == null ? void 0 : e.covers) == null ? void 0 : J[0]) == null ? void 0 : Ae.resource),
        s = (e == null ? void 0 : e.statement) || (l == null ? void 0 : l.statement) || (i == null ? void 0 : i.statement) || (d == null ? void 0 : d.statement),
        r = (s == null ? void 0 : s.required) || (s == null ? void 0 : s.user_requiredItem),
        P = (s == null ? void 0 : s.optional) || (s == null ? void 0 : s.user_optionalItems);
      if (!s) {
        N.value = "", fe.value = [], G.value = "";
        return
      }
      N.value = (r == null ? void 0 : r.id) || "", fe.value = Array.isArray(P) ? P.map(T => T == null ? void 0 : T.id).filter(Boolean) : [], G.value = (r == null ? void 0 : r.textfield_content) || ""
    },
    nt = e => {
      $.value = e == null ? void 0 : e.wb_title, f.value = {
        url: e.cover
      }, C.value.src = e.cover, C.value.pid = e.pid, W.value += e.text
    },
    La = () => {
      const e = Fe.value;
      return !e || e.error ? !1 : (D.value = {
        media_id: e.media_id
      }, A.value = !0, nt(e), !0)
    };
  let $a = !1;
  const rt = () => {
      $a || !ze.value || !Ve.value || ($a = La())
    },
    Ua = e => {
      var r;
      $.value = e.titles[0] && e.titles[0].title, ja(e), f.value = {
        url: e.covers[0].url
      }, C.value.src = e.covers[0].url, C.value.pid = e.covers[0].url.match(/\/\/[^\n\r\u2028\u2029]*\/.*\/(.*)\..*/)[1], X.value = e.audio_desc, e.current_playlists && e.current_playlists.length > 0 && (ge.value = e.current_playlists.map(P => P.id).join(","));
      const t = e != null && e.homemade_info && ((r = Object.keys(e == null ? void 0 : e.homemade_info)) != null && r.length) ? e.homemade_info : e == null ? void 0 : e.contribution_info,
        l = t == null ? void 0 : t.first_level_channels,
        i = t == null ? void 0 : t.second_level_channels;
      let d = 0,
        s = 0;
      l && l[0] && (U.value = !0, (Ee.value ? Ee.value : ia.value).forEach((J, Ae) => {
        J.channel_id === l[0].id && (d = Ae, J.sub_channels && J.sub_channels.length > 0 && i && i[0] && J.sub_channels.forEach((T, S) => {
          T.sub_channel_id === i[0].id && (s = S, Ke("main", d), Ke("sub", s))
        }))
      })), ve.value = t == null ? void 0 : t.type
    },
    Ma = e => {
      la.get("/ajax/multimedia/getAudioEditInfo", {
        params: {
          media_id: e
        }
      }).then(t => {
        var l, i;
        if (t.data && t.data.ok > 0) {
          se.value = (l = t.data.srt) == null ? void 0 : l.title;
          const d = t.data.data,
            s = d && d.audio_info;
          if (s.editable) K.value = s, D.value.media_id = (i = s.oid) == null ? void 0 : i.replace("1034:", ""), K.value && (Ua(K.value), u.restore(Da(Ne(Ne({}, d), K.value), {
            associateVideo: t.data.associateVideo
          }))), s.pay_audio && (pe.value = s.pay_audio);
          else {
            const r = s.reject_edit_reason || s.non_editable_reason || "抱歉，当前音频无法编辑";
            sa.value ? x({
              type: "warn",
              message: r,
              action: () => {
                g.push({
                  name: "videoManage"
                })
              }
            }) : x({
              type: "warn",
              message: r,
              autohide: !1,
              mask: !0
            })
          }
        }
      }, () => {
        x({
          type: "warn",
          message: "抱歉，当前音频无法编辑"
        })
      })
    },
    Na = () => {
      var l, i, d, s, r;
      const e = Array.isArray(de.value) ? de.value[0] : de.value,
        t = [e == null ? void 0 : e.$el, (i = (l = e == null ? void 0 : e.$refs) == null ? void 0 : l.form) == null ? void 0 : i.$el, (r = (s = (d = e == null ? void 0 : e.$refs) == null ? void 0 : d.form) == null ? void 0 : s.$refs) == null ? void 0 : r.form].find(P => typeof(P == null ? void 0 : P.scrollIntoView) == "function");
      t && t.scrollIntoView({
        behavior: "smooth"
      })
    },
    Ba = () => {
      const {
        media_id: e,
        oid: t,
        mid: l,
        type: i
      } = y.query;
      la.get("/ajax/multimedia/getAIClipInfo", {
        params: {
          media_id: e,
          oid: t,
          mid: l,
          schedule: +(i === "schedule")
        }
      }).then(d => {
        var s;
        if (d.data.ok > 0) {
          Ze.value = !0;
          const r = d.data.data;
          f.value = {
            url: r.cover
          }, W.value = r.text, Na(), r.schedule > 0 && ((s = de.value) == null || s.handleSchedule(r.schedule))
        }
      })
    },
    qa = () => _a(this, null, function*() {
      try {
        const {
          mount: e
        } = yield _(() => _a(this, null, function*() {
          const {
            mount: t
          } = yield import("./glowcut-embed-BDqysr88.js");
          return {
            mount: t
          }
        }), []);
        e("#glowcut-audio-list", {
          pcBaseUrl: "https://weibo.com/page",
          onReady: t => {
            const l = We.value;
            l && (l.style.display = t ? "block" : "none")
          }
        })
      } catch (e) {
        console.error("[GlowCutEmbed] 模块加载失败:", e)
      }
    });
  return Y(H, e => {
    if (!e) try {
      Dt.close()
    } catch (t) {}
  }), Y(z, e => {
    e && wa()
  }), Y(Me, e => {
    e || u.clear()
  }), Y(() => u.enabled.value, e => {
    e || u.clear()
  }), Y(U, e => {
    e === !1 ? (Re.value = "选择视频分类", re.value = "", ne.value = ["0", "1", "2", "3"], ve.value = void 0) : Pa()
  }), Y(A, e => {
    ue.value !== "edit" && !L.value || e && H.value && Oa()
  }), Y(le, e => {
    Va(e)
  }, {
    immediate: !0,
    deep: !0
  }), Y([Fe, Ve], rt, {
    immediate: !0
  }), Y(n, e => {
    e && (ea.value = !0)
  }), wt(() => {
    L.value && (F.value = y.query.oid, A.value = !0)
  }), It(() => _a(this, null, function*() {
    var i, d, s, r;
    la.get("/ajax/multimedia/getapproval").then(({
      data: P
    }) => {
      P.ok && (ce.value = P.showApprovalRepeat)
    }), yield Qe(), $e.value = !!((d = (i = ae.value) == null ? void 0 : i.flags) != null && d.audio_auth), $e.value && (yield Ja(), We.value && qa()), wa();
    const {
      oid: e,
      media_id: t,
      mid: l
    } = y.query;
    L.value && e ? Ma(e) : oa.value && !ze.value && (D.value = {
      media_id: t
    }, A.value = !0), e && t && l && Ba(), Ka({
      uicode: "30000840",
      actType: "7635",
      ext: `is_authorized:${(r=(s=ae.value)==null?void 0:s.flags)==null?void 0:r.audio_auth}`
    })
  })), {
    route: y,
    isEdit: te,
    isAudioEdit: L,
    isAudioUpload: oa,
    isRss: z,
    isRssAll: Ie,
    entry: ue,
    hasnav: sa,
    rss_url: ke,
    guid: De,
    ai: ze,
    aiResult: Fe,
    oid: F,
    config: ae,
    videoScroll: V,
    channelText: Re,
    channelList: ia,
    category: Ee,
    channel_ids: re,
    allowClip: Ge,
    checkAllowDownload: Pe,
    material_permission: ua,
    biz_type: ga,
    coCreateConfig: Je,
    aiPublish: Ve,
    statementConfig: le,
    videoAssociateInfo: na,
    maxFileSize: oe,
    defaultStatus: Te,
    videoDescInfo: ba,
    modifyChannel: Ke,
    channelListInit: Qe,
    title: $,
    doneDisabled: da,
    cluster_id: ge,
    is_new_cluster: Ue,
    audioCanPay: ra,
    showToast: Se,
    toastType: xe,
    autoPublish: H,
    time: ca,
    successData: Xe,
    show_approval_reprint: ce,
    checkExposure: U,
    screenshot: f,
    type: ve,
    uploadSuccess: A,
    videoDetails: D,
    duration: M,
    videoInfo: K,
    replaceVideo: _e,
    curTimer: Ye,
    payInfo: pe,
    definition: Oe,
    isAiClip: Ze,
    srtFile: R,
    srtTitle: se,
    declarationRequiredOptions: je,
    selectedDeclarationRequired: N,
    selectedDeclarationOptional: fe,
    declarationReprintSource: G,
    isPanorama: Q,
    hasEnteredPublishFlow: ea,
    highlightPreloadState: Le,
    um_video: B,
    publisherContent: W,
    showCoCreation: aa,
    coCreationState: he,
    auto_publish: q,
    supported_video_type: ne,
    checkAudio: ie,
    AudioDetailContent: X,
    AudioDetailContentState: ta,
    AudioCoverSrc: C,
    AudioAuth: $e,
    AudioAlbum: me,
    AudioAuto: ye,
    AudioPayConfig: h,
    videoUploadRef: O,
    publisherRef: de,
    containerRef: We,
    showAudioList: w,
    showAllowClip: be,
    showOriginalVideoRelation: Me,
    hasSrt: Aa,
    showMoreDetail: n,
    sendDesc: Ca,
    statementModel: E,
    statementShow: Xa,
    currentDeclarationRequiredOption: Ra,
    channelDisabled: Ya,
    isDone: Ea,
    enabled: u.enabled,
    relationUrl: u.url,
    relationStatus: u.status,
    errorText: u.errorText,
    originalVideoRelationVideoInfo: u.videoInfo,
    originalVideoRelationMediaId: u.mediaId,
    updateUrl: u.updateUrl,
    relate: u.relate,
    clear: u.clear,
    syncDeclarationConfig: Va,
    disabledCheck: it,
    change: Sa,
    handleReset: Ia,
    updateMd5: Ta,
    uploadChange: ut,
    done: xa,
    getSuccessData: ka,
    submitEditInfo: Oa,
    syncDeclarationFromInfo: ja,
    initEditVideoInfo: Ua,
    getAIAudioInfo: La,
    getAudioEditInfo: Ma,
    getAIClipInfo: Ba,
    loadGlowCutEmbed: qa,
    changeHighlightPreload: ot,
    changeCoCreation: lt,
    changeAudioAlbum: Za,
    changeAudioCoverSrc: et,
    changeAudioPay: at,
    umVideoChange: tt,
    changeAuto: st,
    handleRssInit: wa,
    focusPublisher: Na,
    scrollToBottom: Pa
  }
}
const Ut = {
    style: {
      position: "relative"
    }
  },
  Mt = Rt({
    __name: "AudioPublish",
    setup(y) {
      const g = m(() => _(() => import("./AudioPay-BLXNgiK2.js"), __vite__mapDeps([0, 1, 2, 3]))),
        p = m(() => _(() => import("./AudioAction-Bnxg4L_j.js"), __vite__mapDeps([4, 1, 2, 5]))),
        Be = m(() => _(() => import("./Rss-B1vvhnEu.js"), __vite__mapDeps([6, 1, 2, 7]))),
        we = m(() => _(() => import("./VideoUpload-B8NiZRzb.js"), __vite__mapDeps([8, 1, 2, 9]))),
        ae = m(() => _(() => import("./index-D53O_Npi.js").then(n => n.aS), __vite__mapDeps([1, 2]))),
        qe = m(() => _(() => import("./CoCreation-CSz2-tyt.js"), __vite__mapDeps([10, 1, 2, 11]))),
        b = m(() => _(() => import("./HighlightPreload-Celtsomc.js"), __vite__mapDeps([12, 1, 2, 13]))),
        u = m(() => _(() => import("./HeaderComment-BVhDr6An.js"), __vite__mapDeps([14, 1, 2, 15]))),
        te = m(() => _(() => import("./Success-DG9IWXTo.js"), __vite__mapDeps([16, 1, 2, 17]))),
        L = m(() => _(() => import("./AutoState-fpP-UYEv.js"), __vite__mapDeps([18, 1, 2, 19]))),
        oa = m(() => _(() => import("./Title-DRDcPezD.js"), __vite__mapDeps([20, 1, 2, 21]))),
        z = m(() => _(() => import("./AudioAlbum-CAsLMWuj.js"), __vite__mapDeps([22, 1, 2, 23]))),
        Ie = m(() => _(() => import("./AudioCover-CAnkbMlT.js"), __vite__mapDeps([24, 1, 2, 25]))),
        ue = m(() => _(() => import("./AddRss-DlAuLy5X.js"), __vite__mapDeps([26, 1, 2, 10, 11, 27]))),
        sa = m(() => _(() => import("./CheckAudioAuth-C5NZAHgE.js"), __vite__mapDeps([28, 1, 2, 29]))),
        ke = m(() => _(() => import("./AudioDetail-oezRAYUs.js"), __vite__mapDeps([30, 1, 2, 31]))),
        De = m(() => _(() => import("./AudioAlbumHeader-DVQWPk79.js"), __vite__mapDeps([32, 1, 2, 33]))),
        ze = m(() => _(() => import("./OriginalVideoRelation-CHEi5l1x.js"), __vite__mapDeps([34, 1, 2, 35]))),
        Fe = m(() => _(() => import("./AiAudio-ChKonluW.js"), __vite__mapDeps([36, 1, 2, 37]))),
        {
          isAudioEdit: F,
          isRss: ne,
          isRssAll: V,
          entry: ya,
          hasnav: He,
          aiPublish: Re,
          videoDescInfo: ia,
          biz_type: Ee,
          audioCanPay: re,
          maxFileSize: Ge,
          coCreateConfig: Pe,
          cluster_id: ua,
          is_new_cluster: ga,
          videoScroll: Je,
          title: Ve,
          showToast: le,
          toastType: na,
          autoPublish: oe,
          time: Te,
          successData: ba,
          screenshot: Ke,
          type: Qe,
          duration: ra,
          replaceVideo: $,
          curTimer: da,
          payInfo: O,
          definition: de,
          isAiClip: We,
          isPanorama: Se,
          um_video: xe,
          publisherContent: H,
          showCoCreation: ca,
          coCreationState: Xe,
          auto_publish: ce,
          checkAudio: U,
          AudioDetailContent: f,
          AudioDetailContentState: ve,
          AudioCoverSrc: A,
          AudioAuth: D,
          AudioAuto: M,
          videoUploadRef: K,
          publisherRef: _e,
          containerRef: Ye,
          showAudioList: pe,
          showOriginalVideoRelation: Oe,
          hasSrt: Ze,
          showMoreDetail: R,
          sendDesc: se,
          statementShow: je,
          channelDisabled: N,
          isDone: fe,
          enabled: G,
          relationUrl: Q,
          relationStatus: ea,
          errorText: Le,
          originalVideoRelationVideoInfo: B,
          updateUrl: W,
          relate: aa,
          clear: he,
          disabledCheck: q,
          change: ie,
          uploadChange: X,
          done: ta,
          getSuccessData: C,
          submitEditInfo: $e,
          changeHighlightPreload: me,
          changeCoCreation: ye,
          changeAudioAlbum: h,
          changeAudioCoverSrc: Ue,
          changeAudioPay: ge,
          umVideoChange: x,
          changeAuto: va
        } = $t();
      return Et({
        title: "音频发布"
      }), (n, w) => {
        const be = pa("woo-divider"),
          Me = pa("woo-checkbox"),
          Aa = pa("woo-button"),
          Ca = pa("woo-box");
        return c(), Ce("div", {
          class: I([n.$style.mainContainer, !a(pe) && n.$style.mainContainerNarrow])
        }, [(c(), Ce("div", {
          key: a(Te),
          class: I(n.$style.leftPanel)
        }, [Z(a(te), {
          showToast: a(le),
          toastType: a(na),
          hasnav: a(He)
        }, null, 8, ["showToast", "toastType", "hasnav"]), fa(ee("div", {
          class: I(["wbpro-layer", [n.$style.layer, !a(He) && n.$style.layer2, !a(pe) && n.$style.layerNarrow]])
        }, [a(D) ? v("", !0) : (c(), k(a(sa), {
          key: 0
        })), a(D) ? (c(), k(a(u), {
          key: 1,
          showMoreDetail: a(oe) || a(R),
          videoDescInfo: a(ia),
          definition: a(de)
        }, {
          default: ma(() => [!a(R) && a(Re) && a(Re).title ? (c(), k(a(Fe), {
            key: 0,
            aiPublish: a(Re)
          }, null, 8, ["aiPublish"])) : v("", !0)]),
          _: 1
        }, 8, ["showMoreDetail", "videoDescInfo", "definition"])) : v("", !0), a(V) ? (c(), k(a(De), {
          key: 2
        })) : v("", !0), a(D) ? (c(), Ce("div", {
          key: 3,
          ref_key: "videoScroll",
          ref: Je,
          class: I(["modal-scroll", n.$style.unmodal]),
          onTouchmovePassive: w[5] || (w[5] = Pt(() => {}, ["stop"]))
        }, [ee("div", {
          class: I(n.$style.videobox)
        }, [ee("div", {
          class: I(n.$style.top1)
        }, [!a(le) && !a(ne) ? (c(), k(a(we), {
          key: 0,
          ref_key: "videoUploadRef",
          ref: K,
          type: "channel",
          screenshot: a(Ke).url,
          biz_type: a(Ee),
          audioCanPay: a(re),
          payInfo: a(O),
          maxFileSize: a(Ge),
          hasSrt: a(Ze),
          onVideoChange: a(X),
          onUmVideo: a(x)
        }, null, 8, ["screenshot", "biz_type", "audioCanPay", "payInfo", "maxFileSize", "hasSrt", "onVideoChange", "onUmVideo"])) : v("", !0), fa(Z(be, {
          "border-color": "var(--w-card-border)",
          class: I(n.$style.gap1)
        }, null, 8, ["class"]), [
          [ha, a(oe) || a(R)]
        ])], 2), !a(R) && !a(oe) ? (c(), k(a(ue), {
          key: 0,
          coCreateConfig: a(Pe)
        }, null, 8, ["coCreateConfig"])) : v("", !0), Z(a(L), {
          hasnav: a(He),
          autoPublish: a(oe),
          onCancel: w[0] || (w[0] = E => oe.value = !1)
        }, null, 8, ["hasnav", "autoPublish"]), fa(ee("div", null, [a(V) ? v("", !0) : (c(), k(a(oa), {
          key: 0,
          content: a(Ve),
          onInput: w[1] || (w[1] = E => Ve.value = E)
        }, null, 8, ["content"])), ee("div", null, [a(V) ? v("", !0) : (c(), k(be, {
          key: 0,
          "border-color": "var(--w-card-border)",
          class: I(n.$style.gap1)
        }, null, 8, ["class"])), Z(a(b), {
          duration: a(ra),
          onChange: a(me)
        }, null, 8, ["duration", "onChange"]), a(V) ? v("", !0) : (c(), k(a(Ie), {
          key: 1,
          title: "",
          src: a(A).src,
          curObj: {
            src: a(A).src
          },
          onChange: a(Ue)
        }, null, 8, ["src", "curObj", "onChange"])), a(V) ? v("", !0) : (c(), k(a(ke), {
          key: 2,
          AudioDetailContent: a(f),
          onInput: w[2] || (w[2] = E => f.value = E),
          onState: w[3] || (w[3] = E => ve.value = E)
        }, null, 8, ["AudioDetailContent"])), a(R) ? (c(), k(a(z), {
          key: 3,
          cluster_id: a(ua),
          is_new_cluster: a(ga),
          onChange: a(h)
        }, null, 8, ["cluster_id", "is_new_cluster", "onChange"])) : v("", !0), Z(be, {
          "border-color": "var(--w-card-border)",
          class: I(n.$style.gap1)
        }, null, 8, ["class"]), a(Pe).can_publish && !a(xe) && !a(V) && !a(F) && !a(O) && !a(Se) ? (c(), k(a(qe), {
          key: 4,
          coCreateConfig: a(Pe),
          type: a(Qe) === 1,
          visible: a(ca),
          timer: a(da),
          showIcon: !0,
          onChange: a(ye)
        }, null, 8, ["coCreateConfig", "type", "visible", "timer", "onChange"])) : v("", !0), a(Oe) ? (c(), k(a(ze), {
          key: 5,
          modelValue: a(G),
          "onUpdate:modelValue": w[4] || (w[4] = E => Wa(G) ? G.value = E : null),
          url: a(Q),
          status: a(ea),
          errorText: a(Le),
          videoInfo: a(B),
          "onUpdate:url": a(W),
          onRelate: a(aa),
          onClear: a(he)
        }, null, 8, ["modelValue", "url", "status", "errorText", "videoInfo", "onUpdate:url", "onRelate", "onClear"])) : v("", !0), a(ne) && !a(V) && a(M) ? (c(), k(a(Be), {
          key: 6,
          styleType: "inAudio",
          showTip: a(M).show_toast,
          auto: a(ce),
          onChangeAuto: a(va)
        }, null, 8, ["showTip", "auto", "onChangeAuto"])) : v("", !0), a(xe) === "podcast_audio_pay" || a(O) ? (c(), Ce(Vt, {
          key: 7
        }, [Z(a(g), {
          duration: a(ra),
          payInfo: a(O),
          onChange: a(ge)
        }, null, 8, ["duration", "payInfo", "onChange"]), Z(be, {
          "border-color": "var(--w-card-border)",
          class: I(n.$style.gap1)
        }, null, 8, ["class"])], 64)) : v("", !0)])], 512), [
          [ha, a(R)]
        ])], 2)], 34)) : v("", !0), fa(ee("div", {
          class: I(n.$style.box1)
        }, [ee("div", {
          class: I([n.$style.gray1, n.$style.tit1])
        }, " 设置微博内容 ", 2), a(le) ? v("", !0) : (c(), k(a(ae), {
          key: 0,
          ref_key: "publisherRef",
          ref: _e,
          doneDisabled: a(N),
          channelData: a(ba),
          statementAuth: !a(je),
          toolsfliter: ["emoticon", "hash", "at", "place", "timer"],
          "visible-only": a(V) ? {
            visible: 0,
            text: "公开",
            disabled: !0
          } : null,
          set: {
            content: a(H),
            action: "channel",
            publish: a(fe),
            publishCallback: a(ta),
            autoPublish: a(oe) && !a($) && a(ya) !== "edit",
            getSuccessData: a(C)
          },
          sendDesc: a(se),
          coCreation: a(Xe),
          isAiClip: a(We),
          onChange: a(ie),
          onDisabledCheck: a(q)
        }, null, 8, ["doneDisabled", "channelData", "statementAuth", "visible-only", "set", "sendDesc", "coCreation", "isAiClip", "onChange", "onDisabledCheck"]))], 2), [
          [ha, a(R) && !a(F)]
        ]), a(R) ? (c(), Ce("div", {
          key: 4,
          class: I(n.$style.top40)
        }, [Z(Me, {
          modelValue: a(U),
          "onUpdate:modelValue": w[6] || (w[6] = E => Wa(U) ? U.value = E : null),
          class: I(n.$style.checkbox)
        }, {
          default: ma(() => [ee("span", {
            class: I(n.$style.f12)
          }, " 确认并保证，上传/同步/链接作品的行为不侵犯第三方的合法权益，亦不违反与第三方所签订的对用户有约束力的法律文件的规定 ", 2)]),
          _: 1
        }, 8, ["modelValue", "class"])], 2)) : v("", !0), a(F) && a(R) ? (c(), k(Ca, {
          key: 5,
          style: {
            "margin-top": "30px",
            position: "relative"
          },
          justify: "center"
        }, {
          default: ma(() => [ee("div", Ut, [Z(Aa, {
            disabled: a(N),
            sort: "flat",
            kind: "primary",
            onClick: a($e)
          }, {
            default: ma(() => [Tt(St(a(se)), 1)]),
            _: 1
          }, 8, ["disabled", "onClick"]), a(N) ? (c(), Ce("div", {
            key: 0,
            class: I(n.$style.btn1),
            onClick: w[7] || (w[7] = (...E) => a(q) && a(q)(...E))
          }, null, 2)) : v("", !0)])]),
          _: 1
        })) : v("", !0)], 2), [
          [ha, !a(le)]
        ]), a(R) ? v("", !0) : (c(), k(a(p), {
          key: 0
        }))], 2)), a(pe) ? (c(), Ce("div", {
          key: 0,
          id: "glowcut-audio-list",
          ref_key: "containerRef",
          ref: Ye,
          class: I(n.$style.audioListContainer)
        }, null, 2)) : v("", !0)], 2)
      }
    }
  }),
  Nt = "_box1_163jt_2",
  Bt = "_gray1_163jt_5",
  qt = "_videobox_163jt_10",
  zt = "_top1_163jt_14",
  Ft = "_layer_163jt_22",
  Ht = "_layerNarrow_163jt_32",
  Gt = "_layer2_163jt_36",
  Jt = "_unmodal_163jt_40",
  Kt = "_tit1_163jt_46",
  Qt = "_gap1_163jt_57",
  Wt = "_btn1_163jt_75",
  Xt = "_f12_163jt_84",
  Yt = "_top40_163jt_88",
  Zt = "_checkbox_163jt_92",
  el = "_mainContainer_163jt_105",
  al = "_mainContainerNarrow_163jt_112",
  tl = "_leftPanel_163jt_116",
  ll = "_audioListContainer_163jt_125",
  ol = {
    box1: Nt,
    gray1: Bt,
    videobox: qt,
    top1: zt,
    layer: Ft,
    layerNarrow: Ht,
    layer2: Gt,
    unmodal: Jt,
    tit1: Kt,
    gap1: Qt,
    btn1: Wt,
    f12: Xt,
    top40: Yt,
    checkbox: Zt,
    mainContainer: el,
    mainContainerNarrow: al,
    leftPanel: tl,
    audioListContainer: ll
  },
  sl = {
    $style: ol
  },
  rl = xt(Mt, [
    ["__cssModules", sl]
  ]);
export {
  rl as
  default
};
