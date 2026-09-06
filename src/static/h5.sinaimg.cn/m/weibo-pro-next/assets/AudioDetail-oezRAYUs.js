import {
  _ as i,
  aL as m,
  l as u,
  m as d,
  i as p,
  p as l,
  n as r,
  B as _,
  r as h,
  w as C
} from "./index-D53O_Npi.js";
const f = "_tit1_10mhm_2",
  x = "_gap2_10mhm_12",
  g = "_box1_10mhm_16",
  b = {
    tit1: f,
    gap2: x,
    box1: g
  },
  v = {
    components: {
      PublisherForm: m
    },
    props: {
      AudioDetailContent: {}
    },
    emits: ["input", "state"],
    setup(o, {
      emit: n
    }) {
      const s = h(o.AudioDetailContent),
        e = "详细描述音频内容（0～3000个字）",
        a = t => {
          n("input", t)
        },
        c = ({
          count: t
        }) => {
          n("state", t > 3e3)
        };
      return C(() => o.AudioDetailContent, t => {
        s.value = t
      }), {
        formChange: a,
        placeholder: e,
        content: s,
        formTextCount: c
      }
    }
  };

function y(o, n, s, e, a, c) {
  const t = u("PublisherForm");
  return p(), d("div", null, [l("div", {
    class: r([o.$style.tit1, o.$style.gap2])
  }, " 详情 ", 2), l("div", {
    class: r([o.$style.box1])
  }, [_(t, {
    placeholder: e.placeholder,
    content: e.content,
    maxCount: 3e3,
    onChange: e.formChange,
    onTextcount: e.formTextCount
  }, null, 8, ["placeholder", "content", "onChange", "onTextcount"])], 2)])
}
const A = {
    $style: b
  },
  D = i(v, [
    ["render", y],
    ["__cssModules", A]
  ]);
export {
  D as
  default
};
