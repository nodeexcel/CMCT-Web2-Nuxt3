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
            </BFormGroup>
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
            </BFormGroup>

            <BFormGroup label="PHONE" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="PHONE"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
              <VuePhoneNumberInput class="phoneInput" @update="getPhoneNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="phoneNumber" />
              <!-- </b-input-group> -->
            </BFormGroup>
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
            </BFormGroup>
            <BFormGroup label="WHATSAPP" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="WHATSAPP"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <VuePhoneNumberInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="whatsappNumber" />
              <!-- </b-input-group> -->
            </BFormGroup>
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
            </BFormGroup>
            <BFormGroup label="ADDRESS" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="ADDRESS"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="address"
                  v-model="form.address"
                  type="text"
                  class="form-inputs"
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup>
             <BFormGroup label="CITY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                <!-- <b-input-group prepend="CITY" class="input-group mb-2 mr-sm-2 mb-sm-0"> -->
                    <BFormInput
                  id="country"
                  v-model="form.city"
                  type="text"
                  class="form-inputs"
                ></BFormInput>
                <!-- </b-input-group> -->
            </BFormGroup>
            <BFormGroup  label="COUNTRY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="COUNTRY"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="country"
                  v-model="form.country"
                  type="text"
                  class="form-inputs"
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup>
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
            </BFormGroup>
            <BFormGroup label="START OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="START OF STAY"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
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
            </BFormGroup>
            <BFormGroup label="LENGTH OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
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
            </BFormGroup>
             <BFormGroup label="MESSAGE" class="col-12 form-input-label text-area px-0 mx-3 mb-4">
                <!-- <b-input-group prepend="MESSAGE" class="input-group mb-2 mr-sm-2 mb-sm-0"> -->
                    <b-row class="multiSelectWrapper mx-0">
                       <b-form-textarea id="message" class="mr-3" v-model="form.message" rows="3"></b-form-textarea>
                    </b-row>
                <!-- </b-input-group> -->
            </BFormGroup>
             <BFormGroup class="col-sm-12 update-check form-checkbox-label mb-4">
                  <b-form-checkbox
                        id="marketing_update"
                        v-model="form.status"
                        :checked="form.status"
                       name="marketing_update"
                       class="custom-checkbox d-flex single-checkbox"
                      >
                    I would like to receive marketing updates from Casa Mia Coliving.
                  </b-form-checkbox>
              </BFormGroup>
            <div class="col-sm-12 text-center">
              <b-button
                type="submit"
                :disabled="form.isActive"
                class="pt-3 pb-3 pl-5 pr-5 submitBtn CorporateHousingRequest-btn large-button large-button-submit"
                id="CorporateRequest"
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
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  name: "corporate",
  props: ["banner", "slice"],
  // components:{
  //   VuePhoneNumberInput
  // },
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
        budget: null,
        sos: null,
        los: null,
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
	created() {
		// var formData = this.$store.state.preFillForm
		// this.form.firstName = formData.firstName
		// this.form.lastName = formData.lastName
		// this.form.phone = formData.phone
		// this.form.email = formData.email
		// this.form.whatsapp = formData.whatsapp
		// this.form.company = formData.company
		// this.form.address = formData.address
		// this.form.city = formData.city
		// this.form.country = formData.country
		// this.form.sos = formData.sos
		// this.form.los = formData.los
		// this.form.budget = (formData.budget == "") ? null : formData.budget
    // this.whatsappNumber = formData.whatsapp
    // this.phoneNumber = formData.phone
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
      if(this.form.budget == null) {
                this.$bvToast.toast('Please provide valid budget', {
                title: 'Error',
                variant: 'danger',
                autoHideDelay: 5000
            })
        }  else if (!this.form.status) {
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
              message: `Corporate housing request: ${this.form.message}\n Budget: ${this.form.budget}\n Length of stay: ${this.form.los}\n Start of stay: ${this.form.sos}`,
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
