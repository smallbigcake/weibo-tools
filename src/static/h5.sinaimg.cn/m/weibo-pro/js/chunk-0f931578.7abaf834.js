(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-0f931578"], {
    "4a46": function(t, o, e) {
      "use strict";
      var n = e("c4dc"),
        c = e.n(n);
      o["default"] = c.a
    },
    be14: function(t, o, e) {
      "use strict";
      e.r(o);
      var n = function() {
          var t = this,
            o = t.$createElement,
            e = t._self._c || o;
          return t.isAudio && t.show ? e("div", {
            class: [t.$style.container, "woo-pop-main"],
            style: t.curStyle
          }, [e("div", {
            class: t.$style.title
          }, [t._v(t._s(t.curOption.title))]), e("div", {
            class: t.$style.desc,
            domProps: {
              innerHTML: t._s(t.curOption.desc)
            }
          }), e("div", {
            class: t.$style.close,
            on: {
              click: t.close
            }
          }, [e("woo-fonticon", {
            attrs: {
              value: "cross"
            }
          })], 1), e("div", {
            class: t.$style.btn
          }, [e("woo-button", {
            attrs: {
              sort: "flat",
              fluid: ""
            },
            on: {
              click: t.close
            }
          }, [t._v("我知道了")])], 1)]) : t._e()
        },
        c = [],
        i = (e("1d2e"), e("f85b")),
        a = e("8e18"),
        l = {
          setup: function() {
            var t, o = Object(a["a"])(),
              e = o.isAudio,
              n = Object(i["e"])(),
              c = n.proxy,
              l = Object(i["o"])(!1),
              s = [{
                background: "https://h5.sinaimg.cn/upload/100/1474/2024/04/22/audio_compose_prompt_background.png",
                key: "mobile_can_audio",
                title: "手机端支持音频发布了",
                desc: "打开微博发布器，点击右下角+，选择“音频”，即可发布，更多问题请查看微博 <a target=\"_blank\" href='//weibo.com/ttarticle/p/show?id=2309404991583169675468'>音频发布流程</a>"
              }],
              u = Object(i["a"])((function() {
                for (var t = 0; t < s.length; t++) {
                  var o, e;
                  if (0 === (null === (o = window) || void 0 === o || null === (e = o.$CONFIG) || void 0 === e ? void 0 : e.flags[s[t].key])) return s[t]
                }
                return null
              })),
              r = Object(i["a"])((function() {
                return {
                  background: "url(".concat(u.value.background, ")"),
                  backgroundSize: "cover"
                }
              })),
              d = function() {
                l.value = !1, c.$http.post("/ajax/changekey", {
                  key: u.value.key
                }).then((function(t) {
                  var o = t.data;
                  o.ok > 0 && o.data && o.data.result
                }))
              };
            return (null === (t = u.value) || void 0 === t ? void 0 : t.key) && (l.value = !0), {
              curStyle: r,
              curOption: u,
              options: s,
              show: l,
              isAudio: e,
              close: d
            }
          }
        },
        s = l,
        u = e("4a46"),
        r = e("04a2");

      function d(t) {
        this["$style"] = u["default"].locals || u["default"]
      }
      var v = Object(r["a"])(s, n, c, !1, d, null, null);
      o["default"] = v.exports
    },
    c4dc: function(t, o, e) {
      t.exports = {
        container: "AudioAction_container_3OBM-",
        title: "AudioAction_title_3wZNn",
        desc: "AudioAction_desc_1MnJ1",
        btn: "AudioAction_btn_1GnIz",
        close: "AudioAction_close_19ODn"
      }
    }
  }
]);
