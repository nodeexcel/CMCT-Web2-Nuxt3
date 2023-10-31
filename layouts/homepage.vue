<template>
    <NuxtLayout name="default">
           
            <div  class="content-wrap" style="min-height: 700px;margin-top:10px">
                <slot />
            </div>
    </NuxtLayout>
</template>


<script setup>
import { ref } from 'vue'
// Check if we're on the client side before accessing window
if (process.client) {
  window.prismic = {
    endpoint: 'https://colivhq.cdn.prismic.io/api/v2'
  };
}
const props = defineProps({
error: Object,
required: true,
});
// const {data} = useAsyncTest()
// const { data, pending } = useAsyncData(async () => {
//   await new Promise((resolve) => setTimeout(resolve, 2000))
//   return 42
// })

const handleError = () => clearError({ redirect: '/' });
const title = ref('Home Details - Casa Mia Coliving')
useHead({
     title:title.value
})
</script>

  <!-- <script>
  
  export default {
  
    head () {
      return {
        title: 'Home Details - Casa Mia Coliving',
      }
    },
    created() {
      //if(location.href.includes("?")) {
        if (process.browser) {
          this.$cookies.set("link_source", location.href);
        }
      //}
    },
    // Called before rendering the layout (even for error page)
    async middleware({ store, $prismic }) {
      await store.dispatch('fetchMenu', $prismic)
    }
  }
  </script> -->