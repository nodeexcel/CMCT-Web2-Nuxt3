<template>
  <section :class="[isNormalLink ? 'custom-page-main' : '']">
    <!-- Slices block component -->
    <!-- {{ slice }} -->
    <SlicesBlock :slices="slices" :banner="banner" :page-id="pageId" :isMapOnPage="isMapOnPage"/>
  </section>
</template>

<script>
// Imports for Prismic Slice components
// import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'page',
  layout: 'homepage',
  // components: {
  //   SlicesBlock
  // },
  data() {
	  return {
      isFormSlice: false,
      isNormalLink: false,
      banner:{},
      slices: null,
        data: null,
        pageId : null,
		    isMapOnPage: false,
        //SEO
        meta_title:null,
        meta_description: null,
        meta_image: null,
        meta_url: null,
        meta_site_name: null,
	  }
  },
  head () {
    return {
      title: this.meta_title,
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'canonical', href: this.meta_url },
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
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
          content: 'Website'
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
      ],
    }
  },
  async asyncData({ $prismic, params, error,store }) {
    console.log("params",params)
    
  },
  created () {
	let query_param = this.$route.query;
  console.log("this.slices",this.slices)
    // const isForm = this.slices.filter(function(slice) {                
    //   if(slice.slice_type == 'form') {
    //     return slice;
    //   } else if(slice.slice_type == 'listing') {
		// Object.assign(slice.primary, {query_param: query_param});
    //   }
    // });
    // if(isForm.length >= 1) {
    //   this.isFormSlice = true;
    // }
    if(this.$route.params.uid == 'privacy' || this.$route.params.uid == 'termsofservice') {
      this.isNormalLink = true;
    }
	  if((Object.keys(this.$route.query).length == 0 || !this.$route.fullPath.includes("?byHomes")) && this.$route.path == '/page/singapore'){
		this.$router.push({path: '/page/'+'singapore'+'?byRooms='})
	  }
  },
  mounted(){
    // const route = useRoute();
    // console.log("document",this.$route.params)
    //  this.$prismic.client.getByUID('page', this.$route.params.uid).then((Response) =>{
    //     var document = Response.data
    //     console.log("document",document)
    // })
    // console.log()


    try{
      // Query to get post content
      this.$prismic.client.getByUID('page', this.$route.params.uid).then((Response) =>{
        var document = Response.data
        console.log("document",document)
        this.isMapOnPage = false;
      const isMap =  document.page_content.filter(function(slice) {                
        if(slice.slice_type == 'listing' || slice.slice_type == 'listing1') {
          if(slice.primary.map === true) {
            return true;
          }
        }
      });

      // in store set faq_topics
      var data = [];
      document.page_content.filter(function(slice) {                
        if(slice.slice_type == 'faq_topic') {
            data.push(slice);
        }
      });
      if(data.length>0){
          store.commit('SET_FAQ', data);
      }


		if(isMap.length >= 1) {
			this.isMapOnPage = true;
		}
      // return {
        // Page content
       var hero_image = document.hero_image;
          var title = document.page_title;
         var tagline= document.page_description
         var  title_color= document.title_color
         var	text_color= document.text_color
         var half_page= document.half_page
         var divider_and_button_color= document.divider_and_button_color

        this.banner = {
           hero_image,
           title ,
          tagline,
           title_color,
         	text_color,
          half_page,
          divider_and_button_color
        },
        // Set slices as variable
        this.slices = document.page_content;
        console.log(this.slices)
        this.data= document;
        this.pageId = this.$route.params.uid;
		    this.isMapOnPage= this.isMapOnPage;
        //SEO
        this.meta_title= (document.meta_title.length) ? document.meta_title[0].text : '';
        this.meta_description= (document.meta_description.length) ? document.meta_description[0].text : '';
        this.meta_image= (document.meta_image.url) ? document.meta_image.url : '';
        this.meta_url= process.env.baseUrl+'/page/'+ this.$route.params.uid;
        this.meta_site_name= process.env.COMPANY_NAME
        console.log("document",document)
      // }
      })
    } catch (e) {
      // Returns error page
    console.log('Error', e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
<style>
.custom-page-main .text-slice-cms .details p a {
  background-color: transparent;
  color: #72bf44;
  padding: 0!important;
  margin: 0;
}
.custom-page-main .text-slice-cms .details p a:hover {
  color: #000;
}
/* Darshana - 16/10/2020 */
.toggle-map-button {
    min-width: 225px;
    color: #fff;
    background-color: #77bf45;
    border-color: #77bf45;
}
@media(max-width: 1199px) {
  .slider-cms .slicer-image-half .silder-content.no-findyourhome {
    bottom: 80px;
  }
}
@media(max-width: 991px) {
  .slider-cms .slicer-image-half .silder-content.no-findyourhome {
    bottom: 40px;
  }
}
@media(max-width: 767px) {
  .slider-cms .slicer-image-half .silder-content.no-findyourhome {
    bottom: 0;
  }
  .slider-cms .slider-outer {
    margin-bottom: 0!important;
  }
  .sticky-toggle-map-button {
    top: 74px!important;
    color: #fff!important;
    background-color: #77bf45;
    border-color: #77bf45;

  }
}
.welcome-banner-section .homepage-banner .description p {
  font-weight: normal !important;
}
</style>