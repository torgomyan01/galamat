import { fetchHouses } from "@/lib/getHouses";
import { ActionGetProjectsInfo } from "@/app/actions/projects/get-projects";
import RealEstateContent from "@/components/layout/real-estate/real-estate-content";
import { mergeComplexesWithProjects } from "@/utils/helpers";
import { Suspense } from "react";

async function RealEstate() {
  const [housesData, housesDataAdmin] = await Promise.all([
    fetchHouses(),
    ActionGetProjectsInfo(),
  ]);

  const mergeProjectProfitDb: IProjectMerged[] = mergeComplexesWithProjects(
    housesData,
    housesDataAdmin.data as any,
  ).filter((project) => !project.hide);

  return (
    <Suspense>
      <RealEstateContent projects={mergeProjectProfitDb} />
    </Suspense>
  );
}

export default RealEstate;
