<template>
    <div v-show="roomTypeOptions.length > 1" class="find-home-outer my-5 my-md-0"
        :id="[slice.isBottomShow == true ? 'side-form' : 'side-form-desktop']">
        <div class="inner-content-wrapper home-details">
            <div class="row mx-md-0">
                <div class="col-md-6 col-lg-8 col-xl-9"> </div>
                <!-- <div class="col-md-6 col-lg-4 col-xl-3" style="pointer-events:auto;"> -->
                <div :class="[slice.isBottomShow == true ? 'col-md-6 col-lg-4 col-xl-3' : 'col-md-12 col-lg-12 col-xl-12 side-form-wrapper']"
                    style="pointer-events:auto;">
                    <div class="form-box">
                        <div class="main-part form-cms-build">
                            <!-- START: form top detail -->
                            <div class="form-top-content mb-3" v-show="this.$store.state.sideFormTop.image != ''">
                                <div class="main-detail-top d-flex justify-content-between align-items-center">
                                    <div class="">
                                        <div class="title">{{ this.$store.state.sideFormTop.name }}</div>
                                        <div class="sub-title">
                                        <span v-if="promoPrice">
                                            <span v-if="this.$store.state.sideFormTop.bedsArray != null && this.$store.state.sideFormTop.bedsType != 'Whole room'">
                                                 Beds Starting at {{ this.$store.state.sideFormTop.priceCurrency}}
                                                    <!-- <span style="color:#F55E61" v-for="(item,index) in this.$store.state.sideFormTop.bedsArray" :key="index"> -->
                                                        <span>
                                                            {{bedStartingPrice}}
                                                        </span>
                                                    <!-- </span> -->
                                                    {{this.$store.state.sideFormTop.priceUnit.toLowerCase()}}
                                            </span>
                                            <span v-else v-html="promoPrice"></span>
                                        </span>
                                        <span v-else>
                                            <span v-if="this.$store.state.sideFormTop.bedsArray != null && this.$store.state.sideFormTop.bedsType != 'Whole room'">
                                                 Beds Starting at {{ this.$store.state.sideFormTop.priceCurrency}}
                                                    <!-- <span style="color:#F55E61" v-for="(item,index) in this.$store.state.sideFormTop.bedsArray" :key="index"> -->
                                                        <span>
                                                            {{bedStartingPrice}}
                                                        </span>
                                                    <!-- </span> -->
                                                    {{this.$store.state.sideFormTop.priceUnit.toLowerCase()}}
                                            </span>
                                            <span v-else>{{ price }}</span>
                                        </span>
                                       </div>
                                        <div class="sub-title" v-if="this.$store.state.sideFormTop.availableDate != ''">{{
                                            this.$store.state.sideFormTop.availableDate }}</div>
                                        <!-- <div class="sub-title">Starting from SGD 1,400/mo</div> -->
                                    </div>
                                    <div class="">
                                        <img :src="this.$store.state.sideFormTop.image" class="detail-box-img">
                                    </div>
                                </div>
                                <div class="description">{{ this.$store.state.sideFormTop.description }}</div>
                            </div>
                            <b-form @submit="onSelectRoom">
                                <div class="row">
                                    <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                        <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                            <template v-slot:prepend>
                                                <b-input-group-text class="text-wrap">
                                                    Room Type
                                                </b-input-group-text>
                                            </template>
                                            <div class="position-relative">
                                                <b-form-select id="roomtype" v-model="form.roomType"
                                                    :options="roomTypeOptions" v-on:change="getSelectedItem"
                                                    class="form-inputs find-select" required></b-form-select>
                                                <i class="fa fa-sort-desc find-form-dropdown-arrow" aria-hidden="true"></i>
                                            </div>
                                        </b-input-group>
                                    </b-form-group>
                                    <b-form-group class="col-lg-12 col-md-12 col-sm-12 mb-2" v-if="bedsTypeOptions.length > 0  && bedsDropdown == true">
                                        <b-input-group class="input-group mb-2 mr-sm-3 mb-sm-0">
                                            <template v-slot:prepend>
                                                <b-input-group-text class="text-wrap">
                                                    Bed Type
                                                </b-input-group-text>
                                            </template>
                                            <div class="position-relative">
                                                <b-form-select id="bedsType" v-model="form.bedsType"
                                                :options="bedsTypeOptions" v-on:change="getSelectedBed"
                                                class="form-inputs find-select" required></b-form-select>
                                              <i class="fa fa-sort-desc find-form-dropdown-arrow" aria-hidden="true"></i>
                                            </div>   
                                        </b-input-group> 
                                    </b-form-group>
                                    <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                        <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                            <template v-slot:prepend>
                                                <b-input-group-text class="text-wrap">
                                                    Start of stay
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input id="startofstay" v-model="form.sos" type="date"
                                                class="form-inputs"
                                                :min="this.$store.state.sideFormTop.curDate != undefined ? this.$store.state.sideFormTop.curDate : curDate"
                                                placeholder="yyyy-mm-dd" required></b-form-input>
                                        </b-input-group>
                                    </b-form-group>
                                    <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                        <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                            <template v-slot:prepend>
                                                <b-input-group-text class="text-wrap">
                                                    Lease Length
                                                </b-input-group-text>
                                                <p class="lease-length">{{ form.los }} Months <span v-if="form.los == 12">
                                                        (or more)</span><span class="end-date" v-if="form.sos !== null">
                                                        (ends {{ getEndDate }})</span></p>
                                            </template>
                                            <div class="position-relative range-slider">
                                                <div id="tooltip" v-show="form.los == 12"><span>Best Deals</span></div>
                                                <b-form-input id="AdjustLeaseDuration" v-model="form.los" type="range" step="3" min="3"
                                                    max="12"></b-form-input>
                                                <!-- <b-form-input id="AdjustLeaseDuration" v-model="form.los" type="range" step="3" min="3"
                                                    max="12"></b-form-input> -->
                                            </div>
                                        </b-input-group>
                                    </b-form-group>
                                    <div class="col-sm-12 text-center submit-btn">
                                        <b-button type="submit"
                                            :style="{ 'background-color': '#72bf44', 'border-color': '2px solid #72bf44' }"
                                            class="pt-2 pb-2 homeRequest-btn" variant="default" id="SelectRoomForm">Select
                                            Room</b-button>
                                    </div>
                                </div>
                            </b-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2nd Step Form: START  -->

        <b-modal id="second-step-modal" size="xl" :hide-footer="true" :hide-header="true" :no-close-on-backdrop="true"
            :no-close-on-esc="true">
            <div class="row mx-md-0">
                <div class="col-lg-12">
                    <div class="header-modal-xl d-flex align-items-center justify-content-between">
                        <div>
                            <a href="/" id="HomepageButton" class="modal-header-logo" data-v-a9656efa="">
                                <img src="https://images.prismic.io/cmct-web/84e86b12-dfd7-46eb-ac61-f2cb4f43f553_Logo+for+website.png?auto=compress,format&amp;rect=0,0,3992,1774&amp;w=135&amp;h=60"
                                    alt="Casa Mia Coliving logo" copyright="Casa Mia Coliving, 2021" data-v-a9656efa=""></a>
                        </div>
                        <button type="button" @click="close2ndStep()" class="header-close-button">Close</button>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 mx-md-0 second-left-img">
                    <b-embed v-if="currentStep === 3 && slice.threeDtourLink != null" type="iframe" class="step-3-video"
                        aspect="16by9" :src="slice.threeDtourLink" allowfullscreen></b-embed>
                    <img v-else-if="this.$store.state.sideFormTop.mainImage != ''"
                        :src="this.$store.state.sideFormTop.mainImage" class="detail-box-img" />
                </div>
                <div class="col-lg-6 col-md-12 mx-md-0 second-right-form align-items-center d-flex">
                    <div class="step-2" v-show="currentStep === 2">
                        <form ref="form" @submit="onSubmit">
                            <div class="row mx-md-0">
                                <div class="col-md-12">
                                    <h1>TELL US ABOUT YOURSELF</h1>
                                    <p>Enter any address or a point of interest in so we can show you if there are rooms
                                        nearby.</p>
                                </div>
                            </div>
                            <div class="row mx-md-0">
                                <b-form-group label="First name" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-input id="first_name" v-model="form.firstName" placeholder="Required Field"
                                        type="text" class="form-inputs" required></b-form-input>
                                </b-form-group>
                                <b-form-group label="Last name" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-input id="last_name" placeholder="Required Field" v-model="form.lastName"
                                        type="text" class="form-inputs" required></b-form-input>
                                </b-form-group>
                                <b-form-group label="Phone" class="col-lg-6 col-md-12 col-sm-12">
                                    <!-- <VuePhoneNumberInput class="phoneInput" @update="getPhoneNumber" :no-flags="true" -->
                                        :no-example="true" :required="true" no-use-browser-locale v-model="phoneNumber" />
                                </b-form-group>
                                <b-form-group label="WhatsApp" class="col-lg-6 col-md-12 col-sm-12">
                                    <!-- <VuePhoneNumberInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" -->
                                        :no-example="true" no-use-browser-locale v-model="whatsappNumber" />
                                </b-form-group>
                                <b-form-group label="Email" class="col-lg-12 col-md-12 col-sm-12">
                                    <b-form-input id="email" v-model="form.email" type="email" class="form-inputs"
                                        placeholder="Required Field" required></b-form-input>
                                </b-form-group>
                                <b-form-group label="Job" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-input id="job_function" v-model="form.job" placeholder="Required Field"
                                        class="form-inputs" type="text" required></b-form-input>
                                </b-form-group>
                                <b-form-group label="Company/school" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-input id="company_school" v-model="form.company_school" class="form-inputs"
                                        type="text"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Age group" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-select id="age_group" v-model="form.ageGroup" :options="ageGroupOptions"
                                        class="form-inputs find-select" required></b-form-select>
                                    <i class="fa fa-sort-desc find-form-dropdown-arrow" aria-hidden="true"></i>
                                </b-form-group>
                                <b-form-group label="Discount code" class="col-lg-6 col-md-12 col-sm-12">
                                    <b-form-input id="discount_code" v-model="form.discount_code" class="form-inputs"
                                        type="text"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Other requests" class="col-lg-12 col-md-12 col-sm-12">
                                    <b-form-textarea id="other_request" v-model="form.other_request"
                                        rows="2"></b-form-textarea>
                                </b-form-group>
                                <b-form-group
                                    class="col-sm-12 update-check mx-auto custom-checkbox-true custom-checkbox-form">
                                    <b-form-checkbox id="marketing_update" class="d-flex" v-model="form.roominperson"
                                        :checked="form.roominperson" name="marketing_update"
                                        :style="{ 'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor }">
                                        I would like to view the room in person.
                                    </b-form-checkbox>
                                </b-form-group>
                                <b-form-group v-if="form.roominperson" class="col-lg-6 col-md-12 col-sm-12 mx-auto">
                                    <b-form-group label="Preferred date for a viewing">
                                        <b-form-input id="startofstay" v-model="form.prefDate" type="date"
                                            class="form-inputs" :min="minDate" :max="maxDate" placeholder="yyyy-mm-dd"
                                            required></b-form-input>
                                    </b-form-group>
                                </b-form-group>
                                <b-form-group v-if="form.roominperson" class="col-lg-6 col-md-12 col-sm-12 mx-auto">
                                    <b-form-group label="Preferred time for a viewing">
                                        <b-form-input id="startofstay" v-model="form.prefTime" type="time"
                                            class="form-inputs" placeholder="Time" required></b-form-input>
                                    </b-form-group>
                                </b-form-group>
                                <b-form-group v-if="form.roominperson" class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                    <b-form-group
                                        label="The viewing is not confirmed yet. One of our Sales representatives will contact you about your request.">
                                    </b-form-group>
                                </b-form-group>
                                <b-form-group
                                    class="col-sm-12 update-check mx-auto custom-checkbox-true custom-checkbox-form">
                                    <b-form-checkbox id="marketing_update" class="d-flex" v-model="form.status"
                                        :checked="form.status" name="marketing_update"
                                        :style="{ 'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor }">
                                        I would like to receive marketing updates from Casa Mia Coliving.
                                    </b-form-checkbox>
                                </b-form-group>
                                <div class="col-sm-12 mb-5 text-center submit-btn">
                                    <b-button type="button" class="btn cancel-btn" @click="close2ndStep()">Cancel</b-button>
                                    <b-button type="submit"
                                        :style="{ 'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor }"
                                        :disabled="(form.isActive || disableButton)" class="pt-2 pb-2 homeRequest-btn"
                                        :id="$store.state.roomId != '' ? 'Home(specific)Request-' + $store.state.roomId : 'Home(specific)Request-' + slice.homeID"
                                        variant="default">Submit<b-spinner v-if="(form.isActive || disableButton)"
                                            class="loading-spinner" small label="Small Spinner"></b-spinner></b-button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="step-3" v-show="currentStep === 3">
                        <div class="row mx-md-0 ">
                            <div class="col-md-12">
                                <h1>THANK YOU FOR YOUR INQUIRY</h1>
                                <p>Thank you for your room inquiry. Our sales team have received your request and will be in
                                    touch with you. Please allow for a few days in order for us to make sure the room is the
                                    right fit for you!</p>
                                <!-- <p v-if="(this.slice.isThreeDtour && this.slice.threeDtourLink != null)">Have you already taken the virtual tour? 
                                        <a :href="this.slice.threeDtourLink" target="_blank" class="btn pt-2 pb-2 btn-default" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">Check out the virtual tour</a>
                                    </p> -->
                            </div>
                        </div>
                        <div class="row mx-md-0">
                            <div class="col-sm-12 text-center submit-btn smstep-3-submit">
                                <b-button type="button" class="btn cancel-btn green-button-step3"
                                    @click="closeScheduleModal()">Back Home</b-button>
                                <!-- <b-button type="button" class="btn-secondary" @click="closeModal()">Cancel</b-button>  -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <!-- 2nd Step Form: END  -->
        <b-modal id="schedule-modal" title="Modal with Popover" :hide-footer="true" :hide-header="true"
            :no-close-on-backdrop="true" :no-close-on-esc="true">
            <div class="row main-detail-top">
                <div class="col-lg-8">
                    <div class="title">Thanks for your interest in {{ this.slice.homeName }}.</div>
                </div>
                <div class="col-lg-4">
                    <img :src="this.$store.state.sideFormTop.image">
                </div>
            </div>
            <p v-if="(this.slice.isThreeDtour && this.slice.threeDtourLink != null)">Have you already taken the virtual
                tour?
                <a :href="this.slice.threeDtourLink" target="_blank" class="btn pt-2 pb-2 btn-default"
                    :style="{ 'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor }">Check
                    out the virtual tour</a>
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
import moment from 'moment'
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
    name: 'finda-home-side-form',
    props: ['slice'],
    // components: {
    //     VuePhoneNumberInput
    // },
    data() {
        return {
            sideFormBackgroundColor: '#ffb903', //this.slice.sideFormBackgroundColor,
            curDate: this.getNow(0),
            minDate: this.getNow(2),
            maxDate: this.getMaxDate(),
            deviceSize: '700',// window.innerWidth,
            linkSchedule: this.slice.linkSchedule,
            currentStep: 3,
            bedsDropdown: false,
            form: {
                city: '',
                area: null,
                firstName: '',
                lastName: '',
                phone: '',
                whatsapp: "",
                email: '',
                sos: null,
                los: 12,
                roomType: null,
                bedsType: null,
                job: '',
                ageGroup: null,
                status: true,
                discount_code: '',
                other_request: '',
                isActive: false,
                roominperson: false,
                prefDate: this.getNow(0),
                prefTime: null,
                company_school: ''
            },
            phoneNumber: "",
            whatsappNumber: "",
            ageGroupOptions: [
                { text: 'Select an option', value: null },
                { text: '18-22', value: '18-22' },
                { text: '23-27', value: '23-27' },
                { text: '28-32', value: '28-32' },
                { text: '33-37', value: '33-37' },
                { text: '38+', value: '38+' }
            ],
            sosOptions: [
                { text: 'Please select', value: null },
                { text: 'Immediately', value: 'Immediately' },
                { text: 'Within a month', value: 'Within a month' },
                { text: 'In 2-3 months', value: 'In 2-3 months' },
                { text: 'More than 3 months from now', value: 'More than 3 months from now' }
            ],
            losOptions: [],
            roomTypeOptions: [],
            bedsTypeOptions: [],
        }
    },
    beforeMount() {
        let roomsName = [{ text: 'Select room type', value: null }]
        var _this = this
        this.slice.items.forEach(function (item, index) {
            if (item.availability != 'Fully booked') {
                roomsName.push({ text: item.roomName, value: item.roomName });
            } else if (item.endDate != null) {
                roomsName.push({ text: item.roomName, value: item.roomName });
            }
            if (index == 0) {
                //_this.showModal(item);
            }
        });
        //this.form.roomType = this.$store.state.sideFormTop.roomType
       this.roomTypeOptions = roomsName
    },
    mounted() {
        this.setValue()
    },
    watch: {
        '$store.state.sideFormTop.roomType': function () {
            this.form.roomType = this.$store.state.sideFormTop.roomType !== undefined ? this.$store.state.sideFormTop.roomType : null
        },
        '$store.state.sideFormTop.bedsType': function () {
            this.form.bedsType = this.$store.state.sideFormTop.bedsType !== undefined ? this.$store.state.sideFormTop.bedsType : null
        },
        'form.los': function () {
            this.setValue()
        }

    },
    computed: {
        disableButton() {
            return !this.form.status
        },
        getId() {
            if (this.$store.state.roomId != '') {
                this.$store.state.roomId
            }
            return this.slice.homeID
        },
        bedStartingPrice(){
            if(this.form.los == 12) {
                return Number(this.$store.state.sideFormTop.bedStartingPrice).toLocaleString()
            } else if(this.form.los == 6 || this.form.los == 9) { 
                return Number((parseInt(this.$store.state.sideFormTop.bedStartingPrice*process.env.PARAM_6_9_MONTH/50)*50)).toLocaleString()
            }
             else if(this.form.los == 3) { 
                return Number((parseInt(this.$store.state.sideFormTop.bedStartingPrice*process.env.PARAM_3_MONTH/50)*50)).toLocaleString()
            }
        },
        price() {
            if(this.form.los == 12) {
                return this.$store.state.sideFormTop.priceCurrency+' ' + Number(this.$store.state.sideFormTop.price).toLocaleString() +' '+ this.$store.state.sideFormTop.priceUnit
            } else if(this.form.los == 6 || this.form.los == 9) { 
                return this.$store.state.sideFormTop.priceCurrency+' ' + Number((parseInt(this.$store.state.sideFormTop.price*process.env.PARAM_6_9_MONTH/50)*50)).toLocaleString() +' '+ this.$store.state.sideFormTop.priceUnit 
            }
             else if(this.form.los == 3) { 
                return this.$store.state.sideFormTop.priceCurrency+' ' +  Number((parseInt(this.$store.state.sideFormTop.price*process.env.PARAM_3_MONTH/50)*50)).toLocaleString() +' '+ this.$store.state.sideFormTop.priceUnit 
            }
        },
        regularPrice() {
            if (this.$store.state.sideFormTop.price == "") {
                return ''
            } else if (this.form.los == 12) {
                return  Number(this.$store.state.sideFormTop.price).toLocaleString() 
            } else if (this.form.los == 9 || this.form.los == 6) {
                return  Number((parseInt(this.$store.state.sideFormTop.price * process.env.PARAM_6_9_MONTH / 50) * 50)).toLocaleString() 
            } else if (this.form.los == 3) {
                return  Number((parseInt(this.$store.state.sideFormTop.price * process.env.PARAM_3_MONTH / 50) * 50)).toLocaleString() 
            }
        },
        promoPrice() {
            if(this.$store.state.sideFormTop.promoPrice) {
                // this.slice.items.forEach((el) => console.log(el))
                const roomName = this.$store.state.sideFormTop.name
                const roomIndex = this.slice.items.findIndex((el) => el.roomName == roomName)
                const roomPriceScaleArray = this.slice.items[roomIndex].roomPriceScaleArray
                if(roomPriceScaleArray.length) {
                    const itemIndex = roomPriceScaleArray.findIndex((el) => el.StayMinMonths == this.form.los)
                    const MinMonthsIndex = roomPriceScaleArray.findIndex((el) => el.StayMinMonths == 6)
                  
                    if(itemIndex >= 0) {
                        return `<span>
                                ${this.$store.state.sideFormTop.priceCurrency} 
                                <del>${this.regularPrice}</del> 
                                <span style="color:#F55E61">
                                ${roomPriceScaleArray[itemIndex].priceAmount} 
                               </span>
                                ${this.$store.state.sideFormTop.priceUnit.toLowerCase()}
                            </span>`
                    } 
                    else {
                            return `<span>
                                ${this.$store.state.sideFormTop.priceCurrency} 
                                ${(this.form.los == 9 && MinMonthsIndex >= 0 ) ?  `<del>${this.regularPrice}</del> 
                                <span style="color:#F55E61">
                                ${Number((parseInt(roomPriceScaleArray[MinMonthsIndex].priceAmount )))} 
                               </span>` : (this.form.los == 6 || this.form.los == 9 ) ? 
                                    Number((parseInt(this.$store.state.sideFormTop.price * process.env.PARAM_6_9_MONTH / 50) * 50)):
                                    Number((parseInt(this.$store.state.sideFormTop.price * process.env.PARAM_3_MONTH / 50) * 50))} 
                                ${this.$store.state.sideFormTop.priceUnit}
                            </span>`
                    }
                    
                }
            }
            else {
                return null
            }
        },
        getEndDate() {
            if (this.form.sos !== null) {
                return moment(this.form.sos).add(this.form.los, 'M').subtract(1, "days").format('MMM D, YYYY');
            }
            return '';
        }
    },
    created() {
        if (process.browser) {
            window.addEventListener('resize', this.handleResize)
        }
        if (this.slice.cityName == "Singapore") {
            this.losOptions = [
                { text: 'Please select', value: null },
                { text: '3-6 months', value: '3-6 months' },
                { text: '6-12 months', value: '6-12 months' },
                { text: '12 months or more', value: '12 months or more' }
            ]
        } else {
            this.losOptions = [
                { text: 'Please select', value: null },
                { text: 'Less than 1 month', value: 'Less than 1 month' },
                { text: '1-3 months', value: '1-3 months' },
                { text: '3-6 months', value: '3-6 months' },
                { text: '6-12 months', value: '6-12 months' },
                { text: '12 months or more', value: '12 months or more' }
            ]
        }
        var formData = this.$store.state.preFillForm
        this.form.firstName = formData.firstName
        this.form.lastName = formData.lastName
        this.form.phone = formData.phone
        this.form.email = formData.email
        this.form.los = formData.los == null ? 12 : formData.los
        this.form.ageGroup = formData.ageGroup
        this.form.job = formData.job
        this.form.discount_code = formData.discount_code
    },
    methods: {
        resetSideformStore() {
            this.$store.commit('setSideFormTop', {
                name: "",
                image: "",
                mainImage: '',
                description: '',
                priceCurrency: "",
                price: "",
                priceUnit: "",
                roomType: null,
                bedsType :null,
                availableDate: "",
                curDate: this.curDate
            })
        },
        getSelectedItem: function (selectedRoom) { // Just a regular js function that takes 1 arg
            if (selectedRoom == null) {
                this.curDate = this.getNow(0),
                    this.resetSideformStore()
                    this.bedsDropdown = false
            } else {
                this.bedsDropdown = true
                let _this = this;
                this.slice.items.forEach(function (item, index) {
                    if (item.roomName === selectedRoom) {
                            _this.showModal(item);
                    }
                });
                this.roomType = selectedRoom;
            }

            let bedsType = [];
                this.slice.items.forEach(function (item, index) {
                    if(item.roomName === selectedRoom){
                        if(item.bedsArray.length) {
                        bedsType = [{ text: 'Select bed type', value: null }];
                        item.bedsArray.forEach(function (item, index){
                            if(item.bedName !== null){
                                if (item.availability != 'Fully booked') {
                                    bedsType.push({ text: item.bedName, value: item.bedName });
                                } else if (item.endDate != null) {
                                    bedsType.push({ text: item.bedName, value: item.bedName });
                                }
                            }
                        })
                        if(item.availability == 'Available'){
                            bedsType.push({ text: "Whole room", value: "Whole room" });
                        }
                    }
                    // else{
                    //     if(item.availability == 'Available'){
                    //     bedsType.push({ text: "Whole room", value: "Whole room" });
                    //     }
                    // }
                    }
                })
                this.bedsTypeOptions = bedsType;
        },
        getSelectedBed: function (bedsType) { // Just a regular js function that takes 1 arg
            let flag = this.roomType;
            let bedStartingPrice = null;
            if (bedsType == null) {
                this.curDate = this.getNow(0),
                    this.resetSideformStore()
            } else {
                let _this = this;
                this.slice.items.forEach(function (item, index) {
                    if (item.roomName === flag) {
                        for (let item of item.bedsArray){
                            if(item.bedName === bedsType){
                                bedStartingPrice = item.startingPrice;
                            }
                        };
                        _this.showModal(item,bedsType,bedStartingPrice,item.bedsArray);
                    }
                });
            }
        },
        close2ndStep() {
            this.$root.$emit('bv::hide::modal', 'second-step-modal')
            this.currentStep = 1
        },
        onSelectRoom(evt) {
            evt.preventDefault();
            this.currentStep = 2
            this.$root.$emit('bv::show::modal', 'second-step-modal')
        },
        getWhatsappNumber(data) {
            if (data.formattedNumber != undefined) {
                this.form.whatsapp = data.formattedNumber;
            } else {
                this.form.whatsapp = "";
            }
        },
        getPhoneNumber(data) {
            if (data.formattedNumber != undefined) {
                this.form.phone = data.formattedNumber;
            } else {
                this.form.phone = "";
            }
        },
        handleResize() {
            this.deviceSize = window.innerWidth
        },
        setValue() {
            const
                range = document.getElementById('AdjustLeaseDuration'),
                // range = document.getElementById('AdjustLeaseDuration'),
                tooltip = document.getElementById('tooltip');
            const
                newValue = Number((this.form.los - range.min) * 100 / (range.max - range.min)),
                newPosition = 16 - (newValue * 0.32);
            if (range.value == 12) {
                tooltip.innerHTML = `<span>Best Deals</span>`;
            }
            tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
        },
        resetForm() {
            this.form = {
                ageGroup: null,
                email: '',
                firstName: '',
                job: '',
                lastName: '',
                phone: '',
                whatsapp: '',
                city: '',
                sos: null,
                status: true,
                los: null,
                area: null,
                discount_code: '',
                other_request: '',
                isActive: false,
                company_school: ''
            }
        },
        closeScheduleModal() {
            this.$root.$emit('bv::hide::modal', 'second-step-modal')
            this.currentStep = 1
        },
        openScheduleWindow() {
            this.linkSchedule = (this.linkSchedule != null) ? this.slice.linkSchedule + '?' + 'email=' + this.form.email + '&first_name=' + this.form.firstName + '&last_name=' + this.form.lastName + '&a1=' + this.form.phone : null;
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
            var finalSos = sos.getFullYear() + '-' + ('0' + (sos.getMonth() + 1)).slice(-2) + '-' + ('0' + sos.getDate()).slice(-2)
            var activityDescription = 'Discount code: ' + this.form.discount_code + ' Other requests: ' + this.form.other_request + 'Price quoted:: ' + this.price
            if (this.form.roominperson) {
                activityDescription = activityDescription + ' Would like to have a viewing on ' + this.form.prefDate + ' ' + this.form.prefTime
            }
            axios.post(process.env.MODE === 'prod' ? process.env.PROD_HOME_FORM_API_URL : process.env.DEV_HOME_FORM_API_URL, {
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
                prefBedsType: this.form.bedsType,
                source: source,
                sourceDetails: sourceDetails,
                prefCityName: this.slice.cityName,
                prefCityId: this.slice.cityID,
                prefNeighbourhoodIds: [this.slice.neighborhoodId],
                prefBuildingIds: [this.slice.buildingId],
                prefHomeIds: [this.slice.homeID],
                prefRoomIds: (this.$store.state.roomId != '') ? [this.$store.state.roomId] : '',
                uid: process.env.firebaseID,
                useSales: true,
                activityDescription: activityDescription,
                company: this.form.company_school
            }, {
                headers: {
                    Authorization: process.env.MODE === 'prod' ? 'Bearer ' + process.env.PROD_COLIV_HQ_KEY : 'Bearer ' + process.env.DEV_COLIV_HQ_KEY
                }
            }).then((response) => {
                if (response.data.status == 1) {
                    this.$bvToast.toast('Thank you for reaching out. We will get back to you shortly.', {
                        title: 'Success',
                        variant: 'success',
                        autoHideDelay: 2000
                    })
                    this.form.sos = '';
                    this.$store.commit('SET_FORM_FIELDS', this.form);
                    this.currentStep = 3;
                    if (this.$store.state.anyRoomAvailable == true && diffDays < 0) {
                        //this.openScheduleWindow()
                        this.$store.commit('SET_ROOM_AVAILABLE_STATUS', false);
                    } /* else {
                        setTimeout( () => this.$router.push({ path: '/'}), 1000);   
                    } */
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
                this.$bvToast.toast('Something went wrong. Please try again.' + error, {
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
            return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        },
        getMaxDate() {
            const maxday = new Date();
            maxday.setDate(maxday.getDate() + 10);
            return maxday.getFullYear() + '-' + ('0' + (maxday.getMonth() + 1)).slice(-2) + '-' + ('0' + maxday.getDate()).slice(-2);
        },
        showModal(item,bedsType,bedStartingPrice,bedsArray) {
            this.form.los = 12
            let image = ''
            let mainImage = ''
            let images = {}
            if (this.slice.room_image && this.slice.room_image.toLowerCase() === 'slider') {
                if (item.roomPicturesArray.length > 0) {
                    images = item.roomPicturesArray.slice(0, 1);
                    image = images[0].link
                }
            } else if (this.slice.room_image && this.slice.room_image.toLowerCase() != 'slider') {
                if (item.roomPicturesArray.length > 0) {
                    image = this.slice.items[0].roomPicturesArray[0].link
                }
            }
            if (item.roomPicturesArray.length > 0) {
                item.roomPicturesArray.forEach(function (img) {
                    if (img.mainPicture) {
                        mainImage = img.linkDesk
                        image = img.link
                    }
                });
            }
            let availableDate = '';
            if (item.endDate != '' && item.endDate != null) {
                var todayDate = moment().format("YYYY-MM-DD");
                var pastDate = moment.unix(item.endDate._seconds, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
                if (moment(pastDate).isBefore(todayDate)) {
                    availableDate = 'Available from today';
                } else {
                    availableDate = 'Available from ' + moment.unix(item.endDate._seconds, "DD-MM-YYYY").add(1, 'days').format('MMMM Do YYYY');
                }
                this.curDate = pastDate
            }
            this.$store.commit('SET_ROOM_ID', item.roomId);
            this.$store.commit('setSideFormTop', {
                name: item.roomName,
                bedsType: bedsType,
                bedsArray:bedsArray,
                image: image,
                mainImage: mainImage,
                description: '',
                bedStartingPrice: bedStartingPrice,
                priceCurrency: item.priceCurrency,
                price: item.startingPrice,
                priceUnit: item.priceUnit,
                //price: 'Starting at '+ item.priceCurrency+' ' + Number(item.startingPrice).toLocaleString()+' '+ item.priceUnit,
                promoPrice: item.promoPrice,
                roomType: item.roomName,
                availableDate: availableDate,
                curDate: this.curDate
            })
        },
    }
}
</script>
<style scoped>
@import "@/assets/css/form.css";

.country-selector__input,
.input-tel__input {
    background: #fff !important;
}

.loading-spinner {
    margin-left: 10px;
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
    margin-top: 20px
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

.find-home-outer .form-top-content .main-detail-top .detail-box-img {
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
.find-home-outer .input-group {
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

.find-home-outer .form-cms-build .form-group {
    padding: 0 15px;
    margin-bottom: 15px;
}

.find-home-outer .form-cms-build .input-group .form-control,
.find-home-outer .form-cms-build .input-group .custom-select {
    border-radius: 10px;
    height: 40px;
    border: 0;
}

.find-home-outer .form-cms-build .input-group .custom-select {
    appearance: none;
}

.find-home-outer .form-cms-build .input-group .form-control::placeholder,
.find-home-outer .form-cms-build .input-group .form-control,
.find-home-outer .form-cms-build .input-group .custom-select option,
.find-home-outer .form-cms-build .input-group .custom-select {
    font-size: 14px;
    color: #8D8D8D;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 17px;
    box-shadow: none;
}

.find-home-outer .form-cms-build .input-group .find-select {
    background: #fff;
}

.find-home-outer .form-cms-build .input-group .find-form-dropdown-arrow {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    color: #000;
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
    .side-form {
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

@media (min-width:1560px) {
    .home-details .form-cms-build {
        width: 398px;
    }
}

@media (max-width:1199px) {
    .home-details .form-cms-build {
        margin: auto;
        padding: 20px 15px;
        max-width: 398px;
    }

    .find-home-outer .form-top-content .main-detail-top .title {
        font-size: 16px;
    }

    .find-home-outer .form-top-content .main-detail-top .sub-title {
        font-size: 12px;
    }

    .find-home-outer .form-top-content .main-detail-top .detail-box-img {
        width: 100px;
        height: auto;
    }

    .find-home-outer .form-cms-build .input-group .input-group-text {
        font-size: 13px;
    }

    .find-home-outer .form-cms-build .input-group .form-control::placeholder,
    .find-home-outer .form-cms-build .input-group .form-control,
    .find-home-outer .form-cms-build .input-group .custom-select option,
    .find-home-outer .form-cms-build .input-group .custom-select {
        font-size: 13px;
    }

    .find-home-outer .form-cms-build .form-group {
        margin-bottom: 10px;
    }

    .form-box {
        margin: 0px 15px;
    }
}

@media (min-width:768px) and (max-width:991px) {
    .form-box {
        margin: 0;
    }

    .home-details .form-cms-build {
        margin-left: auto;
        margin-right: 0;
    }
}

@media (min-width:768px) and (max-width:1199px) {
    .home-detail .cust-findhome-wrap .side-form {
        right: 30px;
    }

    .home-details .form-cms-build,
    .side-form {
        width: 100%;
    }
}

@media (min-width:992px) and (max-width:1199px) {
    .find-home-outer .form-top-content .main-detail-top .title {
        font-size: 18px;
    }

    .find-home-outer .form-top-content .main-detail-top .sub-title {
        font-size: 13px;
    }

    .find-home-outer .form-top-content .main-detail-top .detail-box-img {
        width: 120px;
        height: auto;
    }

    .find-home-outer .form-cms-build .form-group {
        margin-bottom: 15px;
    }

    .form-box {
        margin: 0;
    }
}

#second-step-modal .modal-content,
#schedule-modal .modal-content {
    background-color: #fff !important;
    margin-top: 0px;
    border-radius: 0px !important;
}

#schedule-modal .modal-body a {
    text-decoration: none !important;
}

/*----------second-step-moda---start--------- */
#second-step-modal {
    color: #000;
}

.site-header {
    z-index: 999 !important;
}

#second-step-modal h1 {
    color: #000;
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
}

#second-step-modal p {
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 22px;
}

#second-step-modal .form-control {
    border: 0px;
    background: #f8f8f8;
    height: 40px;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 16px;
    color: #000;
    font-weight: 500;
}

#second-step-modal .input-tel__input:not(.no-country-selector) {
    background: #f8f8f8 !important;
    height: 40px !important;
    padding: 10px 16px !important;
    border-radius: 10px !important;
    font-size: 16px !important;
    color: #000 !important;
    margin-left: 10px;
    width: calc(100% - 10px);
}

#second-step-modal .country-selector__input {
    background: #f8f8f8 !important;
    height: 40px !important;
    padding: 10px 16px !important;
    border-radius: 10px !important;
    font-size: 12px !important;
    color: #000 !important;
    font-weight: 600 !important;
}

#second-step-modal .country-selector__toggle__arrow {
    color: #747474;
    width: 22px;
}

.country-selector__toggle {
    top: calc(50% - 15px) !important;
    height: auto;
}

#second-step-modal .col-form-label {
    font-size: 15px;
    font-weight: 600;
    color: #000;
}

