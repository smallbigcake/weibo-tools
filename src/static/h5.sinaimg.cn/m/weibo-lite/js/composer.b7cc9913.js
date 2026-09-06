(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["composer"], {
    "155c": function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("transition", {
            attrs: {
              name: "composeFadeInRightBig"
            },
            on: {
              "after-enter": t.areaFocus
            }
          }, [i("div", {
            staticClass: "m-wrapper m-wbox"
          }, [i("div", {
            staticClass: "m-pos-f m-box-model m-main"
          }, [i("header", {
            staticClass: "m-box-model m-fd-row m-reles-top m-justify-bet m-aln-center m-lim-width"
          }, [i("div", {
            staticClass: "m-box m-flex-grow1 m-alnf-sth m-aln-center m-flex-base0",
            on: {
              click: t.go
            }
          }, [i("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), i("div", {
            staticClass: "m-box m-box-model m-flex-grow1 m-aln-center m-flex-base0"
          }, [0 == t.type ? i("img", {
            staticClass: "m-ruser-img",
            attrs: {
              alt: "",
              src: t.userInfo.profile_image_url
            }
          }) : i("h1", [t._v(t._s(t.pubinfo.title))])]), i("div", {
            staticClass: "m-box m-flex-grow1 m-box-model m-fd-row m-aln-center m-justify-end m-flex-base0"
          }, [i("a", {
            staticClass: "m-send-btn",
            class: {
              disabled: !t.isAbleToSend
            },
            on: {
              click: function(e) {
                return e.preventDefault(), t.sendmessage()
              }
            }
          }, [t._v("\n            发送\n          ")])])]), i("main", {
            staticClass: "m-reles-con m-lim-width m-box-model m-flex-shrink1 m-flex-grow1",
            on: {
              click: function(e) {
                return e.target !== e.currentTarget ? null : t.areaFocus.apply(null, arguments)
              }
            }
          }, [i("content-text", {
            ref: "contentText",
            attrs: {
              draggable: "true",
              type: t.type,
              limit: t.textLimit
            },
            on: {
              drop: function(e) {
                return e.preventDefault(), t.onDrop.apply(null, arguments)
              },
              dragover: function(t) {
                t.preventDefault()
              }
            }
          }), i("photo", {
            ref: "photo"
          }), 1 === t.type ? i("small-card", {
            on: {
              setContentText: t.setContentText,
              setRepostChain: t.onSetRepostChain
            }
          }) : t._e()], 1), i("footer", {
            staticClass: "m-box-model m-lim-width",
            staticStyle: {
              overflow: "hidden"
            }
          }, [t.$route.query.editId ? t._e() : i("div", {
            staticClass: "m-fcb-col m-fd-row m-box-model"
          }, [1 === t.type || 2 === t.type || 4 === t.type ? i("label", {
            staticClass: "m-checkbox"
          }, [i("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.dualPost,
              expression: "dualPost"
            }],
            attrs: {
              type: "checkbox"
            },
            domProps: {
              checked: Array.isArray(t.dualPost) ? t._i(t.dualPost, null) > -1 : t.dualPost
            },
            on: {
              change: function(e) {
                var i = t.dualPost,
                  n = e.target,
                  r = !!n.checked;
                if (Array.isArray(i)) {
                  var o = null,
                    s = t._i(i, o);
                  n.checked ? s < 0 && (t.dualPost = i.concat([o])) : s > -1 && (t.dualPost = i.slice(0, s).concat(i.slice(s + 1)))
                } else t.dualPost = r
              }
            }
          }), i("span", [i("i", {
            staticClass: "m-font m-font-check"
          })]), t._v("\n            " + t._s(1 === t.type ? "同时评论" : "同时转发") + "\n          ")]) : t._e(), i("div", {
            staticStyle: {
              flex: "1"
            }
          }), 0 === t.type || 1 === t.type ? i("div", {
            staticClass: "visible",
            on: {
              click: t.visibleChange
            }
          }, [0 == t.visible ? i("h4", {
            staticClass: "iconf iconf_compose_earth"
          }, [t._v("\n              公开\n            ")]) : 6 == t.visible ? i("h4", {
            staticClass: "iconf iconf_compose_heart"
          }, [t._v("\n              好友圈\n            ")]) : 1 == t.visible ? i("h4", {
            staticClass: "iconf iconf_compose_lock"
          }, [t._v("\n              私密\n            ")]) : t._e()]) : t._e()]), i("div", {
            staticClass: "composer-footer m-fd-row"
          }, [i("div", {
            staticClass: "composer-footer-box m-ctrl-box m-box-center-a"
          }, [i("label", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "m-iconf-col m-box-center m-box-center-a",
            attrs: {
              for: t.imgUplaodDisable ? "" : "selectphoto"
            }
          }, [i("h4", {
            staticClass: "lite-iconf lite-iconf-pic",
            class: t.imgUplaodDisable ? "disable" : ""
          })]), i("div", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "m-iconf-col m-box-center m-box-center-a",
            on: {
              click: function(e) {
                t.showEmotion = !t.showEmotion
              }
            }
          }, [i("h4", {
            staticClass: "lite-iconf",
            class: t.showEmotion ? "lite-iconf-edit" : "lite-iconf-emote"
          })]), t.hasDraft ? i("div", {
            directives: [{
              name: "mactive",
              rawName: "v-mactive"
            }],
            staticClass: "m-iconf-col m-box-center m-box-center-a",
            on: {
              click: t.gotoDraft
            }
          }, [i("h4", {
            staticClass: "lite-iconf icon_draft"
          })]) : t._e(), i("div", {
            staticStyle: {
              flex: "1"
            }
          }), i("span", {
            staticClass: "m-reles-fnum m-wz-def",
            class: {
              limit: t.textLimit < 0
            },
            domProps: {
              textContent: t._s(t.displayWordsCount)
            }
          })]), i("keep-alive", [t.showEmotion ? i("emotion", {
            on: {
              callback: t.addEmotion,
              hide: function(e) {
                t.showEmotion = !1
              }
            }
          }) : t._e()], 1)], 1)])]), i("transition", {
            attrs: {
              name: "fadeInRightBig"
            }
          }, [i("keep-alive", [t.showContact ? i("contact", {
            on: {
              callback: t.addFriend
            }
          }) : t._e()], 1)], 1), i("transition", {
            attrs: {
              name: "fadeInRightBig"
            }
          }, [i("keep-alive", [t.showTopic ? i("topic", {
            on: {
              callback: t.addTopic
            }
          }) : t._e()], 1)], 1)], 1)])
        },
        r = [],
        o = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("0ef1"), i("b17c"), i("4437"), i("b5d2")),
        s = (i("8354"), i("4294"), i("19d6")),
        a = i("383a"),
        c = i("08ff"),
        l = i("5d2d"),
        u = i("d39f"),
        d = i("21b6");

      function h(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, n)
        }
        return i
      }

      function f(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? h(Object(i), !0).forEach((function(e) {
            Object(o["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : h(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      i("3e74");
      var p = null,
        m = "h5_draft",
        g = {
          mixins: [d["a"], u["a"]],
          name: "Compose",
          created: function() {
            var t = this;
            if (this.mlogin && this.getUserInfo(), this.$route.query.editId) this.$http.get("statuses/show", {
              params: {
                id: this.$route.query.editId
              }
            }).then((function(e) {
              if (e.data && e.data.ok > 0) {
                var i = e.data.data;
                i.can_edit ? (i.pic_ids && t.$router.replace({
                  name: t.$route.name,
                  query: f({
                    pids: i.pic_ids.join(",")
                  }, t.$route.query)
                }), i.raw_text && t.setContentText(i.raw_text)) : a["a"].$emit("mvMsgbox", {
                  title: "你无权编辑这条微博",
                  type: "alert"
                }, (function() {
                  t.$router.go(-1)
                }))
              }
            }));
            else if (l["a"].hasData(m) && (p = l["a"].getData(m), p.some((function(e) {
                return +e.userId === +t.config.uid && (t.hasDraft = !0, !0)
              })), this.$route.query.draftId)) {
              var e = p.filter((function(e) {
                return e.draftId === +t.$route.query.draftId
              }))[0]; + this.config.uid && +this.config.uid !== +e.userId || (this.type = e.type || this.type, this.visible = e.visible || this.visible, this.dualPost = e.dualPost || this.dualPost, this.updateComposer(e.text))
            }
          },
          data: function() {
            return {
              type: this.$route.meta.pub_type,
              dualPost: !1,
              visible: 0,
              showEmotion: !1,
              userInfo: {},
              hasDraft: !1
            }
          },
          computed: f(f({}, Object(s["c"])(["curWeiboData", "mlogin"])), {}, {
            imgUplaodDisable: function() {
              if (this.type >= 2 && this.userInfo && (0 === this.userInfo.mbrank || 0 === this.userInfo.mbtype)) return !0;
              var t = 0 === this.type ? 9 : 1;
              return this.composerPhoto.length >= t
            },
            pubinfo: function() {
              var t = this.type,
                e = "",
                i = "未知类型";
              return 0 === t ? (e = "api/statuses/update", i = "原创微博") : 1 === t ? (e = "api/statuses/repost", i = "转发微博") : 2 === t ? (e = "api/comments/create", i = "评论微博") : 4 === t && (e = "api/comments/reply", i = "回复评论"), {
                title: i,
                url: e
              }
            },
            limitLetter: function() {
              return 0 === this.type ? 2e3 : 1 === this.type ? 500 : 140
            },
            displayWordsCount: function() {
              return 0 !== this.type && 1 !== this.type || !this.wordsCount ? this.textLimit < 11 ? this.textLimit : "" : this.textLimit < 0 ? this.textLimit : this.wordsCount
            },
            wordsCount: function() {
              return Object(c["a"])(this.compose.trim(), this.limitLetter)
            },
            textLimit: function() {
              return this.limitLetter - this.wordsCount
            },
            showContact: function() {
              return this.$route.hash.indexOf("contact") > -1
            },
            showTopic: function() {
              return this.$route.hash.indexOf("topic") > -1
            },
            isAbleToSend: function() {
              return 1 === this.type || this.composerPhoto.length > 0 || this.compose.length > 0
            }
          }, Object(s["c"])(["compose", "composerPhoto", "config"])),
          methods: f(f({}, Object(s["b"])(["setComposerCallBack", "updateComposer", "setCurWeiboData"])), {}, {
            gotoDraft: function() {
              var t = this;
              this.cancelComposer().then((function() {
                t.$router.push({
                  name: "draft"
                })
              }))
            },
            go: function() {
              var t = this;
              this.cancelComposer().then((function() {
                t.goBack()
              }))
            },
            cancelComposer: function() {
              var t = this;
              return new Promise((function(e) {
                if ((t.compose.trim().length > 0 || t.composerPhoto.length > 0) && t.config.uid && !t.$route.query.editId) {
                  var i = t,
                    n = [{
                      text: "保存草稿",
                      method: function() {
                        var t = i.$route.query,
                          n = i.type,
                          r = {
                            userId: +i.config.uid,
                            text: i.compose,
                            dualPost: i.dualPost,
                            visible: i.visible,
                            type: n,
                            draftId: Date.now()
                          };
                        if (i.composerPhoto.length && (r.pids = i.composerPhoto), 1 !== n && 2 !== n && 4 !== n || !t.mid && !t.id || (r.mid = t.mid || t.id), 4 === n && (t.cid || t.reply) && (r.cid = t.cid || t.reply), p && p.length) {
                          var o = -1;
                          p.some((function(t, e) {
                            return t.draftId === +i.$route.query.draftId && (o = e)
                          })), o > -1 && p.splice(o, 1), p.unshift(r)
                        } else p = [r];
                        l["a"].setData(m, p), e(), a["a"].$emit("mvMsgbox", !1)
                      }
                    }, {
                      text: "不保存",
                      method: function() {
                        i.setContentText(), e()
                      }
                    }];
                  a["a"].$emit("mvActionSheet", n, "取消")
                } else e()
              }))
            },
            areaFocus: function() {
              this.$refs.contentText.areaFocus()
            },
            setContentText: function(t) {
              this.$refs.contentText.setContentText(t)
            },
            onSetRepostChain: function(t) {
              var e = this;
              if (t && t.screenName) {
                var i = function(i) {
                  e.setContentText("//@".concat(t.screenName, ":").concat(i))
                };
                t.isLongText && t.id ? this.$http.get("statuses/show", {
                  params: {
                    id: t.id
                  }
                }).then((function(e) {
                  e.data && e.data.ok > 0 && e.data.data ? i(e.data.data.raw_text || t.rawText || "") : i(t.rawText || "")
                })).catch((function() {
                  i(t.rawText || "")
                })) : i(t.rawText || "")
              }
            },
            getUserInfo: function() {
              var t = this,
                e = {};
              !l["a"].hasData("h5_cur_user_last_time") || (new Date).getTime() >= l["a"].getData("h5_cur_user_last_time") ? l["a"].removeData("h5_cur_user") : l["a"].hasData("h5_cur_user") && (e = l["a"].getData("h5_cur_user"));
              var i = this.config.uid;
              i && +e.id === +i ? this.userInfo = e : this.$http.get("api/users/show").then((function(e) {
                if (e.data.ok > 0) {
                  var i = e.data.data;
                  l["a"].setData("h5_cur_user", i);
                  var n = i.profile_image_url.match(/(\?|&)expires=([^&?]*)/i),
                    r = n ? n[2] : (new Date).getTime() + 36e5;
                  l["a"].setData("h5_cur_user_last_time", r), t.userInfo = i
                }
              }))
            },
            visibleChange: function() {
              var t = [0, 6, 1],
                e = t.indexOf(this.visible);
              if (e > -1) {
                var i = (e + 1) % t.length;
                this.visible = t[i]
              }
            },
            successCallback: function(t) {
              this.$refs.contentText.clean();
              var e = this.$route.query.callback;
              if (e) {
                if (t.id) {
                  var i = -1 === e.indexOf("?") ? "?" : "&";
                  e += "".concat(i, "_mid=").concat(t.id)
                }
                window.location.href = e
              } else this.setComposerCallBack(t), this.$route.query.editId && (Object.assign(t, {
                isUpdate: !0
              }), this.setCurWeiboData(t)), a["a"].$emit("mvToast", {
                type: "ok",
                text: "发布成功"
              }), this.$route.query.draftId && this.deleteDraft(this.$route.query.draftId), this.$router.go(-1)
            },
            sendmessage: function(t, e) {
              var i = this;
              if (this.isAbleToSend)
                if (this.textLimit < 0) a["a"].$emit("mvToast", {
                  text: "不能超过".concat(this.limitLetter, "字")
                });
                else {
                  var n = this.type,
                    r = this.compose.trim();
                  0 === r.length && (0 === n && this.$refs.photo.pics.length > 0 && (r = "分享图片"), 1 === n && (r = "转发微博"), 2 !== n && 4 !== n || (r = "图片评论")), new Promise((function(o) {
                    var s = {};
                    if (i.$route.query && Object.assign(s, i.$route.query), Object.assign(s, {
                        content: r
                      }), i.visible && Object.assign(s, {
                        visible: i.visible
                      }), e && Object.assign(s, {
                        captchaId: e,
                        code: t
                      }), i.dualPost && Object.assign(s, {
                        dualPost: Number(i.dualPost)
                      }), 1 !== n && 2 !== n && 4 !== n || Object.assign(s, {
                        mid: s.mid || s.id
                      }), 4 === n && Object.assign(s, {
                        cid: s.cid || s.reply
                      }), i.$refs.photo && i.$refs.photo.pics.length) {
                      var c = i.$refs.photo.pics.filter((function(t) {
                        return t.id
                      }));
                      Object.assign(s, {
                        picId: c.map((function(t) {
                          return t.id
                        })).join(",")
                      }), delete s.pids, c.length < i.$refs.photo.pics.length ? a["a"].$emit("mvMsgbox", {
                        title: "有图片上传失败，确认发布？",
                        type: "confirm"
                      }, (function() {
                        o(s), a["a"].$emit("mvMsgbox", !1)
                      })) : o(s)
                    } else o(s)
                  })).then((function(t) {
                    a["a"].$emit("mvToast", {
                      type: "wait",
                      text: "正在发送"
                    }), i.$http.post(i.pubinfo.url, t).then((function(t) {
                      var e = t.data;
                      e && e.ok > 0 && i.successCallback(e.data)
                    })).catch((function() {
                      a["a"].$emit("mvToast", !1)
                    }))
                  }))
                }
            },
            addEmotion: function(t) {
              this.$refs.contentText.addEmotion(t)
            },
            addTopic: function(t) {
              this.$refs.contentText.addTopic(t)
            },
            addFriend: function(t) {
              this.$refs.contentText.addFriend(t)
            },
            onDrop: function(t) {
              this.$refs.photo.addPhoto(t.dataTransfer.files)
            }
          }),
          watch: {
            composerPhoto: function(t) {
              var e = f({}, this.$route.query);
              delete e.pids, t.length && (e.pids = t.join(",")), this.$router.replace({
                query: e
              })
            }
          },
          components: {
            photo: i("9a97").default,
            contentText: i("cb7c").default,
            smallCard: i("6444").default,
            topic: i("a42a").default,
            emotion: i("f697").default,
            contact: i("1192").default
          }
        },
        v = g,
        b = i("da34"),
        x = Object(b["a"])(v, n, r, !1, null, null, null);
      e["default"] = x.exports
    },
    "476e": function(t, e, i) {
      "use strict";
      i("8fb1")
    },
    6444: function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.card.screen_name,
              expression: "card.screen_name"
            }],
            staticClass: "card card9"
          }, [i("div", {
            staticClass: "card-main"
          }, [i("article", {
            staticClass: "weibo-main"
          }, [i("div", {
            staticClass: "weibo-media"
          }, [i("div", {
            staticClass: "card m-panel card26"
          }, [i("div", {
            staticClass: "card-wrap"
          }, [i("div", {
            staticClass: "card-main"
          }, [i("div", {
            staticClass: "m-box"
          }, [i("div", {
            staticClass: "m-img-box"
          }, [i("img", {
            attrs: {
              src: t.card.pic
            }
          })]), i("div", {
            staticClass: "m-box-col m-box-dir m-box-center"
          }, [i("div", {
            staticClass: "m-text-box"
          }, [i("h3", {
            staticClass: "m-text-cut"
          }, [t._v("@" + t._s(t.card.screen_name))]), i("h4", {
            staticClass: "m-text-cut-2",
            domProps: {
              innerHTML: t._s(t.card.status_title)
            }
          })])])])])])])])])])])
        },
        r = [],
        o = i("19d6"),
        s = {
          data: function() {
            return {
              card: {
                screen_name: "",
                status_title: "",
                pic: ""
              }
            }
          },
          created: function() {
            var t = this;
            this.curWeiboData && this.curWeiboData.id ? this.setCardData(this.curWeiboData) : this.$http.get("statuses/show", {
              params: {
                id: this.$route.query.mid || this.$route.query.id
              }
            }).then((function(e) {
              e.data && e.data.ok > 0 && t.setCardData(e.data.data)
            }))
          },
          computed: Object(o["c"])(["curWeiboData"]),
          methods: {
            setCardData: function(t) {
              var e = t;
              e.retweeted_status && (e = e.retweeted_status, this.$route.query.id === t.id && this.$emit("setRepostChain", {
                id: t.id,
                screenName: t.user && t.user.screen_name,
                rawText: t.raw_text,
                isLongText: t.isLongText
              })), this.card.screen_name = e.user.screen_name, this.card.pic = e.user.profile_image_url, this.card.status_title = e.text, e.pics && e.pics[0] && e.pics[0].url && (this.card.pic = e.pics[0].url)
            }
          }
        },
        a = s,
        c = (i("71b2"), i("da34")),
        l = Object(c["a"])(a, n, r, !1, null, "a967b470", null);
      e["default"] = l.exports
    },
    "685a": function(t, e, i) {
      "use strict";
      i("0ef1"), i("436f"), i("4294"), i("4437");
      e["a"] = function() {
        var t = {},
          e = window.navigator.userAgent,
          i = {
            Trident: e.indexOf("Trident") > -1 || e.indexOf("NET CLR") > -1,
            Presto: e.indexOf("Presto") > -1,
            WebKit: e.indexOf("AppleWebKit") > -1,
            Gecko: e.indexOf("Gecko/") > -1,
            Safari: e.match(/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i) || e.match(/version\/([\w\.]+).+?(mobile\s?safari|safari)/i),
            Chrome: e.indexOf("Chrome") > -1 || e.match(/((?:android.+)crmo|crios)\/([\w\.]+)/i),
            IE: e.match(/(?:ms|\()(ie)\s([\w\.]+)/i) || e.match(/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i),
            Edge: e.match(/(edge)\/((\d+)?[\w\.]+)/i),
            Firefox: e.indexOf("Firefox") > -1 || e.match(/fxios\/([\w\.-]+)/i),
            "Firefox Focus": e.indexOf("Focus") > -1,
            Chromium: e.indexOf("Chromium") > -1,
            Opera: e.indexOf("Opera") > -1 || e.match(/\s(opr)\/([\w\.]+)/i),
            Vivaldi: e.indexOf("Vivaldi") > -1,
            Yandex: e.match(/(yabrowser)\/([\w\.]+)/i),
            Kindle: e.match(/(kindle)\/([\w\.]+)/i),
            360: e.indexOf("360EE") > -1 || e.indexOf("360SE") > -1,
            UC: e.match(/(uc\s?browser)[\/\s]?([\w\.]+)/i) || e.match(/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i) || e.match(/(ucbrowser)\/([\w\.]+)/i) || e.match(/juc.+(ucweb)[\/\s]?([\w\.]+)/i),
            QQBrowser: e.match(/m?(qqbrowser)[\/\s]?([\w\.]+)/i),
            Baidu: e.indexOf("Baidu") > -1 || e.indexOf("BIDUBrowser") > -1,
            Maxthon: e.indexOf("Maxthon") > -1,
            Sogou: e.indexOf("MetaSr") > -1 || e.indexOf("Sogou") > -1,
            LBBROWSER: e.indexOf("LBBROWSER") > -1,
            XiaoMi: e.match(/xiaomi\/miuibrowser\/([\w\.]+)/i),
            Wechat: e.match(/(micromessenger)\/([\w\.]+)/i),
            Taobao: e.indexOf("AliApp(TB") > -1,
            Alipay: e.indexOf("AliApp(AP") > -1,
            Weibo: e.match(/Weibo\s*\((.*?)\)/i),
            wbchaohua: e.indexOf("wbchaohua") > -1,
            SinaNews: e.indexOf("sinanews") > -1,
            baidumap_IPHO: e.indexOf("baidumap_IPHO") > -1,
            QQ: e.indexOf("QQ/") > -1,
            Windows: e.match(/microsoft\s(windows)\s(vista|xp)/i) || e.match(/(windows)\snt\s6\.2;\s(arm)/i),
            "Mac OS": e.match(/(mac\sos\sx)\s?([\w\s\.]+\w)*/i) || e.match(/(macintosh|mac(?=_powerpc)\s)/i),
            Android: e.indexOf("Android") > -1,
            "Windows Phone": e.indexOf("IEMobile") > -1,
            iOS: e.match(/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i),
            Mobile: e.indexOf("Mobile") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("480") > -1,
            Tablet: e.indexOf("Tablet") > -1 || e.indexOf("Pad") > -1 || e.indexOf("Nexus 7") > -1
          },
          n = {
            engine: ["WebKit", "Trident", "Gecko", "Presto"],
            browser: ["Chrome", "Safari", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Kindle", "360", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "XiaoMi", "Wechat", "Taobao", "Alipay", "Weibo", "SinaNews", "wbchaohua", "baidumap_IPHO"],
            os: ["Windows", "Mac OS", "Android", "iOS", "Windows Phone"],
            device: ["Mobile", "Tablet"]
          };
        for (var r in t.device = "PC", n)
          for (var o = 0; o < n[r].length; o += 1) {
            var s = n[r][o];
            s && i[s] && (t[r] = s)
          }
        var a = {
          Windows: function() {
            var t = e.replace(/^.*Windows NT ([\d.]+);.*$/, "$1"),
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
            return i[t] || t
          },
          "Mac OS": function() {
            return e.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".")
          },
          Android: function() {
            return e.replace(/^.*Android ([\d.]+);.*$/, "$1")
          },
          iOS: function() {
            return e.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".")
          },
          "Windows Phone": function() {
            return e.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2")
          }
        };
        t.osVersion = "", a[t.os] && (t.osVersion = a[t.os](), t.osVersion === e && (t.osVersion = ""));
        var c = {
          Safari: function() {
            return e.replace(/^.*Version\/([\d.]+).*$/, "$1")
          },
          Chrome: function() {
            return e.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1")
          },
          IE: function() {
            return e.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1")
          },
          Edge: function() {
            return e.replace(/^.*Edge\/([\d.]+).*$/, "$1")
          },
          Firefox: function() {
            return e.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1")
          },
          "Firefox Focus": function() {
            return e.replace(/^.*Focus\/([\d.]+).*$/, "$1")
          },
          Chromium: function() {
            return e.replace(/^.*Chromium\/([\d.]+).*$/, "$1")
          },
          Opera: function() {
            return e.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1")
          },
          Vivaldi: function() {
            return e.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1")
          },
          Yandex: function() {
            return e.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1")
          },
          Kindle: function() {
            return e.replace(/^.*Version\/([\d.]+).*$/, "$1")
          },
          Maxthon: function() {
            return e.replace(/^.*Maxthon\/([\d.]+).*$/, "$1")
          },
          QQBrowser: function() {
            return e.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1")
          },
          Baidu: function() {
            return e.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1")
          },
          UC: function() {
            return e.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1").replace(/juc.+(ucweb)[\/\s]?([\w\.]+)/i, "$1")
          },
          Sogou: function() {
            return e.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1")
          },
          XiaoMi: function() {
            return e.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1")
          },
          Wechat: function() {
            return e.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1")
          },
          Taobao: function() {
            return e.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1")
          },
          Alipay: function() {
            return e.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1")
          },
          Weibo: function() {
            var t = [];
            try {
              t = e.match(/__weibo__(\d+?.\d+?.\d+)__(.+)?__/)
            } catch (i) {
              console.log(i)
            }
            return !t || !t.length || t.length < 2 ? "" : t[1]
          },
          QQ: function() {
            return e.replace(/^.*QQ\/([\d.]+).*$/, "$1")
          }
        };
        return t.version = "", c[t.browser] && (t.version = c[t.browser](), t.version === e && (t.version = "")), "Edge" === t.browser ? t.engine = "EdgeHTML" : ("Chrome" === t.browser && parseInt(t.version, 10) > 27 || "Opera" === t.browser && parseInt(t.version, 10) > 12 || "Yandex" === t.browser) && (t.engine = "Blink"), t.versionCompare = function(t, e) {
          for (var i = t.indexOf("_") > -1 ? t.split("_") : t.split("."), n = e.indexOf("_") > -1 ? e.split("_") : e.split("."), r = Math.max(i.length, n.length), o = 0; o < r; o += 1) {
            var s = Number(i[o]) || 0,
              a = Number(n[o]) || 0;
            if (s > a) return 1;
            if (a > s) return -1
          }
          return 0
        }, t
      }()
    },
    "71b2": function(t, e, i) {
      "use strict";
      i("c8e8")
    },
    7683: function(t, e, i) {
      t.exports = i.p + "img/compose_topic_default.f0bf3327.png"
    },
    "8fb1": function(t, e, i) {},
    "9a97": function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", [i("div", {
            ref: "imageList",
            staticClass: "image-list"
          }, [t._l(t.pics, (function(e, n) {
            return i("v-touch", {
              key: e.src,
              staticClass: "m-box-center m-box-center-a image-wrap m-trans",
              class: [t.picClass, {
                none: t.pics.length > 1 && (n === t.moveIndex || t.moveIndex < 0)
              }, {
                error: e.error
              }],
              style: {
                transform: t.translate(e.deltaX, e.deltaY, n)
              },
              attrs: {
                draggable: "true"
              },
              on: {
                touchstart: function(e) {
                  return t.onDragStart(n, e)
                },
                dragstart: function(e) {
                  return t.onDragStart(n, e)
                },
                pan: t.onPan,
                panend: t.onPanEnd
              }
            }, [i("div", {
              staticClass: "image-placeholder"
            }), i("img", {
              staticClass: "composer-image",
              class: [{
                loading: e.loading
              }],
              attrs: {
                src: e.src
              },
              on: {
                load: function(i) {
                  return i.stopPropagation(), t.loadedImg(e, i)
                },
                error: function(e) {
                  return t.errorPhoto(t.pics, n)
                },
                click: function(e) {
                  return t.clickThumbnails(e, n)
                }
              }
            }), !e.loading || e.error ? i("button", {
              staticClass: "m-rpic-close m-trans m-box",
              on: {
                click: function(e) {
                  return e.stopPropagation(), t.delPhoto(t.pics, n)
                }
              }
            }, [i("svg", {
              staticClass: "m-style-svg m-flex-grow1 m-rpic-c",
              attrs: {
                viewBox: "0 0 46 72"
              }
            }, [i("path", {
              attrs: {
                d: "M27.243 36l14.88-14.88c1.17-1.17 1.17-3.07 0-4.24-1.172-1.173-3.072-1.173-4.243 0L23 31.757 8.122 16.878c-1.17-1.17-3.07-1.17-4.242 0-1.172 1.172-1.172 3.072 0 4.243L18.758 36 3.878 50.88c-1.17 1.17-1.17 3.07 0 4.24.587.587 1.355.88 2.123.88s1.536-.293 2.122-.88L23 40.243l14.88 14.88c.585.585 1.353.878 2.12.878.768 0 1.535-.293 2.12-.88 1.173-1.17 1.173-3.07 0-4.24L27.244 36z"
              }
            })])]) : t._e()])
          })), t.pics.length > 1 && t.pics.length < t.limitPhoto ? i("label", {
            staticClass: "m-box-center m-box-center-a image-wrap more-image",
            class: [t.picClass],
            attrs: {
              for: "selectphoto"
            }
          }, [i("div", {
            staticClass: "image-placeholder"
          })]) : t._e()], 2), i("input", {
            ref: "imagefile",
            staticClass: "m-rfile",
            attrs: {
              id: "selectphoto",
              type: "file",
              accept: "image/gif,image/jpeg,image/webp,image/jpg,image/png,image/bmp",
              multiple: t.multiple
            },
            on: {
              change: t.selectPhoto
            }
          })])
        },
        r = [],
        o = (i("7ad2"), i("0277"), i("7521"), i("1f2f"), i("b17c"), i("b5d2")),
        s = (i("7c02"), i("e675"), i("e11f"), i("8354"), i("436f"), i("ffba"), i("e96f"), i("19d6")),
        a = i("383a"),
        c = function(t) {
          var e, i = t.split(",");
          e = i[0].indexOf("base64") >= 0 ? atob(i[1]) : unescape(i[1]);
          for (var n, r = i[0].split(":")[1].split(";")[0], o = new Uint8Array(e.length), s = 0; s < e.length; s++) o[s] = e.charCodeAt(s);
          try {
            n = new Blob([o], {
              type: r
            })
          } catch (c) {
            if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === c.name && window.BlobBuilder) {
              var a = new BlobBuilder;
              a.append(o.buffer), n = a.getBlob(r)
            } else "InvalidStateError" === c.name && (n = new Blob([o.buffer], {
              type: r
            }))
          }
          return n
        },
        l = i("685a");

      function u(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, n)
        }
        return i
      }

      function d(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? u(Object(i), !0).forEach((function(e) {
            Object(o["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }

      function h(t, e) {
        var i = "undefined" !== typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!i) {
          if (Array.isArray(t) || (i = f(t)) || e && t && "number" === typeof t.length) {
            i && (t = i);
            var n = 0,
              r = function() {};
            return {
              s: r,
              n: function() {
                return n >= t.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: t[n++]
                }
              },
              e: function(t) {
                throw t
              },
              f: r
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, s = !0,
          a = !1;
        return {
          s: function() {
            i = i.call(t)
          },
          n: function() {
            var t = i.next();
            return s = t.done, t
          },
          e: function(t) {
            a = !0, o = t
          },
          f: function() {
            try {
              s || null == i.return || i.return()
            } finally {
              if (a) throw o
            }
          }
        }
      }

      function f(t, e) {
        if (t) {
          if ("string" === typeof t) return p(t, e);
          var i = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? p(t, e) : void 0
        }
      }

      function p(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
        return n
      }
      var m, g = 0;

      function v(t, e) {
        var i = new FileReader;
        i.onload = function(t) {
          var i = new DataView(t.target.result);
          if (65496 !== i.getUint16(0, !1)) return e(-2);
          var n = i.byteLength,
            r = 2;
          while (r < n) {
            var o = i.getUint16(r, !1);
            if (r += 2, 65505 === o) {
              if (1165519206 !== i.getUint32(r += 2, !1)) return e(-1);
              var s = 18761 === i.getUint16(r += 6, !1);
              r += i.getUint32(r + 4, s);
              var a = 0;
              try {
                a = i.getUint16(r, s)
              } catch (l) {
                return e(-1)
              }
              r += 2;
              for (var c = 0; c < a; c++)
                if (274 === i.getUint16(r + 12 * c, s)) return e(i.getUint16(r + 12 * c + 8, s))
            } else {
              if (65280 !== (65280 & o)) break;
              r += i.getUint16(r, !1)
            }
          }
          return e(-1)
        }, i.readAsArrayBuffer(t)
      }

      function b(t) {
        return new Promise((function(e) {
          var i = new FileReader;
          i.onloadend = function(i) {
            for (var n = new Uint8Array(i.target.result).subarray(0, 4), r = "", o = 0; o < n.length; o++) r += n[o].toString(16);
            var s = "";
            "89504e47" === r ? s = "png" : "47494638" === r ? s = "gif" : "52494646" === r ? s = "webp" : 0 === r.indexOf("424d") ? s = "bmp" : 0 === r.indexOf("ffd8ffe") ? s = "jpeg" : 0 === r.indexOf("6674797068") && (s = "heic"), t.mimeType = s, e(s)
          }, i.readAsArrayBuffer(t)
        }))
      }

      function x(t) {
        return new Promise((function(e, i) {
          for (var n = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "heic", "heif"], r = [], o = 0; o < t.length; o++) {
            var s = t[o].name.split(".");
            if (s.length > 1) {
              var a = s.pop().toLowerCase();
              n.indexOf(a) < 0 ? i() : t[o].mimeType = a
            } else r.push(b(t[o]))
          }
          r.length ? Promise.all(r).then((function(r) {
            var o, s = h(r);
            try {
              for (s.s(); !(o = s.n()).done;) {
                var a = o.value;
                n.indexOf(a) < 0 && i()
              }
            } catch (c) {
              s.e(c)
            } finally {
              s.f()
            }
            e(t)
          })) : e(t)
        }))
      }

      function w(t) {
        var e = t,
          i = 0,
          n = 0;
        while (e) i += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
        return {
          x: i,
          y: n
        }
      }

      function y(t) {
        var e = t,
          i = 0;
        while (e) i += e.scrollTop, e = e.parentElement;
        return i
      }

      function $(t) {
        var e = t;
        while (e && e.scrollHeight === e.offsetHeight) e = e.parentElement;
        return e || window
      }
      var C = {
          data: function() {
            return {
              composerType: this.$route.meta.pub_type,
              pics: [],
              moveIndex: -1,
              imgDomsCenter: []
            }
          },
          created: function() {
            window.URL = window.URL || window.webkitURL, this.$route.query.pids && this.pidsInit()
          },
          computed: {
            picClass: function() {
              return "img".concat(1 === this.pics.length ? 1 : 3)
            },
            limitPhoto: function() {
              return 0 === this.$route.meta.pub_type ? 18 : 1
            },
            multiple: function() {
              return this.pics.length < this.limitPhoto - 1
            },
            isPCPlatform: function() {
              var t = navigator.platform;
              return 0 === t.indexOf("Win") || 0 === t.indexOf("Mac") || !("ontouchstart" in document)
            }
          },
          methods: d({
            imgFormat: function() {
              return {
                width: 0,
                height: 0,
                deltaX: 0,
                deltaY: 0,
                error: !1,
                file: null,
                id: "",
                loading: !1,
                orientation: -1,
                src: "",
                type: ""
              }
            },
            pidsInit: function() {
              var t = this,
                e = this.$route.query.pids.split(","),
                i = e.map((function(e) {
                  return d(d({}, t.imgFormat()), {}, {
                    id: e,
                    orientation: 9,
                    src: "//ww".concat(e.charCodeAt(0) % 4 + 1, ".sinaimg.cn/bmiddle/").concat(e)
                  })
                }));
              this.pics = this.composerType ? [i[0]] : i.slice(0, 9)
            },
            selectPhoto: function() {
              var t = this.$refs.imagefile;
              this.addPhoto(t)
            },
            addPhoto: function(t) {
              var e = this,
                i = t.files;
              if (i && i.length > 0) {
                if (i.length + this.pics.length > this.limitPhoto) return a["a"].$emit("mvMsgbox", {
                  title: "最多只能传".concat(this.limitPhoto, "张")
                }), void(t.value = "");
                x(i).then((function() {
                  for (var n = 0; n < i.length; n++) {
                    var r = i[n];
                    e.pics.push(d(d({}, e.imgFormat()), {}, {
                      file: r,
                      type: r.mimeType,
                      src: window.URL.createObjectURL(r),
                      loading: !0
                    }))
                  }
                  t.value = ""
                })).catch((function() {
                  a["a"].$emit("mvMsgbox", {
                    title: "只支持正经的图片格式"
                  }), t.value = ""
                }))
              }
            },
            loadedImg: function(t) {
              var e = this;
              t.orientation > 1 ? t.orientation = -1 : (void 0 === m && "gif" !== t.type && t.type, Promise.resolve(m || "bmp" === t.type ? this.compressImage(t, 1e6) : t.file).then((function(i) {
                e.checkSize(t, i) ? e.sendImage(t, i) : window.URL.revokeObjectURL(t.src), e.isPCPlatform || window.URL.revokeObjectURL(t.src)
              })))
            },
            errorPhoto: function(t, e) {
              a["a"].$emit("mvMsgbox", {
                title: "图片选择失败"
              }), this.delPhoto(t, e)
            },
            delPhoto: function(t, e) {
              this.onDragEnd(), t.splice(e, 1)
            },
            getImageDomsCenter: function() {
              var t = this,
                e = this.$refs.imageList.getElementsByTagName("img");
              this.$nextTick((function() {
                t.imgDomsCenter = Array.prototype.map.call(e, (function(t) {
                  return {
                    x: w(t).x + .5 * t.offsetWidth,
                    y: w(t).y + .5 * t.offsetHeight
                  }
                }))
              }))
            },
            onDragStart: function(t, e) {
              1 === this.pics.length ? g = $(e.target).scrollTop : this.pics[t].loading || (this.getImageDomsCenter(), this.moveIndex = t)
            },
            onPan: function(t) {
              if (this.moveIndex < 0) $(t.target).scrollTop = g - t.deltaY;
              else if (!this.pics[this.moveIndex].loading) {
                this.pics[this.moveIndex].deltaX = t.deltaX, this.pics[this.moveIndex].deltaY = t.deltaY;
                var e = t.target.getBoundingClientRect(),
                  i = t.target.offsetWidth,
                  n = t.target.offsetHeight,
                  r = {
                    x: e.left + .5 * i,
                    y: e.top + .5 * n + y(t.target)
                  },
                  o = -1,
                  s = this.imgDomsCenter;
                if (s.some((function(t, e) {
                    return Math.abs(t.x - r.x) < .5 * i && Math.abs(t.y - r.y) < .5 * n && (o = e, !0)
                  })), o > -1)
                  for (var a = 0; a < this.pics.length; a++)
                    if (a !== this.moveIndex) {
                      var c = a - this.moveIndex;
                      if (c * (a - o) > 0) this.pics[a].deltaX = 0, this.pics[a].deltaY = 0;
                      else {
                        var l = a + 2 * (c < 0) - 1;
                        this.pics[a].deltaX = s[l].x - s[a].x, this.pics[a].deltaY = s[l].y - s[a].y
                      }
                    }
              }
            },
            onPanEnd: function(t) {
              var e = this;
              if (!(this.moveIndex < 0 || this.pics[this.moveIndex].loading)) {
                var i = t.target.getBoundingClientRect(),
                  n = t.target.offsetWidth,
                  r = t.target.offsetHeight,
                  o = {
                    x: i.left + .5 * n,
                    y: i.top + .5 * r + y(t.target)
                  },
                  s = -1;
                if (this.imgDomsCenter.some((function(t, i) {
                    return Math.abs(t.x - o.x) < .5 * n && Math.abs(t.y - o.y) < .5 * r && i !== e.moveIndex && (s = i, !0)
                  })), s > -1) {
                  var a = this.pics.splice(this.moveIndex, 1);
                  this.pics.splice(s, 0, a[0])
                }
                for (var c = 0; c < this.pics.length; c++) this.pics[c].deltaX = 0, this.pics[c].deltaY = 0;
                this.onDragEnd()
              }
            },
            onDragEnd: function() {
              this.moveIndex = -1
            },
            translate: function(t, e, i) {
              var n = this.moveIndex === i ? "scale(1.1)" : "";
              return "translate(".concat(t, "px, ").concat(e, "px) ").concat(n)
            },
            compressImage: function(t, e) {
              return new Promise((function(i) {
                ["gif", "webp"].indexOf(t.type) > 0 ? i(t.file) : new Promise((function(e) {
                  if ("jpg" === t.type || "jpeg" === t.type) try {
                    v(t.file, (function(t) {
                      e(t)
                    }))
                  } catch (i) {
                    e(-1)
                  } else e(-2)
                })).then((function(n) {
                  t.orientation = n;
                  var r = new Image;
                  r.onload = function() {
                    t.height = this.naturalHeight, t.width = this.naturalWidth;
                    var r = [t.width, t.height, 2e3],
                      o = r[0],
                      s = r[1],
                      a = r[2];
                    o > a && s > a && (t.height = o > s ? a : a * s / o, t.width = o > s ? a * o / s : a);
                    var l = document.createElement("canvas"),
                      u = l.getContext("2d");
                    if (l.height = t.height, l.width = t.width, 6 === n || 8 === n) {
                      l.height = t.width, l.width = t.height;
                      var d = l.width / 2,
                        h = l.height / 2;
                      u.translate(d, h), u.rotate((7 - n) * Math.PI / 2), u.translate(-h, -d)
                    } else 3 === n && (u.rotate(Math.PI), u.translate(-l.width, -l.height));
                    u.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight, 0, 0, t.width, t.height), t.height = l.height, t.width = l.width;
                    var f = 30,
                      p = 10,
                      m = null;
                    do {
                      var g = l.toDataURL("image/jpeg", f / 100),
                        v = c(g);
                      if (f += p, !(v.size < Math.min(t.file.size, e))) break;
                      m = v
                    } while (f < 80);
                    i(m || t.file)
                  }, r.src = t.src
                }))
              }))
            },
            checkSize: function(t, e) {
              var i = (e.size / 1024 / 1024).toFixed(2);
              if (+i > 5) {
                var n = -1;
                return this.pics.some((function(e, i) {
                  return e.src === t.src && (n = i)
                })), m ? a["a"].$emit("mvMsgbox", {
                  title: "图片实在太大，前端压缩也帮不了你"
                }) : a["a"].$emit("mvMsgbox", {
                  title: "第".concat(n + 1, "张图片 ").concat(i, "MB 太大无法上传"),
                  type: "confirm",
                  btnText: "开启压缩上传"
                }, (function() {
                  m = !0, a["a"].$emit("mvMsgbox", !1)
                })), t.error = !0, !1
              }
              return !0
            },
            sendImage: function(t, e) {
              var i = this,
                n = new FormData;
              n.append("type", "json"), n.append("pic", e), this.$http.post("api/statuses/uploadPic", n, {}).then((function(e) {
                var n = e.data;
                if (!n || !(n.ok > 0 || n.pic_id)) throw t.error = !0, new Error(n);
                t.orientation > 1 && "iOS" !== l["a"].os && (window.URL.revokeObjectURL(t.src), t.src = n.bmiddle_pic), Object.assign(t, {
                  file: null,
                  loading: !1,
                  error: !1,
                  id: n.pic_id
                }), i.updateComposerPhoto(i.pics)
              })).catch((function(e) {
                throw t.error = !0, new Error(e)
              }))
            },
            clickThumbnails: function(t, e) {
              if (this.onDragEnd(), this.isPCPlatform) {
                var i = t.currentTarget || t.srcElement,
                  n = this.formatThumbItem(i, this.pics);
                a["a"].$emit("mvGallery", e, n)
              }
              this.pics[e].error
            },
            formatThumbItem: function(t, e) {
              var i = this.closest(t, (function(t) {
                  return t.classList.contains("image-list")
                })),
                n = e.map((function(t, e) {
                  var n = i.getElementsByTagName("img")[e];
                  return {
                    src: t.src,
                    w: t.width || n.naturalWidth,
                    h: t.height || n.naturalHeight,
                    msrc: t.src,
                    el: n
                  }
                }));
              return n
            },
            closest: function(t, e) {
              return t && (e(t) ? t : this.closest(t.parentNode, e))
            }
          }, Object(s["b"])(["updateComposerPhoto"])),
          destroyed: function() {
            this.updateComposerPhoto(null)
          },
          watch: {
            pics: function() {
              this.updateComposerPhoto(this.pics)
            }
          }
        },
        O = C,
        T = (i("d6a6"), i("da34")),
        _ = Object(T["a"])(O, n, r, !1, null, "0df1ca00", null);
      e["default"] = _.exports
    },
    a42a: function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "contactlist"
          }, [i("card31", {
            attrs: {
              init: t.inactive
            },
            on: {
              inputText: t.search
            }
          }), i("ul", {
            staticClass: "card"
          }, t._l(t.list, (function(e) {
            return i("li", {
              directives: [{
                name: "mvlink",
                rawName: "v-mvlink",
                value: e,
                expression: "topic"
              }],
              key: e.title,
              staticClass: "m-panel card25",
              on: {
                click: function(i) {
                  return t.selectTopic(e.content)
                }
              }
            }, [i("div", {
              staticClass: "card-wrap"
            }, [i("div", {
              staticClass: "card-main"
            }, [i("div", {
              staticClass: "m-box"
            }, [i("div", {
              staticClass: "m-img-box"
            }, [i("img", {
              attrs: {
                src: e.image
              }
            })]), i("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [i("div", {
              staticClass: "m-text-box"
            }, [i("h3", {
              staticClass: "m-text-cut"
            }, [t._v("#" + t._s(e.title) + "#")]), i("h4", {
              staticClass: "m-text-cut",
              domProps: {
                textContent: t._s(e.description)
              }
            })])]), i("div", {
              staticClass: "box-right m-box-center-a m-box-center m-btn-box"
            }, [i("div", {
              staticClass: "m-diy-btn m-box-col m-box-center m-box-center-a"
            }, [i("img", {
              attrs: {
                src: e.icon,
                height: "24",
                width: "24"
              }
            })])])])])])])
          })), 0), i("mv-nextpage", {
            attrs: {
              requesting: t.loading
            }
          })], 1)
        },
        r = [],
        o = i("8ccc"),
        s = i.n(o),
        a = i("7683"),
        c = i.n(a),
        l = {
          data: function() {
            return {
              loading: !1,
              filterStr: "",
              topicList: [],
              topicSearchList: [],
              inactive: !1
            }
          },
          created: function() {
            this.getList()
          },
          activated: function() {
            this.inactive = !1
          },
          deactivated: function() {
            this.filterStr = "", this.inactive = !0
          },
          methods: {
            selectTopic: function(t) {
              this.filterStr = "", this.$emit("callback", t)
            },
            search: function(t) {
              this.filterStr = t
            },
            getList: function() {
              this.inactive || (this.filterStr.length ? this.getSearchList() : 0 === this.topicList.length && this.getTopicList())
            },
            getSearchList: function() {
              var t = this;
              this.loading || (this.loading = !0, this.$http.get("api/suggest/shotspot", {
                params: {
                  keyword: this.filterStr
                }
              }).then((function(e) {
                var i = e.data;
                i.ok > 0 && (t.topicSearchList = i.data), t.$nextTick((function() {
                  t.loading = !1
                }))
              })))
            },
            getTopicList: function() {
              var t = this;
              this.loading || (this.loading = !0, this.$http.get("api/suggest/hotspot").then((function(e) {
                var i = e.data;
                i.ok > 0 && (t.topicList = i.data), t.$nextTick((function() {
                  t.loading = !1
                }))
              })))
            }
          },
          watch: {
            filterStr: s()((function() {
              this.getList()
            }), 1e3)
          },
          computed: {
            list: function() {
              return this.filterStr.length ? this.topicSearchList.length ? this.topicSearchList : [{
                title: this.filterStr,
                description: "新话题",
                image: c.a,
                icon: "https://h5.sinaimg.cn/upload/2015/04/13/11/compose_topic_icon_topic_default.png"
              }] : this.topicList
            }
          },
          components: {
            card31: i("09d4").default
          }
        },
        u = l,
        d = (i("476e"), i("da34")),
        h = Object(d["a"])(u, n, r, !1, null, null, null);
      e["default"] = h.exports
    },
    c8e8: function(t, e, i) {},
    cb7c: function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i("div", {
            staticClass: "m-box-model m-pos-r"
          }, [i("div", {
            staticClass: "m-box-model m-fd-row m-reles-nr"
          }, [i("span", {
            staticClass: "m-wz-def"
          }, [i("textarea", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.contentText,
              expression: "contentText"
            }],
            ref: "textarea",
            style: {
              height: t.scrollHeight + "px",
              overflow: "hidden"
            },
            attrs: {
              placeholder: t.replyPrefix || t.placeholder
            },
            domProps: {
              value: t.contentText
            },
            on: {
              focus: t.focusArea,
              blur: t.moveCurPos,
              input: [function(e) {
                e.target.composing || (t.contentText = e.target.value)
              }, t.moveCurPos],
              keyup: function(e) {
                return e.type.indexOf("key") || 8 === e.keyCode ? t.deleteHandler.apply(null, arguments) : null
              }
            }
          }), i("textarea", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.shadowText,
              expression: "shadowText"
            }],
            ref: "shadow",
            staticStyle: {
              position: "absolute",
              "z-index": "-9999",
              visibility: "hidden"
            },
            attrs: {
              rows: "3"
            },
            domProps: {
              value: t.shadowText
            },
            on: {
              input: function(e) {
                e.target.composing || (t.shadowText = e.target.value)
              }
            }
          })])])])
        },
        r = [],
        o = (i("7ad2"), i("7c02"), i("e675"), i("0277"), i("8354"), i("436f"), i("b5d2")),
        s = (i("4294"), i("0ef1"), i("19d6")),
        a = i("5d2d");

      function c(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, n)
        }
        return i
      }

      function l(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? c(Object(i), !0).forEach((function(e) {
            Object(o["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : c(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      var u = "H5_MBLOG_SAVE_CONTENT";

      function d() {
        var t = {
            default: i("7851").default,
            others: i("b1f1").default,
            doraemon: i("bbf1").default,
            lxh: i("1b8b").default,
            movies: i("3579").default
          },
          e = [];
        for (var n in t) e = e.concat(t[n]);
        return e
      }
      var h = {
          props: {
            type: Number,
            limit: Number
          },
          data: function() {
            return {
              contentText: "",
              scrollHeight: 0,
              replyPrefix: "",
              curpos: 0,
              shareData: ""
            }
          },
          created: function() {
            this.getShareData()
          },
          mounted: function() {
            var t = this,
              e = this.type;
            if (this.shareData) this.setContentText(this.shareData), this.curpos = this.contentText.length;
            else if (this.$route.query.draftId && this.compose) this.setContentText(this.compose);
            else {
              if (0 === e) {
                var i = a["a"].getData(u);
                i && (this.contentText = i.trim(), this.curpos = this.contentText.length)
              }
              var n = this.$route.query.content;
              if (n) {
                if (this.contentText = n.trim(), 4 === e) {
                  var r = /^(reply|回复)@.*?:/,
                    o = r.exec(this.contentText);
                  this.replyPrefix = o ? o[0] : "", this.contentText = n.replace(r, "").trim()
                }
                this.curpos = this.contentText.length
              }
              1 === e && (n ? this.setContentText(n) : this.compose && this.setContentText(this.compose))
            }
            this.$nextTick((function() {
              t.scrollHeight = t.$refs.shadow.offsetHeight
            }))
          },
          methods: l(l({}, Object(s["b"])(["updateComposer"])), {}, {
            clean: function() {
              a["a"].removeData(u), this.contentText = ""
            },
            setContentText: function(t) {
              this.contentText = t ? t.trim() : "", 1 === this.type && (this.curpos = 0, this.areaFocus())
            },
            focusArea: function() {
              this.showEmotion = !1
            },
            moveCurPos: function() {
              this.$refs.textarea && (this.curpos = this.$refs.textarea.selectionStart)
            },
            areaFocus: function() {
              var t = this,
                e = this.$refs.textarea;
              e.focus(), this.$nextTick((function() {
                e.setSelectionRange(t.curpos, t.curpos)
              }))
            },
            addString: function(t) {
              var e = this.curpos,
                i = this.contentText.substring(0, e) + t;
              this.contentText = i + this.contentText.substring(e), this.curpos = i.length
            },
            addEmotion: function(t) {
              this.addString(t)
            },
            addFriend: function(t) {
              "@" === this.contentText.substring(this.curpos - 1, this.curpos) ? this.addString("".concat(t, " ")) : this.addString("@".concat(t, " ")), this.$router.go(-1), this.areaFocus()
            },
            addTopic: function(t) {
              "#" === this.contentText.substring(this.curpos - 1, this.curpos) && this.contentText.substring(0, this.curpos).split("#").length % 2 === 0 ? this.addString("".concat(t.slice(1))) : this.addString("".concat(t)), this.$router.go(-1), this.areaFocus()
            },
            deleteHandler: function() {
              for (var t = this, e = ["@", "#", "[", "//@"], i = this.$refs.textarea, n = function() {
                  var e = o[r],
                    n = t.contentText.substring(0, t.curpos).split(e),
                    s = n.length;
                  if (s > 1 && ("#" === e && s % 2 === 0 && (n.pop(), t.contentText = "".concat(t.contentText.substring(0, t.curpos), "#").concat(t.contentText.substring(t.curpos)), t.curpos += 1, t.$nextTick((function() {
                      i.setSelectionRange(n.join(e).length, t.curpos)
                    }))), "@" === e && !1 === /:|\n|\s/g.test(n[s - 1]) && (n.pop(), i.setSelectionRange(n.join(e).length, t.curpos)), "[" === e && n[s - 1].indexOf("]") < 0 && d().some((function(t) {
                      return t === n[s - 1]
                    })) && (n.pop(), t.contentText = n.join(e) + t.contentText.substring(t.curpos), t.curpos = n.join(e).length, t.$nextTick((function() {
                      i.setSelectionRange(t.curpos, t.curpos)
                    }))), "//@" === e && t.limit < 0)) {
                    var a = t.contentText.substring(t.curpos).trim().split(e);
                    "" === a[0] && (n.pop(), i.setSelectionRange(n.join(e).length, t.curpos))
                  }
                }, r = 0, o = e; r < o.length; r++) n()
            },
            getShareData: function() {
              if ("share" === this.$route.name) {
                var t = l({}, this.$route.query),
                  e = [t["title"], t["text"], t["url"]];
                e = e.filter((function(t) {
                  return t
                })), this.shareData = e.length ? e.join("\n") : ""
              }
            }
          }),
          computed: l({
            shadowText: function() {
              return "blank".concat(this.contentText)
            },
            fullContentText: function() {
              var t = this.type;
              return 1 === t && 0 === this.contentText.length ? "转发微博" : this.contentText
            },
            placeholder: function() {
              var t = this.type;
              return 0 === t ? "分享新鲜事…" : 1 === t ? "说说分享心得…" : 2 === t || 4 === t ? "写评论…" : ""
            }
          }, Object(s["c"])(["compose"])),
          destroyed: function() {
            this.updateComposer("")
          },
          watch: {
            contentText: function(t, e) {
              var i = this;
              if (0 !== this.type || this.$route.query.editId || a["a"].setData(u, t), this.updateComposer(this.fullContentText), this.$nextTick((function() {
                  i.scrollHeight = i.$refs.shadow.scrollHeight
                })), t.length - e.length === 1) {
                var n = t.substring(this.curpos - 1, this.curpos),
                  r = this.$route.query;
                "@" === n && (this.$router.push({
                  hash: "contact",
                  query: r
                }), this.$refs.textarea.blur()), "#" === n && this.contentText.substring(0, this.curpos).split("#").length % 2 === 0 && (this.$router.push({
                  hash: "topic",
                  query: r
                }), this.$refs.textarea.blur())
              }
            }
          }
        },
        f = h,
        p = i("da34"),
        m = Object(p["a"])(f, n, r, !1, null, null, null);
      e["default"] = m.exports
    },
    d39f: function(t, e, i) {
      "use strict";
      var n = i("5d2d"),
        r = "h5_draft";
      e["a"] = {
        methods: {
          deleteDraft: function(t) {
            var e = this;
            if (n["a"].hasData(r)) {
              var i = n["a"].getData(r),
                o = -1;
              if (i.some((function(i, n) {
                  return i.draftId === t && +e.$root.config.uid === +i.userId && (o = n, !0)
                })), o > -1) return i.splice(o, 1), n["a"].setData(r, i), !0
            }
            return !1
          }
        }
      }
    },
    d6a6: function(t, e, i) {
      "use strict";
      i("f946")
    },
    f946: function(t, e, i) {}
  }
]);
//# sourceMappingURL=composer.b7cc9913.js.map
