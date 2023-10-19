import {convertDateTimeToFormat, convertDateToFormat} from "~/helpers";
import moment from "moment";

export const state = () => ({
  historyList: [],
  actsList: [],
  act: {},
  cars: [],
  recommendationList: [],
  user: {}
})

export const getters = {
  getHistoryList(state, getters) {
    return state.historyList
  },
  getActsList(state) {
    return state.actsList
  },
  getCars({cars}) {
    return cars
  },
  getActDetail({act}) {
    return act
  },
  getAllJobsList(state, getters) {
    return getters.convertData(state.actsList)
  },
  convertData: () => (prWorks) => {
    const data = [];
    prWorks.forEach(prWork => {
      const works = prWork.Works.filter(
        item => item.Group === 'Выполнено' && item.WorkerName !== '1Дефектовано!'
      );

      const products = prWork.Products.map(item => ({
        ...item,
        Date: moment(prWork.Date).format('DD-MM-YYYY'),
      }));

      const {
        ID: prWorkId,
        CarOdometer,
        CarName,
        No: actId,
        RecType,
        StatusCode,
        Date: prWorkDate,
      } = prWork;

      data[prWorkId] = {
        works,
        products,
        date: moment(prWorkDate).format('dd-mm-YYYY'),
        year: moment(prWorkDate).format('YYYY'),
        CarOdometer,
        CarName,
        orderId: prWorkId,
        actId,
        RecType,
        status: StatusCode === 'A' ? 'Попередній' : '',
      };
    });

    return data;
  },
  getRecommendationList(state, getters) {
    return getters.convertRecommendationData(state.recommendationList)
  },
  convertRecommendationData: () => prWorks => {
    return prWorks.map(prWork => {
      const works = prWork.Works.filter(
        item =>
          (item.WorkerName === '1Дефектовано!' || item.Group === 'Комментарий') &&
          item.Group !== 'Наряд-заказ'
      ).map(item => ({
        ...item,
        Date: moment(prWork.Date).format('DD-MM-YYYY'),
      }));

      const products = prWork.Products.map(item => ({
        ...item,
        Date: moment(prWork.Date).format('DD-MM-YYYY'),
      }));

      return {
        works,
        products,
        date: moment(prWork.Date).format('DD-MM-YYYY'),
        year: moment(prWork.Date).format('YYYY'),
        CarOdometer: prWork.CarOdometer,
        CarName: prWork.CarName,
        orderId: prWork.ID,
        actId: prWork.No,
        RecType: prWork.RecType,
      };
    });
  },
  getUser({user}) {
    return user;
  }
}
export const mutations = {
  setHistoryList(state, list = []) {
    state.historyList = list
  },
  setActsList(state, list = []) {
    state.actsList = list
  },
  setRecommendationList(state, list = []) {
    state.recommendationList = list
  },
  setCars(state, list = []) {
    state.cars = list
  },
  setActDetail(state, act = {}) {
    state.act = act
  },
  setUser(state, user = {}) {
    state.user = user
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
  async fetchUser({commit}) {
    const response = await this.$axios.get('/csws/cs/user')
    const data = await response.data
    await this.$auth.setUser(data)
    commit('setUser', data)
  },
  async fetchActs({commit, state}) {
    const orders = state.historyList
    const dataPromises = orders.map(async (order) => {
      const no = order.No.replace(/\d/g, '');
      if (no === 'W' && (order.DocCode === 'A' || order.DocCode === 'F')) {
        const response = await this.$axios.get(`/csws/cs/history/${order.ID}/${order.RecType}`)
        return response.data;
      }
      return null;
    });
    const data = await Promise.all(dataPromises);
    const filteredData = data.filter((item) => item !== null)
    commit('setActsList', filteredData)
  },
  async fetchRecommendations({commit, state}) {
    const orders = state.historyList
    const dataPromises = orders.map(async (order) => {
      const no = order.No.replace(/\d/g, '');
      if (no === 'W') {
        const response = await this.$axios.get(`/csws/cs/history/${order.ID}/${order.RecType}`)
        return response.data;
      }
      return null;
    });
    const data = await Promise.all(dataPromises);
    const filteredData = data.filter((item) => item !== null)
    commit('setRecommendationList', filteredData)
  },
  async fetchActDetail({commit, state}, param) {
    const response = await this.$axios.get(
      `/csws/cs/history/${param.id}/4`
    )
    const act = await response.data
    commit('setActDetail', act)
  },
  async sendMessageToManager({commit, state}, message = {}) {
    try {
      const response = await this.$axios.post('/api/manager-connect',
        {message})
      const data = response.data
    } catch (e) {

    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
