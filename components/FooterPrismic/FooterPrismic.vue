<template>
  <div class="bg-white position-relative">
    <footer class="footer" :style="background">
      <div class="footer-inner">
        <nav>
          <div class="row">
            <div class="col-xl-4 col-lg-3 col-md-2 col-sm-12 footer-logo col-12 pr-md-0 pr-lg-3">
              <router-link to="/">
                <prismic-image :field="fields.logo"/>
              </router-link>
              <!-- <prismic-link :field="fields.logo_link">
                <prismic-image :field="fields.logo"/>
              </prismic-link> -->
              <prismic-rich-text :field="fields.address" class="details" :style="{'color': fields.text_color}"/>
              <!-- <div class="poweredby-logo text-left">
                <a href="https://colivhq.com/page/operators" target="blank">
                  <img src="~/public/Powered_ColivHQ.png" alt="" height="50">
                </a>
              </div> -->
            </div>
            <div class="col-xl-8 col-lg-9 col-md-10 col-12">
              <div class="row justify-content-between">
                <div class="col-lg-auto col-md-auto footer-content mb-3 mb-md-0 pr-md-0 pr-lg-3" v-for="(slice, index) in slices" :key="'slice-' + index">
                  <template v-if="slice.primary.link.link_type == 'Any' || slice.primary.link.link_type == 'Document'">
                    <!-- <a href="javascript:void(0)" class="link-title title-header" :style="{'color': fields.text_color}">
                      {{ $prismic.asText(slice.primary.label) }}
                    </a> -->
                    <button class="btn btn-link p-0 link-title title-header" id="btnlink" :style="{'color': fields.text_color}"> {{ $prismic.asText(slice.primary.label) }}</button>
                  </template>
                  <div v-for="(item, itemindex) in slice.items" :key="'footer-'+itemindex">
                    <prismic-link  :field="item.sub_nav_link" class="link-title" :style="{'color': fields.text_color}">
                        {{ $prismic.asText(item.sub_nav_link_label) }}
                    </prismic-link>
                  </div>
                </div>
                <div class="col-lg-auto col-md-auto footer-content">
                  <!-- <a href="javascript:void(0)" class="link-title title-header">
                     SOCIAL
                    </a> -->
                  <button class="btn btn-link p-0 link-title title-header" id="btnlink" :style="{'color': fields.text_color}"> SOCIAL </button>
                  <figure v-for="(item, index) in bottom.social_media_links" :key="'social_media_links-item-' + index" class="social-icon">  
                    <prismic-link :field="item.social_media_link" target="_blank" class="link-title">
                      <span class="footer-soical-icon d-inline-block text-center"> <img :src="item.social_media_icon.url" width="14" height="14"/></span>
                       <span class="ml-2">{{ item.social_media_icon.alt}}</span>
                    </prismic-link>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- <img  class="floating-icon" :src="fields.overlay.url"> -->
    </footer>
      <div :style="{'background-color': bottom.backGround_color ,'color': bottom.text_color}" class="bottom-bar">
        <div class="row footer-bottom px-0 text-left text-md-left m-0 mt-xl-5 pb-xl-4 pt-xl-4">
          <div class="col-md-6 footer-copyright">
            <span class="logo-right-text">{{ $prismic.asText(fields.copyright) }}</span>
          </div>
          <div class="col-md-6  text-left text-md-right">
            <ul class="d-md-flex justify-content-md-end footer-privacy-policy mb-0 pl-0">
              <li><router-link to="/page/privacy-policy">Privacy Policy</router-link></li>
            </ul>
          </div>
          <!-- <div class="col-sm-6 footer-social text-left text-md-right pr-0">
            <figure v-for="(item, index) in bottom.social_media_links" :key="'social_media_links-item-' + index" class="social-icon">  
              <prismic-link :field="item.social_media_link" target="_blank">
                <prismic-image :field="item.social_media_icon"/> 
              </prismic-link>
            </figure>
          </div> -->
        </div>
        <div class="row footer-bottom px-0 m-0">
          <div class="col-12 text-left text-md-center">
            <a href="https://colivhq.com/page/operators" target="blank">
              <img src="~/public/Powered_ColivHQ.png" alt="Powered_ColivHQ_img"  width="94" height="50">
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import {client} from '~/prismic/prismic';