#second-step-modal .form-group {
    margin-bottom: 8px;
}

#second-step-modal .custom-select {
    border: 0px;
    background: #f8f8f8;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
    color: #000;
    font-weight: 500;
    position: relative;
}

#second-step-modal i {
    position: absolute;
    right: 34px;
    top: 4px;
    font-size: 23px;
}

#second-step-modal textarea.form-control {
    height: 75px;
}

#second-step-modal .custom-control-label {
    font-size: 16px;
    font-weight: 500;
}

#second-step-modal .custom-control {
    align-items: center
}

#second-step-modal .custom-checkbox-form .custom-checkbox input[type=checkbox] {
    background-color: #d9d8d8;
}

#second-step-modal .form-checkbox-label .custom-checkbox input[type=checkbox]:checked,
.custom-checkbox-true .custom-checkbox input[type=checkbox]:checked {
    background-color: #5a9836 !important;
}

#second-step-modal .input-group .input-group-text {
    font-size: 12px;
    line-height: 13px;
    color: #000;
    width: 140px;
    margin-right: 10px;
    border-radius: 10px;
    font-weight: 500;
}

#second-step-modal .btn.cancel-btn {
    background-color: #f8f8f8 !important;
    border: 1px solid #f8f8f8 !important;
    color: #000;
}

