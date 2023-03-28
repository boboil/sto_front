<template>
  <div>
    <Header/>
    <div class="wrapper">
      <section class="block-auth">
        <div class="auth-popup">
          <div class="auth-popup-title">
            {{ $auth.user.fullName }}
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
          <div class="mb-2 mt-2 telegram-connect-block">
            <div class="links-block justify-content-start">
              <a href="tel:+380662050303" class="pl-2">066 205 03 03 - Олександр</a>
              <a href="https://t.me/+380662050303" target="_blank"><i class="fab fa-telegram fa-2x ml-2"></i></a>
            </div>
            <div class="links-block justify-content-start">
              <a href="tel:+380990206700" class="pl-2">099 02 06 700 - Дмитро</a>
              <a href="https://t.me/+380990206700" target="_blank"><i class="fab fa-telegram fa-2x ml-2"></i></a>
            </div>
          </div>
          <div class="phone-main">
            <a href="https://forms.gle/A5oMq9Hjt8AKcW7n6" class="btn btn-info" target="_blank">Лишити відгук</a>
          </div>
        </div>
      </section>
      <ModalPopup :is-open.sync="diagnosticModalShow" title="Онлайн запис!">
        <DiagnosticForm
          slot-scope="data"
          v-bind="data"
        />
      </ModalPopup>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {USER_ROUTES} from '~/constants'
import Header from "@/components/Common/Layout/Header";
import ModalPopup from "@/components/ModalPopup";
import DiagnosticForm from "@/components/Diagnostic/DiagnosticForm";

export default {
  name: "index",
  components: {Header, ModalPopup, DiagnosticForm},
  data() {
    return {
      acts: [],
      diagnosticModalShow: false
    }
  },
  async asyncData({ store }) {
    await store.dispatch('user/fetchUser')
    await store.dispatch('user/fetchHistoryList')
    await store.dispatch('user/fetchCars')
  },
  computed: {
    USER_ROUTES() {
      return USER_ROUTES
    },
    ...mapGetters({
      list: 'user/getHistoryList'
    })
  },
  methods: {
    async getActs() {
      await this.$store.dispatch('user/fetchActs', this.list)
    }
  },
  created() {
    this.getActs()
  }
}
</script>

<style scoped>

</style>
