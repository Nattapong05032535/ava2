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
    aliases: ["ava note p65", "note p65", "note-p65", "note"],
  },
  "enjoy-p65": {
    modelName: "AVA Enjoy P65",
    aliases: ["ava enjoy p65", "enjoy p65", "enjoy-p65", "enjoy"],
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
    detail: "บริการหลังการขายโดยทีม AVA Official Store",
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
    familyLabel: "AVA Signature Flagship",
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
      label: "Flagship Design Story",
      spotlightWordmark: "P89",
      headline: "Engineered to look unmistakably expensive.",
      subheadline:
        "โครงสร้างระดับเรือธงที่ให้ความรู้สึกพรีเมียมตั้งแต่วินาทีแรกที่หยิบขึ้นมา",
      description:
        "P89 คือรุ่นที่เราออกแบบให้เป็นหน้าโชว์ของแบรนด์ ทั้งสัดส่วน วัสดุ และจังหวะของแสงเงาบนตัวเครื่องถูกจัดวางเพื่อให้ภาพรวมดูนิ่ง หรู และมีพลังในแบบเดียวกับหน้าสินค้าระดับ flagship.",
      primaryCtaLabel: "ดูสเปกเด่น",
      secondaryCtaLabel: "สำรวจรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "6.8”",
        label: "Immersive OLED",
        detail: "หน้าจอใหญ่เต็มตา พร้อมคอนทราสต์ลึกและโทนสีคมสะอาด",
      },
      {
        value: "120Hz",
        label: "Smooth Motion",
        detail: "การเลื่อนและการโต้ตอบลื่นไหลในทุกการใช้งาน",
      },
      {
        value: "50MP AI",
        label: "Signature Camera",
        detail: "ชุดกล้องที่ออกแบบมาเพื่อภาพคมชัดและโทนสกินสวยสมจริง",
      },
      {
        value: "67W",
        label: "Rapid Charge",
        detail: "เติมแบตเตอรี่ได้ไว เพื่อกลับเข้าสู่โหมดพร้อมใช้งานอย่างรวดเร็ว",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Design language",
        title: "Luxury silhouette with confident proportions.",
        description:
          "ภาษาดีไซน์ของ P89 เน้นเส้นสายที่สงบแต่หนักแน่น จึงดูหรูโดยไม่ต้องพยายามมาก ตัวเครื่องถูกออกแบบให้ดูนิ่ง เรียบ และมีมิติแบบสินค้ากลุ่มพรีเมียมสมัยใหม่.",
        quote:
          "วัสดุ การไล่เฉดสี และระยะขององค์ประกอบทุกจุด ถูกจัดให้ภาพรวมดูแพงในทันที",
        tone: "light",
        cards: [
          {
            eyebrow: "Finish",
            title: "Four signature finishes",
            description:
              "เลือกโทนที่ชัดเจนทั้ง Graphite, Pearl, Midnight Blue และ Solar Orange",
          },
          {
            eyebrow: "Build",
            title: "Soft-edge aluminum frame",
            description:
              "ขอบตัวเครื่องโค้งรับมืออย่างพอดี ให้สัมผัสเนียนและดู polished มากขึ้น",
          },
          {
            eyebrow: "Presence",
            title: "Camera deck as the hero",
            description:
              "พื้นที่กล้องถูกขยายและจัดองค์ประกอบให้กลายเป็นเอกลักษณ์หลักของรุ่นนี้",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "กล้อง",
        eyebrow: "Signature capability",
        title: "A camera-first flagship made for social, portrait and travel.",
        description:
          "จุดขายของ P89 คือการทำให้ภาพรวมของฮาร์ดแวร์กับคาแรกเตอร์ของกล้องเดินไปด้วยกัน ทั้งเรื่องรูปลักษณ์ โหมดถ่าย และงานคัลเลอร์ที่ให้บุคลิกดูชัด.",
        quote: "ภาพที่ได้ควรสวยตั้งแต่ตอนยกขึ้นถ่าย ไม่ใช่รอแก้ทีหลังทั้งหมด",
        tone: "dark",
        cards: [
          {
            eyebrow: "Main lens",
            title: "Balanced sharpness",
            description:
              "เน้นความคมที่พอดี รายละเอียดชัด แต่ยังคงผิวนวลและโทนแสงที่ดูแพง",
          },
          {
            eyebrow: "Portrait",
            title: "Depth with softness",
            description:
              "แยกตัวแบบได้ดีขึ้น พร้อมฉากหลังละลายที่ดูสะอาดไม่แข็งกระด้าง",
          },
          {
            eyebrow: "Night",
            title: "Low-light confidence",
            description:
              "ดึงแสงเงาในฉากกลางคืนให้ดูมีมิติ ลด noise และรักษาบรรยากาศเดิมไว้",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "Daily experience",
      title: "Flagship polish, from first unlock to late-night charging.",
      description:
        "หน้านี้ถูกออกแบบให้ขายทั้งฟอร์มและฟังก์ชัน จึงมี section ที่เล่าความรู้สึกเวลาใช้งานจริง ไม่ใช่แค่สเปกบนกระดาษ.",
      cards: [
        {
          title: "Premium unboxing",
          description:
            "เริ่มต้นความรู้สึกพรีเมียมตั้งแต่แพ็กเกจจนถึงการวางเครื่องบนแท่นชาร์จข้างเตียง",
        },
        {
          title: "Balanced performance",
          description:
            "ใช้งานลื่นในการสลับแอป เล่นคอนเทนต์ และถ่ายภาพต่อเนื่องตลอดวัน",
        },
        {
          title: "Signature color identity",
          description:
            "สี Solar Orange ถูกวางให้เป็นฮีโร่ของรุ่น ช่วยสร้างการจดจำแบรนด์ได้ทันที",
        },
      ],
    },
    finishes: [
      {
        name: "Solar Orange",
        swatch: "#df8b43",
        description:
          "สีไฮไลต์ของคอลเลกชัน ให้บุคลิกหรู กล้า และเห็นได้ชัดในทันที",
      },
      {
        name: "Midnight Blue",
        swatch: "#25314f",
        description: "โทนเข้มที่ดูสุขุมและร่วมสมัย เหมาะกับการใช้งานทุกวัน",
      },
      {
        name: "Pearl White",
        swatch: "#f2eee8",
        description:
          "ขาวมุกเนียนตา ดูสะอาด ละมุน และสะท้อนงานประกอบได้ชัด",
      },
      {
        name: "Graphite Black",
        swatch: "#262626",
        description: "ดำกราไฟต์สำหรับลุคเท่ เรียบ และ professional",
      },
    ],
    specs: [
      {
        label: "Display",
        value: "6.8-inch OLED 120Hz",
        description: "ให้ภาพไหลลื่น คม และดูเต็มพื้นที่ในทุกคอนเทนต์หลัก",
      },
      {
        label: "Chipset",
        value: "Flagship-class 5G",
        description: "รองรับการใช้งานหนักและการสลับงานรวดเร็วได้อย่างต่อเนื่อง",
      },
      {
        label: "Camera",
        value: "50MP main + pro portrait tuning",
        description:
          "เน้นภาพบุคคล ภาพเดินทาง และภาพไลฟ์สไตล์ที่โทนดูพรีเมียม",
      },
      {
        label: "Battery",
        value: "Fast charge 67W",
        description: "เติมพลังได้ไวและเหมาะกับคนที่ต้องการพร้อมใช้งานเสมอ",
      },
    ],
    art: {
      hero: "/images/products/p89-hero-premium.svg",
      detail: "/phone/promax-p89.png",
      fallbackProduct: "/images/products/promax-p89.png",
    },
  },
  "promax-p63": {
    familyLabel: "AVA Pro Series",
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
      label: "Everyday Luxury",
      spotlightWordmark: "P63",
      headline: "Sharper lines. Lighter presence. Pro all day.",
      subheadline:
        "รุ่นที่เน้นภาพลักษณ์พรีเมียมแบบสุขุม เหมาะกับคนที่ชอบเรือธงลุคเรียบและคล่องตัว",
      description:
        "P63 ถูกออกแบบให้มีความเป็น pro ที่เข้าถึงง่ายขึ้น ลุคโดยรวมจึงออกไปทางโมเดิร์น เนี้ยบ และพร้อมพกพาในทุกวันโดยยังคงคาแรกเตอร์ระดับบนของซีรีส์ไว้ชัดเจน.",
      primaryCtaLabel: "ดูประสบการณ์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "6.6”",
        label: "Slim-bezel display",
        detail: "ขอบจอบางเพื่อภาพรวมที่ทันสมัยและรู้สึกโปร่งขึ้นในมือ",
      },
      {
        value: "5G",
        label: "Always connected",
        detail: "พร้อมสำหรับการใช้งานที่ต้องการความเร็วและเสถียรภาพในทุกวัน",
      },
      {
        value: "50MP",
        label: "Everyday clarity",
        detail: "ได้ภาพคมและโทนธรรมชาติ เหมาะกับการใช้งานตั้งแต่เช้าจรดค่ำ",
      },
      {
        value: "5000mAh",
        label: "Long endurance",
        detail:
          "แบตเตอรี่ที่พอสำหรับการทำงาน ความบันเทิง และการเดินทางหนึ่งวันเต็ม",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Refined profile",
        title: "A quieter design for people who like their premium subtle.",
        description:
          "ดีไซน์ของ P63 ลดความหวือหวาลง แล้วไปเพิ่มคุณค่าที่สัดส่วน การเก็บงาน และโทนสีที่ดูสะอาดขึ้นแทน จึงเหมาะกับผู้ใช้ที่ชอบความหรูแบบไม่ตะโกน.",
        tone: "light",
        cards: [
          {
            title: "Contoured frame",
            description:
              "ขอบเครื่องรับกับอุ้งมือได้ดี พกพาง่ายและดูเรียบเนียนในทุกมุม",
          },
          {
            title: "Neutral luxury palette",
            description:
              "โทนสีที่คุมอารมณ์ให้นิ่ง ทำให้ภาพรวมดูเป็นมืออาชีพมากขึ้น",
          },
          {
            title: "Balanced camera geometry",
            description:
              "เลนส์และโมดูลกล้องถูกจัดวางแบบสมดุล เหมาะกับงานดีไซน์ที่ต้องการความเนี้ยบ",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "พลัง",
        eyebrow: "Everyday power",
        title: "Built for long workdays and clean visual performance.",
        description:
          "เราออกแบบหน้าสินค้าของรุ่นนี้ให้เล่าเรื่องพลังการใช้งานในชีวิตจริง ทั้งงานเอกสาร ประชุมออนไลน์ ถ่ายภาพ และดูคอนเทนต์ โดยไม่ทำให้ลุคโดยรวมเสียความเรียบหรู.",
        tone: "dark",
        cards: [
          {
            title: "Fast app switching",
            description: "รองรับงานสลับหลายแอปได้คล่องและนิ่งขึ้น",
          },
          {
            title: "Comfort viewing",
            description:
              "จอภาพถูกจูนให้ใช้งานนานแล้วสบายตาและดูสะอาดบนพื้นหลังสว่าง",
          },
          {
            title: "Confident battery life",
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
      eyebrow: "Lifestyle fit",
      title: "A premium phone made to disappear into your routine beautifully.",
      description:
        "P63 ไม่ได้พยายามเป็นรุ่นที่หวือหวาที่สุด แต่ถูกวางให้เป็นรุ่นที่อยู่กับการใช้งานประจำวันได้อย่างกลมกลืนและดูดีตลอดเวลา.",
      cards: [
        {
          title: "Business-ready look",
          description:
            "เหมาะกับการใช้งานที่ต้องการภาพลักษณ์สุภาพ เนี้ยบ และเป็นมืออาชีพ",
        },
        {
          title: "Clean interface moments",
          description:
            "เหมาะกับ UX ที่ชอบความเรียบง่าย อ่านง่าย และสัมผัสลื่นมือ",
        },
        {
          title: "Easy carry profile",
          description:
            "น้ำหนักและสัดส่วนเอื้อต่อการพกพาทั้งวันแบบไม่รู้สึกเกะกะ",
        },
      ],
    },
    finishes: [
      {
        name: "Titan Gray",
        swatch: "#5d646b",
        description: "สีเทาเข้มสำหรับลุคเรียบหรูและมั่นคง",
      },
      {
        name: "Steel Blue",
        swatch: "#53657d",
        description: "น้ำเงินอมเท้าให้ความรู้สึกทันสมัยและดูโปร",
      },
    ],
    specs: [
      {
        label: "Display",
        value: "6.6-inch FHD+ panel",
        description: "จอใหญ่กำลังดีสำหรับการทำงานและความบันเทิง",
      },
      {
        label: "Camera",
        value: "50MP main camera",
        description: "ถ่ายภาพกลางวันคม รายละเอียดดี และใช้งานง่าย",
      },
      {
        label: "Battery",
        value: "5000mAh long-life",
        description: "รองรับวันใช้งานแน่น ๆ ได้มั่นใจมากขึ้น",
      },
      {
        label: "Positioning",
        value: "Pro for everyday carry",
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
    familyLabel: "AVA Note Series",
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
      label: "Focused productivity",
      spotlightWordmark: "NOTE",
      headline: "A calmer phone for sharper thinking.",
      subheadline:
        "รุ่นที่วางคาแรกเตอร์ให้เหมาะกับคนทำงาน คิดงาน และจดทุกไอเดียได้ลื่นขึ้นตลอดวัน",
      description:
        "Note P65 ถูกออกแบบให้ดูสะอาด โปร่ง และไม่รบกวนสายตา เพื่อให้เหมาะกับการอ่าน การจด การตอบแชตงาน และการใช้งานต่อเนื่องยาวนานในทุกวัน.",
      primaryCtaLabel: "ดู section ทำงาน",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "108MP",
        label: "Detail-friendly camera",
        detail: "เหมาะกับการเก็บภาพเอกสาร งานประชุม และชีวิตประจำวัน",
      },
      {
        value: "5000mAh",
        label: "All-day battery",
        detail: "ออกแบบมาให้รับมือกับวันทำงานที่ยาวและต่อเนื่อง",
      },
      {
        value: "Large screen",
        label: "Reading comfort",
        detail: "พื้นที่แสดงผลที่เหมาะกับเอกสาร บทความ และงานอ่านยาว",
      },
      {
        value: "AI Notes",
        label: "Productivity-first",
        detail: "พร้อมต่อยอดกับ workflow สายจดและจัดการงาน",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Quiet luxury",
        title: "Minimal by intention, so your focus stays on what matters.",
        description:
          "งานออกแบบของ Note P65 ใช้โทนขาวสะอาดและเส้นสายที่เนียนเพื่อลดความรู้สึกวุ่นวาย ทำให้เหมาะกับคนที่ต้องการอุปกรณ์ที่ดูโปรแต่ไม่หนักเกินไปในเชิงภาพลักษณ์.",
        tone: "light",
        cards: [
          {
            title: "Soft white finish",
            description:
              "โทนสีสะอาดช่วยให้ตัวเครื่องดูเบา เรียบ และเข้ากับทุกสภาพแวดล้อม",
          },
          {
            title: "Reading-first display feel",
            description:
              "เลย์เอาต์บนหน้า detail ถูกวางให้สื่อถึงความนิ่ง อ่านง่าย และใช้งานจริงได้นาน",
          },
          {
            title: "Understated camera layout",
            description:
              "ชุดกล้องถูกออกแบบให้ร่วมกับตัวเครื่องแบบกลมกลืน ไม่เด่นเกินความจำเป็น",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "โฟกัส",
        eyebrow: "Work mode",
        title:
          "A device that supports long hours of reading, writing and planning.",
        description:
          "หัวใจของรุ่นนี้คือการทำให้ช่วงเวลาทำงานรู้สึก flow มากขึ้น ตั้งแต่ตอนเปิดอ่าน brief จดสิ่งสำคัญ ไปจนถึงตอบกลับงานก่อนจบวัน.",
        tone: "dark",
        cards: [
          {
            title: "Long-form reading",
            description:
              "อ่านบทความหรือเอกสารยาว ๆ ได้สบายขึ้นด้วยการจัดการพื้นที่หน้าจอที่ลงตัว",
          },
          {
            title: "Quick capture",
            description:
              "หยิบขึ้นมาถ่ายเอกสารหรือบันทึกไวท์บอร์ดได้ทันทีเมื่อมีไอเดียใหม่",
          },
          {
            title: "Routine-friendly battery",
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
      eyebrow: "Practical luxury",
      title: "Less noise. More room for your routine.",
      description:
        "ประสบการณ์ของ Note P65 เน้นความพอดีในการใช้งานจริงมากกว่าการโชว์พลังสุดโต่ง ทำให้รุ่นนี้เหมาะกับคนที่ให้ค่ากับความนิ่งและความสม่ำเสมอ.",
      cards: [
        {
          title: "Desk-to-go flow",
          description:
            "ใช้งานได้ดีทั้งที่โต๊ะทำงาน ระหว่างเดินทาง และในช่วงพักระหว่างวัน",
        },
        {
          title: "Clean content view",
          description:
            "ตัวอักษร ภาพ และองค์ประกอบบนหน้าจอถูกมองได้สบายในระยะเวลานานขึ้น",
        },
        {
          title: "Trusted daily tool",
          description:
            "ตอบโจทย์คนที่ต้องการมือถือไว้ทำงานได้จริงทุกวันโดยไม่ต้องคิดมาก",
        },
      ],
    },
    finishes: [
      {
        name: "Cloud White",
        swatch: "#f3f4f2",
        description: "โทนขาวสะอาดที่ช่วยให้ตัวเครื่องดูเบาและเรียบหรู",
      },
      {
        name: "Slate Black",
        swatch: "#2f3133",
        description: "ตัวเลือกที่ดูนิ่ง เหมาะกับงานและการใช้งานทุกสถานการณ์",
      },
    ],
    specs: [
      {
        label: "Camera",
        value: "108MP detail capture",
        description: "เก็บภาพเอกสารและงานประจำวันได้คมชัดมากขึ้น",
      },
      {
        label: "Battery",
        value: "5000mAh endurance",
        description: "รองรับวันใช้งานต่อเนื่องได้ดีโดยไม่ต้องกังวลมาก",
      },
      {
        label: "Positioning",
        value: "Productivity-focused phone",
        description: "เหมาะสำหรับคนอ่าน เขียน วางแผน และตอบงานบ่อย",
      },
      {
        label: "Display feel",
        value: "Comfort-first large panel",
        description: "ช่วยให้การอ่านและการดูเนื้อหาต่อเนื่องลื่นไหลขึ้น",
      },
    ],
    art: {
      hero: "/images/products/note-p65-hero-draft.svg",
      detail: "/phone/note-p65.png",
      fallbackProduct: "/images/products/note-p65.png",
    },
  },
  "enjoy-p65": {
    familyLabel: "AVA Enjoy Series",
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
      label: "Everyday fun, elevated",
      spotlightWordmark: "ENJOY",
      headline: "A brighter personality for people who live on content.",
      subheadline:
        "สมาร์ทโฟนที่วางอารมณ์ให้สดขึ้น ใช้ง่ายขึ้น และดูเป็นมิตรกับการใช้งานทุกวัน",
      description:
        "Enjoy P65 คือรุ่นที่ให้พลังบวกกับประสบการณ์บนมือถือ ตั้งแต่ดีไซน์ โทนสี ไปจนถึงจังหวะของหน้า detail ที่เน้นความสนุก ความสว่าง และการใช้งานบันเทิงที่ลื่นมือ.",
      primaryCtaLabel: "ดูไฮไลต์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "90Hz",
        label: "Fluid scrolling",
        detail: "เลื่อนคอนเทนต์และโซเชียลได้ลื่นขึ้นในทุกวัน",
      },
      {
        value: "50MP",
        label: "Share-ready shots",
        detail: "เหมาะกับการถ่ายรูปและโพสต์ได้ทันทีโดยไม่ซับซ้อน",
      },
      {
        value: "Stereo",
        label: "Entertainment focus",
        detail: "เติมมิติให้การดูซีรีส์ ฟังเพลง และเล่นคอนเทนต์สั้น",
      },
      {
        value: "Fast charge",
        label: "Quick top-up",
        detail: "เสียบชาร์จไม่นานก็กลับมาใช้งานต่อได้สะดวก",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Playful luxury",
        title: "Designed to feel fresh, not ordinary.",
        description:
          "Enjoy P65 ใช้แนวทางงานออกแบบที่เบากว่าและสว่างกว่า แต่ยังรักษาความเป็นสินค้า premium ผ่านพื้นผิว แสงเงา และองค์ประกอบที่เรียบร้อยขึ้นกว่าระดับราคาทั่วไป.",
        tone: "light",
        cards: [
          {
            title: "Friendly color story",
            description:
              "โทนสีของรุ่นนี้ช่วยให้ภาพรวมดู approachable และมีพลัง",
          },
          {
            title: "Rounded comfort",
            description:
              "สัดส่วนและมุมโค้งของตัวเครื่องช่วยให้ถือใช้งานได้นานแบบสบายมือ",
          },
          {
            title: "Content-first presence",
            description:
              "ดีไซน์เน้นให้ตัวเครื่องดูพร้อมสำหรับความบันเทิงในทันที",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "ความบันเทิง",
        eyebrow: "Entertainment mode",
        title: "Made for feeds, music, reels and everything in between.",
        description:
          "หน้าสินค้าของรุ่นนี้เน้นขายอารมณ์ในการใช้งานจริงกับโซเชียลและคอนเทนต์ จึงใช้ copy และจังหวะ section ที่เบา สนุก และเห็นภาพการใช้งานได้ง่าย.",
        tone: "dark",
        cards: [
          {
            title: "Feed-friendly smoothness",
            description: "ตอบสนองการเลื่อนหน้าจอและสลับคอนเทนต์ได้ไวขึ้น",
          },
          {
            title: "Loud and clear playback",
            description:
              "เหมาะกับคนที่ใช้มือถือเป็นหน้าจอความบันเทิงหลักในแต่ละวัน",
          },
          {
            title: "Quick social capture",
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
      eyebrow: "Daylight energy",
      title: "Built to make everyday digital life feel lighter and more alive.",
      description:
        "รุ่นนี้เหมาะกับผู้ใช้ที่ต้องการมือถือที่ดูดี ใช้งานสนุก และให้ความรู้สึกบวกแบบต่อเนื่องทั้งวันโดยไม่ต้องเป็นสายสเปกสุดโต่ง.",
      cards: [
        {
          title: "Social-first routine",
          description:
            "เหมาะกับคนที่อยู่กับการดูคอนเทนต์ อัปเดตเทรนด์ และแชตกับเพื่อนบ่อย",
        },
        {
          title: "Portable and cheerful",
          description:
            "รูปทรงและสีช่วยให้มือถือดูเป็นส่วนหนึ่งของลุคได้อย่างง่ายดาย",
        },
        {
          title: "Easy premium feel",
          description:
            "ได้บรรยากาศพรีเมียมแบบเข้าถึงง่าย เหมาะกับผู้ใช้วงกว้างมากขึ้น",
        },
      ],
    },
    finishes: [
      {
        name: "Ice Blue",
        swatch: "#cfe6ff",
        description: "สีน้ำเงินอ่อนที่ให้ภาพจำสดใสและร่วมสมัย",
      },
      {
        name: "Midnight",
        swatch: "#202835",
        description: "โทนเข้มสำหรับคนที่ชอบความนิ่งแต่ยังอยากได้คาแรกเตอร์ชัด",
      },
    ],
    specs: [
      {
        label: "Display",
        value: "Smooth 90Hz panel",
        description: "ลื่นกำลังดีสำหรับโซเชียลและคอนเทนต์ประจำวัน",
      },
      {
        label: "Camera",
        value: "50MP share-ready",
        description: "ได้ภาพที่พร้อมแชร์โดยโทนภาพใช้งานง่าย",
      },
      {
        label: "Audio",
        value: "Stereo playback",
        description: "เพิ่มอรรถรสให้การดูวิดีโอและฟังเพลงมากขึ้น",
      },
      {
        label: "Positioning",
        value: "Lifestyle entertainment",
        description: "เหมาะกับคนที่เน้นความสนุกและความคล่องในทุกวัน",
      },
    ],
    art: {
      hero: "/images/products/enjoy-p65-hero-draft.svg",
      detail: "/phone/enjoy-p65.png",
      fallbackProduct: "/images/products/enjoy-p65-hero-draft.svg",
    },
  },
  "tab-p68": {
    familyLabel: "AVA Life Tab",
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
      label: "Creative canvas",
      spotlightWordmark: "TAB",
      headline: "A larger, quieter canvas for ideas in motion.",
      subheadline:
        "แท็บเล็ตที่ถูกวางบทบาทให้เหมาะกับทั้งงานสร้างสรรค์ ความบันเทิง และ productivity แบบพกพา",
      description:
        "P68 เน้นความรู้สึกของพื้นที่ใช้งานที่กว้างขึ้น หายใจสะดวกขึ้น และพร้อมสำหรับการดูงาน วาดไอเดีย พรีเซนต์ หรือปล่อยให้เป็นหน้าจอความบันเทิงคู่วันของคุณ.",
      primaryCtaLabel: "ดู section สร้างสรรค์",
      secondaryCtaLabel: "ดูรุ่นอื่น",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "11.5”",
        label: "Expansive display",
        detail: "พื้นที่มองเห็นกว้างขึ้นสำหรับงานและความบันเทิง",
      },
      {
        value: "2.5K",
        label: "Sharper canvas",
        detail: "รายละเอียดคมสะอาดเหมาะกับการดูงานและสตรีมมิง",
      },
      {
        value: "Stylus ready",
        label: "Idea capture",
        detail: "พร้อมต่อยอดไปสู่การจดและสเก็ตช์งานสร้างสรรค์",
      },
      {
        value: "8000mAh",
        label: "Portable endurance",
        detail: "พกไปใช้งานนอกบ้านได้สบายขึ้นโดยไม่ต้องคอยหาไฟบ่อย",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Portable studio",
        title: "Thin enough to travel. Refined enough to present with.",
        description:
          "P68 ถูกวางคาแรกเตอร์เป็นแท็บเล็ตที่ดู clean และมืออาชีพพอสำหรับการประชุม แต่ก็ยังมีความเบาและคล่องพอสำหรับการใช้งานสร้างสรรค์นอกสถานที่.",
        tone: "light",
        cards: [
          {
            title: "Balanced wide form",
            description:
              "สัดส่วนตัวเครื่องเหมาะกับทั้งแนวตั้งและแนวนอนในงานจริง",
          },
          {
            title: "Desk-worthy finish",
            description:
              "พื้นผิวและโทนสีช่วยให้วางคู่กับอุปกรณ์ทำงานแล้วดูเข้ากัน",
          },
          {
            title: "Large-view confidence",
            description:
              "ให้ความรู้สึกว่ามีพื้นที่พอสำหรับคิด เขียน และดูรายละเอียดงาน",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "สร้างสรรค์",
        eyebrow: "Creative flow",
        title:
          "From sketch to streaming, the larger canvas changes the rhythm.",
        description:
          "ส่วนนี้ของหน้า detail เน้นบรรยากาศการใช้งานแบบ creative lifestyle ทั้งการจด วาด ดู reference เปิดหนัง หรือใช้เป็นหน้าจอเสริมระหว่างทำงาน.",
        tone: "dark",
        cards: [
          {
            title: "Idea board moments",
            description:
              "เหมาะกับการเปิด reference หลายอย่างและสลับดูได้ไหลลื่น",
          },
          {
            title: "Streaming with comfort",
            description:
              "ดูคอนเทนต์ยาว ๆ ได้เต็มตาและเหมาะกับการพักผ่อนหลังเลิกงาน",
          },
          {
            title: "Portable creative setup",
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
      eyebrow: "Large-screen rhythm",
      title: "A tablet experience designed around clarity, calm and room to think.",
      description:
        "จังหวะของการเล่าเรื่องบนหน้านี้จึงใหญ่ขึ้น โล่งขึ้น และมีพื้นที่หายใจมากขึ้น เพื่อสื่อว่ารุ่นนี้ไม่ได้เป็นแค่มือถือจอใหญ่ แต่เป็นพื้นที่ทำงานอีกแบบหนึ่ง.",
      cards: [
        {
          title: "Presentation-ready",
          description:
            "เหมาะกับการเปิดงานให้ลูกค้าดู หรือใช้แทนสมุดโน้ตดิจิทัลแบบจริงจัง",
        },
        {
          title: "Entertainment companion",
          description:
            "ทำหน้าที่เป็นหน้าจอสำหรับดูหนัง ฟังเพลง และพักผ่อนหลังงานได้ดี",
        },
        {
          title: "Creative mobility",
          description:
            "พกง่ายกว่าคอมในหลายสถานการณ์ แต่ยังให้พื้นที่ใช้งานมากพอ",
        },
      ],
    },
    finishes: [
      {
        name: "Glacier Silver",
        swatch: "#dfe4ec",
        description: "สีเงินสะอาดที่ดูโปรและเข้ากับโต๊ะทำงานทุกสไตล์",
      },
      {
        name: "Mist Blue",
        swatch: "#b7cee7",
        description: "น้ำเงินหม่นที่ช่วยให้รุ่นนี้ดูครีเอทีฟและไม่แข็งเกินไป",
      },
    ],
    specs: [
      {
        label: "Display",
        value: "11.5-inch 2.5K canvas",
        description: "พื้นที่ใหญ่และคมชัดสำหรับงานดูงาน วาด และสตรีม",
      },
      {
        label: "Battery",
        value: "8000mAh portable endurance",
        description: "รองรับการพกไปใช้งานนอกบ้านได้นานขึ้น",
      },
      {
        label: "Input",
        value: "Stylus-ready workflow",
        description: "พร้อมต่อยอดกับการจดและสเก็ตช์เมื่อคุณต้องการ",
      },
      {
        label: "Positioning",
        value: "Creative lifestyle tablet",
        description:
          "เหมาะสำหรับงานสร้างสรรค์ การเรียน และความบันเทิงครบในเครื่องเดียว",
      },
    ],
    art: {
      hero: "/images/products/tab-p68-hero-draft.svg",
      detail: "/phone/tab-p68.png",
      fallbackProduct: "/images/products/tab-p68-hero-draft.svg",
    },
  },
  default: {
    familyLabel: "AVA Premium Device",
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
      eyebrow: "AVA Product Story",
      label: "Signature collection",
      spotlightWordmark: "AVA",
      headline: "Luxury presentation, tailored around your device.",
      subheadline:
        "หน้า detail ที่ออกแบบให้ดึงชื่อ ภาพ และเรื่องเล่าจาก action กลางมาใช้งานได้ทันที",
      description:
        "หากรุ่นนี้ยังไม่มี template เฉพาะ ระบบจะใช้เลย์เอาต์หรูแบบเดียวกันก่อน แล้วค่อยเติม copy หรือ section เฉพาะรุ่นภายหลังได้จากที่เดียว.",
      primaryCtaLabel: "ดู section หลัก",
      secondaryCtaLabel: "กลับไปหน้ารวมสินค้า",
    },
    serviceBadges: DEFAULT_SERVICE_BADGES,
    stats: [
      {
        value: "Premium",
        label: "Layout-ready",
        detail: "พร้อมจัดวางเล่าเรื่องสินค้าให้ดูพรีเมียมในทันที",
      },
      {
        value: "Flexible",
        label: "Section-driven",
        detail:
          "เหมาะกับการเพิ่ม content ภายหลังโดยไม่ต้องแก้หน้า JSX หลายจุด",
      },
      {
        value: "Unified",
        label: "Single action source",
        detail: "ดึงข้อมูล presentation จาก action กลางเพียงจุดเดียว",
      },
      {
        value: "Scalable",
        label: "Future lineup",
        detail: "รองรับการต่อยอดไปยังรุ่นอื่นในอนาคตได้ง่าย",
      },
    ],
    sections: [
      {
        id: "design",
        navLabel: "ดีไซน์",
        eyebrow: "Default presentation",
        title: "A polished template ready for your next premium device.",
        description:
          "section นี้เป็น fallback หากรุ่นนั้นยังไม่มี copy เฉพาะ แต่ยังคงโครงสร้างหรูแบบเดียวกับรุ่นอื่นเพื่อให้ประสบการณ์คงเส้นคงวา.",
        tone: "light",
        cards: [
          {
            title: "Brand-first composition",
            description: "ทุกบล็อกยังจัดวางตามภาษาดีไซน์เดียวกัน",
          },
          {
            title: "Adaptable imagery",
            description: "พร้อมใส่ภาพเฉพาะรุ่นเมื่อมี asset ใหม่",
          },
          {
            title: "Editable story",
            description: "ปรับข้อความภายหลังจาก action กลางได้สะดวก",
          },
        ],
        visualRole: "detail",
      },
      {
        id: "signature",
        navLabel: "ไฮไลต์",
        eyebrow: "Signature section",
        title: "Designed so every model can feel considered and complete.",
        description:
          "โครงนี้ช่วยให้การออกแบบหน้า product detail เป็นระบบมากขึ้น ทั้งเวลาเพิ่มสินค้าใหม่หรือปรับการเล่าเรื่องในอนาคต.",
        tone: "dark",
        cards: [
          {
            title: "Single source of truth",
            description:
              "ข้อความ ภาพ และธีมของแต่ละ section อยู่ใน action กลางจุดเดียว",
          },
          {
            title: "Luxury pacing",
            description:
              "จัดจังหวะ page ให้มี hero, spotlight, features และ specs แบบสินค้า flagship",
          },
          {
            title: "Fast iteration",
            description: "เพิ่มรุ่นหรือปรับ theme รายรุ่นได้เร็วขึ้นมาก",
          },
        ],
        visualRole: "detail",
      },
    ],
    experience: {
      id: "experience",
      navLabel: "ประสบการณ์",
      eyebrow: "Structured storytelling",
      title: "An elegant baseline for the rest of the catalog.",
      description:
        "หน้า template นี้ช่วยให้สินค้ารุ่นถัดไปขึ้นโครงได้เร็วและยังรักษาความหรูของประสบการณ์หน้า detail เอาไว้ได้ครบ.",
      cards: [
        {
          title: "Consistent brand feel",
          description: "ทุกหน้ามีจังหวะการเล่าเรื่องไปในทิศทางเดียวกัน",
        },
        {
          title: "Modular sections",
          description: "ย้ายหรือเพิ่ม section ได้โดยไม่ต้องรื้อทั้งหน้า",
        },
        {
          title: "Asset ready",
          description:
            "พร้อมผูกภาพเฉพาะรุ่นได้ทันทีที่คุณมีไฟล์ใหม่",
        },
      ],
    },
    finishes: [
      {
        name: "Signature Neutral",
        swatch: "#d9d9d9",
        description: "โทนกลางสำหรับ fallback template",
      },
    ],
    specs: [
      {
        label: "Template",
        value: "Luxury product detail",
        description: "หน้า detail สำหรับสินค้า AVA ทุกรุ่น",
      },
      {
        label: "Data source",
        value: "Single showcase action",
        description: "ใช้ action เดียวเป็นต้นทางในการจัดหน้า",
      },
      {
        label: "Scalability",
        value: "Ready for new models",
        description: "เพิ่มสินค้าใหม่ได้ง่ายด้วย config เฉพาะรุ่น",
      },
      {
        label: "Visual system",
        value: "Theme-based sections",
        description: "แยกธีมสีและจังหวะ section ตามคาแรกเตอร์ของรุ่น",
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
