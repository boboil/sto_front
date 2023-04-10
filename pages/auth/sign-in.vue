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
            <a href="tel:+380662050303">066 205 03 03 - Олександр</a>
            <a href="https://t.me/+380662050303" target="_blank">
              <img :src="assetImage('telegram')" alt="telegram" width="32px">
            </a>
          </div>
          <div class="links-block justify-content-between mt-4">
            <a href="tel:+380990206700">099 02 06 700 - Дмитро</a>
            <a href="https://t.me/+380990206700" target="_blank">
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
