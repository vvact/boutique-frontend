// # API logic using Axios

// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Change if your Django backend URL is different
});

export const getProducts = () => API.get('products/');
export const getCategories = () => API.get('categories/');
export const getProduct = (id) => API.get(`products/${id}/`);

export default API;
