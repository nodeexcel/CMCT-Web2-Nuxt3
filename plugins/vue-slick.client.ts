 import {  VueSlickCarousel }  from 'vue-slick-ts' 

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('VueSlickCarousel',VueSlickCarousel);
})
