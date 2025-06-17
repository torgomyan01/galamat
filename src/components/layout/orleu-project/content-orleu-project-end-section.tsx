"use client";

import React from "react";

function ContentOrleuEndSection() {
  return (
    <div className="section section4 section-end mt-[100px]">
      <div className="info">
        <img src="img/sect3-bg.png" alt="" className="bg" />
        <img src="img/style.png" alt="" className="style" />
        <div className="leave-request-wrap">
          <img src="img/title-style.svg" alt="" />
          <form>
            <h3>Оставьте заявку</h3>
            <p>
              Укажите номер телефона, чтобы мы могли перезвонить и
              проконсультировать вас.
            </p>
            <input type="text" name="name" placeholder="Ваше имя" />
            <input type="tel" name="phone" placeholder="Номер телефона" />
            <button className="send">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContentOrleuEndSection;
