"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/footer";
import ChatWidget from "@/components/common/chat-widget/chat-widget";

interface IThisProps {
  children?: React.ReactNode;
  pageOff?: boolean;
}

function MainTemplate({ children, pageOff = false }: IThisProps) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Header />
      {pageOff ? (
        <div className="w-full h-[calc(100dvh-165px)] bg-[#132C5E] flex-jc-c flex-col gap-4">
          <img src="img/no-page.svg" alt="" />
          <h1 className="text-center w-full max-w-[560px] text-[44px] text-white font-bold tracking-[-1.346px] leading-[46.119px]">
            Здесь скоро появится что-то классное
          </h1>
          <h1 className="text-[27px] text-[#ADBAD1]">
            Мы уже варим идеи и монтируем смысл
          </h1>
        </div>
      ) : (
        <>
          {children}
          <Footer />
        </>
      )}
      <ChatWidget />
    </HeroUIProvider>
  );
}

export default MainTemplate;
