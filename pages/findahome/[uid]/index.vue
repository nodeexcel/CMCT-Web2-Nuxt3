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
          <!-- <div v-if="Homedetails" class="loader"></div> -->
          <client-only  v-if="Homedetails">
            <div class="position-relative find-home-carousel-with-tabs">
              <carousel
                v-show="activeTab == 1"
                class="find-home-carousel"
                v-if="
                  Homedetails.hero_banner &&
                  Homedetails.hero_banner.toLowerCase() === 'slider'
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
                  v-for="(images, index) in Homedetails.picturesArray"
                  :key="index"
                  :style="{ height: JSON.stringify(css) - 174 + 'px' }"
                >
                  <picture class="slider-img" v-if="images">
                    <template v-for="(image, inx) in images.versions"  :key="inx">
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
                    Homedetails.threeD_tour &&
                    Homedetails['3DtourLink'] != null
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
                        Homedetails.threeD_tour &&
                        Homedetails['3DtourLink'] != null
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
                Homedetails.hero_banner &&
                Homedetails.hero_banner.toLowerCase() != 'slider'
              "
            >
              <template
                v-for="(image, inx) in Homedetails.picturesArray[0].versions"  :key="inx"
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

          <div class="inner-content-wrapper mb-0 mb-xl-5 pb-xl-5" v-if="Homedetails">
            <div class="cms-main-wrap">
              <div class="row">
                <div class="col-md-9">
                  <div class="home-detail-slider-content">
                    <div class="nb-main mt-3 row">
                      <!-- <i class="fa fa-map icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i> -->
                      <div class="col-md-12 mb-1 mb-xl-3">
                        <div class="city-text">
                          {{ Homedetails.cityName }},
                          {{ Homedetails.neighbourhoodName }}
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="home-detail-title">
                          <h1 class="mb-2 mb-xl-4">{{ Homedetails.name }}</h1>
                        </div>
                      </div>
                      <div class="col-sm-6 mb-3 mb-sm-0 text-sm-right">
                        <div class="row justify-content-start justify-content-md-end">
                          <div
                            v-if="Homedetails.totalBedrooms != null"
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
                                <p>{{ Homedetails.totalBedrooms }} bedrooms</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-start justify-content-md-end">
                          <div
                            v-if="Homedetails.totalBathrooms != null"
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
                                <p>{{ Homedetails.totalBathrooms }} bathrooms</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-2 pl-0">
                        <div v-if="Homedetails.forStudents == 1" class="student-logo">
                          <img src="~/public/casamia_forstudents-4@4x.png" alt="student_logo">
                        </div>
                    </div>
                    <div class="home-detail-address mb-3 mb-xl-5">
                      {{ Homedetails.address }}
                    </div>
                    <div class="build-desc">
                      <p v-html="Homedetails.description" class="homeDetailsDescription"></p>
                    </div>
                    <p
                      v-if="Homedetails.listingType == 'whole apartment'"
                      class="whole-apartment-price"
                    >
                      {{
                        "Starting at " +
                        Homedetails.priceCurrency +
                        " " +
                        Number(Homedetails.startingPrice).toLocaleString() +
                        " " +
                        Homedetails.priceUnit
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

<script setup>
import { onMounted } from 'vue';
import { client } from '~/prismic/prismic'
import axios from 'axios';
import { useStore } from 'vuex'


let activeTab= ref(1)
let slices = ref(null)
let homeDetails = ref(null)
let Homedetails = ref (null)
let anyRoomAvailable = ref(null)
let mapSlice = ref([])
mapSlice = ref({})
let meta_title = ref(null)
let meta_description = ref(null)
let meta_image = ref(null)
let meta_site_name = ref(null)
let meta_url = ref(null)
let structuredData = ref({})
let roomStructureData = ref({})
let roomStructureData1 = ref({})
let homeLists = ref("")
let sideFormSlice = ref("")
let embedSlice = ref("")
let banner = ref({})
  // import axios from 'axios';
  onMounted( async () => {
    // console.log(" homeDetails.data", homeDetails.value      console.log("123",client, client.getSingle("homes"))

});
  const { data } = await useAsyncData(async () => {
    const store = useStore()
    const router = useRoute()
    const envVars = useRuntimeConfig();
    console.log("12",client, client.getSingle("homes"),router)
    let page2 = 3
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    client.getSingle("homes").then(async (result) => {
      const document  = result.data
          //  page.value = result
           console.log("12",client, client.getSingle("homes"))
           var homeData 

        const appartments = await axios.post(
          envVars.public.env.MODE === "prod"
            ? envVars.public.env.PROD_END_POINT
            : envVars.public.env.DEV_END_POINT,
          {
            homeId: router.params.uid,
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
        ).then((result) => {
          console.log("result",result)
           homeData = result.data;
          console.log("in 67",document)

          var meta_image = null;
        if (
          homeData.data[0].picturesArray != undefined &&
          homeData.data[0].picturesArray.length > 0
        ) {
          homeData.data[0].picturesArray[0].versions.forEach(function (image) {
            if (image.versionsName == "desk") {
              console.log("image1",image)
              meta_image = image.link;
              
            }
          });
        }
        let amenitiesFeatures = [];
        // console.log("appartments",homeData)
        homeData.data[0].amenitiesArray = homeData.data[0].amenitiesArray.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        homeData.data[0].amenitiesArray.forEach(function (feature) {
          amenitiesFeatures.push({
            "@type": "http://schema.org/LocationFeatureSpecification",
            name: feature.name,
            value: "true",
          });
        });
        let roomsLd = [];
        let roomsLd1 = [];
        let anyRoomAvailable = false;
        if (homeData.data[0].roomsArray != undefined) {
          homeData.data[0].roomsArray.forEach(function (room) {
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
              name: room.roomName + " at " + homeData.data[0].name,
              image: roomsLdImgs,
              description: room.description,
              sku: router.params.uid,
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
  
        (homeData.data[0]["threeD_tour"] = document["3d_tours"]),
          (homeData.data[0]["hero_banner"] = document.hero_banner),
          (homeData.data[0]["amenities_background_color"] =
            document.amenities_background_color),
          (homeData.data[0]["side_form_background_color"] =
            document.amenities_background_color),
          (homeData.data[0]["housemates"] = document.housemates),
          (homeData.data[0]["map"] = document.map),
          (homeData.data[0]["room_image"] = document.room_image),
          (homeData.data[0]["rooms_background_color"] = document.rooms_background_color),
          (homeData.data[0]["similar_homes"] = document.similar_homes);
        // return {
          slices.value = document.body
          // console.log("homeDatahomeDatahomeDatahomeData",homeData.data[0]);
          homeDetails.value = JSON.parse(JSON.stringify(homeData.data[0]))
          // console.log("5464",homeDetails.value,anyRoomAvailable);
          // anyRoomAvailable.value = anyRoomAvailable
          mapSlice.value = []
          //SEO
          meta_title.value = homeData.data[0].name
          meta_description.value =
            homeData.data[0].description && homeData.data[0].description != null
              ? homeData.data[0].description.length > 170
                ? homeData.data[0].description.substring(0, 167) + "..."
                : homeData.data[0].description
              : ""
             
          meta_image = meta_image
          console.log("image2",typeof meta_image,meta_image)
          meta_site_name.value = envVars.public.env.COMPANY_NAME
          meta_url.value = envVars.public.env.BASE_URL + "/findahome/" + router.params.uid
          structuredData.value = {
            "@context": "http://schema.org/",
            "@type": "Apartment",
            accommodationCategory: "Apartment",
            address:
              homeData.data[0].address +
              " " +
              homeData.data[0].postalCode +
              " " +
              homeData.data[0].cityName,
            description: homeData.data[0].description,
            image: meta_image.value,
            name: homeData.data[0].name,
            numberOfRooms: homeData.data[0].totalBedrooms,
            url: envVars.public.env.BASE_URL + "/findahome/" + router.params.uid,
            // geo: {
            //   "@type": "GeoCoordinates",
            //   latitude: homeData.mapLocation._latitude,
            //   longitude: homeData.mapLocation._longitude,
            // },
            amenityFeature: amenitiesFeatures,
          }
          roomStructureData.value = {
            "@context": "http://schema.org/",
            "@graph": roomsLd,
          }
          roomStructureData1.value = {
            "@context": "http://schema.org/",
            "@graph": roomsLd1,
          }
          banner.value = {
            hero_image: document.hero_image,
            title: document.page_title,
            tagline: document.page_description,
          }
          // return result
          // console.log("201",banner.value);


          // new--------------------------------------------------

          // async fetch() {
    const similarAppartments =  axios.post(
      envVars.public.env.MODE === "prod"
        ? envVars.public.env.PROD_END_POINT
        : envVars.public.env.DEV_END_POINT,
      {
        neighborhoodId: homeDetails.value.neighborhoodId,
        cityId: homeDetails.value.cityId,
        operatorId: homeDetails.value.operatorId,
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
    // console.log("231",similarAppartments,homeDetails.value);
    // var _this = this;
    homeDetails.value.picturesArray.filter(function (item, index) {
      var list = [];
      // console.log("ok");
      Object.keys(item).map(function (key) {
        if (key.includes("versions")) {
          homeDetails.value.picturesArray[index].versions = item[key].sort(
            (a, b) => (a.versionsName < b.versionsName ? 1 : -1)
          );
          // console.log("ok1");
        }
      });
    });
    // console.log("ok1",homeDetails.value);
    // Home details slice
    store.commit("setSideFormTop", {
      name: homeDetails.value.name,
      image: "",
      description: "",
      price:
        homeDetails.value.listingType == "whole apartment"
          ? "Starting at " +
            homeDetails.value.priceCurrency +
            " " +
            Number(homeDetails.value.startingPrice).toLocaleString() +
            " " +
            homeDetails.value.priceUnit
          : "",
    });
    // console.log("store",store)
    // console.log("ok1",homeDetails.value);
    // Similar homes
    if (homeDetails.value) {
      // console.log("ok11",homeDetails.value);
      let homeList = [];
      let homeIdsArr = [];
      let curHomeId = router.params.uid;
      let homeListWithNoAvailable = [];
      homeIdsArr.push(curHomeId);
      similarAppartments.then(async (result) =>{
        if (result.data.data.length > 0) {
          result.data.data.forEach(function (appartment, index) {
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
        // console.log("ok1333",homeDetails.value,homeList);
        if (homeList.length < 4) {
          // console.log("ok1333444",homeDetails.value);
          const newSimilarAppartments = await axios.post(
            envVars.public.env.MODE === "prod"
              ? envVars.public.env.PROD_END_POINT
              : envVars.public.env.DEV_END_POINT,
            {
              neighborhoodId: "",
              cityId: homeDetails.value.cityId,
              operatorId: homeDetails.value.operatorId,
            },
            {
              headers: {
                Authorization:
                  envVars.public.env.MODE === "prod"
                    ? "Bearer " + envVars.public.env.PROD_COLIV_HQ_KEY
                    : "Bearer " + envVars.public.env.DEV_COLIV_HQ_KEY,
              },
            }
          ).then(async (result) =>{
            result.data.data.forEach(function (appartment, index) {
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

          }).catch((error) => {
          console.error(error);
          });
          
          homeList = homeList.concat(homeListWithNoAvailable);
        }
      }
      
    if (homeLists.value != undefined && homeLists.length > 0) {
      slices.value = [
        {
          slice_type: "similar_cards",
          slice_devider: true,
          items: homeLists.value,
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
        ...slices.value,
      ];
    }

    sideFormSlice.value = [
      {
        slice_type: "form",
        slice_label: "homedetails",
        homeID: router.params.uid,
        OperatorID: homeDetails.value.operatorId,
        neighborhoodId: homeDetails.value.neighborhoodId,
        buildingId: homeDetails.value.buildingId,
        homeName: homeDetails.value.name,
        cityName: homeDetails.value.cityName,
        cityID: homeDetails.value.cityId,
        linkSchedule: homeDetails.value.linkSchedule,
        threeDtourLink: homeDetails.value["3DtourLink"],
        isThreeDtour: homeDetails.value.threeD_tour,
        sideFormBackgroundColor: homeDetails.value.side_form_background_color,
        anyRoomAvailable: anyRoomAvailable,
        items: homeDetails.value.roomsArray,
        room_image: homeDetails.value.room_image,
        isBottomShow: false,
      },
    ];
      slices.value = [
      {
        slice_type: "form",
        slice_label: "adjustForm",
        homeID: router.params.uid,
        OperatorID: homeDetails.value.operatorId,
        neighborhoodId: homeDetails.value.neighborhoodId,
        buildingId: homeDetails.value.buildingId,
        homeName: homeDetails.value.name,
        cityName: homeDetails.value.cityName,
        cityID: homeDetails.value.cityId,
        linkSchedule: homeDetails.value.linkSchedule,
        threeDtourLink: homeDetails.value["3DtourLink"],
        isThreeDtour: homeDetails.value.threeD_tour,
        sideFormBackgroundColor: homeDetails.value.side_form_background_color,
        anyRoomAvailable: anyRoomAvailable,
        items: homeDetails.value.roomsArray,
        room_image: homeDetails.value.room_image,
      },
      ...slices.value,
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
    slices.value = [
      {
        slice_type: "spacer",
        slice_label: null,
        items: [],
        primary: {
          pixels: 50,
        },
      },
      ...slices.value,
    ];

    // Map slice
    // console.log("ok1333",homeDetails.value);
    if (homeDetails.value.map) {
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
      mapSlice.value = {
        primary: {
          home: {
            latitude: homeDetails.value.mapLocation._latitude,
            longitude: homeDetails.value.mapLocation._longitude,
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
    slices.value  = [
     {
        slice_type: "spacer",
        slice_label: null,
        items: [],
        primary: {
          pixels: 50,
        },
      },
      ...slices.value,
    ];

    // Embed slice
    if (
      homeDetails.value.threeD_tour &&
      homeDetails.value["3DtourLink"] != null
    ) {
      embedSlice.value = {
        embed_url: homeDetails.value["3DtourLink"],
        height: 480,
        html:
          '<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m=' +
          homeDetails.value["3DtourLink"].split("?m=").pop() +
          '" ></iframe>',
      };
      slices.value = [
        {
          slice_type: "embed_section",
          slice_devider: true,
          slice_label: null,
          items: [],
          primary: {
            embed: {
              embed_url: homeDetails.value["3DtourLink"],
              height: 480,
              html:
                '<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m=' +
                homeDetails.value["3DtourLink"].split("?m=").pop() +
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
        ...slices.value,
      ];
    }

    // Spacer slice
    slices.value = [
      {
        slice_type: "spacer",
        slice_label: null,
        items: [],
        primary: {
          pixels: 50,
        },
      },
      ...slices.value,
    ];

    //  Room mates slice Ideal For
    if (homeDetails.value.idealAge != undefined) {
      var idealFor = [];
      if (homeDetails.value.idealFor != undefined) {
        //idealFor.assign({'idealFor': homeDetails.value.idealFor})
        idealFor["idealFor"] = homeDetails.value.idealFor;
      }
      if (homeDetails.value.idealAge != undefined) {
        idealFor["idealAge"] = homeDetails.value.idealAge;
      }
      if (homeDetails.value.idealGender != undefined) {
        idealFor["idealGender"] = homeDetails.value.idealGender;
      }
      slices.value = [
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
        ...slices.value,
      ];
    }

    //  Room mates slice
    if (
      homeDetails.value.housemates &&
      homeDetails.value.housematesArray != undefined &&
      homeDetails.value.housematesArray.length > 0
    ) {
      slices.value = [
        {
          isBuildingPage: "Yes",
          slice_type: "image_gallery",
          slice_label: "avatars",
          slice_devider: true,
          items: homeDetails.value.housematesArray,
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
        ...slices.value,
      ];
    }
    // Spacer slice
    slices.value = [
      {
        slice_type: "spacer",
        slice_label: null,
        items: [],
        primary: {
          pixels: 50,
        },
      },
      ...slices.value,
    ];

    // Amenities slice
    if (
      homeDetails.value.amenitiesArray != undefined &&
      homeDetails.value.amenitiesArray.length > 0
    ) {
      slices.value = [
        {
          slice_type: "image_gallery",
          slice_label: "icons",
          slice_devider: true,
          background_color: homeDetails.value.amenities_background_color,
          items: homeDetails.value.amenitiesArray,
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
        ...slices.value,
      ];
    }

    // Spacer slice
   

    // Rooms slice
    if (
      homeDetails.value.roomsArray != undefined &&
      homeDetails.value.roomsArray.length > 0
    ) {
      slices.value = [
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
          room_image: homeDetails.value.room_image,
          background: homeDetails.value.rooms_background_color,
          slice_label: null,
          housemates: homeDetails.value.housematesArray,
          items: homeDetails.value.roomsArray.sort((a, b) =>
            parseFloat(a.startingPrice) == parseFloat(b.startingPrice)
              ? 1
              : parseFloat(a.startingPrice) < parseFloat(b.startingPrice)
              ? 1
              : -1
          ),
        },
        ...slices.value,
      ];
    }
      // console.log("ok1333okfinaloooooooooooo",homeDetails.value);
      Homedetails.value = homeDetails.value
      // console.log("ok1333okfinalooooooooooooDob",Homedetails.value);
      }).catch((error) => {
          console.error(error);
          });
          // console.log("ok1333okfinalno",homeDetails.value);
      homeLists.value = homeList;
    }
    // console.log("ok1333ok",homeDetails.value);

    

        }).catch((error) => {
          console.error(error);
          });

          // appartments.then((data)=>{
          //   // console.log("in 74",data);
          // })

        // console.log("appartments2",appartments.then((ress) => {
        //   return ress
        // }
        // ))
        
        
       
        // };
        

        


          }).catch((error) => {
          console.error(error);
          });
    
  })



  

  
  </script>  
  
  <script>
  import axios from 'axios';
  export default {
    name: "home-details",
    layout: "homepage",
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
      // await this.$fetch();
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
    // head() {
    //   return {
    //     title: 'Coliving Home Details for' + " " + this.homeDetails.name + " " + 'in'+ " " + this.homeDetails.cityName + '-'+  this.homeDetails.neighbourhoodName,
    //     htmlAttrs: {
    //       lang: "en",
    //     },
    //     link: [
    //       { rel: "canonical", href: this.meta_url },
    //       {
    //         rel: "stylesheet",
    //         href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    //       },
    //     ],
    //     script: [
    //       {
    //         src: `https://maps.googleapis.com/maps/api/js?key=${envVars.public.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`,
    //       },
    //       { type: "application/ld+json", json: this.structuredData },
    //       { type: "application/ld+json", json: this.roomStructureData },
    //       // { type: 'application/ld+json', json: this.roomStructureData1 }
    //     ],
    //     meta: [
    //       { hid: "author", name: "author", content: "CasaMiaCasaTua" },
    //       {
    //         hid: "description",
    //         name: "description",
    //         content: this.meta_description,
    //       },
    //       {
    //         hid: "ogtitle",
    //         property: "og:title",
    //         content: this.meta_title,
    //       },
    //       {
    //         hid: "ogdescription",
    //         property: "og:description",
    //         content: this.meta_description,
    //       },
    //       {
    //         hid: "ogimage",
    //         property: "og:image",
    //         content: this.meta_image,
    //       },
    //       {
    //         hid: "ogurl",
    //         property: "og:url",
    //         content: this.meta_url,
    //       },
    //       {
    //         hid: "ogtype",
    //         property: "og:type",
    //         content: "Website",
    //       },
    //       {
    //         hid: "ogsite_name",
    //         property: "og:site_name",
    //         content: this.meta_site_name,
    //       },
    //       {
    //         hid: "twittertitle",
    //         name: "twitter:title",
    //         content: this.meta_title,
    //       },
    //       {
    //         hid: "twitterdescription",
    //         name: "twitter:description",
    //         content: this.meta_description,
    //       },
    //       {
    //         hid: "twitter:card",
    //         name: "twitter:card",
    //         content: "summary",
    //       },
    //       {
    //         hid: "twitterimage",
    //         name: "twitter:image",
    //         content: this.meta_image,
    //       },
    //     ],
    //   };
    // },
   
    }
  </script>
  <style scoped>
  h3 {
    font-size: 31px;
  }
  .nb-main img {
    width: 60px;
    vertical-align: middle;
  }
  .nb-main .nb-label {
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    color: #000;
  }
  
  .icon_ {
    font-size: 24px;
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
    font-size: 37px;
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
    font-size: 11px;
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
    font-size: 35px;
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
    font-size: 17px;
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
    font-size: 20px;
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
    font-size: 15px;
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
    font-size: 15px;
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
    font-size: 17px;
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
    font-size: 13px;
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
      font-size: 18px;
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
      font-size: 12px;
    }
    .home-detail .home-detail-slider .home-detail-title > :first-child {
      font-size: 21px;
    }
    .home-detail .home-detail-slider .icons-details .desc {
      min-width: 120px;
      min-height: 38px;
      font-size: 15px;
    }
    .home-detail .home-detail-slider .home-detail-address {
      font-size: 15px;
    }
    .home-detail .home-detail-slider .build-desc p {
      font-size: 16px;
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
      font-size: 13px;
    }
    .home-detail .home-detail-slider .home-detail-title > :first-child {
      font-size: 22px;
    }
    .home-detail .home-detail-slider .icons-details .desc {
      min-width: 130px;
      min-height: 40px;
      font-size: 16px;
    }
    .home-detail .home-detail-slider .home-detail-address {
      font-size: 16px;
    }
    .home-detail .home-detail-slider .build-desc p {
      font-size: 17px;
      line-height: 28px;
    }
  }
  .whole-apartment-price {
    font-size: 19px;
    color: #72bf44;
    font-weight: 700;
  }
  .side-form-wrapper {
    padding: 0px;
  }
  </style>
  