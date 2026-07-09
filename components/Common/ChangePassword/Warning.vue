<template>
  <div>
    <div class="d-flex justify-content-center">
      <img :src="assetIcon('change_password')" alt="change password warning" width="150px"/>
    </div>
    <div class="description">
      Ваш пароль, встановлено за замовчуванням
      будь ласка змініть його, хочете змінити його?
    </div>
    <div class="buttons">
      <button class="confirm" @click="goChangePassword">Змінити</button>
      <button class="cancel" @click="closeModal">Не міняти</button>
    </div>
  </div>
</template>
<script>
import {USER_ROUTES} from '@/constants'
import {assetIcon, assetImage} from "~/helpers";

export default {
  name: 'Warning',

  methods: {
    assetIcon,
    assetImage,
    closeModal() {
      this.$store.dispatch(
        'user/changeNeedToChangePassword',
        false
      )
      const {modalId} = this.$attrs
      modalId && this.$bvModal.hide(modalId)
    },
    goChangePassword() {
      this.$router.push(USER_ROUTES.USER_PASSWORD_CHANGE.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.description {
  margin-top: 10px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm {
  background-color: #64b5f6;
  color: white;
}

.confirm:hover {
  background-color: #42a5f5;
}

.cancel {
  background-color: #e0e0e0;
}

.cancel:hover {
  background-color: #d6d6d6;
}
</style>
