import axios from "axios";

export const servLink = "https://pb14286.profitbase.ru/api/v4/json";

export const SITE_URL = {
  HOME: "/",
  REQUESTS: "/requests",
  OUR_COMPANY: "/our-company",
  SALES: "/sales",
  METHODS_PURCHASE: "/methods-purchase",
};

export const localStorageKeys = {
  tokenData: "tokenData",
  tokenTime: "tokenTime",
};

export const all = "Все";

export const StartGenerateNewToken = async () => {
  return axios.post(`${servLink}/authentication`, {
    type: "api-app",
    credentials: {
      pb_api_key: "app-6839b0cd3f5f0",
    },
  });
};

export const formatPrice = (value: number) => {
  if (value >= 1_000_000) {
    const millions = (value / 1_000_000).toFixed(1).replace(".", ",");
    return `${millions} млн`;
  } else if (value >= 1_000) {
    const thousands = Math.round(value / 1_000);
    return `${thousands} тыс`;
  } else {
    return value.toString();
  }
};

export const isValidInternationalPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/[\s\-().]/g, ""); // մաքրում ենք բացատներ, փակագծեր, դաշեր և կետեր

  const pattern = /^(?:\+|00)?[1-9]\d{6,14}$/;

  return pattern.test(cleaned);
};
