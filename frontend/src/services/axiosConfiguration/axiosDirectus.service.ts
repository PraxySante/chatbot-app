import axios from 'axios';

const axiosDirectus = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: import.meta.env.VITE_DIRECTUS_URL,
  // Configuration DIRECTUS SECRET to connect DIRECTUS URL
  // Configuration Content Type
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-store'
  },
});

export default axiosDirectus;
