"use server";

import React from "react";
import Home from "@/components/layout/home/home";

async function Page() {
  // const [housesData, housesDataAdmin] = await Promise.all([
  //   fetchHouses(),
  //   ActionGetProjectsInfo(),
  // ]);
  // const mergeProjectProfitDb: IProjectMerged[] = mergeComplexesWithProjects(
  //   housesData,
  //   housesDataAdmin.data as any,
  // ).filter((project) => !project.hide);

  return <Home />;
}

export default Page;
