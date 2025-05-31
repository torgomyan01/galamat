import "./why-us.scss";

function WhyUs() {
  return (
    <div className="why-us">
      <div className="wrapper">
        <h2 className="main-title">Почему мы?</h2>
        <div className="info">
          <div className="info-sect">
            <h4>Нас выбирают</h4>
            <p>
              Компания заслуженно входит в число ведущих девелоперов столицы и
              ежегодно демонстрирует устойчивый рост, реализуя проекты,
              направленные на повышение качества жизни граждан.
            </p>
            <a href="#" className="more">
              подробней
            </a>
          </div>
          <div className="info-items">
            <div className="info-item">
              <h3>50</h3>
              <b>объектов</b>
              <span>Объектов введено в эксплуатацию</span>
            </div>
            <div className="info-item">
              <h3>7</h3>
              <b>лет</b>
              <span>Успешного опыта в столице</span>
            </div>
            <div className="info-item">
              <h3>50</h3>
              <b>объектов</b>
              <span>Введено в эксплуатацию</span>
            </div>
            <div className="info-item">
              <h3>8500</h3>
              <b>семей</b>
              <span>Счастливо живет в наших ЖК</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
