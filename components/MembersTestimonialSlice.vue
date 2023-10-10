<template>
    <section>
        <div class="container-background-wrapper main-testimonial-main-wrapper">
            <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
                <div class="inner-content-wrapper" :class="members.length == 1 ? 'small-spacing':'testimonial-main-wrapper'">
                    <div class="row mx-0" v-if="slice.primary.title.length != 0">
                        <div class="section-main-title content-h2-heading content-h2-text-align col-md-12 text-md-left">
                            <prismic-rich-text :field="slice.primary.title" :class="'cms-title mb-4 mb-lg-5 mb-xl-5 pb-xl-5 align-'+slice.primary.align"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div v-if="count == members.length">
                                <VueSlickCarousel v-bind="getTestimonialSettings" :class="(members.length > 0 && members.length < 3) ? 'centerTestimonial' :''" :autoplay="true" :autoplaySpeed="2000" :infinite="true" :initialSlide="0" :pauseOnFocus="false" :pauseOnHover="false">
                                    <div v-for="(item,index) in members" :key="index">
                                        <div class="item">
                                            <div class="testimonial-main-box mb-4 pb-2">
                                                <div class="testimonial-box" :style="{ 'background-color': slice.primary.tile_background_color }" :class="members.length == 1 ? 'text-center': ''">
                                                    <prismic-rich-text :field="item.text" class="member_description"/>
                                                    <div class="d-flex align-items-center member_box" :class="members.length == 1 ? 'justify-content-center': ''">
                                                        <div class="mr-3">
                                                            <!-- <prismic-image :field="item.member_image" class="lazyload"/> -->
                                                            <img v-if="item.member_image.url" :src="item.member_image.url" width="60" height="60" alt="member_image">
                                                        </div>
                                                        <div>
                                                            <span class="member_name d-block mb-1 mb-xl-2">{{ item.member_name }}</span>
                                                            <span class="member_title d-block">{{ item.member_title }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </VueSlickCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import VueHorizontalList from 'vue-horizontal-list';

// import VueSlickCarousel from 'vue-slick-carousel'
// import {  VueSlickCarousel }  from 'vue-slick-ts' 
  
  import "vue-slick-ts/dist/css/slick.css";

export default {
    // components: { VueHorizontalList,VueSlickCarousel  },
    props: ['slice'],
    name: 'members_testimonials',
    data() {
        return {
            settings:{
                    "dots": false,
                    "infinite": false,
                    "speed": 500,
                    "autoplay":true,
                    "slidesToShow": 3,
                    "slidesToScroll": 3,
                    "initialSlide": 0,
                    "responsive": [
                        {
                        "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 3,
                            "infinite": true,
                        }
                        },
                        {
                        "breakpoint": 991,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 2,
                            "initialSlide": 0,
                            "infinite": true,
                        }
                        },
                        {
                        "breakpoint": 575,
                        "settings": {
                            "slidesToShow": 1,
                            "slidesToScroll": 1,
                            "infinite": true,
                        }
                        }
                    ]
            },
            slidesFor1:{
                    "dots": false,
                    "infinite": false,
                    "speed": 500,
                    "autoplay":true,
                    "slidesToShow": 2,
                    "slidesToScroll": 2,
                    "initialSlide": 0,
                    "responsive": [
                        {
                            "breakpoint": 1024,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2,
                                "infinite": true,
                            }
                        },
                        {
                            "breakpoint": 991,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2,
                                "initialSlide": 0
                            }
                        },
                        {
                            "breakpoint": 575,
                            "settings": {
                                "slidesToShow": 1,
                                "slidesToScroll": 1
                            }
                        }
                    ]
            },
            count : 0,
            members: [],
        }
    },
    computed:{
        getTestimonialSettings(){
            if(this.members.length == 1){
                return this.slidesFor1;
            }else{
                return this.settings;
            }
        }
    },
    methods: {
        async getMembersData() {
            this.count = this.slice.items.length;
            this.slice.items.forEach((item, index) => {
            console.log("item",item,item.member_testimonial_link.id)
        console.log("158",this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',item.member_testimonial_link.id)})
        .then( (response) => {console.log(response.results[0].data.member_name,"response")})
        )
        this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',item.member_testimonial_link.id)}).then( (response) => {
            item.member_name = response.results[0].data.member_name;
            item.member_title = response.results[0].data.member_title ;
            item.member_image = response.results[0].data.member_image;
            item.text = response.results[0].data.text ;
            this.members.push(item);
           
                    // Object.assign(item, { member_name: response.results[0].data.member_name })
                    // Object.assign(item, { member_title: response.results[0].data.member_title })
                    // Object.assign(item, { member_image: response.results[0].data.member_image })
                    // Object.assign(item, { text: response.results[0].data.text })
                    // this.members.push(item);
        })
        
        })
        console.log("final",this.members,this.count)
            
        }
    },
    async mounted() {
        this.getMembersData();
    }
}
</script>
<style>
.centerTestimonial > .slick-list > .slick-track {
    margin: auto !important;
}
/* .slick-track {
    margin: auto !important;
} */
.inner-content-wrapper.testimonial-main-wrapper{
    max-width: 1420px;
}
.testimonial-main-box{
    padding: 0 25px;
}
.testimonial-main-box .testimonial-box{
    padding: 65px 50px;
    border-radius: 20px;
    letter-spacing: normal;
    color: #000000;
}
.testimonial-main-box .testimonial-box .member_description{
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
}
.testimonial-main-box .testimonial-box .member_image{
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
}
.testimonial-main-box .testimonial-box .member_name{
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
}
.testimonial-main-box .testimonial-box .member_title{
    color: #8D8D8D;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
}
.testimonial-main-box .testimonial-box .member_box{
    margin-top: 30px;
}
.main-testimonial-main-wrapper{
    padding-bottom: 165px;
}
.testimonial-main-wrapper{
   padding: 135px 0; 
}
.small-spacing{
   padding: 0 0 135px 0 !important; 
}

