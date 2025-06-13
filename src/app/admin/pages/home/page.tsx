"use client";

import React from "react";
import AdminMainTemplate from "@/components/layout/admin/admin-main-template";
import { SITE_URL } from "@/utils/consts";
import { Listbox, ListboxItem } from "@heroui/react";
import SliderFade from "@/components/layout/admin/pages/home/slider-fade";

function Requests() {
  const items = [
    {
      key: "fade",
      label: "Слайдер Fade",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <AdminMainTemplate
      pathname={`/${SITE_URL.ADMIN_PAGES}/${SITE_URL.ADMIN_PAGES_HOME}`}
    >
      <div className="w-full grid grid-cols-12 gap-4 mt-6">
        <Listbox
          items={items}
          onAction={(key) => alert(key)}
          className="col-span-3 border border-black/20 rounded-[12px] p-2 "
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className="text-black py-2"
              endContent={
                <i className="fa-regular fa-chevron-right text-black/30 text-[14px]"></i>
              }
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>

        <div className="col-span-9 border rounded-[12px] p-4">
          <h2 className="font-medium text-[18px] mb-4">Слайдер Fade</h2>

          <SliderFade />
        </div>
      </div>
    </AdminMainTemplate>
  );
}

export default Requests;
