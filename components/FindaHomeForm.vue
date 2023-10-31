
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
                    <BFormGroup label="FIRST NAME" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4   ">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <BFormInput
                                id="first_name"
                                v-model="form.firstName"
                                placeholder="Required Field"
                                type="text"
                                class="form-inputs"
                            ></BFormInput>
                            <!-- <span class="mt-2" v-html="invalidtext"></span> -->
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.firstName">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please enter First Name</span>
                        </div>
                    </BFormGroup>
                    <BFormGroup  label="LAST NAME"  class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4  ">
                        <!-- <b-input-group class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <BFormInput
                                id="last_name"
                                v-model="form.lastName"
                                type="text"
                                class="form-inputs"
                            ></BFormInput>
                        <!-- </b-input-group> -->
                    </BFormGroup>
                
                    <BFormGroup label="PHONE"  class="phonenumber col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <div>
                         <CountryCodeselector  v-model="selectedCountryCode1" />
                         <BFormInput
                                id="phone_number"
                                v-model="form.phoneNumber"
                                placeholder="Phone number"
                                type="text"
                                class="form-inputs"
                            ></BFormInput>
                        </div>    
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <!-- <VuePhoneNumberInput class="phoneInput" /> -->
                            <!-- <BFormInput
                                id="phone_number"
                                v-model="form.phone"
                                type="text"
                                class="form-inputs"
                                required
                            ></BFormInput> -->
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.phoneNumber">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select phoneNumber with country-code</span>
                        </div>
                    </BFormGroup> 
                    <BFormGroup  label="WHATSAPP" class="phonenumber col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <div>
                            <CountryCodeselector  v-model="selectedCountryCode2" />
                            <BFormInput
                                    id="phone_number"
                                    v-model="form.whatsappNumber"
                                    placeholder="Phone number"
                                    type="text"
                                    class="form-inputs"
                                ></BFormInput>
                        </div>    
                        <!-- <b-input-group -->
                           
                            <!-- class="input-group mb-4 mr-sm-2 mb-sm-0"
                        > -->
                            <!-- <VueTelInput class="phoneInput" @update="getWhatsappNumber" :no-flags="true" :no-example="true" no-use-browser-locale v-model="form.whatsappNumber" /> -->
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.whatsappNumber">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select whatsappNumber with country-code</span>
                        </div>
                    </BFormGroup> 
                    <BFormGroup label="EMAIL" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <BFormInput
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="form-inputs"
                                placeholder="Required Field"
                            ></BFormInput>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.email">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please enter email</span>
                        </div>
                    </BFormGroup>
                    <BFormGroup  label="NATIONALITY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group class="input-group mb-4 mr-sm-2 mb-sm-0 search-ct-imput input-groups"> -->
                            <div class="position-relative">
                                <VueMultiselect v-model="form.nationality" :options="nationalityOptions" :multiple="false" placeholder="Select nationality" class="form-inputs w-100 VueMultiselect ct-dropdown-selector"></VueMultiselect>
                                <!-- <b-form-select id="nationality"  v-model="form.nationality" :options="nationalityOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i> -->
                            </div>
                        <!-- </b-input-group> -->
                        <!-- <div class="mt-2" v-if="showValidationError.nationality">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select nationality</span>
                        </div> -->
                    </BFormGroup>
                    <BFormGroup label="GENDER" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <div class="position-relative">
                                <b-form-select id="gender"  v-model="form.gender" :options="genderOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                            </div>
                        <!-- </b-input-group> -->
                        <!-- <div class="mt-2" v-if="showValidationError.gender">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select Gender</span>
                        </div> -->
                    </BFormGroup>
                    <BFormGroup label="JOB" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <BFormInput
                                id="job_function"
                                v-model="form.job"
                                class="form-inputs"
                                type="text"
                            ></BFormInput>
                        <!-- </b-input-group> -->
                    </BFormGroup>
                    <BFormGroup  label="AGE GROUP" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <div class="position-relative">
                                <b-form-select id="age_group"  v-model="form.ageGroup" :options="ageGroupOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                            </div>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.ageGroup">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select age group</span>
                        </div>
                    </BFormGroup>
                    
                    <BFormGroup label="BUDGET" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                         <div class="mainRangeSlide">
                            <div class=" ">
                             <div class="d-flex align-items-center justify-content-between mb-3">
                                <div class="min-value numberVal">
                                    <input type="text" class="" value="900" disabled/>
                                </div>
                                <div class="max-value numberVal">
                                    <input type="text" class="border text-center" value="5,000" disabled />
                                </div>
                             </div>
                             <div class="range-slider">
                                <div class="progress"></div>
                                <span class="range-min-wrapper">
                                    <input class="range-min" type="range" min="900" step="100" max="4600"  v-model="form.minPrice"/>
                                    <!-- <span class="range-min-value">0</span> -->
                                </span> 
                                <span class="range-max-wrapper">
                                    <input class="range-max" type="range" min="900" step="100" max="5000" v-model="form.maxPrice"/>
                                    <!-- <span class="range-max-value">100</span> -->
                                </span>
                             </div>
                            </div>
                         </div>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.maxPrice">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select your budget</span>
                        </div>
                    </BFormGroup>
                    <BFormGroup label="BATHROOM TYPE" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0 big-label"> -->
                             <div class="position-relative">
                                <b-form-select id="room_type" v-model="form.bathroomType" :options="bathroomTypeOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                             </div>
                        <!-- </b-input-group> -->
                        <!-- <div class="mt-2" v-if="showValidationError.bathroomType">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select bathroom type</span>
                        </div> -->
                    </BFormGroup>
                    <!-- <BFormGroup class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0">
                              <div class="position-relative">
                                    <b-form-select id="los" v-model="form.sos" :options="sosOptions" class="form-inputs" required></b-form-select>
                                    <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                                </div>
                        </b-input-group>
                    </BFormGroup> -->
                    <BFormGroup label="ROOM FOR" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                             <div class="position-relative">
                                <b-form-select  v-model="form.forCouples" :options="forCouplesOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                            </div>
                        <!-- </b-input-group> -->
                        <!-- <div class="mt-2" v-if="showValidationError.forCouples">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select forCouples</span>
                        </div> -->
                    </BFormGroup> 
                    <BFormGroup  label="START OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <div class="position-relative">
                                <BFormInput id="example-datepicker" type="date" placeholder="yyyy-mm-dd" v-model="form.sos" class=" form-inputs d-flex"></BFormInput>
                            </div>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.sos">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please enter start of stay</span>
                        </div>
                      </BFormGroup>
                    <BFormGroup  label="LENGTH OF STAY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <div class="position-relative">
                                <b-form-select  v-model="form.los" :options="losOptions" class="form-inputs" disabled-field="disabled"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                            </div>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.los">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select length of stay</span>
                        </div>
                    </BFormGroup>
                     <BFormGroup label="CITY" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                             <div class="position-relative">
                                <b-form-select  v-model="form.city" :options="cityOptions" class="form-inputs"></b-form-select>
                                <i class="fa fa-sort-desc form-dropdown-icon" aria-hidden="true"></i>
                            </div>
                        <!-- </b-input-group> -->
                        <div class="mt-2" v-if="showValidationError.city">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please select city</span>
                        </div>
                    </BFormGroup>   
                     
                    <BFormGroup label="AREA" class="col-12 pr-3 form-checkbox-label  mb-4 ">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0 d-block"> -->
                            <b-row class="multiSelectWrapper border-0 px-0">
                                <b-col class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="(item, index) in areaOptions" :key="index">
                                <b-form-checkbox v-model="form.area" class="custom-checkbox mr-2" :value="item.value">{{item.text}}</b-form-checkbox></b-col>
                                <!-- <b-form-checkbox-group id="checkbox-group-1" v-model="form.area" :options="areaOptions"></b-form-checkbox-group> -->
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
                        <div class="mt-4" v-if="showValidationError.status">
                            <svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                            <span class="error">Please agree for our marketing updates</span>
                        </div>
                    </BFormGroup>
                    <BFormGroup label="DISCOUNT CODE" class="col-lg-6 col-md-12 col-sm-12 form-input-label mb-4">
                        <!-- <b-input-group  class="input-group mb-4 mr-sm-2 mb-sm-0"> -->
                            <BFormInput
                                id="discount_code"
                                v-model="form.discount_code"
                                class="form-inputs"
                                type="text"
                            ></BFormInput>
                        <!-- </b-input-group> -->
                    </BFormGroup>
                    <div class="col-sm-12 text-center mb-4" v-if="errorMessage.length">
                        <svg style="height: 50px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg>
                        <div class="error">{{ errorMessage }}</div>
                    </div>
                    <div class="col-sm-12 text-center">
                        <b-button type="submit" :disabled="form.isActive" class="pt-3 pb-3 pl-5 pr-5 submitBtn FindAHomeRequest-btn large-button large-button-submit"
                        id="FindYourNewHomeNow">SUBMIT</b-button>
                    </div>
                </div>
            </BForm>
        </div>
        <section v-if="showPopOver == true" class="pop">
            <div class="d-flex justify-content-end pr-2 pt-1">
                <i class="fa fa-times ml-3 " aria-hidden="true" @click="closeIdealForPopover()"></i>
            </div>
            <div class="d-flex  mascot-row-submitMascot">
                <span class="col-4 col-lg-4 col-md-4 col-sm-4 p-0"><img class="mascot-image-submitMascot ml-1" src="~/public/Butler_Cartoon_Waving.gif" alt="popover_logo"/></span>
                <span class="pop-text col-8 col-lg-8 col-md-8 col-sm-8 pl-0 mascot-text">Thank You. We will get in touch with you soon !</span>
            </div>
        </section>
    </div>
