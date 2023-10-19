<template>
	<section class="blog">
		<div class="container-background-wrapper">
			<div class="container-background-sub-wrapper mb-5 blog-detail-section">
				<div class="inner-content-wrapper ">
					<div class="blog-detail-social-media pt-4 pt-lg-5 pt-xl-5">
						<div class="roommates-heading mb-2 mb-xl-3 pt-xl-5" v-if="topics_array && topics_array.length">
							<b-badge  :href="'/blog?topic='+topic.data.topic" @click="setFilter(topic.id)" class="tags" variant="light" v-for="topic in topics_array" :key="topic.topic">{{topic.data.topic}}</b-badge>
						</div>
						<prismic-rich-text :field="banner.title" class="blog-title content-h5-heading mb-0 mb-xl-4"/>
						<hr class="line-color">
						<div class="tag-social-share row align-items-center">
							<div class="tag-list col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if="topics_array && topics_array.length">
								<!-- <b-badge :href="'/blog?topic='+topic.data.topic" @click="setFilter(topic.id)" class="tags" variant="light" v-for="topic in topics_array" :key="topic.topic">{{topic.data.topic}}</b-badge> -->
								<div class="d-flex align-items-center">
									<div class="mr-3 d-inline-block">
										 <!-- <img src="../../../assets/img/four-col.png" class="blog-img-rounded"> -->
										 <!-- <prismic-image v-if="isAuthor" :field="author.data.author_picture" class="blog-img-rounded align-middle"/> -->
									</div>
									<div class="text-left"> 
										<!-- <div class="blog-name pb-1" v-if="isAuthor">{{author.data.author}}</div> -->
										<p class="blog-date">{{ publish_date | moment }}</p>
									</div>
								</div>
							</div>  
							<div class="social-share-icons col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3 mt-md-0"  v-if="blog_body != ''">
								<div class="social-share-items-list share-box">
									<span class="blog-share mr-4"> Share:</span>
									<client-only>
										<div class="position-relative d-inline-block">
											<facebook :url="meta_url" scale="2" class="social-icon"></facebook>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
												<g id="Group_670" data-name="Group 670" transform="translate(0.273 0.952)">
													<path id="Path_24" data-name="Path 24" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm5.016,9.749H19.537a1.7,1.7,0,0,0-1.911,1.832v2.2H20.88l-.521,3.39H17.626v8.2H13.962v-8.2H10.984V13.78h2.978V11.2c0-2.939,1.75-4.563,4.43-4.563a18.049,18.049,0,0,1,2.625.229Z" transform="translate(-0.273 -0.952)"/>
												</g>
											</svg>
										</div>
										<div class="position-relative d-inline-block">
											<twitter :url="meta_url"  scale="2" class="social-icon"></twitter>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
												<path id="Path_619" data-name="Path 619" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm7.329,12.24c.012.163.012.326.012.489a10.687,10.687,0,0,1-10.76,10.76v0a10.708,10.708,0,0,1-5.8-1.7,7.755,7.755,0,0,0,.9.054,7.584,7.584,0,0,0,4.7-1.622A3.785,3.785,0,0,1,8.848,17.6a3.764,3.764,0,0,0,1.708-.065,3.783,3.783,0,0,1-3.034-3.707v-.048a3.757,3.757,0,0,0,1.716.473A3.785,3.785,0,0,1,8.067,9.2a10.741,10.741,0,0,0,7.793,3.952A3.785,3.785,0,0,1,22.3,9.7a7.582,7.582,0,0,0,2.4-.918,3.8,3.8,0,0,1-1.663,2.092,7.551,7.551,0,0,0,2.172-.594A7.687,7.687,0,0,1,23.329,12.24Z"/>
											</svg>
										</div>
										<div class="position-relative d-inline-block">
											<linkedin :url="meta_url" scale="2" class="social-icon"></linkedin>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
											<g id="Group_669" data-name="Group 669" transform="translate(0.984 0.952)">
												<path id="Path_25" data-name="Path 25" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0ZM11.758,23.659H8.848V12.992h2.909ZM10.3,11.762A1.711,1.711,0,1,1,12,10.052,1.7,1.7,0,0,1,10.3,11.762Zm13.091,11.9H20.485V18.224c0-3.266-3.879-3.019-3.879,0v5.434H13.7V12.992h2.909V14.7c1.354-2.508,6.788-2.693,6.788,2.4Z" transform="translate(-0.984 -0.952)"/>
											</g>
											</svg>
										</div>
										<div class="position-relative d-inline-block">
											<whats-app :url="meta_url" scale="2" class="social-icon">
											</whats-app>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="social-icon-svg" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
										</div>	
										<div class="position-relative d-inline-block">
											<google :url="meta_url" scale="2" class="social-icon">
											</google>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="social-icon-svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"/></svg>
										</div>	
										<div class="position-relative d-inline-block">
											<email :url="meta_url"  scale="2" class="social-icon"></email>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
											<g id="Group_680" data-name="Group 680" transform="translate(-881.528 -262.926)">
												<path id="Path_620" data-name="Path 620" d="M898.516,282.312a.791.791,0,0,1-.478-.161l-7.789-5.915v9.255h16.533v-9.4L899,282.144A.787.787,0,0,1,898.516,282.312Z" transform="translate(-0.988 -1.535)"/>
												<path id="Path_621" data-name="Path 621" d="M897.528,262.926a16,16,0,1,0,16,16A16,16,0,0,0,897.528,262.926Zm9.879,21.813a.8.8,0,0,1-.8.8H888.445a.8.8,0,0,1-.8-.8V273.11a.8.8,0,0,1,.041-.25c0-.012.012-.019.016-.031a.863.863,0,0,1,.042-.08.763.763,0,0,1,.107-.159.849.849,0,0,1,.069-.068.83.83,0,0,1,.158-.107c.027-.013.051-.029.08-.041a.79.79,0,0,1,.281-.057H906.61a.8.8,0,0,1,.8.8Z"/>
											</g>
											</svg>
										</div>
									</client-only>
								</div>
							</div>
						</div>
						<hr class="line-color">
						<prismic-rich-text  class="build-desc my-4  my-xl-5 py-xl-3 pb-xl-5" :field="blog_article"/>
					</div>
					<div ref="slicerImageMain" class="px-3 blog-big-image">
						{{ banner }}
						<!-- <picture>
							<source :srcset="banner.hero_image.phone.url" media="(max-width: 750px)">
							<source :srcset="banner.hero_image.tablet.url" media="(max-width: 991px)">
							<img :src="banner.hero_image.url">
						</picture> -->
					</div>
				</div>
				<div class="blog-slider slider-cms">
					<div class="inner-content-wrapper">
						<div class="blog-slider-content-outer d-flex">
							<prismic-rich-text  class="build-desc blog_body mx-auto order-2 order-md-1 mt-3 mt-xl-5 pt-xl-5" :field="blog_body" :htmlSerializer="anotherHtmlSerializer"/>
							<!-- TOC -->
							<div class="table-of-content ml-md-auto order-1 order-md-2 mt-3 mt-xl-5 pt-xl-5" v-if="(blog_body != '' && table_of_content === true)">
								<div class="toc-content-container mx-3">
									<div class="blog-detail-sidebar pt-0 blog-detail-heading"> Contents </div>
									<div class="content-container">
										<div class="heading2-container blog-detail-sidebar" v-for="(content, tocIndex) in toc" :key="tocIndex">
											<div class="">
												 <!-- <a class="f-12" :href="'#' + getId(content)"> {{content.text}} </a> -->
												 <!-- <a class="f-12" @click="hrefTo(getId(content))"> {{content.text}} </a> -->
												<b-badge class="f-12" @click="hrefTo(getId(content))">{{content.text}} </b-badge>
												
											</div>
											<div v-for="(heading3, ind) in content.heading3" :key="ind" class="heading3">
												<div class="ml-1 line-height">
													<!-- <a :href="'#' + getId(heading3)" class="f-10 content-sublink"> -->
													<!-- <a @click="hrefTo(getId(heading3))" class="f-10 content-sublink">
														&bull; {{heading3.text}}
													</a> -->
													<b-badge @click="hrefTo(getId(heading3))" class="f-10 content-sublink" style="cursor:pointer">&bull; {{heading3.text}}</b-badge>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Author box -->
						<div class="author_main_box">
						<div class="author_box mx-3">
							<div class="row">
								<div class="col-lg-8 d-sm-flex">
									<div class="mr-sm-4 text-center text-lg-left">
										<!-- <prismic-image :field="author.data.author_picture" class="author-image w-100"/> -->
									</div>
									<div>
										 <!-- <span class="author_box_heading mb-2 d-inline-block">{{author.data.author}}</span>  -->
										<!-- <prismic-rich-text :field="author.data.author_bio" class="author_bio author_box_paragraph"/> -->
										<!-- <figure v-for="(item, index) in author.data.social_networks"
											:key="'social_media_links-item-' + index">  
											<prismic-link :field="item.social_links" class=" icons">
												<prismic-image :field="item.social_icon" class="w-auto"/>
											</prismic-link>
										</figure> -->
									</div>
								</div>
								
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
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
	  isAuthor () {
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

			//    let author = (await this.$store.dispatch('fetchAuthor', 'YLXe5hIAACUAoSkS'))
			//   console.log("jjj", mainStore)
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
             console.log("ok",this.banner);
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
<style >
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
  color: #000 !important;
  margin-bottom: 0;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: normal;
  font-weight: 700;
  background-color: #F7F7F7 !important;
  text-align: left;
  white-space: normal;
  cursor: pointer;
}
.toc-content-container .blog-detail-heading	 {
  font-size: 21px;
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
  font-size: 20px;
  letter-spacing: normal;
  line-height:31.5px;
  font-weight: 400;
  color: #000;
}
.build-desc a{
  font-size: 19px;
  color: #000;
  text-decoration: underline;
}
.blog-detail-social-media .roommates-heading a{
  font-size: 15px;
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
  font-size: 17px;
  font-weight: 700;
  line-height:22px;
  color: #000;
}
.blog-detail-social-media .blog-date,.blog-share{
  font-size: 13px;
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
  font-size: 35px;
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
  font-size: 17px;
  font-weight: 700;
  line-height:22px;
  color: #000;
}
.author_box .author_box_paragraph{
  font-size: 15px;
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
color: blue !important;
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
	  font-size: 12px;
  }
  .blog-detail-social-media .blog-img-rounded{
	  width: 50px;
	  height: 50px;
  }
  .blog-detail-social-media .blog-name{
	  font-size: 14px;
  }
  .blog-detail-social-media .blog-date, .blog-share{
	  font-size: 12px;
  }
  .social-icon{
	  margin-right: 10px;
  }
  .build-desc,.build-desc a{
	  font-size: 15px;
	  line-height:26px;
  }
  .blog .blog-slider .build-desc p{
	  margin-bottom: 15px;
  }
  .blog .blog-slider .build-desc h2{
	  font-size: 23px;
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
	  font-size: 13px;
	  line-height:22px;
  }
  .author_box .author_box_heading{
	  font-size: 16px;
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
	  font-size: 14px;
  }
  .toc-content-container .blog-detail-heading	 {
	  font-size: 18px;
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
	  font-size: 34px;
	  line-height: 45px;
	  margin: 35px 0 30px 0;
  }
  .blog-detail-social-media .roommates-heading a{
	  font-size: 14px;
  }
  .blog-detail-social-media .blog-name{
	  font-size: 15px;
  }
  .blog-detail-social-media .blog-date, .blog-share{
	  font-size: 13x;
  }
  .build-desc,.build-desc a{
	  font-size: 16px;
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
