(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-1a5c4c8d"], {
    "42a4": function(t, e, a) {
      "use strict";
      var o = a("53e6"),
        n = a.n(o);
      e["default"] = n.a
    },
    "45bc": function(t, e, a) {
      t.exports = {
        btn: "changeCreation_btn_yXHVY",
        t: "changeCreation_t_LOZ0t",
        i: "changeCreation_i_3QFKx"
      }
    },
    "53e6": function(t, e, a) {
      t.exports = {
        l1item: "CoCreation_l1item_8FqeA",
        t1: "CoCreation_t1_3tw8i",
        list2: "CoCreation_list2_3JYHQ",
        list22: "CoCreation_list22_1wAJd",
        t2: "CoCreation_t2_2nG3W",
        l2item: "CoCreation_l2item_2jff6",
        gap1: "CoCreation_gap1_2Vmhg",
        gap2: "CoCreation_gap2_H98ki",
        gap3: "CoCreation_gap3_3mEzG",
        gray1: "CoCreation_gray1_yJvd-",
        tit1: "CoCreation_tit1_S6NAS",
        switch: "CoCreation_switch_3iCBC",
        list1: "CoCreation_list1_3DABn",
        pos: "CoCreation_pos_3vt6p",
        b1: "CoCreation_b1_2Hpx-",
        b2: "CoCreation_b2_hxich",
        b3: "CoCreation_b3_3vMNo",
        layer: "CoCreation_layer_2I4q1",
        layeritem: "CoCreation_layeritem_29pXk",
        bg: "CoCreation_bg_3Hona",
        tit: "CoCreation_tit_2y1Aa",
        btn: "CoCreation_btn_1p-k5",
        iptbox: "CoCreation_iptbox_1GmkJ",
        ipt: "CoCreation_ipt_1MMl8",
        i: "CoCreation_i_3W8rJ",
        list21: "CoCreation_list21_2L6DO",
        itemin: "CoCreation_itemin_2Vfc0",
        cut: "CoCreation_cut_2c0iG",
        opt: "CoCreation_opt_18eGx",
        i1: "CoCreation_i1_1O2lV",
        i2: "CoCreation_i2_2AZp7",
        permanent_name: "CoCreation_permanent_name_14rt4",
        permanent_c: "CoCreation_permanent_c_2pfvb",
        permanent: "CoCreation_permanent_GnsXE",
        audio_desc: "CoCreation_audio_desc_Z5---"
      }
    },
    "6d8c": function(t, e, a) {},
    "9cf6": function(t, e, a) {
      "use strict";
      a.r(e);
      var o = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", [a("div", {
            class: t.$style[t.showTitle ? "gap1" : "gap3"]
          }, [t.showTitle ? a("woo-box", {
            class: t.$style.switch,
            attrs: {
              align: "center"
            }
          }, [a("woo-box-item", {
            attrs: {
              align: "center"
            }
          }, [a("woo-box", {
            attrs: {
              align: "center"
            }
          }, [a("div", {
            class: [t.$style.gray1, t.$style.tit1]
          }, [t._v("共创")]), t.showIcon ? a("Action", {
            attrs: {
              title: "共创说明",
              desc: '共创功能适用于多人共同创作的音频。发布后将会给共创者发送邀请。共创者接受邀请后，该作品将展示在共创人的个人主页并推荐给Ta的粉丝，播放数据与你共享。\n          <br />阅读 <a href="//weibo.com" target="_blank">《共同创作投稿须知》</a>了解更多。'
            }
          }) : t._e()], 1)], 1), a("div", [a("woo-switch", {
            ref: "CoCreationRef",
            attrs: {
              size: .6875,
              disabled: t.type || !t.visible || t.timer
            },
            nativeOn: {
              click: function(e) {
                return t.showToast()
              }
            },
            model: {
              value: t.CoCreation,
              callback: function(e) {
                t.CoCreation = e
              },
              expression: "CoCreation"
            }
          })], 1)], 1) : t._e(), a("div", {
            class: t.showTitle && t.$style.list1
          }, [t.CoCreation || !t.showTitle ? a("woo-box", {
            attrs: {
              old: "",
              items: t.showTitle ? 7 : 6,
              "gap-row": 10,
              "gap-col": 20
            }
          }, [a("woo-box-item", {
            class: t.$style.l1item
          }, [a("woo-box", {
            class: t.$style.pos,
            attrs: {
              direction: "y",
              align: "center"
            }
          }, [a("woo-avatar", {
            attrs: {
              size: 50,
              src: t.config.user.avatar_large
            }
          }), a("div", {
            class: t.$style.t1
          }, [t._v(t._s(t.config.user.screen_name))]), a("div", {
            class: t.$style.t2
          }, [t._v("作者")])], 1)], 1), t._l(t.selectArr, (function(e, o) {
            return a("woo-box-item", {
              key: o,
              class: t.$style.l1item
            }, [a("woo-box", {
              class: t.$style.pos,
              attrs: {
                direction: "y",
                align: "center"
              }
            }, [a("woo-avatar", {
              attrs: {
                size: 50,
                src: e.avatar_large
              }
            }), a("div", {
              class: t.$style.t1
            }, [t._v(t._s(e.screen_name))]), a("changeCreation", {
              class: t.$style.b3,
              attrs: {
                creationCur: "",
                item: e,
                coCreateConfig: t.coCreateConfig
              },
              on: {
                show: t.closeAll
              }
            }), a("woo-fonticon", {
              class: t.$style.b2,
              attrs: {
                value: "close",
                kind: "dark"
              },
              nativeOn: {
                click: function(e) {
                  return t.deleteItemReal(o)
                }
              }
            })], 1)], 1)
          })), a("woo-box-item", {
            class: t.$style.l1item
          }, [a("woo-box", {
            class: t.$style.pos,
            attrs: {
              direction: "y",
              align: "center"
            }
          }, [a("woo-fonticon", {
            class: t.$style.b1,
            attrs: {
              value: "add",
              kind: "dark"
            },
            nativeOn: {
              click: function(e) {
                return t.addCoCreation.apply(null, arguments)
              }
            }
          }), a("div", {
            class: t.$style.t1
          }, [t._v(" " + t._s(t.showTitle ? "添加共创人" : "节目共创人") + " ")])], 1)], 1)], 2) : t._e()], 1)], 1), a("woo-divider", {
            class: t.$style[t.showTitle ? "gap1" : "gap2"],
            attrs: {
              "border-color": "var(--w-card-border)"
            }
          }), t.showAdd ? a("woo-modal", {
            attrs: {
              lockScreen: "",
              "inside-scroll": ""
            },
            on: {
              "after-enter": t.addMargin,
              "before-leave": t.removeMargin
            }
          }, [a("div", {
            ref: "layer",
            staticClass: "wbpro-layer",
            class: t.$style.layer
          }, [a("woo-panel", {
            attrs: {
              border: "bottom"
            }
          }, [a("woo-box", {
            staticClass: "wbpro-layer-tit"
          }, [a("woo-box", {
            staticClass: "wbpro-layer-tit-nav",
            attrs: {
              align: "center",
              justify: "center"
            }
          }), a("woo-box-item", {
            staticClass: "wbpro-layer-tit-text",
            attrs: {
              align: "center"
            }
          }, [t._v("选择共创人")])], 1)], 1), a("woo-box", [a("woo-box-item", {
            class: [t.$style.layeritem, t.$style.bg]
          }, [a("div", {
            class: t.$style.iptbox
          }, [a("woo-input", {
            ref: "searchCo",
            class: t.$style.ipt,
            attrs: {
              placeholder: "搜索"
            },
            model: {
              value: t.q,
              callback: function(e) {
                t.q = e
              },
              expression: "q"
            }
          }), a("woo-fonticon", {
            class: t.$style.i,
            attrs: {
              value: "search"
            }
          })], 1), a("div", {
            class: [t.$style.list2, t.$style.list21, "wbpro-scrollbar"]
          }, [a("Scroll", {
            attrs: {
              data: t.friendsBilateral,
              isLoading: t.isLoading,
              isRetry: t.isRetry,
              isNoData: t.isNoData,
              isEmpty: t.isEmpty,
              emptyText: "没有找到相关用户"
            },
            on: {
              loadMoreData: t.getFriendsBilateral
            },
            scopedSlots: t._u([{
              key: "content",
              fn: function(e) {
                var o = e.item;
                return [a("div", {
                  class: t.$style.l2item,
                  on: {
                    click: function(e) {
                      return t.selectCur(o)
                    }
                  }
                }, [a("woo-box", {
                  class: t.$style.itemin,
                  attrs: {
                    align: "center"
                  }
                }, [a("woo-checkbox", {
                  class: [t.$style.ipt, t.$style.ipt1],
                  attrs: {
                    value: o.idstr
                  },
                  model: {
                    value: t.check,
                    callback: function(e) {
                      t.check = e
                    },
                    expression: "check"
                  }
                }), a("woo-avatar", {
                  attrs: {
                    size: 50,
                    src: o.avatar_large
                  }
                }), a("woo-box-item", {
                  class: t.$style.cut,
                  attrs: {
                    align: "center"
                  }
                }, [a("woo-box", {
                  class: t.$style.t1
                }, [a("div", {
                  class: t.$style.permanent_name
                }, [t._v(" " + t._s(o.screen_name) + " ")]), o.permanent_host ? a("div", {
                  class: t.$style.permanent_c
                }, [a("div", {
                  class: t.$style.permanent
                }, [t._v(" 常驻主播 ")])]) : t._e()]), a("div", {
                  class: t.$style.t2
                }, [t._v(t._s(o.description))])], 1), o.following ? t._e() : a("div", {
                  class: t.$style.opt
                }, [a("FollowBtn", {
                  attrs: {
                    following: o.following,
                    uid: o.idstr,
                    doFoAction: !0,
                    foToast: !0
                  }
                })], 1)], 1), a("woo-divider", {
                  attrs: {
                    "border-color": "var(--w-off-border)"
                  }
                })], 1)]
              }
            }], null, !1, 2699306226)
          })], 1)]), a("woo-box-item", {
            class: t.$style.layeritem
          }, [t.audio ? a("AudioCard", {
            attrs: {
              cardSize: "cardx",
              hasBtn: !1,
              cover: t.audio.image_url,
              textA: t.audio.title,
              textB: t.audio.rss_url,
              text: t.audio.desc || t.audio.text,
              auto: t.audio.is_auto_publish,
              pass: t.audio.is_audit_pass,
              publishing: t.audio.is_publishing
            }
          }) : t._e(), t.audio ? a("div", {
            class: t.$style.audio_desc
          }, [t._v(" 为此节目添加固定共创人，添加完成后，此节目发布后，将会固定展示共创人 ")]) : t._e(), a("woo-box", {
            class: t.$style.tit,
            attrs: {
              align: "center"
            }
          }, [t._v("已选择( " + t._s(t.selectArrTemporary.length + 1) + " / 11)")]), a("div", {
            class: [t.$style.list2, t.$style.list22, "wbpro-scrollbar"],
            on: {
              dragover: function(t) {
                t.stopPropagation(), t.preventDefault()
              },
              scroll: t.scroll
            }
          }, [a("div", {
            class: t.$style.l2item
          }, [a("woo-box", {
            class: t.$style.itemin,
            attrs: {
              align: "center"
            }
          }, [a("woo-avatar", {
            attrs: {
              size: 50,
              src: t.config.user.avatar_large
            }
          }), a("woo-box-item", {
            class: t.$style.cut,
            attrs: {
              align: "center"
            }
          }, [a("div", {
            class: t.$style.t1
          }, [t._v(" " + t._s(t.config.user.screen_name) + " ")]), a("div", {
            class: t.$style.t2
          }, [t._v("作者")])])], 1), t.selectArrTemporary.length ? a("woo-divider") : t._e()], 1), t._l(t.selectArrTemporary, (function(e, o) {
            return a("div", {
              key: o,
              ref: "itemRefs",
              refInFor: !0,
              class: t.$style.l2item,
              attrs: {
                draggable: "true"
              },
              on: {
                dragstart: function(e) {
                  return t.onDragStart(arguments[0], o)
                },
                dragover: function(e) {
                  return e.preventDefault(), t.onDragEnter(arguments[0], o)
                },
                dragend: function(e) {
                  return e.preventDefault(), t.onDragEnd.apply(null, arguments)
                }
              }
            }, [a("woo-box", {
              class: t.$style.itemin,
              attrs: {
                align: "center"
              }
            }, [a("woo-avatar", {
              attrs: {
                size: 50,
                src: e.avatar_large
              }
            }), a("woo-box-item", {
              class: t.$style.cut,
              attrs: {
                align: "center"
              }
            }, [a("div", {
              class: t.$style.t1
            }, [t._v(t._s(e.screen_name))]), e.description ? a("div", {
              class: t.$style.t2
            }, [t._v(" " + t._s(e.description) + " ")]) : t._e()]), a("changeCreation", {
              attrs: {
                top: t.getCurrentTop(o),
                item: e,
                coCreateConfig: t.coCreateConfig
              },
              on: {
                show: t.closeAll
              }
            }), a("woo-fonticon", {
              class: t.$style.i2,
              attrs: {
                value: "move"
              }
            }), a("woo-fonticon", {
              class: t.$style.i1,
              attrs: {
                value: "close",
                kind: "dark"
              },
              nativeOn: {
                click: function(e) {
                  return t.deleteItem(o)
                }
              }
            })], 1), a("woo-divider")], 1)
          }))], 2), a("woo-box", {
            class: t.$style.btn,
            attrs: {
              align: "center",
              justify: "center"
            }
          }, [a("woo-button", {
            attrs: {
              kind: "default"
            },
            nativeOn: {
              click: function(e) {
                return t.cancel.apply(null, arguments)
              }
            }
          }, [t._v("取消")]), a("woo-button", {
            attrs: {
              sort: "flat",
              kind: "primary"
            },
            nativeOn: {
              click: function(e) {
                return t.confirm.apply(null, arguments)
              }
            }
          }, [t._v("确认")])], 1)], 1)], 1)], 1)]) : t._e()], 1)
        },
        n = [],
        r = (a("3778"), a("8f0c"), a("5f85"), a("079e"), a("ce6c"), a("7adc"), a("f035"), a("65f0"), a("b337"), a("e547"), a("5632"), a("83ef"), a("a1a5"), a("44c1"), a("1d07"), a("6f14")),
        i = a("100f"),
        s = a("c4da"),
        l = a("f85b"),
        c = a("6701"),
        u = a("0d7d"),
        d = a("8ccc"),
        v = a.n(d),
        f = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("woo-pop", {
            ref: "current",
            attrs: {
              show: t.show,
              flow: !t.creationCur,
              gap: 2,
              direction: t.direction
            },
            on: {
              "click-outside": t.close
            },
            scopedSlots: t._u([{
              key: "ctrl",
              fn: function() {
                return [a("woo-box", {
                  class: t.$style.btn,
                  attrs: {
                    tag: "button",
                    align: "center",
                    justify: "between"
                  },
                  nativeOn: {
                    click: function(e) {
                      return t.showCur.apply(null, arguments)
                    }
                  }
                }, [a("span", {
                  class: t.$style.t
                }, [t._v(t._s(t.creation[t.cur].name_zh))]), a("woo-fonticon", {
                  class: t.$style.i,
                  attrs: {
                    value: "caretDown"
                  }
                })], 1)]
              },
              proxy: !0
            }])
          }, [a("woo-pop-wrap", [a("woo-pop-group", t._l(t.creation, (function(e, o) {
            return a("woo-pop-item", {
              key: o,
              attrs: {
                cur: t.cur === o
              },
              nativeOn: {
                click: function(a) {
                  return t.change(o, e)
                }
              }
            }, [t._v(" " + t._s(e.name_zh) + " "), 1 === e.type && t.isAudio ? a("Action", {
              attrs: {
                auto: !0,
                title: "常驻主播说明",
                desc: "将给Ta发送常驻主播邀请，接受后成为你的常驻主播。<br />之后你发布音频选择Ta为常驻主播时，将<span>免于Ta的确认，常驻主播的账号同步发布该条微博，</span>并展示在Ta的个人主页并推荐给Ta的粉丝，播放数据与你共享。"
              }
            }) : t._e()], 1)
          })), 1)], 1)], 1)
        },
        p = [],
        _ = a("489c"),
        m = a("8e18"),
        g = {
          template: '<div class="custom_change_co_creation" v-html="text"/>',
          props: {
            text: String
          },
          data: function() {
            return {
              fruitSelect: this.fruit
            }
          }
        },
        y = {
          props: {
            top: {
              default: !1
            },
            item: {},
            creationCur: {
              type: Boolean,
              default: !1
            },
            coCreateConfig: {}
          },
          emit: ["show"],
          components: {
            Action: _["default"]
          },
          setup: function(t, e) {
            var a, o = e.emit,
              n = e.root,
              r = Object(m["a"])(),
              i = r.isAudio,
              s = Object(l["o"])("down"),
              c = function() {
                v.value = !1
              },
              u = function(e, a) {
                1 === a.type && i.value ? n.$_w_dialog({
                  type: "confirm",
                  title: "常驻主播说明",
                  component: g,
                  componentProps: {
                    text: "将给Ta发送常驻主播邀请，接受后成为你的常驻主播。<br />之后你发布音频选择Ta为常驻主播时，将<span>免于Ta的确认，常驻主播的账号同步发布该条微博，</span>并展示在Ta的个人主页并推荐给Ta的粉丝，播放数据与你共享。"
                  },
                  btnConfirm: "我知道了",
                  action: function() {
                    t.item.role = f[e].type, p.value = e, c(), d(t.item)
                  }
                }) : (t.item.role = f[e].type, p.value = e, c(), d(t.item))
              },
              d = function(t) {
                var e = t.role,
                  a = t.id,
                  o = localStorage.getItem("channel_role");
                o = o ? JSON.parse(o) : {}, o[a] = e, localStorage.setItem("channel_role", JSON.stringify(o))
              },
              v = Object(l["o"])(!1),
              f = null === t || void 0 === t || null === (a = t.coCreateConfig) || void 0 === a ? void 0 : a.role,
              p = Object(l["o"])(f.findIndex((function(e) {
                return e.type === t.item.role
              })));
            Object(l["t"])((function() {
              return t.item.role
            }), (function(t) {
              p.value = f.findIndex((function(e) {
                return e.type === t
              }))
            }));
            var _ = Object(l["o"])(),
              y = function() {
                o("show", t.item), v.value = !v.value, t.item.show = v.value;
                var e = _.value.$el.getBoundingClientRect();
                e.top + 200 > window.innerHeight ? s.value = "up" : s.value = "down"
              };
            return Object(l["t"])((function() {
              return t.item.show
            }), (function(t) {
              t || (v.value = !1)
            })), {
              cur: p,
              creation: f,
              show: v,
              close: c,
              change: u,
              showCur: y,
              current: _,
              direction: s,
              isAudio: i
            }
          }
        },
        b = y,
        C = a("cf01"),
        w = (a("db74"), a("04a2"));

      function h(t) {
        this["$style"] = C["default"].locals || C["default"]
      }
      var $ = Object(w["a"])(b, f, p, !1, h, null, null),
        x = $.exports,
        O = a("ba1d"),
        j = a("0e00"),
        k = function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", {
            domProps: {
              innerHTML: t._s(t.text)
            }
          })
        },
        T = [],
        A = (a("16e9"), a("80e0"), a("03ad"), {
          props: {
            protocol: {}
          },
          setup: function(t) {
            var e = t.protocol,
              a = Object(l["o"])();
            return a.value = e.text.replace(e.link.key, (function() {
              return '<a href="'.concat(e.link.value, '" target="_blank">').concat(e.link.key, "</a>")
            })), {
              text: a
            }
          }
        }),
        S = A,
        I = Object(w["a"])(S, k, T, !1, null, null, null),
        D = I.exports,
        E = 10,
        B = {
          emit: ["change"],
          props: {
            coCreationList: {},
            coCreateConfig: {},
            type: {},
            visible: {},
            timer: {},
            showIcon: {},
            showTitle: {
              default: !0
            },
            audio: {}
          },
          setup: function(t, e) {
            var a, o, n = e.emit,
              r = Object(l["e"])(),
              c = r.proxy,
              u = Object(l["o"])(!1),
              d = Object(l["o"])(),
              f = Object(l["o"])(!1),
              p = Object(l["o"])([]),
              _ = Object(l["o"])([]),
              g = Object(l["o"])([]),
              y = Object(l["o"])(1),
              b = Object(l["o"])(""),
              C = Object(l["o"])([]),
              w = Object(l["o"])(!0),
              h = Object(l["o"])(!1),
              $ = Object(l["o"])(!1),
              x = Object(l["o"])(!1),
              O = Object(l["o"])([]);
            if (t.coCreationList) {
              var j = t.coCreationList.filter((function(t) {
                return t.userInfo.id !== window.$CONFIG.user.id
              }));
              _.value = j.map((function(t) {
                var e, a, o = t.userInfo,
                  n = o.screen_name,
                  r = o.avatar_large,
                  i = o.id;
                return {
                  screen_name: n,
                  avatar_large: r,
                  idstr: String(i),
                  id: i,
                  role: null === (e = t.role) || void 0 === e ? void 0 : e.type,
                  selected: !0,
                  description: null === (a = t.role) || void 0 === a ? void 0 : a.name,
                  show: !1
                }
              })), g.value = Object(s["a"])(_.value), C.value = _.value.map((function(t) {
                return t.idstr
              }))
            }
            var k = function(t) {},
              T = (null === (a = t.coCreateConfig) || void 0 === a ? void 0 : a.permanent_host) ? null === (o = t.coCreateConfig) || void 0 === o ? void 0 : o.permanent_host.map((function(t) {
                return !t.idstr && (t.idstr = t.uid), !t.id && (t.id = t.uid), t.permanent_host = !0, t
              })) : [],
              A = T.length ? T.map((function(t) {
                return t.idstr
              })) : [],
              S = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                  a = {};
                return t.forEach((function(t, e) {
                  a[t.idstr] = e
                })), A.forEach((function(o) {
                  a[o] > -1 && (e ? t[a[o]] = !1 : t[a[o]].permanent_host = !0)
                })), t.filter((function(t) {
                  return t
                }))
              },
              I = function() {
                if (!b.value) {
                  var t;
                  if (1 === y.value)(t = p.value).push.apply(t, Object(s["a"])(T));
                  c.$http.get("/ajax/profile/getGroupMembers", {
                    params: {
                      list_id: "100093073493157",
                      page: y.value
                    }
                  }).then((function(t) {
                    var e;
                    if (w.value = !1, y.value += 1, t.data.data.total_number)
                      if (null === (e = t.data.data.users) || void 0 === e ? void 0 : e.length) {
                        var a, o = S(t.data.data.users, 1);
                        (a = p.value).push.apply(a, Object(s["a"])(o)), w.value = !0
                      } else w.value = !1, $.value = !0;
                    else x.value = !0, $.value = !0
                  }))
                }
              },
              B = function() {
                y.value = 1, t.coCreateConfig.invite_status ? (x.value = !1, c.$http.get("/ajax/setting/searchUsers", {
                  params: {
                    nick: b.value,
                    count: 100
                  }
                }).then((function(t) {
                  if (t.data && t.data.ok) {
                    t.data.total_number || (x.value = !0);
                    var e = S(t.data.users);
                    p.value = e, w.value = !1
                  }
                  w.value = !1, $.value = !0
                }))) : c.$http.get("/ajax/mblog/attention", {
                  params: {
                    q: b.value,
                    type: 3,
                    detail: !0
                  }
                }).then((function(t) {
                  var e;
                  if (w.value = !1, 0 !== t.data.data.total_number && t.data.data.total_number)
                    if (null === (e = t.data.data.users) || void 0 === e ? void 0 : e.length) {
                      var a = S(t.data.data.users);
                      p.value = a, w.value = !1
                    } else p.value = [];
                  else x.value = !0;
                  w.value = !1, $.value = !0
                }))
              },
              J = Object(l["o"])(),
              L = function() {
                t.showTitle || c.actionLog({
                  uicode: c.$route.meta.uicode,
                  page: "channel",
                  act_code: "7637",
                  ext: "channel:pc|audiotitle:".concat(t.audio.title)
                }), C.value = _.value.map((function(t) {
                  return t.idstr
                })), f.value = !0, Object(l["g"])((function() {
                  J.value.$el.querySelector("input").select()
                }))
              },
              N = function() {
                c.$_w_toast({
                  type: "success",
                  message: "最多添加".concat(E, "个共创人")
                })
              },
              R = function(t) {
                if (10 === g.value.length) N(), C.value.pop();
                else {
                  var e = g.value.findIndex((function(e) {
                    return e.idstr === t.idstr
                  }));
                  if (-1 === e) {
                    var a, o = t.screen_name,
                      n = t.avatar_large,
                      r = t.idstr,
                      i = t.id,
                      s = t.selected,
                      l = t.description,
                      c = t.permanent_host;
                    r || (r = i);
                    var u = localStorage.getItem("channel_role");
                    u = u ? JSON.parse(u) : {}, g.value.push({
                      screen_name: o,
                      avatar_large: n,
                      idstr: r,
                      id: i,
                      role: c ? 1 : null !== (a = u[i]) && void 0 !== a ? a : 2,
                      selected: s,
                      description: l,
                      show: !1
                    })
                  } else {
                    var d = g.value.findIndex((function(e) {
                      return e.idstr === t.idstr
                    }));
                    M(d)
                  }
                }
              },
              z = function(t) {
                !C.value.find((function(e) {
                  return e === t.idstr
                })) && g.value.length >= 10 && N()
              },
              M = function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                  a = g.value.splice(t, 1),
                  o = Object(i["a"])(a, 1),
                  n = o[0];
                if (e) {
                  var r = C.value.findIndex((function(t) {
                    return t === n.idstr
                  }));
                  C.value.splice(r, 1)
                }
              },
              F = function(e) {
                _.value.splice(e, 1), t.showTitle || c.$http.post("/ajax/multimedia/rss/bind", {
                  rss_url: t.audio.rss_url,
                  cooperators: JSON.stringify(_.value.map((function(t) {
                    return {
                      uid: t.idstr,
                      role: t.role
                    }
                  })))
                }).then((function(t) {}))
              },
              q = v()((function() {
                p.value = [], b.value ? B() : I()
              }), 500, {
                leading: !0
              }),
              G = function() {
                f.value = !1
              },
              H = function() {
                var e;
                JSON.stringify(_.value) === JSON.stringify(g) ? G() : (c.actionLog({
                  uicode: c.$route.meta.uicode,
                  page: "channel",
                  act_code: "7638",
                  ext: "channel:pc|type:".concat(tt.value ? t.showTitle ? 1 : 2 : 0, "|action:").concat((null === (e = _.value) || void 0 === e ? void 0 : e.length) <= 1 ? 1 : 0)
                }), c.$_w_dialog({
                  type: "confirm",
                  title: "共同创作投稿须知",
                  component: D,
                  componentProps: {
                    protocol: t.coCreateConfig.protocol
                  },
                  action: function() {
                    _.value = Object(s["a"])(g.value), G(), t.showTitle || c.$http.post("/ajax/multimedia/rss/bind", {
                      rss_url: t.audio.rss_url,
                      cooperators: JSON.stringify(_.value.map((function(t) {
                        return {
                          uid: t.idstr,
                          role: t.role
                        }
                      })))
                    }).then((function(t) {}))
                  }
                }))
              };
            Object(l["t"])((function() {
              return b.value
            }), (function() {
              q()
            })), Object(l["t"])((function() {
              return C.value
            }), (function(t, e) {
              var a = function(t, e) {
                  var a = t.filter((function(t) {
                      return !e.includes(t)
                    })),
                    o = e.filter((function(e) {
                      return !t.includes(e)
                    }));
                  return {
                    added: a,
                    removed: o
                  }
                },
                o = a(t, e),
                n = o.added,
                r = o.removed;
              n.map((function(t) {
                var e = p.value.find((function(e) {
                  return e.idstr === t
                }));
                R(e)
              })), r.map((function(t) {
                var e = g.value.findIndex((function(e) {
                  return e.idstr === t
                }));
                M(e, !1)
              }))
            })), Object(l["t"])((function() {
              return u.value
            }), (function(t) {
              t ? n("change", {
                coCreation: !0,
                selectArr: _
              }) : (_.value = [], n("change", {
                coCreation: !1,
                selectArr: _
              }))
            }), {
              deep: !0
            }), I();
            var P, V, X = function(t) {
                t.preventDefault()
              },
              Z = function(t, e) {
                P = e, V = Array.from(g.value), document.body.addEventListener("dragover", X)
              },
              Q = function(t, e) {
                var a;
                e !== P && void 0 !== P && (V = Array.from(V), (a = V).splice.apply(a, [e, 0].concat(Object(s["a"])(V.splice(P, 1)))), P = e, g.value = V, t.preventDefault())
              },
              W = function(t) {
                document.body.removeEventListener("dragover", X)
              },
              Y = function(t) {
                g.value.map((function(t) {
                  return t.show = !1, t
                }))
              },
              K = function() {
                g.value.map((function(t) {
                  return t.show = !1, t
                }))
              },
              U = Object(m["a"])(),
              tt = U.isAudio,
              et = function() {
                t.type ? c.$_w_toast({
                  type: "warn",
                  message: "转载视频无法共同创作"
                }) : t.visible ? t.timer && c.$_w_toast({
                  type: "warn",
                  message: "定时发布无法共同创作"
                }) : c.$_w_toast({
                  type: "warn",
                  message: "非公开".concat(tt.value ? "音" : "视", "频无法设置共同创作")
                })
              };
            return {
              scroll: Y,
              closeAll: K,
              CoCreation: u,
              CoCreationRef: d,
              showAdd: f,
              isEmpty: x,
              isLoading: w,
              isNoData: $,
              isRetry: h,
              friendsBilateral: p,
              selectArr: _,
              selectArrTemporary: g,
              q: b,
              check: C,
              searchCo: J,
              showToast: et,
              showLengthToast: N,
              onDragEnd: W,
              onDragEnter: Q,
              onDragStart: Z,
              cancel: G,
              confirm: H,
              selectItem: R,
              deleteItem: M,
              deleteItemReal: F,
              getFriendsBilateral: I,
              addCoCreation: L,
              searchBilateral: B,
              itemRefs: O,
              getCurrentTop: k,
              selectCur: z
            }
          },
          components: {
            Scroll: c["a"],
            changeCreation: x,
            FollowBtn: j["a"],
            Action: _["default"],
            AudioCard: u["default"]
          },
          computed: Object(r["a"])({}, Object(O["c"])(["config"])),
          methods: {
            addMargin: function() {
              if (this.$refs.layer) {
                var t = this.$refs.layer.getBoundingClientRect(),
                  e = t.y;
                this.$refs.layer.style.margin = e > 50 ? "" : "".concat(e > 0 ? e + 200 : 200 - e, "px 350px 50px")
              }
            },
            removeMargin: function() {
              this.$refs.layer && (this.$refs.layer.style.margin = "")
            }
          }
        },
        J = B,
        L = a("42a4");

      function N(t) {
        this["$style"] = L["default"].locals || L["default"]
      }
      var R = Object(w["a"])(J, o, n, !1, N, null, null);
      e["default"] = R.exports
    },
    cf01: function(t, e, a) {
      "use strict";
      var o = a("45bc"),
        n = a.n(o);
      e["default"] = n.a
    },
    db74: function(t, e, a) {
      "use strict";
      var o = a("6d8c"),
        n = a.n(o);
      n.a
    }
  }
]);
