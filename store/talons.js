import Swal from 'sweetalert2';

export const state = () => ({

});

export const getters = {

}
export const mutations = {

};

export const actions = {
  async useTalon({commit}, params) {
    const resp = await this.$axios.post('https://api.sto.sumy.ua/api/api-user-talon', params)
    await Swal.fire({
      title: 'Дякуємо!',
      text: resp.data.message,
      icon: 'success'
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
