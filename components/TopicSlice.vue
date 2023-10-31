<template>
    <section class="inner-content-wrapper pb-3 faq-content-section">
      <div class="cms-main-wrap">
        <div class="row mx-0 faq-content-row">
          <div class="col-md-9 px-0 order-2 order-md-1">
            <div v-for="(slice) in newSlice" :key="slice.id" class="">
              <div class="topic" :id="getId(slice.primary.title)">          
                <div class="faq-content-row faq-wrapper d-flex flex-column mb-4 mb-lg-5">                
                  <h2><prismic-rich-text :field="slice.primary.title" class="topic-heading my-4 my-md-4 pt-lg-2 my-xl-5 pt-xl-3 faq-heading"/></h2>
                  <div class="gallery" :id="'accordion'+(slice.primary.title[0].text).trim().replace(/\s/g,'')">
                      <div v-for="(item, index) in slice.items" :key="item.id" class="gallery-item">
                          <div class="topic-right card">
                            <div class="card-header" :id="'headingOne_'+index" @click="switchContent(index)">
                                <div class="card-collapse-header collapsed"  data-toggle="collapse" :data-target="'#collapseOne_'+index+(slice.primary.title[0].text).trim().replace(/\s/g,'')" :aria-controls="'collapseOne_'+index+(slice.primary.title[0].text).trim().replace(/\s/g,'')">
                                  <prismic-rich-text :field="item.question" class="topic-title" :class="index == 0 && showPlus == false ? 'minusSign':'plusSign'" />
                                </div>
                            </div>
                            <div :id="'collapseOne_'+index+(slice.primary.title[0].text).trim().replace(/\s/g,'')" class="collapse card-body-collapse" :class="index == 0 && 'collapseOne_'+index+(slice.primary.title[0].text).trim().replace(/\s/g,'') == 'collapseOne_'+0+(slice.primary.title[0].text).trim().replace(/\s/g,'') ? 'show':''" :aria-labelledby="'headingOne_'+index" :data-parent="'#accordion'+(slice.primary.title[0].text).trim().replace(/\s/g,'')">
                              <div class="card-body">
                                    <prismic-rich-text :field="item.answer" class="topic-desc"/>
                                    <prismic-link :field="item.link" class="gallery-link">{{ item.link_label }}</prismic-link>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3  mt-md-0  pr-md-0 pl-md-3 pl-xl-5 order-1 order-md-2" >   
          <div class="faq-wrapper-sidebar mb-4  mb-lg-5">
            <div v-for="(item,index) in $store.state.faq_topic" :key="index" class="topic-right-sidebar" @click="routeQuery(item)">
              <div>
                <div class="card-header-sidebar cursor-pointer">
                  <prismic-rich-text :field="item.primary.title" class="topic-slice-title"  
                   role="button" />  
                </div>
              </div>
            </div>
          </div>
          <!-- {{ $store.state.faq_topic.page_content }} -->
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  props: ['slice', 'faqIcon'],
  name: 'topic-slice',
  data(){
    return{
      showPlus : false,
      rendered : false,
      cursor: 'pointer',
    }
  },
  watch:{ 
    showPlus(newValue){
      this.showPlus = newValue
    },
  },
  computed:{
    matchString(){
      let slice2 = this.slice.filter((item, index) => this.slice.indexOf(item) === index);
      if(this.$store.state.hasOwnProperty('faq_topic') && this.$store.state.faq_topic != null){
        slice2.forEach((slice) =>{
        if(this.$store.state.faq_topic != null && this.$store.state.faq_topic.length > 0 && slice.primary.title[0].text != null){
          if(slice.primary.title[0].text == this.$store.state.faq_topic[0].primary.title[0].text){
            return true;
          }
        }
      })
      }else{
        return false;
      }
    },
    newSlice(){
      // this.slice.filter((item, index) => this.slice.indexOf(item) === index);
      return this.slice.filter((item, index) => this.slice.indexOf(item) === index);
    }
  },
  methods:{
    getId(item){
      var id = (item[0].text).replace(/ /g,'');
      return id;
    },
    goto(item){
      var id = (item.primary.title[0].text).replace(/ /g,'');
      return '#'+id
    },
    switchContent(index){
      if(index == 0){
        this.showPlus = !this.showPlus;
      }else{
        this.showPlus = true;
      }
    },
    routeQuery(item) {
      const id = this.goto(item).split('#').join('')
      this.$router.push({ path: this.$route.path,
        query: {'#': id}})
        this.scrollToSection()
    },
    scrollToSection() {
      if(this.$store.state.faq_topic !== null){
      this.$store.state.faq_topic.forEach((item) =>{
      if(this.$route.fullPath.includes(item.primary.title[0].text.split(' ').join('').trim())){
        if(this.$route.query['#'] === item.primary.title[0].text.replace(/ /g,'')) {
        const ID = this.$route.query['#']
        document.getElementById(`${ID}`).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
      }
      }
    })
  }
  }
  },
  created(){
     this.rendered = true;
  },
  mounted() {
    // value?: string
    this.scrollToSection()
  }
}
</script>


