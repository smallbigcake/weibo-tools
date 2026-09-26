import {
  G as c,
  I as i
} from "./ajax-BaehXLgm.js";

function h() {
  const r = () => {
      const t = window.location.search,
        n = new URLSearchParams(t),
        a = {};
      for (const [e, o] of n.entries()) a[e] ? Array.isArray(a[e]) ? a[e].push(o) : a[e] = [a[e], o] : a[e] = o;
      return a
    },
    s = c({
      path: window.location.pathname,
      query: r(),
      hash: window.location.hash,
      params: {},
      fullPath: window.location.href
    });
  return i(s)
}
export {
  h as u
};
