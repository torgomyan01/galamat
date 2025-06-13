import React, { useEffect, useState } from "react";
import { ActionCreateSliderFade } from "@/app/actions/admin/pages/home/slider-fade/create-slider-fade";
import { Spinner } from "@heroui/spinner";
import { ActionGetSlidersFade } from "@/app/actions/admin/pages/home/slider-fade/get-sliders-fade";

function SliderFade() {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ISliderItem[]>([]);

  useEffect(UpdateSliders, []);

  function UpdateSliders() {
    ActionGetSlidersFade().then(({ data }) => {
      setItems(data as ISliderItem[]);
      // setItems(data);
    });
  }

  function CreateParent() {
    setLoading(true);
    ActionCreateSliderFade()
      .then((res) => {
        console.log(res);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {items.map((item) =>
        item.children?.map((child) => (
          <div
            key={`slider-item-${child.id}`}
            className="w-full h-[200px] border rounded-[12px] hover:border-blue cursor-pointer p-2 grid grid-cols-3 grid-rows-2 gap-1"
          >
            {child.children?.map((sub_child: any) => (
              <img
                key={`sub-child-item-${child.id}`}
                src={sub_child.image_path}
                alt="img"
                className="h-full object-cover rounded-[6px]"
              />
            ))}
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
  );
}

export default SliderFade;
