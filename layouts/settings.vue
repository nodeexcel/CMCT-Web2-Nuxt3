<!-- <template>
    <div>
      <slot />
    </div>
  </template> -->

  <template>
    <div>
        <NuxtLayout name="default">
      <!-- <header> -->
          <!-- <div class="header-wrap"> -->
            <HeaderPrismic/>
          <!-- </div> -->
      <!-- </header> -->
      <main class="container my-12">
      <slot />
    </main>
      <!-- <nuxt /> -->
      <FooterPrismic/>
     </NuxtLayout>
    </div>
  </template>

  <script setup>
  // Check if we're on the client side before accessing window
  if (process.client) {
    // window.prismic = {
    //   endpoint: 'https://colivhq.cdn.prismic.io/api/v2'
    // };
  }
  </script>
  <script>
//   import HeaderPrismic from '~/components/HeaderPrismic.vue'
//   import FooterPrismic from '~/components/FooterPrismic.vue'
  
  export default {
    // components: {
    //   HeaderPrismic,
    //   FooterPrismic
    // },
    head () {
      return {
        title: 'Casa Mia Coliving Website',
      }
    },
    // Called before rendering the layout (even for error page)
  /*   async middleware({ store, $prismic }) {
      await store.dispatch('fetchMenu', $prismic)
    } */
  }
  </script>