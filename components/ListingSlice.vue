<template>
  <section class="content-page findahome">
    <!-- {{ envdeatils }} -->
    <b-container fluid class="px-0">
          <BuildingCardSlice
			v-if="homeLists.length > 0"
            :home-lists="homeLists"
            :home-lists-copy="homeLists"
            :default-filter="slice.primary"
            divider_and_button_color="#77bf45"
            :is-map="slice.primary.map"
			:is-singapore-page="true"
			:slice="slice"
			:hide-filter="false"/>
    </b-container>
    <SlicesBlock :slices="slices"/>
		<div class="slider-cms">
			<div v-if="pending" class="loader"></div>
		</div>
	</section>
</template>
<script setup>
 import { ref } from 'vue'
//  const title = ref('Casa Mia Coliving Website')

// useHead({
//   title: 'My App',
//   meta: [
//     { name: 'description', content: 'My amazing site.' }
//   ],
//   bodyAttrs: {
//     class: 'test'
//   },
//   script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
// })
 </script>

<script>
// import SlicesBlock from '~/components/SlicesBlock.vue'
// import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
//import mapJson from '@/custom_types/GoogleMap.json'
import axios from 'axios';

export default {
	name: 'listing-slice',
	layout: 'homepage',
	props: ['slice'],
	// components: {
	// 	SlicesBlock,
  //   	BuildingCardSlice,
	// },
	data () {
		return {
			homeLists: [],
			homeListsCpy: [],
			pending: true,
			slices: {},
			params: this.$route.params.uid,
			linkResolver: this.$prismic.linkResolver,
			//mapStyleJson: mapJson,
			divider_and_button_color: '',
			homeListLd: [],
			queryParam: this.slice.primary.query_param,
    //   envdeatils: process.env.PROD_END_POINT ,
    //   MODE:'prod',
    //   PROD_END_POINT:'https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes',
    //   DEV_END_POINT :'https://asia-east2-colivhq-dev.cloudfunctions.net/apiHomes',
    //   PROD_COLIV_HQ_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcklkIjoiSGFGNm1iMTlMNkF6V1ZhdlByNXQiLCJjb2xpdmhxIjpmYWxzZSwiaWF0IjoxNTkyOTkwNDc2fQ.m5cUdPaf6TErOJUbmSfG2qusUdwQY4QOnv61o-tY0Zk',
    //   DEV_COLIV_HQ_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVyYXRvcklkIjoidk9yWkxrY2kyb2lWb1plZlZTWmIiLCJjb2xpdmhxIjp0cnVlLCJpYXQiOjE1OTExMDMyMjh9.qsB8ioqPm197CFxnN-SPAr3UJFHeNhH6fTQ2L652nzA',
		}
	},
	head () {
		return {
			title: this.seo_page_title,
			htmlAttrs: {
				lang: 'en'
			},
			script: [
				{ type: 'application/ld+json', json: this.homeListLd },
				{ src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`},
				{ src: `https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js`}
			],
			meta: [
				{ hid: 'author', name: 'author', content: this.meta_author },
				{ hid: 'description', name: 'description', content: this.seo_description },
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
					content: this.twitter_title
				},
				{
					hid: 'twitterdescription',
					name: 'twitter:description',
					content: this.twitter_description
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary'
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: this.twitter_image
				},
			],
		}
  },
  mounted () {
	this.getData()
  
  },
  fetchOnServer: false,
  methods: {
    async getData () {
		const envVars = useRuntimeConfig();
      try{
        // Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
        const appartments = await axios.post(envVars.public.env.MODE === 'prod' ? envVars.public.env.PROD_END_POINT : envVars.public.env.DEV_END_POINT, {
          //"operatorId": "HaF6mb19L6AzWVavPr5t",
          "neighborhoodId": (this.slice != undefined && this.slice.primary.neighbourhood_id != undefined) ? this.slice.primary.neighbourhood_id : "",
          "cityId": (this.slice != undefined && this.slice.primary.cityid != undefined) ? this.slice.primary.cityid : ""
        },{
          headers: {
            Authorization: envVars.public.env.MODE === 'prod' ? 'Bearer '+envVars.public.env.PROD_COLIV_HQ_KEY : 'Bearer '+envVars.public.env.DEV_COLIV_HQ_KEY
          }
        })
        console.log("123",appartments)
        let homeList = [];
        let homeListLd = [];
        if(appartments) {
          if(appartments.data.data && appartments.data.data.length > 0) {
            appartments.data.data.forEach(function(appartment, index) {
              let roomType = [];
              let priceCurrency = '';
              let startingPrice = 99999;
			  let isPromo = false;
			let totalAvailableRooms = 0;
              if(appartment.rooms != undefined && appartment.rooms.length > 0) {
                // Extract unique room price
                let roomPrice = [];
				appartment.rooms.forEach(function(item, i) { 
					if(item.availability == 'Available' || item.availability == 'Available soon'){
						totalAvailableRooms += 1;
						if(item.startingPrice != undefined) {
							roomPrice.push({ startingPrice: item.startingPrice, priceCurrency: item.priceCurrency, promoPrice: false })
						}
						if(item.priceScales != undefined && item.priceScales.length > 0) {
							item.priceScales.forEach(function(promoRow) { 
								if(promoRow.priceType == 'Promo') {
									isPromo = true
									roomPrice.push({ startingPrice: promoRow.priceAmount, priceCurrency: item.priceCurrency, promoPrice: true }) 
								}
							})
						}
					}
				});

                // Extract unique room type
                roomType = [...new Set(appartment.rooms.map(item => item.type))];

                // Sort array in assending order ro extract small price
                roomPrice.sort((a, b) => (parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1)
                if(roomPrice.length > 0) {
                  roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
                  startingPrice = roomPrice[0].startingPrice
                  priceCurrency = roomPrice[0].priceCurrency
                }
              }
                
              var cardImg = {
                url: '',
                altText: ''
              };
              if(appartment.picture != undefined && appartment.picture.versions.length > 0) {
                cardImg.altText = appartment.picture.description;
                appartment.picture.versions.forEach(function(image) {
                  if(image.versionsName == 'card') {
                    cardImg.url = image.link;
                  }
                });
                
              }
              if(appartment.listingType != undefined && appartment.listingType != '') {
                roomType.push(appartment.listingType)
              }
				if(appartment.listingType != undefined && appartment.listingType == 'whole apartment') {
					if(appartment.availability == 'Available' || appartment.availability == 'Available soon'){
						startingPrice = appartment.startingPrice
						priceCurrency = appartment.priceCurrency
					}
				}
				let nationality =[]
				if(appartment.housemates != undefined) {
					appartment.housemates.forEach(function(hm) {
						if(hm.nationality != null) {
							nationality.push(hm.nationality)
						}
					});
				}
				homeList.push({
					homeID: appartment.homeId ? appartment.homeId : '',
					banner: cardImg,
					cityName:appartment.cityName,
					name:appartment.name,
					neighborhoodName:appartment.neighbourhoodName,
					address:appartment.address,
					description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
					startingPrice: startingPrice,
					priceCurrency: priceCurrency,
					availability: appartment.availability,
					roomType: roomType,
					listingType: appartment.listingType,
					totalBedrooms: appartment.totalBedrooms,
					mapLocation: appartment.mapLocation,
					isPromo: isPromo,
					totalAvailableRooms: totalAvailableRooms,
					rooms: appartment.rooms,
					idealAge: appartment.idealAge,
					idealFor: appartment.idealFor,
					idealGender: appartment.idealGender,
					nationality: nationality,
					forStudents: appartment.forStudents
				})
				homeListLd.push( {
					"@context": "http://schema.org/",
					"@type": "Apartment",
					"accommodationCategory": "Apartment",
					"address": appartment.address + ' ' + appartment.postalCode + ' '+ appartment.cityName,
					"description": appartment.description,
					"image": cardImg.url,
					"name": appartment.name,
					"numberOfRooms": appartment.totalBedrooms,
					"url": process.env.baseUrl + '/findahome/',
					"geo": {
					"@type": "GeoCoordinates",
					"latitude": appartment.mapLocation._latitude,
					"longitude": appartment.mapLocation._longitude
					}
				})
            });
			homeList.sort((a, b) => ((parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1)  ) // First sort on availibility status and  then sort based on price
			homeList.forEach(function(home, i) { 
				if(homeList[i].startingPrice == 99999 || homeList[i].startingPrice == 99998) { 
					homeList[i].startingPrice = 0
				}
			});
			//homeList.sort((a, b) => (a.availability > b.availability) ? 1 : (a.availability === b.availability) ? ((parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1) : -1 ) // First sort on availibility status and  then sort based on price
          }
        }
        this.homeLists = homeList
        this.homeListsCpy = homeList
        this.homeListLd =  {
          "@context": "http://schema.org/",
            "@graph": homeListLd
          },
        this.pending = false
      } catch (e) {
        // Returns error page
        console.log('Page not found', e)
        //error({ statusCode: 404, message: 'Page not found'+e })
      }
    }
  }
}
</script>

<style scoped>
.toggle-map-button {
    min-width: 225px;
    color: #fff;
	border-radius: 30px;
	font-weight: 700;
	height: 42px;
	line-height: 42px;
	padding: 0 !important;
	outline: 0;
}
.sticky-toggle-map-button {
    min-width: 225px;
    color: #fff;
}
.map-hide {
    display: none;
}
.showHideButton {
  text-align: center;
}
.map-outer {
	position: fixed;
    top: 100px;
    left: auto;
    height: calc(100% - 100px);
    width: calc(100% + 72px);
    right: 0;
    margin-right: -15px;
	border-radius: 20px 0 0 20px;
	overflow: hidden;
}

/* .google-map {
	border-radius: 20px 0 0 20px !important; 
} */
@media (min-width:768px) and (max-width:991px){
	.map-outer{
		top: 92px;
		height: calc(100% - 92px);
	}
}
@media (min-width: 768px) {
	.map-outer img {
		height: 100%;
		width: 100%;
	}
	.map-outer .google-map {
		height: 100%;
	}
}
@media (max-width: 767px) {
  .google-map {
      height: 100%;
  }
  .content-page.findahome{
    padding-bottom: 0px;
	padding-top: 0 !important;
  }
  .sticky-toggle-map-button {
    min-width: inherit;
    display: block;
    width: 100%;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    border-radius: 0;
    z-index: 2;
	height: 42px;
  }
  .sticky-toggle-map-button.btn.focus, .sticky-toggle-map-button.btn:focus {
      box-shadow: none;
  }
  .map-outer {
      position: relative;
      height: 500px;
      width: 100%;
      overflow-x: scroll;
      z-index: 1;
      padding: 0;
  }
}
.slider-cms .slider-outer {
    margin-bottom: 75px;
}
.cluster div {
    line-height: 57px !important;
}
.cluster-home-link {
	display: table;
}
.map-popup span {
	line-height: 125%;
	display: table-cell;
  vertical-align: middle;
  padding-left: 10px;
}
.map-home-img {
	height: 50px !important;
	width: 50px !important;
}
</style>