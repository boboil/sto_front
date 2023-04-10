<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <select
        v-model="selectedCar"
        class="form-control"
        required
        @change="showAnotherAvto"
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
    </div>
    <div class="form-check form-group">
      <div>
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
    <div class="form-group">
      <input
        v-model="fields.transfer"
        type="checkbox"
        id="transfer"
        class="btn-check"
        @change="transferAvto"
      />
      <label class="btn btn-secondary transfer" for="transfer">Хочу трансфер до СТО</label>
    </div>
    <div class="form-group">
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
      <label for="question">Опишіть коротко свою причину звернення, а бо що не так з авто:)</label>
      <textarea
        v-model="fields.question"
        class="form-control"
        name="question"
        rows="3"
      ></textarea>
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
import {assetIcon} from "@/helpers";

export default {
  data() {
    return {
      fields: {
        selectedCar: '',
        selectedTime: '',
        diagnosticDay: null,
        transfer: '',
        question: ''
      },
      selectedCar: "",
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
      if (!this.fields.diagnosticDay){
        return []
      }
      return this.time
    }
  },
  methods: {
    showAnotherAvto() {

    },
    async syncTime() {
      await this.$store.dispatch('time/checkAvailableTime', this.fields.diagnosticDay)
    },
    transferAvto() {
      // Add your logic for transferring the car here
    },
    submitForm() {
      const diagnosticReason = 'test'
      let startTime
      const currentTime = this.$moment()
      if (this.fields.diagnosticDay === "tomorrow") {
        startTime = `${this.$moment().add(1, "day").format("YYYY-MM-DD")}T${this.fields.selectedTime}`
      } else {
        startTime = `${this.$moment().add(1, "day").format("YYYY-MM-DD")}T${this.fields.selectedTime}`
      }
      // finishTime = this.$moment(this.fields.selectedTime, 'HH:mm').add(1, "hour").format('H:mm')
      const finishTime = currentTime.hour(this.fields.selectedTime).format('HH:mm:ss')
        console.log(finishTime)
      const data = {
        Name: this.user.Name,
        Phone: this.user.Phone,
        Email: '',
        Address: '',
        Notes: 'Онлайн, ' + diagnosticReason,
        Delivery: '',
        UserCarID: this.fields.selectedCar !== 'another' ? this.fields.selectedCar : 7401,
        StoPostID: 99,
        RemTypeID: 74,
        WorkReasonNotes: diagnosticReason + ' ' + this.fields.question,
        WorkStartTime: startTime,
        WorkFinishTime: finishTime,
        Currency: '',
        DeliveryAmount: 0.00,
        ProductAmount: 0.00,
        WorksAmount: 0.00,
        Total: 0.00,
        StatusCode: 'N',
        DocCode: 'U',
        Works: [
          {
            ID: 805,
            Quantity: 1.0,
            Name: '',
            StdHour: 0.00,
            Price: 0.00,
            Total: 0.00,
            Currency: '',
          },
        ],
      };
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
