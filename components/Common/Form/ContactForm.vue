<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="!user" class="form-group">
      <label for="InputPhone">Номер телефону</label>
      <input
        v-model="fields.phone"
        type="tel"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="question">Питання</label>
      <textarea
        v-model="fields.question"
        class="form-control"
        rows="3"
      />
    </div>
    <ModalPopupFooter
      submit-title="Надіслати"
      @cancel="handleCancel"
    />
  </form>
</template>

<script>
import ModalPopupFooter from '@/components/ModalPopupFooter'
import {mapGetters} from "vuex";
export default {
  name: "ContactForm",
  components: {
    ModalPopupFooter
  },
  data() {
    return {
      fields: {
        question: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    async handleSubmit() {
      console.log(this.$auth.user)
      const phone = this.$auth.user.Phone || this.fields.phone;
      const name = this.$auth.user.Name || 'Клиент не авторизован';
      let message = `Телефон: ${phone}\n`
      message += `Имя: ${name}\n`
      message += `Вопрос: ${this.fields.question}`
      await this.$store.dispatch('user/sendTgMessage', message)
      await this.closeModal()
    },
    closeModal() {
      const {modalId} = this.$attrs
      modalId && this.$bvModal.hide(modalId)
    },
    handleCancel() {
      this.closeModal()
    }
  }
}
</script>

<style scoped>

</style>
