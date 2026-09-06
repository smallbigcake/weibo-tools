(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["app"], {
    0: function(t, e, i) {
      t.exports = i("56d7")
    },
    "0928": function(t, e, i) {
      "use strict";
      i("323f")
    },
    1: function(t, e) {},
    "226d": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = {
        scrollTarget: null,
        startY: 0,
        el: null
      };

      function o(t) {
        t.touches[0].pageY - s.startY > 0 && window.scrollY < 1 && t.preventDefault()
      }

      function n(t) {
        s.startY = t.touches[0].pageY
      }
      e["default"] = {
        name: "touchmove-controller",
        inserted: function(t) {
          t.addEventListener("touchstart", n), t.addEventListener("touchmove", o)
        },
        unbind: function() {
          s.el && (s.el.removeEventListener("touchstart", n), s.el.removeEventListener("touchmove", o))
        }
      }
    },
    "30d8": function(t, e, i) {
      "use strict";
      i("c411")
    },
    "323f": function(t, e, i) {},
    "383a": function(t, e, i) {
      "use strict";
      var s = i("2b0e");
      e["a"] = new s["default"]
    },
    "3ec7": function(t, e, i) {
      var s = {
        "./touchmove-controller.js": "226d"
      };

      function o(t) {
        var e = n(t);
        return i(e)
      }

      function n(t) {
        if (!i.o(s, t)) {
          var e = new Error("Cannot find module '" + t + "'");
          throw e.code = "MODULE_NOT_FOUND", e
        }
        return s[t]
      }
      o.keys = function() {
        return Object.keys(s)
      }, o.resolve = n, t.exports = o, o.id = "3ec7"
    },
    "43b3": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t._self._c;
          return e("div", [e("mv-toast"), e("mv-msgbox")], 1)
        },
        o = [],
        n = {
          name: "modal",
          props: {}
        },
        a = n,
        c = i("2877"),
        r = Object(c["a"])(a, s, o, !1, null, null, null);
      e["default"] = r.exports
    },
    4766: function(t, e, i) {
      "use strict";
      i("9600")
    },
    "4f26": function(t, e, i) {
      "use strict";
      i("a9dd")
    },
    "56d7": function(t, e, i) {
      "use strict";
      i.r(e);
      i("386d"), i("4917"), i("cadf"), i("551c"), i("f751"), i("097d");
      var s = i("2b0e"),
        o = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            directives: [{
              name: "touchmove-controller",
              rawName: "v-touchmove-controller"
            }],
            staticClass: "m-container-max",
            class: {
              html5: !t.$store.state.isApp && !t.inPrivacy
            }
          }, [t.inPrivacy ? t._e() : e("top-bar"), e("router-view"), e("woo-toast"), e("woo-dialog")], 1)
        },
        n = [],
        a = (i("8e6e"), i("ac6a"), i("456d"), i("bd86")),
        c = i("2f62"),
        r = {
          config: {}
        },
        l = {
          updateConfig: function(t, e) {
            t.config = Object.assign({}, e)
          }
        },
        d = {
          updateConfig: function(t, e) {
            var i = t.commit;
            return i("updateConfig", e)
          }
        },
        u = {
          config: function(t) {
            return t.config
          }
        },
        h = {
          state: r,
          actions: d,
          mutations: l,
          getters: u
        };
      s["default"].use(c["a"]);
      var w = new c["a"].Store({
          state: {
            title: "",
            state: "",
            isApp: navigator.userAgent.indexOf("_weibo_") > -1
          },
          mutations: {
            SET_TITLE: function(t, e) {
              t.title = e
            },
            SET_STATE: function(t, e) {
              t.state = e
            }
          },
          actions: {
            setTitle: function(t, e) {
              var i = t.commit;
              return i("SET_TITLE", e)
            },
            setState: function(t, e) {
              var i = t.commit;
              return i("SET_STATE", e)
            }
          },
          modules: {
            config: h
          }
        }),
        m = (i("28a5"), i("8c4f")),
        p = function() {
          var t = this,
            e = t._self._c;
          return e("div", [t._l(t.config, (function(i, s) {
            return i.hide ? t._e() : e("div", {
              key: s,
              staticClass: "module"
            }, [i.title ? e("div", {
              staticClass: "title"
            }, [t._v("\n      " + t._s(i.title) + "\n    ")]) : t._e(), e("div", {
              staticClass: "selector"
            }, t._l(i.controls, (function(i, s) {
              return e("a", {
                key: s,
                staticClass: "card-wrap select",
                attrs: {
                  href: "javascript:;"
                },
                on: {
                  click: function(e) {
                    return t.goDetail(i.href)
                  }
                }
              }, [e("div", {
                staticClass: "card-main"
              }, [e("div", {
                staticClass: "m-box"
              }, [e("div", {
                staticClass: "m-box-col m-box-dir m-box-center"
              }, [e("div", {
                staticClass: "m-text-box"
              }, [e("h3", {
                class: {
                  switch: "switch" === i.type
                }
              }, [t._v("\n                  " + t._s(i.desc) + "\n                ")])])]), e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("woo-fonticon", {
                staticClass: "font-icon",
                attrs: {
                  value: "angleRight"
                }
              })], 1)])])])
            })), 0), i.subTitle ? e("div", {
              staticClass: "desc"
            }, [t._v("\n      " + t._s(i.subTitle) + "\n    ")]) : t._e()])
          })), e("div", {
            staticClass: "lite-setup bsa",
            on: {
              click: t.logout
            }
          }, [t._m(0)])], 2)
        },
        f = [function() {
          var t = this,
            e = t._self._c;
          return e("a", [e("h4", [t._v("退出当前帐号")])])
        }],
        _ = {
          data: function() {
            return {}
          },
          methods: {
            goDetail: function(t) {
              "string" === typeof t ? window.open(t) : this.$router.push(t)
            },
            logout: function() {
              location.href = "https://m.weibo.cn/home/logout"
            }
          },
          computed: {
            config: function() {
              var t = 0;
              return window.config && (t = window.config.uid), {
                personal: {
                  controls: {
                    pInfo: {
                      desc: "个人资料",
                      href: "https://m.weibo.cn/users/".concat(t, "?set=1")
                    },
                    privacySetting: {
                      desc: "隐私设置",
                      href: {
                        name: "privacy_h5",
                        query: {
                          tab: "priset"
                        }
                      }
                    },
                    pbSetting: {
                      desc: "屏蔽设置",
                      href: "https://m.weibo.cn/setting?tab=block"
                    }
                  }
                },
                privacy: {
                  controls: {
                    secretFollow: {
                      desc: "悄悄关注",
                      href: "https://m.weibo.cn/setting?tab=whisper"
                    },
                    amount_safe: {
                      desc: "账号安全",
                      href: "https://security.weibo.com/account/security"
                    },
                    vSwitch: {
                      desc: "版本切换",
                      href: {
                        name: "version"
                      }
                    }
                  }
                },
                safe: {
                  controls: {
                    beauty: {
                      desc: "客服中心",
                      href: "http://kf.weibo.com"
                    }
                  }
                },
                bye: {
                  controls: {
                    mBox: {
                      desc: "关于微博",
                      href: "https://m.weibo.cn/about"
                    }
                  }
                }
              }
            }
          },
          created: function() {}
        },
        v = _,
        b = (i("eff4"), i("2877")),
        g = Object(b["a"])(v, p, f, !1, null, "4ddaf7f2", null),
        y = g.exports,
        $ = (i("b54a"), i("55dd"), i("6762"), i("2fdb"), function() {
          var t = this,
            e = t._self._c;
          return t.ok ? e("div", [e("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !t.settingsDetail && !t.showPersonalInfo,
              expression: "!settingsDetail && !showPersonalInfo"
            }]
          }, t._l(t.config, (function(i, s) {
            return i.hide ? t._e() : e("div", {
              key: s,
              staticClass: "module",
              class: t.$style.module
            }, [i.title ? e("div", {
              class: t.$style.title
            }, [t._v("\n        " + t._s(i.title) + "\n      ")]) : t._e(), e("div", {
              staticClass: "selector"
            }, t._l(i.controls, (function(i, s) {
              return i.hide ? t._e() : e("div", {
                key: s,
                staticClass: "card-wrap",
                class: [
                  ["select-switch", "select", "url"].indexOf(i.type) > -1 && "select", ["scheme"].includes(i.type) && "scheme", t.$style.wrap
                ],
                on: {
                  click: function(e) {
                    t.jumpTo(["select", "select-switch", "url"].indexOf(i.type) > -1, i)
                  }
                }
              }, [e("div", {
                staticClass: "card-main"
              }, [e("div", {
                staticClass: "m-box"
              }, [e("div", {
                staticClass: "m-box-col m-box-dir m-box-center"
              }, [e("div", {
                staticClass: "m-text-box"
              }, [e("h3", {
                class: {
                  switch: "switch" === i.type
                }
              }, [t._v("\n                    " + t._s(i.desc) + "\n                  ")]), i.subTitle ? e("div", {
                staticClass: "subtitle"
              }, [t._v("\n                    " + t._s(i.subTitle) + "\n                  ")]) : t._e()])]), "switch" === i.type ? e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("woo-switch", {
                class: t.$style.switch,
                attrs: {
                  "on-value": void 0 === i.onValue ? 1 : i.onValue,
                  "off-value": void 0 === i.offValue ? 0 : i.offValue,
                  disabled: i.disabled
                },
                nativeOn: {
                  click: function(e) {
                    return t.settingInterceptors(e, i)
                  }
                },
                model: {
                  value: t.$data[i.set],
                  callback: function(e) {
                    t.$set(t.$data, i.set, e)
                  },
                  expression: "$data[item.set]"
                }
              })], 1) : t._e(), ["select", "select-switch", "url"].indexOf(i.type) > -1 ? e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("span", [t._v(t._s(t.getContent(i.set, t.$data[i.set], t.$data[i.subSet])))]), e("woo-fonticon", {
                staticClass: "font-icon",
                attrs: {
                  value: "angleRight"
                }
              })], 1) : t._e(), "scheme" === i.type ? e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("woo-fonticon", {
                staticClass: "font-icon",
                attrs: {
                  value: "angleRight"
                }
              })], 1) : t._e()])])])
            })), 0)])
          })), 0), t.settingsDetail ? e("div", [e("div", {
            staticClass: "module",
            class: t.$style.module
          }, [
            ["select-switch", "switch"].includes(t.settingsDetail.type) ? t._e() : e("div", {
              staticClass: "title"
            }, [t._v("\n        " + t._s(t.settingsDetail.special_desc || t.settingsDetail.desc) + "\n      ")]), e("div", {
              staticClass: "selector"
            }, [
              ["select-switch", "switch"].includes(t.settingsDetail.type) ? e("div", {
                staticClass: "card-wrap",
                class: t.$style.wrap
              }, [e("div", {
                staticClass: "card-main"
              }, [e("div", {
                staticClass: "m-box"
              }, [e("div", {
                staticClass: "m-box-col m-box-dir m-box-center"
              }, [e("div", {
                staticClass: "m-text-box"
              }, [e("h3", {
                class: {
                  switch: "switch" === t.settingsDetail.type
                }
              }, [t._v("\n                    " + t._s(t.settingsDetail.desc) + "\n                  ")])])]), e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("woo-switch", {
                class: t.$style.switch,
                attrs: {
                  "on-value": void 0 === t.settingsDetail.onValue ? 1 : t.settingsDetail.onValue,
                  "off-value": void 0 === t.settingsDetail.offValue ? 0 : t.settingsDetail.offValue
                },
                nativeOn: {
                  click: function(e) {
                    return t.settingInterceptors(e, t.settingsDetail)
                  }
                },
                model: {
                  value: t.$data[t.settingsDetail.set],
                  callback: function(e) {
                    t.$set(t.$data, t.settingsDetail.set, e)
                  },
                  expression: "$data[settingsDetail.set]"
                }
              })], 1)])])]) : t._e(), t._l(t.settingsDetail.list, (function(i, s) {
                return e("div", {
                  key: s,
                  class: [(i && !i.sort || -1 === +i.tag) && "card-wrap", (i && !i.sort || -1 === +i.tag) && t.$style.wrap, i && i.sort && +i.tag > -1 && "sub-content"]
                }, [i && !i.sort || -1 === +i.tag ? e("div", {
                  staticClass: "card-main",
                  on: {
                    click: function(e) {
                      return t.select(i)
                    }
                  }
                }, [e("div", {
                  staticClass: "m-box"
                }, [e("div", {
                  staticClass: "m-box-col m-box-dir m-box-center"
                }, [e("div", {
                  staticClass: "m-text-box"
                }, [e("h3", [t._v(t._s(i.label))]), i.range && 4 === t.status_visible ? e("div", {
                  class: t.$style.range
                }, [e("span", {
                  on: {
                    click: t.onSelect
                  }
                }, [t._v(" " + t._s(t.selectYear) + t._s(t.$t("wd101")))]), t._v("-" + t._s(t.$t("wd100")) + "\n                  ")]) : t._e()]), i.desc && t.$data[t.settingsDetail.set] === i.key ? e("div", {
                  staticClass: "subtitle",
                  domProps: {
                    innerHTML: t._s(t.getDesc(i.desc))
                  }
                }) : t._e()]), e("div", {
                  staticClass: "box-right m-box-center-a",
                  class: {
                    active: i.key === t.$data[t.settingsDetail.set] && (!i.tag || -1 === i.tag)
                  }
                }, [e("i", {
                  staticClass: "m-font m-font-check",
                  staticStyle: {
                    color: "#10b524"
                  }
                })])])]) : t._e(), i && i.sort && +i.tag > -1 ? [e("div", {
                  staticClass: "card-wrap",
                  class: t.$style.wrap,
                  on: {
                    click: function(t) {
                      i.show = !i.show
                    }
                  }
                }, [e("div", {
                  staticClass: "card-main"
                }, [e("div", {
                  staticClass: "m-box"
                }, [e("div", {
                  staticClass: "m-box-col m-box-dir m-box-center"
                }, [e("div", {
                  staticClass: "m-text-box"
                }, [e("h3", [t._v(t._s(i.sort))])])]), e("div", {
                  staticClass: "box-right m-box-center-a",
                  class: {
                    open: i.show
                  }
                }, [e("woo-fonticon", {
                  staticClass: "font-icon",
                  attrs: {
                    value: "angleUp"
                  }
                })], 1)])])]), t._l(i.select.filter((function(t) {
                  return !t.hidden
                })), (function(o, n) {
                  return e("div", {
                    directives: [{
                      name: "show",
                      rawName: "v-show",
                      value: i.show,
                      expression: "item.show"
                    }],
                    key: n,
                    class: [t.$style.wrap, "card-wrap", "sub", s === t.settingsDetail.list.length - 1 && n === i.select.filter((function(t) {
                      return !t.hidden
                    })).length - 1 && "sub-last"],
                    on: {
                      click: function(e) {
                        return t.selectListItem(t.settingsDetail.set, o.key, o, i)
                      }
                    }
                  }, [e("div", {
                    staticClass: "card-main"
                  }, [e("div", {
                    staticClass: "m-box"
                  }, [e("div", {
                    staticClass: "m-box-col m-box-dir m-box-center"
                  }, [e("div", {
                    staticClass: "m-text-box"
                  }, [e("h3", [t._v(t._s(o.label))])]), o.desc && t.$data[t.settingsDetail.set] === o.key ? e("div", {
                    staticClass: "subtitle",
                    domProps: {
                      innerHTML: t._s(t.getDesc(o.desc))
                    }
                  }) : t._e()]), e("div", {
                    staticClass: "box-right m-box-center-a",
                    class: {
                      active: o.key === t.$data[t.settingsDetail.subSet] && i.key === t.$data[t.settingsDetail.set] || o.key === t.$data[t.settingsDetail.subSet]
                    }
                  }, [e("i", {
                    staticClass: "m-font m-font-check",
                    staticStyle: {
                      color: "#10b524"
                    }
                  })])])])])
                }))] : t._e()], 2)
              }))
            ], 2), t.settingsDetail.detail ? e("div", {
              staticClass: "desc"
            }, [t._v("\n        " + t._s(t.settingsDetail.detail) + "\n      ")]) : t._e()
          ]), t.settingsDetail.subItem ? e("div", {
            staticClass: "module",
            class: t.$style.module
          }, [t._l(t.settingsDetail.subItem, (function(i, s) {
            return ["title" === i.type ? [e("div", {
              key: s,
              staticClass: "title"
            }, [t._v(t._s(i.text))])] : "end" === i.type ? [e("div", {
              key: s,
              class: t.$style.end
            }, [t._v(t._s(i.text))])] : i.hide ? t._e() : [e("Item", {
              key: s,
              attrs: {
                data: i,
                value: t.$data[i.set],
                seamless: i.seamless
              },
              on: {
                onChange: function(e) {
                  return t.updateSetting(e, i.set, i)
                }
              }
            })]]
          }))], 2) : t._e()]) : t._e(), !t.settingsDetail && t.personalInfoConfig.length ? e("div", [t.showPersonalInfo ? t._e() : e("div", [e("text-content", {
            attrs: {
              text: t.$t("wd065"),
              rightText: t.$t("wd038")
            },
            on: {
              "content-click": function(e) {
                return t.$router.push({
                  hash: "personal_info"
                })
              }
            }
          })], 1), t.showPersonalInfo ? e("div", [t._l(t.personalInfoConfig, (function(i, s) {
            return ["container" === i.type ? [t._l(i.children, (function(o, n) {
              return ["switch" === o.type ? [o.hide ? t._e() : e("Item", {
                key: n,
                attrs: {
                  data: o,
                  value: t.$data[o.key]
                },
                on: {
                  onChange: function(e) {
                    return t.updateSetting(e, o.key, o)
                  }
                }
              })] : [o.hide ? t._e() : e("text-content", {
                key: "".concat(s).concat(n),
                attrs: {
                  text: o.text,
                  clicklog: o.clicklog,
                  exposurelog: o.exposurelog,
                  targetUrl: o.targetUrl,
                  noPaddingBottom: n !== i.children.length - 1,
                  desc: o.desc
                }
              })]]
            }))] : [i.hide ? t._e() : e("Item", {
              key: s,
              attrs: {
                data: i,
                value: t.$data[i.key]
              },
              on: {
                onChange: function(e) {
                  return t.updateSetting(e, i.key)
                }
              }
            })]]
          }))], 2) : t._e()]) : t._e(), e("Popup", {
            attrs: {
              position: "bottom"
            },
            model: {
              value: t.selectVisible,
              callback: function(e) {
                t.selectVisible = e
              },
              expression: "selectVisible"
            }
          }, [e("DatetimePicker", {
            attrs: {
              type: "year-month",
              "min-date": t.minDate,
              "max-date": t.maxDate,
              "confirm-button-text": t.$t("wd107"),
              "cancel-button-text": t.$t("wd108")
            },
            on: {
              cancel: t.onCancel,
              confirm: t.onConfirm
            },
            model: {
              value: t.selectYearModel,
              callback: function(e) {
                t.selectYearModel = e
              },
              expression: "selectYearModel"
            }
          })], 1), t.showModal ? e("div", {
            class: t.$style.modalBox
          }, [e("div", {
            class: t.$style.mask,
            on: {
              click: t.onClose
            }
          }), e("div", {
            class: t.$style.modal
          }, [e("div", {
            class: t.$style.header
          }, [e("img", {
            attrs: {
              src: "https://d.sinaimg.cn/prd/1005/891/2025/11/24/close.png"
            },
            on: {
              click: t.onKeep
            }
          })]), e("img", {
            class: t.$style.icon,
            attrs: {
              src: "https://d.sinaimg.cn/prd/1005/891/2025/11/24/icon.png"
            }
          }), e("div", {
            class: t.$style.title
          }, [t._v(t._s(t.$t("wd109")))]), e("div", {
            class: t.$style.desc
          }, [t._v("\n        " + t._s(t.$t("wd110"))), e("a", {
            class: t.$style.link,
            on: {
              click: function(e) {
                return t.handleClickLink("https://m.weibo.cn/c/privacy/recommendationPolicy")
              }
            }
          }, [t._v(t._s(t.$t("wd111")))])]), e("div", {
            class: t.$style.buttons
          }, [e("span", {
            class: t.$style.keep,
            on: {
              click: t.onKeep
            }
          }, [t._v(t._s(t.$t("wd112")))]), e("span", {
            class: t.$style.open,
            on: {
              click: t.onOpen
            }
          }, [t._v(t._s(t.$t("wd113")))])])])]) : t._e()], 1) : t._e()
        }),
        k = [],
        x = (i("c5f6"), i("a481"), i("4328")),
        C = i.n(x),
        T = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            class: ["module", t.noPaddingBottom && "no-padding-bottom", t.$style.module, t.noPaddingBottom && t.$style.noBottomGap]
          }, [e("div", {
            staticClass: "selector",
            on: {
              click: t.onContentClick
            }
          }, [e("div", {
            staticClass: "card-wrap select",
            class: t.$style.wrap
          }, [e("div", {
            staticClass: "card-main"
          }, [e("div", {
            staticClass: "m-box"
          }, [e("div", {
            staticClass: "m-box-col m-box-dir m-box-center"
          }, [e("div", {
            staticClass: "m-text-box"
          }, [e("h3", {}, [t._v("\n                " + t._s(t.text) + "\n              ")])])]), e("div", {
            staticClass: "box-right m-box-center-a"
          }, [e("span", [t._v(t._s(t.rightText))]), e("woo-fonticon", {
            staticClass: "font-icon",
            attrs: {
              value: "angleRight"
            }
          })], 1)])])])]), t.desc ? e("div", {
            staticClass: "desc"
          }, [t._v("\n    " + t._s(t.desc) + "\n  ")]) : t._e()])
        },
        O = [],
        S = {
          props: {
            text: String,
            rightText: String,
            targetUrl: String,
            noPaddingBottom: Boolean,
            desc: String,
            clicklog: Object,
            exposurelog: Object
          },
          methods: {
            onContentClick: function() {
              if (this.targetUrl) {
                var t = this.targetUrl;
                return navigator.userAgent.indexOf("weibo") > -1 && this.targetUrl.match(/^http(s)?/) && (t = "sinaweibo://browser?url=".concat(encodeURIComponent(this.targetUrl))), this.clicklog && this.actionLog(this.clicklog), void setTimeout((function() {
                  window.location.href = t
                }), 500)
              }
              this.$emit("content-click")
            }
          },
          mounted: function() {
            this.exposurelog && this.actionLog(this.exposurelog)
          }
        },
        P = S,
        D = i("b7a8");

      function I(t) {
        this["$style"] = D["default"].locals || D["default"]
      }
      var B = Object(b["a"])(P, T, O, !1, I, null, null),
        j = B.exports,
        A = function() {
          var t = this,
            e = t._self._c;
          return t.data.hide ? t._e() : e("div", {
            staticClass: "module",
            class: [!t.seamless && t.$style.module]
          }, [e("div", {
            staticClass: "selector"
          }, [e("div", {
            staticClass: "card-wrap",
            class: ["select" === t.data.type && "select", t.$style.wrap]
          }, [e("div", {
            staticClass: "card-main"
          }, [e("div", {
            staticClass: "m-box"
          }, [e("div", {
            staticClass: "m-box-col m-box-dir m-box-center"
          }, [e("div", {
            staticClass: "m-text-box"
          }, [e("h3", {
            class: {
              switch: "switch" === t.data.type
            }
          }, [t._v("\n                " + t._s(t.data.desc) + "\n              ")]), t.data.detail ? e("div", {
            staticClass: "subtitle"
          }, [t._v("\n                " + t._s(t.data.detail) + "\n              ")]) : t._e()])]), "switch" === t.data.type ? e("div", {
            staticClass: "box-right m-box-center-a"
          }, [e("woo-switch", {
            class: t.$style.switch,
            attrs: {
              value: t.value,
              "on-value": 1,
              "off-value": 0
            },
            on: {
              change: t.handleChange
            }
          })], 1) : t._e()])])])])])
        },
        V = [],
        L = {
          name: "item",
          props: {
            data: {
              type: Object,
              default: function() {
                return {}
              }
            },
            prop: {
              type: String
            },
            value: {},
            seamless: Boolean
          },
          methods: {
            handleChange: function() {
              this.$emit("onChange", {
                key: this.value ? 0 : 1,
                newVal: +!this.value,
                oldVal: +this.value
              })
            }
          }
        },
        E = L,
        M = i("9320");

      function U(t) {
        this["$style"] = M["default"].locals || M["default"]
      }
      var W = Object(b["a"])(E, A, V, !1, U, null, null),
        q = W.exports,
        N = i("6ca7"),
        R = i.n(N),
        F = i("cb5c"),
        J = i.n(F),
        Y = (i("f0a2"), i("160b"), {
          input: {
            account_type: function(t) {
              return 21 === +t ? 1 : 0
            }
          },
          output: {
            account_type: function(t) {
              return 1 === +t ? {
                account_type: 21
              } : {
                account_type: 1
              }
            }
          }
        }),
        z = {
          data: function() {
            var t = (new Date).getFullYear() - 1;
            return {
              showModal: !1,
              scene: this.$route.query.scene,
              ok: 0,
              bindstatus: 0,
              allow_comment: 1,
              cmt_privacy: -1,
              cmt_cloud: 0,
              pic_cmt_in: 0,
              show_manager_visible: 0,
              mention: 0,
              block: 0,
              contact_list: 0,
              allow_mobile: 0,
              request_flag: 0,
              nearby_display: 0,
              img_search_disabled: 0,
              nearby_display_show: 1,
              allow_comment_old: 0,
              cmt_privacy_old: 0,
              status_visible_show: 0,
              status_visible: 0,
              account_type: -1,
              account_type_show: 0,
              config: {},
              interceptItems: [],
              jump_url_account_type: "",
              canback: !1,
              rescode: "",
              ad_type: -1,
              recom_interest_content: -1,
              privacy_tip: "",
              mention_show: 0,
              tiefen: !1,
              showAuth: !1,
              personalInfoConfig: [],
              authUrl: "",
              green_mode: 0,
              green_mode_remain_time: "",
              green_mode_show: 0,
              green_mode_show_by_client_version: !1,
              show_ip_location: 0,
              show_ip_location_visible: 0,
              block_desc_show_by_client_version: !1,
              show_video_visible: 0,
              video_visible: 0,
              article_visible: 0,
              show_article_visible: 0,
              fold_comment: 0,
              flash_chat: 0,
              unfollowing_recom_show: !1,
              unfollowing_recom_switch: !1,
              visit_visible_show_by_client_version: !1,
              show_cloud_visible: !1,
              like_display: 0,
              like_display_visible: !1,
              comment_display: 0,
              comment_display_visible: !1,
              load_part_hidden_visible: !1,
              long_pic_share_setting_visible_by_client_version: !1,
              selectYear: t,
              selectYearModel: t,
              selectVisible: !1,
              minDate: new Date(2009, 0, 1),
              maxDate: new Date((new Date).getFullYear() - 1, 0, 1),
              show_status_visible: 0,
              select_interest_visible_by_client_version: !1,
              hasUid: !1
            }
          },
          computed: {
            associateLabel: function() {
              return {
                1: "".concat(this.$t("wd039")),
                2: "".concat(this.$t("wd098")),
                3: "".concat(this.$t("wd097")),
                4: "".concat(this.selectYear).concat(this.$t("wd101"), "-").concat(this.$t("wd100"))
              } [this.status_visible]
            },
            hash: function() {
              return this.$route.hash.replace("#", "")
            },
            showPersonalInfo: function() {
              return "personal_info" === this.hash
            },
            settingsDetail: function() {
              for (var t in this.config) {
                var e = this.config[t];
                if (e.controls[this.hash] && !e.controls[this.hash].hide) return e.controls[this.hash]
              }
              return ""
            },
            isHd: function() {
              return -1 !== this.cmt_privacy
            },
            comment: function() {
              if (-1 === this.cmt_privacy || 4 === this.cmt_privacy) return this.allow_comment;
              switch (this.cmt_privacy) {
                case 0:
                  return 4;
                case 1:
                  return 5;
                case 2:
                  return 6;
                case 3:
                  return 7
              }
            },
            blockDesc: function() {
              var t = navigator.userAgent.indexOf("weibo") > -1;
              return t && this.block_desc_show_by_client_version ? {
                text: ""
              } : ""
            }
          },
          watch: {
            comment: function(t, e) {
              var i = this;
              if (!this.green_mode && this.request_flag) {
                this.request_flag = 0;
                var s = {};
                t > 3 ? s.cmt_privacy = this.cmt_privacy : s.allow_comment = this.allow_comment, e < 4 && (s.allow_comment = this.allow_comment), this.$Bus.$emit("wooToast", {
                  type: "loading",
                  message: this.$t("wd031"),
                  mask: !0
                }), s.scene = this.$route.query.scene, this.$http.post("/settingDeal/privacySave", s).then((function(t) {
                  1 === t.data.ok ? i.$Bus.$emit("wooToast", {
                    type: "success",
                    message: i.$t("wd030")
                  }) : (i.spErrorCb(+(t.data && t.data.errno)) && i.$Bus.$emit("wooToast", {
                    type: "error",
                    message: t.data && t.data.msg || i.$t("wd029")
                  }), i.allow_comment = i.allow_comment_old, i.cmt_privacy = i.cmt_privacy_old), setTimeout((function() {
                    i.request_flag = 1
                  }), 300)
                })).catch((function(t) {
                  i.$Bus.$emit("wooToast", {
                    type: "error",
                    message: t && t.message || i.$t("wd029")
                  }), i.allow_comment = i.allow_comment_old, i.cmt_privacy = i.cmt_privacy_old
                }))
              }
            },
            allow_comment: function(t, e) {
              this.allow_comment_old = e
            },
            cmt_privacy: function(t, e) {
              this.cmt_privacy_old = e
            },
            settingsDetail: {
              immediate: !0,
              handler: function(t) {
                var e = this;
                this.settingsDetail && this.settingsDetail.list && this.settingsDetail.list.forEach((function(t) {
                  return t.show = !0
                })), this.$store.dispatch("setState", this.settingsDetail), setTimeout((function() {
                  e.canback = !!t
                }), 60)
              }
            }
          },
          methods: {
            handleClickLink: function(t) {
              window.open(t, "__blank")
            },
            onConfirm: function(t) {
              var e = this;
              this.selectYearModel = new Date(t).getFullYear(), this.selectYear = this.selectYearModel, this.selectVisible = !1, this.$http.post("/settingDeal/privacySave", {
                status_visible: 4,
                ext_value: this.selectYear
              }).then((function(t) {
                t.data.ok > 0 ? e.$Bus.$emit("wooToast", {
                  type: "success",
                  message: e.$t("wd030")
                }) : e.spErrorCb(+(t.data && t.data.errno)) && !t.data.hideToast && e.$Bus.$emit("wooToast", {
                  type: "error",
                  message: t.data && t.data.msg || e.$t("wd029")
                })
              }))
            },
            onCancel: function() {
              this.selectVisible = !1, this.selectYearModel = this.selectYear
            },
            onSelect: function() {
              this.selectVisible = !0
            },
            getDesc: function() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = t.text;
              return t.richText && Array.isArray(t.richText) && t.richText.forEach((function(i) {
                var s = '<a href="'.concat(i.href, '" target="_blank">').concat(i.text, "</a>");
                e = t.text.replace(i.text, s)
              })), e
            },
            goPrivacy: function(t) {
              window.location.href = t
            },
            updateSetting: function(t, e) {
              var i = t.newVal,
                s = t.oldVal,
                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              this.setInfo(i, e, s, o)
            },
            checkshowAuth: function() {
              var t = this,
                e = navigator.userAgent,
                i = e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
                s = e.indexOf("weibo") > -1;
              i && s ? this.$getBrowserInfo((function(e) {
                var i = e.clientVersion;
                t.showAuth = t.compareVersion(i, "11.11.2") >= 0
              })) : this.showAuth = !0
            },
            getClientVersion: function() {
              var t = this,
                e = navigator.userAgent,
                i = e.indexOf("weibo") > -1;
              this.authUrl = "https://m.weibo.cn/c/privacy/authList?showmenu=0", i && this.$getBrowserInfo((function(e) {
                var i = e.clientVersion;
                t.compareVersion(i, "11.12.2") >= 0 && (t.authUrl = "https://m.weibo.cn/c/wbox?id=15wg7rc1rd&page=pages/systemPermissions/systemPermissions"), t.compareVersion(i, "12.3.1") >= 0 && (t.green_mode_show_by_client_version = !0), t.compareVersion(i, "12.5.1") >= 0 && (t.block_desc_show_by_client_version = !0), t.compareVersion(i, "13.11.1") >= 0 && (t.visit_visible_show_by_client_version = !0), t.compareVersion(i, "15.0.0") >= 0 && (t.select_interest_visible_by_client_version = !0), t.compareVersion(i, "16.4.1") >= 0 && (t.long_pic_share_setting_visible_by_client_version = !0)
              }))
            },
            compare: function(t, e) {
              return +t > +e ? 1 : t === e ? 0 : -1
            },
            compareVersion: function(t, e) {
              for (var i = t.split("."), s = e.split("."), o = i.length, n = 0; n < o; n++) {
                var a = this.compare(i[n], s[n]);
                if (0 !== a) return a;
                if (n === o - 1) return a
              }
            },
            jumpTo: function(t, e) {
              e.lockKey && this[e.lockKey] ? e.lockMsg && this.$Bus.$emit("wooDialog", {
                type: e.lockMsg.type,
                message: e.lockMsg.msg,
                btnConfirm: e.lockMsg.okText
              }) : "url" !== e.type ? "scheme" !== e.type ? t && this.$router.push({
                hash: e.set
              }) : this.$utils.goLink(e.href) : window.location.href = "/c/f01fans/assistant?showmenu=0&assistant=1"
            },
            settingInterceptors: function(t, e) {
              "green_mode" === e.set && e.disabled && this.green_mode && this.$Bus.$emit("wooToast", {
                type: "error",
                message: this.$t("wd106")
              }), this.interceptItems.includes(e.set) && this.setIntercept(t, e)
            },
            setIntercept: function(t, e) {
              "account_type" === e.set && (t.preventDefault(), location.href = this.jump_url_account_type)
            },
            solveInterceptItem: function() {
              var t, e = this.rescode,
                i = "error";
              e && 1e4 === e ? (i = "success", t = this.$t("wd030")) : 10002 === e ? t = this.$route.query.error_msg ? decodeURIComponent(this.$route.query.error_msg) : this.$t("wd029") : 50020001 === e ? t = void 0 : e && (t = this.$t(e)), t && this.$Bus.$emit("wooToast", {
                type: i,
                message: t,
                mask: !0
              }), this.solveBack(), history.replaceState(null, "", this.getCleanPath())
            },
            solveBack: function() {
              var t = this;
              this.$store.state.isApp && (history.pushState(null, "", ""), window.onpopstate = function() {
                t.canback || (location.href = "sinaweibo://browser/close")
              })
            },
            getCleanPath: function() {
              var t = Object.assign({}, this.$route.query);
              delete t.rescode, delete t.error_msg;
              var e = location.pathname;
              return C.a.stringify(t) && (e += "?".concat(C.a.stringify(t))), e
            },
            getQueryObj: function() {
              var t = Object.assign({}, this.$route.query);
              return delete t.rescode, delete t.error_msg, JSON.stringify(t)
            },
            getContent: function(t, e, i) {
              for (var s in this.config) {
                var o = this.config[s];
                if (o.controls[t]) {
                  if ("url" === o.controls[t].type) return "";
                  if ("select-switch" === o.controls[t].type) return this.account_type ? "已锁定" : "未锁定";
                  for (var n = 0; n < o.controls[t].list.length; n++) {
                    var a = o.controls[t].list[n];
                    if (a.sort && +a.tag > -1)
                      for (var c = 0; c < a.select.length; c++) {
                        var r = a.select[c];
                        if (r.key === i) return r.label
                      }
                    if (a.key === e) return a.associateLabel ? this.associateLabel : a.label
                  }
                }
              }
            },
            setWatch: function() {
              var t = this;
              for (var e in this.config) {
                var i = this.config[e],
                  s = function(e) {
                    if (!i.controls[e].special) {
                      var s = i.controls[e];
                      t.$watch(e, (function(i, o) {
                        var n = e;
                        t.setInfo(i, n, +o, s)
                      }))
                    }
                  };
                for (var o in i.controls) s(o)
              }
            },
            unLockSelectCard: function() {
              this.request_flag = 0, this.getPrivacy()
            },
            lockSelectCard: function() {
              var t = this,
                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
              e.forEach((function(e) {
                t[e.key] = e.targetValue
              }))
            },
            handleGreenMode: function(t) {
              var e = this;
              this.green_mode && (this.request_flag = 0, this.green_mode_remain_time = t, this.$nextTick((function() {
                e.request_flag = 1
              }))), this.handleGreenModeLock(this.green_mode)
            },
            handleGreenModeLock: function(t) {
              var e = [{
                key: "allow_comment",
                targetValue: 1
              }, {
                key: "block",
                targetValue: 1
              }];
              t ? (this.lockSelectCard(e), this.refreshConfig()) : this.unLockSelectCard()
            },
            setInfo: function(t, e, i) {
              var s = this,
                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
              if ((!this.green_mode || !["block"].includes(e)) && this.request_flag) {
                this.request_flag = 0;
                var n = {};
                if (["contact_list", "allow_mobile"].indexOf(e) > -1 ? n[e] = +t ? 0 : 1 : n[e] = +t, "status_visible" === e && 4 === t && (n["ext_value"] = this.selectYear), Y.output[e] && (n = Y.output[e](t)), this.$Bus.$emit("wooToast", {
                    type: "loading",
                    message: this.$t("wd031"),
                    mask: !0
                  }), n.scene = this.$route.query.scene, !this.hasUid) return void this.setRecommendInterestContent(n.recom_interest_content).then((function() {
                  s[e] = t, s.refreshConfig(), s.request_flag = 1
                })).catch((function() {
                  s.$Bus.$emit("wooToast", {
                    type: "error",
                    message: s.$t("wd029")
                  })
                }));
                this.$http.post("/settingDeal/privacySave", n).then((function(n) {
                  var a = n.data;
                  1 === n.data.ok ? ("recom_interest_content" === e && s.$sendWboxBroadcast({
                    key: "WB_FEED_CUSTOM_RECOMMEND_SWITCH_CHANGE",
                    data: {
                      state: t
                    }
                  }), "recom_interest_content" !== e || t ? s.$Bus.$emit("wooToast", {
                    type: "success",
                    message: s.$t("wd030")
                  }) : (s.$Bus.$emit("wooToastClose"), s.showModal = !0, s.actionLog({
                    act_code: 10047
                  })), s.request_flag = 1, s[e] = t, a.data && Object.keys(a.data).forEach((function(t) {
                    s[t] = a.data[t]
                  })), o && o.refreshConfig && s.refreshConfig(), "green_mode" === e && s.handleGreenMode(n.data.green_mode_time)) : (s.spErrorCb(+(n.data && n.data.errno)) && !n.data.hideToast && s.$Bus.$emit("wooToast", {
                    type: "error",
                    message: n.data && n.data.msg || s.$t("wd029")
                  }), s.request_flag = 0, s[e] = i, setTimeout((function() {
                    s.request_flag = 1
                  }), 0))
                })).catch((function(t) {
                  s.$Bus.$emit("wooToast", {
                    type: "error",
                    message: t && t.message || s.$t("wd029")
                  }), s.request_flag = 0, s[e] = i, setTimeout((function() {
                    s.request_flag = 1
                  }), 0)
                }))
              }
            },
            select: function(t) {
              this[this.settingsDetail.set] = t.key, this.isHd && this.settingsDetail.subKey && (this[this.settingsDetail.subSet] = this.settingsDetail.subKey)
            },
            selectListItem: function(t, e, i, s) {
              this[i.set] = e, this[t] = s.key || e
            },
            spErrorCb: function(t) {
              var e = this;
              if (20212 === t) {
                var i = navigator.userAgent,
                  s = i.indexOf("Android") > -1 || i.indexOf("Linux") > -1;
                this.$Bus.$emit("wooDialog", {
                  type: "confirm",
                  title: this.$t("wd044"),
                  message: this.$t("wd045"),
                  btnConfirm: this.$t("wd047"),
                  btnCancel: this.$t("wd046"),
                  action: function() {
                    s ? e.$utils.goLink("https://new.vip.weibo.cn/paycenter?F=tq_seehalfyear&month=baoyue_3") : e.$utils.compareVersion("9.4.3") ? e.$utils.goLink("sinaweibo://wbox?id=5cc40d2fb5fbd&F=tq_seehalfyear&month=baoyue_3") : e.$utils.goLink("https://new.vip.weibo.cn/paycenter?F=tq_seehalfyear&month=baoyue_3")
                  }
                })
              } else {
                if (20468 !== t && 20237 !== t) return !0;
                this.$Bus.$emit("wooToast", {
                  type: "error",
                  message: this.$t(20468)
                })
              }
            },
            refreshConfig: function() {
              switch (this.scene) {
                case "logout_comment":
                  this.config = {
                    interactive: {
                      title: this.$t("wd075"),
                      controls: {
                        allow_comment: {
                          desc: this.$t("wd012"),
                          value: this.allow_comment,
                          lastValue: this.allow_comment,
                          lockKey: "green_mode",
                          lockMsg: {
                            msg: this.$t("wd073"),
                            type: "alert",
                            okText: this.$t("wd074")
                          },
                          set: "allow_comment",
                          special: !0,
                          subSet: "cmt_privacy",
                          subKey: 4,
                          detail: this.privacy_tip,
                          list: [{
                            label: this.$t("wd004"),
                            key: 0
                          }, {
                            label: this.$t("wd005"),
                            key: 1
                          }, {
                            label: this.$t("wd020"),
                            sort: this.$t("wd020"),
                            key: 3,
                            tag: this.cmt_privacy,
                            show: !0,
                            select: [{
                              label: this.$t("wd032"),
                              key: 0,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd033"),
                              key: 1,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd034"),
                              key: 2,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd054"),
                              key: 3,
                              set: "cmt_privacy",
                              hidden: !this.tiefen
                            }]
                          }],
                          type: "select"
                        },
                        cmt_cloud: {
                          desc: this.$t("wd025"),
                          value: this.cmt_cloud,
                          set: "cmt_cloud",
                          subTitle: this.show_cloud_visible ? this.$t("wd091") : this.$t("wd028"),
                          type: "switch"
                        }
                      }
                    }
                  };
                  break;
                case "logout_protect":
                  this.config = {
                    interactive: {
                      title: this.$t("wd075"),
                      controls: {
                        green_mode: {
                          disabled: this.green_mode_disabled,
                          hide: !this.green_mode_show || !this.green_mode_show_by_client_version,
                          desc: this.$t("wd070"),
                          subTitle: 1 === +this.green_mode ? this.$t("wd072") + this.green_mode_remain_time : this.$t("wd071"),
                          value: this.green_mode,
                          set: "green_mode",
                          type: "switch"
                        }
                      }
                    }
                  };
                  break;
                case "visitor":
                  this.personalInfoConfig = [{
                    type: "container",
                    children: [{
                      text: this.$t("wd048"),
                      targetUrl: "https://future.biz.weibo.com/ad-recommend",
                      hide: -1 === this.ad_type
                    }, {
                      key: "recom_interest_content",
                      hide: -1 === this.recom_interest_content,
                      desc: this.$t("wd056"),
                      value: this.recom_interest_content,
                      type: "switch",
                      detail: this.$t("wd057")
                    }, {
                      text: this.$t("wd105"),
                      targetUrl: "https://m.weibo.cn/c/privacy/downloadEntry?showmenu=0"
                    }]
                  }];
                  break;
                default:
                  this.config = {
                    mobile: {
                      title: this.$t("wd008"),
                      status: this.bindstatus,
                      controls: {
                        contact_list: {
                          desc: this.$t("wd009"),
                          value: this.contact_list,
                          set: "contact_list",
                          type: "switch"
                        },
                        allow_mobile: {
                          desc: this.$t("wd010"),
                          value: this.allow_mobile,
                          set: "allow_mobile",
                          type: "switch"
                        }
                      }
                    },
                    ys: {
                      title: this.$t("wd075"),
                      status: 1,
                      controls: {
                        green_mode: {
                          disabled: this.green_mode_disabled,
                          hide: !this.green_mode_show || !this.green_mode_show_by_client_version,
                          desc: this.$t("wd070"),
                          subTitle: 1 === +this.green_mode ? this.$t("wd072") + this.green_mode_remain_time : this.$t("wd071"),
                          value: this.green_mode,
                          set: "green_mode",
                          type: "switch"
                        },
                        allow_comment: {
                          desc: this.$t("wd012"),
                          value: this.allow_comment,
                          lastValue: this.allow_comment,
                          lockKey: "green_mode",
                          lockMsg: {
                            msg: this.$t("wd073"),
                            type: "alert",
                            okText: this.$t("wd074")
                          },
                          set: "allow_comment",
                          special: !0,
                          subSet: "cmt_privacy",
                          subKey: 4,
                          detail: this.privacy_tip,
                          list: [{
                            label: this.$t("wd004"),
                            key: 0
                          }, {
                            label: this.$t("wd005"),
                            key: 1
                          }, {
                            label: this.$t("wd020"),
                            sort: this.$t("wd020"),
                            key: 3,
                            tag: this.cmt_privacy,
                            show: !0,
                            select: [{
                              label: this.$t("wd032"),
                              key: 0,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd033"),
                              key: 1,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd034"),
                              key: 2,
                              set: "cmt_privacy"
                            }, {
                              label: this.$t("wd054"),
                              key: 3,
                              set: "cmt_privacy",
                              hidden: !this.tiefen
                            }]
                          }],
                          type: "select"
                        },
                        block: {
                          desc: this.$t("wd021"),
                          special_desc: this.$t("wd082"),
                          value: this.block,
                          set: "block",
                          subSet: "block",
                          lockKey: "green_mode",
                          lockMsg: {
                            msg: this.$t("wd073"),
                            type: "alert",
                            okText: this.$t("wd074")
                          },
                          list: [{
                            label: this.$t("wd079"),
                            key: 0
                          }, {
                            label: this.$t("wd058"),
                            sort: this.$t("wd058"),
                            tag: this.block,
                            show: !0,
                            select: [{
                              label: this.$t("wd059"),
                              key: 3,
                              set: "block",
                              desc: this.blockDesc
                            }, {
                              label: this.$t("wd060"),
                              key: 4,
                              set: "block",
                              desc: this.blockDesc
                            }, {
                              label: this.$t("wd061"),
                              key: 5,
                              set: "block",
                              desc: this.blockDesc
                            }]
                          }, {
                            label: this.$t("wd062"),
                            key: 1
                          }, {
                            label: this.$t("wd063"),
                            key: 2
                          }],
                          detail: "",
                          type: "select"
                        },
                        cmt_cloud: {
                          desc: this.$t("wd025"),
                          value: this.cmt_cloud,
                          set: "cmt_cloud",
                          subTitle: this.show_cloud_visible ? this.$t("wd091") : this.$t("wd028"),
                          type: "switch"
                        },
                        pic_cmt_in: {
                          desc: this.$t("wd018"),
                          value: this.pic_cmt_in,
                          set: "pic_cmt_in",
                          type: "switch",
                          subTitle: this.$t("wd019")
                        },
                        coordinator: {
                          desc: this.$t("wd087"),
                          hide: !this.show_manager_visible,
                          href: "sinaweibo://wbox?id=ppj49v69pq&route=administrator&page=pages/white-revert/white-revert",
                          type: "scheme"
                        },
                        mention: {
                          hide: !this.mention_show,
                          desc: this.$t("wd013"),
                          special_desc: this.$t("wd051"),
                          value: this.mention,
                          set: "mention",
                          list: [{
                            label: this.$t("wd004"),
                            key: 0
                          }, {
                            label: this.$t("wd005"),
                            key: 1
                          }],
                          type: "select"
                        },
                        flash_chat: {
                          desc: this.$t("wd089"),
                          value: this.flash_chat,
                          set: "flash_chat",
                          type: "switch",
                          subTitle: this.$t("wd090")
                        }
                      }
                    },
                    time: {
                      title: this.$t("wd053"),
                      hide: !this.status_visible_show,
                      controls: {
                        status_visible: {
                          desc: this.$t("wd037"),
                          special_desc: this.$t("wd040"),
                          value: this.status_visible,
                          set: "status_visible",
                          refreshConfig: !0,
                          list: this.show_status_visible ? [{
                            label: this.$t("wd038"),
                            key: 0
                          }, {
                            label: this.$t("wd097"),
                            key: 3,
                            associateLabel: !0
                          }, {
                            label: this.$t("wd098"),
                            key: 2,
                            associateLabel: !0
                          }, {
                            label: this.$t("wd039"),
                            key: 1,
                            associateLabel: !0
                          }, {
                            label: this.$t("wd099"),
                            key: 4,
                            range: !0,
                            associateLabel: !0
                          }] : [{
                            label: this.$t("wd038"),
                            key: 0
                          }, {
                            label: this.$t("wd039"),
                            key: 1,
                            associateLabel: !0
                          }],
                          detail: this.$t("wd041"),
                          type: "select",
                          subItem: [{
                            hide: !this.show_video_visible || 0 === this.status_visible,
                            component: "switch",
                            type: "switch",
                            desc: this.$t("wd083"),
                            value: this.video_visible,
                            set: "video_visible",
                            refreshConfig: !0,
                            seamless: !0
                          }, {
                            hide: !this.show_article_visible || 0 === this.status_visible,
                            component: "switch",
                            type: "switch",
                            desc: this.$t("wd096"),
                            value: this.article_visible,
                            set: "article_visible",
                            refreshConfig: !0
                          }]
                        },
                        account_type: {
                          hide: !this.account_type_show,
                          desc: this.$t("wd042"),
                          value: this.account_type,
                          special: this.interceptItems.includes("account_type"),
                          set: "account_type",
                          type: "select-switch",
                          detail: this.$t("wd043")
                        },
                        nearby_display: {
                          hide: !this.nearby_display_show,
                          desc: this.$t("wd035"),
                          value: this.nearby_display,
                          set: "nearby_display",
                          type: "switch",
                          subTitle: this.$t("wd055")
                        },
                        img_search_disabled: {
                          desc: this.$t("wd114"),
                          value: this.img_search_disabled,
                          set: "img_search_disabled",
                          type: "switch",
                          onValue: 0,
                          offValue: 1
                        },
                        like_display: {
                          hide: !this.like_display_visible,
                          desc: this.$t("wd092"),
                          value: this.like_display,
                          subTitle: this.$t("wd093"),
                          set: "like_display",
                          subSet: "like_display",
                          list: [{
                            label: this.$t("wd004"),
                            key: 0
                          }, {
                            label: this.$t("wd020"),
                            key: 1
                          }, {
                            label: this.$t("wd094"),
                            key: 2
                          }, {
                            label: this.$t("wd095"),
                            key: 3
                          }],
                          type: "select"
                        },
                        comment_display: {
                          hide: !this.comment_display_visible,
                          desc: this.$t("wd102"),
                          value: this.comment_display,
                          subTitle: this.$t("wd103"),
                          set: "comment_display",
                          subSet: "comment_display",
                          list: [{
                            label: this.$t("wd004"),
                            key: 0
                          }, {
                            label: this.$t("wd020"),
                            key: 1
                          }, {
                            label: this.$t("wd094"),
                            key: 2
                          }, {
                            label: this.$t("wd095"),
                            key: 3
                          }],
                          type: "select"
                        },
                        blog_long_pic_share_setting: {
                          hide: !this.load_part_hidden_visible || !this.long_pic_share_setting_visible_by_client_version,
                          desc: this.$t("wd115"),
                          subTitle: this.$t("wd116"),
                          href: "https://m.weibo.cn/c/wbox?id=a7dg27tv5c&wbox_mode=test&sessionId=1541360",
                          type: "scheme"
                        }
                      }
                    },
                    social: {
                      hide: !this.unfollowing_recom_show,
                      controls: {
                        unfollowing_recom_switch: {
                          hide: !this.unfollowing_recom_show,
                          desc: this.$t("wd068"),
                          value: this.unfollowing_recom_switch,
                          set: "unfollowing_recom_switch",
                          type: "switch",
                          subTitle: this.$t("wd069")
                        }
                      }
                    },
                    visit_visible: {
                      hide: !this.visit_visible_show_by_client_version,
                      controls: {
                        coordinator: {
                          desc: this.$t("wd088"),
                          hide: !this.visit_visible_show_by_client_version,
                          href: "sinaweibo://wbox?id=2pi6c3qvdd&page=pages/switchset/index&close_app=true",
                          type: "scheme"
                        }
                      }
                    },
                    show_ip_location: {
                      title: this.$t("wd078"),
                      hide: !this.show_ip_location_visible,
                      controls: {
                        show_ip_location: {
                          hide: !this.show_ip_location_visible,
                          desc: this.$t("wd076"),
                          value: this.show_ip_location,
                          set: "show_ip_location",
                          type: "switch",
                          subTitle: this.$t("wd077")
                        }
                      }
                    },
                    select_interest: {
                      hide: !this.select_interest_visible_by_client_version,
                      controls: {
                        show_ip_location: {
                          type: "scheme",
                          desc: this.$t("wd104"),
                          href: "sinaweibo://wbox?id=kb229qjh0v&page=pages/index/index"
                        }
                      }
                    }
                  }, this.personalInfoConfig = [{
                    type: "container",
                    children: [{
                      text: this.$t("wd064"),
                      targetUrl: this.authUrl,
                      hide: !this.showAuth
                    }]
                  }, {
                    type: "container",
                    children: [{
                      text: this.$t("wd048"),
                      targetUrl: "https://future.biz.weibo.com/ad-recommend",
                      hide: -1 === this.ad_type
                    }, {
                      key: "recom_interest_content",
                      hide: -1 === this.recom_interest_content,
                      desc: this.$t("wd056"),
                      value: this.recom_interest_content,
                      type: "switch",
                      detail: this.$t("wd057")
                    }, {
                      exposurelog: {
                        act_code: 8416,
                        ext: "my_tab_set:my_information"
                      },
                      clicklog: {
                        act_code: 8417,
                        ext: "my_tab_set:my_information"
                      },
                      text: this.$t("wd105"),
                      targetUrl: "https://m.weibo.cn/c/privacy/downloadEntry?showmenu=0"
                    }]
                  }]
              }
            },
            getPrivacy: function() {
              var t = this;
              this.$http.get("/setting/privacy", {
                params: {
                  query: this.getQueryObj(),
                  scene: this.$route.query.scene
                }
              }).then((function(e) {
                if (t.$Bus.$emit("wooToastClose"), e.data && 1 === +e.data.ok && e.data) {
                  var i = e.data.data || e.data;
                  t.allow_comment = i.privacy.comment, t.cmt_privacy = i.privacy.privacy_type || 0 === +i.privacy.privacy_type ? i.privacy.privacy_type : -1, t.tiefen = i.privacy.tiefen;
                  var s = location.search.match(/lang=(\w+)/) ? location.search.match(/lang=(\w+)/)[1] : "zh_CN";
                  i.privacy["privacy_tip_".concat(s)] && (t.privacy_tip = i.privacy["privacy_tip_".concat(s)]), t.cmt_cloud = i.mention.cloud_blacklist, t.mention = i.mention.mention, t.mention_show = i.mention.mention_show, t.pic_cmt_in = i.mention.pic_cmt_in, t.show_manager_visible = i.mention.show_manager_visible, t.block = +i.block, t.contact_list = i.mention.contact_list ? 0 : 1, t.allow_mobile = i.privacy.mobile ? 0 : 1, t.nearby_display = i.mention.nearby_display, t.img_search_disabled = void 0 === i.mention.img_search_disabled ? i.privacy.img_search_disabled || 0 : i.mention.img_search_disabled, t.nearby_display_show = -1 !== i.mention.near_by, t.ad_type = i.privacy.ad_type, t.recom_interest_content = i.mention.recom_interest_content, t.green_mode = i.mention.green_mode, t.green_mode_remain_time = i.mention.green_mode_time, t.green_mode_show = i.mention.green_mode_show, t.green_mode_disabled = 2 === i.mention.green_mode_source, t.show_ip_location = i.mention.show_ip_location, t.show_ip_location_visible = i.mention.show_ip_location_visible, t.show_cloud_visible = !!i.mention.show_cloud_visible, t.unfollowing_recom_show = i.mention.show_unfollowing_recom_visible, t.unfollowing_recom_switch = i.mention.unfollowing_recom_switch, i.privacy.status_visible > -1 ? t.status_visible_show = 1 : t.status_visible_show = 0, t.fold_comment = i.mention.fold_comment, t.flash_chat = i.mention.flash_chat, t.show_video_visible = i.mention.show_video_visible, t.video_visible = i.privacy.video_visible, t.status_visible = i.privacy.status_visible, t.selectYear = i.privacy.status_visible_y || t.selectYear, t.selectYearModel = new Date(i.privacy.status_visible_y || t.selectYearModel, 0, 1), t.article_visible = i.privacy.article_visible, t.show_article_visible = i.mention.show_article_visible, t.show_status_visible = !!i.mention.show_status_visible, t.account_type_show = i.privacy.account_type > 0, t.account_type = Y.input.account_type(i.privacy.account_type), t.like_display = i.mention.like_display, t.like_display_visible = i.mention.load_like_display_visible, t.comment_display = i.mention.comment_display, t.comment_display_visible = i.mention.load_comment_display_visible, t.load_part_hidden_visible = i.mention.load_part_hidden_visible, t.jump_url_account_type = i.privacy.sms_url, t.jump_url_account_type && t.interceptItems.push("account_type"), t.ok = 1, t.hasUid = e.data.has_uid, t.getVisitorInterestContent(e.data.has_uid), t.refreshConfig(), setTimeout((function() {
                    t.request_flag = 1, t.rescode && t.solveInterceptItem()
                  }), 0), t.setWatch()
                } else t.$Bus.$emit("wooToast", {
                  type: "error",
                  message: e.data && e.data.msg || "error"
                })
              }))
            },
            getVisitorInterestContent: function(t) {
              "visitor" !== this.$route.query.scene || t || this.getRecommendInterestContent()
            },
            getRecommendInterestContent: function() {
              var t = this;
              window.PrivacyPageJSObj && window.PrivacyPageJSObj.callJSBridge && window.PrivacyPageJSObj.callJSBridge("getNoUserSetting", {
                key: "visitor_customized_recommendation"
              }, (function(e) {
                if (e.success) {
                  var i = Number(e.data); - 1 !== i && (t.recom_interest_content = i)
                }
              }))
            },
            setRecommendInterestContent: function(t) {
              return new Promise((function(e, i) {
                window.PrivacyPageJSObj && window.PrivacyPageJSObj.callJSBridge && window.PrivacyPageJSObj.callJSBridge("setNoUserSetting", {
                  key: "visitor_customized_recommendation",
                  value: t
                }, (function(t) {
                  t.success ? e("success") : i("error")
                }))
              }))
            },
            onClose: function() {
              this.showModal = !1, this.actionLog({
                act_code: 10048,
                ext: "action:close"
              })
            },
            onKeep: function() {
              this.showModal = !1, this.actionLog({
                act_code: 10048,
                ext: "action:keep"
              })
            },
            onOpen: function() {
              this.actionLog({
                act_code: 10048,
                ext: "action:open"
              }), this.setInfo(1, "recom_interest_content", 0), this.showModal = !1
            }
          },
          created: function() {
            var t = this;
            this.checkshowAuth(), this.getClientVersion(), this.refreshConfig(), this.setWatch(), this.$nextTick((function() {
              t.$Bus.$emit("wooToast", {
                type: "loading",
                message: ""
              })
            })), this.getPrivacy(), this.rescode = +this.$route.query.rescode
          },
          components: {
            textContent: j,
            Item: q,
            DatetimePicker: R.a,
            Popup: J.a
          }
        },
        K = z,
        H = i("6bfd");

      function G(t) {
        this["$style"] = H["default"].locals || H["default"]
      }
      var Q = Object(b["a"])(K, $, k, !1, G, null, null),
        Z = Q.exports,
        X = (i("7f7f"), function() {
          var t = this,
            e = t._self._c;
          return t.loaded ? e("div", {
            staticClass: "comment-wrap"
          }, t._l(t.configs, (function(i, s) {
            return e(i.component, {
              key: s,
              tag: "component",
              attrs: {
                data: i,
                value: t.$data[s],
                subValue: t.$data[i.subSet]
              },
              on: {
                onChange: function(e) {
                  return t.handleChange(e, s)
                }
              }
            })
          })), 1) : t._e()
        }),
        tt = [],
        et = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "module",
            class: t.$style.module
          }, [e("div", {
            staticClass: "title"
          }, [t._v("\n    " + t._s(t.data.desc) + "\n  ")]), e("div", {
            staticClass: "selector"
          }, [t._l(t.data.list.filter((function(e) {
            return !e.select || -1 === t.subValue
          })), (function(i) {
            return e("div", {
              key: i.key,
              staticClass: "card-wrap",
              class: t.$style.wrap,
              on: {
                click: function(e) {
                  return t.change(i)
                }
              }
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [e("div", {
              staticClass: "m-text-box"
            }, [e("h3", [t._v(t._s(i.label))])])]), e("div", {
              staticClass: "box-right m-box-center-a",
              class: {
                active: i.key === t.value && (!t.subValue || [-1, 4].indexOf(t.subValue) > -1)
              }
            }, [e("i", {
              staticClass: "m-font m-font-check",
              staticStyle: {
                color: "#10b524"
              }
            })])])])])
          })), t._l(t.data.list.filter((function(e) {
            return e && e.sort && +t.subValue > -1
          })), (function(i) {
            return e("div", {
              key: i.key,
              staticClass: "sub-content"
            }, [e("div", {
              staticClass: "card-wrap",
              class: t.$style.wrap,
              on: {
                click: function(t) {
                  i.show = !i.show
                }
              }
            }, [e("div", {
              staticClass: "card-main"
            }, [e("div", {
              staticClass: "m-box"
            }, [e("div", {
              staticClass: "m-box-col m-box-dir m-box-center"
            }, [e("div", {
              staticClass: "m-text-box"
            }, [e("h3", [t._v(t._s(i.label))])])]), e("div", {
              staticClass: "box-right m-box-center-a",
              class: {
                open: i.show
              }
            }, [e("woo-fonticon", {
              staticClass: "font-icon",
              attrs: {
                value: "angleUp"
              }
            })], 1)])])]), t._l(i.select.filter((function(t) {
              return !t.hidden
            })), (function(s, o) {
              return e("div", {
                directives: [{
                  name: "show",
                  rawName: "v-show",
                  value: i.show,
                  expression: "item.show"
                }],
                key: o,
                staticClass: "card-wrap sub",
                class: t.$style.wrap,
                on: {
                  click: function(e) {
                    return t.selectListItem(t.data.set, s.key, s, i)
                  }
                }
              }, [e("div", {
                staticClass: "card-main"
              }, [e("div", {
                staticClass: "m-box"
              }, [e("div", {
                staticClass: "m-box-col m-box-dir m-box-center"
              }, [e("div", {
                staticClass: "m-text-box"
              }, [e("h3", [t._v(t._s(s.label))])])]), e("div", {
                staticClass: "box-right m-box-center-a",
                class: {
                  active: s.key === t.subValue && i.key === t.value
                }
              }, [e("i", {
                staticClass: "m-font m-font-check",
                staticStyle: {
                  color: "#10b524"
                }
              })])])])])
            }))], 2)
          }))], 2), t.data.detail ? e("div", {
            staticClass: "desc"
          }, [t._v("\n    " + t._s(t.data.detail) + "\n  ")]) : t._e()])
        },
        it = [],
        st = {
          name: "list",
          props: {
            list: {
              type: Array,
              default: function() {
                return []
              }
            },
            data: {
              type: Object,
              default: function() {
                return {}
              }
            },
            value: {
              type: [Number, String]
            },
            subValue: {
              type: [Number, String],
              default: -1
            }
          },
          data: function() {
            return {}
          },
          methods: {
            selectListItem: function(t, e, i, s) {
              var o = s.key;
              this.$emit("onChange", {
                subKey: e,
                key: o,
                subProp: i.set
              })
            },
            change: function(t) {
              var e = t.key;
              this.$emit("onChange", {
                key: e
              })
            }
          }
        },
        ot = st,
        nt = i("aa0c");

      function at(t) {
        this["$style"] = nt["default"].locals || nt["default"]
      }
      var ct = Object(b["a"])(ot, et, it, !1, at, null, null),
        rt = ct.exports,
        lt = {
          data: function() {
            return {
              allow_comment: 1,
              cmt_cloud: 0,
              cmt_privacy: -1,
              privacy_type: -1,
              pic_cmt_in: 0,
              loaded: !1,
              privacy_tip: "",
              configs: {},
              tiefen: !1,
              fold_comment: 0
            }
          },
          methods: {
            handleChange: function(t, e) {
              var i = this,
                s = t.key,
                o = t.subKey,
                n = t.subProp,
                a = {};
              n ? (a[n] = o, -1 === [0, 1, 2, 3].indexOf(this.cmt_privacy) && (a[e] = s)) : a[e] = s, this.updateProp(a, (function() {
                n && (i[n] = o), "allow_comment" !== e || n || (i.cmt_privacy = i.privacy_type || 0 === +i.privacy_type ? i.privacy_type : -1), i[e] = s
              }))
            },
            spErrorCb: function(t) {
              var e = this;
              if (20212 === t) {
                var i = navigator.userAgent,
                  s = i.indexOf("Android") > -1 || i.indexOf("Linux") > -1;
                this.$Bus.$emit("wooDialog", {
                  type: "confirm",
                  title: this.$t("wd044"),
                  message: this.$t("wd045"),
                  btnConfirm: this.$t("wd047"),
                  btnCancel: this.$t("wd046"),
                  action: function() {
                    s ? e.$utils.goLink("https://new.vip.weibo.cn/paycenter?F=tq_seehalfyear&month=baoyue_3") : e.$utils.compareVersion("9.4.3") ? e.$utils.goLink("sinaweibo://wbox?id=5cc40d2fb5fbd&F=tq_seehalfyear&month=baoyue_3") : e.$utils.goLink("https://new.vip.weibo.cn/paycenter?F=tq_seehalfyear&month=baoyue_3")
                  }
                })
              } else if (20468 === t || 20237 === t) return this.$Bus.$emit("wooToast", {
                type: "error",
                message: this.$t(20468)
              }), !1;
              return !0
            },
            updateProp: function(t, e) {
              var i = this;
              this.$Bus.$emit("wooToast", {
                type: "loading",
                message: this.$t("wd031"),
                mask: !0
              }), this.$http.post("/settingDeal/privacySave", t).then((function(t) {
                1 === t.data.ok ? (i.$Bus.$emit("wooToast", {
                  type: "success",
                  message: i.$t("wd030")
                }), e()) : i.spErrorCb(+(t.data && t.data.errno)) && i.$Bus.$emit("wooToast", {
                  type: "error",
                  message: t.data && t.data.msg || i.$t("wd029")
                })
              })).catch((function(t) {
                i.$Bus.$emit("wooToast", {
                  type: "error",
                  message: t && t.message || i.$t("wd029")
                })
              }))
            },
            compareVersion: function(t, e) {
              for (var i = t.split("."), s = e.split("."), o = i.length, n = 0; n < o; n++) {
                var a = this.compare(i[n], s[n]);
                if (0 !== a) return a;
                if (n === o - 1) return a
              }
            },
            compare: function(t, e) {
              return +t > +e ? 1 : t === e ? 0 : -1
            },
            getClientVersion: function() {
              var t = navigator.userAgent;
              t.indexOf("weibo")
            }
          },
          created: function() {
            var t = this;
            this.$nextTick((function() {
              t.$Bus.$emit("wooToast", {
                type: "loading",
                message: ""
              })
            })), this.getClientVersion(), this.$http.get("/setting/privacy").then((function(e) {
              if (t.$Bus.$emit("wooToastClose"), e.data && 1 === +e.data.ok && e.data) {
                var i = e.data.data || e.data;
                t.allow_comment = i.privacy.comment, t.cmt_cloud = i.mention.cloud_blacklist, t.privacy_type = i.privacy.privacy_type, t.cmt_privacy = i.privacy.privacy_type || 0 === +i.privacy.privacy_type ? i.privacy.privacy_type : -1;
                var s = location.search.match(/lang=(\w+)/) ? location.search.match(/lang=(\w+)/)[1] : "zh_CN";
                i.privacy["privacy_tip_".concat(s)] && (t.privacy_tip = i.privacy["privacy_tip_".concat(s)]), t.pic_cmt_in = i.mention.pic_cmt_in, t.tiefen = i.privacy.tiefen, t.fold_comment = i.mention.fold_comment, t.configs = {
                  allow_comment: {
                    component: "list",
                    type: "list",
                    desc: t.$t("wd012"),
                    value: t.allow_comment,
                    set: "allow_comment",
                    subSet: "cmt_privacy",
                    subKey: 4,
                    detail: t.privacy_tip,
                    list: [{
                      label: t.$t("wd004"),
                      key: 0
                    }, {
                      label: t.$t("wd005"),
                      key: 1
                    }, {
                      label: t.$t("wd020"),
                      sort: t.$t("wd020"),
                      key: 3,
                      tag: t.cmt_privacy,
                      show: !0,
                      select: [{
                        label: t.$t("wd032"),
                        key: 0,
                        set: "cmt_privacy"
                      }, {
                        label: t.$t("wd033"),
                        key: 1,
                        set: "cmt_privacy"
                      }, {
                        label: t.$t("wd034"),
                        key: 2,
                        set: "cmt_privacy"
                      }, {
                        label: t.$t("wd054"),
                        key: 3,
                        set: "cmt_privacy",
                        hidden: !t.tiefen
                      }]
                    }]
                  },
                  pic_cmt_in: {
                    component: "item",
                    type: "switch",
                    desc: t.$t("wd018"),
                    value: t.pic_cmt_in,
                    set: "pic_cmt_in",
                    detail: t.$t("wd019")
                  }
                }, t.loaded = !0
              } else t.$Bus.$emit("wooToast", {
                type: "error",
                message: e.data && e.data.msg || "error"
              })
            }))
          },
          components: {
            List: rt,
            Item: q
          }
        },
        dt = lt,
        ut = (i("4f26"), Object(b["a"])(dt, X, tt, !1, null, null, null)),
        ht = ut.exports,
        wt = function() {
          var t = this,
            e = t._self._c;
          return e("div", t._l(t.config, (function(i, s) {
            return i.hide ? t._e() : e("div", {
              key: s,
              staticClass: "module"
            }, [i.title ? e("div", {
              staticClass: "title"
            }, [t._v("\n      " + t._s(i.title) + "\n    ")]) : t._e(), t._m(0, !0), e("div", {
              staticClass: "selector"
            }, t._l(i.controls, (function(i, s) {
              return e("a", {
                key: s,
                staticClass: "card-wrap",
                attrs: {
                  href: "javascript:;"
                },
                on: {
                  click: function(e) {
                    return t.goDetail(i.href)
                  }
                }
              }, [e("div", {
                staticClass: "card-main"
              }, [e("div", {
                staticClass: "m-box"
              }, [e("div", {
                staticClass: "m-box-col m-box-dir m-box-center"
              }, [e("div", {
                staticClass: "m-text-box"
              }, [e("h3", {
                class: {
                  switch: "switch" === i.type
                }
              }, [t._v("\n                  " + t._s(i.desc) + "\n                ")])])]), e("div", {
                staticClass: "box-right m-box-center-a"
              }, [e("woo-fonticon", {
                staticClass: "font-icon",
                attrs: {
                  value: "angleRight"
                }
              })], 1)])])])
            })), 0), i.subTitle ? e("div", {
              staticClass: "desc"
            }, [t._v("\n      " + t._s(i.subTitle) + "\n    ")]) : t._e()])
          })), 0)
        },
        mt = [function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "selector"
          }, [e("a", {
            staticClass: "card-wrap",
            attrs: {
              href: "javascript:alert('没错，你用的就是这个高大上的版本~\\n忽略下面俩货吧~');"
            }
          }, [e("div", {
            staticClass: "card-main"
          }, [e("div", {
            staticClass: "m-box"
          }, [e("div", {
            staticClass: "m-box-col m-box-dir m-box-center"
          }, [e("div", {
            staticClass: "m-text-box"
          }, [e("h3", [t._v("触屏版")])])]), e("div", {
            staticClass: "box-right m-box-center-a"
          }, [t._v("当前版本")])])])])])
        }],
        pt = {
          data: function() {
            return {}
          },
          methods: {
            goDetail: function(t) {
              "string" === typeof t ? location.href = t : this.$router.push(t)
            }
          },
          computed: {
            config: function() {
              return {
                personal: {
                  controls: {
                    cb: {
                      desc: "彩版",
                      href: "http://m.weibo.cn/home/version?url=http%3A%2F%2Fweibo.cn"
                    },
                    client: {
                      desc: "客户端",
                      href: "https://m.weibo.cn/feature/applink"
                    }
                  }
                }
              }
            }
          },
          created: function() {}
        },
        ft = pt,
        _t = Object(b["a"])(ft, wt, mt, !1, null, null, null),
        vt = _t.exports,
        bt = {
          zh_CN: {
            default_tel_msg: "设置失败，请稍后重试",
            1e4: "设置成功！",
            10001: "身份校验失败",
            10003: "没有权限",
            50020001: "未绑定手机",
            50020002: "设置失败，请稍后重试",
            50020003: "设置失败，请稍后重试",
            50020004: "设置失败，请稍后重试",
            50020005: "设置失败，请稍后重试",
            50020006: "设置失败，请稍后重试",
            50020007: "设置失败，请稍后重试",
            50020008: "设置失败，请稍后重试",
            50020009: "设置失败，请稍后重试",
            20468: "修改可评论范围功能暂不可用"
          },
          zh_HK: {
            default_tel_msg: "設施失敗，請稍後重試",
            1e4: "設置成功！",
            10001: "身份校驗失敗",
            10003: "沒有權限",
            50020001: "未綁定手機",
            50020002: "設施失敗，請稍後重試",
            50020003: "設施失敗，請稍後重試",
            50020004: "設施失敗，請稍後重試",
            50020005: "設施失敗，請稍後重試",
            50020006: "設施失敗，請稍後重試",
            50020007: "設施失敗，請稍後重試",
            50020008: "設施失敗，請稍後重試",
            50020009: "設施失敗，請稍後重試",
            20468: "修改可評論範圍功能暫不可用"
          },
          en_US: {
            default_tel_msg: "Set failed!Please try again later",
            1e4: "Set successfully!",
            10001: "Identity verification failed",
            10003: "Permission denied",
            50020001: "Unbound phone",
            50020002: "Set failed!Please try again later",
            50020003: "Set failed!Please try again later",
            50020004: "Set failed!Please try again later",
            50020005: "Set failed!Please try again later",
            50020006: "Set failed!Please try again later",
            50020007: "Set failed!Please try again later",
            50020008: "Set failed!Please try again later",
            50020009: "Set failed!Please try again later",
            20468: "User update privacy comment temporary unavailable"
          }
        };

      function gt(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e && (s = s.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, s)
        }
        return i
      }

      function yt(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? gt(Object(i), !0).forEach((function(e) {
            Object(a["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : gt(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      var $t = {
          zh_CN: yt(yt({}, bt.zh_CN), {}, {
            wd001: "隐私设置",
            wd002: "收到哪些新消息提醒我",
            wd003: "新评论",
            wd004: "所有人",
            wd005: "我关注的人",
            wd006: "新私信",
            wd007: "新粉丝",
            wd008: "通讯录",
            wd009: "不允许给我推荐通讯录好友",
            wd010: "不允许通过此手机号搜到我",
            wd011: "关闭后，你的通讯录好友将不能通过通讯录找到你",
            wd012: "哪些人可以评论我的微博",
            wd013: "@消息接收范围",
            wd014: "允许通过此手机号搜到我",
            wd015: "哪些人可以给我发私信",
            wd016: "原有的私信设置失效,新的默认设置为已关注用户的私信进入私信箱，未关注用户的私信进入留言箱。",
            wd017: "保存",
            wd018: "允许评论带图",
            wd019: "关闭后，其他人将不能在你的微博下发布带图片的评论",
            wd020: "我的粉丝",
            wd021: "我可以收到哪些人的私信",
            wd022: "不再接收未关注人私信",
            wd023: "评论精选",
            wd024: "开启后，新发布的微博收到的评论需要你审核通过后才对他人可见",
            wd025: "评论防火墙",
            wd026: "标准",
            wd027: "加强",
            wd028: "开启后，系统将对含有屏蔽词、黑名单及不良信用记录用户的评论进行过滤。",
            wd029: "设置失败！",
            wd030: "设置成功！",
            wd031: "设置中...",
            wd032: "所有粉丝",
            wd033: "关注 7 天以上",
            wd034: "关注 100 天以上",
            wd035: "不允许我的微博在同城中显示",
            wd036: "开启后，你的微博在同城中不可见",
            wd037: "微博可见时间范围",
            wd038: "全部",
            wd039: "最近半年",
            wd040: "允许查看微博的时间范围",
            wd041: "在该时间范围之前发布的微博，将对其他人不可见",
            wd042: "用户锁定",
            wd043: "锁定后，你的所有微博对其他人不可见，个人主页将隐藏已发布内容。你仍可浏览微博、收发私信、参与群聊，但通知功能和关注、转发、评论、赞等互动操作将被停用。7天后用户锁定结束，账号状态恢复正常。也可以随时进入本页面提前解除锁定。",
            wd044: "该功能仅会员可用",
            wd045: "是否立即开通会员？",
            wd046: "以后再说",
            wd047: "开通会员",
            wd048: "个性化广告推荐",
            wd049: "关闭后，你看到的广告数量将保持不变，但是广告相关度会相对降低。",
            wd050: "评论权限",
            wd051: "接收哪些人的@消息",
            wd052: "涨粉小助手",
            wd053: "微博可见范围",
            wd054: "铁粉",
            wd055: "开启后，你的微博在同城中不可见。",
            wd056: "个性化内容推荐",
            wd057: "关闭后，将不会基于个性化因素向你进行内容推荐，你可能会看到不感兴趣的内容",
            wd058: "我关注的人和我的粉丝",
            wd059: "我关注的人和所有粉丝",
            wd060: "我关注的人和关注我7天以上的粉丝",
            wd061: "我关注的人和关注我30天以上的粉丝",
            wd062: "我关注的人",
            wd063: "互关好友",
            wd064: "系统权限管理",
            wd065: "个人信息与权限",
            wd066: "第三方合作清单",
            wd067: "个人信息清单",
            wd068: "开启社交关系微博推荐",
            wd069: "开启后，我的关注或赞过的微博可能被推送给粉丝，关注人的关注或赞过的微博可能被推送给我",
            wd070: "一键防护",
            wd071: "开启后，7天内将不接收未关注人的私信/评论/转发/@消息，不能被关注/搜索到",
            wd072: "开启后，7天内将不接收未关注人的私信/评论/转发/@消息，不能被关注/搜索到，有效期至",
            wd073: "您已开启一键防护模式，无法修改当前设置，请关闭一键防护模式后，进行修改",
            wd074: "我知道了",
            wd075: "互动管理",
            wd076: "显示IP属地",
            wd077: "开启后，个人主页将显示IP属地信息",
            wd078: "IP属地管理",
            wd079: "默认",
            wd080: "未关注人私信相关设置，可前往设置",
            wd081: "前往设置",
            wd082: "我可以收到哪些人的私信（或私信提醒）",
            wd083: "原创音视频全部可见",
            wd084: "（原创视频全部可见）",
            wd085: "折叠疑似低质评论",
            wd086: "开启后，疑似低质评论会在评论箱折叠展示",
            wd087: "协管员",
            wd088: "主页访客",
            wd089: "不允许他人找我闪聊",
            wd090: "开启后，其他人无法找你开启闪聊",
            wd091: "开启后，系统将对含有屏蔽词、黑名单（包括政媒用户拉黑用户）及不良信用记录用户的评论进行过滤。",
            wd092: "点赞微博在主页可见范围",
            wd093: "点赞24小时后才会在你的主页显示",
            wd094: "好友圈",
            wd095: "仅我自己",
            wd096: "原创文章全部可见",
            wd097: "最近三年",
            wd098: "最近一年",
            wd099: "自定义时间",
            wd100: "至今",
            wd101: "年",
            wd102: "评论微博在主页可见范围",
            wd103: "只显示对蓝V以及百万粉以上博主的评论",
            wd104: "内容偏好管理",
            wd105: "个人信息下载",
            wd106: "暂时无法自行关闭一键防护功能，如需关闭可咨询@微博客服",
            wd107: "确认",
            wd108: "取消",
            wd109: "管理个性化内容推荐",
            wd110: "关闭后，您将无法收到个性化内容，将会影响您的阅读体验。",
            wd111: "详细了解",
            wd112: "仍然关闭",
            wd113: "打开",
            wd114: "在识图搜索中展示我的微博",
            wd115: "分享长图设置",
            wd116: "设置微博正文分享生成长图范围"
          }),
          zh_HK: yt(yt({}, bt.zh_HK), {}, {
            wd001: "隱私設置",
            wd002: "收到哪些新消息提醒我",
            wd003: "新評論",
            wd004: "所有人",
            wd005: "我關註的人",
            wd006: "新私信",
            wd007: "新粉絲",
            wd008: "通訊錄",
            wd009: "不允許給我推薦通訊錄好友",
            wd010: "不允許通過此手機號搜到我",
            wd011: "關閉後，你的通訊錄好友將不能通過通訊錄找到你",
            wd012: "哪些人可以評論我的微博",
            wd013: "@消息接收範圍",
            wd014: "允許通過此手機號搜到我",
            wd015: "哪些人可以給我發私信",
            wd016: "原有的私信設置失效，新的默認設置為已關註用戶的私信進入私信箱，未關註用戶的私信進入留言箱。",
            wd017: "保存",
            wd018: "允許評論帶圖",
            wd019: "關閉後，其他人將不能在妳的微博下發布帶圖片的評論",
            wd020: "我的粉絲",
            wd021: "我可以收到哪些人的私信",
            wd022: "不再接收未關注人私信",
            wd023: "評論精選",
            wd024: "開啟后，新發佈的微博收到的評論需要你審核通過后才對他人可見",
            wd025: "評論防火墻",
            wd026: "標準",
            wd027: "加強",
            wd028: "開啟後，系統將對含有遮罩詞、黑名單及不良信用記錄用戶的評論進行過濾。",
            wd029: "設置失敗！",
            wd030: "設置成功！",
            wd031: "設置中...",
            wd032: "所有粉絲",
            wd033: "關注 7 天以上",
            wd034: "關注 100 天以上",
            wd035: "不允許我的微博在同城中顯示",
            wd036: "開啟後，你的微博在同城中不可見",
            wd037: "微博可見時間範圍",
            wd038: "全部",
            wd039: "最近半年",
            wd040: "允許查看微博的時間範圍",
            wd041: "在該時間範圍之前發布的微博，將對其他人不可見",
            wd042: "用戶鎖定",
            wd043: "鎖定后，你的所有微博對其他人不可見，個人主頁將隱藏已發佈內容；你仍可瀏覽微博，收發私信，參與群聊，但通知功能和關注、轉發、評論、贊等互動操作將被停用；7天后用戶鎖定結束，賬號狀態恢復正常。你也可隨時進入本頁面提前解除鎖定。",
            wd044: "該功能僅會員可用",
            wd045: "是否立即開通會員？",
            wd046: "以後再說",
            wd047: "開通會員",
            wd048: "個性化廣告推薦",
            wd049: "關閉後，你看到的廣告數量將保持不變，但是廣告相關度會相對降低。",
            wd050: "評論許可權",
            wd051: "接收哪些人的@消息",
            wd052: "漲粉小助手",
            wd053: "微博可見範圍",
            wd054: "鐵粉",
            wd055: "開啟後，你的微博在同城中不可見。",
            wd056: "個性化內容推薦",
            wd057: "關閉後，將不會基於個性化因素向你進行內容推薦，你可能會看到不感興趣的內容",
            wd058: "我關注的人和我的粉絲",
            wd059: "我關注的人和所有粉絲",
            wd060: "我關注的人和關注我7天以上的粉絲",
            wd061: "我關注的人和關注我30天以上的粉絲",
            wd062: "我關注的人",
            wd063: "互關好友",
            wd064: "系統權限管理",
            wd065: "個人信息與權限",
            wd066: "第三方合作清單",
            wd067: "個人信息清單",
            wd068: "開啟社交關係微博推薦",
            wd069: "開啟後，我的關注或贊過的微博可能被推送給粉絲，關注人的關注或贊過的微博可能被推送給我",
            wd070: "一鍵防護",
            wd071: "開啟後，7天內將不接收未關注人的私信/評論/轉發/@消息，不能被關注/搜索到",
            wd072: "開啟後，7天內將不接收未關注人的私信/評論/轉發/@消息，不能被關注/搜索到，有效期至",
            wd073: "您已開啟一鍵防護模式，無法修改當前設置，請關閉一鍵防護模式後，進行修改",
            wd074: "我知道了",
            wd075: "互動管理",
            wd076: "显示IP屬地",
            wd077: "開啟後，個人主頁將顯示IP屬地信息",
            wd078: "IP屬地管理",
            wd079: "默認",
            wd080: "未關注人私信相關設定，可前往設定",
            wd081: "前往設定",
            wd082: "我可以收到哪些人的私信（或私信提醒）",
            wd083: "所有原創音視頻內容均可見",
            wd084: "（原創視頻可見）",
            wd085: "折疊疑似低質評論",
            wd086: "開啟後，疑似低質評論會在評論箱折疊展示",
            wd087: "協管員",
            wd088: "主頁訪客",
            wd089: "不允許他人找我閃聊",
            wd090: "開啟後，其他人無法找你開啟閃聊",
            wd091: "開啟後，系統將對含有遮罩詞、黑名單（包括政媒用戶拉黑用戶）及不良信用記錄用戶的評論進行過濾。",
            wd092: "點贊微博在主頁可見範圍",
            wd093: "點贊24小時後才會在你的主頁顯示",
            wd094: "好友圈",
            wd095: "僅我自己",
            wd096: "原創文章全部可見",
            wd097: "最近三年",
            wd098: "最近一年",
            wd099: "自定義時間",
            wd100: "至今",
            wd101: "年",
            wd102: "評論的微博在主頁的可見範圍",
            wd103: "只顯示對藍 V 以及百萬粉以上博主的評論",
            wd104: "內容偏好管理",
            wd105: "個人資訊下載",
            wd106: "暫時無法自行關閉一鍵防護功能，如需關閉可諮詢@微博客服",
            wd107: "確認",
            wd108: "取消",
            wd109: "管理個性化內容推薦",
            wd110: "關閉後，您將無法收到個性化內容，將會影響您的閱讀體驗。",
            wd111: "詳細了解",
            wd112: "保持關閉",
            wd113: "開啟",
            wd114: "在識圖搜索中展示我的微博",
            wd115: "分享長圖設定",
            wd116: "設定微博正文分享生成長圖範圍"
          }),
          en_US: yt(yt({}, bt.en_US), {}, {
            wd001: "Privacy",
            wd002: "Remind me when I receive new messages",
            wd003: "New Comments",
            wd004: "Everyone",
            wd005: "People I am following",
            wd006: "New Messages",
            wd007: "New Fans",
            wd008: "Contacts",
            wd009: "Do not recommend people in my contacts",
            wd010: "Not allow others to find me through my mobile phone number",
            wd011: "If this is closed, your friends will can not find U through Ur mobile phone number",
            wd012: "Who can comment on my Weibo",
            wd013: "Receive whose @ measage",
            wd014: "Allow others to find me through my mobile phone number",
            wd015: "Who can send me private messages",
            wd016: "The old setting of direct message is invalid. Now,the message from the person you followed will be in direct message box and the other message will be in leave message box",
            wd017: "Save",
            wd018: "Allow comment with pic",
            wd019: "If turned off, others cannot comment your weibo with pic",
            wd020: "People followed me",
            wd021: "From whom I’ll receive messages",
            wd022: "No longer receive srangers’ messages",
            wd023: "Comments selected",
            wd024: "After opening,the comments received by the new weibo need to be approved before they can be seen by others",
            wd025: "Comment firewall",
            wd026: "Normal",
            wd027: "Enhanced",
            wd028: "If turned on, the comments with blocked words or from blacklisted users will be screened out.",
            wd029: "Set failed!",
            wd030: "Set successfully!",
            wd031: "Setting...",
            wd032: "All  followed",
            wd033: "Followed more than 7 days",
            wd034: "Followed more than 100 days",
            wd035: "Do not show my Weibo in the same city",
            wd036: "After opening, your Weibo is not visible in the same city",
            wd037: "Weibo visible time range",
            wd038: "All visible",
            wd039: "Half a year",
            wd040: "Allow viewing of the time range of Weibo",
            wd041: "Weibo posts published before this time frame will be invisible to others",
            wd042: "Deactivating account",
            wd043: "Deactivating account will make your all Weibos invisible to others. Also, the sent information in profile will be removed. You still can browse other Weibos, use Chat, However, interactions, such as,Notice,Follow, Repost, Comment, Like and so on, will be disabled. After 7 days, the Deactivating account function will automatically expire and corresponding account will return to normal. Of course, you can cancel the deactivating function in this page at any time",
            wd044: "This function is available only to VIP",
            wd045: "Will VIP be opened immediately?",
            wd046: "Cancel",
            wd047: "Open VIP",
            wd048: "Personalized ads recommendation",
            wd049: "After closing, the number of advertisement you see will not be reduced,but the relevance of advertisements will be relatively reduced.",
            wd050: "Comment authority settings",
            wd051: "I will receive @ messages from these users",
            wd052: "fan boost",
            wd053: "Weibo visible range",
            wd054: "Top Fan",
            wd055: "After opening, your Weibo will not be visible in the same city. ",
            wd056: "Personalized content recommendation",
            wd057: "Once closed, content recommendations won’t be based on your personalized factors, so you may see uninteresting content.",
            wd058: "Following and Fans",
            wd059: "Following and All fans",
            wd060: "Following and Fans followed more than 7 days",
            wd061: "Following and Fans followed more than 30 days",
            wd062: "Following",
            wd063: "Friends following each other",
            wd064: "System permissions",
            wd065: "My Information & Authorizations",
            wd066: "Authorizations list",
            wd067: "My Information list",
            wd068: "Open social relationship Weibo recommendation",
            wd069: "If turned on, my followed or liked weibo may be pushed to followers, and the followed or liked weibo of the people I follow may be pushed to me.",
            wd070: "Protection mode",
            wd071: "Once opened, for a period of 7 days, you won’t receive direct messages, comments, reposts, and @ messages from unfollowed people, meanwhile others can’t search for or follow you.",
            wd072: "Once opened, for a period of 7 days, you won’t receive direct messages, comments, reposts, and @ messages from unfollowed people, meanwhile others can’t search for or follow you, valid until ",
            wd073: "The Protection mode is turned on and the current setting cannot be modified. If you need to modify it, please turn off the Protection mode first.",
            wd074: "OK",
            wd075: "Interaction Management",
            wd076: "Show IP location",
            wd077: "After this function is enabled, the personal home page will display IP location information",
            wd078: "IP Location  Management",
            wd079: "Default",
            wd080: "Stranger message related settings, click here",
            wd081: "click here",
            wd082: "From whom I’ll receive messages(Or reminder)",
            wd083: "All original audio and video content is visible.",
            wd084: "(Original Video Visible)",
            wd085: "Fold suspected lower-quality comments",
            wd086: "If turned on,suspected lower-quality comments will be folded in comment box.",
            wd087: "coordinator",
            wd088: "Profile visitors",
            wd089: "Do not allow others to flash chat with me",
            wd090: "After opening, others cannot find you to start a flash chat",
            wd091: "If turned on, the comments with blocked words or from blacklisted users（contain users blocked by government and media） will be screened out.",
            wd092: "My Likes visible range",
            wd093: "The likes will only be displayed on your homepage after 24 hours.",
            wd094: "Friends Circle",
            wd095: "Only me",
            wd096: "All original articles are visible",
            wd097: "Three years",
            wd098: "One year",
            wd099: "Self-defined",
            wd100: "now",
            wd101: "year",
            wd102: "the visibility of the commented weibo on your profile",
            wd103: "Comments to blue V-certified or account with over one million followers will be displayed on your profile",
            wd104: "Content Preference Management",
            wd105: "Download Personal Information",
            wd106: "If you need to turn it off, please contact @微博客服",
            wd107: "Confirm",
            wd108: "Cancel",
            wd109: "Manage personalized content recommendations",
            wd110: "If turned off, you will not receive personalized content, which may affect your reading experience. ",
            wd111: "Learn more",
            wd112: "Keep off",
            wd113: "Turn on",
            wd114: "Show my Weibo in image search",
            wd115: "Long image sharing settings",
            wd116: "Set the range for generating a long image from a Weibo post"
          })
        },
        kt = $t,
        xt = location.search.match(/lang=(\w+)/) ? location.search.match(/lang=(\w+)/)[1] : "zh_CN";
      kt[xt] || (xt = "zh_CN"), s["default"].use(m["a"]);
      var Ct = [{
        path: "/",
        redirect: "/setting"
      }, {
        path: "/setting",
        name: "privacy_h5",
        component: Z,
        meta: {
          title: "隐私设置"
        }
      }, {
        path: "/home/setting",
        name: "index",
        component: y,
        meta: {
          title: "设置"
        }
      }, {
        path: "/setting/comment",
        name: "comment",
        meta: {
          title: kt[xt]["wd050"]
        },
        component: ht
      }, {
        path: "/setting/priset",
        name: "privacy",
        meta: {
          title: kt[xt]["wd001"]
        },
        component: Z
      }, {
        path: "/home/version",
        name: "version",
        meta: {
          title: "版本切换"
        },
        component: vt
      }];

      function Tt(t, e, i) {
        return i || {
          x: 0,
          y: 0
        }
      }
      var Ot = new m["a"]({
        mode: "history",
        scrollBehavior: Tt,
        routes: Ct
      });
      Ot.beforeEach((function(t, e, i) {
        function s() {
          window.WeiboJSBridge.invoke("setBrowserTitle", {
            title: t.meta.title || ""
          })
        }
        document.title = t.meta.title || " ", window.WeiboJSBridge ? s() : document.addEventListener("WeiboJSBridgeReady", s), w.dispatch("setTitle", t.meta.title), i()
      }));
      var St = Ot,
        Pt = (Ct.map((function(t) {
          return t.path.split("/:")[0]
        })), function() {
          var t = this,
            e = t._self._c;
          return t.isApp ? t._e() : e("div", {
            staticClass: "lite-topbar lite-page-top"
          }, [e("div", {
            staticClass: "nav-left",
            on: {
              click: t.goBack
            }
          }, [e("i", {
            staticClass: "m-font m-font-arrow-left"
          })]), e("div", {
            staticClass: "nav-main"
          }, [e("h4", [t._v(t._s(t.$store.state.title))])])])
        }),
        Dt = [],
        It = {
          name: "top-bar",
          data: function() {
            return {
              isApp: navigator.userAgent.indexOf("_weibo_") > -1
            }
          },
          methods: {
            goBack: function() {
              this.$router.go(-1)
            },
            handleBack: function() {
              location.replace(location.origin)
            }
          },
          created: function() {},
          computed: {
            state: function() {
              return this.$store.state.state
            }
          },
          components: {},
          watch: {}
        },
        Bt = It,
        jt = Object(b["a"])(Bt, Pt, Dt, !1, null, "4fcb0869", null),
        At = jt.exports;

      function Vt(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e && (s = s.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          }))), i.push.apply(i, s)
        }
        return i
      }

      function Lt(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2 ? Vt(Object(i), !0).forEach((function(e) {
            Object(a["a"])(t, e, i[e])
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : Vt(Object(i)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
          }))
        }
        return t
      }
      var Et = {
          store: w,
          created: function() {
            var t = this;
            St.beforeEach((function(t, e, i) {
              function s() {
                window.WeiboJSBridge.invoke("setBrowserTitle", {
                  title: t.meta.title || ""
                })
              }
              document.title = t.meta.title || " ", window.WeiboJSBridge ? s() : document.addEventListener("WeiboJSBridgeReady", s), i()
            })), this.updateConfig(window.config), this.config = Object.assign({}, window.config), this.refreshConfig(), setInterval((function() {
              t.refreshConfig()
            }), 3e5)
          },
          methods: Lt(Lt({}, Object(c["b"])(["updateConfig"])), {}, {
            refreshConfig: function() {
              var t = this;
              this.$http.get("/api/config").then((function(e) {
                if (e.data && e.data.ok > 0) {
                  var i = e.data.data;
                  t.updateConfig(i), t.config = Object.assign(t.config, i)
                }
              }))
            }
          }),
          computed: {
            inPrivacy: function() {
              return !!this.$route.query.in_privacy
            }
          },
          components: {
            topBar: At
          }
        },
        Mt = Et,
        Ut = (i("30d8"), Object(b["a"])(Mt, o, n, !1, null, "6e77af93", null)),
        Wt = Ut.exports,
        qt = {
          install: function(t) {
            t.bridgeReady = function(t) {
              var e = window.WeiboJSBridge;
              e ? t() : document.addEventListener("WeiboJSBridgeReady", (function() {
                t()
              }))
            }, t.prototype.$getBrowserInfo = function(e) {
              t.bridgeReady((function() {
                window.WeiboJSBridge.invoke("getBrowserInfo", {}, e)
              }))
            }, t.prototype.$setBrowserDomain = function() {
              t.bridgeReady((function() {
                window.WeiboJSBridge.invoke("setBrowserDomain", {
                  hideDomain: 1
                })
              }))
            }, t.prototype.$sendWboxBroadcast = function(e) {
              t.bridgeReady((function() {
                window.WeiboJSBridge.invoke("sendWboxBroadcast", e, (function() {}))
              }))
            }
          }
        };
      s["default"].use(qt);
      var Nt = qt,
        Rt = i("1920"),
        Ft = i.n(Rt),
        Jt = (i("02a9"), i("a925")),
        Yt = function(t) {
          var e = function(t) {
              return t.keys().map(t)
            },
            s = i("8acc"),
            o = i("3ec7");
          e(s).forEach((function(e) {
            e = e.default;
            var i = (e.name || /(\S+\/)(\S+)\.vue/.exec(e.hotID)[2]).toLowerCase();
            t.component("mv-".concat(i), e)
          })), e(o).forEach((function(e, i) {
            var s = (e.name || /(\S+\/)(\S+)\.js/.exec(o.keys()[i])[2]).toLowerCase();
            t.directive("".concat(s), e.default)
          }))
        },
        zt = Yt,
        Kt = (i("ac4d"), i("8a81"), i("5df3"), i("1c4c"), i("6b54"), i("7618"));

      function Ht(t, e) {
        var i = "undefined" !== typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!i) {
          if (Array.isArray(t) || (i = Gt(t)) || e && t && "number" === typeof t.length) {
            i && (t = i);
            var s = 0,
              o = function() {};
            return {
              s: o,
              n: function() {
                return s >= t.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: t[s++]
                }
              },
              e: function(t) {
                throw t
              },
              f: o
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var n, a = !0,
          c = !1;
        return {
          s: function() {
            i = i.call(t)
          },
          n: function() {
            var t = i.next();
            return a = t.done, t
          },
          e: function(t) {
            c = !0, n = t
          },
          f: function() {
            try {
              a || null == i.return || i.return()
            } finally {
              if (c) throw n
            }
          }
        }
      }

      function Gt(t, e) {
        if (t) {
          if ("string" === typeof t) return Qt(t, e);
          var i = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? Qt(t, e) : void 0
        }
      }

      function Qt(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, s = new Array(e); i < e; i++) s[i] = t[i];
        return s
      }
      var Zt = {},
        Xt = navigator.userAgent.indexOf("_weibo_") > -1,
        te = Boolean("localhost" === window.location.hostname || "dev.weibo.cn" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
      Zt.install = function(t) {
        var e = {
          goProfile: function(t) {
            location.href = Xt ? "sinaweibo://userinfo?uid=".concat(t) : "".concat(location.protocol, "//m.weibo.cn/profile/").concat(t)
          },
          goDetail: function(t) {
            location.href = Xt ? "sinaweibo://detail?mblogid=".concat(t) : "".concat(location.protocol, "//m.weibo.cn/detail/").concat(t)
          },
          goTopic: function(t) {
            location.href = Xt ? "sinaweibo://searchall?containerid=231522&q=%23".concat(encodeURIComponent(t), "%23&extparam=%23").concat(encodeURIComponent(t), "%23&") : "".concat(location.protocol, "//m.weibo.cn/p/searchall?containerid=231522type%3D1%26q%3D%23").concat(encodeURIComponent(t), "%23%26t%3D10&extparam=%23").concat(encodeURIComponent(t), "%23")
          },
          goLink: function(t) {
            /^sinaweibo:\/\//.test(t) ? location.href = t : location.href = Xt ? "sinaweibo://browser?url=" + encodeURIComponent(t) : t
          },
          sendWeibo: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "发微博";

            function s(t) {
              var e = [];
              for (var i in t)
                if (t.hasOwnProperty(i)) {
                  var s = t[i];
                  "object" === Object(Kt["a"])(s) ? e.push("".concat(i, "=").concat(JSON.stringify(encodeURIComponent(s)))) : e.push("".concat(i, "=").concat(encodeURIComponent(s)))
                } return "?".concat(e.join("&"))
            }
            var o, n, a = e && e.type || 0;
            switch (a) {
              case 0:
                n = {
                  title: i,
                  content: t
                }, o = "sinaweibo://sendweibo".concat(s(n));
                break;
              case 1:
                n = {
                  title: i,
                  content: "".concat(t, " ").concat(e.link),
                  urls: [{
                    title: e.title || "网页链接",
                    icon: e.icon || "https://h5.sinaimg.cn/upload/2015/09/25/3/timeline_card_small_web.png",
                    content: e.link
                  }]
                }, o = "sinaweibo://sendweibo".concat(s(n));
                break
            }
            location.href = o
          },
          openApp: function(t) {
            if (!te && !Xt) {
              var e = t || location.href,
                i = /^sinaweibo:\/\//.test(e) ? e : "sinaweibo://browser?url=" + encodeURIComponent(e);
              location.href = "https://m.weibo.cn/feature/openapp?scheme=" + encodeURIComponent(i)
            }
          },
          setTitle: function(t) {
            document.title = t, this.jsb((function(e) {
              e("setBrowserTitle", {
                title: t
              })
            }))
          },
          setTopItem: function(t, e) {
            var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
              s = {};

            function o() {
              var t = window.WeiboJSBridge;
              t.invoke("setTopNavigationOptionItems", s), t.on("topConfigButtonPress", (function() {
                i && e && e()
              }))
            }
            /^http(s?):\/\//.test(t) || /^(\.+)\//.test(t) ? s.itemIconUrl = t : s.itemText = t, window.WeiboJSBridge ? o() : document.addEventListener("WeiboJSBridgeReady", o)
          },
          jsb: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;

            function i() {
              switch (e) {
                case 1:
                  t && t(window.WeiboJSBridge.invoke);
                  break;
                case 2:
                  t && t(window.WeiboJSBridge.on);
                  break;
                case 3:
                  t && t(window.WeiboJSBridge);
                  break
              }
            }
            window.WeiboJSBridge ? i() : document.addEventListener("WeiboJSBridgeReady", (function() {
              i()
            }))
          },
          showTip: function(e) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!1 !== e) {
              var o;
              switch (i) {
                case 1:
                  o = "success";
                  break;
                case 2:
                  o = "error";
                  break;
                case 3:
                  o = "loading";
                  break;
                case 4:
                  o = "warn";
                  break
              }
              t.$Bus.$emit("wooToast", {
                type: o,
                message: e,
                mask: s
              })
            } else t.$Bus.$emit("wooToastClose")
          },
          getAppVersion: function() {
            return navigator.userAgent.match(/__weibo__([\d.]+)/) && navigator.userAgent.match(/__weibo__([\d.]+)/)[1] || 0
          },
          compareVersion: function(t) {
            try {
              for (var e = this.getAppVersion().toString(), i = t.split("."), s = e.split("."), o = 0; o < (i.length > s.length ? i.length : s.length); o++) {
                var n = +s[o] || 0,
                  a = +i[o] || 0;
                if (n !== a) return n - a > 0
              }
              return !0
            } catch (c) {
              return !1
            }
          },
          selectPerson: function() {
            var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return new Promise((function(s, o) {
              1 !== i ? 2 !== i ? Xt ? t.jsb((function(t) {
                try {
                  t.invoke("pickContact", {
                    count: e
                  }, (function(t, e, i) {
                    t && e && 200 === i ? s(t.contacts) : o({
                      params: t,
                      success: e,
                      code: i
                    })
                  }))
                } catch (i) {
                  o({
                    msg: i
                  })
                }
              }), 3) : o({
                msg: "非客户端环境无法使用"
              }) : s([{
                screen_name: "来去之间"
              }]) : s([{
                screen_name: "来去之间",
                uid: 1111681197,
                avatar_url: "https://ww2.sinaimg.cn/orj480/4242e8adjw8elz58g3kyvj20c80c8myg.jpg"
              }])
            }))
          }
        };
        t.prototype.$utils = e, t.utils = e
      };
      var ee = Zt;

      function ie() {
        try {
          var t = window.navigator.userAgent.includes("iPhone") || window.navigator.userAgent.includes("iPad"),
            e = new URLSearchParams(window.location.search),
            i = e.get("in_privacy");
          if (!t || !i) return;
          var s = document.head,
            o = {
              attributes: !0,
              attributeFilter: ["content"],
              subtree: !0,
              childList: !0
            },
            n = new MutationObserver((function(t, e) {
              var i, n = Ht(t);
              try {
                for (n.s(); !(i = n.n()).done;) {
                  var a = i.value;
                  if ("attributes" === a.type && "META" === a.target.tagName && "viewport" === a.target.getAttribute("name") && "content" === a.attributeName) {
                    var c = a.target.getAttribute("content");
                    if (c && c.includes("viewport-fit=cover")) {
                      var r = c.replace(/,\s*viewport-fit=cover/g, "");
                      r = r.replace(/viewport-fit=cover/g, ""), e.disconnect(), a.target.setAttribute("content", r), e.observe(s, o)
                    }
                  } else "childList" === a.type && a.addedNodes.forEach((function(t) {
                    if ("META" === t.tagName && "viewport" === t.getAttribute("name")) {
                      var i = t.getAttribute("content");
                      if (i && i.includes("viewport-fit=cover")) {
                        e.disconnect();
                        var n = i.replace(/,\s*viewport-fit=cover/g, "");
                        n = n.replace(/viewport-fit=cover/g, ""), t.setAttribute("content", n), e.observe(s, o)
                      }
                    }
                  }))
                }
              } catch (l) {
                n.e(l)
              } finally {
                n.f()
              }
            }));
          n.observe(s, o)
        } catch (a) {}
      }
      var se = {
          install: function(t) {
            function e(t, e) {
              t = C.a.stringify(t);
              var i = this,
                s = "https://m.weibo.cn/h5logs/actionLog?type=pic&".concat(t, "&t=").concat((new Date).getTime()),
                o = new Image;
              o.onload = o.onerror = function() {
                e && e.call(i), o = null
              }, o.src = s
            }

            function i(t) {
              e({
                uicode: 10000801,
                act_code: 2812,
                ext: "button:" + t
              })
            }
            t.mixin({
              methods: {
                actionLog: e,
                vfansActionLog: i
              }
            })
          }
        },
        oe = se,
        ne = (i("d8ea"), i("bc3a")),
        ae = i.n(ne),
        ce = i("383a");

      function re(t) {
        for (var e in t) 0 === t[e] || t[e] || delete t[e]
      }
      var le = Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),
        de = le ? "development" : "production";
      ae.a.defaults.withCredentials = !0, ae.a.defaults.xsrfCookieName = null, ae.a.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest", ae.a.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      var ue = {
          install: function(t) {
            "development" === de && (ae.a.defaults.baseURL = "https://m.weibo.cn"), t.prototype.$http = ae.a, t.http = ae.a, ae.a.interceptors.request.use((function(t) {
              var e = t.params,
                i = t.data;
              return e && re(e), i && (re(i), i.append ? i.append("st", w.state.config.config.st) : (i.st = w.state.config.config.st, t.data = C.a.stringify(i))), t
            }), (function(t) {
              return Promise.reject(t)
            })), ae.a.interceptors.response.use((function(e) {
              if (e.status >= 400) {
                var i = "";
                return e.body && e.body.msg ? i = e.body.msg : (i = "接口请求失败", e.status && (i += "(".concat(e.status, ")"))), ce["a"].$emit("mvMsgbox", {
                  type: "error",
                  text: i
                }), window.Raven && window.Raven.captureMessage("接口请求失败", {
                  level: "warning",
                  tags: {
                    errorCode: e.status
                  },
                  extra: {
                    msg: i
                  }
                }), e
              }
              var s = e.data;
              if (s && (21301 === s.error_code && "production" !== de && ce["a"].$emit("mvMsgbox", {
                  type: "alert",
                  text: "TAuth2 Token 失效, 请联系老司机@王炜。"
                }), -100 === s.ok && s.url && (window.location.href = s.url), s.hideToast = !1, 0 === s.ok)) switch (t.$Bus.$emit("wooToastClose"), s.error_type) {
                case "confirm":
                  s.btn || (s.btn = {}), ce["a"].$emit("mvMsgbox", {
                    type: "confirm",
                    title: s.title || "",
                    text: s.msg,
                    style: {
                      color: s.btn.color || "orange"
                    },
                    btnText: s.btn.text || "",
                    btnCallback: function() {
                      s.btn.url && (window.location.href = s.btn.url)
                    }
                  }), s.hideToast = !0;
                  break;
                case "captcha":
                  var o = function(t) {
                      return t.length > 0 && t.length < 10
                    },
                    n = "".concat(ae.a.defaults.baseURL, "/api/captcha/show?t=").concat(Date.now());
                  ce["a"].$emit("mvMsgbox", {
                    title: s.msg,
                    type: "prompt",
                    pic: n,
                    validate: o
                  }, (function(t) {
                    if (t) {
                      ce["a"].$emit("mvMsgbox", !1);
                      var i = e.config,
                        s = C.a.parse(i.data);
                      s._code = t, i.data = s, ae()(i)
                    }
                  })), s.hideToast = !0;
                  break;
                default:
              }
              return e
            }), (function(t) {
              return Promise.reject(t)
            }))
          }
        },
        he = ue;
      ie(), s["default"].use(zt), s["default"].use(Jt["a"]), s["default"].use(Nt), s["default"].use(Ft.a);
      var we = location.search.match(/lang=(\w+)/) ? location.search.match(/lang=(\w+)/)[1] : "zh_CN";
      kt[we] || (we = "zh_CN");
      var me = new Jt["a"]({
        locale: we,
        messages: kt
      });
      s["default"].use(he), s["default"].use(ee), s["default"].use(oe), s["default"].config.productionTip = !1, new s["default"]({
        router: St,
        store: w,
        i18n: me,
        Wooui: Ft.a,
        render: function(t) {
          return t(Wt)
        }
      }).$mount("#app")
    },
    "6bfd": function(t, e, i) {
      "use strict";
      var s = i("82d9"),
        o = i.n(s);
      i.d(e, "default", (function() {
        return o.a
      }))
    },
    "6d1f": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t._self._c;
          return e("a", {
            staticClass: "m-btn",
            class: ["m-btn-" + t.btnBodyColor, "m-btn-text-" + t.btnTextColor, {
              "m-btn-disabled": t.disabled,
              "m-btn-block": t.block
            }],
            attrs: {
              href: "javascript:;"
            },
            on: {
              touchstart: function(e) {
                return t.handleClick()
              }
            }
          }, [t._t("default")], 2)
        },
        o = [],
        n = {
          name: "btn",
          computed: {
            btnTextColor: function() {
              if ("white" === this.btncolor && this.disabled) return "";
              var t = ["black", "blue", "green", "red", "orange"].indexOf(this.color) > -1;
              return t ? this.color : "black"
            },
            btnBodyColor: function() {
              var t = ["white", "blue", "green", "red", "orange"].indexOf(this.btncolor) > -1;
              return t ? this.btncolor : "white"
            }
          },
          props: {
            disabled: Boolean,
            btncolor: {
              type: String,
              default: "white"
            },
            color: {
              type: String,
              default: "black"
            },
            block: Boolean
          },
          methods: {
            handleClick: function() {
              this.disabled && (this.$event.preventDefault(), this.$event.stopPropagation())
            }
          }
        },
        a = n,
        c = i("2877"),
        r = Object(c["a"])(a, s, o, !1, null, null, null);
      e["default"] = r.exports
    },
    "82d9": function(t, e, i) {
      t.exports = {
        title: "privacy_title_InzNk",
        wrap: "privacy_wrap_3YZVT",
        module: "privacy_module_1EA3u",
        switch: "privacy_switch_1dg2v",
        range: "privacy_range_3U7rU",
        end: "privacy_end_2YOBE",
        modalBox: "privacy_modalBox_1Ulz7",
        mask: "privacy_mask_3lKrZ",
        modal: "privacy_modal_3mY1j",
        header: "privacy_header_122zS",
        icon: "privacy_icon_1AMAr",
        desc: "privacy_desc_2LioD",
        link: "privacy_link_2LDfS",
        buttons: "privacy_buttons_2C0F9",
        keep: "privacy_keep_24-93",
        open: "privacy_open_1_2SL"
      }
    },
    "8acc": function(t, e, i) {
      var s = {
        "./btn.vue": "6d1f",
        "./index.vue": "43b3",
        "./msgbox.vue": "9f84",
        "./toast.vue": "e8a6"
      };

      function o(t) {
        var e = n(t);
        return i(e)
      }

      function n(t) {
        if (!i.o(s, t)) {
          var e = new Error("Cannot find module '" + t + "'");
          throw e.code = "MODULE_NOT_FOUND", e
        }
        return s[t]
      }
      o.keys = function() {
        return Object.keys(s)
      }, o.resolve = n, t.exports = o, o.id = "8acc"
    },
    9320: function(t, e, i) {
      "use strict";
      var s = i("a2a6"),
        o = i.n(s);
      i.d(e, "default", (function() {
        return o.a
      }))
    },
    9429: function(t, e, i) {
      t.exports = {
        wrap: "textContent_wrap_1MwMs",
        module: "textContent_module_1dQPg",
        noBottomGap: "textContent_noBottomGap_Bdnsn"
      }
    },
    9600: function(t, e, i) {},
    "9f61": function(t, e, i) {},
    "9f84": function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t._self._c;
          return e("transition", {
            attrs: {
              name: "expand"
            }
          }, [t.show ? e("div", {
            staticClass: "mask-wrap",
            on: {
              touchmove: function(t) {
                t.preventDefault()
              }
            }
          }, [t.backdrop ? e("div", {
            staticClass: "m-mask",
            on: {
              click: function(e) {
                return e.preventDefault(), t.cancel.apply(null, arguments)
              }
            }
          }) : t._e(), e("div", {
            staticClass: "m-dialog"
          }, [e("header", [t.title && "prompt" == t.type ? e("div", {
            staticClass: "m-dialog-title",
            domProps: {
              textContent: t._s(t.title)
            }
          }) : t._e(), t.title && "prompt" != t.type ? e("h2", {
            domProps: {
              textContent: t._s(t.title)
            }
          }) : t._e(), t.text ? e("h3", {
            domProps: {
              textContent: t._s(t.text)
            }
          }) : t._e(), t.pic ? e("img", {
            attrs: {
              src: t.pic,
              alt: ""
            }
          }) : t._e(), "prompt" == t.type ? e("div", {
            staticClass: "m-dialog-form"
          }, [e("div", {
            staticClass: "bar-text",
            domProps: {
              textContent: t._s(t.inputErrorText)
            }
          }), e("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.inputValue,
              expression: "inputValue"
            }],
            ref: "inputText",
            attrs: {
              type: "text",
              placeholder: t.inputPlaceholder
            },
            domProps: {
              value: t.inputValue
            },
            on: {
              keyup: function(e) {
                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.ok.apply(null, arguments)
              },
              input: [function(e) {
                e.target.composing || (t.inputValue = e.target.value)
              }, function(e) {
                t.inputErrorText = ""
              }]
            }
          })]) : t._e()]), e("footer", {
            staticClass: "m-btm-btns m-box"
          }, ["alert" != t.type ? e("div", {
            staticClass: "m-box-col"
          }, [e("mv-btn", {
            nativeOn: {
              click: function(e) {
                return t.cancel()
              }
            }
          }, [t._v(t._s(t.cancelText))])], 1) : t._e(), e("div", {
            staticClass: "m-box-col"
          }, [e("mv-btn", {
            attrs: {
              btncolor: t.style.btncolor,
              color: t.style.color || "orange",
              disabled: t.style.disabled
            },
            nativeOn: {
              click: function(e) {
                return t.ok.apply(null, arguments)
              }
            }
          }, [t._v(t._s(t.btnText))])], 1)])])]) : t._e()])
        },
        o = [],
        n = i("383a"),
        a = {
          type: "alert",
          btnText: "确定",
          cancelText: "取消",
          btnCallback: function() {},
          backdrop: !0,
          show: !1,
          title: "",
          pic: "",
          text: "",
          style: {
            btncolor: null,
            disabled: null,
            color: null
          },
          inputValue: "",
          inputPlaceholder: "",
          validate: null,
          inputErrorText: ""
        },
        c = {
          name: "msgbox",
          data: function() {
            return Object.assign({}, a)
          },
          watch: {
            type: function(t) {
              var e = ["alert", "confirm", "prompt"];
              if (!e.some((function(e) {
                  return e === t
                }))) throw new Error({
                msg: "未知类型的msgbox"
              })
            },
            show: function(t) {
              t || this.init()
            }
          },
          computed: {
            validateInputValue: function() {
              return this.validate ? this.validate(this.inputValue) ? this.inputValue : "" : this.inputValue
            }
          },
          methods: {
            init: function() {
              Object.assign(this.$data, a)
            },
            cancelOrigin: function() {
              "alert" !== this.type && (this.show = !1)
            },
            cancel: function() {},
            okOrigin: function() {
              this.show = !1, this.btnCallback && this.btnCallback()
            },
            ok: function() {},
            call: function(t, e, i) {
              var s = this,
                o = {};
              o = t || {
                show: !1
              }, Object.assign(this, {
                show: !0
              }, o), this.ok = this.okOrigin, this.cancel = this.cancelOrigin, "function" === typeof e && (this.ok = function() {
                this.validate && 0 === this.validateInputValue.length && (this.inputErrorText = "输入有误");
                var t = e(this.validateInputValue);
                "boolean" === typeof t && (this.show = t)
              }), "function" === typeof i && (this.cancel = function() {
                i.call(), "alert" !== this.type && (this.show = !1)
              }), this.$nextTick((function() {
                s.$refs.inputText && s.$refs.inputText.focus()
              }))
            },
            calls: function(t) {
              var e = this;
              return new Promise((function(i, s) {
                e.call(t), e.ok = function() {
                  this.show = !1, i()
                }, e.cancel = function() {
                  this.show = !1, s()
                }
              }))
            }
          },
          created: function() {
            var t = this;
            n["a"].$on("mvMsgbox", (function(e, i, s) {
              t.call(e, i, s)
            }))
          }
        },
        r = c,
        l = (i("4766"), i("2877")),
        d = Object(l["a"])(r, s, o, !1, null, "26545dc3", null);
      e["default"] = d.exports
    },
    a2a6: function(t, e, i) {
      t.exports = {
        module: "item_module_2B1nb",
        switch: "item_switch_14M1J",
        wrap: "item_wrap_3tCp3"
      }
    },
    a9dd: function(t, e, i) {},
    aa0c: function(t, e, i) {
      "use strict";
      var s = i("fd09"),
        o = i.n(s);
      i.d(e, "default", (function() {
        return o.a
      }))
    },
    b7a8: function(t, e, i) {
      "use strict";
      var s = i("9429"),
        o = i.n(s);
      i.d(e, "default", (function() {
        return o.a
      }))
    },
    c411: function(t, e, i) {},
    d8ea: function(t, e, i) {},
    e8a6: function(t, e, i) {
      "use strict";
      i.r(e);
      var s = function() {
          var t = this,
            e = t._self._c;
          return e("transition", {
            attrs: {
              name: "toast"
            }
          }, [t.show ? e("div", {
            staticClass: "mv-toast"
          }, [t.backdrop ? e("div", {
            staticClass: "m-mask",
            on: {
              touchstart: function(t) {
                t.stopPropagation(), t.preventDefault()
              }
            }
          }) : t._e(), e("div", {
            staticClass: "m-popup",
            on: {
              touchstart: function(t) {
                t.stopPropagation(), t.preventDefault()
              }
            }
          }, [e("div", {
            staticClass: "m-box m-box-dir m-box-center"
          }, [e("header", ["ok" === t.curType ? e("i", {
            staticClass: "m-font m-font-line-check"
          }) : t._e(), "error" === t.curType ? e("i", {
            staticClass: "m-font m-font-line-close"
          }) : t._e(), "warning" === t.curType ? e("i", {
            staticClass: "m-font m-font-warn"
          }) : t._e(), "wait" === t.curType ? e("div", {
            staticClass: "m-loading m-loading-light"
          }, [e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span"), e("span")]) : t._e()]), e("h3", {
            domProps: {
              innerHTML: t._s(t.text)
            }
          })])])]) : t._e()])
        },
        o = [],
        n = (i("28a5"), i("383a")),
        a = {
          name: "toast",
          data: function() {
            return {
              duration: 2e3,
              backdrop: !0,
              show: !1,
              text: "",
              curType: this.type,
              type: "ok"
            }
          },
          methods: {
            call: function(t, e) {
              var i = {};
              if ("string" === typeof t) i = {
                text: t
              };
              else if (t) {
                i = t;
                var s = "ok error warning wait".split(" ").indexOf(i.type) > -1;
                i.curType = s ? i.type : this.type, delete i.type
              } else i = {
                show: !1
              };
              Object.assign(this, {
                show: !0
              }, i), "function" === typeof e && e(this)
            },
            calls: function(t) {
              var e = this;
              return new Promise((function(i) {
                e.call(t), i(e)
              }))
            }
          },
          created: function() {
            var t = this;
            window.mvToast = this, n["a"].$on("mvToast", (function(e, i) {
              t.call(e, i)
            }))
          },
          watch: {
            show: function(t) {
              var e = this;
              t && "wait" !== this.curType && setTimeout((function() {
                e.show = !1
              }), this.duration)
            },
            curType: function(t, e) {
              var i = this;
              "wait" !== t && "wait" === e && setTimeout((function() {
                i.show = !1
              }), this.duration)
            }
          }
        },
        c = a,
        r = (i("0928"), i("2877")),
        l = Object(r["a"])(c, s, o, !1, null, null, null);
      e["default"] = l.exports
    },
    eff4: function(t, e, i) {
      "use strict";
      i("9f61")
    },
    fd09: function(t, e, i) {
      t.exports = {
        wrap: "list_wrap_1R863",
        module: "list_module_2Zr8g"
      }
    }
  },
  [
    [0, "manifest", "vendor"]
  ]
]);
