"use client";

import { Button, Select, SelectItem, SharedSelection } from "@heroui/react";
import SliderInput from "@/components/common/slider-input/slider-input";
import clsx from "clsx";
import { useState } from "react";
import { all } from "@/utils/consts";
import { useTranslate } from "@/hooks/useTranslate";

interface IThisProps {
  className?: string;
  houses: IProjectStage[];
  selectRegion: (key: string) => void;
  selectProject: (key: string) => void;
  selectFloor: (key: number | string) => void;
  onSelectRoom: (roomArray: string[]) => void;
  onSelectMinMax: (prices: number[]) => void;
  result: number;
  onClose: () => void;
}

function HorizontalFilter({
  className,
  houses,
  selectRegion,
  selectProject,
  selectFloor,
  onSelectRoom,
  onSelectMinMax,
  result,
  onClose,
}: IThisProps) {
  const $t = useTranslate();
  const findRegions = houses
    .filter((house: IProjectStage) => house.address.region)
    .map((house: IProjectStage) => house.address.region);

  const [regions, setRegions] = useState<string>(all);
  const [project, setProject] = useState<string>(all);
  const [floor, setFloor] = useState<string>(all);

  const getProjects = [...new Set(houses.map((house) => house.projectName))];
  const getFloors = [...new Set(houses.map((house) => house.maxFloor))].sort(
    (a, b) => a - b,
  );

  function _selectRegion(keys: SharedSelection) {
    if (keys.currentKey) {
      setRegions(keys.currentKey);
      selectRegion(keys.currentKey);
    }
  }

  function _selectProject(keys: SharedSelection) {
    if (keys.currentKey) {
      setProject(keys.currentKey);
      selectProject(keys.currentKey);
    }
  }

  function _selectFloor(keys: SharedSelection) {
    if (keys.currentKey) {
      setFloor(keys.currentKey);
      selectFloor(+keys.currentKey);
    }
  }

  function ClearFilter() {
    setRegions(all);
    selectRegion(all);

    setProject(all);
    selectProject(all);

    setFloor(all);
    selectFloor(all);

    setSelectedRoom([]);
  }

  const rooms = ["one", "two", "three", "more_than_three"];
  const [selectedRoom, setSelectedRoom] = useState<string[]>([]);

  function selectRoom(room: string) {
    if (selectedRoom.includes(room)) {
      const removeData = selectedRoom.filter((i) => i !== room);
      setSelectedRoom(removeData);
      onSelectRoom(removeData);
    } else {
      const data = [...selectedRoom, room];
      setSelectedRoom(data);
      onSelectRoom(data);
    }
  }

  let priceDebounceTimer: NodeJS.Timeout;

  function changeMinMaxPrice(res: number[]) {
    if (priceDebounceTimer) {
      clearTimeout(priceDebounceTimer);
    }

    priceDebounceTimer = setTimeout(() => {
      onSelectMinMax(res);
    }, 1000);
  }

  return (
    <div className={clsx("filters mb-8", className)}>
      <div className="w-[calc(100%+40px)] ml-[-20px] h-12 flex-jsb-c text-blue font-medium border-b mb-4 mt-[-10px] px-5 flex md:hidden">
        <span>{$t("filter__")}</span>
        <i className="fa-solid fa-xmark text-[18px]" onClick={onClose} />
      </div>

      <div className="top-info gap-1">
        <div className="select-info">
          <span>{$t("district")}</span>

          <Select
            selectedKeys={[`${regions}`]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
            onSelectionChange={_selectRegion}
          >
            {[...findRegions, all]?.map((region) => (
              <SelectItem key={region}>{region}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="select-info">
          <span>{$t("residential_complex")}</span>
          <Select
            selectedKeys={[project]}
            className="md:w-[150px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
            onSelectionChange={_selectProject}
          >
            {[...getProjects, all]?.map((projectName) => (
              <SelectItem key={projectName}>{projectName}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="select-info">
          <span>{$t("floor__")}</span>
          <Select
            selectedKeys={[`${floor}`]}
            className="md:w-[80px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
            variant="bordered"
            onSelectionChange={_selectFloor}
          >
            {[...getFloors, all]?.map((floor) => (
              <SelectItem key={`${floor}`}>{floor}</SelectItem>
            ))}
          </Select>
        </div>
        <span className="reset hidden md:block" onClick={ClearFilter}>
          {$t("reset__")}
        </span>
      </div>
      <div className="bottom-info">
        <div className="room">
          <span>{$t("com__")}</span>
          <div className="items">
            {rooms.map((room, index) => (
              <span
                key={room}
                className={clsx({
                  "!bg-blue !text-white": selectedRoom.includes(room),
                })}
                onClick={() => selectRoom(room)}
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
            max={150}
            step={0.5}
            className="w-full md:w-[200px]"
          />
        </div>
        <div className="w-full flex-jsb-c mt-6 flex md:hidden gap-4">
          <Button
            className="rounded-[6px] bg-blue text-white"
            variant="flat"
            onPress={onClose}
          >
            {result} {$t("projects__")}
          </Button>
          <span className="reset" onClick={ClearFilter}>
            {$t("reset__")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HorizontalFilter;
