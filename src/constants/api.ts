import axios from 'axios';
// @ts-ignore
import { API_DEV_AWS, API_PROD_AWS } from '@env';
const instance = axios.create({
  baseURL: 'https://50de-103-39-132-188.ngrok.io', // for local
  // baseURL: API_PROD_AWS, // for prod
  //   baseURL: API_DEV_AWS,   // for dev
});
export default instance;
