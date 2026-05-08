export const ARTICLES_MOCK = [
  {
    id: 1,
    category: "Innovation",
    title: "เบื้องหลังการออกแบบ AVA Signature Flagship: เมื่อศิลปะมาบรรจบกับวิศวกรรม",
    excerpt: "เจาะลึกทุกกระบวนการคิดและนวัตกรรมเบื้องหลังการพัฒนา P89 รุ่นเรือธงที่เปลี่ยนนิยามของความเป็นไปได้",
    date: "8 เมษายน 2569",
    imageColor: "bg-blue-100"
  },
  {
    id: 2,
    category: "Tips & Tricks",
    title: "5 วิธีใช้งานกล้อง AVA Pro Max ให้เหมือนช่างภาพมือโปร",
    excerpt: "เทคนิคการตั้งค่าแสง เงา และมุมกล้องที่จะช่วยให้ทุกช็อตของคุณออกมาสวยงามระดับ Cinematic",
    date: "5 เมษายน 2569",
    imageColor: "bg-orange-100"
  },
  {
    id: 3,
    category: "Lifestyle",
    title: "ทำไม AVA Life Tab P68 ถึงเป็นเพื่อนคู่ใจที่ดีที่สุดของคนสาย Creative",
    excerpt: "จากสเก็ตซ์แรกสู่โปรเจกต์ใหญ่ มาดูกันว่าแท็บเล็ตของเราช่วยยกระดับการทำงานให้คล่องตัวได้อย่างไร",
    date: "2 เมษายน 2569",
    imageColor: "bg-green-100"
  }
] as const;

export const ARTICLE_CATEGORIES = ["ทั้งหมด", "Innovation", "Tips & Tricks", "Lifestyle", "Announcements"] as const;
