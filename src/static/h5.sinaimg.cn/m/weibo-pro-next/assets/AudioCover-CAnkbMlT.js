var B = (c, w, n) => new Promise(($, m) => {
  var d = l => {
      try {
        o(n.next(l))
      } catch (u) {
        m(u)
      }
    },
    y = l => {
      try {
        o(n.throw(l))
      } catch (u) {
        m(u)
      }
    },
    o = l => l.done ? $(l.value) : Promise.resolve(l.value).then(d, y);
  o((n = n.apply(c, w)).next())
});
import {
  _ as U,
  x as A,
  r as b,
  w as I,
  l as _,
  m as C,
  i as r,
  D as M,
  B as a,
  h as k,
  n as s,
  U as g,
  p as v,
  C as i,
  E as L,
  T as D,
  a5 as F,
  af as S
} from "./index-D53O_Npi.js";
const O = "_file_1k4ns_2",
  G = "_addbox_1k4ns_12",
  P = "_add_1k4ns_12",
  Q = "_pic_1k4ns_27",
  q = "_btnbox_1k4ns_34",
  H = "_btn_1k4ns_34",
  J = "_line_1k4ns_48",
  K = "_text_1k4ns_53",
  W = "_tit1_1k4ns_60",
  X = "_gap1_1k4ns_69",
  Y = "_gap2_1k4ns_72",
  Z = {
    file: O,
    addbox: G,
    add: P,
    pic: Q,
    btnbox: q,
    btn: H,
    line: J,
    text: K,
    tit1: W,
    gap1: X,
    gap2: Y
  },
  ee = ["accept"],
  h = "尺寸为1:1，支持10M以内png/gif/jpg图片，不低于500*500",
  te = {
    __name: "AudioCover",
    props: {
      label: {
        type: String,
        default: ""
      },
      accept: {
        default: ".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic"
      },
      use: {
        default: !1,
        type: Boolean
      },
      src: {
        default: "",
        type: String
      },
      title: {
        default: !1,
        type: Boolean
      },
      maxSize: {
        default: 10,
        type: Number
      }
    },
    emits: ["change"],
    setup(c, {
      emit: w
    }) {
      const n = c,
        $ = w,
        {
          proxy: m
        } = A(),
        d = b(!1),
        y = b(null),
        o = b({
          src: n.src
        }),
        l = b(null);
      I(() => n.src, e => {
        o.value.src = e
      });

      function u() {
        S(() => {
          l.value.click()
        })
      }

      function E() {
        $("change", o.value)
      }

      function z(e, t, f) {
        l.value.value = "", t && (o.value.src = t, f && (o.value.pid = f), E()), d.value = !1
      }

      function N() {
        d.value = !0, S(() => {
          y.value.setSrc(o.value.src, z)
        })
      }

      function R(e) {
        return B(this, null, function*() {
          const t = e.target.files[0];
          if (!t) return;
          const f = n.maxSize * 1024 * 1024;
          if (t.size > f) {
            m.$_w_toast({
              type: "error",
              message: `请上传${n.maxSize}M以下图片`
            });
            return
          }
          const p = URL.createObjectURL(t);
          d.value = !0, S(() => {
            y.value.setSrc(p, z)
          })
        })
      }
      return (e, t) => {
        const f = _("woo-fonticon"),
          p = _("woo-box"),
          x = _("woo-button"),
          j = _("woo-divider"),
          T = _("woo-picture"),
          V = _("woo-modal");
        return r(), C("div", null, [c.title ? (r(), C("div", {
          key: 0,
          class: s([e.$style.tit1, e.$style.gap2])
        }, t[1] || (t[1] = [g(" 封面"), v("span", null, "*", -1)]), 2)) : M("", !0), a(p, {
          align: "end",
          class: s([c.title && e.$style.gap2])
        }, {
          default: i(() => [v("input", {
            ref_key: "file",
            ref: l,
            type: "file",
            class: s(e.$style.file),
            accept: c.accept,
            onChange: R
          }, null, 42, ee), o.value.src ? (r(), k(T, {
            key: 1,
            src: o.value.src,
            alt: "等比图",
            class: s(e.$style.pic)
          }, {
            default: i(() => [a(p, {
              align: "center",
              justify: "between",
              class: s(e.$style.btnbox)
            }, {
              default: i(() => [a(x, {
                sort: "simple",
                kind: "default",
                class: s(e.$style.btn),
                onClick: u
              }, {
                default: i(() => t[2] || (t[2] = [g(" 上传 ")])),
                _: 1
              }, 8, ["class"]), v("div", {
                class: s(e.$style.line)
              }, [a(j, {
                direction: "y",
                "border-color": "var(--w-contrast)"
              })], 2), a(x, {
                sort: "simple",
                kind: "default",
                class: s(e.$style.btn),
                onClick: N
              }, {
                default: i(() => t[3] || (t[3] = [g(" 裁剪 ")])),
                _: 1
              }, 8, ["class"])]),
              _: 1
            }, 8, ["class"])]),
            _: 1
          }, 8, ["src", "class"])) : (r(), k(p, {
            key: 0,
            align: "center",
            justify: "center",
            class: s(e.$style.addbox),
            onClick: u
          }, {
            default: i(() => [a(f, {
              value: "add",
              class: s(e.$style.add)
            }, null, 8, ["class"])]),
            _: 1
          }, 8, ["class"])), a(p, {
            direction: "y",
            align: "start"
          }, {
            default: i(() => [c.use ? (r(), k(x, {
              key: 0,
              sort: "line",
              kind: "primary",
              size: "s",
              disabled: ""
            }, {
              default: i(() => t[4] || (t[4] = [g(" 使用合集封面 ")])),
              _: 1
            })) : (r(), C("div", {
              key: 1,
              class: s(e.$style.text)
            }, " 清晰美观的封面更容易被推荐 ", 2)), v("div", {
              class: s(e.$style.text)
            }, L(h), 2)]),
            _: 1
          }), a(V, {
            show: d.value,
            animation: "slide-bottom",
            onClick: t[0] || (t[0] = D(() => {}, ["stop"]))
          }, {
            default: i(() => [a(F, {
              ref_key: "cropper",
              ref: y,
              ratio: [1, 1],
              title: "编辑图片",
              needTips: !1,
              max: n.maxSize,
              opts: {
                watermark: 0
              },
              desc: h
            }, null, 8, ["max"])]),
            _: 1
          }, 8, ["show"])]),
          _: 1
        }, 8, ["class"]), c.title ? (r(), k(j, {
          key: 1,
          "border-color": "var(--w-card-border)",
          class: s(e.$style.gap1)
        }, null, 8, ["class"])) : M("", !0)])
      }
    }
  },
  se = {
    $style: Z
  },
  ne = U(te, [
    ["__cssModules", se]
  ]);
export {
  ne as
  default
};
