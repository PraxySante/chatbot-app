import axios from 'axios';
import { BEARER } from '../../constant/constant';

const axiosDirectus = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: process.env.URL_API_DIRECTUS,
  // Configuration Content Type
  headers: {
    Authorization: `${BEARER} ${process.env.BOT_TOKEN_DIRECTUS}`,
    'Cache-Control': 'no-store'
  },
});

export default axiosDirectus;
