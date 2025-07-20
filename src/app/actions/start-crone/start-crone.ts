import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";

const prisma = new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var cronJob: ReturnType<typeof cron.schedule> | undefined;
}

export async function StartParsing() {
  try {
    console.log("🟡 Starting Parsing...");

    if (globalThis.cronJob) {
      globalThis.cronJob.stop();
    }

    globalThis.cronJob = cron.schedule("0 * * * *", async () => {
      console.log("⏰ Քրոնը գործարկվեց:", new Date());

      const board: IBoard = await ActionGetProjectsProperty("/board", {
        projectId: 53086,
        houseId: 137486,
      });

      for (const floor of board.floors) {
        for (const section of floor.sections) {
          for (const cell of section.cells) {
            try {
              const response = await ActionGetProjectsProperty("/property", {
                id: cell.propertyId,
              });

              const data = response.data?.[0];
              const propertyId = cell.propertyId;

              if (!data || !propertyId) {
                continue;
              }

              const existing = await prisma.property.findFirst({
                where: { property_id: propertyId },
              });

              if (existing) {
                await prisma.property.update({
                  where: { id: existing.id },
                  data: { data },
                });
                console.log(`🔁 Updated property_id: ${propertyId}`);
              } else {
                await prisma.property.create({
                  data: {
                    property_id: propertyId,
                    data,
                  },
                });
                console.log(`✅ Created property_id: ${propertyId}`);
              }
            } catch (e) {
              console.error(`❌ Error for property_id ${cell.propertyId}:`, e);
            }
          }
        }
      }

      console.log("✅ Finished parsing at:", new Date());
    });

    return 1;
  } catch (error) {
    console.error("❌ Cron initialization error:", error);
    return 0;
  }
}
