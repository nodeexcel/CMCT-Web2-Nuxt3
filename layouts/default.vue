<template>
  <div>
    <div class="header-wrap" style="min-height: 90px;">
      <HeaderPrismic/>
    </div>
    <div class="content-wrap" style="min-height: 700px;margin-top:10px">
        <slot />
    </div>
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
 