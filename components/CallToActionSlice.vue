<template>
    <section class="calltoaction-slice-section">
        <!-- {{ slice }} -->
        <div class="">
            <div v-if="slice.slice_label == 'button'" class="cta_button">
                <div class="pt-xl-5 container-background-wrapper">
                    <div class="container-background-sub-wrapper dropdown_content-menu position-relative">
                        <template v-for="(item, index) in cta" v-bind:key="index">
                            <div class="pb-4" >
                                <div class="d-md-flex align-items-center justify-content-between member_box position-relative">
                                    <div class="">
                                        <img :src="item.image.url" class="lazyload"/>
                                        <div class="cta_button_position px-3 px-sm-4 px-xl-3">
                                            <prismic-rich-text :field="item.text ? item.text :[]" class="member_description cta_heading mb-3 mb-lg-5"/><p class="cta_heading mb-3 mb-lg-5">Ready to find your new home?</p>
                                            <prismic-link :field="item.button_link" class="btn btn-success cta_button_link d-inline-block">
                                                {{ item.button_text }}
                                            </prismic-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
             </div>
            <div v-else-if="slice.slice_label == 'drop_down'" class="cta_drop_down my-5 my-xl-5 py-xl-5">
                <template v-for="(item, index) in cta" v-bind:key="index">
                    <div class="container-background-wrapper" >
                        <section class="container-background-sub-wrapper dropdown_content-menu position-relative">
                            <prismic-rich-text :field="item.text ? item.text : []" class="member_description"/>
                                <img :src="item.image.url" class="lazyload"/>
                            <b-form @submit="onSubmit">
                                <div class="form-box mt-3 mt-md-0">
                                    <div class="d-md-flex align-items-center justify-content-between">
                                        <div class="">
                                            <prismic-rich-text :field="item.text ? item.text :[]" class="member_description"/>
                                            <prismic-link :field="item.button_link" class="btn btn-success p-0 d-block">
                                                {{ item.button_text }}
                                            </prismic-link>
                                        </div>
                                        <div class="">
                                            <b-form-group
                                                id="fah-input-group"
                                                class="text-md-center mb-0"
                                            >
                                            <div class="position-relative">
                                                <b-form-select id="city" v-model="form.city" :options="item.drop_down_list" class="form-inputs" required></b-form-select>
                                                 <i class="fa fa-sort-desc call-form-dropdown-arrow" aria-hidden="true"></i>
                                            </div>
                                            </b-form-group>
                                        </div>
                                        <div>
                                            <div class="submit-btn">
                                                <b-button type="submit" class="FindYourNewHome-btn" :id="'CityFinder-'+form.city" variant="primary">Search</b-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-form>
                        </section>
                    </div>
                </template>
            </div>
            <div v-else-if="slice.slice_label == 'left-right'" class="left-right inner-content-wrapper">
                <div class="mt-5 mt-xl-5 pt-xl-5">
                    <div class="cms-main-wrap dropdown_content-menu position-relative">
                        <template v-for="(item, index) in cta" v-bind:key="index">
                            <div class="mb-4 pb-2" >
                                <div class="row">
                                    <div class="col-md-6 pr-md-0">
                                        <img :src="item.image.url" class="lazyload w-100 h-100 fillup-img"/>
                                    </div>
                                    <div class="col-md-6 pl-md-0">
                                        <div class="fillup-btn-section">
                                            <div class="cta_button_position px-3 py-4 py-md-0 px-sm-4 px-xl-3 d-flex flex-column justify-content-center h-100 mx-md-auto">
                                                <p class="member_description fillup-btn-heading mb-3 mb-lg-5">{{item['CTA']}}</p>
                                                <prismic-link :field="item.button_link" class="btn btn-success cta_button_link fillup-btn d-inline-block mb-4 pb-2">
                                                    {{ item.button_text }}
                                                </prismic-link>
                                                <!-- <prismic-rich-text :field="item.small_text" :htmlSerializer="anotherHtmlSerializer" class="fillup-btn-paragraph"/> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
             </div>
        </div>
    </section>
</template>

