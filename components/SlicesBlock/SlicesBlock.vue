<template>
    <div :class="'slices-wrapper1 faq-content'">
        <!-- Slice section template -->
        <div :class="[(isHomeDetail != undefined && isHomeDetail === true)? 'cust-findhome-wrap': '']">
             <section v-for="(slice, index) in slices" :key="'slice-' + index" class="d-flex flex-column" :class="getClass(slice)" :style="{'--background-color': '#fff'}"> 
                <div v-if="slice.slice_type === 'text'">
                    <TextSlice :slice="slice"/>
                </div>
                <!-- Quote slice component -->
                <div v-else-if="slice.slice_type === 'quote'">
                    <QuoteSlice :slice="slice"/>
                </div>
                <!-- Image Gallery slice component -->
                <div v-else-if="slice.slice_type === 'image_gallery'">
                    <ImageGallery :slice="slice"/>
                </div>
                <!-- Section Spacer -->
                <div v-else-if="slice.slice_type === 'spacer'">
                    <SpacerSlice :slice="slice"/>
                </div>
                <!-- Section Background slice -->
                <div v-else-if="slice.slice_type === 'background'">
                    <BackgroundSlice :slice="slice"/>
                </div>
                <!-- Section Form slice -->
                <div v-else-if="slice.slice_type === 'form'">
                    <FormSlice :slice="slice" :banner="banner"/>
                </div>
                <!-- Section Blog Card slice -->
                <div v-else-if="slice.slice_type === 'blog_cards'">
                    <!-- {{ slice.slice_label }} -->
                    <BlogCardFeaturedSlice v-if="slice.slice_label === 'featured'" :slice="slice" />
                    <BlogCardSlice v-else :slice="slice"/>
                </div>             
                <!-- Section Text-image slice -->
                <div v-else-if="slice.slice_type === 'text-image'">
                    <TextImageSlice :slice="slice"/>
                </div>
                <!-- Bedrooms -->
                <div v-else-if="slice.slice_type === 'rooms'">
                    <BedroomsSlice :slice="slice"/>
                </div>
                <!-- Maprooms -->
                <div v-else-if="slice.slice_type === 'map'">
                    <MapSlice :slice="slice"/>
                </div>
                <!-- Building cards -->
                <div v-else-if="slice.slice_type === 'building_cards'">
                    <BuildingCardSlice :slice="slice" :home-lists="slice.items" :home-lists-copy="slice.items" :hide-filter="true"/>
                </div>
                <!-- Similar cards -->
                <div v-else-if="slice.slice_type === 'similar_cards'">
                    <SimilarCardSlice :slice="slice" :home-lists="slice.items" :home-lists-copy="slice.items" :hide-filter="true"/>
                </div>
                <!-- Listing cards -->
                <div v-else-if="slice.slice_type === 'listing'">
                    <ListingSlice :slice="slice"/>
                </div>
                <!-- Room Listing cards -->
                <div v-else-if="slice.slice_type === 'listing1'">
                    <RoomListingSlice :slice="slice"/>
                </div>
                <!-- table slice -->
                <div v-else-if="slice.slice_type === 'table'">
                    <TableSlice :slice="slice"/>
                </div>
                <!-- Recommandation slice -->
                <div v-else-if="slice.slice_type === 'recommendations'">
                    <RecommendationSlice :slice="slice"/>
                </div>
                <!-- FAQ topic team -->
                <div v-else-if="slice.slice_type === 'faq_topic' ">
                    {{ slice }}
                    <!-- <TopicSlice :slice="topicSlice" :faq-icon="false"/> -->
                </div>
                <!-- Welcome banner full -->
                <div v-else-if="slice.slice_type === 'welcome_banner_full'">
                    <WelcomeBannerFullSlice :slice="slice"/>
                </div>
                <!-- Welcome banner -->
                <div v-else-if="slice.slice_type === 'welcome_banner'">
                    <WelcomeBannerSlice :slice="slice"/>
                </div>
                <!-- youtube-video -->
                <div v-else-if="slice.slice_type === 'youtube_video'">
                    <YoutubeVideoSlice :slice="slice"/>
                </div>
                <!-- Picture and overlay text  -->
                <div v-else-if="slice.slice_type === 'pictures_and_overlay_text'">
                    <PicturesOverlayTextSlice :slice="slice"/>
                </div>
                <!-- Members Testimonial  -->
                <div v-else-if="slice.slice_type === 'members_testimonials'">
                    <MembersTestimonialSlice :slice="slice"/>
                </div>
                <!-- Call t action  -->
                <div v-else-if="slice.slice_type === 'call_to_action'">
                    <CallToActionSlice :slice="slice"/>
                </div>
                <!-- Team section  -->
                <div v-else-if="slice.slice_type === 'team'">
                    <TeamSlice :slice="slice"/>
                </div>
                <div v-else-if="slice.slice_type === 'news'">
                    <NewsSlice :slice="slice"/>
                </div>
                <!-- Logo section  -->
                <div v-else-if="slice.slice_type === 'partners'">
                    <PartnersSlice :slice="slice"/>
                </div>
                <div v-else-if="slice.slice_type === 'logos'">
                    <LogosSlice :slice="slice"/>
                </div>
            </section>
        </div>    
    </div>
