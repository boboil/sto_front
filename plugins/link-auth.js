import {normalizeUaPhone} from '@/helpers'
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'

// Auto-login via direct link:
//   https://cabinet.sto.sumy.ua/user/acts/831?login=0501234567&password=xxx&any=other&params=kept
// The login/password params are consumed here during app boot (before the
// target page loads its data) and removed from the address bar; the rest of
// the query stays. A link session always wins over a previously stored one.
export default async function ({route, redirect, $auth}) {
  const first = (v) => (Array.isArray(v) ? v[0] : v)
  const login = first(route.query.login)
  const password = first(route.query.password)

  if (!login || !password) {
    return
  }

  const query = {...route.query}
  delete query.login
  delete query.password

  try {
    await $auth.loginWith('local', {
      data: {
        username: normalizeUaPhone(login) || login,
        password,
        grant_type: 'password'
      }
    })
    // once routing settles, strip the credentials from the address bar,
    // keeping all other query params; a bare link like /?login=..&password=..
    // lands on the profile
    window.onNuxtReady((nuxt) => {
      const target = (route.path === '/' || route.path.startsWith('/auth'))
        ? USER_ROUTES.USER_PROFILE.path
        : route.path
      nuxt.$router.replace({path: target, query}).catch(() => {})
    })
  } catch (e) {
    console.log('LINK AUTH ERROR', e?.response?.data?.error_description || e)
    redirect(AUTH_ROUTES.SIGN_IN)
  }
}
