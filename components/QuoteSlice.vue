<template>
    <section class='content-section quote my-5 py-1 py-md-3 py-lg-4 my-xl-5 py-xl-5'>
      <div class="inner-content-wrapper"> 
          <div class="cms-main-wrap quote-cms-main">
              <template v-if="Object.keys(slice.primary.icon).length == 0">
                <div class="section-main-title content-h2-heading text-center mb-4 pb-md-2 mb-xl-5 pb-xl-5">
                  <prismic-rich-text :field="slice.primary.title" class="cms-title"/>
                </div>
              </template>
            <div class="quote-section position-relative" :style="{ 'background-color': slice.primary.background_color }">
              <div class="content-section-quote">
                <template v-if="Object.keys(slice.primary.icon).length != 0">
                  <div class="sel-care-icon">
                    <prismic-image :field="slice.primary.icon"/>
                  </div>
                </template>
                <template v-if="Object.keys(slice.primary.icon).length != 0">
                  <!-- <div :class="(slice.id == 'quote$1e308efb-9e1d-48c0-8a04-2ef286bbee36') ? 'section-main-title content-h2-heading text-center mb-4 pb-md-2 mb-xl-5 pb-xl-5' : 'content-h3-heading mb-3 mb-xl-4 pb-xl-1'"> -->
                    <prismic-rich-text :field="slice.primary.title" class="cms-title  text-center content-h3-heading mb-2 mb-xl-4 pb-xl-2"/>
                  <!-- </div> -->
                </template>
                <blockquote :class="[Object.keys(slice.primary.icon).length == 0 ? 'block-quote-description' : '' ] + ' block-quotation quote-description text-center'">
                   <prismic-rich-text :field="slice.primary.quote_text" :htmlSerializer="anotherHtmlSerializer" />
                </blockquote>
              </div>
            </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  const anotherHtmlSerializer = function (type, element, content, children) {} // Keep this line for link https://prnt.sc/v9tq4e
  export default {
    props: ['slice'],
    name: 'quote-slice',
    data() {
      return {
        cta: [],
        form: {
            city: ''
        },
        anotherHtmlSerializer
      }
    },
    mounted(){
      if(this.slice.primary.title[0] !== undefined && this.slice.primary.title[0].type == "heading2"){
      this.slice.primary.title[0].type = "heading3"
      }
    }
  }
  </script>
  
  <style scoped>
  .quote-section .content-section-quote{
     max-width: 980px;
     margin: auto;
    padding: 0 15px;
  }
  .quote-section{
    border-radius: 20px;
    padding: 70px 0px;
  }
  .quote-section .quote-description{
    /* font-size: 24px;
    line-height: 36px; */
    font-size: 21px;
    line-height: 31.5px;
    letter-spacing: normal;
    font-weight: 400;
    color: #000;
  }
  :deep(.quote-description a){
      color: #72BF44 !important;
      text-decoration: none !important;
      font-size: unset !important;
    }
  .quote-section .block-quote-description :first-child{
    font-size: 28px;
    line-height: 42px;
    font-weight: 700;
  }
  .quote-section .sel-care-icon{
    width: 64px;
    height: 64px;
    /* color: #fff;
    background-color: #000000; */
    border-radius: 50%;
    text-align: center;
    font-size: 28px;
    line-height: 64px;
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
  }
  /* :deep(.quote-description p){
    text-align: -webkit-left;
  } */
  @media (max-width:1199px){
    .quote-section .quote-description{
      /* font-size: 16px;
      line-height: 26px; */
      font-size: 14px;
      line-height: 22px;
    }
    .quote-section .block-quote-description :first-child{
      font-size: 18px;
      line-height: 28px;
    }
    .quote-section .sel-care-icon{
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      top: -25px;
    }
    .quote-section{
      padding: 40px 0px;
    }
  }
  @media (min-width:768px) and (max-width:1199px){
    .quote-section .content-section-quote{
      max-width: 80%;
    }
  }
  @media (min-width:992px) and (max-width:1199px){
    .quote-section .quote-description{
      /* font-size: 18px; */
      font-size: 15px;
      line-height: 24px
    }
    .quote-section .block-quote-description :first-child{
      font-size: 20px;
      line-height: 32px;
    }
  }
  @media (min-width:1200px) and (max-width:1400px){
    .quote-section .block-quote-description :first-child{
      font-size: 25px;
    }
  }
  </style>
  
  