import "./footer.scss";
import { SITE_URL } from "@/utils/consts";
import Link from "next/link";
import { useTranslate } from "@/hooks/useTranslate";

function Footer() {
  const $t = useTranslate();

  return (
    <footer className="footer mb-[30px] md:pb-[50px]">
      <div className="wrapper">
        <div className="footer-info">
          <Link href={SITE_URL.HOME} className="footer-logo min-w-[197px]">
            <img src="img/footer-logo.svg" alt="" />
          </Link>

          <div className="flex-je-c gap-5 mt-6 md:mt-0">
            <Link href="#">
              <i className="fa-brands fa-youtube text-[35px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-instagram text-[30px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-tiktok text-[25px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-whatsapp text-[30px] text-blue"></i>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex-jc-c md:flex-js-c gap-4 md:gap-6 mb-6 flex-col md:flex-row">
            <Link href="#" className="private underline text-blue">
              {$t("privacy_policy__")}
            </Link>
            <Link href="#" className="private underline text-blue">
              {$t("about_company")}
            </Link>
          </div>
          <p className="text-[#5B75A4] text-[13px] hidden md:block">
            {$t("all_materials_posted")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
