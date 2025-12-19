import axios from "axios";

export const API_BASE_URL = "http://localhost:3001/api";

export const api = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
});

export default api;