#second-step-modal .btn.homeRequest-btn {
    background-color: #e1e1e1 !important;
    border: 1px solid #e1e1e1 !important;
    color: #000;
}

#second-step-modal .btn {
    font-weight: 600;
    color: #fff;
    padding: 10px 40px;
    font-size: 17px;
    border-radius: 40px;
    min-height: 54px;
    margin-top: 15px;
    transition: 0.5s;
}

#second-step-modal .btn:hover {
    background: transparent !important;
    color: #000;
}

.custom-range::-webkit-slider-thumb {
    background: rgb(114, 191, 68);
}

.custom-range::-moz-range-thumb {
    background: rgb(114, 191, 68);
}

.custom-range::-ms-thumb {
    background: rgb(114, 191, 68);
}

.custom-range::-webkit-slider-thumb:active {
    background-color: rgb(114, 191, 68);
}

.custom-range::-webkit-slider-thumb,
.custom-range:focus::-webkit-slider-thumb,
.custom-range:focus::-moz-range-thumb,
.custom-range:focus::-ms-thumb {
    background-color: rgb(114, 191, 68);
    box-shadow: rgb(114, 191, 68);
}

.lease-length {
    color: #000;
    font-weight: bold;
}

#second-step-modal .modal-xl {
    max-width: 100% !important;
    margin: 0px;
}

