"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ymaps: any;
  }
}

interface IThisProps {
  height?: number;
  className?: string;
}

function OurObjects({ height = 400, className }: IThisProps) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.type = "text/javascript";
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          new window.ymaps.Map(mapRef.current, {
            center: [51.10011, 71.404261],
            zoom: 18,
          });
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div ref={mapRef} style={{ width: "100%", height }} className={className} />
  );
}

export default OurObjects;
