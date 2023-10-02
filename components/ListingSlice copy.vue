<template>
    <section class="content-page findahome">
      <b-container fluid>
        <b-row  ref="map-block">
          <b-col cols="12" v-if="slice.primary.map === true">
            <div class="showHideButton" >
                <button v-show="(showToggleButton && isDisplayMode)" :style="{'background-color': divider_and_button_color, 'border-color': divider_and_button_color}" class="btn sticky-toggle-map-button mb-5" @click="showMapOrList()"> 
                    <span v-show="isMap">Show List</span>
                    <span v-show="isList">Show Map</span>
                </button>
                <button v-show="showToggleButton" id="sticky-map-button" :style="{'background-color': divider_and_button_color, 'border-color': divider_and_button_color}" class="btn toggle-map-button mb-5" @click="showMapOrList()"> 
                    <span v-show="isMap">Show List</span>
                    <span v-show="isList">Show Map</span>
                </button>
              </div>
          </b-col>
          <b-col :cols="slice.primary.map ? '7' : 12"  :class="[isList ?  ((!isMap) ? 'col-12':'' ) : 'map-hide']">
            <building-card-slice
              v-if="homeLists.length > 0"
              :home-lists="homeLists"
              :home-lists-copy="homeLists"
              :default-filter="slice.primary"
              divider_and_button_color="#77bf45"
              :is-map="slice.primary.map"
              :is-singapore-page="true"
              v-on:sosChange="updateFromChild()"/>
          </b-col>
          <b-col cols="5" :class="[isMap ? ((!isList) ? 'col-12':'' ) : 'map-hide'] +' map-outer'" v-if="slice.primary.map === true" >
            <div class="google-map" :id="mapName"></div>
          </b-col>
        </b-row>
      </b-container>
      <slices-block :slices="slices"/>
          <div class="slider-cms">
              <div v-if="pending" class="loader"></div>
          </div>
      </section>
  </template>
  
  <script>
  import SlicesBlock from '~/components/SlicesBlock.vue'
  import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
  //import mapJson from '@/custom_types/GoogleMap.json'
  
  function elementInViewport(el) {
      if(el != null) {
          var top = el.offsetTop;
          var height = el.offsetHeight;
  
          while(el.offsetParent) {
              el = el.offsetParent;
              top += el.offsetTop;
          }
  
          return (
              top >= window.pageYOffset &&
              (top + height) <= (window.pageYOffset + window.innerHeight)
          );
      }
  }
  
  export default {
      name: 'listing-slice',
      layout: 'homepage',
      props: ['slice'],
      components: {
          SlicesBlock,
          BuildingCardSlice,
      },
      data () {
          return {
              homeLists: [],
              homeListsCpy: [],
              pending: true,
              slices: {},
              params: this.$route.params.uid,
              linkResolver: this.$prismic.linkResolver,
              mapName: "location-multi-map",
              markerCoordinates: [],
              map: null,
              bounds: null,
              markerIcon: '/mapMarker.png',
              custerIcon: '/cluster',
              //mapStyleJson: mapJson,
              markers: [],
              divider_and_button_color: '',
              showToggleButton: false,
              isMap: false,
              isList: true,
              isDisplayMode: true,
              homeListLd: [],
              queryParam: this.slice.primary.query_param
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
      updateFromChild() {
          this.queryParam = undefined
          this.slice.primary.query_param = undefined;
          this.getData()
      },
      async getData () {
        try{
          // Query to get post content
              //const document = (await $prismic.api.getByUID('page', params.uid)).data
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
          let homeListLd = [];
          if(appartments) {
            if(appartments.data.data && appartments.data.data.length > 0) {
              appartments.data.data.forEach(function(appartment, index) {
                let roomType = [];
                let priceCurrency = '';
                let startingPrice = 0;
                      let isPromo = false;
                if(appartment.rooms != undefined && appartment.rooms.length > 0) {
                  // Extract unique room price
                  let roomPrice = [];
                    appartment.rooms.forEach(function(item, i) { 
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
                      totalBedrooms: appartment.totalBedrooms,
                      mapLocation: appartment.mapLocation,
                      isPromo: isPromo,
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
                  if(this.queryParam !== undefined && this.queryParam.startofstay == 'Immediately') {
                      homeList = homeList.filter((home) => {
                          if(home.availability == 'Available' || home.availability =='At least a room available') {
                              return home;
                          }
                      });
                  } else if(this.queryParam !== undefined && this.queryParam.startofstay == 'Within a month') {
                      homeList = homeList.filter((home) => {
                          if(home.availability == 'Available' || home.availability =='At least a room available' || home.availability == 'Available soon') {
                              return home;
                          }
                      });
                  }
                  homeList.sort((a, b) => (a.availability > b.availability) ? 1 : (a.availability === b.availability) ? ((parseInt(a.startingPrice) > parseInt(b.startingPrice)) ? 1 : -1) : -1 ) // First sort on availibility status and  then sort based on price
            }
          }
          this.homeLists = homeList
          this.homeListsCpy = homeList
          if (this.slice.primary.map === true) this.setCoordinates()
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
      },
      showMapOrList() {
          this.isMap = !this.isMap
          this.isList = !this.isList
          if(this.isMap) {
              this.toggleMapButton = 'List'
              this.setZoom();
          } else {
              this.toggleMapButton = 'Map'
          }
          this.scrollToMap('map-block')
      },
      setCoordinates() {
        if (this.slice.primary.map && this.homeLists.length) {
          this.markers = [];
          this.markerCoordinates = [];
          let buildings = JSON.parse(JSON.stringify(this.homeLists))
          for (let item of buildings) {
              let link = process.env.baseUrl+'/findahome/'+item.homeID;
              this.markerCoordinates.push({
                latitude: item.mapLocation._latitude,
                  longitude: item.mapLocation._longitude,
                  name: item.name,
                  link: link,
                  homeID: item.homeID,
                  image: item.banner.url
              })
          }
          this.bounds = new google.maps.LatLngBounds();
          const element = document.getElementById(this.mapName)
          const mapCentre = this.markerCoordinates[0]
          const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
            fullscreenControl: false,
            zoom: 12,
            mapId: '4df64ef1b112569a'
          }
          this.map = new google.maps.Map(element, options);
          var infowindow = new google.maps.InfoWindow();
          const that = this
          this.markerCoordinates.forEach((coord) => {
            if (typeof coord.latitude != 'undefined' && typeof coord.longitude != 'undefined') {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              const marker = new google.maps.Marker({ 
                  position,
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  url: coord.link,
                  icon: this.markerIcon,
                  title: coord.name,
                  homeID: coord.homeID,
                  image: coord.image
              });
              marker.addListener('mouseover', function() {
                //infowindow.setContent(coord.name);
                    infowindow.setContent('<div class="map-popup"><a class="cluster-home-link" href="' + coord.link + '"><img class="map-home-img" data-skip-lazy=""  src="' + coord.image + '"/><span>' + coord.name + '</span></a></div>');
                  infowindow.open(this.map, marker);
                  that.removeLazyLoad();
              });
              marker.addListener('mouseout', function() {
                  infowindow.close(this.map, marker);
              });
              marker.addListener('click', function() {
                  if (marker.getAnimation() !== null) {
                      marker.setAnimation(null);
                  } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
                  window.location.href = marker.url;
              });
              this.markers.push(marker)
              this.map.fitBounds(this.bounds.extend(position))
              }
          });
          var mc = new MarkerClusterer(this.map, this.markers, {
              zoomOnClick: false,
              imagePath: this.custerIcon
          });
          mc.setStyles(mc.getStyles().map(function (style) {
              //style.textColor = '#fb1a4e';
              style.textColor = '#fff';
              style.textSize = 15;
              style.width = 57;
              style.lineHeight = 55;
              return style;
          }));
          mc.addMarkers(this.markers)
          var infoWin = new google.maps.InfoWindow();
          
          google.maps.event.addListener(mc, 'clusterclick', function(cluster) {
              if(this.map.getZoom() > 17) {
          infoWin.close();
                  var content = '';
                  content += cluster.getMarkers().map(cl => '<div class="map-popup"><a class="cluster-home-link" href="' + cl.url + '"><img class="map-home-img" data-skip-lazy=""  src="' + cl.image + '"/><span>' + cl.title + '</span></a></div>') ;
                  content = content.split(',').join('');
                  var info = new google.maps.MVCObject;
                  info.set('position', cluster.center_);
                  infoWin.setContent(content);
                  infoWin.open(this.map, info);
                  that.removeLazyLoad();
              } else {
                  this.map.setCenter(cluster.getCenter());
                  this.map.setZoom(this.map.getZoom()+1);
              }
            });
          
          google.maps.event.addListener(this.map, 'bounds_changed', function() {
              infoWin.close();
              if(that.currentWidth > 768) {
                  var inBoundHome = []
                  for (var i = 0; i < that.markers.length; i++) {
                      if (that.map.getBounds().contains(that.markers[i].getPosition())) {
                          inBoundHome.push(that.markers[i].homeID) // in visible bounds
                      }
                  }
                  const isHomeInBound = []
                  that.homeListsCpy.forEach((home, index) => {
                      if(inBoundHome.includes(home.homeID)) {
                          isHomeInBound.push(home)
                      }
                  })
                  that.homeLists = isHomeInBound 
              } else {
                  that.homeLists = that.homeListsCpy
              }
          });
        }
      },
      handleResize() {
        if(this.currentWidth != window.innerWidth) {
          if(window.innerWidth < 768) {
              if(this.isMap == true && this.isList == true) {
                  this.setCoordinates()
                  this.isList = false
                  this.showMapOrList()
              }
              this.showToggleButton = true;
          } else {
              this.isMap = true;
              this.isList = true;
              this.showToggleButton = false;
          }
          this.setZoom()
          this.currentWidth = window.innerWidth;
        }
      },
      setZoom() {
          if(window.innerWidth < 768) {
              if(this.map != null) {
                  this.map.setZoom(12);
              }
          } else {
              if(this.map != null) {
                  this.map.setZoom(14);
              }
          }
      },
      handleScroll() {
          const el = document.getElementById('sticky-map-button');
          if(elementInViewport(el)) {
              this.isDisplayMode = false;
          } else {
              this.isDisplayMode = true;
          }
      },
      scrollToMap(refName) {
          var element = this.$refs[refName];
          element.scrollIntoView({ behavior: 'smooth' });
      },
      removeLazyLoad() {
          $("body .map-popup").each( function() {
              let src = $( this ).find('img').attr('data-src');
              $(this).find('img').removeAttr('data-src');
              $(this).find('img').attr("src", src);
          });
      }
    },
    created () {
        if (process.browser && (this.slice.primary.map === true) ) {
          window.addEventListener('resize', this.handleResize)
          document.addEventListener('scroll', this.handleScroll)
        }
    },
    beforeMount () {
      if (this.slice.primary.map === true) {
            this.handleResize();
          this.handleScroll();
      }
    },
    destroyed() {
      document.removeEventListener('scroll', this.handleScroll);
    }
  }
  </script>
  
  <style>
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
      top: 0;
      left: auto;
      height: 100%;
      width: 100%;
      right: 0;
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