var I = (s, i, a) => new Promise((t, o) => {
  var n = r => {
      try {
        _(a.next(r))
      } catch (g) {
        o(g)
      }
    },
    c = r => {
      try {
        _(a.throw(r))
      } catch (g) {
        o(g)
      }
    },
    _ = r => r.done ? t(r.value) : Promise.resolve(r.value).then(n, c);
  _((a = a.apply(s, i)).next())
});
import {
  ax as S,
  r as h,
  b as x,
  ag as V
} from "./index-D53O_Npi.js";

function k(s = {}) {
  var i;
  return s.isAudio || s.isPanorama ? !1 : ((i = s.videoAssociateInfo) == null ? void 0 : i.show) === !0
}

function j(s = {}) {
  return !!(s.showOriginalVideoRelation && s.status === "success" && s.mediaId)
}

function b(s) {
  const i = String(s || "").trim(),
    a = i.match(/(?:fid=|\/tv\/show\/|\/show\?fid=)(?:1034:)?(\d+)/);
  return a ? {
    url: i,
    mediaId: a[1]
  } : null
}

function E() {
  const {
    post: s
  } = S(), i = h(!1), a = h(""), t = h("idle"), o = h(""), n = h({}), c = h(""), _ = x(() => t.value === "success"), r = x(() => t.value === "linking"), g = e => {
    a.value = e, t.value = "idle", o.value = "", n.value = {}, c.value = ""
  }, p = e => {
    V({
      act_code: 10317,
      ext: `channel:pc|result:${e}|type:analysis`
    })
  };
  return {
    enabled: i,
    url: a,
    status: t,
    errorText: o,
    videoInfo: n,
    mediaId: c,
    isSuccess: _,
    isLinking: r,
    updateUrl: g,
    relate: () => I(this, null, function*() {
      var m, l, f, w;
      if (r.value) return;
      const e = String(a.value || "").trim();
      if (!e) {
        t.value = "error", o.value = "仅支持挂载微博视频链接", c.value = "", n.value = {};
        return
      }
      t.value = "linking", o.value = "";
      try {
        const v = yield s("/ajax/video/publish_associate_video", {
          associate_url: e
        }), d = (m = v.data) == null ? void 0 : m.data;
        if (d != null && d.errmsg) throw new Error(d.errmsg);
        const u = (d == null ? void 0 : d.data) || d;
        if (!(u != null && u.video_id)) throw new Error(((l = v.data) == null ? void 0 : l.errmsg) || "仅支持挂载微博视频链接");
        a.value = e, c.value = u.video_id, n.value = {
          title: u.title || "原视频已关联",
          author: u.author || "",
          duration: u.duration || "",
          cover: u.cover_url || "",
          videoUrl: u.video_url || "",
          scheme: u.scheme || ""
        }, t.value = "success", p(1)
      } catch (v) {
        t.value = "error", o.value = ((w = (f = v == null ? void 0 : v.response) == null ? void 0 : f.data) == null ? void 0 : w.errmsg) || (v == null ? void 0 : v.message) || "仅支持挂载微博视频链接", c.value = "", n.value = {}, p(0)
      }
    }),
    clear: () => {
      a.value = "", t.value = "idle", o.value = "", n.value = {}, c.value = ""
    },
    restore: (e = {}) => {
      var f, w;
      const m = e.video_associate_id || ((f = e.manual_split) == null ? void 0 : f.origin_media_id);
      if (!m) return;
      const l = e.associateVideo || e.video_associate_info || e.associate_video_info || {};
      i.value = !0, a.value = l.video_url || e.video_associate_url || ((w = e.manual_split) == null ? void 0 : w.origin_url) || `https://weibo.com/tv/show/1034:${m}`, t.value = "success", o.value = "", c.value = String(m), n.value = {
        title: l.title || "原视频已关联",
        author: l.author || "",
        duration: l.duration || "",
        cover: l.cover_url || "",
        videoUrl: l.video_url || "",
        scheme: l.scheme || ""
      }
    },
    parseOriginalVideoUrl: b
  }
}
export {
  j as a, k as s, E as u
};