#second-step-modal .modal-content {
    height: 100vh;
    overflow-y: auto !important;
}

#second-step-modal {
    padding-left: 0px !important;
}

.detail-box-img.lazyLoad {
    width: 100%;
    height: 100%;
}

#second-step-modal .modal-body {
    padding: 10px 20px 20px 0px
}

#second-step-modal .second-left-img {
    padding-left: 0px
}

#second-step-modal .second-left-img img {
    border-radius: 0px 15px 60px 0px;
    object-fit: cover;
}

.custom-control {
    padding-left: 0px !important;
}

.custom-checkbox-true .custom-checkbox input[type=checkbox]:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border: solid #000;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 3px;
    left: 7px;
}

.second-right-form form {
    padding: 0px 50px;
}

#second-step-modal .submit-btn {
    display: flex;
    align-items: center;
}

#second-step-modal .submit-btn button {
    width: 100%;
}

#second-step-modal .submit-btn button+button {
    margin-left: 20px;
}

#second-step-modal .header-modal-xl {
    padding: 0px 90px;
}

#second-step-modal .header-modal-xl .modal-header-logo img {
    width: 95px;
}

#second-step-modal .header-modal-xl .header-close-button {
    padding: 3px 56px;
    height: 34px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    border: 0px;
    border-radius: 50px;
    background: #72BF44;
    transition: all 0.5s;
}

