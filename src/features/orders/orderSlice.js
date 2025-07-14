// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api'; // ✅ 


export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, thunkAPI) => {
    const response = await API.post('orders/create/', orderData);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    success: false,
    error: null,
    orderDetails: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetails = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