<script>
import * as prismic from "@prismicio/vue";
const anotherHtmlSerializer = function (type, element, content, children) {} // Keep this line for link https://prnt.sc/v9tq4e
export default {
    props: ['slice'],
    name: 'call-to-action',
    data() {
        return {
            cta: [],
            form: {
                city: ''
            },
            anotherHtmlSerializer
        }
    },
    methods: {
        async getCTAData() {
            console.log(this.$prismic,this.$route)
            let _this = this;
            this.slice.items.forEach((item, index) => {
                const path = 'document.id'; // Replace with the actual path to the field you want to filter on
                const value = item.cta_link.id;
                this.$prismic.client.get({filters:this.$prismic.filter.at('document.id',item.cta_link.id)}).then(async (response) => {
                    console.log("response 114",response)
                    if(this.slice.slice_label == 'button') {
                        Object.assign(item, { image: response.results[0].data.image.regular })
                    } else if(this.slice.slice_label == 'left-right') {
                        Object.assign(item, { image: response.results[0].data.image.vertical })
                        Object.assign(item, { small_text: response.results[0].data.small_text })
                    } else if(this.slice.slice_label == 'drop_down') {
                        Object.assign(item, { image: response.results[0].data.image.big })
                        let drop_down_list = []
                        response.results[0].data.drop_down_list.forEach(function(row, ind) {
                            if(ind == 0 ) { 
                                _this.form.city = row.drop_down_link.uid
                            }
                            drop_down_list.push({
                                text: row.drop_down_text,
                                value: row.drop_down_link.uid
                            })
                        })
                        Object.assign(item, { drop_down_list: drop_down_list })
                    }
                    Object.assign(item, { CTA: response.results[0].data.cta })
                    Object.assign(item, { button_text: response.results[0].data.button_text })
                    Object.assign(item, { button_link: response.results[0].data.button_link })
                    this.cta.push(item)
                })
            })
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.$router.push({ path: '/page/'+this.form.city});
        }
    },
    created() {
        this.getCTAData();
    },
    mounted(){
        var Data = null
        // console.log(this.$prismic.client.get(('document.type', 'topics'),{}))
    }
}
</script>
<style scoped>
.calltoaction-slice-section .dropdown_content-menu {
    background-color: transparent !important;
}
.calltoaction-slice-section .container-background-sub-wrapper{
    background-color: transparent;
}
 .calltoaction-slice-section .cta_button img,.calltoaction-slice-section  .cta_drop_down img{
    width: 100%;
    border-radius: 20px;
}
.calltoaction-slice-section .cta_button_position{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    max-width: 1400px;
    width: 100%;
}
.calltoaction-slice-section .cta_heading{
    color: #000;
    margin-bottom: 0;
    font-size: 42px;
    letter-spacing: normal;
    line-height: 50px;
    font-weight: 700;
    max-width: 536px;
}
.calltoaction-slice-section .cta_button_link{
    min-width: 326px;
    max-width: 326px;
    height: 60px;
    color: #000;
    font-size: 18px;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: normal;
    background-color: #72BF44;
    border-radius: 30px;
    display: inline-block;
    line-height: 60px;
    transition: all 0.5s;
    cursor: pointer;
    padding: 0;
    border: 0;
    transition: all 0.5s;
}
.calltoaction-slice-section .cta_button_link:hover{
    color: #fff;
    background-color: #000;
}
.calltoaction-slice-section .form-box{
    background: #F7F7F7;
    position: relative;
    padding: 47px 65px;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 5%);
    border-radius: 10px;
    max-width: 1088px;
    width: 100%;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
}
.calltoaction-slice-section .form-box a{
    font-size: 21px;
    font-weight: 700;
    color: #000000;
    line-height: 25px;
    max-width: 191px;
    text-align: left;
    background-color: transparent;
    border: 0;
    text-transform: lowercase;
}
.calltoaction-slice-section .form-box a::first-letter{
    text-transform: capitalize;
}
.calltoaction-slice-section .form-box .custom-select{
        border-radius: 5px;
    border: 0;
    height: 60px;
    max-width: 461px;
    min-width: 461px;
    font-size: 18px;
    font-weight: 700;
     padding: 0 40px 0 24px;
    color: #000;
    outline: none !important;
    box-shadow: 0 0 0 0 transparent !important;
    background-position: 96%;
    cursor: pointer;
    background:#fff;
}
.calltoaction-slice-section  .form-box .call-form-dropdown-arrow{
    position: absolute;
    right: 20px;
    font-size: 20px;
    top: 42%;
    transform: translateY(-50%);
    color: #000;
}
.calltoaction-slice-section .form-box .submit-btn .btn.btn-primary{
        border-radius: 5px;
    padding: 0;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: 700;
    background: #72BF44;
    border: 0;
    transition: all 0.5s;
    min-width: 244px;
    text-transform: uppercase;
    font-family: 'helveticaneue-bold';
}
.calltoaction-slice-section .form-box .submit-btn .btn.btn-primary:hover{
    background: #222;
}
.calltoaction-slice-section .fillup-btn-section {
    background-color: #F7F7F7;
    border-radius: 0 10px 10px 0px;
    height: 100%;
}
.calltoaction-slice-section .fillup-btn-section .cta_button_position{
    position: initial;
    transform: none;
    max-width: 472px;
}
.calltoaction-slice-section .fillup-btn-heading{
    font-size: 28px;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: normal;
    color: #000;
}
.calltoaction-slice-section .fillup-btn{
    border-radius: 50px;
    min-width: 226px;
    max-width: 226px;
    height: 50px;
    line-height: 50px;
    padding: 0 !important;
}

