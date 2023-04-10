<template>
<div>
  <Header />
  <main id="acts_works">
    <section class="block-work-acts">
      <div class="wrap">
        <h1 class="block-title">
          Каталог послуг та сертифікатів
        </h1>
        <div class="work-acts-chronology">
          <div class="work-acts-year">
            <div class="work-acts-year-list">
              <div class="list-inner">
                <div
                  v-for="ticket in tickets"
                  :key="ticket.ID"
                  class="act-item"
                >
                  <div class="subtitle"></div>
                  <div class="value"></div>
                  <div class="value">
                    <b>{{ ticket.Name }}</b>
                  </div>
                  <div class="subtitle">Опис:</div>
                  <div class="value" v-html="ticket.Notes"></div>
                  <div class="subtitle">Ціна:</div>
                  <div class="value">{{ ticket.Price }} грн</div>
                  <div class="subtitle"></div>
                  <div class="value mt-3 text-center">
                    <button
                      type="button"
                      :data-id="ticket.ID"
                      class="btn btn-info"
                      id="addCartProduct"
                      @click="addToCartTalon(ticket)"
                    >
                      Додати в кошик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="cartSection">
      <Cart />
    </section>
  </main>
</div>
</template>

<script>
import Header from "@/components/Common/Layout/Header";
import Cart from "~/components/Cart";
import {mapGetters} from "vuex";

export default {
  name: "BuyTalons",
  components: {
    Cart,
    Header
  },
  async fetch({store, params, route, $auth}) {
    await Promise.all([
      store.dispatch('order/fetchAllTalons')
    ])
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tickets: 'order/getAllTalons'
    }),
  },
  methods: {
    addToCartTalon(ticket) {
      this.$store.commit('cart/addToCart', ticket)
    },
  }
}
</script>

<style scoped>

</style>
