import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react";
import { ModalFooter } from "@heroui/modal";
import React from "react";

interface IThisProps {
  status: boolean;
  onClose: () => void;
  projects: IProjectMerged[];
  onSelectProjects: (value: string[]) => void;
  onClearFilter: () => void;
}

function ModalSelectProject({
  status,
  onClose,
  projects,
  onSelectProjects,
  onClearFilter,
}: IThisProps) {
  return (
    <Modal isOpen={status} onOpenChange={onClose}>
      <ModalContent className="rounded-[12px_12px_0_0] w-full m-0">
        <ModalBody className="pt-6 overflow-y-auto">
          <div className="w-full flex-js-s gap-3 flex-col">
            <h3 className="text-[12px] font-medium">Жилые комплексы</h3>
            <CheckboxGroup onValueChange={onSelectProjects}>
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

export default ModalSelectProject;
