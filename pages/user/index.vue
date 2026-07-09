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
            Мої звернення
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
              <a href="tel:+3800507003005">050 700 300 5</a>
            </div>
            <div class="links-block justify-content-between">
              <a href="tel:+3800675468823" class="pl-2">067 546 882 3</a>
              <a href="https://t.me/+3800675468823" target="_blank">
                <img :src="assetImage('telegram')" alt="telegram" width="32px">
              </a>
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
import {assetImage} from "~/helpers";

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
    assetImage,
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
