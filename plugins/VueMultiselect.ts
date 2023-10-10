
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueMultiselect',VueMultiselect);
})
