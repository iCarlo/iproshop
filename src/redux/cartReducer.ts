import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../interfaces/products';

interface CartState {
  cart: {
    userId: number,
    items: Product[]
  }[]
}

const initialState: CartState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cart.find(cartItem => cartItem.userId === action.payload.userId);

      if (!cartItem) {
        state.cart.push({
          userId: action.payload.userId,
          items: [action.payload.item]
        })
      } else {
        const item = cartItem.items.find(item => item.id === action.payload.item.id);

        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          cartItem.items.push(action.payload.item)
        }
      }

    },
    removeItem: (state, action) => {
      const cartItem = state.cart.find(cartItem => cartItem.userId === action.payload.userId);

      if (cartItem) {
        cartItem.items = cartItem.items.filter(item => item.id !== action.payload.itemId);
      }
    },
    resetCart: (state, action) => {
      const cartItem = state.cart.find(cartItem => cartItem.userId === action.payload.userId);

      if (cartItem) {
        cartItem.items = []
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer