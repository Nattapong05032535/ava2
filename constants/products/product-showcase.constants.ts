import type {
  ProductShowcaseExperience,
  ProductShowcaseFinish,
  ProductShowcaseHero,
  ProductShowcaseSection,
  ProductShowcaseServiceBadge,
  ProductShowcaseSpec,
  ProductShowcaseStat,
  ProductShowcaseTheme,
} from "@/types";

export type ProductModelKey =
  | "promax-p89"
  | "promax-p63"
  | "note-p65"
  | "enjoy-p65"
  | "tab-p68"
  | "default";

export type SupportedProductModelKey = Exclude<ProductModelKey, "default">;

export const SUPPORTED_PRODUCT_MODEL_KEYS: SupportedProductModelKey[] = [
  "promax-p89",
  "promax-p63",
  "note-p65",
  "enjoy-p65",
  "tab-p68",
];

export interface ProductPresentationTemplate {
  familyLabel: string;
  category: string;
  theme: ProductShowcaseTheme;
  hero: Omit<
    ProductShowcaseHero,
    "detailsNote" | "heroVisual" | "serviceBadges"
  >;
  serviceBadges: ProductShowcaseServiceBadge[];
  stats: ProductShowcaseStat[];
  sections: Array<
    Omit<ProductShowcaseSection, "visual"> & {
      visualRole: "hero" | "detail";
    }
  >;
  experience: ProductShowcaseExperience;
  finishes: ProductShowcaseFinish[];
  specs: ProductShowcaseSpec[];
  art: {
    hero: string;
    detail?: string;
    fallbackProduct: string;
  };
}

interface ProductPresentationIdentity {
  modelName: string;
  aliases: string[];
}

export interface ResolvedProductPresentation {
  modelKey: ProductModelKey;
  modelName: string;
  template: ProductPresentationTemplate;
}

const PRODUCT_PRESENTATION_IDENTITIES: Record<
  ProductModelKey,
  ProductPresentationIdentity
> = {
  "promax-p89": {
    modelName: "AVA Life Pro Max P89",
    aliases: ["ava life pro max p89", "pro max p89", "promax-p89", "p89"],
  },
  "promax-p63": {
    modelName: "AVA Life Pro Max P63",
    aliases: ["ava life pro max p63", "pro max p63", "promax-p63", "p63"],
  },
  "note-p65": {
    modelName: "AVA Note P65",
    aliases: [
      "ava note p65",
      "note p65",
      "note-p65",
      "p65c",
      "p65 cold",
      "note cold p65",
      "note",
    ],
  },
  "enjoy-p65": {
    modelName: "AVA Enjoy P65",
    aliases: [
      "ava enjoy p65",
      "enjoy p65",
      "enjoy-p65",
      "p65p",
      "p65 pro",
      "enjoy series pro p65",
      "enjoy",
    ],
  },
  "tab-p68": {
    modelName: "AVA Tab P68",
    aliases: ["ava tab p68", "tab p68", "tab-p68", "tablet p68", "p68", "tab"],
  },
  default: {
    modelName: "AVA Device",
    aliases: [],
  },
};

export const DEFAULT_SERVICE_BADGES: ProductShowcaseServiceBadge[] = [
  {
    label: "ประกันตัวเครื่อง 24 เดือน",
    detail: "บริการหลังการขายโดยทีมร้านค้าอย่างเป็นทางการของเอวีเอ",
  },
  {
    label: "ส่งฟรีทั่วประเทศ",
    detail: "จัดส่งรวดเร็วพร้อมแพ็กเกจพรีเมียม",
  },
  {
    label: "รับประกันชิ้นส่วนแท้",
    detail: "ดูแลอะไหล่และชิ้นส่วนตามมาตรฐานของแบรนด์",
  },
  {
    label: "เก็บเงินปลายทาง",
    detail: "รองรับหลายรูปแบบการชำระเงินเพื่อความมั่นใจ",
  },
];

export const PRODUCT_PRESENTATIONS: Record<
  ProductModelKey,
  ProductPresentationTemplate
