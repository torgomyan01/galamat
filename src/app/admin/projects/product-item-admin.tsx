import Image from "next/image";
import { formatPrice } from "@/utils/consts";
import moment from "moment";
import clsx from "clsx";
import { Button } from "@heroui/react";
import { useState } from "react";
import ModalChangeProductItem from "@/app/admin/projects/modal-change-product-item";

interface IThisProps {
  project: IProjectStage;
  housesDataAdmin: IProjectData[];
}

function ProductItemAdmin({ project, housesDataAdmin }: IThisProps) {
  const getInfoOtherProject = housesDataAdmin?.find(
    (house) => house.project_id === project.id,
  );

  const count = parseInt(project.countFilteredProperty || "0", 10);
  const countText = (
    <p>
      {count} квартир{" "}
      <span>
        {count === 1 ? "а" : count > 1 && count < 5 ? "ы" : ""} в продаже
      </span>
    </p>
  );

  const printData = project.commissioningDate
    ? moment(project.commissioningDate).format("DD.MM.YYYY")
    : "";

  const [modalChange, setModalChange] = useState<boolean>(false);

  return (
    <>
      <div className="product-item !bg-black/10 relative">
        <div className="texts-wrap">
          <a href="#" className="name">
            {project.projectName}
          </a>
          <span className="text">от {formatPrice(project.minPrice)}</span>
          <span className="grey h-[40px]">
            {project.address.street || "Место пока не написано"}
          </span>
          <div className="hide-info">
            {countText}
            <div className="links">
              <span
                className={clsx({
                  active: project.roomsFilter.includes("one"),
                })}
              >
                1
              </span>
              <span
                className={clsx({
                  active: project.roomsFilter.includes("two"),
                })}
              >
                2
              </span>
              <span
                className={clsx({
                  active: project.roomsFilter.includes("three"),
                })}
              >
                3
              </span>
              <span
                className={clsx({
                  active: project.roomsFilter.includes("more_than_three"),
                })}
              >
                4 и более
              </span>
            </div>
            <span className="date">Ближайшая сдача {printData}</span>
          </div>
        </div>
        <div className="img-wrap">
          {/*<span className="style red">Бизнес+</span>*/}
          <Image
            src={project.fullImage || "/img/def-proj.png"}
            className="!rounded-[8px] object-center"
            alt="Название Жк"
            width={700}
            height={500}
          />
          <Button
            className="absolute right-6 bottom-6"
            onPress={() => setModalChange(true)}
          >
            Изменить
          </Button>
        </div>

        {getInfoOtherProject?.hide ? (
          <div className="w-8 h-8 bg-white absolute top-1 right-1 shadow rounded-full flex-jc-c text-red-600">
            <i className="fa-regular fa-eye-slash"></i>
          </div>
        ) : null}
      </div>

      {modalChange ? (
        <ModalChangeProductItem
          status={modalChange}
          onClose={() => setModalChange(false)}
          project={project}
        />
      ) : null}
    </>
  );
}

export default ProductItemAdmin;
