"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function UpdateLanguage(id: number, value: string) {
  try {
    const result = await prisma.languages.update({
      where: {
        id,
      },
      data: {
        name: value,
      },
    });

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
  } finally {
    await prisma.$disconnect();
  }
}
