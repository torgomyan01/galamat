type IUpdateCategoryType = "category" | "subcategory";

declare interface IToken {
  access_token: string;
  lang: string;
  remaining_time: number;
}

interface BuildingImage {
  url: string;
  mobile_url: string;
  isPublished: boolean;
}

interface Description {
  title: string | null;
  body: string | null;
}

interface Location {
  latitude: number | null;
  longitude: number | null;
  zoom: number | null;
}

interface IBuildingComplex {
  id: number;
  title: string;
  type: string;
  currency: string;

  agreementText: string | null;
  archiveState: "NOT_ARCHIVED" | "ARCHIVED"; // Եթե լինում են այլ տարբերակներ՝ ավելացնենք
  banks: any | null; // Մանրամասն չկա, եթե գիտես կառուցվածքը՝ նշիր
  description: Description;
  developer: any | null; // Կառուցվածքը բացակայում է
  developer_brand: any | null;
  district: string | null;
  externalId: string | null;
  hasKindergarten: boolean;
  hasPlayground: boolean;
  hasSchool: boolean;
  hasSecurity: boolean;
  hasSportsGround: boolean;
  images: BuildingImage[];
  locality: string;
  location: Location;
  parking: any | null;
  region: string;
  salesOffice: any | null;
  youtubeVideos: any[]; // Եթե YouTube video օբյեկտներն ունեն կառուցվածք, կարող ենք ավելացնել
}

interface DevelopmentEndQuarter {
  year: string;
  quarter: number;
}

interface Currency {
  id: number;
  code: string;
  class: string;
  symbol: string;
  title: string;
  shortName: string;
  unicodeSymbol: string;
}

interface Address {
  full: string | null;
  locality: string | null;
  district: string | null;
  region: string | null;
  street: string | null;
  number: string | null;
}

interface IProjectStage {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  type: string;
  isArchive: boolean;
  street: string;
  number: string;
  facing: string | null;
  material: string | null;
  buildingState: string | null;
  developmentStartQuarter: string | null;
  developmentEndQuarter: DevelopmentEndQuarter | null;
  salesStart: string | null;
  salesEnd: string | null;
  image: string;
  fullImage: string;
  minFloor: number;
  maxFloor: number;
  currency: Currency;
  address: Address;
  minPrice: number;
  minPriceArea: number;
  propertyCount: string;
  countFilteredProperty: string;
  houseBadges: any[]; // Դատարկ զանգված է, եթե badge օբյեկտ կա՝ նշի կառուցվածքը
  propertyTypes: number[];
  roomsFilter: [
    "one",
    "without_layout",
    "two",
    "studio",
    "three",
    "more_than_three",
  ];
  roomsWithEuroFilter: string[];
  landNumber: string | null;
  hasAvailableProperties: boolean;
  hasBookedProperties: boolean;
  contractAddress: string | null;
  externalId: string;
  showroom: boolean;
  commissioningDate: string; // ISO date
}
