"use client";

import React, { useEffect } from "react";
import { StartParsing } from "@/app/actions/start-crone/start-crone";

async function Page() {
  useEffect(() => {
    StartParsing().then((res) => {
      if (res) {
        console.log("StartParsing");
      }
    });
  }, []);

  return <h1>404</h1>;
}

export default Page;