#second-step-modal .header-modal-xl .header-close-button:hover {
    background: #000;
    color: #fff;
}

/*---------step-3---------- */
#second-step-modal .step-3 .submit-btn .green-button-step3 {
    background-color: #72bf44 !important;
    color: #000 !important;
    width: 220px;
    border-color: #72bf44 !important;
    transition: all 0.5s;
}

#second-step-modal .step-3 .submit-btn .green-button-step3:hover {
    background-color: transparent !important;
    color: #72bf44 !important;
}

#second-step-modal .step-3 {
    padding: 30px 150px 30px 100px;
}

#second-step-modal .step-3 .embed-responsive .embed-responsive-item,
.embed-responsive embed,
.embed-responsive iframe,
.embed-responsive object,
.embed-responsive video {
    height: 90vh !important;
}

#second-step-modal .embed-responsive {
    height: 90vh !important;
    border-radius: 0px 15px 50px 0px;
}

/*---------MEDIA-CSS---------- */
@media (min-height:500px) and (max-height:800px) {
    #second-step-modal h1 {
        font-size: 25px;
        line-height: 27px;
    }

    #second-step-modal p {
        font-size: 16px;
    }

    #second-step-modal .col-form-label {
        font-size: 14px;
    }

    #second-step-modal .form-control {
        height: 35px;
        padding: 5px 16px;
        font-size: 14px;
        border-radius: 5px;
    }

    #second-step-modal .country-selector__input {
        height: 35px !important;
        padding: 5px 16px !important;
        min-height: 35px !important;
        border-radius: 5px !important;
    }

    #second-step-modal .input-tel__input:not(.no-country-selector) {
        height: 35px !important;
        min-height: 35px !important;
        padding: 5px 16px !important;
        font-size: 14px !important;
        border-radius: 5px !important;
    }

    #second-step-modal .custom-select {
        height: 35px;
        padding: 5px 16px;
        font-size: 14px;
    }

    #second-step-modal i {
        right: 32px;
        top: 4px;
        font-size: 20px;
    }

    #second-step-modal textarea.form-control {
        height: 60px;
    }

    #second-step-modal .custom-control-label {
        font-size: 14px;
    }

    #second-step-modal .btn {
        padding: 5px 10px;
        font-size: 15px;
        min-height: 40px;
    }

    .country-selector__toggle {
        top: calc(50% - 15px) !important;
    }
}


