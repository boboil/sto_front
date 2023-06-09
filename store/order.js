import moment from "moment";
import {formatDate} from '@/helpers'

export const state = () => ({
  order: {},
  message: {},
  onlineJobs: [],
  jobs: [],
  cancelJobs: [],
  talons: [],
  allTalons: []
});

export const getters = {
  getAvailableTimes(state, getters) {
    return state.availableTimes
  },
  getOnlineJobs(state, getters) {
    return getters.convertDataForOnlineJobs(state.jobs)
  },
  getCancelJobs(state, getters) {
    return getters.convertDataForCancelJobs(state.jobs)
  },
  convertDataForCancelJobs: () => (prWorks) => {
    const cancelJobs = {};

    prWorks.forEach(prWork => {
      if (prWork.Delivery === 'Відмовлено_клієнтом' && prWork.StatusCode === 'A') {
        const works = prWork.Works.map(item => ({
          ...item,
          Date: formatDate(prWork.Date),
        }));

        const products = prWork.Products
          .filter(item => item.Group !== 'НЕ_відображати_в_кабінеті')
          .map(item => ({
            ...item,
            Date: formatDate(prWork.Date),
          }));

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
        };
      }
    });

    return cancelJobs;
  },
  convertDataForOnlineJobs: () => (prWorks) => {
    const jobs = {};

    prWorks.forEach(prWork => {
      const works = prWork.Works.map(item => ({
        ...item,
        Date: formatDate(prWork.Date),
      }));

      const products = prWork.Products
        .filter(item => item.Group !== 'НЕ_відображати_в_кабінеті')
        .map(item => ({
          ...item,
          Date: formatDate(prWork.Date),
        }));

      if (prWork.StatusCode !== 'A') {
        const deliveryMapping = {
          'Все_замовити': 'Вже погоджено клієнтом',
          'Додано_в_видаткову': 'Вже погоджено клієнтом',
          'На_погодженні': 'Натисніть для підтвердження замовлення',
          'ОПРАЦЬОВАНО_СКЛАДОМ': 'Опрацьовуємо, трішки зачекайте',
          'Очікуємо_на_склад': 'Вже погоджено клієнтом',
          'Процінити': 'Опрацьовуємо, трішки зачекайте',
          'Частково_замовити': 'Вже погоджено клієнтом',
          'Опрацьовано_складом': 'Опрацьовуємо, трішки зачекайте',
          '': 'Опрацьовуємо, трішки зачекайте',
        };

        const delivery = deliveryMapping[prWork.Delivery] || 'Опрацьовуємо, трішки зачекайте';
        const color = prWork.Delivery === 'На_погодженні' ? 'green' : undefined;

        jobs[prWork.ID] = {
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
          delivery,
          color,
        };
      }
    });

    return jobs;
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

    return allTickets;
  },
  getAllTalons({ allTalons }) {
    return allTalons
  },
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
  }
};

export const actions = {
  async createDiagnosticOrder({commit, dispatch}, params = {}) {
    try {
      await this.$axios.post('/csws/cs/order', JSON.stringify(params))

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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
