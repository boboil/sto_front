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
        <FooterContact />
      </div>

    </section>
  </div>
</template>

<script>
import AuthFormSignIn from '@/components/Auth/FormSignIn'
import { assetImage } from '@/helpers'
import { AUTH_ROUTES } from "@/constants";
import FooterContact from "@/components/Common/Form/FooterContact";

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

  components: {FooterContact, AuthFormSignIn }
}
</script>
