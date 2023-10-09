<template>
	<section class="content-page findahome">
	  <b-container fluid>
			<building-card-slice
			  v-if="homeLists.length > 0"
			  :home-lists="homeLists"
			  :home-lists-copy="homeLists"
			  :default-filter="slice.primary"
			  divider_and_button_color="#77bf45"
			  :is-map="slice.primary.map"
			  :is-singapore-page="true"
			  :is-singapore-master-page="true"
			  :slice="slice"
			  :hide-filter="false"
			  :listByHouse="listByHouse"
			  :temp ="true"/>
	  </b-container>
	  <slices-block :slices="slices"/>
		  <div class="slider-cms">
			  <div v-if="pending" class="loader"></div>
		  </div>
	  </section>
  </template>
  
  <script>
//   import SlicesBlock from '~/components/SlicesBlock.vue'
//   import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
  //import mapJson from '@/custom_types/GoogleMap.json'
  
  export default {
	  name: 'room-listing-slice',
	  layout: 'homepage',
	  props: ['slice'],
	//   components: {
	// 	  SlicesBlock,
	// 	  BuildingCardSlice,
	//   },
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
			  listByHouse: []
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
		try{
		  // Query to get post content
			  //const document = (await $prismic.api.getByUID('page', params.uid)).data
		  let _this = this;
		  const appartments = await this.$axios.post(process.env.MODE === 'prod' ? process.env.PROD_END_POINT : process.env.DEV_END_POINT, {
			//"operatorId": "HaF6mb19L6AzWVavPr5t",
			"neighborhoodId": (this.slice != undefined && this.slice.primary.neighbourhood_id != undefined) ? this.slice.primary.neighbourhood_id : "",
			"cityId": (this.slice != undefined && this.slice.primary.cityid != undefined) ? this.slice.primary.cityid : ""
		  },{
			headers: {
			  Authorization: process.env.MODE === 'prod' ? 'Bearer '+process.env.PROD_COLIV_HQ_KEY : 'Bearer '+process.env.DEV_COLIV_HQ_KEY
			}
		  })
		  let homeList = [];
		  let homeListforStudents = [];
		  let homeListLd = [];
		  let listByHouse = []
		  if(appartments) {
				if(appartments.data.data && appartments.data.data.length > 0) {
				  appartments.data.data.forEach(function(appartment, index) {
					  listByHouse.push(appartment)
					  if(appartment.rooms != undefined && appartment.rooms.length > 0) {
						  appartment.rooms.forEach(function(item, i) {
							  if( _this.slice.primary.room_type !== null? _this.slice.primary.room_type.toLowerCase() == item.type.toLowerCase() : _this.slice.primary.room_type == null) {
								  let roomType = [];
								  let priceCurrency = '';
								  let startingPrice = 0;
								  let isPromo = false;
								  var cardImg = {
									  url: '',
									  altText: ''
								  };
								  if(item.roomMainPicture  != undefined) {
									  cardImg.altText = appartment.picture.description;
									  cardImg.url = item.roomMainPicture ;
								  }
								  // Extract unique room price
								  let roomPrice = [];
  
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
								  // Sort array in assending order ro extract small price
								  roomPrice.sort((a, b) => (parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1)
								  if(roomPrice.length > 0) {
									  roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
									  startingPrice = roomPrice[0].startingPrice
									  priceCurrency = roomPrice[0].priceCurrency
								  }
								  // Extract unique room type
								  roomType.push(item.type);
								  if(appartment.listingType != undefined && appartment.listingType != '') {
									  roomType.push(appartment.listingType)
								  }
								  if(_this.slice.primary.for_students_only == true && appartment.forStudents > 0){
										  if(item.availability == 'Available' || item.availability == 'Available soon') {
										  homeListforStudents.push({
											  homeID: appartment.homeId ? appartment.homeId : '',
											  roomID: item.roomId ? item.roomId : '',
											  banner: cardImg,
											  cityName:appartment.cityName,
											  name: (item.roomName != undefined) ? item.roomName + ' at ' + appartment.name : appartment.name,
											  neighborhoodName:appartment.neighbourhoodName,
											  address:appartment.address,
											  description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
											  startingPrice: startingPrice,
											  priceCurrency: priceCurrency,
											  availability: item.availability,
											  roomType: roomType,
											  totalBedrooms: appartment.totalBedrooms,
											  mapLocation: appartment.mapLocation,
											  isPromo: isPromo,
											  breakThroughPrice: (isPromo) ? item.startingPrice : false,
											  forStudents: appartment.forStudents,
											  idealGender: appartment.idealGender,
											  idealAge: appartment.idealAge
  
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
									  }
									  else {
									  homeListforStudents.push({
										  homeID: appartment.homeId ? appartment.homeId : '',
										  roomID: item.roomId ? item.roomId : '',
										  banner: cardImg,
										  cityName:appartment.cityName,
										  name: (item.roomName != undefined) ? item.roomName + ' at ' + appartment.name : appartment.name,
										  neighborhoodName:appartment.neighbourhoodName,
										  address:appartment.address,
										  description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
										  startingPrice: startingPrice,
										  priceCurrency: priceCurrency,
										  availability: item.availability,
										  roomType: roomType,
										  totalBedrooms: appartment.totalBedrooms,
										  mapLocation: appartment.mapLocation,
										  isPromo: isPromo,
										  forStudents: appartment.forStudents,
										  idealGender: appartment.idealGender,
										  idealAge: appartment.idealAge
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
								  }										
							  }
							  else{
								  if( (_this.slice.primary.available_only != undefined && _this.slice.primary.available_only === true) ) {
									  if(item.availability == 'Available' || item.availability == 'Available soon') {
										  homeList.push({
											  homeID: appartment.homeId ? appartment.homeId : '',
											  roomID: item.roomId ? item.roomId : '',
											  banner: cardImg,
											  cityName:appartment.cityName,
											  name: (item.roomName != undefined) ? item.roomName + ' at ' + appartment.name : appartment.name,
											  neighborhoodName:appartment.neighbourhoodName,
											  address:appartment.address,
											  description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
											  startingPrice: startingPrice,
											  priceCurrency: priceCurrency,
											  availability: item.availability,
											  roomType: roomType,
											  totalBedrooms: appartment.totalBedrooms,
											  mapLocation: appartment.mapLocation,
											  isPromo: isPromo,
											  breakThroughPrice: (isPromo) ? item.startingPrice : false,
											  forStudents: appartment.forStudents,
											  idealGender: appartment.idealGender,
											  idealAge: appartment.idealAge
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
									  }
								  } else {
									  homeList.push({
										  homeID: appartment.homeId ? appartment.homeId : '',
										  roomID: item.roomId ? item.roomId : '',
										  banner: cardImg,
										  cityName:appartment.cityName,
										  name: (item.roomName != undefined) ? item.roomName + ' at ' + appartment.name : appartment.name,
										  neighborhoodName:appartment.neighbourhoodName,
										  address:appartment.address,
										  description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
										  startingPrice: startingPrice,
										  priceCurrency: priceCurrency,
										  availability: item.availability,
										  roomType: roomType,
										  totalBedrooms: appartment.totalBedrooms,
										  mapLocation: appartment.mapLocation,
										  isPromo: isPromo,
										  forStudents: appartment.forStudents,
										  idealGender: appartment.idealGender,
										  idealAge: appartment.idealAge
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
								  } 
							  }	
							  }	
						  });
					  }
				  });
				  homeList.sort((a, b) => (a.availability > b.availability) ? 1 : (a.availability === b.availability) ? ((parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1) : -1 ) // First sort on availibility status and  then sort based on price
				}
		  }
		  this.listByHouse = [...listByHouse]
		  this.homeLists = _this.slice.primary.for_students_only == true ? homeListforStudents : homeList
		  this.homeListsCpy = _this.slice.primary.for_students_only == true ? homeListforStudents : homeList
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
	.content-page{
	  padding-bottom: 0px;
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
	  border-radius: 20px;
	}
	.content-page {
	  padding-top: 25px;
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