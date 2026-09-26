import {
  _ as p,
  aS as j,
  l as i,
  h,
  i as k,
  C as r,
  p as d,
  B as l,
  U as _,
  n as m,
  x as O,
  r as w,
  w as A
} from "./index-Xve1TSN5.js";
import B from "./AudioCover-CbJkwMFm.js";
const $ = "_layer_yjzsx_2",
  z = "_tit_yjzsx_5",
  I = "_top8_yjzsx_15",
  T = {
    layer: $,
    tit: z,
    top8: I
  },
  N = {
    components: {
      AudioCover: B,
      TextInput: j
    },
    props: {
      show: {
        default: !1,
        type: Boolean
      },
      editObj: {}
    },
    emits: ["close", "change"],
    setup(e, {
      emit: o,
      root: C
    }) {
      const {
        proxy: t
      } = O(), v = w(e.show), s = w(""), n = w(""), u = () => {
        s.value = "", n.value = "", v.value = !1, o("close")
      };
      return A(() => e.show, () => {
        var c, a;
        console.log(e.editObj), s.value = ((c = e == null ? void 0 : e.editObj) == null ? void 0 : c.name) || "", n.value = ((a = e == null ? void 0 : e.editObj) == null ? void 0 : a.cover) || "", v.value = e.show
      }), {
        close: u,
        cancel: () => {
          u()
        },
        coverChange: c => {
          n.value = c.src
        },
        confirm: () => {
          var c;
          console.log("confirm"), s.value ? n.value ? (c = e.editObj) != null && c.cluster_id ? t.$http.post("/ajax/multimedia/update_collection", {
            id: e.editObj.cluster_id,
            type: 3,
            name: s.value,
            cover: n.value
          }).then(a => {
            a.data && (console.log(a.data), o("change", {
              name: s.value,
              cover: n.value,
              type: "edit",
              id: a.data.data.cluster_id_str,
              cluster_id: a.data.data.cluster_id_str,
              index: e.editObj.index
            }), u())
          }) : t.$http.post("/ajax/multimedia/create_collection", {
            type: 3,
            name: s.value,
            cover: n.value
          }).then(a => {
            a.data && (o("change", {
              id: a.data.data.cluster_id_str,
              name: s.value,
              cover: n.value
            }), u())
          }) : t.$_w_toast({
            type: "warn",
            message: "请上传合集封面"
          }) : t.$_w_toast({
            type: "warn",
            message: "请输入合集名称"
          })
        },
        name: s,
        visible: v,
        cover: n
      }
    }
  },
  V = {
    class: "wbpro-layer"
  };

function L(e, o, C, t, v, s) {
  const n = i("woo-box-item"),
    u = i("woo-fonticon"),
    f = i("woo-box"),
    y = i("woo-panel"),
    b = i("TextInput"),
    c = i("AudioCover"),
    a = i("woo-button"),
    x = i("woo-modal");
  return k(), h(x, {
    show: t.visible,
    "lock-screen": "",
    onClose: t.close
  }, {
    default: r(() => [d("div", V, [l(y, {
      border: "bottom"
    }, {
      default: r(() => [l(f, {
        class: "wbpro-layer-tit"
      }, {
        default: r(() => [l(n, {
          align: "center",
          class: "wbpro-layer-tit-text"
        }, {
          default: r(() => o[1] || (o[1] = [_(" 合集信息 ")])),
          _: 1
        }), l(f, {
          align: "center",
          justify: "center",
          class: "wbpro-layer-tit-opt"
        }, {
          default: r(() => [l(u, {
            value: "cross",
            onClick: t.close
          }, null, 8, ["onClick"])]),
          _: 1
        })]),
        _: 1
      })]),
      _: 1
    }), d("div", {
      class: m(e.$style.layer)
    }, [d("div", {
      class: m(e.$style.tit)
    }, o[2] || (o[2] = [_(" 合集名称"), d("span", null, "*", -1)]), 2), d("div", {
      class: m(e.$style.top8)
    }, [l(b, {
      placeholder: "填写合集名称",
      maxOptionLen: 12,
      text: t.name,
      onChange: o[0] || (o[0] = g => t.name = g)
    }, null, 8, ["text"])], 2), d("div", {
      class: m(e.$style.tit)
    }, o[3] || (o[3] = [_(" 合集封面"), d("span", null, "*", -1)]), 2), l(c, {
      src: t.cover,
      class: m(e.$style.top8),
      onChange: t.coverChange
    }, null, 8, ["src", "class", "onChange"])], 2), l(f, {
      justify: "center",
      class: "wbpro-layer-btn"
    }, {
      default: r(() => [l(a, {
        sort: "flat",
        kind: "default",
        class: "wbpro-layer-btn-item",
        onClick: t.cancel
      }, {
        default: r(() => o[4] || (o[4] = [_(" 取消 ")])),
        _: 1
      }, 8, ["onClick"]), l(a, {
        sort: "flat",
        kind: "primary",
        class: "wbpro-layer-btn-item",
        onClick: t.confirm
      }, {
        default: r(() => o[5] || (o[5] = [_(" 确定 ")])),
        _: 1
      }, 8, ["onClick"])]),
      _: 1
    })])]),
    _: 1
  }, 8, ["show", "onClose"])
}
const M = {
    $style: T
  },
  q = p(N, [
    ["render", L],
    ["__cssModules", M]
  ]);
export {
  q as
  default
};
