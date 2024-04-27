import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  isFetching: false,
  error: false,
}
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // get all
    getProductStart: (state) => {
      state.isFetching = true,
        state.error = false
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false,
        state.products = action.payload
    },
    getProductFailed: (state) => {
      state.isFetching = false,
        state.error = true
    },
    //delete
    deleteProductStart: (state) => {
      state.isFetching = true,
        state.error = false
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false,
        state.products.splice(
          state.products.indIndex(item => item._id === action.payload.id), 1
        )
    },
    deleteProductFailed: (state) => {
      state.isFetching = false,
        state.error = true
    },
    //update
    updateProductStart: (state) => {
      state.isFetching = true,
        state.error = false
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false,
        state.products[state.products.findIndex((item) => item._id === action.payload)] = action.payload.product;
    },
    updateProductFailed: (state) => {
      state.isFetching = false,
        state.error = true
    },
    //update
    addProductStart: (state) => {
      state.isFetching = true,
        state.error = false
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false,
        state.products.push(action.payload)
    },
    addProductFailed: (state) => {
      state.isFetching = false,
        state.error = true
    },

  }
})

export const {
  getProductFailed,
  getProductSuccess,
  getProductStart,
  deleteProductFailed,
  deleteProductSuccess,
  deleteProductStart,
  updateProductFailed,
  updateProductSuccess,
  updateProductStart,
  addProductFailed,
  addProductSuccess,
  addProductStart
} = productSlice.actions
export default productSlice.reducer