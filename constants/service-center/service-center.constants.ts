export const PRIMARY_SERVICES = [
  {
    title: "Check Warranty",
    desc: "ตรวจสอบระยะเวลาการรับประกันสินค้าของคุณได้ง่ายๆ ผ่านหมายเลข IMEI",
    link: "#"
  },
  {
    title: "Repair Status",
    desc: "ติดตามสถานะการซ่อมบำรุงแบบ Real-time ตั้งแต่การรับเครื่องจนถึงส่งคืน",
    link: "#"
  },
  {
    title: "VIP Hotline",
    desc: "บริการสายด่วนสำหรับลูกค้า AVA Life Pro series ตลอด 24 ชั่วโมง",
    link: "tel:1234"
  }
] as const;

export const SERVICE_BRANCHES = [
  {
    name: "AVA Experience Store - Siam Paragon",
    location: "ชั้น 2 โซน Technology, สยามพารากอน",
    hours: "10:00 - 21:00 น.",
    phone: "02-XXX-XXXX"
  },
  {
    name: "AVA Service Point - Central World",
    location: "ชั้น 4 ฝั่ง Digital World, เซ็นทรัลเวิลด์",
    hours: "10:30 - 21:30 น.",
    phone: "02-YYY-YYYY"
  }
] as const;

export const WARRANTY_FAQS = [
  "อุปกรณ์ที่ได้รับความเสียหายจากน้ำรวมอยู่ในการรับประกันหรือไม่?",
  "ระยะเวลาในการซ่อมบำรุงปกติใช้เวลาประมาณกี่วัน?",
  "สามารถซื้อประกันเพิ่ม (AVA Care+) ได้ที่ไหน?",
  "การส่งซ่อมสามารถส่งผ่านขนส่งสาธารณะได้หรือไม่?"
] as const;
