import Image from "next/image";
import { formatPrice } from "@/utils/consts";
import moment from "moment";
import clsx from "clsx";
import PrintStatus from "@/components/common/product-item/print-status";

interface IThisProps {
  project: IProjectStage;
  housesDataAdmin?: IProjectData[];
}

function ProductItem({ project, housesDataAdmin }: IThisProps) {
  const getInfoOtherProject = housesDataAdmin?.find(
    (house) => house.project_id === project.id,
  );

  console.log(
    getInfoOtherProject,
    "getInfoOtherProjectgetInfoOtherProjectgetInfoOtherProject",
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

  return (
    <div className="product-item">
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
        {getInfoOtherProject ? (
          <PrintStatus position={getInfoOtherProject.position} />
        ) : null}
        <Image
          src={project.fullImage || "/img/def-proj.png"}
          className="!rounded-[8px] object-[0_50%]"
          alt="Название Жк"
          width={700}
          height={500}
        />
      </div>
    </div>
  );
}

export default ProductItem;
