<template>
  <div>
    <Header/>
    <main>
      <section class="block-one-act online-job">
        <div class="wrap">
          <h1 class="block-title">
            № {{ job.No }} від {{ moment(job.Date).format('DD-MM-YYYY') }}
          </h1>
          <button
            type="button"
            class="btn btn-info"
            id="prePayButton"
            :data-sum="totalSum"
            @click="prepayModalShow = !prepayModalShow"
          >
            Внести передплату
          </button>
          <input type="hidden" name="orderId" id="orderId" :value="job.No">
          <div class="act-head">
            <div class="act-head-group">
              <div class="act-head-group-title">
                Автомобіль
              </div>
              <div class="act-head-group-value" id="car">
                {{ job.CarName }}
              </div>
            </div>
            <div class="act-head-group">
              <div class="act-head-group-title">
                Попередня сума замовлення:
              </div>
              <div v-if="isButtonShown" class="act-head-group-value">
                {{ totalSum }} грн
                <input type="hidden" :value="totalSum" id="orderSum">
              </div>
            </div>
            <div class="act-head-group">
              <div class="act-head-group-title">
                Статус замовлення
              </div>
              <div class="act-head-group-value blue">
                <b>{{ delivery }}</b>
              </div>
            </div>
          </div>
          <div
            v-if="products.length > 0"
            class="act-category"
          >
            <div class="act-category-title">
              Роботи/Запчастини
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
                  <th v-if="isButtonShown">
                    В роботу
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products" class="products">
                  <td>
                    {{ product.Name }}
                  </td>
                  <td>
                    {{ product.Quantity }}
                  </td>
                  <td v-if="isButtonShown">
                    <input
                      v-model="fields.products"
                      type="checkbox"
                      class="takenJob"
                      :value="product.Name"
                    >
                  </td>
                </tr>
                <tr v-if="isButtonShown">
                  <td colspan="3">
                    <button class="btn btn-info w-100 p-0" @click="checkAll">
                      Відмітити все
                    </button>
                  </td>
                </tr>
                <tr v-if="isButtonShown">
                  <td colspan="3">
                    <button
                      class="btn btn-warning w-100 p-0"
                      @click="prePayModalIsOpen = !prePayModalIsOpen"
                    >
                      Додати коментар
                    </button>
                  </td>
                </tr>
                <tr v-if="isButtonShown">
                  <td colspan="3">
                    <button
                      class="btn btn-success w-100 p-0"
                      @click="applyOrder"
                      :disabled="disabled"
                    >
                      В роботу
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
    <ModalPopup :is-open.sync="prePayModalIsOpen" title="Ваш коментар до замовлення">
      <Comment
        slot-scope="data"
        v-bind="data"
        @order-with-comment="applyOrderWithComment"
      />
    </ModalPopup>
    <ModalPopup :is-open.sync="prepayModalShow" title="Сума авансу">
      <Prepay
        slot-scope="data"
        v-bind="data"
        :sum="totalSum"
        prepay
      />
    </ModalPopup>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment/moment'
import Header from '@/components/Common/Layout/Header'
import Comment from '@/components/Order/Comment'
import Prepay from "@/components/Payment/Prepay"

export default {
  name: "SingleJob",
  components: {Prepay, Comment, Header},
  async fetch({store, params, route}) {
    await store.dispatch('order/fetchDataOneJob', {id: params.id, recType: route.query.recType})
    await store.dispatch('user/fetchCars')
  },
  data() {
    return {
      fields: {
        products: [],
        comment: ''
      },
      delivery: '',
      isButtonShown: false,
      prePayModalIsOpen: false,
      prepayModalShow: false
    }
  },
  computed: {
    ...mapGetters({
      job: 'order/getSingleJob'
    }),
    moment() {
      return moment
    },
    totalSum() {
      let sum = 0
      this.products.map(product => {
        sum += product.Total
      })
      return sum
    },
    products() {
      return this.job.Products.filter((item) => item.Group !== 'НЕ_відображати_в_кабінеті')
        .map((item) => ({
          ...item,
          Date: moment(this.job.Date).format('DD-MM-YYYY'),
        }))
    },
    disabled() {
      return !Object.values(this.fields.products).length
    },
  },
  mounted() {
    console.log(this.job)
    this.handleDeliveryStatus()
  },
  methods: {
    async applyOrder() {
      let text = `Погодження від клієнта \n\n`
      text += `${this.$auth.user.Name}\n${this.job.CarName}\n№: ${this.job.No}\n`
      text += `Роботи: ${this.fields.products}\n`
      text += `Сума: ${this.totalSum}\n${this.fields.comment}\n`

      await this.$store.dispatch('user/sendTgMessage', text)
      return {success: 'Дякуємо, ми вже пішли працювати=)'};
    },
    applyOrderWithComment(comment) {
      this.fields.comment = comment
      this.applyOrder()
    },
    checkAll() {
      if (!Object.values(this.fields.products).length) {
        const names = this.products.map(item => item.Name)
        return this.fields.products = [...names]
      }
      this.fields.products = []
    },
    handleDeliveryStatus() {
      switch (this.job.Delivery) {
        case 'Все_замовити':
          this.delivery = 'Вже погоджено клієнтом'
          break
        case 'На_погодженні':
          this.delivery = 'Натисніть для підтвердження замовлення'
          this.isButtonShown = true
          break;
        case 'ОПРАЦЬОВАНО_СКЛАДОМ':
        case 'Процінити':
          this.delivery = 'Опрацьовуємо, трішки зачекайте'
          break
        case 'Очікуємо_на_склад':
        case 'Частково_замовити':
          this.delivery = 'Вже погоджено клієнтом'
          break
        case '':
          this.delivery = 'Опрацьовуємо, трішки зачекайте'
          break
        case 'Відмовлено_клієнтом':
          this.delivery = 'Скасовано клієнтом'
          this.isButtonShown = true
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
