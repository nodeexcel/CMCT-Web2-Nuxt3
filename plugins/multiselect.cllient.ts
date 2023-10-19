import __vue_component__  from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('VueMultiselect', __vue_component__);
})