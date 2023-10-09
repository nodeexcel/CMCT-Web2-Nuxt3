<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper recommendationslice-section" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper">
                <div class="cms-main-wrap  building-cms">
                    <div v-if="slice != undefined" class="section-main-title mb-0 mb-3 mb-xl-4">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title recommendationslice-heading px-sm-3"/>
                    </div>
                    <div class="building-card ">
                        <vue-horizontal-list :items="homeLists" :options="options" :spacePadding="0" :margin="0" class="card-main">
                            <template v-slot:default="{item}">
                            <div class="item">
                                <div class="content-wrap">
                                    <n-link :to="'/findahome/'+item.homeID" class="card-link" :id="'HomeDetails Card - '+item.homeID">
                                        <div class="room-image">
                                            <img v-if="item.banner.url == ''" src="~/assets/img/noImageAvailable.png" :alt="item.banner.altText" class="w-100 d-block">
                                            <img v-else :src="item.banner.url" class="lazyload w-100 d-block"  :alt="item.banner.altText" >
                                            <!-- <img src="~/assets/img/noImageAvailable.png" alt=""> -->
                                            <div class="overlay">
                                                <p v-if="item.availability != null">{{ item.availability }}</p>
                                                <p v-else>Not Available</p>
                                            </div>
                                            <div class="promo-overlay" v-if="item.isPromo">
                                                <p>Promotion</p>
                                            </div>
                                        </div>
                                        <div class="desc-box">
                                            <div class="desc mb-1 mb-lg-2">
                                                {{ (item.neighborhoodName != undefined) ? item.neighborhoodName : ''  }}
                                            </div>
                                            <div class="name mb-2 mb-xl-3"> {{ item.name }} </div>
                                            <div class="address pb-2 mb-2 pb-xl-4 mb-xl-4">
                                                <p>{{ item.address }}</p>
                                            </div>
                                            <div class="building-bottom-content">
                                                <div class="price">
                                                    <span v-if="item.availableRoomCount==0"> Fully booked</span>
                                                    <span v-else>
                                                        <div class="mb-2 mb-xl-1 mb-xl-2"> {{ item.availableRoomCount }} {{ item.availableRoomCount == 1 ? 'bedroom' : 'bedrooms' }}  available</div>
                                                        <div>  Starting from {{ item.priceCurrency }}{{ Number(item.startingPrice).toLocaleString() }}/mo</div>   
                                                    </span> 
                                                </div>
                                            <!--  <div class="price">
                                                    <p>Starting from {{ item.priceCurrency }}{{ Number(item.startingPrice).toLocaleString() }}/mo</p>
                                                </div> -->
                                            </div>
                                        </div>
                                    </n-link>
                                </div>
                            </div>
                            </template>
                        </vue-horizontal-list>
                    </div> 
                </div> 
            </div> 
        </div>
    </section>
</template>

<script>
// import moment from 'moment'
import VueHorizontalList from 'vue-horizontal-list';
import axios from 'axios';
export default {
    props: ['slice'],   
    name: 'recommendation-slice',
    // components: {
    //     VueHorizontalList
    // },
    data() {
        return {
            options: {
                responsive: [
                    {end: 575, size: 1}, 
                    {start: 576, end: 900, size: 2},
                    {size: 3}
                ],
                list: {
                    // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
                    //windowed: 1200,
                    // Because: #app {padding: 80px 24px;}
                    padding: 0
                },
                navigation: {
                    // when to show navigation
                    start: 359
                }
            },  
            homeLists: []
        }
    },
    beforeMount() { 
        var _this = this
        const envVars = useRuntimeConfig();
        axios.post(envVars.public.env.MODE === 'prod' ? envVars.public.env.PROD_END_POINT : envVars.public.env.DEV_END_POINT,{
            "neighborhoodId": "",
            "cityId": ""
        },{
			headers: {
				Authorization: envVars.public.env.MODE === 'prod' ? 'Bearer '+envVars.public.env.PROD_COLIV_HQ_KEY : 'Bearer '+envVars.public.env.DEV_COLIV_HQ_KEY
			}
		}).then((response) => {
            let homeList = [];
            const appartments = response
            if(appartments.data.data.length > 0) {
                appartments.data.data.forEach(function(appartment, index) {
                    if(appartment.homeId != undefined && (appartment.availability == 'Available' || appartment.availability == 'Available soon' || appartment.availability == 'At least a room available')) {
                    //if(appartment.homeId != undefined ) {
                        
                        // Extract unique room price
                        let roomPrice = [];
                        let isPromo = false;
                        let availableRoomCount = 0
                        appartment.rooms.forEach(function(item, i) { 
                            if(item.availability == "Available" || item.availability == "At least a room available" || item.availability == 'Available soon') { 
                                availableRoomCount++
                                if(item.startingPrice != undefined) {
                                    roomPrice.push({ startingPrice: item.startingPrice, priceCurrency: item.priceCurrency, promoPrice: false })
                                }
                                if(item.priceScales != undefined && item.priceScales.length > 0) {
                                    item.priceScales.forEach(function(promoRow) { 
                                        if(promoRow.priceType == 'Promo') {
                                            roomPrice.push({ startingPrice: promoRow.priceAmount, priceCurrency: item.priceCurrency, promoPrice: true }) 
                                            isPromo = true;
                                        }
                                    })
                                }
                            }
                        });
                        // Sort array in assending order ro extract small price
                        roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
                        let priceCurrency = '';
                        let startingPrice = 0;
                        if(roomPrice.length > 0) {
                            roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
                            startingPrice = roomPrice[0].startingPrice
                            priceCurrency = roomPrice[0].priceCurrency
                        }
                        
                        // Extract unique room type
                        let roomType = [...new Set(appartment.rooms.map(item => item.type))];
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
                            homeID: appartment.homeId,
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
                            availableRoomCount: availableRoomCount
                        })
                    }
                });
                homeList.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
                //store.commit('setHomeLists', homeList)
                //resolve(appartments)
            }
            _this.homeLists = homeList
        });
    }
}
</script>
<style>
.recommendationslice-section{
    padding: 100px 0;
    margin: 0 0 100px 0;
}
.recommendationslice-heading:first-child {
    font-size: 28px;
    letter-spacing: normal;
    font-weight: 700;
    line-height: 34px;
    text-transform: uppercase;
    margin-bottom: 0;
}
 .building-cms .building-card{
     overflow-x: hidden;
     height: 100%;
 }
