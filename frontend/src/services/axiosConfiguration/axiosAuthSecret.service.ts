import axios from 'axios';

const userLanguage = navigator.language.slice(0, 2);
const hostname = document.location.hostname;

let project: string = '';

switch (true) {
  case hostname.includes(import.meta.env.VITE_HOST_FOCH):
    project = import.meta.env.VITE_PROJECT_FOCH;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_RECO_CARDIO):
    project = import.meta.env.VITE_PROJECT_ESC;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_AHP):
    project = import.meta.env.VITE_PROJECT_AHP;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_HSPJ):
    project = import.meta.env.VITE_PROJECT_HSPJ;
    break;
  default:
    project = import.meta.env.VITE_PROJECT_DEV;
    break;
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
