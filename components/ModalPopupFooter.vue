<template>
  <CancelSubmitFormButtons
    class="modal-popup-footer"
    :disabled-submit="disabledSubmit"
    :disabled-cancel="disabledCancel"
    :submit-title="submitTitle"
    @cancel="$emit('cancel')"
  />
</template>

<script>
import CancelSubmitFormButtons from '@/components/Common/Form/CancelSubmitFormButtons'

export default {
  name: 'ModalPopupFooter',

  components: { CancelSubmitFormButtons },

  props: {
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
    }
  }
}
</script>
