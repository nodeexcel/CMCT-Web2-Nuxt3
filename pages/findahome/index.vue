<template>
	<section class="content-page findahome">
		<div class="slider-cms">	
			<div v-if="pending" class="loader"></div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import {client} from '~/prismic/prismic';
export default {
	name: 'findahome',
	layout: 'homepage',
	props: ['defaultFilter'],
	data () {
		return {
			homeLists: [],
			pending: true,
			slices: null
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
			script: [
				{ type: 'application/ld+json', json: this.homeListLd }
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
	async asyncData({ $prismic, params, error, store, defaultFilter, $axios }) {
		// try{
		// 	// Query to get post content
		// 	//const document = (await $prismic.api.getByUID('page', params.uid)).data
		// 	const appartments = await $axios.post(process.env.MODE === 'prod' ? process.env.PROD_END_POINT : process.env.DEV_END_POINT, {
		// 		//"operatorId": "HaF6mb19L6AzWVavPr5t",
		// 		"neighborhoodId": "",
		// 		"cityId": (defaultFilter != undefined && defaultFilter.cityId != undefined) ? defaultFilter.cityId : ""
		// 	},{
		// 		headers: {
		// 			Authorization: process.env.MODE === 'prod' ? 'Bearer '+ process.env.PROD_COLIV_HQ_KEY : 'Bearer '+ process.env.DEV_COLIV_HQ_KEY
		// 		}
		// 	})
		// 	let homeList = [];
		// 	let homeListLd = [];
		// 	if(appartments) {
		// 		if(appartments.data.data.length > 0) {
		// 			appartments.data.data.forEach(function(appartment, index) {
		// 				if(appartment.homeId != undefined) {
		// 					let roomType = [];
		// 					let priceCurrency = '';
		// 					let startingPrice = 0;
		// 					if(appartment.rooms != undefined && appartment.rooms.length > 0) {
		// 						// Extract unique room price
		// 						let roomPrice = [...new Set(appartment.rooms.map(function(item){ 
		// 							if(item.startingPrice != undefined) 
		// 								return { startingPrice: item.startingPrice, priceCurrency: item.priceCurrency } 
		// 							})
		// 						)];
		// 						// Extract unique room type
		// 						roomType = [...new Set(appartment.rooms.map(item => item.type))];
							
						
		// 						// Sort array in assending order ro extract small price
		// 						roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
								
		// 						if(roomPrice.length > 0) {
		// 							roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
		// 							startingPrice = roomPrice[0].startingPrice
		// 							priceCurrency = roomPrice[0].priceCurrency
		// 						}
		// 					}
							
		// 					var cardImg = {
		// 						url: '',
		// 						altText: ''
		// 					};
		// 					if(appartment.picture != undefined && appartment.picture.versions.length > 0) {
		// 						cardImg.altText = appartment.picture.description;
		// 						appartment.picture.versions.forEach(function(image) { 
		// 							if(image.versionsName == 'card') {
		// 								cardImg.url = image.link;
		// 							}
		// 						});
								
		// 					}
		// 					if(appartment.listingType != undefined && appartment.listingType != '') {
		// 						roomType.push(appartment.listingType)
		// 					}
		// 					homeList.push({
		// 						homeID: appartment.homeId,
		// 						banner: cardImg,
		// 						cityName:appartment.cityName,
		// 						name:appartment.name,
		// 						neighborhoodName:appartment.neighbourhoodName,
		// 						address:appartment.address,
		// 						description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
		// 						startingPrice: startingPrice,
		// 						priceCurrency: priceCurrency,
		// 						availability: appartment.availability,
		// 						roomType: roomType,
		// 						totalBedrooms: appartment.totalBedrooms,
		// 						mapLocation: appartment.mapLocation
		// 					})
		// 					homeListLd.push( {
		// 						"@context": "http://schema.org/",
		// 						"@type": "Apartment",
		// 						"accommodationCategory": "Apartment",
		// 						"address": appartment.address + ' ' + appartment.postalCode + ' '+ appartment.cityName,
		// 						"description": appartment.description,
		// 						"image": cardImg.url,
		// 						"name": appartment.name,
		// 						"numberOfRooms": appartment.totalBedrooms,
		// 						"url": process.env.baseUrl + '/findahome/' + params.uid,
		// 						"geo": {
		// 							"@type": "GeoCoordinates",
		// 							"latitude": appartment.mapLocation._latitude,
		// 							"longitude": appartment.mapLocation._longitude
		// 						}
		// 					})
		// 				}
		// 			});
		// 			homeList.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
		// 			//store.commit('setHomeLists', homeList)
		// 			//resolve(appartments)
		// 		}
		// 	}
		// 	const document = (await $prismic.api.getByUID('page', 'findyourhome')).data
		// 	return {
		// 		// Set slices as variable
		// 		slices: document.page_content,
		// 		homeLists: homeList,
		// 		homeListLd:  {
		// 			"@context": "http://schema.org/",
		// 			"@graph": homeListLd
		// 		},
		// 		//SEO
		// 		pending: false,
		// 		meta_site_name: process.env.COMPANY_NAME,
		// 		meta_description: (homepage.meta_description.length && homepage.meta_description != null) ?
		// 			homepage.meta_description.length > 170 ?
		// 			homepage.meta_description.substring(0, 167) + '...' :
		// 			homepage.meta_description : '',
		// 		meta_image: (homepage.meta_image) ? homepage.meta_image : '',
		// 		meta_site_name: (homepage.meta_site_name) ? homepage.meta_site_name : '',
		// 		meta_title: (homepage.meta_title != '') ? homepage.meta_title : '',
		// 		meta_url: process.env.baseUrl+'/findahome',
		// 	}
		// } catch (e) {
		// 	console.log('Error', e)
		// 	// Returns error page
		// 	error({ statusCode: 404, message: 'Page not found' })
		// }
	},
	async mounted(){
		let envVars = useRuntimeConfig();
		// try{
			// Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
			const appartments =  axios.post(envVars.public.env.MODE === 'prod' ? envVars.public.env.PROD_END_POINT : envVars.public.env.DEV_END_POINT, {
				//"operatorId": "HaF6mb19L6AzWVavPr5t",
				"neighborhoodId": "",
				"cityId": (this.defaultFilter != undefined && this.defaultFilter.cityId != undefined) ? this.defaultFilter.cityId : ""
			},{
				headers: {
					Authorization: envVars.public.env.MODE === 'prod' ? 'Bearer '+ envVars.public.env.PROD_COLIV_HQ_KEY : 'Bearer '+ envVars.public.env.DEV_COLIV_HQ_KEY
				}
			})
			let homeList = [];
			let homeListLd = [];
			// if(appartments) {
			// 	if(appartments.data.data.length > 0) {
			// 		appartments.data.data.forEach(function(appartment, index) {
			// 			if(appartment.homeId != undefined) {
			// 				let roomType = [];
			// 				let priceCurrency = '';
			// 				let startingPrice = 0;
			// 				if(appartment.rooms != undefined && appartment.rooms.length > 0) {
			// 					// Extract unique room price
			// 					let roomPrice = [...new Set(appartment.rooms.map(function(item){ 
			// 						if(item.startingPrice != undefined) 
			// 							return { startingPrice: item.startingPrice, priceCurrency: item.priceCurrency } 
			// 						})
			// 					)];
			// 					// Extract unique room type
			// 					roomType = [...new Set(appartment.rooms.map(item => item.type))];
							
						
			// 					// Sort array in assending order ro extract small price
			// 					roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
								
			// 					if(roomPrice.length > 0) {
			// 						roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
			// 						startingPrice = roomPrice[0].startingPrice
			// 						priceCurrency = roomPrice[0].priceCurrency
			// 					}
			// 				}
							
			// 				var cardImg = {
			// 					url: '',
			// 					altText: ''
			// 				};
			// 				if(appartment.picture != undefined && appartment.picture.versions.length > 0) {
			// 					cardImg.altText = appartment.picture.description;
			// 					appartment.picture.versions.forEach(function(image) { 
			// 						if(image.versionsName == 'card') {
			// 							cardImg.url = image.link;
			// 						}
			// 					});
								
			// 				}
			// 				if(appartment.listingType != undefined && appartment.listingType != '') {
			// 					roomType.push(appartment.listingType)
			// 				}
			// 				homeList.push({
			// 					homeID: appartment.homeId,
			// 					banner: cardImg,
			// 					cityName:appartment.cityName,
			// 					name:appartment.name,
			// 					neighborhoodName:appartment.neighbourhoodName,
			// 					address:appartment.address,
			// 					description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
			// 					startingPrice: startingPrice,
			// 					priceCurrency: priceCurrency,
			// 					availability: appartment.availability,
			// 					roomType: roomType,
			// 					totalBedrooms: appartment.totalBedrooms,
			// 					mapLocation: appartment.mapLocation
			// 				})
			// 				homeListLd.push( {
			// 					"@context": "http://schema.org/",
			// 					"@type": "Apartment",
			// 					"accommodationCategory": "Apartment",
			// 					"address": appartment.address + ' ' + appartment.postalCode + ' '+ appartment.cityName,
			// 					"description": appartment.description,
			// 					"image": cardImg.url,
			// 					"name": appartment.name,
			// 					"numberOfRooms": appartment.totalBedrooms,
			// 					"url": envVars.public.env.baseUrl + '/findahome/' + params.uid,
			// 					"geo": {
			// 						"@type": "GeoCoordinates",
			// 						"latitude": appartment.mapLocation._latitude,
			// 						"longitude": appartment.mapLocation._longitude
			// 					}
			// 				})
			// 			}
			// 		});
			// 		homeList.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
			// 		//store.commit('setHomeLists', homeList)
			// 		//resolve(appartments)
			// 	}
			// }
			console.log("response",client.getByUID('page', 'blog'), client.getFirst('page', 'findyourhome'))
			client.getFirst('page', 'findyourhome').then((result) => {
				console.log(result.data.page_content )
			})
			.catch((error) => {
          console.error(error);
          });
		// 	client.getFirst('page', 'findyourhome').then((response) => {
        //     // Use the menuData here
		// 	console.log(response.data.page_content)
		// 	this.slices = response.data.page_content
		// 	console.log(this.slices )
        //     // console.log(menuData);
        //   })
        //   .catch((error) => {
        //   console.error(error);
        //   });

	// }
	// catch (e) {
	// 		console.log('Error', e)
	// 		// Returns error page
	// 		error({ statusCode: 404, message: 'Page not found' })
	// 	}
	},
	
	fetchOnServer: false
}
</script>
<style scoped>
	.findahome ::v-deep(.form-cms-build) {
		background-color: #fff !important;
		padding: 0px;
	}
	.content-page {
		padding-top: 50px !important;
		padding-bottom: 0px;
	}
</style>
