"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function ActionUpdateProbabilities(
  id: number,
  key: string,
  value: number,
) {
  try {
    const updateProbabilities = await prisma.probabilities.update({
      where: {
        id,
      },
      data: {
        [key]: value,
      },
    });

    return {
      status: "ok",
      data: updateProbabilities,
      error: "",
    };
  } catch (error: any) {
    return {
      status: "error",
      data: [],
      error,
    };
  } finally {
    await prisma.$disconnect();
  }
}
