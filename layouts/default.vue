<template>
  <div>
    <div class="header-wrap">
      <HeaderPrismic/>
    </div>
    <slot />
    <FooterPrismic/>
  </div>
</template>
 <script setup>
 import { ref } from 'vue'
 // Check if we're on the client side before accessing window
 if (process.client) {
   window.prismic = {
     endpoint: 'https://colivhq.cdn.prismic.io/api/v2'
   };
 }
 const title = ref('Casa Mia Coliving Website')
 useHead({
      title
})
 </script>