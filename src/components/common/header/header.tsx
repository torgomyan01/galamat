"use client";

import "./header.scss";
import Link from "next/link";
import { SITE_URL } from "@/utils/consts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Select, SelectItem } from "@heroui/react";

const menuItems = [
  {
    name: "Недвижимость",
    url: SITE_URL.HOME,
  },
  {
    name: "Заявка",
    url: SITE_URL.REQUESTS,
  },
  {
    name: "О компании",
    url: SITE_URL.OUR_COMPANY,
  },
  {
    name: "Акции",
    url: SITE_URL.SALES,
  },
  {
    name: "Способы покупки",
    url: SITE_URL.METHODS_PURCHASE,
  },
];

function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add("overflow");
    } else {
      document.body.classList.remove("overflow");
    }
  }, [mobileMenu]);

  return (
    <header className="header">
      <div className="wrapper">
        <div className="top-line">
          <Link href={SITE_URL.HOME} className="logo">
            <img src="img/logo.svg" alt="" />
          </Link>
          <div className="social-icons">
            <Link href="#">
              <img src="img/wp-icon.svg" alt="" />
            </Link>
            <Link href="#">
              <img src="img/tg-icon.svg" alt="" />
            </Link>
            <Link href="#">
              <img src="img/phone-icon.svg" alt="" />
            </Link>
          </div>
          <a href="#" className="border-btn order-call">
            Заказать звонок
          </a>
          <Select
            selectedKeys={["RU"]}
            className="w-[80px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] hidden md:inline-block"
            variant="bordered"
          >
            <SelectItem key="RU">RU</SelectItem>
            <SelectItem key="KZ">KZ</SelectItem>
          </Select>
          <div
            className={clsx("drop-menu", { "is-active": mobileMenu })}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <div
            className={clsx("menu-wrap", {
              open: mobileMenu,
            })}
          >
            <ul className="main-menu">
              {menuItems.map((menuItem, i) => (
                <li key={`desktop-menu-${i}`}>
                  <Link href={menuItem.url}>{menuItem.name}</Link>
                </li>
              ))}
            </ul>
            <div className="btns">
              <Select
                selectedKeys={["RU"]}
                className="w-[80px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] bg-white"
                variant="bordered"
              >
                <SelectItem key="RU">RU</SelectItem>
                <SelectItem key="KZ">KZ</SelectItem>
              </Select>
              <a href="#" className="border-btn order-call">
                Заказать звонок
              </a>
            </div>
          </div>
        </div>
        <div className="bottom-line">
          <Link href={SITE_URL.HOME} className="logo">
            <img src="img/logo.svg" alt="" />
          </Link>
          <ul className="main-menu">
            {menuItems.map((menuItem, i) => (
              <li
                key={`desktop-menu-${i}`}
                className={clsx({
                  active: menuItem.url === pathname,
                })}
              >
                <Link href={menuItem.url}>{menuItem.name}</Link>
              </li>
            ))}
          </ul>
          <a href="#" className="login">
            <img src="img/login-icon.svg" alt="" />
            Войти
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
