const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/UploadSrt-DqkZOhkg.js", "assets/index-Xve1TSN5.js", "assets/index-BQia-I5S.css", "assets/UploadSrt-U4ZBkwpD.css", "assets/AudioPay-DEJCuZ8z.js", "assets/AudioPay-nnhyDFJI.css", "assets/VideoUpload-CUYNiaHl.js", "assets/VideoUpload-UsKzmGBW.css", "assets/Sort-D31SHdq3.js", "assets/Sort-Du9eDwOL.css", "assets/VideoEdit-C2M37YsN.js", "assets/VideoEdit-DsjNyC0Z.css", "assets/CoCreation-BO8TQ9jh.js", "assets/CoCreation-HKftH6qI.css", "assets/HeaderComment-DxATBkq0.js", "assets/HeaderComment-Ds5EjNH3.css", "assets/Success-Blx_A82R.js", "assets/Success-DNAUkz1s.css", "assets/AutoState-COGt7oMw.js", "assets/AutoState-DJsVdNV0.css", "assets/Type-B0t91pNC.js", "assets/Type-BQus3jjr.css", "assets/Title-D1LUYl8Y.js", "assets/Title-DhJDaZ76.css", "assets/AudioAlbum-BOoJvsx6.js", "assets/AudioAlbum-pPktcH5z.css", "assets/AudioCover-CbJkwMFm.js", "assets/AudioCover-oau8L0R3.css", "assets/VideoHighlightEntry-T1UaM_rh.js", "assets/VideoHighlightEntry-Bzs41HN2.css", "assets/AddRss-BdjOmDCK.js", "assets/AddRss-DwHZrsSc.css", "assets/CheckAudioAuth-DgAWCbP8.js", "assets/CheckAudioAuth-CdcxRttd.css", "assets/AudioDetail-DyPiidZh.js", "assets/AudioDetail-C4c88QPk.css", "assets/AudioAlbumHeader-Bph5rJwC.js", "assets/AudioAlbumHeader-CzO6X8og.css", "assets/OriginalVideoRelation-DcjIy00B.js", "assets/OriginalVideoRelation-BkwEAJo1.css", "assets/AudioAction-DFvQRdW8.js", "assets/AudioAction-C1gj1qeE.css", "assets/Rss-DumkFQ4H.js", "assets/Rss-Cjv8Ptq2.css", "assets/AiAudio-C-sLf93R.js", "assets/AiAudio-BUyzhWGO.css", "assets/HighlightPreload-DPM4KGxb.js", "assets/HighlightPreload-NG9BPyAZ.css"]))) => i.map(i => d[i]);
var Ue = Object.defineProperty,
  He = Object.defineProperties;
var ze = Object.getOwnPropertyDescriptors;
var ve = Object.getOwnPropertySymbols;
var je = Object.prototype.hasOwnProperty,
  Be = Object.prototype.propertyIsEnumerable;
var Ae = (e, t, s) => t in e ? Ue(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
  }) : e[t] = s,
  k = (e, t) => {
    for (var s in t || (t = {})) je.call(t, s) && Ae(e, s, t[s]);
    if (ve)
      for (var s of ve(t)) Be.call(t, s) && Ae(e, s, t[s]);
    return e
  },
  M = (e, t) => He(e, ze(t));
