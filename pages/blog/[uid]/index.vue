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
							
							<div class="tag-list col-lg-6 col-md-6 col-sm-12 col-xs-12" >
								<!-- <b-badge :href="'/blog?topic='+topic.data.topic" @click="setFilter(topic.id)" class="tags" variant="light" v-for="topic in topics_array" :key="topic.topic">{{topic.data.topic}}</b-badge> -->
								<div class="d-flex align-items-center">
									<!-- <nuxt-img :src="author.data.author_picture" class="blog-img-rounded align-middle"/>  -->
									<div class="mr-3 d-inline-block">
										 <!-- <img src="../../../assets/img/four-col.png" class="blog-img-rounded"> -->
										 <prismic-image v-if="isAuthor" :field="author.data.author_picture" class="blog-img-rounded align-middle"/>
									</div>
									<div class="text-left"> 
										<div class="blog-name pb-1" v-if="isAuthor">{{author.data.author}}</div>
										<p class="blog-date">{{ publish_date || moment }}</p>
									</div>
								</div>
							</div>  
							<div class="social-share-icons col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3 mt-md-0"  v-if="blog_body != ''">
								<div class="social-share-items-list share-box">
									<span class="blog-share mr-4"> Share:</span>
									<client-only class="d-flex">
										<div class="position-relative d-inline-block social-icon-box">
											<facebook :url="meta_url" scale="2" class="social-icon"></facebook>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
												<g id="Group_670" data-name="Group 670" transform="translate(0.273 0.952)">
													<path id="Path_24" data-name="Path 24" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm5.016,9.749H19.537a1.7,1.7,0,0,0-1.911,1.832v2.2H20.88l-.521,3.39H17.626v8.2H13.962v-8.2H10.984V13.78h2.978V11.2c0-2.939,1.75-4.563,4.43-4.563a18.049,18.049,0,0,1,2.625.229Z" transform="translate(-0.273 -0.952)"/>
												</g>
											</svg>
										</div>
										<div class="position-relative d-inline-block social-icon-box">
											<twitter :url="meta_url"  scale="2" class="social-icon"></twitter>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
												<path id="Path_619" data-name="Path 619" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm7.329,12.24c.012.163.012.326.012.489a10.687,10.687,0,0,1-10.76,10.76v0a10.708,10.708,0,0,1-5.8-1.7,7.755,7.755,0,0,0,.9.054,7.584,7.584,0,0,0,4.7-1.622A3.785,3.785,0,0,1,8.848,17.6a3.764,3.764,0,0,0,1.708-.065,3.783,3.783,0,0,1-3.034-3.707v-.048a3.757,3.757,0,0,0,1.716.473A3.785,3.785,0,0,1,8.067,9.2a10.741,10.741,0,0,0,7.793,3.952A3.785,3.785,0,0,1,22.3,9.7a7.582,7.582,0,0,0,2.4-.918,3.8,3.8,0,0,1-1.663,2.092,7.551,7.551,0,0,0,2.172-.594A7.687,7.687,0,0,1,23.329,12.24Z"/>
											</svg>
										</div>
										<div class="position-relative d-inline-block social-icon-box">
											<linkedin :url="meta_url" scale="2" class="social-icon"></linkedin>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="social-icon-svg">
											<g id="Group_669" data-name="Group 669" transform="translate(0.984 0.952)">
												<path id="Path_25" data-name="Path 25" d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0ZM11.758,23.659H8.848V12.992h2.909ZM10.3,11.762A1.711,1.711,0,1,1,12,10.052,1.7,1.7,0,0,1,10.3,11.762Zm13.091,11.9H20.485V18.224c0-3.266-3.879-3.019-3.879,0v5.434H13.7V12.992h2.909V14.7c1.354-2.508,6.788-2.693,6.788,2.4Z" transform="translate(-0.984 -0.952)"/>
											</g>
											</svg>
										</div>
										<div class="position-relative d-inline-block social-icon-box">
											<whats-app :url="meta_url" scale="2" class="social-icon">
											</whats-app>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="social-icon-svg" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
										</div>	
										<div class="position-relative d-inline-block social-icon-box">
											<google :url="meta_url" scale="2" class="social-icon">
											</google>
											<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="social-icon-svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z"/></svg>
										</div>	
										<div class="position-relative d-inline-block social-icon-box">
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
						<picture>
							<source :srcset="banner.hero_image.phone.url" media="(max-width: 750px)">
							<source :srcset="banner.hero_image.tablet.url" media="(max-width: 991px)">
							<img :src="banner.hero_image.url">
						</picture>
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
										<div class="heading2-container blog-detail-sidebar" v-for="(content, tocIndex) in tocc" :key="tocIndex">
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
										<prismic-image :field="author.data.author_picture" class="author-image w-100"/>
									</div>
									<div>
										 <span class="author_box_heading mb-2 d-inline-block">{{author.data.author}}</span> 
										<prismic-rich-text :field="author.data.author_bio" class="author_bio author_box_paragraph"/>
										<!-- <figure v-for="(item, index) in author.data.social_networks"
											:key="'social_media_links-item-' + index">  
											<prismic-link :field="item.social_links" class=" icons">
												<prismic-image :field="item.social_icon" class="w-auto"/>
											</prismic-link>
										</figure> -->
									</div>
								</div>
								<div class="col-lg-4 col-xl-3 offset-xl-1 text-center text-lg-left pl-xl-0" v-if="author.data.social_networks.length > 0">
									<div class="tag-social-share mx-0 mt-3 mt-lg-0">
										<!-- <div class="tag-list col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12" v-if="topics_array && topics_array.length">
											<b-badge  :href="'/blog?topic='+topic.data.topic" @click="setFilter(topic.id)" class="tags" variant="light" v-for="topic in topics_array" :key="topic.topic">{{topic.data.topic}}</b-badge>
										</div>   -->
										<div class="vl d-none d-lg-block d-xl-block"></div>
										<div class="social-share-icons mx-auto mx-lg-0"  v-if="blog_body != ''">
											<div class="social-share-items-list">
												<span class="blog-share d-block mb-2 mb-xl-4"> Share:</span>
												<figure v-for="(item, index) in author.data.social_networks"
												:key="'social_media_links-item-' + index" class="d-inline-block mr-1 mr-md-2 mr-lg-1 author_box_margin">  
												<prismic-link :field="item.social_links" class=" icons d-inline-block">
													<prismic-image :field="item.social_icon" class="w-auto author_box_image"/>
												</prismic-link>
												</figure>
											</div>
										</div>
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

