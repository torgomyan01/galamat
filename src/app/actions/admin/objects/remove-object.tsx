"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionRemoveObject(objectId: number) {
  try {
    await prisma.objects.delete({
      where: {
        id: objectId,
      },
    });

    await prisma.objects.deleteMany({
      where: {
        parent_id: objectId,
      },
    });

    return {
      status: 1,
      data: [],
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
