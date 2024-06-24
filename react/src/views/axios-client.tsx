import axios from "axios";

// Устанавливает базовый URL для всех запросов. 
// Это означает, что все запросы будут отправляться на адрес, начинающийся с этого URL.
// VITE_API_BASE_URL описали в .env файле
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// Перехватываем запросы и сохраняем в переменные. 
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// Возможные варианты обработки запросов
axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  throw error;
})

export default axiosClient