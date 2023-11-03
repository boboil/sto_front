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
                  <template v-for="recommendation in filteredList">
                    <template v-for="works in recommendation.works">
                      <div class="work-date-distance first-row" :key="works.actId">
                        <b>{{ recommendation.date }}</b>
                        <span>{{ recommendation.CarOdometer }} км</span>
                        <span>{{ recommendation.CarName }}</span>
                      </div>
                      <div class="work-name first-row">
                        {{ works.Name }}
                        <template v-if="works.Notes">
                          <br>Примітка:
                          <small>{{ works.Notes }}</small>
                        </template>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
              <button v-if="!isShowAllRec" type="button" class="btn btn-info show-more" @click="showAllRec">
                Показати всі
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from '@/components/Common/Layout/Header'

export default {
  name: "Recommendations",
  components: {Header},
  async asyncData({store}) {
    await store.dispatch('user/fetchHistoryList')
    await store.dispatch('user/fetchRecommendations')
    await store.dispatch('user/fetchCars')
  },
  data() {
    return {
      filteredList: [],
      selectedCar: 0,
      showAll: [],
      isShowAllRec: false
    }
  },
  computed: {
    ...mapGetters({
      recommendations: 'user/getRecommendationList',
      cars: 'user/getCars'
    }),
  },
  methods: {
    showAllRec() {
      this.isShowAllRec = !this.isShowAllRec
      this.filteredList = this.recommendations
    },
    filterRecentEvents(dataObjects) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      return dataObjects.filter(obj => {
        const rootDate = new Date(obj.date.split('-').reverse().join('-'))

        if (rootDate >= threeMonthsAgo) {
          return true
        }
        const recentWorks = obj.works.some(work => {
          const workDate = new Date(work.Date.split('-').reverse().join('-'))
          return workDate >= threeMonthsAgo;
        });

        if (recentWorks) {
          return true
        }
        return obj.products.some(product => {
          const productDate = new Date(product.Date.split('-').reverse().join('-'))
          return productDate >= threeMonthsAgo
        });
      })
    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.recommendations
        return
      }
      const car = this.cars.find(car => car.ID === this.selectedCar)
      this.filteredList = this.recommendations.filter(act => {
        if (car.RegistrationNo === null) {
          return false
        }
        return act.CarName && act.CarName.includes(car.RegistrationNo)
      })
    }
  },
  created() {
    this.filteredList = this.filterRecentEvents(this.recommendations)
  }
}
</script>

<style scoped>
.work-item {
  display: flex;

  .work-date-distance {
    padding-right: 10px;
  }
}
</style>
