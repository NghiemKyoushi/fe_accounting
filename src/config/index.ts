import axios, { AxiosError, AxiosHeaders } from "axios";
import { cookieSetting } from "../../utils";
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
axiosInstance.interceptors.request.use(
  function (config) {
    const token = cookieSetting.get("token");
    config.headers.Authorization = token ? `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpZW0iLCJpYXQiOjE2OTEwMzExNDgsImV4cCI6MTY5MTAzNDc0OH0.C8k6tyzMbMkedqD8jQzhWFNSp2uSF5KiecqB0LNAfqFsweMwLiE2dbMa42kJK5CqM6zDM2-cys2t2xaqGXeSBg` : "";
    // Do something before request is sent
    console.log("config", config);
    return config;
  },
  function (error) {
    console.log("error", error);
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
