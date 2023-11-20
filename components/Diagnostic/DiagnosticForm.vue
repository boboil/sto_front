<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <select
        v-model="fields.reason"
        class="form-control"
        id="selectDiagnostic"
        @change="selectDiagnostic"
      >
        <option value="placeholder" selected="" disabled="" hidden="">Виберіть тип</option>
        <option data-diagnostic="camberToe" value="camberToe">Зробити розвал-сходження</option>
        <option data-diagnostic="diagnostic" value="diagnostic">Є проблема, потрібно
          подивитись
        </option>
        <option data-diagnostic="diagnostic" value="diagnostic">Просто давненько у Вас
          не був
        </option>
        <option data-diagnostic="diagnostic" value="diagnostic">Проїхав 7-10т км,
          потрібно ТО
        </option>
        <option data-diagnostic="diagnostic" value="diagnostic">Зробити шиномонтаж</option>
      </select>
    </div>
    <div v-if="fields.reason !== 'placeholder'" class="form-group">
      <select
        v-model="fields.selectedCar"
        class="form-control"
        required
        @change="selectCar"
      >
        <option value="" disabled hidden>Виберіть автомобіль</option>
        <option
          v-for="car in cars"
          :key="car.ID"
          :value="car.ID"
        >{{ car.RegistrationNo }} {{ car.Brand }} {{ car.Model }}
        </option>
        <option value="another">Інший автомобіль</option>
      </select>
      <input
        v-if="fields.selectedCar === 'another'"
        v-model="fields.another_car"
        type="text"
        class="form-control mt-3"
        required
        placeholder="Введіть модель та рік авто">
    </div>
    <div
      v-if="fields.reason === 'camberToe' ||
            fields.reason === 'diagnostic'"
      class="form-check form-group"
    >
      <div
        v-if="fields.reason === 'camberToe' ||
              fields.reason === 'diagnostic'"
      >
        <label class="btn btn-secondary" for="today">Сьогодні</label>
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
        <label class="btn btn-secondary" for="tomorrow">Завтра</label>
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
        <input type="hidden" name="name" id="diagnosticName" :value="diagnosticName"/>
      </div>
    </div>
    <div
      v-if="fields.reason === 'diagnostic'"
      class="form-group text-align-center"
    >
      <input
        v-model="fields.transfer"
        type="checkbox"
        id="transfer"
        class="btn-check"
      />
      <label class="btn btn-secondary transfer" for="transfer">Хочу трансфер до СТО</label>
      <input
        v-if="fields.transfer"
        v-model="fields.another_address"
        type="text"
        required
        placeholder="Введіть адресу звідки забрати авто"
        class="form-control mt-2"
      >
    </div>
    <div
      v-if="fields.reason === 'camberToe' ||
            fields.reason === 'diagnostic'"
      class="form-group">
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
      <template v-if="fields.reason !== 'camberToe'">
        <label for="question">Опишіть коротко свою причину звернення, а бо що не так з авто:)</label>
        <textarea
          v-model="fields.question"
          class="form-control"
          name="question"
          rows="3"
        ></textarea>
      </template>
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
  components: {
    ModalPopupFooter
  },
  data() {
    return {
      fields: {
        reason: 'placeholder',
        selectedCar: '',
        selectedTime: '',
        diagnosticDay: null,
        transfer: '',
        question: '',
        another_address: '',
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
      cars: 'user/getCars',
      time: 'time/getAvailableTimes',
      user: 'user/getUser'
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
      if (this.fields.reason === 'camberToe') {
        await this.$store.dispatch('time/fetchCalendarTime', this.fields.diagnosticDay)
      } else {
        await this.$store.dispatch('time/checkAvailableTime', this.fields.diagnosticDay)
      }
    },
    transferAvto() {
      // Add your logic for transferring the car here
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
        reason: 'placeholder',
          selectedCar: '',
          selectedTime: '',
          diagnosticDay: null,
          transfer: '',
          question: '',
          another_address: '',
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
