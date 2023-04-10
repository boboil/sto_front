import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import time from './time'
import cart from './cart'
import {cacheAction} from 'vuex-cache'
import storeListener from '@/plugins/storeListener'
import { AUTH_ROUTES } from '@/constants'

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
  async nuxtServerInit({commit, state, dispatch}, {req, res, redirect}) {
    if (req.headers.cookie && !state.auth.loggedIn) {
      await this.$auth.logout()
    } else {
      try {
        await dispatch('fetchUser')
        await this.$auth.init()
      } catch (err) {
        await this.$auth.reset()
      }
    }
  },
  async logout() {
    await this.$auth.logout()
    this.$auth.redirect(AUTH_ROUTES.SIGN_IN)
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
  cart
}
export const strict = false
