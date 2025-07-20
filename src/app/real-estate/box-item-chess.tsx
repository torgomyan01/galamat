import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import { Tooltip } from "@heroui/react";
import { formatKzt } from "@/utils/helpers";
import dataProperties from "@/store/data-properties.json";

interface IThisProps {
  propertyId: number;
}

function BoxItemChess({ propertyId }: IThisProps) {
  const _dataProperties: any = dataProperties;

  const property = _dataProperties
    .flatMap((group: any) => group.data)
    .find((item: any) => item.id === propertyId);

  function PrintTypePurpose(property: IProperty) {
    if (property.typePurpose === "residential") {
      return "Жилое помещение";
    }
    if (property.typePurpose === "apartment") {
      return "Квартира";
    }
    if (property.typePurpose === "office") {
      return "Офис";
    }
    if (property.typePurpose === "parking") {
      return "парковка";
    }
  }

  return (
    <>
      {propertyId ? (
        <Tooltip
          content={
            <div className="px-1 py-2">
              {property ? (
                <>
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
                </>
              ) : null}
            </div>
          }
        >
          <div
            className={clsx(
              "bg-blue w-8 sm:w-12 h-8 sm:h-12 flex-jc-c mb-4 text-white rounded-[6px] cursor-pointer hover:opacity-90 transition",
              {
                "!bg-blue": property?.status === "AVAILABLE",
                "!bg-[#f69f13]": property?.status === "BOOKED",
                "!bg-[#a7a7a7]": property?.status === "UNAVAILABLE",
                "!bg-[#ce2432]": property?.status === "SOLD",
                "!cursor-default":
                  property?.status === "SOLD" ||
                  property?.status === "UNAVAILABLE",
              },
            )}
          >
            {property ? (
              property.rooms_amount
            ) : (
              <Spinner size="sm" color="white" />
            )}
          </div>
        </Tooltip>
      ) : (
        <div className="bg-transparent w-8 sm:w-12 h-8 sm:h-12 flex-jc-c mb-4 text-white rounded-[6px]" />
      )}
    </>
  );
}

export default BoxItemChess;
