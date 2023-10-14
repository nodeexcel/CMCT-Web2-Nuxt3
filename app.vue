
<template>
 
  <!-- <nuxt-img  />
  <div style="width: 10px;height: 10px;"></div> -->
 <NuxtLayout>
  
  <!-- {{ counter}} -->
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
const page = ref(1)
// const pag = ref(null)

// const { data: cafes, error } = await useAsyncData(
//   'cafes',
//   () => $fetch( `/api/v1/cafes`, {
//     method: 'GET',
//     baseURL: 'https://api.roastandbrew.coffee',
//     params: {
//       page: page.value,
//       search: search.value,
//     }
//   } ), {
//     watch: [
//       page,
//       search
//     ]
//   }
// );

const { data } = await useAsyncData(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const page = 2
  const page2 = 2
  return {
    pag:page,
    page2:page2
  }
})
// const { data: vehicle, data2: vehicle2, pending } = await useAsyncData(
//   "vehicle",
//   () => page,
//   "vehicle2"
//   () => page2,
// );
</script>

<script>

import { mapActions, mapState } from 'vuex'
export default {
  methods: {
    // ...mapActions(['markdata', 'eliminardata','setdata']),
    ...mapActions(['increment']),
  },
    computed:{
            ...mapState(['counter']),
            
        },
  mounted(){
    console.log("increment",this.increment())
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
</style>
