import axios from 'axios';

const axiosDirectus = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: import.meta.env.VITE_DIRECTUS_URL,
});

// Configuration DIRECTUS SECRET to connect DIRECTUS URL
axiosDirectus.defaults.headers.common['Authorization'] =
  import.meta.env.VITE_DIRECTUS_SECRET;
// Configuration Content Type
axiosDirectus.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export default axiosDirectus;
