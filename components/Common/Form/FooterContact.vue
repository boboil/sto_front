<template>
  <div class="mb-4 mt-4 telegram-connect-block">
    <div class="links-block justify-content-between mt-4">
      <a href="tel:+380662050303">066 205 03 03 - Олександр</a>
      <a href="https://t.me/+380662050303" target="_blank">
        <img :src="assetImage('telegram')" alt="telegram" width="32px">
      </a>
    </div>
    <div class="links-block justify-content-between mt-4">
      <a href="tel:+380990206700">099 02 06 700 - Дмитро</a>
      <a href="https://t.me/+380990206700" target="_blank">
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
