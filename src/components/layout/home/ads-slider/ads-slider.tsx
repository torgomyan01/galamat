import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import LeftSlider from "@/components/layout/home/ads-slider/left-slider";
import Image from "next/image";

function AdsSlider() {
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
              delay: 3000,
              disableOnInteraction: false, // Keep autoplay on user interaction
            }}
            pagination={{ clickable: true }}
            className="info-swiper rounded-[16px] overflow-hidden"
          >
            <SwiperSlide>
              <Image
                className="w-full h-auto "
                src="/img/ads/new-office.png"
                alt="У нас есть новый офис"
                width={800}
                height={500}
              />
            </SwiperSlide>
          </Swiper>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default AdsSlider;
