"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ContentOrleuProjectSlider() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 500px", "end start"],
  });

  const moveX = useTransform(scrollYProgress, [0.3, 1], ["0", "-200%"]);
  const moveY = useTransform(scrollYProgress, [0.1, 0.2], ["50%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.001, 0.2], ["0", "1"]);

  const opacityForClose = useTransform(scrollYProgress, [0.8, 0.9], ["1", "0"]);

  return (
    <div
      ref={containerRef}
      className="h-[4000px] relative !z-[10000] pointer-events-none"
    >
      <motion.div
        style={{ opacity, y: moveY }}
        className="section section-halls fixed top-[50px]"
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
              <img
                src="img/halls-img1.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
              <img
                src="img/halls-img2.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
              <img
                src="img/halls-img3.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
              <img
                src="img/halls-img4.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
              <img
                src="img/halls-img5.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
              <img
                src="img/halls-img6.png"
                alt="Image 1"
                className="rounded-[20px] h-[350px] object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
        <motion.div style={{ opacity: opacityForClose }} className="info">
          <div className="texts">
            <h2>Авторский дизайн холлов</h2>
            <p>
              Интерьеры холлов Orleu разработаны по индивидуальному
              дизайн-проекту, сочетающему удобство, эстетику и функциональность.
              Особое внимание уделено освещению, спокойной цветовой палитре и
              уютной атмосфере, чтобы создать ощущение домашнего комфорта.
            </p>
          </div>
          <div className="tags">
            <span className="tag">Бесшумные лифты</span>
            <span className="tag">Smart замки</span>
            <span className="tag">Face ID</span>
            <span className="tag">Колясочные зоны</span>
            <span className="tag">Зоны ожидания</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContentOrleuProjectSlider;
