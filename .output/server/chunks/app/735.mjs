const id = 735;
const ids = [735];
const modules = {

/***/ 8823:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ client)
/* harmony export */ });
/* harmony import */ var _prismicio_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4582);


const createPrismicClient = (accessToken) => {
  return (0, _prismicio_client__WEBPACK_IMPORTED_MODULE_0__.createClient)("https://cmct-web.cdn.prismic.io/api/v2", {
    accessToken
  });
};
const client = createPrismicClient("MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA");



/***/ }),

/***/ 2735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ findahome)
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);


function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({ class: "content-page findahome" }, _attrs))} data-v-7a7b77ac><div class="slider-cms" data-v-7a7b77ac>`);
  if ($data.pending) {
    _push(`<div class="loader" data-v-7a7b77ac></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></section>`);
}

// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/index.js + 5 modules
var app = __webpack_require__(6889);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(9648);
// EXTERNAL MODULE: ./prismic/prismic.js
var prismic = __webpack_require__(8823);



/* harmony default export */ const findahomevue_type_script_lang_js = ({
  name: "findahome",
  layout: "homepage",
  props: ["defaultFilter"],
  // components: {
  // 	SlicesBlock,
  // 	BuildingCardSlice
  // },
  data() {
    return {
      homeLists: [],
      pending: true,
      slices: null
    };
  },
  head() {
    return {
      title: this.meta_title,
      htmlAttrs: {
        lang: "en"
      },
      link: [
        { rel: "canonical", href: this.meta_url }
      ],
      script: [
        { type: "application/ld+json", json: this.homeListLd }
      ],
      meta: [
        { hid: "author", name: "author", content: this.meta_author },
        { hid: "description", name: "description", content: this.meta_description },
        {
          hid: "ogtitle",
          property: "og:title",
          content: this.meta_title
        },
        {
          hid: "ogdescription",
          property: "og:description",
          content: this.meta_description
        },
        {
          hid: "ogimage",
          property: "og:image",
          content: this.meta_image
        },
        {
          hid: "ogurl",
          property: "og:url",
          content: this.meta_url
        },
        {
          hid: "ogtype",
          property: "og:type",
          content: "Website"
        },
        {
          hid: "ogsite_name",
          property: "og:site_name",
          content: this.meta_site_name
        },
        {
          hid: "twittertitle",
          name: "twitter:title",
          content: this.meta_title
        },
        {
          hid: "twitterdescription",
          name: "twitter:description",
          content: this.meta_description
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary"
        },
        {
          hid: "twitterimage",
          name: "twitter:image",
          content: this.meta_image
        }
      ]
    };
  },
  async asyncData({ $prismic, params, error, store, defaultFilter, $axios }) {
  },
  async mounted() {
    let envVars = (0, app/* useRuntimeConfig */.BE)();
    console.log("envVars", envVars, this.$prismic);
    const appartments = external_axios_["default"].post(envVars.public.env.MODE === "prod" ? envVars.public.env.PROD_END_POINT : envVars.public.env.DEV_END_POINT, {
      //"operatorId": "HaF6mb19L6AzWVavPr5t",
      "neighborhoodId": "",
      "cityId": this.defaultFilter != void 0 && this.defaultFilter.cityId != void 0 ? this.defaultFilter.cityId : ""
    }, {
      headers: {
        Authorization: envVars.public.env.MODE === "prod" ? "Bearer " + envVars.public.env.PROD_COLIV_HQ_KEY : "Bearer " + envVars.public.env.DEV_COLIV_HQ_KEY
      }
    });
    console.log("appartments", appartments);
    console.log("response", prismic/* client */.L.getByUID("page", "blog"), prismic/* client */.L.getFirst("page", "findyourhome"));
    prismic/* client */.L.getFirst("page", "findyourhome").then((result) => {
      console.log(result.data.page_content);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchOnServer: false
});
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unctx%3Atransform!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Acomponents%3Aimports!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aremove-plugin-metadata!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aclient-fallback-auto-id!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aserver-devonly%3Atransform!./pages/findahome/index.vue?vue&type=style&index=0&id=7a7b77ac&scoped=true&lang=css
__webpack_require__(833);

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6058);


const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(findahomevue_type_script_lang_js, [['ssrRender',ssrRender],['__scopeId',"data-v-7a7b77ac"]]);

/* harmony default export */ const findahome = (__exports__);

/***/ }),

/***/ 833:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(7086);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2112);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.findahome[data-v-7a7b77ac] .form-cms-build{background-color:#fff!important;padding:0}.content-page[data-v-7a7b77ac]{padding-bottom:0;padding-top:50px!important}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=735.mjs.map
