"use client";

import React, { useEffect, useState } from "react";
import { ActionGetPageSection } from "@/app/actions/admin/section-components/get-section-components";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
} from "@heroui/react";
import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Input } from "@heroui/react";
import axios from "axios";
import { filesLink, filesLinkRemove, filesLinkSave } from "@/utils/consts";
import { ActionUpdatePageSection } from "@/app/actions/admin/section-components/update-section-components";

function CompanyOldProjects() {
  const [_data, setData] = useState<IDataOldProjects[] | null>(null);
  const [modalCreateProj, setModalCreateProj] = useState(false);

  function updateData(data: IDataOldProjects[]) {
    ActionUpdatePageSection(1, data);
  }

  useEffect(() => {
    ActionGetPageSection("company_old_projects").then((res: any) => {
      setData(res.data);
    });
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  function AddOldProject(e: any) {
    e.preventDefault();

    const name = e.target.name.value;
    const address = e.target.address.value;
    const date = e.target.date.value;
    const file = e.target.image_url.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const maxSizeInBytes = 300 * 1024;
    if (file.size > maxSizeInBytes) {
      addToast({
        title: "Размер изображения не должен превышать 300 КБ.",
        color: "danger",
      });
      return;
    }

    setLoading(true);

    axios.post(filesLinkSave, formData).then(({ data }: any) => {
      if (data.status === "success") {
        const newData = [
          ...(_data || []),
          {
            name,
            address,
            date,
            image_url: data.url,
          },
        ];

        setData(newData);

        updateData(newData);
        setLoading(false);
        setModalCreateProj(false);
      }
    });
  }

  function RemoveOldProject(imageUrl: string) {
    addToast({
      title: "Подождите пожалуйста",
      color: "default",
    });
    axios.post(filesLinkRemove, { url: imageUrl }).then(({ data }) => {
      if (data.status === "success") {
        if (_data) {
          const RemoveData = _data.filter(
            (item) => item.image_url !== imageUrl,
          );

          setData(RemoveData);
          updateData(RemoveData);

          addToast({
            title: "Успешно удалено ",
            color: "success",
          });
        }
      }
    });
  }

  return (
    <div className="w-full">
      <div className="w-full flex-je-c mt-[-40px] mb-4">
        <Button
          color="primary"
          size="sm"
          onPress={() => setModalCreateProj(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>

      {_data ? (
        <div className="w-full grid grid-cols-3 gap-4">
          {_data.length ? (
            _data.map((item, i) => (
              <Card key={`item-proj-${i}`} className="py-4 relative">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {item.address}
                  </p>
                  <small className="text-default-500">Сдан {item.date}</small>
                  <h4 className="font-bold text-large">ЖК {item.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="rounded-xl h-[300px] object-cover"
                    src={`${filesLink}${item.image_url}`}
                    width={270}
                    height={270}
                  />

                  <Button
                    className="mt-2"
                    onPress={() => RemoveOldProject(item.image_url)}
                  >
                    Удалить
                  </Button>
                </CardBody>
              </Card>
            ))
          ) : (
            <h1 className="text-center col-span-3 mb-4 text-black/60">
              Пока информация не заполнено
            </h1>
          )}
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}

      <Modal isOpen={modalCreateProj} onClose={() => setModalCreateProj(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Добавить проект
          </ModalHeader>
          <ModalBody>
            <form action="#" onSubmit={AddOldProject}>
              <Input
                label="Выбрать картинку  "
                type="file"
                className="w-full mb-3"
                accept="image/*"
                name="image_url"
                isRequired
              />
              <Input
                label="Название"
                name="name"
                type="text"
                className="w-full mb-3"
                isRequired
              />
              <Input
                label="Адрес"
                name="address"
                type="text"
                className="w-full mb-3"
                isRequired
              />
              <DatePicker
                className="w-full mb-3"
                isRequired
                name="date"
                label="Дата сдачи "
              />
              <div className="w-full flex-je-c mt-4 mb-4">
                <Button type="submit" color="primary" isLoading={loading}>
                  Добавить
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CompanyOldProjects;
