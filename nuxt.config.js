export default {
  // serverMiddleware: [
  //   { path: '/liqpay/success', handler: '~/middleware/payment.js' },
  // ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Gold Auto',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/styles/main.scss',
    '@/styles/styles.css',
    '@/styles/custom.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-cache.js', mode: 'client' },
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/moment.js', mode: 'client' },
    { src: '~plugins/v-mask.js', mode: 'client' },
    '~/plugins/auth-interceptor.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  /*
   ** Environment variables
   */
  env: {
    grantType: 'password',
    grantTypeRefreshToken: 'refresh_token',
    appHost: process.env.CLIENT_URI_PROD,
    apiHost: process.env.API_ENDPOINT,
    telegramUrl: process.env.TELEGRAM_URL,
    auth_endpoint: process.env.AUTH_ENDPOINT
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ffe400',
    height: '5px'
  },
  /*
   ** Auth settings
   */
  auth: {
    strategies: {
      local: {
        scheme: 'local',
        token: {
          property: 'access_token',
          global: true,
          type: 'Bearer'
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/csws/authorize', method: 'post' },
          logout: false,
          user: { url: '/csws/cs/user', method: 'get' }
        }
      }
    },
    localStorage: {
      prefix: 'gold_avto.'
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],
  bootstrapVue: {
    icons: true
  },
  axios: {
    baseURL: 'https://dev.sto.sumy.ua',
    proxy: true
  },
  proxy: {
    '/csws': {
      target: 'http://95.217.38.198/csws',
      changeOrigin: true,
      pathRewrite: { '^/csws': '/' },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    // '/api': {
    //   target: 'https://api.sto.sumy.ua/api',
    //   changeOrigin: true,
    //   pathRewrite: { '^/api': '/' },
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    transpile: [
      'defu'
    ]
  },
  server: {
    host: '0.0.0.0'
  }
}
