import "./_tour-3d.scss";
import { useState } from "react";
import clsx from "clsx";

const tabsTour = [
  {
    name: "Фасад",
    component: (
      <iframe
        key="tour-3d-555"
        width="100%"
        height="650"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        className="h-[400px] md:h-[750px]"
        src="https://kuula.co/share/collection/7DmKS?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1"
      />
    ),
  },
  {
    name: "Двор",
    component: (
      <iframe
        key="tour-3d-halls-yells"
        width="100%"
        height="650"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        className="h-[400px] md:h-[750px]"
        src="https://kuula.co/share/collection/7DlvX?logo=1&info=0&logosize=110&fs=1&vr=0&thumbs=1&inst=0"
      />
    ),
  },
  // {
  //   name: "Холлы",
  //   component: "Холлы",
  // },
];

function Tour3d() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tour-3d mt-10">
      <div className="tab-cont-wrap">
        <div className="tab-content active">
          <div className="img-wrap">{tabsTour[activeTab].component}</div>
        </div>
      </div>
      <div className="tabs">
        <div className="tab-buttons">
          {tabsTour.map((item, index) => (
            <button
              key={`key-tour-${index}`}
              className={clsx("tab-btn", {
                active: activeTab === index,
              })}
              onClick={() => setActiveTab(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      {/*<div className="arrows">*/}
      {/*  <button type="button">*/}
      {/*    <img src="/img/gala-slider-arr.svg" alt="" className="rotate-180" />*/}
      {/*  </button>*/}
      {/*  <button type="button">*/}
      {/*    <img src="/img/gala-slider-arr.svg" alt="" />*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}

export default Tour3d;
