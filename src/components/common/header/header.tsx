"use client";

import "./header.scss";
import Link from "next/link";
import { SITE_URL } from "@/utils/consts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Select, SelectItem } from "@heroui/react";
import Image from "next/image";

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
    const overflowValue = mobileMenu ? "hidden" : "auto";
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
  }, [mobileMenu]);

  return (
    <header className="header">
      <div className="wrapper">
        <div className="top-line">
          <Link href={SITE_URL.HOME} className="logo">
            <Image
              src="/img/logo.svg"
              alt="logo navbar"
              width={162}
              height={20}
            />
          </Link>
          <div className="social-icons">
            <Link href="https://wa.me/+77001085757" target="_blank">
              <Image
                src="/img/wp-icon.svg"
                alt="icon soc sites"
                width={18}
                height={18}
                className="h-auto"
              />
            </Link>
            {/*<Link href="tel: +7 700 108 5757" target="_blank">*/}
            {/*  <Image*/}
            {/*    src="/img/tg-icon.svg"*/}
            {/*    alt="icon soc sites"*/}
            {/*    width={18}*/}
            {/*    height={18}*/}
            {/*    className="h-auto"*/}
            {/*  />*/}
            {/*</Link>*/}
            <Link href="tel: +7 700 108 5757" target="_blank">
              <Image
                src="/img/phone-icon.svg"
                alt="icon soc sites"
                width={18}
                height={18}
                className="h-auto"
              />
            </Link>
          </div>
          <Link href="tel: +7 700 108 5757" className="border-btn order-call">
            Заказать звонок
          </Link>
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
              <Link
                href="tel: +7 700 108 5757"
                className="border-btn order-call"
              >
                Заказать звонок
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom-line">
          <Link href={SITE_URL.HOME} className="logo">
            <Image
              src="/img/logo.svg"
              alt="logo navbar"
              width={162}
              height={20}
            />
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
          {/*<a href="#" className="login">*/}
          {/*  <img src="img/login-icon.svg" alt="" />*/}
          {/*  Войти*/}
          {/*</a>*/}
        </div>
      </div>
    </header>
  );
}

export default Header;
