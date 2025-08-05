import "./footer.scss";
import { SITE_URL } from "@/utils/consts";
import Link from "next/link";
import { useTranslate } from "@/hooks/useTranslate";

function Footer() {
  const $t = useTranslate();

  return (
    <footer className="footer">
      <div className="wrapper">
        <ul className="footer-menu">
          <li>
            <Link href={SITE_URL.CONTACT}>{$t("contacts__")}</Link>
          </li>
          <li>
            <Link href={SITE_URL.OUR_COMPANY}>{$t("about_company")}</Link>
          </li>
          <li>
            <Link href={`${SITE_URL.HOME}#leave-request`}>
              {$t("leave_a_request")}
            </Link>
          </li>
          <li>
            <Link href={SITE_URL.USER_AGREEMENT}>{$t("user_agreement")}</Link>
          </li>
        </ul>
        <div className="footer-info">
          <Link href={SITE_URL.HOME} className="footer-logo min-w-[197px]">
            <img src="img/footer-logo.svg" alt="" />
          </Link>
          <p>{$t("all_materials_posted")}</p>
          <a href="#" className="private">
            {$t("privacy_policy__")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
