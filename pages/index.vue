<template>
	<section>
		<!-- Slices block component -->
		{{ envdeatils }}
		<slices-block :slices="slices"/>
	</section>
</template>

<script>
// Imports for all components
// import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
	name: 'Home',
	layout: 'homepage',
	// components: {
	// 	SlicesBlock
	// },
    data(){
        return{
            slices: [],
				//SEO
				meta_title: null,
				meta_description:null,
				meta_image: null,
				meta_url: null,
				meta_site_name: null,
				envdeatils: process.env.PROD_END_POINT ,
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
		]
		}
  	},
	async asyncData({ $prismic, error }) {
		// try{
		// 	// Query to get the home page content
		// 	const homepage = (await $prismic.client.getByUID('page', 'home')).then((response)=>{

        //     })
			
		// 	// return {
		// 		// Page content
		// 		// Set slices as variable
				
		// 	// }
		// } catch (e) {
		// 	console.log('EE: ', e)
		// 	error({ statusCode: 404, message: 'Page not found' })
		// }
  	},
    async mounted(){
		console.log("envdeatils",this.envdeatils)
        try{
			// Query to get the home page content
			    await this.$prismic.client.getByUID('page', 'home').then((response)=>{
                const homepage = response.data
                this.slices= homepage.page_content
				console.log(" response.data", response.data)

            })
			
			// return {
			// 	// Page content
			// 	// Set slices as variable
			// 	slices: homepage.page_content,
			// 	//SEO
			// }
		} catch (e) {
			console.log('EE: ' ,e)
			error({ statusCode: 404, message: 'Page not found' })
		}
    }
}
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