> = {
  "promax-p89": {
    familyLabel: "เรือธงซิกเนเจอร์เอวีเอ",
    category: "สมาร์ทโฟน",
    theme: {
      page: "#ffffff",
      surface: "#ffffff",
      mutedSurface: "#f1f5f9",
      ink: "#0f172a",
      mutedInk: "#64748b",
      accent: "#f97316",
      accentSoft: "rgba(249, 115, 22, 0.12)",
      accentStrong: "#ea580c",
      darkSurface: "#0f172a",
    },
    hero: {
      eyebrow: "AVA Life Pro Max P89",
      label: "เรื่องราวดีไซน์เรือธง",
      spotlightWordmark: "P89",
      headline: "ออกแบบให้ดูหรูชัดเจนตั้งแต่มองครั้งแรก",
      subheadline:
        "โครงสร้างระดับเรือธงที่ให้ความรู้สึกพรีเมียมตั้งแต่วินาทีแรกที่หยิบขึ้นมา",
      description:
        "P89 คือรุ่นที่เราออกแบบให้เป็นหน้าโชว์ของแบรนด์ ทั้งสัดส่วน วัสดุ และจังหวะของแสงเงาบนตัวเครื่องถูกจัดวางเพื่อให้ภาพรวมดูนิ่ง หรู และมีพลังในแบบเดียวกับสินค้าระดับเรือธง.",
      primaryCtaLabel: "ดูสเปกเด่น",
      secondaryCtaLabel: "สำรวจรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "6.8”",
        label: "จอโอแอลอีดีเต็มตา",
        detail: "หน้าจอใหญ่เต็มตา พร้อมคอนทราสต์ลึกและโทนสีคมสะอาด",
      },
      {
        value: "120Hz",
        label: "การเคลื่อนไหวลื่นไหล",
        detail: "การเลื่อนและการโต้ตอบลื่นไหลในทุกการใช้งาน",
      },
      {
        value: "50MP AI",
        label: "กล้องซิกเนเจอร์",
        detail: "ชุดกล้องที่ออกแบบมาเพื่อภาพคมชัดและโทนสกินสวยสมจริง",
      },
      {
        value: "67W",
        label: "ชาร์จไว",
        detail: "เติมแบตเตอรี่ได้ไว เพื่อกลับเข้าสู่โหมดพร้อมใช้งานอย่างรวดเร็ว",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "ภาษาดีไซน์",
        title: "ทรงเครื่องหรูที่จัดสัดส่วนอย่างมั่นใจ",
        description:
          "ภาษาดีไซน์ของ P89 เน้นเส้นสายที่สงบแต่หนักแน่น จึงดูหรูโดยไม่ต้องพยายามมาก ตัวเครื่องถูกออกแบบให้ดูนิ่ง เรียบ และมีมิติแบบสินค้ากลุ่มพรีเมียมสมัยใหม่.",
        quote:
          "วัสดุ การไล่เฉดสี และระยะขององค์ประกอบทุกจุด ถูกจัดให้ภาพรวมดูแพงในทันที",
        tone: "light",
        cards: [
          {
            eyebrow: "พื้นผิว",
            title: "สี่สีซิกเนเจอร์",
            description:
              "เลือกโทนที่ชัดเจนทั้งกราไฟต์ เพิร์ล มิดไนต์บลู และโซลาร์ออเรนจ์",
          },
          {
            eyebrow: "งานประกอบ",
            title: "เฟรมอะลูมิเนียมขอบโค้งนุ่ม",
            description:
              "ขอบตัวเครื่องโค้งรับมืออย่างพอดี ให้สัมผัสเนียนและดูประณีตมากขึ้น",
          },
          {
            eyebrow: "จุดจำ",
            title: "โมดูลกล้องคือเอกลักษณ์หลัก",
            description:
              "พื้นที่กล้องถูกขยายและจัดองค์ประกอบให้กลายเป็นเอกลักษณ์หลักของรุ่นนี้",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "กล้อง",
        eyebrow: "ความสามารถซิกเนเจอร์",
        title: "เรือธงที่ให้กล้องเป็นหัวใจของภาพจำ",
        description:
          "จุดขายของ P89 คือการทำให้ภาพรวมของฮาร์ดแวร์กับคาแรกเตอร์ของกล้องเดินไปด้วยกัน ทั้งเรื่องรูปลักษณ์ โหมดถ่าย และงานคัลเลอร์ที่ให้บุคลิกดูชัด.",
        quote: "ภาพที่ได้ควรสวยตั้งแต่ตอนยกขึ้นถ่าย ไม่ใช่รอแก้ทีหลังทั้งหมด",
        tone: "dark",
        cards: [
          {
            eyebrow: "เลนส์หลัก",
            title: "ความคมที่พอดี",
            description:
              "เน้นความคมที่พอดี รายละเอียดชัด แต่ยังคงผิวนวลและโทนแสงที่ดูแพง",
          },
          {
            eyebrow: "ภาพบุคคล",
            title: "มิติภาพที่นุ่มตา",
            description:
              "แยกตัวแบบได้ดีขึ้น พร้อมฉากหลังละลายที่ดูสะอาดไม่แข็งกระด้าง",
          },
          {
            eyebrow: "กลางคืน",
            title: "มั่นใจในแสงน้อย",
            description:
              "ดึงแสงเงาในฉากกลางคืนให้ดูมีมิติ ลดสัญญาณรบกวน และรักษาบรรยากาศเดิมไว้",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "ประสบการณ์ประจำวัน",
      title: "ความประณีตระดับเรือธงตั้งแต่เริ่มใช้งานจนถึงชาร์จก่อนนอน",
      description:
        "หน้านี้ถูกออกแบบให้ขายทั้งรูปทรงและฟังก์ชัน จึงมีส่วนที่เล่าความรู้สึกเวลาใช้งานจริง ไม่ใช่แค่สเปกบนกระดาษ.",
      cards: [
        {
          title: "ประสบการณ์แกะกล่องพรีเมียม",
          description:
            "เริ่มต้นความรู้สึกพรีเมียมตั้งแต่แพ็กเกจจนถึงการวางเครื่องบนแท่นชาร์จข้างเตียง",
        },
        {
          title: "ประสิทธิภาพสมดุล",
          description:
            "ใช้งานลื่นในการสลับแอป เล่นคอนเทนต์ และถ่ายภาพต่อเนื่องตลอดวัน",
        },
        {
          title: "สีซิกเนเจอร์ที่จดจำง่าย",
          description:
            "สีโซลาร์ออเรนจ์ถูกวางให้เป็นสีเด่นของรุ่น ช่วยสร้างการจดจำแบรนด์ได้ทันที",
        },
      ],
    },
    finishes: [
      {
        name: "โซลาร์ออเรนจ์",
        swatch: "#df8b43",
        description:
          "สีไฮไลต์ของคอลเลกชัน ให้บุคลิกหรู กล้า และเห็นได้ชัดในทันที",
      },
      {
        name: "มิดไนต์บลู",
        swatch: "#25314f",
        description: "โทนเข้มที่ดูสุขุมและร่วมสมัย เหมาะกับการใช้งานทุกวัน",
      },
      {
        name: "เพิร์ลไวต์",
        swatch: "#f2eee8",
        description:
          "ขาวมุกเนียนตา ดูสะอาด ละมุน และสะท้อนงานประกอบได้ชัด",
      },
      {
        name: "กราไฟต์แบล็ก",
        swatch: "#262626",
        description: "ดำกราไฟต์สำหรับลุคเท่ เรียบ และดูเป็นมืออาชีพ",
      },
    ],
    specs: [
      {
        label: "หน้าจอ",
        value: "โอแอลอีดี 6.8 นิ้ว 120Hz",
        description: "ให้ภาพไหลลื่น คม และดูเต็มพื้นที่ในทุกคอนเทนต์หลัก",
      },
      {
        label: "ชิปเซ็ต",
        value: "ระดับเรือธง รองรับ 5G",
        description: "รองรับการใช้งานหนักและการสลับงานรวดเร็วได้อย่างต่อเนื่อง",
      },
      {
        label: "กล้อง",
        value: "กล้องหลัก 50MP พร้อมจูนภาพบุคคล",
        description:
          "เน้นภาพบุคคล ภาพเดินทาง และภาพไลฟ์สไตล์ที่โทนดูพรีเมียม",
      },
      {
        label: "แบตเตอรี่",
        value: "ชาร์จไว 67W",
        description: "เติมพลังได้ไวและเหมาะกับคนที่ต้องการพร้อมใช้งานเสมอ",
      },
    ],
    art: {
      hero: "/hero-detail/P89/hero1.png",
      detail: "/phone/promax-p89.png",
      fallbackProduct: "/images/products/promax-p89.png",
    },
  },
  "promax-p63": {
    familyLabel: "เอวีเอโปรซีรีส์",
    category: "สมาร์ทโฟน",
    theme: {
      page: "#ffffff",
      surface: "#ffffff",
      mutedSurface: "#e2e8f0",
      ink: "#1e293b",
      mutedInk: "#64748b",
      accent: "#3b82f6",
      accentSoft: "rgba(59, 130, 246, 0.12)",
      accentStrong: "#2563eb",
      darkSurface: "#1e293b",
    },
    hero: {
      eyebrow: "AVA Life Pro Max P63",
      label: "ความหรูสำหรับทุกวัน",
      spotlightWordmark: "P63",
      headline: "เส้นสายคมขึ้น เบาขึ้น และพร้อมใช้งานทั้งวัน",
      subheadline:
        "รุ่นที่เน้นภาพลักษณ์พรีเมียมแบบสุขุม เหมาะกับคนที่ชอบเรือธงลุคเรียบและคล่องตัว",
      description:
        "P63 ถูกออกแบบให้มีความเป็นมืออาชีพที่เข้าถึงง่ายขึ้น ลุคโดยรวมจึงออกไปทางโมเดิร์น เนี้ยบ และพร้อมพกพาในทุกวันโดยยังคงคาแรกเตอร์ระดับบนของซีรีส์ไว้ชัดเจน.",
      primaryCtaLabel: "ดูประสบการณ์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "6.6”",
        label: "หน้าจอขอบบาง",
        detail: "ขอบจอบางเพื่อภาพรวมที่ทันสมัยและรู้สึกโปร่งขึ้นในมือ",
      },
      {
        value: "5G",
        label: "เชื่อมต่อได้เสมอ",
        detail: "พร้อมสำหรับการใช้งานที่ต้องการความเร็วและเสถียรภาพในทุกวัน",
      },
      {
        value: "50MP",
        label: "ภาพคมชัดในทุกวัน",
        detail: "ได้ภาพคมและโทนธรรมชาติ เหมาะกับการใช้งานตั้งแต่เช้าจรดค่ำ",
      },
      {
        value: "5000mAh",
        label: "แบตอึดตลอดวัน",
        detail:
          "แบตเตอรี่ที่พอสำหรับการทำงาน ความบันเทิง และการเดินทางหนึ่งวันเต็ม",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "รูปทรงประณีต",
        title: "ดีไซน์สุขุมสำหรับคนที่ชอบความหรูแบบไม่ต้องตะโกน",
        description:
          "ดีไซน์ของ P63 ลดความหวือหวาลง แล้วไปเพิ่มคุณค่าที่สัดส่วน การเก็บงาน และโทนสีที่ดูสะอาดขึ้นแทน จึงเหมาะกับผู้ใช้ที่ชอบความหรูแบบไม่ตะโกน.",
        tone: "light",
        cards: [
          {
            title: "เฟรมโค้งรับมือ",
            description:
              "ขอบเครื่องรับกับอุ้งมือได้ดี พกพาง่ายและดูเรียบเนียนในทุกมุม",
          },
          {
            title: "โทนสีหรูแบบสุขุม",
            description:
              "โทนสีที่คุมอารมณ์ให้นิ่ง ทำให้ภาพรวมดูเป็นมืออาชีพมากขึ้น",
          },
          {
            title: "ชุดกล้องที่จัดวางสมดุล",
            description:
              "เลนส์และโมดูลกล้องถูกจัดวางแบบสมดุล เหมาะกับงานดีไซน์ที่ต้องการความเนี้ยบ",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "พลัง",
        eyebrow: "พลังสำหรับทุกวัน",
        title: "พร้อมสำหรับวันทำงานยาว ๆ และภาพที่ดูสะอาดตา",
        description:
          "เราออกแบบหน้าสินค้าของรุ่นนี้ให้เล่าเรื่องพลังการใช้งานในชีวิตจริง ทั้งงานเอกสาร ประชุมออนไลน์ ถ่ายภาพ และดูเนื้อหา โดยไม่ทำให้ลุคโดยรวมเสียความเรียบหรู.",
        tone: "dark",
        cards: [
          {
            title: "สลับแอปได้รวดเร็ว",
            description: "รองรับงานสลับหลายแอปได้คล่องและนิ่งขึ้น",
          },
          {
            title: "มองสบายตา",
            description:
              "จอภาพถูกจูนให้ใช้งานนานแล้วสบายตาและดูสะอาดบนพื้นหลังสว่าง",
          },
          {
            title: "แบตเตอรี่ที่ไว้ใจได้",
            description:
              "รองรับวันทำงานแน่น ๆ ได้โดยไม่ต้องกังวลมากเรื่องแบตเตอรี่",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "เข้ากับไลฟ์สไตล์",
      title: "มือถือพรีเมียมที่กลมกลืนกับทุกจังหวะชีวิตอย่างสวยงาม",
      description:
        "P63 ไม่ได้พยายามเป็นรุ่นที่หวือหวาที่สุด แต่ถูกวางให้เป็นรุ่นที่อยู่กับการใช้งานประจำวันได้อย่างกลมกลืนและดูดีตลอดเวลา.",
      cards: [
        {
          title: "ลุคพร้อมทำงาน",
          description:
            "เหมาะกับการใช้งานที่ต้องการภาพลักษณ์สุภาพ เนี้ยบ และเป็นมืออาชีพ",
        },
        {
          title: "หน้าจอใช้งานที่สะอาดตา",
          description:
            "เหมาะกับประสบการณ์ใช้งานที่ชอบความเรียบง่าย อ่านง่าย และสัมผัสลื่นมือ",
        },
        {
          title: "พกพาง่าย",
          description:
            "น้ำหนักและสัดส่วนเอื้อต่อการพกพาทั้งวันแบบไม่รู้สึกเกะกะ",
        },
      ],
    },
    finishes: [
      {
        name: "ไททันเกรย์",
        swatch: "#5d646b",
        description: "สีเทาเข้มสำหรับลุคเรียบหรูและมั่นคง",
      },
      {
        name: "สตีลบลู",
        swatch: "#53657d",
        description: "น้ำเงินอมเทาให้ความรู้สึกทันสมัยและดูมืออาชีพ",
      },
    ],
    specs: [
      {
        label: "หน้าจอ",
        value: "จอ FHD+ ขนาด 6.6 นิ้ว",
        description: "จอใหญ่กำลังดีสำหรับการทำงานและความบันเทิง",
      },
      {
        label: "กล้อง",
        value: "กล้องหลัก 50MP",
        description: "ถ่ายภาพกลางวันคม รายละเอียดดี และใช้งานง่าย",
      },
      {
        label: "แบตเตอรี่",
        value: "5000mAh ใช้งานได้นาน",
        description: "รองรับวันใช้งานแน่น ๆ ได้มั่นใจมากขึ้น",
      },
      {
        label: "ตำแหน่งรุ่น",
        value: "รุ่นโปรสำหรับพกใช้งานทุกวัน",
        description: "เหมาะกับผู้ใช้ที่อยากได้ความพรีเมียมแบบสมดุล",
      },
    ],
    art: {
      hero: "/images/products/p63-hero-premium.svg",
      detail: "/phone/promax-p63.png",
      fallbackProduct: "/images/products/promax-p63.png",
    },
  },
  "note-p65": {
    familyLabel: "เอวีเอโน้ตซีรีส์",
    category: "สมาร์ทโฟน",
    theme: {
      page: "#ffffff",
      surface: "#ffffff",
      mutedSurface: "#e9edf0",
      ink: "#101517",
      mutedInk: "#69767b",
      accent: "#88949c",
      accentSoft: "rgba(136, 148, 156, 0.20)",
      accentStrong: "#5d6970",
      darkSurface: "#14181c",
    },
    hero: {
      eyebrow: "AVA Life Note P65",
      label: "โฟกัสกับงานได้มากขึ้น",
      spotlightWordmark: "โน้ต",
      headline: "มือถือที่นิ่งขึ้น เพื่อการคิดงานที่คมขึ้น",
      subheadline:
        "รุ่นที่วางคาแรกเตอร์ให้เหมาะกับคนทำงาน คิดงาน และจดทุกไอเดียได้ลื่นขึ้นตลอดวัน",
      description:
        "Note P65 ถูกออกแบบให้ดูสะอาด โปร่ง และไม่รบกวนสายตา เพื่อให้เหมาะกับการอ่าน การจด การตอบแชตงาน และการใช้งานต่อเนื่องยาวนานในทุกวัน.",
      primaryCtaLabel: "ดูส่วนการทำงาน",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "108MP",
        label: "กล้องเก็บรายละเอียดดี",
        detail: "เหมาะกับการเก็บภาพเอกสาร งานประชุม และชีวิตประจำวัน",
      },
      {
        value: "5000mAh",
        label: "แบตเตอรี่ตลอดวัน",
        detail: "ออกแบบมาให้รับมือกับวันทำงานที่ยาวและต่อเนื่อง",
      },
      {
        value: "หน้าจอใหญ่",
        label: "อ่านสบายตา",
        detail: "พื้นที่แสดงผลที่เหมาะกับเอกสาร บทความ และงานอ่านยาว",
      },
      {
        value: "โน้ตอัจฉริยะ",
        label: "เน้นการทำงานเป็นหลัก",
        detail: "พร้อมต่อยอดกับขั้นตอนการจดและจัดการงาน",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "ความหรูที่สงบ",
        title: "เรียบอย่างตั้งใจ เพื่อให้โฟกัสอยู่กับสิ่งสำคัญ",
        description:
          "งานออกแบบของ Note P65 ใช้โทนขาวสะอาดและเส้นสายที่เนียนเพื่อลดความรู้สึกวุ่นวาย ทำให้เหมาะกับคนที่ต้องการอุปกรณ์ที่ดูโปรแต่ไม่หนักเกินไปในเชิงภาพลักษณ์.",
        tone: "light",
        cards: [
          {
            title: "ผิวสีขาวนุ่มตา",
            description:
              "โทนสีสะอาดช่วยให้ตัวเครื่องดูเบา เรียบ และเข้ากับทุกสภาพแวดล้อม",
          },
          {
            title: "หน้าจอที่ให้ความรู้สึกเหมาะกับการอ่าน",
            description:
              "เลย์เอาต์บนหน้ารายละเอียดถูกวางให้สื่อถึงความนิ่ง อ่านง่าย และใช้งานจริงได้นาน",
          },
          {
            title: "ชุดกล้องที่ดูเรียบและพอดี",
            description:
              "ชุดกล้องถูกออกแบบให้ร่วมกับตัวเครื่องแบบกลมกลืน ไม่เด่นเกินความจำเป็น",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "โฟกัส",
        eyebrow: "โหมดทำงาน",
        title:
          "อุปกรณ์ที่รองรับการอ่าน เขียน และวางแผนได้ยาวนาน",
        description:
          "หัวใจของรุ่นนี้คือการทำให้ช่วงเวลาทำงานรู้สึกลื่นไหลมากขึ้น ตั้งแต่ตอนเปิดอ่านบรีฟ จดสิ่งสำคัญ ไปจนถึงตอบกลับงานก่อนจบวัน.",
        tone: "dark",
        cards: [
          {
            title: "อ่านงานยาวได้สบายขึ้น",
            description:
              "อ่านบทความหรือเอกสารยาว ๆ ได้สบายขึ้นด้วยการจัดการพื้นที่หน้าจอที่ลงตัว",
          },
          {
            title: "เก็บข้อมูลได้รวดเร็ว",
            description:
              "หยิบขึ้นมาถ่ายเอกสารหรือบันทึกไวท์บอร์ดได้ทันทีเมื่อมีไอเดียใหม่",
          },
          {
            title: "แบตเตอรี่ที่เข้ากับกิจวัตร",
            description:
              "วางใจได้กับแบตเตอรี่ที่รองรับทั้งวันประชุมและงานต่อเนื่องหลังเลิกงาน",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "ความหรูที่ใช้ได้จริง",
      title: "ลดสิ่งรบกวน เพิ่มพื้นที่ให้กิจวัตรของคุณ",
      description:
        "ประสบการณ์ของ Note P65 เน้นความพอดีในการใช้งานจริงมากกว่าการโชว์พลังสุดโต่ง ทำให้รุ่นนี้เหมาะกับคนที่ให้ค่ากับความนิ่งและความสม่ำเสมอ.",
      cards: [
        {
          title: "ต่อเนื่องจากโต๊ะทำงานสู่การเดินทาง",
          description:
            "ใช้งานได้ดีทั้งที่โต๊ะทำงาน ระหว่างเดินทาง และในช่วงพักระหว่างวัน",
        },
        {
          title: "มุมมองเนื้อหาที่สะอาดตา",
          description:
            "ตัวอักษร ภาพ และองค์ประกอบบนหน้าจอถูกมองได้สบายในระยะเวลานานขึ้น",
        },
        {
          title: "เครื่องมือประจำวันที่ไว้ใจได้",
          description:
            "ตอบโจทย์คนที่ต้องการมือถือไว้ทำงานได้จริงทุกวันโดยไม่ต้องคิดมาก",
        },
      ],
    },
    finishes: [
      {
        name: "คลาวด์ไวต์",
        swatch: "#f3f4f2",
        description: "โทนขาวสะอาดที่ช่วยให้ตัวเครื่องดูเบาและเรียบหรู",
      },
      {
        name: "สเลตแบล็ก",
        swatch: "#2f3133",
        description: "ตัวเลือกที่ดูนิ่ง เหมาะกับงานและการใช้งานทุกสถานการณ์",
      },
    ],
    specs: [
      {
        label: "กล้อง",
        value: "108MP เก็บรายละเอียดคมชัด",
        description: "เก็บภาพเอกสารและงานประจำวันได้คมชัดมากขึ้น",
      },
      {
        label: "แบตเตอรี่",
        value: "5000mAh ใช้งานได้ยาวนาน",
        description: "รองรับวันใช้งานต่อเนื่องได้ดีโดยไม่ต้องกังวลมาก",
      },
      {
        label: "ตำแหน่งรุ่น",
        value: "มือถือที่เน้นการทำงาน",
        description: "เหมาะสำหรับคนอ่าน เขียน วางแผน และตอบงานบ่อย",
      },
      {
        label: "ประสบการณ์หน้าจอ",
        value: "จอใหญ่ที่เน้นความสบายตา",
        description: "ช่วยให้การอ่านและการดูเนื้อหาต่อเนื่องลื่นไหลขึ้น",
      },
    ],
    art: {
      hero: "/hero-detail/P65C/hero.png",
      detail: "/phone/note-p65.png",
      fallbackProduct: "/images/products/note-p65.png",
    },
  },
  "enjoy-p65": {
    familyLabel: "เอวีเอเอนจอยซีรีส์",
    category: "สมาร์ทโฟน",
    theme: {
      page: "#ffffff",
      surface: "#ffffff",
      mutedSurface: "#e4edf7",
      ink: "#10213b",
      mutedInk: "#62728c",
      accent: "#7fb3f5",
      accentSoft: "rgba(127, 179, 245, 0.24)",
      accentStrong: "#3f74b8",
      darkSurface: "#101a2a",
    },
    hero: {
      eyebrow: "AVA Enjoy Series P65",
      label: "ความสนุกทุกวันที่ยกระดับขึ้น",
      spotlightWordmark: "สนุก",
      headline: "คาแรกเตอร์สดใสสำหรับคนที่ใช้ชีวิตกับคอนเทนต์",
      subheadline:
        "สมาร์ทโฟนที่วางอารมณ์ให้สดขึ้น ใช้ง่ายขึ้น และดูเป็นมิตรกับการใช้งานทุกวัน",
      description:
        "Enjoy P65 คือรุ่นที่ให้พลังบวกกับประสบการณ์บนมือถือ ตั้งแต่ดีไซน์ โทนสี ไปจนถึงจังหวะของหน้ารายละเอียดที่เน้นความสนุก ความสว่าง และการใช้งานบันเทิงที่ลื่นมือ.",
      primaryCtaLabel: "ดูไฮไลต์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "90Hz",
        label: "เลื่อนหน้าจอลื่น",
        detail: "เลื่อนคอนเทนต์และโซเชียลได้ลื่นขึ้นในทุกวัน",
      },
      {
        value: "50MP",
        label: "ภาพพร้อมแชร์",
        detail: "เหมาะกับการถ่ายรูปและโพสต์ได้ทันทีโดยไม่ซับซ้อน",
      },
      {
        value: "เสียงสเตอริโอ",
        label: "เน้นความบันเทิง",
        detail: "เติมมิติให้การดูซีรีส์ ฟังเพลง และเล่นคอนเทนต์สั้น",
      },
      {
        value: "ชาร์จไว",
        label: "เติมพลังรวดเร็ว",
        detail: "เสียบชาร์จไม่นานก็กลับมาใช้งานต่อได้สะดวก",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "ความหรูที่สนุกขึ้น",
        title: "ออกแบบให้สดใหม่ ไม่จำเจ",
        description:
          "Enjoy P65 ใช้แนวทางงานออกแบบที่เบากว่าและสว่างกว่า แต่ยังรักษาความเป็นสินค้าพรีเมียมผ่านพื้นผิว แสงเงา และองค์ประกอบที่เรียบร้อยขึ้นกว่าระดับราคาทั่วไป.",
        tone: "light",
        cards: [
          {
            title: "โทนสีที่เป็นมิตร",
            description:
              "โทนสีของรุ่นนี้ช่วยให้ภาพรวมดูเข้าถึงง่ายและมีพลัง",
          },
          {
            title: "มุมโค้งที่ถือสบาย",
            description:
              "สัดส่วนและมุมโค้งของตัวเครื่องช่วยให้ถือใช้งานได้นานแบบสบายมือ",
          },
          {
            title: "ภาพลักษณ์ที่พร้อมสำหรับคอนเทนต์",
            description:
              "ดีไซน์เน้นให้ตัวเครื่องดูพร้อมสำหรับความบันเทิงในทันที",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "ความบันเทิง",
        eyebrow: "โหมดความบันเทิง",
        title: "ทำมาเพื่อโซเชียล เพลง คลิปสั้น และความสนุกระหว่างวัน",
        description:
          "หน้าสินค้าของรุ่นนี้เน้นขายอารมณ์ในการใช้งานจริงกับโซเชียลและคอนเทนต์ จึงใช้ข้อความและจังหวะการเล่าเรื่องที่เบา สนุก และเห็นภาพการใช้งานได้ง่าย.",
        tone: "dark",
        cards: [
          {
            title: "ลื่นไหลกับฟีดโซเชียล",
            description: "ตอบสนองการเลื่อนหน้าจอและสลับคอนเทนต์ได้ไวขึ้น",
          },
          {
            title: "เสียงชัดสำหรับการรับชม",
            description:
              "เหมาะกับคนที่ใช้มือถือเป็นหน้าจอความบันเทิงหลักในแต่ละวัน",
          },
          {
            title: "ถ่ายแล้วแชร์ได้รวดเร็ว",
            description:
              "หยิบถ่ายภาพหรือคลิปสั้นแล้วแชร์ได้ทันทีแบบไม่ต้องปรับเยอะ",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "พลังสดใสระหว่างวัน",
      title: "สร้างมาให้ชีวิตดิจิทัลทุกวันรู้สึกเบาและมีชีวิตชีวามากขึ้น",
      description:
        "รุ่นนี้เหมาะกับผู้ใช้ที่ต้องการมือถือที่ดูดี ใช้งานสนุก และให้ความรู้สึกบวกแบบต่อเนื่องทั้งวันโดยไม่ต้องเป็นสายสเปกสุดโต่ง.",
      cards: [
        {
          title: "กิจวัตรที่เริ่มจากโซเชียล",
          description:
            "เหมาะกับคนที่อยู่กับการดูคอนเทนต์ อัปเดตเทรนด์ และแชตกับเพื่อนบ่อย",
        },
        {
          title: "พกง่ายและสดใส",
          description:
            "รูปทรงและสีช่วยให้มือถือดูเป็นส่วนหนึ่งของลุคได้อย่างง่ายดาย",
        },
        {
          title: "ความพรีเมียมที่เข้าถึงง่าย",
          description:
            "ได้บรรยากาศพรีเมียมแบบเข้าถึงง่าย เหมาะกับผู้ใช้วงกว้างมากขึ้น",
        },
      ],
    },
    finishes: [
      {
        name: "ไอซ์บลู",
        swatch: "#cfe6ff",
        description: "สีน้ำเงินอ่อนที่ให้ภาพจำสดใสและร่วมสมัย",
      },
      {
        name: "มิดไนต์",
        swatch: "#202835",
        description: "โทนเข้มสำหรับคนที่ชอบความนิ่งแต่ยังอยากได้คาแรกเตอร์ชัด",
      },
    ],
    specs: [
      {
        label: "หน้าจอ",
        value: "จอ 90Hz ลื่นไหล",
        description: "ลื่นกำลังดีสำหรับโซเชียลและคอนเทนต์ประจำวัน",
      },
      {
        label: "กล้อง",
        value: "50MP พร้อมแชร์",
        description: "ได้ภาพที่พร้อมแชร์โดยโทนภาพใช้งานง่าย",
      },
      {
        label: "เสียง",
        value: "เล่นเสียงสเตอริโอ",
        description: "เพิ่มอรรถรสให้การดูวิดีโอและฟังเพลงมากขึ้น",
      },
      {
        label: "ตำแหน่งรุ่น",
        value: "ความบันเทิงในไลฟ์สไตล์ทุกวัน",
        description: "เหมาะกับคนที่เน้นความสนุกและความคล่องในทุกวัน",
      },
    ],
    art: {
      hero: "/hero-detail/P65P/hero2.png",
      detail: "/phone/enjoy-p65.png",
      fallbackProduct: "/images/products/enjoy-p65-hero-draft.svg",
    },
  },
  "tab-p68": {
    familyLabel: "เอวีเอไลฟ์แท็บ",
    category: "แท็บเล็ต",
    theme: {
      page: "#ffffff",
      surface: "#fbfdff",
      mutedSurface: "#dfe8f1",
      ink: "#0f1f2d",
      mutedInk: "#617387",
      accent: "#7aa3cb",
      accentSoft: "rgba(122, 163, 203, 0.22)",
      accentStrong: "#44698f",
      darkSurface: "#101923",
    },
    hero: {
      eyebrow: "AVA Life Tab Ultra P68",
      label: "พื้นที่สร้างสรรค์",
      spotlightWordmark: "แท็บ",
      headline: "พื้นที่จอที่ใหญ่และนิ่งขึ้นสำหรับไอเดียที่เคลื่อนไหว",
      subheadline:
        "แท็บเล็ตที่ถูกวางบทบาทให้เหมาะกับทั้งงานสร้างสรรค์ ความบันเทิง และการทำงานแบบพกพา",
      description:
        "P68 เน้นความรู้สึกของพื้นที่ใช้งานที่กว้างขึ้น หายใจสะดวกขึ้น และพร้อมสำหรับการดูงาน วาดไอเดีย พรีเซนต์ หรือปล่อยให้เป็นหน้าจอความบันเทิงคู่วันของคุณ.",
      primaryCtaLabel: "ดูส่วนสร้างสรรค์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "11.5”",
        label: "หน้าจอกว้างเต็มตา",
        detail: "พื้นที่มองเห็นกว้างขึ้นสำหรับงานและความบันเทิง",
      },
      {
        value: "2.5K",
        label: "พื้นที่ภาพคมชัด",
        detail: "รายละเอียดคมสะอาดเหมาะกับการดูงานและสตรีมมิง",
      },
      {
        value: "พร้อมใช้ปากกา",
        label: "เก็บไอเดียได้ทันที",
        detail: "พร้อมต่อยอดไปสู่การจดและสเก็ตช์งานสร้างสรรค์",
      },
      {
        value: "8000mAh",
        label: "พลังงานสำหรับพกพา",
        detail: "พกไปใช้งานนอกบ้านได้สบายขึ้นโดยไม่ต้องคอยหาไฟบ่อย",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "สตูดิโอพกพา",
        title: "บางพอสำหรับพกเดินทาง และประณีตพอสำหรับการนำเสนอ",
        description:
          "P68 ถูกวางคาแรกเตอร์เป็นแท็บเล็ตที่ดูสะอาดตาและมืออาชีพพอสำหรับการประชุม แต่ก็ยังมีความเบาและคล่องพอสำหรับการใช้งานสร้างสรรค์นอกสถานที่.",
        tone: "light",
        cards: [
          {
            title: "สัดส่วนกว้างที่สมดุล",
            description:
              "สัดส่วนตัวเครื่องเหมาะกับทั้งแนวตั้งและแนวนอนในงานจริง",
          },
          {
            title: "พื้นผิวที่เข้ากับโต๊ะทำงาน",
            description:
              "พื้นผิวและโทนสีช่วยให้วางคู่กับอุปกรณ์ทำงานแล้วดูเข้ากัน",
          },
          {
            title: "ความมั่นใจจากพื้นที่จอใหญ่",
            description:
              "ให้ความรู้สึกว่ามีพื้นที่พอสำหรับคิด เขียน และดูรายละเอียดงาน",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "สร้างสรรค์",
        eyebrow: "จังหวะสร้างสรรค์",
        title:
          "ตั้งแต่สเก็ตช์งานจนถึงดูสตรีม พื้นที่จอใหญ่เปลี่ยนจังหวะการใช้งาน",
        description:
          "ส่วนนี้ของหน้ารายละเอียดเน้นบรรยากาศการใช้งานแบบไลฟ์สไตล์สร้างสรรค์ ทั้งการจด วาด ดูภาพอ้างอิง เปิดหนัง หรือใช้เป็นหน้าจอเสริมระหว่างทำงาน.",
        tone: "dark",
        cards: [
          {
            title: "พื้นที่รวมไอเดีย",
            description:
              "เหมาะกับการเปิดภาพอ้างอิงหลายอย่างและสลับดูได้ไหลลื่น",
          },
          {
            title: "ดูสตรีมได้สบายตา",
            description:
              "ดูคอนเทนต์ยาว ๆ ได้เต็มตาและเหมาะกับการพักผ่อนหลังเลิกงาน",
          },
          {
            title: "ชุดสร้างสรรค์แบบพกพา",
            description:
              "ช่วยให้ชุดทำงานนอกสถานที่ดูครบขึ้นโดยไม่ต้องพกอุปกรณ์เยอะ",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "จังหวะจอใหญ่",
      title: "ประสบการณ์แท็บเล็ตที่ออกแบบให้ชัด นิ่ง และมีพื้นที่ให้คิด",
      description:
        "จังหวะของการเล่าเรื่องบนหน้านี้จึงใหญ่ขึ้น โล่งขึ้น และมีพื้นที่หายใจมากขึ้น เพื่อสื่อว่ารุ่นนี้ไม่ได้เป็นแค่มือถือจอใหญ่ แต่เป็นพื้นที่ทำงานอีกแบบหนึ่ง.",
      cards: [
        {
          title: "พร้อมสำหรับการนำเสนอ",
          description:
            "เหมาะกับการเปิดงานให้ลูกค้าดู หรือใช้แทนสมุดโน้ตดิจิทัลแบบจริงจัง",
        },
        {
          title: "คู่หูความบันเทิง",
          description:
            "ทำหน้าที่เป็นหน้าจอสำหรับดูหนัง ฟังเพลง และพักผ่อนหลังงานได้ดี",
        },
        {
          title: "ความคล่องตัวสำหรับงานสร้างสรรค์",
          description:
            "พกง่ายกว่าคอมในหลายสถานการณ์ แต่ยังให้พื้นที่ใช้งานมากพอ",
        },
      ],
    },
    finishes: [
      {
        name: "เกลเชียร์ซิลเวอร์",
        swatch: "#dfe4ec",
        description: "สีเงินสะอาดที่ดูโปรและเข้ากับโต๊ะทำงานทุกสไตล์",
      },
      {
        name: "มิสต์บลู",
        swatch: "#b7cee7",
        description: "น้ำเงินหม่นที่ช่วยให้รุ่นนี้ดูครีเอทีฟและไม่แข็งเกินไป",
      },
    ],
    specs: [
      {
        label: "หน้าจอ",
        value: "พื้นที่จอ 2.5K ขนาด 11.5 นิ้ว",
        description: "พื้นที่ใหญ่และคมชัดสำหรับงานดูงาน วาด และสตรีม",
      },
      {
        label: "แบตเตอรี่",
        value: "8000mAh สำหรับการพกพา",
        description: "รองรับการพกไปใช้งานนอกบ้านได้นานขึ้น",
      },
      {
        label: "การป้อนข้อมูล",
        value: "พร้อมใช้งานร่วมกับปากกา",
        description: "พร้อมต่อยอดกับการจดและสเก็ตช์เมื่อคุณต้องการ",
      },
      {
        label: "ตำแหน่งรุ่น",
        value: "แท็บเล็ตสำหรับไลฟ์สไตล์สร้างสรรค์",
        description:
          "เหมาะสำหรับงานสร้างสรรค์ การเรียน และความบันเทิงครบในเครื่องเดียว",
      },
    ],
    art: {
      hero: "/hero-detail/P68/hero.png",
      detail: "/phone/tab-p68.png",
      fallbackProduct: "/images/products/tab-p68-hero-draft.svg",
    },
  },
  default: {
    familyLabel: "อุปกรณ์พรีเมียมเอวีเอ",
    category: "อุปกรณ์อัจฉริยะ",
    theme: {
      page: "#ffffff",
      surface: "#ffffff",
      mutedSurface: "#ececec",
      ink: "#161616",
      mutedInk: "#666666",
      accent: "#4d6f8b",
      accentSoft: "rgba(77, 111, 139, 0.20)",
      accentStrong: "#2e465c",
      darkSurface: "#121417",
    },
    hero: {
      eyebrow: "เรื่องราวสินค้าเอวีเอ",
      label: "คอลเลกชันซิกเนเจอร์",
      spotlightWordmark: "AVA",
      headline: "การนำเสนอที่หรูและปรับเข้ากับอุปกรณ์ของคุณ",
      subheadline:
        "หน้ารายละเอียดที่ออกแบบให้ดึงชื่อ ภาพ และเรื่องเล่าจากข้อมูลกลางมาใช้งานได้ทันที",
      description:
        "หากรุ่นนี้ยังไม่มีแม่แบบเฉพาะ ระบบจะใช้เลย์เอาต์หรูแบบเดียวกันก่อน แล้วค่อยเติมข้อความหรือส่วนเฉพาะรุ่นภายหลังได้จากที่เดียว.",
      primaryCtaLabel: "ดูส่วนหลัก",
      secondaryCtaLabel: "กลับไปหน้ารวมสินค้า",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "พรีเมียม",
        label: "พร้อมจัดวาง",
        detail: "พร้อมจัดวางเล่าเรื่องสินค้าให้ดูพรีเมียมในทันที",
      },
      {
        value: "ยืดหยุ่น",
        label: "แยกส่วนชัดเจน",
        detail:
          "เหมาะกับการเพิ่มเนื้อหาภายหลังโดยไม่ต้องแก้หน้าโค้ดหลายจุด",
      },
      {
        value: "รวมศูนย์",
        label: "ข้อมูลต้นทางเดียว",
        detail: "ดึงข้อมูลการนำเสนอจากจุดกลางเพียงจุดเดียว",
      },
      {
        value: "ต่อยอดได้",
        label: "รองรับไลน์อัปใหม่",
        detail: "รองรับการต่อยอดไปยังรุ่นอื่นในอนาคตได้ง่าย",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "การนำเสนอพื้นฐาน",
        title: "แม่แบบประณีตที่พร้อมสำหรับอุปกรณ์พรีเมียมรุ่นถัดไป",
        description:
          "ส่วนนี้เป็นทางเลือกพื้นฐานหากรุ่นนั้นยังไม่มีข้อความเฉพาะ แต่ยังคงโครงสร้างหรูแบบเดียวกับรุ่นอื่นเพื่อให้ประสบการณ์คงเส้นคงวา.",
        tone: "light",
        cards: [
          {
            title: "การจัดวางที่ให้แบรนด์มาก่อน",
            description: "ทุกบล็อกยังจัดวางตามภาษาดีไซน์เดียวกัน",
          },
          {
            title: "ภาพที่ปรับเข้ากับแต่ละรุ่นได้",
            description: "พร้อมใส่ภาพเฉพาะรุ่นเมื่อมีไฟล์ภาพใหม่",
          },
          {
            title: "เรื่องเล่าที่แก้ไขได้ง่าย",
            description: "ปรับข้อความภายหลังจากข้อมูลกลางได้สะดวก",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "ไฮไลต์",
        eyebrow: "ส่วนซิกเนเจอร์",
        title: "ออกแบบให้ทุกรุ่นดูตั้งใจและสมบูรณ์",
        description:
          "โครงนี้ช่วยให้การออกแบบหน้ารายละเอียดสินค้าเป็นระบบมากขึ้น ทั้งเวลาเพิ่มสินค้าใหม่หรือปรับการเล่าเรื่องในอนาคต.",
        tone: "dark",
        cards: [
          {
            title: "ข้อมูลหลักเพียงจุดเดียว",
            description:
              "ข้อความ ภาพ และธีมของแต่ละส่วนอยู่ในข้อมูลกลางจุดเดียว",
          },
          {
            title: "จังหวะการเล่าที่หรูขึ้น",
            description:
              "จัดจังหวะหน้าให้มีภาพเปิด ไฮไลต์ คุณสมบัติ และสเปกแบบสินค้าเรือธง",
          },
          {
            title: "ปรับปรุงได้รวดเร็ว",
            description: "เพิ่มรุ่นหรือปรับธีมรายรุ่นได้เร็วขึ้นมาก",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "การเล่าเรื่องที่เป็นระบบ",
      title: "ฐานการนำเสนอที่สง่างามสำหรับสินค้ารุ่นอื่น",
      description:
        "หน้าแม่แบบนี้ช่วยให้สินค้ารุ่นถัดไปขึ้นโครงได้เร็วและยังรักษาความหรูของประสบการณ์หน้ารายละเอียดเอาไว้ได้ครบ.",
      cards: [
        {
          title: "ความรู้สึกของแบรนด์ที่สม่ำเสมอ",
          description: "ทุกหน้ามีจังหวะการเล่าเรื่องไปในทิศทางเดียวกัน",
        },
        {
          title: "ส่วนประกอบที่ยืดหยุ่น",
          description: "ย้ายหรือเพิ่มส่วนได้โดยไม่ต้องรื้อทั้งหน้า",
        },
        {
          title: "พร้อมรองรับไฟล์ภาพ",
          description:
            "พร้อมผูกภาพเฉพาะรุ่นได้ทันทีที่คุณมีไฟล์ใหม่",
        },
      ],
    },
    finishes: [
      {
        name: "นิวทรัลซิกเนเจอร์",
        swatch: "#d9d9d9",
        description: "โทนกลางสำหรับแม่แบบพื้นฐาน",
      },
    ],
    specs: [
      {
        label: "แม่แบบ",
        value: "หน้ารายละเอียดสินค้าพรีเมียม",
        description: "หน้ารายละเอียดสำหรับสินค้าเอวีเอทุกรุ่น",
      },
      {
        label: "แหล่งข้อมูล",
        value: "ข้อมูลโชว์เคสจุดเดียว",
        description: "ใช้ข้อมูลกลางเพียงจุดเดียวเป็นต้นทางในการจัดหน้า",
      },
      {
        label: "การต่อยอด",
        value: "พร้อมสำหรับรุ่นใหม่",
        description: "เพิ่มสินค้าใหม่ได้ง่ายด้วยค่าตั้งเฉพาะรุ่น",
      },
      {
        label: "ระบบภาพ",
        value: "ส่วนต่าง ๆ ตามธีมของรุ่น",
        description: "แยกธีมสีและจังหวะของแต่ละส่วนตามคาแรกเตอร์ของรุ่น",
      },
    ],
    art: {
      hero: "/images/products/promax-p89-hero-draft.svg",
      detail: "/images/products/promax-p89.png",
      fallbackProduct: "/images/products/promax-p89.png",
    },
  },
};

export function getProductModelKey(name: string): ProductModelKey {
  const normalizedName = name.toLowerCase();
  const matchedEntry = Object.entries(PRODUCT_PRESENTATION_IDENTITIES).find(
    ([modelKey, identity]) =>
      modelKey !== "default" &&
      identity.aliases.some((alias) => normalizedName.includes(alias))
  );

  return (matchedEntry?.[0] as ProductModelKey) || "default";
}

export function getProductPresentationTemplate(
  name: string
): ProductPresentationTemplate {
  return resolveProductPresentation(name).template;
}

export function getProductDisplayName(name: string): string {
  return resolveProductPresentation(name).modelName;
}

export function resolveProductPresentation(
  name: string
): ResolvedProductPresentation {
  const modelKey = getProductModelKey(name);

  return resolveProductPresentationByModelKey(modelKey);
}

export function resolveProductPresentationByModelKey(
  modelKey: ProductModelKey
): ResolvedProductPresentation {
  const identity =
    PRODUCT_PRESENTATION_IDENTITIES[modelKey] ||
    PRODUCT_PRESENTATION_IDENTITIES.default;

  return {
    modelKey,
    modelName: identity.modelName,
    template: PRODUCT_PRESENTATIONS[modelKey] || PRODUCT_PRESENTATIONS.default,
  };
}

export function isProductModelKey(
  value: string
): value is SupportedProductModelKey {
  return value in PRODUCT_PRESENTATIONS && value !== "default";
}
