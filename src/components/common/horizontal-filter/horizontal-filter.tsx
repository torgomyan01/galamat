"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import SliderInput from "@/components/common/slider-input/slider-input";
import clsx from "clsx";
import { useTranslate } from "@/hooks/useTranslate";
import { RandomKey } from "@/utils/helpers";
import { floorSelectItems } from "@/utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { setChangeParams } from "@/redux/filter";
import { useEffect, useState } from "react";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";

interface IThisProps {
  className?: string;
  projects: IProjectMerged[];
  onClose?: () => void;
}

function HorizontalFilter({ className, projects, onClose }: IThisProps) {
  const dispatch = useDispatch();
  const $t = useTranslate();

  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [houses, setHouses] = useState<IHouse[] | null>(null);

  useEffect(() => {
    if (filterParams.projectId) {
      ActionGetProjectsProperty("/house", {
        isArchive: false,
        status: ["AVAILABLE"],
        ...filterParams,
      }).then((result) => {
        setHouses(result.data);
      });
    }
  }, [filterParams]);

  function ChangeParams(key: string, value: string | number) {
    const _filterParams: any = { ...filterParams };

    _filterParams[key] = value;

    dispatch(setChangeParams(_filterParams));
  }

  function toggleNumber(num: number) {
    const _filterParams = { ...filterParams };

    const index = _filterParams.rooms.indexOf(num);
    const oldRooms = [..._filterParams.rooms];

    if (index === -1) {
      oldRooms.push(num);

      _filterParams.rooms = oldRooms;
    } else {
      oldRooms.splice(index, 1);

      _filterParams.rooms = oldRooms;
    }

    dispatch(setChangeParams(_filterParams));
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

      dispatch(setChangeParams(_filterParams));
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

      dispatch(setChangeParams(_filterParams));
    }, 500);
  }

  return (
    <div className={clsx("filters mb-8", className)}>
      {filterParams ? (
        <>
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
                selectedKeys={[`${filterParams?.projectId || 0}`]}
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
            {houses ? (
              <div className="select-info">
                <span>{$t("objects_")}</span>
                <Select
                  placeholder="Выбрайте объекты"
                  selectedKeys={[`${filterParams?.houseId || 0}`]}
                  className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white !outline-none"
                  variant="bordered"
                  onSelectionChange={(e) =>
                    ChangeParams("houseId", e.currentKey ? +e.currentKey : 0)
                  }
                >
                  {houses.map((house: IHouse) => (
                    <SelectItem key={`${house.id}`}>{house.title}</SelectItem>
                  ))}
                </Select>
              </div>
            ) : null}

            <div className="select-info">
              <span>{$t("floor__")}</span>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="md:w-[160px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white !outline-none !flex-jsb-c"
                  >
                    {filterParams.minFloor || (
                      <span className="opacity-60">Выберите этаж</span>
                    )}
                    <i className="fa-regular fa-chevron-down text-[12px] opacity-90"></i>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Select Floor"
                  className="max-h-[300px] overflow-y-auto"
                >
                  {floorSelectItems.map((floor) => (
                    <DropdownItem
                      key={`floor-${floor}`}
                      onPress={() => ChangeParams("minFloor", floor)}
                    >
                      <div className="w-full flex-jsb-c">
                        {floor}
                        {floor === filterParams.minFloor ? (
                          <i className="fa-solid fa-check mr-1 text-blue"></i>
                        ) : null}
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
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
                      "!bg-blue !text-white": filterParams?.rooms?.includes(
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
                {$t("projects___view")}
              </Button>
              <span
                className="reset"
                // onClick={ClearFilter}
              >
                {$t("reset__")}
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default HorizontalFilter;
