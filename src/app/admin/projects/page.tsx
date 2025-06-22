// app/admin/projects/page.tsx

"use server";

import Projects from "@/app/admin/projects/projects";
import { fetchHouses } from "@/lib/getHouses";
import { ActionGetProjectsInfo } from "@/app/actions/projects/get-projects";

// 🔁 Ասում ենք՝ cache չպահել, միշտ server-side render
export const dynamic = "force-dynamic";

export default async function Page() {
  // 🔁 Կատարում ենք երկու async հարցում միաժամանակ
  const [housesData, housesDataAdmin] = await Promise.all([
    fetchHouses(),
    ActionGetProjectsInfo(),
  ]);

  return (
    <Projects
      houses={housesData as IProjectStage[]}
      housesDataAdmin={housesDataAdmin.data as IProjectData[]}
    />
  );
}
