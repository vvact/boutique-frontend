// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Update for production if needed
});

// 🛍️ Product-related
export const getProducts = () => API.get('products/');
export const getProduct = (id) => API.get(`products/${id}/`);
export const getCategories = () => API.get('categories/');

// 👤 Auth-related
export const registerUser = (data) => API.post('accounts/register/', data);
export const loginUser = (data) => API.post('accounts/login/', data);
export const logoutUser = (token) =>
  API.post(
    'accounts/logout/',
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

// 🧾 Orders
export const submitOrder = (orderData, token) =>
  API.post('orders/create/', orderData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export default API;
