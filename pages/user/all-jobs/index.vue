<template>
  <div>
    <Header/>
    <main id="all_works">
      <section class="block-all-works">
        <div class="wrap">
          <h1 class="block-title">
            Вся історія
          </h1>
          <small>Введіть часткову назву роботи або деталі та
            відобразиться вся історія, пов'язана з цією
            назвою
          </small>
          <div class="block-head-controls">
            <div class="type-selector">
              <select id="select_car" @change="filteredCars" v-model="selectedCar">
                <option value="0">Усі машини</option>
                <option :value="car.ID" v-for="car in cars">
                  {{ car.RegistrationNo }} &#x20;&#x20; {{ car.Brand }} {{ car.Model }}
                </option>
              </select>
            </div>
            <form class="search mt-3">
              <input type="text" placeholder="Пошук...">
              <button type="submit"></button>
            </form>
          </div>
          <div class="all-works-table">
            <div class="table-head">
              <div class="head-column-group">
                <div class="head-column">
                  Дата/Пробіг
                </div>
                <div class="head-column">
                  Назва
                </div>
              </div>
              <div class="head-column">
                Кількість<br/> замін
              </div>
            </div>
            <div class="table-body">
              <div
                v-for="(data, key) in works"
                class="work-item"
                :class="showAll.includes(parseInt(key)) && 'open'"
              >
                <div class="work-item-content">
                  <template v-for="(work, index) in data">
                    <div class="work-date-distance"
                         :class="index === 0 && 'first-row'"
                         :key="index"
                    >
                      <span class="blue">
                        <b>Виконано</b>
                        <i class="fas fa-tools"></i>
                      </span>
                      <span>
                      {{ work.Date }}
                    </span>
                      <span>
                      {{ work.CarOdometer }} км
                    </span>
                      <span>{{ work.CarName }}</span>
                    </div>
                    <div class="work-name"
                         :class="index === 0 && 'first-row'"
                         v-show="index === 0"
                    >
                      {{ work.Name }}
                      <button v-if="data.length > 1" @click="showFull(work.ID)">
                        раніше
                      </button>
                    </div>
                  </template>
                </div>
                <div class="work-item-progress">
                  <!-- <span>Всего замен: </span> -->
                  <b>{{ data.length }}</b>
                </div>
              </div>
              <div
                v-for="(data, key) in products"
                class="work-item"
                :class="showAll.includes(parseInt(key)) && 'open'"
              >
                <div class="work-item-content">
                  <template v-for="(product, index) in data">
                    <div class="work-date-distance"
                         :class="index === 0 && 'first-row'"
                         :key="index"
                    >
                      <span class="green">
                        <b>Деталь</b>
                        <i class="fa fa-cog" aria-hidden="true"></i>
                      </span>
                      <span>
                      {{ product.Date }}
                    </span>
                      <span>
                      {{ product.CarOdometer }} км
                    </span>
                      <span>{{ product.CarName }}</span>
                    </div>
                    <div class="work-name"
                         :class="index === 0 && 'first-row'"
                         v-show="index === 0"
                    >
                      {{ product.Name }}
                      <button v-if="data.length > 1" @click="showFull(product.ID)">
                        раніше
                      </button>
                    </div>
                  </template>
                </div>
                <div class="work-item-progress">
                  <!-- <span>Всего замен: </span> -->
                  <b>{{ data.length }}</b>
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
import Header from "~/components/Common/Layout/Header.vue";
import {mapGetters} from "vuex";
import moment from "moment";
import {dividedActList} from "~/helpers";

export default {
  name: "allJobs",
  components: {Header},
  async fetch({store, params, route, $auth}) {
    await store.dispatch('user/fetchHistoryList')
    await store.dispatch('user/fetchActs')
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
    ...mapGetters({
      cars: 'user/getCars',
      jobs: 'user/getAllJobsList'
    }),
    works() {
      const data = this.filteredList.flatMap(job => {
        return job.works.map(work => {
          return {
            ...work,
            CarName: job.CarName,
            RegistrationNo: job.CarName ? job.CarName.split(' ')[0] : 'Інше авто',
            CarOdometer: job.CarOdometer,
            Date: moment(job.Date).format('dd-mm-YY'),
            Variant: 'W',
          }
        })
      })
      return dividedActList(data, 'ID')
    },
    products() {
      const data = this.jobs.flatMap(job => {
        return job.products.map(product => {
          return {
            ...product,
            CarName: job.CarName,
            RegistrationNo: job.CarName.split(' ')[0],
            CarOdometer: job.CarOdometer,
            Date: moment(job.Date).format('dd-mm-YY'),
            Variant: 'W',
          }
        })
      })
      return dividedActList(data, 'ID')
    },
  },
  methods: {
    useTalon() {

    },
    showFull(id) {
      if (!this.showAll.includes(id)) {
        this.showAll.push(id)
      }
    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.jobs
        return
      }
      const car = this.cars.find(car => car.ID === this.selectedCar)
      this.filteredList = this.jobs.filter(act => {
        if (car.RegistrationNo === null) {
          return false
        }
        return act.CarName && act.CarName.includes(car.RegistrationNo)
      })
    }
  },
  created() {
    this.filteredList = this.jobs
  }
}
</script>

<style lang="scss" scoped>
.all-works-table {
  .table-head {
    padding-right: 68px;
    display: grid;
    grid-template-columns: 3fr 2fr;
  }
}
</style>
