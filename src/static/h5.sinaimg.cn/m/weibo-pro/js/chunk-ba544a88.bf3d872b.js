(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-ba544a88"], {
    6471: function(t, i, e) {
      t.exports = {
        ai: "AiAudio_ai_U4t5x",
        box: "AiAudio_box_3ZKwr",
        cpic: "AiAudio_cpic_2Brxn",
        t1: "AiAudio_t1_21hqP",
        t2: "AiAudio_t2_2ek34",
        t3: "AiAudio_t3_3b-W4"
      }
    },
    a7be: function(t, i, e) {
      "use strict";
      e.r(i);
      var o = function() {
          var t = this,
            i = t.$createElement,
            e = t._self._c || i;
          return e("woo-box", {
            class: t.$style.box,
            attrs: {
              justify: "between",
              align: "center"
            }
          }, [e("woo-box", {
            staticStyle: {
              "min-width": "0"
            }
          }, [e("woo-picture", {
            class: t.$style.cpic,
            attrs: {
              src: t.aiPublish.cover
            }
          }), e("woo-box", {
            staticStyle: {
              "min-width": "0"
            },
            attrs: {
              direction: "y",
              justify: "center"
            }
          }, [e("woo-box", [e("Icons", {
            class: t.$style.ai,
            attrs: {
              symbol: "audioAi"
            }
          }), e("div", {
            class: t.$style.t1
          }, [t._v(t._s(t.aiPublish.title))]), t.aiPublish.description ? e("woo-divider", {
            attrs: {
              direction: "y",
              "border-color": "var(--w-video-dash)"
            }
          }) : t._e(), e("div", {
            class: t.$style.t2
          }, [t._v(t._s(t.newDescription))])], 1), e("div", {
            class: t.$style.t3
          }, [t._v(t._s(t.aiPublish.sub_title))])], 1)], 1), e("div", [e("woo-button", {
            attrs: {
              size: "s"
            },
            on: {
              click: t.goToDetail
            }
          }, [t._v(t._s(t.text))])], 1)], 1)
        },
        n = [],
        a = (e("3778"), e("8f0c"), e("1734")),
        s = {
          name: "AiAudio",
          props: {
            aiPublish: {
              type: Object,
              default: function() {
                return {}
              }
            }
          },
          data: function() {
            return {}
          },
          created: function() {
            this.actionLog({
              act_code: "8343"
            })
          },
          computed: {
            text: function() {
              var t, i;
              return (null === (t = this.aiPublish) || void 0 === t || null === (i = t.button) || void 0 === i ? void 0 : i.text) || "去看看"
            },
            newDescription: function() {
              var t, i = null === (t = this.aiPublish) || void 0 === t ? void 0 : t.description;
              if (!i) return "";
              var e = 16,
                o = this.calculateMixedLength(i);
              if (o <= e) return "根据热搜#".concat(i, "#生成");
              var n = 0,
                a = "";
              while (n < i.length) {
                if (this.calculateMixedLength(a + i[n]) > e) break;
                a += i[n], n++
              }
              return "根据热搜#".concat(a, "...#生成")
            }
          },
          methods: {
            goToDetail: function() {
              var t, i;
              this.actionLog({
                act_code: "8344"
              }), window.open(null === (t = this.aiPublish) || void 0 === t || null === (i = t.button) || void 0 === i ? void 0 : i.url, "_blank")
            },
            calculateMixedLength: function(t) {
              var i, e = 0,
                o = Object(a["a"])(t);
              try {
                for (o.s(); !(i = o.n()).done;) {
                  var n = i.value;
                  e += /[\u4e00-\u9fa5]/.test(n) ? 1 : .5
                }
              } catch (s) {
                o.e(s)
              } finally {
                o.f()
              }
              return e
            }
          }
        },
        c = s,
        l = e("efe0"),
        u = e("04a2");

      function r(t) {
        this["$style"] = l["default"].locals || l["default"]
      }
      var d = Object(u["a"])(c, o, n, !1, r, null, null);
      i["default"] = d.exports
    },
    efe0: function(t, i, e) {
      "use strict";
      var o = e("6471"),
        n = e.n(o);
      i["default"] = n.a
    }
  }
]);
