"use server";

import React from "react";
import { fetchHouses } from "@/lib/getHouses";
import Projects from "@/components/layout/projects/projects";
import { ActionGetProjectsInfo } from "@/app/actions/projects/get-projects";

async function Page() {
  const housesData: any = await fetchHouses();
  const housesDataAdmin: any = await ActionGetProjectsInfo();

  return (
    <Projects houses={housesData} housesDataAdmin={housesDataAdmin.data} />
  );
}

export default Page;
