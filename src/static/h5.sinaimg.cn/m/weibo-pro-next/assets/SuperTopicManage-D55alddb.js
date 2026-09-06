var p1 = Object.defineProperty,
  g1 = Object.defineProperties;
var v1 = Object.getOwnPropertyDescriptors;
var a1 = Object.getOwnPropertySymbols;
var m1 = Object.prototype.hasOwnProperty,
  y1 = Object.prototype.propertyIsEnumerable;
var o1 = (n, s, a) => s in n ? p1(n, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: a
  }) : n[s] = a,
  F = (n, s) => {
    for (var a in s || (s = {})) m1.call(s, a) && o1(n, a, s[a]);
    if (a1)
      for (var a of a1(s)) y1.call(s, a) && o1(n, a, s[a]);
    return n
  },
  P = (n, s) => g1(n, v1(s));
var z = (n, s, a) => new Promise((v, d) => {
  var _ = i => {
      try {
        t(a.next(i))
      } catch (f) {
        d(f)
      }
    },
    w = i => {
      try {
        t(a.throw(i))
      } catch (f) {
        d(f)
      }
    },
    t = i => i.done ? v(i.value) : Promise.resolve(i.value).then(_, w);
  t((a = a.apply(n, s)).next())
});
import {
  r as R,
  a as e1,
  j as C1,
  c as k1,
  d as n1,
  u as _1,
  b as T,
  e as L1,
  f as b1,
  o as w1,
  g as i1,
  h as t1,
  i as M,
  k as $,
  N as I1,
  l as c1,
  m as N,
  n as S,
  p as B,
  q as S1,
  _ as u1,
  s as f1,
  t as d1,
  w as Q,
  v as $1,
  x as M1,
  y as T1,
  z as H1,
  A as r1,
  B as G,
  C as N1,
  D as O,
  E as Y,
  F as B1,
  G as s1,
  H as l1,
  I as E1
} from "./index-D53O_Npi.js";

function A1(n) {
  const s = R(1),
    a = R(!1);
  return {
    darkBubbleFlag: s,
    hasDark: a,
    changeDark: _ => {
      const w = _ === 1 ? "dark" : "light",
        t = {
          uid: n == null ? void 0 : n.id,
          mode: _
        };
      document.documentElement.dataset.theme = w;
      try {
        const i = new Map(JSON.parse(localStorage.getItem("darkModeHistory") || "[]")),
          f = JSON.stringify(Array.from(i.set((n == null ? void 0 : n.id) || "", _).entries()));
        localStorage.setItem("darkMode", JSON.stringify(t)), localStorage.setItem("darkModeHistory", f)
      } catch (i) {
        console.error("保存暗黑模式设置失败:", i)
      }
    },
    getBubbleFlag: _ => {
      const w = `${_}/ajax/getbubbleflag`;
      e1.get(w, {
        params: {
          key: "dark_bubble"
        }
      }).then(t => {
        t.data.ok > 0 && (s.value = t.data.data)
      }).catch(t => {
        console.error("获取气泡标志失败:", t)
      })
    }
  }
}

function U1(n) {
  return {
    logoTap: () => {
      window.location.href = n.logoUrl || "https://weibo.com"
    },
    toLinks: d => {
      d && d.href && window.open(d.href, "_blank")
    },
    qPublish: () => {
      const d = defineEmits(["publish"]);
      n.isLogin ? d("publish") : n.onLogin && n.onLogin()
    }
  }
}

function x1(n) {
  const s = R([]),
    a = R([]);
  return {
    searchWordsRelateList: s,
    searchUserRelateList: a,
    searchUrlHandle: _ => {
      var t, i;
      _.type === "weibo" ? window.open(`https://s.weibo.com/weibo?q=${encodeURIComponent(((t=_.query)==null?void 0:t.q)||"")}`, "_blank") : _.type === "user" ? window.open(`https://s.weibo.com/user?q=${encodeURIComponent(((i=_.query)==null?void 0:i.q)||"")}`, "_blank") : _.type === "profile" && window.open("https://weibo.com" + _.path)
    },
    getSearchData: _ => {
      const w = `${n}/ajax/side/search`;
      e1.get(w, {
        params: {
          q: _
        }
      }).then(t => {
        if (t.data.ok > 0) {
          const i = t.data.data;
          i.hotquery && i.hotquery.length > 3 ? s.value = i.hotquery.slice(0, 3) : s.value = i.hotquery, a.value = i.users
        }
      }).catch(t => {
        console.error("获取搜索数据失败:", t)
      })
    }
  }
}

function R1(n) {
  const s = R({}),
    a = R({}),
    v = R(null);
  return {
    unread: s,
    settings: a,
    remindTimer: v,
    refreshRemind: () => {
      C1("https://rm.api.weibo.com/2/remind/push_count.json?trim_null=1&with_dm_group=1&with_reminding=1&with_settings=1&exclude_attitude=1&with_chat_group_notice=1&source=339644097&with_chat_group=1&with_dm_unread=1", {}, (w, t) => {
        !w && t && t.code === 1 && t.data && (s.value = t.data, s.value.chatPro = k1(t, a.value))
      })
    },
    getClientMessageSettings: () => z(this, null, function*() {
      const w = `${n}/ajax/getClientMessageSettings`;
      try {
        const t = yield e1.get(w);
        t.data.ok > 0 && (a.value = t.data.data)
      } catch (t) {
        console.error("获取客户端消息设置失败:", t)
      }
    })
  }
}

