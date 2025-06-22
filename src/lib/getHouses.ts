// lib/getHouses.ts
import { GetHouses } from "@/utils/api";

// const CACHE_KEY = "houses";

export async function fetchHouses() {
  // const cached = cache.get(CACHE_KEY);
  // if (cached) {
  //   return cached;
  // }
  //
  // try {
  //   const res = await GetHouses({});
  //   // կամ քո ցանկալի params-ները
  //   const data = [...res.data.data].filter(
  //     (houe: IProjectStage) => houe.type === "RESIDENTIAL",
  //   );
  //   cache.set(CACHE_KEY, data); // պահում ենք cache-ում
  //   return data;
  // } catch (e) {
  //   console.error("Error fetching houses:", e);
  //   return [];
  // }

  const res = await GetHouses({});

  return res.data.data;
}
