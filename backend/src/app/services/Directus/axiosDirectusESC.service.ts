import axios from 'axios';
import { BEARER } from '../../constant/constant';

const axiosDirectusESC = axios.create({
  // Configuration to connect to DIRECTUS URL
  baseURL: process.env.URL_API_DIRECTUS,
  // Configuration Content Type
  headers: {
    Authorization: `${BEARER} ${process.env.BOT_TOKEN_DIRECTUS_ESC}`,
    'Cache-Control': 'no-store'
  },
});


export default axiosDirectusESC;
