<template>
  <div>
    <Header />
    <div class="wrapper">
      <section class="block-auth">
        <div class="auth-popup">
          <div class="auth-popup-title">
            {{ user.Name }}
          </div>
          <button
            class="nav-btn"
            type="button"
            @click="diagnosticModalShow = !diagnosticModalShow"
          >
            <b>Записатись</b>
          </button>
          <NuxtLink
            :to="USER_ROUTES.USER_TALONS.path"
            type="button"
            class="nav-btn auth-button"
          >
            Мій гаманець послуг
          </NuxtLink>
          <NuxtLink
            :to="USER_ROUTES.USER_ONLINE_JOBS.path"
            type="button"
            class="nav-btn auth-button"
          >
            Мої замовлення
          </NuxtLink>
          <NuxtLink
            :to="USER_ROUTES.USER_RECOMMENDATION.path"
            type="button"
            class="nav-btn auth-button"
          >
            Рекомендації
          </NuxtLink>
          <NuxtLink
            :to="USER_ROUTES.USER_ALL_JOBS.path"
            type="button"
            class="nav-btn auth-button"
          >
            Вся історія
          </NuxtLink>
          <NuxtLink
            :to="USER_ROUTES.USER_ACTS.path"
            type="button"
            class="nav-btn auth-button"
          >
            Акти виконаних робіт
          </NuxtLink>
          <FooterContact />
          <div class="phone-main">
            <a href="https://forms.gle/A5oMq9Hjt8AKcW7n6" class="btn btn-info" target="_blank">Залишити відгук</a>
          </div>
        </div>
      </section>
      <ModalPopup :is-open.sync="diagnosticModalShow" title="Онлайн запис!">
        <DiagnosticForm
          slot-scope="data"
          v-bind="data"
        />
      </ModalPopup>
      <ModalPopup :is-open.sync="needToChange" title="Попередження">
        <Warning
          slot-scope="data"
          v-bind="data"
        />
      </ModalPopup>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {USER_ROUTES} from '@/constants'
import Header from '@/components/Common/Layout/Header'
import ModalPopup from '@/components/ModalPopup'
import DiagnosticForm from '@/components/Diagnostic/DiagnosticForm'
import FooterContact from '@/components/Common/Form/FooterContact'
import Warning from '@/components/Common/ChangePassword/Warning'

export default {
  name: "index",
  components: {
    Warning,
    FooterContact,
    Header,
    ModalPopup,
    DiagnosticForm
  },
  data() {
    return {
      acts: [],
      diagnosticModalShow: false
    }
  },
  async asyncData({ store }) {
    await store.dispatch('user/fetchUser')
    await store.dispatch('user/fetchCars')
  },
  computed: {
    USER_ROUTES() {
      return USER_ROUTES
    },
    ...mapGetters({
      list: 'user/getHistoryList',
      user: 'user/getUser',
      needToChange: 'user/getNeedToChangePassword',
      orders: 'order/getOrders'
    })
  },

}
</script>

<style scoped>

</style>
