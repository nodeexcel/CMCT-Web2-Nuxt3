"use strict";(self.webpackChunknuxt_app=self.webpackChunknuxt_app||[]).push([[481],{8481:(Fe,E,g)=>{g.r(E),g.d(E,{default:()=>je});var e=g(1505),z=g(835);const B=(0,e.aZ)({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(d,{slots:s,attrs:o}){const v=(0,z.iH)(!1);return(0,e.bv)(()=>{v.value=!0}),t=>{if(v.value)return s.default?.();const m=s.fallback||s.placeholder;if(m)return m();const f=t.fallback||t.placeholder||"",a=t.fallbackTag||t.placeholderTag||"span";return(0,e.iD)(a,o,f)}}}),N=new WeakMap;/*! @__NO_SIDE_EFFECTS__ */function He(d){if(N.has(d))return N.get(d);const s={...d};return s.render?s.render=(o,...v)=>{if(o.mounted$){const t=d.render?.bind(o)(o,...v);return t.children===null||typeof t.children=="string"?createElementVNode(t.type,t.props,t.children,t.patchFlag,t.dynamicProps,t.shapeFlag):h(t)}else return h("div",mergeProps(o.$attrs??o._.attrs,{key:"placeholder-key"}))}:s.template&&(s.template=`
      <template v-if="mounted$">${d.template}</template>
      <template v-else><div></div></template>
    `),s.setup=(o,v)=>{const t=ref(!1);return onMounted(()=>{t.value=!0}),Promise.resolve(d.setup?.(o,v)||{}).then(m=>typeof m!="function"?{...m,mounted$:t}:(...f)=>{if(t.value){const a=m(...f);return a.children===null||typeof a.children=="string"?createElementVNode(a.type,a.props,a.children,a.patchFlag,a.dynamicProps,a.shapeFlag):h(a)}else return h("div",mergeProps(v.attrs,{key:"placeholder-key"}))})},N.set(d,s),s}var j=g(7290),b=g(8159),x=g(202),F=g(182),H=g.n(F);const I=d=>((0,e.dD)("data-v-2c89395c"),d=d(),(0,e.Cn)(),d),V={key:0,class:"home-detail overflow-hidden"},R={class:"home-detail-slider slider-cms"},M={class:"container-background-wrapper"},Y={class:"container-background-sub-wrapper"},K={key:0,class:"loader"},W={class:"position-relative find-home-carousel-with-tabs"},Q={key:0,class:"slider-img"},G=["alt","src"],J=["alt","src"],U=["alt","src"],Z=["src"],q={class:"findhome-card-tabs mt-3 mt-md-0"},X={key:0},ee=["alt","src"],ie=["alt","src"],te=["alt","src"],se={class:"inner-content-wrapper mb-0 mb-xl-5 pb-xl-5"},oe={class:"cms-main-wrap"},re={class:"row"},le={class:"col-md-9"},ae={class:"home-detail-slider-content"},ne={class:"nb-main mt-3 row"},ce={class:"col-md-12 mb-1 mb-xl-3"},he={class:"city-text"},de={class:"col-sm-6"},me={class:"home-detail-title"},ue={class:"mb-2 mb-xl-4"},_e={class:"col-sm-6 mb-3 mb-sm-0 text-sm-right"},pe={class:"row justify-content-start justify-content-md-end"},ge={key:0,class:"icons-details col-4"},ye={class:"icon-1 icon"},ve=I(()=>(0,e._)("div",{class:"icon-wrap"},null,-1)),be={class:"desc d-flex align-items-center justify-content-center mb-2"},fe={class:"row justify-content-start justify-content-md-end"},De={key:0,class:"icons-details col-4"},ke={class:"icon-1 icon"},we=I(()=>(0,e._)("div",{class:"icon-wrap"},null,-1)),Ae={class:"desc d-flex align-items-center justify-content-center"},Se={class:"col-2 pl-0"},Pe={key:0,class:"student-logo"},Ne=[I(()=>(0,e._)("img",{src:H(),alt:"student_logo"},null,-1))],Ie={class:"home-detail-address mb-3 mb-xl-5"},Ce={class:"build-desc"},Ee=["innerHTML"],xe={key:0,class:"whole-apartment-price"},Te={class:"col-md-3 side-form-wrapper"};function Le(d,s,o,v,t,m){const f=(0,e.up)("slide"),a=(0,e.up)("carousel"),p=(0,e.up)("location-slice"),D=(0,e.up)("b-tab"),k=(0,e.up)("b-tabs"),r=(0,e.up)("b-card"),i=B,n=j.Z,u=(0,e.Q2)("lazy-load");return JSON.stringify(m.css)!={}||JSON.stringify(m.css)!=null||JSON.stringify(m.css)!=""?((0,e.wg)(),(0,e.iD)("section",V,[(0,e._)("div",R,[(0,e._)("div",M,[(0,e._)("div",Y,[d.$fetchState.pending?((0,e.wg)(),(0,e.iD)("div",K)):(0,e.kq)("",!0),(0,e.Wm)(i,null,{default:(0,e.w5)(()=>[(0,e._)("div",W,[t.homeDetails.hero_banner&&t.homeDetails.hero_banner.toLowerCase()==="slider"?(0,e.wy)(((0,e.wg)(),(0,e.j4)(a,{key:0,class:"find-home-carousel",autoplay:!0,loop:!0,perPage:1,navigationEnabled:!0,paginationEnabled:!0,speed:2e3,navigationNextLabel:"<i class='fa angle-right cust-icon'></i>",navigationPrevLabel:"<i class='fa angle-left cust-icon'></i>",paginationActiveColor:"#72bf44",autoplayTimeout:3e3,spacePadding:0,margin:10},{default:(0,e.w5)(()=>[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(t.homeDetails.picturesArray,(l,w)=>((0,e.wg)(),(0,e.j4)(f,{key:w,style:(0,b.j5)({height:JSON.stringify(m.css)-174+"px"})},{default:(0,e.w5)(()=>[l?((0,e.wg)(),(0,e.iD)("picture",Q,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(l.versions,(y,A)=>((0,e.wg)(),(0,e.iD)(e.HY,{key:A},[y.versionsName=="phone"&&t.screenSize<=750?((0,e.wg)(),(0,e.iD)("img",{key:0,alt:l.description,src:y.link,media:"(max-width: 750px)"},null,8,G)):y.versionsName=="tablet"&&t.screenSize>750&&t.screenSize<=991?((0,e.wg)(),(0,e.iD)("img",{key:1,alt:l.description,src:y.link,media:"(max-width: 991px)"},null,8,J)):y.versionsName=="desk"&&t.screenSize>991?((0,e.wg)(),(0,e.iD)("img",{key:2,alt:l.description,src:y.link},null,8,U)):(0,e.kq)("",!0)],64))),128))])):(0,e.kq)("",!0)]),_:2},1032,["style"]))),128))]),_:1},512)),[[x.F8,t.activeTab==1]]):(0,e.kq)("",!0),(0,e.wy)((0,e._)("div",{class:"video-section",style:(0,b.j5)({height:JSON.stringify(m.css)-174+"px"})},[t.activeTab==2&&t.homeDetails.threeD_tour&&t.homeDetails["3DtourLink"]!=null?(0,e.wy)(((0,e.wg)(),(0,e.iD)("iframe",{key:0,"data-not-lazy":"",width:"100%",allowfullscreen:"",src:t.embedSlice.embed_url,frameborder:"0"},null,8,Z)),[[u]]):(0,e.kq)("",!0)],4),[[x.F8,t.activeTab==2]]),t.activeTab==3&&t.mapSlice!=null?((0,e.wg)(),(0,e.j4)(p,{key:1,slice:t.mapSlice,class:"location-section",style:(0,b.j5)({height:JSON.stringify(m.css)-174+"px"})},null,8,["slice","style"])):(0,e.kq)("",!0),(0,e._)("div",q,[(0,e.Wm)(r,{"no-body":""},{default:(0,e.w5)(()=>[(0,e.Wm)(k,{card:""},{default:(0,e.w5)(()=>[(0,e.Wm)(D,{onClick:s[0]||(s[0]=l=>t.activeTab=1),title:"Photos",active:""}),t.homeDetails.threeD_tour&&t.homeDetails["3DtourLink"]!=null?((0,e.wg)(),(0,e.j4)(D,{key:0,onClick:s[1]||(s[1]=l=>t.activeTab=2),title:"Virtual Tour",id:"ViewVirtualTour"})):(0,e.kq)("",!0),(0,e.Wm)(D,{onClick:s[2]||(s[2]=l=>t.activeTab=3),title:"Location",id:"ViewLocation"})]),_:1})]),_:1})])]),t.homeDetails.hero_banner&&t.homeDetails.hero_banner.toLowerCase()!="slider"?((0,e.wg)(),(0,e.iD)("div",X,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(t.homeDetails.picturesArray[0].versions,(l,w)=>((0,e.wg)(),(0,e.iD)(e.HY,{key:w},[l.versionsName=="phone"&&t.screenSize<=750?((0,e.wg)(),(0,e.iD)("img",{key:0,alt:l.description,src:l.link,media:"(max-width: 750px)"},null,8,ee)):l.versionsName=="tablet"&&t.screenSize>750&&t.screenSize<=991?((0,e.wg)(),(0,e.iD)("img",{key:1,alt:l.description,src:l.link,media:"(max-width: 991px)"},null,8,ie)):l.versionsName=="desk"&&t.screenSize>991?((0,e.wg)(),(0,e.iD)("img",{key:2,alt:l.description,src:l.link},null,8,te)):(0,e.kq)("",!0)],64))),128))])):(0,e.kq)("",!0)]),_:1}),(0,e._)("div",se,[(0,e._)("div",oe,[(0,e._)("div",re,[(0,e._)("div",le,[(0,e._)("div",ae,[(0,e._)("div",ne,[(0,e._)("div",ce,[(0,e._)("div",he,(0,b.zw)(t.homeDetails.cityName)+", "+(0,b.zw)(t.homeDetails.neighbourhoodName),1)]),(0,e._)("div",de,[(0,e._)("div",me,[(0,e._)("h1",ue,(0,b.zw)(t.homeDetails.name),1)])]),(0,e._)("div",_e,[(0,e._)("div",pe,[t.homeDetails.totalBedrooms!=null?((0,e.wg)(),(0,e.iD)("div",ge,[(0,e._)("div",ye,[ve,(0,e._)("div",be,[(0,e._)("p",null,(0,b.zw)(t.homeDetails.totalBedrooms)+" bedrooms",1)])])])):(0,e.kq)("",!0)]),(0,e._)("div",fe,[t.homeDetails.totalBathrooms!=null?((0,e.wg)(),(0,e.iD)("div",De,[(0,e._)("div",ke,[we,(0,e._)("div",Ae,[(0,e._)("p",null,(0,b.zw)(t.homeDetails.totalBathrooms)+" bathrooms",1)])])])):(0,e.kq)("",!0)])])]),(0,e._)("div",Se,[t.homeDetails.forStudents==1?((0,e.wg)(),(0,e.iD)("div",Pe,Ne)):(0,e.kq)("",!0)]),(0,e._)("div",Ie,(0,b.zw)(t.homeDetails.address),1),(0,e._)("div",Ce,[(0,e._)("p",{innerHTML:t.homeDetails.description,class:"homeDetailsDescription"},null,8,Ee)]),t.homeDetails.listingType=="whole apartment"?((0,e.wg)(),(0,e.iD)("p",xe,(0,b.zw)("Starting at "+t.homeDetails.priceCurrency+" "+Number(t.homeDetails.startingPrice).toLocaleString()+" "+t.homeDetails.priceUnit),1)):(0,e.kq)("",!0)])]),(0,e._)("div",Te,[(0,e.Wm)(n,{slices:t.sideFormSlice,"is-home-detail":!0,"page-id":"findahome"},null,8,["slices"])])])])])])])]),(0,e.Wm)(n,{slices:t.slices,"is-home-detail":!0,"page-id":"findahome"},null,8,["slices"])])):(0,e.kq)("",!0)}var T=g(9871),Oe=g(9549),C=g.n(Oe);const ze={name:"home-details",layout:"homepage",data(){return{activeTab:1,cssHeight:"",homeDetails:{},homeLists:[],screenSize:"",slices:null,sideFormSlice:null,adjustFormSlice:null,params:"",threeD_tour:!1,hero_banner:"Slider",amenities_background_color:"",housemates:!1,map:!1,room_image:"",rooms_background_color:"",similar_homes:!1,mapSlice:{},embedSlice:{},slices:null,homeDetails:null,anyRoomAvailable:null,mapSlice:[],meta_title:null,meta_description:"",meta_image:null,meta_site_name:null,meta_url:null,structuredData:{},roomStructureData:{},roomStructureData1:{},banner:{}}},computed:{css(){return this.cssHeight=window.innerHeight,window.innerHeight}},async mounted(){let d=(0,T.BE)();await this.$fetch(),$(".find-home-carousel-with-tabs iframe").removeAttr("v-lazy-load");var s=$(".find-home-carousel-with-tabs iframe").attr("data-src");$(".find-home-carousel-with-tabs iframe").removeAttr("data-src"),$(".find-home-carousel-with-tabs iframe").attr("src",s)},created(){window.addEventListener("resize",this.handleResize),this.params=this.$route.params,this.handleResize()},methods:{handleResize(){this.screenSize=screen.width}},head(){return{title:"Coliving Home Details for "+this.homeDetails.name+" in "+this.homeDetails.cityName+"-"+this.homeDetails.neighbourhoodName,htmlAttrs:{lang:"en"},link:[{rel:"canonical",href:this.meta_url},{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}],script:[{src:`https://maps.googleapis.com/maps/api/js?key=${envVars.public.env.GOOGLE_MAP_KEY}&map_ids=4df64ef1b112569a`},{type:"application/ld+json",json:this.structuredData},{type:"application/ld+json",json:this.roomStructureData}],meta:[{hid:"author",name:"author",content:"CasaMiaCasaTua"},{hid:"description",name:"description",content:this.meta_description},{hid:"ogtitle",property:"og:title",content:this.meta_title},{hid:"ogdescription",property:"og:description",content:this.meta_description},{hid:"ogimage",property:"og:image",content:this.meta_image},{hid:"ogurl",property:"og:url",content:this.meta_url},{hid:"ogtype",property:"og:type",content:"Website"},{hid:"ogsite_name",property:"og:site_name",content:this.meta_site_name},{hid:"twittertitle",name:"twitter:title",content:this.meta_title},{hid:"twitterdescription",name:"twitter:description",content:this.meta_description},{hid:"twitter:card",name:"twitter:card",content:"summary"},{hid:"twitterimage",name:"twitter:image",content:this.meta_image}]}},async mounted(){const d=this.$route.params;let s=(0,T.BE)();try{var o=(await C().post(s.public.env.MODE==="prod"?s.public.env.PROD_END_POINT:s.public.env.DEV_END_POINT,{homeId:d.uid,neighborhoodId:"",cityId:""},{headers:{Authorization:s.public.env.MODE==="prod"?"Bearer "+s.public.env.PROD_COLIV_HQ_KEY:"Bearer "+s.public.env.DEV_COLIV_HQ_KEY}})).data.data[0],v="";o.picturesArray!=null&&o.picturesArray.length>0&&o.picturesArray[0].versions.forEach(function(i){i.versionsName=="desk"&&(v=i.link)});let p=[];o.amenitiesArray=o.amenitiesArray.sort((i,n)=>i.name>n.name?1:n.name>i.name?-1:0),o.amenitiesArray.forEach(function(i){p.push({"@type":"http://schema.org/LocationFeatureSpecification",name:i.name,value:"true"})});let D=[],k=[],r=!1;o.roomsArray!=null&&o.roomsArray.forEach(function(i){i.availability=="Available"&&(r=!0),D.push({"@type":"Room",accommodationCategory:"Room",description:i.description,name:i.roomName,image:i.roomPicturesArray.length>0?i.roomPicturesArray[0].link:""});let n=[];i.roomPicturesArray.forEach(function(u){n.push(u.link)}),k.push({"@type":"Product",name:i.roomName+" at "+o.name,image:n,description:i.description,sku:d.uid,review:5,isbn:i.roomId,aggregateRating:5,brand:{"@type":"Brand",name:"Casa Mia Coliving"},offers:{"@type":"AggregateOffer",offerCount:"5",lowPrice:i.startingPrice,highPrice:i.startingPrice,priceCurrency:i.priceCurrency}})}),await this.$prismic.client.getSingle("homes").then(i=>{var n=i.data;console.log("document",n.hero_banner,o),o.threeD_tour=n["3d_tours"],o.hero_banner=n.hero_banner,o.amenities_background_color=n.amenities_background_color,o.side_form_background_color=n.amenities_background_color,o.housemates=n.housemates,o.map=n.map,this.slices=n.body,this.homeDetails=o,this.anyRoomAvailable=r,this.mapSlice=[],this.meta_title=o.name,this.meta_description=o.description&&o.description!=null?o.description.length>170?o.description.substring(0,167)+"...":o.description:"",this.meta_image=v,this.meta_site_name=s.public.env.COMPANY_NAME,this.meta_url=s.public.env.baseUrl+"/findahome/"+d.uid,this.structuredData={"@context":"http://schema.org/","@type":"Apartment",accommodationCategory:"Apartment",address:o.address+" "+o.postalCode+" "+o.cityName,description:o.description,image:v,name:o.name,numberOfRooms:o.totalBedrooms,url:s.public.env.baseUrl+"/findahome/"+d.uid,geo:{"@type":"GeoCoordinates",latitude:o.mapLocation._latitude,longitude:o.mapLocation._longitude},amenityFeature:p},this.roomStructureData={"@context":"http://schema.org/","@graph":D},this.roomStructureData1={"@context":"http://schema.org/","@graph":k},this.banner={hero_image:n.hero_image,title:n.page_title,tagline:n.page_description}}).catch(i=>{console.error(i)})}catch(a){console.log("Error",a)}const t=await C().post(s.public.env.MODE==="prod"?s.public.env.PROD_END_POINT:s.public.env.DEV_END_POINT,{neighborhoodId:this.homeDetails.neighborhoodId,cityId:this.homeDetails.cityId,operatorId:this.homeDetails.operatorId},{headers:{Authorization:s.public.env.MODE==="prod"?"Bearer "+s.public.env.PROD_COLIV_HQ_KEY:"Bearer "+s.public.env.DEV_COLIV_HQ_KEY}});var m=this;if(m.homeDetails.picturesArray.filter(function(a,p){var D=[];Object.keys(a).map(function(k){k.includes("versions")&&(m.homeDetails.picturesArray[p].versions=a[k].sort((r,i)=>r.versionsName<i.versionsName?1:-1))})}),this.$store.commit("setSideFormTop",{name:this.homeDetails.name,image:"",description:"",price:this.homeDetails.listingType=="whole apartment"?"Starting at "+this.homeDetails.priceCurrency+" "+Number(this.homeDetails.startingPrice).toLocaleString()+" "+this.homeDetails.priceUnit:""}),this.homeDetails.similar_homes){let a=[],p=[],D=this.$route.params.uid,k=[];p.push(D),t.data.data.length>0&&(t.data.data.forEach(function(r,i){if(r.homeId!=null&&r.homeId!=D){p.push(r.homeId);let u=[],l=!1,w=0,y="",A=0,S=[];r.rooms!=null&&r.rooms.length>0&&(r.rooms.forEach(function(c,P){(c.availability=="Available"||c.availability=="At least a room available"||c.availability=="Available soon")&&(w++,c.startingPrice!=null&&u.push({startingPrice:c.startingPrice,priceCurrency:c.priceCurrency,promoPrice:!1}),c.priceScales!=null&&c.priceScales.length>0&&c.priceScales.forEach(function(_){_.priceType=="Promo"&&(l=!0,u.push({startingPrice:_.priceAmount,priceCurrency:c.priceCurrency,promoPrice:!0}))}))}),u.sort((c,P)=>c.startingPrice>P.startingPrice?1:-1),u.length>0&&(u=u.slice(0,1),A=u[0].startingPrice,y=u[0].priceCurrency),S=[...new Set(r.rooms.map(c=>c.type))]);var n={url:"",altText:""};r.picture!=null&&r.picture.versions.length>0&&(n.altText=r.picture.description,r.picture.versions.forEach(function(c){c.versionsName=="card"&&(n.url=c.link)})),r.listingType!=null&&r.listingType!=""&&S.push(r.listingType),a.push({homeID:r.homeId,banner:n,cityName:r.cityName,name:r.name,neighborhoodName:r.neighbourhoodName,address:r.address,description:r.description!=null&&r.description.length>100?r.description.substring(0,100)+"...":r.description,startingPrice:A,priceCurrency:y,availability:r.availability,roomType:S,totalBedrooms:r.totalBedrooms,isPromo:l,availableRoomCount:w,forStudents:r.forStudents})}}),a.length<4&&((await C().post(s.public.env.MODE==="prod"?s.public.env.PROD_END_POINT:s.public.env.DEV_END_POINT,{neighborhoodId:"",cityId:this.homeDetails.cityId,operatorId:this.homeDetails.operatorId},{headers:{Authorization:s.public.env.MODE==="prod"?"Bearer "+s.public.env.PROD_COLIV_HQ_KEY:"Bearer "+s.public.env.DEV_COLIV_HQ_KEY}})).data.data.forEach(function(i,n){if(i.homeId!=null&&!p.includes(i.homeId)){p.push(i.homeId);let l=[],w=!1,y=0,A=[],S="",c=0;if(i.rooms!=null){i.rooms.forEach(function(_,L){(_.availability=="Available"||_.availability=="At least a room available"||_.availability=="Available soon")&&(y++,_.startingPrice!=null&&l.push({startingPrice:_.startingPrice,priceCurrency:_.priceCurrency,promoPrice:!1}),_.priceScales!=null&&_.priceScales.length>0&&_.priceScales.forEach(function(O){O.priceType=="Promo"&&(w=!0,l.push({startingPrice:O.priceAmount,priceCurrency:_.priceCurrency,promoPrice:!0}))}))}),l.sort((_,L)=>_.startingPrice>L.startingPrice?1:-1),l.length>0&&(l=l.slice(0,1),c=l[0].startingPrice,S=l[0].priceCurrency);let P=[...new Set(i.rooms.map(_=>_.type))]}var u={url:"",altText:""};i.picture!=null&&i.picture.versions.length>0&&(u.altText=i.picture.description,i.picture.versions.forEach(function(P){P.versionsName=="card"&&(u.url=P.link)})),i.listingType!=null&&i.listingType!=""&&A.push(i.listingType),i.availability=="Available"||i.availability=="Available soon"||i.availability=="At least a room available"?a.push({homeID:i.homeId,banner:u,cityName:i.cityName,name:i.name,neighborhoodName:i.neighbourhoodName,address:i.address,description:i.description!=null&&i.description.length>100?i.description.substring(0,100)+"...":i.description,startingPrice:c,priceCurrency:S,availability:i.availability,roomType:A,totalBedrooms:i.totalBedrooms,isPromo:w,availableRoomCount:y,forStudents:i.forStudents}):k.push({homeID:i.homeId,banner:u,cityName:i.cityName,name:i.name,neighborhoodName:i.neighbourhoodName,address:i.address,description:i.description!=null&&i.description.length>100?i.description.substring(0,100)+"...":i.description,startingPrice:c,priceCurrency:S,availability:i.availability,roomType:A,totalBedrooms:i.totalBedrooms,isPromo:w,availableRoomCount:y,forStudents:i.forStudents})}}),a=a.concat(k))),this.homeLists=a}if(this.homeLists!=null&&this.homeLists.length>0&&(this.slices=[{slice_type:"similar_cards",slice_devider:!0,items:this.homeLists,primary:{title:[{spans:[],text:"Similar homes",type:"heading2"}],slice_section:"similar_cards",background_color:"rgb(245, 245, 245)"}},...this.slices]),this.sideFormSlice=[{slice_type:"form",slice_label:"homedetails",homeID:this.$route.params.uid,OperatorID:this.homeDetails.operatorId,neighborhoodId:this.homeDetails.neighborhoodId,buildingId:this.homeDetails.buildingId,homeName:this.homeDetails.name,cityName:this.homeDetails.cityName,cityID:this.homeDetails.cityId,linkSchedule:this.homeDetails.linkSchedule,threeDtourLink:this.homeDetails["3DtourLink"],isThreeDtour:this.homeDetails.threeD_tour,sideFormBackgroundColor:this.homeDetails.side_form_background_color,anyRoomAvailable:this.anyRoomAvailable,items:this.homeDetails.roomsArray,room_image:this.homeDetails.room_image,isBottomShow:!1}],this.slices=[{slice_type:"form",slice_label:"adjustForm",homeID:this.$route.params.uid,OperatorID:this.homeDetails.operatorId,neighborhoodId:this.homeDetails.neighborhoodId,buildingId:this.homeDetails.buildingId,homeName:this.homeDetails.name,cityName:this.homeDetails.cityName,cityID:this.homeDetails.cityId,linkSchedule:this.homeDetails.linkSchedule,threeDtourLink:this.homeDetails["3DtourLink"],isThreeDtour:this.homeDetails.threeD_tour,sideFormBackgroundColor:this.homeDetails.side_form_background_color,anyRoomAvailable:this.anyRoomAvailable,items:this.homeDetails.roomsArray,room_image:this.homeDetails.room_image},...this.slices],this.slices=[{slice_type:"spacer",slice_label:null,items:[],primary:{pixels:50}},...this.slices],m.homeDetails.map&&(this.mapSlice={primary:{home:{latitude:this.homeDetails.mapLocation._latitude,longitude:this.homeDetails.mapLocation._longitude},marker:{url:"/mapMarker.png"},map_title:[{spans:[],text:"Location",type:"heading2"}]},slice_type:"map",slice_devider:!0,slice_label:null,items:[]}),this.slices=[{slice_type:"spacer",slice_label:null,items:[],primary:{pixels:50}},...this.slices],this.homeDetails.threeD_tour&&this.homeDetails["3DtourLink"]!=null&&(this.embedSlice={embed_url:this.homeDetails["3DtourLink"],height:480,html:'<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m='+this.homeDetails["3DtourLink"].split("?m=").pop()+'" ></iframe>'},this.slices=[{slice_type:"embed_section",slice_devider:!0,slice_label:null,items:[],primary:{embed:{embed_url:this.homeDetails["3DtourLink"],height:480,html:'<iframe data-not-lazy width="100%" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m='+this.homeDetails["3DtourLink"].split("?m=").pop()+'" ></iframe>',width:640},embed_html:[],title:[{spans:[],text:"Virtual Tour",type:"heading2"}]}},...this.slices]),this.slices=[{slice_type:"spacer",slice_label:null,items:[],primary:{pixels:50}},...this.slices],this.homeDetails.idealAge!=null){var f=[];this.homeDetails.idealFor!=null&&(f.idealFor=this.homeDetails.idealFor),this.homeDetails.idealAge!=null&&(f.idealAge=this.homeDetails.idealAge),this.homeDetails.idealGender!=null&&(f.idealGender=this.homeDetails.idealGender),this.slices=[{isBuildingPage:"Yes",slice_type:"image_gallery",slice_label:"avatars_idealfor",slice_devider:!0,idealFor:f,primary:{background_color:null,gallery_title:[{spans:[],text:"Ideal For",type:"heading3"}],align:"left"}},...this.slices]}this.homeDetails.housemates&&this.homeDetails.housematesArray!=null&&this.homeDetails.housematesArray.length>0&&(this.slices=[{isBuildingPage:"Yes",slice_type:"image_gallery",slice_label:"avatars",slice_devider:!0,items:this.homeDetails.housematesArray,primary:{background_color:null,gallery_title:[{spans:[],text:"Housemates",type:"heading2"}],align:"left"}},...this.slices]),this.slices=[{slice_type:"spacer",slice_label:null,items:[],primary:{pixels:50}},...this.slices],this.homeDetails.amenitiesArray!=null&&this.homeDetails.amenitiesArray.length>0&&(this.slices=[{slice_type:"image_gallery",slice_label:"icons",slice_devider:!0,background_color:this.homeDetails.amenities_background_color,items:this.homeDetails.amenitiesArray,primary:{gallery_title:[{spans:[],text:"Amenities",type:"heading2"}],align:"left"}},...this.slices]),this.slices=[{slice_type:"spacer",slice_label:null,items:[],primary:{pixels:50}},...this.slices],this.homeDetails.roomsArray!=null&&this.homeDetails.roomsArray.length>0&&(this.slices=[{primary:{title:[{spans:[],text:"Select Your Room",type:"heading2"}]},slice_type:"rooms",ishomeDetailPage:!0,slice_devider:!0,room_image:this.homeDetails.room_image,background:this.homeDetails.rooms_background_color,slice_label:null,housemates:this.homeDetails.housematesArray,items:this.homeDetails.roomsArray.sort((a,p)=>parseFloat(a.startingPrice)==parseFloat(p.startingPrice)||parseFloat(a.startingPrice)<parseFloat(p.startingPrice)?1:-1)},...this.slices])},fetchOnServer:!1};var Be=g(6058);const je=(0,Be.Z)(ze,[["render",Le],["__scopeId","data-v-2c89395c"]])}}]);
