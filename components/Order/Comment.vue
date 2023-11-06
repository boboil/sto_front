<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="question">Коментар</label>
      <textarea
        v-model="fields.comment"
        class="form-control"
        rows="3" />
    </div>
    <ModalPopupFooter
      submit-title="Надіслати"
      @cancel="handleCancel"
    />
  </form>
</template>

<script>
export default {
  name: "Comment",
  props: {
    prepay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fields: {
        comment: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('order-with-comment', this.fields.comment)
      this.closeModal()
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

