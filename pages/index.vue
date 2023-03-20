<!--<template>-->
<!--  <FormSignIn/>-->
<!--</template>-->

<!--<script>-->
<!--import FormSignIn from "@/components/Auth/FormSignIn";-->
<!--export default {-->
<!--  name: 'IndexPage',-->
<!--  components: [FormSignIn]-->
<!--}-->
<!--</script>-->
<script>
import {AUTH_ROUTES, USER_ROUTES} from '@/constants'

export default {
  middleware({ redirect, auth }) {
    return redirect(AUTH_ROUTES.SIGN_IN)
  }
}
</script>
