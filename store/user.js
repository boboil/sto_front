export const state = () => ({
  historyList: [],
  item: {},
  actsList: [],
  act: {},
  cars: []
})

export const getters = {
  getHistoryList(state, getters) {
    return state.historyList
  },
  getItem(state) {
    return state.item
  },
  getActsList(state) {
    return state.actsList
  },
  getCars({cars}) {
    return cars
  },
  getActDetail({act}) {
    return act
  }
}
export const mutations = {
  setHistoryList(state, list = []) {
    state.historyList = list
  },
  setActsList(state, list = []) {
    state.actsList = list
  },
  setItem(state, item = {}) {
    state.item = item
  },
  setCars(state, list = []) {
    state.cars = list
  },
  setActDetail(state, act = {}) {
    state.act = act
  }
}

export const actions = {
  async fetchHistoryList({commit}) {
    const response = await this.$axios.get('/csws/cs/history')
    const data = await response.data
    commit('setHistoryList', data)
  },
  async fetchCars({commit}) {
    const response = await this.$axios.get('/csws/cs/usercars')
    const data = await response.data
    commit('setCars', data)
  },
  async fetchActs({commit, state}, orders) {
    const data = []
    orders.map(async (order) => {
      const no = order.No.replace(/\d/g, '');
      if (no === 'W' && (order.DocCode === 'A' || order.DocCode === 'F')) {
        let response = await this.$axios.get(`/csws/cs/history/${order.ID}/${order.RecType}`)
        data.push(await response.data)
      }
    })

    commit('setActsList', data)
  },
  async fetchActDetail({commit, state}, param) {
    const response = await this.$axios.get(
      `/csws/cs/history/${param.id}/4`
    )
    const act = await response.data
    commit('setActDetail', act)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
