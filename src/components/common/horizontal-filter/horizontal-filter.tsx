import { Select, SelectItem } from "@heroui/react";
import SliderInput from "@/components/common/slider-input/slider-input";
import clsx from "clsx";
import { useState } from "react";

interface IThisProps {
  className?: string;
}

function HorizontalFilter({ className }: IThisProps) {
  const [numberRooms, SetNumberRooms] = useState<number>(4);

  return (
    <div className={clsx("filters mb-8", className)}>
      <div className="top-info gap-1">
        <div className="select-info">
          <span>Район</span>

          <Select
            selectedKeys={["Есиль"]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
          >
            <SelectItem key="Есиль">Есиль</SelectItem>
            <SelectItem key="Есиль 2">Есиль 2</SelectItem>
            <SelectItem key="Есиль 3">Есиль 3</SelectItem>
          </Select>
        </div>
        <div className="select-info">
          <span>Жилой комплекс</span>
          <Select
            selectedKeys={["ЖК Orleu"]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
          >
            <SelectItem key="ЖК Orleu">ЖК Orleu</SelectItem>
            <SelectItem key="Есиль 2">Есиль 2</SelectItem>
            <SelectItem key="Есиль 3">Есиль 3</SelectItem>
          </Select>
        </div>
        <div className="select-info">
          <span>Этаж</span>
          <Select
            selectedKeys={["1"]}
            className="md:w-[60px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
          >
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
          </Select>
        </div>
        <div className="select-info">
          <span />
          <Select
            selectedKeys={["1"]}
            className="md:w-[160px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
          >
            <SelectItem key="1">Любой 1</SelectItem>
            <SelectItem key="2">Любой 2</SelectItem>
            <SelectItem key="3">Любой 3</SelectItem>
          </Select>
        </div>
        <span className="reset">Сбросить</span>
      </div>
      <div className="bottom-info">
        <div className="room">
          <span>Ком.</span>
          <div className="items">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={`room-${i}`}
                className={clsx({
                  "!bg-blue !text-white": i + 1 === numberRooms,
                })}
                onClick={() => SetNumberRooms(i + 1)}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="filter-block">
          <SliderInput
            labelName="Стоимость"
            min={10000000}
            max={50000000}
            step={1000}
            typeOption="₸"
            className="w-full md:w-[350px]"
          />

          <SliderInput
            labelName="Площадь м²"
            min={10}
            max={150}
            step={0.5}
            className="w-full md:w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

export default HorizontalFilter;
