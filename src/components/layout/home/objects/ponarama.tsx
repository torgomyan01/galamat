"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css"; // մի մոռացիր style-ը

export default function PhotoSphereViewer() {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewerRef.current) {
      return;
    }

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: "/img/360/360.jpg",
    });

    return () => {
      viewer.destroy(); // մաքրում ենք ռեսուրսները կոմպոնենտը փակելիս
    };
  }, []);

  return <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />;
}
