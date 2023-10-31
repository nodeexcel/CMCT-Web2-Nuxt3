<template>
    <section>
      <!-- Slices block component -->
      <div class="blog-listing">
        <!-- {{ slices }} -->
          <SlicesBlock :slices="slices"/>
      </div>
    </section>
  </template>

<script setup>
import {computed, onMounted } from 'vue';
import { client } from '~/prismic/prismic'
// definePageMeta({
//   layout: "homepage",
// });

              
			   // Set slices as variable
			  let  slices = ref(null) 
              let document = ref(null)

		        //SEO
				
			  let  meta_title = ref('') 
			  let meta_description = ref(null)
			  let meta_keywords = ref(null) 
			  let meta_image = ref(null)
			  let  meta_site_name = ref(null) 
			  let  meta_url = ref(null) 

			    //   let structuredData 

			   


			

      onMounted( async () => {
		
					// let headingArray = document.getElementsByTagName('h2')
					// 	let headingThreeArray = document.getElementsByTagName('h3')
					// 	if (headingArray && headingArray.length) {
					// 		for (let index = 0; index < headingArray.length; index++) {
					// 			let str = headingArray[index].textContent.split(" ").join("")
					// 			headingArray[index].setAttribute("id", str);
					// 		}
					// 	}
					// 	if (headingThreeArray && headingThreeArray.length) {
					// 		for (let index = 0; index < headingThreeArray.length; index++) {
					// 			let str = headingThreeArray[index].textContent.split(" ").join("")
					// 			headingThreeArray[index].setAttribute("id", str);
					// 		}
					// 	}
					
				    })

                    
      const { data } = await useAsyncData(async () => {
        const envVars = useRuntimeConfig()
        client.getByUID('page', 'blog').then((result) => {
            var Doc = result.data
        //   letdocument = result.data
        //   let document= document,
              // Set slices as variable
              slices.value = result.data.page_content
              
              //SEO
              document.value = Doc
              meta_title.value = (result.data.meta_title.length) ? result.data.meta_title[0].text : ''
              meta_description.value= (result.data.meta_description.length) ? result.data.meta_description[0].text : ''
              meta_image.value = (result.data.meta_image.url) ? result.data.meta_image.url : ''
              meta_url.value = envVars.public.env.BASE_URL + '/blog'
              meta_site_name.value = envVars.public.env.COMPANY_NAME
			return {
				slices,meta_title
		}
      })
        
	   
     })
	useHead({
		    title: meta_title.value,
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{ rel: 'canonical', href: meta_url.value },
			],
			meta: [
				{ hid: 'keywords', name: 'keywords', content: meta_keywords.value },
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
  
