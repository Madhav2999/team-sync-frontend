import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Defensive check
    if (!error.response) {
      console.error("Network or CORS error:", error.message);

      return Promise.reject({
        message: error.message || "Network Error",
        errorCode: "NETWORK_ERROR",
      });
    }

    const { data, status } = error.response;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        return API(originalRequest);
      } catch (refreshError) {
        window.location.href = "/";
      }
    }

    const customError: CustomError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);


export default API;
