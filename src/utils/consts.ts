export const servLink = "https://pb14286.profitbase.ru/api/v4/json";

export const filesLink = "https://s.galamat.kz";
export const filesLinkSave = `${filesLink}/save-images.php`;
export const filesLinkRemove = `${filesLink}/remove-image.php`;
export const SITE_URL = {
  HOME: "/",
  REQUESTS: "/requests",
  OUR_COMPANY: "/our-company",
  SALES: "/gala-bonus",
  METHODS_PURCHASE: "/methods-purchase",
  SALES_OFFICE: "/sales-office",
  USER_AGREEMENT: "/user-agreement",
  SEND_CALLBACK: "/send-callback",
  COOKIE: "/cookie",
  CONTACT: "/contact",
  PROJECTS: "/projects",
  PROJECTS_GALA_ONE: "/projects/gala-one",
  REAL_ESTATE: "/real-estate",
  PROJECT: "/project",
  CALCULATOR: "/calculator",
  ORLEU_PROJECT: "/orleu-project",
  ORLEU_PROJECT_PANORAMA: "/orleu-project/360",
  ADMIN: "admin",
  ADMIN_TRANSLATE: "admin/translate",
  ADMIN_USERS: "admin/users",
  ADMIN_LOGIN: "admin/login",
  ADMIN_PAGES: "admin/pages",
  ADMIN_PAGES_HOME: "home",
  ADMIN_PAGES_COMPANY: "company",
  ADMIN_PROJECTS: "admin/projects",
  ADMIN_LOTTERY: "admin/lottery",
  ADMIN_PROJECTS_HOUSES: "admin/projects/houses",
};

export const localStorageKeys = {
  tokenData: "tokenData",
  tokenTime: "tokenTime",
  tokenAdmin: "tokenAdmin",
  userAdmin: "userAdmin",
  languages: "languages",
  cookieComplete: "cookieComplete",
};

export const motionOptionText = {
  init: {
    opacity: 0,
    y: "30px",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const all = "Все";

export const floorSelectItems = Array.from({ length: 30 }, (_, i) => i + 1);

export const ProjectDataPositions = [
  { value: "business", label: "Бизнес", color: "#DB1D31" },
  { value: "business-plus", label: "Бизнес +", color: "#DB1D31" },
  { value: "comfort-plus", label: "Комфорт +", color: "#132C5E" },
  { value: "comfort", label: "Комфорт", color: "#156E33" },
  { value: "standard", label: "Стандарт", color: "#7B7B7B" },
] as const;

export const formatPrice = (value: number) => {
  if (value >= 1_000_000) {
    const millions = (value / 1_000_000).toFixed(1).replace(".", ",");
    return `${millions} млн`;
  } else if (value >= 1_000) {
    const thousands = Math.round(value / 1_000);
    return `${thousands} тыс`;
  } else {
    return value.toString();
  }
};

export const isValidInternationalPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/[\s\-().]/g, ""); // մաքրում ենք բացատներ, փակագծեր, դաշեր և կետեր

  const pattern = /^(?:\+|00)?[1-9]\d{6,14}$/;

  return pattern.test(cleaned);
};

