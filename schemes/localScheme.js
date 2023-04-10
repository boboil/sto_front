import { LocalScheme } from '~auth/runtime'

function getProp(obj, path, defaultValue) {
  const value = path.split('.').reduce((o, p) => (o && o[p]) ? o[p] : defaultValue, obj)
  return value === undefined ? defaultValue : value
}


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

    // Check if the token is stored in localStorage
    const storedToken = localStorage.getItem('auth._token.local');
    console.log('Stored token:', storedToken);

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
  // async setToken (tokenValue) {
  //   const token = this.$auth.token.sync().set(tokenValue)
  //   this.$auth.ctx.$axios.setHeader(this.options.token.name, token)
  //   await this.$auth.storage.setUniversal(this.options.token.storageKey, token)
  // }
}
