import "./filter-wrapper.scss";
import HorizontalFilter from "@/components/common/horizontal-filter/horizontal-filter";
import { useState } from "react";
import clsx from "clsx";
import OurObjects from "@/components/layout/home/objects/our-objects";
import { RandomKey } from "@/utils/helpers";
import Image from "next/image";

function FilterWrapper() {
  const [content, setContent] = useState<"items" | "map">("items");
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);

  return (
    <div className="filter-wrapper">
      <div className="wrapper">
        <div className="title-wrap">
          <h2 className="main-title">Проекты Galamat</h2>
          <div className="w-[200px] border rounded-[6px] flex-jsb-c h-10 overflow-hidden">
            <button
              className={clsx("w-[100%] h-full rounded-[6px] bg-transparent", {
                "!bg-[#132C5E] text-white": content === "items",
              })}
              onClick={() => setContent("items")}
            >
              Плитка
            </button>
            <button
              className={clsx("w-[100%] h-full rounded-[6px] bg-transparent", {
                "!bg-[#132C5E] text-white": content === "map",
              })}
              onClick={() => setContent("map")}
            >
              На карте
            </button>
          </div>
          <div
            className="filter-btn h-10 px-4 !flex-jc-c md:!hidden"
            onClick={() => setMobileFilter(!mobileFilter)}
          >
            <i className="fa-regular fa-bars-filter mr-1"></i>
            Фильтр
          </div>
        </div>

        <HorizontalFilter className={mobileFilter ? "open" : ""} />

        {content === "items" && (
          <div className="tabs2">
            <div className="tab-content2 active" id="tab4">
              <div className="product-items-wrap">
                <div className="product-items">
                  {Array.from({ length: 6 }).map(() => (
                    <div key={RandomKey()} className="product-item">
                      <div className="texts-wrap">
                        <a href="#" className="name">
                          Название Жк
                        </a>
                        <span className="text">от 30.5 млн</span>
                        <span className="grey">г. Астана, Толеби 00</span>
                        <div className="hide-info">
                          <p>
                            107 квартиры <span>в продаже</span>
                          </p>
                          <div className="links">
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">4</a>
                          </div>
                          <span className="date">
                            Ближайшая сдача 25.05.2025
                          </span>
                        </div>
                      </div>
                      <a href="#" className="img-wrap">
                        <span className="style red">Бизнес+</span>
                        <Image
                          src="/img/product-img.webp"
                          alt="Название Жк"
                          width={700}
                          height={500}
                        />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="show-wrap">
                  <span>Показано 6 из 50 </span>
                  <div className="show-btn">Показать еще</div>
                </div>
              </div>
            </div>
            <div className="tab-content2" id="tab5">
              <div className="map">
                <img src="img/map-img.png" alt="" />
              </div>
            </div>
          </div>
        )}
        {content === "map" && (
          <div className="w-full overflow-hidden rounded-[12px]">
            <OurObjects height={800} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterWrapper;