function j1(n) {
  const s = R(!1),
    a = R(!1),
    v = R(""),
    d = () => {
      s.value = !0, n.show({
        type: "confirm",
        title: "确认退出微博么？",
        action: () => {
          const i = "miniblog",
            f = encodeURIComponent("");
          window.location.href = `https://login.sina.com.cn/sso/logout.php?entry=${i}&r=${f}`
        }
      })
    };
  return {
    configClose: s,
    feedbackLayerShow: a,
    feedbackLayerType: v,
    configHandle: (i, f) => {
      f[i].href ? window.open(f[i].href, "_blank") : f[i].type === "feedback" ? (s.value = !0, a.value = !0, v.value = f[i].type || "") : f[i].type === "logout" ? d() : f[i].type === "router" && (window.location.href = f[i].routerPath)
    },
    configClosed: () => {
      s.value = !1
    },
    feedbackClosed: () => {
      a.value = !1
    },
    logout: d
  }
}
const V1 = n1({
  __name: "Outside",
  props: {
    curIndex: {},
    user: {},
    isLogin: {
      type: Boolean,
      default: !0
    },
    data: {},
    logoUrl: {},
    hasDark: {
      type: Boolean,
      default: !1
    },
    enableLoginPop: {
      type: Boolean,
      default: !1
    },
    ajaxBaseUrl: {
      default: ""
    }
  },
  emits: ["update:curIndex", "publish", "loginPop", "updateNavCur"],
  setup(n, {
    emit: s
  }) {
    const a = n,
      v = s,
      d = _1(),
      {
        channels: _,
        configs: w
      } = L1(),
      {
        unread: t,
        settings: i,
        remindTimer: f,
        refreshRemind: j,
        getClientMessageSettings: E
      } = R1(a.ajaxBaseUrl),
      {
        searchWordsRelateList: A,
        searchUserRelateList: L,
        getSearchData: e,
        searchUrlHandle: o
      } = x1(a.ajaxBaseUrl),
      {
        darkBubbleFlag: r,
        hasDark: c,
        changeDark: p,
        getBubbleFlag: k
      } = A1(a.user),
      {
        logoTap: u,
        toLinks: g
      } = U1(a),
      {
        configClose: h,
        feedbackLayerShow: l,
        feedbackLayerType: m,
        configClosed: I,
        feedbackClosed: b,
        logout: V
      } = j1(d),
      H = T(() => {
        const C = new URL(location.href);
        return C && C.hostname && /s.weibo.com/.test(C.hostname) ? w.filter(D => D.type !== "feedback") : w
      }),
      U = T(() => {
        const C = [];
        return a.isLogin && C.push({
          name: "game",
          title: "游戏",
          href: "//game.weibo.com/?topnav=1&mod=logo&wvr=6"
        }), C
      }),
      q = T(() => _.map(C => C.name === "home" ? P(F({}, C), {
        badge: t.value && Number(t.value.total_unread) > 0 ? "NEW" : 0
      }) : C.name === "messages" ? P(F({}, C), {
        badge: b1(t.value, i.value)
      }) : C.name === "profile" ? a.isLogin && a.user ? P(F({}, C), {
        src: a.user.avatar || "//tva1.sinaimg.cn/default/images/default_avatar_male_180.gif",
        title: a.user.name || "",
        router: "",
        link: `https://weibo.com/u/${a.user.id}` || ""
      }) : {
        name: "login",
        router: "",
        noFlat: !0
      } : C)),
      y = () => {
        if (a.enableLoginPop) {
          v("loginPop");
          return
        }
        const C = `//weibo.com/newlogin?openLoginLayer=1&url=${encodeURIComponent(window.location.href)}`;
        window.location.href = C
      },
      Z = () => {
        y()
      },
      J = () => {
        window.open("https://weibo.com/signup/signup.php")
      },
      x = C => {
        const D = a.data && a.data.length && a.data.filter(h1 => h1.name === q.value[C].name);
        if (a.isLogin) v("update:curIndex", C), D && D[0] && D[0].reloadFun ? D[0].reloadFun() : q.value[C].link ? window.location.href = q.value[C].link : D && D[0] && D[0].link && (window.location.href = D[0].link);
        else {
          if (v("updateNavCur", {
              detail: a.curIndex
            }), +C == +a.curIndex) return;
          y()
        }
      },
      W = C => {
        H.value[C].href ? window.open(H.value[C].href, "_blank") : H.value[C].type === "feedback" ? (h.value = !0, l.value = !0, m.value = H.value[C].type || "") : H.value[C].type === "logout" ? V() : H.value[C].type === "router" && (window.location.href = H.value[C].routerPath)
      },
      K = () => {
        a.isLogin ? v("publish") : y()
      };
    return w1(() => z(this, null, function*() {
      yield E(), j(), k(a.ajaxBaseUrl), f.value = window.setInterval(() => {
        j()
      }, 30 * 1e3)
    })), i1(() => {
      f.value && (clearInterval(f.value), f.value = null)
    }), (C, D) => (M(), t1($(I1), {
      "nav-cur": C.curIndex,
      "nav-items": q.value,
      "link-items": U.value,
      "config-items": H.value,
      user: C.user,
      "is-login": C.isLogin,
      "flag-dark-bubble": $(r),
      hasDark: $(c),
      "feedback-layer-show": $(l),
      "feedback-layer-type": $(m),
      "config-keypress-close": !0,
      "config-layer-close": $(h),
      "search-words-relate-list": $(A),
      "search-user-relate-list": $(L),
      ajaxBaseUrl: C.ajaxBaseUrl,
      "in-outside": "",
      showRightUSLogo: !0,
      showLeftUSLogo: !1,
      onLogoTap: $(u),
      onNavCtrlTap: x,
      onConfigItemTap: W,
      onConfigClosed: $(I),
      onSearchControlUrl: $(o),
      onGetSearchData: $(e),
      onToLinks: $(g),
      onPubWeibo: K,
      onFeedbackClosed: $(b),
      onChangeDark: $(p),
      onLoginTap: Z,
      onSignTap: J
    }, null, 8, ["nav-cur", "nav-items", "link-items", "config-items", "user", "is-login", "flag-dark-bubble", "hasDark", "feedback-layer-show", "feedback-layer-type", "config-layer-close", "search-words-relate-list", "search-user-relate-list", "ajaxBaseUrl", "onLogoTap", "onConfigClosed", "onSearchControlUrl", "onGetSearchData", "onToLinks", "onFeedbackClosed", "onChangeDark"]))
  }
});

