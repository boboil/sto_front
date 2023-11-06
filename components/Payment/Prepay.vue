<template>
  <form @submit.prevent="makePrePay">
    <div class="form-group row justify-content-center font-size-18">
      <div class="input-group col-6">
        <input
          v-model="fields.prePaySum"
          type="number"
          class="form-control"
          step="0.1"
          required
          :disabled="prepay"
        />
        <div class="input-group-prepend">
          <div class="input-group-text">грн</div>
        </div>
      </div>
    </div>
    <ModalPopupFooter
      submit-title="Перейти до оплати"
      @cancel="handleCancel"
    />
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import ModalPopupFooter from '@/components/ModalPopupFooter'

export default {
  name: "Prepay",
  components: {
    ModalPopupFooter
  },
  props: {
    prepay: {
      type: Boolean,
      default: false
    },
    sum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fields: {
        prePaySum: 0,
        orderId: null
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
  },
  mounted() {
    this.fields.orderId = Math.floor(Date.now() / 1000)
    if (this.prepay) {
      this.fields.prePaySum = this.sum
    }
  },
  methods: {
    makePrePay() {
      const data = {
        user: this.user,
        fields: this.fields
      }
      this.$store.dispatch('order/createPrepay', data)

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
