"use server";

import React from "react";
import Home from "@/components/layout/home/home";
import { fetchHouses } from "@/lib/getHouses";

async function Page() {
  const housesData: any = await fetchHouses();

  return <Home houses={housesData} />;
}

export default Page;
