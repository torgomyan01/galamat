"use server";

import axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function ActionSendNumberBitrix(id: number) {
  try {
    const updateProbabilities = await prisma.lottery.findUnique({
      where: {
        id,
      },
    });

    const getAxios = await axios.get(
      "https://crm.galamat.kz/services/webhooks/gen_link/index.php",
      {
        params: {
          name: updateProbabilities?.name,
          phone: updateProbabilities?.phone,
          balance: updateProbabilities?.winner,
        },
      },
    );

    return getAxios.data;
  } catch (error: any) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
