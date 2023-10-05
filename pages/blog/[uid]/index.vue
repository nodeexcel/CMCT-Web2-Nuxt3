<template>
	<section class="blog">
	  <div class="container-background-wrapper">
		  {{ slices }}
	  </div>
	  <slices-block :slices="slices"/>
	</section>
</template>

<script>
// Imports for Prismic Slice components
// const SlicesBlock = () => import('@/components/SlicesBlock.vue');
const anotherHtmlSerializer = function (type, element, content, children) {} // Keep this line for link https://prnt.sc/v9tq4e
// import moment from 'moment'
export default {
  name: 'blog-page',
  layout: 'homepage',
//   components: {
// 	  SlicesBlock
//   },
  data() {
	  return {
		  socialShareStickyHeight: 0,
		  author: null,
		  anotherHtmlSerializer,
		  pageId:null,
		  document: null,
			  banner: {},

			  // topics
			  topics_array: [],

			  // author
			  author: null,
			  // Set slices as variable
			  slices: null,
			  toc: null,
			  //Blog
			  author_image: null,
			  autor: null,
			  publish_date: null,
			  modified_date: null,
			  topics: null,
			  summary: null,
			  blog_article: null,
			  blog_body: null,
			  table_of_content: null,

			  //SEO
			  meta_title: '',
			  meta_description:null,
			  meta_keywords: null,
			  meta_image:null,
			  meta_site_name: null,
			  meta_url: null,
			  structuredData:null
	  }
  },
  computed: {
	  // a computed getter
	  isAuthor: function () {
		  // `this` points to the vm instance
		  if(Array.isArray(this.author) && this.author.length > 0) {
			  return true
		  } else if(Object.keys(this.author).length > 0) {
			  return true
		  } 
		  return false
	  }
  },
//   mounted () {
// 	  let headingArray = document.getElementsByTagName('h2')
// 	  let headingThreeArray = document.getElementsByTagName('h3')
// 	  if (headingArray && headingArray.length) {
// 		  for (let index = 0; index < headingArray.length; index++) {
// 			  let str = headingArray[index].textContent.split(" ").join("")
// 			  headingArray[index].setAttribute("id", str);
// 		  }
// 	  }
// 	  if (headingThreeArray && headingThreeArray.length) {
// 		  for (let index = 0; index < headingThreeArray.length; index++) {
// 			  let str = headingThreeArray[index].textContent.split(" ").join("")
// 			  headingThreeArray[index].setAttribute("id", str);
// 		  }
// 	  }

//   },
  /* computed:{
	  toc () {
		  let tocArray = []
		  let tempArray = []
		  this.document.blog_body.forEach((content, index) => {
			  if (content.type == 'heading2') {
				  tocArray.push(content)
			  }
			  if (content.type == 'heading3') {
				  if(!tempArray.includes(content.text)) {
					  if ('heading3' in tocArray[tocArray.length - 1]) {
						  tocArray[tocArray.length - 1]['heading3'].push(content)
					  } else {
						  console.log('contentELSE', content.text)
						  tocArray[tocArray.length - 1]['heading3'] = []
						  tocArray[tocArray.length - 1]['heading3'].push(content)
					  }
					  tempArray.push(content.text)
				  }
				  console.log('tempArray', tempArray)
			  }
		  })
		  return tocArray
	  }
  }, */
  head () {
	  return {
		  title: 'Casa Mia Coliving Blog Post'+"-"+this.meta_title,
		  htmlAttrs: {
			  lang: 'en'
		  },
		  link: [
			  { rel: 'canonical', href: this.meta_url },
		  ],
		  meta: [
			  { hid: 'author', name: 'author', content: this.meta_author },
			  { hid: 'description', name: 'description', content: this.meta_description },
			  { hid: 'keywords', name: 'keywords', content: this.meta_keywords },
			  {
				  hid: 'ogtitle',
				  property: 'og:title',
				  content: this.meta_title
			  },
			  {
				  hid: 'ogdescription',
				  property: 'og:description',
				  content: this.meta_description
			  },
			  {
				  hid: 'ogimage',
				  property: 'og:image',
				  content: this.meta_image
			  },
			  {
				  hid: 'ogurl',
				  property: 'og:url',
				  content: this.meta_url
			  },
			  {
				  hid: 'ogtype',
				  property: 'og:type',
				  content: 'Website'
			  },
			  {
				  hid: 'ogsite_name',
				  property: 'og:site_name',
				  content: this.meta_site_name
			  },
			  {
				  hid: 'twittertitle',
				  name: 'twitter:title',
				  content: this.meta_title
			  },
			  {
				  hid: 'twitterdescription',
				  name: 'twitter:description',
				  content: this.meta_description
			  },
			  {
				  hid: 'twitter:card',
				  name: 'twitter:card',
				  content: 'summary'
			  },
			  {
				  hid: 'twitterimage',
				  name: 'twitter:image',
				  content: this.meta_image
			  },
		  ],
		  script: [{ type: 'application/ld+json', json: this.structuredData }]
	  }
  },
 async mounted(){
	// try{
		  let author = {}
		  let topicArray = []
	  // Query to get post content
	      console.log("document", this.$route.params.uid)
		  const Document = await this.$prismic.client.getByUID('blogpage', this.$route.params.uid)
		  
		  let document = Document.data
		  console.log("document",document)
		  if (document.author.id) {
			console.log("document",document)
			//   author = (await store.dispatch('fetchAuthor', document.author.id))
		  }
		//   let topic = (await store.dispatch('fetchAuthor', 'topics')).results

		  // topic array
		//   if (document.topics1 && document.topics1.length) {
		// 	  for(let i = 0; i < 3; i++) {
		// 		  if (document.topics1[i] && document.topics1[i].topic && document.topics1[i].topic.id) {
		// 			  let topic = await $prismic.api.query($prismic.predicates.at('document.id', document.topics1[i].topic.id))
					  
		// 			  topicArray.push(topic.results[0])
		// 		  }
		// 	  }
		//   }

		//   let logo = (await this.$prismic.client.getSingle('menu'))
		//   console.log("logo",logo)
		//   const selSlice = document.body.filter(function(slice) {                
		// 	  if(slice.slice_type == 'blog_cards') {
		// 		  Object.assign(slice, { current_blog: params.uid })
		// 	  }
		// 	  return slice;
		//   });

		//   const header_logo_url = store.state.headerLogo ? store.state.headerLogo.url : ''

		  const slices = document.body.filter(function(slice) {                
			  if(slice.slice_type == 'blog_cards') {
				  Object.assign(slice, {page_type:'blog_details'});
			  }
			  return slice;
		  });
		  let pdate = document.publish_date;
		  if(document.publish_date != null) {
			  pdate = new Date(document.publish_date);
			  pdate = pdate.toISOString()
		  }
		  let mdate = document.modified_date;
		  if(document.modified_date != null) {
			  mdate = new Date(document.modified_date);
			  mdate = mdate.toISOString()
		  }
		  
		  let tocArray = []
		  document.blog_body.forEach((content, index) => {
			  if (content.type == 'heading2') {
				  tocArray.push(content)
			  }
			  if (content.type == 'heading3') {
				  if (tocArray.length > 0 && 'heading3' in tocArray[tocArray.length - 1]) {
					  tocArray[tocArray.length - 1]['heading3'].push(content)
				  } else {
					  tocArray.push(content)
				  }
			  }
		  })
		  let toc = tocArray;

		//   return {
			  // Page content
			  this.pageId= this.$route.params.uid;
			  this.document= document;
			  this.banner= {
				  hero_image: document.hero_image,
				  title: document.page_title
			  };

			  // topics
			  this.topics_array= topicArray;

			  // author
			  this.author= (Object.keys(author).length) ? author.results[0] : [];
			  // Set slices as variable
			  this.slices= slices;
			  this.toc = toc;
			  //Blog
			  this.author_image= document.author_image;
			  this.autor= document.autor;
			  this.publish_date= document.publish_date;
			  this.modified_date= document.modified_date;
			  this.topics= document.topics;
			  this.summary= document.summary;
			  this.blog_article= document.blog_article;
			  this.blog_body= document.blog_body;
			  this.table_of_content= document.table_of_content;

			  //SEO
			  this.meta_title= (document.page_title.length) ? document.page_title[0].text : '';
			  this.meta_description= (document.summary[0].text != null &&  document.summary[0].text.length > 170) ?  document.summary[0].text.substring(0, 167) + '...' :  document.summary[0].text;
			  this.meta_keywords= document.seo_keywords;
			  this.meta_image= (document.meta_image.url) ? document.meta_image.url : '';
			  this.meta_site_name= process.env.COMPANY_NAME;
			  this.meta_url= process.env.baseUrl+'/blog/'+params.uid;

			  
			  this.structuredData= {
				  "@context": "https://schema.org",
				  "@type": "NewsArticle",
				  "mainEntityOfPage":{
					  "@type":"WebPage",
					  "@id": process.env.baseUrl+'/blog/'+params.uid,
				  },
				  "headline": (document.page_title.length) ? document.page_title[0].text : '',
				  "image": {
					  "@type": "ImageObject",
					  "url": (document.meta_image.url) ? document.meta_image.url : '',
					  "height": 1080,
					  "width": 1920
				  },
				  "datePublished": pdate,
				  "dateModified": mdate,
				  "author": {
					  "@type": "Person",
					  "name": (Object.keys(author).length) ? author.results[0].data.author : 'Casa Mia Coliving'
				  },
				  "publisher": {
					  "@type": "Organization",
					  "name": JSON.stringify(process.env.COMPANY_NAME),
					  "logo": {
						  "@type": "ImageObject",
						  "url": logo.url,
						  "width": 550,
						  "height": 60
					  }
				  }
			  }
		//   }
		let headingArray = document.getElementsByTagName('h2')
	    let headingThreeArray = document.getElementsByTagName('h3')
	  if (headingArray && headingArray.length) {
		  for (let index = 0; index < headingArray.length; index++) {
			  let str = headingArray[index].textContent.split(" ").join("")
			  headingArray[index].setAttribute("id", str);
		  }
	  }
	  if (headingThreeArray && headingThreeArray.length) {
		  for (let index = 0; index < headingThreeArray.length; index++) {
			  let str = headingThreeArray[index].textContent.split(" ").join("")
			  headingThreeArray[index].setAttribute("id", str);
		  }
	  }
		console.log(this.slices)
	  


  },
	async asyncData({  }) {
	//   try{
	// 	  let author = {}
	// 	  let topicArray = []
	//   // Query to get post content
	// 	  const document = (await this.$prismic.client.getByUID('blogpage', this.$route.params.uid)).data
	// 	  console.log("document",document, this.$route.params.uid)
	// 	  if (document.author.id) {
	// 		  author = (await store.dispatch('fetchAuthor', document.author.id))
	// 	  }
	// 	  let topic = (await store.dispatch('fetchAuthor', 'topics')).results

	// 	  // topic array
	// 	  if (document.topics1 && document.topics1.length) {
	// 		  for(let i = 0; i < 3; i++) {
	// 			  if (document.topics1[i] && document.topics1[i].topic && document.topics1[i].topic.id) {
	// 				  let topic = await $prismic.api.query($prismic.predicates.at('document.id', document.topics1[i].topic.id))
					  
	// 				  topicArray.push(topic.results[0])
	// 			  }
	// 		  }
	// 	  }

	// 	  let logo = (await $prismic.client.getSingle('menu')).data.logo
	// 	  const selSlice = document.body.filter(function(slice) {                
	// 		  if(slice.slice_type == 'blog_cards') {
	// 			  Object.assign(slice, { current_blog: params.uid })
	// 		  }
	// 		  return slice;
	// 	  });

	// 	  const header_logo_url = store.state.headerLogo ? store.state.headerLogo.url : ''

	// 	  const slices = document.body.filter(function(slice) {                
	// 		  if(slice.slice_type == 'blog_cards') {
	// 			  Object.assign(slice, {page_type:'blog_details'});
	// 		  }
	// 		  return slice;
	// 	  });
	// 	  let pdate = document.publish_date;
	// 	  if(document.publish_date != null) {
	// 		  pdate = new Date(document.publish_date);
	// 		  pdate = pdate.toISOString()
	// 	  }
	// 	  let mdate = document.modified_date;
	// 	  if(document.modified_date != null) {
	// 		  mdate = new Date(document.modified_date);
	// 		  mdate = mdate.toISOString()
	// 	  }
		  
	// 	  let tocArray = []
	// 	  document.blog_body.forEach((content, index) => {
	// 		  if (content.type == 'heading2') {
	// 			  tocArray.push(content)
	// 		  }
	// 		  if (content.type == 'heading3') {
	// 			  if (tocArray.length > 0 && 'heading3' in tocArray[tocArray.length - 1]) {
	// 				  tocArray[tocArray.length - 1]['heading3'].push(content)
	// 			  } else {
	// 				  tocArray.push(content)
	// 			  }
	// 		  }
	// 	  })
	// 	  let toc = tocArray;

	// 	  return {
	// 		  // Page content
	// 		  pageId: params.uid,
	// 		  document: document,
	// 		  banner: {
	// 			  hero_image: document.hero_image,
	// 			  title: document.page_title
	// 		  },

	// 		  // topics
	// 		  topics_array: topicArray,

	// 		  // author
	// 		  author: (Object.keys(author).length) ? author.results[0] : [],
	// 		  // Set slices as variable
	// 		  slices: slices,
	// 		  toc: toc,
	// 		  //Blog
	// 		  author_image: document.author_image,
	// 		  autor: document.autor,
	// 		  publish_date: document.publish_date,
	// 		  modified_date: document.modified_date,
	// 		  topics: document.topics,
	// 		  summary: document.summary,
	// 		  blog_article: document.blog_article,
	// 		  blog_body: document.blog_body,
	// 		  table_of_content: document.table_of_content,

	// 		  //SEO
	// 		  meta_title: (document.page_title.length) ? document.page_title[0].text : '',
	// 		  meta_description: (document.summary[0].text != null &&  document.summary[0].text.length > 170) ?  document.summary[0].text.substring(0, 167) + '...' :  document.summary[0].text,
	// 		  meta_keywords: document.seo_keywords,
	// 		  meta_image: (document.meta_image.url) ? document.meta_image.url : '',
	// 		  meta_site_name: process.env.COMPANY_NAME,
	// 		  meta_url: process.env.baseUrl+'/blog/'+params.uid,

			  
	// 		  structuredData: {
	// 			  "@context": "https://schema.org",
	// 			  "@type": "NewsArticle",
	// 			  "mainEntityOfPage":{
	// 				  "@type":"WebPage",
	// 				  "@id": process.env.baseUrl+'/blog/'+params.uid,
	// 			  },
	// 			  "headline": (document.page_title.length) ? document.page_title[0].text : '',
	// 			  "image": {
	// 				  "@type": "ImageObject",
	// 				  "url": (document.meta_image.url) ? document.meta_image.url : '',
	// 				  "height": 1080,
	// 				  "width": 1920
	// 			  },
	// 			  "datePublished": pdate,
	// 			  "dateModified": mdate,
	// 			  "author": {
	// 				  "@type": "Person",
	// 				  "name": (Object.keys(author).length) ? author.results[0].data.author : 'Casa Mia Coliving'
	// 			  },
	// 			  "publisher": {
	// 				  "@type": "Organization",
	// 				  "name": JSON.stringify(process.env.COMPANY_NAME),
	// 				  "logo": {
	// 					  "@type": "ImageObject",
	// 					  "url": logo.url,
	// 					  "width": 550,
	// 					  "height": 60
	// 				  }
	// 			  }
	// 		  }
	// 	  }
	//   } catch (e) {
	// 	  // Returns error page
	// 	  error({ statusCode: 404, message: 'Page not found' })
	//   }
  },
  filters: {
	  moment: function (date) {
		  if (date && date.length) {
			  const dateParts = date.split("-")
			  const aDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
			  return aDate
		  } else {
			  return ''
		  }
		  // return moment(date).format('DD-MM-YYYY');
	  }
  },
  methods: {
	  setFilter(tagId) {
		//   this.$cookies.set("topicId", tagId);
	  },
	  getId (article) {
		  return article.text.split(" ").join("")
	  },
	  hrefTo(val){
		  const move = window.scrollY + document.getElementById(`${val}`).getBoundingClientRect().top
		  window.scrollTo(0, move - 100);
	  }
  }
}
</script>
<style>
.blog-detail-section{
  background-color: #f7f7f7;
}
.blog-detail-social-media{
  max-width: 812px;
  padding: 0px 15px;
  margin: auto;
}
.toc-content-container {
  position: sticky;
  top: 150px;
  border-radius: 20px;
  padding: 32px;
  border-left: 0 !important;
  max-width: 260px;
  background-color: #fff;
}
.toc-content-container .blog-detail-sidebar {
  padding: 12px 0;
  margin-bottom: 0;
  border-bottom: 1px solid #E4E4E4;
}
.toc-content-container .blog-detail-sidebar .badge,.toc-content-container .blog-detail-sidebar {
  display: block;
  color: #000;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: normal;
  font-weight: 700;
  background-color: #F7F7F7;
  text-align: left;
  white-space: normal;
  cursor: pointer;
}
.toc-content-container .blog-detail-heading	 {
  font-size: 22px;
  padding-bottom: 20px;
}
.toc-content-container .blog-detail-sidebar:last-child{
  border-bottom: 0px;
  padding-bottom: 0;
}

