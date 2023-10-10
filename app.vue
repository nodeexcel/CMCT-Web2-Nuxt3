
<template>
 <NuxtLayout>
  <!-- {{ counter}} -->
    <NuxtPage />
  </NuxtLayout>
</template>
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
