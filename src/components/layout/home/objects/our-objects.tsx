"use client";

import { useEffect, useRef } from "react";

interface IThisProps {
  height?: number;
}

function OurObjects({ height = 400 }: IThisProps) {
  const elem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // script load
    const script = document.createElement("script");
    script.src = "https://mapgl.2gis.com/api/js/v1";
    script.async = true;
    script.onload = () => {
      const mapgl = window.mapgl;
      if (!mapgl) {
        return;
      }

      const map = new mapgl.Map(elem.current, {
        center: [71.429232, 51.09895],
        zoom: 13,
        key: "422234e1-fa2a-469b-a009-f6ec1c32ec9d",
      });

      new mapgl.Marker(map, {
        coordinates: [71.429232, 51.09895],
        // icon: "https://galamat.kz/img/icons/map-icon.svg",
      });
    };
    document.body.appendChild(script);

    // return () => {
    //   // Cleanup if component unmounts
    //   // elem.current?.remove();
    //   script.remove();
    // };
  }, [elem.current]);

  return (
    <div className="w-full rounded-[12px] overflow-hidden">
      <div
        ref={elem}
        id="container"
        style={{ width: "100%", height }}
        className="rounded-[27px] overflow-hidden h-[400px] sm:h-[617px]"
      />
    </div>
  );
}

export default OurObjects;
