const id = 603;
const ids = [603];
const modules = {

/***/ 7603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layouts_default)
});

// EXTERNAL MODULE: ./node_modules/@unhead/vue/dist/shared/vue.f36acd1f.mjs
var vue_f36acd1f = __webpack_require__(3366);
// EXTERNAL MODULE: ./node_modules/@prismicio/vue/dist/components/PrismicRichText.js
var PrismicRichText = __webpack_require__(4351);
// EXTERNAL MODULE: ./node_modules/@prismicio/vue/dist/components/PrismicImage.js
var PrismicImage = __webpack_require__(4603);
// EXTERNAL MODULE: ./node_modules/@prismicio/vue/dist/components/PrismicLink.js + 1 modules
var PrismicLink = __webpack_require__(9960);
// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/components/nuxt-link.js
var nuxt_link = __webpack_require__(1394);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);



function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = nuxt_link/* default */.Z;
  if ($props.linkType == "submenu") {
    _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, (0, external_vue_.mergeProps)({
      to: `/page/${$props.item.sub_nav_link.uid}`,
      key: "header-item-" + $props.index,
      onClick: ($event) => $options.closeMenu(),
      class: $props.className
    }, _attrs), {
      default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText($props.item.sub_nav_link_label))}`);
        } else {
          return [
            (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)(_ctx.$prismic.asText($props.item.sub_nav_link_label)), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, (0, external_vue_.mergeProps)({
      to: `/page/${$props.item.primary.link.uid}`,
      class: $props.className,
      onClick: ($event) => $options.closeMenu(),
      key: "nav-link-" + $props.index
    }, _attrs), {
      default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText($props.item.primary.label))}`);
        } else {
          return [
            (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)(_ctx.$prismic.asText($props.item.primary.label)), 1)
          ];
        }
      }),
      _: 1
    }, _parent));
  }
}
const anotherHtmlSerializer = function(type, element, content, children) {
};
/* harmony default export */ const MenuLinkNativSlicevue_type_script_lang_js = ({
  props: ["index", "item", "className", "linkType"],
  name: "link-native-slice",
  data() {
    return {
      anotherHtmlSerializer
    };
  },
  methods: {
    closeMenu() {
      $("#navbarmenuContent").collapse("hide");
    }
  }
});
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6058);
const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(MenuLinkNativSlicevue_type_script_lang_js, [['ssrRender',ssrRender]]);

/* harmony default export */ const MenuLinkNativSlice = (__exports__);








