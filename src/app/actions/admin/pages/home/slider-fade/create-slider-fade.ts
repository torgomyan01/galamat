"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ActionCreateSliderFade() {
  try {
    const result = await prisma.sliders.create({
      data: {
        slider_name: "",
        image_path: "",
        url: "",
        parent_id: "fade-slider",
        sub_parent_id: "",
        lang_key: "",
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
  }
}
