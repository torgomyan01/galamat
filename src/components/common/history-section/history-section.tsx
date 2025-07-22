"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    year: 2018,
    title: "Начало истории",
    text: "Компания сделала стратегический шаг — основалась в Астане и уверенно заявила о себе на рынке столицы, открыв новую главу в своем развитии.",
  },
  {
    year: 2018,
    title: "Первый проект",
    text: "В этом году компания реализовала свой первый проект — жилой комплекс комфорт-класса Barys City. Концепция комплекса была тесно связана с его локацией: Barys City расположен в спортивном сердце Астаны, рядом со стадионами «Астана Арена», «Барыс Арена», «Сарыарка» и ледовым дворцом «Алау».",
  },
  {
    year: 2019,
    title: "",
    text: "Жилой комплекс Seven House введен в эксплуатацию в 2019 году. Проект бизнес-класса, расположенный в непосредственной близости к деловому центру Астаны. Комплекс состоит из 9 этажей и включает всего 192 квартиры, что подчеркивает его уютный формат и приватность.",
  },
  {
    year: 2020,
    title: "",
    text: "Введены в эксплуатацию два жилых комплекса — Galamat Towers и Galamat Park. Проекты реализованы в единой европейской концепции с продуманной внутренней инфраструктурой. 20- и 9-этажные дома стали флагманом компании Galamat, объединив в себе современные технологии и комфорт",
  },
  {
    year: 2021,
    title: "",
    text: "В 2021 году введён в эксплуатацию жилой комплекс комфорт-класса Tole Bi — уникальный проект с просторными квартирами и тщательно благоустроенной территорией. Он сочетает в себе современные строительные технологии, выразительную архитектуру и выгодное расположение — рядом с ключевыми магистралями и знаковыми объектами левобережья столицы.",
  },
  {
    year: 2022,
    title: "",
    text: "Компания продолжила активное развитие, реализовав сразу три проекта: Prime Garden 1, Prime Garden 2 и Homeland. Эти жилые комплексы стали новым этапом — с ещё более высоким уровнем качества, комфорта и архитектурных решений, основанных на опыте и достижениях предыдущих лет.",
  },
  {
    year: 2023,
    title: "",
    text: "Год запомнился сразу двумя важными событиями: вводом в эксплуатацию жилого комплекса Sunland и проведением масштабного розыгрыша квартиры среди подписчиков Galamat в социальных сетях, который стал ярким примером открытости и лояльности компании к своей аудитории.",
  },
  {
    year: 2024,
    title: "",
    text: "Введён в эксплуатацию жилой комплекс Tengri, расположенный напротив самой большой мечети Центральной Азии. Проект стал знаковым для компании благодаря своему уникальному расположению. ",
  },
  {
    year: 2025,
    title: "",
    text: "Компания продолжила укреплять свои позиции на рынке: был открыт офис сервисной компании для повышения качества обслуживания клиентов, начал работу новый офис отдела продаж.",
  },
];

function HistorySection() {
  const sectionRef = useRef(null);
  const slideRef: any = useRef(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const [activeItem, setActiveItem] = useState<number>(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top-=-20",
        end: "top top-=4500",
        pin: true,
        onUpdate(e) {
          const percent = e.progress * 100;

          if (slideRef.current && percent < 90) {
            slideRef.current.style.transform = `translateY(-${percent}%)`;
          }

          const countItems = items.length;
          const pixelRange = 4500;
          const pixelPerItem = pixelRange / countItems;

          const scrollY = e.scroll();
          const triggerStart =
            ScrollTrigger.getById("history-trigger")?.start ?? 0;
          const pixelProgress = scrollY - triggerStart;

          const currentIndex = Math.ceil(pixelProgress / pixelPerItem);

          setActiveItem(currentIndex + 1);

          items.forEach((_, i) => {
            const bar = progressRefs.current[i];
            if (!bar) {
              return;
            }

            // Նվազեցնում ենք itemStart-ը, կրճատում ենք itemEnd-ը
            const earlyStartOffset = pixelPerItem * 0.25;
            const fasterEndOffset = pixelPerItem * 0.15;

            const itemStart = pixelPerItem * i - earlyStartOffset;
            const itemEnd = pixelPerItem * (i + 1) - fasterEndOffset;

            if (pixelProgress >= itemEnd) {
              bar.style.height = "100%";
            } else if (pixelProgress >= itemStart && pixelProgress < itemEnd) {
              const localProgress = pixelProgress - itemStart;
              const rawPercent = (localProgress / (itemEnd - itemStart)) * 100;
              const accelerated = rawPercent * 1.35;
              const finalHeight = Math.min(accelerated, 100);

              bar.style.height = `${finalHeight.toFixed(2)}%`;
            } else {
              bar.style.height = "0%";
            }
          });
        },
        id: "history-trigger",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="wrapper !pt-[20px]">
        <h3 className="text-[30px] md:text-[45px] font-medium text-[#353535] mb-3">
          История
        </h3>
        <p className="text-[#626262] text-[16px] md:text-[20px] w-full max-w-[981px]">
          В 2018 году компания сделала стратегический шаг, выйдя на рынок
          столицы Казахстана — Астаны, открыв новую страницу в своем развитии.
        </p>

        <div className="w-full lg:grid grid-cols-2 gap-12 mt-10 ">
          <div className="w-full hidden lg:block">
            <div className="w-full h-[60vh] bg-blue p-6 rounded-[16px] relative">
              <h4 className="text-[30px] text-white w-full max-w-[289px] font-medium leading-normal">
                Углубитесь в нашу историю
              </h4>
              <img
                src="/img/image-bg-def.svg"
                alt="image-bg-def.svg"
                className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </div>

          <div className="w-full h-[60vh] overflow-hidden relative">
            <div ref={slideRef} className="w-full duration-100">
              {items.map((item, i) => (
                <div
                  key={`vert-slider-${i}`}
                  className="w-full flex-js-s items-stretch gap-4 lg:gap-10 mb-10"
                >
                  <div className="w-[100px] lg:w-[179px] lg:min-w-[179px] flex-grow flex-jc-c flex-col">
                    <div
                      className={clsx(
                        "w-[50px] h-[50px] md:w-[66px] md:h-[66px] flex-jc-c rounded-[12px] text-white text-[20px] md:text-[29.7px] mb-[29px] bg-[#A1ABBF] transition progress-circle",
                        {
                          "!bg-[#CE2432]": activeItem >= i + 1 || i === 0,
                        },
                      )}
                    >
                      {i + 1}
                    </div>
                    <div className="w-[5px] min-w-[5px] bg-[#A1ABBF] flex-grow rounded-[5px] relative overflow-hidden">
                      <div
                        className="w-full bg-[#CE2432] rounded-[5px] h-0 transition"
                        ref={(el) => {
                          if (el) {
                            progressRefs.current[i] = el;
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-[30px] md:text-[45px] font-medium text-[#353535] md:mt-[-10px]">
                      {item.year}
                    </h3>
                    <h4 className="text-[16px] md:text-[20px] text-[#353535] font-medium">
                      {item.title}
                    </h4>
                    <p className="text-[16px] md:text-[20px] text-[#626262]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bottom-gradient"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HistorySection;
