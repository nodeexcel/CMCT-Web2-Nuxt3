const getAppRoutes = require('./utils/getRoutes.js');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
import nuxtKitModule from './modules/nuxt-kit'
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
require('dotenv').config();
export default {
  server: {
    compression: true,
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
    mapKey: process.env.GOOGLE_MAP_KEY,
    // proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    bearer: process.env.MODE === 'prod' ? process.env.PROD_COLIV_HQ_KEY : process.env.DEV_COLIV_HQ_KEY,
    prismicEndPoint: process.env.PRISMIC_ENDPOINT,
    googleApiKey: process.env.GOOGLE_MAP_KEY
  },
  /*
  ** Headers of the page
  */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' },
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.14.0/bootstrap-vue.css' },
      { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css" }
    ],
    script: [
      {type:"module", src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', defer: true },
      { type:"module", src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', defer: true },
      { type:"module", src: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js", defer: true },
      // { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js" }
    ],
    meta: [
      { name:"viewport", content: "width=device-width, initial-scale=1"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css',
    // Import the Bootstrap CSS
    'bootstrap/dist/css/bootstrap.css',
    // Import the BootstrapVue CSS
    'bootstrap-vue/dist/bootstrap-vue.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
 
  // plugins: [
  //   { src: '@/plugins/bootstrap-vue',ssr: false  },
  //   { src: '@/plugins/vue-carousel', ssr: false },
  //   { src: '@/plugins/social-share', ssr: false },
  // ],
  // plugins: [
  //   // Other plugins...
  //   '~/plugins/prismic.js', // Register the Prismic plugin
  // ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // mofules for full static before `nuxt export` (coming in v2.12)
    // '@/modules/static',
    // '@/modules/crawler',
    // https://prismic-nuxt.js.org/
    '@nuxtjs/prismic',
    // 'cookie-universal-nuxt',
    // '@nuxt/http', 
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    // '@nuxtjs/sitemap',
    //'@nuxtjs/pwa',
    // 'nuxt-lazy-load',
    // '@nuxtjs/robots',
    // 'cookie-universal-nuxt',
    // 'vue-scrollto/nuxt',
    // 'nuxt-compress',
    // '@nuxt/image',
    // ['vue-scrollto', { duration: 300 }],
    nuxtKitModule
  ],
  // axios: {
  //   proxy: true // Can be also an object with default options
  // },
  // proxy: {
	//   '/api/': {
	// 	  target: 'http://localhost:3000',
	// 	  changeOrigin: true,
	// 	  Headers: {
	// 		  connection: 'keep-alive'
	// 	  }
	//   }
  // },
  prismic: {
    //endpoint: process.env.PRISMIC_ENDPOINT + '?access_token=' + process.env.PRISMIC_ACCESS_TOKEN,
    //endpoint: process.env.PRISMIC_ENDPOINT + '?ref=X3bW8RIAAIO-6d_n~X3MsZRIAAEyH2cYt&access_token=MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA',
    endpoint: process.env.PRISMIC_ENDPOINT ,
    clientConfig: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    },
    // accessToken:process.env.PRISMIC_ACCESS_TOKEN,
    // endpoint: process.env.PRISMIC_ENDPOINT ,
    // apiOptions: {
    //   accessToken: process.env.PRISMIC_ACCESS_TOKEN || 'default-access-token-if-env-not-set',
    // },
    // accessToken:'MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA',
    //endpoint: process.env.PRISMIC_ENDPOINT + '/documents/search?ref=YWYsdREAACUAgiw0&access_token=MC5YM1F4Z1JJQUFCR1IzazZl.77-9ZO-_ve-_ve-_ve-_ve-_ve-_vUXvv73vv73vv70fFe-_vV0UOglZIO-_ve-_ve-_ve-_vUFg77-977-977-977-9NA',
    // linkResolver: '@/plugins/link-resolver',
    // htmlSerializer: '@/plugins/html-serializer',
    modern:true
  },

  sitemap: {
    //hostname: "https://www.casamiacasatua.co", //process.env.baseUrl,
    //path: '/sitemap.xml',
    routes() {
      return getAppRoutes();
    },
    generate: false
  },
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    
    */
    transpile: ["@prismicio/vue"],
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    extend(config, { isClient }) {
      // For Gzip compression
      if (isClient) {
        config.plugins.push(
        //   new BundleAnalyzerPlugin({
        //   analyzerMode: 'static',
        //   openAnalyzer: false,
        //   reportFilename: 'bundle-analyzer-report.html',
        // }),
        // new HardSourceWebpackPlugin({
        //   // Configuration options
        //   cacheDirectory: path.resolve(__dirname, '.cache/hard-source'),
        //   cachePrune: true,
        //   // configHash: function (webpackConfig) {
        //   //   return require('node-object-hash')({ sort: false }).hash(webpackConfig);
        //   // },
        // }), 
        );
        // config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin());
      }
    },
    // postcssOptions: {
    //   plugins: [
    //     require('autoprefixer')({
    //       overrideBrowserslist: ['last 2 versions', '> 1%'],
    //     }),
    //     require('postcss-preset-env')({
    //       stage: 3,
    //     }),
    //     require('cssnano')({
    //       preset: ['default', {
    //         discardComments: {
    //           removeAll: true,
    //         },
    //       }],
    //     }),
    //   ],
    // },
    optimization: {
      splitChunks: {
        maxSize: 500000,
        chunks: 'all',
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendors: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
          // styles: {
          //   name: 'styles',
          //   test: /\.(css|vue)$/,
          //   chunks: 'all',
          //   enforce: true
          // }
        },
      },
      minimize: true,
      minimizer: [
        // new TerserPlugin({
        //   // TerserPlugin configuration options
        //   exclude: /\/excludes/,
        //   include: /\/includes/,
        //   exclude: /\/excludes/,
        //   parallel: true,
        //   terserOptions: {
        //     compress: {
        //       drop_console: true, // Remove console.* statements
        //     },
        //     output: {
        //       comments: false, // Remove comments from the output file
        //     },
        //   },
        // }),
      ],
    },
      html:{
        minify:{
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyElements: true
        }
      },
      babel: {
        presets({ isServer }) {
          return [
            [
              require.resolve('@nuxt/babel-preset-app'),
              {
                buildTarget: isServer ? 'server' : 'client',
                corejs: 3
              }
            ]
          ];
        }
      }
  },
  buildModules: [
    '@nuxtjs/gtm',
    '@nuxtjs/dotenv',
    '@nuxtjs/prismic',
    // '~/modules/crawler',
    // '@nuxt/image'
  ],
  gtm: {
    id: process.env.GTM_KEY
  },
  
  generate: {
    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
  },
  
  serverMiddleware: [
    '~/servermiddleware/seo.js'
  ],
}

