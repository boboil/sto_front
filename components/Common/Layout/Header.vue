<template>
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
            <button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">
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
          id="prePayButton"
          @onclick="freePrePay"
        >
          Внести передплату
        </button>
        <button
          type="button"
          data-toggle="modal"
          class="btn btn-warning"
          data-target="#diagnosticModal"
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
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {AUTH_ROUTES, USER_ROUTES} from "~/constants";

export default {
  name: "Header",
  data() {
    return {
      showMenu: false
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
    freePrePay() {

    },
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
</style>