@media(max-width:1550px) {
    .second-right-form form {
        padding: 20px 0px 20px 20px;
    }

    #second-step-modal .btn {
        padding: 10px 10px;
    }

    #second-step-modal .header-modal-xl {
        padding: 0px 20px;
    }
}

@media(max-width:1400px) {
    #second-step-modal .step-3 {
        padding: 0px 80px 0px 80px;
    }
}


@media (max-width: 1200px) {
    #second-step-modal .flex {
        display: unset;
    }

    #second-step-modal .vue-phone-number-input .select-country-container {
        flex: 0 0 100%;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
    }

    #second-step-modal .input-tel__input:not(.no-country-selector) {
        width: 100%;
        margin-left: 0px;
        margin-top: 10px;
    }

    #second-step-modal .step-3 {
        padding: 0px 50px 0px 50px;
    }
}

@media (max-width: 991px) {
    .second-right-form form {
        padding: 0px 0px;
    }

    #second-step-modal .modal-body {
        padding: 0px 0px 0px 0px;
    }

    #second-step-modal .header-modal-xl {
        padding: 5px 10px;
    }

    #second-step-modal .second-left-img {
        padding-right: 0px;
    }

    #second-step-modal .second-left-img img {
        border-radius: 0px 0px 50px 50px;
    }

    #second-step-modal .second-right-form {
        padding: 50px 80px;
    }

    #second-step-modal .step-3 {
        padding: 50px 50px;
    }

    #second-step-modal .step-3 .embed-responsive .embed-responsive-item,
    .embed-responsive embed,
    .embed-responsive iframe,
    .embed-responsive object,
    .embed-responsive video {
        height: 100% !important;
    }

    #second-step-modal .embed-responsive {
        height: 100% !important;
    }
}