/* Slider Bottom */

.blog .blog-slider .blog-slider-content-outer {
  z-index: 99;
  position: relative;
  padding: 0;
  color: #000;
  display: flex;
}

.icons {
  height: 100px;
}
/* ------------------------------------ */
.blog-detail-social-media{
  letter-spacing: normal;
}
.blog-slider .build-desc {
  max-width: 842px;
  padding: 0px 15px;
}
.build-desc {
  font-size: 21px;
  letter-spacing: normal;
  line-height:31.5px;
  font-weight: 400;
  color: #000;
}
.build-desc a{
  font-size: 20px;
  color: #000;
  text-decoration: underline;
}
.blog-detail-social-media .roommates-heading a{
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  line-height:19px;
  color: #000;
}
.blog-detail-social-media .blog-img-rounded{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}	
.line-color{
  border: 1px #E4E4E4 solid;
}
.blog-detail-social-media .blog-name{
  font-size: 18px;
  font-weight: 700;
  line-height:22px;
  color: #000;
}
.blog-detail-social-media .blog-date,.blog-share{
  font-size: 14px;
  font-weight: 700;
  line-height:17px;
  color: #000;
}
.blog-big-image img{
  border-radius: 	10px;
}
.blog .blog-slider .build-desc p {
  margin-bottom: 30px;
  /* margin-top: 30px; */
}
.blog .blog-slider .build-desc h2{
  font-size: 36px;
  font-weight: 700;
  line-height:44px;
  color: #000;
  letter-spacing: normal;
  margin-top: 60px;
  margin-bottom: 45px;
}
.blog .blog-slider .build-desc .block-img img{
  border-radius: 10px;
  margin-top: 40px;
}
.author_box{
  border-radius: 20px;
  border: 0 !important;
  padding: 72px 82px;
  background-color: #fff;
}
.author_main_box{
  padding: 120px 0px 165px 0;
}
.author_box .author_box_heading{
  font-size: 18px;
  font-weight: 700;
  line-height:22px;
  color: #000;
}
.author_box .author_box_paragraph{
  font-size: 16px;
  line-height:24px;
  font-weight: 400;
  color: #000;
}
.author_box .author-image{
  min-width: 96px;
  height: 96px;
  border-radius: 50%;
}
.social-icon {
  margin-right: 16px;
}
.blog .blog-slider .build-desc ol{
  padding-left: 15px;
}
.author_box figure,.author_box a{
  width: 32px !important;
  height: 32px !important;
  text-align: center;
}
.author_box .author_box_image{
  width: 15px !important;
  padding: 8px 0;
}
.author_box figure a{
  display: inline-block;
  border-radius: 50%;
  background-color: #000;
}
.blog_body ul {
list-style-type: disc;
}

