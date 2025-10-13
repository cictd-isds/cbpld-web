import axios from "axios";
import { useBoundStore } from "../store/store";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = "Bearer " + useBoundStore.getState().token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
