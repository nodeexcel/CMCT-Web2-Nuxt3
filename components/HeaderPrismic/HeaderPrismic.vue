<template>
	<div class="header-wrap">
		<header class="site-header" :style="color">
			<div class="row header-container">
				<div class="col-lg-3 col-md-3 col-sm-4 col-4 header-logo">
					<!-- <router-link to="/" class="logo Homepage-btn" id="HomepageButton"> -->
					<router-link to="/" class="logo Homepage-btn" id="CMLogo">
					  <!-- <prismic-image :field="fields.logo"/> -->
            <img src="https://images.prismic.io/cmct-web/84e86b12-dfd7-46eb-ac61-f2cb4f43f553_Logo+for+website.png" width="135" height="60" :alt="fields.logo.alt"/>
					</router-link>
				</div>
				<div class="col-lg-9 col-md-9 col-sm-8 col-8 header-menu">
					<prismic-rich-text :field="fields.tagline"/>
					<div class="d-flex justify-content-between align-items-center navbar-heading-menu">
						<nav class="navbar navbar-expand-lg">
							<a class="navbar-brand title" href="#">Menu</a>
							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarmenuContent" aria-controls="navbarmenuContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon">
									<prismic-image :field="fields.mobileMenu"/>
								</span>
							</button>

							<div class="collapse navbar-collapse" id="navbarmenuContent">
								<ul class="navbar-nav mr-auto">
									<li v-for="(slice, index) in slices" :key="'slice-' + index" class="nav-item dropdown">
										<template v-if="slice.slice_type === 'header'">
											<span v-if="slice.primary.link.link_type == 'Any'"
											:key="'nav-link-' + index"
											:class="'menu-maintitle nav-link ' + [ slice.items.length >= 1 ? 'dropdown-toggle' : '']"  data-toggle="dropdown">
											{{ $prismic.asText(slice.primary.label) }}
											</span>

											<template v-else>
												<prismic-link v-if="slice.items.length >= 1"
													:field="slice.primary.link"
													:class="'menu-maintitle nav-link ' + [ slice.items.length > 1 ? 'dropdown-toggle' : '']"
													data-toggle="dropdown"
													:key="'nav-link-' + index">
													{{ $prismic.asText(slice.primary.label) }}
												</prismic-link>
												<MenuLinkNativSlice 
													v-else
													:item="slice"
													:class-name="'menu-maintitle nav-link'" 
													@click="closeMenu()"
													:key="'menu-header-item-' + index"
													:index="index" 
													:link-type="'main'"/>
											</template>
											<i v-if="slice.items.length > 1" class="fa fa-caret-down" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
											<template v-if="slice.items.length >= 1">
												<div class="dropdown-menu" aria-labelledby="navbarDropdown">
													<div v-for="(item, index) in slice.items" :key="'menu-header-item-' + index">
                            <!-- {{ item }} -->
														<MenuLinkNativSlice @click="closeMenu()"  :item="item" :index="index" :class-name="'menu-subtitle dropdown-item'" :link-type="'submenu'"/>
													</div>
												</div>
											</template>
										</template>
									</li>
								</ul>
							</div>
						</nav>
						<prismic-link :field="fields.bolder_link" class="dashboard-btn" :style="button " id="FindAHome">
							{{ $prismic.asText(fields.bolder_link_label) }}
						</prismic-link>
					</div>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
