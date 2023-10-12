import { Carousel, Slide } from 'vue3-carousel';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('carousel', Carousel);
    nuxtApp.vueApp.component('slide', Slide);
})