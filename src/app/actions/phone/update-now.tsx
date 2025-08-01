"use server";

import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export async function ActionUpdateCode(id: number) {
  try {
    const changeStatus = await prisma.lottery.update({
      where: {
        id,
      },
      data: {
        status: "no-verified",
        timeout: moment().format(),
      },
    });

    return {
      status: "ok",
      data: changeStatus,
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
