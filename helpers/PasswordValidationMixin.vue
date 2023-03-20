<script>
import { has2Numbers, has2LowerCase, has2UpperCase } from '@/helpers/validators'

export default {
  computed: {
    isEmptyRepeatPassword() {
      return !this.fields.repeatPassword
    },
    isEqualPasswords() {
      const { newPassword, repeatPassword } = this.fields
      return newPassword === repeatPassword
    },
    inputCustomErrorMessage() {
      return 'Password does not match'
    },
    isValid() {
      const { newPassword } = this.fields
      return (
        this.has2Numbers &&
        this.has2LowerCase &&
        this.has2UpperCase &&
        newPassword &&
        this.isEqualPasswords
      )
    },
    has2Numbers() {
      return has2Numbers(this.fields.newPassword)
    },
    has2LowerCase() {
      return has2LowerCase(this.fields.newPassword)
    },
    has2UpperCase() {
      return has2UpperCase(this.fields.newPassword)
    },
    validateItems() {
      return [
        {
          label: 'Minimum two lowercase',
          status: this.has2LowerCase
        },
        {
          label: 'Minimum two uppercase',
          status: this.has2UpperCase
        },
        {
          label: 'Minimum two number',
          status: this.has2Numbers
        }
      ]
    }
  }
}
</script>
