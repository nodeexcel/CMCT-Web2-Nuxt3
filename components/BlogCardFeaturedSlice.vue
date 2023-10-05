<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper featured-post-section" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper" >
                <div class="cms-main-wrap blog-cms">
                    <prismic-rich-text :field="slice.primary.title" class="topic-heading related blog-post-heading"/>
                    <div class="blog-card">
                        <div class="row">
                            <div v-for="item in blogList" :key="item.uid+'_'+Math.ceil(Math.random()*10)"  class="card-main col-sm-6 mb-4 mb-xl-5">
                                <div class="content-wrap">
                                    <n-link :to="'/blog/'+item.uid" class="card-link">
                                        <picture>
                                            <img :src="item.hero_image.card.url" class="d-block w-100">
                                        </picture>
                                        <div class="desc-box">
                                            <div class="desc text-left">
                                                <span :href="'/blog/'+item.uid" variant="light" v-for="(topic) in item.topics1" :key="topic.topic.id">{{ topicList[topic.topic.id]}} </span>
                                            </div>
                                            <h3 class="name text-left mt-0 mb-3"> {{ item.page_title[0].text }} </h3>
                                            <div class="blog-bottom-content">
                                                <prismic-rich-text :field="item.summary"/>
                                            </div>
                                        </div>
                                    </n-link>
                                </div> 
                            </div>
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
    name: 'blog-cards-featured',
    data() {
        return {
            topicList:[],
            blogList: []
        }
    },
    created() {
        // this.getData()
        // this.getTopicsData()
    },  
    methods: {
        //   getData() {
        //     this.slice.items.forEach((item, index) => {
        //         this.$prismic.api.query(this.$prismic.predicates.at('document.id', item.blog_post.id)).then(async (response) => {
        //             Object.assign(response.results[0].data, { uid: item.blog_post.uid })
        //             this.blogList.push(response.results[0].data);
        //         })
        //     })
        // },
        // async getTopicsData() {
        //     await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'topics'),{}).then(async (response) => {
        //         var sortable = [];
        //         for (let item of response.results) {
        //             sortable.push([item.id, item.data.topic]);
        //         }
        //         sortable.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
                
        //         let newTopiclist = {}
        //         sortable.forEach(function(item){
        //             newTopiclist[item[0]]=item[1]
        //         })
        //         this.topicList = newTopiclist
        //     });
        // },
    }
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
