import {
  _ as Yt,
  r as u,
  y as Zt,
  x as te,
  b as c,
  w as ee,
  g as ne,
  l as $,
  m as d,
  i as a,
  B as y,
  h as mt,
  D as S,
  C as m,
  p as i,
  n,
  U as O,
  E as T,
  k as oe,
  aM as ie,
  G as v,
  O as pt,
  ar as ft,
  H as ht,
  af as vt
} from "./index-D53O_Npi.js";
const le = "_highlightEntry_1ddy7_2",
  se = "_gray1_1ddy7_9",
  ae = "_tit1_1ddy7_13",
  de = "_highlightButtonWrap_1ddy7_19",
  ue = "_highlightButton_1ddy7_19",
  re = "_highlightButtonDisabled_1ddy7_28",
  ce = "_gap1_1ddy7_33",
  ye = "_modal_1ddy7_37",
  me = "_body_1ddy7_45",
  pe = "_leftPanel_1ddy7_51",
  fe = "_player_1ddy7_55",
  he = "_playerDisabled_1ddy7_66",
  ve = "_commonPlayer_1ddy7_70",
  ge = "_disableOverlay_1ddy7_112",
  _e = "_disableIcon_1ddy7_126",
  be = "_toolBar_1ddy7_155",
  Be = "_addButton_1ddy7_164",
  $e = "_addButtonWrap_1ddy7_176",
  Te = "_addButtonDisabled_1ddy7_181",
  Ie = "_tooltip_1ddy7_186",
  Ee = "_entryTooltip_1ddy7_212",
  ke = "_confirmButton_1ddy7_238",
  Ce = "_cancelEditButton_1ddy7_239",
  we = "_confirmButtonDisabled_1ddy7_255",
  Se = "_editInputBox_1ddy7_266",
  De = "_editInputBoxFocus_1ddy7_279",
  Me = "_editInput_1ddy7_266",
  Ae = "_inputCount_1ddy7_297",
  He = "_toolHint_1ddy7_304",
  Le = "_rightPanel_1ddy7_310",
  Pe = "_emptyImage_1ddy7_320",
  Ve = "_emptyScreen_1ddy7_329",
  Ne = "_playIcon_1ddy7_352",
  xe = "_emptyCaption_1ddy7_372",
  Re = "_emptyText_1ddy7_403",
  Fe = "_listTitle_1ddy7_410",
  Ge = "_highlightList_1ddy7_418",
  Oe = "_highlightItem_1ddy7_440",
  We = "_highlightItemEditing_1ddy7_453",
  Ue = "_itemTime_1ddy7_468",
  ze = "_itemText_1ddy7_476",
  je = "_itemActions_1ddy7_487",
  qe = "_iconButton_1ddy7_499",
  Je = "_editIcon_1ddy7_509",
  Ke = "_deleteIcon_1ddy7_520",
  Qe = "_editTime_1ddy7_531",
  Xe = "_editTimeLong_1ddy7_542",
  Ye = "_editTimeInput_1ddy7_546",
  Ze = "_editTimeGap_1ddy7_576",
  tn = "_itemEditBox_1ddy7_580",
  en = "_itemEditBoxLong_1ddy7_599",
  nn = "_itemEditInput_1ddy7_603",
  on = "_itemEditCount_1ddy7_619",
  ln = "_textAction_1ddy7_634",
  sn = "_textActionDisabled_1ddy7_647",
  an = "_cancelTextAction_1ddy7_652",
  dn = "_footer_1ddy7_657",
  un = "_cancelButton_1ddy7_662",
  rn = "_doneButton_1ddy7_666",
  cn = {
    highlightEntry: le,
    switch: "_switch_1ddy7_6",
    gray1: se,
    tit1: ae,
    highlightButtonWrap: de,
    highlightButton: ue,
    highlightButtonDisabled: re,
    gap1: ce,
    modal: ye,
    body: me,
    leftPanel: pe,
    player: fe,
    playerDisabled: he,
    commonPlayer: ve,
    disableOverlay: ge,
    disableIcon: _e,
    toolBar: be,
    addButton: Be,
    addButtonWrap: $e,
    addButtonDisabled: Te,
    tooltip: Ie,
    entryTooltip: Ee,
    confirmButton: ke,
    cancelEditButton: Ce,
    confirmButtonDisabled: we,
    editInputBox: Se,
    editInputBoxFocus: De,
    editInput: Me,
    inputCount: Ae,
    toolHint: He,
    rightPanel: Le,
    emptyImage: Pe,
    emptyScreen: Ve,
    playIcon: Ne,
    emptyCaption: xe,
    emptyText: Re,
    listTitle: Fe,
    highlightList: Ge,
    highlightItem: Oe,
    highlightItemEditing: We,
    itemTime: Ue,
    itemText: ze,
    itemActions: je,
    iconButton: qe,
    editIcon: Je,
    deleteIcon: Ke,
    editTime: Qe,
    editTimeLong: Xe,
    editTimeInput: Ye,
    editTimeGap: Ze,
    itemEditBox: tn,
    itemEditBoxLong: en,
    itemEditInput: nn,
    itemEditCount: on,
    textAction: ln,
    textActionDisabled: sn,
    cancelTextAction: an,
    footer: dn,
    cancelButton: un,
    doneButton: rn
  },
  yn = ["disabled"],
  mn = ["aria-disabled"],
  pn = ["value", "onInput"],
  fn = {
    key: 0
  },
  hn = ["disabled", "onClick"],
  vn = ["onClick"],
  gn = ["onClick"],
  gt = "5秒内只能添加一个重点",
  _n = {
    __name: "VideoHighlightEntry",
    props: {
      disabled: {
        type: Boolean,
        default: !0
      },
      videoSrc: {
        type: String,
        default: ""
      },
      duration: {
        type: Number,
        default: 0
      },
      unsupportedFormat: {
        type: Boolean,
        default: !1
      },
      highlights: {
        type: Array,
        default: () => []
      }
    },
    emits: ["confirm"],
    setup(W, {
      emit: _t
    }) {
      const f = W,
        bt = _t,
        V = u(!1),
        s = u([]),
        I = u(0),
        D = u(!1),
        M = u(!1),
        _ = u(""),
        U = u(),
        z = u(!1),
        j = u(!1),
        A = u(),
        b = u(""),
        H = u([]),
        ot = u(),
        it = u("[]"),
        q = u(!1),
        Bt = Zt(),
        {
          proxy: $t
        } = te();
      let o = null,
        p = null,
        L = null,
        N = !1;

      function lt(t = 0, e = !1) {
        const l = Math.max(0, Math.floor(t)),
          P = Math.floor(l / 3600),
          C = Math.floor(l % 3600 / 60),
          F = l % 60;
        return e || P > 0 ? `${String(P).padStart(2,"0")}:${String(C).padStart(2,"0")}:${String(F).padStart(2,"0")}` : `${C}:${String(F).padStart(2,"0")}`
      }
      const E = c(() => f.duration || 900),
        g = c(() => E.value > 3600),
        Tt = c(() => lt(I.value, g.value)),
        It = c(() => f.highlights.length ? "编辑重点" : "给视频添加重点"),
        Et = c(() => ({
          controls: !0,
          inactivityTimeout: 0,
          muted: !1,
          preload: "meta",
          autoplay: !1,
          contextMenu: !1,
          controlBar: {
            children: ["progressControl", "playToggle", "currentTimeDisplay", "timeDivider", "durationDisplay", "customControlSpacer", "volumePanel"]
          },
          sources: [{
            src: f.videoSrc,
            type: /\.m3u8/i.test(f.videoSrc) ? "application/x-mpegURL" : "video/mp4"
          }],
          plugins: {
            highlightMarkers: {}
          }
        })),
        k = c(() => f.duration > 0 && f.duration < 10 ? "小于10s视频不支持添加重点" : f.unsupportedFormat ? "此视频格式暂不支持添加重点" : f.disabled ? "请等待视频上传完成" : ""),
        J = c(() => !!_.value.trim()),
        K = c(() => !!b.value.trim()),
        st = c(() => s.value.length > 0 || q.value),
        kt = c(() => ut(s.value) !== it.value),
        at = c(() => D.value && M.value),
        Ct = c(() => s.value.some(t => Math.abs(t.seconds - I.value) < 5)),
        B = c(() => s.value.length >= 50 ? "最多添加50个重点" : Ct.value ? gt : "");

      function wt(t = 0) {
        const e = Math.max(0, Math.floor(t));
        return g.value ? [String(Math.floor(e / 3600)).padStart(2, "0"), String(Math.floor(e % 3600 / 60)).padStart(2, "0"), String(e % 60).padStart(2, "0")] : [String(Math.floor(e / 60)).padStart(2, "0"), String(e % 60).padStart(2, "0")]
      }

      function St(t) {
        return g.value ? t === 1 : t === 0
      }

      function Dt(t) {
        return g.value && t === 0
      }

      function Mt(t, e) {
        const l = e.target.value.replace(/\D/g, "").slice(0, 2);
        e.target.value = l, H.value[t] = l
      }

      function At() {
        const t = H.value.map(e => Number(e) || 0);
        return g.value ? t[0] * 3600 + t[1] * 60 + t[2] : t[0] * 60 + t[1]
      }

      function dt(t) {
        Bt.show({
          type: "warn",
          message: t
        })
      }

      function Q(t) {
        const e = Array.isArray(t.value) ? t.value[0] : t.value;
        e == null || e.focus()
      }

      function Ht(t, e) {
        return s.value.some(l => l.id !== e && Math.abs(l.seconds - t) < 5)
      }

      function Lt(t = "") {
        const e = t.split(":").map(Number);
        return e.length === 3 ? e[0] * 3600 + e[1] * 60 + e[2] : e.length === 2 ? e[0] * 60 + e[1] : 0
      }

      function X() {
        s.value = [...s.value].sort((t, e) => t.seconds - e.seconds)
      }

      function ut(t = []) {
        return JSON.stringify(t.map(e => ({
          seconds: e.seconds,
          text: e.text
        })))
      }

      function Pt() {
        s.value = f.highlights.map((t, e) => {
          const l = Lt(t.time);
          return {
            id: `${e}-${t.time}-${t.text}`,
            seconds: l,
            time: t.time,
            position: Math.min(100, Math.max(0, l / E.value * 100)),
            text: t.text
          }
        }).sort((t, e) => t.seconds - e.seconds), it.value = ut(s.value), q.value = s.value.length > 0
      }

      function Vt() {
        if (k.value) {
          yt();
          return
        }
        Pt(), V.value = !0, I.value = 0
      }

      function Y() {
        var t;
        (t = o == null ? void 0 : o.pause) == null || t.call(o), V.value = !1, rt(), x(!1), R()
      }

      function rt() {
        o != null && o.off && (o.off("userinactive", tt), o.off("loadedmetadata", h), o.off("durationchange", h), o.off("timeupdate", h), o.off("seeked", h)), p = null, o = null
      }

      function Z() {
        if (!kt.value) {
          Y();
          return
        }
        $t.$_w_dialog({
          type: "confirm",
          title: "确认关闭？",
          message: "关闭之后将不可恢复",
          action: Y
        })
      }

      function Nt() {
        var t;
        N = typeof(o == null ? void 0 : o.paused) == "function" ? !o.paused() : !1, (t = o == null ? void 0 : o.pause) == null || t.call(o), D.value = !0, _.value = "", et(), vt(() => {
          Q(U)
        })
      }

      function xt() {
        if (B.value) {
          if (B.value === gt) return;
          ct(0);
          return
        }
        Nt()
      }

      function x(t = !0) {
        D.value = !1, M.value = !1, _.value = "", t ? Ft() : N = !1
      }

      function Rt() {
        J.value && (s.value.push({
          id: Date.now(),
          seconds: I.value,
          time: Tt.value,
          position: Math.min(100, Math.max(0, I.value / E.value * 100)),
          text: _.value.trim()
        }), X(), x())
      }

      function Ft() {
        var t, e, l;
        N && (N = !1, (l = (e = (t = o == null ? void 0 : o.play) == null ? void 0 : t.call(o)) == null ? void 0 : e.catch) == null || l.call(e, () => {}))
      }

      function Gt(t) {
        var e;
        o = t, p = (e = o.highlightMarkers) == null ? void 0 : e.call(o), p == null || p.setHighlights(s.value), o.on("userinactive", tt), o.on("loadedmetadata", h), o.on("durationchange", h), o.on("timeupdate", h), o.on("seeked", h), tt(), h()
      }

      function tt() {
        var t;
        (t = o == null ? void 0 : o.userActive) == null || t.call(o, !0)
      }
      ee(s, t => {
        t.length && (q.value = !0), p == null || p.setHighlights(t)
      }, {
        deep: !0
      });

      function h() {
        o != null && o.currentTime && (I.value = Math.min(E.value, Math.max(0, o.currentTime() || 0)))
      }

      function Ot(t) {
        x(), A.value = t.id, b.value = t.text, H.value = wt(t.seconds), vt(() => {
          Q(ot)
        })
      }

      function R() {
        A.value = void 0, b.value = "", H.value = []
      }

      function Wt(t) {
        if (!K.value) return;
        const e = At();
        if (e > E.value) {
          dt("已超出视频总时长");
          return
        }
        if (Ht(e, t.id)) {
          dt("5秒内只能添加一个重点");
          return
        }
        t.seconds = e, t.time = lt(e, g.value), t.position = Math.min(100, Math.max(0, e / E.value * 100)), t.text = b.value.trim(), X(), R()
      }

      function Ut(t) {
        s.value = s.value.filter(e => e.id !== t), A.value === t && R(), et()
      }

      function zt(t) {
        D.value && (t.preventDefault(), Q(U))
      }

      function jt() {
        st.value && (X(), bt("confirm", s.value.map(t => ({
          time: t.time,
          text: t.text
        }))), Y())
      }

      function ct(t = 1e3) {
        B.value && (nt(), L = setTimeout(() => {
          j.value = !0, L = null
        }, t))
      }

      function et() {
        nt(), j.value = !1
      }

      function nt() {
        L && (clearTimeout(L), L = null)
      }

      function yt() {
        k.value && (z.value = !0)
      }

      function qt() {
        z.value = !1
      }
      return ne(() => {
        nt(), p == null || p.dispose(), rt()
      }), (t, e) => {
        const l = $("woo-box"),
          P = $("woo-box-item"),
          C = $("woo-button"),
          F = $("woo-divider"),
          Jt = $("woo-fonticon"),
          Kt = $("woo-panel"),
          Qt = $("woo-modal");
        return a(), d("div", {
          class: n(t.$style.highlightEntry)
        }, [y(l, {
          align: "center",
          class: n(t.$style.switch)
        }, {
          default: m(() => [y(P, {
            align: "center"
          }, {
            default: m(() => [y(l, {
              align: "center"
            }, {
              default: m(() => [i("div", {
                class: n([t.$style.gray1, t.$style.tit1])
              }, " 划重点 ", 2)]),
              _: 1
            })]),
            _: 1
          }), i("div", {
            class: n(t.$style.highlightButtonWrap),
            onMouseenter: yt,
            onMouseleave: qt
          }, [y(C, {
            sort: "line",
            kind: "primary",
            size: "s",
            "aria-disabled": !!k.value,
            class: n([t.$style.highlightButton, k.value && t.$style.highlightButtonDisabled]),
            onClick: Vt
          }, {
            default: m(() => [O(T(It.value), 1)]),
            _: 1
          }, 8, ["aria-disabled", "class"]), z.value && k.value ? (a(), d("div", {
            key: 0,
            class: n(t.$style.entryTooltip)
          }, T(k.value), 3)) : S("", !0)], 34)]),
          _: 1
        }, 8, ["class"]), y(F, {
          "border-color": "var(--w-card-border)",
          class: n(t.$style.gap1)
        }, null, 8, ["class"]), V.value ? (a(), mt(Qt, {
          key: 0,
          show: V.value,
          animation: "pop",
          "lock-screen": "",
          onClose: Z
        }, {
          default: m(() => [i("div", {
            class: n(["wbpro-layer", t.$style.modal])
          }, [y(Kt, {
            border: "bottom"
          }, {
            default: m(() => [y(l, {
              class: "wbpro-layer-tit"
            }, {
              default: m(() => [y(P, {
                align: "center",
                class: "wbpro-layer-tit-text"
              }, {
                default: m(() => e[5] || (e[5] = [O(" 划重点 ")])),
                _: 1
              }), y(l, {
                align: "center",
                justify: "center",
                class: "wbpro-layer-tit-opt",
                onClick: Z
              }, {
                default: m(() => [y(Jt, {
                  value: "cross"
                })]),
                _: 1
              })]),
              _: 1
            })]),
            _: 1
          }), i("div", {
            class: n(t.$style.body)
          }, [i("div", {
            class: n(t.$style.leftPanel)
          }, [i("div", {
            class: n([t.$style.player, at.value && t.$style.playerDisabled]),
            onMousedown: zt
          }, [at.value ? (a(), d("div", {
            key: 0,
            class: n(t.$style.disableOverlay)
          }, [i("span", {
            class: n(t.$style.disableIcon)
          }, null, 2)], 2)) : S("", !0), W.videoSrc ? (a(), mt(oe(ie), {
            key: W.videoSrc,
            class: n(t.$style.commonPlayer),
            options: Et.value,
            "use-hotkeys": !1,
            onReady: Gt
          }, null, 8, ["class", "options"])) : S("", !0)], 34), i("div", {
            class: n(t.$style.toolBar)
          }, [D.value ? (a(), d(v, {
            key: 0
          }, [i("button", {
            type: "button",
            class: n([t.$style.confirmButton, !J.value && t.$style.confirmButtonDisabled]),
            disabled: !J.value,
            onClick: Rt
          }, " 确认 ", 10, yn), i("button", {
            type: "button",
            class: n(t.$style.cancelEditButton),
            onClick: x
          }, " 取消 ", 2), i("div", {
            class: n([t.$style.editInputBox, M.value && t.$style.editInputBoxFocus])
          }, [pt(i("input", {
            ref_key: "inputRef",
            ref: U,
            "onUpdate:modelValue": e[0] || (e[0] = r => _.value = r),
            class: n(t.$style.editInput),
            type: "text",
            maxlength: "15",
            placeholder: "请输入重点的名称",
            onFocus: e[1] || (e[1] = r => M.value = !0),
            onBlur: e[2] || (e[2] = r => M.value = !1)
          }, null, 34), [
            [ft, _.value]
          ]), i("span", {
            class: n(t.$style.inputCount)
          }, T(_.value.length) + "/15", 3)], 2)], 64)) : (a(), d(v, {
            key: 1
          }, [i("div", {
            class: n(t.$style.addButtonWrap),
            onMouseenter: e[3] || (e[3] = r => ct()),
            onMouseleave: et
          }, [i("button", {
            type: "button",
            "aria-disabled": !!B.value,
            class: n([t.$style.addButton, B.value && t.$style.addButtonDisabled]),
            onClick: xt
          }, " 添加重点 ", 10, mn), j.value && B.value ? (a(), d("div", {
            key: 0,
            class: n(t.$style.tooltip)
          }, T(B.value), 3)) : S("", !0)], 34), i("span", {
            class: n(t.$style.toolHint)
          }, "在合适的位置，给视频添加重点吧", 2)], 64))], 2)], 2), i("div", {
            class: n(t.$style.rightPanel)
          }, [s.value.length ? (a(), d(v, {
            key: 0
          }, [i("div", {
            class: n(t.$style.listTitle)
          }, " 重点列表 ", 2), i("div", {
            class: n(t.$style.highlightList)
          }, [(a(!0), d(v, null, ht(s.value, r => (a(), d("div", {
            key: r.id,
            class: n([t.$style.highlightItem, A.value === r.id && t.$style.highlightItemEditing])
          }, [A.value === r.id ? (a(), d(v, {
            key: 0
          }, [i("div", {
            class: n([t.$style.editTime, g.value && t.$style.editTimeLong])
          }, [(a(!0), d(v, null, ht(H.value, (w, G) => (a(), d(v, {
            key: G
          }, [i("input", {
            value: w,
            class: n(t.$style.editTimeInput),
            type: "text",
            inputmode: "numeric",
            maxlength: "2",
            onInput: Xt => Mt(G, Xt)
          }, null, 42, pn), St(G) ? (a(), d("i", fn, ":")) : Dt(G) ? (a(), d("i", {
            key: 1,
            class: n(t.$style.editTimeGap)
          }, null, 2)) : S("", !0)], 64))), 128))], 2), i("div", {
            class: n([t.$style.itemEditBox, g.value && t.$style.itemEditBoxLong])
          }, [pt(i("input", {
            ref_for: !0,
            ref_key: "listEditInputRef",
            ref: ot,
            "onUpdate:modelValue": e[4] || (e[4] = w => b.value = w),
            class: n(t.$style.itemEditInput),
            type: "text",
            maxlength: "15",
            placeholder: "请输入重点的名称"
          }, null, 2), [
            [ft, b.value]
          ]), i("span", {
            class: n(t.$style.itemEditCount)
          }, T(b.value.length) + "/15", 3)], 2), i("button", {
            type: "button",
            class: n([t.$style.textAction, !K.value && t.$style.textActionDisabled]),
            disabled: !K.value,
            onClick: w => Wt(r)
          }, " 确认 ", 10, hn), i("button", {
            type: "button",
            class: n([t.$style.textAction, t.$style.cancelTextAction]),
            onClick: R
          }, " 取消 ", 2)], 64)) : (a(), d(v, {
            key: 1
          }, [i("span", {
            class: n(t.$style.itemTime)
          }, T(r.time), 3), i("span", {
            class: n(t.$style.itemText)
          }, T(r.text), 3), i("div", {
            class: n(t.$style.itemActions)
          }, [i("button", {
            type: "button",
            "aria-label": "编辑重点",
            class: n([t.$style.iconButton, t.$style.editIcon]),
            onClick: w => Ot(r)
          }, null, 10, vn), i("button", {
            type: "button",
            "aria-label": "删除重点",
            class: n([t.$style.iconButton, t.$style.deleteIcon]),
            onClick: w => Ut(r.id)
          }, null, 10, gn)], 2)], 64))], 2))), 128))], 2)], 64)) : (a(), d(v, {
            key: 1
          }, [i("div", {
            class: n(t.$style.emptyImage)
          }, [i("div", {
            class: n(t.$style.emptyScreen)
          }, [i("span", {
            class: n(t.$style.playIcon)
          }, null, 2)], 2), i("div", {
            class: n(t.$style.emptyCaption)
          }, null, 2)], 2), i("div", {
            class: n(t.$style.emptyText)
          }, " 请先给视频添加重点 ", 2)], 64))], 2)], 2), y(l, {
            align: "center",
            justify: "center",
            class: n(t.$style.footer)
          }, {
            default: m(() => [y(C, {
              kind: "default",
              class: n(t.$style.cancelButton),
              onClick: Z
            }, {
              default: m(() => e[6] || (e[6] = [O(" 取消 ")])),
              _: 1
            }, 8, ["class"]), y(C, {
              sort: "flat",
              kind: "primary",
              disabled: !st.value,
              class: n(t.$style.doneButton),
              onClick: jt
            }, {
              default: m(() => e[7] || (e[7] = [O(" 完成 ")])),
              _: 1
            }, 8, ["disabled", "class"])]),
            _: 1
          }, 8, ["class"])], 2)]),
          _: 1
        }, 8, ["show"])) : S("", !0)], 2)
      }
    }
  },
  bn = {
    $style: cn
  },
  $n = Yt(_n, [
    ["__cssModules", bn]
  ]);
export {
  $n as
  default
};
