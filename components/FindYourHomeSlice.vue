<template>
    <div class="find-your-idea-wrapper welcome-find-your-wrapper" id="find-your-home">
        <section class="inner-content-wrapper">
            <b-form @submit="onSubmit">
                    <div class="form-box">
                        <div class="d-md-flex align-items-center justify-content-between">
                            <div class="">
                                <p>Find your new home now</p>
                            </div>
                            <div class="">
                                <b-form-group
                                    id="fah-input-group"
                                    class="text-md-center"
                                >
                                    <div class="position-relative">
                                        <b-form-select id="city" v-model="form.city" :options="cityOptions" class="form-inputs custom-select" required></b-form-select>
                                        <i class="fa fa-sort-desc home-dropdown-arrow" aria-hidden="true"></i>
                                    </div>
                                </b-form-group>
                            </div>
                                <div>
                                <template v-if="slice.items.length > 1">
                                    <template v-for="(item, index) in slice.items" :key="'city-item-' + index">
                                        <prismic-link :field="item.city_link"  :ref="'click-' + item.city_link.slug">
                                        </prismic-link>
                                    </template>
                                </template>
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

<script>
export default {
    props: ['slice'],   
    name: 'find-your-home',
    data () {
        return {
            cityOptions: [],
            form: {
                city: '',
            }
        }
    },
    created() {
        let __this = this;
        this.slice.items.forEach(function(city, index) {
            __this.cityOptions.push({
                text: city.city_name,
                value: city.city_link.uid
            })
        })
        let firstOption = this.cityOptions.slice(0, 1)
        this.form.city = firstOption[0].value
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.$router.push({ path: '/page/'+this.form.city});
        }
    }
}
</script>
<style scoped>
.welcome-find-your-wrapper .form-box {
    background: #F7F7F7;
    position: relative; 
    padding: 47px 65px;
    box-shadow: 0 3px 10px 0 rgba(0,0,0,0.05);
    border-radius: 10px;
}
.welcome-find-your-wrapper .form-box .submit-btn .btn.btn-primary {
    border-radius: 5px;
    padding: 0;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    font-weight: 700;
    background: #72BF44;
    border: 0;
    transition:all 0.5s;
    min-width:244px;
    text-transform: uppercase;
    font-family: 'helveticaneue-bold';
}
.welcome-find-your-wrapper .form-box .submit-btn .btn.btn-primary:hover {
    background: #222;
}
.welcome-find-your-wrapper .form-box p {
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    line-height: 25px;
    max-width: 191px;
    text-align: left;
}
.welcome-find-your-wrapper .form-box .form-group {
    margin-bottom: 0;
}
.welcome-find-your-wrapper .form-box .col-form-label,
.welcome-find-your-wrapper .form-box legend {
    color: #999;
    font-weight: 600;
    margin: 0 0 ;
    font-size: 11px;
    padding-bottom:0;
}
.welcome-find-your-wrapper .form-box .custom-select {
    border-radius: 5px;
    border: 0;
    height: 60px;
    max-width: 461px;
    min-width: 461px;
    font-size: 17px;
    font-weight: 700;
    padding: 0 40px 0 24px;
    color: #000;
    outline: none !important;
    box-shadow: 0 0 0 0 transparent !important;
    background-position: 96%;
    cursor: pointer;
    background:#fff;
}
.welcome-find-your-wrapper .form-box .home-dropdown-arrow{
    position: absolute;
    right: 20px;
    font-size: 19px;
    top: 42%;
    transform: translateY(-50%);
    color: #000;
}
.welcome-find-your-wrapper{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1088px;
    bottom: -77px;
}

@media (min-width:768px) and (max-width:1400px){
    .welcome-find-your-wrapper .form-box {
        padding: 20px 20px 20px 20px;
        width: 650px;
        margin: auto;
    }
     .welcome-find-your-wrapper .form-box .find-your-home-search{
        display: grid !important;
        grid-template-columns: 20% 55% 25%;
    }
    .welcome-find-your-wrapper .form-box p{
        font-size: 15px;
        max-width: 108px;
    }
    .welcome-find-your-wrapper .form-box .custom-select{
        min-width: 300px;
        max-width: 300px;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
        padding: 0 30px 0 15px;
    }
    .welcome-find-your-wrapper .form-box .submit-btn .btn.btn-primary{
        height: 45px;
        line-height: 45px;
        font-size: 13px;
         min-width: 150px;
    }
    .welcome-find-your-wrapper .form-box .home-dropdown-arrow{
        font-size: 17px;
        right: 15px;
    }
    .welcome-find-your-wrapper{
        /* bottom: -45px; */
        bottom: -85px;
    }
}
@media (min-width:992px) and (max-width:1400px){
 .welcome-find-your-wrapper .form-box{
     width: 750px;
     padding: 30px;
 }
  .welcome-find-your-wrapper .form-box p{
    font-size: 17px;
    max-width: 168px;
  }
  .welcome-find-your-wrapper .form-box .custom-select{
      font-size: 16px;
      height: 50px;
      line-height: 50px;
  }
 .welcome-find-your-wrapper  .form-box .submit-btn .btn.btn-primary{
      font-size: 14px;
       height: 50px;
      line-height: 50px;
      min-width: 180px;
  }
   .welcome-find-your-wrapper{
        bottom: -79px;
    }
}
@media (min-width:1200px) and (max-width:1400px){
    .welcome-find-your-wrapper .form-box{
        width: 900px; 
    }
    .welcome-find-your-wrapper .form-box p{
        font-size: 19px;
        max-width: 168px;
    }
     .welcome-find-your-wrapper .form-box .custom-select{
        min-width: 400px;
        max-width: 400px;
     }
}

@media  (max-width:767px){
    .welcome-find-your-wrapper .form-box{
        padding: 15px;
    }
    .welcome-find-your-wrapper .form-box .submit-btn {
        position: relative;
        text-align: center;
        display: block;
        margin-top: 10px;
    }
    .welcome-find-your-wrapper .form-box .col-form-label,.welcome-find-your-wrapper .form-box legend {
        text-align: left;
    }
    .welcome-find-your-wrapper .form-box p{
        font-size: 16px;
        text-align: center;
        margin: 0 0 15px;
        max-width: 100%;
    }
    .welcome-find-your-wrapper .form-box .col-form-label, 
    .welcome-find-your-wrapper .form-box legend{
        text-align: left !important;
    }
    .welcome-find-your-wrapper .form-box legend {
        text-align: left;
    }
    .welcome-find-your-wrapper .form-box .custom-select{
        max-width: 100%;
        min-width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 12px;
        margin-bottom: 5px;
        padding: 0 30px 0 15px;
    }
    .welcome-find-your-wrapper .form-box .home-dropdown-arrow{
        font-size: 17px;
        right: 15px;
    }
   .welcome-find-your-wrapper .form-box .submit-btn .btn.btn-primary{
        height: 45px;
        line-height: 45px;
        min-width: 160px;
        font-size: 12px;
    }
    .welcome-find-your-wrapper{
        position: initial;
        transform: none;
    }
}
</style>