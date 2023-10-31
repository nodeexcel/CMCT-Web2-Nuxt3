<template>
  <section :class="[isNormalLink ? 'custom-page-main' : '']">
    <!-- Slices block component -->
    <!-- {{ asyncData }} -->
    <SlicesBlock :slices="slices" :banner="banner" :page-id="pageId" :isMapOnPage="isMapOnPage"/>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { client } from '~/prismic/prismic'
import { useStore } from 'vuex'
// definePageMeta({
// 	layout: "homepage",
// });

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
      const query = {}
     query.byRooms = ""
     Router.push({ path: router.path ,
        query})
	  }

      
	
    if(store.state.faq_topic !== null){
      store.state.faq_topic.forEach((item) =>{
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
          store.commit('SET_FAQ', Data);
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
        slices.value = Response.data.page_content;
        data.value = Response.data;
        pageId.value = router.params.uid;
		    isMapOnPage.value= isMapOnPage.value;
        //SEO
        meta_title.value= (Response.data.meta_title.length) ? Response.data.meta_title[0].text : '';
        meta_description.value= (Response.data.meta_description.length) ? Response.data.meta_description[0].text : '';
        meta_image.value= (Response.data.meta_image.url) ? Response.data.meta_image.url : '';
        meta_url.value= envVars.public.env.BASE_URL+'/page/'+ router.params.uid;
        meta_site_name.value= envVars.public.env.COMPANY_NAME
        return {
				slices,meta_title
		}
      // }
      })
    } catch (e) {
      // Returns error page
    console.log('Error', e)
      error({ statusCode: 404, message: 'Page not found' })
    }

	 })
    // definePageMeta({
    // title: `Page Title - ${title}`,
    //   })
	 useHead({
		    title: meta_title.value,
			htmlAttrs: {
				lang: 'en'
			},
			
			

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