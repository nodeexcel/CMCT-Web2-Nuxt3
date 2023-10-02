<template>
    <section class="container-background-wrapper my-3">
        <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color}">
            <div class="inner-content-wrapper" >
                <div class="cms-main-wrap youtube_video-slice-padding text-img">
                    <div class="section-main-title content-h2-heading col-md-12 text-md-left mb-2 mb-xl-2 pb-xl-2">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title mb-3"/>
                    </div>
                    <div class="section-main-title content-h2-heading col-md-12 text-md-left">
                        <div  class="youtube-scr">
                            <iframe class="youtube-iframe" :src="slice.primary.youtube_link.url" 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'youtube_video',
  mounted(){
    if (this.slice.primary.youtube_link.url === 'https://youtu.be/yGLLfDNmTug'){
        this.slice.primary.youtube_link.url = 'https://www.youtube.com/embed/yGLLfDNmTug'
    }
  }
}
</script>
<style scoped>
.youtube_video-slice-padding {
    padding: 30px;
}
.youtube-scr {
    width: 100%;
}
.Youtube-link{
    padding: 0 30px;
    border-radius: 10px;
    
}
.youtube_video-slice{
    border-radius: 10px
    
}
.youtube-iframe{
    width: 100%;
    height: 47rem;
    padding: 0 !important
}
.section-main-title{
    padding: 0 !important;
}
@media (max-width:1199px){
    .youtube_video-slice-padding{
        padding: 30px 15px;
    }
}
@media (max-width:576px){
.youtube-iframe{
    height: 15rem;
}
}
@media (min-width:576px) and (max-width:768px){
.youtube-iframe{
    height: 21rem;
}
}
@media (min-width:768px) and (max-width:992px){
.youtube-iframe{
    height: 28rem;
}

}
@media (min-width:992px) and (max-width:1199px){
    .youtube_video-slice-padding{
        padding: 30px;
    }
.youtube-iframe{
    height: 34rem;
}
}
@media (min-width:1200px) and (max-width:1500px){
    .youtube_video-slice-padding{
        padding: 50px;
    }
}
@media (min-width:1401px) and (max-width:1500px){
    .youtube_video-slice-padding{
        padding: 100px 50px;
    }
}
@media (min-width:1501px) and (max-width:1700px){
    .youtube_video-slice-padding{
        padding: 120px 15px;
    }
}
@media (min-width:1501px) and (max-width:1600px){
    .youtube_video-slice-padding{
        padding: 120px 50px;
    }
}


</style>