import crypto from "crypto";
import moment from "moment";

export const RandomKey = (length = 5) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

interface EncryptedPayload {
  iv: string;
  salt: string;
  encrypted: string;
}

const SYSTEM_SIGNATURE =
  "🧿Andoi%Galamat%Tuyn%D7f#9!pL@3vZq$JrUe1MwXy^TgHb2NcQ";

export function encryptData(
  data: string,
  password: string = "a4e9b3f712c8a9f5d7e2c1b4e8fa9f2cb6d2a4c7e8f1a9c2d3f4b7a8c1d6f3e5",
): string {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  const payload = {
    signature: SYSTEM_SIGNATURE, // ✅ Add signature
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
    encrypted,
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function isOurEncryptedData(encryptedBase64: string): boolean {
  try {
    const decoded = JSON.parse(
      Buffer.from(encryptedBase64, "base64").toString(),
    );
    return decoded.signature === SYSTEM_SIGNATURE;
  } catch {
    return false;
  }
}

export function decryptData(encryptedBase64: string, password: string): string {
  const decoded: EncryptedPayload & { signature?: string } = JSON.parse(
    Buffer.from(encryptedBase64, "base64").toString(),
  );

  if (decoded.signature !== SYSTEM_SIGNATURE) {
    throw new Error("❌ This data was not encrypted by our system");
  }

  const salt = Buffer.from(decoded.salt, "hex");
  const iv = Buffer.from(decoded.iv, "hex");
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(decoded.encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export const mergeComplexesWithProjects = (
  complexes: IProjectStage[],
  projects: IProjectData[],
): IProjectMerged[] => {
  return complexes.map((complex: IProjectStage) => {
    const project = projects.find(
      (project: IProjectData) => project.project_id === complex.id,
    );
    if (project) {
      return {
        ...complex,
        ...project,
      };
    }
    // եթե project չկա, թողնում ենք ինչպես կա
    return complex;
  }) as IProjectMerged[];
};

export const formatRub = (amount: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/[\u202F\u00A0]/g, " ");
};

export const formatKzt = (amount: number) => {
  return `${new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/[\u202F\u00A0]/g, " ")} тг.`;
};

export const getDiscountPrices = (currentPrice: number) => {
  const present = currentPrice;
  const percent = 1 + Math.random() * 4;
  const previous = Math.round(currentPrice * (1 + percent / 100));

  return {
    present,
    previous,
    percent,
  };
};

export const getClosestPlansByPrice = (
  plans: IPlan[],
  targetPrice: number,
  houseId: number,
  count: number = 6,
) => {
  // 1. Ֆիլտրել ըստ houseId
  const filtered = plans.filter((plan) => plan.houseId === houseId);

  // 2. Սորտավորել ըստ "մոտ" գնային տարբերության
  const sorted = filtered.sort((a, b) => {
    const priceA = Number(a.priceRange.min);
    const priceB = Number(b.priceRange.min);
    const diffA = Math.abs(priceA - targetPrice);
    const diffB = Math.abs(priceB - targetPrice);
    return diffA - diffB;
  });

  // 3. Վերադարձնել առաջին `count` հատը
  return sorted.slice(0, count);
};

export const getSalesStatus = (salesStart: IHouseMonthYear | null) => {
  if (!salesStart) {
    return "Нет данных";
  }

  const startDate = moment({
    year: Number(salesStart.year),
    month: Number(salesStart.month) - 1,
  });

  const now = moment();

  return now.isSameOrAfter(startDate, "month")
    ? "Продажи начались"
    : "Продажи скоро";
};