.blog_body ul li a {
text-decoration: none;
color: blue;
}

.blog_body ul li a:hover {
text-decoration: underline;
}

@media (max-width:1199px){
  .toc-content-container{
	  max-width: 100%;
  }
  .blog .blog-slider .blog-slider-content-outer{
	  display: block;
  }
  .blog-detail-social-media .roommates-heading a{
	  font-size: 13px;
  }
  .blog-detail-social-media .blog-img-rounded{
	  width: 50px;
	  height: 50px;
  }
  .blog-detail-social-media .blog-name{
	  font-size: 15px;
  }
  .blog-detail-social-media .blog-date, .blog-share{
	  font-size: 13px;
  }
  .social-icon{
	  margin-right: 10px;
  }
  .build-desc,.build-desc a{
	  font-size: 16px;
	  line-height:26px;
  }
  .blog .blog-slider .build-desc p{
	  margin-bottom: 15px;
  }
  .blog .blog-slider .build-desc h2{
	  font-size: 24px;
	  line-height: 35px;
	  margin-bottom: 15px;
	  margin-top: 15px;
  }
  .blog .blog-slider .build-desc ol{
	  margin-bottom: 15px;
  }
  .blog .blog-slider .build-desc .block-img img{
	  margin-top: 5px;
  }
  .author_box{
	  padding: 15px;
  }
  .author_main_box{
	  padding: 20px 0 30px 0;
  }
  .author_box .author_box_paragraph{
	  font-size: 14px;
	  line-height:22px;
  }
  .author_box .author_box_heading{
	  font-size: 17px;
	  line-height: 16px;
  }
  .author_box .author-image{
	  min-width: 70px;
	  height: 70px;
  }
}
@media (max-width:575px){
  .social-icon{
	  margin-right: 5px;
  }
}
@media (max-width:767px){
  .blog-slider-content-outer{
	  flex-direction: column;
  }
  .author_box figure, .author_box a{
	  width: 25px !important;
	  height: 25px !important;
  }
  .author_box .author_box_image{
	  width: 12px !important;
	  padding: 6px 0;
  }
  .toc-content-container{
	  position: initial;
  }
}
@media (min-width:768px) and (max-width:1199px){
  .toc-content-container{
	  min-width: 230px;
	  max-width: 260px;
	  padding: 16px;
  }
  .toc-content-container .blog-detail-sidebar .badge, .toc-content-container .blog-detail-sidebar{
	  font-size: 15px;
  }
  .toc-content-container .blog-detail-heading	 {
	  font-size: 19px;
	  padding-bottom: 15px;
  }
}
@media (min-width:576px) and (max-width:991px){
  .author_box figure, .author_box a{
	  width: 28px !important;
	  height: 28px !important;
  }
  .author_box .author_box_image{
	  width: 13px !important;
	  padding: 7px 0;
  }
}
@media (min-width:992px) and (max-width:1199px){
  .blog .blog-slider .blog-slider-content-outer{
	  display: flex;
  }
  .blog .blog-slider .build-desc h2{
	  font-size: 35px;
	  line-height: 45px;
	  margin: 35px 0 30px 0;
  }
  .blog-detail-social-media .roommates-heading a{
	  font-size: 15px;
  }
  .blog-detail-social-media .blog-name{
	  font-size: 16px;
  }
  .blog-detail-social-media .blog-date, .blog-share{
	  font-size: 14px;
  }
  .build-desc,.build-desc a{
	  font-size: 17px;
	  line-height: 26px;
  }
  .blog .blog-slider .build-desc .block-img img{
	  margin-top: 20px;
  }
  .author_box{
	  padding: 30px;
  }
  .author_main_box{
	  padding: 30px 0 50px 0;
  }
  
}
@media (min-width:1200px) and (max-width:1400px){
  .social-icon{
	  margin-right: 10px;
  }
   .author_main_box{
	   padding: 70px 0 100px 0;
   }
   .blog .blog-slider .build-desc h2{
	   margin-top: 40px;
	   margin-bottom: 30px;
   }
   .blog .blog-slider .build-desc p{
	   margin-bottom: 20px;
   }
   .blog .blog-slider .build-desc .block-img img{
	   margin-top: 25px;
   }
   .author_box_margin{
	   margin-right: 5px !important;
   }
}
@media (min-width:1401px) and (max-width:1700px){
   .author_main_box{
	   padding: 70px 0 100px 0;
   }
}
@media (min-width:1401px){
  .author_box_margin{
	   margin-right: 13px !important;
   }
}
.social-share-items-list .position-relative{
  z-index: 1;
}
.build-desc.blog_body iframe {
  width: 100%;
  min-height: 500px;
  border-radius: 10px;
}
@media (max-width:370px){
  .build-desc.blog_body iframe {
	  min-height: 200px;
  }
}
@media (min-width:371px) and (max-width:575px){
	  .build-desc.blog_body iframe {
	  min-height: 280px;
  }
}
@media (min-width:576px) and (max-width:1024px){
	  .build-desc.blog_body iframe {
	  min-height: 400px;
  }
}
</style>
