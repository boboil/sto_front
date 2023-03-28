<script>
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'

export default {
  middleware({ redirect, auth }) {
    return redirect(AUTH_ROUTES.SIGN_IN)
  }
}
</script>
