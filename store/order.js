import moment from "moment";
import {formatDate} from '@/helpers'

export const state = () => ({
  order: {},
  message: {},
  onlineJobs: [],
  jobs: [],
  cancelJobs: [],
  talons: [],
  allTalons: [],
  singleJob: {}
});

export const getters = {
  getAvailableTimes(state) {
    return state.availableTimes
  },
  getJobs(state) {
    return state.jobs
  },
  getSingleJob(state) {
    return state.singleJob
  },
  getOnlineJobs(state, getters) {
    return getters.convertDataForOnlineJobs(state.jobs)
  },
  convertDataForOnlineJobs: () => (jobs) => {
    const onlineJobs = {}
    jobs.forEach((prWork) => {
      if (prWork.StatusCode !== 'A') {
        const works = prWork.Works.map((item) => ({
          ...item,
          Date: moment(prWork.Date).format('DD-MM-YYYY'),
        }))

        const products = prWork.Products.filter((item) => item.Group !== 'НЕ_відображати_в_кабінеті')
          .map((item) => ({
            ...item,
            Date: moment(prWork.Date).format('DD-MM-YYYY'),
          }))

        onlineJobs[prWork.ID] = {
          works,
          products,
          date: moment(prWork.Date).format('DD-MM-YYYY'),
          year: moment(prWork.Date).format('YYYY'),
          CarOdometer: prWork.CarOdometer,
          CarName: prWork.CarName,
          orderId: prWork.ID,
          actId: prWork.No,
          No: prWork.No.replace(/[a-z]/gi, ''),
          RecType: prWork.RecType,
          status: prWork.StatusCode,
          delivery: prWork.Delivery
        }
      }
    })
    return onlineJobs
  },
  getCancelJobs(state, getters) {
    return getters.convertDataForCancelJobs(state.jobs)
  },
  convertDataForCancelJobs: () => (prWorks) => {
    const cancelJobs = {};
    prWorks.forEach((prWork) => {
      if (prWork.Delivery === 'Відмовлено_клієнтом' && prWork.StatusCode === 'A') {
        const works = prWork.Works.map((item) => ({
          ...item,
          Date: moment(prWork.Date).format('DD-MM-YYYY'),
        }))

        const products = prWork.Products.filter((item) => item.Group !== 'НЕ_відображати_в_кабінеті')
          .map((item) => ({
            ...item,
            Date: moment(prWork.Date).format('DD-MM-YYYY'),
          }))

        cancelJobs[prWork.ID] = {
          works,
          products,
          date: moment(prWork.Date).format('DD-MM-YYYY'),
          year: moment(prWork.Date).format('YYYY'),
          CarOdometer: prWork.CarOdometer,
          CarName: prWork.CarName,
          orderId: prWork.ID,
          actId: prWork.No,
          No: prWork.No.replace(/[a-z]/gi, ''),
          RecType: prWork.RecType,
          status: prWork.StatusCode,
          delivery: 'Відмовлено клієнтом'
        }
      }
    })

    return cancelJobs
  },
  getTalons(state, getters) {
    return getters.processTickets(state.talons)
  },
  processTickets: () => (talons) => {
    const allTickets = [];
    const works = [];

    talons.forEach((item) => {
      item.Works.forEach((work) => {
        work.Date = item.Date;
        work.Year = moment(item.Date).format("Y");
        work.usage = false;
        work.unusedCount = work.Quantity;
        work.usedCount = 0;
        works.push(work);
      });
    });

    const tickets = works.filter((work) => work.Group === "Талони");
    const executedWorks = works.filter((work) => work.Group === "Выполнено");

    tickets.forEach((ticket) => {
      const itemIndex = allTickets.findIndex((t) => t.ID === ticket.ID);

      if (itemIndex === -1) {
        allTickets.push(ticket);
      } else {
        allTickets[itemIndex].Quantity += ticket.Quantity;
        allTickets[itemIndex].unusedCount += ticket.Quantity;
      }
    });

    executedWorks.forEach((work) => {
      allTickets.forEach((ticket) => {
        const pos = work.Description.includes(ticket.Code);

        if (pos) {
          ticket.usage = true;
          ticket.DateUsage = moment(work.Date).format("DD-MM-YYYY");
          ticket.usedCount += work.Quantity;
          ticket.unusedCount -= work.Quantity;
        }
      });
    });

    return allTickets
  },
  getAllTalons({ allTalons }) {
    return allTalons
  }
}
export const mutations = {
  setAvailableTimes(state, times) {
    state.availableTimes = times;
  },
  setOnlineJobs(state, orders) {
    state.jobs = orders
  },
  setJobs(state, jobs) {
    state.jobs = jobs;
  },
  setCancelJobs(state, cancelJobs) {
    state.cancelJobs = cancelJobs;
  },
  setTalons(state, talons) {
    state.talons = talons;
  },
  setAllTalons(state, talons) {
    state.allTalons = talons;
  },
  setSingleJob(state, singleJob) {
    state.singleJob = singleJob;
  },
};

export const actions = {
  async createDiagnosticOrder({commit, dispatch}, data = {}) {
    try {
      await this.$axios.post('/api/add-diagnostic-order', data)
    } catch (e) {

    }
  },
  async prepareDataForOnline({commit, rootState}) {
    const orders = rootState.user.historyList
    const data = [];
    try {
      for (const order of orders) {
        const no = order.No.replace(/\d/g, '');
        if (no === 'Z') {
          const orderUrl = `/csws/cs/history/${order.ID}/${order.RecType}`;
          const workResponse = await this.$axios.get(orderUrl);
          const work = workResponse.data;
          data.push(work);
        }
      }
      commit('setJobs', data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDataOneJob({commit}, {id,recType}) {
    try {
      const orderUrl = `/csws/cs/history/${id}/${recType}`;
      const response = await this.$axios.get(orderUrl);
      const data = response.data;
      commit('setSingleJob', data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDataForTalons({commit, rootState}) {
    const orders = rootState.user.historyList
    const data = [];
    try {
      for (const order of orders) {
        const no = order.No.replace(/\d/g, '');
        if (no === 'W') {
          const orderUrl = `/csws/cs/history/${order.ID}/${order.RecType}`;
          const workResponse = await this.$axios.get(orderUrl);
          const work = workResponse.data;
          data.push(work);
        }
      }
      commit('setTalons', data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchAllTalons({commit}) {
    const workResponse = await this.$axios.get('/csws/cs/workgroup/63');
    const talons = workResponse.data;
    commit('setAllTalons', talons);
  },
  async createPrepay({commit, dispatch}, prams = {}) {
    try {
      const response = await this.$axios.post('/api/pre-pay', prams)
      const data = response.data
      window.location.href = data.url;
    } catch (e) {

    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
