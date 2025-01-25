import axios from 'axios';

const axiosAuthSecret = axios.create({
  // Configuration axios to connect to Auth0
  baseURL: import.meta.env.VITE_URL_API_FRONT_CHATBOT,
  headers: { 'content-type': 'application/json' },
});

export default axiosAuthSecret;
