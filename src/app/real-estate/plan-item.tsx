import Image from "next/image";
import { formatKzt, getDiscountPrices } from "@/utils/helpers";
import { useEffect, useState } from "react";
import DiwiderViewPlanInfo from "@/app/real-estate/diwider-view-plan-info";
import { motionOptionText } from "@/utils/consts";
import { motion } from "framer-motion";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";

interface IThisProps {
  plan: IPlan;
  plans: IPlan[];
}

function PlanItem({ plan, plans }: IThisProps) {
  const getPrice = getDiscountPrices(+plan.priceRange.min);

  const [openDrawer, setDrawer] = useState(false);

  const [property, setProperty] = useState<IProperty | null>(null);

  useEffect(() => {
    ActionGetProjectsProperty("/property", {
      id: plan.properties[0],
    }).then(({ data }) => {
      setProperty(data[0]);
    });
  }, []);

  return (
    <>
      <motion.div
        initial="init"
        whileInView="animate"
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true, amount: 0.1 }}
        variants={motionOptionText}
        className="card relative"
      >
        <span className="name pr-[100px]">ЖК {plan.projectName}</span>
        <span className="date">{plan.address.full}</span>

        <span className="absolute right-6 top-[16px] bg-blue px-2 text-white rounded-[4px] text-[14px] w-[110px]">
          {plan.roomsAmount} ком. кв
        </span>

        {property ? (
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
            className="absolute right-6 top-[40px] bg-[#DB1D31] px-2 text-white rounded-[4px] text-[14px] w-[90px]"
          >
            этаж {property.floor}
          </motion.span>
        ) : null}

        <span className="absolute right-6 top-[64px] bg-green-500 px-2 text-white rounded-[4px] text-[14px]">
          {plan.areaRange.min} м²
        </span>

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
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
            className="new-price"
          >
            {formatKzt(getPrice.present)}{" "}
          </motion.span>
          {/*<span className="old-price">{formatPrice(getPrice.previous)}</span>*/}
        </div>
        <div className="ipoteka !mb-0">
          <span className="grey">Цена за м²</span>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="blue"
          >
            {formatKzt(+plan.priceRange.min / +plan.areaRange.min)}
          </motion.span>
        </div>
        <div className="infos !mb-0">
          {/*<b>{plan.roomsAmount} ком. кв</b>*/}
          {/*<b>{plan.areaRange.min} м</b>*/}
          {/*{property ? <b>этаж {property.floor}</b> : null}*/}
        </div>
        {/*<div className="style-btns">*/}
        {/*  <div className="red-btn">Скидка до {getPrice.percent.toFixed()}%</div>*/}
        {/*  <div className="blue-bt">Без отделки</div>*/}
        {/*</div>*/}
      </motion.div>

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
