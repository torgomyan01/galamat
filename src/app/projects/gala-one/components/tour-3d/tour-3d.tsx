import "./_tour-3d.scss";
import { useState } from "react";
import clsx from "clsx";
import Halls from "@/app/projects/gala-one/components/tour-3d/halls";
import Yard from "@/app/projects/gala-one/components/tour-3d/yard";
import Facade from "@/app/projects/gala-one/components/tour-3d/facade";

function Tour3d() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const tabsTour = [
    {
      name: "Фасад",
      component: <Facade />,
      maxLength: 1,
    },
    {
      name: "Двор",
      component: <Yard activeIndex={activeItem} />,
      maxLength: 3,
    },
    {
      name: "Холлы",
      component: <Halls activeIndex={activeItem} />,
      maxLength: 3,
    },
  ];

  function Next() {
    if (activeItem <= tabsTour[activeTab].maxLength - 1) {
      setActiveItem(activeItem + 1);
    }
  }

  function Prev() {
    if (activeItem >= 0) {
      setActiveItem(activeItem - 1);
    }
  }

  return (
    <div className="tour-3d mt-10">
      <div className="tab-cont-wrap">
        <div className="tab-content active">
          <div className="img-wrap">{tabsTour[activeTab].component}</div>
        </div>
      </div>
      <div className="wrapper !mt-[-70px]">
        <div className="w-full flex-jsb-c">
          <div className="tabs">
            <div className="tab-buttons">
              {tabsTour.map((item, index) => (
                <button
                  key={`key-tour-${index}`}
                  className={clsx("tab-btn", {
                    active: activeTab === index,
                  })}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveItem(0);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {tabsTour[activeTab].maxLength > 1 ? (
            <div className="arrows">
              <button
                type="button"
                onClick={Prev}
                disabled={activeItem === 0}
                className={clsx({
                  "opacity-70": activeItem === 0,
                })}
              >
                <img
                  src="/img/gala-slider-arr.svg"
                  alt=""
                  className="transform rotate-180"
                />
              </button>
              <button
                type="button"
                onClick={Next}
                disabled={activeItem === tabsTour[activeTab].maxLength - 1}
                className={clsx({
                  "opacity-70":
                    activeItem === tabsTour[activeTab].maxLength - 1,
                })}
              >
                <img src="/img/gala-slider-arr.svg" alt="" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Tour3d;
