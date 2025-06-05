import Image from "next/image";
import { formatPrice } from "@/utils/consts";
import moment from "moment";

interface IThisProps {
  project: IProjectStage;
}

function ProductItem({ project }: IThisProps) {
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
          {project.address.full || "Место пока не написано"}
        </span>
        <div className="hide-info">
          {countText}
          <div className="links">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
          </div>
          <span className="date">Ближайшая сдача {printData}</span>
        </div>
      </div>
      <div className="img-wrap">
        <span className="style red">Бизнес+</span>
        <Image
          src={project.fullImage || "/img/def-proj.png"}
          className="border !rounded-[8px] object-[0_50%]"
          alt="Название Жк"
          width={700}
          height={500}
        />
      </div>
    </div>
  );
}

export default ProductItem;
