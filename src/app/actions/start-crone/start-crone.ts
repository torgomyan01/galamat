"use server";

import cron from "node-cron";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var cronJob: ReturnType<typeof cron.schedule> | undefined;
}

export async function StartParsing() {
  try {
    console.log("🚀 Սկսում ենք տվյալների քաշումը և գրանցումը");

    if (globalThis.cronJob) {
      globalThis.cronJob.stop();
    }

    // Առաջին անգամ անմիջապես քաշում է
    await StartParsingOnce();

    // Ամեն ժամը մեկ կրկնվող գործ
    globalThis.cronJob = cron.schedule("0 * * * *", async () => {
      console.log(
        "⏰ CRON: սկսում է տվյալների թարմացումը:",
        new Date().toISOString(),
      );
      await StartParsingOnce();
    });

    return 1;
  } catch (err) {
    console.error("❌ StartParsing error:", err);
    return 0;
  }
}

async function StartParsingOnce() {
  try {
    const board = await ActionGetProjectsProperty("/board", {
      projectId: 53086,
      houseId: 137486,
    });

    const cells: any[] = [];

    board.floors.forEach((floor: any) => {
      floor.sections.forEach((section: any) => {
        section.cells.forEach((cell: any) => {
          cells.push(cell);
        });
      });
    });

    console.log(`📦 Սկսում ենք քաշել ${cells.length} property`);

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];

      try {
        const { data } = await ActionGetProjectsProperty("/property", {
          id: cell.propertyId,
        });

        if (data && data[0]) {
          await prisma.property.upsert({
            where: { property_id: cell.propertyId },
            update: { data: data[0] },
            create: {
              property_id: cell.propertyId,
              data: data[0],
            },
          });

          console.log(
            `✅ [${i + 1}/${cells.length}] property_id=${cell.propertyId} ավելացվել կամ թարմացվել է`,
          );
        } else {
          console.warn(
            `⚠️ [${i + 1}/${cells.length}] property_id=${cell.propertyId} — data դատարկ էր`,
          );
        }

        await sleep(500); // դանդաղեցման ժամանակ՝ 0.5 վրկ
      } catch (err) {
        console.error(
          `❌ [${i + 1}/${cells.length}] Սխալ property_id=${cell.propertyId}:`,
          err,
        );
      }
    }

    console.log("🎉 Բոլոր property-ները ավարտված են");
  } catch (err) {
    console.error("❌ StartParsingOnce error:", err);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
