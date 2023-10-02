<template>
    <div>
        <div v-if="slice.slice_label == '1_big_pic__4_small_pics'" class="container-background-wrapper">
            <div  class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
                <div :class="custFullWidth" >
                    <section :class="['image-gallery content-section mb-0'] + ' ' + [ custFullWidth == 'galley-full-width' ? '' : '']">
                        <div class="cms-main-wrap image-gallery-section inner-content-wrapper">
                            <div class="row">
                                <div class="section-main-title content-h2-heading col-md-6 text-md-left">
                                    <prismic-rich-text :field="slice.primary.gallery_title" :class="'cms-title mb-3 mb-xl-5 pb-xl-5 align-'+slice.primary.align"/>
                                </div>
                            </div>
                            <div :class="'row'">
                                <template v-for="(item, index) in slice.items" >
                                    <template v-if="index == 0">
                                        <div class="col-md-7 image-gallery-custom-padding" v-bind:key="index+'_img'">
                                            <prismic-image :field="item.image" class="single-image lazyload"/> <!-- this sets the right image resolution, based on the slice label -->
                                        </div>
                                        <div class="col-md-5 image-gallery-custom-col-2 my-auto" v-bind:key="index+'_desc'">
                                            <h3><prismic-rich-text :field="item.feature" class="title content-h3-heading mt-3 mt-md-0 mb-md-3 mb-lg-4"/></h3>
                                            <prismic-rich-text :field="item.image_description" class="description paragraph-description"/>
                                            <prismic-rich-text :field="item.overlay_text" />
                                            <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="col-md-4 mt-3 mb-2 mt-lg-5 pt-lg-5 image-gallery-col-section" v-bind:key="index">
                                            <prismic-image :field="item.image" class="single-image lazyload"/> <!-- this sets the right image resolution, based on the slice label -->
                                            <h3 class="mb-0"><prismic-rich-text :field="item.feature" class="title content-h4-heading mt-2 mt-lg-2 mb-lg-2 mt-xl-4 mb-xl-4 pb-1"/></h3>
                                            <prismic-rich-text :field="item.image_description" class="description main-sub-paragraph"/>
                                            <prismic-rich-text :field="item.overlay_text" />
                                            <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
                                        </div>
                                    </template>
                                </template>
                                <div class="col-md-12 text-center mt-4 pt-xl-3 mt-xl-5">
                                    <prismic-link v-if="slice.primary.button_text != null" :field="slice.primary.button_link1" class="d-inline-block large-button">
                                        {{slice.primary.button_text}}
                                    </prismic-link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <div v-else-if="slice.slice_label == '4_col'" class="container-background-wrapper">
            <div  class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
                <section class="image-gallery-4-col-main">
                    <div class="cms-main-wrap image-gallery-section inner-content-wrapper">
                        <div class="row">
                            <div class="section-main-title col-md-12 text-md-left cms-title mb-3 mb-lg-4 mb-xl-5 pb-xl-5 content-h3-heading">
                                <prismic-rich-text :field="slice.primary.gallery_title" :class="' align-'+slice.primary.align ? slice.primary.align : 'center'"/>
                            </div>
                        </div>
                        <div class="row">
                            <template v-for="(item, index) in slice.items" v-bind:key="index">
                                <div class="col-sm-6 col-md-4 col-xl-3 mb-4 mb-lg-4 mb-xl-5 pb-xl-3 image-gallery-4-col"  >
                                    <div :style="{'background-color': item.tile_background_color}" class="h-100 image-gallery-4-col-section">
                                        <prismic-image v-if="item.image['fourcol'].url" :field="item.image['fourcol']" class="single-image lazyload image-gallery-4-col-image"/> 
                                        <div class="image-gallery-description">
                                            <h3 class="mb-0"><prismic-rich-text :field="item.feature" class="title image-gallery-heading mb-2 mb-xl-4 pb-0"/></h3>
                                            <prismic-rich-text :field="item.image_description" class="description main-sub-paragraph"/>
                                            <!-- <prismic-rich-text :field="item.overlay_text" /> -->
                                            <!-- <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link> -->
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="col-md-12 text-center">
                                <prismic-link v-if="slice.primary.button_text != null" :field="slice.primary.button_link1" class="d-inline-block large-button">
                                    {{slice.primary.button_text}}
                                </prismic-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div v-else-if="slice.slice_label == '3_col'" class="container-background-wrapper">
            <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
                <section class="image-gallery-4-col-main">
                    <div class="cms-main-wrap image-gallery-section inner-content-wrapper">
                        <div class="row">
                            <div class="section-main-title col-md-12 text-center cms-title mb-4 mb-lg-5 mb-xl-5 pb-xl-5 content-h3-heading">
                                <prismic-rich-text :field="slice.primary.gallery_title" :class="'align-'+slice.primary.align ? slice.primary.align : 'center'"/>
                            </div>
                        </div>
                        <div class="row">
                            <template v-for="(item, index) in slice.items"  v-bind:key="index">
                                <div class="col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-5 mb-xl-5 pb-xl-3 image-gallery-3-col" >
                                    <div :style="{'background-color': item.tile_background_color}" class="h-100 image-gallery-3-col-section">
                                        <!-- <prismic-image :field="item.image" class="single-image lazyload image-gallery-4-col-image"/>  -->
                                        <!-- this sedsts the right image resolution, based on the slice label -->
                                        <prismic-image v-if="item.image['threecol'].url" :field="item.image['threecol']" class="single-image
                                        lazyload image-gallery-4-col-image"/>
                                        <div class="image-gallery-description">
                                            <h3 class="mb-0"><prismic-rich-text :field="item.feature" class="title image-gallery-heading  mb-2 mb-xl-4 pb-0"/></h3>
                                            <prismic-rich-text :field="item.image_description" class="description image-gallery-3-col-description"/>
                                            <!-- <prismic-rich-text :field="item.overlay_text" /> -->
                                            <!-- <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link> -->
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="col-md-12 text-center">
                                <prismic-link v-if="slice.primary.button_text != null" :field="slice.primary.button_link1" class="d-inline-block large-button">
                                    {{slice.primary.button_text}}
                                </prismic-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div v-else-if="slice.slice_label == '3_col_with_icons'" class="container-background-wrapper">
            <div  class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
                <section class="col_3_with_icons_main">
                    <div class="cms-main-wrap image-gallery-section inner-content-wrapper">
                        <div class="row">
                            <div class="section-main-title content-h2-heading col_3_with_icons_heading col-md-12 text-md-left">
                                <prismic-rich-text :field="slice.primary.gallery_title" :class="'cms-title mb-4 pb-sm-3 mb-lg-4 pb-xl-5 mb-xl-5 align-'+slice.primary.align"/>
                            </div>
                        </div>
                        <div :class="'row'">
                            <template v-for="(item, index) in slice.items" v-bind:key="index" >
                                <div class="col-sm-12 col-md-4 col-xl-4 mb-4 mb-lg-4 mb-xl-4 pb-xl-3 col_3_with_icons" >
                                    <div :style="{'background-color': item.tile_background_color}" :class="[ item.tile_background_color == null ? '' : 'col_3_with_icons_white']+ ' col_3_with_icons_section'">
                                        <prismic-image v-if="item.image['icons'].url" :field="item.image['icons']" class="single-image lazyload col_3_with_icons_section_image mb-2 mb-xl-4"/> 
                                        <div class="image-gallery-description">
                                            <h3 class="mb-0"><prismic-rich-text :field="item.feature" class="title image-gallery-heading  mb-lg-2 mb-xl-4 pb-0"/></h3>
                                            <prismic-rich-text :field="item.image_description" class="description main-sub-paragraph"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            
                            <div class="col-md-12 text-center mt-4 mt-xl-5 three_col_with_icons_link">
                                <prismic-link v-if="slice.primary.button_text != null" :field="slice.primary.button_link1" class="d-inline-block large-button">
                                    {{slice.primary.button_text}}
                                </prismic-link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div v-else-if="slice.slice_label == 'avatars_idealfor'" class="gallery-item-image avatars_idealfor">
            <div class="gallery-item-section">
                <div :class="custFullWidth" >
                    <section :class="['image-gallery content-section mb-0'] + ' ' + [ custFullWidth == 'galley-full-width' ? '' : '']">
                        <div class="cms-main-wrap">
                            <div class="row mx-0 w-100">
                                <div class="col-xl-9 px-0">
                                    <div class="mb-4 pb-2 mb-lg-5 pb-lg-3">
                                        <prismic-rich-text :field="slice.primary.gallery_title" :class="'idealfor-title text-center text-md-left cms-title align-'+slice.primary.align"/>
                                    </div>
                                    <div :class="'gallery row ' + [isGallaryClass ? gallaryClass : '']">
                                        <div class="idealfor gallery-item galley-item-avatar px-3 col-sm-6 col-md-3 col-lg-3 galley-item-grid text-center mb-4">
                                            <img v-if="slice.idealFor.idealGender.toLowerCase() == 'male'" class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/male.png" :alt="slice.idealFor.idealGender" ><!-- this sets the right image resolution, based on the slice label -->
                                            <img v-if="slice.idealFor.idealGender.toLowerCase() == 'female'" class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/female.png" :alt="slice.idealFor.idealGender" >
                                            <template v-if="slice.idealFor.idealGender == 'male and female'" >
                                                <div>
                                                <img class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/male.png" :alt="slice.idealFor.idealGender" > <span class="idealfor-or">or</span>
                                                <img class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/female.png" :alt="slice.idealFor.idealGender" >
                                                </div>
                                            </template>
                                            <div class="title gallery-item-mf-title">
                                                <div class="gallery-item-mf-years">{{ slice.idealFor.idealAge }} years old</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <hr v-if="slice.slice_devider != undefined && slice.slice_devider === true"/> -->
                    </section>
                </div>
            </div>
        </div>
        <div v-else class="gallery-item-image">
            <div class="gallery-item-section"  :class="slice.primary.gallery_title[0].text === 'Housemates' ? 'housemates' : ''">
                <div :class="custFullWidth" >
                    <section :class="['image-gallery content-section mb-0'] + ' ' + [ custFullWidth == 'galley-full-width' ? '' : '']">
                        <div class="cms-main-wrap">
                            <div class="row mx-0 w-100">
                                <div class="col-xl-9 px-0">
                                    <div class="mb-4 pb-2 mb-lg-5 pb-lg-3">
                                        <div :class="'cms-title align-'+slice.primary.align" v-if="viewMore">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <!-- <div class="title content-h3-heading"> -->
                                                    <!-- <h2> -->
                                                        <prismic-rich-text :field="slice.primary.gallery_title" :class="'idealfor-title text-center text-md-left cms-title align-'+slice.primary.align"/>
                                                    <!-- </h2> -->
                                                <!-- </div> -->
                                                <div v-show="isCollapse" class="view-more view-more-content" @click="showAll()"> Expand All +</div>
                                                <div v-show="!isCollapse" class="view-more view-more-content" @click="collapseAll()"> Collapse All -</div>
                                            </div>
                                        </div>
                                        <!-- <prismic-rich-text v-else :field="slice.primary.gallery_title" :class="'content-h3-heading text-center text-md-left cms-title align-'+slice.primary.align"/> -->
                                    </div>
                                    <div :class="'gallery row ' + [isGallaryClass ? gallaryClass : '']">
                                        <template v-for="(item, index) in galleryItems" v-bind:key="index" >
                                            <div v-if="slice.slice_label == 'onecol'" class="gallery-item col-lg-12">        
                                                <prismic-image :field="item.image[slice.slice_label]" class="single-image lazyload"/> <!-- this sets the right image resolution, based on the slice label -->
                                                <h3><prismic-rich-text :field="item.feature" class="title"/></h3>
                                                <prismic-rich-text :field="item.image_description" class="description"/>
                                                <prismic-rich-text :field="item.overlay_text" />
                                                <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
                                            </div>
                                            <div v-else-if="slice.slice_label == 'twocol'"  class="gallery-item col-lg-6">
                                                <prismic-link :field="item.link" class="gallery-link">
                                                    <prismic-image :field="item.image[slice.slice_label]" class="lazyload"/> <!-- this sets the right image resolution, based on the slice label -->
                                                    <h3 v-if="item.feature.length > 0"><prismic-rich-text :field="item.feature" class="title"/>{{item.feature.text}}</h3>
                                                    <prismic-rich-text :field="item.image_description" class="description"/>
                                                    <prismic-rich-text :field="item.overlay_text" class="image-link" />
                                                    {{ $prismic.asText(item.link_label) }}
                                                </prismic-link>
                                            </div>
                                            <div v-else-if="slice.slice_label == 'threecol'"  class="gallery-item col-lg-4">
                                            <!-- <prismic-link :field="item.link" class="gallery-link"> -->
                                                <prismic-image :field="item.image[slice.slice_label]"/> <!-- this sets the right image resolution, based on the slice label -->
                                                <h3 v-if="item.feature.length > 0"><prismic-rich-text :field="item.feature" class="title"/>{{item.feature.text}}</h3>
                                                <prismic-rich-text :field="item.image_description" class="description"/>
                                                <prismic-rich-text :field="item.overlay_text" class="image-link" />
                                                {{ $prismic.asText(item.link_label) }}
                                            <!-- </prismic-link> -->
                                            </div>
                                            <div v-else-if="slice.slice_label == 'fourcol'"  class="gallery-item col-lg-3">
                                                <prismic-image :field="item.image[slice.slice_label]" class="lazyload"/> <!-- this sets the right image resolution, based on the slice label -->
                                                <h3><prismic-rich-text :field="item.feature" class="title"/></h3>
                                                <prismic-rich-text :field="item.image_description" class="description"/>
                                                <prismic-rich-text :field="item.overlay_text" />
                                                <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
                                            </div>
                                            <div v-else-if="slice.slice_label == 'fourcol_icons'" class="gallery-item fourcol_icons col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4 mb-lg-5 mb-xl-5 pb-xl-3">
                                                <div class="fourcol_section">
                                                    <prismic-image :field="item.image['fourcol']" class="lazyload fourcol_icons_img w-100"/>
                                                    <!-- <img src="../../assets/img/four-col.png" class="w-100" alt=""> -->
                                                    <!-- this sets the right image resolution, based on the slice label -->
                                                    <div class="fourcol_icons_des">
                                                        <h3 class="mb-2 mb-xl-4"><prismic-rich-text :field="item.feature" class="title fourcol_icons_heading"/></h3>
                                                        <prismic-rich-text :field="item.image_description" class="description fourcol_icons_description"/>
                                                        <prismic-rich-text :field="item.overlay_text" />
                                                        <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="slice.slice_label == 'icons'"  class="gallery-item galley-item-icon col-lg-3 col-md-4 col-sm-6 col-xs-6 d-flex align-items-center mb-4 mb-lg-5">
                                                <img :src="item.icon" :alt="item.name" class="galley-item-img" /> <!-- this sets the right image resolution, based on the slice label -->
                                                <div class="title">
                                                    <h3 class="mb-0 pl-3 galley-item-content">{{ item.name }}</h3>
                                                </div>
                                            </div>
                                            <!-- <div v-else-if="slice.slice_label == 'avatars'" v-bind:key="index" class="gallery-item galley-item-avatar gallery-item  px-3 col-sm-6 col-md-3 col-lg-3 galley-item-grid text-center mb-4">
                                                <img v-if="item.gender && item.gender.toLowerCase() == 'male'" class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/male.png" :alt="item.gender" >
                                                <img v-if="item.gender && item.gender.toLowerCase() == 'female'" class="gallery-item-mf-img mb-2 mb-md-4" src="~/public/female.png" :alt="item.gender" >
                                                <div class="title gallery-item-mf-title">
                                                    <h3 class="gallery-item-mf-heading mb-0">{{ item.standardizedJobTitle }} <country-flag  v-if="(item.nationality != null)" class="flag-icon" :country='getcountryCode(item.nationality)' size='small' :title="item.nationality"/></h3>
                                                    <div class="gallery-item-mf-years">{{ item.age }} years old</div>
                                                    <div class="gallery-items-mf-status" :class="item.status === 'outgoing' ? 'orange' : 'green'" v-if="item.status && item.status != '' && item.status != 'current'">
                                                        <p>{{item.status}}</p>
                                                    </div>
                                                </div>
                                            </div> -->
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <hr v-if="slice.slice_devider != undefined && slice.slice_devider === true"/> -->
                    </section>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import CountryFlag from 'vue-country-flag-next'
    import countryList from './countryList.json'
    export default {
      props: ['slice'],
      name: 'image-gallery',
        // components: {
        //     CountryFlag
        // },
      data() {
        return {
            isGallaryClass: false,
            gallaryClass: '',
            custFullWidth: 'inner-content-wrapper',
            expandAll: false,
            galleryItems: [],
            viewMore: false,
            isCollapse: true
        }
      },
      methods:  {
        getcountryCode(nationality) {
            let countrycode = ''
            countryList.filter((country) => {
                if(country.name == nationality) {
                    countrycode =  country.code.toLowerCase();
                }
            });
            return countrycode;
        },
        showAll() {
               this.galleryItems = this.slice.items;
            this.isCollapse = false;
        },
        collapseAll() {
               this.galleryItems = this.slice.items.slice(0, 8);
            this.isCollapse = true;
        }
      },
      beforeMount() {
        this.galleryItems = this.slice.items;
        if(this.slice.slice_label === 'avatars') {
            this.isGallaryClass = true
            this.gallaryClass = 'galley-custom-avatar'
        } else if(this.slice.slice_label === 'icons') {
            if(this.slice.items.length > 8) {
              this.viewMore = true;
              this.galleryItems= this.slice.items.slice(0, 8);
            }
            this.isGallaryClass = true
            this.gallaryClass = 'galley-custom-icon'
            // this.custFullWidth = 'galley-full-width'
        }
        if(this.slice.primary.gallery_title[0].type === "heading3"){
            this.slice.primary.gallery_title[0].type = "heading2"
        }
      },
    }
    </script>
    
    <!-- use slice.slice_label to determine the formatting. Here are its possible values:
    onecol - should center the image, single row
    twocol (630x630) - two images per rows, possible multiple rows
    threecol (411x411) - three images per rows, likely mulpiple rows
    fourcol (308x308) - four images per rows, likely multiple rows
    icons (58x58) - three icons per rows, many rows
    avatars (630x630) - as many images per rows as possible, it could go on a second row; align left
     -->
    <style scoped>
    .image-gallery-section .image-gallery-custom-padding{
      padding-right: 40px;
    }
    .image-gallery-section{
      padding: 165px 15px;
    }
    .image-gallery-section .image-gallery-custom-padding .single-image,.image-gallery-section .image-gallery-col-section .single-image{
      border-radius: 10px;
      width: 100%;
    }
    .image-gallery-section .image-gallery-col-section .single-image{
        height: 316px;
        object-fit: cover;
    }
    .image-gallery.content-section .paragraph-description{
      font-size: 21px;
      color: #000;
      line-height: 31.5px;
      font-weight: 400;
      letter-spacing: normal;
    }
    .image-gallery.content-section .image-gallery-custom-col-2{
      padding-left: 85px;
    }
    .image-gallery-section .image-gallery-col-section:nth-child(3n+3){
      padding-right: 30px; 
    }
    .image-gallery-section .image-gallery-col-section:nth-child(3n+4) {
      padding: 0px 22.5px 0px 22.5px;
    }
    .image-gallery-section .image-gallery-col-section:nth-child(3n+5) {	
      padding-left: 30px;
    }
    .image-gallery-section .image-gallery-3-col:nth-child(3n+1),.image-gallery-section .col_3_with_icons:nth-child(3n+1){
        padding-right: 32px;
    }
    .image-gallery-section .image-gallery-3-col:nth-child(3n+2),.image-gallery-section .col_3_with_icons:nth-child(3n+2){
        padding: 0 23.5px;
    }
    .image-gallery-section .image-gallery-3-col:nth-child(3n+3),.image-gallery-section .col_3_with_icons:nth-child(3n+3){
        padding-left: 32px;
    }
    .image-gallery-section .image-gallery-3-col .image-gallery-heading :first-child{
        font-size: 24px;
        line-height: 36px;
    }
    .image-gallery-section .image-gallery-3-col-description{
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        letter-spacing: normal;
        color: #000;
    }
    .image-gallery-section .image-gallery-3-col .image-gallery-description{
        padding: 65px 50px;
        margin-top: 0;
    }
    .image-gallery-section .image-gallery-3-col  .image-gallery-3-col-section{
        border-radius: 20px;
    }
    .image-gallery-section .col_3_with_icons .col_3_with_icons_section_image{
        height: 48px;
    }
    .image-gallery-section .col_3_with_icons .image-gallery-heading :first-child{
        line-height: 36px;
        font-size: 24px;
    }
    .image-gallery-section .col_3_with_icons .main-sub-paragraph{
        font-size: 21px;
        line-height: 31.5px;
        margin-bottom: 50px;
    }
    .image-gallery-section .col_3_with_icons  .image-gallery-description{
        padding: 0;
    }
    .image-gallery-section .col_3_with_icons .col_3_with_icons_white{
        border-radius: 10px;
        padding: 65px 47px;
    }
    .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :first-child{
        font-weight: 700;
    }
    .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :last-child{
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
    }
    .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph{
        margin-bottom: 0;
    }
    .image-gallery-section .col_3_with_icons_white .col_3_with_icons_section_image {
        width: 66px;
        height: 66px;
        border-radius: 50px;
        position: absolute;
        top: -33px;
    }
    .main-sub-paragraph {
        font-size: 18px;
        line-height: 27px;
        color: #000;
         letter-spacing: normal;
         font-weight: 500;
    }
    .image-gallery-section .image-gallery-heading :first-child{
        font-size: 21px;
        font-weight: 700;
        line-height: 25px;
        color: #000;
        letter-spacing: normal;
        margin-bottom: 0;
    }
    .image-gallery-section .gallery-btn{
        min-width: 326px;
        background-color: #72BF44;
        border-radius: 30px;
        letter-spacing: normal;
        font-size: 18px;
        cursor: pointer;
        line-height: 60px;
        font-weight: 700;
        height: 60px;
        color: #000;
        transition: all 0.5s;
    }
    .image-gallery-section .gallery-btn:hover{
        background-color: #000;
        color:#fff;
    }
    .image-gallery-section .image-gallery-4-col-image{
        border-radius: 10px 10px 0 0;
        height: 240px;
        width: 100%;
        object-fit: cover;
    }
    .image-gallery-section .image-gallery-4-col-section{
        border-radius: 10px;
    }
    .image-gallery-section .image-gallery-description{
        padding: 30px;
        margin-top: -8px;
        border-radius: 0 0 10px 10px;
    }
    .container-background-wrapper{
        padding-bottom: 165px;
    }
     .galley-custom-icon .title .galley-item-content{
        font-size: 16px;
        line-height: 21px;
        letter-spacing: normal;
        font-weight: 400;
        color: #000;
        text-transform: capitalize;
        max-width: 170px;
    }
     .galley-custom-icon  .galley-item-img{
         width: 44px;
         height: 44px;
     }
     .image-gallery .view-more-content{
         font-size: 16px;
         font-weight: 700;
         letter-spacing: normal;
         color: #000;
         line-height: 19px;
         text-transform: capitalize;
         cursor: pointer;
     }
    .image-gallery  .gallery-item-mf-img{
        width: 66px;
        height: 66px;
    }
    .image-gallery .gallery-item-mf-title{
        letter-spacing: normal;
    }
    .image-gallery .gallery-item-mf-title .gallery-item-mf-heading{
        font-size: 16px;
        line-height: 21px;
        font-weight: 400;
        color: #000;
    }
    .image-gallery .gallery-item-mf-title .gallery-item-mf-years{
        font-size: 14px;
        font-weight: 700;
        color: #8D8D8D;
        line-height: 21px;
    }	
    .gallery-item-section{
        padding-top: 115px;
        margin: 0 15px;
        border-radius: 20px;
    }
    .gallery-item-image{
        max-width: 1870px;
        margin: auto;
    }
    .gallery-item-section .fourcol_icons_des{
        letter-spacing: normal;
        color: #000;
        padding: 32px;
        margin-top: -8px;
    }
    .gallery-item-section .fourcol_icons_img{
        border-radius: 10px 10px 0 0;
    }
    .gallery-item-section .fourcol_icons_heading{
        font-size: 21px;
        line-height: 25px;
        font-weight: 700;
    }
    .gallery-item-section .fourcol_icons_description{
        font-size: 18px;
        line-height: 27px;
        font-weight: 400;
         display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    .gallery-item-section .fourcol_section{
        background-color: #fff;
        border-radius: 10px;
        height: 100%;
    }
    .gallery-items-mf-status {
        font-size: 12px;
          font-weight: 700;
          color: #fff;
          text-transform: lowercase;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: normal;
          height: 20px;
          width: auto;
          margin: 0 auto;
          border-radius: 20px;
          line-height: 31px;
          padding: 0 5px;
          background-color: #72BF44;
    }
    .orange{
        background-color: rgb(255, 185, 3);	
    }
    .green {
        background-color: #72BF44;
    }
    .gallery-items-mf-status{
      position: absolute;
      top: 35%;
      right: 25%;
    }
    .housemates{
      display: none
    }
    @media (max-width:575px){
        .image-gallery-section .image-gallery-4-col-image{
            min-height: 225px;
            max-height: none;
            height: auto;
        }
    }
    @media (min-width:576px) and (max-width:767px){
        .image-gallery-section .image-gallery-4-col-image{
            height: 200px;
        }
        .image-gallery-section .image-gallery-3-col:nth-child(3n+3){
            margin: auto;
        }
    
    }
    @media (max-width:767px){
        .image-gallery-section .col_3_with_icons:nth-child(3n+3){
            margin-bottom: 10px !important;
        }
    }
    @media (max-width:1199px){	
      .image-gallery-section{
          padding: 30px 15px;
      }
      .image-gallery.content-section .image-gallery-custom-col-2{
          padding-left: 15px;
      }
      .image-gallery-section .image-gallery-custom-padding{
          padding-right: 15px;
      }
      .image-gallery.content-section .paragraph-description{
          font-size: 13px;
          line-height: 20px;
      }
      .image-gallery-section .image-gallery-col-section{
        padding: 0px 15px !important;
      }
      .main-sub-paragraph{
          font-size:13px;
          line-height: 22px;
      }
      .container-background-wrapper{
            padding-bottom: 50px;
        }		
        .image-gallery-section .image-gallery-col-section .single-image{
            height: auto;
        }
        .gallery-item-section{
            padding-top: 25px;
        }
        .image-gallery-section .image-gallery-3-col .image-gallery-description{
            padding: 15px;
        }
        .image-gallery-section .image-gallery-3-col{
            padding: 0 15px !important;
        }
        .image-gallery-section .image-gallery-3-col .image-gallery-heading :first-child{
            font-size: 18px;
        }
        .image-gallery-section .image-gallery-3-col-description{
            font-size: 15px;
            line-height: 25px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_section_image{
            height: 30px;
        }
        .image-gallery-section .col_3_with_icons .image-gallery-heading :first-child{
            font-size: 18px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :last-child{
            font-size: 15px;
            margin-bottom: 10px;
        }
        .image-gallery-section .col_3_with_icons .main-sub-paragraph{
            font-size: 15px;
            line-height: 24px;
            margin-bottom: 10px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :first-child{
            margin-bottom: 10px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white{
            padding: 40px 15px 15px 15px;
            margin-top: 33px;
        }
        .image-gallery-section .col_3_with_icons_white .col_3_with_icons_section_image{
            width: 50px;
            height: 50px;
            top: 7px;
        }
        .image-gallery-section .col_3_with_icons{
            padding: 0px 15px !important;
        }
    }
    @media (max-width:991px){
        .gallery-item-section .fourcol_icons_des{
            padding: 15px;		
        }
        .gallery-item-section .fourcol_icons_heading{
            font-size: 16px;
            line-height: 24px;
        }
        .gallery-item-section .fourcol_icons_description{
            font-size: 14px;
            line-height: 22px;
        }
        .galley-custom-icon .title .galley-item-content{
            font-size: 15px;
        }
        .image-gallery .gallery-item-mf-title .gallery-item-mf-heading{
            font-size: 15px;
        }	
        .image-gallery .gallery-item-mf-title .gallery-item-mf-years{
            font-size: 13px;
        }
        .image-gallery .view-more-content{
            font-size: 15px;
        }
        .image-gallery-section .image-gallery-heading :first-child{
            font-size: 16px;
        }
        .image-gallery-section .image-gallery-description{
            padding: 15px;
        }
        .image-gallery-section .gallery-btn{
            font-size: 16px;
            height: 45px;
            line-height: 45px;
            min-width: 250px;
        }
    }	
    @media (min-width:768px) and (max-width:991px){
        .image-gallery-section .image-gallery-3-col-description{
            font-size: 14px;
            line-height: 22px;
        }
    }
    @media (min-width:768px) and (max-width:1199px){
        .image-gallery.content-section .paragraph-description{
            font-size: 14px;
        }
        .container-background-wrapper{
            padding-bottom: 75px;
        }
        .image-gallery-section .image-gallery-col-section .single-image{
            height: 200px;
        }
        .gallery-item-section{
            padding-top: 50px;
        }
        .image-gallery-section .image-gallery-4-col-image{
            height: 200px;
        }
        .image-gallery-section .col_3_with_icons{
            margin-bottom: 5px !important;
        }
    }
    @media (min-width:768px) and (max-width:850px){
        .image-gallery-section .image-gallery-col-section .single-image{
            height: 162px;
        }
        .image-gallery-section .image-gallery-4-col-image{
            height: 162px;
        }
    }
    @media (min-width:992px) and (max-width:1199px){
        .image-gallery.content-section .paragraph-description{
            font-size: 17px;
            line-height: 22px;
        }
        .main-sub-paragraph{
            font-size: 16px;
            line-height: 22px;
        }
        .image-gallery-section{
            padding: 30px;
        }
        .container-background-wrapper{
            padding-bottom: 75px;
        }
        .image-gallery-section .image-gallery-col-section .single-image{
            height: 250px;
        }
        .gallery-item-section{
            padding-top: 25px;
        }
        .gallery-item-section .fourcol_icons_des{
            padding: 25px;		
        }
        .gallery-item-section .fourcol_icons_heading{
            font-size: 18px;
            line-height: 26px;
        }
        .gallery-item-section .fourcol_icons_description{
            font-size: 15px;
            line-height: 24px;
        }
        .image-gallery-section .image-gallery-heading :first-child{
            font-size: 18px;
        }
        .image-gallery-section .gallery-btn{
            min-width: 280px;
            height: 55px;
            line-height: 55px;
            font-size: 17px;
        }
        .image-gallery-section .image-gallery-4-col-image{
            height: 240px;
        }
    }
    @media (min-width:992px) and (max-width:1024px){
        .image-gallery-section .image-gallery-col-section .single-image{
            height: 210px;
        }
        .image-gallery-section .image-gallery-4-col-image{
            height: 210px;
        }
    }
    @media (min-width:1200px) and (max-width:1500px){
        .image-gallery-section{
            padding: 50px;
        }
        .image-gallery-section .image-gallery-col-section{
            padding: 0px 15px !important;
        }
        .image-gallery.content-section .image-gallery-custom-col-2{
            padding-left: 15px;
        }
        .section-main-title.content-h2-heading .cms-title{
            margin-bottom: 0 !important;
        }
        .image-gallery-section .image-gallery-3-col .image-gallery-description{
            padding: 25px;
        }
    }
    @media (min-width:992px){
         .image-gallery  .galley-item-grid{
            flex: 0 0 20%;
            max-width: 20%;
        }
    }
    @media (min-width:1200px) and (max-width:1400px){
        .image-gallery-section .image-gallery-col-section .single-image{
            height: 270px;
        }
        /* -------------------------- */
        .image-gallery-section .image-gallery-description{
            padding: 15px;
        }
        .image-gallery-section .image-gallery-heading{
            margin-bottom: 10px !important;
        }
        .image-gallery-section .image-gallery-heading :first-child{
            font-size: 18px;
        }
        .image-gallery-4-col-section .main-sub-paragraph{
            font-size: 16px;
            line-height: 24px;
        }
        .image-gallery-section .gallery-btn{
            min-width: 300px;
            height: 55px;
            line-height: 55px;
            font-size: 17px;
        }
        .image-gallery-4-col-main .content-h3-heading{
            padding-bottom: 0 !important;
        }
        .image-gallery-4-col-main .image-gallery-4-col{
            padding-bottom: 0 !important;
            margin-bottom: 30px !important;
        }
        .image-gallery-section .image-gallery-4-col-image{
            height: 200px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white{
            padding: 50px 25px 25px 25px;
        }
        .image-gallery-section .col_3_with_icons .main-sub-paragraph{
            font-size: 19px;
            margin-bottom: 30px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :last-child{
            font-size: 17px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_white .main-sub-paragraph :first-child{
            margin-bottom: 20px;
        }
        .image-gallery-section .col_3_with_icons .col_3_with_icons_section_image{
            height: 40px;
            margin-bottom: 15px !important;
        }
        .image-gallery-section .col_3_with_icons_white .col_3_with_icons_section_image{
            width: 60px;
            height: 60px;
            top: -30px;
        }
        .three_col_with_icons_link{
            margin-top: 30px !important;
        }	
    }
    @media (min-width:1200px) and (max-width:1600px){
        .container-background-wrapper{
            padding-bottom: 95px;
        }
        .gallery-item-section{
            padding-top: 25px;
        }
    }
    @media (min-width:1401px) and (max-width:1500px){
        .image-gallery-section{
            padding: 100px 50px;
        }
        .col_3_with_icons_heading {
            margin-bottom: 30px !important;
        }
    }
    @media (min-width:1501px) and (max-width:1700px){
        .image-gallery-section{
            padding: 120px 15px;
        }
    }
    @media (min-width:1501px) and (max-width:1600px){
        .image-gallery-section{
            padding: 120px 50px;
        }
    }
    .idealfor-or {
        vertical-align: top;
        margin-top: 15px !important;
        display: inline-block;
    }
    
    .idealfor .gallery-item-mf-img{
        width: 65px !important;
        height: 65px !important;
    }
    </style>
    