<script setup>
import {computed, onMounted } from 'vue';
import * as prismic from "@prismicio/client";
import { client } from '~/prismic/prismic'
// definePageMeta({
//   layout: "homepage",
// });

              
			  let  author = ref(null) 
			  let pageId = ref(null)
			  let document = ref(null) 
			  let banner = ref({}) 

			   // topics
			  let  topics_array = ref([]) 
			   // Set slices as variable
			  let  slices = ref(null) 
			  let tocc = ref(null) 
			   //Blog
			  let author_image =ref (null) 
			  let publish_date = ref(null) 
			  let  modified_date = ref(null) 
			  let topics = ref(null) 
			  let summary = ref(null) 
			  let blog_article = ref(null) 
			  let blog_body = ref(null) 
			  let table_of_content = ref(null) 

		        //SEO
				
			  let  meta_title = ref('') 
			  let meta_description = ref(null)
			  let meta_keywords = ref(null) 
			  let meta_image = ref(null)
			  let  meta_site_name = ref(null) 
			  let  meta_url = ref(null) 

			    //   let structuredData 

			   let structuredData = ref(null)



				const isAuthor = computed(() => {
					if(Array.isArray(author.value) && author.value.length > 0) {
						return true
					} else if(Object.keys(author.value).length > 0) {
						return true
					} 
					return false
			})


			function setFilter(tagId) {
			// this.$cookies.set("topicId", tagId);
			}
			function getId (article) {
				return article.text.split(" ").join("")
			}
			function hrefTo(val){
				const move = window.scrollY + document.getElementById(`${val}`).getBoundingClientRect().top
				window.scrollTo(0, move - 100);
			}

      onMounted( async () => {
		
					// let headingArray = document.getElementsByTagName('h2')
					// 	let headingThreeArray = document.getElementsByTagName('h3')
					// 	if (headingArray && headingArray.length) {
					// 		for (let index = 0; index < headingArray.length; index++) {
					// 			let str = headingArray[index].textContent.split(" ").join("")
					// 			headingArray[index].setAttribute("id", str);
					// 		}
					// 	}
					// 	if (headingThreeArray && headingThreeArray.length) {
					// 		for (let index = 0; index < headingThreeArray.length; index++) {
					// 			let str = headingThreeArray[index].textContent.split(" ").join("")
					// 			headingThreeArray[index].setAttribute("id", str);
					// 		}
					// 	}
					
				    })

      const { data } = await useAsyncData(async () => {
	    try{
				const router = useRoute()
				let topicArray = []

				
				// const Document = await client.getByUID('blogpage', router.params.uid)
				let Document =await  client.getByUID('blogpage', router.params.uid).then(async (response) => {return response})
				author.value = (await client.get({filters:prismic.filter.at('document.id', Document.data.author.id)})).results[0]
				// await client.get({filters:prismic.filter.at('document.id', Document.data.author.id)}.then(async (response) => {}))

				if (Document.data.topics1 && Document.data.topics1.length) {
				for(let i = 0; i < 3; i++) {
					if (Document.data.topics1[i] && Document.data.topics1[i].topic && Document.data.topics1[i].topic.id) {
						let topic = await client.get({filters:prismic.filter.at('document.id', Document.data.topics1[i].topic.id)})
						
						topicArray.push(topic.results[0])
					}
				}
			}

			const slices = Document.data.body.filter(function(slice) {                
				if(slice.slice_type == 'blog_cards') {
					Object.assign(slice, {page_type:'blog_details'});
				}
				return slice;
			});

			let pdate = Document.data.publish_date;
			if(Document.data.publish_date != null) {
				pdate = new Date(Document.data.publish_date);
				pdate = pdate.toISOString()
			}

			let mdate = Document.data.modified_date;
			if(Document.data.modified_date != null) {
				mdate = new Date(Document.data.modified_date);
				mdate = mdate.toISOString()
			}

			let tocArray = []
			Document.data.blog_body.forEach((content, index) => {
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




			pageId.value= router.params.uid;
			  Document.data.value= Document.data;
			  banner.value= {
				  hero_image: Document.data.hero_image,
				  title: Document.data.page_title
			  };
			  // topics
			  topics_array.value= topicArray;

			  // author
			//   author= (Object.keys(author).length) ? author.results[0] : [];
			  // Set slices as variable
			  slices.value= slices;
			  tocc.value = tocArray;
			  //Blog
			  author_image.value= Document.data.author_image;
			  publish_date.value= Document.data.publish_date;
			  modified_date.value= Document.data.modified_date;
			  topics.value= Document.data.topics;
			  summary.value= Document.data.summary;
			  blog_article.value= Document.data.blog_article;
			  blog_body.value= Document.data.blog_body;
			  table_of_content.value= Document.data.table_of_content;

			  //SEO
			  meta_title.value= (Document.data.page_title.length) ? Document.data.page_title[0].text : '';
			  meta_description.value= (Document.data.summary[0].text != null &&  Document.data.summary[0].text.length > 170) ?  Document.data.summary[0].text.substring(0, 167) + '...' :  Document.data.summary[0].text;
			  meta_keywords.value= Document.data.seo_keywords;
			  meta_image.value= (Document.data.meta_image.url) ? Document.data.meta_image.url : '';
			  meta_site_name.value= process.env.COMPANY_NAME;
			  meta_url.value= process.env.baseUrl+'/blog/'+params.uid;


			  structuredData.value= {
				  "@context": "https://schema.org",
				  "@type": "NewsArticle",
				  "mainEntityOfPage":{
					  "@type":"WebPage",
					  "@id": process.env.baseUrl+'/blog/'+params.uid,
				  },
				  "headline": (Document.data.page_title.length) ? Document.data.page_title[0].text : '',
				  "image": {
					  "@type": "ImageObject",
					  "url": (Document.data.meta_image.url) ? Document.data.meta_image.url : '',
					  "height": 1080,
					  "width": 1920
				  },
				  "datePublished": pdate,
				  "dateModified": mdate,
				  "author": {
					  "@type": "Person",
					  "name": (Object.keys(author.value).length) ? author.value.data.author : 'Casa Mia Coliving'
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
		}  catch (e) {
			// Returns error page
			error({ statusCode: 404, message: 'Page not found' })
		  }
     })
	useHead({
		    title: 'Casa Mia Coliving Blog Post'+"-"+meta_title.value,
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{ rel: 'canonical', href: meta_url.value },
			],
			meta: [
				{ hid: 'description', name: 'description', content: meta_description.value },
				{ hid: 'keywords', name: 'keywords', content: meta_keywords.value },
				{
					hid: 'ogtitle',
					property: 'og:title',
					content: meta_title.value
				},
				{
					hid: 'ogdescription',
					property: 'og:description',
					content: meta_description.value
				},
				{
					hid: 'ogimage',
					property: 'og:image',
					content: meta_image.value
				},
				{
					hid: 'ogurl',
					property: 'og:url',
					content: meta_url.value
				},
				{
					hid: 'ogtype',
					property: 'og:type',
					content: 'Website'
				},
				{
					hid: 'ogsite_name',
					property: 'og:site_name',
					content: meta_site_name.value
				},
				{
					hid: 'twittertitle',
					name: 'twitter:title',
					content: meta_title.value
				},
				{
					hid: 'twitterdescription',
					name: 'twitter:description',
					content: meta_description.value
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary'
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: meta_image.value
				},
			],
			script: [{ type: 'application/ld+json', json: structuredData.value }]
    }) 

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
.social-icon-box{
	width: 2.5rem
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
