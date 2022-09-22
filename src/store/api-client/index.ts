import axios from 'axios';
// import { ACCESS_TOKEN } from '../../util/constants';

// For network requests that don't need these header-params, just create another axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_WEDREAM_API_URL,
  headers: {
    //Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
});

// Intercept requests and append current AUTH token to header
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('wedream-auth-token');
  config.headers.Authorization = token ? token : '';
  return config;
});

// Intercept all responses, for handling errors in one place
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //TODO: pop an alert with server error
    console.error(
      `AXIOS ERROR: ${error} \n RESPONSE FROM SERVER: ${error.response?.data}`
    );
    return Promise.reject(error);
  }
);

export default axiosInstance;
export * from './user';
export * from './dream';
export * from './category';
export * from './auth';
