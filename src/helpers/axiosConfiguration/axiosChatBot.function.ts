import axios from 'axios';

const axiosOpenAI = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: import.meta.env.VITE_MIXTRAL_API_BASE,
});

// Configuration DIRECTUS SECRET to connect DIRECTUS URL
axiosOpenAI.defaults.headers.common['Authorization'] =
  import.meta.env.VITE_OPEN_API_KEY;
// Configuration Content Type
axiosOpenAI.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export default axiosOpenAI;
