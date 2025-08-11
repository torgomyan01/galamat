import "./_gala-banner.scss";
import { Button } from "@heroui/react";

function GalaOneHero() {
  return (
    <div className="gala-banner">
      <div className="wrapper">
        <div
          className="banner-info"
          style={{ backgroundImage: `url(/img/gala-banner-img.png)` }}
        >
          <img src="/img/gala-logo.svg" alt="" className="gala-logo" />
          <h1>Gala One</h1>
          <p>
            Твоя точка на карте лучшего района. Пересечение Ұлы Дала и Туран
          </p>
          <div className="buttons flex-js-c gap-4">
            <Button className="red-btn bg-[#FF002B]">Скачать буклет</Button>
            <Button className="blue-btn">Оставить заявку</Button>
          </div>
          <div className="address">
            <span>
              <img src="/img/addr-icon1.svg" alt="" />
              Срок сдачи: III квартал 2026 года
            </span>
            <span>
              <img src="/img/addr-icon2.svg" alt="" />
              г. Астана, р-н Нура, пересечение ул Казыбек Би и Е75, Е77
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalaOneHero;
