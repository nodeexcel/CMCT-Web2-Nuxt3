const id = 43;
const ids = [43];
const modules = {

/***/ 5043:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ IconCSS)
});

// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/index.js + 5 modules
var app = __webpack_require__(6889);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);





/* harmony default export */ const IconCSSvue_type_script_setup_true_lang_ts = (/* @__PURE__ */(0, external_vue_.defineComponent)({
  __name: "IconCSS",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const appConfig = (0, app/* useAppConfig */.MG)();
    const iconName = (0, external_vue_.computed)(() => ((appConfig.nuxtIcon?.aliases || {})[props.name] || props.name).replace(/^i-/, ""));
    const iconUrl = (0, external_vue_.computed)(() => `url('https://api.iconify.design/${iconName.value.replace(":", "/")}.svg')`);
    const sSize = (0, external_vue_.computed)(() => {
      if (!props.size && typeof appConfig.nuxtIcon?.size === "boolean" && !appConfig.nuxtIcon?.size) {
        return void 0;
      }
      const size = props.size || appConfig.nuxtIcon?.size || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--6e345576": iconUrl.value
      } };
      _push(`<span${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({
        style: { width: sSize.value, height: sSize.value }
      }, _attrs, _cssVars))} data-v-9304ba4a></span>`);
    };
  }
}));
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unctx%3Atransform!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Acomponents%3Aimports!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aremove-plugin-metadata!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aclient-fallback-auto-id!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aserver-devonly%3Atransform!./node_modules/nuxt-icon/dist/runtime/IconCSS.vue?vue&type=style&index=0&id=9304ba4a&scoped=true&lang=css
__webpack_require__(7591);

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6058);


const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(IconCSSvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-9304ba4a"]]);

/* harmony default export */ const IconCSS = (__exports__);

/***/ }),

/***/ 7591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(7086);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2112);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `span[data-v-9304ba4a]{background-color:currentColor;display:inline-block;-webkit-mask-image:var(--6e345576);mask-image:var(--6e345576);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;vertical-align:middle}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=43.mjs.map
