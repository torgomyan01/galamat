import { PrismaClient } from "@prisma/client";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";

const prisma = new PrismaClient();
const CONCURRENT_REQUESTS = 10; // Միաժամանակյա հարցումների քանակ

export async function StartParsing() {
  try {
    // Փուլ 1. Ստանում ենք բոլոր տների ID-ները
    const housesResponse = await ActionGetProjectsProperty("/house", {
      isArchive: false,
      status: ["AVAILABLE"],
    });

    const houseIds = housesResponse.data.map((item: any) => item.id);
    console.log(`Ստացվել է ${houseIds.length} տուն`);

    // Փուլ 2. Յուրաքանչյուր տան համար ստանում ենք հատակների տվյալները
    const allPropertyIds: number[] = [];

    // Մշակում ենք տները զուգահեռաբար
    await Promise.all(
      houseIds.map(async (houseId: number) => {
        try {
          const board: IBoard = await ActionGetProjectsProperty("/board", {
            houseId,
          });

          // Հավաքում ենք բոլոր propertyId-ները
          for (const floor of board.floors) {
            for (const section of floor.sections) {
              for (const cell of section.cells) {
                if (cell.propertyId) {
                  allPropertyIds.push(cell.propertyId);
                }
              }
            }
          }
        } catch (error) {
          console.error(`❌ Սխալ տան ID ${houseId} համար`, error);
        }
      }),
    );

    console.log(`Ընդհանուր propertyIds: ${allPropertyIds.length}`);

    // Փուլ 3. Թարմացնում ենք բոլոր property-ները
    const batchSize = 100;
    for (let i = 0; i < allPropertyIds.length; i += batchSize) {
      const batch = allPropertyIds.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (propertyId) => {
          try {
            const response = await ActionGetProjectsProperty("/property", {
              id: propertyId,
            });

            const data = response.data?.[0];
            if (!data) {
              return;
            }

            // Ստուգում ենք արդյոք գոյություն ունի
            const existing = await prisma.property.findFirst({
              where: { property_id: propertyId },
            });

            if (existing) {
              // Թարմացնում ենք գոյություն ունեցողը
              await prisma.property.update({
                where: { id: existing.id, property_id: propertyId },
                data: { data },
              });
              console.log(`🔄 Թարմացված property_id: ${propertyId}`);
            } else {
              // Ստեղծում ենք նորը
              await prisma.property.create({
                data: {
                  property_id: propertyId,
                  data,
                },
              });
              console.log(`✅ Ստեղծված property_id: ${propertyId}`);
            }
          } catch (e) {
            console.error(`❌ Սխալ property_id ${propertyId} համար`, e);
          }
        }),
      );
    }

    return { success: true, processed: allPropertyIds.length };
  } catch (error) {
    console.error("Ընդհանուր սխալ", error);
    return { success: false, error };
  }
}
