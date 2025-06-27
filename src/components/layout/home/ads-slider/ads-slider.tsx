import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import LeftSlider from "@/components/layout/home/ads-slider/left-slider";
import Image from "next/image";
import Link from "next/link";
import { filesLink } from "@/utils/consts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ActionGetSlidersFade } from "@/app/actions/admin/pages/home/slider-fade/get-sliders-fade";

function AdsSlider() {
  const activeLang = useSelector(
    (state: IStateTranslate) => state.translateSite.selectedLang,
  );

  const [items, setItems] = useState<ISliderItem[] | null>(null);

  useEffect(getSliders, []);

  function getSliders() {
    ActionGetSlidersFade("slider-carousel").then(({ data }) => {
      setItems(data as ISliderItem[]);
    });
  }

  return (
    <div className="info-block">
      <div className="wrapper">
        <div className="info">
          <LeftSlider />

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="info-swiper rounded-[16px] overflow-hidden"
          >
            {items?.map((item: ISliderItem) => (
              <>
                {item.children?.map((sliderItem) => (
                  <SwiperSlide key={`home-slider-ads-${sliderItem.id}`}>
                    <Link href={sliderItem.url} className="w-full h-auto">
                      <Image
                        className="w-full h-full object-cover rounded-[20px]"
                        src={`${filesLink}${sliderItem.children?.find((_child) => _child.lang_key === activeLang)?.image_path}`}
                        alt="У нас есть новый офис"
                        width={1000}
                        height={700}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </>
            ))}
          </Swiper>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default AdsSlider;
