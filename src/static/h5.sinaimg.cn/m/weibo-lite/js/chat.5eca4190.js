(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chat"], {
    "097e": function(e, t, i) {
      "use strict";
      i("f4c7")
    },
    "0d25": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return e.msg.attachment && e.msg.attachment.original_image && e.msg.attachment.original_image.url ? i("div", {
            staticClass: "bubble-box-img",
            class: e.picClass,
            on: {
              click: function(t) {
                return e.onGallery(e.msg.attachment)
              }
            }
          }, [i("img", {
            ref: "image",
            attrs: {
              src: e.msg.attachment.thumbnail ? e.msg.attachment.thumbnail.url : e.msg.attachment.original_image.url
            },
            on: {
              load: e.onImgLoaded
            }
          })]) : e._e()
        },
        a = [],
        o = i("383a"),
        s = {
          name: "card2",
          data: function() {
            return {}
          },
          methods: {
            onGallery: function(e) {
              var t = this.$refs.image,
                i = e.original_image.width,
                n = e.original_image.height,
                a = t.naturalWidth ? t.naturalHeight / t.naturalWidth : 0;
              a > 1 ? i = n / a : a > 0 && (n = i * a);
              var s = [{
                src: e.original_image.url,
                w: i,
                h: n,
                msrc: e.thumbnail.url,
                el: t
              }];
              o["a"].$emit("mvGallery", 0, s)
            },
            onImgLoaded: function(e) {
              var t = this.msg.attachment;
              t.width && t.height || (t.width = e.target.naturalWidth, t.height = e.target.naturalHeight)
            }
          },
          created: function() {},
          computed: {
            picClass: function() {
              if (1 === this.msg.media_type) {
                var e = this.msg.attachment.original_image.width,
                  t = this.msg.attachment.original_image.height,
                  i = e > t ? e : t,
                  n = e > t ? t : e;
                if (3 * n >= i && n <= i) {
                  var a = "bubble-box-cut1";
                  return i >= 150 ? "".concat(a, e > t ? " bubble-box-cutwl" : " bubble-box-cuthl") : n <= 50 ? "".concat(a, e > t ? " bubble-box-cuths" : " bubble-box-cutws") : a
                }
                if (3 * n < i) return e > t ? "bubble-box-cut2 bubble-box-cutwl" : "bubble-box-cut2 bubble-box-cuthl"
              }
              return ""
            }
          },
          components: {},
          watch: {},
          props: ["msg"]
        },
        r = s,
        c = i("da34"),
        l = Object(c["a"])(r, n, a, !1, null, null, null);
      t["default"] = l.exports
    },
    1451: function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", [e.showTime ? i("div", {
            staticClass: "lite-bubble-time"
          }, [e._v("\n    " + e._s(e._f("timeFormat")(e.msg.created_at)) + "\n  ")]) : e._e(), i("div", {
            staticClass: "lite-bubble-list",
            class: e.config.uid == e.msg.sender_id ? "bubble-r" : "bubble-l"
          }, [e.isNotice ? i("div", [i("p", {
            staticClass: "notice-wrap"
          }, [i("span", {
            staticClass: "notice",
            domProps: {
              innerHTML: e._s(e.msg.text)
            }
          })])]) : i("div", {
            staticClass: "m-box"
          }, [i("div", {
            staticClass: "m-box-col m-avatar-box avatar-box",
            on: {
              click: e.gotoProfile
            }
          }, [i("div", {
            staticClass: "m-img-box"
          }, [i("img", {
            staticStyle: {
              width: "2.5rem",
              height: "2.5rem"
            },
            attrs: {
              src: e.users[e.msg.sender_id].profile_image_url
            }
          })])]), i("div", {
            staticClass: "m-box-col content-wrap"
          }, [i("div", {
            staticClass: "m-text-box"
          }, [i("h4", {
            domProps: {
              textContent: e._s(e.msg.sender_screen_name)
            }
          }), i("div", {
            staticClass: "m-box content-box"
          }, [i(e.card, {
            tag: "component",
            attrs: {
              msg: e.msg
            }
          }), e.config.uid == e.msg.sender_id && e.msg.failed ? i("div", {
            staticClass: "m-box-center-a bubble-icons",
            on: {
              click: function(t) {
                return e.onRetry(e.msg)
              }
            }
          }, [e._m(0)]) : e._e()], 1)])]), e.config.uid == e.msg.sender_id && e.msg.loading ? i("div", {
            staticClass: "m-box-center-a bubble-icons"
          }, [e._m(1)]) : e._e()])])])
        },
        a = [function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("a", {
            staticClass: "m-btn-round m-btn-ltred m-btn-large",
            attrs: {
              href: "javascript:;",
              ontouchstart: ""
            }
          }, [i("i", {
            staticClass: "m-font m-font-repeat"
          })])
        }, function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "m-loading m-loading-dark"
          }, [i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span"), i("span")])
        }],
        o = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("b5d2")),
        s = (i("0ef1"), i("19d6"));

      function r(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), i.push.apply(i, n)
        }
        return i
      }

      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2 ? r(Object(i), !0).forEach((function(t) {
            Object(o["a"])(e, t, i[t])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
          }))
        }
        return e
      }

      function l(e) {
        if (e.text && !e.attachment) return "card1";
        var t = e.attachment;
        if (t) {
          if (t.original_image && t.original_image.url) return "card2";
          if ("amr" === t.extension && t.fid) return "card4";
          if (t.extension && t.fid) return "card5"
        }
        return "card-unsupported"
      }
      var d = {
          name: "dm",
          props: {
            msg: {
              type: Object
            },
            users: {
              type: Object
            },
            showTime: {
              type: Boolean
            },
            isNotice: {
              type: Boolean
            },
            index: {
              type: Number
            },
            unread: {
              type: Boolean
            }
          },
          data: function() {
            return {
              card: ""
            }
          },
          mounted: function() {
            this.msg.offsetHeight = this.$el.offsetHeight
          },
          computed: c({}, Object(s["c"])(["config"])),
          methods: {
            gotoProfile: function() {
              var e = this.users[this.msg.sender_id];
              window.WeiboJSBridge ? window.location.href = "sinaweibo://userinfo?uid=".concat(e.id) : this.$router.push({
                path: "/profile/".concat(e.id),
                query: {
                  user_token: e.user_token
                }
              })
            },
            onRetry: function(e) {
              var t = {
                content: e.text,
                fids: e.attachment ? e.attachment.fids : ""
              };
              this.$emit("onRetry", t, this.index, e.attachment)
            }
          },
          created: function() {
            this.card = l(this.msg)
          },
          components: {
            card1: i("fbc0").default,
            card2: i("0d25").default,
            card3: i("cab1").default,
            card4: i("1bfe").default,
            card5: i("264d").default,
            cardUnsupported: i("574e").default
          }
        },
        u = d,
        m = (i("e5f8"), i("da34")),
        h = Object(m["a"])(u, n, a, !1, null, null, null);
      t["default"] = h.exports
    },
    "1bfe": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "bubble-box"
          }, [i("div", {
            staticClass: "bubble-box-sound",
            on: {
              click: e.play
            }
          }, [i("div", {
            staticClass: "duration"
          }, [e.errorMsg ? i("span", [e._v(e._s(e.errorMsg))]) : e.duration > 0 && e.duration < 120 ? i("span", [e._v(e._s(e.duration) + "''")]) : e._e()]), i("div", {
            staticClass: "sound",
            class: {
              playing: e.playing
            }
          })]), e.errorMsg ? i("a", {
            staticClass: "download-icon",
            attrs: {
              href: e.msg.attachment.url,
              download: e.msg.attachment.filename
            },
            on: {
              click: function(e) {
                e.stopPropagation()
              }
            }
          }, [i("i", {
            staticClass: "m-font m-font-download"
          })]) : e._e(), i("audio", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !1,
              expression: "false"
            }],
            ref: "sound",
            attrs: {
              preload: "",
              src: e.msg.attachment.url
            },
            on: {
              pause: e.pause,
              error: e.onerror
            }
          }, [e._v("\n    [语音]\n  ")])])
        },
        a = [],
        o = {
          data: function() {
            return {
              playing: !1,
              canplay: !0,
              sound_el: null,
              duration: "",
              errorMsg: ""
            }
          },
          methods: {
            pause: function() {
              this.playing = !1
            },
            play: function() {
              if (!this.errorMsg) {
                var e = this.$refs.sound;
                e.paused ? (e.play(), this.playing = !0) : (e.pause(), this.playing = !1)
              }
            },
            onerror: function() {
              this.errorMsg = "语音加载失败"
            }
          },
          created: function() {
            this.duration = +this.msg.attachment.soundtime
          },
          name: "card4",
          props: ["msg"]
        },
        s = o,
        r = (i("9f01"), i("da34")),
        c = Object(r["a"])(s, n, a, !1, null, "458ae943", null);
      t["default"] = c.exports
    },
    "1dae": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "lite-page-editor"
          }, [e.showReal ? i("miniComposer", {
            ref: "compose",
            attrs: {
              uploadImage: "",
              limitLetter: 300,
              placeholder: e.placeholder,
              content: e.content,
              show: e.showReal,
              emotion: e.showEmotion
            },
            on: {
              "update:content": function(t) {
                e.content = t
              },
              "update:show": function(t) {
                e.showReal = t
              },
              "update:emotion": function(t) {
                e.showEmotion = t
              },
              onSendable: e.onSendable,
              uploadImage: e.onUploadImage,
              onSend: e.composeSendTextMsg,
              pickImage: e.pickImage
            }
          }) : i("div", {
            staticClass: "m-box"
          }, [i("div", {
            staticClass: "box-left m-box-col m-box-center-a",
            on: {
              click: e.onFocus
            }
          }, [i("span", {
            staticClass: "m-box-center-a main-text m-text-cut",
            class: {
              focus: !e.content
            }
          }, [e._v(e._s(e.content || e.placeholder || "说点什么"))])]), i("div", {
            staticClass: "box-right m-box-center-a"
          }, [i("span", {
            staticClass: "lite-iconf lite-iconf-emote",
            on: {
              click: e.composeShowEmotion
            }
          }), i("label", {
            staticClass: "lite-iconf lite-iconf-pic",
            attrs: {
              for: e.isWeiboApp ? "" : "selectphoto"
            },
            on: {
              click: e.pickImage
            }
          }), i("button", {
            staticClass: "btn-send",
            class: {
              disable: !e.sendable
            },
            on: {
              click: function(t) {
                return e.composeSendTextMsg()
              }
            }
          }, [e._v("\n        发送\n      ")])])]), i("input", {
            ref: "imagefile",
            staticClass: "m-rfile",
            attrs: {
              id: "selectphoto",
              type: "file",
              accept: "image/gif,image/jpeg,image/jpg,image/png"
            },
            on: {
              change: e.onUploadImage
            }
          })], 1)
        },
        a = [],
        o = (i("b17c"), i("4294"), i("383a")),
        s = i("685a"),
        r = {
          props: ["placeholder"],
          data: function() {
            return {
              showEmotion: !1,
              showReal: "iOS" === s["a"].os,
              content: "",
              sendable: !1,
              isWeiboApp: !!window.WeiboJSBridge
            }
          },
          created: function() {
            var e = this;
            document.addEventListener("keydown", e.keySend)
          },
          mounted: function() {},
          computed: {},
          watch: {
            showReal: function() {
              "iOS" === s["a"].os && (this.showReal = !0)
            }
          },
          methods: {
            pickImage: function() {
              var e = this,
                t = window.WeiboJSBridge;
              t && t.invoke("pickImage", {
                count: 1,
                return_ids: !0,
                filter: !0,
                domain: window.location.host
              }, (function(t, i) {
                if (i) {
                  var n = new XMLHttpRequest,
                    a = t.resource_ids[0].replace(/^http:/, window.location.protocol);
                  n.open("GET", a, !0), n.responseType = "blob", n.onreadystatechange = function() {
                    n.readyState === n.DONE && (200 === n.status && n.response ? e.$emit("getImgFromApp", n.responseURL || a, n.response) : o["a"].$emit("mvToast", {
                      text: "客户端内读取图片出错"
                    }))
                  }, n.send()
                }
              }))
            },
            keySend: function(e) {
              (e.ctrlKey || e.metaKey) && 13 === e.keyCode && (e.preventDefault(), this.$refs.compose.cleanText(), this.composeSendTextMsg())
            },
            onFocus: function() {
              this.showReal = !0
            },
            onSendable: function(e) {
              this.sendable = e
            },
            composerSuccess: function() {
              this.showReal = !1
            },
            composeShowEmotion: function() {
              this.showReal = !0, this.showEmotion = !0
            },
            composeSendTextMsg: function(e) {
              if (this.sendable || e.fids) {
                var t = {
                  content: this.content.trim()
                };
                e && Object.assign(t, e), this.content = "", this.$emit("onSendMsg", t)
              }
            },
            onUploadImage: function(e) {
              var t = e.target.files;
              t && t.length > 0 && (t[0].size < 5242880 ? this.$emit("onUploadImage", t[0]) : o["a"].$emit("mvToast", {
                text: "文件过大<br/>请使用客户端上传"
              }), e.target.value = "")
            }
          },
          destroyed: function() {
            var e = this;
            document.removeEventListener("keydown", e.keySend)
          },
          components: {
            miniComposer: function() {
              return Promise.all([i.e("vendor"), i.e("chat-composer-miniComposer"), i.e("composer-miniComposer"), i.e("miniComposer")]).then(i.bind(null, "3fc9"))
            }
          }
        },
        c = r,
        l = i("da34"),
        d = Object(l["a"])(c, n, a, !1, null, null, null);
      t["default"] = d.exports
    },
    "1fc5": function(e, t, i) {},
    "264d": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {
            staticClass: "bubble-box bubble-box-file",
            class: {
              "bubble-box-video": e.isVideo
            },
            on: {
              click: e.playVideo
            }
          }, [e.isVideo ? n("i", {
            staticClass: "m-font m-font-play"
          }) : n("img", {
            attrs: {
              src: i("eb1a")
            }
          }), n("div", {
            staticClass: "filename"
          }, [e._v("\n    " + e._s(e.msg.attachment.filename) + "\n  ")]), n("a", {
            staticClass: "download-icon",
            attrs: {
              href: e.msg.attachment.url,
              download: e.msg.attachment.filename
            },
            on: {
              click: function(e) {
                e.stopPropagation()
              }
            }
          }, [n("i", {
            staticClass: "m-font m-font-download"
          })])])
        },
        a = [],
        o = (i("92dc"), i("383a")),
        s = {
          name: "card5",
          props: ["msg"],
          data: function() {
            return {
              isVideo: !1
            }
          },
          methods: {
            playVideo: function() {
              this.isVideo && o["a"].$emit("playVideo", {
                src: this.msg.attachment.url
              })
            }
          },
          created: function() {
            var e = ["mp4"];
            this.isVideo = e.includes(this.msg.attachment.extension)
          },
          computed: {}
        },
        r = s,
        c = (i("097e"), i("da34")),
        l = Object(c["a"])(r, n, a, !1, null, "298c4bfb", null);
      t["default"] = l.exports
    },
    "3f14": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "chat-page-wrap"
          }, [e.isWeiboApp ? e._e() : i("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [i("div", {
            staticClass: "nav-left",
            on: {
              click: function(t) {
                return e.$router.go(-1)
              }
            }
          }, [i("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), i("div", {
            staticClass: "nav-main"
          }, [i("h4", {
            domProps: {
              textContent: e._s(e.title)
            }
          })]), i("div", {
            staticClass: "nav-right"
          }, [e.isGroup ? i("i", {
            staticClass: "m-font m-font-dot-more",
            on: {
              click: e.showGroupInfo
            }
          }) : e._e()])]), i("div", {
            ref: "mainBody",
            staticClass: "main-wrap",
            style: {
              scrollBehavior: e.scrollBehavior ? "smooth" : ""
            }
          }, [i("mv-loadmore", {
            attrs: {
              topMethod: e.getOldMsg,
              showArrow: !e.oldMsgEmpty,
              topPullText: e.pullFreshText,
              topLoadingText: e.pullFreshText
            }
          }, e._l(e.msgs, (function(t, n) {
            return i("dm", {
              key: t.id,
              attrs: {
                msg: t,
                index: n,
                users: e.users,
                unread: e.lastRead < t.id,
                isNotice: !e.isGroup && 9 === t.dm_type || e.checktype(t),
                showTime: !e.msgs[n - 1] || new Date(t.created_at) - new Date(e.msgs[n - 1].created_at) > 3e5
              },
              on: {
                onRetry: e.onSendMsg
              }
            })
          })), 1)], 1), i("composer", {
            ref: "composer",
            attrs: {
              placeholder: "说点什么",
              tuid: e.chatId
            },
            on: {
              onSendMsg: e.onSendMsg,
              onUploadImage: e.onUploadImage,
              getImgFromApp: e.getImgFromApp
            }
          }), i("pop-video")], 1)
        },
        a = [],
        o = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("4437"), i("4294"), i("b17c"), i("b5d2")),
        s = i("383a"),
        r = i("19d6"),
        c = i("5d2d"),
        l = i("685a");

      function d(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t && (n = n.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          }))), i.push.apply(i, n)
        }
        return i
      }

      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2 ? d(Object(i), !0).forEach((function(t) {
            Object(o["a"])(e, t, i[t])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : d(Object(i)).forEach((function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
          }))
        }
        return e
      }
      i("3e74");
      var m = 3e3,
        h = 1e3,
        g = 10,
        p = m,
        f = 0,
        b = 0,
        v = g,
        w = null,
        x = null;

      function C(e, t, i) {
        var n = 0,
          a = 0,
          o = [];
        while (n < e.length && a < t.length) e[n][i] > t[a][i] ? o.push(t[a++]) : e[n][i] < t[a][i] ? o.push(e[n++]) : (o.push(e[n++]), ++a);
        return n === e.length ? o.concat(t.slice(a)) : o.concat(e.slice(n)), o
      }

      function y(e) {
        var t = document.createElement("div");
        return t.appendChild(document.createTextNode(e)), t.innerHTML
      }

      function A(e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.innerText || t.textContent
      }
      var O = {
          data: function() {
            return {
              isGroup: 0,
              chatId: "",
              title: "",
              msgs: [],
              users: {},
              oldMsgEmpty: !1,
              newMsgLoading: !1,
              isWeiboApp: !(!window.WeiboJSBridge && "Weibo" !== l["a"].browser && "wbchaohua" !== l["a"].browser),
              unfollowing: this.$route.query.unfollowing || 0,
              lastRead: 0,
              scrollBehavior: 0,
              curMainbodyHeight: 0
            }
          },
          metaInfo: function() {
            return {
              title: this.title
            }
          },
          created: function() {
            this.$store.dispatch("clearUnreadTimer"), this.$route.query.gid ? (this.isGroup = 1, this.chatId = this.$route.query.gid) : this.chatId = this.$route.query.uid, this.chatId ? this.init() : s["a"].$emit("mvMsgbox", {
              type: "alert",
              text: "用户或群聊不存在"
            })
          },
          mounted: function() {
            var e = this,
              t = this;
            window.addEventListener("orientationchange", t.initVisibleAreaState), x = setInterval((function() {
              e.$refs.mainBody && (e.curMainbodyHeight = e.$refs.mainBody.getBoundingClientRect().height)
            }), 500)
          },
          computed: u({
            pullFreshText: function() {
              return this.oldMsgEmpty ? "已无更早的私信" : "更早前的私信"
            }
          }, Object(r["c"])(["config"])),
          methods: {
            initVisibleAreaState: function() {
              this.curMainbodyHeight = 0
            },
            init: function() {
              var e = this;
              this.getMsg().then((function(t) {
                e.getUserInfo(), w = setInterval((function() {
                  e.getNewMsg()
                }), h), t && (e.msgs = t, b = t[t.length - 1].id, e.$nextTick((function() {
                  var t = e.$refs.mainBody;
                  t.scrollTop = t.scrollHeight, e.scrollBehavior = 1
                })))
              }))
            },
            getMsg: function(e) {
              var t = this,
                i = {
                  count: g
                };
              this.$route.query && this.$route.query.ext && (i.ext = this.$route.query.ext), this.isGroup ? i["gid"] = this.chatId : (i["uid"] = this.chatId, i["unfollowing"] = this.unfollowing), e && Object.assign(i, e);
              var n = this.isGroup ? "api/groupchat/list" : "api/chat/list";
              return this.$http.get(n, {
                params: i
              }).then((function(e) {
                if (e.data.ok) {
                  var i = e.data.data;
                  if (t.lastRead = i.last_read_mid || 0, t.title = i.title || t.title, i.msgs && i.msgs.length) {
                    var n = t.isGroup ? i.msgs : i.msgs.reverse();
                    return i.users && Object.assign(t.users, i.users), n
                  }
                }
                return null
              })).catch((function() {
                clearInterval(w)
              }))
            },
            getOldMsg: function() {
              var e = this;
              if (this.oldMsgEmpty) s["a"].$emit("mvLoadEnd");
              else {
                this.scrollBehavior = 0;
                var t = this.msgs && this.msgs.length ? this.msgs[0].id : 0,
                  i = {
                    max_id: t
                  };
                this.isGroup && (i = {
                  max_mid: t
                }), this.getMsg(i).then((function(t) {
                  t ? (e.msgs = t.slice(0, -1).concat(e.msgs), s["a"].$emit("mvLoadEnd"), t.length <= 1 ? e.oldMsgEmpty = !0 : e.$nextTick((function() {
                    var i = e.$refs.mainBody;
                    i.scrollTop = e.msgs.slice(0, t.length - 1).reduce((function(e, t) {
                      return e + t.offsetHeight
                    }), 0), e.scrollBehavior = 1
                  }))) : e.oldMsgEmpty = !0
                }))
              }
            },
            getNewMsg: function() {
              var e = this;
              if (!(this.newMsgLoading || Date.now() - f < p)) {
                f = Date.now(), this.newMsgLoading = !0;
                var t = {
                  since_id: b,
                  is_continuous: 1,
                  count: v
                };
                this.getMsg(t).then((function(t) {
                  if (e.newMsgLoading = !1, t) {
                    p = m;
                    var i = 0;
                    if (e.msgs.length)
                      for (var n = e.msgs.length - 1; n >= 0; n--) {
                        if (e.msgs[n].id === b) break;
                        i--
                      }
                    if (i) {
                      var a = e.msgs.splice(i),
                        o = C(a, t, "id");
                      e.msgs = e.msgs.concat(o)
                    } else e.msgs = e.msgs.length ? e.msgs.concat(t) : t;
                    t.length === v ? (p = 1e3, v = Math.min(v << 1, 50)) : v = Math.max(v >> 1, g);
                    var s = e.$refs.mainBody;
                    s.scrollTop + s.offsetHeight + 50 >= s.scrollHeight && e.$nextTick((function() {
                      s.scrollTop = s.scrollHeight
                    })), b = t[t.length - 1].id
                  } else p = Math.min(1e4, p + h)
                }))
              }
            },
            pushFakeMsg: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = this.msgs.length ? this.msgs[this.msgs.length - 1].id : 0,
                a = u({
                  created_at: new Date,
                  id: n + 1,
                  failed: !1,
                  loading: !0,
                  text: y(t.content),
                  media_type: 0,
                  sender_id: this.config.uid
                }, i);
              this.isGroup && (a.type = 321), a.attachment && t.media_type && (a.media_type = t.media_type), this.msgs.push(a), this.$nextTick((function() {
                var t = e.$refs.mainBody;
                t && (t.scrollTop = t.scrollHeight)
              }))
            },
            sendMsg: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
                n = arguments.length > 2 ? arguments[2] : void 0,
                a = i || this.msgs.length - 1;
              this.msgs[a].loading = !0, this.msgs[a].failed = !1, this.isGroup ? t["gid"] = this.chatId : t["uid"] = this.chatId;
              var o = t;
              o.content && "number" === typeof i && (o.content = A(o.content));
              var r = this.isGroup ? "api/groupchat/send" : "api/chat/send";
              this.$http.post(r, o).then((function(t) {
                if (e.msgs[a].loading = !1, t.data.ok) {
                  if (e.unfollowing) {
                    var i = u({}, e.$route.query);
                    delete i.unfollowing, e.$router.replace({
                      query: i
                    })
                  }
                  var o = t.data.data;
                  if (o.msgs) {
                    e.msgs.splice(a, 1);
                    var r = o.msgs[0],
                      c = e.msgs.length ? e.msgs[e.msgs.length - 1].id : 0;
                    e.isGroup && r && !r.sender_id && (r.from_user && r.from_user.id && (e.users[r.from_user.id] = r.from_user), r = {
                      created_at: 1e3 * r.time,
                      text: r.content,
                      attachment: n,
                      type: 321,
                      id: +r.mid || 0,
                      sender_id: r.from_user && r.from_user.id,
                      sender_screen_name: r.from_user && r.from_user.screen_name,
                      media_type: r.media_type,
                      url_objects: 11 === r.media_type
                    }), c < r.id && e.msgs.push(r)
                  }
                  o.users && Object.assign(e.users, o.users), p = 1
                } else e.msgs[a].failed = !0, s["a"].$emit("mvToast", {
                  text: t.data.msg
                })
              })).catch((function() {
                e.msgs[a].loading = !1, e.msgs[a].failed = !0, s["a"].$emit("mvToast", {
                  text: "发送失败"
                })
              }))
            },
            onSendMsg: function(e, t, i) {
              void 0 !== t && null !== t || this.pushFakeMsg(e, {
                attachment: i
              }), i && i.file ? this.onUploadImage(i.file, t) : this.sendMsg(e, t)
            },
            getImgFromApp: function(e, t) {
              var i = {
                attachment: {
                  file: t,
                  original_image: {
                    url: e
                  }
                },
                loading: !1
              };
              this.pushFakeMsg({
                media_type: 1
              }, i), this.onUploadImage(t, this.msgs.length - 1)
            },
            onUploadImage: function() {
              var e, t = this,
                i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
                a = {
                  media_type: 1
                };
              if (e = 0 === n ? n : n || this.msgs.length, void 0 === n || null === n) {
                var o = {
                  file: i,
                  original_image: {
                    url: window.URL.createObjectURL(i)
                  }
                };
                this.pushFakeMsg(a, {
                  attachment: o
                })
              } else {
                if (this.msgs[n].loading) return;
                this.msgs[n].loading = !0
              }
              var s = new FormData;
              s.append("file", i), s.append(this.isGroup ? "tochatid" : "tuid", this.chatId), this.$http.post("api/chat/upload", s).then((function(i) {
                if (!(i.data.ok > 0)) throw new Error({
                  msg: i.data.msg
                });
                window.URL.revokeObjectURL(t.msgs[e].attachment.original_image.url), a.fids = i.data.data.fids, t.sendMsg(a, e, i.data.data)
              })).catch((function(i) {
                throw t.msgs[e].loading = !1, t.msgs[e].failed = !0, new Error(i)
              }))
            },
            getUserInfo: function() {
              var e = this,
                t = this.config.uid;
              if (!this.users[t]) {
                var i = {};
                if (!c["a"].hasData("h5_cur_user_last_time") || (new Date).getTime() >= c["a"].getData("h5_cur_user_last_time") ? c["a"].removeData("h5_cur_user") : c["a"].hasData("h5_cur_user") && (i = c["a"].getData("h5_cur_user")), t && +i.id === +t) {
                  var n = {};
                  n[t] = i, Object.assign(this.users, n)
                } else this.$http.get("api/users/show").then((function(i) {
                  if (i.data.ok > 0) {
                    var n = i.data.data;
                    c["a"].setData("h5_cur_user", n);
                    var a = n.profile_image_url.match(/(\?|&)expires=([^&?]*)/i),
                      o = a ? a[2] : (new Date).getTime() + 36e5;
                    c["a"].setData("h5_cur_user_last_time", o);
                    var s = {};
                    s[t] = n, Object.assign(e.users, s)
                  }
                }))
              }
            },
            showGroupInfo: function() {
              var e = this,
                t = e.$route.query.gid,
                i = [{
                  text: "查看群信息",
                  method: function() {
                    if ("PC" === l["a"].device) window.location.href = "https://weibo.com/p/230491".concat(t);
                    else {
                      var e = "sinaweibo://groupinfo?group_id=".concat(t);
                      window.location.href = "https://m.weibo.cn/feature/openapp?scheme=".concat(encodeURIComponent(e))
                    }
                  }
                }, {
                  text: "退出该群",
                  method: function() {
                    s["a"].$emit("mvMsgbox", {
                      title: "确定要退出群聊？",
                      text: "退出该群后，将不再接收群消息",
                      type: "confirm",
                      btnText: "退出"
                    }, (function() {
                      s["a"].$emit("mvMsgbox", !1), e.$http.post("/api/groupchat/quite", {
                        gid: t
                      }).then((function(t) {
                        t.data && 1 === t.data.ok ? e.$router.replace({
                          path: "/message"
                        }) : s["a"].$emit("mvToast", {
                          type: "error",
                          text: t.data && t.data.msg || "退群失败"
                        })
                      })).catch((function() {
                        s["a"].$emit("mvToast", {
                          type: "error",
                          text: "网络错误"
                        })
                      }))
                    }))
                  }
                }];
              s["a"].$emit("mvActionSheet", i, "取消")
            },
            checktype: function(e) {
              return !!e.type && (321 != e.type || 321 == e.type && e.sub_type > 0 || 321 == e.type && 9 === e.dm_type && 0 === e.sub_type)
            }
          },
          watch: {
            curMainbodyHeight: function(e, t) {
              if (t && e) {
                var i = this.$refs.mainBody;
                i.scrollTop + i.offsetHeight < i.scrollHeight && (i.scrollTop += t - e)
              }
            }
          },
          destroyed: function() {
            var e = this;
            window.removeEventListener("orientationchange", e.initVisibleAreaState), clearInterval(w), clearInterval(x), "msg" === this.$route.params["0"] && this.$store.dispatch("unreadAction")
          },
          components: {
            composer: i("1dae").default,
            dm: i("1451").default,
            popVideo: function() {
              return i.e("chunk-4d847fb4").then(i.bind(null, "8eec"))
            }
          }
        },
        _ = O,
        I = (i("fbec"), i("da34")),
        $ = Object(I["a"])(_, n, a, !1, null, "55701476", null);
      t["default"] = $.exports
    },
    "574e": function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "bubble-box"
          }, [e._v("\n  [当前版本暂不支持查看此类消息]\n")])
        },
        a = [],
        o = {
          name: "card-unsupported"
        },
        s = o,
        r = i("da34"),
        c = Object(r["a"])(s, n, a, !1, null, "d17b8b2a", null);
      t["default"] = c.exports
    },
    "685a": function(e, t, i) {
      "use strict";
      i("0ef1"), i("436f"), i("4294"), i("4437");
      t["a"] = function() {
        var e = {},
          t = window.navigator.userAgent,
          i = {
            Trident: t.indexOf("Trident") > -1 || t.indexOf("NET CLR") > -1,
            Presto: t.indexOf("Presto") > -1,
            WebKit: t.indexOf("AppleWebKit") > -1,
            Gecko: t.indexOf("Gecko/") > -1,
            Safari: t.match(/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i) || t.match(/version\/([\w\.]+).+?(mobile\s?safari|safari)/i),
            Chrome: t.indexOf("Chrome") > -1 || t.match(/((?:android.+)crmo|crios)\/([\w\.]+)/i),
            IE: t.match(/(?:ms|\()(ie)\s([\w\.]+)/i) || t.match(/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i),
            Edge: t.match(/(edge)\/((\d+)?[\w\.]+)/i),
            Firefox: t.indexOf("Firefox") > -1 || t.match(/fxios\/([\w\.-]+)/i),
            "Firefox Focus": t.indexOf("Focus") > -1,
            Chromium: t.indexOf("Chromium") > -1,
            Opera: t.indexOf("Opera") > -1 || t.match(/\s(opr)\/([\w\.]+)/i),
            Vivaldi: t.indexOf("Vivaldi") > -1,
            Yandex: t.match(/(yabrowser)\/([\w\.]+)/i),
            Kindle: t.match(/(kindle)\/([\w\.]+)/i),
            360: t.indexOf("360EE") > -1 || t.indexOf("360SE") > -1,
            UC: t.match(/(uc\s?browser)[\/\s]?([\w\.]+)/i) || t.match(/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i) || t.match(/(ucbrowser)\/([\w\.]+)/i) || t.match(/juc.+(ucweb)[\/\s]?([\w\.]+)/i),
            QQBrowser: t.match(/m?(qqbrowser)[\/\s]?([\w\.]+)/i),
            Baidu: t.indexOf("Baidu") > -1 || t.indexOf("BIDUBrowser") > -1,
            Maxthon: t.indexOf("Maxthon") > -1,
            Sogou: t.indexOf("MetaSr") > -1 || t.indexOf("Sogou") > -1,
            LBBROWSER: t.indexOf("LBBROWSER") > -1,
            XiaoMi: t.match(/xiaomi\/miuibrowser\/([\w\.]+)/i),
            Wechat: t.match(/(micromessenger)\/([\w\.]+)/i),
            Taobao: t.indexOf("AliApp(TB") > -1,
            Alipay: t.indexOf("AliApp(AP") > -1,
            Weibo: t.match(/Weibo\s*\((.*?)\)/i),
            wbchaohua: t.indexOf("wbchaohua") > -1,
            SinaNews: t.indexOf("sinanews") > -1,
            baidumap_IPHO: t.indexOf("baidumap_IPHO") > -1,
            QQ: t.indexOf("QQ/") > -1,
            Windows: t.match(/microsoft\s(windows)\s(vista|xp)/i) || t.match(/(windows)\snt\s6\.2;\s(arm)/i),
            "Mac OS": t.match(/(mac\sos\sx)\s?([\w\s\.]+\w)*/i) || t.match(/(macintosh|mac(?=_powerpc)\s)/i),
            Android: t.indexOf("Android") > -1,
            "Windows Phone": t.indexOf("IEMobile") > -1,
            iOS: t.match(/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i),
            Mobile: t.indexOf("Mobile") > -1 || t.indexOf("iPhone") > -1 || t.indexOf("480") > -1,
            Tablet: t.indexOf("Tablet") > -1 || t.indexOf("Pad") > -1 || t.indexOf("Nexus 7") > -1
          },
          n = {
            engine: ["WebKit", "Trident", "Gecko", "Presto"],
            browser: ["Chrome", "Safari", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Kindle", "360", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "XiaoMi", "Wechat", "Taobao", "Alipay", "Weibo", "SinaNews", "wbchaohua", "baidumap_IPHO"],
            os: ["Windows", "Mac OS", "Android", "iOS", "Windows Phone"],
            device: ["Mobile", "Tablet"]
          };
        for (var a in e.device = "PC", n)
          for (var o = 0; o < n[a].length; o += 1) {
            var s = n[a][o];
            s && i[s] && (e[a] = s)
          }
        var r = {
          Windows: function() {
            var e = t.replace(/^.*Windows NT ([\d.]+);.*$/, "$1"),
              i = {
                6.4: "10",
                6.3: "8.1",
                6.2: "8",
                6.1: "7",
                "6.0": "Vista",
                5.2: "XP",
                5.1: "XP",
                "5.0": "2000"
              };
            return i[e] || e
          },
          "Mac OS": function() {
            return t.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".")
          },
          Android: function() {
            return t.replace(/^.*Android ([\d.]+);.*$/, "$1")
          },
          iOS: function() {
            return t.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".")
          },
          "Windows Phone": function() {
            return t.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2")
          }
        };
        e.osVersion = "", r[e.os] && (e.osVersion = r[e.os](), e.osVersion === t && (e.osVersion = ""));
        var c = {
          Safari: function() {
            return t.replace(/^.*Version\/([\d.]+).*$/, "$1")
          },
          Chrome: function() {
            return t.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1")
          },
          IE: function() {
            return t.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1")
          },
          Edge: function() {
            return t.replace(/^.*Edge\/([\d.]+).*$/, "$1")
          },
          Firefox: function() {
            return t.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1")
          },
          "Firefox Focus": function() {
            return t.replace(/^.*Focus\/([\d.]+).*$/, "$1")
          },
          Chromium: function() {
            return t.replace(/^.*Chromium\/([\d.]+).*$/, "$1")
          },
          Opera: function() {
            return t.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1")
          },
          Vivaldi: function() {
            return t.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1")
          },
          Yandex: function() {
            return t.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1")
          },
          Kindle: function() {
            return t.replace(/^.*Version\/([\d.]+).*$/, "$1")
          },
          Maxthon: function() {
            return t.replace(/^.*Maxthon\/([\d.]+).*$/, "$1")
          },
          QQBrowser: function() {
            return t.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1")
          },
          Baidu: function() {
            return t.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1")
          },
          UC: function() {
            return t.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1").replace(/juc.+(ucweb)[\/\s]?([\w\.]+)/i, "$1")
          },
          Sogou: function() {
            return t.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1")
          },
          XiaoMi: function() {
            return t.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1")
          },
          Wechat: function() {
            return t.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1")
          },
          Taobao: function() {
            return t.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1")
          },
          Alipay: function() {
            return t.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1")
          },
          Weibo: function() {
            var e = [];
            try {
              e = t.match(/__weibo__(\d+?.\d+?.\d+)__(.+)?__/)
            } catch (i) {
              console.log(i)
            }
            return !e || !e.length || e.length < 2 ? "" : e[1]
          },
          QQ: function() {
            return t.replace(/^.*QQ\/([\d.]+).*$/, "$1")
          }
        };
        return e.version = "", c[e.browser] && (e.version = c[e.browser](), e.version === t && (e.version = "")), "Edge" === e.browser ? e.engine = "EdgeHTML" : ("Chrome" === e.browser && parseInt(e.version, 10) > 27 || "Opera" === e.browser && parseInt(e.version, 10) > 12 || "Yandex" === e.browser) && (e.engine = "Blink"), e.versionCompare = function(e, t) {
          for (var i = e.indexOf("_") > -1 ? e.split("_") : e.split("."), n = t.indexOf("_") > -1 ? t.split("_") : t.split("."), a = Math.max(i.length, n.length), o = 0; o < a; o += 1) {
            var s = Number(i[o]) || 0,
              r = Number(n[o]) || 0;
            if (s > r) return 1;
            if (r > s) return -1
          }
          return 0
        }, e
      }()
    },
    "74ce": function(e, t, i) {},
    "9f01": function(e, t, i) {
      "use strict";
      i("74ce")
    },
    b059: function(e, t, i) {},
    cab1: function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "bubble-box",
            domProps: {
              innerHTML: e._s(e.msg.text)
            }
          })
        },
        a = [],
        o = {
          name: "card3",
          props: ["msg"]
        },
        s = o,
        r = i("da34"),
        c = Object(r["a"])(s, n, a, !1, null, null, null);
      t["default"] = c.exports
    },
    e5f8: function(e, t, i) {
      "use strict";
      i("b059")
    },
    eb1a: function(e, t) {
      e.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAA8CAYAAADPAlLCAAAAAXNSR0IArs4c6QAABBFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOkE5REY2OTFERDk4OTExRTVCMzhEQzdGMDlEMTk2NEQ0PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOkE2NDY0MzgzRDk0RDExRTVCMzhEQzdGMDlEMTk2NEQ0PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOkE2NDY0Mzg0RDk0RDExRTVCMzhEQzdGMDlEMTk2NEQ0PC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOkE5REY2OTFDRDk4OTExRTVCMzhEQzdGMDlEMTk2NEQ0PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kcd4ZzQAABAFJREFUaAXtWktLG1EYnYmJRiTSxGeREHxATCsV6kLpprTQdShUVy1d9Fd00eLGTemif6Bk0aUguLOULqzFjdiNWPCxChQCgo8G38b0O6OnXIabNmYmyQTmws33zXdf53xn7s31YW5vb49dXl6+NwzjjtSQ1KqXYrEYlPpheHj4rRuLmZubmz97enpSbW1thmmaN55TwFhjaPFAX7X0C4WCcXZ2Zuzu7hrn5+eZVCr1CkOsSSr8MLe2topDQ0MVDr8aRoC0iNJXLXxUkDg8PDTy+bwhpFYlkY/S6XS+UhCBSrJvX4xz0KKdvmrhowaDQSMUChlNTU1GZ2fnmLxW2bW1tQcYZp+7nOdAOZ3K6aOCZX97jCQAvqWlxap7e3tGb2/vLXleWl9ffz09PX1jTDceQIA6aweNPvYYiUCN1tZWqx2x/v7+gKgyMzU1NTc/Px/RzV8q5ioJHWhdDKChRnNzs1WxN0Cqu7vb6OrqSieTye+Li4vxUqDtcddJ6EDrYiAC4OFw2NrkPABEDRC5Jyfm0vLyclknTlVI6EDrYtwbIHR8fIwuVonFYlAl0dHR8W1lZSXJeClbNRJYEOBUq/pooxogc3JyYvXlRzQahSK329vbvwqRAcZ1tqoksOD/iAQCAWtf2Elg7DWRvkgk8kVerT7EdKXqJLDov4hwg+tIYOw1kQF5tT4vLCzEELOXmpDAoqWIQAl8Z+A6glMKZLjJCRZ7ROrdRCIxl8lkwozTBunUwoIIANJiTZCgGrlc7i8MHr8giBNMlMDYh+Pj45nJycnns7OzBXY25RZbHBwc5HNNLDNNe3FxYR2zp6enuBRaqsjN2rLsA+Kyya0E7OzsvBkZGZkRsNbFsS4kkCmCg0UFaJAheFgQQgyVPuJQTo7kl6Ojo58wVd1I2IngGYXkAJaEsF9ABEphz+AGLF+Uv/f39x9PTEys1pWECprgdTEqxZ9FQEQIgPCPbDb7pKYbGwDthZucFu30VYsDAM94lXCNx8Y/ODi4H4/H39XsiLWDV58BDoVW9RmDZQUJ3IBxzxJyzzxBQgdaFyMJtEERXCChkGdI6EDrYioR+p4ioQOtixE82lA8RwKgAFK1qq+20fckCR1oXczzJHSgS8U8qwQAozDbtLqY50noQKsx+A1BQgWtU6RhSJQi0lBKACwKlaBFrKGUAGAUEqBtSBIqEfgNS0Il0tAkQATFJ3GVh/p/+krUX4MrBL4SvhIuZsB/nVxMpqOpfCUcpc/Fwb4SLibT0VS+Eo7S5+JgXwkXk+loKl8JR+lzcbCvhIvJdDSVr4Sj9Lk4OCB/tf91dHTk4pS1mwq45VeZWXNjY+OpOB/lT6nR2i3vzkryHwY5wf7iDxzhjqpremxnAAAAAElFTkSuQmCC"
    },
    f4c7: function(e, t, i) {},
    fbc0: function(e, t, i) {
      "use strict";
      i.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", {
            staticClass: "bubble-box",
            domProps: {
              innerHTML: e._s(e.msg.text)
            },
            on: {
              contextmenu: function(t) {
                return t.preventDefault(), t.stopPropagation(), e.onCopy.apply(null, arguments)
              }
            }
          })
        },
        a = [],
        o = (i("4294"), i("383a")),
        s = {
          name: "card1",
          methods: {
            onCopy: function(e) {
              var t = e.currentTarget.innerHTML.replace(/alt="([^"]+)"/g, ">$1<").replace(/<[^>]*>/g, ""),
                i = [{
                  text: "复制",
                  method: function() {
                    var e = document.createElement("input");
                    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e)
                  }
                }];
              o["a"].$emit("mvActionSheet", i)
            }
          },
          props: ["msg"]
        },
        r = s,
        c = i("da34"),
        l = Object(c["a"])(r, n, a, !1, null, null, null);
      t["default"] = l.exports
    },
    fbec: function(e, t, i) {
      "use strict";
      i("1fc5")
    }
  }
]);
//# sourceMappingURL=chat.5eca4190.js.map
