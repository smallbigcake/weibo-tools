const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/UploadSrt-CZC5WYmW.js", "assets/index-D53O_Npi.js", "assets/index-D06RDhv8.css", "assets/UploadSrt-U4ZBkwpD.css", "assets/AudioPay-BLXNgiK2.js", "assets/AudioPay-nnhyDFJI.css", "assets/VideoUpload-B8NiZRzb.js", "assets/VideoUpload-UsKzmGBW.css", "assets/Sort-DxNkHIdo.js", "assets/Sort-Du9eDwOL.css", "assets/VideoEdit-rZdHwyDj.js", "assets/VideoEdit-DsjNyC0Z.css", "assets/CoCreation-CSz2-tyt.js", "assets/CoCreation-HKftH6qI.css", "assets/HeaderComment-BVhDr6An.js", "assets/HeaderComment-Ds5EjNH3.css", "assets/Success-DG9IWXTo.js", "assets/Success-DNAUkz1s.css", "assets/AutoState-fpP-UYEv.js", "assets/AutoState-DJsVdNV0.css", "assets/Type-C9zyx6ES.js", "assets/Type-BQus3jjr.css", "assets/Title-DRDcPezD.js", "assets/Title-DhJDaZ76.css", "assets/AudioAlbum-CAsLMWuj.js", "assets/AudioAlbum-pPktcH5z.css", "assets/AudioCover-CAnkbMlT.js", "assets/AudioCover-oau8L0R3.css", "assets/VideoHighlightEntry-WtZobEBH.js", "assets/VideoHighlightEntry-Bzs41HN2.css", "assets/AddRss-DlAuLy5X.js", "assets/AddRss-DwHZrsSc.css", "assets/CheckAudioAuth-C5NZAHgE.js", "assets/CheckAudioAuth-CdcxRttd.css", "assets/AudioDetail-oezRAYUs.js", "assets/AudioDetail-C4c88QPk.css", "assets/AudioAlbumHeader-DVQWPk79.js", "assets/AudioAlbumHeader-CzO6X8og.css", "assets/OriginalVideoRelation-CHEi5l1x.js", "assets/OriginalVideoRelation-BkwEAJo1.css", "assets/AudioAction-Bnxg4L_j.js", "assets/AudioAction-C1gj1qeE.css", "assets/Rss-B1vvhnEu.js", "assets/Rss-Cjv8Ptq2.css", "assets/AiAudio-ChKonluW.js", "assets/AiAudio-BUyzhWGO.css", "assets/HighlightPreload-Celtsomc.js", "assets/HighlightPreload-Cpw1BqZo.css"]))) => i.map(i => d[i]);
var Le = Object.defineProperty,
  qe = Object.defineProperties;
var Me = Object.getOwnPropertyDescriptors;
var ge = Object.getOwnPropertySymbols;
var He = Object.prototype.hasOwnProperty,
  Ue = Object.prototype.propertyIsEnumerable;
var ye = (e, t, s) => t in e ? Le(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
  }) : e[t] = s,
  k = (e, t) => {
    for (var s in t || (t = {})) He.call(t, s) && ye(e, s, t[s]);
    if (ge)
      for (var s of ge(t)) Ue.call(t, s) && ye(e, s, t[s]);
    return e
  },
  O = (e, t) => qe(e, Me(t));
