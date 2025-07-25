import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import { ActionGetSlidersFade } from "@/app/actions/admin/pages/home/slider-fade/get-sliders-fade";
import { filesLink } from "@/utils/consts";
import { useSelector } from "react-redux";
import { Skeleton } from "@heroui/react";

function LeftSlider() {
  const activeLang = useSelector(
    (state: IStateTranslate) => state.translateSite.selectedLang,
  );

  const [items, setItems] = useState<ISliderItem[] | null>(null);

  useEffect(getSliders, []);

  function getSliders() {
    ActionGetSlidersFade("fade-slider").then(({ data }) => {
      setItems(data as ISliderItem[]);
    });
  }

  return (
    <>
      {items?.length ? (
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
          {items?.map((item: ISliderItem) => (
            <>
              {item.children?.map((sliderItem) => (
                <SwiperSlide key={`home-slider-ads-${sliderItem.id}`}>
                  <div className="w-full h-full rounded-[20px] overflow-hidden">
                    <Image
                      src={`${filesLink}${sliderItem.children?.find((_child) => _child.lang_key === activeLang)?.image_path}`}
                      alt="ads-for-map.png"
                      width={500}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="w-full md:!w-[32.5%] md:h-[510px] mb-4 md:mb-0 rounded-[20px] overflow-hidden" />
      )}
    </>
  );
}

export default LeftSlider;
