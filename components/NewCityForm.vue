<template>
    <!-- <div class="bg-image-outer">
            <picture>
                <source :srcset="banner.hero_image.phone" media="(max-width: 750px)">
                <source :srcset="banner.hero_image.tablet" media="(max-width: 991px)">
                <img :src="banner.hero_image.url">
            </picture>
        </div> -->
    <div class="inner-content-wrapper form form-comman-input mb-5 pb-5">
      <div class="main-part form-cms-build cms-main-wrap px-3">
        <BForm @submit="onSubmit">
          <div class="row mx-md-0">
            <BFormGroup label="FIRST NAME" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="FIRST NAME"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="first_name"
                  v-model="form.firstName"
                  placeholder="Required Field"
                  type="text"
                  class="form-inputs"
                  required
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup label="LAST NAME" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="LAST NAME"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="last_name"
                  v-model="form.lastName"
                  type="text"
                  class="form-inputs"
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup >

            <BFormGroup  label="PHONE" class="phonenumber col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="PHONE"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
              <div>
                <CountryCodeselector  v-model="selectedCountryCode1" />
                <BFormInput
                        id="phone_number"
                        v-model="phoneNumber"
                        type="text"
                        class="form-inputs"
                        required
                    ></BFormInput>
              </div>
                <!-- <BFormInput
                  id="phone_number"
                  v-model="form.phone"
                  type="text"
                  class="form-inputs"
                ></BFormInput> -->
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup  label="EMAIL" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="EMAIL"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-inputs" 
                  placeholder="Required Field"
                  required
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup label="WHATSAPP" class="phonenumber col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <div>
                <CountryCodeselector  v-model="selectedCountryCode2" />
                <BFormInput
                        id="phone_number"
                        v-model="whatsappNumber"
                        type="text"
                        class="form-inputs"
                        required
                    ></BFormInput>
              </div>
              <!-- <b-input-group
                prepend="WHATSAPP"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
              <!-- <VuePhoneNumberInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="whatsappNumber" /> -->
                <!-- <BFormInput
                  id="whatsapp"
                  v-model="form.whatsapp"
                  type="text"
                  class="form-inputs"
                ></BFormInput> -->
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup label="COMPANY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="COMPANY"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="company"
                  v-model="form.company"
                  type="text"
                  class="form-inputs"
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup label="BUDGET" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="BUDGET"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <!-- <b-form-select id="budget" v-model="form.budget" :options="budgetOptions" class="form-inputs"></b-form-select> -->
                <b-form-spinbutton
                  class="form-inputs"
                  id="sb-days"
                  v-model="form.budget"
                  :formatter-fn="curFormatter"
                  min="1000"
                  max="5000"
                  step="100"
                ></b-form-spinbutton>
              <!-- </b-input-group> -->
            </BFormGroup >
            <BFormGroup  label="START OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="START OF STAY"
                class="input-group mb-2 mr-sm-2 mb-sm-0"> -->
                <div class="position-relative">
                    <b-form-select
                      id="los"
                      v-model="form.sos"
                      :options="sosOptions"
                      class="form-inputs"
                    ></b-form-select>
                    <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                  </div>
              <!-- </b-input-group> -->
            </BFormGroup > 
            <BFormGroup  label="LENGTH OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="LENGTH OF STAY"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <div class="position-relative">
                    <b-form-select
                      id="los"
                      v-model="form.los"
                      :options="losOptions"
                      class="form-inputs"
                    ></b-form-select>
                    <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                  </div>
              <!-- </b-input-group> -->
            </BFormGroup >
             <BFormGroup  class="col-sm-12 update-check form-checkbox-label mb-4">
                  <b-form-checkbox
                        id="marketing_update"
                        v-model="form.status"
                        :checked="form.status"
                       name="marketing_update"
                       class="custom-checkbox d-flex single-checkbox"
                      >
                    I would like to receive marketing updates from Casa Mia Coliving.
                  </b-form-checkbox>
              </BFormGroup >
            <div class="col-sm-12 text-center">
              <b-button
                type="submit"
                :disabled="form.isActive"
                :id="'CityRequest-'+slice.primary.message"
                class="pt-3 pb-3 pl-5 pr-5 submitBtn newCity-btn NewCityRequest-btn large-button large-button-submit"
                >SUBMIT</b-button
              >
            </div>
          </div>
        </BForm>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import { validateMobile } from '~/helpers/mobile';
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  name: "new-city-form",
  props: ["banner", "slice"],
  // components:{
  //   VuePhoneNumberInput
  // },
  data() {
    return {
      cities: [],
      selectedCountryCode1:'',
      selectedCountryCode2:'',
      form: {
        status: true,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        whatsapp: "",
        company: "",
        message: "",
        budget: null,
        sos: null,
        los: null,
        source: "",
        sourceDetails: "",
        isActive: false,
      },
      phoneNumber : "",
      whatsappNumber : "",
      sosOptions: [
        { text: "Please select", value: null },
        { text: "Immediately", value: "Immediately" },
        { text: "Within a month", value: "Within a month" },
        { text: "In 2-3 months", value: "In 2-3 months" },
        {
          text: "More than 3 months from now",
          value: "More than 3 months from now",
        },
      ],
      losOptions: [
        { text: "Please select", value: null },
        { text: "Less than 1 month", value: "Less than 1 month" },
        { text: "1-3 months", value: "1-3 months" },
        { text: "3-6 months", value: "3-6 months" },
        { text: "6-12 months", value: "6-12 months" },
        { text: "12 months or more", value: "12 months or more" },
      ],
    };
  },
  computed:{
    formattedPhoneNumber1() {
        const formattedPhoneNumber = validateMobile(this.phoneNumber , this.selectedCountryCode1);
        return formattedPhoneNumber
    },
    formattedPhoneNumber2() {
        const formattedwhatsappNumber = validateMobile(this.whatsappNumber , this.selectedCountryCode2);
        return formattedwhatsappNumber
    },    

},
watch: {
    'formattedPhoneNumber1' (value){
        if(value.number.international != undefined) {
            this.form.phone = value.number.international          
        }
        else {
          this.form.phone = ""
     
       }
    },
    
    'formattedPhoneNumber2' (value){
      if(value.number.international != undefined) {
            this.form.whatsapp = value.number.international          
        }
        else {
          this.form.whatsapp = ""
     
       }
    },
  },
  methods: {
    getPhoneNumber(data){
      if(data.formattedNumber != undefined){
        this.form.phone = data.formattedNumber;
      }else{
        this.form.phone = "";
      }
    },
    getWhatsappNumber(data){
      if(data.formattedNumber != undefined){
        this.form.whatsapp = data.formattedNumber;
      }else{
        this.form.whatsapp = "";
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
              message: `New city: ${this.slice.primary.message}\n Budget: ${this.form.budget}\n Length of stay: ${this.form.los}\n Start of stay: ${this.form.sos}`,
              recordType: "member",
              activityType: "Form",
              source: source,
              sourceDetails: sourceDetails,
              useSales: true
            },
            {
              headers: {
                Authorization: process.env.MODE === 'prod' ? "Bearer " + process.env.PROD_COLIV_HQ_KEY : "Bearer " + process.env.DEV_COLIV_HQ_KEY,
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
		this.form.budget = (formData.budget == "") ? null : formData.budget
		this.form.sos = formData.sos
		this.form.los = formData.los
	}
};
</script>
<style scoped>
@import "@/assets/css/form.css";
@import "../assets/css/common.css";
/* phone number */
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
    /* border-radius: 10px !important; */
    height: 40px !important;
    font-weight: 400 !important;
    outline: 0 !important;
    box-shadow: none !important;
    padding: 0 15px !important;
}

.country-selector__label , .input-tel__label {
  display: none !important;
}
/* phone number */
</style>
