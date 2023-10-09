<template>
    <!-- <div class="bg-image-outer">
            <picture>
                <source :srcset="banner.hero_image.phone" media="(max-width: 750px)">
                <source :srcset="banner.hero_image.tablet" media="(max-width: 991px)">
                <img :src="banner.hero_image.url">
            </picture>
        </div> -->
    <div class="inner-content-wrapper form form-comman-input mb-5 pb-5 contact-us-section pt-3 pt-xl-5">
      <div class="main-part form-cms-build cms-main-wrap px-3">
        <div class="row">
            <div class="col-md-5 col-lg-4 mb-4 mb-md-0">
                <div class="contact-us-box">
                   <div class="contact-us-heading mb-3 mb-xl-5">
                      <h1>Contact Us</h1>
                   </div>
                   <div class="mb-3 mb-xl-4">
                     <span class="contact-icon mr-2 mr-xl-3"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                      <a href="mailto:hello@casamia.co" class="contact-des">hello@casamia.co</a>
                   </div>
                   <div class="mb-3 mb-xl-4">
                     <span class="contact-icon mr-2 mr-xl-3"><i class="fa fa-clone" aria-hidden="true"></i></span>
						<router-link to="/page/faqs" class="contact-des">
							Frequently Asked Questions
						</router-link>
                   </div>
                </div>
            </div>
            <div class="col-md-7 col-lg-8">
              <div class="contact-us-heading ml-xl-5 px-md-3 mb-3 mb-xl-5">
                <h2>Fill the form below and we will be in touch soon.</h2>
              </div>
              <div class="ml-xl-5">
                <b-form @submit="onSubmit" id="New ContactUs">
                  <div class="row mx-md-0">
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="FIRST NAME"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="first_name"
                          v-model="form.firstName"
                          placeholder="Required Field"
                          type="text"
                          class="form-inputs"
                          required
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="LAST NAME"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="last_name"
                          v-model="form.lastName"
                          type="text"
                          class="form-inputs"
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>

                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="PHONE"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                      <VuePhoneNumberInput class="phoneInput" @update="getPhoneNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="phoneNumber" />
                        
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="EMAIL"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="email"
                          v-model="form.email"
                          type="email"
                          class="form-inputs"
                          placeholder="Required Field"
                          required
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      
                      <b-input-group
                        prepend="WHATSAPP"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                      <VuePhoneNumberInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="whatsappNumber" />
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="COMPANY"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="company"
                          v-model="form.company"
                          type="text"
                          class="form-inputs"
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="ADDRESS"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="address"
                          v-model="form.address"
                          type="text"
                          class="form-inputs"
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                        <b-input-group prepend="CITY" class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input
                          id="country"
                          v-model="form.city"
                          type="text"
                          class="form-inputs"
                        ></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-lg-6 col-md-12 col-sm-12 form-input-label">
                      <b-input-group
                        prepend="COUNTRY"
                        class="input-group mb-2 mr-sm-2 mb-sm-0"
                      >
                        <b-form-input
                          id="country"
                          v-model="form.country"
                          type="text"
                          class="form-inputs"
                        ></b-form-input>
                      </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-12 form-input-label text-area px-0 mx-0">
                        <b-input-group prepend="MESSAGE" class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <b-row class="multiSelectWrapper mx-0">
                              <b-form-textarea id="message" class="mx-3" v-model="form.message" rows="3" placeholder="Required Field" required></b-form-textarea>
                            </b-row>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="col-sm-12 update-check form-checkbox-label">
                          <b-form-checkbox
                                id="marketing_update"
                                v-model="form.status"
                                :checked="form.status"
                              name="marketing_update"
                              class="custom-checkbox d-flex single-checkbox"
                              >
                            I would like to receive marketing updates from Casa Mia Coliving.
                          </b-form-checkbox>
                      </b-form-group>
                    <div class="col-sm-12 text-center text-md-right mt-3 mt-xl-4">
                      <b-button
                        type="submit"
                        :disabled="form.isActive"
                        id="ContactUs"
                        class="pt-3 pb-3 pl-5 pr-5 submitBtn contactUs-btn large-button large-button-submit"
                        >SUBMIT</b-button
                      >
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  name: "get-in-touch",
  // components:{
  //   VuePhoneNumberInput
  // },
  props: ["banner", "slice"],
  data() {
    return {
      form: {
        status: true,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        whatsapp: "",
        company: "",
        message: "",
        address: "",
        city: "",
        country: "",
        isActive: false,
      },
      whatsappNumber : "",
      phoneNumber : "",
    };
  },
	created() {
		var formData = this.$store.state.preFillForm
		this.form.firstName = formData.firstName
		this.form.lastName = formData.lastName
		this.form.phone = formData.phone
		this.phoneNumber = formData.phone
		this.form.email = formData.email
		this.form.whatsapp = formData.whatsapp
		this.whatsappNumber = formData.whatsapp
		this.form.company = formData.company
		this.form.address = formData.address
		this.form.city = formData.city
		this.form.country = formData.country
	},
  methods: {
    getWhatsappNumber(data){
      if(data.formattedNumber != undefined){
        this.form.whatsapp = data.formattedNumber;
      }else{
        this.form.whatsapp = "";
      }
    },
    getPhoneNumber(data){
      if(data.formattedNumber != undefined){
        this.form.phone = data.formattedNumber;
      }else{
        this.form.phone = "";
      }
    },
    curFormatter(value) {
      return "$" + value + "/month";
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.email == null) {
        this.$bvToast.toast("Please fill required fields", {
          title: "Error",
          variant: "danger",
          autoHideDelay: 5000,
        });
      } else if (!this.form.status) {
        this.$bvToast.toast("Please agree for our marketing updates", {
          title: "Error",
          variant: "danger",
          autoHideDelay: 5000,
        });
      } else {
        this.form.isActive = true;
        var source = window.location.href;
        var sourceDetails = this.$cookies.get("link_source"); 
        
        const response = axios
          .post(
            process.env.MODE === 'prod' ? process.env.PROD_FORM_API_URL: process.env.Dev_FORM_API_URL,
            {
              emailAddress: this.form.email,
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              phone: this.form.phone,
              whatsApp: this.form.whatsapp,
              company: this.form.company,
              message:`Get in touch: ${this.form.message}`,
              address: this.form.address,
              city: this.form.city,
              country: this.form.country,
              recordType: "member",
              activityType: "Form",
              source: source,
              sourceDetails: sourceDetails,
              useSales: true
            },
            {
              headers: {
                Authorization:  process.env.MODE === 'prod' ? "Bearer " +process.env.PROD_COLIV_HQ_KEY : "Bearer " +process.env.DEV_COLIV_HQ_KEY,
              },
            }
          )
          .then((response) => {
            if (response.data.status == 1) {
              this.$bvToast.toast(
                "Thank you for reaching out. We will get back to you shortly.",
                {
                  title: "Success",
                  variant: "success",
                  autoHideDelay: 2000,
                }
              );
			  this.$store.commit('SET_FORM_FIELDS', this.form);
              setTimeout(() => this.$router.push({ path: "/" }), 2000);
            } else {
              this.$bvToast.toast(response.data.message, {
                title: "Error",
                variant: "danger",
                autoHideDelay: 5000,
              });
              this.form.isActive = false;
            }
          })
          .catch((error) => {
            this.$bvToast.toast(
              "Something went wrong. Please try again." + error,
              {
                title: "Error",
                variant: "danger",
                autoHideDelay: 5000,
              }
            );
            this.form.isActive = false;
          });
      }
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/form.css";
/* phone input */
.country-selector__input{
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
}
.input-tel__input {
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}
.country-selector__input , .input-tel__input{
  border: 0 !important;
  background: #F7F7F7 !important;
  /* border-radius: 10px!important; */
  height: 40px!important;
  font-weight: 400 !important;
  outline: 0 !important;
  box-shadow: none !important;
  padding: 0 15px !important;
}

.country-selector__label , .input-tel__label {
  display: none !important;
}

/* phone input css ends */

.contact-us-section .contact-us-box{
  background-color: #F7F7F7;
  border-radius: 10px;
  padding: 64px;
}
.contact-us-section  .contact-us-heading :first-child{
  font-size: 28px;
  letter-spacing: normal;
  line-height: 34px;
  font-weight: 700;
  color: #000;
}
.contact-us-section .contact-icon{
  background-color: #000000;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 32px;
}
.contact-us-section .contact-icon i{
  color: #fff;
}
.contact-us-section .contact-des{
  font-size: 18px;
  line-height: normal;
  font-weight: 400;
  line-height: 22px;
  color: #000;
  text-decoration: none !important;
}
.form-cms-build .form-group:nth-child(odd){
  padding-right: 15px;
}
.form-cms-build .form-group:nth-child(even){
  padding-left: 15px;
}
@media (max-width:1199px){
  .contact-us-section  .contact-us-heading :first-child{
    font-size: 18px;
    line-height: 25px;
  }
  .contact-us-section .contact-us-box{
    padding: 15px;
  }
  .contact-us-section .contact-des{
      font-size: 15px;
  }
  .contact-us-section .contact-icon{
    width: 28px;
     height: 28px;
     line-height: 25px;
  }
  .contact-us-section .contact-icon i{
    font-size: 14px;
  }
}
@media (min-width:768px) and (max-width:1199px){
   .contact-us-section  .contact-us-heading :first-child{
    font-size: 22px;
    line-height: 28px;
  }
}
@media (min-width:800px) and (max-width:1350px){
  .contact-us-section .contact-us-box{
    padding: 30px;
  }
} 
@media (min-width:1351px) and (max-width:1550px){
  .contact-us-section .contact-us-box{
    padding: 50px;
  }
} 
</style>
