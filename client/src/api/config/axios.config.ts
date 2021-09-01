import axios from "axios";

export const Axios = axios.create({ baseURL: "http://localhost:8080/api" });

Axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
