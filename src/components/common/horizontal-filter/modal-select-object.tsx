import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { ModalFooter } from "@heroui/modal";
import React from "react";

interface IThisProps {
  status: boolean;
  onClose: () => void;
  houses: IHouse[] | null;
  onSelectHouses: (value: string) => void;
  onClearFilter: () => void;
}

function ModalSelectObject({
  status,
  onClose,
  houses,
  onSelectHouses,
  onClearFilter,
}: IThisProps) {
  return (
    <Modal isOpen={status} onOpenChange={onClose}>
      <ModalContent className="rounded-[12px_12px_0_0] w-full m-0">
        <ModalBody className="pt-6 overflow-y-auto">
          <div className="w-full flex-js-s gap-2 flex-col">
            <h3 className="text-[12px] font-medium">Объекты</h3>

            <RadioGroup onValueChange={onSelectHouses}>
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
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex-jsb-c gap-4">
            <Button
              className="w-full rounded-[4px] bg-transparent text-blue"
              onPress={onClearFilter}
            >
              Сбросить все
            </Button>
            <Button
              color="primary"
              type="submit"
              className="bg-blue text-white w-full rounded-[4px]"
              onPress={onClose}
            >
              Применить
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalSelectObject;
