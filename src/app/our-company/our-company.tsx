"use client";
import { formatKzt, mergeComplexesWithProjects } from "@/utils/helpers";

import MainTemplate from "@/components/common/main-template/main-template";
import React from "react";
import "./_why-us.scss";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { setChangeParams } from "@/redux/filter";
import { useDispatch, useSelector } from "react-redux";
import { SITE_URL } from "@/utils/consts";
import Link from "next/link";
import HistorySection from "@/components/common/history-section/history-section";

const sliderHero = [
  {
    title: "Нас выбирают",
    text: "Компания заслуженно входит в число ведущих девелоперов столицы.",
  },
  {
    title: "50 доступных объектов",
    text: "Уже построенных и сданных домов. Всё готово к заселению",
  },
  {
    title: "7 лет надежности",
    text: "Уже 7 лет мы строим не просто дома, а доверие.",
  },
  {
    title: "Нас выбирают",
    text: "Компания заслуженно входит в число ведущих девелоперов столицы.",
  },
  {
    title: "8500 семей выбрали нас",
    text: "Наши дома стали тёплым и надёжным местом.",
  },
];

interface IThisProps {
  houses: IProjectStage[];
  housesDataAdmin: IProjectData[];
}

function OurCompany({ houses, housesDataAdmin }: IThisProps) {
  const dispatch = useDispatch();

  const mergeProjectProfitDb: IProjectMerged[] = mergeComplexesWithProjects(
    houses,
    housesDataAdmin,
  ).filter((project) => !project.hide);

  const filterParams = useSelector(
    (state: IFilterParamsState) => state.filterParams.params,
  );

  function ChangeParams(key: string, value: string | number) {
    const _filterParams: any = { ...filterParams };

    _filterParams[key] = value;

    dispatch(setChangeParams(_filterParams));
  }

  return (
    <MainTemplate>
      <div className="why-us-wrap">
        <div className="wrapper">
          <div className="why-us-info">
            <h2>Почему мы?</h2>
            <p>
              Galamat обладает 20-летним опытом успешной деятельности в сфере
              строительства на территории Республики Казахстан. Компания
              заслуженно входит в число ведущих девелоперов столицы и ежегодно
              демонстрирует устойчивый рост, реализуя проекты, направленные на
              повышение качества жизни граждан.
            </p>
            <Link href={SITE_URL.PROJECT} className="red-btn">
              Купить квартиру
            </Link>

            <div className="w-[calc(100%-20px)] lg:w-full">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={4}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="why-us-swiper"
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                  },
                }}
              >
                {sliderHero.map((item, i) => (
                  <SwiperSlide key={`home-ads-${i}`} className="!h-[170px]">
                    <b className="block text-blue text-[28px]">{item.title}</b>
                    <span>{item.text}</span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="benefits-buying !mt-[60px]">
        <div className="wrapper">
          <h2>Приемущества покупки квартир в у нас</h2>
          <div className="benefits-items">
            <a href="#" className="benefits-item item1">
              <span className="text">
                Квартиры <br />с повышенной комфортностью
              </span>
              <img src="/img/benefits-img.svg" alt="" />
            </a>
            <a href="#" className="benefits-item item2">
              <span className="text">
                Доступные <br />
                цены
              </span>
              <img src="/img/benefits-img.svg" alt="" />
            </a>
            <a href="#" className="benefits-item item3">
              <span className="text">Квартира с техникой и шкафами</span>
              <img src="/img/benefits-img.svg" alt="" />
            </a>
            <a href="#" className="benefits-item item4">
              <span className="text">Всегда сдаем вовремя</span>
              <img src="/img/benefits-img.svg" alt="" />
            </a>
            <a href="#" className="benefits-item item5">
              <span className="text">
                Профессиональная управляющая компания
              </span>
              <img src="/img/benefits-img.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="completed-projects !mt-[60px]">
        <div className="wrapper">
          <h2>Реалезованные проекты</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="completed-projects-swiper w-full"
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
          >
            {mergeProjectProfitDb.map((item, i) => (
              <SwiperSlide key={`home-ads-${i}`}>
                <Link
                  href={SITE_URL.REAL_ESTATE}
                  className="completed-projects-item cursor-pointer"
                  onClick={() => ChangeParams("projectId", item.project_id)}
                >
                  <span
                    className="img-wrap"
                    style={{
                      backgroundImage: `url(${item.images[0]?.url || ""})`,
                    }}
                  />
                  <b className="name">ЖК {item.title}</b>
                  <span className="address">{item.address}</span>
                  <span className="date">от {formatKzt(item.min_price)}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <HistorySection />
    </MainTemplate>
  );
}

export default OurCompany;