</template>
<script setup>
import { ref, computed,onMounted } from 'vue';
import axios from 'axios';

	const props = defineProps(['slices'])
    onMounted( async () => {
		console.log("oooo",props)
        console.log(Object.values(props));
    
    })
</script>

<script >
// Imports for all slices
// const TextSlice = () => import("./slices/TextSlice.vue");
// const QuoteSlice = () => import("./slices/QuoteSlice.vue");
// const ImageGallery = () => import("./slices/ImageGallery.vue");
// const SpacerSlice = ()=> import("./slices/SpacerSlice.vue");
// const BackgroundSlice = ()=> import("./slices/BackgroundSlice.vue");
// const FormSlice = ()=> import("./slices/FormSlice.vue");
// const BlogCardSlice = ()=> import("./slices/BlogCardSlice.vue");
// const BlogCardFeaturedSlice = ()=> import("./slices/BlogCardFeaturedSlice.vue");
// const TextImageSlice = ()=> import("./slices/TextImageSlice.vue");
// const RoomSlice = ()=> import("./slices/BedroomsSlice.vue");
// const MapSlice = ()=> import("./slices/MapSlice.vue");
// const BuildingCardSlice = ()=> import("./slices/BuildingCardSlice.vue");
// const SimilarCardSlice = ()=> import("./slices/SimilarCardSlice.vue");
// const ListingSlice = ()=> import("./slices/ListingSlice.vue");
// const TableSlice = ()=> import("./slices/TableSlice.vue");
// const RecommendationSlice = ()=> import("./slices/RecommendationSlice.vue");
// const TopicSlice = ()=> import("./slices/TopicSlice.vue");
// const RoomListingSlice = ()=> import("./slices/RoomListingSlice.vue");
// const WelcomeBannerFullSlice = ()=> import("./slices/WelcomeBannerFullSlice.vue");
// const WelcomeBannerSlice = ()=> import("./slices/WelcomeBannerSlice.vue");
// const PicturesOverlayTextSlice = ()=> import("./slices/PicturesOverlayTextSlice.vue");
// const MembersTestimonialSlice = ()=> import("./slices/MembersTestimonialSlice.vue");
// const CallToActionSlice = ()=> import("./slices/CallToActionSlice.vue");
// const TeamSlice = ()=> import("./slices/TeamSlice.vue");
// const NewsSlice = ()=> import("./slices/NewsSlice.vue");
// const LogosSlice = ()=> import("./slices/LogosSlice.vue");
// const YoutubeVideoSlice = ()=> import("./slices/YoutubeVideoSlice.vue");
// const PartnersSlice = () => import("./slices/PartnersSlice.vue");
{/* <script> */}
export default {
    props: ['slices', 'banner', 'isHomeDetail', 'pageId', 'isMapOnPage'],
//   name: 'slices-block',
//   components: {
//     TextSlice,
//     QuoteSlice,
//     ImageGallery,
//     SpacerSlice,
//     BackgroundSlice,
//     FormSlice,
//     BlogCardSlice,
//     BlogCardFeaturedSlice,
//     TextImageSlice,
//     RoomSlice,
//     MapSlice,
//     BuildingCardSlice, 
//     ListingSlice,
//     TableSlice,
//     RecommendationSlice,
//     TopicSlice,
//     SimilarCardSlice,
//     RoomListingSlice,
//     WelcomeBannerFullSlice,
//     WelcomeBannerSlice,
//     PicturesOverlayTextSlice,
//     MembersTestimonialSlice,
//     CallToActionSlice,
//     TeamSlice,
//     NewsSlice,
//     LogosSlice,
//     YoutubeVideoSlice,
//     PartnersSlice
//   },
  data() {
    return {
        // backgroundColor: '',
        // topicSlice:[],
        // isTopicSlice: false,
        // hideLogos: false
    }
  },
  methods: {
      getClass(slice) {
          let className = '';
            if(this.isMapOnPage === true && (slice.slice_type != 'listing' && slice.slice_type != 'listing1')) {
                className = 'section-overlap map-zindex';
            }
            console.log("className",this.isMapOnPage)
          return className;
      }
  },
  mounted(){
    if(this.$route.path == '/page/community'){
		this.hideLogos = true       
	  }
      console.log("this.slices",this.slices)
    // if(this.$route.path == '/page/faqs'){
    //  this.slices.forEach((item,index) =>{
    //     if(item.slice_type == "faq_topic" ){
    //    this.topicSlice.push(item)
    //   }
    //   if(index == 1 && item.slice_type == "faq_topic" ){
    //     item.slice_type = "faq_topic" 
    //   }
    //   else if(index != 1 && item.slice_type == "faq_topic" ){
    //     item.slice_type = ""
    //   }     
    //  })
    // } 
    // this.isTopicSlice = true   
  }
}
</script>
<style scoped>
.section-overlap .image-gallery {
    position: relative;
    margin-bottom: 0;
    padding-bottom: 3.75rem;
}
.section-overlap .section-spacer,
.section-overlap .member-wrapper {
    position: relative;
}
.section-overlap {
    position: relative;
    background-color: var(--background-color);
}
.map-zindex {
    z-index: 1;
}
.section-overlap .image-gallery.content-section {
    margin-bottom: 0px !important;
}
.cust-findhome-wrap{
    position: relative;
}
section.section-overlap.map-zindex{
    width: 100% !important;
}
</style>