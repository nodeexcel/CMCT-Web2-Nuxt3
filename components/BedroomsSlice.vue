<template>
    <div class="inner-content-wrapper">
        <div class="cms-main-wrap">
            <div class="main-part">
                <div class="section-main-title"><prismic-rich-text :field="slice.primary.title" class="cms-title mb-3 mb-lg-5"/></div>
                <div class="room-card">
                    <div class="row">
                        <!-- <div class="col-xl-9"> -->
                        <div class="col-md-6 col-lg-8 col-xl-9">
                            <div class="row new-room-box">
                                <!-- <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 room-item mb-4 mb-md-5" v-for="(item, item_index) in slice.items" :key="item.roomId"> -->
                                <div class="col-lg-6 col-xl-4 col-md-12 col-sm-6 col-xs-12 room-item mb-4 mb-md-5" v-for="(item, item_index) in slice.items" :key="item.roomId">
                                    <div class="room-main">
                                        <div class="room-image">
                                            <carousel 
                                                v-if="slice.room_image && slice.room_image.toLowerCase() === 'slider'"
                                                :autoplay="true" 
                                                :loop="true"
                                                :perPage="1"
                                                :navigationEnabled="true"
                                                :paginationEnabled="true"
                                                :speed="2000" 
                                                navigationNextLabel="<i class='fa angle-right cust-icon'></i>"
                                                navigationPrevLabel="<i class='fa angle-left cust-icon'></i>"
                                                paginationActiveColor="#72bf44" 
                                                :autoplayTimeout="3000">
                                                <template v-if="item.roomPicturesArray.length > 0">
                                                    <template v-for="(image, index) in item.roomPicturesArray" >
                                                        <slide :key="'carousel_'+index" v-if=" (image.link != '')">
                                                            <picture class="slider-img">
                                                                <img :src="image.link" :alt="image.description">                                        
                                                            </picture>
                                                        </slide>
                                                    </template>
                                                </template>
                                                <template v-else>
                                                    <picture class="slider-img">
                                                        <img src="~/assets/img/noBedroomAvailable.png" alt="no-image">                                        
                                                    </picture>
                                                </template>
                                            </carousel>
                                            <template v-if="slice.room_image && slice.room_image.toLowerCase() != 'slider'">
                                                <picture class="slider-img"  v-if="item.roomPicturesArray.length > 0">
                                                    <img :src="slice.items[0].roomPicturesArray[0].link" :alt="slice.items[0].roomPicturesArray[0].description">                                        
                                                </picture>
                                                <picture v-else class="slider-img">
                                                    <img src="~/assets/img/noImageAvailable.png" alt="no-image">                                        
                                                </picture>
                                            </template>
                                            <div class="overlay">
                                                <p v-if="item.availability == 'Fully booked'" :style="{ 'background-color': getclass(item.availability), 'border-color': getclass(item.availability) }"> {{ item.availability }} </p>
                                                <p v-else-if="item.availability == 'Partially available' &&  item.totalBedsInRoom > 0" style="background-color: rgb(114, 191, 68); border: 1px solid rgb(114, 191, 68) !important ;">{{ item.totalBedsInRoom/2 }} {{ item.totalBedsInRoom/2 == 1 ? 'bed' : 'beds' }} Available </p>
                                                <p v-else-if="item.availability!= null && item.totalBedsInRoom > 0" :style="{ 'background-color': getclass(item.availability), 'border-color': getclass(item.availability) }">{{ showAvailableBeds }} {{ showAvailableBeds == 1 ? 'bed' : 'beds' }} {{ item.availability }} </p>
                                                <p v-else-if="item.availability!= null" :style="{ 'background-color': getclass(item.availability), 'border-color': getclass(item.availability) }"> {{ item.availability }} </p>
                                                <p v-else>Not Available</p>
                                            </div>
                                            <div class="promo-overlay" v-if="item.promoPrice != ''">
                                                <p>Promotion</p>
                                            </div>
                                            <div class="">
                                                <span class="view-photos-btn" @click="show(item)">View Photos</span>
                                            </div>
                                        </div>
                                        <div class="room-detail" :key="item_index" :style="{'background-color': slice.background}" >
                                            <div class="detail-inner">
                                                <div class="type mb-1">
                                                    <h3>{{ item.roomName }}</h3>
                                                </div>
                                            <div class="price_details">
                                                <div class="price">
                                                    <p v-if= "item.promoPrice != ''">
                                                        <span v-if="item.bedsArray.length > 0">
                                                            Beds Starting at {{ item.priceCurrency}}
                                                            <!-- <span style="color:#F55E61" v-for="(item,index) in item.bedsArray" :key="index"> -->
                                                                <span>
                                                                    {{item.bedsArray[0].startingPrice}}
                                                                </span>
                                                            <!-- </span> -->
                                                        </span>
                                                        <span v-else>
                                                            Starting at <span> {{item.priceCurrency}} <del> {{item.startingPrice}} </del>
                                                            <span style="color:#F55E61" v-for="(item,index) in item.roomPriceScaleArray" :key="index">
                                                                <span v-if="item.StayMinMonths == 12">
                                                                    {{item.priceAmount}}
                                                                </span>
                                                            </span> 
                                                        {{item.priceUnit.toLowerCase()}} </span>
                                                        </span>
                                                        </p>
                                                    <p v-else>
                                                        <span v-if="item.bedsArray.length > 0">
                                                            Beds Starting at {{ item.priceCurrency}}
                                                            <!-- <span style="color:#F55E61" v-for="(item,index) in item.bedsArray" :key="index"> -->
                                                                <span>
                                                                    {{item.bedsArray[0].startingPrice}}
                                                                </span>
                                                            <!-- </span> -->
                                                        </span>
                                                        <span v-else>
                                                                Starting at {{ item.priceCurrency}}
                                                                {{ Number(item.startingPrice).toLocaleString() }}
                                                        </span>
                                                        {{item.priceUnit.toLowerCase()}}</p>
                                                </div>
                                                <div class="price mb-3 mb-lg-3">
                                                    <p>{{ availabilityDate(item.endDate) }}</p>
                                                </div>
                                            </div>
                                                <div class="desc feature-wrap description_feature_wrap" :ref="'myref'+item_index" :style="{ 'min-height': maxheight + 'px' }">
                                                    <p v-html="item.description" class="feature description_feature" style=""></p>                      
                                                </div>
                                                <!-- <div class="btn-wrapper">
                                                    <a v-show="deviceSize < 768" href="javascript:void(0)" class="request-btn" @click="showModal(item)">Enquiry now</a>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div :class="iscouple ==true ? 'for-couple':''">
                                            <div class="btn btn-info couple-room mt-2 couple-room-btn" v-show="item.couple">
                                                    <span>For Couples</span>
                                            </div>
                                        </div>
                                        <div class="housemates-details" >
                                                <h4 class="housemates" v-if="item.memberFirst.age !== null || item.memberFirst.standardizedJobTitle !==null || item.memberFirst.gender !==null || item.memberFirst.nationality !==null || item.memberFirst.status !==null ">Housemates</h4>
                                                <div class="row">
                                                    <!-- <div  class="col-sm-1 col-md-1 col-lg-1 pl-0 pr-0 text-center mb-2"></div> -->
                                                    <div  class="col-sm-6 pl-0 pr-0 text-center mb-2" v-if="item.memberFirst.age !== null || item.memberFirst.standardizedJobTitle !==null || item.memberFirst.gender !==null ||  item.memberFirst.nationality !==null || item.memberFirst.status !==null">
                                                        <img v-if="item.memberFirst.gender && item.memberFirst.gender.toLowerCase() == 'male'" class="gallery-item-mf-img mb-1" src="~/public/male.png" :alt="item.memberFirst.gender" >
                                                        <img v-if="item.memberFirst.gender && item.memberFirst.gender.toLowerCase() == 'female'" class="gallery-item-mf-img mb-1" src="~/public/female.png" :alt="item.memberFirst.gender" >
                                                        <img v-if="item.memberFirst.gender == null" class="gallery-item-mf-img mb-1" src="~/public/male1.png" :alt="item.memberFirst.gender" >
                                                        <div class="">
                                                            <p class="gallery-item-mf-heading mb-0" v-if=" item.memberFirst.standardizedJobTitle !== null">{{ item.memberFirst.standardizedJobTitle }} <country-flag  v-if="(item.memberFirst.nationality != null)" class="flag-icon" :country='getcountryCode(item.memberFirst.nationality)' size='small' :title="item.memberFirst.nationality"/></p>
                                                            <div class="gallery-item-mf-years" v-if=" item.memberFirst.age !== null">{{ item.memberFirst.age }} years old</div>
                                                            <div class="gallery-items-mf-status" :class="item.memberFirst.status === 'outgoing' || item.memberFirst.gender !==  null ? 'orange' : 'green'" v-if="item.memberFirst.status && item.memberFirst.status != '' && item.memberFirst.status != 'current'">
                                                                <p>{{item.memberFirst.status}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- <div  class="col-sm-1 col-md-1 col-lg-1 pl-0 pr-0 text-center mb-2"></div> -->
                                                    <div  class="col-sm-6 pl-0 pr-0 text-center mb-2" v-if="item.secondMember.age !== null || item.secondMember.standardizedJobTitle !==null || item.secondMember.gender !==null || item.secondMember.status !==null">
                                                        <img v-if="item.secondMember.gender && item.secondMember.gender.toLowerCase() == 'male'" class="gallery-item-mf-img mb-1" src="~/public/male.png" :alt="item.secondMember.gender" >
                                                        <img v-if="item.secondMember.gender && item.secondMember.gender.toLowerCase() == 'female'" class="gallery-item-mf-img mb-1" src="~/public/female.png" :alt="item.secondMember.gender" >
                                                        <img v-if="item.secondMember.gender == null" class="gallery-item-mf-img mb-1" src="~/public/male1.png" :alt="item.secondMember.gender" >
                                                        <div class="">
                                                            <p class="gallery-item-mf-heading mb-0" v-if=" item.secondMember.standardizedJobTitle !== null">{{ item.secondMember.standardizedJobTitle }} <country-flag  v-if="(item.secondMember.nationality != null)" class="flag-icon" :country='getcountryCode(item.secondMember.nationality)' size='small' :title="item.secondMember.nationality"/></p>
                                                            <div class="gallery-item-mf-years" v-if=" item.secondMember.age !== null">{{ item.secondMember.age }} years old</div>
                                                            <div class="gallery-items-mf-status" :class="item.secondMember.status === 'outgoing' || item.secondMember.gender !==  null ? 'orange' : 'green'" v-if="item.secondMember.status && item.secondMember.status != '' && item.secondMember.status != 'current'">
                                                                <p>{{item.secondMember.status}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>
                                    <div class="feature-wrap room-size" v-if="((item.roomSize != null && item.roomSizeUnit != null) && (item.availability == 'Available' || item.availability == 'At least a room available' || item.availability == 'At least one room available' || item.availability == 'Available soon'))">
                                                    <p class="feature" v-if="item.roomSizeUnit == 'sqm'">Room size: {{ (item.roomSize * 10.7639).toFixed(0) }}sqft / {{item.roomSize}}sqm</p>
                                                    <p class="feature" v-else>Room size:{{ item.roomSize }}sqft / {{(item.roomSize/10.7639).toFixed(1)}}sqm</p>
                                    </div>
                                    <div class="adjust-lease_details">
                                        <div v-if="(item.availability == 'Available' || item.availability == 'At least a room available' || item.availability == 'At least one room available' || item.availability == 'Available soon' || item.endDate != null )" class="btn btn-info adjust-lease mt-3 adjust-lease-btn" id="AdjustLeaseForm"  @click="showModal(item)">
                                                    <span><i class="fa fa-solid fa-sliders"></i>Adjust Lease</span>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <hr v-if="slice.slice_devider != undefined && slice.slice_devider === true"/>
        <b-modal id="modal-1" size="lg" centered hide-footer hide-header body-class="p-0">
            <div class="carousel-content">
                <!-- <VueSlickCarousel v-bind="settings" :adaptiveHeight="true" :autoplay="false" :autoplaySpeed="1000000" :infinite="true" :initialSlide="0" :pauseOnFocus="false" :pauseOnHover="false">
                    <div v-for="(item, item_index) in images" :key="item_index">
                        <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            style="height:100% !important; border-radius : 20px;"
                            :src="item.link"
                            alt="image slot"
                        />
                    </div>
                </VueSlickCarousel> -->
            </div>
        </b-modal>
    </div>
</template>

<script>
import CountryFlag from 'vue-country-flag-next'
import countryList from './countryList.json'
import VueSlickCarousel from 'vue-slick-carousel'
import moment from 'moment'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// import VueScrollTo from "vue-scrollto";
    export default {
        props: ['slice', 'parentRefs'],   
        name: 'room-slice',
        // components: {
        //     VueScrollTo,
        //     VueSlickCarousel,
        //     CountryFlag
        // },
        data () {
            return {
                waitListLink: '',
                maxheight: 0,
                iscouple: false,
                curDate: '',
                sliderImages: [],
                clickSlice: {},
                deviceSize: window.innerWidth,
                images : [],
                settings:{
                    "dots": true,
                    "dotsClass": "slick-dots carousel-content-dots",
                    "edgeFriction": 0.35,
                    "infinite": false,
                    "speed": 500,
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "initialSlide": 0,
                    "adaptiveHeight": true
                },
            }
        },
        watch:{
            images(newValue){
                this.images = newValue;
            }
        },
        created () {
            if (process.browser) {
                window.addEventListener('resize', this.handleResize)
            }
        },
        mounted() {
                for (let key in this.$refs) {
            const unknownDiv = this.$refs[key][0];
            const divHeight = unknownDiv.offsetHeight;
            if(divHeight > this.maxheight){
                this.maxheight = divHeight
              }
             }
            },

        beforeMount() {
            let Iscouple  =false;
            this.slice.items.forEach(function(item,index) { 
                let promoPrice = ''
                if(item.roomPriceScaleArray.length > 0) {
                    item.roomPriceScaleArray.forEach(function(promoRow) { 
                        if(promoRow.priceType == 'Promo') {
                            promoPrice = promoRow.priceAmount
                        }
                    });  
                }
                Object.assign(item, {promoPrice: promoPrice});
                if(item.couple ==1){
                    Iscouple = true
                }
            });
            this.iscouple = Iscouple
            this.$store.commit('SET_ROOM_AVAILABLE_STATUS', false);
        },
        computed : {
            showAvailableBeds(){
                var bedsBooked = 0;
                for (var i = 0; i < this.slice.items.length; i++)  {
                    var totalBeds = this.slice.items[i].totalBedsInRoom;
                    var roomsData = this.slice.items[i];
                            if(totalBeds != 0){
                                for (var j = 0 ; j< roomsData.bedsArray.length ; j++){
                                    if(roomsData.bedsArray[j].availability == "Fully booked"){
                                            bedsBooked ++ ;
                                    }
                                }
                            }
                            var availableBeds = totalBeds - bedsBooked ;
                    return availableBeds ;
                }            
            }
        //     promoPrice() {
        //         for (let i = 0; i < this.slice.items.length; i++) {
        //         if(this.slice.items[i].promoPrice !== "") {
        //         const roomPriceScaleArray = this.slice.items[i].roomPriceScaleArray
        //         if(roomPriceScaleArray.length) {
        //             const itemIndex = roomPriceScaleArray.findIndex((el) => el.StayMinMonths == 12)
        //             if(itemIndex >= 0) {
        //                 return `<span>
        //                         ${this.slice.items[i].priceCurrency} 
        //                         <del>${this.slice.items[i].startingPrice}</del> 
        //                         <span style="color:#F55E61">
        //                         ${roomPriceScaleArray[itemIndex].priceAmount} 
        //                        </span>
        //                         ${this.slice.items[i].priceUnit}
        //                     </span>`
        //             } 
        //         }
        //     }
        // }
        // },
        },
        methods: {
            getcountryCode(nationality) {
                let countrycode = ''
                countryList.filter((country) => {
                    if(country.name == nationality) {
                        countrycode =  country.code.toLowerCase();
                    }
                });
                return countrycode;
            },
            availabilityDate(enddate) {
                if(enddate != '' && enddate != null) {
                    var todayDate = moment().format("YYYY-MM-DD");
                    var pastDate = moment.unix(enddate._seconds, "YYYY-MM-DD").format("YYYY-MM-DD");
                    if (moment(pastDate).isBefore(todayDate)) {
                        return 'Available from today';
                    } else {
                        return 'Available from ' + moment.unix(enddate._seconds, "DD-MM-YYYY").add(1, 'days').format('MMMM Do YYYY');
                    }
                }
            },
            show(item) {
                this.images = item.roomPicturesArray;
                this.$bvModal.show('modal-1');
            },
            handleResize() {
                this.deviceSize = window.innerWidth         
            },
            getPromoPrice(item) {
                let promoPrice = ''
                if(item.roomPriceScaleArray.length > 0) {
                    item.roomPriceScaleArray.forEach(function(promoRow) { 
						if(promoRow.priceType == 'Promo') {
							promoPrice = promoRow.priceAmount;
						}
					});
                }
                if(promoPrice != '') {
                    return 'Starting at ' + item.priceCurrency +'<span style="text-decoration: line-through;">' + Number(item.startingPrice).toLocaleString() + '</span><span style="color:#91278F">' + Number(promoPrice).toLocaleString() + '</span> ' + item.priceUnit;
                } 
                return 'Starting at ' + item.priceCurrency + Number(item.startingPrice).toLocaleString() + ' ' + item.priceUnit;
            },
            getclass(status) {
                if(status == 'Available') {
                    this.$store.commit('SET_ROOM_AVAILABLE_STATUS', true);
                    return '#72bf44';
                } else if(status == 'At least a room available') {
                    this.$store.commit('SET_ROOM_AVAILABLE_STATUS', true);
                    return '#72bf44';                
                } else if(status == 'Available soon') {
                    this.$store.commit('SET_ROOM_AVAILABLE_STATUS', true);
                    return '#FFB903';                
                } else if(status == 'Fully booked') { 
                    return '#F55E61';
                }
            },
            showModal(item) {
                let image= ''
                let mainImage= ''
                let images = {}
                if(this.slice.room_image && this.slice.room_image.toLowerCase() === 'slider') {
                    if(item.roomPicturesArray.length > 0) { 
                        images = item.roomPicturesArray.slice(0, 1);
                        image = images[0].link
                    }
                } else if(this.slice.room_image && this.slice.room_image.toLowerCase() != 'slider') {
                    if(item.roomPicturesArray.length > 0) {
                        image = this.slice.items[0].roomPicturesArray[0].link
                    }
                }
                if(item.roomPicturesArray.length > 0) {
                    item.roomPicturesArray.forEach(function(img) {
                        if(img.mainPicture) {
                            mainImage = img.linkDesk
                        }
                        //roomsLdImgs.push(img.link)
                    });
                }
                var availableDate = ''
                if(item.endDate != '' && item.endDate != null) {
                    var todayDate = moment().format("YYYY-MM-DD");
                    var pastDate = moment.unix(item.endDate._seconds, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
                    if (moment(pastDate).isBefore(todayDate)) {
                        availableDate =  'Available from today';
                    } else {
                        availableDate =  'Available from ' + moment.unix(item.endDate._seconds, "DD-MM-YYYY").add(1, 'days').format('MMMM Do YYYY');
                    }
                    this.curDate = pastDate
                }
                this.$store.commit('SET_ROOM_ID', item.roomId);
                this.$store.commit('setSideFormTop',{
                    name: item.roomName,
                    totalBedsInRoom: item.totalBedsInRoom,
                    image: image,
                    mainImage: mainImage,
                    description: '',
                    priceCurrency: item.priceCurrency,
                    price: item.startingPrice,
                    promoPrice: item.promoPrice,
                    priceUnit: item.priceUnit,
                    //price: 'Starting at '+ item.priceCurrency+' ' + Number(item.startingPrice).toLocaleString()+' '+ item.priceUnit,
                    roomType: item.roomName,
                    curDate: this.curDate,
                    availableDate: availableDate
                })
                this.$root.$emit('bv::show::modal', 'adjust-lease-modal')
            },
        }
    }    
</script>



<style scoped> 

.carousel {
    margin-top: 0rem !important;
}

.section-main-title .cms-title :first-child{
    font-size: 31px;
    font-weight: 700;
    line-height: 39px;
    margin-bottom: 0;
    letter-spacing: normal;
    text-align: left;
}
.new-room-box .detail-inner .type h3  {
  color: #000;
  font-size: 17px;
  letter-spacing: normal;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 0;
}
.new-room-box .detail-inner {
    padding: 32px 24px 10px 24px;
    letter-spacing: normal;
    margin-top: -10px;
}
.new-room-box  .room-main{
    cursor: pointer;
    height: 100%; 
    background-color: #F7F7F7;
    border-radius: 10px;
}
.new-room-box .room-item:nth-child(3n+1){
    padding-right: 10px;
}
.new-room-box .room-item:nth-child(3n+2){
    padding: 0 12.5px 0 12.5px;
}
.new-room-box .room-item:nth-child(3n+3){
    padding-left: 10px;
}
.new-room-box .detail-inner .price p { 
    font-size: 13px;
    color: #72BF44;
    font-weight: 700;
    line-height: 27px;
}
.new-room-box .room-image, .new-room-box .room-detail {
    position: relative;
}
.new-room-box .room-image .overlay {
    position: absolute;
    top: 12px;
    left: 12px;
}
.new-room-box .room-image .slider-img img{
    border-radius: 10px 10px 0 0;
    width: 100%;
}
.new-room-box .room-image .overlay :first-child,.view-photos-btn,.couple-room-btn {
    background-color: #ef5357;
    border: 1px solid #ef5357;
    color: #ffffff;
    padding: 0;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    font-weight: 700;
    line-height: 29px;
    min-width: 116px;
    min-height: 31px;
    letter-spacing: normal;
    border-radius: 5px;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
}
.new-room-box  .view-photos-btn{
    background-color:rgba(141, 141, 141, 50%);
    border: 0;
    min-width: 100px;
    position: absolute;
    bottom: 22px;
    right: 12px;
}
.new-room-box .room-image ::v-deep(.VueCarousel-pagination) {
	position: absolute;
    top: auto;
    bottom: 20px;
}
.new-room-box .room-detail .detail-inner .feature-wrap {
    font-size: 15px;
    line-height: 21px;
    font-weight: 400;
    color: #000;
}
.couple-room {
    color: #000;
    background-color: rgb(247 247 247);
    border-color: rgb(175 173 173);
    font-weight: bold;
}
.adjust-lease-btn {
    color: #000;
    background-color: rgb(114, 191, 68);
    border-color: rgb(114, 191, 68);
    border-radius: 50px;
    padding: 0;
    margin-bottom: 0;
    vertical-align: middle;
    font-size: 11px;
    font-weight: 700;
    line-height: 29px;
    min-height: 31px;
    width: 100%;
    letter-spacing: normal;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;

}
.adjust-lease-btn .fa-sliders:before {
    content: "\f1de";
    color: black;
    margin-right: 5px;
}
.new-room-box .room-detail{
    background-color: transparent !important;
}

.promo-overlay ::v-deep(:first-child) {
  background-color: #f55e61;
  border: 1px solid #f55e61;
  color: #ffffff;
  padding: 0 10px;
  margin-bottom: 0;
  display: inline-block;
  vertical-align: middle;
  border-radius: 5px;
}
.promo-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.housemates{
    margin-bottom: 0rem !important;
    color: #000;
    font-weight: 600;
}
.room-size{
    color: #000;
    padding: 10px 24px;
    letter-spacing: normal;
    /* min-width:2rem */
}
.price_details{
 min-height: 4rem;
}
.for-couple{
    min-height: 3rem;
    padding: 0px 24px;
    letter-spacing: normal;
    margin-top: -10px;
}
.housemates-details{
    padding: 5px 24px 12px 24px;
    letter-spacing: normal;
    margin-top: -10px;
    min-height: 13em

}
.adjust-lease_details{
    padding: 15px 24px;
    letter-spacing: normal;
    margin-top: -10px; 
}
 /* :deep(.description_feature > div:has(ul)){  
    max-height: 13rem;
 } */
 :deep(.description_feature > ul){  
    margin-bottom: 1rem !important;
 }
 :deep(.description_feature > div:has(div > ul)){  
    max-height: none !important;
    min-height: 1rem ;
 }
 /* :deep(.description_feature){  
    max-height: 26rem;
    margin-bottom: 1rem !important;
 } */
 /* :deep(.description_feature > div > br){  
    display:none
 } 
 :deep(.description_feature > div > div > ul > li > br){  
    display:none
 } 
 :deep(.description_feature > div > div > br){  
    display:none
 }
 :deep(.description_feature > p){  
    margin-bottom: 1rem !important
 } 
 :deep(.description_feature > p :empty){  
    display:none
 }  */
.gallery-item-mf-heading{
	font-size: 1em;
	line-height: 21px;
	font-weight: 400;
	color: #000;
}
.gallery-item-mf-years{
	font-size:.7em !important;
	font-weight: 700;
	color: #8D8D8D;
	line-height: 21px;
}
.gallery-items-mf-status {
      font-size: 0.7em !important;
	  font-weight: 700;
	  color: #fff;
	  text-transform: lowercase;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  letter-spacing: normal;
	  height: 18px;
	  width: auto;
	  margin: 0 auto;
	  border-radius: 10px;
	  line-height: 32px;
	  background-color: #72BF44;
      padding: 0 6px;
      position: absolute;
      top: 35%;
      right: 10%;
      
}
.orange{
	background-color: rgb(255, 185, 3);	
}
.green {
	background-color: #72BF44;
}
/* .carousel {
    border-radius: 30px !important;
    background-color: transparent !important;
    overflow: hidden !important;
} */

@media (max-width:767px){
    .new-room-box .detail-inner{
        padding: 20px;
    }
    .new-room-box .detail-inner .type h3{
        font-size: 16px;
        line-height: 20px;
    }
    .new-room-box .detail-inner .price p{
        font-size: 12px;
        line-height: 20px;
    }
    .new-room-box .room-detail .detail-inner .feature-wrap{
        font-size: 13px;
        line-height: 20px;
    }
}
@media (max-width:991px){
    .section-main-title .cms-title :first-child{
        font-size: 21px;
        line-height: 30px;
    }
    .new-room-box .room-item{
        padding: 0 15px !important;
    }
}
@media (min-width:576px) and (max-width:767px){
    .new-room-box .room-image .overlay{
        top: 8px;
        left: 8px;
    }
    .new-room-box .view-photos-btn{
        bottom: 18px;
        right: 8px;
    }
    .new-room-box .room-image .overlay:first-child, .new-room-box .view-photos-btn{
        min-width: 90px;
        height: 25px;
        font-size: 10px;
    }
}   
@media (min-width:992px) and (max-width:1199px){
    .section-main-title .cms-title :first-child{
       font-size: 27px;
        line-height: 35px;
    }   
}
</style>
