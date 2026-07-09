<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <input
        v-model="fields.phone"
        type="text"
        class="form-control mt-3"
        required
        placeholder="Введіть номер телефону"
      >
    </div>
    <div class="form-group">
      <input
        v-if="fields.selectedCar === 'another'"
        v-model="fields.another_car"
        type="text"
        class="form-control mt-3"
        required
        placeholder="Введіть модель та рік авто"
      >
    </div>
    <div class="form-check form-group">
      <div>
        <label class="btn btn-secondary" for="today">
          Сьогодні
        </label>
        <input
          v-model="fields.diagnosticDay"
          id="today"
          type="radio"
          class="btn-check"
          value="today"
          autocomplete="off"
          required
          @change="syncTime"
        />
      </div>
      <div>
        <label class="btn btn-secondary" for="tomorrow">
          Завтра
        </label>
        <input
          v-model="fields.diagnosticDay"
          id="tomorrow"
          type="radio"
          class="btn-check"
          value="tomorrow"
          autocomplete="off"
          required
          @change="syncTime"
        />
        <input type="hidden" name="name" id="diagnosticName" :value="diagnosticName" />
      </div>
    </div>
    <div v-if="fields.diagnosticDay" class="form-group">
      <label for="question">Час</label>
      <select
        v-model="fields.selectedTime"
        class="form-control"
        required
      >
        <option disabled hidden>Спочатку оберіть день</option>
        <option v-if="fields.diagnosticDay" v-for="availableTime in availableTimes" :value="availableTime">
          {{ availableTime }}
        </option>
      </select>
    </div>
    <ModalPopupFooter
      :disabled-submit="locked || !isValid"
      submit-title="Записатись"
      @cancel="handleCancel"
    />
  </form>
</template>

<script>
import {mapGetters} from "vuex";
import ModalPopupFooter from '@/components/ModalPopupFooter'

export default {
  name: 'GuestDiagnostic',
  components: {
    ModalPopupFooter
  },
  data() {
    return {
      fields: {
        reason: 'camberToe',
        selectedCar: 'another',
        selectedTime: '',
        diagnosticDay: null,
        another_car: ''
      },
      selectedCar: [],
      selectedTime: "",
      diagnosticName: "",
      question: "",
      locked: false,
      isValid: true
    };
  },
  computed: {
    ...mapGetters({
      time: 'time/getAvailableTimes'
    }),
    availableTimes() {
      if (!this.fields.diagnosticDay) {
        return []
      }
      return this.time
    }
  },
  methods: {
    selectDiagnostic(event) {
      const selectedIndex = event.target.selectedIndex
      this.diagnosticName = event.target.options[selectedIndex].text
    },
    selectCar(event) {
      const selectedIndex = event.target.selectedIndex
      this.selectedCar = event.target.options[selectedIndex].text
    },
    async syncTime() {
      await this.$store.dispatch('time/fetchCalendarTime', this.fields.diagnosticDay)
    },
    async submitForm() {
      const data = {
        user: this.user,
        fields: this.fields,
        reason: this.diagnosticName,
        selectedCar: this.selectedCar
      }
      await this.$store.dispatch('order/createDiagnosticOrder', data)
      this.resetForm()
      this.closeModal()
    },
    resetForm() {
      this.fields = {
        reason: 'camberToe',
        selectedCar: 'another',
        selectedTime: '',
        diagnosticDay: null,
        another_car: ''
      }
    },
    closeModal() {
      const {modalId} = this.$attrs
      modalId && this.$bvModal.hide(modalId)
    },
    handleCancel() {
      this.closeModal()
    }
  }
};
</script>
<style lang="scss" scoped>
.text-align-center {
  text-align: center !important;
}
</style>
