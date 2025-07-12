import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
// src/app/store.js

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    categories: categoryReducer,
     // ... other reducers
  },
});
