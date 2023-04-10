export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gold_avto',
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
    { src: '~/plugins/moment.js', mode: 'client' }
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
    appHost: process.env.CLIENT_URI,
    apiHost: process.env.API_ENDPOINT
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ffe400',
    height: '2px'
  },
  /*
   ** Auth settings
   */
  auth: {
    strategies: {
      local: {
        scheme: '@/schemes/localScheme',
        endpoints: {
          login: {
            url: process.env.AUTH_ENDPOINT,
            method: 'post',
            propertyName: 'access_token',
          },
          logout: false,
          user: { url: '/csws/cs/user', method: 'get', property: false },
          autoFetchUser: false
        },
        tokenRequired: true,
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          storage: 'localStorage',
          maxAge: 1800,
        },
      },
    },
    redirect: {
      logout: '/',
      user: '/user/profile',
      callback: '/'
    },
    autoFetchUser: false,
    localStorage: true,
    watchLoggedIn: false
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/csws': {
      target: 'http://95.217.38.198/csws',
      changeOrigin: true,
      pathRewrite: { '^/csws': '/' },
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    transpile: [
      'defu'
    ]
  },
  server: {
    host: '0.0.0.0' // default: localhost
  }
}
