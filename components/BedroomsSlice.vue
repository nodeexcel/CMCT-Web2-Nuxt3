<template>
    <div class="inner-content-wrapper">
        ghkff
    </div>
</template>

<script>
    export default {
       
    }    
</script>



<style scoped> 

.carousel {
    margin-top: 0rem !important;
}

.section-main-title .cms-title :first-child{
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    margin-bottom: 0;
    letter-spacing: normal;
    text-align: left;
}
.new-room-box .detail-inner .type h3  {
  color: #000;
  font-size: 18px;
  letter-spacing: normal;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 0;
}
.new-room-box .detail-inner {
    padding: 32px 24px 10px 24px;
    letter-spacing: normal;
    margin-top: -10px;
}
.new-room-box  .room-main{
    cursor: pointer;
    height: 100%; 
    background-color: #F7F7F7;
    border-radius: 10px;
}
.new-room-box .room-item:nth-child(3n+1){
    padding-right: 10px;
}
.new-room-box .room-item:nth-child(3n+2){
    padding: 0 12.5px 0 12.5px;
}
.new-room-box .room-item:nth-child(3n+3){
    padding-left: 10px;
}
.new-room-box .detail-inner .price p { 
    font-size: 14px;
    color: #72BF44;
    font-weight: 700;
    line-height: 27px;
}
.new-room-box .room-image, .new-room-box .room-detail {
    position: relative;
}
.new-room-box .room-image .overlay {
    position: absolute;
    top: 12px;
    left: 12px;
}
.new-room-box .room-image .slider-img img{
    border-radius: 10px 10px 0 0;
    width: 100%;
}
.new-room-box .room-image .overlay :first-child,.view-photos-btn,.couple-room-btn {
    background-color: #ef5357;
    border: 1px solid #ef5357;
    color: #ffffff;
    padding: 0;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 700;
    line-height: 29px;
    min-width: 116px;
    min-height: 31px;
    letter-spacing: normal;
    border-radius: 5px;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
}
.new-room-box  .view-photos-btn{
    background-color:rgba(141, 141, 141, 50%);
    border: 0;
    min-width: 100px;
    position: absolute;
    bottom: 22px;
    right: 12px;
}
.new-room-box .room-image ::v-deep(.VueCarousel-pagination) {
	position: absolute;
    top: auto;
    bottom: 20px;
}
.new-room-box .room-detail .detail-inner .feature-wrap {
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    color: #000;
}
.couple-room {
    color: #000;
    background-color: rgb(247 247 247);
    border-color: rgb(175 173 173);
    font-weight: bold;
}
.adjust-lease-btn {
    color: #000;
    background-color: rgb(114, 191, 68);
    border-color: rgb(114, 191, 68);
    border-radius: 50px;
    padding: 0;
    margin-bottom: 0;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 700;
    line-height: 29px;
    min-height: 31px;
    width: 100%;
    letter-spacing: normal;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;

}
.adjust-lease-btn .fa-sliders:before {
    content: "\f1de";
    color: black;
    margin-right: 5px;
}
.new-room-box .room-detail{
    background-color: transparent !important;
}

.promo-overlay ::v-deep(:first-child) {
  background-color: #f55e61;
  border: 1px solid #f55e61;
  color: #ffffff;
  padding: 0 10px;
  margin-bottom: 0;
  display: inline-block;
  vertical-align: middle;
  border-radius: 5px;
}
.promo-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.housemates{
    margin-bottom: 0rem !important;
    color: #000;
    font-weight: 600;
}
.room-size{
    color: #000;
    padding: 10px 24px;
    letter-spacing: normal;
    /* min-width:2rem */
}
.price_details{
 min-height: 4rem;
}
.for-couple{
    min-height: 3rem;
    padding: 0px 24px;
    letter-spacing: normal;
    margin-top: -10px;
}
.housemates-details{
    padding: 5px 24px 12px 24px;
    letter-spacing: normal;
    margin-top: -10px;
    min-height: 13em

}
.adjust-lease_details{
    padding: 15px 24px;
    letter-spacing: normal;
    margin-top: -10px; 
}
 /* :deep(.description_feature > div:has(ul)){  
    max-height: 13rem;
 } */
 :deep(.description_feature > ul){  
    margin-bottom: 1rem !important;
 }
 :deep(.description_feature > div:has(div > ul)){  
    max-height: none !important;
    min-height: 1rem ;
 }
 /* :deep(.description_feature){  
    max-height: 26rem;
    margin-bottom: 1rem !important;
 } */
 /* :deep(.description_feature > div > br){  
    display:none
 } 
 :deep(.description_feature > div > div > ul > li > br){  
    display:none
 } 
 :deep(.description_feature > div > div > br){  
    display:none
 }
 :deep(.description_feature > p){  
    margin-bottom: 1rem !important
 } 
 :deep(.description_feature > p :empty){  
    display:none
 }  */
.gallery-item-mf-heading{
	font-size: 1em;
	line-height: 21px;
	font-weight: 400;
	color: #000;
}
.gallery-item-mf-years{
	font-size:.7em !important;
	font-weight: 700;
	color: #8D8D8D;
	line-height: 21px;
}
.gallery-items-mf-status {
      font-size: 0.7em !important;
	  font-weight: 700;
	  color: #fff;
	  text-transform: lowercase;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  letter-spacing: normal;
	  height: 18px;
	  width: auto;
	  margin: 0 auto;
	  border-radius: 10px;
	  line-height: 32px;
	  background-color: #72BF44;
      padding: 0 6px;
      position: absolute;
      top: 35%;
      right: 10%;
      
}
.orange{
	background-color: rgb(255, 185, 3);	
}
.green {
	background-color: #72BF44;
}
/* .carousel {
    border-radius: 30px !important;
    background-color: transparent !important;
    overflow: hidden !important;
} */

@media (max-width:767px){
    .new-room-box .detail-inner{
        padding: 20px;
    }
    .new-room-box .detail-inner .type h3{
        font-size: 17px;
        line-height: 20px;
    }
    .new-room-box .detail-inner .price p{
        font-size: 13px;
        line-height: 20px;
    }
    .new-room-box .room-detail .detail-inner .feature-wrap{
        font-size: 14px;
        line-height: 20px;
    }
}
@media (max-width:991px){
    .section-main-title .cms-title :first-child{
        font-size: 22px;
        line-height: 30px;
    }
    .new-room-box .room-item{
        padding: 0 15px !important;
    }
}
@media (min-width:576px) and (max-width:767px){
    .new-room-box .room-image .overlay{
        top: 8px;
        left: 8px;
    }
    .new-room-box .view-photos-btn{
        bottom: 18px;
        right: 8px;
    }
    .new-room-box .room-image .overlay:first-child, .new-room-box .view-photos-btn{
        min-width: 90px;
        height: 25px;
        font-size: 11px;
    }
}   
@media (min-width:992px) and (max-width:1199px){
    .section-main-title .cms-title :first-child{
       font-size: 28px;
        line-height: 35px;
    }   
}
</style>
