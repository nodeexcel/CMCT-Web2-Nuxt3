<template>
    <section
      class="home-detail overflow-hidden"
      v-if="
        JSON.stringify(css) != {} ||
        JSON.stringify(css) != null ||
        JSON.stringify(css) != ''
      "
    >
      <div class="home-detail-slider slider-cms">
        <div class="container-background-wrapper">
          <div class="container-background-sub-wrapper">
            <div v-if="$fetchState.pending" class="loader"></div>
            <client-only>
              <div class="position-relative find-home-carousel-with-tabs">
                <carousel
                  v-show="activeTab == 1"
                  class="find-home-carousel"
                  v-if="
                    homeDetails.hero_banner &&
                    homeDetails.hero_banner.toLowerCase() === 'slider'
                  "
                  :autoplay="true"
                  :loop="true"
                  :perPage="1"
                  :navigationEnabled="true"
                  :paginationEnabled="true"
                  :speed="2000"
                  navigationNextLabel="<i class='fa angle-right cust-icon'></i>"
                  navigationPrevLabel="<i class='fa angle-left cust-icon'></i>"
                  paginationActiveColor="#72bf44"
                  :autoplayTimeout="3000"
                  :spacePadding="0"
                  :margin="10"
                >
                  <slide
                    v-for="(images, index) in homeDetails.picturesArray"
                    :key="index"
                    :style="{ height: JSON.stringify(css) - 174 + 'px' }"
                  >
                    <picture class="slider-img" v-if="images">
                      <template v-for="(image, inx) in images.versions"   :key="inx">
                        <img
                          v-if="
                            image.versionsName == 'phone' && screenSize <= 750
                          "
                        
                          :alt="images.description"
                          :src="image.link"
                          media="(max-width: 750px)"
                        />
                        <img
                          v-else-if="
                            image.versionsName == 'tablet' &&
                            screenSize > 750 &&
                            screenSize <= 991
                          "
                          :alt="images.description"
                          :src="image.link"
                          media="(max-width: 991px)"
                        />
                        <img
                          :alt="images.description"
                          v-else-if="
                            image.versionsName == 'desk' && screenSize > 991
                          "
                          :src="image.link"
                        />
                      </template>
                    </picture>
                  </slide>
                </carousel>
                <div
                  v-show="activeTab == 2"
                  class="video-section"
                  :style="{ height: JSON.stringify(css) - 174 + 'px' }"
                >
                  <iframe
                    v-if="
                      activeTab == 2 &&
                      homeDetails.threeD_tour &&
                      homeDetails['3DtourLink'] != null
                    "
                    data-not-lazy
                    width="100%"
                    allowfullscreen
                    v-lazy-load
                    :src="embedSlice.embed_url"
                    frameborder="0"
                  ></iframe>
                </div>
                <location-slice
                  v-if="activeTab == 3 && mapSlice != null"
                  :slice="mapSlice"
                  class="location-section"
                  :style="{ height: JSON.stringify(css) - 174 + 'px' }"
                />
                <div class="findhome-card-tabs mt-3 mt-md-0">
                  <b-card no-body>
                    <b-tabs card>
                      <b-tab @click="activeTab = 1" title="Photos" active>
                      </b-tab>
                      <b-tab
                        @click="activeTab = 2"
                        title="Virtual Tour"
                        id="ViewVirtualTour"
                        v-if="
                          homeDetails.threeD_tour &&
                          homeDetails['3DtourLink'] != null
                        "
                      >
                      </b-tab>
                      <b-tab
                        @click="activeTab = 3"
                        title="Location"
                        id="ViewLocation"
                      >
                      </b-tab>
                    </b-tabs>
                  </b-card>
                </div>
              </div>
              <div
                v-if="
                  homeDetails.hero_banner &&
                  homeDetails.hero_banner.toLowerCase() != 'slider'
                "
              >
                <template
                  v-for="(image, inx) in homeDetails.picturesArray[0].versions" :key="inx"
                >
                  <img
                    v-if="image.versionsName == 'phone' && screenSize <= 750"
                    
                    :alt="image.description"
                    :src="image.link"
                    media="(max-width: 750px)"
                  />
                  <img
                    v-else-if="
                      image.versionsName == 'tablet' &&
                      screenSize > 750 &&
                      screenSize <= 991
                    "
                    :alt="image.description"
                    :src="image.link"
                    media="(max-width: 991px)"
                  />
                  <img
                    :alt="image.description"
                    v-else-if="image.versionsName == 'desk' && screenSize > 991"
                    :src="image.link"
                  />
                </template>
              </div>
            </client-only>
  
            <div class="inner-content-wrapper mb-0 mb-xl-5 pb-xl-5">
              <div class="cms-main-wrap">
                <div class="row">
                  <div class="col-md-9">
                    <div class="home-detail-slider-content">
                      <div class="nb-main mt-3 row">
                        <!-- <i class="fa fa-map icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i> -->
                        <div class="col-md-12 mb-1 mb-xl-3">
                          <div class="city-text">
                            {{ homeDetails.cityName }},
                            {{ homeDetails.neighbourhoodName }}
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="home-detail-title">
                            <h1 class="mb-2 mb-xl-4">{{ homeDetails.name }}</h1>
                          </div>
                        </div>
                        <div class="col-sm-6 mb-3 mb-sm-0 text-sm-right">
                          <div class="row justify-content-start justify-content-md-end">
                            <div
                              v-if="homeDetails.totalBedrooms != null"
                              class="icons-details col-4 "
                            >
                              <div class="icon-1 icon">
                                <div class="icon-wrap">
                                  <!-- <i class="fa fa-bed icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i> -->
                                  <!-- <img src="~/assets/img/bedroom.png" alt="bedroom" class="build-icon"> -->
                                </div>
                                <div
                                  class="desc d-flex align-items-center justify-content-center mb-2"
                                >
                                  <p>{{ homeDetails.totalBedrooms }} bedrooms</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row justify-content-start justify-content-md-end">
                            <div
                              v-if="homeDetails.totalBathrooms != null"
                              class="icons-details col-4 "
                            >
                              <div class="icon-1 icon">
                                <div class="icon-wrap">
                                  <!-- <i class="fa fa-bed icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i> -->
                                  <!-- <img src="~/assets/img/bedroom.png" alt="bedroom" class="build-icon"> -->
                                </div>
                                <div
                                  class="desc d-flex align-items-center justify-content-center"
                                >
                                  <p>{{ homeDetails.totalBathrooms }} bathrooms</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-2 pl-0">
                          <div v-if="homeDetails.forStudents == 1" class="student-logo">
                            <img src="~/public/casamia_forstudents-4@4x.png" alt="student_logo">
                          </div>
                      </div>
                      <div class="home-detail-address mb-3 mb-xl-5">
                        {{ homeDetails.address }}
                      </div>
                      <div class="build-desc">
                        <p v-html="homeDetails.description" class="homeDetailsDescription"></p>
                      </div>
                      <p
                        v-if="homeDetails.listingType == 'whole apartment'"
                        class="whole-apartment-price"
                      >
                        {{
                          "Starting at " +
                          homeDetails.priceCurrency +
                          " " +
                          Number(homeDetails.startingPrice).toLocaleString() +
                          " " +
                          homeDetails.priceUnit
                        }}
                      </p>
                      <!-- <p class="location">Location: {{ fields.geohome-detail.latitude }}, {{ fields.geohome-detail.longitude }}</p> -->
                    </div>
                  </div>
                  <div class="col-md-3 side-form-wrapper">
                    <slices-block
                      :slices="sideFormSlice"
                      :is-home-detail="true"
                      page-id="findahome"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slices-block :slices="slices" :is-home-detail="true" page-id="findahome" />
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  // Imports for all components
//   import SlicesBlock from "~/components/SlicesBlock.vue";
//   import LocationSlice from "~/components/slices/MapSlice.vue";
  export default {
    name: "home-details",
    layout: "homepage",
    // components: {
    //   SlicesBlock,
    //   LocationSlice,
    // },
    data() {
      return {
        activeTab: 1,
        cssHeight: "",
        homeDetails: {},
        homeLists: [],
        screenSize: "",
        slices: null,
        sideFormSlice: null,
        adjustFormSlice: null,
        params: "",
        threeD_tour: false,
        hero_banner: "Slider",
        amenities_background_color: "",
        housemates: false,
        map: false,
        room_image: "",
        rooms_background_color: "",
        similar_homes: false,
        mapSlice: {},
        embedSlice: {},


        slices: null,
          homeDetails: null,
          anyRoomAvailable: null,
          mapSlice: [],
          //SEO
          meta_title: null,
          meta_description: "",
          meta_image: null,
          meta_site_name: null,
          meta_url: null,
          structuredData: {
          },
          roomStructureData: {
          },
          roomStructureData1: {
          },
          banner: {}
      };
    },
    computed: {
      css() {
        if (process.client) {
          this.cssHeight = window.innerHeight;
          return window.innerHeight;
        } else {
          return {
            /*empty style object*/
          };
        }
      },
    },
    async mounted() {
        let envVars = useRuntimeConfig();
      await this.$fetch();
      // Remove lazy-load attribute
      $(".find-home-carousel-with-tabs iframe").removeAttr("v-lazy-load");
      var src = $(".find-home-carousel-with-tabs iframe").attr("data-src");
      $(".find-home-carousel-with-tabs iframe").removeAttr("data-src");
      $(".find-home-carousel-with-tabs iframe").attr("src", src);
    },
    created() {
      if (process.browser) {
        window.addEventListener("resize", this.handleResize);
      }
      this.params = this.$route.params;
      this.handleResize();
    },
    methods: {
      handleResize() {
        this.screenSize = process.browser ? screen.width : "";
      },
    },
    head() {
      return {
        title: 'Coliving Home Details for' + " " + this.homeDetails.name + " " + 'in'+ " " + this.homeDetails.cityName + '-'+  this.homeDetails.neighbourhoodName,
        htmlAttrs: {
          lang: "en",
        },
        link: [
          { rel: "canonical", href: this.meta_url },
          {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
          },
        ],
        script: [
          {
            src: `https://maps.googleapis.com/maps/api/js?key=${envVars.public.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`,
          },
          { type: "application/ld+json", json: this.structuredData },
          { type: "application/ld+json", json: this.roomStructureData },
          // { type: 'application/ld+json', json: this.roomStructureData1 }
        ],
        meta: [
          { hid: "author", name: "author", content: "CasaMiaCasaTua" },
          {
            hid: "description",
            name: "description",
            content: this.meta_description,
          },
          {
            hid: "ogtitle",
            property: "og:title",
            content: this.meta_title,
          },
          {
            hid: "ogdescription",
            property: "og:description",
            content: this.meta_description,
          },
          {
            hid: "ogimage",
            property: "og:image",
            content: this.meta_image,
          },
          {
            hid: "ogurl",
            property: "og:url",
            content: this.meta_url,
          },
          {
            hid: "ogtype",
            property: "og:type",
            content: "Website",
          },
          {
            hid: "ogsite_name",
            property: "og:site_name",
            content: this.meta_site_name,
          },
          {
            hid: "twittertitle",
            name: "twitter:title",
            content: this.meta_title,
          },
          {
            hid: "twitterdescription",
            name: "twitter:description",
            content: this.meta_description,
          },
          {
            hid: "twitter:card",
            name: "twitter:card",
            content: "summary",
          },
          {
            hid: "twitterimage",
            name: "twitter:image",
            content: this.meta_image,
          },
        ],
      };
    },
    // async mounted(){
    //     // { $prismic, params, error, $axios }
    //     // console.log("this",this.$prismic.client.getSingle("homes"))
    //     await this.$prismic.client.getSingle('homes').then((result) => {
    //         const document = result.data
    //         // return result.data

    //     })
    //       .catch((error) => {
    //       console.error(error);
    //       });
    //       console.log("document",document);

    // },
    async mounted() {
        // { $prismic, params, error, $axios }
        const params = this.$route.params
        let envVars = useRuntimeConfig();
      try {
        // Query to get post content
        // let documentPage = (await this.$prismic.api.getByUID('page', this.params.uid))
        // const document = (await $prismic.api.getSingle("homes")).data;
        const appartments = await axios.post(
            envVars.public.env.MODE === "prod"
            ? envVars.public.env.PROD_END_POINT
            : envVars.public.env.DEV_END_POINT,
          {
            homeId: params.uid,
            neighborhoodId: "",
            cityId: "",
          },
          {
            headers: {
              Authorization:
              envVars.public.env.MODE === "prod"
                  ? "Bearer " + envVars.public.env.PROD_COLIV_HQ_KEY
                  : "Bearer " + envVars.public.env.DEV_COLIV_HQ_KEY,
            },
          }
        );
        var homeData = appartments.data.data[0];
        var meta_image = "";
        if (
          homeData.picturesArray != undefined &&
          homeData.picturesArray.length > 0
        ) {
          homeData.picturesArray[0].versions.forEach(function (image) {
            if (image.versionsName == "desk") {
              meta_image = image.link;
            }
          });
        }
        let amenitiesFeatures = [];
        homeData.amenitiesArray = homeData.amenitiesArray.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        homeData.amenitiesArray.forEach(function (feature) {
          amenitiesFeatures.push({
            "@type": "http://schema.org/LocationFeatureSpecification",
            name: feature.name,
            value: "true",
          });
        });
        let roomsLd = [];
        let roomsLd1 = [];
        let anyRoomAvailable = false;
        if (homeData.roomsArray != undefined) {
          homeData.roomsArray.forEach(function (room) {
            if (room.availability == "Available") {
              anyRoomAvailable = true;
            }
            roomsLd.push({
              "@type": "Room",
              accommodationCategory: "Room",
              description: room.description,
              name: room.roomName,
              image:
                room.roomPicturesArray.length > 0
                  ? room.roomPicturesArray[0].link
                  : "",
            });
            let roomsLdImgs = [];
            room.roomPicturesArray.forEach(function (img) {
              roomsLdImgs.push(img.link);
            });
            roomsLd1.push({
              "@type": "Product",
              name: room.roomName + " at " + homeData.name,
              image: roomsLdImgs,
              description: room.description,
              sku: params.uid,
              review: 5,
              isbn: room.roomId,
              aggregateRating: 5,
              brand: {
                "@type": "Brand",
                name: "Casa Mia Coliving",
              },
              offers: {
                "@type": "AggregateOffer",
                offerCount: "5",
                lowPrice: room.startingPrice,
                highPrice: room.startingPrice,
                priceCurrency: room.priceCurrency,
              },
            });
          });
        }
        await this.$prismic.client.getSingle('homes').then((result) => {
            var document = result.data
            console.log("document",document.hero_banner,homeData)
            homeData["threeD_tour"] = document["3d_tours"]
            homeData["hero_banner"] = document["hero_banner"]
            homeData["amenities_background_color"] =document["amenities_background_color"]
            homeData["side_form_background_color"] =document["amenities_background_color"]
            homeData["housemates"] = document["housemates"]
            homeData["map"] = document["map"]
        //   (homeData["room_image"] = document.room_image)
        //   (homeData["rooms_background_color"] = document.rooms_background_color)
        //   (homeData["similar_homes"] = document.similar_homes);
        // return {
          this.slices= document.body
          this.homeDetails= homeData
          this.anyRoomAvailable= anyRoomAvailable
          this.mapSlice= []
          //SEO
          this.meta_title= homeData.name
          this.meta_description=
            homeData.description && homeData.description != null
              ? homeData.description.length > 170
                ? homeData.description.substring(0, 167) + "..."
                : homeData.description
              : ""
          this.meta_image= meta_image
          this.meta_site_name= envVars.public.env.COMPANY_NAME
          this.meta_url= envVars.public.env.baseUrl + "/findahome/" + params.uid
          this.structuredData= {
            "@context": "http://schema.org/",
            "@type": "Apartment",
            accommodationCategory: "Apartment",
            address:
              homeData.address +
              " " +
              homeData.postalCode +
              " " +
              homeData.cityName,
            description: homeData.description,
            image: meta_image,
            name: homeData.name,
            numberOfRooms: homeData.totalBedrooms,
            url: envVars.public.env.baseUrl + "/findahome/" + params.uid,
            geo: {
              "@type": "GeoCoordinates",
              latitude: homeData.mapLocation._latitude,
              longitude: homeData.mapLocation._longitude,
            },
            amenityFeature: amenitiesFeatures,
          },
          this.roomStructureData= {
            "@context": "http://schema.org/",
            "@graph": roomsLd,
          },
          this.roomStructureData1={
            "@context": "http://schema.org/",
            "@graph": roomsLd1,
          },
          this.banner= {
            hero_image: document.hero_image,
            title: document.page_title,
            tagline: document.page_description,
          }
            // return result.data

        })
          .catch((error) => {
          console.error(error);
          });
       
        // };
      } catch (e) {
        // Returns error page
        console.log("Error", e);
        // error({ statusCode: 404, message: "Page not found" });
      }
    
    // async fetch() {
      const similarAppartments = await axios.post(
        envVars.public.env.MODE === "prod"
          ? envVars.public.env.PROD_END_POINT
          : envVars.public.env.DEV_END_POINT,
        {
          neighborhoodId: this.homeDetails.neighborhoodId,
          cityId: this.homeDetails.cityId,
          operatorId: this.homeDetails.operatorId,
        },
        {
          headers: {
            Authorization:
            envVars.public.env.MODE === "prod"
                ? "Bearer " + envVars.public.env.PROD_COLIV_HQ_KEY
                : "Bearer " + envVars.public.env.DEV_COLIV_HQ_KEY,
          },
        }
      );
      var _this = this;
      _this.homeDetails.picturesArray.filter(function (item, index) {
        var list = [];
        Object.keys(item).map(function (key) {
          if (key.includes("versions")) {
            _this.homeDetails.picturesArray[index].versions = item[key].sort(
              (a, b) => (a.versionsName < b.versionsName ? 1 : -1)
            );
          }
        });
      });
      
      // Home details slice
      this.$store.commit("setSideFormTop", {
        name: this.homeDetails.name,
        image: "",
        description: "",
        price:
          this.homeDetails.listingType == "whole apartment"
            ? "Starting at " +
              this.homeDetails.priceCurrency +
              " " +
              Number(this.homeDetails.startingPrice).toLocaleString() +
              " " +
              this.homeDetails.priceUnit
            : "",
      });
  
      // Similar homes
      if (this.homeDetails.similar_homes) {
        let homeList = [];
        let homeIdsArr = [];
        let curHomeId = this.$route.params.uid;
        let homeListWithNoAvailable = [];
        homeIdsArr.push(curHomeId);
        if (similarAppartments.data.data.length > 0) {
          similarAppartments.data.data.forEach(function (appartment, index) {
            if (
              appartment.homeId != undefined &&
              appartment.homeId != curHomeId
            ) {
              homeIdsArr.push(appartment.homeId);
              // Extract unique room price
              let roomPrice = [];
              let isPromo = false;
              let availableRoomCount = 0;
              let priceCurrency = "";
              let startingPrice = 0;
              let roomType = [];
              if (appartment.rooms != undefined && appartment.rooms.length > 0) {
                appartment.rooms.forEach(function (item, i) {
                  if (
                    item.availability == "Available" ||
                    item.availability == "At least a room available" ||
                    item.availability == "Available soon"
                  ) {
                    availableRoomCount++;
  
                    if (item.startingPrice != undefined) {
                      roomPrice.push({
                        startingPrice: item.startingPrice,
                        priceCurrency: item.priceCurrency,
                        promoPrice: false,
                      });
                    }
                    if (
                      item.priceScales != undefined &&
                      item.priceScales.length > 0
                    ) {
                      item.priceScales.forEach(function (promoRow) {
                        if (promoRow.priceType == "Promo") {
                          isPromo = true;
                          roomPrice.push({
                            startingPrice: promoRow.priceAmount,
                            priceCurrency: item.priceCurrency,
                            promoPrice: true,
                          });
                        }
                      });
                    }
                  }
                });
                // Sort array in assending order ro extract small price
                roomPrice.sort((a, b) =>
                  a.startingPrice > b.startingPrice ? 1 : -1
                );
  
                if (roomPrice.length > 0) {
                  roomPrice = roomPrice.slice(0, 1); // Extract 1st element from array as starting price
                  startingPrice = roomPrice[0].startingPrice;
                  priceCurrency = roomPrice[0].priceCurrency;
                }
                // Extract unique room type
                roomType = [
                  ...new Set(appartment.rooms.map((item) => item.type)),
                ];
              }
              var cardImg = {
                url: "",
                altText: "",
              };
              if (
                appartment.picture != undefined &&
                appartment.picture.versions.length > 0
              ) {
                cardImg.altText = appartment.picture.description;
                appartment.picture.versions.forEach(function (image) {
                  if (image.versionsName == "card") {
                    cardImg.url = image.link;
                  }
                });
              }
              if (
                appartment.listingType != undefined &&
                appartment.listingType != ""
              ) {
                roomType.push(appartment.listingType);
              }
              homeList.push({
                homeID: appartment.homeId,
                banner: cardImg,
                cityName: appartment.cityName,
                name: appartment.name,
                neighborhoodName: appartment.neighbourhoodName,
                address: appartment.address,
                description:
                  appartment.description != null &&
                  appartment.description.length > 100
                    ? appartment.description.substring(0, 100) + "..."
                    : appartment.description,
                startingPrice: startingPrice,
                priceCurrency: priceCurrency,
                availability: appartment.availability,
                roomType: roomType,
                totalBedrooms: appartment.totalBedrooms,
                isPromo: isPromo,
                availableRoomCount: availableRoomCount,
                forStudents: appartment.forStudents
              });
            }
          });
          if (homeList.length < 4) {
            const newSimilarAppartments = await axios.post(
                envVars.public.env.MODE === "prod"
                ? envVars.public.env.PROD_END_POINT
                : envVars.public.env.DEV_END_POINT,
              {
                neighborhoodId: "",
                cityId: this.homeDetails.cityId,
                operatorId: this.homeDetails.operatorId,
              },
              {
                headers: {
                  Authorization:
                  envVars.public.env.MODE === "prod"
                      ? "Bearer " + envVars.public.env.PROD_COLIV_HQ_KEY
                      : "Bearer " + envVars.public.env.DEV_COLIV_HQ_KEY,
                },
              }
            );
            newSimilarAppartments.data.data.forEach(function (appartment, index) {
              if (
                appartment.homeId != undefined &&
                !homeIdsArr.includes(appartment.homeId)
              ) {
                // Extract unique room price
                homeIdsArr.push(appartment.homeId);
                let roomPrice = [];
                let isPromo = false;
                let availableRoomCount = 0;
                let roomType = [];
                let priceCurrency = "";
                let startingPrice = 0;
                if (appartment.rooms != undefined) {
                  appartment.rooms.forEach(function (item, i) {
                    if (
                      item.availability == "Available" ||
                      item.availability == "At least a room available" ||
                      item.availability == "Available soon"
                    ) {
                      availableRoomCount++;
                      if (item.startingPrice != undefined) {
                        roomPrice.push({
                          startingPrice: item.startingPrice,
                          priceCurrency: item.priceCurrency,
                          promoPrice: false,
                        });
                      }
                      if (
                        item.priceScales != undefined &&
                        item.priceScales.length > 0
                      ) {
                        item.priceScales.forEach(function (promoRow) {
                          if (promoRow.priceType == "Promo") {
                            isPromo = true;
                            roomPrice.push({
                              startingPrice: promoRow.priceAmount,
                              priceCurrency: item.priceCurrency,
                              promoPrice: true,
                            });
                          }
                        });
                      }
                    }
                  });
                  // Sort array in assending order ro extract small price
                  roomPrice.sort((a, b) =>
                    a.startingPrice > b.startingPrice ? 1 : -1
                  );
                  if (roomPrice.length > 0) {
                    roomPrice = roomPrice.slice(0, 1); // Extract 1st element from array as starting price
                    startingPrice = roomPrice[0].startingPrice;
                    priceCurrency = roomPrice[0].priceCurrency;
                  }
  
                  // Extract unique room type
                  let roomType = [
                    ...new Set(appartment.rooms.map((item) => item.type)),
                  ];
                }
                var cardImg = {
                  url: "",
                  altText: "",
                };
                if (
                  appartment.picture != undefined &&
                  appartment.picture.versions.length > 0
                ) {
                  cardImg.altText = appartment.picture.description;
                  appartment.picture.versions.forEach(function (image) {
                    if (image.versionsName == "card") {
                      cardImg.url = image.link;
                    }
                  });
                }
                if (
                  appartment.listingType != undefined &&
                  appartment.listingType != ""
                ) {
                  roomType.push(appartment.listingType);
                }
                if (
                  appartment.availability == "Available" ||
                  appartment.availability == "Available soon" ||
                  appartment.availability == "At least a room available"
                ) {
                  homeList.push({
                    homeID: appartment.homeId,
                    banner: cardImg,
                    cityName: appartment.cityName,
                    name: appartment.name,
                    neighborhoodName: appartment.neighbourhoodName,
                    address: appartment.address,
                    description:
                      appartment.description != null &&
                      appartment.description.length > 100
                        ? appartment.description.substring(0, 100) + "..."
                        : appartment.description,
                    startingPrice: startingPrice,
                    priceCurrency: priceCurrency,
                    availability: appartment.availability,
                    roomType: roomType,
                    totalBedrooms: appartment.totalBedrooms,
                    isPromo: isPromo,
                    availableRoomCount: availableRoomCount,
                    forStudents: appartment.forStudents
                  });
                } else {
                  homeListWithNoAvailable.push({
                    homeID: appartment.homeId,
                    banner: cardImg,
                    cityName: appartment.cityName,
                    name: appartment.name,
                    neighborhoodName: appartment.neighbourhoodName,
                    address: appartment.address,
                    description:
                      appartment.description != null &&
                      appartment.description.length > 100
                        ? appartment.description.substring(0, 100) + "..."
                        : appartment.description,
                    startingPrice: startingPrice,
                    priceCurrency: priceCurrency,
                    availability: appartment.availability,
                    roomType: roomType,
                    totalBedrooms: appartment.totalBedrooms,
                    isPromo: isPromo,
                    availableRoomCount: availableRoomCount,
                    forStudents: appartment.forStudents
                  });
                }
              }
            });
            homeList = homeList.concat(homeListWithNoAvailable);
          }
        }
        this.homeLists = homeList;
      }
  
      if (this.homeLists != undefined && this.homeLists.length > 0) {
        this.slices = [
          {
            slice_type: "similar_cards",
            slice_devider: true,
            items: this.homeLists,
            primary: {
              title: [
                {
                  spans: [],
                  text: "Similar homes",
                  type: "heading2",
                },
              ],
              slice_section: "similar_cards",
              background_color: "rgb(245, 245, 245)",
            },
          },
          ...this.slices,
        ];
      }
  
      this.sideFormSlice = [
        {
          slice_type: "form",
          slice_label: "homedetails",
          homeID: this.$route.params.uid,
          OperatorID: this.homeDetails.operatorId,
          neighborhoodId: this.homeDetails.neighborhoodId,
          buildingId: this.homeDetails.buildingId,
          homeName: this.homeDetails.name,
          cityName: this.homeDetails.cityName,
          cityID: this.homeDetails.cityId,
          linkSchedule: this.homeDetails.linkSchedule,
          threeDtourLink: this.homeDetails["3DtourLink"],
          isThreeDtour: this.homeDetails.threeD_tour,
          sideFormBackgroundColor: this.homeDetails.side_form_background_color,
          anyRoomAvailable: this.anyRoomAvailable,
          items: this.homeDetails.roomsArray,
          room_image: this.homeDetails.room_image,
          isBottomShow: false,
        },
      ];
      this.slices = [
        {
          slice_type: "form",
          slice_label: "adjustForm",
          homeID: this.$route.params.uid,
          OperatorID: this.homeDetails.operatorId,
          neighborhoodId: this.homeDetails.neighborhoodId,
          buildingId: this.homeDetails.buildingId,
          homeName: this.homeDetails.name,
          cityName: this.homeDetails.cityName,
          cityID: this.homeDetails.cityId,
          linkSchedule: this.homeDetails.linkSchedule,
          threeDtourLink: this.homeDetails["3DtourLink"],
          isThreeDtour: this.homeDetails.threeD_tour,
          sideFormBackgroundColor: this.homeDetails.side_form_background_color,
          anyRoomAvailable: this.anyRoomAvailable,
          items: this.homeDetails.roomsArray,
          room_image: this.homeDetails.room_image,
        },
        ...this.slices,
      ];
  
      /* this.slices = [{
              slice_type: 'form',
              slice_label: 'homedetails',
              homeID: this.$route.params.uid,
              OperatorID: this.homeDetails.operatorId,
              neighborhoodId: this.homeDetails.neighborhoodId,
              buildingId: this.homeDetails.buildingId,
              homeName: this.homeDetails.name,
              cityName: this.homeDetails.cityName,
              cityID: this.homeDetails.cityId,
              linkSchedule: this.homeDetails.linkSchedule,
              threeDtourLink: this.homeDetails['3DtourLink'],
              isThreeDtour: this.homeDetails.threeD_tour,
              sideFormBackgroundColor: this.homeDetails.side_form_background_color,
              anyRoomAvailable: this.anyRoomAvailable,
              items: this.homeDetails.roomsArray,
              room_image: this.homeDetails.room_image,
              isBottomShow: true,
          }, ...this.slices] */
      // Spacer slice
      this.slices = [
        {
          slice_type: "spacer",
          slice_label: null,
          items: [],
          primary: {
            pixels: 50,
          },
        },
        ...this.slices,
      ];
  
      // Map slice
      if (_this.homeDetails.map) {
        /* this.slices = [{
                  primary:{
                      home: {
                          latitude: this.homeDetails.mapLocation._latitude,
                          longitude: this.homeDetails.mapLocation._longitude
                      },
                      marker: {
                          url: "/mapMarker.png"
                      },
                      map_title: [
                          {
                              spans: [],
                              text:"Location",
                              type:"heading2"
                          }
                      ]
                  },
                  slice_type: 'map',
                  slice_devider: true,
                  slice_label: null,
                  items: [],
              }, ...this.slices] */
        this.mapSlice = {
          primary: {
            home: {
              latitude: this.homeDetails.mapLocation._latitude,
              longitude: this.homeDetails.mapLocation._longitude,
            },
            marker: {
              url: "/mapMarker.png",
            },
            map_title: [
              {
                spans: [],
                text: "Location",
                type: "heading2",
              },
            ],
          },
          slice_type: "map",
          slice_devider: true,
          slice_label: null,
          items: [],
        };
      }
  
      // Spacer slice
      this.slices = [
        {
          slice_type: "spacer",
          slice_label: null,
          items: [],
          primary: {
            pixels: 50,
          },
        },
        ...this.slices,
      ];
  
      // Embed slice
      if (
        this.homeDetails.threeD_tour &&
        this.homeDetails["3DtourLink"] != null
      ) {
        this.embedSlice = {
          embed_url: this.homeDetails["3DtourLink"],
          height: 480,
          html:
            '<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m=' +
            this.homeDetails["3DtourLink"].split("?m=").pop() +
            '" ></iframe>',
        };
        this.slices = [
          {
            slice_type: "embed_section",
            slice_devider: true,
            slice_label: null,
            items: [],
            primary: {
              embed: {
                embed_url: this.homeDetails["3DtourLink"],
                height: 480,
                html:
                  '<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m=' +
                  this.homeDetails["3DtourLink"].split("?m=").pop() +
                  '" ></iframe>',
                width: 640,
              },
              embed_html: [],
              title: [
                {
                  spans: [],
                  text: "Virtual Tour",
                  type: "heading2",
                },
              ],
            },
          },
          ...this.slices,
        ];
      }
  
      // Spacer slice
      this.slices = [
        {
          slice_type: "spacer",
          slice_label: null,
          items: [],
          primary: {
            pixels: 50,
          },
        },
        ...this.slices,
      ];
  
      //  Room mates slice Ideal For
      if (this.homeDetails.idealAge != undefined) {
        var idealFor = [];
        if (this.homeDetails.idealFor != undefined) {
          //idealFor.assign({'idealFor': this.homeDetails.idealFor})
          idealFor["idealFor"] = this.homeDetails.idealFor;
        }
        if (this.homeDetails.idealAge != undefined) {
          idealFor["idealAge"] = this.homeDetails.idealAge;
        }
        if (this.homeDetails.idealGender != undefined) {
          idealFor["idealGender"] = this.homeDetails.idealGender;
        }
        this.slices = [
          {
            isBuildingPage: "Yes",
            slice_type: "image_gallery",
            slice_label: "avatars_idealfor",
            slice_devider: true,
            idealFor: idealFor,
            primary: {
              background_color: null,
              gallery_title: [
                {
                  spans: [],
                  text: "Ideal For",
                  type: "heading3",
                },
              ],
              align: "left",
            },
          },
          ...this.slices,
        ];
      }
  
      //  Room mates slice
      if (
        this.homeDetails.housemates &&
        this.homeDetails.housematesArray != undefined &&
        this.homeDetails.housematesArray.length > 0
      ) {
        this.slices = [
          {
            isBuildingPage: "Yes",
            slice_type: "image_gallery",
            slice_label: "avatars",
            slice_devider: true,
            items: this.homeDetails.housematesArray,
            primary: {
              background_color: null,
              gallery_title: [
                {
                  spans: [],
                  text: "Housemates",
                  type: "heading2",
                },
              ],
              align: "left",
            },
          },
          ...this.slices,
        ];
      }
      // Spacer slice
      this.slices = [
        {
          slice_type: "spacer",
          slice_label: null,
          items: [],
          primary: {
            pixels: 50,
          },
        },
        ...this.slices,
      ];
  
      // Amenities slice
      if (
        this.homeDetails.amenitiesArray != undefined &&
        this.homeDetails.amenitiesArray.length > 0
      ) {
        this.slices = [
          {
            slice_type: "image_gallery",
            slice_label: "icons",
            slice_devider: true,
            background_color: this.homeDetails.amenities_background_color,
            items: this.homeDetails.amenitiesArray,
            primary: {
              gallery_title: [
                {
                  spans: [],
                  text: "Amenities",
                  type: "heading2",
                },
              ],
              align: "left",
            },
          },
          ...this.slices,
        ];
      }
  
      // Spacer slice
      this.slices = [
        {
          slice_type: "spacer",
          slice_label: null,
          items: [],
          primary: {
            pixels: 50,
          },
        },
        ...this.slices,
      ];
  
      // Rooms slice
      if (
        this.homeDetails.roomsArray != undefined &&
        this.homeDetails.roomsArray.length > 0
      ) {
        this.slices = [
          {
            primary: {
              title: [
                {
                  spans: [],
                  text: "Select Your Room",
                  type: "heading2",
                },
              ],
            },
            slice_type: "rooms",
            ishomeDetailPage: true,
            slice_devider: true,
            room_image: this.homeDetails.room_image,
            background: this.homeDetails.rooms_background_color,
            slice_label: null,
            housemates: this.homeDetails.housematesArray,
            items: this.homeDetails.roomsArray.sort((a, b) =>
              parseFloat(a.startingPrice) == parseFloat(b.startingPrice)
                ? 1
                : parseFloat(a.startingPrice) < parseFloat(b.startingPrice)
                ? 1
                : -1
            ),
          },
          ...this.slices,
        ];
      
  
      /* // Spacer slice
          this.slices = [{
              slice_type: 'spacer',
              slice_label: null,
              items: [],
              primary: {
                  pixels:50,
                  background_color: 'red'
              }
          }, ...this.slices] */
    }
    },
    fetchOnServer: false,
  };
  </script>
  <style scoped>
  h3 {
    font-size: 32px;
  }
  .nb-main img {
    width: 60px;
    vertical-align: middle;
  }
  .nb-main .nb-label {
    display: inline-block;
    vertical-align: middle;
    font-size: 25px;
    color: #000;
  }
  
  .icon_ {
    font-size: 25px;
  }
  /* --------------findhome-card-tabs--------- */
  .find-home-carousel-with-tabs {
    margin-bottom: 167px;
  }
  .findhome-card-tabs {
    position: absolute;
    bottom: -77px;
    left: 50%;
    transform: translateX(-50%);
    width: 1088px;
  }
  .findhome-card-tabs .tab-content .card-body {
    padding: 0 !important;
    border: 0 !important;
    min-height: auto !important;
  }
  /* Slider Bottom */
  .home-detail {
    margin-top: 90px;
  }
  .home-detail .home-detail-slider .home-detail-title h1 {
    font-weight: bold;
    font-size: 38px;
  }
  .home-detail .home-detail-slider .home-detail-slider-content {
    z-index: 99;
    position: relative;
    margin-bottom: 40px;
    letter-spacing: normal;
  }
  .icons-details .icon-wrap svg {
    color: rgb(114, 191, 68);
  }
  .home-detail
    .home-detail-slider
    .home-detail-slider-content
    .home-detail-topics {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 20px;
    min-height: 70px;
  }
  .home-detail
    .home-detail-slider
    .home-detail-slider-content
    .home-detail-topics
    .topic {
    background-color: #feefef;
    border: 1px solid #ef5357;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    min-width: 80px;
    margin-top: 5px;
    text-align: center;
  }
  .home-detail .home-detail-slider .home-detail-title > :first-child {
    color: #000;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: normal;
  }
  .home-detail .home-detail-slider .icons-details p {
    margin-bottom: 0;
    margin-right: 5px;
  }
  .home-detail .home-detail-slider .icons-details .icon {
    background: #f7f7f7;
  }
  .home-detail .home-detail-slider .icons-details .icon-3 .desc {
    display: block;
  }
  .home-detail .home-detail-slider .icons-details .desc {
    font-size: 18px;
    font-weight: 700;
    color: #000;
    text-transform: capitalize;
    line-height: 22px;
    min-width: 146px;
    min-height: 44px;
  }
  .home-detail .home-detail-slider .icons-details {
    display: inline-block;
  }
  .home-detail .home-detail-slider .build-desc p {
    color: #000;
    font-size: 21px;
    font-weight: 400;
    line-height: 31.5px;
  }
  .home-detail .home-detail-slider .icons-details .icon:nth-child(n + 5) {
    margin-top: 15px;
  }
  .home-detail .home-detail-slider .slider-item .slider-img {
    overflow: hidden;
    width: 100%;
    display: block;
  }
  .home-detail .home-detail-slider-content .build-desc a {
    font-size: 16px;
  }
  /* Slider section */
  .home-detail .home-detail-slider .VueCarousel-navigation-button {
    top: 35%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 0;
    border-radius: 0.3125rem;
    padding: 0;
    outline: 0;
  }
  .home-detail .home-detail-slider .VueCarousel-navigation-button .angle-left {
    position: relative;
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button
    .cust-icon:before,
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button
    .cust-icon:after {
    content: "";
    position: absolute;
    height: 13px;
    width: 75px;
    background-color: #72bf44;
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-prev
    .cust-icon.angle-left:before {
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-prev
    .cust-icon.angle-left:after {
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
    top: 59px;
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-next
    .cust-icon.angle-right:before {
    right: 10px;
    left: auto;
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-next
    .cust-icon.angle-right:after {
    right: 10px;
    left: auto;
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
    top: 79px;
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-prev {
    left: 15px;
    right: auto;
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-next {
    right: 15px;
    left: auto;
  }
  .home-detail .home-detail-slider .VueCarousel-navigation-button .fa {
    color: rgba(255, 255, 255, 1);
  }
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-prev,
  .home-detail
    .home-detail-slider
    .VueCarousel-navigation-button.VueCarousel-navigation-next {
    padding: 0px 18px !important;
  }
  .VueCarousel-pagination {
    position: relative;
    top: -120px;
  }
  /* 05/06/2020 - DAB */
  .home-detail .room-wrapper .room-detail .feature ul li {
    width: 100%;
  }
  .home-detail-slider .find-home-carousel-with-tabs img {
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    width: 100%;
  }
  /* slider content bottom section - DAB */
  .homepage hr {
    border-color: #f3f3f3;
    margin-left: 15px;
    margin-right: 15px;
  }
  .home-detail-slider .home-detail-slider-content .city-text {
    font-size: 16px;
    color: #8d8d8d;
    line-height: 19px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .home-detail .home-detail-slider .icons-details .icon .icon-wrap i {
    vertical-align: middle;
  }
  .home-detail .home-detail-slider .home-detail-address {
    color: #000;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }
  .home-detail .cust-findhome-wrap {
    position: relative;
  }
  /* select room */
  .home-detail .new-room-box .detail-inner .type h3 {
    color: #222;
    line-height: normal;
  }
  .home-detail .new-room-box .detail-inner .price p {
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 15px;
    margin-top: 8px;
    color: #72bf44;
  }
  .home-detail .new-room-box .detail-inner .desc {
    position: relative;
  }
  .home-detail .new-room-box .detail-inner .desc::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .home-detail .new-room-box .room-main {
    box-shadow: -1px 7px 20px 0px rgb(0 0 0 / 8%);
  }
  .home-detail .new-room-box .detail-inner .desc .feature {
    color: #222;
    font-size: 14px;
    padding-left: 20px;
    margin-bottom: 0;
  }
  .home-detail .new-room-box .detail-inner:nth-child(n + 1).desc {
    margin-top: 5px;
  }
  .home-detail .new-room-box .detail-inner .request-btn {
    border: 1px solid #ddd;
    padding: 5px;
    color: #222;
    margin-top: 15px;
    display: block;
    text-align: center;
    text-decoration: none;
    background-color: #fff;
  }
  
  :deep(.homeDetailsDescription a) {
      color: #000;
      font-size: 19px;
    line-height: 25px;
  }
  /* image-gallery  */
  .home-detail
    .image-gallery.content-section
    .section-main-title
    .cms-title
    :first-child
    .view-more {
    color: #72bf44;
  }
  /* similar homes  */
  .home-detail .building-cms .building-card .name {
    color: #222;
    line-height: 22px;
  }
  .home-detail .building-cms .building-card .content-wrap .desc-box {
    padding: 20px 15px;
  }
  .home-detail .cust-findhome-wrap .building-main-outer .vhl-container {
    margin-left: -8px !important;
    margin-right: -8px !important;
  }
  .home-detail .cust-findhome-wrap .building-main-outer {
    background-color: #f5f5f5;
    padding-top: 100px;
  }
  .home-detail .cust-findhome-wrap .building-card .card-main {
    margin-bottom: 0 !important;
  }
  .home-detail .building-main-outer .building-card .vhl-container .vhl-item {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
  
  @media (max-width: 767px) {
    .VueCarousel-navigation-button.VueCarousel-navigation-next,
    .VueCarousel-navigation-button.VueCarousel-navigation-prev {
      display: none;
    }
    .home-detail-slider .VueCarousel .VueCarousel-slide img {
      max-height: 300px;
      height: 100% !important;
    }
    .home-detail-slider .VueCarousel .VueCarousel-slide {
      height: 300px !important;
    }
    .find-home-carousel .VueCarousel-dot-container {
      bottom: 30px;
    }
    .find-home-carousel-with-tabs {
      margin-bottom: 40px;
    }
  }
  @media (max-width: 1199px) {
    .home-detail-slider .home-detail-slider-content .city-text {
      font-size: 13px;
    }
    .home-detail .home-detail-slider .home-detail-title > :first-child {
      font-size: 22px;
    }
    .home-detail .home-detail-slider .icons-details .desc {
      min-width: 120px;
      min-height: 38px;
      font-size: 16px;
    }
    .home-detail .home-detail-slider .home-detail-address {
      font-size: 16px;
    }
    .home-detail .home-detail-slider .build-desc p {
      font-size: 17px;
      line-height: 25px;
    }
    /* --------------findhome-card-tabs--------- */
    .findhome-card-tabs {
      width: 100%;
      position: initial;
      transform: none;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .home-detail-slider .find-home-carousel-with-tabs .VueCarousel-slide {
      margin-bottom: 12px;
    }
    .home-detail-slider .find-home-carousel-with-tabs img {
      height: calc(100% + 12px);
    }
    .findhome-card-tabs {
      max-width: 90%;
      position: absolute;
      transform: translateX(-50%);
      bottom: -65px;
    }
    .find-home-carousel-with-tabs {
      margin-bottom: 130px;
    }
  }
  @media (min-width: 992px) and (max-width: 1400px) {
    .home-detail-slider .find-home-carousel-with-tabs .VueCarousel-slide {
      margin-bottom: 12px;
    }
    .home-detail-slider .find-home-carousel-with-tabs img {
      height: calc(100% + 12px);
    }
    .findhome-card-tabs {
      max-width: 70%;
      position: absolute;
      transform: translateX(-50%);
      bottom: -65px;
    }
    .find-home-carousel-with-tabs {
      margin-bottom: 140px;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    .home-detail-slider .home-detail-slider-content .city-text {
      font-size: 14px;
    }
    .home-detail .home-detail-slider .home-detail-title > :first-child {
      font-size: 23px;
    }
    .home-detail .home-detail-slider .icons-details .desc {
      min-width: 130px;
      min-height: 40px;
      font-size: 17px;
    }
    .home-detail .home-detail-slider .home-detail-address {
      font-size: 17px;
    }
    .home-detail .home-detail-slider .build-desc p {
      font-size: 18px;
      line-height: 28px;
    }
  }
  .whole-apartment-price {
    font-size: 20px;
    color: #72bf44;
    font-weight: 700;
  }
  .side-form-wrapper {
    padding: 0px;
  }
  </style>
  