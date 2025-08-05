import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { filesLink, SITE_URL } from "@/utils/consts";
import React, { useEffect, useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";
import { ActionGetPageSection } from "@/app/actions/admin/section-components/get-section-components";
import moment from "moment";

interface IThisProps {
  onSuccess: (status: boolean) => void;
}

function CompletedProjects({ onSuccess }: IThisProps) {
  const $t = useTranslate();

  const [oldProjects, setOldProjects] = useState<IDataOldProjects[]>([]);

  useEffect(() => {
    ActionGetPageSection("company_old_projects").then((res: any) => {
      setOldProjects(res.data);
      onSuccess(true);
    });
  }, []);

  return (
    <div className="completed-projects !mt-[60px]">
      <div className="wrapper">
        <h2>{$t("completed_projects")}</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="completed-projects-swiper w-full"
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
        >
          {oldProjects.map((item, i) => (
            <SwiperSlide key={`home-ads-${i}`}>
              <Link
                href={SITE_URL.REAL_ESTATE}
                className="completed-projects-item cursor-pointer bg-white p-4 rounded-[16px]"
              >
                <span
                  className="img-wrap !rounded-[12px]"
                  style={{
                    backgroundImage: `url(${filesLink}${item.image_url})`,
                  }}
                />
                <b className="name">ЖК {item.name}</b>
                <span className="address">{item.address}</span>
                <span className="date">
                  Сдан {moment(item.date).format("YYYY")}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CompletedProjects;
