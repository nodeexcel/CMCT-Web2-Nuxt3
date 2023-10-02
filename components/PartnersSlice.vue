
<template>
    <section class="container-background-wrapper">
        <div class="container-background-sub-wrapper" :style="{ 'background-color': slice.primary.background_color }">
            <div class="inner-content-wrapper text-image-slice" >
                <div class="cms-main-wrap text-image-slice-padding text-img">
                    <div class="section-main-title content-h2-heading col-md-12 text-md-left mb-5 mb-xl-4 pb-xl-4">
                        <prismic-rich-text :field="slice.primary.title" class="cms-title"/>
                    </div>
                    <!-- For desktop version: START -->
                    <div class="desktop">
                      <section class="container-background-wrapper">
                        <div class="container-background-sub-wrapper similar-cardslice-section" :style="{ 'background-color': slice.primary.background }">
                          <div class="desktop">
                              <div class="row logo-img">
                                    <div v-if="flag == true">
                                      <b-modal id="modal-1" size="lg" centered hide-footer hide-header body-class="p-0" style="border-radius: 10px !important;">
                                        <div class="modal-container">
                                              <div class="col-lg-12 col-md-12 col-sm-12 col-12 justify-content-between align-items-end content-wrapper ">
                                                <div class="d-flex d-sm-flex flex-column flex-sm-row p-2">
                                                    <div class="col-sm-3 col-12 px-0 subcontent-wrapper" v-if="partnerContent">
                                                      <img class="d-none d-sm-block" v-if="partnerContent.logo !== null" :src="partnerContent.logo" alt="">
                                                      <div class="address d-none d-sm-block">{{ partnerContent.address }}</div>
                                                      <div class="address address-link d-none d-sm-block" >
                                                          <a :href="partnerContent.website" target="_blank" style="color: rgb(61, 118, 202);">{{partnerContent.website }} </a>
                                                          <!-- <prismic-link v-if="item.link.link_type == 'Web'" :field="item.link"><prismic-image :field="item.image" /></prismic-link> -->
                                                      </div> 
                                                      <div class="row d-flex d-block d-sm-none">
                                                        <div class="col-2"></div>
                                                        <div class="col-8 mb-3">
                                                            <img class="" v-if="partnerContent.logo !== null" :src="partnerContent.logo" alt="">
                                                            <div class="address ">{{ partnerContent.address }}</div>
                                                            <div class="address address-link" >
                                                                <a :href="partnerContent.website" target="_blank" style="color: rgb(61, 118, 202);">{{partnerContent.website }} </a>
                                                                <!-- <prismic-link v-if="item.link.link_type == 'Web'" :field="item.link"><prismic-image :field="item.image" /></prismic-link> -->
                                                            </div> 
                                                        </div>
                                                        <div class="col-2"></div>
                                                      </div>
                                                    </div>
                                                    <div class="col-sm-9 col-12 membership-plan" v-if="partnerContent">
                                                      <span class="membership-title mb-4" v-if="partnerContent.company !== null">{{partnerContent.company}}</span>
                                                      <div class="py-0 mt-3 mb-1 sub-heading" v-if="partnerContent.description !== null">{{ partnerContent.description }}</div>
                                                      <div class="mt-2 membership-subtitle py-0 mb-2 mt-4" v-if="partnerContent.discount !== null">Details about discount here</div>
                                                        <div class="sub-heading" v-if="partnerContent.discount !== null"><span class="">{{ partnerContent.discount }}</span></div>
                                                      <div class="membership-subtitle py-0 mt-3 mb-2" v-if="partnerContent.redemptionNotes !== null">Redemption notes</div>
                                                        <div class="sub-heading" v-if="partnerContent.redemptionNotes !== null">{{ partnerContent.redemptionNotes  }} </div>
                                                    </div>
                                                  <div class="col-lg-1 close_modal">
                                                    <i class="fa fa-times ml-3" aria-hidden="true" @click="closeModal()"></i>
                                                  </div>
                                                </div>
                                                
                                              </div> 
                                        </div>
                                      </b-modal>
                                    </div>
                                      <template v-for="(item, index) in Partnerslice">
                                                  <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 d-flex justify-content-center align-items-center image_wrraper" v-if="item.logo !== null" :key="index">
                                                      <prismic-image  :field="item.image" @click="openPartnerbox(item)" />
                                                  </div> 
                                      </template>
                                </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <!-- For desktop version: END -->
                </div>
            </div>
        </div>
    </section>
  </template>
  <script>
  import axios from "axios";
  export default {
  props: ['slice'],
  name: 'partners',
  data(){
    return{
      Partnerslice: null,
      partnerContent: null,
      flag:false
    }
  },
  methods: {
      async getPartner (){
        this.slicess  = await axios.post(
        process.env.MODE === "prod"
          ? process.env.PROD_PARTNER_API_URL
          : process.env.DEV_PARTNER_API_URL,
        {
          cityId: "6504b37d-f43e-4d0d-959c-719b94bd127f",
        },
        {
          headers: {
            Authorization:
              process.env.MODE === "prod"
                ? "Bearer " + process.env.PROD_COLIV_HQ_KEY
                : "Bearer " + process.env.DEV_COLIV_HQ_KEY,
          },
        }
      ).then(async (response) => {
                this.Partnerslice = response.data.data;
               for(let i=0;i <= this.Partnerslice.length; i++ ){
                if (this.Partnerslice[i].website !== null){
                  if(!this.Partnerslice[i].website.includes("https://")){
                    let a1 = 'https://'+this.Partnerslice[i].website;
                    this.Partnerslice[i].website = a1;
                  }
                }
                let logo = this.Partnerslice[i].logo + '?auto=compress,format&rect=0,0,2700,2700&w=300&h=300'
                this.Partnerslice[i].image = { "dimensions": { "width": 300, "height": 300 }, "alt": "class pass logo", "copyright": null, "url":logo  };
                this.Partnerslice[i].flag = true;
               }
            });
  },
      openPartnerbox(item){
        this.flag = true ;
        this.partnerContent = item
        this.$bvModal.show('modal-1');
  
      },
      closeModal() {
              this.$root.$emit('bv::hide::modal', 'modal-1')
          },
  },
  mounted(){
    this.getPartner();
    this.$root.$emit('bv::hide::modal', 'modal-1')
    this.flag = false
  },
  }
  </script>
  <style scoped>
  .membership-plan {
  padding-left: 5.5rem !important;
  }
  .membership-plan ul {
  list-style: none;
  }
  .sub-heading{
  font-size: .9rem;
  font-weight: 600;
  color: #5e5959;
  }
  .address{
  font-size: .8rem;
  font-weight: 600;
  color: #5e5959;
  }
  
  .membership-title{
    font-weight: 900;
    color: black;
    font-size: 28px;
  }
  .membership-subtitle{
    color: black;
    font-size: 16px;
    font-weight: 800;
  
  }
  .content-wrapper{
    background-color: white;
    padding: 55px;
  
  }
  .modal-container img {
      border-radius: 10px !important;
  }
  .close_modal{
      content: "\f00d";
      font-size: 24px;
      position: absolute;
      right: 0;
      top: 0.3em;
  }
   
  .logo-img {
      justify-content: center;
  }
  .logo-img img {
      border-radius: 10px;
  }
  .image_wrraper{
    padding: 1.5%;
  }
  .image_wrraper:hover{
    padding: 0;
  }
  .address-link a{
    word-wrap: break-word;
    word-break: break-word;
  }
  @media(max-width:992px){
    .content-wrapper{
      max-width: 100% !important;
    }
     .close_modal{
     content: "\f00d";
      font-size: 24px;
      position: absolute;
      right: 2rem;
      top: 0.26em;
      height: 1.5rem;
      width: 2rem;
     }
  }
  @media (min-width:576px) and (max-width:992px){
    .content-wrapper{
      padding: 1.6rem !important;
    }
    .membership-plan {
     padding-left: 2.5rem !important;
     padding-right: 0 !important;
    }
    
  }
  @media (max-width:576px){
     .content-wrapper{
     padding: 40px;
     }
     .close_modal{
      top: 0.1em !important;
      right: 1.8rem !important;
     }
     :deep(.modal-dialog-centered){
      margin-top: 5rem !important;
     }
     .membership-plan {
       padding-left: 0 !important;
       padding-right: 0 !important;
      }
      .sub-heading{
       font-size: .75rem !important;
       margin-top: .6rem !important
      }
      .address{
       font-size: .7rem !important;
      }
  
      .membership-title{
        font-size: 22px !important;
      }
      .membership-subtitle{
        font-size: 14px !important;
        margin-top: .8rem !important;
  
      }
      .content-wrapper{
        padding: .5rem 1rem !important;
  
      }
  }
  </style> 