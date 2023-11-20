<template>
  <div>
    <Header />
    <main id="acts_works">
      <input type="hidden" id="payment_type" value="liqpay">
      <section class="block-work-acts">
        <div class="wrap">
          <div class="text-center">
            <div id="liqpay_checkout">
              Оплата не пройшла
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import Header from '@/components/Common/Layout/Header'
import {USER_ROUTES} from '@/constants'

export default {
  name: "success",
  components: {Header},
  created() {
    setTimeout(() => {
      this.$router.push({path: USER_ROUTES.USER_PROFILE.path})
    }, 5000)
  }
}
</script>
