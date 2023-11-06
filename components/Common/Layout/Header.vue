<template>
  <div class="mb-5">
    <div class="header">
      <div class="wrap">
        <div class="logo">
          <NuxtLink
            :to="USER_ROUTES.USER_PROFILE.path"
          >
            <img src="@/assets/img/logo.png" alt="logo">
          </NuxtLink>
        </div>
        <div class="manager-feedback">
          <ul class="social_chats">
            <li>
              <button
                type="button"
                class="btn btn-light"
                @click="contactModalShow = !contactModalShow"
              >
                Зв'язатися з нами!
              </button>
            </li>
          </ul>
        </div>
        <div class="header-phones">

        </div>
        <div class="buttons" @click="showMenu = !showMenu">
          <button class="burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav class="menu" v-show="showMenu">
          <b>
            {{ user.Name }}
          </b>
          <br>
          <button
            type="button"
            class="btn btn-info"
            @click="prepayModalShow = !prepayModalShow"
          >
            Внести передплату
          </button>
          <button
            type="button"
            data-toggle="modal"
            class="btn btn-warning"
          >
            Записатись
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
            class="nav-btn auth-button red"
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
          <NuxtLink
            :to="USER_ROUTES.USER_PASSWORD_CHANGE.path"
            type="button"
            class="nav-btn auth-button font-weight-700"
          >
            {{ USER_ROUTES.USER_PASSWORD_CHANGE.pageTitle }}
          </NuxtLink>
          <button class="m-3" @click="logout">
            <b>Вийти</b>
          </button>
          <button type="button" class="btn btn-info">
            Оновити дані
          </button>
          <a href="https://forms.gle/A5oMq9Hjt8AKcW7n6" class="btn btn-info mt-3">
            Лишити відгук
          </a>
        </nav>
      </div>
      <ModalPopup :is-open.sync="prepayModalShow" title="Сума авансу">
        <Prepay
          slot-scope="data"
          v-bind="data"
        />
      </ModalPopup>
      <ModalPopup :is-open.sync="contactModalShow" title="Просто напишіть своє запитання!">
        <ContactForm
          slot-scope="data"
          v-bind="data"
        />
      </ModalPopup>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'
import Prepay from '@/components/Payment/Prepay'
import ModalPopup from '@/components/ModalPopup'
import ContactForm from '~/components/Common/Form/ContactForm'

export default {
  name: "Header",
  components: {
    Prepay,
    ModalPopup,
    ContactForm
  },
  data() {
    return {
      showMenu: false,
      prepayModalShow: false,
      contactModalShow: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
    USER_ROUTES() {
      return USER_ROUTES
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.push(AUTH_ROUTES.SIGN_IN)
    },
  }
}
</script>

<style lang="scss" scoped>
.btn.btn-warning {
  margin: 1rem 0 1rem 0
}
.nav-btn {
  font-weight: 700;
}
</style>
