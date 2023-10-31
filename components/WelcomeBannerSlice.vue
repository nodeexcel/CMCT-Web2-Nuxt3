<template>
    <section :class="'welcome-banner-section mb-5 mb-xl-5 pb-xl-5'" class="welcome-banner-main">
      <div class="homepage-banner home-subbanner-page">
        <div class="slider-outer" v-if="slice.slice_label =='3_4'" >
			<div class="slicer-image-full">
				<div class="row align-items-center">
					<div class="col-md-3 order-2 order-md-1">
						<div class="silder-content inner-content-wrapper silder-content-box">
							<div class="slider-inner">
								<div>
									<prismic-rich-text :field="slice.primary.subtitle" v-if="slice.primary.subtitle" class="description silder-content-box-subheading mt-0 mt-md-0 mb-0"/>
									<p class="title content-h5-heading my-2 my-lg-3 mt-xl-3 pt-xl-1 mb-xl-4 pb-xl-3"><prismic-rich-text :field="slice.primary.title"/></p>
									<prismic-rich-text :field="slice.primary.body_text" v-if="slice.primary.body_text" class="description silder-content-box-description mb-3 mb-lg-4 mb-xl-5 pb-xl-2"/>
									<prismic-link v-if="slice.primary.button_text != null && slice.primary.button_text != ''" :field="slice.primary.button_link1" class="btn btn-success book-now-table-btn d-inline-block silder-content-box-btn ">
										{{ slice.primary.button_text }} 
									</prismic-link>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-9 order-1 order-md-2 mb-3 mb-md-0">
						<BCarousel 
						    v-for="(value,index) in items" :key="index"
							:indicators="items.length > 1"
							img-width="1024"
							 class="slider-img slicer-image-full home-subbanner-carousel">
								<BCarouselSlide :img-src="value.image['3/4'].url" />
						</BCarousel>
					</div>
				</div>
        	</div>
        </div>
		<div class="slider-outer" v-else-if="slice.slice_label =='full'" >
			<div class="slicer-image-full">
				<div class="row align-items-center">
					<div class="col-md-12 order-1 order-md-2 mb-3 mb-md-0">
						<div class="position-relative slicer-image-full">
							<BCarousel 
							    v-for="(value,index) in items" :key="index"
								:indicators="items.length > 1"
								img-width="1024" class="slider-img slicer-image-full home-subbanner-carousel">
									<BCarouselSlide :img-src="value.image['full'].url" />
							</BCarousel>
							<div class="slicer-image-full-content">
								<div>
									<prismic-rich-text :field="slice.primary.subtitle" v-if="slice.primary.subtitle" class="description silder-content-box-subheading mt-0 mt-md-0 mb-0"/>
									<p class="title content-h5-heading mb-0 mb-lg-3 mb-xl-4 pb-xl-2 text-center text-md-left"><prismic-rich-text :field="slice.primary.title"/></p>
									<prismic-rich-text :field="slice.primary.body_text" v-if="slice.primary.body_text" class="description silder-content-box-description mb-0 mb-lg-4 mb-xl-5 pb-xl-3"/>
									<prismic-link v-if="slice.primary.button_text != '' && slice.primary.button_text != null" :field="slice.primary.button_link1" class="btn  book-now-table-btn d-inline-block silder-content-fullbox-btn ">
										{{ slice.primary.button_text }} 
									</prismic-link>
								</div>
							</div>
						</div>
					</div>
				</div>
        	</div>
        </div>
		<div class="slider-outer banner-type-section" v-else-if="slice.slice_label =='banner'" >
			<div class="slicer-image-full">
				<div class="row align-items-center">
					<div class="col-md-12 order-1 order-md-2 mb-3 mb-md-0 position-relative">
						<BCarousel  v-for="(value,index) in items" :key="index" :indicators="items.length > 1"
                            img-width="1024" class="slider-img home-subbanner-carousel">
                         <BCarouselSlide :img-src="value.image['banner'].url" />
                        </BCarousel>
						<div>
							<p class="title content-h5-heading banner-type-heading my-2 my-lg-3 mt-xl-3 pt-xl-1 mb-xl-4 pb-xl-3 text-center text-md-left"><prismic-rich-text :field="slice.primary.title"/></p>
						</div>
					</div>
				</div>
        	</div>
        </div>
		<div class="slider-outer square-type-main-banner-bg" v-else-if="slice.slice_label =='square'" >
			<div class="slicer-image-full">
				<div class="inner-content-wrapper square-type-banner">
					<div class="row align-items-center">
						<div class="col-md-6 col-xl-4 order-2 order-md-1 square-type-col py-4 py-md-0">
							<div class="">
								<div class="">
									<div>
										<prismic-rich-text :field="slice.primary.subtitle" v-if="slice.primary.subtitle" class="description square-type-subheading"/>
										<p class="title content-h3-heading mb-3 pt-xl-1 mb-xl-5 pb-xl-3"><prismic-rich-text :field="slice.primary.title"/></p>
										<prismic-link :field="slice.primary.button_link1" class="btn btn-success book-now-table-btn d-inline-block silder-content-box-btn ">
											{{ slice.primary.button_text }} 
										</prismic-link>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-xl-7 order-1 order-md-2 mb-3 mb-md-0 offset-xl-1 pl-xl-0">
							<div
							     v-for="(value,index) in items" :key="index"
								:indicators="items.length > 1"
								img-width="1024"
								img-height="480" class="slider-img home-subbanner-carousel home-subbanner-carousel-square">
								<nuxt-img :src="value.image['square'].url" format="webp" alt="" />
									<!-- <BCarousel-slide :img-src="value.image['square'].url" ></b-carousel-slide> -->
							</div>
						</div>
					</div>
				</div>
        	</div>
        </div>
		<div class="slider-outer" v-else-if="slice.slice_label =='mosaic'" >
			<div class="slicer-image-full">
				<div class="row align-items-center">
					<div class="col-md-12 order-1 order-md-2 mb-3 mb-md-0 mosaic-image">
					<template v-for="(value,index) in items" :key="index">
							<nuxt-img :src="value.image['mosaic1'].url" format="webp" sizes="100vw sm:50vw md:400px" class="" />
				     </template>
					</div>
				</div>
        	</div>
        </div>	
      </div>
    </section>
