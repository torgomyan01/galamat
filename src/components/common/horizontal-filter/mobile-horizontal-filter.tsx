"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  NumberInput,
  Radio,
  RadioGroup,
} from "@heroui/react";
import IconCompany from "@/components/common/icons/icon-options";
import React, { useEffect, useState } from "react";
import { ModalFooter } from "@heroui/modal";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setChangeParams } from "@/redux/filter";
import { ActionGetProjectsProperty } from "@/app/actions/projects/get-projects-property";
import ModalSelectProject from "@/components/common/horizontal-filter/modal-select-project";
import ModalSelectObject from "@/components/common/horizontal-filter/modal-select-object";
import ModalSelectAreas from "@/components/common/horizontal-filter/modal-select-areas";
import ModalSelectFloor from "@/components/common/horizontal-filter/modal-select-floor";
import ModalSelectPrice from "@/components/common/horizontal-filter/modal-select-price";
import ModalSelectPlace from "@/components/common/horizontal-filter/modal-select-place";

interface IThisProps {
  maxPrice: number;
  maxArea: number;
  projects: IProjectMerged[];
}

function MobileHorizontalFilter({ maxPrice, maxArea, projects }: IThisProps) {
  const dispatch = useDispatch();
  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  const [modalOpenAllFilter, setModalOpenAllFilter] = useState(false);

  const [modalSelectProjects, setModalSelectProjects] = useState(false);
  const [modalSelectHouses, setModalSelectHouse] = useState(false);
  const [modalSelectAreas, setModalSelectAreas] = useState(false);
  const [modalSelectFloor, setModalSelectFloor] = useState(false);
  const [modalSelectPrice, setModalSelectPrice] = useState(false);
  const [modalSelectPlace, setModalSelectPlace] = useState(false);

  const [houses, setHouses] = useState<IHouse[] | null>(null);

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

  function ClearFilter() {
    dispatch(
      setChangeParams({
        projectId: 0,
        // projectIds: [],
        houseId: 0,
        rooms: [],
        "price[min]": 0,
        "price[max]": 60000000,
        minFloor: 0,
        maxFloor: 0,
        "area[min]": 0,
        "area[max]": 400,
      }),
    );
    setModalOpenAllFilter(false);
  }

  function ChangeParams(key: string, value: string | number | number[]) {
    const _filterParams: any = { ...filterParams };

    _filterParams[key] = value;

    dispatch(setChangeParams(_filterParams));
  }

  useEffect(() => {
    ActionGetProjectsProperty("/house", {
      isArchive: false,
      status: ["AVAILABLE"],
      projectIds: projects.map((_proj) => _proj.project_id),
    }).then((result) => {
      setHouses(result.data);
    });
  }, [filterParams]);

  function selectProjects(value: string[]) {
    const getValuesNumber = value.map((__proj) => +__proj);
    ChangeParams("projectIds", getValuesNumber);
  }

  function SubmitForm(e: any) {
    e.preventDefault();
    setModalOpenAllFilter(false);
  }

  return (
    <>
      <div className="w-full mb-6 flex gap-2 md:hidden">
        <Button
          className="rounded-[4px] bg-white text-[12px] min-w-[40px] px-0"
          onPress={() => setModalOpenAllFilter(true)}
        >
          <IconCompany />
        </Button>
        <div className="w-full overflow-x-auto bottom-scroll-hidden">
          <div className="flex-js-c gap-2 w-[750px]">
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectProjects(true)}
            >
              Жилой комплекс
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectHouse(true)}
            >
              Объекты
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectFloor(true)}
            >
              Этаж
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectAreas(true)}
            >
              Комнатность
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectPrice(true)}
            >
              Стоимость
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
            <Button
              className="rounded-[4px] bg-white text-[12px]"
              onPress={() => setModalSelectPlace(true)}
            >
              Площадь М²
              <i className="fa-regular fa-chevron-down"></i>
            </Button>
          </div>
        </div>
      </div>

      <ModalSelectProject
        status={modalSelectProjects}
        onClose={() => setModalSelectProjects(false)}
        projects={projects}
        onClearFilter={ClearFilter}
        onSelectProjects={selectProjects}
      />

      <ModalSelectObject
        status={modalSelectHouses}
        onClose={() => setModalSelectHouse(false)}
        houses={houses}
        onClearFilter={ClearFilter}
        onSelectHouses={(value) => ChangeParams("houseId", +value)}
      />

      <ModalSelectAreas
        status={modalSelectAreas}
        onClose={() => setModalSelectAreas(false)}
        onClearFilter={ClearFilter}
        toggleNumber={toggleNumber}
      />

      <ModalSelectFloor
        status={modalSelectFloor}
        onClose={() => setModalSelectFloor(false)}
        onClearFilter={ClearFilter}
        onChangeMin={(value: number) => ChangeParams("minFloor", value)}
        onChangeMax={(value: number) => ChangeParams("MaxFloor", value)}
      />

      <ModalSelectPrice
        status={modalSelectPrice}
        onClose={() => setModalSelectPrice(false)}
        onClearFilter={ClearFilter}
        onChangeMin={(value: number) => ChangeParams("price[min]", value)}
        onChangeMax={(value: number) => ChangeParams("price[max]", value)}
      />

      <ModalSelectPlace
        status={modalSelectPlace}
        onClose={() => setModalSelectPlace(false)}
        onClearFilter={ClearFilter}
        onChangeMin={(value: number) => ChangeParams("area[min]", value)}
        onChangeMax={(value: number) => ChangeParams("area[max]", value)}
      />

      <Modal
        isOpen={modalOpenAllFilter}
        onOpenChange={() => setModalOpenAllFilter(false)}
        size="full"
      >
        <ModalContent as="form" onSubmit={SubmitForm}>
          <ModalBody className="pt-6 overflow-y-auto">
            <div className="w-full h-full overflow-y-auto flex-js-s gap-4 flex-col">
              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Жилые комплексы</h3>
                <CheckboxGroup onValueChange={selectProjects}>
                  {projects.map((project) => (
                    <Checkbox
                      key={`__proj__${project.id}`}
                      value={`${project.project_id}`}
                      className="filter-checkbox"
                      classNames={{ label: "text-[12px]" }}
                    >
                      {project.title}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>

              <Divider />

              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Объекты</h3>

                <RadioGroup
                  onValueChange={(value) => ChangeParams("houseId", +value)}
                >
                  {houses?.map((house) => (
                    <Radio
                      key={`house__${house.id}`}
                      value={`${house.id}`}
                      className="filter-radio"
                      classNames={{ label: "text-[12px]" }}
                    >
                      {house.title}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              <Divider />

              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Комнатность</h3>
                <div className="flex-js-c gap-1">
                  {Array.from({ length: 4 }).map((room, index) => (
                    <span
                      key={`rooms-${index}`}
                      className={clsx(
                        "w-[40px] h-[34px] border-[2px] border-black/10 !rounded-[4px] text-[14px] flex-jc-c text-black/70",
                        {
                          "!bg-blue !text-white": filterParams?.rooms?.includes(
                            index + 1,
                          ),
                        },
                      )}
                      onClick={() => toggleNumber(index + 1)}
                    >
                      {index + 1}
                      {index + 1 === 4 ? "+" : ""}
                    </span>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Стоимость</h3>

                <div className="w-full grid grid-cols-2 gap-2">
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      От
                    </span>
                    <NumberInput
                      size="sm"
                      className="h-[30px]"
                      variant="bordered"
                      minValue={0}
                      onValueChange={(value: number) =>
                        ChangeParams("price[min]", value)
                      }
                      endContent="₸"
                    />
                  </label>
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      До
                    </span>
                    <NumberInput
                      size="sm"
                      maxValue={maxPrice}
                      className="h-[30px]"
                      variant="bordered"
                      onValueChange={(value: number) =>
                        ChangeParams("price[max]", value)
                      }
                      endContent="₸"
                    />
                  </label>
                </div>
              </div>

              <Divider className="mt-6" />

              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Площадь М²</h3>

                <div className="w-full grid grid-cols-2 gap-2">
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      От
                    </span>
                    <NumberInput
                      size="sm"
                      className="h-[30px]"
                      variant="bordered"
                      minValue={10}
                      defaultValue={10}
                      onValueChange={(value: number) =>
                        ChangeParams("area[min]", value)
                      }
                      endContent="м²"
                    />
                  </label>
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      До
                    </span>
                    <NumberInput
                      size="sm"
                      maxValue={maxArea}
                      defaultValue={maxArea}
                      className="h-[30px]"
                      variant="bordered"
                      onValueChange={(value: number) =>
                        ChangeParams("area[max]", value)
                      }
                      endContent="м²"
                    />
                  </label>
                </div>
              </div>

              <Divider className="mt-6" />

              <div className="w-full flex-js-s gap-2 flex-col">
                <h3 className="text-[12px] font-medium">Этаж</h3>

                <div className="w-full grid grid-cols-2 gap-2">
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      От
                    </span>
                    <NumberInput
                      size="sm"
                      className="h-[30px]"
                      variant="bordered"
                      minValue={1}
                      onValueChange={(value: number) =>
                        ChangeParams("minFloor", value)
                      }
                      defaultValue={1}
                    />
                  </label>
                  <label>
                    <span className="text-[12px] text-[#9D9D9D] mb-1 block">
                      До
                    </span>
                    <NumberInput
                      size="sm"
                      maxValue={100}
                      defaultValue={100}
                      className="h-[30px]"
                      onValueChange={(value: number) =>
                        ChangeParams("maxFloor", value)
                      }
                      variant="bordered"
                    />
                  </label>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex-jsb-c gap-4">
              <Button
                className="w-full rounded-[4px] bg-transparent text-blue"
                onPress={ClearFilter}
              >
                Сбросить все
              </Button>
              <Button
                color="primary"
                type="submit"
                className="bg-blue text-white w-full rounded-[4px]"
              >
                Применить
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MobileHorizontalFilter;
