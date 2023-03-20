import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  async fetchUser (endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }
    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      const user = getProp(response, this.options.user.property)
      // Transform the user object
      const customUser = {
        ...user,
        fullName: user.Name,
        roles: ['user']
      }

      this.$auth.setUser(customUser)

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}