<style scoped>
.cursor-pointer {
  cursor: pointer !important;
}
.faq-wrapper{
  background-color: #F7F7F7;
  border-radius: 20px;
  padding: 0 65px 65px 65px;
}

.faq-wrapper-sidebar{
  background-color: #F7F7F7 !important;
  border-radius: 20px;
  position: sticky;
  top: 150px;
  padding: 32px;
}
.topic-right-sidebar {
  padding: 16px 0;
  margin-bottom: 0;
  background-color: #F7F7F7 !important;
  border-bottom: 1px solid #E4E4E4;
}
.topic-right-sidebar:first-child{
  padding-top: 0;
}
.topic-right-sidebar:last-child{
  border-bottom: none;
  padding-bottom: 0;
}
.topic .gallery .gallery-item {
  margin-bottom: 0;
}
.topic .gallery .gallery-item .topic-left {
  float: left;
}
.topic .gallery {
  padding: 0;
}
.topic .show-more-link ,
.topic .show-less-link {
  font-size: 13px;
  color: #f06161;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
}
.topic .show-more-link i,
.topic .show-less-link i {
  margin: 0 12px 0 5px;
  font-size: 13px;
}
.topic .topic-heading ::v-deep(:first-child) {
    color: #000;
    margin-bottom: 0;
    font-size: 41px;
    letter-spacing: normal;
    line-height: 50px;
    font-weight: 700;
}
.topic .gallery-item .topic-title ::v-deep(:first-child) {
  color: #222;
  margin-bottom: 0;
    font-size: 23px;
    line-height: 29px;
    letter-spacing: normal;
    font-weight: 700;
}

