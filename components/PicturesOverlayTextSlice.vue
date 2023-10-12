<template>
    <div class="container-background-wrapper">
        <div class="container-background-sub-wrapper" :style="{'background-color': slice.primary.background_color}">
          <section class="picturesoverlay-slice-section" >
            <div class="container">
              <div class="d-md-flex justify-content-between mx-0">
                  <div class="mb-3 mb-md-0 picturesoverlay-col" v-for="(item, index) in slice.items" :key="index">
                    <prismic-link :field="item.link" class="gallery-link">
                      <div class="slicer-image-main">
                          <div class="picturesoverlay-heading-text text-center" :style="{'color': item.top_bubble_text_color}" >{{ item.top_overlay_text}}</div>
                          <div class="picturesoverlay-img"> 
                              <source :data-srcset="item.image.url" media="(max-width: 750px)" class="lazyload" >
                              <nuxt-img :src="item.image.desktop_three_pictures.url" class="lazyload" />
                          </div>
                          <div class="picturesoverlay-subheading">{{item.bottom_overlay_text}}</div>
                      </div>
                    </prismic-link>
                  </div>
                </div>
              </div>
          </section>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['slice'],
    name: 'picture-overlay-text',
  }
  </script>
  <style scoped>
    .picturesoverlay-slice-section{
      padding: 165px 0px 165px 0px;
      margin-bottom: 165px;
    }
    .picturesoverlay-slice-section .picturesoverlay-heading-text{
      position: absolute;
      top: 30px;
      left: 30px;
      background-color: #000;
      font-size: 14px;
      color: #fff !important;
      text-transform: uppercase;
      border-radius: 20px;
      min-width: 134px;
      min-height: 33px;
      line-height: 33px;
      z-index: 1;
      font-family: 'helveticaneue-bold';
      font-weight: 700;
      transition: all 0.5s;
    }  
    .picturesoverlay-slice-section .picturesoverlay-subheading{
      font-size: 24px;
      font-family: 'helveticaneue-bold';
      line-height: 29px;
      color: #fff;
      text-transform: uppercase;
      position: absolute;
      bottom: 40px;
      left: 30px;
      max-width: 297px;
      font-weight: 700;
      min-height: 58px;
    }
    .picturesoverlay-slice-section .picturesoverlay-img img{
      width: 100%;
      transition: all 0.5s ease-in-out;
      transform: scale(1);
      border-radius: 10px;
    }
     .picturesoverlay-slice-section .picturesoverlay-img img:hover{
        transform: scale(1.2);
     }
    .picturesoverlay-slice-section .picturesoverlay-col{
      position: relative;
      overflow: hidden;
      border-radius: 10px;
    }
    
    @media (max-width:767px){
       .picturesoverlay-slice-section .picturesoverlay-col{
         margin-bottom: 0 !important;
       }
       .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
          width: 100% !important;
          border-radius: 18px !important;
      }
    }
    @media (max-width:1199px){
       .picturesoverlay-slice-section{
         padding: 30px 0 30px 0;
         margin-bottom: 50px;
       }
       .picturesoverlay-slice-section .picturesoverlay-heading-text{
         font-size: 12px;
       }
       .picturesoverlay-slice-section .picturesoverlay-heading-text{
          min-width: 125px;
          min-height: 30px;
          line-height: 30px;
          left: 15px;
          top: 15px;
       }
       .picturesoverlay-slice-section .picturesoverlay-subheading{
         font-size: 16px;
         line-height: 22px;
         left:15px;
         bottom: 30px;
         min-height: auto;
       }
    }
    @media (min-width:768px){
       .picturesoverlay-slice-section .picturesoverlay-img img{
        width: 100%;
        
      }
       .picturesoverlay-slice-section .picturesoverlay-col:first-child{
         margin-right: 15px;
      }
       .picturesoverlay-slice-section .picturesoverlay-col:last-child{
         margin-left: 15px;
      }
      .picturesoverlay-slice-section .picturesoverlay-col:nth-child(2){
        margin: 0px 7px;
      }
      .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
        border-radius: 10px !important;
      }
    }
    
    @media (min-width:768px) and (max-width:1199px){
      .picturesoverlay-slice-section .picturesoverlay-subheading{
        bottom: 25px;
        font-size: 14px;
        max-width: 200px;
      }
       .picturesoverlay-slice-section{
         padding: 30px 0px;
        margin-bottom: 50px;
      }
    }
    @media (min-width:992px) and (max-width:1199px){
      .picturesoverlay-slice-section .picturesoverlay-subheading{
          font-size: 16px;
      }
       .picturesoverlay-slice-section{
         padding: 50px 0;
        margin-bottom: 75px;
      }
      .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
        border-radius: 10px !important;
      }
    }
    /* @media (min-width:1200px) and (max-width:1400px){
       .picturesoverlay-slice-section{
         padding: 50px 0;
        margin-bottom: 95px;
      }
    } */
    @media (min-width:1200px) and (max-width:1700px){
       .picturesoverlay-slice-section{
         padding: 50px 0;
        margin-bottom: 95px;
      }
      .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
        border-radius: 12px !important;
      }
    }
    @media (min-width:1401px) and (max-width:1500px){
       .picturesoverlay-slice-section{
         padding: 100px 0;
      }
    }
      @media (min-width:1501px) and (max-width:1600px){
       .picturesoverlay-slice-section{
         padding: 120px 0;
      }
    }
    @media (min-width:1501px) and (max-width:1700px){
      .picturesoverlay-slice-section{
        padding: 120px 0;
      }
      .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
        border-radius: 12px !important;
      }
    }
  
    @media (max-width: 576px) {
      .picturesoverlay-slice-section .picturesoverlay-col .picturesoverlay-img img{
        border-radius: 14px !important;
      }
    }
  </style>