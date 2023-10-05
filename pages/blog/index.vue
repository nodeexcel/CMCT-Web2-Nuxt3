<template>
    <section>
      <!-- Slices block component -->
      <div class="blog-listing">
        <!-- {{ slices }} -->
          <SlicesBlock :slices="slices"/>
      </div>
    </section>
  </template>
  
  <script>
  // Imports for Prismic Slice components
  import {client} from '~/prismic/prismic';
//   import SlicesBlock from '~/components/SlicesBlock.vue'
  
  export default {
    data(){
        return{
            document :null,
            slices: []
        }
    },
    //   name: 'blog',
    //   layout: 'homepage',
    //   components: {
    //       SlicesBlock
    //   },
      head () {
          return {
              title: this.meta_title,
              htmlAttrs: {
                  lang: 'en'
              },
              link: [
                  { rel: 'canonical', href: this.meta_url },
              ],
              meta: [
                  { hid: 'author', name: 'author', content: this.meta_author },
                  { hid: 'description', name: 'description', content: this.meta_description },
                  {
                      hid: 'ogtitle',
                      property: 'og:title',
                      content: this.meta_title
                  },
                  {
                      hid: 'ogdescription',
                      property: 'og:description',
                      content: this.meta_description
                  },
                  {
                      hid: 'ogimage',
                      property: 'og:image',
                      content: this.meta_image
                  },
                  {
                      hid: 'ogurl',
                      property: 'og:url',
                      content: this.meta_url
                  },
                  {
                      hid: 'ogtype',
                      property: 'og:type',
                      content: 'article'
                  },
                  {
                      hid: 'ogsite_name',
                      property: 'og:site_name',
                      content: this.meta_site_name
                  },
                  {
                      hid: 'twittertitle',
                      name: 'twitter:title',
                      content: this.meta_title
                  },
                  {
                      hid: 'twitterdescription',
                      name: 'twitter:description',
                      content: this.meta_description
                  },
                  {
                      hid: 'twitter:card',
                      name: 'twitter:card',
                      content: 'summary'
                  },
                  {
                      hid: 'twitterimage',
                      name: 'twitter:image',
                      content: this.meta_image
                  },
              ]
          }
    },
    async asyncData({ $prismic, params, error }) {
      try{
        // Query to get post content
          (await client.getByUID('page', 'blog')).then((result) => {
          var document = result.data
          
          slices = document.page_content,
          console.log("menu", slices)
          return {
              document: document,
              // Set slices as variable
              slices: document.page_content,
              
              //SEO
              meta_title:  document.meta_title[0].text ,
              meta_description: (document.meta_description.length) ? document.meta_description[0].text : '',
              meta_image: (document.meta_image.url) ? document.meta_image.url : '',
              meta_url: process.env.baseUrl + '/blog',
              meta_site_name: process.env.COMPANY_NAME
          }
          }).catch((error) => {
          console.error(error);
          });
          // const menu = this.$store
         


        //   const document = (await $prismic.api.getByUID('page', 'blog')).data
        //   //const document = (await $prismic.api.query($prismic.predicates.at('document.type', 'blogpage'))).results
        //     return {
        //       document: document,
        //       // Set slices as variable
        //       slices: document.page_content,
              
        //       //SEO
        //       meta_title: (document.meta_title.length) ? document.meta_title[0].text : '',
        //       meta_description: (document.meta_description.length) ? document.meta_description[0].text : '',
        //       meta_image: (document.meta_image.url) ? document.meta_image.url : '',
        //       meta_url: process.env.baseUrl + '/blog',
        //       meta_site_name: process.env.COMPANY_NAME
        //   }
      } catch (e) {
          // Returns error page
          console.log(e)
          error({ statusCode: 404, message: 'Page not found' })
      }
    },
      created () {
        //   const isForm = this.slices.filter(function(slice) {                
        //       if(slice.slice_type == 'blog_cards') {
        //           Object.assign(slice, {type:'blog_listing'});
        //       }
        //       return slice;
        //   });
      },
      
      mounted(){
        console.log("blog_content",this.$prismic.client.get(this.$prismic.filter.at('document.type', 'blogpage')))
        client.getByUID('page', 'blog').then((result) => {
        //   letdocument = result.data
        //   let document= document,
              // Set slices as variable
              this.slices = result.data.page_content
              
              //SEO
              meta_title = (document.meta_title.length) ? document.meta_title[0].text : ''
              meta_description= (document.meta_description.length) ? document.meta_description[0].text : ''
              meta_image = (document.meta_image.url) ? document.meta_image.url : ''
              meta_url = process.env.baseUrl + '/blog'
              meta_site_name = process.env.COMPANY_NAME
            console.log("hh", client.getByUID('page', 'blog'),this.slices )
      })
        
      }
  }
  </script>
  <style>
  .blog-listing {
      margin-top: 150px;
  }
  @media (max-width: 767px) { 
      .blog-listing {
          margin-top: 0px;
      }
  }


  /* .then((result) => {
          let document = result
          }).catch((error) => {
          console.error(error);
          }); */
  </style>