import "./_checkerboard.scss";

import { useEffect, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import BoxItemChess from "@/app/real-estate/box-item-chess";

interface IThisProps {
  activeHouse: IObjectData | null;
}

function ChessView({ activeHouse }: IThisProps) {
  const [boards, setBoards] = useState<IBoard | null>(null);

  useEffect(() => {
    if (activeHouse) {
      ActionGetProjectsProperty("/board", {
        houseId: activeHouse.project_house_id,
      }).then((result) => {
        setBoards(result);
      });
    }
  }, [activeHouse]);

  return (
    <div className="w-full h-[100dvh] bg-white mt-[-25px] pt-[150px] sm:pt-[100px] px-6">
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
          <div className="checkerboard-items2">
            <div className="checkerboard-item">
              <span className="title">Секция 1</span>
              <div className="sect-table overflow-x-scroll w-full">
                <div className="w-[calc(100vw-50px)]">
                  {boards.floors.map((board, i) => (
                    <div key={`board-${i}`} className="flex-js-s gap-4">
                      <div className="w-8 sm:w-12 h-8 sm:h-12 flex-jc-c mb-4 text-black/60 rounded-[0_6px_6px_0] fixed bg-white shadow">
                        {board.number}
                      </div>
                      <div className="flex-jsb-c gap-10 pl-[40px] sm:pl-[60px]">
                        {board.sections.map((section, i) => (
                          <div
                            key={`section-${i}`}
                            className="flex-js-c gap-1 sm:gap-3"
                          >
                            {section.cells.map((cell, i) => (
                              <BoxItemChess
                                key={`cell-${i}`}
                                propertyId={cell.propertyId || 0}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChessView;
