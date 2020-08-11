import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '/',
  withCredentials:true
});


const getCookieValue = function (a: string) {
  let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

const requestHandler = (config: AxiosRequestConfig) => {
  // Modify config here
  const token = getCookieValue('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.timeout = 30000;
  return config;
};

instance.interceptors.request.use(requestHandler);
instance.interceptors.response.use(undefined, (error: AxiosError) => {
  // handle error
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response?.data?.error)
});

export default instance;
