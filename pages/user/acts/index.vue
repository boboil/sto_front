<template>
  <div>
    <Header/>
    <main id="acts_works">
      <section class="block-work-acts">
        <div class="wrap">
          <h1 class="block-title">
            Акти виконаних робіт
          </h1>
          <div class="block-head-controls">
            <!-- <form class="search">
                <input type="text" placeholder="Поиск...">
                <button type="submit"></button>
            </form> -->
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
            <div class="work-acts-year" v-for="year in reversedKeys(dividedActList)" :key="year">
              <div class="work-acts-year-title">
                {{ year }}
              </div>
              <div class="work-acts-year-list">
                <div class="list-inner">
                  <div v-for="(act, index) in dividedActList[year]" class="act-item">
                    <NuxtLink
                      :to="`${USER_ROUTES.USER_ACTS.path}/${act.ID}`"
                      :key="index"
                    >
                      <div class="subtitle status" v-if="act.StatusCode === 'Попередній'">
                        <b>Попередній</b>
                      </div>
                      <div class="value"></div>
                      <div class="subtitle">
                        Акт №
                      </div>
                      <div class="value">
                        {{ act.No }}
                      </div>
                      <div class="subtitle">
                        Дата:
                      </div>
                      <div class="value">
                        {{ convertDateToFormat(new Date(act.Date)) }}
                      </div>
                      <div class="subtitle">
                        Пробіг:
                      </div>
                      <div class="value">
                        {{ act.CarOdometer }}
                      </div>
                      <div class="subtitle">
                        Авто:
                      </div>
                      <div class="value">
                        {{ act.CarName }}
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-info mt-4" onclick="$router.push('/talons')">
            Хочете знижки на популярні послуги, тисніть!
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Header from "~/components/Common/Layout/Header"
import {USER_ROUTES} from "~/constants"
import {convertDateToFormat, reversedKeys} from '@/helpers'

export default {
  name: "Talons",
  components: {Header},
  async fetch({store, params, route, $auth}) {
    await store.dispatch('user/fetchCars')
  },
  data() {
    return {
      convertDateToFormat,
      reversedKeys,
      filteredList: [],
      selectedCar: 0
    }
  },
  computed: {
    USER_ROUTES() {
      return USER_ROUTES
    },
    ...mapGetters({
      actsList: 'user/getActsList',
      cars: 'user/getCars'
    }),
    dividedActList() {
      return this.filteredList.reduce((acc, item) => {
        const date = item.Date.substring(0, 4)
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(item)
        return acc
      }, {});
    }
  },
  methods: {
    useTalon() {

    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.actsList
        return
      }
      const car = this.cars.find(car => car.ID === this.selectedCar)
      this.filteredList = this.actsList.filter(act => {
        return act.CarName.includes(car.RegistrationNo);
      })
    }
  },
  created() {
    this.filteredList = this.actsList
  }
}
</script>

<style lang="scss" scoped>
.act-item {
  min-width: 250px;
}
</style>
