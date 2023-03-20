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
      :disabled="locked || !isValid"
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
      const {username, password} = this.fields
      return username && password && username.length > 2 && password.length > 2
    }
  },

  methods: {
    async handleSubmit() {
      this.locked = true

      try {
        const response = await this.$auth
          .loginWith('local', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
              'Access-Control-Allow-Origin': 'http://95.217.38.198',
              // 'Origin': 'http://95.217.38.198',
              Accept: '*/*'
            },
            data: {
              username: this.fields.username,
              password: this.fields.password
            },
            transformRequest(data, headers) {
              Object.assign(data, {
                grant_type: process.env.grantType
              })

              return Object.entries(data)
                .reduce((result, param) => [...result, param.join('=')], [])
                .join('&')
            }
          }).then((response) => {
            const token = response.data.access_token
            this.$store.commit('setToken', token)
            this.$auth.setUser('user')
          })
        await this.$router.push(USER_ROUTES.USER_PROFILE.path)
      } catch (e) {
        // eslint-disable-next-line
        const {error, error_description} = e.response.data
        // eslint-disable-next-line no-console
        console.log('ERROR', error_description)
      } finally {
        this.locked = false
      }
    }
  }
}
</script>
