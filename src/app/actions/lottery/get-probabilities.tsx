"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function ActionGetProbabilities() {
  try {
    const checkNumber = await prisma.probabilities.findMany();

    return {
      status: "ok",
      data: checkNumber,
      error: "",
    };
  } catch (error: any) {
    return {
      status: "error",
      data: [],
      error: error?.response?.data || error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
