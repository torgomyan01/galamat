"use client";

import "../home/filter-wrapper/filter-wrapper.scss";
import "./real-estate.scss";
import MainTemplate from "@/components/common/main-template/main-template";
import HorizontalFilter from "@/components/common/horizontal-filter/horizontal-filter";
import React, { useState } from "react";
import IconFosad from "@/components/common/icons/icon-fosad";
import IconPlans from "@/components/common/icons/icon-plans";
import clsx from "clsx";
import TableEstate from "@/app/real-estate/table-estate";
import RealEstatePlans from "@/app/real-estate/real-estate-plans";
import "react-photo-view/dist/react-photo-view.css";
import Houses from "@/app/real-estate/houses";
import Facade from "@/app/real-estate/facade";
import CanvasViewHouse from "@/app/real-estate/canvas-view-house";
import { useDispatch, useSelector } from "react-redux";
import { setHouse, setObjectInfo } from "@/redux/modals";

interface IThisProps {
  projects: IProjectMerged[];
}

function RealEstateContent({ projects }: IThisProps) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const projectIds = projects.map((project) => project.project_id);

  const tabItems = [
    {
      name: "Фасады",
      icon: <i className="fa-regular fa-map mr-2 text-[23px]" />,
      content: <Facade projects={projects} />,
    },
    {
      name: "Объекты",
      icon: <IconFosad />,
      content: <Houses projectsIds={projectIds} />,
    },

    {
      name: "Планировка",
      icon: <IconPlans />,
      content: <RealEstatePlans projectsIds={projectIds} />,
    },
    {
      name: "Помещения",
      icon: <i className="fa-regular fa-list mr-2 text-[23px]" />,
      content: <TableEstate projectsIds={projectIds} />,
    },
  ];

  const objectInfo = useSelector(
    (state: IModalState) => state.modals.objectInfo,
  );
  const modalSelectedHouse = useSelector(
    (state: IModalState) => state.modals.modalSelectedHouse,
  );

  function closeModal() {
    dispatch(setHouse(null));
    dispatch(setObjectInfo(null));
  }

  const [mobileFilter, setMobileFilter] = useState<boolean>(false);

  return (
    <MainTemplate>
      <div className="filter-wrapper">
        <div className="wrapper !pt-6">
          <HorizontalFilter
            className={mobileFilter ? "open" : ""}
            projects={projects}
            onClose={() => setMobileFilter(false)}
          />
          <div className="tab2-wrap relative">
            <div className="tab2 overflow-x-scroll bottom-scroll-hidden">
              <div className="tabs2">
                {tabItems.map((item, i) => (
                  <button
                    key={item.name}
                    className={clsx("tab-button", {
                      active: activeTab === i,
                    })}
                    onClick={() => setActiveTab(i)}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </div>
              <i
                className="fa-light fa-filter-list text-[25px] absolute right-0 top-0 bg-[#e8eaef] pl-2 text-black/80 md:hidden "
                onClick={() => setMobileFilter(true)}
              />
            </div>
          </div>

          {tabItems[activeTab].content}
        </div>
      </div>

      {objectInfo && modalSelectedHouse ? (
        <CanvasViewHouse
          house={modalSelectedHouse}
          objectInfo={objectInfo}
          onClose={closeModal}
        />
      ) : null}
    </MainTemplate>
  );
}

export default RealEstateContent;
