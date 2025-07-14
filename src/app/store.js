// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import orderReducer from '../features/orders/orderSlice';
import cartReducer from '../features/cart/cartSlice'; // ✅ Corrected path

import { combineReducers } from 'redux';

// 1. Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  products: productReducer,
  categories: categoryReducer,
  orders: orderReducer,
  cart: cartReducer,
});

// 2. Create persist config
const persistConfig = {
  key: 'root',
  storage,
};

// 3. Wrap combined reducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// 5. Create persistor
export const persistor = persistStore(store);
