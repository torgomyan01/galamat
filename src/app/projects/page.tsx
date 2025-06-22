"use server";

import React from "react";
import Projects from "@/components/layout/projects/projects";
import { ActionGetProjectsInfo } from "@/app/actions/projects/get-projects";
import { GetHouses } from "@/utils/api";

async function Page() {
  const housesData: any = await GetHouses({});
  const housesDataAdmin: any = await ActionGetProjectsInfo();

  return (
    <Projects
      houses={housesData.data.data}
      housesDataAdmin={housesDataAdmin.data}
    />
  );
}

export default Page;
