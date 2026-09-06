(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-60593be8"], {
    "54c70": function(e, t, l) {
      e.exports = {
        gap1: "AudioAlbum_gap1_22zsg",
        top2: "AudioAlbum_top2_2NSaD",
        scroll: "AudioAlbum_scroll_22jHz",
        label2: "AudioAlbum_label2_mIk8T",
        albumIcon: "AudioAlbum_albumIcon_3PlVp",
        icon1: "AudioAlbum_icon1_2CLHm",
        add: "AudioAlbum_add_2I8wC",
        icon: "AudioAlbum_icon_1ctsH",
        bubble: "AudioAlbum_bubble_217pS"
      }
    },
    a53f: function(e, t, l) {
      "use strict";
      var u = l("54c70"),
        c = l.n(u);
      t["default"] = c.a
    },
    f1b6: function(e, t, l) {
      "use strict";
      l.r(t);
      var u = function() {
          var e = this,
            t = e.$createElement,
            l = e._self._c || t;
          return l("div", {
            class: e.$style.gap1
          }, [l("SwitchHeader", {
            attrs: {
              show: e.show,
              config: {
                title: "合集",
                sub_title: "添加合集，打造特色节目",
                pop: {
                  title: "微博合集",
                  desc: "合集功能可以让你对自己的多条音频作品进行分类管理。可以将不同主题的节目创建不同的合集"
                }
              }
            },
            on: {
              input: function(t) {
                e.show = !e.show
              }
            }
          }), e.show ? l("div", [l("div", {
            ref: "scrollEle",
            class: e.$style.scroll,
            on: {
              scroll: e.scroll
            }
          }, e._l(e.albumList, (function(t, u) {
            return l("woo-box", {
              key: u,
              class: e.$style.top2,
              attrs: {
                align: "center"
              }
            }, [l("woo-radio", {
              class: e.$style.label2,
              attrs: {
                cancel: "true",
                value: t.cluster_id_str
              },
              on: {
                change: e.checkEmpty
              },
              model: {
                value: e.selectId,
                callback: function(t) {
                  e.selectId = t
                },
                expression: "selectId"
              }
            }), l("woo-pop", {
              class: e.$style.bubble,
              staticStyle: {
                width: "100%"
              },
              attrs: {
                show: t.pop,
                bubble: "",
                gap: "10",
                direction: "up",
                align: "center",
                flow: ""
              },
              scopedSlots: e._u([{
                key: "ctrl",
                fn: function() {
                  return [l("div", {
                    staticClass: "wbpro-form"
                  }, [l("woo-box", {
                    attrs: {
                      align: "center"
                    }
                  }, [l("span", {
                    class: e.$style.albumIcon
                  }), l("woo-box-item", [l("input", {
                    attrs: {
                      type: "text",
                      disabled: ""
                    },
                    domProps: {
                      value: t.name
                    }
                  })]), l("div", {
                    staticClass: "num",
                    on: {
                      click: function(l) {
                        return e.edit(t, u)
                      }
                    }
                  }, [l("woo-button", {
                    attrs: {
                      sort: "simple",
                      kind: "default"
                    }
                  }, [e._v("编辑")])], 1)], 1)], 1)]
                },
                proxy: !0
              }], null, !0)
            }, [e._v(" 已自动为您创建合集 ")])], 1)
          })), 1), l("div", {
            class: e.$style.add,
            on: {
              click: e.add
            }
          }, [l("woo-fonticon", {
            class: e.$style.icon,
            attrs: {
              value: "add"
            }
          }), l("span", [e._v("添加合集")])], 1), l("AudioAlbumAddLayer", {
            attrs: {
              editObj: e.editObj,
              show: e.showAddLayer
            },
            on: {
              close: function(t) {
                e.showAddLayer = !1
              },
              change: e.addAlbum
            }
          })], 1) : e._e()], 1)
        },
        c = [],
        a = (l("e547"), l("5632"), l("83ef"), l("7431"), l("6f14")),
        o = l("100f"),
        n = l("f85b"),
        s = l("8e18"),
        i = {
          props: {
            cluster_id: {},
            is_new_cluster: {}
          },
          emits: ["change"],
          setup: function(e, t) {
            var l = t.emit,
              u = (t.root, Object(s["a"])()),
              c = u.isRss,
              i = Object(n["e"])(),
              r = i.proxy,
              d = Object(n["o"])(!1),
              b = Object(n["o"])(!1),
              p = Object(n["o"])(null),
              v = Object(n["o"])(),
              f = Object(n["o"])([]),
              _ = function() {
                r.$http.get("/ajax/multimedia/get_all", {
                  params: {
                    type: 3
                  }
                }).then((function(t) {
                  t.data.ok && t.data.data && (f.value = t.data.data, f.value.map((function(t, u) {
                    if (+t.cluster_id === +e.cluster_id) {
                      d.value = !0, v.value = t.cluster_id_str, l("change", [v.value]);
                      var c = f.value.splice(u, 1),
                        a = Object(o["a"])(c, 1),
                        n = a[0];
                      n.pop = !1, f.value.unshift(n), e.is_new_cluster && setTimeout((function() {
                        n.pop = !0, f.value.splice(0, 1, n), setTimeout((function() {
                          n.pop = !1, f.value.splice(0, 1, n)
                        }), 5e3)
                      }), 100)
                    }
                  })))
                }))
              };
            c.value || _(), Object(n["t"])((function() {
              return e.cluster_id
            }), (function() {
              d.value || (c.value ? _() : f.value.map((function(t, u) {
                if (+t.cluster_id === +e.cluster_id) {
                  d.value = !0, v.value = t.cluster_id_str, l("change", [v.value]);
                  var c = f.value.splice(u, 1),
                    a = Object(o["a"])(c, 1),
                    n = a[0];
                  n.pop = !1, f.value.unshift(n), e.is_new_cluster && setTimeout((function() {
                    n.pop = !0, f.value.splice(0, 1, n), setTimeout((function() {
                      n.pop = !1, f.value.splice(0, 1, n)
                    }), 5e3)
                  }), 100)
                }
              })))
            }));
            var m = Object(n["a"])((function() {
                return Boolean(v.value)
              })),
              h = function() {
                p.value = null, b.value = !0
              },
              w = Object(n["o"])(),
              A = function(e) {
                var t = e.name,
                  u = e.id,
                  c = e.type,
                  a = e.index,
                  o = e.cover;
                c ? f.value.splice(a, 1, {
                  name: t,
                  id: u,
                  cluster_id: u,
                  cluster_id_str: u,
                  checked: !0,
                  cover: o
                }) : (v.value = u, l("change", [v.value]), f.value.push({
                  name: t,
                  id: u,
                  cluster_id: u,
                  cluster_id_str: u,
                  checked: !0,
                  cover: o
                }), Object(n["g"])((function() {
                  w.value.scrollTop = w.value.scrollHeight
                })))
              },
              y = function(e, t) {
                p.value = Object(a["a"])(Object(a["a"])({}, e), {}, {
                  index: t
                }), b.value = !0
              },
              j = function() {
                v.value ? l("change", [v.value]) : (d.value = !1, l("change", ""))
              },
              g = function() {
                f.value = f.value.map((function(e) {
                  return e.pop = !1, e
                }))
              };
            return Object(n["l"])((function() {
              window.addEventListener("scroll", g)
            })), Object(n["m"])((function() {
              window.removeEventListener("scroll", g)
            })), {
              show: d,
              checkedNum: m,
              albumList: f,
              showAddLayer: b,
              editObj: p,
              selectId: v,
              scrollEle: w,
              checkEmpty: j,
              addAlbum: A,
              add: h,
              edit: y,
              scroll: g
            }
          },
          components: {
            SwitchHeader: function() {
              return l.e("chunk-d2bc8532").then(l.bind(null, "2adb"))
            },
            AudioAlbumAddLayer: function() {
              return l.e("chunk-0bf85f48").then(l.bind(null, "e94f"))
            }
          }
        },
        r = i,
        d = l("a53f"),
        b = l("04a2");

      function p(e) {
        this["$style"] = d["default"].locals || d["default"]
      }
      var v = Object(b["a"])(r, u, c, !1, p, null, null);
      t["default"] = v.exports
    }
  }
]);
