import { AUTH_ROUTES } from '@/constants'

export default function({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      console.log(error)
      return redirect(AUTH_ROUTES.SIGN_IN)
    }
  })
}
