import { Smartphone, Tablet, Headphones, Phone, Star, Sparkles, ShieldPlus, Truck, CreditCard, ShieldCheck, Wrench, ArrowRightLeft } from "lucide-react";
import { type SupportedProductModelKey } from "@/constants/products";

export type Category = "recommended" | "smartphone" | "tablet" | "feature-phone" | "accessory";

export const CATEGORIES: { id: Category; label: string; icon: any }[] = [
  { id: "recommended", label: "สินค้าแนะนำ", icon: Star },
  { id: "smartphone", label: "สมาร์ทโฟน", icon: Smartphone },
  { id: "tablet", label: "แทปเลท", icon: Tablet },
  { id: "feature-phone", label: "โทรศัพอาม่า", icon: Phone },
  { id: "accessory", label: "อุปกรณ์เสริม", icon: Headphones },
];

export type StorageOption = {
  label: string;
  selected?: boolean;
};

export type ShopMockProduct = {
  modelKey: SupportedProductModelKey;
  basePrice: string;
  basePriceValue: number;
  monthlyPrice: string;
  promo: string;
  badge: string;
  image: string;
  stock: string;
  shipping: string;
  category: Category;
  storageOptions: StorageOption[];
};

export const SHOP_PRODUCTS: ShopMockProduct[] = [
  {
    modelKey: "promax-p89",
    basePrice: "฿24,990",
    basePriceValue: 24990,
    monthlyPrice: "฿2,290 / เดือน",
    promo: "ผ่อน 0% 10 เดือน และรับประกันตัวเครื่อง 24 เดือน",
    badge: "Flagship pick",
    image: "/phone/promax-p89.png",
    stock: "พร้อมส่งภายใน 24 ชม.",
    shipping: "ส่งฟรีทั่วประเทศ",
    category: "smartphone",
    storageOptions: [
      { label: "256 GB" },
      { label: "512 GB", selected: true },
      { label: "1 TB" },
    ],
  },
  {
    modelKey: "promax-p63",
    basePrice: "฿19,990",
    basePriceValue: 19990,
    monthlyPrice: "฿1,890 / เดือน",
    promo: "รับส่วนลดเปิดตัว ฿2,000 สำหรับลูกค้าที่สั่งจองล่วงหน้า",
    badge: "Luxury everyday",
    image: "/phone/promax-p63.png",
    stock: "สีฮิตใกล้หมด",
    shipping: "รับหน้าร้านได้",
    category: "smartphone",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
  {
    modelKey: "note-p65",
    basePrice: "฿14,990",
    basePriceValue: 14990,
    monthlyPrice: "฿1,390 / เดือน",
    promo: "รวมของแถมชุดปากกาและฟิล์มกันรอยในคำสั่งซื้อ mock นี้",
    badge: "Work smart",
    image: "/phone/note-p65.png",
    stock: "พร้อมส่ง",
    shipping: "จัดส่งฟรี + COD",
    category: "smartphone",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
  {
    modelKey: "enjoy-p65",
    basePrice: "฿9,990",
    basePriceValue: 9990,
    monthlyPrice: "฿990 / เดือน",
    promo: "โปรโมชันผ่อนสบายและเหมาะกับผู้ใช้งานทั่วไปที่อยากได้เครื่องคุ้มค่า",
    badge: "Best value",
    image: "/phone/enjoy-p65.png",
    stock: "พร้อมส่ง",
    shipping: "ส่งฟรีทั่วประเทศ",
    category: "smartphone",
    storageOptions: [
      { label: "128 GB", selected: true },
      { label: "256 GB" },
    ],
  },
  {
    modelKey: "tab-p68",
    basePrice: "฿18,990",
    basePriceValue: 18990,
    monthlyPrice: "฿1,790 / เดือน",
    promo: "เหมาะกับสาย productivity และครีเอเตอร์ที่ต้องการแท็บเล็ตจอใหญ่",
    badge: "Tablet choice",
    image: "/phone/tab-p68.png",
    stock: "สต็อกจำกัด",
    shipping: "รับของได้ 2 ช่องทาง",
    category: "tablet",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
];

export const BENEFITS = [
  {
    id: "rewards",
    icon: Sparkles,
    title: "AVA Rewards",
    description: "สมัครสมาชิกแล้วเริ่มสะสมคะแนน",
  },
  {
    id: "care",
    icon: ShieldPlus,
    title: "AVA Care+",
    description: "การดูแลจากผู้เชี่ยวชาญของ AVA",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "บริการส่งฟรีไม่มีขั้นต่ำ",
    description: "จัดส่งฟรีหรือรับสินค้าที่ร้าน เมื่อสั่งซื้อผ่าน ava.com",
  },
  {
    id: "installment",
    icon: CreditCard,
    title: "ผ่อนสูงสุด 60 เดือน",
    description: "ผ่อน 0% สูงสุด 10 เดือน หรือ 0.75% สูงสุด 60 เดือน พร้อมรูปแบบการชำระเงินที่หลากหลาย",
  },
  {
    id: "warranty",
    icon: ShieldCheck,
    title: "การรับประกันโดย AVA",
    description: "วางใจได้เพราะมาพร้อมมาตรฐานการรับประกัน 5 ปี",
  },
  {
    id: "install",
    icon: Wrench,
    title: "จัดส่งและติดตั้งฟรี",
    description: "จัดส่งฟรีทั่วประเทศ",
  },
  {
    id: "trade-in",
    icon: ArrowRightLeft,
    title: "สมาร์ทโฟนเก่าแลกใหม่",
    description: "เก่าแลกใหม่รับส่วนลดเพิ่ม",
  },
];

export const PRIVILEGES = [
  {
    id: "employee",
    title: "สำหรับพนักงาน AVA",
    imageFolder: "1",
  },
  {
    id: "partner",
    title: "สำหรับพนักงานคู่ค้า AVA",
    imageFolder: "2",
  },
  {
    id: "student",
    title: "สำหรับนักเรียน-นักศึกษา",
    imageFolder: "3",
  },
  {
    id: "gov",
    title: "สำหรับข้าราชการและรัฐวิสาหกิจ",
    imageFolder: "4",
  },
  {
    id: "medical",
    title: "สำหรับบุคลากรทางการแพทย์",
    imageFolder: "5",
  },
];
