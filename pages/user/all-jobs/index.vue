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
                <option :value="car.ID" v-for="car in cars">
                  {{ car.RegistrationNo }} &#x20;&#x20; {{ car.Brand }} {{ car.Model }}
                </option>
              </select>
            </div>
            <form class="search mt-3" @submit.prevent="search">
              <input v-model="fields.searchInput" @input="search" type="text" placeholder="Пошук...">
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
                v-for="(data, key) in combineProductsWorks"
                class="work-item"
                :class="showAll.includes(parseInt(key)) && 'open'"
                :key="`combineProductsWorks_${key}`"
              >
                <div class="work-item-content">
                  <template v-for="(work, index) in isArrayReverce(data, key)">
                    <div class="work-date-distance"
                         :class="index === 0 && 'first-row'"
                         :key="`grouped_${index}`"
                    >
                      <span v-if="work.product" class="green">
                        <b>Деталь</b>
                        <b-icon icon="gear-wide-connected" class="icon"/>
                      </span>
                      <span v-else class="blue">
                        <b>Виконано</b>
                        <b-icon icon="tools" class="icon"/>
                      </span>
                      <span>
                      {{ work.Date }}
                    </span>
                      <span>
                      {{ work.CarOdometer }} км
                    </span>
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
import {mapGetters} from "vuex"
import Header from "@/components/Common/Layout/Header"
import {dividedActList} from "@/helpers"

export default {
  name: "allJobs",
  components: {Header},
  async fetch({store}) {
    await store.dispatch('user/fetchHistoryList')
    await store.dispatch('user/fetchCars')
  },
  data() {
    return {
      filteredList: [],
      selectedCar: 0,
      showAll: [],
      fields: {
        searchInput: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      cars: 'user/getCars',
      jobs: 'user/getAllJobsList'
    }),
    works() {
      return this.filteredList.flatMap(job => {
        return job.works.map(work => {
          return {
            ...work,
            CarName: job.CarName,
            RegistrationNo: job.CarName ? job.CarName.split(' ')[0] : 'Інше авто',
            CarOdometer: job.CarOdometer,
            Variant: 'W',
          }
        })
      })
    },
    products() {
      return this.filteredList.flatMap(job => {
        return job.products.map(product => {
          return {
            ...product,
            CarName: job.CarName,
            RegistrationNo: job.CarName ? job.CarName.split(' ')[0] : 'Інше авто',
            CarOdometer: job.CarOdometer,
            Variant: 'W',
          }
        })
      })
    },
    combineProductsWorks() {
      const combine = this.filteredList.flatMap(job => {
        return [
          ...job.works.map(
            work => ({
              ...work,
              work: true,
              product: false,
              CarID: job.CarID,
              CarOdometer: job.CarOdometer,
              Variant: 'W'
            })),
          ...job.products.map(
            product => ({
              ...product,
              product: true,
              work: false,
              CarID: job.CarID,
              CarOdometer: job.CarOdometer,
              Variant: 'W'
            }))
        ]
      })
      return dividedActList(combine, 'ID')
    }
  },
  methods: {
    isArrayReverce(data) {
      const sorted = data.sort((a, b) => {
        const dateA = a.Date.split('/').reverse().join('/')
        const dateB = b.Date.split('/').reverse().join('/')
        return new Date(dateB) - new Date(dateA);
      })
      console.log(sorted)
      return sorted
    },
    search() {
      if (this.fields.searchInput.length <= 1) {
        this.filteredCars()
      } else if (this.fields.searchInput.length > 1) {
        this.filteredList = this.filteredList
          .map(item => ({
            ...item,
            works: item.works.filter(work => work.Name.toLowerCase().includes(this.fields.searchInput.toLowerCase())),
            products: item.products.filter(product => product.Name.toLowerCase().includes(this.fields.searchInput.toLowerCase()))
          }))
          .filter(item => (item.works.length > 0 || item.products.length > 0) && item.CarID && item.CarID === this.selectedCar)
      }
    },
    showFull(id) {
      if (!this.showAll.includes(id)) {
        this.showAll.unshift(id)
      } else if (this.showAll.includes(id)) {
        const index = this.showAll.indexOf(5)
        this.showAll.splice(index, 1)
      }
    },
    filteredCars() {
      if (parseInt(this.selectedCar) === 0) {
        this.filteredList = this.jobs
        return
      }
      this.filteredList = this.jobs.filter(job => {
        if (this.selectedCar === null) {
          return false
        }
        return job.CarID && job.CarID === this.selectedCar
      })
    }
  },
  created() {
    this.filteredList = this.jobs
    this.selectedCar = this.cars[this.cars.length-1].ID
    this.filteredCars()
  }
}
</script>

<style lang="scss" scoped>
.text-align-right {
  text-align: right !important;
}
.all-works-table {
  .table-head {
    position: sticky;
    top: 130px;
    justify-content: space-between;
    display: flex;
    padding-right: 68px;
    @media screen and (max-width: 768px) {
      padding-right: 15px;
    }
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .head-column {
    font-weight: 600;
  }
}
</style>
