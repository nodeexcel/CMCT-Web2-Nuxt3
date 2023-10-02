<template>
    <section :class="'welcome-banner-section'" v-if="JSON.stringify(css) != {} || JSON.stringify(css) != null || JSON.stringify(css) != ''">
      <div class="homepage-banner">
        <div class="slider-outer">
          <!-- <img :src="mainView.url" :alt="mobileView.alt"> -->
          	<div class="slicer-image-full">
				<div class="slicer-image-main">
					<picture>
						<source :data-srcset="slice.primary.image.mobile.url" media="(max-width: 750px)" class="lazyload" >
            <div :style="{'height': JSON.stringify(css) - 177 +'px'}" class="welcome-banner-section-div">
						  <img :data-src="slice.primary.image.url" class="lazyload welcome-banner-section-img">
            </div>
					</picture>
          <div class="silder-content inner-content-wrapper">
            <div class="cms-main-wrap p-0 px-md-3 demo">
              <div class="slider-inner">
                <template>
                  <p class="title mt-0 mt-md-0 mb-0 mb-md-2 mb-xl-4">
                    <prismic-rich-text :field="slice.primary.title"/>
                  </p>
                  <prismic-rich-text :field="slice.primary.subtitle" v-if="slice.primary.subtitle" class="description"/>
                </template>
              </div>
            </div>
            <!-- Find-your-home component -->
					  <find-your-home-form :slice="slice"/>
				  </div>
				</div>
          <!-- <div class="silder-content inner-content-wrapper">
            <div class="cms-main-wrap p-0 px-md-3 demo d-none d-md-block">
              <div class="slider-inner">
                <template>
                  <p class="title mt-0 mt-md-0 mb-0 mb-md-2 mb-xl-4">
                    <prismic-rich-text :field="slice.primary.title"/>
                  </p>
                  <prismic-rich-text :field="slice.primary.subtitle" v-if="slice.primary.subtitle" class="description"/>
                </template>
              </div>
            </div> -->
            <!-- Find-your-home component -->
            <!-- <FindYourHomeSlice :slice="slice"/>
          </div> -->
          {{ slice }}
          <FindYourHomeSlice :slice="slice"/>
        	</div>
        </div>
      </div>
    </section>
</template>

<script>
import lazysizes from 'lazysizes';
// import FindYourHomeForm from '~/components/slices/FindYourHomeSlice.vue'
export default {
  props: ['slice', 'FindYourHome'],
  name: 'welcome-banner-full',
  // components: {
  //   FindYourHomeForm
  // },
  data(){
    return{
      cssHeight : "", 
      Width : "",
    }
  },
  computed: {
    css () {
      if (process.client) {
        this.cssHeight = window.innerHeight;
        return window.innerHeight;
      } else {
        return { /*empty style object*/ }
      }
    },
  },
  
}
</script>

<style scoped>
.h1{
  font-size: 1.3rem
}
.homepage .homepage-banner {
	width: 100%;
	background-size: cover;
	z-index: 9;
}
.homepage .image-gallery .gallery-item.col-lg-6 img {
  margin-bottom: 0;
}
.homepage .image-gallery.content-section .description > :first-child {
  margin-bottom: 25px;
}
.homepage .gallery .gallery-item:nth-child(n+5) {
  margin-top: 40px;
}
.homepage .text-slice-cms .description > :first-child {
  margin-bottom: 90px;
}
.welcome-banner-section-img{
  height:100%;
  width:100%;
  object-fit: cover;
  /* object-fit: contain; */
}

@media (max-width: 991px) {
  .homepage .gallery .gallery-item:nth-child(n+3) {
    margin-top: 20px;
  }
}
@media (max-width: 575px) {
  .homepage .gallery .gallery-item:nth-child(n+2) {
    margin-top: 20px;
  }
}
/*---------------- Half ---------------*/
.slider-cms .slicer-image-half {
  text-align: right;
  top: 150px;
  position: relative;
}
/* @media(max-width: 1499px){
  .slider-cms .half img { 
    width: 50%;
  }
} */
.slider-cms .slicer-image-half img { 
    width: 50%;
  }
/*---------------- Half ---------------*/

@media (max-width:767px){
  .slider-cms .slicer-image-half {
      display: flex;
      flex-direction: column;
      padding-top: 100px;
      top: 0;
  }
	.slider-cms .slicer-image-half img {
    display: block;
    margin: 0 auto 30px;
    padding: 0;
    width: auto;
  }
  .welcome-banner-section-div{
    height: auto !important; 
  }

}
@media (min-width:768px) and (max-width:1400px){
  .welcome-banner-section-img{
    height: calc(100% + 40px);
  }
}
@media (min-width:992px) and (max-width:1400px){
  .welcome-banner-section-img{
    height: calc(100% + 24px);
  }
}


</style>
