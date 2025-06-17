import React from "react";
import "@/components/layout/orleu-project/style.scss";
import MainTemplate from "@/components/common/main-template/main-template";
import ContentOrleuProject from "@/components/layout/orleu-project/content-orleu-project";
import ContentOrleuProjectTwo from "@/components/layout/orleu-project/content-orleu-project-two";
import ContentOrleuProjectSlider from "@/components/layout/orleu-project/content-orleu-project-slider";
import ContentOrleuProjectList from "@/components/layout/orleu-project/content-orleu-project-list";
import ContentOrleuProjectMap from "@/components/layout/orleu-project/content-orleu-project-map";
import ContentOrleuProjectHomeMap from "@/components/layout/orleu-project/content-orleu-project-home-map";
import ContentOrleuProjectAllHotelSlider from "@/components/layout/orleu-project/content-orleu-project-all-hotel-slider";
import ContentOrleuProjectAlPanorama from "@/components/layout/orleu-project/content-orleu-project-panarama";
import ContentOrleuEndSection from "@/components/layout/orleu-project/content-orleu-project-end-section";

async function Page() {
  return (
    <MainTemplate footer={false} headerInfo={false}>
      <div className="w-full h-full bg-white pt-5">
        <div className="wrapper">
          <div className="breadcrumbs">
            <a href="#">Главная</a>
            <a href="#">Проекты</a>
            <span>ЖК Orleu</span>
          </div>
        </div>

        <ContentOrleuProject />

        <ContentOrleuProjectTwo />

        <ContentOrleuProjectSlider />

        <ContentOrleuProjectList />

        <ContentOrleuProjectMap />

        <ContentOrleuProjectHomeMap />

        <ContentOrleuProjectAllHotelSlider />

        <ContentOrleuProjectAlPanorama />

        <ContentOrleuEndSection />
      </div>
    </MainTemplate>
  );
}

export default Page;
