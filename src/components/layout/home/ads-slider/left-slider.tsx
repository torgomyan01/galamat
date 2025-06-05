import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

function LeftSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      allowTouchMove={false}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false, // Keep autoplay on user interaction
      }}
      className="!w-[32.5%] h-[510px]"
    >
      <SwiperSlide>
        <div className="buy-coffee h-full">
          <div
            className="bg"
            style={{ backgroundImage: `url(img/buy-coffee-img.png)` }}
          />
          <h2>
            Покупай кофе <br />и получи
          </h2>
          <div className="price">
            <img src="img/plus.svg" alt="" className="plus" />
            <span>200.000тг</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full rounded-[20px] overflow-hidden">
          <Image
            src="/img/ads/ads-for-map.png"
            alt="ads-for-map.png"
            width={500}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default LeftSlider;
