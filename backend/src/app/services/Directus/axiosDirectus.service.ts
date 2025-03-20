import axios from 'axios';

const axiosDirectus = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: process.env.URL_API_DIRECTUS,
  // Configuration DIRECTUS SECRET to connect DIRECTUS URL
  // Configuration Content Type
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-store'
  },
});

export default axiosDirectus;
