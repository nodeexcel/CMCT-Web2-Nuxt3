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

            <BFormGroup label="PHONE"  class="phonenumber col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="PHONE"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
              <div>
                <CountryCodeselector  v-model="selectedCountryCode1" />
                <BFormInput
                        id="phone_number"
                        v-model="form.phoneNumber"
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
            </BFormGroup>
            <BFormGroup label="EMAIL" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
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
            <BFormGroup label="PROPERTY ADDRESS"  class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="PROPERTY ADDRESS"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="Paddress"
                  v-model="form.Paddress"
                  type="text"
                  class="form-inputs"
                  required
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup>
             <BFormGroup label="CITY"  class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                <!-- <b-input-group prepend="CITY" class="input-group mb-2 mr-sm-2 mb-sm-0"> -->
                    <BFormInput
                  id="country"
                  v-model="form.city"
                  type="text"
                  class="form-inputs"
                  required
                ></BFormInput>
                <!-- </b-input-group> -->
            </BFormGroup>
            <BFormGroup label="POSTAL CODE" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="POSTAL CODE"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="postalcode"
                  v-model="form.postalcode"
                  type="text"
                  class="form-inputs"
                  required
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup>
            <BFormGroup label="NO. OF BEDROOMS" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
              <!-- <b-input-group
                prepend="NO. OF BEDROOMS"
                class="input-group mb-2 mr-sm-2 mb-sm-0"
              > -->
                <BFormInput
                  id="nob"
                  v-model="form.nob"
                  type="text"
                  class="form-inputs"
                  required
                ></BFormInput>
              <!-- </b-input-group> -->
            </BFormGroup>
            <BFormGroup label="MESSAGE" class="col-12 form-input-label text-area  mx-0">
                <!-- <b-input-group prepend="MESSAGE" class="input-group mb-2 mr-sm-2 mb-sm-0"> -->
                    <b-row class="multiSelectWrapper ">
                       <b-form-textarea id="message" class="mx-3" v-model="form.message" rows="3"></b-form-textarea>
                    </b-row>
                <!-- </b-input-group> -->
            </BFormGroup>
             <BFormGroup class="col-sm-12 update-check form-checkbox-label">
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
                :id="'LandlordRequest-'+form.city"
                class="pt-3 pb-3 pl-5 pr-5 submitBtn LandlordRequest-btn large-button large-button-submit"
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
  name: "get-in-touch",
  props: ["banner", "slice"],
  // components:{
  //   VuePhoneNumberInput
  // },
  data() {
    return {
      selectedCountryCode1:'',
      form: {
        status: true,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        postalcode: "",
        nob: "",
        message: "",
        Paddress: "",
        city: "",
        isActive: false,
      },
      phoneNumber : "",
    };
  },
  methods: {
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
      if (this.form.Paddress == "" || this.form.city == "" || this.form.postalcode == "" || this.form.nob == "") {
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
              message: `Landlord Request: ${this.form.message}\n PROPERTY ADDRESS: ${this.form.Paddress}\n CITY: ${this.form.city}\n POSTAL CODE: ${this.form.postalcode}\n NO. OF BEDROOMS: ${this.form.nob}`,
              recordType: "Landlord",
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
		// var formData = this.$store.state.preFillForm
		// this.form.firstName = formData.firstName
		// this.form.lastName = formData.lastName
		// this.form.phone = formData.phone
		// this.form.email = formData.email
		// this.form.whatsapp = formData.whatsapp
		// this.form.company = formData.company
		// this.form.Paddress = formData.address
		// this.form.postalcode = formData.postalcode
		// this.form.city = formData.city
		// this.form.nob = formData.nob
    // this.phoneNumber = formData.phone
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
