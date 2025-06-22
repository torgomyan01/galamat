import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import {
  Button,
  Select,
  SelectItem,
  SharedSelection,
  Switch,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { ActionGetProjectInfo } from "@/app/actions/admin/projects/get-project-info";
import { Spinner } from "@heroui/spinner";
import { ActionUpdateProjectInfo } from "@/app/actions/admin/projects/change-project-info";
import { ProjectDataPositions } from "@/utils/consts";

interface IThisProps {
  status: boolean;
  onClose: () => void;
  project: IProjectStage;
}

function ModalChangeProductItem({ status, onClose, project }: IThisProps) {
  const [projectData, setProjectData] = useState<IProjectData | null>(null);

  const [loadingChangeHide, setLoadingChangeHide] = useState(false);
  const [loadingSelectPosition, setLoadingSelectPosition] = useState(false);

  useEffect(() => {
    ActionGetProjectInfo(project.id).then(({ data, status }) => {
      if (status) {
        setProjectData(data as IProjectData);
      }
    });
  }, []);

  function changeStatusHide(value: any) {
    if (projectData) {
      setLoadingChangeHide(true);
      ActionUpdateProjectInfo(projectData.id, "hide", value)
        .then(({ data }) => {
          setProjectData(data as IProjectData);
        })
        .finally(() => setLoadingChangeHide(false));
    }
  }

  function ChangePosition(e: SharedSelection) {
    if (projectData && e.currentKey) {
      setLoadingSelectPosition(true);
      ActionUpdateProjectInfo(projectData.id, "position", e.currentKey)
        .then(({ data }) => {
          setProjectData(data as IProjectData);
        })
        .finally(() => setLoadingSelectPosition(false));
    }
  }

  return (
    <Modal isOpen={status} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Изменить {project.projectName} ID: {project.projectId}
        </ModalHeader>
        <ModalBody>
          {projectData ? (
            <>
              <div className="mb-4">
                <Select
                  className="w-full"
                  label="Изменить статус"
                  onSelectionChange={ChangePosition}
                  selectedKeys={[`${projectData.position}`]}
                  isLoading={loadingSelectPosition}
                >
                  {ProjectDataPositions.map((status) => (
                    <SelectItem key={status.value}>{status.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                {loadingChangeHide ? (
                  <Spinner color="danger" />
                ) : (
                  <Switch
                    disabled={loadingChangeHide}
                    isSelected={projectData.hide}
                    onValueChange={changeStatusHide}
                  >
                    Скрыть
                  </Switch>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-[300px] flex-jc-c">
              <Spinner color="danger" />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalChangeProductItem;
