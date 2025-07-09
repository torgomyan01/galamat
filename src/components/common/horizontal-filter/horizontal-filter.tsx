"use client";

import { Button, Select, SelectItem } from "@heroui/react";
import SliderInput from "@/components/common/slider-input/slider-input";
import clsx from "clsx";
import { useTranslate } from "@/hooks/useTranslate";
import { RandomKey } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { floorSelectItems } from "@/utils/consts";

interface IThisProps {
  className?: string;
  projects: IProjectMerged[];
  onClose?: () => void;
}

interface IParams {
  projectId: number;
  rooms: number[];
  "price[min]": number;
  "price[max]": number;
  minFloor: number;
  "area[min]": number;
  "area[max]": number;
}

function HorizontalFilter({ className, projects, onClose }: IThisProps) {
  const $t = useTranslate();

  const [filterParams, setFilterParams] = useState<IParams>({
    projectId: 0,
    rooms: [],
    "price[min]": 0,
    "price[max]": 50000000,
    minFloor: 1,
    "area[min]": 0,
    "area[max]": 400,
  });

  useEffect(() => {
    window.history.pushState({}, "", `?filter=${JSON.stringify(filterParams)}`);
  }, [filterParams]);

  function ChangeParams(key: string, value: string | number) {
    const _filterParams: any = { ...filterParams };

    _filterParams[key] = value;

    setFilterParams(_filterParams);
  }

  function toggleNumber(num: number) {
    const _filterParams = { ...filterParams };

    const index = _filterParams.rooms.indexOf(num);
    if (index === -1) {
      _filterParams.rooms.push(num);
    } else {
      _filterParams.rooms.splice(index, 1);
    }
    setFilterParams(_filterParams);
  }

  let priceDebounceTimer: NodeJS.Timeout;

  function changeMinMaxPrice(res: number[]) {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer);
    }

    priceDebounceTimer = setTimeout(() => {
      const _filterParams: any = { ...filterParams };

      _filterParams["price[min]"] = res[0];
      _filterParams["price[max]"] = res[1];

      setFilterParams(_filterParams);
    }, 500);
  }

  function changeMinMaxPlace(res: number[]) {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer);
    }

    priceDebounceTimer = setTimeout(() => {
      const _filterParams: any = { ...filterParams };

      _filterParams["area[min]"] = res[0];
      _filterParams["area[max]"] = res[1];

      setFilterParams(_filterParams);
    }, 500);
  }

  return (
    <div className={clsx("filters mb-8", className)}>
      <div className="w-[calc(100%+40px)] ml-[-20px] h-12 flex-jsb-c text-blue font-medium border-b mb-4 mt-[-10px] px-5 flex md:hidden">
        <span>{$t("filter__")}</span>
        <i className="fa-solid fa-xmark text-[18px]" onClick={onClose} />
      </div>

      <div className="top-info gap-1">
        {/*<div className="select-info">*/}
        {/*  <span>{$t("district")}</span>*/}

        {/*  <Select*/}
        {/*    // selectedKeys={[`${regions}`]}*/}
        {/*    className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"*/}
        {/*    variant="bordered"*/}
        {/*    // onSelectionChange={_selectRegion}*/}
        {/*  >*/}
        {/*    /!*{[...findRegions, all]?.map((region) => (*!/*/}
        {/*    /!*  <SelectItem key={region}>{region}</SelectItem>*!/*/}
        {/*    /!*))}*!/*/}
        {/*    <SelectItem key="hello">hello</SelectItem>*/}
        {/*  </Select>*/}
        {/*</div>*/}
        <div className="select-info">
          <span>{$t("residential_complex")}</span>
          <Select
            placeholder="Выбрайте проект"
            selectedKeys={[`${filterParams.projectId}`]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white !outline-none"
            variant="bordered"
            onSelectionChange={(e) =>
              ChangeParams("projectId", e.currentKey ? +e.currentKey : 0)
            }
          >
            {projects.map((projectName: IProjectMerged) => (
              <SelectItem key={`${projectName.project_id}`}>
                {projectName.title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="select-info">
          <span>{$t("floor__")}</span>
          <Select
            placeholder="Выбрайте этаж"
            selectedKeys={[filterParams.minFloor]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white !outline-none"
            variant="bordered"
            onSelectionChange={(e) =>
              ChangeParams("minFloor", e.currentKey || "0")
            }
          >
            {floorSelectItems.map((_, i) => (
              <SelectItem key={`${i + 1}`}>Этаж {i + 1}</SelectItem>
            ))}
          </Select>
        </div>
        <span
          className="reset hidden md:block"
          // onClick={ClearFilter}
        >
          {$t("reset__")}
        </span>
      </div>
      <div className="bottom-info">
        <div className="room">
          <span>{$t("com__")}</span>
          <div className="items">
            {Array.from({ length: 4 }).map((room, index) => (
              <span
                key={RandomKey()}
                className={clsx({
                  "!bg-blue !text-white": filterParams.rooms.includes(
                    index + 1,
                  ),
                })}
                onClick={() => toggleNumber(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="filter-block mt-5 md:mt-0">
          <SliderInput
            labelName={$t("price")}
            min={1000000}
            max={50000000}
            step={1000}
            typeOption="₸"
            className="w-full md:w-[350px] mb-6"
            onChangeInput={changeMinMaxPrice}
          />

          <SliderInput
            labelName={$t("area_m")}
            min={10}
            max={400}
            step={0.5}
            className="w-full md:w-[200px]"
            onChangeInput={changeMinMaxPlace}
          />
        </div>
        <div className="w-full flex-jsb-c mt-6 flex md:hidden gap-4">
          <Button
            className="rounded-[6px] bg-blue text-white"
            variant="flat"
            onPress={onClose}
          >
            {$t("projects__")}
          </Button>
          <span
            className="reset"
            // onClick={ClearFilter}
          >
            {$t("reset__")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HorizontalFilter;
