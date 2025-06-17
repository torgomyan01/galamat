"use client";

import React, { useState } from "react";
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
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import SendRequest from "@/components/layout/orleu-project/send-request";
import OreluMobileHeader from "@/components/layout/orleu-project/orelu-mobile-header";

function OrleuProject() {
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="hidden lg:block">
          <ContentOrleuProject sendRequest={() => setIsOpen(true)} />

          <ContentOrleuProjectTwo />
        </div>

        <div className="block lg:hidden">
          <OreluMobileHeader />
        </div>

        <ContentOrleuProjectSlider />

        <ContentOrleuProjectList />

        <ContentOrleuProjectMap />

        <ContentOrleuProjectHomeMap sendRequest={() => setIsOpen(true)} />

        <ContentOrleuProjectAllHotelSlider />

        <ContentOrleuProjectAlPanorama />

        <ContentOrleuEndSection />
      </div>

      <Modal size="2xl" isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
        <ModalContent className="bg-[#1A3B7E]">
          <ModalBody>
            <SendRequest className="!px-4 pb-6 !pt-0 mt-6" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </MainTemplate>
  );
}

export default OrleuProject;
