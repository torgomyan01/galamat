import { GetSingleProduct } from "@/utils/api";

const cache = new Map<string, any>();

export async function loadProductData(id: string) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const data = await GetSingleProduct(id);

  cache.set(id, data);

  return data;
}
