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
    content: <OurObjects height={500} />,
  },
  {
    name: "Объекты",
    content: <OurObjects height={500} />,
  },
];

function Objects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="wrapper md:!mb-12 !mt-10 md:!mt-[100px]">
      <div className="tabs">
        <div className="tab-buttons !mr-[10px] min-[425px]:mr-5">
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

        <div className="tab-content active !p-2 sm:!p-4">
          {tabContents[activeTab].content}
        </div>
      </div>
    </div>
  );
}

export default Objects;