</template>

<script>
// import lazysizes from 'lazysizes';
export default {
  props: ['slice'],
  name: 'welcome-banner',
  data () {
        return {
            options: {
                responsive: [
                    {end: 576, size: 1}, 
                    {start: 576, end: 768, size: 1},
                    {start: 768, end: 992, size: 1},
                    {size: 1}
                ],
                list: {
                    // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
                    windowed: 1200,
                    
                    // Because: #app {padding: 80px 24px;}
                    padding: 0
                },
                navigation: {
                    // when to show navigation
                    start: 360
                }
            },  
			 item: {
					// css class to inject into each individual item
					// padding between each item
					padding: 0,
				},
			 autoplay: {
				// enable/disable playing slideshow
				play: true,
				// the delay duration between slides in milliseconds
				speed: 1800,
				repeat: true,
			},
            items: this.slice.items
        }
    },
	mounted(){
		this.slice.primary.title.forEach(function (item, i) {
			item.type ="heading1"
		})
	}
}
</script>
<style scoped>
/* @import "../assets/css/common.css"; */
.welcome-banner-main{
  min-height: 350px;
}

.home-subbanner-page .silder-content-box{
	width: 600px;
	z-index: 2;
	background-color: #F7F7F7;
	border-radius: 60px 10px 10px 10px;
	position: relative;
}
.home-subbanner-page .slider-inner{
	padding: 96px;
}
.home-subbanner-page .silder-content-box-subheading :first-child{
	font-size: 15px;
	letter-spacing: normal;
	line-height: 19px;
	font-weight: 700;
	text-transform: uppercase;
	color: #000;
}
.home-subbanner-page .silder-content-box-description{
	font-size: 20px;
	color: #000;
	line-height: 36px;
	letter-spacing: normal;
	font-weight: 400;
}
.home-subbanner-page .silder-content-box-btn{
	height: 60px;
	line-height: 60px;
	border-radius: 30px;

	/* background-color:#72BF44 !important; */
	/* border-radius: 30px; */
}
.home-subbanner-page  .square-type-subheading :first-child{
	font-size: 13px;
	letter-spacing: normal;
	text-transform: uppercase;
	font-weight: 700;
	line-height: 17px;
}
.home-subbanner-page .square-type-banner{
	padding-top: 8%;
	padding-bottom: 8%;
}
.home-subbanner-page .square-type-main-banner-bg{
	background-color: #F7F7F7;
	border-radius: 20px;
}
.banner-type-section .banner-type-heading{
	position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 13.5%;
    max-width: 536px;
	margin: 0 !important;
    padding: 0 !important;
}
.home-subbanner-page  .slicer-image-full-content{
	position: absolute;
	top: 50%;
	left: 13%;
	transform: translateY(-50%);
	max-width: 536px;
}
.home-subbanner-page .silder-content-fullbox-btn{
	min-width: 326px;
	height: 60px;
	line-height: 60px;
	border-radius: 30px;
}
.mosaic-image img{
	object-fit: cover;
	width: 100%;
	height: 100%;
}
:deep(.carousel-inner) {
	border-radius: 20px;
}
.mosaic-image{
	height: 902px;
	padding-right: 45px;
	padding-left: 15px;
	display: flex;
    flex-wrap: wrap;
    position: relative;
}
.mosaic-image img:nth-child(1){
	width: calc(64.5% - 7.5px);
    height: 100%;
    margin-left: 7.5px;
    order: 2;
}
.mosaic-image img:nth-child(3){
	width: calc(17.75% - 11.25px);
    height: calc(50% - 7.5px);
    margin-top: calc(-450.5px + 7.5px);
    margin-right: 11.25px;
    order: 3;
}
.mosaic-image img:nth-child(2){
	    width: calc(35.5% - 7.5px);
    height: calc(50% - 7.5px);
    margin-bottom: 7.5px;
    margin-right: 7.5px;
    order: 1;
}
.mosaic-image img:nth-child(4){
	width: calc(17.75% - 11.25px);
    height: calc(50% - 7.5px);
    margin-top: calc(-450.5px + 7.5px);
    margin-left: 3.75px;
    margin-right: 7.5px;
    order: 4;
}
.welcome-banner-section{
	margin-bottom: 0px !important;
	padding-bottom: 100px !important;
}
:deep(.silder-content-box-description > h4)
{
	border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
}
:deep(.silder-content-box-description > p)
{
	font-weight: 400 !important;
}

