import "./globals.scss";
import "../icons/icons.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import NextTopLoader from "nextjs-toploader";

import { Providers } from "@/app/providers";

import YandexMetrika from "@/components/common/YandexMetrika/YandexMetrika";

export async function generateMetadata() {
  return {
    title: "Купить квартиру в Астане — Galamat | Отдел продаж недвижимости",
    description:
      "Galamat — надёжная недвижимость в столице. Купить квартиру в Астане легко с нами: профессиональный отдел продаж, выгодные предложения и сопровождение сделки.",
    keywords: [
      "купить квартиру в Астане",
      "новостройки Астана",
      "недвижимость в Астане",
      "1-комнатная квартира Астана",
      "2-комнатная квартира Астана",
      "3-комнатная квартира Астана",
      "4-комнатная квартира Астана",
      "квартира в ипотеку Астана",
      "квартира в рассрочку Астана",
      "дешевые квартиры Астана",
    ],
    alternates: {
      canonical: "https://galamat.kz",
    },
    // openGraph: {
    //   title: data.data.name,
    //   description: data.data.description?.slice(0, 140),
    //   images: image?.image || "",
    // },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KTS8G3K9');`,
          }}
        />
      </head>
      <body>
        <NextTopLoader />
        <Providers>{children}</Providers>

        {/*<GoogleAnalytics gaId="AW-10990855116" />*/}

        <YandexMetrika />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KTS8G3K9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