var G = (e, t, s) => new Promise((i, o) => {
  var l = m => {
      try {
        p(s.next(m))
      } catch (g) {
        o(g)
      }
    },
    d = m => {
      try {
        p(s.throw(m))
      } catch (g) {
        o(g)
      }
    },
    p = m => m.done ? i(m.value) : Promise.resolve(m.value).then(l, d);
  p((s = s.apply(e, t)).next())
});
import {
  _ as Fe,
  J as Ne,
  al as A,
  an as Je,
  ao as Ge,
  l as _,
  ap as Ke,
  m as P,
  i as u,
  D as h,
  n as r,
  B as a,
  O as F,
  h as y,
  P as W,
  p as f,
  C as c,
  T as Q,
  G as ee,
  U as be,
  E as te,
  H as We,
  aq as Qe,
  ar as Xe,
  as as E,
  at as _e,
  au as Ce,
  V as ie,
  ai as we,
  av as Ye,
  aj as Ze,
  aw as xe,
  ax as Ve,
  ay as $e,
  az as et,
  ah as v,
  ak as tt,
  aA as it,
  x as De,
  ac as st,
  r as w,
  aB as ot,
  ad as lt,
  ae as at,
  z as rt
} from "./index-Xve1TSN5.js";
import {
  a as nt,
  s as dt,
  u as ut
} from "./useOriginalVideoRelation-P9OUk3Jy.js";
const ht = "_box1_1eu85_14",
  ct = "_gray1_1eu85_17",
  pt = "_videobox_1eu85_22",
  _t = "_top1_1eu85_26",
  ft = "_top2_1eu85_30",
  mt = "_label2_1eu85_34",
  gt = "_add_1eu85_48",
  yt = "_icon_1eu85_59",
  vt = "_icon1_1eu85_69",
  At = "_scroll_1eu85_105",
  bt = "_sort_1eu85_111",
  Ct = "_sortin_1eu85_116",
  wt = "_noWrap_1eu85_124",
  Vt = "_gray2_1eu85_128",
  Dt = "_pos_1eu85_134",
  St = "_layer_1eu85_147",
  Rt = "_layerNarrow_1eu85_157",
  Pt = "_layer2_1eu85_161",
  kt = "_unmodal_1eu85_164",
  It = "_tit1_1eu85_170",
  Et = "_tit2_1eu85_181",
  Tt = "_gap1_1eu85_185",
  Ot = "_gap2_1eu85_194",
  Lt = "_gap4_1eu85_198",
  Mt = "_gap5_1eu85_202",
  qt = "_albumIcon_1eu85_225",
  Ut = "_btn1_1eu85_233",
  Ht = "_f12_1eu85_242",
  zt = "_top40_1eu85_246",
  jt = "_checkbox_1eu85_250",
  Bt = "_switchCenter_1eu85_262",
  Ft = "_mainContainer_1eu85_268",
  Nt = "_mainContainerNarrow_1eu85_275",
  Jt = "_leftPanel_1eu85_279",
  Gt = "_audioListContainer_1eu85_288",
  Kt = {
    box1: ht,
    gray1: ct,
    videobox: pt,
    top1: _t,
    top2: ft,
    label2: mt,
    add: gt,
    icon: yt,
    icon1: vt,
    switch: "_switch_1eu85_74",
    scroll: At,
    sort: bt,
    sortin: Ct,
    noWrap: wt,
    gray2: Vt,
    pos: Dt,
    layer: St,
    layerNarrow: Rt,
    layer2: Pt,
    unmodal: kt,
    tit1: It,
    tit2: Et,
    gap1: Tt,
    gap2: Ot,
    gap4: Lt,
    gap5: Mt,
    albumIcon: qt,
    btn1: Ut,
    f12: Ht,
    top40: zt,
    checkbox: jt,
    switchCenter: Bt,
    mainContainer: Ft,
    mainContainerNarrow: Nt,
    leftPanel: Jt,
    audioListContainer: Gt
  },
  Wt = {
    directives: {
      onClickOutside: Ge
    },
    components: {
      UploadSrt: A(() => v(() => import("./UploadSrt-DqkZOhkg.js"), __vite__mapDeps([0, 1, 2, 3]))),
      AudioPay: A(() => v(() => import("./AudioPay-DEJCuZ8z.js"), __vite__mapDeps([4, 1, 2, 5]))),
      VideoUpload: A(() => v(() => import("./VideoUpload-CUYNiaHl.js"), __vite__mapDeps([6, 1, 2, 7]))),
      VideoSort: A(() => v(() => import("./Sort-D31SHdq3.js"), __vite__mapDeps([8, 1, 2, 9]))),
      VideoEdit: A(() => v(() => import("./VideoEdit-C2M37YsN.js"), __vite__mapDeps([10, 1, 2, 11]))),
      Publisher: A(() => v(() => import("./index-Xve1TSN5.js").then(e => e.aX), __vite__mapDeps([1, 2]))),
      CoCreation: A(() => v(() => import("./CoCreation-BO8TQ9jh.js"), __vite__mapDeps([12, 1, 2, 13]))),
      VideoScreenshot: Je,
      HeaderComment: A(() => v(() => import("./HeaderComment-DxATBkq0.js"), __vite__mapDeps([14, 1, 2, 15]))),
      Success: A(() => v(() => import("./Success-Blx_A82R.js"), __vite__mapDeps([16, 1, 2, 17]))),
      AutoState: A(() => v(() => import("./AutoState-COGt7oMw.js"), __vite__mapDeps([18, 1, 2, 19]))),
      Type: A(() => v(() => import("./Type-B0t91pNC.js"), __vite__mapDeps([20, 1, 2, 21]))),
      Title: A(() => v(() => import("./Title-D1LUYl8Y.js"), __vite__mapDeps([22, 1, 2, 23]))),
      AudioAlbum: A(() => v(() => import("./AudioAlbum-BOoJvsx6.js"), __vite__mapDeps([24, 1, 2, 25]))),
      AudioCover: A(() => v(() => import("./AudioCover-CbJkwMFm.js"), __vite__mapDeps([26, 1, 2, 27]))),
      VideoHighlightEntry: A(() => v(() => import("./VideoHighlightEntry-T1UaM_rh.js"), __vite__mapDeps([28, 1, 2, 29]))),
      AddRss: A(() => v(() => import("./AddRss-BdjOmDCK.js"), __vite__mapDeps([30, 1, 2, 12, 13, 31]))),
      CheckAudioAuth: A(() => v(() => import("./CheckAudioAuth-DgAWCbP8.js"), __vite__mapDeps([32, 1, 2, 33]))),
      AudioDetail: A(() => v(() => import("./AudioDetail-DyPiidZh.js"), __vite__mapDeps([34, 1, 2, 35]))),
      AudioAlbumHeader: A(() => v(() => import("./AudioAlbumHeader-Bph5rJwC.js"), __vite__mapDeps([36, 1, 2, 37]))),
      OriginalVideoRelation: A(() => v(() => import("./OriginalVideoRelation-DcjIy00B.js"), __vite__mapDeps([38, 1, 2, 39]))),
      SelfDeclaration: A(() => v(() => import("./index-Xve1TSN5.js").then(e => e.aV), __vite__mapDeps([1, 2]))),
      Action: A(() => v(() => import("./index-Xve1TSN5.js").then(e => e.aT), __vite__mapDeps([1, 2]))),
      AudioAction: A(() => v(() => import("./AudioAction-DFvQRdW8.js"), __vite__mapDeps([40, 1, 2, 41]))),
      Rss: A(() => v(() => import("./Rss-DumkFQ4H.js"), __vite__mapDeps([42, 1, 2, 43]))),
      AiAudio: A(() => v(() => import("./AiAudio-C-sLf93R.js"), __vite__mapDeps([44, 1, 2, 45]))),
      HighlightPreload: A(() => v(() => import("./HighlightPreload-DPM4KGxb.js"), __vite__mapDeps([46, 1, 2, 47])))
    },
    props: {
      lockScreen: {
        type: Boolean,
        default: !0
      },
      iptType: {
        type: String,
        default: "",
        required: !1
      },
      editData: {
        type: String
      }
    },
    setup(e, {
      refs: t
    }) {
      const {
        proxy: s
      } = De(), {
        isVideo: i,
        isAudio: o,
        isAudioEdit: l,
        isAudioUpload: d,
        isEdit: p,
        entry: m,
        isRss: g,
        isRssAll: V,
        rss_url: O,
        guid: I,
        cluster_id: q,
        ai: D,
        isAi: se,
        aiResult: oe
      } = st(), T = ut(), j = De().proxy, R = j.$route.query.oid, N = w(["0", "1", "2", "3"]), b = ot(j), X = lt(), B = at(b.videoScroll, j, N, R), Y = w(!0), Z = w(!1), le = w(!0), U = w(""), H = w(!1), L = w({
        src: ""
      }), ae = w(!0), x = w(""), J = w(""), $ = w(), re = w(_e(j.$route.query) === Ce), ne = w(!1), de = w(!1);
      rt({
        title: `${o.value?"音频":"视频"}发布`
      });
      const ue = S => {
          x.value = S
        },
        he = ({
          src: S,
          pid: C
        }) => {
          L.value.src = S, L.value.pid = C
        },
        ce = S => {
          Z.value = S, S && (Y.value = !0)
        },
        K = w(""),
        n = w(),
        pe = w(!0),
        z = w(!0),
        Se = S => {
          n.value = S
        },
        fe = w(0),
        Re = S => {
          var C;
          fe.value = (C = S == null ? void 0 : S.allowHighlightPreheat) != null ? C : 0
        },
        Pe = () => {
          g.value ? j.$http.get("/ajax/multimedia/rss_publisher_config", {
            params: {
              rss_url: O.value,
              guid: I.value
            }
          }).then(({
            data: S
          }) => {
            var ge, ye;
            const C = S.data.result;
            I.value && C.title ? (z.value = C.auto_publish.enable, $.value = C.auto_publish, q.value = C.cluster_idStr, K.value = C.is_new_cluster, X.title.value = C.title, U.value = C.desc, L.value.src = (ge = C.cover) == null ? void 0 : ge.bmiddle_pic, L.value.pid = (ye = C.cover) == null ? void 0 : ye.pic_id, J.value = C.content ? C.content : B.defaultStatus.value) : C.cluster_idStr && (q.value = C.cluster_idStr, K.value = C.is_new_cluster, J.value = C.content ? C.content : B.defaultStatus.value)
          }) : o.value && (J.value = B.defaultStatus.value)
        },
        me = w(),
        ke = S => {
          me.value = S
        },
        Ie = S => {
          z.value = S, z.value || s.$_w_dialog({
            type: "confirm",
            message: "确认关闭「自动发布」么？关闭后， 新发布的节目需要手动发布。",
            btnCancel: "不关闭",
            btnConfirm: "确认关闭",
            cancel: () => {
              z.value = !0
            }
          })
        },
        {
          videoScroll: Ee,
          checkAlbumRef: Te,
          addAlbumInput: Oe
        } = b,
        {
          addTagInput: Le,
          videoSort: Me
        } = B,
        qe = w(null);
      return M(k(k(k({
        auto_publish: z,
        changeAuto: Ie,
        publisherContent: J,
        is_new_cluster: K,
        cluster_id: q,
        isRss: g,
        isRssAll: V,
        isVideo: i,
        isAudio: o,
        isAudioEdit: l,
        isAudioUpload: d,
        isEdit: p,
        entry: m,
        checkAudio: le,
        umVideoChange: ce,
        changeCoCreation: Se,
        showCoCreation: pe,
        coCreationState: n,
        highlightPreloadState: fe,
        changeHighlightPreload: Re,
        copyright_video_switch: Y,
        um_video: Z,
        supported_video_type: N,
        AudioDetailContent: U,
        AudioDetailContentState: H,
        AudioCoverSrc: L,
        AudioAuth: ae,
        AudioAlbum: x,
        rss_url: O,
        guid: I,
        ai: D,
        isAi: se,
        aiResult: oe,
        AudioAuto: $,
        handleRssInit: Pe,
        changeAudioAlbum: ue,
        changeAudioCoverSrc: he,
        changeAudioPay: ke,
        AudioPayConfig: me
      }, b), X), B), {
        videoScroll: Ee,
        checkAlbumRef: Te,
        addAlbumInput: Oe,
        addTagInput: Le,
        videoSort: Me,
        cutUpload: re,
        isPanorama: de,
        hasEnteredPublishFlow: ne,
        containerRef: qe,
        enabled: T.enabled,
        url: T.url,
        status: T.status,
        errorText: T.errorText,
        originalVideoRelationVideoInfo: T.videoInfo,
        originalVideoRelationMediaId: T.mediaId,
        updateUrl: T.updateUrl,
        relate: T.relate,
        clear: T.clear,
        restoreOriginalVideoRelation: T.restore
      })
    },
    data() {
      return {
        showToast: !1,
        toastType: 1,
        autoPublish: !1,
        time: "",
        successData: void 0,
        content: "",
        show_approval_reprint: !1,
        visable: !1,
        videoEdit: !1,
        checkExposure: !1,
        screenshot: {
          url: "",
          pid: ""
        },
        screenArray: [],
        type: void 0,
        uploadSuccess: void 0,
        videoDetails: {},
        localVideoSrc: "",
        videoManMake: {
          0: {
            name: "原创",
            show: !0,
            desc: "独立拍摄，制作完成的内容"
          },
          2: {
            name: "二次创作",
            show: !0,
            desc: "译制、解说、混剪等对原有视频进行再创作"
          },
          3: {
            name: "版权",
            show: !0,
            desc: "综艺、电视剧、电影、赛事等版权方的视频"
          }
        },
        social_video_watermark: !0,
        showWaterMarkPop: !1,
        showVplusPop: !1,
        manMakeSelect: void 0,
        showManMake: !1,
        video_source: "",
        video_source_error: !1,
        resetData: {},
        forward_strategy: !0,
        approval_reprint: !1,
        follower_watch_entire: !1,
        duration: void 0,
        horizontal: void 0,
        horizontalCover: void 0,
        formDisabled: !1,
        videoHighlightContent: "",
        videoHighlightLineCount: 0,
        videoHighlights: [],
        videoInfo: {},
        replaceVideo: !1,
        curTimer: !1,
        payInfo: void 0,
        definition: 0,
        isAiClip: !1,
        publishType: "",
        isPrePublish: !1,
        uploadSrtVisible: !1,
        srtFile: null,
        srtTitle: "",
        srtRender: !0,
        preupdateCoverPollTimer: null,
        declarationRequiredOptions: [],
        declarationOptionalOptions: [],
        selectedDeclarationRequired: "",
        selectedDeclarationOptional: [],
        declarationReprintSource: ""
      }
    },
    computed: M(k({}, Ne(["config"])), {
      hasMediaId() {
        return !!this.$route.query.media_id
      },
      showAudioList() {
        return this.isAudio && this.AudioAuth && !this.showMoreDetail && !this.hasEnteredPublishFlow
      },
      showAllowClip() {
        return this.allowClip !== void 0
      },
      showOriginalVideoRelation() {
        return this.forceOriginalVideoRelation || dt({
          isAudio: this.isAudio,
          isPanorama: this.isPanorama,
          videoAssociateInfo: this.videoAssociateInfo
        })
      },
      associationMid() {
        const e = this.$route.query.association_mid;
        return Array.isArray(e) ? e[0] : e
      },
      aiCutPublishData() {
        return it(this.$route.query)
      },
      aiCutOriginalMediaId() {
        var e;
        return ((e = this.aiCutPublishData) == null ? void 0 : e.originalMediaId) || ""
      },
      forceOriginalVideoRelation() {
        return !!(this.associationMid || this.aiCutOriginalMediaId) && !this.isAudio && !this.isPanorama
      },
      forcedOriginalVideoValue() {
        return this.aiCutOriginalMediaId ? this.aiCutOriginalMediaId : this.associationMid ? `https://weibo.com/detail/${encodeURIComponent(this.associationMid)}` : ""
      },
      hasSrt() {
        return !!this.srtFile || !!this.srtTitle
      },
      mediaId() {
        return this.videoDetails && this.videoDetails.media_id || ""
      },
      videoHighlightUnsupportedFormat() {
        return [this.videoDetails, this.videoInfo].filter(Boolean).some(t => t.unsupported_format === !0 || t.isUnsupportedFormat === !0 || t.playable === !1 || t.is_playable === !1 || t.support_play === !1 || t.play_support === !1)
      },
      videoHighlightSrc() {
        const e = [this.videoDetails, this.videoInfo].filter(Boolean);
        for (const t of e) {
          const s = t.stream_url || t.video_url || t.media_url || t.url || t.play_url || t.mp4_url;
          if (s) return s
        }
        return ""
      },
      hasnav() {
        return this.$route.query.hasnav !== "0"
      },
      showMoreDetail() {
        return !this.autoPublish && this.uploadSuccess !== void 0 || this.isRss
      },
      sendDesc() {
        return this.uploadSuccess !== !0 && !this.isRss ? "自动发布" : this.isEdit || this.isAudioEdit ? "确认更改" : "发布"
      },
      statementModel() {
        return this.statementConfig || {}
      },
      statementTitle() {
        return this.statementModel.statement_title || "内容声明"
      },
      statementPlaceholder() {
        const e = this.statementModel.confirm_toast || "请选择内容声明";
        return this.statementRequired && !e.includes("必填") ? `${e}（必填）` : e
      },
      statementRequired() {
        return !!this.statementModel.statement_required
      },
      statementShow() {
        return !!this.statementModel.statement_show
      },
      statementDefaultRequiredValue() {
        var e;
        return ((e = this.statementModel.default_requiredItem) == null ? void 0 : e.id) || ""
      },
      statementDefaultOptionalValues() {
        return Array.isArray(this.statementModel.default_optionalItems) ? this.statementModel.default_optionalItems.map(e => e.id).filter(Boolean) : []
      },
      currentDeclarationRequiredOption() {
        return this.declarationRequiredOptions.find(e => e.value === this.selectedDeclarationRequired)
      },
      currentDeclarationRequiredMinLength() {
        var s, i;
        const t = (((s = this.currentDeclarationRequiredOption) == null ? void 0 : s.textfield_placeholder) || "").match(/最少\s*(\d+)\s*个字|(\d+)\s*characters?/i);
        return t ? Number(t[1] || t[2] || 0) : ((i = this.currentDeclarationRequiredOption) == null ? void 0 : i.textfield_min_length) || 0
      },
      declarationText() {
        if (!this.selectedDeclarationRequired) return this.statementPlaceholder;
        const e = this.declarationRequiredOptions.find(t => t.value === this.selectedDeclarationRequired);
        return e ? e.textfield && this.declarationReprintSource ? `${e.label}：${this.declarationReprintSource}` : e.label : this.statementPlaceholder
      },
      channelDisabled() {
        var e, t, s, i;
        if (this.isAudio) {
          if (this.isRssAll) {
            if (!this.checkAudio) return !0
          } else if (!this.title.trim() || !this.checkAudio || !this.AudioCoverSrc.src) return !0;
          if (this.AudioDetailContentState) return !0;
          if (this.um_video === "podcast_audio_pay")
            if ((e = this.AudioPayConfig) != null && e.price) {
              if (((t = this.AudioPayConfig) == null ? void 0 : t.price) < .1 || ((s = this.AudioPayConfig) == null ? void 0 : s.price) > 200) return !0;
              if (this.AudioPayConfig.duration) {
                if (this.AudioPayConfig.duration > this.duration || this.AudioPayConfig.duration < 10) return !0
              } else return !0
            } else return !0
        }
        return !!(this.showOriginalVideoRelation && this.enabled && this.status !== "success" || (this.type === void 0 || this.statementRequired && !this.selectedDeclarationRequired || (i = this.currentDeclarationRequiredOption) != null && i.textfield && this.declarationReprintSource.trim().length < this.currentDeclarationRequiredMinLength) && !this.isAudio || this.doneDisabled || this.$refs.video_upload && this.$refs.video_upload.status === "upload" || this.checkExposure && !this.channel_ids)
      },
      isDone() {
        return this.showMoreDetail, this.checkExposure && !this.channel_ids ? !1 : !!(this.uploadSuccess || this.isRss)
      }
    }),
    watch: {
      autoPublish(e) {
        if (!e) try {
          tt.close()
        } catch (t) {}
      },
      isRss(e) {
        e && this.handleRssInit()
      },
      showOriginalVideoRelation(e) {
        !e && !this.forceOriginalVideoRelation && this.clear()
      },
      enabled(e) {
        !e && !this.forceOriginalVideoRelation && this.clear()
      },
      checkExposure(e) {
        e === !1 ? (this.channelText = "选择视频分类", this.tagInput = "", this.tagList = [], this.recommendTagList = [], this.channelIndex = 0, this.channel_ids = "", this.subChannelIndex = 0, this.type = void 0, this.supported_video_type = ["0", "1", "2", "3"]) : this.scrollToBottom()
      },
      uploadSuccess(e) {
        this.entry === "edit" && e && this.autoPublish && this.submitEditInfo()
      },
      statementConfig: {
        handler(e) {
          this.syncDeclarationConfig(e)
        },
        immediate: !0,
        deep: !0
      },
      showMoreDetail(e) {
        e && (this.hasEnteredPublishFlow = !0)
      }
    },
    methods: {
      logPublishStatementState(e, t = "") {
        this.actionLog({
          act_code: 5447,
          ext: `channel:pc|state:${e}${t?`|failreason:${t}`:""}`
        })
      },
      loadGlowCutEmbed() {
        return G(this, null, function*() {
          try {
            const {
              mount: e
            } = yield v(() => G(this, null, function*() {
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
                const s = document.getElementById("glowcut-audio-list");
                s && (s.style.display = t ? "block" : "none")
              }
            })
          } catch (e) {
            console.error("[GlowCutEmbed] 模块加载失败:", e)
          }
        })
      },
      initAssociationOriginalVideoRelation() {
        return G(this, null, function*() {
          !this.forceOriginalVideoRelation || !this.forcedOriginalVideoValue || this.status === "success" && this.url === this.forcedOriginalVideoValue || (this.enabled = !0, this.updateUrl(this.forcedOriginalVideoValue), yield this.relate())
        })
      },
      syncDeclarationConfig(e) {
        e && (this.declarationRequiredOptions = (e.requiredItems || []).map(t => ({
          label: t.title,
          value: t.id,
          textfield: t.textfield,
          textfield_placeholder: t.textfield_placeholder,
          textfield_min_length: t.textfield_min_length,
          textfield_max_length: t.textfield_max_length
        })), this.declarationOptionalOptions = (e.optionalItems || []).map(t => ({
          label: t.title,
          value: t.id
        })))
      },
      handleUploadSrt() {
        this.uploadSrtVisible = !0
      },
      closeUploadSrt() {
        this.uploadSrtVisible = !1
      },
      confirmUploadSrt(e) {
        this.srtFile = e, this.uploadSrtVisible = !1, this.$_w_toast({
          type: "success",
          message: "字幕上传成功"
        })
      },
      handleDeleteSrt() {
        this.srtFile = null, this.srtTitle = ""
      },
      handleTypeChange(e) {
        this.type = e
      },
      handlePublisherSuccess({
        type: e
      }) {
        var t;
        e === "update" && !this.isAudio && window.history.replaceState({
          current: ((t = history == null ? void 0 : history.state) == null ? void 0 : t.current) || ""
        }, "", "/upload/channel")
      },
      albumsMore() {
        this.$_w_toast({
          type: "warn",
          message: "此合集内视频数量已达上限，请新建合集再添加视频"
        })
      },
      disabledCheck() {
        var e, t, s, i, o;
        this.isAudio && (this.isRssAll ? this.checkAudio || this.$_w_toast({
          type: "warn",
          message: "请确认底部协议"
        }) : this.title.trim() ? this.AudioCoverSrc.src ? this.checkAudio ? this.um_video === "podcast_audio_pay" && ((e = this.AudioPayConfig) != null && e.price ? ((t = this.AudioPayConfig) == null ? void 0 : t.price) < .1 || ((s = this.AudioPayConfig) == null ? void 0 : s.price) > 200 ? this.$_w_toast({
          type: "warn",
          message: "请修改音频价格"
        }) : this.AudioPayConfig.duration ? (this.AudioPayConfig.duration > this.duration || this.AudioPayConfig.duration < 10) && this.$_w_toast({
          type: "warn",
          message: "请修改试听时长"
        }) : this.$_w_toast({
          type: "warn",
          message: "请设置试听时长"
        }) : this.$_w_toast({
          type: "warn",
          message: "请输入音频价格"
        })) : this.$_w_toast({
          type: "warn",
          message: "请确认底部协议"
        }) : this.$_w_toast({
          type: "warn",
          message: "请上传封面再发布"
        }) : this.$_w_toast({
          type: "warn",
          message: "请填写标题再发布"
        })), this.type === void 0 && !this.isAudio ? (window.scroll(0, 0), this.$_w_toast({
          type: "warn",
          message: "请选择类型后再发布"
        })) : this.statementRequired && !this.selectedDeclarationRequired && !this.isAudio ? (this.logPublishStatementState("fail", "statement"), window.scroll(0, 0), this.$_w_toast({
          type: "warn",
          message: "请添加内容声明"
        })) : (i = this.currentDeclarationRequiredOption) != null && i.textfield && this.declarationReprintSource.trim().length < this.currentDeclarationRequiredMinLength && !this.isAudio ? (this.logPublishStatementState("fail", "statement"), window.scroll(0, 0), this.$_w_toast({
          type: "warn",
          message: ((o = this.currentDeclarationRequiredOption) == null ? void 0 : o.textfield_placeholder) || "请输入转载来源"
        })) : this.showOriginalVideoRelation && this.enabled && this.status !== "success" && this.$_w_toast({
          type: "warn",
          message: "请先关联原视频"
        })
      },
      changeEdit(e) {
        this.videoEdit = !0, e === "upload" && this.$nextTick(() => {
          this.$refs.videoEdit.$refs.file.click()
        })
      },
      change(e, t) {
        var s, i, o, l;
        e === "close" ? ((i = (s = this.$refs) == null ? void 0 : s.video_upload) == null || i.cancelMethods(), this.title = "", this.handleReset(!0)) : e === "auto" ? this.autoPublish = !0 : e === "closeShow" ? ((l = (o = this.$refs) == null ? void 0 : o.video_upload) == null || l.cancelMethods(), this.title = "", this.handleReset(!0), this.showToast = !0, this.toastType = t) : e === "visible" ? t !== 0 ? this.showCoCreation = !1 : this.showCoCreation = !0 : e === "schedule_timestamp" ? this.curTimer = t : e === "mediaid" ? this.updateMd5(t) : t === void 0 && (this.publisherContent = e, this.syncVideoHighlightContent(e))
      },
      formatVideoHighlightContent(e = []) {
        return e.map(t => `${t.time} ${t.text}`.trim()).filter(Boolean).join(`
`)
      },
      parseVideoHighlightLine(e = "") {
        return et(e)
      },
      findCurrentVideoHighlightBlock(e = "") {
        return Ve(e, this.videoHighlightContent) || $e(e, this.videoHighlightLineCount)
      },
      getVideoSpotlights() {
        if (!this.videoHighlightLineCount) return [];
        const e = this.findCurrentVideoHighlightBlock(this.publisherContent || ""),
          t = (e == null ? void 0 : e.spotlightLines) || (e == null ? void 0 : e.blockLines);
        return (e == null ? void 0 : e.spotlights) || (t == null ? void 0 : t.map(s => this.parseVideoHighlightLine(s))) || []
      },
      syncVideoHighlightContent(e = "") {
        if (!this.videoHighlightLineCount) return;
        const t = this.findCurrentVideoHighlightBlock(e);
        if (t) {
          const s = t.spotlightLines || t.blockLines;
          this.videoHighlightContent = s.join(`
`), this.videoHighlights = s.map(i => {
            const o = i.trim(),
              l = o.search(/\s/);
            return {
              time: o.slice(0, l),
              text: o.slice(l).trim()
            }
          });
          return
        }
        this.videoHighlightContent = "", this.videoHighlightLineCount = 0, this.videoHighlights = []
      },
      removeVideoHighlightContent(e = "") {
        const t = Ve(e, this.videoHighlightContent);
        return t ? (t.lines.splice(t.startIndex, t.blockLines.length), t.lines.join(`
`)) : e
      },
      handleVideoHighlightConfirm(e) {
        const t = e.map(d => ({
            time: d.time,
            text: d.text
          })),
          s = this.formatVideoHighlightContent(t),
          i = this.publisherContent || "",
          o = this.findCurrentVideoHighlightBlock(i),
          l = this.removeVideoHighlightContent(i);
        if (this.videoHighlights = t, this.videoHighlightContent = s, this.videoHighlightLineCount = t.length, s)
          if (o) {
            const d = l.split(`
`),
              p = Math.min(o.startIndex, d.length);
            d.splice(p, 0, ...s.split(`
`)), this.publisherContent = d.join(`
`)
          } else this.publisherContent = xe(l, s);
        else this.publisherContent = l;
        this.$nextTick(() => {
          this.focusPublisher()
        })
      },
      clearVideoHighlightState() {
        this.publisherContent = this.removeVideoHighlightContent(this.publisherContent || ""), this.videoHighlights = [], this.videoHighlightContent = "", this.videoHighlightLineCount = 0
      },
      handleReset(e = !1) {
        this.clearPreupdateCoverPolling();
        const t = this.show_approval_reprint;
        e && (this.time = Date.now()), Object.assign(this.$data, this.$options.data()), this.show_approval_reprint = t
      },
      updateMd5(e) {
        !this.isRss && this.$refs.video_upload.logUpload(), this.$refs.video_upload.updateMd5(e)
      },
      clearPreupdateCoverPolling() {
        this.preupdateCoverPollTimer && (clearTimeout(this.preupdateCoverPollTimer), this.preupdateCoverPollTimer = null)
      },
      applyPreupdateCover(e = []) {
        return !Array.isArray(e) || !e.length ? !1 : (this.screenArray = e.map((t, s) => {
          let i = 2;
          return s === 0 && (i = 11), M(k({}, t), {
            source: i
          })
        }), this.screenshot && this.screenshot.url || (this.screenshot = this.screenArray[0] || {
          url: "",
          pid: ""
        }), !0)
      },
      extractPreupdateScreenshot(e, t) {
        var m;
        if (!e) return null;
        const s = e[t] || e;
        if (((m = s == null ? void 0 : s.screenshot) == null ? void 0 : m.state) !== 1) return null;
        const i = s.screenshot;
        let o = null;
        if (i.file_detail) try {
          o = JSON.parse(i.file_detail)
        } catch (g) {
          o = null
        }
        o || (o = i.file_detail_value);
        const l = Array.isArray(o == null ? void 0 : o.files) ? o.files : [];
        if (l.length) return l.map(g => M(k(k({}, i), g), {
          url: g.url || (g.pid ? ie(g.pid) : ""),
          pid: g.pid || g.file_id || "",
          file_id: g.file_id || i.file_id || ""
        })).filter(g => g.url);
        const d = i.file_id || "",
          p = i.url || (d ? ie(d) : "");
        return p ? [M(k({}, i), {
          url: p,
          pid: d,
          file_id: i.file_id || ""
        })] : null
      },
      pollPreupdateCover(e) {
        if (!e || this.isAudio || !this.$route.query.preupdate_id) return;
        this.clearPreupdateCoverPolling();
        const t = () => {
          this.$http.get("/ajax/multimedia/output", {
            params: {
              source: 339644097,
              ids: e,
              labels: "screenshot"
            }
          }).then(s => {
            var o;
            const i = this.extractPreupdateScreenshot((o = s == null ? void 0 : s.data) == null ? void 0 : o.data, e);
            this.applyPreupdateCover(i || []) || (this.preupdateCoverPollTimer = setTimeout(t, 5e3))
          }).catch(() => {
            this.preupdateCoverPollTimer = setTimeout(t, 5e3)
          })
        };
        t()
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$refs.videoScroll.scrollTop = this.$refs.videoScroll.scrollHeight
        })
      },
      uploadChange(...e) {
        var t;
        switch (e[0]) {
          case "show":
            this.show();
            break;
          case "file":
            this.clearVideoHighlightState(), this.uploadSuccess = !1, this.videoDetails = {}, this.duration = void 0, this.isPanorama = !1, this.localVideoSrc && URL.revokeObjectURL(this.localVideoSrc), this.localVideoSrc = e[1] ? URL.createObjectURL(e[1]) : "";
            break;
          case "screenshot":
            this.screenArray = Array.isArray(e[1]) && e[1].map((s, i) => {
              let o = 2;
              return i === 0 && (o = 11), M(k({}, s), {
                source: o
              })
            }) || [], this.screenshot && this.screenshot.url || !(this.screenshot && this.screenshot.url) && (this.screenshot = this.screenArray[0] ? this.screenArray[0] : {
              url: "",
              pid: ""
            });
            break;
          case "success":
            Ze({
              key: "execuploadsuccess"
            }), this.uploadSuccess = !0, this.videoDetails = e[1];
            break;
          case "start":
            this.autoPublish = !1, this.uploadSuccess = !1;
            break;
          case "init":
            this.clearPreupdateCoverPolling(), this.clearVideoHighlightState(), this.autoPublish = !1, this.uploadSuccess = !1, this.videoDetails = {}, this.screenshot = {
              url: "",
              pid: ""
            }, this.screenArray = [], this.duration = void 0, this.horizontal = void 0, this.isPanorama = !1, this.checkExposure = !1, this.checkAlbum = !1, this.forward_strategy = !0, this.localVideoSrc && (URL.revokeObjectURL(this.localVideoSrc), this.localVideoSrc = "");
            break;
          case "cancel":
            this.clearVideoHighlightState(), this.uploadSuccess = void 0, this.videoDetails = {}, this.duration = void 0, this.isPanorama = !1, this.localVideoSrc && (URL.revokeObjectURL(this.localVideoSrc), this.localVideoSrc = ""), this.definition = "", this.srtFile = null, this.srtTitle = "", this.srtRender = !1, this.$nextTick(() => {
              this.srtRender = !0
            });
            break;
          case "replace":
            this.replaceVideo = !0;
            break;
          case "detail":
            e[1] && e[1].width < e[1].height && (this.horizontal = !0), e[1] && e[1].duration && (this.duration = e[1].duration), this.isPanorama = !!((t = e[1]) != null && t.isPanorama);
            {
              const {
                width: s,
                height: i
              } = e[1];
              this.definition = Math.min(s, i)
            }
            break
        }
      },
      changeVideoEdit(...e) {
        this.videoEdit = !1, e[0] === 0 ? this.hide() : e[0] === "select" ? this.screenshot = this.screenArray[e[1] - 1] : e[0] === "change" && (this.screenshot = M(k({}, e[1].url), {
          source: 1
        }), e[1].cover && (this.horizontalCover = e[1].cover))
      },
      show(e = !0) {
        this.visable = !0, e && this.dataInit(), !e && (this.resetData = JSON.parse(JSON.stringify(this.$data)))
      },
      hide() {
        this.visable = !1
      },
      done(e = !0) {
        return this.isAudio && this.actionLog({
          uicode: "30000840",
          actType: "7639"
        }), this.uploadSuccess && e && (this.successData = this.getSuccessData()), !0
      },
      getSuccessData() {
        var p, m, g, V, O, I, q;
        const e = [];
        this.albumList.forEach(D => {
          D.checked && e.push(D.id)
        });
        const t = D => D.split("/").slice(-1)[0].split(".")[0],
          s = {
            titles: [{
              title: this.title,
              default: "true"
            }],
            covers: [k({
              url: this.screenshot.url,
              pid: this.screenshot.pid || this.screenshot.file_id,
              source: (p = this.screenshot.source) != null ? p : ""
            }, we((m = this == null ? void 0 : this.screenshot) != null && m.pid ? this.screenshot.pid : t((g = this.screenshot) == null ? void 0 : g.url)))],
            free_duration: {
              start: 0,
              end: 30
            }
          },
          i = this.$route.query || {},
          o = Ye(i);
        o && (s.task = o), (V = this.coCreationState) != null && V.coCreation && (s.cooperate_video = this.coCreationState.selectArr.map(D => ({
          uid: D.id,
          role: D.role
        })), (I = (O = this.coCreateConfig) == null ? void 0 : O.permanent_host) != null && I.length ? s.permanent_host = this.coCreateConfig.permanent_host.map(D => D.uid) : s.permanent_host = []), this.um_video && (s.um_video_switch = this.um_video === "um_video", s.is_vip_paid = this.um_video === "vplus_video"), this.material_permission && this.entry !== "edit" && (s.copyright_video_switch = this.copyright_video_switch), (this.entry === "edit" || this.isAudioEdit) && this.replaceVideo === !0 && (s.edit_object_id = this.videoDetails.media_id);
        const l = this.category ? "homemade" : "contribution";
        if (this.isAudio) {
          if (this.AudioCoverSrc.src && (s.covers = [k({
              url: this.AudioCoverSrc.src,
              pid: this.AudioCoverSrc.pid
            }, we(this.AudioCoverSrc.pid))]), this.isRssAll) s.rss = {
            rss_url: this.rss_url,
            cluster_id: this.cluster_id
          };
          else if (this.isRss) s.rss = {
            rss_url: this.rss_url,
            guid: this.guid
          }, this.AudioAuto && (s.rss.auto_publish = this.auto_publish), this.AudioAuto.show_toast && (s.rss.show_toast = !0);
          else {
            const D = this.videoDetails.media_id ? this.videoDetails.media_id : this.oid.split(":")[1];
            s.media_id = D, s.fid = `2373717:${D}`
          }
          s.type = "audio", this.AudioAlbum && (s.playlist = {
            playlist_audio: !0,
            album_ids: this.AudioAlbum.toString()
          }), this.AudioDetailContent && (s.desc = this.AudioDetailContent), this.um_video === "podcast_audio_pay" && (s.free_duration.end = this.AudioPayConfig.duration, s.price = this.AudioPayConfig.price, s.is_vip_paid = !0)
        } else this.isVideo ? (s.type = "video", s.media_id = this.videoDetails.media_id) : l === "homemade" && (s.homemade_changed = 1);
        this.horizontalCover && s.covers.push({
          type: 1,
          pid: this.horizontalCover.pid,
          source: 1
        }), s.resource = {
          video_down: this.checkAllowDownload ? 1 : 0
        }, this.showAllowClip && (s.resource.allow_clip = +this.allowClip), nt({
          showOriginalVideoRelation: this.showOriginalVideoRelation,
          status: this.status,
          mediaId: this.originalVideoRelationMediaId
        }) && (s.video_associate_id = this.originalVideoRelationMediaId, s.resource.manual_split = {
          origin_media_id: this.originalVideoRelationMediaId,
          origin_url: this.url
        }), this.selectedDeclarationRequired && (s.resource.statement = {
          required: {
            id: this.selectedDeclarationRequired
          },
          optional: this.selectedDeclarationOptional.map(D => ({
            id: D
          }))
        }, (q = this.currentDeclarationRequiredOption) != null && q.textfield && this.declarationReprintSource.trim() && (s.resource.statement.required.textfield_content = this.declarationReprintSource.trim())), this.highlightPreloadState && (s.resource.allow_highlight_preheat = this.highlightPreloadState), s[l] = {
          channel_ids: [this.channel_ids],
          type: this.type
        }, this.show_approval_reprint && (s.approval_reprint = this.forward_strategy ? "1" : "0"), this.follower_watch_entire && (s.follower_watch_entire = {
          enable: 0
        }), this.checkAlbum && s.type !== "audio" && (s.playlist = {
          playlist_video: !0,
          album_ids: e.toString()
        });
        const d = this.getVideoSpotlights();
        return s.type === "video" && d.length && (s.spotlight_visible = 1, s.spotlights = d), s
      },
      submitEditInfo() {
        if (!this.isDone) this.done(!1) && this.$_w_dialog({
          btnConfirm: "我知道了",
          message: `设置自动发布成功！ 微博将于${this.isAudio?"音频":"视频"}文件上传并转码完成后自动发出。在文件上传完毕前请勿关闭浏览器窗口`,
          action: () => {
            this.change("auto")
          }
        });
        else {
          const e = this.getSuccessData();
          this.isAudioEdit && (e.media_id = this.oid.split(":")[1]);
          const t = {
            oid: this.oid,
            mid: this.videoInfo.mid,
            media: JSON.stringify(e)
          };
          this.isAudioEdit && (t.desc = this.AudioDetailContent), this.$http.post("/ajax/multimedia/submitVideoEditInfo", t).then(s => {
            s.data.ok > 0 && s.data.data && s.data.data.result && (this.showToast = !0)
          }).catch(s => {
            console.warn(s)
          })
        }
      },
      showFiles() {
        this.handleReset(), this.$refs.video_upload.showFiles()
      },
      dataInit() {
        return G(this, null, function*() {
          this.channelListInit()
        })
      },
      getAIAudioInfo() {
        const e = this.aiResult;
        e.error || (this.videoDetails = {
          media_id: e.media_id
        }, this.showMoreDetail = !0, this.uploadSuccess = !0, this.initAiAudioInfo(e))
      },
      getVideoEditInfo(e, t = !1) {
        this.$http.get(`/ajax/multimedia/get${t?"Audio":"Video"}EditInfo`, {
          params: {
            media_id: e
          }
        }).then(s => {
          var i, o;
          if (s.data && s.data.ok > 0) {
            this.srtTitle = (i = s.data.srt) == null ? void 0 : i.title;
            const l = s.data.data,
              d = l && l[t ? "audio_info" : "video_info"];
            if (d.editable) this.videoInfo = d, this.videoDetails.media_id = (o = d.oid) == null ? void 0 : o.replace("1034:", ""), this.videoInfo.height > this.videoInfo.width && (this.horizontal = !0), this.videoInfo && (this.initEditVideoInfo(this.videoInfo), this.restoreOriginalVideoRelation(M(k(k({}, l), this.videoInfo), {
              associateVideo: s.data.associateVideo
            }))), d.pay_audio && (this.payInfo = d.pay_audio);
            else {
              const p = d.reject_edit_reason || d.non_editable_reason || `抱歉，当前${this.isAudio?"音频":"视频"}无法编辑`;
              this.hasnav ? this.$_w_toast({
                type: "warn",
                message: p,
                action: () => {
                  this.$router.push({
                    name: "videoManage"
                  })
                }
              }) : this.$_w_toast({
                type: "warn",
                message: p,
                autohide: !1,
                mask: !0
              })
            }
          }
        }, () => {
          this.$_w_toast({
            type: "warn",
            message: `抱歉，当前${this.isAudio?"音频":"视频"}无法编辑`
          })
        })
      },
      initAiAudioInfo(e) {
        this.title = e == null ? void 0 : e.wb_title, this.screenshot = {
          url: e.cover
        }, this.AudioCoverSrc.src = e.cover, this.AudioCoverSrc.pid = e.pid, this.publisherContent += e.text
      },
      initEditVideoInfo(e) {
        var d;
        this.title = e.titles[0] && e.titles[0].title, this.syncDeclarationFromInfo(e), this.screenshot = {
          url: e.covers[0].url
        }, this.isAudio && (this.AudioCoverSrc.src = e.covers[0].url, this.AudioCoverSrc.pid = e.covers[0].url.match(/\/\/[^\n\r/\u2028\u2029]*\/.*\/(.*)\..*/)[1], this.AudioDetailContent = e.audio_desc, e.current_playlists && e.current_playlists.length > 0 && (this.cluster_id = e.current_playlists.map(p => p.id).join(","))), e.current_playlists && e.current_playlists.length > 0 && (this.albumIds = e.current_playlists.map(p => p.id), this.checkAlbum = !0);
        const t = e != null && e.homemade_info && ((d = Object.keys(e == null ? void 0 : e.homemade_info)) != null && d.length) ? e.homemade_info : e == null ? void 0 : e.contribution_info,
          s = t == null ? void 0 : t.first_level_channels,
          i = t == null ? void 0 : t.second_level_channels;
        let o = 0,
          l = 0;
        s && s[0] && (this.checkExposure = !0, (this.category ? this.category : this.channelList).forEach((m, g) => {
          m.channel_id === s[0].id && (o = g, m.sub_channels && m.sub_channels.length > 0 && i && i[0] && m.sub_channels.forEach((V, O) => {
            V.sub_channel_id === i[0].id && (l = O, this.modifyChannel("main", o), this.modifyChannel("sub", l))
          }))
        })), this.type = t == null ? void 0 : t.type
      },
      closeChannel() {
        this.showChannel = !1
      },
      showToastType() {
        this.$_w_toast({
          type: "warn",
          message: `共创${this.isAudio?"音":"视"}频不可转载`
        })
      },
      handleDeclarationConfirm({
        requiredValue: e,
        optionalValues: t,
        reprintSource: s
      }) {
        this.selectedDeclarationRequired = e, this.selectedDeclarationOptional = t, this.declarationReprintSource = s
      },
      handleDeclarationInvalid(e) {
        this.$_w_toast({
          type: "warn",
          message: e
        })
      },
      syncDeclarationFromInfo(e) {
        var m, g;
        if ((this.entry === "edit" || this.isAudioEdit) && this.replaceVideo) return;
        const t = V => {
            if (!V || typeof V != "string") return V;
            try {
              return JSON.parse(V)
            } catch (O) {
              return V
            }
          },
          s = t(e == null ? void 0 : e.resource),
          i = t(e == null ? void 0 : e.resource_info),
          o = t((g = (m = e == null ? void 0 : e.covers) == null ? void 0 : m[0]) == null ? void 0 : g.resource),
          l = (e == null ? void 0 : e.statement) || (s == null ? void 0 : s.statement) || (i == null ? void 0 : i.statement) || (o == null ? void 0 : o.statement),
          d = (l == null ? void 0 : l.required) || (l == null ? void 0 : l.user_requiredItem),
          p = (l == null ? void 0 : l.optional) || (l == null ? void 0 : l.user_optionalItems);
        if (!l) {
          this.selectedDeclarationRequired = "", this.selectedDeclarationOptional = [], this.declarationReprintSource = "";
          return
        }
        this.selectedDeclarationRequired = (d == null ? void 0 : d.id) || "", this.selectedDeclarationOptional = Array.isArray(p) ? p.map(V => V == null ? void 0 : V.id).filter(Boolean) : [], this.declarationReprintSource = (d == null ? void 0 : d.textfield_content) || ""
      },
      getAIClipInfo() {
        const e = this.$route.query || {},
          t = E(e.media_id),
          s = E(e.oid),
          i = E(e.mid);
        this.$http.get("/ajax/multimedia/getAIClipInfo", {
          params: {
            media_id: t,
            oid: s,
            mid: i,
            schedule: +(_e(e) === "schedule")
          }
        }).then(o => {
          if (o.data.ok > 0) {
            this.isAiClip = !0;
            const l = o.data.data;
            this.screenshot = {
              url: l.cover
            }, this.publisherContent = l.text, this.focusPublisher(), l.schedule > 0 && this.$refs.publisher.handleSchedule(l.schedule)
          }
        })
      },
      focusPublisher() {
        var s, i, o, l, d;
        const e = Array.isArray(this.$refs.publisher) ? this.$refs.publisher[0] : this.$refs.publisher,
          t = [e == null ? void 0 : e.$el, (i = (s = e == null ? void 0 : e.$refs) == null ? void 0 : s.form) == null ? void 0 : i.$el, (d = (l = (o = e == null ? void 0 : e.$refs) == null ? void 0 : o.form) == null ? void 0 : l.$refs) == null ? void 0 : d.form].find(p => typeof(p == null ? void 0 : p.scrollIntoView) == "function");
        t && t.scrollIntoView({
          behavior: "smooth"
        })
      },
      getCutInfo() {
        const e = this.$route.query || {},
          t = E(e.expires),
          s = E(e.uuid),
          i = E(e.signature),
          o = E(e.media_id);
        this.$http.get("/ajax/multimedia/getCutInfo", {
          params: {
            expires: t,
            uuid: s,
            signature: i,
            media_id: o
          }
        }).then(l => {
          var d, p;
          l.data.ok > 0 && (this.cutUpload = !0, this.videoDetails.media_id = o, this.screenshot.url = (d = l.data.data) == null ? void 0 : d.cover, this.title = (p = l.data.data) == null ? void 0 : p.title, this.showMoreDetail = !0, this.uploadSuccess = !0)
        })
      },
      getPreUpdateData() {
        this.isAudio || !this.$route.query.preupdate_id || this.$http.get("/ajax/statuses/getPreUpdate", {
          params: {
            preupdate_id: this.$route.query.preupdate_id
          }
        }).then(e => {
          if (e.data.ok > 0 && e.data.data) {
            const {
              media_id: t,
              pid: s,
              horizontal: i,
              title: o
            } = e.data.data;
            i !== void 0 && (this.horizontal = Number(i) === 0), s && (this.screenshot = {
              url: ie(s),
              pid: s
            }), this.pollPreupdateCover(t), this.title = o, this.isPrePublish = !0, this.videoDetails.media_id = t, this.showMoreDetail = !0, this.uploadSuccess = !0
          }
        })
      }
    },
    beforeMount() {
      this.isEdit && (this.oid = this.$route.query.oid, this.entry = this.$route.query.entry, this.uploadSuccess = !0), this.isAudioEdit && (this.oid = this.$route.query.oid, this.entry = this.$route.query.entry, this.uploadSuccess = !0)
    },
    beforeUnmount() {},
    mounted() {
      return G(this, null, function*() {
        var d, p;
        this.isAudio && this.AudioAuth && this.loadGlowCutEmbed(), this.$http.get("/ajax/multimedia/getapproval").then(({
          data: m
        }) => {
          m.ok && (this.show_approval_reprint = m.showApprovalRepeat)
        }), yield this.channelListInit(), yield this.initAssociationOriginalVideoRelation(), this.handleRssInit();
        const e = this.$route.query || {},
          t = E(e.oid),
          s = E(e.media_id),
          i = _e(e),
          o = E(e.mid);
        if (E(e.preupdate_id)) this.getPreUpdateData();
        else if (i === "cut") this.publishType = i, this.getCutInfo();
        else if (i === Ce) this.publishType = i, this.cutUpload = !0, s && (this.videoDetails = {
          media_id: s
        }, this.showMoreDetail = !0, this.uploadSuccess = !0);
        else if (i === "wedance") {
          const m = E(e.pid),
            g = E(e.horizontal);
          if (m) {
            const V = ie(m);
            this.screenshot.url = V, this.screenshot.pid = m, g !== void 0 && (this.horizontal = Number(g) === 0)
          }
          this.videoDetails.media_id = s, this.showMoreDetail = !0, this.uploadSuccess = !0
        } else this.isEdit && t ? this.getVideoEditInfo(t) : this.isAudioEdit && t ? this.getVideoEditInfo(t, !0) : this.isAudio && this.isAi && this.aiPublish ? this.getAIAudioInfo() : this.isAudioUpload && (this.videoDetails = {
          media_id: s
        }, this.showMoreDetail = !0, this.uploadSuccess = !0);
        t && s && o && this.getAIClipInfo(), this.AudioAuth = (d = this.config.flags) == null ? void 0 : d.audio_auth, this.actionLog({
          uicode: "30000840",
          actType: "7635",
          ext: `is_authorized:${(p=this.config.flags)==null?void 0:p.audio_auth}`
        })
      })
    }
  },
  Qt = {
    key: 1
  },
  Xt = {
    key: 0
  },
  Yt = {
    class: "wbpro-form"
  },
  Zt = ["value"],
  xt = ["textContent"],
  $t = {
    key: 1,
    style: {
      height: "22px"
    }
  },
  ei = {
    style: {
      height: "22px"
    }
  },
  ti = {
    style: {
      position: "relative"
    }
  };

