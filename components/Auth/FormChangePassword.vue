<template>
  <form ref="form" @submit.prevent="handleSubmit" class="auth-popup-form">
    <div class="field">
      <FormInput
        v-model="fields.password"
        type="text"
        placeholder="Старий пароль:"
        required
        label="Старий пароль:"
      />
    </div>
    <div class="field">
      <FormInput
        v-model="fields.newPassword"
        type="text"
        placeholder="Новий пароль:"
        required
        label="Новий пароль:"
        hint="за замовчуванням Ваш номер телефону у форматі 380..."
      />
    </div>
    <div class="field">
      <FormInput
        v-model="fields.repeatNewPassword"
        type="text"
        placeholder="Новий пароль:"
        required
        label="Новий пароль:"
        hint="за замовчуванням Ваш номер телефону у форматі 380..."
      />
    </div>
    <button
      type="submit"
      :disabled="!isValid"
    >
      Змінити пароль
    </button>
  </form>
</template>

<script>
import * as helper from '@/helpers'
import {assetImage} from '@/helpers'
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'
import FormInput from '@/components/Common/Form/Input'

export default {
  name: 'FormChangePassword',

  components: {FormInput},

  data: () => ({
    AUTH_ROUTES,
    fields: {
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    locked: false,
    assetImage
  }),

  computed: {
    isValid() {
      return (
        this.fields.password &&
        this.fields.newPassword &&
        this.fields.repeatNewPassword &&
        this.fields.newPassword === this.fields.repeatNewPassword
      )
    }
  },

  methods: {
    async handleSubmit() {
      try {
        const params = {
          oldpassword: this.fields.password,
          password1: this.fields.newPassword,
          password2: this.fields.repeatNewPassword
        }
        await this.$store.dispatch('user/changePassword', params)
        await this.$store.dispatch(
          'user/changeNeedToChangePassword',
          false
        )
        await this.$router.push(USER_ROUTES.USER_PROFILE.path)
      } catch (e) {
        // ...
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  label {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.32;
    padding-left: 14px;
  }

  .input {
    display: block;
    width: 100%;
    margin-top: 4px;
    height: 40px;
    border: 1px solid #E2E6E9;
    color: #010101;
    padding: 0 14px;
    font-size: 16px;
    line-height: 1;
    font-weight: 300;
    border-radius: 8px;
  }
}
</style>
