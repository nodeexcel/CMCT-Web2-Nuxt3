const id = 526;
const ids = [526];
const modules = {

/***/ 9526:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Icon)
});

// EXTERNAL MODULE: ./node_modules/nuxt/dist/app/index.js + 5 modules
var app = __webpack_require__(6889);
// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(6609);
// EXTERNAL MODULE: external "vue/server-renderer"
var server_renderer_ = __webpack_require__(9344);
// EXTERNAL MODULE: external "@iconify/vue/dist/offline"
var offline_ = __webpack_require__(9821);
// EXTERNAL MODULE: external "@iconify/vue"
var vue_ = __webpack_require__(779);







/* harmony default export */ const Iconvue_type_script_setup_true_lang_ts = (/* @__PURE__ */(0, external_vue_.defineComponent)({
  __name: "Icon",
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
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const nuxtApp = (0, app/* useNuxtApp */.e)();
    const appConfig = (0, app/* useAppConfig */.MG)();
    const state = (0, app/* useState */.eJ)("icons", () => ({}));
    const isFetching = (0, external_vue_.ref)(false);
    const iconName = (0, external_vue_.computed)(() => ((appConfig.nuxtIcon?.aliases || {})[props.name] || props.name).replace(/^i-/, ""));
    const icon = (0, external_vue_.computed)(() => state.value?.[iconName.value]);
    const component = (0, external_vue_.computed)(() => nuxtApp.vueApp.component(iconName.value));
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
    const className = (0, external_vue_.computed)(() => appConfig?.nuxtIcon?.class ?? "icon");
    async function loadIconComponent() {
      if (component.value) {
        return;
      }
      if (!state.value?.[iconName.value]) {
        isFetching.value = true;
        state.value[iconName.value] = await (0, vue_.loadIcon)(iconName.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    (0, external_vue_.watch)(() => iconName.value, loadIconComponent);
    !component.value && ([__temp, __restore] = (0, external_vue_.withAsyncContext)(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (isFetching.value) {
        _push(`<span${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({
          class: className.value,
          style: { width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-ce64b98e></span>`);
      } else if (icon.value) {
        _push((0, server_renderer_.ssrRenderComponent)((0, external_vue_.unref)(offline_.Icon), (0, external_vue_.mergeProps)({
          icon: icon.value,
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null, _parent));
      } else if (component.value) {
        (0, server_renderer_.ssrRenderVNode)(_push, (0, external_vue_.createVNode)((0, external_vue_.resolveDynamicComponent)(component.value), (0, external_vue_.mergeProps)({
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null), _parent);
      } else {
        _push(`<span${(0, server_renderer_.ssrRenderAttrs)((0, external_vue_.mergeProps)({
          class: className.value,
          style: { fontSize: sSize.value, lineHeight: sSize.value, width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-ce64b98e>`);
        (0, server_renderer_.ssrRenderSlot)(_ctx.$slots, "default", {}, () => {
          _push(`${(0, server_renderer_.ssrInterpolate)(__props.name)}`);
        }, _push, _parent, "data-v-ce64b98e-s");
        _push(`</span>`);
      }
    };
  }
}));
 
// EXTERNAL MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Adynamic-base-path!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=unctx%3Atransform!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Atree-shake-template!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Acomponents%3Aimports!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aremove-plugin-metadata!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-38.use[0]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-38.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aclient-fallback-auto-id!./node_modules/unplugin/dist/webpack/loaders/transform.js?unpluginName=nuxt%3Aserver-devonly%3Atransform!./node_modules/nuxt-icon/dist/runtime/Icon.vue?vue&type=style&index=0&id=ce64b98e&scoped=true&lang=css
__webpack_require__(3205);

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6058);


const __exports__ = /*#__PURE__*/(0, exportHelper/* default */.Z)(Iconvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-ce64b98e"]]);

/* harmony default export */ const Icon = (__exports__);

/***/ }),

/***/ 3205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(7086);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(2112);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.icon[data-v-ce64b98e]{display:inline-block;vertical-align:middle}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};

export { id, ids, modules };
//# sourceMappingURL=526.mjs.map