var J = (e, t, s) => new Promise((i, o) => {
  var l = g => {
      try {
        c(s.next(g))
      } catch (m) {
        o(m)
      }
    },
    d = g => {
      try {
        c(s.throw(g))
      } catch (m) {
        o(m)
      }
    },
    c = g => g.done ? i(g.value) : Promise.resolve(g.value).then(l, d);
  c((s = s.apply(e, t)).next())
});
import {
  _ as je,
  J as ze,
  al as b,
  an as Be,
  ao as Fe,
  l as _,
  ap as Ne,
  m as P,
  i as u,
  D as h,
  n as r,
  B as a,
  O as U,
  h as y,
  P as G,
  p as f,
  C as p,
  T as K,
  G as x,
  U as ve,
  E as $,
  H as Je,
  aq as Ge,
  ar as Ke,
  V as ee,
  ai as Ae,
  aj as We,
  as as Qe,
  at as be,
  au as Xe,
  av as Ye,
  ah as v,
  ak as Ze,
  x as Ce,
  ac as xe,
  r as V,
  aw as $e,
  ad as et,
  ae as tt,
  z as it
} from "./index-D53O_Npi.js";
import {
  a as st,
  s as ot,
  u as lt
} from "./useOriginalVideoRelation-BwrNyVOZ.js";
const at = "_box1_1eu85_14",
  rt = "_gray1_1eu85_17",
  nt = "_videobox_1eu85_22",
  dt = "_top1_1eu85_26",
  ut = "_top2_1eu85_30",
  ht = "_label2_1eu85_34",
  ct = "_add_1eu85_48",
  pt = "_icon_1eu85_59",
  _t = "_icon1_1eu85_69",
  ft = "_scroll_1eu85_105",
  mt = "_sort_1eu85_111",
  gt = "_sortin_1eu85_116",
  yt = "_noWrap_1eu85_124",
  vt = "_gray2_1eu85_128",
  At = "_pos_1eu85_134",
  bt = "_layer_1eu85_147",
  Ct = "_layerNarrow_1eu85_157",
  wt = "_layer2_1eu85_161",
  Vt = "_unmodal_1eu85_164",
  St = "_tit1_1eu85_170",
  Dt = "_tit2_1eu85_181",
  Rt = "_gap1_1eu85_185",
  Pt = "_gap2_1eu85_194",
  kt = "_gap4_1eu85_198",
  It = "_gap5_1eu85_202",
  Et = "_albumIcon_1eu85_225",
  Tt = "_btn1_1eu85_233",
  Ot = "_f12_1eu85_242",
  Lt = "_top40_1eu85_246",
  qt = "_checkbox_1eu85_250",
  Mt = "_switchCenter_1eu85_262",
  Ht = "_mainContainer_1eu85_268",
  Ut = "_mainContainerNarrow_1eu85_275",
  jt = "_leftPanel_1eu85_279",
  zt = "_audioListContainer_1eu85_288",
  Bt = {
    box1: at,
    gray1: rt,
    videobox: nt,
    top1: dt,
    top2: ut,
    label2: ht,
    add: ct,
    icon: pt,
    icon1: _t,
    switch: "_switch_1eu85_74",
    scroll: ft,
    sort: mt,
    sortin: gt,
    noWrap: yt,
    gray2: vt,
    pos: At,
    layer: bt,
    layerNarrow: Ct,
    layer2: wt,
    unmodal: Vt,
    tit1: St,
    tit2: Dt,
    gap1: Rt,
    gap2: Pt,
    gap4: kt,
    gap5: It,
    albumIcon: Et,
    btn1: Tt,
    f12: Ot,
    top40: Lt,
    checkbox: qt,
    switchCenter: Mt,
    mainContainer: Ht,
    mainContainerNarrow: Ut,
    leftPanel: jt,
    audioListContainer: zt
  },
  Ft = {
    directives: {
      onClickOutside: Fe
    },
    components: {
      UploadSrt: b(() => v(() => import("./UploadSrt-CZC5WYmW.js"), __vite__mapDeps([0, 1, 2, 3]))),
      AudioPay: b(() => v(() => import("./AudioPay-BLXNgiK2.js"), __vite__mapDeps([4, 1, 2, 5]))),
      VideoUpload: b(() => v(() => import("./VideoUpload-B8NiZRzb.js"), __vite__mapDeps([6, 1, 2, 7]))),
      VideoSort: b(() => v(() => import("./Sort-DxNkHIdo.js"), __vite__mapDeps([8, 1, 2, 9]))),
      VideoEdit: b(() => v(() => import("./VideoEdit-rZdHwyDj.js"), __vite__mapDeps([10, 1, 2, 11]))),
      Publisher: b(() => v(() => import("./index-D53O_Npi.js").then(e => e.aS), __vite__mapDeps([1, 2]))),
      CoCreation: b(() => v(() => import("./CoCreation-CSz2-tyt.js"), __vite__mapDeps([12, 1, 2, 13]))),
      VideoScreenshot: Be,
      HeaderComment: b(() => v(() => import("./HeaderComment-BVhDr6An.js"), __vite__mapDeps([14, 1, 2, 15]))),
      Success: b(() => v(() => import("./Success-DG9IWXTo.js"), __vite__mapDeps([16, 1, 2, 17]))),
      AutoState: b(() => v(() => import("./AutoState-fpP-UYEv.js"), __vite__mapDeps([18, 1, 2, 19]))),
      Type: b(() => v(() => import("./Type-C9zyx6ES.js"), __vite__mapDeps([20, 1, 2, 21]))),
      Title: b(() => v(() => import("./Title-DRDcPezD.js"), __vite__mapDeps([22, 1, 2, 23]))),
      AudioAlbum: b(() => v(() => import("./AudioAlbum-CAsLMWuj.js"), __vite__mapDeps([24, 1, 2, 25]))),
      AudioCover: b(() => v(() => import("./AudioCover-CAnkbMlT.js"), __vite__mapDeps([26, 1, 2, 27]))),
      VideoHighlightEntry: b(() => v(() => import("./VideoHighlightEntry-WtZobEBH.js"), __vite__mapDeps([28, 1, 2, 29]))),
      AddRss: b(() => v(() => import("./AddRss-DlAuLy5X.js"), __vite__mapDeps([30, 1, 2, 12, 13, 31]))),
      CheckAudioAuth: b(() => v(() => import("./CheckAudioAuth-C5NZAHgE.js"), __vite__mapDeps([32, 1, 2, 33]))),
      AudioDetail: b(() => v(() => import("./AudioDetail-oezRAYUs.js"), __vite__mapDeps([34, 1, 2, 35]))),
      AudioAlbumHeader: b(() => v(() => import("./AudioAlbumHeader-DVQWPk79.js"), __vite__mapDeps([36, 1, 2, 37]))),
      OriginalVideoRelation: b(() => v(() => import("./OriginalVideoRelation-CHEi5l1x.js"), __vite__mapDeps([38, 1, 2, 39]))),
      SelfDeclaration: b(() => v(() => import("./index-D53O_Npi.js").then(e => e.aQ), __vite__mapDeps([1, 2]))),
      Action: b(() => v(() => import("./index-D53O_Npi.js").then(e => e.aO), __vite__mapDeps([1, 2]))),
      AudioAction: b(() => v(() => import("./AudioAction-Bnxg4L_j.js"), __vite__mapDeps([40, 1, 2, 41]))),
      Rss: b(() => v(() => import("./Rss-B1vvhnEu.js"), __vite__mapDeps([42, 1, 2, 43]))),
      AiAudio: b(() => v(() => import("./AiAudio-ChKonluW.js"), __vite__mapDeps([44, 1, 2, 45]))),
      HighlightPreload: b(() => v(() => import("./HighlightPreload-Celtsomc.js"), __vite__mapDeps([46, 1, 2, 47])))
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
      } = Ce(), {
        isVideo: i,
        isAudio: o,
        isAudioEdit: l,
        isAudioUpload: d,
        isEdit: c,
        entry: g,
        isRss: m,
        isRssAll: S,
        rss_url: E,
        guid: A,
        cluster_id: F,
        ai: te,
        isAi: ie,
        aiResult: se
      } = xe(), I = lt(), j = Ce().proxy, R = j.$route.query.oid, z = V(["0", "1", "2", "3"]), C = $e(j), W = et(), H = tt(C.videoScroll, j, z, R), Q = V(!0), X = V(!1), oe = V(!0), L = V(""), q = V(!1), T = V({
        src: ""
      }), le = V(!0), Y = V(""), B = V(""), Z = V(), ae = V(!1), re = V(!1), ne = V(!1);
      it({
        title: `${o.value?"音频":"视频"}发布`
      });
      const de = D => {
          Y.value = D
        },
        ue = ({
          src: D,
          pid: w
        }) => {
          T.value.src = D, T.value.pid = w
        },
        he = D => {
          X.value = D, D && (Q.value = !0)
        },
        N = V(""),
        n = V(),
        ce = V(!0),
        M = V(!0),
        we = D => {
          n.value = D
        },
        pe = V(!1),
        Ve = D => {
          var w;
          pe.value = (w = D == null ? void 0 : D.enabled) != null ? w : !1
        },
        Se = () => {
          m.value ? j.$http.get("/ajax/multimedia/rss_publisher_config", {
            params: {
              rss_url: E.value,
              guid: A.value
            }
          }).then(({
            data: D
          }) => {
            var fe, me;
            const w = D.data.result;
            A.value && w.title ? (M.value = w.auto_publish.enable, Z.value = w.auto_publish, F.value = w.cluster_idStr, N.value = w.is_new_cluster, W.title.value = w.title, L.value = w.desc, T.value.src = (fe = w.cover) == null ? void 0 : fe.bmiddle_pic, T.value.pid = (me = w.cover) == null ? void 0 : me.pic_id, B.value = w.content ? w.content : H.defaultStatus.value) : w.cluster_idStr && (F.value = w.cluster_idStr, N.value = w.is_new_cluster, B.value = w.content ? w.content : H.defaultStatus.value)
          }) : o.value && (B.value = H.defaultStatus.value)
        },
        _e = V(),
        De = D => {
          _e.value = D
        },
        Re = D => {
          M.value = D, M.value || s.$_w_dialog({
            type: "confirm",
            message: "确认关闭「自动发布」么？关闭后， 新发布的节目需要手动发布。",
            btnCancel: "不关闭",
            btnConfirm: "确认关闭",
            cancel: () => {
              M.value = !0
            }
          })
        },
        {
          videoScroll: Pe,
          checkAlbumRef: ke,
          addAlbumInput: Ie
        } = C,
        {
          addTagInput: Ee,
          videoSort: Te
        } = H,
        Oe = V(null);
      return O(k(k(k({
        auto_publish: M,
        changeAuto: Re,
        publisherContent: B,
        is_new_cluster: N,
        cluster_id: F,
        isRss: m,
        isRssAll: S,
        isVideo: i,
        isAudio: o,
        isAudioEdit: l,
        isAudioUpload: d,
        isEdit: c,
        entry: g,
        checkAudio: oe,
        umVideoChange: he,
        changeCoCreation: we,
        showCoCreation: ce,
        coCreationState: n,
        highlightPreloadState: pe,
        changeHighlightPreload: Ve,
        copyright_video_switch: Q,
        um_video: X,
        supported_video_type: z,
        AudioDetailContent: L,
        AudioDetailContentState: q,
        AudioCoverSrc: T,
        AudioAuth: le,
        AudioAlbum: Y,
        rss_url: E,
        guid: A,
        ai: te,
        isAi: ie,
        aiResult: se,
        AudioAuto: Z,
        handleRssInit: Se,
        changeAudioAlbum: de,
        changeAudioCoverSrc: ue,
        changeAudioPay: De,
        AudioPayConfig: _e
      }, C), W), H), {
        videoScroll: Pe,
        checkAlbumRef: ke,
        addAlbumInput: Ie,
        addTagInput: Ee,
        videoSort: Te,
        cutUpload: ae,
        isPanorama: ne,
        hasEnteredPublishFlow: re,
        containerRef: Oe,
        enabled: I.enabled,
        url: I.url,
        status: I.status,
        errorText: I.errorText,
        originalVideoRelationVideoInfo: I.videoInfo,
        originalVideoRelationMediaId: I.mediaId,
        updateUrl: I.updateUrl,
        relate: I.relate,
        clear: I.clear,
        restoreOriginalVideoRelation: I.restore
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
    computed: O(k({}, ze(["config"])), {
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
        return ot({
          isAudio: this.isAudio,
          isPanorama: this.isPanorama,
          videoAssociateInfo: this.videoAssociateInfo
        })
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
          Ze.close()
        } catch (t) {}
      },
      isRss(e) {
        e && this.handleRssInit()
      },
      showOriginalVideoRelation(e) {
        e || this.clear()
      },
      enabled(e) {
        e || this.clear()
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
        return J(this, null, function*() {
          try {
            const {
              mount: e
            } = yield v(() => J(this, null, function*() {
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
        return Ye(e)
      },
      findCurrentVideoHighlightBlock(e = "") {
        return be(e, this.videoHighlightContent) || Xe(e, this.videoHighlightLineCount)
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
        const t = be(e, this.videoHighlightContent);
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
              c = Math.min(o.startIndex, d.length);
            d.splice(c, 0, ...s.split(`
`)), this.publisherContent = d.join(`
`)
          } else this.publisherContent = Qe(l, s);
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
          return s === 0 && (i = 11), O(k({}, t), {
            source: i
          })
        }), this.screenshot && this.screenshot.url || (this.screenshot = this.screenArray[0] || {
          url: "",
          pid: ""
        }), !0)
      },
      extractPreupdateScreenshot(e, t) {
        var g;
        if (!e) return null;
        const s = e[t] || e;
        if (((g = s == null ? void 0 : s.screenshot) == null ? void 0 : g.state) !== 1) return null;
        const i = s.screenshot;
        let o = null;
        if (i.file_detail) try {
          o = JSON.parse(i.file_detail)
        } catch (m) {
          o = null
        }
        o || (o = i.file_detail_value);
        const l = Array.isArray(o == null ? void 0 : o.files) ? o.files : [];
        if (l.length) return l.map(m => O(k(k({}, i), m), {
          url: m.url || (m.pid ? ee(m.pid) : ""),
          pid: m.pid || m.file_id || "",
          file_id: m.file_id || i.file_id || ""
        })).filter(m => m.url);
        const d = i.file_id || "",
          c = i.url || (d ? ee(d) : "");
        return c ? [O(k({}, i), {
          url: c,
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
              return i === 0 && (o = 11), O(k({}, s), {
                source: o
              })
            }) || [], this.screenshot && this.screenshot.url || !(this.screenshot && this.screenshot.url) && (this.screenshot = this.screenArray[0] ? this.screenArray[0] : {
              url: "",
              pid: ""
            });
            break;
          case "success":
            We({
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
        this.videoEdit = !1, e[0] === 0 ? this.hide() : e[0] === "select" ? this.screenshot = this.screenArray[e[1] - 1] : e[0] === "change" && (this.screenshot = O(k({}, e[1].url), {
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
        var l, d, c, g, m, S, E;
        const e = [];
        this.albumList.forEach(A => {
          A.checked && e.push(A.id)
        });
        const t = A => A.split("/").slice(-1)[0].split(".")[0],
          s = {
            titles: [{
              title: this.title,
              default: "true"
            }],
            covers: [k({
              url: this.screenshot.url,
              pid: this.screenshot.pid || this.screenshot.file_id,
              source: (l = this.screenshot.source) != null ? l : ""
            }, Ae((d = this == null ? void 0 : this.screenshot) != null && d.pid ? this.screenshot.pid : t((c = this.screenshot) == null ? void 0 : c.url)))],
            free_duration: {
              start: 0,
              end: 30
            }
          };
        (g = this.coCreationState) != null && g.coCreation && (s.cooperate_video = this.coCreationState.selectArr.map(A => ({
          uid: A.id,
          role: A.role
        })), (S = (m = this.coCreateConfig) == null ? void 0 : m.permanent_host) != null && S.length ? s.permanent_host = this.coCreateConfig.permanent_host.map(A => A.uid) : s.permanent_host = []), this.um_video && (s.um_video_switch = this.um_video === "um_video", s.is_vip_paid = this.um_video === "vplus_video"), this.material_permission && this.entry !== "edit" && (s.copyright_video_switch = this.copyright_video_switch), (this.entry === "edit" || this.isAudioEdit) && this.replaceVideo === !0 && (s.edit_object_id = this.videoDetails.media_id);
        const i = this.category ? "homemade" : "contribution";
        if (this.isAudio) {
          if (this.AudioCoverSrc.src && (s.covers = [k({
              url: this.AudioCoverSrc.src,
              pid: this.AudioCoverSrc.pid
            }, Ae(this.AudioCoverSrc.pid))]), this.isRssAll) s.rss = {
            rss_url: this.rss_url,
            cluster_id: this.cluster_id
          };
          else if (this.isRss) s.rss = {
            rss_url: this.rss_url,
            guid: this.guid
          }, this.AudioAuto && (s.rss.auto_publish = this.auto_publish), this.AudioAuto.show_toast && (s.rss.show_toast = !0);
          else {
            const A = this.videoDetails.media_id ? this.videoDetails.media_id : this.oid.split(":")[1];
            s.media_id = A, s.fid = `2373717:${A}`
          }
          s.type = "audio", this.AudioAlbum && (s.playlist = {
            playlist_audio: !0,
            album_ids: this.AudioAlbum.toString()
          }), this.AudioDetailContent && (s.desc = this.AudioDetailContent), this.um_video === "podcast_audio_pay" && (s.free_duration.end = this.AudioPayConfig.duration, s.price = this.AudioPayConfig.price, s.is_vip_paid = !0)
        } else this.isVideo ? (s.type = "video", s.media_id = this.videoDetails.media_id) : i === "homemade" && (s.homemade_changed = 1);
        this.horizontalCover && s.covers.push({
          type: 1,
          pid: this.horizontalCover.pid,
          source: 1
        }), s.resource = {
          video_down: this.checkAllowDownload ? 1 : 0
        }, this.showAllowClip && (s.resource.allow_clip = +this.allowClip), st({
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
          optional: this.selectedDeclarationOptional.map(A => ({
            id: A
          }))
        }, (E = this.currentDeclarationRequiredOption) != null && E.textfield && this.declarationReprintSource.trim() && (s.resource.statement.required.textfield_content = this.declarationReprintSource.trim())), this.highlightPreloadState && (s.resource.allow_highlight_preheat = 1), s[i] = {
          channel_ids: [this.channel_ids],
          type: this.type
        }, this.show_approval_reprint && (s.approval_reprint = this.forward_strategy ? "1" : "0"), this.follower_watch_entire && (s.follower_watch_entire = {
          enable: 0
        }), this.checkAlbum && s.type !== "audio" && (s.playlist = {
          playlist_video: !0,
          album_ids: e.toString()
        });
        const o = this.getVideoSpotlights();
        return s.type === "video" && o.length && (s.spotlight_visible = 1, s.spotlights = o), s
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
        return J(this, null, function*() {
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
            if (d.editable) this.videoInfo = d, this.videoDetails.media_id = (o = d.oid) == null ? void 0 : o.replace("1034:", ""), this.videoInfo.height > this.videoInfo.width && (this.horizontal = !0), this.videoInfo && (this.initEditVideoInfo(this.videoInfo), this.restoreOriginalVideoRelation(O(k(k({}, l), this.videoInfo), {
              associateVideo: s.data.associateVideo
            }))), d.pay_audio && (this.payInfo = d.pay_audio);
            else {
              const c = d.reject_edit_reason || d.non_editable_reason || `抱歉，当前${this.isAudio?"音频":"视频"}无法编辑`;
              this.hasnav ? this.$_w_toast({
                type: "warn",
                message: c,
                action: () => {
                  this.$router.push({
                    name: "videoManage"
                  })
                }
              }) : this.$_w_toast({
                type: "warn",
                message: c,
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
        }, this.isAudio && (this.AudioCoverSrc.src = e.covers[0].url, this.AudioCoverSrc.pid = e.covers[0].url.match(/\/\/[^\n\r/\u2028\u2029]*\/.*\/(.*)\..*/)[1], this.AudioDetailContent = e.audio_desc, e.current_playlists && e.current_playlists.length > 0 && (this.cluster_id = e.current_playlists.map(c => c.id).join(","))), e.current_playlists && e.current_playlists.length > 0 && (this.albumIds = e.current_playlists.map(c => c.id), this.checkAlbum = !0);
        const t = e != null && e.homemade_info && ((d = Object.keys(e == null ? void 0 : e.homemade_info)) != null && d.length) ? e.homemade_info : e == null ? void 0 : e.contribution_info,
          s = t == null ? void 0 : t.first_level_channels,
          i = t == null ? void 0 : t.second_level_channels;
        let o = 0,
          l = 0;
        s && s[0] && (this.checkExposure = !0, (this.category ? this.category : this.channelList).forEach((g, m) => {
          g.channel_id === s[0].id && (o = m, g.sub_channels && g.sub_channels.length > 0 && i && i[0] && g.sub_channels.forEach((S, E) => {
            S.sub_channel_id === i[0].id && (l = E, this.modifyChannel("main", o), this.modifyChannel("sub", l))
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
        var g, m;
        if ((this.entry === "edit" || this.isAudioEdit) && this.replaceVideo) return;
        const t = S => {
            if (!S || typeof S != "string") return S;
            try {
              return JSON.parse(S)
            } catch (E) {
              return S
            }
          },
          s = t(e == null ? void 0 : e.resource),
          i = t(e == null ? void 0 : e.resource_info),
          o = t((m = (g = e == null ? void 0 : e.covers) == null ? void 0 : g[0]) == null ? void 0 : m.resource),
          l = (e == null ? void 0 : e.statement) || (s == null ? void 0 : s.statement) || (i == null ? void 0 : i.statement) || (o == null ? void 0 : o.statement),
          d = (l == null ? void 0 : l.required) || (l == null ? void 0 : l.user_requiredItem),
          c = (l == null ? void 0 : l.optional) || (l == null ? void 0 : l.user_optionalItems);
        if (!l) {
          this.selectedDeclarationRequired = "", this.selectedDeclarationOptional = [], this.declarationReprintSource = "";
          return
        }
        this.selectedDeclarationRequired = (d == null ? void 0 : d.id) || "", this.selectedDeclarationOptional = Array.isArray(c) ? c.map(S => S == null ? void 0 : S.id).filter(Boolean) : [], this.declarationReprintSource = (d == null ? void 0 : d.textfield_content) || ""
      },
      getAIClipInfo() {
        const {
          media_id: e,
          oid: t,
          mid: s,
          type: i
        } = this.$route.query;
        this.$http.get("/ajax/multimedia/getAIClipInfo", {
          params: {
            media_id: e,
            oid: t,
            mid: s,
            schedule: +(i === "schedule")
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
          t = [e == null ? void 0 : e.$el, (i = (s = e == null ? void 0 : e.$refs) == null ? void 0 : s.form) == null ? void 0 : i.$el, (d = (l = (o = e == null ? void 0 : e.$refs) == null ? void 0 : o.form) == null ? void 0 : l.$refs) == null ? void 0 : d.form].find(c => typeof(c == null ? void 0 : c.scrollIntoView) == "function");
        t && t.scrollIntoView({
          behavior: "smooth"
        })
      },
      getCutInfo() {
        const {
          expires: e,
          uuid: t,
          signature: s,
          media_id: i
        } = this.$route.query;
        this.$http.get("/ajax/multimedia/getCutInfo", {
          params: {
            expires: e,
            uuid: t,
            signature: s,
            media_id: i
          }
        }).then(o => {
          var l, d, c;
          o.data.ok > 0 && ((l = o.data.data) != null && l.cover) && (this.cutUpload = !0, this.videoDetails.media_id = this.$route.query.media_id, this.screenshot.url = (d = o.data.data) == null ? void 0 : d.cover, this.title = (c = o.data.data) == null ? void 0 : c.title, this.showMoreDetail = !0, this.uploadSuccess = !0)
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
              url: ee(s),
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
      return J(this, null, function*() {
        var l, d;
        this.isAudio && this.AudioAuth && this.loadGlowCutEmbed(), this.$http.get("/ajax/multimedia/getapproval").then(({
          data: c
        }) => {
          c.ok && (this.show_approval_reprint = c.showApprovalRepeat)
        }), yield this.channelListInit(), this.handleRssInit();
        const {
          oid: e,
          media_id: t,
          type: s,
          mid: i,
          preupdate_id: o
        } = this.$route.query;
        if (o) this.getPreUpdateData();
        else if (s === "cut") this.publishType = s, this.getCutInfo();
        else if (s === "wedance") {
          const {
            media_id: c,
            pid: g,
            horizontal: m
          } = this.$route.query;
          if (g) {
            const S = ee(g);
            this.screenshot.url = S, this.screenshot.pid = g, m !== void 0 && (this.horizontal = Number(m) === 0)
          }
          this.videoDetails.media_id = c, this.showMoreDetail = !0, this.uploadSuccess = !0
        } else this.isEdit && e ? this.getVideoEditInfo(e) : this.isAudioEdit && e ? this.getVideoEditInfo(e, !0) : this.isAudio && this.isAi && this.aiPublish ? this.getAIAudioInfo() : this.isAudioUpload && (this.videoDetails = {
          media_id: t
        }, this.showMoreDetail = !0, this.uploadSuccess = !0);
        e && t && i && this.getAIClipInfo(), this.AudioAuth = (l = this.config.flags) == null ? void 0 : l.audio_auth, this.actionLog({
          uicode: "30000840",
          actType: "7635",
          ext: `is_authorized:${(d=this.config.flags)==null?void 0:d.audio_auth}`
        })
      })
    }
  },
  Nt = {
    key: 1
  },
  Jt = {
    key: 0
  },
  Gt = {
    class: "wbpro-form"
  },
  Kt = ["value"],
  Wt = ["textContent"],
  Qt = {
    key: 1,
    style: {
      height: "22px"
    }
  },
  Xt = {
    style: {
      height: "22px"
    }
  },
  Yt = {
    style: {
      position: "relative"
    }
  };

function Zt(e, t, s, i, o, l) {
  const d = _("Success"),
    c = _("CheckAudioAuth"),
    g = _("AiAudio"),
    m = _("HeaderComment"),
    S = _("AudioAlbumHeader"),
    E = _("VideoUpload"),
    A = _("woo-divider"),
    F = _("AddRss"),
    te = _("AutoState"),
    ie = _("Type"),
    se = _("SelfDeclaration"),
    I = _("Title"),
    j = _("VideoScreenshot"),
    R = _("woo-box-item"),
    z = _("woo-fonticon"),
    C = _("woo-box"),
    W = _("VideoSort"),
    H = _("HighlightPreload"),
    Q = _("AudioCover"),
    X = _("AudioDetail"),
    oe = _("AudioAlbum"),
    L = _("Action"),
    q = _("woo-switch"),
    T = _("woo-checkbox"),
    le = _("CoCreation"),
    Y = _("OriginalVideoRelation"),
    B = _("VideoHighlightEntry"),
    Z = _("Rss"),
    ae = _("AudioPay"),
    re = _("Publisher"),
    ne = _("woo-button"),
    de = _("VideoEdit"),
    ue = _("AudioAction"),
    he = _("UploadSrt"),
    N = Ne("on-click-outside");
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
  }, null, 8, ["showToast", "toastType", "videoEdit", "hasnav"]), U(f("div", {
    class: r(["wbpro-layer", [e.$style.layer, !l.hasnav && e.$style.layer2, !l.showAudioList && e.$style.layerNarrow]])
  }, [!i.AudioAuth && i.isAudio ? (u(), y(c, {
    key: 0
  })) : h("", !0), i.AudioAuth || !i.isAudio ? (u(), y(m, {
    key: 1,
    showMoreDetail: o.autoPublish || l.showMoreDetail,
    videoDescInfo: e.videoDescInfo,
    definition: o.definition
  }, {
    default: p(() => [!l.showMoreDetail && e.aiPublish && e.aiPublish.title ? (u(), y(g, {
      key: 0,
      aiPublish: e.aiPublish
    }, null, 8, ["aiPublish"])) : h("", !0)]),
    _: 1
  }, 8, ["showMoreDetail", "videoDescInfo", "definition"])) : h("", !0), i.isRssAll ? (u(), y(S, {
    key: 2
  })) : h("", !0), i.isAudio && i.AudioAuth || i.isVideo || i.isEdit ? (u(), P("div", {
    key: 3,
    ref: "videoScroll",
    class: r(["modal-scroll", e.$style.unmodal]),
    onTouchmovePassive: t[20] || (t[20] = K(() => {}, ["stop"]))
  }, [f("div", {
    class: r(e.$style.videobox)
  }, [f("div", {
    class: r(e.$style.top1)
  }, [!o.showToast && !i.isRss ? (u(), y(E, {
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
  }, null, 8, ["screenshot", "biz_type", "audioCanPay", "payInfo", "cutUpload", "maxFileSize", "isPrePublish", "hasSrt", "onVideoChange", "onUmVideo", "onUploadSrt"])) : h("", !0), U(a(A, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"]), [
    [G, o.autoPublish || l.showMoreDetail]
  ])], 2), i.isAudio && !l.showMoreDetail && !o.autoPublish ? (u(), y(F, {
    key: 0,
    coCreateConfig: e.coCreateConfig
  }, null, 8, ["coCreateConfig"])) : h("", !0), a(te, {
    hasnav: l.hasnav,
    autoPublish: o.autoPublish,
    onCancel: t[1] || (t[1] = n => o.autoPublish = !1)
  }, null, 8, ["hasnav", "autoPublish"]), U(f("div", null, [i.isVideo || i.isEdit ? (u(), y(ie, {
    key: 0,
    coCreationState: i.coCreationState,
    hideRepostOption: l.statementShow,
    onShowToast: l.showToastType,
    selectedType: o.type,
    onTypeChange: l.handleTypeChange
  }, null, 8, ["coCreationState", "hideRepostOption", "onShowToast", "selectedType", "onTypeChange"])) : h("", !0), !i.isAudio && l.statementShow ? (u(), P(x, {
    key: 1
  }, [a(se, {
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
  }, null, 8, ["title", "displayText", "requiredOptions", "optionalOptions", "defaultRequiredValue", "defaultOptionalValues", "requiredValue", "optionalValues", "reprintSource", "required", "onConfirm", "onInvalid"]), a(A, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])], 64)) : h("", !0), i.isRssAll ? h("", !0) : (u(), y(I, {
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
  }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "hasMediaId", "onEdit", "onChange"])) : h("", !0), f("div", null, [i.isRssAll ? h("", !0) : (u(), y(A, {
    key: 0,
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])), i.isAudio ? h("", !0) : (u(), P("div", Nt, [f("div", {
    class: r(e.$style.gap1)
  }, [f("div", null, [f("div", {
    class: r(e.$style.gap2)
  }, [f("div", {
    class: r(e.$style.tit1)
  }, " 分类 ", 2), U((u(), P("div", {
    class: r(e.$style.top1)
  }, [a(C, {
    align: "center",
    class: r(["wbpro-select wbpor-pos error", e.$style.sort]),
    onClick: t[3] || (t[3] = K(n => e.showChannel = !0, ["stop"]))
  }, {
    default: p(() => [a(R, {
      align: "center"
    }, {
      default: p(() => [ve($(e.channelText), 1)]),
      _: 1
    }), a(C, {
      align: "center",
      justify: "center",
      class: "opt"
    }, {
      default: p(() => [a(z, {
        value: "caretDown"
      })]),
      _: 1
    }), U(a(W, {
      ref: "videoSort",
      class: r(e.$style.sortin),
      list: e.category ? e.category : e.channelList,
      onChange: e.modifyChannel
    }, null, 8, ["class", "list", "onChange"]), [
      [G, e.showChannel]
    ])]),
    _: 1
  }, 8, ["class"])], 2)), [
    [N, l.closeChannel]
  ])], 2)])], 2)])), a(H, {
    duration: o.duration,
    onChange: i.changeHighlightPreload
  }, null, 8, ["duration", "onChange"]), i.isAudio && !i.isRssAll ? (u(), y(Q, {
    key: 2,
    title: "",
    src: i.AudioCoverSrc.src,
    curObj: {
      src: i.AudioCoverSrc.src
    },
    onChange: i.changeAudioCoverSrc
  }, null, 8, ["src", "curObj", "onChange"])) : h("", !0), i.isAudio && !i.isRssAll ? (u(), y(X, {
    key: 3,
    AudioDetailContent: i.AudioDetailContent,
    onInput: t[4] || (t[4] = n => i.AudioDetailContent = n),
    onState: t[5] || (t[5] = n => i.AudioDetailContentState = n)
  }, null, 8, ["AudioDetailContent"])) : h("", !0), i.isAudio && l.showMoreDetail ? (u(), y(oe, {
    key: 4,
    cluster_id: i.cluster_id,
    is_new_cluster: i.is_new_cluster,
    onChange: i.changeAudioAlbum
  }, null, 8, ["cluster_id", "is_new_cluster", "onChange"])) : h("", !0), i.isAudio ? h("", !0) : (u(), P("div", {
    key: 5,
    class: r(e.$style.gap1)
  }, [a(C, {
    align: "center",
    class: r(e.$style.switch)
  }, {
    default: p(() => [a(R, {
      align: "center"
    }, {
      default: p(() => [a(C, {
        align: "center"
      }, {
        default: p(() => [f("div", {
          class: r([e.$style.gray1, e.$style.tit1])
        }, " 合集 ", 2), a(L, {
          title: "微博合集",
          desc: ` 1、合集功能可以让你对自己的视频作品进行分类管理。
                            <br />2、发布视频时可以自己新建合集，也可以将视频加入到已创建的合集中。
                            <br />3、制作优秀的合集会被推荐到微博视频精选频道，让你获得更多的曝光和涨粉机会；视频被推荐的唯一标准是视频质量，不受粉丝量影响。`
        })]),
        _: 1
      })]),
      _: 1
    }), f("div", null, [a(q, {
      ref: "checkAlbumRef",
      modelValue: e.checkAlbum,
      "onUpdate:modelValue": t[6] || (t[6] = n => e.checkAlbum = n),
      size: .6875
    }, null, 8, ["modelValue"])])]),
    _: 1
  }, 8, ["class"]), e.checkAlbum ? (u(), P("div", Jt, [f("div", {
    class: r(e.$style.scroll)
  }, [(u(!0), P(x, null, Je(e.albumList, (n, ce) => (u(), y(C, {
    key: ce,
    align: "center",
    class: r(e.$style.top2)
  }, {
    default: p(() => [a(T, {
      modelValue: n.checked,
      "onUpdate:modelValue": M => n.checked = M,
      value: "check1",
      class: r(e.$style.label2),
      disabled: n.item_count >= 500,
      onClick: M => n.item_count >= 500 && l.albumsMore()
    }, null, 8, ["modelValue", "onUpdate:modelValue", "class", "disabled", "onClick"]), a(R, null, {
      default: p(() => [f("div", Gt, [a(C, {
        align: "center"
      }, {
        default: p(() => [f("span", {
          class: r(e.$style.albumIcon)
        }, null, 2), a(R, null, {
          default: p(() => [f("input", {
            type: "text",
            value: n.value + (n.checked ? `(更新至${n.item_count+1}集)` : `(共${n.item_count}集)`),
            disabled: "",
            onKeypress: t[7] || (t[7] = K(() => {}, ["stop"]))
          }, null, 40, Kt)]),
          _: 2
        }, 1024)]),
        _: 2
      }, 1024)])]),
      _: 2
    }, 1024)]),
    _: 2
  }, 1032, ["class"]))), 128)), e.checkAddAlbum ? (u(), y(C, {
    key: 0,
    align: "center",
    class: r(e.$style.top2)
  }, {
    default: p(() => [a(T, {
      modelValue: e.addAlbumObj.checked,
      "onUpdate:modelValue": t[8] || (t[8] = n => e.addAlbumObj.checked = n),
      value: "check2",
      class: r(e.$style.label2),
      disabled: e.addAlbumObj.disabled
    }, null, 8, ["modelValue", "class", "disabled"]), a(R, null, {
      default: p(() => [f("div", {
        class: r(["wbpro-form focus", {
          error: e.addAlbumObj.error
        }])
      }, [a(C, {
        align: "center"
      }, {
        default: p(() => [a(z, {
          value: "album",
          class: r(e.$style.icon1)
        }, null, 8, ["class"]), a(R, null, {
          default: p(() => [U(f("input", {
            ref: "addAlbumInput",
            "onUpdate:modelValue": t[9] || (t[9] = n => e.addAlbumObj.message = n),
            type: "text",
            onKeyup: t[10] || (t[10] = Ge((...n) => e.addAlbumEnter && e.addAlbumEnter(...n), ["enter"])),
            onBlur: t[11] || (t[11] = (...n) => e.addAlbumEnter && e.addAlbumEnter(...n)),
            onKeypress: t[12] || (t[12] = K(() => {}, ["stop"]))
          }, null, 544), [
            [Ke, e.addAlbumObj.message]
          ])]),
          _: 1
        }), e.addAlbumObj.error ? (u(), P("div", {
          key: 0,
          class: "num",
          textContent: $(`${e.addAlbumObj.number}/12`)
        }, null, 8, Wt)) : h("", !0)]),
        _: 1
      })], 2)]),
      _: 1
    })]),
    _: 1
  }, 8, ["class"])) : h("", !0)], 2), f("div", {
    class: r(e.$style.add)
  }, [a(z, {
    value: "add",
    class: r(e.$style.icon)
  }, null, 8, ["class"]), f("span", {
    onClick: t[13] || (t[13] = K((...n) => e.addAlbum && e.addAlbum(...n), ["stop"]))
  }, "新建合集")], 2)])) : h("", !0)], 2)), a(A, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"]), e.coCreateConfig.can_publish && !i.um_video && !i.isRssAll && !i.isEdit && !i.isAudioEdit && !o.payInfo && !i.isPanorama ? (u(), y(le, {
    key: 6,
    coCreateConfig: e.coCreateConfig,
    type: o.type === 1,
    visible: i.showCoCreation,
    timer: o.curTimer,
    showIcon: i.isAudio || i.isRss,
    onChange: i.changeCoCreation
  }, null, 8, ["coCreateConfig", "type", "visible", "timer", "showIcon", "onChange"])) : h("", !0), l.showOriginalVideoRelation ? (u(), y(Y, {
    key: 7,
    modelValue: i.enabled,
    "onUpdate:modelValue": t[14] || (t[14] = n => i.enabled = n),
    url: i.url,
    status: i.status,
    errorText: i.errorText,
    videoInfo: i.originalVideoRelationVideoInfo,
    "onUpdate:url": i.updateUrl,
    onRelate: i.relate,
    onClear: i.clear
  }, null, 8, ["modelValue", "url", "status", "errorText", "videoInfo", "onUpdate:url", "onRelate", "onClear"])) : h("", !0), i.entry !== "edit" && !i.isAudio && !i.isPanorama ? (u(), y(B, {
    key: o.localVideoSrc,
    disabled: o.uploadSuccess !== !0,
    videoSrc: o.localVideoSrc,
    duration: o.duration,
    unsupportedFormat: l.videoHighlightUnsupportedFormat,
    highlights: o.videoHighlights,
    onConfirm: l.handleVideoHighlightConfirm
  }, null, 8, ["disabled", "videoSrc", "duration", "unsupportedFormat", "highlights", "onConfirm"])) : h("", !0), i.isRss && !i.isRssAll && i.AudioAuto ? (u(), y(Z, {
    key: 9,
    styleType: "inAudio",
    showTip: i.AudioAuto.show_toast,
    auto: i.auto_publish,
    onChangeAuto: i.changeAuto
  }, null, 8, ["showTip", "auto", "onChangeAuto"])) : h("", !0), i.um_video === "podcast_audio_pay" || o.payInfo ? (u(), P(x, {
    key: 10
  }, [a(ae, {
    duration: o.duration,
    payInfo: o.payInfo,
    onChange: i.changeAudioPay
  }, null, 8, ["duration", "payInfo", "onChange"]), a(A, {
    "border-color": "var(--w-card-border)",
    class: r(e.$style.gap1)
  }, null, 8, ["class"])], 64)) : h("", !0), !i.isAudio && !i.isPanorama ? (u(), P("div", {
    key: 11,
    class: r([e.$style.tit1, e.$style.gap2])
  }, " 设置 ", 2)) : h("", !0), !i.isAudio && !i.isPanorama ? (u(), y(C, {
    key: 12,
    class: r(e.$style.gap4),
    items: 3,
    wrap: "wrap"
  }, {
    default: p(() => [e.material_permission && i.entry !== "edit" ? (u(), y(R, {
      key: 0,
      class: r(e.$style.gap5)
    }, {
      default: p(() => [a(C, {
        align: "center",
        class: r(e.$style.switch)
      }, {
        default: p(() => [a(R, {
          align: "center"
        }, {
          default: p(() => [a(C, {
            align: "center"
          }, {
            default: p(() => [f("div", {
              class: r([e.$style.gray1])
            }, " 版权视频 ", 2)]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(q, {
          modelValue: i.copyright_video_switch,
          "onUpdate:modelValue": t[15] || (t[15] = n => i.copyright_video_switch = n),
          disabled: i.um_video,
          size: .6875
        }, null, 8, ["modelValue", "disabled"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"])) : h("", !0), e.material_permission && i.entry !== "edit" ? (u(), P("div", Qt, [a(A, {
      "border-color": "var(--w-card-border)",
      direction: "y"
    })])) : h("", !0), e.showAllowDownload ? (u(), P(x, {
      key: 2
    }, [a(R, {
      class: r(e.$style.gap5)
    }, {
      default: p(() => [a(C, {
        align: "center",
        class: r(e.$style.switch)
      }, {
        default: p(() => [a(R, {
          align: "center"
        }, {
          default: p(() => [a(C, {
            align: "center"
          }, {
            default: p(() => [f("div", {
              class: r([e.$style.gray1])
            }, " 允许下载 ", 2), a(L, {
              title: "允许下载",
              desc: "是否允许他人下载该视频"
            })]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(q, {
          modelValue: e.checkAllowDownload,
          "onUpdate:modelValue": t[16] || (t[16] = n => e.checkAllowDownload = n),
          size: .6875
        }, null, 8, ["modelValue"])])]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 8, ["class"]), f("div", Xt, [a(A, {
      "border-color": "var(--w-card-border)",
      direction: "y"
    })])], 64)) : h("", !0), i.entry !== "edit" && o.show_approval_reprint ? (u(), y(R, {
      key: 3,
      class: r(e.$style.gap5)
    }, {
      default: p(() => [a(C, {
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: p(() => [a(C, {
          align: "center"
        }, {
          default: p(() => [f("div", {
            class: r([e.$style.gray1, e.$style.noWrap])
          }, " 允许他人划重点 ", 2), a(L, {
            title: "划重点说明",
            desc: "若您的微博为公开，并设置为允许划重点，其他用户可在您的视频中划出一个精彩的重点时刻并发微博，发布后将注明视频来源于您，同时产生的播放量会计入您的微博下。"
          })]),
          _: 1
        }), f("div", null, [a(q, {
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
      default: p(() => [a(C, {
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: p(() => [a(C, {
          align: "center"
        }, {
          default: p(() => [f("div", {
            class: r(e.$style.gray1)
          }, " 允许他人剪辑 ", 2), a(L, {
            style: {
              "line-height": "16px"
            },
            title: "他人剪辑说明",
            desc: "打开开关即允许创作者基于您的视频进行剪辑创作，剪辑作品会带有“查看完整视频”按钮，点击后跳转至您的原视频，可为你带来流量收益。"
          })]),
          _: 1
        }), f("div", null, [a(q, {
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
      default: p(() => [e.play_config && e.play_config.follower_watch_entire && o.duration > 180 ? (u(), y(C, {
        key: 0,
        align: "center",
        class: r([e.$style.switch])
      }, {
        default: p(() => [a(R, {
          align: "center"
        }, {
          default: p(() => [a(C, {
            align: "center"
          }, {
            default: p(() => [f("div", {
              class: r(e.$style.gray1)
            }, $(e.play_config.follower_watch_entire.title), 3), a(L, {
              title: e.play_config.follower_watch_entire.pop_up_window_title,
              desc: e.play_config.follower_watch_entire.pop_up_window_desc
            }, null, 8, ["title", "desc"])]),
            _: 1
          })]),
          _: 1
        }), f("div", null, [a(q, {
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
    [G, l.showMoreDetail]
  ])], 2)], 34)) : h("", !0), U(f("div", {
    class: r(e.$style.box1)
  }, [f("div", {
    class: r([e.$style.gray1, e.$style.tit1, o.formDisabled && e.$style.tit2])
  }, " 设置微博内容 ", 2), o.showToast ? h("", !0) : (u(), y(re, {
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
    [G, l.showMoreDetail && !i.isEdit && !i.isAudioEdit]
  ]), l.showMoreDetail && i.isAudio ? (u(), P("div", {
    key: 4,
    class: r(e.$style.top40)
  }, [a(T, {
    modelValue: i.checkAudio,
    "onUpdate:modelValue": t[21] || (t[21] = n => i.checkAudio = n),
    class: r(e.$style.checkbox)
  }, {
    default: p(() => [f("span", {
      class: r(e.$style.f12)
    }, " 确认并保证，上传/同步/链接作品的行为不侵犯第三方的合法权益，亦不违反与第三方所签订的对用户有约束力的法律文件的规定 ", 2)]),
    _: 1
  }, 8, ["modelValue", "class"])], 2)) : h("", !0), (i.isEdit || i.isAudioEdit) && l.showMoreDetail ? (u(), y(C, {
    key: 5,
    style: {
      "margin-top": "30px",
      position: "relative"
    },
    justify: "center"
  }, {
    default: p(() => [f("div", Yt, [a(ne, {
      disabled: l.channelDisabled,
      sort: "flat",
      kind: "primary",
      onClick: l.submitEditInfo
    }, {
      default: p(() => [ve($(l.sendDesc), 1)]),
      _: 1
    }, 8, ["disabled", "onClick"]), l.channelDisabled ? (u(), P("div", {
      key: 0,
      class: r(e.$style.btn1),
      onClick: t[22] || (t[22] = (...n) => l.disabledCheck && l.disabledCheck(...n))
    }, null, 2)) : h("", !0)])]),
    _: 1
  })) : h("", !0)], 2), [
    [G, !o.videoEdit && !o.showToast]
  ]), a(de, {
    ref: "videoEdit",
    edit: o.videoEdit,
    screenArray: o.screenArray,
    screenshot: o.screenshot.url,
    horizontal: o.horizontal,
    channel: !0,
    onChange: l.changeVideoEdit
  }, null, 8, ["edit", "screenArray", "screenshot", "horizontal", "onChange"]), l.showMoreDetail ? h("", !0) : (u(), y(ue, {
    key: 0
  })), o.srtRender && (i.isVideo || i.isEdit) ? (u(), y(he, {
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
const xt = {
    $style: Bt
  },
  ii = je(Ft, [
    ["render", Zt],
    ["__cssModules", xt]
  ]);
export {
  ii as
  default
};
