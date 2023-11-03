<template>
  <div>
    <Header />
    <div class="wrapper">
      <section class="block-auth">
        <div class="auth-popup">
          <div class="auth-popup-title">
            Змінити пароль
          </div>
          <FormChangePassword />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Common/Layout/Header'
import FormChangePassword from '@/components/Auth/FormChangePassword'

export default {
  name: 'ChangePassword',
  components: {FormChangePassword, Header}
}
</script>


<style scoped>

</style>
