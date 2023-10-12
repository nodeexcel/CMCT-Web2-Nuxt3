<template>
    <section class="container-background-wrapper" >
        <div class=" container-background-sub-wrapper blogcard-space" :style="{ 'background-color': slice.primary.background }">
            <div class="inner-content-wrapper" >
                <div class="cms-main-wrap blog-cms">
                    <prismic-rich-text :field="slice.primary.title" class="topic-heading related blog-post-heading"/>
                    <div class="blog-card row">
                        <div :class="[ topics_and_authors ? 'col-lg-9': 'col-lg-12']">
                            <div class="row" id="blogwrap">
                                <div v-for="(commentIndex,key) in recordsToShow" :key="key" :class="'card-main col-sm-6 col-xs-12 mb-4 mb-xl-5 pb-xl-3' + [(slice.page_type != undefined && slice.page_type == 'blog_details') ? 'col-lg-4 col-md-4 three-col' : 'col-lg-4 col-md-4 three-col']"> 
                                    <div v-if="key < slice.primary.card_limit && (Records[key] != undefined || Records[key] != null)">
                                        <div v-if="Records[key] != undefined" class="content-wrap" :id="Records[key].id">
                                            <n-link :to="'/blog/'+Records[key].uid" class="card-link">
                                            <!-- <prismic-link :field="item.blog_link" class="card-link"> -->
                                                <picture>
                                                    <!-- <img :src="Records[key].data.hero_image.card.url" class="d-block w-100"> -->
                                                </picture>
                                                <div class="desc-box">
                                                    <div class="desc text-left">
                                                        <span :href="'/blog/'+Records[key].uid" variant="light" v-for="(topic) in Records[key].data.topics" :key="topic+'_'+Math.ceil(Math.random()*10)">{{ topicList[topic]}} </span>
                                                    </div>
                                                    <!-- <h3 class="name text-left mt-0"> {{ Records[key].data.page_title[0].text }} </h3> -->
                                                    <div class="blog-bottom-content">
                                                        <!-- <prismic-rich-text :field="Records[key].data.summary"/> -->
                                                    </div>
                                                </div>
                                            <!-- </prismic-link> -->
                                            </n-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="(this.slice.page_type != 'blog_details' && slice.slice_type=='blog_cards' && showButton)">
                                <div class="col-lg-12 text-center">
                                    <span  @click="pagechanged" class="load-more-btn large-button d-inline-block"> Load More</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 blog-filter-topics mt-3 mt-md-0  pr-lg-0 pl-lg-3 pl-xl-5">
                            <div class="box" v-if="topics_and_authors">
                                   <div class="blog-post-heading"> <h2 class="py-0 my-0 mb-3">Topics</h2></div>
                                <div class="blog-topic-items">
                                    <b-badge :class="'tags ' + [(filterSel != '') ? filterSel.includes(index) ? 'filter-applied' : 'filter-applied-all' : 'no-filter-applied']" variant="light" v-for="(topic, index) in topicList" :key="'fil_top_'+index" @click="topicFilter(index)">{{topic}}</b-badge>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row view-more -blogs" v-if="slice.primary.blog_link != undefined && slice.primary.blog_link.length != 0">
                        <div class="col-lg-12 text-center mb-4 mb-xl-5 pb-xl-3">
                            <prismic-link v-if="slice.primary.blog_link[0].spans.length !=0" :field="slice.primary.blog_link[0].spans[0].data" class="more-blog-link text-center large-button d-inline-block">
                                {{ slice.primary.blog_link[0].text }}
                            </prismic-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// let topic = this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',blog.data.topics1[i].topic.id)})
