import "./leave-request.scss";

function LeaveRequest() {
  return (
    <div className="leave-request">
      <div className="wrapper">
        <div className="leave-request-info">
          <div className="info">
            <div className="texts">
              <h2>Оставить заявку</h2>
              <span>Мы строим будущее</span>
            </div>
            <div className="img-wrap">
              <img src="img/leave-request-img.svg" alt="" />
            </div>
          </div>
          <form className="leave-request-form">
            <input type="text" placeholder="Ваше имя" />
            <input type="tel" placeholder="Номер телефона" />
            <button className="blue-btn send-btn">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
