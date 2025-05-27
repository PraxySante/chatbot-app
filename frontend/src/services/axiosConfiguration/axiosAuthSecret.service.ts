import axios from 'axios';

const userLanguage = navigator.language.slice(0, 2);
const hostname = document.location.hostname;

let project: string = '';

switch (true) {
  case hostname.includes('localhost'):
    project = 'Foch';
    break;
  case hostname.includes('cardio'):
    project = 'cardio';
    break;
  default:
    project = 'Foch';
  }

const axiosAuthSecret = axios.create({
  // Configuration axios to connect to Auth0
  baseURL: import.meta.env.VITE_URL_API_FRONT_CHATBOT,
  headers: { 'content-type': 'application/json' },
});

axiosAuthSecret.interceptors.request.use((config) => {
  config.data = {
    ...(config.data || {}),
    project: project,
    language: userLanguage,
  };
  return config;
});

export default axiosAuthSecret;