function ii(e, t, s, i, o, l) {
  const d = _("Success"),
    p = _("CheckAudioAuth"),
    m = _("AiAudio"),
    g = _("HeaderComment"),
    V = _("AudioAlbumHeader"),
    O = _("VideoUpload"),
    I = _("woo-divider"),
    q = _("AddRss"),
    D = _("AutoState"),
    se = _("Type"),
    oe = _("SelfDeclaration"),
    T = _("Title"),
    j = _("VideoScreenshot"),
    R = _("woo-box-item"),
    N = _("woo-fonticon"),
    b = _("woo-box"),
    X = _("VideoSort"),
    B = _("HighlightPreload"),
    Y = _("AudioCover"),
    Z = _("AudioDetail"),
    le = _("AudioAlbum"),
    U = _("Action"),
    H = _("woo-switch"),
    L = _("woo-checkbox"),
    ae = _("CoCreation"),
    x = _("OriginalVideoRelation"),
    J = _("VideoHighlightEntry"),
    $ = _("Rss"),
    re = _("AudioPay"),
    ne = _("Publisher"),
    de = _("woo-button"),
    ue = _("VideoEdit"),
    he = _("AudioAction"),
    ce = _("UploadSrt"),
    K = Ke("on-click-outside");
  return u(), P("div", {
    class: r([e.$style.mainContainer, !l.showAudioList && e.$style.mainContainerNarrow])
  }, [(u(), P("div", {
    key: o.time,
    class: r(e.$style.leftPanel)
  }, [a(d, {
    showToast: o.showToast,
    toastType: o.toastType,
    videoEdit: o.videoEdit,
    hasnav: l.hasnav
  }, null, 8, ["showToast", "toastType", "videoEdit", "hasnav"]), F(f("div", {
    class: r(["wbpro-layer", [e.$style.layer, !l.hasnav && e.$style.layer2, !l.showAudioList && e.$style.layerNarrow]])
  }, [!i.AudioAuth && i.isAudio ? (u(), y(p, {
    key: 0
  })) : h("", !0), i.AudioAuth || !i.isAudio ? (u(), y(g, {
    key: 1,
    showMoreDetail: o.autoPublish || l.showMoreDetail,
    videoDescInfo: e.videoDescInfo,
    definition: o.definition
  }, {
    default: c(() => [!l.showMoreDetail && e.aiPublish && e.aiPublish.title ? (u(), y(m, {
      key: 0,
      aiPublish: e.aiPublish
    }, null, 8, ["aiPublish"])) : h("", !0)]),
    _: 1
  }, 8, ["showMoreDetail", "videoDescInfo", "definition"])) : h("", !0), i.isRssAll ? (u(), y(V, {
    key: 2
  })) : h("", !0), i.isAudio && i.AudioAuth || i.isVideo || i.isEdit ? (u(), P("div", {
    key: 3,
    ref: "videoScroll",
    class: r(["modal-scroll", e.$style.unmodal]),
    onTouchmovePassive: t[20] || (t[20] = Q(() => {}, ["stop"]))
  }, [f("div", {
    class: r(e.$style.videobox)
  }, [f("div", {
    class: r(e.$style.top1)
  }, [!o.showToast && !i.isRss ? (u(), y(O, {
    key: 0,
    ref: "video_upload",
    type: "channel",
    screenshot: o.screenshot.url,
    biz_type: e.biz_type,
    audioCanPay: e.audioCanPay,
    payInfo: o.payInfo,
    cutUpload: i.cutUpload,
    maxFileSize: e.maxFileSize,
    isPrePublish: o.isPrePublish,
    hasSrt: l.hasSrt,
    onVideoChange: l.uploadChange,
    onUmVideo: i.umVideoChange,
    onEdit: t[0] || (t[0] = n => o.videoEdit = !0),
    onUploadSrt: l.handleUploadSrt
  }, null, 8, ["screenshot", "biz_type", "audioCanPay", "payInfo", "cutUpload", "maxFileSize", "isPrePublish", "hasSrt", "onVideoChange", "onUmVideo", "onUploadSrt"])) : h("", !0), F(a(I, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"]), [
    [W, o.autoPublish || l.showMoreDetail]
  ])], 2), i.isAudio && !l.showMoreDetail && !o.autoPublish ? (u(), y(q, {
    key: 0,
    coCreateConfig: e.coCreateConfig
  }, null, 8, ["coCreateConfig"])) : h("", !0), a(D, {
    hasnav: l.hasnav,
    autoPublish: o.autoPublish,
    onCancel: t[1] || (t[1] = n => o.autoPublish = !1)
  }, null, 8, ["hasnav", "autoPublish"]), F(f("div", null, [i.isVideo || i.isEdit ? (u(), y(se, {
    key: 0,
    coCreationState: i.coCreationState,
    hideRepostOption: l.statementShow,
    onShowToast: l.showToastType,
    selectedType: o.type,
    onTypeChange: l.handleTypeChange
  }, null, 8, ["coCreationState", "hideRepostOption", "onShowToast", "selectedType", "onTypeChange"])) : h("", !0), !i.isAudio && l.statementShow ? (u(), P(ee, {
    key: 1
  }, [a(oe, {
    title: l.statementTitle,
    displayText: l.declarationText,
    requiredOptions: o.declarationRequiredOptions,
    optionalOptions: o.declarationOptionalOptions,
    defaultRequiredValue: l.statementDefaultRequiredValue,
    defaultOptionalValues: l.statementDefaultOptionalValues,
    requiredValue: o.selectedDeclarationRequired,
    optionalValues: o.selectedDeclarationOptional,
    reprintSource: o.declarationReprintSource,
    required: l.statementRequired,
    onConfirm: l.handleDeclarationConfirm,
    onInvalid: l.handleDeclarationInvalid
  }, null, 8, ["title", "displayText", "requiredOptions", "optionalOptions", "defaultRequiredValue", "defaultOptionalValues", "requiredValue", "optionalValues", "reprintSource", "required", "onConfirm", "onInvalid"]), a(I, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])], 64)) : h("", !0), i.isRssAll ? h("", !0) : (u(), y(T, {
    key: 2,
    content: e.title,
    onInput: t[2] || (t[2] = n => e.title = n)
  }, null, 8, ["content"])), i.isVideo || i.isEdit ? (u(), y(j, {
    key: 3,
    edit: o.videoEdit,
    screenArray: o.screenArray,
    screenshot: o.screenshot.url,
    horizontal: o.horizontal,
    channel: !0,
    hasMediaId: l.hasMediaId,
    onEdit: l.changeEdit,
    onChange: l.changeVideoEdit
  }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "hasMediaId", "onEdit", "onChange"])) : h("", !0), f("div", null, [i.isRssAll ? h("", !0) : (u(), y(I, {
    key: 0,
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])), i.isAudio ? h("", !0) : (u(), P("div", Qt, [f("div", {
    class: r(e.$style.gap1)
  }, [f("div", null, [f("div", {
    class: r(e.$style.gap2)
  }, [f("div", {
    class: r(e.$style.tit1)
  }, " 分类 ", 2), F((u(), P("div", {
    class: r(e.$style.top1)
  }, [a(b, {
    align: "center",
    class: r(["wbpro-select wbpor-pos error", e.$style.sort]),
    onClick: t[3] || (t[3] = Q(n => e.showChannel = !0, ["stop"]))
  }, {
    default: c(() => [a(R, {
      align: "center"
    }, {
      default: c(() => [be(te(e.channelText), 1)]),
      _: 1
    }), a(b, {
      align: "center",
      justify: "center",
      class: "opt"
    }, {
      default: c(() => [a(N, {
        value: "caretDown"
      })]),
      _: 1
    }), F(a(X, {
      ref: "videoSort",
      class: r(e.$style.sortin),
      list: e.category ? e.category : e.channelList,
      onChange: e.modifyChannel
    }, null, 8, ["class", "list", "onChange"]), [
      [W, e.showChannel]
    ])]),
    _: 1
  }, 8, ["class"])], 2)), [
    [K, l.closeChannel]
  ])], 2)])], 2)])), a(B, {
    duration: o.duration,
    onChange: i.changeHighlightPreload
  }, null, 8, ["duration", "onChange"]), i.isAudio && !i.isRssAll ? (u(), y(Y, {
    key: 2,
    title: "",
    src: i.AudioCoverSrc.src,
    curObj: {
      src: i.AudioCoverSrc.src
    },
    onChange: i.changeAudioCoverSrc
  }, null, 8, ["src", "curObj", "onChange"])) : h("", !0), i.isAudio && !i.isRssAll ? (u(), y(Z, {
    key: 3,
    AudioDetailContent: i.AudioDetailContent,
    onInput: t[4] || (t[4] = n => i.AudioDetailContent = n),
    onState: t[5] || (t[5] = n => i.AudioDetailContentState = n)
  }, null, 8, ["AudioDetailContent"])) : h("", !0), i.isAudio && l.showMoreDetail ? (u(), y(le, {
    key: 4,
    cluster_id: i.cluster_id,
    is_new_cluster: i.is_new_cluster,
    onChange: i.changeAudioAlbum
  }, null, 8, ["cluster_id", "is_new_cluster", "onChange"])) : h("", !0), i.isAudio ? h("", !0) : (u(), P("div", {
    key: 5,
    class: r(e.$style.gap1)
  }, [a(b, {
    align: "center",
    class: r(e.$style.switch)
  }, {
    default: c(() => [a(R, {
      align: "center"
    }, {
      default: c(() => [a(b, {
        align: "center"
      }, {
        default: c(() => [f("div", {
          class: r([e.$style.gray1, e.$style.tit1])
        }, " 合集 ", 2), a(U, {
          title: "微博合集",
          desc: ` 1、合集功能可以让你对自己的视频作品进行分类管理。
                            <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。
                            <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。`
        })]),
        _: 1
      })]),
      _: 1
    }), f("div", null, [a(H, {
      ref: "checkAlbumRef",
      modelValue: e.checkAlbum,
      "onUpdate:modelValue": t[6] || (t[6] = n => e.checkAlbum = n),
      size: .6875
    }, null, 8, ["modelValue"])])]),
    _: 1
  }, 8, ["class"]), e.checkAlbum ? (u(), P("div", Xt, [f("div", {
    class: r(e.$style.scroll)
  }, [(u(!0), P(ee, null, We(e.albumList, (n, pe) => (u(), y(b, {
    key: pe,
    align: "center",
    class: r(e.$style.top2)
  }, {
    default: c(() => [a(L, {
      modelValue: n.checked,
      "onUpdate:modelValue": z => n.checked = z,
      value: "check1",
      class: r(e.$style.label2),
      disabled: n.item_count >= 500,
      onClick: z => n.item_count >= 500 && l.albumsMore()
    }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "onClick"]), a(R, null, {
      default: c(() => [f("div", Yt, [a(b, {
        align: "center"
      }, {
        default: c(() => [f("span", {
          class: r(e.$style.albumIcon)
        }, null, 2), a(R, null, {
          default: c(() => [f("input", {
            type: "text",
            value: n.value + (n.checked ? `(更新至${n.item_count+1}集)` : `(共${n.item_count}集)`),
            disabled: "",
            onKeypress: t[7] || (t[7] = Q(() => {}, ["stop"]))
          }, null, 40, Zt)]),
          _: 2
        }, 1024)]),
        _: 2
      }, 1024)])]),
      _: 2
    }, 1024)]),
    _: 2
  }, 1032, ["class"]))), 128)), e.checkAddAlbum ? (u(), y(b, {
    key: 0,
    align: "center",
    class: r(e.$style.top2)
  }, {
    default: c(() => [a(L, {
      modelValue: e.addAlbumObj.checked,
      "onUpdate:modelValue": t[8] || (t[8] = n => e.addAlbumObj.checked = n),
      value: "check2",
      class: r(e.$style.label2),
      disabled: e.addAlbumObj.disabled
    }, null, 8, ["modelValue", "class", "disabled"]), a(R, null, {
      default: c(() => [f("div", {
        class: r(["wbpro-form focus", {
          error: e.addAlbumObj.error
        }])
      }, [a(b, {
        align: "center"
      }, {
        default: c(() => [a(N, {
          value: "album",
          class: r(e.$style.icon1)
        }, null, 8, ["class"]), a(R, null, {
          default: c(() => [F(f("input", {
            ref: "addAlbumInput",
            "onUpdate:modelValue": t[9] || (t[9] = n => e.addAlbumObj.message = n),
            type: "text",
            onKeyup: t[10] || (t[10] = Qe((...n) => e.addAlbumEnter && e.addAlbumEnter(...n), ["enter"])),
            onBlur: t[11] || (t[11] = (...n) => e.addAlbumEnter && e.addAlbumEnter(...n)),
            onKeypress: t[12] || (t[12] = Q(() => {}, ["stop"]))
          }, null, 544), [
            [Xe, e.addAlbumObj.message]
          ])]),
          _: 1
        }), e.addAlbumObj.error ? (u(), P("div", {
          key: 0,
          class: "num",
          textContent: te(`${e.addAlbumObj.number}/12`)
        }, null, 8, xt)) : h("", !0)]),
        _: 1
      })], 2)]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])) : h("", !0)], 2), f("div", {
    class: r(e.$style.add)
  }, [a(N, {
    value: "add",
    class: r(e.$style.icon)
  }, null, 8, ["class"]), f("span", {
    onClick: t[13] || (t[13] = Q((...n) => e.addAlbum && e.addAlbum(...n), ["stop"]))
  }, "新建合集")], 2)])) : h("", !0)], 2)), a(I, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"]), e.coCreateConfig.can_publish && !i.um_video && !i.isRssAll && !i.isEdit && !i.isAudioEdit && !o.payInfo && !i.isPanorama ? (u(), y(ae, {
    key: 6,
    coCreateConfig: e.coCreateConfig,
    type: o.type === 1,
    visible: i.showCoCreation,
    timer: o.curTimer,
    showIcon: i.isAudio || i.isRss,
    onChange: i.changeCoCreation
  }, null, 8, ["coCreateConfig", "type", "visible", "timer", "showIcon", "onChange"])) : h("", !0), l.showOriginalVideoRelation ? (u(), y(x, {
    key: 7,
    modelValue: i.enabled,
    "onUpdate:modelValue": t[14] || (t[14] = n => i.enabled = n),
    url: i.url,
    status: i.status,
    errorText: i.errorText,
    videoInfo: i.originalVideoRelationVideoInfo,
    locked: l.forceOriginalVideoRelation,
    "onUpdate:url": i.updateUrl,
    onRelate: i.relate,
    onClear: i.clear
  }, null, 8, ["modelValue", "url", "status", "errorText", "videoInfo", "locked", "onUpdate:url", "onRelate", "onClear"])) : h("", !0), i.entry !== "edit" && !i.isAudio && !i.isPanorama ? (u(), y(J, {
    key: o.localVideoSrc,
    disabled: o.uploadSuccess !== !0,
    videoSrc: o.localVideoSrc,
    duration: o.duration,
    unsupportedFormat: l.videoHighlightUnsupportedFormat,
    highlights: o.videoHighlights,
    onConfirm: l.handleVideoHighlightConfirm
  }, null, 8, ["disabled", "videoSrc", "duration", "unsupportedFormat", "highlights", "onConfirm"])) : h("", !0), i.isRss && !i.isRssAll && i.AudioAuto ? (u(), y($, {
    key: 9,
    styleType: "inAudio",
    showTip: i.AudioAuto.show_toast,
    auto: i.auto_publish,
    onChangeAuto: i.changeAuto
  }, null, 8, ["showTip", "auto", "onChangeAuto"])) : h("", !0), i.um_video === "podcast_audio_pay" || o.payInfo ? (u(), P(ee, {
    key: 10
  }, [a(re, {
    duration: o.duration,
    payInfo: o.payInfo,
    onChange: i.changeAudioPay
  }, null, 8, ["duration", "payInfo", "onChange"]), a(I, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])], 64)) : h("", !0), !i.isAudio && !i.isPanorama ? (u(), P("div", {
    key: 11,
    class: r([e.$style.tit1, e.$style.gap2])
  }, " 设置 ", 2)) : h("", !0), !i.isAudio && !i.isPanorama ? (u(), y(b, {
    key: 12,
    class: r(e.$style.gap4),
    items: 3,
    wrap: "wrap"
  }, {
    default: c(() => [e.material_permission && i.entry !== "edit" ? (u(), y(R, {
      key: 0,
      class: r(e.$style.gap5)
    }, {
      default: c(() => [a(b, {
        align: "center",
        class: r(e.$style.switch)
      }, {
        default: c(() => [a(R, {
          align: "center"
        }, {
          default: c(() => [a(b, {
            align: "center"
          }, {
            default: c(() => [f("div", {
              class: r([e.$style.gray1])
            }, " 版权视频 ", 2)]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(H, {
          modelValue: i.copyright_video_switch,
          "onUpdate:modelValue": t[15] || (t[15] = n => i.copyright_video_switch = n),
          disabled: i.um_video,
          size: .6875
        }, null, 8, ["modelValue", "disabled"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])) : h("", !0), e.material_permission && i.entry !== "edit" ? (u(), P("div", $t, [a(I, {
      "border-color": "var(--w-card-border)",
      direction: "y"
    })])) : h("", !0), e.showAllowDownload ? (u(), P(ee, {
      key: 2
    }, [a(R, {
      class: r(e.$style.gap5)
    }, {
      default: c(() => [a(b, {
        align: "center",
        class: r(e.$style.switch)
      }, {
        default: c(() => [a(R, {
          align: "center"
        }, {
          default: c(() => [a(b, {
            align: "center"
          }, {
            default: c(() => [f("div", {
              class: r([e.$style.gray1])
            }, " 允许下载 ", 2), a(U, {
              title: "允许下载",
              desc: "是否允许他人下载该视频"
            })]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(H, {
          modelValue: e.checkAllowDownload,
          "onUpdate:modelValue": t[16] || (t[16] = n => e.checkAllowDownload = n),
          size: .6875
        }, null, 8, ["modelValue"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"]), f("div", ei, [a(I, {
      "border-color": "var(--w-card-border)",
      direction: "y"
    })])], 64)) : h("", !0), i.entry !== "edit" && o.show_approval_reprint ? (u(), y(R, {
      key: 3,
      class: r(e.$style.gap5)
    }, {
      default: c(() => [a(b, {
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: c(() => [a(b, {
          align: "center"
        }, {
          default: c(() => [f("div", {
            class: r([e.$style.gray1, e.$style.noWrap])
          }, " 允许他人划重点 ", 2), a(U, {
            title: "划重点说明",
            desc: "若您的微博为公开，并设置为允许划重点，其他用户可在您的视频中划出一个精彩的重点时刻并发微博，发布后将注明视频来源于您，同时产生的播放量会计入您的微博下。"
          })]),
          _: 1
        }), f("div", null, [a(H, {
          modelValue: o.forward_strategy,
          "onUpdate:modelValue": t[17] || (t[17] = n => o.forward_strategy = n),
          class: r(e.$style.switchCenter),
          size: .6875
        }, null, 8, ["modelValue", "class"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])) : h("", !0), l.showAllowClip ? (u(), y(R, {
      key: 4,
      class: r(e.$style.gap5)
    }, {
      default: c(() => [a(b, {
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: c(() => [a(b, {
          align: "center"
        }, {
          default: c(() => [f("div", {
            class: r(e.$style.gray1)
          }, " 允许他人剪辑 ", 2), a(U, {
            style: {
              "line-height": "16px"
            },
            title: "他人剪辑说明",
            desc: "打开开关即允许创作者基于您的视频进行剪辑创作，剪辑作品会带有“查看完整视频”按钮，点击后跳转至您的原视频，可为你带来流量收益。"
          })]),
          _: 1
        }), f("div", null, [a(H, {
          modelValue: e.allowClip,
          "onUpdate:modelValue": t[18] || (t[18] = n => e.allowClip = n),
          class: r(e.$style.switchCenter),
          offValue: 0,
          onValue: 1,
          size: .6875
        }, null, 8, ["modelValue", "class"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])) : h("", !0), a(R, {
      class: r(e.$style.gap5)
    }, {
      default: c(() => [e.play_config && e.play_config.follower_watch_entire && o.duration > 180 ? (u(), y(b, {
        key: 0,
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: c(() => [a(R, {
          align: "center"
        }, {
          default: c(() => [a(b, {
            align: "center"
          }, {
            default: c(() => [f("div", {
              class: r(e.$style.gray1)
            }, te(e.play_config.follower_watch_entire.title), 3), a(U, {
              title: e.play_config.follower_watch_entire.pop_up_window_title,
              desc: e.play_config.follower_watch_entire.pop_up_window_desc
            }, null, 8, ["title", "desc"])]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(H, {
          modelValue: o.follower_watch_entire,
          "onUpdate:modelValue": t[19] || (t[19] = n => o.follower_watch_entire = n),
          size: .6875
        }, null, 8, ["modelValue"])])]),
        _: 1
      }, 8, ["class"])) : h("", !0)]),
      _: 1
    }, 8, ["class"]), a(R)]),
    _: 1
  }, 8, ["class"])) : h("", !0)])], 512), [
    [W, l.showMoreDetail]
  ])], 2)], 34)) : h("", !0), F(f("div", {
    class: r(e.$style.box1)
  }, [f("div", {
    class: r([e.$style.gray1, e.$style.tit1, o.formDisabled && e.$style.tit2])
  }, " 设置微博内容 ", 2), o.showToast ? h("", !0) : (u(), y(ne, {
    key: 0,
    ref: "publisher",
    doneDisabled: l.channelDisabled,
    channelData: o.successData,
    statementAuth: !l.statementShow,
    toolsfliter: ["emoticon", "hash", "at", "place", "timer"],
    "visible-only": i.isRssAll ? {
      visible: 0,
      text: "公开",
      disabled: i.isAudio
    } : null,
    set: {
      content: i.publisherContent,
      action: "channel",
      publish: l.isDone,
      publishCallback: l.done,
      autoPublish: o.autoPublish && !o.replaceVideo && i.entry !== "edit",
      getSuccessData: l.getSuccessData,
      formDisabled: o.formDisabled
    },
    sendDesc: l.sendDesc,
    coCreation: i.coCreationState,
    isAiClip: o.isAiClip,
    publishType: o.publishType,
    onChange: l.change,
    onDisabledCheck: l.disabledCheck,
    onSuccess: l.handlePublisherSuccess
  }, null, 8, ["doneDisabled", "channelData", "statementAuth", "visible-only", "set", "sendDesc", "coCreation", "isAiClip", "publishType", "onChange", "onDisabledCheck", "onSuccess"]))], 2), [
    [W, l.showMoreDetail && !i.isEdit && !i.isAudioEdit]
  ]), l.showMoreDetail && i.isAudio ? (u(), P("div", {
    key: 4,
    class: r(e.$style.top40)
  }, [a(L, {
    modelValue: i.checkAudio,
    "onUpdate:modelValue": t[21] || (t[21] = n => i.checkAudio = n),
    class: r(e.$style.checkbox)
  }, {
    default: c(() => [f("span", {
      class: r(e.$style.f12)
    }, " 确认并保证，上传/同步/链接作品的行为不侵犯第三方的合法权益，亦不违反与第三方所签订的对用户有约束力的法律文件的规定 ", 2)]),
    _: 1
  }, 8, ["modelValue", "class"])], 2)) : h("", !0), (i.isEdit || i.isAudioEdit) && l.showMoreDetail ? (u(), y(b, {
    key: 5,
    style: {
      "margin-top": "30px",
      position: "relative"
    },
    justify: "center"
  }, {
    default: c(() => [f("div", ti, [a(de, {
      disabled: l.channelDisabled,
      sort: "flat",
      kind: "primary",
      onClick: l.submitEditInfo
    }, {
      default: c(() => [be(te(l.sendDesc), 1)]),
      _: 1
    }, 8, ["disabled", "onClick"]), l.channelDisabled ? (u(), P("div", {
      key: 0,
      class: r(e.$style.btn1),
      onClick: t[22] || (t[22] = (...n) => l.disabledCheck && l.disabledCheck(...n))
    }, null, 2)) : h("", !0)])]),
    _: 1
  })) : h("", !0)], 2), [
    [W, !o.videoEdit && !o.showToast]
  ]), a(ue, {
    ref: "videoEdit",
    edit: o.videoEdit,
    screenArray: o.screenArray,
    screenshot: o.screenshot.url,
    horizontal: o.horizontal,
    channel: !0,
    onChange: l.changeVideoEdit
  }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "onChange"]), l.showMoreDetail ? h("", !0) : (u(), y(he, {
    key: 0
  })), o.srtRender && (i.isVideo || i.isEdit) ? (u(), y(ce, {
    key: 1,
    visible: o.uploadSrtVisible,
    srtFile: o.srtFile,
    srtTitle: o.srtTitle,
    "media-id": l.mediaId,
    onClose: l.closeUploadSrt,
    onConfirm: l.confirmUploadSrt,
    onDelete: l.handleDeleteSrt
  }, null, 8, ["visible", "srtFile", "srtTitle", "media-id", "onClose", "onConfirm", "onDelete"])) : h("", !0)], 2)), l.showAudioList ? (u(), P("div", {
    key: 0,
    id: "glowcut-audio-list",
    ref: "containerRef",
    class: r(e.$style.audioListContainer)
  }, null, 2)) : h("", !0)], 2)
}
const si = {
    $style: Kt
  },
  ri = Fe(Wt, [
    ["render", ii],
    ["__cssModules", si]
  ]);
export {
  ri as
  default
};