export const polygonsData = [
  {
    id: 9,
    realIdForDb: 194809,
    color: "#7f0212",
    points: [
      { x: 274.2, y: 172.3 },
      { x: 274.4, y: 253.2 },
      { x: 352.6, y: 252.4 },
      { x: 351.9, y: 258.7 },
      { x: 402.2, y: 258.4 },
      { x: 401.7, y: 253.0 },
      { x: 444.9, y: 253.0 },
      { x: 444.0, y: 179.2 },
      { x: 425.1, y: 179.0 },
      { x: 425.3, y: 173.5 },
    ],
  },
  {
    id: 10,
    realIdForDb: 194819,
    color: "#7f0212",
    points: [
      { x: 445.1, y: 217.5 }, // unchanged (top coordinate)
      { x: 445.3, y: 290.6 }, // 300.6 - 10 = 290.6 (originally 350.6 - 60 = 290.6)
      { x: 466.6, y: 289.8 }, // 299.8 - 10 = 289.8 (originally 349.8 - 60 = 289.8)
      { x: 466.6, y: 296.7 }, // 306.7 - 10 = 296.7 (originally 356.7 - 60 = 296.7)
      { x: 593.7, y: 296.7 }, // 306.7 - 10 = 296.7 (originally 356.7 - 60 = 296.7)
      { x: 593.7, y: 289.8 }, // 299.8 - 10 = 289.8 (originally 349.8 - 60 = 289.8)
      { x: 616.0, y: 289.8 }, // 299.8 - 10 = 289.8 (originally 349.8 - 60 = 289.8)
      { x: 615.8, y: 217.1 }, // unchanged (top coordinate)
      { x: 597.5, y: 217.1 }, // unchanged (top coordinate)
      { x: 597.3, y: 209.6 }, // unchanged (top coordinate)
      { x: 465.9, y: 209.6 }, // unchanged (top coordinate)
      { x: 465.5, y: 217.1 }, // unchanged (top coordinate)
    ],
  },

  {
    id: 11,
    realIdForDb: 194812,
    color: "#7f0212",
    points: [
      { x: 619.4, y: 253.1 },
      { x: 618.3, y: 398.6 },
      { x: 710.8, y: 398.1 },
      { x: 709.2, y: 253.8 },
    ],
  },
  {
    id: 8,
    realIdForDb: 194814,
    color: "#7f0212",
    points: [
      { x: 235.0, y: 259.8 },
      { x: 234.8, y: 403.6 },
      { x: 319.5, y: 402.7 },
      { x: 319.3, y: 383.6 },
      { x: 326.0, y: 383.7 },
      { x: 326.1, y: 275.3 },
      { x: 319.3, y: 275.3 },
      { x: 319.0, y: 259.9 },
    ],
  },
  {
    id: 7,
    realIdForDb: 194816,
    color: "#7f0212",
    points: [
      { x: 235.0, y: 402.8 },
      { x: 235.0, y: 420.6 },
      { x: 228.5, y: 420.7 },
      { x: 228.0, y: 533.0 },
      { x: 235.6, y: 532.4 },
      { x: 235.5, y: 550.2 },
      { x: 319.5, y: 550.2 },
      { x: 319.3, y: 533.0 },
      { x: 325.6, y: 533.0 },
      { x: 325.6, y: 420.9 },
      { x: 320.0, y: 420.6 },
      { x: 319.3, y: 402.5 },
    ],
  },
  {
    id: 6,
    realIdForDb: 194822,
    color: "#7f0212",
    points: [
      { x: 264.1, y: 552.3 },
      { x: 264.5, y: 570.9 },
      { x: 256.5, y: 570.2 },
      { x: 256.5, y: 682.8 },
      { x: 264.5, y: 682.1 },
      { x: 264.7, y: 699.3 },
      { x: 348.1, y: 700.4 },
      { x: 348.6, y: 683.6 },
      { x: 356.0, y: 683.9 },
      { x: 356.0, y: 570.2 },
      { x: 348.6, y: 570.2 },
      { x: 348.1, y: 552.0 },
    ],
  },
  {
    id: 5,
    realIdForDb: 194811,
    color: "#7f0212",
    points: [
      { x: 263.4, y: 700.4 },
      { x: 263.4, y: 849.0 },
      { x: 348.1, y: 848.3 },
      { x: 348.3, y: 825.2 },
      { x: 355.3, y: 824.9 },
      { x: 354.7, y: 700.1 },
      { x: 348.0, y: 699.4 },
      { x: 348.0, y: 700.4 },
    ],
  },
  {
    id: 4,
    realIdForDb: 194813,
    color: "#7f0212",
    points: [
      { x: 309.6, y: 849.8 },
      { x: 309.2, y: 931.1 },
      { x: 338.7, y: 931.4 },
      { x: 338.9, y: 937.5 },
      { x: 459.7, y: 936.4 },
      { x: 459.9, y: 929.1 },
      { x: 479.5, y: 929.1 },
      { x: 479.8, y: 848.9 },
      { x: 371.2, y: 848.9 },
      { x: 371.0, y: 849.8 },
    ],
  },
  {
    id: 3,
    realIdForDb: 194815,
    color: "#7f0212",
    points: [
      { x: 480.0, y: 850.4 },
      { x: 480.0, y: 931.1 },
      { x: 499.0, y: 930.7 },
      { x: 499.6, y: 937.5 },
      { x: 619.8, y: 936.0 },
      { x: 619.8, y: 929.1 },
      { x: 649.3, y: 928.9 },
      { x: 648.6, y: 850.8 },
      { x: 588.7, y: 850.6 },
      { x: 588.4, y: 848.9 },
    ],
  },
  {
    id: 2,
    realIdForDb: 194817,
    color: "#7f0212",
    points: [
      { x: 613.1, y: 700.7 },
      { x: 613.6, y: 849.0 },
      { x: 696.4, y: 848.3 },
      { x: 696.9, y: 825.2 },
      { x: 704.7, y: 824.9 },
      { x: 704.0, y: 699.4 },
      { x: 696.0, y: 699.4 },
      { x: 696.3, y: 700.7 },
    ],
  },
  {
    id: 1,
    realIdForDb: 194820,
    color: "#7f0212",
    points: [
      { x: 612.8, y: 550.2 },
      { x: 704.5, y: 548.9 },
      { x: 704.5, y: 700.1 },
      { x: 696.9, y: 699.0 },
      { x: 696.9, y: 700.7 },
      { x: 612.5, y: 700.4 },
      { x: 612.8, y: 682.8 },
      { x: 606.4, y: 682.1 },
      { x: 606.8, y: 570.9 },
      { x: 612.8, y: 570.2 },
    ],
  },
  {
    id: 12,
    realIdForDb: 194823,
    color: "#7f0212",
    points: [
      { x: 879.1, y: 255.8 }, // 260.8 - 5 = 255.8
      { x: 878.7, y: 335.0 }, // 340.0 - 5 = 335.0
      { x: 957.0, y: 335.6 }, // 340.6 - 5 = 335.6
      { x: 957.0, y: 340.7 }, // 345.7 - 5 = 340.7
      { x: 1006.0, y: 340.7 }, // 345.7 - 5 = 340.7
      { x: 1006.3, y: 335.0 }, // 340.0 - 5 = 335.0
      { x: 1049.0, y: 335.3 }, // 340.3 - 5 = 335.3
      { x: 1049.0, y: 263.4 }, // 268.4 - 5 = 263.4
      { x: 1029.0, y: 263.4 }, // 268.4 - 5 = 263.4
      { x: 1029.0, y: 256.9 }, // 261.9 - 5 = 256.9
    ],
  },
  {
    id: 13,
    realIdForDb: 194824,
    color: "#7f0212",
    points: [
      { x: 1049.5, y: 308.9 }, // 298.9 + 10 = 308.9
      { x: 1049.1, y: 379.8 }, // 369.8 + 10 = 379.8
      { x: 1069.8, y: 380.1 }, // 370.1 + 10 = 380.1
      { x: 1069.8, y: 385.8 }, // 375.8 + 10 = 385.8
      { x: 1197.8, y: 385.5 }, // 375.5 + 10 = 385.5
      { x: 1197.4, y: 379.8 }, // 369.8 + 10 = 379.8
      { x: 1218.8, y: 380.1 }, // 370.1 + 10 = 380.1
      { x: 1218.6, y: 308.5 }, // 298.5 + 10 = 308.5
      { x: 1200.5, y: 308.3 }, // 298.3 + 10 = 308.3
      { x: 1200.1, y: 301.0 }, // 291.0 + 10 = 301.0
      { x: 1069.8, y: 301.3 }, // 291.3 + 10 = 301.3
      { x: 1069.2, y: 308.9 }, // 298.9 + 10 = 308.9
    ],
  },
  {
    id: 14,
    realIdForDb: 194825,
    color: "#7f0212",
    points: [
      { x: 1223.4, y: 340.0 },
      { x: 1223.0, y: 490.4 },
      { x: 1314.0, y: 490.7 },
      { x: 1313.8, y: 340.0 },
    ],
  },
];
