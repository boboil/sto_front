import moment from "moment";
import {formatTime, formatDateForDiagnostic} from '@/helpers'
import {TIMES} from '@/constants'


export const state = () => ({
  availableTimes: [],
  timeList: []
});

export const getters = {
  getAvailableTimes(state, getters) {
    return state.availableTimes
  },
}
export const mutations = {
  setTimeList(state, times) {
    state.availableTimes = times;
  },
};

export const actions = {
  async checkAvailableTime({commit}, day) {
    const today = new Date();

    const isWeekend = (date) => date.getDay() === 6;

    const isTimePast = (time, currentDate) => {
      const [hour, minutes] = time.split(':').map(Number);
      return (
        currentDate.getDate() === today.getDate() &&
        (
          today.getHours() > hour ||
          (today.getHours() === hour && today.getMinutes() >= minutes)
        )
      );
    };

    if (isWeekend(today)) {
      return [];
    }

    let selectedDate = new Date(today);
    if (day === 'tomorrow') {
      selectedDate.setDate(today.getDate() + 1);
    }

    const url = `/csws/cs/stopost/99/${formatDateForDiagnostic(selectedDate)}/${formatDateForDiagnostic(selectedDate)}`;
    const {data: bookedTimesData} = await this.$axios.get(url);

    const isTimeBooked = (time) => {
      const formattedTime = formatTime(new Date(time.StartTime));
      return TIMES.includes(formattedTime);
    };

    const availableTimes = TIMES.filter(time => {
      return !isTimePast(time, selectedDate) && !bookedTimesData.some(isTimeBooked);
    });
    commit('setTimeList', availableTimes);
  },
  async fetchCalendarTime({commit}, day) {
    const response = await this.$axios.get(
      `https://cabinet.sto.sumy.ua/api/google-available-time/${day}`
    )
    const data = await response.data
    commit('setTimeList', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