// import {client} from '~/prismic/prismic';
import {state} from '~/store/index'
// import { useRuntimeConfig } from 'nuxt'
// import linkResolver: '@/plugins/link-resolver',
export default {
  data () {
    return {
      hovered: false,
      slices: [],
      prismicData:null,
      fields: {
        header: {
          background_color: '',
          text_color: '',
          transparency: ''
        },
        logo: {},
        tagline: [],
        background: [],
        transparency: [],
        bolder_link_label: [], 
        bolder_link: {},
        mobileMenu: {}
      }
    }
  },
  head () {
    return {
      meta: [
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }
      ]
    }
  },
  computed:{
    color () {
      if (this.fields.header.background_color) {
        let transparency = Number(this.fields.header.transparency)/100 
              
            // If the hex value is valid. 
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) { 
                  
                // Getting the content after '#',
                let ret = this.fields.header.background_color.slice(1); 
                // Splitting each character 
                ret = ret.split(''); 
                  
                // Checking if the length is 3 
                // then make that 6 
                if(ret.length == 3) { 
                    var ar = []; 
                    ar.push(ret[0]);  
                    ar.push(ret[0]); 
                    ar.push(ret[1]); 
                    ar.push(ret[1]); 
                    ar.push(ret[2]); 
                    ar.push(ret[2]); 
                    ret = ar; 
                } 
                  
                // Starts with '0x'(in hexadecimal) 
                ret = '0x'+ ret.join(''); 
                  
                // Converting the first 2 characters 
                // from hexadecimal to r value 
                var r = (ret>>16)&255; 
                  
                // Converting the second 2 characters 
                // to hexadecimal to g value 
                var g = (ret>>8)&255; 
                  
                // Converting the last 2 characters 
                // to hexadecimal to b value 
                var b = ret&255; 
                  
                // Appending all of them to make 
                // the RGBA value 
                
                let color = 'rgba('+[r, g, b].join(',')+',' + transparency + ')';
                return {
                  'background-color': color,
                  'border': '1px solid ' + color,
                  'color': this.fields.header.text_color
                }
            }
        }
    },
    background(){
      if (this.fields.header.background_color) {
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) { 
          // Getting the content after '#',
          let ret = this.fields.header.background_color.slice(1); 
          // Splitting each character 
          ret = ret.split(''); 
                  
          // Checking if the length is 3 
          // then make that 6 
          if(ret.length == 3) { 
              var ar = []; 
              ar.push(ret[0]);  
              ar.push(ret[0]); 
              ar.push(ret[1]); 
              ar.push(ret[1]); 
              ar.push(ret[2]); 
              ar.push(ret[2]); 
              ret = ar; 
          } 
          ret = '0x'+ ret.join(''); 
                  
          var r = (ret>>16)&255;   
          var g = (ret>>8)&255;  
          var b = ret&255; 
          let color = 'rgba('+[r, g, b].join(',')+',' + 0.9 + ')';
          return {
            'background-color': color,
            'border': '1px solid ' + this.fields.header.text_color,
            'color': this.fields.header.text_color
          }
        }
      }
    },
    button () {
      return {
        '--color':  this.fields.header.text_color,
        '--border': '2px solid ' + this.fields.header.text_color,
        '--color-hover':  '#FFFFFF',
        '--border-hover': '2px solid ' + this.fields.header.text_color_hover,
        '--background-color-hover': this.fields.header.text_color_hover,
      }
    },
    hoverClass() {
      return {
        'color': 'red'
      }
    }
  },
  methods: {
    // ...mapMutations(['setHeaderLogo','SET_MENU']),
    closeMenu() {
		
        $('#navbarmenuContent').collapse('hide');
    },
    async getMenu () {
      //Query to get menu content
      /* await this.$prismic.api.getSingle('menu')
        .then((menuContent) => { */
          
        //})
    },
    performPrismicOperation(prismicFunction, ...args) {
      return new Promise((resolve, reject) => {
        prismicFunction(...args)
          .then(response => {
            // Resolve the promise with the response data
            resolve(response.data);
          })
          .catch(error => {
            // Reject the promise with the error
            reject(error);
          });
      });
    }
  },
       async mounted(){

        this.performPrismicOperation(this.$prismic.client.getSingle, 'menu')
          .then(menuData => {
            // Use the menuData here
            // console.log(menuData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });

          this.$prismic.client.getSingle('menu').then((result) => {
          let menuContent = result
          // console.log(menuContent)
          this.fields.logo = menuContent.data.logo
          this.fields.header.background_color = menuContent.data.background_color
          this.fields.header.transparency = 80 //menuContent.data.header_transparency_perc
          this.fields.header.text_color = '#f55e61' //menuContent.data.header_text_color
          this.fields.header.text_color_hover = '#72bf44' //menuContent.data.header_text_color
          this.fields.tagline = menuContent.data.brand_tag_line

          this.fields.background = menuContent.data.background_color
          this.fields.transparency = menuContent.data.transparency
          this.fields.bolder_link_label = menuContent.data.get_in_touch
          this.fields.bolder_link = menuContent.data.get_in_touch_link
          this.fields.mobileMenu = menuContent.data.mobile_menu
          this.slices  = menuContent.data.nav.filter(function(navs) {
            return navs.slice_type === 'header';
          });
          }).catch((error) => {
          console.error(error);
          });
          // const menu = this.$store
          // console.log("menu", this.$store)
    }

}
</script>

<style scoped>
/* Site header  */
.site-header {
  height: auto;
  padding: 0;
}
.site-header .row {
  margin: 0px;
}
.site-header,
.site-header a {
  /* color: darkgrey; */
  font-weight:400;
  /* opacity: 0.8; */
}
.site-header nav a:hover {
  color: gray;
}

/* .site-header,
.site-header a {
  color: white;
} */
.site-header nav a:hover {
  color: darkgrey;
}
.site-header .logo {
  font-size: 22px;
  font-weight: 900;  
  line-height: 20px;
  display:inline-block;
}
.site-header nav {
  float: left;
}
.site-header nav ul {
  margin: 0;
}
.site-header nav li {
  margin-left: 0;
}


/* Media Queries */
@media (max-width: 767px) {
  .site-header {
    height: auto;
  }
  .site-header {
    position: fixed;
  }
  .site-header .logo {
    display: inline-block;
    text-align: left;
  }
  .site-header nav {
    float: none;
    text-align: center;
  }
  .site-header nav li {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
  .header-menu{
    display: flex;
    align-items: center;
  }
}
/* insys*/
.site-header .header-menu ul li {
  display: inline-block;
  vertical-align: middle;
     padding: 34px 0;
    margin: 0px 35px;
}
.site-header .row {
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
}
/* header menu */
.site-header .header-menu ul li .menu-maintitle {
  font-size: 14px;
  color: #000;
  font-weight: 700;
  padding: 0px 8px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  text-transform: uppercase;
}
.site-header .header-menu ul li.show .menu-maintitle{
  color: #72BF44;
}
.site-header .header-menu .dashboard-btn {
  font-size: 14px;
  padding: 0px;
  border-radius: 20px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0;
  line-height: 40px;
  height: 40px;
  margin-left: 27px;
  font-weight: 700;
  text-transform: capitalize;
  min-width: 168px;
}
.site-header .header-menu a {
  text-decoration: none;
}
.site-header  .header-menu .dashboard-btn {
  color: #fff;
  background-color: #72BF44;
  border:0 !important;
  transition: all 0.5s;
}
.site-header  .header-menu .dashboard-btn:hover {
  background-color: #000;
  color: #fff;
}

.site-header .header-menu  .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle {
  color: #000;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 700;
}
.site-header .header-menu .dropdown-toggle::after {
  border-top: .4em solid #72bf44;
  display: none;
}
.site-header nav {
  padding: 0;
}

.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle:hover,
.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item:focus, 
.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item:hover {
  background-color:transparent;
  color: #000;
}
.site-header .header-menu ul li i {
  color: #72bf44; 
  font-size: 16px;
  cursor: pointer;
}
.site-header nav li:first-child {
  margin-left: 0;
}

.text-s {
  font-size: 35px;
}
 .site-header .header-menu ul li i{
    opacity: 0;
  }
@media(min-width: 992px){
  .site-header .header-menu .navbar-brand {
    display: none;
  }
  .site-header .header-menu  .navbar-expand-lg .navbar-nav .nav-item  .dropdown-menu{
    background-color: rgb(255 255 255);
    color: #fff;
    border-radius: 0;
    border: none;
    margin-top: 0px;
    box-shadow: -1px 1px 6px 0 rgb(90 90 140 / 40%);
    padding: 0;
    border-radius: 10px;
    min-width: 170px;
    display: block !important;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    visibility: hidden;
  } 
  .site-header .header-menu  .navbar-expand-lg .navbar-nav .nav-item:hover  .dropdown-menu{
    opacity: 1;
    visibility: visible;
  }
  .site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle{
    padding: 7px 15px;
  }
  .site-header .header-menu ul li .menu-maintitle::before {
    content: none;
  }
  .site-header .header-menu ul li .menu-maintitle:hover::before {
    width: 85%;
  }
 
  .site-header .header-menu ul li:hover .menu-maintitle{
    color: #72bf44;
  }
   .header-wrap{
      margin-top: 100px;
  }
  .navbar-heading-menu{
       display: grid !important;
      grid-template-columns: 80% 20%;
  }
  .site-header nav ul{
    margin: auto !important;
  }
  .site-header .header-menu .dashboard-btn{
    width: 168px;
    margin-left: auto;
  }
}
@media(max-width:991px) {
  .site-header .header-menu,
  .site-header .header-menu.navbar {
    -webkit-box-pack: flex-end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: flex-end;
    justify-content: flex-end;
    position: initial;
    display: flex;
  }
  .site-header .header-container{
    padding: 15px 0px;
  }
  .site-header .header-menu .navbar-brand.title {
    color: #fff;
    font-size: 18px;
    display: none;
  }
  .site-header .header-menu .navbar-toggler {
    background-color: #e4f3db;
    padding: 3px 8px;
    border: 2px solid #72bf44;
  }
  .site-header .header-menu  .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle {
    color: #000 !important;
    font-size: 14px;
  }
  .site-header .header-menu .navbar-collapse {
    position: absolute;
    top: 100%;
    margin-top: 0;
    width: 100%;
    right: 0;
    /* background-color: rgb(0 0 0 / 90%); */
    background-color: #fff;
    padding: 15px;
    transition: all 0.3s ease-in-out;
    box-shadow: -1px 0px 3px 0 rgb(90 90 140 / 40%);
    border-radius: 0 0 10px 10px;

  }
  .site-header nav{
    position: initial;
  }
  .site-header .header-menu  i.fa-caret-down {
    position: absolute;
    top: 10px;
    right: 0;
    left: auto;
    width: 20px;
    line-height: 20px;
    height: 20px;
    text-align: center;
  }
  .site-header .header-menu ul li .menu-maintitle {
    text-align: left;
    font-size: 13px;
    color: #000;
    padding: 5px 8px;
  }  
  .site-header .header-menu .dashboard-btn {
    margin-left: 0;
  }
  .site-header .header-menu ul li {
    margin-left: 0;
    text-align: left;
    padding: 0;
  }
  .site-header .header-menu .navbar-nav .dropdown-menu {
    border: none;
    border-top: 1px solid #b5b5b5;
    border-radius: 0;
  }
  .site-header .header-menu .navbar-nav .dropdown-menu {
    background-color: transparent;
    border: none  !important; 
    margin: 0;
    padding: 0;
  }
  .site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle {
    color: #ddd;
  }
  .site-header .header-menu .dashboard-btn {
    position: absolute;
    right: 78px;
    left: auto;
    height: 40px;
    line-height: 38px;
  }
  .site-header .header-menu ul li a:hover {
    color: #72bf44;
  }
}
@media (min-width:992px) and (max-width:1199px){
  .site-header .header-menu ul li{
        margin: 0px 5px !important;
  }
  .site-header .header-menu ul li .menu-maintitle{
    font-size: 12px;
  }
  .site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle{
    font-size: 13px;
  }
  .navbar-heading-menu{
    display: flex !important;
  }
}
@media(max-width:767px) {
  .site-header .header-menu .navbar-collapse {
    width: 100%;
  }
  .header-wrap{
      margin-top: 80px;
  }
}
@media(max-width:575px) {
  .site-header .header-menu .navbar-collapse {
    margin-top: 22px;
    width: 100%;
  }
  .site-header .logo {
    position: relative;
    z-index: 9999;
    display: inline-block;
    vertical-align: middle;
  }  
   .header-wrap{
      margin-top: 74px;
  }
}
@media (max-width: 480px) { 
  .site-header .logo img {
    max-width: 80%;
    /* margin: 5px 0 0 0; */
  }
  .site-header .header-menu .dashboard-btn {
    font-size: 12px;
    padding: 0px 10px;
  }
  .site-header .header-menu .navbar-collapse {
    margin-top: 24px;
  }
}


@media (min-width:768px) and (max-width:991px){
  .navbar-toggler-icon {
      width: 1.2em;
      height: 1.2em;
  }
  .site-header .header-menu .navbar-toggler {
      padding: 6px 8px;
  }
  .header-wrap{
      margin-top: 100px;
  }
}
@media (max-width:767px){
  .site-header{
    max-width: 100%;
    width: auto;
}
  .navbar-toggler-icon {
      width: 1em;
      height: 1em;
  }
  .site-header .header-menu .navbar-toggler {
      padding: 4px 8px;
  }
  .site-header .header-menu .dashboard-btn{
      font-size: 11px;
      padding: 0px 8px;
      right: 70px;
      line-height: 32px;
      height: 34px;
      border: 1px #72bf44 solid !important;
      min-width: 120px;
  }
  .site-header .logo img {
     max-width: 90px; 
  }
  .site-header .header-menu .navbar-collapse {
      margin-top: 0;
  }
  .site-header nav {
      margin-right: 0;
  }
}
@media(min-width:992px) and (max-width:1550px){
  .site-header .header-menu ul li{
    margin: 0px 10px;
  }
  .site-header .header-logo{
    flex: 0 0 20%;
    max-width: 20%;
  }
  .site-header .header-menu{
    flex: 0 0 80%;
    max-width: 80%;
  }
}
@media (min-width:1300px) and (max-width:1550px){
   .site-header .header-menu ul li{
    margin: 0px 20px;
  }
}
</style>


