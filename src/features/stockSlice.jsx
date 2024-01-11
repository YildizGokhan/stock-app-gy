import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
  purchases: [],
  brands: [],
  sales: [],
  error: false,
  loading: false,
  firms: [],
  categories: [],
}

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    getStockSuccess: (state, { payload }) => {
      state.loading = false
      state[payload.url] = payload.apiData
    },
    
  },
})

export const { getStockSuccess } = stockSlice.actions

export default stockSlice.reducer
