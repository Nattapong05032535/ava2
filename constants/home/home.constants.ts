import type { StaticImageData } from "next/image";
import heroProduct1 from "@/public/main/้hero-product/1.webp";
import heroProduct2 from "@/public/main/้hero-product/2.webp";
import heroProduct3 from "@/public/main/้hero-product/3.webp";
import heroProduct4 from "@/public/main/้hero-product/4.webp";

export type HomeProduct = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  image: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  colors: string[];
};

export type HomeHeroProductCard = {
  id: string;
  modelName: string;
  image: StaticImageData;
  href: string;
};

export const HOME_HERO_PRODUCT_CARDS = [
  {
    id: "hero-product-1",
    modelName: "Pro Max P89",
    image: heroProduct1,
    href: "/products/promax-p89",
  },
  {
    id: "hero-product-2",
    modelName: "Pro Max P63",
    image: heroProduct2,
    href: "/products/promax-p63",
  },
  {
    id: "hero-product-3",
    modelName: "Note Cold P65",
    image: heroProduct3,
    href: "/products/note-p65",
  },
  {
    id: "hero-product-4",
    modelName: "Series Pro P65",
    image: heroProduct4,
    href: "/products/enjoy-p65",
  },
] satisfies HomeHeroProductCard[];

export const AVA_LINEUP: HomeProduct[] = [
  {
    id: "promax-p89",
    name: "AVA Life Pro Max P89",
    shortName: "Pro Max P89",
    tagline: "Intelligence in every detail.",
    image: "/products/smart_phone/P89.webp",
    price: "เริ่มที่ ฿24,990",
    originalPrice: "฿27,990",
    savings: "ประหยัด ฿3,000",
    colors: ["bg-black", "bg-gray-400", "bg-orange-400", "bg-blue-900"],
  },
  {
    id: "promax-p63",
    name: "AVA Life Pro Max P63",
    shortName: "Pro Max P63",
    tagline: "Streamlined luxury. Pro all day.",
    image: "/products/smart_phone/P63.webp",
    price: "เริ่มที่ ฿19,990",
    originalPrice: "฿22,990",
    savings: "ประหยัด ฿3,000",
    colors: ["bg-slate-800", "bg-slate-300", "bg-blue-200"],
  },
  {
    id: "note-p65",
    name: "AVA Life Note cold P65",
    shortName: "Note Cold P65",
    tagline: "Note everything. Anywhere.",
    image: "/products/smart_phone/P65C.webp",
    price: "เริ่มที่ ฿14,990",
    originalPrice: "฿16,990",
    savings: "ประหยัด ฿2,000",
    colors: ["bg-black", "bg-gray-300"],
  },
  {
    id: "enjoy-p65",
    name: "AVA Enjoy Series Pro P65",
    shortName: "Series Pro P65",
    tagline: "More fun. More power.",
    image: "/products/smart_phone/P65P.webp",
    price: "เริ่มที่ ฿9,990",
    originalPrice: "฿11,990",
    savings: "ประหยัด ฿2,000",
    colors: ["bg-black", "bg-blue-100"],
  },
  {
    id: "tab-p68",
    name: "AVA Life Tab Ultra P68",
    shortName: "Tab Ultra P68",
    tagline: "Pro creativity. Ultra portable.",
    image: "/products/tab_let/P68.webp",
    price: "เริ่มที่ ฿18,990",
    originalPrice: "฿21,990",
    savings: "ประหยัด ฿3,000",
    colors: ["bg-gray-700", "bg-blue-200", "bg-stone-200"],
  },
] as const;
