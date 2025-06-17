"use client";

import React from "react";

function ContentOrleuProjectHomeMap() {
  return (
    <div className="section section8">
      <div className="planning-wrap">
        <div className="title-wrap">
          <h2>Планировочные решения</h2>
          <div className="arrow-wrap">
            <div className="slider-navigation">
              <button type="button" className="slick-prev">
                <img src="img/slider-arr.svg" alt="" />
              </button>
              <button type="button" className="slick-next">
                <img src="img/slider-arr.svg" alt="" />
              </button>
            </div>
            <a href="#" className="planing-btn">
              Выбрать квартиру
            </a>
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-9 h-[80dvh] flex-jc-c bg-[#F3F7FF] rounded-[20px]">
            <img src="img/solutions-img.png" alt="" />
          </div>
          <div className="col-span-3 h-[80dvh] flex-js-s flex-col gap-4 rounded-[20px] overflow-hidden">
            <div className="w-full h-full flex-jc-c p-9 bg-[#F3F7FF] rounded-[20px]">
              <img src="img/solutions-img.png" alt="" className="w-[90%]" />
            </div>
            <div className="w-full h-full flex-jc-c p-9 bg-[#F3F7FF] rounded-[20px]">
              <img src="img/solutions-img.png" alt="" className="w-[90%]" />
            </div>
            <div className="w-full h-full flex-jc-c p-9 bg-[#F3F7FF] rounded-[20px]">
              <img src="img/solutions-img.png" alt="" className="w-[90%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentOrleuProjectHomeMap;
