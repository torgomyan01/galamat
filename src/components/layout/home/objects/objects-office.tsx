"use client";

import { useEffect, useRef } from "react";

function ObjectsOffice() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "objects-office";

    const initMap = () => {
      const ymaps = window.ymaps;

      const map = new ymaps.Map(mapRef.current, {
        center: [51.128943, 71.490211],
        zoom: 13,
        controls: [],
      });

      const CustomLayout = ymaps.templateLayoutFactory.createClass(
        `
          <div class="project-card" style="cursor: pointer;">
            <div class="project-card-header">
              <h2 class="project-title">ЖК ORLEU</h2>
              <h3 class="project-price">от 13,560,000</h3>
            </div>
            <div class="project-image-wrapper">
              <img
                src="img/project-orleu.png"
                class="project-image"
                alt="Project Title"
              />
            </div>
          </div>
        `,
        {
          build() {
            CustomLayout.superclass.build.call(this);
            this.getParentElement().addEventListener("click", () => {
              window.open("/orleu-project", "_blank");
            });
          },
        },
      );

      const placemark = new ymaps.Placemark(
        [51.128943, 71.490211],
        {
          hintContent: "ЖК ORLEU",
        },
        {
          iconLayout: "default#imageWithContent",
          iconImageHref: "", // No background image
          iconImageSize: [300, 320],
          iconContentOffset: [0, 0],
          iconContentLayout: CustomLayout,
          iconShape: {
            type: "Rectangle",
            coordinates: [
              [0, 0],
              [300, 320],
            ],
          },
        },
      );

      placemark.events.add("click", function () {
        window.open("/orleu-project", "_blank");
      });

      map.geoObjects.add(placemark);
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=2eb83824-2f70-443e-ae10-085950e599f1&lang=ru_RU";
      script.type = "text/javascript";
      script.onload = () => {
        if (window.ymaps) {
          window.ymaps.ready(initMap);
        }
      };
      document.body.appendChild(script);
    };

    if (typeof window !== "undefined") {
      if (!document.getElementById(scriptId)) {
        loadScript();
      } else {
        const interval = setInterval(() => {
          if (window.ymaps && window.ymaps.ready) {
            clearInterval(interval);
            window.ymaps.ready(initMap);
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "60vh" }}
      className="rounded-[8px] overflow-hidden"
    />
  );
}

export default ObjectsOffice;
