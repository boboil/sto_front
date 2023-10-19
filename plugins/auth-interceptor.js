import nuxtConfig from '~/nuxt.config.js';

export default function (context) {
  const { $axios } = context;
  const loginUrl = nuxtConfig.auth.strategies.local.endpoints.login.url;

  $axios.onRequest((config) => {
    if (config.url === loginUrl) {
      const queryParams = new URLSearchParams();
      for (const key in config.data) {
        if (config.data.hasOwnProperty(key)) {
          queryParams.append(key, config.data[key]);
        }
      }
      config.data = queryParams;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  });
}
