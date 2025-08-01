"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionGetProjectsInfo() {
  try {
    const result = await prisma.projects.findMany();

    return {
      status: 1,
      data: result,
      error: "",
    };
  } catch (error) {
    return {
      status: 0,
      data: [],
      error,
    };
  } finally {
    await prisma.$disconnect();
  }
}
