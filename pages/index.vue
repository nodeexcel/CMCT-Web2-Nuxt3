<template>
	<section>
		<SlicesBlock :slices="slices"/>
	</section>
</template>

<script setup>
import { onMounted } from 'vue';
import { client } from '~/prismic/prismic'
import { useStore } from 'vuex'
// definePageMeta({
//   layout: "homepage",
// });

    let slices = ref([])
				//SEO
	let meta_title = ref()
	let meta_description = ref("null")
	let meta_image = ref("null") 
	let meta_url = ref("null") 
	let meta_site_name = ref("null") 

    // expose to template and other options API hooks
    onMounted( async () => {
    // console.log(" homeDetails.data", homeDetails.value      console.log("123",client, client.getSingle("homes"))
     }); 

	 const { data } = await useAsyncData(async () => {
	const store = useStore()
    const router = useRoute()
    const envVars = useRuntimeConfig();

	try{
			// Query to get the home page content
			    await client.getByUID('page', 'home').then((response)=>{
                const homepage = response.data
                slices.value= homepage.page_content

				meta_title.value= (homepage.meta_title.length && homepage.meta_title[0]) ? homepage.meta_title[0].text : ''
				meta_description.value= (homepage.meta_description.length && homepage.meta_description[0].text != null) ?
					homepage.meta_description[0].text.length > 170 ?
					homepage.meta_description[0].text.substring(0, 167) + '...' :
					homepage.meta_description[0].text : ''
				meta_image.value= (homepage.meta_image.url) ? homepage.meta_image.url : ''
				meta_url.value= (homepage.meta_url) ? homepage.meta_url.url : ''
				meta_site_name.value= process.env.COMPANY_NAME
				console.log("slices",slices)

				

            })
		} catch (e) {
			console.log('EE: ' ,e)
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
.slider-cms img {
		width: auto;
}
.slider-cms .slicer-image-main {
	text-align: right;
	top: 235px;
	position: relative;
}
@media (min-width: 992px) {
	.slider-cms .silder-content.inner-content-wrapper {
		margin: 0 950px 0 auto;
	}
}
@media(max-width: 1499px){
	.slider-cms img { 
		width: 50%;
	}
	.slider-cms .silder-content.inner-content-wrapper {
		margin: 0 750px 0 auto;
	}
}
</style>