const __default__ = {
  data() {
    return {
      hovered: false,
      slices: [],
      prismicData: null,
      fields: {
        header: {
          background_color: "",
          text_color: "",
          transparency: ""
        },
        logo: {},
        tagline: [],
        background: [],
        transparency: [],
        bolder_link_label: [],
        bolder_link: {},
        mobileMenu: {}
      }
    };
  },
  // watch: {
  //   "fields.logo"(newVal) {
  //     this.$store.commit('setHeaderLogo' ,newVal)
  //   }
  // },
  computed: {
    color() {
      if (this.fields.header.background_color) {
        let transparency = Number(this.fields.header.transparency) / 100;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) {
          let ret = this.fields.header.background_color.slice(1);
          ret = ret.split("");
          if (ret.length == 3) {
            var ar = [];
            ar.push(ret[0]);
            ar.push(ret[0]);
            ar.push(ret[1]);
            ar.push(ret[1]);
            ar.push(ret[2]);
            ar.push(ret[2]);
            ret = ar;
          }
          ret = "0x" + ret.join("");
          var r = ret >> 16 & 255;
          var g = ret >> 8 & 255;
          var b = ret & 255;
          let color = "rgba(" + [r, g, b].join(",") + "," + transparency + ")";
          return {
            "background-color": color,
            "border": "1px solid " + color,
            "color": this.fields.header.text_color
          };
        }
      }
    },
    background() {
      if (this.fields.header.background_color) {
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) {
          let ret = this.fields.header.background_color.slice(1);
          ret = ret.split("");
          if (ret.length == 3) {
            var ar = [];
            ar.push(ret[0]);
            ar.push(ret[0]);
            ar.push(ret[1]);
            ar.push(ret[1]);
            ar.push(ret[2]);
            ar.push(ret[2]);
            ret = ar;
          }
          ret = "0x" + ret.join("");
          var r = ret >> 16 & 255;
          var g = ret >> 8 & 255;
          var b = ret & 255;
          let color = "rgba(" + [r, g, b].join(",") + "," + 0.9 + ")";
          return {
            "background-color": color,
            "border": "1px solid " + this.fields.header.text_color,
            "color": this.fields.header.text_color
          };
        }
      }
    },
    button() {
      return {
        "--color": this.fields.header.text_color,
        "--border": "2px solid " + this.fields.header.text_color,
        "--color-hover": "#FFFFFF",
        "--border-hover": "2px solid " + this.fields.header.text_color_hover,
        "--background-color-hover": this.fields.header.text_color_hover
      };
    },
    hoverClass() {
      return {
        "color": "red"
      };
    }
  },
  methods: {
    // ...mapMutations(['setHeaderLogo','SET_MENU']),
    closeMenu() {
      $("#navbarmenuContent").collapse("hide");
    },
    async getMenu() {
    },
    performPrismicOperation(prismicFunction, ...args) {
      return new Promise((resolve, reject) => {
        prismicFunction(...args).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  },
  async mounted() {
    this.$prismic.client.getSingle("menu").then((result) => {
      let menuContent = result;
      this.fields.logo = menuContent.data.logo;
      this.fields.header.background_color = menuContent.data.background_color;
      this.fields.header.transparency = 80;
      this.fields.header.text_color = "#f55e61";
      this.fields.header.text_color_hover = "#72bf44";
      this.fields.tagline = menuContent.data.brand_tag_line;
      this.fields.background = menuContent.data.background_color;
      this.fields.transparency = menuContent.data.transparency;
      this.fields.bolder_link_label = menuContent.data.get_in_touch;
      this.fields.bolder_link = menuContent.data.get_in_touch_link;
      this.fields.mobileMenu = menuContent.data.mobile_menu;
      this.slices = menuContent.data.nav.filter(function(navs) {
        return navs.slice_type === "header";
      });
    }).catch((error) => {
      console.error(error);
    });
  }
};
/* harmony default export */ const HeaderPrismicvue_type_script_setup_true_lang_js = (/* @__PURE__ */Object.assign(__default__, {
  __name: "HeaderPrismic",
  __ssrInlineRender: true,
  setup(__props) {
    (0, vue_f36acd1f.u)({
      meta: [
        { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = (0, external_vue_.resolveComponent)("router-link");
      const _component_prismic_rich_text = PrismicRichText/* PrismicRichText */.v;
      const _component_prismic_image = PrismicImage/* PrismicImage */.P2;
      const _component_prismic_link = PrismicLink/* PrismicLink */.wK;
      const _component_MenuLinkNativSlice = MenuLinkNativSlice;
      const _component_NuxtLink = nuxt_link/* default */.Z;
      _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "header-wrap" }, _attrs))} data-v-34f81b0d><header class="site-header" style="${(0, server_renderer_.ssrRenderStyle)(_ctx.color)}" data-v-34f81b0d><div class="row header-container" data-v-34f81b0d><div class="col-lg-3 col-md-3 col-sm-4 col-4 header-logo" data-v-34f81b0d>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_router_link, {
        to: "/",
        class: "logo Homepage-btn",
        id: "CMLogo"
      }, {
        default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://images.prismic.io/cmct-web/84e86b12-dfd7-46eb-ac61-f2cb4f43f553_Logo+for+website.png" width="135" height="60"${(0, server_renderer_.ssrRenderAttr)("alt", _ctx.fields.logo.alt)} data-v-34f81b0d${_scopeId}>`);
          } else {
            return [
              (0, external_vue_.createVNode)("img", {
                src: "https://images.prismic.io/cmct-web/84e86b12-dfd7-46eb-ac61-f2cb4f43f553_Logo+for+website.png",
                width: "135",
                height: "60",
                alt: _ctx.fields.logo.alt
              }, null, 8, ["alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-lg-9 col-md-9 col-sm-8 col-8 header-menu" data-v-34f81b0d>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_rich_text, {
        field: _ctx.fields.tagline
      }, null, _parent));
      _push(`<div class="d-flex justify-content-between align-items-center navbar-heading-menu" data-v-34f81b0d><nav class="navbar navbar-expand-lg" data-v-34f81b0d><a class="navbar-brand title" href="#" data-v-34f81b0d>Menu</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarmenuContent" aria-controls="navbarmenuContent" aria-expanded="false" aria-label="Toggle navigation" data-v-34f81b0d><span class="navbar-toggler-icon" data-v-34f81b0d>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_image, {
        field: _ctx.fields.mobileMenu
      }, null, _parent));
      _push(`</span></button><div class="collapse navbar-collapse" id="navbarmenuContent" data-v-34f81b0d><ul class="navbar-nav mr-auto" data-v-34f81b0d><!--[-->`);
      (0, server_renderer_.ssrRenderList)(_ctx.slices, (slice, index) => {
        _push(`<li class="nav-item dropdown" data-v-34f81b0d>`);
        if (slice.slice_type === "header") {
          _push(`<!--[-->`);
          if (slice.primary.link.link_type == "Any") {
            _push(`<span class="${(0, server_renderer_.ssrRenderClass)("menu-maintitle nav-link " + [slice.items.length >= 1 ? "dropdown-toggle" : ""])}" data-toggle="dropdown" data-v-34f81b0d>${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText(slice.primary.label))}</span>`);
          } else {
            _push(`<!--[-->`);
            if (slice.items.length >= 1) {
              _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_link, {
                field: slice.primary.link,
                class: "menu-maintitle nav-link " + [slice.items.length > 1 ? "dropdown-toggle" : ""],
                "data-toggle": "dropdown",
                key: "nav-link-" + index
              }, {
                default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText(slice.primary.label))}`);
                  } else {
                    return [
                      (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)(_ctx.$prismic.asText(slice.primary.label)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push((0, server_renderer_.ssrRenderComponent)(_component_MenuLinkNativSlice, {
                item: slice,
                "class-name": "menu-maintitle nav-link",
                onClick: ($event) => _ctx.closeMenu(),
                key: "menu-header-item-" + index,
                index,
                "link-type": "main"
              }, null, _parent));
            }
            _push(`<!--]-->`);
          }
          if (slice.items.length > 1) {
            _push(`<i class="fa fa-caret-down" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-v-34f81b0d></i>`);
          } else {
            _push(`<!---->`);
          }
          if (slice.items.length >= 1) {
            _push(`<div class="dropdown-menu" aria-labelledby="navbarDropdown" data-v-34f81b0d><!--[-->`);
            (0, server_renderer_.ssrRenderList)(slice.items, (item, index2) => {
              _push(`<div data-v-34f81b0d>`);
              _push((0, server_renderer_.ssrRenderComponent)(_component_MenuLinkNativSlice, {
                onClick: ($event) => _ctx.closeMenu(),
                item,
                index: index2,
                "class-name": "menu-subtitle dropdown-item",
                "link-type": "submenu"
              }, null, _parent));
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></nav>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_NuxtLink, {
        to: `/page/${_ctx.fields.bolder_link.uid}`,
        class: "dashboard-btn",
        style: _ctx.button,
        id: "FindAHome"
      }, {
        default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2((0, server_renderer_.ssrRenderComponent)(_component_prismic_rich_text, {
              class: "details text-image-slice-description",
              field: _ctx.fields.bolder_link_label
            }, null, _parent2, _scopeId));
          } else {
            return [
              (0, external_vue_.createVNode)(_component_prismic_rich_text, {
                class: "details text-image-slice-description",
                field: _ctx.fields.bolder_link_label
              }, null, 8, ["field"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header></div>`);
    };
  }
}));
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unctx%3Atransform!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Acomponents%3Aimports!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aremove-plugin-metadata!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aclient-fallback-auto-id!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aserver-devonly%3Atransform!./components/HeaderPrismic/HeaderPrismic.vue?vue&type=style&index=0&id=34f81b0d&scoped=true&lang=css
__webpack_require__(8814);


const HeaderPrismic_exports_ = /*#__PURE__*/(0, exportHelper/* default */.Z)(HeaderPrismicvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-34f81b0d"]]);

/* harmony default export */ const HeaderPrismic = (HeaderPrismic_exports_);
// EXTERNAL MODULE: ./public/Powered_ColivHQ.png
var Powered_ColivHQ = __webpack_require__(8188);
var Powered_ColivHQ_default = /*#__PURE__*/__webpack_require__.n(Powered_ColivHQ);






function FooterPrismicvue_type_template_id_3e972bee_scoped_true_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = (0, external_vue_.resolveComponent)("router-link");
  const _component_prismic_image = PrismicImage/* PrismicImage */.P2;
  const _component_prismic_rich_text = PrismicRichText/* PrismicRichText */.v;
  const _component_prismic_link = PrismicLink/* PrismicLink */.wK;
  _push(`<div${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "bg-white position-relative" }, _attrs))} data-v-3e972bee><footer class="footer" style="${(0, server_renderer_.ssrRenderStyle)($options.background)}" data-v-3e972bee><div class="footer-inner" data-v-3e972bee><nav data-v-3e972bee><div class="row" data-v-3e972bee><div class="col-xl-4 col-lg-3 col-md-2 col-sm-12 footer-logo col-12 pr-md-0 pr-lg-3" data-v-3e972bee>`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_router_link, { to: "/" }, {
    default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2((0, server_renderer_.ssrRenderComponent)(_component_prismic_image, {
          field: $data.fields.logo
        }, null, _parent2, _scopeId));
      } else {
        return [
          (0, external_vue_.createVNode)(_component_prismic_image, {
            field: $data.fields.logo
          }, null, 8, ["field"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_rich_text, {
    field: $data.fields.address,
    class: "details",
    style: { "color": $data.fields.text_color }
  }, null, _parent));
  _push(`</div><div class="col-xl-8 col-lg-9 col-md-10 col-12" data-v-3e972bee><div class="row justify-content-between" data-v-3e972bee><!--[-->`);
  (0, server_renderer_.ssrRenderList)($data.slices, (slice, index) => {
    _push(`<div class="col-lg-auto col-md-auto footer-content mb-3 mb-md-0 pr-md-0 pr-lg-3" data-v-3e972bee>`);
    if (slice.primary.link.link_type == "Any" || slice.primary.link.link_type == "Document") {
      _push(`<button class="btn btn-link p-0 link-title title-header" id="btnlink" style="${(0, server_renderer_.ssrRenderStyle)({ "color": $data.fields.text_color })}" data-v-3e972bee>${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText(slice.primary.label))}</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    (0, server_renderer_.ssrRenderList)(slice.items, (item, itemindex) => {
      _push(`<div data-v-3e972bee>`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_link, {
        field: item.sub_nav_link,
        class: "link-title",
        style: { "color": $data.fields.text_color }
      }, {
        default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText(item.sub_nav_link_label))}`);
          } else {
            return [
              (0, external_vue_.createTextVNode)((0, external_vue_.toDisplayString)(_ctx.$prismic.asText(item.sub_nav_link_label)), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div>`);
    });
    _push(`<!--]--></div>`);
  });
  _push(`<!--]--><div class="col-lg-auto col-md-auto footer-content" data-v-3e972bee><button class="btn btn-link p-0 link-title title-header" id="btnlink" style="${(0, server_renderer_.ssrRenderStyle)({ "color": $data.fields.text_color })}" data-v-3e972bee> SOCIAL </button><!--[-->`);
  (0, server_renderer_.ssrRenderList)($data.bottom.social_media_links, (item, index) => {
    _push(`<figure class="social-icon" data-v-3e972bee>`);
    _push((0, server_renderer_.ssrRenderComponent)(_component_prismic_link, {
      field: item.social_media_link,
      target: "_blank",
      class: "link-title"
    }, {
      default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span class="footer-soical-icon d-inline-block text-center" data-v-3e972bee${_scopeId}><img${(0, server_renderer_.ssrRenderAttr)("src", item.social_media_icon.url)} width="14" height="14" data-v-3e972bee${_scopeId}></span><span class="ml-2" data-v-3e972bee${_scopeId}>${(0, server_renderer_.ssrInterpolate)(item.social_media_icon.alt)}</span>`);
        } else {
          return [
            (0, external_vue_.createVNode)("span", { class: "footer-soical-icon d-inline-block text-center" }, [
              (0, external_vue_.createVNode)("img", {
                src: item.social_media_icon.url,
                width: "14",
                height: "14"
              }, null, 8, ["src"])
            ]),
            (0, external_vue_.createVNode)("span", { class: "ml-2" }, (0, external_vue_.toDisplayString)(item.social_media_icon.alt), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</figure>`);
  });
  _push(`<!--]--></div></div></div></div></nav></div></footer><div style="${(0, server_renderer_.ssrRenderStyle)({ "background-color": $data.bottom.backGround_color, "color": $data.bottom.text_color })}" class="bottom-bar" data-v-3e972bee><div class="row footer-bottom px-0 text-left text-md-left m-0 mt-xl-5 pb-xl-4 pt-xl-4" data-v-3e972bee><div class="col-md-6 footer-copyright" data-v-3e972bee><span class="logo-right-text" data-v-3e972bee>${(0, server_renderer_.ssrInterpolate)(_ctx.$prismic.asText($data.fields.copyright))}</span></div><div class="col-md-6 text-left text-md-right" data-v-3e972bee><ul class="d-md-flex justify-content-md-end footer-privacy-policy mb-0 pl-0" data-v-3e972bee><li data-v-3e972bee>`);
  _push((0, server_renderer_.ssrRenderComponent)(_component_router_link, { to: "/page/privacy-policy" }, {
    default: (0, external_vue_.withCtx)((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Privacy Policy`);
      } else {
        return [
          (0, external_vue_.createTextVNode)("Privacy Policy")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="row footer-bottom px-0 m-0" data-v-3e972bee><div class="col-12 text-left text-md-center" data-v-3e972bee><a href="https://colivhq.com/page/operators" target="blank" data-v-3e972bee><img${(0, server_renderer_.ssrRenderAttr)("src", (Powered_ColivHQ_default()))} alt="Powered_ColivHQ_img" width="94" height="50" data-v-3e972bee></a></div></div></div></div>`);
}
/* harmony default export */ const FooterPrismicvue_type_script_lang_js = ({
  name: "FooterPrismic",
  data() {
    return {
      slices: [],
      fields: {
        address: [],
        logo: {},
        logo_link: {},
        barColor: [],
        copyright: [],
        footerColor: "",
        text_color: "",
        overlay: {}
      },
      bottom: {
        backGround_color: "",
        text_color: "",
        social_media_links: []
      }
    };
  },
  computed: {
    background() {
      if (this.fields.footerColor) {
        return {
          "background-color": this.fields.footerColor
        };
      }
    }
  },
  methods: {
    async getMenu() {
    }
  },
  mounted() {
    this.$prismic.client.getSingle("menu").then((result) => {
      let footerContent = result;
      this.slices = footerContent.data.nav.filter(function(navs) {
        return navs.slice_type === "footer";
      });
      this.fields.address = footerContent.data.company_address;
      this.fields.footerColor = "#F5F5F5", //footerContent.data.background_color
      this.fields.text_color = "#000000";
      this.fields.logo = footerContent.data.logo.Footer;
      this.fields.logo_link = footerContent.data.logo.Footer;
      this.fields.copyright = footerContent.data.copyright;
      this.bottom.backGround_color = "#F5F5F5", //footerContent.data.background_color
      this.bottom.text_color = "#000000";
      this.bottom.social_media_links = footerContent.data.social_media_links;
      this.fields.overlay = footerContent.data.overlay;
    }).catch((error) => {
      console.error(error);
    });
  }
});
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unctx%3Atransform!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Acomponents%3Aimports!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aremove-plugin-metadata!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aclient-fallback-auto-id!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aserver-devonly%3Atransform!./components/FooterPrismic/FooterPrismic.vue?vue&type=style&index=0&id=3e972bee&scoped=true&lang=css
__webpack_require__(2093);


const FooterPrismic_exports_ = /*#__PURE__*/(0, exportHelper/* default */.Z)(FooterPrismicvue_type_script_lang_js, [['ssrRender',FooterPrismicvue_type_template_id_3e972bee_scoped_true_ssrRender],['__scopeId',"data-v-3e972bee"]]);

/* harmony default export */ const FooterPrismic = (FooterPrismic_exports_);






/* harmony default export */ const defaultvue_type_script_setup_true_lang_js = ({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const title = (0, external_vue_.ref)("Casa Mia Coliving Website");
    (0, vue_f36acd1f.u)({
      title
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderPrismic = HeaderPrismic;
      const _component_FooterPrismic = FooterPrismic;
      _push(`<div${(0, server_renderer_.ssrRenderAttrs)(_attrs)}><div class="header-wrap">`);
      _push((0, server_renderer_.ssrRenderComponent)(_component_HeaderPrismic, null, null, _parent));
      _push(`</div>`);
      (0, server_renderer_.ssrRenderSlot)(_ctx.$slots, "default", {}, null, _push, _parent);
      _push((0, server_renderer_.ssrRenderComponent)(_component_FooterPrismic, null, null, _parent));
      _push(`</div>`);
    };
  }
});



const default_exports_ = defaultvue_type_script_setup_true_lang_js;

/* harmony default export */ const layouts_default = (default_exports_);

/***/ }),

/***/ 8188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/Powered_ColivHQ.9851109.png";

/***/ }),

/***/ 2093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(7086);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2112);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.footer[data-v-3e972bee]{background-color:#fff!important;margin:0 auto;max-width:none;padding:125px 15px 0;position:relative;text-align:center;z-index:1}.footer .floating-icon[data-v-3e972bee]{left:35%;position:absolute;top:0}footer .footer-detail .footer-logo[data-v-3e972bee]{align-items:center;color:#fff;display:flex;text-align:left}.footer .footer-content[data-v-3e972bee]{color:#fff;font-size:13px;font-weight:600;letter-spacing:.5px;margin-bottom:15px;max-width:25%}.footer .footer-content .link-title.title-header[data-v-3e972bee]{font-size:16px;font-weight:700;margin-bottom:40px}.footer-copyright[data-v-3e972bee]{color:#000;font-size:16px}.footer-privacy-policy li[data-v-3e972bee]{list-style:none}.footer .footer-content .link-title[data-v-3e972bee],.footer-privacy-policy li a[data-v-3e972bee]{color:#000;font-size:16px;text-decoration:none}.footer .footer-content .link-title[data-v-3e972bee]{cursor:pointer;display:block;letter-spacing:.5px;line-height:120%;margin-bottom:30px;text-align:left}.footer .footer-content .link-title[data-v-3e972bee]:hover{color:#72bf44}.footer .footer-content .footer-soical-icon[data-v-3e972bee]{background-color:#000;border-radius:50%;height:26px;line-height:23px;width:26px}.footer .footer-content .footer-sublink[data-v-3e972bee]{color:#fff;display:block;font-size:14px;line-height:normal;text-align:left;text-decoration:none}.footer-detail ul[data-v-3e972bee]{justify-content:flex-end;margin-bottom:0;padding-left:0}.footer-bottom[data-v-3e972bee]{margin:auto;max-width:100%;padding:10px 20px}.footer-bottom .footer-social .social-icon[data-v-3e972bee]{display:inline-block;float:right;margin-left:15px;vertical-align:middle}.footer-bottom .footer-social .social-icon a[data-v-3e972bee]{align-items:center;background-color:#f55e61;border-radius:50%;display:flex;height:30px;justify-content:center;transform:scale(1);transition:all .3s ease-in-out;transition:all .4s;vertical-align:middle;width:30px}.footer-bottom .footer-social[data-v-3e972bee]{text-align:right}.footer-bottom .footer-social .social-icon img[data-v-3e972bee]{height:12px}.footer-bottom .footer-social .social-icon a[data-v-3e972bee]:hover{transform:scale(1.2)}.footer .footer-bottom .footer-copyright[data-v-3e972bee] :first-child{color:#fff;margin-bottom:0;text-align:left}footer .footer-logo .logo-right-text[data-v-3e972bee]{color:#fff;display:inline-block;font-size:14px;letter-spacing:.5px;margin-left:10px;text-align:left;vertical-align:text-top}footer .footer-logo[data-v-3e972bee]{position:relative;text-align:left}.footer .footer-content .link-title[data-v-3e972bee]:hover{color:#000}.bottom-bar[data-v-3e972bee]{background-color:#fff!important;margin:auto;max-width:1640px;position:relative;z-index:1}@media(max-width:1199px){.footer .footer-content[data-v-3e972bee]{padding:0 15px}}@media (min-width:992px) and (max-width:1199px){.footer .footer-content .link-title[data-v-3e972bee]{font-size:15px;margin-bottom:15px}.footer .footer-content .link-title.title-header[data-v-3e972bee]{margin-bottom:20px}.footer-copyright[data-v-3e972bee],.footer-privacy-policy li a[data-v-3e972bee]{font-size:15px}}@media(max-width:767px){footer .footer-logo .logo-right-text[data-v-3e972bee]{margin-left:0}.footer .footer-content .footer-soical-icon[data-v-3e972bee]{line-height:29px}}@media(max-width:680px){footer .footer-logo .logo-right-text[data-v-3e972bee]{font-size:12px}}@media(min-width:576px){footer .poweredby-logo[data-v-3e972bee]{bottom:0;position:absolute}}@media(max-width:575px){.footer .footer-detail .footer-logo[data-v-3e972bee]{display:block;margin:0 0 30px;text-align:center}.footer-bottom .footer-social[data-v-3e972bee]{text-align:center}.footer-bottom .footer-social .social-icon[data-v-3e972bee]{float:none;margin-right:15px}.footer-detail ul[data-v-3e972bee]{display:block}.footer .footer-content[data-v-3e972bee]{float:left;margin-bottom:0}.footer .footer-content a[data-v-3e972bee]:last-child{margin-bottom:10px}.footer .footer-bottom .footer-copyright[data-v-3e972bee] :first-child{text-align:center}footer .footer-logo[data-v-3e972bee]{margin-bottom:10px}}@media(max-width:420px){.footer .footer-content[data-v-3e972bee]{float:none;width:100%}.footer-detail[data-v-3e972bee]{margin:15px 0}}#app[data-v-3e972bee]{margin:0 auto;width:100%}@media (min-width:768px) and (max-width:991px){.footer .footer-content .link-title[data-v-3e972bee]{font-size:13px;margin-bottom:15px}.footer .footer-content .link-title.title-header[data-v-3e972bee]{font-size:15px;margin-bottom:20px}.footer-bottom[data-v-3e972bee]{max-width:100%}.footer-copyright[data-v-3e972bee],.footer-privacy-policy li a[data-v-3e972bee]{font-size:13px}.footer .footer-content .footer-soical-icon img[data-v-3e972bee]{height:13px;line-height:13px}}@media (max-width:767px){.footer .footer-content .link-title[data-v-3e972bee]{font-size:14px;margin-bottom:10px}.footer .footer-content .link-title.title-header[data-v-3e972bee]{font-size:16px;margin-bottom:20px}.footer .floating-icon[data-v-3e972bee]{left:55%;width:100px}.footer[data-v-3e972bee]{padding:45px 15px 0}.bottom-bar[data-v-3e972bee]{font-size:13px;text-align:center}.footer-bottom .footer-social[data-v-3e972bee]{text-align:center!important}.footer-bottom .footer-social .social-icon[data-v-3e972bee]:last-child{margin-left:0}.footer .footer-content[data-v-3e972bee]{max-width:100%}}@media (min-width:1200px) and (max-width:1600px){.footer-bottom[data-v-3e972bee]{margin-top:0!important}}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 8814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(7086);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2112);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.site-header[data-v-34f81b0d]{height:auto;padding:0}.site-header .row[data-v-34f81b0d]{margin:0}.site-header[data-v-34f81b0d],.site-header a[data-v-34f81b0d]{font-weight:400}.site-header nav a[data-v-34f81b0d]:hover{color:gray;color:#a9a9a9}.site-header .logo[data-v-34f81b0d]{display:inline-block;font-size:22px;font-weight:900;line-height:20px}.site-header nav[data-v-34f81b0d]{float:left}.site-header nav ul[data-v-34f81b0d]{margin:0}.site-header nav li[data-v-34f81b0d]{margin-left:0}@media (max-width:767px){.site-header[data-v-34f81b0d]{height:auto;position:fixed}.site-header .logo[data-v-34f81b0d]{display:inline-block;text-align:left}.site-header nav[data-v-34f81b0d]{float:none;text-align:center}.site-header nav li[data-v-34f81b0d]{display:inline-block;margin-left:10px;margin-right:10px}.header-menu[data-v-34f81b0d]{align-items:center;display:flex}}.site-header .header-menu ul li[data-v-34f81b0d]{display:inline-block;margin:0 35px;padding:34px 0;vertical-align:middle}.site-header .row[data-v-34f81b0d]{align-items:center}.site-header .header-menu ul li .menu-maintitle[data-v-34f81b0d]{color:#000;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;padding:0 8px;position:relative;text-transform:uppercase;vertical-align:middle}.site-header .header-menu ul li.show .menu-maintitle[data-v-34f81b0d]{color:#72bf44}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{border-radius:20px;font-size:14px;font-weight:600;font-weight:700;height:40px;letter-spacing:0;line-height:40px;margin-left:27px;min-width:168px;padding:0;text-align:center;text-transform:capitalize}.site-header .header-menu a[data-v-34f81b0d]{text-decoration:none}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{background-color:#72bf44;border:0!important;color:#fff;transition:all .5s}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]:hover{background-color:#000;color:#fff}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]{color:#000;font-size:16px;font-weight:700;padding:0 15px}.site-header .header-menu .dropdown-toggle[data-v-34f81b0d]:after{border-top:.4em solid #72bf44;display:none}.site-header nav[data-v-34f81b0d]{padding:0}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]:hover,.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item[data-v-34f81b0d]:focus,.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item[data-v-34f81b0d]:hover{background-color:transparent;color:#000}.site-header .header-menu ul li i[data-v-34f81b0d]{color:#72bf44;cursor:pointer;font-size:16px}.site-header nav li[data-v-34f81b0d]:first-child{margin-left:0}.text-s[data-v-34f81b0d]{font-size:35px}.site-header .header-menu ul li i[data-v-34f81b0d]{opacity:0}@media(min-width:992px){.site-header .header-menu .navbar-brand[data-v-34f81b0d]{display:none}.site-header .header-menu .navbar-expand-lg .navbar-nav .nav-item .dropdown-menu[data-v-34f81b0d]{background-color:#fff;border:none;border-radius:0;border-radius:10px;box-shadow:-1px 1px 6px 0 rgba(90,90,140,.4);color:#fff;display:block!important;margin-top:0;min-width:170px;opacity:0;padding:0;transition:all .5s ease-in-out;visibility:hidden}.site-header .header-menu .navbar-expand-lg .navbar-nav .nav-item:hover .dropdown-menu[data-v-34f81b0d]{opacity:1;visibility:visible}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]{padding:7px 15px}.site-header .header-menu ul li .menu-maintitle[data-v-34f81b0d]:before{content:none}.site-header .header-menu ul li .menu-maintitle[data-v-34f81b0d]:hover:before{width:85%}.site-header .header-menu ul li:hover .menu-maintitle[data-v-34f81b0d]{color:#72bf44}.header-wrap[data-v-34f81b0d]{margin-top:100px}.navbar-heading-menu[data-v-34f81b0d]{display:grid!important;grid-template-columns:80% 20%}.site-header nav ul[data-v-34f81b0d]{margin:auto!important}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{margin-left:auto;width:168px}}@media(max-width:991px){.site-header .header-menu[data-v-34f81b0d],.site-header .header-menu.navbar[data-v-34f81b0d]{display:flex;justify-content:flex-end;position:static}.site-header .header-container[data-v-34f81b0d]{padding:15px 0}.site-header .header-menu .navbar-brand.title[data-v-34f81b0d]{color:#fff;display:none;font-size:18px}.site-header .header-menu .navbar-toggler[data-v-34f81b0d]{background-color:#e4f3db;border:2px solid #72bf44;padding:3px 8px}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]{color:#000!important;font-size:14px}.site-header .header-menu .navbar-collapse[data-v-34f81b0d]{background-color:#fff;border-radius:0 0 10px 10px;box-shadow:-1px 0 3px 0 rgba(90,90,140,.4);margin-top:0;padding:15px;position:absolute;right:0;top:100%;transition:all .3s ease-in-out;width:100%}.site-header nav[data-v-34f81b0d]{position:static}.site-header .header-menu i.fa-caret-down[data-v-34f81b0d]{height:20px;left:auto;line-height:20px;position:absolute;right:0;text-align:center;top:10px;width:20px}.site-header .header-menu ul li .menu-maintitle[data-v-34f81b0d]{color:#000;font-size:13px;padding:5px 8px;text-align:left}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{margin-left:0}.site-header .header-menu ul li[data-v-34f81b0d]{margin-left:0;padding:0;text-align:left}.site-header .header-menu .navbar-nav .dropdown-menu[data-v-34f81b0d]{background-color:transparent;border:none;border-radius:0;border-top:1px solid #b5b5b5;border:none!important;margin:0;padding:0}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]{color:#ddd}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{height:40px;left:auto;line-height:38px;position:absolute;right:78px}.site-header .header-menu ul li a[data-v-34f81b0d]:hover{color:#72bf44}}@media (min-width:992px) and (max-width:1199px){.site-header .header-menu ul li[data-v-34f81b0d]{margin:0 5px!important}.site-header .header-menu ul li .menu-maintitle[data-v-34f81b0d]{font-size:12px}.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle[data-v-34f81b0d]{font-size:13px}.navbar-heading-menu[data-v-34f81b0d]{display:flex!important}}@media(max-width:767px){.site-header .header-menu .navbar-collapse[data-v-34f81b0d]{width:100%}.header-wrap[data-v-34f81b0d]{margin-top:80px}}@media(max-width:575px){.site-header .header-menu .navbar-collapse[data-v-34f81b0d]{margin-top:22px;width:100%}.site-header .logo[data-v-34f81b0d]{display:inline-block;position:relative;vertical-align:middle;z-index:9999}.header-wrap[data-v-34f81b0d]{margin-top:74px}}@media (max-width:480px){.site-header .logo img[data-v-34f81b0d]{max-width:80%}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{font-size:12px;padding:0 10px}.site-header .header-menu .navbar-collapse[data-v-34f81b0d]{margin-top:24px}}@media (min-width:768px) and (max-width:991px){.navbar-toggler-icon[data-v-34f81b0d]{height:1.2em;width:1.2em}.site-header .header-menu .navbar-toggler[data-v-34f81b0d]{padding:6px 8px}.header-wrap[data-v-34f81b0d]{margin-top:100px}}@media (max-width:767px){.site-header[data-v-34f81b0d]{max-width:100%;width:auto}.navbar-toggler-icon[data-v-34f81b0d]{height:1em;width:1em}.site-header .header-menu .navbar-toggler[data-v-34f81b0d]{padding:4px 8px}.site-header .header-menu .dashboard-btn[data-v-34f81b0d]{border:1px solid #72bf44!important;font-size:11px;height:34px;line-height:32px;min-width:120px;padding:0 8px;right:70px}.site-header .logo img[data-v-34f81b0d]{max-width:90px}.site-header .header-menu .navbar-collapse[data-v-34f81b0d]{margin-top:0}.site-header nav[data-v-34f81b0d]{margin-right:0}}@media(min-width:992px) and (max-width:1550px){.site-header .header-menu ul li[data-v-34f81b0d]{margin:0 10px}.site-header .header-logo[data-v-34f81b0d]{flex:0 0 20%;max-width:20%}.site-header .header-menu[data-v-34f81b0d]{flex:0 0 80%;max-width:80%}}@media (min-width:1300px) and (max-width:1550px){.site-header .header-menu ul li[data-v-34f81b0d]{margin:0 20px}}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=603.mjs.map
