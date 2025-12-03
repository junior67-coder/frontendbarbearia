import axios from 'axios';

// URL base da sua API Django (ajuste conforme necessário)
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// 1. Cria a instância base do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor: Inclui o token de acesso (Bearer) em TODAS as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    
    if (token) {
      // Formato 'Bearer <token>' exigido pelo Simple JWT
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
