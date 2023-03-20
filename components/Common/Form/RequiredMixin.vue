<script>
export default {
  computed: {
    elementLabel() {
      const requiredMark = this.required ? ' *' : ''
      return this.label ? `${this.label}${requiredMark}` : ''
    }
  }
}
</script>
