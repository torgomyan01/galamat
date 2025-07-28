import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import { Tooltip } from "@heroui/react";
import { formatKzt } from "@/utils/helpers";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import React, { useEffect, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import { ActionGetProjectInfo } from "@/app/actions/admin/projects/get-project-info";
import Link from "next/link";
import { useSelector } from "react-redux";

interface IThisProps {
  property: IProperty | null;
}

function BoxItemChess({ property }: IThisProps) {
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [modalViewProperty, setModalViewProperty] = useState(false);
  const [floor, setFloor] = useState<IFloor | null>(null);
  const [selectedFullPlan, setSelectedFullPlan] = useState<{
    plan: IPlan;
    property: IProperty;
  } | null>(null);

  const [ourProjectDbInfo, serOurProjectDbInfo] = useState<IProjectData | null>(
    null,
  );

  function PrintTypePurpose(_property: IProperty) {
    if (_property.typePurpose === "residential") {
      return "Жилое помещение";
    }
    if (_property.typePurpose === "apartment") {
      return "Квартира";
    }
    if (_property.typePurpose === "office") {
      return "Офис";
    }
    if (_property.typePurpose === "parking") {
      return "парковка";
    }
    return "";
  }

  useEffect(() => {
    if (selectedFullPlan) {
      ActionGetProjectInfo(selectedFullPlan.plan.projectId).then((res) => {
        serOurProjectDbInfo(res.data as IProjectData);
      });
    }
  }, [selectedFullPlan]);

  if (!property) {
    return (
      <div className="bg-transparent w-8 sm:w-12 h-8 sm:h-12 flex-jc-c mb-4 text-white rounded-[6px]" />
    );
  }

  const _checkR = filterParams.rooms.includes(property.rooms_amount || 0);

  const checkRooms = filterParams.rooms.length ? !_checkR : _checkR;
  const isHidden =
    checkRooms ||
    filterParams["area[min]"] >= property.area.area_total ||
    filterParams["area[max]"] <= property.area.area_total ||
    filterParams["price[min]"] >= property.price.value ||
    filterParams["price[max]"] <= property.price.value;

  function OpenModalViewInfo() {
    if (property && property.status === "AVAILABLE" && !isHidden) {
      setModalViewProperty(true);

      ActionGetProjectsProperty("/plan", {
        isArchive: false,
        status: ["AVAILABLE"],
        layoutCode: [property.layoutCode],
      }).then((result) => {
        setSelectedFullPlan({ plan: result.data[0], property });
      });

      ActionGetProjectsProperty("/floor", {
        isArchive: false,
        status: ["AVAILABLE"],
        houseId: property.house_id,
      }).then((result) => {
        const fontFloor = result.find((floor: any) =>
          floor.areas.some((_a: any) => _a.propertyId === property.id),
        );
        if (fontFloor) {
          setFloor(fontFloor);
        }
      });
    }
  }

  const baseClasses = clsx(
    "bg-blue w-8 sm:w-12 h-8 sm:h-12 flex-jc-c mb-1 sm:mb-4 text-white rounded-[6px] cursor-pointer hover:opacity-90 transition",
    {
      "!bg-blue": property.status === "AVAILABLE",
      "!bg-[#f69f13]": property.status === "BOOKED",
      "!bg-[#a7a7a7]": property.status === "UNAVAILABLE",
      "!bg-[#ce2432]": property.status === "SOLD",
      "!cursor-default":
        property.status === "SOLD" || property.status === "UNAVAILABLE",
      "!opacity-30 !cursor-default": isHidden,
    },
  );

  const boxContent = (
    <div className={baseClasses} onClick={OpenModalViewInfo}>
      {property.rooms_amount}
    </div>
  );

  return (
    <>
      {isHidden ? (
        boxContent
      ) : (
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="w-full flex-js-c">
                <div className="w-8 h-8 bg-blue rounded-[6px] flex-jc-c text-white mr-2">
                  {property.rooms_amount}
                </div>
                {PrintTypePurpose(property)}
              </div>
              <div className="mt-4 text-[25px] font-medium">
                {formatKzt(property.price.value)}
              </div>
              <div className="mt-2">{property.area.area_total}/м²</div>
            </div>
          }
        >
          {boxContent}
        </Tooltip>
      )}

      {modalViewProperty && (
        <Modal
          size="full"
          isOpen={modalViewProperty}
          className="bg-[#e8eaef]"
          hideCloseButton={true}
        >
          <ModalContent>
            <ModalBody>
              <div className="wrapper bg-[#e8eaef] !p-0">
                <div className="flex-je-c px-[130px] pt-6">
                  <button
                    className="text-[#6B6B6B]"
                    onClick={() => setModalViewProperty(false)}
                  >
                    Закрыть карточку
                    <i className="fa-regular fa-xmark ml-2"></i>
                  </button>
                </div>

                <div id="card-popup" className=" bg-[#e8eaef] mfp-with-anim">
                  {selectedFullPlan && floor ? (
                    <div className="popup-body !bg-[#e8eaef]">
                      <div className="info flex-jsb-s lg:gap-10 flex-col lg:flex-row">
                        <div className="texts lg:min-w-[350px]">
                          <div className="top-info">
                            <h2>ЖК {selectedFullPlan.property.projectName}</h2>
                            <span className="nomer">
                              {selectedFullPlan.property.rooms_amount}-комнатная
                              квартира
                            </span>
                            <span className="status">Свободно</span>
                            <Link
                              href={selectedFullPlan.plan.image.big}
                              target="_blank"
                              className="download"
                              download={`${selectedFullPlan.property.projectName}-${selectedFullPlan.property.id}.jpeg`}
                            >
                              <img src="/img/download-icon.svg" alt="" />
                            </Link>
                            {ourProjectDbInfo?.page_url && (
                              <Link
                                href={ourProjectDbInfo.page_url}
                                className="view"
                                target="_blank"
                              >
                                Смотреть проект
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="img-wrap">
                          <img
                            src={selectedFullPlan.plan.image.big}
                            alt=""
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[400px] flex-jc-c">
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default BoxItemChess;
