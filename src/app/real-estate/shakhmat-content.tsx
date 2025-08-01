import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { ActionGetProperty } from "@/app/actions/start-crone/get-property";
import BoxItemChess from "@/app/real-estate/box-item-chess";
import { Spinner } from "@heroui/react";

function ShakhmatContent() {
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [boards, setBoards] = useState<IBoard | null>(null);
  const [property, setProperty] = useState<
    { id: number; property_id: number; data: IProperty }[] | null
  >(null);

  useEffect(() => {
    if (filterParams.houseId) {
      ActionGetProjectsProperty("/board", {
        houseId: filterParams.houseId,
      }).then((result) => {
        setBoards(result);
      });

      ActionGetProperty().then((data) => {
        if (data.status === "ok") {
          setProperty(data.data as any);
        }
      });
    }
  }, [filterParams]);

  const groupedBySection: {
    [key: string]: { floor: number; cells: ICell[] }[];
  } = {};

  if (boards) {
    boards.floors.forEach((floor) => {
      floor.sections.forEach((section) => {
        if (!groupedBySection[section.name]) {
          groupedBySection[section.name] = [];
        }
        groupedBySection[section.name].push({
          floor: floor.number,
          cells: section.cells,
        });
      });
    });
  }

  // ================================
  // Mouse drag scroll logic
  // ================================
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) {
      return;
    }
    isDragging.current = true;
    scrollRef.current.style.cursor = "grabbing";
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div>
      {filterParams.houseId ? (
        <div className="w-full">
          {property ? (
            <div className="checkerboard-wrap">
              {/* Վերևի լեգենդ */}
              <div className="top-info mb-4 flex gap-6 flex-wrap">
                <div className="top-info-item flex items-center gap-2">
                  <span className="circle w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm">Свободно</span>
                </div>
                <div className="top-info-item flex items-center gap-2">
                  <span className="circle w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">Продано</span>
                </div>
                <div className="top-info-item flex items-center gap-2">
                  <span className="circle w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="text-sm">Бронь</span>
                </div>
                <div className="top-info-item flex items-center gap-2">
                  <span className="circle w-3 h-3 rounded-full bg-gray-400"></span>
                  <span className="text-sm">Не для продажи</span>
                </div>
              </div>

              {/* Քաշվող scrollable wrapper */}
              {boards ? (
                <div
                  ref={scrollRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="flex overflow-x-auto gap-4 cursor-grab select-none pb-4 bottom-scroll-hidden"
                >
                  {Object.entries(groupedBySection).map(
                    ([sectionName, sectionFloors], idx) => (
                      <div key={`section-${idx}`}>
                        <div className="sect-table w-full">
                          <div className="w-full">
                            {sectionFloors
                              .sort((a, b) => b.floor - a.floor)
                              .map((floorItem, i) => (
                                <div
                                  key={`floor-${i}`}
                                  className="flex items-center gap-4 mb-1"
                                >
                                  <div className="w-[30px] text-sm font-semibold text-gray-600 text-right">
                                    {floorItem.floor}.
                                  </div>
                                  <div className="flex gap-1 sm:gap-3">
                                    {floorItem.cells.map((cell, ci) => (
                                      <BoxItemChess
                                        key={`cell-${ci}`}
                                        property={
                                          property?.find(
                                            (_pr) =>
                                              _pr.property_id ===
                                              cell.propertyId,
                                          )?.data || null
                                        }
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <span className="mt-2 block text-sm opacity-70 pl-[45px]">
                          Секция {sectionName}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center">
          <h3 className="text-center text-blue-500/60 md:text-[25px]">
            Пожалуйста выбирайте объекты, чтобы посмотреть шахматку.
          </h3>
        </div>
      )}
    </div>
  );
}

export default ShakhmatContent;
