<template>
  <div>
    <!-- <nuxt-img height="800" src="feature/test2.png" /> -->
    <NuxtLayout>
  <!-- <nuxt-img height="800" quality="" :src="imgurl" format="webp" /> -->
  <!-- {{ counter}} -->
    <NuxtPage />
  </NuxtLayout>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from  'vue'

const imgurl = ref("https://firebasestorage.googleapis.com/v0/b/colivhq-backend.appspot.com/o/pictures%2F3bb3b25e-83af-4cf6-b2be-27a1cd39968cPiccola.jpg_v3?alt=media&token=11c9692c-9260-4f84-a480-6f6cbfb657e7")
const {data, refresh } = await useFetch('/api/ls', {method: 'GET'});
// return {
//   imgurl
// }



</script>

