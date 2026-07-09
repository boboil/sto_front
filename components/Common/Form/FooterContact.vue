<template>
  <div class="mb-4 mt-4 telegram-connect-block">
    <div class="links-block justify-content-between mt-4">
      <a href="tel:+380507003005">050 700 300 5</a>
    </div>
    <div class="links-block justify-content-between mt-4">
      <a href="tel:+380675468823">067 546 882 3</a>
      <a href="https://t.me/+380675468823" target="_blank">
        <img :src="assetImage('telegram')" alt="telegram" width="32px">
      </a>
    </div>
  </div>
</template>

<script>
import { assetImage } from '@/helpers'
export default {
  name: 'FooterContact',
  data: () => ({
    assetImage
  })
}
</script>