@media (max-width:1199px){
    .testimonial-main-box{
        padding: 0px 15px !important;
    }
    .testimonial-main-box .testimonial-box{
        padding: 15px;
    }
    .testimonial-main-box .testimonial-box .member_description{
        font-size: 14px;
        line-height: 24px;
    }
    .testimonial-main-box .testimonial-box .member_box{
        margin-top: 15px;
    }
    .testimonial-main-box .testimonial-box .member_image{
        min-width: 40px;
        height: 40px;
    }
    .testimonial-main-box .testimonial-box .member_name,.testimonial-main-box .testimonial-box .member_title{
        font-size: 12px;
    }
    .main-testimonial-main-wrapper{
        padding-bottom: 50px;
    }
    .testimonial-main-wrapper{
        padding: 30px 0;
    }
    .small-spacing{
        padding: 0 0 30px 0 !important; 
    }
}
@media (min-width:768px) and (max-width:991px){
    .testimonial-main-box .testimonial-box{
        padding: 30px;
    }
}   
@media (min-width:992px) and (max-width:1199px){
    .testimonial-main-box .testimonial-box{
        padding: 20px;
    }
    .testimonial-main-box .testimonial-box .member_description{
        font-size: 16px;
    }
     .testimonial-main-box .testimonial-box .member_image{
        min-width: 50px;
        height: 50px;
    }
    .testimonial-main-box .testimonial-box .member_name,.testimonial-main-box .testimonial-box .member_title{
        font-size: 13px;
    }
    .main-testimonial-main-wrapper{
        padding-bottom: 70px;
    }
    .testimonial-main-wrapper{
        padding: 50px 0;
    }
    .small-spacing{
        padding: 0 0 50px 0 !important; 
    }
}
@media (min-width:1200px) and (max-width:1400px){
    .testimonial-main-box .testimonial-box{
        padding: 25px;
    }
    .section-main-title.content-h2-text-align .cms-title{
        padding-bottom: 0 !important;
        margin-bottom: 60px !important;
    }
}
 @media (min-width:1200px) and (max-width:1700px){
     .main-testimonial-main-wrapper{
        padding-bottom: 95px;
    }
     .testimonial-main-wrapper{
       padding: 50px 0;
    }
    .small-spacing{
        padding: 0 0 50px 0 !important; 
    }
  }
  @media (min-width:1401px) and (max-width:1500px){
     .testimonial-main-wrapper{
       padding: 100px 0;
    }
    .small-spacing{
        padding: 0 0 100px 0 !important; 
    }
  }
    @media (min-width:1501px) and (max-width:1600px){
    .testimonial-main-wrapper{
       padding: 120px 0;
    }
    .small-spacing{
        padding: 0 0 120px 0 !important; 
    }
  }
  @media (min-width:1501px) and (max-width:1700px){
    .testimonial-main-wrapper{
      padding: 120px 0;
    }
    .small-spacing{
        padding: 0 0 120px 0 !important; 
    }
  }

</style>