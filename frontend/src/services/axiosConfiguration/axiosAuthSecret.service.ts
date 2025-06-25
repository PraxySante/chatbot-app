import axios from 'axios';

const userLanguage = "fr"; //navigator.language.slice(0, 2);
const hostname = document.location.hostname;

let project: string = '';
let baseUrl: string = '';

switch (true) {
  case hostname.includes(import.meta.env.VITE_HOST_FOCH):
    project = import.meta.env.VITE_PROJECT_FOCH;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_FOCH
    break;
  case hostname.includes(import.meta.env.VITE_HOST_RECO_CARDIO):
    project = import.meta.env.VITE_PROJECT_ESC;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_ESC
    break;
  case hostname.includes(import.meta.env.VITE_HOST_AHP):
    project = import.meta.env.VITE_PROJECT_AHP;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_AHP
    break;
  case hostname.includes(import.meta.env.VITE_HOST_HPSJ):
    project = import.meta.env.VITE_PROJECT_HPSJ;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_HPSJ
    break;
  default:
    project = import.meta.env.VITE_PROJECT_DEV;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_DEV
    break;
}

const axiosAuthSecret = axios.create({
  // Configuration axios to connect to Auth0
  baseURL: baseUrl,
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
