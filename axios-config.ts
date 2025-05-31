import axios from "axios";

const servLink = "http://5.129.197.148:8000";

const instance = axios.create({
  baseURL: servLink,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default instance;
