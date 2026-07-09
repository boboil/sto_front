import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import time from './time'
import cart from './cart'
import talons from './talons'
import {cacheAction} from 'vuex-cache'
import storeListener from '@/plugins/storeListener'
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'
import router from 'vue-router'

Vue.use(Vuex)

export const state = () => ({
  auth: {
    token: null,
    user: null,
    loggedIn: false
  }
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  getUser(state) {
    return state.auth.user
  }
}

export const mutations = {
  setUser(state, user) {
    state.auth.user = user
  },
  setToken(state, token) {
    state.auth.token = token
    state.auth.loggedIn = true
  }
}

export const actions = {
  async logout() {
    await this.$auth.logout()
    this.$auth.redirect(AUTH_ROUTES.SIGN_IN)
  },
  async register({commit, dispatch}, {email, password, name, phone, recaptcha}) {
    try {
      const response = await this.$axios.post('/csws/cs/registration',
        {
          Email: phone,
          Name: name,
          Password: password,
          Phone1: phone
        });
      const status = response.status;
      if (status !== 200) {
        throw new Error('Something went wrong. Please try again.');
      }
      const telegramUrl = process.env.telegramUrl
      const text = `Нова реєстрація клієнта\nТелефон: ${phone}\nІмʼя: ${name}`
      const params = {chat_id: -1001576485245, text}
      await this.$axios.get(telegramUrl, {params});
    } catch (error) {
      // Handle registration error
      throw error;
    }
  },
  async loginClient({commit, dispatch}, {phone, password}) {
    try {
      const response = await this.$auth
        .loginWith('local', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3'
          },
          data: {
            username: phone,
            password: password,
            grant_type: 'password'
          },
          transformRequest(data, headers) {
            const queryParams = new URLSearchParams();
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                queryParams.append(key, data[key]);
              }
            }
            return queryParams.toString();
          }
        })
      const data = await response.data
      if (data && data.access_token) {
        this.$auth.ctx.$axios.setHeader(this.$auth.options.token.name, data.access_token)
        await this.$auth.setToken('local', data.access_token)
        await this.$axios.setToken(data.access_token || null)
      } else {
        console.error('Data object or access_token is not available');
      }
      await router.push(USER_ROUTES.USER_PROFILE.path)
    } catch (e) {
      // ...
    }
  },
  async fetchUser({commit, state, dispatch, $auth}) {
    const data = await this.$axios
      .get('/csws/cs/user')
    console.log(data)
    await this.$auth.setUser(data)
    commit('setUser', data)
  },
  fetchCachedData: cacheAction(
    async (
      {cache, commit},
      [moduleName, actionName, mutationName, params]
    ) => {
      const action = [moduleName, actionName].filter((v) => v).join('/')
      const mutation = [moduleName, mutationName].filter((v) => v).join('/')

      await cache.dispatch(action, params || {}).then((data) => {
        commit(mutation, data)
      })
    }
  ),
  clearAllCache: cacheAction(async ({cache}) => {
    cache.clear()
  }),
}

export const plugins = [storeListener]

export const modules = {
  user,
  time,
  cart,
  talons
}
export const strict = false
