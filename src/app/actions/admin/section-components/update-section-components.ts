"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionUpdatePageSection(id: number, data: any) {
  try {
    const result = await prisma.pages_sections.update({
      where: {
        id,
      },
      data: {
        body_json: data,
      },
    });

    return {
      status: 1,
      data: result || [],
      error: "",
    };
  } catch (error) {
    return {
      status: 0,
      data: [],
      error,
    };
  }
}
