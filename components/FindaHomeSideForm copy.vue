<template>
    <div class="find-home-outer my-5 my-md-0" :id="[ deviceSize < 768 ? 'side-form': 'side-form-desktop' ]">
                <div class="inner-content-wrapper side-form home-details">
                     <div class="row mx-md-0">
                          <div class="col-md-6 col-lg-8 col-xl-9">  </div>
                            <div class="col-md-6 col-lg-4 col-xl-3" style="pointer-events:auto;">
                                <div class="form-box">
                                    <div class="main-part form-cms-build">
                                        <!-- START: form top detail -->
                                        <div class="form-top-content mb-3">
                                            <div class="main-detail-top d-flex justify-content-between align-items-center">
                                                <div class="">
                                                    <div class="title">{{ this.$store.state.sideFormTop.name}}</div>
                                                    <div class="sub-title">{{ this.$store.state.sideFormTop.price}}</div>
                                                    <!-- <div class="sub-title">Starting from SGD 1,400/mo</div> -->
                                                </div>
                                                <div class="">
                                                    <img :src="this.$store.state.sideFormTop.image" class="detail-box-img">
                                                </div>
                                            </div>
                                            <div class="description">{{ this.$store.state.sideFormTop.description}}</div>
                                        </div>
                                        <b-form @submit="onSubmit">
                                            <div class="row">
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text
                                                                :style="{'background-color': sideFormBackgroundColor,
                                                                    'border-color': sideFormBackgroundColor}" >
                                                                First name
                                                            </b-input-group-text>
                                                        </template>
                                                        
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
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap"
                                                            >
                                                                Last name
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="last_name"
                                                            placeholder="Required Field"
                                                            v-model="form.lastName"
                                                            type="text"
                                                            class="form-inputs"
                                                            
                                                            required
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                            
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <!-- <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Phone
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="phone_number"
                                                            placeholder="Required Field"
                                                            v-model="form.phone"
                                                            type="text"
                                                            class="form-inputs"
                                                            required
                                                        ></b-form-input> -->
                                                        <b-input-group prepend="Phone" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                            <VuePhoneNumberInput class="phoneInput" @update="getPhoneNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="phoneNumber" />
                                                        </b-input-group>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <b-input-group prepend="WhatsApp" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                            <VuePhoneNumberInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="whatsappNumber" />
                                                        </b-input-group>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Email
                                                            </b-input-group-text>
                                                        </template>
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
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Start of stay
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="startofstay"
                                                            v-model="form.sos"
                                                            type="date"
                                                            class="form-inputs"
                                                            :min="curDate"
                                                            placeholder="yyyy-mm-dd"
                                                            required
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Length of stay
                                                            </b-input-group-text>
                                                        </template>
                                                        <div class="position-relative">
                                                            <b-form-select id="los" v-model="form.los" :options="losOptions" class="form-inputs find-select" required ></b-form-select>
                                                            <i class="fa fa-sort-desc find-form-dropdown-arrow" aria-hidden="true"></i>
                                                        </div>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Age group
                                                            </b-input-group-text>
                                                        </template>
                                                        <div class="position-relative">
                                                            <b-form-select id="age_group" v-model="form.ageGroup" :options="ageGroupOptions" class="form-inputs find-select" required ></b-form-select>
                                                            <i class="fa fa-sort-desc find-form-dropdown-arrow" aria-hidden="true"></i>
                                                        </div>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Job
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="job_function"
                                                            v-model="form.job"
                                                            placeholder="Required Field"
                                                            class="form-inputs"
                                                            type="text"
                                                            required
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Discount code
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="discount_code"
                                                            v-model="form.discount_code"
                                                            class="form-inputs"
                                                            type="text"
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Other requests
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-textarea id="other_request" v-model="form.other_request" rows="3"></b-form-textarea>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-sm-12 update-check mx-auto custom-checkbox-true custom-checkbox-form">
                                                    <b-form-checkbox
                                                        id="marketing_update"
                                                        class="d-flex"
                                                        v-model="form.roominperson"
                                                        :checked="form.roominperson"
                                                        name="marketing_update"
                                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                                        >
                                                        I would like to view the room in person.
                                                    </b-form-checkbox>
                                                </b-form-group>
                                                <b-form-group v-if="form.roominperson" class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <template v-slot:prepend>
                                                            <b-input-group-text class="text-wrap" >
                                                                Preferred date/time for a viewing
                                                            </b-input-group-text>
                                                        </template>
                                                        <b-form-input
                                                            id="startofstay"
                                                            v-model="form.prefDate"
                                                            type="date"
                                                            class="form-inputs"
                                                            :min="minDate"
                                                            :max="maxDate"
                                                            placeholder="yyyy-mm-dd"
                                                            required
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group v-if="form.roominperson" class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                                        <b-form-input
                                                            id="startofstay"
                                                            v-model="form.prefTime"
                                                            type="time"
                                                            class="form-inputs"
                                                            placeholder="Time"
                                                            required
                                                        ></b-form-input>
                                                    </b-input-group>
                                                </b-form-group>
                                                <b-form-group class="col-sm-12 update-check mx-auto custom-checkbox-true custom-checkbox-form">
                                                    <b-form-checkbox
                                                        id="marketing_update"
                                                        class="d-flex"
                                                        v-model="form.status"
                                                        :checked="form.status"
                                                        name="marketing_update"
                                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                                        >
                                                        I would like to receive marketing updates from Casa Mia Coliving.
                                                    </b-form-checkbox>
                                                </b-form-group>
                                                <div class="col-sm-12 text-center submit-btn">
                                                    <b-button type="submit" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}" :disabled="(form.isActive || disableButton)" class="pt-2 pb-2 homeRequest-btn" :id="$store.state.roomId != '' ? 'Home(specific)Request-'+$store.state.roomId : 'Home(specific)Request-'+slice.homeID" variant="default">Enquire Now</b-button>
                                                </div>
                                            </div>
                                        </b-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
        <b-modal id="schedule-modal" title="Modal with Popover" :hide-footer="true" :hide-header="true" :no-close-on-backdrop="true" :no-close-on-esc="true">
            <div class="row main-detail-top">
                <div class="col-lg-8">
                    <div class="title">Thanks for your interest in {{ this.slice.homeName }}.</div>
                </div>
                <div class="col-lg-4">
                    <img :src="this.$store.state.sideFormTop.image">
                </div>
            </div>
            <p v-if="(this.slice.isThreeDtour && this.slice.threeDtourLink != null)">Have you already taken the virtual tour? 
                <a :href="this.slice.threeDtourLink" target="_blank" class="btn pt-2 pb-2 btn-default" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">Check out the virtual tour</a>
            </p>
            <!-- <p v-if="linkSchedule != null && this.slice.anyRoomAvailable">Would you like to schedule a viewing for this home? 
                <a target="_blank" :href="linkSchedule" class="btn pt-2 pb-2 btn-default" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">Book a Viewing</a>
            </p> -->
            <b-button class="pull-right" @click="closeScheduleModal()">Close</b-button>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {  
name: 'finda-home-side-form',
props: ['slice'],
// components:{
//     VuePhoneNumberInput
// },
data() {
    return {
        sideFormBackgroundColor: '#ffb903', //this.slice.sideFormBackgroundColor,
        curDate: this.getNow(0),
        minDate: this.getNow(1),
        maxDate: this.getMaxDate(),
        deviceSize: window.innerWidth,
        linkSchedule: this.slice.linkSchedule,
        form: {
            city: '',
            area: null,
            firstName: '',
            lastName: '',
            phone:'',
            whatsapp: "",
            email: '',
            sos: null,
            los: null,
            job: '',
            ageGroup: null,
            status: true,
            discount_code: '',
            other_request: '',
            isActive: false,
            roominperson: false,
            prefDate: this.getNow(),
            prefTime: null
        },
        phoneNumber : "",
        whatsappNumber : "",
        ageGroupOptions: [
            { text: 'Select an option', value: null}, 
            { text: '18-22', value: '18-22'},
            { text: '23-27', value: '23-27'},
            { text: '28-32', value: '28-32'},
            { text: '33-37', value: '33-37'},
            { text: '38+', value: '38+'}
        ],
        sosOptions: [
            { text: 'Please select', value: null}, 
            { text: 'Immediately', value: 'Immediately'},
            { text: 'Within a month', value: 'Within a month'},
            { text: 'In 2-3 months', value: 'In 2-3 months'},
            { text: 'More than 3 months from now', value: 'More than 3 months from now'}
        ],
        losOptions:[]
    }
},
computed: {
    disableButton() {
        return !this.form.status
    },
    getId() {
        if(this.$store.state.roomId != '' ) {
            this.$store.state.roomId
        }
        return this.slice.homeID
    },
},
created () {
    if (process.browser) {
        window.addEventListener('resize', this.handleResize)
    }
    if(this.slice.cityName == "Singapore") {
        this.losOptions =  [
            { text: 'Please select', value: null}, 
            { text: '3-6 months', value: '3-6 months'},
            { text: '6-12 months', value: '6-12 months'},
            { text: '12 months or more', value: '12 months or more'}
        ]
    } else {
        this.losOptions =  [
            { text: 'Please select', value: null}, 
            { text: 'Less than 1 month', value: 'Less than 1 month'},
            { text: '1-3 months', value: '1-3 months'},
            { text: '3-6 months', value: '3-6 months'},
            { text: '6-12 months', value: '6-12 months'},
            { text: '12 months or more', value: '12 months or more'}
        ]
    }
    var formData = this.$store.state.preFillForm
    this.form.firstName = formData.firstName
    this.form.lastName = formData.lastName
    this.form.phone = formData.phone
    this.form.email = formData.email
    this.form.los = formData.los
    this.form.ageGroup = formData.ageGroup
    this.form.job = formData.job
    this.form.discount_code = formData.discount_code
},
methods: {
    getWhatsappNumber(data){
        if(data.formattedNumber != undefined) {
            this.form.whatsapp = data.formattedNumber;
        } else {
            this.form.whatsapp = "";
        }
    },
    getPhoneNumber(data){
        if(data.formattedNumber != undefined) {
            this.form.phone = data.formattedNumber;
        } else {
            this.form.phone = "";
        }
    },
    handleResize() {
        this.deviceSize = window.innerWidth         
    },
    resetForm() {
        this.form = {
            ageGroup: null,
            email: '',
            firstName: '',
            job: '',
            lastName: '',
            phone:'',
            whatsapp:'',
            city: '',
            sos: null,
            status: true,
            los: null,
            area: null,
            discount_code: '',
            other_request: '',
            isActive: false
        }
    },
    closeScheduleModal() {
        this.$root.$emit('bv::hide::modal', 'schedule-modal')
        this.$router.push({ path: '/'})
    },
    openScheduleWindow() {
        this.linkSchedule = (this.linkSchedule != null) ? this.slice.linkSchedule + '?' + 'email='+ this.form.email + '&first_name=' + this.form.firstName + '&last_name=' + this.form.lastName + '&a1=' + this.form.phone : null;
        this.$root.$emit('bv::show::modal', 'schedule-modal')
    },
    onSubmit(evt) {
        evt.preventDefault();
        this.form.isActive = true;                
        var source = window.location.href;              
        var sourceDetails = this.$cookies.get("link_source"); //location.href
        var sos = new Date(this.form.sos);
        var date1 = new Date();
        date1.setDate(date1.getDate() + 19);
        var diffDays = parseInt((sos - date1) / (1000 * 60 * 60 * 24), 10);
        var finalSos= sos.getFullYear() + '-' + ('0' + (sos.getMonth()+1)).slice(-2) + '-' + ('0' + sos.getDate()).slice(-2)
        var activityDescription = 'Discount code: ' + this.form.discount_code + ' Other requests: ' + this.form.other_request
        if(this.form.roominperson) {
            activityDescription = activityDescription + ' Would like to have a viewing on ' + this.form.prefDate + ' ' + this.form.prefTime
        }
        axios.post(process.env.MODE === 'prod' ? process.env.PROD_HOME_FORM_API_URL: process.env.DEV_HOME_FORM_API_URL, {
            ageGroup: this.form.ageGroup,
            emailAddress: this.form.email,
            firstName: this.form.firstName,
            jobTitle: this.form.job,
            lastName: this.form.lastName,
            phone: this.form.phone,
            operatorId: this.slice.OperatorID,
            whatsApp: this.form.whatsapp,
            prefStartDate: new Date(finalSos).toISOString(),
            marketingUpdate: this.form.status,
            prefCommitLen: this.form.los,
            prefRoomType: this.form.roomType,
            source: source,
            sourceDetails: sourceDetails,
            prefCityName: this.slice.cityName,
            prefCityId: this.slice.cityID,
            prefNeighbourhoodIds: [this.slice.neighborhoodId],
            prefBuildingIds: [this.slice.buildingId],
            prefHomeIds: [this.slice.homeID],
            prefRoomIds: (this.$store.state.roomId != '' ) ? [this.$store.state.roomId] : '',
            uid: process.env.firebaseID,
            useSales: true,
            activityDescription: activityDescription
        },{
            headers: {
                Authorization: process.env.MODE === 'prod' ? 'Bearer '+process.env.PROD_COLIV_HQ_KEY : 'Bearer '+process.env.DEV_COLIV_HQ_KEY
            }
        }).then((response) => {
            if(response.data.status == 1) {
                this.$bvToast.toast('Thank you for reaching out. We will get back to you shortly.', {
                    title: 'Success',
                    variant: 'success',
                    autoHideDelay: 2000
                })
                this.form.sos = '';
                this.$store.commit('SET_FORM_FIELDS', this.form);
                if(this.$store.state.anyRoomAvailable == true && diffDays < 0) { 
                    this.openScheduleWindow()
                    this.$store.commit('SET_ROOM_AVAILABLE_STATUS', false);
                } else {
                    setTimeout( () => this.$router.push({ path: '/'}), 1000);   
                }
            } else {
                this.$bvToast.toast(response.data.message, {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
            }
            this.$store.commit('SET_ROOM_ID', '');
            this.form.isActive = false;
        }).catch((error) => {
            this.$bvToast.toast('Something went wrong. Please try again.'+error, {
                title: 'Error',
                variant: 'danger',
                autoHideDelay: 5000
            })
            this.form.isActive = false;
        })
    },
    getNow(days) {
        const today = new Date();
        today.setDate(today.getDate() + days);
        return today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);
    },
    getMaxDate() {
        const maxday = new Date();
        maxday.setDate(maxday.getDate() + 10);
        return maxday.getFullYear()+'-'+('0' + (maxday.getMonth()+1)).slice(-2)+'-'+('0' + maxday.getDate()).slice(-2);
    }
}
}
</script>
<style scoped>
@import "@/assets/css/form.css";
.country-selector__input , .input-tel__input{
background: #fff !important;
}
.home-details .form-cms-build {
padding: 24px;
background-color: #F7F7F7;
border-radius: 10px;
}
.home-details .form-cms-build .submit-btn button {
color: #000;
border-radius: 20px;
font-weight: 700;
line-height: 40px;
height: 40px;
font-size: 14px;
letter-spacing: normal;
padding: 0 !important;
max-width: none;
}
#neighbour .custom-control {
padding-left: 1rem;
}
/* .neighbourhood-check {
padding-right: 15px !important;
}
.find-home-cms #neighbour {
width: 100%;
height: 100%;
padding-top: 10px;
padding-bottom: 10px;
border: 1px solid #f55e61;
margin-left: 0!important;
background-color: #fff;
}
.find-home-outer {
background-repeat: no-repeat;
background-size: 100% 100%;
} */
/* START:: find home side form- DAB (16/09/2020) */
.find-home-outer .form-top-content .main-detail-top .title {
font-size: 18px;
color: #000;
font-weight: 700;
line-height: 27px;
letter-spacing: normal;
}
.find-home-outer .form-top-content .main-detail-top .sub-title {
font-size: 14px;
color: #72BF44;
font-weight: 700;
line-height: 27px;
letter-spacing: normal;
}
.find-home-outer .form-top-content .main-detail-top .detail-box-img{
width: 103px;
border-radius: 5px;
height: 77px;
object-fit: cover;
}
.find-home-outer .form-top-content .description {
color: #222;
font-size: 13px;
font-weight: 500;
line-height: 18px;
margin-top: 5px;
margin-bottom: 10px;
}
.find-home-outer .form-top-content {
border-bottom: 1px solid #D8D8D8;
}
.find-home-outer .input-group-text,
.find-home-outer .input-group-prepend,
.find-home-outer .input-group  {
display: block;
}
.find-home-outer .form-cms-build .input-group .input-group-text {
font-size: 14px;
font-weight: 400;
color: #000;
letter-spacing: normal;
line-height: 17px;
border: 0;
display: block;
width: 100%;
padding: 0;
height: auto;
margin-bottom: 8px;
background-color: transparent !important;
text-align: left;
}
.find-home-outer .form-cms-build .form-group{
padding: 0 15px;
margin-bottom: 15px;
}
.find-home-outer .form-cms-build .input-group .form-control,.find-home-outer .form-cms-build .input-group .custom-select{
border-radius: 10px;
height: 40px;
border: 0;
}
.find-home-outer .form-cms-build .input-group .custom-select{
appearance: none;
}
.find-home-outer .form-cms-build .input-group .form-control::placeholder,.find-home-outer .form-cms-build .input-group .form-control,.find-home-outer .form-cms-build .input-group .custom-select option,.find-home-outer .form-cms-build .input-group .custom-select{
font-size: 14px;
color: #8D8D8D;
font-weight: 400;
letter-spacing: normal;
line-height: 17px;
box-shadow: none;
}
.find-home-outer .form-cms-build .input-group .find-select{
background: #fff;
}
.find-home-outer .form-cms-build .input-group .find-form-dropdown-arrow{
position: absolute;
top: 45%;
transform: translateY(-50%);
color:#000;
font-size: 18px;
right: 15px;
}
.find-home-outer .form-cms-build .custom-control-label {
color: #222;
}
.find-home-outer .form-cms-build select.form-inputs {
font-weight: 600;
}
@media (min-width: 768px) {
.side-form{
    position: fixed;
    right: 15px;
    left: auto;
    top: 50%; 
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%); 
    -o-transform: translateY(-50%); 
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 398px;
    margin: 0;
}
/* --------------------- */
.home-detail .cust-findhome-wrap .side-form {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    max-width: 1400px;
    width: 100%;
    pointer-events: none;
}
}
@media (min-width:1560px){
.home-details .form-cms-build{
    width: 398px;
}
}
@media (max-width:1199px){
.home-details .form-cms-build{
   margin: auto;
    padding: 20px 15px;
    max-width: 398px;
}
.find-home-outer .form-top-content .main-detail-top .title{
    font-size: 16px;
}
.find-home-outer .form-top-content .main-detail-top .sub-title{
    font-size: 12px;
}
.find-home-outer .form-top-content .main-detail-top .detail-box-img{
    width: 100px;
    height: auto;
}
.find-home-outer .form-cms-build .input-group .input-group-text{
    font-size: 13px;
}
.find-home-outer .form-cms-build .input-group .form-control::placeholder, .find-home-outer .form-cms-build .input-group .form-control, .find-home-outer .form-cms-build .input-group .custom-select option, .find-home-outer .form-cms-build .input-group .custom-select{
    font-size: 13px;
}
.find-home-outer .form-cms-build .form-group{
    margin-bottom: 10px;
}
.form-box{
    margin: 0px 15px;
}
}
@media (min-width:768px) and (max-width:991px){
.form-box{
    margin: 0;
}
.home-details .form-cms-build{
    margin-left: auto;
    margin-right: 0;
}
}
@media (min-width:768px) and (max-width:1199px){
.home-detail .cust-findhome-wrap .side-form{
    right: 30px;
}
.home-details .form-cms-build,.side-form{
    width: 100%;
}
}
@media (min-width:992px) and (max-width:1199px){
 .find-home-outer .form-top-content .main-detail-top .title{
    font-size: 18px;
}
.find-home-outer .form-top-content .main-detail-top .sub-title{
    font-size: 13px;
}
.find-home-outer .form-top-content .main-detail-top .detail-box-img{
    width: 120px;
    height: auto;
}
.find-home-outer .form-cms-build .form-group{
    margin-bottom: 15px;
}
.form-box{
    margin: 0;
}
}
#schedule-modal .modal-content {
background-color: #fff !important;
margin-top: 150px;
border-radius: 10px !important;
}
#schedule-modal .modal-body a{
text-decoration: none !important;
}
</style>