//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'FooterPrismic',
  data () {
    return {
      slices: [],
      fields: {
        address: [],
        logo: {},
        logo_link: {},
        barColor: [],
        copyright: [],
        footerColor: '',
        text_color: '',
        overlay: {}
      },
      bottom: {
        backGround_color: '',
        text_color: '',
        social_media_links: []
      }
    };
  },
  computed:{
    background () {
      if (this.fields.footerColor) {
        return {
          'background-color': this.fields.footerColor
        }
      }
    }
  },
  methods: {
    async  getMenu () {
      //Query to get menu content
     /*  await this.$prismic.api.getSingle('menu')
        .then((footerContent) => { */
			
        //})
    },
  },
  mounted () {
    // this.getMenu()
         this.$prismic.client.getSingle('menu').then((result) => {
          // let menuContent = result
          let footerContent = result
          //console.log('footerContent: ', footerContent.data)
          this.slices  = footerContent.data.nav.filter(function(navs) {
            return navs.slice_type === 'footer';
          });
          this.fields.address = footerContent.data.company_address;
          this.fields.footerColor = '#F5F5F5', //footerContent.data.background_color
          this.fields.text_color = '#000000' //footerContent.data.footer_text_color
          this.fields.logo = footerContent.data.logo.Footer;
          this.fields.logo_link = footerContent.data.logo.Footer;
          this.fields.copyright = footerContent.data.copyright;
          this.bottom.backGround_color = '#F5F5F5', //footerContent.data.background_color
          this.bottom.text_color = '#000000' //footerContent.data.bottom_bar_text_color
          this.bottom.social_media_links = footerContent.data.social_media_links
          this.fields.overlay = footerContent.data.overlay
          }).catch((error) => {
          console.error(error);
          });
  }
}

</script>

<style scoped>

.footer {
  padding: 125px 15px 0px 15px;
  margin: 0 auto;
  text-align: center;
  max-width: none;
  position: relative;
  background-color: #fff !important;
  z-index: 1;
}
.footer .floating-icon { 
    position: absolute;
    top: 0;
    left: 35%;
}
footer .footer-detail .footer-logo {
  text-align: left;
  display: flex;
  align-items: center;
  color: #FFF;
}
.footer .footer-content {
  color: #FFF;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
  max-width: 25%;
}
.footer .footer-content .link-title.title-header { 
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 40px;
}
 .footer-copyright{
  font-size: 15px;
   color: #000;
}
 .footer-privacy-policy li{
    list-style: none;
 }
 .footer-privacy-policy li a{
  font-size: 15px;
  color: #000;
  text-decoration: none;
}
.footer .footer-content .link-title{
    letter-spacing: 0.5px;
    margin-bottom: 30px;
    display: block;
    text-align: left;
    line-height: 120%;
    text-decoration: none;
    cursor: pointer;
    font-size: 15px;
    color: #000;
}
.footer .footer-content .link-title:hover{
  color:#72BF44;
}
.footer .footer-content  .footer-soical-icon{
  width: 26px;
  height: 26px;
  background-color: #000;
  border-radius: 50%;
   line-height: 23px;
}
.footer .footer-content .footer-sublink {
  display: block;
  font-size: 13px;
  color: #FFF;
  text-align: left;
  line-height: normal;
  text-decoration: none;
}
.footer-detail ul {
  margin-bottom: 0;
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
  padding-left: 0;
}
/*footer-bottom*/
.footer-bottom {
  padding: 10px 20px;
  margin-left: 0;
  margin-right: 0;
  max-width: 100%;
  margin: auto;
  /* background-color: rgb(245, 94, 97); */
}
.footer-bottom .footer-social .social-icon {
  display: inline-block;
  vertical-align: middle;
  float: right;
  margin-left: 15px;
}
.footer-bottom .footer-social .social-icon a {
    display: flex;
    vertical-align: middle;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    background-color: rgb(245, 94, 97);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    transition:all 0.4s;
}
.footer-bottom .footer-social {
  text-align: right;
}
.footer-bottom .footer-social .social-icon img {
  height: 12px;
} 
.footer-bottom .footer-social .social-icon a:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2); 
  -o-transform: scale(1.2); 
  -ms-transform: scale(1.2);
  transform: scale(1.2);
}
.footer .footer-bottom .footer-copyright ::v-deep(:first-child) {
  color: #fff;
  text-align: left;
  margin-bottom: 0;
}
/* 7/5/2020 */
footer .footer-logo .logo-right-text {
    color: #FFF;
    letter-spacing: 0.5px;
    text-align: left;
    display: inline-block;
    vertical-align: text-top;
    margin-left: 10px;
    font-size: 13px;
}
footer .footer-logo {
  text-align: left;
  position: relative;
}
.footer .footer-content .link-title:hover {
  color: #000000;
}

