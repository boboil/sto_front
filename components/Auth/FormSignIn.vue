<template>
  <form ref="form" @submit.prevent="handleSubmit" class="auth-popup-form">
    <div class="field">
      <FormInput
        v-model="fields.username"
        type="text"
        placeholder="Телефон"
        required
        label="Телефон:"
      />
    </div>
    <div class="field">
      <FormInput
        v-model="fields.password"
        type="password"
        placeholder="Пароль"
        required
        label="Пароль:"
        aria-description="* за замовчуванням Ваш номер телефону у форматі 380..."
      />
    </div>
    <button
      type="submit"
      :disabled="!isValid"
    >
      Увійти
    </button>
  </form>
</template>

<script>
import * as helper from '@/helpers'
import {assetImage} from '@/helpers'
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'
import FormInput from '@/components/Common/Form/Input'

export default {
  name: 'FormSignIn',

  middleware: 'guest',

  components: {FormInput},

  data: () => ({
    AUTH_ROUTES,
    fields: {
      username: '',
      password: ''
    },
    locked: false,
    assetImage
  }),

  computed: {
    isValid() {
      return this.fields.username && this.fields.password;
    }
  },

  methods: {
    async handleSubmit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.fields.username,
            password: this.fields.password,
            grant_type: 'password'
          }
        });

        if (this.$auth.loggedIn) {
          await this.$router.push(USER_ROUTES.USER_PROFILE.path);
        } else {
          console.error('Login failed');
        }
      } catch (e) {
        // ...
      }
    }
  }
}
</script>