.topic .gallery-item .card-header {
  border: 0;
  padding: 0;
  border-top: 1px #E4E4E4 solid;
}
.topic .gallery-item .card{
  border: 0;
}
.topic .gallery-item .card-collapse-header{
  margin: 30px 0 30px 0;
  position: relative;
  
}
.topic .gallery-item .card-collapse-header .topic-title{
  position: relative;
  padding-right: 20px;
  cursor: pointer;
}
.topic .gallery-item .card-collapse-header.collapsed .topic-title::after,.topic .gallery-item .card-collapse-header.collapsed .topic-title::before,.topic .gallery-item .card-collapse-header .topic-title::before{
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  background-color: #000;
}
.topic .gallery-item .card-collapse-header.collapsed .topic-title::after{
  width: 2px;
  height: 18px;
  transform: translateY(-50%);
}
.minusSign::after{
  width: 2px;
  height: 0px !important;
  transform: translateY(-50%);
}
.plusSign::after{
  width: 2px;
  height: 18px !important;
  transform: translateY(-50%);
}
.topic .gallery-item .card-collapse-header.collapsed .topic-title::before,.topic .gallery-item .card-collapse-header .topic-title::before{
  width: 18px;
  height: 2px;
  right: 0px;
  transform: translateY(-50%);
}
.topic .gallery-item:last-child .card-collapse-header.collapsed{
  margin-bottom: 0;
  transition: all 0.5s;
}
.topic .gallery-item:first-child .card-collapse-header{
  margin-top: 0;
}
.topic .gallery-item:first-child .card-header{
  border-top: 0px;
}
.topic .gallery-item:last-child .card-body{
  padding-bottom: 0;
}
.topic .gallery-item .collapse,.topic .gallery-item .card-body {
  background-color: #F7F7F7;
  padding: 0;
}
.topic .gallery-item .card-body {
  padding-bottom: 25px;
}
.topic .gallery-item .topic-desc ::v-deep(:first-child) {
  color: #222;
  letter-spacing: normal;
  font-size: 17px;
  line-height: 27px;
  font-weight: 400;
  margin-bottom: 24px;
}
.topic .gallery-item .topic-desc{
 font-size: 17px;
  line-height: 27px;
  font-weight: 400;
  letter-spacing: normal;
  color: #222;
  padding-left: 40px;
}
.cls-faq-section section:nth-child(even) > .topic{
  background-color: #fff8e5;
}
.topic-slice-title :first-child{
  color: #000;
  margin-bottom: 0;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: normal;
  font-weight: 700;
}
/* .topic .faq-content-section:last-child{
  margin-bottom: 165px !important;
} */
@media (max-width: 1199px) {
  .faq-wrapper{
    padding: 0 15px 24px 15px;
  }
  .topic .topic-heading :first-child{
    font-size: 23px;
    line-height: normal;
    margin-bottom: 0;
  }
  .topic .gallery-item .topic-title :first-child{
    font-size: 16px;
  }
  .topic .gallery-item .topic-desc{
    font-size: 13px;
    padding-left: 0;
    line-height: 21px;
  }
  .topic .gallery-item .topic-desc :first-child{
    font-size: 13px;
    line-height: 21px;
  } 
  .topic .gallery-item .card-collapse-header {
      margin: 15px 0 15px 0px;
  }
  .topic .gallery-item .card-collapse-header.collapsed .topic-title::after{
    height: 16px;
  }
  .topic .gallery-item .card-collapse-header.collapsed .topic-title::before,.topic .gallery-item .card-collapse-header .topic-title::before{
    width: 16px;
    right: 1px;
  }
  .topic .gallery-item .card-body{
    padding-bottom: 15px;
  }
  .topic-right-sidebar{
    padding: 12px 0;
  }
  .topic-slice-title :first-child{
    font-size: 15px;
  }
  .faq-wrapper-sidebar{
    padding: 20px;
  }
  /* .topic .faq-content-section:last-child{
    margin-bottom: 50px !important;
  } */
}
@media (min-width:768px) and (max-width: 1199px){
  /* .topic .faq-content-section:last-child{
    margin-bottom: 75px !important;
  } */
  .faq-wrapper{
    padding: 0 20px 24px 20px;
  }
  .faq-wrapper-sidebar{
    padding: 15px;
    border-radius: 10px;
  }
  .topic-slice-title :first-child{
    font-size: 13px;
  }
  .topic-right-sidebar{
    padding: 10px 0;
  }
}
/* @media (min-width:1200px) and (max-width: 1600px){
  .topic .faq-content-section:last-child{
    margin-bottom: 95px !important;
  }
} */
@media (min-width:992px) and (max-width: 1199px){
 .faq-wrapper{
    padding: 0 30px 32px 30px;
  }
  .topic .topic-heading :first-child{
    font-size: 34px;
  }
  .topic .gallery-item .topic-title :first-child{
    font-size: 20px;
  }
  .topic .gallery-item .topic-desc{
    font-size: 15px;
    line-height: 24px;
    padding-left: 20px;
  }
  .topic .gallery-item .topic-desc :first-child{
    font-size: 15px;
    line-height: 24px;
  } 
  .topic-slice-title :first-child{
    font-size: 15px;
  }
   .topic-right-sidebar{
    padding: 15px 0;
  }
}
@media (min-width:1200px) and (max-width: 1400px){
   .faq-wrapper-sidebar{
    padding: 15px;
    border-radius: 10px;
  }
  .topic-slice-title :first-child{
    font-size: 15px;
  }
  .topic-right-sidebar{
    padding: 15px 0;
  } 
}
@media (min-width:1200px) and (max-width: 1500px){
  .faq-wrapper{
        padding: 0 50px 65px 50px;
  }
}
</style>
