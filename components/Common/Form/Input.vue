<template>
  <b-form-group
    :state="fieldState"
    :label="elementLabel"
    :label-for="uid"
    :invalid-feedback="errorMessage || defaultErrorMessage"
    :class="{ 'inline-input': inline }"
  >
    <template v-if="hint" #label class="text-uppercase">
      <span class="d-flex justify-content-between">
        <span>{{ elementLabel }}</span>
      </span>
      <small class="text-muted font-size-10">{{ hint }}</small>
    </template>
    <div class="position-relative input-block">
      <b-form-input
        :id="uid"
        class="input"
        :type="type"
        :placeholder="placeholder"
        :size="size"
        :state="fieldState"
        :required="required"
        :pattern="pattern"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        v-bind="$attrs"
        @input="(v) => $emit('update', v)"
        @blur="validate($event.target.value)"
        v-on="$listeners"
      >
      </b-form-input>
      <b-icon
        v-if="withIcon"
        :icon="icon"
        class="eye-icon"
        @click="$emit('show-password')"
      >
      </b-icon>
    </div>
  </b-form-group>
</template>

<script>
import * as helper from '@/helpers'
import RequiredMixin from '@/components/Common/Form/RequiredMixin'

export default {
  name: 'FormInput',

  mixins: [RequiredMixin],

  inheritAttrs: false,

  model: {
    event: 'update'
  },

  props: {
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return [
          'text',
          'password',
          'email',
          'number',
          'search',
          'date',
          'time',
          'tel',
          'url',
          'color'
        ].includes(val)
      }
    },
    label: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: (val) => ['lg', 'md', 'sm'].includes(val)
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    },
    step: {
      type: String,
      default: '0.05'
    },
    required: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    hasCustomError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    ariaDescription: {
      type: String,
      default: ''
    },
    withIcon: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    uid: helper.genRandomUID('FIN', 5),
    fieldState: null,
    defaultErrorMessage: 'Invalid value'
  }),

  computed: {
    icon() {
      return this.type === 'password' ? 'eye' : 'eye-slash'
    }
  },
  watch: {
    errorMessage(val) {
      this.fieldState = !val
    }
  },

  methods: {
    validate(v) {
      if (this.type === 'text') {
        this.fieldState = !(
          (this.required && (!v || v.length < 1)) ||
          this.hasCustomError
        )
        this.$emit('update:hasError', !this.fieldState)
      } else if (this.type === 'number') {
        this.fieldState = !(!v || isNaN(Number(v)) || this.hasCustomError)
        this.$emit('update:hasError', !this.fieldState)
      } else if (this.type === 'email' && v) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.fieldState = v && re.test(String(v).toLowerCase())
        this.$emit('update:hasError', !this.fieldState)
      }
    }
  }
}
</script>
