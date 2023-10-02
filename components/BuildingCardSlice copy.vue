<template>
    <section :style="{ 'background-color': slice.primary.background }">
        <div class="inner-content-wrapper" >
            <div class="cms-main-wrap blog-cms">
                <prismic-rich-text :field="slice.primary.title" class="topic-heading related"/>
                <div class="blog-card row">
                    <div :class="[ topics_and_authors ? 'col-lg-8': 'col-lg-12']">
                        <div class="row">
                            <div v-for="item in blogListCopy" :key="item.id"  :class="'card-main col-sm-6 col-xs-12 ' + [(slice.page_type != undefined && slice.page_type == 'blog_details') ? 'col-lg-3 col-md-3' : 'col-lg-4 col-md-4']">
                                <div class="content-wrap">
                                    <n-link :to="'/blog/'+item.uid" class="card-link">
                                    <!-- <prismic-link :field="item.blog_link" class="card-link"> -->
                                        <picture>
                                            <img :src="item.data.hero_image.card.url" class="d-block w-100">
                                        </picture>
                                        <div class="desc-box">
                                            <div class="desc text-left">
                                                {{ item.data.publish_date | moment }}
                                            </div>
                                            <h3 class="name text-left"> {{ item.data.page_title[0].text }} </h3>
                                            <div class="blog-bottom-content">
                                                <hr class="seperator-line"/>
                                                <div class="blog-topics text-right">
                                                    <b-badge :href="'/blog/'+item.uid" class="tags" variant="light" v-for="topic in item.data.topics" :key="topic.topic">{{ topicList[topic]}}</b-badge>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- </prismic-link> -->
                                    </n-link>
                                </div> 
                            </div>
                        </div>
                        <div class="row" v-if="(slice.type=='blog_listing' && totalResult > perPage)">
                            <div class="col-lg-12">
                                <paginate :maxVisibleButtons="maxVisibleButtons" :totalPages="totalPages" :total="perPage" :currentPage="currentPage" @pagechanged="pagechanged"></paginate>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 blog-filter-topics">
                        <div class="box" v-if="slice.primary.instagram_feed">
                            <prismic-rich-text :field="slice.primary.instragram_title" class="cms-title"/>
                            <hr>
                        </div>
                        <div class="box" v-if="slice.primary.social_media">
                            <prismic-rich-text :field="slice.primary.social_media_title" class="cms-title"/>
                            <div class="social-media-icons">
                                <div v-for="(item, index) in slice.items" :key="index" class="icon">
                                    <prismic-link :field="item.social_media_link" class="gallery-link">
                                        <prismic-image :field="item.social_media_icon" class="lazyload"/>
                                    </prismic-link>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="box" v-if="topics_and_authors">
                            <h2>Tags</h2>
                            <div class="blog-topic-items">
                                <b-badge :class="'tags ' + [(filterSel != '') ? filterSel.includes(index) ? 'filter-applied' : 'filter-applied-all' : 'no-filter-applied']" variant="light" v-for="(topic, index) in topicList" :key="'fil_top_'+index" @click="topicFilter(index)">{{topic}}</b-badge>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="row view-more-blogs" v-if="slice.primary.blog_link.length != 0">
                    <div class="col-lg-12">
                        <prismic-link v-if="slice.primary.blog_link[0].spans.length !=0" :field="slice.primary.blog_link[0].spans[0].data" class="more-blog-link">
                            {{ slice.primary.blog_link[0].text }}
                        </prismic-link>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script>
// import moment from 'moment'
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
            perPage: 12,
            totalPages: 0,
            currentPage: 1
        }
    },
    computed: {
        maxVisibleButtons() {
            return this.totalPages > 3 ? 3 : this.totalPages
        }
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
    created() {
        this.filterSel = []
        if(this.$route.query.topic != undefined) {
            this.getTopicsData()
            this.topicFilter(this.$cookies.get("topicId"))
        } else {
            this.$cookies.set("topicId", '');
            this.getData()
        }
    },
    methods: {
        async getTopicsData() {
            await this.$prismic.client.query(this.$prismic.predicate.at('document.type', 'topics'),{}).then(async (response) => {
                var sortable = [];
                for (let item of response.results) {
                    sortable.push([item.id, item.data.topic]);
                }
                sortable.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
                
                let newTopiclist = {}
                sortable.forEach(function(item){
                    newTopiclist[item[0]]=item[1]
                })
                this.topicList = newTopiclist
            });
        },
        async getData() {
            let limit= (this.slice.type !=undefined && this.slice.type == 'blog_listing') ? this.perPage : this.slice.primary.card_limit+1;
            let topicArray = await this.getTopicsData()
            this.filterBlog();
        },
        setBlogcards(response) {
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
                        }
                    } else { 
                        this.blogList.push(blog)
                    }
                }
            }
            this.blogList = this.blogList.slice(0, this.slice.primary.card_limit)
            this.blogListCopy = this.blogList.slice(0, this.slice.primary.card_limit)
        },
        pagechanged(page) {
            this.currentPage = page
            this.getData()
        },
        async getTopics (blog) {
            let topicArray = []
            for (let i = 0; i < blog.data.topics1.length; i++) {
                if (blog.data.topics1[i] && typeof blog.data.topics1[i].topic == 'object' && blog.data.topics1[i].topic.id) {
                    let topic = await this.$prismic.client.query(this.$prismic.predicate.at('document.id', blog.data.topics1[i].topic.id))
                    
                    topicArray.push(topic.results[0])
                }
            }
            return topicArray
        },
        async filterBlog() {
            let limit= (this.slice.type !=undefined && this.slice.type == 'blog_listing') ? this.perPage : 100;
            if(this.filterSel.length > 0) {
                await this.$prismic.client.query([
                        this.$prismic.predicate.at('document.type', 'blogpage'),
                        this.$prismic.predicate.any('my.blogpage.topics1.topic', this.filterSel),
                    ],
                    { orderings : '[my.blogpage.publish_date desc]', 'pageSize': limit, page : this.currentPage }
                ).then(async (response) => {
                    this.setBlogcards(response);
                });
            } else {
                await this.$prismic.client.query([
                        this.$prismic.predicate.at('document.type', 'blogpage')
                    ],
                    { orderings : '[my.blogpage.publish_date desc]', 'pageSize': limit, page : this.currentPage }
                ).then(async (response) => {
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
