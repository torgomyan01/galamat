"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionUpdateSliderSort(id: number, index: number) {
  try {
    await prisma.sliders_tb.update({
      where: { id },
      data: { sort_index: index },
    });

    return { status: 1 };
  } catch (error) {
    console.error(error);
    return { status: 0, error };
  } finally {
    await prisma.$disconnect();
  }
}
