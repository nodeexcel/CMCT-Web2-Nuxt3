<template>
  <section :class="[isNormalLink ? 'custom-page-main' : '']">
    <!-- Slices block component -->
    <SlicesBlock :slices="slices" :banner="banner" :page-id="pageId" :isMapOnPage="isMapOnPage"/>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { client } from '~/prismic/prismic'
import { useStore } from 'vuex'

let slices = ref([])
let isFormSlice =ref(false) 
let  isNormalLink = ref(false)
let  banner =ref({})
let  data = ref(null) 
let  pageId  =ref(null) 
let		    isMapOnPage =ref(false) 
        //SEO
let  meta_title =ref(null)
let  meta_description =ref(null) 
let  meta_image =ref(null) 
let  meta_url =ref(null) 
let  meta_site_name =ref(null) 


  
				//SEO

    // expose to template and other options API hooks
    onMounted( async () => {
      const router = useRoute()
    const Router = useRouter()
    const store = useStore()

    if((Object.keys(router.query).length == 0 || !router.fullPath.includes("?byHomes")) && router.path == '/page/singapore'){
      console.log("yes")
      const query = {}
     query.byRooms = ""
     Router.push({ path: router.path ,
        query})
	  }
      
	
    if(store.state.faq_topic !== null){
      store.state.faq_topic.forEach((item) =>{
      console.log("item",item)
      if(router.fullPath.includes(item.primary.title[0].text)){
        var id = (item.primary.title[0].text).replace(/ /g,'')
        id = ('#'+id).split('#').join('')
        Router.push({ path: router.path,
        query: {'#': id}})
      }
    })
  }
    // console.log(" homeDetails.data", homeDetails.value      console.log("123",client, client.getSingle("homes"))
     }); 

	 const { asyncData } = await useAsyncData(async () => {
    const router = useRoute()
    const Router = useRouter()

    let query_param = router.query;
      
    const isForm = slices.value.filter(function(slice) {                
      if(slice.slice_type == 'form') {
        return slice;
      } else if(slice.slice_type == 'listing') {
		Object.assign(slice.primary, {query_param: query_param});
      }
    });
    if(isForm.length >= 1) {
      isFormSlice.value = true;
    }
    if(router.params.uid  == 'privacy' || router.params.uid == 'termsofservice') {
      isNormalLink.value = true;
    }

    if((Object.keys(router.query).length == 0 || !router.fullPath.includes("?byHomes")) && router.path == '/page/singapore'){
      console.log("yes")
      const query = {}
     query.byRooms = ""
     Router.push({ path: router.path ,
        query})
	  }

	  const store = useStore()
    // const router = useRoute()
    const envVars = useRuntimeConfig();

    try{
      // Query to get post content
      client.getByUID('page', router.params.uid).then((Response) =>{
        var document = Response.data
        console.log("document",document)
        isMapOnPage.value = false;
      const isMap =  document.page_content.filter(function(slice) {                
        if(slice.slice_type == 'listing' || slice.slice_type == 'listing1') {
          if(slice.primary.map === true) {
            return true;
          }
        }
      });

      // in store set faq_topics
      // const store = useStore()
     
      var Data = [];
      document.page_content.filter(function(slice) {                
        if(slice.slice_type == 'faq_topic') {
          Data.push(slice);
        }
      });
      if(Data.length>0){
          console.log("data",Data)
          store.commit('SET_FAQ', Data);
          console.log("this.$store",store)
      }


		if(isMap.length >= 1) {
			isMapOnPage.value = true;
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

        banner.value = {
           hero_image,
           title ,
          tagline,
           title_color,
         	text_color,
          half_page,
          divider_and_button_color
        },
        // Set slices as variable
        slices.value = document.page_content;
        data.value = document;
        pageId.value = router.params.uid;
		    isMapOnPage.value= isMapOnPage.value;
        //SEO
        meta_title.value= (document.meta_title.length) ? document.meta_title[0].text : '';
        meta_description.value= (document.meta_description.length) ? document.meta_description[0].text : '';
        meta_image.value= (document.meta_image.url) ? document.meta_image.url : '';
        meta_url.value= process.env.baseUrl+'/page/'+ router.params.uid;
        meta_site_name.value= process.env.COMPANY_NAME
        console.log("document",document)
      // }
      })
    } catch (e) {
      // Returns error page
    console.log('Error', e)
      error({ statusCode: 404, message: 'Page not found' })
    }

	 })
	 useHead({
		    title: 'Casa Mia Coliving Blog Post'+"-"+meta_title.value,
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{ rel: 'canonical', href: meta_url.value },
			],
			meta: [
			{ hid: 'description', name: 'description', content: meta_description.value },
			{
			hid: 'ogtitle',
			property: 'og:title',
			content: meta_title.value
			},
			{
			hid: 'ogdescription',
			property: 'og:description',
			content: meta_description.value
			},
			{
			hid: 'ogimage',
			property: 'og:image',
			content: meta_image.value
			},
			{
			hid: 'ogurl',
			property: 'og:url',
			content: meta_url.value
			},
			{
			hid: 'ogtype',
			property: 'og:type',
			content: 'Website'
			},
			{
			hid: 'ogsite_name',
			property: 'og:site_name',
			content: meta_site_name.value
			},
			{
			hid: 'twittertitle',
			name: 'twitter:title',
			content: meta_title.value
			},
			{
			hid: 'twitterdescription',
			name: 'twitter:description',
			content: meta_description.value
			},
			{
			hid: 'twitter:card',
			name: 'twitter:card',
			content: 'summary'
			},
			{
			hid: 'twitterimage',
			name: 'twitter:image',
			content: meta_image.value
			},
		],

    }) 
</script>

<style scoped>
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