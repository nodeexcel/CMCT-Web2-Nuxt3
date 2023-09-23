<template>
  <div class="homepage">
    123
    <header-prismic/>
    <div class="content-wrap">
      <nuxt />
    </div>
    <footer-prismic/>
  </div>
</template>
  
  <script>
//   import HeaderPrismic from '~/components/HeaderPrismic.vue'
//   import FooterPrismic from '~/components/FooterPrismic.vue'
  
  export default {
    // components: {
    //   HeaderPrismic,
    //   FooterPrismic
    // },
    // head () {
    //   return {
    //     title: 'Home Details - Casa Mia Coliving',
    //   }
    // },
    // created() {
    //   //if(location.href.includes("?")) {
    //     if (process.browser) {
    //       this.$cookies.set("link_source", location.href);
    //     }
    //   //}
    // },
    // // Called before rendering the layout (even for error page)
    // async middleware({ store, $prismic }) {
    //   await store.dispatch('fetchMenu', $prismic)
    // }
  }
  </script>
  