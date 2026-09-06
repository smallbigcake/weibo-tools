(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["miniComposer"], {
    "111e": function(t, e, i) {
      "use strict";
      i("b4bc")
    },
    "3fc9": function(t, e, i) {
      "use strict";
      i.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", [i("div", {
            staticClass: "composer-mini-wrap"
          }, [i("div", {
            staticClass: "flex-col focus"
          }, [i("div", {
            staticClass: "textarea-box"
          }, [i("textarea", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.inputText,
              expression: "inputText"
            }],
            ref: "textarea",
            staticClass: "textarea",
            attrs: {
              rows: "1",
              placeholder: t.placeholder || "发表评论"
            },
            domProps: {
              value: t.inputText
            },
            on: {
              click: function(e) {
                t.showEmotion = !1
              },
              input: [function(e) {
                e.target.composing || (t.inputText = e.target.value)
              }, t.moveCurPos],
              blur: t.areaBlur
            }
          }), i("textarea", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.inputText,
              expression: "inputText"
            }],
            ref: "shadow",
            staticClass: "textarea shadow",
            attrs: {
              rows: "1"
            },
            domProps: {
              value: t.inputText
            },
            on: {
              input: function(e) {
                e.target.composing || (t.inputText = e.target.value)
              }
            }
          })]), i("div", {
            staticClass: "flex-row composer-mini-bar"
          }, [i("div", {
            staticClass: "words-count",
            class: {
              limit: t.textLimit < 0
            },
            domProps: {
              textContent: t._s(t.displayWordsCount)
            }
          }), i("span", {
            staticClass: "lite-iconf",
            class: t.showEmotion ? "lite-iconf-edit" : "lite-iconf-emote",
            on: {
              click: t.onShowEmotion
            }
          }), t.uploadImage ? i("label", {
            staticClass: "lite-iconf lite-iconf-pic",
            attrs: {
              for: t.isWeiboApp ? "" : "selectphoto"
            },
            on: {
              click: t.pickImage
            }
          }) : t._e(), t.sendable ? i("button", {
            staticClass: "btn-send",
            on: {
              click: t.send
            }
          }, [t._v("发送")]) : i("button", {
            staticClass: "btn-send disable"
          }, [t._v("发送")])])])]), i("keep-alive", [t.showEmotion ? i("emotion", {
            on: {
              callback: t.addEmotion,
              hide: function(e) {
                t.showEmotion = !1
              }
            }
          }) : t._e()], 1), i("transition", {
            attrs: {
              name: "fadeInRightBig"
            }
          }, [i("keep-alive", [t.showContact ? i("contact", {
            on: {
              callback: t.addFriend
            }
          }) : t._e()], 1)], 1)], 1)
        },
        n = [],
        s = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("b17c"), i("b5d2")),
        a = (i("0ef1"), i("08ff")),
        r = i("685a");

      function c(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(t);
          e && (o = o.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, o)
        }
        return i
      }

      function u(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? c(Object(i), !0).forEach((function(e) {
            Object(s["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : c(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      i("3e74");
      var h = {
          name: "mini-composer",
          created: function() {
            var t = this;
            document.body.addEventListener("touchstart", t.hideMenu), this.showEmotion = this.emotion, this.getBaseinfo(), this.curpos = this.content.length
          },
          mounted: function() {
            this.showEmotion || this.areaFocus()
          },
          props: {
            show: {
              type: Boolean,
              default: !0
            },
            content: {
              type: String
            },
            placeholder: {
              type: String,
              default: ""
            },
            prefix: {
              type: String,
              default: ""
            },
            mid: {
              type: String
            },
            reply: {
              type: String
            },
            uploadImage: {
              type: Boolean,
              default: !1
            },
            limitLetter: {
              default: 140,
              type: Number
            },
            emotion: {
              type: Boolean
            }
          },
          data: function() {
            return {
              inputText: "",
              showEmotion: !1,
              curpos: 0,
              cid: "",
              isWeiboApp: !(!window.WeiboJSBridge && "Weibo" !== r["a"].browser) && "iOS" !== r["a"].os
            }
          },
          watch: {
            inputText: function(t, e) {
              var i = this;
              if (this.$emit("update:content", t), this.$nextTick((function() {
                  i.$refs.textarea.style.height = "".concat(i.$refs.shadow.scrollHeight, "px")
                })), t.length - e.length === 1) {
                var o = t.substring(this.curpos - 1, this.curpos),
                  n = u({
                    contact: 1
                  }, this.$route.query);
                "@" === o && (this.$router.push({
                  query: n
                }), this.areaBlur())
              }
            },
            reply: function() {
              this.getBaseinfo()
            },
            mid: function() {
              this.getBaseinfo()
            },
            showEmotion: function(t) {
              t ? this.$refs.textarea.blur() : "iOS" !== r["a"].os && this.areaFocus()
            }
          },
          computed: {
            showContact: function() {
              return this.$route.query.contact
            },
            wordsCount: function() {
              return Object(a["a"])(this.inputText.trim(), this.limitLetter)
            },
            textLimit: function() {
              return this.limitLetter - this.wordsCount
            },
            displayWordsCount: function() {
              return this.textLimit < 11 ? this.textLimit : ""
            },
            sendable: function() {
              var t = !(this.textLimit < 0 || !this.wordsCount);
              return this.$emit("onSendable", t), t
            }
          },
          methods: {
            onShowEmotion: function() {
              this.showEmotion = !this.showEmotion, this.showEmotion ? this.$refs.textarea.blur() : "iOS" !== r["a"].os && this.areaFocus()
            },
            addFriend: function(t) {
              this.addString("".concat(t, " ")), this.$router.go(-1), this.areaFocus()
            },
            areaFocus: function() {
              var t = this,
                e = this.$refs.textarea;
              e.focus(), this.$nextTick((function() {
                e.setSelectionRange(t.curpos, t.curpos)
              }))
            },
            areaBlur: function() {
              this.moveCurPos()
            },
            pickImage: function() {
              this.isWeiboApp && this.$emit("pickImage")
            },
            init: function() {
              this.cid = "", this.inputText = "", this.showEmotion = !1, this.$emit("update:emotion", !1), this.$emit("update:content", this.inputText), this.$refs.textarea.focus()
            },
            cleanText: function() {
              this.inputText = ""
            },
            hideMenu: function(t) {
              var e = t.target;
              while (this.$el !== e && document.body !== e) e = e.parentNode;
              e !== this.$el && (this.$emit("update:emotion", !1), this.$emit("update:show", !1))
            },
            getBaseinfo: function() {
              this.inputText = this.content, this.reply && (this.cid = this.reply)
            },
            send: function() {
              var t = this,
                e = {
                  content: this.prefix + this.inputText.trim()
                },
                i = "";
              if (this.mid && (i = "api/comments/create", Object.assign(e, {
                  mid: this.mid
                }), this.cid && (i = "api/comments/reply", Object.assign(e, {
                  cid: this.cid
                }))), this._events.onSend) return this.$emit("onSend", e), void this.init();
              i && this.$http.post(i, e).then((function(e) {
                e.data.ok > 0 && (t.init(), t.$emit("success", e.data.data))
              }))
            },
            addEmotion: function(t) {
              this.addString(t)
            },
            addString: function(t) {
              var e = this.curpos,
                i = this.inputText.substring(0, e) + t;
              this.inputText = i + this.inputText.substring(e), this.curpos = i.length
            },
            moveCurPos: function() {
              this.$refs.textarea && (this.curpos = this.$refs.textarea.selectionStart)
            }
          },
          components: {
            emotion: i("f697").default,
            contact: i("1192").default
          },
          destroyed: function() {
            var t = this;
            document.body.removeEventListener("click", t.hideMenu)
          }
        },
        d = h,
        p = (i("111e"), i("da34")),
        l = Object(p["a"])(d, o, n, !1, null, null, null);
      e["default"] = l.exports
    },
    b4bc: function(t, e, i) {}
  }
]);
//# sourceMappingURL=miniComposer.5046c385.js.map
