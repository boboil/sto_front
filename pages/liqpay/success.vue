<template>
  <div>
    <Header />
    <main id="acts_works">
      <input type="hidden" id="payment_type" value="liqpay">
      <section class="block-work-acts">
        <div class="wrap">
          <div class="text-center">
            <div id="liqpay_checkout">
              Дякуємо!
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import Header from "~/components/Common/Layout/Header.vue";

export default {
  name: "success",
  components: {Header}
}
</script>


<style scoped>

</style>
