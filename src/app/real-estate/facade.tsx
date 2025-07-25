import React, { useState } from "react";
import Image from "next/image";
import { ActionGetObjectInfo } from "@/app/actions/admin/objects/get-object-info";
import CanvasView from "@/app/real-estate/canvas-view";
import { addToast } from "@heroui/react";

interface IThisProps {
  projects: IProjectMerged[];
  fakeItem?: number;
}

function Facade({ projects, fakeItem = 0 }: IThisProps) {
  const [project, setProject] = useState<IProjectMerged | null>(null);
  const [objectInfo, setObjectInfo] = useState<IObjectData | null>(null);

  function StartViewObject(project: IProjectMerged) {
    addToast({
      title: "Подождите пожалуйста",
      color: "warning",
    });

    ActionGetObjectInfo(project.project_id, "/projects").then((res) => {
      if (res.status) {
        setObjectInfo(res.data as IObjectData);
        setProject(project);

        addToast({
          title: "Спасибо, можете смотреть ",
          color: "success",
        });
      }
    });
  }

  function LoseFosadView() {
    setObjectInfo(null);
    setProject(null);
  }

  return (
    <div className="w-full">
      <div className="w-full h-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project: IProjectMerged) => (
          <div
            key={`project-${project.id}`}
            className="w-full bg-white p-4 rounded-[12px] cursor-pointer group"
            onClick={() => StartViewObject(project)}
          >
            <div className="w-full h-[300px] relative rounded-[10px] overflow-hidden">
              <Image
                src={project.images[0]?.url}
                alt="house image"
                width={500}
                height={500}
                className="w-full h-full object-cover transition group-hover:scale-[1.02]"
              />
            </div>
            <div className="px-2 py-4 pb-0">
              <h2 className="font-medium text-[24px]">{project.title}</h2>
            </div>
          </div>
        ))}

        {Array.from({ length: fakeItem }).map((_, i) => (
          <div
            key={`project-fake-${i}`}
            className="w-full bg-white p-4 rounded-[12px] cursor-pointer group hidden sm:!block"
          >
            <div className="w-full h-[350px] relative rounded-[10px] overflow-hidden">
              <img
                src="/img/soon.png"
                alt="house image"
                className="w-full h-full object-cover transition group-hover:scale-[1.02]"
              />
            </div>
          </div>
        ))}
      </div>

      {objectInfo && project ? (
        <CanvasView
          project={project}
          objectInfo={objectInfo}
          onClose={LoseFosadView}
        />
      ) : null}
    </div>
  );
}

export default Facade;
