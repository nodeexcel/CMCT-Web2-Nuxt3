<template>
    <div class="building-main-outer container-background-wrapper">
        <div class="container-background-sub-wrapper similar-cardslice-section" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper remove-right-padding" >
                <div class="cms-main-wrap building-cms">
                    <div v-if="slice != undefined" class="section-main-title mb-0 mb-3 mb-xl-4">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title similar-cardslice-heading px-sm-3"/>
                    </div>
                    buildingbuildingbuildingbuildingbuildingbuildingbuildingbuilding
                    <div class="building-card">
                        <template>
                            <VueHorizontalList :items="newHomeLists" :options="options" class="card-main">
                                <template v-slot:default="{item}">
                                <div class="item">
                                    <div class="content-wrap">
                                        <n-link :to="'/findahome/'+item.homeID" class="card-link" :id="'HomeDetails Card - '+item.homeID">
                                            <div class="room-image">
                                                <img v-if="item.banner.url == ''" src="~/assets/img/noImageAvailable.png" :alt="item.banner.altText" class="w-100 d-block">
                                                <img v-else :data-src="item.banner.url" class="lazyload w-100 d-block"  :alt="item.banner.altText" >
                                                <div class="overlay" :data-count="item.availableRoomCount">
                                                    <template v-if="((item.availableRoomCount != '0' && item.availability != null) && (item.availability == 'Available' || item.availability == 'Available soon' || item.availability == 'At least a room available'))">
                                                        <p :style="{ 'background-color': getclass(item.availability), 'border-color': getclass(item.availability) }">{{ item.availability }}</p>
                                                    </template>
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
                                                <div class="col-4 pl-0">
                                                    <div v-if="item.forStudents == 1" class="student-logo">
                                                      <img src="~/public/casamia_forstudents-4@4x.png" alt="student_logo">
                                                </div>
                                                </div>
                                                <div class="address pb-2 mb-2 pb-xl-4 mb-xl-4">
                                                    <p>{{ item.address }}</p>
                                                </div>
                                                <div class="building-bottom-content" :data-id="item.availableRoomCount + ' '+ item.totalBedrooms">
                                                    <div class="price">
                                                        <p> 
                                                            <span v-if="item.availableRoomCount==0"> Fully booked</span>
                                                            <span v-else>
                                                            <div class="mb-2 mb-xl-1 mb-xl-2"> {{ item.availableRoomCount }}  {{ item.availableRoomCount == 1 ? 'bedroom' : 'bedrooms' }}  available </div> 
                                                            <div>  Starting from {{ item.priceCurrency }}{{ Number(item.startingPrice).toLocaleString() }}/mo</div>
                                                            </span>  
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </n-link>
                                    </div>
                                </div>
                                </template>
                            </VueHorizontalList>
                        </template>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import lazysizes from 'lazysizes';
// import Multiselect from 'vue-multiselect'
// import VueHorizontalList from 'vue-horizontal-list';
import axios from 'axios';
export default {
    name: 'similar-cards',
    // components: {
    //     Multiselect,
    //     VueHorizontalList
    // },
    props: ['slice', 'homeLists', 'divider_and_button_color'],
    data () {
        return {
            value: [],
            options: {
                responsive: [
                    {end: 575, size: 1}, 
                    {start: 576, end: 900, size: 2},
                    {start: 901, end: 1199, size: 3},
                    {start: 1200, end: 1400, size: 4},
                    {size: 4}
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
            //newHomeLists: [],
            newHomeLists: this.homeLists
        }
    },
    computed: {
        background () {
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.divider_and_button_color)) { 
                  
                // Getting the content after '#',
                let ret = this.divider_and_button_color.slice(1); 
                // Splitting each character 
                ret = ret.split(''); 
                  
                // Checking if the length is 3 
                // then make that 6 
                if(ret.length == 3) { 
                    var ar = []; 
                    ar.push(ret[0]);  
                    ar.push(ret[0]); 
                    ar.push(ret[1]); 
                    ar.push(ret[1]); 
                    ar.push(ret[2]); 
                    ar.push(ret[2]); 
                    ret = ar; 
                } 
                  
                // Starts with '0x'(in hexadecimal) 
                ret = '0x'+ ret.join(''); 
                  
                // Converting the first 2 characters 
                // from hexadecimal to r value 
                var r = (ret>>16)&255; 
                  
                // Converting the second 2 characters 
                // to hexadecimal to g value 
                var g = (ret>>8)&255; 
                  
                // Converting the last 2 characters 
                // to hexadecimal to b value 
                var b = ret&255; 
                  
                // Appending all of them to make 
                // the RGBA value 
                
                let color = 'rgba('+[r, g, b].join(',')+',' + 0.5 + ')';
                return {
                  'background-color': color,
                  'border-color': this.divider_and_button_color,
                  'color': '#ffffff'
                }
            } else {
                return {}
            }
        }
    },
    methods: {
        getclass(status) {
            if(status == 'Available') {
                return '#72bf44';
            } else if(status == 'At least a room available') {
                return '#72bf44';                
            } else if(status == 'Available soon') {
                return '#FFB903';                
            } else if(status == 'Fully booked') { 
                return '#F55E61';
            }
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import "@/assets/css/filterform.css";
.similar-cardslice-section{
    padding: 100px 0;
    margin: 100px 0 0 0;
}
 .building-cms .building-card{
     overflow-x: hidden;
     height: 100%;
 }
 .similar-cardslice-heading :first-child{
      font-size: 28px;
    letter-spacing: normal;
    font-weight: 700;
    line-height: 34px;
    text-transform: uppercase;
    margin-bottom: 0;
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
    background-color: #f7f7f7;
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
    display: inline-block;
    transition: all 0.5s ease;
 }
  .building-cms .room-image .overlay :first-child:hover{
      background-color: #000 !important;
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
 .building-cms .building-card  .student-logo img{
    height: 25%;
 }
 @media (max-width:1199px){
      .similar-cardslice-heading :first-child{
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
    .similar-cardslice-section {
        padding: 30px 0;
        margin: 30px 0 0 0;
    }
 }
 @media (min-width:992px) and (max-width:1400px){
      .similar-cardslice-heading :first-child{
          font-size: 22px;
      }
     .similar-cardslice-section {
        padding: 50px 0;
        margin: 50px 0 0 0;
    }
 }
 @media (min-width:1200px){
    .similar-cardslice-section{
        margin-left: 15px;
        margin-right: 15px;
    }
 }
  @media (min-width:1200px) and (max-width:1400px){
    .similar-cardslice-heading :first-child{
          font-size: 25px;
     }
     .building-cms .building-card .address{
         margin-bottom: 12px !important;
         padding-bottom: 12px !important;
     }
     .building-cms .building-card .name{
          margin-bottom: 5px !important;
     }
     .building-cms .building-card .price div, .building-cms .building-card .price span{
         margin-bottom: 2px !important;
     }
  }
</style>
