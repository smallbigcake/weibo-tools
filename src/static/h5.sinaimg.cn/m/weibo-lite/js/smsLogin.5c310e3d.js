(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["smsLogin"], {
    3406: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {
            staticClass: "wrapper"
          }, [1 === e.step ? n("div", {
            staticClass: "verify-wrap v-box-mod"
          }, ["SMS" == e.currentLoginMode ? n("a", {
            staticClass: "navigationbar_icon",
            on: {
              click: e.goBack
            }
          }, [n("span", {
            staticClass: "cross-btn"
          })]) : e._e(), "Account" == e.currentLoginMode ? n("span", {
            staticClass: "navigationbar_icon font-30 m-font m-font-arrow-left",
            on: {
              click: function(t) {
                return e.handleBack(1, "SMS")
              }
            }
          }) : e._e(), n("div", {
            staticClass: "verify-box"
          }, [n("p", {
            staticClass: "v-b-tit"
          }, [e._v("登录注册更精彩")]), n("p", {
            staticClass: "v-b-info"
          }, [e._v("\n        登录注册表示同意\n        "), n("a", {
            on: {
              click: function(t) {
                return e.jumpPage("userProtocolURL", 1)
              }
            }
          }, [e._v("用户协议")]), e._v("、\n        "), n("a", {
            on: {
              click: function(t) {
                return e.jumpPage("privacyClauseURL", 1)
              }
            }
          }, [e._v("隐私条款")])]), n("form", [n("div", {
            staticClass: "input-box"
          }, [n("span", {
            staticClass: "code-text"
          }, [e._v("+" + e._s(e.phoneCode.length >= 2 ? e.phoneCode : "00" + e.phoneCode))]), n("select", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: e.phoneCode,
              expression: "phoneCode"
            }],
            staticClass: "box-select",
            on: {
              change: [function(t) {
                var n = Array.prototype.filter.call(t.target.options, (function(e) {
                  return e.selected
                })).map((function(e) {
                  var t = "_value" in e ? e._value : e.value;
                  return t
                }));
                e.phoneCode = t.target.multiple ? n : n[0]
              }, e.limitTel]
            }
          }, e._l(e.phoneList, (function(t, a) {
            return n("option", {
              key: a,
              domProps: {
                value: t.code
              }
            }, [e._v(e._s(t.name))])
          })), 0), n("span", {
            staticClass: "select-icon m-font m-font-arrow-down"
          }), n("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: e.phoneNumber,
              expression: "phoneNumber"
            }],
            ref: "phoneNumber",
            staticClass: "input-container font-20",
            attrs: {
              type: "text",
              placeholder: "输入手机号"
            },
            domProps: {
              value: e.phoneNumber
            },
            on: {
              keyup: function(t) {
                return !t.type.indexOf("key") && e._k(t.keyCode, "delete", [8, 46], t.key, ["Backspace", "Delete", "Del"]) ? null : e.handleInputPhoneDelete.apply(null, arguments)
              },
              input: [function(t) {
                t.target.composing || (e.phoneNumber = t.target.value)
              }, e.limitTel]
            }
          }), n("span", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: e.phoneNumber.length > 0,
              expression: "phoneNumber.length > 0"
            }],
            staticClass: "icon-cross",
            on: {
              click: e.handleDelete
            }
          })])]), n("div", {
            staticClass: "v-tip-box"
          }, [n("span", {
            staticClass: "v-font-cred",
            domProps: {
              textContent: e._s(e.phoneError)
            }
          })]), n("a", {
            class: ["m-btn", "m-btn-block", "m-btn-default", e.isPhoneNull ? "m-btn-blue" : "m-btn-blue-hover"],
            on: {
              click: e.handleVerificationCode
            }
          }, [e._v("获取验证码")]), e.showPSWLogin ? n("div", {
            staticClass: "box-center"
          }, [e.isNotIframe ? n("a", {
            staticClass: "b-left",
            attrs: {
              href: e.accountLoginURL
            }
          }, [e._v("用账号密码登录")]) : n("a", {
            staticClass: "b-left",
            on: {
              click: function(t) {
                return e.jumpPage("accountLoginURL", 1)
              }
            }
          }, [e._v("用账号密码登录")])]) : e._e(), e.showQQLogin ? n("div", {
            staticClass: "box-bottom"
          }, [e._m(0), n("div", {
            staticClass: "share-icon"
          }, [n("a", {
            staticClass: "share-qq",
            attrs: {
              href: e.qqLoginURL
            }
          }, [n("span", {
            staticClass: "icon-logo-qq"
          }), n("span", {
            staticClass: "icon-log-name"
          }, [e._v("QQ")])])])]) : e._e()])]) : e._e(), 2 === e.step ? n("div", {
            staticClass: "verify-wrap v-box-mod"
          }, [n("span", {
            staticClass: "navigationbar_icon font-30 m-font m-font-arrow-left",
            on: {
              click: function(t) {
                return e.handleBack(1)
              }
            }
          }), n("div", {
            staticClass: "verify-box"
          }, [n("p", {
            staticClass: "v-b-tit"
          }, [e._v("请输入验证码")]), n("p", {
            staticClass: "v-s-tit"
          }, [e._v("\n        验证码已通过短信发送至\n        "), n("span", [e._v("+" + e._s(e.phoneCode))]), n("span", [e._v(e._s(e.phoneNumber))])]), n("div", {
            staticClass: "form-box"
          }, [n("div", {
            staticClass: "input-box"
          }, [n("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: e.smsNumber,
              expression: "smsNumber"
            }],
            ref: "codeInput",
            staticClass: "number-code font-20",
            attrs: {
              type: "text",
              placeholder: "输入验证码",
              maxlength: "6"
            },
            domProps: {
              value: e.smsNumber
            },
            on: {
              input: [function(t) {
                t.target.composing || (e.smsNumber = t.target.value)
              }, function(t) {
                return e.limitCode()
              }]
            }
          }), n("span", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: e.smsNumber.length > 0,
              expression: "smsNumber.length > 0"
            }],
            staticClass: "icon-cross code-cross",
            on: {
              click: e.handleCodeDelete
            }
          }), n("div", {
            staticClass: "v-box-right v-text-right"
          }, [e.isRepeat ? n("a", {
            on: {
              click: e.resendSmsCode
            }
          }, [e._v("重新获取")]) : n("a", {
            staticClass: "count-text"
          }, [n("span", [e._v(e._s(e.times))]), n("span", [e._v("秒后可重新获取")])])])])]), n("div", {
            staticClass: "v-tip-box"
          }, [n("span", {
            staticClass: "v-font-cred",
            domProps: {
              textContent: e._s(e.codeError)
            }
          })]), e.isRegister ? n("a", {
            class: ["m-btn", "m-btn-block", "m-btn-default", e.isCodeIncomplete ? "m-btn-blue" : "m-btn-blue-hover"],
            on: {
              click: e.confirmSmsCode
            }
          }, [e._v(e._s(e.validateWaiting ? "正在验证" : "登录"))]) : n("a", {
            class: ["m-btn", "m-btn-block", "m-btn-default", e.isCodeIncomplete ? "m-btn-blue" : "m-btn-blue-hover"],
            on: {
              click: e.confirmSmsCode
            }
          }, [e._v(e._s(e.validateWaiting ? "正在验证" : "注册"))])])]) : e._e(), 0 === e.step ? n("div", {
            staticClass: "verify-wrap v-box-mod iframe-wrap",
            class: ["accountLoginURL" === e.previewURL ? "wrap-login" : ""]
          }, [n("span", {
            staticClass: "navigationbar_icon font-30 m-font m-font-arrow-left nav-fixed",
            on: {
              click: function(t) {
                return e.handleBack(e.backStep)
              }
            }
          }), "userProtocolURL" === e.previewURL ? n("iframe", {
            staticClass: "jump-page",
            attrs: {
              src: e.userProtocolURL
            }
          }) : "privacyClauseURL" === e.previewURL ? n("iframe", {
            staticClass: "jump-page",
            attrs: {
              src: e.privacyClauseURL
            }
          }) : "accountLoginURL" === e.previewURL ? n("iframe", {
            staticClass: "jump-page account-page",
            attrs: {
              id: "myFrame",
              src: e.accountLoginURL
            },
            on: {
              load: e.iframOnload
            }
          }) : e._e(), e.pageLoading ? n("transition", {
            attrs: {
              name: "page-modal"
            }
          }, [n("div", {
            staticClass: "page-modal"
          }, [n("div", {
            staticClass: "loading"
          })])]) : e._e()], 1) : e._e()])
        },
        o = [function() {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", {
            staticClass: "box-title"
          }, [n("span", {
            staticClass: "text"
          }, [e._v("其他登录方式")])])
        }],
        s = (n("4294"), n("383a")),
        i = n("5d2d"),
        r = {
          data: function() {
            return {
              pageLoading: !1,
              isNotIframe: !0,
              showPSWLogin: window.$render_data.showPSWLogin,
              showQQLogin: window.$render_data.showQQLogin,
              currentLoginMode: "SMS",
              isRepeat: !1,
              step: 1,
              backStep: 1,
              isRegister: !0,
              validateWaiting: !1,
              previewURL: "",
              privacyClauseURL: "https://m.weibo.cn/c/privacy",
              userProtocolURL: "https://m.weibo.cn/c/regagreement?from=h5&wm=3349&lang=zh_CN",
              phoneList: [{
                code: "86",
                name: "中国大陆"
              }, {
                code: "852",
                name: "香港地区"
              }, {
                code: "886",
                name: "台湾地区"
              }, {
                code: "853",
                name: "澳门地区"
              }, {
                code: "81",
                name: "日本"
              }, {
                code: "82",
                name: "韩国"
              }, {
                code: "65",
                name: "新加坡"
              }, {
                code: "60",
                name: "马来西亚"
              }, {
                code: "1",
                name: "美国"
              }, {
                code: "1",
                name: "加拿大"
              }, {
                code: "61",
                name: "澳大利亚"
              }, {
                code: "44",
                name: "英国"
              }, {
                code: "60",
                name: "马来西亚"
              }, {
                code: "33",
                name: "法国"
              }, {
                code: "49",
                name: "德国"
              }, {
                code: "33",
                name: "法国"
              }, {
                code: "7",
                name: "俄罗斯"
              }, {
                code: "91",
                name: "印度"
              }, {
                code: "66",
                name: "泰国"
              }, {
                code: "55",
                name: "巴西"
              }, {
                code: "62",
                name: "印尼"
              }, {
                code: "855",
                name: "柬埔寨"
              }, {
                code: "95",
                name: "缅甸"
              }, {
                code: "673",
                name: "文莱"
              }, {
                code: "63",
                name: "菲律宾"
              }, {
                code: "84",
                name: "越南"
              }, {
                code: "856",
                name: "老挝"
              }, {
                code: "64",
                name: "新西兰"
              }, {
                code: "39",
                name: "意大利"
              }, {
                code: "34",
                name: "西班牙"
              }, {
                code: "48",
                name: "波兰"
              }],
              phoneCode: "86",
              phoneNumber: "",
              phoneError: "",
              timer: null,
              times: 60,
              currentPhone: "",
              codeLength: 6,
              repeatTime: 60,
              smsNumber: "",
              codeError: "",
              errorMessage: {
                phoneError: "手机号码格式错误，请重新输入",
                codeError: "验证码错误"
              }
            }
          },
          mounted: function() {
            if (!this.isNotIframe) {
              var e = this;
              window.addEventListener("message", e.iframOnload)
            }
          },
          computed: {
            currentBackURL: function() {
              return this.$route.query.backURL ? encodeURIComponent(this.$route.query.backURL) : encodeURIComponent(window.location.origin)
            },
            qqLoginURL: function() {
              return "https://passport.weibo.com/othersitebind/authorize?entry=mweibo&site=qq&res=other&callback=".concat(encodeURIComponent(this.currentBackURL))
            },
            accountLoginURL: function() {
              var e;
              return e = this.isNotIframe ? "https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=".concat(this.currentBackURL) : "https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=".concat(encodeURIComponent("https://m.weibo.cn/index/loginTransfer")), e
            },
            isPhoneNull: function() {
              return !(this.phoneNumber.length > 0)
            },
            isCodeIncomplete: function() {
              return !(this.smsNumber.length >= this.codeLength) || (this.confirmSmsCode(), !1)
            }
          },
          destroyed: function() {
            if (!this.isNotIframe) {
              var e = this;
              document.body.removeEventListener("message", e.iframOnload)
            }
          },
          watch: {
            step: function(e) {
              2 === e && (this.codeError = "", this.smsNumber = "", this.times = this.repeatTime, this.countDownTime())
            },
            smsNumber: function(e) {
              e.length >= this.codeLength && (this.smsNumber = this.smsNumber.replace(/\s/g, "").slice(0, this.codeLength))
            }
          },
          methods: {
            iframOnload: function(e) {
              e.data && e.data.login && setTimeout((function() {
                window.location.href = window.location.origin
              }), 1e3)
            },
            goBack: function() {
              this.$router.push({
                path: "/"
              })
            },
            jumpPage: function(e, t) {
              var n = this;
              this.previewURL = e, this.backStep = t, this.step = 0, "accountLoginURL" === e && (this.pageLoading = !0, setTimeout((function() {
                n.pageLoading = !1
              }), 500))
            },
            limitTel: function() {
              var e = /[^\d,]]*/g,
                t = this.phoneNumber.replace(e, "");
              if (this.phoneNumber = t, "86" === this.phoneCode) {
                t = t.substring(0, 11);
                var n = t.length;
                n > 3 && n < 8 ? this.phoneNumber = "".concat(t.substr(0, 3), " ").concat(t.substr(3)) : n >= 8 && (this.phoneNumber = "".concat(t.substr(0, 3), " ").concat(t.substr(3, 4), " ").concat(t.substr(7)))
              } else this.phoneNumber = t
            },
            limitCode: function() {
              var e = /[^\d,]]*/g;
              this.smsNumber = this.smsNumber.replace(e, "")
            },
            handelCursor: function(e, t) {
              if (" " === e.charAt(t)) {
                var n = e.substring(0, t - 2),
                  a = e.substring(t, e.length),
                  o = (n + a).trim();
                return o
              }
              return !1
            },
            handleInputPhoneDelete: function() {
              if ("86" === this.phoneCode) {
                var e = this.$refs.phoneNumber,
                  t = e.selectionStart,
                  n = this.phoneNumber,
                  a = this.handelCursor(n, t);
                a && (this.phoneNumber = a)
              }
            },
            handleVerificationCode: function() {
              var e = this;
              if (!this.isPhoneNull) {
                var t = "";
                this.phoneError = "";
                var n = this.phoneCode,
                  a = this.phoneNumber.replace(/[^\d,]]*/g, "");
                switch (n) {
                  case "86":
                    t = /^((1[3,5,7,8][0-9])|(14[5,7,9])|(16[5,6,7])|(19[0,1,3,5,8,9]))\d{8}$/;
                    break;
                  case "1":
                    t = /^\d{10}$/;
                    break;
                  case "886":
                    t = /^[09,9]\d{8}$/;
                    break;
                  case "852":
                    t = /^[5,6,9]\d{7}$/;
                    break;
                  case "853":
                    t = /^[6]\d{7}$/;
                    break;
                  case "60":
                    t = /^[1]\d{8,9}$/;
                    break;
                  case "61":
                    t = /^[4]\d{8}$/;
                    break;
                  case "81":
                    t = /^([7,8,9]0)\d{8}$/;
                    break;
                  case "82":
                    t = /^(1[0,1,6,7,8,9])\d{8}$/;
                    break;
                  case "65":
                    t = /^[8,9]\d{7}$/;
                    break;
                  case "44":
                    t = /^(7[4,5,7,8,9])\d{8}|[7624]\d{6}$/;
                    break;
                  case "33":
                    t = /^(7[3,4,5,6,7,8])\d{7}|[6]\d{8}$/;
                    break;
                  case "7":
                    t = /^(9[1,2,3,6,8,9])\d{8}|(9([0][1,2,3,4,5,6,8,9])|95[0,1,2,3])\d{7}$/;
                    break;
                  case "91":
                    t = /^[7,8,9]\d{9}$/;
                    break;
                  case "66":
                    t = /^[0][6,8,9]\d{8}$/;
                    break;
                  case "49":
                    t = /^[1][5,6,7]\d{8,9}$/;
                    break;
                  case "55":
                    t = /^\d{10,11}$/;
                    break;
                  case "62":
                    t = /^[8]\d{8,10}$/;
                    break;
                  case "855":
                    t = /^[1,6,7,8,9]\d{7,9}|[38]\d{6,8}$/;
                    break;
                  case "95":
                    t = /^([9]\d{7,9})|([64]\d{6,8})$/;
                    break;
                  case "673":
                    t = /^[8]\d{6,7}$/;
                    break;
                  case "63":
                    t = /^[9]\d{9}$/;
                    break;
                  case "84":
                    t = /^[1,3,5,7,8,9]\d{8,9}$/;
                    break;
                  case "856":
                    t = /^[20]\d{8,9}$/;
                    break;
                  case "64":
                    t = /^[2]\d{7,9}$/;
                    break;
                  case "39":
                    t = /^[3]\d{8,9}$/;
                    break;
                  case "34":
                    t = /^[6,7]\d{8}$/;
                    break;
                  case "48":
                    t = /^[4,5,6,7,8]\d{9}$/;
                    break;
                  default:
                    break
                }
                if (t.test(a)) {
                  this.validateWaiting = !0, s["a"].$emit("mvToast", {
                    type: "wait",
                    text: "处理中..."
                  }), this.phoneError = "";
                  var o = "";
                  o = "86" === n ? a : "00".concat(n).concat(a), this.$http.post("/api/login/sendsms", {
                    phone: o,
                    backURL: this.$route.query.backURL,
                    from: this.$route.query.from
                  }).then((function(t) {
                    s["a"].$emit("mvToast", !1), -100 != t.data.ok && (t.data.ok > 0 ? (e.step = 2, e.currentPhone = o, e.$nextTick((function() {
                      e.countDownTime()
                    }))) : e.phoneError = t.data.msg)
                  })).catch((function(e) {
                    console.log(), s["a"].$emit("mvToast", {
                      type: "error",
                      text: e.msg || "网络异常，请稍后再试~"
                    })
                  }))
                } else this.phoneError = this.errorMessage.phoneError
              }
            },
            confirmSmsCode: function() {
              var e = this,
                t = this;
              if (this.codeError = "", this.smsNumber.length >= 6) {
                var n = this.isRegister ? "/api/login/smsLogin" : "/api/login/smsReg";
                this.$http.post(n, {
                  phone: this.currentPhone,
                  code: this.smsNumber,
                  from: this.$route.query.from,
                  backURL: this.$route.query.backURL
                }).then((function(n) {
                  if (e.validateWaiting = !1, -100 != n.data.ok)
                    if (s["a"].$emit("mvToast", !1), n.data.ok > 0) {
                      i["a"].removeData("h5_jump_type");
                      var a = t.$route.query.backURL;
                      window.location.href = a || "/"
                    } else e.codeError = n.data.msg
                })).catch((function(t) {
                  e.validateWaiting = !1, s["a"].$emit("mvToast", !1), s["a"].$emit("mvToast", {
                    type: "error",
                    text: t.msg || "网络异常，请稍后再试~"
                  })
                }))
              }
            },
            handleCodeDelete: function() {
              this.smsNumber = ""
            },
            handleDelete: function() {
              this.phoneNumber = "", this.currentPhone = "", this.phoneError = ""
            },
            resendSmsCode: function() {
              var e = this;
              this.codeError = "", this.$http.post("/api/login/sendsms", {
                phone: this.currentPhone,
                backURL: this.$route.query.backURL,
                from: this.$route.query.from
              }).then((function(t) {
                s["a"].$emit("mvToast", !1), t.data.ok > 0 ? (e.isRepeat = !1, e.$nextTick((function() {
                  e.countDownTime()
                })), e.smsNumber = "") : e.codeError = t.data.msg
              })).catch((function(t) {
                e.validateWaiting = !1, s["a"].$emit("mvToast", !1), s["a"].$emit("mvToast", {
                  type: "error",
                  text: t.msg || "网络异常，请稍后再试~"
                })
              }))
            },
            countDownTime: function() {
              var e = this,
                t = this.repeatTime;
              this.timer || (this.times = t, this.timer = setInterval((function() {
                e.times > 1 && e.times <= t ? e.times-- : (clearInterval(e.timer), e.timer = null, e.times = e.repeatTime, e.isRepeat = !0)
              }), 1e3))
            },
            handleBack: function(e, t) {
              this.pageLoading = !1, this.step = e, clearInterval(this.timer), this.timer = null, t && (this.currentLoginMode = t)
            }
          }
        },
        c = r,
        m = (n("361f"), n("da34")),
        d = Object(m["a"])(c, a, o, !1, null, "636645c6", null);
      t["default"] = d.exports
    },
    "361f": function(e, t, n) {
      "use strict";
      n("eccf")
    },
    eccf: function(e, t, n) {}
  }
]);
//# sourceMappingURL=smsLogin.5c310e3d.js.map
