// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Fetch single product by ID
export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (id) => {
    const res = await API.get(`products/${id}/`);
    return res.data;
  }
);


// 🔁 Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await API.get('products/');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    productDetail: null, // ✅ for single product
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = 'Failed to fetch products';
        state.loading = false;
        
      })
        .addCase(fetchProductDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.productDetail = action.payload;
            state.loading = false;
        })
        .addCase(fetchProductDetail.rejected, (state, action) => {
            state.error = 'Failed to fetch product detail';
            state.loading = false;
        });
  }
});

export default productSlice.reducer;
