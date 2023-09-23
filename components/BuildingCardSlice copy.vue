<template>
    <section :style="{ 'background-color': slice.primary.background }">
        <div class="inner-content-wrapper" >
           hy8dyuydggutd haryana
        </div> 
    </section>
</template>

<script>
// import moment from 'moment'
import Paginate from '~/components/Paginate.vue'
export default {
   
}
</script>

<style scoped>
.filter-separate { 
    margin-top: 50px;
}
.blog-filter-topics {
    text-align: left;
}
.blog-filter-topics h3{
    margin-bottom: 0px;
    font-weight: bold;
    color: #000;
}
.no-filter-applied.topic {
    background-color: rgb(114 191 68 / 12%);
    border: 1px solid rgba(114,191,68,.75);
}
.filter-applied.topic {
    background-color: rgb(114 191 68 / 12%);
    border: 1px solid rgba(114,191,68,.75);
}
.filter-applied-all.topic {
    background-color: #feefef !important;
    border: 1px solid #ef5357 !important;
}
.blog-filter-topics .blog-topic-items .topic {
    height: auto !important;
    font-size: 14px !important;
    font-weight: normal !important;
    text-align: left !important;
    cursor: pointer;
    padding: 3px !important;
    line-height: normal;

    color: #000;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
    min-width: 35px;
    margin-top: 5px;
    text-align: center;
    height: 20px;
}
.view-more-blogs a{ 
    font-size: 28px;
    text-decoration: underline;
}
.view-more-blogs {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: left;
}
.topic-heading {
    margin-bottom: 50px;
    text-align: left;
}
.section-main-title .cms-title ::v-deep(:first-child) {
    color: #222222;
    margin-bottom: 40px;
    text-align: left;
}
.blog-cms {
    text-align: center;
    position: relative;
    padding: 50px 15px;
}
.blog-cms .blog-card .name   {
    font-size: 18px;
    color: #000;
    font-weight: 600;
    text-decoration: none;
    margin: 5px 0;
    display: block;
}
.blog-cms  .left-content {
    position: relative;
    background-color: #fff;
    z-index: 9;
}
.blog-cms .blog-card .title ::v-deep(:first-child) ,
.blog-cms .blog-card .desc ::v-deep(:first-child) ,
.blog-cms .blog-card .price ::v-deep(:first-child) ,
.blog-cms .blog-card .address ::v-deep(:first-child) {
    color: #000;
    margin-bottom: 0;
    line-height: normal;
}
.blog-cms .blog-card .price ::v-deep(:first-chil)d,
.blog-cms .blog-card .title ::v-deep(:first-child) {
    margin-top: 6px;
}
.blog-cms .blog-card .desc ::v-deep(:first-child) {
    margin-top: 20px;
    line-height: 22px;
}
.blog-cms .blog-card .blog-topics .topic {
    background-color: rgb(245 245 245);
    color: #000;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    min-width: 35px;
    margin-top: 5px;
    text-align: center;
    height: 20px;
}
.blog-card .card-main {
    position: relative;
    margin-bottom: 50px;
}
.blog-card .card-main .blog-bottom-content .blog-topics {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 5px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
}
.blog-card .card-main .blog-bottom-content .blog-topics .topic-content {
    position: relative;
    top: -5px;
}

.blog-card .card-main .blog-bottom-content .blog-topics .topic-content a {
    text-decoration: none;
}

.blog-bottom-content .price ::v-deep(p ){ 
    font-weight: bold;
}
.blog-card .card-main .blog-bottom-content .price {
    left: 0;
    right: 0;
    bottom: 30px;
}
.blog-cms .blog-card .content-wrap .desc-box{
    transition: 0.3s;
    /*border: 1px solid #ccc;*/
    padding: 20px 30px;
    /*border-top: none;*/
    /*-webkit-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    /*-moz-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    /*box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    margin-top: -10px;
    background-color: #fff;
}
.blog-card .card-main .card-link {
    display: block;
}
/* .blog-cms .blog-card .card-main:nth-child(n+4) {
    margin-top: 15px;
} */
.blog-card .card-main .card-link:hover {
    color: #72767B;
}
.blog-card .card-main .card-link .desc {
    color: #222;
}
.blog-card .card-main .content-wrap {
    height: 100%;
    /* border: 1px solid #ccc; */
    background: #fff;
    /* border-top: none; */
    -webkit-box-shadow: -1px 7px 20px 0px rgb(0 0 0 / 8%);
    -moz-box-shadow: -1px 7px 20px 0px rgb(0 0 0 / 8%);
    box-shadow: -1px 7px 20px 0px rgb(0 0 0 / 8%);
    position: relative;
    padding-bottom: 70px;
}
.blog-card .card-main .content-wrap .blog-bottom-content {
    position: absolute;
    bottom: 25px;
    right: 30px;
    left: 30px;
}
@media(max-width: 991px){
    .blog-cms .blog-card .card-main:nth-child(n+3) {
        margin-top: 15px;
    }
    .blog-filter-topics { 
        margin-top: 100px;
    }
}
@media (max-width: 767px) {
    .blog-cms {
        padding-top: 0px;
    }
    .blog-cms .blog-card .col-lg-6.col-md-12 {
        flex: 0 0 50%;
        max-width: 50%;
    } 
    .blog-card  {
        padding-right: 0;
        /*margin-left: 0;*/
        /*margin-right: 0;*/
    }
    .build-page .blog-card {
        padding-top: 0;
    }
    .view-more-blogs {
        text-align: center;
    }
    .view-more-blogs a{ 
        font-size: 26px;
    }
    .topic-heading {
        padding-top: 50px;
    }
}
@media (max-width: 575px) {
    .blog-cms .blog-card .col-lg-6.col-md-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }   
    .section-main-title .cms-title ::v-deep(:first-child) {
        font-size: 18px;
    }
    .blog-cms .blog-card .card-main:nth-child(n+2) {
        margin-top: 15px;
    }
}
@media (max-width: 991px) and (min-width: 684px) {
    .blog-card .card-main {
        max-width: 330px;
        /* margin: 0 auto; */
    }
}
@media (max-width: 575px) {
    .blog-card .card-main {
        max-width: 330px;
        margin: 0 auto;
    }
}
.tags {
    background-color: whitesmoke;
    color: #00aeef;
    font-size: 14px;
    padding: 10px;
}
.blog-topics .tags {
    margin: 0 0 5px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}
.blog-topic-items .tags {
    margin: 0 10px 10px 0;
}
.box h2 {
    margin: 2rem 0;
}
.social-media-icons {
    display: flex;
}
.social-media-icons .icon {
    margin-right: 20px;
}
.filter-applied.badge {
    background-color: rgb(114 191 68 / 12%);
    border: 1px solid rgba(114,191,68,.75);
}
.filter-applied-all.badge {
    background-color: #feefef !important;
    border: 1px solid #ef5357 !important;
}
</style>
