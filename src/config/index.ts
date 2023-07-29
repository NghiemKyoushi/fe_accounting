import axios, { AxiosError, AxiosHeaders } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
