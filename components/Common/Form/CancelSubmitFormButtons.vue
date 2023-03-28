<template>
  <div
    class="d-flex justify-content-end mt-3"
    :class="{ 'bottom-fixed-buttons-panel': bottomFixed }"
  >
    <b-button
      v-if="!hideCancel"
      variant="outline-link"
      class="btn-cancel text-uppercase"
      :disabled="disabledCancel"
      @click="$emit('cancel')"
    >
      Cancel
    </b-button>
    <b-button
      type="submit"
      variant="primary"
      class="btn-save text-uppercase ml-3"
      :disabled="disabledSubmit"
      @click="$emit('submit')"
    >
      {{ submitTitle }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'CancelSubmitFormButtons',

  props: {
    hideCancel: {
      type: Boolean,
      default: false
    },
    disabledCancel: {
      type: Boolean,
      default: false
    },
    disabledSubmit: {
      type: Boolean,
      default: false
    },
    submitTitle: {
      type: String,
      default: 'Save'
    },
    bottomFixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
