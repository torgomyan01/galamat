import "./ads-slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { RandomKey } from "@/utils/helpers";

function AdsSlider() {
  return (
    <div className="info-block">
      <div className="wrapper">
        <div className="info">
          <div className="buy-coffee">
            <div
              className="bg"
              style={{ backgroundImage: `url(img/buy-coffee-img.png)` }}
            ></div>
            <h2>
              Покупай кофе <br />и получи{" "}
            </h2>
            <div className="price">
              <img src="img/plus.svg" alt="" className="plus" />
              <span>200.000тг</span>
            </div>
          </div>
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
            {Array.from({ length: 4 }).map(() => (
              <SwiperSlide key={RandomKey()}>
                <div
                  className="bg"
                  style={{ backgroundImage: "url(img/info-img.png)" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default AdsSlider;