function D1(n, s) {
  function a() {
    const t = "__custEventKey__";
    let i = 1,
      f = {},
      j = {};

    function E(e, o) {
      const r = typeof e == "number" ? e : e[t];
      return !r || !f[r] ? null : {
        key: r,
        obj: typeof o == "string" ? f[r][o] : f[r]
      }
    }

    function A(e, o, r, c, p) {
      if (!e || typeof o != "string" || !r) return;
      const k = E(e, o);
      if (!k || !Array.isArray(k.obj)) throw new Error(`custEvent (${o}) is undefined !`);
      return k.obj.push({
        fn: r,
        data: c,
        once: p
      }), k.key
    }

    function L(e, o, r, c) {
      if (!e || typeof o != "string") return;
      const p = E(e, o),
        k = p == null ? void 0 : p.obj;
      if (!Array.isArray(k)) return;
      let u = !0;
      const g = function() {
          u = !1
        },
        h = typeof r != "undefined" ? [].concat(r) : [];
      for (let l = k.length - 1; l > -1 && k[l]; l--) {
        const m = k[l];
        if (typeof m.fn == "function") try {
          m.fn.apply(e, [{
            obj: e,
            type: o,
            data: m.data,
            preventDefault: g
          }].concat(h)), m.once && k.splice(l, 1)
        } catch (I) {
          n.console && console.error(`[error][custEvent]${I.message}`, I)
        }
      }
      return u && typeof c == "function" && c(), p.key
    }
    return {
      define(e, o) {
        if (!e || !o) return;
        const r = typeof e == "number" ? e : e[t] || (e[t] = i++),
          c = f[r] || (f[r] = {}),
          p = [].concat(o);
        for (let k = 0; k < p.length; k++) {
          const u = p[k];
          c[u] || (c[u] = [])
        }
        return r
      },
      undefine(e, o) {
        if (!e) return;
        const r = typeof e == "number" ? e : e[t];
        if (!r || !f[r]) return;
        if (!o) {
          delete f[r];
          return
        }
        const c = [].concat(o);
        for (let p = 0; p < c.length; p++) {
          const k = c[p];
          k in f[r] && delete f[r][k]
        }
      },
      add(e, o, r, c) {
        return A(e, o, r, c, !1)
      },
      once(e, o, r, c) {
        return A(e, o, r, c, !0)
      },
      remove(e, o, r) {
        if (!e) return;
        const c = E(e, o),
          p = c == null ? void 0 : c.obj;
        if (p) {
          if (Array.isArray(p))
            if (r) {
              let k = 0;
              for (; p[k] && p[k].fn !== r;) k++;
              p.splice(k, 1)
            } else p.splice(0, p.length);
          else Object.keys(p).forEach(k => {
            p[k] = []
          });
          return c.key
        }
      },
      fire: L,
      hook(e, o, r) {
        if (!e || !o || !r) return;
        const c = e[t],
          p = c && f[c],
          k = o[t] || (o[t] = i++);
        if (!p) return;
        const u = `${c}_${k}`,
          g = j[u] || (j[u] = {}),
          h = [],
          l = function(m, ...I) {
            let b = !0;
            L(o, g[m.type].type, I, () => {
              b = !1
            }), b && m.preventDefault()
          };
        Object.keys(r).forEach(m => {
          const I = r[m];
          if (g[m]) return;
          const b = p[m];
          b && (b.push({
            fn: l
          }), g[m] = {
            fn: l,
            type: I
          }, h.push(I))
        }), this.define(o, h)
      },
      unhook(e, o, r) {
        if (!e || !o || !r) return;
        const c = e[t],
          p = o[t],
          k = j[`${c}_${p}`];
        k && Object.keys(r).forEach(u => {
          k[u] && this.remove(e, u, k[u].fn)
        })
      },
      destroy() {
        f = {}, i = 1, j = {}
      }
    }
  }
  const v = a(),
    d = {
      count: 0,
      getUniqueKey() {
        return +new Date + `${Math.random()}`.replace(".", "") + d.count++
      },
      json2str(t) {
        return JSON.stringify(t)
      },
      str2json(t) {
        try {
          return JSON.parse(t)
        } catch (i) {
          return null
        }
      }
    };

  function _() {
    var L;
    const t = {},
      i = {},
      f = n.name;

    function j(e, o, r) {
      const c = r === void 0 ? {
          iid: f,
          cid: e,
          cmd: o
        } : {
          iid: f,
          cid: e,
          cmd: o,
          param: r
        },
        p = d.json2str(c);
      n.parent.postMessage ? n.parent.postMessage(p, "*") : n.navigator.STK_IFRAME_CONNECT_OUT && n.navigator.STK_IFRAME_CONNECT_OUT(p)
    }

    function E(e) {
      try {
        const o = d.str2json(e.data);
        if (!o) return;
        if (o.cid === "_EVENT_") {
          v.define(i, o.call), v.fire(i, o.call, o.rs);
          return
        }
        if (!o.cid || !(String(o.cid) in t)) return;
        const r = t[String(o.cid)],
          c = o.call === "callback" ? r : r == null ? void 0 : r[o.call];
        typeof c == "function" && c(o.rs), delete t[String(o.cid)]
      } catch (o) {}
    }
    n.postMessage ? n.addEventListener ? n.addEventListener("message", E, !1) : (L = n.attachEvent) == null || L.call(n, "onmessage", E) : n.navigator[`STK_IFRAME_CONNECT_${f}`] = function(e) {
      E({
        data: e
      })
    };
    const A = {
      trigger(e, o, r) {
        typeof o == "function" && (r = o, o = void 0);
        const c = String(d.getUniqueKey());
        r && (t[c] = r), j(c, e, o)
      },
      on(e, o) {
        v.define(i, e), v.add(i, e, o)
      },
      off(e, o) {
        v.remove(i, e, o)
      },
      setHeight(e, o) {
        A.trigger("setHeight", e, o)
      },
      getLayoutInfo(e) {
        A.trigger("getLayoutInfo", e)
      },
      oauth(e) {
        if (e.appkey == null || e.callback == null) return;
        const o = "page_app_oauth_iframe",
          r = `https://api.weibo.com/2/oauth2/authorize?client_id=${e.appkey}&response_type=code&redirect_uri=${encodeURIComponent(e.callback)}&quick_auth=true`,
          c = s.getElementById(o);
        if (c == null) {
          const p = s.createElement("iframe");
          p.id = o, p.style.cssText = "position:absolute;left:-1000px;top:-1000px;display:none", p.src = r, s.body.appendChild(p);
          return
        }
        c.src = r
      }
    };
    return A
  }
  const w = n.iconnect = _();
  return n.iframeConnect = function() {
    return w
  }, w
}

