import axios from "axios";
import { getLocal } from "@/utils/local";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
});
service.interceptors.request.use(
  config => {
    if (getLocal("token")) {
      config.headers["Authorization"] = "Bearer " + getLocal("token");
    }
    return config;
  },
  err => {
    Promise.reject(err);
  }
);
service.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    Promise.reject(err);
  }
);
export default service;
