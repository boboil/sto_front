<template>
  <div>
    <Header/>
    <main id="all_works">
      <section class="block-all-works">
        <div class="wrap">
          <h1 class="block-title">
            Рекомендації
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
          <div class="all-works-table">
            <div class="table-head">
              <div class="head-column-group">
                <div class="head-column">
                  Дата/Пробіг
                </div>
                <div class="head-column red">
                  Рекомендуємо
                </div>
              </div>
            </div>
            <div class="table-body">
              <div class="work-item">
                <div class="work-item-content">
                  <template v-for="(recommendation, index) in filteredList">
                    <div class="work-date-distance first-row" :key="index">
                      <b>{{ recommendation.Date }}</b>
                      <span>{{ recommendation.CarOdometer }} км</span>
                      <span>{{ recommendation.CarName }}</span>
                    </div>
                    <div class="work-name first-row" v-for="works in recommendation.works">
                      {{ works.Name }}
                      <template v-if="works.Notes">
                        <br>Примітка:
                        <small>{{works.Notes}}</small>
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Header from "~/components/Common/Layout/Header";
import {mapGetters} from "vuex";

export default {
  name: "Talons",
  components: {Header},
  async fetch({store, params, route, $auth}) {
    await Promise.all([
      store.dispatch('user/fetchRecommendations'),
      store.dispatch('user/fetchCars')
    ])
  },
  data() {
    return {
      filteredList: [],
      selectedCar: 0,
      showAll: []
    }
  },
  computed: {
    ...mapGetters({
      recommendations: 'user/getRecommendationList',
      cars: 'user/getCars'
    }),
  },
  methods: {
    useTalon() {

    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.recommendations
        return
      }
      const car = this.cars.find(car => car.ID === this.selectedCar)
      this.filteredList = this.recommendations.filter(act => {
        return act.CarName.includes(car.RegistrationNo);
      })
    }
  },
  created() {
    this.filteredList = this.recommendations
  }
}
</script>

<style scoped>

</style>
