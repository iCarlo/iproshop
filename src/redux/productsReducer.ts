import { createSlice } from '@reduxjs/toolkit'
import dummyProducts from '../seeders/productsSeeder';

const initialState = {
  products: dummyProducts,
}

export const productsSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;

      state.products = state.products.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        } else {
          return product
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateProduct } = productsSlice.actions

export default productsSlice.reducer