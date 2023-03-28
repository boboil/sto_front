<template>
  <client-only>
    <b-modal
      :id="uid"
      v-model="modalShow"
      size="md"
      :content-class="`modal-popup-wrapper border-0 ${contentClass}`"
      header-class="px-4"
      body-class="mx-3 px-4"
      :hide-footer="hideFooter"
      :hide-header="hideHeader"
      :scrollable="scrollable"
      no-fade
      no-close-on-esc
      no-close-on-backdrop
    >
      <slot :modalId="uid" />
      <template #modal-header>
        <h5 class="pl-3 pt-2 my-1 modal-popup-title">
          {{ title }}
        </h5>
        <b-button
          v-if="!noClose"
          variant="outline-link"
          class="mr-3 mt-2 p-0"
          @click="modalShow = false"
        >
          <img :src="assetIcon('close')"/>
        </b-button>
      </template>
      <template #modal-footer>
        <slot name="modal-footer" />
      </template>
    </b-modal>
  </client-only>
</template>

<script>
import * as helper from '@/helpers'
import { BIcon } from "bootstrap-vue";
import {assetIcon} from "@/helpers";

export default {
  name: 'ModalPopup',
  methods: {assetIcon},
  components: {
    BIcon
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: ''
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: true
    },
    noClose: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    modalShow: false,
    uid: helper.genRandomUID('POPUP', 5)
  }),

  computed: {},

  watch: {
    isOpen(val) {
      this.modalShow = !!val
    },
    modalShow(val) {
      this.$emit('update:isOpen', !!val)
    }
  },

  mounted() {
    this.modalShow = this.isOpen
  }
}
</script>

<style lang="scss">
.modal-media {
  overflow: hidden;

  .modal-body {
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
