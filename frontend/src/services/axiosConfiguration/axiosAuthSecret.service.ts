import axios from 'axios';

const hostname = document.location.hostname;

let project: string = '';
let baseUrl: string = '';

switch (true) {
  case hostname.includes(import.meta.env.VITE_HOST_FOCH):
    project = import.meta.env.VITE_PROJECT_FOCH;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_FOCH;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_AHP):
    project = import.meta.env.VITE_PROJECT_AHP;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_AHP;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_HPSJ):
    project = import.meta.env.VITE_PROJECT_HPSJ;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_HPSJ;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_ENNOV):
    project = import.meta.env.VITE_PROJECT_ENNOV;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_ENNOV;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_CCIB):
    project = import.meta.env.VITE_PROJECT_CCIB;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_CCIB;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_MCJR):
    project = import.meta.env.VITE_PROJECT_MCJR;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_MCJR;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_DA):
    project = import.meta.env.VITE_PROJECT_DA;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_DA;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_HFAR):
    project = import.meta.env.VITE_PROJECT_HFAR;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_HFAR;
    break;
  case hostname.includes(import.meta.env.VITE_HOST_CQFD):
    project = import.meta.env.VITE_PROJECT_CQFD;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_CQFD;
    break;
  default:
    project = import.meta.env.VITE_PROJECT_DEV;
    baseUrl = import.meta.env.VITE_URL_API_FRONT_CHATBOT_DEV;
    break;
}

const axiosAuthSecret = axios.create({
  // Configuration axios to connect to Auth0
  baseURL: baseUrl,
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
});

axiosAuthSecret.interceptors.request.use((config) => {
  config.data = {
    ...(config.data || {}),
    project: project,
  };
  return config;
});

export default axiosAuthSecret;
