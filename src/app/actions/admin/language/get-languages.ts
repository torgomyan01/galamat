"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetLanguage(parent_id: string) {
  try {
    const result = await prisma.languages.findMany({
      where: {
        parent_id,
      },
    });

    return {
      status: 1,
      data: result || [],
    };
  } catch (error) {
    return {
      status: 0,
      data: [],
      error,
    };
  }
}
