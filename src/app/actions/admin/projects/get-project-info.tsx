"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionGetProjectInfo(projectId: number) {
  try {
    const result = await prisma.projects.findFirst({
      where: {
        project_id: projectId,
      },
    });

    if (!result) {
      const resultCreated = await prisma.projects.create({
        data: {
          project_id: projectId,
          hide: false,
          position: "",
        },
      });

      return {
        status: 1,
        data: resultCreated,
      };
    }

    return {
      status: 1,
      data: result,
    };
  } catch (error) {
    return {
      status: 0,
      data: [],
      error,
    };
  }
}
