var x = (a, r, e) => new Promise((t, l) => {
  var n = u => {
      try {
        h(e.next(u))
      } catch (g) {
        l(g)
      }
    },
    c = u => {
      try {
        h(e.throw(u))
      } catch (g) {
        l(g)
      }
    },
    h = u => u.done ? t(u.value) : Promise.resolve(u.value).then(n, c);
  h((e = e.apply(a, r)).next())
});
import {
  aC as O,
  r as _,
  b as y,
  ag as R
} from "./index-Xve1TSN5.js";

function $(a = {}) {
  var r;
  return a.isAudio || a.isPanorama ? !1 : ((r = a.videoAssociateInfo) == null ? void 0 : r.show) === !0
}

function B(a = {}) {
  return !!(a.showOriginalVideoRelation && a.status === "success" && a.mediaId)
}

function U(a) {
  const r = String(a || "").trim(),
    e = r.match(/(?:fid=|\/tv\/show\/|\/show\?fid=)(?:1034:)?(\d+)/);
  return e ? {
    url: r,
    mediaId: e[1]
  } : null
}

function C() {
  const {
    post: a
  } = O(), r = _(!1), e = _(""), t = _("idle"), l = _(""), n = _({}), c = _(""), h = y(() => t.value === "success"), u = y(() => t.value === "linking"), g = s => {
    e.value = s, t.value = "idle", l.value = "", n.value = {}, c.value = ""
  }, w = s => {
    R({
      act_code: 10317,
      ext: `channel:pc|result:${s}|type:analysis`
    })
  };
  return {
    enabled: r,
    url: e,
    status: t,
    errorText: l,
    videoInfo: n,
    mediaId: c,
    isSuccess: h,
    isLinking: u,
    updateUrl: g,
    relate: (...p) => x(this, [...p], function*(s = {}) {
      var f, I, S, V;
      if (u.value) return;
      const i = String(s.associateId || "").trim(),
        m = String(e.value || "").trim();
      if (!i && !m) {
        t.value = "error", l.value = "仅支持挂载微博视频链接", c.value = "", n.value = {};
        return
      }
      t.value = "linking", l.value = "";
      try {
        const b = yield a("/ajax/video/publish_associate_video", i ? {
          associate_id: i
        } : {
          associate_url: m
        }), d = (f = b.data) == null ? void 0 : f.data;
        if (d != null && d.errmsg) throw new Error(d.errmsg);
        const o = (d == null ? void 0 : d.data) || d;
        if (!(o != null && o.video_id)) throw new Error(((I = b.data) == null ? void 0 : I.errmsg) || "仅支持挂载微博视频链接");
        e.value = m || o.video_url || "", c.value = o.video_id, n.value = {
          title: o.title || "原视频已关联",
          author: o.author || "",
          duration: o.duration || "",
          cover: o.cover_url || "",
          videoUrl: o.video_url || "",
          scheme: o.scheme || ""
        }, t.value = "success", w(1)
      } catch (v) {
        t.value = "error", l.value = ((V = (S = v == null ? void 0 : v.response) == null ? void 0 : S.data) == null ? void 0 : V.errmsg) || (v == null ? void 0 : v.message) || "仅支持挂载微博视频链接", c.value = "", n.value = {}, w(0)
      }
    }),
    clear: () => {
      e.value = "", t.value = "idle", l.value = "", n.value = {}, c.value = ""
    },
    restore: (s = {}) => {
      var m, f;
      const p = s.video_associate_id || ((m = s.manual_split) == null ? void 0 : m.origin_media_id);
      if (!p) return;
      const i = s.associateVideo || s.video_associate_info || s.associate_video_info || {};
      r.value = !0, e.value = i.video_url || s.video_associate_url || ((f = s.manual_split) == null ? void 0 : f.origin_url) || `https://weibo.com/tv/show/1034:${p}`, t.value = "success", l.value = "", c.value = String(p), n.value = {
        title: i.title || "原视频已关联",
        author: i.author || "",
        duration: i.duration || "",
        cover: i.cover_url || "",
        videoUrl: i.video_url || "",
        scheme: i.scheme || ""
      }
    },
    parseOriginalVideoUrl: U
  }
}
export {
  B as a, $ as s, C as u
};
