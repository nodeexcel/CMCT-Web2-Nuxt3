<template>
    <section class="container-background-wrapper newsroom-section">
        <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper">
                <div>
                    <div v-for="(item,index) in slice.items" :key="index" class="row newsroom-row mx-0">
                        <div class="col-sm-3 col-lg-2 px-0 px-sm-3 pr-md-0 mb-3 mb-md-0">
                            <prismic-link :field="item.media_link" class="newsroom-img">
                                <prismic-image :field="item.media_logo" class="single-image newsroom-img lazyload" />
                            </prismic-link>
                        </div>
                        <div class="col-sm-9 col-lg-9 offset-lg-1 px-0 px-sm-3">
                            <p class="newsroom-subheading mb-2 mb-xl-4">{{item.article_header}}</p>
                            <prismic-rich-text :field="item.article_summary" :class="'cms-title description paragraph-description'"/>
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
    name: 'news-slice',
    data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>

<style>
.newsroom-section{
    margin-bottom: 100px;
}
.newsroom-section{
    color: #000;
    letter-spacing: normal;
}
.newsroom-section .newsroom-img{
    display: flex;
    margin: auto;
    max-height: 150px;
}
.newsroom-section .newsroom-row{
    border-bottom: 1px #E4E4E4 solid;
    padding: 65px 0;
}
.newsroom-section .newsroom-row:last-child{
    border-bottom: 0px;
}
.newsroom-section .newsroom-subheading{
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    text-transform: uppercase;
}
.newsroom-section .paragraph-description{
     font-size: 28px;
    font-weight: 700;
    line-height: 42px;
}
@media (max-width:1199px){
    .newsroom-section{
        margin-bottom: 50px;
    }
    .newsroom-section .newsroom-subheading{
        font-size: 12px;     
    }
    .newsroom-section .paragraph-description{
        font-size: 16px;
        line-height: 24px;
    }
    .newsroom-section .newsroom-row{
        padding: 30px 0;
    }
    .newsroom-section .newsroom-img img{
        max-height: 100px;
    }
}
@media (min-width:768px) and (max-width:1199px){
    .newsroom-section{
        margin-bottom: 75px;
    }
}
@media (min-width:992px) and (max-width:1199px){
    .newsroom-section .newsroom-img img{
        max-height: 120px;
    }
} 
@media (min-width:1200px) and (max-width:1400px){
     .newsroom-section .newsroom-subheading{
        font-size: 13px;     
    }
    .newsroom-section .paragraph-description{
        font-size: 24px;
        line-height: 35px;
    }
    .newsroom-section .newsroom-row{
        padding: 55px 0;
    }
    .newsroom-section .newsroom-img img{
        max-height: 120px;
    }
} 
</style>
