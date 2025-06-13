"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Slider {
  id: number;
  slider_name: string;
  image_path: string;
  url: string;
  parent_id: string;
  sub_parent_id: string;
}

interface SliderTree extends Slider {
  children: Slider[];
}

export async function ActionGetSlidersFade() {
  try {
    const mainSliders: Slider[] = await prisma.sliders.findMany({
      where: {
        slider_name: "fade-slider",
      },
    });

    const packages: Slider[] = await prisma.sliders.findMany({
      where: {
        parent_id: {
          in: mainSliders.map((s) => s.parent_id),
        },
      },
    });

    const subPackages: Slider[] = await prisma.sliders.findMany({
      where: {
        sub_parent_id: {
          in: packages.map((p) => p.sub_parent_id),
        },
      },
    });

    const result: SliderTree[] = mainSliders.map((main) => {
      const mainPackages: SliderTree[] = packages
        .filter((p) => p.slider_name === main.parent_id)
        .map((pkg) => ({
          ...pkg,
          children: subPackages.filter((sub) => sub.id === +pkg.sub_parent_id),
        }));

      return {
        ...main,
        children: mainPackages,
      };
    });

    return {
      status: 0,
      data: result,
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
