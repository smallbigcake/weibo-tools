System.register(["./ajax-legacy-HfQI32AU.js"], function(t, n) {
  "use strict";
  var r, a;
  return {
    setters: [t => {
      r = t.G, a = t.I
    }],
    execute: function() {
      t("u", function() {
        const t = r({
          path: window.location.pathname,
          query: (() => {
            const t = window.location.search,
              n = new URLSearchParams(t),
              r = {};
            for (const [a, e] of n.entries()) r[a] ? Array.isArray(r[a]) ? r[a].push(e) : r[a] = [r[a], e] : r[a] = e;
            return r
          })(),
          hash: window.location.hash,
          params: {},
          fullPath: window.location.href
        });
        return a(t)
      })
    }
  }
});
