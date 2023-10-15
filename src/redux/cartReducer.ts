import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../interfaces/products';

const initialState: { cart: Product[] } = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload)
      }

    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer