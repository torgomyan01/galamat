import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import LeftSlider from "@/components/layout/home/ads-slider/left-slider";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/utils/consts";

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
              delay: 5000,
              disableOnInteraction: false, // Keep autoplay on user interaction
            }}
            pagination={{ clickable: true }}
            className="info-swiper rounded-[16px] overflow-hidden"
          >
            <SwiperSlide>
              <Link href={SITE_URL.ORLEU_PROJECT} className="w-full h-auto">
                <Image
                  className="w-full h-full object-cover rounded-[20px]"
                  src="/img/ads/start-order.png"
                  alt="У нас есть новый офис"
                  width={1000}
                  height={700}
                />
              </Link>
            </SwiperSlide>
            {/*<SwiperSlide>*/}
            {/*  <Image*/}
            {/*    className="w-full h-auto "*/}
            {/*    src="/img/ads/new-office.png"*/}
            {/*    alt="У нас есть новый офис"*/}
            {/*    width={1000}*/}
            {/*    height={700}*/}
            {/*  />*/}
            {/*</SwiperSlide>*/}
          </Swiper>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default AdsSlider;
