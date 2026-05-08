export type HomeProduct = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  image: string;
  price: string;
  colors: string[];
};

export const AVA_LINEUP: HomeProduct[] = [
  {
    id: "promax-p89",
    name: "AVA Life Pro Max P89",
    shortName: "Pro Max P89",
    tagline: "Intelligence in every detail.",
    image: "/products/smart_phone/P89.webp",
    price: "เริ่มที่ ฿24,990",
    colors: ["bg-black", "bg-gray-400", "bg-orange-400", "bg-blue-900"],
  },
  {
    id: "promax-p63",
    name: "AVA Life Pro Max P63",
    shortName: "Pro Max P63",
    tagline: "Streamlined luxury. Pro all day.",
    image: "/products/smart_phone/P63.webp",
    price: "เริ่มที่ ฿19,990",
    colors: ["bg-slate-800", "bg-slate-300", "bg-blue-200"],
  },
  {
    id: "note-p65",
    name: "AVA Life Note cold P65",
    shortName: "Note Cold P65",
    tagline: "Note everything. Anywhere.",
    image: "/products/smart_phone/P65C.webp",
    price: "เริ่มที่ ฿14,990",
    colors: ["bg-black", "bg-gray-300"],
  },
  {
    id: "enjoy-p65",
    name: "AVA Enjoy Series Pro P65",
    shortName: "Series Pro P65",
    tagline: "More fun. More power.",
    image: "/products/smart_phone/P65P.webp",
    price: "เริ่มที่ ฿9,990",
    colors: ["bg-black", "bg-blue-100"],
  },
  {
    id: "tab-p68",
    name: "AVA Life Tab Ultra P68",
    shortName: "Tab Ultra P68",
    tagline: "Pro creativity. Ultra portable.",
    image: "/products/tab_let/P68.webp",
    price: "เริ่มที่ ฿18,990",
    colors: ["bg-gray-700", "bg-blue-200", "bg-stone-200"],
  },
] as const;
