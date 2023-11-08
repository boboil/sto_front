<template>
  <div>
    <Header/>
    <main id="acts_works">
      <section class="block-work-acts">
        <div class="wrap">
          <h1 class="block-title">
            Зараз в роботі
          </h1>
          <div class="block-head-controls">
            <div class="type-selector">
              <select id="select_car" @change="filteredCars" v-model="selectedCar">
                <option value="0">Усі машини</option>
                <option :value="car.ID" v-for="car in cars">
                  {{ car.RegistrationNo }} &#x20;&#x20; {{ car.Brand }} {{ car.Model }}
                </option>
              </select>
            </div>
          </div>

          <div class="work-acts-chronology">
            <div class="work-acts-year">
              <template v-if="jobsNotEmpty">
                <div class="work-acts-year-title">
                  Зараз в роботі
                </div>
                <div class="work-acts-year-list">
                  <div class="list-inner">
                    <NuxtLink
                      v-for="job in filteredList"
                      :key="job.orderId"
                      :to="`online-jobs/${job.orderId}?recType=${job.RecType}`"
                      class="act-item active"
                     >
                      <div class="subtitle"></div>
                      <div class="subtitle">Авто:</div>
                      <div class="value">{{ job.CarName }}</div>
                      <div class="subtitle">Дата:</div>
                      <div class="value">{{ job.date }}</div>
                      <div class="subtitle">№:</div>
                      <div class="value">{{ job.No }}</div>
                      <div class="subtitle">Статус:</div>
                      <div :class="['value', job.color || 'blue']">{{ handleDeliveryStatus(job.delivery) }}</div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
              <template v-else>
                Зараз в роботі нічого немає
              </template>
            </div>
            <div class="work-acts-year">
              <template v-if="!cancelJobsNotEmpty">
                <div class="work-acts-year-title">
                  Скасовані
                </div>
                <div class="work-acts-year-list">
                  <div class="list-inner">
                    <NuxtLink
                      v-for="job in cancelJobs"
                      :key="job.orderId"
                      :to="`online-jobs/${job.orderId}?recType=${job.RecType}`"
                      class="act-item canceled"
                    >
                      <div class="subtitle"></div>
                      <div class="subtitle">Авто:</div>
                      <div class="value">{{ job.CarName }}</div>
                      <div class="subtitle">Дата:</div>
                      <div class="value">{{ job.date }}</div>
                      <div class="subtitle">№:</div>
                      <div class="value">{{ job.No }}</div>
                      <div class="subtitle">Статус:</div>
                      <div :class="['value', job.color || 'blue']">{{ handleDeliveryStatus(job.delivery) }}</div>
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <button type="button" class="btn btn-info mt-4" @click="$router.push(USER_ROUTES.USER_TALONS.path)">
            Хочете знижки на популярні послуги, тисніть!
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Header from '@/components/Common/Layout/Header'
import {USER_ROUTES} from '@/constants'
import {handleDelivery} from '@/helpers'

export default {
  name: "OnlineJob",
  components: {Header},
  async asyncData({store}) {
    await store.dispatch('order/prepareDataForOnline')
    await store.dispatch('user/fetchCars')
  },
  data() {
    return {
      filteredList: [],
      selectedCar: 0,
      showAll: []
    }
  },
  computed: {
    USER_ROUTES() {
      return USER_ROUTES
    },
    ...mapGetters({
      cancelJobs: 'order/getCancelJobs',
      onlineJobs: 'order/getOnlineJobs',
      cars: 'user/getCars'
    }),
    jobsNotEmpty() {
      return Object.values(this.onlineJobs).length > 0
    },
    cancelJobsNotEmpty() {
      return this.cancelJobs.length > 0
    },
  },
  methods: {
    initFilter() {
      this.filteredList = Object.values(this.onlineJobs)
    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.onlineJobs
        return
      }
      const car = this.cars.find(car => car.ID === this.selectedCar)
      this.filteredList = Object.values(this.onlineJobs).filter(act => {
        return act.CarName.includes(car.RegistrationNo)
      })
    },
    handleDeliveryStatus(deliveryStatus) {
      const { delivery } = handleDelivery(deliveryStatus)
      return delivery
    }
  },
  mounted() {
    this.initFilter()
  }
}
</script>

<style scoped>

</style>
