import { Divider, Drawer, DrawerBody, DrawerContent } from "@heroui/react";
import { useEffect, useState } from "react";
import { formatKzt, getClosestPlansByPrice, RandomKey } from "@/utils/helpers";
import Image from "next/image";

interface IThisProps {
  status: boolean;
  plan: IPlan;
  plans: IPlan[];
  onClose: () => void;
}

function DiwiderViewPlanInfo({ status, plan, plans, onClose }: IThisProps) {
  const [selectedPlan, setSelectedPlan] = useState<IPlan>(plan);

  const [recommended, setRecommended] = useState<IPlan[]>([]);

  useEffect(() => {
    if (status) {
      const getRecommendedHouses = getClosestPlansByPrice(
        plans,
        +plan.priceRange.min,
        plan.houseId,
      );

      setRecommended(getRecommendedHouses);
    }
  }, [status]);

  return (
    <Drawer isOpen={status} onOpenChange={onClose} radius="none" size="4xl">
      <DrawerContent>
        <DrawerBody>
          <div className="w-full min-h-[500px]">
            <img
              src={selectedPlan.image.big}
              alt={selectedPlan.projectName}
              className="w-full cursor-pointer mt-8"
            />
          </div>

          <Divider className="my-4" />

          <div>
            <h2 className="text-[30px]">
              {formatKzt(+selectedPlan.priceRange.min)}
            </h2>
            <h1 className="font-bold text-[25px]">{selectedPlan.houseName}</h1>
          </div>
          <ul>
            <li className="mb-2">
              <span className="text-black/60">Количество комнат:</span>{" "}
              {selectedPlan.roomsAmount}
            </li>
            <li className="mb-2">
              <span className="text-black/60">Цена за м²:</span>{" "}
              {formatKzt(+plan.priceRange.min / +selectedPlan.areaRange.min)}
            </li>
            <li className="mb-2">
              <span className="text-black/60">Помещения:</span>{" "}
              {selectedPlan.areaRange.min} м²
            </li>
          </ul>

          <div className="text-end font-medium">Мы также предлагаем</div>
          <div className="mb-6">
            {recommended.map((plan) => (
              <div
                key={RandomKey()}
                onClick={() => setSelectedPlan(plan)}
                className="w-full p-2 border border-black/10 hover:shadow transition rounded-[8px] flex-js-s gap-4 cursor-pointer mb-2"
              >
                <div className="min-w-[180px] h-[100px] bg-blue/20 rounded-[8px] flex-jc-c overflow-hidden">
                  <Image
                    src={plan.image.preview}
                    alt="rec image"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <div className="w-full mb-2 flex-jsb-c">
                    <h3 className="text-[20px] font-medium">
                      {formatKzt(+plan.priceRange.min)}
                    </h3>
                    <div className="bg-green-500 text-white px-4 py-1 rounded-[4px] text-[14px]">
                      Свободно
                    </div>
                  </div>
                  <h3 className="text-[15px] text-black/50">
                    {formatKzt(+plan.priceRange.min / +plan.areaRange.min)} / м²
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DiwiderViewPlanInfo;
