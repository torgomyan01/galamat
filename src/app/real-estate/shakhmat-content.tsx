import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import BoxItemChess from "@/app/real-estate/box-item-chess";

function ShakhmatContent() {
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [boards, setBoards] = useState<IBoard | null>(null);

  useEffect(() => {
    if (filterParams.houseId) {
      ActionGetProjectsProperty("/board", {
        houseId: filterParams.houseId,
      }).then((result) => {
        setBoards(result);
      });
    }
  }, [filterParams]);

  // Տվյալների վերակազմ սեկտորներով
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

  return (
    <div>
      {filterParams.houseId ? (
        <div className="w-full">
          <div className="checkerboard-wrap">
            <div className="top-info">
              <div className="top-info-item">
                <span className="circle blue"></span>
                <span className="text">Свободно</span>
              </div>
              <div className="top-info-item">
                <span className="circle red"></span>
                <span className="text">Продано</span>
              </div>
              <div className="top-info-item">
                <span className="circle yellow"></span>
                <span className="text">Бронь</span>
              </div>
              <div className="top-info-item">
                <span className="circle grey"></span>
                <span className="text">Не для продажи</span>
              </div>
            </div>

            {boards ? (
              <div className="flex-jsb-c overflow-x-scroll bottom-scroll-hidden">
                {Object.entries(groupedBySection).map(
                  ([sectionName, sectionFloors], idx) => (
                    <div key={`section-${idx}`} className="checkerboard-item">
                      <div className="sect-table w-full flex-js-c">
                        <div>
                          {sectionFloors
                            .sort((a, b) => b.floor - a.floor)
                            .map((floorItem, i) => (
                              <div
                                key={`floor-${i}`}
                                className="flex items-center gap-4 mb-1"
                              >
                                {/* Հարկի համարը */}
                                <div className="w-[50px] text-sm font-semibold text-gray-600 text-right">
                                  {floorItem.floor}.
                                </div>

                                {/* Բջիջները */}
                                <div className="flex gap-1 sm:gap-3">
                                  {floorItem.cells.map((cell, ci) => (
                                    <BoxItemChess
                                      key={`cell-${ci}`}
                                      propertyId={cell.propertyId || 0}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <span className="title ml-[20px]">
                        Секция {sectionName}
                      </span>
                    </div>
                  ),
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full h-[400px] flex-jc-c">
          <h3 className="text-center text-blue/60 md:text-[25px]">
            Пожалуйста выбирайте объекты, чтобы посмотреть шахматку.
          </h3>
        </div>
      )}
    </div>
  );
}

export default ShakhmatContent;
