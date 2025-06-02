"use client";

import React from "react";
import MainTemplate from "@/components/common/main-template/main-template";
import AdsSlider from "@/components/layout/home/ads-slider/ads-slider";
import LeaveRequest from "@/components/common/leave-request/leave-request";
import WhyUs from "@/components/layout/home/why-us/why-us";
import Objects from "@/components/layout/home/objects/objects";
import VideoBlock from "@/components/layout/home/video-block/video-block";
import OurOffice from "@/components/layout/home/our-office/our-office";
import FilterWrapper from "@/components/layout/home/filter-wrapper/filter-wrapper";

export default function Home() {
  return (
    <MainTemplate>
      <AdsSlider />
      <FilterWrapper />
      <LeaveRequest />
      <WhyUs />
      <Objects />
      <VideoBlock />
      <OurOffice />
    </MainTemplate>
  );
}
