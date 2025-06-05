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
      className="w-full md:!w-[32.5%] md:h-[510px] mb-4 md:mb-0 rounded-[20px] overflow-hidden"
    >
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
