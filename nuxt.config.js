// https://nuxt.com/docs/api/configuration/nuxt-config
const getAppRoutes = require('./utils/getRoutes.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

export default defineNuxtConfig({
  builder: 'webpack',
  // vite: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
    env:process.env
    },
  },
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
        // { type:"module", src: "http://maps.google.com/maps/api/js", defer: true },
        // { type:"module", src: "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js", defer: true }
        // { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js" }
        
      ],
      meta: [
        {charset: 'utf-8'},
        { name:"viewport", content: "width=device-width, initial-scale=1"}
      ]
    }
  },
  typescript: {
    shim: false, // If you have enabled Take Over Mode or installed the TypeScript Vue Plugin (Volar), you can disable generating the shim for *.vue files
    strict: true
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/prismic',
    'nuxt-icon'
  ],
   image: {
     domains: ['wonderful-meadow-0d9011810.3.azurestaticapps.net'],
     dir: 'assets/images'
  }  ,
  // image: {
  //   cloudinary: {
  //     baseURL: 'https://res.cloudinary.com/<your-cloud-name>/image/upload/',
  //   },
  // },
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
    clientConfig: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    },
    optimizeDeps: {
      include: ['lodash'],
    },
  
    linkResolver: '@/prismic/link-resolver',
    htmlSerializer: '@/prismic/html-serializer',
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
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css',
    '@/assets/scss/bootstrap.scss',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  
  build: {

    // transpile: ['primevue'],
   
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
    },
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    extend(config, { isClient }) {
      // For Gzip compression
      if (isClient) {
        config.plugins.push(
        )
      }
    },
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
        },
      },
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({ exclude: /\/excludes/,
        include: /\/includes/,
        exclude: /\/excludes/,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.* statements
          },
          output: {
            comments: false, // Remove comments from the output file
          },
        },
      }),
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
    lazy: true,
    telemetry: false,
   
      },
        buildModules: ['nuxt-compress'],
})
