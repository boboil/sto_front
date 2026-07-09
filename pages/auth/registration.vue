<template>
  <section class="block-auth">
    <div class="auth-popup">
      <div class="auth-popup-logo">
        <NuxtLink to="/">
          <img :src="assetImage('logo', 'png')" alt="" width="72">
        </NuxtLink>
      </div>
      <div class="auth-popup-title">
        Реєстрація нового клієнта
      </div>
      <form ref="form" @submit.prevent="register" class="auth-popup-form">
        <div class="field">
          <FormInput
            v-model="fields.username"
            type="text"
            placeholder="Телефон"
            v-mask="'38##########'"
            label="Телефон:"
            @update="errorMessage = ''"
            required
          />
        </div>
        <div class="field">
          <FormInput
            v-model="fields.name"
            type="text"
            placeholder="Імʼя"
            label="ПІБ:"
            :error-message="errorMessage"
            @update="errorMessage = ''"
            required
          />
        </div>
        <div class="field password-block">
          <FormInput
            v-model="fields.password"
            :type="passwordType"
            placeholder="Пароль"
            label="Пароль:"
            :error-message="errorMessage"
            @update="errorMessage = ''"
            required
            with-icon
            @show-password="showPassword"
          />
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
import {USER_ROUTES} from '@/constants'
import {assetImage} from '@/helpers'
import FormInput from "~/components/Common/Form/Input.vue";

export default {
  components: {FormInput},
  data() {
    return {
      fields: {
        username: '',
        password: '',
        name: ''
      },
      isPasswordShown: false,
      passwordType: 'password',
      assetImage,
      errorMessage: ''
    }
  },

  computed: {
    isValid() {
      return this.fields.username && this.fields.password;
    }
  },
  methods: {
    showPassword() {
      this.isPasswordShown = !this.isPasswordShown
      this.isPasswordShown ?
        this.passwordType = 'text' :
        this.passwordType = 'password'
    },
    async register() {
      const formData = {
        phone: this.fields.username,
        name: this.fields.name,
        password: this.fields.password
      }
      await this.$store.dispatch('register', formData)
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
