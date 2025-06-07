"use client";

import MainTemplate from "@/components/common/main-template/main-template";
import AdsSlider from "@/components/layout/home/ads-slider/ads-slider";
import FilterWrapper from "@/components/layout/home/filter-wrapper/filter-wrapper";
import LeaveRequest from "@/components/common/leave-request/leave-request";
import WhyUs from "@/components/layout/home/why-us/why-us";
import Objects from "@/components/layout/home/objects/objects";
import VideoBlock from "@/components/layout/home/video-block/video-block";
import OurOffice from "@/components/layout/home/our-office/our-office";
import React from "react";

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