// import moment from 'moment'
// import Paginate from '~/components/Paginate.vue'
// import Paginate from '~/components/Paginate.vue'
export default {
    props: ['slice'],   
    name: 'blog-cards',
    // components: {
    //     Paginate
    // },
    data() {
        return {
            blogList: [],
            blogListCopy: [],
            topicList:[],
            authorList:[],
            tempTopicList:[],
            tempAuthorList:[],
            topics_and_authors: (this.slice.primary.authors_and_topics != undefined) ? this.slice.primary.authors_and_topics : false,
            btcmsFilter: (this.slice.primary.topic != undefined) ? this.slice.primary.topic.id : '',
            filterSel: [],
            athourSel: [],
            finished: false,
            totalResult: '',
            perPage: this.slice.page_type == 'blog_details' ? this.slice.primary.card_limit : 9,
            totalPages: 0,
            currentPage: 1,
            // load More code
            recordsToShow : 9,
            totalRecords : 0,
            Records : [],
        }
    },
    computed: {
        showButton(){
            if(this.totalResult > this.perPage){
                return true;
            }else{
                return false;
            }
        },
        maxVisibleButtons() {
            return this.totalPages > 3 ? 3 : this.totalPages
        },
    },
    filters: {
        moment: function (date) {
            if (date && date.length) {
                const dateParts = date.split("-")
                const aDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                return aDate
                // return moment(date).format('DD-MM-YYYY');
            } else {
                return ''
            }
        }
    },
    mounted(){
        this.getTopicsData()
    },
    async created() {
        this.filterSel = []
        this.getTopicsData()
        // this.getTopics()
        this.filterBlog()
        // if(this.$route.query.topic != undefined) {
        //     await this.getTopicsData()
        //     this.topicFilter(this.$cookies.get("topicId"))
        // } else {
        //     this.$cookies.set("topicId", '');
        //     this.getData()
        // }
    },
//     "orderings": [
//     {
//       "field": "my.product.price"
//     },
//     {
//       "field": "my.product.title"
//     }
//   ]
    methods: {
        async getTopicsData() {
             var self = this
            await this.$prismic.client.get({filters:this.$prismic.filter.at('document.id','topics')},{}).then(async (response) => {
                var sortable = [];
                for (let item of response.results) {
                    sortable.push([item.id, item.data.topic]);
                }
                sortable.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
                
                let newTopiclist = {}
                sortable.forEach(function(item){
                    if(self.$route.query.topic != undefined) {
                        if(self.$route.query.topic.toLowerCase() === item[1].toLowerCase()) {
                            self.$cookies.set("topicId", item[0]);
                        }
                    }
                    newTopiclist[item[0]]=item[1]
                })
                this.topicList = newTopiclist
            });
        },
        async getData() {
            let limit= (this.slice.type !=undefined && this.slice.slice_type == 'blog_cards') ? this.perPage : this.slice.primary.card_limit+1;
            let topicArray = await this.getTopicsData()
            this.filterBlog();
        },
        setBlogcards(response) {
            this.totalRecords = response.results.length;
            this.Records = response.results;
            this.blogList = [];
            this.totalResult = response.total_results_size;
            this.totalPages = response.total_pages;
            for (let blog of Object.values(response.results)) { 
                if(blog.uid != this.slice.current_blog && this.blogList.length <= this.slice.primary.card_limit) {
                    blog.data.filtertopics = [];
                    let btfilter = false;
                    for (let i = 0; i < blog.data.topics1.length; i++) {
                        if (blog.data.topics1[i] && typeof blog.data.topics1[i].topic == 'object' && blog.data.topics1[i].topic.id) {
                            if( this.btcmsFilter != '' && this.btcmsFilter != undefined && this.btcmsFilter == blog.data.topics1[i].topic.id) {
                                btfilter = true; 
                            }
                            blog.data.filtertopics.push(blog.data.topics1[i].topic.id)
                        }
                    }
                    blog.data.topics = blog.data.filtertopics.length ? blog.data.filtertopics.slice(0, 3) : []
                    if( this.btcmsFilter != '' && this.btcmsFilter != undefined) {
                        if(btfilter == true) {
                            this.blogList.push(blog)
                            this.slice.page_type = 'blog_details'// To Show 4 in one row
                            this.perPage = this.slice.primary.card_limit
                        }
                    } else { 
                        this.blogList.push(blog)
                    }
                }
            } 
            if( this.slice.page_type == 'blog_details') {
                this.totalRecords = this.blogList.length;
                this.Records = this.blogList;
                this.totalResult = response.total_results_size;
                this.totalPages = response.total_pages;
            } else {
                this.blogList = this.blogList.slice(0,  this.perPage)
                this.blogListCopy = this.blogList.slice(0,  this.perPage);
                this.countData = this.blogListCopy.length;
            }
        },
        pagechanged(page) {
            this.recordsToShow += 9;
            this.currentPage = page
            this.perPage =  this.perPage + 9
            this.getData()
         
        },
        async getTopics (blog) {
            let topicArray = []
            for (let i = 0; i < blog.data.topics1.length; i++) {
                if (blog.data.topics1[i] && typeof blog.data.topics1[i].topic == 'object' && blog.data.topics1[i].topic.id) {
                    
                    // let topic = await this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',blog.data.topics1[i].topic.id)})
                    let topic = await this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',blog.data.topics1[i].topic.id)}).then(async (response) => {
                        console.log("response 135",response)
                        topicArray.push(response.results[0])
                    })
                    // topicArray.push(topic.results[0])
                }
            }
            return topicArray
        },
        async filterBlog() {
            let limit= (this.slice.type !=undefined && this.slice.type == 'blog_listing') ? this.perPage : 100;
            if(this.filterSel.length > 0) {
                await this.$prismic.client.get([
                {filters:this.$prismic.filter.at('document.type','blogpage')},
                {filters:this.$prismic.filter.at('my.blogpage.topics1.topic',this.filterSel)},
                        // this.$prismic.predicates.at('document.type', 'blogpage'),
                        // this.$prismic.predicates.any('my.blogpage.topics1.topic', this.filterSel),
                    ],
                    { orderings : '[my.blogpage.publish_date desc]', 'pageSize': limit }
                ).then(async (response) => {
                    console.log("response 135",response)
                    this.setBlogcards(response);
                });
            } else {
                await this.$prismic.client.get([
                {filters:this.$prismic.filter.at('document.type','blogpage')}
                    ],
                    { orderings : '[my.blogpage.publish_date desc]', 'pageSize': limit }
                ).then(async (response) => {
                    console.log("response 135",response)
                    this.setBlogcards(response);
                });
            }
        },
        topicFilter(topic) {
            this.currentPage = 1;
            if(this.filterSel.includes(topic)) {
                this.filterSel.splice(this.filterSel.indexOf(topic), 1);
            } else {
                this.filterSel.push(topic)
            }
            this.filterBlog()
        }
    }
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

