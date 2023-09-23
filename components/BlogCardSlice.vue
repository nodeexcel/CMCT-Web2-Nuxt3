<template>
    <section class="container-background-wrapper" >
        <div class=" container-background-sub-wrapper blogcard-space" :style="{ 'background-color': slice.primary.background }">
            .mljdi9uf9ty
        </div>
    </section>
</template>

<script>
// import moment from 'moment'
export default {
 
}
</script>

<style scoped>
.blogcard-space{
    margin-bottom: 100px;
    padding-bottom: 50px;
}
.blogcard-space .blog-card.row{
    margin: 0;
}
.blog-post-heading :first-child{
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
   padding: 100px 0;
   margin-bottom: 0;
    letter-spacing: normal;
    color: #000;
}
.blog-post-heading {
    margin-bottom: 0;
}
.blog-filter-topics {
    text-align: left;
}
.blog-filter-topics h3{
    margin-bottom: 0px;
    font-weight: bold;
    color: #000;
}
.blog-cms .blog-card .name   {
    font-size: 21px;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    margin-bottom: 30px;
    display: block;
    letter-spacing: normal;
    line-height: 31.5px; 
    min-height: 94.5px;
}
.blog-card .card-main.three-col:nth-child(3n+1){
  padding: 0 34px 0 0;
}
.blog-card .card-main.three-col:nth-child(3n+2){
    padding: 0px 17px 0px 17px;
}
.blog-card .card-main.three-col:nth-child(3n+3){
   padding: 0 0 0 34px;
}
.blog-card .card-main.four-col:nth-child(4n+1){
    padding: 0 34px 0 0;
}
.blog-card .card-main.four-col:nth-child(4n+2){
    padding: 0px 17px 0px 17px;
}
.blog-card .card-main.four-col:nth-child(4n+3){
    padding: 0px 17px 0px 17px;
}
.blog-card .card-main.four-col:nth-child(4n+4){
     padding: 0 0 0 34px;
}
.blog-cms .blog-card .content-wrap .desc-box{
    transition: 0.3s;
    padding: 30px;
    border-radius: 0 0 10px 10px;
}
.blog-card .card-main .card-link .desc {
    color: #000;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 17px;
    letter-spacing: normal;
    margin-bottom: 15px;
}
.blog-card .card-main .card-link .desc span{
    margin-right: 5px;
}
.blog-card .card-main .content-wrap {
    height: 100%;
    background: #F7F7F7;
    position: relative;
    border-radius: 10px;
}
.blog-card .card-main .content-wrap .card-link img{
    border-radius: 10px 10px 0 0;
}
.blog-card .card-main .content-wrap .blog-bottom-content {
    font-size: 18px;
    letter-spacing: normal;
    line-height: 27px;
    font-weight: 400;
    color: #000;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 81px;
}
/* ------------------------------------------------ */
.blog-filter-topics .blog-topic-items{
    background-color: #F7F7F7;
    border-radius: 20px;
}
.blog-filter-topics .blog-topic-items .badge {
    padding: 16px 32px;
    margin-bottom: 0;
    background-color: #F7F7F7;
    border-bottom: 1px solid #E4E4E4;
    color: #000;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: normal;
    font-weight: 700;
    display: block;
    text-align: left;
    border-radius: 0;
    white-space: normal;
    cursor: pointer;
    position: relative;
}
/* .blog-filter-topics .blog-topic-items .badge::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #E4E4E4;
    height: 1px;
    width: calc(100% - 64px);
}
.blog-filter-topics .blog-topic-items .badge:last-child:after{
    content: none;
} */
.blog-filter-topics .blog-topic-items .badge.filter-applied{
    background-color: rgb(114 191 68/12%);
    border-bottom: 1px solid rgba(114,191,68,.75);
}
/* .blog-filter-topics .blog-topic-items .badge.filter-applied::after{
    background-color: rgba(114,191,68,.75);
} */
.blog-filter-topics .blog-topic-items .badge:last-child{
    border-bottom: 0px;
    /* padding-bottom: 0; */
    border-radius: 0 0 20px 20px;
}
.blog-filter-topics .blog-topic-items .badge:first-child{
    /* padding-top: 0; */
    border-radius: 20px 20px 0 0;
}
@media (max-width: 1199px) {
    .faq-wrapper-sidebar{
        padding: 15px;
    }
    .blog-cms .blog-card .content-wrap .desc-box{
        padding: 15px;
    }
    .blog-card .card-main .card-link .desc{
        font-size: 11px;
        margin-bottom: 3px;
    }
    .blog-cms .blog-card .name{
        font-size: 17px;
        margin-bottom: 10px;
        line-height: 25px;
    }
    .blog-card .card-main .content-wrap .blog-bottom-content{
        font-size: 14px;
        line-height: 22px;
    }
    .blog-card .card-main{
        padding: 0 0px!important;
    }
   .blog-post-heading :first-child{
        font-size: 22px;
       line-height: 39px;
        padding: 30px 0;
    }
     .blogcard-space{
        margin-bottom: 50px;
        padding-bottom: 10px;
    }
    .blog-filter-topics .blog-topic-items .badge{
        font-size: 16px;
    }   
    .blog-filter-topics .blog-topic-items .badge{
        padding: 12px 20px;
    }
}
@media (max-width: 575px){
    .blog-card .card-main{
        max-width: 360px;
        margin: auto;
    }
}
@media (min-width:576px) and (max-width:767px){
    .blogcard-space .blog-card.row{
       margin-left: -15px;
       margin-right: -15px;
    }
}
@media (min-width:576px) and (max-width:1199px){
     .blog-card .card-main{
        padding: 0 15px!important;
    }
}
@media (min-width:768px) and (max-width:1199px){
    .blog-card .card-main:nth-child(3n+1){
       padding: 0 15px 0 0 !important;
    }
    .blog-card .card-main:nth-child(3n+2){
        padding: 0 7.5px 0 7.5px !important;
    }
    .blog-card .card-main:nth-child(3n+3){
        padding: 0 0 0 15px !important;
    }
}
@media (min-width:992px) and (max-width:1199px){
    .blog-post-heading :first-child{
        font-size: 28px;
        line-height: 39px;
    }
    .blog-card .card-main.four-col:nth-child(4n+1){
         padding: 0 15px 0 0 !important;
    }
    .blog-card .card-main.four-col:nth-child(4n+2){
       padding: 0 7.5px 0 7.5px !important;
    }
    .blog-card .card-main.four-col:nth-child(4n+3){
        padding: 0 7.5px 0 7.5px !important;
    }
    .blog-card .card-main.four-col:nth-child(4n+4){
       padding: 0 0 0 15px !important;
    }
}
@media (min-width:992px) and (max-width:1400px){
 /* --------------------------------------- */
    .blog-filter-topics .blog-topic-items{
        border-radius: 10px;
    }
    .blog-filter-topics .blog-topic-items .badge:first-child{
        border-radius: 10px 10px 0 0;
    }
      .blog-filter-topics .blog-topic-items .badge:last-child{
        border-radius: 0 0px 10px 10px;
    }
    .blog-filter-topics .blog-topic-items .badge{
        padding: 15px;
        font-size: 16px;
    }
}
@media (min-width:992px) and (max-width:1500px){
    .blogcard-space{
        margin-bottom: 75px;
        padding-bottom: 26px;
    }
    .blog-post-heading :first-child{
        padding: 50px 0;
    }
}
@media (min-width:1501px) and (max-width:1600px){
    .blogcard-space{
        margin-bottom: 75px;
        padding-bottom: 36px;
    }
    .blog-post-heading :first-child{
        padding: 60px 0;
    }
}
@media (min-width:1200px) and (max-width:1400px){
    .blog-card .card-main{
        padding: 0px 15px !important;
    }
}
</style>

