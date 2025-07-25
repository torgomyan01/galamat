import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

function HowPlaying() {
  const $t = useTranslate();
  const sectionRef = useRef(null);
  const slideRef: any = useRef(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const [activeItem, setActiveItem] = useState<number>(0);

  const items = [
    {
      year: "",
      title: $t("try_your_luck"),
      text: $t("play_gala_fortuna"),
    },
    {
      year: "",
      title: $t("get_bonuses"),
      text: $t("get_bonuses_win_and"),
    },
    {
      year: "",
      title: $t("buy_an_apartment_at_a_discount"),
      text: $t("take_part_and_get_bonuses_for"),
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "history-trigger",
        trigger: sectionRef.current,
        start: "top top-=-20",
        end: "top top-=2500",
        pin: true,
        scrub: true,
        onUpdate(e) {
          const percent = e.progress * 100;

          if (slideRef.current) {
            slideRef.current.style.transform = `translateY(-${percent}%)`;
          }

          const countItems = 100 / items.length;
          const getItem = Math.floor(percent / countItems); // ✅ now starts at 0
          const findActiveItemBlock = getItem + 1;
          setActiveItem(findActiveItemBlock);

          const getActiveLine = progressRefs.current[getItem];
          const res = Math.abs(percent - getItem * countItems);
          const getItemPercent = Math.abs((res / countItems) * 100);

          if (getActiveLine) {
            getActiveLine.style.height = `${getItemPercent}%`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="wrapper !pt-[20px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 ">
          <div className="w-full hidden lg:block">
            <div className="w-full h-[605px] bg-blue p-6 rounded-[16px] relative">
              <h4 className="text-[30px] text-white w-full max-w-[289px] font-medium leading-normal">
                {$t("how_to_get_bonuses")}
              </h4>
              <img
                src="/img/image-bg-def.svg"
                alt="image-bg-def.svg"
                className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          </div>

          <div className="w-full h-[605px] overflow-hidden pt-10 relative">
            <div ref={slideRef} className="w-full duration-100">
              {items.map((item, i) => (
                <div
                  key={`vert-slider-${i}`}
                  className="w-full flex-js-s h-[300px] items-stretch gap-4 lg:gap-10 mb-10"
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

export default HowPlaying;
