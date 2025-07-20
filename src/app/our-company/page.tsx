"use server";

import { fetchHouses } from "@/lib/getHouses";
import { ActionGetProjectsInfo } from "@/app/actions/projects/get-projects";
import OurCompany from "@/app/our-company/our-company";

async function Requests() {
  const [housesData, housesDataAdmin] = await Promise.all([
    fetchHouses(),
    ActionGetProjectsInfo(),
  ]);

  return (
    <OurCompany
      houses={housesData as IProjectStage[]}
      housesDataAdmin={housesDataAdmin.data as IProjectData[]}
    />
  );
}

export default Requests;
