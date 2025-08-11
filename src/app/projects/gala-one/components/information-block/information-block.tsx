import "./_information-block.scss";

function InformationBlock() {
  return (
    <div
      className="information-block"
      style={{ backgroundImage: "url(/img/information-bg.png)" }}
    >
      <div className="wrapper">
        <div className="info">
          <div className="info-item">
            <div className="top">
              <div className="icon">
                <img src="/img/plus-white.svg" alt="" />
              </div>
              <span>Комфортный двор</span>
            </div>
            <ul>
              <li>
                <span className="circle"></span>
                <span className="text">Закрытый двор</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Зоны отдыха</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Детские площадки</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Спортивные зоны</span>
              </li>
            </ul>
          </div>
          <div className="info-item">
            <div className="top">
              <div className="icon">
                <img src="/img/plus-white.svg" alt="" />
              </div>
              <span>Современные решения</span>
            </div>
            <ul>
              <li>
                <span className="circle"></span>
                <span className="text">Face ID</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Smart замки</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Видеонаблюдение</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Стильные холлы</span>
              </li>
            </ul>
          </div>
          <div className="info-item">
            <div className="top">
              <div className="icon">
                <img src="/img/plus-white.svg" alt="" />
              </div>
              <span>Простор и надёжность</span>
            </div>
            <ul>
              <li>
                <span className="circle"></span>
                <span className="text">Кирпичный фасад</span>
              </li>
              <li>
                <span className="circle"></span>
                <span className="text">Потолки 3 метра</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationBlock;
