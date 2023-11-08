<template>
  <div>
    <Header/>
    <main id="acts_works">
      <section class="block-work-acts">
        <div class="wrap">
          <h1 class="block-title">Мій гаманець послуг</h1>
          <span>
          <p>
            Натискайте + , обирайте та попередньо сплачуйте за деякі послуги, або цілі комплекси - це дасть вам можливість заощадити, а нам натхнення до ще більших звершень :)
          </p>
          <p>
            *Додані послуги в "Мій гаманець послуг" можно використати в будь який час та на будь який автомобіль.
          </p>
        </span>
          <div class="work-acts-chronology">
            <div class="work-acts-year">
              <div class="work-acts-year-title">Є в гаманці</div>
              <div class="work-acts-year-list">
                <div class="list-inner">
                  <NuxtLink :to="buyTalonRoute"
                     class="act-item d-flex align-items-center justify-content-center a5eca5"
                  >
                    <div class="subtitle"></div>
                    <div class="value">
                    <span class="d-flex align-items-center">
                      <BIconPlusLg class="h3 pr-3 plus-icon" />
                      Додати
                    </span>
                    </div>
                    <div class="value"></div>
                  </NuxtLink>
                  <a
                    v-for="(ticket, index) in availableTickets"
                    :key="index"
                    href="#"
                    class="act-item"
                  >
                    <div class="subtitle"></div>
                    <div class="value"></div>
                    <div class="value">{{ ticket.Name }}</div>
                    <div class="subtitle">Дата:</div>
                    <div class="value">{{ formatDate(ticket.Date) }}</div>
                    <div class="value mt-3 text-center">
                      <button
                        type="button"
                        :data-id="ticket.ID"
                        :data-name="ticket.Name"
                        class="btn btn-info"
                        @click="useTalon(ticket)"
                      >
                        Використати
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="work-acts-chronology">
            <div class="work-acts-year">
              <div class="work-acts-year-title">Використані</div>
              <div class="work-acts-year-list">
                <div class="list-inner">
                  <template v-if="usedTickets.length > 0">
                    <a
                      v-for="(ticket, index) in usedTickets"
                      :key="index"
                      href="#"
                      class="act-item"
                    >
                      <div class="subtitle">
                        <b class="red">Використано</b>
                      </div>
                      <div class="value"></div>
                      <div class="value">{{ ticket.Name }}</div>
                      <div class="subtitle">Дата:</div>
                      <div class="value">{{ ticket.DateUsage }}</div>
                    </a>
                  </template>
                  <a v-else href="#"
                     class="act-item d-flex align-items-center justify-content-center d8e2d8">
                    <div class="value">
                      <span class="d-flex align-items-center">Немає використаних</span>
                    </div>
                  </a>
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
import {BIconPlusLg} from 'bootstrap-vue'
import {mapGetters} from "vuex";

export default {
  name: "Talons",
  components: {
    BIconPlusLg,
    Header
  },
  async fetch({store, params, route, $auth}) {
    await Promise.all([
      store.dispatch('order/fetchDataForTalons'),
      store.dispatch('user/fetchCars')
    ])
  },
  data() {
    return {
      buyTalonRoute: '/user/buy-talons',
    };
  },
  computed: {
    ...mapGetters({
      allTickets: 'order/getTalons',
      cars: 'user/getCars'
    }),
    availableTickets() {
      return this.allTickets.filter((ticket) => ticket.unusedCount > 0);
    },
    usedTickets() {
      return this.allTickets.filter((ticket) => ticket.usedCount > 0);
    },
  },
  methods: {
    formatDate(date) {
      const parsedDate = new Date(date);
      return `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`;
    },
    useTalon(ticket) {
      // Add your logic to use talon here
    },
  },
};
</script>
<style lang="scss" scoped>
.plus-icon {
  max-height: 28px;
  max-width: 28px;
}
</style>
