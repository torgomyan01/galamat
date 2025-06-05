import axios from "axios";
import {
  localStorageKeys,
  servLink,
  StartGenerateNewToken,
} from "@/utils/consts";
import moment from "moment";

const instance = axios.create({
  baseURL: servLink,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(async (config) => {
  const tokenTime = localStorage.getItem(localStorageKeys.tokenTime);
  const timeNow = moment().unix();

  if (!tokenTime || +tokenTime < timeNow) {
    const getToken = await StartGenerateNewToken();

    const newTime = `${getToken.data.remaining_time + moment().unix()}`;
    localStorage.setItem(localStorageKeys.tokenTime, newTime);
    localStorage.setItem(
      localStorageKeys.tokenData,
      getToken.data.access_token,
    );

    config.params = {
      ...config.params,
      access_token: getToken.data.access_token,
    };
  } else {
    const getToken = localStorage.getItem(localStorageKeys.tokenData);

    if (getToken) {
      config.params = {
        ...config.params,
        access_token: getToken,
      };
    }
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default instance;
