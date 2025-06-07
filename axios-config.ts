import axios from "axios";
import moment from "moment";
import { localStorageKeys, servLink } from "@/utils/consts";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const fetchNewToken = async () => {
  const response = await axios.post(`${servLink}/authentication`, {
    type: "api-app",
    credentials: {
      pb_api_key: "app-6839b0cd3f5f0",
    },
  });

  return response.data;
};

const instance = axios.create({
  baseURL: servLink,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
instance.interceptors.request.use(async (config: any) => {
  // Չենք ավելացնում token, եթե authentication հարցում է
  if (config.url?.includes("/authentication")) {
    return config;
  }

  const tokenTime = localStorage.getItem(localStorageKeys.tokenTime);
  const now = moment().unix();

  // Ժամկետանց token
  if (!tokenTime || +tokenTime < now) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const tokenData = await fetchNewToken();
        const { access_token, remaining_time } = tokenData;

        const expireAt = `${moment().unix() + remaining_time}`;
        localStorage.setItem(localStorageKeys.tokenData, access_token);
        localStorage.setItem(localStorageKeys.tokenTime, expireAt);

        processQueue(null, access_token);

        config.params = {
          ...config.params,
          access_token,
        };
      } catch (err) {
        processQueue(err, null);
        throw err;
      } finally {
        isRefreshing = false;
      }
    } else {
      // Սպասում ենք մինչ token-ը թարմացվում է
      const token = await new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });

      config.params = {
        ...config.params,
        access_token: token,
      };
    }
  } else {
    // Օգտագործում ենք առկա token-ը
    const token = localStorage.getItem(localStorageKeys.tokenData);
    if (token) {
      config.params = {
        ...config.params,
        access_token: token,
      };
    }
  }

  return config;
});

// ✅ Response Interceptor
instance.interceptors.response.use(
  async (response) => {
    const originalRequest = response.config;

    // "Not allowed" սխալի fallback
    if (
      response.data &&
      typeof response.data === "object" &&
      response.data.message === "Not allowed"
    ) {
      try {
        const tokenData = await fetchNewToken();
        const { access_token, remaining_time } = tokenData;

        const expireAt = `${moment().unix() + remaining_time}`;
        localStorage.setItem(localStorageKeys.tokenData, access_token);
        localStorage.setItem(localStorageKeys.tokenTime, expireAt);

        originalRequest.params = {
          ...(originalRequest.params || {}),
          access_token,
        };

        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokenData = await fetchNewToken();
        const { access_token, remaining_time } = tokenData;

        const expireAt = `${moment().unix() + remaining_time}`;
        localStorage.setItem(localStorageKeys.tokenData, access_token);
        localStorage.setItem(localStorageKeys.tokenTime, expireAt);

        originalRequest.params = {
          ...(originalRequest.params || {}),
          access_token,
        };

        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
