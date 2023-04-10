import moment from "moment";


export const state = () => ({
  availableTimes: [],
});

export const getters = {
  getAvailableTimes(state, getters) {
    return state.availableTimes
  },
}
export const mutations = {
  setAvailableTimes(state, times) {
    state.availableTimes = times;
  },
};

export const actions = {
  async checkAvailableTime({ commit }, day) {
    // const today = moment();
    const dataList = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    // let sdate, edate;

    // if (day === "tomorrow") {
    //   sdate = edate = moment().add(1, "day");
    // } else {
    //   sdate = edate = moment();
    // }
    //
    // const url = `/csws/cs/stopost/99/${sdate.format("YYYY-MM-DD")}/${edate.format("YYYY-MM-DD")}`;
    //
    // const response = await fetch(url);
    // const dataTimes = await response.json();
    //
    // for (const time of dataTimes) {
    //   const t = moment(time.StartTime).format("H:mm");
    //   const index = dataList.indexOf(t);
    //
    //   if (index !== -1) {
    //     dataList.splice(index, 1);
    //   }
    // }
    //
    // if (sdate.isSame(today, "day")) {
    //   dataList.forEach((item, index) => {
    //     if (today.isSameOrAfter(moment(item, "H:mm"), "hour")) {
    //       dataList.splice(index, 1);
    //     }
    //   });
    // }

    commit("setAvailableTimes", dataList);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
