import "./filter-wrapper.scss";
import HorizontalFilter from "@/components/common/horizontal-filter/horizontal-filter";
import { useEffect, useState } from "react";
import clsx from "clsx";
import OurObjects from "@/components/layout/home/objects/our-objects";
import { GetHouses } from "@/utils/api";
import ProductItem from "@/components/common/product-item/product-item";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/react";

function FilterWrapper() {
  const [content, setContent] = useState<"items" | "map">("items");
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);

  const [houses, setHouses] = useState<IProjectStage[]>([]);
  const [countSplits, setCountSplits] = useState<number>(6);

  useEffect(() => {
    GetHouses({}).then(({ data }) => {
      const _data = data.data.filter(
        (houe: IProjectStage) => houe.type === "RESIDENTIAL",
      );

      setHouses(_data);
    });
  }, []);

  function SeeMore() {
    setCountSplits(countSplits + 6);
  }

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
                {houses.length ? (
                  <>
                    <div className="product-items">
                      {houses
                        .slice(0, countSplits)
                        .map((project: IProjectStage) => (
                          <ProductItem
                            key={`complex-${project.id}`}
                            project={project}
                          />
                        ))}
                    </div>

                    <div className="show-wrap">
                      <span>
                        Показано{" "}
                        {countSplits >= houses.length
                          ? houses.length
                          : countSplits}{" "}
                        из {houses.length}
                      </span>
                      <Button
                        className={clsx("show-btn bg-transparent h-[60px]", {
                          "opacity-50 !cursor-default hover:opacity-50":
                            countSplits >= houses.length,
                        })}
                        onPress={SeeMore}
                        disabled={countSplits >= houses.length}
                      >
                        Показать еще
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-[400px] flex-jc-c">
                    <Spinner color="danger" />
                  </div>
                )}
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
