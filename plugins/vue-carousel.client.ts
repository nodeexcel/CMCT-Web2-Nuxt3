import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('carousel', Carousel);
    nuxtApp.vueApp.component('slide', Slide);
})