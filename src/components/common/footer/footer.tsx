import "./footer.scss";
import { SITE_URL } from "@/utils/consts";
import Link from "next/link";
import { useTranslate } from "@/hooks/useTranslate";

function Footer() {
  const $t = useTranslate();

  return (
    <footer className="footer mb-[100px] md:pb-[50px]">
      <div className="wrapper">
        <div className="footer-info">
          <Link href={SITE_URL.HOME} className="footer-logo min-w-[197px]">
            <img
              src="img/footer-logo.svg"
              alt="footer logo Galamat"
              className="w-[87px] md:w-[197px]"
            />
          </Link>

          <div className="flex-je-c gap-4 sm:gap-5">
            <Link href="#">
              <i className="fa-brands fa-youtube text-[20px] md:text-[35px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-instagram text-[20px] md:text-[30px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-tiktok text-[20px] md:text-[25px] text-blue"></i>
            </Link>
            <Link href="#">
              <i className="fa-brands fa-whatsapp text-[20px] md:text-[30px] text-blue"></i>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex-js-c gap-3">
            <Link
              href="#"
              className="private underline text-blue text-[12px] md:text-[16px]"
            >
              {$t("privacy_policy__")}
            </Link>
            <Link
              href={SITE_URL.OUR_COMPANY}
              className="private underline text-blue text-[12px] md:text-[16px]"
            >
              {$t("about_company")}
            </Link>
          </div>
          <p className="text-[#5B75A4] text-[10px] sm:text-[13px] mt-2 sm:mt-4">
            {$t("all_materials_posted")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