</template>

<script>
import moment from "moment";
import axios from 'axios';
import { validateMobile } from '~/helpers/mobile';
import countryList from "./countryList.json";
export default {  
name: 'finda-home-form',
props: ['banner'],
// components:{
//     VuePhoneNumberInput
// },
data() {
    return {
        envVars:useRuntimeConfig(),
        cities: [],
        selectedCountryCode1:'',
        selectedCountryCode2:'',
        RedirectedProspectTo: null,
        showPopOver: false,
        invalidtext:'',
        form: {
            city: '',
            area: [],
            firstName: '',
            lastName: '',
            phone:'',
            whatsapp: "",
            email: '',
            minPrice: 900,
            maxPrice: null,
            sos: null,
            los: null,
            job: '',
            ageGroup: null,
            phoneNumber : "",
            whatsappNumber : "",
            gender: null,
            forCouples: null,
            nationality: '',
            status: true,
            bathroomType: null,
            discount_code: '',
            isActive: false,
            prefStayStartTimeframe:null
        },
        nationalityOptions: [],
        genderOptions: [
            { text: 'Select gender', value: null }, 
            { text: 'Any Gender', value: 'Any Gender' },
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
            ],
        ageGroupOptions: [
            { text: 'Select an option', value: null}, 
            { text: '18-22', value: '18-22'},
            { text: '23-27', value: '23-27'},
            { text: '28-32', value: '28-32'},
            { text: '33-37', value: '33-37'},
            { text: '38+', value: '38+'}
        ],
        cityOptions: [
            { text: 'Singapore', value: 'Singapore'},
            { text: 'Melbourne', value: 'Melbourne'}
        ],
        forCouplesOptions: [
            { text: "Select an option", value: null },
            { text: "For a couple", value: "true" },
            { text: "For single", value: "false" },
            ],
        areaOptions: [],
        nobOptions: [
            { text: 'Select an option', value: null}, 
            { text: '1', value: '1'},
            { text: '2-4', value: '2-4'},
            { text: '5+', value: '5+'}
        ],
        sosOptions: [
            { text: 'Please select', value: null}, 
            { text: 'Immediately', value: 'Immediately'},
            { text: 'Within a month', value: 'Within a month'},
            { text: 'In 2-3 months', value: 'In 2-3 months'},
            { text: 'More than 3 months from now', value: 'More than 3 months from now'}
        ],
        losOptions: [],
        bathroomTypeOptions: [
            { text: "Select bathroom type", value: null },
            { text: "Private", value: "Private" },
            { text: "Shared", value: "Shared" },
        ],
        showMultiOption: false,
        errorMessage: '',
        showValidationError: {
            firstName: false,
            email: false,
            ageGroup: false,
            phoneNumber : "",
            whatsappNumber : "",
            // gender: false,
            // forCouples: false,
            minPrice: false,
            maxPrice: false,
            // bathroomType: false,
            sos: false,
            los: false,
            city: false,
            status: false,
            // nationality: false
        },
        preFillForm: {
				firstName: '',
				lastName: '',
				phone: '',
				email: '',
				whatsApp: '',
				company: '',
				address: '',
				city: '',
				country: '',
				sos: null,
				ageGroup: null,
                gender: null,
                forCouples: null,
                nationality: null,
                bathroomType: null,
				phoneNumber : "",
                whatsappNumber : "",
				budget: '',
				los: null,
				postalcode: '',
				nob: '',
				job: '',
				ageGroup: null,
				roomType: null,
				discount_code: '',
			},
    }
},
mounted() { axios.post(this.envVars.public.env === 'prod' ? this.envVars.public.env.PROD_END_POINT : this.envVars.public.env.DEV_END_POINT, {}, { headers: { Authorization: "Bearer " + this.envVars.public.env.MODE === 'prod' ? this.envVars.public.env.PROD_COLIV_HQ_KEY : this.envVars.public.env.DEV_COLIV_HQ_KEY, }, } ) 
.then((response) => { 
    this.cityOptions = [],this.cities = []; 
    this.cities = response.data.data
    this.cities.forEach((cittarr) => { 
        this.cityOptions.push({ text: cittarr.city, value: cittarr.city }); 
        }); 
        this.form.city = "Singapore"
    }); 
    
    // if(typeof window !== "undefined" && (window.sessionStorage.getItem('maxPrice') !== "null" || window.sessionStorage.getItem('minPrice') !== "null")){
    //     this.form.minPrice = window.sessionStorage.getItem('minPrice');
    //     this.form.maxPrice = window.sessionStorage.getItem('maxPrice');
    // }
    // else {
        this.form.minPrice = 900;
        this.form.maxPrice = null;
    // }
    const range = document.querySelectorAll(".range-slider span input");
    var progress = document.querySelector(".range-slider .progress");
    let gap = 0.1;
    const inputValue = document.querySelectorAll(".numberVal input");

    range.forEach((input) => {
        input.addEventListener("input", (e) => {
        let minRange = parseInt(range[0].value);
        let maxRange = parseInt(range[1].value);

        if (maxRange - minRange < gap) {
            if (e.target.className === "range-min") {
            range[0].value = maxRange - gap;
            } else {
            range[1].value = minRange + gap;
            }
        } else {
            progress.style.left = ((minRange - 450) / range[0].max) * 100 + "%";
            progress.style.right =
            100 - ((maxRange - 450) / range[1].max) * 100 + "%";
            inputValue[0].value = Number(minRange).toLocaleString();
            inputValue[1].value = Number(maxRange).toLocaleString();
        }
        });
    });
},
computed:{
    formattedPhoneNumber1() {
        const formattedPhoneNumber = validateMobile(this.form.phoneNumber , this.selectedCountryCode1);
        return formattedPhoneNumber
    },
    formattedPhoneNumber2() {
        const formattedwhatsappNumber = validateMobile(this.form.whatsappNumber , this.selectedCountryCode2);
        return formattedwhatsappNumber
    },    

},
watch: {
    'formattedPhoneNumber1' (value){
        console.log("in 503",value,value.number.international,value.number.input);
        if(value.number.international != undefined) {
         console.log("value.number.international",value.number.international,value.number.input);

             this.phone = value.number.international
             this.showValidationError.whatsappNumber = false
             this.showValidationError.phoneNumber = false            
        }
        else {
            this.phone = "";
            if(this.phone == ""){
                this.showValidationError.phoneNumber = true;
            }
            if(this.whatsapp == ""){
                this.showValidationError.whatsappNumber = true
            }
     
       }
    },
    
    'formattedPhoneNumber2' (value){
        console.log("in 524",value,value.number.international,value.number.input);
        if(value.number.international != undefined ) {
         console.log("value.number.international",value.number.international,value.number.input);
         this.whatsapp = value.number.international
         this.showValidationError.phoneNumber = false 
         this.showValidationError.whatsappNumber = false            
        }
            else {
            this.whatsapp = "";
            if(this.whatsapp == ""){
                this.showValidationError.whatsappNumber = true
            }
            if(this.phone == ""){
                this.showValidationError.phoneNumber = true;
            }
      
       }
    },
  'form.maxPrice'(value){
    this.form.maxPrice  = value;
  },
  'form.minPrice'(value){
        if(this.form.maxPrice == null){
        this.form.maxPrice = 3000;
        }
  },
  'form.city'(value){
    if(value == "Singapore") { 
        this.losOptions = [
            { text: 'Please select', value: null}, 
            { text: '3-6 months', value: '3-6 months'},
            { text: '6-12 months', value: '6-12 months'},
            { text: '12 months or more', value: '12 months or more'}
        ];
    } else {
        this.losOptions = [
            { text: 'Please select', value: null}, 
            // { text: 'Less than 1 month', value: 'Less than 1 month'},
            { text: '1-3 months', value: '1-3 months'},
            { text: '3-6 months', value: '3-6 months'},
            { text: '6-12 months', value: '6-12 months'},
            { text: '12 months or more', value: '12 months or more'}
        ];
    }
    this.areaOptions = []
    this.form.area = []
    const result = this.cities.filter(data => data.city == value);
    result[0].hood.forEach((areaarr) => {          
        this.areaOptions.push({ text: areaarr.name, value: areaarr.name });
    });
    
  }
},
beforeMount() {
     this.getcountryCode();
},
created() {
    var formData = this.preFillForm
    this.form.firstName = formData.firstName
    this.form.lastName = formData.lastName
    this.form.phone = formData.phone
    this.form.email = formData.email
    this.form.phoneNumber = formData.phoneNumber,
    this.form.whatsappNumber = formData.whatsappNumber,
    //this.form.city = formData.city
    
    this.form.job = formData.job
    // this.form.ageGroup = formData.ageGroup
    // this.form.gender = formData.gender
    // this.form.forCouples = formData.forCouples
    // this.form.nationality = formData.nationality
    // this.form.bathroomType = formData.bathroomType
    this.form.discount_code = formData.discount_code

    this.form.sos = formData.sos
    this.form.los = formData.los
    this.form.minPrice = (formData.minPrice == "") ? null : formData.minPrice
    this.form.maxPrice = (formData.maxPrice == "") ? null : formData.maxPrice
    this.whatsappNumber = formData.whatsapp
    this.phoneNumber = formData.phone
    // added
    if(typeof window != "undefined"){
        if(window.sessionStorage.getItem('forCouples') !== "null"){
            if(window.sessionStorage.getItem('forCouples') == "Yes"){
                this.form.forCouples = "true";
            }else {
                this.form.forCouples = "false";
            }
        }
        else{
            this.form.forCouples = formData.forCouples
        }
        if(window.sessionStorage.getItem('gender') !== "null"){
            if(window.sessionStorage.getItem('gender') == "Male"){
                this.form.gender = "male";
            }
            else {
                this.form.gender = "female";
            }
        }
        else{
            this.form.gender = formData.gender;
        }
        this.form.ageGroup = window.sessionStorage.getItem('ageGroup') !== "null" ? window.sessionStorage.getItem('ageGroup') : formData.ageGroup;
        this.form.nationality = window.sessionStorage.getItem('nationality') !== "null" ?  window.sessionStorage.getItem('nationality') : formData.nationality;
        this.form.bathroomType = window.sessionStorage.getItem('bathroomType') !== "null" ? window.sessionStorage.getItem('bathroomType') : formData.bathroomType;
    }
},
methods: {
//     invalidText() {
//     if (this.form.firstName.length > 0) {
//         this.invalidtext = ''
//     return this.invalidtext
//     }
//     this.invalidtext = '<div class="mt-2"><svg style="height: 30px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#e44e4e" stroke="#e44e4e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle> </g> </g> </g> </g></svg><span class="error">Please enter First Name</span></div> ' 
//     return this.invalidtext
// },
    closeIdealForPopover(){
        this.showPopOver = false;
    },
    getWhatsappNumber(data){
        if(data.formattedNumber != undefined) {
            this.whatsapp = data.formattedNumber;
            this.showValidationError.whatsappNumber = false
            this.showValidationError.phoneNumber = false;
        } else {
            this.whatsapp = "";
            if(this.whatsapp == ""){
                this.showValidationError.whatsappNumber = true
            }
            if(this.phone == ""){
                this.showValidationError.phoneNumber = true;
            }
        }
    },
    getPhoneNumber(data){
        if(data.formattedNumber != undefined){
            this.phone = data.formattedNumber;
            this.showValidationError.whatsappNumber = false
            this.showValidationError.phoneNumber = false
        }else{
            this.phone = "";
            if(this.whatsapp == ""){
                this.showValidationError.whatsappNumber = true
            }
            if(this.phone == ""){
                this.showValidationError.phoneNumber = true;
            }
        }
    },
    getcountryCode() {
    this.nationalityOptions.push('Any' );
    countryList.filter((country) => {
    this.nationalityOptions.push(country.name);
    });
    },
    curFormatter(value) {
        return '$' + value + '/month'
    },
    onSubmit(evt) {
        evt.preventDefault();      
        // this.invalidText();     
        this.form.whatsappNumber = this.whatsapp;
        this.form.phoneNumber = this.phone;
        if(!this.form.firstName.length) {
            this.errorMessage = "Please Enter First Name"
        } else if(!this.form.email.length) {
            this.errorMessage = "Please Enter email"
        } else if(!this.form.ageGroup) {
            this.errorMessage = "Please select age group"
        } 
        else if(!this.form.whatsappNumber && !this.form.phoneNumber) {
            if(!this.form.phoneNumber){
                this.errorMessage = "Please select phoneNumber"
            }
            else{
                this.errorMessage = "Please select whatsappNumber"
            }
        }
        // else if(!this.form.gender) {
        //     this.errorMessage = "Please select gender"
        // } 
        // else if(!this.form.forCouples) {
        //     this.errorMessage = "Please select forCouples"
        // }
        //  else if(!this.form.nationality) {
        //     this.errorMessage = "Please select nationality"
        // }
        // else if(!this.form.minPrice) {
        //     this.errorMessage = "Please select your minPrice"
        // }
        else if(!this.form.maxPrice) {
            this.errorMessage = "Please select your budget"
        }
        // else if(!this.form.bathroomType) {
        //     this.errorMessage = "Please select room type"
        // } 
        else if(!this.form.sos) {
            this.errorMessage = "Please enter start of stay"
        } else if(!this.form.los) {
            this.errorMessage = "Please select length of stay"
        } else if(!this.form.city.length) {
            this.errorMessage = "Please select city"
        } else if (!this.form.status) {
            this.errorMessage = "Please agree for our marketing updates"
        } else {
            this.errorMessage = ''
            this.form.isActive = true;                
            var source = window.location.href;
            var sourceDetails = "uk"; 
            let flag = '/page/'+this.form.city.toLocaleLowerCase()+'?byRooms=&';
           
            let query =JSON.parse(JSON.stringify(this.form));
                  if(query.forCouples !== null)
                    {
                        if(query.forCouples == "true"){
                            query.forCouples = "Yes"
                        }
                        if(query.forCouples == "false"){
                            query.forCouples = "No"
                        }
                    }
                    else{
                        query.forCouples = "Any"
                    }

                    if(query.bathroomType == null)
                    {
                        query.bathroomtype = "Any Type"
                    }
                    else{
                        query.bathroomtype = query.bathroomType ;
                    }

                    if(query.nationality == null)
                    {
                        query.idealfornationality = "Any"
                    }
                    else{
                        query.idealfornationality = query.nationality
                    }

                    if(query.ageGroup == null)
                    {
                        query.idealforage = "Any"
                    }
                    else{
                        query.idealforage = query.ageGroup
                    }
                    
                    if(query.gender !== null)
                    {
                        if(query.gender == "male"){
                            query.idealforgender = "Male"
                        }
                        if(query.gender == "female"){
                            query.idealforgender = "Female"
                        }
                    }
                    else{
                        query.idealforgender = "Any Gender"
                    }
                    this.prefStayStartTimeframe = null;
                    if(query.sos !== null){
                    var today = moment().format("DD-MM-YYYY");
                    var next2Week = moment().add(14, "days").format("DD-MM-YYYY");
                    var next1Week = moment().add(7, "days").format("DD-MM-YYYY");
                    var nextmonth = moment().add(1, "M").format("DD-MM-YYYY");
                    var nextTwomonth = moment().add(2, "M").format("DD-MM-YYYY");
                    var nextThreemonth = moment().add(3, "M").format("DD-MM-YYYY");
                    const parts = query.sos.split('-');
                    const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
                    var pastDate = formattedDate ;
                    const [day1, month1, year1] = today.split('-').map(Number);
                    const [day2, month2, year2] = next2Week.split('-').map(Number);
                    
                    const [day3, month3, year3] = nextmonth.split('-').map(Number);
                    const [day4, month4, year4] = pastDate.split('-').map(Number);
                    const [day5, month5, year5] = nextTwomonth.split('-').map(Number);
                    const [day6, month6, year6] = nextThreemonth.split('-').map(Number);
                    const [day7, month7, year7] = next1Week.split('-').map(Number);

                    const date1 = new Date(year1, month1 - 1, day1); // Month is 0-indexed in JavaScript Date
                    const date2 = new Date(year2, month2 - 1, day2);
                    const date3 = new Date(year3, month3 - 1, day3); // Month is 0-indexed in JavaScript Date
                    const date4 = new Date(year4, month4 - 1, day4);
                    const date5 = new Date(year5, month5 - 1, day5);
                    const date6 = new Date(year6, month6 - 1, day6);
                    const date7 = new Date(year7, month7 - 1, day7);

                    if(pastDate == today || ( date4 <= date7 && date4 > date1) ){
                        query.startofstay = "Immediately";
                    }  
                    else if ( date4 <= date2 &&
                    date4 > date1) {
                            query.startofstay = "Next two weeks";
                        }
                    else if (date4 > date2 &&
                    date4 <= date3) {
                        query.startofstay = "Two weeks to a month";
                    }
                    else if ( date4 > date3 ) {
                        query.startofstay = "More than a month";
                    }
                    else{
                        query.startofstay = "Any";
                    };

                    if(pastDate == today){
                        this.prefStayStartTimeframe = "Immediately"
                    }
                    else if (  date4 < date3 && date4 > date1) {
                        this.prefStayStartTimeframe = "within a month"
                    }
                    else if (  date4 > date5 && date4 < date6) {
                        this.prefStayStartTimeframe = "in 2-3 month"
                    }
                    else if (  date4 > date6 && date4 > date1) {
                        this.prefStayStartTimeframe = "more than 3 months from now"
                    }
                    else{
                        this.prefStayStartTimeframe = this.form.sos
                    }
                }
                const keysToRemove = ['firstName', 'lastName','lastName','phone','whatsapp','email','los','sos','status','isActive','job','phoneNumber','whatsappNumber','discount_code','bathroomType','nationality','ageGroup','gender'];
                    keysToRemove.forEach(key => {
                    if (query.hasOwnProperty(key)) {
                        delete query[key];
                    }
                    });

                    for (const key in query) {
                if(key !== "firstName" &&  key !== "lastName" && key !== "phoneNumber" && key !== "whatsappNumber" && key !== "email" && key !== "job" && key !== "phone" && key !== "whatsapp" && key !== "discount_code" && key !== "isActive" && key !== "status" && key !== "los" && key !== "sos"   ){
                    if(typeof query[key] === 'object'){
                        for (const item in query[key]){
                            flag = flag + `area=${query[key][item]!== null?query[key][item] : ''}`+"&"
                        }
                    }
                    else{
                    flag = flag + `${key}=${query[key] !== null?query[key] : ''}`+"&"
                    }
                }
            }
            flag = flag.substring(0, flag.length-1);
            axios.post(this.envVars.public.env.MODE === 'prod' ? this.envVars.public.env.PROD_HOME_FORM_API_URL: this.envVars.public.env.DEV_HOME_FORM_API_URL, {
                ageGroup: this.form.ageGroup,
                phoneNumber: this.form.phoneNumber,
                whatsappNumber: this.form.whatsappNumber,
                gender: this.form.gender,
                forCouples: this.form.forCouples,
                nationality: this.form.nationality,
                emailAddress: this.form.email,
                firstName: this.form.firstName,
                jobTitle: this.form.job,
                lastName: this.form.lastName,                    
                phone: this.form.phoneNumber,
                prefBudget:this.form.maxPrice,
                prefStartDate : this.form.sos,
                prefCityName: this.form.city,
                prefCommitmentLength: this.form.los, 
                prefNeighbourhoodNames: this.form.area,
                prefCommitLen: this.form.los,
                prefStayStartTimeframe: this.prefStayStartTimeframe,
                bathroomType: this.form.bathroomType,
                source: source,
                sourceDetails: sourceDetails,
                uid: this.envVars.public.env.firebaseID,
                whatsApp: this.form.whatsappNumber,
                marketingUpdate: this.form.status,
                activityDescription: 'Discount code: ' + this.form.discount_code,
                RedirectedProspectTo: flag,
                useSales: true
            },{
                headers: {
                    Authorization: this.envVars.public.env.MODE === 'prod' ? 'Bearer '+this.envVars.public.env.PROD_COLIV_HQ_KEY : 'Bearer '+this.envVars.public.env.DEV_COLIV_HQ_KEY
                }
            }).then((response) => {
                if(response.data.status == 1) {
                // this.$bvToast.toast('Thank you for reaching out. We will get back to you shortly.', {
                //     title: 'Success',
                //     variant: 'success',
                //     autoHideDelay: 2000
                // })
                    this.$store.commit('SET_FORM_FIELDS', this.form);
                    this.showPopOver=true;
                    setTimeout(() => (this.showPopOver=false), 4000);
                    setTimeout( () => this.$router.push({path: '/page/'+this.form.city.toLocaleLowerCase()+'?byHomes=',query: query}), 4000);
                } 
                else {
                    this.$bvToast.toast(response.data.message, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000
                    })
                    this.form.isActive = false;
                }
            })
            .catch((error) => {
                this.$bvToast.toast('Something went wrong. Please try again.'+error, {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
                this.form.isActive = false;
            })
        }
        //hide/show error as per field
        if(this.form.firstName.length) {
            this.showValidationError.firstName = false
        }
        else {
            this.showValidationError.firstName = true
        }
        if(this.form.email.length) {
            this.showValidationError.email = false
        }
        else {
            this.showValidationError.email = true
        }
        if(this.form.ageGroup) {
            this.showValidationError.ageGroup = false
        }
        else {
            this.showValidationError.ageGroup = true
        }
        // if(this.form.whatsappNumber || this.form.phoneNumber) {
        //     this.showValidationError.whatsappNumber = false
        //     this.showValidationError.phoneNumber = false
        // }
        // else {
        //     this.showValidationError.whatsappNumber = true
        //     this.showValidationError.phoneNumber = true
        // }
        if(this.form.gender) {
            this.showValidationError.gender = false
        }
        else {
            this.showValidationError.gender = true
        }
        if(this.form.forCouples) {
            this.showValidationError.forCouples = false
        }
        else {
            this.showValidationError.forCouples = true
        }
        // if(this.form.minPrice ) {
        //     this.showValidationError.minPrice = false
        // }
        // else {
        //     this.showValidationError.minPrice = true
        // }
        if(this.form.maxPrice) {
            this.showValidationError.maxPrice = false
        }
        else {
            this.showValidationError.maxPrice = true
        }
        if(this.form.nationality) {
            this.showValidationError.nationality = false
        }
        else {
            this.showValidationError.nationality = true
        }
        if(this.form.bathroomType) {
            this.showValidationError.bathroomType = false
        }
        else {
            this.showValidationError.bathroomType = true
        }
        if(this.form.sos) {
            this.showValidationError.sos = false
        }
        else {
            this.showValidationError.sos = true
        }
        if(this.form.los) {
            this.showValidationError.los = false
        }
        else {
            this.showValidationError.los = true
        }
        if(this.form.city.length) {
            this.showValidationError.city = false
        }
        else {
            this.showValidationError.city = true
        }
        if(this.form.status) {
            this.showValidationError.status = false
        }
        else {
            this.showValidationError.status = true
        }
    },
}
}
</script>
<style>
/* @import "@/assets/css/form.css"; */
/* @import "@/assets/css/common.css";
@import "@/assets/css/filterform.css"; */

.pop{
position: fixed;
top: 5rem;
right: 1rem;
border-radius: 5px;
background-color: #F7F7F7;
height: 9rem;
width:20rem;
z-index: 9999;
border: 2px solid #72bf44;
box-shadow:0px 0px 12px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset
}
:deep(.form-check-input) {
    background-color: #d8d8d8;
}
.mascot-image-submitMascot{
height: 7.5rem;
}
.mascot-row-submitMascot{
max-height: 7.5rem;
}
.mainRangeSlide {
width: 100%;
display: block;
padding: 0px 5px;
}
.mainRangeSlide .numberVal input {
padding: 10px 10px 10px 20px;
width: auto;
border-radius: 10px;
color: #000;
border: 1px solid #000 !important;
font-size: 15px;
font-weight: 600;
text-align: center;
width: 100px;
}
.mainRangeSlide .numberVal {
position: relative;
}
.mainRangeSlide .numberVal::before {
content: "$";
position: absolute;
left: 20px;
top: 50%;
transform: translateY(-50%);
}
.mainRangeSlide input[type="number"]::-webkit-inner-spin-button,
.mainRangeSlide input[type="number"]::-webkit-outer-spin-button {
-webkit-appearance: none;
}
.mainRangeSlide .range-slider {
position: relative;
width: 100%;
height: 10px;
border-radius: 15px;
background: #898f86;
margin-bottom: 20px;
}
.mainRangeSlide .range-slider .progress {
position: absolute;
left: 0% ;
right: 0% ;
height: 100%;
border-radius: 15px;
background: #77bf45;
}
.mainRangeSlide .range-slider input[type="range"] {
position: absolute;
width: 100%;
height: 10px;
-webkit-appearance: none;
pointer-events: none;
background: none;
outline: none;
left: 0;
}
.mainRangeSlide .range-slider .range-min::-webkit-slider-thumb {
pointer-events: auto;
-webkit-appearance: none;
width: 25px;
height: 25px;
background: #fcfcfc;
border: 1px solid #77bf45;
border-radius: 20px;
box-shadow: 0px 0px 5px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset;
}
.mainRangeSlide .range-slider .range-max::-webkit-slider-thumb {
pointer-events: auto;
-webkit-appearance: none;
width: 25px;
height: 25px;
background: #fcfcfc;
border: 1px solid #77bf45;
border-radius: 20px;
box-shadow: 0px 0px 5px rgb(119, 191, 69), 0 0 5px rgba(0, 0, 0, 0.5) inset;
}

/* ----------mainRangeSlide-range-end----- */

/*----------Range Slider ---START--------- */
.custom-range .bar .bar-inner {
background-color: #77bf45 !important;
}
.multi-range-slider-bar-only .thumb .caption * {
background-color: #77bf45 !important;
}
/*----------Range Slider ---END--------- */
.form-control {
background: #F7F7F7;
padding: 11px;
}
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
/* border-radius: 10px 0px 0px 10px !important; */
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
.min-max-slider[type=range] {
    margin: auto;
    outline: none;
    padding: 0;
    width: 100%;
    height: 2px;
    background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(0.141414, rgb(222, 222, 222)));
    background-repeat: no-repeat;
    border-radius: 10px;
    cursor: pointer;
    -webkit-appearance: none;
}
.min-max-slider[type=range]::-webkit-slider-thumb {
    height: 22px;
    width: 22px;
    border: 0;
    background: #fff;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.1);
    -webkit-appearance: none;
    border: 3px solid #000000;
    border-radius: 50%;
    position: relative;
}
.min-max-slider.custom-range::-webkit-slider-runnable-track{
    height: 2px;
}
.input-group > .min-max-slider.custom-range:focus{
    box-shadow: none;
    border-color: transparent;
}
.custom-range::-webkit-slider-thumb{
    margin-top: -10px;
}
.error {
    color: #e44e4e;
    text-transform: uppercase;
    font-size: 13px;
}
.ct-dropdown-selector {
width: auto;
border-radius: 10px;
color: #000;
width: 100px;
background: none;
}
.input-groups:before {
content: "\f0dd";
position: absolute;
right: 15px;
top: 75%;
font: normal normal normal 14px/1 FontAwesome;
transform: translateY(-50%);
line-height: normal;
height: 26px;
font-size: 17px;
z-index: 9;
}
.multiselect * {
-webkit-box-sizing: border-box !important;
box-sizing: border-box !important;
}
.multiselect__content-wrapper{
position:absolute !important;
background: #fff !important;
width: 100% !important;
max-height: 240px !important;
overflow: auto !important;
z-index: 9;
}
.multiselect__input{
    outline: none !important;
    border: none !important;
}
.multiselect__content{
list-style: none !important;
min-width: 100% !important;
vertical-align: top !important;
display: inline-block !important;
padding: 0 !important;
margin: 0 !important;
min-width: 100% !important;
vertical-align: top !important;

}
.multiselect__option{
display: block !important;
padding: 12px !important;
min-height: 40px !important;
line-height: 16px !important;
text-decoration: none !important;
text-transform: none !important;
vertical-align: middle !important;
position: relative !important;
cursor: pointer !important;
white-space: nowrap !important;
}
.multiselect--above .multiselect__content-wrapper {
bottom: 100%;
border-bottom-left-radius: 0 !important;
border-bottom-right-radius: 0 !important;
border-top-left-radius: 5px !important;
border-top-right-radius: 5px !important;
border-bottom: none !important;
border-top: 1px solid #e8e8e8 !important;
}
.multiselect__option--highlight {
background: #41b883 !important;
outline: none !important;
color: #fff !important;
}
.custom-checkbox {
    appearance: none;
    background-color: #d8d8d8;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    height: 18px;
    margin-right: 15px;
    min-width: 18px;
    opacity: 1;
    position: relative;
    z-index: 1;
}
.form-label{
    color: #000;
    font-size: 13px;
    font-weight: 400;
}
.form-check-label{
    font-size: 12px;
    outline: 0;
    vertical-align: middle;
}

.form-check{
    display: flex;
}
.phonenumber div div{
 display: flex;
 background: #F7F7F7;
 border-radius: 10px !important ;
}
.multiselect-clear-icon{
   display: none;
	}
@media (max-width: 425px) {
    
.pop{
    width: 15rem !important;
}
}

</style> 