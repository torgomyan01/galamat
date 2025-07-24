"use client";

import MainTemplate from "@/components/common/main-template/main-template";
import AdsSlider from "@/components/layout/home/ads-slider/ads-slider";
import LeaveRequest from "@/components/common/leave-request/leave-request";
import WhyUs from "@/components/layout/home/why-us/why-us";
import Objects from "@/components/layout/home/objects/objects";
import VideoBlock from "@/components/layout/home/video-block/video-block";
import OurOffice from "@/components/layout/home/our-office/our-office";
import React from "react";
import Filter from "@/components/layout/home/filter/filter";

interface IThisProps {
  projects: IProjectMerged[];
}

export default function Home({ projects }: IThisProps) {
  return (
    <MainTemplate>
      <AdsSlider />

      <div className="wrapper !mb-[-20px]">
        <h3 className="text-[45px] font-bold text-[#353535]">
          Проекты Galamat
        </h3>
      </div>
      <Filter projects={projects} />
      <Objects />
      <LeaveRequest />
      <WhyUs />
      <VideoBlock />
      <OurOffice />
    </MainTemplate>
  );
}
