<template>
  <form ref="form" @submit.prevent="handleSubmit" class="auth-popup-form">
    <div class="field">
      <FormInput
        v-model="fields.username"
        type="text"
        placeholder="Телефон (напр. 0501234567)"
        required
        label="Телефон:"
        :has-custom-error="!!phoneError"
        :error-message="phoneError || errorMessage"
        @update="errorMessage = ''"
      />
    </div>
    <div class="field password-block">
      <FormInput
        v-model="fields.password"
        :type="passwordType"
        placeholder="Пароль"
        label="Пароль:"
        hint="за замовчуванням Ваш номер телефону у форматі 380..."
        :error-message="errorMessage"
        @update="errorMessage = ''"
        required
        with-icon
        @show-password="showPassword"
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
    isPasswordShown: false,
    passwordType: 'password',
    assetImage,
    errorMessage: ''
  }),

  computed: {
    normalizedPhone() {
      const digits = this.fields.username.replace(/\D/g, '')
      if (/^0\d{9}$/.test(digits)) return `38${digits}`
      if (/^80\d{9}$/.test(digits)) return `3${digits}`
      if (/^380\d{9}$/.test(digits)) return digits
      return ''
    },
    phoneError() {
      if (!this.fields.username || this.normalizedPhone) return ''
      return 'Введіть український номер телефону, напр. 0501234567 або +380501234567'
    },
    isValid() {
      const {password} = this.fields
      return !!this.normalizedPhone && password && password.length > 2
    }
  },

  methods: {
    showPassword() {
      this.isPasswordShown = !this.isPasswordShown
      this.isPasswordShown ?
        this.passwordType = 'text' :
        this.passwordType = 'password'
    },
    async handleSubmit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.normalizedPhone,
            password: this.fields.password,
            grant_type: 'password'
          }
        });

        if (this.normalizedPhone === this.fields.password) {
          await this.$store.dispatch('user/changeNeedToChangePassword', true)
        }
        if (this.$auth.loggedIn) {
          await this.$router.push(USER_ROUTES.USER_PROFILE.path)
        }
      } catch (e) {
        this.errorMessage = 'Невірний логін або пароль спробуйте ще раз'
        console.log('ERROR', e?.response?.data?.error_description || e)
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

  .password-block {
    .input-block {
      display: flex;
      align-items: center;
    }

    .eye-icon {
      position: absolute;
      width: 16px;
      height: 16px;
      right: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    .form-control {
      &.is-valid,
      &.is-invalid {
        background-position: right calc(1.375em + 0.1875rem) center;
      }
    }
  }
}

</style>
