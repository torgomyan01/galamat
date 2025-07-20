import Image from "next/image";
import { formatKzt, getDiscountPrices } from "@/utils/helpers";
import { useState } from "react";
import DiwiderViewPlanInfo from "@/app/real-estate/diwider-view-plan-info";

interface IThisProps {
  plan: IPlan;
  plans: IPlan[];
}

function PlanItem({ plan, plans }: IThisProps) {
  const getPrice = getDiscountPrices(+plan.priceRange.min);

  const [openDrawer, setDrawer] = useState(false);

  return (
    <>
      <div className="card">
        <span className="name">ЖК {plan.projectName}</span>
        <span className="date">{plan.address.full}</span>
        <div
          onClick={() => setDrawer(true)}
          className="img-wrap cursor-pointer"
        >
          <Image
            src={plan.image.preview}
            alt={plan.projectName}
            width={600}
            height={600}
          />
        </div>
        <div className="prices">
          <span className="new-price">{formatKzt(getPrice.present)} </span>
          {/*<span className="old-price">{formatPrice(getPrice.previous)}</span>*/}
        </div>
        <div className="ipoteka">
          <span className="grey">Цена за м²</span>
          <span className="blue">
            {formatKzt(+plan.priceRange.min / +plan.areaRange.min)}
          </span>
        </div>
        <div className="infos !mb-0">
          <b>{plan.roomsAmount} ком. кв</b>
          <b>{plan.areaRange.min} м</b>
        </div>
        {/*<div className="style-btns">*/}
        {/*  <div className="red-btn">Скидка до {getPrice.percent.toFixed()}%</div>*/}
        {/*  <div className="blue-bt">Без отделки</div>*/}
        {/*</div>*/}
      </div>

      {openDrawer ? (
        <DiwiderViewPlanInfo
          status={openDrawer}
          onClose={() => setDrawer(false)}
          plan={plan}
          plans={plans}
        />
      ) : null}
    </>
  );
}

export default PlanItem;
