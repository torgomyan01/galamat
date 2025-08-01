"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionUpdateObjectInfo(data: any) {
  try {
    const result = await prisma.objects.create({
      data,
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
