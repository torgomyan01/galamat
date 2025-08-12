"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionCUpdateSliderFade(id: number, url: string) {
  try {
    const update = await prisma.sliders_tb.update({
      where: {
        id,
      },
      data: {
        url,
      },
    });

    return {
      status: 0,
      data: update,
      error: "",
    };
  } catch (error) {
    return {
      status: 0,
      data: {},
      error,
    };
  } finally {
    await prisma.$disconnect();
  }
}
