"use server";

import cron from "node-cron";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var cronJob: ReturnType<typeof cron.schedule> | undefined;
}

export async function StartParsing() {
  try {
    console.log("Starting Parsing...");

    if (globalThis.cronJob) {
      globalThis.cronJob.stop();
    }

    StartParsingProperties(() => {
      console.log("end parsing property...");
      // setTimeout(() => {
      //   StartParsingPlans();
      // }, 2000);
    });

    global.cronJob = cron.schedule("0 * * * *", () => {
      StartParsingProperties(() => {
        console.log("end parsing property...");
        // setTimeout(() => {
        //   StartParsingPlans();
        // }, 2000);
      });
    });

    return 1;
  } catch {
    return 0;
  }
}

function StartParsingProperties(callBack: () => void) {
  ActionGetProjectsProperty("/board", {}).then((result) => {
    const board: IBoard = result;

    const setPromise = board.floors.flatMap((floor: any) =>
      floor.sections.flatMap((section: any) =>
        section.cells.map((cell: any) =>
          ActionGetProjectsProperty("/property", {
            id: cell.propertyId,
          }),
        ),
      ),
    );

    Promise.all(setPromise).then((res) => {
      console.log("📦 Pulled", res.length, "properties");

      const dirPath = path.join(process.cwd(), "src/store");
      const filePath = path.join(dirPath, "data-properties.json");

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFile(filePath, JSON.stringify(res, null, 2), (err) => {
        if (err) {
          console.error("❌ Error writing file:", err);
        } else {
          console.log("✅ Data saved to src/store/data.json");
        }
        callBack();
      });
    });
  });
}

// function StartParsingPlans() {
//   ActionGetProjectsProperty("/plan", {}).then((result) => {
//     const dirPath = path.join(process.cwd(), "src/store");
//     const filePath = path.join(dirPath, "data-plans.json");
//
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }
//
//     fs.writeFile(filePath, JSON.stringify(result.data, null, 2), (err) => {
//       if (err) {
//         console.error("❌ Error writing file:", err);
//       } else {
//         console.log("✅ Data saved to src/store/data.json");
//       }
//     });
//   });
// }
