<template>
    <section class="inner-content-wrapper pt-5 mt-5 team-slice-section">
        <div class="cms-main-wrap">
            <h1 class="d-none">Meet the People Behind Casa Mia Coliving </h1>
            <div v-for="(item,index) in slice.items" :key="index" class="text-image-slice mb-4 pb-3 mb-xl-5 pb-xl-5">
                <div class="row team-slice-row">
                    <div class="col-md-6 col-lg-4 offset-lg-1 text-left text-right pr-lg-0">
                        <div class="team-slice-img">
                            <img :src="item.image.url" alt="">
                        </div>
                    </div> 
                    <div class="col-md-6 col-lg-5 team-slice-margin">
                        <prismic-rich-text :field="item.name" class="cms-title content-h3-heading mb-1 mb-xl-2"/>
                        <prismic-rich-text :field="item.position" class="team-slice-sub-heading mb-3 mb-xl-4 pb-xl-3"/>
                        <!-- <prismic-rich-text :field="item.bio" class="team-slice-paragraph mb-3 mb-lg-4" :class="checkCollapse(item) == false ? 'team-slice-line-elipse':''"/> <span class="view-more view-more-content my-2 cursor readLineTag  d-inline-block" @click="showBioLess(item)"><span v-show="!item.collapsed">Read More</span><span v-show="item.collapsed">Read Less</span></span> -->
                        <div v-if="item.name != null ? !readMore[item.name[0].text.replace(/\s/g, '')] : ''">
                            <p class="team-slice-paragraph mb-3 mb-lg-3">{{defaultBioText(item)}} <span v-if="item.name != null ? !readMore[item.name[0].text.replace(/\s/g, '')] : ''" class="team-slice-paragraph cursor readLineTag" @click="showMore(item)">Read More</span></p>
                        </div>
                        <div v-if="item.name != null ? readMore[item.name[0].text.replace(/\s/g, '')] : ''">
                            <prismic-rich-text :field="item.bio" class="team-slice-paragraph mb-3 mb-lg-4"/> <span v-if="item.name != null ? readMore[item.name[0].text.replace(/\s/g, '')] : ''" class="view-more view-more-content my-2 cursor readLineTag mb-3 d-inline-block" @click="showLess(item)">Read Less</span>
                        </div>
                        <div class="team-slice-paragraph">
                            <span class="d-inline-block">
                                <prismic-link v-if="item.linkedin_link.url != null" :field="item.linkedin_link" class="team-slice-icon-social d-inline-block mr-1 mr-xl-3">
                                    <!-- <i class="fa fa-linkedin-square icon_ font-weight-bold team-slice-icon mr-3" aria-haspopup="true" aria-expanded="false"></i>         -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="team-slice-icon">
                                        <g id="Group_669" data-name="Group 669" transform="translate(0.984 0.952)">
                                            <path id="Path_25" data-name="Path 25" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0ZM11.758,23.659H8.848V12.992h2.909ZM10.3,11.762A1.711,1.711,0,1,1,12,10.052,1.7,1.7,0,0,1,10.3,11.762Zm13.091,11.9H20.485V18.224c0-3.266-3.879-3.019-3.879,0v5.434H13.7V12.992h2.909V14.7c1.354-2.508,6.788-2.693,6.788,2.4Z" transform="translate(-0.984 -0.952)"/>
                                        </g>
                                    </svg>
                                </prismic-link>
                            </span>
                            <span class="d-inline-block">
                                <prismic-link v-if="item.twitter_link.url != null" :field="item.twitter_link" class="team-slice-icon-social d-inline-block mr-1 mr-xl-3">
                                    <!-- <i class="fa fa-twitter-square icon_ font-weight-bold team-slice-icon mr-3" aria-haspopup="true" aria-expanded="false"></i> -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="team-slice-icon">
										<path id="Path_619" data-name="Path 619" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm7.329,12.24c.012.163.012.326.012.489a10.687,10.687,0,0,1-10.76,10.76v0a10.708,10.708,0,0,1-5.8-1.7,7.755,7.755,0,0,0,.9.054,7.584,7.584,0,0,0,4.7-1.622A3.785,3.785,0,0,1,8.848,17.6a3.764,3.764,0,0,0,1.708-.065,3.783,3.783,0,0,1-3.034-3.707v-.048a3.757,3.757,0,0,0,1.716.473A3.785,3.785,0,0,1,8.067,9.2a10.741,10.741,0,0,0,7.793,3.952A3.785,3.785,0,0,1,22.3,9.7a7.582,7.582,0,0,0,2.4-.918,3.8,3.8,0,0,1-1.663,2.092,7.551,7.551,0,0,0,2.172-.594A7.687,7.687,0,0,1,23.329,12.24Z"/>
									</svg>
                                </prismic-link>
                            </span>
                            <span class="d-inline-block">
                                <prismic-link v-if="item.instagram_link.url != null" :field="item.instagram_link" class="team-slice-icon-social d-inline-block mr-1 mr-xl-3">
                                    <!-- <i class="fa fa-instagram icon_ font-weight-bold team-slice-icon mr-3" aria-haspopup="true" aria-expanded="false"></i> -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" class="team-slice-icon">
                                            <g id="Group_67" data-name="Group 67" transform="translate(0.418 0.451)">
                                                <path id="Subtraction_1" data-name="Subtraction 1" d="M16,32A16,16,0,0,1,9.772,1.257,16,16,0,0,1,22.227,30.743,15.906,15.906,0,0,1,16,32ZM12.037,6.4A5.568,5.568,0,0,0,6.4,11.885v8.231A5.568,5.568,0,0,0,12.037,25.6h7.927A5.569,5.569,0,0,0,25.6,20.116V11.885A5.569,5.569,0,0,0,19.963,6.4Zm7.927,17.794H12.037a4.141,4.141,0,0,1-4.191-4.079V11.885a4.14,4.14,0,0,1,4.191-4.077h7.927a4.14,4.14,0,0,1,4.191,4.077v8.231A4.141,4.141,0,0,1,19.963,24.195ZM15.877,10.871a5.132,5.132,0,0,0-5.119,5.1,5.244,5.244,0,0,0,10.485.02,4.865,4.865,0,0,0-1.3-3.571,5.508,5.508,0,0,0-3.917-1.548Zm5.492-1.332a1.19,1.19,0,1,0,1.223,1.189A1.208,1.208,0,0,0,21.368,9.539ZM16,19.356a3.382,3.382,0,0,1-2.4-5.851,3.319,3.319,0,0,1,2.284-.916l.095,0a3.764,3.764,0,0,1,2.678,1,3.2,3.2,0,0,1,.823,2.36A3.455,3.455,0,0,1,16,19.356Z" transform="translate(0.082 0.049)" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
                                            </g>
                                        </svg>
                                </prismic-link>
                            </span>
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
  name: 'team-slice',
  data(){
      return{
          readMore: [],
      }
  },
  computed:{
      teamData(){
          var data = this.slice.items;
          for(var i=0; i<data.length; i++){
              data[i].collapsed = false;
          }
          return data;
      },
  },
  methods:{
      showMore(item) {
          if(item.hasOwnProperty('name')){
              if(item.name != null){
                var id = item.name[0].text.replace(/\s/g, "");
                this.$set(this.readMore, id, true);
              }else{
                return '';
              }
          }else{
              return '';
          }
      },
      showLess(item) {
          if(item.hasOwnProperty('name')){
            if(item.name != null){
                var id = item.name[0].text.replace(/\s/g, "");
                this.$set(this.readMore, id, false);
            }else{
                    return '';
            }
          }else{
             return '';
          }
      },
      CollapseContent(item){
          if(!item.collapsed && item.bio.length > 0){
              return true;
          }else{
              return false;
          }
      },
      checkCollapse(item){
          if(item.collapsed == true){
              return true;
          }else {
              return false;
          }
      },
      showBio(item){
          console.log(item.name[0].text.replace(/\s/g, ""));
          item.collapsed = true;
      },
      showBioLess(item){
            item.collapsed = !item.collapsed;
      },
      defaultBioText(item){
        if(item.bio.length > 0){
            var content = [];
            for(var i=0; i<item.bio.length; i++){
                content.push(item.bio[i].text);
            }
            return content.toString().substring(0,315)+"...";
        }else{
            return '';
        }
      }
  },
}
</script>
<style>
.team-slice-line-elipse{
    display: -webkit-box !important;
    -webkit-line-clamp: 5 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    margin-bottom: 0rem!important;
}
.team-slice-line-elipse p{
    margin-bottom: 0rem!important;
}
.readLineTag {
    color: #72767b !important;
    font-size: 18px !important;
    line-height: 27px !important;
    font-weight: 400 !important;
}
.cursor {
    cursor: pointer !important;
}
.team-slice-section .team-slice-img img{
    max-width: 464px;
    border-radius: 10px;
    width: 100%;
}
.team-slice-section{
    letter-spacing: normal;
}
.team-slice-section .team-slice-sub-heading{
    color: #8D8D8D;
    font-size: 18px;
    line-height: 36px;
    font-weight: 400;
}
.team-slice-section  .team-slice-paragraph{
    color: #000;
    font-size: 18px;
    line-height: 27px;
    font-weight: 400;
}
.team-slice-section  .team-slice-icon {
    width: 32px;
}
.team-slice-section  .team-slice-icon:hover,.team-slice-section  .team-slice-icon-social:hover {
   color: #72bf44 !important;
}
@media (max-width:1199px){
    .team-slice-section .team-slice-sub-heading{
        font-size: 14px;
        line-height: 20px;
    }
    .team-slice-section  .team-slice-paragraph{
        font-size: 14px;
        line-height: 22px;
    }
    .team-slice-section .team-slice-img img{
        max-width: 100%;
    }
    .team-slice-section  .team-slice-icon {
        width: 28px;
    }
}
@media  (max-width:575px){
    .team-slice-section  .team-slice-icon {
        font-size: 20px;
    }
}
@media (min-width:992px){
   .team-slice-section .team-slice-margin{
        margin-left: 4.5%;
        padding-left: 2.25%;
    }
    .team-slice-section .team-slice-row{
        margin-left: 2.25%;
    }
}
@media (min-width:768px) and (max-width:1199px){
    .team-slice-section .team-slice-sub-heading, .team-slice-section  .team-slice-paragraph{
        font-size: 15px;
        line-height: 24px;
    }
}
@media (min-width:768px) and (max-width:1199px){
    .team-slice-section .team-slice-sub-heading, .team-slice-section  .team-slice-paragraph{
        font-size: 16px;
        line-height: 26px;
    }
}
</style>