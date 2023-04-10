import {actions} from "~/store/time";

export const state = () => ({
  cartItems: [],
});

export const getters = {
  getCartItems({cartItems}) {
    return cartItems
  },
}
export const mutations = {
  addToCart(state, item) {
    const existingItemIndex = state.cartItems.findIndex(t => t.ID === item.ID);

    if (existingItemIndex !== -1) {
      state.cartItems[existingItemIndex].Qty += 1;
    } else {
      state.cartItems.push({ ...item, Qty: 1 });
    }
  },
  removeFromCart(state, itemId) {
    const itemIndex = state.cartItems.findIndex(t => t.ID === itemId);

    if (itemIndex !== -1) {
      state.cartItems.splice(itemIndex, 1);
    } else {
      console.warn(`Item with ID ${itemId} not found in cart.`);
    }
  },
  updateCartItem(state, {itemId, quantity}) {
    const itemIndex = state.cartItems.findIndex(t => t.ID === itemId);

    if (itemIndex !== -1) {
      const newQty = state.cartItems[itemIndex].Qty + quantity;

      if (newQty > 0) {
        state.cartItems[itemIndex].Qty = newQty;
      } else if (newQty === 0) {
        state.cartItems.splice(itemIndex, 1);
      } else {
        console.warn(`Invalid quantity change: ${quantity}. The resulting quantity would be negative.`);
      }
    } else {
      console.warn(`Item with ID ${itemId} not found in cart.`);
    }
  },
  clearCart(state) {
    state.cartItems = []
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
