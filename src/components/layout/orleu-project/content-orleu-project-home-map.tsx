"use client";

import React, { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const sliderBlocks = [
  "/img/orleu-page/block-1.png",
  "/img/orleu-page/block-2.png",
  "/img/orleu-page/block-3.png",
  "/img/orleu-page/block-4.png",
  "/img/orleu-page/block-5.png",
  "/img/orleu-page/block-6.png",
  "/img/orleu-page/block-7.png",
  "/img/orleu-page/block-8.png",
  "/img/orleu-page/block-9.png",
  "/img/orleu-page/block-10.png",
];

function ContentOrleuProjectHomeMap() {
  const [activeSlider, setActiveSlider] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="section section8">
      <div className="planning-wrap">
        <div className="title-wrap">
          <h2>Планировочные решения</h2>
          <div className="arrow-wrap">
            <div className="slider-navigation">
              <button
                type="button"
                className="slick-prev"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <img src="img/slider-arr.svg" alt="" />
              </button>
              <button
                type="button"
                className="slick-next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <img src="img/slider-arr.svg" alt="" />
              </button>
            </div>
            <a href="#" className="planing-btn">
              Выбрать квартиру
            </a>
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-9 h-[80dvh] flex-jc-c bg-[#F3F7FF] rounded-[20px] overflow-hidden p-6">
            <img
              src={sliderBlocks[activeSlider]}
              alt=""
              className="w-full rounded-[12px]"
            />
          </div>
          <div className="col-span-3 h-[80dvh] flex-js-s flex-col gap-4 rounded-[20px] overflow-hidden">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              direction={"vertical"}
              slidesPerView={3}
              spaceBetween={30}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              onSlideChange={(swiper) => setActiveSlider(swiper.activeIndex)}
              modules={[Mousewheel]}
              className="mySwiper"
            >
              {sliderBlocks.map((item, index) => (
                <SwiperSlide key={item}>
                  <div
                    className="w-full h-full flex-jc-c p-9 bg-[#F3F7FF] rounded-[20px] cursor-pointer transition hover:bg-blue/10"
                    onClick={() => swiperRef.current?.slideTo(index)}
                  >
                    <img src={item} alt="" className="w-[90%]" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentOrleuProjectHomeMap;
