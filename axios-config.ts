import axios from "axios";
import { API_ENDPOINTS, localStorageKeys } from "@/utils/consts";

const servLink = "http://5.129.197.148:8000";

const instance = axios.create({
  baseURL: servLink,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

const EXCLUDED_URLS = [API_ENDPOINTS.PRODUCTS.SINGLE_DETAIL()];

instance.interceptors.request.use((config) => {
  const isExcluded = EXCLUDED_URLS.some((url) => config.url?.includes(url));

  if (!isExcluded) {
    const token = localStorage.getItem(localStorageKeys.accessToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

// ✅ Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // token_not_valid && prevent infinite loop
    if (
      error?.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(
          localStorageKeys.refreshToken,
        );
        const response = await axios.post(`${servLink}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        localStorage.setItem(localStorageKeys.accessToken, newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // Հանում ենք թոքենները
        localStorage.removeItem(localStorageKeys.accessToken);
        localStorage.removeItem(localStorageKeys.refreshToken);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
