// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// 🔁 Fetch ALL products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await API.get('products/');
    return response.data; // May include .results if paginated
  }
);

// 🔍 Fetch SINGLE product by ID
export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (id) => {
    const response = await API.get(`products/${id}/`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    productDetail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🌀 Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.results || action.payload; // ✅ Handle paginated or plain
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = 'Failed to fetch products';
        state.loading = false;
      })

      // 🔍 Fetch Single Product
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetail.rejected, (state) => {
        state.error = 'Failed to fetch product detail';
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
