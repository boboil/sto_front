<template>
  <div>
    <section class="block-auth">
      <div class="auth-popup">
        <div class="auth-popup-logo">
          <img :src="assetImage('logo', 'png')" alt="" width="72">
        </div>
        <div class="auth-popup-title">
          GoldAuto - Автосервіс
        </div>
        <AuthFormSignIn  v-if="showLogin"/>
        <button class="nav-btn" type="button" @click="showLogin = !showLogin">
          Увійти в особистий кабінет
        </button>
        <NuxtLink
          :to="AUTH_ROUTES.REGISTRATION"
          type="button"
          class="nav-btn auth-button"
        >
          Зареєструватись
        </NuxtLink>
        <div class="manager-feedback">
          <button class="nav-btn" type="button" data-toggle="modal" data-target="#diagnosticModal">
            Записатися на розвал-сходження
          </button>
        </div>
        <div class="mb-4 mt-4 telegram-connect-block">
          <div class="links-block justify-content-between mt-4">
            <a href="tel:+3800507003005">050 700 300 5</a>
          </div>
          <div class="links-block justify-content-between mt-4">
            <a href="tel:+3800675468823">067 546 882 3</a>
            <a href="https://t.me/+3800675468823" target="_blank">
              <img :src="assetImage('telegram')" alt="telegram" width="32px">
            </a>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import AuthFormSignIn from '@/components/Auth/FormSignIn'
import { assetImage } from '@/helpers'
import { AUTH_ROUTES } from "@/constants";

export default {
  name: 'SignIn',
  computed: {
    AUTH_ROUTES() {
      return AUTH_ROUTES
    }
  },
  data: () => ({
    assetImage,
    showLogin: false
  }),
  layout: 'auth',

  components: { AuthFormSignIn }
}
</script>
