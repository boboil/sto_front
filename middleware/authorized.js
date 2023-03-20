import { AUTH_ROUTES, USER_ROUTES } from '@/constants'
import { getUserRoutes } from '@/helpers'

export default function({ route, store, redirect, error }) {
  if (
    !store.state.auth.loggedIn &&
    !Object.values(AUTH_ROUTES).includes(route.path)
  ) {
    return redirect(AUTH_ROUTES.SIGN_IN)
  }

  const { user } = store.state.auth
  const [appZone, page] = route.path.split('/').splice(1)

  if (!user || !user.roles || !appZone) return

  if (
    !Object.keys(APP_ZONE).includes(appZone.toUpperCase()) ||
    (!Object.entries(getUserRoutes(user.roles)).find(([key, val]) =>
      route.path.includes(val.path)
    ) &&
      page)
  ) {
    return error({ message: 'Access Denied', statusCode: 403 })
  }
}
