import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import LeftSlider from "@/components/layout/home/ads-slider/left-slider";

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
              <div
                className="bg"
                style={{ backgroundImage: "url(img/info-img.png)" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="bg"
                style={{ backgroundImage: "url(img/ads/new-office.png)" }}
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
