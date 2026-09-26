var c = Object.defineProperty;
var a = Object.getOwnPropertySymbols;
var u = Object.prototype.hasOwnProperty,
  f = Object.prototype.propertyIsEnumerable;
var h = (t, e, i) => e in t ? c(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
  }) : t[e] = i,
  m = (t, e) => {
    for (var i in e || (e = {})) u.call(e, i) && h(t, i, e[i]);
    if (a)
      for (var i of a(e)) f.call(e, i) && h(t, i, e[i]);
    return t
  };
import {
  _ as l,
  J as d,
  m as p,
  i as b,
  Q as g,
  R as w
} from "./index-Xve1TSN5.js";
const k = {
    components: {},
    data() {
      return {
        frameLink: "",
        links: []
      }
    },
    computed: m({}, d(["menus"])),
    beforeMount() {
      this.menus.length > 0 && this.checkLinks(), window.addEventListener("message", this.receiveMessage, !1)
    },
    beforeUnmount() {
      window.removeEventListener("message", this.receiveMessage, !1), this.ifr && this.ifr.destroy()
    },
    methods: {
      initIframe() {
        this.$nextTick(() => {
          this.$refs.mngFrame && (this.ifr = g()(this.$refs.mngFrame), this.ifr.on("getLayoutInfo", w))
        })
      },
      receiveMessage(t) {
        let e = {};
        if (this.menus.length > 0) {
          for (let i = 0; i < this.menus.length; i++)
            if (this.menus[i].id === t.data.id) {
              e = this.menus[i];
              break
            } else if (this.menus[i].submenu && this.menus[i].submenu.length > 0 && (e = this.menus[i].submenu.find(s => s.id === t.data.id), e)) break
        }
        if (e.id)
          if (e.router === "frame") {
            const i = {
              furl: e.link
            };
            Object.assign(i, t.data.query), this.$router.push({
              name: e.router,
              query: i
            })
          } else this.$router.push({
            name: e.router
          })
      },
      recordCode() {
        const t = ["https://e.weibo.com/v1/public/stats/usergrowth", "https://e.weibo.com/v1/public/groupmsg/main", "https://e.weibo.com/v1/public/groupmsg/main", "https://e.weibo.com/v1/public/custommenu/main", "https://e.weibo.com/v1/public/foddermanage/list", "https://e.weibo.com/v1/public/devcenter/main"],
          e = ["https://e.weibo.com/v1/profit/record/profitrecord", "https://e.weibo.com/v1/public/paid/article", "https://e.weibo.com/v1/public/qa/answer", "https://e.weibo.com/v1/public/qa/getaccount", "https://pay.sc.weibo.com/center/pc/home/index"];
        this.frameLink.indexOf("friendchain") > 0 && this.actionLog({
          uicode: "20000370"
        }), this.frameLink.indexOf("lottery/startlist") > 0 && this.actionLog({
          uicode: "20000372"
        }), t.includes(this.frameLink) && this.actionLog({
          uicode: "20000371"
        }), e.includes(this.frameLink) && this.actionLog({
          uicode: "20000375"
        })
      },
      load() {
        if (this.$refs.mngFrame) try {
          let t = this.$refs.mngFrame.contentWindow.location.href;
          t = t.replace(/[?&]?(\w+)=(\w+)/g, "").split("#")[0], (t === "https://weibo.com/sorry?pagenotfound" || t === "https://weibo.com/") && (this.frameLink = "")
        } catch (t) {}
      },
      handleProto(t) {
        return t.startsWith("https:") ? t : `https:${t}`
      },
      isWeiboLive(t) {
        try {
          const {
            hostname: e,
            pathname: i
          } = t;
          return e.includes("weibo.com") && i.startsWith("/l/wblive")
        } catch (e) {
          return !1
        }
      },
      checkLinks() {
        const t = this.$route.query.furl,
          e = new URL(this.handleProto(t));
        if (this.isWeiboLive(e)) {
          window.location.replace("https://me.weibo.com/content/live");
          return
        }
        let i = !1;
        for (let s = 0; s < this.menus.length; s++)
          if (this.menus[s].submenu && this.menus[s].submenu.length > 0) {
            const n = this.menus[s].submenu;
            for (let r = 0; r < n.length; r++)
              if (n[r].link) {
                const o = new URL(this.handleProto(n[r].link));
                if (e.origin === o.origin && e.pathname === o.pathname) {
                  i = !0;
                  break
                }
              }
          } else if (this.menus[s].link) {
          const n = new URL(this.menus[s].link);
          if (e.origin === n.origin && e.pathname === n.pathname) {
            i = !0;
            break
          }
        }
        t === "https://dss.sc.weibo.com?sjzs=zhongxin" && (i = !0), i ? (this.frameLink = t, this.recordCode(), this.initIframe()) : this.$router.push("manage")
      }
    },
    watch: {
      $route() {
        this.checkLinks()
      },
      menus() {
        this.checkLinks()
      }
    }
  },
  L = ["src"];

function v(t, e, i, s, n, r) {
  return b(), p("iframe", {
    ref: "mngFrame",
    class: "mngFrame",
    src: n.frameLink,
    frameborder: "0",
    width: "100%",
    onLoad: e[0] || (e[0] = (...o) => r.load && r.load(...o))
  }, null, 40, L)
}
const _ = l(k, [
  ["render", v]
]);
export {
  _ as
  default
};
