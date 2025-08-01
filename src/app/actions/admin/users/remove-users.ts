"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function RemoveUser(id: number) {
  try {
    const result = await prisma.users.delete({
      where: {
        id,
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
