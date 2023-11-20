<template>
  <div :class="{'open': cartOpen}" class="cart" id="talonCart">
    <button class="cart-btn" @click="cartOpen = !cartOpen">
      <img :src="assetIcon('cart')"/>
      <span>{{ cartTotalQuantity }}</span>
    </button>
    <div class="cart-inner">
      <table class="cart-table">
        <thead>
        <tr>
          <th>Найменування</th>
          <th>Цiна</th>
          <th>Кiлькiсть</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cartItems" :key="item.ID">
          <td>
            <div class="cart-product-info">
              <button class="product-remove" @click="removeCartItem(item.ID)"></button>
              <span>{{ item.Name }}</span>
            </div>
          </td>
          <td>
            <div class="cart-product-price">
              {{ item.Price }} <span>грн</span>
            </div>
          </td>
          <td>
            <div class="cart-product-quantity">
              <button @click="updateCartItem(item.ID, -1)">-</button>
              <input max="9" min="1" type="number" :value="item.Qty">
              <button @click="updateCartItem(item.ID, +1)">+</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="cart-summary">
        <div class="cart-total">
          До сплати: <span>{{ totalSum }} грн</span>
        </div>
        <button class="cart-submit" @click="submitOrder">Перейти до оплати</button>
        <div id="liqpay-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {assetIcon} from '@/helpers'

export default {
  name: 'Cart',
  data() {
    return {
      cartOpen: false,
      assetIcon
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/getCartItems'
    }),
    cartTotalQuantity() {
      return this.cartItems.reduce((total, item) => {
        return total + item.Qty
      }, 0);
    },
    totalSum() {
      return this.cartItems.reduce(
        (total, item) => total + item.Price * item.Qty,
        0
      );
    },
  },
  methods: {
    openCart() {
      // Implement the logic to open the cart
    },
    removeCartItem(itemId) {
      this.$store.commit('cart/removeFromCart', itemId)
    },
    updateCartItem(itemId, quantity) {
      this.$store.commit('cart/updateCartItem', {itemId, quantity})
    },
    async submitOrder() {
      const params = {
        products: this.cartItems,
        user: this.$auth.user
      };

      await this.$store.dispatch('order/createOrder', params)
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
