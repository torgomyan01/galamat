"use client";

import "./header.scss";
import Link from "next/link";
import { localStorageKeys, SITE_URL } from "@/utils/consts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import Image from "next/image";
import { GetLanguage } from "@/app/actions/admin/language/get-languages";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "@/redux/translate";
import { useTranslate } from "@/hooks/useTranslate";

interface IThisProps {
  info: boolean;
}

function Header({ info = true }: IThisProps) {
  const dispatch = useDispatch();
  const $t = useTranslate();

  const activeLang = useSelector(
    (state: IStateTranslate) => state.translateSite.selectedLang,
  );

  const menuItems = [
    {
      name: $t("real_estate"),
      url: SITE_URL.REAL_ESTATE,
    },
    {
      name: $t("projects"),
      url: SITE_URL.PROJECTS,
    },
    {
      name: $t("bid"),
      url: `${SITE_URL.HOME}#leave-request`,
    },
    {
      name: $t("about_company"),
      url: SITE_URL.OUR_COMPANY,
    },
    {
      name: $t("stock"),
      url: SITE_URL.SALES,
    },
    {
      name: $t("methods_purchase"),
      url: SITE_URL.METHODS_PURCHASE,
    },
    {
      name: $t("calculator"),
      url: SITE_URL.CALCULATOR,
    },
  ];

  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  useEffect(() => {
    GetLanguage("parents").then((res) => {
      setLanguages(res.data);
    });
  }, []);

  useEffect(() => {
    const overflowValue = mobileMenu ? "hidden" : "auto";
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
  }, [mobileMenu]);

  function selectLanguage(keys: SharedSelection) {
    const getKey = keys.currentKey;

    if (getKey) {
      localStorage.setItem(localStorageKeys.languages, getKey);

      dispatch(setLang(getKey));
    }
  }

  return (
    <header className="header">
      <div className="wrapper">
        {info ? (
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
            <Link
              href="tel: +7 700 108 5757"
              className="border-btn order-call !h-[40px]"
            >
              {$t("request_call")}
            </Link>
            <Select
              selectedKeys={[`${activeLang}`]}
              className="w-[80px] rounded-[8px] outline outline-[1px] outline-[#b2b2b2] hidden md:inline-block"
              variant="bordered"
              onSelectionChange={selectLanguage}
            >
              {languages.map((lang) => (
                <SelectItem key={lang.key}>{lang.name}</SelectItem>
              ))}
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
              <div className="btns !flex-js-c gap-4">
                <Select
                  selectedKeys={[`${activeLang}`]}
                  className="w-[80px] rounded-[4px] outline-[#b2b2b2]"
                  radius="sm"
                  onSelectionChange={selectLanguage}
                >
                  {languages.map((lang) => (
                    <SelectItem key={lang.key}>{lang.name}</SelectItem>
                  ))}
                </Select>
                <Link
                  href="tel: +7 700 108 5757"
                  className="border-btn order-call"
                >
                  {$t("request_call")}
                </Link>
              </div>
            </div>
          </div>
        ) : null}

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
