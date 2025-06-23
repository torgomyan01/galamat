"use client";

import MainTemplate from "@/components/common/main-template/main-template";
import React, { useState } from "react";
import ProductItem from "@/components/common/product-item/product-item";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { useTranslate } from "@/hooks/useTranslate";
import "../home/filter-wrapper/filter-wrapper.scss";

interface IThisProps {
  houses: IProjectStage[];
  housesDataAdmin: IProjectData[];
}

function Projects({ houses, housesDataAdmin }: IThisProps) {
  const $t = useTranslate();

  const filteredResult = houses.filter((house) => {
    const adminData = housesDataAdmin.find((i) => house.id === i.project_id);

    if (adminData) {
      if (!adminData.hide) {
        return house;
      }
    } else {
      return house;
    }
  });

  const [countSplits, setCountSplits] = useState<number>(6);

  function SeeMore() {
    setCountSplits(countSplits + 6);
  }

  const result = filteredResult.slice(0, countSplits);

  return (
    <MainTemplate>
      <div className="wrapper !pt-10">
        <div
          className={clsx(
            "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ",
            {
              grid: result.length,
            },
          )}
        >
          {result?.length ? (
            <>
              {result.map((project: IProjectStage) => (
                <ProductItem
                  key={`complex-${project.id}`}
                  project={project}
                  housesDataAdmin={housesDataAdmin}
                />
              ))}
            </>
          ) : (
            <div className="w-full h-[400px] flex-jc-c">
              <h3 className="text-blue text-[18px] sm:text-[24px]">
                {$t("nothing_found_yet")}
              </h3>
            </div>
          )}
        </div>

        {result.length ? (
          <div className="show-wrap">
            <span>
              {$t("shown")}{" "}
              {countSplits >= result.length ? result.length : countSplits}{" "}
              {$t("from")} {result.length}
            </span>
            <Button
              className={clsx("show-btn bg-transparent h-[60px]", {
                "opacity-50 !cursor-default hover:opacity-50":
                  countSplits >= result.length,
              })}
              onPress={SeeMore}
              disabled={countSplits >= result.length}
            >
              {$t("show_more")}
            </Button>
          </div>
        ) : null}
      </div>
    </MainTemplate>
  );
}

export default Projects;
