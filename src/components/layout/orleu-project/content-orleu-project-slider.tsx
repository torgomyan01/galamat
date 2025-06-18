"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const images = [
  "/img/halls-img1.png",
  "/img/halls-img2.png",
  "/img/halls-img3.png",
  "/img/halls-img4.png",
  "/img/halls-img5.png",
  "/img/halls-img6.png",
];

function ContentOrleuProjectSlider() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 500px", "end start"],
  });

  const [checkWindow, setCheckWindow] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isMobile = window.innerWidth < 1024;

    setCheckWindow(isMobile);
  }, []);

  const moveX = useTransform(scrollYProgress, [0.3, 1], ["0", "-200%"]);
  const moveY = checkWindow
    ? undefined
    : useTransform(scrollYProgress, [0.1, 0.2], ["50%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.001, 0.2], ["0", "1"]);

  const opacityForClose = useTransform(scrollYProgress, [0.8, 0.9], ["1", "0"]);

  return (
    <div
      ref={containerRef}
      className="h-[4000px] relative !z-[10000] pointer-events-none"
    >
      <motion.div
        style={{ opacity, y: moveY }}
        className="section section-halls fixed top-[-20px] lg:top-[50px] "
      >
        <motion.div
          style={{ opacity: opacityForClose }}
          className="design-halls-wrap"
        >
          <div className="w-full">
            <motion.div
              style={{ x: moveX }}
              className="design-halls flex-js-c gap-6 pr-[50px] pointer-events-none"
            >
              {images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt="Image 1"
                  width={500}
                  height={500}
                  className="rounded-[20px] h-[180] lg:h-[350px] object-cover"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: opacityForClose }}
          className="info !mt-[10px] lg:!mt-[30px]"
        >
          <div className="texts">
            <h2 className="!mb-2 lg:!mb-6 !text-[23px] lg:!text-[26px]">
              Авторский дизайн холлов
            </h2>
            <p className="!text-[15px] md:!text-[16px]">
              Интерьеры холлов Orleu разработаны по индивидуальному
              дизайн-проекту, сочетающему удобство, эстетику и функциональность.
              Особое внимание уделено освещению, спокойной цветовой палитре и
              уютной атмосфере, чтобы создать ощущение домашнего комфорта.
            </p>
          </div>
          <div className="tags">
            <span className="tag !text-[15px] md:!text-[16px]">
              Бесшумные лифты
            </span>
            <span className="tag !text-[15px] md:!text-[16px]">
              Smart замки
            </span>
            <span className="tag !text-[15px] md:!text-[16px]">Face ID</span>
            <span className="tag !text-[15px] md:!text-[16px]">
              Колясочные зоны
            </span>
            <span className="tag !text-[15px] md:!text-[16px]">
              Зоны ожидания
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContentOrleuProjectSlider;
