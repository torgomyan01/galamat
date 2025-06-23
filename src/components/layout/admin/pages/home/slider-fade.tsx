import React, { useEffect, useState } from "react";
import { ActionCreateSliderFade } from "@/app/actions/admin/pages/home/slider-fade/create-slider-fade";
import { Spinner } from "@heroui/spinner";
import { ActionGetSlidersFade } from "@/app/actions/admin/pages/home/slider-fade/get-sliders-fade";
import { GetLanguage } from "@/app/actions/admin/language/get-languages";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

function SliderFade() {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ISliderItem[]>([]);

  const [languages, setLanguages] = useState<ILanguage[]>([]);

  useEffect(() => {
    GetLanguage("parents").then((res) => {
      setLanguages(res.data);
    });
  }, []);

  useEffect(UpdateSliders, []);

  function UpdateSliders() {
    ActionGetSlidersFade().then(({ data }) => {
      setItems(data as ISliderItem[]);
    });
  }

  function CreateParent() {
    setLoading(true);
    ActionCreateSliderFade()
      .then(() => {
        UpdateSliders();
      })
      .finally(() => setLoading(false));
  }

  const [moadlUploadImage, setModalUpload] = useState<number>(0);

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-4">
        {items.map((item) =>
          item.children?.map((child) => (
            <div
              key={`slider-item-${child.id}`}
              onClick={() => setModalUpload(child.id)}
              className="w-full h-[200px] border rounded-[12px] hover:border-blue cursor-pointer p-2 grid grid-cols-2 grid-rows-2 gap-2"
            >
              {languages.map((language) => (
                <div
                  key={`lang-${language.key}`}
                  className="w-full border relative rounded-[8px] flex-jc-c"
                >
                  <span className="px-2 rounded-[2px] absolute right-[-2px] top-[-2px] bg-blue text-white">
                    {language.name}
                  </span>
                  <span className="text-[11px] text-blue/50 leading-normal text-center">
                    Надо дополнить
                  </span>
                </div>
              ))}
              {/*{child.children?.map((sub_child: any) => (*/}
              {/*  <img*/}
              {/*    key={`sub-child-item-${child.id}`}*/}
              {/*    src={sub_child.image_path}*/}
              {/*    alt="img"*/}
              {/*    className="h-full object-cover rounded-[6px]"*/}
              {/*  />*/}
              {/*))}*/}
            </div>
          )),
        )}

        <div
          className="w-full h-[200px] border rounded-[12px] flex-jc-c hover:border-blue cursor-pointer"
          onClick={CreateParent}
        >
          {loading ? (
            <Spinner color="danger" />
          ) : (
            <i className="fa-regular fa-plus text-[50px] text-black/50"></i>
          )}
        </div>
      </div>

      <Modal
        size="xl"
        isOpen={!!moadlUploadImage}
        onOpenChange={() => setModalUpload(0)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Добавить картинку слайдера
          </ModalHeader>
          <ModalBody>
            <p>
              Здесь жаждого ячейка для каждого языка, на верху написано языка
            </p>

            <div className="w-full mb-4 mt-6 grid grid-cols-3 gap-4">
              {languages.map((language) => (
                <label
                  key={`lang--modal-${language.key}`}
                  className="w-full border border-blue/50 hover:border-blue cursor-pointer relative rounded-[8px] flex-jc-c h-[150px]"
                >
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, image/webp"
                    className="hidden"
                  />
                  <span className="px-2 rounded-[2px] absolute right-[-2px] top-[-2px] bg-blue text-white">
                    {language.name}
                  </span>
                  <span className="text-[11px] text-blue/50 leading-normal text-center">
                    Надо дополнить
                  </span>
                </label>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SliderFade;
