<template>
  <div>
    <Header/>
    <main>
      <section class="block-one-act">
        <div class="wrap">
          <h1 class="block-title">
            АКТ №{{ act.No }} від {{ act.Date }}
          </h1>
          <button type="button" class="btn btn-info" id="prePayButton" v-if="act.IsPaid === 'N'">
            Оплатити акт
          </button>
          <div class="act-head">
            <div class="act-head-group">
              <div class="act-head-group-title">
                Автомобіль / <b>Пробіг, км</b>
              </div>
              <div class="act-head-group-value">
                {{ act.CarName }} / <b>{{ act.CarOdometer }} км</b>
              </div>
            </div>
            <div class="act-head-group">
              <div class="act-head-group-title">
                Сума всього:
              </div>
              <div class="act-head-group-value">
                {{ total }} грн
              </div>
            </div>
          </div>

          <div class="act-category">
            <div class="act-category-title">
              Причина звернення від клієнта
            </div>
            <div class="act-category-content">
              <table class="act-category-table">
                <thead>
                <tr>
                  <th>
                    <!--Название-->
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reason in clientReasons">
                  <td v-html="reason.Notes"/>
                </tr>
                </tbody>
              </table>
            </div>
          </div>


          <div class="act-category" v-if="works.length">
            <div class="act-category-title">
              Роботи
            </div>
            <div class="act-category-content">
              <table class="act-category-table">
                <thead>
                <tr>
                  <th>
                    Назва
                  </th>
                  <th>
                    Кількість
                  </th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="work in works">
                  <td>
                    {{ work.Name }}
                  </td>
                  <td>
                    {{ work.Quantity }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>


          <div class="act-category" v-if="products.length">
            <div class="act-category-title">
              Запчастини
            </div>
            <div class="act-category-content">
              <table class="act-category-table">
                <thead>
                <tr>
                  <th>
                    Назва
                  </th>
                  <th>
                    Кількість
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products">
                  <td>
                    {{ product.Name }}
                  </td>
                  <td>
                    {{ product.Quantity }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>


          <div class="act-category" v-if="defectations.length">
            <div class="act-category-title red">
              Дефектовано
            </div>
            <div class="act-category-content">
              <table class="act-category-table">
                <thead>
                <tr>
                  <th>
                    Назва
                  </th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="recommendation in defectations">
                  <td>
                    {{ recommendation.Name }}
                    <span v-if="recommendation.Notes && recommendation.Notes.length">
                      <br>Примітка:
                    <small>{{ recommendation.Notes }}</small>
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="act-category" v-if="recommendations.length">
            <div class="act-category-title blue">
              Ось що ще хотілось додати:
            </div>
            <div class="act-category-content">
              <table class="act-category-table">
                <thead>
                <tr>
                  <th>Назва</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="recommendation in recommendations">
                  <td class="font-size-15">
                    <span>{{ recommendation.Notes }}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="navigation-controls">
            <button class="nav-btn prev" @click="$router.push(USER_ROUTES.USER_ACTS.path)">
              Назад
            </button>
            <button class="nav-btn next">
              Наступний
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {convertDateToFormat} from "@/helpers"
import Header from "@/components/Common/Layout/Header"
import {USER_ROUTES} from "@/constants";

export default {
  name: "ActDetail",
  components: {Header},
  async asyncData({ store, params }) {
    await store.dispatch('user/fetchActDetail', params);
  },
  data() {
    return {
      convertDateToFormat,
      params: {
        actId: '',
        rectype: 4
      }
    }
  },
  computed: {
    USER_ROUTES() {
      return USER_ROUTES
    },
    ...mapGetters({
      act: 'user/getActDetail',
      cars: 'user/getCars'
    }),
    total() {
      const totalWork = this.act['WorkAmount']['Total'] ?? 0
      const totalProduct = this.act['ProductAmount']['Total'] ?? 0
      return totalWork + totalProduct
    },
    clientReasons() {
      return this.act.Works.filter(item => item.ID === 1967)
        .map(item => ({
          ...item,
          Notes: item.Notes + '<br/>' + this.act.WorkNotes.Reason,
        }));
    },
    works() {
      return this.act.Works.filter(item =>
        item.Group === 'Выполнено' && item.WorkerName !== '1Дефектовано!'
      );
    },
    products() {
      return this.act.Products
    },
    defectations() {
      const works = [];

      this.act.Works.forEach((item) => {
        if (
          (item.WorkerName === '1Дефектовано!' || item.Group === 'Комментарий') &&
          item.Group !== 'Наряд-заказ' && item.ID !== 1767
        ) {
          works.push(item);
        }
      })

      return works
    },
    recommendations() {
      return this.act.Works.filter(item =>
        (item.WorkerName === '1Дефектовано!' || item.Group === 'Комментарий') &&
        item.Group !== 'Наряд-заказ' && item.Notes
      );
    }
  },
  methods: {},
  created() {
    this.params.actId = this.$route.params.id
  }
}
</script>

<style scoped>
.blue {
  color: #0014ff;
}

.red {
  color: #ff0000ff;
}
</style>
