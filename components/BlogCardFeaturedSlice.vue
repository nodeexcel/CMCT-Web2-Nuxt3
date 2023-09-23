<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper featured-post-section" :style="{ 'background-color': slice.primary.background }">
          hiuhihairyhuggurtgujmbgs
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.blog-post-heading :first-child{
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    padding: 100px 0;
    margin-bottom: 0;
    letter-spacing: normal;
    color: #000;
}
.blog-post-heading{
    margin-bottom: 0;
}
.featured-post-section{
    margin-bottom: 100px;
    padding-bottom: 50px;
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
    font-size: 28px;
    color: #000;
    font-weight: 700;
    text-decoration: none;
    margin-bottom: 0;
    display: block;
    letter-spacing: normal;
    line-height: 42px;
}
.blog-card .card-main:nth-child(2n+1){
   padding: 0 40px 0 15px;
}
.blog-card .card-main:nth-child(2n+2){
    padding: 0 15px 0 40px;
}
.blog-cms .blog-card .content-wrap .desc-box{
    transition: 0.3s;
    padding: 50px;
    border-radius: 0 0 10px 10px;
}
.blog-card .card-main .card-link .desc {
    color: #000;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 17px;
    letter-spacing: normal;
    margin-bottom: 15px;
}
.blog-card .card-main .content-wrap {
    height: 100%;
    background: #f7f7f7;
    position: relative;
    border-radius: 10px;
}
.blog-card .card-main .content-wrap .card-link img{
    border-radius: 10px 10px 0 0;
    max-height: 482px;
    object-fit: cover;
}
.blog-card .card-main .content-wrap .blog-bottom-content {
    font-size: 18px;
    letter-spacing: normal;
    line-height: 27px;
    font-weight: 400;
    color: #000;
    text-align: left;
}
.blog-card .card-main .card-link .desc span{
    margin-right: 5px;
}

@media (max-width: 1199px) {
    .blog-cms .blog-card .content-wrap .desc-box{
        padding: 15px;
    }
    .blog-card .card-main .card-link .desc{
        font-size: 12px;
        margin-bottom: 3px;
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
    .featured-post-section{
        margin-bottom: 50px;
        padding-bottom: 10px;
    }
    .blog-cms .blog-card .name{
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 10px;
    }
}
@media (max-width: 575px){
    .blog-card .card-main{
        max-width: 360px;
        margin: auto;
    }
    .featured-post-section .blog-card .row{
        margin: 0;
    }
}
@media (min-width:576px) and (max-width:1199px){
     .blog-card .card-main{
        padding: 0 15px!important;
    }
}
@media (min-width:992px) and (max-width:1500px){
    .featured-post-section{
        margin-bottom: 75px;
        padding-bottom: 26px;
    }
    .blog-post-heading :first-child{
        padding: 50px 0;
    }
}
@media (min-width:1200px) and (max-width:1400px){
    .blog-cms .blog-card .name{
        font-size: 25px;
        line-height: 35px;
    }
}
@media (min-width:1501px) and (max-width:1600px){
    .featured-post-section{
        margin-bottom: 75px;
        padding-bottom: 36px;
    }
    .blog-post-heading :first-child{
        padding: 60px 0;
    }
}
</style>
