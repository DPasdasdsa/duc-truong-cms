import axios from 'axios';
import router from '../router';
import {getToken} from '@/utils/token';
import {ACCESS_TOKEN} from '@/constants/common';

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, ' +
      'Access-Control-Request-Method, Access-Control-Request-Headers',
    'Content-Type': 'application/json'
  }
});

service.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers.common = config.headers.common || {};
    const token = getToken(ACCESS_TOKEN);
    console.log(token)
    if (token) {
      config.headers['Accept'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => response.data,
  async (error) => {

    //Errors authorization
    if (error.response.status === 403) {
      setTimeout(async function () {
        return await router.push({name: '403'});
      }, 1000)
      await Promise.reject(error.response.data);
    }

    //Errors validate.
    if (error.response.status === 422) {
      return Promise.reject(error.response.data);
    }

    //Errors not found.
    if (error.response.status === 404) {
      return Promise.reject(error.response.data);
    }

    //Errors not login.
    if (error.response.status === 401) {
      await localStorage.setItem("urlAfter", window.location.href);
      return await router.push({name: 'Login'});
    }

    //Errors service.
    if (error.response.status === 500) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default service;
