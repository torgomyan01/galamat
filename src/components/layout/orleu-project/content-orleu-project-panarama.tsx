"use client";

import React, { useEffect, useRef } from "react";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Viewer } from "@photo-sphere-viewer/core";

function ContentOrleuProjectAlPanorama() {
  const PRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!PRef.current) {
      return;
    }

    const viewer = new Viewer({
      container: PRef.current,
      panorama: "/img/360/orleu-1.jpg",
      caption: "Orleu",
      navbar: ["zoom", "fullscreen"],
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div className="w-full mb-[150px]">
      <div className="px-[80px] w-full h-[90dvh] relative cursor-pointer !rounded-[20px] overflow-hidden">
        <div
          ref={PRef}
          style={{ width: "100%", height: "100%" }}
          className="rounded-[20px] overflow-hidden"
        />
      </div>
    </div>
  );
}

export default ContentOrleuProjectAlPanorama;
