

export const state = () => ({

});

export const getters = {

}
export const mutations = {

};

export const actions = {
  async useTalon({commit}, params) {
    await this.$axios.post('https://api.sto.sumy.ua/api/api-user-talon', params)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
