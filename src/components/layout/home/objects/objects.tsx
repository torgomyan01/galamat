import "./objects.scss";
import { useState } from "react";
import clsx from "clsx";

import OurObjects from "@/components/layout/home/objects/our-objects";
import PhotoSphereViewer from "@/components/layout/home/objects/ponarama";

const tabContents = [
  {
    name: "360°",
    content: <PhotoSphereViewer />,
  },
  {
    name: "Офис",
    content: <OurObjects />,
  },
  {
    name: "Объекты",
    content: <OurObjects />,
  },
];

function Objects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="wrapper">
      <div className="tabs">
        <div className="tab-buttons">
          {tabContents.map((tab, index) => (
            <button
              key={`tab-${index}`}
              className={clsx("tab-btn", {
                active: activeTab === index,
              })}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="tab-content active">
          {tabContents[activeTab].content}
        </div>
      </div>
    </div>
  );
}

export default Objects;
