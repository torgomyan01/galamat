"use client";

import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LeftSlider from "@/components/layout/home/ads-slider/left-slider";
import { ActionGetSlidersFade } from "@/app/actions/admin/pages/home/slider-fade/get-sliders-fade";
import { filesLink } from "@/utils/consts";

function AdsSlider() {
  const activeLang = useSelector(
    (state: IStateTranslate) => state.translateSite.selectedLang,
  );

  const [items, setItems] = useState<ISliderItem[]>([]);

  useEffect(() => {
    ActionGetSlidersFade("slider-carousel").then(({ data }) => {
      setItems(data as ISliderItem[]);
    });
  }, []);

  // Flatten all slide items from children
  const allSlides = items.flatMap((item) => item.children ?? []);

  return (
    <div className="info-block">
      <div className="wrapper">
        <div className="info">
          <LeftSlider />

          {allSlides.length > 1 && (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="info-swiper rounded-[16px] overflow-hidden"
            >
              {allSlides.map((sliderItem) => {
                const imagePath = sliderItem.children?.find(
                  (child) => child.lang_key === activeLang,
                )?.image_path;

                return (
                  <SwiperSlide key={`home-slider-ads-${sliderItem.id}`}>
                    <Link href={sliderItem.url} className="w-full h-auto">
                      {imagePath && (
                        <Image
                          className="w-full h-full object-cover rounded-[20px]"
                          src={`${filesLink}${imagePath}`}
                          alt="Слайд"
                          width={1000}
                          height={700}
                        />
                      )}
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdsSlider;
