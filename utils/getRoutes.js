import axios from 'axios';
const appRoutes = require('../routes.json');
const Prismic = require('@prismicio/client');

module.exports = async function getAppRoutes() {
    // Fetch blogPosts as object with languages as attributes and slugs as their values
    
    // fetchBlogPosts()
    // Iterate over each blog post
    const blogPosts =  [];
    const siteUrl =  'https://www.casamia.co';
    const pages =  [];
    const routes = [];
    await Prismic.getApi(process.env.PRISMIC_ENDPOINT+ '?ref=X3bW8RIAAIO-6d_n~X3MsZRIAAEyH2cYt&access_token=MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA').then((api) => {
        // Get all Pages route
        api.query('').then(function(response) {
            response.results.forEach(function(page, index) {
                console.log('page', page.type)
                if(page.type == 'page') { 
                    pages.push({ uid: page.uid})
                }
                if(page.type == 'blogpage') { 
                    blogPosts.push({ uid: page.uid})
                }
            });
            // response is the response object, response.results holds the documents
        }); 
    });
    const appartments = await axios.post(process.env.MODE === 'prod' ? process.env.PROD_END_POINT : process.env.DEV_END_POINT, {
        //"operatorId": "HaF6mb19L6AzWVavPr5t",
        "neighborhoodId": "",
        "cityId": ""
    },{
        headers: {
            Authorization: process.env.MODE === 'prod' ? 'Bearer '+process.env.PROD_COLIV_HQ_KEY : 'Bearer '+process.env.DEV_COLIV_HQ_KEY
        }
    })
    const homeList = [];
    appartments.data.data.forEach(function(appartment, index) {
        if(appartment.homeId != undefined) { 
            homeList.push({ uid: appartment.homeId})
        }
    });
   
    // and every route defined in routes.json
    for (let k = 0; k < appRoutes.length; k += 1) {
        let routePath = appRoutes[k];
        //const blogUid = blogPosts[k].uid;

        // replace the language placeholder with current language
        // If the route includes 'blog', iterate over all fetched posts in current language
        if (routePath.includes('/blog/')) {
            for (let postIndex = 0; postIndex < blogPosts.length; postIndex += 1) {
                routes.push(siteUrl+''+routePath.replace(/:uid/, blogPosts[postIndex].uid));
            }
        } else if (routePath.includes('/findahome/')) {
            for (let postIndex = 0; postIndex < homeList.length; postIndex += 1) {
                routes.push(siteUrl+''+routePath.replace(/:uid/, homeList[postIndex].uid));
            }
        } else if (routePath.includes('/page/')) {
            for (let postIndex = 0; postIndex < pages.length; postIndex += 1) {
                routes.push(siteUrl+''+routePath.replace(/:uid/, pages[postIndex].uid));
            }
        } else {
            routes.push(siteUrl+''+routePath);
        }
    }

    // Return all available routes
    return routes;
};
