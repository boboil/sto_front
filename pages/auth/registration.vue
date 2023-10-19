<template>
  <section class="block-auth">
    <div class="auth-popup">
      <div class="auth-popup-logo">
        <img src="@/assets/img/logo.png" alt="" width="72">
      </div>
      <div class="auth-popup-title">
        Реєстрація нового клієнта
      </div>
      <form class="auth-popup-form" role="form" @submit.prevent="register">
        <div class="field">
          <label class="input-label">Телефон:</label>
          <input type="text" name="phone" minlength="12" maxlength="12" id="phone" class="input phone-mask" placeholder="" required v-model.trim="phone">
        </div>
        <div class="field">
          <label class="input-label">ПІБ:</label>
          <input type="text" id="name" name="name" class="input" placeholder="" required v-model.trim="name">
        </div>
        <div class="field">
          <label class="input-label">Пароль:</label>
          <input type="password" id="password" name="password" class="input" placeholder="" required v-model.trim="password">
        </div>
        <div class="field">
          <div class="g-recaptcha" id="g_recaptcha" data-sitekey="6Le9i3MiAAAAALYnEgutxBh3HbprvvFx1ifqX2gC"></div>
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  </section>
</template>

<script>
import {USER_ROUTES} from "~/constants";

export default {
  data() {
    return {
      phone: '',
      name: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const formData = {
        phone: this.phone,
        name: this.name,
        password: this.password
      }
      await this.$store.dispatch('register', formData)
      await this.$auth.loginWith('local', {
        data: {
          username: this.phone,
          password: this.password,
          grant_type: 'password'
        }
      });

      if (this.$auth.loggedIn) {
        await this.$router.push(USER_ROUTES.USER_PROFILE.path);
      } else {
        console.error('Login failed');
      }
    }
  }
}
</script>
