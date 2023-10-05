const getAppRoutes = require('./utils/getRoutes.js');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
import nuxtKitModule from './modules/nuxt-kit'
import { client } from './prismic/prismic';
// require('dotenv').config(); 
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// require('dotenv').config();
export default {
  // srcDir: 'src',
  server: {
    compression: true,
  },
  runtimeConfig: {
    public: {
    env:process.env,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
    mapKey: process.env.GOOGLE_MAP_KEY,
    // proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    bearer: process.env.MODE === 'prod' ? process.env.PROD_COLIV_HQ_KEY : process.env.DEV_COLIV_HQ_KEY,
    prismicEndPoint: process.env.PRISMIC_ENDPOINT,
    googleApiKey: process.env.GOOGLE_MAP_KEY
    },
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
  app: {
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.14.0/bootstrap-vue.css' },
      { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css" }
    ],
    script: [
      {type:"module", src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', defer: true },
      { type:"module", src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', defer: true },
      { type:"module", src: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js", defer: true },
      { type:"module", src: "http://maps.google.com/maps/api/js?v=3.5&sensor=false", defer: true },
      { type:"module", src: "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js", defer: true },
      // { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js" }
      
    ],
    meta: [
      { name:"viewport", content: "width=device-width, initial-scale=1"}
    ]
  }
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
    '@/assets/scss/bootstrap.scss',
    // Import the Bootstrap CSS
    'bootstrap/dist/css/bootstrap.css',
    // Import the BootstrapVue CSS
    'bootstrap-vue/dist/bootstrap-vue.css',
    // 'vuetify/lib/styles/main.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
 
  // plugins: [
  //   { src: '@/plugins/bootstrap-vue',ssr: false  },
  //   { src: '@/plugins/vue-carousel', ssr: false },
  //   { src: '@/plugins/social-share', ssr: false },
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
    
    
    // {
    //   autoImports: ['defineStore', 'acceptHMRUpdate'],
    // },
    // 'nuxt3-vuex-module',
    // '@nuxtjs/dotenv',
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
    // nuxtKitModule
  ],
  image: {
    dir: "assets/images",
  },
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
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
	  '/api/': {
		  target: 'http://localhost:3000',
		  changeOrigin: true,
		  Headers: {
			  connection: 'keep-alive'
		  }
	  }
  },
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
    clientConfig: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    },
    // linkResolver: '@/plugins/link-resolver',
    // htmlSerializer: '@/plugins/html-serializer',
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
  nuxt: {
    // Set the target for your application (server, static, or serverless).
    target: 'server',

    // Define the server host and port.
    server: {
      host: '0.0.0.0', // Listen on all network interfaces.
      port: 3000,      // Specify the port to run your app on.
    },

  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    
    */
    plugins: [
      // Other plugins...
     {src:'@/plugins/bootstrap.js',mode:client} ,
    //  '~/plugins/prismic.js', // Register the Prismic plugin
    ],
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
    '@pinia/nuxt',
    'cookie-universal-nuxt',
    // '@nuxtjs/dotenv',
    // '@nuxtjs/prismic',
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
    '~/middleware/seo'
  ],
}