/* .mosaic-image img:nth-child(1){
	width: calc(35.5% - 7.5px);
	height: calc(50% - 7.5px);
	float: left;
	margin-bottom: 7.5px;
	margin-right: 7.5px;
}
.mosaic-image img:nth-child(2){
	width: calc(64.5% - 7.5px);
	height: 100%;
	float: right;
	margin-left: 7.5px;
}
.mosaic-image img:nth-child(3){
	width: calc(17.75% - 11.25px);
	height: calc(50% - 7.5px);
	margin-top: 7.5px;
	margin-right: 11.25px;
}
.mosaic-image img:nth-child(4){
	width: calc(17.75% - 11.25px);
	height: calc(50% - 7.5px);
	margin-top: 7.5px;
	margin-left: 3.75px;
	margin-right: 7.5px;
} */
@media (max-width:991px){
	.home-subbanner-page .silder-content-box{
		width: 100%;
	}
	.home-subbanner-page .slider-inner{
		padding: 30px 15px;
	}
	.home-subbanner-page .silder-content-box-description{
		font-size: 13px;
    	line-height: 22px;
	}
	.home-subbanner-page .silder-content-box-btn{
		height: 45px;
		line-height: 45px;
	}
	.home-subbanner-page .silder-content-box-subheading :first-child{
		font-size: 12px;
		margin-bottom: 0;
	}
}
@media (max-width:767px){
	.home-subbanner-page .silder-content-box{
		border-radius: 10px;
	}
	.home-subbanner-page .square-type-banner{
		padding: 0 0 50px 0;
	}
	.home-subbanner-page .square-type-main-banner-bg{
		background-color: transparent;
	}
	.home-subbanner-page .square-type-subheading :first-child{
		font-size: 12px;
	}
	.home-subbanner-page .square-type-col{
		background-color: #F7F7F7;
		border-radius: 10px;
		margin: 0 15px;	
	}
	.home-subbanner-page  .slicer-image-full-content {
		left: 50%;
		transform: translate(-50% , -50%);
		max-width: 300px;
	}
	.home-subbanner-page .silder-content-fullbox-btn{
		height: 45px;
    	min-width: 220px;
		line-height: 45px;
	}
	.mosaic-image{
		padding-right: 15px;
		padding-left: 15px;
		height: 250px;
	}
	.mosaic-image img{
		border-radius: 10px;
	}
	.mosaic-image img:nth-child(3){
		margin-top: calc(-125px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-125px + 7.5px);
	}
	.welcome-banner-section{
		margin-bottom: 0px !important;
		padding-bottom: 50px !important;
	}
}
@media (max-width:480px){
	.mosaic-image{
		height: 200px;
	}
	.mosaic-image img:nth-child(3){
		margin-top: calc(-100.5px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-100.5px + 7.5px);
	}
	.home-subbanner-page .slicer-image-full-content{
        max-width: 360px;	
    }
	.banner-type-section .banner-type-heading {
		max-width: 250px;
		width: 100%;
	}
}
@media (min-width:576px) and (max-width:767px){
	.home-subbanner-page .slider-inner{
		padding: 30px 30px;
	}
	.mosaic-image{
		height: 400px;
	}
	.mosaic-image img:nth-child(3){
		margin-top: calc(-200.5px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-200.5px + 7.5px);
	}
}
@media (min-width:768px) and (max-width:1199px){
	.home-subbanner-page .silder-content-box{
		width: 370px;
	}
	.home-subbanner-page .slider-inner{
		padding: 30px;
	}
	.home-subbanner-page .silder-content-box-btn{
		height: 47px;
    	line-height: 47px;
	}
	.home-subbanner-page .square-type-banner{
		padding-left: 30px;
		padding-right: 30px;
	}
	.home-subbanner-page .silder-content-fullbox-btn{
		min-width: 230px;
		height: 50px;
		line-height: 50px;
	}
	.mosaic-image img{
		border-radius: 10px;
	}
}
@media (min-width:768px) and (max-width:991px){
	.home-subbanner-page .slicer-image-full-content,.banner-type-section .banner-type-heading{
		max-width: 350px;
	}
	.home-subbanner-page .silder-content-fullbox-btn{
		min-width: 200px;
		font-size: 15px;
		height: 45px;
		line-height: 45px;
	}
	.mosaic-image{
		height: 400px;
		padding: 0 15px;
	}
	.mosaic-image img:nth-child(3){
		margin-top: calc(-200.5px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-200.5px + 7.5px);
	}
}
@media (min-width:992px) and (max-width:1199px){
	.home-subbanner-page .silder-content-box-description{
		font-size: 14px;
    	line-height: 24px;
	}
	.home-subbanner-page .silder-content-box{
		width: 470px;
	}
	.home-subbanner-page .slicer-image-full-content,.banner-type-section .banner-type-heading{
		max-width: 400px;
	}
	.mosaic-image{
		height: 450px;
		padding: 0 15px;
	}
	.mosaic-image img:nth-child(3){
    	margin-top: calc(-225px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-225px + 7.5px);
	}
}
@media (min-width:1200px) and (max-width:1500px){
	.home-subbanner-page .slider-inner{
		padding: 50px;
	}
	.home-subbanner-page  .content-h5-heading{
		margin: 10px 0 15px 0 !important;
		padding: 0 0 0 0 !important;
	}
	.home-subbanner-page .silder-content-box-description{
		padding-bottom: 0 !important;
		margin-bottom: 20px !important;
	}
	.home-subbanner-page .square-type-banner{
		padding-left: 30px;
		padding-right: 30px;
	}
	.mosaic-image{
		height: 650px;
	}
	.mosaic-image img:nth-child(3){
    	margin-top: calc(-325px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-325px + 7.5px);
	}
}
@media (min-width:1501px) and (max-width:1700px){
	.home-subbanner-page .slider-inner{
		padding: 60px;
	}
	.mosaic-image{
		height: 800px;
	}
	.mosaic-image img:nth-child(3){
    	margin-top: calc(-400px + 7.5px);
	}
	.mosaic-image img:nth-child(4){
		margin-top: calc(-400px + 7.5px);
	}
}
@media (min-width:1601px) and (max-width:1700px){
	.home-subbanner-page .slider-inner{
		padding: 70px;
	}
}

.carousel-indicators > li {
	width: 10px !important;
	height: 10px !important;
  	border-radius: 50% !important;
}
</style>