.bottom-bar {
  position: relative;
  z-index: 1;
  background-color: #fff !important;
  max-width: 1640px;
  margin: auto;
}
/* responsive */

@media(max-width: 1199px) {
  .footer .footer-content {
    padding: 0 15px;
  }
}
@media (min-width:992px) and (max-width:1199px){
  .footer .footer-content .link-title{
    margin-bottom: 15px;
    font-size: 14px;
  }
  .footer .footer-content .link-title.title-header{
    margin-bottom: 20px;
  }
   .footer-copyright ,.footer-privacy-policy li a{
    font-size: 14px;
  }
}
@media(max-width: 767px) {
  /* .footer-bottom{
    padding: 10px 0 60px 0;
  } */
  footer .footer-logo .logo-right-text {
    margin-left: 0;
  }
  .footer .footer-content .footer-soical-icon{
    line-height: 29px;
  }
}
@media(max-width: 680px) {
  footer .footer-logo .logo-right-text {
    font-size: 11px;
  }
}
@media(min-width: 576px) {
  footer .poweredby-logo {
    position: absolute;
    bottom: 0;
  }
}
@media(max-width: 575px) {
  .footer .footer-detail .footer-logo {
    text-align: center;
    display: block;
    margin: 0 0 30px 0;
  }
  .footer-bottom .footer-social{
    text-align: center;
  }
  .footer-bottom .footer-social .social-icon {
    float: none;
    margin-right: 15px;
  }
  .footer-detail ul{
    display: block;
  }
  .footer .footer-content{
    float: left;
    margin-bottom: 0;
  }
  .footer .footer-content a:last-child {
    margin-bottom: 10px;
  }
  .footer .footer-bottom .footer-copyright ::v-deep(:first-child) {
    text-align: center;
  }
  footer .footer-logo {
    margin-bottom: 10px;
  }
}
@media(max-width: 420px) {
  .footer .footer-content {
    width: 100%;
    float: none;
  }
  .footer-detail {
    margin: 15px 0;
  } 
}
#app {
  margin: 0 auto;
  width: 100%;
}



@media (min-width:768px) and (max-width:991px){
  .footer .footer-content .link-title {
      margin-bottom: 15px;
      font-size: 12px;
  }
  .footer .footer-content .link-title.title-header {
      font-size: 14px;
      margin-bottom: 20px;
  }
  .footer-bottom {
      max-width: 100%;
  }
  .footer-copyright ,.footer-privacy-policy li a{
    font-size: 12px;
  }
  /* .footer .footer-content .footer-soical-icon{
    width: 24px;
    height: 24px;
    line-height: 20px;
  } */
  .footer .footer-content .footer-soical-icon img{
    height: 13px;
    line-height: 13px;
  }
}


@media (max-width:767px){
  .footer .footer-content .link-title {
      margin-bottom: 10px;
      font-size: 13px;
  }
  .footer .footer-content .link-title.title-header {
      font-size: 15px;
      margin-bottom: 20px;
  }
  .footer .floating-icon{
      left: 55%;
      width: 100px;
  }
  .footer {
      padding: 45px 15px 0px 15px;
  }
  .bottom-bar {
      text-align: center;
      font-size: 12px;
  }
  .footer-bottom .footer-social {
      text-align: center !important;
  }
  .footer-bottom .footer-social .social-icon:last-child{
    margin-left:0;
  }
  .footer .footer-content{
        max-width: 100%;
  }
}

@media (min-width:1200px) and (max-width:1600px){
  .footer-bottom{
      margin-top: 0 !important;
  }
}
</style>