@media (max-width: 768px) {
    #second-step-modal .row {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }

    #second-step-modal .second-right-form {
        padding: 50px 30px;
    }

    #second-step-modal .second-left-img {
        padding-right: 0px;
    }

    #second-step-modal .modal-body {
        padding: 0px 0px 0px 0px;
    }

    #second-step-modal .second-left-img img {
        border-radius: 40px 40px 40px 40px;
    }

    #second-step-modal .flex {
        display: flex;
    }

    #second-step-modal .vue-phone-number-input .select-country-container {
        flex: 0 0 120px;
        width: 120px;
        min-width: 120px;
        max-width: 120px;
    }

    #second-step-modal .input-tel__input:not(.no-country-selector) {
        margin-left: 10px;
        width: calc(100% - 10px);
        margin-top: 0px;
    }

    #second-step-modal .custom-control-label {
        line-height: 20px;
    }

    #adjust-lease-modal .header-modal-xl .header-close-button {
        padding: 3px 29px;
        height: 30px;
        font-size: 13px;
        line-height: 10px;
    }

    #second-step-modal .step-3 {
        padding: 50px 30px;
    }
}


@media (max-width: 500px) {
    #second-step-modal .second-right-form {
        padding: 30px 10px;
    }

    #second-step-modal h1,
    #second-step-modal p {
        text-align: center;
    }

    #second-step-modal .step-3 .smstep-3-submit {
        justify-content: center;
    }

    #second-step-modal .step-3 {
        padding: 50px 0px;
        text-align: center;
    }
}


