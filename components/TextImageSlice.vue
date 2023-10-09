<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper text-image-slice" >
                <div class="cms-main-wrap text-image-slice-padding text-img">
                    <div class="section-main-title content-h2-heading col-md-12 text-md-left mb-4 mb-xl-5 pb-xl-5">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title"/>
                    </div>
                    <!-- For desktop version: START -->
                    <div class="desktop">
                        <template v-for="(item, index) in slice.items" :key="index">
                            <div class="row right-img-section mb-4 pb-2 mb-xl-5 pb-xl-5 text-image-slice-section"  v-if="item.image_position == 'Right'">
                                <div class="col-lg-5 col-md-6 align-self-center order-2 order-md-1">
                                    <div class="right-description">
                                        <prismic-rich-text class="title content-h3-heading mb-2 mb-xl-4 pb-xl-2" :field="item.title"/>
                                        <prismic-rich-text class="description" :field="item.subtitle"/>
                                        <prismic-rich-text class="details text-image-slice-description" :field="item.text"/> 
                                        <prismic-link v-if="item.link_text != null" :field="item.link" class="button-link text-image-slice-btn text-center d-inline-block text-capitalize text-decoration-none mt-3 mt-xl-5">{{ item.link_text}}</prismic-link>
                                    </div>
                                </div> 
                                <div class="col-lg-7 col-md-6 text-right order-1 order-md-2 mb-2">
                                    <div v-if="item.image.url && Object.keys(item.image).length != 0">
                                    <prismic-image :field="item.image" class="single-image right-img-part mb-3 mb-md-0"/>
                                </div>
                                <div v-if="item.youtube.url" class="right-video-part">
                                    <iframe :src="item.youtube.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                                    class="right-video-part mb-3 mb-md-0"></iframe>
                                </div>
                                </div>
                            </div>
                            <div class="row left-img-section mb-4 pb-2 mb-xl-5 pb-xl-5 text-image-slice-section" v-else >
                                <div class="col-lg-7 col-md-6 mb-2">
                                    <div v-if="item.image.url && Object.keys(item.image).length != 0">
                                    <prismic-image :field="item.image" class="single-image left-img-part mb-3 mb-md-0"/>
                                </div>
                                <div v-if="item.youtube.url" class="left-video-part">
                                    <iframe :src="item.youtube.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                                    class="left-video-part mb-3 mb-md-0"></iframe>
                                </div>
                                </div>  
                                <div class="col-lg-5 col-md-6 align-self-center">
                                    <div class="left-description">
                                        <prismic-rich-text class="title content-h3-heading mb-2 mb-xl-4 pb-xl-2" :field="item.title"/>
                                        <prismic-rich-text class="description" :field="item.subtitle"/>
                                        <prismic-rich-text class="details text-image-slice-description" :field="item.text"/>
                                        <prismic-link v-if="item.link_text != null" :field="item.link" class="button-link text-image-slice-btn text-center d-inline-block text-capitalize text-decoration-none mt-3 mt-xl-5">{{ item.link_text}}</prismic-link>
                                    </div>
                                </div>
                            </div>
                        </template>    
                    </div>
                    <!-- For desktop version: END -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'text-image',
  mounted(){
    this.slice.items.forEach((item) =>{
        var substringToRemove = "youtu.be";
        if(item.youtube.url != undefined ){
        item.youtube.url= item.youtube.url.replace(substringToRemove, "www.youtube.com/embed");
        }
    })
  }
}
</script>
<style scoped>
.text-image-slice .left-img-section .left-img-part{
    width: 100%;
    max-width: 762px;
    border-radius: 10px;
}
.right-video-part ,.left-video-part{
    width: 95%;
    height: 420px;
    border-radius: 10px;
}
.text-image-slice .right-img-section .right-img-part{
     width: 100%;
    max-width: 762px;
    border-radius: 10px;
}
.text-image-slice .text-image-slice-description{
    color: #000;
    letter-spacing: normal;
    font-size: 21px;
    font-weight: 400;
    line-height: 31.5px;
}
.text-image-slice .right-description{
    max-width: 472px;
}
.text-image-slice .left-description{
    max-width: 472px;
    margin-left: auto;
}
.text-image-slice .text-image-slice-btn{
    min-width: 326px;
    background-color: #72BF44;
    border-radius: 30px;
    letter-spacing: normal;
    font-size: 18px;
    line-height: 60px;
    font-weight: 700;
    height: 60px;
    color: #000;
    transition: all 0.5s;
}
.text-image-slice .text-image-slice-btn:hover{
    color: #fff;
    background-color: #000;
}
.text-image-slice-padding{
    padding: 165px 15px;
}
 .text-image-slice .text-image-slice-section:last-child{
     margin-bottom: 0 !important;
     padding-bottom: 0 !important;
}
@media (max-width:576px){
    .right-video-part ,.left-video-part{
     height: 280px;
     width: 100%;
    }
}
@media (min-width:576px) and (max-width:768px){
    .right-video-part ,.left-video-part{
     height: 350px;
     width: 100%;
    }
}
@media (min-width:768px) and (max-width:992px){
    .right-video-part ,.left-video-part{
        height: 300px !important;
    }
}
@media (max-width:1199px){
    .text-image-slice-padding{
        padding: 30px 15px;
    }
    .text-image-slice .text-image-slice-description{
        font-size: 14px;
        line-height: 22px;

    }
    .text-image-slice .text-image-slice-btn{
        min-width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
    }
    .text-image-slice .text-image-slice-description p{
        margin-bottom: 10px;
    }
    .text-image-slice .left-description{
        max-width: 100%;
        margin-left: 0;
    }
}
@media (min-width:992px) and (max-width:1199px){
    .text-image-slice-padding{
        padding: 30px;
    }
    .text-image-slice .text-image-slice-description{
        font-size: 15px;
        line-height: 24px;
    }
    .right-video-part ,.left-video-part{
        height: 350px !important;
    }
}
@media (min-width:1200px) and (max-width:1400px){
    .section-main-title.content-h2-heading{
        padding-bottom: 0 !important;
    }
}
@media (min-width:1200px) and (max-width:1500px){
    .text-image-slice-padding{
        padding: 50px;
    }
}
@media (min-width:1401px) and (max-width:1500px){
    .text-image-slice-padding{
        padding: 100px 50px;
    }
}
@media (min-width:1501px) and (max-width:1700px){
    .text-image-slice-padding{
        padding: 120px 15px;
    }
}
@media (min-width:1501px) and (max-width:1600px){
    .text-image-slice-padding{
        padding: 120px 50px;
    }
}
</style>