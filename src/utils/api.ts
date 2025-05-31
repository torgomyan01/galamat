import instance from "../../axios-config";
import { API_ENDPOINTS } from "@/utils/consts";

export const GetProducts = () => {
  return instance.get(API_ENDPOINTS.PRODUCTS.LIST);
};