@media (max-width: 400px) {

    #second-step-modal .flex {
        display: unset;
    }

    #second-step-modal .vue-phone-number-input .select-country-container {
        flex: 0 0 100%;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
    }

    #second-step-modal .input-tel__input:not(.no-country-selector) {
        margin-left: 0px;
        width: calc(100% - 0px);
        margin-top: 10px;
    }

    #second-step-modal .btn {
        padding: 1px 17px;
        font-size: 15px;
        min-height: 43px;
    }

    #second-step-modal .submit-btn button+button {
        margin-left: 10px;
    }

    .second-right-form {
        padding: 0px;
    }

    .second-right-form h1,
    .second-right-form p {
        text-align: center
    }

    #second-step-modal h1 {
        font-size: 28px;
    }
}

/*----------second-step-moda---end--------- */

/*----------Range Slider ---START--------- */
.range-slider {
    margin: 0 auto;
    position: relative;
}

#los {
    -webkit-appearance: none;
    width: 100%;
    background: #DADBDB;
    border-radius: 5px;
    height: auto;
    position: relative;
}

#los:focus {
    outline: none;
}

#los::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background: linear-gradient(90deg, #000 var(--range-progress), #DEE4EC var(--range-progress));
    border-radius: 1rem;
}

#los::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 3px solid #000;
    box-shadow: 0 1px 3px rgba(0, 0, 255, 0.3);
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    height: 20px;
    width: 20px;
    transform: translateY(calc(-34% + 3px));
}

#los:before {
    content: '';
    position: absolute;
    width: 100px;
    height: 5px;
    /* background:#000; */
    bottom: 0px;
    top: 0px;
    right: 0px;
}

#tooltip {
    position: absolute;
    bottom: 0px;
    z-index: 8888;
}

#tooltip span {
    position: absolute;
    text-align: center;
    display: block;
    line-height: 12px;
    padding: 8px 5px;
    color: #fff;
    border-radius: 5px;
    background: #000;
    font-size: 12px;
    left: 50%;
    transform: translate(-63%, 0);
    width: 85px;
    bottom: -31px;
}

#tooltip span:before {
    position: absolute;
    content: "";
    left: 50%;
    transform: translateX(153%) rotate(180deg);
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: #000;
    top: -8px;
}

@media(max-width:1199px) {
    #tooltip span {
        transform: translate(-68%, 0);
    }

    #tooltip span:before {
        transform: translateX(184%) rotate(180deg);
    }
}

@media(max-width:991px) {
    .home-details .form-cms-build .submit-btn button {
        margin-top: 20px;
    }
}

@media(max-width:575px) {
    .home-details .form-cms-build .submit-btn button {
        margin-top: 20px;
    }
}

/*----------Range Slider ---END--------- */
.side-form-wrapper {
    padding: 0px;
}

.end-date {
    color: #8D8D8D;
    font-size: 14px;
}

#side-form {
    display: none;
}

#side-form-desktop {
    display: block;
}

.custom-checkbox-true .custom-checkbox input[type=checkbox]:checked:after {
    border: solid #fff;
    border-width: 0px 1px 1px 0px !important;
}</style>