function q1() {
  if (!(typeof window == "undefined" || typeof document == "undefined")) return window.iconnect && typeof window.iframeConnect == "function" ? window.iconnect : D1(window, document)
}
const F1 = {
    key: 0,
    width: "26",
    height: "26",
    viewBox: "0 0 26 26",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  P1 = {
    key: 1,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  O1 = {
    key: 2,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  Z1 = {
    key: 3,
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  W1 = {
    key: 4,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  K1 = {
    key: 5,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  z1 = n1({
    __name: "SuperTopicNavIcon",
    props: {
      name: {},
      fallback: {
        default: "setup"
      }
    },
    setup(n) {
      return (s, a) => {
        const v = c1("woo-fonticon");
        return M(), N("span", {
          class: S(s.$style.root)
        }, [s.name === "帖子管理" ? (M(), N("svg", F1, a[0] || (a[0] = [B("path", {
          d: "M18 3.7002C19.6569 3.7002 21 5.04334 21 6.7002V12.9346C20.7562 12.7999 20.5016 12.6847 20.2373 12.5908C19.8924 12.4683 19.5276 12.4738 19.2002 12.5879V6.7002C19.2002 6.07901 18.728 5.56847 18.123 5.50684L18 5.5H8C7.37881 5.5 6.86827 5.97223 6.80664 6.57715L6.7998 6.7002V19.1865C6.7998 19.8077 7.27199 20.3193 7.87695 20.3809L8 20.3867H14.6553C14.7076 20.7571 14.891 21.1072 15.1895 21.3613C15.5944 21.7056 16.05 21.983 16.5391 22.1865H8C6.34315 22.1865 5 20.8434 5 19.1865V6.7002C5 5.04334 6.34315 3.7002 8 3.7002H18ZM18.6357 21.9941C18.6728 22.0273 18.712 22.0586 18.752 22.0879C18.5526 22.1394 18.346 22.1733 18.1328 22.1826C18.2363 22.1233 18.3342 22.0529 18.4229 21.9697L18.5156 21.874L18.6357 21.9941ZM19.2461 13.751C19.3891 13.5365 19.6594 13.447 19.9023 13.5332C20.3868 13.7053 20.8312 13.9629 21.2227 14.3008C21.4152 14.4678 21.4726 14.7428 21.3623 14.9697C21.2342 15.2343 21.2453 15.5435 21.3926 15.7959C21.5373 16.0442 21.7961 16.2051 22.084 16.2275C22.3358 16.2467 22.5443 16.436 22.5908 16.6865C22.6366 16.9349 22.6604 17.1876 22.6592 17.4385C22.6592 17.7203 22.631 18.0032 22.5742 18.2773C22.5245 18.5202 22.318 18.7042 22.0732 18.7246C21.7884 18.7489 21.5317 18.9093 21.3877 19.1553C21.2464 19.3968 21.229 19.6954 21.3418 19.9521C21.4406 20.1765 21.3778 20.4445 21.1885 20.6045C20.7962 20.9365 20.3455 21.193 19.8594 21.3594C19.7982 21.3804 19.7356 21.3906 19.6738 21.3906C19.4962 21.3908 19.3293 21.3056 19.2246 21.1621C19.0577 20.9334 18.7995 20.8019 18.5166 20.8018C18.2342 20.8018 17.9753 20.9332 17.8076 21.1621C17.6622 21.3602 17.407 21.4397 17.1719 21.3594C16.6833 21.1922 16.2303 20.9341 15.8369 20.5996C15.6485 20.439 15.5859 20.1705 15.6846 19.9463C15.7974 19.6894 15.7814 19.3916 15.6406 19.1494C15.4972 18.9028 15.2409 18.7411 14.9561 18.7168C14.7113 18.6958 14.5058 18.5124 14.4561 18.2695C14.4006 17.9973 14.3721 17.7177 14.3721 17.4385C14.3721 17.1849 14.3962 16.9288 14.4434 16.6777C14.4906 16.4272 14.6988 16.2389 14.9512 16.2197C15.2387 16.1984 15.4975 16.0376 15.6436 15.7891C15.7915 15.5372 15.8039 15.2284 15.6758 14.9639C15.5662 14.7369 15.6242 14.4623 15.8174 14.2959C16.2074 13.9607 16.6491 13.704 17.1309 13.5332C17.3738 13.4465 17.6442 13.5363 17.7871 13.751C17.9509 13.9957 18.2234 14.1425 18.5166 14.1426C18.8099 14.1425 19.0839 13.9953 19.2461 13.751ZM18.5166 15.7842C17.6039 15.7843 16.8626 16.5265 16.8623 17.4385C16.8623 18.3507 17.6044 19.0936 18.5166 19.0938C19.4289 19.0938 20.1719 18.3507 20.1719 17.4385C20.1716 16.5264 19.4294 15.7842 18.5166 15.7842ZM11.8096 14.5625C12.2789 14.5625 12.659 14.9428 12.6592 15.4121C12.6592 15.8454 12.3351 16.2034 11.916 16.2559L11.8096 16.2627H9.02344C8.55404 16.2626 8.17383 15.8815 8.17383 15.4121C8.17396 14.9789 8.49796 14.6218 8.91699 14.5693L9.02344 14.5625H11.8096ZM13.8096 11.5625C14.2789 11.5625 14.659 11.9428 14.6592 12.4121C14.6592 12.8454 14.3351 13.2034 13.916 13.2559L13.8096 13.2627H9.02344C8.55404 13.2626 8.17383 12.8815 8.17383 12.4121C8.17396 11.9789 8.49796 11.6218 8.91699 11.5693L9.02344 11.5625H13.8096ZM15.8096 8.5625C16.2789 8.5625 16.659 8.94279 16.6592 9.41211C16.6592 9.84544 16.3351 10.2034 15.916 10.2559L15.8096 10.2627H9.02344C8.55404 10.2626 8.17383 9.88152 8.17383 9.41211C8.17396 8.97889 8.49796 8.62178 8.91699 8.56934L9.02344 8.5625H15.8096Z",
          fill: "currentColor"
        }, null, -1)]))) : s.name === "用户管理" ? (M(), N("svg", P1, a[1] || (a[1] = [B("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M11.2998 3C14.3924 3 16.9001 5.50708 16.9004 8.59961L16.8926 8.8877C16.7428 11.8468 14.2961 14.2002 11.2998 14.2002L11.2695 14.1992C11.2634 14.1993 11.2572 14.2002 11.251 14.2002H10.623C7.72478 14.2002 5.36909 16.5169 5.30371 19.3994H10.4004C10.8973 19.3994 11.3006 19.8029 11.3008 20.2998C11.3008 20.7969 10.8974 21.2002 10.4004 21.2002H5.17773C4.25147 21.2 3.50023 20.4487 3.5 19.5225C3.50015 16.5884 5.27512 14.0686 7.80957 12.9775C6.52439 11.9514 5.7002 10.372 5.7002 8.59961C5.70051 5.50721 8.20738 3.00021 11.2998 3ZM11.2998 4.7998C9.20149 4.80002 7.50031 6.50132 7.5 8.59961C7.5 10.6982 9.2013 12.4002 11.2998 12.4004C13.3985 12.4004 15.1006 10.6983 15.1006 8.59961C15.1003 6.50119 13.3983 4.7998 11.2998 4.7998Z",
          fill: "currentColor"
        }, null, -1), B("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M16.6504 13.25C17.175 13.2501 17.6006 13.6756 17.6006 14.2002V14.3867C17.7405 14.4307 17.8746 14.4877 18.0049 14.5508L18.1348 14.4219C18.5058 14.0509 19.1075 14.0509 19.4785 14.4219C19.8495 14.7928 19.8494 15.3937 19.4785 15.7646L19.3652 15.877C19.4351 16.0124 19.495 16.1534 19.5439 16.2998H19.7002C20.2249 16.2998 20.6504 16.7253 20.6504 17.25C20.6504 17.7747 20.2249 18.2002 19.7002 18.2002H19.5439C19.4951 18.3464 19.435 18.4869 19.3652 18.6221L19.4785 18.7354C19.8492 19.1063 19.8493 19.7072 19.4785 20.0781C19.1075 20.4491 18.5058 20.4491 18.1348 20.0781L18.0049 19.9482C17.8746 20.0114 17.7405 20.0683 17.6006 20.1123V20.2998C17.6006 20.8244 17.175 21.2499 16.6504 21.25C16.1257 21.25 15.7002 20.8245 15.7002 20.2998V20.0752C15.5716 20.0297 15.447 19.9769 15.3271 19.915L15.165 20.0781C14.794 20.4491 14.1933 20.4491 13.8223 20.0781C13.4513 19.7071 13.4513 19.1064 13.8223 18.7354L14.002 18.5547C13.9465 18.4401 13.8972 18.3223 13.8564 18.2002H13.6006C13.0759 18.2002 12.6504 17.7747 12.6504 17.25C12.6504 16.7253 13.0759 16.2998 13.6006 16.2998H13.8564C13.8973 16.1776 13.9454 16.059 14.001 15.9443L13.8213 15.7646C13.4508 15.3937 13.4508 14.7928 13.8213 14.4219C14.1923 14.0509 14.794 14.0509 15.165 14.4219L15.3271 14.584C15.447 14.5221 15.5716 14.4693 15.7002 14.4238V14.2002C15.7002 13.6755 16.1257 13.25 16.6504 13.25ZM16.7002 16.0498C16.0375 16.0498 15.5 16.5873 15.5 17.25C15.5 17.9127 16.0375 18.4502 16.7002 18.4502C17.3629 18.4502 17.9004 17.9127 17.9004 17.25C17.9004 16.5873 17.3629 16.0498 16.7002 16.0498Z",
          fill: "currentColor"
        }, null, -1)]))) : s.name === "工具管理" ? (M(), N("svg", O1, a[2] || (a[2] = [S1('<mask id="path-1-inside-1_859_28131" fill="white"><rect x="12.5293" y="12.5293" width="8.47059" height="8.47059" rx="1"></rect></mask><rect x="12.5293" y="12.5293" width="8.47059" height="8.47059" rx="1" stroke="currentColor" stroke-width="3.6" mask="url(#path-1-inside-1_859_28131)"></rect><mask id="path-2-inside-2_859_28131" fill="white"><rect x="3" y="12.5293" width="8.47059" height="8.47059" rx="1"></rect></mask><rect x="3" y="12.5293" width="8.47059" height="8.47059" rx="1" stroke="currentColor" stroke-width="3.6" mask="url(#path-2-inside-2_859_28131)"></rect><mask id="path-3-inside-3_859_28131" fill="white"><rect x="3" y="3" width="8.47059" height="8.47059" rx="1"></rect></mask><rect x="3" y="3" width="8.47059" height="8.47059" rx="1" stroke="currentColor" stroke-width="3.6" mask="url(#path-3-inside-3_859_28131)"></rect><mask id="path-4-inside-4_859_28131" fill="white"><rect x="12.5293" y="3" width="8.47059" height="8.47059" rx="1"></rect></mask><rect x="12.5293" y="3" width="8.47059" height="8.47059" rx="1" stroke="currentColor" stroke-width="3.6" mask="url(#path-4-inside-4_859_28131)"></rect>', 8)]))) : s.name === "数据统计" ? (M(), N("svg", Z1, a[3] || (a[3] = [B("circle", {
          cx: "9",
          cy: "9",
          r: "8.1",
          stroke: "currentColor",
          "stroke-width": "1.8"
        }, null, -1), B("path", {
          d: "M4 11L6.99885 8.30103C7.189 8.1299 7.47766 8.1299 7.66782 8.30103L9.77663 10.199C9.96678 10.3701 10.2554 10.3701 10.4456 10.199L14 7",
          stroke: "currentColor",
          "stroke-width": "1.8",
          "stroke-linecap": "round"
        }, null, -1)]))) : s.name === "操作日志" || s.name === "主持人管理" ? (M(), N("svg", W1, a[4] || (a[4] = [B("path", {
          d: "M16.6582 3C18.2713 3.00012 19.579 4.30779 19.5791 5.9209V11.8066C19.0435 11.5222 18.4522 11.3297 17.8262 11.249V5.9209C17.8262 5.31602 17.3664 4.81875 16.7773 4.75879L16.6572 4.75195H6.9209C6.31592 4.75195 5.81862 5.21257 5.75879 5.80176L5.75195 5.9209V18.0791C5.75216 18.6839 6.21271 19.1814 6.80176 19.2412L6.9209 19.2471H12.8633C13.361 19.9897 14.0458 20.5963 14.8496 21H6.9209C5.30775 20.9999 4.00005 19.6923 4 18.0791V5.9209C4.00009 4.30777 5.30777 3.00009 6.9209 3H16.6582ZM10.6309 13.5762C11.0879 13.5762 11.458 13.9472 11.458 14.4043C11.4579 14.8262 11.1424 15.1745 10.7344 15.2256L10.6309 15.2314H7.91797C7.46097 15.2314 7.09089 14.8613 7.09082 14.4043C7.09082 13.9824 7.40636 13.6341 7.81445 13.583L7.91797 13.5762H10.6309ZM12.5781 10.6562C13.0352 10.6562 13.4062 11.0263 13.4062 11.4834C13.4062 11.9053 13.0897 12.2536 12.6816 12.3047L12.5781 12.3115H7.91797C7.46093 12.3115 7.09082 11.9404 7.09082 11.4834C7.09085 11.0615 7.40638 10.7132 7.81445 10.6621L7.91797 10.6562H12.5781ZM14.5254 7.73438C14.9824 7.73438 15.3534 8.10449 15.3535 8.56152C15.3535 8.9833 15.0378 9.33154 14.6299 9.38281L14.5254 9.38965H7.91797C7.46093 9.38958 7.09082 9.01857 7.09082 8.56152C7.09088 8.13965 7.4064 7.7913 7.81445 7.74023L7.91797 7.73438H14.5254Z",
          fill: "currentColor"
        }, null, -1), B("path", {
          d: "M17.0957 12.3223C19.3369 12.3223 21.1592 14.1461 21.1592 16.3857C21.159 18.6252 19.3352 20.4482 17.0957 20.4482C14.8564 20.4481 13.0334 18.6251 13.0332 16.3857C13.0332 14.1462 14.8547 12.3224 17.0957 12.3223ZM17.0332 13.5537C16.5914 13.554 16.2334 13.9127 16.2334 14.3545V16.4473C16.2336 16.8889 16.5916 17.2468 17.0332 17.2471C17.0435 17.2471 17.0542 17.2455 17.0645 17.2451C17.0748 17.2455 17.0853 17.2471 17.0957 17.2471H18.6963C19.138 17.2469 19.4958 16.8889 19.4961 16.4473C19.4961 16.0054 19.1382 15.6466 18.6963 15.6465H17.834V14.3545C17.834 13.9125 17.4752 13.5537 17.0332 13.5537Z",
          fill: "currentColor"
        }, null, -1)]))) : s.name === "基本设置" ? (M(), N("svg", K1, a[5] || (a[5] = [B("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M12.7042 3.01074C13.7127 3.11312 14.5001 3.96444 14.5001 5V5.45996C15.1105 5.69351 15.68 6.00975 16.1944 6.39551L16.4112 6.56543L16.8126 6.33496C17.769 5.78288 18.9917 6.11007 19.544 7.06641L20.044 7.93262C20.5962 8.88912 20.269 10.1127 19.3126 10.665L18.9122 10.8955C18.9692 11.2552 19.0001 11.6243 19.0001 12L18.9942 12.2803C18.9828 12.5592 18.9549 12.8339 18.9122 13.1035L19.3126 13.335C20.2687 13.8874 20.5961 15.11 20.044 16.0664L19.544 16.9326L19.4327 17.1045C18.8792 17.8718 17.8571 18.1457 16.9942 17.7578L16.8126 17.665L16.4112 17.4326C15.8414 17.8958 15.1977 18.2711 14.5001 18.5381V19L14.4893 19.2041C14.3937 20.1454 13.6455 20.8937 12.7042 20.9893L12.5001 21H11.5001L11.295 20.9893C10.354 20.8934 9.60542 20.1452 9.50983 19.2041L9.50006 19V18.5381C8.80229 18.2712 8.15783 17.8968 7.58795 17.4336L7.18756 17.665L7.00495 17.7578C6.14219 18.1453 5.12081 17.8715 4.56745 17.1045L4.45612 16.9326L3.95612 16.0664C3.43844 15.1698 3.69383 14.0393 4.51569 13.4463L4.68756 13.335L5.08698 13.1035C5.04426 12.8339 5.01702 12.5592 5.00592 12.2803L5.00006 12C5.00006 11.6244 5.02903 11.2551 5.086 10.8955L4.68756 10.665C3.79098 10.1473 3.44706 9.03977 3.86237 8.11523L3.95612 7.93262L4.45612 7.06641C5.00848 6.1101 6.2311 5.78281 7.18756 6.33496L7.58698 6.56543C8.15709 6.10194 8.80192 5.72697 9.50006 5.45996V5C9.50006 3.96468 10.2868 3.11345 11.295 3.01074L11.5001 3H12.5001L12.7042 3.01074ZM11.5001 4.59961C11.279 4.59962 11.0997 4.77925 11.0997 5V6.56152L10.0714 6.9541C9.53298 7.16001 9.03546 7.44917 8.59577 7.80664L7.74127 8.50195L6.78717 7.95117L6.38776 7.7207C6.19621 7.61012 5.95222 7.67571 5.84186 7.86621L5.34186 8.73242C5.231 8.92444 5.29695 9.16923 5.48737 9.2793L5.48834 9.28027L5.88678 9.51074L6.83795 10.0605L6.66608 11.1455C6.63339 11.3519 6.61297 11.5644 6.60456 11.7812L6.59967 12C6.5997 12.2904 6.62301 12.5756 6.66706 12.8535L6.83893 13.9375L5.88874 14.4883L5.48932 14.7197L5.48737 14.7207C5.29653 14.8313 5.2315 15.0755 5.34186 15.2666L5.84186 16.1328C5.93865 16.3 6.13752 16.3709 6.31354 16.3125L6.38776 16.2793L6.78717 16.0488L7.74127 15.4971L8.59674 16.1924C9.03589 16.5493 9.5329 16.838 10.0714 17.0439L11.0997 17.4375V19C11.0999 19.221 11.2796 19.4004 11.5001 19.4004H12.5001C12.6929 19.4003 12.8544 19.2627 12.8917 19.0801L12.8995 19V17.4375L13.9278 17.0439C14.4645 16.8386 14.9611 16.5493 15.4014 16.1914L16.2579 15.4951L17.213 16.0479L17.6124 16.2793L17.6856 16.3125C17.8617 16.3712 18.0613 16.3004 18.1583 16.1328L18.6583 15.2666C18.7687 15.0752 18.7028 14.8311 18.5118 14.7207V14.7197L18.1114 14.4883L17.1602 13.9385L17.3321 12.8535C17.3655 12.6428 17.3868 12.4295 17.3956 12.2148L17.3995 12C17.3995 11.7121 17.3766 11.4263 17.3321 11.1455L17.1592 10.0586L18.1143 9.50879L18.5108 9.2793C18.7012 9.16933 18.7692 8.92457 18.6583 8.73242L18.1583 7.86621C18.0479 7.6755 17.8038 7.61022 17.6124 7.7207L17.6094 7.72266L17.2081 7.95312L16.2549 8.5L15.4014 7.80664C14.961 7.44873 14.4642 7.15933 13.9278 6.9541L12.8995 6.56055V5C12.8995 4.77917 12.7209 4.59975 12.5001 4.59961H11.5001ZM12.0001 9C13.6569 9 15.0001 10.3431 15.0001 12C14.9998 13.6566 13.6568 15 12.0001 15C10.3434 15 9.00033 13.6566 9.00006 12C9.00006 10.3431 10.3432 9 12.0001 9ZM12.0001 10.5996C11.2269 10.5996 10.5997 11.2268 10.5997 12C10.5999 12.773 11.227 13.4004 12.0001 13.4004C12.7731 13.4004 13.4002 12.773 13.4005 12C13.4005 11.2268 12.7733 10.5996 12.0001 10.5996Z",
          fill: "currentColor"
        }, null, -1)]))) : (M(), t1(v, {
          key: 6,
          value: s.fallback,
          class: S(s.$style.fontIcon)
        }, null, 8, ["value", "class"]))], 2)
      }
    }
  }),
  J1 = "_root_1qf5z_2",
  G1 = "_fontIcon_1qf5z_17",
  Y1 = {
    root: J1,
    fontIcon: G1
  },
  X1 = {
    $style: Y1
  },
  Q1 = u1(z1, [
    ["__cssModules", X1]
  ]),
  ee = new Set(["error", "help", "loading", "success", "warn"]),
  ne = 1e4;

function te(n) {
  if (typeof n == "string") try {
    return JSON.parse(n)
  } catch (s) {
    return null
  }
  return n && typeof n == "object" ? n : null
}

function ae(n) {
  return n.replace(/[&<>"']/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[s])
}

function oe(n) {
  const s = typeof n == "string" ? {
    message: n
  } : n;
  if (!s || typeof s != "object") return null;
  const {
    hideDuration: a,
    message: v,
    type: d = "success"
  } = s;
  if (typeof v != "string" || !v.trim() || typeof d != "string" || !ee.has(d)) return null;
  const _ = {
    message: ae(v.trim()),
    type: d
  };
  return typeof a == "number" && Number.isFinite(a) && a >= 0 && (_.hideDuration = Math.min(a, ne)), _
}

function re(n) {
  var A;
  const s = (A = n.minHeight) != null ? A : 640;

  function a(L, e) {
    L.postMessage(JSON.stringify(e), "*")
  }

  function v(L, e, o, r) {
    !L.source || typeof L.source.postMessage != "function" || a(L.source, {
      cid: e,
      call: o,
      rs: r
    })
  }

  function d() {
    const L = n.iframeRef.value;
    if (!L) return {
      top: 0,
      left: 0
    };
    const e = L.getBoundingClientRect();
    return {
      top: Math.round(e.top + window.scrollY),
      left: Math.round(e.left + window.scrollX)
    }
  }

  function _() {
    return {
      parent: {
        size: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        scroll: {
          top: window.scrollY,
          left: window.scrollX
        }
      },
      iframe: {
        position: d(),
        size: {
          width: n.iframeWidth,
          height: n.iframeHeight.value
        }
      }
    }
  }

  function w(L, e) {
    var r;
    const o = (r = n.iframeRef.value) == null ? void 0 : r.contentWindow;
    o && a(o, {
      cid: "_EVENT_",
      call: L,
      rs: e
    })
  }

  function t() {
    w("layoutChange", _())
  }

  function i() {
    w("parentReady", n.getReadyPayload()), n.getThemePayload && w("themeChange", n.getThemePayload()), t()
  }

  function f(L) {
    const e = te(L.data);
    if (!(e != null && e.iid) || !e.cid || !e.cmd) return;
    const o = n.iframeRef.value;
    if (!(!o || e.iid !== n.iframeName.value || L.source !== o.contentWindow)) {
      if (e.cmd === "setHeight") {
        const r = e.param,
          c = Number(typeof r == "object" && r !== null ? r.height : r);
        !Number.isNaN(c) && c > 0 && (n.iframeHeight.value = Math.max(s, c)), v(L, e.cid, "callback", {
          height: n.iframeHeight.value
        });
        return
      }
      if (e.cmd === "getLayoutInfo") {
        v(L, e.cid, "callback", _());
        return
      }
      if (e.cmd === "toast") {
        const r = oe(e.param),
          c = n.showToast,
          p = !!(r && typeof c == "function");
        r && typeof c == "function" && c(r), v(L, e.cid, "callback", {
          shown: p
        })
      }
    }
  }

  function j() {
    window.addEventListener("message", f, !1), window.addEventListener("resize", t, !1), window.addEventListener("scroll", t, !1)
  }

  function E() {
    window.removeEventListener("message", f, !1), window.removeEventListener("resize", t, !1), window.removeEventListener("scroll", t, !1)
  }
  return {
    handleLoad: i,
    syncLayout: t,
    start: j,
    stop: E
  }
}
const X = [{
    key: "overview",
    label: "管理概览",
    url: "/p/{pageid}/super_index",
    children: []
  }, {
    key: "content",
    label: "内容巡检",
    url: "/p/{pageid}/super_index?from=manage-content",
    children: []
  }, {
    key: "member",
    label: "成员管理",
    url: "/p/{pageid}/super_index?from=manage-member",
    children: []
  }, {
    key: "data",
    label: "数据看板",
    url: "/p/{pageid}/super_index?from=manage-data",
    children: []
  }],
  se = {
    帖子管理: "file",
    工具管理: "tool",
    数据统计: "chart",
    主持人管理: "people",
    基本设置: "setup",
    操作日志: "file"
  };

function le(n) {
  const s = f1(),
    a = d1(),
    v = R([]),
    d = R(X),
    _ = R(""),
    w = R(""),
    t = T(() => String(s.query.tab || "overview")),
    i = T(() => String(s.query.subtab || "")),
    f = T(() => d.value.find(u => u.key === t.value) || d.value[0]),
    j = T(() => {
      var u, g, h, l;
      return ((g = (u = f.value) == null ? void 0 : u.children) == null ? void 0 : g.find(m => m.key === i.value)) || ((l = (h = f.value) == null ? void 0 : h.children) == null ? void 0 : l[0])
    });

  function E(u) {
    return u.replace("{pageid}", encodeURIComponent(n.pageid.value))
  }
  const A = T(() => {
    const u = typeof s.query.url == "string" ? s.query.url : "";
    if (u) return u;
    const g = j.value || f.value;
    return g != null && g.url ? E(g.url) : ""
  });

  function L(u, g) {
    var m, I;
    const h = d.value.find(b => b.key === u),
      l = ((m = h == null ? void 0 : h.children) == null ? void 0 : m.find(b => b.key === g)) || ((I = h == null ? void 0 : h.children) == null ? void 0 : I[0]);
    a.replace({
      name: "superTopicManage",
      params: {
        pageid: n.pageid.value
      },
      query: F(F(P(F({}, s.query), {
        tab: u
      }), l != null && l.key ? {
        subtab: l.key
      } : {}), l != null && l.url || h != null && h.url ? {
        url: E((l == null ? void 0 : l.url) || (h == null ? void 0 : h.url) || "")
      } : {})
    })
  }

  function e(u, g) {
    var I, b;
    const h = d.value.find(V => V.key === u),
      m = ((I = h == null ? void 0 : h.children) == null ? void 0 : I.find(V => V.key === g)) || ((b = h == null ? void 0 : h.children) == null ? void 0 : b[0]) || h;
    if ((m == null ? void 0 : m.target) === "_blank" && m.url) {
      window.open(E(m.url), "_blank", "noopener");
      return
    }
    L(u, g)
  }

  function o(u = []) {
    return u.map((g, h) => {
      var I;
      const l = Array.isArray(g.children) && g.children.length ? g.children[0] : null,
        m = g.url || (l == null ? void 0 : l.url) || "";
      return !g.name || !m ? null : {
        key: String((I = g.id) != null ? I : h),
        label: String(g.name),
        url: String(m),
        target: g.target ? String(g.target) : void 0,
        icon: se[String(g.name)] || "setup",
        children: Array.isArray(g.children) ? g.children.map((b, V) => {
          var H;
          return !(b != null && b.name) || !(b != null && b.url) ? null : {
            key: String((H = b.id) != null ? H : `${h}-${V}`),
            label: String(b.name),
            url: String(b.url),
            target: b.target ? String(b.target) : void 0
          }
        }).filter(Boolean) : []
      }
    }).filter(Boolean)
  }

  function r() {
    d.value = d.value.map(u => {
      var m;
      const g = !!((m = u.children) != null && m.length),
        h = (u.children || []).map(I => P(F({}, I), {
          active: u.key === t.value && I.key === i.value
        })),
        l = g ? h.some(I => I.active) : u.key === t.value;
      return P(F({}, u), {
        active: l,
        expand: v.value.includes(u.key),
        children: h
      })
    })
  }

  function c(u) {
    d.value = u, v.value = t.value ? [t.value] : [], r()
  }

  function p(u) {
    var h;
    const g = d.value.find(l => l.key === u);
    if (g) {
      if ((h = g.children) != null && h.length) {
        const l = v.value.includes(u);
        v.value = l ? v.value.filter(m => m !== u) : [...v.value.filter(m => m !== u), u], r();
        return
      }
      e(u)
    }
  }

  function k() {
    return z(this, null, function*() {
      var u, g, h;
      try {
        const {
          data: l
        } = yield n.http.get("/ajax_proxy/chaohua/emcee/pcmanage_menu", {
          params: {
            page_id: n.pageid.value
          }
        });
        _.value = (l == null ? void 0 : l.avatar_img) || "", w.value = (l == null ? void 0 : l.object_name) || "";
        const m = o((l == null ? void 0 : l.menus) || []),
          I = m.length ? m : X;
        d.value = I;
        const b = typeof s.query.url == "string" ? s.query.url : "",
          V = d.value.find(U => {
            var q;
            return U.url === b ? !0 : (q = U.children) == null ? void 0 : q.some(y => y.url === b)
          }),
          H = d.value.some(U => U.key === t.value);
        if (V) {
          const U = (u = V.children) == null ? void 0 : u.find(q => q.url === b);
          if (V.key !== t.value || (U == null ? void 0 : U.key) !== i.value) {
            L(V.key, U == null ? void 0 : U.key);
            return
          }
        }
        if (!H && d.value[0]) {
          L(d.value[0].key, (h = (g = d.value[0].children) == null ? void 0 : g[0]) == null ? void 0 : h.key);
          return
        }
        c(d.value)
      } catch (l) {
        _.value = "", w.value = "", c(X)
      }
    })
  }
  return Q(() => n.pageid.value, k), Q([t, i], () => {
    t.value && !v.value.includes(t.value) && (v.value = [...v.value, t.value]), r()
  }), {
    activeTab: t,
    activeSubTab: i,
    avatarImg: _,
    fetchMenus: k,
    iframeSrc: A,
    navItems: d,
    objectName: w,
    selectNavItem: e,
    setActiveTab: L,
    toggleNav: p
  }
}
const ie = ["src", "alt"],
  ce = ["onClick"],
  ue = ["onClick"],
  fe = ["name", "src"],
  de = n1({
    __name: "SuperTopicManage",
    setup(n) {
      const s = f1(),
        a = d1(),
        v = $1(),
        d = M1(),
        _ = d == null ? void 0 : d.proxy,
        w = T1(),
        t = T(() => String(s.params.pageid || "")),
        i = T(() => {
          var y;
          return ((y = v.state.config) == null ? void 0 : y.config) || {}
        }),
        f = T(() => {
          var y;
          return (y = i.value) == null ? void 0 : y.user
        }),
        j = T(() => {
          var y;
          return !!((y = i.value) != null && y.isNormal)
        }),
        E = T(() => ""),
        A = R(null),
        L = R(960),
        e = T(() => {
          if (f.value) return {
            id: f.value.id || f.value.idstr,
            name: f.value.screen_name,
            avatar: f.value.avatar_large
          }
        }),
        {
          avatarImg: o,
          fetchMenus: r,
          iframeSrc: c,
          navItems: p,
          objectName: k,
          selectNavItem: u,
          toggleNav: g
        } = le({
          pageid: t,
          http: _.$http
        }),
        h = T(() => o.value),
        l = T(() => k.value),
        m = T(() => l.value ? `${l.value}${l.value.endsWith("超话")?"":"超话"}·管理中心` : "超话·管理中心"),
        I = T(() => !!(h.value || l.value)),
        b = T(() => c.value),
        V = T(() => `super_topic_manage_${t.value}`),
        H = re({
          iframeRef: A,
          iframeName: V,
          iframeHeight: L,
          iframeWidth: 776,
          getReadyPayload: () => ({
            pageid: t.value,
            title: l.value
          }),
          getThemePayload: () => ({
            bg: "#F1F2F5"
          }),
          showToast: y => w == null ? void 0 : w.show(y)
        }),
        U = H.handleLoad;
      q1(), H1({
        title: m
      });

      function q() {
        a.push({
          path: "/"
        })
      }
      return r1(r), r1(() => {
        H.start()
      }), i1(() => {
        H.stop()
      }), Q(L, H.syncLayout), (y, Z) => {
        const J = c1("woo-fonticon");
        return M(), N("div", {
          class: S(y.$style.page)
        }, [B("div", {
          class: S(y.$style.topNav)
        }, [G(V1, {
          "is-login": j.value,
          user: e.value,
          "ajax-base-url": E.value,
          onPublish: q
        }, null, 8, ["is-login", "user", "ajax-base-url"])], 2), B("div", {
          class: S(y.$style.barWrap)
        }, [G(B1, {
          class: S(y.$style.statusBar)
        }, {
          title: N1(() => [I.value ? (M(), N("div", {
            key: 0,
            class: S(y.$style.topicBadge)
          }, [h.value ? (M(), N("img", {
            key: 0,
            src: h.value,
            alt: l.value,
            class: S(y.$style.topicAvatar)
          }, null, 10, ie)) : O("", !0), l.value ? (M(), N("span", {
            key: 1,
            class: S(y.$style.topicName)
          }, Y(m.value), 3)) : O("", !0)], 2)) : O("", !0)]),
          _: 1
        }, 8, ["class"])], 2), B("main", {
          class: S(y.$style.main)
        }, [B("aside", {
          class: S(y.$style.sidebar)
        }, [B("div", {
          class: S(y.$style.sidebarInner)
        }, [B("div", {
          class: S(y.$style.navList)
        }, [(M(!0), N(s1, null, l1($(p), x => {
          var W, K;
          return M(), N("div", {
            key: x.key,
            class: S(y.$style.navGroup)
          }, [B("button", {
            type: "button",
            class: S([y.$style.navItem, x.active && y.$style.navItemActive, x.expand && y.$style.navItemExpand]),
            onClick: C => $(g)(x.key)
          }, [G(Q1, {
            name: x.label,
            fallback: x.icon || "setup",
            class: S(y.$style.navIconSvg)
          }, null, 8, ["name", "fallback", "class"]), B("span", {
            class: S(y.$style.navItemText)
          }, Y(x.label), 3), (W = x.children) != null && W.length ? (M(), t1(J, {
            key: 0,
            value: "angleRight",
            class: S(y.$style.navAngle)
          }, null, 8, ["class"])) : O("", !0)], 10, ce), x.expand && ((K = x.children) != null && K.length) ? (M(), N("div", {
            key: 0,
            class: S(y.$style.subnavList)
          }, [(M(!0), N(s1, null, l1(x.children, C => (M(), N("button", {
            key: C.key,
            type: "button",
            class: S([y.$style.subnavItem, C.active && y.$style.subnavItemActive]),
            onClick: D => $(u)(x.key, C.key)
          }, Y(C.label), 11, ue))), 128))], 2)) : O("", !0)], 2)
        }), 128))], 2)], 2)], 2), B("section", {
          class: S(y.$style.content)
        }, [B("div", {
          class: S(y.$style.iframeWrap)
        }, [$(c) ? (M(), N("iframe", {
          key: b.value,
          ref_key: "iframeRef",
          ref: A,
          name: V.value,
          src: $(c),
          frameborder: "0",
          width: "100%",
          height: "100%",
          class: S(y.$style.iframe),
          style: E1({
            height: `${L.value}px`
          }),
          onLoad: Z[0] || (Z[0] = (...x) => $(U) && $(U)(...x))
        }, null, 46, fe)) : (M(), N("div", {
          key: 1,
          class: S(y.$style.empty)
        }, " 请通过 `url` 查询参数传入 iframe 地址。 ", 2))], 2)], 2)], 2)], 2)
      }
    }
  }),
  he = "_page_1n5fh_7",
  pe = "_topNav_1n5fh_18",
  ge = "_main_1n5fh_24",
  ve = "_barWrap_1n5fh_32",
  me = "_content_1n5fh_42",
  ye = "_sidebar_1n5fh_50",
  Ce = "_sidebarInner_1n5fh_57",
  ke = "_navList_1n5fh_67",
  _e = "_navGroup_1n5fh_72",
  Le = "_navItem_1n5fh_76",
  be = "_navIcon_1n5fh_91",
  we = "_navIconSvg_1n5fh_100",
  Ie = "_navItemActive_1n5fh_124",
  Se = "_navAngle_1n5fh_137",
  $e = "_navItemText_1n5fh_141",
  Me = "_navItemExpand_1n5fh_164",
  Te = "_subnavList_1n5fh_168",
  He = "_subnavItem_1n5fh_172",
  Ne = "_subnavItemActive_1n5fh_190",
  Be = "_statusBar_1n5fh_204",
  Ee = "_topicBadge_1n5fh_216",
  Ae = "_topicAvatar_1n5fh_227",
  Ue = "_topicAvatarFallback_1n5fh_238",
  xe = "_topicName_1n5fh_243",
  Re = "_iframeWrap_1n5fh_251",
  je = "_iframe_1n5fh_251",
  Ve = "_empty_1n5fh_267",
  De = {
    page: he,
    topNav: pe,
    main: ge,
    barWrap: ve,
    content: me,
    sidebar: ye,
    sidebarInner: Ce,
    navList: ke,
    navGroup: _e,
    navItem: Le,
    navIcon: be,
    navIconSvg: we,
    navItemActive: Ie,
    navAngle: Se,
    navItemText: $e,
    navItemExpand: Me,
    subnavList: Te,
    subnavItem: He,
    subnavItemActive: Ne,
    statusBar: Be,
    topicBadge: Ee,
    topicAvatar: Ae,
    topicAvatarFallback: Ue,
    topicName: xe,
    iframeWrap: Re,
    iframe: je,
    empty: Ve
  },
  qe = {
    $style: De
  },
  Oe = u1(de, [
    ["__cssModules", qe]
  ]);
export {
  Oe as
  default
};
