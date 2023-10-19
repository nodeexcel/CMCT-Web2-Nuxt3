<template>
    <section class="blog">
     123
      <slices-block :slices="slices"/>
    </section>
  </template>
  
  <script>
  // Imports for Prismic Slice components
//   import SlicesBlock from '~/components/SlicesBlock.vue'
  // import moment from 'moment'
  export default {
     
  }
  </script>
  <style scoped>
  
  .topic-href, .topic-href:hover {
      text-decoration: none;
  }
  
  .f-12 {
      font-size: 11px;
  }
  
  .f-10 {
      font-size: 9px;
  }
  
  .line-height {
      line-height: 15px;
  }
  
  .line-height .content-sublink {
      line-height: 15px !important;
  }
  
  .heading3 .line-height a{
      color: #000;
      text-decoration: none;
  }
  
  .line-height-h2, .line-height-h2 a{
      line-height: 15px;
      text-decoration: none;
      color: #000;
  }
  
  .heading3 .line-height a:hover,  .line-height-h2 a:hover  {
      color: #91278F;
      text-decoration: underline;
  }
  
  .toc-content-container {
      position: sticky;
      padding:1rem;
      top: 100px;
      width: 150px;
  }
  
  /* Slider Bottom */
  .blog .blog-slider .blog-title h1 {
      font-weight: bold;
      font-size: 37px;
  }
  .blog .blog-slider .blog-slider-content {
      margin-top: -300px;
      background-color: rgba(244, 244, 245, 0.9);
      z-index: 99;
      position: relative;
      padding: 20px 70px 35px 70px;
  }
  
  .blog .blog-slider .blog-slider-content-outer {
      z-index: 99;
      position: relative;
      padding: 20px 70px 35px 70px;
      margin-bottom: 100px;
      color: #000;
      display: flex;
  }
  .blog-slider-content-outer h2, .blog-slider-content-outer h3 {
      color: #000;
  }
  
  .icons {
      height: 100px;
  }
  .badge{
      display: block;
      color: #000;
      margin-bottom: 0;
      line-height: 20px;
      letter-spacing: normal;
      font-weight: 700;
      background-color: #F7F7F7;
      text-align: left;
      white-space: normal;
      cursor: pointer;
  }
  
  @media(min-width: 992px){
      .blog .blog-slider .blog-slider-content-outer {
          padding: 20px 70px 35px 0px;
      }
      .blog .blog-slider .blog-slider-content-outer .build-desc {
          padding-left: 90px;
      }
  }
  .icons-details .icon-wrap svg{
      color: rgb(114, 191, 68);
  }
  .blog .blog-slider .blog-slider-content .blog-topics {
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 20px;
      min-height: 70px;
  }
  .blog .blog-slider .blog-slider-content .blog-topics .topic {
      background-color: #feefef;
      border: 1px solid #ef5357;
      color: #000;
      font-size: 11px;
      font-weight: 600;
      padding: 0 4px;
      margin-bottom: 0;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      min-width: 80px;
      margin-top: 5px;
      text-align: center;
  }
  
  .blog .blog-slider .blog-slider-content .blog-topics .topic a {
      text-decoration: none;
  }
  
  .blog .blog-slider .blog-title > :first-child {
      margin-bottom: 10px;
      color: #222;
  }
  .blog .blog-slider .icons-details p {
      margin-bottom: 0;
      margin-right: 5px;
  }
  .blog .blog-slider .icons-details .icon ,
  .blog .blog-slider .icons-details .desc {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
  }
  .blog .blog-slider .icons-details .icon-3 .desc {
      display: block;
  }
  .blog .blog-slider .icons-details .desc {
      margin-left: 10px;
  }
  .blog .blog-slider .icons-details  {
      margin-top: 25px;
  }
  .blog .blog-slider .build-desc p {
      margin-bottom: 0;
      /* margin-top: 30px; */
  }
  .blog .blog-slider .icons-details .icon:nth-child(n+5) {
      margin-top: 15px;
  }
  .blog .blog-slider .slider-item .slider-img {
      overflow: hidden;
      width: 100%;
      display: block;
  }
  .blog .blog-slider-content .build-desc a, .blog .blog-slider-content-outer .build-desc a {
      font-size: 15px;
  }
  .blog .blog-slider-content-outer .build-desc a, .blog .blog-slider-content-outer .build-desc h3, .blog .blog-slider-content-outer .build-desc h2 {
      color: #000;
  }
  /* 27/07/20 -DAB */
  .social-share-items span {
      display: block;
      cursor: pointer;
      width: 46px;
      height: 46px;
      margin-bottom: 5px;
  }
  .social-share-items span svg.fa-icon {
      width: 46px;
      height: 46px;
  }
  .social-share-items {
      position:sticky;
      top:100px;
      z-index:100;
  }
  
  .author-image {
      height: 100px;
  }
  
  .author_box {
      padding: 50px;
      margin-bottom: 50px;
  }
  
  .author_bio p {
      margin-bottom: 1rem;
  }
  
  @media(max-width: 1024px){
      .blog .blog-slider .blog-slider-content-outer {
          padding-left: 15px;
      }
  }
  @media(max-width: 991px){
  
      .toc-content-container {
          padding: 10px;
      }
  
      .social-share-items span {
          margin-right: 4px;
          margin-bottom: 0;
      }
      .social-share-items {
          display: flex;
      }
      .blog .blog-slider .blog-slider-content-outer {
          display: block;
          position: relative;
             padding-bottom: 60px;
      }
      .blog .blog-slider .blog-slider-content-outer .social-sharing-box {
          position: absolute;
          top: auto;
          bottom: 0;
      }
  
      .blog .blog-slider .blog-slider-content-outer .table-of-content {
          top: 0;
          display: block;
          width: 100%;
          position: relative;
          margin-left: 15px;
      }
  }
  
  @media(max-width: 480px) {
      .blog-slider-content-outer {
          display: flex;
          flex-direction: column-reverse;
      }
  
      .toc-content-container {
          padding: 1rem;
          width: 90vw;
      }
  
      .toc-content-container .content-container {
          display: flex;
          flex-wrap: wrap;
      }
  
      .heading2-container {
          width: 100%;
      }
  
      .heading2-container .heading3{
          padding: 0px;
      }
  
  }
  </style>	