.calltoaction-slice-section .fillup-img{
    object-fit: cover;
    border-radius: 10px 0 0 10px;
}
@media (max-width:767px){
    .calltoaction-slice-section .form-box{
        padding: 15px;
        position: initial;
       transform: none;
    }
    .calltoaction-slice-section .form-box a{
        font-size: 17px;
        text-align: center;
        margin: 0 0 15px;
        max-width: 100%;
    }
    .calltoaction-slice-section .form-box .submit-btn{
            position: relative;
        text-align: center;
        display: block;
        margin-top: 10px;
    }
    .calltoaction-slice-section .form-box .custom-select{
        max-width: 100%;
        min-width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 13px;
        margin-bottom: 5px;
        padding: 0 30px 0 15px;
    }
     .calltoaction-slice-section  .form-box .call-form-dropdown-arrow{
        font-size: 18px;
        right: 15px;
    }
    .calltoaction-slice-section .form-box .submit-btn .btn.btn-primary{
        height: 45px;
        line-height: 45px;
        min-width: 160px;
        font-size: 13px;
        text-align: center;
    }
    .calltoaction-slice-section .fillup-img{
        border-radius: 10px 10px 0 0;
    }
    .calltoaction-slice-section .fillup-btn-section{
        border-radius: 0 0 10px 10px;
    }
}
@media (max-width:991px){
    .calltoaction-slice-section .cta_heading{
        font-size: 24px;
        line-height: 30px;
    }
    .calltoaction-slice-section .cta_button_link{
        min-width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        max-width: 200px;
    }
    .calltoaction-slice-section .cta_button img,.calltoaction-slice-section  .cta_drop_down img{
        min-height: 300px;
        object-fit: cover;
    }
    .calltoaction-slice-section .fillup-btn-heading{
        font-size: 18px;
        line-height: 28px;
    }
    .calltoaction-slice-section .cta_button_link{
        min-width: 180px;
        max-width: 180px;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
    }
}
@media (min-width:992px) and (max-width:1199px){
    .calltoaction-slice-section .cta_heading{
        font-size: 35px;
    }
    .calltoaction-slice-section .cta_button_link{
        min-width: 250px;
        height: 55px;
        line-height: 55px;
        font-size: 18px;
        max-width: 250px;
    }
    .calltoaction-slice-section .dropdown_content-menu .cta_button img{
        min-height: 300px;
        object-fit: cover;
    }
     .calltoaction-slice-section .fillup-btn-heading{
        font-size: 22px;
        line-height: 28px;
    }
     .calltoaction-slice-section .cta_button_link{
        max-width: 200px;
        min-width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
    }
}
@media (min-width:768px) and (max-width:1400px){
 .calltoaction-slice-section .form-box a{
     font-size: 16px;
    max-width: 108px;
 }
 .calltoaction-slice-section .form-box{
    padding: 20px 20px 20px 20px;
    width: 650px;
    margin: auto;   
 }
  .calltoaction-slice-section .form-box .custom-select{
    min-width: 300px;
    max-width: 300px;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    padding: 0 30px 0 15px;
  }
   .calltoaction-slice-section  .form-box .call-form-dropdown-arrow{
        font-size: 18px;
        right: 15px;
    }
   .calltoaction-slice-section .form-box .submit-btn .btn.btn-primary{
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        min-width: 150px;
   }
}
@media (min-width:992px) and (max-width:1400px){
    .calltoaction-slice-section .form-box a{
        font-size: 18px;
        max-width: 168px; 
    }
     .calltoaction-slice-section .form-box{
        width: 750px;
        padding: 30px;
     }
     .calltoaction-slice-section .form-box .custom-select{
        font-size: 17px;
        height: 50px;
        line-height: 50px;
    }
     .calltoaction-slice-section .form-box .submit-btn .btn.btn-primary{
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        min-width: 180px;
     }
}
@media (min-width:1200px) and (max-width:1400px){
     .calltoaction-slice-section .form-box{
        width: 900px; 
    }
     .calltoaction-slice-section .form-box a{
        font-size: 20px;
        max-width: 168px;
    }
     .calltoaction-slice-section .form-box .custom-select{
        min-width: 400px;
        max-width: 400px;
     }
}
@media (min-width:1200px) and (max-width:1500px){
   .calltoaction-slice-section  .cta_button_position{
        padding: 0 50px !important;
    }
}
</style>