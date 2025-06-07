import "./why-us.scss";
import { Fade } from "react-awesome-reveal";
import clsx from "clsx";

const dataWhyUs = [
  {
    title: "Нас выбирают",
    text: "Компания заслуженно входит в число ведущих девелоперов столицы.",
  },
  {
    title: "50 доступных объектов",
    text: "Уже построенных и сданных домов. Всё готово к заселению",
  },
  {
    title: "7 лет надежности",
    text: "Уже 7 лет мы строим не просто дома, а доверие.",
  },
  {
    title: "8500 семей выбрали нас",
    text: "Наши дома стали тёплым и надёжным местом.",
  },
];

function WhyUs() {
  return (
    <div className="why-us md:!mt-[80px]">
      <div className="wrapper">
        <h2 className="main-title">Почему мы?</h2>
        <div className="info">
          <div className="info-items">
            <Fade cascade direction="up" damping={0.4} triggerOnce>
              {dataWhyUs.map((item, index) => (
                <div
                  key={`why-${index}`}
                  className={clsx("info-item", {
                    active: index === 0,
                  })}
                >
                  <h2>{item.title}</h2>
                  <h3>{item.text}</h3>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
