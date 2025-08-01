import "./footer.scss";
import { SITE_URL } from "@/utils/consts";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <ul className="footer-menu">
          <li>
            <Link href={SITE_URL.CONTACT}>Контакты</Link>
          </li>
          <li>
            <Link href={SITE_URL.FAQ}>FAQ</Link>
          </li>
          <li>
            <Link href={SITE_URL.OUR_COMPANY}>О нас</Link>
          </li>
          <li>
            <Link href={`${SITE_URL.HOME}#leave-request`}>Оставить заявку</Link>
          </li>
          <li>
            <Link href={SITE_URL.USER_AGREEMENT}>
              Пользовательское соглашение
            </Link>
          </li>
          <li>
            <Link href={SITE_URL.SALES_OFFICE}>Офис продаж</Link>
          </li>
        </ul>
        <div className="footer-info">
          <Link href={SITE_URL.HOME} className="footer-logo min-w-[197px]">
            <img src="img/footer-logo.svg" alt="" />
          </Link>
          <p>
            Все материалы, размещённые на данном сайте, являются
            интеллектуальной собственностью компании Galamat © 2018–2025.
            Пользователь предупреждён, что без письменного согласия
            правообладателя запрещено копировать, распространять, использовать
            или иным образом распоряжаться указанными материалами. В случае
            нарушения этих условий, Galamat оставляет за собой право на
            применение мер, предусмотренных законодательством Республики
            Казахстан, включая взыскание штрафов и обращение в соответствующие
            государственные органы для защиты своих прав. Информация,
            размещённая на сайте, предназначена исключительно для ознакомления и
            не является публичной офертой.
          </p>
          <a href="#" className="private">
            Политика Конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