.building-cms .building-card .content-wrap .desc-box {
    transition: 0.3s;
    padding: 30px 20px;
    border-top: none;
    text-align: left !important;
    margin-top: -10px;
}
.building-card .card-main .card-link img{
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 243px;
    -o-object-fit: cover;
    object-fit: cover;
}
.building-cms .building-card .content-wrap .desc-box .desc{ 
    font-size: 12px;
    line-height: 15px;
    letter-spacing: normal;
    color: #8D8D8D;
    text-transform: uppercase;
}
.building-cms .building-card .name   {
       font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: normal;
    color: #000;
}
.building-cms .building-card .address{
        line-height: 27px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: normal;
    color: #000;
    border-bottom: 1px#D8D8D8 solid;
}
.building-cms .building-card .price div,.building-cms .building-card .price span{
    font-size: 14px;
    letter-spacing: normal;
    line-height: 27px;
    color: #000;
    font-weight: 700;
}
.building-card .card-main .card-link {
    display: block;
    color: #000;
}
 .building-cms .building-card  .content-wrap{
    background-color: #F7F7F7;
    border-radius: 10px;
    height: 100%;
}
 .building-cms .building-card .item{
    height: 100%;
    padding: 0px 15px;
 }
 .building-cms .room-image .overlay :first-child{
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
    letter-spacing: normal;
    min-width: 116px;
    height: 31px;
    border-radius: 5px;
    line-height: 31px;
    padding: 0 10px;
    background-color: #000;
    display: inline-block;
    transition: all 0.5s ease;
 }
  .building-cms .room-image .overlay :first-child:hover{
      background-color: #72bf44;
      color: #fff;
  }
 .building-cms .building-card .room-image .promo-overlay :first-child{
         background-color: #F55E61;
    border: 1px solid #F55E61;
    color: #ffffff;
    padding: 0 10px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    border-radius: 5px;
 }
 .building-cms .building-card .room-image .overlay{
     position: absolute;
    top: 12px;
    left: 12px;
 }
 .building-cms .building-card .room-image .promo-overlay{
         position: absolute;
    bottom: 20px;
    right: 10px;
 }
 .building-cms .building-card .content-wrap .room-image{
         position: relative;
 }
 @media (max-width:1199px){
     .recommendationslice-heading:first-child{
          font-size: 20px;
     }
     .building-cms .building-card .content-wrap .desc-box{
        padding: 15px;
    }
    .building-cms .building-card .content-wrap .desc-box .desc{
        font-size: 11px;
    }
    .building-cms .building-card .content-wrap .name{
        font-size: 16px;
    }
    .building-cms .building-card .content-wrap .address{
        font-size: 14px;
    }
    .building-cms .building-card .price div,.building-cms .building-card .price span{
        font-size: 13px;
    }
    .recommendationslice-section {
        padding: 30px 0;
        margin: 30px 0 30px 0;
    }
 }
 @media (min-width:992px) and (max-width:1400px){
     .recommendationslice-section {
        padding: 50px 0;
        margin: 50px 0 50px 0;
    }
    .recommendationslice-heading:first-child{
          font-size: 22px;
    }
 }
 @media (min-width:1200px){
    .recommendationslice-section{
        margin-left: 15px;
        margin-right: 15px;
    }
 }
  @media (min-width:1200px) and (max-width:1400px){
    .recommendationslice-heading:first-child{
          font-size: 25px;
     }
  }
</style>